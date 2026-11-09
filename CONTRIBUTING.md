# Contributing to TEKA NEXUS

Thank you for wanting to make the Nexus better — contributions are welcome
from anyone, especially first-time builders. **فارسی هم صحبت می‌کنیم؛ اگر راحت‌تری
به فارسی بنویس، خودت!**

## Ways to contribute

| Type | Where |
| --- | --- |
| Academy lesson content | `src/lib/academy/*.ts` (typed lesson objects) |
| UI / views | `src/views/*`, `src/components/*` |
| API endpoints | `src/app/api/**` (REST + zod, force-dynamic) |
| Translations | `src/lib/i18n/dictionaries/{en,fa,ar,es,fr,ru,zh}/` |
| Docs | `README.md`, `README.fa.md`, `docs/` |

## Ground rules

1. **TypeScript strict** — no `any` without a comment that justifies it.
2. **Design system** — use the existing shadcn/ui components and Tailwind
   tokens; keep 44px minimum touch targets on mobile.
3. **7 languages must stay in sync** — if you add or rename an i18n key, add it
   to all locale files (`en` is the type source of truth).
4. **APIs are REST + zod** — server actions are not used.
5. **Lint and typecheck must pass**: `bun run lint && bun run typecheck`.
6. **No secrets in the repo** — copy `.env.example` to `.env` locally.

## Workflow

```bash
bun install
bun run dev          # http://localhost:3000
bun run lint         # ESLint
bun run typecheck    # tsc --noEmit
bun run test         # engine + i18n parity tests
```

Then: fork → branch (`feat/my-change`) → commit → pull request.
Small, focused PRs get merged fastest.
