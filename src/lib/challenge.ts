// TEKA NEXUS — Weekly challenge engine (server-side).
// One active challenge per Iranian week (Sat→Fri). Auto-created on first
// read; progress recomputed from real activity; completion awards XP once
// through the idempotent awardContribution() unique key.

import { db } from "@/lib/db";
import { currentWeekWindow } from "@/lib/week";
import { awardContribution } from "@/lib/server";

// Rotating weekly challenge lineup — picked deterministically by ISO week
// number so every visitor sees the same challenge in the same week.
const TEMPLATES = [
  {
    title: "اسپرینت انرژی ⚡",
    description: "این هفته ۱۵ فعالیت در نکسوس انجام بده: لایک، کامنت، پیام تیمی یا آپدیت پروژه.",
    xpReward: 150,
    target: 15,
  },
  {
    title: "شبکه‌سازی حرفه‌ای 🤝",
    description: "با ۱۲ فعالیت جامعه را زنده نگه دار — کامنت‌های مفید، لایک و هم‌فکری در چت تیمی.",
    xpReward: 150,
    target: 12,
  },
  {
    title: "موتور محتوا 🔥",
    description: "۱۸ فعالیت این هفته: نظر بنویس، پیام بده، آپدیت منتشر کن و پروژه‌ها را حمایت کن.",
    xpReward: 200,
    target: 18,
  },
  {
    title: "پالس طلایی 🏆",
    description: "۲۰ فعالیت در ۷ روز — رکورد هفته را بشکن و ۲۵۰ XP بگیر.",
    xpReward: 250,
    target: 20,
  },
] as const;

function isoWeekIndex(d: Date): number {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = (date.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
  date.setUTCDate(date.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  return 1 + Math.round((date.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

export function templateFor(weekStart: Date) {
  return TEMPLATES[isoWeekIndex(weekStart) % TEMPLATES.length];
}

/** Find this week's challenge or create it (idempotent, race-safe enough). */
export async function ensureCurrentChallenge() {
  const { weekStart, weekEnd } = currentWeekWindow();
  const existing = await db.challenge.findFirst({
    where: { weekStart, isActive: true },
  });
  if (existing) return existing;

  const tpl = templateFor(weekStart);
  return db.challenge.create({
    data: {
      title: tpl.title,
      description: tpl.description,
      xpReward: tpl.xpReward,
      target: tpl.target,
      weekStart,
      weekEnd,
      isActive: true,
    },
  });
}

/** Real activity count for one user inside the challenge window. */
export async function countWeekActivity(userId: string, weekStart: Date, now: Date = new Date()): Promise<number> {
  const inWindow = { createdAt: { gte: weekStart, lte: now } };
  const [comments, chats, likes, updates] = await Promise.all([
    db.projectComment.count({ where: { authorId: userId, deletedAt: null, ...inWindow } }),
    db.chatMessage.count({ where: { userId, ...inWindow } }),
    db.projectLike.count({ where: { userId, ...inWindow } }),
    db.projectUpdate.count({ where: { authorId: userId, ...inWindow } }),
  ]);
  return comments + chats + likes + updates;
}

export type SyncedEntry = {
  id: string;
  progress: number;
  target: number;
  completed: boolean;
  completedAt: string | null;
  joinedAt: string;
};

/**
 * Recompute one entry's progress; on first reach of the target, mark it
 * completed and award the XP (idempotent via ContributionEvent unique key).
 */
export async function syncEntry(challengeId: string, userId: string, target: number, xpReward: number): Promise<SyncedEntry | null> {
  const entry = await db.challengeEntry.findUnique({
    where: { challengeId_userId: { challengeId, userId } },
  });
  if (!entry) return null;

  const challenge = await db.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge) return null;

  const progress = await countWeekActivity(userId, challenge.weekStart);
  const justCompleted = !entry.completed && progress >= target;

  const updated = await db.challengeEntry.update({
    where: { id: entry.id },
    data: {
      progress,
      completed: entry.completed || justCompleted,
      completedAt: entry.completed ? entry.completedAt : justCompleted ? new Date() : null,
    },
  });

  if (justCompleted) {
    await awardContribution({
      userId,
      eventType: "CHALLENGE_COMPLETED",
      sourceType: "challenge",
      sourceId: challengeId,
      xpOverride: xpReward,
    });
  }

  return {
    id: updated.id,
    progress: updated.progress,
    target,
    completed: updated.completed,
    completedAt: updated.completedAt ? updated.completedAt.toISOString() : null,
    joinedAt: updated.joinedAt.toISOString(),
  };
}
