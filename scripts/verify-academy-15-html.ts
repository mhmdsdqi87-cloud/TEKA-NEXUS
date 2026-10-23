// Task 15-c-2 verification harness — HTML course expansion (modules m6/m7/m8).
// Structural validation of the 12 new lessons + sanity check that every
// challenge's own checks select elements its solution actually contains.
// Run: cd /home/z/my-project && bun scripts/verify-academy-15-html.ts
import { htmlCourse } from "../src/lib/academy/course-html";
import type { HtmlCheck, Lesson, Step } from "../src/lib/academy/types";

// ─── helpers ────────────────────────────────────────────────────────
type Problem = string;

const isTheory = (s: Step): s is Extract<Step, { kind: "theory" }> => s.kind === "theory";
const isQuiz = (s: Step): s is Extract<Step, { kind: "quiz" }> => s.kind === "quiz";
const isChallenge = (s: Step): s is Extract<Step, { kind: "challenge" }> => s.kind === "challenge";

/** All class / id / tag / quoted-attr-value tokens a selector depends on. */
function selectorTokens(sel: string): { classes: string[]; ids: string[]; tags: string[]; attrValues: string[] } {
  const attrValues: string[] = [];
  for (const m of sel.matchAll(/['"]([^'"]+)['"]/g)) attrValues.push(m[1]!);
  const stripped = sel.replace(/\[[^\]]*\]/g, ""); // drop [attr] chunks
  const classes: string[] = [];
  for (const m of stripped.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)) classes.push(m[1]!);
  const ids: string[] = [];
  for (const m of stripped.matchAll(/#([a-zA-Z][a-zA-Z0-9_-]*)/g)) ids.push(m[1]!);
  const tags: string[] = [];
  for (const part of stripped.split(/[\s>+~]+/)) {
    const m = part.match(/^([a-zA-Z][a-zA-Z0-9_-]*)/);
    if (m) tags.push(m[1]!);
  }
  return { classes, ids, tags, attrValues };
}

function appearsInSolution(check: HtmlCheck, solution: string): Problem[] {
  const problems: Problem[] = [];
  const lower = solution.toLowerCase();
  const { classes, ids, tags, attrValues } = selectorTokens(check.selector);
  for (const cls of classes) {
    if (!lower.includes(cls.toLowerCase())) {
      problems.push(`solution does not contain class "${cls}" (selector: ${check.selector})`);
    }
  }
  for (const id of ids) {
    if (!lower.includes(id.toLowerCase())) {
      problems.push(`solution does not contain id "${id}" (selector: ${check.selector})`);
    }
  }
  for (const tag of tags) {
    const openTag = new RegExp(`<${tag}[\\s>]`, "i");
    const closeTag = new RegExp(`</${tag}\\s*>`, "i");
    if (!openTag.test(solution) && !closeTag.test(solution)) {
      problems.push(`solution does not contain tag <${tag}> (selector: ${check.selector})`);
    }
  }
  for (const val of attrValues) {
    if (!lower.includes(val.toLowerCase())) {
      problems.push(`solution does not contain attribute value "${val}" (selector: ${check.selector})`);
    }
  }
  if (check.text && !lower.includes(check.text.toLowerCase().trim())) {
    problems.push(`solution text does not contain "${check.text}" (selector: ${check.selector})`);
  }
  return problems;
}

// ─── per-lesson validation ──────────────────────────────────────────
function validateLesson(lesson: Lesson, moduleId: string): Problem[] {
  const p: Problem[] = [];
  const label = `${moduleId}/${lesson.id}`;

  if (!lesson.title?.en?.trim() || !lesson.title?.fa?.trim()) p.push(`${label}: missing title.en/title.fa`);
  if (!lesson.goal?.en?.trim() || !lesson.goal?.fa?.trim()) p.push(`${label}: missing goal.en/goal.fa`);
  if (!Number.isInteger(lesson.minutes) || lesson.minutes < 10 || lesson.minutes > 16) {
    p.push(`${label}: minutes must be an integer in 10..16 (got ${lesson.minutes})`);
  }

  const theorySteps = lesson.steps.filter(isTheory);
  const quizSteps = lesson.steps.filter(isQuiz);
  const challengeSteps = lesson.steps.filter(isChallenge);

  if (theorySteps.length < 2) p.push(`${label}: needs ≥2 theory steps (got ${theorySteps.length})`);
  theorySteps.forEach((s, i) => {
    if (s.blocks.length < 2) p.push(`${label}: theory step #${i + 1} needs ≥2 blocks (got ${s.blocks.length})`);
    if (s.blocks.length > 6) p.push(`${label}: theory step #${i + 1} has >6 blocks — trim filler`);
  });
  if (quizSteps.length !== 1) p.push(`${label}: needs exactly 1 quiz step (got ${quizSteps.length})`);
  if (challengeSteps.length !== 1) p.push(`${label}: needs exactly 1 challenge step (got ${challengeSteps.length})`);

  // quiz
  if (quizSteps.length === 1) {
    const qs = quizSteps[0]!.questions;
    if (qs.length < 2 || qs.length > 3) p.push(`${label}: quiz needs 2-3 questions (got ${qs.length})`);
    qs.forEach((q, i) => {
      if (!q.q?.en?.trim() || !q.q?.fa?.trim()) p.push(`${label}: quiz q#${i + 1} missing bilingual text`);
      if (!Array.isArray(q.options) || q.options.length < 2) p.push(`${label}: quiz q#${i + 1} needs ≥2 options`);
      else if (q.answer < 0 || q.answer >= q.options.length) {
        p.push(`${label}: quiz q#${i + 1} answer index ${q.answer} out of range`);
      }
      if (!q.explain?.en?.trim() || !q.explain?.fa?.trim()) p.push(`${label}: quiz q#${i + 1} missing explain`);
    });
  }

  // challenge
  if (challengeSteps.length === 1) {
    const c = challengeSteps[0]!;
    if (!c.title?.en?.trim() || !c.title?.fa?.trim()) p.push(`${label}: challenge missing bilingual title`);
    if (!c.brief?.en?.trim() || !c.brief?.fa?.trim()) p.push(`${label}: challenge missing bilingual brief`);
    if (!c.starter || c.starter.length < 120) p.push(`${label}: starter too trivial (<120 chars)`);
    if (!c.starter.includes("<!--")) p.push(`${label}: starter should contain guiding comments`);
    const solutionLines = (c.solution ?? "").split("\n").filter((l) => l.trim().length > 0).length;
    if (solutionLines < 10) p.push(`${label}: solution must be ≥10 non-empty lines (got ${solutionLines})`);
    if (c.hints.length < 2 || c.hints.length > 3) p.push(`${label}: needs 2-3 hints (got ${c.hints.length})`);
    c.hints.forEach((h, i) => {
      if (!h?.en?.trim() || !h?.fa?.trim()) p.push(`${label}: hint #${i + 1} missing bilingual text`);
    });

    if (c.check.kind !== "html") {
      p.push(`${label}: check.kind must be "html"`);
    } else {
      const checks: HtmlCheck[] = c.check.checks;
      if (checks.length < 3 || checks.length > 6) {
        p.push(`${label}: needs 3-6 checks (got ${checks.length})`);
      }
      checks.forEach((ch, i) => {
        if (!ch.selector || !ch.selector.trim()) p.push(`${label}: check #${i + 1} has empty selector`);
        if (ch.count !== undefined && (!Number.isInteger(ch.count) || ch.count < 1)) {
          p.push(`${label}: check #${i + 1} count must be a positive integer`);
        }
      });
      const atLeastOneGrounded = checks.some((ch) => ch.text || ch.attrName);
      if (!atLeastOneGrounded) {
        p.push(`${label}: at least one check must pin text or an attribute (text/attrName)`);
      }
      checks.forEach((ch, i) => {
        for (const problem of appearsInSolution(ch, c.solution)) {
          p.push(`${label}: check #${i + 1} — ${problem}`);
        }
      });
    }
  }

  return p;
}

// ─── run ────────────────────────────────────────────────────────────
const TARGET_MODULES = ["html-m6", "html-m7", "html-m8"];
let failed = false;
let passedCount = 0;

const allLessonIds = new Set<string>();

for (const moduleId of TARGET_MODULES) {
  const mod = htmlCourse.modules.find((m) => m.id === moduleId);
  if (!mod) {
    console.error(`FAIL module ${moduleId}: not found in course-html.ts`);
    failed = true;
    continue;
  }
  if (!mod.title?.en || !mod.title?.fa || !mod.blurb?.en || !mod.blurb?.fa) {
    console.error(`FAIL module ${moduleId}: missing bilingual title/blurb`);
    failed = true;
  }
  if (mod.lessons.length !== 4) {
    console.error(`FAIL module ${moduleId}: expected 4 lessons (got ${mod.lessons.length})`);
    failed = true;
  }
  for (const lesson of mod.lessons) {
    if (allLessonIds.has(lesson.id)) {
      console.error(`FAIL ${lesson.id}: duplicate lesson id`);
      failed = true;
    }
    allLessonIds.add(lesson.id);
    const problems = validateLesson(lesson, moduleId);
    if (problems.length) {
      failed = true;
      console.error(`FAIL ${lesson.id}`);
      for (const problem of problems) console.error(`     - ${problem}`);
    } else {
      passedCount++;
      console.log(`PASS ${lesson.id}  (${lesson.title.en} · ${lesson.minutes} min)`);
    }
  }
}

console.log("─".repeat(64));
if (failed) {
  console.error(`RESULT: FAILED — ${passedCount}/12 lessons passed. Fix the issues above.`);
  process.exit(1);
} else {
  console.log(`RESULT: PASS — ${passedCount}/12 lessons valid (m6+m7+m8, 3 modules × 4 lessons).`);
  process.exit(0);
}
