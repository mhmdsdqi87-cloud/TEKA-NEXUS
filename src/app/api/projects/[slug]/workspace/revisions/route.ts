// TEKA NEXUS — /api/projects/[slug]/workspace/revisions  (Task ws-1)
// GET  ?fileId=  — revision metadata list (≤ 20, newest first)
// POST           — restore a revision's content as the current version
//                  (the restore itself snapshots a new revision, nothing is lost)

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

export const dynamic = "force-dynamic";

const restoreSchema = z.object({
  fileId: z.string().min(1),
  revisionId: z.string().min(1),
});

async function requireWsRole(slug: string, userId: string) {
  const project = await requireProjectAccess(slug, userId);
  const role = await getProjectRole(project.id, userId);
  if (!canContribute(role)) {
    throw new HttpError("You need to be a contributor to manage revisions.", 403);
  }
  return project;
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();
    const project = await requireProjectAccess(slug, viewer?.id);
    const fileId = req.nextUrl.searchParams.get("fileId");
    if (!fileId) throw new HttpError("fileId is required.", 422);

    const file = await db.workspaceFile.findFirst({ where: { id: fileId, projectId: project.id } });
    if (!file) throw new HttpError("File not found.", 404);

    const revisions = await db.fileRevision.findMany({
      where: { fileId: file.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, size: true, editorName: true, createdAt: true },
    });

    return ok({
      revisions: revisions.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })),
    });
  });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();
    const project = await requireWsRole(slug, user.id);
    const body = await parseBody(req, restoreSchema);

    const file = await db.workspaceFile.findFirst({ where: { id: body.fileId, projectId: project.id } });
    if (!file) throw new HttpError("File not found.", 404);
    if (file.isFolder) throw new HttpError("Folders have no revisions.", 422);

    const revision = await db.fileRevision.findFirst({
      where: { id: body.revisionId, fileId: file.id },
    });
    if (!revision) throw new HttpError("Revision not found.", 404);

    const size = Buffer.byteLength(revision.content, "utf8");
    await db.workspaceFile.update({
      where: { id: file.id },
      data: { content: revision.content, size, updatedById: user.id },
    });
    await db.fileRevision.create({
      data: { fileId: file.id, content: revision.content, size, editorName: user.displayName },
    });

    return ok({ restored: true, size, content: revision.content });
  });
}
