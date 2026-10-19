// TEKA NEXUS — GET /api/academy
// Per-user Academy state: completed lessons per course + earned certificates
// + secure-exam summary (attempts used / passed / best score per course).

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
    const [progress, certificates, exams] = await Promise.all([
      db.academyProgress.findMany({ where: { userId: user.id } }),
      db.academyCertificate.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      }),
      db.academyExam.findMany({ where: { userId: user.id } }),
    ]);

    // Fold exam rows into one summary per course. VOID never consumes an
    // attempt; PASSED wins the courseId forever (no retakes).
    const examMap = new Map<string, { courseId: string; attemptsUsed: number; passed: boolean; bestScore: number }>();
    for (const e of exams) {
      const cur = examMap.get(e.courseId) ?? { courseId: e.courseId, attemptsUsed: 0, passed: false, bestScore: 0 };
      if (e.status !== "VOID") cur.attemptsUsed += 1;
      if (e.status === "PASSED") cur.passed = true;
      cur.bestScore = Math.max(cur.bestScore, e.score);
      examMap.set(e.courseId, cur);
    }

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
      exams: [...examMap.values()],
    });
  });
}
