"use client";

// TEKA NEXUS — root SPA.
// The whole app lives on "/" — views are switched through the zustand router
// (src/lib/store.ts). See docs/FRONTEND_GUIDE.md + docs/API_CONTRACT.md.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useApp } from "@/lib/store";
import { get, setSessionToken } from "@/lib/api";
import { SessionUser } from "@/lib/store";
import { useInitLocale } from "@/lib/i18n/store";
import { useT } from "@/lib/i18n";
import { TekaDirectionProvider } from "@/components/shared/teka-direction";
import { EnterPortal } from "@/components/auth/enter-portal";
import { ArenaHubView } from "@/views/arena-hub-view";
import { GameShell } from "@/components/arena/game-shell";
import { getGame } from "@/components/os/app-registry";

import { LandingView } from "@/components/landing/landing-view";
import { AuthView } from "@/components/auth/auth-view";
import { OnboardingView } from "@/components/onboarding/onboarding-view";
import { AppShell, SearchDialog } from "@/components/shell/app-shell";
import { HomeView } from "@/views/home-view";
import { ExploreView } from "@/views/explore-view";
import { LiveView } from "@/views/live-view";
import { WorkspaceHubView } from "@/views/workspace-hub-view";
import { ProjectNewView } from "@/views/project-new-view";
import { ProjectView } from "@/views/project-view";
import { TeamsView } from "@/views/teams-view";
import { ProfileView } from "@/views/profile-view";
import { NotificationsView } from "@/views/notifications-view";
import { DmView } from "@/views/dm-view";
import { SettingsView } from "@/views/settings-view";
import { SavedView } from "@/views/saved-view";
import { AcademyView } from "@/views/academy-view";
import { AcademyPortalView } from "@/views/academy-portal-view";
import { FounderView } from "@/views/founder-view";
import { AboutView } from "@/views/about-view";
import { LogoMark } from "@/components/brand/logo";
import { MotionRoot, PageTransition } from "@/components/shared/motion";

const AUTHOptional_VIEWS = new Set(["landing", "login", "signup", "onboarding"]);
const AUTH_REQUIRED_VIEWS = new Set([
  "arena", "boss", "skilltree", "pet", "cards", "war", "shop", "crime",
  "speedrun", "timemachine", "heatmap", "voice", "terminal",
  "home", "projectNew", "teams", "notifications", "dm", "settings", "saved",
]);

// ── SSR SEO block ──────────────────────────────────────────────
// The app is a client-side SPA: crawlers and screen readers get this
// server-rendered Persian summary straight from the raw HTML (client
// components still SSR in App Router). Rendered in EVERY state —
// including the pre-auth boot screen — so raw HTML always carries it.
// Kept short and truthful — mirrors what the landing actually offers.
function SeoStaticBlock() {
  return (
    <>
      <div className="sr-only">
        <h1>تکا نکسوس (TEKA NEXUS)</h1>
        <p>
          تکا نکسوس یک آکادمی رایگان برنامه‌نویسی و شبکه اجتماعی تکنولوژی است:
          پایتون و توسعه وب را از صفر با درس‌های تعاملی، آزمون و گواهینامه یاد
          بگیر، هم‌تیمی برای پروژه‌های واقعی پیدا کن و مهارتت را با سیستم
          اعتبار تأییدشده اثبات کن.
        </p>
        <ul>
          <li>آکادمی تکا: آموزش رایگان پایتون، HTML و CSS با گواهینامه</li>
          <li>پروژه‌ها: پیدا کردن هم‌تیمی و ساخت پروژه واقعی</li>
          <li>اعتبار تأییدشده: اثبات مهارت با امضای دیجیتال</li>
        </ul>
        <p lang="en" dir="ltr">
          TEKA NEXUS is a free programming academy and a social platform where
          developers learn Python and web development, find teammates, and
          build real projects together.
        </p>
      </div>
      <noscript>
        <div style={{ padding: "2rem", direction: "rtl" }}>
          <h1>تکا نکسوس (TEKA NEXUS)</h1>
          <p>
            تکا نکسوس یک آکادمی رایگان برنامه‌نویسی و شبکه اجتماعی تکنولوژی
            است. پایتون و توسعه وب را رایگان یاد بگیر، هم‌تیمی پیدا کن و
            پروژه‌ی واقعی بساز.
          </p>
          <p>
            برای استفاده از سایت، جاوااسکریپت را فعال کن یا به نسخه اپلیکیشن
            مایکت سر بزن.
          </p>
        </div>
      </noscript>
    </>
  );
}

// ── Cinematic boot sequence ────────────────────────────────────
// A living neural network (canvas), orbiting logo rings, a glowing TEKA
// wordmark, a terminal-style boot log and a progress readout. Rendered while
// the session is restored — the first thing every visitor sees.
const BOOT_LINES = [
  "INITIALIZING NEXUS CORE",
  "LINKING NEURAL NODES",
  "LOADING ACADEMY GRID — 300 LESSONS",
  "SYNCING COMMUNITY PULSE",
  "CALIBRATING SKILL ENGINE",
  "ACCESS GRANTED",
];

// The boot show always plays at least this long — the user asked for a full
// 8-second cinematic intro (both boot + post-signup portal).
const BOOT_MIN_MS = 8000;

function NexusCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = 64;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
      r: Math.random() * 1.5 + 0.4,
      c: Math.random() > 0.5 ? "34,211,238" : "167,139,250",
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * 0.22;
            ctx.strokeStyle = "#22d3ee";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = `rgb(${p.c})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    if (reduced) draw();
    else raf = requestAnimationFrame(draw);
    // one static frame is fine for reduced motion — cancel immediately
    if (reduced) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

function BootScreen() {
  const [pct, setPct] = useState(0);
  const [shown, setShown] = useState(1);

  useEffect(() => {
    // Progress rides a 8s curve: slow cinematic ramp to ~97%, then holds.
    const t0 = Date.now();
    const pctId = setInterval(() => {
      const elapsed = Date.now() - t0;
      const target = Math.min(97, Math.floor((elapsed / (BOOT_MIN_MS - 600)) * 97));
      setPct((v) => Math.max(v, Math.min(97, target + Math.floor(Math.random() * 2))));
    }, 110);
    const lineId = setInterval(() => setShown((n) => Math.min(BOOT_LINES.length, n + 1)), 1150);
    return () => {
      clearInterval(pctId);
      clearInterval(lineId);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#04060e]">
      <NexusCanvas />
      {/* ambient glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/[0.13] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[12%] h-72 w-72 rounded-full bg-violet-500/[0.12] blur-3xl"
      />
      {/* subtle CRT scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, #fff 2px 3px)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        {/* logo with orbiting rings */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full border border-cyan-400/20"
            style={{ borderTopColor: "rgba(34,211,238,0.7)" }}
          />
          <div
            aria-hidden
            className="absolute inset-3 animate-[spin_6s_linear_infinite_reverse] rounded-full border border-violet-400/20"
            style={{ borderBottomColor: "rgba(167,139,250,0.7)" }}
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
          >
            <LogoMark size={64} />
          </motion.div>
        </div>

        {/* glowing wordmark */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <h2
            className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text font-display text-4xl font-black tracking-[0.35em] text-transparent"
            style={{ filter: "drop-shadow(0 0 22px rgba(34,211,238,0.45))" }}
          >
            TEKA
          </h2>
          <p className="mt-1.5 font-mono text-[11px] tracking-[0.55em] text-muted-foreground">
            N E X U S
          </p>
        </motion.div>

        {/* terminal boot log */}
        <div dir="ltr" className="h-28 w-64 font-mono text-[10px] leading-relaxed text-cyan-200/70 sm:w-72">
          {BOOT_LINES.slice(0, shown).map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: i === shown - 1 ? 1 : 0.38, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-cyan-400">▸</span>
              {line}
              {i === shown - 1 && shown < BOOT_LINES.length ? (
                <span className="text-cyan-400">▊</span>
              ) : (
                <span className="text-emerald-400">✓</span>
              )}
            </motion.p>
          ))}
        </div>

        {/* progress readout */}
        <div className="w-64 sm:w-72">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-[width] duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div
            dir="ltr"
            className="mt-1.5 flex justify-between font-mono text-[9px] tracking-widest text-muted-foreground"
          >
            <span>CONNECTING TO THE NEXUS…</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>

      {/* bottom teaser strip */}
      <div
        dir="ltr"
        className="absolute bottom-6 z-10 flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-muted-foreground/70"
      >
        <span>300 LESSONS</span>
        <span className="text-cyan-400/60">·</span>
        <span>4 COURSES</span>
        <span className="text-violet-400/60">·</span>
        <span>100% FREE</span>
      </div>
    </div>
  );
}

export default function Page() {
  useInitLocale();

  const view = useApp((s) => s.view);
  const user = useApp((s) => s.user);
  const authChecked = useApp((s) => s.authChecked);
  const navigate = useApp((s) => s.navigate);
  const setUser = useApp((s) => s.setUser);
  const setAuthChecked = useApp((s) => s.setAuthChecked);
  const t = useT();

  // Minimum boot-show duration — the cinematic intro always plays ~8s.
  const [bootMinDone, setBootMinDone] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setBootMinDone(true), BOOT_MIN_MS);
    return () => clearTimeout(id);
  }, []);

  // Restore session on boot (retries — a cold-compiled API route can 500 once).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await get<{ user: SessionUser | null }>("/api/auth/me");
          if (cancelled) return;
          setUser(res.user);
          break;
        } catch {
          if (cancelled) return;
          if (attempt < 2) await new Promise((r) => setTimeout(r, 600));
        }
      }
      if (!cancelled) setAuthChecked(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [setUser, setAuthChecked]);

  // OAuth return feedback (Google redirect lands on "/" with query params).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get("authError");
    if (err === "google_failed") toast.error(t("auth.err.googleFailed"));
    else if (err === "google_state") toast.error(t("auth.err.googleState"));
    else if (err === "google_disabled") toast.error(t("auth.err.googleNotConfigured"));
    const welcomed = params.get("welcome") === "google";
    if (welcomed) toast.success(t("auth.portal.secured"));
    if (err || welcomed) {
      params.delete("authError");
      params.delete("welcome");
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (params.toString() ? `?${params}` : ""),
      );
    }
  }, [t]);

  // Routing rules after auth state resolves:
  // - logged-in users don't see the marketing landing — they go home
  // - authed + onboarding incomplete → force onboarding (except during auth screens)
  // - auth-required views as guest → landing
  useEffect(() => {
    if (!authChecked) return;
    const name = view.name;
    if (user && name === "landing") {
      navigate({ name: "home" });
      return;
    }
    if (user && !user.onboardingCompleted && !AUTHOptional_VIEWS.has(name)) {
      navigate({ name: "onboarding" });
      return;
    }
    if (!user && AUTH_REQUIRED_VIEWS.has(name)) {
      navigate({ name: "landing" });
    }
  }, [authChecked, user, view.name, navigate]);

  if (!authChecked || !bootMinDone)
    return (
      <TekaDirectionProvider>
        <SeoStaticBlock />
        <BootScreen />
      </TekaDirectionProvider>
    );

  let content: React.ReactNode;

  switch (view.name) {
    case "landing":
      content = <LandingView />;
      break;
    case "login":
      content = <AuthView mode="login" />;
      break;
    case "signup":
      content = <AuthView mode="signup" />;
      break;
    case "onboarding":
      content = <OnboardingView />;
      break;
    case "arena":
      content = <ArenaHubView />;
      break;
    case "about":
      content = <AboutView />;
      break;
    case "home":
      content = <HomeView />;
      break;
    case "explore":
      content = <ExploreView />;
      break;
    case "live":
      content = <LiveView />;
      break;
    case "projectNew":
      content = <ProjectNewView />;
      break;
    case "project":
      content = <ProjectView key={view.slug} slug={view.slug} fileId={view.fileId} initialTab={view.tab} />;
      break;
    case "workspaceHub":
      content = <WorkspaceHubView />;
      break;
    case "teams":
      content = <TeamsView />;
      break;
    case "notifications":
      content = <NotificationsView />;
      break;
    case "dm":
      content = <DmView key={view.conversationId ?? "list"} initialConversationId={view.conversationId} />;
      break;
    case "profile":
      content = <ProfileView key={view.username} username={view.username} />;
      break;
    case "settings":
      content = <SettingsView tab={view.tab} />;
      break;
    case "saved":
      content = <SavedView />;
      break;
    case "academy":
      content = <AcademyView key={`${view.course ?? ""}:${view.lesson ?? ""}`} courseSlug={view.course} lessonId={view.lesson} />;
      break;
    case "academyPortal":
      content = <AcademyPortalView key={view.section ?? "hub"} section={view.section} />;
      break;
    case "founder":
      content = <FounderView />;
      break;
    default: {
      // Arena games are first-class views resolved through the registry.
      const game = getGame(view.name);
      if (game) {
        const Game = game.component;
        content = (
          <GameShell game={game}>
            <Game />
          </GameShell>
        );
      } else {
        content = <LandingView />;
      }
    }
  }

  const shellViews = new Set([
    "home", "explore", "live", "workspaceHub", "projectNew", "project", "teams", "notifications", "dm", "profile", "settings", "saved", "academy", "academyPortal", "founder",
    "arena", "boss", "skilltree", "pet", "cards", "war", "shop", "crime", "speedrun", "timemachine", "heatmap", "voice", "terminal",
  ]);
  const inShell = shellViews.has(view.name);

  const viewKey =
    view.name +
    (view.name === "project" ? `:${view.slug}:${view.tab ?? ""}` : "") +
    (view.name === "profile" ? `:${view.username}` : "") +
    (view.name === "dm" ? `:${view.conversationId ?? ""}` : "") +
    (view.name === "settings" ? `:${view.tab ?? ""}` : "") +
    (view.name === "academy" ? `:${view.course ?? ""}:${view.lesson ?? ""}` : "") +
    (view.name === "academyPortal" ? `:${view.section ?? ""}` : "");

  return (
    <TekaDirectionProvider>
    <MotionRoot>
      <SeoStaticBlock />
      <div className="min-h-screen flex flex-col">
        {inShell ? (
          <AppShell>
            <PageTransition viewKey={viewKey}>{content}</PageTransition>
          </AppShell>
        ) : (
          <main className="flex-1 flex flex-col">
            <PageTransition viewKey={viewKey}>{content}</PageTransition>
          </main>
        )}
        <SearchDialog />
        <EnterPortal />
      </div>
    </MotionRoot>
    </TekaDirectionProvider>
  );
}
