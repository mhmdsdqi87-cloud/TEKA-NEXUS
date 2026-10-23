// TEKA NEXUS — GET /api/github/repo?url=https://github.com/{owner}/{repo}
// Live GitHub repository intelligence for project pages: stars, forks,
// issues, language + the 5 latest commits. Public GitHub API (no token),
// in-memory cache (10 min success / 5 min negative) so the 60 req/hour
// anonymous budget is never exhausted by page views.

import type { NextRequest } from "next/server";
import { ok, handle, HttpError } from "@/lib/server";
import { displayCommitAuthor, avatarForAuthor } from "@/lib/github-authors";

export const dynamic = "force-dynamic";

const SUCCESS_TTL_MS = 10 * 60 * 1000;
const NEGATIVE_TTL_MS = 5 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;

type Cached = { at: number; payload: unknown };
const cache = new Map<string, Cached>();

function parseRepoUrl(raw: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(raw);
    if (url.hostname !== "github.com" && url.hostname !== "www.github.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/i, "");
    if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}

async function ghFetch(path: string): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  // Optional GITHUB_TOKEN raises the rate limit 60 → 5000 req/h. The token
  // stays server-side (env only, never shipped to the client); anonymous
  // requests remain the fallback when it is not configured.
  const token = process.env.GITHUB_TOKEN;
  try {
    return await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "TEKA-NEXUS/2.6 (+https://teka-nexus.vercel.app)",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: ctrl.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

type GhRepo = {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  language: string | null;
  pushed_at: string;
  topics?: string[];
  owner: { avatar_url: string; login: string };
};

type GhCommit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { name: string; date: string } };
  author: { avatar_url: string; login: string } | null;
};

export async function GET(req: NextRequest) {
  return handle(async () => {
    const raw = req.nextUrl.searchParams.get("url") ?? "";
    const parsed = parseRepoUrl(raw);
    if (!parsed) throw new HttpError("Invalid GitHub repository URL.", 400);
    const { owner, repo } = parsed;
    const key = `${owner}/${repo}`.toLowerCase();

    const hit = cache.get(key);
    if (hit) {
      const ttl = (hit.payload as { ok?: boolean }).ok ? SUCCESS_TTL_MS : NEGATIVE_TTL_MS;
      if (Date.now() - hit.at < ttl) return ok(hit.payload);
      cache.delete(key);
    }

    try {
      const [repoRes, commitRes] = await Promise.all([
        ghFetch(`/repos/${owner}/${repo}`),
        ghFetch(`/repos/${owner}/${repo}/commits?per_page=5`).catch(() => null),
      ]);

      if (repoRes.status === 404) {
        const payload = { ok: false as const, error: "not_found" };
        cache.set(key, { at: Date.now(), payload });
        return ok(payload);
      }
      if (repoRes.status === 403 || repoRes.status === 429) {
        // rate-limited: serve stale cache if any, else a soft-unavailable
        const payload = { ok: false as const, error: "rate_limited" };
        return ok(payload);
      }
      if (!repoRes.ok) {
        const payload = { ok: false as const, error: "github_error" };
        return ok(payload);
      }

      const r = (await repoRes.json()) as GhRepo;
      let commits: GhCommit[] = [];
      if (commitRes && commitRes.ok) {
        commits = (await commitRes.json()) as GhCommit[];
      }

      const payload = {
        ok: true as const,
        repo: {
          fullName: r.full_name,
          htmlUrl: r.html_url,
          description: r.description ?? "",
          stars: r.stargazers_count,
          forks: r.forks_count,
          watchers: r.watchers_count,
          openIssues: r.open_issues_count,
          language: r.language,
          pushedAt: r.pushed_at,
          topics: (r.topics ?? []).slice(0, 6),
          ownerAvatar: r.owner?.avatar_url ?? "",
          ownerLogin: r.owner?.login ?? owner,
        },
        commits: commits.map((c) => {
          const rawAuthor = c.commit.author?.name ?? c.author?.login ?? "unknown";
          return {
            sha: c.sha.slice(0, 7),
            url: c.html_url,
            message: (c.commit.message || "").split("\n")[0].slice(0, 110),
            // Legacy "Z User" CI commits belong to mohammad — normalize here so
            // every surface (Live hub, project panels) shows the real builder.
            author: displayCommitAuthor(rawAuthor),
            avatar: avatarForAuthor(rawAuthor, c.author?.avatar_url ?? ""),
            date: c.commit.author?.date ?? new Date().toISOString(),
          };
        }),
        fetchedAt: new Date().toISOString(),
      };
      cache.set(key, { at: Date.now(), payload });
      return ok(payload);
    } catch {
      const payload = { ok: false as const, error: "network" };
      return ok(payload);
    }
  });
}
