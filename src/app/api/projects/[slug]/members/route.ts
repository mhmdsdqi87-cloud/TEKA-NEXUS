// TEKA NEXUS — /api/projects/[slug]/members
// GET list members (project read access; OWNER first, then by join date)
//     + canManage flag for the viewer.

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok,
  handle,
  requireProjectAccess,
  getProjectRole,
  canManageProject,
} from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import type { ProjectMemberDTO, UserCard } from "@/lib/dto";

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

type MemberRow = {
  id: string;
  role: string;
  joinedAt: Date;
  user: OwnerRow;
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

function toMemberDTO(m: MemberRow): ProjectMemberDTO {
  return {
    id: m.id,
    role: m.role,
    joinedAt: m.joinedAt.toISOString(),
    user: toUserCard(m.user),
  };
}

const ROLE_RANK: Record<string, number> = {
  OWNER: 0,
  ADMIN: 1,
  CONTRIBUTOR: 2,
  VIEWER: 3,
};

// ─── GET /api/projects/[slug]/members ────────────────────────

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();

    const project = await requireProjectAccess(slug, viewer?.id);

    const members = await db.projectMember.findMany({
      where: { projectId: project.id },
      include: { user: { select: userCardFields } },
    });

    members.sort((a, b) => {
      const rank = (ROLE_RANK[a.role] ?? 9) - (ROLE_RANK[b.role] ?? 9);
      if (rank !== 0) return rank;
      return a.joinedAt.getTime() - b.joinedAt.getTime();
    });

    const myRole = viewer ? await getProjectRole(project.id, viewer.id) : null;

    return ok({ members: members.map(toMemberDTO), canManage: canManageProject(myRole) });
  });
}
