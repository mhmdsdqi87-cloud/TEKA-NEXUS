// TEKA NEXUS — semantic-lite search tests (src/lib/library-search.ts).
// The concept map must find patterns by MEANING, not just keyword overlap —
// the canonical case: a Persian natural-language query about a payment
// service outage must surface the circuit-breaker entry.

import { describe, expect, test } from "bun:test";

import { catalogListItems } from "@/lib/library-catalog";
import { expandQuery, rankByQuery, scoreLibraryEntry } from "@/lib/library-search";

const CATALOG = catalogListItems();

describe("expandQuery", () => {
  test("English technical keywords map to concepts", () => {
    const { concepts } = expandQuery("rate limiter with retry and backoff");
    expect(concepts).toContain("rate-limiting");
    expect(concepts).toContain("retry-backoff");
  });

  test("the payment-outage Persian query triggers fault-tolerance + circuit-breaker", () => {
    const { concepts } = expandQuery("من یک سیستم پرداخت دارم که اگر سرویس قطع شد نباید کل برنامه از کار بیفتد");
    expect(concepts).toContain("fault-tolerance");
    expect(concepts).toContain("circuit-breaker");
  });

  test("Arabic characters are normalized (ك → ک, ي → ی)", () => {
    const { concepts } = expandQuery("كش کردن دیتابیس"); // Arabic kaf — must normalize to Persian کش
    expect(concepts).toContain("caching");
  });

  test("gibberish triggers nothing", () => {
    const { concepts, terms } = expandQuery("zzzqqx yyqwlk");
    expect(concepts).toEqual([]);
    expect(terms.length).toBeGreaterThan(0); // terms are still extracted honestly
  });
});

describe("rankByQuery over the real catalog", () => {
  test("exact English keyword: 'rate limiter' ranks the token bucket first", () => {
    const ranked = rankByQuery(CATALOG, "rate limiter");
    expect(ranked.length).toBeGreaterThan(0);
    expect(ranked[0].item.slug).toBe("token-bucket-rate-limiter");
  });

  test("exact English keyword: 'ssrf' ranks the SSRF guard first", () => {
    const ranked = rankByQuery(CATALOG, "ssrf");
    expect(ranked[0].item.slug).toBe("ssrf-safe-url-guard");
  });

  test("the payment-outage Persian query surfaces circuit-breaker in the top 3 (no keyword overlap)", () => {
    const q = "سیستم پرداخت من دارم سرویس قطع میشود برنامه نباید از کار بیفتد";
    const ranked = rankByQuery(CATALOG, q);
    expect(ranked.length).toBeGreaterThan(0);
    const top3 = ranked.slice(0, 3).map(({ item }) => item.slug);
    expect(top3).toContain("circuit-breaker");
  });

  test("zero hits are reported as zero — no padding with weak matches", () => {
    const ranked = rankByQuery(CATALOG, "zzzqqx yyqwlk");
    expect(ranked).toEqual([]);
    for (const entry of CATALOG) {
      expect(scoreLibraryEntry(entry, "zzzqqx yyqwlk")).toBe(0);
    }
  });

  test("results are ranked by score descending", () => {
    const ranked = rankByQuery(CATALOG, "retry with exponential backoff and jitter");
    expect(ranked.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].score).toBeGreaterThanOrEqual(ranked[i].score);
    }
  });
});

describe("scoreLibraryEntry", () => {
  const base = { title: "Something else", summary: "A generic module", tags: [] as string[] };

  test("literal tiers preserved: title contains query > tags > summary", () => {
    const titleHit = scoreLibraryEntry({ ...base, title: "SSRF-safe outbound guard" }, "ssrf");
    const tagHit = scoreLibraryEntry({ ...base, tags: ["ssrf", "security"] }, "ssrf");
    const summaryHit = scoreLibraryEntry({ ...base, summary: "prevents ssrf attacks" }, "ssrf");
    expect(titleHit).toBeGreaterThan(tagHit);
    expect(tagHit).toBeGreaterThan(summaryHit);
    expect(summaryHit).toBeGreaterThan(0);
  });

  test("tags accepted as JSON string or array — identical scores", () => {
    const asArray = scoreLibraryEntry({ ...base, tags: ["pagination"] }, "pagination");
    const asString = scoreLibraryEntry({ ...base, tags: '["pagination"]' }, "pagination");
    expect(asArray).toBe(asString);
    expect(asArray).toBeGreaterThan(0);
  });

  test("concept hit boosts an entry with no literal query overlap", () => {
    // Persian 'مدارشکن' (circuit breaker) never appears in the entry, but the
    // activated concept's English terms ('fail-fast') do — that IS the bridge.
    const e = { title: "Guard your dependencies", summary: "Stops after repeated failures and probes recovery.", tags: ["fail-fast"] };
    expect(scoreLibraryEntry(e, "مدارشکن")).toBeGreaterThan(0);
  });

  test("empty query scores zero", () => {
    expect(scoreLibraryEntry(base, "")).toBe(0);
    expect(scoreLibraryEntry(base, "   ")).toBe(0);
  });
});
