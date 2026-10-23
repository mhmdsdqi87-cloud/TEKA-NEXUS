// TEKA NEXUS — POST /api/academy/lessons
// Mark a lesson complete (idempotent). First completion awards XP/REP through
// the ContributionEvent ledger; finishing a whole course awards a bonus and
// mints a certificate with a human-readable code.

import { randomBytes } from "crypto";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { handle, HttpError, ok, requireUser } from "@/lib/server";
import { XP_RULES } from "@/lib/constants";
import { courseLessons, getCourse } from "@/lib/academy";
import { awardCoins, logActivity } from "@/lib/os/economy"; // Task 19: TEKA OS hooks

export const dynamic = "force-dynamic";

const Body = z.object({
  courseId: z.string().min(1).max(64),
  lessonId: z.string().min(1).max(96),
});

const CERT_PREFIX: Record<string, string> = {
  "python-basics": "PY",
  "html-basics": "WEB",
  "css-basics": "CSS",
  "js-basics": "JS",
};

function parseLessonIds(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

async function award(userId: string, eventType: string, sourceType: string, sourceId: string, xp: number, reputation: number) {
  try {
    await db.contributionEvent.create({
      data: { userId, eventType, sourceType, sourceId, xp, reputation },
    });
    await db.user.update({
      where: { id: userId },
      data: { xp: { increment: xp }, reputation: { increment: reputation } },
    });
    return true;
  } catch (e) {
    // Unique constraint → already awarded before; keep idempotent.
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") return false;
    throw e;
  }
}

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());

    const course = getCourse(body.courseId);
    if (!course) throw new HttpError("Unknown course.", 404);
    const allLessons = courseLessons(course);
    if (!allLessons.some((l) => l.id === body.lessonId)) {
      throw new HttpError("Unknown lesson for this course.", 400);
    }

    const progress = await db.academyProgress.upsert({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
      create: { userId: user.id, courseId: course.id, completedLessons: "[]", lastLessonId: body.lessonId },
      update: { lastLessonId: body.lessonId },
    });

    const completed = parseLessonIds(progress.completedLessons);
    if (completed.includes(body.lessonId)) {
      // already done — report current state without awarding again
      const fresh = await db.user.findUniqueOrThrow({
        where: { id: user.id },
        select: { xp: true, reputation: true },
      });
      const cert = await db.academyCertificate.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: course.id } },
      });
      return ok({
        added: false,
        xpAwarded: 0,
        repAwarded: 0,
        completedLessons: completed,
        courseCompleted: completed.length >= allLessons.length,
        certificate: cert ? { code: cert.code, createdAt: cert.createdAt } : null,
        user: fresh,
      });
    }

    completed.push(body.lessonId);
    await db.academyProgress.update({
      where: { id: progress.id },
      data: { completedLessons: JSON.stringify(completed) },
    });

    const lessonRule = XP_RULES.ACADEMY_LESSON;
    const awarded = await award(
      user.id, "ACADEMY_LESSON", "lesson", `${course.id}:${body.lessonId}`,
      lessonRule.xp, lessonRule.reputation,
    );

    let xpAwarded = awarded ? lessonRule.xp : 0;
    let repAwarded = awarded ? lessonRule.reputation : 0;

    // ── Task 19: TEKA OS economy hooks (first completion only) ──
    let coinsEarned = 0;
    if (awarded) {
      try {
        coinsEarned += await awardCoins(user.id, 5, `lesson:${course.id}:${body.lessonId}`);
        await logActivity(user.id, "lesson", { courseId: course.id, lessonId: body.lessonId });
      } catch {
        // The OS economy must never break the core academy flow.
      }
    }

    // Course completion → bonus + certificate
    let certificate: { code: string; createdAt: Date } | null = null;
    const courseCompleted = completed.length >= allLessons.length;
    if (courseCompleted) {
      const existing = await db.academyCertificate.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: course.id } },
      });
      if (!existing) {
        const prefix = CERT_PREFIX[course.id] ?? "EDU";
        const code = `TEKA-${prefix}-${randomBytes(4).toString("hex").toUpperCase()}`;
        const cert = await db.academyCertificate.create({
          data: { userId: user.id, courseId: course.id, code },
        });
        certificate = { code: cert.code, createdAt: cert.createdAt };
        const courseRule = XP_RULES.ACADEMY_COURSE;
        const bonusAwarded = await award(
          user.id, "ACADEMY_COURSE", "course", course.id,
          courseRule.xp, courseRule.reputation,
        );
        if (bonusAwarded) {
          xpAwarded += courseRule.xp;
          repAwarded += courseRule.reputation;
        }
        try {
          // Task 19: OS hooks for course completion.
          coinsEarned += await awardCoins(user.id, 50, `course-complete:${course.id}`);
          await logActivity(user.id, "lesson", { courseId: course.id, completed: true });
        } catch {
          /* non-fatal */
        }
      } else {
        certificate = { code: existing.code, createdAt: existing.createdAt };
      }
    }

    const fresh = await db.user.findUniqueOrThrow({
      where: { id: user.id },
      select: { xp: true, reputation: true, coins: true },
    });

    return ok({
      added: true,
      xpAwarded,
      repAwarded,
      completedLessons: completed,
      courseCompleted,
      certificate,
      user: fresh,
      coinsEarned, // Task 19
    });
  });
}
