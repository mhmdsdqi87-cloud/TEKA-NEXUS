// TEKA NEXUS — TEKA Academy content contract.
// Courses are pure data: modules → lessons → steps. The lesson player renders
// any course generically. Content ships bilingually: `fa` (Persian) + `en`
// (English is the universal fallback for every other locale).

// ─── Localized text ──────────────────────────────────────────
export type L = { en: string; fa: string };

// ─── Auto-grading checks ─────────────────────────────────────
// Python challenge: run code against test cases, compare stdout.
export type PyTest = {
  /** Lines fed to input() (one per call). Omit when the program takes no input. */
  stdin?: string;
  /** Exact expected stdout (right-trimmed per line, trailing blank lines ignored). */
  expect: string;
  /** Hidden from the UI until the challenge is passed. */
  hidden?: boolean;
};

// HTML challenge: queries run against the live iframe document.
export type HtmlCheck = {
  /** CSS selector that must match. */
  selector: string;
  /** When set: element's textContent must contain this (case-insensitive). */
  text?: string;
  /** When set: minimum number of matches required (default 1). */
  count?: number;
  /** When set: element must carry this attribute with this value. */
  attrName?: string;
  attrValue?: string;
};

export type Check =
  | { kind: "py"; tests: PyTest[] }
  | { kind: "html"; checks: HtmlCheck[] };

// ─── Theory blocks ───────────────────────────────────────────
export type TheoryBlock =
  | { type: "text"; en: string; fa: string }
  | { type: "tip"; en: string; fa: string }
  | { type: "warn"; en: string; fa: string }
  | {
      type: "code";
      lang: "python" | "html";
      code: string;
      /** true (default): render a Run button + inline output/preview. */
      runnable?: boolean;
      caption?: L;
    };

// ─── Quiz ────────────────────────────────────────────────────
export type QuizQuestion = {
  q: L;
  options: L[];
  /** Index of the correct option. */
  answer: number;
  explain: L;
};

// ─── Steps ───────────────────────────────────────────────────
export type Step =
  | { kind: "theory"; title?: L; blocks: TheoryBlock[] }
  | { kind: "quiz"; questions: QuizQuestion[] }
  | {
      kind: "challenge";
      title: L;
      brief: L;
      starter: string;
      solution: string;
      /** Progressive hints, revealed one at a time. */
      hints: L[];
      check: Check;
      /** Python only: a visible sample test shown in the UI. */
      sample?: { stdin?: string; expect: string };
    };

// ─── Structure ───────────────────────────────────────────────
export type Lesson = {
  /** Unique, stable, kebab-case — e.g. "py-m1-l1". */
  id: string;
  title: L;
  /** One-line promise: what the learner can DO after this lesson. */
  goal: L;
  minutes: number;
  steps: Step[];
};

export type Module = {
  id: string;
  title: L;
  blurb: L;
  lessons: Lesson[];
};

export type Course = {
  /** "python-basics" | "html-basics" */
  id: string;
  language: "python" | "html";
  title: L;
  tagline: L;
  /** Brand accent key (TEKA palette): "cyan" | "ember". */
  accent: "cyan" | "ember";
  /** Small badge shown on the hub card. */
  emoji: string;
  modules: Module[];
};

// ─── Helpers ─────────────────────────────────────────────────
export function pick(text: L, locale: string): string {
  return locale === "fa" && text.fa ? text.fa : text.en;
}

export function courseLessons(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

export function courseMinutes(course: Course): number {
  return courseLessons(course).reduce((acc, l) => acc + l.minutes, 0);
}
