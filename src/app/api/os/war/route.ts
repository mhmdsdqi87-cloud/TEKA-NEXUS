// TEKA NEXUS — GET/POST /api/os/war  (Task 19-d)
// RED vs BLUE weekly team war. GET = dashboard payload (live scores, weekly
// missions, leaderboard); POST = one-time enlist / claim the weekly LESSON
// mission. Team choice is permanent — loyalty forever.

import { z } from "zod";

import { db } from "@/lib/db";
import { fail, handle, ok, parseBody, requireUser } from "@/lib/server";
import { awardCoins, awardXp, logActivity } from "@/lib/os/economy";

export const dynamic = "force-dynamic";

// ─── Fixed weekly mission table ─────────────────────────────
// LESSON is claim-based (≥3 lessons/week verified via ActivityLog); the other
// kinds are auto-written by their feature routes (boss/pet/crime/speedrun).

const WAR_TASKS = [
  { kind: "LESSON", points: 15 },
  { kind: "BOSS", points: 40 },
  { kind: "PET", points: 10 },
  { kind: "CRIME", points: 30 },
  { kind: "SPEEDRUN", points: 25 },
] as const;

/** "2026-W07" — standard ISO week (Monday-based; week 1 contains the first Thursday). */
function currentIsoWeek(): string {
  const now = new Date();
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) + 3); // move to this week's Thursday
  const isoYear = d.getUTCFullYear();
  const week1Thu = new Date(Date.UTC(isoYear, 0, 4)); // Jan 4 is always in ISO week 1
  week1Thu.setUTCDate(week1Thu.getUTCDate() - ((week1Thu.getUTCDay() + 6) % 7) + 3);
  const week = 1 + Math.round((d.getTime() - week1Thu.getTime()) / 604_800_000);
  return `${isoYear}-W${String(week).padStart(2, "0")}`;
}

/** Monday 00:00 UTC of the current week — window for the lesson count. */
function currentWeekStart(): Date {
  const weekStart = new Date();
  weekStart.setUTCDate(weekStart.getUTCDate() - ((weekStart.getUTCDay() + 6) % 7));
  weekStart.setUTCHours(0, 0, 0, 0);
  return weekStart;
}

/** Sum of WarAction points per faction for one weekly window. */
async function teamScores(weekKey: string): Promise<{ RED: number; BLUE: number }> {
  const groups = await db.warAction.groupBy({
    by: ["team"],
    where: { weekKey },
    _sum: { points: true },
  });
  const scores = { RED: 0, BLUE: 0 };
  for (const g of groups) {
    if (g.team === "RED") scores.RED = g._sum.points ?? 0;
    else if (g.team === "BLUE") scores.BLUE = g._sum.points ?? 0;
  }
  return scores;
}

// ─── GET — war dashboard ─────────────────────────────────────

export async function GET() {
  return handle(async () => {
    const user = await requireUser();
    const week = currentIsoWeek();
    const weekStart = currentWeekStart();

    const [me, scores, myActions, lessonCount] = await Promise.all([
      db.user.findUnique({ where: { id: user.id }, select: { team: true } }),
      teamScores(week),
      db.warAction.findMany({
        where: { userId: user.id, weekKey: week },
        select: { kind: true },
      }),
      db.activityLog.count({
        where: { userId: user.id, kind: "lesson", createdAt: { gte: weekStart } },
      }),
    ]);

    const myKinds = myActions.map((a) => a.kind);

    const tasks = WAR_TASKS.map((task) => ({
      kind: task.kind as string,
      points: task.points,
      label: null, // labels resolve client-side from OS_STRINGS.war.*
      done: myKinds.includes(task.kind) || (task.kind === "LESSON" && lessonCount >= 3),
    }));

    // Top 6 warriors of the week (merged with usernames, sorted desc).
    const top = await db.warAction.groupBy({
      by: ["userId"],
      where: { weekKey: week },
      _sum: { points: true },
      orderBy: { _sum: { points: "desc" } },
      take: 6,
    });
    const warriors = top.length
      ? await db.user.findMany({
          where: { id: { in: top.map((row) => row.userId) } },
          select: { id: true, username: true, team: true, displayName: true },
        })
      : [];
    const topWarriors: {
      username: string;
      displayName: string;
      team: string | null;
      points: number;
    }[] = [];
    for (const row of top) {
      const u = warriors.find((x) => x.id === row.userId);
      if (!u) continue;
      topWarriors.push({
        username: u.username,
        displayName: u.displayName,
        team: u.team,
        points: row._sum.points ?? 0,
      });
    }
    topWarriors.sort((a, b) => b.points - a.points);

    return ok({
      week,
      team: me?.team ?? null,
      scores,
      myKinds,
      lessonCount,
      tasks,
      topWarriors,
    });
  });
}

// ─── POST — join / claim ─────────────────────────────────────

const bodySchema = z.object({
  action: z.enum(["join", "claim"]),
  team: z.enum(["RED", "BLUE"]).optional(),
  kind: z.string().optional(),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = await parseBody(req, bodySchema);
    const week = currentIsoWeek();

    // Fresh row — the session user object predates the team field on purpose.
    const me = await db.user.findUnique({ where: { id: user.id }, select: { team: true } });

    if (body.action === "join") {
      // Loyalty: one team, forever — switching is never allowed.
      if (me?.team) return fail("Already enlisted", 400);
      if (!body.team) return fail("Choose RED or BLUE to enlist.", 400);

      await db.user.update({ where: { id: user.id }, data: { team: body.team } });
      try {
        await db.warAction.create({
          data: {
            userId: user.id,
            team: body.team,
            weekKey: week,
            kind: "ENLIST",
            points: 5,
          },
        });
      } catch {
        // @@unique(userId, weekKey, kind) — already enlisted this week, ignore.
      }
      await awardXp(user.id, 20);
      await logActivity(user.id, "war", { action: "enlist", team: body.team });

      const scores = await teamScores(week);
      return ok({ team: body.team, scores });
    }

    // claim — only the LESSON mission is claimable from here.
    if (body.kind !== "LESSON") return fail("Only the LESSON mission is claimable.", 400);

    const lessonCount = await db.activityLog.count({
      where: { userId: user.id, kind: "lesson", createdAt: { gte: currentWeekStart() } },
    });
    if (lessonCount < 3) return fail("Not enough lessons yet", 400);

    try {
      if (me?.team) {
        await db.warAction.create({
          data: {
            userId: user.id,
            team: me.team,
            weekKey: week,
            kind: "LESSON",
            points: 15,
          },
        });
      }
    } catch {
      // @@unique(userId, weekKey, kind) — already claimed this week, ignore.
    }
    await awardXp(user.id, 25);
    await awardCoins(user.id, 25, "war");
    await logActivity(user.id, "war", { action: "claim", kind: "LESSON", week });

    return ok({ claimed: true, week });
  });
}
