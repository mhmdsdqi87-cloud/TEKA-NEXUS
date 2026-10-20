// GET  /api/dm/conversations/[id]/messages — participant-only message history (Task dm-1).
//      Ascending order; default = latest 50. With ?after=<iso-date> only newer
//      messages are returned (polling cursor). Fetching also marks the other
//      side's unread messages as read — so unread clears while the chat is open.
// POST /api/dm/conversations/[id]/messages — send a message (≤ 2000 chars).

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { handle, HttpError, ok, parseBody, param, requireUser, notify } from "@/lib/server";

const DEFAULT_TAKE = 50;
const BODY_MAX = 2000;
// At most one NEW_DM notification per (recipient, conversation) per window —
// active chats would otherwise flood the notification center.
const NOTIFY_THROTTLE_MS = 5 * 60 * 1000;

const sendSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "پیام نمی‌تواند خالی باشد.")
    .max(BODY_MAX, `پیام حداکثر می‌تواند ${BODY_MAX} نویسه باشد.`),
});

// Load the conversation and enforce participation (404 unknown, 403 outsider).
async function requireParticipant(conversationId: string, userId: string) {
  const conversation = await db.dmConversation.findUnique({
    where: { id: conversationId },
    include: {
      userA: { select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true } },
      userB: { select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true } },
    },
  });
  if (!conversation) throw new HttpError("گفتگو پیدا نشد.", 404);
  if (conversation.userAId !== userId && conversation.userBId !== userId) {
    throw new HttpError("به این گفتگو دسترسی نداری.", 403);
  }
  return conversation;
}

function messageDTO(m: { id: string; senderId: string; body: string; readAt: Date | null; createdAt: Date }) {
  return {
    id: m.id,
    senderId: m.senderId,
    body: m.body,
    readAt: m.readAt ? m.readAt.toISOString() : null,
    createdAt: m.createdAt.toISOString(),
  };
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const me = await requireUser();
    const conversationId = await param(ctx, "id");
    const conversation = await requireParticipant(conversationId, me.id);
    const other = conversation.userAId === me.id ? conversation.userB : conversation.userA;

    const afterParam = req.nextUrl.searchParams.get("after");
    let after: Date | null = null;
    if (afterParam) {
      const parsed = new Date(afterParam);
      if (!Number.isNaN(parsed.getTime())) after = parsed;
    }

    // Fetch messages. Full load = latest N (returned ascending); cursor load =
    // strictly newer than `after` so the 4s poll only ships the delta.
    const rows = after
      ? await db.dmMessage.findMany({
          where: { conversationId, createdAt: { gt: after } },
          orderBy: { createdAt: "asc" },
          take: DEFAULT_TAKE,
        })
      : (
          await db.dmMessage.findMany({
            where: { conversationId },
            orderBy: { createdAt: "desc" },
            take: DEFAULT_TAKE,
          })
        ).reverse();

    // Opening/polling the chat counts as reading: mark the other side's
    // unread messages as read for the caller.
    await db.dmMessage.updateMany({
      where: {
        conversationId,
        senderId: { not: me.id },
        readAt: null,
      },
      data: { readAt: new Date() },
    });

    return ok({
      messages: rows.map(messageDTO),
      other: {
        id: other.id,
        username: other.username,
        displayName: other.displayName,
        avatarColor: other.avatarColor,
        avatarUrl: other.avatarUrl,
      },
    });
  });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return handle(async () => {
    const me = await requireUser();
    const conversationId = await param(ctx, "id");
    const conversation = await requireParticipant(conversationId, me.id);
    const other = conversation.userAId === me.id ? conversation.userB : conversation.userA;

    // Re-check blocks at send time — a block created mid-conversation must
    // freeze it instead of letting messages through.
    const block = await db.userBlock.findFirst({
      where: {
        OR: [
          { blockerId: me.id, blockedId: other.id },
          { blockerId: other.id, blockedId: me.id },
        ],
      },
      select: { blockerId: true },
    });
    if (block) throw new HttpError("امکان گفتگوی خصوصی با این کاربر وجود ندارد.", 403);

    const { body } = await parseBody(req, sendSchema);
    const trimmed = body.trim();

    const [message] = await db.$transaction([
      db.dmMessage.create({
        data: { conversationId, senderId: me.id, body: trimmed },
      }),
      db.dmConversation.update({
        where: { id: conversationId },
        data: { lastMessageAt: new Date() },
      }),
    ]);

    // Throttled NEW_DM notification (rendered by the notifications center).
    const recentSelf = await db.notification.findFirst({
      where: {
        recipientId: other.id,
        actorId: me.id,
        type: "NEW_DM",
        entityId: conversationId,
        createdAt: { gt: new Date(Date.now() - NOTIFY_THROTTLE_MS) },
      },
      select: { id: true },
    });
    if (!recentSelf) {
      await notify({
        recipientId: other.id,
        actorId: me.id,
        type: "NEW_DM",
        entityType: "dm",
        entityId: conversationId,
        payload: {
          conversationId,
          username: me.username,
          displayName: me.displayName,
          preview: trimmed.slice(0, 80),
        },
      });
    }

    return ok({ message: messageDTO(message) });
  });
}
