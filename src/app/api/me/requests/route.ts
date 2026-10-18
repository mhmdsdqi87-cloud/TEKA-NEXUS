// GET /api/me/requests — collaboration requests I sent and received.

import { db } from "@/lib/db";
import { requireUser, handle, ok } from "@/lib/server";

type ApplicantLike = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  bio: string;
  reputation: number;
};

type RequestRow = {
  id: string;
  status: string;
  requestedRole: string;
  introduction: string;
  portfolioUrl: string;
  createdAt: Date;
  reviewedAt: Date | null;
  applicant: ApplicantLike;
  project: {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    coverImage: string;
    status: string;
    category: string;
  };
};

function toRequestDTO(r: RequestRow) {
  return {
    id: r.id,
    status: r.status,
    requestedRole: r.requestedRole,
    introduction: r.introduction,
    portfolioUrl: r.portfolioUrl,
    createdAt: r.createdAt.toISOString(),
    reviewedAt: r.reviewedAt ? r.reviewedAt.toISOString() : null,
    applicant: {
      id: r.applicant.id,
      username: r.applicant.username,
      displayName: r.applicant.displayName,
      avatarColor: r.applicant.avatarColor,
      avatarUrl: r.applicant.avatarUrl,
      bio: r.applicant.bio,
      reputation: r.applicant.reputation,
    },
    project: {
      id: r.project.id,
      slug: r.project.slug,
      name: r.project.name,
      tagline: r.project.tagline,
      coverImage: r.project.coverImage,
      status: r.project.status,
      category: r.project.category,
    },
  };
}

const requestInclude = {
  applicant: true,
  project: {
    select: { id: true, slug: true, name: true, tagline: true, coverImage: true, status: true, category: true },
  },
} as const;

export async function GET() {
  return handle(async () => {
    const me = await requireUser();

    const sent = await db.collaborationRequest.findMany({
      where: { applicantId: me.id },
      include: requestInclude,
      orderBy: { createdAt: "desc" },
    });

    // Projects I own or administer.
    const memberships = await db.projectMember.findMany({
      where: { userId: me.id, role: { in: ["OWNER", "ADMIN"] } },
      select: { projectId: true },
    });
    const owned = await db.project.findMany({ where: { ownerId: me.id }, select: { id: true } });
    const projectIds = [...new Set([...memberships.map((m) => m.projectId), ...owned.map((p) => p.id)])];

    const received = projectIds.length
      ? await db.collaborationRequest.findMany({
          where: { projectId: { in: projectIds } },
          include: requestInclude,
          orderBy: { createdAt: "desc" },
        })
      : [];

    return ok({ sent: sent.map(toRequestDTO), received: received.map(toRequestDTO) });
  });
}
