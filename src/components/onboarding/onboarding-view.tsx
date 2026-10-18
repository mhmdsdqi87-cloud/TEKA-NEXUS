"use client";

// TEKA NEXUS — OnboardingView (Task 2-a).
// 4-step profile setup wizard: Identity, Skills, Interests, Goals.
// Posts the final payload to /api/onboarding. Steps 2-4 can be skipped;
// skipped sections get a sensible default at submit time so the backend
// nonempty-array requirement is always satisfied silently.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Brain,
  Check,
  Cpu,
  Gamepad2,
  GitBranch,
  Globe,
  Loader2,
  Palette,
  Shield,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogoMark, Wordmark } from "@/components/brand/logo";
import { UserAvatar } from "@/components/shared/atoms";
import { useApp, type SessionUser } from "@/lib/store";
import { post } from "@/lib/api";
import { AVATAR_GRADIENTS, AVATAR_GRADIENT_KEYS, GOALS, LIMITS, PROJECT_CATEGORIES, SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Icon name → component lookup for PROJECT_CATEGORIES (spec §7).
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Brain,
  Wrench,
  GitBranch,
  Gamepad2,
  Shield,
  Boxes,
  Cpu,
  BarChart3,
  Palette,
  Sparkles,
};

const STEPS = [
  { label: "Identity", hint: "Who you are on TEKA NEXUS" },
  { label: "Skills", hint: "What you can contribute" },
  { label: "Interests", hint: "What you want to work on" },
  { label: "Goals", hint: "What you are here to do" },
] as const;

// Silent fallbacks so the backend always receives nonempty arrays.
const FALLBACK_SKILL = "other";
const FALLBACK_INTEREST = "OTHER_TECHNOLOGY";
const FALLBACK_GOAL = "discover";

export function OnboardingView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const setUser = useApp((s) => s.setUser);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [bio, setBio] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteError, setWebsiteError] = useState(false);
  const [avatarColor, setAvatarColor] = useState<string>(
    user && AVATAR_GRADIENTS[user.avatarColor] ? user.avatarColor : "cyan"
  );

  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Sync prefill if the session arrives after first render.
  useEffect(() => {
    if (!user) return;
    setDisplayName((d) => d || user.displayName || "");
    setAvatarColor((c) => (c === "cyan" && AVATAR_GRADIENTS[user.avatarColor] ? user.avatarColor : c));
  }, [user]);

  function goTo(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggle(list: string[], setList: (v: string[]) => void, slug: string) {
    setList(list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]);
  }

  function handleIdentityContinue() {
    const name = displayName.trim();
    if (name.length < 1 || name.length > 60) {
      toast.error("Display name is required (1–60 characters).");
      return;
    }
    const url = websiteUrl.trim();
    if (url && !/^https?:\/\/\S+$/i.test(url)) {
      setWebsiteError(true);
      toast.error("Website must be a valid http(s) URL, e.g. https://your-site.dev");
      return;
    }
    setWebsiteError(false);
    goTo(1);
  }

  async function submit() {
    if (!user || submitting) return;
    const name = displayName.trim();
    if (name.length < 1 || name.length > 60) {
      toast.error("Display name is required (1–60 characters).");
      goTo(0);
      return;
    }
    setSubmitting(true);
    try {
      const res = await post<{ user: SessionUser }>("/api/onboarding", {
        displayName: name,
        bio: bio.trim(),
        websiteUrl: websiteUrl.trim(),
        avatarColor,
        skills: skills.length ? skills : [FALLBACK_SKILL],
        interests: interests.length ? interests : [FALLBACK_INTEREST],
        goals: goals.length ? goals : [FALLBACK_GOAL],
      });
      setUser(res.user);
      toast.success("Welcome to TEKA NEXUS");
      navigate({ name: "home" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Guard: no session yet ──
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="glass-card w-full max-w-sm rounded-2xl p-8 text-center">
          <LogoMark size={40} className="mx-auto" />
          <h1 className="mt-4 font-display text-xl font-semibold">Sign in to set up your profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Onboarding is part of the account flow — create or access your account first.
          </p>
          <Button className="btn-hero mt-6 h-11 w-full" onClick={() => navigate({ name: "login" })}>
            Go to sign in
          </Button>
        </div>
      </div>
    );
  }

  const previewUser = {
    username: user.username,
    displayName: displayName.trim() || user.displayName,
    avatarColor,
    avatarUrl: null as string | null,
  };

  const goalNames = (goals.length ? goals : [FALLBACK_GOAL])
    .map((g) => GOALS.find((x) => x.slug === g)?.name ?? g);
  const skillNames = (skills.length ? skills : [FALLBACK_SKILL])
    .map((s) => SKILLS.find((x) => x.slug === s)?.name ?? s);
  const interestNames = (interests.length ? interests : [FALLBACK_INTEREST])
    .map((c) => PROJECT_CATEGORIES.find((x) => x.slug === c)?.name ?? c);

  return (
    <div className="flex min-h-screen flex-col">
      {/* top bar */}
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2.5 px-4 sm:px-6">
          <LogoMark size={24} />
          <Wordmark className="text-base" compact />
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Profile setup
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {/* mobile progress */}
        <div className="mb-8 md:hidden">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{STEPS[step].label}</span>
            <span className="font-mono">Step {step + 1} of {STEPS.length}</span>
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {STEPS.map((s, i) => (
              <span
                key={s.label}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= step ? "bg-cyan-400/70" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-10">
          {/* left progress rail (desktop) */}
          <nav aria-label="Onboarding steps" className="hidden w-56 shrink-0 md:block">
            <ol className="space-y-1.5">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <li key={s.label}>
                    <button
                      type="button"
                      disabled={i >= step}
                      onClick={() => i < step && goTo(i)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                        active
                          ? "border border-cyan-400/25 bg-cyan-500/[0.07]"
                          : "border border-transparent hover:bg-white/[0.03]",
                        i < step ? "cursor-pointer" : "cursor-default"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                          done
                            ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300"
                            : active
                              ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200"
                              : "border-white/10 bg-white/[0.03] text-muted-foreground"
                        )}
                      >
                        {done ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className={cn("block text-sm font-medium", active ? "text-foreground" : "text-foreground/80")}>
                          {s.label}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">{s.hint}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* step content */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 * dir }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="min-h-[380px]"
              >
                {/* ── STEP 1: Identity ── */}
                {step === 0 && (
                  <section aria-label="Identity" className="space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        Set up your identity
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        This is how other builders will see you across projects and teams.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display name *</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        maxLength={60}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Maya Chen"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="bio">Bio</Label>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {bio.length}/{LIMITS.bio}
                        </span>
                      </div>
                      <Textarea
                        id="bio"
                        value={bio}
                        maxLength={LIMITS.bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="What do you build? What are you looking for?"
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl">Website</Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => {
                          setWebsiteUrl(e.target.value);
                          setWebsiteError(false);
                        }}
                        placeholder="https://your-site.dev"
                        aria-invalid={websiteError}
                        className={cn("h-11", websiteError && "border-rose-400/60")}
                      />
                      <p className={cn("text-xs", websiteError ? "text-rose-300/90" : "text-muted-foreground")}>
                        Optional — must be a full http(s) URL.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Avatar gradient</Label>
                      <div className="flex flex-wrap items-center gap-3">
                        <UserAvatar user={previewUser} size={48} />
                        {AVATAR_GRADIENT_KEYS.map((key) => (
                          <button
                            key={key}
                            type="button"
                            aria-label={`Avatar gradient: ${key}`}
                            aria-pressed={avatarColor === key}
                            onClick={() => setAvatarColor(key)}
                            className={cn(
                              "h-10 w-10 rounded-full bg-gradient-to-br transition-all",
                              AVATAR_GRADIENTS[key],
                              avatarColor === key
                                ? "scale-105 ring-2 ring-cyan-300 ring-offset-2 ring-offset-[#08080d]"
                                : "opacity-70 hover:opacity-100"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end border-t border-white/[0.06] pt-5">
                      <Button className="btn-hero h-11 px-6" onClick={handleIdentityContinue}>
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </section>
                )}

                {/* ── STEP 2: Skills ── */}
                {step === 1 && (
                  <section aria-label="Skills" className="space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        What can you do?
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Pick the skills you can bring to a team. {skills.length > 0 ? `${skills.length} selected.` : "Select at least one — or skip for now."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {SKILLS.map((s) => {
                        const active = skills.includes(s.slug);
                        return (
                          <button
                            key={s.slug}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(skills, setSkills, s.slug)}
                            className={cn(
                              "flex min-h-[44px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                              active
                                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-100"
                                : "border-white/[0.07] bg-white/[0.02] text-foreground/85 hover:border-white/20"
                            )}
                          >
                            <span>{s.name}</span>
                            {active && <Check className="h-4 w-4 shrink-0 text-cyan-300" />}
                          </button>
                        );
                      })}
                    </div>

                    <WizardActions
                      onBack={() => goTo(0)}
                      skipLabel="Skip for now"
                      onSkip={() => goTo(2)}
                      nextLabel="Continue"
                      onNext={() => goTo(2)}
                    />
                  </section>
                )}

                {/* ── STEP 3: Interests ── */}
                {step === 2 && (
                  <section aria-label="Interests" className="space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        What do you want to work on?
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        We tailor discovery to your interests. {interests.length > 0 ? `${interests.length} selected.` : "Pick at least one — or skip for now."}
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {PROJECT_CATEGORIES.map((c) => {
                        const Icon = CATEGORY_ICONS[c.icon] ?? Sparkles;
                        const active = interests.includes(c.slug);
                        return (
                          <button
                            key={c.slug}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(interests, setInterests, c.slug)}
                            className={cn(
                              "flex min-h-[44px] items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                              active
                                ? "border-cyan-400/50 bg-cyan-500/10"
                                : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"
                            )}
                          >
                            <Icon className={cn("h-5 w-5 shrink-0", active ? "text-cyan-300" : "text-muted-foreground")} />
                            <span className="text-sm font-medium">{c.name}</span>
                            {active && <Check className="ml-auto h-4 w-4 shrink-0 text-cyan-300" />}
                          </button>
                        );
                      })}
                    </div>

                    <WizardActions
                      onBack={() => goTo(1)}
                      skipLabel="Skip for now"
                      onSkip={() => goTo(3)}
                      nextLabel="Continue"
                      onNext={() => goTo(3)}
                    />
                  </section>
                )}

                {/* ── STEP 4: Goals + review ── */}
                {step === 3 && (
                  <section aria-label="Goals" className="space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        Why are you here?
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your goals shape recommendations and who reaches out to you.
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {GOALS.map((g) => {
                        const active = goals.includes(g.slug);
                        return (
                          <button
                            key={g.slug}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(goals, setGoals, g.slug)}
                            className={cn(
                              "flex min-h-[44px] items-center justify-between gap-2 rounded-lg border px-3.5 py-3 text-left text-sm transition-all",
                              active
                                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-100"
                                : "border-white/[0.07] bg-white/[0.02] text-foreground/85 hover:border-white/20"
                            )}
                          >
                            <span>{g.name}</span>
                            {active && <Check className="h-4 w-4 shrink-0 text-cyan-300" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* summary review */}
                    <div className="glass-card mt-2 rounded-xl p-5">
                      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        Profile preview
                      </h2>
                      <div className="mt-4 flex items-start gap-4">
                        <UserAvatar user={previewUser} size={52} />
                        <div className="min-w-0">
                          <p className="font-display text-lg font-semibold">
                            {displayName.trim() || user.displayName}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">@{user.username}</p>
                          {bio.trim() && (
                            <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{bio.trim()}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4">
                        <SummaryRow label="Skills" values={skillNames} />
                        <SummaryRow label="Interests" values={interestNames} />
                        <SummaryRow label="Goals" values={goalNames} />
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground/80">
                        Anything you skipped gets a sensible default so your profile still works.
                      </p>
                    </div>

                    <WizardActions
                      onBack={() => goTo(2)}
                      skipLabel="Skip"
                      onSkip={submit}
                      nextLabel="Finish"
                      onNext={submit}
                      nextLoading={submitting}
                      nextDisabled={submitting}
                    />
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Small local helpers ─────────────────────────────────────

function WizardActions({
  onBack,
  onSkip,
  skipLabel,
  onNext,
  nextLabel,
  nextLoading = false,
  nextDisabled = false,
}: {
  onBack: () => void;
  onSkip: () => void;
  skipLabel: string;
  onNext: () => void;
  nextLabel: string;
  nextLoading?: boolean;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
      <Button variant="ghost" className="h-11 text-muted-foreground hover:text-foreground" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="h-11 text-muted-foreground hover:text-foreground"
          onClick={onSkip}
          disabled={nextLoading}
        >
          {skipLabel}
        </Button>
        <Button className="btn-hero h-11 px-6" onClick={onNext} disabled={nextDisabled || nextLoading}>
          {nextLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              {nextLabel}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function SummaryRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => (
          <span
            key={v}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground/85"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
