// TEKA NEXUS — TEKA Academy · CSS course (css-basics).
// Pure assembly: content lives in css-modules-a/b/c.ts.
// Rendered generically by the lesson player; graded by html-runner.tsx
// (DOM checks — <style> contents are not gradeable, inline styles are).

import type { Course } from "./types";
import { cssModulesA } from "./css-modules-a";
import { cssModulesB } from "./css-modules-b";
import { cssModulesC } from "./css-modules-c";

export const cssCourse: Course = {
  id: "css-basics",
  language: "html",
  title: { en: "CSS: Style the Web", fa: "سی‌اس‌اس: به وب رنگ و روح بده" },
  tagline: {
    en: "Turn plain HTML into pages people fall in love with — colors, layout, flexbox, grid, effects and a full glass-design capstone. 81 hands-on lessons, 100% free.",
    fa: "اچ‌تی‌ام‌الِ خالی را به صفحه‌هایی تبدیل کن که آدم عاشقشان می‌شود — رنگ، چیدمان، فلکس‌باکس، گرید، جلوه‌ها و یک پروژه‌ی پایانی حرفه‌ای. ۸۱ درس عملی، صددرصد رایگان.",
  },
  accent: "violet",
  emoji: "🎨",
  modules: [...cssModulesA, ...cssModulesB, ...cssModulesC],
};
