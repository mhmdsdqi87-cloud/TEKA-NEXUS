// TEKA NEXUS — /api/os/speedrun  (Task 19-f)
// Global module timer: start mints an HMAC-signed token, finish verifies it,
// enforces a humanly-possible floor and complete lessons, then stores the
// best time per user per module. GET serves the global leaderboard.

import { createHmac } from "crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { handle, ok, requireUser, parseBody, HttpError } from "@/lib/server";
import { getCourse } from "@/lib/academy";
import { awardXp, awardCoins, logActivity } from "@/lib/os/economy";

export const dynamic = "force-dynamic";

const SECRET = "teka-speedrun-hmac-2026";

/** ISO week key like "2026-W07" (Monday-based, UTC) — matches WarAction.weekKey. */
function currentIsoWeek(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((date.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function parseLessonIds(json: string | null | undefined): string[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

// ─── Token scheme: hmac16.base64url(payload) ─────────────────

type TokenData = { userId: string; courseId: string; moduleId: string; startedAt: number };

function makeToken(userId: string, courseId: string, moduleId: string): { token: string; startedAt: number } {
  const startedAt = Date.now();
  const payload = `${userId}|${courseId}|${moduleId}|${startedAt}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 16);
  const token = `${sig}.${Buffer.from(payload).toString("base64url")}`;
  return { token, startedAt };
}

function decodeToken(token: string): TokenData | null {
  try {
    const dot = token.indexOf(".");
    if (dot <= 0) return null;
    const sig = token.slice(0, dot);
    const payload = Buffer.from(token.slice(dot + 1), "base64url").toString("utf8");
    const expected = createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 16);
    if (sig !== expected) return null;
    const [userId, courseId, moduleId, startedAtRaw] = payload.split("|");
    const startedAt = Number(startedAtRaw);
    if (!userId || !courseId || !moduleId || !Number.isFinite(startedAt)) return null;
    return { userId, courseId, moduleId, startedAt };
  } catch {
    return null;
  }
}

// ─── POST — action: "start" | "finish" ───────────────────────

const postSchema = z.object({
  action: z.enum(["start", "finish"]),
  courseId: z.string().min(1).optional(),
  moduleId: z.string().min(1).optional(),
  token: z.string().min(1).optional(),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = await parseBody(req, postSchema);

    // ── start: mint a signed timer token ──
    if (body.action === "start") {
      const course = body.courseId ? getCourse(body.courseId) : undefined;
      if (!course) throw new HttpError("Course not found.", 404);
      const mod = course.modules.find((m) => m.id === body.moduleId);
      if (!mod) throw new HttpError("Module not found.", 404);

      const { token, startedAt } = makeToken(user.id, course.id, mod.id);
      return ok({ token, startedAt, lessonCount: mod.lessons.length });
    }

    // ── finish: verify + validate + record ──
    if (!body.token) throw new HttpError("Missing speedrun token.", 400);
    const data = decodeToken(body.token);
    if (!data || data.userId !== user.id) throw new HttpError("Invalid speedrun token.", 400);
    if (body.courseId && body.courseId !== data.courseId) throw new HttpError("Invalid speedrun token.", 400);
    if (body.moduleId && body.moduleId !== data.moduleId) throw new HttpError("Invalid speedrun token.", 400);

    const course = getCourse(data.courseId);
    const mod = course?.modules.find((m) => m.id === data.moduleId);
    if (!course || !mod) throw new HttpError("Module not found.", 404);

    const ms = Date.now() - data.startedAt;
    const lessonIds = mod.lessons.map((l) => l.id);
    const minMs = lessonIds.length * 20_000; // human floor: ≥20s per lesson
    if (ms < minMs) {
      // Not an error — the client shows a "timer voided" message.
      return ok({ valid: false, reason: "TOO_FAST" });
    }

    // Every lesson of the module must be completed in the Academy.
    const progress = await db.academyProgress.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
    });
    const completed = parseLessonIds(progress?.completedLessons);
    if (!lessonIds.every((id) => completed.includes(id))) {
      return ok({ valid: false, reason: "LESSONS_INCOMPLETE" });
    }

    const existing = await db.speedrunRecord.findFirst({
      where: { userId: user.id, courseId: course.id, moduleId: mod.id },
    });
    const isRecord = !existing || ms < existing.ms;
    if (isRecord) {
      if (existing) {
        await db.speedrunRecord.update({ where: { id: existing.id }, data: { ms } });
      } else {
        await db.speedrunRecord.create({
          data: { userId: user.id, courseId: course.id, moduleId: mod.id, ms },
        });
      }
      await awardXp(user.id, 60);
      await awardCoins(user.id, 60, "speedrun");
      await logActivity(user.id, "speedrun", { courseId: course.id, moduleId: mod.id, ms });

      // War hook: one weekly SPEEDRUN mission per team member.
      try {
        const me = await db.user.findUnique({ where: { id: user.id }, select: { team: true } });
        if (me?.team) {
          await db.warAction.create({
            data: {
              userId: user.id,
              team: me.team,
              weekKey: currentIsoWeek(),
              kind: "SPEEDRUN",
              points: 25,
            },
          });
        }
      } catch {
        // unique(userId, weekKey, kind) already claimed this week — ignore.
      }
    }

    // Rank = how many distinct runners beat this time on the module (+1).
    const better = await db.speedrunRecord.count({
      where: { courseId: course.id, moduleId: mod.id, ms: { lt: ms } },
    });
    return ok({ valid: true, ms, isRecord, rank: better + 1 });
  });
}

// ─── GET — global leaderboard (best per user per module) ─────

export async function GET(req: Request) {
  return handle(async () => {
    const moduleId = new URL(req.url).searchParams.get("moduleId") ?? undefined;

    const records = await db.speedrunRecord.findMany({
      where: moduleId ? { moduleId } : {},
      orderBy: { ms: "asc" },
      take: 50,
    });

    // Dedupe: keep each user's best row per module (input is ms-asc already).
    const best = new Map<string, (typeof records)[number]>();
    for (const r of records) {
      const key = `${r.userId}|${r.moduleId}`;
      if (!best.has(key)) best.set(key, r);
    }
    const rows = [...best.values()].sort((a, b) => a.ms - b.ms).slice(0, 20);

    const ids = [...new Set(rows.map((r) => r.userId))];
    const users = await db.user.findMany({
      where: { id: { in: ids } },
      select: { id: true, username: true, displayName: true },
    });
    const byId = new Map(users.map((u) => [u.id, u]));

    return ok({
      entries: rows
        .filter((r) => byId.has(r.userId))
        .map((r) => {
          const u = byId.get(r.userId)!;
          return {
            username: u.username,
            displayName: u.displayName,
            courseId: r.courseId,
            moduleId: r.moduleId,
            ms: r.ms,
            createdAt: r.createdAt.toISOString(),
          };
        }),
    });
  });
}
