// TEKA NEXUS — /api/milestones/[id]
// PATCH   toggle completion (CONTRIBUTOR+; completing logs activity + awards actor)
// DELETE  delete milestone (CONTRIBUTOR+)

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

// ─── PATCH /api/milestones/[id] ──────────────────────────────

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const milestone = await db.milestone.findUnique({ where: { id } });
    if (!milestone) throw new HttpError("Milestone not found.", 404);

    const role = await getProjectRole(milestone.projectId, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to update milestones.", 403);
    }

    const body = await parseBody(req, z.object({ completed: z.boolean() }));

    const completing = body.completed && !milestone.completedAt;

    const updated = await db.milestone.update({
      where: { id: milestone.id },
      data: {
        completedAt: body.completed ? milestone.completedAt ?? new Date() : null,
      },
      include: { creator: { select: userCardFields } },
    });

    if (completing) {
      await logActivity({
        projectId: milestone.projectId,
        actorId: user.id,
        eventType: "MILESTONE_COMPLETED",
        metadata: { milestoneTitle: milestone.title },
      });
      await awardContribution({
        userId: user.id,
        projectId: milestone.projectId,
        eventType: "MILESTONE_COMPLETED",
        sourceType: "milestone",
        sourceId: milestone.id,
      });
    }

    return ok({ milestone: toMilestone(updated) });
  });
}

// ─── DELETE /api/milestones/[id] ─────────────────────────────

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const milestone = await db.milestone.findUnique({ where: { id } });
    if (!milestone) throw new HttpError("Milestone not found.", 404);

    const role = await getProjectRole(milestone.projectId, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to delete milestones.", 403);
    }

    await db.milestone.delete({ where: { id: milestone.id } });
    return ok({ ok: true });
  });
}
