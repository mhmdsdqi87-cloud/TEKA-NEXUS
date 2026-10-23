// TEKA NEXUS — /api/projects
// GET   discovery list (PUBLIC + UNLISTED only; never PRIVATE)
// POST  create project (auth; owner membership, activity + reputation award)

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
  awardContribution,
  logActivity,
  uniqueProjectSlug,
} from "@/lib/server";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  SKILLS,
  VISIBILITIES,
  LIMITS,
} from "@/lib/constants";
import type { ProjectCard, ProjectDetail, UserCard } from "@/lib/dto";

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

type ProjectCardRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  visibility: string;
  coverImage: string;
  bgImage: string;
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

const cardInclude = {
  owner: { select: userCardFields },
  tags: { select: { tag: true }, orderBy: { tag: "asc" as const } },
  requiredSkills: { select: { skill: { select: { slug: true } } } },
  _count: { select: { members: true, likes: true, comments: true, saves: true, updates: true } },
};

// ─── Popularity score (sort=popular) ────────────────────────
// Engagement counts weighted by how hard each signal is to earn, damped by
// freshness so long-dead projects don't squat the top forever:
//   raw      = likes*3 + comments*2 + saves*2 + members*4 + updates*3
//   freshness= 1 (today) → 0 (60+ days since last update)
//   score    = raw * (0.5 + freshness)   // fresh work gets up to 1.5×
const POPULARITY_WEIGHTS = { likes: 3, comments: 2, saves: 2, members: 4, updates: 3 };
const FRESHNESS_WINDOW_DAYS = 60;

type PopularityRow = {
  _count: { likes: number; comments: number; saves: number; members: number; updates: number };
  updatedAt: Date;
  createdAt: Date;
};

function popularityScore(p: PopularityRow): number {
  const raw =
    p._count.likes * POPULARITY_WEIGHTS.likes +
    p._count.comments * POPULARITY_WEIGHTS.comments +
    p._count.saves * POPULARITY_WEIGHTS.saves +
    p._count.members * POPULARITY_WEIGHTS.members +
    p._count.updates * POPULARITY_WEIGHTS.updates;
  const days = (Date.now() - p.updatedAt.getTime()) / 86_400_000;
  const freshness = Math.max(0, 1 - days / FRESHNESS_WINDOW_DAYS);
  return raw * (0.5 + freshness);
}

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

function toProjectCard(p: ProjectCardRow): ProjectCard {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    status: p.status,
    visibility: p.visibility,
    coverImage: p.coverImage,
    tags: p.tags.map((t) => t.tag),
    requiredSkills: p.requiredSkills.map((s) => s.skill.slug),
    owner: toUserCard(p.owner),
    likeCount: p._count.likes,
    memberCount: p._count.members,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

function toProjectDetail(p: ProjectCardRow): ProjectDetail {
  return {
    ...toProjectCard(p),
    description: p.description,
    bgImage: p.bgImage,
    repositoryUrl: p.repositoryUrl,
    demoUrl: p.demoUrl,
    websiteUrl: p.websiteUrl,
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

// ─── GET /api/projects — discovery ───────────────────────────

const querySchema = z.object({
  q: z.string().trim().max(LIMITS.searchQuery).optional(),
  category: z.string().max(64).optional(),
  status: z.string().max(32).optional(),
  tag: z.string().trim().max(32).optional(),
  sort: z.enum(["recent", "updated", "popular"]).optional(),
  page: z.coerce.number().int().min(1).optional(),
});

export async function GET(req: NextRequest) {
  return handle(async () => {
    const parsed = querySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams.entries()));
    if (!parsed.success) throw new HttpError("Invalid query parameters.", 400);
    const { q, category, status, tag, sort } = parsed.data;
    const page = parsed.data.page ?? 1;

    if (category && !categorySlugs.has(category)) {
      throw new HttpError("Unknown category.", 400);
    }

    const where: Prisma.ProjectWhereInput = {
      visibility: { in: ["PUBLIC", "UNLISTED"] }, // PRIVATE never appears in discovery
    };
    if (category) where.category = category;
    if (status) where.status = status;
    if (tag) where.tags = { some: { tag: { contains: tag } } };
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { tagline: { contains: q } },
        { tags: { some: { tag: { contains: q } } } },
      ];
    }

    const pageSize = LIMITS.pageSize;

    // "popular" needs engagement counts that don't exist as sortable columns,
    // so we score in JS. The catalog is small (tens of rows), making this
    // cheaper and far more honest than a likes-only SQL sort.
    if (sort === "popular") {
      const rows = await db.project.findMany({
        where,
        include: cardInclude,
        orderBy: [{ createdAt: "desc" }],
      });
      const scored = rows
        .map((p) => ({ p, score: popularityScore(p) }))
        .sort((a, b) => b.score - a.score || b.p.createdAt.getTime() - a.p.createdAt.getTime());
      const total = scored.length;
      const pageRows = scored.slice((page - 1) * pageSize, page * pageSize).map((s) => s.p);
      return ok({
        projects: pageRows.map(toProjectCard),
        page,
        pages: Math.max(1, Math.ceil(total / pageSize)),
        total,
      });
    }

    const orderBy: Prisma.ProjectOrderByWithRelationInput[] =
      sort === "updated" ? [{ updatedAt: "desc" }] : [{ createdAt: "desc" }];

    const [total, rows] = await Promise.all([
      db.project.count({ where }),
      db.project.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: cardInclude,
      }),
    ]);

    const pages = Math.max(1, Math.ceil(total / pageSize));
    return ok({ projects: rows.map(toProjectCard), page, pages, total });
  });
}

// ─── POST /api/projects — create ─────────────────────────────

const urlField = z
  .string()
  .trim()
  .max(500, "URL must be at most 500 characters.")
  .transform((v) => (!v || /^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Must be a valid http(s) URL.");

const createSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(80, "Name must be at most 80 characters."),
  tagline: z
    .string()
    .trim()
    .min(1, "Tagline is required.")
    .max(LIMITS.tagline, `Tagline must be at most ${LIMITS.tagline} characters.`),
  description: z.string().trim().max(LIMITS.projectDescription).optional(),
  category: z.string().refine((v) => categorySlugs.has(v), "Unknown category."),
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
  bgImage: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//i.test(v), "Invalid background path or URL.")
    .optional(),
});

export async function POST(req: NextRequest) {
  return handle(async () => {
    const user = await requireUser();
    const body = await parseBody(req, createSchema);

    const status = body.status ?? "IDEA";
    const visibility = body.visibility ?? "PUBLIC";
    const tags = cleanTags(body.tags);
    const skillList = [...new Set(body.requiredSkills ?? [])];
    const skillIds = skillList.length
      ? await db.skill.findMany({ where: { slug: { in: skillList } }, select: { id: true } })
      : [];

    const slug = await uniqueProjectSlug(body.name);

    const projectId = await db.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          slug,
          name: body.name,
          tagline: body.tagline,
          description: body.description ?? "",
          category: body.category,
          status,
          visibility,
          coverImage: body.coverImage ?? "",
          bgImage: body.bgImage ?? "",
          repositoryUrl: body.repositoryUrl ?? "",
          demoUrl: body.demoUrl ?? "",
          websiteUrl: body.websiteUrl ?? "",
          ownerId: user.id,
        },
      });
      await tx.projectMember.create({
        data: { projectId: project.id, userId: user.id, role: "OWNER" },
      });
      if (tags.length) {
        await tx.projectTag.createMany({
          data: tags.map((tag) => ({ projectId: project.id, tag })),
        });
      }
      if (skillIds.length) {
        await tx.projectRequiredSkill.createMany({
          data: skillIds.map((s) => ({ projectId: project.id, skillId: s.id })),
        });
      }
      return project.id;
    });

    await logActivity({
      projectId,
      actorId: user.id,
      eventType: "PROJECT_CREATED",
      metadata: { projectName: body.name },
    });
    await awardContribution({
      userId: user.id,
      projectId,
      eventType: "PROJECT_CREATED",
      sourceType: "project",
      sourceId: projectId,
    });

    const created = await db.project.findUnique({ where: { id: projectId }, include: cardInclude });
    if (!created) throw new HttpError("Project could not be loaded after creation.", 500);
    return ok({ project: toProjectDetail(created) }, 201);
  });
}
