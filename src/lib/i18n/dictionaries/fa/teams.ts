// TEKA NEXUS — Persian dictionary: "teams" namespace.
// Owned by translation agent (Task 2-c).

import type { TeamsDict } from "../en/teams";

export const teams: TeamsDict = {
  tabs: {
    crews: "تیم‌های من",
    requests: "درخواست‌ها",
    discover: "کاوش",
  },
  auth: {
    title: "برای مدیریت تیم‌هایتان وارد شوید",
    description:
      "تیم‌هایتان را دنبال کنید، درخواست‌های همکاری را بررسی کنید و پروژه‌هایی را بیابید که به مهارت‌های شما نیاز دارند.",
  },
  titlePrefix: "",
  titleCrews: "تیم‌های تو",
  subtitle:
    "پروژه‌هایی را که با هم می‌سازید مدیریت کنید، به درخواست‌ها پاسخ دهید و همکاران تازه بیابید.",
  a11y: {
    yourRole: "نقش شما: {role}",
    sentAria: "درخواست‌های ارسال‌شده",
    receivedAria: "درخواست‌های دریافتی",
    viewProfileAria: "مشاهده نمایه {name}",
  },
  crews: {
    emptyTitle: "هنوز عضو تیمی نشده‌اید",
    emptyDesc:
      "به پروژه‌ای بپیوندید یا پروژه خودتان را بسازید — بهترین ساخته‌ها حاصل همکاری‌اند.",
    explore: "کاوش پروژه‌ها",
    start: "شروع یک پروژه",
    joined: "عضویت: {date}",
    open: "باز کردن فضای کاری",
    member: "{n} عضو",
    members: "{n} عضو",
  },
  requests: {
    sent: "ارسال‌شده",
    received: "دریافتی",
    pendingCount: "({n} در انتظار)",
    sentEmpty: "درخواستی نفرستاده‌اید — پروژه‌ای پیدا کنید و درخواست پیوستن بدهید.",
    receivedEmpty: "هنوز درخواستی دریافت نکرده‌اید. به ساختن ادامه دهید — توسعه‌دهنده‌ها شما را پیدا می‌کنند.",
    unknownProject: "پروژه نامشخص",
    appliedAs: "درخواست به‌عنوان {role} · {ago}",
    withdraw: "پس گرفتن",
    wantsToJoin: "می‌خواهد به {project} به‌عنوان {role} بپیوندد",
    wantsToJoinPrefix: "می‌خواهد به ",
    wantsToJoinMiddle: " به‌عنوان ",
    wantsToJoinSuffix: " بپیوندد",
    aProject: "یک پروژه",
    viewProject: "مشاهده پروژه",
  },
  status: {
    PENDING: "در انتظار",
    ACCEPTED: "پذیرفته‌شده",
    REJECTED: "ردشده",
    WITHDRAWN: "پس‌گرفته‌شده",
  },
  accept: "پذیرش",
  reject: "رد کردن",
  toasts: {
    withdrawn: "درخواست پس گرفته شد",
    accepted: "خوش آمدی — درخواست پذیرفته شد",
    rejected: "درخواست رد شد",
  },
  errors: {
    generic: "مشکلی پیش آمد",
  },
  discover: {
    title: "تیم‌هایی که عضو می‌گیرند",
    subtitle: "پروژه‌هایی با مهارت‌های موردنیاز — تیمی را بیابید که به دانسته‌های شما نیاز دارد.",
    emptyTitle: "در حال حاضر پروژه‌ای با مهارت‌های موردنیاز نیست",
    emptyDesc:
      "به‌جای آن، تازه‌ترین پروژه‌ها نشان داده می‌شوند — وقتی تیم‌های تازه نیازهایشان را ثبت کردند سر بزنید.",
  },
  chat: {
    title: "گفت‌وگوی تیم",
    online: "{n} آنلاین",
    onlineOne: "فقط تو آنلاینی",
    typing: "{names} داره می‌نویسه…",
    typingMulti: "{names} دارن می‌نویسن…",
    placeholder: "به هم‌تیمی‌هات پیام بده…",
    send: "ارسال",
    empty: "هنوز پیامی نیست — یه سلام بنداز 👋",
    emptyHint: "پیام‌های تیم همین‌جا برای همه نمایش داده می‌شه.",
    synced: "همگام",
    sendError: "پیام ارسال نشد",
    unavailable: "گفت‌وگو فعلاً در دسترس نیست",
    emoji: "ایموجی",
    disconnected: "اتصال قطع شد",
    reconnecting: "در حال وصل شدن دوباره…",
    deleted: "پیام حذف شد",
    loginRequired: "برای گفت‌وگو اول وارد شو",
    reactAdd: "افزودن واکنش",
    rateLimited: "آروم‌تر 🙂 چند تا پیام پشت‌سرهم فرستادی",
    charsLeft: "{n} کاراکتر مونده",
    a11y: {
      openChat: "باز کردن گفت‌وگوی تیم {name}",
      closeChat: "بستن گفت‌وگو",
      deleteMessage: "حذف پیام",
      messages: "پیام‌ها",
    },
  },
};
