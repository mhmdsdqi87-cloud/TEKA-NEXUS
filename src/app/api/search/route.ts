// GET /api/search?q= — public projects, users, and tags. Min 2 chars.

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { handle, ok } from "@/lib/server";
import { LIMITS } from "@/lib/constants";

const PUBLIC_VISIBILITY = ["PUBLIC", "UNLISTED"] as const;

type OwnerLike = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  bio: string;
  reputation: number;
};

function userCard(u: OwnerLike) {
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

function toProjectCard(p: {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  visibility: string;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
  owner: OwnerLike;
  tags: { tag: string }[];
  requiredSkills: { skill: { slug: string } }[];
  _count: { likes: number; members: number };
}) {
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
    requiredSkills: p.requiredSkills.map((rs) => rs.skill.slug),
    owner: userCard(p.owner),
    likeCount: p._count.likes,
    memberCount: p._count.members,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

const projectInclude = {
  owner: true,
  tags: true,
  requiredSkills: { include: { skill: true } },
  _count: { select: { likes: true, members: true } },
} as const;

export async function GET(req: NextRequest) {
  return handle(async () => {
    const q = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, LIMITS.searchQuery);
    if (q.length < 2) return ok({ projects: [], users: [], tags: [] });

    const projects = await db.project.findMany({
      where: {
        visibility: { in: [...PUBLIC_VISIBILITY] },
        OR: [{ name: { contains: q } }, { tagline: { contains: q } }],
      },
      include: projectInclude,
      orderBy: { updatedAt: "desc" },
      take: 6,
    });

    const users = await db.user.findMany({
      where: { OR: [{ username: { contains: q } }, { displayName: { contains: q } }] },
      orderBy: { reputation: "desc" },
      take: 6,
    });

    const tagRows = await db.projectTag.findMany({
      where: {
        tag: { contains: q },
        project: { visibility: { in: [...PUBLIC_VISIBILITY] } },
      },
      distinct: ["tag"],
      take: 6,
      select: { tag: true },
    });

    const tags = await Promise.all(
      tagRows.map(async (t) => ({
        tag: t.tag,
        count: await db.project.count({
          where: {
            visibility: { in: [...PUBLIC_VISIBILITY] },
            tags: { some: { tag: t.tag } },
          },
        }),
      })),
    );

    return ok({
      projects: projects.map(toProjectCard),
      users: users.map(userCard),
      tags,
    });
  });
}
