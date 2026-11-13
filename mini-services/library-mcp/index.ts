#!/usr/bin/env bun
// TEKA NEXUS — NEXUS Library MCP server.
//
// Exposes the Knowledge Library to AI coding agents over the Model Context
// Protocol (streamable HTTP transport, official @modelcontextprotocol/sdk).
// Runs as a standalone mini-service; all data comes from the public Library
// API (LIBRARY_API_URL, default http://localhost:3000/api/library) so this
// server holds no database of its own and works against any deployment.
//
//   Tools: search_nexus, get_reference, find_implementation,
//          get_code_example, find_related_patterns, check_compatibility
//   Endpoint: http://localhost:3040/mcp
//
// Nothing here is aspirational: every tool is exercised by test-client.ts.

import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const PORT = Number(process.env.PORT ?? 3040);
const API = process.env.LIBRARY_API_URL ?? "http://localhost:3000/api/library";

interface ListResponse {
  ok: boolean;
  data?: Record<string, unknown>[];
  meta?: Record<string, unknown>;
  error?: { code: string; message: string };
}
interface DetailResponse {
  ok: boolean;
  data?: Record<string, unknown>;
  error?: { code: string; message: string };
}

async function apiFetch(path: string): Promise<unknown> {
  const res = await fetch(API.replace(/\/$/, "") + path, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok && res.status !== 404) throw new Error(`library API returned ${res.status}`);
  return res.json();
}

const text = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });

function registerTools(server: McpServer) {
  server.tool(
    "search_nexus",
    "Search the TEKA NEXUS Knowledge Library for reusable technical implementations. Returns slug, title, category, status (verified/draft) and summary — request get_reference for the full entry.",
    {
      query: z.string().min(1).describe("Free-text query, e.g. 'rate limiter', 'ssrf guard', 'password hashing'"),
      category: z
        .enum(["frontend", "backend", "fullstack", "ai", "api", "database", "security", "devops", "performance", "patterns", "i18n", "web3"])
        .optional(),
      language: z.enum(["typescript", "javascript", "python", "sql", "bash"]).optional(),
      difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
      status: z.enum(["draft", "under_review", "verified", "deprecated"]).optional(),
      limit: z.number().int().min(1).max(50).optional().describe("Default 20"),
    },
    async ({ query, category, language, difficulty, status, limit }) => {
      const sp = new URLSearchParams({ q: query, limit: String(limit ?? 20) });
      if (category) sp.set("category", category);
      if (language) sp.set("language", language);
      if (difficulty) sp.set("difficulty", difficulty);
      if (status) sp.set("status", status);
      const d = (await apiFetch("?" + sp.toString())) as ListResponse;
      if (!d.ok) return text({ ok: false, error: d.error ?? { code: "internal", message: "search failed" } });
      return text({
        ok: true,
        results: d.data,
        meta: d.meta,
        note: "statuses are honest: 'verified' entries were executed by the repo's verification pipeline; 'draft' entries are not machine-verified.",
      });
    },
  );

  server.tool(
    "get_reference",
    "Fetch ONE full library entry by slug: problem, approach, complete source code, security/performance notes, limitations, version, license, verification evidence.",
    { slug: z.string().min(1).describe("Entry slug, e.g. 'ssrf-safe-url-guard'") },
    async ({ slug }) => {
      const d = (await apiFetch("/" + encodeURIComponent(slug))) as DetailResponse;
      if (!d.ok) return text({ ok: false, error: d.error ?? { code: "not_found", message: "no such entry" } });
      return text(d.data);
    },
  );

  server.tool(
    "find_implementation",
    "Find a tested implementation for a concrete engineering problem (e.g. 'prevent SSRF', 'rotate api keys'). Verified entries rank first; if nothing matches, the response says so honestly.",
    { problem: z.string().min(3).describe("The engineering problem in plain words"), language: z.enum(["typescript", "javascript", "python", "sql", "bash"]).optional() },
    async ({ problem, language }) => {
      const sp = new URLSearchParams({ q: problem, limit: String(10) });
      if (language) sp.set("language", language);
      const d = (await apiFetch("?" + sp.toString())) as ListResponse;
      if (!d.ok) return text({ ok: false, error: d.error ?? { code: "internal", message: "search failed" } });
      const hits = d.data ?? [];
      return text({
        ok: true,
        matches: hits.map((h) => ({
          slug: h.slug,
          title: h.title,
          status: h.status,
          summary: h.summary,
        })),
        honestNote: hits.length
          ? "Statuses included: only 'verified' entries passed automated execution. Next: get_reference(slug) for the full implementation."
          : "No matching implementation exists in the library yet — do not assume coverage.",
      });
    },
  );

  server.tool(
    "get_code_example",
    "Get ONLY the source code of an entry (ready to paste), plus its language and install instructions.",
    { slug: z.string().min(1) },
    async ({ slug }) => {
      const d = (await apiFetch("/" + encodeURIComponent(slug))) as DetailResponse;
      if (!d.ok) return text({ ok: false, error: d.error ?? { code: "not_found", message: "no such entry" } });
      const e = d.data!;
      return text({ slug: e.slug, language: e.language, install: e.install, code: e.code, status: e.status });
    },
  );

  server.tool(
    "find_related_patterns",
    "Given an entry slug, return its related library entries (resolved and verified-status-aware).",
    { slug: z.string().min(1) },
    async ({ slug }) => {
      const d = (await apiFetch("/" + encodeURIComponent(slug))) as DetailResponse;
      if (!d.ok) return text({ ok: false, error: d.error ?? { code: "not_found", message: "no such entry" } });
      return text({ ok: true, slug, related: d.data!.related });
    },
  );

  server.tool(
    "check_compatibility",
    "Advisory compatibility metadata for an entry: language, framework, dependencies, limitations and version. This is honest metadata — it does NOT promise your project will build.",
    {
      slug: z.string().min(1),
      yourFramework: z.string().optional().describe("e.g. 'next', 'none' — informational comparison only"),
    },
    async ({ slug }) => {
      const d = (await apiFetch("/" + encodeURIComponent(slug))) as DetailResponse;
      if (!d.ok) return text({ ok: false, error: d.error ?? { code: "not_found", message: "no such entry" } });
      const e = d.data!;
      return text({
        ok: true,
        slug: e.slug,
        language: e.language,
        framework: e.framework,
        version: e.version,
        dependencies: e.dependencies,
        limitations: e.limitations,
        advisory:
          "Compatibility is informational: compare language/framework/dependencies against your project yourself. The library does not install or build code on your behalf.",
      });
    },
  );
}

// Standard session-mode streamable HTTP: each MCP client gets a session
// transport kept in-memory (initialize -> tools/list -> tools/call...).
const SESSIONS = new Map<string, StreamableHTTPServerTransport>();

function makeApp() {
  const server = new McpServer({ name: "teka-nexus-library", version: "1.0.0" });
  registerTools(server);
  return server;
}

createServer(async (req, res) => {
  if (!req.url || !req.url.startsWith("/mcp")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "MCP endpoint is at /mcp" }));
    return;
  }
  const sessionHeader = req.headers["mcp-session-id"];
  const sessionId = Array.isArray(sessionHeader) ? sessionHeader[0] : sessionHeader;

  if (req.method === "DELETE") {
    if (sessionId && SESSIONS.has(sessionId)) {
      await SESSIONS.get(sessionId)!.handleRequest(req, res); // closes the session
    } else {
      res.writeHead(404);
      res.end();
    }
    return;
  }

  let transport = sessionId ? SESSIONS.get(sessionId) : undefined;
  if (!transport) {
    if (req.method !== "POST") {
      res.writeHead(400, { Allow: "POST, DELETE" });
      res.end();
      return;
    }
    // The SDK generates the session id lazily while handling the initialize
    // request — capture it through the generator callback so we can register
    // the transport reliably after handleRequest returns.
    let resolveId: (id: string) => void = () => {};
    const idPromise = new Promise<string>((r) => {
      resolveId = r;
    });
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => {
        const id = randomUUID();
        resolveId(id);
        return id;
      },
    });
    transport.onclose = () => {
      const sid = transport!.sessionId;
      if (sid) SESSIONS.delete(sid);
    };
    const server = makeApp();
    await server.connect(transport);
    const requestHandler = transport.handleRequest(req, res);
    const id = await Promise.race([idPromise, new Promise<string>((r) => setTimeout(() => r(""), 100))]);
    await requestHandler;
    if (id) {
      SESSIONS.set(id, transport);
      console.log(`[library-mcp] session ${id.slice(0, 8)}… registered (total: ${SESSIONS.size})`);
    }
  } else {
    await transport.handleRequest(req, res);
  }
}).listen(PORT, () => {
  console.log(
    `[library-mcp] listening on http://localhost:${PORT}/mcp (session mode | tools: search_nexus, get_reference, find_implementation, get_code_example, find_related_patterns, check_compatibility | api: ${API})`,
  );
});
