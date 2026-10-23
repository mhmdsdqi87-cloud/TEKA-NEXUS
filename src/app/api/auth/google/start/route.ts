// GET /api/auth/google/start — kicks off the Google OAuth Authorization Code
// flow. When the deployment lacks the OAuth env vars the visitor is bounced
// back to the app with ?authError=google_disabled (the auth view shows the
// activation guide dialog).

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/?authError=google_disabled", appUrl));
  }

  const state = crypto.randomUUID();
  const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  auth.searchParams.set("client_id", clientId);
  auth.searchParams.set("redirect_uri", `${appUrl}/api/auth/google/callback`);
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("scope", "openid email profile");
  auth.searchParams.set("state", state);
  auth.searchParams.set("prompt", "select_account");

  const res = NextResponse.redirect(auth.toString());
  res.cookies.set("teka_g_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
