import { PrismaClient } from "@prisma/client";
import { examQuestionById } from "./src/lib/academy/exam-bank";
const db = new PrismaClient();
const examId = process.argv[2];
const mode = process.argv[3] ?? "wrong";
async function main() {
  const exam = await db.academyExam.findUnique({ where: { id: examId } });
  if (!exam) throw new Error("exam not found");
  const ids = JSON.parse(exam.questionIds) as string[];
  const out: Record<string, number> = {};
  for (const qid of ids) {
    const q = examQuestionById(exam.courseId, qid);
    if (!q) throw new Error("missing q " + qid);
    out[qid] = mode === "wrong" ? (q.answer + 1) % 4 : q.answer;
  }
  process.stdout.write(JSON.stringify(out));
  await db.$disconnect();
}
main();
