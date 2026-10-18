// GET /api/users/[username] — public profile with projects and contributions.

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { handle, HttpError, ok } from "@/lib/server";
import { getAuthUser, safeParseArray } from "@/lib/auth";

type OwnerLike = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  bio: string;
  reputation: number;
};

type ProjectWithRelations = {
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

function toProjectCard(p: ProjectWithRelations) {
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

export async function GET(req: NextRequest, ctx: { params: Promise<{ username: string }> }) {
  return handle(async () => {
    const { username: rawUsername } = await ctx.params;
    const username = rawUsername.trim().toLowerCase();
    const viewer = await getAuthUser();

    const user = await db.user.findUnique({
      where: { username },
      include: {
        userSkills: { include: { skill: true } },
        _count: { select: { followers: true, following: true } },
      },
    });
    if (!user) throw new HttpError("User not found.", 404);

    const projects = await db.project.findMany({
      where: { ownerId: user.id, visibility: { in: ["PUBLIC", "UNLISTED"] } },
      include: {
        owner: true,
        tags: true,
        requiredSkills: { include: { skill: true } },
        _count: { select: { likes: true, members: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 12,
    });

    const contributions = await db.contributionEvent.findMany({
      where: { userId: user.id },
      include: { project: { select: { slug: true, name: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const [projectCount, followRow] = await Promise.all([
      db.project.count({ where: { ownerId: user.id } }),
      viewer && viewer.id !== user.id
        ? db.follow.findUnique({
            where: { followerId_followingId: { followerId: viewer.id, followingId: user.id } },
          })
        : Promise.resolve(null),
    ]);

    const profile = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarColor: user.avatarColor,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      reputation: user.reputation,
      xp: user.xp,
      websiteUrl: user.websiteUrl,
      role: user.role,
      goals: safeParseArray(user.goals),
      interests: safeParseArray(user.interests),
      skills: user.userSkills.map((us) => us.skill.slug),
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt.toISOString(),
      followerCount: user._count.followers,
      followingCount: user._count.following,
      projectCount,
      isFollowing: !!followRow,
      isSelf: viewer?.id === user.id,
    };

    return ok({
      user: profile,
      projects: projects.map(toProjectCard),
      contributions: contributions.map((c) => ({
        id: c.id,
        eventType: c.eventType,
        sourceType: c.sourceType,
        xp: c.xp,
        reputation: c.reputation,
        createdAt: c.createdAt.toISOString(),
        project: c.project ? { slug: c.project.slug, name: c.project.name } : null,
      })),
    });
  });
}
