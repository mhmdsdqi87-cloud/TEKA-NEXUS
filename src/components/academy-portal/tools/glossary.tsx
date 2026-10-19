"use client";

// TEKA NEXUS — Academy portal tool 4/4: Glossary (§13).
// 30 bilingual terms (EN + fa), each with a plain-language meaning, a tiny
// read-only code example and related-lesson labels. Searchable, with A–Z
// jump chips that scroll inside the scrollable list.

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookMarked, BookOpen, Search, XCircle } from "lucide-react";

import { useI18n } from "@/lib/i18n/store";
import { EASE } from "@/components/shared/motion";
import { pick } from "@/lib/academy/types";

import { TOOLS_DICT } from "./tools-dict";
import { GLOSSARY_TERMS } from "./tools-data";
import { ToolHeader } from "./tool-shared";

export function Glossary() {
  const locale = useI18n((s) => s.locale);
  const d = TOOLS_DICT[locale];
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const terms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...GLOSSARY_TERMS]
      .sort((a, b) => a.term.localeCompare(b.term))
      .filter(
        (t) =>
          q === "" ||
          t.term.toLowerCase().includes(q) ||
          t.termFa.includes(query.trim()) ||
          t.meaning.en.toLowerCase().includes(q) ||
          t.meaning.fa.includes(query.trim()),
      );
  }, [query]);

  const letters = useMemo(() => {
    const set = new Set<string>();
    GLOSSARY_TERMS.forEach((t) => set.add(t.term[0]!.toUpperCase()));
    return Array.from(set).sort();
  }, []);

  const jump = (letter: string) => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-letter="${letter}"]`);
    el?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const jumpAll = () => {
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <ToolHeader
        icon={BookMarked}
        title={d.glossary.title}
        subtitle={d.glossary.subtitle}
        iconClass="text-emerald-300"
        right={
          <span className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 ring-1 ring-inset ring-white/10">
            {d.glossary.termsCount.replace("{n}", String(terms.length))}
          </span>
        }
      />

      {/* search */}
      <div className="relative">
        <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={d.glossary.searchPlaceholder}
          aria-label={d.glossary.searchPlaceholder}
          className="min-h-[44px] w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pe-4 ps-10 text-sm text-foreground outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-400/40"
        />
      </div>

      {/* A–Z jump chips */}
      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={d.glossary.jumpLabel}>
        <span className="me-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {d.glossary.jumpLabel}
        </span>
        <button
          type="button"
          onClick={jumpAll}
          className="inline-flex min-h-[36px] items-center rounded-full bg-white/[0.03] px-3 text-xs font-semibold text-muted-foreground ring-1 ring-inset ring-white/10 transition hover:text-foreground focus-glow"
        >
          {d.glossary.allLetters}
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => jump(letter)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] font-mono text-xs font-bold text-slate-300 ring-1 ring-inset ring-white/10 transition hover:bg-cyan-500/15 hover:text-cyan-200 focus-glow"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* terms */}
      {terms.length === 0 ? (
        <div className="glass-card p-6 text-center">
          <XCircle className="mx-auto h-8 w-8 text-slate-500" aria-hidden="true" />
          <p className="mt-2 text-sm font-semibold">{d.glossary.noResults}</p>
          <p className="mt-1 text-xs text-muted-foreground">{d.glossary.noResultsHint}</p>
        </div>
      ) : (
        <div
          ref={listRef}
          className="max-h-[560px] space-y-2.5 overflow-y-auto pe-1 academy-scroll"
        >
          {terms.map((term, i) => (
            <motion.article
              key={term.id}
              data-letter={term.term[0]!.toUpperCase()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.25), ease: EASE }}
              className="glass-card scroll-mt-2 p-4"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-base font-bold text-foreground">{term.term}</h3>
                <span dir="auto" className="text-sm font-medium text-cyan-200/90">{term.termFa}</span>
              </div>
              <p dir="auto" className="mt-1.5 text-sm leading-6 text-slate-300">
                {pick(term.meaning, locale)}
              </p>

              <div className="mt-3">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {d.glossary.exampleLabel}
                </p>
                <pre dir="ltr" className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b1220] px-3.5 py-2.5 font-mono text-[12.5px] leading-6 text-slate-200">
                  {term.example.code}
                </pre>
              </div>

              {term.related && term.related.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    {d.glossary.related}
                  </span>
                  {term.related.map((r, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-slate-300 ring-1 ring-inset ring-white/10"
                    >
                      {pick(r, locale)}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
