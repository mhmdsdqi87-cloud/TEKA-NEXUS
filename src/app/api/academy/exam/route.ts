// TEKA NEXUS — GET/POST /api/academy/exam
// Secure final exam for TEKA Academy courses.
//
// GET ?course=python-basics → eligibility gate + create/resume an ACTIVE exam.
//   Server checks: all lessons completed, attempts < 3, no prior pass.
//   Responses NEVER contain correct answers or explanations.
// POST { examId, answers: { qid: optionIndex } } → server-side grading.
//   Expired exams are voided; a pass mints (or reuses) the certificate and
//   awards XP/REP once per course via the idempotent ContributionEvent ledger.
//
// Attempt accounting: FAILED/graded attempts consume one of 3 attempts.
// VOID (anti-cheat strikeout or expiry) does NOT consume an attempt.

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { handle, HttpError, ok, requireUser } from "@/lib/server";
import {
  EXAM_COURSES,
  EXAM_RULES,
  generateLicenseCode,
  gradeExam,
  parseAnswers,
  parseStringArray,
  pickExamQuestions,
  sanitizeQuestions,
} from "@/lib/academy/exam";
import { examQuestionById } from "@/lib/academy/exam-bank"; // server-only: holds answers
import { courseLessons, getCourse } from "@/lib/academy";

export const dynamic = "force-dynamic";

const ExamCourseSchema = z.enum(EXAM_COURSES);

function parseLessonIds(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

async function attemptsUsed(userId: string, courseId: string): Promise<number> {
  // VOID never consumes an attempt (anti-cheat strikeout / expiry).
  return db.academyExam.count({
    where: { userId, courseId, status: { not: "VOID" } },
  });
}

async function attemptsLeft(userId: string, courseId: string): Promise<number> {
  return Math.max(0, EXAM_RULES.maxAttempts - (await attemptsUsed(userId, courseId)));
}

export async function GET(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const url = new URL(req.url);
    const courseId = ExamCourseSchema.parse(url.searchParams.get("course") ?? "");

    const course = getCourse(courseId);
    if (!course) throw new HttpError("Unknown course.", 404);

    // ── Gate 1: every lesson of the course must be completed ──
    const allLessons = courseLessons(course).map((l) => l.id);
    const progress = await db.academyProgress.findUnique({
      where: { userId_courseId: { userId: user.id, courseId } },
    });
    const completed = parseLessonIds(progress?.completedLessons ?? "[]");
    const done = allLessons.filter((id) => completed.includes(id)).length;
    if (done < allLessons.length) {
      return ok({ locked: true, completed: done, total: allLessons.length });
    }

    const left = await attemptsLeft(user.id, courseId);

    // ── Gate 2: no retakes after passing ──
    const passed = await db.academyExam.findFirst({
      where: { userId: user.id, courseId, status: "PASSED" },
    });
    if (passed) {
      const cert = await db.academyCertificate.findUnique({
        where: { userId_courseId: { userId: user.id, courseId } },
      });
      return ok({ alreadyPassed: true, attemptsLeft: left, certificate: cert ? { code: cert.code } : null });
    }

    // ── Resume an ACTIVE, unexpired exam (e.g. page reload) ──
    const now = new Date();
    const active = await db.academyExam.findFirst({
      where: { userId: user.id, courseId, status: "ACTIVE", expiresAt: { gt: now } },
      orderBy: { startedAt: "desc" },
    });
    if (active) {
      const ids = parseStringArray(active.questionIds);
      const questions = ids
        .map((qid) => examQuestionById(courseId, qid))
        .filter((q): q is NonNullable<typeof q> => q !== undefined);
      return ok({
        examId: active.id,
        attemptNo: active.attemptNo,
        expiresAt: active.expiresAt.toISOString(),
        questions: sanitizeQuestions(questions),
      });
    }

    // ── Expire stale ACTIVE exams (they don't consume an attempt) ──
    await db.academyExam.updateMany({
      where: { userId: user.id, courseId, status: "ACTIVE", expiresAt: { lte: now } },
      data: { status: "VOID" },
    });

    // ── Gate 3: max attempts ──
    if (left <= 0) {
      return ok({ blocked: true, attemptsLeft: 0 });
    }

    // ── Create a fresh attempt ──
    const questions = pickExamQuestions(courseId, EXAM_RULES.questionCount);
    if (questions.length < EXAM_RULES.questionCount) {
      throw new HttpError("Exam bank is not ready. Please try again later.", 503);
    }
    const exam = await db.academyExam.create({
      data: {
        userId: user.id,
        courseId,
        status: "ACTIVE",
        questionIds: JSON.stringify(questions.map((q) => q.id)),
        expiresAt: new Date(Date.now() + EXAM_RULES.durationMs),
        attemptNo: (await attemptsUsed(user.id, courseId)) + 1,
      },
    });

    return ok({
      examId: exam.id,
      attemptNo: exam.attemptNo,
      expiresAt: exam.expiresAt.toISOString(),
      questions: sanitizeQuestions(questions),
    });
  });
}

const SubmitBody = z.object({
  examId: z.string().min(1).max(64),
  answers: z.record(z.string().min(1).max(32), z.number().int().min(0).max(3)),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = SubmitBody.parse(await req.json());

    const exam = await db.academyExam.findUnique({ where: { id: body.examId } });
    if (!exam || exam.userId !== user.id) throw new HttpError("Exam not found.", 404);
    if (!EXAM_COURSES.includes(exam.courseId as (typeof EXAM_COURSES)[number])) {
      throw new HttpError("Unknown course for this exam.", 400);
    }
    const courseId = exam.courseId;

    // Already graded: return the stored outcome (idempotent refresh).
    if (exam.status === "PASSED" || exam.status === "FAILED") {
      const cert = await db.academyCertificate.findUnique({
        where: { userId_courseId: { userId: user.id, courseId } },
      });
      const { wrong } = gradeExam(courseId, parseStringArray(exam.questionIds), parseAnswers(exam.answers));
      return ok({
        score: exam.score,
        passed: exam.status === "PASSED",
        attemptsLeft: await attemptsLeft(user.id, courseId),
        wrong,
        certificate: exam.status === "PASSED" && cert ? { code: cert.code, createdAt: cert.createdAt } : undefined,
      });
    }
    if (exam.status === "VOID") {
      return ok({ voided: true });
    }

    // Server timer is the source of truth.
    if (Date.now() >= exam.expiresAt.getTime()) {
      await db.academyExam.update({
        where: { id: exam.id },
        data: { status: "VOID", submittedAt: new Date() },
      });
      return ok({ expired: true, attemptsLeft: await attemptsLeft(user.id, courseId) });
    }

    // ── Grade server-side ──
    const questionIds = parseStringArray(exam.questionIds);
    const { score, wrong } = gradeExam(courseId, questionIds, body.answers);
    const passed = score >= EXAM_RULES.passScore;

    await db.academyExam.update({
      where: { id: exam.id },
      data: {
        status: passed ? "PASSED" : "FAILED",
        score,
        answers: JSON.stringify(body.answers),
        submittedAt: new Date(),
      },
    });

    // ── Pass: certificate + one-time XP/REP award ──
    let certificate: { code: string; createdAt: Date } | undefined;
    if (passed) {
      const existing = await db.academyCertificate.findUnique({
        where: { userId_courseId: { userId: user.id, courseId } },
      });
      let cert = existing;
      if (!cert) {
        try {
          cert = await db.academyCertificate.create({
            data: { userId: user.id, courseId, code: generateLicenseCode(courseId) },
          });
        } catch (e) {
          // Rare code collision — retry once with a fresh code.
          if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            cert = await db.academyCertificate.create({
              data: { userId: user.id, courseId, code: generateLicenseCode(courseId) },
            });
          } else {
            throw e;
          }
        }
      }
      certificate = { code: cert.code, createdAt: cert.createdAt };

      try {
        await db.contributionEvent.create({
          data: {
            userId: user.id,
            eventType: "ACADEMY_EXAM",
            sourceType: "exam",
            sourceId: courseId,
            xp: EXAM_RULES.reward.xp,
            reputation: EXAM_RULES.reward.reputation,
          },
        });
        await db.user.update({
          where: { id: user.id },
          data: {
            xp: { increment: EXAM_RULES.reward.xp },
            reputation: { increment: EXAM_RULES.reward.reputation },
          },
        });
      } catch {
        // Unique constraint → already awarded for this course. Idempotent.
      }
    }

    return ok({
      score,
      passed,
      attemptsLeft: await attemptsLeft(user.id, courseId),
      wrong,
      certificate,
    });
  });
}
