// TEKA NEXUS — Persian dictionary: "onboarding" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { OnboardingDict } from "../en/onboarding";

export const onboarding: OnboardingDict = {
  topbar: "تنظیم پروفایل",
  guard: {
    title: "برای تنظیم پروفایلت وارد شو",
    body: "راه‌اندازی بخشی از مسیر حسابه — اول حساب بساز یا وارد شو.",
    cta: "برو به صفحهٔ ورود",
  },
  stepsAria: "مراحل راه‌اندازی",
  steps: {
    identity: {
      label: "هویت",
      hint: "تو در TEKA NEXUS کی هستی",
    },
    skills: {
      label: "مهارت‌ها",
      hint: "چی می‌تونی ارائه بدی",
    },
    interests: {
      label: "علاقه‌مندی‌ها",
      hint: "روی چی می‌خوای کار کنی",
    },
    goals: {
      label: "هدف‌ها",
      hint: "برای چه کاری اینجایی",
    },
  },
  stepOf: "گام {n} از {total}",
  identity: {
    title: "هویتت رو بساز",
    subtitle: "سازنده‌های دیگه همین‌طور در پروژه‌ها و تیم‌ها می‌بیننت.",
    displayName: "نام نمایشی *",
    displayNamePlaceholder: "مثلاً Maya Chen",
    bio: "بیو",
    bioPlaceholder: "چی می‌سازی؟ دنبال چی هستی؟",
    website: "وب‌سایت",
    websiteHint: "اختیاری — باید یه نشانی کامل http(s) باشه.",
    avatarGradient: "گرادیان آواتار",
    avatarGradientAria: "گرادیان آواتار: {name}",
  },
  skills: {
    title: "چه کارهایی بلدی؟",
    subtitle: "مهارت‌هایی که می‌تونی به تیم بدی رو انتخاب کن.",
  },
  interests: {
    title: "روی چی می‌خوای کار کنی؟",
    subtitle: "کاوش رو بر اساس علاقه‌مندی‌هات شخصی‌سازی می‌کنیم.",
  },
  goals: {
    title: "برای چی اینجایی؟",
    subtitle: "هدف‌هات روی پیشنهادها و اینکه چه کسی سراغت میاد اثر می‌ذاره.",
  },
  nSelected: "{n} مورد انتخاب شد.",
  selectAtLeastOne: "حداقل یکی رو انتخاب کن — یا فعلاً ردش کن.",
  pickAtLeastOne: "حداقل یکی رو بردار — یا فعلاً ردش کن.",
  review: {
    title: "پیش‌نمایش پروفایل",
    skills: "مهارت‌ها",
    interests: "علاقه‌مندی‌ها",
    goals: "هدف‌ها",
    note: "هر چیزی که رد کنی یه مقدار پیش‌فرض منطقی می‌گیره تا پروفایلت به هر حال کار کنه.",
  },
  continue: "ادامه",
  skipForNow: "فعلاً نه",
  skip: "بی‌خیال",
  finish: "پایان",
  saving: "در حال ذخیره…",
  err: {
    displayName: "نام نمایشی الزامیه (۱ تا ۶۰ کاراکتر).",
    website: "وب‌سایت باید یه نشانی معتبر http(s) باشه، مثل https://your-site.dev",
    save: "ذخیرهٔ پروفایل ممکن نشد. دوباره تلاش کن.",
  },
  toastWelcome: "به TEKA NEXUS خوش اومدی",
};
