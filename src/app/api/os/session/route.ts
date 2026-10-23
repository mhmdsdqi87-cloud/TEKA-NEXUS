// TEKA NEXUS — GET /api/os/session  (Task 19)
// One-shot TEKA OS dashboard payload: wallet, team, title, pet, event window,
// active boss battle, card count + freshly minted milestone cards.

import { db } from "@/lib/db";
import { handle, ok, requireUser } from "@/lib/server";
import { maybeMintMilestones } from "@/lib/os/economy";
import { tekaEventWindow } from "@/lib/os/events";

export const dynamic = "force-dynamic";

/** Pet hunger decays ~1 point per hour since the last tick. */
function decayedHunger(hunger: number, lastTickAt: Date): number {
  const hours = Math.max(0, (Date.now() - lastTickAt.getTime()) / 3_600_000);
  return Math.max(0, Math.round(hunger - hours));
}

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const [fresh, pet, activeBattle, cards] = await Promise.all([
      db.user.findUnique({
        where: { id: user.id },
        select: { coins: true, team: true, title: true, xp: true, createdAt: true },
      }),
      db.pet.findUnique({ where: { userId: user.id } }),
      db.bossBattle.findFirst({ where: { userId: user.id, status: "ACTIVE" } }),
      db.card.findMany({ where: { userId: user.id }, select: { id: true, kind: true, rarity: true } }),
    ]);

    // Milestone cards mint silently here (idempotent).
    const newCards = await maybeMintMilestones(user.id);

    let petState: {
      id: string; name: string; stage: number; hunger: number; feeds: number; plays: number; lastFedAt: string | null;
    } | null = null;
    if (pet) {
      const hunger = decayedHunger(pet.hunger, pet.lastTickAt);
      await db.pet.update({
        where: { id: pet.id },
        data: { hunger, lastTickAt: new Date() },
      });
      petState = {
        id: pet.id,
        name: pet.name,
        stage: pet.stage,
        hunger,
        feeds: pet.feeds,
        plays: pet.plays,
        lastFedAt: pet.lastFedAt ? pet.lastFedAt.toISOString() : null,
      };
    }

    return ok({
      coins: fresh?.coins ?? 0,
      team: fresh?.team ?? null,
      title: fresh?.title ?? null,
      xp: fresh?.xp ?? 0,
      memberSince: (fresh?.createdAt ?? new Date()).toISOString(),
      event: tekaEventWindow(),
      pet: petState,
      activeBattle: activeBattle
        ? {
            id: activeBattle.id,
            courseId: activeBattle.courseId,
            moduleId: activeBattle.moduleId,
            bossHp: activeBattle.bossHp,
            playerHp: activeBattle.playerHp,
            cursor: activeBattle.cursor,
          }
        : null,
      cards: { count: cards.length, kinds: cards.map((c) => c.kind) },
      newCards,
    });
  });
}
