"use client";

// TEKA NEXUS — PROJECT DNA workspace (NEXUS 2.0 Phase 1).
//
// The digital identity of a project, assembled from REAL platform records:
// - Identity/stack/milestones/timeline/contributors → verbatim DB rows.
// - Health indicators → CALCULATED from those rows (labeled, formulas shown).
// - No AI estimates. No invented telemetry. GitHub-derived layers arrive in
//   Phase 3 (Code Intelligence) and are intentionally absent until they can
//   be real.
//
// Milestone workflow is live: contributors can create/complete/delete
// milestones (RBAC enforced server-side), and completions award verified XP
// through the existing ledger.

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/lib/store";
import { useT, useRelativeTime, useFormatDate } from "@/lib/i18n";
import { get, post, patch, del, ApiError } from "@/lib/api";
import { AVATAR_GRADIENTS } from "@/lib/constants";
import { groupStackLayers } from "@/lib/countries";
import type { DnaResponse, ProjectCard } from "@/lib/dto";
import {
  Dna as DnaIcon, Search, ArrowLeft, FolderKanban, Github, Globe, Rocket,
  Users, ListChecks, Flag, History, Activity, Calculator, Plus, Check,
  X, Trash2, Layers, CalendarClock, Lock, CircleAlert, ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TIMELINE_ICONS: Record<string, LucideIcon> = {
  PROJECT_CREATED: Rocket,
  MEMBER_JOINED: Users,
  UPDATE_POSTED: History,
  MILESTONE_CREATED: Flag,
  MILESTONE_COMPLETED: Check,
  TASK_COMPLETED: ListChecks,
};

const STATUS_TONES: Record<string, string> = {
  IDEA: "border-zinc-500/40 text-zinc-300",
  PLANNING: "border-amber-500/40 text-amber-300",
  IN_DEVELOPMENT: "border-amber-400/50 text-amber-200 bg-amber-400/10",
  BETA: "border-emerald-500/40 text-emerald-300",
  RELEASED: "border-emerald-400/60 text-emerald-200 bg-emerald-400/10",
  PAUSED: "border-orange-500/40 text-orange-300",
  ARCHIVED: "border-zinc-600/40 text-zinc-400",
};

const ROLE_TONES: Record<string, string> = {
  OWNER: "border-amber-400/50 text-amber-300 bg-amber-400/10",
  ADMIN: "border-amber-500/30 text-amber-200",
  CONTRIBUTOR: "border-zinc-500/40 text-zinc-300",
  VIEWER: "border-zinc-600/40 text-zinc-400",
};

function avatarClass(color: string): string {
  return AVATAR_GRADIENTS[color] ?? "from-amber-300 to-yellow-600";
}

function canContributeRole(role: string): boolean {
  return role === "OWNER" || role === "ADMIN" || role === "CONTRIBUTOR";
}

// ─── Architecture map (declared stack → layered diagram) ─────

const LAYER_META: Array<{ key: keyof ReturnType<typeof groupStackLayers>; icon: LucideIcon; labelKey: string }> = [
  { key: "frontend", icon: Globe, labelKey: "dna.layerFrontend" },
  { key: "backend", icon: Layers, labelKey: "dna.layerBackend" },
  { key: "data", icon: DnaIcon, labelKey: "dna.layerData" },
  { key: "tools", icon: Calculator, labelKey: "dna.layerTools" },
];

function ArchitectureMap({ layers, name }: { layers: DnaResponse["dna"]["stack"]["layers"]; name: string }) {
  const t = useT();
  const present = LAYER_META.filter((l) => layers[l.key].length > 0);
  const others = [...layers.other];

  if (present.length === 0 && others.length === 0) {
    return <p className="text-sm text-muted-foreground py-4">{t("dna.emptyStack")}</p>;
  }

  return (
    <div className="space-y-0" data-testid="dna-arch-map">
      {/* root node */}
      <div className="flex justify-center">
        <div className="rounded-xl border border-amber-400/50 bg-amber-400/10 px-5 py-2.5 text-center">
          <div className="text-sm font-bold text-amber-100 flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-amber-300" aria-hidden />
            {name}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{t("dna.archRootLabel")}</div>
        </div>
      </div>
      {/* connector */}
      <div className="flex justify-center py-1" aria-hidden>
        <div className="w-px h-4 bg-amber-500/30" />
      </div>
      <div className="border-t border-amber-500/20 mx-8" aria-hidden />
      <div className={`grid gap-3 pt-4 ${present.length === 1 ? "grid-cols-1" : present.length === 2 ? "grid-cols-1 sm:grid-cols-2" : present.length >= 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""}`}>
        {present.map((l) => (
          <div key={l.key} className="rounded-lg border border-amber-500/15 bg-black/50 p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-200/90">
              <l.icon className="h-3.5 w-3.5 text-amber-300" aria-hidden />
              {t(l.labelKey)}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {layers[l.key].map((tag) => (
                <span key={tag} className="rounded-md bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 text-[11px] text-amber-100/90">{tag}</span>
              ))}
            </div>
          </div>
        ))}
        {others.length > 0 && (
          <div className="rounded-lg border border-zinc-600/30 bg-black/50 p-3 space-y-2 sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <Layers className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
              {t("dna.layerOther")}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {others.map((tag) => (
                <span key={tag} className="rounded-md bg-zinc-500/10 border border-zinc-500/25 px-2 py-0.5 text-[11px] text-zinc-200">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DNA workspace ────────────────────────────────────────────

export function DnaView({ slug }: { slug?: string }) {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  if (!slug) return <DnaPicker />;
  return <DnaDossier slug={slug} onBack={() => navigate({ name: "dna" })} />;
}

function DnaPicker() {
  const t = useT();
  const relTime = useRelativeTime();
  const navigate = useApp((s) => s.navigate);
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<ProjectCard[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (query: string, pageNum: number) => {
    setLoading(true);
    try {
      const res = await get<{ projects: ProjectCard[]; total: number; page: number; pages: number }>(
        `/api/projects?sort=recent&page=${pageNum}${query ? `&q=${encodeURIComponent(query)}` : ""}`,
      );
      setRows(res.projects);
      setTotal(res.total);
      setPages(res.pages);
      setPage(res.page);
      setError(null);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "network");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => load(q, 1), 250);
    return () => clearTimeout(id);
  }, [q, load]);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground">
      <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center">
              <DnaIcon className="h-6 w-6 text-amber-300" aria-hidden />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-amber-50">{t("dna.title")}</h1>
              <p className="text-sm text-muted-foreground">{t("dna.subtitle")}</p>
            </div>
          </div>
        </header>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("dna.searchPlaceholder")}
            className="pl-9 bg-black/60 border-amber-500/20 focus-visible:ring-amber-400/40"
            aria-label={t("dna.searchPlaceholder")}
          />
        </div>

        {error && (
          <Card className="border-red-500/30 bg-red-500/5"><CardContent className="p-4 text-sm text-red-200">{t("dna.error")}</CardContent></Card>
        )}

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 bg-amber-500/5" />)}</div>
        ) : rows.length === 0 ? (
          <Card className="border-amber-500/15 bg-black/60">
            <CardContent className="p-8 text-center space-y-3">
              <p className="text-sm text-muted-foreground">{q ? t("dna.noResults") : t("dna.empty")}</p>
              <Button variant="outline" className="border-amber-400/40 text-amber-300" onClick={() => navigate({ name: "projectNew" })}>
                {t("dna.createFirst")}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <ul className="space-y-2">
              {rows.map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => navigate({ name: "dna", slug: p.slug })}
                    className="w-full rounded-xl border border-amber-500/15 bg-black/60 p-4 text-left transition-colors hover:border-amber-400/40 hover:bg-amber-400/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/60"
                    aria-label={t("dna.openAria", { name: p.name })}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-amber-100">{p.name}</div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{p.tagline}</p>
                        <div className="mt-1.5 text-[11px] text-muted-foreground flex items-center gap-2">
                          <span>@{p.owner.username}</span>
                          <span>·</span>
                          <span>{p.memberCount} {t("universe.membersShort")}</span>
                          <span>·</span>
                          <span>{t("dna.updated")} {relTime(p.updatedAt)}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-[10px] shrink-0 ${STATUS_TONES[p.status] ?? "border-zinc-500/40 text-zinc-300"}`}>
                        {t(`project.status.${p.status}`, { defaultValue: p.status }) || p.status}
                      </Badge>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {pages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => load(q, page - 1)}>{t("dna.prevPage")}</Button>
                <span className="text-xs text-muted-foreground">{t("dna.pageOf", { page, pages })} · {total}</span>
                <Button size="sm" variant="outline" disabled={page >= pages} onClick={() => load(q, page + 1)}>{t("dna.nextPage")}</Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function DnaDossier({ slug, onBack }: { slug: string; onBack: () => void }) {
  const t = useT();
  const relTime = useRelativeTime();
  const fmtDate = useFormatDate();
  const navigate = useApp((s) => s.navigate);

  const [data, setData] = useState<DnaResponse["dna"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await get<DnaResponse>(`/api/projects/${slug}/dna`);
      setData(res.dna);
      setError(null);
      setNotFound(false);
    } catch (e) {
      if (e instanceof ApiError && (e.status === 404 || e.status === 403)) setNotFound(true);
      else setError(e instanceof ApiError ? e.message : "network");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#050505] text-foreground">
        <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
          <Skeleton className="h-32 bg-amber-500/5" />
          <Skeleton className="h-48 bg-amber-500/5" />
          <Skeleton className="h-64 bg-amber-500/5" />
        </main>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#050505] text-foreground">
        <main className="mx-auto max-w-3xl px-4 py-16 text-center space-y-4">
          <CircleAlert className="h-10 w-10 text-amber-400 mx-auto" aria-hidden />
          <h1 className="text-xl font-bold text-amber-50">{t("dna.notFoundTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("dna.notFoundBody")}</p>
          <Button variant="outline" className="border-amber-400/40 text-amber-300" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" aria-hidden /> {t("dna.backToPicker")}
          </Button>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#050505] text-foreground">
        <main className="mx-auto max-w-3xl px-4 py-16 text-center space-y-4">
          <p className="text-sm text-red-300">{t("dna.error")}</p>
          <Button variant="outline" onClick={load}>{t("universe.retry")}</Button>
        </main>
      </div>
    );
  }

  const { identity, stack, milestones, timeline, contributors, health, viewerRole } = data;
  const editable = canContributeRole(viewerRole);
  const doneMilestones = milestones.filter((m) => m.completedAt).length;

  return (
    <div className="min-h-screen bg-[#050505] text-foreground">
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground gap-1.5 -ml-2">
          <ArrowLeft className="h-4 w-4" aria-hidden /> {t("dna.backToPicker")}
        </Button>

        {/* ── Identity header ───────────────────────────────── */}
        <Card className="border-amber-500/20 bg-gradient-to-b from-amber-400/10 via-black/60 to-black/60 overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-amber-50">{identity.name}</h1>
                  <Badge variant="outline" className={`text-[10px] ${STATUS_TONES[identity.status] ?? ""}`}>
                    {t(`project.status.${identity.status}`, { defaultValue: identity.status }) || identity.status}
                  </Badge>
                  {identity.visibility === "PRIVATE" && (
                    <Badge variant="outline" className="text-[10px] border-zinc-500/40 text-zinc-400 gap-1">
                      <Lock className="h-3 w-3" aria-hidden /> {t("dna.privateBadge")}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl">{identity.tagline}</p>
              </div>
              <Badge variant="outline" className="border-amber-400/30 text-amber-300 bg-amber-400/5 gap-1.5">
                <DnaIcon className="h-3 w-3" aria-hidden /> {t("dna.verifiedBadge")}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <button className="flex items-center gap-2 hover:text-amber-300" onClick={() => navigate({ name: "profile", username: identity.owner.username })}>
                <Avatar className="h-6 w-6 border border-amber-500/20">
                  <AvatarFallback className={`${avatarClass(identity.owner.avatarColor)} text-black text-[9px] font-bold`}>
                    {identity.owner.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>@{identity.owner.username}</span>
              </button>
              <span>{t(`project.categories.${identity.category}`, { defaultValue: identity.category }) || identity.category}</span>
              <span>{t("dna.created")} {fmtDate(identity.createdAt)}</span>
              <span>{t("dna.updated")} {relTime(identity.updatedAt)}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {identity.repositoryUrl && (
                <a href={identity.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/25 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-400/10">
                  <Github className="h-3.5 w-3.5" aria-hidden /> {t("dna.linkRepo")}
                </a>
              )}
              {identity.demoUrl && (
                <a href={identity.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/25 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-400/10">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden /> {t("dna.linkDemo")}
                </a>
              )}
              {identity.websiteUrl && (
                <a href={identity.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/25 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-400/10">
                  <Globe className="h-3.5 w-3.5" aria-hidden /> {t("dna.linkSite")}
                </a>
              )}
              <Button size="sm" variant="ghost" className="text-amber-300 gap-1.5" onClick={() => navigate({ name: "project", slug: identity.slug })}>
                <FolderKanban className="h-3.5 w-3.5" aria-hidden /> {t("dna.openWorkspace")}
              </Button>
            </div>

            <Separator className="bg-amber-500/10" />

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
              {[
                { label: t("dna.countMembers"), value: identity.counts.members, icon: Users },
                { label: t("dna.countLikes"), value: identity.counts.likes, icon: Check },
                { label: t("dna.countUpdates"), value: identity.counts.updates, icon: History },
                { label: t("dna.countTasks"), value: identity.counts.tasks, icon: ListChecks },
                { label: t("dna.countComments"), value: identity.counts.comments, icon: History },
                { label: t("dna.countRequests"), value: identity.counts.openRequests, icon: Users },
              ].map((c) => (
                <div key={c.label} className="rounded-lg bg-black/40 border border-amber-500/10 py-2">
                  <div className="text-base font-bold text-amber-100 tabular-nums">{c.value}</div>
                  <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                    <c.icon className="h-3 w-3" aria-hidden /> {c.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Architecture map ──────────────────────────────── */}
        <Card className="border-amber-500/15 bg-black/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-100/90 flex items-center justify-between">
              <span className="flex items-center gap-2"><Layers className="h-4 w-4 text-amber-300" aria-hidden />{t("dna.archTitle")}</span>
              <span className="text-[11px] font-normal text-muted-foreground">{t("dna.archDeclaredNote")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ArchitectureMap layers={stack.layers} name={identity.name} />
          </CardContent>
        </Card>

        {/* ── Health (calculated) ───────────────────────────── */}
        <Card className="border-amber-500/15 bg-black/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-100/90 flex items-center justify-between">
              <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-amber-300" aria-hidden />{t("dna.healthTitle")}</span>
              <Badge variant="outline" className="text-[10px] border-amber-400/30 text-amber-300 gap-1">
                <Calculator className="h-3 w-3" aria-hidden /> {t("dna.calculatedBadge")}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-xl border border-amber-500/15 bg-black/50 p-4 space-y-1.5">
                <div className="text-2xl font-bold text-amber-100 tabular-nums">
                  {health.taskCompletionRate === null ? "—" : `${Math.round(health.taskCompletionRate * 100)}%`}
                </div>
                <div className="text-[11px] text-muted-foreground">{t("dna.healthTaskRate")}</div>
                <div className="text-[10px] text-muted-foreground/70">{health.doneTasks}/{health.doneTasks + health.openTasks} · {t("dna.healthFormulaTasks")}</div>
              </div>
              <div className="rounded-xl border border-amber-500/15 bg-black/50 p-4 space-y-1.5">
                <div className="text-2xl font-bold text-amber-100 tabular-nums">{health.progressPercent === null ? "—" : `${health.progressPercent}%`}</div>
                <div className="text-[11px] text-muted-foreground">{t("dna.healthProgress")}</div>
                <div className="text-[10px] text-muted-foreground/70">{t("dna.healthFormulaMilestones")}</div>
              </div>
              <div className="rounded-xl border border-amber-500/15 bg-black/50 p-4 space-y-1.5">
                <div className="text-2xl font-bold text-amber-100 tabular-nums">{health.activity30d}</div>
                <div className="text-[11px] text-muted-foreground">{t("dna.healthActivity")}</div>
                <div className="text-[10px] text-muted-foreground/70">{t("dna.healthFormulaActivity")}</div>
              </div>
              <div className="rounded-xl border border-amber-500/15 bg-black/50 p-4 space-y-1.5">
                <div className="text-2xl font-bold text-amber-100 tabular-nums">{health.momentumPerDay === null ? "—" : health.momentumPerDay.toFixed(2)}</div>
                <div className="text-[11px] text-muted-foreground">{t("dna.healthMomentum")}</div>
                <div className="text-[10px] text-muted-foreground/70">{t("dna.healthFormulaMomentum")}</div>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground/70">
              {t("dna.healthDisclaimer")}
              {health.lastActivityAt ? ` ${t("dna.healthLastActivity")} ${relTime(health.lastActivityAt)}` : ""}
            </p>
          </CardContent>
        </Card>

        {/* ── Roadmap & milestones ──────────────────────────── */}
        <MilestonesCard
          slug={slug}
          milestones={milestones}
          editable={editable}
          onChanged={load}
          progressPercent={health.progressPercent}
        />

        {/* ── Timeline ──────────────────────────────────────── */}
        <Card className="border-amber-500/15 bg-black/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-100/90 flex items-center gap-2">
              <History className="h-4 w-4 text-amber-300" aria-hidden /> {t("dna.timelineTitle")}
              <span className="text-[11px] font-normal text-muted-foreground">{t("dna.timelineVerifiedNote")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {timeline.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("dna.emptyTimeline")}</p>
            ) : (
              <ScrollArea className="max-h-96">
                <ol className="relative border-l border-amber-500/25 ml-3 space-y-4 pr-2">
                  {timeline.map((ev) => {
                    const Icon = TIMELINE_ICONS[ev.kind] ?? History;
                    return (
                      <li key={ev.id} className="ml-4 relative">
                        <span className="absolute -left-[26px] top-1 h-4 w-4 rounded-full bg-black border border-amber-400/50 flex items-center justify-center" aria-hidden>
                          <Icon className="h-2.5 w-2.5 text-amber-300" />
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
                          <span className="text-amber-50/90 font-medium">{t(`dna.timelineKinds.${ev.kind}`)}</span>
                          <span className="text-amber-200/80 truncate max-w-[240px]">{ev.title}</span>
                          {ev.actor && <span className="text-[11px] text-muted-foreground">@{ev.actor}</span>}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{fmtDate(ev.at)} · {relTime(ev.at)}</div>
                      </li>
                    );
                  })}
                </ol>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* ── Contributors ──────────────────────────────────── */}
        <Card className="border-amber-500/15 bg-black/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-100/90 flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-300" aria-hidden /> {t("dna.contributorsTitle")}
              <span className="text-[11px] font-normal text-muted-foreground">{t("dna.contributorsNote")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {contributors.map((c) => (
                <div key={c.user.id} className="flex items-center gap-3 rounded-lg border border-amber-500/10 bg-black/40 p-3">
                  <Avatar className="h-9 w-9 border border-amber-500/20">
                    <AvatarFallback className={`${avatarClass(c.user.avatarColor)} text-black text-[11px] font-bold`}>
                      {c.user.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <button className="text-sm font-semibold text-amber-100 hover:underline text-left" onClick={() => navigate({ name: "profile", username: c.user.username })}>
                      {c.user.displayName}
                    </button>
                    <div className="text-[11px] text-muted-foreground">
                      {t("dna.joined")} {fmtDate(c.joinedAt)}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className={`text-[9px] ${ROLE_TONES[c.role] ?? ""}`}>{c.role}</Badge>
                    <div className="text-[10px] text-muted-foreground">{c.verifiedEvents} {t("dna.verifiedEvents")}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// ─── Milestones (live workflow) ───────────────────────────────

function MilestonesCard({
  slug,
  milestones,
  editable,
  onChanged,
  progressPercent,
}: {
  slug: string;
  milestones: DnaResponse["dna"]["milestones"];
  editable: boolean;
  onChanged: () => void;
  progressPercent: number | null;
}) {
  const t = useT();
  const fmtDate = useFormatDate();
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const create = async () => {
    if (!title.trim()) return;
    setBusy("create");
    setFormError(null);
    try {
      await post(`/api/projects/${slug}/milestones`, {
        title: title.trim(),
        ...(dueAt ? { dueAt: new Date(dueAt).toISOString() } : {}),
      });
      setTitle("");
      setDueAt("");
      setCreating(false);
      onChanged();
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const toggle = async (id: string, completed: boolean) => {
    setBusy(id);
    try {
      await patch(`/api/milestones/${id}`, { completed });
      onChanged();
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string) => {
    setBusy(id);
    try {
      await del(`/api/milestones/${id}`);
      onChanged();
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <Card className="border-amber-500/15 bg-black/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-amber-100/90 flex items-center justify-between">
          <span className="flex items-center gap-2"><Flag className="h-4 w-4 text-amber-300" aria-hidden />{t("dna.milestonesTitle")}</span>
          {editable && (
            <Button size="sm" variant="outline" className="border-amber-400/40 text-amber-300 gap-1" onClick={() => setCreating((v) => !v)}>
              <Plus className="h-3.5 w-3.5" aria-hidden /> {t("dna.milestoneAdd")}
            </Button>
          )}
        </CardTitle>
        {progressPercent !== null && (
          <div className="pt-2">
            <div className="h-1.5 rounded-full bg-amber-400/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">{t("dna.milestoneProgress", { percent: progressPercent, done: milestones.filter((m) => m.completedAt).length, total: milestones.length })}</div>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {formError && <p className="text-xs text-red-300">{formError}</p>}

        {creating && (
          <div className="rounded-lg border border-amber-500/25 bg-black/50 p-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="ms-title" className="text-xs text-amber-100/80">{t("dna.milestoneTitleLabel")}</Label>
              <Input id="ms-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} className="bg-black/60 border-amber-500/20" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ms-due" className="text-xs text-amber-100/80">{t("dna.milestoneDueLabel")}</Label>
              <Input id="ms-due" type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)} className="bg-black/60 border-amber-500/20 w-48" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={create} disabled={busy === "create" || !title.trim()} className="bg-amber-400 text-black hover:bg-amber-300">
                {busy === "create" ? "…" : t("dna.milestoneSave")}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setCreating(false); setFormError(null); }}>{t("dna.cancel")}</Button>
            </div>
          </div>
        )}

        {milestones.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("dna.emptyMilestones")}</p>
        ) : (
          <ul className="space-y-2">
            {milestones.map((m) => {
              const done = !!m.completedAt;
              const overdue = !done && m.dueAt && new Date(m.dueAt).getTime() < Date.now();
              return (
                <li key={m.id} className={`rounded-lg border p-3 flex items-start gap-3 ${done ? "border-emerald-500/25 bg-emerald-500/5" : "border-amber-500/15 bg-black/40"}`}>
                  {editable ? (
                    <button
                      onClick={() => toggle(m.id, !done)}
                      disabled={busy === m.id}
                      aria-label={done ? t("dna.milestoneUncompleteAria") : t("dna.milestoneCompleteAria")}
                      className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                        done ? "border-emerald-400/60 bg-emerald-400/20" : "border-amber-500/40 hover:bg-amber-400/10"
                      }`}
                    >
                      {done && <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden />}
                    </button>
                  ) : (
                    <span className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center ${done ? "border-emerald-400/60 bg-emerald-400/20" : "border-amber-500/30"}`} aria-hidden>
                      {done && <Check className="h-3.5 w-3.5 text-emerald-300" />}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-medium ${done ? "text-emerald-100/90 line-through decoration-emerald-500/40" : "text-amber-50/90"}`}>{m.title}</div>
                    {m.description && <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>}
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                      <span>@{m.creator.username}</span>
                      {m.dueAt && (
                        <span className={`inline-flex items-center gap-1 ${overdue ? "text-orange-300" : ""}`}>
                          <CalendarClock className="h-3 w-3" aria-hidden />
                          {fmtDate(m.dueAt)}{overdue ? ` · ${t("dna.overdue")}` : ""}
                        </span>
                      )}
                      {done && <span className="text-emerald-300">{t("dna.milestoneDone")} {fmtDate(m.completedAt!)}</span>}
                    </div>
                  </div>
                  {editable && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(m.id)}
                      disabled={busy === m.id}
                      className="h-7 w-7 text-muted-foreground hover:text-red-300 shrink-0"
                      aria-label={t("dna.milestoneDeleteAria")}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
