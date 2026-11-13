// TEKA NEXUS — shared core for the NEXUS Knowledge Library.
//
// Single implementation of list/search/detail used by BOTH public entry
// points: the REST API (src/app/api/library/**) and the MCP endpoint
// (src/app/api/mcp). Behaviors are byte-compatible with the pre-core REST
// contract:
// - The database is the source of truth; if it is unreachable or not yet
//   provisioned, the seed catalog (src/lib/library-catalog.ts) is served with
//   identical shapes and semantics, and meta.source tells callers which path
//   served them.
// - Catalog entries are honest drafts (no verification evidence); only the
//   verify pipeline can promote entries to "verified".
// - Search is deterministic keyword + curated concept scoring
//   (src/lib/library-search.ts). Zero matches are reported as zero.

import { db } from "@/lib/db";

import {
  CATALOG_SOURCE,
  catalogDetail,
  catalogListItems,
  type CatalogDetail,
  type CatalogListItem,
} from "@/lib/library-catalog";
import { expandQuery, rankByQuery, SEMANTIC_MAP_VERSION } from "@/lib/library-search";

export type CoreItem = CatalogListItem;

export type ListParams = {
  q: string;
  category: string;
  language: string;
  framework: string;
  difficulty: string;
  status: string;
  limit: number;
  offset: number;
};

export type SearchMeta = {
  q: string;
  concepts: string[];
  mapVersion: string;
  note: string;
};

export type ListResult = {
  /** The sliced page for this request. */
  page: CoreItem[];
  /** Size of the full result set (post-scoring when searching). */
  total: number;
  source: "database" | typeof CATALOG_SOURCE;
  note?: string;
  search?: SearchMeta;
};

const STATUS_RANK: Record<string, number> = { verified: 0, under_review: 1, draft: 2, deprecated: 3 };
const DB_SCAN_CAP = 500;

function parseJsonArray(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function sortList<T extends { status: string; updatedAt: string; title: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) =>
      (STATUS_RANK[a.status] ?? 9) - (STATUS_RANK[b.status] ?? 9) ||
      b.updatedAt.localeCompare(a.updatedAt) ||
      a.title.localeCompare(b.title),
  );
}

function searchMetaFor(q: string): SearchMeta {
  const { concepts } = expandQuery(q);
  return {
    q,
    concepts,
    mapVersion: SEMANTIC_MAP_VERSION,
    note: "keyword scoring + curated multilingual concept expansion (semantic-lite, no embeddings); zero matches are reported honestly",
  };
}

export async function listLibraryEntries(params: ListParams): Promise<ListResult> {
  const { q, limit, offset } = params;
  try {
    const where: Record<string, unknown> = {};
    if (params.category) where.category = params.category;
    if (params.language) where.language = params.language;
    if (params.framework) where.framework = params.framework;
    if (params.difficulty) where.difficulty = params.difficulty;
    if (params.status) where.status = params.status;
    else where.status = { not: "deprecated" }; // deprecated entries are opt-in only

    const [total, rows] = await Promise.all([
      db.libraryEntry.count({ where }),
      db.libraryEntry.findMany({
        where,
        select: {
          slug: true, title: true, category: true, summary: true, language: true,
          framework: true, difficulty: true, status: true, version: true, license: true,
          sourceAuthor: true, tags: true, related: true, verifiedAt: true, updatedAt: true,
          code: !!q, // code needed only for scoring when searching
        },
        take: DB_SCAN_CAP,
      }),
    ]);

    const items: CoreItem[] = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category,
      summary: r.summary,
      language: r.language,
      framework: r.framework,
      difficulty: r.difficulty,
      status: r.status,
      verifiedAt: r.verifiedAt?.toISOString() ?? null,
      version: r.version,
      license: r.license,
      sourceAuthor: r.sourceAuthor,
      tags: parseJsonArray(r.tags),
      related: parseJsonArray(r.related),
      updatedAt: r.updatedAt.toISOString(),
    }));

    let ranked: CoreItem[];
    let resultTotal: number;
    if (q) {
      ranked = rankByQuery(items, q).map(({ item }) => item);
      resultTotal = ranked.slice(offset, offset + limit).length; // same contract as before
    } else {
      ranked = sortList(items);
      resultTotal = total;
    }

    return {
      page: ranked.slice(offset, offset + limit),
      total: resultTotal,
      source: "database",
      search: q ? searchMetaFor(q) : undefined,
    };
  } catch (err) {
    console.error("[library-core] database unavailable — serving seed catalog:", err);
    return listCatalogEntries(params);
  }
}

/**
 * Catalog-only listing with identical search/sort semantics. Public because
 * it is the deterministic data source for tests (MCP dispatch, search) and
 * the fallback path of listLibraryEntries.
 */
export function listCatalogEntries(params: ListParams): ListResult {
  const { q, limit, offset } = params;
  let items: CoreItem[] = catalogListItems();
  if (params.status) items = items.filter((e) => e.status === params.status); // catalog entries are all "draft"
  if (params.category) items = items.filter((e) => e.category === params.category);
  if (params.language) items = items.filter((e) => e.language === params.language);
  if (params.framework) items = items.filter((e) => e.framework === params.framework);
  if (params.difficulty) items = items.filter((e) => e.difficulty === params.difficulty);

  let ranked: CoreItem[];
  let resultTotal: number;
  if (q) {
    ranked = rankByQuery(items, q).map(({ item }) => item);
    resultTotal = ranked.slice(offset, offset + limit).length;
  } else {
    ranked = sortList(items);
    resultTotal = ranked.length;
  }

  return {
    page: ranked.slice(offset, offset + limit),
    total: resultTotal,
    source: CATALOG_SOURCE,
    note:
      "Served from the seed catalog — the database is unreachable or not provisioned yet. Statuses are honest drafts; run scripts/library-seed.ts and scripts/library-verify.ts against your DATABASE_URL to enable the full pipeline.",
    search: q ? searchMetaFor(q) : undefined,
  };
}

export type DetailResult = { data: CatalogDetail; source: "database" | typeof CATALOG_SOURCE } | null;

/** Full entry with resolved related refs. null = not found (404 upstream). */
export async function getLibraryEntryDetail(slug: string): Promise<DetailResult> {
  const key = slug.toLowerCase();
  try {
    // no include — LibraryEntry has no relations; related is resolved manually below
    const row = await db.libraryEntry.findUnique({ where: { slug: key } });
    if (!row) return null; // DB is up and the entry simply does not exist — no catalog fallback here

    const relatedSlugs = parseJsonArray(row.related);
    const relatedRows = relatedSlugs.length
      ? await db.libraryEntry.findMany({
          where: { slug: { in: relatedSlugs } },
          select: { slug: true, title: true, status: true, category: true, language: true },
        })
      : [];

    return {
      source: "database",
      data: {
        slug: row.slug,
        title: row.title,
        category: row.category,
        summary: row.summary,
        language: row.language,
        framework: row.framework,
        difficulty: row.difficulty,
        status: row.status,
        problem: row.problem,
        approach: row.approach,
        code: row.code,
        dependencies: parseJsonArray(row.dependencies),
        install: row.install,
        usage: row.usage,
        securityNotes: row.securityNotes,
        performanceNotes: row.performanceNotes,
        limitations: row.limitations,
        version: row.version,
        license: row.license,
        sourceAuthor: row.sourceAuthor,
        sourceUrl: row.sourceUrl,
        tags: parseJsonArray(row.tags),
        verifiedAt: row.verifiedAt?.toISOString() ?? null,
        verifier: row.verifier || null,
        related: relatedRows,
        updatedAt: row.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error("[library-core] database unavailable — serving seed catalog detail:", err);
    const catalog = catalogDetail(key);
    if (!catalog) return null;
    return { data: catalog, source: CATALOG_SOURCE };
  }
}
