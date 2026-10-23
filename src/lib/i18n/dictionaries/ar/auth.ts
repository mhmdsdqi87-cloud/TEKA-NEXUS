// TEKA NEXUS — Arabic dictionary: "auth" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { AuthDict } from "../en/auth";

export const auth: AuthDict = {
  brand: {
    p1: "تخيَّل. ",
    p2: "ابنِ.",
    p3: " تواصل.",
  },
  brandLine:
    "شبكة المطورين حيث تلتقي المشاريع في كل مرحلة — فكرة، نموذج أولي، إصدار — بأشخاص مستعدين لبنائها.",
  bullets: {
    discovery: {
      title: "استكشاف يناسب مجموعتك التقنية",
      body: "صفِّ المشاريع العامة حسب الفئة والحالة والمهارات المطلوبة.",
    },
    teams: {
      title: "فرق تتشكل بطلبات حقيقية",
      body: "قدِّم طلبك مع دور ومقدمة؛ ويراجع المالكون كل طلب.",
    },
    reputation: {
      title: "سمعة تستحق الثقة",
      body: "يمنح الخادم XP والسمعة مقابل مساهمات موثقة.",
    },
  },
  backHome: "العودة إلى الرئيسية",
  signupTitle: "أنشئ حسابك",
  loginTitle: "أهلاً بعودتك",
  signupSubtitle: "ابدأ بنشر المشاريع والعثور على متعاونين. مجاني أثناء التجربة.",
  loginSubtitle: "سجّل الدخول لمتابعة البناء.",
  username: "اسم المستخدم",
  usernameHint: "3–24 حرفًا: أحرف لاتينية صغيرة وأرقام وشرطات سفلية",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  passwordPlaceholderSignup: "8 أحرف على الأقل",
  passwordPlaceholderLogin: "كلمة المرور الخاصة بك",
  showPassword: "إظهار كلمة المرور",
  hidePassword: "إخفاء كلمة المرور",
  passwordMinHint: "8 أحرف على الأقل.",
  creatingAccount: "جارٍ إنشاء الحساب…",
  signingIn: "جارٍ تسجيل الدخول…",
  haveAccount: "لديك حساب بالفعل؟",
  newToTeka: "جديد على TEKA NEXUS؟",
  createAccountLink: "أنشئ حسابًا",
  google: {
    setupWhy: "لماذا لم يُفعَّل بعد؟",
    setupTitle: "الدخول بجوجل — دليل التفعيل",
    setupBody: "كل شيء جاهز في الخادم. يتفعّل الدخول بجوجل فور إضافة متغيّري بيئة OAuth في لوحة النشر — دون أي تعديل في الكود.",
    setupStep1: "افتح console.cloud.google.com وأنشئ مشروعًا جديدًا (مجانًا).",
    setupStep2: "من APIs & Services → OAuth consent screen → اختر External وسجّل اسم التطبيق.",
    setupStep3: "من Credentials → Create credentials → OAuth client ID → Web application.",
    setupStep4: "أضِف رابط إعادة التوجيه أدناه، ثم سجّل GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET في Vercel وأعد النشر.",
    setupRedirect: "رابط إعادة التوجيه المصرّح",
    button: 'المتابعة بحساب Google',
    divider: 'أو تابع بالبريد الإلكتروني',
    redirecting: 'جارٍ الاتصال بـ Google…',
  },
  portal: {
    welcome: 'أهلاً بعودتك،',
    entering: 'جارٍ الدخول إلى النكسوس…',
    secured: 'تم تأمين الجلسة',
  },
  err: {
    username:
      "يجب أن يتكون اسم المستخدم من 3–24 حرفًا: أحرف لاتينية صغيرة وأرقام وشرطات سفلية.",
    passwordShort: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    emailInvalid: "أدخل بريدًا إلكترونيًا صالحًا.",
    passwordRequired: "كلمة المرور مطلوبة.",
    emailTaken: "هذا البريد مسجّل بالفعل. جرّب تسجيل الدخول.",
    usernameTaken: "اسم المستخدم محجوز. اختر اسمًا آخر.",
    invalidCredentials: "البريد أو كلمة المرور غير صحيحة.",
    googleFailed: 'فشل تسجيل الدخول عبر Google. حاول مرة أخرى.',
    googleCancelled: 'تم إلغاء تسجيل الدخول عبر Google.',
    googleNotConfigured: 'تسجيل الدخول عبر Google غير مفعّل بعد — يلزم GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET (راجع docs/GOOGLE_OAUTH.md).',
    googleState: 'انتهت صلاحية محاولة الدخول عبر Google. حاول مجددًا.',
  },
};
