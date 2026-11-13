// TEKA NEXUS — MCP protocol engine for the NEXUS Knowledge Library.
//
// Implements the Model Context Protocol over streamable HTTP in STATELESS
// JSON mode (no sessions, no SSE): each POST carries one JSON-RPC message and
// gets one JSON-RPC response. This is a valid MCP transport mode and is what
// makes the server deployable on serverless (Vercel) with zero state.
//
// Tools (same semantics as mini-services/library-mcp):
//   search_nexus, get_reference, find_implementation, get_code_example,
//   find_related_patterns, check_compatibility
//
// Honesty contract carries over: statuses are real (verified = executed by
// the repo pipeline), and "no matches" is reported as no matches — never
// padded, never invented.
//
// The dispatch is transport-independent and fully unit-testable: tests feed
// JSON-RPC objects + an in-memory provider; the Next route only wires
// provider = the shared library core and HTTP in/out.

import type { CatalogDetail } from "@/lib/library-catalog";
import type { CoreItem, DetailResult, ListParams, ListResult } from "@/lib/library-core";

export type LibraryProvider = {
  list(params: ListParams): Promise<ListResult>;
  detail(slug: string): Promise<DetailResult>;
};

export const MCP_SERVER_INFO = { name: "teka-nexus-library", version: "1.1.0" } as const;

/** Protocol versions this server understands (MCP spec revisions). */
const KNOWN_PROTOCOL_VERSIONS = ["2024-11-05", "2025-03-26", "2025-06-18"] as const;
const DEFAULT_PROTOCOL_VERSION = "2025-03-26";

type JsonSchemaProp = {
  type: string;
  description?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
};

type ToolDef = {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, JsonSchemaProp>;
    required?: string[];
  };
};

const LANGUAGE_ENUM = ["typescript", "javascript", "python", "sql", "bash"];
const CATEGORY_ENUM = ["frontend", "backend", "fullstack", "ai", "api", "database", "security", "devops", "performance", "patterns", "i18n", "web3"];

const TOOLS: ToolDef[] = [
  {
    name: "search_nexus",
    description:
      "Search the TEKA NEXUS Knowledge Library for reusable technical implementations. Natural-language queries work (English and several languages incl. Persian) via curated concept expansion. Returns slug, title, category, status (verified/draft) and summary — request get_reference for the full entry.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Free text, e.g. 'rate limiter', 'ssrf guard', 'password hashing', 'اگر سرویس قطع شد نباید برنامه بیفتد'" },
        category: { type: "string", enum: CATEGORY_ENUM },
        language: { type: "string", enum: LANGUAGE_ENUM },
        difficulty: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
        status: { type: "string", enum: ["draft", "under_review", "verified", "deprecated"] },
        limit: { type: "integer", minimum: 1, maximum: 50, description: "Default 20" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_reference",
    description:
      "Fetch ONE full library entry by slug: problem, approach, complete source code, security/performance notes, limitations, version, license, verification evidence.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Entry slug, e.g. 'ssrf-safe-url-guard'" } },
      required: ["slug"],
    },
  },
  {
    name: "find_implementation",
    description:
      "Find a tested implementation for a concrete engineering problem (e.g. 'prevent SSRF', 'rotate api keys', 'پرداخت قطع میشود برنامه نباید بیفتد'). Verified entries rank first; if nothing matches, the response says so honestly.",
    inputSchema: {
      type: "object",
      properties: {
        problem: { type: "string", minLength: 3, description: "The engineering problem in plain words" },
        language: { type: "string", enum: LANGUAGE_ENUM },
      },
      required: ["problem"],
    },
  },
  {
    name: "get_code_example",
    description: "Get ONLY the source code of an entry (ready to paste), plus its language and install instructions.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "find_related_patterns",
    description: "Given an entry slug, return its related library entries (resolved and verified-status-aware).",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "check_compatibility",
    description:
      "Advisory compatibility metadata for an entry: language, framework, dependencies, limitations and version. This is honest metadata — it does NOT promise your project will build.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string" },
        yourFramework: { type: "string", description: "e.g. 'next', 'none' — informational comparison only" },
      },
      required: ["slug"],
    },
  },
];

// ── JSON-RPC helpers ─────────────────────────────────────────────────────────

export type RpcOutcome = { httpStatus: number; body: unknown | null };

const rpcError = (id: unknown, code: number, message: string, data?: unknown): RpcOutcome => ({
  httpStatus: 200,
  body: { jsonrpc: "2.0", id, error: { code, message, ...(data !== undefined ? { data } : {}) } },
});

const rpcResult = (id: unknown, result: unknown): RpcOutcome => ({
  httpStatus: 200,
  body: { jsonrpc: "2.0", id, result },
});

// ── Tool execution ───────────────────────────────────────────────────────────

type ToolArgs = Record<string, unknown>;

const asStr = (v: unknown): string => (typeof v === "string" ? v : "");
const asInt = (v: unknown, fallback: number): number => (typeof v === "number" && Number.isFinite(v) ? Math.trunc(v) : fallback);

function textPayload(value: unknown, isError = false) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
    ...(isError ? { isError: true } : {}),
  };
}

async function callTool(name: string, args: ToolArgs, provider: LibraryProvider): Promise<RpcOutcome> {
  const tool = TOOLS.find((t) => t.name === name);
  if (!tool) {
    return rpcError(
      null, // replaced by caller with the real id
      -32602,
      `Unknown tool: ${name}`,
      { available: TOOLS.map((t) => t.name) },
    );
  }

  let payload: unknown;
  try {
    switch (name) {
      case "search_nexus": {
        const q = asStr(args.query).trim().slice(0, 120);
        if (!q) return rpcResult(null, textPayload({ ok: false, error: { code: "invalid_params", message: "query must be a non-empty string" } }, true));
        const result = await provider.list({
          q,
          category: asStr(args.category),
          language: asStr(args.language),
          framework: "",
          difficulty: asStr(args.difficulty),
          status: asStr(args.status),
          limit: Math.min(Math.max(asInt(args.limit, 20), 1), 50),
          offset: 0,
        });
        payload = {
          ok: true,
          results: result.page,
          meta: { source: result.source, total: result.total, search: result.search },
          note: "statuses are honest: 'verified' entries were executed by the repo's verification pipeline; 'draft' entries are not machine-verified.",
        };
        break;
      }
      case "get_reference": {
        const d = await provider.detail(asStr(args.slug));
        payload = d
          ? d.data
          : { ok: false, error: { code: "not_found", message: `no library entry with slug: ${asStr(args.slug)}` } };
        break;
      }
      case "find_implementation": {
        const problem = asStr(args.problem).trim();
        if (problem.length < 3) {
          return rpcResult(null, textPayload({ ok: false, error: { code: "invalid_params", message: "problem must be at least 3 characters" } }, true));
        }
        const result = await provider.list({
          q: problem.slice(0, 120),
          category: "", language: asStr(args.language), framework: "",
          difficulty: "", status: "", limit: 10, offset: 0,
        });
        payload = {
          ok: true,
          matches: result.page.map((h: CoreItem) => ({ slug: h.slug, title: h.title, status: h.status, summary: h.summary })),
          honestNote: result.page.length
            ? "Statuses included: only 'verified' entries passed automated execution. Next: get_reference(slug) for the full implementation."
            : "No matching implementation exists in the library yet — do not assume coverage.",
        };
        break;
      }
      case "get_code_example": {
        const d = await provider.detail(asStr(args.slug));
        payload = d
          ? { slug: d.data.slug, language: d.data.language, install: d.data.install, code: d.data.code, status: d.data.status }
          : { ok: false, error: { code: "not_found", message: `no library entry with slug: ${asStr(args.slug)}` } };
        break;
      }
      case "find_related_patterns": {
        const d = await provider.detail(asStr(args.slug));
        payload = d ? { ok: true, slug: d.data.slug, related: d.data.related } : { ok: false, error: { code: "not_found", message: `no library entry with slug: ${asStr(args.slug)}` } };
        break;
      }
      case "check_compatibility": {
        const d: DetailResult = await provider.detail(asStr(args.slug));
        const e = d?.data as CatalogDetail | undefined;
        payload = e
          ? {
              ok: true,
              slug: e.slug,
              language: e.language,
              framework: e.framework,
              version: e.version,
              dependencies: e.dependencies,
              limitations: e.limitations,
              advisory:
                "Compatibility is informational: compare language/framework/dependencies against your project yourself. The library does not install or build code on your behalf.",
            }
          : { ok: false, error: { code: "not_found", message: `no library entry with slug: ${asStr(args.slug)}` } };
        break;
      }
      default:
        return rpcError(null, -32602, `Unknown tool: ${name}`);
    }
  } catch (err) {
    // Tool execution failure = a tool RESULT with isError, not a protocol error.
    payload = {
      ok: false,
      error: { code: "internal", message: "library data layer failed — try again shortly" },
    };
    console.error(`[mcp-library] tool ${name} failed:`, err);
  }

  const isError = !!payload && typeof payload === "object" && (payload as { ok?: unknown }).ok === false;
  return rpcResult(null, textPayload(payload, isError));
}

// ── Dispatch ─────────────────────────────────────────────────────────────────

/**
 * Handle one JSON-RPC message. Returns the HTTP status + body to send
 * (body === null means "accepted, no response body" — HTTP 202 for
 * notifications in stateless mode).
 */
export async function handleMcpRpc(message: unknown, provider: LibraryProvider): Promise<RpcOutcome> {
  if (Array.isArray(message)) {
    return {
      httpStatus: 400,
      body: {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32600,
          message: "Batch requests are not supported by this stateless server — send one JSON-RPC message per POST.",
        },
      },
    };
  }
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return { httpStatus: 400, body: { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid Request: expected a JSON-RPC 2.0 object" } } };
  }

  const msg = message as { jsonrpc?: unknown; method?: unknown; id?: unknown; params?: unknown };
  if (msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return { httpStatus: 400, body: { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid Request: jsonrpc must be \"2.0\" and method must be a string" } } };
  }

  // Notifications (no id) get no response body — HTTP 202 Accepted.
  const isNotification = msg.id === undefined || msg.id === null;
  if (isNotification || msg.method.startsWith("notifications/")) {
    return { httpStatus: 202, body: null };
  }

  switch (msg.method) {
    case "initialize": {
      const requested = typeof (msg.params as { protocolVersion?: unknown } | null)?.protocolVersion === "string"
        ? (msg.params as { protocolVersion: string }).protocolVersion
        : "";
      const protocolVersion = (KNOWN_PROTOCOL_VERSIONS as readonly string[]).includes(requested)
        ? requested
        : DEFAULT_PROTOCOL_VERSION;
      return rpcResult(msg.id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: MCP_SERVER_INFO,
        instructions:
          "TEKA NEXUS Knowledge Library: verified, reusable technical implementations. search_nexus → get_reference → get_code_example. Statuses are honest: only 'verified' entries were executed by the pipeline.",
      });
    }
    case "ping":
      return rpcResult(msg.id, {});
    case "tools/list":
      return rpcResult(msg.id, { tools: TOOLS });
    case "tools/call": {
      const params = (msg.params ?? {}) as { name?: unknown; arguments?: unknown };
      const name = typeof params.name === "string" ? params.name : "";
      const args = (params.arguments ?? {}) as ToolArgs;
      if (!TOOLS.some((t) => t.name === name)) {
        return rpcError(msg.id, -32602, `Unknown tool: ${name}`, { available: TOOLS.map((t) => t.name) });
      }
      const outcome = await callTool(name, args, provider);
      if (outcome.body && typeof outcome.body === "object" && "result" in (outcome.body as Record<string, unknown>)) {
        return rpcResult(msg.id, (outcome.body as { result: unknown }).result);
      }
      return { ...outcome, body: { ...(outcome.body as object), id: msg.id } };
    }
    default:
      return rpcError(msg.id, -32601, `Method not found: ${msg.method}`);
  }
}
