"use client";

// TEKA NEXUS — Project creation view (Task 2-b).
// Full launch form: live slug preview, category grid, visibility radio,
// tags (Enter to add, max 8), required-skill toggles, link validation.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Brain,
  Cpu,
  Gamepad2,
  GitBranch,
  Globe,
  ImageOff,
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

import { cn, normalizeUrlInput } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { AI_TIMEOUT_MS, post } from "@/lib/api";
import { useT, useLabeled } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";
import { LIMITS, PROJECT_CATEGORIES, PROJECT_COVER_GALLERY, PROJECT_STATUSES, SKILLS } from "@/lib/constants";

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

// ─── Work-easier helpers ─────────────────────────────────────
// Draft autosave (localStorage) + "build similar" prefill (sessionStorage).
const DRAFT_KEY = "teka:project-draft:v1";
const PREFILL_KEY = "teka:project-prefill:v1";

type AiSuggestion = {
  name?: string;
  tagline: string;
  description?: string;
  tags?: string[];
  category?: string;
  skills?: string[];
};

// Deterministic category → gallery-cover mapping used by the AI copilot:
// when the founder hasn't picked a cover yet, we suggest one that matches
// the suggested category (no AI guesswork, always a real gallery path).
const CATEGORY_COVER: Record<string, string> = {
  WEB_DEVELOPMENT: "/covers/choreograph.png",
  MOBILE_DEVELOPMENT: "/covers/hivemote.png",
  ARTIFICIAL_INTELLIGENCE: "/covers/neuron-forge.png",
  DEVELOPER_TOOLS: "/covers/datadock.png",
  OPEN_SOURCE: "/covers/herald.png",
  INDIE_GAMES: "/covers/donyaye-pixel.png",
  CYBERSECURITY: "/covers/guardrail.png",
  BLOCKCHAIN: "/covers/nexus-core.png",
  HARDWARE_IOT: "/covers/pitchframe.png",
  DATA_SCIENCE: "/covers/pulseboard.png",
  DESIGN_TOOLS: "/covers/echoform.png",
  OTHER_TECHNOLOGY: "/covers/choreograph.png",
};

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
  const [coverImage, setCoverImage] = useState("");
  const [customCoverOpen, setCustomCoverOpen] = useState(false);
  const [customCoverUrl, setCustomCoverUrl] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // AI copilot state
  const [aiIdea, setAiIdea] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiSuggestion | null>(null);
  const [aiOpen, setAiOpen] = useState(true);
  const locale = useI18n((s) => s.locale);

  const slug = useMemo(() => slugify(name), [name]);
  const maxTags = 8;

  // ── Restore "build similar" prefill, then the local draft — once. ──
  const restoredRef = useRef(false);
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const rawPrefill = window.sessionStorage.getItem(PREFILL_KEY);
      if (rawPrefill) {
        window.sessionStorage.removeItem(PREFILL_KEY);
        const p = JSON.parse(rawPrefill) as Record<string, unknown>;
        if (typeof p.name === "string") setName(p.name.slice(0, 80));
        if (typeof p.tagline === "string") setTagline(p.tagline.slice(0, LIMITS.tagline));
        if (typeof p.description === "string") setDescription(p.description.slice(0, LIMITS.projectDescription));
        if (typeof p.category === "string") setCategory(p.category);
        if (Array.isArray(p.tags)) setTags(p.tags.filter((x): x is string => typeof x === "string").slice(0, 8));
        if (Array.isArray(p.skills)) setSkills(p.skills.filter((x): x is string => typeof x === "string"));
        if (typeof p.repositoryUrl === "string") setRepositoryUrl(p.repositoryUrl);
        if (typeof p.demoUrl === "string") setDemoUrl(p.demoUrl);
        if (typeof p.websiteUrl === "string") setWebsiteUrl(p.websiteUrl);
        if (typeof p.coverImage === "string") setCoverImage(p.coverImage.slice(0, LIMITS.coverImage));
        toast.info(t("projectNew.prefill.applied", { name: typeof p.sourceName === "string" && p.sourceName ? p.sourceName : t("projectNew.prefill.aProject") }));
        return;
      }
      const rawDraft = window.localStorage.getItem(DRAFT_KEY);
      if (!rawDraft) return;
      const d = JSON.parse(rawDraft) as Record<string, unknown>;
      const hasContent =
        (typeof d.name === "string" && d.name.trim()) ||
        (typeof d.tagline === "string" && d.tagline.trim()) ||
        (typeof d.description === "string" && d.description.trim());
      if (!hasContent) return;
      if (typeof d.name === "string") setName(d.name.slice(0, 80));
      if (typeof d.tagline === "string") setTagline(d.tagline.slice(0, LIMITS.tagline));
      if (typeof d.description === "string") setDescription(d.description.slice(0, LIMITS.projectDescription));
      if (typeof d.category === "string") setCategory(d.category);
      if (typeof d.status === "string") setStatus(d.status);
      if (typeof d.visibility === "string") setVisibility(d.visibility);
      if (Array.isArray(d.tags)) setTags(d.tags.filter((x): x is string => typeof x === "string").slice(0, 8));
      if (Array.isArray(d.skills)) setSkills(d.skills.filter((x): x is string => typeof x === "string"));
      if (typeof d.repositoryUrl === "string") setRepositoryUrl(d.repositoryUrl);
      if (typeof d.demoUrl === "string") setDemoUrl(d.demoUrl);
      if (typeof d.websiteUrl === "string") setWebsiteUrl(d.websiteUrl);
      if (typeof d.coverImage === "string") setCoverImage(d.coverImage.slice(0, LIMITS.coverImage));
      toast.info(t("projectNew.draft.restored"), {
        action: { label: t("projectNew.draft.discardAction"), onClick: clearDraft },
        duration: 8000,
      });
    } catch {
      /* corrupted draft/prefill — ignore */
    }
     
  }, []);

  // ── Draft autosave (debounced, never while submitting) ──
  useEffect(() => {
    if (submitting) return;
    const hasContent =
      name.trim() || tagline.trim() || description.trim() || tags.length || skills.length ||
      repositoryUrl.trim() || demoUrl.trim() || websiteUrl.trim() || coverImage;
    if (!hasContent) return;
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ name, tagline, description, category, status, visibility, tags, skills, repositoryUrl, demoUrl, websiteUrl, coverImage, savedAt: Date.now() }),
        );
      } catch {
        /* storage unavailable */
      }
    }, 800);
    return () => window.clearTimeout(id);
  }, [name, tagline, description, category, status, visibility, tags, skills, repositoryUrl, demoUrl, websiteUrl, coverImage, submitting]);

  const clearDraft = useCallback(() => {
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* storage unavailable */
    }
    setName("");
    setTagline("");
    setDescription("");
    setCategory(null);
    setStatus("IDEA");
    setVisibility("PUBLIC");
    setTags([]);
    setSkills([]);
    setRepositoryUrl("");
    setDemoUrl("");
    setWebsiteUrl("");
    setCoverImage("");
    setCustomCoverUrl("");
    toast.success(t("projectNew.draft.discarded"));
     
  }, [t]);

  // ── AI copilot actions ──
  const generateSuggestion = async () => {
    const idea = aiIdea.trim();
    if (idea.length < 10) {
      toast.error(t("projectNew.ai.minIdea"));
      return;
    }
    setAiLoading(true);
    try {
      const res = await post<{ suggestion: AiSuggestion }>(
        "/api/ai/assist",
        { idea, locale },
        AI_TIMEOUT_MS,
      );
      setAiResult(res.suggestion);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("projectNew.ai.failed"));
    } finally {
      setAiLoading(false);
    }
  };

  const applySuggestion = () => {
    const s = aiResult;
    if (!s) return;
    if (!name.trim() && s.name) setName(s.name.slice(0, 80));
    if (s.tagline) setTagline(s.tagline.slice(0, LIMITS.tagline));
    if (s.description) setDescription(s.description.slice(0, LIMITS.projectDescription));
    if (s.category) setCategory(s.category);
    if (s.tags?.length) setTags((prev) => [...prev, ...s.tags!.filter((x) => !prev.includes(x))].slice(0, maxTags));
    if (s.skills?.length) setSkills((prev) => [...prev, ...s.skills!.filter((x) => !prev.includes(x))]);
    if (!coverImage && s.category && CATEGORY_COVER[s.category]) {
      setCoverImage(CATEGORY_COVER[s.category]);
      setCustomCoverUrl("");
      setCustomCoverOpen(false);
      toast.info(t("projectNew.ai.coverPicked"));
    }
    setAiResult(null);
    toast.success(t("projectNew.ai.applied"));
  };

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

  const isValidCoverUrl = (v: string) => /^https?:\/\/\S+$/i.test(v) && v.length <= LIMITS.coverImage;

  const clearCoverError = () => setErrors((prev) => ({ ...prev, coverImage: "" }));

  // Pick a gallery cover (toggle off when already selected); clears custom URL.
  const selectGalleryCover = (path: string) => {
    setCoverImage((prev) => (prev === path ? "" : path));
    setCustomCoverUrl("");
    setCustomCoverOpen(false);
    clearCoverError();
  };

  const clearCover = () => {
    setCoverImage("");
    setCustomCoverUrl("");
    clearCoverError();
  };

  // Custom external URL: live inline validation mirroring the API rule
  // (must start with http(s)://, max 500 chars).
  const handleCustomCoverChange = (value: string) => {
    setCustomCoverUrl(value);
    const v = value.trim();
    if (!v) {
      setCoverImage("");
      clearCoverError();
      return;
    }
    if (isValidCoverUrl(v)) {
      setCoverImage(v);
      clearCoverError();
    } else {
      setCoverImage("");
      setErrors((prev) => ({
        ...prev,
        coverImage:
          v.length > LIMITS.coverImage
            ? t("projectNew.errors.coverMax", { n: LIMITS.coverImage })
            : t("projectNew.errors.coverUrl"),
      }));
    }
  };

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
    const repo = normalizeUrlInput(repositoryUrl);
    if (repositoryUrl.trim() && repo === null) errs.repositoryUrl = urlError;
    const demo = normalizeUrlInput(demoUrl);
    if (demoUrl.trim() && demo === null) errs.demoUrl = urlError;
    const site = normalizeUrlInput(websiteUrl);
    if (websiteUrl.trim() && site === null) errs.websiteUrl = urlError;
    // Cover: local /covers/ paths pass; external URLs must match the API rule.
    const trimmedCover = coverImage.trim();
    if (trimmedCover && !trimmedCover.startsWith("/")) {
      if (!/^https?:\/\//i.test(trimmedCover)) errs.coverImage = t("projectNew.errors.coverUrl");
      else if (trimmedCover.length > LIMITS.coverImage)
        errs.coverImage = t("projectNew.errors.coverMax", { n: LIMITS.coverImage });
    }
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
        repositoryUrl: (normalizeUrlInput(repositoryUrl) ?? repositoryUrl.trim()) || undefined,
        demoUrl: (normalizeUrlInput(demoUrl) ?? demoUrl.trim()) || undefined,
        websiteUrl: (normalizeUrlInput(websiteUrl) ?? websiteUrl.trim()) || undefined,
        coverImage: coverImage.trim() || undefined,
      });
      toast.success(t("projectNew.toasts.launched"));
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* storage unavailable */
      }
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
        {/* AI copilot */}
        <motion.div variants={staggerChild} className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setAiOpen((v) => !v)}
            aria-expanded={aiOpen}
            className="group flex w-full items-center gap-3 rounded-xl border border-violet-500/30 bg-violet-500/[0.07] p-4 text-left outline-none transition-colors focus-glow hover:border-violet-400/50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15">
              <Sparkles className="h-4 w-4 text-violet-300" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-violet-200">{t("projectNew.ai.panelTitle")}</span>
              <span className="block text-xs text-muted-foreground">{t("projectNew.ai.panelSubtitle")}</span>
            </span>
          </button>

          {aiOpen && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3">
              <Label htmlFor="ai-idea" className="text-xs text-muted-foreground">
                {t("projectNew.ai.ideaLabel")}
              </Label>
              <Textarea
                id="ai-idea"
                value={aiIdea}
                onChange={(e) => setAiIdea(e.target.value)}
                rows={2}
                maxLength={600}
                placeholder={t("projectNew.ai.ideaPlaceholder")}
                className="bg-white/[0.03] border-white/10 resize-y"
              />
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <TapScale>
                  <Button
                    type="button"
                    size="sm"
                    disabled={aiLoading}
                    onClick={generateSuggestion}
                    className="btn-hero h-9"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> {t("projectNew.ai.generating")}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> {t("projectNew.ai.generate")}
                      </>
                    )}
                  </Button>
                </TapScale>
                <span className="font-mono text-[11px] text-muted-foreground">{aiIdea.length}/600</span>
              </div>

              <AnimatePresence initial={false}>
                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={SPRING}
                    className="rounded-lg border border-violet-500/25 bg-violet-500/[0.05] p-3.5 flex flex-col gap-2.5"
                  >
                    <p className="text-sm font-medium text-foreground">{aiResult.tagline}</p>
                    {aiResult.description && (
                      <div className="max-h-40 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                        {aiResult.description}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {aiResult.name && (
                        <span className="inline-flex items-center rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
                          {aiResult.name}
                        </span>
                      )}
                      {aiResult.category && (
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {lbl("project.categories", aiResult.category, aiResult.category)}
                        </span>
                      )}
                      {(aiResult.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300"
                        >
                          #{tag}
                        </span>
                      ))}
                      {(aiResult.skills ?? []).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[11px] text-violet-300"
                        >
                          {lbl("project.skills", skill, skill)}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <TapScale>
                        <Button type="button" size="sm" className="btn-hero h-8" onClick={applySuggestion}>
                          <Sparkles className="h-3.5 w-3.5" /> {t("projectNew.ai.apply")}
                        </Button>
                      </TapScale>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setAiResult(null)}
                      >
                        {t("projectNew.ai.discard")}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

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

        {/* Cover picker */}
        <motion.div variants={staggerChild} className="flex flex-col gap-2">
          <Label className="text-sm font-medium">
            {t("projectNew.form.cover")}{" "}
            <span className="text-muted-foreground font-normal">{t("projectNew.form.optional")}</span>
          </Label>
          <p className="text-xs text-muted-foreground">{t("projectNew.form.coverHint")}</p>
          <div role="group" aria-label={t("projectNew.a11y.coverGroup")} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* None tile */}
            <button
              type="button"
              onClick={clearCover}
              aria-pressed={coverImage === ""}
              aria-label={t("projectNew.a11y.coverNone")}
              title={t("projectNew.a11y.coverNone")}
              className={cn(
                "flex aspect-video min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border-2 overflow-hidden transition-colors outline-none focus-glow",
                coverImage === ""
                  ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                  : "border-transparent bg-white/[0.02] hover:border-white/25"
              )}
            >
              <ImageOff
                className={cn("h-5 w-5", coverImage === "" ? "text-primary" : "text-muted-foreground")}
                aria-hidden="true"
              />
              <span className={cn("text-xs leading-tight", coverImage === "" ? "text-primary font-medium" : "text-muted-foreground")}>
                {t("projectNew.form.coverNone")}
              </span>
            </button>
            {PROJECT_COVER_GALLERY.map((path) => {
              const selected = coverImage === path;
              const coverName = path.split("/").pop()?.replace(/\.[a-z]+$/i, "") ?? "cover";
              return (
                <button
                  key={path}
                  type="button"
                  onClick={() => selectGalleryCover(path)}
                  aria-pressed={selected}
                  aria-label={t("projectNew.a11y.coverOption", { name: coverName })}
                  title={t("projectNew.a11y.coverOption", { name: coverName })}
                  className={cn(
                    "relative aspect-video min-h-[44px] rounded-lg overflow-hidden border-2 transition-colors outline-none focus-glow",
                    selected ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-white/25"
                  )}
                >
                  <img src={path} alt={coverName} loading="lazy" className="object-cover w-full h-full" />
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-inset ring-primary/60"
                    initial={false}
                    animate={{ opacity: selected ? 1 : 0 }}
                    transition={SPRING}
                  />
                </button>
              );
            })}
          </div>
          {/* Custom external image URL */}
          {customCoverOpen ? (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="project-cover-url" className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Link2 className="h-3 w-3" aria-hidden="true" /> {t("projectNew.form.coverUrlLabel")}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="project-cover-url"
                  type="url"
                  inputMode="url"
                  value={customCoverUrl}
                  onChange={(e) => handleCustomCoverChange(e.target.value)}
                  maxLength={LIMITS.coverImage}
                  placeholder="https://example.com/cover.png"
                  aria-invalid={Boolean(errors.coverImage)}
                  className="bg-white/[0.03] border-white/10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setCustomCoverOpen(false)}
                  aria-label={t("projectNew.a11y.coverUrlHide")}
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              {fieldError("coverImage")}
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCustomCoverOpen(true)}
              className="self-start mt-1 text-muted-foreground hover:text-foreground"
            >
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> {t("projectNew.form.coverUrlLabel")}
            </Button>
          )}
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
