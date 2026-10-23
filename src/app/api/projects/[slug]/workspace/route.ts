// TEKA NEXUS — /api/projects/[slug]/workspace  (Task ws-1)
// GET    — tree (files + folders, no content), recent debug logs, stats
// POST   — create file/folder (CONTRIBUTOR+)
// PATCH  — rename / move / star (CONTRIBUTOR+)
// DELETE — delete file/folder (CONTRIBUTOR+; folder delete cascades children)

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
  logActivity,
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { LIMITS } from "@/lib/constants";
import {
  WS_LIMITS,
  validateWsName,
  normalizeFolder,
  detectLanguage,
  isBlockedFileName,
  isDescendantFolder,
} from "@/lib/workspace";

export const dynamic = "force-dynamic";

// ─── Shared include: activity cards ──────────────────────────

const actorFields = {
  id: true,
  username: true,
  displayName: true,
  avatarColor: true,
  avatarUrl: true,
} as const;

type ActorRow = { id: string; username: string; displayName: string; avatarColor: string; avatarUrl: string | null };

function toActor(u: ActorRow | null) {
  return u ? { id: u.id, username: u.username, displayName: u.displayName, avatarColor: u.avatarColor, avatarUrl: u.avatarUrl } : null;
}

function fileMeta(f: {
  id: string;
  name: string;
  folder: string;
  isFolder: boolean;
  language: string;
  size: number;
  starred: boolean;
  updatedAt: Date;
  createdAt: Date;
  createdBy: ActorRow | null;
  updatedBy: ActorRow | null;
}) {
  return {
    id: f.id,
    name: f.name,
    folder: f.folder,
    isFolder: f.isFolder,
    language: f.language,
    size: f.size,
    starred: f.starred,
    createdAt: f.createdAt.toISOString(),
    updatedAt: f.updatedAt.toISOString(),
    createdBy: toActor(f.createdBy),
    updatedBy: toActor(f.updatedBy),
  };
}

async function requireWsRole(slug: string, userId: string) {
  const project = await requireProjectAccess(slug, userId);
  const role = await getProjectRole(project.id, userId);
  if (!canContribute(role)) {
    throw new HttpError("You need to be a contributor to use the workspace.", 403);
  }
  return project;
}

// ─── GET — tree + logs + stats ────────────────────────────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();
    const project = await requireProjectAccess(slug, viewer?.id);

    const [files, logs] = await Promise.all([
      db.workspaceFile.findMany({
        where: { projectId: project.id },
        orderBy: [{ folder: "asc" }, { name: "asc" }],
        select: {
          id: true, name: true, folder: true, isFolder: true, language: true, size: true,
          starred: true, createdAt: true, updatedAt: true,
          createdBy: { select: actorFields },
          updatedBy: { select: actorFields },
        },
      }),
      db.debugLog.findMany({
        where: { projectId: project.id },
        orderBy: { createdAt: "desc" },
        take: 100,
        include: { user: { select: actorFields } },
      }),
    ]);

    const realFiles = files.filter((f) => !f.isFolder);
    const totalSize = realFiles.reduce((acc, f) => acc + f.size, 0);
    const langCounts: Record<string, number> = {};
    for (const f of realFiles) langCounts[f.language] = (langCounts[f.language] ?? 0) + 1;

    return ok({
      files: files.map(fileMeta),
      logs: logs.map((l) => ({
        id: l.id,
        level: l.level,
        source: l.source,
        message: l.message,
        user: toActor(l.user),
        createdAt: l.createdAt.toISOString(),
      })),
      stats: {
        files: realFiles.length,
        folders: files.length - realFiles.length,
        totalSize,
        starred: realFiles.filter((f) => f.starred).length,
        languages: Object.entries(langCounts)
          .map(([id, count]) => ({ id, count }))
          .sort((a, b) => b.count - a.count),
      },
    });
  });
}

// ─── POST — create file or folder ─────────────────────────────

const createSchema = z.object({
  name: z.string().max(LIMITS.wsFileName + 10),
  folder: z.string().max(LIMITS.wsFilePath + 10).optional(),
  isFolder: z.boolean().optional(),
  content: z.string().max(LIMITS.wsFileContent).optional(),
  templateId: z.string().max(40).optional(),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();
    const project = await requireWsRole(slug, user.id);
    const body = await parseBody(req, createSchema);

    const nameError = validateWsName(body.name);
    if (nameError) throw new HttpError(nameError, 422);
    if (isBlockedFileName(body.name)) {
      throw new HttpError("Binary formats are not supported — text files only.", 415);
    }
    const folder = normalizeFolder(body.folder);
    if (folder === null) throw new HttpError("Invalid folder path.", 422);

    const isFolder = body.isFolder ?? false;
    const clash = await db.workspaceFile.findUnique({
      where: { projectId_folder_name: { projectId: project.id, folder, name: body.name.trim() } },
    });
    if (clash) throw new HttpError("Something with that name already exists here.", 409);

    // Auto-create any missing ancestor folder nodes so the tree always
    // renders correctly (e.g. POST /docs/README.md without a "docs" node).
    if (folder !== "/") {
      const existing = await db.workspaceFile.findMany({
        where: { projectId: project.id, isFolder: true },
        select: { name: true, folder: true },
      });
      const have = new Set(existing.map((n) => (n.folder === "/" ? `/${n.name}` : `${n.folder}/${n.name}`)));
      const segments = folder.split("/").filter(Boolean);
      let current = "";
      for (let i = 0; i < segments.length; i++) {
        const parent = current === "" ? "/" : current;
        current = current === "" ? `/${segments[i]}` : `${current}/${segments[i]}`;
        if (!have.has(current)) {
          const exists = await db.workspaceFile.findFirst({
            where: { projectId: project.id, folder: parent, name: segments[i], isFolder: true },
          });
          if (!exists) {
            await db.workspaceFile.create({
              data: { projectId: project.id, name: segments[i], folder: parent, isFolder: true, createdById: user.id, updatedById: user.id },
            });
          }
        }
      }
    }

    let content = body.content ?? "";
    if (!isFolder && body.templateId) {
      const { WS_TEMPLATES } = await import("@/lib/workspace-templates");
      const tpl = WS_TEMPLATES.find((t) => t.id === body.templateId);
      if (tpl) content = tpl.content;
    }
    if (content.length > WS_LIMITS.content) {
      throw new HttpError(`Files are limited to ${Math.round(WS_LIMITS.content / 1000)} KB of text.`, 413);
    }

    const file = await db.workspaceFile.create({
      data: {
        projectId: project.id,
        name: body.name.trim(),
        folder,
        isFolder,
        content: isFolder ? "" : content,
        language: isFolder ? "folder" : detectLanguage(body.name.trim()).id,
        size: isFolder ? 0 : Buffer.byteLength(content, "utf8"),
        starred: false,
        createdById: user.id,
        updatedById: user.id,
      },
      include: { createdBy: { select: actorFields }, updatedBy: { select: actorFields } },
    });

    await logActivity({
      projectId: project.id,
      actorId: user.id,
      eventType: isFolder ? "WS_FOLDER_CREATED" : "WS_FILE_CREATED",
      metadata: { name: file.name, folder },
    });

    if (!isFolder) {
      // First revision so history starts at birth.
      await db.fileRevision.create({
        data: { fileId: file.id, content, size: file.size, editorName: user.displayName },
      });
    }

    return ok({ file: fileMeta(file) }, 201);
  });
}

// ─── PATCH — rename / move / star ─────────────────────────────

const patchSchema = z.object({
  fileId: z.string().min(1),
  name: z.string().max(LIMITS.wsFileName + 10).optional(),
  folder: z.string().max(LIMITS.wsFilePath + 10).optional(),
  starred: z.boolean().optional(),
});

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();
    const project = await requireWsRole(slug, user.id);
    const body = await parseBody(req, patchSchema);

    const file = await db.workspaceFile.findFirst({
      where: { id: body.fileId, projectId: project.id },
    });
    if (!file) throw new HttpError("File not found.", 404);

    const data: { name?: string; folder?: string; starred?: boolean; language?: string; updatedById: string } = {
      updatedById: user.id,
    };
    let moved = false;
    let renamed = false;

    if (body.name !== undefined && body.name !== file.name) {
      const nameError = validateWsName(body.name);
      if (nameError) throw new HttpError(nameError, 422);
      if (!file.isFolder && isBlockedFileName(body.name)) {
        throw new HttpError("Binary formats are not supported — text files only.", 415);
      }
      data.name = body.name.trim();
      renamed = true;
      if (!file.isFolder) data.language = detectLanguage(body.name.trim()).id;
    }

    if (body.folder !== undefined) {
      const target = normalizeFolder(body.folder);
      if (target === null) throw new HttpError("Invalid folder path.", 422);

      if (file.isFolder) {
        // No moving a folder into itself / its own subtree.
        const selfPath = file.folder === "/" ? `/${file.name}` : `${file.folder}/${file.name}`;
        if (isDescendantFolder(target === "/" ? "/" : target, selfPath) && target !== file.folder) {
          throw new HttpError("A folder cannot be moved inside itself.", 422);
        }
        // Repoint every descendant node: "/a/b" under oldPrefix "/a" keeps its
        // relative tail under the new target.
        const all = await db.workspaceFile.findMany({ where: { projectId: project.id } });
        for (const node of all) {
          if (node.id === file.id) continue;
          if (!isDescendantFolder(node.folder, selfPath)) continue;
          const newFolder =
            node.folder === selfPath
              ? target
              : target === "/"
                ? `/${node.folder.slice(selfPath.length + 1)}`
                : `${target}/${node.folder.slice(selfPath.length + 1)}`;
          await db.workspaceFile.update({ where: { id: node.id }, data: { folder: newFolder } });
        }
      }
      data.folder = target;
      moved = target !== file.folder;
    }

    if (body.starred !== undefined) data.starred = body.starred;

    // Unique-conflict pre-check (name+folder combo).
    const finalName = data.name ?? file.name;
    const finalFolder = data.folder ?? file.folder;
    if (renamed || moved) {
      const clash = await db.workspaceFile.findFirst({
        where: { projectId: project.id, folder: finalFolder, name: finalName, id: { not: file.id } },
      });
      if (clash) throw new HttpError("Something with that name already exists there.", 409);
    }

    const updated = await db.workspaceFile.update({
      where: { id: file.id },
      data,
      include: { createdBy: { select: actorFields }, updatedBy: { select: actorFields } },
    });

    if (moved) {
      await logActivity({
        projectId: project.id,
        actorId: user.id,
        eventType: "WS_FILE_MOVED",
        metadata: { name: updated.name, from: file.folder, to: finalFolder },
      });
    }

    return ok({ file: fileMeta(updated) });
  });
}

// ─── DELETE — remove file or folder subtree ───────────────────

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();
    const project = await requireWsRole(slug, user.id);
    const fileId = req.nextUrl.searchParams.get("fileId");
    if (!fileId) throw new HttpError("fileId is required.", 422);

    const file = await db.workspaceFile.findFirst({ where: { id: fileId, projectId: project.id } });
    if (!file) throw new HttpError("File not found.", 404);

    if (file.isFolder) {
      const selfPath = file.folder === "/" ? `/${file.name}` : `${file.folder}/${file.name}`;
      const all = await db.workspaceFile.findMany({ where: { projectId: project.id } });
      const doomed = all.filter((n) => n.id !== file.id && isDescendantFolder(n.folder, selfPath));
      await db.workspaceFile.deleteMany({ where: { id: { in: doomed.map((n) => n.id) } } });
    }

    await db.workspaceFile.delete({ where: { id: file.id } });

    await logActivity({
      projectId: project.id,
      actorId: user.id,
      eventType: "WS_FILE_DELETED",
      metadata: { name: file.name, folder: file.folder },
    });

    return ok({ deleted: true });
  });
}
