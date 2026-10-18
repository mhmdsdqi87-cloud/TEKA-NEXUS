// TEKA NEXUS — /api/projects/[slug]/updates
// GET   list project updates (project read access), newest first
// POST  post an update (CONTRIBUTOR+; logs activity + awards author)

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
  awardContribution,
  logActivity,
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { LIMITS } from "@/lib/constants";
import type { ProjectUpdateDTO, UserCard } from "@/lib/dto";

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

type UpdateRow = {
  id: string;
  title: string;
  body: string;
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

function toUpdateDTO(u: UpdateRow): ProjectUpdateDTO {
  return {
    id: u.id,
    title: u.title,
    body: u.body,
    createdAt: u.createdAt.toISOString(),
    author: toUserCard(u.author),
  };
}

// ─── GET /api/projects/[slug]/updates ────────────────────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();

    const project = await requireProjectAccess(slug, viewer?.id);

    const updates = await db.projectUpdate.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: "desc" },
      include: { author: { select: userCardFields } },
    });

    return ok({ updates: updates.map(toUpdateDTO) });
  });
}

// ─── POST /api/projects/[slug]/updates — CONTRIBUTOR+ ────────

const createSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(LIMITS.updateTitle, `Title must be at most ${LIMITS.updateTitle} characters.`),
  body: z
    .string()
    .trim()
    .min(1, "Update body is required.")
    .max(LIMITS.updateBody, `Body must be at most ${LIMITS.updateBody} characters.`),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await requireProjectAccess(slug, user.id);
    const role = await getProjectRole(project.id, user.id);
    if (!canContribute(role)) {
      throw new HttpError("You need to be a contributor to post updates.", 403);
    }

    const body = await parseBody(req, createSchema);

    const update = await db.projectUpdate.create({
      data: {
        projectId: project.id,
        authorId: user.id,
        title: body.title,
        body: body.body,
      },
      include: { author: { select: userCardFields } },
    });

    await logActivity({
      projectId: project.id,
      actorId: user.id,
      eventType: "UPDATE_POSTED",
      metadata: { updateTitle: update.title },
    });
    await awardContribution({
      userId: user.id,
      projectId: project.id,
      eventType: "UPDATE_POSTED",
      sourceType: "update",
      sourceId: update.id,
    });

    return ok({ update: toUpdateDTO(update) }, 201);
  });
}
