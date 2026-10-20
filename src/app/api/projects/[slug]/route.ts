// TEKA NEXUS — /api/projects/[slug]
// GET     project detail (+ myRole, liked, saved, likeCount, myRequest)
// PATCH   edit project (owner/admin; tag/skill replace; RELEASED transition award)
// DELETE  archive project (owner only)

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
  type ProjectRole,
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { PROJECT_CATEGORIES, PROJECT_STATUSES, SKILLS, VISIBILITIES, LIMITS } from "@/lib/constants";
import type { ProjectDetail, UserCard, CollabRequestDTO } from "@/lib/dto";

export const dynamic = "force-dynamic";

const categorySlugs = new Set<string>(PROJECT_CATEGORIES.map((c) => c.slug));
const statusSlugs = new Set<string>(PROJECT_STATUSES.map((s) => s.slug));
const visibilitySlugs = new Set<string>(VISIBILITIES.map((v) => v.slug));
const skillSlugs = new Set<string>(SKILLS.map((s) => s.slug));

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

type ProjectDetailRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  visibility: string;
  coverImage: string;
  repositoryUrl: string;
  demoUrl: string;
  websiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
  owner: OwnerRow;
  tags: { tag: string }[];
  requiredSkills: { skill: { slug: string } }[];
  _count: { members: number; likes: number };
};

const detailInclude = {
  owner: { select: userCardFields },
  tags: { select: { tag: true }, orderBy: { tag: "asc" as const } },
  requiredSkills: { select: { skill: { select: { slug: true } } } },
  _count: { select: { members: true, likes: true } },
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

function toProjectDetail(p: ProjectDetailRow): ProjectDetail {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    category: p.category,
    status: p.status,
    visibility: p.visibility,
    coverImage: p.coverImage,
    repositoryUrl: p.repositoryUrl,
    demoUrl: p.demoUrl,
    websiteUrl: p.websiteUrl,
    tags: p.tags.map((t) => t.tag),
    requiredSkills: p.requiredSkills.map((s) => s.skill.slug),
    owner: toUserCard(p.owner),
    likeCount: p._count.likes,
    memberCount: p._count.members,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

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

function cleanTags(tags?: string[]): string[] {
  if (!tags) return [];
  const out: string[] = [];
  for (const raw of tags) {
    const t = raw.trim().toLowerCase();
    if (t && !out.includes(t)) out.push(t);
  }
  return out;
}

// ─── GET /api/projects/[slug] ────────────────────────────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();

    const project = await db.project.findUnique({ where: { slug }, include: detailInclude });
    if (!project) throw new HttpError("Project not found.", 404);

    const myRole: ProjectRole = await getProjectRole(project.id, viewer?.id);
    if (project.visibility === "PRIVATE" && !myRole) {
      throw new HttpError("This project is private.", 404); // never leak existence
    }

    const [likedRow, savedRow, myRequestRow] = viewer
      ? await Promise.all([
          db.projectLike.findUnique({
            where: { userId_projectId: { userId: viewer.id, projectId: project.id } },
          }),
          db.projectSave.findUnique({
            where: { userId_projectId: { userId: viewer.id, projectId: project.id } },
          }),
          db.collaborationRequest.findUnique({
            where: { projectId_applicantId: { projectId: project.id, applicantId: viewer.id } },
            include: { applicant: { select: userCardFields } },
          }),
        ])
      : [null, null, null];

    const myRequest =
      myRequestRow && myRequestRow.status === "PENDING" ? toCollabRequest(myRequestRow) : null;

    return ok({
      project: toProjectDetail(project),
      myRole,
      liked: Boolean(likedRow),
      saved: Boolean(savedRow),
      likeCount: project._count.likes,
      myRequest,
    });
  });
}

// ─── PATCH /api/projects/[slug] — edit (owner/admin) ─────────

const urlField = z
  .string()
  .trim()
  .max(500, "URL must be at most 500 characters.")
  .transform((v) => (!v || /^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Must be a valid http(s) URL.");

const patchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(80, "Name must be at most 80 characters.")
    .optional(),
  tagline: z
    .string()
    .trim()
    .min(1, "Tagline is required.")
    .max(LIMITS.tagline, `Tagline must be at most ${LIMITS.tagline} characters.`)
    .optional(),
  description: z.string().trim().max(LIMITS.projectDescription).optional(),
  category: z.string().refine((v) => categorySlugs.has(v), "Unknown category.").optional(),
  status: z.string().refine((v) => statusSlugs.has(v), "Unknown status.").optional(),
  visibility: z.string().refine((v) => visibilitySlugs.has(v), "Unknown visibility.").optional(),
  tags: z
    .array(z.string().trim().min(1).max(24, "Each tag must be 1-24 characters."))
    .max(8, "At most 8 tags.")
    .optional(),
  requiredSkills: z
    .array(z.string().refine((v) => skillSlugs.has(v), "Unknown skill."))
    .max(SKILLS.length)
    .optional(),
  repositoryUrl: urlField.optional(),
  demoUrl: urlField.optional(),
  websiteUrl: urlField.optional(),
  coverImage: z.string().trim().max(500).optional(),
});

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await db.project.findUnique({ where: { slug } });
    if (!project) throw new HttpError("Project not found.", 404);

    const role = await getProjectRole(project.id, user.id);
    if (!canManageProject(role)) {
      throw new HttpError("Only the project owner or an admin can edit this project.", 403);
    }

    const body = await parseBody(req, patchSchema);

    // Award only on a real transition into RELEASED.
    const willRelease = body.status !== undefined && body.status === "RELEASED" && project.status !== "RELEASED";

    const tags = body.tags !== undefined ? cleanTags(body.tags) : null;
    const skillList = body.requiredSkills !== undefined ? [...new Set(body.requiredSkills)] : null;
    const skillIds =
      skillList && skillList.length
        ? await db.skill.findMany({ where: { slug: { in: skillList } }, select: { id: true } })
        : [];

    await db.$transaction(async (tx) => {
      await tx.project.update({
        where: { id: project.id },
        data: {
          ...(body.name !== undefined ? { name: body.name } : {}),
          ...(body.tagline !== undefined ? { tagline: body.tagline } : {}),
          ...(body.description !== undefined ? { description: body.description } : {}),
          ...(body.category !== undefined ? { category: body.category } : {}),
          ...(body.status !== undefined ? { status: body.status } : {}),
          ...(body.visibility !== undefined ? { visibility: body.visibility } : {}),
          ...(body.repositoryUrl !== undefined ? { repositoryUrl: body.repositoryUrl } : {}),
          ...(body.demoUrl !== undefined ? { demoUrl: body.demoUrl } : {}),
          ...(body.websiteUrl !== undefined ? { websiteUrl: body.websiteUrl } : {}),
          ...(body.coverImage !== undefined ? { coverImage: body.coverImage } : {}),
        },
      });
      if (tags) {
        await tx.projectTag.deleteMany({ where: { projectId: project.id } });
        if (tags.length) {
          await tx.projectTag.createMany({
            data: tags.map((tag) => ({ projectId: project.id, tag })),
          });
        }
      }
      if (skillList) {
        await tx.projectRequiredSkill.deleteMany({ where: { projectId: project.id } });
        if (skillIds.length) {
          await tx.projectRequiredSkill.createMany({
            data: skillIds.map((s) => ({ projectId: project.id, skillId: s.id })),
          });
        }
      }
    });

    if (willRelease) {
      await logActivity({
        projectId: project.id,
        actorId: user.id,
        eventType: "RELEASE_PUBLISHED",
        metadata: { projectName: project.name },
      });
      await awardContribution({
        userId: project.ownerId,
        projectId: project.id,
        eventType: "RELEASE_PUBLISHED",
        sourceType: "project",
        sourceId: project.id,
      });
    }

    const fresh = await db.project.findUnique({ where: { id: project.id }, include: detailInclude });
    if (!fresh) throw new HttpError("Project not found.", 404);
    return ok({ project: toProjectDetail(fresh) });
  });
}

// ─── DELETE /api/projects/[slug] — archive (owner only) ──────

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const user = await requireUser();

    const project = await db.project.findUnique({ where: { slug } });
    if (!project) throw new HttpError("Project not found.", 404);

    const role = await getProjectRole(project.id, user.id);
    if (role !== "OWNER") {
      throw new HttpError("Only the project owner can archive this project.", 403);
    }

    await db.project.update({
      where: { id: project.id },
      data: { status: "ARCHIVED", archivedAt: new Date() },
    });

    return ok({ ok: true });
  });
}
