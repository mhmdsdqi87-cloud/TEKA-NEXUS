// GET /api/auth/google/callback — Authorization Code exchange for TEKA NEXUS.
// Verifies the CSRF state cookie, swaps the code for tokens, fetches the
// Google profile, links-or-creates the local user, opens a TEKA session
// cookie and returns to the app.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, setSessionCookie, hashPassword } from "@/lib/auth";
import { ensureFounderRole, isFounderEmail } from "@/lib/founder";

export const dynamic = "force-dynamic";

interface GoogleProfile {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}

function fail(appUrl: string, code: string) {
  return NextResponse.redirect(new URL(`/?authError=${code}`, appUrl));
}

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return fail(appUrl, "google_disabled");

    const code = req.nextUrl.searchParams.get("code");
    const state = req.nextUrl.searchParams.get("state");
    const cookieState = req.cookies.get("teka_g_state")?.value;
    if (!code) return fail(appUrl, "google_cancelled");
    if (!state || !cookieState || state !== cookieState) {
      return fail(appUrl, "google_state");
    }

    // ── code → tokens ────────────────────────────────────────────
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${appUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });
    if (!tokenRes.ok) return fail(appUrl, "google_failed");
    const tokens = (await tokenRes.json()) as { access_token?: string };
    if (!tokens.access_token) return fail(appUrl, "google_failed");

    // ── tokens → profile ─────────────────────────────────────────
    const infoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!infoRes.ok) return fail(appUrl, "google_failed");
    const profile = (await infoRes.json()) as GoogleProfile;
    if (!profile.sub || !profile.email) return fail(appUrl, "google_failed");

    // ── link-or-create the local user ────────────────────────────
    let user = await db.user.findUnique({ where: { googleId: profile.sub } });

    if (!user) {
      const byEmail = await db.user.findUnique({
        where: { email: profile.email.toLowerCase() },
      });
      if (byEmail) {
        user = await db.user.update({
          where: { id: byEmail.id },
          data: {
            googleId: profile.sub,
            avatarUrl: byEmail.avatarUrl ?? profile.picture ?? null,
          },
        });
      }
    }

    if (!user) {
      const base =
        profile.email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "")
          .slice(0, 16) || "builder";
      let username = base;
      for (let i = 0; i < 6; i++) {
        const taken = await db.user.findUnique({ where: { username } });
        if (!taken) break;
        username = `${base}${Math.floor(Math.random() * 9000) + 1000}`;
      }
      const palette = ["cyan", "violet", "emerald", "amber", "rose", "sky"];
      user = await db.user.create({
        data: {
          email: profile.email.toLowerCase(),
          username,
          passwordHash: hashPassword(`${crypto.randomUUID()}${crypto.randomUUID()}`),
          displayName: profile.name?.slice(0, 40) || username,
          avatarUrl: profile.picture ?? null,
          avatarColor: palette[Math.floor(Math.random() * palette.length)],
          googleId: profile.sub,
        },
      });
      await db.userNotificationPrefs.create({ data: { userId: user.id } });
    }

    if (isFounderEmail(user.email)) await ensureFounderRole(user.id, user.email);

    const { token, expiresAt } = await createSession(user.id);
    await setSessionCookie(token, expiresAt);

    const res = NextResponse.redirect(new URL("/?welcome=google", appUrl));
    res.cookies.delete("teka_g_state");
    return res;
  } catch {
    return fail(appUrl, "google_failed");
  }
}
