"use client";

// TEKA NEXUS — NEXUS Library view (knowledge ecosystem, phase 3).
// Developer + AI-facing reference library: search, filters, verification
// status with evidence, complete source code with reliable copy.
// Backed by the public /api/library endpoints (same contract as llms.txt).

import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, BookOpen, Check, Copy, Hourglass, Search, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import { get, qs } from "@/lib/api";
import { useT } from "@/lib/i18n";

import { EmptyState } from "@/components/shared/atoms";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ListItem = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  language: string;
  framework: string;
  difficulty: string;
  status: string;
  verifiedAt: string | null;
  version: string;
  license: string;
  sourceAuthor: string;
  tags: string[];
  related: string[];
  updatedAt: string;
};

type RelatedRef = { slug: string; title: string; status: string; category: string; language: string };

type Detail = Omit<ListItem, "related"> & {
  problem: string;
  approach: string;
  code: string;
  dependencies: string[];
  install: string;
  usage: string;
  securityNotes: string;
  performanceNotes: string;
  limitations: string;
  sourceUrl: string;
  verifier: string | null;
  related: RelatedRef[];
};

type LibraryResponse = {
  ok: boolean;
  data?: ListItem[];
  meta?: { total: number; count: number; limit: number; offset: number };
  error?: { code: string; message: string };
};

type DetailResponse = { ok: boolean; data?: Detail; error?: { code: string; message: string } };

const CATEGORIES = [
  "backend", "security", "performance", "api", "database", "ai",
  "frontend", "patterns", "i18n", "devops", "fullstack", "web3",
];
const LANGUAGES = ["typescript", "javascript", "python", "sql", "bash"];
const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

/** Copy that actually works: async clipboard first, execCommand fallback. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function StatusBadge({ status, verifiedAt, verifier }: { status: string; verifiedAt: string | null; verifier: string | null }) {
  const t = useT();
  if (status === "verified") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300"
        title={verifiedAt ? t("library.verifiedEvidence", { verifier: verifier ?? "pipeline", date: verifiedAt.slice(0, 10) }) : undefined}
      >
        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
        {t("library.verifiedBadge")}
      </span>
    );
  }
  if (status === "under_review") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
        <Hourglass className="h-3.5 w-3.5" aria-hidden="true" />
        {t("library.underReviewBadge")}
      </span>
    );
  }
  if (status === "deprecated") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-400/10 px-2.5 py-1 text-[11px] font-semibold text-red-300">
        {t("library.deprecatedBadge")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/70">
      {t("library.draftBadge")}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300/80">{title}</h3>
      <div className="text-sm leading-relaxed text-white/80">{children}</div>
    </section>
  );
}

export function LibraryView() {
  const t = useT();

  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");

  const [items, setItems] = useState<ListItem[]>([]);
  const [meta, setMeta] = useState<{ total: number; count: number } | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listFailed, setListFailed] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [copied, setCopied] = useState(false);
  const listReqId = useRef(0);
  const detailReqId = useRef(0);

  // debounce the search box
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(timer);
  }, [q]);

  const loadList = useCallback(async () => {
    const reqId = ++listReqId.current;
    setListLoading(true);
    setListFailed(false);
    try {
      const res = await get<LibraryResponse>(
        "/api/library" + qs({ q: debouncedQ, category, language, difficulty, status, limit: 50 }),
      );
      if (reqId !== listReqId.current) return; // stale response — discard
      if (res.ok && res.data) {
        setItems(res.data);
        setMeta(res.meta ? { total: res.meta.total, count: res.meta.count } : null);
      } else {
        setItems([]);
        setMeta(null);
        setListFailed(true);
      }
    } catch {
      if (reqId !== listReqId.current) return;
      setItems([]);
      setMeta(null);
      setListFailed(true);
    } finally {
      if (reqId === listReqId.current) setListLoading(false);
    }
  }, [debouncedQ, category, language, difficulty, status]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const openEntry = useCallback(async (slug: string) => {
    const reqId = ++detailReqId.current;
    setSelected(slug);
    setDetailLoading(true);
    setDetail(null);
    try {
      const res = await get<DetailResponse>(`/api/library/${encodeURIComponent(slug)}`);
      if (reqId !== detailReqId.current) return;
      if (res.ok && res.data) setDetail(res.data);
      else toast.error(t("library.detailFailed"));
    } catch {
      if (reqId === detailReqId.current) toast.error(t("library.detailFailed"));
    } finally {
      if (reqId === detailReqId.current) setDetailLoading(false);
    }
  }, [t]);

  const onCopy = useCallback(async () => {
    if (!detail?.code) return;
    const ok = await copyText(detail.code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } else {
      toast.error(t("library.detailFailed"));
    }
  }, [detail, t]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      <FadeIn className="space-y-1.5">
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-6 w-6 text-amber-300" aria-hidden="true" />
          <h1 className="text-2xl font-bold tracking-tight text-white">{t("library.title")}</h1>
        </div>
        <p className="max-w-2xl text-sm text-white/60">{t("library.tagline")}</p>
        <p className="font-mono text-[11px] text-cyan-300/70">
          {t("library.apiHint")}: GET /api/library?q=… · GET /api/library/{"{slug}"} · /llms.txt
        </p>
      </FadeIn>

      {/* search + filters */}
      <div className="mt-5 space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden="true" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("library.searchPlaceholder")}
            aria-label={t("library.searchAria")}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t("library.filtersAria")}>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-9 w-[190px] text-xs" aria-label={t("library.allCategories")}>
              <SelectValue placeholder={t("library.allCategories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("library.allCategories")}</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {t(`library.categoryLabels.${c}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-9 w-[150px] text-xs" aria-label={t("library.allLanguages")}>
              <SelectValue placeholder={t("library.allLanguages")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("library.allLanguages")}</SelectItem>
              {LANGUAGES.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="h-9 w-[160px] text-xs" aria-label={t("library.allDifficulties")}>
              <SelectValue placeholder={t("library.allDifficulties")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("library.allDifficulties")}</SelectItem>
              {DIFFICULTIES.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-[170px] text-xs" aria-label={t("library.allStatuses")}>
              <SelectValue placeholder={t("library.allStatuses")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">{t("library.allStatuses")}</SelectItem>
              <SelectItem value="verified">{t("library.statusVerifiedOnly")}</SelectItem>
              <SelectItem value="draft">{t("library.draftBadge")}</SelectItem>
              <SelectItem value="under_review">{t("library.underReviewBadge")}</SelectItem>
              <SelectItem value="deprecated">{t("library.deprecatedBadge")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {meta && (
          <p className="font-mono text-[11px] text-white/40">
            {t("library.entriesCount", { count: meta.count, total: meta.total })}
          </p>
        )}
      </div>

      {/* list + detail */}
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="space-y-2 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1">
          {listLoading ? (
            <div className="space-y-2" role="status" aria-live="polite">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[92px] animate-pulse rounded-xl bg-white/[0.04]" />
              ))}
            </div>
          ) : listFailed ? (
            <EmptyState icon={BookOpen} title={t("library.loadFailed")} />
          ) : items.length === 0 ? (
            <EmptyState icon={Search} title={t("library.emptyTitle")} description={t("library.emptyBody")} />
          ) : (
            items.map((item) => (
              <button
                key={item.slug}
                onClick={() => openEntry(item.slug)}
                aria-current={selected === item.slug}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  selected === item.slug
                    ? "border-cyan-400/40 bg-cyan-400/[0.08]"
                    : "border-white/[0.07] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-white">{item.title}</span>
                  <StatusBadge status={item.status} verifiedAt={item.verifiedAt} verifier={null} />
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-white/55">{item.summary}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5 font-mono text-[10px] text-white/45">
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5">{t(`library.categoryLabels.${item.category}`)}</span>
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5">{item.language}</span>
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5">{item.difficulty}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="min-h-[240px] rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5">
          {!selected ? (
            <div className="grid h-full place-items-center text-center text-sm text-white/45">
              {t("library.selectHint")}
            </div>
          ) : detailLoading ? (
            <div className="space-y-3" role="status" aria-live="polite">
              <div className="h-8 w-1/2 animate-pulse rounded bg-white/[0.05]" />
              <div className="h-24 w-full animate-pulse rounded bg-white/[0.04]" />
              <div className="h-48 w-full animate-pulse rounded bg-white/[0.04]" />
            </div>
          ) : detail ? (
            <FadeIn className="space-y-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-white">{detail.title}</h2>
                  <StatusBadge status={detail.status} verifiedAt={detail.verifiedAt} verifier={detail.verifier} />
                </div>
                <p className="text-sm text-white/70">{detail.summary}</p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-white/50">
                  {detail.tags.map((tag) => (
                    <span key={tag} className="rounded bg-white/[0.06] px-1.5 py-0.5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <Section title={t("library.problem")}>{detail.problem}</Section>
              <Section title={t("library.approach")}>{detail.approach}</Section>

              <section className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300/80">
                    {t("library.code")}
                  </h3>
                  <Button size="sm" variant="outline" onClick={onCopy} className="h-7 gap-1.5 px-2.5 text-[11px]">
                    {copied ? <Check className="h-3.5 w-3.5 text-cyan-300" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? t("library.copied") : t("library.copy")}
                  </Button>
                </div>
                <pre
                  className="max-h-[420px] overflow-auto rounded-lg border border-white/[0.08] bg-black/40 p-3 font-mono text-[11.5px] leading-relaxed text-white/85"
                  tabIndex={0}
                >
                  <code>{detail.code}</code>
                </pre>
              </section>

              {detail.usage && <Section title={t("library.usage")}>{detail.usage}</Section>}
              {detail.install && <Section title={t("library.install")}>{detail.install}</Section>}
              {detail.securityNotes && (
                <Section title={t("library.security")}>
                  <span className="flex items-start gap-2">
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300/80" aria-hidden="true" />
                    <span>{detail.securityNotes}</span>
                  </span>
                </Section>
              )}
              {detail.performanceNotes && <Section title={t("library.performance")}>{detail.performanceNotes}</Section>}
              {detail.limitations && <Section title={t("library.limitations")}>{detail.limitations}</Section>}

              <Section title={t("library.metaSection")}>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[11px]">
                  <dt className="text-white/45">{t("library.versionLabel")}</dt>
                  <dd>v{detail.version}</dd>
                  <dt className="text-white/45">{t("library.licenseLabel")}</dt>
                  <dd>{detail.license}</dd>
                  <dt className="text-white/45">{t("library.sourceLabel")}</dt>
                  <dd className="break-all">
                    {detail.sourceAuthor}
                    {detail.sourceUrl ? (
                      <>
                        {" — "}
                        <a href={detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300/80 underline-offset-2 hover:underline">
                          {detail.sourceUrl.replace("https://", "")}
                        </a>
                      </>
                    ) : null}
                  </dd>
                  {detail.dependencies.length > 0 && (
                    <>
                      <dt className="text-white/45">{t("library.dependencies")}</dt>
                      <dd>{detail.dependencies.join(", ")}</dd>
                    </>
                  )}
                </dl>
              </Section>

              <Section title={t("library.related")}>
                {detail.related.length ? (
                  <ul className="space-y-1.5">
                    {detail.related.map((r) => (
                      <li key={r.slug}>
                        <button
                          onClick={() => openEntry(r.slug)}
                          className="text-cyan-300/85 underline-offset-2 hover:underline"
                        >
                          {r.title}
                        </button>
                        <span className="ml-2 font-mono text-[10px] text-white/40">
                          {r.category} · {r.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-white/45">{t("library.relatedEmpty")}</span>
                )}
              </Section>
            </FadeIn>
          ) : null}
        </div>
      </div>
    </div>
  );
}
