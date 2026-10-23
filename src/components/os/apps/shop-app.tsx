"use client";

// TEKA OS — TEKA COIN SHOP app (Task 19-e).
// Spend TEKA Coins on profile frames, titles and buddy skins; equip what you
// own. Equip state reaches the OS chrome via /api/os/session (refreshed here
// after every mutation) — this app never touches the session route.

import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, Check, Coins, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { get, post } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { OS_STRINGS, pickL, type L2 } from "@/lib/os/strings";
import { useOsSession } from "@/lib/os/session-store";

import { Button } from "@/components/ui/button";

// ─── Types (mirror the API payload) ──────────────────────────

type ShopItem = {
  itemKey: string;
  type: "frame" | "title" | "skin";
  price: number;
  name: L2;
  preview: string; // hex color (frame) · "conic" (legendary frame) · "italic" (title) · emoji (skin)
};

type OwnedDto = { itemKey: string; equipped: boolean };

type ShopPayload = {
  coins: number;
  owned: OwnedDto[];
  catalog: ShopItem[];
};

// ─── Preview swatch ──────────────────────────────────────────

function Preview({ item, locale }: { item: ShopItem; locale: string }) {
  if (item.type === "frame") {
    if (item.preview === "conic") {
      // Legendary: animated rainbow ring.
      return (
        <span
          aria-hidden
          className="block h-10 w-10 animate-[spin_2.6s_linear_infinite] rounded-full p-[3px]"
          style={{
            background: "conic-gradient(from 0deg, #f87171, #fbbf24, #4ade80, #22d3ee, #a78bfa, #f87171)",
            boxShadow: "0 0 16px rgba(251,191,36,0.45)",
          }}
        >
          <span className="block h-full w-full rounded-full bg-[#0a0f1e]" />
        </span>
      );
    }
    return (
      <span
        aria-hidden
        className="block h-10 w-10 rounded-full border-[3px]"
        style={{ borderColor: item.preview, boxShadow: `0 0 12px ${item.preview}55` }}
      />
    );
  }

  if (item.type === "title") {
    return (
      <span className="flex h-10 max-w-[110px] items-center overflow-hidden rounded-lg border border-amber-300/20 bg-amber-300/[0.05] px-2">
        <span className="truncate text-[11px] italic text-amber-200/90">
          “{pickL(item.name, locale)}”
        </span>
      </span>
    );
  }

  // Skin — emoji buddy.
  return (
    <span
      aria-hidden
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-2xl"
      style={{ boxShadow: "0 0 12px rgba(255,255,255,0.08)" }}
    >
      {item.preview}
    </span>
  );
}

// ─── App ─────────────────────────────────────────────────────

export function ShopApp() {
  const locale = useI18n((s) => s.locale);
  const S = OS_STRINGS.shop;

  const [data, setData] = useState<ShopPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const sessionTitle = useOsSession((s) => s.session?.title ?? null);

  const load = useCallback(async () => {
    try {
      const payload = await get<ShopPayload>("/api/os/shop");
      setData(payload);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load shop");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const act = async (action: "buy" | "equip", item: ShopItem) => {
    if (busy) return;
    setBusy(item.itemKey);
    try {
      if (action === "buy") {
        await post("/api/os/shop", { action, itemKey: item.itemKey });
        toast.success(pickL(S.bought, locale));
      } else {
        await post("/api/os/shop", { action, itemKey: item.itemKey });
        toast.success(pickL(S.equipped, locale));
      }
      await load();
      useOsSession.getState().fetchSession(); // coins chip + title update live
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Shop action failed");
    } finally {
      setBusy(null);
    }
  };

  const ownedMap = new Map((data?.owned ?? []).map((o) => [o.itemKey, o]));
  const isEquipped = (item: ShopItem, owned?: OwnedDto) => {
    if (!owned) return false;
    // Titles equip through User.title (session), frames/skins through the row flag.
    return item.type === "title" ? sessionTitle === item.name.fa : owned.equipped;
  };

  const groups: { type: ShopItem["type"]; label: string }[] = [
    { type: "frame", label: pickL(S.frames, locale) },
    { type: "title", label: locale === "fa" ? "عنوان‌ها" : "Titles" },
    { type: "skin", label: locale === "fa" ? "اسکین همراه" : "Buddy skins" },
  ];

  return (
    <div dir="auto" className="h-full space-y-4 overflow-y-auto teka-os-scroll p-4">
      {/* ── balance header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-300/10">
            <Coins className="h-5 w-5 text-amber-300" />
          </span>
          <div>
            <p className="font-mono text-lg font-bold leading-none text-amber-200" dir="ltr">
              {data?.coins ?? 0}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-amber-200/60">
              {pickL(S.balance, locale)}
            </p>
          </div>
        </div>
        <p className="max-w-full font-mono text-[10px] leading-relaxed text-white/45" dir="auto">
          {pickL(S.earnHint, locale)}
        </p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-white/40" />
        </div>
      ) : !data ? (
        <div className="flex h-40 items-center justify-center text-sm text-white/45">—</div>
      ) : (
        groups.map((group) => {
          const items = data.catalog.filter((i) => i.type === group.type);
          if (items.length === 0) return null;
          return (
            <section key={group.type} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                  const owned = ownedMap.get(item.itemKey);
                  const equipped = isEquipped(item, owned);
                  const affordable = data.coins >= item.price;
                  const pending = busy === item.itemKey;

                  return (
                    <div
                      key={item.itemKey}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]"
                    >
                      <Preview item={item} locale={locale} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white/85">
                          {pickL(item.name, locale)}
                        </p>
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-1.5 py-0.5 font-mono text-[10px] text-amber-200/90">
                          <Coins className="h-2.5 w-2.5" />
                          {item.price}
                        </span>
                      </div>
                      <div className="shrink-0">
                        {owned ? (
                          equipped ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-2 py-1 text-[10px] font-medium text-emerald-300">
                              <BadgeCheck className="h-3 w-3" />
                              {pickL(S.equipped, locale)}
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1.5 border-white/12 bg-white/[0.04] px-3 text-[11px] text-white/80 hover:bg-white/[0.09]"
                              disabled={pending}
                              onClick={() => void act("equip", item)}
                            >
                              {pending ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Sparkles className="h-3 w-3" />
                              )}
                              {pickL(S.equip, locale)}
                            </Button>
                          )
                        ) : (
                          <Button
                            size="sm"
                            className={
                              affordable
                                ? "h-8 min-w-[64px] bg-amber-400/90 px-3 text-[11px] font-semibold text-[#231a02] hover:bg-amber-300"
                                : "h-8 min-w-[64px] cursor-not-allowed bg-amber-400/10 px-3 text-[11px] font-medium text-amber-300/70"
                            }
                            disabled={!affordable || pending}
                            onClick={() => void act("buy", item)}
                          >
                            {pending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : affordable ? (
                              pickL(S.buy, locale)
                            ) : (
                              pickL(S.notEnough, locale)
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })
      )}

      {/* ── owned footer ── */}
      {data && data.owned.length > 0 && (
        <p className="flex items-center gap-1.5 pb-1 text-[10px] text-white/35">
          <Check className="h-3 w-3 text-emerald-300/70" />
          {pickL(S.owned, locale)}: {data.owned.length}
        </p>
      )}
    </div>
  );
}
