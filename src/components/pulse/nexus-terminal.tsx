"use client";

// TEKA NEXUS — Nexus Terminal (Live Pulse, Task pulse-1).
// A CRT-styled live community console embedded in Explore:
//   • boot sequence + live activity stream from /api/pulse (7s poll)
//   • interactive command line: help, projects, top, challenge, stats,
//     whoami, date, matrix (easter egg), clear
//   • scanlines, phosphor glow, blinking cursor, expand/collapse

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Maximize2, Minimize2, TerminalSquare } from "lucide-react";

import { get } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MatrixRain } from "./matrix-rain";

type PulseEvent = {
  id: string;
  type: "join" | "project" | "like" | "comment" | "chat" | "update";
  at: string;
  actor: string;
  actorColor: string;
  target: string;
  slug?: string;
  preview?: string;
};

type PulseResponse = {
  events: PulseEvent[];
  stats: { users: number; projects: number; likes: number; comments: number; chats: number };
};

type Line = { id: string; kind: "sys" | "in" | "out" | "err" | `ev-${PulseEvent["type"]}`; text: string };

const EVENT_GLYPH: Record<PulseEvent["type"], string> = {
  join: "✦",
  project: "▲",
  like: "♥",
  comment: "✎",
  chat: "✉",
  update: "⚡",
};

const EVENT_CLASS: Record<PulseEvent["type"], string> = {
  join: "text-cyan-300",
  project: "text-violet-300",
  like: "text-rose-300",
  comment: "text-amber-300",
  chat: "text-emerald-300",
  update: "text-lime-300",
};

function clock(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export function NexusTerminal({ className }: { className?: string }) {
  const t = useT();
  const [expanded, setExpanded] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [matrix, setMatrix] = useState(false);
  const [connected, setConnected] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const seenEvents = useRef<Set<string>>(new Set());
  const bootedRef = useRef(false);
  const busyRef = useRef(false);

  const push = useCallback((kind: Line["kind"], text: string, id?: string) => {
    setLines((prev) => {
      const next = [...prev, { id: id ?? `l${prev.length}-${Date.now()}-${Math.random()}`, kind, text }];
      return next.length > 240 ? next.slice(next.length - 240) : next;
    });
  }, []);

  // ── boot sequence (typed once) ────────────────────────────────
  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const boot: [Line["kind"], string][] = [
      ["sys", "TEKA NEXUS OS v2.6 — kernel boot ............ OK"],
      ["sys", "connecting to pulse relay ................... OK"],
      ["sys", "social graph synced ✓  ·  live feed attached"],
      ["out", t("pulse.terminal.welcome")],
      ["sys", t("pulse.terminal.helpHint")],
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i >= boot.length) {
        clearInterval(timer);
        return;
      }
      const [kind, text] = boot[i++];
      push(kind, text);
    }, 260);
    return () => clearInterval(timer);
  }, [push, t]);

  // ── live feed polling ─────────────────────────────────────────
  useEffect(() => {
    let alive = true;
    let first = true;

    const tick = async () => {
      if (document.hidden || busyRef.current) return;
      busyRef.current = true;
      try {
        const res = await get<PulseResponse>("/api/pulse");
        if (!alive) return;
        setConnected(true);
        const fresh = res.events.filter((e) => !seenEvents.current.has(e.id)).slice(0, 12);
        for (const e of fresh) {
          seenEvents.current.add(e.id);
          if (seenEvents.current.size > 600) {
            // keep the set bounded — drop the oldest half
            const arr = [...seenEvents.current];
            seenEvents.current = new Set(arr.slice(arr.length / 2));
          }
          const label = t(`pulse.terminal.eventLabels.${e.type}`);
          const preview = e.preview ? ` — «${e.preview}»` : "";
          push(
            `ev-${e.type}` as Line["kind"],
            `[${clock(e.at)}] ${EVENT_GLYPH[e.type]} ${e.actor} ${label} ${e.target}${preview}`,
            `term-${e.id}`
          );
        }
        if (first && fresh.length === 0) {
          push("sys", "0 new events — waiting for the community to move…");
        }
        first = false;
      } catch {
        if (alive) setConnected(false);
      } finally {
        busyRef.current = false;
      }
    };

    tick();
    const timer = setInterval(tick, 7000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [push, t]);

  // auto-scroll to bottom when near bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 140;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // ── command handlers ──────────────────────────────────────────
  const runCommand = useCallback(
    async (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      push("in", `nexus:~$ ${raw}`);

      switch (cmd) {
        case "help":
          push("out", "commands:");
          push("out", "  projects   — top community projects");
          push("out", "  top        — all-time XP leaderboard");
          push("out", "  challenge  — current weekly challenge");
          push("out", "  stats      — live community counters");
          push("out", "  whoami     — who are you?");
          push("out", "  date       — server date & time");
          push("out", "  matrix     — ???");
          push("out", "  clear      — wipe the screen");
          break;

        case "clear":
          setLines([]);
          break;

        case "matrix":
          push("sys", t("pulse.terminal.matrixOn"));
          setMatrix(true);
          break;

        case "date":
          push("out", new Date().toString());
          break;

        case "whoami": {
          try {
            const me = await get<{ user: { displayName?: string; username?: string } | null }>("/api/auth/me");
            const u = me?.user;
            push("out", u ? `${u.displayName} (@${u.username})` : t("pulse.terminal.guest"));
          } catch {
            push("err", "identity lookup failed");
          }
          break;
        }

        case "projects": {
          push("sys", "querying the nexus index…");
          try {
            const res = await get<{ projects: { name: string; slug: string; likeCount: number; memberCount: number }[] }>(
              "/api/projects?sort=popular&page=1"
            );
            res.projects.slice(0, 5).forEach((p, i) =>
              push("out", `  ${i + 1}. ${p.name}  ·  ♥ ${p.likeCount}  ·  ◉ ${p.memberCount}  ·  /${p.slug}`)
            );
          } catch {
            push("err", "index unavailable");
          }
          break;
        }

        case "top": {
          push("sys", "loading leaderboard…");
          try {
            const res = await get<{ rows: { rank: number; displayName: string; username: string; xp: number }[] }>(
              "/api/leaderboard?range=all"
            );
            res.rows
              .filter((r) => r.rank > 0)
              .slice(0, 5)
              .forEach((r) => push("out", `  ${r.rank}. ${r.displayName} (@${r.username}) — ${r.xp} XP`));
          } catch {
            push("err", "leaderboard unavailable");
          }
          break;
        }

        case "challenge": {
          try {
            const res = await get<{
              challenge: { title: string; description: string; xpReward: number; target: number; weekEnd: string };
              stats: { entries: number; completed: number };
            }>("/api/challenge");
            const days = Math.max(0, Math.ceil((new Date(res.challenge.weekEnd).getTime() - Date.now()) / 86400000));
            push("out", `★ ${res.challenge.title}  [+${res.challenge.xpReward} XP]`);
            push("out", `  ${res.challenge.description}`);
            push("out", `  ${days}d left · ${res.stats.entries} in · ${res.stats.completed} finished`);
          } catch {
            push("err", "challenge unavailable");
          }
          break;
        }

        case "stats": {
          try {
            const res = await get<PulseResponse>("/api/pulse");
            const s = res.stats;
            push("out", `users:${s.users}  projects:${s.projects}  likes:${s.likes}  comments:${s.comments}  chat-messages:${s.chats}`);
          } catch {
            push("err", "stats unavailable");
          }
          break;
        }

        default:
          push("err", `${cmd}: ${t("pulse.terminal.notFound")}`);
      }
    },
    [push, t]
  );

  const submit = () => {
    const v = input;
    setInput("");
    void runCommand(v);
  };

  const term = useMemo(
    () => (
      <div
        dir="ltr"
        className={cn(
          "relative overflow-hidden rounded-xl border border-emerald-500/20 bg-[#04070a] font-mono text-[12.5px] leading-relaxed shadow-[0_0_40px_-12px_rgba(16,185,129,0.35)]"
        )}
      >
        {/* scanlines + vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(52,211,153,0.5) 3px, transparent 4px)",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={{ boxShadow: "inset 0 0 90px rgba(0,0,0,0.75)" }} />

        {/* header */}
        <div className="flex items-center gap-2 border-b border-emerald-500/15 bg-emerald-950/30 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <TerminalSquare className="ml-2 h-4 w-4 text-emerald-300" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-widest text-emerald-200/90">{t("pulse.terminal.title")}</span>
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider",
              connected
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                : "border-amber-400/40 bg-amber-500/10 text-amber-300"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", connected ? "animate-pulse bg-emerald-400" : "bg-amber-400")} />
            {connected ? "LIVE" : "SYNC…"}
          </span>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded-md p-1 text-emerald-200/70 transition hover:bg-emerald-500/10 hover:text-emerald-200"
            aria-label={expanded ? t("pulse.terminal.collapse") : t("pulse.terminal.expand")}
          >
            {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* screen */}
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label={t("pulse.terminal.title")}
          className={cn(
            "overflow-y-auto px-3 py-2 text-emerald-100/90",
            expanded ? "h-[30rem]" : "h-64",
            "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-500/20"
          )}
          style={{ textShadow: "0 0 6px rgba(52, 211, 153, 0.35)" }}
        >
          {lines.map((l) => (
            <div
              key={l.id}
              className={cn(
                "whitespace-pre-wrap break-words",
                l.kind === "sys" && "text-emerald-500/70",
                l.kind === "in" && "text-white",
                l.kind === "out" && "text-emerald-100/90",
                l.kind === "err" && "text-rose-300",
                l.kind.startsWith("ev-") && EVENT_CLASS[l.kind.slice(3) as PulseEvent["type"]]
              )}
            >
              {l.text}
            </div>
          ))}
        </div>

        {/* command line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-center gap-2 border-t border-emerald-500/15 bg-emerald-950/20 px-3 py-2"
        >
          <span className="text-emerald-400">nexus:~$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label={t("pulse.terminal.title")}
            className="w-full bg-transparent text-white caret-emerald-400 outline-none placeholder:text-emerald-600/60"
            placeholder="help"
          />
          <span aria-hidden="true" className="h-4 w-2 animate-pulse bg-emerald-400/80" />
        </form>
      </div>
    ),
    [lines, input, connected, expanded, t]
  );

  return (
    <div className={className}>
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
      {matrix && (
        <div className="pointer-events-none fixed inset-0 z-[95] flex items-end justify-center pb-24">
          <p className="rounded-full bg-black/60 px-5 py-2 font-mono text-sm text-emerald-300" style={{ textShadow: "0 0 12px rgba(52,211,153,0.7)" }}>
            {t("pulse.terminal.easterEgg")}
          </p>
        </div>
      )}
      {term}
    </div>
  );
}
