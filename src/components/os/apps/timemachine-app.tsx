"use client";

// TEKA OS — Time Machine app (Task 19-g).
// Cinematic replay of the user's whole journey: join day → first lesson →
// course completions → certificates → bosses → crimes → cards → now.
// PLAY auto-advances a glowing highlight through the milestones every 1.2s,
// auto-scrolling the timeline; STOP cancels. Final node = present day + XP.

import { useEffect, useMemo, useRef, useState } from "react";
import { Hourglass, Loader2, RotateCcw, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { get } from "@/lib/api";
import { useFormatDate, useT } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";
import { OS_STRINGS, pickL } from "@/lib/os/strings";

type Milestone = { date: string; icon: string; fa: string; en: string; detail?: string };
type TimeMachineResponse = { displayName: string; memberSince: string; milestones: Milestone[] };

const STEP_MS = 1200;
const DAY_MS = 86_400_000;

export function TimeMachineApp() {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const fmtDate = useFormatDate();
  const S = OS_STRINGS.timemachine;
  const L = (key: keyof typeof S) => pickL(S[key], locale);

  const [data, setData] = useState<TimeMachineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1); // -1 = nothing highlighted yet
  const [reloadKey, setReloadKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    get<TimeMachineResponse>("/api/os/timemachine")
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

  const milestones = data?.milestones ?? [];
  const total = milestones.length;
  const memberSinceMs = useMemo(() => (data ? Date.parse(data.memberSince) : 0), [data]);

  /** "روز {n}" — days since membership for one milestone. */
  const dayLabel = (m: Milestone) => {
    const n = Math.max(0, Math.round((Date.parse(m.date) - memberSinceMs) / DAY_MS));
    return L("dayX").replace("{n}", String(n));
  };

  // Playback ticker — advance the highlight every STEP_MS.
  useEffect(() => {
    if (!playing || total === 0) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => Math.min(i + 1, total - 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, total]);

  // Auto-stop once the present-day node (the final milestone) is reached.
  useEffect(() => {
    if (!playing || total === 0 || activeIdx < total - 1) return;
    const to = window.setTimeout(() => setPlaying(false), STEP_MS + 100);
    return () => window.clearTimeout(to);
  }, [playing, activeIdx, total]);

  // Keep the active node centered in the scroll container while replaying.
  useEffect(() => {
    if (!playing || activeIdx < 0) return;
    const container = scrollRef.current;
    const node = container?.querySelector<HTMLElement>(`[data-node="${activeIdx}"]`);
    if (!container || !node) return;
    const cRect = container.getBoundingClientRect();
    const nRect = node.getBoundingClientRect();
    const target = container.scrollTop + (nRect.top - cRect.top) - container.clientHeight / 2 + nRect.height / 2;
    container.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  }, [activeIdx, playing]);

  const start = () => {
    setActiveIdx(0);
    setPlaying(true);
  };
  const stop = () => setPlaying(false);

  const retry = () => {
    setError(null);
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const title = data ? L("journeyOf").replace("{name}", data.displayName) : t("os.apps.timemachine");
  const isEmpty = !loading && !error && total <= 2;
  const active = activeIdx >= 0 ? milestones[activeIdx] : undefined;

  return (
    <div ref={scrollRef} className="h-full space-y-4 overflow-y-auto p-4 teka-os-scroll">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <Hourglass className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
            <span dir="auto">{title}</span>
          </h2>
          <p dir="auto" className="mt-0.5 text-xs text-white/45">
            {L("tagline")}
          </p>
        </div>
        {!isEmpty && (
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-white/50">
            {activeIdx >= 0 ? `${activeIdx + 1}/${total}` : `0/${total}`}
          </div>
        )}
      </div>

      {/* Player bar */}
      {!loading && !error && !isEmpty && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          {playing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={stop}
              className="gap-2 border-rose-400/30 text-rose-300 hover:bg-rose-400/10 hover:text-rose-200"
            >
              <Square className="h-3.5 w-3.5" aria-hidden />
              {L("stop")}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={start}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-sky-400 font-semibold text-slate-950 hover:from-cyan-400 hover:to-sky-300"
            >
              <Hourglass className="h-3.5 w-3.5" aria-hidden />
              {L("play")}
            </Button>
          )}
          <p className="min-h-5 flex-1 font-mono text-[11px] text-white/55" aria-live="polite">
            {active ? dayLabel(active) : "—"}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-xs text-white/40" aria-busy="true">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-300" aria-hidden /> syncing…
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
      ) : isEmpty ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center" role="status">
          <Hourglass className="h-6 w-6 text-cyan-300/60" aria-hidden />
          <p dir="auto" className="text-sm text-white/60">
            {L("empty")}
          </p>
        </div>
      ) : (
        /* Timeline */
        <div className="relative mx-auto max-w-xl pb-2">
          <div
            aria-hidden
            className="absolute bottom-4 top-4 w-px bg-gradient-to-b from-cyan-400/50 via-white/10 to-white/5 start-[19px]"
          />
          <ol className="space-y-4">
            {milestones.map((m, i) => {
              const isActive = i === activeIdx;
              const isPast = activeIdx >= 0 && i < activeIdx;
              return (
                <li key={`${m.date}-${i}`} data-node={i} className="relative flex items-start gap-4">
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-500 ${
                      isActive
                        ? "scale-110 border-cyan-300/80 bg-cyan-400/15 shadow-[0_0_22px_rgba(34,211,238,0.55)]"
                        : isPast
                          ? "border-white/10 bg-white/[0.03] opacity-45"
                          : "border-white/15 bg-white/[0.05]"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span aria-hidden>{m.icon}</span>
                  </div>
                  <div
                    className={`min-w-0 flex-1 rounded-xl border p-3 transition-all duration-500 ${
                      isActive
                        ? "border-cyan-400/30 bg-cyan-400/[0.06]"
                        : isPast
                          ? "border-white/[0.06] bg-white/[0.02] opacity-60"
                          : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[10px] text-white/40">
                      <span>{fmtDate(m.date)}</span>
                      <span aria-hidden>·</span>
                      <span className="text-cyan-300/80">{dayLabel(m)}</span>
                    </div>
                    <p dir="auto" className="mt-1 text-sm text-white/85">
                      {pickL(m, locale)}
                    </p>
                    {m.detail ? (
                      <p dir="ltr" className="mt-1 truncate font-mono text-[10px] text-white/30">
                        {m.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
