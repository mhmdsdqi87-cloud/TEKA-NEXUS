"use client";

// TEKA NEXUS — TEKA Academy HTML runners.
//   HtmlInline     — read-only snippet with a "Preview" toggle
//   HtmlPlayground — free editor + live iframe preview (persisted)
//   HtmlChallenge  — editor + live preview + DOM-check auto-grading

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Eye, Play, RotateCcw, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { EASE } from "@/components/shared/motion";
import { CodeEditor, CodeBlock } from "@/components/academy/code-editor";
import { pick, type HtmlCheck, type L } from "@/lib/academy/types";
import type { TFunc } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";

function useLocale(): string {
  return useI18n((s) => s.locale);
}

// ─── Live preview iframe ─────────────────────────────────────

export function PreviewFrame({
  code,
  className,
  onLoad,
  title,
  iframeRef,
}: {
  code: string;
  className?: string;
  onLoad?: () => void;
  title?: string;
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
}) {
  return (
    <iframe
      ref={iframeRef}
      title={title ?? "preview"}
      onLoad={onLoad}
      sandbox="allow-scripts allow-same-origin"
      srcDoc={code}
      className={cn("h-full w-full rounded-xl border border-white/10 bg-white", className)}
    />
  );
}

// ─── Inline theory preview ───────────────────────────────────

export function HtmlInline({ code, caption }: { code: string; caption?: L }) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <CodeBlock code={code} lang="html" />
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((o) => !o)}
          className="absolute end-2 top-2 inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/15 px-2.5 py-1.5 text-xs font-semibold text-cyan-300 ring-1 ring-inset ring-cyan-400/30 backdrop-blur transition hover:bg-cyan-500/25 focus-glow"
        >
          <Eye className="h-3.5 w-3.5" />
          {open ? "Close" : "Preview"}
        </motion.button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="h-72 overflow-hidden rounded-xl border border-white/10">
              <PreviewFrame code={code} title="inline preview" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {caption && <p className="text-xs text-muted-foreground">{pick(caption, locale)}</p>}
    </div>
  );
}

// ─── Free playground ─────────────────────────────────────────

export function HtmlPlayground({
  initialCode,
  storageKey,
  t,
}: {
  initialCode: string;
  storageKey?: string;
  t: TFunc;
}) {
  const [code, setCode] = useState(initialCode);
  const [srcDoc, setSrcDoc] = useState(initialCode);

  useEffect(() => {
    if (!storageKey) return;
    const id = setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) {
          setCode(saved);
          setSrcDoc(saved);
        }
      } catch { /* private mode */ }
    }, 0);
    return () => clearTimeout(id);
  }, [storageKey]);

  // debounced live preview
  useEffect(() => {
    const id = setTimeout(() => setSrcDoc(code), 450);
    return () => clearTimeout(id);
  }, [code]);

  const persist = useCallback(
    (v: string) => {
      setCode(v);
      if (storageKey) {
        try { localStorage.setItem(storageKey, v); } catch { /* ignore */ }
      }
    },
    [storageKey],
  );

  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <CodeEditor value={code} onChange={persist} lang="html" ariaLabel={t("academy.playgroundTitle")} minRows={12} />
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">{t("academy.previewTitle")}</p>
          <div className="h-[420px] overflow-hidden rounded-xl border border-white/10">
            <PreviewFrame code={srcDoc} title="playground preview" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => persist(initialCode)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-muted-foreground transition hover:text-foreground focus-glow"
        >
          <RotateCcw className="h-4 w-4" />
          {t("academy.resetCode")}
        </motion.button>
        <p className="text-[11px] text-muted-foreground">{t("academy.previewHint")}</p>
      </div>
    </div>
  );
}

// ─── Challenge runner with DOM checks ────────────────────────

type CheckResult = { check: HtmlCheck; ok: boolean; detail?: string };

function runChecks(doc: Document, checks: HtmlCheck[]): CheckResult[] {
  return checks.map((check) => {
    try {
      const els = Array.from(doc.querySelectorAll(check.selector));
      const min = check.count ?? 1;
      if (els.length < min) {
        return { check, ok: false, detail: `found ${els.length}, need ${min}` };
      }
      if (check.text !== undefined) {
        const needle = check.text.trim().toLowerCase();
        const hit = els.some((el) => (el.textContent ?? "").trim().toLowerCase().includes(needle));
        if (!hit) return { check, ok: false, detail: `text "${check.text}" not found` };
      }
      if (check.attrName !== undefined) {
        const val = check.attrValue ?? "";
        const hit = els.some((el) => el.getAttribute(check.attrName!) === val);
        if (!hit) return { check, ok: false, detail: `attribute ${check.attrName}="${val}" missing` };
      }
      if (check.styleIncludes !== undefined) {
        const needle = check.styleIncludes.replace(/\s+/g, "").toLowerCase();
        const hit = els.some((el) =>
          (el.getAttribute("style") ?? "").replace(/\s+/g, "").toLowerCase().includes(needle),
        );
        if (!hit) return { check, ok: false, detail: `style "${check.styleIncludes}" missing` };
      }
      return { check, ok: true };
    } catch {
      return { check, ok: false, detail: "invalid selector" };
    }
  });
}

export function HtmlChallenge({
  starter,
  solution,
  checks,
  hints,
  locale,
  t,
  passed,
  onPassed,
}: {
  starter: string;
  solution: string;
  checks: HtmlCheck[];
  hints: L[];
  locale: string;
  t: TFunc;
  passed: boolean;
  onPassed: () => void;
}) {
  const [code, setCode] = useState(starter);
  const [srcDoc, setSrcDoc] = useState(starter);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [allOk, setAllOk] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pendingRef = useRef(false);

  // debounced live preview
  useEffect(() => {
    const id = setTimeout(() => setSrcDoc(code), 450);
    return () => clearTimeout(id);
  }, [code]);

  const finishCheck = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    const res = runChecks(doc, checks);
    setResults(res);
    if (res.every((r) => r.ok)) {
      setAllOk(true);
      onPassed();
    } else {
      setAllOk(false);
    }
  }, [checks, onPassed]);

  const check = () => {
    // If the preview is stale, re-render and grade on load.
    if (srcDoc === code) {
      finishCheck();
    } else {
      pendingRef.current = true;
      setSrcDoc(code);
    }
  };

  const onFrameLoad = () => {
    if (pendingRef.current) {
      pendingRef.current = false;
      // wait a tick so scripts inside the doc settle
      setTimeout(finishCheck, 60);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <CodeEditor value={code} onChange={setCode} lang="html" ariaLabel={t("academy.challengeLabel")} minRows={12} />
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">{t("academy.previewTitle")}</p>
          <div className="h-[420px] overflow-hidden rounded-xl border border-white/10">
            <PreviewFrame code={srcDoc} onLoad={onFrameLoad} title="challenge preview" iframeRef={iframeRef} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={check}
          className={cn(
            "inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-glow",
            allOk
              ? "border border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
              : "btn-hero",
          )}
        >
          {allOk ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {t("academy.checkSolution")}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setCode(starter)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-muted-foreground transition hover:text-foreground focus-glow"
        >
          <RotateCcw className="h-4 w-4" />
          {t("academy.resetCode")}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {results && (
          <motion.ul
            key={allOk ? "ok" : "no"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "space-y-2 rounded-xl border p-3",
              allOk ? "border-emerald-400/30 bg-emerald-500/10" : "border-rose-400/25 bg-rose-500/[0.07]",
            )}
          >
            {results.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                {r.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
                )}
                <span className={allOk ? "text-emerald-100" : "text-slate-200"}>
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs">{r.check.selector}</code>
                  {r.check.text ? ` · "${r.check.text}"` : ""}
                  {r.detail ? <span className="text-muted-foreground"> — {r.detail}</span> : null}
                </span>
              </li>
            ))}
            {allOk && <li className="text-sm font-semibold text-emerald-200">{t("academy.passed")}</li>}
          </motion.ul>
        )}
      </AnimatePresence>

      {hintCount < hints.length && !passed && (
        <button
          onClick={() => setHintCount((n) => n + 1)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/[0.08] px-4 text-sm font-medium text-amber-200 transition hover:bg-amber-500/[0.14] focus-glow"
        >
          {t("academy.hintReveal", { n: hintCount + 1, total: hints.length })}
        </button>
      )}
      <AnimatePresence>
        {hintCount > 0 && (
          <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            {hints.slice(0, hintCount).map((h, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex gap-2.5 rounded-xl border border-amber-400/15 bg-amber-500/[0.05] px-3.5 py-2.5 text-sm text-amber-100/90">
                <span aria-hidden="true">💡</span>
                <span dir="auto">{pick(h, locale)}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

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
              <CodeBlock code={solution} lang="html" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
