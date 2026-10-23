// TEKA NEXUS — GET/POST /api/challenge  (Live Pulse, Task pulse-1)
// GET   current weekly challenge + community stats (+ my synced entry when
//       `?sync=1` and authed — recomputes progress and auto-awards XP on
//       first completion). Auth optional: guests see the challenge too.
// POST  { action: "join" } — join the active challenge (authed).

import type { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { ok, handle, parseBody, HttpError } from "@/lib/server";
import { getAuthUser } from "@/lib/auth";
import { ensureCurrentChallenge, syncEntry, countWeekActivity } from "@/lib/challenge";

export const dynamic = "force-dynamic";

async function weekStats(weekStart: Date) {
  const [comments, chats, likes, updates] = await Promise.all([
    db.projectComment.count({ where: { createdAt: { gte: weekStart }, deletedAt: null } }),
    db.chatMessage.count({ where: { createdAt: { gte: weekStart } } }),
    db.projectLike.count({ where: { createdAt: { gte: weekStart } } }),
    db.projectUpdate.count({ where: { createdAt: { gte: weekStart } } }),
  ]);
  return { comments, chats, likes, updates };
}

export async function GET(req: NextRequest) {
  return handle(async () => {
    const viewer = await getAuthUser();
    const challenge = await ensureCurrentChallenge();

    const [entries, completedCount, activity] = await Promise.all([
      db.challengeEntry.count({ where: { challengeId: challenge.id } }),
      db.challengeEntry.count({ where: { challengeId: challenge.id, completed: true } }),
      weekStats(challenge.weekStart),
    ]);

    let myEntry: Awaited<ReturnType<typeof syncEntry>> = null;
    if (viewer) {
      if (req.nextUrl.searchParams.get("sync") === "1") {
        myEntry = await syncEntry(challenge.id, viewer.id, challenge.target, challenge.xpReward);
      } else {
        const row = await db.challengeEntry.findUnique({
          where: { challengeId_userId: { challengeId: challenge.id, userId: viewer.id } },
        });
        if (row) {
          myEntry = {
            id: row.id,
            progress: row.progress,
            target: challenge.target,
            completed: row.completed,
            completedAt: row.completedAt ? row.completedAt.toISOString() : null,
            joinedAt: row.joinedAt.toISOString(),
          };
        }
      }
    }

    const myWeekActivity = viewer ? await countWeekActivity(viewer.id, challenge.weekStart) : 0;

    return ok({
      challenge: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        xpReward: challenge.xpReward,
        target: challenge.target,
        weekStart: challenge.weekStart.toISOString(),
        weekEnd: challenge.weekEnd.toISOString(),
      },
      stats: {
        entries,
        completed: completedCount,
        weekActions: activity.comments + activity.chats + activity.likes + activity.updates,
      },
      myEntry,
      myWeekActivity,
    });
  });
}

const joinSchema = z.object({ action: z.literal("join") });

export async function POST(req: NextRequest) {
  return handle(async () => {
    const viewer = await getAuthUser();
    if (!viewer) throw new HttpError("You need to sign in to do that.", 401);

    await parseBody(req, joinSchema);
    const challenge = await ensureCurrentChallenge();

    const entry = await db.challengeEntry.upsert({
      where: { challengeId_userId: { challengeId: challenge.id, userId: viewer.id } },
      create: { challengeId: challenge.id, userId: viewer.id },
      update: {},
    });

    const synced = await syncEntry(challenge.id, viewer.id, challenge.target, challenge.xpReward);
    return ok({ joined: true, entry: synced });
  });
}
