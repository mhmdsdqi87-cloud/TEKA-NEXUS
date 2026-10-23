"use client";

// TEKA OS — RED vs BLUE WAR (Task 19-d).
// Weekly faction war: enlist once (loyalty forever), run weekly missions and
// watch the live score bar. Rose = RED, sky = BLUE (team colors, not theme).

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Loader2, RefreshCw, Swords } from "lucide-react";
import { toast } from "sonner";

import { get, post, ApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { useT } from "@/lib/i18n";
import { OS_STRINGS, pickL, type L2 } from "@/lib/os/strings";
import { useOsSession } from "@/lib/os/session-store";

type WarData = {
  week: string;
  team: string | null;
  scores: { RED: number; BLUE: number };
  myKinds: string[];
  lessonCount: number;
  tasks: { kind: string; points: number; label: null; done: boolean }[];
  topWarriors: { username: string; displayName: string; team: string | null; points: number }[];
};

// Client mirror of the fixed server table — powers the contribution chip.
const KIND_POINTS: Record<string, number> = {
  ENLIST: 5,
  LESSON: 15,
  BOSS: 40,
  PET: 10,
  CRIME: 30,
  SPEEDRUN: 25,
};

const TASK_LABELS: Record<string, L2> = {
  LESSON: OS_STRINGS.war.taskLesson,
  BOSS: OS_STRINGS.war.taskBoss,
  PET: OS_STRINGS.war.taskPet,
  CRIME: OS_STRINGS.war.taskCrime,
  SPEEDRUN: OS_STRINGS.war.taskSpeedrun,
};

/** OS_STRINGS templates use {param} — interpolate after pickL resolves the locale. */
function interp(template: string, params: Record<string, string | number>): string {
  let out = template;
  for (const [k, v] of Object.entries(params)) out = out.replaceAll(`{${k}}`, String(v));
  return out;
}

export function WarApp() {
  const locale = useI18n((s) => s.locale);
  const t = useT();
  const fetchSession = useOsSession((s) => s.fetchSession);
  const patchSession = useOsSession((s) => s.patch);

  const [data, setData] = useState<WarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false); // join / claim in flight

  const load = useCallback(async () => {
    try {
      const res = await get<WarData>("/api/os/war");
      setData(res);
    } catch {
      // Silent on background refresh failures — actions toast their own errors.
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + live war feeling: re-poll every 30 s.
  useEffect(() => {
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, [load]);

  const join = async (team: "RED" | "BLUE") => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await post<{ team: string; scores: { RED: number; BLUE: number } }>(
        "/api/os/war",
        { action: "join", team },
      );
      setData((prev) =>
        prev
          ? {
              ...prev,
              team: res.team,
              scores: res.scores,
              myKinds: prev.myKinds.includes("ENLIST") ? prev.myKinds : [...prev.myKinds, "ENLIST"],
            }
          : prev,
      );
      patchSession({ team: res.team }); // instant taskbar chip sync
      void fetchSession(); // + full wallet/xp refresh
      toast.success(pickL(OS_STRINGS.war.enlisted, locale));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("os.common.error"));
    } finally {
      setBusy(false);
    }
  };

  const claimLesson = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await post("/api/os/war", { action: "claim", kind: "LESSON" });
      toast.success("⚔️ +25 XP · +25 🪙");
      await load();
      void fetchSession(); // coins + xp chips stay honest
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("os.common.error"));
    } finally {
      setBusy(false);
    }
  };

  // ── Loading ──
  if (loading && !data) {
    return (
      <div className="flex h-full items-center justify-center" role="status" aria-label={t("os.common.loading")}>
        <Loader2 size={22} className="animate-spin text-white/40" />
      </div>
    );
  }

  // ── Failed to load ──
  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-sm text-white/45">
        <p dir="auto">{t("os.common.error")}</p>
        <button
          type="button"
          onClick={load}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 text-xs text-white/70 transition hover:bg-white/[0.09]"
        >
          <RefreshCw size={12} /> {t("os.common.refresh")}
        </button>
      </div>
    );
  }

  const enlisted = data.team === "RED" || data.team === "BLUE";
  const total = Math.max(1, data.scores.RED + data.scores.BLUE);
  const redPct = Math.round((data.scores.RED / total) * 1000) / 10;
  const myPoints = data.myKinds.reduce((sum, k) => sum + (KIND_POINTS[k] ?? 0), 0);
  const lessonClaimed = data.myKinds.includes("LESSON");

  return (
    <div className="h-full space-y-4 overflow-y-auto p-4 teka-os-scroll">
      {/* ── header: tagline + week chip ── */}
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-auto text-base font-bold text-white/90" dir="auto">
          {pickL(OS_STRINGS.war.tagline, locale)}
        </h2>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/60">
          <Swords size={11} className="text-amber-300/80" />
          <span dir="auto">{interp(pickL(OS_STRINGS.war.week, locale), { week: data.week })}</span>
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden />
        </span>
        {enlisted && (
          <span
            data-testid="war-team-badge"
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold ${
              data.team === "RED" ? "bg-rose-500/15 text-rose-300" : "bg-sky-500/15 text-sky-300"
            }`}
          >
            {data.team === "RED" ? "🔴" : "🔵"}
            <span dir="auto">{pickL(data.team === "RED" ? OS_STRINGS.war.red : OS_STRINGS.war.blue, locale)}</span>
          </span>
        )}
      </div>

      {!enlisted ? (
        /* ── faction choice (once — loyalty forever) ── */
        <div className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.button
              type="button"
              disabled={busy}
              onClick={() => join("RED")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              data-testid="war-join-red"
              className="group relative overflow-hidden rounded-2xl border border-rose-400/25 bg-gradient-to-b from-rose-500/[0.16] via-rose-500/[0.05] to-transparent p-6 text-left shadow-[0_0_70px_-20px_rgba(244,63,94,0.55)] transition hover:border-rose-400/50 disabled:cursor-wait disabled:opacity-60"
            >
              <div aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-rose-500/20 blur-3xl transition group-hover:bg-rose-500/35" />
              <span className="text-4xl">🔴</span>
              <h3 className="mt-3 text-lg font-bold text-rose-200" dir="auto">
                {pickL(OS_STRINGS.war.red, locale)}
              </h3>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/55" dir="auto">
                {pickL(OS_STRINGS.war.tagline, locale)}
              </p>
              <span className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-rose-500 px-4 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition group-hover:bg-rose-400">
                {pickL(OS_STRINGS.war.chooseRed, locale)}
              </span>
            </motion.button>

            <motion.button
              type="button"
              disabled={busy}
              onClick={() => join("BLUE")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              data-testid="war-join-blue"
              className="group relative overflow-hidden rounded-2xl border border-sky-300/25 bg-gradient-to-b from-sky-400/[0.16] via-sky-400/[0.05] to-transparent p-6 text-left shadow-[0_0_70px_-20px_rgba(56,189,248,0.55)] transition hover:border-sky-300/50 disabled:cursor-wait disabled:opacity-60"
            >
              <div aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-sky-400/20 blur-3xl transition group-hover:bg-sky-400/35" />
              <span className="text-4xl">🔵</span>
              <h3 className="mt-3 text-lg font-bold text-sky-200" dir="auto">
                {pickL(OS_STRINGS.war.blue, locale)}
              </h3>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/55" dir="auto">
                {pickL(OS_STRINGS.war.tagline, locale)}
              </p>
              <span className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-sky-400 px-4 text-sm font-semibold text-sky-950 shadow-lg shadow-sky-500/25 transition group-hover:bg-sky-300">
                {pickL(OS_STRINGS.war.chooseBlue, locale)}
              </span>
            </motion.button>
          </div>
          <p className="text-center text-[11px] text-white/40" dir="auto">
            🔒 {pickL(OS_STRINGS.war.switchTeamHint, locale)}
          </p>
        </div>
      ) : (
        <>
          {/* ── score war bar ── */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-bold text-rose-300" dir="ltr">🔴 {data.scores.RED}</span>
              <span className="text-[11px] uppercase tracking-widest text-white/40" dir="auto">
                {pickL(OS_STRINGS.war.score, locale)}
              </span>
              <span className="text-sm font-bold text-sky-300" dir="ltr">{data.scores.BLUE} 🔵</span>
            </div>
            <div
              className="mt-3 flex h-7 overflow-hidden rounded-full border border-white/10 bg-black/40"
              role="img"
              aria-label={`RED ${data.scores.RED} — BLUE ${data.scores.BLUE}`}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400"
                initial={false}
                animate={{ width: `${redPct}%` }}
                transition={{ type: "spring", stiffness: 70, damping: 20 }}
              />
              <div className="h-full flex-1 bg-gradient-to-r from-sky-400 to-sky-300" />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/40" dir="ltr">
              <span>{redPct}%</span>
              <span>{(100 - redPct).toFixed(1)}%</span>
            </div>
            <div className="mt-3 flex justify-center">
              <span
                className="rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3 py-1 text-[11px] text-amber-200/90"
                dir="auto"
                data-testid="war-my-contribution"
              >
                ⚔️ {pickL(OS_STRINGS.war.yourContribution, locale)}: +{myPoints}
              </span>
            </div>
          </section>

          {/* ── weekly missions checklist ── */}
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/45" dir="auto">
              {pickL(OS_STRINGS.war.tasks, locale)}
            </h3>
            <ul className="space-y-2">
              {data.tasks.map((task) => {
                const label = TASK_LABELS[task.kind];
                const isLesson = task.kind === "LESSON";
                const canClaim = isLesson && !lessonClaimed && data.lessonCount >= 3;
                return (
                  <li
                    key={task.kind}
                    data-testid={`war-task-${task.kind.toLowerCase()}`}
                    className={`flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5 ${
                      task.done ? "border-emerald-400/20 bg-emerald-400/[0.05]" : "border-white/[0.07] bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        task.done ? "bg-emerald-400/20 text-emerald-300" : "bg-white/[0.06] text-white/35"
                      }`}
                      aria-hidden
                    >
                      {task.done ? "✓" : "○"}
                    </span>
                    <span
                      className={`text-sm ${task.done ? "text-emerald-200/90" : "text-white/75"}`}
                      dir="auto"
                    >
                      {label ? pickL(label, locale) : task.kind}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[10px] text-white/50" dir="ltr">
                      {interp(pickL(OS_STRINGS.war.points, locale), { n: task.points })}
                    </span>
                    {isLesson && !lessonClaimed && (
                      <button
                        type="button"
                        onClick={claimLesson}
                        disabled={!canClaim || busy}
                        title={`${data.lessonCount}/3`}
                        data-testid="war-claim-lesson"
                        className={`ml-auto flex h-8 shrink-0 items-center rounded-lg px-3 text-xs font-semibold transition ${
                          canClaim
                            ? "bg-amber-400 text-amber-950 shadow-lg shadow-amber-500/25 hover:bg-amber-300"
                            : "cursor-not-allowed bg-white/[0.05] text-white/30"
                        }`}
                      >
                        +25 ⚡ · +25 🪙
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ── warriors of the week ── */}
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/45" dir="auto">
              {pickL(OS_STRINGS.war.topWarriors, locale)}
            </h3>
            {data.topWarriors.length === 0 ? (
              <p className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 text-center text-xs text-white/35" dir="auto">
                —
              </p>
            ) : (
              <ol className="max-h-60 space-y-1.5 overflow-y-auto teka-os-scroll">
                {data.topWarriors.map((w, i) => (
                  <li
                    key={w.username}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 ${
                      w.team === "RED"
                        ? "border-rose-400/15 bg-rose-500/[0.04]"
                        : w.team === "BLUE"
                          ? "border-sky-300/15 bg-sky-400/[0.04]"
                          : "border-white/[0.07] bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex w-6 shrink-0 items-center justify-center">
                      {i === 0 ? (
                        <Crown size={15} className="text-amber-300" aria-label="1" />
                      ) : (
                        <span className="font-mono text-[11px] text-white/35">{i + 1}</span>
                      )}
                    </span>
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        w.team === "RED" ? "bg-rose-400" : w.team === "BLUE" ? "bg-sky-300" : "bg-white/25"
                      }`}
                      aria-hidden
                    />
                    <span className="truncate text-sm text-white/85" dir="ltr">@{w.username}</span>
                    {w.displayName && w.displayName !== w.username && (
                      <span className="hidden max-w-32 truncate text-[11px] text-white/35 sm:inline" dir="auto">
                        {w.displayName}
                      </span>
                    )}
                    <span className="ml-auto shrink-0 font-mono text-xs text-amber-200/90" dir="ltr">
                      {w.points} ⚔️
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </>
      )}
    </div>
  );
}
