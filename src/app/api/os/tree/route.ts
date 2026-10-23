// TEKA NEXUS — GET /api/os/tree  (Task 19)
// The Skill Tree galaxy map payload. Computes the real state of every node
// from live progress — completed lessons, won bosses, unlocked specials.
// Never fake: a node is "done" only when the corresponding rows say so.

import { db } from "@/lib/db";
import { handle, ok, requireUser } from "@/lib/server";
import { COURSES, courseLessons, getCourse } from "@/lib/academy";
import { TREE_NODES, TREE_BRANCHES } from "@/lib/os/tree";

export const dynamic = "force-dynamic";

type NodeState = "done" | "open" | "locked";

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const [progressRows, bossWins, pet, fresh, speedruns, crimes] = await Promise.all([
      db.academyProgress.findMany({ where: { userId: user.id } }),
      db.bossBattle.findMany({
        where: { userId: user.id, status: "WON" },
        select: { courseId: true, moduleId: true },
      }),
      db.pet.findUnique({ where: { userId: user.id }, select: { id: true } }),
      db.user.findUnique({ where: { id: user.id }, select: { team: true } }),
      db.speedrunRecord.count({ where: { userId: user.id } }),
      db.crimeProgress.findMany({
        where: { userId: user.id, solved: true },
        select: { caseId: true },
      }),
    ]);

    // courseId → set of completed lesson ids (JSON column).
    const completed = new Map<string, Set<string>>();
    for (const row of progressRows) {
      let ids: unknown = [];
      try {
        ids = JSON.parse(row.completedLessons);
      } catch {
        ids = [];
      }
      const set = new Set<string>();
      if (Array.isArray(ids)) {
        for (const id of ids) if (typeof id === "string") set.add(id);
      }
      completed.set(row.courseId, set);
    }

    // Boss wins keyed "courseId:moduleId" ("__final__" = course master).
    const wonBosses = new Set(bossWins.map((b) => `${b.courseId}:${b.moduleId}`));

    // Special island completions.
    const specials = new Set<string>();
    if (pet) specials.add("pet");
    if (fresh?.team) specials.add("war");
    if (speedruns > 0) specials.add("speedrun");
    for (const c of crimes) if (c.caseId) specials.add(c.caseId);

    /** Lesson stats for a "courseId:moduleId" ref (required count + done). */
    const moduleStats = (ref: string) => {
      const [courseId, moduleId] = ref.split(":");
      const mod = getCourse(courseId)?.modules.find((m) => m.id === moduleId);
      if (!mod) return null;
      const doneSet = completed.get(courseId) ?? new Set<string>();
      return {
        done: mod.lessons.filter((l) => doneSet.has(l.id)).length,
        total: mod.lessons.length,
      };
    };

    // Pass 1 — is each node done? (and gather progress for display)
    const doneById = new Map<string, boolean>();
    const progressByNode = new Map<string, { done: number; total: number }>();

    for (const n of TREE_NODES) {
      if (n.kind === "module") {
        const s = moduleStats(n.ref);
        if (s) progressByNode.set(n.id, s);
        doneById.set(n.id, !!s && s.total > 0 && s.done >= s.total);
      } else if (n.kind === "boss") {
        // Report the module's required lesson count so the UI can show how
        // close the learner is to unlocking this boss.
        const s = moduleStats(n.ref);
        if (s) progressByNode.set(n.id, s);
        doneById.set(n.id, wonBosses.has(n.ref));
      } else if (n.kind === "final") {
        const courseId = n.ref.split(":")[0];
        const course = COURSES.find((c) => c.id === courseId) ?? getCourse(courseId);
        if (course) {
          const doneSet = completed.get(courseId) ?? new Set<string>();
          const lessons = courseLessons(course);
          progressByNode.set(n.id, {
            done: lessons.filter((l) => doneSet.has(l.id)).length,
            total: lessons.length,
          });
        }
        doneById.set(n.id, wonBosses.has(n.ref));
      } else {
        doneById.set(n.id, specials.has(n.ref));
      }
    }

    // Pass 2 — lock state: locked while any prerequisite node is not done.
    const nodes = TREE_NODES.map((n) => {
      const done = doneById.get(n.id) ?? false;
      const locked = !done && n.requires.some((r) => !doneById.get(r));
      const state: NodeState = done ? "done" : locked ? "locked" : "open";
      const progress = progressByNode.get(n.id);
      return { ...n, state, ...(progress ? { progress } : {}) };
    });

    return ok({
      nodes,
      branches: TREE_BRANCHES,
      stats: {
        done: nodes.filter((n) => n.state === "done").length,
        total: nodes.length,
      },
    });
  });
}
