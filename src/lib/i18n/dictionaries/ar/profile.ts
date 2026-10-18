// TEKA NEXUS — Arabic dictionary: "profile" namespace (owned by translation agent 2-d).

import type { ProfileDict } from "../en/profile";

export const profile: ProfileDict = {
  actions: {
    follow: "متابعة",
    following: "تتابع",
    blocked: "محظور",
    editProfile: "تعديل الملف الشخصي",
    moreActions: "إجراءات أخرى",
    blockUser: "حظر المستخدم",
    unblockUser: "إلغاء حظر المستخدم",
    reportUser: "الإبلاغ عن المستخدم",
  },
  stats: {
    followers: "المتابِعون",
    following: "يتابع",
    reputation: "السمعة",
  },
  tabs: {
    contributions: "المساهمات",
    about: "حول",
  },
  header: {
    memberSince: "عضو منذ {date}",
  },
  sections: {
    goals: "الأهداف",
    interests: "الاهتمامات",
    skills: "المهارات",
  },
  contributionTypes: {
    task: "أكمل مهمة",
    release: "نشر إصدارًا",
    milestone: "أكمل مرحلة رئيسية",
    update: "نشر تحديثًا",
    collab: "انضم إلى فريق",
    created: "أنشأ مشروعًا",
    other: "ساهم",
  },
  contributions: {
    notice: "تُكتسب السمعة فقط من خلال المساهمات الموثّقة — ولا يمكن شراؤها.",
  },
  empty: {
    projects: {
      title: "لا توجد مشاريع عامة بعد",
      description: "عندما ينشر {name} مشاريعه، ستظهر هنا.",
    },
    contributions: {
      title: "لا توجد مساهمات بعد",
      description: "ستظهر هنا المهام والمراحل الرئيسية والإصدارات والتعاونات الموثّقة فور حدوثها.",
    },
    about: {
      title: "لم يضف هذا المبدّع تفاصيل بعد",
      description: "ستظهر نبذته ومهاراته واهتماماته هنا بعد إكمال ملفه الشخصي.",
    },
  },
  about: {
    bio: "نبذة",
    noBio: "لا توجد نبذة بعد.",
    noneListed: "لا شيء مُدرج بعد.",
    details: "تفاصيل المبدّع",
    joined: "انضم في {date}",
  },
  notFound: {
    title: "المبدّع غير موجود",
    description: "هذا الملف الشخصي غير موجود أو ربما تمت إزالته.",
    action: "استكشاف المشاريع",
  },
  loadFailed: {
    title: "تعذّر تحميل هذا الملف الشخصي",
    description: "تحقّق من اتصالك وحاول مجددًا.",
  },
  report: {
    title: "الإبلاغ عن {name}",
    description: "تُرسل البلاغات إلى قائمة الإشراف ويراجعها فريق TEKA.",
    reason: "السبب",
    pickReason: "اختر سببًا",
    detailsLabel: "التفاصيل (اختياري)",
    detailsPlaceholder: "أضف أي سياق يساعد فريق الإشراف.",
    submit: "إرسال البلاغ",
  },
  reportReasons: {
    spam: "محتوى مزعج",
    harassment: "مضايقة",
    inappropriate: "محتوى غير لائق",
    copyright: "انتهاك حقوق النشر",
    other: "شيء آخر",
  },
  toasts: {
    followed: "تمت متابعة {name}",
    unfollowed: "أُلغيت متابعة {name}",
    blocked: "تم حظر @{name}",
    unblocked: "تم إلغاء حظر @{name}",
    reportSubmitted: "تم إرسال البلاغ — سيراجعه فريقنا.",
  },
  errors: {
    loadFailed: "تعذّر تحميل هذا الملف الشخصي.",
    signInToFollow: "سجّل الدخول لمتابعة المبدعين.",
    followFailed: "تعذّر تحديث حالة المتابعة.",
    signInToBlock: "سجّل الدخول لإدارة الحظر.",
    blockFailed: "تعذّر تحديث حالة الحظر.",
    reportFailed: "تعذّر إرسال البلاغ.",
  },
  shared: {
    openProjectAria: "فتح مشروع {name}",
    likes: "إعجابات",
    teamSize: "حجم الفريق",
    updated: "تم التحديث {time}",
    coverAlt: "غلاف {name}",
  },
};
