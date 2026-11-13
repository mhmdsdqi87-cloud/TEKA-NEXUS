// TEKA NEXUS — read-only catalog fallback for the NEXUS Knowledge Library.
//
// The Library's source of truth is the database (LibraryEntry), seeded by
// scripts/library-seed.ts. If the database is unreachable, or not yet
// provisioned on a fresh deployment (e.g. the LibraryEntry table has not been
// pushed to the production Postgres yet), these helpers serve the SAME
// entries straight from the seed file so builders always get the catalog
// instead of a 500.
//
// Honesty rules (identical to the DB contract):
// - Catalog entries are labeled status "draft": the seed file carries no
//   verification evidence, and only scripts/library-verify.ts — executed
//   against a provisioned database — can promote an entry to "verified".
// - verifiedAt / verifier are null.
// - Responses declare meta.source = "catalog" so callers know exactly which
//   path served them. Nothing invented, nothing hidden.

import { LIBRARY_ENTRIES, type LibraryEntrySeed } from "../../scripts/library-entries";

export const CATALOG_SOURCE = "catalog";

// Date the seed catalog was authored and merged (git history, PR #22).
export const CATALOG_UPDATED_AT = "2026-11-13T09:55:46Z";

// Same attribution the seeder writes — entries are authored FOR this
// repository, never copied from third parties.
const SOURCE_AUTHOR = "TEKA NEXUS";
const SOURCE_URL = "https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS";

export type CatalogRelatedRef = {
  slug: string;
  title: string;
  status: string;
  category: string;
  language: string;
};

export type CatalogListItem = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  language: string;
  framework: string;
  difficulty: string;
  status: string;
  verifiedAt: string | null;
  version: string;
  license: string;
  sourceAuthor: string;
  tags: string[];
  related: string[];
  updatedAt: string;
};

export type CatalogDetail = Omit<CatalogListItem, "related"> & {
  problem: string;
  approach: string;
  code: string;
  dependencies: string[];
  install: string;
  usage: string;
  securityNotes: string;
  performanceNotes: string;
  limitations: string;
  sourceUrl: string;
  verifier: string | null;
  related: CatalogRelatedRef[];
};

export type CatalogLlmsRow = {
  slug: string;
  title: string;
  category: string;
  language: string;
  framework: string;
  difficulty: string;
  status: string;
  version: string;
  summary: string;
};

export function catalogListItems(): CatalogListItem[] {
  return LIBRARY_ENTRIES.map((e) => ({
    slug: e.slug,
    title: e.title,
    category: e.category,
    summary: e.summary,
    language: e.language,
    framework: e.framework,
    difficulty: e.difficulty,
    status: "draft",
    verifiedAt: null,
    version: e.version,
    license: e.license,
    sourceAuthor: SOURCE_AUTHOR,
    tags: [...e.tags],
    related: [...e.related],
    updatedAt: CATALOG_UPDATED_AT,
  }));
}

export function catalogDetail(slug: string): CatalogDetail | null {
  const e = LIBRARY_ENTRIES.find((x) => x.slug === slug);
  if (!e) return null;
  const bySlug = new Map(LIBRARY_ENTRIES.map((x) => [x.slug, x]));
  const related: CatalogRelatedRef[] = e.related
    .map((s) => bySlug.get(s))
    .filter((x): x is LibraryEntrySeed => Boolean(x))
    .map((x) => ({
      slug: x.slug,
      title: x.title,
      status: "draft",
      category: x.category,
      language: x.language,
    }));
  return {
    slug: e.slug,
    title: e.title,
    category: e.category,
    summary: e.summary,
    language: e.language,
    framework: e.framework,
    difficulty: e.difficulty,
    status: "draft",
    problem: e.problem,
    approach: e.approach,
    code: e.code,
    dependencies: [...e.dependencies],
    install: e.install,
    usage: e.usage,
    securityNotes: e.securityNotes,
    performanceNotes: e.performanceNotes,
    limitations: e.limitations,
    version: e.version,
    license: e.license,
    sourceAuthor: SOURCE_AUTHOR,
    sourceUrl: SOURCE_URL,
    tags: [...e.tags],
    verifiedAt: null,
    verifier: null,
    related,
    updatedAt: CATALOG_UPDATED_AT,
  };
}

export function catalogLlmsRows(): CatalogLlmsRow[] {
  return LIBRARY_ENTRIES.map((e) => ({
    slug: e.slug,
    title: e.title,
    category: e.category,
    language: e.language,
    framework: e.framework,
    difficulty: e.difficulty,
    status: "draft",
    version: e.version,
    summary: e.summary,
  }));
}

// Same keyword scoring weights as the database path in /api/library:
// title contains 10, title word-prefix 6, tags 5, summary 3, code 1.
export function scoreCatalogEntry(
  e: { title: string; tags: string[]; summary: string; code?: string },
  needle: string,
): number {
  let s = 0;
  if (e.title.toLowerCase().includes(needle)) s += 10;
  if (e.title.toLowerCase().split(/\s+/).some((w) => w.startsWith(needle))) s += 6;
  if (e.tags.join(" ").toLowerCase().includes(needle)) s += 5;
  if (e.summary.toLowerCase().includes(needle)) s += 3;
  if (e.code && e.code.toLowerCase().includes(needle)) s += 1;
  return s;
}
