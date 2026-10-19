"use client";

// TEKA NEXUS — root SPA.
// The whole app lives on "/" — views are switched through the zustand router
// (src/lib/store.ts). See docs/FRONTEND_GUIDE.md + docs/API_CONTRACT.md.

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import { get } from "@/lib/api";
import { SessionUser } from "@/lib/store";
import { useInitLocale } from "@/lib/i18n/store";

import { LandingView } from "@/components/landing/landing-view";
import { AuthView } from "@/components/auth/auth-view";
import { OnboardingView } from "@/components/onboarding/onboarding-view";
import { AppShell, SearchDialog } from "@/components/shell/app-shell";
import { HomeView } from "@/views/home-view";
import { ExploreView } from "@/views/explore-view";
import { ProjectNewView } from "@/views/project-new-view";
import { ProjectView } from "@/views/project-view";
import { TeamsView } from "@/views/teams-view";
import { ProfileView } from "@/views/profile-view";
import { NotificationsView } from "@/views/notifications-view";
import { SettingsView } from "@/views/settings-view";
import { SavedView } from "@/views/saved-view";
import { AcademyView } from "@/views/academy-view";
import { AcademyPortalView } from "@/views/academy-portal-view";
import { FounderView } from "@/views/founder-view";
import { LogoMark } from "@/components/brand/logo";
import { MotionRoot, PageTransition } from "@/components/shared/motion";

const AUTHOptional_VIEWS = new Set(["landing", "login", "signup", "onboarding"]);
const AUTH_REQUIRED_VIEWS = new Set(["home", "projectNew", "teams", "notifications", "settings", "saved"]);

function BootScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <LogoMark size={48} />
      </motion.div>
      <motion.div
        className="h-0.5 w-36 overflow-hidden rounded-full bg-white/[0.06]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
          animate={{ x: ["-120%", "360%"] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.p
        className="font-mono text-xs text-muted-foreground tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.45, 1] }}
        transition={{ delay: 0.25, duration: 1.4, repeat: Infinity, repeatDelay: 0.4 }}
      >
        Connecting to the Nexus…
      </motion.p>
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

  if (!authChecked) return <BootScreen />;

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
    case "home":
      content = <HomeView />;
      break;
    case "explore":
      content = <ExploreView />;
      break;
    case "projectNew":
      content = <ProjectNewView />;
      break;
    case "project":
      content = <ProjectView key={view.slug} slug={view.slug} />;
      break;
    case "teams":
      content = <TeamsView />;
      break;
    case "notifications":
      content = <NotificationsView />;
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
    default:
      content = <LandingView />;
  }

  const shellViews = new Set(["home", "explore", "projectNew", "project", "teams", "notifications", "profile", "settings", "saved", "academy", "academyPortal", "founder"]);
  const inShell = shellViews.has(view.name);

  const viewKey =
    view.name +
    (view.name === "project" ? `:${view.slug}:${view.tab ?? ""}` : "") +
    (view.name === "profile" ? `:${view.username}` : "") +
    (view.name === "settings" ? `:${view.tab ?? ""}` : "") +
    (view.name === "academy" ? `:${view.course ?? ""}:${view.lesson ?? ""}` : "") +
    (view.name === "academyPortal" ? `:${view.section ?? ""}` : "");

  return (
    <MotionRoot>
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
      </div>
    </MotionRoot>
  );
}
