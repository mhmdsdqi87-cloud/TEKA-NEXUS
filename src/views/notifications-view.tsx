"use client";

// TEKA NEXUS — NotificationsView (Task 2-d): in-app notification center (spec §13).
// Runs inside AppShell — no nav of its own.

import { useCallback, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { toast } from "sonner";
import { useT, useRelativeTime, type TFunc } from "@/lib/i18n";
import {
  Bell,
  BellOff,
  CheckCheck,
  ClipboardList,
  Handshake,
  Info,
  Loader2,
  MessageSquare,
  MessagesSquare,
  UserPlus,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { get, post } from "@/lib/api";
import { useApp } from "@/lib/store";
import { NotificationDTO } from "@/lib/dto";
import { cn } from "@/lib/utils";
import { EmptyState, UserAvatar } from "@/components/shared/atoms";
import { ListSkeleton } from "@/components/shared/project-card";
import { FadeIn, SPRING, staggerChild, staggerParent, TapScale } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

type NotifMeta = { icon: LucideIcon; fg: string; bg: string };

const NOTIF_META: Record<string, NotifMeta> = {
  NEW_FOLLOWER: { icon: UserPlus, fg: "text-cyan-300", bg: "bg-cyan-500/10" },
  NEW_DM: { icon: MessagesSquare, fg: "text-cyan-300", bg: "bg-cyan-500/10" },
  PROJECT_COMMENT: { icon: MessageSquare, fg: "text-violet-300", bg: "bg-violet-500/10" },
  COLLAB_REQUEST: { icon: Handshake, fg: "text-cyan-300", bg: "bg-cyan-500/10" },
  REQUEST_ACCEPTED: { icon: CheckCheck, fg: "text-emerald-300", bg: "bg-emerald-500/10" },
  REQUEST_REJECTED: { icon: XCircle, fg: "text-rose-300", bg: "bg-rose-500/10" },
  TASK_ASSIGNED: { icon: ClipboardList, fg: "text-violet-300", bg: "bg-violet-500/10" },
  MEMBER_JOINED: { icon: Users, fg: "text-cyan-300", bg: "bg-cyan-500/10" },
  SYSTEM: { icon: Info, fg: "text-zinc-300", bg: "bg-zinc-500/10" },
};

const FALLBACK_META: NotifMeta = {
  icon: Info,
  fg: "text-zinc-300",
  bg: "bg-zinc-500/10",
};

const STAGGER_CAP = 12;

/** Gentle scale-settle wrapper for the "all caught up" icon. */
function SettledBellOff({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-flex"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...SPRING, delay: 0.12 }}
    >
      <BellOff className={className} />
    </motion.span>
  );
}

/** Payload fields vary per notification type — read them defensively. */
function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function notifText(n: NotificationDTO, t: TFunc): string {
  const p = (n.payload ?? {}) as Record<string, unknown>;
  const actorName =
    n.actor?.displayName ??
    str(p.displayName) ??
    str(p.commenterName) ??
    str(p.applicantName) ??
    str(p.memberName) ??
    (n.actor ? `@${n.actor.username}` : null) ??
    t("notifications.someone");
  const projectName = str(p.projectName);
  const taskTitle = str(p.taskTitle);

  switch (n.type) {
    case "NEW_FOLLOWER":
      return t("notifications.types.newFollower", { name: actorName });
    case "NEW_DM": {
      const preview = str(p.preview);
      return preview
        ? `${t("notifications.types.newDm", { name: actorName })} — ${preview}`
        : t("notifications.types.newDm", { name: actorName });
    }
    case "PROJECT_COMMENT":
      return projectName
        ? t("notifications.types.commentOn", { name: actorName, project: projectName })
        : t("notifications.types.commentOnYours", { name: actorName });
    case "COLLAB_REQUEST":
      return projectName
        ? t("notifications.types.joinRequest", { name: actorName, project: projectName })
        : t("notifications.types.joinRequestPlain", { name: actorName });
    case "REQUEST_ACCEPTED":
      return projectName
        ? t("notifications.types.requestAccepted", { project: projectName })
        : t("notifications.types.requestAcceptedPlain");
    case "REQUEST_REJECTED":
      return projectName
        ? t("notifications.types.requestRejected", { project: projectName })
        : t("notifications.types.requestRejectedPlain");
    case "TASK_ASSIGNED":
      return taskTitle
        ? t("notifications.types.taskAssigned", { name: actorName, task: taskTitle })
        : t("notifications.types.taskAssignedPlain", { name: actorName });
    case "MEMBER_JOINED":
      return projectName
        ? t("notifications.types.memberJoined", { name: actorName, project: projectName })
        : t("notifications.types.memberJoinedTeam", { name: actorName });
    case "SYSTEM":
      return str(p.message) ?? t("notifications.system");
    default:
      return str(p.message) ?? t("notifications.fallback");
  }
}

export function NotificationsView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const setUnreadCount = useApp((s) => s.setUnreadCount);
  const t = useT();
  const rel = useRelativeTime();

  const [items, setItems] = useState<NotificationDTO[] | null>(null);
  const [unread, setUnread] = useState(0);
  const [loadFailed, setLoadFailed] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [markAllPending, setMarkAllPending] = useState(false);

  const load = useCallback(async () => {
    setLoadFailed(false);
    try {
      const res = await get<{ notifications: NotificationDTO[]; unread: number }>(
        "/api/notifications"
      );
      setItems(res.notifications);
      setUnread(res.unread);
      setUnreadCount(res.unread);
    } catch (e) {
      setLoadFailed(true);
      toast.error(e instanceof Error ? e.message : t("notifications.toasts.loadFailed"));
    }
  }, [setUnreadCount, t]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  async function markAllRead() {
    setMarkAllPending(true);
    try {
      await post("/api/notifications/read", { all: true });
      const now = new Date().toISOString();
      setItems((prev) => (prev ?? []).map((n) => (n.readAt ? n : { ...n, readAt: now })));
      setUnread(0);
      setUnreadCount(0);
      toast.success(t("notifications.toasts.allRead"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("notifications.toasts.markFailed"));
    } finally {
      setMarkAllPending(false);
    }
  }

  async function openNotification(n: NotificationDTO) {
    // Optimistically mark as read; revert on failure.
    if (!n.readAt) {
      const nextUnread = Math.max(0, unread - 1);
      setItems((prev) =>
        (prev ?? []).map((x) => (x.id === n.id ? { ...x, readAt: new Date().toISOString() } : x))
      );
      setUnread(nextUnread);
      setUnreadCount(nextUnread);
      try {
        await post("/api/notifications/read", { id: n.id });
      } catch {
        setItems((prev) =>
          (prev ?? []).map((x) => (x.id === n.id ? { ...x, readAt: n.readAt } : x))
        );
        setUnread(unread);
        setUnreadCount(unread);
        toast.error(t("notifications.toasts.markOneFailed"));
        return;
      }
    }
    // Navigate using only trustworthy payload fields: DM conversation first,
    // then project slug, then actor profile.
    if (n.entityType === "dm" && n.entityId) {
      navigate({ name: "dm", conversationId: n.entityId });
      return;
    }
    const slug = str((n.payload ?? {})["projectSlug"]);
    if (slug) {
      navigate({ name: "project", slug });
    } else if (n.actor?.username) {
      navigate({ name: "profile", username: n.actor.username });
    }
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6 md:py-8">
        <EmptyState
          icon={Bell}
          title={t("notifications.auth.title")}
          description={t("notifications.auth.description")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              {t("common.signIn")}
            </Button>
          }
        />
      </div>
    );
  }

  const loading = items === null && !loadFailed;
  const visible = (items ?? []).filter((n) => (filter === "unread" ? !n.readAt : true));

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 md:py-8">
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">{t("common.notifications")}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {unread > 0
                ? unread === 1
                  ? t("notifications.unreadOne", { n: unread })
                  : t("notifications.unreadMany", { n: unread })
                : t("notifications.allCaughtUp")}
            </p>
          </div>
          <TapScale className="shrink-0">
            <Button
              variant="outline"
              onClick={markAllRead}
              disabled={markAllPending || unread === 0}
              className="w-full"
            >
              {markAllPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <motion.span
                  key={unread === 0 ? "clear" : "unread"}
                  className="inline-flex"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={SPRING}
                >
                  <CheckCheck className="h-4 w-4" />
                </motion.span>
              )}
              {t("notifications.markAll")}
            </Button>
          </TapScale>
        </motion.div>

        {/* ── Filter chips ───────────────────────────────────── */}
        <div className="flex items-center gap-2" role="group" aria-label={t("notifications.a11y.filter")}>
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "relative rounded-full border px-4 py-1.5 text-sm transition-colors focus-glow",
                filter === f
                  ? "border-transparent bg-transparent text-cyan-200"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="notif-filter-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-cyan-500/40 bg-cyan-500/10"
                  transition={SPRING}
                />
              )}
              <span className="relative">
                {f === "all" ? (
                  t("notifications.filterAll")
                ) : (
                  <motion.span
                    key={unread}
                    className="inline-block"
                    initial={{ scale: 1.3, opacity: 0.4 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING}
                  >
                    {unread > 0
                      ? t("notifications.filterUnreadCount", { n: unread })
                      : t("notifications.filterUnread")}
                  </motion.span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* ── List ───────────────────────────────────────────── */}
        {loading ? (
          <ListSkeleton rows={5} />
        ) : loadFailed ? (
          <EmptyState
            icon={Info}
            title={t("notifications.loadFailed.title")}
            description={t("notifications.loadFailed.description")}
            action={
              <Button variant="outline" onClick={load}>
                {t("common.retry")}
              </Button>
            }
          />
        ) : visible.length === 0 ? (
          <FadeIn>
            <EmptyState
              icon={SettledBellOff}
              title={t("notifications.allCaughtUp")}
              description={
                filter === "unread"
                  ? t("notifications.noUnreadDesc")
                  : t("notifications.emptyDesc")
              }
            />
          </FadeIn>
        ) : (
          <motion.ul
            className="space-y-3"
            variants={staggerParent}
            initial="hidden"
            animate="show"
          >
            {visible.map((n, i) => {
              const meta = NOTIF_META[n.type] ?? FALLBACK_META;
              const Icon = meta.icon;
              const content = (
                <button
                  type="button"
                  onClick={() => openNotification(n)}
                  aria-label={`${notifText(n, t)}${n.readAt ? "" : ` ${t("notifications.a11y.unreadSuffix")}`}`}
                  className={cn(
                    "relative flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-glow",
                    n.readAt
                      ? "border-white/[0.06] hover:border-white/[0.16]"
                      : "border-white/[0.08] bg-white/[0.04] hover:border-cyan-500/25"
                  )}
                >
                  {!n.readAt && (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl bg-cyan-500/10"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  )}
                  {n.actor ? (
                    <span className="relative shrink-0">
                      <UserAvatar user={n.actor} size={36} />
                      <span
                        className={cn(
                          "absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-[#0b0b12]",
                          meta.bg
                        )}
                      >
                        <Icon className={cn("h-2.5 w-2.5", meta.fg)} />
                      </span>
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08]",
                        meta.bg
                      )}
                    >
                      <Icon className={cn("h-4 w-4", meta.fg)} />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm leading-snug text-foreground/90">
                      {notifText(n, t)}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {rel(n.createdAt)}
                    </span>
                  </span>
                  {!n.readAt && (
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
              return i < STAGGER_CAP ? (
                <motion.li key={n.id} variants={staggerChild}>
                  {content}
                </motion.li>
              ) : (
                <li key={n.id}>{content}</li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </MotionConfig>
  );
}
