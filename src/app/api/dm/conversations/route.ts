// GET  /api/dm/conversations — the current user's 1:1 conversations (Task dm-1).
// POST /api/dm/conversations — get-or-create a conversation with { username }.
//
// Conversations use an ordered participant pair (userAId < userBId) so the
// @@unique([userAId, userBId]) constraint guarantees at most one conversation
// per user pair. Never leak conversations the caller isn't part of.

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { handle, HttpError, ok, parseBody, requireUser } from "@/lib/server";

const LIST_LIMIT = 50;

type PartnerFields = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
};

// POST body — username of the user to talk to.
const createSchema = z.object({
  username: z.string().trim().min(1).max(24),
});

function partnerCard(u: PartnerFields) {
  return {
    id: u.id,
    username: u.username,
    displayName: u.displayName,
    avatarColor: u.avatarColor,
    avatarUrl: u.avatarUrl,
  };
}

// GET — list conversations ordered by most-recent activity.
export async function GET() {
  return handle(async () => {
    const me = await requireUser();

    const rows = await db.dmConversation.findMany({
      where: { OR: [{ userAId: me.id }, { userBId: me.id }] },
      include: {
        userA: { select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true } },
        userB: { select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { lastMessageAt: "desc" },
      take: LIST_LIMIT,
    });

    // Unread = messages from the other side that the caller hasn't read yet.
    const unreadGroups = rows.length
      ? await db.dmMessage.groupBy({
          by: ["conversationId"],
          where: {
            conversationId: { in: rows.map((c) => c.id) },
            senderId: { not: me.id },
            readAt: null,
          },
          _count: { _all: true },
        })
      : [];
    const unreadByConversation = new Map(unreadGroups.map((g) => [g.conversationId, g._count._all]));

    const conversations = rows.map((c) => {
      const other = c.userAId === me.id ? c.userB : c.userA;
      const last = c.messages[0] ?? null;
      return {
        id: c.id,
        other: partnerCard(other),
        lastMessage: last
          ? { body: last.body, senderId: last.senderId, createdAt: last.createdAt.toISOString() }
          : null,
        unreadCount: unreadByConversation.get(c.id) ?? 0,
        lastMessageAt: c.lastMessageAt.toISOString(),
      };
    });

    return ok({ conversations });
  });
}

// POST — get-or-create the 1:1 conversation with the given username.
export async function POST(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const { username: raw } = await parseBody(req, createSchema);
    const username = raw.trim().toLowerCase();

    const target = await db.user.findUnique({
      where: { username },
      select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true },
    });
    if (!target) throw new HttpError("کاربری با این نام کاربری پیدا نشد.", 404);
    if (target.id === me.id) {
      throw new HttpError("نمی‌توانی به خودت پیام خصوصی بدهی.", 400);
    }

    // A block in either direction makes DMs unavailable (same rule as follow).
    const block = await db.userBlock.findFirst({
      where: {
        OR: [
          { blockerId: me.id, blockedId: target.id },
          { blockerId: target.id, blockedId: me.id },
        ],
      },
      select: { blockerId: true },
    });
    if (block) {
      throw new HttpError("امکان گفتگوی خصوصی با این کاربر وجود ندارد.", 403);
    }

    // Ordered pair keeps the unique constraint stable regardless of who opens first.
    const [userAId, userBId] = [me.id, target.id].sort();

    const existing = await db.dmConversation.findUnique({
      where: { userAId_userBId: { userAId, userBId } },
    });

    let conversationId = existing?.id ?? null;
    if (!conversationId) {
      try {
        const created = await db.dmConversation.create({ data: { userAId, userBId } });
        conversationId = created.id;
      } catch {
        // Rare race: the pair was created concurrently — re-read instead of failing.
        const raced = await db.dmConversation.findUnique({
          where: { userAId_userBId: { userAId, userBId } },
        });
        if (!raced) throw new HttpError("ایجاد گفتگو ناموفق بود. دوباره تلاش کن.", 500);
        conversationId = raced.id;
      }
    }

    return ok({
      conversation: {
        id: conversationId,
        other: partnerCard(target),
        lastMessage: null,
        unreadCount: 0,
        lastMessageAt: new Date().toISOString(),
      },
    });
  });
}
