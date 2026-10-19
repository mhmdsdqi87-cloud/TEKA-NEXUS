// GET /api/supabase/status — live Supabase connection status.
// Public read-only probe so the founder panel can show real connectivity.

import { NextRequest } from "next/server";
import { handle, ok } from "@/lib/server";
import {
  probeSupabase,
  supabaseSecretConfigured,
  listSupabaseAuthUsers,
} from "@/lib/supabase/server";

export async function GET(_req: NextRequest) {
  return handle(async () => {
    const probe = await probeSupabase();
    const secretReady = supabaseSecretConfigured();

    // With the secret key we can also report how many accounts live on the
    // Supabase side (mirrored registrations) — cheap, one admin call.
    let authMirror: { total: number | null; error?: string } = { total: null };
    if (secretReady && probe.reachable) {
      const dir = await listSupabaseAuthUsers(1);
      authMirror = { total: dir.total, error: dir.error };
    }

    return ok({
      supabase: probe,
      secretKey: {
        configured: secretReady,
        capabilities: secretReady
          ? ["storage:avatars", "auth:admin", "data:bypass-rls"]
          : [],
      },
      authMirror,
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
