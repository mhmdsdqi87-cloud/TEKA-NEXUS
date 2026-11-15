// GET /api/auth/google/status — tells the client whether Google sign-in is
// configured on this deployment (both OAuth env vars present).

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const enabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );
  return NextResponse.json({ enabled });
}
