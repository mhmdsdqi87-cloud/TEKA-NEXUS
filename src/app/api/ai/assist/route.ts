// TEKA NEXUS — POST /api/ai/assist
// AI copilot for the "Launch a project" form: turns a rough idea into a
// filled-out draft (tagline, description, tags, category, skills). The z-ai
// SDK is used BACKEND ONLY. Provider chain mirrors the academy tutor:
//   1) explicit OpenAI-compatible provider via AI_* env vars (production),
//   2) sandbox SDK (dev environment).
// No offline fabrication: if no provider answers, we say so honestly.

import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";

import { handle, HttpError, ok, requireUser } from "@/lib/server";
import { PROJECT_CATEGORIES, SKILLS } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ─── Request contract ────────────────────────────────────────

const Body = z.object({
  idea: z.string().trim().min(10).max(600),
  locale: z.enum(["en", "fa", "es", "zh", "ar", "fr"]).optional(),
});

// ─── Rate limit (in-memory sliding window, per user) ─────────
// 12 suggestions / 5 min — the assistant is heavier than the tutor chat.

const RATE_WINDOW_MS = 5 * 60_000;
const RATE_MAX = 12;
const rateHits = new Map<string, number[]>();

function rateLimit(userId: string) {
  const now = Date.now();
  const list = (rateHits.get(userId) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) {
    const waitMin = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - list[0])) / 60_000));
    throw new HttpError(
      `The assistant needs a short breather — try again in about ${waitMin} minute${waitMin === 1 ? "" : "s"}.`,
      429,
    );
  }
  list.push(now);
  rateHits.set(userId, list);
  if (rateHits.size > 1000) {
    for (const [key, times] of rateHits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) rateHits.delete(key);
    }
  }
}

// ─── Provider plumbing (mirrors academy tutor) ───────────────

const SDK_TIMEOUT_MS = 15_000;
// Public Z.ai endpoint can be slow from Vercel regions — generous window,
// same rationale as the tutor route (maxDuration 60s covers both attempts).
const EXTERNAL_TIMEOUT_MS = 30_000;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label}-timeout`)), ms),
    ),
  ]);
}

function externalProviderConfig() {
  const base = process.env.AI_BASE_URL?.replace(/\/+$/, "");
  const key = process.env.AI_API_KEY;
  if (!base || !key) return null;
  return {
    base,
    key,
    model: process.env.AI_MODEL || "glm-4.5-flash",
    isZai: /z\.ai$/i.test(new URL(base).hostname),
  };
}

async function externalCompletion(
  cfg: NonNullable<ReturnType<typeof externalProviderConfig>>,
  system: string,
  userPrompt: string,
): Promise<string> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 900,
  };
  // The `thinking` switch is Z.ai-specific; other providers may reject it.
  if (cfg.isZai) body.thinking = { type: "disabled" };

  const res = await withTimeout(
    fetch(`${cfg.base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.key}` },
      body: JSON.stringify(body),
    }),
    EXTERNAL_TIMEOUT_MS,
    "external-completion",
  );
  if (!res.ok) throw new Error(`provider responded ${res.status}`);
  const data = (await res.json()) as { choices?: { message?: { content?: unknown } }[] };
  const raw = data?.choices?.[0]?.message?.content;
  const reply = typeof raw === "string" ? raw.trim() : "";
  if (!reply) throw new Error("empty provider reply");
  return reply;
}

// ─── Prompt ──────────────────────────────────────────────────

const LOCALE_NAME: Record<string, string> = {
  en: "English",
  fa: "Persian (Farsi, conversational)",
  es: "Spanish",
  zh: "Simplified Chinese",
  ar: "Arabic",
  fr: "French",
};

function buildSystemPrompt(locale: string): string {
  const categories = PROJECT_CATEGORIES.map((c) => c.slug).join(" | ");
  const skills = SKILLS.map((s) => s.slug).join(" | ");
  const lang = LOCALE_NAME[locale] ?? "English";
  return `You are the TEKA NEXUS Project Copilot. A founder describes a rough software project idea; you return a polished launch draft for a developer community platform.

OUTPUT FORMAT — respond with ONE valid JSON object and nothing else (no markdown fences, no commentary):
{"name": string, "tagline": string, "description": string, "tags": string[], "category": string, "skills": string[]}

FIELD RULES:
- name: 1-4 words, brandable, Latin characters (it becomes the URL slug); the UI text may be localized but the name itself stays Latin.
- tagline: ONE compelling sentence, max 120 characters, in ${lang}.
- description: 3 short paragraphs separated by \\n\\n, in ${lang}: what it is, who it is for, what makes it different. Plain text, no markdown headings. Max 1200 characters.
- tags: 3-6 lowercase short topical tags in ${lang} (spaces replaced with "-"), no "#" prefix.
- category: EXACTLY one of: ${categories}
- skills: 2-5 items from: ${skills} — the skills the team actually needs.

QUALITY BAR: concrete, warm, builder-to-builder tone. Never invent fake metrics, users, or links. If the idea is vague, make reasonable assumptions and keep them plausible.`;
}

// ─── Response sanitizing ─────────────────────────────────────

const categorySlugs = new Set(PROJECT_CATEGORIES.map((c) => c.slug));
const skillSlugs = new Set(SKILLS.map((s) => s.slug));

const SuggestionSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  tagline: z.string().trim().min(1).max(140),
  description: z.string().trim().max(2000).optional(),
  tags: z.array(z.string()).max(8).optional(),
  category: z.string().optional(),
  skills: z.array(z.string()).max(6).optional(),
});

type Suggestion = z.infer<typeof SuggestionSchema>;

function extractJsonObject(raw: string): unknown {
  // Strip markdown fences if the model added them, then take the outermost braces.
  const cleaned = raw.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("no JSON object in reply");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function sanitizeSuggestion(raw: unknown): Suggestion {
  const parsed = SuggestionSchema.parse(raw);

  const tags = (parsed.tags ?? [])
    .map((t) =>
      t
        .trim()
        .toLowerCase()
        .replace(/^#+/, "")
        .replace(/\s+/g, "-")
        .slice(0, 24),
    )
    .filter((t) => t.length > 0 && t.length <= 24);
  const uniqueTags = [...new Set(tags)].slice(0, 8);

  const skills = (parsed.skills ?? []).filter((s) => skillSlugs.has(s));
  const category = parsed.category && categorySlugs.has(parsed.category) ? parsed.category : undefined;

  return {
    ...(parsed.name ? { name: parsed.name } : {}),
    tagline: parsed.tagline,
    ...(parsed.description ? { description: parsed.description } : {}),
    ...(uniqueTags.length ? { tags: uniqueTags } : {}),
    ...(category ? { category } : {}),
    ...(skills.length ? { skills } : {}),
  };
}

// ─── Handler ─────────────────────────────────────────────────

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    rateLimit(user.id);

    const locale = body.locale ?? "en";
    const system = buildSystemPrompt(locale);
    const userPrompt = `Project idea: """${body.idea}"""\n\nReturn the JSON object now.`;

    const ext = externalProviderConfig();
    try {
      let raw: string | null = null;
      // 1) Explicitly configured provider (production hosting, e.g. Vercel).
      if (ext) {
        try {
          raw = await externalCompletion(ext, system, userPrompt);
        } catch (extErr) {
          console.error(
            "[ai-assist] external provider failed:",
            extErr instanceof Error ? extErr.message : extErr,
          );
        }
      }
      // 2) Sandbox SDK (private endpoint — works in this dev environment).
      if (raw === null) {
        const zai = await withTimeout(ZAI.create(), SDK_TIMEOUT_MS, "zai-create");
        const completion = await withTimeout(
          zai.chat.completions.create({
            messages: [
              { role: "assistant", content: system },
              { role: "user", content: userPrompt },
            ],
            thinking: { type: "disabled" },
          }),
          SDK_TIMEOUT_MS,
          "zai-completion",
        );
        const candidate = completion?.choices?.[0]?.message?.content;
        raw = typeof candidate === "string" && candidate.trim() ? candidate.trim() : null;
      }
      if (raw === null) throw new Error("no provider produced a reply");
      return ok({ suggestion: sanitizeSuggestion(extractJsonObject(raw)) });
    } catch (err) {
      if (err instanceof HttpError) throw err;
      console.error("[ai-assist] failed:", err instanceof Error ? err.message : err);
      if (err instanceof z.ZodError) {
        throw new HttpError("The assistant returned a malformed draft — try rephrasing your idea.", 502);
      }
      throw new HttpError("The AI assistant is unavailable right now. Please try again shortly.", 503);
    }
  });
}
