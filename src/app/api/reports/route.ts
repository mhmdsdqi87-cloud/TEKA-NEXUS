// POST /api/reports — file a moderation report (rate limited).

import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, handle, HttpError, ok, parseBody } from "@/lib/server";

const reportSchema = z.object({
  targetType: z.enum(["project", "user", "comment"]),
  targetId: z.string().min(1, "Target is required."),
  reason: z.enum(["SPAM", "HARASSMENT", "INAPPROPRIATE", "COPYRIGHT", "OTHER"]),
  details: z.string().max(2000, "Details must be 2000 characters or fewer.").optional(),
});

export async function POST(req: NextRequest) {
  return handle(async () => {
    const me = await requireUser();
    const body = await parseBody(req, reportSchema);

    // Rate limit: max 20 reports per user per rolling 24h window.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recent = await db.report.count({
      where: { reporterId: me.id, createdAt: { gte: since } },
    });
    if (recent > 20) {
      throw new HttpError("Too many reports. Please try again later.", 429);
    }

    await db.report.create({
      data: {
        reporterId: me.id,
        targetType: body.targetType,
        targetId: body.targetId,
        reason: body.reason,
        details: body.details ?? "",
      },
    });

    return ok({ ok: true });
  });
}
