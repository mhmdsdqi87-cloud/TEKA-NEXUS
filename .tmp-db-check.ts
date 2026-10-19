import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const uid = "cmvf8cmv7000cmip5n7tbh9d3";
  const events = await db.contributionEvent.findMany({ where: { userId: uid, eventType: "ACADEMY_EXAM" } });
  console.log("EXAM_EVENTS", JSON.stringify(events.map(e => ({ sourceId: e.sourceId, xp: e.xp, rep: e.reputation }))));
  const exams = await db.academyExam.findMany({ where: { userId: uid }, orderBy: { startedAt: "asc" } });
  console.log("EXAM_ROWS", JSON.stringify(exams.map(e => ({ id: e.id.slice(-6), course: e.courseId, status: e.status, score: e.score, attemptNo: e.attemptNo }))));
  await db.$disconnect();
}
main();
