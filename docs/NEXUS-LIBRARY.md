# NEXUS Knowledge Library

TEKA NEXUS ships a structured knowledge library of reusable, verified technical
implementations — usable by human developers **and** AI coding agents through a
stable public API and an MCP server.

This document describes what exists today, how verification works, and the
rules for contributing. Everything documented here is live in the codebase.

---

## What it is

A curated set of complete, standalone reference implementations (currently
TypeScript) with full metadata: problem statement, approach, source code,
dependencies, install + usage, security notes, performance notes, explicit
limitations, version, license, attribution, and related entries.

**Statuses are honest and enforced by a pipeline:**

| Status | Meaning |
|---|---|
| `draft` | Not machine-verified yet. Use with judgment. |
| `under_review` | Queued for human review. |
| `verified` | `scripts/library-verify.ts` executed the entry's demo against its published code and the output matched **exactly**. Evidence (timestamp + pipeline id) is stored on the entry and shown in the UI and API. |
| `deprecated` | Kept for history; excluded from list responses unless explicitly requested. |

There is no path to `verified` other than the pipeline (or a documented manual
review recorded on the entry). The UI and API show the evidence, not just a
badge.

## Where it lives

| Piece | Path |
|---|---|
| Canonical Prisma model | `prisma/schema.prisma` → `LibraryEntry` |
| Entries source of truth (seeds) | `scripts/library-entries.ts` |
| Seeder (idempotent upsert by slug) | `scripts/library-seed.ts` |
| Verification pipeline | `scripts/library-verify.ts` |
| Public API — list/search | `src/app/api/library/route.ts` |
| Public API — detail | `src/app/api/library/[slug]/route.ts` |
| `llms.txt` (generated from live data) | `src/app/llms.txt/route.ts` |
| In-app UI | `src/views/library-view.tsx` (shell view "library") |
| MCP server | `mini-services/library-mcp/` (port 3040) |

### Run the pipeline locally

```bash
bun run scripts/library-seed.ts     # upsert entries from the seed file
bun run scripts/library-verify.ts   # execute demos, promote/demote statuses
```

The verify script writes each entry's `code` as `impl.ts` and its `demo` as
`demo.ts` into an isolated temp directory, runs the demo with bun, compares
stdout with `expectedOutput` (line-trimmed exact match), and updates the DB.
A previously-verified entry that stops passing is **demoted to draft**.

## Public API (stable contract)

Read-only, no auth, JSON. Every response is exactly one of:

```json
{ "ok": true,  "data": [...], "meta": { "total": 12, "count": 20, "limit": 20, "offset": 0, "filters": {} } }
{ "ok": false, "error": { "code": "not_found", "message": "No library entry with slug: nope" } }
```

### `GET /api/library`

| Param | Values | Default |
|---|---|---|
| `q` | free text (keyword scoring: title > tags > summary > code) | — |
| `category` | frontend · backend · fullstack · ai · api · database · security · devops · performance · patterns · i18n · web3 | all |
| `language` | typescript · javascript · python · sql · bash | all |
| `framework` | e.g. `none`, `next` | all |
| `difficulty` | beginner · intermediate · advanced | all |
| `status` | draft · under_review · verified · deprecated | everything except deprecated |
| `limit` | 1–50 | 20 |
| `offset` | 0+ | 0 |

Unknown filter values return `400 { ok:false, error:{ code:"bad_request" } }` —
the API does not silently ignore mistakes. With `q`, results are relevance-ranked
and `meta.total` is the scored set size. **The API never fabricates results:**
zero matches is a valid, clearly-shaped response.

List items omit the source code (lean payloads). Caching:
`Cache-Control: public, s-maxage=30, stale-while-revalidate=60`.

### `GET /api/library/{slug}`

Full entry: everything above **plus** `problem`, `approach`, complete `code`,
`install`, `usage`, `securityNotes`, `performanceNotes`, `limitations`,
`dependencies`, `sourceAuthor`, `sourceUrl`, `verifiedAt`, `verifier`, and
resolved `related` entries. Unknown slugs → `404 not_found`.

## `llms.txt`

`GET /llms.txt` — generated from live data (never hand-written and drifting):
purpose, verification semantics, API reference with examples, the full entry
index (slug · category · language · difficulty · status · version · title),
and attribution rules. Text/plain, edge-cacheable.

## MCP server

`mini-services/library-mcp/` — official `@modelcontextprotocol/sdk`,
streamable HTTP, **session mode**, endpoint `POST /mcp` (port 3040). Data comes
from the public Library API (`LIBRARY_API_URL`), so the server holds no
database and works against any deployment (local, Vercel, self-hosted).

| Tool | Purpose |
|---|---|
| `search_nexus` | Keyword search with all filters |
| `get_reference` | Full entry by slug (code + docs + evidence) |
| `find_implementation` | "Find a tested implementation for problem X" — verified ranked first, honest zero-coverage note when nothing matches |
| `get_code_example` | Just the source code, ready to paste |
| `find_related_patterns` | Related entries, resolved |
| `check_compatibility` | Advisory metadata (language/framework/dependencies/limits) — explicitly *not* a build promise |

Run + verify:

```bash
cd mini-services/library-mcp
bun install
bun run dev              # http://localhost:3040/mcp
bun run test-client.ts   # real MCP client: handshake + all six tools
```

The integration claim is backed by `test-client.ts`: if it passes, the tools
work end-to-end; if it fails, the integration is not working and should not be
advertised.

## Contributing an entry

1. Add a complete seed to `scripts/library-entries.ts` (all metadata fields —
   entries missing `demo`/`expectedOutput` can only ever be `draft`).
2. Original work only: never commit copied proprietary code. MIT license,
   attribution required (`sourceAuthor` / `sourceUrl`).
3. Open a PR. Maintainers run the verify pipeline; only passing entries reach
   `verified`. UI-pattern code that cannot run headless stays `draft` until
   manually reviewed.
4. Security-relevant entries must state limitations explicitly (e.g. the SSRF
   guard documents redirect re-validation and egress-firewall pairing).

## For builders — reusing TEKA NEXUS code

Everything in this library is MIT-licensed and written for reuse. Three honest ways to take it:

| Way | What you get |
|---|---|
| **Copy an entry** | Complete standalone source + problem/approach docs + security notes; keep the attribution line so the next reader finds the rest |
| **Call the API** | `GET /api/library?q=...&status=verified` — stable JSON contract, no auth, pagination + filters |
| **Plug in an agent** | `GET /llms.txt` for a machine-readable index, or connect the MCP server (`mini-services/library-mcp`, port 3040) |

**Where the entries come from.** The newest entries are distilled from the platform's own code — builders get the exact patterns TEKA NEXUS itself runs on:

| Entry | Distilled from |
|---|---|
| `boot-env-guard` | the boot-time DATABASE_URL guard in `next.config.ts` |
| `sandboxed-demo-verifier` | the promotion pipeline in `scripts/library-verify.ts` |
| `idempotent-seed-upsert` | the seeder in `scripts/library-seed.ts` |
| `db-singleton-client` | the Prisma singleton in `src/lib/db.ts` |

**Verify before you trust.** Statuses are computed, never claimed: `scripts/library-verify.ts` executes each entry's demo against its published code and requires an exact output match. Current pipeline result: **15 verified, 0 failed, 1 honestly draft** (no runnable demo). When the database is not provisioned yet, the API serves the seed catalog with honest `draft` labels and `meta.source: "catalog"` — the fallback never pretends a status it did not compute.

## Honest limitations (current)

- Search is keyword + field-weight scoring. No semantic/vector search yet —
  needs embedding infrastructure; the API shape won't change when it lands.
- Verification covers framework-free code that runs headless in bun. UI-heavy
  patterns (React hooks, DOM code) are `draft` by design until a review path
  exists for them.
- In-process rate limiting (see the library itself) means the public API relies
  on Vercel edge caching for burst protection; a shared limiter is future work.
- The MCP server is a self-hosted mini-service; production hosting and a public
  MCP URL are a deployment step, not a code step (`LIBRARY_API_URL` env).
