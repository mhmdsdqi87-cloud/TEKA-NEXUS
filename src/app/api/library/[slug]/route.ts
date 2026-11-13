// TEKA NEXUS — GET /api/library/[slug]
// Full reference entry: complete source code, docs, security notes, limits,
// verification evidence and resolved related entries. Public + read-only.

import { NextRequest, NextResponse } from "next/server";

import { getLibraryEntryDetail } from "@/lib/library-core";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const result = await getLibraryEntryDetail(slug);
  if (!result) {
    return NextResponse.json(
      { ok: false, error: { code: "not_found", message: `No library entry with slug: ${slug}` } },
      { status: 404 },
    );
  }
  return NextResponse.json(
    {
      ok: true,
      data: result.data,
      // catalog path declares its source; the database path is the default truth
      ...(result.source === "catalog" ? { meta: { source: result.source } } : {}),
    },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
  );
}
