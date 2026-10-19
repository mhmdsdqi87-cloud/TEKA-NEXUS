// TEKA NEXUS — TEKA Academy secure exam helpers. SERVER-ONLY.
// Exam policy constants + question selection + server-side grading + license
// code minting. Never import this from a client component: it reaches into
// exam-bank.ts, which holds the correct answers.

import { randomBytes, randomInt } from "crypto";
import { examBankFor, examQuestionById, type ExamQuestion } from "./exam-bank";

// ─── Exam policy ─────────────────────────────────────────────
export const EXAM_RULES = {
  /** Server-enforced timer: expiresAt = now + 15 min. */
  durationMs: 15 * 60 * 1000,
  /** Questions served per attempt. */
  questionCount: 10,
  /** Minimum score (0-100) to pass. */
  passScore: 70,
  /** FAILED/graded attempts consumed; anti-cheat VOIDs are free. */
  maxAttempts: 3,
  /** Awarded once per user+course on the first PASSED attempt. */
  reward: { xp: 120, reputation: 40 },
} as const;

export const EXAM_COURSES = ["python-basics", "html-basics"] as const;
export type ExamCourseId = (typeof EXAM_COURSES)[number];

const CERT_PREFIX: Record<ExamCourseId, string> = {
  "python-basics": "PY",
  "html-basics": "HT",
};

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/** e.g. TEKA-PY-7KQ2XZ (6 random base32 chars). */
export function generateLicenseCode(courseId: string): string {
  const prefix = CERT_PREFIX[courseId as ExamCourseId] ?? "EDU";
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += BASE32[randomInt(0, BASE32.length)];
  return `TEKA-${prefix}-${suffix}`;
}

// ─── Question selection ──────────────────────────────────────
/**
 * Pick N random questions from the course bank. Selection happens once at exam
 * creation; the chosen ids are stored on the exam record, so grading is always
 * reproducible from the stored ids (no need to persist a seed).
 */
export function pickExamQuestions(courseId: string, count: number): ExamQuestion[] {
  const bank = examBankFor(courseId);
  if (!bank) return [];
  const pool = [...bank];
  // Fisher–Yates shuffle (unbiased).
  for (let i = pool.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

/** Strip everything an examinee must not see. */
export function sanitizeQuestions(questions: ExamQuestion[]) {
  return questions.map(({ id, q, options }) => ({ id, q, options }));
}

// ─── Grading ─────────────────────────────────────────────────
export type GradedWrong = { qid: string; correctIndex: number; why: string };

/**
 * Grade a submitted answer map against the exam's stored question ids.
 * Unanswered questions count as wrong. Returns the score 0-100.
 */
export function gradeExam(
  courseId: string,
  questionIds: string[],
  answers: Record<string, number>,
): { correct: number; total: number; score: number; wrong: GradedWrong[] } {
  const wrong: GradedWrong[] = [];
  let correct = 0;
  let valid = 0;
  for (const qid of questionIds) {
    const q = examQuestionById(courseId, qid);
    if (!q) continue; // bank rotated — ignore defensively
    valid += 1;
    if (answers[qid] === q.answer) {
      correct += 1;
    } else {
      wrong.push({ qid, correctIndex: q.answer, why: q.why });
    }
  }
  const score = Math.round((correct / (valid || 1)) * 100);
  return { correct, total: valid, score, wrong };
}

// ─── Small JSON helpers (SQLite stores JSON as strings) ──────
export function parseStringArray(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function parseAnswers(raw: string): Record<string, number> {
  try {
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 3) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}
