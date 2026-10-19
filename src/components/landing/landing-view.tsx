"use client";

// TEKA NEXUS — LandingView (Task 2-a).
// Public entry: sticky glass top bar, hero with orbital nexus visual, live pulse
// strip fed by the real /api/feed endpoint, workflow, feature trio, product
// preview mock, how-it-works, FAQ and footer.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  Award,
  Compass,
  GitBranch,
  GraduationCap,
  Infinity as InfinityIcon,
  LayoutDashboard,
  MonitorSmartphone,
  Rocket,
  Search,
  ShieldCheck,
  Terminal,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Logo, LogoMark } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useApp } from "@/lib/store";
import { get } from "@/lib/api";
import type { FeedEvent } from "@/lib/dto";
import { useT, useRelativeTime } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  AnimatedNumber,
  EASE,
  FadeIn,
  HoverLift,
  PulsingDot,
  Reveal,
  Stagger,
  StaggerItem,
  TapScale,
  staggerParent,
} from "@/components/shared/motion";

// ─── Hero orbital visual ─────────────────────────────────────

function OrbitChip({
  icon: Icon,
  label,
  className,
  tone,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
  tone: "cyan" | "violet";
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}s` }}
      className={cn(
        "absolute float-y glass flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium shadow-sm",
        className
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", tone === "cyan" ? "text-cyan-300" : "text-violet-300")} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function HeroOrbit() {
  const t = useT();

  return (
    <div className="aurora-border relative overflow-hidden rounded-3xl p-5 sm:p-8">
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px]">
        {/* pulsing glow behind the core */}
        <div
          aria-hidden
          className="pulse-dot absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-2xl"
        />

        {/* outer dashed orbit (slow) + satellite dots */}
        <div className="orbit-slow absolute inset-[10%] rounded-full border border-dashed border-cyan-400/25">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <span className="absolute -right-0.5 top-1/2 h-1.5 w-1.5 rounded-full bg-violet-400" />
        </div>

        {/* inner dashed orbit (reverse) + satellite dots */}
        <div className="orbit-rev absolute inset-[26%] rounded-full border border-dashed border-violet-400/25">
          <span className="absolute -bottom-0.5 left-1/4 h-1.5 w-1.5 rounded-full bg-cyan-300" />
          <span className="absolute right-1/4 top-0 h-2 w-2 rounded-full bg-violet-400/80" />
        </div>

        {/* central core */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_44px_-8px_rgba(34,211,238,0.45)]">
            <LogoMark size={64} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            nexus
          </span>
        </div>

        {/* floating chips on the orbits */}
        <OrbitChip icon={Rocket} label={t("landing.orbit.ship")} tone="cyan" className="left-[1%] top-[16%]" delay={0} />
        <OrbitChip icon={Users} label={t("landing.orbit.teamUp")} tone="violet" className="right-[0%] top-[40%]" delay={1.2} />
        <OrbitChip icon={GitBranch} label={t("landing.orbit.fork")} tone="violet" className="bottom-[16%] left-[5%]" delay={2.1} />
        <OrbitChip icon={Trophy} label={t("landing.orbit.rankUp")} tone="cyan" className="bottom-[4%] right-[7%]" delay={0.6} />
      </div>
    </div>
  );
}

// ─── Live pulse strip (real /api/feed data — never fabricated) ─

// eventType → dictionary key for the feed verb ("created", "released", …).
const FEED_VERB_KEYS: Record<string, string> = {
  PROJECT_CREATED: "landing.feed.created",
  RELEASE_PUBLISHED: "landing.feed.released",
  UPDATE_POSTED: "landing.feed.updateOn",
  TASK_COMPLETED: "landing.feed.taskOn",
  MILESTONE_COMPLETED: "landing.feed.milestoneOn",
  MEMBER_JOINED: "landing.feed.joined",
};

function LivePulse() {
  const t = useT();
  const rel = useRelativeTime();
  const [events, setEvents] = useState<FeedEvent[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    get<{ events: FeedEvent[] }>("/api/feed?page=1")
      .then((d) => {
        if (alive) setEvents(Array.isArray(d.events) ? d.events : []);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section aria-label={t("landing.live.aria")} className="mt-14 border-y border-white/[0.06] bg-white/[0.015] sm:mt-20">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
        <span className="hidden shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:flex">
          <PulsingDot className="shrink-0" dotClassName="bg-emerald-400" />
          {t("landing.live.label")}
        </span>

        {events === null && !failed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Skeleton className="h-9 w-56 shrink-0 rounded-full bg-white/[0.05]" />
            <Skeleton className="hidden h-9 w-52 shrink-0 rounded-full bg-white/[0.05] sm:block" />
            <Skeleton className="hidden h-9 w-60 shrink-0 rounded-full bg-white/[0.05] md:block" />
          </div>
        ) : events && !failed && events.length > 0 ? (
          <div className="kanban-scroll flex items-center gap-2.5 overflow-x-auto pb-0.5">
            {events.slice(0, 3).map((e, i) => (
              <motion.span
                key={e.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i, ease: EASE }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span className="font-medium text-foreground">{e.actor?.displayName ?? t("landing.feed.someone")}</span>
                <span className="text-muted-foreground">
                  {FEED_VERB_KEYS[e.eventType] ? t(FEED_VERB_KEYS[e.eventType]) : t("landing.feed.updated")}
                </span>
                <span className="font-medium text-cyan-300">{e.project?.name ?? t("landing.feed.projectFallback")}</span>
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  {rel(new Date(e.createdAt))}
                </span>
              </motion.span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("landing.live.empty")}</p>
        )}
      </div>
    </section>
  );
}

// ─── Section heading helper ──────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">{eyebrow}</span>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </div>
  );
}

// ─── Product preview: browser frame + mini kanban ────────────

function BoardCardStub() {
  const t = useT();

  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
      <span className="text-[11px] text-foreground/80">{t("landing.preview.taskCard")}</span>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="h-4 w-4 rounded-full bg-white/10" />
        <span className="font-mono text-[10px] text-muted-foreground">{t("landing.preview.assignee")}</span>
      </div>
    </div>
  );
}

function ProductPreview() {
  const t = useT();
  const BOARD_COLUMNS = [
    { name: t("landing.preview.backlog"), dot: "bg-zinc-400", cards: 2 },
    { name: t("landing.preview.inProgress"), dot: "bg-cyan-400", cards: 2 },
    { name: t("landing.preview.done"), dot: "bg-emerald-400", cards: 1 },
  ];

  return (
    <div>
      <div className="aurora-border overflow-hidden rounded-2xl">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-muted-foreground">
            teka.nexus/p/nexus-core/board
          </span>
          <span className="hidden rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300 sm:inline-flex">
            {t("landing.preview.chip")}
          </span>
        </div>
        {/* mini kanban */}
        <div className="bg-white/[0.015] p-4 sm:p-6">
          <motion.div
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {BOARD_COLUMNS.map((col) => (
              <StaggerItem
                key={col.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full", col.dot)} />
                  <span className="text-xs font-medium text-foreground/90">{col.name}</span>
                  <AnimatedNumber
                    value={col.cards}
                    duration={0.9}
                    className="ml-auto font-mono text-[10px] text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: col.cards }).map((_, i) => (
                    <BoardCardStub key={i} />
                  ))}
                </div>
              </StaggerItem>
            ))}
          </motion.div>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground/70">
        {t("landing.preview.caption")}
      </p>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────

function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-cyan-300 focus-glow rounded-md"
    >
      {label}
    </button>
  );
}

function Footer() {
  const navigate = useApp((s) => s.navigate);
  const setSearchOpen = useApp((s) => s.setSearchOpen);
  const t = useT();
  const comingSoon = () => toast(t("landing.toast.comingSoon"));
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToFaqs = () =>
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const columns: { title: string; links: { label: string; action: () => void }[] }[] = [
    {
      title: t("landing.footer.colProduct"),
      links: [
        { label: t("common.explore"), action: () => navigate({ name: "explore" }) },
        { label: t("common.projects"), action: () => navigate({ name: "projectNew" }) },
        { label: t("common.teams"), action: () => navigate({ name: "teams" }) },
        { label: t("common.search"), action: () => setSearchOpen(true) },
      ],
    },
    {
      title: t("landing.footer.colCompany"),
      links: [
        { label: t("landing.footer.about"), action: scrollTop },
        { label: t("landing.footer.faq"), action: scrollToFaqs },
      ],
    },
    {
      title: t("landing.footer.colLegal"),
      links: [
        { label: t("landing.footer.terms"), action: comingSoon },
        { label: t("landing.footer.privacy"), action: comingSoon },
        { label: t("landing.footer.guidelines"), action: comingSoon },
      ],
    },
    {
      title: t("landing.footer.colSupport"),
      links: [{ label: t("landing.footer.faq"), action: comingSoon }],
    },
  ];

  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal y={12}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={t("landing.footer.navAria", { section: col.title })} className="flex flex-col gap-1">
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/80">
                  {col.title}
                </h3>
                {col.links.map((l) => (
                  <FooterLink key={`${col.title}-${l.label}`} label={l.label} onClick={l.action} />
                ))}
              </nav>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-foreground/80">{t("landing.footer.tagline")}</span>
          <span>{t("landing.footer.previewNote")}</span>
          <span className="font-mono">© {new Date().getFullYear()} TEKA</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Academy mini visuals ──────────────────────────────────

function PythonMini() {
  return (
    <div aria-hidden className="mt-5 overflow-hidden rounded-lg border border-white/[0.07] bg-black/40">
      <div className="border-b border-white/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
        python
      </div>
      <div className="space-y-1 p-3 font-mono text-[11px] leading-relaxed">
        <p>
          <span className="text-violet-300">print</span>
          <span className="text-muted-foreground">(</span>
          <span className="text-cyan-300">"Salam, world!"</span>
          <span className="text-muted-foreground">)</span>
        </p>
        <p>
          <span className="text-violet-300">print</span>
          <span className="text-muted-foreground">(</span>
          <span className="text-cyan-300">"I am learning Python &lt;3"</span>
          <span className="text-muted-foreground">)</span>
        </p>
        <div className="mt-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-emerald-300/90">
          Salam, world! · I am learning Python &lt;3
        </div>
      </div>
    </div>
  );
}

function HtmlMini() {
  return (
    <div aria-hidden className="mt-5 overflow-hidden rounded-lg border border-white/[0.07] bg-black/40">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-rose-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground/70">index.html</span>
      </div>
      <div className="p-3 font-mono text-[11px] leading-relaxed">
        <p className="text-muted-foreground">&lt;h1&gt;</p>
        <p className="pl-3 text-cyan-300">Hello, world! 🌍</p>
        <p className="text-muted-foreground">&lt;/h1&gt;</p>
        <div className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-800">
          Hello, world! 🌍
        </div>
      </div>
    </div>
  );
}

// ─── Main view ───────────────────────────────────────────────

export function LandingView() {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Translated content data (source strings live in dictionaries/*/landing.ts).
  const WORKFLOW_WORDS = [
    t("landing.workflow.idea"),
    t("landing.workflow.discover"),
    t("landing.workflow.findTeam"),
    t("landing.workflow.build"),
    t("landing.workflow.collaborate"),
    t("landing.workflow.publish"),
    t("landing.workflow.grow"),
    t("landing.workflow.monetize"),
  ];

  const FEATURES: { icon: LucideIcon; title: string; body: string; how: string; tone: "cyan" | "violet" }[] = [
    {
      icon: Search,
      title: t("landing.features.discovery.title"),
      tone: "cyan",
      body: t("landing.features.discovery.body"),
      how: t("landing.features.discovery.how"),
    },
    {
      icon: LayoutDashboard,
      title: t("landing.features.workspaces.title"),
      tone: "violet",
      body: t("landing.features.workspaces.body"),
      how: t("landing.features.workspaces.how"),
    },
    {
      icon: ShieldCheck,
      title: t("landing.features.reputation.title"),
      tone: "cyan",
      body: t("landing.features.reputation.body"),
      how: t("landing.features.reputation.how"),
    },
  ];

  const HOW_STEPS: { title: string; body: string }[] = [
    { title: t("landing.how.step1.title"), body: t("landing.how.step1.body") },
    { title: t("landing.how.step2.title"), body: t("landing.how.step2.body") },
    { title: t("landing.how.step3.title"), body: t("landing.how.step3.body") },
  ];

  const FAQ_ITEMS: { q: string; a: string }[] = [
    { q: t("landing.faq.q1"), a: t("landing.faq.a1") },
    { q: t("landing.faq.q2"), a: t("landing.faq.a2") },
    { q: t("landing.faq.q3"), a: t("landing.faq.a3") },
    { q: t("landing.faq.q4"), a: t("landing.faq.a4") },
    { q: t("landing.faq.q5"), a: t("landing.faq.a5") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Sticky glass top bar ── */}
      <header className="glass sticky top-0 z-40">
        <FadeIn y={-8} duration={0.5}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo size={28} onClick={scrollTop} />
          <nav aria-label={t("landing.topbar.navAria")} className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              className="h-10 px-3 text-muted-foreground hover:text-foreground"
              onClick={() => navigate({ name: "login" })}
            >
              {t("common.signIn")}
            </Button>
            <TapScale>
              <Button className="btn-hero h-10 px-3 sm:px-5" onClick={() => navigate({ name: "signup" })}>
                {t("landing.topbar.startBuilding")}
              </Button>
            </TapScale>
          </nav>
        </div>
      </FadeIn>
      </header>

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="mx-auto max-w-6xl px-4 pb-4 pt-14 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Choreographed hero entrance: badge → headline → subcopy → CTAs */}
            <Stagger gap={0.12} delayChildren={0.05}>
              <StaggerItem>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-medium text-cyan-300">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {t("landing.hero.badge")}
                </span>
              </StaggerItem>
              <StaggerItem>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  {t("landing.hero.title1")}
                  <span className="text-gradient">{t("landing.hero.title2")}</span>
                  {t("landing.hero.title3")}
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
                  {t("landing.hero.subtitle")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <TapScale>
                    <Button
                      className="btn-hero h-11 px-6"
                      onClick={() => navigate({ name: "explore" })}
                    >
                      <Compass className="h-4 w-4" />
                      {t("landing.hero.exploreProjects")}
                    </Button>
                  </TapScale>
                  <TapScale>
                    <Button
                      variant="outline"
                      className="h-11 px-6"
                      onClick={() => navigate({ name: "signup" })}
                    >
                      {t("landing.topbar.startBuilding")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TapScale>
                </div>
              </StaggerItem>
            </Stagger>

            {/* Orbit visual settles in last, with a gentle scale-down */}
            <motion.div
              className="mx-auto w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.45, ease: EASE }}
            >
              <HeroOrbit />
            </motion.div>
          </div>
        </section>

        {/* ── LIVE PULSE (real feed data) ── */}
        <LivePulse />

        {/* ── WORKFLOW ── */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow={t("landing.workflow.eyebrow")}
              title={t("landing.workflow.title")}
              subtitle={t("landing.workflow.subtitle")}
            />
          </Reveal>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-y-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-48px" }}
          >
            {WORKFLOW_WORDS.map((word, i) => (
              <StaggerItem key={word} className="flex items-center">
                <span className="flex items-baseline gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
                  <span className="font-mono text-[10px] text-cyan-300/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="whitespace-nowrap font-display text-xs font-semibold tracking-wide sm:text-sm">
                    {word}
                  </span>
                </span>
                {i < WORKFLOW_WORDS.length - 1 && (
                  <span
                    aria-hidden
                    className="mx-1 h-px w-4 shrink-0 bg-gradient-to-r from-cyan-400/40 to-violet-400/40 sm:mx-1.5 sm:w-6"
                  />
                )}
              </StaggerItem>
            ))}
          </motion.div>
        </section>

        {/* ── FEATURE TRIO ── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <SectionHeading
              eyebrow={t("landing.features.eyebrow")}
              title={t("landing.features.title")}
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={0.08 * i} className="h-full">
                <HoverLift className="h-full">
                  <article className="glass-card flex h-full flex-col rounded-xl p-6">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl",
                        f.tone === "cyan" ? "bg-cyan-500/10 text-cyan-300" : "bg-violet-500/10 text-violet-300"
                      )}
                    >
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mb-5 mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                    <div className="mt-auto border-t border-white/[0.06] pt-4 text-xs text-muted-foreground/80">
                      <span className="font-mono uppercase tracking-[0.18em] text-foreground/70">
                        {t("landing.features.howLabel")}
                      </span>
                      <p className="mt-1.5">{f.how}</p>
                    </div>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PRODUCT PREVIEW ── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <SectionHeading
              eyebrow={t("landing.preview.eyebrow")}
              title={t("landing.preview.title")}
              subtitle={t("landing.preview.subtitle")}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <ProductPreview />
          </Reveal>
        </section>

        {/* ── TEKA ACADEMY ── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <SectionHeading
              eyebrow={t("landing.academy.eyebrow")}
              title={t("landing.academy.title")}
              subtitle={t("landing.academy.subtitle")}
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
            <Reveal delay={0.05} className="h-full">
              <HoverLift className="h-full">
                <article className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                      <Terminal className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                      <InfinityIcon className="h-3 w-3" />
                      {t("landing.academy.freeBadge")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{t("landing.academy.pythonTitle")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("landing.academy.pythonBody")}</p>
                  <PythonMini />
                </article>
              </HoverLift>
            </Reveal>
            <Reveal delay={0.12} className="h-full">
              <HoverLift className="h-full">
                <article className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                      <InfinityIcon className="h-3 w-3" />
                      {t("landing.academy.freeBadge")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{t("landing.academy.htmlTitle")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("landing.academy.htmlBody")}</p>
                  <HtmlMini />
                </article>
              </HoverLift>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                { icon: MonitorSmartphone, label: t("landing.academy.chip1") },
                { icon: Zap, label: t("landing.academy.chip2") },
                { icon: Award, label: t("landing.academy.chip3") },
                { icon: GraduationCap, label: t("landing.academy.chip4") },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  <chip.icon className="h-3.5 w-3.5 text-cyan-300/80" />
                  {chip.label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <TapScale>
                <Button className="btn-hero h-11 px-7" onClick={() => navigate({ name: "academyPortal" })}>
                  <GraduationCap className="h-4 w-4" />
                  {t("landing.academy.cta")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </TapScale>
            </div>
          </Reveal>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <SectionHeading eyebrow={t("landing.how.eyebrow")} title={t("landing.how.title")} />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {HOW_STEPS.map((s, i) => (
              <Reveal key={s.title} delay={0.08 * i} className="h-full">
                <HoverLift className="h-full">
                  <article className="glass-card flex h-full flex-col rounded-xl p-6">
                    <AnimatedNumber
                      value={i + 1}
                      duration={0.9}
                      delay={0.2 + 0.08 * i}
                      format={(n) => String(Math.round(n)).padStart(2, "0")}
                      className="font-mono text-2xl font-medium text-gradient"
                    />
                    <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
          <Reveal>
            <SectionHeading eyebrow={t("landing.faq.eyebrow")} title={t("landing.faq.title")} />
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="glass-card mt-8 rounded-xl px-5">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm sm:text-base">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
