// TEKA NEXUS — POST /api/mcp
// Production MCP endpoint (streamable HTTP, stateless JSON mode) for the
// NEXUS Knowledge Library. Deployed inside the app itself — no side-car
// service needed on Vercel. Tools are served from the shared library core
// (database first, seed catalog fallback, same contract as /api/library).
//
// Client configuration (e.g. Cursor, Claude, any MCP HTTP client):
//   POST https://teka-nexus.vercel.app/api/mcp
// Only POST is supported: no SSE stream, no sessions. See docs/NEXUS-LIBRARY.md.

import { NextRequest, NextResponse } from "next/server";

import { getLibraryEntryDetail, listLibraryEntries } from "@/lib/library-core";
import { handleMcpRpc, type LibraryProvider } from "@/lib/mcp-library-server";

export const dynamic = "force-dynamic";

const provider: LibraryProvider = {
  list: (params) => listLibraryEntries(params),
  detail: (slug) => getLibraryEntryDetail(slug),
};

const JSON_PARSE_ERROR = {
  jsonrpc: "2.0",
  id: null,
  error: { code: -32700, message: "Parse error: body must be one JSON-RPC 2.0 message" },
};

function mcpHeaders(preFlight = false): HeadersInit {
  const h: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
  };
  if (preFlight) {
    h["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type, MCP-Protocol-Version, MCP-Session-Id, Authorization";
    h["Access-Control-Max-Age"] = "86400";
  }
  return h;
}

export async function POST(req: NextRequest) {
  let message: unknown;
  try {
    message = await req.json();
  } catch {
    return NextResponse.json(JSON_PARSE_ERROR, { status: 400, headers: mcpHeaders() });
  }
  const outcome = await handleMcpRpc(message, provider);
  if (outcome.body === null) return new NextResponse(null, { status: outcome.httpStatus, headers: mcpHeaders() });
  return NextResponse.json(outcome.body, { status: outcome.httpStatus, headers: mcpHeaders() });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "method_not_allowed",
        message: "This MCP server is stateless JSON mode: send JSON-RPC 2.0 messages via POST /api/mcp (no SSE, no sessions).",
      },
    },
    { status: 405, headers: { ...mcpHeaders(), Allow: "POST, OPTIONS" } },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: mcpHeaders(true) });
}
