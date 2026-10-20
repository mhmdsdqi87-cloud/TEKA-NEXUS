"use client";

// TEKA NEXUS — ProfileView (Task 2-d): public creator portfolio (spec §15A).
// Runs inside AppShell — no nav of its own.

import { useCallback, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { toast } from "sonner";
import { useT, useRelativeTime, useFormatDate, useLabeled } from "@/lib/i18n";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Flag,
  FileText,
  Globe,
  Info,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Rocket,
  Settings2,
  Sparkles,
  UserCheck,
  UserPlus,
  UserRound,
  UserX,
  type LucideIcon,
} from "lucide-react";

import { ApiError, get, post } from "@/lib/api";
import { useApp } from "@/lib/store";
import { ContributionDTO, ProfileDetail, ProjectCard } from "@/lib/dto";
import { GOALS, PROJECT_CATEGORIES, SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EmptyState, ReputationChip, UserAvatar } from "@/components/shared/atoms";
import { ProjectCardView } from "@/components/shared/project-card";
import { AnimatedNumber, SPRING, Stagger, StaggerItem, staggerChild, staggerParent } from "@/components/shared/motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

type ProfileResponse = {
  user: ProfileDetail;
  projects: ProjectCard[];
  contributions: ContributionDTO[];
};

const CONTRIBUTION_META: Record<string, { icon: LucideIcon; labelKey: string }> = {
  TASK_COMPLETED: { icon: CheckCircle2, labelKey: "task" },
  RELEASE_PUBLISHED: { icon: Rocket, labelKey: "release" },
  MILESTONE_COMPLETED: { icon: Flag, labelKey: "milestone" },
  UPDATE_POSTED: { icon: FileText, labelKey: "update" },
  COLLABORATION_ACCEPTED: { icon: UserPlus, labelKey: "collab" },
  PROJECT_CREATED: { icon: Sparkles, labelKey: "created" },
};

const REPORT_REASONS = [
  { value: "SPAM", labelKey: "spam" },
  { value: "HARASSMENT", labelKey: "harassment" },
  { value: "INAPPROPRIATE", labelKey: "inappropriate" },
  { value: "COPYRIGHT", labelKey: "copyright" },
  { value: "OTHER", labelKey: "other" },
] as const;

const STAGGER_CAP = 12;

function ChipRow({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "default" | "cyan" | "violet";
}) {
  if (items.length === 0) return null;
  const toneClass =
    tone === "violet"
      ? "border-violet-500/25 bg-violet-500/10 text-violet-300"
      : tone === "cyan"
        ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-200"
        : "border-white/10 bg-white/[0.04] text-foreground/80";
  return (
    <motion.div
      className="flex flex-wrap items-center gap-2"
      variants={staggerParent}
      initial="hidden"
      animate="show"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
        {label}
      </span>
      {items.map((item) => (
        <motion.span
          key={item}
          variants={staggerChild}
          className={cn("rounded-full border px-2.5 py-0.5 text-xs", toneClass)}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass-card rounded-xl p-4">
      <p className="font-display text-2xl font-bold">
        <AnimatedNumber value={value} format={(n) => n.toLocaleString()} />
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function ProfileView({ username }: { username: string }) {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const lbl = useLabeled();
  const rel = useRelativeTime();
  const fd = useFormatDate();

  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const [followPending, setFollowPending] = useState(false);
  const [dmPending, setDmPending] = useState(false);
  const [blockedByMe, setBlockedByMe] = useState(false);
  const [blockPending, setBlockPending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string>("SPAM");
  const [reportDetails, setReportDetails] = useState("");
  const [reportPending, setReportPending] = useState(false);
  const [profileTab, setProfileTab] = useState("projects");

  const load = useCallback(
    async (silent = false) => {
      if (!silent) {
        setLoading(true);
        setData(null);
      }
      setNotFound(false);
      setLoadFailed(false);
      try {
        const res = await get<ProfileResponse>(`/api/users/${encodeURIComponent(username)}`);
        setData(res);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) setNotFound(true);
        else {
          setLoadFailed(true);
          toast.error(e instanceof Error ? e.message : t("profile.errors.loadFailed"));
        }
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  useEffect(() => {
    load();
  }, [load]);

  const profile = data?.user ?? null;

  async function toggleFollow() {
    if (!profile || profile.isSelf) return;
    if (!user) {
      toast.error(t("profile.errors.signInToFollow"));
      navigate({ name: "login" });
      return;
    }
    setFollowPending(true);
    try {
      const res = await post<{ following: boolean; followerCount: number }>(
        `/api/users/${encodeURIComponent(profile.username)}/follow`
      );
      setData((prev) =>
        prev
          ? {
              ...prev,
              user: { ...prev.user, isFollowing: res.following, followerCount: res.followerCount },
            }
          : prev
      );
      toast.success(
        res.following
          ? t("profile.toasts.followed", { name: profile.displayName })
          : t("profile.toasts.unfollowed", { name: profile.displayName })
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profile.errors.followFailed"));
    } finally {
      setFollowPending(false);
    }
  }

  // Open (or create) the 1:1 DM conversation with this user (Task dm-1).
  async function openDm() {
    if (!profile || profile.isSelf) return;
    if (!user) {
      toast.error(t("profile.errors.signInToFollow"));
      navigate({ name: "login" });
      return;
    }
    if (blockedByMe) return;
    setDmPending(true);
    try {
      const res = await post<{ conversation: { id: string } }>(
        "/api/dm/conversations",
        { username: profile.username }
      );
      navigate({ name: "dm", conversationId: res.conversation.id });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("dm.toasts.conversationFailed"));
    } finally {
      setDmPending(false);
    }
  }

  async function toggleBlock() {
    if (!profile) return;
    if (!user) {
      toast.error(t("profile.errors.signInToBlock"));
      navigate({ name: "login" });
      return;
    }
    setBlockPending(true);
    try {
      const res = await post<{ blocked: boolean }>(
        `/api/users/${encodeURIComponent(profile.username)}/block`
      );
      setBlockedByMe(res.blocked);
      setMenuOpen(false);
      toast.success(
        res.blocked
          ? t("profile.toasts.blocked", { name: profile.username })
          : t("profile.toasts.unblocked", { name: profile.username })
      );
      // Refresh silently — blocking removes follows in both directions.
      await load(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profile.errors.blockFailed"));
    } finally {
      setBlockPending(false);
    }
  }

  async function submitReport() {
    if (!profile) return;
    setReportPending(true);
    try {
      await post("/api/reports", {
        targetType: "user",
        targetId: profile.id,
        reason: reportReason,
        ...(reportDetails.trim() ? { details: reportDetails.trim() } : {}),
      });
      setReportOpen(false);
      setReportDetails("");
      setReportReason("SPAM");
      toast.success(t("profile.toasts.reportSubmitted"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profile.errors.reportFailed"));
    } finally {
      setReportPending(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 md:py-8">
        <Skeleton className="h-48 w-full rounded-2xl bg-white/[0.05]" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl bg-white/[0.05]" />
          ))}
        </div>
        <Skeleton className="h-44 w-full rounded-2xl bg-white/[0.05]" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">
        <EmptyState
          icon={UserX}
          title={t("profile.notFound.title")}
          description={t("profile.notFound.description")}
          action={
            <Button variant="outline" onClick={() => navigate({ name: "explore" })}>
              {t("profile.notFound.action")}
            </Button>
          }
        />
      </div>
    );
  }

  if (loadFailed || !profile) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">
        <EmptyState
          icon={Info}
          title={t("profile.loadFailed.title")}
          description={t("profile.loadFailed.description")}
          action={
            <Button variant="outline" onClick={() => load()}>
              {t("common.retry")}
            </Button>
          }
        />
      </div>
    );
  }

  const goalNames = profile.goals.map((g) => lbl("common.goals", g, GOALS.find((x) => x.slug === g)?.name ?? g));
  const interestNames = profile.interests.map(
    (i) => lbl("project.categories", i, PROJECT_CATEGORIES.find((c) => c.slug === i)?.name ?? i)
  );
  const skillNames = profile.skills.map((s) => lbl("project.skills", s, SKILLS.find((x) => x.slug === s)?.name ?? s));
  const websiteHost = profile.websiteUrl
    ? profile.websiteUrl.replace(/^https?:\/\//i, "").replace(/\/$/, "")
    : "";

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 md:py-8">
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="aurora-border rounded-2xl p-5 md:p-7"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-start">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...SPRING, delay: 0.08 }}
                className="shrink-0"
              >
                <UserAvatar user={profile} size={72} />
              </motion.div>
              <motion.div
                className="min-w-0 flex-1 space-y-3"
                variants={staggerParent}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={staggerChild}>
                  <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                    {profile.displayName}
                  </h1>
                  <p className="font-mono text-sm text-muted-foreground">@{profile.username}</p>
                </motion.div>

                {profile.bio && (
                  <motion.p
                    variants={staggerChild}
                    className="max-w-xl whitespace-pre-line text-sm leading-relaxed text-foreground/85"
                  >
                    {profile.bio}
                  </motion.p>
                )}

                {websiteHost && (
                  <motion.div variants={staggerChild}>
                    <a
                      href={profile.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded text-sm text-cyan-300 transition-colors hover:text-cyan-200 hover:underline focus-glow"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="max-w-[240px] truncate">{websiteHost}</span>
                    </a>
                  </motion.div>
                )}

                <motion.div
                  variants={staggerChild}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
                >
                  <ReputationChip xp={profile.xp} reputation={profile.reputation} />
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {t("profile.header.memberSince", { date: fd(new Date(profile.createdAt), "MMM yyyy") })}
                  </span>
                </motion.div>

                <div className="space-y-2 pt-1">
                  <ChipRow label={t("profile.sections.goals")} items={goalNames} tone="default" />
                  <ChipRow label={t("profile.sections.interests")} items={interestNames} tone="cyan" />
                  <ChipRow label={t("profile.sections.skills")} items={skillNames} tone="violet" />
                </div>
              </motion.div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              {profile.isSelf ? (
                <Button onClick={() => navigate({ name: "settings", tab: "profile" })} className="btn-hero">
                  <Settings2 className="h-4 w-4" />
                  {t("profile.actions.editProfile")}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={toggleFollow}
                    disabled={followPending || blockedByMe}
                    variant={profile.isFollowing ? "outline" : "default"}
                    className={cn("min-w-32", !profile.isFollowing && "btn-hero")}
                  >
                    {followPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : profile.isFollowing ? (
                      <UserCheck className="h-4 w-4" />
                    ) : (
                      <UserPlus className="h-4 w-4" />
                    )}
                    {blockedByMe
                      ? t("profile.actions.blocked")
                      : profile.isFollowing
                        ? t("profile.actions.following")
                        : t("profile.actions.follow")}
                  </Button>
                  <Button
                    onClick={openDm}
                    disabled={dmPending || blockedByMe}
                    variant="outline"
                    aria-label={t("dm.profileCta")}
                  >
                    {dmPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                    {t("dm.profileCta")}
                  </Button>
                  <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={t("profile.actions.moreActions")} className="focus-glow">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={toggleBlock}
                        disabled={blockPending}
                        className={cn("cursor-pointer", !blockedByMe && "text-rose-300 focus:text-rose-300")}
                      >
                        {blockPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Ban className="h-4 w-4" />
                        )}
                        {blockedByMe ? t("profile.actions.unblockUser") : t("profile.actions.blockUser")}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setReportOpen(true)}
                        className="cursor-pointer"
                      >
                        <Flag className="h-4 w-4" />
                        {t("profile.actions.reportUser")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* ── Stats ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label={t("profile.stats.followers")} value={profile.followerCount} />
          <StatCard label={t("profile.stats.following")} value={profile.followingCount} />
          <StatCard label={t("common.projects")} value={profile.projectCount} />
          <StatCard label={t("profile.stats.reputation")} value={profile.reputation ?? 0} />
        </div>

        {/* ── Tabs ───────────────────────────────────────────── */}
        <Tabs value={profileTab} onValueChange={setProfileTab}>
          <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
            {([
              { value: "projects", label: t("common.projects") },
              { value: "contributions", label: t("profile.tabs.contributions") },
              { value: "about", label: t("profile.tabs.about") },
            ] as const).map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {profileTab === tab.value && (
                  <motion.span
                    layoutId="profile-tab-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md border border-cyan-400/30 bg-cyan-500/15"
                    transition={SPRING}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Projects */}
          <TabsContent value="projects" className="mt-5">
            {data && data.projects.length > 0 ? (
              <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" gap={0.04}>
                {data.projects.map((p, i) =>
                  i < STAGGER_CAP ? (
                    <StaggerItem key={p.id}>
                      <ProjectCardView project={p} />
                    </StaggerItem>
                  ) : (
                    <motion.div key={p.id}>
                      <ProjectCardView project={p} />
                    </motion.div>
                  )
                )}
              </Stagger>
            ) : (
              <EmptyState
                icon={Globe}
                title={t("profile.empty.projects.title")}
                description={t("profile.empty.projects.description", { name: profile.displayName })}
              />
            )}
          </TabsContent>

          {/* Contributions */}
          <TabsContent value="contributions" className="mt-5">
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <p className="text-sm text-muted-foreground">
                {t("profile.contributions.notice")}
              </p>
            </div>

            {data && data.contributions.length > 0 ? (
              <motion.ol
                className="relative ml-3 space-y-6 border-l border-white/[0.08] pl-7"
                variants={staggerParent}
                initial="hidden"
                animate="show"
              >
                {data.contributions.map((c, i) => {
                  const meta = CONTRIBUTION_META[c.eventType] ?? {
                    icon: Sparkles,
                    labelKey: "other",
                  };
                  const Icon = meta.icon;
                  const content = (
                    <>
                      <span className="absolute -left-10 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0e0e16]">
                        <Icon className="h-3 w-3 text-cyan-300" />
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                        <p className="text-sm">
                          {t(`profile.contributionTypes.${meta.labelKey}`)}
                          {c.project && (
                            <>
                              <span className="text-muted-foreground"> · </span>
                              <button
                                onClick={() =>
                                  c.project && navigate({ name: "project", slug: c.project.slug })
                                }
                                className="rounded font-medium hover:text-cyan-300 focus-glow"
                              >
                                {c.project.name}
                              </button>
                            </>
                          )}
                        </p>
                        <span className="rounded-md bg-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-violet-300">
                          +{c.xp} XP
                        </span>
                        {c.reputation > 0 && (
                          <span className="rounded-md bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-cyan-300">
                            +{c.reputation} REP
                          </span>
                        )}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {rel(new Date(c.createdAt))}
                        </span>
                      </div>
                    </>
                  );
                  return i < STAGGER_CAP ? (
                    <motion.li key={c.id} className="relative" variants={staggerChild}>
                      {content}
                    </motion.li>
                  ) : (
                    <li key={c.id} className="relative">
                      {content}
                    </li>
                  );
                })}
              </motion.ol>
            ) : (
              <EmptyState
                icon={Flag}
                title={t("profile.empty.contributions.title")}
                description={t("profile.empty.contributions.description")}
              />
            )}
          </TabsContent>

          {/* About */}
          <TabsContent value="about" className="mt-5">
            {!profile.bio && skillNames.length === 0 && goalNames.length === 0 && interestNames.length === 0 && !websiteHost ? (
              <EmptyState
                icon={UserRound}
                title={t("profile.empty.about.title")}
                description={t("profile.empty.about.description")}
              />
            ) : (
              <motion.div
                className="grid gap-4 md:grid-cols-2"
                variants={staggerParent}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={staggerChild} className="glass-card rounded-xl p-5 md:col-span-2">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("profile.about.bio")}
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                    {profile.bio || t("profile.about.noBio")}
                  </p>
                </motion.div>

                <motion.div variants={staggerChild} className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("profile.sections.skills")}
                  </h3>
                  {skillNames.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skillNames.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">{t("profile.about.noneListed")}</p>
                  )}
                </motion.div>

                <motion.div variants={staggerChild} className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("profile.sections.goals")}
                  </h3>
                  {goalNames.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {goalNames.map((g) => (
                        <span
                          key={g}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-foreground/80"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">{t("profile.about.noneListed")}</p>
                  )}
                </motion.div>

                <motion.div variants={staggerChild} className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("profile.sections.interests")}
                  </h3>
                  {interestNames.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {interestNames.map((i) => (
                        <span
                          key={i}
                          className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-200"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">{t("profile.about.noneListed")}</p>
                  )}
                </motion.div>

                <motion.div variants={staggerChild} className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("profile.about.details")}
                  </h3>
                  <ul className="mt-3 space-y-2.5 text-sm">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4 shrink-0 text-cyan-300" />
                      {t("profile.about.joined", { date: fd(new Date(profile.createdAt), "MMMM d, yyyy") })}
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <UserRound className="h-4 w-4 shrink-0 text-violet-300" />
                      <span className="font-mono">@{profile.username}</span>
                    </li>
                    {websiteHost && (
                      <li className="flex items-center gap-2">
                        <Globe className="h-4 w-4 shrink-0 text-cyan-300" />
                        <a
                          href={profile.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate text-cyan-300 hover:underline focus-glow rounded"
                        >
                          {websiteHost}
                        </a>
                      </li>
                    )}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {/* ── Report dialog ──────────────────────────────────── */}
        <Dialog open={reportOpen} onOpenChange={setReportOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">
                {t("profile.report.title", { name: profile.displayName })}
              </DialogTitle>
              <DialogDescription>
                {t("profile.report.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-reason">{t("profile.report.reason")}</Label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger id="report-reason" className="w-full focus-glow">
                    <SelectValue placeholder={t("profile.report.pickReason")} />
                  </SelectTrigger>
                  <SelectContent>
                    {REPORT_REASONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {t(`profile.reportReasons.${r.labelKey}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-details">{t("profile.report.detailsLabel")}</Label>
                <Textarea
                  id="report-details"
                  rows={4}
                  maxLength={2000}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder={t("profile.report.detailsPlaceholder")}
                  className="focus-glow"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReportOpen(false)} disabled={reportPending}>
                {t("common.cancel")}
              </Button>
              <Button onClick={submitReport} disabled={reportPending} className="min-w-32">
                {reportPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {t("profile.report.submit")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MotionConfig>
  );
}
