#!/usr/bin/env bun
// MCP integration test — a REAL client handshake against the running server:
// initialize (protocol negotiation) -> tools/list -> tools/call for every tool.
// This is what makes the MCP integration claim honest: it either works here or
// it does not exist.

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const client = new Client({ name: "nexus-mcp-test", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(new URL("http://localhost:3040/mcp")));
console.log("handshake OK");

const tools = await client.listTools();
console.log("tools/list:", tools.tools.map((t) => t.name).sort().join(", "));

const search = (await client.callTool({
  name: "search_nexus",
  arguments: { query: "ssrf", status: "verified" },
})) as { content: { text: string }[] };
const searchJson = JSON.parse(search.content[0].text);
console.log("search_nexus:", searchJson.results?.map((r: { slug: string }) => r.slug).join(", ") || "(no hits)");

const ref = (await client.callTool({
  name: "get_reference",
  arguments: { slug: "token-bucket-rate-limiter" },
})) as { content: { text: string }[] };
const refJson = JSON.parse(ref.content[0].text);
console.log("get_reference:", refJson.title, "| status:", refJson.status, "| code bytes:", refJson.code.length);

const impl = (await client.callTool({
  name: "find_implementation",
  arguments: { problem: "prevent brute force login attempts" },
})) as { content: { text: string }[] };
const implJson = JSON.parse(impl.content[0].text);
console.log("find_implementation:", implJson.matches?.length ?? 0, "match(es) |", (implJson.honestNote ?? "").slice(0, 90));

const code = (await client.callTool({
  name: "get_code_example",
  arguments: { slug: "api-error-envelope" },
})) as { content: { text: string }[] };
console.log("get_code_example: code bytes:", JSON.parse(code.content[0].text).code.length);

const rel = (await client.callTool({
  name: "find_related_patterns",
  arguments: { slug: "retry-backoff-jitter" },
})) as { content: { text: string }[] };
console.log("find_related_patterns:", JSON.parse(rel.content[0].text).related.map((r: { slug: string }) => r.slug).join(", "));

const compat = (await client.callTool({
  name: "check_compatibility",
  arguments: { slug: "token-bucket-rate-limiter" },
})) as { content: { text: string }[] };
const compatJson = JSON.parse(compat.content[0].text);
console.log("check_compatibility:", compatJson.language, "/", compatJson.framework, "| deps:", JSON.stringify(compatJson.dependencies));

await client.close();
console.log("ALL MCP TOOLS OK");
