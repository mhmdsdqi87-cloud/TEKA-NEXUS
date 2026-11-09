# Security Policy

## Supported version

Only the latest deployment on `main` (currently the `v1.70.x` line) receives
security fixes. The live site is `https://teka-nexus.vercel.app`.

## Reporting a vulnerability

Please do **not** open a public issue for security problems.

- Email: report through the GitHub contact for
  [mhmdsdqi87-cloud](https://github.com/mhmdsdqi87-cloud) (private via the
  "Report a vulnerability" button under **Security → Advisories**).
- Include: what you found, how to reproduce it, and the impact you estimate.
- You will get an answer within 72 hours. Fixes ship as soon as a patch is
  verified — credit is given in the release notes if you want it.

## What is already hardened

- All 60+ REST endpoints are zod-validated and check authorization per request
  on the server (never from the client).
- Passwords are hashed with `scrypt` (per-user salt, `timingSafeEqual` compare).
- Sessions are httpOnly cookies backed by server-side session rows (30-day TTL).
- The mini-service (socket.io) only exposes chat; the gateway never forwards
  raw ports.

## Scope notes

- Client-side state (zustand store, localStorage session token) is treated as
  untrusted; every mutation re-checks the session server-side.
- Rate limiting is planned (see docs/ROADMAP.md) — until then, the public API
  relies on Vercel's edge protections.
