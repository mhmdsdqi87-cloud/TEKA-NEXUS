// TEKA NEXUS — POST /api/tts
// "AI Voice Mentor": read-aloud narration for TEKA Academy lessons. Text in,
// audio bytes out, synthesized BACKEND ONLY. Requires an authenticated user,
// applies a per-user sliding-window rate limit, and keeps a small in-memory
// audio cache (sha1 of text+lang) so repeats stay instant.
//
// Provider chain (mirrors the chat AI routes / lib/ai-provider.ts):
//   1) OpenAI-compatible speech endpoint via AI_* env vars (production),
//      optionally tuned with AI_TTS_MODEL / AI_TTS_VOICE,
//   2) sandbox SDK (dev environment).
// No fake audio: if no provider answers, an honest 502 is returned.

import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import AiSdk from "z-ai-web-dev-sdk";

import { fail, handle, HttpError, requireUser } from "@/lib/server";
import { withTimeout } from "@/lib/ai-provider";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ─── Request contract ────────────────────────────────────────

const Body = z.object({
  text: z.string().min(1).max(900),
  lang: z.enum(["fa", "en"]).optional(),
});

// ─── Rate limit (in-memory sliding window): 12 / 5 min / user ──

const RATE_WINDOW_MS = 5 * 60_000;
const RATE_MAX = 12;
const rateHits = new Map<string, number[]>(); // userId → timestamps

function rateLimit(userId: string) {
  const now = Date.now();
  const list = (rateHits.get(userId) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) {
    const waitMin = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - list[0])) / 60_000));
    throw new HttpError(
      `آروم‌تر! 😅 حدود ${waitMin} دقیقهٔ دیگه دوباره امتحان کن — Easy there! The narrator needs a breather, try again in about ${waitMin} minute${waitMin === 1 ? "" : "s"}.`,
      429,
    );
  }
  list.push(now);
  rateHits.set(userId, list);
  // Prune stale users so the map can't grow unbounded.
  if (rateHits.size > 1000) {
    for (const [key, times] of rateHits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) rateHits.delete(key);
    }
  }
}

// ─── Audio cache (in-memory, LRU-ish, max 40 entries) ────────
// Keyed by sha1(text + lang); the oldest entry is evicted when full.
// A hit skips the providers entirely (instant + free).

const CACHE_MAX = 40;
type CachedAudio = { buffer: Buffer; contentType: string };
const audioCache = new Map<string, CachedAudio>(); // sha1(text|lang) → audio

function cacheGet(key: string): CachedAudio | undefined {
  const hit = audioCache.get(key);
  if (hit !== undefined) {
    // Re-insert to refresh recency (oldest key = next eviction victim).
    audioCache.delete(key);
    audioCache.set(key, hit);
  }
  return hit;
}

function cacheSet(key: string, entry: CachedAudio) {
  if (audioCache.has(key)) audioCache.delete(key);
  audioCache.set(key, entry);
  while (audioCache.size > CACHE_MAX) {
    const oldest = audioCache.keys().next().value;
    if (oldest === undefined) break;
    audioCache.delete(oldest);
  }
}

function audioResponse(entry: CachedAudio) {
  return new NextResponse(new Uint8Array(entry.buffer), {
    status: 200,
    headers: {
      "Content-Type": entry.contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

// ─── External speech provider (production hosting) ──────────
// The sandbox SDK talks to a private endpoint that doesn't exist on real
// hosting. Any OpenAI-compatible /audio/speech endpoint fills that gap via
// the same AI_* env vars used by the chat routes:
//   AI_BASE_URL / AI_API_KEY  — shared with the chat AI routes
//   AI_TTS_MODEL              — optional (default "tts-1")
//   AI_TTS_VOICE              — optional (default "alloy")
// Providers without a speech endpoint simply error here → the chain moves on
// and the route ends with an honest 502 instead of fake audio.

const EXTERNAL_TTS_TIMEOUT_MS = 50_000;

function externalTtsConfig() {
  const base = process.env.AI_BASE_URL?.replace(/\/+$/, "");
  const key = process.env.AI_API_KEY;
  if (!base || !key) return null;
  try {
    new URL(base);
  } catch {
    return null;
  }
  return {
    base,
    key,
    model: process.env.AI_TTS_MODEL || "tts-1",
    voice: process.env.AI_TTS_VOICE || "alloy",
  };
}

async function externalSpeech(
  cfg: NonNullable<ReturnType<typeof externalTtsConfig>>,
  text: string,
): Promise<CachedAudio> {
  const res = await withTimeout(
    fetch(`${cfg.base}/audio/speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.key}` },
      body: JSON.stringify({
        model: cfg.model,
        input: text,
        voice: cfg.voice,
        response_format: "wav",
      }),
    }),
    EXTERNAL_TTS_TIMEOUT_MS,
    "external-tts",
  );
  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new Error(`speech provider responded ${res.status}${detail ? ` — ${detail}` : ""}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length < 100) throw new Error("speech provider returned empty audio");
  const contentType = res.headers.get("content-type")?.split(";")[0] || "audio/wav";
  return { buffer, contentType };
}

// ─── Handler ─────────────────────────────────────────────────

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const { text, lang = "en" } = Body.parse(await req.json());
    rateLimit(user.id);

    const key = createHash("sha1").update(`${lang}|${text}`).digest("hex");
    const cached = cacheGet(key);
    if (cached) return audioResponse(cached);

    // 1) Explicitly configured provider (production hosting, e.g. Vercel).
    const ext = externalTtsConfig();
    if (ext) {
      try {
        const entry = await externalSpeech(ext, text);
        cacheSet(key, entry);
        return audioResponse(entry);
      } catch (extErr) {
        console.error(
          "[tts] external speech provider failed:",
          extErr instanceof Error ? extErr.message : extErr,
        );
      }
    }

    // 2) Sandbox SDK (private endpoint — works in this dev environment).
    try {
      const sdk = await AiSdk.create();
      const response = await sdk.audio.tts.create({
        input: text,
        voice: "tongtong",
        speed: 1.0,
        response_format: "wav",
        stream: false,
      });
      const arrayBuffer = await response.arrayBuffer();
      const entry: CachedAudio = {
        buffer: Buffer.from(new Uint8Array(arrayBuffer)),
        contentType: "audio/wav",
      };
      cacheSet(key, entry);
      return audioResponse(entry);
    } catch (err) {
      console.error("[tts] synthesis failed:", err instanceof Error ? err.message : err);
      return fail("TTS unavailable right now", 502);
    }
  });
}
