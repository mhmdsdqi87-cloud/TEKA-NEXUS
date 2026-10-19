"use client";

// TEKA NEXUS — AuthView (Task 2-a).
// Login / signup split view: brand panel (desktop) + form card.
// Submit flows hit the real /api/auth endpoints and update the session store.

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Compass, Eye, EyeOff, Loader2, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoMark, Wordmark } from "@/components/brand/logo";
import {
  FadeIn,
  SPRING,
  Stagger,
  StaggerItem,
  TapScale,
  staggerChild,
  staggerParent,
} from "@/components/shared/motion";
import { useApp, type SessionUser } from "@/lib/store";
import { post, setSessionToken } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const USERNAME_RE = /^[a-z0-9_]{3,24}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

// Brand bullet icon boxes settle with a tiny spring after each bullet rises.
const bulletIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 18, delay: 0.16 },
  },
};

export function AuthView({ mode }: { mode: "login" | "signup" }) {
  const navigate = useApp((s) => s.navigate);
  const setUser = useApp((s) => s.setUser);
  const t = useT();

  const BRAND_BULLETS: { icon: typeof Compass; title: string; body: string }[] = [
    {
      icon: Compass,
      title: t("auth.bullets.discovery.title"),
      body: t("auth.bullets.discovery.body"),
    },
    {
      icon: Users,
      title: t("auth.bullets.teams.title"),
      body: t("auth.bullets.teams.body"),
    },
    {
      icon: ShieldCheck,
      title: t("auth.bullets.reputation.title"),
      body: t("auth.bullets.reputation.body"),
    },
  ];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const usernameValid = USERNAME_RE.test(username);
  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    if (isSignup) {
      if (!usernameValid) {
        toast.error(t("auth.err.username"));
        return;
      }
      if (password.length < 8) {
        toast.error(t("auth.err.passwordShort"));
        return;
      }
    }
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      toast.error(t("auth.err.emailInvalid"));
      return;
    }
    if (!password) {
      toast.error(t("auth.err.passwordRequired"));
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        const res = await post<{ user: SessionUser; token: string }>("/api/auth/register", {
          email: email.trim(),
          password,
          username,
        });
        setSessionToken(res.token);
        setUser(res.user);
        navigate({ name: "onboarding" });
      } else {
        const res = await post<{ user: SessionUser; token: string }>("/api/auth/login", {
          email: email.trim(),
          password,
        });
        setSessionToken(res.token);
        setUser(res.user);
        navigate(res.user.onboardingCompleted ? { name: "home" } : { name: "onboarding" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("Email already registered")) toast.error(t("auth.err.emailTaken"));
      else if (msg.includes("Username already taken")) toast.error(t("auth.err.usernameTaken"));
      else if (msg.includes("Invalid email or password")) toast.error(t("auth.err.invalidCredentials"));
      else toast.error(msg || t("common.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* ── LEFT brand panel (desktop only) ── */}
      <aside
        aria-hidden="true"
        className="relative hidden flex-col justify-between overflow-hidden border-r border-white/[0.06] bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-violet-500/[0.12] p-10 lg:flex xl:p-14"
      >
        <motion.div
          aria-hidden
          className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ y: [0, 24, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
          animate={{ y: [0, -24, 0], scale: [1.12, 1, 1.12] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex items-center gap-2.5">
          <LogoMark size={34} />
          <Wordmark className="text-xl" />
        </div>

        <FadeIn className="relative" delay={0.1}>
          <p className="font-display text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            {t("auth.brand.p1")}
            <span className="text-gradient">{t("auth.brand.p2")}</span>
            {t("auth.brand.p3")}
          </p>
          <p className="mt-4 max-w-md text-muted-foreground">
            {t("auth.brandLine")}
          </p>
        </FadeIn>

        <motion.ul
          className="relative space-y-4"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          {BRAND_BULLETS.map((b) => (
            <motion.li key={b.title} variants={staggerChild} className="flex items-start gap-3">
              <motion.span
                variants={bulletIconVariants}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]"
              >
                <b.icon className="h-4 w-4 text-cyan-300" />
              </motion.span>
              <span>
                <span className="block text-sm font-medium text-foreground">{b.title}</span>
                <span className="block text-xs text-muted-foreground">{b.body}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </aside>

      {/* ── RIGHT form panel ── */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-8">
        <div className="w-full max-w-md">
          <FadeIn>
            <Button
              variant="ghost"
              className="-ml-2 h-10 text-muted-foreground hover:text-foreground"
              onClick={() => navigate({ name: "landing" })}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("auth.backHome")}
            </Button>
          </FadeIn>

          {/* mobile brand row (left panel is hidden on small screens) */}
          <FadeIn delay={0.06} className="mt-4 flex items-center gap-2 lg:hidden">
            <LogoMark size={26} />
            <Wordmark className="text-base" />
          </FadeIn>

          <FadeIn delay={0.08} y={18}>
            <Card className="glass-card mt-4 rounded-2xl border-white/[0.07] py-6">
            <CardHeader>
              <CardTitle className="font-display text-2xl font-bold tracking-tight">
                {isSignup ? t("auth.signupTitle") : t("auth.loginTitle")}
              </CardTitle>
              <CardDescription>
                {isSignup ? t("auth.signupSubtitle") : t("auth.loginSubtitle")}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Fields rise in a light stagger as the card lands */}
              <form onSubmit={handleSubmit} noValidate>
                <Stagger className="space-y-4" gap={0.07} delayChildren={0.18}>
                  {isSignup && (
                    <StaggerItem className="space-y-2">
                      <Label htmlFor="username">{t("auth.username")}</Label>
                      <Input
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder="nexus_builder"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                        className={cn(
                          "h-11",
                          username.length > 0 &&
                            (usernameValid ? "border-emerald-400/50" : "border-rose-400/50")
                        )}
                      />
                      <p
                        className={cn(
                          "text-xs",
                          username.length === 0
                            ? "text-muted-foreground"
                            : usernameValid
                              ? "text-emerald-300/90"
                              : "text-rose-300/90"
                        )}
                      >
                        {t("auth.usernameHint")}
                      </p>
                    </StaggerItem>
                  )}

                  <StaggerItem className="space-y-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@devmail.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </StaggerItem>

                  <StaggerItem className="space-y-2">
                    <Label htmlFor="password">{t("auth.password")}</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        placeholder={isSignup ? t("auth.passwordPlaceholderSignup") : t("auth.passwordPlaceholderLogin")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                        className="focus-glow absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={showPassword ? "eye-off" : "eye-on"}
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.55 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.55 }}
                            transition={{ duration: 0.14, ease: "easeOut" }}
                            className="flex"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </div>
                    {isSignup && (
                      <p className="text-xs text-muted-foreground">{t("auth.passwordMinHint")}</p>
                    )}
                  </StaggerItem>

                  <StaggerItem>
                    <TapScale className="w-full">
                      <Button type="submit" disabled={loading} className="btn-hero h-11 w-full">
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {isSignup ? t("auth.creatingAccount") : t("auth.signingIn")}
                          </>
                        ) : isSignup ? (
                          t("common.signUp")
                        ) : (
                          t("common.signIn")
                        )}
                      </Button>
                    </TapScale>
                  </StaggerItem>
                </Stagger>
              </form>

              <p className="mt-5 text-center text-sm text-muted-foreground">
                {isSignup ? t("auth.haveAccount") : t("auth.newToTeka")}{" "}
                <button
                  type="button"
                  onClick={() => navigate({ name: isSignup ? "login" : "signup" })}
                  className="focus-glow rounded px-0.5 font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  {isSignup ? t("common.signIn") : t("auth.createAccountLink")}
                </button>
              </p>
            </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
