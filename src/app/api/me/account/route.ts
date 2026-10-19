// DELETE /api/me/account — verify password, delete owned projects + user.

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, handle, HttpError, ok, parseBody } from "@/lib/server";
import { verifyPassword, clearSession } from "@/lib/auth";

const deleteSchema = z.object({
  password: z.string().min(1, "Password is required.").max(200),
});

export async function DELETE(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, deleteSchema);

    const user = await db.user.findUnique({ where: { id: me.id }, select: { passwordHash: true } });
    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      throw new HttpError("Password is incorrect.", 400);
    }

    await db.$transaction([
      // Owned projects first (their remaining relations cascade).
      db.project.deleteMany({ where: { ownerId: me.id } }),
      // Everything else cascades via FK constraints.
      db.user.delete({ where: { id: me.id } }),
    ]);

    await clearSession();
    return ok({ ok: true });
  });
}
