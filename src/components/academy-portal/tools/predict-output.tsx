"use client";

// TEKA NEXUS — Academy portal tool 3/4: Predict the Output (§6 mode).
// Zero faked grading: Python ground truth is computed on the fly by running
// the reference snippet through pylite; HTML ground truth by rendering the
// snippet in a hidden sandboxed iframe and reading the real DOM.
// Options are shuffled deterministically at module scope (stable per session).

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  ChevronDown,
  FlaskConical,
  Globe,
  Flame,
  RotateCcw,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/store";
import { EASE } from "@/components/shared/motion";
import { CodeBlock } from "@/components/academy/code-editor";
import { normalizeOut } from "@/components/academy/py-runner";
import { PreviewFrame } from "@/components/academy/html-runner";
import { runPython } from "@/lib/academy/pylite";
import { pick } from "@/lib/academy/types";

import { TOOLS_DICT } from "./tools-dict";
import { PREDICT_QUESTIONS, type PredictQ } from "./tools-data";
import { ToolHeader, hashSeed, seededShuffle } from "./tool-shared";

// deterministic option order (module scope → same for the whole session)
const QUESTIONS: PredictQ[] = PREDICT_QUESTIONS.map((q) =>
  q.options ? { ...q, options: seededShuffle(q.options, hashSeed(q.id)) } : q,
);

function normalizeWs(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

type Verdict = {
  correct: boolean;
  /** Ground-truth lines: pylite stdout, or the DOM-derived value. */
  truth: string[];
  viaDom: boolean;
  error?: string;
};

function OptionBox({
  selected,
  onSelect,
  children,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={label}
      className={cn(
        "w-full rounded-xl border p-3 text-start transition focus-glow",
        selected
          ? "border-cyan-400/50 bg-cyan-500/[0.08] ring-1 ring-inset ring-cyan-400/40"
          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]",
      )}
    >
      {children}
    </motion.button>
  );
}

export function PredictOutput() {
  const locale = useI18n((s) => s.locale);
  const d = TOOLS_DICT[locale];

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"answering" | "result" | "done">("answering");
  const [choice, setChoice] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [checking, setChecking] = useState(false);
  const [score, setScore] = useState({ correct: 0, answered: 0 });
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  // hidden sandbox iframe for HTML ground truth
  const truthRef = useRef<HTMLIFrameElement>(null);
  const htmlSrcRef = useRef("");
  const pendingRef = useRef(false);
  const [htmlSrc, setHtmlSrc] = useState("");

  const q = QUESTIONS[index]!;
  const total = QUESTIONS.length;
  const isLast = index === total - 1;

  const finish = useCallback(
    (lines: string[], viaDom: boolean, error?: string) => {
      const answer = q.mode === "typed" ? typed : (choice ?? "");
      const correct =
        error === undefined && normalizeOut(answer) === normalizeOut(lines.join("\n"));
      setVerdict({ correct, truth: lines, viaDom, error });
      setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), answered: s.answered + 1 }));
      setStreak((st) => {
        const next = correct ? st + 1 : 0;
        setBest((b) => Math.max(b, next));
        return next;
      });
      setChecking(false);
      setPhase("result");
    },
    [q.mode, typed, choice],
  );

  const check = () => {
    if (checking) return;
    if (q.mode === "choice" && choice === null) return;
    if (q.mode === "typed" && typed.trim() === "") return;
    setChecking(true);
    setVerdict(null);

    if (q.language === "python") {
      // real execution, on the fly — never a hardcoded answer
      setTimeout(() => {
        const r = runPython(q.code, q.stdin ?? []);
        if (r.ok) finish(r.output, false);
        else finish([], false, r.error);
      }, 30);
      return;
    }

    // HTML: render in the hidden sandbox, then read the real DOM
    const dom = q.dom!;
    if (htmlSrcRef.current === q.code) {
      const doc = truthRef.current?.contentDocument;
      if (doc) {
        const value =
          dom.kind === "count"
            ? String(doc.querySelectorAll(dom.selector).length)
            : normalizeWs(doc.body?.textContent ?? "");
        finish([value], true);
        return;
      }
    }
    pendingRef.current = true;
    htmlSrcRef.current = q.code;
    setHtmlSrc(q.code);
  };

  const onTruthLoad = () => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    setTimeout(() => {
      const doc = truthRef.current?.contentDocument;
      const dom = q.dom;
      if (!doc || !dom) {
        finish([], true, "sandbox failed");
        return;
      }
      const value =
        dom.kind === "count"
          ? String(doc.querySelectorAll(dom.selector).length)
          : normalizeWs(doc.body?.textContent ?? "");
      finish([value], true);
    }, 60);
  };

  const next = () => {
    if (isLast) {
      setPhase("done");
      return;
    }
    setIndex((i) => i + 1);
    setChoice(null);
    setTyped("");
    setVerdict(null);
    setPhase("answering");
  };

  const restart = () => {
    setIndex(0);
    setChoice(null);
    setTyped("");
    setVerdict(null);
    setScore({ correct: 0, answered: 0 });
    setStreak(0);
    setPhase("answering");
  };

  const stats = (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 ring-1 ring-inset ring-white/10">
        {d.predict.scoreLabel}: {score.correct}/{score.answered}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset",
          streak > 0
            ? "bg-amber-500/10 text-amber-300 ring-amber-400/30"
            : "bg-white/[0.04] text-slate-300 ring-white/10",
        )}
      >
        <Flame className="h-3.5 w-3.5" aria-hidden="true" />
        {d.predict.streakLabel}: {streak}
      </span>
      <span className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 ring-1 ring-inset ring-white/10">
        {d.predict.bestLabel}: {best}
      </span>
    </div>
  );

  return (
    <div className="space-y-4">
      <ToolHeader
        icon={Brain}
        title={d.predict.title}
        subtitle={d.predict.subtitle}
        iconClass="text-violet-300"
        right={
          phase === "done" ? (
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-muted-foreground transition hover:text-foreground focus-glow"
            >
              <RotateCcw className="h-4 w-4" />
              {d.predict.restart}
            </button>
          ) : (
            stats
          )
        }
      />

      <AnimatePresence mode="wait">
        {phase === "done" ? (
          <motion.section
            key="done"
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="glass-card p-6 text-center sm:p-8"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-500/25 ring-1 ring-inset ring-white/10">
              <FlaskConical className="h-7 w-7 text-violet-200" aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-xl font-bold">{d.predict.doneTitle}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {score.correct === total
                ? d.predict.donePerfect.replace(/\{total\}/g, String(total))
                : d.predict.doneBody.replace("{correct}", String(score.correct)).replace("{total}", String(total))}
            </p>
            <div className="mt-4 flex justify-center">{stats}</div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={restart}
              className="btn-hero mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 text-sm font-semibold focus-glow"
            >
              <RotateCcw className="h-4 w-4" />
              {d.predict.restart}
            </motion.button>
          </motion.section>
        ) : (
          <motion.section
            key={q.id}
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.14, ease: "easeIn" } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="glass-card p-4 sm:p-6"
          >
            {/* progress */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {d.predict.qOf.replace("{current}", String(index + 1)).replace("{total}", String(total))}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-inset ring-white/10">
                {q.language === "python" ? <Brain className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" /> : <Globe className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />}
                {q.language === "python" ? "Python" : "HTML"}
              </span>
            </div>
            <div
              className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]"
              role="progressbar"
              aria-valuenow={index + 1}
              aria-valuemin={1}
              aria-valuemax={total}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-500"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>

            <h3 dir="auto" className="mt-4 font-display text-base font-bold sm:text-lg">
              {pick(q.prompt, locale)}
            </h3>

            {/* the snippet — read-only, never runnable here */}
            <div className="mt-3">
              <CodeBlock code={q.code} lang={q.language} />
            </div>

            {/* answer input */}
            {phase === "answering" && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {q.mode === "choice" ? d.predict.pickPrompt : d.predict.typePrompt}
                </p>
                {q.mode === "choice" ? (
                  <div className="grid gap-2 sm:grid-cols-3" role="group">
                    {(q.options ?? []).map((opt) => (
                      <OptionBox
                        key={opt.value}
                        selected={choice === opt.value}
                        onSelect={() => setChoice(opt.value)}
                        label={opt.label ? pick(opt.label, locale) : undefined}
                      >
                        {opt.label ? (
                          <span dir="auto" className="block text-sm font-medium text-slate-200">
                            {pick(opt.label, locale)}
                          </span>
                        ) : (
                          <pre dir="ltr" className="whitespace-pre-wrap break-words font-mono text-[12.5px] leading-6 text-slate-200">
                            {opt.value}
                          </pre>
                        )}
                      </OptionBox>
                    ))}
                  </div>
                ) : (
                  <textarea
                    dir="ltr"
                    rows={Math.min(Math.max(q.code.split("\n").length - 1, 3), 8)}
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    placeholder={d.predict.typedPlaceholder}
                    aria-label={d.predict.typePrompt}
                    spellCheck={false}
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 font-mono text-[13px] leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-400/40"
                  />
                )}
              </div>
            )}

            {/* verdict — computed from the REAL run / REAL DOM */}
            <AnimatePresence>
              {phase === "result" && verdict && (
                <motion.div
                  key="verdict"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-4 space-y-3"
                >
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3",
                      verdict.correct
                        ? "border-emerald-400/30 bg-emerald-500/10"
                        : "border-rose-400/25 bg-rose-500/[0.07]",
                    )}
                  >
                    {verdict.correct ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-rose-300" aria-hidden="true" />
                    )}
                    <p className={cn("text-sm font-bold", verdict.correct ? "text-emerald-200" : "text-rose-200")}>
                      {verdict.correct ? d.predict.correct : d.predict.incorrect}
                    </p>
                  </div>

                  {/* ground truth */}
                  <div className="rounded-xl border border-white/10 bg-[#0b1220] p-3" dir="ltr">
                    <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <FlaskConical className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                      {verdict.viaDom ? d.predict.realDom : d.predict.realOutput}
                    </p>
                    {verdict.error ? (
                      <p className="flex items-start gap-2 font-mono text-[13px] leading-6 text-rose-300">
                        <AlertTriangle className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {verdict.error}
                      </p>
                    ) : (
                      verdict.truth.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-emerald-200">
                          {line === "" ? "\u00A0" : line}
                        </div>
                      ))
                    )}
                  </div>

                  {/* your answer (typed mode) */}
                  {q.mode === "typed" && (
                    <div className="rounded-xl border border-white/10 bg-[#0b1220] p-3" dir="ltr">
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {d.predict.yourAnswer}
                      </p>
                      {typed === "" ? (
                        <p className="font-mono text-[13px] text-slate-600">—</p>
                      ) : (
                        typed.split("\n").map((line, i) => (
                          <div key={i} className="whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-slate-300">
                            {line === "" ? "\u00A0" : line}
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* why */}
                  <div className="rounded-xl border border-violet-400/20 bg-violet-500/[0.06] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-300/80">{d.predict.why}</p>
                    <p dir="auto" className="mt-1 text-sm leading-6 text-slate-200">
                      {pick(q.explain, locale)}
                    </p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={next}
                    className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
                  >
                    {isLast ? d.predict.doneTitle : d.predict.next}
                    <ChevronDown className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* check button */}
            {phase === "answering" && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={check}
                disabled={
                  checking ||
                  (q.mode === "choice" ? choice === null : typed.trim() === "")
                }
                className="btn-hero mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold disabled:opacity-60 focus-glow"
              >
                {checking ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                ) : (
                  <FlaskConical className="h-4 w-4" aria-hidden="true" />
                )}
                {checking ? d.predict.checking : d.predict.check}
              </motion.button>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* hidden sandbox: the browser's real parser is the judge for HTML */}
      <div aria-hidden="true" className="pointer-events-none fixed bottom-0 start-0 h-px w-px overflow-hidden opacity-0">
        <PreviewFrame code={htmlSrc} title="predict-truth-sandbox" onLoad={onTruthLoad} iframeRef={truthRef} />
      </div>
    </div>
  );
}
