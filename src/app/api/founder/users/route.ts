// GET /api/founder/users — founder-only directory of every registered user.

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { handle, HttpError, ok } from "@/lib/server";

export async function GET(_req: NextRequest) {
  return handle(async () => {
    const me = await getAuthUser();
    if (!me) throw new HttpError("You need to sign in to do that.", 401);
    if (me.role !== "FOUNDER") throw new HttpError("Founder access only.", 403);

    const [users, totalProjects, totalSessions] = await Promise.all([
      db.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          role: true,
          avatarColor: true,
          avatarUrl: true,
          bio: true,
          xp: true,
          reputation: true,
          onboardingCompleted: true,
          createdAt: true,
        },
      }),
      db.project.count(),
      db.session.count(),
    ]);

    return ok({
      stats: {
        totalUsers: users.length,
        onboarded: users.filter((u) => u.onboardingCompleted).length,
        founders: users.filter((u) => u.role === "FOUNDER").length,
        totalXp: users.reduce((acc, u) => acc + u.xp, 0),
        totalReputation: users.reduce((acc, u) => acc + u.reputation, 0),
        totalProjects,
        totalSessions,
      },
      users: users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() })),
    });
  });
}
