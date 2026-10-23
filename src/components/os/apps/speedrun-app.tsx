"use client";

// TEKA OS — Speedrun app (Task 19-f).
// Global module timer: start mints an HMAC token, the clock runs client-side,
// finish verifies server-side (human floor + completed lessons) and stores
// the best time per user per module. Below it: the global leaderboard.

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, Play, Square, Trophy } from "lucide-react";

import { COURSES } from "@/lib/academy";
import { pick } from "@/lib/academy/types";
import { get, post, qs, ApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { OS_STRINGS, pickL } from "@/lib/os/strings";
import { useApp } from "@/lib/store";
import { useOsSession } from "@/lib/os/session-store";

type StartRes = { token: string; startedAt: number; lessonCount: number };
type FinishRes = {
  valid: boolean;
  reason?: "TOO_FAST" | "LESSONS_INCOMPLETE";
  ms?: number;
  isRecord?: boolean;
  rank?: number;
};
type LeaderEntry = {
  username: string;
  displayName: string;
  courseId: string;
  moduleId: string;
  ms: number;
  createdAt: string;
};

/** Ready-panel clock: mm:ss.d */
function fmtTimer(ms: number): string {
  const m = Math.floor(ms / 60_000);
  const s = Math.floor(ms / 1000) % 60;
  const d = Math.floor(ms / 100) % 10;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${d}`;
}

/** Leaderboard time: m:ss.mmm */
function fmtBoard(ms: number): string {
  const m = Math.floor(ms / 60_000);
  const s = Math.floor(ms / 1000) % 60;
  return `${m}:${String(s).padStart(2, "0")}.${String(ms % 1000).padStart(3, "0")}`;
}

const MEDALS = ["🥇", "🥈", "🥉"];

export function SpeedrunApp() {
  const locale = useI18n((s) => s.locale);
  const L = (key: keyof typeof OS_STRINGS.speedrun) => pickL(OS_STRINGS.speedrun[key], locale);
  const me = useApp((s) => s.user);
  const fetchSession = useOsSession((s) => s.fetchSession);

  // Navigation: course → module → ready panel.
  const [courseId, setCourseId] = useState<string | null>(null);
  const [moduleId, setModuleId] = useState<string | null>(null);

  // Timer state.
  const [token, setToken] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [busy, setBusy] = useState(false);
  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const baseRef = useRef(0);

  // Result + leaderboard.
  const [finishInfo, setFinishInfo] = useState<{ ms: number; isRecord: boolean; rank: number } | null>(null);
  const [myBest, setMyBest] = useState<number | null>(null);
  const [entries, setEntries] = useState<LeaderEntry[] | null>(null);

  const course = COURSES.find((c) => c.id === courseId) ?? null;
  const mod = course?.modules.find((m) => m.id === moduleId) ?? null;

  // moduleId → label map for the leaderboard.
  const moduleLabels = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of COURSES) {
      for (const m of c.modules) map.set(m.id, pick(m.title, locale));
    }
    return map;
  }, [locale]);

  const loadBoard = async () => {
    try {
      const data = await get<{ entries: LeaderEntry[] }>("/api/os/speedrun");
      setEntries(data.entries);
    } catch {
      /* leaderboard is best-effort */
    }
  };

  const loadMyBest = async (mid: string) => {
    try {
      const data = await get<{ entries: LeaderEntry[] }>(`/api/os/speedrun${qs({ moduleId: mid })}`);
      const own = data.entries.find((e) => e.username === me?.username);
      setMyBest(own ? own.ms : null);
    } catch {
      setMyBest(null);
    }
  };

  // Initial leaderboard sync (async → no sync setState in effect).
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await get<{ entries: LeaderEntry[] }>("/api/os/speedrun");
        if (alive) setEntries(data.entries);
      } catch {
        /* best-effort */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Clock: requestAnimationFrame loop, re-rendered at tenth-of-a-second steps.
  useEffect(() => {
    if (!running) return;
    baseRef.current = performance.now() - elapsedRef.current;
    let lastTenth = -1;
    const tick = (now: number) => {
      const el = now - baseRef.current;
      const tenth = Math.floor(el / 100);
      if (tenth !== lastTenth) {
        lastTenth = tenth;
        elapsedRef.current = el;
        setElapsed(Math.floor(el));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [running]);

  const resetRun = () => {
    setRunning(false);
    setToken(null);
    elapsedRef.current = 0;
    setElapsed(0);
    setFinishInfo(null);
  };

  const selectCourse = (id: string) => {
    resetRun();
    setCourseId(id);
    setModuleId(null);
    setMyBest(null);
  };

  const backToCourses = () => {
    resetRun();
    setCourseId(null);
    setModuleId(null);
    setMyBest(null);
  };

  const selectModule = (mid: string) => {
    resetRun();
    setModuleId(mid);
    setFinishInfo(null);
    void loadMyBest(mid);
  };

  const start = async () => {
    if (!course || !mod || busy) return;
    setBusy(true);
    setFinishInfo(null);
    try {
      const res = await post<StartRes>("/api/os/speedrun", {
        action: "start",
        courseId: course.id,
        moduleId: mod.id,
      });
      setToken(res.token);
      elapsedRef.current = 0;
      setElapsed(0);
      setRunning(true);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  const finish = async () => {
    if (!course || !mod || !token || busy) return;
    setRunning(false);
    setBusy(true);
    try {
      const res = await post<FinishRes>("/api/os/speedrun", {
        action: "finish",
        courseId: course.id,
        moduleId: mod.id,
        token,
      });
      setToken(null);
      if (!res.valid) {
        // Timer voided → back to the ready panel for a fresh run.
        elapsedRef.current = 0;
        setElapsed(0);
        if (res.reason === "TOO_FAST") toast.error(L("tooFast"));
        else toast.warning(L("requiresLessons"));
        return;
      }
      setFinishInfo({ ms: res.ms ?? 0, isRecord: !!res.isRecord, rank: res.rank ?? 1 });
      if (res.isRecord) {
        toast.success(L("newRecord"));
        setMyBest(res.ms ?? null);
        fetchSession(); // +60 coins → refresh wallet chips
      }
      void loadBoard();
      void loadMyBest(mod.id);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 teka-os-scroll" dir="auto">
      <div className="space-y-4">
        {/* ── Header ── */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-400/10 text-lg shadow-[0_0_18px_rgba(167,139,250,0.18)]">
            ⏱️
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white/90">{L("tagline")}</p>
            <p className="font-mono text-[11px] tracking-widest text-violet-300/60">SPEEDRUN · TEKA OS</p>
          </div>
        </div>

        {/* ── Step 1: course chips ── */}
        {!course && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{L("pick")}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COURSES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => selectCourse(c.id)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-violet-400/50 hover:bg-violet-400/10 hover:shadow-[0_0_24px_rgba(167,139,250,0.15)]"
                >
                  <div className="text-3xl">{c.emoji}</div>
                  <p className="mt-2 truncate text-xs font-semibold text-white/85">{pick(c.title, locale)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: module grid ── */}
        {course && !mod && (
          <div className="space-y-3">
            <button
              onClick={backToCourses}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-white/50 transition hover:bg-white/5 hover:text-white/80"
            >
              <ChevronLeft size={14} className="rtl:rotate-180" />
              {pick(course.title, locale)}
            </button>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{L("pick")}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {course.modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectModule(m.id)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-start transition hover:border-violet-400/50 hover:bg-violet-400/10 hover:shadow-[0_0_24px_rgba(167,139,250,0.15)]"
                >
                  <p className="truncate text-sm font-semibold text-white/90">{pick(m.title, locale)}</p>
                  <p className="mt-1 font-mono text-[11px] text-violet-300/70">
                    {m.lessons.length} lessons · {m.id}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: READY panel ── */}
        {course && mod && (
          <div className="space-y-4">
            <button
              onClick={() => {
                resetRun();
                setModuleId(null);
              }}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-white/50 transition hover:bg-white/5 hover:text-white/80"
            >
              <ChevronLeft size={14} className="rtl:rotate-180" />
              {pick(course.title, locale)}
              <span className="text-white/25">/</span>
              {pick(mod.title, locale)}
            </button>

            <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-6">
              {/* big timer */}
              <div className="text-center">
                <div
                  className="font-mono text-5xl font-bold tabular-nums text-violet-200"
                  style={{ textShadow: "0 0 24px rgba(167,139,250,0.55)" }}
                >
                  {fmtTimer(elapsed)}
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-violet-300/60">
                  {running ? L("running") : `${mod.lessons.length} LESSONS`}
                </p>
              </div>

              {/* controls */}
              <div className="mt-5 flex flex-col items-center gap-2">
                {!running && (
                  <button
                    onClick={start}
                    disabled={busy || !!token}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-400 hover:to-fuchsia-400 disabled:opacity-60"
                  >
                    <Play size={15} />
                    {L("start")}
                  </button>
                )}
                {running && (
                  <button
                    onClick={finish}
                    disabled={busy}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-400 hover:to-fuchsia-400 disabled:opacity-60"
                  >
                    <Square size={14} />
                    {L("finish")}
                  </button>
                )}
                <p className="text-center text-[11px] text-white/35">{L("finishHint")}</p>
              </div>

              {/* result / best */}
              <div className="mt-4 space-y-1.5 text-center">
                {finishInfo && (
                  <p className="text-sm text-white/80">
                    <span className="font-mono font-bold text-violet-200">{fmtBoard(finishInfo.ms)}</span>
                    {" · "}
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
                      <Trophy size={13} />
                      #{finishInfo.rank}
                    </span>
                    {finishInfo.isRecord && (
                      <span className="ms-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                        PB
                      </span>
                    )}
                  </p>
                )}
                {myBest !== null && (
                  <p className="text-xs text-white/45">
                    {L("yourBest")}: <span className="font-mono text-white/70">{fmtBoard(myBest)}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Leaderboard ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300/80">
            <Trophy size={12} />
            {L("leaderboard")}
          </p>
          {!entries ? (
            <p className="animate-pulse py-4 text-center font-mono text-[11px] tracking-widest text-white/30">
              LOADING…
            </p>
          ) : entries.length === 0 ? (
            <p className="py-4 text-center text-xs text-white/40">—</p>
          ) : (
            <div className="max-h-64 overflow-y-auto teka-os-scroll">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="text-white/35">
                    <th className="px-2 py-1.5 text-start font-medium">#</th>
                    <th className="px-2 py-1.5 text-start font-medium">Player</th>
                    <th className="px-2 py-1.5 text-start font-medium">Module</th>
                    <th className="px-2 py-1.5 text-end font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => {
                    const mine = e.username === me?.username;
                    return (
                      <tr
                        key={`${e.username}-${e.moduleId}-${e.ms}`}
                        className={`border-t border-white/5 ${mine ? "bg-violet-400/10" : ""}`}
                      >
                        <td className="px-2 py-2 font-mono text-white/50">
                          {MEDALS[i] ?? i + 1}
                        </td>
                        <td className="px-2 py-2">
                          <span className={mine ? "font-semibold text-violet-200" : "text-white/80"}>
                            {e.displayName}
                          </span>
                          <span className="ms-1 text-white/30">@{e.username}</span>
                        </td>
                        <td className="max-w-[10rem] truncate px-2 py-2 text-white/60">
                          {moduleLabels.get(e.moduleId) ?? e.moduleId}
                        </td>
                        <td className="px-2 py-2 text-end font-mono tabular-nums text-white/85">
                          {fmtBoard(e.ms)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
