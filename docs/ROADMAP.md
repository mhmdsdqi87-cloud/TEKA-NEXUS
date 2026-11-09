# TEKA NEXUS — Roadmap

Where the Nexus is heading next. Shipped work lives in [CHANGELOG.md](../CHANGELOG.md).

## Now (in progress)

- **Fake-activity engine** — a believable "alive" layer for the public feed:
  simulated project launches, release notes and online counters. Must be
  client-only (no hydration mismatch) and fully translated in all 7 locales.
- **Myket release v1.0.2** (versionCode 3) — root-cause the WebView force-close
  on cold start and re-publish the Android build.
- **Academy boot time** — the cinematic intro costs ~8s on slow connections;
  target is "interactive in < 3s, cinema stays optional".

## Next

- **Rate limiting** on public API routes (edge-level, per-IP token bucket).
- **Certificate verification page** — public `/verify/<id>` lookup so employers
  can validate a TEKA certificate.
- **Project board export** — one-click Markdown export of tasks/milestones for
  pasting into GitHub issues.
- **PWA offline shell** — cache the last-viewed feed + academy lesson for
  offline reading.

## Exploring

- SQL playground for the academy (WebAssembly SQLite).
- Pair-programming rooms (WebRTC) inside the workspace.
- Mentor matching: senior builders adopt newcomer projects.

## Won't do (for now)

- Server actions — the API stays REST + zod on purpose.
- Third-party OAuth — password auth only, per product decision (v1.70.0).

> Priorities shift with real user feedback — open an issue if something here
> matters to you.
