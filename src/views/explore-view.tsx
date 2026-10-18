"use client";

// TEKA NEXUS — Explore view (Task 2-b).
// Discovery directory: search + category/status filters + sort tabs,
// responsive project grid, page navigation. Stale responses discarded
// via a request-id ref.

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, Telescope, X } from "lucide-react";
import { toast } from "sonner";

import { useApp } from "@/lib/store";
import { get, qs } from "@/lib/api";
import { type ProjectCard } from "@/lib/dto";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/constants";

import { EmptyState } from "@/components/shared/atoms";
import { ProjectCardView, ProjectCardSkeleton } from "@/components/shared/project-card";
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

const SORT_TABS: { value: SortKey; label: string }[] = [
  { value: "recent", label: "Recent" },
  { value: "updated", label: "Active" },
  { value: "popular", label: "Popular" },
];

export function ExploreView() {
  const view = useApp((s) => s.view);
  const initialQuery = view.name === "explore" ? (view.query ?? "") : "";

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
    const t = setTimeout(() => {
      setQ(input);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
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
        const msg = e instanceof Error ? e.message : "Failed to load projects";
        setError(msg);
        toast.error(msg);
      }
    } finally {
      if (reqId.current === id) setLoading(false);
    }
  }, [q, category, status, sort, page]);

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
      <div className="flex items-end justify-between gap-4 mb-5">
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Explore</h1>
          <p className="text-sm text-muted-foreground mt-1" aria-live="polite">
            {loading && !data ? "Loading projects…" : `${data?.total ?? 0} project${data?.total === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-card rounded-xl p-3 sticky top-14 z-30 backdrop-blur-md mb-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1 min-w-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search projects, taglines, tags…"
              aria-label="Search projects"
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
                aria-label="Filter by category"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {PROJECT_CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
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
                aria-label="Filter by status"
              >
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {PROJECT_STATUSES.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.name}
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
              <X className="h-3.5 w-3.5" /> Clear
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
          <TabsList className="bg-white/[0.04] h-9" aria-label="Sort projects">
            {SORT_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs px-3.5">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Grid */}
      {loading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-busy="true"
          aria-label="Loading projects"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          icon={Telescope}
          title="Could not load projects"
          description={error}
          action={
            <Button variant="outline" onClick={fetchData}>
              Try again
            </Button>
          }
        />
      ) : projects && projects.length === 0 ? (
        <EmptyState
          icon={Telescope}
          title="No projects match"
          description="Try clearing filters or a different search."
          action={
            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4" /> Clear filters
            </Button>
          }
        />
      ) : projects ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCardView key={p.id} project={p} />
            ))}
          </div>

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </Button>
              <span className="text-xs text-muted-foreground font-mono" aria-live="polite">
                Page {data.page} of {data.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= data.pages || loading}
                onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : null}
    </motion.div>
  );
}
