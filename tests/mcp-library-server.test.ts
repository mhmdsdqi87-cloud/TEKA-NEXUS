// TEKA NEXUS — MCP protocol engine tests (src/lib/mcp-library-server.ts).
// The dispatch is exercised with an in-memory provider built on the seed
// catalog — the exact same fallback path production uses when the database
// is not provisioned, so tool responses are deterministic.

import { describe, expect, test } from "bun:test";

import { catalogDetail, catalogListItems } from "@/lib/library-catalog";
import { listCatalogEntries, type ListParams } from "@/lib/library-core";
import { handleMcpRpc, type LibraryProvider } from "@/lib/mcp-library-server";

const provider: LibraryProvider = {
  list: (params: ListParams) => Promise.resolve(listCatalogEntries(params)),
  detail: (slug: string) =>
    Promise.resolve(
      (() => {
        const d = catalogDetail(slug.toLowerCase());
        return d ? { data: d, source: "catalog" as const } : null;
      })(),
    ),
};

/** Extract the parsed JSON payload of a tools/call text content block. */
function resultText(outcome: { body: unknown }): Record<string, unknown> {
  const body = outcome.body as { result?: { content?: Array<{ type: string; text?: string }>; isError?: boolean } };
  const block = body.result?.content?.find((c) => c.type === "text");
  return JSON.parse(block?.text ?? "{}") as Record<string, unknown>;
}

describe("MCP lifecycle", () => {
  test("initialize echoes a known protocol version and identifies the server", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18" } },
      provider,
    );
    expect(o.httpStatus).toBe(200);
    const body = o.body as { result: { protocolVersion: string; serverInfo: { name: string } } };
    expect(body.result.protocolVersion).toBe("2025-06-18");
    expect(body.result.serverInfo.name).toBe("teka-nexus-library");
  });

  test("initialize falls back to the default protocol version for unknown requests", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 2, method: "initialize", params: { protocolVersion: "1999-01-01" } },
      provider,
    );
    const body = o.body as { result: { protocolVersion: string } };
    expect(body.result.protocolVersion).toBe("2025-03-26");
  });

  test("notifications get HTTP 202 with no body", async () => {
    const o = await handleMcpRpc({ jsonrpc: "2.0", method: "notifications/initialized" }, provider);
    expect(o.httpStatus).toBe(202);
    expect(o.body).toBeNull();
  });

  test("ping returns an empty result", async () => {
    const o = await handleMcpRpc({ jsonrpc: "2.0", id: 3, method: "ping" }, provider);
    expect((o.body as { result: Record<string, never> }).result).toEqual({});
  });
});

describe("tools/list", () => {
  test("exposes exactly the six library tools with valid schemas", async () => {
    const o = await handleMcpRpc({ jsonrpc: "2.0", id: 4, method: "tools/list" }, provider);
    const tools = (o.body as { result: { tools: Array<{ name: string; inputSchema: { required?: string[] } }> } }).result.tools;
    expect(tools.map((t) => t.name).sort()).toEqual([
      "check_compatibility", "find_implementation", "find_related_patterns",
      "get_code_example", "get_reference", "search_nexus",
    ]);
    const search = tools.find((t) => t.name === "search_nexus")!;
    expect(search.inputSchema.required).toContain("query");
  });
});

describe("tools/call over the seed catalog", () => {
  test("search_nexus: English keyword finds the rate limiter + reports matched concepts", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "search_nexus", arguments: { query: "rate limiter" } } },
      provider,
    );
    const payload = resultText(o);
    const results = payload.results as Array<{ slug: string }>;
    expect(results[0].slug).toBe("token-bucket-rate-limiter");
    const meta = payload.meta as { search?: { concepts?: string[]; q?: string } };
    expect(meta.search?.q).toBe("rate limiter");
    expect(Array.isArray(meta.search?.concepts)).toBe(true);
  });

  test("search_nexus: the Persian payment-outage query finds circuit-breaker", async () => {
    const o = await handleMcpRpc(
      {
        jsonrpc: "2.0", id: 6, method: "tools/call",
        params: { name: "search_nexus", arguments: { query: "اگر سرویس پرداخت قطع شد نباید کل برنامه از کار بیفتد" } },
      },
      provider,
    );
    const payload = resultText(o);
    const slugs = (payload.results as Array<{ slug: string }>).map((r) => r.slug);
    expect(slugs).toContain("circuit-breaker");
  });

  test("find_implementation: honest zero-hit note when nothing matches", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 7, method: "tools/call", params: { name: "find_implementation", arguments: { problem: "zzzqqx impossible widget" } } },
      provider,
    );
    const payload = resultText(o);
    expect(payload.ok).toBe(true);
    expect(payload.matches).toEqual([]);
    expect(String(payload.honestNote)).toContain("No matching implementation");
  });

  test("get_reference returns the full entry including code", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 8, method: "tools/call", params: { name: "get_reference", arguments: { slug: "circuit-breaker" } } },
      provider,
    );
    const payload = resultText(o);
    expect(payload.slug).toBe("circuit-breaker");
    expect(String(payload.code).length).toBeGreaterThan(100);
    expect(payload.problem).toBeTruthy();
  });

  test("get_reference for an unknown slug returns an isError result — not a protocol error", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 9, method: "tools/call", params: { name: "get_reference", arguments: { slug: "does-not-exist" } } },
      provider,
    );
    const body = o.body as { result: { isError?: boolean } };
    expect(body.result.isError).toBe(true);
    expect(resultText(o).ok).toBe(false);
    expect(o.httpStatus).toBe(200);
  });

  test("get_code_example returns code + install", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 10, method: "tools/call", params: { name: "get_code_example", arguments: { slug: "circuit-breaker" } } },
      provider,
    );
    const payload = resultText(o);
    expect(payload.slug).toBe("circuit-breaker");
    expect(payload.language).toBe("typescript");
    expect(String(payload.code).length).toBeGreaterThan(100);
  });

  test("find_related_patterns resolves related entries", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 11, method: "tools/call", params: { name: "find_related_patterns", arguments: { slug: "circuit-breaker" } } },
      provider,
    );
    const payload = resultText(o);
    expect(payload.ok).toBe(true);
    expect(payload.slug).toBe("circuit-breaker");
    expect(Array.isArray(payload.related)).toBe(true);
  });

  test("check_compatibility returns advisory metadata only", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 12, method: "tools/call", params: { name: "check_compatibility", arguments: { slug: "circuit-breaker", yourFramework: "next" } } },
      provider,
    );
    const payload = resultText(o);
    expect(payload.ok).toBe(true);
    expect(String(payload.advisory)).toContain("informational");
  });

  test("unknown tool name is a -32602 protocol error with available tools", async () => {
    const o = await handleMcpRpc(
      { jsonrpc: "2.0", id: 13, method: "tools/call", params: { name: "not_a_tool", arguments: {} } },
      provider,
    );
    const body = o.body as { error?: { code: number; data?: { available?: string[] } } };
    expect(body.error?.code).toBe(-32602);
    expect(body.error?.data?.available).toContain("search_nexus");
  });
});

describe("protocol errors", () => {
  test("unknown method → -32601", async () => {
    const o = await handleMcpRpc({ jsonrpc: "2.0", id: 14, method: "resources/list" }, provider);
    expect((o.body as { error: { code: number } }).error.code).toBe(-32601);
  });

  test("batch requests are refused honestly (-32600)", async () => {
    const o = await handleMcpRpc([{ jsonrpc: "2.0", id: 15, method: "ping" }], provider);
    expect(o.httpStatus).toBe(400);
    expect((o.body as { error: { code: number } }).error.code).toBe(-32600);
  });

  test("malformed request → -32600", async () => {
    const o = await handleMcpRpc({ hello: "world" }, provider);
    expect((o.body as { error: { code: number } }).error.code).toBe(-32600);
  });

  test("catalog list matches the REST contract shape", async () => {
    const result = await provider.list({ q: "", category: "", language: "", framework: "", difficulty: "", status: "", limit: 20, offset: 0 });
    expect(result.source).toBe("catalog");
    expect(result.page.length).toBe(catalogListItems().length);
    expect(result.page[0].status).toBe("draft");
  });
});
