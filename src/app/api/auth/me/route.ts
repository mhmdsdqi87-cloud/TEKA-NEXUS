// GET /api/auth/me — current SessionUser or null. Always 200.

import { getAuthUser } from "@/lib/auth";
import { handle, ok } from "@/lib/server";

export async function GET() {
  return handle(async () => {
    const user = await getAuthUser();
    return ok({ user });
  });
}
