"use client";

// TEKA NEXUS — Project creation view (Task 2-b).
// Full launch form: live slug preview, category grid, visibility radio,
// tags (Enter to add, max 8), required-skill toggles, link validation.

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Brain,
  Cpu,
  Gamepad2,
  GitBranch,
  Globe,
  Link2,
  Loader2,
  Lock,
  Palette,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { post } from "@/lib/api";
import { useT, useLabeled } from "@/lib/i18n";
import { LIMITS, PROJECT_CATEGORIES, PROJECT_STATUSES, SKILLS } from "@/lib/constants";

import { EmptyState } from "@/components/shared/atoms";
import { HoverLift, SPRING, staggerChild, staggerParent, TapScale } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const VISIBILITY_OPTIONS = [
  {
    slug: "PUBLIC",
    nameKey: "projectNew.visibilityName.PUBLIC",
    descKey: "projectNew.visibilityDesc.PUBLIC",
  },
  {
    slug: "UNLISTED",
    nameKey: "projectNew.visibilityName.UNLISTED",
    descKey: "projectNew.visibilityDesc.UNLISTED",
  },
  {
    slug: "PRIVATE",
    nameKey: "projectNew.visibilityName.PRIVATE",
    descKey: "projectNew.visibilityDesc.PRIVATE",
  },
] as const;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type FieldErrors = Record<string, string>;

export function ProjectNewView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const back = useApp((s) => s.back);
  const t = useT();
  const lbl = useLabeled();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState("IDEA");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const slug = useMemo(() => slugify(name), [name]);
  const maxTags = 8;

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="py-10"
      >
        <EmptyState
          icon={Lock}
          title={t("projectNew.auth.title")}
          description={t("projectNew.auth.description")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              {t("projectNew.auth.goLogin")}
            </Button>
          }
        />
      </motion.div>
    );
  }

  const addTag = () => {
    const v = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!v) return;
    if (tags.length >= maxTags) {
      toast.error(t("projectNew.toasts.maxTags", { n: maxTags }));
      return;
    }
    if (!tags.includes(v)) setTags((prev) => [...prev, v]);
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((x) => x !== tag));

  const toggleSkill = (slugKey: string) =>
    setSkills((prev) => (prev.includes(slugKey) ? prev.filter((s) => s !== slugKey) : [...prev, slugKey]));

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    const trimmedName = name.trim();
    if (trimmedName.length < 3 || trimmedName.length > 80) {
      errs.name = t("projectNew.errors.name");
    }
    const trimmedTagline = tagline.trim();
    if (!trimmedTagline) errs.tagline = t("projectNew.errors.taglineRequired");
    else if (trimmedTagline.length > LIMITS.tagline)
      errs.tagline = t("projectNew.errors.taglineMax", { n: LIMITS.tagline });
    if (!category) errs.category = t("projectNew.errors.category");
    const urlError = t("projectNew.errors.url");
    if (repositoryUrl.trim() && !/^https?:\/\//i.test(repositoryUrl.trim())) errs.repositoryUrl = urlError;
    if (demoUrl.trim() && !/^https?:\/\//i.test(demoUrl.trim())) errs.demoUrl = urlError;
    if (websiteUrl.trim() && !/^https?:\/\//i.test(websiteUrl.trim())) errs.websiteUrl = urlError;
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(t("projectNew.toasts.fixFields"));
      return;
    }
    setSubmitting(true);
    try {
      const res = await post<{ project: { slug: string } }>("/api/projects", {
        name: name.trim(),
        tagline: tagline.trim(),
        description: description.trim() || undefined,
        category,
        status,
        visibility,
        tags,
        requiredSkills: skills,
        repositoryUrl: repositoryUrl.trim() || undefined,
        demoUrl: demoUrl.trim() || undefined,
        websiteUrl: websiteUrl.trim() || undefined,
      });
      toast.success(t("projectNew.toasts.launched"));
      navigate({ name: "project", slug: res.project.slug });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("projectNew.toasts.createFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (key: string) =>
    errors[key] ? <p className="text-xs text-rose-400 mt-1.5">{errors[key]}</p> : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2.5">
          <Rocket className="h-6 w-6 md:h-7 md:w-7 text-cyan-300" aria-hidden="true" />
          {t("projectNew.title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t("projectNew.subtitle")}</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        variants={staggerParent}
        initial="hidden"
        animate="show"
        className="glass-card rounded-2xl p-5 md:p-8 max-w-3xl flex flex-col gap-7"
      >
        {/* Name + live slug preview */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label htmlFor="project-name" className="text-sm font-medium">
            {t("projectNew.form.name")} <span className="text-rose-400" aria-hidden="true">*</span>
          </Label>
          <Input
            id="project-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            placeholder={t("projectNew.form.namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="project-name-hint"
            className="bg-white/[0.03] border-white/10"
          />
          <div id="project-name-hint" className="flex items-center justify-between gap-3 flex-wrap">
            {slug ? (
              <span className="inline-flex items-center rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-300">
                /projects/{slug}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">{t("projectNew.form.slugHint")}</span>
            )}
            <span className="font-mono text-[11px] text-muted-foreground">{name.length}/80</span>
          </div>
          {fieldError("name")}
        </motion.div>

        {/* Tagline */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label htmlFor="project-tagline" className="text-sm font-medium">
            {t("projectNew.form.tagline")} <span className="text-rose-400" aria-hidden="true">*</span>
          </Label>
          <Input
            id="project-tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            maxLength={LIMITS.tagline}
            placeholder={t("projectNew.form.taglinePlaceholder")}
            aria-invalid={Boolean(errors.tagline)}
            className="bg-white/[0.03] border-white/10"
          />
          <div className="flex justify-end">
            <span
              className={cn(
                "font-mono text-[11px]",
                tagline.length > LIMITS.tagline - 20 ? "text-amber-300" : "text-muted-foreground"
              )}
            >
              {tagline.length}/{LIMITS.tagline}
            </span>
          </div>
          {fieldError("tagline")}
        </motion.div>

        {/* Description */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label htmlFor="project-description" className="text-sm font-medium">
            {t("projectNew.form.description")}
          </Label>
          <Textarea
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            maxLength={LIMITS.projectDescription}
            placeholder={t("projectNew.form.descriptionPlaceholder")}
            className="bg-white/[0.03] border-white/10 resize-y"
          />
          <p className="text-[11px] text-muted-foreground">
            {t("projectNew.form.descriptionHint")} {description.length}/{LIMITS.projectDescription}
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label className="text-sm font-medium">
            {t("projectNew.form.category")} <span className="text-rose-400" aria-hidden="true">*</span>
          </Label>
          <div
            role="radiogroup"
            aria-label={t("projectNew.a11y.categoryGroup")}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          >
            {PROJECT_CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon] ?? Sparkles;
              const selected = category === c.slug;
              return (
                <HoverLift key={c.slug} y={-2} scale={1.02} className="h-full">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setCategory(c.slug);
                      setErrors((prev) => ({ ...prev, category: "" }));
                    }}
                    className={cn(
                      "relative flex h-full w-full flex-col items-start gap-1.5 rounded-lg border p-3 text-left transition-colors outline-none focus-glow min-h-[64px]",
                      selected
                        ? "border-cyan-400/60 bg-cyan-500/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    )}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-inset ring-cyan-400/60"
                      initial={false}
                      animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.94 }}
                      transition={SPRING}
                    />
                    <Icon className={cn("h-4 w-4", selected ? "text-cyan-300" : "text-muted-foreground")} />
                    <span
                      className={cn(
                        "text-xs leading-tight",
                        selected ? "text-cyan-200 font-medium" : "text-muted-foreground"
                      )}
                    >
                      {lbl("project.categories", c.slug, c.name)}
                    </span>
                  </button>
                </HoverLift>
              );
            })}
          </div>
          {fieldError("category")}
        </motion.div>

        {/* Status */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label htmlFor="project-status" className="text-sm font-medium">
            {t("projectNew.form.status")}
          </Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="project-status" className="w-[220px] bg-white/[0.03] border-white/10">
              <SelectValue placeholder={t("projectNew.form.statusPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_STATUSES.filter((s) => s.slug !== "ARCHIVED").map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {lbl("project.status", s.slug, s.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Visibility */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label className="text-sm font-medium">{t("projectNew.form.visibility")}</Label>
          <RadioGroup
            value={visibility}
            onValueChange={setVisibility}
            className="grid gap-2 sm:grid-cols-3"
            aria-label={t("projectNew.a11y.visibilityGroup")}
          >
            {VISIBILITY_OPTIONS.map((v) => (
              <Label
                key={v.slug}
                htmlFor={`visibility-${v.slug}`}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                  visibility === v.slug
                    ? "border-cyan-400/60 bg-cyan-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                )}
              >
                <RadioGroupItem id={`visibility-${v.slug}`} value={v.slug} className="mt-0.5" />
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">{t(v.nameKey)}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{t(v.descKey)}</span>
                </span>
              </Label>
            ))}
          </RadioGroup>
        </motion.div>

        {/* Tags */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label htmlFor="project-tags" className="text-sm font-medium">
            {t("projectNew.form.tags")} <span className="text-muted-foreground font-normal">({tags.length}/{maxTags})</span>
          </Label>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence initial={false}>
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={SPRING}
                    className="inline-flex items-center gap-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-300"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      aria-label={t("projectNew.a11y.removeTag", { tag })}
                      className="text-cyan-300/70 hover:text-cyan-200 outline-none focus-glow rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          )}
          <Input
            id="project-tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            disabled={tags.length >= maxTags}
            placeholder={
              tags.length >= maxTags
                ? t("projectNew.form.maxTagsReached")
                : t("projectNew.form.tagPlaceholder")
            }
            className="bg-white/[0.03] border-white/10"
          />
        </motion.div>

        {/* Required skills */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label className="text-sm font-medium">
            {t("projectNew.form.requiredSkills")} <span className="text-muted-foreground font-normal">{t("projectNew.form.optional")}</span>
          </Label>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t("projectNew.form.requiredSkills")}>
            {SKILLS.map((s) => {
              const on = skills.includes(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => toggleSkill(s.slug)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors outline-none focus-glow min-h-[36px]",
                    on
                      ? "border-violet-400/50 bg-violet-500/15 text-violet-300"
                      : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/25 hover:text-foreground"
                  )}
                >
                  {lbl("project.skills", s.slug, s.name)}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div variants={staggerChild} className="flex flex-col gap-4">
          <Label className="text-sm font-medium">
            {t("projectNew.form.links")} <span className="text-muted-foreground font-normal">{t("projectNew.form.optional")}</span>
          </Label>
          {(
            [
              { key: "repositoryUrl", label: t("projectNew.form.repoUrl"), value: repositoryUrl, set: setRepositoryUrl, ph: "https://github.com/you/repo" },
              { key: "demoUrl", label: t("projectNew.form.demoUrl"), value: demoUrl, set: setDemoUrl, ph: "https://demo.yourproject.dev" },
              { key: "websiteUrl", label: t("projectNew.form.websiteUrl"), value: websiteUrl, set: setWebsiteUrl, ph: "https://yourproject.dev" },
            ] as const
          ).map((f) => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <Label htmlFor={`project-${f.key}`} className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Link2 className="h-3 w-3" aria-hidden="true" /> {f.label}
              </Label>
              <Input
                id={`project-${f.key}`}
                type="url"
                inputMode="url"
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.ph}
                aria-invalid={Boolean(errors[f.key])}
                className="bg-white/[0.03] border-white/10"
              />
              {fieldError(f.key)}
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div variants={staggerChild} className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
          <TapScale>
            <Button type="submit" className="btn-hero" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> {t("projectNew.submitting")}
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4" /> {t("projectNew.submit")}
                </>
              )}
            </Button>
          </TapScale>
          <Button type="button" variant="outline" onClick={back} disabled={submitting}>
            {t("common.cancel")}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
