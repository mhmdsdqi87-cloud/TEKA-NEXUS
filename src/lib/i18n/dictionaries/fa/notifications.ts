// TEKA NEXUS — Persian dictionary: "notifications" namespace.
// Owned by translation agent (Task 2-c).

import type { NotificationsDict } from "../en/notifications";

export const notifications: NotificationsDict = {
  someone: "یک نفر",
  system: "اعلان سیستمی",
  fallback: "یک اعلان جدید دارید",
  types: {
    newFollower: "{name} شما را دنبال کرد",
    newDm: "پیام خصوصی از {name}",
    commentOn: "{name} روی {project} نظر داد",
    commentOnYours: "{name} روی پروژه شما نظر داد",
    joinRequest: "{name} درخواست پیوستن به {project} داد",
    joinRequestPlain: "{name} درخواست همکاری فرستاد",
    requestAccepted: "درخواست پیوستن شما به {project} پذیرفته شد",
    requestAcceptedPlain: "درخواست همکاری شما پذیرفته شد",
    requestRejected: "درخواست پیوستن شما به {project} رد شد",
    requestRejectedPlain: "درخواست همکاری شما رد شد",
    taskAssigned: "{name} وظیفه‌ای به شما سپرد: {task}",
    taskAssignedPlain: "{name} وظیفه جدیدی به شما سپرد",
    memberJoined: "{name} به {project} پیوست",
    memberJoinedTeam: "{name} به تیم شما پیوست",
  },
  toasts: {
    loadFailed: "بارگذاری اعلان‌ها ناموفق بود.",
    allRead: "همه اعلان‌ها خوانده‌شده علامت خوردند",
    markFailed: "علامت‌زدن اعلان‌ها به‌عنوان خوانده‌شده ممکن نبود.",
    markOneFailed: "علامت‌زدن این اعلان به‌عنوان خوانده‌شده ممکن نبود.",
  },
  auth: {
    title: "برای دیدن اعلان‌هایتان وارد شوید",
    description: "فعالیت پروژه‌ها، تیم‌ها و دنبال‌کنندگان شما این‌جا نمایش داده می‌شود.",
  },
  unreadOne: "{n} اعلان خوانده‌نشده",
  unreadMany: "{n} اعلان خوانده‌نشده",
  allCaughtUp: "همه را دیدید",
  markAll: "علامت‌زدن همه به‌عنوان خوانده‌شده",
  a11y: {
    filter: "فیلتر اعلان‌ها",
    unreadSuffix: "(خوانده‌نشده)",
  },
  filterAll: "همه",
  filterUnread: "خوانده‌نشده",
  filterUnreadCount: "خوانده‌نشده · {n}",
  loadFailed: {
    title: "بارگذاری اعلان‌ها ناموفق بود",
    description: "اتصال خود را بررسی کنید و دوباره تلاش کنید.",
  },
  noUnreadDesc: "در حال حاضر اعلان خوانده‌نشده‌ای نیست.",
  emptyDesc: "فعالیت پروژه‌ها، تیم‌ها و دنبال‌کنندگان شما این‌جا نمایش داده می‌شود.",
};
