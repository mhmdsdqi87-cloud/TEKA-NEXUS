"use client";

// TEKA NEXUS — Arena Hub (Task 23).
// The beating heart of the platform's game layer: live TEKA Nights countdown,
// player stats (coins / team / title / cards / pet) and the full grid of the
// 12 arena worlds — every one of them a first-class page in the main nav.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Coins, Flame, Gamepad2, GraduationCap, IdCard, Sparkles, Swords } from "lucide-react";

import { useT } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { useOsSession } from "@/lib/os/session-store";
import { tekaEventWindow, formatCountdown } from "@/lib/os/events";
import { ARENA_GAMES, ACCENT_HEX } from "@/components/os/app-registry";
import { cn } from "@/lib/utils";

function StatChip({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]", tone)} aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-semibold text-foreground" dir="auto">{value}</span>
      </span>
    </div>
  );
}

export function ArenaHubView() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const user = useApp((s) => s.user);
  const fetchSession = useOsSession((s) => s.fetchSession);
  const session = useOsSession((s) => s.session);

  // Initial session load + 30s re-tick for the countdown.
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const event = session?.event ?? tekaEventWindow();
  const countdown = formatCountdown(event.nextStart);
  const isLive = event.active;

  const petEmoji = session?.pet
    ? ["🥚", "🐣", "🐥", "🦜", "🐉"][Math.min(4, session.pet.stage)]
    : null;

  return (
    <div data-testid="arena-hub" className="relative">
      {/* ── hero ── */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070b16]/80 p-6 sm:p-10">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b1430_0%,transparent_60%)]" />
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/[0.1] blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/[0.12] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-3 py-1 text-[11px] font-semibold tracking-widest text-cyan-200">
              <Swords className="h-3 w-3" /> {t("arena.hub.eyebrow")}
            </span>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-[11px] font-semibold text-rose-300">
                <Flame className="h-3 w-3" /> {t("arena.hub.nightsLive")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-400/[0.08] px-3 py-1 text-[11px] font-medium text-violet-200">
                <Sparkles className="h-3 w-3" /> {t("arena.hub.nightsIn")} {countdown}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              {t("arena.hub.title")}
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t("arena.hub.subtitle")}
          </p>

          {/* ── player stats ── */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            <StatChip icon={Coins} tone="text-amber-300" label={t("arena.hub.statCoins")} value={String(session?.coins ?? 0)} />
            <StatChip
              icon={Swords}
              tone={session?.team === "RED" ? "text-rose-300" : "text-sky-300"}
              label={t("arena.hub.statTeam")}
              value={session?.team ?? t("arena.hub.statNoTeam")}
            />
            <StatChip
              icon={Sparkles}
              tone="text-violet-300"
              label={t("arena.hub.statTitle")}
              value={session?.title ?? t("arena.hub.statNoTitle")}
            />
            <StatChip icon={IdCard} tone="text-cyan-300" label={t("arena.hub.statCards")} value={String(session?.cards.count ?? 0)} />
            <StatChip
              icon={Gamepad2}
              tone="text-emerald-300"
              label={t("arena.hub.statPet")}
              value={session?.pet ? `${petEmoji ?? ""} ${session.pet.name || t("arena.hub.statPetNone")}` : t("arena.hub.statPetNone")}
            />
          </div>
        </div>
      </section>

      {/* ── games grid ── */}
      <section className="mt-8" aria-label={t("arena.hub.gamesTitle")}>
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
          <span className="h-4 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" aria-hidden="true" />
          {t("arena.hub.gamesTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ARENA_GAMES.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              data-testid={`arena-card-${g.id}`}
              onClick={() => navigate({ name: g.id })}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-start transition-colors hover:border-white/[0.18] focus-glow"
              style={{ boxShadow: `0 14px 40px -28px ${ACCENT_HEX[g.accent]}` }}
            >
              <span
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.16]"
                style={{ background: ACCENT_HEX[g.accent] }}
              />
              <span className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-transform group-hover:scale-110"
                  style={{ color: ACCENT_HEX[g.accent] }}
                  aria-hidden="true"
                >
                  <g.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{t(g.titleKey)}</span>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70">
                    {g.id}
                  </span>
                </span>
              </span>
              <span className="mt-3 block text-xs leading-6 text-muted-foreground">{t(`arena.blurb.${g.id}`)}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── academy CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center"
      >
        <p className="text-sm text-muted-foreground">{t("arena.hub.academyCta")}</p>
        <button
          type="button"
          onClick={() => navigate({ name: "academyPortal" })}
          className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 text-sm font-semibold focus-glow"
        >
          <GraduationCap className="h-4 w-4" />
          {user ? t("nav.academy") : t("common.signIn")}
        </button>
        <p className="text-[11px] text-muted-foreground/60">{t("arena.hub.terminalHint")}</p>
      </motion.section>

      <span className="hidden">{tick}</span>
    </div>
  );
}
