"use client";

// TEKA NEXUS — GitHub repository panel (Live Pulse, Task pulse-1).
// Live repo intelligence on the project overview: stars/forks/issues/
// language + the 5 latest commits, sourced from /api/github/repo with a
// 10-minute server cache. Degrades quietly when GitHub is unreachable.

import { useEffect, useState } from "react";
import { CircleDot, ExternalLink, GitBranch, GitCommitHorizontal, GitFork, Star } from "lucide-react";

import { get } from "@/lib/api";
import { useT, useRelativeTime } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type RepoResponse = {
  ok: boolean;
  error?: string;
  repo?: {
    fullName: string;
    htmlUrl: string;
    description: string;
    stars: number;
    forks: number;
    watchers: number;
    openIssues: number;
    language: string | null;
    pushedAt: string;
    topics: string[];
    ownerAvatar: string;
    ownerLogin: string;
  };
  commits?: { sha: string; url: string; message: string; author: string; avatar: string; date: string }[];
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
  "C++": "#f34b7d",
  C: "#555555",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

function fmt(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function GithubPanel({ repositoryUrl, className }: { repositoryUrl: string; className?: string }) {
  const t = useT();
  const rel = useRelativeTime();
  const [data, setData] = useState<RepoResponse | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "quiet">("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await get<RepoResponse>(`/api/github/repo?url=${encodeURIComponent(repositoryUrl)}`);
        if (!alive) return;
        setData(res);
        setState("ready");
      } catch {
        if (alive) setState("quiet");
      }
    })();
    return () => {
      alive = false;
    };
  }, [repositoryUrl]);

  if (state === "quiet") return null; // existing sidebar link already covers it

  return (
    <section aria-label={t("pulse.github.title")} className={cn("glass-card rounded-2xl p-5", className)}>
      <header className="mb-3 flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-violet-300" aria-hidden="true" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("pulse.github.title")}
        </h3>
        {state === "ready" && data?.ok && (
          <span className="mr-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300" dir="ltr">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t("pulse.github.live")}
          </span>
        )}
      </header>

      {state === "loading" ? (
        <div className="space-y-3" aria-busy="true">
          <div className="h-5 w-1/2 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-12 animate-pulse rounded-lg bg-white/[0.04]" />
          <div className="h-20 animate-pulse rounded-lg bg-white/[0.04]" />
        </div>
      ) : !data?.ok || !data.repo ? (
        <p className="text-xs text-muted-foreground" dir="ltr">
          {data?.error === "not_found" ? t("pulse.github.notFound") : t("pulse.github.loadError")}
        </p>
      ) : (
        <>
          <a
            href={data.repo.htmlUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-glow group flex items-center gap-2 rounded-lg"
            dir="ltr"
          >
            {data.repo.ownerAvatar && (
              <img src={data.repo.ownerAvatar} alt="" className="h-7 w-7 rounded-full border border-white/10" loading="lazy" />
            )}
            <span className="truncate text-sm font-bold text-foreground group-hover:text-violet-300">{data.repo.fullName}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </a>

          {data.repo.description && (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground" dir="ltr">
              {data.repo.description}
            </p>
          )}

          <dl className="mt-3 grid grid-cols-3 gap-2 text-center" dir="ltr">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-1 py-2">
              <dt className="sr-only">stars</dt>
              <dd className="flex items-center justify-center gap-1 text-[13px] font-bold">
                <Star className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" /> {fmt(data.repo.stars)}
              </dd>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-1 py-2">
              <dt className="sr-only">forks</dt>
              <dd className="flex items-center justify-center gap-1 text-[13px] font-bold">
                <GitFork className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" /> {fmt(data.repo.forks)}
              </dd>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-1 py-2">
              <dt className="sr-only">issues</dt>
              <dd className="flex items-center justify-center gap-1 text-[13px] font-bold">
                <CircleDot className="h-3.5 w-3.5 text-rose-300" aria-hidden="true" /> {fmt(data.repo.openIssues)}
              </dd>
            </div>
          </dl>

          {data.repo.language && (
            <p className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground" dir="ltr">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LANG_COLORS[data.repo.language] ?? "#8b8b8b" }} />
              {data.repo.language}
            </p>
          )}

          {data.commits && data.commits.length > 0 && (
            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t("pulse.github.commits")}
              </h4>
              <ul className="space-y-2">
                {data.commits.map((c) => (
                  <li key={c.sha}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="focus-glow flex items-start gap-2 rounded-lg p-1.5 transition hover:bg-white/[0.04]"
                      dir="ltr"
                    >
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt=""
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-white/10"
                          loading="lazy"
                        />
                      ) : (
                        <GitCommitHorizontal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-foreground/90">{c.message}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {c.author} · {rel(c.date)}
                        </span>
                      </span>
                      <code className="shrink-0 rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[10px] text-violet-300">{c.sha}</code>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
