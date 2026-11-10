// TEKA NEXUS — /api/projects/[slug]/dna
// GET: full Project DNA dossier — digital identity assembled from REAL
// platform records only.
//
// DATA INTEGRITY CONTRACT (NEXUS 2.0):
// - Identity, stack, milestones, timeline, contributors → verbatim DB rows.
// - Health indicators → calculated from those rows; the response marks every
//   derived field and the UI labels them "CALCULATED". No AI estimates, no
//   invented telemetry. GitHub-derived data arrives in Phase 3 (Code
//   Intelligence) and is deliberately absent here.
// - Visibility: enforced via requireProjectAccess (PRIVATE projects are only
//   visible to their members; GUEST role for public viewers).

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, handle, requireProjectAccess, getProjectRole } from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { groupStackLayers } from "@/lib/countries";
import type {
  DnaContributor,
  DnaHealth,
  DnaResponse,
  DnaTimelineEvent,
  MilestoneDTO,
  UserCard,
} from "@/lib/dto";

export const dynamic = "force-dynamic";

const userCardFields = {
  id: true,
  username: true,
  displayName: true,
  avatarColor: true,
  avatarUrl: true,
  bio: true,
  reputation: true,
  country: true,
} as const;

type ContributorRow = UserCard & { country: string };

function toUserCard(u: {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  bio: string;
  reputation: number;
  country: string;
}): ContributorRow {
  return {
    id: u.id,
    username: u.username,
    displayName: u.displayName,
    avatarColor: u.avatarColor,
    avatarUrl: u.avatarUrl,
    bio: u.bio,
    reputation: u.reputation,
    country: u.country,
  };
}

function toMilestone(m: {
  id: string;
  title: string;
  description: string;
  dueAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  creator: { id: string; username: string; displayName: string; avatarColor: string; avatarUrl: string | null; bio: string; reputation: number; country: string };
}): MilestoneDTO {
  return {
    id: m.id,
    title: m.title,
    description: m.description,
    dueAt: m.dueAt ? m.dueAt.toISOString() : null,
    completedAt: m.completedAt ? m.completedAt.toISOString() : null,
    createdAt: m.createdAt.toISOString(),
    creator: toUserCard(m.creator),
  };
}

const TIMELINE_CAP = 120;

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  return handle(async () => {
    const { slug } = await ctx.params;
    const viewer = await getAuthUser();

    const project = await requireProjectAccess(slug, viewer?.id);
    const viewerRole = viewer ? await getProjectRole(project.id, viewer.id) : "GUEST";

    const [
      ownerRow,
      members,
      milestones,
      updates,
      completedTasks,
      counts,
      activities,
      verifiedEvents,
    ] = await Promise.all([
      db.project.findUnique({
        where: { id: project.id },
        select: { owner: { select: userCardFields } },
      }),
      db.projectMember.findMany({
        where: { projectId: project.id },
        orderBy: { joinedAt: "asc" },
        include: { user: { select: userCardFields } },
      }),
      db.milestone.findMany({
        where: { projectId: project.id },
        orderBy: { createdAt: "asc" },
        include: { creator: { select: userCardFields } },
      }),
      db.projectUpdate.findMany({
        where: { projectId: project.id },
        orderBy: { createdAt: "desc" },
        take: 30,
        select: { id: true, title: true, createdAt: true, author: { select: { username: true } } },
      }),
      db.task.findMany({
        where: { projectId: project.id, completedAt: { not: null } },
        orderBy: { completedAt: "desc" },
        take: 40,
        select: { id: true, title: true, completedAt: true, assignee: { select: { username: true } } },
      }),
      db.project.findUnique({
        where: { id: project.id },
        select: {
          _count: {
            select: {
              members: true,
              likes: true,
              updates: true,
              tasks: true,
              comments: true,
              requests: { where: { status: "PENDING" } },
            },
          },
        },
      }),
      // Real activity rows for health calculation (last 30 days).
      db.projectActivity.findMany({
        where: { projectId: project.id, createdAt: { gte: new Date(Date.now() - 30 * 24 * 3600 * 1000) } },
        orderBy: { createdAt: "desc" },
        take: 200,
        select: { id: true, createdAt: true, eventType: true },
      }),
      // Verified contribution events per member (XP ledger — already
      // idempotent per event, so the count is a real verified-actions number).
      db.contributionEvent.groupBy({
        by: ["userId"],
        where: { projectId: project.id },
        _count: { _all: true },
      }),
    ]);

    // ── Identity ─────────────────────────────────────────────
    const identity = {
      slug: project.slug,
      name: project.name,
      tagline: project.tagline,
      description: project.description,
      category: project.category,
      status: project.status,
      visibility: project.visibility,
      coverImage: project.coverImage,
      repositoryUrl: project.repositoryUrl,
      demoUrl: project.demoUrl,
      websiteUrl: project.websiteUrl,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      owner: ownerRow ? toUserCard(ownerRow.owner) : members.length > 0 ? toUserCard(members[0].user) : null,
      counts: {
        members: counts?._count.members ?? members.length,
        likes: counts?._count.likes ?? 0,
        updates: counts?._count.updates ?? 0,
        tasks: counts?._count.tasks ?? 0,
        comments: counts?._count.comments ?? 0,
        openRequests: counts?._count.requests ?? 0,
      },
    } as DnaResponse["dna"]["identity"] & { owner: ContributorRow | null };

    // Owner is mandatory by schema; narrow for the DTO type.
    if (!identity.owner) {
      const fallback = await db.project.findUnique({
        where: { id: project.id },
        select: { owner: { select: userCardFields } },
      });
      if (fallback) identity.owner = toUserCard(fallback.owner);
    }

    // ── Stack (declared tags → taxonomy layers) ──────────────
    const tagRows = await db.projectTag.findMany({
      where: { projectId: project.id },
      select: { tag: true },
      orderBy: { tag: "asc" },
    });
    const tags = tagRows.map((t) => t.tag);
    const stack = { tags, layers: groupStackLayers(tags) };

    // ── Milestones ───────────────────────────────────────────
    const milestoneDtos = milestones.map(toMilestone);

    // ── Timeline (real records, merged chronologically) ──────
    type Raw = { id: string; kind: DnaTimelineEvent["kind"]; at: Date; title: string; actor: string | null; href: string | null };
    const raw: Raw[] = [];
    raw.push({
      id: `created:${project.id}`,
      kind: "PROJECT_CREATED",
      at: project.createdAt,
      title: project.name,
      actor: identity.owner?.username ?? null,
      href: null,
    });
    for (const m of members) {
      raw.push({
        id: `join:${m.id}`,
        kind: "MEMBER_JOINED",
        at: m.joinedAt,
        title: m.user.username,
        actor: m.user.username,
        href: `/profile/${m.user.username}`,
      });
    }
    for (const u of updates) {
      raw.push({
        id: `update:${u.id}`,
        kind: "UPDATE_POSTED",
        at: u.createdAt,
        title: u.title,
        actor: u.author?.username ?? null,
        href: null,
      });
    }
    for (const m of milestones) {
      raw.push({
        id: `ms-created:${m.id}`,
        kind: "MILESTONE_CREATED",
        at: m.createdAt,
        title: m.title,
        actor: m.creator.username,
        href: null,
      });
      if (m.completedAt) {
        raw.push({
          id: `ms-done:${m.id}`,
          kind: "MILESTONE_COMPLETED",
          at: m.completedAt,
          title: m.title,
          actor: m.creator.username,
          href: null,
        });
      }
    }
    for (const t of completedTasks) {
      raw.push({
        id: `task:${t.id}`,
        kind: "TASK_COMPLETED",
        at: t.completedAt as Date,
        title: t.title,
        actor: t.assignee?.username ?? null,
        href: null,
      });
    }
    raw.sort((a, b) => b.at.getTime() - a.at.getTime());
    const timeline: DnaTimelineEvent[] = raw.slice(0, TIMELINE_CAP).map((e) => ({
      id: e.id,
      kind: e.kind,
      at: e.at.toISOString(),
      title: e.title,
      actor: e.actor,
      href: e.href,
    }));

    // ── Contributors (membership + verified events) ─────────
    const verifiedByUser = new Map(verifiedEvents.map((v) => [v.userId, v._count._all]));
    const contributors: DnaContributor[] = members.map((m) => ({
      user: toUserCard(m.user),
      role: m.role,
      joinedAt: m.joinedAt.toISOString(),
      verifiedEvents: verifiedByUser.get(m.userId) ?? 0,
    }));
    contributors.sort((a, b) => b.verifiedEvents - a.verifiedEvents || a.joinedAt.localeCompare(b.joinedAt));

    // ── Health (CALCULATED — formulas documented) ────────────
    const totalTasks = counts?._count.tasks ?? 0;
    const doneTasks = completedTasks.length < 40 && totalTasks > 0
      ? await db.task.count({ where: { projectId: project.id, status: "DONE" } })
      : completedTasks.length;
    const activity30d = activities.length;
    const now = Date.now();
    const ageDays = Math.max(
      1,
      Math.min(30, Math.ceil((now - project.createdAt.getTime()) / 86_400_000)),
    );
    const health: DnaHealth = {
      taskCompletionRate: totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) / 100 : null,
      openTasks: totalTasks - doneTasks,
      doneTasks,
      activity30d,
      momentumPerDay: Math.round((activity30d / ageDays) * 100) / 100,
      lastActivityAt: activities[0]?.createdAt.toISOString() ?? null,
      progressPercent:
        milestones.length > 0
          ? Math.round((milestones.filter((m) => m.completedAt).length / milestones.length) * 100)
          : null,
    };

    return ok({
      dna: {
        identity,
        stack,
        milestones: milestoneDtos,
        timeline,
        contributors,
        health,
        viewerRole,
      },
    });
  });
}
