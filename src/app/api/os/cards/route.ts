// TEKA NEXUS — GET/POST /api/os/cards  (Task 19-e)
// CODER CARDS: collection listing (enriched with CARD_CATALOG) + P2P trading.

import { Prisma } from "@prisma/client";
import { z } from "zod";

import { db } from "@/lib/db";
import { fail, handle, ok, parseBody, requireUser } from "@/lib/server";
import { CARD_CATALOG, logActivity } from "@/lib/os/economy";

export const dynamic = "force-dynamic";

// ─── Shapes (client-facing, dates → ISO strings) ─────────────

type L2 = { en: string; fa: string };

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

function shapeCard(c: {
  id: string;
  kind: string;
  rarity: string;
  serial: string;
  createdAt: Date;
}): CardDto {
  const spec = CARD_CATALOG[c.kind];
  return {
    id: c.id,
    kind: c.kind,
    rarity: c.rarity,
    serial: c.serial,
    createdAt: c.createdAt.toISOString(),
    known: Boolean(spec),
    emoji: spec?.emoji ?? "❔",
    title: spec?.title ?? { en: c.kind, fa: c.kind },
    desc: spec?.desc ?? {
      en: "Uncatalogued artifact — a true rarity.",
      fa: "آرتیفکت خارج از کاتالوگ — یک کمیابی واقعی.",
    },
  };
}

// ─── GET: my collection + pending trades + catalog ───────────

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const [myCards, incomingRows, outgoingRows] = await Promise.all([
      db.card.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
      db.cardTrade.findMany({
        where: { toUserId: user.id, status: "PENDING" },
        orderBy: { createdAt: "desc" },
        include: {
          card: true,
          from: { select: { username: true, displayName: true } },
        },
      }),
      db.cardTrade.findMany({
        where: { fromUserId: user.id, status: "PENDING" },
        orderBy: { createdAt: "desc" },
        include: {
          card: true,
          to: { select: { username: true, displayName: true } },
        },
      }),
    ]);

    const cards = myCards.map(shapeCard);

    const incoming: TradeDto[] = incomingRows.map((t) => ({
      id: t.id,
      cardId: t.cardId,
      status: t.status,
      createdAt: t.createdAt.toISOString(),
      card: {
        id: t.card.id,
        kind: t.card.kind,
        rarity: t.card.rarity,
        serial: t.card.serial,
        createdAt: t.card.createdAt.toISOString(),
      },
      from: t.from,
    }));

    const outgoing: TradeDto[] = outgoingRows.map((t) => ({
      id: t.id,
      cardId: t.cardId,
      status: t.status,
      createdAt: t.createdAt.toISOString(),
      card: {
        id: t.card.id,
        kind: t.card.kind,
        rarity: t.card.rarity,
        serial: t.card.serial,
        createdAt: t.card.createdAt.toISOString(),
      },
      to: t.to,
    }));

    return ok({ cards, incoming, outgoing, catalog: CARD_CATALOG });
  });
}

// ─── POST: trade / respond ───────────────────────────────────

const postSchema = z.object({
  action: z.enum(["trade", "respond"]),
  cardId: z.string().optional(),
  toUsername: z.string().optional(),
  tradeId: z.string().optional(),
  accept: z.boolean().optional(),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = await parseBody(req, postSchema);

    // ── Offer one of my cards to another user ──
    if (body.action === "trade") {
      const cardId = body.cardId?.trim();
      const toUsername = body.toUsername?.trim().toLowerCase();
      if (!cardId || !toUsername) return fail("cardId and toUsername are required.", 400);

      const card = await db.card.findUnique({ where: { id: cardId } });
      if (!card || card.userId !== user.id) return fail("Card not found.", 404);

      const pending = await db.cardTrade.findFirst({
        where: { cardId, status: "PENDING" },
        select: { id: true },
      });
      if (pending) return fail("This card already has a pending offer.", 400);

      const toUser = await db.user.findUnique({ where: { username: toUsername } });
      if (!toUser) return fail("User not found.", 404);
      if (toUser.id === user.id) return fail("You cannot trade with yourself.", 400);

      await db.cardTrade.create({
        data: { cardId, fromUserId: user.id, toUserId: toUser.id, status: "PENDING" },
      });
      await logActivity(user.id, "card", { trade: toUsername });
      return ok({ sent: true });
    }

    // ── Accept / decline an incoming offer ──
    const tradeId = body.tradeId?.trim();
    if (!tradeId) return fail("tradeId is required.", 400);

    const trade = await db.cardTrade.findUnique({
      where: { id: tradeId },
      include: { card: true },
    });
    if (!trade || trade.toUserId !== user.id || trade.status !== "PENDING") {
      return fail("Trade not found.", 404);
    }

    if (!body.accept) {
      await db.cardTrade.update({
        where: { id: trade.id },
        data: { status: "DECLINED", resolvedAt: new Date() },
      });
      return ok({ accepted: false });
    }

    // Ownership transfer — (userId, kind) is unique, so the receiver may
    // already own this card kind. In that case the trade is declined, not 500.
    try {
      await db.card.update({ where: { id: trade.cardId }, data: { userId: user.id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        await db.cardTrade.update({
          where: { id: trade.id },
          data: { status: "DECLINED", resolvedAt: new Date() },
        });
        return ok({ accepted: false, reason: "Target already owns this card kind" });
      }
      throw err;
    }

    await db.cardTrade.update({
      where: { id: trade.id },
      data: { status: "ACCEPTED", resolvedAt: new Date() },
    });
    await logActivity(user.id, "card", { received: trade.card.kind, from: trade.fromUserId });
    await logActivity(trade.fromUserId, "card", { sent: trade.card.kind, to: user.id });
    return ok({ accepted: true });
  });
}
