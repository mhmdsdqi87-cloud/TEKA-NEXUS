// TEKA NEXUS — /api/projects/[slug]/comments
// GET   all project comments (project read access) as a nested tree (one reply level).
//       Soft-deleted rows are kept with body "[deleted]" and a null-ish author.
// POST  add a comment (authed + read access). Replies are one level deep:
//       parentId must reference a top-level comment of the same project.

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
  requireProjectAccess,
  notify,
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { LIMITS } from "@/lib/constants";
import type { CommentDTO, UserCard } from "@/lib/dto";

export const dynamic = "force-dynamic";

// ─── Shared row shapes + mappers ─────────────────────────────

type OwnerRow = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  bio: string;
  reputation: number;
};

const userCardFields = {
  id: true,
  username: true,
  displayName: true,
  avatarColor: true,
  avatarUrl: true,
  bio: true,
  reputation: true,
} as const;

type CommentRow = {
  id: string;
  parentId: string | null;
  body: string;
  deletedAt: Date | null;
  createdAt: Date;
  author: OwnerRow;
};

function toUserCard(u: OwnerRow): UserCard {
  return {
    id: u.id,
    username: u.username,
    displayName: u.displayName,
    avatarColor: u.avatarColor,
    avatarUrl: u.avatarUrl,
    bio: u.bio,
    reputation: u.reputation,
  };
}

// Deleted comments keep their row (so replies stay anchored) but render as tombstones.
function toCommentDTO(c: CommentRow): CommentDTO {
  const deleted = c.deletedAt !== null;
  return {
    id: c.id,
    body: deleted ? "[deleted]" : c.body,
    parentId: c.parentId,
    createdAt: c.createdAt.toISOString(),
    author: deleted ? (null as unknown as UserCard) : toUserCard(c.author),
    replies: [],
  };
}

// ─── GET /api/projects/[slug]/comments — nested tree ─────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();

    const project = await requireProjectAccess(slug, viewer?.id);

    const rows = await db.projectComment.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: "asc" },
      include: { author: { select: userCardFields } },
    });

    const nodes = new Map<string, CommentDTO>();
    for (const row of rows) nodes.set(row.id, toCommentDTO(row));

    const top: CommentDTO[] = [];
    for (const row of rows) {
      const node = nodes.get(row.id)!;
      if (row.parentId && nodes.has(row.parentId)) {
        nodes.get(row.parentId)!.replies!.push(node);
      } else {
        top.push(node);
      }
    }

    return ok({ comments: top });
  });
}

// ─── POST /api/projects/[slug]/comments ──────────────────────

const createSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(LIMITS.comment, `Comment must be at most ${LIMITS.comment} characters.`),
  parentId: z.string().min(1).optional(),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await requireProjectAccess(slug, user.id);

    const body = await parseBody(req, createSchema);

    if (body.parentId) {
      const parent = await db.projectComment.findUnique({ where: { id: body.parentId } });
      if (!parent || parent.projectId !== project.id || parent.parentId !== null) {
        throw new HttpError("You can only reply to a top-level comment on this project.", 400);
      }
    }

    const comment = await db.projectComment.create({
      data: {
        projectId: project.id,
        authorId: user.id,
        body: body.body,
        parentId: body.parentId ?? null,
      },
      include: { author: { select: userCardFields } },
    });

    // Notify the project owner (notify() never self-notifies).
    await notify({
      recipientId: project.ownerId,
      actorId: user.id,
      type: "PROJECT_COMMENT",
      entityType: "project",
      entityId: project.id,
      payload: { projectName: project.name, commenterName: user.displayName },
    });

    return ok({ comment: toCommentDTO(comment) }, 201);
  });
}
