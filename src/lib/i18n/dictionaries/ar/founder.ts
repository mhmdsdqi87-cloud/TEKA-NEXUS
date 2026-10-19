export const founder = {
  title: "لوحة المؤسس",
  subtitle: "كل أعضاء TEKA NEXUS، مباشرة.",
  badge: "مؤسس",
  directoryTitle: "الأعضاء المسجّلون",
  searchPlaceholder: "ابحث بالاسم أو @المستخدم أو البريد…",
  pendingOnboarding: "الإعداد غير مكتمل",
  empty: "لا يوجد عضو مطابق لهذا البحث.",
  loadFailed: "تعذر تحميل قائمة الأعضاء. حاول مجددًا.",
  stats: {
    users: "إجمالي الأعضاء",
    onboarded: "أكملوا الإعداد",
    totalXp: "XP المجتمع",
    totalRep: "REP المجتمع",
    projects: "المشاريع",
    sessions: "الجلسات النشطة",
  },
  supabase: {
      "title": "سحابة Supabase",
      "subtitle": "اتصال مباشر بمشروع Supabase الخاص بك",
      "connected": "متصل",
      "offline": "غير متصل",
      "checking": "جارٍ التحقق…",
      "auth": "خدمة المصادقة",
      "mirrored": "الحسابات المتزامنة",
      "storage": "تخزين الصور الرمزية",
      "storageReady": "حاوية teka-avatars نشطة",
      "dbSync": "مزامنة قاعدة البيانات الكاملة",
      "dbSyncWaiting": "في انتظار كلمة مرور قاعدة البيانات",
      "dbSyncActive": "نشطة",
      "version": "الإصدار"
  },
};

export type FounderDict = typeof founder;
