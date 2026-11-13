// TEKA NEXUS — GET /api/library/[slug]
// Full reference entry: complete source code, docs, security notes, limits,
// verification evidence and resolved related entries. Public + read-only.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CATALOG_SOURCE, catalogDetail } from "@/lib/library-catalog";

export const dynamic = "force-dynamic";

function jsonError(code: string, message: string, status: number) {
  return NextResponse.json({ ok: false, error: { code, message } }, { status });
}

function parseJsonArray(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  try {
    // no include — LibraryEntry has no relations; related is resolved manually below
    const row = await db.libraryEntry.findUnique({
      where: { slug: slug.toLowerCase() },
    });
    if (!row) {
      return jsonError("not_found", `No library entry with slug: ${slug}`, 404);
    }

    const relatedSlugs = parseJsonArray(row.related);
    const relatedRows = relatedSlugs.length
      ? await db.libraryEntry.findMany({
          where: { slug: { in: relatedSlugs } },
          select: { slug: true, title: true, status: true, category: true, language: true },
        })
      : [];

    return NextResponse.json(
      {
        ok: true,
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
      },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
    );
  } catch (err) {
    console.error("[api/library/slug] database unavailable — serving seed catalog:", err);
    const catalog = catalogDetail(slug.toLowerCase());
    if (!catalog) {
      return jsonError("not_found", `No library entry with slug: ${slug}`, 404);
    }
    return NextResponse.json(
      { ok: true, data: catalog, meta: { source: CATALOG_SOURCE } },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
    );
  }
}
