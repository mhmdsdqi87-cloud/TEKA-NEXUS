"use client";

// TEKA NEXUS — TEKA OS desktop root (Task 19).
// Wallpaper + desktop icons + windows layer + taskbar + start menu +
// matrix mode + the TEKA NIGHTS status strip. The OS is the new post-login
// home; every existing view is reachable as a window app.

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Search, Sparkles, Coins, Flame, Info, Swords, Timer, X } from "lucide-react";

import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { useOs } from "@/lib/os/os-store";
import { useOsSession } from "@/lib/os/session-store";
import { tekaEventWindow, formatCountdown } from "@/lib/os/events";
import { OS_APPS, getOsApp } from "./app-registry";
import { WindowFrame } from "./window-frame";
import { MatrixOverlay } from "./matrix-overlay";
import { LogoMark } from "@/components/brand/logo";

export function OsRoot() {
  const t = useT();
  const user = useApp((s) => s.user);
  const windows = useOs((s) => s.windows);
  const openApp = useOs((s) => s.openApp);
  const focus = useOs((s) => s.focus);
  const close = useOs((s) => s.close);
  const startOpen = useOs((s) => s.startOpen);
  const setStartOpen = useOs((s) => s.setStartOpen);
  const setMatrix = useOs((s) => s.setMatrix);
  const matrix = useOs((s) => s.matrix);
  const fetchSession = useOsSession((s) => s.fetchSession);
  const session = useOsSession((s) => s.session);

  // Initial session load + keep the countdown honest.
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // Ctrl+Shift+M → matrix toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "M" || e.key === "m")) {
        e.preventDefault();
        setMatrix(!matrix);
        toast(matrix ? t("os.matrix.disable") : t("os.matrix.enable"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [matrix, setMatrix, t]);

  // New milestone cards → celebration toast.
  useEffect(() => {
    if (session?.newCards?.length) {
      for (const kind of session.newCards) toast.success(`🃏 ${kind}`);
    }
  }, [session?.newCards]);

  const clock = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    } catch {
      return "";
    }
  }, []);

  // Re-tick the clock + countdown every 30s.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const event = session?.event ?? tekaEventWindow();
  const countdown = formatCountdown(event.nextStart);

  const desktopApps = OS_APPS.filter((a) => a.desktop);
  const isLive = event.active;

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#04060e]" dir="ltr">
      {/* ── wallpaper ── */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b1430_0%,#04060e_55%)]" />
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-violet-500/[0.08] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        {isLive && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.12),transparent_65%)]" />
        )}
      </div>

      {/* ── status strip ── */}
      <div className="relative z-20 flex h-9 shrink-0 items-center justify-between border-b border-white/[0.06] bg-black/30 px-3 font-mono text-[10px] tracking-widest text-white/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-300/80">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            TEKA OS
          </span>
          <span className="hidden sm:inline">{user?.displayName ?? "developer"}</span>
          {session?.title && <span className="hidden text-amber-300/80 md:inline">{session.title}</span>}
        </div>
        <div className="flex items-center gap-3">
          {isLive ? (
            <span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-300">
              <Flame size={10} /> {t("os.status.eventLive")}
            </span>
          ) : (
            <span className="hidden items-center gap-1 sm:flex" title={t("os.status.eventIn")}>
              <Sparkles size={10} className="text-violet-300/70" /> {t("os.status.eventIn")} {countdown}
            </span>
          )}
          <span data-testid="os-coins" className="flex items-center gap-1 text-amber-300/90">
            <Coins size={10} /> {session?.coins ?? 0}
          </span>
          <span>{clock}</span>
        </div>
      </div>

      {/* ── desktop icons ── */}
      <main className="relative z-10 min-h-0 flex-1 p-4 sm:p-6" onClick={() => setStartOpen(false)}>
        <div className="grid max-w-4xl grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 md:grid-cols-8">
          {desktopApps.map((app) => (
            <button
              key={app.id}
              type="button"
              data-testid={`os-icon-${app.id}`}
              onClick={(e) => {
                e.stopPropagation();
                openApp(app.id);
              }}
              className="group flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg transition group-hover:scale-105"
                style={{ boxShadow: `0 8px 24px -12px ${app.accent === "violet" ? "#a78bfa" : app.accent === "ember" ? "#fbbf24" : app.accent === "emerald" ? "#34d399" : "#22d3ee"}` }}
              >
                <app.icon size={22} className="text-white/85" />
              </span>
              <span className="text-center text-[10px] font-medium leading-tight text-white/70" dir="auto">
                {t(app.titleKey)}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 max-w-md text-xs leading-relaxed text-white/35" dir="auto">
          {t("os.welcomeHint")}
        </p>
      </main>

      {/* ── start menu ── */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-16 left-3 z-40 w-[min(92vw,420px)] overflow-hidden rounded-2xl border border-white/10 bg-[#070b16]/95 shadow-2xl backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
              <Search size={14} className="text-white/40" />
              <input
                autoFocus
                placeholder={t("os.start.search")}
                className="w-full bg-transparent text-sm text-white/85 outline-none placeholder:text-white/30"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = e.currentTarget.value.trim().toLowerCase();
                    const hit = OS_APPS.find(
                      (a) => a.id.includes(q) || t(a.titleKey).toLowerCase().includes(q),
                    );
                    if (hit) openApp(hit.id);
                  }
                }}
              />
            </div>
            <div className="grid max-h-72 grid-cols-4 gap-1 overflow-y-auto p-2 teka-os-scroll">
              {OS_APPS.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => openApp(app.id)}
                  className="flex flex-col items-center gap-1 rounded-xl p-2.5 transition hover:bg-white/[0.07]"
                >
                  <app.icon size={18} className="text-white/80" />
                  <span className="text-center text-[10px] text-white/65" dir="auto">{t(app.titleKey)}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2">
              <button
                type="button"
                data-testid="os-start-about"
                onClick={() => {
                  setStartOpen(false);
                  useApp.getState().navigate({ name: "about" });
                }}
                className="text-[11px] text-white/45 transition hover:text-violet-300"
              >
                <Info size={11} className="me-1 inline" />
                {t("os.start.about")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStartOpen(false);
                  useApp.getState().navigate({ name: "home" });
                }}
                className="text-[11px] text-white/45 transition hover:text-cyan-300"
              >
                ⏻ {t("os.start.power")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── windows layer ── */}
      {windows.map((win) => {
        const app = getOsApp(win.appId);
        if (!app) return null;
        const Comp = app.component;
        return (
          <WindowFrame key={win.id} win={win} title={t(app.titleKey)} accent={app.accent}>
            <Comp />
          </WindowFrame>
        );
      })}

      {/* ── taskbar ── */}
      <footer className="relative z-30 flex h-14 shrink-0 items-center gap-2 border-t border-white/[0.07] bg-black/45 px-2 backdrop-blur-2xl">
        <button
          type="button"
          data-testid="os-start"
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen(!startOpen);
          }}
          aria-expanded={startOpen}
          className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 transition hover:bg-white/[0.09]"
        >
          <LogoMark size={20} />
          <span className="hidden text-xs font-bold tracking-widest text-white/85 sm:inline">
            {t("os.start.label")}
          </span>
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto teka-os-scroll">
          {windows.map((win) => {
            const app = getOsApp(win.appId);
            if (!app) return null;
            const active = !win.minimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => (active ? focus(win.id) : focus(win.id))}
                onContextMenu={(e) => {
                  e.preventDefault();
                  close(win.id);
                }}
                className={`flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] transition ${
                  active
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                    : "border-white/[0.07] bg-white/[0.03] text-white/50"
                }`}
              >
                <app.icon size={13} />
                <span className="max-w-24 truncate" dir="auto">{t(app.titleKey)}</span>
                <X
                  size={11}
                  className="opacity-40 transition hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    close(win.id);
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {session?.pet && (
            <span className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 text-[11px] text-white/60 sm:flex" title={`Pet: ${session.pet.name || "—"}`}>
              {session.pet.stage === 0 ? "🥚" : session.pet.stage === 1 ? "🐣" : session.pet.stage === 2 ? "🐥" : session.pet.stage === 3 ? "🦜" : "🐉"}
              <span className="text-white/40">{session.pet.hunger}%</span>
            </span>
          )}
          {session?.team && (
            <span
              data-testid="os-team-chip"
              className={`hidden h-9 items-center gap-1 rounded-lg px-2.5 text-[11px] font-semibold sm:flex ${
                session.team === "RED" ? "bg-rose-500/15 text-rose-300" : "bg-sky-500/15 text-sky-300"
              }`}
            >
              {session.team === "RED" ? "🔴 RED" : "🔵 BLUE"}
            </span>
          )}
          {session && session.cards.count > 0 && (
            <span className="hidden h-9 items-center gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 text-[11px] text-violet-300/80 md:flex">
              🃏 {session.cards.count}
            </span>
          )}
          <button
            type="button"
            onClick={() => openApp("terminal")}
            aria-label="Terminal"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300/80 transition hover:bg-emerald-400/15"
          >
            <Swords size={14} className="hidden" />
            <span className="font-mono text-[11px]">&gt;_</span>
          </button>
        </div>
      </footer>

      <MatrixOverlay />
      <span className="hidden">{tick}{Timer.name}</span>
    </div>
  );
}
