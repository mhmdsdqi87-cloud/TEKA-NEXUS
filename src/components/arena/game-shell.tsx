"use client";

// TEKA NEXUS — Arena GameShell (Task 23).
// Full-page host for a single game. Provides the page header (icon, title,
// tagline, live coins chip) and a bounded "stage" so the h-full app roots
// behave exactly like they did inside OS windows.

import { useEffect } from "react";
import { Coins } from "lucide-react";

import { useT } from "@/lib/i18n";
import { useOsSession } from "@/lib/os/session-store";
import { cn } from "@/lib/utils";
import type { ArenaGame, GameAccent } from "@/components/os/app-registry";

const ACCENT_CLASSES: Record<GameAccent, { text: string; ring: string; chip: string }> = {
  cyan: { text: "text-cyan-300", ring: "ring-cyan-400/25", chip: "bg-cyan-400/10 text-cyan-200 border-cyan-400/25" },
  violet: { text: "text-violet-300", ring: "ring-violet-400/25", chip: "bg-violet-400/10 text-violet-200 border-violet-400/25" },
  ember: { text: "text-amber-300", ring: "ring-amber-400/25", chip: "bg-amber-400/10 text-amber-200 border-amber-400/25" },
  emerald: { text: "text-emerald-300", ring: "ring-emerald-400/25", chip: "bg-emerald-400/10 text-emerald-200 border-emerald-400/25" },
};

export function GameShell({ game, children }: { game: ArenaGame; children: React.ReactNode }) {
  const t = useT();
  const fetchSession = useOsSession((s) => s.fetchSession);
  const session = useOsSession((s) => s.session);
  const accent = ACCENT_CLASSES[game.accent];

  // Keep the shared session warm — every game reads coins/team/title from it.
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <div className="flex flex-col gap-5" data-testid={`arena-view-${game.id}`}>
      {/* ── page header ── */}
      <header className="flex flex-wrap items-center gap-4">
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] ring-1",
            accent.text,
            accent.ring,
          )}
          aria-hidden="true"
        >
          <game.icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{t(game.titleKey)}</h1>
          <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
            {t(`arena.blurb.${game.id}`)}
          </p>
        </div>
        {session && (
          <span
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold",
              accent.chip,
            )}
            aria-label={t("arena.hub.statCoins")}
          >
            <Coins className="h-3.5 w-3.5" />
            {session.coins}
          </span>
        )}
      </header>

      {/* ── bounded stage ── */}
      <div className="h-[calc(100dvh-15rem)] min-h-[540px] overflow-hidden rounded-2xl border border-white/10 bg-[#070b16]/70 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        {children}
      </div>
    </div>
  );
}
