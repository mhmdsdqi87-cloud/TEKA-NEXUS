# Changelog

All notable changes to TEKA NEXUS are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Fake-activity engine (live feed simulation, online counters) — i18n-safe, client-only
- Myket Android release v1.0.2 (versionCode 3) with force-close fixes
- Academy boot-time optimization (the ~8s intro on slow connections)

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

[Unreleased]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.70.0...HEAD
[1.70.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.69.0...v1.70.0
[1.69.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.68.0...v1.69.0
[1.67.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.66.0...v1.67.0
[1.66.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.64.0...v1.66.0
[1.64.0]: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS/compare/v1.63.0...v1.64.0
