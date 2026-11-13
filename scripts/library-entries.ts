#!/usr/bin/env bun
// TEKA NEXUS — NEXUS LIBRARY reference entries (source of truth for seeding).
//
// Every entry is authored FOR this repository (attribution is honest: no
// copied third-party snippets). `code` is the complete standalone module that
// gets published; `demo` is a self-contained script importing it as "./impl".
// scripts/library-verify.ts executes demo against code and promotes an entry
// to "verified" ONLY when the output matches expectedOutput exactly.

export type LibraryCategory =
  | "frontend" | "backend" | "fullstack" | "ai" | "api" | "database"
  | "security" | "devops" | "performance" | "patterns" | "i18n" | "web3";

export interface LibraryEntrySeed {
  slug: string;
  title: string;
  category: LibraryCategory;
  summary: string;
  language: string;
  framework: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  problem: string;
  approach: string;
  code: string;
  demo: string;
  expectedOutput: string;
  dependencies: string[];
  install: string;
  usage: string;
  securityNotes: string;
  performanceNotes: string;
  limitations: string;
  version: string;
  license: string;
  tags: string[];
  related: string[];
}

export const LIBRARY_ENTRIES: LibraryEntrySeed[] = [
  {
    slug: "token-bucket-rate-limiter",
    title: "Token bucket rate limiter (in-process)",
    category: "backend",
    summary:
      "A dependency-free token bucket that smooths bursts while allowing a sustained refill rate, with an injected clock for deterministic tests and a retryAfterSeconds() helper for Retry-After headers.",
    language: "typescript",
    framework: "none",
    difficulty: "intermediate",
    problem:
      "You need to throttle callers (API clients, cron jobs, webhook handlers) without adding a dependency. Offset-based window counters allow nasty bursts; you want a bounded burst size plus a steady refill, and you want the limiter to be unit-testable.",
    approach:
      "Classic token bucket: a counter refills continuously at refillPerSecond, capped at capacity. Each tryRemove(n) tops up the bucket lazily from elapsed time, then subtracts. The clock is injected (constructor argument) so tests can step time instead of sleeping, and retryAfterSeconds(n) converts a token deficit into seconds — directly usable in a Retry-After response header.",
    code: `// In-memory token bucket — smooths bursts while allowing a steady refill rate.
// Ideal for per-process API throttling; use a Redis/Lua bucket for fleets.
export interface TokenBucketOptions {
  capacity: number;        // max burst size
  refillPerSecond: number; // sustained rate
}

export class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private readonly opts: TokenBucketOptions,
    private readonly now: () => number = () => Date.now(), // injected clock = testable
  ) {
    this.tokens = opts.capacity;
    this.lastRefill = now();
  }

  /** Try to take n tokens. Returns false when the caller should back off. */
  tryRemove(n = 1): boolean {
    if (n > this.opts.capacity) return false; // impossible request — never wait for it
    const t = this.now();
    const elapsed = Math.max(0, t - this.lastRefill);
    this.tokens = Math.min(this.opts.capacity, this.tokens + (elapsed / 1000) * this.opts.refillPerSecond);
    this.lastRefill = t;
    if (this.tokens >= n) {
      this.tokens -= n;
      return true;
    }
    return false;
  }

  /** Seconds until n tokens are available (0 = now). Use for Retry-After. */
  retryAfterSeconds(n = 1): number {
    const deficit = n - this.tokens;
    return deficit <= 0 ? 0 : Math.ceil((deficit / this.opts.refillPerSecond) * 1000) / 1000;
  }
}`,
    demo: `import { TokenBucket } from "./impl";

// Deterministic fake clock — step time instead of sleeping.
let t = 0;
const bucket = new TokenBucket({ capacity: 3, refillPerSecond: 1 }, () => t);

console.log("burst:", [bucket.tryRemove(), bucket.tryRemove(), bucket.tryRemove(), bucket.tryRemove()].join(","));
t += 1000; // one second passes -> 1 token refilled
console.log("after 1s:", bucket.tryRemove());
console.log("immediately again:", bucket.tryRemove());
t += 3000;
console.log("after 4s total:", bucket.tryRemove(2)); // take 2 at once
console.log("retry hint:", bucket.retryAfterSeconds(2));`,
    expectedOutput: `burst: true,true,true,false
after 1s: true
immediately again: false
after 4s total: true
retry hint: 1`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const bucket = new TokenBucket({ capacity: 20, refillPerSecond: 5 });\nif (!bucket.tryRemove()) {\n  return new Response(\"Slow down\", { status: 429, headers: { \"Retry-After\": String(bucket.retryAfterSeconds()) } });\n}",
    securityNotes:
      "Keys the bucket per identity (user id, API key, IP) — never one shared bucket. Keep the bucket behind your auth layer so anonymous callers cannot exhaust a bucket meant for a known user.",
    performanceNotes:
      "O(1) per check, zero allocations on the hot path beyond the lazy refill arithmetic. No I/O — safe to call on every request in-process.",
    limitations:
      "In-memory only: each process instance has its own bucket. For multi-instance deployments coordinate via Redis (or similar) — this reference intentionally stays dependency-free.",
    version: "1.0.0",
    license: "MIT",
    tags: ["rate-limiting", "throttling", "backend", "429", "retry-after"],
    related: ["retry-backoff-jitter", "api-error-envelope"],
  },
  {
    slug: "ssrf-safe-url-guard",
    title: "SSRF-safe outbound URL guard",
    category: "security",
    summary:
      "Validates that a URL is a safe outbound destination before you fetch it: HTTP(S) only, no embedded credentials, no reserved/private IP literals (including cloud metadata ranges), optional DNS resolution to defeat hostname tricks, and an allowlist mode.",
    language: "typescript",
    framework: "none",
    difficulty: "advanced",
    problem:
      "Any server feature that fetches a user-supplied URL (webhooks, link previews, importers) is an SSRF risk: attackers point it at http://169.254.169.254/ to read cloud credentials, or at localhost services, or at private network ranges.",
    approach:
      "Validate before connecting: (1) scheme must be http/https, (2) reject URLs with embedded credentials, (3) block known metadata hostnames, (4) if the host is an IP literal, check every reserved IPv4/IPv6 range, (5) optionally resolve DNS and require every resolved address to be public — then pin the connection to the resolved IP so the validated address is the address actually used (defeats DNS rebinding). An allowlist mode locks destinations down completely.",
    code: `// SSRF guard — validates a URL is a safe outbound destination BEFORE fetching.
// Blocks non-HTTP(S) schemes, embedded credentials, and private/reserved IPs.
// With resolveDns enabled it also pins the resolved IP so callers connect to
// what they validated, closing the classic DNS-rebinding gap.
import { isIP } from "node:net";

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal", // GCP metadata service
  "instance-data",            // AWS alias on some images
]);

/** True for IPv4/IPv6 ranges that must never be fetched from a server. */
export function isReservedIp(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b, c] = ip.split(".").map(Number);
    if (a === 0 || a === 10 || a === 127) return true;   // this-network, private, loopback
    if (a === 169 && b === 254) return true;             // link-local + cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;    // private
    if (a === 192 && b === 168) return true;             // private
    if (a === 100 && b >= 64 && b <= 127) return true;   // CGNAT
    if (a === 192 && b === 0 && (c === 0 || c === 2)) return true; // proto assign / docs
    if (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) return true;
    if (a === 203 && b === 0 && c === 113) return true;  // docs
    if (a >= 224) return true;                           // multicast + reserved
    return false;
  }
  if (isIP(ip) === 6) {
    const v = ip.toLowerCase();
    if (v === "::" || v === "::1") return true;          // unspecified, loopback
    if (v.startsWith("fe8") || v.startsWith("fe9") || v.startsWith("fea") || v.startsWith("feb")) return true;
    if (v.startsWith("fc") || v.startsWith("fd")) return true;   // unique local
    if (v.startsWith("::ffff:")) return isReservedIp(v.slice(7)); // IPv4-mapped
    if (v.startsWith("2001:db8:")) return true;          // documentation
    return false;
  }
  return true; // not an IP literal — caller must resolve DNS before trusting it
}

export interface GuardOptions {
  /** Resolve hostnames and fail if any resolved address is reserved. */
  resolveDns?: boolean;
  /** Restrict destinations to these hosts (exact match, case-insensitive). */
  allowedHosts?: string[];
  /** Injected DNS for tests. Defaults to node:dns promises lookup. */
  lookup?: (host: string) => Promise<{ address: string }[]>;
}

export interface GuardedUrl {
  url: URL;
  /** When DNS was resolved: connect to THIS ip (with the Host header), not the hostname. */
  pinnedIp: string | null;
}

export async function guardOutboundUrl(raw: string, opts: GuardOptions = {}): Promise<GuardedUrl> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("invalid URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("only http/https is allowed");
  if (url.username || url.password) throw new Error("credentials in URL are not allowed");
  const host = url.hostname.toLowerCase().replace(/^\\[|\\]$/g, ""); // strip IPv6 brackets
  if (opts.allowedHosts && !opts.allowedHosts.includes(host)) throw new Error("host is not on the allowlist");
  if (BLOCKED_HOSTNAMES.has(host)) throw new Error("blocked hostname");
  if (isIP(host)) {
    if (isReservedIp(host)) throw new Error("reserved IP address");
    return { url, pinnedIp: host };
  }
  if (opts.resolveDns === false) return { url, pinnedIp: null };
  const lookup = opts.lookup ?? (await import("node:dns")).promises.lookup;
  const addrs = await lookup(host).then((r: unknown) => (Array.isArray(r) ? r : [r]) as { address: string }[]);
  for (const a of addrs) {
    if (isReservedIp(a.address)) throw new Error("hostname resolves to a reserved address");
  }
  return { url, pinnedIp: addrs[0]?.address ?? null };
}`,
    demo: `import { guardOutboundUrl, isReservedIp } from "./impl";

const attempts = [
  "https://example.com/",                     // fine
  "http://localhost/admin",                   // blocked hostname
  "http://127.0.0.1/.env",                    // loopback literal
  "http://169.254.169.254/latest/meta-data/", // cloud metadata
  "http://10.0.0.5/internal",                 // private range
  "https://user:pass@example.com/",           // embedded credentials
  "file:///etc/passwd",                       // non-http scheme
  "http://[::1]/health",                      // IPv6 loopback
];
for (const u of attempts) {
  try {
    const g = await guardOutboundUrl(u, { resolveDns: false });
    console.log("ALLOW", g.url.host);
  } catch (e) {
    console.log("BLOCK", (e as Error).message);
  }
}
console.log("reserved 100.64.1.1:", isReservedIp("100.64.1.1"));
console.log("reserved 8.8.8.8:", isReservedIp("8.8.8.8"));`,
    expectedOutput: `ALLOW example.com
BLOCK blocked hostname
BLOCK reserved IP address
BLOCK reserved IP address
BLOCK reserved IP address
BLOCK credentials in URL are not allowed
BLOCK only http/https is allowed
BLOCK reserved IP address
reserved 100.64.1.1: true
reserved 8.8.8.8: false`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const g = await guardOutboundUrl(userUrl, { resolveDns: true, allowedHosts: webhookHosts });\n// fetch with the PINNED ip and set the Host header manually:\nconst res = await fetch(g.url.protocol + \"//\" + (g.pinnedIp ?? g.url.host) + g.url.pathname, {\n  headers: { Host: g.url.host },\n});",
    securityNotes:
      "This guard is a gate, not a sandbox: also re-validate on every redirect hop (fetch follows redirects automatically — set redirect: \"manual\" and loop), keep egress on an isolated network where possible, and never run it with resolveDns disabled for attacker-controlled hostnames. The demo uses resolveDns:false only because tests must run without network.",
    performanceNotes:
      "Pure string/number checks for IP literals. With DNS resolution enabled the cost is one lookup per unique hostname — memoize per host if you fetch the same destinations repeatedly.",
    limitations:
      "Range list covers standard reservations (RFC 1918/4193/6598, link-local, loopback, metadata, docs, multicast). Zero-permission guarantees require network-level egress control. Non-standard port probing of allowed hosts is still possible — combine with an egress firewall.",
    version: "1.0.0",
    license: "MIT",
    tags: ["ssrf", "security", "webhooks", "fetch", "metadata", "dns-rebinding"],
    related: ["retry-backoff-jitter", "api-error-envelope"],
  },
  {
    slug: "hmac-api-key-rotation",
    title: "HMAC request signing with a rotation window",
    category: "security",
    summary:
      "Issue API keys, sign requests with HMAC-SHA256 over a canonical string (method, path, body hash, timestamp), verify in constant time, and rotate a compromised key while previously-signed requests stay verifiable until the grace window closes.",
    language: "typescript",
    framework: "none",
    difficulty: "intermediate",
    problem:
      "Static API keys cannot be rotated safely: the moment you swap the secret, every in-flight request signed with the old key fails. You need signing that binds method/path/body/timestamp, plus a rotation window that tolerates the old secret for a bounded period.",
    approach:
      "Canonical signing string: METHOD\\nPATH\\nBODY_SHA256\\nTIMESTAMP, signed with HMAC-SHA256 and encoded base64url. Verification uses timingSafeEqual with a length guard. A RotationWindow keeps the current secret plus the retired one with a timestamp; verification tries current first, then the retired secret while now - retiredAt <= graceSeconds. The clock is injected so the demo is deterministic.",
    code: `// HMAC request signing with a rotation window: a leaked key can be rotated
// while previously-signed requests stay verifiable until the grace period ends.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export interface IssuedKey {
  keyId: string;
  secret: string;
}

export function issueKey(prefix = "tek"): IssuedKey {
  return {
    keyId: prefix + "_" + randomBytes(8).toString("hex"),
    secret: randomBytes(32).toString("base64url"),
  };
}

export interface SigningParts {
  method: string;
  path: string;
  bodyHash?: string;
  timestamp: number; // unix seconds
}

/** Signature covers method + path + body hash + timestamp (replay protection). */
export function signRequest(secret: string, parts: SigningParts): string {
  const canonical = [parts.method.toUpperCase(), parts.path, parts.bodyHash ?? "", String(parts.timestamp)].join("\\n");
  return createHmac("sha256", secret).update(canonical).digest("base64url");
}

export function verifySignature(secret: string, signature: string, parts: SigningParts): boolean {
  const expected = signRequest(secret, parts);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b); // constant-time compare
}

/** Holds the active secret plus the retired one inside a grace window. */
export class RotationWindow {
  private current: IssuedKey;
  private previous: { key: IssuedKey; retiredAt: number } | null = null;

  constructor(
    initial: IssuedKey,
    private readonly graceSeconds: number,
    private readonly now: () => number = () => Math.floor(Date.now() / 1000),
  ) {
    this.current = initial;
  }

  rotate(): IssuedKey {
    this.previous = { key: this.current, retiredAt: this.now() };
    this.current = issueKey();
    return this.current;
  }

  /** Verify against the active secret, then the retired one within grace. */
  verify(signature: string, parts: SigningParts): boolean {
    if (verifySignature(this.current.secret, signature, parts)) return true;
    if (this.previous && this.now() - this.previous.retiredAt <= this.graceSeconds) {
      return verifySignature(this.previous.key.secret, signature, parts);
    }
    return false;
  }
}`,
    demo: `import { issueKey, signRequest, RotationWindow } from "./impl";

// The clock moves; a signed request's parts stay frozen — that is the point:
// rotation is verified against wall-clock time, not the request timestamp.
let t = 1700000000;
const parts = { method: "POST", path: "/api/orders", bodyHash: "abc123", timestamp: t };
const first = issueKey();
const win = new RotationWindow(first, 60, () => t);

const sig = signRequest(first.secret, parts);
console.log("valid signature:", win.verify(sig, parts));
console.log("tampered body:", win.verify(signRequest(first.secret, { ...parts, bodyHash: "evil" }), parts));
console.log("wrong timestamp:", win.verify(signRequest(first.secret, { ...parts, timestamp: t + 999 }), parts));

const next = win.rotate();
t += 30; // inside the 60s grace window — the old signature still verifies
console.log("old key during grace:", win.verify(sig, parts));
t += 120; // grace over
console.log("old key after grace:", win.verify(sig, parts));
console.log("new key accepted:", win.verify(signRequest(next.secret, parts), parts));`,
    expectedOutput: `valid signature: true
tampered body: false
wrong timestamp: false
old key during grace: true
old key after grace: false
new key accepted: true`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "// server: keep { keyId -> RotationWindow } in your key store\nconst parts = { method: req.method, path: req.url, bodyHash: sha256Hex(body), timestamp: Number(headers[\"x-timestamp\"]) };\nif (!win.verify(headers[\"x-signature\"], parts)) return reject(401);",
    securityNotes:
      "Timestamp skew: enforce a max age server-side (e.g. reject timestamps older than 5 minutes) on top of signing, otherwise old signatures replay forever. Body hash must be computed over the RAW request bytes. Never log secrets. timingSafeEqual prevents timing oracles on signature comparison.",
    performanceNotes:
      "HMAC-SHA256 is microsecond-scale; verification is two hashes in the worst case (current + retired secret).",
    limitations:
      "Single-previous-secret rotation. For overlapping multi-key fleets (several valid keys at once) store windows per key in your database — this reference keeps the state machine dependency-free and in-memory.",
    version: "1.0.0",
    license: "MIT",
    tags: ["hmac", "api-keys", "authentication", "rotation", "signing", "webhooks"],
    related: ["api-error-envelope", "scrypt-password-hashing"],
  },
  {
    slug: "api-error-envelope",
    title: "Consistent API success/error envelope",
    category: "api",
    summary:
      "One response contract for JSON APIs: { ok: true, data, meta } for success and { ok: false, error: { code, message, details } } for failure, with machine-readable error codes mapped to HTTP statuses and zero internal-detail leakage.",
    language: "typescript",
    framework: "none",
    difficulty: "beginner",
    problem:
      "APIs that mix response shapes force every client (and every AI agent) to guess how to parse results. Stack traces, SQL fragments, and file paths leak through naive error handling; error codes exist only in prose.",
    approach:
      "An AppError carries a stable code (unauthorized, not_found, rate_limited, ...). errorEnvelope maps known codes to HTTP statuses and, for unknown errors, returns a fixed generic message — the internal error is logged server-side, never serialized. A successEnvelope mirrors it for happy paths. Clients branch on ok and switch on error.code.",
    code: `// A single error/response contract for JSON APIs: machine-readable codes,
// human messages, and zero accidental information leaks.
export interface ApiErrorBody {
  ok: false;
  error: { code: string; message: string; details?: unknown };
}
export interface ApiSuccessBody<T> {
  ok: true;
  data: T;
  meta?: Record<string, unknown>;
}

const HTTP_STATUS: Record<string, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  unprocessable: 422,
  rate_limited: 429,
  internal: 500,
};

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
  get status(): number {
    return HTTP_STATUS[this.code] ?? 500;
  }
}

export function successEnvelope<T>(data: T, meta?: Record<string, unknown>): ApiSuccessBody<T> {
  return meta ? { ok: true, data, meta } : { ok: true, data };
}

export function errorEnvelope(err: unknown): { status: number; body: ApiErrorBody } {
  if (err instanceof AppError) {
    return {
      status: err.status,
      body: { ok: false, error: { code: err.code, message: err.message, details: err.details } },
    };
  }
  // Unknown errors must not leak internals (stack traces, SQL, file paths).
  return { status: 500, body: { ok: false, error: { code: "internal", message: "Something went wrong." } } };
}`,
    demo: `import { AppError, successEnvelope, errorEnvelope } from "./impl";

console.log(JSON.stringify(successEnvelope({ id: 7 }, { total: 42 })));
const notFound = errorEnvelope(new AppError("not_found", "No such widget."));
console.log(notFound.status, JSON.stringify(notFound.body));
const boom = errorEnvelope(new Error("ECONNREFUSED 10.0.0.12:5432 - internal detail"));
console.log(boom.status, JSON.stringify(boom.body));
console.log("bad_request status:", new AppError("bad_request", "x").status);
console.log("unknown code status:", new AppError("weird_code", "x").status);`,
    expectedOutput: `{"ok":true,"data":{"id":7},"meta":{"total":42}}
404 {"ok":false,"error":{"code":"not_found","message":"No such widget."}}
500 {"ok":false,"error":{"code":"internal","message":"Something went wrong."}}
bad_request status: 400
unknown code status: 500`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "try {\n  return json(successEnvelope(result, { total }));\n} catch (err) {\n  const { status, body } = errorEnvelope(err);\n  console.error(\"[api]\", err); // log server-side\n  return json(body, status);\n}",
    securityNotes:
      "The unknown-error branch is the point: it guarantees stack traces and driver messages never reach clients. Put allow-listed details into AppError.details explicitly instead.",
    performanceNotes: "Plain object construction — negligible overhead per response.",
    limitations:
      "Deliberately minimal. Validation-shaped errors (field paths) fit naturally into details; larger APIs may want error code registries with documentation links.",
    version: "1.0.0",
    license: "MIT",
    tags: ["api-design", "errors", "envelope", "contracts"],
    related: ["token-bucket-rate-limiter", "cursor-pagination"],
  },
  {
    slug: "cursor-pagination",
    title: "Stable cursor pagination",
    category: "database",
    summary:
      "Keyset pagination over a (createdAt, id) composite cursor with base64url encoding: rows inserted between page requests can never cause duplicates or skipped rows, unlike LIMIT/OFFSET.",
    language: "typescript",
    framework: "none",
    difficulty: "intermediate",
    problem:
      "OFFSET pagination breaks under concurrent writes: a row inserted between page fetches shifts the window, so clients see duplicates or miss rows. Feeds, admin tables, and API list endpoints all need stable pages.",
    approach:
      "Cursor = base64url JSON of the last row's (createdAt, id). Each page filters rows strictly AFTER the cursor using the composite ordering, takes limit+1 rows to detect hasMore without a count query, and emits the next cursor from the last emitted row. The same predicate translates 1:1 into SQL WHERE clauses.",
    code: `// Stable cursor pagination over (createdAt, id): rows inserted between pages
// can never cause duplicates or skipped rows, unlike LIMIT/OFFSET.
export interface CursorRow {
  createdAt: string; // ISO string — lexicographic order = chronological
  id: string;
}

export function encodeCursor(row: CursorRow): string {
  return Buffer.from(JSON.stringify({ c: row.createdAt, i: row.id }), "utf8").toString("base64url");
}

export function decodeCursor(cursor: string): CursorRow | null {
  try {
    const raw = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as Record<string, unknown>;
    if (typeof raw?.c === "string" && typeof raw?.i === "string") return { createdAt: raw.c, id: raw.i };
  } catch {
    // fall through — a bad cursor is just "start from the beginning"
  }
  return null;
}

function afterCursor(row: CursorRow, cur: CursorRow): boolean {
  return row.createdAt > cur.createdAt || (row.createdAt === cur.createdAt && row.id > cur.id);
}

export function paginate<T extends CursorRow>(
  rows: T[],
  cursor: string | null,
  limit: number,
): { items: T[]; nextCursor: string | null; hasMore: boolean } {
  const cur = cursor ? decodeCursor(cursor) : null;
  const filtered = cur ? rows.filter((r) => afterCursor(r, cur)) : rows;
  const items = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;
  const last = items[items.length - 1];
  return { items, nextCursor: hasMore && last ? encodeCursor(last) : null, hasMore };
}`,
    demo: `import { paginate } from "./impl";

const rows = Array.from({ length: 25 }, (_, i) => ({
  id: "row_" + String(i).padStart(2, "0"),
  createdAt: "2026-01-0" + (1 + Math.floor(i / 10)) + "T00:00:00Z",
}));
let cursor: string | null = null;
let seen = 0;
let pages = 0;
do {
  const page = paginate(rows, cursor, 10);
  seen += page.items.length;
  pages++;
  console.log("page", pages, "items:", page.items.length, "hasMore:", page.hasMore);
  cursor = page.nextCursor;
} while (cursor);

// A row inserted "in the past" between pages must not duplicate or skip anything.
rows.push({ id: "row_new", createdAt: "2026-01-02T00:00:00Z" });
const page1 = paginate(rows, null, 10);
const page2 = paginate(rows, page1.nextCursor, 25);
const ids = new Set([...page1.items, ...page2.items].map((r) => r.id));
console.log("unique rows after insert:", ids.size);`,
    expectedOutput: `page 1 items: 10 hasMore: true
page 2 items: 10 hasMore: true
page 3 items: 5 hasMore: false
unique rows after insert: 26`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "// Prisma: translate the cursor into a composite WHERE\nconst rows = await db.post.findMany({\n  where: cursor ? { OR: [\n    { createdAt: { gt: cur.createdAt } },\n    { createdAt: cur.createdAt, id: { gt: cur.id } },\n  ] } : {},\n  orderBy: [{ createdAt: \"asc\" }, { id: \"asc\" }],\n  take: limit + 1,\n});",
    securityNotes:
      "The cursor is not signed — treat it as untrusted input and validate the decoded shape (decodeCursor does). Never encode authorization state into cursors.",
    performanceNotes:
      "Keyset pagination keeps O(log n) index lookups instead of OFFSET scanning skipped rows. Index (createdAt, id) — the composite order matters.",
    limitations:
      "Requires a stable total order (createdAt alone is not unique — hence the id tiebreaker). Moving backwards through pages needs a mirrored (before) cursor, which this minimal reference omits.",
    version: "1.0.0",
    license: "MIT",
    tags: ["pagination", "database", "keyset", "feeds", "prisma"],
    related: ["api-error-envelope"],
  },
  {
    slug: "safe-json-from-llm",
    title: "Extract structured JSON from LLM output",
    category: "ai",
    summary:
      "Pulls the first balanced JSON object or array out of free-form model output: handles markdown fences, prose around the payload, and braces inside strings — and reports honest failures instead of throwing.",
    language: "typescript",
    framework: "none",
    difficulty: "beginner",
    problem:
      "LLMs wrap JSON in prose and markdown fences, and naive regex extraction breaks on strings that contain braces. Downstream code needs either a parsed value or a clear failure — never a raw exception mid-pipeline.",
    approach:
      "Prefer fenced blocks when present; otherwise scan for the first '{' or '['. A string-aware balanced scanner tracks quotes and escapes so braces inside string values do not confuse the depth count, then JSON.parse validates strictly. Every failure path returns a typed { ok: false, error } instead of throwing.",
    code: `// Extract the first balanced JSON value from free-form LLM output: handles
// markdown fences, prose around the payload, and braces inside strings.
export type ExtractResult<T = unknown> = { ok: true; value: T } | { ok: false; error: string };

export function extractJson<T = unknown>(text: string): ExtractResult<T> {
  const fenced = text.match(/\`\`\`(?:json)?\\s*([\\s\\S]*?)\`\`\`/i);
  const candidates = fenced ? [fenced[1]] : [text];
  for (const c of candidates) {
    const start = c.search(/[{[]/);
    if (start === -1) continue;
    const end = balancedEnd(c, start);
    if (end === null) continue;
    try {
      return { ok: true, value: JSON.parse(c.slice(start, end)) as T };
    } catch (e) {
      return { ok: false, error: "found JSON but it does not parse: " + (e as Error).message };
    }
  }
  return { ok: false, error: "no JSON object or array found in the text" };
}

/** End index (exclusive) of the balanced structure starting at start, or null. */
function balancedEnd(s: string, start: number): number | null {
  const open = s[start];
  const close = open === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < s.length; i++) {
    const ch = s[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return null;
}`,
    demo: `import { extractJson } from "./impl";

const samples = [
  'Sure! \`\`\`json\\n{"city": "Tehran", "temp": 31}\\n\`\`\` hope that helps',
  'The answer is {"a": {"deep": [1, 2]}, "b": "brace } inside string"} and trailing text',
  "[1, 2, 3]",
  "no structured data here at all",
  '{"broken": [1, 2',
];
for (const s of samples) {
  const r = extractJson(s);
  console.log(r.ok ? "OK " + JSON.stringify(r.value) : "FAIL " + r.error);
}`,
    expectedOutput: `OK {"city":"Tehran","temp":31}
OK {"a":{"deep":[1,2]},"b":"brace } inside string"}
OK [1,2,3]
FAIL no JSON object or array found in the text
FAIL no JSON object or array found in the text`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const r = extractJson<MyShape>(llmText);\nif (!r.ok) return retryWithStrictJsonMode();\nuse(r.value);",
    securityNotes:
      "JSON.parse is safe (no code execution), but the PARSED VALUE is still model output: validate its shape with a schema before trusting fields, and cap the input size before scanning.",
    performanceNotes: "Single left-to-right scan, O(n). No regex backtracking on the hot path.",
    limitations:
      "Strict JSON only — trailing commas, comments, and single quotes are reported as parse failures on purpose (fix the prompt or post-process deliberately rather than silently accepting malformed data). Multiple JSON blocks: only the first is extracted.",
    version: "1.0.0",
    license: "MIT",
    tags: ["llm", "json", "parsing", "ai-pipelines"],
    related: ["api-error-envelope"],
  },
  {
    slug: "retry-backoff-jitter",
    title: "Fetch retry with exponential backoff and full jitter",
    category: "performance",
    summary:
      "Wraps fetch with bounded retries, exponential backoff with full jitter, Retry-After support, and idempotent-method defaults — with injectable sleep, jitter, and retry-decision for deterministic tests.",
    language: "typescript",
    framework: "none",
    difficulty: "intermediate",
    problem:
      "Transient 5xx/429s and network blips fail pipelines that have no retry policy — or stampede services when every client retries in lockstep without jitter. POSTs must not auto-retry (duplicate side effects).",
    approach:
      "Retry only when the decision function says so: network errors always, 429/5xx for idempotent requests. Delay = min(maxMs, baseMs * 2^attempt) scaled by full jitter (uniform in [0, ceiling)) to spread concurrent callers; an explicit Retry-After header wins when present. sleep, jitter and the decision are injectable, so the demo proves the exact attempt count and delays with zero real waiting.",
    code: `// Fetch with retries: exponential backoff + full jitter, Retry-After aware,
// idempotent-by-default so POSTs never duplicate accidentally.
export interface RetryOptions {
  retries?: number; // extra attempts after the first (default 2)
  baseMs?: number;  // first backoff ceiling (default 400)
  maxMs?: number;   // backoff ceiling (default 8000)
  retryOn?: (attempt: number, res: Response | null, err: unknown) => boolean;
  sleep?: (ms: number) => Promise<void>; // injectable for tests
  jitter?: () => number;                 // injectable for tests (default Math.random)
}

const DEFAULT_RETRY_ON = (attempt: number, res: Response | null) => {
  if (res) return res.status === 429 || res.status >= 500;
  return true; // network errors are always worth one more try
};

export async function fetchWithRetry(
  input: string,
  init: RequestInit | undefined,
  opts: RetryOptions = {},
): Promise<{ res: Response | null; attempts: number }> {
  const retries = opts.retries ?? 2;
  const baseMs = opts.baseMs ?? 400;
  const maxMs = opts.maxMs ?? 8000;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
  const jitter = opts.jitter ?? Math.random;
  const retryOn = opts.retryOn ?? DEFAULT_RETRY_ON;
  let lastRes: Response | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    let res: Response | null = null;
    let networkError: unknown = null;
    try {
      res = await fetch(input, init);
    } catch (err) {
      networkError = err;
    }
    const shouldRetry = attempt < retries && retryOn(attempt, res, networkError);
    if (!shouldRetry) {
      if (networkError) throw networkError;
      return { res, attempts: attempt + 1 };
    }
    await sleep(delayFor(attempt, res, baseMs, maxMs, jitter));
  }
  return { res: lastRes, attempts: retries + 1 };
}

function delayFor(attempt: number, res: Response | null, baseMs: number, maxMs: number, jitter: () => number): number {
  const retryAfter = res?.headers.get("retry-after");
  if (retryAfter) {
    const secs = Number(retryAfter);
    if (!Number.isNaN(secs)) return Math.min(secs * 1000, maxMs);
  }
  const ceiling = Math.min(maxMs, baseMs * 2 ** attempt);
  return Math.floor(jitter() * ceiling); // full jitter spreads concurrent callers
}`,
    demo: `import { fetchWithRetry } from "./impl";

const sleepLog: number[] = [];
const fakeSleep = (ms: number) => {
  sleepLog.push(ms);
  return Promise.resolve();
};
const statuses = [500, 429, 200];
let call = 0;
const fakeFetch = (() => {
  const s = statuses[call++];
  return Promise.resolve(
    new Response(null, { status: s, headers: s === 429 ? { "retry-after": "2" } : {} }),
  );
}) as unknown as typeof fetch;

const saved = globalThis.fetch;
(globalThis as unknown as { fetch: typeof fetch }).fetch = fakeFetch;
const { res, attempts } = await fetchWithRetry("https://api.example.com/x", undefined, {
  retries: 3,
  baseMs: 500,
  maxMs: 5000,
  sleep: fakeSleep,
  jitter: () => 0.5, // deterministic jitter for the demo
});
(globalThis as unknown as { fetch: typeof fetch }).fetch = saved;
console.log("attempts:", attempts);
console.log("final status:", res!.status);
console.log("delays:", sleepLog.join(","));`,
    expectedOutput: `attempts: 3
final status: 200
delays: 250,2000`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const { res } = await fetchWithRetry(url, { method: \"GET\" }, { retries: 3 });\n// POSTs stay single-shot unless you explicitly opt in:\nawait fetchWithRetry(url, { method: \"POST\" }, { retryOn: (a, r) => r?.status === 429 });",
    securityNotes:
      "Retry loops multiply request cost — cap retries and honor Retry-After so you do not turn an outage into a self-inflicted DDoS. Never auto-retry non-idempotent methods by default.",
    performanceNotes:
      "Full jitter (uniform over the backoff window) is the AWS-recommended strategy for correlated failures: it desynchronizes callers better than equal jitter.",
    limitations:
      "Does not deduplicate concurrent identical calls (that needs memoization/request coalescing) and does not circuit-break (pair it with the circuit breaker reference).",
    version: "1.0.0",
    license: "MIT",
    tags: ["retry", "backoff", "jitter", "fetch", "resilience", "429"],
    related: ["token-bucket-rate-limiter", "circuit-breaker"],
  },
  {
    slug: "i18n-fallback-dictionary",
    title: "i18n dictionary lookup with locale fallback",
    category: "i18n",
    summary:
      "Dot-path translation lookup across a locale chain with an English/base fallback, {param} interpolation, and a path-echo guard so users never see the string 'undefined'. This is the exact pattern TEKA NEXUS ships for its seven locales.",
    language: "typescript",
    framework: "none",
    difficulty: "beginner",
    problem:
      "Partial translations are the normal state of any multi-locale product: a dictionary missing one key must fall back to the base language instead of rendering 'undefined' or crashing.",
    approach:
      "Resolve a dot path by walking nested objects; try each locale dictionary in order, then the base dictionary, then echo the path itself (which makes missing keys visible in review). Params interpolate with {name} placeholders via replaceAll — the same contract used in TEKA NEXUS production code.",
    code: `// Dot-path dictionary lookup with locale fallback + {param} interpolation —
// the same pattern TEKA NEXUS ships in production for seven locales.
type Dict = Record<string, unknown>;

function lookup(dict: Dict, path: string): string | undefined {
  let cur: unknown = dict;
  for (const part of path.split(".")) {
    if (cur && typeof cur === "object" && part in (cur as Dict)) {
      cur = (cur as Dict)[part];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

export function makeT(fallback: Dict, ...locales: Dict[]) {
  return (path: string, params?: Record<string, string | number>): string => {
    let raw: string | undefined;
    for (const d of locales) {
      raw = lookup(d, path);
      if (raw !== undefined) break;
    }
    if (raw === undefined) raw = lookup(fallback, path);
    if (raw === undefined) return path; // never render "undefined" to users
    if (!params) return raw;
    let out = raw;
    for (const [k, v] of Object.entries(params)) {
      out = out.replaceAll("{" + k + "}", String(v));
    }
    return out;
  };
}`,
    demo: `import { makeT } from "./impl";

const en = { nav: { home: "Home", welcome: "Welcome back, {name}!" } };
const fa = { nav: { home: "خانه" } };
const t = makeT(en, fa);
console.log(t("nav.home"));
console.log(t("nav.welcome", { name: "Sadeghi" }));
console.log(t("nav.missing.key"));`,
    expectedOutput: `خانه
Welcome back, Sadeghi!
nav.missing.key`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const t = makeT(enDictionary, faDictionary, ruDictionary);\n<t>{t(\"projects.cta.join\", { count: teamSize })}</t>",
    securityNotes:
      "Dictionaries are code — review translated strings like code changes (they can inject markup in HTML-rendering apps). Escape or restrict params interpolated into HTML contexts.",
    performanceNotes: "Path resolution is O(depth); memoize the bound t() per locale (as useT does) rather than per call.",
    limitations:
      "Pluralization and Intl.MessageFormat-style rich formatting are out of scope for this minimal reference; layer them on top for languages with complex plural rules.",
    version: "1.0.0",
    license: "MIT",
    tags: ["i18n", "localization", "translation", "fallback", "rtl"],
    related: ["api-error-envelope"],
  },
  {
    slug: "circuit-breaker",
    title: "Circuit breaker with half-open probing",
    category: "performance",
    summary:
      "Stops hammering a failing dependency: after N consecutive failures the circuit opens and calls fail fast with a retry hint, one probe passes after the cooldown, and full recovery requires a successful probe — with an injected clock for deterministic tests.",
    language: "typescript",
    framework: "none",
    difficulty: "advanced",
    problem:
      "Retrying a dependency that is down multiplies your own latency and load. Callers need to fail fast (with a clear error), give the dependency room to recover, and recover automatically once it is healthy again.",
    approach:
      "Three states: closed (normal, count consecutive failures), open (reject immediately with CircuitOpenError carrying retryInMs), halfOpen (after cooldown, allow exactly one probe; success resets the circuit, failure re-opens). The clock is injected; the in-flight probe flag prevents a thundering herd of half-open probes.",
    code: `// Circuit breaker: fail fast while a dependency is down, probe gently after
// a cooldown, and only fully recover once a probe succeeds.
export type CircuitState = "closed" | "open" | "halfOpen";

export class CircuitOpenError extends Error {
  constructor(public retryInMs: number) {
    super("circuit is open");
  }
}

export class CircuitBreaker {
  // NOTE: the backing field must NOT be named "state" — a field sharing a name
  // with the getter would shadow it (own property wins) and the half-open
  // transition would silently never fire. Caught by this entry's own demo.
  private currentState: CircuitState = "closed";
  private failures = 0;
  private openedAt = 0;
  private probing = false;

  constructor(
    private readonly failureThreshold: number,
    private readonly cooldownMs: number,
    private readonly now: () => number = () => Date.now(),
  ) {}

  get state(): CircuitState {
    if (this.currentState === "open" && this.now() - this.openedAt >= this.cooldownMs) return "halfOpen";
    return this.currentState;
  }

  async exec<T>(fn: () => Promise<T>): Promise<T> {
    const s = this.state;
    if (s === "open") {
      throw new CircuitOpenError(this.cooldownMs - (this.now() - this.openedAt));
    }
    if (s === "halfOpen") {
      if (this.probing) throw new CircuitOpenError(this.cooldownMs);
      this.probing = true;
      try {
        const out = await fn();
        this.reset();
        return out;
      } catch (err) {
        this.trip();
        throw err;
      } finally {
        this.probing = false;
      }
    }
    try {
      const out = await fn();
      this.reset();
      return out;
    } catch (err) {
      this.failures++;
      if (this.failures >= this.failureThreshold) this.trip();
      throw err;
    }
  }

  private trip(): void {
    this.currentState = "open";
    this.openedAt = this.now();
    this.probing = false;
  }

  private reset(): void {
    this.currentState = "closed";
    this.failures = 0;
    this.openedAt = 0;
  }
}`,
    demo: `import { CircuitBreaker } from "./impl";

let t = 0;
const breaker = new CircuitBreaker(3, 1000, () => t);
const alwaysFail = () => Promise.reject(new Error("dependency down"));

for (let i = 0; i < 3; i++) {
  await breaker.exec(alwaysFail).catch(() => console.log("call", i + 1, "-> failed"));
}
console.log("state after 3 failures:", breaker.state);
await breaker.exec(alwaysFail).catch((e) => console.log("fast fail:", e.message));
t += 1500; // cooldown passed -> one probe allowed
await breaker.exec(alwaysFail).catch(() => console.log("probe failed -> reopen"));
console.log("state after failed probe:", breaker.state);
t += 1500;
await breaker.exec(() => Promise.resolve("recovered")).then((v) => console.log("probe result:", v));
console.log("final state:", breaker.state);`,
    expectedOutput: `call 1 -> failed
call 2 -> failed
call 3 -> failed
state after 3 failures: open
fast fail: circuit is open
probe failed -> reopen
state after failed probe: open
probe result: recovered
final state: closed`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const breaker = new CircuitBreaker(5, 30_000);\nconst data = await breaker.exec(() => fetchPartnerApi()); // throws CircuitOpenError while down",
    securityNotes:
      "Do not expose breaker state transitions in user-facing messages beyond a generic 'temporarily unavailable' — internal dependency names are recon data.",
    performanceNotes:
      "While open, calls cost zero I/O — the point of the pattern. Pair with retry-with-jitter in the recovery path so probes do not stampede.",
    limitations:
      "Counts consecutive failures only (no sliding-window failure ratio). In-process state: for multi-instance fleets, share state or accept per-instance circuits.",
    version: "1.0.0",
    license: "MIT",
    tags: ["circuit-breaker", "resilience", "fail-fast", "dependencies"],
    related: ["retry-backoff-jitter", "token-bucket-rate-limiter"],
  },
  {
    slug: "debounce-with-cancel",
    title: "Debounce with injectable timers and cancel()",
    category: "frontend",
    summary:
      "A production-shaped debounce (trailing call, optional leading edge, cancel()) whose timers are injectable, so tests can step time deterministically and SSR code can run without real timers.",
    language: "typescript",
    framework: "none",
    difficulty: "beginner",
    problem:
      "Search-as-you-type fires a request per keystroke. Naive debounces are untestable (real sleeps in CI) and cannot cancel a pending trailing call when a component unmounts or a new value supersedes it.",
    approach:
      "Track the pending timer; each call clears and re-arms it. The leading option fires once immediately at the start of a burst. setTimeout/clearTimeout are injectable — the demo steps a fake clock, asserting exactly one trailing call fires with the LAST arguments and that cancel() suppresses it.",
    code: `// Debounce with injectable timer + cancel(), so tests and SSR code can step
// time deterministically instead of sleeping real milliseconds.
export interface DebounceOptions {
  leading?: boolean; // fire once immediately at the start of a burst
  setTimeoutImpl?: typeof setTimeout;
  clearTimeoutImpl?: typeof clearTimeout;
}

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  waitMs: number,
  opts: DebounceOptions = {},
): ((...args: A) => void) & { cancel: () => void } {
  const setT = opts.setTimeoutImpl ?? setTimeout;
  const clearT = opts.clearTimeoutImpl ?? clearTimeout;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const wrapped = (...args: A): void => {
    if (opts.leading && timer === undefined) fn(...args);
    if (timer !== undefined) clearT(timer);
    timer = setT(() => {
      timer = undefined;
      fn(...args);
    }, waitMs);
  };

  wrapped.cancel = () => {
    if (timer !== undefined) clearT(timer);
    timer = undefined;
  };
  return wrapped;
}`,
    demo: `import { debounce } from "./impl";

let now = 0;
let nextId = 1;
const pending: { id: number; at: number; fn: () => void }[] = [];
const fakeSet = ((fn: () => void, ms: number) => {
  const id = nextId++;
  pending.push({ id, at: now + (ms as number), fn });
  return id as unknown as ReturnType<typeof setTimeout>;
}) as typeof setTimeout;
const fakeClear = ((id: unknown) => {
  const i = pending.findIndex((p) => p.id === id);
  if (i >= 0) pending.splice(i, 1);
}) as typeof clearTimeout;
const tick = (ms: number) => {
  now += ms;
  for (const p of [...pending]) {
    if (p.at <= now) {
      const i = pending.indexOf(p);
      if (i >= 0) pending.splice(i, 1);
      p.fn();
    }
  }
};

let calls = 0;
const search = debounce(
  (q: string) => {
    calls++;
    console.log("searched:", q, "at", now);
  },
  300,
  { setTimeoutImpl: fakeSet, clearTimeoutImpl: fakeClear },
);

search("h");
tick(100);
search("ha");
tick(100);
search("hak");
tick(100);
search("haki");
tick(350);
console.log("total calls:", calls);
search("x");
search.cancel();
tick(1000);
console.log("after cancel, calls still:", calls);`,
    expectedOutput: `searched: haki at 650
total calls: 1
after cancel, calls still: 1`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const runSearch = debounce((q: string) => fetchSuggestions(q), 300);\ninput.addEventListener(\"input\", (e) => runSearch(e.currentTarget.value));\nonCleanup(() => runSearch.cancel());",
    securityNotes: "Debounced handlers still run — validate their inputs like any other code path; debouncing is not input validation.",
    performanceNotes: "O(1) per call. Call cancel() on component unmount to avoid acting on stale state after navigation.",
    limitations:
      "Trailing-only by default (leading optional). For streaming inputs that need per-interval guarantees (not per-burst), use throttle instead.",
    version: "1.0.0",
    license: "MIT",
    tags: ["debounce", "frontend", "search", "timers", "testing"],
    related: ["i18n-fallback-dictionary"],
  },
  {
    slug: "scrypt-password-hashing",
    title: "Password hashing with scrypt (zero dependencies)",
    category: "security",
    summary:
      "Hash and verify passwords with node:crypto scrypt: per-hash random salt, self-describing parameter format (algorithm agility), constant-time verification, and malformed-input handling that returns false instead of throwing.",
    language: "typescript",
    framework: "none",
    difficulty: "intermediate",
    problem:
      "Password storage needs a memory-hard KDF with per-hash salts and upgradeable parameters — but most snippets hardcode parameters and throw on malformed stored hashes, which crashes login for corrupt rows.",
    approach:
      "Format: scrypt$N=...,r=...,p=...$saltB64url$hashB64url. The embedded parameters let you raise N later and re-hash on next successful login (needsRehash pattern) without breaking old hashes. Verification parses defensively and compares with timingSafeEqual. scrypt is memory-hard, which GPU/ASIC cracking hates.",
    code: `// Password hashing with node:crypto scrypt — no dependencies, per-hash salt,
// self-describing format so parameters can evolve without breaking old hashes.
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: Buffer,
  keylen: number,
  opts: { N: number; r: number; p: number },
) => Promise<Buffer>;

const PARAMS = { N: 16384, r: 8, p: 1 }; // OWASP-recommended baseline
const KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, KEYLEN, PARAMS);
  return (
    "scrypt" +
    "$N=" + PARAMS.N + ",r=" + PARAMS.r + ",p=" + PARAMS.p +
    "$" + salt.toString("base64url") +
    "$" + key.toString("base64url")
  );
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "scrypt") return false; // never throw on malformed input
  const params = Object.fromEntries(parts[1].split(",").map((kv) => kv.split("=") as [string, string]));
  const N = Number(params.N);
  const r = Number(params.r);
  const p = Number(params.p);
  if (!N || !r || !p) return false;
  try {
    const salt = Buffer.from(parts[2], "base64url");
    const expected = Buffer.from(parts[3], "base64url");
    const actual = await scrypt(password, salt, expected.length, { N, r, p });
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}`,
    demo: `import { hashPassword, verifyPassword } from "./impl";

const stored = await hashPassword("correct horse battery staple");
console.log("format prefix:", stored.split("$")[0], "| params:", stored.split("$")[1]);
console.log("correct password:", await verifyPassword("correct horse battery staple", stored));
console.log("wrong password:", await verifyPassword("password123", stored));
console.log("malformed stored:", await verifyPassword("x", "not-a-hash"));`,
    expectedOutput: `format prefix: scrypt | params: N=16384,r=8,p=1
correct password: true
wrong password: false
malformed stored: false`,
    dependencies: [],
    install: "Copy impl.ts into your project — no installation step.",
    usage:
      "const stored = await hashPassword(password);        // save this string\nconst ok = await verifyPassword(candidate, stored);  // boolean, never throws",
    securityNotes:
      "scrypt parameters are the security budget: N=16384/r=8/p=1 is an OWASP baseline — raise them on faster hardware. Always compare with timingSafeEqual (included). This is an alternative to bcrypt/argon2, not a competitor to proper credential recovery flows; combine with rate-limited login endpoints.",
    performanceNotes:
      "~16 MB and ~50-100 ms per hash at N=16384: intentional. That cost IS the protection. Do not run it on a per-request hot path unrelated to login.",
    limitations:
      "Single-process CPU cost; for high-traffic auth consider argon2id via a maintained library. Password strength policy and breach-list checks live at the caller.",
    version: "1.0.0",
    license: "MIT",
    tags: ["password", "scrypt", "hashing", "crypto", "authentication"],
    related: ["hmac-api-key-rotation", "api-error-envelope"],
  },
  {
    slug: "react-route-guard-pattern",
    title: "Client-side auth guard hook for the App Router",
    category: "frontend",
    summary:
      "A single declarative hook that redirects unauthenticated users to the login page — with a loading-state guard so users are never bounced during session hydration, and optional returnTo capture.",
    language: "typescript",
    framework: "next",
    difficulty: "beginner",
    problem:
      "Client components that render protected content must not redirect while the session is still loading (the classic logout-loop bug), and should send users back to where they were after login.",
    approach:
      "The hook takes isAuthed plus isAuthReady and only navigates once the session state has resolved. returnTo encodes the current path+query so the login page can round-trip the user. Server-side protection (middleware) remains the real boundary — this hook is the UX layer on top of it.",
    code: `// Client-side auth guard for the Next.js App Router: one hook, declarative.
// STATUS: draft — UI-pattern entries are reviewed manually; the automated
// verification pipeline only executes framework-free reference code.
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface GuardOptions {
  isAuthed: boolean;
  /** false while the session is still loading — never redirect on loading. */
  isAuthReady: boolean;
  loginPath?: string; // default "/login"
  returnTo?: boolean; // remember the current path after login
}

export function useRequireAuth(opts: GuardOptions): void {
  const router = useRouter();
  useEffect(() => {
    if (!opts.isAuthReady) return;
    if (opts.isAuthed) return;
    const login = opts.loginPath ?? "/login";
    const back = opts.returnTo
      ? "?returnTo=" + encodeURIComponent(location.pathname + location.search)
      : "";
    router.replace(login + back);
  }, [opts.isAuthed, opts.isAuthReady, opts.loginPath, opts.returnTo, router]);
}`,
    demo: ``,
    expectedOutput: ``,
    dependencies: ["next (App Router)", "react"],
    install: "Copy impl.ts into a client component tree.",
    usage:
      "function SettingsPage() {\n  const { user, ready } = useSession();\n  useRequireAuth({ isAuthed: !!user, isAuthReady: ready, returnTo: true });\n  if (!ready || !user) return <Spinner />;\n  return <Settings />;\n}",
    securityNotes:
      "This hook is UX, NOT authorization: any client-side guard can be bypassed. Real protection belongs in middleware or server components that check the session before returning data.",
    performanceNotes: "One effect per guarded page; no re-renders beyond the navigation itself.",
    limitations:
      "Draft — not executed by the automated verification pipeline (it needs a React runtime and DOM). Reviewed manually before promotion to verified.",
    version: "1.0.0",
    license: "MIT",
    tags: ["react", "nextjs", "auth", "routing", "guard"],
    related: ["scrypt-password-hashing", "hmac-api-key-rotation"],
  },

  {
    slug: "boot-env-guard",
    title: "Boot-time environment guard with dotenv override",
    category: "patterns",
    summary:
      "Detects a stale shell environment variable at boot, reloads .env with override semantics, and reports one honest boot line — so a deployment never boots against the wrong database silently.",
    language: "typescript",
    framework: "none",
    difficulty: "intermediate",
    problem:
      "A deployment inherits environment variables from the shell. When a stale value (an old SQLite DATABASE_URL, say) is already exported, plain dotenv refuses to replace it and the app boots against the wrong database — every data request fails while the static shell keeps working, and nobody sees why until the 50th request.",
    approach:
      "Guard the critical variable at boot: if it is missing or fails a required protocol check, reload .env with override:true (plain dotenv will NOT replace inherited vars — override is the whole point), re-read, and emit exactly one boot line carrying the detected protocol and whether a correction happened. The environment and the .env loader are injected, so the guard is unit-testable without touching a real shell.",
    code: `// Boot-time environment guard — stop stale shell vars from silently
// overriding your real .env connection strings.
// Distilled from the TEKA NEXUS boot guard (next.config.ts), which fixed a
// production incident where a stale file: DATABASE_URL survived into boot.
export interface EnvGuardOptions {
  key: string;                                // variable to guard, e.g. "DATABASE_URL"
  env?: Record<string, string | undefined>;   // injectable environment (tests)
  loadDotenv?: () => void;                    // injectable .env loader — must use override:true
  requiredPrefix?: string;                    // e.g. "postgres"; empty value fails when set
  onReport?: (line: string) => void;          // injectable reporter (tests / boot log)
}

export interface EnvGuardResult {
  ok: boolean;        // final value satisfies the requirement
  corrected: boolean; // the .env loader ran and the value changed
  protocol: string;   // segment before "://", "" when unset
  value: string;      // final value ("" when unset)
}

export function guardEnv(opts: EnvGuardOptions): EnvGuardResult {
  const env = opts.env ?? process.env;
  const report = opts.onReport ?? ((line: string) => console.log(line));
  const protocolOf = (v: string | undefined) => (v ? (v.split("://")[0] ?? "") : "");

  let value = env[opts.key] ?? "";
  let corrected = false;

  const bad = () =>
    opts.requiredPrefix ? !value.startsWith(opts.requiredPrefix) : value === "";

  if (bad() && opts.loadDotenv) {
    // override:true is CRITICAL — plain dotenv refuses to replace inherited
    // variables, which is exactly how a stale shell value survives into boot.
    opts.loadDotenv();
    value = env[opts.key] ?? "";
    corrected = true;
  }

  const result: EnvGuardResult = {
    ok: !bad(),
    corrected: corrected,
    protocol: protocolOf(value),
    value: value,
  };
  report("[env-guard] " + opts.key + " protocol=" + (result.protocol || "(none)") + " corrected=" + result.corrected + " ok=" + result.ok);
  return result;
}`,
    demo: `import { guardEnv } from "./impl";

// Simulate a stale shell export plus a .env holding the real URL.
const fakeEnv: Record<string, string | undefined> = { DATABASE_URL: "file:./stale.db" };
const lines: string[] = [];
const loadDotenv = () => { fakeEnv.DATABASE_URL = "postgresql://real.example/db"; };

const fixed = guardEnv({
  key: "DATABASE_URL",
  env: fakeEnv,
  loadDotenv: loadDotenv,
  requiredPrefix: "postgres",
  onReport: (l) => lines.push(l),
});
console.log("corrected=" + fixed.corrected + " ok=" + fixed.ok + " protocol=" + fixed.protocol);

// No loader wired in: the guard must report honestly, never guess.
const broken = guardEnv({
  key: "MISSING_VAR",
  env: {},
  requiredPrefix: "postgres",
  onReport: (l) => lines.push(l),
});
console.log("corrected=" + broken.corrected + " ok=" + broken.ok + " protocol=" + broken.protocol);
console.log("reports=" + lines.length);`,
    expectedOutput: `corrected=true ok=true protocol=postgresql
corrected=false ok=false protocol=
reports=2`,
    dependencies: [],
    install: "No dependencies — copy the module. In next.config.ts wire loadDotenv to dotenv.config({ override: true }).",
    usage: `import { guardEnv } from "./boot-env-guard";

// At the very top of next.config.ts (or your service entry):
guardEnv({
  key: "DATABASE_URL",
  requiredPrefix: "postgres",
  loadDotenv: () => config({ path: ".env", quiet: true, override: true }),
});`,
    securityNotes:
      "The boot line logs the protocol only, never the value — connection strings stay out of logs. Keep .env out of version control; guardEnv reads it, it does not relax that rule.",
    performanceNotes:
      "Runs exactly once at boot; the check itself is a string prefix test with zero runtime cost afterwards.",
    limitations:
      "Prefix-level validation only — it cannot verify credentials or reachability. It guards one variable per call; guard several by calling it per key. It cannot fix a .env that is itself wrong.",
    version: "1.0.0",
    license: "MIT",
    tags: ["env", "boot", "dotenv", "config", "deployment", "patterns"],
    related: ["api-error-envelope", "idempotent-seed-upsert"],
  },
  {
    slug: "sandboxed-demo-verifier",
    title: "Sandboxed code verifier with exact-output matching",
    category: "devops",
    summary:
      "The promotion core behind a trustworthy 'verified' badge: execute published code in isolation, normalize stdout, and compare byte-for-byte with the expected output — statuses are computed, never claimed.",
    language: "typescript",
    framework: "bun",
    difficulty: "advanced",
    problem:
      "Reference-code libraries rot: entries claim to work, badges are self-reported, and consumers discover the truth at runtime. The only promotion rule that stays honest over time is mechanical — run the published code in a clean sandbox and require its stdout to match the expected output exactly.",
    approach:
      "Split the verifier into a pure, testable core plus a thin sandbox wrapper. The core (this entry): normalize() collapses CRLF and trailing whitespace and trims the edges; evaluate() turns one run result into a verdict — timeout, stderr output, or an exact-match comparison that reports the first differing character. The production wrapper (see usage) writes the published module and its demo into a fresh mkdtemp directory, spawns the demo with Bun.spawn under a hard timeout, then calls evaluate(). Nothing promotes itself.",
    code: `// Sandbox verifier core — exact-output promotion logic.
// Distilled from TEKA NEXUS scripts/library-verify.ts, which gates the
// "verified" status of every NEXUS Library entry.
export type RunResult = { out: string; err: string; timedOut: boolean };

export interface Verdict {
  verdict: "verified" | "failed";
  detail: string;
}

// Comparison semantics: CRLF folded to LF, per-line trailing whitespace
// removed, string edges trimmed. Everything else must match exactly.
export function normalize(s: string): string {
  return s
    .replace(/\\r\\n/g, "\\n")
    .split("\\n")
    .map((l) => l.trimEnd())
    .join("\\n")
    .trim();
}

export function evaluate(run: RunResult, expected: string): Verdict {
  if (run.timedOut) {
    return { verdict: "failed", detail: "demo exceeded the time budget" };
  }
  if (run.err.trim()) {
    return { verdict: "failed", detail: "demo wrote to stderr: " + run.err.slice(0, 200) };
  }
  const got = normalize(run.out);
  const want = normalize(expected);
  if (got !== want) {
    const first = [...got].findIndex((ch, i) => ch !== want[i]);
    return { verdict: "failed", detail: "output mismatch at char " + (first < 0 ? want.length : first) };
  }
  return { verdict: "verified", detail: "stdout matched expected output exactly" };
}`,
    demo: `import { evaluate, normalize } from "./impl";

const pass = evaluate({ out: "alpha\\r\\nbeta\\n", err: "", timedOut: false }, "alpha\\nbeta");
console.log(pass.verdict + ":" + pass.detail);

const mismatch = evaluate({ out: "alpha\\nbeta!", err: "", timedOut: false }, "alpha\\nbeta");
console.log(mismatch.verdict + ":" + mismatch.detail);

const timeout = evaluate({ out: "", err: "", timedOut: true }, "anything");
console.log(timeout.verdict + ":" + timeout.detail);

const ok = normalize("x \\r\\ny\\n") === "x\\ny" && normalize("x\\ny\\n") === "x\\ny";
console.log("normalize-crlf-and-trailing:" + ok);`,
    expectedOutput: `verified:stdout matched expected output exactly
failed:output mismatch at char 10
failed:demo exceeded the time budget
normalize-crlf-and-trailing:true`,
    dependencies: [],
    install: "No dependencies. The sandbox wrapper uses Bun.spawn and node:fs/promises mkdtemp (both built into Bun).",
    usage: `import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { evaluate } from "./sandboxed-demo-verifier";

// Production wrapper: run the demo in a fresh temp dir with a hard timeout.
async function verifyOne(code: string, demo: string, expected: string) {
  const dir = await mkdtemp(join(tmpdir(), "verify-"));
  try {
    await writeFile(join(dir, "impl.ts"), code, "utf8");
    await writeFile(join(dir, "demo.ts"), demo, "utf8");
    const proc = Bun.spawn(["bun", "run", join(dir, "demo.ts")], {
      cwd: dir, stdout: "pipe", stderr: "pipe",
    });
    const timer = setTimeout(() => proc.kill(), 20_000);
    const out = await new Response(proc.stdout).text();
    const err = await new Response(proc.stderr).text();
    await proc.exited;
    clearTimeout(timer);
    return evaluate({ out, err, timedOut: proc.exitCode !== 0 && !out }, expected);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}`,
    securityNotes:
      "Never run untrusted submissions outside a sandbox. The production wrapper executes each demo in a fresh temp directory with a hard timeout; deny network access at the platform level if your runner supports it. stderr from the demo is truncated before it reaches logs.",
    performanceNotes:
      "One temp directory and one child process per candidate — the pipeline over a dozen entries completes in seconds. The core itself is O(n) over the output.",
    limitations:
      "Exact-match comparison is intentionally strict — output must be deterministic, so nondeterministic demos (time, randomness, ports) must inject their own clocks/seeds. Exit-code heuristics for timeout detection live in the wrapper, not the core.",
    version: "1.0.0",
    license: "MIT",
    tags: ["testing", "verification", "sandbox", "bun", "quality", "devops"],
    related: ["safe-json-from-llm", "api-error-envelope"],
  },
  {
    slug: "idempotent-seed-upsert",
    title: "Idempotent seed upsert that never touches pipeline-owned fields",
    category: "database",
    summary:
      "Re-runnable seeding by natural key: refresh content, create what is missing, count honestly — and never clobber fields owned by another pipeline, like verification status.",
    language: "typescript",
    framework: "none",
    difficulty: "intermediate",
    problem:
      "Seeders that blindly upsert destroy data: re-running one after a verification pipeline has promoted a row would reset status fields and wipe evidence. Seeders that only insert duplicate on every run. You need both directions safe and an honest run report.",
    approach:
      "Treat a typed seed array as the source of truth. For each row, fetch the existing row by its natural key (slug). Missing → CREATE with pipeline-owned fields at their honest defaults. Present → UPDATE content fields only, explicitly preserving pipeline-owned fields (status, verifiedAt, verifier). Unchanged content → count, do not write. The store is injected behind a tiny interface, so the seeder is testable against a Map and portable to Prisma, Redis, or anything else.",
    code: `// Idempotent seed upsert — content is mine, pipeline fields are theirs.
// Distilled from TEKA NEXUS scripts/library-seed.ts, whose rule is:
// "seeding does NOT touch status/verifiedAt/verifier — those belong to
//  the verification pipeline (or a human reviewer)."
export interface SeedRow {
  slug: string;
  title: string;
  body: string;
}

export interface StoreRow extends SeedRow {
  status: string;
  verifiedAt: string | null;
}

export interface Kv {
  get(slug: string): Promise<StoreRow | null>;
  put(row: StoreRow): Promise<void>;
}

export interface SeedReport {
  created: number;
  updated: number;
  unchanged: number;
  total: number;
}

export async function seedUpsert(rows: SeedRow[], store: Kv): Promise<SeedReport> {
  const report: SeedReport = { created: 0, updated: 0, unchanged: 0, total: rows.length };
  for (const r of rows) {
    const existing = await store.get(r.slug);
    if (!existing) {
      // Create with honest defaults — pipeline-owned fields start empty.
      await store.put({ ...r, status: "draft", verifiedAt: null });
      report.created++;
    } else if (existing.title !== r.title || existing.body !== r.body) {
      // Update content ONLY — status/verifiedAt are preserved on purpose.
      await store.put({ ...existing, title: r.title, body: r.body });
      report.updated++;
    } else {
      report.unchanged++;
    }
  }
  return report;
}`,
    demo: `import { seedUpsert, type Kv, type StoreRow } from "./impl";

const db = new Map<string, StoreRow>();
db.set("alpha", { slug: "alpha", title: "Alpha v1", body: "old", status: "verified", verifiedAt: "2026-01-01" });

const memory: Kv = {
  get: async (slug) => db.get(slug) ?? null,
  put: async (row) => void db.set(row.slug, row),
};

const seeds = [
  { slug: "alpha", title: "Alpha v2", body: "new body" }, // content changed
  { slug: "beta", title: "Beta", body: "first" },         // missing
  { slug: "gamma", title: "Gamma", body: "same" },        // missing
];
const r1 = await seedUpsert(seeds, memory);
const r2 = await seedUpsert(seeds, memory); // identical rerun

const alpha = db.get("alpha")!;
console.log("report1:" + r1.created + "c/" + r1.updated + "u/" + r1.unchanged + "s");
console.log("report2:" + r2.created + "c/" + r2.updated + "u/" + r2.unchanged + "s");
console.log("status-preserved:" + alpha.status + ":" + alpha.verifiedAt);`,
    expectedOutput: `report1:2c/1u/0s
report2:0c/0u/3s
status-preserved:verified:2026-01-01`,
    dependencies: [],
    install: "No dependencies — copy the module and adapt the Kv adapter to your client (Prisma: get = findUnique, put = upsert-style update/create).",
    usage: `import { PrismaClient } from "@prisma/client";
import { seedUpsert } from "./idempotent-seed-upsert";

const db = new PrismaClient();
const report = await seedUpsert(SEEDS, {
  get: async (slug) => db.libraryEntry.findUnique({ where: { slug } }),
  put: async (row) => {
    const { slug, ...data } = row;
    await db.libraryEntry.upsert({ where: { slug }, update: data, create: data });
  },
});
console.log("seeded:", report);`,
    securityNotes:
      "Seeds are code — review them like code and never seed from untrusted sources. The Kv adapter runs with your client's privileges; scope it to the seeded table.",
    performanceNotes:
      "One read + at most one write per row; unchanged rows cost only the read. Batched variants can group reads with findMany when the seed set is large.",
    limitations:
      "Content equality compares the fields you give it — extend SeedRow for more columns and widen the comparison. Deletes are out of scope: rows removed from the seed stay in the store by design (deprecate, do not delete).",
    version: "1.0.0",
    license: "MIT",
    tags: ["database", "seeding", "idempotent", "prisma", "patterns"],
    related: ["cursor-pagination", "api-error-envelope"],
  },
  {
    slug: "db-singleton-client",
    title: "Singleton database client with globalThis caching",
    category: "database",
    summary:
      "One database client per process — cached on globalThis so dev hot-reloads and serverless cold starts reuse the same bounded connection pool instead of multiplying connections.",
    language: "typescript",
    framework: "prisma",
    difficulty: "beginner",
    problem:
      "Module instances do not survive hot reload: every code change in development rebuilds the module and constructs a fresh Prisma client. Serverless cold starts do the same in production. Both multiply open connections until the database refuses new ones — the classic 'too many connections' outage.",
    approach:
      "Store one client instance on globalThis in EVERY environment (not only dev — production cold starts need it too). The factory runs at most once per process; query logging is enabled only in development, where visibility matters and log volume does not cost lambda memory. The client is injectable and framework-agnostic: the factory can construct Prisma, Redis, or any pooled client.",
    code: `// Singleton DB client — one client = one bounded connection pool.
// Distilled from TEKA NEXUS src/lib/db.ts, which keeps a single Prisma
// client across dev hot reloads and serverless cold starts.
export interface ClientOptions {
  log?: string[];
}

export interface DbClient {
  id: number;
  queries: string[];
  log?: string[];
}

const globalForDb = globalThis as unknown as { __appDbClient?: DbClient };
let nextId = 1;

export function getClient(make: () => DbClient, dev: boolean): DbClient {
  const cached = globalForDb.__appDbClient;
  if (cached) return cached;
  const client = make();
  if (dev) client.log = ["query", "error", "warn"]; // visibility in dev only
  globalForDb.__appDbClient = client;
  return client;
}`,
    demo: `import { getClient, type DbClient } from "./impl";

// Simulate two hot reloads and a production cold start: the factory is
// expensive, so count how many times it actually constructs a client.
let constructed = 0;
const factory = (): DbClient => {
  constructed++;
  return { id: constructed, queries: [] };
};

const a = getClient(factory, true);
const b = getClient(factory, true); // "second module instance" — same process
const c = getClient(factory, false); // production mode — still the same pool

console.log("constructed:" + constructed);
console.log("same-instance:" + (a === b && b === c));
console.log("dev-logging:" + (a.log ?? []).join(","));`,
    expectedOutput: `constructed:1
same-instance:true
dev-logging:query,error,warn`,
    dependencies: [],
    install: "No dependencies — copy the module. With Prisma: make = () => new PrismaClient({ log: dev ? ['query','error','warn'] : ['error','warn'] }).",
    usage: `import { PrismaClient } from "@prisma/client";
import { getClient } from "./db-singleton-client";

const isDev = process.env.NODE_ENV === "development";
export const db = getClient(
  () => new PrismaClient({ log: isDev ? ["query", "error", "warn"] : ["error", "warn"] }),
  isDev,
);`,
    securityNotes:
      "The cached client carries the connection credentials in memory — do not serialize or expose it (e.g. through debug endpoints). Query logging in production is disabled on purpose: logs are a leak surface and a memory cost.",
    performanceNotes:
      "Zero overhead after first construction — one property lookup on globalThis. Bounds the connection pool to exactly one client per process, which is what serverless platforms want.",
    limitations:
      "One client per process, not per tenant — multi-tenant setups with separate credentials need one cache slot per credential. Tests that rely on fresh clients must clear the globalThis slot between cases.",
    version: "1.0.0",
    license: "MIT",
    tags: ["database", "prisma", "serverless", "connection-pool", "patterns"],
    related: ["cursor-pagination", "idempotent-seed-upsert"],
  },
];
