// TEKA NEXUS — Arabic dictionary: "onboarding" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { OnboardingDict } from "../en/onboarding";

export const onboarding: OnboardingDict = {
  topbar: "إعداد الملف الشخصي",
  guard: {
    title: "سجّل الدخول لإعداد ملفك الشخصي",
    body: "الإعداد جزء من تدفق الحساب — أنشئ حسابك أو ادخل إليه أولاً.",
    cta: "الانتقال إلى تسجيل الدخول",
  },
  stepsAria: "خطوات الإعداد",
  steps: {
    identity: {
      label: "الهوية",
      hint: "من أنت على TEKA NEXUS",
    },
    skills: {
      label: "المهارات",
      hint: "ما يمكنك المساهمة به",
    },
    interests: {
      label: "الاهتمامات",
      hint: "ما تريد العمل عليه",
    },
    goals: {
      label: "الأهداف",
      hint: "لماذا أنت هنا",
    },
  },
  stepOf: "الخطوة {n} من {total}",
  identity: {
    title: "اضبط هويتك",
    subtitle: "هكذا سيراك البنّاؤون الآخرون عبر المشاريع والفرق.",
    displayName: "الاسم المعروض *",
    displayNamePlaceholder: "مثال: Maya Chen",
    bio: "نبذة",
    bioPlaceholder: "ماذا تبني؟ وماذا تبحث عنه؟",
    website: "الموقع الإلكتروني",
    websiteHint: "اختياري — يجب أن يكون رابط http(s) كاملًا.",
    avatarGradient: "تدرج الصورة الرمزية",
    avatarGradientAria: "تدرج الصورة الرمزية: {name}",
  },
  skills: {
    title: "ماذا تستطيع أن تفعل؟",
    subtitle: "اختر المهارات التي يمكنك تقديمها لفريق.",
  },
  interests: {
    title: "على ماذا تريد أن تعمل؟",
    subtitle: "نخصص الاستكشاف وفق اهتماماتك.",
  },
  goals: {
    title: "لماذا أنت هنا؟",
    subtitle: "أهدافك تشكّل التوصيات ومن يتواصل معك.",
  },
  nSelected: "تم اختيار {n}.",
  selectAtLeastOne: "اختر مهارة واحدة على الأقل — أو تخطَّ الأمر الآن.",
  pickAtLeastOne: "اختر اهتمامًا واحدًا على الأقل — أو تخطَّ الأمر الآن.",
  review: {
    title: "معاينة الملف الشخصي",
    skills: "المهارات",
    interests: "الاهتمامات",
    goals: "الأهداف",
    note: "ما تخطّته يحصل على قيمة افتراضية مناسبة، فيبقى ملفك جاهزًا.",
  },
  continue: "متابعة",
  skipForNow: "تخطَّ الآن",
  skip: "تخطٍّ",
  finish: "إنهاء",
  saving: "جارٍ الحفظ…",
  err: {
    displayName: "الاسم المعروض مطلوب (1–60 حرفًا).",
    website: "يجب أن يكون الموقع رابط http(s) صالحًا، مثل https://your-site.dev",
    save: "تعذّر حفظ ملفك الشخصي. حاول مرة أخرى.",
  },
  toastWelcome: "أهلاً بك في TEKA NEXUS",
};
