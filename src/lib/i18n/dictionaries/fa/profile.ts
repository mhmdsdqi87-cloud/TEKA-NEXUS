// TEKA NEXUS — Persian dictionary: "profile" namespace (owned by translation agent 2-d).

import type { ProfileDict } from "../en/profile";

export const profile: ProfileDict = {
  actions: {
    follow: "دنبال کردن",
    following: "دنبال‌شده",
    blocked: "مسدود",
    editProfile: "ویرایش پروفایل",
    moreActions: "اقدامات بیشتر",
    blockUser: "مسدود کردن کاربر",
    unblockUser: "لغو مسدودی کاربر",
    reportUser: "گزارش کاربر",
  },
  stats: {
    followers: "دنبال‌کننده‌ها",
    following: "دنبال‌شده‌ها",
    reputation: "اعتبار",
  },
  tabs: {
    contributions: "مشارکت‌ها",
    about: "درباره",
  },
  header: {
    memberSince: "عضو از {date}",
  },
  sections: {
    goals: "اهداف",
    interests: "علاقه‌مندی‌ها",
    skills: "مهارت‌ها",
  },
  contributionTypes: {
    task: "تسکی را تکمیل کرد",
    release: "نسخه‌ای را منتشر کرد",
    milestone: "مایلستونی را تکمیل کرد",
    update: "به‌روزرسانی منتشر کرد",
    collab: "عضو تیمی شد",
    created: "پروژه‌ای ساخت",
    other: "مشارکت داشت",
  },
  contributions: {
    notice: "اعتبار فقط از طریق مشارکت‌های تأییدشده به دست می‌آید — قابل خرید نیست.",
  },
  empty: {
    projects: {
      title: "هنوز پروژه عمومی وجود ندارد",
      description: "وقتی {name} پروژه‌هایی منتشر کند، اینجا نمایش داده می‌شوند.",
    },
    contributions: {
      title: "هنوز مشارکتی وجود ندارد",
      description: "تسک‌ها، مایلستون‌ها، نسخه‌ها و همکاری‌های تأییدشده به‌محض وقوع اینجا نمایش داده می‌شوند.",
    },
    about: {
      title: "این خالق هنوز جزئیات اضافه نکرده است",
      description: "بیو، مهارت‌ها و علاقه‌مندی‌هایش پس از تکمیل پروفایلش اینجا نمایش داده می‌شود.",
    },
  },
  about: {
    bio: "بیو",
    noBio: "هنوز بیویی وجود ندارد.",
    noneListed: "هنوز چیزی ثبت نشده است.",
    details: "جزئیات خالق",
    joined: "تاریخ عضویت: {date}",
  },
  notFound: {
    title: "خالق پیدا نشد",
    description: "این پروفایل وجود ندارد یا شاید حذف شده است.",
    action: "کاوش پروژه‌ها",
  },
  loadFailed: {
    title: "بارگذاری این پروفایل ممکن نشد",
    description: "اتصال اینترنت را بررسی کن و دوباره تلاش کن.",
  },
  report: {
    title: "گزارش {name}",
    description: "گزارش‌ها به صف بررسی می‌روند و تیم TEKA آن‌ها را بررسی می‌کند.",
    reason: "دلیل",
    pickReason: "یک دلیل انتخاب کن",
    detailsLabel: "توضیحات (اختیاری)",
    detailsPlaceholder: "هر توضیحی که به بررسی‌کنندگان کمک می‌کند اضافه کن.",
    submit: "ارسال گزارش",
  },
  reportReasons: {
    spam: "هرزنامه",
    harassment: "آزار و اذیت",
    inappropriate: "محتوای نامناسب",
    copyright: "نقض حق مؤلف",
    other: "سایر موارد",
  },
  toasts: {
    followed: "اکنون {name} را دنبال می‌کنی",
    unfollowed: "دنبال کردن {name} لغو شد",
    blocked: "@{name} مسدود شد",
    unblocked: "مسدودی @{name} برداشته شد",
    reportSubmitted: "گزارش ارسال شد — تیم ما آن را بررسی می‌کند.",
  },
  errors: {
    loadFailed: "بارگذاری این پروفایل ممکن نشد.",
    signInToFollow: "برای دنبال کردن خالق‌ها وارد شو.",
    followFailed: "به‌روزرسانی دنبال کردن ممکن نشد.",
    signInToBlock: "برای مدیریت مسدودی‌ها وارد شو.",
    blockFailed: "به‌روزرسانی مسدودی ممکن نشد.",
    reportFailed: "ارسال گزارش ممکن نشد.",
  },
  shared: {
    openProjectAria: "باز کردن پروژه {name}",
    likes: "پسندها",
    teamSize: "اندازه تیم",
    updated: "به‌روزرسانی‌شده {time}",
    coverAlt: "کاور {name}",
  },
};
