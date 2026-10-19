// TEKA NEXUS — Persian dictionary: "projectNew" namespace.
// Owned by translation agent (Task 2-c).

import type { ProjectNewDict } from "../en/projectNew";

export const projectNew: ProjectNewDict = {
  auth: {
    title: "ورود لازم است",
    description: "برای انتشار پروژه به حساب TEKA NEXUS نیاز دارید.",
    goLogin: "رفتن به صفحه ورود",
  },
  title: "انتشار یک پروژه",
  subtitle: "به جهان بگویید چه می‌سازید.",
  form: {
    name: "نام پروژه",
    namePlaceholder: "مثلاً Nexus CLI",
    slugHint: "شناسه نشانی شما حین تایپ این‌جا نمایش داده می‌شود.",
    tagline: "جمله معرفی",
    taglinePlaceholder: "جمله‌ای که ایده را بفروشد",
    category: "دسته‌بندی",
    status: "وضعیت",
    statusPlaceholder: "وضعیتی انتخاب کنید",
    visibility: "قابلیت مشاهده",
    tags: "برچسب‌ها",
    maxTagsReached: "به سقف ۸ برچسب رسیدید",
    tagPlaceholder: "برچسبی بنویسید و Enter بزنید",
    optional: "(اختیاری)",
    links: "پیوندها",
    description: "توضیحات",
    descriptionPlaceholder: "چه می‌سازید؟ برای چه کسی؟ چه چیزی آن را متمایز می‌کند؟",
    descriptionHint: "متن ساده یا Markdown.",
    requiredSkills: "مهارت‌های موردنیاز",
    repoUrl: "نشانی مخزن",
    demoUrl: "نشانی نسخه نمایشی",
    websiteUrl: "نشانی وب‌سایت",
  },
  a11y: {
    categoryGroup: "دسته‌بندی پروژه",
    visibilityGroup: "قابلیت مشاهده پروژه",
    removeTag: "حذف برچسب {tag}",
  },
  visibilityDesc: {
    PUBLIC: "در بخش کاوش و جریان زنده نمایش داده می‌شود. همه می‌توانند ببینند.",
    UNLISTED: "فقط با لینک مستقیم قابل مشاهده است؛ از کاوش و جریان پنهان است.",
    PRIVATE: "فقط شما و اعضای تیم‌تان می‌توانید این پروژه را ببینید.",
  },
  visibilityName: {
    PUBLIC: "عمومی",
    UNLISTED: "فهرست‌نشده",
    PRIVATE: "خصوصی",
  },
  errors: {
    name: "نام باید بین ۳ تا ۸۰ نویسه باشد.",
    taglineRequired: "جمله معرفی الزامی است.",
    taglineMax: "حداکثر {n} نویسه.",
    category: "برای پروژه‌تان دسته‌بندی انتخاب کنید.",
    url: "باید با http:// یا https:// شروع شود",
  },
  toasts: {
    maxTags: "حداکثر {n} برچسب",
    fixFields: "پیش از انتشار، فیلدهای مشخص‌شده را اصلاح کنید.",
    launched: "پروژه منتشر شد",
    createFailed: "ایجاد پروژه ناموفق بود",
  },
  submitting: "در حال انتشار…",
  submit: "انتشار پروژه",
};
