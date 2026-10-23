"use client";

// TEKA OS — Code Pet (Task 19-a).
// A digital buddy that hatches after your first Academy lesson and evolves as
// you feed it. Hunger decays server-side (~1/hour); this window is a view over
// GET /api/os/pet plus the hatch/feed/play/rename mutations. Every mutation
// refreshes the shared OS session so the status-bar pet chip stays live.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Gamepad2, Loader2, Pencil, RefreshCw, Sparkles, Utensils } from "lucide-react";

import { get, post, ApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { pickL, OS_STRINGS } from "@/lib/os/strings";
import { useT } from "@/lib/i18n";
import { useOsSession } from "@/lib/os/session-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Pet = {
  id: string;
  name: string;
  stage: number;
  hunger: number;
  feeds: number;
  plays: number;
  lastFedAt: string | null;
};

type PetPayload = { pet: Pet | null; evolved?: boolean; xp?: number };

const STAGE_EMOJI = ["🥚", "🐣", "🐥", "🦜", "🐉"] as const;
const STAGE_GLOW = [
  "rgba(251,191,36,0.45)",
  "rgba(52,211,153,0.45)",
  "rgba(34,211,238,0.45)",
  "rgba(167,139,250,0.5)",
  "rgba(251,191,36,0.55)",
] as const;
const DOT_FILL = [
  "bg-emerald-400/80",
  "bg-emerald-400",
  "bg-cyan-400",
  "bg-violet-400",
  "bg-amber-400",
] as const;

const HOUR_MS = 3_600_000;
const FEED_COOLDOWN_MS = 4 * HOUR_MS;

function clampStage(stage: number): number {
  return Math.min(4, Math.max(0, Math.floor(stage)));
}

function fmtLeft(ms: number): string {
  const totalMin = Math.max(1, Math.ceil(ms / 60_000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function PetApp() {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const L = OS_STRINGS.pet;

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryTick, setRetryTick] = useState(0);

  // Lesson gate for the hatch button (null = unknown → let the server decide).
  const [lessonsDone, setLessonsDone] = useState<number | null>(null);

  const [busy, setBusy] = useState<null | "hatch" | "feed" | "play" | "rename">(null);
  const [playedToday, setPlayedToday] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [nowTs, setNowTs] = useState(() => Date.now());

  // Initial pet load — all state writes happen in promise callbacks.
  useEffect(() => {
    let alive = true;
    get<PetPayload>("/api/os/pet")
      .then((d) => {
        if (!alive) return;
        setPet(d.pet);
        setLoadError(false);
      })
      .catch(() => {
        if (alive) setLoadError(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [retryTick]);

  // How many Academy lessons are done (hatch gate preview).
  useEffect(() => {
    let alive = true;
    get<{ progress: Array<{ completedLessons: string[] }> }>("/api/academy")
      .then((d) => {
        if (!alive) return;
        const total = d.progress.reduce((n, p) => n + p.completedLessons.length, 0);
        setLessonsDone(total);
      })
      .catch(() => {
        /* unknown — the server still enforces the gate on hatch */
      });
    return () => {
      alive = false;
    };
  }, []);

  // Keep the feed cooldown countdown honest.
  useEffect(() => {
    const id = setInterval(() => setNowTs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  async function mutate(action: "hatch" | "feed" | "play" | "rename", name?: string) {
    if (busy) return;
    setBusy(action);
    try {
      const data = await post<PetPayload>("/api/os/pet", { action, name });
      if (data.pet) setPet(data.pet);

      if (action === "hatch") {
        toast.success(pickL(L.tagline, locale));
      } else if (action === "feed") {
        toast.success(pickL(L.fedToast, locale));
        if (data.evolved) toast.success(pickL(L.evolvedToast, locale));
      } else if (action === "play") {
        setPlayedToday(true);
        toast.success(pickL(L.playToast, locale));
      } else {
        setRenameOpen(false);
      }

      // Refresh the status-bar chips (wallet / pet / team).
      useOsSession.getState().fetchSession();
    } catch (e) {
      if (action === "play" && e instanceof ApiError && e.status === 400) setPlayedToday(true);
      toast.error(e instanceof ApiError ? e.message : t("os.common.error"));
    } finally {
      setBusy(null);
    }
  }

  // ─── loading / error states ────────────────────────────────

  if (loading) {
    return (
      <div className="flex max-h-full items-center justify-center p-10 teka-os-scroll" data-testid="pet-loading">
        <div className="flex flex-col items-center gap-3 text-white/50">
          <Loader2 size={26} className="animate-spin text-cyan-300/80" />
          <span className="text-xs" dir="auto">{t("os.common.loading")}</span>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex max-h-full items-center justify-center p-10 teka-os-scroll">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs text-rose-300/80" dir="auto">{t("os.common.error")}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true);
              setRetryTick((n) => n + 1);
            }}
            className="border-white/15 bg-white/[0.05] text-white/80 hover:bg-white/[0.09]"
          >
            <RefreshCw size={13} /> {t("os.common.refresh")}
          </Button>
        </div>
      </div>
    );
  }

  // ─── derived pet state ─────────────────────────────────────

  const stageLabels = [L.stage0, L.stage1, L.stage2, L.stage3, L.stage4];
  const stage = pet ? clampStage(pet.stage) : 0;
  const stageLabel = pickL(stageLabels[stage], locale);
  const statusText = !pet
    ? ""
    : pet.hunger >= 70
      ? pickL(L.happy, locale)
      : pet.hunger >= 30
        ? pickL(L.sad, locale)
        : pickL(L.hungry, locale);

  const feedLeftMs = pet?.lastFedAt
    ? Math.max(0, new Date(pet.lastFedAt).getTime() + FEED_COOLDOWN_MS - nowTs)
    : 0;
  const canFeed = !!pet && feedLeftMs === 0;
  const fullHint = !!pet && pet.hunger >= 95 && feedLeftMs > 0;

  return (
    <div className="max-h-full space-y-4 overflow-y-auto p-4 teka-os-scroll" data-testid="pet-app">
      {/* ── glowing habitat ── */}
      <div className="relative mx-auto flex h-44 w-44 shrink-0 items-center justify-center rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(34,211,238,0.16) 0%, rgba(167,139,250,0.10) 45%, rgba(4,6,14,0) 72%)",
          }}
        />
        <div className="absolute inset-0 rounded-full border border-cyan-300/20" />
        <div className="absolute inset-2.5 rounded-full border border-violet-300/15" />
        <div
          className="absolute inset-0 animate-pulse rounded-full"
          style={{ boxShadow: `0 0 70px -8px ${STAGE_GLOW[stage]}` }}
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative text-6xl leading-none select-none"
          role="img"
          aria-label={stageLabel}
        >
          {STAGE_EMOJI[stage]}
        </motion.div>
      </div>

      {!pet ? (
        /* ── hatch screen ── */
        <div className="space-y-4" data-testid="pet-hatch">
          <div className="space-y-1.5 text-center">
            <h2 className="text-base font-bold text-white/90" dir="auto">{pickL(L.hatch, locale)}</h2>
            <p
              className={`text-xs leading-relaxed ${lessonsDone === 0 ? "font-medium text-amber-300/80" : "text-white/45"}`}
              dir="auto"
            >
              {pickL(L.hatchHint, locale)}
            </p>
          </div>
          <Button
            data-testid="pet-hatch-btn"
            disabled={lessonsDone === 0 || busy === "hatch"}
            onClick={() => mutate("hatch")}
            className="h-11 w-full bg-gradient-to-r from-amber-400 to-orange-500 font-bold text-[#1a1000] shadow-[0_10px_30px_-10px_rgba(251,191,36,0.6)] transition hover:from-amber-300 hover:to-orange-400"
          >
            {busy === "hatch" ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
            {pickL(L.hatch, locale)}
          </Button>
        </div>
      ) : (
        /* ── pet view ── */
        <>
          <div className="space-y-2 text-center" data-testid="pet-view">
            <h2 className="text-lg font-bold text-white/90" dir="auto">
              {pet.name || stageLabel}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-200" dir="auto">
                {stageLabel}
              </span>
              <span className="text-xs text-white/55" dir="auto" aria-live="polite">
                {statusText}
              </span>
            </div>
          </div>

          {/* hunger bar — emerald → amber → rose */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-white/50">
              <span dir="auto">{pickL(L.hunger, locale)}</span>
              <span className="font-mono" data-testid="pet-hunger">{pet.hunger}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  pet.hunger >= 70 ? "bg-emerald-400" : pet.hunger >= 30 ? "bg-amber-400" : "bg-rose-400"
                }`}
                style={{ width: `${pet.hunger}%` }}
                role="progressbar"
                aria-valuenow={pet.hunger}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={pickL(L.hunger, locale)}
              />
            </div>
          </div>

          {/* counters */}
          <div className="flex justify-center gap-2 text-[11px]">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-white/70" dir="auto">
              🍽️ {pet.feeds} <span className="text-white/40">{pickL(L.feedsCount, locale)}</span>
            </span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-white/70" dir="auto">
              🎮 {pet.plays}
            </span>
          </div>

          {/* actions */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              data-testid="pet-feed"
              variant="outline"
              disabled={!canFeed || busy === "feed"}
              onClick={() => mutate("feed")}
              title={feedLeftMs > 0 ? `${pickL(L.feed, locale)} · ${fmtLeft(feedLeftMs)}` : undefined}
              className="h-auto min-h-11 flex-col gap-0.5 border-emerald-400/30 bg-emerald-500/10 px-2 text-emerald-200 transition hover:bg-emerald-500/20"
            >
              <span className="flex items-center gap-1.5">
                {busy === "feed" ? <Loader2 size={13} className="animate-spin" /> : <Utensils size={13} />}
                {pickL(L.feed, locale)}
              </span>
              {feedLeftMs > 0 && (
                <span className="font-mono text-[10px] text-emerald-200/60">{fmtLeft(feedLeftMs)}</span>
              )}
              {feedLeftMs === 0 && (
                <span className="font-mono text-[10px] text-emerald-200/40">+8 XP</span>
              )}
            </Button>

            <Button
              data-testid="pet-play"
              variant="outline"
              disabled={playedToday || busy === "play"}
              onClick={() => mutate("play")}
              className="h-auto min-h-11 flex-col gap-0.5 border-violet-400/30 bg-violet-500/10 px-2 text-violet-200 transition hover:bg-violet-500/20"
            >
              <span className="flex items-center gap-1.5">
                {busy === "play" ? <Loader2 size={13} className="animate-spin" /> : <Gamepad2 size={13} />}
                {pickL(L.play, locale)}
              </span>
              <span className="font-mono text-[10px] text-violet-200/40">
                {playedToday ? "✓" : "+5 XP"}
              </span>
            </Button>

            <Button
              data-testid="pet-rename"
              variant="outline"
              onClick={() => {
                setDraftName(pet.name);
                setRenameOpen(true);
              }}
              className="h-auto min-h-11 flex-col gap-0.5 border-white/10 bg-white/[0.04] px-2 text-white/70 transition hover:bg-white/[0.09]"
            >
              <span className="flex items-center gap-1.5">
                <Pencil size={13} />
                {pickL(L.rename, locale)}
              </span>
              <span className="max-w-full truncate font-mono text-[10px] text-white/35" dir="auto">
                {pet.name || "—"}
              </span>
            </Button>
          </div>

          {fullHint && (
            <p className="text-center text-[11px] text-emerald-300/70" dir="auto">
              {pickL(L.full, locale)}
            </p>
          )}

          {/* evolution strip */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4" data-testid="pet-evolution">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wide text-white/60" dir="auto">
                {pickL(L.evolution, locale)}
              </span>
              <span className="font-mono text-[10px] text-white/40">{stage}/4</span>
            </div>
            <div className="relative">
              <div className="absolute left-0 right-0 top-[7px] h-px bg-white/10" />
              <div
                className="absolute left-0 top-[7px] h-px bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 transition-all duration-500"
                style={{ width: `${(stage / 4) * 100}%` }}
              />
              <div className="relative flex justify-between">
                {STAGE_EMOJI.map((_, i) => (
                  <div key={i} className="flex w-12 flex-col items-center gap-1.5">
                    <span
                      className={`h-3.5 w-3.5 rounded-full transition ${
                        i <= stage
                          ? `${DOT_FILL[i]} ${i === stage ? "ring-2 ring-white/25" : ""}`
                          : "bg-white/10"
                      }`}
                      style={i === stage ? { boxShadow: `0 0 10px ${STAGE_GLOW[i]}` } : undefined}
                    />
                    <span
                      className={`text-center text-[9px] leading-tight ${
                        i <= stage ? "text-white/60" : "text-white/25"
                      }`}
                      dir="auto"
                    >
                      {pickL(stageLabels[i], locale)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-white/40" dir="auto">
              {pickL(L.stageHint, locale)}
            </p>
          </div>
        </>
      )}

      {/* ── rename dialog ── */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="border-white/10 bg-[#0a0f1e]/95 text-white backdrop-blur-2xl sm:max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-sm" dir="auto">{pickL(L.rename, locale)}</DialogTitle>
          </DialogHeader>
          <Input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            maxLength={24}
            placeholder={pickL(L.namePlaceholder, locale)}
            dir="auto"
            data-testid="pet-rename-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && draftName.trim()) mutate("rename", draftName.trim());
            }}
          />
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRenameOpen(false)}
              className="text-white/60 hover:bg-white/[0.06] hover:text-white/80"
              dir="auto"
            >
              {t("os.common.cancel")}
            </Button>
            <Button
              size="sm"
              disabled={!draftName.trim() || busy === "rename"}
              onClick={() => mutate("rename", draftName.trim())}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold text-white hover:from-violet-400 hover:to-fuchsia-400"
              dir="auto"
            >
              {busy === "rename" ? <Loader2 size={13} className="animate-spin" /> : t("os.common.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
