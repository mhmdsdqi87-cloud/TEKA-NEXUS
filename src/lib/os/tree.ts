// TEKA NEXUS — SKILL TREE (Task 19).
// A galaxy map of glowing nodes: one "module" node per Academy module, one
// "boss" node per module, one FINAL boss per course, plus special island
// nodes (pet / war / crime / speedrun). Completion is derived from real
// progress — never fake.

import { COURSES } from "@/lib/academy";
import type { AccentKey } from "@/lib/academy/types";

export type TreeKind = "module" | "boss" | "final" | "special";

export type TreeNode = {
  id: string;
  branch: string; // course id or "special"
  kind: TreeKind;
  /** courseId:moduleId for module/boss nodes; special key for specials. */
  ref: string;
  x: number;
  y: number;
  title: { en: string; fa: string };
  desc: { en: string; fa: string };
  emoji: string;
  accent: AccentKey;
  requires: string[];
};

const CHAIN_X: Record<string, number> = {
  "python-basics": 150,
  "html-basics": 400,
  "css-basics": 650,
  "js-basics": 900,
};

const BRANCH_NAME: Record<string, { en: string; fa: string }> = {
  "python-basics": { en: "CORE — Python", fa: "هسته — پایتون" },
  "html-basics": { en: "CRAFT — HTML", fa: "صنعت — HTML" },
  "css-basics": { en: "STYLE — CSS", fa: "نقش — CSS" },
  "js-basics": { en: "PULSE — JavaScript", fa: "تپش — جاوااسکریپت" },
};

export const TREE_VIEW = { w: 1060, h: 1980 };

/** Serpentine x-offset so chains look organic, not like ladders. */
function wobble(i: number): number {
  const seq = [0, 34, 52, 34, 0, -34, -52, -34];
  return seq[i % seq.length];
}

const SPECIALS: TreeNode[] = [
  {
    id: "s:pet", branch: "special", kind: "special", ref: "pet",
    x: 410, y: 1770, emoji: "🐣", accent: "cyan",
    title: { en: "Egg Whisperer", fa: "تخم‌بان" },
    desc: { en: "Hatch your code pet.", fa: "همراه کدنویسی‌ات را از تخم دربیاور." },
    requires: [],
  },
  {
    id: "s:war", branch: "special", kind: "special", ref: "war",
    x: 530, y: 1830, emoji: "⚔️", accent: "ember",
    title: { en: "Enlisted", fa: "سرباز جنگ" },
    desc: { en: "Join Red or Blue in the weekly war.", fa: "در جنگ هفتگی به قرمزها یا آبی‌ها بپیوند." },
    requires: [],
  },
  {
    id: "s:speed", branch: "special", kind: "special", ref: "speedrun",
    x: 650, y: 1770, emoji: "🏎️", accent: "violet",
    title: { en: "Ignition", fa: "جرقه" },
    desc: { en: "Finish a module speedrun.", fa: "یک اسپیدران ماژول را تمام کن." },
    requires: [],
  },
  {
    id: "s:crime1", branch: "special", kind: "special", ref: "case-1-heist",
    x: 770, y: 1830, emoji: "🔎", accent: "emerald",
    title: { en: "Detective I", fa: "کارآگاه I" },
    desc: { en: "Close the Source Code Heist case.", fa: "پرونده «سرقت کد منبع» را ببند." },
    requires: [],
  },
  {
    id: "s:crime2", branch: "special", kind: "special", ref: "case-2-midnight",
    x: 890, y: 1890, emoji: "🕵️", accent: "emerald",
    title: { en: "Detective II", fa: "کارآگاه II" },
    desc: { en: "Close the Midnight Breach case.", fa: "پرونده «حمله نیمه‌شب» را ببند." },
    requires: ["s:crime1"],
  },
];

/** Build the full node graph (pure, derived from course content). */
export function buildTree(): TreeNode[] {
  const nodes: TreeNode[] = [];

  for (const course of COURSES) {
    const baseX = CHAIN_X[course.id] ?? 150;
    let y = 120;
    let prev: string | null = null;

    for (let i = 0; i < course.modules.length; i++) {
      const mod = course.modules[i];
      const x = baseX + wobble(i);

      nodes.push({
        id: `n:${course.id}:${mod.id}`,
        branch: course.id,
        kind: "module",
        ref: `${course.id}:${mod.id}`,
        x, y,
        title: mod.title,
        desc: {
          en: `Complete all ${mod.lessons.length} lessons.`,
          fa: `هر ${mod.lessons.length} درس را کامل کن.`,
        },
        emoji: "📘",
        accent: course.accent,
        requires: prev ? [prev] : [],
      });
      prev = `n:${course.id}:${mod.id}`;

      const bossY = y + 60;
      const bossId = `b:${course.id}:${mod.id}`;
      nodes.push({
        id: bossId,
        branch: course.id,
        kind: "boss",
        ref: `${course.id}:${mod.id}`,
        x: x + (i % 2 === 0 ? 46 : -46),
        y: bossY,
        title: { en: "Module Boss", fa: "باس ماژول" },
        desc: { en: "Defeat the module warden.", fa: "نگهبان ماژول را شکست بده." },
        emoji: "💀",
        accent: course.accent,
        requires: [`n:${course.id}:${mod.id}`],
      });
      prev = bossId;

      y = bossY + 60;
    }

    // Final boss node per course.
    nodes.push({
      id: `b:${course.id}:__final__`,
      branch: course.id,
      kind: "final",
      ref: `${course.id}:__final__`,
      x: baseX + wobble(course.modules.length),
      y: y + 40,
      emoji: course.emoji,
      accent: course.accent,
      title: { en: "Course Master", fa: "استاد دوره" },
      desc: { en: "Defeat the course's final boss.", fa: "باس نهایی دوره را شکست بده." },
      requires: [prev].filter(Boolean) as string[],
    });
  }

  nodes.push(...SPECIALS);
  return nodes;
}

export const TREE_NODES: TreeNode[] = buildTree();

/** Branch legend for the map header. */
export const TREE_BRANCHES = Object.entries(BRANCH_NAME).map(([id, name]) => ({
  id,
  name,
  accent: COURSES.find((c) => c.id === id)?.accent ?? "cyan",
}));
