// TEKA NEXUS — GET /api/os/heatmap  (Task 19-g)
// GitHub-style activity grid payload: per-day ActivityLog counts over a
// 371-day window (53 weeks × 7 rows), zero-filled server-side so the client
// always renders a complete grid.

import { db } from "@/lib/db";
import { handle, ok, requireUser } from "@/lib/server";

export const dynamic = "force-dynamic";

const DAY_MS = 86_400_000;
/** 371 days = exactly 53 week columns × 7 rows. */
const RANGE_DAYS = 371;

/** Fixed kind vocabulary — the client-shape contract for `days[].kinds`. */
const HEATMAP_KINDS = ["lesson", "boss", "crime", "war", "pet", "card", "speedrun", "shop", "voice"] as const;

type HeatKind = (typeof HEATMAP_KINDS)[number];

const isHeatKind = (kind: string): kind is HeatKind =>
  (HEATMAP_KINDS as readonly string[]).includes(kind);

/** UTC calendar-day key, e.g. "2026-02-10". */
function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const now = new Date();
    // Query window per spec: now − 371 days.
    const since = new Date(now.getTime() - RANGE_DAYS * DAY_MS);

    const rows = await db.activityLog.findMany({
      where: { userId: user.id, createdAt: { gte: since } },
      select: { kind: true, createdAt: true },
    });

    // Full zero-filled date list — exactly 371 calendar days (UTC) ending
    // today, so the grid is always 53×7 regardless of query edge alignment.
    const todayUtcMidnight = Date.parse(`${dayKey(now)}T00:00:00.000Z`);
    const buckets = new Map<string, { date: string; total: number; kinds: Record<HeatKind, number> }>();
    for (let i = RANGE_DAYS - 1; i >= 0; i--) {
      const date = dayKey(new Date(todayUtcMidnight - i * DAY_MS));
      const kinds = {} as Record<HeatKind, number>;
      for (const k of HEATMAP_KINDS) kinds[k] = 0;
      buckets.set(date, { date, total: 0, kinds });
    }

    let total = 0;
    for (const row of rows) {
      const bucket = buckets.get(dayKey(row.createdAt));
      if (!bucket || !isHeatKind(row.kind)) continue; // rows outside the grid window / unknown kind
      bucket.kinds[row.kind] += 1;
      bucket.total += 1;
      total += 1;
    }

    return ok({ days: [...buckets.values()], total, kinds: [...HEATMAP_KINDS] });
  });
}
