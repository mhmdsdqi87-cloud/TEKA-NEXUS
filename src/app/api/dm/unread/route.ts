// GET /api/dm/unread — total unread direct-message count for the nav badge (Task dm-1).
// Lightweight single COUNT — polled by the app shell every 30s.

import { db } from "@/lib/db";
import { handle, ok, requireUser } from "@/lib/server";

export async function GET() {
  return handle(async () => {
    const me = await requireUser();
    const unread = await db.dmMessage.count({
      where: {
        readAt: null,
        senderId: { not: me.id },
        conversation: { OR: [{ userAId: me.id }, { userBId: me.id }] },
      },
    });
    return ok({ unread });
  });
}
