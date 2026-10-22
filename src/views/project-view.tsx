"use client";

// TEKA NEXUS — Project workspace view (spec §8).
// Tabs: Overview / Updates / Tasks / Milestones / Team / Activity.
// All data comes from real endpoints; every mutation has pending + toast + error handling.

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { format, isBefore, parseISO } from "date-fns";
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
  Copy,
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
import { useT, useRelativeTime, useFormatDate, useLabeled, type TFunc } from "@/lib/i18n";
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
import { ShareMenu } from "@/components/shared/share-menu";
import { GithubPanel } from "@/components/project/github-panel";
import { ProjectChat } from "@/components/project/project-chat";
import {
  AnimatedNumber,
  EASE,
  FadeIn,
  HoverLift,
  PulsingDot,
  SPRING,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Local helpers ────────────────────────────────────────────────────────────

/** Server error message if available, otherwise null (caller supplies fallback). */
const errText = (e: unknown): string | null =>
  e instanceof Error ? e.message : null;

/** Toast error text: server-provided message, or a localized fallback. */
function useErrText() {
  const t = useT();
  return useCallback(
    (e: unknown) => errText(e) ?? t("common.error"),
    [t]
  );
}

const enc = encodeURIComponent;

const ROLE_KEYS: ReadonlySet<string> = new Set(MEMBER_ROLES.map((r) => r.slug));

/** Translated role label; unknown DB roles fall back to the raw value. */
const roleLabel = (t: TFunc, role: string) =>
  ROLE_KEYS.has(role) ? t(`project.roles.${role}`) : role;

const STATUS_KEYS: ReadonlySet<string> = new Set(TASK_STATUSES.map((s) => s.slug));
const PRIORITY_KEYS: ReadonlySet<string> = new Set(TASK_PRIORITIES.map((p) => p.slug));
const CATEGORY_KEYS: ReadonlySet<string> = new Set(PROJECT_CATEGORIES.map((c) => c.slug));
const SKILL_KEYS: ReadonlySet<string> = new Set(SKILLS.map((s) => s.slug));

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
  const t = useT();
  const name = roleLabel(t, role);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        ROLE_STYLE[role] ?? ROLE_STYLE.VIEWER,
        className
      )}
    >
      {name}
    </motion.span>
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
  const t = useT();
  const fd = useFormatDate();
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
      {overdue ? `${t("project.milestones.overdue")} ` : ""}
      {fd(dueAt, "MMM d")}
    </span>
  );
}

function RequestStateChip({ status }: { status: string }) {
  const t = useT();
  const meta: Record<string, { icon: IconType; cls: string; key: string }> = {
    PENDING: {
      icon: Clock3,
      cls: "border-amber-500/30 bg-amber-500/10 text-amber-300",
      key: "pendingReview",
    },
    ACCEPTED: {
      icon: CheckCircle2,
      cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
      key: "accepted",
    },
    REJECTED: {
      icon: XCircle,
      cls: "border-rose-500/30 bg-rose-500/10 text-rose-300",
      key: "rejected",
    },
    WITHDRAWN: {
      icon: Clock3,
      cls: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
      key: "withdrawn",
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
      <Icon className="h-3.5 w-3.5" /> {t(`project.requestState.${m.key}`)}
    </span>
  );
}

function ReqRoleChip({ role }: { role: string }) {
  const t = useT();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        role === "CONTRIBUTOR" ? "bg-cyan-500/15 text-cyan-300" : "bg-zinc-500/15 text-zinc-400"
      )}
    >
      {t("project.requests.wantsRole", { role: roleLabel(t, role).toLowerCase() })}
    </span>
  );
}

// ─── Animation-only helpers (wave C) ─────────────

/**
 * Progress bar with an animated fill (scaleX spring on mount / value change).
 * Render-only variant of <Progress> that keeps the progressbar a11y contract.
 */
function MotionProgress({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    >
      <motion.div
        className="h-full w-full origin-left rounded-full bg-primary rtl:origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: pct / 100 }}
        transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.2 }}
      />
    </div>
  );
}

/** Decorative heart-burst offsets — precomputed, horizontally symmetric (RTL-safe). */
const LIKE_BURST: ReadonlyArray<{ x: number; y: number }> = [
  { x: -18, y: -2 },
  { x: -11, y: -10 },
  { x: -4, y: -16 },
  { x: 4, y: -16 },
  { x: 11, y: -10 },
  { x: 18, y: -2 },
];

// ─── Main view ────────────────────────────────────────────────────────────────

const TAB_ITEMS = [
  { value: "overview", icon: LayoutDashboard },
  { value: "updates", icon: Megaphone },
  { value: "tasks", icon: ListChecks },
  { value: "milestones", icon: Flag },
  { value: "team", icon: Users },
  { value: "chat", icon: MessageSquare },
  { value: "activity", icon: Activity },
] as const;

export function ProjectView({ slug }: { slug: string }) {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const back = useApp((s) => s.back);
  const t = useT();
  const rel = useRelativeTime();
  const err = useErrText();

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
  // Animation-only: bump to trigger the heart burst (incremented on a fresh like).
  const [likeBurst, setLikeBurst] = useState(0);

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
      setErrorMsg(e instanceof ApiError ? e.message : t("project.errors.loadFailed"));
      setPhase("error");
    }
  }, [base, t]);

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
      toast.error(err(e));
    }
  }, [base, err]);

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
      toast.error(t("project.toasts.signInToLike"));
      navigate({ name: "login" });
      return;
    }
    setLikePending(true);
    try {
      const r = await post<{ liked: boolean; likeCount: number }>(`${base}/like`);
      setDetail((d) => (d ? { ...d, liked: r.liked, likeCount: r.likeCount } : d));
      if (r.liked) setLikeBurst((b) => b + 1);
    } catch (e) {
      toast.error(err(e));
    } finally {
      setLikePending(false);
    }
  }

  async function toggleSave() {
    if (!detail) return;
    if (!user) {
      toast.error(t("project.toasts.signInToSave"));
      navigate({ name: "login" });
      return;
    }
    setSavePending(true);
    try {
      const r = await post<{ saved: boolean }>(`${base}/save`);
      setDetail((d) => (d ? { ...d, saved: r.saved } : d));
      toast.success(r.saved ? t("project.toasts.savedToLibrary") : t("project.toasts.removedFromLibrary"));
    } catch (e) {
      toast.error(err(e));
    } finally {
      setSavePending(false);
    }
  }

  async function archiveProject() {
    try {
      await del(`${base}`);
      toast.success(t("project.toasts.projectArchived"));
      navigate({ name: "explore" });
    } catch (e) {
      toast.error(err(e));
    }
  }

  // ── Loading / error states (stale content stays visible during background refetch) ──
  if (phase === "loading" && !detail) return <ProjectSkeleton />;
  if (phase === "error" || !detail || !project) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20">
        <EmptyState
          icon={FileQuestion}
          title={t("project.notFound.title")}
          description={errorMsg || t("project.notFound.description")}
          action={
            <Button variant="outline" onClick={() => navigate({ name: "explore" })}>
              <ArrowLeft className="h-4 w-4" /> {t("project.notFound.backToExplore")}
            </Button>
          }
        />
      </div>
    );
  }

  const visibilityIcon: Record<string, IconType> = {
    PUBLIC: Globe,
    UNLISTED: Eye,
    PRIVATE: EyeOff,
  };
  const VisIcon = visibilityIcon[project.visibility] ?? Globe;
  const visLabel = ["PUBLIC", "UNLISTED", "PRIVATE"].includes(project.visibility)
    ? t(`project.visibility.${project.visibility}`)
    : project.visibility;

  const tabCounts: Record<string, number | undefined> = {
    updates: updates?.length,
    tasks: tasks?.length,
    milestones: milestones?.length,
    team: membersResp?.members.length,
  };

  // "Build similar" — stash the current draft into sessionStorage and open the
  // launch form pre-filled. Status/visibility deliberately start fresh.
  const duplicateToNew = () => {
    try {
      window.sessionStorage.setItem(
        "teka:project-prefill:v1",
        JSON.stringify({
          name: project.name,
          tagline: project.tagline,
          description: detail.description,
          category: project.category,
          tags: project.tags,
          skills: project.requiredSkills,
          repositoryUrl: detail.repositoryUrl,
          demoUrl: detail.demoUrl,
          websiteUrl: detail.websiteUrl,
          coverImage: project.coverImage,
          sourceName: project.name,
        }),
      );
    } catch {
      /* storage unavailable */
    }
    navigate({ name: "projectNew" });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-4 md:px-6 md:pt-6">
      {/* Back */}
      <button
        onClick={back}
        className="focus-glow mb-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {t("project.back")}
      </button>

      {/* Cover banner */}
      <FadeIn y={10} className="relative h-40 overflow-hidden rounded-2xl border border-white/[0.07] md:h-56">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <ProjectCover cover={project.coverImage} name={project.name} seed={project.slug.length} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080d] via-[#08080d]/20 to-transparent" />
      </FadeIn>

      {/* Overlapping header card */}
      <FadeIn delay={0.08} y={16} className="relative z-10 md:-mt-14">
        <div className="glass-card mx-1 rounded-2xl p-5 md:mx-6 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                {project.name}
              </h1>
              <StatusPill status={project.status} />
              <span
                className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] text-muted-foreground"
                title={t("project.visibility.title", { label: visLabel })}
              >
                <VisIcon className="h-3 w-3" />
                {visLabel}
              </span>
              {myRole && <RoleChip role={myRole} />}
            </div>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{project.tagline}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <button
                onClick={() => navigate({ name: "profile", username: project.owner.username })}
                className="focus-glow inline-flex items-center gap-2 rounded-lg py-0.5 transition-colors hover:text-foreground"
                aria-label={t("project.a11y.viewProfileOf", { name: project.owner.displayName })}
              >
                <UserAvatar user={project.owner} size={22} />
                <span className="font-medium">{project.owner.displayName}</span>
              </button>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />{" "}
                {t(
                  project.memberCount === 1
                    ? "project.stats.memberOne"
                    : "project.stats.memberMany",
                  { n: project.memberCount }
                )}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" />{" "}
                {t(detail.likeCount === 1 ? "project.stats.likeOne" : "project.stats.likeMany", {
                  n: detail.likeCount,
                })}
              </span>
            </div>
          </div>

          {/* Actions — capped so the title never gets squeezed to a sliver */}
          <div className="flex flex-wrap items-center gap-2 lg:max-w-[46%] lg:shrink-0 lg:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLike}
              disabled={likePending}
              aria-pressed={detail.liked}
              className={cn("relative h-9 gap-1.5", detail.liked && "border-rose-500/40 text-rose-300")}
            >
              <span className="relative inline-flex">
                <motion.span
                  key={likeBurst}
                  className="inline-flex"
                  initial={false}
                  animate={likeBurst > 0 ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  <Heart className={cn("h-4 w-4", detail.liked && "fill-current")} />
                </motion.span>
                {likeBurst > 0 && (
                  <span key={`burst-${likeBurst}`} aria-hidden="true" className="pointer-events-none absolute inset-0">
                    {LIKE_BURST.map((p, i) => (
                      <motion.span
                        key={i}
                        className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-rose-400"
                        initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.3 }}
                        transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.025 }}
                      />
                    ))}
                  </span>
                )}
              </span>
              <AnimatedNumber value={detail.likeCount} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSave}
              disabled={savePending}
              aria-pressed={detail.saved}
              className={cn("h-9", detail.saved && "border-cyan-500/40 text-cyan-300")}
            >
              <motion.span
                key={detail.saved ? "saved" : "unsaved"}
                className="inline-flex"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SPRING}
              >
                <Bookmark className={cn("h-4 w-4", detail.saved && "fill-current")} />
              </motion.span>
              <span className="hidden sm:inline">{detail.saved ? t("common.saved") : t("common.save")}</span>
            </Button>
            <ShareMenu size="sm" title={project.name} />
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReportOpen(true)}
                className="h-9 text-muted-foreground"
              >
                <Flag className="h-4 w-4" />
                <span className="sr-only">{t("project.report.title")}</span>
              </Button>
            )}

            {/* Settings (owner/admin) */}
            {canManage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Settings2 className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("common.settings")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil className="h-4 w-4" /> {t("project.menu.edit")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={duplicateToNew}>
                    <Copy className="h-4 w-4" /> {t("project.menu.duplicate")}
                  </DropdownMenuItem>
                  {myRole === "OWNER" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setArchiveOpen(true)}
                        className="text-rose-300 focus:text-rose-300"
                      >
                        <Archive className="h-4 w-4" /> {t("project.actions.archive")}
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Join flow */}
            {!user && project.visibility !== "PRIVATE" && (
              <Button size="sm" className="btn-hero h-9" onClick={() => navigate({ name: "login" })}>
                <UserPlus className="h-4 w-4" /> {t("project.actions.signInToCollaborate")}
              </Button>
            )}
            {user && !myRole &&
              (detail.myRequest || mySentRequest ? (
                <RequestStateChip status={(detail.myRequest ?? mySentRequest!).status} />
              ) : (
                <Button size="sm" className="btn-hero h-9" onClick={() => setJoinOpen(true)}>
                  <UserPlus className="h-4 w-4" /> {t("project.actions.requestToJoin")}
                </Button>
              ))}
          </div>
        </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <div className="overflow-x-auto pb-0.5">
          <TabsList className="glass h-11 w-fit min-w-full gap-1 rounded-xl bg-transparent p-1">
            {TAB_ITEMS.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="relative gap-1.5 rounded-lg px-3 text-xs data-[state=active]:text-foreground md:px-4 md:text-sm"
              >
                {tab === item.value && (
                  <motion.span
                    layoutId="projectTabPill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/[0.13] to-violet-500/[0.13] ring-1 ring-cyan-400/20"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <item.icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{t(`project.tabs.${item.value}`)}</span>
                {typeof tabCounts[item.value] === "number" && (
                  <motion.span
                    key={tabCounts[item.value]}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING}
                    className="relative z-10 rounded-full bg-white/[0.07] px-1.5 text-[10px] text-muted-foreground"
                  >
                    {tabCounts[item.value]}
                  </motion.span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.14, ease: "easeIn" } }}
            className="mt-6"
          >
            {tab === "overview" && (
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
            )}

            {tab === "updates" && (
              <UpdatesTab
                base={base}
                updates={updates}
                canContribute={canContribute}
                onCreated={(u) => setUpdates((prev) => [u, ...(prev ?? [])])}
              />
            )}

            {tab === "tasks" && (
              <TasksTab
                base={base}
                tasks={tasks}
                members={membersResp?.members ?? []}
                canContribute={canContribute}
                setTasks={setTasks}
              />
            )}

            {tab === "milestones" && (
              <MilestonesTab
                base={base}
                milestones={milestones}
                canContribute={canContribute}
                setMilestones={setMilestones}
              />
            )}

            {tab === "team" && (
              <TeamTab
                project={project}
                user={user}
                myRole={myRole}
                canManage={canManage}
                membersResp={membersResp}
                requests={requests}
                refetchAll={refetchAll}
              />
            )}

            {tab === "chat" && <ProjectChat slug={slug} />}

            {tab === "activity" && (
              <ActivityTab updates={updates} tasks={tasks} milestones={milestones} />
            )}
          </motion.div>
        </AnimatePresence>
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
            <AlertDialogTitle>{t("project.archiveDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("project.archiveDialog.description", { name: project.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={archiveProject}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              <Archive className="h-4 w-4" /> {t("project.actions.archive")}
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
  const t = useT();
  const rel = useRelativeTime();
  const fd = useFormatDate();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left column */}
      <div className="space-y-6 lg:col-span-2">
        <FadeIn>
          <section className="glass-card rounded-2xl p-5 md:p-6" aria-label={t("project.a11y.projectDescription")}>
            <h2 className="font-display mb-3 text-lg font-semibold">{t("project.overview.about")}</h2>
            {project.description?.trim() ? (
              <Markdown>{project.description}</Markdown>
            ) : (
              <p className="text-sm italic text-muted-foreground">{t("project.overview.noDescription")}</p>
            )}
          </section>
        </FadeIn>

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
        <FadeIn delay={0.06}>
          <section className="glass-card rounded-2xl p-5" aria-label={t("project.a11y.projectFacts")}>
          <h3 className="font-display mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("project.overview.facts")}
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">{t("project.overview.category")}</dt>
              <dd className="inline-flex items-center gap-1.5 font-medium">
                <CatIcon className="h-4 w-4 text-cyan-300" />
                {cat ? t(`project.categories.${cat.slug}`) : project.category}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">{t("project.overview.status")}</dt>
              <dd>
                <StatusPill status={project.status} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">{t("project.overview.created")}</dt>
              <dd className="font-mono text-xs">{fd(project.createdAt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">{t("project.overview.updated")}</dt>
              <dd className="font-mono text-xs">{fd(project.updatedAt)}</dd>
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
                  <Github className="h-4 w-4" /> {t("project.links.repository")} <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-glow flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
                >
                  <ExternalLink className="h-4 w-4" /> {t("project.links.demo")}
                </a>
              )}
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-glow flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
                >
                  <Globe className="h-4 w-4" /> {t("project.links.website")}
                </a>
              )}
            </div>
          )}

          {project.requiredSkills.length > 0 && (
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t("project.overview.requiredSkills")}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.requiredSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-300"
                  >
                    {SKILL_KEYS.has(s) ? t(`project.skills.${s}`) : s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t("project.overview.tags")}
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
        </FadeIn>

        {/* Live GitHub repository intelligence (hidden quietly when unreachable) */}
        {project.repositoryUrl && <GithubPanel repositoryUrl={project.repositoryUrl} />}

        <FadeIn delay={0.12}>
          <HoverLift>
            <section className="glass-card rounded-2xl p-5" aria-label={t("project.a11y.projectHealth")}>
          <h3 className="font-display mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("project.overview.health")}
          </h3>
          <Stagger className="space-y-4">
            <StaggerItem>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{t("project.overview.milestonesCompleted")}</span>
                  <span className="font-mono font-semibold">
                    <AnimatedNumber value={completed} />/{totalMilestones}
                  </span>
                </div>
                <MotionProgress value={healthValue} label={t("project.a11y.milestoneProgress")} />
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("project.overview.teamSize")}</span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Users className="h-4 w-4 text-violet-300" /> <AnimatedNumber value={project.memberCount} />
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("project.overview.openTasks")}</span>
                <span className="font-mono font-medium">
                  <AnimatedNumber value={(tasks ?? []).filter((task) => task.status !== "DONE").length} />
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("project.overview.lastActivity")}</span>
                <span className="inline-flex items-center gap-1.5 text-xs">
                  <Clock3 className="h-3.5 w-3.5" /> {rel(project.updatedAt)}
                </span>
              </div>
            </StaggerItem>
          </Stagger>
          {myRole && (
            <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] text-muted-foreground">
              {t("project.overview.yourRole", { role: roleLabel(t, myRole).toLowerCase() })}
            </p>
          )}
            </section>
          </HoverLift>
        </FadeIn>
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
  const t = useT();
  const rel = useRelativeTime();
  const err = useErrText();

  async function submit() {
    if (!body.trim()) return;
    setSending(true);
    try {
      const r = await post<{ comment: CommentDTO }>(`/api/projects/${enc(projectSlug)}/comments`, {
        body,
      });
      setComments((prev) => [r.comment, ...(prev ?? [])]);
      setBody("");
      toast.success(t("project.comments.posted"));
    } catch (e) {
      toast.error(err(e));
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
      toast.success(t("project.comments.replyPosted"));
    } catch (e) {
      toast.error(err(e));
    } finally {
      setSending(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await del(`/api/comments/${deleteId}`);
      await refetchComments();
      toast.success(t("project.comments.commentDeleted"));
    } catch (e) {
      toast.error(err(e));
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label={t("project.a11y.discussion")}>
      <h2 className="font-display mb-4 text-lg font-semibold">
        {t("project.comments.title")}{" "}
        <span className="ml-1 text-sm font-normal text-muted-foreground">
          ({comments?.length ?? 0})
        </span>
      </h2>

      {user ? (
        <div className="mb-6">
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t("project.comments.placeholder")}
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
              {t("project.comments.submit")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] py-5">
          <p className="text-sm text-muted-foreground">{t("project.comments.signIn")}</p>
          <Button size="sm" variant="outline" onClick={() => navigate({ name: "login" })}>
            {t("common.signIn")}
          </Button>
        </div>
      )}

      {comments === null ? (
        <ListRowsSkeleton rows={2} />
      ) : comments.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {t("project.comments.empty")}
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c, i) => (
            <li key={c.id}>
              <CommentItem
                comment={c}
                entranceDelay={Math.min(i * 0.05, 0.3)}
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
                        entranceDelay={0.12}
                        user={user}
                        canManage={canManage}
                        isReply
                        onDelete={() => setDeleteId(r.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
              <AnimatePresence initial={false}>
                {replyTo === c.id && (
                  <motion.div
                    key="reply-composer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="ml-8 overflow-hidden"
                  >
                    <div className="mt-3 rounded-xl border border-cyan-500/20 bg-white/[0.02] p-3">
                      <Textarea
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        rows={2}
                        maxLength={LIMITS.comment}
                        placeholder={t("project.comments.replyTo", {
                          name: c.author?.displayName ?? t("project.comments.thisComment"),
                        })}
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
                          {t("common.cancel")}
                        </Button>
                        <Button
                          size="sm"
                          className="btn-hero"
                          onClick={submitReply}
                          disabled={sending || !replyBody.trim()}
                        >
                          {t("project.comments.reply")}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("project.comments.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("project.comments.deleteBody")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              {t("common.delete")}
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
  entranceDelay = 0,
  onReply,
  onDelete,
}: {
  comment: CommentDTO;
  user: ReturnType<typeof useApp.getState>["user"];
  canManage: boolean;
  isReply?: boolean;
  entranceDelay?: number;
  onReply?: () => void;
  onDelete: () => void;
}) {
  const canDelete =
    !!user && comment.author && (comment.author.id === user.id || canManage);
  const deleted = comment.author === null || comment.body === "[deleted]";
  const t = useT();
  const rel = useRelativeTime();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: EASE, delay: entranceDelay }}
      className="flex gap-3"
    >
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
            {deleted ? t("project.comments.deleted") : comment.author.displayName}
          </span>
          <span className="text-[11px] text-muted-foreground">{rel(comment.createdAt)}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap break-words text-sm text-zinc-300">{comment.body}</p>
        {!deleted && (
          <div className="mt-1.5 flex items-center gap-3">
            {onReply && (
              <button
                onClick={onReply}
                className="focus-glow rounded text-[11px] font-medium text-muted-foreground transition-colors hover:text-cyan-300"
              >
                {t("project.comments.reply")}
              </button>
            )}
            {canDelete && (
              <button
                onClick={onDelete}
                className="focus-glow inline-flex items-center gap-1 rounded text-[11px] text-muted-foreground transition-colors hover:text-rose-300"
                aria-label={t("project.a11y.deleteComment")}
              >
                <Trash2 className="h-3 w-3" /> {t("common.delete")}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
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
  const t = useT();
  const rel = useRelativeTime();
  const err = useErrText();

  async function publish() {
    setSending(true);
    try {
      const r = await post<{ update: ProjectUpdateDTO }>(`${base}/updates`, { title, body });
      onCreated(r.update);
      setTitle("");
      setBody("");
      toast.success(t("project.toasts.updatePublished"));
    } catch (e) {
      toast.error(err(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {canContribute && (
        <section className="glass-card rounded-2xl p-5" aria-label={t("project.a11y.publishUpdate")}>
          <h2 className="font-display mb-3 text-base font-semibold">{t("project.updates.postTitle")}</h2>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("project.updates.titlePlaceholder")}
            maxLength={LIMITS.updateTitle}
            className="focus-glow bg-white/[0.03]"
          />
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t("project.updates.bodyPlaceholder")}
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
              {t("project.updates.publish")}
            </Button>
          </div>
        </section>
      )}

      {updates === null ? (
        <ListRowsSkeleton rows={3} />
      ) : updates.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title={t("project.updates.emptyTitle")}
          description={
            canContribute
              ? t("project.updates.emptyContributor")
              : t("project.updates.emptyViewer")
          }
        />
      ) : (
        <Stagger className="space-y-4">
          {updates.map((u) => (
            <StaggerItem key={u.id}>
              <article className="glass-card rounded-2xl p-5">
                <header className="flex items-center gap-3">
                  <UserAvatar user={u.author} size={34} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{u.author.displayName}</p>
                    <p className="text-[11px] text-muted-foreground">{rel(u.createdAt)}</p>
                  </div>
                </header>
                <h3 className="font-display mt-3 text-lg font-semibold">{u.title}</h3>
                <Markdown className="mt-1">{u.body}</Markdown>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

// ─── Tasks tab ──────────────────────────────────────────────────────────────

// One-click starter tasks — the boring scaffolding every project needs anyway.
const TASK_PRESETS = ["ui", "backend", "bugs", "testing", "docs", "deploy"] as const;

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
  const [presetPending, setPresetPending] = useState<string | null>(null);
  const dragMovedRef = useRef(false);
  const t = useT();
  const err = useErrText();

  async function addPreset(key: string) {
    if (presetPending) return;
    const title = t(`project.tasks.preset.${key}`);
    setPresetPending(key);
    try {
      const r = await post<{ task: TaskDTO }>(`${base}/tasks`, { title, status: "TODO" });
      setTasks((prev) => [r.task, ...(prev ?? [])]);
      toast.success(t("project.tasks.presetAdded", { title }));
    } catch (e) {
      toast.error(err(e));
    } finally {
      setPresetPending(null);
    }
  }

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
      .catch((e) => toast.error(err(e)));
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
      setTasks((prev) => (prev ?? []).map((t2) => (t2.id === task.id ? r.task : t2)));
      if (toDone) {
        toast.success(
          t("project.toasts.taskCompleted", {
            name: r.task.assignee?.displayName ?? t("project.tasks.theAssignee"),
          })
        );
      }
    } catch (e) {
      toast.error(err(e));
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
            <Columns3 className="h-4 w-4" /> {t("project.tasks.kanban")}
          </button>
          <button
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={cn(
              "focus-glow inline-flex h-9 items-center gap-1.5 border-l border-white/[0.08] px-3 text-xs font-medium transition-colors",
              view === "list" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <AlignJustify className="h-4 w-4" /> {t("project.tasks.list")}
          </button>
        </div>

        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger size="sm" className="h-9 w-[170px] bg-white/[0.03]" aria-label={t("project.a11y.filterAssignee")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("project.tasks.allAssignees")}</SelectItem>
            <SelectItem value="none">{t("project.tasks.unassigned")}</SelectItem>
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
              <Plus className="h-4 w-4" /> {t("project.tasks.newTask")}
            </Button>
          )}
        </div>
      </div>

      {/* Quick task presets — one click adds a starter task to the board. */}
      {canContribute && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> {t("project.tasks.presetsLabel")}
          </span>
          {TASK_PRESETS.map((key) => (
            <button
              key={key}
              type="button"
              disabled={presetPending !== null}
              onClick={() => addPreset(key)}
              className="inline-flex min-h-[30px] items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-muted-foreground outline-none transition-colors focus-glow hover:border-cyan-400/40 hover:text-cyan-200 disabled:opacity-50"
            >
              {presetPending === key && <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />}
              {t(`project.tasks.preset.${key}`)}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title={t("project.tasks.emptyTitle")}
          description={
            canContribute
              ? t("project.tasks.emptyContributor")
              : t("project.tasks.emptyFilter")
          }
          action={
            canContribute ? (
              <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" /> {t("project.tasks.newTask")}
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
          <Stagger className="kanban-scroll grid auto-cols-[85%] grid-flow-col gap-3 overflow-x-auto pb-2 sm:auto-cols-[272px]">
            {TASK_STATUSES.map((s) => (
              <StaggerItem key={s.slug} className="h-full">
                <KanbanColumn
                  status={s.slug}
                  name={t(`project.kanban.${s.slug}`)}
                  tasks={byStatus[s.slug] ?? []}
                  canContribute={canContribute}
                  onOpen={(task) => {
                    if (!dragMovedRef.current) setTaskId(task.id);
                  }}
                  onStatusChange={moveTask}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
            {activeTask ? <TaskCardVisual task={activeTask} overlay /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <Stagger className="overflow-hidden rounded-xl border border-white/[0.07]">
          {filtered.map((task, i) => (
            <StaggerItem key={task.id}>
              <div
                className={cn(
                  "flex flex-wrap items-center gap-2 bg-white/[0.02] px-3 py-2.5 transition-colors hover:bg-white/[0.04] sm:gap-3 sm:px-4",
                  i > 0 && "border-t border-white/[0.06]"
                )}
              >
                <PriorityPill priority={task.priority} />
                <button
                  onClick={() => setTaskId(task.id)}
                  className="focus-glow min-w-0 flex-1 truncate rounded text-left text-sm font-medium transition-colors hover:text-cyan-300"
                >
                  {task.title}
                </button>
                {canContribute ? (
                  <div onPointerDown={(e) => e.stopPropagation()}>
                    <Select value={task.status} onValueChange={(v) => moveTask(task, v)}>
                      <SelectTrigger
                        size="sm"
                        className="h-7 w-[118px] text-[11px]"
                        aria-label={t("project.a11y.taskStatusOf", { title: task.title })}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TASK_STATUSES.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {t(`project.kanban.${s.slug}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {STATUS_KEYS.has(task.status) ? t(`project.kanban.${task.status}`) : task.status}
                  </span>
                )}
                {task.assignee ? (
                  <span className="inline-flex items-center gap-1.5" title={task.assignee.displayName}>
                    <UserAvatar user={task.assignee} size={22} />
                    <span className="hidden max-w-[100px] truncate text-xs text-muted-foreground md:inline">
                      {task.assignee.displayName}
                    </span>
                  </span>
                ) : (
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {t("project.tasks.unassigned")}
                  </span>
                )}
                <DueChip dueAt={task.dueAt} done={task.status === "DONE"} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
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
          onUpdated={(updated) =>
            setTasks((prev) => (prev ?? []).map((x) => (x.id === updated.id ? updated : x)))
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
  const t = useT();

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex h-full min-h-[300px] flex-col rounded-xl border bg-white/[0.02] p-2 transition-colors",
        isOver ? "border-cyan-500/40 bg-cyan-500/[0.04]" : "border-white/[0.06]"
      )}
    >
      <div className="mb-2 flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {name}
        </span>
        <motion.span
          key={tasks.length}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING}
          className="rounded-full bg-white/[0.06] px-1.5 text-[10px] font-mono text-muted-foreground"
        >
          {tasks.length}
        </motion.span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/[0.06] py-6">
            <span className="text-[11px] text-muted-foreground/60">{t("project.tasks.dropHere")}</span>
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
  const t = useT();

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
      aria-label={t("project.a11y.task", { title: task.title })}
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
              aria-label={t("project.a11y.moveTaskToStatus", { title: task.title })}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUSES.map((s) => (
                <SelectItem key={s.slug} value={s.slug} className="text-xs">
                  {t(`project.kanban.${s.slug}`)}
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
  const t = useT();
  return (
    <div
      className={cn(
        overlay &&
          "w-[272px] scale-[1.02] rotate-2 rounded-lg border border-cyan-500/30 bg-[#12121c] p-3 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.75)] ring-2 ring-cyan-400/30"
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
            <CheckCircle2 className="h-3 w-3" /> {t("project.tasks.doneChip")}
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
  const t = useT();
  const rel = useRelativeTime();
  const err = useErrText();

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
          toast.error(err(e));
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
      if (!quiet) toast.success(t("project.toasts.taskUpdated"));
      return r.task;
    } catch (e) {
      toast.error(err(e));
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
      toast.success(t("project.toasts.commentAdded"));
    } catch (e) {
      toast.error(err(e));
    } finally {
      setCommentSending(false);
    }
  }

  async function deleteTask() {
    try {
      await del(`/api/tasks/${task.id}`);
      toast.success(t("project.toasts.taskDeleted"));
      onDeleted(task.id);
    } catch (e) {
      toast.error(err(e));
    }
  }

  const titleChanged = titleDraft.trim() !== task.title && titleDraft.trim().length > 0;
  const descChanged = descDraft !== task.description;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display">{t("project.taskDetail.title")}</DialogTitle>
          <DialogDescription>
            {t("project.taskDetail.createdBy", {
              name: task.creator.displayName,
              ago: rel(task.createdAt),
            })}
          </DialogDescription>
        </DialogHeader>

        <Stagger className="space-y-4">
        {/* Title */}
        <StaggerItem>
        <div className="space-y-2">
          {canContribute ? (
            <div className="flex items-center gap-2">
              <Input
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                maxLength={LIMITS.taskTitle}
                className="focus-glow bg-white/[0.03] text-base font-semibold"
                aria-label={t("project.a11y.taskTitle")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && titleChanged) doPatch({ title: titleDraft.trim() });
                }}
              />
              {titleChanged && (
                <Button size="sm" onClick={() => doPatch({ title: titleDraft.trim() })} disabled={pending}>
                  {t("common.save")}
                </Button>
              )}
            </div>
          ) : (
            <h3 className="font-display text-lg font-semibold">{task.title}</h3>
          )}
        </div>

        </StaggerItem>

        {/* Properties grid */}
        <StaggerItem>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("project.form.status")}</Label>
            {canContribute ? (
              <Select
                value={task.status}
                onValueChange={(v) => {
                  if (v === "DONE" && task.status !== "DONE") {
                    toast.success(
                      t("project.toasts.taskCompleted", {
                        name: task.assignee?.displayName ?? t("project.tasks.theAssignee"),
                      })
                    );
                  }
                  doPatch({ status: v });
                }}
              >
                <SelectTrigger className="w-full bg-white/[0.03]" aria-label={t("project.a11y.taskStatus")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUSES.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>
                      {t(`project.kanban.${s.slug}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm">
                {STATUS_KEYS.has(task.status) ? t(`project.kanban.${task.status}`) : task.status}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("project.form.priority")}</Label>
            {canContribute ? (
              <Select value={task.priority} onValueChange={(v) => doPatch({ priority: v })}>
                <SelectTrigger className="w-full bg-white/[0.03]" aria-label={t("project.a11y.taskPriority")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {PRIORITY_KEYS.has(p.slug) ? t(`project.priority.${p.slug}`) : p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <PriorityPill priority={task.priority} />
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("project.form.assignee")}</Label>
            {canContribute ? (
              <Select
                value={task.assignee?.id ?? "none"}
                onValueChange={(v) => doPatch({ assigneeId: v === "none" ? null : v })}
              >
                <SelectTrigger className="w-full bg-white/[0.03]" aria-label={t("project.a11y.taskAssignee")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("project.tasks.unassigned")}</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.user.id}>
                      {m.user.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm">{task.assignee?.displayName ?? t("project.tasks.unassigned")}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("project.form.dueDate")}</Label>
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
                aria-label={t("project.a11y.taskDueDate")}
              />
            ) : (
              <DueChip dueAt={task.dueAt} done={task.status === "DONE"} />
            )}
          </div>
        </div>

        </StaggerItem>

        {/* Description */}
        <StaggerItem>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("project.form.description")}
            </Label>
            {canContribute && (
              <button
                onClick={() => {
                  setDescEditing((v) => !v);
                  setDescDraft(task.description);
                }}
                className="focus-glow inline-flex items-center gap-1 rounded text-[11px] text-muted-foreground transition-colors hover:text-cyan-300"
              >
                <Pencil className="h-3 w-3" /> {descEditing ? t("common.cancel") : t("project.actions.edit")}
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
                placeholder={t("project.taskDetail.descPlaceholder")}
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  disabled={pending || !descChanged}
                  onClick={async () => {
                    const updated = await doPatch({ description: descDraft });
                    if (updated) setDescEditing(false);
                  }}
                >
                  {t("project.taskDetail.saveDescription")}
                </Button>
              </div>
            </div>
          ) : task.description?.trim() ? (
            <Markdown>{task.description}</Markdown>
          ) : (
            <p className="text-sm italic text-muted-foreground">{t("project.taskDetail.noDescription")}</p>
          )}
        </div>

        </StaggerItem>

        {/* Comments */}
        <StaggerItem>
        <div className="space-y-3 border-t border-white/[0.07] pt-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t("project.taskDetail.comments")}
          </h4>
          {comments === null ? (
            <ListRowsSkeleton rows={2} />
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("project.taskDetail.noComments")}</p>
          ) : (
            <ul className="max-h-56 space-y-3 overflow-y-auto pr-1">
              {comments.map((c) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex gap-2.5"
                >
                  <UserAvatar user={c.author} size={26} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{c.author?.displayName ?? t("project.comments.deleted")}</span>
                      <span className="text-[10px] text-muted-foreground">{rel(c.createdAt)}</span>
                    </div>
                    <p className="whitespace-pre-wrap break-words text-xs text-zinc-300">{c.body}</p>
                  </div>
                </motion.li>
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
                placeholder={t("project.taskDetail.commentPlaceholder")}
                className="focus-glow resize-none bg-white/[0.03] text-sm"
              />
              <Button
                size="sm"
                onClick={addComment}
                disabled={commentSending || !commentBody.trim()}
                aria-label={t("project.a11y.addComment")}
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

        </StaggerItem>
        </Stagger>

        {/* Footer actions */}
        {canContribute && (
          <DialogFooter className="border-t border-white/[0.07] pt-4 sm:justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmDelete(true)}
              className="text-rose-300 hover:bg-rose-500/10 hover:text-rose-300"
            >
              <Trash2 className="h-4 w-4" /> {t("project.taskDetail.deleteTask")}
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              {t("common.close")}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("project.taskDetail.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("project.taskDetail.deleteBody", { title: task.title })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteTask}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              <Trash2 className="h-4 w-4" /> {t("project.taskDetail.deleteTask")}
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
  const t = useT();
  const err = useErrText();

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
      toast.success(t("project.toasts.taskCreated"));
      reset();
      onOpenChange(false);
    } catch (e) {
      toast.error(err(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">{t("project.tasks.newTask")}</DialogTitle>
          <DialogDescription>{t("project.tasks.newTaskDesc")}</DialogDescription>
        </DialogHeader>
        <Stagger className="space-y-3">
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="task-title">{t("project.form.title")}</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={LIMITS.taskTitle}
              placeholder={t("project.tasks.titlePlaceholder")}
              className="focus-glow bg-white/[0.03]"
              autoFocus
            />
          </StaggerItem>
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="task-desc">{t("project.form.description")}</Label>
            <Textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={LIMITS.taskDescription}
              placeholder={t("project.tasks.descPlaceholder")}
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </StaggerItem>
          <StaggerItem>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>{t("project.form.priority")}</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full bg-white/[0.03]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {PRIORITY_KEYS.has(p.slug) ? t(`project.priority.${p.slug}`) : p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>{t("project.form.assignee")}</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="w-full bg-white/[0.03]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("project.tasks.unassigned")}</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.user.id}>
                      {m.user.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-due">{t("project.form.dueDate")}</Label>
              <Input
                id="task-due"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="focus-glow w-full bg-white/[0.03]"
              />
            </div>
          </div>
          </StaggerItem>
        </Stagger>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button
            className="btn-hero"
            onClick={create}
            disabled={sending || !title.trim()}
          >
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("project.tasks.create")}
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
  const t = useT();
  const rel = useRelativeTime();
  const fd = useFormatDate();
  const err = useErrText();

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
      toast.success(
        nowCompleted
          ? t("project.toasts.milestoneCompleted")
          : t("project.toasts.milestoneReopened")
      );
    } catch (e) {
      toast.error(err(e));
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
      toast.success(t("project.toasts.milestoneDeleted"));
    } catch (e) {
      toast.error(err(e));
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-5">
      <section className="glass-card rounded-2xl p-5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">{t("project.milestones.progress")}</h2>
          <span className="font-mono text-sm font-semibold">
            <AnimatedNumber value={completed} />/{list.length}
          </span>
        </div>
        <MotionProgress value={pct} label={t("project.a11y.milestoneCompletion")} />
        {canContribute && (
          <div className="mt-4 flex justify-end">
            <Button size="sm" className="btn-hero" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" /> {t("project.milestones.new")}
            </Button>
          </div>
        )}
      </section>

      {milestones === null ? (
        <ListRowsSkeleton rows={3} />
      ) : list.length === 0 ? (
        <EmptyState
          icon={Flag}
          title={t("project.milestones.emptyTitle")}
          description={
            canContribute
              ? t("project.milestones.emptyContributor")
              : t("project.milestones.emptyViewer")
          }
          action={
            canContribute ? (
              <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" /> {t("project.milestones.new")}
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Stagger>
          <ol className="relative space-y-3 border-l border-white/[0.08] pl-5">
            {list.map((m) => {
              const done = !!m.completedAt;
              const overdue = isOverdue(m.dueAt, done);
              return (
                <li key={m.id} className="relative">
                  <StaggerItem>
                    <span
                      className={cn(
                        "absolute -left-[27px] top-4 flex h-4 w-4 items-center justify-center rounded-full border",
                        done ? "border-emerald-400/50 bg-emerald-400/20" : "border-white/15 bg-[#101019]"
                      )}
                    >
                      <Flag className={cn("h-2.5 w-2.5", done && "fill-emerald-400 text-emerald-400")} />
                    </span>
                    <div className={cn("glass-card rounded-xl p-4", done && "ring-1 ring-emerald-500/20")}>
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
                            <motion.span
                              className="inline-flex"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 16, delay: 0.12 }}
                            >
                              <CheckCircle2 className="h-3 w-3" />
                            </motion.span>{" "}
                            {t("project.milestones.completed")}
                          </span>
                        )}
                        {overdue && (
                          <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                            {t("project.milestones.overdue")}
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
                              overdue && !done && "text-rose-300",
                              !overdue && !done && "rounded-md bg-amber-500/10 px-1.5 py-0.5 text-amber-300"
                            )}
                          >
                            {!done ? (
                              <motion.span
                                className="inline-flex"
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: [0.6, 1.25, 1], opacity: 1 }}
                                transition={{ duration: 0.9, ease: "easeInOut", delay: 0.35 }}
                              >
                                <CalendarDays className="h-3 w-3" />
                              </motion.span>
                            ) : (
                              <CalendarDays className="h-3 w-3" />
                            )}
                            {t("project.milestones.due", { date: fd(m.dueAt, "MMM d, yyyy") })}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3 w-3" /> {rel(m.createdAt)}
                        </span>
                        {done && !!m.completedAt && (
                          <span className="inline-flex items-center gap-1 text-emerald-300/80">
                            {t("project.milestones.completedAgo", { ago: rel(m.completedAt) })}
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
                          aria-label={
                            done
                              ? t("project.a11y.markNotCompleted")
                              : t("project.a11y.markCompleted")
                          }
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
                          aria-label={t("project.a11y.deleteMilestone")}
                          className="h-8 px-2 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                    </div>
                  </StaggerItem>
                </li>
              );
            })}
          </ol>
        </Stagger>
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
            <AlertDialogTitle>{t("project.milestones.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("project.milestones.deleteBody")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              {t("common.delete")}
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
  const t = useT();
  const err = useErrText();

  async function create() {
    setSending(true);
    try {
      const payload: Record<string, unknown> = { title: title.trim(), description };
      if (due) payload.dueAt = new Date(`${due}T12:00:00`).toISOString();
      const r = await post<{ milestone: MilestoneDTO }>(`${base}/milestones`, payload);
      onCreated(r.milestone);
      toast.success(t("project.toasts.milestoneCreated"));
      setTitle("");
      setDescription("");
      setDue("");
      onOpenChange(false);
    } catch (e) {
      toast.error(err(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">{t("project.milestones.new")}</DialogTitle>
          <DialogDescription>{t("project.milestones.newDesc")}</DialogDescription>
        </DialogHeader>
        <Stagger className="space-y-3">
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="ms-title">{t("project.form.title")}</Label>
            <Input
              id="ms-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("project.milestones.titlePlaceholder")}
              maxLength={140}
              className="focus-glow bg-white/[0.03]"
              autoFocus
            />
          </StaggerItem>
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="ms-desc">{t("project.form.description")}</Label>
            <Textarea
              id="ms-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder={t("project.milestones.descPlaceholder")}
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </StaggerItem>
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="ms-due">{t("project.milestones.targetDate")}</Label>
            <Input
              id="ms-due"
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="focus-glow w-full bg-white/[0.03]"
            />
          </StaggerItem>
        </Stagger>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button className="btn-hero" onClick={create} disabled={sending || !title.trim()}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("project.milestones.create")}
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
  const t = useT();
  const rel = useRelativeTime();
  const fd = useFormatDate();
  const err = useErrText();

  const members = membersResp?.members ?? [];
  const myMember = user ? members.find((m) => m.user.id === user.id) ?? null : null;
  const pendingRequests = (requests ?? []).filter((r) => r.status === "PENDING");

  async function changeRole(member: ProjectMemberDTO, role: string) {
    setPending(true);
    try {
      await patch(`/api/members/${member.id}`, { role });
      await refetchAll();
      toast.success(
        t("project.toasts.roleChanged", {
          name: member.user.displayName,
          role: roleLabel(t, role).toLowerCase(),
        })
      );
    } catch (e) {
      toast.error(err(e));
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
      toast.success(t("project.toasts.nowOwner", { name: transferMember.user.displayName }));
    } catch (e) {
      toast.error(err(e));
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
      toast.success(t("project.toasts.memberRemoved", { name: removeMember.user.displayName }));
    } catch (e) {
      toast.error(err(e));
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
      toast.success(t("project.toasts.leftProject"));
    } catch (e) {
      toast.error(err(e));
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
          ? t("teams.toasts.accepted")
          : t("teams.toasts.rejected")
      );
    } catch (e) {
      toast.error(err(e));
    } finally {
      setReqPending(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Members */}
      <section aria-label={t("project.a11y.projectMembers")}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-semibold">
            {t("common.members")}{" "}
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
              {t("project.team.leave")}
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
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <StaggerItem key={m.id} className="h-full">
              <div className="glass-card h-full rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => navigate({ name: "profile", username: m.user.username })}
                    className="focus-glow flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left"
                    aria-label={t("project.a11y.viewProfileOf", { name: m.user.displayName })}
                  >
                    <motion.span
                      className="inline-flex shrink-0"
                      whileHover={{ scale: 1.06 }}
                      transition={SPRING}
                    >
                      <UserAvatar user={m.user} size={44} />
                    </motion.span>
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
                          aria-label={t("project.a11y.manage", { name: m.user.displayName })}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Shield className="mr-2 h-4 w-4" /> {t("project.team.changeRole")}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {["ADMIN", "CONTRIBUTOR", "VIEWER"].map((r) => (
                              <DropdownMenuItem
                                key={r}
                                disabled={m.role === r || pending}
                                onClick={() => changeRole(m, r)}
                              >
                                {roleLabel(t, r)}
                                {m.role === r && <span className="ml-auto text-[10px] text-muted-foreground">{t("project.team.current")}</span>}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem onClick={() => setTransferMember(m)}>
                          <UserPlus className="mr-2 h-4 w-4" /> {t("project.team.transferOwnership")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setRemoveMember(m)}
                          className="text-rose-300 focus:text-rose-300"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> {t("project.team.removeMember")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <RoleChip role={m.role} />
                  <span className="text-[11px] text-muted-foreground">
                    {t("project.team.joined", { date: fd(m.joinedAt, "MMM yyyy") })}
                  </span>
                </div>
              </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      {/* Requests inbox */}
      {canManage && (
        <section aria-label={t("project.a11y.collabRequests")}>
          <h2 className="font-display mb-4 text-lg font-semibold">
            {t("project.team.requestsTitle")}{" "}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              ({requests?.filter((r) => r.status === "PENDING").length ?? 0})
            </span>
          </h2>
          {requests === null ? (
            <ListRowsSkeleton rows={2} />
          ) : pendingRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
              {t("project.team.noRequests")}
            </div>
          ) : (
            <Stagger className="grid gap-4 md:grid-cols-2">
              {pendingRequests.map((r) => (
                <StaggerItem key={r.id}>
                <div className="glass-card rounded-xl p-4">
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
                    <span>{rel(r.createdAt)}</span>
                    {r.portfolioUrl && (
                      <a
                        href={r.portfolioUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="focus-glow inline-flex items-center gap-1 rounded text-cyan-300 hover:underline"
                      >
                        <Link2 className="h-3 w-3" /> {t("project.team.portfolio")}
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
                      {t("project.team.accept")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 flex-1"
                      onClick={() => reviewRequest(r, "reject")}
                      disabled={reqPending === r.id}
                    >
                      {t("project.team.reject")}
                    </Button>
                  </div>
                </div>
                </StaggerItem>
              ))}
            </Stagger>
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
            <AlertDialogTitle>{t("project.transferDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("project.transferDialog.description", {
                name: transferMember?.user.displayName ?? "",
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={transferOwnership}
              disabled={pending}
              className="bg-violet-500/90 text-white hover:bg-violet-500"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} {t("project.team.transferOwnership")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove member */}
      <AlertDialog open={!!removeMember} onOpenChange={(o) => !o && setRemoveMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("project.removeDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("project.removeDialog.description", {
                name: removeMember?.user.displayName ?? "",
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={remove}
              disabled={pending}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} {t("project.team.remove")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Leave project */}
      <AlertDialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("project.leaveDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("project.leaveDialog.description", { name: project.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("project.team.stay")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={leave}
              disabled={pending}
              className="bg-rose-500/90 text-white hover:bg-rose-500"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />} {t("project.team.leave")}
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
  /** dictionary key inside project.activity */
  labelKey: string;
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
        labelKey: "postedUpdate",
        title: u.title,
        by: u.author.displayName,
        at: u.createdAt,
      });
    }
    for (const task of tasks ?? []) {
      if (task.status === "DONE" && task.completedAt) {
        evts.push({
          id: `t-${task.id}`,
          icon: CheckCircle2,
          color: "bg-emerald-500/10 text-emerald-300",
          labelKey: "completedTask",
          title: task.title,
          by: task.assignee?.displayName ?? task.creator.displayName,
          at: task.completedAt,
        });
      }
    }
    for (const m of milestones ?? []) {
      if (m.completedAt) {
        evts.push({
          id: `m-${m.id}`,
          icon: Flag,
          color: "bg-violet-500/10 text-violet-300",
          labelKey: "completedMilestone",
          title: m.title,
          by: m.creator.displayName,
          at: m.completedAt,
        });
      }
    }
    return evts.sort((a, b) => parseISO(b.at).getTime() - parseISO(a.at).getTime());
  }, [updates, tasks, milestones]);

  const t = useT();
  const rel = useRelativeTime();

  if (updates === null || tasks === null || milestones === null) {
    return <ListRowsSkeleton rows={4} />;
  }

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label={t("project.a11y.activitySection")}>
      <h2 className="font-display mb-5 text-lg font-semibold">{t("project.activity.title")}</h2>
      {events.length === 0 ? (
        <EmptyState
          icon={Activity}
          title={t("project.activity.emptyTitle")}
          description={t("project.activity.emptyDesc")}
        />
      ) : (
        <Stagger>
          <ol className="space-y-4">
            {events.map((e, i) => (
              <li key={e.id}>
                <StaggerItem className="flex items-start gap-3">
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
                      <span className="text-muted-foreground">{t(`project.activity.${e.labelKey}`)}</span>{" "}
                      <span className="font-medium text-foreground">&ldquo;{e.title}&rdquo;</span>
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                      {i === 0 && (
                        <span aria-hidden="true">
                          <PulsingDot dotClassName="bg-cyan-400" />
                        </span>
                      )}
                      {rel(e.at)}
                    </p>
                  </div>
                </StaggerItem>
              </li>
            ))}
          </ol>
        </Stagger>
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
  const t = useT();
  const lbl = useLabeled();
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
    const tag = tagInput.trim().toLowerCase();
    if (!tag) return;
    if (tags.includes(tag)) {
      setTagInput("");
      return;
    }
    if (tags.length >= 8) {
      toast.error(t("project.toasts.atMost8Tags"));
      return;
    }
    setTags((prev) => [...prev, tag]);
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
      if (willRelease) toast.success(t("project.toasts.releasePublished"));
      else toast.success(t("project.toasts.projectUpdated"));
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
          <DialogTitle className="font-display">{t("project.menu.edit")}</DialogTitle>
          <DialogDescription>{t("project.edit.desc")}</DialogDescription>
        </DialogHeader>

        <Stagger className="space-y-4">
          <StaggerItem>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ep-name">{t("project.form.name")}</Label>
              <Input
                id="ep-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                className="focus-glow bg-white/[0.03]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ep-tagline">{t("project.form.tagline")}</Label>
              <Input
                id="ep-tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                maxLength={LIMITS.tagline}
                className="focus-glow bg-white/[0.03]"
              />
            </div>
          </div>
          </StaggerItem>

          <StaggerItem>
          <div className="space-y-1.5">
            <Label htmlFor="ep-desc">{t("project.form.description")}</Label>
            <Textarea
              id="ep-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              maxLength={LIMITS.projectDescription}
              placeholder={t("project.edit.descPlaceholder")}
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </div>
          </StaggerItem>

          <StaggerItem>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("project.form.status")}</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full bg-white/[0.03]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_STATUSES.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>
                      {lbl("project.status", s.slug, s.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {willRelease && (
                <p className="text-[11px] text-emerald-300">
                  {t("project.edit.releaseHint")}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>{t("project.form.visibility")}</Label>
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
                    {lbl("project.visibility", v.slug, v.name)}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
          </StaggerItem>

          <StaggerItem>
          <div className="space-y-1.5">
            <Label htmlFor="ep-tag">{t("project.edit.tags")}</Label>
            <div className="flex flex-wrap gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
              {tags.map((tg) => (
                <span
                  key={tg}
                  className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[11px]"
                >
                  #{tg}
                  <button
                    onClick={() => setTags((prev) => prev.filter((x) => x !== tg))}
                    aria-label={t("project.a11y.removeTag", { tag: tg })}
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
                placeholder={tags.length ? t("project.edit.addAnother") : t("project.edit.tagPlaceholder")}
                maxLength={24}
                className="h-7 min-w-[140px] flex-1 border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
          </StaggerItem>

          <StaggerItem>
          <div className="space-y-1.5">
            <Label>{t("project.form.requiredSkills")}</Label>
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] text-violet-300"
                >
                  {SKILLS.find((k) => k.slug === s)?.name ?? s}
                  <button
                    onClick={() => setSkills((prev) => prev.filter((x) => x !== s))}
                    aria-label={t("project.a11y.removeSkill", { skill: s })}
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
                  <SelectValue placeholder={t("project.edit.addSkill")} />
                </SelectTrigger>
                <SelectContent>
                  {skillOptions.length === 0 ? (
                    <SelectItem value="__none" disabled>
                      {t("project.edit.allSkillsAdded")}
                    </SelectItem>
                  ) : (
                    skillOptions.map((s) => (
                      <SelectItem key={s.slug} value={s.slug} className="text-xs">
                        {lbl("project.skills", s.slug, s.name)}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          </StaggerItem>

          <StaggerItem>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="ep-repo">{t("project.form.repositoryUrl")}</Label>
              <Input
                id="ep-repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="focus-glow bg-white/[0.03] text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ep-demo">{t("project.form.demoUrl")}</Label>
              <Input
                id="ep-demo"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://demo..."
                className="focus-glow bg-white/[0.03] text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ep-web">{t("project.form.websiteUrl")}</Label>
              <Input
                id="ep-web"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://..."
                className="focus-glow bg-white/[0.03] text-xs"
              />
            </div>
          </div>
          </StaggerItem>
        </Stagger>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button className="btn-hero" onClick={save} disabled={sending || !valid}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("common.saveChanges")}
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
  const t = useT();
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
      toast.success(t("project.toasts.requestSent"));
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
          <DialogTitle className="font-display">{t("project.actions.requestToJoin")}</DialogTitle>
          <DialogDescription>
            {t("project.join.desc")}
          </DialogDescription>
        </DialogHeader>
        <Stagger className="space-y-3">
          <StaggerItem className="space-y-1.5">
            <Label>{t("project.join.requestedRole")}</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full bg-white/[0.03]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONTRIBUTOR">{t("project.join.contributorOption")}</SelectItem>
                <SelectItem value="VIEWER">{t("project.join.viewerOption")}</SelectItem>
              </SelectContent>
            </Select>
          </StaggerItem>
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="jr-intro">
              {t("project.join.introduction")} <span className="text-rose-300">*</span>
            </Label>
            <Textarea
              id="jr-intro"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              rows={4}
              maxLength={LIMITS.introduction}
              placeholder={t("project.join.introPlaceholder")}
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
              {t("project.join.minHint", { n: intro.trim().length, limit: LIMITS.introduction })}
            </p>
          </StaggerItem>
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="jr-portfolio">{t("project.join.portfolioLabel")}</Label>
            <Input
              id="jr-portfolio"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://your-portfolio.dev"
              className="focus-glow bg-white/[0.03]"
            />
          </StaggerItem>
        </Stagger>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button className="btn-hero" onClick={send} disabled={sending || !valid}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            <Send className="h-4 w-4" /> {t("project.join.send")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Report dialog ────────────────────────────────────────────────────────────

const REPORT_REASONS = [
  { slug: "SPAM" },
  { slug: "HARASSMENT" },
  { slug: "INAPPROPRIATE" },
  { slug: "COPYRIGHT" },
  { slug: "OTHER" },
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
  const t = useT();
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
      toast.success(t("project.toasts.reportSubmitted"));
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
          <DialogTitle className="font-display">{t("project.report.title")}</DialogTitle>
          <DialogDescription>
            {t("project.report.desc", { name: projectName })}
          </DialogDescription>
        </DialogHeader>
        <Stagger className="space-y-3">
          <StaggerItem className="space-y-1.5">
            <Label>{t("project.report.reasonLabel")}</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="w-full bg-white/[0.03]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((r) => (
                  <SelectItem key={r.slug} value={r.slug}>
                    {t(`project.report.reason.${r.slug}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StaggerItem>
          <StaggerItem className="space-y-1.5">
            <Label htmlFor="rp-details">{t("project.report.detailsLabel")}</Label>
            <Textarea
              id="rp-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              maxLength={2000}
              className="focus-glow resize-y bg-white/[0.03]"
            />
          </StaggerItem>
        </Stagger>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button className="btn-hero" onClick={submit} disabled={sending}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("project.report.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
