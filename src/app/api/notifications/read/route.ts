// POST /api/notifications/read — mark one ({id}) or all ({all:true}) as read.

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, handle, ok, parseBody } from "@/lib/server";

const readSchema = z
  .object({
    id: z.string().min(1).optional(),
    all: z.boolean().optional(),
  })
  .refine((v) => v.all === true || !!v.id, {
    message: "Provide a notification id or all:true.",
  });

export async function POST(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, readSchema);
    const readAt = new Date();

    if (body.all) {
      await db.notification.updateMany({
        where: { recipientId: me.id, readAt: null },
        data: { readAt },
      });
    } else if (body.id) {
      await db.notification.updateMany({
        where: { id: body.id, recipientId: me.id },
        data: { readAt },
      });
    }

    return ok({ ok: true });
  });
}
