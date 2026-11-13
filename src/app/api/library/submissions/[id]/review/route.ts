// TEKA NEXUS — POST /api/library/submissions/[id]/review
// Maintainer-only review action on a contributor submission.
//
// Body: { action: "under_review" | "approve" | "reject", reviewer, note? }
// Auth: X-Review-Token header = LIBRARY_REVIEW_TOKEN (see checkReviewToken).
//
// Honest promotion rule: "approve" creates a LibraryEntry with status
// "under_review" (never "verified") — scripts/library-verify.ts must execute
// the entry's demo before it is ever marked verified. The submitter is
// credited as sourceAuthor.

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import {
  applyReviewAction,
  checkReviewToken,
  reviewActionSchema,
  slugifyTitle,
} from "@/lib/library-submissions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
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

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: { code: "bad_json", message: "Body must be a JSON object." } }, { status: 400 });
  }

  const parsed = reviewActionSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.slice(0, 10).map((i) => `${i.path.join(".") || "body"}: ${i.message}`);
    return NextResponse.json({ ok: false, error: { code: "validation_failed", message: "Review action failed validation.", issues } }, { status: 400 });
  }

  try {
    const submission = await db.librarySubmission.findUnique({ where: { id } });
    if (!submission) {
      return NextResponse.json({ ok: false, error: { code: "not_found", message: `No submission with id: ${id}` } }, { status: 404 });
    }

    const transition = applyReviewAction(submission.status, parsed.data.action);
    if (!transition.ok) {
      return NextResponse.json({ ok: false, error: { code: "invalid_transition", message: transition.error } }, { status: 400 });
    }

    const entrySlug = transition.entryStatus ? await createUniqueEntrySlug(submission.title) : "";

    const updated = await db.$transaction(async (tx) => {
      if (transition.entryStatus) {
        await tx.libraryEntry.create({
          data: {
            slug: entrySlug,
            title: submission.title,
            category: submission.category,
            summary: submission.summary,
            language: submission.language,
            framework: submission.framework,
            difficulty: submission.difficulty,
            // honest: accepted ≠ verified — the pipeline promotes to verified
            status: transition.entryStatus,
            problem: submission.problem,
            approach: submission.approach,
            code: submission.code,
            demo: submission.demo,
            expectedOutput: submission.expectedOutput,
            dependencies: "[]",
            install: submission.install,
            usage: submission.usage,
            securityNotes: submission.securityNotes,
            performanceNotes: submission.performanceNotes,
            limitations: submission.limitations,
            version: submission.version,
            sourceAuthor: submission.submitterHandle,
            sourceUrl: submission.sourceUrl,
            license: submission.license,
            tags: submission.tags,
            related: "[]",
            verifier: "",
            verifiedAt: null,
          },
        });
      }
      return tx.librarySubmission.update({
        where: { id: submission.id },
        data: {
          status: transition.next,
          reviewNote: parsed.data.note,
          reviewer: parsed.data.reviewer,
          reviewedAt: new Date(),
          entrySlug,
        },
        select: { id: true, status: true, entrySlug: true },
      });
    });

    return NextResponse.json({
      ok: true,
      data: {
        id: updated.id,
        status: updated.status,
        entrySlug: updated.entrySlug || null,
        entryStatus: transition.entryStatus,
        note: transition.entryStatus
          ? "Entry created with status under_review — it becomes verified only when the pipeline executes its demo successfully."
          : undefined,
      },
    });
  } catch (err) {
    console.error("[api/library/submissions/review] storage unavailable:", err);
    return NextResponse.json(
      { ok: false, error: { code: "unavailable", message: "Submission storage is temporarily unavailable — nothing was changed." } },
      { status: 503 },
    );
  }
}

/** Kebab slug from the title, deduplicated with -2/-3… against LibraryEntry. */
async function createUniqueEntrySlug(title: string): Promise<string> {
  const base = slugifyTitle(title) || "contributed-entry";
  let candidate = base;
  for (let n = 2; ; n++) {
    const clash = await db.libraryEntry.findUnique({ where: { slug: candidate }, select: { slug: true } });
    if (!clash) return candidate;
    candidate = `${base}-${n}`;
  }
}
