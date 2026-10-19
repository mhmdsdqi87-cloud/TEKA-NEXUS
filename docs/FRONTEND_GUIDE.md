# TEKA NEXUS — Frontend Guide (MUST FOLLOW)

## Architecture
Single-page app mounted at `src/app/page.tsx` (the ONLY page route). Views are switched
via `useApp()` zustand store (`src/lib/store.ts`): `view`, `navigate()`, `back()`, `user`,
`searchOpen`, `unreadCount`. NEVER create files under `src/app/` other than what already exists.
API routes live under `src/app/api/**` (backend only).

## Tech
- Next 16 App Router, TypeScript strict, Tailwind 4, shadcn/ui (New York) in `src/components/ui` — USE THEM, don't rebuild.
- Icons: lucide-react ONLY. No emoji as UI icons.
- Animations: framer-motion, subtle (fade/slide 0.2-0.4s). Respect reduced motion.
- Toasts: `sonner` → `import { toast } from "sonner"`.
- Dates: date-fns `formatDistanceToNow`.

## Data access
- `src/lib/api.ts`: `get/post/patch/del` + `qs()` for query strings. Errors throw `ApiError` with readable message — catch and `toast.error(e.message)`.
- DTOs in `src/lib/dto.ts`. Categories/statuses/skills constants in `src/lib/constants.ts` (`PROJECT_CATEGORIES`, `PROJECT_STATUSES`, `TASK_STATUSES`, `TASK_PRIORITIES`, `SKILLS`, `GOALS`, `AVATAR_GRADIENTS`, `LIMITS`).
- Loading: skeleton components. Empty states: icon + text + CTA. Never leave dead UI.

## Style tokens (dark graphite brand)
- Page background is global (`nexus-bg` fixed div in layout) — do NOT add another full-page bg.
- Panels: `glass-card` class (hover glow) or shadcn Card. Frosted bars: `glass`.
- Gradient text: `text-gradient` / `text-gradient-soft`. Display font: `font-display` class.
- Primary CTA: `className="btn-hero"` (cyan→violet gradient). Secondary: `variant="outline"`.
- Accents: cyan (`text-cyan-300`, `bg-cyan-500/10`) and violet (`text-violet-300`) ONLY. No blue/indigo.
- Status pill helper: use PROJECT_STATUSES color/bg/dot fields.
- Avatars: `Avatar` + gradient fallback from `AVATAR_GRADIENTS[user.avatarColor]`, initials 2 chars.
- Focus: add `focus-glow` where custom focus styling is needed.
- Long lists: wrap in `max-h-[...] overflow-y-auto` with custom scrollbar (global styles handle look).
- Mobile-first responsive: bottom nav visible `md:hidden`; left sidebar `hidden md:flex`. All touch targets ≥ 44px.

## File layout (write ONLY your assigned files)
```
src/components/brand/logo.tsx        (exists — Logo + wordmark, reuse)
src/components/shared/*.tsx          (exists — UserAvatar, StatusPill, EmptyState, ProjectCard, Skeletons, helpers)
src/components/landing/*.tsx         (Task 2-a)
src/components/auth/*.tsx            (Task 2-a)
src/components/onboarding/*.tsx      (Task 2-a)
src/components/shell/*.tsx           (Task 2-b: AppShell, LeftNav, MobileNav, TopBar, SearchDialog, RightRail)
src/views/home-view.tsx              (Task 2-b)
src/views/explore-view.tsx           (Task 2-b)
src/views/project-new-view.tsx       (Task 2-b)
src/views/project-view.tsx           (Task 2-c: tabs Overview/Updates/Tasks/Milestones/Team/Activity)
src/views/teams-view.tsx             (Task 2-c)
src/views/profile-view.tsx           (Task 2-d)
src/views/notifications-view.tsx     (Task 2-d)
src/views/settings-view.tsx          (Task 2-d)
src/app/page.tsx                     (integration — Task 3, do not edit unless assigned)
```

## UX rules (spec §26)
Every button does something real. Every async op has loading + success toast + error toast.
No fabricated data anywhere. Confirm destructive ops with AlertDialog. Duplicate submits prevented
(disable button while pending).
