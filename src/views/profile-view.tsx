"use client";

// TEKA NEXUS — ProfileView (Task 2-d): public creator portfolio (spec §15A).
// Runs inside AppShell — no nav of its own.

import { useCallback, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
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

const CONTRIBUTION_META: Record<string, { icon: LucideIcon; label: string }> = {
  TASK_COMPLETED: { icon: CheckCircle2, label: "Completed task" },
  RELEASE_PUBLISHED: { icon: Rocket, label: "Published release" },
  MILESTONE_COMPLETED: { icon: Flag, label: "Completed milestone" },
  UPDATE_POSTED: { icon: FileText, label: "Posted update" },
  COLLABORATION_ACCEPTED: { icon: UserPlus, label: "Joined a team" },
  PROJECT_CREATED: { icon: Sparkles, label: "Created project" },
};

const REPORT_REASONS = [
  { value: "SPAM", label: "Spam" },
  { value: "HARASSMENT", label: "Harassment" },
  { value: "INAPPROPRIATE", label: "Inappropriate content" },
  { value: "COPYRIGHT", label: "Copyright violation" },
  { value: "OTHER", label: "Something else" },
] as const;

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
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
        {label}
      </span>
      {items.map((item) => (
        <span key={item} className={cn("rounded-full border px-2.5 py-0.5 text-xs", toneClass)}>
          {item}
        </span>
      ))}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass-card rounded-xl p-4">
      <p className="font-display text-2xl font-bold tabular-nums">{value.toLocaleString()}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function ProfileView({ username }: { username: string }) {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);

  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const [followPending, setFollowPending] = useState(false);
  const [blockedByMe, setBlockedByMe] = useState(false);
  const [blockPending, setBlockPending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string>("SPAM");
  const [reportDetails, setReportDetails] = useState("");
  const [reportPending, setReportPending] = useState(false);

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
          toast.error(e instanceof Error ? e.message : "Couldn't load this profile.");
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
      toast.error("Sign in to follow creators.");
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
      toast.success(res.following ? `Following ${profile.displayName}` : `Unfollowed ${profile.displayName}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't update follow.");
    } finally {
      setFollowPending(false);
    }
  }

  async function toggleBlock() {
    if (!profile) return;
    if (!user) {
      toast.error("Sign in to manage blocks.");
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
      toast.success(res.blocked ? `Blocked @${profile.username}` : `Unblocked @${profile.username}`);
      // Refresh silently — blocking removes follows in both directions.
      await load(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't update block.");
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
      toast.success("Report submitted — our team will review it.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't submit report.");
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
          title="Creator not found"
          description="This profile doesn't exist or may have been removed."
          action={
            <Button variant="outline" onClick={() => navigate({ name: "explore" })}>
              Explore projects
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
          title="Couldn't load this profile"
          description="Check your connection and try again."
          action={
            <Button variant="outline" onClick={() => load()}>
              Try again
            </Button>
          }
        />
      </div>
    );
  }

  const goalNames = profile.goals.map((g) => GOALS.find((x) => x.slug === g)?.name ?? g);
  const interestNames = profile.interests.map(
    (i) => PROJECT_CATEGORIES.find((c) => c.slug === i)?.name ?? i
  );
  const skillNames = profile.skills.map((s) => SKILLS.find((x) => x.slug === s)?.name ?? s);
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
              <UserAvatar user={profile} size={72} />
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                    {profile.displayName}
                  </h1>
                  <p className="font-mono text-sm text-muted-foreground">@{profile.username}</p>
                </div>

                {profile.bio && (
                  <p className="max-w-xl whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                    {profile.bio}
                  </p>
                )}

                {websiteHost && (
                  <a
                    href={profile.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded text-sm text-cyan-300 transition-colors hover:text-cyan-200 hover:underline focus-glow"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="max-w-[240px] truncate">{websiteHost}</span>
                  </a>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <ReputationChip xp={profile.xp} reputation={profile.reputation} />
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Member since {format(new Date(profile.createdAt), "MMM yyyy")}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <ChipRow label="Goals" items={goalNames} tone="default" />
                  <ChipRow label="Interests" items={interestNames} tone="cyan" />
                  <ChipRow label="Skills" items={skillNames} tone="violet" />
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {profile.isSelf ? (
                <Button onClick={() => navigate({ name: "settings", tab: "profile" })} className="btn-hero">
                  <Settings2 className="h-4 w-4" />
                  Edit profile
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
                    {blockedByMe ? "Blocked" : profile.isFollowing ? "Following" : "Follow"}
                  </Button>
                  <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="More actions" className="focus-glow">
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
                        {blockedByMe ? "Unblock user" : "Block user"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setReportOpen(true)}
                        className="cursor-pointer"
                      >
                        <Flag className="h-4 w-4" />
                        Report user
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
          <StatCard label="Followers" value={profile.followerCount} />
          <StatCard label="Following" value={profile.followingCount} />
          <StatCard label="Projects" value={profile.projectCount} />
          <StatCard label="Reputation" value={profile.reputation ?? 0} />
        </div>

        {/* ── Tabs ───────────────────────────────────────────── */}
        <Tabs defaultValue="projects">
          <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Projects */}
          <TabsContent value="projects" className="mt-5">
            {data && data.projects.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {data.projects.map((p) => (
                  <ProjectCardView key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Globe}
                title="No public projects yet"
                description={`When ${profile.displayName} publishes projects, they'll show up here.`}
              />
            )}
          </TabsContent>

          {/* Contributions */}
          <TabsContent value="contributions" className="mt-5">
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <p className="text-sm text-muted-foreground">
                Reputation is earned through verified contributions only — it can&apos;t be bought.
              </p>
            </div>

            {data && data.contributions.length > 0 ? (
              <ol className="relative ml-3 space-y-6 border-l border-white/[0.08] pl-7">
                {data.contributions.map((c) => {
                  const meta = CONTRIBUTION_META[c.eventType] ?? {
                    icon: Sparkles,
                    label: "Contributed",
                  };
                  const Icon = meta.icon;
                  return (
                    <li key={c.id} className="relative">
                      <span className="absolute -left-10 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0e0e16]">
                        <Icon className="h-3 w-3 text-cyan-300" />
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                        <p className="text-sm">
                          {meta.label}
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
                          {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <EmptyState
                icon={Flag}
                title="No contributions yet"
                description="Verified tasks, milestones, releases, and collaborations will appear here as they happen."
              />
            )}
          </TabsContent>

          {/* About */}
          <TabsContent value="about" className="mt-5">
            {!profile.bio && skillNames.length === 0 && goalNames.length === 0 && interestNames.length === 0 && !websiteHost ? (
              <EmptyState
                icon={UserRound}
                title="This creator hasn't added details yet"
                description="Their bio, skills, and interests will appear here once they complete their profile."
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass-card rounded-xl p-5 md:col-span-2">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Bio
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                    {profile.bio || "No bio yet."}
                  </p>
                </div>

                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Skills
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
                    <p className="mt-2 text-sm text-muted-foreground">None listed yet.</p>
                  )}
                </div>

                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Goals
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
                    <p className="mt-2 text-sm text-muted-foreground">None listed yet.</p>
                  )}
                </div>

                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Interests
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
                    <p className="mt-2 text-sm text-muted-foreground">None listed yet.</p>
                  )}
                </div>

                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Creator details
                  </h3>
                  <ul className="mt-3 space-y-2.5 text-sm">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4 shrink-0 text-cyan-300" />
                      Joined {format(new Date(profile.createdAt), "MMMM d, yyyy")}
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
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* ── Report dialog ──────────────────────────────────── */}
        <Dialog open={reportOpen} onOpenChange={setReportOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Report {profile.displayName}</DialogTitle>
              <DialogDescription>
                Reports go to the moderation queue and are reviewed by the TEKA team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-reason">Reason</Label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger id="report-reason" className="w-full focus-glow">
                    <SelectValue placeholder="Pick a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {REPORT_REASONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-details">Details (optional)</Label>
                <Textarea
                  id="report-details"
                  rows={4}
                  maxLength={2000}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Add any context that helps the moderators."
                  className="focus-glow"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReportOpen(false)} disabled={reportPending}>
                Cancel
              </Button>
              <Button onClick={submitReport} disabled={reportPending} className="min-w-32">
                {reportPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MotionConfig>
  );
}
