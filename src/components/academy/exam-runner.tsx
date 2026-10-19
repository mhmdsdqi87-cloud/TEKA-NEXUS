"use client";

// TEKA NEXUS — TEKA Academy SECURE EXAM runner.
// Full-screen overlay (fixed inset-0 z-50): one question per screen, server-
// synced countdown, progress dots, and an anti-cheat watchdog:
//   • tab switch / window blur          → strike ⚠
//   • copy / cut / paste                → strike ⚠ (blocked)
//   • right-click                       → blocked (no strike)
//   • leaving fullscreen                → strike ⚠
//   • 3rd strike → auto-VOID via POST /api/academy/exam/void
// VOIDed exams do NOT consume one of the 3 attempts; FAILED attempts do.
// Grading is 100% server-side — correct answers never reach this component.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock, ShieldAlert, ShieldCheck, Timer, XCircle } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { get, post } from "@/lib/api";
import { EASE } from "@/components/shared/motion";
import { Confetti } from "@/components/academy/confetti";
import { CertificateDialog, type CertInfo } from "@/components/academy/certificate";
import { pick, type Course } from "@/lib/academy/types";
import type { TFunc } from "@/lib/i18n";

// ─── API shapes (server contract) ────────────────────────────

type ExamQuestionPublic = { id: string; q: string; options: string[] };

type ExamStart =
  | { locked: true; completed: number; total: number }
  | { blocked: true; attemptsLeft: number }
  | { alreadyPassed: true; attemptsLeft: number; certificate: { code: string } | null }
  | { examId: string; attemptNo: number; expiresAt: string; questions: ExamQuestionPublic[] };

type WrongItem = { qid: string; correctIndex: number; why: string };

type SubmitResult = {
  score: number;
  passed: boolean;
  attemptsLeft: number;
  wrong: WrongItem[];
  certificate?: { code: string; createdAt: string };
  expired?: boolean;
  voided?: boolean;
};

type Phase = "loading" | "active" | "grading" | "result" | "voided" | "expired";

const MAX_STRIKES = 3;

function fmtTime(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

// ─── Runner ──────────────────────────────────────────────────

export function ExamRunner({
  course,
  userName,
  onClose,
  onFinished,
  t,
}: {
  course: Course;
  userName: string;
  onClose: () => void;
  onFinished: (passed: boolean) => void;
  t: TFunc;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [exam, setExam] = useState<{ examId: string; attemptNo: number; expiresAt: string; questions: ExamQuestionPublic[] } | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qIdx, setQIdx] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [certDialog, setCertDialog] = useState<CertInfo | null>(null);
  const [closingVoid, setClosingVoid] = useState(false);

  // refs mirror state for stable anti-cheat / timer callbacks
  const phaseRef = useRef<Phase>("loading");
  const examRef = useRef(exam);
  const answersRef = useRef(answers);
  const strikesRef = useRef(0);
  const lastStrikeRef = useRef(0);
  const submittingRef = useRef(false);
  const voidingRef = useRef(false);

  examRef.current = exam;
  answersRef.current = answers;

  const setPhaseSafe = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const exitFullscreen = useCallback(() => {
    if (typeof document !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const courseTitle = pick(course.title, "en");

  // ── Void (3rd strike / voluntary abandon) ──
  const voidExam = useCallback(async () => {
    if (voidingRef.current) return;
    voidingRef.current = true;
    try {
      const examId = examRef.current?.examId;
      if (examId) await post("/api/academy/exam/void", { examId, reason: "blur-strikeout" });
    } catch {
      /* voiding is best-effort; the server also expires stale exams */
    } finally {
      exitFullscreen();
      setPhaseSafe("voided");
      onFinished(false);
      voidingRef.current = false;
    }
  }, [exitFullscreen, onFinished, setPhaseSafe]);

  // ── Strikes ──
  const addStrike = useCallback(() => {
    if (phaseRef.current !== "active") return;
    const now = Date.now();
    if (now - lastStrikeRef.current < 1200) return; // debounce double-fire (blur + visibilitychange)
    lastStrikeRef.current = now;
    strikesRef.current += 1;
    setStrikes(strikesRef.current);
    if (strikesRef.current >= MAX_STRIKES) {
      void voidExam();
    } else {
      toast.warning(t("academy.exam.strikeWarn", { n: strikesRef.current }));
    }
  }, [t, voidExam]);

  // ── Submit / grade ──
  const submit = useCallback(async () => {
    if (phaseRef.current !== "active" || !examRef.current || submittingRef.current) return;
    submittingRef.current = true;
    setPhaseSafe("grading");
    try {
      const res = await post<SubmitResult>("/api/academy/exam", {
        examId: examRef.current.examId,
        answers: answersRef.current,
      });
      exitFullscreen();
      if (res.expired) {
        setPhaseSafe("expired");
        onFinished(false);
      } else if (res.voided) {
        setPhaseSafe("voided");
        onFinished(false);
      } else {
        setResult(res);
        setPhaseSafe("result");
        onFinished(res.passed);
        if (res.passed && res.certificate) {
          setCertDialog({
            courseTitle,
            recipient: userName,
            code: res.certificate.code,
            issuedAt: new Date(res.certificate.createdAt).toLocaleDateString(),
            emoji: course.emoji,
            variant: "license",
          });
        }
      }
    } catch (e) {
      // network hiccup — exam is still ACTIVE server-side, let them retry
      toast.error(e instanceof Error ? e.message : t("common.error"));
      setPhaseSafe("active");
    } finally {
      submittingRef.current = false;
    }
  }, [course.emoji, courseTitle, exitFullscreen, onFinished, setPhaseSafe, t, userName]);

  const submitRef = useRef(submit);
  submitRef.current = submit;

  // ── Load exam (eligibility gate + create/resume) ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await get<ExamStart>(`/api/academy/exam?course=${encodeURIComponent(course.id)}`);
        if (cancelled) return;
        if ("examId" in res) {
          setExam({ examId: res.examId, attemptNo: res.attemptNo, expiresAt: res.expiresAt, questions: res.questions });
          setPhaseSafe("active");
          // enter secure fullscreen (needs user gesture — we're right after the CTA click)
          document.documentElement.requestFullscreen?.().catch(() => {});
          return;
        }
        if ("locked" in res && res.locked) {
          toast.info(t("academy.exam.locked", { done: res.completed, total: res.total }));
          onClose();
          return;
        }
        if ("blocked" in res && res.blocked) {
          toast.info(t("academy.exam.blocked"));
          onClose();
          return;
        }
        // alreadyPassed
        toast.success(t("academy.exam.passTitle"));
        onFinished(true);
        onClose();
      } catch (e) {
        if (cancelled) return;
        toast.error(e instanceof Error ? e.message : t("common.error"));
        onClose();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Anti-cheat watchdog (active phase only) ──
  useEffect(() => {
    if (phase !== "active") return;
    const onVisibility = () => {
      if (document.hidden) addStrike();
    };
    const onBlur = () => addStrike();
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      addStrike();
    };
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) addStrike();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCopy);
    document.addEventListener("paste", onCopy);
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCopy);
      document.removeEventListener("paste", onCopy);
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [phase, addStrike]);

  // ── Countdown synced to the server's expiresAt ──
  useEffect(() => {
    if (phase !== "active" || !exam) return;
    const end = new Date(exam.expiresAt).getTime();
    const tick = () => {
      const left = end - Date.now();
      setTimeLeft(Math.max(0, left));
      if (left <= 0) void submitRef.current(); // auto-submit current answers
    };
    tick();
    const iv = setInterval(tick, 500);
    return () => clearInterval(iv);
  }, [phase, exam]);

  // ── Cleanup fullscreen on unmount ──
  useEffect(() => () => exitFullscreen(), [exitFullscreen]);

  const questions = exam?.questions ?? [];
  const question = questions[qIdx];
  const answeredCount = Object.keys(answers).length;
  const total = questions.length;
  const isLast = qIdx === total - 1;
  const danger = timeLeft > 0 && timeLeft < 120_000;

  const wrongMap = useMemo(() => {
    const m = new Map<string, WrongItem>();
    for (const w of result?.wrong ?? []) m.set(w.qid, w);
    return m;
  }, [result]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070b14] academy-scroll select-none" dir="auto">
      {/* aurora bg */}
      <div aria-hidden="true" className="pointer-events-none fixed -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none fixed -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-500/[0.07] blur-3xl" />

      <AnimatePresence mode="wait" initial={false}>
        {/* ── ACTIVE EXAM ── */}
        {phase === "active" && exam && question && (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-5 sm:px-6"
          >
            {/* top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/10 ring-1 ring-inset ring-emerald-400/25" aria-hidden="true">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-300" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{courseTitle}</p>
                  <p className="text-[11px] text-muted-foreground">{t("academy.exam.attemptLabel", { n: exam.attemptNo })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* strikes */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ring-1 ring-inset",
                    strikes === 0 ? "bg-white/[0.04] text-muted-foreground ring-white/10" : "bg-amber-500/10 text-amber-300 ring-amber-400/30",
                  )}
                  role="status"
                  aria-label={t("academy.exam.strikeWarn", { n: strikes })}
                >
                  {Array.from({ length: MAX_STRIKES }, (_, i) => (
                    <AlertTriangle key={i} className={cn("h-3.5 w-3.5", i < strikes ? "text-amber-300" : "text-white/15")} aria-hidden="true" />
                  ))}
                </span>
                {/* timer */}
                <span
                  className={cn(
                    "inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 font-mono text-sm font-bold tabular-nums ring-1 ring-inset",
                    danger ? "animate-pulse bg-rose-500/10 text-rose-300 ring-rose-400/30" : "bg-cyan-500/10 text-cyan-300 ring-cyan-400/25",
                  )}
                  role="timer"
                  aria-label={t("academy.exam.timer")}
                >
                  <Timer className="h-4 w-4" aria-hidden="true" />
                  {fmtTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* strike warning banner */}
            <AnimatePresence>
              {strikes > 0 && (
                <motion.div
                  key="warn"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="mt-4 flex items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/[0.07] px-3.5 py-2.5 text-sm text-amber-200"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t("academy.exam.strikeWarn", { n: strikes })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* progress dots */}
            <div className="mt-5 flex items-center gap-2" role="group" aria-label={t("academy.exam.qOf", { current: qIdx + 1, total })}>
              {questions.map((q, i) => {
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => setQIdx(i)}
                    aria-label={t("academy.exam.qOf", { current: i + 1, total })}
                    aria-current={i === qIdx ? "step" : undefined}
                    className={cn(
                      "h-2 rounded-full transition-all focus-glow",
                      i === qIdx ? "w-7 bg-cyan-400" : isAnswered ? "w-2 bg-emerald-400/60 hover:bg-emerald-400" : "w-2 bg-white/15 hover:bg-white/30",
                    )}
                  />
                );
              })}
              <span className="ms-1 text-[11px] tabular-nums text-muted-foreground">{answeredCount}/{total}</span>
            </div>

            {/* question card */}
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="mt-5 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300/80">
                {t("academy.exam.qOf", { current: qIdx + 1, total })}
              </p>
              <h2 dir="auto" className="mt-3 whitespace-pre-line text-lg font-semibold leading-7 text-white sm:text-xl">
                {question.q}
              </h2>
              <div className="mt-5 grid gap-2.5">
                {question.options.map((opt, oi) => {
                  const chosen = answers[question.id] === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => setAnswers((a) => ({ ...a, [question.id]: oi }))}
                      aria-pressed={chosen}
                      className={cn(
                        "group flex min-h-[48px] items-center gap-3 rounded-xl border px-4 py-3 text-start text-sm transition focus-glow",
                        chosen
                          ? "border-cyan-400/50 bg-cyan-500/[0.12] text-white ring-1 ring-inset ring-cyan-400/30"
                          : "border-white/10 bg-white/[0.02] text-slate-200 hover:border-cyan-400/30 hover:bg-cyan-500/[0.06]",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-bold",
                          chosen ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-200" : "border-white/15 text-slate-400",
                        )}
                        aria-hidden="true"
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span dir="auto">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* footer nav */}
            <div className="sticky bottom-0 mt-5 bg-gradient-to-t from-[#070b14] via-[#070b14]/95 to-transparent pb-4 pt-3">
              <div className="flex items-center justify-between gap-3">
                <p className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("academy.exam.focusMode")}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setClosingVoid(true)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-muted-foreground transition hover:text-rose-300 focus-glow"
                  >
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                    {t("academy.exam.voidAction")}
                  </button>
                  {isLast ? (
                    <button
                      onClick={() => setConfirming(true)}
                      className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 text-sm font-semibold focus-glow"
                    >
                      {t("academy.exam.submit")}
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setQIdx((i) => Math.min(total - 1, i + 1))}
                      className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
                    >
                      {t("academy.next")}
                      <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── GRADING ── */}
        {phase === "grading" && (
          <motion.div key="grading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid min-h-full place-items-center px-6">
            <div className="text-center" role="status">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                className="mx-auto h-10 w-10 rounded-full border-2 border-cyan-400/25 border-t-cyan-300"
                aria-hidden="true"
              />
              <p className="mt-4 text-sm font-medium text-muted-foreground">{t("academy.exam.grading")}</p>
            </div>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {phase === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative mx-auto w-full max-w-3xl px-4 py-10 sm:px-6"
          >
            {result.passed && <Confetti trigger={1} count={56} />}
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl border p-6 text-center sm:p-10",
                result.passed ? "border-emerald-400/30 bg-gradient-to-b from-emerald-500/[0.1] to-transparent" : "border-rose-400/25 bg-gradient-to-b from-rose-500/[0.08] to-transparent",
              )}
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                className={cn(
                  "mx-auto grid h-20 w-20 place-items-center rounded-full ring-1 ring-inset",
                  result.passed ? "bg-emerald-500/15 ring-emerald-400/40" : "bg-rose-500/10 ring-rose-400/30",
                )}
                aria-hidden="true"
              >
                {result.passed ? <ShieldCheck className="h-10 w-10 text-emerald-300" /> : <XCircle className="h-10 w-10 text-rose-300" />}
              </motion.div>
              <h2 className={cn("mt-5 text-2xl font-black tracking-tight sm:text-3xl", result.passed ? "text-emerald-200" : "text-rose-200")}>
                {result.passed ? t("academy.exam.passTitle") : t("academy.exam.failTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {result.passed ? t("academy.exam.passBody") : t("academy.exam.failBody")}
              </p>
              <div className="mt-6 flex items-center justify-center gap-8">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{t("academy.exam.score")}</p>
                  <p className={cn("text-4xl font-black tabular-nums", result.passed ? "text-emerald-300" : "text-rose-300")}>{result.score}%</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{t("academy.exam.attemptsLeft", { n: result.attemptsLeft })}</p>
                  <p className="text-4xl font-black tabular-nums text-white">{result.attemptsLeft}</p>
                </div>
              </div>
            </div>

            {/* review */}
            {wrongMap.size > 0 && (
              <div className="mt-6">
                <h3 className="text-base font-semibold text-white">{t("academy.exam.reviewTitle")}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{t("academy.exam.reviewHint")}</p>
                <ul className="mt-3 max-h-96 space-y-3 overflow-y-auto pe-1 academy-scroll">
                  {result.wrong.map((w, i) => {
                    const q = questions.find((x) => x.id === w.qid);
                    if (!q) return null;
                    const chosen = answers[w.qid];
                    return (
                      <motion.li
                        key={w.qid}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.3, ease: EASE }}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                      >
                        <p dir="auto" className="whitespace-pre-line text-sm font-medium text-slate-100">{q.q}</p>
                        <div className="mt-2.5 space-y-1.5 text-[13px]">
                          {chosen !== undefined && (
                            <p dir="auto" className="text-rose-200/90">
                              <span className="font-semibold">{t("academy.exam.yourAnswer")}:</span> {q.options[chosen]}
                            </p>
                          )}
                          <p dir="auto" className="text-emerald-200/90">
                            <span className="font-semibold">{t("academy.exam.correctAnswer")}:</span> {q.options[w.correctIndex]}
                          </p>
                          <p dir="auto" className="text-muted-foreground">💡 {w.why}</p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button onClick={onClose} className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 text-sm font-semibold focus-glow">
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                {t("academy.exam.backToCourse")}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── VOIDED / EXPIRED ── */}
        {(phase === "voided" || phase === "expired") && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="grid min-h-full place-items-center px-6 py-10"
          >
            <div className="w-full max-w-md rounded-3xl border border-amber-400/25 bg-gradient-to-b from-amber-500/[0.08] to-transparent p-8 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-amber-500/10 ring-1 ring-inset ring-amber-400/30" aria-hidden="true">
                {phase === "voided" ? <ShieldAlert className="h-10 w-10 text-amber-300" /> : <Timer className="h-10 w-10 text-amber-300" />}
              </div>
              <h2 className="mt-5 text-2xl font-black text-amber-200">
                {phase === "voided" ? t("academy.exam.voided") : t("academy.exam.expired")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {phase === "voided" ? t("academy.exam.voidedBody") : t("academy.exam.expiredBody")}
              </p>
              <button onClick={onClose} className="btn-hero mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 text-sm font-semibold focus-glow">
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                {t("academy.exam.backToCourse")}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── LOADING ── */}
        {phase === "loading" && (
          <div key="loading" className="grid min-h-full place-items-center" role="status">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
              className="h-10 w-10 rounded-full border-2 border-cyan-400/25 border-t-cyan-300"
              aria-hidden="true"
            />
          </div>
        )}
      </AnimatePresence>

      {/* submit confirmation */}
      <AnimatePresence>
        {confirming && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={t("academy.exam.confirmSubmit")}
            onClick={() => setConfirming(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#0d1526] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm font-medium leading-6 text-white">{t("academy.exam.confirmSubmit")}</p>
              <p className="mt-2 text-xs tabular-nums text-muted-foreground">{answeredCount}/{total}</p>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setConfirming(false)} className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-glow">
                  {t("academy.exam.confirmNo")}
                </button>
                <button
                  onClick={() => {
                    setConfirming(false);
                    void submit();
                  }}
                  className="btn-hero inline-flex min-h-[44px] items-center rounded-xl px-4 text-sm font-semibold focus-glow"
                >
                  {t("academy.exam.confirmYes")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* voluntary abandon confirmation */}
      <AnimatePresence>
        {closingVoid && (
          <motion.div
            key="voidconfirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={t("academy.exam.voided")}
            onClick={() => setClosingVoid(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="w-full max-w-sm rounded-2xl border border-amber-400/25 bg-[#0d1526] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm font-medium leading-6 text-white">{t("academy.exam.confirmSubmit")}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{t("academy.exam.voidedBody")}</p>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setClosingVoid(false)} className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-glow">
                  {t("academy.exam.confirmNo")}
                </button>
                <button
                  onClick={() => {
                    setClosingVoid(false);
                    void voidExam();
                  }}
                  className="inline-flex min-h-[44px] items-center rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 focus-glow"
                >
                  {t("academy.exam.confirmYes")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* official license reveal */}
      <CertificateDialog cert={certDialog} course={course} open={!!certDialog} onClose={() => setCertDialog(null)} t={t} />
    </div>
  );
}
