"use client";

// TEKA NEXUS — Weekly Challenge card (Live Pulse, Task pulse-1).
// Shows the active Iranian-week challenge, a live countdown, community
// participation counters and the viewer's own progress. Joining is one
// click; completion is auto-detected server-side (?sync=1).

import { useCallback, useEffect, useState } from "react";
import { Flame, Swords, Trophy, Users } from "lucide-react";
import { toast } from "sonner";

import { get, post } from "@/lib/api";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FadeIn } from "@/components/shared/motion";

type ChallengeResponse = {
  challenge: {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    target: number;
    weekStart: string;
    weekEnd: string;
  };
  stats: { entries: number; completed: number; weekActions: number };
  myEntry: { progress: number; target: number; completed: boolean } | null;
  myWeekActivity: number;
};

export function ChallengeCard() {
  const t = useT();
  const user = useApp((s) => s.user);

  const [data, setData] = useState<ChallengeResponse | null>(null);
  const [error, setError] = useState(false);
  const [joining, setJoining] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(
    async (sync: boolean) => {
      try {
        const res = await get<ChallengeResponse>(`/api/challenge${sync ? "?sync=1" : ""}`);
        setData(res);
        setError(false);
      } catch {
        setError(true);
      }
    },
    []
  );

  useEffect(() => {
    void load(false);
  }, [load]);

  // countdown tick + progress sync every 45s
  useEffect(() => {
    const c = setInterval(() => setNow(Date.now()), 30_000);
    const s = setInterval(() => {
      if (!document.hidden) void load(true);
    }, 45_000);
    return () => {
      clearInterval(c);
      clearInterval(s);
    };
  }, [load]);

  const join = async () => {
    if (!user) {
      toast.info(t("pulse.challenge.loginRequired"));
      return;
    }
    setJoining(true);
    try {
      await post("/api/challenge", { action: "join" });
      await load(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("pulse.challenge.loadError"));
    } finally {
      setJoining(false);
    }
  };

  const daysLeft = data ? Math.max(0, Math.floor((new Date(data.challenge.weekEnd).getTime() - now) / 86_400_000)) : 0;
  const hoursLeft = data ? Math.max(0, Math.floor((new Date(data.challenge.weekEnd).getTime() - now) / 3_600_000) % 24) : 0;

  const progress = data?.myEntry ? Math.min(100, Math.round((data.myEntry.progress / data.myEntry.target) * 100)) : 0;
  const completed = data?.myEntry?.completed ?? false;

  return (
    <FadeIn className="h-full">
      <section
        aria-label={t("pulse.challenge.badge")}
        className={cn(
          "glass-card relative h-full overflow-hidden rounded-2xl p-5",
          completed && "border-amber-400/30"
        )}
      >
        {/* ambient glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />

        <header className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {t("pulse.challenge.badge")}
          </span>
          {data && (
            <span className="mr-auto font-mono text-[11px] text-muted-foreground" dir="ltr">
              {daysLeft > 0 ? t("pulse.challenge.daysLeft", { days: daysLeft }) : t("pulse.challenge.hoursLeft", { hours: hoursLeft })}
            </span>
          )}
        </header>

        {error ? (
          <p className="text-sm text-muted-foreground">{t("pulse.challenge.loadError")}</p>
        ) : !data ? (
          <div className="space-y-3" aria-busy="true">
            <div className="h-6 w-2/3 animate-pulse rounded-md bg-white/[0.06]" />
            <div className="h-4 w-full animate-pulse rounded-md bg-white/[0.04]" />
            <div className="h-9 w-full animate-pulse rounded-md bg-white/[0.04]" />
          </div>
        ) : (
          <>
            <h3 className="font-display text-lg font-bold">{data.challenge.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{data.challenge.description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-300" dir="ltr">
                +{data.challenge.xpReward} XP
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-muted-foreground">
                <Users className="h-3 w-3" aria-hidden="true" />
                {t("pulse.challenge.joinedCount", { count: data.stats.entries })}
              </span>
              {data.stats.completed > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-muted-foreground">
                  <Trophy className="h-3 w-3 text-amber-300" aria-hidden="true" />
                  {t("pulse.challenge.completedCount", { count: data.stats.completed })}
                </span>
              )}
            </div>

            {/* progress / join */}
            <div className="mt-4">
              {data.myEntry ? (
                completed ? (
                  <div className="flex items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/10 px-3 py-2.5">
                    <Trophy className="h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
                    <p className="text-sm font-semibold text-amber-200">
                      {t("pulse.challenge.completed", { xp: data.challenge.xpReward })}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Swords className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                        {t("pulse.challenge.joined")}
                      </span>
                      <span className="font-mono text-muted-foreground" dir="ltr">
                        {t("pulse.challenge.progressOf", { done: Math.min(data.myEntry.progress, data.myEntry.target), target: data.myEntry.target })}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2 bg-white/[0.06] [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-rose-400" />
                  </div>
                )
              ) : (
                <Button
                  onClick={join}
                  disabled={joining}
                  className="w-full bg-gradient-to-r from-amber-500 to-rose-500 font-bold text-white hover:from-amber-400 hover:to-rose-400"
                >
                  <Flame className="h-4 w-4" aria-hidden="true" />
                  {joining ? "…" : t("pulse.challenge.join")}
                </Button>
              )}
            </div>
          </>
        )}
      </section>
    </FadeIn>
  );
}
