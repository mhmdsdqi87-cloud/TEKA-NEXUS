// TEKA NEXUS — /api/projects/[slug]/requests
// GET   list collaboration requests (owner/admin only)
// POST  apply to join (authed non-member; unique per user/project; notifies owner)

import type { NextRequest } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import {
  ok,
  handle,
  HttpError,
  parseBody,
  requireUser,
  getProjectRole,
  canManageProject,
  requireProjectAccess,
  notify,
} from "@/lib/server";
import { LIMITS } from "@/lib/constants";
import type { CollabRequestDTO, UserCard } from "@/lib/dto";

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

type RequestRow = {
  id: string;
  status: string;
  requestedRole: string;
  introduction: string;
  portfolioUrl: string;
  createdAt: Date;
  reviewedAt: Date | null;
  applicant: OwnerRow;
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

function toCollabRequest(r: RequestRow): CollabRequestDTO {
  return {
    id: r.id,
    status: r.status,
    requestedRole: r.requestedRole,
    introduction: r.introduction,
    portfolioUrl: r.portfolioUrl,
    createdAt: r.createdAt.toISOString(),
    reviewedAt: r.reviewedAt ? r.reviewedAt.toISOString() : null,
    applicant: toUserCard(r.applicant),
  };
}

// ─── GET /api/projects/[slug]/requests — owner/admin ─────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await db.project.findUnique({ where: { slug } });
    if (!project) throw new HttpError("Project not found.", 404);

    const role = await getProjectRole(project.id, user.id);
    if (!canManageProject(role)) {
      throw new HttpError("Only the project owner or an admin can view requests.", 403);
    }

    const requests = await db.collaborationRequest.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: "desc" },
      include: { applicant: { select: userCardFields } },
    });

    return ok({ requests: requests.map(toCollabRequest) });
  });
}

// ─── POST /api/projects/[slug]/requests — apply to join ──────

const urlField = z
  .string()
  .trim()
  .max(500, "URL must be at most 500 characters.")
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Must be a valid http(s) URL.");

const createSchema = z.object({
  requestedRole: z.enum(["CONTRIBUTOR", "VIEWER"]).default("CONTRIBUTOR"),
  introduction: z
    .string()
    .trim()
    .min(10, "Introduction must be at least 10 characters.")
    .max(
      LIMITS.introduction,
      `Introduction must be at most ${LIMITS.introduction} characters.`
    ),
  portfolioUrl: urlField.optional(),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await requireProjectAccess(slug, user.id); // PRIVATE + non-member = 404

    const membership = await db.projectMember.findUnique({
      where: { projectId_userId: { projectId: project.id, userId: user.id } },
    });
    if (membership) {
      throw new HttpError("You are already a member of this project.", 400);
    }

    const body = await parseBody(req, createSchema);

    let request;
    try {
      request = await db.collaborationRequest.create({
        data: {
          projectId: project.id,
          applicantId: user.id,
          requestedRole: body.requestedRole,
          introduction: body.introduction,
          portfolioUrl: body.portfolioUrl ?? "",
        },
        include: { applicant: { select: userCardFields } },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        throw new HttpError("You already have a request for this project.", 409);
      }
      throw err;
    }

    await notify({
      recipientId: project.ownerId,
      actorId: user.id,
      type: "COLLAB_REQUEST",
      entityType: "request",
      entityId: request.id,
      payload: { applicantName: user.displayName, projectName: project.name },
    });

    return ok({ request: toCollabRequest(request) }, 201);
  });
}
