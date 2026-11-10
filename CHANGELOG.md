# Changelog

All notable changes to TEKA NEXUS are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Fake-activity engine (live feed simulation, online counters) — i18n-safe, client-only
- Myket Android release v1.0.2 (versionCode 3) with force-close fixes
- Academy boot-time optimization (the ~8s intro on slow connections)

## [1.74.0] — 2026-11-10

### Security

- Bootstrap and speedrun secrets are no longer present in source.
- `/api/supabase/status` is now founder-only.
- Plaintext password mirroring into Supabase Auth removed — user passwords never
  leave the TEKA server.
- Security-focused configuration consolidation.

### Fixed

- AI terminal timeout, level-formula divergence (XP curve now matches the
  documented `levelFromXp`), and malformed-JSON requests returning 400s on the
  7 JSON-parsing API routes instead of leaking raw errors.
- TTS: SDK timeout hardened, language cache correctness, assist route now
  returns honest 502 semantics, and the offline tutor locale fixed.

### Removed

- Dead OS-desktop chain (`os-root`, `os-apps`, `window-frame`,
  `matrix-overlay`, `os-store`) and the dead toast chain (`toast`, `toaster`,
  `use-toast`).
- 7 unused shadcn wrappers: `calendar`, `carousel`, `chart`, `drawer`, `form`,
  `input-otp`, `resizable`.
- 16 unused dependencies (incl. `next-auth`, `next-intl`,
  `@tanstack/react-query`, `@tanstack/react-table`, `recharts`,
  `react-hook-form`, `uuid`).

### Added

- GitHub Actions CI (`.github/workflows/ci.yml`): lint + typecheck + tests on
  every push to `main` and every pull request.
- `src/proxy.ts` — the request middleware renamed to the Next.js 16 `proxy`
  file convention, with identical logic (x-teka-session header → teka_session
  cookie bridge).

### Changed

- Removed the empty `next.config.mjs` — `next.config.ts` is the single
  canonical config.

## [1.73.0] — 2026-11-10

### Added

- Motion primitives: spotlight, tilt, magnetic, text reveal, scroll progress
  + glow CSS system.
- Cinematic landing: pointer-parallax starfield hero, rotating conic orbit
  frame, magnetic CTAs, shimmering wordmark, word-reveal subtitle,
  cursor-spotlight cards, animated section underlines, glowing footer seam,
  living aurora preview.
- App shell polish: reading progress in the chrome, glowing nav pill,
  spotlight project cards, cinematic boot hand-off.

### Performance

- Edge cache (`s-maxage` + stale-while-revalidate) on the public feed and
  pulse endpoints.

### Fixed

- Hero punctuation stays glued to the gradient run (lone-period wrap in Latin
  locales).

## [1.72.1] — 2026-11-10

### Added

- Browser-voice fallback for TTS when server synthesis is unavailable.

## [1.72.0] — 2026-11-10

### Fixed

- TTS uses the OpenAI-compatible speech path in production.
- AI client timeout raised to 58s so it outlives the server chain.

## [1.71.0] — 2026-11-10

### Changed

- Shared AI provider chain: single 50s window, URL guard, `ru` locale support.
- All six fonts self-hosted — unbreaks Vercel builds.
- Vendor-neutral AI provider naming across UI and docs.

### Added

- 512px app icon precached in the offline PWA shell.

## [1.70.0] — 2025-11-16

### Added

- True fullscreen on phones: `display_override: ["fullscreen", "standalone"]` in the
  webmanifest (installed PWA now draws over the status bar) + top safe-area padding
  on every sticky header so content never hides under the notch.

### Removed

- Google OAuth sign-in, end to end: UI button + divider, activation dialog,
  `/api/auth/google/*` routes, `src/lib/google-oauth.ts`, translation keys in all
  7 locales, and the OAuth return-handling in the root SPA. Password auth remains
  the only (and fully supported) sign-in path.

### Changed

- Pull-to-refresh policy: the browser refresh circle now appears ONLY when the
  whole page is pulled down at the document top. Every inner scroll panel
  (chats, feeds, rails, kanban, editor output) gets `overscroll-behavior-y: contain`
  so its overscroll never chains into the viewport trigger. Also works around
  Chromium reading the root scroller's behavior from `<body>`, not `<html>`.

## [1.69.0] — 2025-11-15

### Changed

- Mobile UI overhaul: redesigned button system (gradient/hero variants, pressed
  states), card hierarchy and spacing rhythm across landing, feed, academy,
  arena, DM, profile and settings — verified at 390×844 in EN and FA (RTL).

## [1.67.0] — 2025-11-14

### Fixed

- Mobile Chrome behavior bugs: grey tap-highlight flash, page zoom on input
  focus (16px floor, code editors excluded), collapsing URL-bar under/overshoot
  (`100dvh` upgrade), horizontal overflow lock (`overflow-x: clip`), toast
  lift above the bottom nav, and top-bar clipping at 390px.

## [1.66.0] — 2025-11-13

### Changed

- GitHub presence: repository description + 20 topics, bilingual README
  (English + full Persian RTL edition), live badges, hero screenshot,
  APK download link and repo-stats pin card.

## [1.64.0] — 2025-11-12

### Added

- Google Search Console verification (`googled4f1b189968c9638.html`) —
  Persian-first metadata, JSON-LD graph (Organization / WebSite / MobileApplication).

## Earlier releases

For versions 1.42.0 → 1.63.0 see the
[commit history](https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/commits/main) —
the academy content engine (300 lessons in 4 tracks), the 12 arena modules,
the social graph (projects, tasks, milestones, team chat, DM), the XP/coin
economy and the PWA shell all landed in this window.

[Unreleased]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.74.0...HEAD
[1.74.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.73.0...v1.74.0
[1.73.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.72.1...v1.73.0
[1.72.1]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.72.0...v1.72.1
[1.72.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.71.0...v1.72.0
[1.71.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.70.0...v1.71.0
[1.70.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.69.0...v1.70.0
[1.69.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.68.0...v1.69.0
[1.67.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.66.0...v1.67.0
[1.66.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.64.0...v1.66.0
[1.64.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.63.0...v1.64.0
