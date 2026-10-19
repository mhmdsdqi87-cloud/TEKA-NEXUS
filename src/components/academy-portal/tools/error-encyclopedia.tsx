"use client";

// TEKA NEXUS — Academy portal tool 2/4: Error Encyclopedia (§12).
// A searchable mistake library: verbatim error text, plain meaning, causes,
// fixes, prevention, minimal repro vs corrected code, related lessons.
// Search matches the verbatim message AND every translated field.

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  FileWarning,
  Search,
  ShieldCheck,
  Wrench,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/store";
import { EASE } from "@/components/shared/motion";
import { CodeBlock } from "@/components/academy/code-editor";
import { pick } from "@/lib/academy/types";

import { TOOLS_DICT, type ErrorCategoryKey, type ErrorLangKey, type SeverityKey } from "./tools-dict";
import { ERROR_ENTRIES, type ErrorEntry } from "./tools-data";
import { FilterChip, ToolHeader } from "./tool-shared";

const SEVERITY_STYLE: Record<SeverityKey, string> = {
  low: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/30",
  medium: "bg-amber-500/10 text-amber-300 ring-amber-400/30",
  high: "bg-rose-500/10 text-rose-300 ring-rose-400/30",
};

const SEVERITY_LANG_STYLE: Record<ErrorLangKey, string> = {
  python: "text-cyan-300",
  html: "text-teal-300",
  javascript: "text-amber-300",
  general: "text-violet-300",
};

function entryMatches(entry: ErrorEntry, q: string, locale: string): boolean {
  const haystacks: string[] = [
    entry.errorText,
    entry.altText ?? "",
    pick(entry.plainMeaning, locale),
    entry.plainMeaning.en,
    entry.plainMeaning.fa,
    ...entry.causes.map((c) => `${c.en} ${c.fa}`),
    ...entry.fixes.map((f) => `${f.en} ${f.fa}`),
    entry.prevention.en,
    entry.prevention.fa,
    ...(entry.related ?? []).map((r) => `${r.en} ${r.fa}`),
  ];
  return haystacks.some((h) => h.toLowerCase().includes(q));
}

export function ErrorEncyclopedia() {
  const locale = useI18n((s) => s.locale);
  const d = TOOLS_DICT[locale];
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<"all" | ErrorLangKey>("all");
  const [cat, setCat] = useState<"all" | ErrorCategoryKey>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ERROR_ENTRIES.filter(
      (e) =>
        (lang === "all" || e.lang === lang) &&
        (cat === "all" || e.category === cat) &&
        (q === "" || entryMatches(e, q, locale)),
    );
  }, [query, lang, cat, locale]);

  const catKeys = useMemo(() => {
    const set = new Set<ErrorCategoryKey>();
    ERROR_ENTRIES.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, []);

  return (
    <div className="space-y-4">
      <ToolHeader
        icon={FileWarning}
        title={d.encyclopedia.title}
        subtitle={d.encyclopedia.subtitle}
        iconClass="text-amber-300"
        right={
          <span className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 ring-1 ring-inset ring-white/10">
            {d.encyclopedia.entriesCount.replace("{n}", String(filtered.length))}
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
          placeholder={d.encyclopedia.searchPlaceholder}
          aria-label={d.encyclopedia.searchPlaceholder}
          className="min-h-[44px] w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pe-4 ps-10 text-sm text-foreground outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-400/40"
        />
      </div>

      {/* language chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label={d.encyclopedia.langAll}>
        <FilterChip active={lang === "all"} onClick={() => setLang("all")}>
          {d.encyclopedia.langAll}
        </FilterChip>
        {(Object.keys(d.encyclopedia.languages) as ErrorLangKey[]).map((key) => (
          <FilterChip key={key} active={lang === key} onClick={() => setLang(key)}>
            {d.encyclopedia.languages[key]}
          </FilterChip>
        ))}
      </div>

      {/* category chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label={d.encyclopedia.catAll}>
        <FilterChip active={cat === "all"} onClick={() => setCat("all")}>
          {d.encyclopedia.catAll}
        </FilterChip>
        {catKeys.map((key) => (
          <FilterChip key={key} active={cat === key} onClick={() => setCat(key)}>
            {d.encyclopedia.categories[key]}
          </FilterChip>
        ))}
      </div>

      {/* entries */}
      {filtered.length === 0 ? (
        <div className="glass-card p-6 text-center">
          <XCircle className="mx-auto h-8 w-8 text-slate-500" aria-hidden="true" />
          <p className="mt-2 text-sm font-semibold">{d.encyclopedia.noResults}</p>
          <p className="mt-1 text-xs text-muted-foreground">{d.encyclopedia.noResultsHint}</p>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((entry) => {
            const open = openId === entry.id;
            return (
              <li key={entry.id} className="glass-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : entry.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 p-4 text-start transition hover:bg-white/[0.03] focus-glow"
                >
                  <span
                    className={cn(
                      "shrink-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                      SEVERITY_STYLE[entry.severity],
                    )}
                  >
                    {d.encyclopedia.severities[entry.severity]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <code dir="ltr" className="block truncate font-mono text-[13px] text-slate-100">
                      {entry.errorText}
                    </code>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">
                      <span className={cn("font-semibold", SEVERITY_LANG_STYLE[entry.lang])}>
                        {d.encyclopedia.languages[entry.lang]}
                      </span>
                      {" · "}
                      {d.encyclopedia.categories[entry.category]}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300", open && "rotate-180")}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 border-t border-white/[0.06] p-4">
                        {/* plain meaning */}
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300/80">
                            {d.encyclopedia.plainMeaning}
                          </p>
                          <p dir="auto" className="mt-1 text-sm leading-6 text-slate-200">
                            {pick(entry.plainMeaning, locale)}
                          </p>
                        </div>

                        {/* causes + fixes */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-300/80">
                              {d.encyclopedia.causes}
                            </p>
                            <ul className="mt-1.5 space-y-1.5">
                              {entry.causes.map((cause, i) => (
                                <li key={i} dir="auto" className="flex gap-2 text-sm leading-6 text-slate-300">
                                  <XCircle className="mt-1 h-3.5 w-3.5 shrink-0 text-rose-400/70" aria-hidden="true" />
                                  {pick(cause, locale)}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80">
                              {d.encyclopedia.fixes}
                            </p>
                            <ul className="mt-1.5 space-y-1.5">
                              {entry.fixes.map((fix, i) => (
                                <li key={i} dir="auto" className="flex gap-2 text-sm leading-6 text-slate-300">
                                  <Wrench className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400/70" aria-hidden="true" />
                                  {pick(fix, locale)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* repro vs corrected */}
                        {entry.broken && entry.fixed && (
                          <div className="grid gap-3 lg:grid-cols-2">
                            <div>
                              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-rose-300/80">
                                {d.encyclopedia.reproLabel}
                              </p>
                              <CodeBlock
                                code={entry.broken}
                                lang={entry.lang === "python" ? "python" : "html"}
                                className="opacity-90"
                              />
                            </div>
                            <div>
                              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80">
                                {d.encyclopedia.fixedLabel}
                              </p>
                              <CodeBlock code={entry.fixed} lang={entry.lang === "python" ? "python" : "html"} />
                            </div>
                          </div>
                        )}

                        {/* prevention */}
                        <div className="flex gap-2.5 rounded-xl border border-cyan-400/15 bg-cyan-500/[0.05] px-3.5 py-2.5">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300/80">
                              {d.encyclopedia.prevention}
                            </p>
                            <p dir="auto" className="mt-0.5 text-sm leading-6 text-slate-300">
                              {pick(entry.prevention, locale)}
                            </p>
                          </div>
                        </div>

                        {/* related lessons — labels only */}
                        {entry.related && entry.related.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                              {d.encyclopedia.related}
                            </span>
                            {entry.related.map((r, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-slate-300 ring-1 ring-inset ring-white/10"
                              >
                                {pick(r, locale)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
