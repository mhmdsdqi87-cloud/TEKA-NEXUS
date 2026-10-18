"use client";

// TEKA NEXUS — Home view (Task 2-b).
// Live activity feed from public projects + welcome strip + client-side
// event-type filters and cursor-safe pagination ("Load more").

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  FileText,
  Flag,
  Loader2,
  PartyPopper,
  Plus,
  Rocket,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { get, qs } from "@/lib/api";
import { type FeedEvent } from "@/lib/dto";
import { useT, useRelativeTime } from "@/lib/i18n";

import { EmptyState, StatusPill, UserAvatar } from "@/components/shared/atoms";
import { ListSkeleton } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";

// ─── Feed event styling per eventType ────────────────────────
const EVENT_META: Record<string, { icon: LucideIcon; wrap: string; text: string }> = {
  PROJECT_CREATED: { icon: Rocket, wrap: "bg-cyan-500/10 border-cyan-500/20", text: "text-cyan-300" },
  UPDATE_POSTED: { icon: FileText, wrap: "bg-violet-500/10 border-violet-500/20", text: "text-violet-300" },
  MILESTONE_COMPLETED: { icon: Flag, wrap: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-300" },
  RELEASE_PUBLISHED: { icon: PartyPopper, wrap: "bg-amber-500/10 border-amber-500/20", text: "text-amber-300" },
  MEMBER_JOINED: { icon: UserPlus, wrap: "bg-cyan-500/10 border-cyan-500/20", text: "text-cyan-300" },
  TASK_COMPLETED: { icon: CheckCircle2, wrap: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-300" },
};
const FALLBACK_META = { icon: Sparkles, wrap: "bg-white/[0.05] border-white/10", text: "text-muted-foreground" };

// Dictionary keys per feed event verb (rendered as: {actor} {verb} {project}).
const VERB_KEYS: Record<string, string> = {
  PROJECT_CREATED: "home.verbCreated",
  UPDATE_POSTED: "home.verbUpdate",
  MILESTONE_COMPLETED: "home.verbMilestone",
  MEMBER_JOINED: "home.verbJoined",
  TASK_COMPLETED: "home.verbTask",
};

const FALLBACK_VERB_KEY = "home.verbActivityOn";

type FeedFilter = "all" | "releases" | "updates" | "milestones";
const FILTER_EVENT_TYPES: Record<Exclude<FeedFilter, "all">, string[]> = {
  releases: ["RELEASE_PUBLISHED"],
  updates: ["UPDATE_POSTED"],
  milestones: ["MILESTONE_COMPLETED"],
};

const FILTER_LABEL_KEYS: Record<FeedFilter, string> = {
  all: "home.filterAll",
  releases: "home.filterReleases",
  updates: "home.filterUpdates",
  milestones: "home.filterMilestones",
};

const FILTER_CHIPS: FeedFilter[] = ["all", "releases", "updates", "milestones"];

// ─── Feed event card ─────────────────────────────────────────
function FeedEventCard({ event }: { event: FeedEvent }) {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const rel = useRelativeTime();
  const meta = EVENT_META[event.eventType] ?? FALLBACK_META;
  const Icon = meta.icon;
  const actorName = event.actor?.displayName ?? t("home.someone");
  const releaseTitle =
    event.eventType === "RELEASE_PUBLISHED" && typeof event.metadata?.title === "string"
      ? event.metadata.title
      : "";
  const verb = t(VERB_KEYS[event.eventType] ?? FALLBACK_VERB_KEY);

  const openProject = () => navigate({ name: "project", slug: event.project.slug });
  const openProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.actor) navigate({ name: "profile", username: event.actor.username });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openProject}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject();
        }
      }}
      aria-label={t("home.openProjectAria", { name: event.project.name })}
      className="glass-card rounded-xl p-4 flex items-start gap-3.5 cursor-pointer outline-none focus-glow group"
    >
      <span
        aria-hidden="true"
        className={cn("h-10 w-10 rounded-full border flex items-center justify-center shrink-0", meta.wrap)}
      >
        <Icon className={cn("h-[18px] w-[18px]", meta.text)} />
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">
          <span className="font-medium text-foreground">{actorName}</span>{" "}
          <span className="text-muted-foreground">{verb}</span>{" "}
          {releaseTitle && (
            <>
              <span className="font-medium text-foreground">&ldquo;{releaseTitle}&rdquo;</span>{" "}
              <span className="text-muted-foreground">{t("home.on")}</span>{" "}
            </>
          )}
          <span className="font-medium text-cyan-300 group-hover:underline">
            {event.project.name}
          </span>
        </p>
        {event.project.tagline && (
          <p className="text-xs text-muted-foreground/80 line-clamp-1 mt-0.5">{event.project.tagline}</p>
        )}
        <div className="flex items-center gap-2.5 mt-2 flex-wrap">
          <span className="text-xs text-muted-foreground/70">
            {rel(new Date(event.createdAt))}
          </span>
          <StatusPill status={event.project.status} />
        </div>
      </div>

      {event.actor && (
        <button
          onClick={openProfile}
          className="shrink-0 rounded-full outline-none focus-glow cursor-pointer"
          aria-label={t("home.viewProfileAria", { name: event.actor.displayName })}
        >
          <UserAvatar user={event.actor} size={32} className="transition-transform hover:scale-105" />
        </button>
      )}
    </div>
  );
}

// ─── Home view ───────────────────────────────────────────────
export function HomeView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const t = useT();

  const [events, setEvents] = useState<FeedEvent[] | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FeedFilter>("all");

  const load = useCallback(
    async (nextPage: number, append: boolean) => {
      if (append) setLoadingMore(true);
      try {
        const res = await get<{ events: FeedEvent[]; page: number; pages: number; total: number }>(
          `/api/feed${qs({ page: nextPage })}`
        );
        setEvents((prev) => (append ? [...(prev ?? []), ...res.events] : res.events));
        setPage(res.page);
        setPages(res.pages);
        setTotal(res.total);
        setError(null);
      } catch (e) {
        const msg = e instanceof Error ? e.message : t("home.feedError");
        setError(msg);
        toast.error(msg);
      } finally {
        if (append) setLoadingMore(false);
      }
    },
    [t]
  );

  useEffect(() => {
    load(1, false);
  }, [load]);

  const filtered =
    events === null
      ? null
      : filter === "all"
        ? events
        : events.filter((e) => FILTER_EVENT_TYPES[filter].includes(e.eventType));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header row */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{t("common.home")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("home.subtitle")}</p>
        </div>
        <Button className="btn-hero shrink-0" size="sm" onClick={() => navigate({ name: "projectNew" })}>
          <Plus className="h-4 w-4" /> {t("nav.newProject")}
        </Button>
      </div>

      {/* Welcome strip */}
      {user && (
        <div className="glass-card rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <UserAvatar user={user} size={44} />
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold">{t("home.welcomeBack", { name: user.displayName })}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t("home.readyToBuild", { username: user.username })}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate({ name: "profile", username: user.username })}
            >
              <CircleUserRound className="h-3.5 w-3.5" /> {t("home.yourProfile")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate({ name: "saved" })}>
              <Bookmark className="h-3.5 w-3.5" /> {t("common.saved")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate({ name: "teams" })}>
              <Users className="h-3.5 w-3.5" /> {t("common.teams")}
            </Button>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1" role="group" aria-label={t("home.filterGroupAria")}>
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setFilter(chip)}
            aria-pressed={filter === chip}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors outline-none focus-glow min-h-[32px]",
              filter === chip
                ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-300"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            )}
          >
            {t(FILTER_LABEL_KEYS[chip])}
          </button>
        ))}
      </div>

      {/* Feed */}
      {events === null ? (
        error ? (
          <EmptyState
            icon={Sparkles}
            title={t("home.feedErrorTitle")}
            description={error}
            action={
              <Button variant="outline" onClick={() => load(1, false)}>
                {t("common.retry")}
              </Button>
            }
          />
        ) : (
          <ListSkeleton rows={4} />
        )
      ) : filtered && filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((e) => (
            <FeedEventCard key={e.id} event={e} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title={t("home.emptyTitle")}
          description={t("home.emptyDescription")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "projectNew" })}>
              <Plus className="h-4 w-4" /> {t("home.createFirstProject")}
            </Button>
          }
        />
      ) : (
        <p className="text-center text-sm text-muted-foreground py-10">
          {t("home.noFilterEvents", { filter: t(FILTER_LABEL_KEYS[filter]) })}
        </p>
      )}

      {/* Load more */}
      {events !== null && page < pages && filtered !== null && filtered.length > 0 && (
        <div className="flex flex-col items-center gap-1.5 mt-6">
          <Button variant="outline" disabled={loadingMore} onClick={() => load(page + 1, true)}>
            {loadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
            {t("home.loadMore")}
          </Button>
          <span className="text-[11px] text-muted-foreground/70 font-mono">
            {t("home.pageStatus", { total, page, pages })}
          </span>
        </div>
      )}
    </motion.div>
  );
}
