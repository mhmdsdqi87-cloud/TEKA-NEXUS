"use client";

// TEKA NEXUS — shared UI atoms used across every view.

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useT, useLabeled } from "@/lib/i18n";
import { EASE, AnimatedNumber } from "@/components/shared/motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AVATAR_GRADIENTS, PROJECT_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { UserCard } from "@/lib/dto";
import { Compass, Inbox } from "lucide-react";
import Link from "next/link";

// ─── Avatar ──────────────────────────────────────────────────
export function UserAvatar({
  user,
  size = 36,
  className,
}: {
  user: Pick<UserCard, "username" | "displayName" | "avatarColor" | "avatarUrl"> | null | undefined;
  size?: number;
  className?: string;
}) {
  const initials = user?.displayName
    ? user.displayName.trim().slice(0, 2).toUpperCase()
    : user?.username?.slice(0, 2).toUpperCase() ?? "?";
  const gradient = AVATAR_GRADIENTS[user?.avatarColor ?? "cyan"] ?? AVATAR_GRADIENTS.cyan;
  return (
    <Avatar
      style={{ width: size, height: size }}
      className={cn("border border-white/10 shrink-0", className)}
    >
      {user?.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.displayName} /> : null}
      <AvatarFallback className={cn("bg-gradient-to-br text-[#0a0a12] font-bold", gradient)} style={{ fontSize: size * 0.36 }}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

// ─── Status pill ─────────────────────────────────────────────
export function StatusPill({ status, className }: { status: string; className?: string }) {
  const lbl = useLabeled();
  const s = PROJECT_STATUSES.find((x) => x.slug === status) ?? PROJECT_STATUSES[0];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        s.bg,
        s.color,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {lbl("project.status", s.slug, s.name)}
    </motion.span>
  );
}

export function PriorityPill({ priority, className }: { priority: string; className?: string }) {
  const lbl = useLabeled();
  const p = TASK_PRIORITIES.find((x) => x.slug === priority) ?? TASK_PRIORITIES[1];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        p.bg,
        p.color,
        className
      )}
    >
      {lbl("project.priority", p.slug, p.name)}
    </motion.span>
  );
}

// ─── Empty state ─────────────────────────────────────────────
export function EmptyState({
  icon: Icon = Compass,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-14 px-6 gap-3", className)}>
      <div className="h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// ─── Project cover (gradient fallback if no image) ───────────
const COVER_GRADIENTS = [
  "from-cyan-500/40 via-teal-500/20 to-transparent",
  "from-violet-500/40 via-purple-500/20 to-transparent",
  "from-emerald-500/30 via-cyan-500/20 to-transparent",
  "from-rose-500/30 via-violet-500/20 to-transparent",
  "from-amber-500/30 via-cyan-500/20 to-transparent",
];

export function ProjectCover({
  cover,
  name,
  className,
  seed = 0,
}: {
  cover?: string | null;
  name: string;
  className?: string;
  seed?: number;
}) {
  const t = useT();
  if (cover) {
    return (
      <img src={cover} alt={t("profile.shared.coverAlt", { name })} className={cn("object-cover w-full h-full", className)} loading="lazy" />
    );
  }
  const g = COVER_GRADIENTS[Math.abs(seed) % COVER_GRADIENTS.length];
  return (
    <div className={cn("w-full h-full bg-gradient-to-br relative overflow-hidden", g, className)}>
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <span className="absolute bottom-2 right-3 font-display font-bold text-white/20 text-5xl select-none">
        {name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

// ─── XP bar / reputation chip ────────────────────────────────
export function ReputationChip({ xp, reputation, className }: { xp?: number; reputation?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-xs text-muted-foreground", className)}>
      {typeof xp === "number" && (
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />{" "}
          <AnimatedNumber value={xp} format={(n) => Math.round(n).toLocaleString()} /> XP
        </span>
      )}
      {typeof reputation === "number" && (
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />{" "}
          <AnimatedNumber value={reputation} format={(n) => Math.round(n).toLocaleString()} /> REP
        </span>
      )}
    </span>
  );
}

export { Inbox as _InboxIcon };
