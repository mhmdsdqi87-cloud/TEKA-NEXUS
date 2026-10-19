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
import {
  EASE,
  SPRING,
  Stagger,
  StaggerItem,
  TapScale,
  staggerChild,
} from "@/components/shared/motion";
import { useApp, type SessionUser } from "@/lib/store";
import { post } from "@/lib/api";
import { useT, useLabeled } from "@/lib/i18n";
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
  { key: "identity" },
  { key: "skills" },
  { key: "interests" },
  { key: "goals" },
] as const;

// Silent fallbacks so the backend always receives nonempty arrays.
const FALLBACK_SKILL = "other";
const FALLBACK_INTEREST = "OTHER_TECHNOLOGY";
const FALLBACK_GOAL = "discover";

export function OnboardingView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const setUser = useApp((s) => s.setUser);
  const t = useT();
  const lbl = useLabeled();

  const [step, setStep] = useState(0);

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
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggle(list: string[], setList: (v: string[]) => void, slug: string) {
    setList(list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]);
  }

  function handleIdentityContinue() {
    const name = displayName.trim();
    if (name.length < 1 || name.length > 60) {
      toast.error(t("onboarding.err.displayName"));
      return;
    }
    const url = websiteUrl.trim();
    if (url && !/^https?:\/\/\S+$/i.test(url)) {
      setWebsiteError(true);
      toast.error(t("onboarding.err.website"));
      return;
    }
    setWebsiteError(false);
    goTo(1);
  }

  async function submit() {
    if (!user || submitting) return;
    const name = displayName.trim();
    if (name.length < 1 || name.length > 60) {
      toast.error(t("onboarding.err.displayName"));
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
      toast.success(t("onboarding.toastWelcome"));
      navigate({ name: "home" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("onboarding.err.save"));
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
          <h1 className="mt-4 font-display text-xl font-semibold">{t("onboarding.guard.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("onboarding.guard.body")}
          </p>
          <Button className="btn-hero mt-6 h-11 w-full" onClick={() => navigate({ name: "login" })}>
            {t("onboarding.guard.cta")}
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
    .map((g) => lbl("common.goals", g, GOALS.find((x) => x.slug === g)?.name ?? g));
  const skillNames = (skills.length ? skills : [FALLBACK_SKILL])
    .map((s) => lbl("project.skills", s, SKILLS.find((x) => x.slug === s)?.name ?? s));
  const interestNames = (interests.length ? interests : [FALLBACK_INTEREST])
    .map((c) => lbl("project.categories", c, PROJECT_CATEGORIES.find((x) => x.slug === c)?.name ?? c));

  return (
    <div className="flex min-h-screen flex-col">
      {/* top bar */}
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2.5 px-4 sm:px-6">
          <LogoMark size={24} />
          <Wordmark className="text-base" compact />
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("onboarding.topbar")}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {/* mobile progress */}
        <div className="mb-8 md:hidden">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{t(`onboarding.steps.${STEPS[step].key}.label`)}</span>
            <span className="font-mono">{t("onboarding.stepOf", { n: step + 1, total: STEPS.length })}</span>
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {STEPS.map((s, i) => (
              <motion.span
                key={s.key}
                className={cn(
                  "h-1 flex-1 rounded-full",
                  i <= step ? "bg-cyan-400/70" : "bg-white/10"
                )}
                animate={{ scaleY: i <= step ? 1 : 0.55, opacity: i <= step ? 1 : 0.6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-10">
          {/* left progress rail (desktop) */}
          <nav aria-label={t("onboarding.stepsAria")} className="hidden w-56 shrink-0 md:block">
            <ol className="space-y-1.5">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      disabled={i >= step}
                      onClick={() => i < step && goTo(i)}
                      className={cn(
                        "relative flex w-full items-center gap-3 rounded-lg border border-transparent p-3 text-left transition-colors",
                        i < step ? "cursor-pointer hover:bg-white/[0.03]" : "cursor-default"
                      )}
                    >
                      {/* sliding step highlight (vertical slide between steps — RTL safe) */}
                      {active && (
                        <motion.span
                          layoutId="onboardingStepPill"
                          aria-hidden="true"
                          transition={SPRING}
                          className="absolute inset-0 rounded-lg border border-cyan-400/25 bg-cyan-500/[0.07]"
                        />
                      )}
                      <span
                        className={cn(
                          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                          done
                            ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300"
                            : active
                              ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200"
                              : "border-white/10 bg-white/[0.03] text-muted-foreground"
                        )}
                      >
                        {done ? (
                          <motion.span
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={SPRING}
                            className="flex"
                            aria-hidden="true"
                          >
                            <Check className="h-4 w-4" />
                          </motion.span>
                        ) : (
                          i + 1
                        )}
                      </span>
                      <span className="relative min-w-0">
                        <span className={cn("block text-sm font-medium", active ? "text-foreground" : "text-foreground/80")}>
                          {t(`onboarding.steps.${s.key}.label`)}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">{t(`onboarding.steps.${s.key}.hint`)}</span>
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.15, ease: "easeIn" } }}
                className="min-h-[380px]"
              >
                {/* ── STEP 1: Identity ── */}
                {step === 0 && (
                  <section aria-label={t("onboarding.steps.identity.label")}>
                    <Stagger className="space-y-6" gap={0.06} delayChildren={0.1}>
                      <StaggerItem>
                        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                          {t("onboarding.identity.title")}
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("onboarding.identity.subtitle")}
                        </p>
                      </StaggerItem>

                      <StaggerItem className="space-y-2">
                        <Label htmlFor="displayName">{t("onboarding.identity.displayName")}</Label>
                        <Input
                          id="displayName"
                          value={displayName}
                          maxLength={60}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder={t("onboarding.identity.displayNamePlaceholder")}
                          className="h-11"
                        />
                      </StaggerItem>

                      <StaggerItem className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="bio">{t("onboarding.identity.bio")}</Label>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {bio.length}/{LIMITS.bio}
                          </span>
                        </div>
                        <Textarea
                          id="bio"
                          value={bio}
                          maxLength={LIMITS.bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder={t("onboarding.identity.bioPlaceholder")}
                          rows={4}
                          className="resize-none"
                        />
                      </StaggerItem>

                      <StaggerItem className="space-y-2">
                        <Label htmlFor="websiteUrl">{t("onboarding.identity.website")}</Label>
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
                          {t("onboarding.identity.websiteHint")}
                        </p>
                      </StaggerItem>

                      <StaggerItem className="space-y-2">
                        <Label>{t("onboarding.identity.avatarGradient")}</Label>
                        <div className="flex flex-wrap items-center gap-3">
                          <UserAvatar user={previewUser} size={48} />
                          {AVATAR_GRADIENT_KEYS.map((key) => (
                            <motion.button
                              key={key}
                              type="button"
                              aria-label={t("onboarding.identity.avatarGradientAria", { name: key })}
                              aria-pressed={avatarColor === key}
                              onClick={() => setAvatarColor(key)}
                              whileTap={{ scale: 0.88 }}
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
                      </StaggerItem>

                      <StaggerItem>
                        <div className="flex items-center justify-end border-t border-white/[0.06] pt-5">
                          <Button className="btn-hero h-11 px-6" onClick={handleIdentityContinue}>
                            {t("onboarding.continue")}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </StaggerItem>
                    </Stagger>
                  </section>
                )}

                {/* ── STEP 2: Skills ── */}
                {step === 1 && (
                  <section aria-label={t("onboarding.steps.skills.label")} className="space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        {t("onboarding.skills.title")}
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t("onboarding.skills.subtitle")}{" "}
                        {skills.length > 0 ? t("onboarding.nSelected", { n: skills.length }) : t("onboarding.selectAtLeastOne")}
                      </p>
                    </div>

                    <Stagger className="grid grid-cols-2 gap-2 sm:grid-cols-3" gap={0.03} delayChildren={0.12}>
                      {SKILLS.map((s) => {
                        const active = skills.includes(s.slug);
                        return (
                          <motion.button
                            key={s.slug}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(skills, setSkills, s.slug)}
                            variants={staggerChild}
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              "flex min-h-[44px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                              active
                                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-100 scale-[1.02]"
                                : "border-white/[0.07] bg-white/[0.02] text-foreground/85 hover:border-white/20"
                            )}
                          >
                            <span>{lbl("project.skills", s.slug, s.name)}</span>
                            {active && (
                              <motion.span
                                initial={{ scale: 0.4, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={SPRING}
                                className="flex"
                              >
                                <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                              </motion.span>
                            )}
                          </motion.button>
                        );
                      })}
                    </Stagger>

                    <WizardActions
                      onBack={() => goTo(0)}
                      skipLabel={t("onboarding.skipForNow")}
                      onSkip={() => goTo(2)}
                      nextLabel={t("onboarding.continue")}
                      onNext={() => goTo(2)}
                    />
                  </section>
                )}

                {/* ── STEP 3: Interests ── */}
                {step === 2 && (
                  <section aria-label={t("onboarding.steps.interests.label")} className="space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        {t("onboarding.interests.title")}
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t("onboarding.interests.subtitle")}{" "}
                        {interests.length > 0 ? t("onboarding.nSelected", { n: interests.length }) : t("onboarding.pickAtLeastOne")}
                      </p>
                    </div>

                    <Stagger className="grid gap-2 sm:grid-cols-2" gap={0.03} delayChildren={0.12}>
                      {PROJECT_CATEGORIES.map((c) => {
                        const Icon = CATEGORY_ICONS[c.icon] ?? Sparkles;
                        const active = interests.includes(c.slug);
                        return (
                          <motion.button
                            key={c.slug}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(interests, setInterests, c.slug)}
                            variants={staggerChild}
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              "flex min-h-[44px] items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                              active
                                ? "border-cyan-400/50 bg-cyan-500/10 scale-[1.02]"
                                : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"
                            )}
                          >
                            <Icon className={cn("h-5 w-5 shrink-0", active ? "text-cyan-300" : "text-muted-foreground")} />
                            <span className="text-sm font-medium">{lbl("project.categories", c.slug, c.name)}</span>
                            {active && (
                              <motion.span
                                initial={{ scale: 0.4, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={SPRING}
                                className="ml-auto flex"
                              >
                                <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                              </motion.span>
                            )}
                          </motion.button>
                        );
                      })}
                    </Stagger>

                    <WizardActions
                      onBack={() => goTo(1)}
                      skipLabel={t("onboarding.skipForNow")}
                      onSkip={() => goTo(3)}
                      nextLabel={t("onboarding.continue")}
                      onNext={() => goTo(3)}
                    />
                  </section>
                )}

                {/* ── STEP 4: Goals + review ── */}
                {step === 3 && (
                  <section aria-label={t("onboarding.steps.goals.label")} className="space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        {t("onboarding.goals.title")}
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t("onboarding.goals.subtitle")}
                      </p>
                    </div>

                    <Stagger className="grid gap-2 sm:grid-cols-2" gap={0.03} delayChildren={0.12}>
                      {GOALS.map((g) => {
                        const active = goals.includes(g.slug);
                        return (
                          <motion.button
                            key={g.slug}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(goals, setGoals, g.slug)}
                            variants={staggerChild}
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              "flex min-h-[44px] items-center justify-between gap-2 rounded-lg border px-3.5 py-3 text-left text-sm transition-all",
                              active
                                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-100 scale-[1.02]"
                                : "border-white/[0.07] bg-white/[0.02] text-foreground/85 hover:border-white/20"
                            )}
                          >
                            <span>{lbl("common.goals", g.slug, g.name)}</span>
                            {active && (
                              <motion.span
                                initial={{ scale: 0.4, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={SPRING}
                                className="flex"
                              >
                                <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                              </motion.span>
                            )}
                          </motion.button>
                        );
                      })}
                    </Stagger>

                    {/* summary review */}
                    <div className="glass-card mt-2 rounded-xl p-5">
                      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        {t("onboarding.review.title")}
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
                      <Stagger className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4" gap={0.08} delayChildren={0.15}>
                        <StaggerItem>
                          <SummaryRow label={t("onboarding.review.skills")} values={skillNames} />
                        </StaggerItem>
                        <StaggerItem>
                          <SummaryRow label={t("onboarding.review.interests")} values={interestNames} />
                        </StaggerItem>
                        <StaggerItem>
                          <SummaryRow label={t("onboarding.review.goals")} values={goalNames} />
                        </StaggerItem>
                      </Stagger>
                      <p className="mt-4 text-xs text-muted-foreground/80">
                        {t("onboarding.review.note")}
                      </p>
                    </div>

                    <WizardActions
                      onBack={() => goTo(2)}
                      skipLabel={t("onboarding.skip")}
                      onSkip={submit}
                      nextLabel={t("onboarding.finish")}
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
  const t = useT();

  return (
    <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
      <Button variant="ghost" className="h-11 text-muted-foreground hover:text-foreground" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
        {t("common.back")}
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
        <TapScale>
          <Button className="btn-hero h-11 px-6" onClick={onNext} disabled={nextDisabled || nextLoading}>
            {nextLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("onboarding.saving")}
              </>
            ) : (
              <>
                {nextLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </TapScale>
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
