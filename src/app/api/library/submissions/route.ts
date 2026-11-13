// TEKA NEXUS — GET /api/library/submissions
// Maintainer-only listing of contributor submissions (review dashboard feed).
//
// Auth: X-Review-Token header must equal LIBRARY_REVIEW_TOKEN (min 16 chars).
// Missing env var = honest 503 (gate is not configured), wrong token = 401.
// submittedIp is never included in the response.

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkReviewToken, SUBMISSION_STATUSES, toPublicSubmission } from "@/lib/library-submissions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const gate = checkReviewToken(process.env.LIBRARY_REVIEW_TOKEN, req.headers.get("x-review-token"));
  if (!gate.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          gate.code === "not_configured"
            ? { code: "review_gate_not_configured", message: "LIBRARY_REVIEW_TOKEN is not set in this environment — the review gate refuses to open honestly instead of allowing by default." }
            : { code: "unauthorized", message: "Missing or wrong X-Review-Token." },
      },
      { status: gate.code === "not_configured" ? 503 : 401 },
    );
  }

  const status = (req.nextUrl.searchParams.get("status") ?? "").trim();
  const where = (SUBMISSION_STATUSES as readonly string[]).includes(status) ? { status } : {};

  try {
    const rows = await db.librarySubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true, title: true, category: true, language: true, framework: true,
        difficulty: true, status: true, summary: true, tags: true, submitterHandle: true,
        sourceUrl: true, license: true, version: true, reviewNote: true, reviewer: true,
        entrySlug: true, submittedAt: true, reviewedAt: true, demo: true,
      },
    });
    return NextResponse.json(
      { ok: true, data: rows.map(toPublicSubmission), meta: { count: rows.length } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[api/library/submissions] storage unavailable:", err);
    return NextResponse.json(
      { ok: false, error: { code: "unavailable", message: "Submission storage is temporarily unavailable." } },
      { status: 503 },
    );
  }
}
