// TEKA NEXUS — GET /api/github/community  (Task 13: GitHub Command Center)
// Every public community project that has connected a GitHub repository,
// plus compact live repo stats (stars/forks/language/pushedAt) fetched with
// the same token-aware, cached strategy as /api/github/repo — but batched:
// one request powers the whole hub grid.

import { db } from "@/lib/db";
import { ok, handle } from "@/lib/server";

export const dynamic = "force-dynamic";

const MAX_PROJECTS = 12;
const MAX_REPO_FETCH = 6;
const REPO_TTL_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;

const repoCache = new Map<string, { at: number; data: RepoMini | { ok: false } }>();

type RepoMini = {
  ok: true;
  fullName: string;
  htmlUrl: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  pushedAt: string;
};

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

async function fetchRepoMini(repositoryUrl: string): Promise<RepoMini | { ok: false }> {
  const parsed = parseRepoUrl(repositoryUrl);
  if (!parsed) return { ok: false };
  const key = `${parsed.owner}/${parsed.repo}`.toLowerCase();

  const hit = repoCache.get(key);
  if (hit && Date.now() - hit.at < REPO_TTL_MS) return hit.data;

  try {
    const res = await ghFetch(`/repos/${parsed.owner}/${parsed.repo}`);
    if (!res.ok) {
      const data = { ok: false } as const;
      repoCache.set(key, { at: Date.now(), data });
      return data;
    }
    const r = (await res.json()) as {
      full_name: string;
      html_url: string;
      stargazers_count: number;
      forks_count: number;
      open_issues_count: number;
      language: string | null;
      pushed_at: string;
    };
    const data: RepoMini = {
      ok: true,
      fullName: r.full_name,
      htmlUrl: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      openIssues: r.open_issues_count,
      language: r.language,
      pushedAt: r.pushed_at,
    };
    repoCache.set(key, { at: Date.now(), data });
    return data;
  } catch {
    return { ok: false };
  }
}

export async function GET() {
  return handle(async () => {
    const projects = await db.project.findMany({
      where: { visibility: "PUBLIC", repositoryUrl: { not: "" } },
      orderBy: { updatedAt: "desc" },
      take: MAX_PROJECTS,
      select: {
        name: true,
        slug: true,
        repositoryUrl: true,
        coverImage: true,
        updatedAt: true,
        owner: { select: { displayName: true, username: true } },
        _count: { select: { members: true, likes: true } },
      },
    });

    const withRepo = projects.filter((p) => parseRepoUrl(p.repositoryUrl));
    const minis = await Promise.all(withRepo.slice(0, MAX_REPO_FETCH).map((p) => fetchRepoMini(p.repositoryUrl)));

    const repos: Record<string, RepoMini | { ok: false }> = {};
    withRepo.forEach((p, i) => {
      repos[p.slug] = minis[i];
    });

    return ok({
      projects: projects.map((p) => ({
        name: p.name,
        slug: p.slug,
        repositoryUrl: p.repositoryUrl,
        coverImage: p.coverImage,
        owner: p.owner.displayName,
        likeCount: p._count.likes,
        memberCount: p._count.members,
        updatedAt: p.updatedAt.toISOString(),
      })),
      repos,
    });
  });
}
