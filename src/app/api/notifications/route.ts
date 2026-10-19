// GET /api/notifications — latest 30 with actor cards + unread count.

import { db } from "@/lib/db";
import { requireUser, handle, ok } from "@/lib/server";

function safeParseObject(json: string): Record<string, unknown> {
  try {
    const v = JSON.parse(json);
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

export async function GET() {
  return handle(async () => {
    const me = await requireUser();

    const [rows, unread] = await Promise.all([
      db.notification.findMany({
        where: { recipientId: me.id },
        include: { actor: true },
        orderBy: { createdAt: "desc" },
        take: 30,
      }),
      db.notification.count({ where: { recipientId: me.id, readAt: null } }),
    ]);

    const notifications = rows.map((n) => ({
      id: n.id,
      type: n.type,
      entityType: n.entityType,
      entityId: n.entityId,
      payload: safeParseObject(n.payload),
      readAt: n.readAt ? n.readAt.toISOString() : null,
      createdAt: n.createdAt.toISOString(),
      actor: n.actor
        ? {
            id: n.actor.id,
            username: n.actor.username,
            displayName: n.actor.displayName,
            avatarColor: n.actor.avatarColor,
            avatarUrl: n.actor.avatarUrl,
            bio: n.actor.bio,
            reputation: n.actor.reputation,
          }
        : null,
    }));

    return ok({ notifications, unread });
  });
}
