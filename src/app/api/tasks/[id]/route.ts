// TEKA NEXUS — /api/tasks/[id]
// PATCH   edit task (CONTRIBUTOR+ on the task's project; DONE transition awards assignee)
// DELETE  delete task (CONTRIBUTOR+)

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
  awardContribution,
  logActivity,
} from "@/lib/server";
import { TASK_STATUSES, TASK_PRIORITIES, LIMITS } from "@/lib/constants";
import type { TaskDTO, UserCard } from "@/lib/dto";

export const dynamic = "force-dynamic";

const taskStatusSlugs = new Set<string>(TASK_STATUSES.map((s) => s.slug));
const prioritySlugs = new Set<string>(TASK_PRIORITIES.map((p) => p.slug));

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

type TaskRow = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  position: number;
  dueAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  assignee: OwnerRow | null;
  creator: OwnerRow;
  _count: { comments: number };
};

const taskInclude = {
  assignee: { select: userCardFields },
  creator: { select: userCardFields },
  _count: { select: { comments: true } },
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

function toTask(t: TaskRow): TaskDTO {
  return {
    id: t.id,
    projectId: t.projectId,
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
    position: t.position,
    dueAt: t.dueAt ? t.dueAt.toISOString() : null,
    completedAt: t.completedAt ? t.completedAt.toISOString() : null,
    createdAt: t.createdAt.toISOString(),
    assignee: t.assignee ? toUserCard(t.assignee) : null,
    creator: toUserCard(t.creator),
    commentCount: t._count.comments,
  };
}

const dateField = z
  .string()
  .refine((s) => !Number.isNaN(Date.parse(s)), "Invalid date.")
  .transform((s) => new Date(s));

const patchSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(LIMITS.taskTitle, `Title must be at most ${LIMITS.taskTitle} characters.`)
    .optional(),
  description: z.string().trim().max(LIMITS.taskDescription).optional(),
  status: z.string().refine((v) => taskStatusSlugs.has(v), "Unknown status.").optional(),
  priority: z.string().refine((v) => prioritySlugs.has(v), "Unknown priority.").optional(),
  assigneeId: z.string().min(1).nullable().optional(),
  dueAt: dateField.nullable().optional(),
  position: z.number().optional(),
});

// ─── PATCH /api/tasks/[id] ───────────────────────────────────

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const task = await db.task.findUnique({ where: { id } });
    if (!task) throw new HttpError("Task not found.", 404);

    const role = await getProjectRole(task.projectId, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to edit tasks.", 403);
    }

    const body = await parseBody(req, patchSchema);

    // Validate new assignee against the project membership.
    let assigneeId = task.assigneeId;
    if (body.assigneeId !== undefined) {
      if (body.assigneeId === null) {
        assigneeId = null;
      } else {
        const member = await db.projectMember.findUnique({
          where: { projectId_userId: { projectId: task.projectId, userId: body.assigneeId } },
        });
        if (!member) {
          throw new HttpError("The assignee must be a member of this project.", 400);
        }
        assigneeId = body.assigneeId;
      }
    }

    const toDone = body.status !== undefined && body.status === "DONE" && task.status !== "DONE";
    const outOfDone = body.status !== undefined && body.status !== "DONE" && task.status === "DONE";

    const updated = await db.task.update({
      where: { id: task.id },
      data: {
        ...(body.title !== undefined ? { title: body.title } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.priority !== undefined ? { priority: body.priority } : {}),
        ...(body.assigneeId !== undefined ? { assigneeId } : {}),
        ...(body.dueAt !== undefined ? { dueAt: body.dueAt } : {}),
        ...(body.position !== undefined ? { position: body.position } : {}),
        ...(toDone ? { completedAt: new Date() } : {}),
        ...(outOfDone ? { completedAt: null } : {}),
      },
      include: taskInclude,
    });

    if (toDone) {
      const awardTo = assigneeId; // effective assignee at the moment of completion
      if (awardTo) {
        await awardContribution({
          userId: awardTo,
          projectId: task.projectId,
          eventType: "TASK_COMPLETED",
          sourceType: "task",
          sourceId: task.id,
        });
      }
      await logActivity({
        projectId: task.projectId,
        actorId: user.id,
        eventType: "TASK_COMPLETED",
        metadata: { taskTitle: updated.title },
      });
    }

    return ok({ task: toTask(updated) });
  });
}

// ─── DELETE /api/tasks/[id] ──────────────────────────────────

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const task = await db.task.findUnique({ where: { id } });
    if (!task) throw new HttpError("Task not found.", 404);

    const role = await getProjectRole(task.projectId, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to delete tasks.", 403);
    }

    await db.task.delete({ where: { id: task.id } });
    return ok({ ok: true });
  });
}
