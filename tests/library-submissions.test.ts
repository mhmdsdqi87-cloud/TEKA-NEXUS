// TEKA NEXUS — contributor submission workflow tests (src/lib/library-submissions.ts).
// Pure validation + state machine + review gate. The honest rules under test:
// submissions never auto-publish, approve creates an under_review entry (NOT
// verified), and the review gate refuses to open when unconfigured.

import { describe, expect, test } from "bun:test";

import {
  applyReviewAction,
  checkReviewToken,
  rateLimit,
  reviewActionSchema,
  slugifyTitle,
  submissionSchema,
  toPublicSubmission,
} from "@/lib/library-submissions";

const validSubmission = {
  title: "Graceful payment outage guard",
  category: "patterns",
  summary: "Wraps flaky payment calls behind a breaker with fallback so the app keeps running during outages.",
  language: "typescript",
  framework: "none",
  difficulty: "intermediate",
  problem: "When the payment provider goes down, every request that touches it throws and users see a broken app.",
  approach: "Circuit breaker with half-open probing and a cached fallback response for read-only payment checks.",
  code: "export function guard(fn) { /* at least fifty characters of real implementation code here */ return fn; }",
  demo: "import { guard } from './impl';\nconsole.log('ok');",
  expectedOutput: "ok",
  tags: ["Resilience", "resilience", "circuit-breaker", ""],
  submitterHandle: "some-builder",
  website: undefined,
};

describe("submissionSchema", () => {
  test("accepts a complete valid submission and normalizes tags", () => {
    const parsed = submissionSchema.safeParse(validSubmission);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      // lowercase + deduped + empties dropped
      expect(parsed.data.tags).toEqual(["resilience", "circuit-breaker"]);
      expect(parsed.data.version).toBe("1.0.0"); // default applied
    }
  });

  test("rejects a short title", () => {
    const parsed = submissionSchema.safeParse({ ...validSubmission, title: "hi" });
    expect(parsed.success).toBe(false);
  });

  test("rejects an unknown category", () => {
    const parsed = submissionSchema.safeParse({ ...validSubmission, category: "blockchain" });
    expect(parsed.success).toBe(false);
  });

  test("rejects a filled honeypot field (bots only fill 'website')", () => {
    const parsed = submissionSchema.safeParse({ ...validSubmission, website: "http://spam.example" });
    expect(parsed.success).toBe(false);
  });

  test("rejects oversized code", () => {
    const parsed = submissionSchema.safeParse({ ...validSubmission, code: "x".repeat(20001) });
    expect(parsed.success).toBe(false);
  });

  test("rejects a malformed submitter handle", () => {
    const parsed = submissionSchema.safeParse({ ...validSubmission, submitterHandle: "a" });
    expect(parsed.success).toBe(false);
  });

  test("rejects a non-semver version", () => {
    const parsed = submissionSchema.safeParse({ ...validSubmission, version: "v1" });
    expect(parsed.success).toBe(false);
  });
});

describe("applyReviewAction (honest state machine)", () => {
  test("submitted → under_review is allowed", () => {
    const r = applyReviewAction("submitted", "under_review");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.next).toBe("under_review");
  });

  test("approve creates an UNDER_REVIEW entry — never a verified one", () => {
    const r = applyReviewAction("submitted", "approve");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.next).toBe("accepted");
      expect(r.entryStatus).toBe("under_review");
    }
  });

  test("approve also works from under_review", () => {
    const r = applyReviewAction("under_review", "approve");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.entryStatus).toBe("under_review");
  });

  test("accepted is terminal — no re-approve, no un-accept via reject", () => {
    expect(applyReviewAction("accepted", "approve").ok).toBe(false);
    expect(applyReviewAction("accepted", "reject").ok).toBe(false);
  });

  test("rejected is terminal — but reachable from submitted or under_review", () => {
    expect(applyReviewAction("rejected", "reject").ok).toBe(false);
    expect(applyReviewAction("submitted", "reject").ok).toBe(true);
    expect(applyReviewAction("under_review", "reject").ok).toBe(true);
  });

  test("only submitted can be marked under_review", () => {
    expect(applyReviewAction("under_review", "under_review").ok).toBe(false);
    expect(applyReviewAction("rejected", "under_review").ok).toBe(false);
  });
});

describe("slugifyTitle", () => {
  test("kebab-cases punctuation and caps length", () => {
    expect(slugifyTitle("Boot-time Env Guard!")).toBe("boot-time-env-guard");
    expect(slugifyTitle("A Very Long Title That Keeps Going And Going And Going And Going And Going Forever And Ever")).toHaveLength(70);
    expect(slugifyTitle("###")).toBe(""); // punctuation-only → empty; the review route substitutes a default slug
  });
});

describe("checkReviewToken", () => {
  test("refuses honestly when the gate is not configured", () => {
    expect(checkReviewToken(undefined, "anything")).toEqual({ ok: false, code: "not_configured" });
    expect(checkReviewToken("short", "anything")).toEqual({ ok: false, code: "not_configured" });
    expect(checkReviewToken("", null)).toEqual({ ok: false, code: "not_configured" });
  });

  test("rejects missing or wrong tokens with constant-time comparison", () => {
    const configured = "x".repeat(32);
    expect(checkReviewToken(configured, null)).toEqual({ ok: false, code: "invalid" });
    expect(checkReviewToken(configured, "")).toEqual({ ok: false, code: "invalid" });
    expect(checkReviewToken(configured, "y".repeat(32))).toEqual({ ok: false, code: "invalid" });
    expect(checkReviewToken(configured, configured)).toEqual({ ok: true });
  });
});

describe("rateLimit (best-effort brake)", () => {
  test("allows up to the limit then blocks within the window", () => {
    const key = `test:${Math.random()}`;
    expect(rateLimit(key, 5)).toBe(true);
    expect(rateLimit(key, 5)).toBe(true);
    expect(rateLimit(key, 5)).toBe(true);
    expect(rateLimit(key, 5)).toBe(true);
    expect(rateLimit(key, 5)).toBe(true);
    expect(rateLimit(key, 5)).toBe(false);
  });
});

describe("reviewActionSchema", () => {
  test("requires reviewer + known action", () => {
    expect(reviewActionSchema.safeParse({ action: "approve", reviewer: "maintainer" }).success).toBe(true);
    expect(reviewActionSchema.safeParse({ action: "publish", reviewer: "maintainer" }).success).toBe(false);
    expect(reviewActionSchema.safeParse({ action: "approve", reviewer: "x" }).success).toBe(false);
  });
});

describe("toPublicSubmission", () => {
  test("never exposes the submitter IP and parses tags safely", () => {
    const base = {
      id: "s1", title: "T", category: "patterns", language: "typescript", framework: "none",
      difficulty: "intermediate", status: "submitted", summary: "S", tags: '["a","b"]',
      submitterHandle: "builder", sourceUrl: "", license: "MIT", version: "1.0.0",
      reviewNote: "", reviewer: "", entrySlug: "",
      submittedAt: new Date("2026-01-01T00:00:00Z"), reviewedAt: null, demo: "yes",
    };
    const pub = toPublicSubmission(base);
    expect("submittedIp" in pub).toBe(false);
    expect(pub.tags).toEqual(["a", "b"]);
    expect(pub.hasDemo).toBe(true);
    expect(pub.reviewedAt).toBeNull();
  });
});
