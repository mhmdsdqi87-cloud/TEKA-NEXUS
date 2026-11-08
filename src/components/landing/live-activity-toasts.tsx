"use client";

// TEKA NEXUS — Live activity toasts (landing ambience layer).
// Rotating social-proof toasts: simulated member moments (joined, completed a
// lesson, earned XP, published a project, joined a team, got a certificate).
// Pure client-side: renders nothing on the server, so SSR markup never
// mismatches — the "alive" feel is visual ambience only, no fake data ever
// touches the API or the database.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Rocket,
  UserPlus,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { useI18n } from "@/lib/i18n/store";
import { useT } from "@/lib/i18n";

type ActivityKind = "joined" | "lesson" | "xp" | "project" | "teammate" | "certificate";

type LiveActivity = {
  id: number;
  kind: ActivityKind;
  name: string;
  city: string;
  item: string;
  xp: number;
  color: string;
};

const KIND_ICON: Record<ActivityKind, LucideIcon> = {
  joined: UserPlus,
  lesson: GraduationCap,
  xp: Zap,
  project: Rocket,
  teammate: Users,
  certificate: Award,
};

// Avatar accent palette — mirrors the landing accents (cyan/violet/emerald/…).
const COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#fbbf24", "#fb7185", "#f472b6"];

// ── Pools ─────────────────────────────────────────────────────
// Persian-script pools for fa/ar audiences, Latin transliterations elsewhere.
// Proper nouns — deliberately NOT part of the i18n dictionaries.

const NAMES_FA = [
  "علی رضایی", "محمد کریمی", "سارا محمدی", "زهرا حسینی", "رضا موسوی",
  "حسین احمدی", "فاطمه نوری", "امیر شریفی", "نگار صادقی", "پارسا جعفری",
  "آوا رحیمی", "کیان مرادی", "درسا کاظمی", "آرش توکلی", "مینا اکبری",
  "سینا قاسمی", "الهام یوسفی", "بردیا ملکی", "ترانه عبدی", "نیما فرهادی",
];

const NAMES_LATIN = [
  "Ali Rezaei", "Mohammad Karimi", "Sara Mohammadi", "Zahra Hosseini", "Reza Mousavi",
  "Hossein Ahmadi", "Fateme Nouri", "Amir Sharifi", "Negar Sadeghi", "Parsa Jafari",
  "Ava Rahimi", "Kian Moradi", "Dorsa Kazemi", "Arash Tavakoli", "Mina Akbari",
  "Sina Ghasemi", "Elham Yousefi", "Bardia Maleki", "Taraneh Abdi", "Nima Farhadi",
];

const CITIES_FA = [
  "تهران", "مشهد", "اصفهان", "شیراز", "تبریز", "کرج", "قم", "اهواز",
  "رشت", "یزد", "کرمان", "ارومیه", "سنندج", "همدان", "بندرعباس",
];

const CITIES_LATIN = [
  "Tehran", "Mashhad", "Isfahan", "Shiraz", "Tabriz", "Karaj", "Qom", "Ahvaz",
  "Rasht", "Yazd", "Kerman", "Urmia", "Sanandaj", "Hamadan", "Bandar Abbas",
];

const COURSES_FA = [
  "پایتون", "HTML و CSS", "جاوااسکریپت", "گیت و گیت‌هاب", "ترمینال لینوکس", "فرانت‌اند",
];

const COURSES_LATIN = [
  "Python", "HTML & CSS", "JavaScript", "Git & GitHub", "Linux Terminal", "Front-end",
];

const PROJECTS_FA = [
  "نکسوس چت", "فروشگاه آنلاین", "وبلاگ کدنویس", "ربات تلگرام",
  "داشبورد آب‌وهوا", "مدیریت وظایف",
];

const PROJECTS_LATIN = [
  "Nexus Chat", "Online Shop", "Dev Blog", "Telegram Bot",
  "Weather Dashboard", "Task Manager",
];

const XP_AMOUNTS = [25, 40, 60, 75, 90, 120, 150, 200];

// Kind pick weights — lessons & joins dominate, certificates are rarer.
const KIND_POOL: ActivityKind[] = [
  "lesson", "lesson", "lesson", "lesson",
  "xp", "xp", "xp",
  "joined", "joined", "joined",
  "project", "project",
  "teammate",
  "certificate",
];

// ── Timing ────────────────────────────────────────────────────
const FIRST_DELAY_MS = 7_000;   // let the boot show + hero settle first
const VISIBLE_MS = 6_500;       // how long one toast stays
const GAP_MIN_MS = 12_000;      // quiet time between toasts
const GAP_JITTER_MS = 6_000;

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pick = <T,>(pool: readonly T[]): T => pool[Math.floor(Math.random() * pool.length)];

function formatXp(xp: number, locale: string): string {
  try {
    return xp.toLocaleString(locale === "fa" ? "fa-IR" : locale);
  } catch {
    return String(xp);
  }
}

export function LiveActivityToasts() {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  // Starts null on both server and client — SSR-safe, no hydration mismatch.
  // The loop below only touches state from timer callbacks, never inline.
  const [activity, setActivity] = useState<LiveActivity | null>(null);
  const nextId = useRef(1);

  const makeActivity = useCallback((): LiveActivity => {
    const persianScript = locale === "fa" || locale === "ar";
    const names = persianScript ? NAMES_FA : NAMES_LATIN;
    const cities = persianScript ? CITIES_FA : CITIES_LATIN;
    const courses = persianScript ? COURSES_FA : COURSES_LATIN;
    const projects = persianScript ? PROJECTS_FA : PROJECTS_LATIN;

    const kind = pick(KIND_POOL);
    let item = "";
    if (kind === "lesson" || kind === "certificate") item = pick(courses);
    if (kind === "project" || kind === "teammate") item = pick(projects);

    return {
      id: nextId.current++,
      kind,
      name: pick(names),
      city: pick(cities),
      item,
      xp: pick(XP_AMOUNTS),
      color: pick(COLORS),
    };
  }, [locale]);

  // Toast loop — single flight, respectful gaps, paused while the tab is hidden.
  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const scheduleNext = (delay: number) => {
      showTimer = setTimeout(cycle, delay);
    };

    const cycle = () => {
      if (typeof document !== "undefined" && document.hidden) {
        // Tab in background — try again soon, don't stack toasts.
        scheduleNext(9_000);
        return;
      }
      setActivity(makeActivity());
      hideTimer = setTimeout(() => setActivity(null), VISIBLE_MS);
      scheduleNext(GAP_MIN_MS + Math.random() * GAP_JITTER_MS);
    };

    scheduleNext(FIRST_DELAY_MS);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [makeActivity]);

  const Icon = activity ? KIND_ICON[activity.kind] : null;

  const text = activity
    ? t(`landing.live2.${activity.kind}`, {
        name: activity.name,
        city: activity.city,
        item: activity.item,
        xp: formatXp(activity.xp, locale),
      })
    : "";

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 end-4 z-40 sm:bottom-6 sm:end-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <AnimatePresence>
        {activity && Icon && (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="pointer-events-auto flex w-[min(92vw,22rem)] items-start gap-3 rounded-2xl border border-white/10 bg-[#0d0d14]/95 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md"
            role="status"
          >
            <span
              aria-hidden
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#08080d]"
              style={{ backgroundColor: activity.color }}
            >
              {Array.from(activity.name)[0]}
            </span>

            <div className="min-w-0 flex-1">
              <p className="flex items-start gap-1.5 text-[13px] leading-5 text-foreground/90">
                <Icon aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                <span className="line-clamp-2">{text}</span>
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-300/90">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {t("landing.live.label")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActivity(null)}
              aria-label={t("landing.live2.dismiss")}
              className="-m-1 rounded-full p-1 text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <X aria-hidden className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
