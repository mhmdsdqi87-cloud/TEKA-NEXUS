// TEKA NEXUS — /api/projects/[slug]/tasks
// GET   list tasks (project read access; filters: status, assigneeId)
// POST  create task (CONTRIBUTOR+; assignee must be a member; notify assignee)

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
  notify,
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { TASK_PRIORITIES, LIMITS } from "@/lib/constants";
import type { TaskDTO, UserCard } from "@/lib/dto";

export const dynamic = "force-dynamic";

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

// ─── GET /api/projects/[slug]/tasks ──────────────────────────

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();

    const project = await requireProjectAccess(slug, viewer?.id);

    const status = req.nextUrl.searchParams.get("status") ?? undefined;
    const assigneeId = req.nextUrl.searchParams.get("assigneeId") ?? undefined;

    const tasks = await db.task.findMany({
      where: {
        projectId: project.id,
        ...(status ? { status } : {}),
        ...(assigneeId ? { assigneeId } : {}),
      },
      orderBy: { position: "asc" },
      include: taskInclude,
    });

    return ok({ tasks: tasks.map(toTask) });
  });
}

// ─── POST /api/projects/[slug]/tasks — create (CONTRIBUTOR+) ─

const createSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(LIMITS.taskTitle, `Title must be at most ${LIMITS.taskTitle} characters.`),
  description: z.string().trim().max(LIMITS.taskDescription).optional(),
  priority: z.string().refine((v) => prioritySlugs.has(v), "Unknown priority.").optional(),
  assigneeId: z.string().min(1).optional(),
  dueAt: dateField.optional(),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await requireProjectAccess(slug, user.id);
    const role = await getProjectRole(project.id, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to create tasks.", 403);
    }

    const body = await parseBody(req, createSchema);

    if (body.assigneeId) {
      const member = await db.projectMember.findUnique({
        where: { projectId_userId: { projectId: project.id, userId: body.assigneeId } },
      });
      if (!member) {
        throw new HttpError("The assignee must be a member of this project.", 400);
      }
    }

    const max = await db.task.aggregate({
      where: { projectId: project.id },
      _max: { position: true },
    });
    const position = (max._max.position ?? 0) + 1000;

    const task = await db.task.create({
      data: {
        projectId: project.id,
        title: body.title,
        description: body.description ?? "",
        priority: body.priority ?? "NORMAL",
        assigneeId: body.assigneeId ?? null,
        dueAt: body.dueAt ?? null,
        createdById: user.id,
        position,
      },
      include: taskInclude,
    });

    if (body.assigneeId) {
      await notify({
        recipientId: body.assigneeId,
        actorId: user.id,
        type: "TASK_ASSIGNED",
        entityType: "task",
        entityId: task.id,
        payload: { taskTitle: task.title, projectName: project.name },
      });
    }

    return ok({ task: toTask(task) }, 201);
  });
}
