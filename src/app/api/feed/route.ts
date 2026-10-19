// TEKA NEXUS — GET /api/feed
// Global activity feed: ProjectActivity events on PUBLIC projects only
// (UNLISTED and PRIVATE are excluded), newest first, 15 per page.

import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { ok, handle } from "@/lib/server";
import type { FeedEvent, UserCard } from "@/lib/dto";

export const dynamic = "force-dynamic";

const FEED_PAGE_SIZE = 15;

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

function parseMetadata(raw: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    /* malformed metadata falls back to an empty object */
  }
  return {};
}

// ─── GET /api/feed?page=1 ────────────────────────────────────

export async function GET(req: NextRequest) {
  return handle(async () => {
    const raw = Number(req.nextUrl.searchParams.get("page") ?? "1");
    const page = Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1;

    const where: Prisma.ProjectActivityWhereInput = { project: { visibility: "PUBLIC" } };

    const [total, rows] = await Promise.all([
      db.projectActivity.count({ where }),
      db.projectActivity.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * FEED_PAGE_SIZE,
        take: FEED_PAGE_SIZE,
        include: {
          actor: { select: userCardFields },
          project: {
            select: {
              id: true,
              slug: true,
              name: true,
              tagline: true,
              category: true,
              status: true,
              coverImage: true,
            },
          },
        },
      }),
    ]);

    const events: FeedEvent[] = rows.map((e) => ({
      id: e.id,
      eventType: e.eventType,
      createdAt: e.createdAt.toISOString(),
      metadata: parseMetadata(e.metadata),
      actor: e.actor ? toUserCard(e.actor) : null,
      project: e.project,
    }));

    const pages = Math.max(1, Math.ceil(total / FEED_PAGE_SIZE));
    return ok({ events, page, pages, total });
  });
}
