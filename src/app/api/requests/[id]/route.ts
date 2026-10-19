// TEKA NEXUS — /api/requests/[id]
// PATCH   review a collaboration request (owner/admin; PENDING only).
//         accept: atomic membership creation + award + activity + notifications.
//         reject: mark REJECTED + notify applicant.
// DELETE  withdraw (applicant only, PENDING only).

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
  canManageProject,
  awardContribution,
  logActivity,
  notify,
} from "@/lib/server";
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

// ─── PATCH /api/requests/[id] — accept | reject ──────────────

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const request = await db.collaborationRequest.findUnique({ where: { id } });
    if (!request) throw new HttpError("Request not found.", 404);

    const role = await getProjectRole(request.projectId, user.id);
    if (!canManageProject(role)) {
      throw new HttpError("Only the project owner or an admin can review requests.", 403);
    }
    if (request.status !== "PENDING") {
      throw new HttpError("This request has already been reviewed.", 400);
    }

    const body = await parseBody(req, z.object({ action: z.enum(["accept", "reject"]) }));

    const project = await db.project.findUnique({ where: { id: request.projectId } });
    if (!project) throw new HttpError("Project not found.", 404);

    if (body.action === "accept") {
      await db.$transaction(async (tx) => {
        await tx.collaborationRequest.update({
          where: { id: request.id },
          data: { status: "ACCEPTED", reviewedById: user.id, reviewedAt: new Date() },
        });
        await tx.projectMember.upsert({
          where: {
            projectId_userId: { projectId: request.projectId, userId: request.applicantId },
          },
          create: {
            projectId: request.projectId,
            userId: request.applicantId,
            role: request.requestedRole,
          },
          update: {}, // already a member — keep existing role
        });
      });

      await awardContribution({
        userId: request.applicantId,
        projectId: request.projectId,
        eventType: "COLLABORATION_ACCEPTED",
        sourceType: "request",
        sourceId: request.id,
      });

      const applicant = await db.user.findUnique({
        where: { id: request.applicantId },
        select: { displayName: true },
      });
      const memberName = applicant?.displayName ?? "A new member";

      await logActivity({
        projectId: request.projectId,
        actorId: request.applicantId,
        eventType: "MEMBER_JOINED",
        metadata: { memberName, projectName: project.name },
      });
      await notify({
        recipientId: project.ownerId,
        actorId: request.applicantId,
        type: "MEMBER_JOINED",
        entityType: "project",
        entityId: project.id,
        payload: { memberName, projectName: project.name },
      });
      await notify({
        recipientId: request.applicantId,
        actorId: user.id,
        type: "REQUEST_ACCEPTED",
        entityType: "project",
        entityId: project.id,
        payload: { projectName: project.name },
      });
    } else {
      await db.collaborationRequest.update({
        where: { id: request.id },
        data: { status: "REJECTED", reviewedById: user.id, reviewedAt: new Date() },
      });
      await notify({
        recipientId: request.applicantId,
        actorId: user.id,
        type: "REQUEST_REJECTED",
        entityType: "project",
        entityId: project.id,
        payload: { projectName: project.name },
      });
    }

    const fresh = await db.collaborationRequest.findUnique({
      where: { id: request.id },
      include: { applicant: { select: userCardFields } },
    });
    if (!fresh) throw new HttpError("Request not found.", 404);
    return ok({ request: toCollabRequest(fresh) });
  });
}

// ─── DELETE /api/requests/[id] — applicant withdraws ─────────

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const request = await db.collaborationRequest.findUnique({ where: { id } });
    if (!request) throw new HttpError("Request not found.", 404);

    if (request.applicantId !== user.id) {
      throw new HttpError("You can only withdraw your own requests.", 403);
    }
    if (request.status !== "PENDING") {
      throw new HttpError("Only pending requests can be withdrawn.", 400);
    }

    await db.collaborationRequest.update({
      where: { id: request.id },
      data: { status: "WITHDRAWN" },
    });

    return ok({ ok: true });
  });
}
