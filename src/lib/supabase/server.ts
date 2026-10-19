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
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? "";
const SUPABASE_DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD ?? "";
const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF ?? "";
const SUPABASE_AVATAR_BUCKET = process.env.SUPABASE_AVATAR_BUCKET ?? "teka-avatars";

export function supabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export function supabaseSecretConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);
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

// ─────────────────────────────────────────────────────────────
// SECRET-KEY CAPABILITIES (Storage admin + Auth admin)
// ─────────────────────────────────────────────────────────────

// Low-level helper: call a Supabase REST endpoint with the secret key.
async function secretFetch(
  path: string,
  init: RequestInit & { apikeyFirst?: boolean } = {}
): Promise<Response> {
  if (!supabaseSecretConfigured()) {
    throw new Error("supabase-secret-not-configured");
  }
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body && typeof init.body === "string") {
    headers.set("Content-Type", "application/json");
  }
  headers.set("apikey", SUPABASE_SECRET_KEY);
  headers.set("Authorization", `Bearer ${SUPABASE_SECRET_KEY}`);
  return fetch(`${SUPABASE_URL}${path}`, { ...init, headers, signal: AbortSignal.timeout(15000) });
}

// ── Storage: avatars ─────────────────────────────────────────

// Create the avatar bucket if it does not exist yet (idempotent).
export async function ensureAvatarBucket(): Promise<{ ready: boolean; reason?: string }> {
  try {
    const res = await secretFetch(`/storage/v1/bucket/${SUPABASE_AVATAR_BUCKET}`);
    if (res.ok) return { ready: true };
    if (res.status !== 404 && res.status !== 400) {
      return { ready: false, reason: `bucket-check-${res.status}` };
    }
    const create = await secretFetch(`/storage/v1/bucket`, {
      method: "POST",
      body: JSON.stringify({
        id: SUPABASE_AVATAR_BUCKET,
        name: SUPABASE_AVATAR_BUCKET,
        public: true,
        file_size_limit: 1024 * 1024,
        allowed_mime_types: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      }),
    });
    if (!create.ok && create.status !== 409 && create.status !== 400) {
      return { ready: false, reason: `bucket-create-${create.status}` };
    }
    return { ready: true };
  } catch (err) {
    return { ready: false, reason: err instanceof Error ? err.message : "bucket-error" };
  }
}

// Upload an avatar image buffer to Supabase Storage and return its public URL.
export async function uploadAvatarToStorage(input: {
  userId: string;
  buffer: Buffer;
  contentType: string;
}): Promise<{ url: string | null; path?: string; reason?: string }> {
  const ready = await ensureAvatarBucket();
  if (!ready.ready) return { url: null, reason: ready.reason };

  const ext = input.contentType.includes("png")
    ? "png"
    : input.contentType.includes("webp")
      ? "webp"
      : "jpg";
  // Unique path per upload; the object URL is content-addressed by timestamp so
  // CDNs/browsers always fetch the fresh image.
  const path = `${input.userId}/${Date.now().toString(36)}.${ext}`;

  try {
    const res = await secretFetch(`/storage/v1/object/${SUPABASE_AVATAR_BUCKET}/${path}`, {
      method: "POST",
      headers: { "Content-Type": input.contentType, "x-upsert": "false" },
      body: new Uint8Array(input.buffer),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { url: null, reason: `upload-${res.status}${text ? `: ${text.slice(0, 120)}` : ""}` };
    }
    return { url: `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_AVATAR_BUCKET}/${path}`, path };
  } catch (err) {
    return { url: null, reason: err instanceof Error ? err.message : "upload-failed" };
  }
}

// Remove a previously-uploaded avatar object (best-effort cleanup).
export async function deleteAvatarFromStorage(url: string): Promise<boolean> {
  const marker = `/storage/v1/object/public/${SUPABASE_AVATAR_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return false; // not a Supabase Storage URL — nothing to do
  const objectPath = url.slice(idx + marker.length);
  try {
    const res = await secretFetch(`/storage/v1/object/${SUPABASE_AVATAR_BUCKET}/${objectPath}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── Auth admin: directory of Supabase-side accounts ─────────

export async function listSupabaseAuthUsers(
  maxPages = 3
): Promise<{ total: number | null; emails: string[]; error?: string }> {
  try {
    const emails: string[] = [];
    let page = 1;
    for (; page <= maxPages; page++) {
      const res = await secretFetch(`/auth/v1/admin/users?per_page=200&page=${page}`);
      if (!res.ok) return { total: null, emails, error: `admin-users-${res.status}` };
      const body = (await res.json()) as {
        users?: Array<{ email?: string | null }>;
      };
      for (const u of body.users ?? []) if (u.email) emails.push(u.email);
      if ((body.users?.length ?? 0) < 200) break;
    }
    return { total: emails.length, emails };
  } catch (err) {
    return { total: null, emails: [], error: err instanceof Error ? err.message : "admin-failed" };
  }
}

// Delete an account from Supabase Auth (admin cleanup, e.g. probe accounts).
export async function deleteSupabaseAuthUser(userId: string): Promise<boolean> {
  try {
    const res = await secretFetch(`/auth/v1/admin/users/${userId}`, { method: "DELETE" });
    return res.ok || res.status === 404;
  } catch {
    return false;
  }
}

// Look up a Supabase Auth user by email (admin).
export async function findSupabaseAuthUserByEmail(
  email: string
): Promise<{ id: string } | null> {
  try {
    const res = await secretFetch(
      `/auth/v1/admin/users?per_page=50&query=${encodeURIComponent(email)}`
    );
    if (!res.ok) return null;
    const body = (await res.json()) as { users?: Array<{ id: string; email?: string | null }> };
    const hit = (body.users ?? []).find((u) => (u.email ?? "").toLowerCase() === email.toLowerCase());
    return hit ? { id: hit.id } : null;
  } catch {
    return null;
  }
}
