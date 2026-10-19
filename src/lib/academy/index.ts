// TEKA NEXUS — TEKA Academy course registry (shared client + server).

import { pythonCourse } from "./course-python";
import { htmlCourse } from "./course-html";
import type { Course } from "./types";

export const COURSES: Course[] = [pythonCourse, htmlCourse];

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export { courseLessons, courseMinutes, pick } from "./types";
export type { Course, Lesson, Module, Step } from "./types";
