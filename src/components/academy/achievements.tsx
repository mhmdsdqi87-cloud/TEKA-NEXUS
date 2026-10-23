"use client";

// TEKA NEXUS — Academy achievements. 12 badges computed client-side from
// progress / streak / certificates / exams / bookmarks. Glass grid with
// glowing unlocked states.

import { motion } from "framer-motion";
import { Lock, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { EASE } from "@/components/shared/motion";
import type { TFunc } from "@/lib/i18n";

export type AchievementStats = {
  done: number;
  total: number;
  streak: number;
  certs: number;
  examPassed: boolean;
  coursesDone: string[]; // course ids fully completed
  bookmarks: number;
};

type Badge = { emoji: string; titleKey: string; hintKey: string; unlocked: boolean };

export function AchievementsPanel({ stats, t }: { stats: AchievementStats; t: TFunc }) {
  const badges: Badge[] = [
    { emoji: "🌱", titleKey: "academy.ach.b1t", hintKey: "academy.ach.b1h", unlocked: stats.done >= 1 },
    { emoji: "⚡", titleKey: "academy.ach.b2t", hintKey: "academy.ach.b2h", unlocked: stats.done >= 10 },
    { emoji: "🚀", titleKey: "academy.ach.b3t", hintKey: "academy.ach.b3h", unlocked: stats.done >= 50 },
    { emoji: "🔭", titleKey: "academy.ach.b4t", hintKey: "academy.ach.b4h", unlocked: stats.done >= 150 },
    { emoji: "👑", titleKey: "academy.ach.b5t", hintKey: "academy.ach.b5h", unlocked: stats.done >= stats.total && stats.total > 0 },
    { emoji: "🐍", titleKey: "academy.ach.b6t", hintKey: "academy.ach.b6h", unlocked: stats.coursesDone.includes("python-basics") },
    { emoji: "🌐", titleKey: "academy.ach.b7t", hintKey: "academy.ach.b7h", unlocked: stats.coursesDone.includes("html-basics") },
    { emoji: "🎨", titleKey: "academy.ach.b8t", hintKey: "academy.ach.b8h", unlocked: stats.coursesDone.includes("css-basics") },
    { emoji: "⚙️", titleKey: "academy.ach.b9t", hintKey: "academy.ach.b9h", unlocked: stats.coursesDone.includes("js-basics") },
    { emoji: "🔥", titleKey: "academy.ach.b10t", hintKey: "academy.ach.b10h", unlocked: stats.streak >= 3 },
    { emoji: "🏆", titleKey: "academy.ach.b11t", hintKey: "academy.ach.b11h", unlocked: stats.certs >= 1 },
    { emoji: "🛡️", titleKey: "academy.ach.b12t", hintKey: "academy.ach.b12h", unlocked: stats.examPassed },
  ];
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <section aria-labelledby="ach-title" className="academy-glass relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-500/[0.12] blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="ach-title" className="flex items-center gap-2 text-base font-semibold text-white">
            <Trophy className="h-5 w-5 text-amber-300" aria-hidden="true" />
            {t("academy.ach.title")}
          </h2>
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold tabular-nums text-amber-300 ring-1 ring-inset ring-amber-400/25">
            {unlockedCount} / {badges.length}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{t("academy.ach.subtitle")}</p>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {badges.map((b, i) => (
            <motion.div
              key={b.titleKey}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
              className={cn(
                "relative flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors",
                b.unlocked
                  ? "border-amber-400/25 bg-gradient-to-b from-amber-500/[0.10] to-transparent shadow-[0_0_18px_-6px_rgba(251,191,36,0.45)]"
                  : "border-white/[0.06] bg-white/[0.02] opacity-60",
              )}
            >
              <span
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full text-2xl",
                  b.unlocked ? "bg-amber-400/15 ring-1 ring-inset ring-amber-300/30" : "bg-white/[0.04] grayscale",
                )}
                aria-hidden="true"
              >
                {b.unlocked ? b.emoji : <Lock className="h-4 w-4 text-muted-foreground" />}
              </span>
              <p className={cn("text-xs font-semibold leading-4", b.unlocked ? "text-amber-100" : "text-muted-foreground")}>
                {t(b.titleKey)}
              </p>
              <p className="text-[10px] leading-3.5 text-muted-foreground/75">{t(b.hintKey)}</p>
              {b.unlocked && (
                <span className="absolute end-2 top-2 text-[9px] font-black tracking-wide text-amber-300/90" aria-hidden="true">
                  ✓
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
