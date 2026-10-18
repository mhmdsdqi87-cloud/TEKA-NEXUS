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
  demoTitle: "حساب تجريبي للمعاينة",
  demoBody: "استكشف المنصة ببيانات تجريبية جاهزة. كلمة المرور:",
  demoUse: "استخدم {email}",
  haveAccount: "لديك حساب بالفعل؟",
  newToTeka: "جديد على TEKA NEXUS؟",
  createAccountLink: "أنشئ حسابًا",
  err: {
    username:
      "يجب أن يتكون اسم المستخدم من 3–24 حرفًا: أحرف لاتينية صغيرة وأرقام وشرطات سفلية.",
    passwordShort: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    emailInvalid: "أدخل بريدًا إلكترونيًا صالحًا.",
    passwordRequired: "كلمة المرور مطلوبة.",
  },
};
