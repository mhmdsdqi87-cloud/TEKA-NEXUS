// TEKA NEXUS — GET /api — service health probe.
// Reports whether the API process is alive AND whether the database answers.
// Always 200: monitors parse the JSON payload instead of guessing from status.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type Health = { ok: boolean; service: "teka-nexus"; db: "up" | "down"; time: string };

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    const body: Health = { ok: true, service: "teka-nexus", db: "up", time: new Date().toISOString() };
    return NextResponse.json(body);
  } catch {
    // Health probes should not 500 — surface db:"down" and let monitors alert.
    const body: Health = { ok: false, service: "teka-nexus", db: "down", time: new Date().toISOString() };
    return NextResponse.json(body);
  }
}
