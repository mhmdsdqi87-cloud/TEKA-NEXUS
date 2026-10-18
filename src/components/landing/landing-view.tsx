"use client";

// TEKA NEXUS — LandingView (Task 2-a).
// Public entry: sticky glass top bar, hero with orbital nexus visual, live pulse
// strip fed by the real /api/feed endpoint, workflow, feature trio, product
// preview mock, how-it-works, FAQ and footer.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  ArrowRight,
  Compass,
  GitBranch,
  LayoutDashboard,
  Rocket,
  Search,
  ShieldCheck,
  Trophy,
  Users,
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
import { useApp } from "@/lib/store";
import { get } from "@/lib/api";
import type { FeedEvent } from "@/lib/dto";
import { cn } from "@/lib/utils";

// ─── Motion helper: subtle fade-up on first view ─────────────

function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

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
        <OrbitChip icon={Rocket} label="Ship" tone="cyan" className="left-[1%] top-[16%]" delay={0} />
        <OrbitChip icon={Users} label="Team up" tone="violet" className="right-[0%] top-[40%]" delay={1.2} />
        <OrbitChip icon={GitBranch} label="Fork" tone="violet" className="bottom-[16%] left-[5%]" delay={2.1} />
        <OrbitChip icon={Trophy} label="Rank up" tone="cyan" className="bottom-[4%] right-[7%]" delay={0.6} />
      </div>
    </div>
  );
}

// ─── Live pulse strip (real /api/feed data — never fabricated) ─

const FEED_VERBS: Record<string, string> = {
  PROJECT_CREATED: "created",
  RELEASE_PUBLISHED: "released",
  UPDATE_POSTED: "posted an update on",
  TASK_COMPLETED: "closed a task on",
  MILESTONE_COMPLETED: "hit a milestone on",
  MEMBER_JOINED: "joined",
};

function LivePulse() {
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
    <section aria-label="Live activity" className="mt-14 border-y border-white/[0.06] bg-white/[0.015] sm:mt-20">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
        <span className="hidden shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:flex">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live pulse
        </span>

        {events === null && !failed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Skeleton className="h-9 w-56 shrink-0 rounded-full bg-white/[0.05]" />
            <Skeleton className="hidden h-9 w-52 shrink-0 rounded-full bg-white/[0.05] sm:block" />
            <Skeleton className="hidden h-9 w-60 shrink-0 rounded-full bg-white/[0.05] md:block" />
          </div>
        ) : events && !failed && events.length > 0 ? (
          <div className="kanban-scroll flex items-center gap-2.5 overflow-x-auto pb-0.5">
            {events.slice(0, 3).map((e) => (
              <span
                key={e.id}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span className="font-medium text-foreground">{e.actor?.displayName ?? "Someone"}</span>
                <span className="text-muted-foreground">{FEED_VERBS[e.eventType] ?? "updated"}</span>
                <span className="font-medium text-cyan-300">{e.project?.name ?? "a project"}</span>
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  {formatDistanceToNow(new Date(e.createdAt), { addSuffix: true })}
                </span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Be the first to build something real.</p>
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

const BOARD_COLUMNS = [
  { name: "Backlog", dot: "bg-zinc-400", cards: 2 },
  { name: "In Progress", dot: "bg-cyan-400", cards: 2 },
  { name: "Done", dot: "bg-emerald-400", cards: 1 },
];

function BoardCardStub() {
  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
      <span className="text-[11px] text-foreground/80">Task card</span>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="h-4 w-4 rounded-full bg-white/10" />
        <span className="font-mono text-[10px] text-muted-foreground">Assignee</span>
      </div>
    </div>
  );
}

function ProductPreview() {
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
            Preview
          </span>
        </div>
        {/* mini kanban */}
        <div className="bg-white/[0.015] p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {BOARD_COLUMNS.map((col) => (
              <div key={col.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full", col.dot)} />
                  <span className="text-xs font-medium text-foreground/90">{col.name}</span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">{col.cards}</span>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: col.cards }).map((_, i) => (
                    <BoardCardStub key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground/70">
        Product preview — illustrative layout of a project workspace.
      </p>
    </div>
  );
}

// ─── Static content data ─────────────────────────────────────

const WORKFLOW_WORDS = [
  "IDEA",
  "DISCOVER",
  "FIND A TEAM",
  "BUILD",
  "COLLABORATE",
  "PUBLISH",
  "GROW",
  "MONETIZE",
] as const;

const FEATURES: { icon: LucideIcon; title: string; body: string; how: string; tone: "cyan" | "violet" }[] = [
  {
    icon: Search,
    title: "Nexus Discovery",
    tone: "cyan",
    body: "Find projects by category, status, tags, and the skills they need — from first-commit ideas to released builds. Every public project is indexed the moment it is published.",
    how: "Open Explore to filter the catalog, or use search to jump straight to projects, people, and tags.",
  },
  {
    icon: LayoutDashboard,
    title: "Project Workspaces",
    tone: "violet",
    body: "Every project gets a shared workspace: a task board, milestones, progress updates, and a team roster with explicit roles from owner to viewer.",
    how: "Owners publish a project and review requests; accepted collaborators plan and ship work on the same board.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Reputation",
    tone: "cyan",
    body: "Reputation is earned, not claimed. The server verifies every contribution and awards XP and reputation automatically — nothing is self-reported.",
    how: "Finish tasks, hit milestones, and ship releases; the results appear on your profile and are visible to teams.",
  },
];

const HOW_STEPS: { title: string; body: string }[] = [
  {
    title: "Create a profile",
    body: "Sign up, set your display name, skills, and interests. Onboarding takes under a minute.",
  },
  {
    title: "Publish or discover a project",
    body: "Share your own idea as a project with a tagline and category, or browse discovery for something worth joining.",
  },
  {
    title: "Request to collaborate",
    body: "Apply with a role and a short introduction. The project owner reviews your request and adds you to the team.",
  },
];

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is TEKA NEXUS?",
    a: "A developer-first platform where ideas become real technology. Publish a project at any stage — from a rough idea to a released build — and find the people to build it with. Project discovery, team formation, and verified reputation live in one place.",
  },
  {
    q: "Is it free?",
    a: "Yes. TEKA NEXUS is free to use during the beta preview. Monetization tools are planned for a later phase, and this preview environment runs entirely on clearly-labeled demo data.",
  },
  {
    q: "How is reputation earned?",
    a: "It is never self-reported. The server awards XP and reputation automatically for verified contributions: completing tasks, completing milestones, posting updates, releasing a project, and having a collaboration request accepted.",
  },
  {
    q: "Can I use it without crypto?",
    a: "Yes. TEKA NEXUS is a standard web platform — no wallet, tokens, or blockchain knowledge required. Everything works with a regular email account.",
  },
  {
    q: "How do teams work?",
    a: "Projects have owners, admins, contributors, and viewers. To join, you send a collaboration request with your intended role and a short introduction; the project owner reviews and accepts or rejects it.",
  },
];

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
  const comingSoon = () => toast("Not part of this preview yet — coming in a later phase.");
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToFaqs = () =>
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const columns: { title: string; links: { label: string; action: () => void }[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Explore", action: () => navigate({ name: "explore" }) },
        { label: "Projects", action: () => navigate({ name: "projectNew" }) },
        { label: "Teams", action: () => navigate({ name: "teams" }) },
        { label: "Search", action: () => setSearchOpen(true) },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", action: scrollTop },
        { label: "FAQ", action: scrollToFaqs },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", action: comingSoon },
        { label: "Privacy", action: comingSoon },
        { label: "Guidelines", action: comingSoon },
      ],
    },
    {
      title: "Support",
      links: [{ label: "FAQ", action: comingSoon }],
    },
  ];

  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={`Footer — ${col.title}`} className="flex flex-col gap-1">
              <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/80">
                {col.title}
              </h3>
              {col.links.map((l) => (
                <FooterLink key={`${col.title}-${l.label}`} label={l.label} onClick={l.action} />
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-foreground/80">TEKA NEXUS — Imagine. Build. Connect.</span>
          <span>Preview environment: all content is clearly-labeled demo data.</span>
          <span className="font-mono">© {new Date().getFullYear()} TEKA</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Main view ───────────────────────────────────────────────

export function LandingView() {
  const navigate = useApp((s) => s.navigate);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Sticky glass top bar ── */}
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo size={28} onClick={scrollTop} />
          <nav aria-label="Primary" className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="h-10 px-3 text-muted-foreground hover:text-foreground"
              onClick={() => navigate({ name: "login" })}
            >
              Sign in
            </Button>
            <Button className="btn-hero h-10 px-3 sm:px-5" onClick={() => navigate({ name: "signup" })}>
              Start Building
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="mx-auto max-w-6xl px-4 pb-4 pt-14 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeUp>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-medium text-cyan-300">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  TEKA NEXUS — beta preview with demo data
                </span>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Where Ideas Become <span className="text-gradient">Real Technology</span>.
                </h1>
                <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
                  Discover projects, find your people, and build what comes next.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    className="btn-hero h-11 px-6"
                    onClick={() => navigate({ name: "explore" })}
                  >
                    <Compass className="h-4 w-4" />
                    Explore Projects
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 px-6"
                    onClick={() => navigate({ name: "signup" })}
                  >
                    Start Building
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15} className="mx-auto w-full max-w-md lg:max-w-none">
              <HeroOrbit />
            </FadeUp>
          </div>
        </section>

        {/* ── LIVE PULSE (real feed data) ── */}
        <LivePulse />

        {/* ── WORKFLOW ── */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <FadeUp>
            <SectionHeading
              eyebrow="The path"
              title="One workflow, idea to impact."
              subtitle="Every feature in TEKA NEXUS maps to a step of the same loop — the way real projects actually ship."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-y-3">
              {WORKFLOW_WORDS.map((word, i) => (
                <div key={word} className="flex items-center">
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
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ── FEATURE TRIO ── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <FadeUp>
            <SectionHeading
              eyebrow="Platform"
              title="Everything you need to go from zero to shipped."
            />
          </FadeUp>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.title} delay={0.08 * i}>
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
                      How it works
                    </span>
                    <p className="mt-1.5">{f.how}</p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── PRODUCT PREVIEW ── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <FadeUp>
            <SectionHeading
              eyebrow="Inside a project"
              title="A workspace built for shipping."
              subtitle="Tasks, milestones, updates, and your whole team — organized in one board per project."
            />
          </FadeUp>
          <FadeUp delay={0.1} className="mt-10">
            <ProductPreview />
          </FadeUp>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <FadeUp>
            <SectionHeading eyebrow="How it works" title="Start in three steps." />
          </FadeUp>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {HOW_STEPS.map((s, i) => (
              <FadeUp key={s.title} delay={0.08 * i}>
                <article className="glass-card flex h-full flex-col rounded-xl p-6">
                  <span className="font-mono text-2xl font-medium text-gradient">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
          <FadeUp>
            <SectionHeading eyebrow="FAQ" title="Questions, answered." />
          </FadeUp>
          <FadeUp delay={0.1}>
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
          </FadeUp>
        </section>
      </main>

      <Footer />
    </div>
  );
}
