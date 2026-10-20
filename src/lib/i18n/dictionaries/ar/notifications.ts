// TEKA NEXUS — Arabic dictionary: "notifications" namespace.
// Owned by translation agent (Task 2-c).

import type { NotificationsDict } from "../en/notifications";

export const notifications: NotificationsDict = {
  someone: "شخص ما",
  system: "إشعار من النظام",
  fallback: "لديك إشعار جديد",
  types: {
    newFollower: "بدأ {name} بمتابعتك",
    newDm: "رسالة جديدة من {name}",
    commentOn: "علّق {name} على {project}",
    commentOnYours: "علّق {name} على مشروعك",
    joinRequest: "طلب {name} الانضمام إلى {project}",
    joinRequestPlain: "أرسل {name} طلب تعاون",
    requestAccepted: "قُبل طلبك للانضمام إلى {project}",
    requestAcceptedPlain: "قُبل طلب التعاون الخاص بك",
    requestRejected: "رُفض طلبك للانضمام إلى {project}",
    requestRejectedPlain: "رُفض طلب التعاون الخاص بك",
    taskAssigned: "أسند إليك {name} مهمة: {task}",
    taskAssignedPlain: "أسند إليك {name} مهمة جديدة",
    memberJoined: "انضم {name} إلى {project}",
    memberJoinedTeam: "انضم {name} إلى فريقك",
  },
  toasts: {
    loadFailed: "تعذّر تحميل الإشعارات.",
    allRead: "تم وضع علامة مقروء على جميع الإشعارات",
    markFailed: "تعذّر وضع علامة مقروء على الإشعارات.",
    markOneFailed: "تعذّر وضع علامة مقروء على هذا الإشعار.",
  },
  auth: {
    title: "سجّل الدخول لعرض إشعاراتك",
    description: "تظهر هنا أنشطة مشاريعك وفرقك ومتابعيك.",
  },
  unreadOne: "{n} إشعار غير مقروء",
  unreadMany: "{n} إشعارات غير مقروءة",
  allCaughtUp: "لا جديد لديك",
  markAll: "وضع علامة مقروء على الكل",
  a11y: {
    filter: "تصفية الإشعارات",
    unreadSuffix: "(غير مقروء)",
  },
  filterAll: "الكل",
  filterUnread: "غير المقروء",
  filterUnreadCount: "غير المقروء · {n}",
  loadFailed: {
    title: "تعذّر تحميل الإشعارات",
    description: "تحقق من اتصالك وحاول مرة أخرى.",
  },
  noUnreadDesc: "لا توجد إشعارات غير مقروءة الآن.",
  emptyDesc: "ستظهر هنا أنشطة مشاريعك وفرقك ومتابعيك.",
};
