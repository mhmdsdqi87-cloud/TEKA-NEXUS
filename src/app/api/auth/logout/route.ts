// POST /api/auth/logout — delete the current session and clear the cookie.

import { clearSession } from "@/lib/auth";
import { handle, ok } from "@/lib/server";

export async function POST() {
  return handle(async () => {
    await clearSession();
    return ok({ ok: true });
  });
}
