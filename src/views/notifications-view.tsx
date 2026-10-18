"use client";

// TEKA NEXUS — NotificationsView (Task 2-d): in-app notification center (spec §13).
// Runs inside AppShell — no nav of its own.

import { useCallback, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  Bell,
  BellOff,
  CheckCheck,
  ClipboardList,
  Handshake,
  Info,
  Loader2,
  MessageSquare,
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
import { Button } from "@/components/ui/button";

type NotifMeta = { icon: LucideIcon; fg: string; bg: string };

const NOTIF_META: Record<string, NotifMeta> = {
  NEW_FOLLOWER: { icon: UserPlus, fg: "text-cyan-300", bg: "bg-cyan-500/10" },
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

/** Payload fields vary per notification type — read them defensively. */
function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function notifText(n: NotificationDTO): string {
  const p = (n.payload ?? {}) as Record<string, unknown>;
  const actorName =
    n.actor?.displayName ??
    str(p.displayName) ??
    str(p.commenterName) ??
    str(p.applicantName) ??
    str(p.memberName) ??
    (n.actor ? `@${n.actor.username}` : null) ??
    "Someone";
  const projectName = str(p.projectName);
  const taskTitle = str(p.taskTitle);

  switch (n.type) {
    case "NEW_FOLLOWER":
      return `${actorName} started following you`;
    case "PROJECT_COMMENT":
      return projectName
        ? `${actorName} commented on ${projectName}`
        : `${actorName} commented on your project`;
    case "COLLAB_REQUEST":
      return projectName
        ? `${actorName} requested to join ${projectName}`
        : `${actorName} sent a collaboration request`;
    case "REQUEST_ACCEPTED":
      return projectName
        ? `Your request to join ${projectName} was accepted`
        : "Your collaboration request was accepted";
    case "REQUEST_REJECTED":
      return projectName
        ? `Your request to join ${projectName} was rejected`
        : "Your collaboration request was rejected";
    case "TASK_ASSIGNED":
      return taskTitle
        ? `${actorName} assigned you a task: ${taskTitle}`
        : `${actorName} assigned you a new task`;
    case "MEMBER_JOINED":
      return projectName ? `${actorName} joined ${projectName}` : `${actorName} joined your team`;
    case "SYSTEM":
      return str(p.message) ?? "System notification";
    default:
      return str(p.message) ?? "You have a new notification";
  }
}

export function NotificationsView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const setUnreadCount = useApp((s) => s.setUnreadCount);

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
      toast.error(e instanceof Error ? e.message : "Couldn't load notifications.");
    }
  }, [setUnreadCount]);

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
      toast.success("All notifications marked as read");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't mark notifications as read.");
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
        toast.error("Couldn't mark this notification as read.");
        return;
      }
    }
    // Navigate using only trustworthy payload fields: project slug first, then actor profile.
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
          title="Sign in to view your notifications"
          description="Activity from your projects, teams, and followers shows up here."
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              Sign in
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
            <h1 className="font-display text-2xl font-bold md:text-3xl">Notifications</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {unread > 0
                ? `${unread} unread notification${unread === 1 ? "" : "s"}`
                : "You're all caught up"}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={markAllRead}
            disabled={markAllPending || unread === 0}
            className="shrink-0"
          >
            {markAllPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
            Mark all read
          </Button>
        </motion.div>

        {/* ── Filter chips ───────────────────────────────────── */}
        <div className="flex items-center gap-2" role="group" aria-label="Filter notifications">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors focus-glow",
                filter === f
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-200"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "All" : `Unread${unread > 0 ? ` · ${unread}` : ""}`}
            </button>
          ))}
        </div>

        {/* ── List ───────────────────────────────────────────── */}
        {loading ? (
          <ListSkeleton rows={5} />
        ) : loadFailed ? (
          <EmptyState
            icon={Info}
            title="Couldn't load notifications"
            description="Check your connection and try again."
            action={
              <Button variant="outline" onClick={load}>
                Try again
              </Button>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={BellOff}
            title="You're all caught up"
            description={
              filter === "unread"
                ? "No unread notifications right now."
                : "Activity from your projects, teams, and followers will appear here."
            }
          />
        ) : (
          <ul className="space-y-3">
            {visible.map((n) => {
              const meta = NOTIF_META[n.type] ?? FALLBACK_META;
              const Icon = meta.icon;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => openNotification(n)}
                    aria-label={`${notifText(n)}${n.readAt ? "" : " (unread)"}`}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-glow",
                      n.readAt
                        ? "border-white/[0.06] hover:border-white/[0.16]"
                        : "border-white/[0.08] bg-white/[0.04] hover:border-cyan-500/25"
                    )}
                  >
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
                        {notifText(n)}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </span>
                    </span>
                    {!n.readAt && (
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </MotionConfig>
  );
}
