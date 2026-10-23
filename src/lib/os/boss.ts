// TEKA NEXUS — BOSS FIGHT engine (server helpers).
// Bosses live at the end of every Academy module + one FINAL boss per course.
// Questions are real quiz questions harvested from the Academy content.

import { COURSES, courseLessons, getCourse } from "@/lib/academy";
import type { Course, QuizQuestion } from "@/lib/academy/types";

export const FINAL_MODULE_ID = "__final__";

export type BossRef = {
  courseId: string;
  moduleId: string;
  final: boolean;
  emoji: string;
  accent: Course["accent"];
  name: { en: string; fa: string };
  taunt: { en: string; fa: string };
};

const FINAL_BOSS_META: Record<string, { emoji: string; name: { en: string; fa: string }; taunt: { en: string; fa: string } }> = {
  "python-basics": {
    emoji: "🐍",
    name: { en: "PYTHONOR, Lord of Serpents", fa: "پایتونور، ارباب مارها" },
    taunt: { en: "You dare face the serpent king with your little loops?", fa: "با حلقه‌های کوچیکت به پادشاه مارها وقاحت کردی؟" },
  },
  "html-basics": {
    emoji: "🕸️",
    name: { en: "TAGREX, King of Tags", fa: "تگ‌رکس، پادشاه تگ‌ها" },
    taunt: { en: "Your markup is fragile, mortal.", fa: "نشانه‌گذاری‌ت شکننده‌ست، فانی." },
  },
  "css-basics": {
    emoji: "🎨",
    name: { en: "STYLERAX, the Style Warlock", fa: "استایل‌راکس، جادوگر استایل" },
    taunt: { en: "None shall pass my cascade!", fa: "هیچ‌کس از آبشار من رد نمی‌شه!" },
  },
  "js-basics": {
    emoji: "⚡",
    name: { en: "JAVASCRIPTOR, the Async Ghost", fa: "جاوااسکریپتور، روح ناهمگام" },
    taunt: { en: "await me… if you can.", fa: "منتظر من بمون… اگه می‌تونی." },
  },
};

const COURSE_BOSS_EMOJI: Record<string, string> = {
  "python-basics": "🐍",
  "html-basics": "🕸️",
  "css-basics": "🎨",
  "js-basics": "⚡",
};

/** All bosses (module bosses + course finals) — derived, always in sync with content. */
export function allBosses(): BossRef[] {
  const out: BossRef[] = [];
  for (const course of COURSES) {
    for (const mod of course.modules) {
      out.push({
        courseId: course.id,
        moduleId: mod.id,
        final: false,
        emoji: COURSE_BOSS_EMOJI[course.id] ?? "👾",
        accent: course.accent,
        name: {
          en: `Warden of ${mod.title.en}`,
          fa: `نگهبانِ ${mod.title.fa}`,
        },
        taunt: {
          en: `${mod.lessons.length} lessons guard me. Prove you passed them.`,
          fa: `${mod.lessons.length} درس نگهبازم می‌کنن. ثابت کن ازشون گذاشتی.`,
        },
      });
    }
    const meta = FINAL_BOSS_META[course.id];
    if (meta) {
      out.push({
        courseId: course.id,
        moduleId: FINAL_MODULE_ID,
        final: true,
        emoji: meta.emoji,
        accent: course.accent,
        name: meta.name,
        taunt: meta.taunt,
      });
    }
  }
  return out;
}

export function getBoss(courseId: string, moduleId: string): BossRef | undefined {
  return allBosses().find((b) => b.courseId === courseId && b.moduleId === moduleId);
}

/** All lesson ids required before a boss can be challenged. */
export function bossRequiredLessons(courseId: string, moduleId: string): string[] {
  const course = getCourse(courseId);
  if (!course) return [];
  if (moduleId === FINAL_MODULE_ID) return courseLessons(course).map((l) => l.id);
  const mod = course.modules.find((m) => m.id === moduleId);
  return mod ? mod.lessons.map((l) => l.id) : [];
}

export type BossQuestion = {
  q: { en: string; fa: string };
  options: { en: string; fa: string }[];
  answer: number;
  explain: { en: string; fa: string };
};

function harvestQuiz(course: Course, moduleId: string): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  const mods = moduleId === FINAL_MODULE_ID ? course.modules : course.modules.filter((m) => m.id === moduleId);
  for (const mod of mods) {
    for (const lesson of mod.lessons) {
      for (const step of lesson.steps) {
        if (step.kind === "quiz") pool.push(...step.questions);
      }
    }
  }
  return pool;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build the question set for a battle: up to 7 quiz questions. If the module
 * has fewer than 4, top up from the whole course so fights stay meaningful.
 */
export function buildBossQuestions(courseId: string, moduleId: string): BossQuestion[] {
  const course = getCourse(courseId);
  if (!course) return [];
  const own = harvestQuiz(course, moduleId);
  const pool = own.length >= 4 ? own : [...own, ...harvestQuiz(course, FINAL_MODULE_ID)];
  const picked = shuffle(pool).slice(0, 7);
  return picked.map((q) => ({ q: q.q, options: q.options, answer: q.answer, explain: q.explain }));
}

/** Damage per correct answer so that a clean sweep always kills the boss. */
export function bossDamage(questionCount: number): number {
  return Math.ceil(100 / Math.max(1, questionCount)) + 4;
}

/** Damage the player takes on a wrong answer. */
export const PLAYER_DAMAGE = 34;

export const FINAL_BOSS_TITLE: Record<string, string> = {
  "python-basics": "قاتل پایتون 🐍",
  "html-basics": "رام‌کننده تگ‌ها 🕸️",
  "css-basics": "جادوگر استایل 🎨",
  "js-basics": "روح ناهمگام ⚡",
};

export const FINAL_CARD_KIND: Record<string, string> = {
  "python-basics": "FINAL_PY",
  "html-basics": "FINAL_WEB",
  "css-basics": "FINAL_CSS",
  "js-basics": "FINAL_JS",
};
