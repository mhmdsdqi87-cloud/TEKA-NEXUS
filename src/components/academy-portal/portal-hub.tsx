"use client";

// TEKA NEXUS ACADEMY — HUB section: the portal front door.
// Hero with its own identity, live progress dashboard (real /api/academy data),
// "continue learning" jump, guest hero, the community portal door and
// quick links into the other portal sections.

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  DoorOpen,
  GraduationCap,
  Infinity as InfinityIcon,
  Lock,
  Route,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { EASE, AnimatedNumber, FadeIn, HoverLift, PulsingDot, Reveal, Stagger, StaggerItem, TapScale } from "@/components/shared/motion";
import { COURSES, courseLessons } from "@/lib/academy";
import { ACCENTS, pick } from "@/lib/academy/types";
import { EmptyState } from "@/components/shared/atoms";

import type { PortalDict } from "./portal-dict";
import {
  courseStat,
  fill,
  licenseCount,
  useLocale,
  useNextUp,
  type PortalDataFull,
  type PortalSection,
} from "./portal-data";

// ─── Orbit visual ────────────────────────────────────────────

function HeroOrbit() {
  return (
    <div className="relative mx-auto h-36 w-36 shrink-0 sm:h-44 sm:w-44" aria-hidden="true">
      {/* static aurora ring */}
      <div className="aurora-border absolute inset-0 rounded-full" />
      {/* orbiting dashed ring + satellite */}
      <div className="orbit-slow absolute inset-2 rounded-full border border-dashed border-cyan-400/30">
        <span className="absolute -top-1 start-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            </div>
      <div className="orbit-rev absolute inset-7 rounded-full border border-violet-400/25">
        <span className="absolute -bottom-1 start-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
            </div>
      {/* center motif */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-violet-500/25 ring-1 ring-inset ring-cyan-400/40 sm:h-20 sm:w-20"
        >
          <GraduationCap className="h-8 w-8 text-cyan-200 sm:h-10 sm:w-10" />
        </motion.div>
            </div>
            </div>
  );
}

// ─── Progress ring (render-only, adapted from the academy hub) ──

function ProgressRing({ value, size = 64 }: { value: number; size?: number }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90" role="img" aria-label={`${Math.round(value * 100)}%`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#portalRingGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <defs>
        <linearGradient id="portalRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Small pieces ────────────────────────────────────────────

function StatTile({ icon: Icon, label, value, className, iconClass }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  className?: string;
  iconClass?: string;
}) {
  return (
    <div className={cn("academy-glass rounded-2xl p-4", className)}>
      <span className={cn("mb-2.5 grid h-9 w-9 place-items-center rounded-xl bg-white/[0.05] ring-1 ring-inset ring-white/10", iconClass)} aria-hidden="true">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <p className="font-display text-xl font-bold tabular-nums text-white sm:text-2xl">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
  );
}

function SkeletonTile() {
  return (
    <div className="academy-glass rounded-2xl p-4" aria-hidden="true">
      <div className="mb-2.5 h-9 w-9 animate-pulse rounded-xl bg-white/[0.05]" />
      <div className="h-7 w-16 animate-pulse rounded-md bg-white/[0.06]" />
      <div className="mt-2 h-3 w-20 animate-pulse rounded bg-white/[0.04]" />
            </div>
  );
}

// ─── Dashboard (logged-in) ───────────────────────────────────

function Dashboard({ data, dict, onNavigate }: { data: PortalDataFull; dict: PortalDict; onNavigate: (s: PortalSection) => void }) {
  const locale = useLocale();
  const navigate = useApp((s) => s.navigate);
  const nextUp = useNextUp(data.progress);

  const totalLessons = COURSES.reduce((acc, c) => acc + courseLessons(c).length, 0);
  const doneLessons = COURSES.reduce((acc, c) => acc + (data.progress[c.id]?.done.length ?? 0), 0);
  const overall = totalLessons ? doneLessons / totalLessons : 0;
  const certs = data.certs.length;
  const licenses = licenseCount(data.exams);

  if (!data.loaded) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
        <SkeletonTile />
        <SkeletonTile />
        <SkeletonTile />
        <SkeletonTile />
            </div>
    );
  }

  if (data.failed) {
    return (
      <EmptyState
        icon={Compass}
        title={dict.states.errorTitle}
        description={dict.states.errorBody}
        action={
          <TapScale>
            <button onClick={() => void data.refresh()} className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow">
              {dict.states.retry}
            </button>
          </TapScale>
        }
        className="rounded-2xl border border-dashed border-white/10"
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* stat tiles */}
      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4" gap={0.06}>
        <StaggerItem>
          <StatTile
            icon={Zap}
            label={dict.stats.xp}
            value={<AnimatedNumber value={data.user?.xp ?? 0} format={(n) => Math.round(n).toLocaleString()} />}
            iconClass="text-amber-300"
          />
        </StaggerItem>
        <StaggerItem>
          <StatTile
            icon={BookOpen}
            label={fill(dict.stats.lessonsDone, { done: doneLessons, total: totalLessons })}
            value={<AnimatedNumber value={doneLessons} />}
            iconClass="text-cyan-300"
          />
        </StaggerItem>
        <StaggerItem>
          <StatTile
            icon={Award}
            label={dict.stats.certificates}
            value={<AnimatedNumber value={certs} />}
            iconClass="text-violet-300"
          />
        </StaggerItem>
        <StaggerItem>
          <StatTile
            icon={ShieldCheck}
            label={dict.stats.licenses}
            value={<AnimatedNumber value={licenses} />}
            iconClass="text-emerald-300"
          />
        </StaggerItem>
      </Stagger>

      {/* course bars + overall ring + continue */}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <FadeIn delay={0.08}>
          <div className="academy-glass h-full rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <ProgressRing value={overall} />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{dict.stats.overall}</p>
                <p className="font-display text-2xl font-bold text-white">
                  <AnimatedNumber value={Math.round(overall * 100)} />%
                </p>
                <p className="text-xs text-muted-foreground">{fill(dict.stats.lessonsDone, { done: doneLessons, total: totalLessons })}</p>
            </div>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{dict.stats.coursesHeading}</p>
            <div className="mt-3 space-y-4">
              {COURSES.map((course) => {
                const stat = courseStat(course.id, data.progress);
                return (
                  <button
                    key={course.id}
                    onClick={() => navigate({ name: "academy", course: course.id })}
                    className="group block w-full text-start focus-glow"
                    aria-label={pick(course.title, locale)}
                  >
                    <span className="flex items-center justify-between gap-2 text-sm">
                      <span className="min-w-0 truncate font-medium text-slate-200 group-hover:text-white">
                        {course.emoji} {pick(course.title, locale)}
                      </span>
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                        {fill(dict.stats.lessonsDone, { done: stat.done, total: stat.total })}
                      </span>
                    </span>
                    <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.04]">
                      <motion.span
                        className={cn("block h-full w-full origin-left rounded-full bg-gradient-to-r rtl:origin-right", ACCENTS[course.accent].grad)}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: stat.pct }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                      />
                    </span>
                    <span className="sr-only">{Math.round(stat.pct * 100)}%</span>
                  </button>
                );
              })}

            </div>
            <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground/70">
              <InfinityIcon className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              {dict.hero.free}
            </p>
            </div>
        </FadeIn>

        {/* continue learning / all done */}
        <FadeIn delay={0.12}>
          {nextUp ? (
            <HoverLift className="h-full">
              <div className="aurora-border relative flex h-full flex-col rounded-2xl p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-300/90">
                  <PulsingDot dotClassName="bg-cyan-400" />
                  {dict.continue.title}
                </p>
                <p className="mt-3 font-display text-lg font-bold leading-snug text-white">
                  {nextUp.emoji} {nextUp.lessonTitle}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{nextUp.courseTitle}</p>
                <div className="mt-auto pt-4">
                  <TapScale>
                    <button
                      onClick={() => navigate({ name: "academy", course: nextUp.courseId, lesson: nextUp.lessonId })}
                      className="btn-hero inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
                    >
                      <Sparkles className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                      {dict.continue.cta}
                    </button>
                  </TapScale>
            </div>
            </div>
            </HoverLift>
          ) : (
            <div className="flex h-full flex-col rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.05] p-5">
              <Trophy className="h-8 w-8 text-emerald-300" aria-hidden="true" />
              <p className="mt-3 font-display text-lg font-bold text-white">{dict.continue.noneTitle}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{dict.continue.noneBody}</p>
              <div className="mt-auto pt-4">
                <TapScale>
                  <button
                    onClick={() => onNavigate("certificates")}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 focus-glow"
                  >
                    <Award className="h-4 w-4" aria-hidden="true" />
                    {dict.continue.exploreCta}
                  </button>
                </TapScale>
            </div>
            </div>
          )}
        </FadeIn>
            </div>
            </div>
  );
}

// ─── Guest card ──────────────────────────────────────────────

function GuestCard({ dict }: { dict: PortalDict }) {
  const navigate = useApp((s) => s.navigate);
  return (
    <FadeIn delay={0.08}>
      <div className="aurora-border relative overflow-hidden rounded-2xl p-5 sm:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{dict.guest.title}</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{dict.guest.body}</p>
            <ul className="mt-4 space-y-2.5">
              {[dict.guest.f1, dict.guest.f2, dict.guest.f3].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            </div>
          <div className="flex shrink-0 flex-col gap-2.5 sm:w-56">
            <TapScale>
              <button
                onClick={() => navigate({ name: "signup" })}
                className="btn-hero inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {dict.guest.cta}
              </button>
            </TapScale>
            <TapScale>
              <button
                onClick={() => navigate({ name: "login" })}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-muted-foreground transition hover:text-foreground focus-glow"
              >
                <Lock className="h-4 w-4" aria-hidden="true" />
                {dict.guest.signIn}
              </button>
            </TapScale>
            </div>
            </div>
            </div>
    </FadeIn>
  );
}

// ─── Community door ──────────────────────────────────────────

function CommunityDoor({ dict, hasUser }: { dict: PortalDict; hasUser: boolean }) {
  const navigate = useApp((s) => s.navigate);
  return (
    <Reveal>
      <HoverLift>
        <div className="academy-glass relative overflow-hidden rounded-2xl p-5 sm:p-7">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -start-16 h-48 w-48 rounded-full bg-violet-500/[0.14] blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-16 -end-10 h-40 w-40 rounded-full bg-cyan-500/[0.1] blur-3xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-violet-500/15 ring-1 ring-inset ring-violet-400/30" aria-hidden="true">
              <DoorOpen className="h-7 w-7 text-violet-300" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet-300/80">{dict.community.eyebrow}</p>
              <h2 className="mt-1.5 font-display text-xl font-bold text-white sm:text-2xl">{dict.community.title}</h2>
              <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">{dict.community.body}</p>
            </div>
            <div className="shrink-0">
              <TapScale>
                <button
                  onClick={() => navigate(hasUser ? { name: "home" } : { name: "explore" })}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-5 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/25 focus-glow"
                >
                  <DoorOpen className="h-4 w-4" aria-hidden="true" />
                  {dict.community.cta}
                </button>
              </TapScale>
            </div>
            </div>
            </div>
      </HoverLift>
    </Reveal>
  );
}

// ─── Quick links into the other portal sections ──────────────

const QUICK_META: { section: PortalSection; icon: React.ComponentType<{ className?: string }>; title: keyof PortalDict["quick"]; desc: keyof PortalDict["quick"]; iconClass: string }[] = [
  { section: "paths", icon: Route, title: "pathsTitle", desc: "pathsDesc", iconClass: "text-cyan-300" },
  { section: "tools", icon: Compass, title: "toolsTitle", desc: "toolsDesc", iconClass: "text-violet-300" },
  { section: "tutor", icon: Sparkles, title: "tutorTitle", desc: "tutorDesc", iconClass: "text-emerald-300" },
  { section: "certificates", icon: ScrollText, title: "certsTitle", desc: "certsDesc", iconClass: "text-amber-300" },
];

function QuickLinks({ dict, onNavigate }: { dict: PortalDict; onNavigate: (s: PortalSection) => void }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{dict.quick.heading}</h2>
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
        {QUICK_META.map(({ section, icon: Icon, title, desc, iconClass }) => (
          <StaggerItem key={section} className="h-full">
            <HoverLift className="h-full">
              <button
                onClick={() => onNavigate(section)}
                className="glass-card flex h-full min-h-[44px] w-full flex-col items-start rounded-2xl p-4 text-start focus-glow"
              >
                <Icon className={cn("h-5 w-5", iconClass)} aria-hidden="true" />
                <span className="mt-2.5 text-sm font-semibold text-white">{dict.quick[title]}</span>
                <span className="mt-1 text-xs leading-5 text-muted-foreground">{dict.quick[desc]}</span>
              </button>
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>
            </div>
  );
}

// ─── Section root ────────────────────────────────────────────

export function HubSection({
  data,
  dict,
  onNavigate,
}: {
  data: PortalDataFull;
  dict: PortalDict;
  onNavigate: (s: PortalSection) => void;
}) {
  const hasUser = !!data.user;

  return (
    <div className="space-y-8">
      {/* hero */}
      <FadeIn>
        <div className="academy-glass academy-grid-sheen relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -end-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/[0.14] blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -start-20 h-72 w-72 rounded-full bg-violet-500/[0.14] blur-3xl" />
          <div className="relative flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
                <InfinityIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {dict.hero.free}
              </span>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">{dict.hero.eyebrow}</p>
              <h1 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                {dict.hero.title}
              </h1>
              <p className="mt-3 max-w-xl text-sm font-medium text-slate-300 sm:text-base">{dict.hero.sub}</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{dict.hero.desc}</p>
            </div>
            <HeroOrbit />
            </div>
            </div>
      </FadeIn>

      {/* dashboard or guest card */}
      {hasUser ? <Dashboard data={data} dict={dict} onNavigate={onNavigate} /> : <GuestCard dict={dict} />}

      {/* the community portal door — the user's "پورتال" requirement */}
      <CommunityDoor dict={dict} hasUser={hasUser} />

      {/* quick links */}
      <QuickLinks dict={dict} onNavigate={onNavigate} />
            </div>
  );
}
