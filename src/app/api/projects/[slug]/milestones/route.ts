// TEKA NEXUS — /api/projects/[slug]/milestones
// GET   list milestones (project read access), oldest first
// POST  create milestone (CONTRIBUTOR+)

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
import type { MilestoneDTO, UserCard } from "@/lib/dto";

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

type MilestoneRow = {
  id: string;
  title: string;
  description: string;
  dueAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  creator: OwnerRow;
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

function toMilestone(m: MilestoneRow): MilestoneDTO {
  return {
    id: m.id,
    title: m.title,
    description: m.description,
    dueAt: m.dueAt ? m.dueAt.toISOString() : null,
    completedAt: m.completedAt ? m.completedAt.toISOString() : null,
    createdAt: m.createdAt.toISOString(),
    creator: toUserCard(m.creator),
  };
}

const dateField = z
  .string()
  .refine((s) => !Number.isNaN(Date.parse(s)), "Invalid date.")
  .transform((s) => new Date(s));

// ─── GET /api/projects/[slug]/milestones ─────────────────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();

    const project = await requireProjectAccess(slug, viewer?.id);

    const milestones = await db.milestone.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: "asc" },
      include: { creator: { select: userCardFields } },
    });

    return ok({ milestones: milestones.map(toMilestone) });
  });
}

// ─── POST /api/projects/[slug]/milestones — CONTRIBUTOR+ ─────

const createSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(LIMITS.taskTitle, `Title must be at most ${LIMITS.taskTitle} characters.`),
  description: z.string().trim().max(2000, "Description must be at most 2000 characters.").optional(),
  dueAt: dateField.optional(),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await requireProjectAccess(slug, user.id);
    const role = await getProjectRole(project.id, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to create milestones.", 403);
    }

    const body = await parseBody(req, createSchema);

    const milestone = await db.milestone.create({
      data: {
        projectId: project.id,
        title: body.title,
        description: body.description ?? "",
        dueAt: body.dueAt ?? null,
        createdById: user.id,
      },
      include: { creator: { select: userCardFields } },
    });

    return ok({ milestone: toMilestone(milestone) }, 201);
  });
}
