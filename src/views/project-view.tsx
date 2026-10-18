"use client";

// TEKA NEXUS — Project workspace view (spec §8).
// Tabs: Overview / Updates / Tasks / Milestones / Team / Activity.
// All data comes from real endpoints; every mutation has pending + toast + error handling.

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { format, formatDistanceToNow, isBefore, parseISO } from "date-fns";
import { toast } from "sonner";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  Activity,
  AlignJustify,
  Archive,
  ArrowLeft,
  BarChart3,
  Bookmark,
  Boxes,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Columns3,
  Cpu,
  ExternalLink,
  Eye,
  EyeOff,
  FileQuestion,
  Flag,
  Gamepad2,
  GitBranch,
  Github,
  Globe,
  GripVertical,
  Heart,
  LayoutDashboard,
  Link2,
  Loader2,
  ListChecks,
  Megaphone,
  MessageSquare,
  MoreHorizontal,
  Palette,
  Pencil,
  Plus,
  Send,
  Settings2,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
  Wrench,
  X,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { get, post, patch, del, ApiError } from "@/lib/api";
import { useApp } from "@/lib/store";
import {
  LIMITS,
  MEMBER_ROLES,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  SKILLS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  VISIBILITIES,
} from "@/lib/constants";
import type {
  CollabRequestDTO,
  CommentDTO,
  MembersResponse,
  MilestoneDTO,
  ProjectDetail,
  ProjectDetailResponse,
  ProjectMemberDTO,
  ProjectUpdateDTO,
  TaskDTO,
} from "@/lib/dto";
import {
  EmptyState,
  PriorityPill,
  ProjectCover,
  StatusPill,
  UserAvatar,
} from "@/components/shared/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Local helpers ────────────────────────────────────────────────────────────

const errText = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong");
const enc = encodeURIComponent;

function fmtDate(v: string | null | undefined) {
  return v ? format(parseISO(v), "MMM d, yyyy") : "—";
}
function fmtAgo(v: string | null | undefined) {
  return v ? formatDistanceToNow(parseISO(v), { addSuffix: true }) : "—";
}
function isOverdue(dueAt: string | null, done: boolean) {
  return !!dueAt && !done && isBefore(parseISO(dueAt), new Date());
}

type IconType = React.ComponentType<{ className?: string }>;

const CATEGORY_ICON: Record<string, IconType> = {
  WEB_DEVELOPMENT: Globe,
  MOBILE_DEVELOPMENT: Smartphone,
  ARTIFICIAL_INTELLIGENCE: Brain,
  DEVELOPER_TOOLS: Wrench,
  OPEN_SOURCE: GitBranch,
  INDIE_GAMES: Gamepad2,
  CYBERSECURITY: Shield,
  BLOCKCHAIN: Boxes,
  HARDWARE_IOT: Cpu,
  DATA_SCIENCE: BarChart3,
  DESIGN_TOOLS: Palette,
  OTHER_TECHNOLOGY: Sparkles,
};

const ROLE_STYLE: Record<string, string> = {
  OWNER: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  ADMIN: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  CONTRIBUTOR: "bg-zinc-500/15 text-zinc-300 border-zinc-500/25",
  VIEWER: "bg-zinc-600/10 text-zinc-400 border-zinc-600/20",
};

function RoleChip({ role, className }: { role: string; className?: string }) {
  const name = MEMBER_ROLES.find((r) => r.slug === role)?.name ?? role;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        ROLE_STYLE[role] ?? ROLE_STYLE.VIEWER,
        className
      )}
    >
      {name}
    </span>
  );
}

function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "text-sm leading-relaxed text-zinc-300",
        "[&_a]:text-cyan-300 [&_a]:underline-offset-2 hover:[&_a]:underline",
        "[&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h4]:font-display",
        "[&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h1]:mt-5 [&_h1]:mb-2",
        "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2",
        "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-1.5",
        "[&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5",
        "[&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-cyan-200",
        "[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-white/[0.07] [&_pre]:bg-white/[0.04] [&_pre]:p-3 [&_pre]:text-xs",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-cyan-500/40 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
        "[&_hr]:my-4 [&_hr]:border-white/10 [&_img]:max-w-full [&_img]:rounded-lg",
        className
      )}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}

function DueChip({ dueAt, done }: { dueAt: string | null; done: boolean }) {
  if (!dueAt) return null;
  const overdue = isOverdue(dueAt, done);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
        overdue ? "bg-rose-500/10 text-rose-300" : "bg-white/[0.05] text-muted-foreground"
      )}
    >
      <CalendarDays className="h-3 w-3" />
      {overdue ? "Overdue " : ""}
      {format(parseISO(dueAt), "MMM d")}
    </span>
  );
}

function RequestStateChip({ status }: { status: string }) {
  const meta: Record<string, { icon: IconType; cls: string; label: string }> = {
    PENDING: {
      icon: Clock3,
      cls: "border-amber-500/30 bg-amber-500/10 text-amber-300",
      label: "Request pending review",
    },
    ACCEPTED: {
      icon: CheckCircle2,
      cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
      label: "Request accepted",
    },
    REJECTED: {
      icon: XCircle,
      cls: "border-rose-500/30 bg-rose-500/10 text-rose-300",
      label: "Request rejected",
    },
    WITHDRAWN: {
      icon: Clock3,
      cls: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
      label: "Request withdrawn",
    },
  };
  const m = meta[status] ?? meta.PENDING;
  const Icon = m.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
        m.cls
      )}
    >
      <Icon className="h-3.5 w-3.5" /> {m.label}
    </span>
  );
}

function ReqRoleChip({ role }: { role: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        role === "CONTRIBUTOR" ? "bg-cyan-500/15 text-cyan-300" : "bg-zinc-500/15 text-zinc-400"
      )}
    >
      wants {role.toLowerCase()}
    </span>
  );
}

// ─── Main view ────────────────────────────────────────────────────────────────

const TAB_ITEMS = [
  { value: "overview", label: "Overview", icon: LayoutDashboard },
  { value: "updates", label: "Updates", icon: Megaphone },
  { value: "tasks", label: "Tasks", icon: ListChecks },
  { value: "milestones", label: "Milestones", icon: Flag },
  { value: "team", label: "Team", icon: Users },
  { value: "activity", label: "Activity", icon: Activity },
] as const;

export function ProjectView({ slug }: { slug: string }) {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const back = useApp((s) => s.back);

  const [detail, setDetail] = useState<ProjectDetailResponse | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [tab, setTab] = useState("overview");

  const [tasks, setTasks] = useState<TaskDTO[] | null>(null);
  const [milestones, setMilestones] = useState<MilestoneDTO[] | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdateDTO[] | null>(null);
  const [membersResp, setMembersResp] = useState<MembersResponse | null>(null);
  const [comments, setComments] = useState<CommentDTO[] | null>(null);
  const [requests, setRequests] = useState<CollabRequestDTO[] | null>(null);
  const [mySentRequest, setMySentRequest] = useState<CollabRequestDTO | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [likePending, setLikePending] = useState(false);
  const [savePending, setSavePending] = useState(false);

  const myRole = detail?.myRole ?? null;
  const canManage = myRole === "OWNER" || myRole === "ADMIN";
  const canContribute = myRole === "OWNER" || myRole === "ADMIN" || myRole === "CONTRIBUTOR";
  const canManageRef = useRef(false);
  canManageRef.current = canManage;

  const base = `/api/projects/${enc(slug)}`;

  const loadDetail = useCallback(async () => {
    setPhase("loading");
    try {
      const d = await get<ProjectDetailResponse>(base);
      setDetail(d);
      setPhase("ready");
    } catch (e) {
      setErrorMsg(e instanceof ApiError ? e.message : "Failed to load project");
      setPhase("error");
    }
  }, [base]);

  const loadWorkspace = useCallback(
    async (manage: boolean) => {
      const [t, m, u, mem, c, r] = await Promise.allSettled([
        get<{ tasks: TaskDTO[] }>(`${base}/tasks`),
        get<{ milestones: MilestoneDTO[] }>(`${base}/milestones`),
        get<{ updates: ProjectUpdateDTO[] }>(`${base}/updates`),
        get<MembersResponse>(`${base}/members`),
        get<{ comments: CommentDTO[] }>(`${base}/comments`),
        manage ? get<{ requests: CollabRequestDTO[] }>(`${base}/requests`) : Promise.resolve(null),
      ]);
      if (t.status === "fulfilled") setTasks(t.value.tasks);
      if (m.status === "fulfilled") setMilestones(m.value.milestones);
      if (u.status === "fulfilled") setUpdates(u.value.updates);
      if (mem.status === "fulfilled") setMembersResp(mem.value);
      if (c.status === "fulfilled") setComments(c.value.comments);
      if (r.status === "fulfilled" && r.value) setRequests(r.value.requests);
    },
    [base]
  );

  const refetchAll = useCallback(async () => {
    // Reload the detail; the phase effect re-fetches the whole workspace once it resolves.
    await loadDetail();
  }, [loadDetail]);

  const refetchComments = useCallback(async () => {
    try {
      const c = await get<{ comments: CommentDTO[] }>(`${base}/comments`);
      setComments(c.comments);
    } catch (e) {
      toast.error(errText(e));
    }
  }, [base]);

  useEffect(() => {
    // reset per-slug state
    setTasks(null);
    setMilestones(null);
    setUpdates(null);
    setMembersResp(null);
    setComments(null);
    setRequests(null);
    setTab("overview");
    loadDetail();
  }, [loadDetail, slug]);

  useEffect(() => {
    if (phase === "ready") loadWorkspace(canManage);
  }, [phase, canManage, loadWorkspace]);

  // Non-members: check whether this viewer already has a request for the project
  // (PENDING / REJECTED / WITHDRAWN states surface honestly instead of a dead apply button).
  useEffect(() => {
    setMySentRequest(null);
    if (phase !== "ready" || !user || detail?.myRole) return;
    let cancelled = false;
    get<{ sent: CollabRequestDTO[] }>("/api/me/requests")
      .then((r) => {
        if (cancelled) return;
        setMySentRequest(r.sent.find((x) => x.project?.id === detail?.project.id) ?? null);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [phase, user, detail?.project.id, detail?.myRole]);

  const project = detail?.project ?? null;

  // ── Social actions ──
  async function toggleLike() {
    if (!detail) return;
    if (!user) {
      toast.error("Sign in to like projects");
      navigate({ name: "login" });
      return;
    }
    setLikePending(true);
    try {
      const r = await post<{ liked: boolean; likeCount: number }>(`${base}/like`);
      setDetail((d) => (d ? { ...d, liked: r.liked, likeCount: r.likeCount } : d));
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setLikePending(false);
    }
  }

  async function toggleSave() {
    if (!detail) return;
    if (!user) {
      toast.error("Sign in to save projects");
      navigate({ name: "login" });
      return;
    }
    setSavePending(true);
    try {
      const r = await post<{ saved: boolean }>(`${base}/save`);
      setDetail((d) => (d ? { ...d, saved: r.saved } : d));
      toast.success(r.saved ? "Saved to your library" : "Removed from library");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSavePending(false);
    }
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  }

  async function archiveProject() {
    try {
      await del(`${base}`);
      toast.success("Project archived");
      navigate({ name: "explore" });
    } catch (e) {
      toast.error(errText(e));
    }
  }

  // ── Loading / error states (stale content stays visible during background refetch) ──
  if (phase === "loading" && !detail) return <ProjectSkeleton />;
  if (phase === "error" || !detail || !project) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20">
        <EmptyState
          icon={FileQuestion}
          title="Project not found or private"
          description={errorMsg || "This project does not exist, was archived, or is private."}
          action={
            <Button variant="outline" onClick={() => navigate({ name: "explore" })}>
              <ArrowLeft className="h-4 w-4" /> Back to explore
            </Button>
          }
        />
      </div>
    );
  }

  const visibilityMeta: Record<string, { icon: IconType; label: string }> = {
    PUBLIC: { icon: Globe, label: "Public" },
    UNLISTED: { icon: Eye, label: "Unlisted" },
    PRIVATE: { icon: EyeOff, label: "Private" },
  };
  const VisIcon = visibilityMeta[project.visibility]?.icon ?? Globe;

  const tabCounts: Record<string, number | undefined> = {
    updates: updates?.length,
    tasks: tasks?.length,
    milestones: milestones?.length,
    team: membersResp?.members.length,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-4 md:px-6 md:pt-6">
      {/* Back */}
      <button
        onClick={back}
        className="focus-glow mb-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      {/* Cover banner */}
      <div className="relative h-40 overflow-hidden rounded-2xl border border-white/[0.07] md:h-56">
        <ProjectCover cover={project.coverImage} name={project.name} seed={project.slug.length} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080d] via-[#08080d]/20 to-transparent" />
      </div>

      {/* Overlapping header card */}
      <div className="glass-card relative z-10 mx-1 rounded-2xl p-5 md:-mt-14 md:mx-6 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                {project.name}
              </h1>
              <StatusPill status={project.status} />
              <span
                className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] text-muted-foreground"
                title={`Visibility: ${visibilityMeta[project.visibility]?.label ?? project.visibility}`}
              >
                <VisIcon className="h-3 w-3" />
                {visibilityMeta[project.visibility]?.label}
              </span>
              {myRole && <RoleChip role={myRole} />}
            </div>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{project.tagline}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <button
                onClick={() => navigate({ name: "profile", username: project.owner.username })}
                className="focus-glow inline-flex items-center gap-2 rounded-lg py-0.5 transition-colors hover:text-foreground"
                aria-label={`View profile of ${project.owner.displayName}`}
              >
                <UserAvatar user={project.owner} size={22} />
                <span className="font-medium">{project.owner.displayName}</span>
              </button>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> {project.memberCount} member
                {project.memberCount === 1 ? "" : "s"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" /> {detail.likeCount} like
                {detail.likeCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 lg:shrink-0 lg:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLike}
              disabled={likePending}
              aria-pressed={detail.liked}
              className={cn("h-9 gap-1.5", detail.liked && "border-rose-500/40 text-rose-300")}
            >
              <Heart className={cn("h-4 w-4", detail.liked && "fill-current")} />
              {detail.likeCount}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSave}
              disabled={savePending}
              aria-pressed={detail.saved}
              className={cn("h-9", detail.saved && "border-cyan-500/40 text-cyan-300")}
            >
              <Bookmark className={cn("h-4 w-4", detail.saved && "fill-current")} />
              <span className="hidden sm:inline">{detail.saved ? "Saved" : "Save"}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={share} className="h-9">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReportOpen(true)}
                className="h-9 text-muted-foreground"
              >
                <Flag className="h-4 w-4" />
                <span className="sr-only">Report project</span>
              </Button>
            )}

            {/* Settings (owner/admin) */}
            {canManage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Settings2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil className="h-4 w-4" /> Edit project
                  </DropdownMenuItem>
                  {myRole === "OWNER" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setArchiveOpen(true)}
                        className="text-rose-300 focus:text-rose-300"
                      >
                        <Archive className="h-4 w-4" /> Archive project
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Join flow */}
            {!user && project.visibility !== "PRIVATE" && (
              <Button size="sm" className="btn-hero h-9" onClick={() => navigate({ name: "login" })}>
                <UserPlus className="h-4 w-4" /> Sign in to collaborate
              </Button>
            )}
            {user && !myRole &&
              (detail.myRequest || mySentRequest ? (
                <RequestStateChip status={(detail.myRequest ?? mySentRequest!).status} />
              ) : (
                <Button size="sm" className="btn-hero h-9" onClick={() => setJoinOpen(true)}>
                  <UserPlus className="h-4 w-4" /> Request to join
                </Button>
              ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <div className="overflow-x-auto pb-0.5">
          <TabsList className="glass h-11 w-fit min-w-full gap-1 rounded-xl bg-transparent p-1">
            {TAB_ITEMS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="relative gap-1.5 rounded-lg px-3 text-xs data-[state=active]:bg-white/[0.06] data-[state=active]:text-foreground md:px-4 md:text-sm"
              >
                <t.icon className="h-4 w-4" />
                <span>{t.label}</span>
                {typeof tabCounts[t.value] === "number" && (
                  <span className="rounded-full bg-white/[0.07] px-1.5 text-[10px] text-muted-foreground">
                    {tabCounts[t.value]}
                  </span>
                )}
                {tab === t.value && (
                  <motion.span
                    layoutId="project-tab-underline"
                    className="absolute inset-x-3 bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab
            project={project}
            tasks={tasks}
            milestones={milestones}
            comments={comments}
            user={user}
            myRole={myRole}
            canManage={canManage}
            setComments={setComments}
            refetchComments={refetchComments}
          />
        </TabsContent>

        <TabsContent value="updates" className="mt-6">
          <UpdatesTab
            base={base}
            updates={updates}
            canContribute={canContribute}
            onCreated={(u) => setUpdates((prev) => [u, ...(prev ?? [])])}
          />
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <TasksTab
            base={base}
            tasks={tasks}
            members={membersResp?.members ?? []}
            canContribute={canContribute}
            setTasks={setTasks}
          />
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          <MilestonesTab
            base={base}
            milestones={milestones}
            canContribute={canContribute}
            setMilestones={setMilestones}
          />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <TeamTab
            project={project}
            user={user}
            myRole={myRole}
            canManage={canManage}
            membersResp={membersResp}
            requests={requests}
            refetchAll={refetchAll}
          />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ActivityTab updates={updates} tasks={tasks} milestones={milestones} />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <EditProjectDialog
        project={project}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSaved={(p) => {
          setDetail((d) => (d ? { ...d, project: p } : d));
          loadWorkspace(canManageRef.current);
        }}
      />
      <JoinRequestDialog
        open={joinOpen}
        onOpenChange={setJoinOpen}
        slug={slug}
        onSent={(req) => {
          setDetail((d) => (d ? { ...d, myRequest: req } : d));
          setMySentRequest(req);
        }}
      />
      <ReportProjectDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        projectId={project.id}
        projectName={project.name}
      />
      <AlertDialog open={archiveOpen} onOpenChange={setArchiveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this project?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{project.name}&rdquo; will be marked as archived and removed from discovery.
              This cannot be undone from the workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={archiveProject}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              <Archive className="h-4 w-4" /> Archive project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProjectSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-6 md:px-6">
      <Skeleton className="h-40 w-full rounded-2xl bg-white/[0.05] md:h-56" />
      <div className="glass-card mx-1 -mt-10 rounded-2xl p-6 md:mx-6">
        <Skeleton className="h-8 w-1/3 bg-white/[0.07]" />
        <Skeleton className="mt-3 h-4 w-2/3 bg-white/[0.04]" />
        <div className="mt-5 flex gap-4">
          <Skeleton className="h-6 w-36 rounded-full bg-white/[0.05]" />
          <Skeleton className="h-6 w-24 rounded-full bg-white/[0.05]" />
        </div>
      </div>
      <Skeleton className="mt-8 h-10 w-2/3 rounded-xl bg-white/[0.05]" />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-48 w-full rounded-2xl bg-white/[0.04]" />
          <Skeleton className="h-32 w-full rounded-2xl bg-white/[0.04]" />
        </div>
        <Skeleton className="h-56 w-full rounded-2xl bg-white/[0.04]" />
      </div>
    </div>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewTab({
  project,
  tasks,
  milestones,
  comments,
  user,
  myRole,
  canManage,
  setComments,
  refetchComments,
}: {
  project: ProjectDetail;
  tasks: TaskDTO[] | null;
  milestones: MilestoneDTO[] | null;
  comments: CommentDTO[] | null;
  user: ReturnType<typeof useApp.getState>["user"];
  myRole: string | null;
  canManage: boolean;
  setComments: React.Dispatch<React.SetStateAction<CommentDTO[] | null>>;
  refetchComments: () => Promise<void>;
}) {
  const cat = PROJECT_CATEGORIES.find((c) => c.slug === project.category);
  const CatIcon = cat ? CATEGORY_ICON[cat.slug] ?? Sparkles : Sparkles;
  const completed = (milestones ?? []).filter((m) => m.completedAt).length;
  const totalMilestones = (milestones ?? []).length;
  const healthValue = totalMilestones ? Math.round((completed / totalMilestones) * 100) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left column */}
      <div className="space-y-6 lg:col-span-2">
        <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Project description">
          <h2 className="font-display mb-3 text-lg font-semibold">About this project</h2>
          {project.description?.trim() ? (
            <Markdown>{project.description}</Markdown>
          ) : (
            <p className="text-sm italic text-muted-foreground">No description provided yet.</p>
          )}
        </section>

        <CommentsSection
          projectSlug={project.slug}
          comments={comments}
          user={user}
          canManage={canManage}
          setComments={setComments}
          refetchComments={refetchComments}
        />
      </div>

      {/* Right column */}
      <div className="space-y-6">
        <section className="glass-card rounded-2xl p-5" aria-label="Project facts">
          <h3 className="font-display mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Facts
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">Category</dt>
              <dd className="inline-flex items-center gap-1.5 font-medium">
                <CatIcon className="h-4 w-4 text-cyan-300" />
                {cat?.name ?? project.category}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <StatusPill status={project.status} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">Created</dt>
              <dd className="font-mono text-xs">{fmtDate(project.createdAt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">Updated</dt>
              <dd className="font-mono text-xs">{fmtDate(project.updatedAt)}</dd>
            </div>
          </dl>

          {(project.repositoryUrl || project.demoUrl || project.websiteUrl) && (
            <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-glow flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
                >
                  <Github className="h-4 w-4" /> Repository <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-glow flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
                >
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              )}
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-glow flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
                >
                  <Globe className="h-4 w-4" /> Website
                </a>
              )}
            </div>
          )}

          {project.requiredSkills.length > 0 && (
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Required skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.requiredSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-300"
                  >
                    {SKILLS.find((k) => k.slug === s)?.name ?? s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="glass-card rounded-2xl p-5" aria-label="Project health">
          <h3 className="font-display mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Health
          </h3>
          <div className="space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Milestones completed</span>
                <span className="font-mono font-semibold">
                  {completed}/{totalMilestones}
                </span>
              </div>
              <Progress value={healthValue} className="h-2" aria-label="Milestone progress" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Team size</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Users className="h-4 w-4 text-violet-300" /> {project.memberCount}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Open tasks</span>
              <span className="font-mono font-medium">
                {(tasks ?? []).filter((t) => t.status !== "DONE").length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last activity</span>
              <span className="inline-flex items-center gap-1.5 text-xs">
                <Clock3 className="h-3.5 w-3.5" /> {fmtAgo(project.updatedAt)}
              </span>
            </div>
          </div>
          {myRole && (
            <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] text-muted-foreground">
              You are a {MEMBER_ROLES.find((r) => r.slug === myRole)?.name.toLowerCase()} of this
              project.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

// ─── Comments (Overview) ──────────────────────────────────────────────────────

function CommentsSection({
  projectSlug,
  comments,
  user,
  canManage,
  setComments,
  refetchComments,
}: {
  projectSlug: string;
  comments: CommentDTO[] | null;
  user: ReturnType<typeof useApp.getState>["user"];
  canManage: boolean;
  setComments: React.Dispatch<React.SetStateAction<CommentDTO[] | null>>;
  refetchComments: () => Promise<void>;
}) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useApp((s) => s.navigate);

  async function submit() {
    if (!body.trim()) return;
    setSending(true);
    try {
      const r = await post<{ comment: CommentDTO }>(`/api/projects/${enc(projectSlug)}/comments`, {
        body,
      });
      setComments((prev) => [r.comment, ...(prev ?? [])]);
      setBody("");
      toast.success("Comment posted");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  async function submitReply() {
    if (!replyTo || !replyBody.trim()) return;
    setSending(true);
    try {
      await post(`/api/projects/${enc(projectSlug)}/comments`, {
        body: replyBody,
        parentId: replyTo,
      });
      setReplyBody("");
      setReplyTo(null);
      await refetchComments();
      toast.success("Reply posted");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await del(`/api/comments/${deleteId}`);
      await refetchComments();
      toast.success("Comment deleted");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Project discussion">
      <h2 className="font-display mb-4 text-lg font-semibold">
        Discussion{" "}
        <span className="ml-1 text-sm font-normal text-muted-foreground">
          ({comments?.length ?? 0})
        </span>
      </h2>

      {user ? (
        <div className="mb-6">
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your thoughts on this project..."
            rows={3}
            maxLength={LIMITS.comment}
            className="focus-glow resize-none bg-white/[0.03]"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground">
              {body.length}/{LIMITS.comment}
            </span>
            <Button size="sm" className="btn-hero" onClick={submit} disabled={sending || !body.trim()}>
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Comment
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] py-5">
          <p className="text-sm text-muted-foreground">Sign in to join the discussion</p>
          <Button size="sm" variant="outline" onClick={() => navigate({ name: "login" })}>
            Sign in
          </Button>
        </div>
      )}

      {comments === null ? (
        <ListRowsSkeleton rows={2} />
      ) : comments.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No comments yet. Be the first to say something.
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id}>
              <CommentItem
                comment={c}
                user={user}
                canManage={canManage}
                onReply={() => {
                  setReplyTo(c.id);
                  setReplyBody("");
                }}
                onDelete={() => setDeleteId(c.id)}
              />
              {/* replies — one level */}
              {(c.replies?.length ?? 0) > 0 && (
                <ul className="ml-8 space-y-3 border-l border-white/[0.07] pl-4 pt-3">
                  {c.replies!.map((r) => (
                    <li key={r.id}>
                      <CommentItem
                        comment={r}
                        user={user}
                        canManage={canManage}
                        isReply
                        onDelete={() => setDeleteId(r.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {replyTo === c.id && (
                <div className="ml-8 mt-3 rounded-xl border border-cyan-500/20 bg-white/[0.02] p-3">
                  <Textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    rows={2}
                    maxLength={LIMITS.comment}
                    placeholder={`Reply to ${c.author?.displayName ?? "this comment"}...`}
                    className="focus-glow resize-none bg-white/[0.03]"
                    autoFocus
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setReplyTo(null);
                        setReplyBody("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="btn-hero"
                      onClick={submitReply}
                      disabled={sending || !replyBody.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
            <AlertDialogDescription>
              The comment will be removed for everyone. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

function CommentItem({
  comment,
  user,
  canManage,
  isReply = false,
  onReply,
  onDelete,
}: {
  comment: CommentDTO;
  user: ReturnType<typeof useApp.getState>["user"];
  canManage: boolean;
  isReply?: boolean;
  onReply?: () => void;
  onDelete: () => void;
}) {
  const canDelete =
    !!user && comment.author && (comment.author.id === user.id || canManage);
  const deleted = comment.author === null || comment.body === "[deleted]";

  return (
    <div className="flex gap-3">
      {comment.author ? (
        <UserAvatar user={comment.author} size={isReply ? 26 : 32} />
      ) : (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-muted-foreground",
            isReply ? "h-[26px] w-[26px]" : "h-8 w-8"
          )}
        >
          <X className="h-3 w-3" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">
            {deleted ? "Deleted" : comment.author.displayName}
          </span>
          <span className="text-[11px] text-muted-foreground">{fmtAgo(comment.createdAt)}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap break-words text-sm text-zinc-300">{comment.body}</p>
        {!deleted && (
          <div className="mt-1.5 flex items-center gap-3">
            {onReply && (
              <button
                onClick={onReply}
                className="focus-glow rounded text-[11px] font-medium text-muted-foreground transition-colors hover:text-cyan-300"
              >
                Reply
              </button>
            )}
            {canDelete && (
              <button
                onClick={onDelete}
                className="focus-glow inline-flex items-center gap-1 rounded text-[11px] text-muted-foreground transition-colors hover:text-rose-300"
                aria-label="Delete comment"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ListRowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-40 bg-white/[0.05]" />
            <Skeleton className="h-3 w-3/4 bg-white/[0.03]" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Updates tab ──────────────────────────────────────────────────────────────

function UpdatesTab({
  base,
  updates,
  canContribute,
  onCreated,
}: {
  base: string;
  updates: ProjectUpdateDTO[] | null;
  canContribute: boolean;
  onCreated: (u: ProjectUpdateDTO) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  async function publish() {
    setSending(true);
    try {
      const r = await post<{ update: ProjectUpdateDTO }>(`${base}/updates`, { title, body });
      onCreated(r.update);
      setTitle("");
      setBody("");
      toast.success("Update published — +5 XP");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {canContribute && (
        <section className="glass-card rounded-2xl p-5" aria-label="Publish an update">
          <h2 className="font-display mb-3 text-base font-semibold">Post a project update</h2>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Update title (e.g. Alpha build shipped)"
            maxLength={LIMITS.updateTitle}
            className="focus-glow bg-white/[0.03]"
          />
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What changed? Markdown is supported."
            rows={4}
            maxLength={LIMITS.updateBody}
            className="focus-glow mt-2 resize-y bg-white/[0.03]"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground">
              {body.length}/{LIMITS.updateBody}
            </span>
            <Button
              size="sm"
              className="btn-hero"
              onClick={publish}
              disabled={sending || !title.trim() || !body.trim()}
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Megaphone className="h-4 w-4" />}
              Publish update
            </Button>
          </div>
        </section>
      )}

      {updates === null ? (
        <ListRowsSkeleton rows={3} />
      ) : updates.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No updates yet"
          description={
            canContribute
              ? "Keep your collaborators and followers in the loop — publish the first update."
              : "The team has not posted any updates yet. Check back soon."
          }
        />
      ) : (
        <div className="space-y-4">
          {updates.map((u) => (
            <article key={u.id} className="glass-card rounded-2xl p-5">
              <header className="flex items-center gap-3">
                <UserAvatar user={u.author} size={34} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{u.author.displayName}</p>
                  <p className="text-[11px] text-muted-foreground">{fmtAgo(u.createdAt)}</p>
                </div>
              </header>
              <h3 className="font-display mt-3 text-lg font-semibold">{u.title}</h3>
              <Markdown className="mt-1">{u.body}</Markdown>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tasks tab ────────────────────────────────────────────────────────────────

function TasksTab({
  base,
  tasks,
  members,
  canContribute,
  setTasks,
}: {
  base: string;
  tasks: TaskDTO[] | null;
  members: ProjectMemberDTO[];
  canContribute: boolean;
  setTasks: React.Dispatch<React.SetStateAction<TaskDTO[] | null>>;
}) {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dragMovedRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  );

  const filtered = useMemo(() => {
    const list = tasks ?? [];
    if (assigneeFilter === "all") return list;
    if (assigneeFilter === "none") return list.filter((t) => !t.assignee);
    return list.filter((t) => t.assignee?.id === assigneeFilter);
  }, [tasks, assigneeFilter]);

  const byStatus = useMemo(() => {
    const map: Record<string, TaskDTO[]> = {};
    for (const s of TASK_STATUSES) map[s.slug] = [];
    for (const t of filtered) if (map[t.status]) map[t.status].push(t);
    return map;
  }, [filtered]);

  const activeTask = activeId ? (tasks ?? []).find((t) => t.id === activeId) ?? null : null;
  const selectedTask = taskId ? (tasks ?? []).find((t) => t.id === taskId) ?? null : null;

  function refetchTasks() {
    get<{ tasks: TaskDTO[] }>(`${base}/tasks`)
      .then((r) => setTasks(r.tasks))
      .catch((e) => toast.error(errText(e)));
  }

  async function moveTask(task: TaskDTO, status: string) {
    if (task.status === status) return;
    const toDone = status === "DONE" && task.status !== "DONE";
    // optimistic move
    setTasks((prev) =>
      (prev ?? []).map((t) =>
        t.id === task.id
          ? {
              ...t,
              status,
              completedAt: toDone
                ? new Date().toISOString()
                : status !== "DONE"
                  ? null
                  : t.completedAt,
            }
          : t
      )
    );
    try {
      const r = await patch<{ task: TaskDTO }>(`/api/tasks/${task.id}`, { status });
      setTasks((prev) => (prev ?? []).map((t) => (t.id === task.id ? r.task : t)));
      if (toDone) {
        toast.success(
          `Task completed — +10 XP to ${r.task.assignee?.displayName ?? "the assignee"}`
        );
      }
    } catch (e) {
      toast.error(errText(e));
      refetchTasks();
    }
  }

  function onDragStart(event: DragStartEvent) {
    dragMovedRef.current = true;
    setActiveId(String(event.active.id));
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 120);
    if (!over) return;
    const task = (tasks ?? []).find((t) => t.id === String(active.id));
    const targetStatus = String(over.id);
    if (!task || !TASK_STATUSES.some((s) => s.slug === targetStatus)) return;
    moveTask(task, targetStatus);
  }

  if (tasks === null) {
    return (
      <div className="grid auto-cols-[80%] grid-flow-col gap-3 sm:auto-cols-[272px]">
        {TASK_STATUSES.map((s) => (
          <div key={s.slug} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <Skeleton className="mb-3 h-5 w-24 bg-white/[0.06]" />
            <Skeleton className="mb-2 h-20 w-full rounded-lg bg-white/[0.04]" />
            <Skeleton className="h-20 w-full rounded-lg bg-white/[0.04]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex overflow-hidden rounded-lg border border-white/[0.08]">
          <button
            onClick={() => setView("kanban")}
            aria-pressed={view === "kanban"}
            className={cn(
              "focus-glow inline-flex h-9 items-center gap-1.5 px-3 text-xs font-medium transition-colors",
              view === "kanban" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Columns3 className="h-4 w-4" /> Kanban
          </button>
          <button
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={cn(
              "focus-glow inline-flex h-9 items-center gap-1.5 border-l border-white/[0.08] px-3 text-xs font-medium transition-colors",
              view === "list" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <AlignJustify className="h-4 w-4" /> List
          </button>
        </div>

        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger size="sm" className="h-9 w-[170px] bg-white/[0.03]" aria-label="Filter by assignee">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All assignees</SelectItem>
            <SelectItem value="none">Unassigned</SelectItem>
            {members.map((m) => (
              <SelectItem key={m.id} value={m.user.id}>
                {m.user.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          {canContribute && (
            <Button size="sm" className="btn-hero h-9" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" /> New task
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No tasks here"
          description={
            canContribute
              ? "Break the work down — create the first task for your crew."
              : "Nothing matches this filter yet."
          }
          action={
            canContribute ? (
              <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" /> New task
              </Button>
            ) : undefined
          }
        />
      ) : view === "kanban" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragCancel={() => {
            setActiveId(null);
            window.setTimeout(() => {
              dragMovedRef.current = false;
            }, 120);
          }}
        >
          <div className="kanban-scroll grid auto-cols-[85%] grid-flow-col gap-3 overflow-x-auto pb-2 sm:auto-cols-[272px]">
            {TASK_STATUSES.map((s) => (
              <KanbanColumn
                key={s.slug}
                status={s.slug}
                name={s.name}
                tasks={byStatus[s.slug] ?? []}
                canContribute={canContribute}
                onOpen={(t) => {
                  if (!dragMovedRef.current) setTaskId(t.id);
                }}
                onStatusChange={moveTask}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
            {activeTask ? <TaskCardVisual task={activeTask} overlay /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/[0.07]">
          {filtered.map((t, i) => (
            <div
              key={t.id}
              className={cn(
                "flex flex-wrap items-center gap-2 bg-white/[0.02] px-3 py-2.5 transition-colors hover:bg-white/[0.04] sm:gap-3 sm:px-4",
                i > 0 && "border-t border-white/[0.06]"
              )}
            >
              <PriorityPill priority={t.priority} />
              <button
                onClick={() => setTaskId(t.id)}
                className="focus-glow min-w-0 flex-1 truncate rounded text-left text-sm font-medium transition-colors hover:text-cyan-300"
              >
                {t.title}
              </button>
              {canContribute ? (
                <div onPointerDown={(e) => e.stopPropagation()}>
                  <Select value={t.status} onValueChange={(v) => moveTask(t, v)}>
                    <SelectTrigger
                      size="sm"
                      className="h-7 w-[118px] text-[11px]"
                      aria-label={`Status of ${t.title}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TASK_STATUSES.map((s) => (
                        <SelectItem key={s.slug} value={s.slug}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {TASK_STATUSES.find((s) => s.slug === t.status)?.name ?? t.status}
                </span>
              )}
              {t.assignee ? (
                <span className="inline-flex items-center gap-1.5" title={t.assignee.displayName}>
                  <UserAvatar user={t.assignee} size={22} />
                  <span className="hidden max-w-[100px] truncate text-xs text-muted-foreground md:inline">
                    {t.assignee.displayName}
                  </span>
                </span>
              ) : (
                <span className="hidden text-xs text-muted-foreground sm:inline">Unassigned</span>
              )}
              <DueChip dueAt={t.dueAt} done={t.status === "DONE"} />
            </div>
          ))}
        </div>
      )}

      <CreateTaskDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        base={base}
        members={members}
        onCreated={(t) => setTasks((prev) => [t, ...(prev ?? [])])}
      />

      {selectedTask && (
        <TaskDetailDialog
          base={base}
          task={selectedTask}
          members={members}
          canContribute={canContribute}
          onClose={() => setTaskId(null)}
          onUpdated={(t) =>
            setTasks((prev) => (prev ?? []).map((x) => (x.id === t.id ? t : x)))
          }
          onDeleted={(id) => {
            setTasks((prev) => (prev ?? []).filter((x) => x.id !== id));
            setTaskId(null);
          }}
        />
      )}
    </div>
  );
}

function KanbanColumn({
  status,
  name,
  tasks,
  canContribute,
  onOpen,
  onStatusChange,
}: {
  status: string;
  name: string;
  tasks: TaskDTO[];
  canContribute: boolean;
  onOpen: (t: TaskDTO) => void;
  onStatusChange: (t: TaskDTO, status: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-[300px] flex-col rounded-xl border bg-white/[0.02] p-2 transition-colors",
        isOver ? "border-cyan-500/40 bg-cyan-500/[0.04]" : "border-white/[0.06]"
      )}
    >
      <div className="mb-2 flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {name}
        </span>
        <span className="rounded-full bg-white/[0.06] px-1.5 text-[10px] font-mono text-muted-foreground">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/[0.06] py-6">
            <span className="text-[11px] text-muted-foreground/60">Drop tasks here</span>
          </div>
        ) : (
          tasks.map((t) => (
            <KanbanCard
              key={t.id}
              task={t}
              canContribute={canContribute}
              onOpen={onOpen}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

function KanbanCard({
  task,
  canContribute,
  onOpen,
  onStatusChange,
}: {
  task: TaskDTO;
  canContribute: boolean;
  onOpen: (t: TaskDTO) => void;
  onStatusChange: (t: TaskDTO, status: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    disabled: !canContribute,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onOpen(task)}
      className={cn(
        "glass-card group cursor-grab touch-none rounded-lg p-3 active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
      aria-label={`Task: ${task.title}`}
    >
      <TaskCardVisual task={task} />
      {canContribute && (
        <div
          className="mt-2 flex items-center justify-between border-t border-white/[0.05] pt-2"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Select value={task.status} onValueChange={(v) => onStatusChange(task, v)}>
            <SelectTrigger
              size="sm"
              className="h-6 w-[112px] border-white/[0.08] px-2 text-[10px] focus-glow"
              aria-label={`Move ${task.title} to status`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUSES.map((s) => (
                <SelectItem key={s.slug} value={s.slug} className="text-xs">
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-cyan-300/70" />
        </div>
      )}
    </div>
  );
}

function TaskCardVisual({ task, overlay = false }: { task: TaskDTO; overlay?: boolean }) {
  const done = task.status === "DONE";
  return (
    <div
      className={cn(
        overlay && "w-[272px] rotate-2 rounded-lg border border-cyan-500/30 bg-[#12121c] p-3 shadow-2xl"
      )
      }>
      <div className="flex items-start justify-between gap-2">
        <PriorityPill priority={task.priority} />
        {task.assignee && <UserAvatar user={task.assignee} size={22} />}
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug">{task.title}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <DueChip dueAt={task.dueAt} done={done} />
        {typeof task.commentCount === "number" && task.commentCount > 0 && (
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <MessageSquare className="h-3 w-3" /> {task.commentCount}
          </span>
        )}
        {done && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-300">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Task detail dialog ───────────────────────────────────────────────────────

function TaskDetailDialog({
  base,
  task,
  members,
  canContribute,
  onClose,
  onUpdated,
  onDeleted,
}: {
  base: string;
  task: TaskDTO;
  members: ProjectMemberDTO[];
  canContribute: boolean;
  onClose: () => void;
  onUpdated: (t: TaskDTO) => void;
  onDeleted: (id: string) => void;
}) {
  const [titleDraft, setTitleDraft] = useState(task.title);
  const [descEditing, setDescEditing] = useState(false);
  const [descDraft, setDescDraft] = useState(task.description);
  const [dueDraft, setDueDraft] = useState(task.dueAt ? format(parseISO(task.dueAt), "yyyy-MM-dd") : "");
  const [pending, setPending] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [comments, setComments] = useState<CommentDTO[] | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [commentSending, setCommentSending] = useState(false);

  useEffect(() => {
    setTitleDraft(task.title);
    setDescDraft(task.description);
    setDescEditing(false);
    setDueDraft(task.dueAt ? format(parseISO(task.dueAt), "yyyy-MM-dd") : "");
  }, [task.id, task.title, task.description, task.dueAt]);

  useEffect(() => {
    let cancelled = false;
    setComments(null);
    get<{ comments: CommentDTO[] }>(`/api/tasks/${task.id}/comments`)
      .then((r) => {
        if (!cancelled) setComments(r.comments);
      })
      .catch((e) => {
        if (!cancelled) {
          setComments([]);
          toast.error(errText(e));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [task.id]);

  async function doPatch(body: Record<string, unknown>, quiet = false) {
    setPending(true);
    try {
      const r = await patch<{ task: TaskDTO }>(`/api/tasks/${task.id}`, body);
      onUpdated(r.task);
      if (!quiet) toast.success("Task updated");
      return r.task;
    } catch (e) {
      toast.error(errText(e));
      return null;
    } finally {
      setPending(false);
    }
  }

  async function addComment() {
    if (!commentBody.trim()) return;
    setCommentSending(true);
    try {
      const r = await post<{ comment: CommentDTO }>(`/api/tasks/${task.id}/comments`, {
        body: commentBody,
      });
      setComments((prev) => [...(prev ?? []), r.comment]);
      setCommentBody("");
      toast.success("Comment added");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setCommentSending(false);
    }
  }

  async function deleteTask() {
    try {
      await del(`/api/tasks/${task.id}`);
      toast.success("Task deleted");
      onDeleted(task.id);
    } catch (e) {
      toast.error(errText(e));
    }
  }

  const titleChanged = titleDraft.trim() !== task.title && titleDraft.trim().length > 0;
  const descChanged = descDraft !== task.description;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display">Task</DialogTitle>
          <DialogDescription>
            Created by {task.creator.displayName} · {fmtAgo(task.createdAt)}
          </DialogDescription>
        </DialogHeader>

        {/* Title */}
        <div className="space-y-2">
          {canContribute ? (
            <div className="flex items-center gap-2">
              <Input
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                maxLength={LIMITS.taskTitle}
                className="focus-glow bg-white/[0.03] text-base font-semibold"
                aria-label="Task title"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && titleChanged) doPatch({ title: titleDraft.trim() });
                }}
              />
              {titleChanged && (
                <Button size="sm" onClick={() => doPatch({ title: titleDraft.trim() })} disabled={pending}>
                  Save
                </Button>
              )}
            </div>
          ) : (
            <h3 className="font-display text-lg font-semibold">{task.title}</h3>
          )}
        </div>

        {/* Properties grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Status</Label>
            {canContribute ? (
              <Select
                value={task.status}
                onValueChange={(v) => {
                  if (v === "DONE" && task.status !== "DONE") {
                    toast.success(
                      `Task completed — +10 XP to ${task.assignee?.displayName ?? "the assignee"}`
                    );
                  }
                  doPatch({ status: v });
                }}
              >
                <SelectTrigger className="w-full bg-white/[0.03]" aria-label="Task status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUSES.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm">{TASK_STATUSES.find((s) => s.slug === task.status)?.name}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Priority</Label>
            {canContribute ? (
              <Select value={task.priority} onValueChange={(v) => doPatch({ priority: v })}>
                <SelectTrigger className="w-full bg-white/[0.03]" aria-label="Task priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <PriorityPill priority={task.priority} />
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Assignee</Label>
            {canContribute ? (
              <Select
                value={task.assignee?.id ?? "none"}
                onValueChange={(v) => doPatch({ assigneeId: v === "none" ? null : v })}
              >
                <SelectTrigger className="w-full bg-white/[0.03]" aria-label="Task assignee">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.user.id}>
                      {m.user.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm">{task.assignee?.displayName ?? "Unassigned"}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Due date</Label>
            {canContribute ? (
              <Input
                type="date"
                value={dueDraft}
                onChange={(e) => {
                  const v = e.target.value;
                  setDueDraft(v);
                  doPatch({ dueAt: v ? new Date(`${v}T12:00:00`).toISOString() : null }, true);
                }}
                className="focus-glow w-full bg-white/[0.03]"
                aria-label="Task due date"
              />
            ) : (
              <DueChip dueAt={task.dueAt} done={task.status === "DONE"} />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Description
            </Label>
            {canContribute && (
              <button
                onClick={() => {
                  setDescEditing((v) => !v);
                  setDescDraft(task.description);
                }}
                className="focus-glow inline-flex items-center gap-1 rounded text-[11px] text-muted-foreground transition-colors hover:text-cyan-300"
              >
                <Pencil className="h-3 w-3" /> {descEditing ? "Cancel" : "Edit"}
              </button>
            )}
          </div>
          {descEditing ? (
            <div className="space-y-2">
              <Textarea
                value={descDraft}
                onChange={(e) => setDescDraft(e.target.value)}
                rows={5}
                maxLength={LIMITS.taskDescription}
                className="focus-glow resize-y bg-white/[0.03] font-mono text-xs"
                placeholder="Describe the work (Markdown supported)"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  disabled={pending || !descChanged}
                  onClick={async () => {
                    const t = await doPatch({ description: descDraft });
                    if (t) setDescEditing(false);
                  }}
                >
                  Save description
                </Button>
              </div>
            </div>
          ) : task.description?.trim() ? (
            <Markdown>{task.description}</Markdown>
          ) : (
            <p className="text-sm italic text-muted-foreground">No description.</p>
          )}
        </div>

        {/* Comments */}
        <div className="space-y-3 border-t border-white/[0.07] pt-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Comments
          </h4>
          {comments === null ? (
            <ListRowsSkeleton rows={2} />
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          ) : (
            <ul className="max-h-56 space-y-3 overflow-y-auto pr-1">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-2.5">
                  <UserAvatar user={c.author} size={26} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{c.author?.displayName ?? "Deleted"}</span>
                      <span className="text-[10px] text-muted-foreground">{fmtAgo(c.createdAt)}</span>
                    </div>
                    <p className="whitespace-pre-wrap break-words text-xs text-zinc-300">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {canContribute && (
            <div className="flex items-end gap-2">
              <Textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                rows={2}
                maxLength={LIMITS.comment}
                placeholder="Write a comment..."
                className="focus-glow resize-none bg-white/[0.03] text-sm"
              />
              <Button
                size="sm"
                onClick={addComment}
                disabled={commentSending || !commentBody.trim()}
                aria-label="Add comment"
              >
                {commentSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {canContribute && (
          <DialogFooter className="border-t border-white/[0.07] pt-4 sm:justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmDelete(true)}
              className="text-rose-300 hover:bg-rose-500/10 hover:text-rose-300"
            >
              <Trash2 className="h-4 w-4" /> Delete task
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{task.title}&rdquo; and its comments will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteTask}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              <Trash2 className="h-4 w-4" /> Delete task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

// ─── Create task dialog ───────────────────────────────────────────────────────

function CreateTaskDialog({
  open,
  onOpenChange,
  base,
  members,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  base: string;
  members: ProjectMemberDTO[];
  onCreated: (t: TaskDTO) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [assignee, setAssignee] = useState("none");
  const [due, setDue] = useState("");
  const [sending, setSending] = useState(false);

  function reset() {
    setTitle("");
    setDescription("");
    setPriority("NORMAL");
    setAssignee("none");
    setDue("");
  }

  async function create() {
    setSending(true);
    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        description,
        priority,
      };
      if (assignee !== "none") payload.assigneeId = assignee;
      if (due) payload.dueAt = new Date(`${due}T12:00:00`).toISOString();
      const r = await post<{ task: TaskDTO }>(`${base}/tasks`, payload);
      onCreated(r.task);
      toast.success("Task created");
      reset();
      onOpenChange(false);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">New task</DialogTitle>
          <DialogDescription>Add a piece of work to the project board.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={LIMITS.taskTitle}
              placeholder="e.g. Implement auth flow"
              className="focus-glow bg-white/[0.03]"
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="task-desc">Description</Label>
            <Textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={LIMITS.taskDescription}
              placeholder="Optional details (Markdown supported)"
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full bg-white/[0.03]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Assignee</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="w-full bg-white/[0.03]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.user.id}>
                      {m.user.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-due">Due date</Label>
              <Input
                id="task-due"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="focus-glow w-full bg-white/[0.03]"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="btn-hero"
            onClick={create}
            disabled={sending || !title.trim()}
          >
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            Create task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Milestones tab ───────────────────────────────────────────────────────────

function MilestonesTab({
  base,
  milestones,
  canContribute,
  setMilestones,
}: {
  base: string;
  milestones: MilestoneDTO[] | null;
  canContribute: boolean;
  setMilestones: React.Dispatch<React.SetStateAction<MilestoneDTO[] | null>>;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [togglePending, setTogglePending] = useState<string | null>(null);

  const list = milestones ?? [];
  const completed = list.filter((m) => m.completedAt).length;
  const pct = list.length ? Math.round((completed / list.length) * 100) : 0;

  async function toggle(m: MilestoneDTO) {
    const nowCompleted = !m.completedAt;
    setTogglePending(m.id);
    setMilestones((prev) =>
      (prev ?? []).map((x) =>
        x.id === m.id ? { ...x, completedAt: nowCompleted ? new Date().toISOString() : null } : x
      )
    );
    try {
      const r = await patch<{ milestone: MilestoneDTO }>(`/api/milestones/${m.id}`, {
        completed: nowCompleted,
      });
      setMilestones((prev) => (prev ?? []).map((x) => (x.id === m.id ? r.milestone : x)));
      toast.success(nowCompleted ? "Milestone completed — +20 XP +10 REP" : "Milestone reopened");
    } catch (e) {
      toast.error(errText(e));
      get<{ milestones: MilestoneDTO[] }>(`${base}/milestones`)
        .then((r) => setMilestones(r.milestones))
        .catch(() => undefined);
    } finally {
      setTogglePending(null);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await del(`/api/milestones/${deleteId}`);
      setMilestones((prev) => (prev ?? []).filter((m) => m.id !== deleteId));
      toast.success("Milestone deleted");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-5">
      <section className="glass-card rounded-2xl p-5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">Milestone progress</h2>
          <span className="font-mono text-sm font-semibold">
            {completed}/{list.length}
          </span>
        </div>
        <Progress value={pct} aria-label="Milestone completion" />
        {canContribute && (
          <div className="mt-4 flex justify-end">
            <Button size="sm" className="btn-hero" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" /> New milestone
            </Button>
          </div>
        )}
      </section>

      {milestones === null ? (
        <ListRowsSkeleton rows={3} />
      ) : list.length === 0 ? (
        <EmptyState
          icon={Flag}
          title="No milestones yet"
          description={
            canContribute
              ? "Set ambitious checkpoints — create your first milestone."
              : "This project has not defined any milestones yet."
          }
          action={
            canContribute ? (
              <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" /> New milestone
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ol className="relative space-y-3 border-l border-white/[0.08] pl-5">
          {list.map((m) => {
            const done = !!m.completedAt;
            const overdue = isOverdue(m.dueAt, done);
            return (
              <li key={m.id} className="relative">
                <span
                  className={cn(
                    "absolute -left-[27px] top-4 flex h-4 w-4 items-center justify-center rounded-full border",
                    done ? "border-emerald-400/50 bg-emerald-400/20" : "border-white/15 bg-[#101019]"
                  )}
                >
                  <Flag className={cn("h-2.5 w-2.5", done && "fill-emerald-400 text-emerald-400")} />
                </span>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={cn(
                            "font-display font-semibold",
                            done && "text-muted-foreground line-through"
                          )}
                        >
                          {m.title}
                        </h3>
                        {done && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            <CheckCircle2 className="h-3 w-3" /> Completed
                          </span>
                        )}
                        {overdue && (
                          <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                            Overdue
                          </span>
                        )}
                      </div>
                      {m.description?.trim() && (
                        <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                        {m.dueAt && (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1",
                              overdue && !done && "text-rose-300"
                            )}
                          >
                            <CalendarDays className="h-3 w-3" />
                            Due {format(parseISO(m.dueAt), "MMM d, yyyy")}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3 w-3" /> {fmtAgo(m.createdAt)}
                        </span>
                        {done && (
                          <span className="inline-flex items-center gap-1 text-emerald-300/80">
                            Completed {fmtAgo(m.completedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    {canContribute && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggle(m)}
                          disabled={togglePending === m.id}
                          aria-label={done ? "Mark milestone as not completed" : "Mark milestone as completed"}
                          className={cn(
                            "h-8 px-2",
                            done
                              ? "text-muted-foreground hover:text-amber-300"
                              : "text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-300"
                          )}
                        >
                          {togglePending === m.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className={cn("h-4 w-4", done && "fill-current")} />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(m.id)}
                          aria-label="Delete milestone"
                          className="h-8 px-2 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <CreateMilestoneDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        base={base}
        onCreated={(m) => setMilestones((prev) => [m, ...(prev ?? [])])}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this milestone?</AlertDialogTitle>
            <AlertDialogDescription>
              The milestone and its progress will be permanently removed from the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CreateMilestoneDialog({
  open,
  onOpenChange,
  base,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  base: string;
  onCreated: (m: MilestoneDTO) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const [sending, setSending] = useState(false);

  async function create() {
    setSending(true);
    try {
      const payload: Record<string, unknown> = { title: title.trim(), description };
      if (due) payload.dueAt = new Date(`${due}T12:00:00`).toISOString();
      const r = await post<{ milestone: MilestoneDTO }>(`${base}/milestones`, payload);
      onCreated(r.milestone);
      toast.success("Milestone created");
      setTitle("");
      setDescription("");
      setDue("");
      onOpenChange(false);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">New milestone</DialogTitle>
          <DialogDescription>Define a checkpoint the crew can rally behind.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="ms-title">Title</Label>
            <Input
              id="ms-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Public beta launch"
              maxLength={140}
              className="focus-glow bg-white/[0.03]"
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ms-desc">Description</Label>
            <Textarea
              id="ms-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What does done look like?"
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ms-due">Target date</Label>
            <Input
              id="ms-due"
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="focus-glow w-full bg-white/[0.03]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="btn-hero" onClick={create} disabled={sending || !title.trim()}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            Create milestone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Team tab ─────────────────────────────────────────────────────────────────

function TeamTab({
  project,
  user,
  myRole,
  canManage,
  membersResp,
  requests,
  refetchAll,
}: {
  project: ProjectDetail;
  user: ReturnType<typeof useApp.getState>["user"];
  myRole: string | null;
  canManage: boolean;
  membersResp: MembersResponse | null;
  requests: CollabRequestDTO[] | null;
  refetchAll: () => Promise<void>;
}) {
  const [transferMember, setTransferMember] = useState<ProjectMemberDTO | null>(null);
  const [removeMember, setRemoveMember] = useState<ProjectMemberDTO | null>(null);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [reqPending, setReqPending] = useState<string | null>(null);
  const navigate = useApp((s) => s.navigate);

  const members = membersResp?.members ?? [];
  const myMember = user ? members.find((m) => m.user.id === user.id) ?? null : null;
  const pendingRequests = (requests ?? []).filter((r) => r.status === "PENDING");

  async function changeRole(member: ProjectMemberDTO, role: string) {
    setPending(true);
    try {
      await patch(`/api/members/${member.id}`, { role });
      await refetchAll();
      toast.success(`${member.user.displayName} is now ${role.toLowerCase()}`);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setPending(false);
    }
  }

  async function transferOwnership() {
    if (!transferMember) return;
    setPending(true);
    try {
      await patch(`/api/members/${transferMember.id}`, { role: "OWNER" });
      await refetchAll();
      toast.success(`${transferMember.user.displayName} is now the project owner`);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setPending(false);
      setTransferMember(null);
    }
  }

  async function remove() {
    if (!removeMember) return;
    setPending(true);
    try {
      await del(`/api/members/${removeMember.id}`);
      await refetchAll();
      toast.success(`${removeMember.user.displayName} was removed from the project`);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setPending(false);
      setRemoveMember(null);
    }
  }

  async function leave() {
    if (!myMember) return;
    setPending(true);
    try {
      await del(`/api/members/${myMember.id}`);
      await refetchAll();
      toast.success("You left the project");
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setPending(false);
      setLeaveOpen(false);
    }
  }

  async function reviewRequest(req: CollabRequestDTO, action: "accept" | "reject") {
    setReqPending(req.id);
    try {
      await patch(`/api/requests/${req.id}`, { action });
      await refetchAll();
      toast.success(
        action === "accept"
          ? "Welcome aboard — request accepted"
          : "Request rejected"
      );
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setReqPending(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Members */}
      <section aria-label="Project members">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-semibold">
            Members{" "}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              ({members.length})
            </span>
          </h2>
          {myRole && myRole !== "OWNER" && myMember && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLeaveOpen(true)}
              className="border-rose-500/30 text-rose-300 hover:bg-rose-500/10 hover:text-rose-300"
            >
              Leave project
            </Button>
          )}
        </div>

        {membersResp === null ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl bg-white/[0.04]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <div key={m.id} className="glass-card rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => navigate({ name: "profile", username: m.user.username })}
                    className="focus-glow flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left"
                    aria-label={`View profile of ${m.user.displayName}`}
                  >
                    <UserAvatar user={m.user} size={44} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">
                        {m.user.displayName}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        @{m.user.username}
                      </span>
                    </span>
                  </button>
                  {myRole === "OWNER" && m.user.id !== user?.id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground"
                          aria-label={`Manage ${m.user.displayName}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Shield className="mr-2 h-4 w-4" /> Change role
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {["ADMIN", "CONTRIBUTOR", "VIEWER"].map((r) => (
                              <DropdownMenuItem
                                key={r}
                                disabled={m.role === r || pending}
                                onClick={() => changeRole(m, r)}
                              >
                                {MEMBER_ROLES.find((x) => x.slug === r)?.name}
                                {m.role === r && <span className="ml-auto text-[10px] text-muted-foreground">current</span>}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem onClick={() => setTransferMember(m)}>
                          <UserPlus className="mr-2 h-4 w-4" /> Transfer ownership
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setRemoveMember(m)}
                          className="text-rose-300 focus:text-rose-300"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remove member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <RoleChip role={m.role} />
                  <span className="text-[11px] text-muted-foreground">
                    Joined {format(parseISO(m.joinedAt), "MMM yyyy")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Requests inbox */}
      {canManage && (
        <section aria-label="Collaboration requests">
          <h2 className="font-display mb-4 text-lg font-semibold">
            Collaboration requests{" "}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              ({requests?.filter((r) => r.status === "PENDING").length ?? 0})
            </span>
          </h2>
          {requests === null ? (
            <ListRowsSkeleton rows={2} />
          ) : pendingRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
              No pending requests
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pendingRequests.map((r) => (
                <div key={r.id} className="glass-card rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => navigate({ name: "profile", username: r.applicant.username })}
                      className="focus-glow flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left"
                    >
                      <UserAvatar user={r.applicant} size={38} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">
                          {r.applicant.displayName}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          @{r.applicant.username}
                        </span>
                      </span>
                    </button>
                    <ReqRoleChip role={r.requestedRole} />
                  </div>
                  {r.applicant.bio && (
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{r.applicant.bio}</p>
                  )}
                  <p className="mt-2 rounded-lg bg-white/[0.03] p-2.5 text-xs italic leading-relaxed text-zinc-300">
                    &ldquo;{r.introduction}&rdquo;
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{fmtAgo(r.createdAt)}</span>
                    {r.portfolioUrl && (
                      <a
                        href={r.portfolioUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="focus-glow inline-flex items-center gap-1 rounded text-cyan-300 hover:underline"
                      >
                        <Link2 className="h-3 w-3" /> Portfolio
                      </a>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      className="btn-hero h-8 flex-1"
                      onClick={() => reviewRequest(r, "accept")}
                      disabled={reqPending === r.id}
                    >
                      {reqPending === r.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 flex-1"
                      onClick={() => reviewRequest(r, "reject")}
                      disabled={reqPending === r.id}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Transfer ownership */}
      <AlertDialog
        open={!!transferMember}
        onOpenChange={(o) => !o && setTransferMember(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transfer ownership?</AlertDialogTitle>
            <AlertDialogDescription>
              {transferMember?.user.displayName} will become the project owner and you will be
              demoted to admin. This cannot be undone from here.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={transferOwnership}
              disabled={pending}
              className="bg-violet-500/90 text-white hover:bg-violet-500"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} Transfer ownership
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove member */}
      <AlertDialog open={!!removeMember} onOpenChange={(o) => !o && setRemoveMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member?</AlertDialogTitle>
            <AlertDialogDescription>
              {removeMember?.user.displayName} will lose access to this workspace immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={remove}
              disabled={pending}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Leave project */}
      <AlertDialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this project?</AlertDialogTitle>
            <AlertDialogDescription>
              You will lose access to the workspace for &ldquo;{project.name}&rdquo;. You can ask
              the owner to re-invite you later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={leave}
              disabled={pending}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} Leave project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Activity tab ─────────────────────────────────────────────────────────────

type ActivityEvent = {
  id: string;
  icon: IconType;
  color: string;
  label: string;
  title: string;
  by: string;
  at: string;
};

function ActivityTab({
  updates,
  tasks,
  milestones,
}: {
  updates: ProjectUpdateDTO[] | null;
  tasks: TaskDTO[] | null;
  milestones: MilestoneDTO[] | null;
}) {
  const events: ActivityEvent[] = useMemo(() => {
    const evts: ActivityEvent[] = [];
    for (const u of updates ?? []) {
      evts.push({
        id: `u-${u.id}`,
        icon: Megaphone,
        color: "bg-cyan-500/10 text-cyan-300",
        label: "posted an update",
        title: u.title,
        by: u.author.displayName,
        at: u.createdAt,
      });
    }
    for (const t of tasks ?? []) {
      if (t.status === "DONE" && t.completedAt) {
        evts.push({
          id: `t-${t.id}`,
          icon: CheckCircle2,
          color: "bg-emerald-500/10 text-emerald-300",
          label: "completed a task",
          title: t.title,
          by: t.assignee?.displayName ?? t.creator.displayName,
          at: t.completedAt,
        });
      }
    }
    for (const m of milestones ?? []) {
      if (m.completedAt) {
        evts.push({
          id: `m-${m.id}`,
          icon: Flag,
          color: "bg-violet-500/10 text-violet-300",
          label: "completed a milestone",
          title: m.title,
          by: m.creator.displayName,
          at: m.completedAt,
        });
      }
    }
    return evts.sort((a, b) => parseISO(b.at).getTime() - parseISO(a.at).getTime());
  }, [updates, tasks, milestones]);

  if (updates === null || tasks === null || milestones === null) {
    return <ListRowsSkeleton rows={4} />;
  }

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Recent workspace activity">
      <h2 className="font-display mb-5 text-lg font-semibold">Recent workspace activity</h2>
      {events.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No activity yet"
          description="Updates, completed tasks and milestones will appear here as the crew makes progress."
        />
      ) : (
        <ol className="space-y-4">
          {events.map((e) => (
            <li key={e.id} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  e.color
                )}
              >
                <e.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1 border-b border-white/[0.05] pb-4 last:border-0">
                <p className="text-sm">
                  <span className="font-medium">{e.by}</span>{" "}
                  <span className="text-muted-foreground">{e.label}</span>{" "}
                  <span className="font-medium text-foreground">&ldquo;{e.title}&rdquo;</span>
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{fmtAgo(e.at)}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

// ─── Edit project dialog ──────────────────────────────────────────────────────

function EditProjectDialog({
  project,
  open,
  onOpenChange,
  onSaved,
}: {
  project: ProjectDetail;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSaved: (p: ProjectDetail) => void;
}) {
  const [name, setName] = useState(project.name);
  const [tagline, setTagline] = useState(project.tagline);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [visibility, setVisibility] = useState(project.visibility);
  const [tags, setTags] = useState<string[]>(project.tags);
  const [tagInput, setTagInput] = useState("");
  const [skills, setSkills] = useState<string[]>(project.requiredSkills);
  const [repoUrl, setRepoUrl] = useState(project.repositoryUrl);
  const [demoUrl, setDemoUrl] = useState(project.demoUrl);
  const [websiteUrl, setWebsiteUrl] = useState(project.websiteUrl);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setName(project.name);
      setTagline(project.tagline);
      setDescription(project.description);
      setStatus(project.status);
      setVisibility(project.visibility);
      setTags(project.tags);
      setSkills(project.requiredSkills);
      setRepoUrl(project.repositoryUrl);
      setDemoUrl(project.demoUrl);
      setWebsiteUrl(project.websiteUrl);
      setTagInput("");
    }
  }, [open, project]);

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (!t) return;
    if (tags.includes(t)) {
      setTagInput("");
      return;
    }
    if (tags.length >= 8) {
      toast.error("At most 8 tags");
      return;
    }
    setTags((prev) => [...prev, t]);
    setTagInput("");
  }

  const skillOptions = SKILLS.filter((s) => !skills.includes(s.slug));
  const originalStatus = project.status;
  const willRelease = status === "RELEASED" && originalStatus !== "RELEASED";

  async function save() {
    setSending(true);
    try {
      const r = await patch<{ project: ProjectDetail }>(`/api/projects/${enc(project.slug)}`, {
        name: name.trim(),
        tagline: tagline.trim(),
        description,
        status,
        visibility,
        tags,
        requiredSkills: skills,
        repositoryUrl: repoUrl.trim(),
        demoUrl: demoUrl.trim(),
        websiteUrl: websiteUrl.trim(),
      });
      onSaved(r.project);
      if (willRelease) toast.success("Release published — +30 XP");
      else toast.success("Project updated");
      onOpenChange(false);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  const valid =
    name.trim().length >= 3 &&
    name.trim().length <= 80 &&
    tagline.trim().length > 0 &&
    tagline.trim().length <= LIMITS.tagline;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display">Edit project</DialogTitle>
          <DialogDescription>Update how your project appears across the platform.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ep-name">Name</Label>
              <Input
                id="ep-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                className="focus-glow bg-white/[0.03]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ep-tagline">Tagline</Label>
              <Input
                id="ep-tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                maxLength={LIMITS.tagline}
                className="focus-glow bg-white/[0.03]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ep-desc">Description</Label>
            <Textarea
              id="ep-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              maxLength={LIMITS.projectDescription}
              placeholder="Tell the story of your project (Markdown supported)"
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full bg-white/[0.03]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_STATUSES.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {willRelease && (
                <p className="text-[11px] text-emerald-300">
                  Publishing the release awards +30 XP to the owner.
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Visibility</Label>
              <RadioGroup
                value={visibility}
                onValueChange={setVisibility}
                className="grid grid-cols-3 gap-2"
              >
                {VISIBILITIES.map((v) => (
                  <Label
                    key={v.slug}
                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-2 text-xs font-normal has-[[data-state=checked]]:border-cyan-500/50 has-[[data-state=checked]]:bg-cyan-500/10 has-[[data-state=checked]]:text-cyan-200"
                  >
                    <RadioGroupItem value={v.slug} className="size-3.5" />
                    {v.name}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ep-tag">Tags (max 8)</Label>
            <div className="flex flex-wrap gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[11px]"
                >
                  #{t}
                  <button
                    onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                    aria-label={`Remove tag ${t}`}
                    className="focus-glow rounded text-muted-foreground hover:text-rose-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <Input
                id="ep-tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                onBlur={addTag}
                placeholder={tags.length ? "Add another..." : "Type a tag and press Enter"}
                maxLength={24}
                className="h-7 min-w-[140px] flex-1 border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Required skills</Label>
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] text-violet-300"
                >
                  {SKILLS.find((k) => k.slug === s)?.name ?? s}
                  <button
                    onClick={() => setSkills((prev) => prev.filter((x) => x !== s))}
                    aria-label={`Remove skill ${s}`}
                    className="focus-glow rounded text-violet-300/70 hover:text-rose-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <Select
                value=""
                onValueChange={(v) => {
                  if (v) setSkills((prev) => [...prev, v]);
                }}
              >
                <SelectTrigger className="h-7 w-[180px] border-0 bg-transparent p-0 text-xs shadow-none focus:ring-0">
                  <SelectValue placeholder="Add a skill..." />
                </SelectTrigger>
                <SelectContent>
                  {skillOptions.length === 0 ? (
                    <SelectItem value="__none" disabled>
                      All skills added
                    </SelectItem>
                  ) : (
                    skillOptions.map((s) => (
                      <SelectItem key={s.slug} value={s.slug} className="text-xs">
                        {s.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="ep-repo">Repository URL</Label>
              <Input
                id="ep-repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="focus-glow bg-white/[0.03] text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ep-demo">Demo URL</Label>
              <Input
                id="ep-demo"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://demo..."
                className="focus-glow bg-white/[0.03] text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ep-web">Website URL</Label>
              <Input
                id="ep-web"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://..."
                className="focus-glow bg-white/[0.03] text-xs"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="btn-hero" onClick={save} disabled={sending || !valid}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Join request dialog ──────────────────────────────────────────────────────

function JoinRequestDialog({
  open,
  onOpenChange,
  slug,
  onSent,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  slug: string;
  onSent: (req: CollabRequestDTO) => void;
}) {
  const [role, setRole] = useState("CONTRIBUTOR");
  const [intro, setIntro] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setRole("CONTRIBUTOR");
      setIntro("");
      setPortfolio("");
    }
  }, [open]);

  const valid = intro.trim().length >= 10 && intro.trim().length <= LIMITS.introduction;

  async function send() {
    setSending(true);
    try {
      const payload: Record<string, unknown> = {
        requestedRole: role,
        introduction: intro.trim(),
      };
      if (portfolio.trim()) payload.portfolioUrl = portfolio.trim();
      const r = await post<{ request: CollabRequestDTO }>(
        `/api/projects/${enc(slug)}/requests`,
        payload
      );
      onSent(r.request);
      toast.success("Request sent — the owner will review it soon");
      onOpenChange(false);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Request to join</DialogTitle>
          <DialogDescription>
            Introduce yourself and pick how you would like to contribute.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Requested role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full bg-white/[0.03]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONTRIBUTOR">Contributor — build and ship</SelectItem>
                <SelectItem value="VIEWER">Viewer — follow along</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="jr-intro">
              Introduction <span className="text-rose-300">*</span>
            </Label>
            <Textarea
              id="jr-intro"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              rows={4}
              maxLength={LIMITS.introduction}
              placeholder="Who are you, what have you built, and how can you help this project? (10-600 characters)"
              className="focus-glow resize-y bg-white/[0.03]"
            />
            <p
              className={cn(
                "font-mono text-[11px]",
                intro.trim().length > 0 && intro.trim().length < 10
                  ? "text-amber-300"
                  : "text-muted-foreground"
              )}
            >
              {intro.trim().length}/{LIMITS.introduction} (min 10)
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="jr-portfolio">Portfolio URL (optional)</Label>
            <Input
              id="jr-portfolio"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://your-portfolio.dev"
              className="focus-glow bg-white/[0.03]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="btn-hero" onClick={send} disabled={sending || !valid}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            <Send className="h-4 w-4" /> Send request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Report dialog ────────────────────────────────────────────────────────────

const REPORT_REASONS = [
  { slug: "SPAM", label: "Spam or misleading" },
  { slug: "HARASSMENT", label: "Harassment" },
  { slug: "INAPPROPRIATE", label: "Inappropriate content" },
  { slug: "COPYRIGHT", label: "Copyright violation" },
  { slug: "OTHER", label: "Something else" },
] as const;

function ReportProjectDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  projectId: string;
  projectName: string;
}) {
  const [reason, setReason] = useState<string>("SPAM");
  const [details, setDetails] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setReason("SPAM");
      setDetails("");
    }
  }, [open]);

  async function submit() {
    setSending(true);
    try {
      await post("/api/reports", {
        targetType: "project",
        targetId: projectId,
        reason,
        ...(details.trim() ? { details: details.trim() } : {}),
      });
      toast.success("Report submitted — our moderators will review it");
      onOpenChange(false);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Report project</DialogTitle>
          <DialogDescription>
            Tell us what is wrong with &ldquo;{projectName}&rdquo;. Reports are anonymous.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="w-full bg-white/[0.03]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((r) => (
                  <SelectItem key={r.slug} value={r.slug}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rp-details">Additional details (optional)</Label>
            <Textarea
              id="rp-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              maxLength={2000}
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="btn-hero" onClick={submit} disabled={sending}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
