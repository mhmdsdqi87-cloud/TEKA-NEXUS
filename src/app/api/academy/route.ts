// TEKA NEXUS — GET /api/academy
// Per-user Academy state: completed lessons per course + earned certificates.

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
    const user = await requireUser();
    const [progress, certificates] = await Promise.all([
      db.academyProgress.findMany({ where: { userId: user.id } }),
      db.academyCertificate.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      }),
    ]);
    return ok({
      progress: progress.map((p) => ({
        courseId: p.courseId,
        completedLessons: parseLessonIds(p.completedLessons),
        lastLessonId: p.lastLessonId,
      })),
      certificates: certificates.map((c) => ({
        courseId: c.courseId,
        code: c.code,
        createdAt: c.createdAt,
      })),
    });
  });
}
