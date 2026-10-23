// TEKA NEXUS — GET/POST /api/os/pet  (Task 19-a)
// The Code Pet: hatches after the first completed Academy lesson, evolves as
// it is fed (3 → baby, 10 → teen, 25 → adult, 60 → legendary meals), gets
// hungry ~1 point per hour, and scores a weekly Red vs Blue war point on feed.

import { db } from "@/lib/db";
import { handle, ok, fail, HttpError, requireUser } from "@/lib/server";
import { awardCoins, awardXp, logActivity } from "@/lib/os/economy";
import { z } from "zod";

export const dynamic = "force-dynamic";

const HOUR_MS = 3_600_000;
const FEED_COOLDOWN_MS = 4 * HOUR_MS;

// ─── Stage + week helpers ────────────────────────────────────

function stageFromFeeds(feeds: number): number {
  if (feeds >= 60) return 4;
  if (feeds >= 25) return 3;
  if (feeds >= 10) return 2;
  if (feeds >= 3) return 1;
  return 0;
}

/** ISO week key, Monday-based — e.g. "2026-W07". */
function currentIsoWeek(now: Date = new Date()): string {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const dayNum = d.getUTCDay() || 7; // Mon=1 … Sun=7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // jump to this ISO week's Thursday
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function parseLessonCount(raw: string): number {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

// ─── GET — current pet (with passive hunger decay + stage sync) ──

export async function GET() {
  return handle(async () => {
    const user = await requireUser();
    const pet = await db.pet.findUnique({ where: { userId: user.id } });
    if (!pet) return ok({ pet: null });

    // Hunger decays ~1 point per hour since the last tick.
    const hours = Math.max(0, (Date.now() - pet.lastTickAt.getTime()) / HOUR_MS);
    const hunger = Math.max(0, Math.round(pet.hunger - hours));
    const stage = stageFromFeeds(pet.feeds);

    const fresh = await db.pet.update({
      where: { id: pet.id },
      data: {
        hunger,
        lastTickAt: new Date(),
        ...(stage !== pet.stage ? { stage } : {}),
      },
    });

    return ok({ pet: fresh });
  });
}

// ─── POST — hatch | feed | play | rename ─────────────────────

const BodySchema = z.object({
  action: z.enum(["hatch", "feed", "play", "rename"]),
  name: z.string().max(24).optional(),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();

    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      throw new HttpError("Request body must be valid JSON.", 400);
    }
    const body = BodySchema.parse(raw);

    const existing = await db.pet.findUnique({ where: { userId: user.id } });

    switch (body.action) {
      // ── HATCH — one pet per user, gated behind the first lesson ──
      case "hatch": {
        if (existing) throw new HttpError("You already have a pet.", 400);
        const rows = await db.academyProgress.findMany({
          where: { userId: user.id },
          select: { completedLessons: true },
        });
        const completed = rows.reduce((n, r) => n + parseLessonCount(r.completedLessons), 0);
        if (completed < 1) throw new HttpError("Finish one lesson first", 400);
        const pet = await db.pet.create({
          data: { userId: user.id, name: body.name ?? "", stage: 1, hunger: 80 },
        });
        return ok({ pet });
      }

      // ── FEED — 4h cooldown, +40 fullness, may evolve, +8 XP, war point ──
      case "feed": {
        if (!existing) throw new HttpError("Hatch a pet first.", 400);
        const now = new Date();
        if (existing.lastFedAt && now.getTime() - existing.lastFedAt.getTime() < FEED_COOLDOWN_MS) {
          const left = FEED_COOLDOWN_MS - (now.getTime() - existing.lastFedAt.getTime());
          const h = Math.floor(left / HOUR_MS);
          const m = Math.floor((left % HOUR_MS) / 60_000);
          throw new HttpError(`Hungry again in ${h}h ${m}m`, 400);
        }

        const stage = stageFromFeeds(existing.feeds + 1);
        const evolved = stage > existing.stage;
        const pet = await db.pet.update({
          where: { id: existing.id },
          data: {
            hunger: Math.min(100, existing.hunger + 40),
            feeds: { increment: 1 },
            lastFedAt: now,
            lastTickAt: now,
            stage,
          },
        });

        const { xp } = await awardXp(user.id, 8);
        await logActivity(user.id, "pet", { action: "feed" });

        // Red vs Blue war hook — feeding scores 10 team points, once per week.
        const row = await db.user.findUnique({ where: { id: user.id }, select: { team: true } });
        if (row?.team) {
          try {
            await db.warAction.create({
              data: { userId: user.id, team: row.team, weekKey: currentIsoWeek(), kind: "PET", points: 10 },
            });
          } catch {
            // unique(userId, weekKey, kind) — already scored this week, ignore.
          }
        }

        return ok({ pet, evolved, xp });
      }

      // ── PLAY — once per day, −5 fullness, +5 XP ──
      case "play": {
        if (!existing) throw new HttpError("Hatch a pet first.", 400);
        const startOfToday = new Date();
        startOfToday.setUTCHours(0, 0, 0, 0);
        const played = await db.activityLog.findFirst({
          where: {
            userId: user.id,
            kind: "pet",
            createdAt: { gte: startOfToday },
            meta: { contains: '"play"' },
          },
        });
        if (played) throw new HttpError("Already played today", 400);

        const pet = await db.pet.update({
          where: { id: existing.id },
          data: { plays: { increment: 1 }, hunger: Math.max(0, existing.hunger - 5) },
        });

        const { xp } = await awardXp(user.id, 5);
        await logActivity(user.id, "pet", { action: "play" });

        return ok({ pet, xp });
      }

      // ── RENAME — trimmed to 1..24 chars ──
      case "rename": {
        if (!existing) throw new HttpError("Hatch a pet first.", 400);
        const name = (body.name ?? "").trim().slice(0, 24);
        if (!name) throw new HttpError("Give your pet a name first.", 400);
        const pet = await db.pet.update({ where: { id: existing.id }, data: { name } });
        return ok({ pet });
      }
    }

    return fail("Unknown action.", 400);
  });
}
