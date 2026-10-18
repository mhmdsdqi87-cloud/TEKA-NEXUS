// GET/PATCH /api/me/settings — notification preferences.

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, handle, ok, parseBody } from "@/lib/server";

const patchSchema = z.object({
  projectActivity: z.boolean().optional(),
  collaborationRequests: z.boolean().optional(),
  socialActivity: z.boolean().optional(),
});

export async function GET() {
  return handle(async () => {
    const me = await requireUser();
    const prefs = await db.userNotificationPrefs.upsert({
      where: { userId: me.id },
      create: { userId: me.id },
      update: {},
    });
    return ok({ prefs });
  });
}

export async function PATCH(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, patchSchema);
    const prefs = await db.userNotificationPrefs.upsert({
      where: { userId: me.id },
      create: { userId: me.id, ...body },
      update: body,
    });
    return ok({ prefs });
  });
}
