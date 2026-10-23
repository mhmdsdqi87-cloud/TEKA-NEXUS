// TEKA NEXUS — GET /api/leaderboard  (Live Pulse, Task pulse-1)
// ?range=week (default)  → weighted activity score over the current
//                          Iranian week (Sat→Fri): comments×8 + updates×10
//                          + chat×3 + likes×2
// ?range=all             → all-time XP ranking
// Public read; when authed, the caller's own row is always attached.

import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, handle } from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { currentWeekWindow } from "@/lib/week";

export const dynamic = "force-dynamic";

const TAKE = 10;

const USER_FIELDS = {
  id: true,
  username: true,
  displayName: true,
  avatarColor: true,
  avatarUrl: true,
  xp: true,
  reputation: true,
} as const;

type UserRow = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  xp: number;
  reputation: number;
  score: number;
};

type Row = UserRow & { rank: number; isMe: boolean };

function finish(rows: UserRow[], meId: string | null): Row[] {
  // Appended out-of-top rows sit at their real sorted position, so a plain
  // index+1 rank is correct for every row.
  return rows.map((r, i) => ({ ...r, rank: i + 1, isMe: r.id === meId }));
}

export async function GET(req: NextRequest) {
  return handle(async () => {
    const viewer = await getAuthUser();
    const meId = viewer?.id ?? null;
    const range = req.nextUrl.searchParams.get("range") === "all" ? "all" : "week";

    if (range === "all") {
      const users = await db.user.findMany({
        orderBy: [{ xp: "desc" }, { reputation: "desc" }],
        take: TAKE,
        select: USER_FIELDS,
      });
      const rows: UserRow[] = users.map((u) => ({ ...u, score: u.xp }));

      // Caller outside the top 10 still gets their own row (rank -1).
      if (meId && !rows.some((r) => r.id === meId)) {
        const me = await db.user.findUnique({ where: { id: meId }, select: USER_FIELDS });
        if (me) rows.push({ ...me, score: me.xp });
      }
      return ok({ range, rows: finish(rows, meId) });
    }

    // ── weekly: weighted activity since Saturday ──
    const { weekStart } = currentWeekWindow();
    const inWeek = { createdAt: { gte: weekStart } };

    const [comments, chats, likes, updates] = await Promise.all([
      db.projectComment.groupBy({ by: ["authorId"], where: { ...inWeek, deletedAt: null }, _count: { _all: true } }),
      db.chatMessage.groupBy({ by: ["userId"], where: inWeek, _count: { _all: true } }),
      db.projectLike.groupBy({ by: ["userId"], where: inWeek, _count: { _all: true } }),
      db.projectUpdate.groupBy({ by: ["authorId"], where: inWeek, _count: { _all: true } }),
    ]);

    const score = new Map<string, number>();
    const add = (id: string, pts: number) => score.set(id, (score.get(id) ?? 0) + pts);
    for (const g of comments) add(g.authorId, g._count._all * 8);
    for (const g of chats) add(g.userId, g._count._all * 3);
    for (const g of likes) add(g.userId, g._count._all * 2);
    for (const g of updates) add(g.authorId, g._count._all * 10);

    const topIds = [...score.entries()].sort((a, b) => b[1] - a[1]).slice(0, TAKE);
    const users = topIds.length
      ? await db.user.findMany({
          where: { id: { in: topIds.map(([id]) => id) } },
          select: USER_FIELDS,
        })
      : [];
    const byId = new Map(users.map((u) => [u.id, u]));
    const rows: UserRow[] = topIds
      .map(([id, s]) => {
        const u = byId.get(id);
        return u ? { ...u, score: s } : null;
      })
      .filter((r): r is UserRow => r !== null);

    // Caller with weekly activity but outside the top 10 still gets a row.
    if (meId && !rows.some((r) => r.id === meId)) {
      const myScore = score.get(meId) ?? 0;
      if (myScore > 0) {
        const me = await db.user.findUnique({ where: { id: meId }, select: USER_FIELDS });
        if (me) rows.push({ ...me, score: myScore });
      }
    }

    return ok({ range, rows: finish(rows, meId) });
  });
}
