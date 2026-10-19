"use client";

// TEKA NEXUS — TEKA Academy Python runners.
// Three surfaces share one engine (pylite):
//   PyInline     — read-only theory snippet with a Run button
//   PyPlayground — free editor + input box + output (persisted to localStorage)
//   PyChallenge  — editor + auto-graded tests + hints + solution reveal

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ChevronDown, Play, RotateCcw, Terminal, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/store";
import { EASE } from "@/components/shared/motion";
import { CodeEditor, CodeBlock } from "@/components/academy/code-editor";
import { runPython } from "@/lib/academy/pylite";
import { pick, type L, type PyTest } from "@/lib/academy/types";
import type { TFunc } from "@/lib/i18n";

function useLocale(): string {
  return useI18n((s) => s.locale);
}

function toStdinLines(stdin?: string): string[] {
  if (!stdin) return [];
  const lines = stdin.split("\n");
  if (lines.length && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

export function normalizeOut(s: string): string {
  return s
    .split("\n")
    .map((l) => l.replace(/\s+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "");
}

// ─── Output console ──────────────────────────────────────────

export function OutputConsole({
  lines,
  error,
  className,
  label,
}: {
  lines: string[] | null;
  error?: string;
  className?: string;
  label?: string;
}) {
  if (lines === null && !error) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn("overflow-hidden rounded-xl border border-white/10 bg-[#0b1220]", className)}
      dir="ltr"
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
        <Terminal className="h-3.5 w-3.5" />
        {label ?? "Output"}
      </div>
      <div className="max-h-64 overflow-y-auto px-3 py-2.5 font-mono text-[13px] leading-6 academy-scroll">
        {error ? (
          <p className="flex items-start gap-2 text-rose-300">
            <AlertTriangle className="mt-1 h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        ) : lines && lines.length ? (
          lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap break-words text-slate-200">
              {l === "" ? "\u00A0" : l}
            </div>
          ))
        ) : (
          <p className="text-slate-500">(no output)</p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Inline theory runner ────────────────────────────────────

export function PyInline({ code, caption }: { code: string; caption?: L }) {
  const locale = useLocale();
  const [result, setResult] = useState<{ lines: string[] | null; error?: string } | null>(null);

  const run = () => {
    const r = runPython(code, []);
    setResult(r.ok ? { lines: r.output } : { lines: [], error: r.error });
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <CodeBlock code={code} lang="python" />
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={run}
          className="absolute end-2 top-2 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30 backdrop-blur transition hover:bg-emerald-500/25 focus-glow"
        >
          <Play className="h-3.5 w-3.5" />
          Run
        </motion.button>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div key="out" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: EASE }}>
            <OutputConsole lines={result.lines} error={result.error} />
          </motion.div>
        )}
      </AnimatePresence>
      {caption && <p className="text-xs text-muted-foreground">{pick(caption, locale)}</p>}
    </div>
  );
}

// ─── Free playground ─────────────────────────────────────────

export function PyPlayground({
  initialCode,
  storageKey,
  t,
}: {
  initialCode: string;
  storageKey?: string;
  t: TFunc;
}) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState("");
  const [result, setResult] = useState<{ lines: string[] | null; error?: string } | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!storageKey) return;
    const id = setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) setCode(saved);
      } catch { /* private mode */ }
    }, 0);
    return () => clearTimeout(id);
  }, [storageKey]);

  const persist = useCallback(
    (v: string) => {
      setCode(v);
      if (storageKey) {
        try { localStorage.setItem(storageKey, v); } catch { /* ignore */ }
      }
    },
    [storageKey],
  );

  const run = () => {
    setRunning(true);
    // let the button paint its running state
    setTimeout(() => {
      const r = runPython(code, toStdinLines(stdin));
      setResult(r.ok ? { lines: r.output } : { lines: [], error: r.error });
      setRunning(false);
    }, 30);
  };

  const reset = () => persist(initialCode);

  return (
    <div className="space-y-3">
      <CodeEditor value={code} onChange={persist} lang="python" ariaLabel={t("academy.playgroundTitle")} minRows={10} />
      {/* stacked: the lesson column is narrow even on wide screens — two columns squeeze the controls */}
      <div className="grid gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground" htmlFor="py-stdin">
            {t("academy.inputLabel")}
          </label>
          <textarea
            id="py-stdin"
            dir="ltr"
            rows={3}
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder={"sara\n19"}
            className="w-full resize-y rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 font-mono text-[13px] text-slate-200 outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-400/40"
          />
          <p className="text-[11px] text-muted-foreground">{t("academy.inputHint")}</p>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={run}
              disabled={running}
              className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold disabled:opacity-60 focus-glow"
            >
              <Play className="h-4 w-4" />
              {running ? t("academy.running") : t("academy.run")}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={reset}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-muted-foreground transition hover:text-foreground focus-glow"
            >
              <RotateCcw className="h-4 w-4" />
              {t("academy.resetCode")}
            </motion.button>
          </div>
          <p className="text-[11px] text-muted-foreground">{t("academy.playgroundHint")}</p>
        </div>
      </div>
      <OutputConsole lines={result?.lines ?? null} error={result?.error} />
    </div>
  );
}

// ─── Challenge runner ────────────────────────────────────────

export function PyChallenge({
  starter,
  solution,
  tests,
  sample,
  hints,
  locale,
  t,
  passed,
  onPassed,
}: {
  starter: string;
  solution: string;
  tests: PyTest[];
  sample?: { stdin?: string; expect: string };
  hints: L[];
  locale: string;
  t: TFunc;
  passed: boolean;
  onPassed: () => void;
}) {
  const [code, setCode] = useState(starter);
  const [stdin, setStdin] = useState(sample?.stdin ?? "");
  const [result, setResult] = useState<{ lines: string[] | null; error?: string } | null>(null);
  const [grading, setGrading] = useState(false);
  const [fail, setFail] = useState<{ expected: string; got: string } | null>(null);
  const [hintCount, setHintCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const run = () => {
    const r = runPython(code, toStdinLines(stdin));
    setResult(r.ok ? { lines: r.output } : { lines: [], error: r.error });
  };

  const grade = () => {
    setGrading(true);
    setTimeout(() => {
      for (const test of tests) {
        const r = runPython(code, toStdinLines(test.stdin));
        const got = r.ok ? normalizeOut(r.output.join("\n")) : `Error: ${r.error}`;
        if (!r.ok || got !== normalizeOut(test.expect)) {
          setFail({ expected: test.expect, got });
          setResult(null);
          setGrading(false);
          return;
        }
      }
      setFail(null);
      setGrading(false);
      onPassed();
    }, 30);
  };

  const firstRun = useMemo(() => !passed, [passed]);

  return (
    <div className="space-y-3">
      <CodeEditor value={code} onChange={setCode} lang="python" ariaLabel={t("academy.challengeLabel")} minRows={9} />

      {/* stacked: the lesson column is narrow even on wide screens — two columns squeeze the controls */}
      <div className="grid gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground" htmlFor="py-ch-stdin">
            {t("academy.inputLabel")}
          </label>
          <textarea
            id="py-ch-stdin"
            dir="ltr"
            rows={3}
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className="w-full resize-y rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 font-mono text-[13px] text-slate-200 outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-400/40"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <motion.button whileTap={{ scale: 0.96 }} onClick={run} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-foreground transition hover:bg-white/[0.08] focus-glow">
            <Play className="h-4 w-4 text-emerald-300" />
            {t("academy.run")}
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={grade} disabled={grading} className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold disabled:opacity-60 focus-glow">
            {grading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <CheckCircle2 className="h-4 w-4" />}
            {grading ? t("academy.checking") : t("academy.checkSolution")}
          </motion.button>
          {firstRun && sample && (
            <button
              onClick={() => setStdin(sample.stdin ?? "")}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-xs text-muted-foreground transition hover:text-foreground focus-glow"
            >
              <ChevronDown className="h-3.5 w-3.5" />
              {t("academy.sampleInput")}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {passed ? (
          <motion.div
            key="passed"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500/20">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-200">{t("academy.passed")}</p>
            </div>
          </motion.div>
        ) : fail ? (
          <motion.div key="fail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="space-y-2 rounded-xl border border-rose-400/25 bg-rose-500/[0.07] p-3">
            <p className="flex items-center gap-2 text-sm font-medium text-rose-200">
              <XCircle className="h-4 w-4" />
              {t("academy.notYet")}
            </p>
            <p className="text-xs text-rose-300/70">{t("academy.notYetHint")}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{t("academy.expectedOutput")}</p>
                <pre dir="ltr" className="max-h-40 overflow-auto rounded-lg bg-[#0b1220] p-2.5 font-mono text-xs text-emerald-200 academy-scroll">{fail.expected}</pre>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{t("academy.yourOutput")}</p>
                <pre dir="ltr" className="max-h-40 overflow-auto rounded-lg bg-[#0b1220] p-2.5 font-mono text-xs text-rose-200 academy-scroll">{fail.got}</pre>
              </div>
            </div>
          </motion.div>
        ) : result ? (
          <motion.div key="run" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <OutputConsole lines={result.lines} error={result.error} label={t("academy.output")} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* progressive hints */}
      {hintCount < hints.length && !passed && (
        <button
          onClick={() => setHintCount((n) => n + 1)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/[0.08] px-4 text-sm font-medium text-amber-200 transition hover:bg-amber-500/[0.14] focus-glow"
        >
          <ChevronDown className="h-4 w-4" />
          {t("academy.hintReveal", { n: hintCount + 1, total: hints.length })}
        </button>
      )}
      <AnimatePresence>
        {hintCount > 0 && (
          <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
            {hints.slice(0, hintCount).map((h, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex gap-2.5 rounded-xl border border-amber-400/15 bg-amber-500/[0.05] px-3.5 py-2.5 text-sm text-amber-100/90">
                <span aria-hidden="true">💡</span>
                <span dir="auto">{pick(h, locale)}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* solution reveal */}
      <div>
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="text-xs text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline focus-glow"
        >
          {showSolution ? t("academy.hideSolution") : t("academy.showSolution")}
        </button>
        <AnimatePresence>
          {showSolution && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden pt-2">
              <CodeBlock code={solution} lang="python" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
