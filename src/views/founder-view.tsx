"use client";

// TEKA NEXUS — Founder Console (Task 4-a).
// Founder-only command deck: live community stats + every registered member.
// Visible in the shell only for users with role === "FOUNDER".

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Database,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/shared/atoms";
import { FadeIn, AnimatedNumber, HoverLift, Stagger, StaggerItem } from "@/components/shared/motion";
import { get } from "@/lib/api";
import { useApp } from "@/lib/store";
import { useT, useRelativeTime } from "@/lib/i18n";

type FounderUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  role: string;
  avatarColor: string;
  avatarUrl: string | null;
  bio: string;
  xp: number;
  reputation: number;
  onboardingCompleted: boolean;
  createdAt: string;
};

type FounderStats = {
  totalUsers: number;
  onboarded: number;
  founders: number;
  totalXp: number;
  totalReputation: number;
  totalProjects: number;
  totalSessions: number;
};

export function FounderView() {
  const t = useT();
  const rel = useRelativeTime();
  const user = useApp((s) => s.user);
  const [stats, setStats] = useState<FounderStats | null>(null);
  const [users, setUsers] = useState<FounderUser[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    get<{ stats: FounderStats; users: FounderUser[] }>("/api/founder/users")
      .then((res) => {
        if (!alive) return;
        setStats(res.stats);
        setUsers(res.users);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!users) return null;
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q)
    );
  }, [users, query]);

  const STAT_CARDS: { icon: typeof Users; label: string; value: number; tone: string }[] = stats
    ? [
        { icon: Users, label: t("founder.stats.users"), value: stats.totalUsers, tone: "text-cyan-300 bg-cyan-500/10" },
        { icon: UserPlus, label: t("founder.stats.onboarded"), value: stats.onboarded, tone: "text-emerald-300 bg-emerald-500/10" },
        { icon: Zap, label: t("founder.stats.totalXp"), value: stats.totalXp, tone: "text-amber-300 bg-amber-500/10" },
        { icon: ShieldCheck, label: t("founder.stats.totalRep"), value: stats.totalReputation, tone: "text-violet-300 bg-violet-500/10" },
        { icon: Sparkles, label: t("founder.stats.projects"), value: stats.totalProjects, tone: "text-fuchsia-300 bg-fuchsia-500/10" },
        { icon: Database, label: t("founder.stats.sessions"), value: stats.totalSessions, tone: "text-sky-300 bg-sky-500/10" },
      ]
    : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 ring-1 ring-amber-400/30">
            <Crown className="h-6 w-6 text-amber-300" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t("founder.title")}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{t("founder.subtitle")}</p>
          </div>
          {user?.email && (
            <span className="ms-auto hidden items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-300 sm:inline-flex">
              <Crown className="h-3.5 w-3.5" />
              {user.email}
            </span>
          )}
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STAT_CARDS.length > 0
          ? STAT_CARDS.map((s, i) => (
              <FadeIn key={s.label} delay={0.04 * i}>
                <HoverLift>
                  <div className="glass-card rounded-xl p-4">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${s.tone}`}>
                      <s.icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 font-display text-2xl font-bold tabular-nums">
                      <AnimatedNumber value={s.value} duration={1} delay={0.1 + 0.04 * i} format={(n) => Math.round(n).toLocaleString()} />
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
                  </div>
                </HoverLift>
              </FadeIn>
            ))
          : Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[108px] rounded-xl" />)}
      </div>

      {/* Directory */}
      <FadeIn delay={0.12} className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">{t("founder.directoryTitle")}</h2>
          <div className="relative w-full max-w-xs">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("founder.searchPlaceholder")}
              className="ps-9"
              aria-label={t("founder.searchPlaceholder")}
            />
          </div>
        </div>
      </FadeIn>

      {failed ? (
        <FadeIn delay={0.15}>
          <p className="glass-card mt-4 rounded-xl p-6 text-sm text-muted-foreground">{t("founder.loadFailed")}</p>
        </FadeIn>
      ) : !filtered ? (
        <div className="mt-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="glass-card mt-4 rounded-xl p-6 text-sm text-muted-foreground">{t("founder.empty")}</p>
      ) : (
        <Stagger className="mt-4 space-y-2" gap={0.03}>
          {filtered.map((u) => (
            <StaggerItem key={u.id}>
              <motion.div
                whileHover={{ scale: 1.005 }}
                className="glass-card flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl p-4"
              >
                <UserAvatar user={u} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold">{u.displayName}</p>
                    {u.role === "FOUNDER" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                        <Crown className="h-2.5 w-2.5" />
                        {t("founder.badge")}
                      </span>
                    )}
                    {u.role !== "FOUNDER" && u.role !== "user" && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {u.role}
                      </span>
                    )}
                    {!u.onboardingCompleted && (
                      <span className="rounded-full border border-amber-400/20 bg-amber-500/5 px-2 py-0.5 text-[10px] text-amber-300/90">
                        {t("founder.pendingOnboarding")}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    @{u.username} · {u.email}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs tabular-nums text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-amber-300/80" />
                    {u.xp.toLocaleString()} XP
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-violet-300/80" />
                    {u.reputation.toLocaleString()} REP
                  </span>
                  <span className="hidden sm:inline">{rel(u.createdAt)}</span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
