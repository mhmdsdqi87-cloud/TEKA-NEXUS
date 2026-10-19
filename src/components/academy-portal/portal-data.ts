"use client";

// TEKA NEXUS ACADEMY — portal data layer.
// One hook fetches the exact same endpoints the academy view uses
// (GET /api/academy — no fabricated numbers anywhere), plus small pure
// selectors that derive "next lesson", per-course stats and journey state.

import { useCallback, useEffect, useMemo, useState } from "react";

import { get } from "@/lib/api";
import { useApp, type SessionUser } from "@/lib/store";
import { useI18n } from "@/lib/i18n/store";
import { COURSES, courseLessons, pick } from "@/lib/academy";
import type { Course } from "@/lib/academy/types";

import { PORTAL_DICT, type PortalDict } from "./portal-dict";

// ─── Section identity ────────────────────────────────────────
// Mirrors the View union: { name: "academyPortal", section?: ... }
export type PortalSection = "dashboard" | "paths" | "tools" | "tutor" | "certificates";

export const PORTAL_SECTIONS: PortalSection[] = ["dashboard", "paths", "tools", "tutor", "certificates"];

// ─── API response shapes (must match src/app/api/academy/route.ts) ──
export type ProgressMap = Record<string, { done: string[]; last?: string | null }>;
export type CertRow = { courseId: string; code: string; createdAt: string };
export type ExamSummary = { courseId: string; attemptsUsed: number; passed: boolean; bestScore: number };

type AcademyResponse = {
  progress: { courseId: string; completedLessons: string[]; lastLessonId: string | null }[];
  certificates: CertRow[];
  exams?: ExamSummary[];
};

export type PortalData = {
  loaded: boolean;
  failed: boolean;
  progress: ProgressMap;
  certs: CertRow[];
  exams: ExamSummary[];
};

/** What the sections receive: data + session + retry. */
export type PortalDataFull = PortalData & {
  user: SessionUser | null;
  refresh: () => Promise<void>;
};

/** Honest empty state for guests (no fake numbers, nothing pending). */
const EMPTY_PORTAL_DATA: PortalData = { loaded: true, failed: false, progress: {}, certs: [], exams: [] };

// ─── Hooks ───────────────────────────────────────────────────

export function usePortalDict(): PortalDict {
  const locale = useI18n((s) => s.locale);
  return PORTAL_DICT[locale] ?? PORTAL_DICT.en;
}

/** Raw fetch → parsed portal data (no React state, reusable by effect + retry). */
async function fetchAcademy(): Promise<Omit<PortalData, "loaded">> {
  const res = await get<AcademyResponse>("/api/academy");
  const map: ProgressMap = {};
  for (const p of res.progress) map[p.courseId] = { done: p.completedLessons, last: p.lastLessonId };
  return { failed: false, progress: map, certs: res.certificates, exams: res.exams ?? [] };
}

export function usePortalData(): PortalDataFull {
  const user = useApp((s) => s.user);
  const [state, setState] = useState<PortalData>({ loaded: false, failed: false, progress: {}, certs: [], exams: [] });

  useEffect(() => {
    if (!user) return;
    let alive = true;
    fetchAcademy()
      .then((d) => {
        if (alive) setState({ ...d, loaded: true });
      })
      .catch(() => {
        if (alive) setState((s) => ({ ...s, loaded: true, failed: true }));
      });
    return () => {
      alive = false;
    };
  }, [user]);

  const refresh = useCallback(async () => {
    try {
      const d = await fetchAcademy();
      setState({ ...d, loaded: true });
    } catch {
      setState((s) => ({ ...s, loaded: true, failed: true }));
    }
  }, []);

  // Guests derive an honest empty state — no fetch, no fake zeros from the server.
  const data = user ? state : EMPTY_PORTAL_DATA;
  return { user, ...data, refresh };
}

// ─── Pure selectors (real progress only — no invented stats) ──

export function courseOf(courseId: string): Course | undefined {
  return COURSES.find((c) => c.id === courseId);
}

export function courseStat(courseId: string, progress: ProgressMap) {
  const course = courseOf(courseId);
  const total = course ? courseLessons(course).length : 0;
  const done = progress[courseId]?.done.length ?? 0;
  return { course, total, done, pct: total ? done / total : 0 };
}

export type NextUp = {
  courseId: string;
  lessonId: string;
  courseTitle: string;
  lessonTitle: string;
  emoji: string;
} | null;

/** First incomplete lesson across both courses, in curriculum order. */
export function nextUpLesson(progress: ProgressMap, locale: string): NextUp {
  for (const course of COURSES) {
    const done = new Set(progress[course.id]?.done ?? []);
    const lesson = courseLessons(course).find((l) => !done.has(l.id));
    if (lesson) {
      return {
        courseId: course.id,
        lessonId: lesson.id,
        courseTitle: pick(course.title, locale),
        lessonTitle: pick(lesson.title, locale),
        emoji: course.emoji,
      };
    }
  }
  return null;
}

/** First incomplete lesson inside one course (falls back to the first lesson). */
export function nextLessonInCourse(courseId: string, progress: ProgressMap): { lessonId: string; fresh: boolean } | null {
  const course = courseOf(courseId);
  if (!course) return null;
  const done = new Set(progress[courseId]?.done ?? []);
  const lessons = courseLessons(course);
  const next = lessons.find((l) => !done.has(l.id));
  if (next) return { lessonId: next.id, fresh: done.size === 0 };
  return lessons.length ? { lessonId: lessons[0].id, fresh: false } : null;
}

export function courseDone(courseId: string, progress: ProgressMap): boolean {
  const { total, done } = courseStat(courseId, progress);
  return total > 0 && done >= total;
}

export function licenseCount(exams: ExamSummary[]): number {
  return exams.filter((e) => e.passed).length;
}

/** Per-module progress for the module-chip paths. */
export function moduleStats(course: Course, progress: ProgressMap) {
  const done = new Set(progress[course.id]?.done ?? []);
  return course.modules.map((m) => {
    const total = m.lessons.length;
    const doneCount = m.lessons.filter((l) => done.has(l.id)).length;
    const next = m.lessons.find((l) => !done.has(l.id)) ?? m.lessons[0];
    return { module: m, total, doneCount, nextLessonId: next?.id, complete: total > 0 && doneCount >= total };
  });
}

export function useLocale(): string {
  return useI18n((s) => s.locale);
}

/** Small helper: interpolate "{key}" tokens, mirroring the app's t(). */
export function fill(template: string, params: Record<string, string | number>): string {
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    template,
  );
}

/** Memoized next-up used by several sections. */
export function useNextUp(progress: ProgressMap): NextUp {
  const locale = useLocale();
  return useMemo(() => nextUpLesson(progress, locale), [progress, locale]);
}
