"use client";

// TEKA NEXUS — Nexus Command Center (Task 13: "یکه بخش جذاب برای ترمینال و گیت‌هاب").
// The dedicated live hub: real-time community counters, the live activity
// feed, the Nexus Terminal (v3), NEXUS AI, the GitHub Command Center and the
// weekly challenge + leaderboard — everything explosive, one view.

import { useCallback, useEffect, useState } from "react";
import { Radio } from "lucide-react";

import { get } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { AnimatedNumber, FadeIn, Reveal, Stagger, StaggerItem } from "@/components/shared/motion";

import { ActivityFeed } from "@/components/pulse/activity-feed";
import { NexusTerminal } from "@/components/pulse/nexus-terminal";
import { NexusAI } from "@/components/pulse/nexus-ai";
import { GithubHub } from "@/components/pulse/github-hub";
import { ChallengeCard } from "@/components/pulse/challenge-card";
import { LeaderboardCard } from "@/components/pulse/leaderboard-card";
import type { PulseStats } from "@/components/pulse/events";

const COUNTER_REFRESH_MS = 15000;

export function LiveView() {
  const t = useT();

  const [stats, setStats] = useState<PulseStats | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await get<{ stats: PulseStats }>("/api/pulse");
      setStats(res.stats);
    } catch {
      /* counters just stay stale */
    }
  }, []);

  useEffect(() => {
    // Fetch-on-mount: syncing React state from the API (an external system) —
    // setState happens after the await, not synchronously; the analyzer
    // can't see through the callback boundary.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchStats();
    const timer = setInterval(fetchStats, COUNTER_REFRESH_MS);
    return () => clearInterval(timer);
  }, [fetchStats]);

  const counters: { key: keyof PulseStats; label: string; accent: string }[] = [
    { key: "users", label: t("pulse.live.counters.users"), accent: "text-cyan-300" },
    { key: "projects", label: t("pulse.live.counters.projects"), accent: "text-violet-300" },
    { key: "likes", label: t("pulse.live.counters.likes"), accent: "text-rose-300" },
    { key: "comments", label: t("pulse.live.counters.comments"), accent: "text-amber-300" },
    { key: "chats", label: t("pulse.live.counters.chats"), accent: "text-emerald-300" },
    { key: "follows", label: t("pulse.live.counters.follows"), accent: "text-sky-300" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-4 md:px-6 md:pt-6">
      {/* Hero */}
      <FadeIn className="mb-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-violet-500/[0.08] p-5 md:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(34,211,238,0.35) 4px, transparent 5px)",
            }}
          />
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10">
              <Radio className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {t("pulse.live.title")}
                </h1>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-emerald-300"
                  dir="ltr"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {t("pulse.live.badge")}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t("pulse.live.subtitle")}</p>
            </div>
          </div>

          {/* live counters */}
          <Stagger className="relative mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6" gap={0.05} aria-label={t("pulse.live.countersTitle")}>
            {counters.map((c) => (
              <StaggerItem key={c.key}>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-2 py-2.5 text-center">
                  <AnimatedNumber
                    value={stats?.[c.key] ?? 0}
                    className={cnCounter(c.accent)}
                  />
                  <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {c.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </FadeIn>

      {/* Feed + challenge/leaderboard */}
      <div className="mb-6 grid gap-4 lg:grid-cols-5">
        <Reveal y={12} className="lg:col-span-3">
          <ActivityFeed className="h-full" />
        </Reveal>
        <div className="space-y-4 lg:col-span-2">
          <Reveal y={12}>
            <ChallengeCard />
          </Reveal>
          <Reveal y={12}>
            <LeaderboardCard />
          </Reveal>
        </div>
      </div>

      {/* Terminal */}
      <Reveal y={12} className="mb-6">
        <NexusTerminal />
      </Reveal>

      {/* NEXUS AI */}
      <Reveal y={12} className="mb-6">
        <NexusAI />
      </Reveal>

      {/* GitHub Command Center */}
      <Reveal y={12}>
        <GithubHub />
      </Reveal>
    </div>
  );
}

function cnCounter(accent: string): string {
  return `font-display text-lg font-bold tabular-nums md:text-xl ${accent}`;
}
