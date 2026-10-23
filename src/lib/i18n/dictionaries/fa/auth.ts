// TEKA NEXUS — Persian dictionary: "auth" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { AuthDict } from "../en/auth";

export const auth: AuthDict = {
  brand: {
    p1: "تصور کن. ",
    p2: "بساز.",
    p3: " متصل شو.",
  },
  brandLine:
    "شبکهٔ سازنده‌ها؛ جایی که پروژه‌های هر مرحله‌ای — ایده، نمونهٔ اولیه، انتشار — به آدم‌های آمادهٔ ساختن می‌رسن.",
  bullets: {
    discovery: {
      title: "کاوشی هماهنگ با استکت",
      body: "پروژه‌های عمومی رو بر اساس دسته‌بندی، وضعیت و مهارت‌های موردنیاز فیلتر کن.",
    },
    teams: {
      title: "تیم‌هایی که با درخواست‌های واقعی شکل می‌گیرن",
      body: "با انتخاب نقش و یه معرفی درخواست بده؛ مالک‌ها هر درخواستی رو بررسی می‌کنن.",
    },
    reputation: {
      title: "اعتباری که می‌شه بهش اعتماد کرد",
      body: "XP و اعتبار رو سرور بابت مشارکت‌های تأییدشده اختصاص می‌ده.",
    },
  },
  backHome: "بازگشت به خانه",
  signupTitle: "حسابت رو بساز",
  loginTitle: "خوش برگشتی",
  signupSubtitle: "شروع کن به منتشر کردن پروژه و پیدا کردن همکار. در دوران بتا رایگانه.",
  loginSubtitle: "برای ادامهٔ ساختن وارد شو.",
  username: "نام کاربری",
  usernameHint: "۳ تا ۲۴ کاراکتر: حروف کوچک لاتین، عدد و زیرخط",
  email: "ایمیل",
  password: "رمز عبور",
  passwordPlaceholderSignup: "حداقل ۸ کاراکتر",
  passwordPlaceholderLogin: "رمز عبورت",
  showPassword: "نمایش رمز",
  hidePassword: "پنهان کردن رمز",
  passwordMinHint: "حداقل ۸ کاراکتر.",
  creatingAccount: "در حال ساختن حساب…",
  signingIn: "در حال ورود…",
  haveAccount: "قبلاً ثبت‌نام کردی؟",
  newToTeka: "تازه با TEKA NEXUS آشنا شدی؟",
  createAccountLink: "ثبت‌نام",
  google: {
    setupWhy: "چرا هنوز فعال نیست؟",
    setupTitle: "ورود با گوگل — راهنمای فعال‌سازی",
    setupBody: "همه‌چیز سمت سرور آماده است. ورود با گوگل همان لحظه‌ای که دو متغیر محیطی OAuth در پنل استقرار (Vercel) ثبت شود روشن می‌شود — بدون هیچ تغییری در کد.",
    setupStep1: "به console.cloud.google.com برو و یک پروژه جدید (رایگان) بساز.",
    setupStep2: "بخش APIs & Services → OAuth consent screen → گزینه External را انتخاب کن و نام اپ را ثبت کن.",
    setupStep3: "در Credentials روی Create credentials → OAuth client ID → Web application بزن.",
    setupStep4: "آدرس ریدایرکت زیر را اضافه کن، بعد در Vercel → Settings → Environment Variables مقادیر GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET را ثبت و دوباره دیپلوی کن.",
    setupRedirect: "آدرس ریدایرکت مجاز",
    button: 'ورود با گوگل',
    divider: 'یا با ایمیل ادامه بده',
    redirecting: 'در حال اتصال به گوگل…',
  },
  portal: {
    welcome: 'خوش برگشتی،',
    entering: 'در حال ورود به نکسوس…',
    secured: 'نشست امن شد',
  },
  err: {
    username: "نام کاربری باید ۳ تا ۲۴ کاراکتر باشه: حروف کوچک لاتین، عدد و زیرخط.",
    passwordShort: "رمز عبور باید حداقل ۸ کاراکتر باشه.",
    emailInvalid: "یه ایمیل معتبر وارد کن.",
    passwordRequired: "رمز عبور لازمه.",
    emailTaken: "این ایمیل قبلاً ثبت شده. بهتره وارد شی.",
    usernameTaken: "این نام کاربری قبلاً گرفته شده. یه اسم دیگه انتخاب کن.",
    invalidCredentials: "ایمیل یا رمز عبور اشتباهه.",
    googleFailed: 'ورود با گوگل شکست خورد. دوباره امتحان کن.',
    googleCancelled: 'ورود با گوگل لغو شد.',
    googleNotConfigured: 'ورود با گوگل هنوز فعال نشده — کلیدهای GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET لازمه (docs/GOOGLE_OAUTH.md).',
    googleState: 'این تلاشِ ورود با گوگل منقضی شده. دوباره امتحان کن.',
  },
};
