// TEKA NEXUS — POST /api/library/submit
// Public contributor submission endpoint for the NEXUS Knowledge Library.
//
// Contract:
//   { ok: true,  data: { id, status: "submitted", submittedAt, next } }
//   { ok: false, error: { code, message } }
//
// Guards: honeypot field, per-IP fixed-window rate limit (best effort on
// serverless), strict zod validation with length caps. Submissions never
// touch the public catalog directly — a token-gated maintainer reviews them
// (see /api/library/submissions), and even then the entry starts as
// "under_review": only the verification pipeline can make it "verified".

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { rateLimit, submissionSchema } from "@/lib/library-submissions";

export const dynamic = "force-dynamic";

function jsonError(code: string, message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error: { code, message, ...(extra ?? {}) } }, { status });
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "")?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);

  if (!rateLimit(`library-submit:${ip}`, 5)) {
    return jsonError("rate_limited", "Too many submissions from this address — try again in about an hour.", 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("bad_json", "Body must be a JSON object.", 400);
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.slice(0, 10).map((i) => `${i.path.join(".") || "body"}: ${i.message}`);
    return jsonError("validation_failed", "Submission failed validation.", 400, { issues });
  }
  const input = parsed.data;

  try {
    const row = await db.librarySubmission.create({
      data: {
        title: input.title,
        category: input.category,
        summary: input.summary,
        language: input.language,
        framework: input.framework || "none",
        difficulty: input.difficulty,
        problem: input.problem,
        approach: input.approach,
        code: input.code,
        demo: input.demo,
        expectedOutput: input.expectedOutput,
        install: input.install,
        usage: input.usage,
        securityNotes: input.securityNotes,
        performanceNotes: input.performanceNotes,
        limitations: input.limitations,
        version: input.version,
        license: input.license,
        tags: JSON.stringify(input.tags),
        sourceUrl: input.sourceUrl,
        submitterHandle: input.submitterHandle,
        submittedIp: ip,
        status: "submitted",
      },
      select: { id: true, status: true, submittedAt: true },
    });

    return NextResponse.json(
      {
        ok: true,
        data: {
          id: row.id,
          status: row.status,
          submittedAt: row.submittedAt.toISOString(),
          next:
            "A maintainer reviews your submission. If accepted, it enters the library as an under_review entry credited to you — it becomes verified only after the pipeline executes its demo.",
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[api/library/submit] storage unavailable:", err);
    return jsonError("unavailable", "Submission storage is temporarily unavailable — try again shortly.", 503);
  }
}
