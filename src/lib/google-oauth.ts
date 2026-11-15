// TEKA NEXUS — Google OAuth 2.0 helper (server-only).
// Implements the Authorization Code flow directly against Google's endpoints
// (no NextAuth needed): start → consent → callback → session cookie.
// NEVER import this module from client code.

import { randomBytes, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const GOOGLE_STATE_COOKIE = "teka_oauth_state";
const STATE_TTL_SECONDS = 600;

export function googleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

// Public origin of the app. Priority: explicit env override → forwarded
// headers (proxy/CDN safe) → request URL origin. Used both for the Google
// redirect_uri and for post-login redirects back into the SPA.
export function appOrigin(req: NextRequest): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL ?? "";
  if (envUrl) return envUrl.replace(/\/+$/, "");
  const proto =
    req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
    new URL(req.url).protocol.replace(":", "");
  const host =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    req.headers.get("host") ??
    new URL(req.url).host;
  return `${proto}://${host}`;
}

export function googleAuthUrl(req: NextRequest): { url: string; state: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
  const state = randomBytes(24).toString("hex");
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${appOrigin(req)}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    // Always show the account chooser — avoids silently logging into a stale account.
    prompt: "select_account",
    access_type: "online",
  });
  return { url: `https://accounts.google.com/o/oauth2/v2/auth?${params}`, state };
}

export function stateCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: false, // matches the session cookie stance (sandbox preview is plain http)
    expires: expiresAt,
    path: "/",
  };
}

export function newStateExpiry(): Date {
  return new Date(Date.now() + STATE_TTL_SECONDS * 1000);
}

export function validState(received: string | undefined, expected: string | undefined): boolean {
  if (!received || !expected) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export type GoogleProfile = {
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  picture: string | null;
};

// Exchange the authorization code for tokens and fetch the verified profile.
export async function exchangeCodeForProfile(
  req: NextRequest,
  code: string
): Promise<
  | { ok: true; profile: GoogleProfile }
  | { ok: false; reason: "exchange" | "profile" | "unverified" }
> {
  const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${appOrigin(req)}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!tokenRes.ok) return { ok: false, reason: "exchange" };
    const tokens = (await tokenRes.json()) as { access_token?: string };
    if (!tokens.access_token) return { ok: false, reason: "exchange" };

    const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
      signal: AbortSignal.timeout(15_000),
    });
    if (!infoRes.ok) return { ok: false, reason: "profile" };
    const info = (await infoRes.json()) as {
      sub?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
    };
    if (!info.sub || !info.email) return { ok: false, reason: "profile" };
    if (info.email_verified === false) return { ok: false, reason: "unverified" };

    return {
      ok: true,
      profile: {
        sub: info.sub,
        email: info.email.toLowerCase(),
        // Line 117 already returned early when email_verified === false, so
        // reaching this point guarantees a verified address.
        emailVerified: true,
        name: info.name?.trim() || null,
        picture: info.picture ?? null,
      },
    };
  } catch {
    return { ok: false, reason: "exchange" };
  }
}

// Build a deterministic, valid TEKA username from a Google email/name.
// e.g. "mohammad.sadeghi87@gmail.com" → "mohammad_sadeghi87"; collisions get
// a numeric suffix. Returns null only if every attempt collides (practically never).
export async function deriveUniqueUsername(
  email: string,
  name: string | null,
  exists: (u: string) => Promise<boolean>
): Promise<string | null> {
  const { normalizeUsername, validateUsername } = await import("@/lib/auth");
  const fromEmail = email.split("@")[0] ?? "";
  const fromName = (name ?? "").toLowerCase().replace(/\s+/g, "_");
  const candidates = [fromEmail, fromName].filter(Boolean);

  for (const raw of candidates) {
    let base = normalizeUsername(raw).replace(/[^a-z0-9_]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
    if (base.length > 20) base = base.slice(0, 20).replace(/_+$/g, "");
    if (base.length < 3) base = (base + "_dev").slice(0, 24);
    if (validateUsername(base)) continue; // reserved or invalid shape
    if (!(await exists(base))) return base;
    for (let i = 0; i < 8; i++) {
      const suffix = Math.floor(Math.random() * 90 + 10); // 10-99
      const candidate = `${base.slice(0, 20)}${suffix}`;
      if (validateUsername(candidate)) continue;
      if (!(await exists(candidate))) return candidate;
    }
  }
  return null;
}
