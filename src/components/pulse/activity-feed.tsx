"use client";

// TEKA NEXUS — Activity Feed (Task 13: Nexus Command Center).
// Every real community action (joins, launches, likes, comments, chat msgs,
// updates, follows, saves, member joins, completed tasks) streamed live from
// /api/pulse with 5s polling + client-side type filters. Fully RTL-aware.

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

import { get } from "@/lib/api";
import { useT, useRelativeTime } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/shared/atoms";
import { EASE } from "@/components/shared/motion";
import { useApp } from "@/lib/store";
import {
  EVENT_GLYPH,
  PULSE_EVENT_TYPES,
  type PulseEvent,
  type PulseEventType,
  type PulseResponse,
} from "./events";

const POLL_MS = 5000;
const MAX_RENDER = 60;

export function ActivityFeed({ className }: { className?: string }) {
  const t = useT();
  const rel = useRelativeTime();
  const navigate = useApp((s) => s.navigate);

  const [events, setEvents] = useState<PulseEvent[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [filter, setFilter] = useState<"all" | PulseEventType>("all");
  const [connected, setConnected] = useState(false);
  const seen = useRef<Set<string>>(new Set());
  const busy = useRef(false);

  const tick = useCallback(async () => {
    if (document.hidden || busy.current) return;
    busy.current = true;
    try {
      const res = await get<PulseResponse>("/api/pulse");
      const fresh = res.events.filter((e) => !seen.current.has(e.id));
      for (const e of fresh) seen.current.add(e.id);
      setConnected(true);
      setState("ready");
      setEvents((prev) => {
        const merged = fresh.length ? [...fresh, ...prev] : prev;
        return merged.length > MAX_RENDER ? merged.slice(0, MAX_RENDER) : merged;
      });
    } catch {
      setConnected(false);
      setState((s) => (s === "loading" ? "error" : s));
    } finally {
      busy.current = false;
    }
  }, []);

  useEffect(() => {
    let alive = true;
    tick();
    const timer = setInterval(() => {
      if (alive) tick();
    }, POLL_MS);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [tick]);

  const visible = filter === "all" ? events : events.filter((e) => e.type === filter);

  const open = (e: PulseEvent) => {
    if (e.slug) navigate({ name: "project", slug: e.slug });
    else if (e.username) navigate({ name: "profile", username: e.username });
  };

  return (
    <section
      aria-label={t("pulse.live.feedTitle")}
      className={cn("glass-card rounded-2xl p-4 md:p-5", className)}
    >
      <header className="mb-3 flex flex-wrap items-center gap-2">
        <Activity className="h-4 w-4 text-cyan-300" aria-hidden="true" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("pulse.live.feedTitle")}
        </h3>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider",
            connected
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
              : "border-amber-400/40 bg-amber-500/10 text-amber-300",
          )}
          dir="ltr"
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", connected ? "animate-pulse bg-emerald-400" : "bg-amber-400")} />
          {connected ? t("pulse.live.badge") : "…"}
        </span>
        <p className="hidden w-full text-xs text-muted-foreground sm:block">{t("pulse.live.feedSubtitle")}</p>
      </header>

      {/* type filters */}
      <div
        className="mb-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label={t("pulse.live.feedTitle")}
      >
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {t("pulse.live.filterAll")}
        </FilterChip>
        {PULSE_EVENT_TYPES.map((type) => (
          <FilterChip key={type} active={filter === type} onClick={() => setFilter(type)}>
            <span aria-hidden="true" className="mr-1">{EVENT_GLYPH[type]}</span>
            {t(`pulse.events.${type}`)}
          </FilterChip>
        ))}
      </div>

      {state === "loading" ? (
        <div className="space-y-2" aria-busy="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-11 animate-pulse rounded-xl bg-white/[0.04]" />
          ))}
        </div>
      ) : state === "error" ? (
        <div className="rounded-xl border border-rose-400/25 bg-rose-500/[0.06] p-4 text-center">
          <p className="text-sm text-rose-200/90">{t("pulse.live.loadError")}</p>
        </div>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center text-sm text-muted-foreground">
          {t("pulse.live.empty")}
        </p>
      ) : (
        <ul className="max-h-[26rem] space-y-1.5 overflow-y-auto pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar]:w-1.5">
          {visible.map((e) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <button
                onClick={() => open(e)}
                className="focus-glow flex w-full items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 text-start transition hover:border-white/[0.06] hover:bg-white/[0.03]"
              >
                <span className="shrink-0">
                  <UserAvatar
                    user={{ username: e.actor, displayName: e.actor, avatarColor: e.actorColor, avatarUrl: null }}
                    size={24}
                  />
                </span>
                <span className="min-w-0 flex-1 truncate text-xs leading-5 sm:text-[13px]">
                  <span className="font-semibold text-foreground">{e.actor}</span>{" "}
                  <span className="text-muted-foreground">{t(`pulse.events.${e.type}`)}</span>{" "}
                  <span className="font-medium text-cyan-200/90">{e.target}</span>
                  {e.preview && (
                    <span className="text-muted-foreground"> — «{e.preview}»</span>
                  )}
                </span>
                <time dateTime={e.at} className="shrink-0 font-mono text-[10px] text-muted-foreground/70">
                  {rel(e.at)}
                </time>
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
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
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
        active
          ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
          : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

