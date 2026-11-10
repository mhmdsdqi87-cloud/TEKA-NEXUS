// GET /api/supabase/status — live Supabase connection status.
// FOUNDER-ONLY probe (infra details + auth-user counts must not be public).

import { NextRequest } from "next/server";
import { fail, handle, ok, requireUser } from "@/lib/server";
import {
  probeSupabase,
  probeJwks,
  supabaseJwksUrl,
  supabaseSecretConfigured,
  listSupabaseAuthUsers,
} from "@/lib/supabase/server";

export async function GET(_req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    if (me.role !== "FOUNDER") return fail("Not found.", 404);

    const probe = await probeSupabase();
    const secretReady = supabaseSecretConfigured();
    const jwks = await probeJwks();

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
      jwks: {
        configured: jwks.configured,
        reachable: jwks.reachable,
        keyCount: jwks.keyCount,
        algorithms: jwks.algorithms,
        url: supabaseJwksUrl(),
        error: jwks.error ?? null,
      },
      authMirror,
      // Prisma full-DB sync status — derived from the live connection string.
      prisma: {
        currentProvider: (process.env.DATABASE_URL ?? "").startsWith("postgres")
          ? "postgresql"
          : "sqlite",
        targetProvider: "postgresql",
        syncedToSupabase: (process.env.DATABASE_URL ?? "").startsWith("postgres"),
        note: (process.env.DATABASE_URL ?? "").startsWith("postgres")
          ? "Live: Prisma is connected to the Supabase Postgres database."
          : "Waiting for a PostgreSQL DATABASE_URL.",
      },
    });
  });
}
