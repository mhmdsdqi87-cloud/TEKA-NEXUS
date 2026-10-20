// TEKA NEXUS — POST /api/academy/tutor
// The optional AI tutor for TEKA Academy (spec §8): a Socratic teacher that
// guides learners toward answers instead of handing them out. The z-ai SDK is
// used BACKEND ONLY. Conversations are stateless — the client re-sends capped
// history each turn. Includes a per-user sliding-window rate limit and an
// honest-failure path (no fake answers when the model is unavailable).

import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";

import { handle, HttpError, ok, requireUser } from "@/lib/server";
import { getCourse, pick } from "@/lib/academy";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ─── Request contract ────────────────────────────────────────

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const Body = z.object({
  messages: z.array(MessageSchema).min(1).max(12),
  context: z
    .object({
      courseId: z.string().max(64).optional(),
      lessonId: z.string().max(96).optional(),
      locale: z.enum(["en", "fa", "es", "zh", "ar", "fr"]).optional(),
    })
    .optional(),
});

type TutorMessage = z.infer<typeof MessageSchema>;

// ─── Rate limit (in-memory sliding window) ───────────────────
// 20 requests / 5 min / user. Best-effort per server instance — enough to
// stop runaway spam without needing shared state.

const RATE_WINDOW_MS = 5 * 60_000;
const RATE_MAX = 20;
const rateHits = new Map<string, number[]>();

function rateLimit(userId: string) {
  const now = Date.now();
  const list = (rateHits.get(userId) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) {
    const waitMin = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - list[0])) / 60_000));
    throw new HttpError(
      `You're chatting up a storm! The tutor needs a short breather — try again in about ${waitMin} minute${waitMin === 1 ? "" : "s"}.`,
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

// ─── Lesson context (compact, never the whole course file) ───

const THEORY_CAP = 600;

function buildLessonContext(
  context: { courseId?: string; lessonId?: string } | undefined,
  locale: string,
): string | null {
  if (!context?.courseId) return null;
  const course = getCourse(context.courseId);
  if (!course) return null;

  const lines: string[] = [
    `Course: ${pick(course.title, locale)} — ${pick(course.tagline, locale)}`,
  ];

  if (context.lessonId) {
    for (const mod of course.modules) {
      const lesson = mod.lessons.find((l) => l.id === context.lessonId);
      if (!lesson) continue;
      lines.push(`Module: ${pick(mod.title, locale)}`);
      lines.push(`Lesson: ${pick(lesson.title, locale)}`);
      lines.push(`Lesson goal: ${pick(lesson.goal, locale)}`);

      // First theory lines only, capped — a nudge, not a transcript.
      let theory = "";
      outer: for (const step of lesson.steps) {
        if (step.kind !== "theory") continue;
        for (const block of step.blocks) {
          if (block.type === "text" || block.type === "tip") {
            theory += (theory ? " " : "") + pick(block, locale);
            if (theory.length >= THEORY_CAP) break outer;
          }
        }
      }
      if (theory) lines.push(`Lesson notes (excerpt): ${theory.slice(0, THEORY_CAP)}`);
      break;
    }
  }

  return lines.join("\n");
}

// ─── System prompt (spec §8 persona) ─────────────────────────

const SYSTEM_EN = `You are the TEKA Academy Tutor — a patient, encouraging Socratic teacher inside the TEKA NEXUS learning platform.

TEACHING METHOD (follow strictly):
- Teach; don't just supply answers. Lead with short guiding questions and progressive hints, then deepen.
- If the learner asks for a direct answer, give it — but always with a clear explanation of why.
- Never shame or condescend. Mistakes are part of learning: name what's right before what's wrong.
- Prefer minimal, focused examples over long essays. Keep replies under 180 words unless the learner asks for depth.
- If you show code, label it as "proposed — verify it". NEVER claim you have executed, run, or tested code; you cannot run anything.
- Distinguish clearly between verified facts and your assumptions ("I'm not sure, but...").
- Break concepts into small steps and check understanding as you go.

HARD LIMITS:
- Never reveal exam questions or answers, and never help cheat on exams. If the learner mentions the exam or asks for exam answers, politely decline and offer to explain the underlying concepts instead.
- Stay on the lesson topic; if asked something unrelated, gently steer back to learning.

STYLE: warm, concise, plain text (no markdown headings). Reply in English.`;

const SYSTEM_FA = `تو «معلم آکادمی TEKA» هستی — یک معلم سقراطیِ صبور و مهربان داخل پلتفرم TEKA NEXUS.

روش تدریس (دقیقاً رعایت کن):
- یاد بده، فقط جواب آماده نده. با سؤال‌های کوتاهِ راهنما و راهنمایی پلکانی شروع کن و کم‌کم عمیق‌تر برو.
- اگه یادگیرنده جواب مستقیم خواست، بگو — ولی همیشه با توضیح واضح اینکه چرا.
- هیچ‌وقت تحقیر نکن. اشتباه بخشی از یادگیریه: اول چیزهای درست رو تأیید کن، بعد ایرادها رو بگو.
- مثال‌های کوتاه و متمرکز بده به‌جای متن‌های طولانی. جواب رو زیر ۱۸۰ کلمه نگه دار مگه اینکه یادگیرنده عمق بخواد.
- اگه کد نشون می‌دی بنویس «پیشنهادی — خودت چکش کن». هیچ‌وقت ادعا نکن که کد رو اجرا یا تست کردی؛ تو نمی‌تونی چیزی اجرا کنی.
- بین اطلاعات تأییدشده و حدس‌های خودت تفاوت بذار («مطمئن نیستم، ولی...»).
- مفاهیم رو قدم‌به‌قدم بشکن و حین کار درک طرف رو چک کن.

محدودیت‌های سخت:
- هیچ‌وقت سؤال‌ها یا جواب‌های آزمون رو لو نده و به تقلب کمک نکن. اگه دربارهٔ آزمون حرف شد، مؤدبانه رد کن و پیشنهاد بده مفهوم پایه‌ای رو با هم مرور کنید.
- سر موضوع درس بمون؛ اگه سراغ موضوع نامرتبط رفت، آروم برگردونش سر درس.

سبک: صمیمی و محترمانه، فارسی محاوره‌ای، پاسخ کوتاه، بدون هدینگ مارک‌داون. به فارسی جواب بده.`;

function buildSystemPrompt(locale: string, context?: { courseId?: string; lessonId?: string }): string {
  const base = locale === "fa" ? SYSTEM_FA : SYSTEM_EN;
  const ctx = buildLessonContext(context, locale === "fa" ? "fa" : "en");
  return ctx
    ? `${base}\n\nLESSON CONTEXT (for reference — tailor hints and examples to it, never paste it wholesale):\n${ctx}`
    : base;
}

// ─── Offline fallback (AI backend unreachable) ───────────────
// When the LLM backend is unavailable (e.g. hosting without AI credentials),
// the tutor stays useful: it answers from the lesson's own goal + theory
// with a Socratic nudge, and the client badges the reply as offline mode.
// It never pretends to be the live model and never fabricates new facts.

const OFFLINE_THEORY_CAP = 700;

type OfflineLesson = {
  lessonTitle?: string;
  lessonGoal?: string;
  theory: string;
  courseTitle?: string;
};

function extractLesson(context: { courseId?: string; lessonId?: string } | undefined): OfflineLesson {
  const out: OfflineLesson = { theory: "" };
  if (!context?.courseId) return out;
  const course = getCourse(context.courseId);
  if (!course) return out;

  let lesson = null as null | (typeof course.modules)[number]["lessons"][number];
  for (const mod of course.modules) {
    const found = mod.lessons.find((l) => l.id === context.lessonId);
    if (found) {
      lesson = found;
      break;
    }
  }
  if (!lesson) return { courseTitle: pick(course.title, "en"), theory: "" };

  let theory = "";
  outer: for (const step of lesson.steps) {
    if (step.kind !== "theory") continue;
    for (const block of step.blocks) {
      if (block.type === "text" || block.type === "tip") {
        theory += (theory ? " " : "") + pick(block, "en");
        if (theory.length >= OFFLINE_THEORY_CAP) break outer;
      }
    }
  }
  return {
    courseTitle: pick(course.title, "en"),
    lessonTitle: pick(lesson.title, "en"),
    lessonGoal: pick(lesson.goal, "en"),
    theory: theory.slice(0, OFFLINE_THEORY_CAP),
  };
}

function offlineReplyFa(l: OfflineLesson, question: string): string {
  const lines: string[] = [];
  lines.push("🛰 حالت آفلاین: الان به مغز اصلی وصل نیستم، پس از خودِ جزوهٔ درس جواب می‌دم.");
  if (l.lessonTitle) lines.push(`📚 درس: ${l.lessonTitle}`);
  if (l.lessonGoal) lines.push(`🎯 هدف درس: ${l.lessonGoal}`);
  if (l.theory) lines.push(`\nنکتهٔ کلیدی از جزوه:\n${l.theory.trim()}`);
  lines.push(
    `\nحالا نوبت توئه: ${question ? `سؤالت («${question.slice(0, 120)}») رو` : "همین نکته رو"} با یه مثال کوچیک در ادیتور پایین درس امتحان کن — کد رو اجرا کن و ببین خروجی چی می‌شه. اگه خواستی بعداً دوباره من رو آنلاین صدا بزن تا عمیق‌تر بریم! 🚀`,
  );
  return lines.join("\n");
}

function offlineReplyEn(l: OfflineLesson, question: string): string {
  const lines: string[] = [];
  lines.push("🛰 Offline mode: I can't reach the AI backend right now, so here's what the lesson notes themselves say.");
  if (l.courseTitle) lines.push(`📖 Course: ${l.courseTitle}`);
  if (l.lessonTitle) lines.push(`📚 Lesson: ${l.lessonTitle}`);
  if (l.lessonGoal) lines.push(`🎯 Lesson goal: ${l.lessonGoal}`);
  if (l.theory) lines.push(`\nKey note from the lesson:\n${l.theory.trim()}`);
  lines.push(
    `\nYour move: ${question ? `take your question ("${question.slice(0, 120)}") and` : "take this note and"} try it in the code runner below this lesson — run it, tweak it, see what happens. Ping me again once I'm back online and we'll go deeper! 🚀`,
  );
  return lines.join("\n");
}

// ─── Handler ─────────────────────────────────────────────────

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    rateLimit(user.id);

    const locale = body.context?.locale ?? "en";
    const system = buildSystemPrompt(locale, body.context);

    const sdkMessages: { role: "assistant" | TutorMessage["role"]; content: string }[] = [
      // The SDK takes system-style instructions as a first "assistant" message.
      { role: "assistant", content: system },
      ...body.messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    try {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: sdkMessages,
        thinking: { type: "disabled" },
      });
      const raw = completion?.choices?.[0]?.message?.content;
      const reply = typeof raw === "string" ? raw.trim() : "";
      if (!reply) throw new Error("empty reply");
      return ok({ reply });
    } catch (err) {
      if (err instanceof HttpError) throw err;
      // Never leak internals (config paths, stacks) to the client.
      console.error("[tutor] completion failed:", err instanceof Error ? err.message : err);
      // AI backend unreachable (e.g. hosting without AI credentials) →
      // fall back to the lesson-aware offline tutor instead of failing.
      const lastUser = [...body.messages].reverse().find((m) => m.role === "user");
      const lesson = extractLesson(body.context);
      const reply = locale === "fa"
        ? offlineReplyFa(lesson, lastUser?.content ?? "")
        : offlineReplyEn(lesson, lastUser?.content ?? "");
      return ok({ reply, offline: true });
    }
  });
}
