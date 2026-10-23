"use client";

// TEKA NEXUS — Academy Lesson Explorer (command palette).
// Ctrl+K search across all 300 lessons (fa+en titles, modules, courses)
// with status filters. Enter opens the first hit; click opens any row.

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CornerDownLeft, Search, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/store";
import { COURSES } from "@/lib/academy";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TFunc } from "@/lib/i18n";

export type ExplorerFilter = "all" | "todo" | "done" | "starred";

type FlatLesson = {
  courseId: string;
  courseEmoji: string;
  courseTitleEn: string;
  courseTitleFa: string;
  accent: string;
  moduleTitleEn: string;
  moduleTitleFa: string;
  lessonId: string;
  titleEn: string;
  titleFa: string;
  minutes: number;
};

const MAX_RESULTS = 40;

export function LessonExplorer({
  open,
  onOpenChange,
  filter,
  onFilterChange,
  doneSet,
  bookmarks,
  onOpenLesson,
  t,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  filter: ExplorerFilter;
  onFilterChange: (f: ExplorerFilter) => void;
  doneSet: Set<string>;
  bookmarks: string[];
  onOpenLesson: (courseId: string, lessonId: string) => void;
  t: TFunc;
}) {
  const locale = useI18n((s) => s.locale);
  const [q, setQ] = useState("");
  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);

  const index = useMemo<FlatLesson[]>(() => {
    const rows: FlatLesson[] = [];
    for (const c of COURSES) {
      for (const m of c.modules) {
        for (const l of m.lessons) {
          rows.push({
            courseId: c.id,
            courseEmoji: c.emoji,
            courseTitleEn: c.title.en,
            courseTitleFa: c.title.fa,
            accent: c.accent,
            moduleTitleEn: m.title.en,
            moduleTitleFa: m.title.fa,
            lessonId: l.id,
            titleEn: l.title.en,
            titleFa: l.title.fa,
            minutes: l.minutes,
          });
        }
      }
    }
    return rows;
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return index.filter((r) => {
      if (filter === "done" && !doneSet.has(r.lessonId)) return false;
      if (filter === "todo" && doneSet.has(r.lessonId)) return false;
      if (filter === "starred" && !bookmarkSet.has(r.lessonId)) return false;
      if (!needle) return true;
      return (
        r.titleEn.toLowerCase().includes(needle) ||
        r.titleFa.includes(q.trim()) ||
        r.moduleTitleEn.toLowerCase().includes(needle) ||
        r.moduleTitleFa.includes(q.trim()) ||
        r.courseTitleEn.toLowerCase().includes(needle) ||
        r.courseTitleFa.includes(q.trim())
      );
    });
  }, [index, q, filter, doneSet, bookmarkSet]);

  const shown = results.slice(0, MAX_RESULTS);
  const isRtl = locale === "fa" || locale === "ar";

  const openRow = (r: FlatLesson) => {
    onOpenChange(false);
    onOpenLesson(r.courseId, r.lessonId);
  };

  const filters: { key: ExplorerFilter; label: string }[] = [
    { key: "all", label: t("academy.explorer.all") },
    { key: "todo", label: t("academy.explorer.todo") },
    { key: "done", label: t("academy.explorer.done") },
    { key: "starred", label: t("academy.explorer.starred") },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) setQ(""); // fresh query each time the palette opens
        onOpenChange(v);
      }}
    >
      <DialogContent className="academy-glass top-[12%] max-w-xl translate-y-0 gap-0 overflow-hidden rounded-2xl border-white/10 p-0">
        <DialogTitle className="sr-only">{t("academy.explorer.button")}</DialogTitle>
        <DialogDescription className="sr-only">{t("academy.explorer.placeholder")}</DialogDescription>

        {/* search input */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
          <Search className="h-4.5 w-4.5 shrink-0 text-cyan-300" aria-hidden="true" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && shown.length > 0) {
                e.preventDefault();
                openRow(shown[0]);
              }
            }}
            placeholder={t("academy.explorer.placeholder")}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
            aria-label={t("academy.explorer.placeholder")}
          />
          <kbd className="hidden shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
            {isRtl ? "Ctrl+K" : "Ctrl K"}
          </kbd>
        </div>

        {/* filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/[0.07] px-4 py-2.5" role="tablist">
          {filters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => onFilterChange(f.key)}
              className={cn(
                "min-h-[36px] shrink-0 rounded-full px-3.5 text-xs font-semibold transition focus-glow",
                filter === f.key
                  ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-inset ring-cyan-400/30"
                  : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
          <span className="ms-auto shrink-0 text-[11px] tabular-nums text-muted-foreground/70">
            {results.length}
          </span>
        </div>

        {/* results */}
        <div className="max-h-[46vh] overflow-y-auto p-2">
          {shown.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              🔍 {t("academy.explorer.empty")}
            </p>
          ) : (
            <ul className="space-y-0.5">
              {shown.map((r, i) => {
                const isDone = doneSet.has(r.lessonId);
                const isStar = bookmarkSet.has(r.lessonId);
                return (
                  <li key={r.lessonId}>
                    <motion.button
                      initial={false}
                      onClick={() => openRow(r)}
                      className={cn(
                        "flex min-h-[52px] w-full items-center gap-3 rounded-xl px-3 py-2 text-start transition focus-glow",
                        i === 0 && q.trim() ? "bg-cyan-400/[0.07] ring-1 ring-inset ring-cyan-400/20" : "hover:bg-white/[0.05]",
                      )}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-lg ring-1 ring-inset ring-white/10" aria-hidden="true">
                        {r.courseEmoji}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span dir="auto" className="block truncate text-sm font-medium text-foreground">
                          {locale === "fa" ? r.titleFa : r.titleEn}
                        </span>
                        <span className="block truncate text-[11px] text-muted-foreground">
                          {locale === "fa" ? `${r.courseTitleFa} · ${r.moduleTitleFa}` : `${r.courseTitleEn} · ${r.moduleTitleEn}`}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
                        {isStar && <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" aria-label={t("academy.explorer.starred")} />}
                        {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-label={t("academy.explorer.done")} />}
                        <span className="text-[11px] tabular-nums">{r.minutes}{t("academy.minutesShort").slice(0, 1)}</span>
                        {i === 0 && q.trim() && (
                          <CornerDownLeft className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden="true" />
                        )}
                      </span>
                    </motion.button>
                  </li>
                );
              })}
              {results.length > shown.length && (
                <li className="px-3 py-2 text-center text-[11px] text-muted-foreground/70">
                  {t("academy.explorer.more", { n: results.length - shown.length })}
                </li>
              )}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
