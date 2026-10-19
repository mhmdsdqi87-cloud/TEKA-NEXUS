// TEKA NEXUS — request middleware.
// Bridges the x-teka-session header into the teka_session cookie for API routes.
// Why: the sandbox preview runs the app inside a cross-origin iframe where
// SameSite=Lax cookies are dropped by the browser — causing 401s right after
// signup/login. The client mirrors the session token into localStorage and
// sends it as a header; middleware re-attaches it to the request so every
// existing cookie-based auth path keeps working unchanged.

import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "teka_session";
const SESSION_HEADER = "x-teka-session";

export function middleware(req: NextRequest) {
  const headerToken = req.headers.get(SESSION_HEADER);
  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

  if (headerToken && !hasCookie) {
    const headers = new Headers(req.headers);
    const existing = headers.get("cookie");
    headers.set(
      "cookie",
      existing && existing.length > 0
        ? `${existing}; ${SESSION_COOKIE}=${headerToken}`
        : `${SESSION_COOKIE}=${headerToken}`
    );
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/:path*"],
};
