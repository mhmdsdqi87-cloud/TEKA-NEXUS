// TEKA NEXUS — tests for the Academy engines:
//   1) content engine  (src/lib/academy — courses/modules/lessons/steps)
//   2) exam engine     (src/lib/academy/exam — secure finals, server-side grading)
// The challenge auto-grader (pylite vs. expected stdout) is covered in
// pylite.test.ts; this file pins the content contract and exam math.

import { describe, expect, test } from "bun:test";

import { COURSES, courseLessons, getCourse } from "@/lib/academy";
import {
  EXAM_COURSES,
  generateLicenseCode,
  gradeExam,
  parseAnswers,
  parseStringArray,
  pickExamQuestions,
  sanitizeQuestions,
} from "@/lib/academy/exam";

// ─── Content engine ──────────────────────────────────────────

describe("academy content engine", () => {
  test("ships 4 courses (python, html, css, js) with unique ids", () => {
    expect(COURSES.length).toBe(4);
    const ids = COURSES.map((c) => c.id);
    expect(new Set(ids).size).toBe(4);
    for (const id of ["python-basics", "html-basics", "css-basics", "js-basics"]) {
      expect(ids).toContain(id);
    }
  });

  test("every course has modules and lessons with non-empty titles", () => {
    for (const course of COURSES) {
      expect(course.modules.length).toBeGreaterThan(0);
      for (const mod of course.modules) {
        expect(mod.lessons.length).toBeGreaterThan(0);
        for (const lesson of mod.lessons) {
          expect(lesson.title.en.length).toBeGreaterThan(0);
          expect(lesson.title.fa.length).toBeGreaterThan(0); // bilingual content contract
        }
      }
    }
  });

  test("lesson ids are unique inside each course (progress keyed by id)", () => {
    for (const course of COURSES) {
      const lessons = courseLessons(course);
      expect(lessons.length).toBeGreaterThan(0);
      const ids = lessons.map((l) => l.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  test("getCourse returns undefined for unknown ids (honest 404 path)", () => {
    expect(getCourse("python-basics")).toBeDefined();
    expect(getCourse("does-not-exist")).toBeUndefined();
  });
});

// ─── Exam engine ─────────────────────────────────────────────

describe("academy exam engine", () => {
  test("exam courses match the certificate-bearing catalog", () => {
    expect(EXAM_COURSES).toContain("python-basics");
    expect(EXAM_COURSES).toContain("html-basics");
  });

  test("pickExamQuestions draws the requested count, all unique", () => {
    const picked = pickExamQuestions("python-basics", 10);
    expect(picked.length).toBe(10);
    const ids = picked.map((q) => q.id);
    expect(new Set(ids).size).toBe(10);
    // every question carries exactly one correct option index 0-3
    for (const q of picked) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThanOrEqual(3);
      expect(q.why.length).toBeGreaterThan(0);
    }
  });

  test("gradeExam: all-correct submission scores 100", () => {
    const qs = pickExamQuestions("python-basics", 5);
    const answers = Object.fromEntries(qs.map((q) => [q.id, q.answer]));
    const grade = gradeExam(
      "python-basics",
      qs.map((q) => q.id),
      answers,
    );
    expect(grade).toEqual({ correct: 5, total: 5, score: 100, wrong: [] });
  });

  test("gradeExam: one wrong answer drops the score and explains why", () => {
    const qs = pickExamQuestions("python-basics", 5);
    const answers = Object.fromEntries(qs.map((q) => [q.id, q.answer]));
    answers[qs[0].id] = (qs[0].answer + 1) % 4;
    const grade = gradeExam(
      "python-basics",
      qs.map((q) => q.id),
      answers,
    );
    expect(grade.correct).toBe(4);
    expect(grade.score).toBe(80);
    expect(grade.wrong).toHaveLength(1);
    expect(grade.wrong[0].qid).toBe(qs[0].id);
    expect(grade.wrong[0].correctIndex).toBe(qs[0].answer);
    expect(grade.wrong[0].why.length).toBeGreaterThan(0);
  });

  test("gradeExam: blank submission scores 0 (server-side grading)", () => {
    const qs = pickExamQuestions("python-basics", 5);
    const grade = gradeExam(
      "python-basics",
      qs.map((q) => q.id),
      {},
    );
    expect(grade.score).toBe(0);
    expect(grade.wrong).toHaveLength(5);
  });

  test("sanitizeQuestions strips answer + why (answers never leave the server)", () => {
    const qs = pickExamQuestions("python-basics", 3);
    const clean = sanitizeQuestions(qs);
    for (const q of clean) {
      expect(JSON.stringify(q)).not.toContain('"answer"');
      expect(JSON.stringify(q)).not.toContain('"why"');
    }
  });

  test("certificate codes are unique per call and shaped TEKA-PY-XXXXXX", () => {
    const a = generateLicenseCode("python-basics");
    const b = generateLicenseCode("python-basics");
    expect(a).toMatch(/^TEKA-PY-[A-Z2-7]{6}$/);
    expect(b).toMatch(/^TEKA-HT-|TEKA-PY-/); // html uses HT prefix
    expect(a).not.toBe(b);
    expect(generateLicenseCode("html-basics")).toMatch(/^TEKA-HT-[A-Z2-7]{6}$/);
  });

  test("JSON helpers survive garbage input (SQLite stores JSON as strings)", () => {
    expect(parseStringArray('["a","b"]')).toEqual(["a", "b"]);
    expect(parseStringArray("not json")).toEqual([]);
    expect(parseStringArray('{"a":1}')).toEqual([]);
    expect(parseAnswers('{"q1":2}')).toEqual({ q1: 2 });
    expect(parseAnswers('{"q1":9}')).toEqual({}); // option index out of range → dropped
    expect(parseAnswers("garbage")).toEqual({});
  });
});
