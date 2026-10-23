// TEKA NEXUS — POST /api/tts
// "AI Voice Mentor": read-aloud narration for TEKA Academy lessons. Text in,
// WAV bytes out, synthesized through the z-ai SDK (BACKEND ONLY). Requires an
// authenticated user, applies a per-user sliding-window rate limit, and keeps
// a small in-memory audio cache (sha1 of text+lang) so repeats stay instant.

import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";

import { fail, handle, HttpError, requireUser } from "@/lib/server";

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
// A hit skips the SDK entirely (instant + free).

const CACHE_MAX = 40;
const audioCache = new Map<string, Buffer>(); // sha1(text|lang) → wav bytes

function cacheGet(key: string): Buffer | undefined {
  const hit = audioCache.get(key);
  if (hit !== undefined) {
    // Re-insert to refresh recency (oldest key = next eviction victim).
    audioCache.delete(key);
    audioCache.set(key, hit);
  }
  return hit;
}

function cacheSet(key: string, buf: Buffer) {
  if (audioCache.has(key)) audioCache.delete(key);
  audioCache.set(key, buf);
  while (audioCache.size > CACHE_MAX) {
    const oldest = audioCache.keys().next().value;
    if (oldest === undefined) break;
    audioCache.delete(oldest);
  }
}

// ─── Handler ─────────────────────────────────────────────────

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const { text, lang = "en" } = Body.parse(await req.json());
    rateLimit(user.id);

    const key = createHash("sha1").update(`${lang}|${text}`).digest("hex");
    const cached = cacheGet(key);
    if (cached) {
      return new NextResponse(new Uint8Array(cached), {
        status: 200,
        headers: { "Content-Type": "audio/wav", "Cache-Control": "public, max-age=86400" },
      });
    }

    try {
      const zai = await ZAI.create();
      const response = await zai.audio.tts.create({
        input: text,
        voice: "tongtong",
        speed: 1.0,
        response_format: "wav",
        stream: false,
      });
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));

      cacheSet(key, buffer);
      return new NextResponse(new Uint8Array(buffer), {
        status: 200,
        headers: { "Content-Type": "audio/wav", "Cache-Control": "public, max-age=86400" },
      });
    } catch (err) {
      console.error("[tts] synthesis failed:", err instanceof Error ? err.message : err);
      return fail("TTS unavailable right now", 502);
    }
  });
}
