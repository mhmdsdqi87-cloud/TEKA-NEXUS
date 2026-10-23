"use client";

// TEKA NEXUS — TEKA Academy view.
// Hub (course cards + certificates + leaderboard) and course player
// (module sidebar + lesson player + free playground).

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronDown, Compass, Flame, GraduationCap, Lock, PlayCircle, Rocket, Search, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { get, post } from "@/lib/api";
import { useApp, type SessionUser } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";

function useLocale(): string {
  return useI18n((s) => s.locale);
}
import { EASE, FadeIn, HoverLift, PulsingDot, Stagger, StaggerItem, AnimatedNumber } from "@/components/shared/motion";
import { COURSES, courseLessons, courseMinutes } from "@/lib/academy";
import { pick, ACCENTS, type AccentKey, type Course } from "@/lib/academy/types";
import { LessonPlayer } from "@/components/academy/lesson-player";
import { PyPlayground } from "@/components/academy/py-runner";
import { HtmlPlayground } from "@/components/academy/html-runner";
import { ExamRunner } from "@/components/academy/exam-runner";
import { CertificateDialog, type CertInfo } from "@/components/academy/certificate";
import { LessonExplorer, type ExplorerFilter } from "@/components/academy/lesson-explorer";
import { AchievementsPanel } from "@/components/academy/achievements";
import { touchStreak, useBookmarks, useStreak } from "@/lib/academy/local";

export type ExamSummary = { courseId: string; attemptsUsed: number; passed: boolean; bestScore: number };

const EXAM_MAX_ATTEMPTS = 3;

type ProgressMap = Record<string, { done: string[]; last?: string | null }>;
type CertRow = { courseId: string; code: string; createdAt: string };
type LeaderRow = {
  rank: number;
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  xp: number;
  reputation: number;
  lessons: number;
  isMe: boolean;
};

const PYTHON_PLAYGROUND_SAMPLE = `# Welcome to the TEKA playground!
# Edit anything, then hit Run — nothing is graded here.

name = "Explorer"
energy = 3
while energy > 0:
    print(f"{name} has {energy} ⚡")
    energy -= 1

print("Now build something legendary!")`;

const HTML_PLAYGROUND_SAMPLE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        font-family: system-ui, sans-serif;
        color: white;
      }
      .card {
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(34, 211, 238, 0.35);
      }
      h1 { margin: 0 0 8px; }
      p { color: #94a3b8; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>⚡ Hello, builder!</h1>
      <p>Edit me and watch the preview update.</p>
    </div>
  </body>
</html>`;

// ─── Data hook ───────────────────────────────────────────────

function useAcademyData(user: SessionUser | null) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [certs, setCerts] = useState<CertRow[]>([]);
  const [exams, setExams] = useState<ExamSummary[]>([]);
  const [leaders, setLeaders] = useState<LeaderRow[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setProgress({});
      setCerts([]);
      setExams([]);
      setLoaded(true);
      return;
    }
    try {
      const res = await get<{ progress: { courseId: string; completedLessons: string[]; lastLessonId: string | null }[]; certificates: CertRow[]; exams?: ExamSummary[] }>("/api/academy");
      const map: ProgressMap = {};
      for (const p of res.progress) map[p.courseId] = { done: p.completedLessons, last: p.lastLessonId };
      setProgress(map);
      setCerts(res.certificates);
      setExams(res.exams ?? []);
    } catch {
      /* offline — keep defaults */
    } finally {
      setLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!user) {
      setLeaders(null);
      return;
    }
    get<{ rows: LeaderRow[] }>("/api/academy/leaderboard")
      .then((r) => setLeaders(r.rows))
      .catch(() => setLeaders([]));
  }, [user]);

  return { progress, certs, exams, leaders, loaded, refresh, setProgress, setCerts };
}

// ─── Hub ─────────────────────────────────────────────────────

function ProgressRing({ value, size = 56 }: { value: number; size?: number }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90" role="img" aria-label={`${Math.round(value * 100)}%`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CourseCard({ course, done, total, isDone, onStart, t, locale }: {
  course: Course;
  done: number;
  total: number;
  isDone: boolean;
  onStart: () => void;
  t: ReturnType<typeof useT>;
  locale: string;
}) {
  const accentText = ACCENTS[course.accent].text;
  const pct = total ? done / total : 0;

  return (
    <HoverLift className="h-full">
      <div className={cn("academy-glass academy-glass-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6")}>
        {/* accent aurora + top hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-10 -top-10 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-45"
          style={{ background: ACCENTS[course.accent].glow }}
        />
        <div
          aria-hidden="true"
          className={cn("pointer-events-none absolute inset-x-10 top-0 h-px opacity-60", ACCENTS[course.accent].bar)}
        />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.05] text-2xl ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110",
              )}
              aria-hidden="true"
            >
              {course.emoji}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">{pick(course.title, locale)}</h3>
              <p className="text-xs text-muted-foreground">
                {course.modules.length} modules · {t("academy.lessonsCount", { count: total })} · {Math.round(courseMinutes(course) / 60)}h
              </p>
            </div>
          </div>
          <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/25 backdrop-blur-sm")}>
            <PulsingDot dotClassName="bg-emerald-400" />
            {t("academy.freeBadge")}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{pick(course.tagline, locale)}</p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.04]">
            <motion.div
              className={cn("h-full rounded-full bg-gradient-to-r", ACCENTS[course.accent].grad)}
              initial={{ width: 0 }}
              animate={{ width: `${pct * 100}%` }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </div>
          <span className={cn("text-xs font-semibold tabular-nums", accentText)}>
            {t("academy.lessonsDone", { done, total })}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={onStart}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-glow",
              isDone
                ? "border border-white/10 bg-white/[0.04] text-muted-foreground hover:text-foreground"
                : "btn-hero",
            )}
          >
            <PlayCircle className="h-4 w-4" />
            {done === 0 ? t("academy.startCourse") : isDone ? t("academy.reviewCourse") : t("academy.continueCourse")}
          </button>
          {isDone && <span className="text-2xl drop-shadow-[0_0_10px_rgba(251,191,36,0.45)]" aria-hidden="true">🏆</span>}
        </div>
      </div>
    </HoverLift>
  );
}

function Hub({ onOpenCourse, onOpenLesson, progress, certs, exams, leaders, onShowCert }: {
  onOpenCourse: (courseId: string) => void;
  onOpenLesson: (courseId: string, lessonId: string) => void;
  progress: ProgressMap;
  certs: CertRow[];
  exams: ExamSummary[];
  leaders: LeaderRow[] | null;
  onShowCert: (courseId: string, code: string, createdAt: string, license: boolean) => void;
}) {
  const t = useT();
  const locale = useLocale();
  const user = useApp((s) => s.user);
  const navigateHub = useApp((s) => s.navigate);
  const bookmarks = useBookmarks(user?.id);
  const streak = useStreak(user?.id);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerFilter, setExplorerFilter] = useState<ExplorerFilter>("all");

  const totalLessons = COURSES.reduce((acc, c) => acc + courseLessons(c).length, 0);
  const doneLessons = Object.values(progress).reduce((acc, p) => acc + p.done.length, 0);
  const overall = totalLessons ? doneLessons / totalLessons : 0;

  const doneSet = useMemo(() => {
    const s = new Set<string>();
    for (const p of Object.values(progress)) for (const id of p.done) s.add(id);
    return s;
  }, [progress]);

  // "Continue learning" — for every started course, the next open lesson.
  const continueRows = useMemo(() => {
    const rows: { course: Course; lessonId: string; titleEn: string; titleFa: string; done: number; total: number }[] = [];
    for (const c of COURSES) {
      const p = progress[c.id];
      if (!p || p.done.length === 0) continue;
      const flat = c.modules.flatMap((m) => m.lessons);
      const next = flat.find((l) => !p.done.includes(l.id));
      if (next) rows.push({ course: c, lessonId: next.id, titleEn: next.title.en, titleFa: next.title.fa, done: p.done.length, total: flat.length });
    }
    return rows;
  }, [progress]);

  // Ctrl+K opens the lesson explorer; the daily streak rolls once per visit.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setExplorerOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!user) return;
    touchStreak(user.id); // rolls the daily streak; useStreak picks it up
  }, [user]);

  // Short course labels (python-basics → PY, css-basics → CSS …) — every
  // course gets its own tidy stat tile in the hero.
  const courseLabel = (id: string) => id.split("-")[0].toUpperCase();

  return (
    <div className="space-y-8">
      {/* hero — frosted glass with aurora glows + grid sheen */}
      <FadeIn>
        <div className="academy-glass academy-grid-sheen relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan-500/[0.14] blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-500/[0.14] blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute right-[30%] top-1/2 h-40 w-40 rounded-full bg-emerald-500/[0.07] blur-3xl" />
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/25 backdrop-blur-sm">
                  <PulsingDot dotClassName="bg-emerald-400" />
                  {t("academy.freeBadge")} · forever
                </span>
                <h1 className="mt-4 flex flex-wrap items-center gap-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
                  <GraduationCap className="h-9 w-9 text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.5)] sm:h-12 sm:w-12" aria-hidden="true" />
                  <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                    {t("academy.hubTitle")}
                  </span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {t("academy.hubSubtitle")}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <button
                  onClick={() => setExplorerOpen(true)}
                  aria-haspopup="dialog"
                  className="glass-card inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-cyan-200 transition-colors hover:bg-white/[0.06] focus-glow"
                >
                  <Search className="h-4 w-4 text-cyan-300" />
                  {t("academy.explorer.button")}
                  <kbd className="hidden rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">Ctrl+K</kbd>
                </button>
                <button
                  onClick={() => navigateHub({ name: "academyPortal" })}
                  className="glass-card inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-cyan-200 transition-colors hover:bg-white/[0.06] focus-glow"
                >
                  <Compass className="h-4 w-4 text-cyan-300" />
                  {t("nav.portal")}
                </button>
              </div>
            </div>

            {/* progress + uniform stat tiles — tidy grid, no loose wrapping */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
                <ProgressRing value={overall} />
                <div>
                  <p className="text-xs text-muted-foreground">{t("academy.progressLabel")}</p>
                  <p className="text-sm font-semibold text-white">
                    <AnimatedNumber value={doneLessons} /> / {totalLessons} {t("academy.lessonsCount", { count: 1 }).replace("1 ", "")}
                  </p>
                </div>
              </div>
              {COURSES.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl" aria-hidden="true">{course.emoji}</span>
                    <p className="text-xs font-medium text-muted-foreground">{courseLabel(course.id)}</p>
                  </div>
                  <p className={cn("text-sm font-bold tabular-nums", ACCENTS[course.accent].text)}>
                    {courseLessons(course).length}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-violet-400/[0.14] bg-violet-500/[0.05] px-5 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl" aria-hidden="true">🏆</span>
                  <p className="text-xs font-medium text-muted-foreground">Certificate</p>
                </div>
                <p className="text-sm font-bold tabular-nums text-violet-300">×{COURSES.length}</p>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-400/[0.14] bg-orange-500/[0.05] px-5 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl" aria-hidden="true">🔥</span>
                  <p className="text-xs font-medium text-muted-foreground">{t("academy.streakLabel")}</p>
                </div>
                <p className="text-sm font-bold tabular-nums text-orange-300">
                  {streak > 0 ? t("academy.streakDays", { n: streak }) : "—"}
                </p>
              </div>
              <button
                onClick={() => { setExplorerFilter("starred"); setExplorerOpen(true); }}
                className="flex items-center justify-between gap-3 rounded-2xl border border-amber-400/[0.14] bg-amber-500/[0.05] px-5 py-4 text-start backdrop-blur-sm transition-colors hover:bg-amber-500/[0.09] focus-glow"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl" aria-hidden="true">⭐</span>
                  <p className="text-xs font-medium text-muted-foreground">{t("academy.starredLabel")}</p>
                </div>
                <p className="text-sm font-bold tabular-nums text-amber-300">×{bookmarks.length}</p>
              </button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* continue learning — one-tap jump into the next open lesson */}
      {continueRows.length > 0 && (
        <FadeIn>
          <div className="academy-glass rounded-2xl p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <Rocket className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              {t("academy.continueTitle")}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {continueRows.map((row) => (
                <div key={row.course.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-xl ring-1 ring-inset ring-white/10" aria-hidden="true">{row.course.emoji}</span>
                    <div className="min-w-0">
                      <p dir="auto" className="truncate text-sm font-semibold text-white">{locale === "fa" ? row.titleFa : row.titleEn}</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {pick(row.course.title, locale)} · {t("academy.lessonsDone", { done: row.done, total: row.total })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenLesson(row.course.id, row.lessonId)}
                    className="btn-hero inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl px-4 text-xs font-semibold focus-glow"
                  >
                    <PlayCircle className="h-4 w-4" />
                    {t("academy.continueCourse")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {!user && (
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/[0.05] px-5 py-4">
            <p className="flex items-center gap-2.5 text-sm text-cyan-100/90">
              <Lock className="h-4 w-4 text-cyan-300" />
              {t("academy.loginPrompt")}
            </p>
            <button onClick={() => navigateHub({ name: "signup" })} className="btn-hero inline-flex min-h-[44px] items-center rounded-xl px-5 text-sm font-semibold focus-glow">
              {t("common.signUp")}
            </button>
          </div>
        </FadeIn>
      )}

      {/* course cards */}
      <Stagger className="grid gap-5 lg:grid-cols-2" gap={0.1}>
        {COURSES.map((course) => {
          const total = courseLessons(course).length;
          const done = progress[course.id]?.done.length ?? 0;
          return (
            <StaggerItem key={course.id} className="h-full">
              <CourseCard
                course={course}
                done={done}
                total={total}
                isDone={done >= total && total > 0}
                onStart={() => onOpenCourse(course.id)}
                t={t}
                locale={locale}
              />
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* achievements — 12 glass badges */}
      <FadeIn>
        <AchievementsPanel
          t={t}
          stats={{
            done: doneLessons,
            total: totalLessons,
            streak,
            certs: certs.length,
            examPassed: exams.some((e) => e.passed),
            coursesDone: COURSES.filter((c) => {
              const total = courseLessons(c).length;
              return total > 0 && (progress[c.id]?.done.length ?? 0) >= total;
            }).map((c) => c.id),
            bookmarks: bookmarks.length,
          }}
        />
      </FadeIn>

      {/* Hack & Security — coming soon (Task 15-d) */}
      <FadeIn>
        <div className="academy-glass relative overflow-hidden rounded-2xl p-5 sm:p-6">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-rose-500/[0.14] blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-violet-500/[0.12] blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-400/25 bg-rose-500/10"
            >
              <ShieldCheck className="h-7 w-7 text-rose-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-bold text-white">{t("academy.hack.title")}</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-rose-300 ring-1 ring-inset ring-rose-400/30">
                  <motion.span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-rose-400"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  {t("academy.hack.badge")}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{t("academy.hack.tagline")}</p>
              <ul className="mt-3 grid gap-1.5 text-sm text-foreground/85 sm:grid-cols-3">
                {[t("academy.hack.line1"), t("academy.hack.line2"), t("academy.hack.line3")].map((line) => (
                  <li key={line} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-rose-300/80" aria-hidden="true" />
                    <span className="truncate" title={line}>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                {t("academy.hack.teaser")}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* certificates + leaderboard */}
      <div className="grid gap-5 lg:grid-cols-2">
        <FadeIn>
          <div className="academy-glass h-full rounded-2xl p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <Award className="h-5 w-5 text-amber-300" />
              {t("academy.certificatesTitle")}
            </h2>
            {certs.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-muted-foreground">
                🏆 {t("academy.courseCompleteBody")}
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {certs.map((c) => {
                  const course = COURSES.find((x) => x.id === c.courseId);
                  const licensed = exams.some((e) => e.courseId === c.courseId && e.passed);
                  return (
                    <motion.li
                      key={c.code}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
                        licensed ? "border-emerald-400/25 bg-emerald-500/[0.06]" : "border-amber-400/20 bg-amber-500/[0.05]",
                      )}
                    >
                      <div className="min-w-0">
                        <p className={cn("truncate text-sm font-semibold", licensed ? "text-emerald-100" : "text-amber-100")}>
                          {course?.emoji} {course ? pick(course.title, locale) : c.courseId}
                        </p>
                        <p className="font-mono text-[11px] text-white/40">{c.code}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {licensed && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                            {t("academy.exam.licenseBadge")}
                          </span>
                        )}
                        <button
                          onClick={() => onShowCert(c.courseId, c.code, c.createdAt, licensed)}
                          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/15 focus-glow"
                        >
                          {t("academy.viewCertificate")}
                        </button>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="academy-glass h-full rounded-2xl p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <Trophy className="h-5 w-5 text-cyan-300" />
              {t("academy.leaderboardTitle")}
            </h2>
            {!leaders ? (
              <div className="mt-4 space-y-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-11 animate-pulse rounded-xl bg-white/[0.04]" />
                ))}
              </div>
            ) : leaders.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-muted-foreground">
                {t("common.loading")}
              </p>
            ) : (
              <ol className="mt-4 max-h-72 space-y-2 overflow-y-auto pe-1 academy-scroll">
                <AnimatePresence initial={false}>
                  {leaders.map((row) => (
                    <motion.li
                      key={row.id}
                      layout
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-3 py-2",
                        row.isMe ? "border-cyan-400/30 bg-cyan-500/[0.07]" : "border-white/[0.06] bg-white/[0.02]",
                      )}
                    >
                      <span className="w-7 text-center text-sm font-bold text-muted-foreground" aria-label={`rank ${row.rank}`}>
                        {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : row.rank === -1 ? "—" : row.rank}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-100">
                          {row.displayName}
                          {row.isMe && <span className="ms-2 rounded-full bg-cyan-500/15 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">{t("academy.leaderboardYou")}</span>}
                        </p>
                        <p className="text-[11px] text-muted-foreground">@{row.username}</p>
                      </div>
                      <div className="text-end">
                        <p className="text-sm font-bold tabular-nums text-amber-300">{row.xp} XP</p>
                        <p className="text-[11px] tabular-nums text-muted-foreground">{t("academy.leaderboardLessons", { count: row.lessons })}</p>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            )}
          </div>
        </FadeIn>
      </div>

      <LessonExplorer
        open={explorerOpen}
        onOpenChange={setExplorerOpen}
        filter={explorerFilter}
        onFilterChange={setExplorerFilter}
        doneSet={doneSet}
        bookmarks={bookmarks}
        onOpenLesson={onOpenLesson}
        t={t}
      />
    </div>
  );
}

// ─── Course view ─────────────────────────────────────────────

/** Course-level Skill Meter: animated 0-100% fill (render-only). */
function SkillMeter({ value, accent, label }: { value: number; accent: AccentKey; label: string }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      aria-label={label}
    >
      <motion.div
        className={cn(
          "h-full w-full origin-left rounded-full rtl:origin-right",
          `bg-gradient-to-r ${ACCENTS[accent].grad}`,
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value }}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </div>
  );
}

/** Prominent animated CTA for the secure final exam (all lessons done, not licensed yet). */
function ExamCtaCard({ course, exam, onStart, t }: {
  course: Course;
  exam?: ExamSummary;
  onStart: () => void;
  t: ReturnType<typeof useT>;
}) {
  const attemptsLeft = Math.max(0, EXAM_MAX_ATTEMPTS - (exam?.attemptsUsed ?? 0));
  const blocked = attemptsLeft <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="relative"
    >
      {/* animated glow */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-400/40 via-cyan-400/40 to-violet-400/40 blur-lg"
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-[#0d1526] p-5 sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl"
        />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <motion.span
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/15 ring-1 ring-inset ring-emerald-400/30"
              aria-hidden="true"
            >
              <ShieldCheck className="h-6 w-6 text-emerald-300" />
            </motion.span>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white sm:text-lg">{t("academy.exam.ctaTitle")}</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("academy.exam.ctaBody")}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground/75">{t("academy.exam.rules")}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold tabular-nums text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
              {t("academy.exam.attemptsLeft", { n: attemptsLeft })}
            </span>
            {exam && exam.bestScore > 0 && (
              <span className="inline-flex items-center rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold tabular-nums text-muted-foreground ring-1 ring-inset ring-white/10">
                {t("academy.exam.lastScore", { n: exam.bestScore })}
              </span>
            )}
            {blocked ? (
              <p className="max-w-[240px] text-xs leading-5 text-rose-300">{t("academy.exam.blocked")}</p>
            ) : (
              <button
                onClick={onStart}
                className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {t("academy.exam.start")}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CourseView({ course, initialLessonId, progress, exam, onBack, onNavigateLesson, onChallengePassed, onStartExam, t }: {
  course: Course;
  initialLessonId?: string;
  progress: ProgressMap;
  exam?: ExamSummary;
  onBack: () => void;
  onNavigateLesson: (courseId: string, lessonId: string) => void;
  onChallengePassed: (courseId: string, lessonId: string) => void;
  onStartExam: () => void;
  t: ReturnType<typeof useT>;
}) {
  const locale = useLocale();
  const [tab, setTab] = useState<"course" | "playground">("course");
  const done = progress[course.id]?.done ?? [];
  const doneSet = useMemo(() => new Set(done), [done]);

  const flat = useMemo(
    () => course.modules.flatMap((m, mi) => m.lessons.map((l, li) => ({ lesson: l, mi, li }))),
    [course],
  );

  const current = (() => {
    if (initialLessonId) return flat.find((f) => f.lesson.id === initialLessonId) ?? null;
    const last = progress[course.id]?.last;
    if (last) {
      const found = flat.find((f) => f.lesson.id === last);
      if (found) return found;
    }
    const next = flat.find((f) => !doneSet.has(f.lesson.id));
    return next ?? flat[0] ?? null;
  })();

  const accent = ACCENTS[course.accent].text;
  const coursePct = flat.length ? done.length / flat.length : 0;
  const courseComplete = flat.length > 0 && done.length >= flat.length;
  const examUnlocked = courseComplete && !exam?.passed;

  return (
    <div className="space-y-5">
      {/* header */}
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.05] text-2xl ring-1 ring-inset ring-white/10" aria-hidden="true">
              {course.emoji}
            </span>
            <div>
              <h1 className="flex flex-wrap items-center gap-2 text-xl font-bold text-white sm:text-2xl">
                {pick(course.title, locale)}
                {exam?.passed && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("academy.exam.licenseBadge")}
                  </span>
                )}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("academy.lessonsDone", { done: done.length, total: flat.length })}
              </p>
            </div>
          </div>
          {/* tabs */}
          <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1" role="tablist" aria-label="course tabs">
            {(["course", "playground"] as const).map((tb) => (
              <button
                key={tb}
                role="tab"
                aria-selected={tab === tb}
                onClick={() => setTab(tb)}
                className={cn(
                  "relative min-h-[40px] rounded-lg px-4 text-sm font-medium transition focus-glow",
                  tab === tb ? "text-cyan-200" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === tb && (
                  <motion.span
                    layoutId={`academy-tab-${course.id}`}
                    className="absolute inset-0 rounded-lg bg-cyan-400/10 ring-1 ring-inset ring-cyan-400/25"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{tb === "course" ? "📚 Course" : "🛝 Playground"}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Skill Meter — course-level progress 0-100% */}
        <div className="mt-4 flex items-center gap-3">
          <SkillMeter
            value={coursePct}
            accent={course.accent}
            label={t("academy.lessonsDone", { done: done.length, total: flat.length })}
          />
          <span className="shrink-0 text-xs font-bold tabular-nums text-white">
            <AnimatedNumber value={Math.round(coursePct * 100)} />%
          </span>
        </div>
      </FadeIn>

      <AnimatePresence mode="wait" initial={false}>
        {tab === "playground" ? (
          <motion.div
            key="pg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.14 } }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <FadeIn>
              <div className="academy-glass rounded-2xl p-4 sm:p-6">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  {t("academy.playgroundTitle")}
                </h2>
                <p className="mb-4 mt-1 text-sm text-muted-foreground">{t("academy.playgroundHint")}</p>
                {course.language === "python" ? (
                  <PyPlayground initialCode={PYTHON_PLAYGROUND_SAMPLE} storageKey={`academy-pg-${course.id}`} t={t} />
                ) : (
                  <HtmlPlayground initialCode={HTML_PLAYGROUND_SAMPLE} storageKey={`academy-pg-${course.id}`} t={t} />
                )}
              </div>
            </FadeIn>
          </motion.div>
        ) : (
          <motion.div
            key="course"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.14 } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="space-y-5"
          >
            {/* Final exam CTA — between course header and modules */}
            {examUnlocked && (
              <ExamCtaCard course={course} exam={exam} onStart={onStartExam} t={t} />
            )}

            <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
              {/* sidebar (desktop) */}
              <aside className="hidden lg:block">
                <div className="academy-glass sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl p-3 academy-scroll">
                  <ModuleList course={course} doneSet={doneSet} currentId={current?.lesson.id} onNavigateLesson={onNavigateLesson} t={t} />
                </div>
              </aside>

              {/* mobile lesson picker */}
              <details className="academy-glass lg:hidden rounded-2xl p-3">
                <summary className="flex min-h-[44px] cursor-pointer items-center justify-between rounded-xl px-3 text-sm font-semibold text-white focus-glow">
                  <span>{current ? pick(current.lesson.title, locale) : "Lessons"}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </summary>
                <div className="mt-2 max-h-80 overflow-y-auto academy-scroll">
                  <ModuleList course={course} doneSet={doneSet} currentId={current?.lesson.id} onNavigateLesson={(cid, lid) => { onNavigateLesson(cid, lid); }} t={t} />
                </div>
              </details>

              {/* player */}
              <div className="min-w-0">
                {current ? (
                  <LessonPlayer
                    key={current.lesson.id}
                    course={course}
                    lesson={current.lesson}
                    moduleIndex={current.mi}
                    lessonIndex={current.li}
                    completed={doneSet.has(current.lesson.id)}
                    onChallengePassed={() => onChallengePassed(course.id, current.lesson.id)}
                    onNavigateLesson={onNavigateLesson}
                    onBack={onBack}
                    t={t}
                  />
                ) : (
                  <div className="grid place-items-center rounded-2xl border border-dashed border-white/10 p-10 text-center">
                    <p className="text-4xl" aria-hidden="true">🎓</p>
                    <p className="mt-3 text-sm text-muted-foreground">{t("academy.hubSubtitle")}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ModuleList({ course, doneSet, currentId, onNavigateLesson, t }: {
  course: Course;
  doneSet: Set<string>;
  currentId?: string;
  onNavigateLesson: (courseId: string, lessonId: string) => void;
  t: ReturnType<typeof useT>;
}) {
  const locale = useLocale();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    // open the module containing the current lesson
    for (const m of course.modules) {
      if (m.lessons.some((l) => l.id === currentId)) initial[m.id] = true;
    }
    return initial;
  });

  return (
    <nav className="space-y-2" aria-label={t("academy.hubTitle")}>
      {course.modules.map((m, mi) => {
        const isOpen = open[m.id] ?? false;
        const moduleDone = m.lessons.filter((l) => doneSet.has(l.id)).length;
        return (
          <div key={m.id} className="rounded-xl border border-white/[0.06] bg-white/[0.015]">
            <button
              onClick={() => setOpen((o) => ({ ...o, [m.id]: !isOpen }))}
              aria-expanded={isOpen}
              className="flex min-h-[48px] w-full items-center gap-2.5 px-3 py-2 text-start focus-glow"
            >
              <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-md text-[11px] font-bold", moduleDone === m.lessons.length ? "bg-emerald-500/20 text-emerald-300" : "bg-white/[0.06] text-muted-foreground")}>
                {moduleDone === m.lessons.length ? "✓" : mi + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-200">{pick(m.title, locale)}</span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="overflow-hidden pb-1.5"
                >
                  {m.lessons.map((l, li) => {
                    const isDone = doneSet.has(l.id);
                    const isCurrent = l.id === currentId;
                    return (
                      <li key={l.id}>
                        <button
                          onClick={() => onNavigateLesson(course.id, l.id)}
                          aria-current={isCurrent ? "page" : undefined}
                          className={cn(
                            "flex min-h-[44px] w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-start text-[13px] transition focus-glow",
                            isCurrent ? "bg-cyan-400/10 text-cyan-200 ring-1 ring-inset ring-cyan-400/25" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[9px] font-bold",
                              isDone ? "bg-emerald-500/25 text-emerald-300" : "bg-white/[0.07] text-slate-400",
                            )}
                            aria-hidden="true"
                          >
                            {isDone ? "✓" : li + 1}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{pick(l.title, locale)}</span>
                          <span className="shrink-0 text-[10px] text-muted-foreground/60">{l.minutes}{t("academy.minutesShort").slice(0, 1)}</span>
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

// ─── Root view ───────────────────────────────────────────────

export function AcademyView({ courseSlug, lessonId }: { courseSlug?: string; lessonId?: string }) {
  const t = useT();
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const setUser = useApp((s) => s.setUser);
  const { progress, certs, exams, leaders, setProgress, refresh } = useAcademyData(user);
  const [certDialog, setCertDialog] = useState<CertInfo | null>(null);
  const [examCourse, setExamCourse] = useState<Course | null>(null);
  const course = useMemo(() => COURSES.find((c) => c.id === courseSlug), [courseSlug]);
  const examOf = useCallback((courseId: string) => exams.find((e) => e.courseId === courseId), [exams]);

  const handleChallengePassed = useCallback(
    async (courseId: string, lessonId: string) => {
      if (!user) {
        toast.info(t("academy.loginPrompt"));
        return;
      }
      try {
        const res = await post<{
          added: boolean;
          xpAwarded: number;
          completedLessons: string[];
          courseCompleted: boolean;
          certificate: { code: string; createdAt: string } | null;
          user: { xp: number; reputation: number };
        }>("/api/academy/lessons", { courseId, lessonId });

        setProgress((p) => ({
          ...p,
          [courseId]: { done: res.completedLessons, last: lessonId },
        }));
        setUser({ ...user, xp: res.user.xp, reputation: res.user.reputation });

        if (res.added && res.xpAwarded > 0) {
          toast.success(t("academy.lessonDoneToast", { xp: res.xpAwarded }));
        }
        if (res.courseCompleted && res.certificate) {
          const c = COURSES.find((x) => x.id === courseId);
          toast.success(t("academy.courseDoneToast", { xp: res.xpAwarded }), { duration: 6000 });
          setCertDialog({
            courseTitle: c ? pick(c.title, "en") : courseId,
            recipient: user.displayName,
            code: res.certificate.code,
            issuedAt: new Date(res.certificate.createdAt).toLocaleDateString(),
            emoji: c?.emoji ?? "🏆",
          });
          void refresh();
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : t("common.error"));
      }
    },
    [user, t, setProgress, setUser, refresh],
  );

  const showCert = useCallback(
    (courseId: string, code: string, createdAt: string, license: boolean) => {
      const c = COURSES.find((x) => x.id === courseId);
      setCertDialog({
        courseTitle: c ? pick(c.title, "en") : courseId,
        recipient: user?.displayName ?? "TEKA Learner",
        code,
        issuedAt: new Date(createdAt).toLocaleDateString(),
        emoji: c?.emoji ?? "🏆",
        variant: license ? "license" : "completion",
      });
    },
    [user],
  );

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      {course ? (
        <CourseView
          course={course}
          initialLessonId={lessonId}
          progress={progress}
          exam={examOf(course.id)}
          onBack={() => navigate({ name: "academy" })}
          onNavigateLesson={(cid, lid) => navigate({ name: "academy", course: cid, lesson: lid })}
          onChallengePassed={handleChallengePassed}
          onStartExam={() => setExamCourse(course)}
          t={t}
        />
      ) : (
        <Hub
          onOpenCourse={(cid) => navigate({ name: "academy", course: cid })}
          onOpenLesson={(cid, lid) => navigate({ name: "academy", course: cid, lesson: lid })}
          progress={progress}
          certs={certs}
          exams={exams}
          leaders={leaders}
          onShowCert={showCert}
        />
      )}

      {/* secure final exam overlay */}
      {examCourse && (
        <ExamRunner
          course={examCourse}
          userName={user?.displayName ?? "TEKA Learner"}
          onClose={() => setExamCourse(null)}
          onFinished={() => void refresh()}
          t={t}
        />
      )}

      <CertificateDialog
        cert={certDialog}
        open={!!certDialog}
        onClose={() => setCertDialog(null)}
        t={t}
      />
    </main>
  );
}
