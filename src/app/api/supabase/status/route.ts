// GET /api/supabase/status — live Supabase connection status.
// Public read-only probe so the founder panel can show real connectivity.

import { NextRequest } from "next/server";
import { handle, ok } from "@/lib/server";
import { probeSupabase } from "@/lib/supabase/server";

export async function GET(_req: NextRequest) {
  return handle(async () => {
    const probe = await probeSupabase();
    return ok({
      supabase: probe,
      // Prisma full-DB sync status (activates when the DB password is provided):
      prisma: {
        currentProvider: "sqlite",
        targetProvider: "postgresql",
        syncedToSupabase: probe.dbPasswordProvided,
        note: probe.dbPasswordProvided
          ? "Database password provided — full Postgres sync enabled."
          : "Waiting for the database password (Dashboard → Settings → Database).",
      },
    });
  });
}
