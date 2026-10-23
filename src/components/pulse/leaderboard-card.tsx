"use client";

// TEKA NEXUS — Leaderboard card (Live Pulse, Task pulse-1).
// Two ranges: this week's weighted activity score and the all-time XP
// ranking. Level chips derived from src/lib/xp.ts; the authed viewer's
// row is always highlighted even outside the top 10.

import { useCallback, useEffect, useState } from "react";
import { Crown, Medal } from "lucide-react";

import { get } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { levelFromXp, levelTitleKey } from "@/lib/xp";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/shared/atoms";
import { FadeIn } from "@/components/shared/motion";

type Row = {
  rank: number;
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  xp: number;
  reputation: number;
  score: number;
  isMe: boolean;
};

type LeaderboardResponse = { range: string; rows: Row[] };

const RANK_STYLE: Record<number, string> = {
  1: "border-amber-300/50 bg-amber-400/15 text-amber-300",
  2: "border-slate-300/40 bg-slate-300/10 text-slate-200",
  3: "border-orange-400/40 bg-orange-500/10 text-orange-300",
};

export function LeaderboardCard() {
  const t = useT();

  const [range, setRange] = useState<"week" | "all">("week");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async (r: "week" | "all") => {
    try {
      const res = await get<LeaderboardResponse>(`/api/leaderboard?range=${r}`);
      setRows(res.rows);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    // Fetch-on-mount/range-change: syncing React state from the API (an
    // external system) — the setState happens after the await, so this is
    // not a synchronous cascading render; the analyzer can't see through
    // the callback boundary.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(range);
  }, [range, load]);

  // refresh weekly board periodically (activity flows in constantly)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) void load(range);
    }, 60_000);
    return () => clearInterval(timer);
  }, [range, load]);

  const levelInfo = (xp: number) => ({
    level: levelFromXp(xp),
    title: t(`pulse.leaderboard.levelTitles.${levelTitleKey(levelFromXp(xp))}`),
  });

  return (
    <FadeIn delay={0.06} className="h-full">
      <section aria-label={t("pulse.leaderboard.title")} className="glass-card h-full rounded-2xl p-5">
        <header className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
            <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            {t("pulse.leaderboard.title")}
          </span>
          <Tabs
            value={range}
            onValueChange={(v) => {
              setRange(v as "week" | "all");
              setRows(null); // immediate clear on tab switch (event handler — safe)
            }}
            className="mr-auto"
          >
            <TabsList className="h-8 bg-white/[0.05]">
              <TabsTrigger value="week" className="px-3 text-xs">
                {t("pulse.leaderboard.week")}
              </TabsTrigger>
              <TabsTrigger value="all" className="px-3 text-xs">
                {t("pulse.leaderboard.allTime")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        {error ? (
          <p className="text-sm text-muted-foreground">{t("pulse.challenge.loadError")}</p>
        ) : !rows ? (
          <div className="space-y-2.5" aria-busy="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-11 animate-pulse rounded-xl bg-white/[0.04]" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">{t("pulse.leaderboard.empty")}</p>
        ) : (
          <ol className="max-h-80 space-y-1.5 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10">
            {rows.map((r) => {
              const { level, title } = levelInfo(r.xp);
              return (
                <li
                  key={r.id}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition",
                    r.isMe ? "border border-cyan-400/40 bg-cyan-500/10" : "hover:bg-white/[0.04]",
                    r.rank <= 3 && !r.isMe && "bg-white/[0.03]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-black",
                      RANK_STYLE[r.rank] ?? "border-white/10 bg-white/[0.04] text-muted-foreground",
                      r.rank === -1 && "border-cyan-400/40 bg-cyan-500/10 text-cyan-300"
                    )}
                    dir="ltr"
                  >
                    {r.rank === 1 ? <Medal className="h-3.5 w-3.5" /> : r.rank > 0 ? r.rank : "…"}
                  </span>
                  <UserAvatar
                    user={{ username: r.username, displayName: r.displayName, avatarColor: r.avatarColor, avatarUrl: r.avatarUrl }}
                    size={30}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold leading-5">
                      {r.displayName}
                      {r.isMe && (
                        <span className="ml-1.5 rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">
                          {t("pulse.leaderboard.you")}
                        </span>
                      )}
                    </p>
                    <p className="truncate text-[10.5px] text-muted-foreground" dir="ltr">
                      @{r.username} · {title}
                    </p>
                  </div>
                  <div className="shrink-0 text-left" dir="ltr">
                    <p className="text-[13px] font-black text-foreground">
                      {range === "all" ? t("pulse.leaderboard.xp", { xp: r.xp.toLocaleString("en-US") }) : t("pulse.leaderboard.score", { score: r.score.toLocaleString("en-US") })}
                    </p>
                    <p className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("pulse.leaderboard.level", { level })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </FadeIn>
  );
}
