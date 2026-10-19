// TEKA NEXUS — POST /api/academy/exam/void
// Anti-cheat strikeout: the exam UI calls this when the learner trips the
// 3rd integrity strike (tab switch / blur / clipboard use / leaving
// fullscreen). The exam is marked VOID.
//
// Policy: VOID does NOT consume one of the 3 attempts — only FAILED attempts
// do. Grading is refused afterwards (status is no longer ACTIVE).

import { z } from "zod";
import { db } from "@/lib/db";
import { handle, HttpError, ok, requireUser } from "@/lib/server";

export const dynamic = "force-dynamic";

const VoidBody = z.object({
  examId: z.string().min(1).max(64),
  reason: z.literal("blur-strikeout"),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = VoidBody.parse(await req.json());

    const exam = await db.academyExam.findUnique({ where: { id: body.examId } });
    if (!exam || exam.userId !== user.id) throw new HttpError("Exam not found.", 404);

    // Idempotent: only an ACTIVE exam can transition to VOID.
    if (exam.status === "ACTIVE") {
      await db.academyExam.update({
        where: { id: exam.id },
        data: { status: "VOID", submittedAt: new Date() },
      });
    }

    return ok({ voided: true });
  });
}
