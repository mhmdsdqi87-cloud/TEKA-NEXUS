"use client";

// TEKA NEXUS — About view (Task 20).
// A cinematic, bilingual (fa/en) dossier: what TEKA NEXUS is, every module,
// who built it (Mohammad Sadeghi) and how to connect. Designed to be read by
// humans *and* scholarship reviewers — the founder story is front and center.

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Braces,
  Check,
  Copy,
  Flag,
  Gamepad2,
  GraduationCap,
  HandCoins,
  Hourglass,
  IdCard,
  Languages,
  Mail,
  Map as MapIcon,
  Mic,
  Rocket,
  Scale,
  ShieldCheck,
  Sparkles,
  Swords,
  TerminalSquare,
  Timer,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n/store";
import { AnimatedNumber } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────── copy (fa/en) ────────────────────────────── */

const COPY = {
  fa: {
    dir: "rtl" as const,
    back: "بازگشت",
    badge: "ساخته‌شده در ایران — تک‌نفره، از صفر تا صد",
    title: "TEKA NEXUS",
    tagline: "جایی که ایده‌ها به تکنولوژی واقعی تبدیل می‌شوند.",
    intro:
      "TEKA NEXUS یک پلتفرم اجتماعیِ برنامه‌نویس‌محور به‌همراه یک آکادمی برنامه‌نویسی رایگان است؛ در قالب یک وب‌اپلیکیشن قابل نصب (PWA). همه‌چیز — از طراحی رابط کاربری و معماری دیتابیس تا محتوای ۳۰۰ درس — توسط یک نفر طراحی، توسعه و تست شده است.",
    ctaEnter: "ورود به پلتفرم",
    connectTitle: "ارتباط با سازنده",
    connectSub: "گیت‌هاب و ایمیل — برای هر همکاری یا سؤالی",
    copy: "کپی",
    copied: "کپی شد!",
    statsTitle: "پلتفرم در یک نگاه",
    storyTitle: "داستان پروژه",
    story: [
      "هرچیزهای بزرگ از یک سؤال ساده شروع می‌شوند: «چرا یادگیری برنامه‌نویسی در ایران باید سخت باشد؟» TEKA NEXUS پاسخ من به این سؤال است — یک اکوسیستم کامل که شبکه‌سازی، ساخت پروژه و یادگیری را در یک تجربه یکپارچه ترکیب می‌کند.",
      "به‌جای یک سایت آموزشی معمولی، TEKA NEXUS یک «آرنا اجتماعی» است: ۱۲ ماژول بازی‌گونه که هرکدام مستقیم در نوار اصلی سایت نشسته‌اند — از مبارزه با باس‌ها و درخت مهارت تا جنگ قرمز در برابر آبی، حیوان کدنویس شما و ترمینال زنده.",
      "این پروژه در حال حاضر به‌صورت زنده روی Vercel اجرا می‌شود، با دیتابیس PostgreSQL (Supabase)، احراز هویت اختصاصی + Google OAuth، و پشتیبانی کامل از ۷ زبان زنده‌ی دنیا (فارسی، انگلیسی، عربی، اسپانیایی، فرانسوی، روسی و چینی)."
    ],
    featuresTitle: "هر چیزِ خفنی که فکرش رو بکنی، اینجاست",
    founderTitle: "سازنده",
    founderName: "محمد صادقی",
    founderNameEn: "Mohammad Sadeghi",
    founderRole: "بنیان‌گذار و توسعه‌دهنده‌ی تمام‌وقت (Full-Stack)",
    founderLead: "این پلتفرم را از صفر تا صد، تک‌نفره ساخته و نگه‌داری می‌کند:",
    founderPoints: [
      "طراحی کامل محصول و تجربه کاربری (UI/UX) با زبان بصری شیشه‌ای و نئونی",
      "توسعه‌ی فول‌استک: Next.js 16 + TypeScript + Tailwind CSS 4 + Prisma",
      "نویسنده‌ی ۳۰۰ درس برنامه‌نویسی در ۴ مسیر (Python، HTML، CSS، JavaScript)",
      "معماری دیتابیس PostgreSQL با ۳۰+ مدل داده و موتورهای تصحیح خودکار کد",
      "سیستم‌های بازی‌وار: XP، سکه، کارت‌های کلکسیونی، باس‌فایت و جنگ تیمی",
      "پیاده‌سازی ۷ زبان زنده (fa/en/ar/es/fr/ru/zh) با پشتیبانی کامل RTL",
      "ادغام هوش مصنوعی: مربی آموزشی، بررسی کد و خواندن صوتی درس‌ها (TTS)",
    ],
    stackTitle: "پشته فناوری",
    russiaTitle: "به امید تحصیل در روسیه",
    russiaNote: "این بخش به روسی نوشته شده است — زبانِ دانشگاهی که آرزویش را دارم.",
    missionTitle: "چرا این پروژه مهم است؟",
    mission:
      "TEKA NEXUS ثابت می‌کند که با اراده، انضباط و عشق به ساختن، یک نفر هم می‌تواند محصولی بسازد که روزی هزاران نفر را در مسیر یادگیری همراهی کند. این پروژه، رزومه‌ی زنده‌ی من است — نه یک سند ثابت.",
    openTo: "این پروژه به‌عنوان نمونه‌کار حرفه‌ای ارائه شده — برای فرصت‌های تحصیلی و حرفه‌ای در دسترسم هستم.",
    footerNote: "TEKA NEXUS — ساخته‌شده با ❤️ و کدهای تمیز",
  },
  en: {
    dir: "ltr" as const,
    back: "Back",
    badge: "Built in Iran — solo, from zero to one",
    title: "TEKA NEXUS",
    tagline: "Where ideas become real technology.",
    intro:
      "TEKA NEXUS is a developer-first social platform fused with a free coding academy, shipped as an installable PWA. Everything — from UI design and database architecture to 300 lessons of course content — was designed, built and tested end-to-end by a single person.",
    ctaEnter: "Enter the platform",
    connectTitle: "Connect with the maker",
    connectSub: "GitHub & email — for any collaboration or question",
    copy: "Copy",
    copied: "Copied!",
    statsTitle: "The platform at a glance",
    storyTitle: "The story",
    story: [
      "Big things start with a simple question: “Why should learning to code be hard?” TEKA NEXUS is my answer — a complete ecosystem that blends networking, building and learning into one seamless experience.",
      "Instead of a typical course site, TEKA NEXUS is a social arena: 12 game-like modules, each promoted to a first-class view in the main navigation — from Boss Fights and a galaxy Skill Tree to Red-vs-Blue team wars, your very own Code Pet and a live terminal.",
      "The platform runs live on Vercel with PostgreSQL (Supabase), custom session auth + Google OAuth, and full localization for 7 languages — Persian, English, Arabic, Spanish, French, Russian and Chinese."
    ],
    featuresTitle: "Every cool thing you can imagine lives here",
    founderTitle: "The maker",
    founderName: "Mohammad Sadeghi",
    founderNameEn: "محمد صادقی",
    founderRole: "Founder & Full-Stack Developer",
    founderLead: "Designed, engineered and maintains the entire platform single-handedly:",
    founderPoints: [
      "Complete product design & UX with a glassmorphic neon visual language",
      "Full-stack engineering: Next.js 16 + TypeScript + Tailwind CSS 4 + Prisma",
      "Author of 300 coding lessons across 4 tracks (Python, HTML, CSS, JavaScript)",
      "PostgreSQL architecture with 30+ models and custom auto-grading code engines",
      "Game systems: XP economy, collectible cards, boss fights and team wars",
      "Seven live locales (fa/en/ar/es/fr/ru/zh) with full right-to-left support",
      "AI integrations: tutoring, code review and text-to-speech lesson narration",
    ],
    stackTitle: "Tech stack",
    russiaTitle: "In hope of studying in Russia",
    russiaNote: "This section is written in Russian — the language of the university I dream of.",
    missionTitle: "Why this project matters",
    mission:
      "TEKA NEXUS proves that with discipline, determination and love for building, one person can create a product that guides thousands of learners. This project is my living résumé — not a static document.",
    openTo: "This project is presented as a professional portfolio piece — I am open to academic and career opportunities.",
    footerNote: "TEKA NEXUS — built with ❤️ and clean code",
  },
};

/* ─────────────────── hope of studying in Russia (ru) ─────────────────── */
// The founder's scholarship letter — written in Russian on purpose:
// this block is addressed to Russian universities & reviewers.

const RUSSIA_TEXT = [
  "Меня зовут Мохаммад Садеги. Я — разработчик-самоучка из Ирана и создатель TEKA NEXUS: социальной платформы для программистов и бесплатной академии с 300 уроками, которую я построил в одиночку — от первого эскиза интерфейса до последней строки кода.",
  "Этот проект — моё живое портфолио и доказательство серьёзности моих намерений. Каждая функция здесь говорит за меня: я умею ставить большие цели и доводить их до конца.",
  "Я мечтаю продолжить своё образование в России — стране великой математической и инженерной школы. Верю, что российский университет даст мне глубину знаний, сильных наставников и среду, в которой мои идеи станут ещё масштабнее.",
  "TEKA NEXUS — мой первый шаг на этом пути. Я готов учиться, работать и вносить вклад. Надеюсь, однажды студенческая жизнь приведёт меня в Россию — и эта платформа станет свидетельством того, на что я способен.",
];

const RUSSIA_SIGNATURE = "— Мохаммад Садеги · создатель TEKA NEXUS · Тегеран → Россия";

const STATS = [
  { value: 300, suffix: "+", label: { fa: "درس عملی", en: "hands-on lessons" } },
  { value: 4, suffix: "", label: { fa: "مسیر آموزشی", en: "course tracks" } },
  { value: 12, suffix: "", label: { fa: "بازی آرنا", en: "Arena games" } },
  { value: 7, suffix: "", label: { fa: "زبان زنده", en: "live locales" } },
  { value: 30, suffix: "+", label: { fa: "مدل دیتابیس", en: "database models" } },
  { value: 1, suffix: "", label: { fa: "سازنده — من", en: "maker — me" } },
];

const FEATURES = [
  { icon: GraduationCap, accent: "#22d3ee", fa: "آکادمی ۳۰۰ درسی", en: "300-lesson Academy", sub: { fa: "پایتون، HTML، CSS، جاوااسکریپت با تصحیح خودکار کد", en: "Python, HTML, CSS & JS with auto-graded engines" } },
  { icon: TerminalSquare, accent: "#34d399", fa: "ترمینال زنده", en: "Live Terminal", sub: { fa: "ترمینال واقعی و تعاملی با فرمان‌های اختصاصی تکا", en: "A real interactive terminal with custom TEKA commands" } },
  { icon: Swords, accent: "#fbbf24", fa: "باس‌فایت", en: "Boss Fight", sub: { fa: "مبارزه نهایی هر دوره با نوار جان و عنوان قهرمانی", en: "Course final bosses with HP bars & champion titles" } },
  { icon: MapIcon, accent: "#a78bfa", fa: "درخت مهارت", en: "Skill Tree", sub: { fa: "نقشه کهکشانی پیشرفت به سبک بازی‌های RPG", en: "Galaxy-style RPG progression map" } },
  { icon: Gamepad2, accent: "#22d3ee", fa: "حیوان کدنویس", en: "Code Pet", sub: { fa: "یار مجازی که با یادگیری شما رشد و تکامل می‌یابد", en: "A companion that grows as you learn" } },
  { icon: Users, accent: "#fbbf24", fa: "جنگ قرمز و آبی", en: "Red vs Blue War", sub: { fa: "رقابت هفتگی تیمی با امتیاز زنده", en: "Weekly team war with live scoring" } },
  { icon: IdCard, accent: "#a78bfa", fa: "کارت‌های کلکسیونی", en: "Coder Cards", sub: { fa: "کارت رتبه‌دار با شماره سریال یکتا و کمیاب‌ها", en: "Ranked cards with unique serials & rarities" } },
  { icon: HandCoins, accent: "#fbbf24", fa: "اقتصاد TEKA", en: "TEKA Economy", sub: { fa: "سکه، فروشگاه و بوست‌های واقعی", en: "Coins, shop & real boosts" } },
  { icon: Scale, accent: "#34d399", fa: "صحنه جرم", en: "Crime Scene", sub: { fa: "کارآگاهی دیجیتال با تحلیل لاگ و IP", en: "Digital forensics with log & IP analysis" } },
  { icon: Timer, accent: "#a78bfa", fa: "اسپیدران", en: "Speedrun", sub: { fa: "تایمر جهانی ماژول‌ها با رکورد ثبت‌شده", en: "Global module timers with records" } },
  { icon: Hourglass, accent: "#22d3ee", fa: "ماشین زمان", en: "Time Machine", sub: { fa: "بازپخش سفر یادگیری شما با انیمیشن", en: "Replay your learning journey" } },
  { icon: Sparkles, accent: "#34d399", fa: "نقشه فعالیت", en: "Heatmap", sub: { fa: "گرید فعالیت روزانه به سبک گیت‌هاب", en: "GitHub-style daily activity grid" } },
  { icon: Mic, accent: "#22d3ee", fa: "اتاق‌های صوتی", en: "Voice Rooms", sub: { fa: "گفتگوی زنده با روخوانی هوش مصنوعی", en: "Live rooms with AI narration" } },
  { icon: Zap, accent: "#fbbf24", fa: "شب‌های TEKA", en: "TEKA Nights", sub: { fa: "ایونت ماهانه با XP دوبرابر و شمارش معکوس", en: "Monthly event with 2× XP & countdown" } },
];

const STACK = [
  "Next.js 16", "TypeScript 5", "Tailwind CSS 4", "shadcn/ui", "Prisma ORM",
  "PostgreSQL · Supabase", "socket.io", "framer-motion", "PWA", "Google OAuth",
  "z-ai LLM & TTS", "Vercel",
];

const GITHUB_URL = "https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS.git";
const GITHUB_PROFILE = "https://github.com/mhmdsdqi87-cloud";
const EMAIL = "mhmdsdqi87@gmail.com";

/* ─────────────────────────────── component ─────────────────────────────── */

export function AboutView() {
  const navigate = useApp((s) => s.navigate);
  const user = useApp((s) => s.user);
  const locale = useI18n((s) => s.locale);
  const setLocale = useI18n((s) => s.setLocale);
  const [copied, setCopied] = useState<"gh" | "mail" | null>(null);
  // Persian-first product; reviewers of the dossier read English.
  const lang: "fa" | "en" = locale === "en" ? "en" : "fa";
  const t = COPY[lang];
  const rtl = t.dir === "rtl";

  const flip = () => setLocale(lang === "fa" ? "en" : "fa");

  const copy = async (which: "gh" | "mail") => {
    const value = which === "gh" ? GITHUB_PROFILE : EMAIL;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 1600);
    } catch { /* clipboard unavailable */ }
  };

  const connect = useMemo(
    () => [
      { key: "gh" as const, label: "GitHub", value: GITHUB_PROFILE, href: GITHUB_PROFILE, icon: Braces },
      { key: "mail" as const, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
    ],
    [],
  );

  const BackIcon = rtl ? ArrowRight : ArrowLeft;

  return (
    <div dir={t.dir} className="relative min-h-screen overflow-x-hidden bg-[#04060e] text-white">
      {/* animated backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b1430_0%,#04060e_55%)]" />
        <motion.div
          className="absolute -left-32 top-24 h-[26rem] w-[26rem] rounded-full bg-cyan-500/[0.09] blur-3xl"
          animate={{ y: [0, 40, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-28 top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-500/[0.1] blur-3xl"
          animate={{ y: [0, -50, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-amber-500/[0.06] blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(user ? { name: "home" } : { name: "landing" })}
            className="gap-1.5 text-white/70 hover:text-white"
          >
            <BackIcon size={16} /> {t.back}
          </Button>
          <button
            type="button"
            onClick={flip}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-cyan-300/40 hover:text-cyan-200"
          >
            <Languages size={14} /> {lang === "fa" ? "English" : "فارسی"}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-20">
        {/* ── hero ── */}
        <section className="pt-14 text-center sm:pt-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/[0.08] px-4 py-1.5 text-xs font-medium text-cyan-200"
          >
            <BadgeCheck size={14} /> {t.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-300 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
          >
            {t.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-white/50"
          >
            {t.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button size="lg" onClick={() => navigate({ name: "landing" })} className="btn-hero gap-2 px-7">
              <Rocket size={17} /> {t.ctaEnter}
            </Button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-6 text-sm font-medium text-white/85 transition hover:border-cyan-300/40 hover:bg-white/[0.09]"
            >
              <Braces size={16} /> GitHub
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-6 text-sm font-medium text-white/85 transition hover:border-violet-300/40 hover:bg-white/[0.09]"
            >
              <Mail size={16} /> {EMAIL}
            </a>
          </motion.div>
        </section>

        {/* ── stats ── */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/40">{t.statsTitle}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label.en}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card rounded-2xl border border-white/[0.08] p-4 text-center"
              >
                <div className="bg-gradient-to-br from-cyan-300 to-violet-300 bg-clip-text text-3xl font-black text-transparent">
                  <AnimatedNumber value={s.value} />{s.suffix}
                </div>
                <div className="mt-1 text-[11px] text-white/55">{s.label[lang]}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── story ── */}
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold text-white/90">{t.storyTitle}</h2>
          <div className="space-y-4">
            {t.story.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-sm leading-8 text-white/70"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </section>

        {/* ── feature grid ── */}
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold text-white/90">{t.featuresTitle}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.en}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.07 }}
                whileHover={{ y: -4 }}
                className="glass-card group flex items-start gap-3 rounded-2xl border border-white/[0.08] p-4 transition-colors hover:border-white/[0.16]"
                style={{ boxShadow: `0 10px 30px -22px ${f.accent}` }}
              >
                <span
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition group-hover:scale-110"
                  style={{ color: f.accent }}
                >
                  <f.icon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white/90">{lang === "fa" ? f.fa : f.en}</span>
                  <span className="mt-0.5 block text-xs leading-6 text-white/50">{f.sub[lang]}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── founder ── */}
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold text-white/90">{t.founderTitle}</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden rounded-3xl border border-white/[0.1]"
            style={{ boxShadow: "0 24px 70px -30px rgba(34,211,238,0.35)" }}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400" />
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
              <div className="flex flex-col items-center gap-3 sm:w-48 sm:shrink-0">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 via-violet-500 to-amber-400 text-3xl font-black text-black shadow-lg shadow-cyan-500/25">
                    MS
                  </div>
                  <span className="absolute -bottom-1 -end-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0b1120] bg-emerald-400 text-black">
                    <BadgeCheck size={15} />
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{t.founderName}</div>
                  <div className="mt-0.5 text-xs text-white/45" dir="ltr">{t.founderNameEn}</div>
                  <div className="mt-2 inline-block rounded-full bg-violet-400/10 px-3 py-1 text-[11px] font-medium text-violet-200">
                    {t.founderRole}
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white/60">{t.founderLead}</p>
                <ul className="mt-4 space-y-2.5">
                  {t.founderPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm leading-7 text-white/75">
                      <Check size={16} className="mt-1.5 shrink-0 text-emerald-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* connect */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white/85">{t.connectTitle}</h3>
            <p className="mt-1 text-xs text-white/45">{t.connectSub}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {connect.map((c) => (
                <div
                  key={c.key}
                  className="glass-card flex items-center gap-3 rounded-2xl border border-white/[0.08] p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-violet-400/15 text-cyan-300">
                    <c.icon size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium uppercase tracking-wider text-white/40">{c.label}</div>
                    <a
                      href={c.href}
                      target={c.key === "gh" ? "_blank" : undefined}
                      rel="noreferrer"
                      dir="ltr"
                      className="block truncate text-sm font-medium text-cyan-200 hover:underline"
                    >
                      {c.value}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t.copy}
                    onClick={() => copy(c.key)}
                    className="h-9 w-9 shrink-0 text-white/50 hover:text-white"
                  >
                    {copied === c.key ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </Button>
                </div>
              ))}
            </div>
            {copied && (
              <p className="mt-2 text-center text-xs text-emerald-300" aria-live="polite">{t.copied}</p>
            )}
          </div>
        </section>

        {/* ── stack ── */}
        <section className="mt-20">
          <h2 className="mb-5 text-2xl font-bold text-white/90">{t.stackTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                dir="ltr"
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ── mission ── */}
        <section className="mt-20">
          <h2 className="mb-4 text-2xl font-bold text-white/90">{t.missionTitle}</h2>
          <div className="glass-card relative overflow-hidden rounded-3xl border border-white/[0.09] p-6 sm:p-8">
            <ShieldCheck aria-hidden className="absolute -bottom-6 -left-6 h-36 w-36 text-white/[0.04]" />
            <p className="text-sm leading-8 text-white/75 sm:text-base">{t.mission}</p>
            <p className="mt-4 border-t border-white/[0.07] pt-4 text-xs leading-6 text-cyan-200/80">
              <Sparkles size={13} className="me-1 inline" /> {t.openTo}
            </p>
          </div>
        </section>

        {/* ── hope of studying in Russia (written in Russian) ── */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card relative overflow-hidden rounded-3xl border border-white/[0.1]"
            style={{ boxShadow: "0 24px 70px -30px rgba(59,130,246,0.45)" }}
          >
            {/* Russian flag tricolour ribbon */}
            <div className="flex h-2 w-full" aria-hidden="true">
              <span className="flex-1 bg-white/90" />
              <span className="flex-1" style={{ background: "#0039A6" }} />
              <span className="flex-1" style={{ background: "#D52B1E" }} />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/[0.08] blur-3xl"
            />
            <Flag aria-hidden className="absolute -bottom-8 -left-8 h-40 w-40 text-blue-300/[0.06]" />

            <div dir="ltr" className="relative p-6 text-left sm:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400/20 to-red-400/20 text-blue-300">
                  <GraduationCap size={24} />
                </span>
                <div>
                  <h2 className="text-2xl font-black text-white sm:text-3xl">
                    {t.russiaTitle}
                  </h2>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-300/80">
                    Мечтаю об учёбе в России
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-white/45">{t.russiaNote}</p>

              <div className="mt-5 space-y-4 border-s-2 border-blue-400/30 ps-5">
                {RUSSIA_TEXT.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="text-sm leading-8 text-white/80 sm:text-[15px] sm:leading-9"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <p className="mt-6 font-mono text-xs font-semibold text-blue-200/90">
                {RUSSIA_SIGNATURE}
              </p>
            </div>
          </motion.div>
        </section>

        <footer className="mt-16 border-t border-white/[0.06] pt-6 pb-4 text-center text-xs text-white/35">
          {t.footerNote} · <span dir="ltr">teka-nexus.vercel.app</span>
        </footer>
      </main>
    </div>
  );
}
