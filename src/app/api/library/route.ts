// TEKA NEXUS — GET /api/library
// Public, read-only Knowledge Library API for developers and AI coding agents.
//
// Contract (stable): every response is one of
//   { ok: true,  data: Entry[], meta: {...} }
//   { ok: false, error: { code, message } }
// List responses omit the full source code — fetch /api/library/{slug} for it.
// Search = deterministic keyword scoring + curated multilingual concept
// expansion (semantic-lite, see src/lib/library-search.ts). Matched concepts
// are reported in meta.search.concepts. This endpoint never fabricates
// results and reports zero hits honestly.

import { NextRequest, NextResponse } from "next/server";

import { listLibraryEntries } from "@/lib/library-core";

export const dynamic = "force-dynamic";

const CATEGORIES = new Set([
  "frontend", "backend", "fullstack", "ai", "api", "database",
  "security", "devops", "performance", "patterns", "i18n", "web3",
]);
const LANGUAGES = new Set(["typescript", "javascript", "python", "sql", "bash"]);
const DIFFICULTIES = new Set(["beginner", "intermediate", "advanced"]);
const STATUSES = new Set(["draft", "under_review", "verified", "deprecated"]);

const LIMIT_MAX = 50;

function jsonError(code: string, message: string, status: number) {
  return NextResponse.json({ ok: false, error: { code, message } }, { status });
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q = (sp.get("q") ?? "").trim().slice(0, 120);
  const category = sp.get("category") ?? "";
  const language = sp.get("language") ?? "";
  const framework = sp.get("framework") ?? "";
  const difficulty = sp.get("difficulty") ?? "";
  const status = sp.get("status") ?? "";
  const limit = Math.min(Math.max(Number(sp.get("limit")) || 20, 1), LIMIT_MAX);
  const offset = Math.max(0, Number(sp.get("offset")) || 0);

  const filters: Record<string, string> = {};

  if (category) {
    if (!CATEGORIES.has(category)) return jsonError("bad_request", `unknown category: ${category}`, 400);
    filters.category = category;
  }
  if (language) {
    if (!LANGUAGES.has(language)) return jsonError("bad_request", `unknown language: ${language}`, 400);
    filters.language = language;
  }
  if (framework) filters.framework = framework;
  if (difficulty) {
    if (!DIFFICULTIES.has(difficulty)) return jsonError("bad_request", `unknown difficulty: ${difficulty}`, 400);
    filters.difficulty = difficulty;
  }
  if (status) {
    if (!STATUSES.has(status)) return jsonError("bad_request", `unknown status: ${status}`, 400);
    filters.status = status;
  }

  const result = await listLibraryEntries({ q, category, language, framework, difficulty, status, limit, offset });

  return NextResponse.json(
    {
      ok: true,
      data: result.page,
      meta: {
        total: result.total,
        count: result.page.length,
        limit,
        offset,
        filters,
        source: result.source,
        ...(result.note ? { note: result.note } : {}),
        ...(result.search ? { search: result.search } : {}),
      },
    },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
  );
}
