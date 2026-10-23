"use client";

// TEKA OS — Crime Lab app (Task 19-f).
// Detective noir forensics: read the evidence, answer the questions, close
// the case. The server strips answers/explanations from GET — they only
// appear after a correct submission, so the files stay honest.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ChevronLeft, Fingerprint, Search, ShieldCheck } from "lucide-react";

import { get, post, ApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { OS_STRINGS, pickL } from "@/lib/os/strings";
import { useOsSession } from "@/lib/os/session-store";

type L2 = { fa: string; en: string };

type ApiClue = {
  id: string;
  evidence: L2;
  question: L2;
  options: L2[];
};

type ApiCase = {
  id: string;
  emoji: string;
  difficulty: "EASY" | "HARD";
  title: L2;
  story: L2;
  clues: ApiClue[];
  solvedCount: number;
  total: number;
};

type MyRow = { caseId: string; clues: string[]; solved: boolean };

type AnswerRes = {
  correct: boolean;
  explain?: L2;
  caseSolved?: boolean;
  solvedClues?: string[];
  alreadySolved?: boolean;
  rewards?: { xp: number; coins: number; card: string | null };
};

export function CrimeApp() {
  const locale = useI18n((s) => s.locale);
  const L = (key: keyof typeof OS_STRINGS.crime) => pickL(OS_STRINGS.crime[key], locale);
  const fetchSession = useOsSession((s) => s.fetchSession);

  const [cases, setCases] = useState<ApiCase[] | null>(null);
  const [my, setMy] = useState<MyRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [clueIdx, setClueIdx] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const [result, setResult] = useState<{ correct: boolean; explain?: L2 } | null>(null);

  // Initial case-file sync (async → no sync setState in effect).
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await get<{ cases: ApiCase[]; my: MyRow[] }>("/api/os/crime");
        if (alive) {
          setCases(data.cases);
          setMy(data.my);
        }
      } catch (e) {
        if (alive) setError(e instanceof ApiError ? e.message : "Network error");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const opened = cases?.find((c) => c.id === openId) ?? null;
  const myRow = my.find((r) => r.caseId === openId);
  const solvedIds = myRow?.clues ?? [];
  const caseDone = !!opened && solvedIds.length >= opened.clues.length;
  const clue = opened && !caseDone ? opened.clues[clueIdx] : null;
  const nextUnsolved = opened ? opened.clues.findIndex((cl) => !solvedIds.includes(cl.id)) : -1;

  const openCase = (c: ApiCase) => {
    const row = my.find((r) => r.caseId === c.id);
    const done = row?.clues ?? [];
    const firstUnsolved = c.clues.findIndex((cl) => !done.includes(cl.id));
    setClueIdx(firstUnsolved < 0 ? 0 : firstUnsolved);
    setResult(null);
    setWrongPick(null);
    setOpenId(c.id);
  };

  const answer = async (optIdx: number) => {
    if (!opened || !clue || pending !== null || result?.correct) return;
    setPending(optIdx);
    try {
      const res = await post<AnswerRes>("/api/os/crime", {
        caseId: opened.id,
        clueId: clue.id,
        optionIndex: optIdx,
      });
      if (!res.correct) {
        setResult({ correct: false });
        setWrongPick(optIdx); // rose flash on the wrong option, retry same clue
        toast.error(L("wrong"));
        return;
      }
      setResult({ correct: true, explain: res.explain });
      setWrongPick(null);
      const nextClues = res.solvedClues ?? [];
      setMy((prev) => [
        ...prev.filter((r) => r.caseId !== opened.id),
        { caseId: opened.id, clues: nextClues, solved: !!res.caseSolved },
      ]);
      setCases((prev) =>
        prev?.map((c) => (c.id === opened.id ? { ...c, solvedCount: nextClues.length } : c)) ?? prev,
      );
      if (res.caseSolved) {
        toast.success(L("closed"));
        // Coins / XP / cards changed → refresh the OS wallet chips.
        fetchSession();
      } else {
        toast.success(L("correct"));
      }
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Network error");
    } finally {
      setPending(null);
    }
  };

  const nextClue = () => {
    if (!opened) return;
    const firstUnsolved = opened.clues.findIndex((cl) => !solvedIds.includes(cl.id));
    setClueIdx(firstUnsolved < 0 ? 0 : firstUnsolved);
    setResult(null);
    setWrongPick(null);
  };

  const backToCases = () => {
    setOpenId(null);
    setResult(null);
    setWrongPick(null);
  };

  // ── Loading / error ──────────────────────────────────────────
  if (!cases) {
    return (
      <div className="flex h-full items-center justify-center p-6" dir="auto">
        {error ? (
          <p className="max-w-xs text-center text-sm leading-relaxed text-rose-300/90">{error}</p>
        ) : (
          <p className="animate-pulse font-mono text-xs tracking-[0.3em] text-emerald-300/60">
            SYNCING CASE FILES…
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 teka-os-scroll" dir="auto">
      <div className="space-y-4">
        {/* ── Header ── */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-lg shadow-[0_0_18px_rgba(52,211,153,0.15)]">
            🕵️
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white/90">{L("tagline")}</p>
            <p className="font-mono text-[11px] tracking-widest text-emerald-300/60">CRIME LAB · TEKA OS</p>
          </div>
        </div>

        {/* ── Case selector ── */}
        {!opened && (
          <div className="grid gap-3 sm:grid-cols-2">
            {cases.map((c) => {
              const row = my.find((r) => r.caseId === c.id);
              const done = row?.clues ?? [];
              const isDone = done.length >= c.clues.length;
              return (
                <button
                  key={c.id}
                  onClick={() => openCase(c)}
                  className="group w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-start transition hover:border-emerald-400/50 hover:bg-emerald-400/5 hover:shadow-[0_0_24px_rgba(52,211,153,0.12)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{c.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-white/90">
                          {pickL(c.title, locale)}
                        </h3>
                        {isDone && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            <ShieldCheck size={11} />
                            {L("solvedBadge")}
                          </span>
                        )}
                      </div>
                      <span
                        className={`mt-1 inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider ${
                          c.difficulty === "HARD"
                            ? "border-rose-400/30 bg-rose-400/10 text-rose-300"
                            : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        }`}
                      >
                        {c.difficulty}
                      </span>
                      {/* progress dots */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          {c.clues.map((cl) => (
                            <span
                              key={cl.id}
                              className={`h-2 w-2 rounded-full transition ${
                                done.includes(cl.id) ? "bg-emerald-400" : "bg-white/15"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[11px] text-white/40">
                          {done.length}/{c.clues.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Case view ── */}
        {opened && (
          <div className="space-y-4">
            <button
              onClick={backToCases}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-white/50 transition hover:bg-white/5 hover:text-white/80"
            >
              <ChevronLeft size={14} className="rtl:rotate-180" />
              {pickL(opened.title, locale)}
            </button>

            {/* story panel */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{opened.emoji}</span>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-white/90">{pickL(opened.title, locale)}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    {pickL(opened.story, locale)}
                  </p>
                </div>
              </div>
            </div>

            {/* solved case celebration */}
            {caseDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center shadow-[0_0_30px_rgba(52,211,153,0.15)]"
              >
                <div className="text-5xl">🏅</div>
                <p className="mt-2 text-base font-bold text-emerald-200">{L("closed")}</p>
                <p className="mt-1 text-xs text-white/60">{L("reward")}</p>
                {result?.correct && result.explain && (
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75">
                    {pickL(result.explain, locale)}
                  </p>
                )}
                <button
                  onClick={backToCases}
                  className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/25"
                >
                  {L("restart")}
                </button>
              </motion.div>
            )}

            {/* active clue */}
            {clue && (
              <motion.div
                key={clue.id}
                initial={{ opacity: 0, y: 8 }}
                animate={
                  wrongPick !== null
                    ? { opacity: 1, y: 0, x: [0, -10, 10, -7, 7, -3, 0] } // rose shake
                    : { opacity: 1, y: 0, x: 0 }
                }
                transition={{ duration: wrongPick !== null ? 0.45 : 0.25 }}
                className="space-y-3"
              >
                {/* clue chip */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-300">
                    <Fingerprint size={12} />
                    {L("caseOf")
                      .replace("{i}", String(clueIdx + 1))
                      .replace("{n}", String(opened.clues.length))}
                  </span>
                </div>

                {/* evidence block */}
                <div>
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
                    <Search size={12} />
                    {L("evidence")}
                  </p>
                  <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-emerald-100/90">
                    {pickL(clue.evidence, locale)}
                  </pre>
                </div>

                {/* question */}
                <p className="text-sm font-semibold text-white/90">{pickL(clue.question, locale)}</p>

                {/* options */}
                <div className="space-y-2">
                  {clue.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => answer(i)}
                      disabled={pending !== null || !!result?.correct}
                      aria-label={L("submit")}
                      className={`w-full rounded-xl border px-4 py-3 text-start text-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        wrongPick === i
                          ? "border-rose-400/60 bg-rose-400/10 text-rose-200"
                          : result?.correct
                            ? "border-white/10 bg-white/5 text-white/50"
                            : "border-white/10 bg-white/5 text-white/85 hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:shadow-[0_0_18px_rgba(52,211,153,0.18)]"
                      }`}
                    >
                      <span className="me-2 font-mono text-emerald-300">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {pickL(opt, locale)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* correct flash + explanation + next clue */}
            {result?.correct && result.explain && clue && nextUnsolved >= 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 shadow-[0_0_26px_rgba(52,211,153,0.2)]"
              >
                <p className="text-sm font-bold text-emerald-200">{L("correct")}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                  {pickL(result.explain, locale)}
                </p>
                <button
                  onClick={nextClue}
                  className="mt-3 rounded-xl border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/25"
                >
                  {L("caseOf")
                    .replace("{i}", String(nextUnsolved + 1))
                    .replace("{n}", String(opened.clues.length))}
                  {" →"}
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
