// TEKA NEXUS — /api/projects/[slug]/debug  (Task ws-1)
// GET  — recent logs (lightweight poll)
// POST — post a manual log line (CONTRIBUTOR+): level, source, message
// PUT  — run diagnostics over every workspace file (server-side static
//        checks) and persist the results as structured logs.

import type { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  ok,
  handle,
  HttpError,
  parseBody,
  requireUser,
  getProjectRole,
  canContribute,
  requireProjectAccess,
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { LIMITS } from "@/lib/constants";
import { LOG_LEVELS, WS_LIMITS } from "@/lib/workspace";

export const dynamic = "force-dynamic";

const actorFields = {
  id: true,
  username: true,
  displayName: true,
  avatarColor: true,
  avatarUrl: true,
} as const;

async function requireWsRole(slug: string, userId: string) {
  const project = await requireProjectAccess(slug, userId);
  const role = await getProjectRole(project.id, userId);
  if (!canContribute(role)) {
    throw new HttpError("You need to be a contributor to use the debug console.", 403);
  }
  return project;
}

function mapLog(l: {
  id: string;
  level: string;
  source: string;
  message: string;
  user: { id: string; username: string; displayName: string; avatarColor: string; avatarUrl: string | null } | null;
  createdAt: Date;
}) {
  return {
    id: l.id,
    level: l.level,
    source: l.source,
    message: l.message,
    user: l.user,
    createdAt: l.createdAt.toISOString(),
  };
}

// ─── GET — poll logs ──────────────────────────────────────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();
    const project = await requireProjectAccess(slug, viewer?.id);

    const logs = await db.debugLog.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { user: { select: actorFields } },
    });

    return ok({ logs: logs.map(mapLog) });
  });
}

// ─── POST — manual log line ───────────────────────────────────

const postSchema = z.object({
  level: z.string().refine((v) => (LOG_LEVELS as readonly string[]).includes(v), "Unknown level.").optional(),
  source: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1).max(LIMITS.wsLogMessage),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();
    const project = await requireWsRole(slug, user.id);
    const body = await parseBody(req, postSchema);

    const log = await db.debugLog.create({
      data: {
        projectId: project.id,
        level: body.level ?? "info",
        source: body.source ?? "team",
        message: body.message,
        userId: user.id,
      },
      include: { user: { select: actorFields } },
    });

    return ok({ log: mapLog(log) }, 201);
  });
}

// ─── PUT — run diagnostics (static analysis) ──────────────────

type Issue = { level: "warn" | "error" | "info"; message: string };

/** Heuristic static checks — deliberately simple, zero dependencies. */
function analyzeFile(name: string, language: string, content: string): Issue[] {
  const issues: Issue[] = [];
  const lines = content.split("\n");

  // JSON validity
  if (language === "json" && content.trim()) {
    try {
      JSON.parse(content);
    } catch (err) {
      issues.push({ level: "error", message: `❌ ${name}: invalid JSON — ${err instanceof Error ? err.message.split("\n")[0] : "parse error"}` });
    }
  }

  // Brace / paren balance for code files (string/comment naive — good enough as a signal)
  if (["typescript", "tsx", "javascript", "jsx", "css", "json"].includes(language)) {
    const counts = { brace: 0, paren: 0, bracket: 0 };
    for (const ch of content) {
      if (ch === "{") counts.brace++;
      else if (ch === "}") counts.brace--;
      else if (ch === "(") counts.paren++;
      else if (ch === ")") counts.paren--;
      else if (ch === "[") counts.bracket++;
      else if (ch === "]") counts.bracket--;
    }
    if (counts.brace !== 0) issues.push({ level: "warn", message: `⚠️ ${name}: unbalanced curly braces (${counts.brace > 0 ? `${counts.brace} unclosed` : `${-counts.brace} extra closers`})` });
    if (counts.paren !== 0) issues.push({ level: "warn", message: `⚠️ ${name}: unbalanced parentheses (${counts.paren > 0 ? `${counts.paren} unclosed` : `${-counts.paren} extra closers`})` });
    if (counts.bracket !== 0) issues.push({ level: "warn", message: `⚠️ ${name}: unbalanced brackets (${counts.bracket > 0 ? `${counts.bracket} unclosed` : `${-counts.bracket} extra closers`})` });
  }

  // TODO / FIXME inventory
  const todos = lines.filter((l) => /\b(TODO|FIXME)\b/.test(l)).length;
  if (todos > 0) issues.push({ level: "info", message: `📌 ${name}: ${todos} TODO/FIXME marker${todos > 1 ? "s" : ""} waiting` });

  // console.log leftovers in JS/TS
  if (["typescript", "tsx", "javascript", "jsx"].includes(language)) {
    const logs = lines.filter((l) => /\bconsole\.log\(/.test(l)).length;
    if (logs > 0) issues.push({ level: "info", message: `🔎 ${name}: ${logs} console.log call${logs > 1 ? "s" : ""} — clean before release?` });
  }

  // Very long lines
  const longLines = lines.filter((l) => l.length > 160).length;
  if (longLines > 0) issues.push({ level: "info", message: `📏 ${name}: ${longLines} line${longLines > 1 ? "s" : ""} longer than 160 chars` });

  // Empty file
  if (!content.trim()) issues.push({ level: "warn", message: `📭 ${name}: the file is empty` });

  return issues.slice(0, WS_LIMITS.diagIssuesPerFile);
}

export async function PUT(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();
    const project = await requireWsRole(slug, user.id);

    const files = await db.workspaceFile.findMany({
      where: { projectId: project.id, isFolder: false },
      select: { name: true, language: true, content: true, size: true },
    });

    const stamps = await db.debugLog.createMany({
      data: [
        { projectId: project.id, level: "info", source: "diagnostics", message: `▶︎ Diagnostics started on ${files.length} file${files.length === 1 ? "" : "s"} by ${user.displayName}`, userId: user.id },
      ],
    });
    void stamps;

    let warnings = 0;
    let errors = 0;
    const issueLogs: { projectId: string; level: string; source: string; message: string; userId: string }[] = [];

    for (const f of files) {
      for (const issue of analyzeFile(f.name, f.language, f.content)) {
        if (issue.level === "error") errors++;
        if (issue.level === "warn") warnings++;
        issueLogs.push({ projectId: project.id, level: issue.level, source: "diagnostics", message: issue.message, userId: user.id });
      }
    }

    // Size overview
    const totalKb = Math.round(files.reduce((acc, f) => acc + f.size, 0) / 1024);
    issueLogs.push({
      projectId: project.id,
      level: "info",
      source: "diagnostics",
      message: `📦 Snapshot: ${files.length} files · ${totalKb} KB total`,
      userId: user.id,
    });

    const summaryLevel = errors > 0 ? "error" : warnings > 0 ? "warn" : "success";
    issueLogs.push({
      projectId: project.id,
      level: summaryLevel,
      source: "diagnostics",
      message:
        errors > 0
          ? `✖︎ Diagnostics finished: ${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}`
          : warnings > 0
            ? `✔︎ Diagnostics finished: no errors, ${warnings} warning${warnings === 1 ? "" : "s"}`
            : `✅ Diagnostics finished: everything looks clean!`,
      userId: user.id,
    });

    await db.debugLog.createMany({ data: issueLogs });

    // Keep the console tidy: cap at the latest 300 rows per project.
    const overflow = await db.debugLog.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: "desc" },
      skip: 300,
      take: 200,
      select: { id: true },
    });
    if (overflow.length > 0) {
      await db.debugLog.deleteMany({ where: { id: { in: overflow.map((l) => l.id) } } });
    }

    return ok({
      run: { files: files.length, errors, warnings, logsAdded: issueLogs.length },
    });
  });
}
