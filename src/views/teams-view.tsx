"use client";

// TEKA NEXUS — Teams view (spec §10): crew formation hub.
// Tabs: My crews / Requests / Discover. Guarded behind auth.

import { useCallback, useEffect, useState } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const errText = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong");

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

const REQ_STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-amber-500/15 text-amber-300",
  ACCEPTED: "bg-emerald-500/15 text-emerald-300",
  REJECTED: "bg-rose-500/15 text-rose-300",
  WITHDRAWN: "bg-zinc-500/15 text-zinc-400",
};

function RequestStatusChip({ status }: { status: string }) {
  const label = status.charAt(0) + status.slice(1).toLowerCase();
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

function fmtAgo(v: string | null | undefined) {
  return v ? formatDistanceToNow(parseISO(v), { addSuffix: true }) : "—";
}

const TAB_ITEMS = [
  { value: "crews", label: "My crews", icon: Users },
  { value: "requests", label: "Requests", icon: Inbox },
  { value: "discover", label: "Discover", icon: Compass },
] as const;

export function TeamsView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const [tab, setTab] = useState("crews");

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20">
        <EmptyState
          icon={Users}
          title="Sign in to manage your teams"
          description="Track your crews, review collaboration requests and discover projects that need your skills."
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              Sign in
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
          Your <span className="text-gradient">crews</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the projects you build together, answer requests and find new collaborators.
        </p>
      </header>

      <Tabs value={tab} onValueChange={setTab}>
        <div className="overflow-x-auto pb-0.5">
          <TabsList className="glass h-11 w-fit min-w-full gap-1 rounded-xl bg-transparent p-1">
            {TAB_ITEMS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="relative gap-1.5 rounded-lg px-3 text-xs data-[state=active]:bg-white/[0.06] data-[state=active]:text-foreground md:px-4 md:text-sm"
              >
                <t.icon className="h-4 w-4" />
                {t.label}
                {tab === t.value && (
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
  const [crews, setCrews] = useState<MyMembership[] | null>(null);

  const load = useCallback(() => {
    get<{ projects: MyMembership[] }>("/api/me/projects")
      .then((r) => setCrews(r.projects))
      .catch((e) => {
        setCrews([]);
        toast.error(errText(e));
      });
  }, []);

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
        title="You're not part of a crew yet"
        description="Join a project or start your own — collaboration is where the best builds happen."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button className="btn-hero" onClick={() => navigate({ name: "explore" })}>
              <Compass className="h-4 w-4" /> Explore projects
            </Button>
            <Button variant="outline" onClick={() => navigate({ name: "projectNew" })}>
              Start a project
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {crews.map((m) => (
        <div key={m.project.id} className="relative">
          <span className="absolute -top-2 left-3 z-10">
            <RoleChip role={m.role} />
          </span>
          <ProjectCardView project={m.project} compact />
          <div className="mt-2 flex items-center justify-between gap-2 px-0.5">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {m.project.memberCount} member{m.project.memberCount === 1 ? "" : "s"}
              <span className="text-muted-foreground/50">·</span>
              <span className="hidden sm:inline">joined {format(parseISO(m.joinedAt), "MMM yyyy")}</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => navigate({ name: "project", slug: m.project.slug })}
            >
              Open workspace <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
          <span className="sr-only">Your role: {MEMBER_ROLES.find((r) => r.slug === m.role)?.name}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Requests hub ─────────────────────────────────────────────────────────────

function RequestsHub() {
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
        toast.error(errText(e));
      });
  }, []);

  useEffect(load, [load]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section aria-label="Sent requests">
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <Send className="h-4 w-4 text-cyan-300" /> Sent
          <span className="text-sm font-normal text-muted-foreground">
            ({sent?.filter((r) => r.status === "PENDING").length ?? 0} pending)
          </span>
        </h2>
        {sent === null ? (
          <div className="space-y-3">
            <Skeleton className="h-32 rounded-xl bg-white/[0.04]" />
            <Skeleton className="h-32 rounded-xl bg-white/[0.04]" />
          </div>
        ) : sent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
            No sent requests — find a project and ask to join.
          </div>
        ) : (
          <div className="space-y-3">
            {sent.map((r) => (
              <SentRequestCard key={r.id} request={r} onChanged={load} />
            ))}
          </div>
        )}
      </section>

      <section aria-label="Received requests">
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <Inbox className="h-4 w-4 text-violet-300" /> Received
          <span className="text-sm font-normal text-muted-foreground">
            ({received?.filter((r) => r.status === "PENDING").length ?? 0} pending)
          </span>
        </h2>
        {received === null ? (
          <div className="space-y-3">
            <Skeleton className="h-36 rounded-xl bg-white/[0.04]" />
            <Skeleton className="h-36 rounded-xl bg-white/[0.04]" />
          </div>
        ) : received.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
            No incoming requests yet. Keep shipping — developers will find you.
          </div>
        ) : (
          <div className="space-y-3">
            {received.map((r) => (
              <ReceivedRequestCard key={r.id} request={r} onChanged={load} />
            ))}
          </div>
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
  const [withdrawing, setWithdrawing] = useState(false);
  const pending = request.status === "PENDING";

  async function withdraw() {
    setWithdrawing(true);
    try {
      await del(`/api/requests/${request.id}`);
      onChanged();
      toast.success("Request withdrawn");
    } catch (e) {
      toast.error(errText(e));
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
            {request.project?.name ?? "Unknown project"}
          </button>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Applied as {request.requestedRole.toLowerCase()} · {fmtAgo(request.createdAt)}
          </p>
        </div>
        <RequestStatusChip status={request.status} />
      </div>
      <p className="mt-2 line-clamp-2 rounded-lg bg-white/[0.03] p-2.5 text-xs italic leading-relaxed text-zinc-300">
        &ldquo;{request.introduction}&rdquo;
      </p>
      {pending && (
        <div className="mt-3 flex justify-end">
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
            Withdraw
          </Button>
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
  const [acting, setActing] = useState<"accept" | "reject" | null>(null);
  const pending = request.status === "PENDING";

  async function review(action: "accept" | "reject") {
    setActing(action);
    try {
      await patch(`/api/requests/${request.id}`, { action });
      onChanged();
      toast.success(
        action === "accept"
          ? "Welcome aboard — request accepted"
          : "Request rejected"
      );
    } catch (e) {
      toast.error(errText(e));
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
          aria-label={`View profile of ${request.applicant.displayName}`}
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
          Wants to join{" "}
          <span className="font-medium text-foreground">{request.project?.name ?? "a project"}</span>{" "}
          as <span className="font-medium uppercase">{request.requestedRole.toLowerCase()}</span>
        </span>
        <span>· {fmtAgo(request.createdAt)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {pending ? (
          <>
            <Button
              size="sm"
              className="btn-hero h-8 flex-1"
              onClick={() => review("accept")}
              disabled={acting !== null}
            >
              {acting === "accept" ? (
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
              onClick={() => review("reject")}
              disabled={acting !== null}
            >
              {acting === "reject" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Reject
            </Button>
          </>
        ) : null}
        {request.project && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8"
            onClick={() => navigate({ name: "project", slug: request.project!.slug })}
          >
            View project <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Discover ─────────────────────────────────────────────────────────────────

function DiscoverCrews() {
  const [projects, setProjects] = useState<ProjectCard[] | null>(null);

  const load = useCallback(() => {
    get<{ projects: ProjectCard[] }>("/api/projects?sort=recent")
      .then((r) => setProjects(r.projects))
      .catch((e) => {
        setProjects([]);
        toast.error(errText(e));
      });
  }, []);

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
        <h2 className="font-display text-lg font-semibold">Crews looking for members</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Projects listing required skills — find a team that needs what you know.
        </p>
      </div>

      {recruiting.length === 0 ? (
        <>
          <EmptyState
            icon={Compass}
            title="No projects listing required skills right now"
            description="Showing the latest projects instead — check back as new crews post their needs."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCardView key={p.id} project={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recruiting.map((p) => (
            <div key={p.id} className="space-y-1.5">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
