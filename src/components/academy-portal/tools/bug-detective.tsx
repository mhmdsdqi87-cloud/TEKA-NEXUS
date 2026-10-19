"use client";

// TEKA NEXUS — Academy portal tool 1/4: Bug Detective (§7D).
// Curated case files: read the symptom, study the code, fix it FOR REAL —
// Python fixes are graded by actually running pylite against the target
// output; HTML fixes by querying the live sandboxed iframe's DOM.
// Solved state (and drafts/hints) persist in localStorage "teka.tools.bugs.v1".

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bug,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  FileCode2,
  Globe,
  Lightbulb,
  ListChecks,
  Play,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/store";
import { EASE } from "@/components/shared/motion";
import { CodeEditor, CodeBlock } from "@/components/academy/code-editor";
import { OutputConsole, normalizeOut } from "@/components/academy/py-runner";
import { PreviewFrame } from "@/components/academy/html-runner";
import { runPython } from "@/lib/academy/pylite";
import { pick, type L } from "@/lib/academy/types";

import { TOOLS_DICT } from "./tools-dict";
import { BUG_CASES, type BugCase, type ToolCheck } from "./tools-data";
import { ToolHeader, loadJSON, saveJSON } from "./tool-shared";

const STORE_KEY = "teka.tools.bugs.v1";

type StoreShape = {
  solved: Record<string, true>;
  drafts: Record<string, string>;
  hints: Record<string, number>;
};

const EMPTY_STORE: StoreShape = { solved: {}, drafts: {}, hints: {} };

// ─── HTML DOM checks ─────────────────────────────────────────

type CheckDetail =
  | { kind: "count"; n: number; n2: number }
  | { kind: "attr"; a: string }
  | { kind: "style"; prop: string; got: string }
  | { kind: "text" }
  | { kind: "textGone" };

type CheckOutcome = { label: L; ok: boolean; detail?: CheckDetail };

function runToolChecks(doc: Document, checks: ToolCheck[]): CheckOutcome[] {
  return checks.map((check) => {
    try {
      const els = Array.from(doc.querySelectorAll(check.selector));
      const low = check.count ?? (check.maxCount !== undefined ? 0 : 1);
      const high = check.maxCount ?? Number.POSITIVE_INFINITY;
      if (els.length < low || els.length > high) {
        return { label: check.label, ok: false, detail: { kind: "count", n: els.length, n2: low } };
      }
      if (check.text !== undefined) {
        const needle = check.text.trim().toLowerCase();
        const hit = els.some((el) => (el.textContent ?? "").trim().toLowerCase().includes(needle));
        if (!hit) return { label: check.label, ok: false, detail: { kind: "text" } };
      }
      if (check.textNot !== undefined) {
        const needle = check.textNot.trim().toLowerCase();
        const hit = els.some((el) => (el.textContent ?? "").trim().toLowerCase().includes(needle));
        if (hit) return { label: check.label, ok: false, detail: { kind: "textGone" } };
      }
      if (check.attrName !== undefined) {
        const want = check.attrValue ?? "";
        const hit = els.some((el) => el.getAttribute(check.attrName!) === want);
        if (!hit) return { label: check.label, ok: false, detail: { kind: "attr", a: check.attrName } };
      }
      if (check.style !== undefined) {
        const el = els[0];
        const got = doc.defaultView
          ? doc.defaultView.getComputedStyle(el!).getPropertyValue(check.style.prop).trim()
          : "";
        if (got !== check.style.value) {
          return { label: check.label, ok: false, detail: { kind: "style", prop: check.style.prop, got } };
        }
      }
      return { label: check.label, ok: true };
    } catch {
      return { label: check.label, ok: false, detail: { kind: "count", n: 0, n2: 1 } };
    }
  });
}

// ─── Solved / why / hints — shared case furniture ────────────

function CaseFurniture({
  c,
  solved,
  hintsUsed,
  onHint,
  locale,
}: {
  c: BugCase;
  solved: boolean;
  hintsUsed: number;
  onHint: () => void;
  locale: string;
}) {
  const d = TOOLS_DICT[locale];
  const [showFix, setShowFix] = useState(false);
  return (
    <div className="space-y-3">
      {/* why — only after the case is genuinely solved */}
      <AnimatePresence>
        {solved && (
          <motion.div
            key="solved"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="space-y-3"
          >
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500/20">
                <Sparkles className="h-5 w-5 text-emerald-300" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-emerald-200">{d.bug.caseClosed}</p>
                <p className="text-xs text-emerald-200/70">{d.bug.caseClosedBody.replace("{hints}", String(hintsUsed))}</p>
              </div>
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/[0.06] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300/80">{d.bug.whyTitle}</p>
              <p dir="auto" className="mt-1 text-sm leading-6 text-slate-200">{pick(c.why, locale)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* progressive hints — never auto-expose the full solution */}
      {!solved && (
        <div className="space-y-2">
          {hintsUsed < c.hints.length && (
            <button
              type="button"
              onClick={onHint}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/[0.08] px-4 text-sm font-medium text-amber-200 transition hover:bg-amber-500/[0.14] focus-glow"
            >
              <ChevronDown className="h-4 w-4" />
              {d.bug.hintReveal.replace("{n}", String(hintsUsed + 1)).replace("{total}", String(c.hints.length))}
            </button>
          )}
          <AnimatePresence>
            {hintsUsed > 0 && (
              <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                {c.hints.slice(0, hintsUsed).map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: EASE }}
                    className="flex gap-2.5 rounded-xl border border-amber-400/15 bg-amber-500/[0.05] px-3.5 py-2.5 text-sm text-amber-100/90"
                  >
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    <span dir="auto">{pick(h, locale)}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* corrected code — revealed only on explicit request */}
      <div>
        <button
          type="button"
          onClick={() => setShowFix((s) => !s)}
          className="text-xs text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline focus-glow"
        >
          {showFix ? d.bug.hideFix : d.bug.showFix}
        </button>
        <AnimatePresence>
          {showFix && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden pt-2"
            >
              <p className="mb-1.5 text-[11px] font-medium text-muted-foreground">{d.bug.fixedCodeLabel}</p>
              <CodeBlock code={c.fixedCode} lang={c.language} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Python case ─────────────────────────────────────────────

function PyCase({
  c,
  draft,
  onDraft,
  solved,
  hintsUsed,
  onHint,
  onSolved,
  locale,
}: {
  c: BugCase;
  draft: string;
  onDraft: (v: string) => void;
  solved: boolean;
  hintsUsed: number;
  onHint: () => void;
  onSolved: () => void;
  locale: string;
}) {
  const d = TOOLS_DICT[locale];
  const [result, setResult] = useState<{ lines: string[] | null; error?: string } | null>(null);
  const [matched, setMatched] = useState(false);
  const [running, setRunning] = useState(false);
  const [showTarget, setShowTarget] = useState(false);

  const run = () => {
    setRunning(true);
    // let the button paint its running state before the (fast) synchronous run
    setTimeout(() => {
      const r = runPython(draft, c.stdin ?? []);
      if (r.ok) {
        const got = normalizeOut(r.output.join("\n"));
        const want = normalizeOut((c.expected ?? []).join("\n"));
        const isMatch = got === want;
        setResult({ lines: r.output });
        setMatched(isMatch);
        if (isMatch) onSolved();
      } else {
        setResult({ lines: [], error: r.error });
        setMatched(false);
      }
      setRunning(false);
    }, 30);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground">{d.bug.evidenceLabel}</p>
      <CodeEditor
        value={draft}
        onChange={onDraft}
        lang="python"
        ariaLabel={d.bug.evidenceLabel}
        minRows={8}
      />

      {c.stdin && c.stdin.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">{d.bug.inputLabel}</p>
          <pre dir="ltr" className="rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 font-mono text-[13px] text-slate-200">
            {c.stdin.join("\n")}
          </pre>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={run}
          disabled={running}
          className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold disabled:opacity-60 focus-glow"
        >
          {running ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Play className="h-4 w-4" />}
          {running ? d.bug.running : d.bug.run}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onDraft(c.buggyCode)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-muted-foreground transition hover:text-foreground focus-glow"
        >
          <RotateCcw className="h-4 w-4" />
          {d.bug.resetCode}
        </motion.button>
        <button
          type="button"
          onClick={() => setShowTarget((s) => !s)}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-muted-foreground transition hover:text-foreground focus-glow"
        >
          {showTarget ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {showTarget ? d.bug.hideTarget : d.bug.showTarget}
        </button>
      </div>

      <AnimatePresence>
        {showTarget && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.05] p-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80">{d.bug.targetLabel}</p>
              <pre dir="ltr" className="font-mono text-[13px] leading-6 text-emerald-200">
                {(c.expected ?? []).join("\n")}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <div className="space-y-2">
          <OutputConsole lines={result.lines} error={result.error} label={d.bug.yourOutput} />
          {!matched && !solved && <p className="text-xs text-rose-300/80">{d.bug.notYetHint}</p>}
        </div>
      )}

      <CaseFurniture c={c} solved={solved} hintsUsed={hintsUsed} onHint={onHint} locale={locale} />
    </div>
  );
}

// ─── HTML case ───────────────────────────────────────────────

function HtmlCase({
  c,
  draft,
  onDraft,
  solved,
  hintsUsed,
  onHint,
  onSolved,
  locale,
}: {
  c: BugCase;
  draft: string;
  onDraft: (v: string) => void;
  solved: boolean;
  hintsUsed: number;
  onHint: () => void;
  onSolved: () => void;
  locale: string;
}) {
  const d = TOOLS_DICT[locale];
  const checks = c.checks ?? [];
  const [srcDoc, setSrcDoc] = useState(draft);
  const [results, setResults] = useState<CheckOutcome[] | null>(null);
  const [checking, setChecking] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pendingRef = useRef(false);

  // debounced live preview (same rhythm as the Academy playground)
  useEffect(() => {
    const id = setTimeout(() => setSrcDoc(draft), 450);
    return () => clearTimeout(id);
  }, [draft]);

  const finishCheck = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    const res = runToolChecks(doc, checks);
    setResults(res);
    setChecking(false);
    if (res.every((r) => r.ok)) onSolved();
  }, [checks, onSolved]);

  const check = () => {
    setChecking(true);
    if (srcDoc === draft) {
      finishCheck();
    } else {
      pendingRef.current = true;
      setSrcDoc(draft);
    }
  };

  const onFrameLoad = () => {
    if (pendingRef.current) {
      pendingRef.current = false;
      setTimeout(finishCheck, 60);
    }
  };

  const okCount = results ? results.filter((r) => r.ok).length : 0;
  const allOk = results !== null && results.every((r) => r.ok);

  const renderDetail = (detail: CheckDetail | undefined) => {
    if (!detail) return null;
    switch (detail.kind) {
      case "count":
        return d.bug.detailCount.replace("{n}", String(detail.n)).replace("{n2}", String(detail.n2));
      case "attr":
        return d.bug.detailAttr.replace("{a}", detail.a);
      case "style":
        return d.bug.detailStyle.replace("{prop}", detail.prop).replace("{got}", detail.got || "—");
      case "text":
        return d.bug.detailText;
      case "textGone":
        return d.bug.detailTextGone;
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground">{d.bug.evidenceLabel}</p>
      <div className="grid gap-3 lg:grid-cols-2">
        <CodeEditor value={draft} onChange={onDraft} lang="html" ariaLabel={d.bug.evidenceLabel} minRows={10} />
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">{d.bug.previewLabel}</p>
          <div className="h-72 overflow-hidden rounded-xl border border-white/10 lg:h-[340px]">
            <PreviewFrame code={srcDoc} onLoad={onFrameLoad} title={`case-${c.num}-preview`} iframeRef={iframeRef} />
          </div>
        </div>
      </div>

      {/* fix checklist — assertions run against the real iframe DOM */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <ListChecks className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          {d.bug.checklist}
        </p>
        <ul className="space-y-2">
          {checks.map((chk, i) => {
            const outcome = results?.[i];
            const ok = outcome?.ok ?? false;
            return (
              <li key={i} className="flex items-start gap-2 text-sm">
                {results ? (
                  ok ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
                  )
                ) : (
                  <span className="mt-1 h-4 w-4 shrink-0 rounded-full border border-white/20" aria-hidden="true" />
                )}
                <span className={cn("min-w-0", results ? (ok ? "text-emerald-100" : "text-slate-200") : "text-slate-300")}>
                  <span dir="auto">{pick(chk.label, locale)}</span>
                  {outcome && !ok && outcome.detail && (
                    <span className="block text-xs text-rose-300/70">{renderDetail(outcome.detail)}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
        {results && (
          <p className={cn("mt-2.5 text-sm font-semibold", allOk ? "text-emerald-200" : "text-rose-200")}>
            {allOk ? d.bug.checksPass : d.bug.checksFail.replace("{ok}", String(okCount)).replace("{total}", String(checks.length))}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={check}
          disabled={checking}
          className={cn(
            "inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-glow disabled:opacity-60",
            allOk ? "border border-emerald-400/30 bg-emerald-500/15 text-emerald-200" : "btn-hero",
          )}
        >
          {checking ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <ListChecks className="h-4 w-4" />}
          {checking ? d.bug.checking : d.bug.checkFix}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onDraft(c.buggyCode)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-muted-foreground transition hover:text-foreground focus-glow"
        >
          <RotateCcw className="h-4 w-4" />
          {d.bug.resetCode}
        </motion.button>
      </div>

      <CaseFurniture c={c} solved={solved} hintsUsed={hintsUsed} onHint={onHint} locale={locale} />
    </div>
  );
}

// ─── Main tool ───────────────────────────────────────────────

export function BugDetective() {
  const locale = useI18n((s) => s.locale);
  const d = TOOLS_DICT[locale];
  const [store, setStore] = useState<StoreShape>(EMPTY_STORE);
  const [activeId, setActiveId] = useState<string>(BUG_CASES[0]!.id);

  // hydrate persisted progress after mount (SSR-safe, async like the academy runners)
  useEffect(() => {
    const id = setTimeout(() => {
      setStore(loadJSON<StoreShape>(STORE_KEY, EMPTY_STORE));
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const update = useCallback((patch: (prev: StoreShape) => Partial<StoreShape>) => {
    setStore((prev) => {
      const next = { ...prev, ...patch(prev) };
      saveJSON(STORE_KEY, next);
      return next;
    });
  }, []);

  const markSolved = useCallback(
    (id: string) => update((prev) => (prev.solved[id] ? {} : { solved: { ...prev.solved, [id]: true } })),
    [update],
  );

  const setDraft = useCallback(
    (id: string, code: string) => update((prev) => ({ drafts: { ...prev.drafts, [id]: code } })),
    [update],
  );

  const revealHint = useCallback(
    (id: string, max: number) =>
      update((prev) => ({ hints: { ...prev.hints, [id]: Math.min((prev.hints[id] ?? 0) + 1, max) } })),
    [update],
  );

  const solvedCount = useMemo(
    () => BUG_CASES.filter((c) => store.solved[c.id]).length,
    [store.solved],
  );

  const resetProgress = () => {
    if (window.confirm(d.bug.resetConfirm)) {
      setStore(EMPTY_STORE);
      saveJSON(STORE_KEY, EMPTY_STORE);
    }
  };

  const active = BUG_CASES.find((c) => c.id === activeId) ?? BUG_CASES[0]!;

  return (
    <div className="space-y-4">
      <ToolHeader
        icon={Bug}
        title={d.bug.title}
        subtitle={d.bug.subtitle}
        iconClass="text-rose-300"
        right={
          <div className="flex items-center gap-2 ps-11 sm:ps-0">
            <span className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 ring-1 ring-inset ring-white/10">
              {d.bug.solvedCounter.replace("{solved}", String(solvedCount)).replace("{total}", String(BUG_CASES.length))}
            </span>
            <button
              type="button"
              onClick={resetProgress}
              className="inline-flex min-h-[44px] items-center rounded-xl px-2 text-[11px] text-muted-foreground transition hover:text-foreground focus-glow"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="sr-only">{d.bug.resetProgress}</span>
            </button>
          </div>
        }
      />

      {/* case picker — symptom-first detective wall */}
      <section aria-label={d.bug.pickCase} className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{d.bug.pickCase}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {BUG_CASES.map((c) => {
            const isActive = c.id === activeId;
            const isSolved = Boolean(store.solved[c.id]);
            return (
              <motion.button
                key={c.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveId(c.id)}
                aria-pressed={isActive}
                className={cn(
                  "relative min-h-[44px] rounded-xl border p-3 text-start transition focus-glow",
                  isActive
                    ? "border-cyan-400/40 bg-cyan-500/[0.08]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-500">
                    CASE {c.num}
                  </span>
                  {isSolved ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-label={d.bug.caseClosed} />
                  ) : c.language === "python" ? (
                    <FileCode2 className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  ) : (
                    <Globe className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  )}
                </span>
                <span dir="auto" className={cn("mt-1 block truncate text-sm font-medium", isActive ? "text-foreground" : "text-slate-300")}>
                  {pick(c.title, locale)}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* active case file */}
      <AnimatePresence mode="wait">
        <motion.section
          key={active.id}
          initial={{ opacity: 0, y: 12, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.14, ease: "easeIn" } }}
          transition={{ duration: 0.3, ease: EASE }}
          className="glass-card p-4 sm:p-6"
          aria-label={pick(active.title, locale)}
        >
          {/* detective header */}
          <div className="flex flex-wrap items-start gap-3">
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.18em]",
                store.solved[active.id]
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30"
                  : "bg-rose-500/10 text-rose-300 ring-1 ring-inset ring-rose-400/30",
              )}
              dir="ltr"
            >
              <Bug className="h-3.5 w-3.5" aria-hidden="true" />
              CASE {active.num}
            </span>
            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/10">
              {d.bug.categories[active.category]}
            </span>
            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/10">
              {active.language === "python" ? d.bug.langPy : d.bug.langHtml}
            </span>
          </div>

          <h3 dir="auto" className="mt-3 font-display text-lg font-bold sm:text-xl">
            {pick(active.title, locale)}
          </h3>

          {/* symptom — the detective's starting point */}
          <figure className="mt-3 rounded-xl border-s-2 border-amber-400/50 bg-amber-500/[0.04] px-4 py-3">
            <figcaption className="text-[11px] font-semibold uppercase tracking-wider text-amber-300/80">
              {d.bug.symptomLabel}
            </figcaption>
            <blockquote dir="auto" className="mt-1 text-sm italic leading-6 text-amber-100/90">
              {pick(active.symptom, locale)}
            </blockquote>
          </figure>

          <div className="mt-4">
            {active.language === "python" ? (
              <PyCase
                c={active}
                draft={store.drafts[active.id] ?? active.buggyCode}
                onDraft={(v) => setDraft(active.id, v)}
                solved={Boolean(store.solved[active.id])}
                hintsUsed={store.hints[active.id] ?? 0}
                onHint={() => revealHint(active.id, active.hints.length)}
                onSolved={() => markSolved(active.id)}
                locale={locale}
              />
            ) : (
              <HtmlCase
                c={active}
                draft={store.drafts[active.id] ?? active.buggyCode}
                onDraft={(v) => setDraft(active.id, v)}
                solved={Boolean(store.solved[active.id])}
                hintsUsed={store.hints[active.id] ?? 0}
                onHint={() => revealHint(active.id, active.hints.length)}
                onSolved={() => markSolved(active.id)}
                locale={locale}
              />
            )}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
