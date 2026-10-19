// TEKA NEXUS — GET /api/academy/leaderboard
// Top learners by XP, annotated with how many Academy lessons they finished.

import { db } from "@/lib/db";
import { handle, ok, requireUser } from "@/lib/server";

export const dynamic = "force-dynamic";

function parseLessonIds(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export async function GET() {
  return handle(async () => {
    const me = await requireUser();
    const [users, progress] = await Promise.all([
      db.user.findMany({
        orderBy: [{ xp: "desc" }, { reputation: "desc" }],
        take: 10,
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarColor: true,
          avatarUrl: true,
          xp: true,
          reputation: true,
        },
      }),
      db.academyProgress.findMany(),
    ]);

    const lessonCount = new Map<string, number>();
    for (const p of progress) {
      lessonCount.set(p.userId, (lessonCount.get(p.userId) ?? 0) + parseLessonIds(p.completedLessons).length);
    }

    const rows = users.map((u, i) => ({
      rank: i + 1,
      ...u,
      lessons: lessonCount.get(u.id) ?? 0,
      isMe: u.id === me.id,
    }));

    // make sure the caller always sees their own row even outside the top 10
    if (!rows.some((r) => r.isMe)) {
      const meUser = await db.user.findUnique({
        where: { id: me.id },
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarColor: true,
          avatarUrl: true,
          xp: true,
          reputation: true,
        },
      });
      if (meUser) {
        rows.push({
          rank: -1,
          ...meUser,
          lessons: lessonCount.get(meUser.id) ?? 0,
          isMe: true,
        });
      }
    }

    return ok({ rows });
  });
}
