// TEKA NEXUS — TEKA Academy · JavaScript course (js-basics).
// Pure assembly: content lives in js-modules-a/b/c.ts.
// Rendered generically by the lesson player; graded by html-runner.tsx
// (DOM checks ~60ms after iframe load — challenges run synchronously).

import type { Course } from "./types";
import { jsModulesA } from "./js-modules-a";
import { jsModulesB } from "./js-modules-b";
import { jsModulesC } from "./js-modules-c";

export const jsCourse: Course = {
  id: "js-basics",
  language: "html",
  title: { en: "JavaScript: Make Pages Come Alive", fa: "جاوااسکریپت: صفحه را زنده کن" },
  tagline: {
    en: "The language that powers every app you love. From your first <script> tag to games, events and a real capstone app — 70 interactive lessons, right in your browser.",
    fa: "زبانی که پشت همه‌ی اپ‌هایی که دوست داری است. از اولین تگ script تا بازی‌ها، ایونت‌ها و یک اپ واقعیِ پایانی — ۷۰ درس تعاملی، همان‌جا تو مرورگر.",
  },
  accent: "emerald",
  emoji: "⚡",
  modules: [...jsModulesA, ...jsModulesB, ...jsModulesC],
};
