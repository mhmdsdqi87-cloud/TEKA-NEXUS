"use client";

// TEKA NEXUS — TEKA Academy lesson player.
// Walks a lesson's steps (theory → quiz → challenge) with animated
// transitions. The challenge is the gate: passing it completes the lesson.

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, BookmarkCheck, CheckCircle2, ChevronDown, Flag, GraduationCap, HelpCircle, Loader2, NotebookPen, Sparkles, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { XP_RULES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/store";
import { EASE, Stagger, StaggerItem } from "@/components/shared/motion";
import { Confetti } from "@/components/academy/confetti";
import { PyInline, PyChallenge } from "@/components/academy/py-runner";
import { HtmlInline, HtmlChallenge } from "@/components/academy/html-runner";
import { pick, type Course, type Lesson, type QuizQuestion, type TheoryBlock, type Step } from "@/lib/academy/types";
import { readNote, saveNote, toggleBookmark, useBookmarks } from "@/lib/academy/local";
import { useApp } from "@/lib/store";
import { TUTOR_DICT } from "@/components/academy-portal/tutor/tutor-dict";
import { TutorPanel } from "@/components/academy-portal/tutor/tutor-panel";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { TFunc } from "@/lib/i18n";

// ─── Theory ──────────────────────────────────────────────────

function useLocaleSafe(): string {
  return useI18n((s) => s.locale);
}

function TheoryBlocks({ blocks, locale }: { blocks: TheoryBlock[]; locale: string }) {
  return (
    <Stagger className="space-y-4" gap={0.07}>
      {blocks.map((b, i) => (
        <StaggerItem key={i}>
          {b.type === "text" && (
            <p dir="auto" className="text-[15px] leading-7 text-slate-200/90 [&_code]:rounded [&_code]:bg-white/[0.07] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-cyan-200">
              {mdInline(pick(b, locale))}
            </p>
          )}
          {b.type === "tip" && (
            <div dir="auto" className="flex gap-2.5 rounded-xl border border-cyan-400/20 bg-cyan-500/[0.06] px-3.5 py-2.5 text-sm leading-6 text-cyan-100/90">
              <span aria-hidden="true" className="select-none">💡</span>
              <span>{mdInline(pick(b, locale))}</span>
            </div>
          )}
          {b.type === "warn" && (
            <div dir="auto" className="flex gap-2.5 rounded-xl border border-amber-400/20 bg-amber-500/[0.06] px-3.5 py-2.5 text-sm leading-6 text-amber-100/90">
              <span aria-hidden="true" className="select-none">⚠️</span>
              <span>{mdInline(pick(b, locale))}</span>
            </div>
          )}
          {b.type === "code" && (
            <div>
              {b.lang === "python" ? (
                b.runnable === false ? <InlineStatic code={b.code} /> : <PyInline code={b.code} caption={b.caption} />
              ) : b.lang === "css" ? (
                b.runnable === false ? <InlineStatic code={b.code} /> : <HtmlInline code={b.code} caption={b.caption} />
              ) : b.lang === "js" ? (
                <InlineStatic code={b.code} />
              ) : (
                b.runnable === false ? <InlineStatic code={b.code} /> : <HtmlInline code={b.code} caption={b.caption} />
              )}
            </div>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function InlineStatic({ code }: { code: string }) {
  return <pre dir="ltr" className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 font-mono text-[13px] leading-6 text-slate-200">{code}</pre>;
}

/** Minimal inline markdown: **bold** and `code`. */
function mdInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[\[[^\]]+\]\])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      parts.push(<strong key={key++} className="font-semibold text-white">{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      parts.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    } else {
      // [[highlight]] → subtle emphasis
      parts.push(<em key={key++} className="text-cyan-200/90 not-italic">{tok.slice(2, -2)}</em>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ─── Quiz ────────────────────────────────────────────────────

function Quiz({ questions, locale, t }: { questions: QuizQuestion[]; locale: string; t: TFunc }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const done = chosen !== undefined;
        return (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.07, duration: 0.35, ease: EASE }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5"
          >
            <p dir="auto" className="mb-3 flex items-start gap-2.5 font-medium text-slate-100">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-300" aria-hidden="true">
                {qi + 1}
              </span>
              {pick(q.q, locale)}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isRight = oi === q.answer;
                return (
                  <button
                    key={oi}
                    disabled={done}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={cn(
                      "group flex min-h-[44px] items-center gap-3 rounded-xl border px-3.5 py-2.5 text-start text-sm transition focus-glow",
                      !done && "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/30 hover:bg-cyan-500/[0.06]",
                      done && isRight && "border-emerald-400/40 bg-emerald-500/[0.1] text-emerald-100",
                      done && isChosen && !isRight && "border-rose-400/40 bg-rose-500/[0.1] text-rose-100",
                      done && !isChosen && !isRight && "border-white/[0.06] bg-transparent text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold",
                        done && isRight ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-300" : "border-white/15 text-slate-400",
                      )}
                      aria-hidden="true"
                    >
                      {done && isRight ? <CheckCircle2 className="h-3.5 w-3.5" /> : String.fromCharCode(65 + oi)}
                    </span>
                    <span dir="auto">{pick(opt, locale)}</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {done && (
                <motion.p
                  key="explain"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  dir="auto"
                  className={cn(
                    "mt-3 overflow-hidden ps-9 text-sm leading-6",
                    chosen === q.answer ? "text-emerald-200/90" : "text-amber-200/90",
                  )}
                >
                  {chosen === q.answer ? "🎯 " : "👇 "}
                  {pick(q.explain, locale)}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      <AnimatePresence>
        {answered === questions.length && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-sm font-medium text-emerald-300"
          >
            <Sparkles className="h-4 w-4" />
            {t("academy.quizComplete")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── AI Voice Mentor (read-aloud narration) ─────────────────
// Speaks the lesson's goal + theory through POST /api/tts (backend z-ai SDK).
// Blob URLs are cached per lesson for instant replay; the cache is capped.

const TTS_URL_CACHE_MAX = 20;
const ttsUrlCache = new Map<string, string>(); // lessonId → blob URL

const TTS_ERROR_TEXT: Record<"fa" | "en", string> = {
  fa: "پخش صدا الان در دسترس نیست — یه بار دیگه امتحان کن.",
  en: "Voice playback is unavailable right now — please try again.",
};

// ─── Player ──────────────────────────────────────────────────

export function LessonPlayer({
  course,
  lesson,
  moduleIndex,
  lessonIndex,
  completed,
  onChallengePassed,
  onNavigateLesson,
  onBack,
  t,
}: {
  course: Course;
  lesson: Lesson;
  moduleIndex: number;
  lessonIndex: number;
  completed: boolean;
  onChallengePassed: () => void;
  onNavigateLesson: (courseId: string, lessonId: string) => void;
  onBack: () => void;
  t: TFunc;
}) {
  const locale = useLocaleSafe();
  const user = useApp((s) => s.user);
  const bookmarks = useBookmarks(user?.id);
  const isStarred = bookmarks.includes(lesson.id);
  const tutor = TUTOR_DICT[locale as keyof typeof TUTOR_DICT] ?? TUTOR_DICT.en;
  const [tutorOpen, setTutorOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [justPassed, setJustPassed] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [note, setNote] = useState(() => readNote(lesson.id));
  const [noteSaved, setNoteSaved] = useState(false);
  const [noteLessonId, setNoteLessonId] = useState(lesson.id);
  // Reset notes when the lesson changes (render-time state reset pattern).
  if (noteLessonId !== lesson.id) {
    setNoteLessonId(lesson.id);
    setNote(readNote(lesson.id));
    setNoteSaved(false);
  }

  // AI Voice Mentor: idle → loading → playing.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ttsState, setTtsState] = useState<"idle" | "loading" | "playing">("idle");

  // Stop narration when the lesson changes or the player unmounts.
  // (The audio's own "pause" listener resets the button state — no setState
  // needed here, which keeps the react-hooks rules happy.)
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [lesson.id]);
  const steps = lesson.steps;
  const step = steps[stepIdx];
  const total = steps.length;
  const isChallenge = step.kind === "challenge";
  const canAdvance = !isChallenge || completed || justPassed;
  const isLast = stepIdx === total - 1;

  // Autosave notes (debounced).
  useEffect(() => {
    if (!notesOpen) return;
    const id = window.setTimeout(() => {
      saveNote(lesson.id, note);
      setNoteSaved(true);
    }, 600);
    return () => window.clearTimeout(id);
  }, [note, notesOpen, lesson.id]);

  const go = (dir: 1 | -1) => {
    setStepIdx((s) => Math.min(total - 1, Math.max(0, s + dir)));
  };

  // Keyboard shortcuts: ← / → move between steps (skips form fields;
  // direction follows the reading direction of the active locale).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el?.isContentEditable) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const rtl = locale === "fa" || locale === "ar";
      const fwd = rtl ? e.key === "ArrowLeft" : e.key === "ArrowRight";
      if (fwd) {
        if (canAdvance && stepIdx < total - 1) {
          e.preventDefault();
          go(1);
        }
      } else if (stepIdx > 0) {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canAdvance, stepIdx, total, locale, go]);

  const nextLesson = useMemo(() => {
    const flat = course.modules.flatMap((m, mi) => m.lessons.map((l, li) => ({ l, mi, li })));
    const i = flat.findIndex((x) => x.l.id === lesson.id);
    return i >= 0 && i + 1 < flat.length ? flat[i + 1] : null;
  }, [course, lesson.id]);

  const handlePassed = () => {
    if (!completed && !justPassed) {
      setJustPassed(true);
      onChallengePassed();
    }
  };

  // ── AI Voice Mentor helpers ────────────────────────────────
  const ttsLang: "fa" | "en" = locale === "fa" ? "fa" : "en";

  // Narration script: lesson goal + all theory text, markdown stripped,
  // capped at 800 chars (the API accepts at most 900).
  const buildNarrationText = () => {
    const parts: string[] = [pick(lesson.goal, locale)];
    for (const s of lesson.steps) {
      if (s.kind !== "theory") continue;
      if (s.title) parts.push(pick(s.title, locale));
      for (const b of s.blocks) {
        if (b.type === "code") continue;
        parts.push(pick(b, locale));
      }
    }
    return parts
      .join(". ")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 800);
  };

  const playNarrationUrl = (url: string) => {
    audioRef.current?.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.addEventListener("ended", () => setTtsState("idle"));
    audio.addEventListener("pause", () => setTtsState("idle"));
    audio.addEventListener("error", () => {
      setTtsState("idle");
      toast.error(TTS_ERROR_TEXT[ttsLang]);
    });
    setTtsState("playing");
    audio.play().catch(() => setTtsState("idle"));
  };

  const handleTtsClick = async () => {
    // Playing → this click stops the narration.
    if (ttsState === "playing") {
      audioRef.current?.pause();
      return;
    }
    if (ttsState === "loading") return;

    // Instant replay from the per-lesson blob cache.
    const cachedUrl = ttsUrlCache.get(lesson.id);
    if (cachedUrl) {
      playNarrationUrl(cachedUrl);
      return;
    }

    setTtsState("loading");
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "audio/wav" },
        body: JSON.stringify({ text: buildNarrationText(), lang: ttsLang }),
      });
      if (!res.ok) {
        setTtsState("idle");
        toast.error(TTS_ERROR_TEXT[ttsLang]);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      ttsUrlCache.set(lesson.id, url);
      if (ttsUrlCache.size > TTS_URL_CACHE_MAX) {
        const oldest = ttsUrlCache.keys().next().value;
        if (oldest !== undefined) {
          const evicted = ttsUrlCache.get(oldest);
          ttsUrlCache.delete(oldest);
          if (evicted && audioRef.current?.src !== evicted) URL.revokeObjectURL(evicted);
        }
      }
      playNarrationUrl(url);
    } catch {
      setTtsState("idle");
      toast.error(TTS_ERROR_TEXT[ttsLang]);
    }
  };

  const StepIcon = step.kind === "theory" ? BookOpen : step.kind === "quiz" ? HelpCircle : Flag;

  return (
    <div className="relative">
      {(justPassed) && <Confetti trigger={1} />}

      {/* XP burst — floating chip on challenge pass (supercharge) */}
      <AnimatePresence>
        {justPassed && (
          <motion.div
            key="xp-burst"
            initial={{ opacity: 0, y: 14, scale: 0.7 }}
            animate={{ opacity: [0, 1, 1, 0], y: -44, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.7, ease: EASE, times: [0, 0.18, 0.72, 1] }}
            className="pointer-events-none absolute -top-3 end-4 z-20 rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm font-black tabular-nums text-emerald-300 shadow-lg shadow-emerald-500/20 ring-1 ring-inset ring-emerald-400/40"
            aria-hidden="true"
          >
            +{XP_RULES.ACADEMY_LESSON.xp} XP ⚡
          </motion.div>
        )}
      </AnimatePresence>

      {/* lesson header */}
      <div className="mb-5">
        <button
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground focus-glow"
        >
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
          {course.title ? pick(course.title, locale) : t("academy.hubTitle")}
        </button>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-muted-foreground ring-1 ring-inset ring-white/10">
            {t("academy.moduleLabel", { n: moduleIndex + 1 })}
          </span>
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-muted-foreground ring-1 ring-inset ring-white/10">
            {t("academy.lessonLabel", { n: lessonIndex + 1 })}
          </span>
          {completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
              <CheckCircle2 className="h-3.5 w-3.5" />
              ✓
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              if (!user) {
                toast.info(t("academy.loginPrompt"));
                return;
              }
              const now = toggleBookmark(user.id, lesson.id);
              toast(now ? t("academy.bookmark.add") : t("academy.bookmark.remove"));
            }}
            aria-pressed={isStarred}
            aria-label={isStarred ? t("academy.bookmark.remove") : t("academy.bookmark.add")}
            title={isStarred ? t("academy.bookmark.remove") : t("academy.bookmark.add")}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition focus-glow",
              isStarred
                ? "bg-amber-400/15 text-amber-300 ring-1 ring-inset ring-amber-300/35"
                : "bg-white/[0.05] text-muted-foreground hover:text-amber-200",
            )}
          >
            {isStarred ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
          </button>
          <button
            type="button"
            onClick={handleTtsClick}
            disabled={ttsState === "loading"}
            aria-label={t("academy.ttsListen")}
            title={t("academy.ttsListen")}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition focus-glow",
              ttsState === "playing"
                ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-400/35"
                : "bg-white/[0.05] text-muted-foreground hover:text-cyan-200",
            )}
          >
            {ttsState === "loading" ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
            ) : ttsState === "playing" ? (
              <VolumeX className="h-4.5 w-4.5" aria-hidden="true" />
            ) : (
              <Volume2 className="h-4.5 w-4.5" aria-hidden="true" />
            )}
          </button>
        </div>
        <h1 dir="auto" className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {pick(lesson.title, locale)}
        </h1>
        <p dir="auto" className="mt-1.5 flex flex-wrap items-baseline gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 self-center text-cyan-300" aria-hidden="true" />
          <span><span className="text-muted-foreground/70">{t("academy.goalLabel")}</span> {pick(lesson.goal, locale)}</span>
          <span className="text-muted-foreground/60">· {lesson.minutes} {t("academy.minutesShort")}</span>
        </p>
      </div>

      {/* step rail */}
      <div className="mb-6 flex items-center gap-2" role="tablist" aria-label={t("academy.stepOf", { current: stepIdx + 1, total })}>
        {steps.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === stepIdx}
            aria-label={t("academy.stepOf", { current: i + 1, total })}
            onClick={() => setStepIdx(i)}
            className={cn(
              "relative h-2 rounded-full transition-all focus-glow",
              i === stepIdx ? "w-8 bg-cyan-400" : "w-2 bg-white/15 hover:bg-white/30",
              s.kind === "challenge" && i !== stepIdx && "!bg-amber-400/40",
            )}
          />
        ))}
        <span className="ms-1 text-[11px] tabular-nums text-muted-foreground">
          {t("academy.stepOf", { current: stepIdx + 1, total })}
        </span>
      </div>

      {/* step body */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={stepIdx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } }}
          transition={{ duration: 0.32, ease: EASE }}
          className="min-w-0"
          role="tabpanel"
        >
          {step.kind === "theory" && (
            <div className="space-y-4">
              {step.title && <h2 dir="auto" className="text-lg font-semibold text-white">{pick(step.title, locale)}</h2>}
              <TheoryBlocks blocks={step.blocks} locale={locale} />
            </div>
          )}
          {step.kind === "quiz" && (
            <div className="space-y-4">
              <h2 dir="auto" className="flex items-center gap-2 text-lg font-semibold text-white">
                <HelpCircle className="h-5 w-5 text-violet-300" />
                {t("academy.quizTitle")}
              </h2>
              <Quiz questions={step.questions} locale={locale} t={t} />
            </div>
          )}
          {step.kind === "challenge" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.08] to-transparent p-4 sm:p-5">
                <h2 dir="auto" className="flex items-center gap-2 text-lg font-semibold text-amber-100">
                  <Flag className="h-5 w-5 text-amber-300" />
                  {t("academy.challengeLabel")} — {pick(step.title, locale)}
                </h2>
                <p dir="auto" className="mt-1.5 text-sm leading-6 text-amber-100/70">
                  <span className="font-medium">{t("academy.missionLabel")}:</span> {pick(step.brief, locale)}
                </p>
              </div>
              {step.check.kind === "py" ? (
                <PyChallenge
                  starter={step.starter}
                  solution={step.solution}
                  tests={step.check.tests}
                  sample={step.sample}
                  hints={step.hints}
                  locale={locale}
                  t={t}
                  passed={completed || justPassed}
                  onPassed={handlePassed}
                />
              ) : (
                <HtmlChallenge
                  starter={step.starter}
                  solution={step.solution}
                  checks={step.check.checks}
                  hints={step.hints}
                  locale={locale}
                  t={t}
                  passed={completed || justPassed}
                  onPassed={handlePassed}
                />
              )}
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* personal notes — autosaved on this device */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setNotesOpen((v) => !v)}
          aria-expanded={notesOpen}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-glow"
        >
          <NotebookPen className="h-4 w-4 text-violet-300" aria-hidden="true" />
          {t("academy.notes.title")}
          {noteSaved && notesOpen && (
            <motion.span
              key="saved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] font-semibold text-emerald-300"
            >
              {t("academy.notes.saved")}
            </motion.span>
          )}
          <ChevronDown className={cn("h-4 w-4 transition-transform", notesOpen && "rotate-180")} aria-hidden="true" />
        </button>
        <AnimatePresence>
          {notesOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden"
            >
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setNoteSaved(false);
                }}
                dir="auto"
                rows={4}
                placeholder={t("academy.notes.placeholder")}
                aria-label={t("academy.notes.title")}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-violet-400/40 focus-glow"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer nav */}
      <div className="mt-8 pb-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d1526]/90 p-3 shadow-xl shadow-black/30 backdrop-blur-xl">
          <button
            onClick={() => go(-1)}
            disabled={stepIdx === 0}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-30 focus-glow"
          >
            <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
            {t("academy.back")}
          </button>

          <div className="flex items-center gap-2">
            {isLast ? (
              nextLesson ? (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigateLesson(course.id, nextLesson.l.id)}
                  className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
                >
                  {t("academy.next")}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </motion.button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                  <CheckCircle2 className="h-4 w-4" />
                  {t("academy.courseCompleteTitle")}
                </span>
              )
            ) : (
              <motion.button
                whileTap={{ scale: canAdvance ? 0.97 : 1 }}
                onClick={() => canAdvance && go(1)}
                disabled={!canAdvance}
                className={cn(
                  "inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-glow",
                  canAdvance
                    ? "btn-hero"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.03] text-muted-foreground/60",
                )}
              >
                {t("academy.next")}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Ask tutor — floating entry to the AI tutor (spec §8) */}
      <motion.button
        type="button"
        onClick={() => setTutorOpen(true)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-24 end-4 z-30 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cyan-400/25 bg-[#0b1220]/90 px-4 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/10 backdrop-blur-xl transition hover:border-cyan-300/40 hover:text-white focus-glow md:bottom-8"
        aria-label={tutor.title}
      >
        <GraduationCap className="h-5 w-5 text-cyan-300" aria-hidden="true" />
        {tutor.title}
      </motion.button>

      <Sheet open={tutorOpen} onOpenChange={setTutorOpen}>
        <SheetContent
          side={locale === "fa" || locale === "ar" ? "left" : "right"}
          className="w-full gap-0 border-white/10 bg-[#0b1120] p-0 sm:max-w-md"
        >
          <SheetHeader className="p-4 ltr:pe-14 rtl:ps-14">
            <SheetTitle className="flex items-center gap-2 text-base text-white">
              <GraduationCap className="h-4.5 w-4.5 text-cyan-300" aria-hidden="true" />
              {tutor.title}
            </SheetTitle>
            <SheetDescription className="sr-only">{tutor.tagline}</SheetDescription>
          </SheetHeader>
          <div className="min-h-0 flex-1">
            <TutorPanel
              context={{
                courseId: course.id,
                lessonId: lesson.id,
                lessonTitle: pick(lesson.title, locale),
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

