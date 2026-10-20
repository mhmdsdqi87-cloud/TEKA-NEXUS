// TEKA NEXUS — fa dictionary: "dm" namespace (Task dm-1).
// پیام‌های خصوصی: برچسب ناوبری، فهرست گفتگوها، پنجره چت، توست‌ها.

import type { DmDict } from "../en/dm";

export const dm: DmDict = {
  title: "پیام‌ها",
  unreadAria: "پیام‌ها، {count} خوانده‌نشده",
  listAria: "فهرست گفتگوها",
  chatAria: "گفتگو با {name}",

  signInTitle: "برای دیدن پیام‌هات وارد شو",
  signInDesc: "گفتگوهای خصوصی‌ات اینجا نمایش داده می‌شود.",

  emptyTitle: "هنوز گفتگویی نداری",
  emptyDesc: "از پروفایل کاربرا شروع کن!",
  loadFailedTitle: "بارگذاری گفتگوها ناموفق بود",
  loadFailedDesc: "اتصالت را بررسی کن و دوباره تلاش کن.",

  selectChatTitle: "یک گفتگو را انتخاب کن",
  selectChatDesc: "پیام‌هایت با بقیه سازنده‌ها اینجا دیده می‌شود.",
  backToList: "بازگشت به گفتگوها",

  emptyChatTitle: "هنوز پیامی نیست",
  emptyChatDesc: "سلام کن 👋",

  placeholder: "پیامت را بنویس…",
  send: "ارسال",
  sendAria: "ارسال پیام",
  you: "تو",

  toasts: {
    sendFailed: "ارسال پیام ناموفق بود.",
    loadFailed: "بارگذاری پیام‌ها ناموفق بود.",
    conversationFailed: "باز کردن گفتگو ناموفق بود.",
  },

  profileCta: "پیام خصوصی",
};
