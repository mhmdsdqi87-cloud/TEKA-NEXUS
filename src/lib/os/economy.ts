// TEKA NEXUS — TEKA OS economy (SERVER ONLY).
// Coins ledger + activity log + collectible card minting.
// Every mutating OS route funnels through these helpers so the economy,
// heatmap and time machine stay consistent.

import { randomBytes } from "crypto";
import { db } from "@/lib/db";

// ─── Coins ───────────────────────────────────────────────────

/** Credit/debit TEKA Coins (ledger + cached balance on User). */
export async function awardCoins(userId: string, delta: number, reason: string) {
  await db.coinLedger.create({ data: { userId, delta, reason } });
  const user = await db.user.update({
    where: { id: userId },
    data: { coins: { increment: delta } },
    select: { coins: true },
  });
  // Never let the balance go negative (spend paths validate first).
  if (user.coins < 0) {
    await db.user.update({ where: { id: userId }, data: { coins: 0 } });
    await db.coinLedger.create({ data: { userId, delta: -user.coins, reason: "clamp:floor" } });
    return 0;
  }
  return user.coins;
}

// ─── Activity log (heatmap + time machine source) ────────────

export type ActivityKind =
  | "lesson" | "boss" | "crime" | "war" | "pet"
  | "card" | "speedrun" | "shop" | "voice" | "coin" | "os";

export async function logActivity(userId: string, kind: ActivityKind, meta: Record<string, unknown> = {}) {
  await db.activityLog.create({
    data: { userId, kind, meta: JSON.stringify(meta).slice(0, 500) },
  });
}

// ─── Collectible cards ───────────────────────────────────────

export type CardRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

export const CARD_CATALOG: Record<
  string,
  {
    rarity: CardRarity;
    emoji: string;
    title: { en: string; fa: string };
    desc: { en: string; fa: string };
  }
> = {
  WELCOME: {
    rarity: "COMMON", emoji: "🚪",
    title: { en: "First Step", fa: "قدم اول" },
    desc: { en: "Entered TEKA OS for the first time.", fa: "برای اولین بار وارد TEKA OS شدی." },
  },
  STREAK7: {
    rarity: "RARE", emoji: "🔥",
    title: { en: "Week of Fire", fa: "هفته آتشین" },
    desc: { en: "Active 7 different days.", fa: "۷ روز مختلف فعال بودی." },
  },
  BOSS1: {
    rarity: "EPIC", emoji: "⚔️",
    title: { en: "First Blood", fa: "اولین شکار" },
    desc: { en: "Defeated your first boss.", fa: "اولین باست رو شکست دادی." },
  },
  FINAL_PY: {
    rarity: "LEGENDARY", emoji: "🐍",
    title: { en: "Python Slayer", fa: "قاتل پایتون" },
    desc: { en: "Mastered the Python course boss.", fa: "باس نهایی دوره پایتون رو شکست دادی." },
  },
  FINAL_WEB: {
    rarity: "LEGENDARY", emoji: "🕸️",
    title: { en: "Tag Tamer", fa: "رام‌کننده تگ‌ها" },
    desc: { en: "Mastered the HTML course boss.", fa: "باس نهایی دوره HTML رو شکست دادی." },
  },
  FINAL_CSS: {
    rarity: "LEGENDARY", emoji: "🎨",
    title: { en: "Style Warlock", fa: "جادوگر استایل" },
    desc: { en: "Mastered the CSS course boss.", fa: "باس نهایی دوره CSS رو شکست دادی." },
  },
  FINAL_JS: {
    rarity: "LEGENDARY", emoji: "⚡",
    title: { en: "Async Ghost", fa: "روح ناهمگام" },
    desc: { en: "Mastered the JS course boss.", fa: "باس نهایی دوره جاوااسکریپت رو شکست دادی." },
  },
  CRIME1: {
    rarity: "RARE", emoji: "🔎",
    title: { en: "Detective", fa: "کارآگاه" },
    desc: { en: "Solved your first crime scene.", fa: "اولین صحنه جرم رو حل کردی." },
  },
  CRIME2: {
    rarity: "EPIC", emoji: "🕵️",
    title: { en: "Master Detective", fa: "کارآگاه ارشد" },
    desc: { en: "Solved both crime scenes.", fa: "هر دو صحنه جرم رو حل کردی." },
  },
  SPEED: {
    rarity: "EPIC", emoji: "🏎️",
    title: { en: "Speedrunner", fa: "سرعتی‌باز" },
    desc: { en: "Set a module speedrun record.", fa: "رکورد سرعت یک ماژول رو ثبت کردی." },
  },
  WARVET: {
    rarity: "EPIC", emoji: "🪖",
    title: { en: "War Veteran", fa: "کهنه‌سرباز جنگ" },
    desc: { en: "Completed every war task in one week.", fa: "همه مأموریت‌های جنگ رو در یک هفته انجام دادی." },
  },
  RICH: {
    rarity: "RARE", emoji: "💰",
    title: { en: "Coin Hoarder", fa: "گنج‌ور" },
    desc: { en: "Held 500+ TEKA Coins at once.", fa: "یک‌بار ۵۰۰ سکه تکا هم‌زمان داشتی." },
  },
  COLLECTOR: {
    rarity: "LEGENDARY", emoji: "🃏",
    title: { en: "Collector", fa: "کلکسیونر" },
    desc: { en: "Owned 5 different cards.", fa: "۵ کارت متفاوت جمع کردی." },
  },
};

const RARITY_STYLE: Record<CardRarity, { ring: string; glow: string }> = {
  COMMON: { ring: "#94a3b8", glow: "rgba(148,163,184,0.35)" },
  RARE: { ring: "#22d3ee", glow: "rgba(34,211,238,0.45)" },
  EPIC: { ring: "#a78bfa", glow: "rgba(167,139,250,0.5)" },
  LEGENDARY: { ring: "#fbbf24", glow: "rgba(251,191,36,0.55)" },
};

export function rarityStyle(rarity: string) {
  return RARITY_STYLE[(rarity as CardRarity) ?? "COMMON"] ?? RARITY_STYLE.COMMON;
}

function randomSerial(kind: string): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  let code = "";
  for (const b of bytes) code += alphabet[b % alphabet.length];
  return `TEKA-${kind}-${code}`;
}

/** Mint a card (idempotent — one card per kind per user). Returns the card or null. */
export async function mintCard(userId: string, kind: string) {
  const spec = CARD_CATALOG[kind];
  if (!spec) return null;
  try {
    return await db.card.create({
      data: { userId, kind, rarity: spec.rarity, serial: randomSerial(kind) },
    });
  } catch {
    return null; // unique(userId, kind) → already owned
  }
}

// ─── Milestone sweep (called from the OS session route) ──────

/** Distinct active days (any activity) in the last 30 days. */
async function distinctActiveDays(userId: string): Promise<number> {
  const since = new Date(Date.now() - 30 * 24 * 3_600_000);
  const rows = await db.activityLog.findMany({
    where: { userId, createdAt: { gte: since } },
    select: { createdAt: true },
  });
  const days = new Set(rows.map((r) => r.createdAt.toISOString().slice(0, 10)));
  return days.size;
}

/**
 * Idempotent milestone minting — safe to call on every session fetch.
 * Cheap enough (indexed count queries) and keeps cards earned automatically.
 */
export async function maybeMintMilestones(userId: string): Promise<string[]> {
  const minted: string[] = [];

  const owned = await db.card.findMany({ where: { userId }, select: { kind: true } });
  const have = new Set(owned.map((c) => c.kind));

  const tryMint = async (kind: string) => {
    if (have.has(kind) || !CARD_CATALOG[kind]) return;
    const card = await mintCard(userId, kind);
    if (card) {
      minted.push(kind);
      await logActivity(userId, "card", { kind });
    }
  };

  await tryMint("WELCOME");

  if (!have.has("STREAK7") && (await distinctActiveDays(userId)) >= 7) await tryMint("STREAK7");

  const [coins, bossWins, crimesSolved, speedruns] = await Promise.all([
    db.user.findUnique({ where: { id: userId }, select: { coins: true } }),
    db.bossBattle.count({ where: { userId, status: "WON" } }),
    db.crimeProgress.count({ where: { userId, solved: true } }),
    db.speedrunRecord.count({ where: { userId } }),
  ]);

  if ((coins?.coins ?? 0) >= 500) await tryMint("RICH");
  if (bossWins >= 1) await tryMint("BOSS1");
  if (crimesSolved >= 1) await tryMint("CRIME1");
  if (crimesSolved >= 2) await tryMint("CRIME2");
  if (speedruns >= 1) await tryMint("SPEED");
  if (owned.length + minted.length >= 5) await tryMint("COLLECTOR");

  return minted;
}

// ─── XP helper with event multiplier ─────────────────────────

/** Award XP honoring the TEKA NIGHTS 2× multiplier. */
export async function awardXp(userId: string, baseXp: number) {
  const { tekaEventWindow } = await import("./events");
  const mult = tekaEventWindow().multiplier;
  const xp = Math.round(baseXp * mult);
  await db.user.update({ where: { id: userId }, data: { xp: { increment: xp } } });
  return { xp, multiplier: mult };
}
