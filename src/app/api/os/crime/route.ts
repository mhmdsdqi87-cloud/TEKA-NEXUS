// TEKA NEXUS — /api/os/crime  (Task 19-f)
// Crime Lab: GET sanitized case files (answers/explanations never leave the
// server until a clue is solved) + POST a clue answer. Rewards land only on
// full case completion, once, and feed the weekly team war.

import { z } from "zod";
import { db } from "@/lib/db";
import { handle, ok, requireUser, parseBody, HttpError } from "@/lib/server";
import { CRIME_CASES, getCrimeCase } from "@/lib/os/crime-cases";
import { awardXp, awardCoins, mintCard, logActivity } from "@/lib/os/economy";

export const dynamic = "force-dynamic";

/** ISO week key like "2026-W07" (Monday-based, UTC) — matches WarAction.weekKey. */
function currentIsoWeek(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7; // Mon=1 … Sun=7
  date.setUTCDate(date.getUTCDate() + 4 - day); // jump to this week's Thursday
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((date.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function parseClueIds(json: string | null | undefined): string[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

// ─── GET — sanitized case files + the user's progress ────────

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const rows = await db.crimeProgress.findMany({ where: { userId: user.id } });
    const byCase = new Map(rows.map((r) => [r.caseId, r]));

    // Answers (option index) + explanations are stripped here — the client
    // only ever receives them from POST after a correct submission.
    const cases = CRIME_CASES.map((c) => {
      const solved = parseClueIds(byCase.get(c.id)?.clues);
      return {
        id: c.id,
        emoji: c.emoji,
        difficulty: c.difficulty,
        title: c.title,
        story: c.story,
        clues: c.clues.map((cl) => ({
          id: cl.id,
          evidence: cl.evidence,
          question: cl.question,
          options: cl.options,
        })),
        solvedCount: solved.length,
        total: c.clues.length,
      };
    });

    return ok({
      cases,
      my: rows.map((r) => ({
        caseId: r.caseId,
        clues: parseClueIds(r.clues),
        solved: r.solved,
      })),
    });
  });
}

// ─── POST — submit a clue answer ─────────────────────────────

const postSchema = z.object({
  caseId: z.string().min(1),
  clueId: z.string().min(1),
  optionIndex: z.number().int().min(0).max(9),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = await parseBody(req, postSchema);

    const kase = getCrimeCase(body.caseId);
    if (!kase) throw new HttpError("Case not found.", 404);
    const clue = kase.clues.find((c) => c.id === body.clueId);
    if (!clue) throw new HttpError("Clue not found.", 404);

    // findOrCreate per-case progress (@@unique userId_caseId).
    const progress = await db.crimeProgress.upsert({
      where: { userId_caseId: { userId: user.id, caseId: kase.id } },
      create: { userId: user.id, caseId: kase.id, clues: "[]" },
      update: {},
    });
    const solvedIds = parseClueIds(progress.clues);

    // Already closed this clue → idempotent no-op (no reward re-grant).
    if (solvedIds.includes(clue.id)) {
      return ok({
        correct: true,
        explain: clue.explain,
        caseSolved: progress.solved,
        solvedClues: solvedIds,
        alreadySolved: true,
      });
    }

    const correct = body.optionIndex === clue.answer;
    if (!correct) {
      // No explanation leak on a wrong guess.
      return ok({ correct: false });
    }

    const nextClues = [...solvedIds, clue.id];
    const caseSolved = nextClues.length >= kase.clues.length;

    const updated = await db.crimeProgress.update({
      where: { id: progress.id },
      data: {
        clues: JSON.stringify(nextClues),
        ...(caseSolved ? { solved: true, finishedAt: new Date() } : {}),
      },
    });

    // Rewards ONLY when the whole case flips to solved (once ever).
    let rewards: { xp: number; coins: number; card: string | null } | undefined;
    if (caseSolved && !progress.solved) {
      const priorSolved = await db.crimeProgress.count({
        where: { userId: user.id, solved: true, caseId: { not: kase.id } },
      });
      const solvedCasesCount = priorSolved + 1; // including this one
      const card = await mintCard(user.id, solvedCasesCount === 1 ? "CRIME1" : "CRIME2");
      const xp = await awardXp(user.id, 120);
      await awardCoins(user.id, 80, "crime");
      await logActivity(user.id, "crime", { caseId: kase.id });
      rewards = { xp: xp.xp, coins: 80, card: card?.kind ?? null };

      // War hook: one weekly CRIME mission per team member (unique constraint).
      try {
        const me = await db.user.findUnique({ where: { id: user.id }, select: { team: true } });
        if (me?.team) {
          await db.warAction.create({
            data: {
              userId: user.id,
              team: me.team,
              weekKey: currentIsoWeek(),
              kind: "CRIME",
              points: 30,
            },
          });
        }
      } catch {
        // unique(userId, weekKey, kind) already claimed this week — ignore.
      }
    }

    return ok({
      correct: true,
      explain: clue.explain,
      caseSolved,
      solvedClues: parseClueIds(updated.clues),
      ...(rewards ? { rewards } : {}),
    });
  });
}
