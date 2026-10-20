// E2E Academy exam smoke test: register → complete all lessons → start exam →
// fail attempt (wrong answers) → retake → pass attempt (correct answers from
// the server-side bank) → verify TEKA license minted + attempt accounting.
// Run: bun scripts/exam-e2e.ts
import * as bank from "../src/lib/academy/exam-bank";
import { pickExamQuestions, gradeExam } from "../src/lib/academy/exam";
import { courseLessons, getCourse } from "../src/lib/academy";

const BASE = "http://localhost:3000";
const STAMP = Date.now().toString(36).slice(-6);
const EMAIL = `examtest-${STAMP}@teka.dev`;
const PASSWORD = "ExamTest123";
const COURSE = "python-basics";
const results: string[] = [];
const ok = (name: string, pass: boolean, extra = "") =>
  results.push(`${pass ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);

async function api(path: string, init: RequestInit = {}, token?: string) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Cookie: `teka_session=${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });
  let body: any = null;
  try { body = await res.json(); } catch {}
  return { res, body };
}

async function main() {
  // 1. register
  const { body: reg } = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email: EMAIL, password: PASSWORD, username: `examtest${STAMP}`.slice(0, 20) }),
  });
  const token: string = reg?.token;
  ok("register", !!token);

  // 2. complete every lesson of the course
  const course = getCourse(COURSE)!;
  const lessons = courseLessons(course);
  let lessonOk = true;
  for (const l of lessons) {
    const { res } = await api("/api/academy/lessons", {
      method: "POST",
      body: JSON.stringify({ courseId: COURSE, lessonId: l.id }),
    }, token);
    if (!res.ok) { lessonOk = false; break; }
  }
  ok(`complete all ${lessons.length} lessons`, lessonOk);

  // 3. exam gate opens → start attempt 1
  const { body: start } = await api(`/api/academy/exam?course=${COURSE}`, {}, token);
  ok("exam unlocked after lessons", start?.examId && Array.isArray(start?.questions), `attemptNo=${start?.attemptNo} q=${start?.questions?.length}`);

  // 4. attempt 1 — deliberately WRONG answers
  const wrong: Record<string, number> = {};
  for (const q of start.questions) wrong[q.id] = (q.answer === undefined ? 0 : 0) || 0; // option 0 (bank rarely uses 0 for all)
  // ensure actually wrong: pick an option != correct answer using server bank
  for (const q of start.questions) {
    const correct = bankAnswer(COURSE, q.id);
    wrong[q.id] = correct === 0 ? 1 : 0;
  }
  const { body: failRes } = await api("/api/academy/exam", {
    method: "POST",
    body: JSON.stringify({ examId: start.examId, answers: wrong }),
  }, token);
  ok("attempt 1 graded FAILED", failRes?.passed === false, `score=${failRes?.score} attemptsLeft=${failRes?.attemptsLeft}`);

  // 5. attempt 2 — correct answers → PASS + license
  const { body: start2 } = await api(`/api/academy/exam?course=${COURSE}`, {}, token);
  ok("attempt 2 started", start2?.attemptNo === 2, `attemptNo=${start2?.attemptNo}`);
  const correct: Record<string, number> = {};
  for (const q of start2.questions) correct[q.id] = bankAnswer(COURSE, q.id);
  const { body: passRes } = await api("/api/academy/exam", {
    method: "POST",
    body: JSON.stringify({ examId: start2.examId, answers: correct }),
  }, token);
  ok("attempt 2 PASSED", passRes?.passed === true, `score=${passRes?.score}`);
  ok("TEKA license minted", typeof passRes?.certificate?.code === "string" && passRes.certificate.code.includes("TEKA"), `code=${passRes?.certificate?.code ?? "none"}`);

  // 6. no retake after pass
  const { body: again } = await api(`/api/academy/exam?course=${COURSE}`, {}, token);
  ok("no retake after pass", again?.alreadyPassed === true, `cert=${again?.certificate?.code ?? "none"}`);

  // 7. cleanup
  const del = await api("/api/me/account", {
    method: "DELETE",
    body: JSON.stringify({ password: PASSWORD }),
  }, token);
  ok("cleanup test user", del.res.ok || del.res.status === 404);

  console.log(results.join("\n"));
  const failed = results.filter((r) => r.startsWith("FAIL")).length;
  console.log(failed === 0 ? "\nALL EXAM E2E CHECKS PASSED ✅" : `\n${failed} CHECK(S) FAILED ❌`);
  process.exit(failed === 0 ? 0 : 1);
}

// The bank keeps correct answers server-side; mirror the lookup used by grader.
function bankAnswer(courseId: string, qid: string): number {
  const q = examQuestion(courseId, qid);
  return q?.answer ?? 0;
}
function examQuestion(courseId: string, qid: string): { answer: number } | undefined {
  const banks: any = (bank as any);
  const list = courseId === "python-basics" ? banks.PYTHON_EXAM_BANK : banks.HTML_EXAM_BANK;
  return list?.find((q: any) => q.id === qid);
}

main().catch((e) => {
  console.error("E2E crashed:", e?.message ?? e);
  console.log(results.join("\n"));
  process.exit(1);
});
