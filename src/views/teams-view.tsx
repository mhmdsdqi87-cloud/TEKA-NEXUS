"use client";

// TEKA NEXUS — Teams view (spec §10): crew formation hub.
// Tabs: My crews / Requests / Discover. Guarded behind auth.

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useT, useRelativeTime, useFormatDate, useLabeled } from "@/lib/i18n";
import {
  CheckCircle2,
  Compass,
  ExternalLink,
  Inbox,
  Loader2,
  LogOut,
  Send,
  Users,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { get, del, patch } from "@/lib/api";
import { useApp } from "@/lib/store";
import { MEMBER_ROLES } from "@/lib/constants";
import type { CollabRequestDTO, ProjectCard } from "@/lib/dto";
import { EmptyState, UserAvatar } from "@/components/shared/atoms";
import { ProjectCardView } from "@/components/shared/project-card";
import { FadeIn, Stagger, StaggerItem, TapScale } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const STAGGER_CAP = 12;

const errText = (e: unknown, fallback: string) => (e instanceof Error ? e.message : fallback);

type MyMembership = {
  role: string;
  joinedAt: string;
  project: ProjectCard;
};

const ROLE_STYLE: Record<string, string> = {
  OWNER: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  ADMIN: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  CONTRIBUTOR: "bg-zinc-500/15 text-zinc-300 border-zinc-500/25",
  VIEWER: "bg-zinc-600/10 text-zinc-400 border-zinc-600/20",
};

function RoleChip({ role, className }: { role: string; className?: string }) {
  const lbl = useLabeled();
  const name = lbl("project.roles", role, MEMBER_ROLES.find((r) => r.slug === role)?.name ?? role);
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

const REQ_STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-amber-500/15 text-amber-300",
  ACCEPTED: "bg-emerald-500/15 text-emerald-300",
  REJECTED: "bg-rose-500/15 text-rose-300",
  WITHDRAWN: "bg-zinc-500/15 text-zinc-400",
};

function RequestStatusChip({ status }: { status: string }) {
  const t = useT();
  const label = t(`teams.status.${status}`);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        REQ_STATUS_STYLE[status] ?? REQ_STATUS_STYLE.WITHDRAWN
      )}
    >
      {label}
    </span>
  );
}

const TAB_ITEMS = [
  { value: "crews", labelKey: "crews", icon: Users },
  { value: "requests", labelKey: "requests", icon: Inbox },
  { value: "discover", labelKey: "discover", icon: Compass },
] as const;

export function TeamsView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const [tab, setTab] = useState("crews");
  const t = useT();

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20">
        <EmptyState
          icon={Users}
          title={t("teams.auth.title")}
          description={t("teams.auth.description")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              {t("common.signIn")}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-6 md:px-6">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold md:text-3xl">
          {t("teams.titlePrefix")} <span className="text-gradient">{t("teams.titleCrews")}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("teams.subtitle")}
        </p>
      </header>

      <Tabs value={tab} onValueChange={setTab}>
        <div className="overflow-x-auto pb-0.5">
          <TabsList className="glass h-11 w-fit min-w-full gap-1 rounded-xl bg-transparent p-1">
            {TAB_ITEMS.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="relative gap-1.5 rounded-lg px-3 text-xs data-[state=active]:bg-white/[0.06] data-[state=active]:text-foreground md:px-4 md:text-sm"
              >
                <item.icon className="h-4 w-4" />
                {t(`teams.tabs.${item.labelKey}`)}
                {tab === item.value && (
                  <motion.span
                    layoutId="teams-tab-underline"
                    className="absolute inset-x-3 bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="crews" className="mt-6">
          <MyCrews />
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <RequestsHub />
        </TabsContent>

        <TabsContent value="discover" className="mt-6">
          <DiscoverCrews />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── My crews ─────────────────────────────────────────────────────────────────

function MyCrews() {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const lbl = useLabeled();
  const fd = useFormatDate();
  const [crews, setCrews] = useState<MyMembership[] | null>(null);

  const load = useCallback(() => {
    get<{ projects: MyMembership[] }>("/api/me/projects")
      .then((r) => setCrews(r.projects))
      .catch((e) => {
        setCrews([]);
        toast.error(errText(e, t("teams.errors.generic")));
      });
  }, [t]);

  useEffect(load, [load]);

  if (crews === null) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-52 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  if (crews.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title={t("teams.crews.emptyTitle")}
        description={t("teams.crews.emptyDesc")}
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button className="btn-hero" onClick={() => navigate({ name: "explore" })}>
              <Compass className="h-4 w-4" /> {t("teams.crews.explore")}
            </Button>
            <Button variant="outline" onClick={() => navigate({ name: "projectNew" })}>
              {t("teams.crews.start")}
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
      {crews.map((m, i) => (
        <StaggerItem key={m.project.id} className="relative">
          <span className="absolute -top-2 left-3 z-10">
            <RoleChip role={m.role} />
          </span>
          <ProjectCardView project={m.project} compact />
          <div className="mt-2 flex items-center justify-between gap-2 px-0.5">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {m.project.memberCount === 1
                ? t("teams.crews.member", { n: m.project.memberCount })
                : t("teams.crews.members", { n: m.project.memberCount })}
              <span className="text-muted-foreground/50">·</span>
              <span className="hidden sm:inline">{t("teams.crews.joined", { date: fd(m.joinedAt, "MMM yyyy") })}</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => navigate({ name: "project", slug: m.project.slug })}
            >
              {t("teams.crews.open")} <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
          <span className="sr-only">{t("teams.a11y.yourRole", { role: lbl("project.roles", m.role, "") })}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

// ─── Requests hub ─────────────────────────────────────────────────────────────

function RequestsHub() {
  const t = useT();
  const [sent, setSent] = useState<CollabRequestDTO[] | null>(null);
  const [received, setReceived] = useState<CollabRequestDTO[] | null>(null);

  const load = useCallback(() => {
    get<{ sent: CollabRequestDTO[]; received: CollabRequestDTO[] }>("/api/me/requests")
      .then((r) => {
        setSent(r.sent);
        setReceived(r.received);
      })
      .catch((e) => {
        setSent([]);
        setReceived([]);
        toast.error(errText(e, t("teams.errors.generic")));
      });
  }, [t]);

  useEffect(load, [load]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section aria-label={t("teams.a11y.sentAria")}>
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <Send className="h-4 w-4 text-cyan-300" /> {t("teams.requests.sent")}
          <span className="text-sm font-normal text-muted-foreground">
            {t("teams.requests.pendingCount", { n: sent?.filter((r) => r.status === "PENDING").length ?? 0 })}
          </span>
        </h2>
        {sent === null ? (
          <div className="space-y-3">
            <Skeleton className="h-32 rounded-xl bg-white/[0.04]" />
            <Skeleton className="h-32 rounded-xl bg-white/[0.04]" />
          </div>
        ) : sent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
            {t("teams.requests.sentEmpty")}
          </div>
        ) : (
          <Stagger className="space-y-3" gap={0.05}>
            {sent.map((r) => (
              <StaggerItem key={r.id}>
                <SentRequestCard request={r} onChanged={load} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      <section aria-label={t("teams.a11y.receivedAria")}>
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <Inbox className="h-4 w-4 text-violet-300" /> {t("teams.requests.received")}
          <span className="text-sm font-normal text-muted-foreground">
            {t("teams.requests.pendingCount", { n: received?.filter((r) => r.status === "PENDING").length ?? 0 })}
          </span>
        </h2>
        {received === null ? (
          <div className="space-y-3">
            <Skeleton className="h-36 rounded-xl bg-white/[0.04]" />
            <Skeleton className="h-36 rounded-xl bg-white/[0.04]" />
          </div>
        ) : received.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
            {t("teams.requests.receivedEmpty")}
          </div>
        ) : (
          <Stagger className="space-y-3" gap={0.05}>
            {received.map((r) => (
              <StaggerItem key={r.id}>
                <ReceivedRequestCard request={r} onChanged={load} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>
    </div>
  );
}

function SentRequestCard({
  request,
  onChanged,
}: {
  request: CollabRequestDTO;
  onChanged: () => void;
}) {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const rel = useRelativeTime();
  const [withdrawing, setWithdrawing] = useState(false);
  const pending = request.status === "PENDING";

  async function withdraw() {
    setWithdrawing(true);
    try {
      await del(`/api/requests/${request.id}`);
      onChanged();
      toast.success(t("teams.toasts.withdrawn"));
    } catch (e) {
      toast.error(errText(e, t("teams.errors.generic")));
    } finally {
      setWithdrawing(false);
    }
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <button
            onClick={() =>
              request.project && navigate({ name: "project", slug: request.project.slug })
            }
            className="focus-glow truncate rounded text-left font-display text-sm font-semibold transition-colors hover:text-cyan-300"
          >
            {request.project?.name ?? t("teams.requests.unknownProject")}
          </button>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {t("teams.requests.appliedAs", {
              role: request.requestedRole.toLowerCase(),
              ago: rel(request.createdAt),
            })}
          </p>
        </div>
        <RequestStatusChip status={request.status} />
      </div>
      <p className="mt-2 line-clamp-2 rounded-lg bg-white/[0.03] p-2.5 text-xs italic leading-relaxed text-zinc-300">
        &ldquo;{request.introduction}&rdquo;
      </p>
      {pending && (
        <div className="mt-3 flex justify-end">
          <TapScale>
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={withdraw}
              disabled={withdrawing}
            >
              {withdrawing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-3.5 w-3.5" />
              )}
              {t("teams.requests.withdraw")}
            </Button>
          </TapScale>
        </div>
      )}
    </div>
  );
}

function ReceivedRequestCard({
  request,
  onChanged,
}: {
  request: CollabRequestDTO;
  onChanged: () => void;
}) {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const rel = useRelativeTime();
  const [acting, setActing] = useState<"accept" | "reject" | null>(null);
  const pending = request.status === "PENDING";

  async function review(action: "accept" | "reject") {
    setActing(action);
    try {
      await patch(`/api/requests/${request.id}`, { action });
      onChanged();
      toast.success(
        action === "accept"
          ? t("teams.toasts.accepted")
          : t("teams.toasts.rejected")
      );
    } catch (e) {
      toast.error(errText(e, t("teams.errors.generic")));
    } finally {
      setActing(null);
    }
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-start justify-between gap-2">
        <button
          onClick={() => navigate({ name: "profile", username: request.applicant.username })}
          className="focus-glow flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left"
          aria-label={t("teams.a11y.viewProfileAria", { name: request.applicant.displayName })}
        >
          <UserAvatar user={request.applicant} size={38} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              {request.applicant.displayName}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              @{request.applicant.username}
            </span>
          </span>
        </button>
        <RequestStatusChip status={request.status} />
      </div>

      {request.applicant.bio && (
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{request.applicant.bio}</p>
      )}
      <p className="mt-2 rounded-lg bg-white/[0.03] p-2.5 text-xs italic leading-relaxed text-zinc-300">
        &ldquo;{request.introduction}&rdquo;
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        <span>
          {t("teams.requests.wantsToJoinPrefix")}
          <span className="font-medium text-foreground">{request.project?.name ?? t("teams.requests.aProject")}</span>
          {t("teams.requests.wantsToJoinMiddle")}
          <span className="font-medium uppercase">{request.requestedRole.toLowerCase()}</span>
          {t("teams.requests.wantsToJoinSuffix")}
        </span>
        <span>· {rel(request.createdAt)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {pending ? (
          <>
            <TapScale className="flex-1">
              <Button
                size="sm"
                className="btn-hero h-8 w-full"
                onClick={() => review("accept")}
                disabled={acting !== null}
              >
                {acting === "accept" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {t("teams.accept")}
              </Button>
            </TapScale>
            <TapScale className="flex-1">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-full"
                onClick={() => review("reject")}
                disabled={acting !== null}
              >
                {acting === "reject" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {t("teams.reject")}
              </Button>
            </TapScale>
          </>
        ) : null}
        {request.project && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8"
            onClick={() => navigate({ name: "project", slug: request.project!.slug })}
          >
            {t("teams.requests.viewProject")} <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Discover ─────────────────────────────────────────────────────────────────

function DiscoverCrews() {
  const t = useT();
  const [projects, setProjects] = useState<ProjectCard[] | null>(null);

  const load = useCallback(() => {
    get<{ projects: ProjectCard[] }>("/api/projects?sort=recent")
      .then((r) => setProjects(r.projects))
      .catch((e) => {
        setProjects([]);
        toast.error(errText(e, t("teams.errors.generic")));
      });
  }, [t]);

  useEffect(load, [load]);

  if (projects === null) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  const recruiting = projects.filter((p) => p.requiredSkills.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold">{t("teams.discover.title")}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {t("teams.discover.subtitle")}
        </p>
      </div>

      {recruiting.length === 0 ? (
        <>
          <FadeIn>
            <EmptyState
              icon={Compass}
              title={t("teams.discover.emptyTitle")}
              description={t("teams.discover.emptyDesc")}
            />
          </FadeIn>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.04}>
            {projects.map((p, i) =>
              i < STAGGER_CAP ? (
                <StaggerItem key={p.id}>
                  <ProjectCardView project={p} />
                </StaggerItem>
              ) : (
                <FadeIn key={p.id} y={12} duration={0.35}>
                  <ProjectCardView project={p} />
                </FadeIn>
              )
            )}
          </Stagger>
        </>
      ) : (
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.04}>
          {recruiting.map((p, i) =>
            i < STAGGER_CAP ? (
              <StaggerItem key={p.id} className="space-y-1.5">
                <ProjectCardView project={p} />
                {p.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 px-0.5">
                    {p.requiredSkills.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-violet-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </StaggerItem>
            ) : (
              <FadeIn key={p.id} y={12} duration={0.35} className="space-y-1.5">
                <ProjectCardView project={p} />
                {p.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 px-0.5">
                    {p.requiredSkills.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-violet-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </FadeIn>
            )
          )}
        </Stagger>
      )}
    </div>
  );
}
