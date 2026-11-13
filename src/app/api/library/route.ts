// TEKA NEXUS — GET /api/library
// Public, read-only Knowledge Library API for developers and AI coding agents.
//
// Contract (stable): every response is one of
//   { ok: true,  data: Entry[], meta: {...} }
//   { ok: false, error: { code, message } }
// List responses omit the full source code — fetch /api/library/{slug} for it.
// Search is keyword+field scoring (title > tags > summary > code). No semantic
// search yet: this endpoint never fabricates results and reports zero hits
// honestly.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const CATEGORIES = new Set([
  "frontend", "backend", "fullstack", "ai", "api", "database",
  "security", "devops", "performance", "patterns", "i18n", "web3",
]);
const LANGUAGES = new Set(["typescript", "javascript", "python", "sql", "bash"]);
const DIFFICULTIES = new Set(["beginner", "intermediate", "advanced"]);
const STATUSES = new Set(["draft", "under_review", "verified", "deprecated"]);

const STATUS_RANK: Record<string, number> = { verified: 0, under_review: 1, draft: 2, deprecated: 3 };
const LIMIT_MAX = 50;

type Row = {
  slug: string; title: string; category: string; summary: string; language: string;
  framework: string; difficulty: string; status: string; version: string; license: string;
  sourceAuthor: string; tags: string; related: string; verifiedAt: Date | null; updatedAt: Date;
};

function jsonError(code: string, message: string, status: number) {
  return NextResponse.json({ ok: false, error: { code, message } }, { status });
}

function parseTags(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function toListItem(r: Row) {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    summary: r.summary,
    language: r.language,
    framework: r.framework,
    difficulty: r.difficulty,
    status: r.status,
    verifiedAt: r.verifiedAt?.toISOString() ?? null,
    version: r.version,
    license: r.license,
    sourceAuthor: r.sourceAuthor,
    tags: parseTags(r.tags),
    related: parseTags(r.related),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const q = (sp.get("q") ?? "").trim().slice(0, 120);
    const category = sp.get("category") ?? "";
    const language = sp.get("language") ?? "";
    const framework = sp.get("framework") ?? "";
    const difficulty = sp.get("difficulty") ?? "";
    const status = sp.get("status") ?? "";
    const limit = Math.min(Math.max(Number(sp.get("limit")) || 20, 1), LIMIT_MAX);
    const offset = Math.max(0, Number(sp.get("offset")) || 0);

    const filters: Record<string, string> = {};
    const where: Record<string, unknown> = {};
    if (category) {
      if (!CATEGORIES.has(category)) return jsonError("bad_request", `unknown category: ${category}`, 400);
      where.category = category;
      filters.category = category;
    }
    if (language) {
      if (!LANGUAGES.has(language)) return jsonError("bad_request", `unknown language: ${language}`, 400);
      where.language = language;
      filters.language = language;
    }
    if (framework) {
      where.framework = framework;
      filters.framework = framework;
    }
    if (difficulty) {
      if (!DIFFICULTIES.has(difficulty)) return jsonError("bad_request", `unknown difficulty: ${difficulty}`, 400);
      where.difficulty = difficulty;
      filters.difficulty = difficulty;
    }
    if (status) {
      if (!STATUSES.has(status)) return jsonError("bad_request", `unknown status: ${status}`, 400);
      where.status = status;
      filters.status = status;
    } else {
      where.status = { not: "deprecated" }; // deprecated entries are opt-in only
    }

    const [total, rows] = await Promise.all([
      db.libraryEntry.count({ where }),
      db.libraryEntry.findMany({
        where,
        select: {
          slug: true, title: true, category: true, summary: true, language: true,
          framework: true, difficulty: true, status: true, version: true, license: true,
          sourceAuthor: true, tags: true, related: true, verifiedAt: true, updatedAt: true,
          code: !!q, // code needed only for scoring when searching
        },
        take: 500,
      }),
    ]);

    let entries: Record<string, unknown>[] = rows;
    if (q) {
      const needle = q.toLowerCase();
      const scored = rows
        .map((r) => {
          let s = 0;
          if (r.title.toLowerCase().includes(needle)) s += 10;
          if (r.title.toLowerCase().split(/\s+/).some((w) => w.startsWith(needle))) s += 6;
          if (r.tags.toLowerCase().includes(needle)) s += 5;
          if (r.summary.toLowerCase().includes(needle)) s += 3;
          if (r.code && r.code.toLowerCase().includes(needle)) s += 1;
          return { r, s };
        })
        .filter(({ s }) => s > 0)
        .sort((a, b) => b.s - a.s || a.r.title.localeCompare(b.r.title));
      entries = scored.map(({ r }) => {
        const { code: _code, ...rest } = r as Record<string, unknown> & { code?: string };
        return rest;
      });
    } else {
      entries.sort(
        (a, b) =>
          (STATUS_RANK[String(a.status)] ?? 9) - (STATUS_RANK[String(b.status)] ?? 9) ||
          String(b.updatedAt).localeCompare(String(a.updatedAt)),
      );
    }

    const page = entries.slice(offset, offset + limit);
    return NextResponse.json(
      {
        ok: true,
        data: page.map(toListItem as (r: Record<string, unknown>) => ReturnType<typeof toListItem>),
        meta: {
          total: q ? page.length : total, // with q, the scored set is the result set
          count: page.length,
          limit,
          offset,
          filters,
          search: q ? { q, note: "keyword scoring over title/tags/summary/code" } : undefined,
        },
      },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
    );
  } catch (err) {
    console.error("[api/library]", err);
    return jsonError("internal", "Library is temporarily unavailable.", 500);
  }
}
