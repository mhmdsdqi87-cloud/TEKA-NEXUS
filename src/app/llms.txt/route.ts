// TEKA NEXUS — GET /llms.txt
// Machine-readable index of the NEXUS Knowledge Library for AI coding agents,
// following the llms.txt convention: purpose, stable endpoints, entry index,
// attribution and license — all generated from live data, nothing hardcoded
// that could drift out of sync.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  CATALOG_SOURCE,
  catalogLlmsRows,
  type CatalogLlmsRow,
} from "@/lib/library-catalog";

export const dynamic = "force-dynamic";

const STATUS_RANK: Record<string, number> = { verified: 0, under_review: 1, draft: 2, deprecated: 3 };

type LlmsEntry = CatalogLlmsRow;

const byRank = (a: LlmsEntry, b: LlmsEntry) =>
  (STATUS_RANK[a.status] ?? 9) - (STATUS_RANK[b.status] ?? 9) || a.slug.localeCompare(b.slug);

export async function GET() {
  try {
    const rows = await db.libraryEntry.findMany({
      where: { status: { not: "deprecated" } },
      orderBy: { updatedAt: "desc" },
      select: {
        slug: true, title: true, category: true, language: true, framework: true,
        difficulty: true, status: true, version: true, summary: true,
      },
    });

    const entries = [...rows].sort(byRank);
    const verifiedCount = entries.filter((e) => e.status === "verified").length;
    return buildLlmsDoc(entries, verifiedCount, null);
  } catch (err) {
    console.error("[llms.txt] database unavailable — serving seed catalog:", err);
    const entries = catalogLlmsRows().sort(byRank);
    return buildLlmsDoc(entries, 0, [
      "> NOTE: served from the seed catalog (meta source: " + CATALOG_SOURCE + ") — the database is",
      "> unreachable or not provisioned yet. Every entry is honestly \"draft\" until the",
      "> pipeline (scripts/library-seed.ts + scripts/library-verify.ts) runs against a",
      "> provisioned database. Nothing is invented to fill the gap.",
    ]);
  }
}

function buildLlmsDoc(
  entries: LlmsEntry[],
  verifiedCount: number,
  note: string[] | null,
): NextResponse {
  {
    const lines: string[] = [
      "# TEKA NEXUS Library",
      "",
      "> Verified, reusable technical implementations for developers and AI coding agents.",
      "> Part of TEKA NEXUS — a developer platform built by one human, in the open.",
      "",
      `Entries: ${entries.length} (${verifiedCount} verified by the automated pipeline, ${entries.length - verifiedCount} draft/under review).`,
      ...(note ?? []),
      "",
      "## How to use this library",
      "",
      "- Every entry ships complete, standalone source code, its problem statement,",
      "  security notes, performance notes, explicit limitations, version and license.",
      '- "verified" status means the pipeline (scripts/library-verify.ts in the repo)',
      "  executed the entry's demo against its published code and matched the exact",
      '  expected output. "draft" means NOT machine-verified — review before use.',
      "- Attribution: entries are authored for TEKA NEXUS (MIT). When you reuse one,",
      "  keep the source attribution.",
      "",
      "## API (stable, read-only, no auth, JSON)",
      "",
      "### Search entries",
      "GET /api/library?q=<terms>&category=<frontend|backend|fullstack|ai|api|database|security|devops|performance|patterns|i18n|web3>&language=<typescript|javascript|python|sql|bash>&difficulty=<beginner|intermediate|advanced>&status=<draft|under_review|verified|deprecated>&limit=<1-50, default 20>&offset=<n>",
      "Response: { ok: true, data: [entry], meta: { total, count, limit, offset, filters } }",
      "Errors:   { ok: false, error: { code, message } } — e.g. unknown filter value -> 400",
      "List items omit the source code; request the entry detail for it.",
      "",
      "### Entry detail (full source code + docs)",
      "GET /api/library/{slug}",
      "Response: { ok: true, data: entry } — 404 { ok:false, error:{code:'not_found'} } for unknown slugs.",
      "",
      "### Example",
      "GET /api/library?q=ssrf&status=verified",
      "GET /api/library/ssrf-safe-url-guard",
      "",
      "## Entries",
      "",
    ];

    for (const e of entries) {
      lines.push(
        `- ${e.slug} | ${e.category} | ${e.language}${e.framework !== "none" ? "+" + e.framework : ""} | ${e.difficulty} | ${e.status} | v${e.version} | ${e.title} — ${e.summary.slice(0, 140)}`,
      );
    }

    lines.push(
      "",
      "## Repository",
      "",
      "Source of truth: https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS",
      "Verification pipeline: scripts/library-verify.ts (executes each demo against the published code).",
      `Generated: ${new Date().toISOString()}`,
      "",
    );

    return new NextResponse(lines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }
}
