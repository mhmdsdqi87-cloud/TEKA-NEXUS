"use client";

// TEKA NEXUS — Workspace Hub (Task 15).
// A dedicated, always-in-reach section that gathers every workspace the user
// can build in — own projects and team projects alike — plus the files the
// team touched most recently, with one-click jumps straight into the editor.
// Everything carries the TEKA watermark, of course.

import * as React from "react";
import {
  ArrowUpRight,
  Clock3,
  Files,
  FolderGit2,
  FolderTree,
  History,
  Lock,
  Plus,
  SquareTerminal,
  Users,
} from "lucide-react";

import { get } from "@/lib/api";
import { useT, useRelativeTime } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { formatBytes, langMeta } from "@/lib/workspace";
import { TekaWatermark } from "@/components/shared/teka-watermark";
import { ProjectCover } from "@/components/shared/atoms";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type HubProject = {
  slug: string;
  name: string;
  tagline: string;
  coverImage: string;
  bgImage: string;
  visibility: string;
  role: string;
  owner: { username: string; displayName: string; avatarColor: string; avatarUrl: string | null };
  memberCount: number;
  fileCount: number;
  lastFileAt: string | null;
};

type HubRecentFile = {
  id: string;
  name: string;
  folder: string;
  language: string;
  size: number;
  updatedAt: string;
  projectSlug: string;
  projectName: string;
};

type HubResponse = {
  projects: HubProject[];
  recentFiles: HubRecentFile[];
  stats: { projects: number; files: number; revisions: number };
};

function StatChip({ icon: Icon, value, label, tone }: { icon: typeof Files; value: number; label: string; tone: string }) {
  return (
    <div className="glass-card flex items-center gap-3 rounded-xl px-4 py-3">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${tone}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-lg font-bold leading-none tabular-nums">{value}</span>
        <span className="block truncate text-[11px] text-muted-foreground">{label}</span>
      </span>
    </div>
  );
}

export function WorkspaceHubView() {
  const t = useT();
  const rel = useRelativeTime();
  const navigate = useApp((s) => s.navigate);

  const [data, setData] = React.useState<HubResponse | null>(null);
  const [state, setState] = React.useState<"loading" | "ready" | "error">("loading");

  React.useEffect(() => {
    let alive = true;
    // Fetch-on-mount: the hub mirrors the viewer's own memberships.
    (async () => {
      try {
        const res = await get<HubResponse>("/api/workspace/hub");
        if (!alive) return;
        setData(res);
        setState("ready");
      } catch {
        if (alive) setState("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const openWorkspace = (slug: string, fileId?: string) =>
    navigate({ name: "project", slug, tab: "workspace", fileId });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-4 md:px-6 md:pt-6">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <FadeIn>
        <section
          aria-label={t("workspace.hub.title")}
          className="glass-card relative overflow-hidden rounded-2xl p-5 md:p-7"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_20%_0%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(50%_100%_at_90%_10%,rgba(167,139,250,0.10),transparent_60%)]"
          />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-cyan-400/25">
                  <SquareTerminal className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                </span>
                <div>
                  <h1 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {t("workspace.hub.title")}
                  </h1>
                  <p className="text-sm text-muted-foreground">{t("workspace.hub.subtitle")}</p>
                </div>
              </div>
            </div>
            <Button onClick={() => navigate({ name: "projectNew" })} className="btn-hero min-h-[44px]">
              <Plus className="h-4 w-4" aria-hidden="true" />
              {t("nav.newProject")}
            </Button>
          </div>

          {/* stats */}
          <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatChip icon={FolderGit2} value={data?.stats.projects ?? 0} label={t("workspace.hub.stats.projects")} tone="bg-cyan-500/15 text-cyan-300" />
            <StatChip icon={Files} value={data?.stats.files ?? 0} label={t("workspace.hub.stats.files")} tone="bg-violet-500/15 text-violet-300" />
            <StatChip icon={History} value={data?.stats.revisions ?? 0} label={t("workspace.hub.stats.revisions")} tone="bg-emerald-500/15 text-emerald-300" />
          </div>

          <TekaWatermark />
        </section>
      </FadeIn>

      {/* ─── Content ──────────────────────────────────────────── */}
      {state === "loading" ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-5" aria-busy="true">
          <div className="space-y-3 lg:col-span-3">
            <Skeleton className="h-5 w-40" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
          <div className="space-y-3 lg:col-span-2">
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </div>
      ) : state === "error" ? (
        <p className="mt-6 rounded-xl border border-rose-400/25 bg-rose-500/[0.06] p-4 text-center text-sm text-rose-200/90">
          {t("workspace.hub.loadError")}
        </p>
      ) : !data ? null : (
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          {/* My workspaces */}
          <section aria-label={t("workspace.hub.myWorkspaces")} className="lg:col-span-3">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <FolderTree className="h-4 w-4 text-cyan-300" aria-hidden="true" />
              {t("workspace.hub.myWorkspaces")}
            </h2>

            {data.projects.length === 0 ? (
              <div className="glass-card relative overflow-hidden rounded-xl p-6 text-center">
                <FolderGit2 className="mx-auto h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium">{t("workspace.hub.emptyProjects")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("workspace.hub.emptyProjectsHint")}</p>
                <Button onClick={() => navigate({ name: "projectNew" })} className="btn-hero mt-4 min-h-[44px]">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  {t("nav.newProject")}
                </Button>
                <TekaWatermark />
              </div>
            ) : (
              <Stagger className="grid gap-3 sm:grid-cols-2" aria-busy="false">
                {data.projects.map((p) => (
                  <StaggerItem key={p.slug}>
                    <div className="glass-card group relative flex h-full flex-col overflow-hidden rounded-xl p-4 transition hover:border-cyan-400/30">
                      <button
                        onClick={() => openWorkspace(p.slug)}
                        className="focus-glow flex items-start gap-3 rounded-lg text-start"
                        aria-label={`${t("workspace.hub.openWorkspace")} — ${p.name}`}
                      >
                        <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/[0.08]">
                          <ProjectCover cover={p.coverImage} name={p.name} seed={p.slug.length} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate text-sm font-semibold text-foreground group-hover:text-cyan-200">
                              {p.name}
                            </span>
                            {p.visibility === "PRIVATE" && (
                              <Lock className="h-3 w-3 shrink-0 text-muted-foreground" aria-label={t("workspace.hub.private")} />
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                            {p.tagline || `@${p.owner.username}`}
                          </span>
                          <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Files className="h-3 w-3 text-violet-300" aria-hidden="true" />
                              {t("workspace.hub.fileCount", { count: p.fileCount })}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3 w-3 text-cyan-300" aria-hidden="true" />
                              {p.memberCount}
                            </span>
                            {p.lastFileAt && (
                              <span className="inline-flex items-center gap-1" title={rel(p.lastFileAt)}>
                                <Clock3 className="h-3 w-3" aria-hidden="true" />
                                {rel(p.lastFileAt)}
                              </span>
                            )}
                          </span>
                        </span>
                      </button>
                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
                        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {p.role}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openWorkspace(p.slug)}
                          className="min-h-[36px] gap-1.5 px-3 text-xs"
                        >
                          <SquareTerminal className="h-3.5 w-3.5" aria-hidden="true" />
                          {t("workspace.hub.openWorkspace")}
                        </Button>
                      </div>
                      <TekaWatermark />
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </section>

          {/* Recent files */}
          <section aria-label={t("workspace.hub.recentFiles")} className="lg:col-span-2">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Clock3 className="h-4 w-4 text-violet-300" aria-hidden="true" />
              {t("workspace.hub.recentFiles")}
            </h2>

            {data.recentFiles.length === 0 ? (
              <p className="glass-card rounded-xl p-4 text-center text-sm text-muted-foreground">
                {t("workspace.hub.recentEmpty")}
              </p>
            ) : (
              <Stagger className="space-y-2">
                {data.recentFiles.map((f) => {
                  const lang = langMeta(f.language);
                  return (
                    <StaggerItem key={f.id}>
                      <button
                        onClick={() => openWorkspace(f.projectSlug, f.id)}
                        className="glass-card focus-glow group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition hover:border-violet-400/30"
                        aria-label={`${f.name} — ${f.projectName}`}
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: lang.color }}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-foreground group-hover:text-violet-200">
                            {f.name}
                          </span>
                          <span className="block truncate font-mono text-[10px] text-muted-foreground" dir="ltr">
                            {f.folder === "/" ? "" : f.folder}/{f.name} · {formatBytes(f.size)}
                          </span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-0.5">
                          <span className="max-w-24 truncate rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {f.projectName}
                          </span>
                          <span className="text-[10px] text-muted-foreground/70">{rel(f.updatedAt)}</span>
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition group-hover:text-violet-300" aria-hidden="true" />
                      </button>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/70">
              <SquareTerminal className="h-3 w-3" aria-hidden="true" />
              {t("workspace.hub.footerHint")}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
