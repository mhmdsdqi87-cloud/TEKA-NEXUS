// TEKA NEXUS — /api/projects/[slug]/workspace/file  (Task ws-1)
// GET ?fileId= — full file (content) + recent revision metadata
// PUT          — save content; snapshots a FileRevision (≤ 20 kept per file)

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
import { WS_LIMITS } from "@/lib/workspace";

export const dynamic = "force-dynamic";

async function requireWsRole(slug: string, userId: string) {
  const project = await requireProjectAccess(slug, userId);
  const role = await getProjectRole(project.id, userId);
  if (!canContribute(role)) {
    throw new HttpError("You need to be a contributor to edit files.", 403);
  }
  return project;
}

// ─── GET — open file ──────────────────────────────────────────

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();
    const project = await requireProjectAccess(slug, viewer?.id);
    const fileId = req.nextUrl.searchParams.get("fileId");
    if (!fileId) throw new HttpError("fileId is required.", 422);

    const file = await db.workspaceFile.findFirst({
      where: { id: fileId, projectId: project.id },
      include: {
        createdBy: { select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true } },
        updatedBy: { select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true } },
      },
    });
    if (!file) throw new HttpError("File not found.", 404);

    const revisions = await db.fileRevision.findMany({
      where: { fileId: file.id },
      orderBy: { createdAt: "desc" },
      take: WS_LIMITS.revisionsPerFile,
      select: { id: true, size: true, editorName: true, createdAt: true },
    });

    return ok({
      file: {
        id: file.id,
        name: file.name,
        folder: file.folder,
        isFolder: file.isFolder,
        language: file.language,
        size: file.size,
        content: file.content,
        createdAt: file.createdAt.toISOString(),
        updatedAt: file.updatedAt.toISOString(),
        createdBy: file.createdBy,
        updatedBy: file.updatedBy,
      },
      revisions: revisions.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })),
    });
  });
}

// ─── PUT — save content ───────────────────────────────────────

const saveSchema = z.object({
  fileId: z.string().min(1),
  content: z.string().max(LIMITS.wsFileContent),
});

export async function PUT(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();
    const project = await requireWsRole(slug, user.id);
    const body = await parseBody(req, saveSchema);

    const file = await db.workspaceFile.findFirst({
      where: { id: body.fileId, projectId: project.id },
    });
    if (!file) throw new HttpError("File not found.", 404);
    if (file.isFolder) throw new HttpError("Folders have no content.", 422);

    const size = Buffer.byteLength(body.content, "utf8");
    const [updated] = await Promise.all([
      db.workspaceFile.update({
        where: { id: file.id },
        data: { content: body.content, size, updatedById: user.id },
      }),
      db.fileRevision.create({
        data: { fileId: file.id, content: body.content, size, editorName: user.displayName },
      }),
    ]);

    // Trim history: keep the newest N revisions per file.
    const keep = await db.fileRevision.findMany({
      where: { fileId: file.id },
      orderBy: { createdAt: "desc" },
      skip: WS_LIMITS.revisionsPerFile,
      take: 50,
      select: { id: true },
    });
    if (keep.length > 0) {
      await db.fileRevision.deleteMany({ where: { id: { in: keep.map((r) => r.id) } } });
    }

    return ok({
      file: {
        id: updated.id,
        size: updated.size,
        updatedAt: updated.updatedAt.toISOString(),
        revisionsKept: WS_LIMITS.revisionsPerFile,
      },
    });
  });
}
