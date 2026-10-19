// TEKA NEXUS — /api/tasks/[id]/comments
// GET   list task comments (project read access), oldest first
// POST  add task comment (CONTRIBUTOR+)

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
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { LIMITS } from "@/lib/constants";
import type { UserCard } from "@/lib/dto";

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

type CommentRow = {
  id: string;
  taskId: string;
  body: string;
  createdAt: Date;
  author: OwnerRow;
};

function toCommentDTO(c: CommentRow) {
  return {
    id: c.id,
    taskId: c.taskId,
    body: c.body,
    createdAt: c.createdAt.toISOString(),
    author: toUserCard(c.author),
  };
}

async function loadTaskWithAccess(taskId: string, userId?: string) {
  const task = await db.task.findUnique({
    where: { id: taskId },
    include: { project: { select: { id: true, visibility: true } } },
  });
  if (!task) throw new HttpError("Task not found.", 404);
  if (task.project.visibility === "PRIVATE") {
    const role = await getProjectRole(task.projectId, userId);
    if (!role) throw new HttpError("This project is private.", 404); // don't leak existence
  }
  return task;
}

// ─── GET /api/tasks/[id]/comments ────────────────────────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const viewer = await getAuthUser();

    const task = await loadTaskWithAccess(id, viewer?.id);

    const comments = await db.taskComment.findMany({
      where: { taskId: task.id },
      orderBy: { createdAt: "asc" },
      include: { author: { select: userCardFields } },
    });

    return ok({ comments: comments.map(toCommentDTO) });
  });
}

// ─── POST /api/tasks/[id]/comments ───────────────────────────

const createSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(LIMITS.comment, `Comment must be at most ${LIMITS.comment} characters.`),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const task = await loadTaskWithAccess(id, user.id);

    const role = await getProjectRole(task.projectId, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to comment on tasks.", 403);
    }

    const body = await parseBody(req, createSchema);

    const comment = await db.taskComment.create({
      data: { taskId: task.id, authorId: user.id, body: body.body },
      include: { author: { select: userCardFields } },
    });

    return ok({ comment: toCommentDTO(comment) }, 201);
  });
}
