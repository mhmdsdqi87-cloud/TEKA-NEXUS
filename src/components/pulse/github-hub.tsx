"use client";

// TEKA NEXUS — GitHub Command Center (Task 13).
// Two zones: (1) the platform's own open-source repo with live commits,
// (2) a grid of every community project that connected a GitHub repo, with
// batched live stats from /api/github/community. Degrades quietly.

import { useEffect, useState } from "react";
import { ExternalLink, GitBranch, GitCommitHorizontal, GitFork, Star } from "lucide-react";

import { get } from "@/lib/api";
import { useT, useRelativeTime } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PLATFORM_REPO_URL } from "@/lib/constants";
import { useApp } from "@/lib/store";
import { GithubPanel } from "@/components/project/github-panel";
import { ProjectCover } from "@/components/shared/atoms";

type CommunityResponse = {
  projects: {
    name: string;
    slug: string;
    repositoryUrl: string;
    coverImage: string;
    owner: string;
    likeCount: number;
    memberCount: number;
    updatedAt: string;
  }[];
  repos: Record<
    string,
    | {
        ok: true;
        fullName: string;
        htmlUrl: string;
        stars: number;
        forks: number;
        openIssues: number;
        language: string | null;
        pushedAt: string;
      }
    | { ok: false }
  >;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00ADD8",
  Shell: "#89e051",
  Java: "#b07219",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  PHP: "#4F5D95",
  C: "#555555",
};

export function GithubHub({ className }: { className?: string }) {
  const t = useT();
  const rel = useRelativeTime();
  const navigate = useApp((s) => s.navigate);

  const [data, setData] = useState<CommunityResponse | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await get<CommunityResponse>("/api/github/community");
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

  return (
    <section aria-label={t("pulse.hub.title")} className={cn("space-y-4", className)}>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <GitBranch className="h-4 w-4 text-violet-300" aria-hidden="true" />
        <h3 className="font-display text-lg font-bold tracking-tight">{t("pulse.hub.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("pulse.hub.subtitle")}</p>
      </header>

      {/* platform repo — full featured panel */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          {t("pulse.hub.platformRepo")} — <span className="text-muted-foreground/80">{t("pulse.hub.platformRepoDesc")}</span>
        </p>
        <GithubPanel repositoryUrl={PLATFORM_REPO_URL} />
      </div>

      {/* community repos */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">{t("pulse.hub.communityRepos")}</p>

        {state === "loading" ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-white/[0.04]" />
            ))}
          </div>
        ) : state === "error" ? (
          <p className="rounded-xl border border-rose-400/25 bg-rose-500/[0.06] p-4 text-center text-sm text-rose-200/90">
            {t("pulse.github.loadError")}
          </p>
        ) : !data || data.projects.length === 0 ? (
          <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center text-sm text-muted-foreground">
            {t("pulse.hub.communityReposEmpty")}
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((p) => {
              const repo = data.repos[p.slug];
              return (
                <li key={p.slug}>
                  <div className="glass-card group flex h-full flex-col rounded-xl p-3 transition hover:border-violet-400/30">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => navigate({ name: "project", slug: p.slug })}
                        className="focus-glow flex min-w-0 flex-1 items-center gap-2.5 rounded-lg"
                        aria-label={p.name}
                      >
                        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/[0.08]">
                          <ProjectCover cover={p.coverImage} name={p.name} seed={p.slug.length} />
                        </span>
                        <span className="min-w-0 text-start">
                          <span className="block truncate text-sm font-semibold text-foreground group-hover:text-violet-200">
                            {p.name}
                          </span>
                          <span className="block truncate text-[11px] text-muted-foreground" dir="ltr">
                            {repo?.ok
                              ? repo.fullName
                              : p.repositoryUrl.replace(/^https?:\/\/(www\.)?github\.com\//i, "")}
                          </span>
                        </span>
                      </button>
                      {repo?.ok && (
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={t("pulse.github.openRepo")}
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground focus-glow"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    {repo?.ok && (
                      <div
                        className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground"
                        dir="ltr"
                      >
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-300" aria-hidden="true" /> {repo.stars}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3 w-3 text-cyan-300" aria-hidden="true" /> {repo.forks}
                        </span>
                        {repo.language && (
                          <span className="inline-flex items-center gap-1">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#8b8b8b" }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="ms-auto inline-flex items-center gap-1">
                          <GitCommitHorizontal className="h-3 w-3" aria-hidden="true" /> {rel(repo.pushedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
