// TEKA NEXUS — GET /api/os/timemachine  (Task 19-g)
// Cinematic journey replay payload: every milestone of the user's story —
// join day, first lesson, course completions, certificates, boss wins,
// solved crime cases, minted cards — ending at the present day with XP.

import { HttpError, handle, ok, requireUser } from "@/lib/server";
import { db } from "@/lib/db";
import { COURSES, courseLessons } from "@/lib/academy";

export const dynamic = "force-dynamic";

type Milestone = { date: string; icon: string; fa: string; en: string; detail?: string };

/** COURSES registry → id lookup for resolving localized titles + lesson counts. */
const COURSE_BY_ID = new Map(COURSES.map((c) => [c.id, c]));

export async function GET() {
  return handle(async () => {
    const auth = await requireUser();

    const u = await db.user.findUnique({
      where: { id: auth.id },
      select: { displayName: true, createdAt: true, xp: true, coins: true, team: true, title: true },
    });
    if (!u) throw new HttpError("User not found.", 404);

    const now = new Date();
    const milestones: Milestone[] = [
      { date: u.createdAt.toISOString(), icon: "🚀", fa: "به تکا نکسوس پیوست", en: "Joined TEKA NEXUS" },
    ];

    const [firstLesson, progressRows, certificates, wonBosses, solvedCrimes, cards] = await Promise.all([
      // First finished lesson, whenever it happened.
      db.activityLog.findFirst({
        where: { userId: auth.id, kind: "lesson" },
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { createdAt: true },
      }),
      // Academy progress — a row counts as completed when its completedLessons
      // list covers the course's full lesson count (COURSES resolves counts/titles).
      db.academyProgress.findMany({
        where: { userId: auth.id },
        select: { courseId: true, completedLessons: true, updatedAt: true },
      }),
      db.academyCertificate.findMany({
        where: { userId: auth.id },
        select: { courseId: true, createdAt: true },
      }),
      db.bossBattle.findMany({
        where: { userId: auth.id, status: "WON" },
        select: { courseId: true, moduleId: true, startedAt: true, finishedAt: true },
      }),
      db.crimeProgress.findMany({
        where: { userId: auth.id, solved: true },
        select: { caseId: true, finishedAt: true, updatedAt: true },
      }),
      db.card.findMany({
        where: { userId: auth.id },
        select: { kind: true, createdAt: true },
      }),
    ]);

    if (firstLesson) {
      milestones.push({
        date: firstLesson.createdAt.toISOString(),
        icon: "📘",
        fa: "اولین درس را تمام کرد",
        en: "Finished the first lesson",
      });
    }

    for (const p of progressRows) {
      const course = COURSE_BY_ID.get(p.courseId);
      if (!course) continue;
      let done: string[] = [];
      try {
        done = JSON.parse(p.completedLessons) as string[];
      } catch {
        done = [];
      }
      if (done.length >= courseLessons(course).length) {
        milestones.push({
          date: p.updatedAt.toISOString(),
          icon: "🎓",
          fa: `دوره ${course.title.fa} را تمام کرد`,
          en: `Completed ${course.title.en}`,
        });
      }
    }

    for (const cert of certificates) {
      const course = COURSE_BY_ID.get(cert.courseId);
      const titleFa = course?.title.fa ?? cert.courseId;
      const titleEn = course?.title.en ?? cert.courseId;
      milestones.push({
        date: cert.createdAt.toISOString(),
        icon: "📜",
        fa: `گواهینامه ${titleFa} گرفت`,
        en: `Earned the ${titleEn} certificate`,
      });
    }

    for (const b of wonBosses) {
      milestones.push({
        date: (b.finishedAt ?? b.startedAt).toISOString(),
        icon: "⚔️",
        fa: "باس را شکست داد",
        en: "Defeated a boss",
        detail: `${b.courseId}:${b.moduleId}`,
      });
    }

    for (const c of solvedCrimes) {
      milestones.push({
        date: (c.finishedAt ?? c.updatedAt).toISOString(),
        icon: "🕵️",
        fa: "پرونده جنایی را حل کرد",
        en: "Solved a crime case",
        detail: c.caseId,
      });
    }

    for (const card of cards) {
      milestones.push({
        date: card.createdAt.toISOString(),
        icon: "🃏",
        fa: `کارت ${card.kind} ضرب شد`,
        en: `Minted the ${card.kind} card`,
      });
    }

    // The story continues — present-day node with live XP.
    milestones.push({
      date: now.toISOString(),
      icon: "⚡",
      fa: `${u.xp} XP — و ادامه داستان...`,
      en: `${u.xp} XP — and the story continues...`,
    });

    // ISO strings sort chronologically as plain strings — oldest first.
    milestones.sort((a, b) => a.date.localeCompare(b.date));

    return ok({ displayName: u.displayName, memberSince: u.createdAt.toISOString(), milestones });
  });
}
