// TEKA NEXUS — /api/os/boss  (Task 19-b — BOSS ARENA)
// GET  : boss roster (lock progress + won badges) + resumable active battle.
// POST : { action: "start" | "attack" | "abandon" } — the fight lifecycle.
//
// Security notes:
//  • The CURRENT question is always sanitized ({q, options}) — `answer` and
//    `explain` NEVER leave the server before the question is answered.
//  • `explain` is only included in the attack response, for the just-answered
//    question, and only on a correct hit (spec).

import { z } from "zod";

import { db } from "@/lib/db";
import { fail, handle, ok, parseBody, requireUser, HttpError } from "@/lib/server";
import { getCourse } from "@/lib/academy";
import {
  FINAL_BOSS_TITLE,
  FINAL_CARD_KIND,
  FINAL_MODULE_ID,
  PLAYER_DAMAGE,
  allBosses,
  bossDamage,
  bossRequiredLessons,
  buildBossQuestions,
  getBoss,
  type BossQuestion,
} from "@/lib/os/boss";
import { awardCoins, awardXp, logActivity, mintCard } from "@/lib/os/economy";

export const dynamic = "force-dynamic";

// ─── helpers ─────────────────────────────────────────────────

/** ISO week key like "2026-W07" (UTC-based, matches WarAction.weekKey). */
function currentIsoWeek(): string {
  const now = new Date();
  const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = t.getUTCDay() || 7; // Mon=1 … Sun=7
  t.setUTCDate(t.getUTCDate() + 4 - day); // jump to this ISO week's Thursday
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function parseQuestions(raw: string): BossQuestion[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BossQuestion[]) : [];
  } catch {
    return [];
  }
}

type SanitizedQuestion = { q: BossQuestion["q"]; options: BossQuestion["options"] };

/** Strip answer/explain — safe-to-send shape for the current question. */
function sanitize(q: BossQuestion | undefined): SanitizedQuestion | null {
  if (!q) return null;
  return { q: q.q, options: q.options };
}

/** Active-battle payload (GET.active and the start response share this shape). */
function activePayload(battle: {
  id: string;
  courseId: string;
  moduleId: string;
  bossHp: number;
  playerHp: number;
  cursor: number;
  questions: string;
}) {
  const qs = parseQuestions(battle.questions);
  return {
    id: battle.id,
    courseId: battle.courseId,
    moduleId: battle.moduleId,
    bossHp: battle.bossHp,
    playerHp: battle.playerHp,
    cursor: battle.cursor,
    question: sanitize(qs[battle.cursor]),
    total: qs.length,
  };
}

function courseTitle(courseId: string): { en: string; fa: string } {
  return getCourse(courseId)?.title ?? { en: courseId, fa: courseId };
}

type BossRewards = {
  xp: number;
  multiplier: number;
  coins: number;
  cardKind?: string;
  finalCardKind?: string;
  title?: string;
};

// ─── GET — roster + active battle ────────────────────────────

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const [wins, progressRows, active] = await Promise.all([
      db.bossBattle.findMany({
        where: { userId: user.id, status: "WON" },
        select: { courseId: true, moduleId: true },
      }),
      db.academyProgress.findMany({
        where: { userId: user.id },
        select: { courseId: true, completedLessons: true },
      }),
      db.bossBattle.findFirst({ where: { userId: user.id, status: "ACTIVE" } }),
    ]);

    const wonSet = new Set(wins.map((w) => `${w.courseId}:${w.moduleId}`));

    const completed = new Map<string, Set<string>>();
    for (const row of progressRows) {
      let ids: string[] = [];
      try {
        const parsed: unknown = JSON.parse(row.completedLessons);
        if (Array.isArray(parsed)) ids = parsed.filter((x): x is string => typeof x === "string");
      } catch {
        /* keep empty */
      }
      completed.set(row.courseId, new Set(ids));
    }

    const bosses = allBosses().map((b) => {
      const doneSet = completed.get(b.courseId) ?? new Set<string>();
      const required = bossRequiredLessons(b.courseId, b.moduleId);
      return {
        courseId: b.courseId,
        moduleId: b.moduleId,
        final: b.final,
        emoji: b.emoji,
        accent: b.accent,
        name: b.name,
        taunt: b.taunt,
        courseTitle: courseTitle(b.courseId),
        requiredLessonCount: required.length,
        completedRequired: required.filter((id) => doneSet.has(id)).length,
        won: wonSet.has(`${b.courseId}:${b.moduleId}`),
      };
    });

    return ok({
      bosses,
      active: active ? activePayload(active) : null,
      bossDamage: bossDamage(7), // informational
    });
  });
}

// ─── POST — start / attack / abandon ─────────────────────────

const BodySchema = z.object({
  action: z.enum(["start", "attack", "abandon"]),
  courseId: z.string().optional(),
  moduleId: z.string().optional(),
  battleId: z.string().optional(),
  optionIndex: z.number().int().min(0).max(9).optional(),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = await parseBody(req, BodySchema);
    const { action } = body;

    // ── START ──────────────────────────────────────────────
    if (action === "start") {
      if (!body.courseId || !body.moduleId) return fail("courseId and moduleId are required.", 400);
      const boss = getBoss(body.courseId, body.moduleId);
      if (!boss) throw new HttpError("Boss not found.", 404);

      // Gate: every required lesson of the module (whole course for finals) done.
      const required = bossRequiredLessons(body.courseId, body.moduleId);
      const progress = await db.academyProgress.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: body.courseId } },
        select: { completedLessons: true },
      });
      let doneIds: string[] = [];
      try {
        const parsed: unknown = JSON.parse(progress?.completedLessons ?? "[]");
        if (Array.isArray(parsed)) doneIds = parsed.filter((x): x is string => typeof x === "string");
      } catch {
        /* keep empty */
      }
      const doneSet = new Set(doneIds);
      if (!required.every((id) => doneSet.has(id))) return fail("LOCKED", 400);

      // One fight at a time.
      const existing = await db.bossBattle.findFirst({ where: { userId: user.id, status: "ACTIVE" } });
      if (existing) return fail("BUSY", 400);

      const questions = buildBossQuestions(body.courseId, body.moduleId);
      if (questions.length === 0) return fail("No questions available for this boss.", 400);

      const battle = await db.bossBattle.create({
        data: {
          userId: user.id,
          courseId: body.courseId,
          moduleId: body.moduleId,
          questions: JSON.stringify(questions),
        },
      });
      return ok(activePayload(battle));
    }

    // ── ATTACK ─────────────────────────────────────────────
    if (action === "attack") {
      if (!body.battleId) return fail("battleId is required.", 400);
      if (body.optionIndex === undefined) return fail("optionIndex is required.", 400);

      const battle = await db.bossBattle.findFirst({
        where: { id: body.battleId, userId: user.id, status: "ACTIVE" },
      });
      if (!battle) throw new HttpError("Battle not found.", 404);

      const qs = parseQuestions(battle.questions);
      const current = qs[battle.cursor];

      // Defensive: corrupt/exhausted row — resolve as a loss so the OS never sticks.
      if (!current) {
        await db.bossBattle.update({
          where: { id: battle.id },
          data: { status: "LOST", finishedAt: new Date() },
        });
        await logActivity(user.id, "boss", { courseId: battle.courseId, moduleId: battle.moduleId, win: false });
        return ok({
          correct: false,
          battle: {
            bossHp: battle.bossHp,
            playerHp: battle.playerHp,
            cursor: battle.cursor,
            status: "LOST",
            hits: battle.hits,
            misses: battle.misses,
          },
          nextQuestion: null,
          rewards: null,
        });
      }

      const correct = body.optionIndex === current.answer;
      const newBossHp = Math.max(0, battle.bossHp - (correct ? bossDamage(qs.length) : 0));
      const newPlayerHp = Math.max(0, battle.playerHp - (correct ? 0 : PLAYER_DAMAGE));
      const hits = battle.hits + (correct ? 1 : 0);
      const misses = battle.misses + (correct ? 0 : 1);
      const newCursor = battle.cursor + 1;

      let status = "ACTIVE";
      if (newBossHp <= 0) status = "WON";
      else if (newPlayerHp <= 0) status = "LOST";
      else if (newCursor >= qs.length) status = "LOST"; // boss outlasted the question set

      let rewards: BossRewards | null = null;

      if (status === "WON") {
        const xpRes = await awardXp(user.id, 150);
        await awardCoins(user.id, 100, "boss");
        const card = await mintCard(user.id, "BOSS1");

        let finalCardKind: string | undefined;
        let title: string | undefined;
        if (battle.moduleId === FINAL_MODULE_ID) {
          const finalCard = await mintCard(user.id, FINAL_CARD_KIND[battle.courseId] ?? "");
          if (finalCard) finalCardKind = finalCard.kind;
          title = FINAL_BOSS_TITLE[battle.courseId];
          if (title) await db.user.update({ where: { id: user.id }, data: { title } });
        }

        await logActivity(user.id, "boss", {
          courseId: battle.courseId,
          moduleId: battle.moduleId,
          win: true,
        });

        // War hook — one BOSS action per week per user; duplicates are ignored.
        // (team is read fresh from the row — AuthUser type doesn't carry it.)
        const fresh = await db.user
          .findUnique({ where: { id: user.id }, select: { team: true } })
          .catch(() => null);
        if (fresh?.team) {
          try {
            await db.warAction.create({
              data: {
                userId: user.id,
                team: fresh.team,
                weekKey: currentIsoWeek(),
                kind: "BOSS",
                points: 40,
              },
            });
          } catch {
            /* already logged this week — unique(userId, weekKey, kind) */
          }
        }

        rewards = {
          xp: xpRes.xp,
          multiplier: xpRes.multiplier,
          coins: 100,
          cardKind: card ? "BOSS1" : undefined,
          finalCardKind,
          title,
        };
      } else if (status === "LOST") {
        await logActivity(user.id, "boss", {
          courseId: battle.courseId,
          moduleId: battle.moduleId,
          win: false,
        });
      }

      const updated = await db.bossBattle.update({
        where: { id: battle.id },
        data: {
          cursor: newCursor,
          bossHp: newBossHp,
          playerHp: newPlayerHp,
          status,
          hits,
          misses,
          finishedAt: status === "ACTIVE" ? undefined : new Date(),
        },
      });

      return ok({
        correct,
        explain: correct ? current.explain : undefined,
        battle: {
          bossHp: updated.bossHp,
          playerHp: updated.playerHp,
          cursor: updated.cursor,
          status: updated.status,
          hits: updated.hits,
          misses: updated.misses,
        },
        nextQuestion: status === "ACTIVE" ? sanitize(qs[newCursor]) : null,
        rewards,
      });
    }

    // ── ABANDON ────────────────────────────────────────────
    if (action === "abandon") {
      if (!body.battleId) return fail("battleId is required.", 400);
      const battle = await db.bossBattle.findFirst({
        where: { id: body.battleId, userId: user.id, status: "ACTIVE" },
      });
      if (!battle) throw new HttpError("Battle not found.", 404);
      await db.bossBattle.update({
        where: { id: battle.id },
        data: { status: "LOST", finishedAt: new Date() },
      });
      return ok({ status: "LOST" });
    }

    return fail("Unknown action.", 400);
  });
}
