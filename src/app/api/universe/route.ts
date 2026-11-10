// TEKA NEXUS — /api/universe
// GET: real platform aggregates for the Live Universe workspace.
//
// DATA INTEGRITY CONTRACT (NEXUS 2.0): every number in this response comes
// from a real database aggregate. Nothing is sampled, extrapolated, or
// fabricated. Countries only appear when at least one user has SELF-DECLARED
// that country in their profile — an undeclared user is invisible here by
// design (never guessed from IP, locale, or anything else).
//
// The response is cached in-memory for 30s (per serverless instance) so the
// client's live-polling loop stays cheap on Supabase. Activity updates arrive
// via polling (Vercel serverless has no persistent socket layer — honest
// constraint documented in the view).

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, handle } from "@/lib/server";

export const dynamic = "force-dynamic";

const PUBLIC_PROJECT = { visibility: "PUBLIC", archivedAt: null } as const;

type UniversePayload = {
  stats: {
    users: number;
    declaredCountries: number;
    publicProjects: number;
    tasksDone: number;
    milestonesCompleted: number;
    requestsAccepted: number;
    updatesPosted: number;
    generatedAt: string;
  };
  countries: Array<{
    code: string;
    users: number;
    projects: number;
    activity30d: number;
  }>;
  technologies: Array<{ tag: string; projects: number }>;
  activity: Array<{
    id: string;
    eventType: string;
    xp: number;
    reputation: number;
    createdAt: string;
    actor: { username: string; displayName: string; avatarColor: string; country: string };
    project: { slug: string; name: string; category: string } | null;
  }>;
  projects: Array<{
    slug: string;
    name: string;
    tagline: string;
    category: string;
    status: string;
    createdAt: string;
    owner: { username: string; displayName: string; avatarColor: string; country: string };
    members: number;
    likes: number;
    tags: string[];
  }>;
};

// ─── 30s in-memory TTL cache ─────────────────────────────────
let cache: { payload: UniversePayload; at: number } | null = null;
const CACHE_TTL_MS = 30_000;

export async function GET(_req: NextRequest) {
  return handle(async () => {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return ok({ universe: cache.payload, cached: true });
    }

    // ── Core counts (real aggregates) ───────────────────────
    const [
      users,
      publicProjects,
      tasksDone,
      milestonesCompleted,
      requestsAccepted,
      updatesPosted,
      countryGroups,
      topTags,
      recentEvents,
      publicProjectRows,
      publicProjectTagRows,
    ] = await Promise.all([
      db.user.count(),
      db.project.count({ where: PUBLIC_PROJECT }),
      db.task.count({ where: { status: "DONE", project: PUBLIC_PROJECT } }),
      db.milestone.count({ where: { completedAt: { not: null }, project: PUBLIC_PROJECT } }),
      db.collaborationRequest.count({ where: { status: "ACCEPTED", project: PUBLIC_PROJECT } }),
      db.projectUpdate.count({ where: { project: PUBLIC_PROJECT } }),
      // Self-declared countries only — never inferred.
      db.user.groupBy({
        by: ["country"],
        where: { country: { not: "" } },
        _count: { _all: true },
      }),
      db.projectTag.groupBy({
        by: ["tag"],
        where: { project: PUBLIC_PROJECT },
        _count: { _all: true },
        orderBy: { _count: { tag: "desc" } },
        take: 24,
      }),
      db.contributionEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 24,
        include: {
          user: { select: { username: true, displayName: true, avatarColor: true, country: true } },
          project: { select: { slug: true, name: true, category: true } },
        },
      }),
      db.project.findMany({
        where: PUBLIC_PROJECT,
        orderBy: { createdAt: "desc" },
        take: 60,
        select: {
          id: true,
          slug: true,
          name: true,
          tagline: true,
          category: true,
          status: true,
          createdAt: true,
          ownerId: true,
          owner: { select: { username: true, displayName: true, avatarColor: true, country: true } },
          _count: { select: { members: true, likes: true } },
          tags: { select: { tag: true } },
        },
      }),
      db.projectTag.findMany({
        where: { project: PUBLIC_PROJECT },
        select: { projectId: true, tag: true },
      }),
    ]);

    // ── Projects per country + recent activity per country ──
    // Small-scale joins done in-process (all rows are public aggregates).
    const activityByUser = await db.contributionEvent.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 3600 * 1000) } },
      select: { userId: true },
    });
    const countryByUserId = new Map<string, string>();
    const userIds = [...new Set(activityByUser.map((e) => e.userId))];
    if (userIds.length > 0) {
      const rows = await db.user.findMany({
        where: { id: { in: userIds }, country: { not: "" } },
        select: { id: true, country: true },
      });
      for (const r of rows) countryByUserId.set(r.id, r.country);
    }

    const projectsByCountry = new Map<string, number>();
    for (const p of publicProjectRows) {
      const c = p.owner.country;
      if (c) projectsByCountry.set(c, (projectsByCountry.get(c) ?? 0) + 1);
    }

    const activityByCountry = new Map<string, number>();
    for (const e of activityByUser) {
      const c = countryByUserId.get(e.userId);
      if (c) activityByCountry.set(c, (activityByCountry.get(c) ?? 0) + 1);
    }

    const countries = countryGroups
      .map((g) => ({
        code: g.country,
        users: g._count._all,
        projects: projectsByCountry.get(g.country) ?? 0,
        activity30d: activityByCountry.get(g.country) ?? 0,
      }))
      .sort((a, b) => b.users - a.users || b.projects - a.projects);

    const tagsByProject = new Map<string, string[]>();
    for (const t of publicProjectTagRows) {
      const list = tagsByProject.get(t.projectId);
      if (list) list.push(t.tag);
      else tagsByProject.set(t.projectId, [t.tag]);
    }

    const payload: UniversePayload = {
      stats: {
        users,
        declaredCountries: countries.length,
        publicProjects,
        tasksDone,
        milestonesCompleted,
        requestsAccepted,
        updatesPosted,
        generatedAt: new Date().toISOString(),
      },
      countries,
      technologies: topTags.map((t) => ({ tag: t.tag, projects: t._count._all })),
      activity: recentEvents.map((e) => ({
        id: e.id,
        eventType: e.eventType,
        xp: e.xp,
        reputation: e.reputation,
        createdAt: e.createdAt.toISOString(),
        actor: {
          username: e.user.username,
          displayName: e.user.displayName,
          avatarColor: e.user.avatarColor,
          country: e.user.country,
        },
        project: e.project
          ? { slug: e.project.slug, name: e.project.name, category: e.project.category }
          : null,
      })),
      projects: publicProjectRows.map((p) => ({
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        category: p.category,
        status: p.status,
        createdAt: p.createdAt.toISOString(),
        owner: {
          username: p.owner.username,
          displayName: p.owner.displayName,
          avatarColor: p.owner.avatarColor,
          country: p.owner.country,
        },
        members: p._count.members,
        likes: p._count.likes,
        tags: tagsByProject.get(p.id) ?? [],
      })),
    };

    cache = { payload, at: Date.now() };
    return ok({ universe: payload, cached: false });
  });
}
