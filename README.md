<div dir="rtl">

# TEKA NEXUS — جایی که ایده‌ها تکنولوژی واقعی می‌شوند

</div>

**TEKA NEXUS** is a developer-first social platform + a free programming academy in one PWA-installable app:

- 🧭 **Discover** real technology projects, follow builders, grow a verified reputation (XP/REP earned by real actions — never clicks)
- 🤝 **Build together**: project workspaces with kanban tasks, milestones, updates, threaded comments, collaboration requests, and **real-time team chat**
- 🎓 **TEKA Academy** (free forever): 40 hands-on lessons across **Python** (runs on a custom in-browser interpreter — no setup, no install) and **HTML/CSS** (live preview), quizzes, auto-graded challenges, a free playground, a 5-section **Learning Portal**, **Bug Detective**, **Error Encyclopedia**, **Predict the Output**, a bilingual **Glossary**, and a **Socratic AI Tutor**
- 🏅 **Official TEKA License**: proctored final exam (15 min, server-graded, max 3 attempts, anti-cheat enforced server-side) → a verifiable license certificate
- 👑 **Founder console** for community oversight
- 🌍 Fully localized: **English, Persian (فارسی, RTL), Español, 中文, العربية (RTL), Français**

## Quick start

```bash
bun install
cp .env.example .env          # SQLite works out of the box for local dev
bun run db:push               # create the schema
bun run dev                   # http://localhost:3000
```

Production with **Supabase PostgreSQL** → see [`docs/SUPABASE.md`](docs/SUPABASE.md).
Deploying (Vercel/VPS) + building an Android AAB for stores (Myket) via TWA → see [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Tech stack

| Layer     | Choice                                                                 |
| --------- | ---------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, standalone build), TypeScript strict           |
| UI        | Tailwind CSS 4, shadcn/ui, framer-motion, Lucide                       |
| DB        | Prisma ORM — SQLite (dev) / PostgreSQL via Supabase (prod)             |
| Auth      | scrypt password hashing + httpOnly session cookies (+ token mirror for embedded previews) |
| Realtime  | socket.io mini-service (`mini-services/chat-service`)                  |
| AI        | Server-side LLM tutoring endpoint (`/api/academy/tutor`) — keys never exposed |
| PWA       | manifest + brand-rendered icons + safe service worker (production-only) |

## Repository map

```
src/
  app/            # "/" SPA shell + /api/** route handlers (REST, zod-validated)
  views/          # one client view per product area (SPA router = zustand store)
  components/     # landing / shell / academy / academy-portal (tools, tutor) / shared
  lib/
    academy/      # course content as pure data + pylite interpreter + exam engine
    i18n/         # 6-locale dictionaries
mini-services/    # socket.io chat service (own port, own package.json)
docs/             # API contract, frontend guide, SUPABASE.md, DEPLOY.md
```

## Honest status (what is / is not implemented)

Implemented and end-to-end tested: auth + onboarding, projects/tasks/milestones/collab flow,
follows/blocks/notifications/search, team chat (presence/typing/reactions/history), academy
(lessons, run-in-browser Python, live HTML preview, playground, quizzes, challenges, exam →
license), learning portal + tools + AI tutor, avatar upload, founder console, PWA/SEO.

Not implemented (by design, phase 5 of the spec): multi-server scaling for chat, payment
systems, external accreditation — the certificate explicitly states it is a TEKA credential,
not a university degree.

## Scripts

| Command                       | What it does                          |
| ----------------------------- | ------------------------------------- |
| `bun run dev`                 | dev server on :3000 (logs to dev.log) |
| `bun run lint` / `tsc`        | eslint / typecheck                    |
| `bun run build` + `start`     | standalone production build           |
| `bun run db:push`             | sync Prisma schema to the DB          |
| `bun run db:switch:postgres`  | flip Prisma to PostgreSQL (Supabase)  |
| `bun run icons`               | re-render PWA icons from favicon.svg  |

---

<div dir="rtl">

از اولین خط کد تا ساخت محصولاتی که واقعاً کار می‌کنند. 💙 TEKA

</div>
