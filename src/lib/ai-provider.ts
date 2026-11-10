// TEKA NEXUS — shared AI provider chain for the backend AI routes.
// Every AI route (NEXUS copilot, academy tutor, project assist) talks to LLMs
// through the same two-step chain:
//   1) external OpenAI-compatible provider configured via env vars
//      (AI_BASE_URL / AI_API_KEY / AI_MODEL — production hosting),
//   2) sandbox SDK (private endpoint — dev environment only).
// Routes own their prompts, rate limits and offline fallbacks; this module
// owns ONLY the transport plumbing so fixes land in exactly one place.

export const SDK_TIMEOUT_MS = 15_000;
// The public free endpoint can be slow from serverless regions (cold TLS +
// model latency). The original 15s then 30s caps both timed out in production
// logs (big system prompts + long replies). 50s fits inside maxDuration=60
// while still leaving room for the instant-failing SDK fallback afterwards.
export const EXTERNAL_TIMEOUT_MS = 50_000;

export function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label}-timeout`)), ms),
    ),
  ]);
}

export type ExternalProviderConfig = {
  base: string;
  key: string;
  model: string;
  managedFreeApi: boolean;
};

// Reads the OpenAI-compatible provider from env. Returns null when unset —
// and ALSO when the URL is malformed: a bad AI_BASE_URL must degrade to the
// next provider in the chain, never 500 the whole route.
export function externalProviderConfig(): ExternalProviderConfig | null {
  const base = process.env.AI_BASE_URL?.replace(/\/+$/, "");
  const key = process.env.AI_API_KEY;
  if (!base || !key) return null;
  let hostname: string;
  try {
    hostname = new URL(base).hostname;
  } catch {
    console.error("[ai-provider] AI_BASE_URL is not a valid URL — provider disabled");
    return null;
  }
  return {
    base,
    key,
    model: process.env.AI_MODEL || "glm-4.5-flash",
    // The `thinking` switch is only accepted by the managed free endpoint;
    // other providers may reject it.
    managedFreeApi: /z\.ai$/i.test(hostname),
  };
}

export type ProviderChatMessage = { role: string; content: string };

// Single chat completion against the configured external provider.
// Throws on HTTP errors / empty replies, logging a short response-body snippet
// so provider misconfigurations surface in server logs instead of staying
// silent ("provider responded 401" alone is undiagnosable).
export async function externalCompletion(
  cfg: ExternalProviderConfig,
  system: string,
  messages: ProviderChatMessage[],
  opts: { maxTokens?: number; label?: string } = {},
): Promise<string> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    messages: [{ role: "system", content: system }, ...messages],
    max_tokens: opts.maxTokens ?? 700,
  };
  if (cfg.managedFreeApi) body.thinking = { type: "disabled" };

  const res = await withTimeout(
    fetch(`${cfg.base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.key}` },
      body: JSON.stringify(body),
    }),
    EXTERNAL_TIMEOUT_MS,
    opts.label ?? "external-completion",
  );
  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new Error(`provider responded ${res.status}${detail ? ` — ${detail}` : ""}`);
  }
  const data = (await res.json()) as { choices?: { message?: { content?: unknown } }[] };
  const raw = data?.choices?.[0]?.message?.content;
  const reply = typeof raw === "string" ? raw.trim() : "";
  if (!reply) throw new Error("empty provider reply");
  return reply;
}
