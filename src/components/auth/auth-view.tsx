"use client";

// TEKA NEXUS — AuthView (Task 2-a).
// Login / signup split view: brand panel (desktop) + form card.
// Submit flows hit the real /api/auth endpoints and update the session store.

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Compass, Eye, EyeOff, Loader2, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoMark, Wordmark } from "@/components/brand/logo";
import { useApp, type SessionUser } from "@/lib/store";
import { post } from "@/lib/api";
import { cn } from "@/lib/utils";

const USERNAME_RE = /^[a-z0-9_]{3,24}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

const BRAND_BULLETS: { icon: typeof Compass; title: string; body: string }[] = [
  {
    icon: Compass,
    title: "Discovery that fits your stack",
    body: "Filter public projects by category, status, and the skills they need.",
  },
  {
    icon: Users,
    title: "Teams formed by real requests",
    body: "Apply with a role and introduction; owners review every request.",
  },
  {
    icon: ShieldCheck,
    title: "Reputation you can trust",
    body: "XP and reputation are awarded by the server for verified contributions.",
  },
];

export function AuthView({ mode }: { mode: "login" | "signup" }) {
  const navigate = useApp((s) => s.navigate);
  const setUser = useApp((s) => s.setUser);

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
        toast.error("Username must be 3–24 characters: lowercase letters, numbers, underscores.");
        return;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters.");
        return;
      }
    }
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        const res = await post<{ user: SessionUser }>("/api/auth/register", {
          email: email.trim(),
          password,
          username,
        });
        setUser(res.user);
        navigate({ name: "onboarding" });
      } else {
        const res = await post<{ user: SessionUser }>("/api/auth/login", {
          email: email.trim(),
          password,
        });
        setUser(res.user);
        navigate(res.user.onboardingCompleted ? { name: "home" } : { name: "onboarding" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
        <div aria-hidden className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div aria-hidden className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <LogoMark size={34} />
          <Wordmark className="text-xl" />
        </div>

        <div className="relative">
          <p className="font-display text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Imagine. <span className="text-gradient">Build.</span> Connect.
          </p>
          <p className="mt-4 max-w-md text-muted-foreground">
            The developer network where projects at every stage — idea, prototype, release — meet the
            people ready to build them.
          </p>
        </div>

        <ul className="relative space-y-4">
          {BRAND_BULLETS.map((b) => (
            <li key={b.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <b.icon className="h-4 w-4 text-cyan-300" />
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">{b.title}</span>
                <span className="block text-xs text-muted-foreground">{b.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── RIGHT form panel ── */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-8">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            className="-ml-2 h-10 text-muted-foreground hover:text-foreground"
            onClick={() => navigate({ name: "landing" })}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>

          {/* mobile brand row (left panel is hidden on small screens) */}
          <div className="mt-4 flex items-center gap-2 lg:hidden">
            <LogoMark size={26} />
            <Wordmark className="text-base" />
          </div>

          <Card className="glass-card mt-4 rounded-2xl border-white/[0.07] py-6">
            <CardHeader>
              <CardTitle className="font-display text-2xl font-bold tracking-tight">
                {isSignup ? "Create your account" : "Welcome back"}
              </CardTitle>
              <CardDescription>
                {isSignup
                  ? "Start publishing projects and finding collaborators. Free during beta."
                  : "Sign in to continue building."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {isSignup && (
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
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
                      3–24 chars, letters/numbers/underscores
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={isSignup ? "new-password" : "current-password"}
                      placeholder={isSignup ? "At least 8 characters" : "Your password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="focus-glow absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {isSignup && (
                    <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
                  )}
                </div>

                <Button type="submit" disabled={loading} className="btn-hero h-11 w-full">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isSignup ? "Creating account…" : "Signing in…"}
                    </>
                  ) : isSignup ? (
                    "Create account"
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              {mode === "login" && (
                <div className="mt-5 rounded-lg border border-violet-400/20 bg-violet-500/[0.06] p-3.5">
                  <p className="text-xs font-medium text-violet-300">Preview demo account</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Explore the platform with seeded demo data. Password:{" "}
                    <span className="font-mono text-foreground/80">demo1234</span>
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2.5 h-9"
                    onClick={() => {
                      setEmail("maya@teka.dev");
                      setPassword("demo1234");
                    }}
                  >
                    Use maya@teka.dev
                  </Button>
                </div>
              )}

              <p className="mt-5 text-center text-sm text-muted-foreground">
                {isSignup ? "Already have an account?" : "New to TEKA NEXUS?"}{" "}
                <button
                  type="button"
                  onClick={() => navigate({ name: isSignup ? "login" : "signup" })}
                  className="focus-glow rounded px-0.5 font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  {isSignup ? "Sign in" : "Create an account"}
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
