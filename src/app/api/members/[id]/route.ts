// TEKA NEXUS — /api/members/[id]
// PATCH   change a member's role (project OWNER only).
//         role=OWNER performs an ownership transfer in a transaction
//         (target becomes OWNER, current owner becomes ADMIN, Project.ownerId follows).
//         Cannot demote the last OWNER.
// DELETE  remove member: self-leave or owner removes others; last owner protected.

import type { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { ok, handle, HttpError, parseBody, requireUser, getProjectRole } from "@/lib/server";
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

// ─── PATCH /api/members/[id] — owner only ────────────────────

const patchSchema = z.object({
  role: z.enum(["ADMIN", "CONTRIBUTOR", "VIEWER", "OWNER"]),
});

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const member = await db.projectMember.findUnique({ where: { id } });
    if (!member) throw new HttpError("Member not found.", 404);

    const callerRole = await getProjectRole(member.projectId, user.id);
    if (callerRole !== "OWNER") {
      throw new HttpError("Only the project owner can change member roles.", 403);
    }

    const body = await parseBody(req, patchSchema);

    // Ownership transfer: target becomes OWNER, current owner steps down to ADMIN.
    if (body.role === "OWNER") {
      if (member.userId === user.id) {
        throw new HttpError("You are already the owner of this project.", 400);
      }
      const callerMembership = await db.projectMember.findUnique({
        where: { projectId_userId: { projectId: member.projectId, userId: user.id } },
      });
      if (!callerMembership) {
        throw new HttpError("You are not a member of this project.", 403);
      }

      await db.$transaction(async (tx) => {
        await tx.projectMember.update({
          where: { id: member.id },
          data: { role: "OWNER" },
        });
        await tx.projectMember.update({
          where: { id: callerMembership.id },
          data: { role: "ADMIN" },
        });
        await tx.project.update({
          where: { id: member.projectId },
          data: { ownerId: member.userId },
        });
      });
    } else {
      // Guard: cannot demote the last OWNER (covers self-demotion).
      if (member.role === "OWNER") {
        const ownerCount = await db.projectMember.count({
          where: { projectId: member.projectId, role: "OWNER" },
        });
        if (ownerCount <= 1) {
          throw new HttpError(
            member.userId === user.id
              ? "Transfer ownership before changing your role."
              : "Transfer ownership before changing this member's role.",
            400
          );
        }
      }
      await db.projectMember.update({
        where: { id: member.id },
        data: { role: body.role },
      });
    }

    const fresh = await db.projectMember.findUnique({
      where: { id: member.id },
      include: { user: { select: userCardFields } },
    });
    if (!fresh) throw new HttpError("Member not found.", 404);
    return ok({ member: toMemberDTO(fresh) });
  });
}

// ─── DELETE /api/members/[id] — leave or remove ──────────────

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const { id } = await ctx.params;
    const user = await requireUser();

    const member = await db.projectMember.findUnique({ where: { id } });
    if (!member) throw new HttpError("Member not found.", 404);

    const isSelf = member.userId === user.id;
    if (!isSelf) {
      const callerRole = await getProjectRole(member.projectId, user.id);
      if (callerRole !== "OWNER") {
        throw new HttpError("Only the project owner can remove other members.", 403);
      }
    }

    // Last owner can never leave (or be removed) without transferring first.
    if (member.role === "OWNER") {
      const ownerCount = await db.projectMember.count({
        where: { projectId: member.projectId, role: "OWNER" },
      });
      if (ownerCount <= 1) {
        throw new HttpError("Transfer ownership before leaving.", 400);
      }
    }

    await db.projectMember.delete({ where: { id: member.id } });
    return ok({ ok: true });
  });
}
