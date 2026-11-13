// TEKA NEXUS — Contributor Submission Workflow for the NEXUS Knowledge Library.
//
// Pure validation + state-machine logic (unit-tested; no IO here).
//
// Honesty contract:
// - A submission NEVER touches the public catalog automatically.
// - "approve" (by a token-gated maintainer) creates a LibraryEntry with
//   status "under_review" — it only becomes "verified" when the repo's
//   verification pipeline executes its demo successfully.
// - The submitter is credited as sourceAuthor on the created entry.

import { createHash, timingSafeEqual } from "node:crypto";

import { z } from "zod";

export const SUBMISSION_CATEGORIES = [
  "frontend", "backend", "fullstack", "ai", "api", "database",
  "security", "devops", "performance", "patterns", "i18n", "web3",
] as const;

export const SUBMISSION_LANGUAGES = ["typescript", "javascript", "python", "sql", "bash"] as const;
export const SUBMISSION_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export const SUBMISSION_LICENSES = ["MIT", "Apache-2.0", "BSD-3-Clause"] as const;

export const SUBMISSION_STATUSES = ["submitted", "under_review", "accepted", "rejected"] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export const REVIEW_ACTIONS = ["under_review", "approve", "reject"] as const;
export type ReviewAction = (typeof REVIEW_ACTIONS)[number];

const SLUGGISH_HANDLE = /^[\w][\w.-]{1,58}[\w]$/;

export const submissionSchema = z.object({
  title: z.string().trim().min(5, "title: at least 5 characters").max(120),
  category: z.enum(SUBMISSION_CATEGORIES),
  summary: z.string().trim().min(20, "summary: at least 20 characters").max(400),
  language: z.enum(SUBMISSION_LANGUAGES),
  framework: z.string().trim().max(40).default("none"),
  difficulty: z.enum(SUBMISSION_DIFFICULTIES).default("intermediate"),
  problem: z.string().trim().min(30, "problem: at least 30 characters").max(2000),
  approach: z.string().trim().min(30, "approach: at least 30 characters").max(2000),
  code: z.string().min(50, "code: at least 50 characters").max(20000),
  demo: z.string().max(5000).default(""),
  expectedOutput: z.string().max(2000).default(""),
  install: z.string().max(500).default(""),
  usage: z.string().max(2000).default(""),
  securityNotes: z.string().max(2000).default(""),
  performanceNotes: z.string().max(2000).default(""),
  limitations: z.string().max(2000).default(""),
  version: z.string().trim().regex(/^\d+\.\d+\.\d+$/, "version: must be semver like 1.0.0").default("1.0.0"),
  license: z.enum(SUBMISSION_LICENSES).default("MIT"),
  tags: z
    .array(z.string().trim())
    .max(8)
    .default([])
    .transform((arr) => [...new Set(arr.map((t) => t.toLowerCase()).filter((t) => t.length > 0 && t.length <= 30))].slice(0, 8)),
  sourceUrl: z.string().trim().max(300).default(""),
  submitterHandle: z.string().trim().regex(SLUGGISH_HANDLE, "submitterHandle: 3-60 chars, letters/digits/dot/dash/underscore"),
  // Honeypot: humans never fill this; bots do. Any non-empty value fails.
  website: z.string().max(0, "honeypot filled — rejected").optional(),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const reviewActionSchema = z.object({
  action: z.enum(REVIEW_ACTIONS),
  reviewer: z.string().trim().min(3, "reviewer: at least 3 characters").max(60),
  note: z.string().trim().max(1000).default(""),
});

export type ReviewActionInput = z.infer<typeof reviewActionSchema>;

// ── State machine ────────────────────────────────────────────────────────────

export type TransitionResult =
  | { ok: true; next: SubmissionStatus; /** set only on approve — the new LibraryEntry's status */ entryStatus: "under_review" | null }
  | { ok: false; error: string };

/**
 * Honest lifecycle: submitted → under_review → accepted|rejected.
 * Approve = the library gains an under_review entry (NOT verified — the
 * pipeline still has to execute its demo). Reject is allowed from any
 * pre-acceptance state; accepted/rejected are terminal.
 */
export function applyReviewAction(current: string, action: ReviewAction): TransitionResult {
  switch (action) {
    case "under_review":
      if (current !== "submitted") return { ok: false, error: `cannot move a ${current} submission to under_review — only submitted ones` };
      return { ok: true, next: "under_review", entryStatus: null };
    case "approve":
      if (current === "accepted") return { ok: false, error: "submission is already accepted" };
      if (current === "rejected") return { ok: false, error: "cannot accept a rejected submission" };
      return { ok: true, next: "accepted", entryStatus: "under_review" };
    case "reject":
      if (current === "accepted") return { ok: false, error: "submission is already accepted — entries must be deprecated through the library, not un-accepted" };
      if (current === "rejected") return { ok: false, error: "submission is already rejected" };
      return { ok: true, next: "rejected", entryStatus: null };
  }
}

// ── Slug generation (for the entry created on approve) ──────────────────────

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/g, "");
}

// ── Review-token gate (constant-time) ───────────────────────────────────────

export type TokenGate = { ok: true } | { ok: false; code: "not_configured" | "invalid" };

/**
 * The review endpoints are maintainer-only. LIBRARY_REVIEW_TOKEN must be set
 * (min 16 chars) in the environment; callers send it as X-Review-Token.
 * If the env var is missing the gate refuses honestly (503 upstream) instead
 * of silently allowing.
 */
export function checkReviewToken(configured: string | undefined | null, provided: string | null | undefined): TokenGate {
  if (!configured || configured.length < 16) return { ok: false, code: "not_configured" };
  if (!provided || provided.length === 0) return { ok: false, code: "invalid" };
  const a = createHash("sha256").update(configured).digest();
  const b = createHash("sha256").update(provided).digest();
  return timingSafeEqual(a, b) ? { ok: true } : { ok: false, code: "invalid" };
}

// ── Best-effort in-memory rate limiter (fixed window) ───────────────────────
// Serverless instances are ephemeral, so this is an abuse brake, not a
// guarantee. Length caps + the honeypot field carry the rest of the load.

const WINDOW_MS = 60 * 60 * 1000;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    // keep the map bounded on long-lived instances
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}

// ── Public API shape for the submissions list ───────────────────────────────

export type PublicSubmission = {
  id: string;
  title: string;
  category: string;
  language: string;
  framework: string;
  difficulty: string;
  status: string;
  summary: string;
  tags: string[];
  submitterHandle: string;
  sourceUrl: string;
  license: string;
  version: string;
  reviewNote: string;
  reviewer: string;
  entrySlug: string;
  submittedAt: string;
  reviewedAt: string | null;
  hasDemo: boolean;
};

/** Everything a reviewer sees — submittedIp is never exposed. */
export function toPublicSubmission(row: {
  id: string; title: string; category: string; language: string; framework: string;
  difficulty: string; status: string; summary: string; tags: string; submitterHandle: string;
  sourceUrl: string; license: string; version: string; reviewNote: string; reviewer: string;
  entrySlug: string; submittedAt: Date; reviewedAt: Date | null; demo: string;
}): PublicSubmission {
  let tags: string[] = [];
  try {
    const v = JSON.parse(row.tags);
    if (Array.isArray(v)) tags = v.map(String);
  } catch {
    /* malformed tags stay empty */
  }
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    language: row.language,
    framework: row.framework,
    difficulty: row.difficulty,
    status: row.status,
    summary: row.summary,
    tags,
    submitterHandle: row.submitterHandle,
    sourceUrl: row.sourceUrl,
    license: row.license,
    version: row.version,
    reviewNote: row.reviewNote,
    reviewer: row.reviewer,
    entrySlug: row.entrySlug,
    submittedAt: row.submittedAt.toISOString(),
    reviewedAt: row.reviewedAt?.toISOString() ?? null,
    hasDemo: row.demo.trim().length > 0,
  };
}
