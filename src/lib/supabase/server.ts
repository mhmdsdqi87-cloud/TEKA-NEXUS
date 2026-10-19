// TEKA NEXUS — Supabase integration (server-only).
// Uses the project URL + publishable key for:
//   1. Live health probes (auth / REST / realtime reachability)
//   2. Mirroring TEKA registrations into Supabase Auth (GoTrue)
// Full Postgres (Prisma) access activates when SUPABASE_DB_PASSWORD is set —
// see prisma/schema.postgres.prisma and supabase/migrations/teka_schema.sql.
// NEVER import this module from client code.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? "";
const SUPABASE_DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD ?? "";
const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF ?? "";

export function supabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export function supabaseDbConfigured(): boolean {
  return Boolean(supabaseConfigured() && SUPABASE_DB_PASSWORD);
}

// Lazily-created singleton for Auth mirroring + future Data API calls.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured()) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

// Compose the full Postgres connection string (only valid once the
// real database password has been provided).
export function supabasePostgresUrl(): string | null {
  if (!SUPABASE_DB_PASSWORD || !SUPABASE_PROJECT_REF) return null;
  return `postgresql://postgres:${encodeURIComponent(
    SUPABASE_DB_PASSWORD
  )}@db.${SUPABASE_PROJECT_REF}.supabase.co:5432/postgres`;
}

export type SupabaseProbe = {
  configured: boolean;
  reachable: boolean;
  authVersion: string | null;
  dbPasswordProvided: boolean;
  projectRef: string;
  checkedAt: string;
  error?: string;
};

// Live probe: ping the Supabase Auth health endpoint with the publishable key.
export async function probeSupabase(): Promise<SupabaseProbe> {
  const base: SupabaseProbe = {
    configured: supabaseConfigured(),
    reachable: false,
    authVersion: null,
    dbPasswordProvided: supabaseDbConfigured(),
    projectRef: SUPABASE_PROJECT_REF,
    checkedAt: new Date().toISOString(),
  };
  if (!supabaseConfigured()) return { ...base, error: "not-configured" };

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: { apikey: SUPABASE_KEY },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return { ...base, error: `auth-health-${res.status}` };
    const body = (await res.json()) as { version?: string };
    return { ...base, reachable: true, authVersion: body.version ?? null };
  } catch (err) {
    return { ...base, error: err instanceof Error ? err.message : "probe-failed" };
  }
}

// Best-effort mirror: create the same account inside Supabase Auth so the
// founder can see every TEKA registration in the Supabase dashboard too.
// Never throws — the local account is the source of truth.
export async function mirrorUserToSupabaseAuth(input: {
  email: string;
  password: string;
  username: string;
}): Promise<{ mirrored: boolean; reason?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { mirrored: false, reason: "not-configured" };
  try {
    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: { data: { username: input.username, source: "teka-nexus" } },
    });
    if (error) {
      const alreadyExists = /already|registered|exists/i.test(error.message);
      return { mirrored: alreadyExists, reason: alreadyExists ? "already-exists" : error.message };
    }
    return { mirrored: true };
  } catch (err) {
    return { mirrored: false, reason: err instanceof Error ? err.message : "mirror-failed" };
  }
}
