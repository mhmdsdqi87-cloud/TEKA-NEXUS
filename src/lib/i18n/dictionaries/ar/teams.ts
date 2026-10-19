// TEKA NEXUS — Arabic dictionary: "teams" namespace.
// Owned by translation agent (Task 2-c).

import type { TeamsDict } from "../en/teams";

export const teams: TeamsDict = {
  tabs: {
    crews: "فرقي",
    requests: "الطلبات",
    discover: "استكشاف",
  },
  auth: {
    title: "سجّل الدخول لإدارة فرقك",
    description:
      "تابع فرقك، وراجع طلبات التعاون، واكتشف مشاريع تحتاج إلى مهاراتك.",
  },
  titlePrefix: "",
  titleCrews: "فرقك",
  subtitle: "أدر المشاريع التي تبنيها مع الآخرين، وأجب عن الطلبات، وابحث عن متعاونين جدد.",
  a11y: {
    yourRole: "دورك: {role}",
    sentAria: "الطلبات المرسلة",
    receivedAria: "الطلبات الواردة",
    viewProfileAria: "عرض ملف {name}",
  },
  crews: {
    emptyTitle: "لست جزءًا من فريق بعد",
    emptyDesc: "انضم إلى مشروع أو ابدأ مشروعك الخاص — التعاون هو حيث تُبنى أفضل الأعمال.",
    explore: "استكشاف المشاريع",
    start: "ابدأ مشروعًا",
    joined: "انضممت في {date}",
    open: "فتح مساحة العمل",
    member: "{n} عضو",
    members: "{n} أعضاء",
  },
  requests: {
    sent: "المرسلة",
    received: "الواردة",
    pendingCount: "({n} معلّق)",
    sentEmpty: "لا طلبات مرسلة — ابحث عن مشروع واطلب الانضمام.",
    receivedEmpty: "لا طلبات واردة بعد. واصل البناء — سيجدك المطورون.",
    unknownProject: "مشروع غير معروف",
    appliedAs: "طلب الانضمام بصفة {role} · {ago}",
    withdraw: "سحب",
    wantsToJoin: "يريد الانضمام إلى {project} بصفة {role}",
    wantsToJoinPrefix: "يريد الانضمام إلى ",
    wantsToJoinMiddle: " بصفة ",
    wantsToJoinSuffix: "",
    aProject: "مشروع",
    viewProject: "عرض المشروع",
  },
  status: {
    PENDING: "معلّق",
    ACCEPTED: "مقبول",
    REJECTED: "مرفوض",
    WITHDRAWN: "مسحوب",
  },
  accept: "قبول",
  reject: "رفض",
  toasts: {
    withdrawn: "تم سحب الطلب",
    accepted: "أهلًا بك — تم قبول الطلب",
    rejected: "تم رفض الطلب",
  },
  errors: {
    generic: "حدث خطأ ما",
  },
  discover: {
    title: "فرق تبحث عن أعضاء",
    subtitle: "مشاريع تعرض مهارات مطلوبة — ابحث عن فريق يحتاج إلى ما تجيده.",
    emptyTitle: "لا توجد مشاريع تعرض مهارات مطلوبة حاليًا",
    emptyDesc: "نعرض أحدث المشاريع بدلًا من ذلك — عُد لاحقًا عندما تنشر فرق جديدة احتياجاتها.",
  },
  chat: {
    title: "محادثة الفريق",
    online: "{n} متصل",
    onlineOne: "أنت الوحيد المتصل",
    typing: "{names} يكتب الآن…",
    typingMulti: "{names} يكتبون الآن…",
    placeholder: "أرسل رسالة لفريقك…",
    send: "إرسال",
    empty: "لا رسائل بعد — قل سلامًا 👋",
    emptyHint: "تظهر رسائل الفريق هنا مباشرةً للجميع.",
    disconnected: "انقطع الاتصال",
    reconnecting: "جارٍ إعادة الاتصال…",
    deleted: "تم حذف الرسالة",
    loginRequired: "سجّل الدخول للانضمام إلى المحادثة",
    reactAdd: "إضافة تفاعل",
    rateLimited: "اهدأ قليلًا — أرسلت رسائل كثيرة متتالية",
    charsLeft: "تبقى {n} حرفًا",
    a11y: {
      openChat: "افتح محادثة فريق {name}",
      closeChat: "أغلق المحادثة",
      deleteMessage: "احذف الرسالة",
      messages: "الرسائل",
    },
  },
};
