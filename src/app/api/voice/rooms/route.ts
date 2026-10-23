// TEKA NEXUS — voice-service REST proxy (Task 20).
// The browser preview proxies straight to the Next.js origin, bypassing the
// Caddy gateway, so `/rooms?XTransformPort=3021` can 404 client-side. This
// server-side route reaches the voice-service directly on localhost:3021
// (same box) and degrades gracefully when the mini service isn't running.

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const VOICE_SERVICE = "http://127.0.0.1:3021";

export async function GET() {
  try {
    const res = await fetch(`${VOICE_SERVICE}/rooms`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      return NextResponse.json({ rooms: [], online: false }, { status: 200 });
    }
    const data = (await res.json()) as { rooms?: unknown };
    return NextResponse.json({
      rooms: Array.isArray(data.rooms) ? data.rooms : [],
      online: true,
    });
  } catch {
    return NextResponse.json({ rooms: [], online: false }, { status: 200 });
  }
}
