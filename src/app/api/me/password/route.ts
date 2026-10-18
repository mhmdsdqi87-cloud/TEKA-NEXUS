// PATCH /api/me/password — change password, invalidating other sessions.

import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, handle, HttpError, ok, parseBody } from "@/lib/server";
import { verifyPassword, hashPassword, SESSION_COOKIE } from "@/lib/auth";

const patchSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required.").max(200),
  newPassword: z.string().min(8, "New password must be at least 8 characters.").max(200),
});

export async function PATCH(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, patchSchema);

    const user = await db.user.findUnique({ where: { id: me.id }, select: { passwordHash: true } });
    if (!user || !verifyPassword(body.currentPassword, user.passwordHash)) {
      throw new HttpError("Current password is incorrect.", 400);
    }

    const store = await cookies();
    const currentToken = store.get(SESSION_COOKIE)?.value;

    await db.$transaction([
      db.user.update({ where: { id: me.id }, data: { passwordHash: hashPassword(body.newPassword) } }),
      // Kill every other session; keep the current device signed in.
      db.session.deleteMany({
        where: { userId: me.id, ...(currentToken ? { token: { not: currentToken } } : {}) },
      }),
    ]);

    return ok({ ok: true });
  });
}
