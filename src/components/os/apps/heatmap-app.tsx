"use client";

// TEKA OS — Heatmap app (Task 19-g).
// GitHub-style activity grid over the last 371 days (53 week columns × 7
// rows), fed by /api/os/heatmap. Emerald intensity scale, per-kind filters
// with client-side recomputation, month labels, legend and total chip.

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Activity, Flame, Loader2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { get } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";
import { localeMeta } from "@/lib/i18n/locales";
import { OS_STRINGS, pickL } from "@/lib/os/strings";

type HeatmapDay = { date: string; total: number; kinds: Record<string, number> };
type HeatmapResponse = { days: HeatmapDay[]; total: number; kinds: string[] };

const CELL = 11; // px square
const GAP = 3; // px gap → each column step is 14px

/** Intensity bucket from a day's count (identical semantics client & server). */
function levelOf(n: number): 0 | 1 | 2 | 3 | 4 {
  if (n <= 0) return 0;
  if (n <= 2) return 1;
  if (n <= 5) return 2;
  if (n <= 9) return 3;
  return 4;
}

function cellClass(n: number): string {
  switch (levelOf(n)) {
    case 1:
      return "bg-emerald-900";
    case 2:
      return "bg-emerald-700";
    case 3:
      return "bg-emerald-500";
    case 4:
      // Top bucket glows.
      return "bg-emerald-300 shadow-[0_0_6px_rgba(110,231,183,0.75)]";
    default:
      return "bg-white/[0.05]";
  }
}

const LEGEND_LEVELS = ["bg-white/[0.05]", "bg-emerald-900", "bg-emerald-700", "bg-emerald-500", "bg-emerald-300"];

export function HeatmapApp() {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const S = OS_STRINGS.heatmap;
  const L = (key: keyof typeof S) => pickL(S[key], locale);

  const [data, setData] = useState<HeatmapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null); // null = all kinds
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    get<HeatmapResponse>("/api/os/heatmap")
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Request failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // 371 sequential days → 53 week columns of 7 squares.
  const weeks = useMemo(() => {
    if (!data) return [] as HeatmapDay[][];
    const out: HeatmapDay[][] = [];
    for (let i = 0; i < data.days.length; i += 7) out.push(data.days.slice(i, i + 7));
    return out;
  }, [data]);

  const visibleTotal = useMemo(
    () =>
      data
        ? data.days.reduce((acc, d) => acc + (filter ? (d.kinds[filter] ?? 0) : d.total), 0)
        : 0,
    [data, filter],
  );

  // Month labels — one per column whose leading day starts a new month,
  // absolutely positioned over the grid (grid itself is forced dir="ltr").
  const monthLabels = useMemo(() => {
    const dl = localeMeta(locale).dateLocale;
    const labels: { left: number; text: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const first = week[0];
      if (!first) return;
      const m = new Date(`${first.date}T00:00:00`).getMonth();
      if (m !== lastMonth) {
        labels.push({
          left: wi * (CELL + GAP),
          text: format(new Date(`${first.date}T00:00:00`), "MMM", { locale: dl }),
        });
      }
      lastMonth = m;
    });
    return labels;
  }, [weeks, locale]);

  // Squares are memoized together with the labels — 371 cells re-render only
  // when the data, the filter or the locale (labels) change.
  const grid = useMemo(
    () => (
      <div className="flex" style={{ gap: GAP }}>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
            {week.map((day) => {
              const n = filter ? (day.kinds[filter] ?? 0) : day.total;
              return (
                <div
                  key={day.date}
                  title={`${day.date}: ${n}`}
                  className={`h-[11px] w-[11px] rounded-[2.5px] transition-transform duration-100 hover:scale-125 hover:ring-1 hover:ring-white/40 ${cellClass(n)}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    ),
    [weeks, filter],
  );

  const retry = () => {
    setError(null);
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const gridWidth = Math.max(0, weeks.length * (CELL + GAP) - GAP);

  return (
    <div className="h-full space-y-4 overflow-y-auto p-4 teka-os-scroll">
      {/* Header: title + tagline + total chip */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <Activity className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
            {t("os.apps.heatmap")}
          </h2>
          <p dir="auto" className="mt-0.5 text-xs text-white/45">
            {L("tagline")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-white/50">
            {L("lastYear")}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] text-emerald-300">
            <Flame className="h-3 w-3" aria-hidden />
            {L("total").replace("{n}", String(visibleTotal))}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3" aria-busy="true">
          <div className="h-[110px] w-full animate-pulse rounded-xl bg-white/[0.04]" />
          <div className="h-8 w-2/3 animate-pulse rounded-full bg-white/[0.03]" />
          <div className="mx-auto flex items-center gap-2 text-xs text-white/40">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> syncing…
          </div>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-4 text-sm text-rose-200" role="alert">
          <p dir="auto">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={retry}
            className="mt-3 gap-2 border-rose-400/30 text-rose-200 hover:bg-rose-400/10 hover:text-rose-100"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> retry
          </Button>
        </div>
      ) : !data || data.total === 0 ? (
        <div
          className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center"
          role="status"
        >
          <Activity className="h-6 w-6 text-emerald-300/60" aria-hidden />
          <p dir="auto" className="text-sm text-white/60">
            {L("empty")}
          </p>
        </div>
      ) : (
        <>
          {/* Grid — forced LTR like GitHub, inside the RTL-aware window */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div dir="ltr" className="overflow-x-auto pb-1 teka-os-scroll">
              <div className="min-w-max">
                <div className="relative h-3.5" style={{ width: gridWidth }}>
                  {monthLabels.map((m, i) => (
                    <span
                      key={`${m.text}-${i}`}
                      className="absolute top-0 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-white/35"
                      style={{ left: m.left }}
                    >
                      {m.text}
                    </span>
                  ))}
                </div>
                <div className="mt-1.5" role="img" aria-label={L("total").replace("{n}", String(visibleTotal))}>
                  {grid}
                </div>
              </div>
            </div>

            {/* Legend: کم → زیاد */}
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-white/40" dir="ltr">
              <span>{L("legendLess")}</span>
              {LEGEND_LEVELS.map((c) => (
                <span key={c} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
              ))}
              <span>{L("legendMore")}</span>
            </div>
          </div>

          {/* Kind filter chips — client-side intensity recompute */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="filter by activity kind">
            <FilterChip active={filter === null} onClick={() => setFilter(null)}>
              all
            </FilterChip>
            {data.kinds.map((k) => (
              <FilterChip key={k} active={filter === k} onClick={() => setFilter(filter === k ? null : k)}>
                {k}
              </FilterChip>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors ${
        active
          ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
          : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/25 hover:text-white/75"
      }`}
    >
      {children}
    </button>
  );
}
