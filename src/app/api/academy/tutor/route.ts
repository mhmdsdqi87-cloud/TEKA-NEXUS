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
// the tutor stays useful: a local Socratic engine answers the most common
// course topics with real explanations + tiny examples, and anything else
// falls back to the lesson's own goal + theory with a guiding nudge.
// It never pretends to be the live model and never fabricates new facts.

const OFFLINE_THEORY_CAP = 700;
const SDK_TIMEOUT_MS = 15_000;
// The public Z.ai endpoint can be slow from Vercel regions (cold TLS + model
// latency) — the original 15s cap timed out in production logs, so give the
// external provider a generous window. maxDuration is 60s, and the SDK attempt
// only runs when the external provider throws, so this stays inside budget.
const EXTERNAL_TIMEOUT_MS = 30_000;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label}-timeout`)), ms),
    ),
  ]);
}

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

// ─── Local Socratic engine (hosting without AI credentials) ──
// Keyword-routed mini-lessons for the topics the two TEKA courses actually
// cover. Persian + English; every reply ends with a “your move” prompt so
// the Socratic spirit survives even offline.

type LocalTopic = {
  keys: RegExp;
  fa: string;
  en: string;
};

const LOCAL_TOPICS: LocalTopic[] = [
  {
    keys: /variable|متغیر|assignment|انتساب|ذخیره/i,
    fa: `متغیر مثل یه جعبهٔ برچسب‌داره که یه مقدار توش می‌ذاری تا بعداً استفاده‌ش کنی:\n\nage = 14\nname = "آرش"\n\n• سمت چپ اسمِ جعبه‌ست، سمت راست چیزی که توش می‌ذاری.\n• پایتون خودش می‌فهمه نوعش چیه (عدد، متن، …) — لازم نیست بگی.\n• با نام یه‌جور چسب‌اندازه (snake_case) بنویس: user_age نه userAge.\n\nحالا تو: توی ادیتور یه متغیر بساز، printش کن، بعد مقدارش رو عوض کن و دوباره چاپ کن — چی دیدی؟ 🚀`,
    en: `A variable is a labeled box that stores a value for later:\n\nage = 14\nname = "Sara"\n\n• Left side is the box's name, right side is what goes inside.\n• Python infers the type (number, text, ...) — you never declare it.\n• Name boxes in snake_case: user_age, not userAge.\n\nYour move: create a variable, print it, change its value, print again — what changed? 🚀`,
  },
  {
    keys: /print|چاپ|خروجی|output|نمایش/i,
    fa: `print() هر چیزی که بهش بدی رو توی خروجی نشون می‌ده:\n\nprint("سلام")      → سلام\nprint(2 + 3)       → 5\nprint("نتیجه:", 7)  → نتیجه: 7\n\n• متن باید داخل کوتیشن باشه، عدد نه.\n• با کاما چند چیز رو با هم چاپ کن.\n\nحالا تو: یه جمله با اسم خودت چاپ کن، بعد یه محاسبهٔ کوچیک — فرقش رو ببین! 🚀`,
    en: `print() shows whatever you give it in the output:\n\nprint("hello")   → hello\nprint(2 + 3)     → 5\nprint("sum:", 7) → sum: 7\n\n• Text needs quotes; numbers don't.\n• A comma prints several things on one line.\n\nYour move: print a line with your name, then print a small calculation — spot the difference! 🚀`,
  },
  {
    keys: /input|ورودی|کاربر.*بگیر|بگیر.*کاربر/i,
    fa: `input() از کاربر ورودی می‌گیره — و همیشه «متن» برمی‌گردونه:\n\nname = input("اسمت چیه؟ ")\nage = int(input("چند سالته؟ "))\n\n• input(...) متن داخل پرانتز رو به‌عنوان سؤال نشون می‌ده.\n• اگه عدد می‌خوای با int() تبدیلش کن — وگرنه "14" یک متنه نه عدد!\n\nحالا تو: دو تا عدد از کاربر بگیر و جمعشون رو چاپ کن. اگه int نذاری چی می‌شه؟ امتحان کن! 🚀`,
    en: `input() reads what the user types — and always returns TEXT:\n\nname = input("Your name? ")\nage = int(input("Your age? "))\n\n• The text inside the parentheses is the question shown.\n• Want a number? Convert with int() — otherwise "14" is text, not a number!\n\nYour move: read two numbers and print their sum. What breaks without int()? Try it! 🚀`,
  },
  {
    keys: /\bif\b|شرط|condition|else|درست|غلط|منطقی/i,
    fa: `if یه تصمیم می‌سازه: «اگه شرط درست بود، این کد اجرا شه»:\n\nscore = 17\nif score >= 10:\n    print("قبول!")\nelse:\n    print("دفعهٔ بعد!")\n\n• بعد از شرط دونقطه (:) بذار.\n• خطِ بعدی با فاصله (indent) تورفته — این جزو قوانین پایتونه!\n• else مسیر «در غیر این صورت» رو می‌گیره.\n\nحالا تو: score رو 8 کن و اجرا بگیر — کدوم پیام چاپ شد و چرا؟ 🚀`,
    en: `if makes a decision: "only run this block when the condition is true":\n\nscore = 17\nif score >= 10:\n    print("pass!")\nelse:\n    print("try again")\n\n• A colon (:) ends the condition line.\n• The next line must be indented — that's real Python syntax!\n• else covers the "otherwise" path.\n\nYour move: change score to 8 and run — which message printed, and why? 🚀`,
  },
  {
    keys: /loop|حلقه|for\b|while|تکرار|repeat|range/i,
    fa: `حلقه یعنی «یه کار رو چند بار تکرار کن»:\n\nfor i in range(3):\n    print("سلام", i)\n\n• range(3) → 0، 1، 2 (تا قبل از 3!).\n• while تا وقتی شرطش درسته ادامه می‌ده:\n\ni = 0\nwhile i < 3:\n    print(i)\n    i = i + 1\n\n• مواظب باش i رو زیاد کنی، وگرنه حلقه هیچ‌وقت تموم نمی‌شه!\n\nحالا تو: با یه حلقه اعداد ۵ تا ۱ رو برعکس چاپ کن. راهشو پیدا می‌کنی؟ 🚀`,
    en: `A loop repeats work so you don't have to:\n\nfor i in range(3):\n    print("hi", i)\n\n• range(3) → 0, 1, 2 (it stops BEFORE 3!).\n• while keeps going while its condition holds:\n\ni = 0\nwhile i < 3:\n    print(i)\n    i = i + 1\n\n• Always advance i, or the loop never ends!\n\nYour move: print 5 down to 1 with a loop. Can you find the trick? 🚀`,
  },
  {
    keys: /list|لیست|آرایه|append|عنصر/i,
    fa: `لیست یه جعبه‌ست که چند مقدار رو با هم نگه می‌داره:\n\nteam = ["علی", "سارا", "رضا"]\nprint(team[0])     → علی\nteam.append("مریم")\nprint(len(team))   → 4\n\n• شماره‌گذاری از صفر شروع می‌شه (item اول = [0]).\n• append یه عضو جدید اضافه می‌کنه، len اندازه رو می‌ده.\n\nحالا تو: لیست سه تا فیلم بساز، عضو دوم رو چاپ کن و یکی بهش اضافه کن — عدد داخل براکت چه نقشی داشت؟ 🚀`,
    en: `A list stores several values together in one box:\n\nteam = ["Ali", "Sara", "Reza"]\nprint(team[0])     → Ali\nteam.append("Maryam")\nprint(len(team))   → 4\n\n• Counting starts at 0 (first item = [0]).\n• append adds a member; len tells you the size.\n\nYour move: make a list of 3 movies, print the second one, then add another — what job did the number in brackets do? 🚀`,
  },
  {
    keys: /function|تابع|def|روتین/i,
    fa: `تابع یه «ماشین کوچیک»ه: یه بار می‌نویسی، هزار بار صدا می‌زنی:\n\ndef greet(name):\n    return "سلام " + name\n\nprint(greet("علی"))   → سلام علی\nprint(greet("سارا"))  → سلام سارا\n\n• def تعریف می‌کنه، اسم تابع بعدش صدا می‌شه.\n• name ورودیه‌ست (پارامتر)، return خروجیه.\n\nحالا تو: تابعی بساز که دو تا عدد بگیره و حاصل‌ضربشون رو برگردونه — دو بار با عدد مختلف صداش کن! 🚀`,
    en: `A function is a tiny machine: write it once, call it a thousand times:\n\ndef greet(name):\n    return "hi " + name\n\nprint(greet("Ali"))   → hi Ali\nprint(greet("Sara"))  → hi Sara\n\n• def defines it; the name calls it.\n• name is the input (parameter); return is the output.\n\nYour move: write a function that takes two numbers and returns their product — call it twice! 🚀`,
  },
  {
    keys: /error|خطا|exception|باگ|bug|traceback|مشکل|نمیشه/i,
    fa: `خطا دشمن نیست — پیغامِ راهنمای پایتونه! سه تا از پرتکرارها:\n\n• NameError → اسمی که نوشتی تعریف نشده (غلط املایی؟).\n• TypeError → با نوع اشتباه کار کردی (مثلاً "5" + 2).\n• IndentationError → فاصله‌های ابتدای خط به‌هم‌ریخته.\n\nهمیشه آخرین خطِ پیغام خطا رو بخون: می‌گه چی و کجا!\n\nحالا تو: عمداً یه NameError بساز (یه اسم اشتباه print کن)، پیغامش رو بخون و درستش کن. کارآگاه باش! 🔍`,
    en: `Errors aren't enemies — they're Python's guidance system! The top three:\n\n• NameError → a name you used was never defined (typo?).\n• TypeError → mixed wrong types (like "5" + 2).\n• IndentationError → your leading spaces are off.\n\nAlways read the LAST line of the error: it says what and where!\n\nYour move: create a NameError on purpose, read the message, then fix it. Be a bug detective! 🔍`,
  },
  {
    keys: /html|اتچ|تگ|tag|ساختار صفحه|head|body/i,
    fa: `HTML اسکلت صفحه‌ست و از تگ‌ها ساخته می‌شه:\n\n<html>\n  <head><title>سایت من</title></head>\n  <body>\n    <h1>سلام!</h1>\n    <p>اولین پاراگراف من.</p>\n  </body>\n</html>\n\n• تگ‌ها معمولاً جفت‌ان: باز <p> و بستهٔ </p>.\n• چیزی که می‌بینی توی body است؛ head اطلاعات مخفی صفحه‌ست.\n\nحالا تو: یه h1 و یه p توی ادیتور درس بنویس و پیش‌نمایش رو ببین — اگه تگ بستهٔ </p> رو برداری چی می‌شه؟ 🚀`,
    en: `HTML is the skeleton of a page, built from tags:\n\n<html>\n  <head><title>My site</title></head>\n  <body>\n    <h1>Hello!</h1>\n    <p>My first paragraph.</p>\n  </body>\n</html>\n\n• Tags come in pairs: opening <p> and closing </p>.\n• Visible content lives in body; head holds hidden info.\n\nYour move: write an h1 and a p in the lesson editor, then preview — what happens if you delete </p>? 🚀`,
  },
  {
    keys: /css|استایل|style|رنگ|color|سلکتور|selector|کلاس|class/i,
    fa: `CSS به HTML ظاهر می‌ده:\n\nh1 { color: teal; }\n.card { background: white; }\n\n• h1 → سلکتورِ تگ (همهٔ h1ها).\n• card. → سلکتورِ کلاس (هر عنصری با class="card").\n• داخل آکولاد: ویژگی: مقدار؛\n\nحالا تو: به h1 درس رنگ بده و اندازه‌ش رو با font-size عوض کن — اگه سلکتور رو h2 کنی چی می‌شه؟ 🚀`,
    en: `CSS gives HTML its looks:\n\nh1 { color: teal; }\n.card { background: white; }\n\n• h1 → a tag selector (every h1).\n• .card → a class selector (any element with class="card").\n• Inside braces: property: value;\n\nYour move: color the lesson's h1 and resize it with font-size — what changes if you switch the selector to h2? 🚀`,
  },
  {
    keys: /string|رشته|متن|capitalize|upper|lower|slice/i,
    fa: `رشته همون متنه — و کلی مهارت داره:\n\ns = "python"\nprint(s.upper())    → PYTHON\nprint(s[0])         → p\nprint(len(s))       → 6\n\n• هر حرف یه جایگاه داره (از صفر).\n• s.upper() نسخهٔ بزرگ‌نویسی‌شده می‌ده — خود s عوض نمی‌شه!\n\nحالا تو: اسمت رو با یه متغیر بگیر، حرف اولش رو چاپ کن و بعد کلش رو بزرگ کن. چه دیدی؟ 🚀`,
    en: `A string is text — and it comes with superpowers:\n\ns = "python"\nprint(s.upper())    → PYTHON\nprint(s[0])         → p\nprint(len(s))       → 6\n\n• Every character has a position (from 0).\n• s.upper() gives an uppercased COPY — s itself never changes!\n\nYour move: store your name, print its first letter, then print it uppercased. What did you notice? 🚀`,
  },
];

const GREETING_RE = /^\s*(سلام|درود|هی|چطوری|چطورید|خوبی|چه\s*خبر|چه\s*خبرها|سلام علیکم|whats\s*up|what\'s\s*up|hi\b|hello\b|hey\b)/i;

function localTopicReply(locale: string, question: string): string | null {
  const isFa = locale === "fa";
  if (GREETING_RE.test(question) && question.length < 40) {
    return isFa
      ? "سلام! خوش اومدی 🌟 من معلم سقراطی تکا هستم. یه چیز از درس بپرس — متغیر، شرط، حلقه، لیست، تابع، خطاها، یا تگ‌های HTML و استایل CSS — قدم‌به‌قدم با هم جلو می‌ریم!"
      : "Hi there! 🌟 I'm the TEKA Socratic tutor. Ask me anything from the course — variables, conditions, loops, lists, functions, errors, HTML tags or CSS styling — and we'll work through it step by step!";
  }
  for (const topic of LOCAL_TOPICS) {
    if (topic.keys.test(question)) return isFa ? topic.fa : topic.en;
  }
  return null;
}

// ─── External provider (production hosting) ─────────────────
// The sandbox SDK talks to a private endpoint that doesn't exist on real
// hosting. Any OpenAI-compatible provider (e.g. Z.ai's public API with the
// FREE glm-4.5-flash model) fills that gap via env vars:
//   AI_BASE_URL = https://api.z.ai/api/paas/v4
//   AI_API_KEY  = <your key>
//   AI_MODEL    = optional (default glm-4.5-flash)

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
  messages: TutorMessage[],
): Promise<string> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    messages: [{ role: "system", content: system }, ...messages],
    max_tokens: 700,
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

    const lastUser = [...body.messages].reverse().find((m) => m.role === "user");

    const ext = externalProviderConfig();
    try {
      // 1) Explicitly configured provider (production hosting, e.g. Vercel).
      if (ext) {
        try {
          const reply = await externalCompletion(ext, system, body.messages);
          return ok({ reply });
        } catch (extErr) {
          console.error(
            "[tutor] external provider failed:",
            extErr instanceof Error ? extErr.message : extErr,
          );
        }
      }
      // 2) Sandbox SDK (private endpoint — works in this dev environment).
      const zai = await withTimeout(ZAI.create(), SDK_TIMEOUT_MS, "zai-create");
      const completion = await withTimeout(
        zai.chat.completions.create({
          messages: sdkMessages,
          thinking: { type: "disabled" },
        }),
        SDK_TIMEOUT_MS,
        "zai-completion",
      );
      const raw = completion?.choices?.[0]?.message?.content;
      const reply = typeof raw === "string" ? raw.trim() : "";
      if (!reply) throw new Error("empty reply");
      return ok({ reply });
    } catch (err) {
      if (err instanceof HttpError) throw err;
      // Never leak internals (config paths, stacks) to the client.
      console.error("[tutor] completion failed:", err instanceof Error ? err.message : err);
      // AI backend unreachable (e.g. hosting without AI credentials) →
      // 1) try the local Socratic engine (topic-routed mini-lessons),
      // 2) otherwise fall back to the lesson-aware offline tutor.
      const question = lastUser?.content ?? "";
      const local = localTopicReply(locale, question);
      if (local) return ok({ reply: local, offline: true });
      const lesson = extractLesson(body.context);
      const reply = locale === "fa"
        ? offlineReplyFa(lesson, question)
        : offlineReplyEn(lesson, question);
      return ok({ reply, offline: true });
    }
  });
}
