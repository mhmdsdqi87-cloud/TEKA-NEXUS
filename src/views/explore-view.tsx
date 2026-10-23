"use client";

// TEKA NEXUS — Explore view (Task 2-b).
// Discovery directory: search + category/status filters + sort tabs,
// responsive project grid, page navigation. Stale responses discarded
// via a request-id ref.

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Radio, Search, Telescope, X } from "lucide-react";
import { toast } from "sonner";

import { useApp } from "@/lib/store";
import { get, qs } from "@/lib/api";
import { type ProjectCard } from "@/lib/dto";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/constants";
import { useT, useLabeled } from "@/lib/i18n";

import { EmptyState } from "@/components/shared/atoms";
import { ProjectCardView, ProjectCardSkeleton } from "@/components/shared/project-card";
import { FadeIn, Reveal, SPRING, Stagger, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SortKey = "recent" | "updated" | "popular";

type DiscoveryResponse = {
  projects: ProjectCard[];
  page: number;
  pages: number;
  total: number;
};

const SORT_TABS: { value: SortKey; labelKey: string }[] = [
  { value: "recent", labelKey: "explore.sortRecent" },
  { value: "updated", labelKey: "explore.sortActive" },
  { value: "popular", labelKey: "explore.sortPopular" },
];

export function ExploreView() {
  const view = useApp((s) => s.view);
  const navigate = useApp((s) => s.navigate);
  const initialQuery = view.name === "explore" ? (view.query ?? "") : "";
  const t = useT();
  const lbl = useLabeled();

  const [input, setInput] = useState(initialQuery);
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<DiscoveryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reqId = useRef(0);

  // Debounce the search input (300ms) and reset to page 1.
  useEffect(() => {
    const timer = setTimeout(() => {
      setQ(input);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  const fetchData = useCallback(async () => {
    const id = ++reqId.current;
    setLoading(true);
    setError(null);
    try {
      const res = await get<DiscoveryResponse>(
        `/api/projects${qs({
          q,
          category: category === "all" ? undefined : category,
          status: status === "all" ? undefined : status,
          sort,
          page,
        })}`
      );
      if (reqId.current === id) setData(res);
    } catch (e) {
      if (reqId.current === id) {
        const msg = e instanceof Error ? e.message : t("explore.loadError");
        setError(msg);
        toast.error(msg);
      }
    } finally {
      if (reqId.current === id) setLoading(false);
    }
  }, [q, category, status, sort, page, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const projects = data?.projects ?? null;
  const hasFilters = q.trim() !== "" || category !== "all" || status !== "all";

  const clearFilters = () => {
    setInput("");
    setQ("");
    setCategory("all");
    setStatus("all");
    setPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      <FadeIn className="flex items-end justify-between gap-4 mb-5">
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{t("common.explore")}</h1>
          <p className="text-sm text-muted-foreground mt-1" aria-live="polite">
            {loading && !data
              ? t("explore.loading")
              : t((data?.total ?? 0) === 1 ? "explore.projectCount" : "explore.projectCountPlural", {
                  count: data?.total ?? 0,
                })}
          </p>
        </div>
      </FadeIn>

      {/* Toolbar */}
      <Reveal y={12} className="glass-card rounded-xl p-3 sticky top-14 z-30 backdrop-blur-md mb-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1 min-w-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("explore.searchPlaceholder")}
              aria-label={t("explore.searchAria")}
              className="pl-9 bg-white/[0.03] border-white/10 focus-visible:ring-cyan-500/30"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={category}
              onValueChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
            >
              <SelectTrigger
                className="w-[170px] bg-white/[0.03] border-white/10"
                aria-label={t("explore.filterCategoryAria")}
              >
                <SelectValue placeholder={t("explore.allCategories")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("explore.allCategories")}</SelectItem>
                {PROJECT_CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {lbl("project.categories", c.slug, c.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            >
              <SelectTrigger
                className="w-[150px] bg-white/[0.03] border-white/10"
                aria-label={t("explore.filterStatusAria")}
              >
                <SelectValue placeholder={t("explore.allStatuses")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("explore.allStatuses")}</SelectItem>
                {PROJECT_STATUSES.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {lbl("project.status", s.slug, s.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className={hasFilters ? "" : "invisible"}
              tabIndex={hasFilters ? 0 : -1}
            >
              <X className="h-3.5 w-3.5" /> {t("explore.clear")}
            </Button>
          </div>
        </div>

        <Tabs
          value={sort}
          onValueChange={(v) => {
            setSort(v as SortKey);
            setPage(1);
          }}
          className="mt-3"
        >
          <TabsList className="bg-white/[0.04] h-9" aria-label={t("explore.sortAria")}>
            {SORT_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative text-xs px-3.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {sort === tab.value && (
                  <motion.span
                    layoutId="explore-sort-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md border border-cyan-400/30 bg-cyan-500/15"
                    transition={SPRING}
                  />
                )}
                <span className="relative">{t(tab.labelKey)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </Reveal>

      {/* Live Pulse → Command Center CTA (terminal + feed + AI + GitHub live in one hub) */}
      <Reveal y={12} className="mb-8">
        <button
          onClick={() => navigate({ name: "live" })}
          className="focus-glow group relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-violet-500/[0.08] p-4 text-start transition hover:border-cyan-400/30 md:p-5"
          aria-label={t("pulse.live.ctaFromExplore")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(34,211,238,0.4) 4px, transparent 5px)",
            }}
          />
          <div className="relative flex items-center gap-3">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
              <Radio className="h-5 w-5 text-cyan-300" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 font-display text-base font-bold md:text-lg">
                {t("pulse.live.ctaFromExplore")}
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-emerald-300" dir="ltr">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {t("pulse.live.badge")}
                </span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground sm:text-sm">
                {t("pulse.live.ctaSubtitle")}
              </span>
            </span>
            <ChevronLeft className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-cyan-300 rtl:rotate-180" />
          </div>
        </button>
      </Reveal>

      {/* Grid */}
      {loading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-busy="true"
          aria-label={t("explore.loadingAria")}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <FadeIn>
          <EmptyState
            icon={Telescope}
            title={t("explore.errorTitle")}
            description={error}
            action={
              <Button variant="outline" onClick={fetchData}>
                {t("common.retry")}
              </Button>
            }
          />
        </FadeIn>
      ) : projects && projects.length === 0 ? (
        <FadeIn>
          <EmptyState
            icon={Telescope}
            title={t("explore.emptyTitle")}
            description={t("explore.emptyDescription")}
            action={
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4" /> {t("explore.clearFilters")}
              </Button>
            }
          />
        </FadeIn>
      ) : projects ? (
        <>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" gap={0.04}>
            {projects.map((p, i) =>
              i < 12 ? (
                <StaggerItem key={p.id}>
                  <ProjectCardView project={p} />
                </StaggerItem>
              ) : (
                <FadeIn key={p.id} y={12} duration={0.35}>
                  <ProjectCardView project={p} />
                </FadeIn>
              )
            )}
          </Stagger>

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" /> {t("explore.prev")}
              </Button>
              <span className="text-xs text-muted-foreground font-mono" aria-live="polite">
                {t("explore.pageStatus", { page: data.page, pages: data.pages })}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= data.pages || loading}
                onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
              >
                {t("explore.next")} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : null}
    </motion.div>
  );
}
