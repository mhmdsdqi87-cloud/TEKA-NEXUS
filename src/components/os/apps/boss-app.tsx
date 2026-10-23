"use client";

// TEKA OS — BOSS ARENA app (Task 19-b).
// Fight the Academy's module bosses + one FINAL boss per course. Glass UI,
// amber/rose accents, animated HP bars, shake-on-miss, 1.6s auto-advance.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Loader2, Lock, Swords } from "lucide-react";
import { toast } from "sonner";

import { get, post } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { useT } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { OS_STRINGS, pickL, type L2 } from "@/lib/os/strings";
import { useOsSession } from "@/lib/os/session-store";

// ── server payload types ─────────────────────────────────────

type BossRow = {
  courseId: string;
  moduleId: string;
  final: boolean;
  emoji: string;
  accent: string;
  name: L2;
  taunt: L2;
  courseTitle: L2;
  requiredLessonCount: number;
  completedRequired: number;
  won: boolean;
};

type BossQuestionPublic = { q: L2; options: L2[] };

type ActiveBattle = {
  id: string;
  courseId: string;
  moduleId: string;
  bossHp: number;
  playerHp: number;
  cursor: number;
  question: BossQuestionPublic | null;
  total: number;
};

type BossPayload = { bosses: BossRow[]; active: ActiveBattle | null; bossDamage: number };

type BossRewards = {
  xp: number;
  multiplier: number;
  coins: number;
  cardKind?: string;
  finalCardKind?: string;
  title?: string;
};

type AttackResponse = {
  correct: boolean;
  explain?: L2;
  battle: { bossHp: number; playerHp: number; cursor: number; status: string; hits: number; misses: number };
  nextQuestion: BossQuestionPublic | null;
  rewards: BossRewards | null;
};

type View = "loading" | "list" | "battle" | "won" | "lost";

const ADVANCE_MS = 1600;
const FLEE: L2 = { fa: "فرار از مبارزه", en: "Flee the fight" };

/** Tiny {param} interpolation for OS_STRINGS templates. */
function fmt(s: string, params: Record<string, string | number>): string {
  let out = s;
  for (const [k, v] of Object.entries(params)) out = out.replaceAll(`{${k}}`, String(v));
  return out;
}

const screenMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.22 },
} as const;

// ── HP bar ───────────────────────────────────────────────────

function HpBar({ tone, label, value }: { tone: "boss" | "player"; label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] font-medium">
        <span dir="auto" className="text-white/70">{label}</span>
        <span className={`font-mono ${tone === "boss" ? "text-rose-200" : "text-emerald-200"}`}>
          {value} / 100
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.06]">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className={
            tone === "boss"
              ? "h-full rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-rose-400"
              : "h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          }
        />
      </div>
    </div>
  );
}

// ── roster row ───────────────────────────────────────────────

function BossRowCard({
  row,
  locale,
  starting,
  onStart,
  onLessons,
}: {
  row: BossRow;
  locale: string;
  starting: boolean;
  onStart: () => void;
  onLessons: () => void;
}) {
  const locked = row.completedRequired < row.requiredLessonCount;
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-3 ${
        row.won ? "border-emerald-400/25 bg-emerald-400/[0.05]" : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>{row.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span dir="auto" className="truncate text-sm font-semibold text-white/90">
              {pickL(row.name, locale)}
            </span>
            {row.final && (
              <span
                dir="auto"
                className="rounded-full border border-amber-400/40 bg-amber-400/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300"
              >
                {pickL(OS_STRINGS.boss.finalBadge, locale)}
              </span>
            )}
            {row.won && (
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                ✓
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/45">
              {row.completedRequired}/{row.requiredLessonCount}
            </span>
            <div className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{
                  width: `${row.requiredLessonCount ? (row.completedRequired / row.requiredLessonCount) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
        {!locked && (
          <button
            type="button"
            onClick={onStart}
            disabled={starting}
            className="shrink-0 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 text-xs font-bold text-black shadow-lg shadow-amber-500/20 transition hover:brightness-110 disabled:opacity-60"
          >
            {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : pickL(OS_STRINGS.boss.start, locale)}
          </button>
        )}
      </div>

      {locked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-black/55 px-3 text-center backdrop-blur-[2px]">
          <Lock className="h-3.5 w-3.5 text-amber-300" aria-hidden />
          <p dir="auto" className="text-[11px] leading-snug text-white/60">
            {pickL(OS_STRINGS.boss.lockedHint, locale)}
          </p>
          <button
            type="button"
            onClick={onLessons}
            className="rounded-lg border border-amber-400/30 px-2.5 py-1 text-[11px] font-semibold text-amber-200 transition hover:bg-amber-400/10"
          >
            {pickL(OS_STRINGS.tree.openModule, locale)}
          </button>
        </div>
      )}
    </div>
  );
}

// ── main app ─────────────────────────────────────────────────

export function BossApp() {
  const locale = useI18n((s) => s.locale);
  const t = useT();
  const navigate = useApp((s) => s.navigate);

  const [view, setView] = useState<View>("loading");
  const [bosses, setBosses] = useState<BossRow[]>([]);
  const [battle, setBattle] = useState<ActiveBattle | null>(null);
  const [loadError, setLoadError] = useState(false);

  const [picked, setPicked] = useState<number | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [explain, setExplain] = useState<L2 | null>(null);
  const [busy, setBusy] = useState(false);
  const [startingId, setStartingId] = useState<string | null>(null);

  const [rewards, setRewards] = useState<BossRewards | null>(null);
  const [finished, setFinished] = useState<{ courseId: string; moduleId: string } | null>(null);

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shake = useAnimationControls();

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  const load = useCallback(async () => {
    setLoadError(false);
    try {
      const data = await get<BossPayload>("/api/os/boss");
      setBosses(data.bosses);
      if (data.active) {
        setBattle(data.active);
        setView("battle");
      } else {
        setBattle(null);
        setView("list");
      }
    } catch {
      setLoadError(true);
      setView((v) => (v === "loading" ? "list" : v));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const metaFor = useCallback(
    (courseId: string, moduleId: string): BossRow | null =>
      bosses.find((b) => b.courseId === courseId && b.moduleId === moduleId) ?? null,
    [bosses],
  );

  const startFight = useCallback(
    async (courseId: string, moduleId: string) => {
      setStartingId(`${courseId}:${moduleId}`);
      try {
        const active = await post<ActiveBattle>("/api/os/boss", { action: "start", courseId, moduleId });
        setBattle(active);
        setPicked(null);
        setWasCorrect(null);
        setExplain(null);
        setBusy(false);
        setView("battle");
        void useOsSession.getState().fetchSession();
      } catch (e) {
        const msg = e instanceof Error ? e.message : t("common.error");
        if (msg.includes("LOCKED")) toast.info(pickL(OS_STRINGS.boss.lockedHint, locale));
        else if (msg.includes("BUSY")) {
          toast.info(pickL(OS_STRINGS.boss.tagline, locale));
          await load();
        } else toast.error(msg);
      } finally {
        setStartingId(null);
      }
    },
    [load, locale, t],
  );

  const attack = useCallback(
    async (optionIndex: number) => {
      if (!battle || busy) return;
      setBusy(true);
      setPicked(optionIndex);
      try {
        const res = await post<AttackResponse>("/api/os/boss", {
          action: "attack",
          battleId: battle.id,
          optionIndex,
        });
        setWasCorrect(res.correct);
        setExplain(res.correct ? res.explain ?? null : null);
        setBattle((prev) =>
          prev
            ? { ...prev, bossHp: res.battle.bossHp, playerHp: res.battle.playerHp, cursor: res.battle.cursor }
            : prev,
        );
        if (res.correct) toast.success(pickL(OS_STRINGS.boss.hit, locale));
        else {
          toast.error(pickL(OS_STRINGS.boss.miss, locale));
          void shake.start({ x: [0, -10, 10, -6, 6, -2, 0], transition: { duration: 0.45 } });
        }
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => {
          if (res.battle.status === "WON") {
            setRewards(res.rewards);
            setFinished({ courseId: battle.courseId, moduleId: battle.moduleId });
            setBattle(null);
            setView("won");
            void useOsSession.getState().fetchSession();
          } else if (res.battle.status === "LOST") {
            setFinished({ courseId: battle.courseId, moduleId: battle.moduleId });
            setBattle(null);
            setView("lost");
            void useOsSession.getState().fetchSession();
          } else if (res.nextQuestion) {
            const nq = res.nextQuestion;
            setBattle((prev) =>
              prev ? { ...prev, cursor: res.battle.cursor, question: nq } : prev,
            );
            setPicked(null);
            setWasCorrect(null);
            setExplain(null);
            setBusy(false);
          } else {
            setBattle(null);
            setBusy(false);
            setView("list");
          }
        }, ADVANCE_MS);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : t("common.error"));
        setPicked(null);
        setBusy(false);
      }
    },
    [battle, busy, locale, shake, t],
  );

  const abandon = useCallback(async () => {
    if (!battle) return;
    try {
      await post("/api/os/boss", { action: "abandon", battleId: battle.id });
    } catch {
      /* leave the row — next load resolves it */
    }
    setBattle(null);
    setBusy(false);
    setView("list");
    void useOsSession.getState().fetchSession();
    await load();
  }, [battle, load]);

  const retry = useCallback(() => {
    if (finished) void startFight(finished.courseId, finished.moduleId);
    else void load();
  }, [finished, startFight, load]);

  const backToList = useCallback(() => {
    setBattle(null);
    setRewards(null);
    setView("list");
    void load();
  }, [load]);

  // ── derived ────────────────────────────────────────────────

  const groups = useMemo(() => {
    const out: { courseId: string; emoji: string; title: L2; rows: BossRow[] }[] = [];
    const byId = new Map<string, { courseId: string; emoji: string; title: L2; rows: BossRow[] }>();
    for (const b of bosses) {
      let g = byId.get(b.courseId);
      if (!g) {
        g = { courseId: b.courseId, emoji: b.emoji, title: b.courseTitle, rows: [] };
        byId.set(b.courseId, g);
        out.push(g);
      }
      g.rows.push(b);
    }
    return out;
  }, [bosses]);

  const meta = battle ? metaFor(battle.courseId, battle.moduleId) : finished ? metaFor(finished.courseId, finished.moduleId) : null;
  const bossEmoji = meta?.emoji ?? "👾";
  const bossName: L2 = meta?.name ?? { en: "Boss", fa: "باس" };
  const bossTaunt: L2 = meta?.taunt ?? { en: "…", fa: "…" };

  return (
    <div className="h-full overflow-y-auto teka-os-scroll p-4 space-y-4">
      <AnimatePresence mode="wait">
        {/* ── LOADING ─────────────────────────────────────── */}
        {view === "loading" && (
          <motion.div key="loading" {...screenMotion} className="flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-amber-300" aria-label="Loading" />
          </motion.div>
        )}

        {/* ── BOSS LIST ───────────────────────────────────── */}
        {view === "list" && (
          <motion.div key="list" {...screenMotion} className="space-y-4">
            <header className="space-y-1 text-center">
              <h2 className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide text-amber-200">
                <Swords className="h-4 w-4" aria-hidden />
                {t("os.apps.boss")}
              </h2>
              <p dir="auto" className="text-xs text-white/50">{pickL(OS_STRINGS.boss.tagline, locale)}</p>
            </header>

            {loadError && (
              <div className="flex items-center justify-between gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                <span>{t("common.error")}</span>
                <button
                  type="button"
                  onClick={() => void load()}
                  className="rounded-lg border border-white/15 px-2 py-1 transition hover:bg-white/10"
                >
                  {pickL({ fa: "تلاش دوباره", en: "Retry" }, locale)}
                </button>
              </div>
            )}

            {groups.map((g) => (
              <section key={g.courseId} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                <header className="mb-3 flex items-center gap-2">
                  <span className="text-xl" aria-hidden>{g.emoji}</span>
                  <h3 dir="auto" className="text-sm font-semibold text-amber-100/90">{pickL(g.title, locale)}</h3>
                  <span className="ms-auto font-mono text-[10px] text-white/40">
                    {g.rows.filter((r) => r.won).length}/{g.rows.length}
                  </span>
                </header>
                <div className="space-y-2">
                  {g.rows.map((row) => (
                    <BossRowCard
                      key={row.moduleId}
                      row={row}
                      locale={locale}
                      starting={startingId === `${row.courseId}:${row.moduleId}`}
                      onStart={() => void startFight(row.courseId, row.moduleId)}
                      onLessons={() => navigate({ name: "academy", course: row.courseId })}
                    />
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        )}

        {/* ── ACTIVE BATTLE ───────────────────────────────── */}
        {view === "battle" && battle && (
          <motion.div key="battle" {...screenMotion}>
            <motion.div animate={shake}>
              <div className="space-y-4">
                <div className="space-y-1.5 text-center">
                  <motion.div
                    aria-hidden
                    className="mx-auto text-6xl"
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 6px 18px rgba(244,63,94,0.35))" }}
                  >
                    {bossEmoji}
                  </motion.div>
                  <h2 dir="auto" className="text-lg font-bold text-rose-100 sm:text-xl">
                    {pickL(bossName, locale)}
                  </h2>
                  <p dir="auto" className="text-xs italic text-white/45">
                    “{pickL(bossTaunt, locale)}”
                  </p>
                </div>

                <div className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                  <HpBar tone="boss" label={`${bossEmoji} ${pickL(OS_STRINGS.boss.hp, locale)}`} value={battle.bossHp} />
                  <HpBar tone="player" label={pickL(OS_STRINGS.boss.yourHp, locale)} value={battle.playerHp} />
                </div>

                {battle.question && (
                  <>
                    <div className="space-y-2 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300/80">
                        {locale === "fa"
                          ? `${pickL(OS_STRINGS.boss.question, locale)} ${battle.cursor + 1} از ${battle.total}`
                          : `${pickL(OS_STRINGS.boss.question, locale)} ${battle.cursor + 1} of ${battle.total}`}
                      </p>
                      <p dir="auto" className="text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                        {pickL(battle.question.q, locale)}
                      </p>
                    </div>

                    <div className="grid gap-2">
                      {battle.question.options.map((opt, i) => {
                        const isPicked = picked === i;
                        const stateCls =
                          isPicked && wasCorrect === true
                            ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100"
                            : isPicked && wasCorrect === false
                              ? "border-rose-500/70 bg-rose-500/25 text-rose-100"
                              : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]";
                        return (
                          <motion.button
                            key={i}
                            type="button"
                            dir="auto"
                            disabled={busy}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => void attack(i)}
                            className={`min-h-11 rounded-xl border px-4 py-3 text-start text-sm leading-relaxed transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                              picked !== null && !isPicked ? "opacity-50" : ""
                            } ${stateCls}`}
                          >
                            {pickL(opt, locale)}
                          </motion.button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {explain && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          dir="auto"
                          className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] p-3 text-xs leading-relaxed text-emerald-100/90"
                        >
                          💡 {pickL(explain, locale)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => void abandon()}
                  className="mx-auto block rounded-lg px-3 py-2 text-[11px] text-white/35 underline-offset-4 transition hover:text-white/70 hover:underline"
                >
                  {pickL(FLEE, locale)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── WON ─────────────────────────────────────────── */}
        {view === "won" && (
          <motion.div key="won" {...screenMotion} className="space-y-5 pt-6 text-center">
            <motion.div
              aria-hidden
              className="text-6xl sm:text-7xl"
              animate={{ scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 8px 24px rgba(251,191,36,0.4))" }}
            >
              🏆
            </motion.div>
            <h2 dir="auto" className="text-xl font-bold text-amber-200">
              {pickL(OS_STRINGS.boss.won, locale)}
            </h2>
            <p dir="auto" className="text-xs text-white/50">
              {bossEmoji} {pickL(bossName, locale)}
            </p>

            {rewards && (
              <div className="mx-auto max-w-sm space-y-2 rounded-2xl border border-amber-400/20 bg-white/[0.04] p-4 text-start">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-white/70">⚡ XP</span>
                  <span dir="auto" className="font-semibold text-amber-200">
                    {fmt(pickL(OS_STRINGS.boss.xpEarned, locale), { xp: rewards.xp })}
                  </span>
                </div>
                {rewards.multiplier > 1 && (
                  <div className="font-mono text-[10px] text-amber-300/80">
                    TEKA NIGHTS ×{rewards.multiplier}
                  </div>
                )}
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-white/70">🪙</span>
                  <span dir="auto" className="font-semibold text-amber-200">+{rewards.coins}</span>
                </div>
                {(rewards.cardKind || rewards.finalCardKind) && (
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-white/70">🃏</span>
                    <span dir="auto" className="font-semibold text-amber-200">
                      {pickL(OS_STRINGS.boss.cardEarned, locale)}
                    </span>
                  </div>
                )}
                {rewards.finalCardKind && (
                  <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    ✨ LEGENDARY
                  </div>
                )}
                {rewards.title && (
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-white/70">👑</span>
                    <span dir="auto" className="font-semibold text-amber-200">
                      {fmt(pickL(OS_STRINGS.boss.titleEarned, locale), { title: rewards.title })}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={retry}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition hover:brightness-110"
              >
                {pickL(OS_STRINGS.boss.retry, locale)}
              </button>
              <button
                type="button"
                onClick={backToList}
                className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.08]"
              >
                {pickL(OS_STRINGS.boss.allBosses, locale)}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── LOST ────────────────────────────────────────── */}
        {view === "lost" && (
          <motion.div key="lost" {...screenMotion} className="space-y-5 pt-6 text-center">
            <motion.div
              aria-hidden
              className="text-6xl"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 6px 18px rgba(244,63,94,0.3))" }}
            >
              💀
            </motion.div>
            <h2 dir="auto" className="text-lg font-bold text-rose-200">
              {pickL(OS_STRINGS.boss.lost, locale)}
            </h2>
            <p dir="auto" className="text-xs italic text-white/45">
              {bossEmoji} “{pickL(bossTaunt, locale)}”
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={retry}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition hover:brightness-110"
              >
                {pickL(OS_STRINGS.boss.retry, locale)}
              </button>
              <button
                type="button"
                onClick={backToList}
                className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.08]"
              >
                {pickL(OS_STRINGS.boss.allBosses, locale)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
