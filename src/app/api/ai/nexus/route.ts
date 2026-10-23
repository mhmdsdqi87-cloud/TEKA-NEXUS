// TEKA NEXUS — POST /api/ai/nexus  (Task 13: "دستیار هوشمند قوی")
// The platform-wide NEXUS AI copilot. Unlike the Academy tutor (course-scoped
// Socratic teacher), this assistant knows the WHOLE platform: it receives a
// real snapshot of live community data (stats, top projects, leaderboard,
// current challenge, the caller's own profile) and answers questions about
// the platform, recommends projects/teammates, helps shape ideas, and helps
// with general dev questions.
//
// Provider chain (mirrors /api/academy/tutor):
//   1. External OpenAI-compatible provider (AI_BASE_URL/AI_API_KEY on prod)
//   2. Sandbox SDK (z-ai-web-dev-sdk — backend only)
//   3. Honest offline fallback built from REAL platform data (never fabricates)
//
// Stateless: the client re-sends capped history each turn. Per-user sliding
// window rate limit. maxDuration=60.

import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";

import { db } from "@/lib/db";
import { handle, HttpError, ok, requireUser } from "@/lib/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ─── Request contract ────────────────────────────────────────

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const Body = z.object({
  messages: z.array(MessageSchema).min(1).max(16),
  locale: z.enum(["en", "fa", "es", "zh", "ar", "fr"]).optional(),
});

type NexusMessage = z.infer<typeof MessageSchema>;

// ─── Rate limit: 15 requests / 5 min / user ──────────────────

const RATE_WINDOW_MS = 5 * 60_000;
const RATE_MAX = 15;
const rateHits = new Map<string, number[]>();

function rateLimit(userId: string) {
  const now = Date.now();
  const list = (rateHits.get(userId) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) {
    const waitMin = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - list[0])) / 60_000));
    throw new HttpError(
      `NEXUS AI needs a short breather — try again in about ${waitMin} minute${waitMin === 1 ? "" : "s"}.`,
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

// ─── Live platform snapshot (REAL data, injected into prompt) ─

type Snapshot = {
  users: number;
  projects: number;
  likes: number;
  comments: number;
  chats: number;
  follows: number;
  topProjects: { name: string; slug: string; tagline: string; status: string; likes: number; members: number; skills: string[] }[];
  topUsers: { displayName: string; username: string; xp: number }[];
  challenge: { title: string; description: string; xpReward: number; target: number; weekEnd: string; entries: number } | null;
  me: {
    username: string;
    displayName: string;
    xp: number;
    level: number;
    reputation: number;
    interests: string[];
    skills: string[];
    ownedProjects: string[];
    memberProjects: string[];
  };
};

const FRESH_WINDOW_DAYS = 60;

async function buildSnapshot(userId: string): Promise<Snapshot> {
  const [users, projects, likes, comments, chats, follows, pool, topUsers, challengeRaw, me] =
    await Promise.all([
      db.user.count(),
      db.project.count({ where: { visibility: "PUBLIC" } }),
      db.projectLike.count(),
      db.projectComment.count({ where: { deletedAt: null } }),
      db.chatMessage.count(),
      db.follow.count(),
      db.project.findMany({
        where: { visibility: "PUBLIC" },
        orderBy: { updatedAt: "desc" },
        take: 40,
        select: {
          name: true,
          slug: true,
          tagline: true,
          status: true,
          updatedAt: true,
          requiredSkills: { select: { skill: { select: { slug: true } } }, take: 4 },
          _count: { select: { members: true, likes: true } },
        },
      }),
      db.user.findMany({
        orderBy: { xp: "desc" },
        take: 3,
        select: { displayName: true, username: true, xp: true },
      }),
      db.challenge.findFirst({
        where: { isActive: true },
        orderBy: { weekStart: "desc" },
        include: { _count: { select: { entries: true } } },
      }),
      db.user.findUnique({
        where: { id: userId },
        select: {
          username: true,
          displayName: true,
          xp: true,
          reputation: true,
          interests: true,
          userSkills: { select: { skill: { select: { slug: true } } } },
          ownedProjects: { where: { archivedAt: null }, select: { name: true } },
          projectMemberships: { select: { project: { select: { name: true } } }, take: 6 },
        },
      }),
    ]);

  // Same spirit as the real popularity formula (likes×3 + members×4, freshness
  // over 60d) but computed inline on a small pool — a nudge, not a re-implementation.
  const scored = pool
    .map((p) => {
      const ageDays = Math.max(0, (Date.now() - p.updatedAt.getTime()) / 86_400_000);
      const freshness = Math.max(0.5, 1 - ageDays / FRESH_WINDOW_DAYS);
      return { p, score: (p._count.likes * 3 + p._count.members * 4) * freshness };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const level = me ? Math.floor(Math.sqrt(me.xp / 100)) + 1 : 0;

  return {
    users,
    projects,
    likes,
    comments,
    chats,
    follows,
    topProjects: scored.map(({ p }) => ({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline,
      status: p.status,
      likes: p._count.likes,
      members: p._count.members,
      skills: p.requiredSkills.map((s) => s.skill.slug),
    })),
    topUsers,
    challenge: challengeRaw
      ? {
          title: challengeRaw.title,
          description: challengeRaw.description,
          xpReward: challengeRaw.xpReward,
          target: challengeRaw.target,
          weekEnd: challengeRaw.weekEnd.toISOString(),
          entries: challengeRaw._count.entries,
        }
      : null,
    me: {
      username: me?.username ?? "",
      displayName: me?.displayName ?? "",
      xp: me?.xp ?? 0,
      level,
      reputation: me?.reputation ?? 0,
      interests: safeParse(me?.interests ?? "[]"),
      skills: me?.userSkills.map((s) => s.skill.slug) ?? [],
      ownedProjects: me?.ownedProjects.map((p) => p.name) ?? [],
      memberProjects: me?.projectMemberships.map((m) => m.project.name) ?? [],
    },
  };
}

function safeParse(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String).slice(0, 10) : [];
  } catch {
    return [];
  }
}

function snapshotToText(s: Snapshot, locale: string): string {
  const lines: string[] = [];
  lines.push(
    `LIVE PLATFORM SNAPSHOT (real numbers — never invent or contradict these):`,
    `users=${s.users}, public_projects=${s.projects}, likes=${s.likes}, comments=${s.comments}, chat_messages=${s.chats}, follows=${s.follows}`,
    `top_projects_by_popularity: ${s.topProjects
      .map((p) => `${p.name} (/${p.slug}) — ${p.tagline} [${p.status}], ♥${p.likes} ◉${p.members}, skills: ${p.skills.join(",") || "-"}`)
      .join(" | ") || "none yet"}`,
    `xp_leaders: ${s.topUsers.map((u) => `${u.displayName} (@${u.username}, ${u.xp} XP)`).join(", ") || "-"}`,
    s.challenge
      ? `active_challenge: "${s.challenge.title}" — ${s.challenge.description} (+${s.challenge.xpReward} XP, target ${s.challenge.target} activities, ${s.challenge.entries} participants, ends ${s.challenge.weekEnd})`
      : `active_challenge: none this week`,
    `caller_profile: @${s.me.username} (${s.me.displayName}), level ${s.me.level}, ${s.me.xp} XP, reputation ${s.me.reputation}, interests: ${s.me.interests.join(",") || "-"}, skills: ${s.me.skills.join(",") || "-"}, owns: ${s.me.ownedProjects.join(", ") || "-"}, member_of: ${s.me.memberProjects.join(", ") || "-"}`,
    `platform_features: Academy (free Python/HTML courses + certificates), Projects (launch/join teams, tasks, updates, team chat), Weekly Challenge + XP leaderboard, Nexus Terminal (live console + activity feed), DMs, follow/save/like, personalized project backgrounds, GitHub panels.`,
    locale === "fa" ? `زبان پاسخ: فارسی محاوره‌ای.` : `Reply language: ${locale}.`,
  );
  return lines.join("\n");
}

// ─── System prompts ──────────────────────────────────────────

const SYSTEM_FA = `تو «NEXUS AI» هستی — دستیار هوشمندِ قدرتمند پلتفرم TEKA NEXUS (شبکهٔ اجتماعی تکنولوژی و آکادمی رایگان برنامه‌نویسی ایرانی).

توانایی‌ها و وظایف:
- دربارهٔ خود پلتفرم جواب بده: آکادمی، پروژه‌ها، تیم‌ها، چالش هفته، XP و لیدربورد، ترمینال نکسوس، چت تیمی، دنبال‌کردن، پس‌زمینهٔ شخصی‌سازی‌شدهٔ پروژه‌ها.
- با داده‌های واقعیِ «PLATFORM SNAPSHOT» پیشنهاد بده: پروژهٔ مناسب، هم‌تیمی بالقوه، مسیر رشد XP. هرگز عدد پلتفرم را از خودت نساز — فقط از اسنپ‌شات استفاده کن؛ اگر چیزی در اسنپ‌شات نبود صادقانه بگو نمی‌دانم.
- کمک فنی: پایتون، وب، گیت، معماری، دیباگ — کوتاه، دقیق، با مثال. اگر کد می‌دهی بنویس «پیشنهادی — خودت چکش کن» و ادعا نکن اجرا کرده‌ای.
- ایده‌پردازی: برای ایدهٔ پروژهٔ کاربر، نام/تگ‌لاین/توضیح کوتاه پیشنهاد بده و بگو چه مهارت‌هایی لازم است.
- انگیزه‌دهی: لحن گرم و پرانرژی؛ ایموجی کم ولی به‌جا.

سبک: پاسخ زیر ۲۲۰ کلمه مگر اینکه عمق بخواهند، بدون هدینگ مارک‌داون، از بولت‌های کوتاه استفاده کن.
محدودیت‌ها: بحث‌های نامرتبط با ساختن/یادگیری را مؤدبانه رد کن. هرگز نگو که می‌توانی چیزی را اجرا کنی یا به دیتابیس زنده دسترسی داری — فقط اسنپ‌شاتِ همین لحظه را داری.`;

const SYSTEM_EN = `You are "NEXUS AI" — the powerful built-in copilot of TEKA NEXUS (a Persian tech social platform + free coding academy).

Abilities & duties:
- Answer anything about the platform: Academy, projects, teams, weekly challenge, XP & leaderboard, Nexus Terminal, team chat, follows, personalized project backgrounds.
- Recommend using the REAL "PLATFORM SNAPSHOT" data: fitting projects, potential teammates, XP growth paths. NEVER invent platform numbers — use the snapshot only; if something isn't in it, honestly say you don't know.
- Technical help: Python, web, git, architecture, debugging — concise, precise, with small examples. If you show code, label it "proposed — verify it"; never claim you executed anything.
- Ideation: given the user's idea, suggest name/tagline/short description and required skills.
- Motivation: warm, energetic tone; sparing but well-placed emoji.

STYLE: concise plain text (no markdown headings), short bullets, under 220 words unless depth is requested.
LIMITS: politely decline topics unrelated to building/learning. Never claim you can execute code or query a live database — you only have the moment's snapshot.`;

// ─── Providers ───────────────────────────────────────────────

const SDK_TIMEOUT_MS = 15_000;
const EXTERNAL_TIMEOUT_MS = 30_000;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error(`${label}-timeout`)), ms)),
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
  messages: NexusMessage[],
): Promise<string> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    messages: [{ role: "system", content: system }, ...messages],
    max_tokens: 900,
  };
  if (cfg.isZai) body.thinking = { type: "disabled" };
  const res = await withTimeout(
    fetch(`${cfg.base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.key}` },
      body: JSON.stringify(body),
    }),
    EXTERNAL_TIMEOUT_MS,
    "nexus-external",
  );
  if (!res.ok) throw new Error(`provider responded ${res.status}`);
  const data = (await res.json()) as { choices?: { message?: { content?: unknown } }[] };
  const raw = data?.choices?.[0]?.message?.content;
  const reply = typeof raw === "string" ? raw.trim() : "";
  if (!reply) throw new Error("empty provider reply");
  return reply;
}

// ─── Offline fallback (real data, zero fabrication) ──────────

function offlineReply(s: Snapshot, locale: string, question: string): string {
  const fa = locale === "fa";
  const q = question.toLowerCase();
  const parts: string[] = [];

  if (fa) {
    parts.push("🛰 حالت آفلاین: به مغز اصلی وصل نیستم، ولی با داده‌های زندهٔ خود پلتفرم جواب می‌دم — این‌ها عدد واقعی همین لحظه‌ست:");
    parts.push(`👥 ${s.users} کاربر · 🚀 ${s.projects} پروژهٔ عمومی · ♥️ ${s.likes} لایک · 💬 ${s.comments} نظر · ✉️ ${s.chats} پیام چت`);
  } else {
    parts.push("🛰 Offline mode: can't reach the main brain, but here are REAL live platform numbers:");
    parts.push(`👥 ${s.users} users · 🚀 ${s.projects} public projects · ♥️ ${s.likes} likes · 💬 ${s.comments} comments · ✉️ ${s.chats} chat messages`);
  }

  if (/چالش|challenge|چی کار کنم|چه کنم|activity|فعالیت/.test(q) && s.challenge) {
    parts.push(
      fa
        ? `🏆 چالش این هفته: «${s.challenge.title}» — ${s.challenge.description} (+${s.challenge.xpReward} XP، ${s.challenge.entries} نفر شرکت کردن). از بخش «مرکز فرمان» می‌تونی عضو شی.`
        : `🏆 This week's challenge: "${s.challenge.title}" — ${s.challenge.description} (+${s.challenge.xpReward} XP, ${s.challenge.entries} joined). Join from the Command Center.`,
    );
  }

  if (/پروژه|project|پیشنهاد|recommend|تیم|team/.test(q) || parts.length <= 2) {
    parts.push(
      fa
        ? `🔥 داغ‌ترین پروژه‌ها الان:\n${s.topProjects.map((p) => `• ${p.name} — ${p.tagline} (♥${p.likes} · ◉${p.members})`).join("\n") || "• هنوز پروژه‌ای نیست — تو اول باش!"}`
        : `🔥 Hottest projects right now:\n${s.topProjects.map((p) => `• ${p.name} — ${p.tagline} (♥${p.likes} · ◉${p.members})`).join("\n") || "• No projects yet — be the first!"}`,
    );
  }

  if (s.topUsers.length) {
    parts.push(
      fa
        ? `⚡ لیدرهای XP: ${s.topUsers.map((u) => `${u.displayName} (${u.xp})`).join(" · ")}`
        : `⚡ XP leaders: ${s.topUsers.map((u) => `${u.displayName} (${u.xp})`).join(" · ")}`,
    );
  }

  parts.push(
    fa
      ? `سؤال دقیقت رو دوباره بپرس وقتی آنلاین شدم — یا از ترمینال نکسوس دستور 'help' رو امتحان کن! 🚀`
      : `Ask me again once I'm back online — or try 'help' in the Nexus Terminal! 🚀`,
  );
  return parts.join("\n");
}

// ─── Handler ─────────────────────────────────────────────────

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    rateLimit(user.id);

    const locale = body.locale ?? "fa";
    const snapshot = await buildSnapshot(user.id);
    const system =
      (locale === "fa" ? SYSTEM_FA : SYSTEM_EN) + "\n\n" + snapshotToText(snapshot, locale);

    const sdkMessages: { role: "assistant" | NexusMessage["role"]; content: string }[] = [
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
            "[nexus-ai] external provider failed:",
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
      console.error("[nexus-ai] completion failed:", err instanceof Error ? err.message : err);
      // 3) Honest offline fallback built from the REAL snapshot.
      return ok({ reply: offlineReply(snapshot, locale, lastUser?.content ?? ""), offline: true });
    }
  });
}
