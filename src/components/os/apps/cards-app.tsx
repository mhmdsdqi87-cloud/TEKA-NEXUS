"use client";

// TEKA OS — CODER CARDS app (Task 19-e).
// Collectible trading cards minted by the economy engine: rarity-framed
// collection grid + P2P trading (send offers, accept/decline incoming ones).
// The catalog arrives from GET /api/os/cards — economy.ts is server-only.

import { useCallback, useEffect, useState } from "react";
import { Loader2, Repeat2, Swords, Timer, Telescope, Trophy } from "lucide-react";
import { toast } from "sonner";

import { get, post } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { useT } from "@/lib/i18n";
import { OS_STRINGS, pickL, type L2 } from "@/lib/os/strings";
import { useOsSession } from "@/lib/os/session-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Types (mirror the API payload) ──────────────────────────

type CatalogEntry = { rarity: string; emoji: string; title: L2; desc: L2 };

type CardDto = {
  id: string;
  kind: string;
  rarity: string;
  serial: string;
  createdAt: string;
  known: boolean;
  emoji: string;
  title: L2;
  desc: L2;
};

type TradeDto = {
  id: string;
  cardId: string;
  status: string;
  createdAt: string;
  card: { id: string; kind: string; rarity: string; serial: string; createdAt: string };
  from?: { username: string; displayName: string };
  to?: { username: string; displayName: string };
};

type CardsPayload = {
  cards: CardDto[];
  incoming: TradeDto[];
  outgoing: TradeDto[];
  catalog: Record<string, CatalogEntry>;
};

// ─── Rarity frames (client mirror of the server RARITY_STYLE) ──

const RARITY: Record<string, { ring: string; glow: string }> = {
  COMMON: { ring: "#94a3b8", glow: "rgba(148,163,184,0.35)" },
  RARE: { ring: "#22d3ee", glow: "rgba(34,211,238,0.45)" },
  EPIC: { ring: "#a78bfa", glow: "rgba(167,139,250,0.50)" },
  LEGENDARY: { ring: "#fbbf24", glow: "rgba(251,191,36,0.55)" },
};

function rarityOf(r: string) {
  return RARITY[r] ?? RARITY.COMMON;
}

// ─── Single card face (140×190, rarity glow, serial) ─────────

function CardFace({ card, locale }: { card: CardDto; locale: string }) {
  const r = rarityOf(card.rarity);
  const legendary = card.rarity === "LEGENDARY";

  return (
    <div
      className="relative h-[190px] w-[140px] shrink-0 rounded-2xl p-[2px] transition-transform duration-200 hover:-translate-y-1"
      style={{
        background: legendary
          ? "conic-gradient(from 0deg, #f87171, #fbbf24, #4ade80, #22d3ee, #a78bfa, #f87171)"
          : `linear-gradient(160deg, ${r.ring} 0%, ${r.ring}22 55%, transparent 100%)`,
        boxShadow: `0 0 18px ${r.glow}, inset 0 0 10px ${r.glow}`,
      }}
    >
      {legendary && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        >
          <div
            className="absolute inset-y-0 -left-1/2 w-1/2"
            style={{
              background:
                "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.05) 40%, rgba(253,224,71,0.30) 50%, rgba(255,255,255,0.05) 60%, transparent 100%)",
              animation: "teka-card-shimmer 2.8s linear infinite",
            }}
          />
        </div>
      )}
      <div
        className="relative flex h-full w-full flex-col items-center justify-between rounded-2xl border bg-[#080d1a]/95 px-2 pb-2 pt-3 text-center"
        style={{ borderColor: `${r.ring}66` }}
      >
        <span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
          style={{ color: r.ring }}
        >
          {card.rarity}
        </span>
        <span className="text-4xl leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">
          {card.emoji}
        </span>
        <div className="w-full space-y-0.5">
          <p className="truncate text-[11px] font-semibold text-white/90">
            {pickL(card.title, locale)}
          </p>
          <p className="line-clamp-2 text-[9px] leading-snug text-white/40">
            {pickL(card.desc, locale)}
          </p>
        </div>
        <div className="w-full border-t border-white/[0.07] pt-1">
          <p className="truncate font-mono text-[9px] text-white/45" dir="ltr">
            {card.serial}
          </p>
          <p className="text-[9px] text-white/30">
            {new Date(card.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────

export function CardsApp() {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const S = OS_STRINGS.cards;

  const [data, setData] = useState<CardsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState<string | null>(null);

  // Trade dialog state
  const [tradeTarget, setTradeTarget] = useState<CardDto | null>(null);
  const [tradeUser, setTradeUser] = useState("");
  const [sending, setSending] = useState(false);

  const fetchSession = useOsSession((s) => s.fetchSession);

  const load = useCallback(async () => {
    try {
      const payload = await get<CardsPayload>("/api/os/cards");
      setData(payload);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load cards");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const sendOffer = async () => {
    if (!tradeTarget || !tradeUser.trim() || sending) return;
    setSending(true);
    try {
      await post("/api/os/cards", {
        action: "trade",
        cardId: tradeTarget.id,
        toUsername: tradeUser.trim(),
      });
      toast.success(pickL(S.sent, locale));
      setTradeTarget(null);
      setTradeUser("");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Trade failed");
    } finally {
      setSending(false);
    }
  };

  const respond = async (tradeId: string, accept: boolean) => {
    setResponding(tradeId);
    try {
      const res = await post<{ accepted: boolean; reason?: string }>("/api/os/cards", {
        action: "respond",
        tradeId,
        accept,
      });
      if (res.accepted) {
        toast.success(pickL(S.traded, locale));
        void fetchSession(); // card count chip may change
      } else if (res.reason) {
        toast.error(res.reason);
      }
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Respond failed");
    } finally {
      setResponding(null);
    }
  };

  const catalogInfo = (kind: string): CatalogEntry =>
    data?.catalog[kind] ?? {
      rarity: "COMMON",
      emoji: "❔",
      title: { en: kind, fa: kind },
      desc: { en: "Unknown artifact.", fa: "آرتیفکت ناشناخته." },
    };

  return (
    <div dir="auto" className="h-full space-y-4 overflow-y-auto teka-os-scroll p-4">
      {/* Legendary shimmer keyframes (scoped by unique name) */}
      <style>{`@keyframes teka-card-shimmer { 0% { transform: translateX(-160%) skewX(-12deg); } 100% { transform: translateX(340%) skewX(-12deg); } }`}</style>

      {/* ── header ── */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-white/90">{pickL(S.collection, locale)}</h2>
          <p className="text-xs text-white/45">{pickL(S.tagline, locale)}</p>
        </div>
        {data && (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/60">
            {data.cards.length} / {Object.keys(data.catalog).length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-white/40" />
        </div>
      ) : !data ? (
        <div className="flex h-40 items-center justify-center text-sm text-white/45">
          {t("os.common.error")}
        </div>
      ) : data.cards.length === 0 ? (
        /* ── empty state: how to earn ── */
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] text-3xl">
              🃏
            </div>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/60">
              {pickL(S.empty, locale)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              {pickL(S.howToEarn, locale)}
            </h3>
            <p className="mb-3 font-mono text-[10px] leading-relaxed text-amber-300/80" dir="ltr">
              {pickL(OS_STRINGS.shop.earnHint, locale)}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Swords, label: t("os.apps.boss"), hint: "BOSS1" },
                { icon: Telescope, label: t("os.apps.crime"), hint: "CRIME1 · CRIME2" },
                { icon: Timer, label: t("os.apps.speedrun"), hint: "SPEED" },
                { icon: Trophy, label: t("os.apps.war"), hint: "WARVET" },
              ].map((row) => (
                <div
                  key={row.hint}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2"
                >
                  <row.icon className="h-3.5 w-3.5 shrink-0 text-cyan-300/80" />
                  <span className="min-w-0 flex-1 truncate text-[11px] text-white/70">
                    {row.label}
                  </span>
                  <span className="shrink-0 font-mono text-[9px] text-white/35" dir="ltr">
                    {row.hint}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── collection grid ── */
        <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
          {data.cards.map((card) => (
            <div key={card.id} className="space-y-1.5">
              <CardFace card={card} locale={locale} />
              <Button
                size="sm"
                variant="outline"
                className="h-7 w-full gap-1.5 border-white/10 bg-white/[0.04] text-[11px] text-white/75 hover:bg-white/[0.09]"
                onClick={() => {
                  setTradeTarget(card);
                  setTradeUser("");
                }}
              >
                <Repeat2 className="h-3 w-3" />
                {pickL(S.trade, locale)}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* ── incoming offers ── */}
      {data && data.incoming.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
            {pickL(S.incoming, locale)}
            <span className="ml-2 font-mono text-[10px] text-cyan-300/80">
              {data.incoming.length}
            </span>
          </h3>
          <div className="space-y-2">
            {data.incoming.map((offer) => {
              const info = catalogInfo(offer.card.kind);
              return (
                <div
                  key={offer.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2"
                >
                  <span className="text-xl">{info.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-white/85">
                      {pickL(info.title, locale)}
                    </p>
                    <p className="truncate text-[10px] text-white/45">
                      @{offer.from?.username ?? "—"} ·{" "}
                      <span className="font-mono" dir="ltr">
                        {offer.card.serial}
                      </span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      size="sm"
                      className="h-7 bg-emerald-500/85 px-3 text-[11px] text-white hover:bg-emerald-500"
                      disabled={responding === offer.id}
                      onClick={() => void respond(offer.id, true)}
                    >
                      {responding === offer.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        pickL(S.accept, locale)
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 border-rose-400/25 bg-rose-500/[0.08] px-3 text-[11px] text-rose-300/90 hover:bg-rose-500/[0.15]"
                      disabled={responding === offer.id}
                      onClick={() => void respond(offer.id, false)}
                    >
                      {pickL(S.decline, locale)}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── trade dialog ── */}
      <Dialog open={tradeTarget !== null} onOpenChange={(o) => !o && setTradeTarget(null)}>
        <DialogContent className="sm:max-w-sm" dir="auto">
          {tradeTarget && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-sm">
                  <span className="text-xl">{tradeTarget.emoji}</span>
                  {pickL(S.tradeWith, locale)}
                </DialogTitle>
                <DialogDescription className="font-mono text-[10px]" dir="ltr">
                  {tradeTarget.serial}
                </DialogDescription>
              </DialogHeader>
              <Input
                autoFocus
                value={tradeUser}
                onChange={(e) => setTradeUser(e.target.value)}
                placeholder="@username"
                className="font-mono text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") void sendOffer();
                }}
              />
              <DialogFooter className="gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-white/60"
                  onClick={() => setTradeTarget(null)}
                >
                  {t("os.common.cancel")}
                </Button>
                <Button
                  size="sm"
                  className="bg-cyan-500/85 text-xs text-[#04121a] hover:bg-cyan-400"
                  disabled={!tradeUser.trim() || sending}
                  onClick={() => void sendOffer()}
                >
                  {sending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    pickL(S.tradeSend, locale)
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
