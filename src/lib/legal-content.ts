// TEKA NEXUS — real, plain-language legal & community content.
// Rendered by the landing footer dialog. Written honestly: this is a
// one-person, self-funded, free platform — no corporate boilerplate.

export type LegalDoc = "terms" | "privacy" | "guidelines";

export type LegalSection = {
  heading: { fa: string; en: string };
  body: { fa: string; en: string };
};

export const LEGAL_CONTENT: Record<LegalDoc, LegalSection[]> = {
  terms: [
    {
      heading: { fa: "این پلتفرم چیست؟", en: "What is this platform?" },
      body: {
        fa: "تکا نکسوس یک شبکهٔ اجتماعی برای برنامه‌نویس‌ها و یک آکادمی برنامه‌نویسی رایگان است. توسط یک نفر، به‌صورت داوطلبانه و با هزینهٔ شخصی ساخته و نگه داشته می‌شود. استفاده از آن کاملاً رایگان است — نه حق عضویتی وجود دارد و نه چیزی برای فروش.",
        en: "TEKA NEXUS is a social network for developers and a free coding academy. It is built and maintained by one person, voluntarily and at personal cost. Using it is completely free — there is no membership fee and nothing for sale.",
      },
    },
    {
      heading: { fa: "خدمت «همین‌که هست»", en: "The service is provided as-is" },
      body: {
        fa: "این پلتفرم بدون هیچ‌گونه ضمانت ارائه می‌شود. ممکن است قطع شود، باگ داشته باشد یا ویژگی‌ای تغییر کند. تلاش می‌کنم همیشه در دسترس و سالم باشد، اما هیچ قول قطعی نمی‌دهم — این یک پروژهٔ یادگیری و علاقه‌مندانه است، نه یک محصول تجاری.",
        en: "This platform is provided without any warranty. It may go down, have bugs, or change features. I try hard to keep it online and healthy, but I make no absolute promises — this is a learning project built with care, not a commercial product.",
      },
    },
    {
      heading: { fa: "حساب کاربری", en: "Your account" },
      body: {
        fa: "برای مشارکت (انتشار پروژه، گفت‌وگو، شرکت در بازی‌های آرنا) یک حساب می‌سازی و مسئول محتوایی که منتشر می‌کنی خودت هستی. هر نفر یک حساب؛ حساب‌های جعلی یا جعل هویت دیگران حذف می‌شوند. هر زمان بخواهی می‌توانی از صفحهٔ تنظیمات حسابت را کامل حذف کنی.",
        en: "To participate (posting projects, chatting, playing Arena games) you create an account and are responsible for what you post. One account per person; fake or impersonating accounts are removed. You can delete your account completely at any time from Settings.",
      },
    },
    {
      heading: { fa: "محتوای تو متعلق به خودت است", en: "Your content belongs to you" },
      body: {
        fa: "کد و پروژه‌هایی که منتشر می‌کنی مالکیت خودت می‌ماند. با انتشارشان، فقط این اجازه را به پلتفرم می‌دهی که آن‌ها را نمایش دهد و در فید و پروفایلت نشان دهد — نه بیشتر.",
        en: "Code and projects you publish remain your property. By publishing them, you only give the platform permission to display them in feeds and on your profile — nothing more.",
      },
    },
    {
      heading: { fa: "استفادهٔ منصفانه", en: "Fair use" },
      body: {
        fa: "استفاده برای یادگیری و همکاری آزاد است. اما سوءاستفاده ممنوع: خرابکاری، اسپم، آزار دیگران، تلاش برای نفوذ یا اختلال در سرویس، و دور زدن محدودیت‌ها باعث مسدود شدن حساب می‌شود.",
        en: "Learning and collaborating are free and welcome. Abuse is not: sabotage, spam, harassing others, attempting to break or disrupt the service, or circumventing limits will get an account blocked.",
      },
    },
    {
      heading: { fa: "امتیاز و سکه‌ها", en: "XP and coins" },
      body: {
        fa: "امتیاز (XP)، سکه، نشان‌ها و گواهی‌های آکادمی فقط بخشی از بازی‌اند؛ ارزش مالی ندارند، قابل خرید و فروش نیستند و در آینده هم نخواهند بود.",
        en: "XP, coins, badges and academy certificates are part of the game; they have no monetary value, cannot be bought or sold, and never will be.",
      },
    },
  ],

  privacy: [
    {
      heading: { fa: "چه اطلاعاتی جمع می‌شود؟", en: "What is collected?" },
      body: {
        fa: "فقط چیزهایی که برای کار کردن پلتفرم لازم است: نام کاربری، ایمیل، تصویر و رنگ آواتار، پیشرفت آموزشی، و محتوایی که خودت منتشر می‌کنی (پروژه‌ها، پیام‌ها، دیدگاه‌ها). هیچ چیز پنهانی جمع نمی‌شود.",
        en: "Only what the platform needs to work: username, email, avatar color and image, learning progress, and content you publish (projects, messages, comments). Nothing is collected in secret.",
      },
    },
    {
      heading: { fa: "کوکی و نشست ورود", en: "Cookies and session" },
      body: {
        fa: "برای اینکه لاگ‌مانده بمانی، یک کوکی نشست (فقط برای احراز هویت) استفاده می‌شود. یادداشت‌های درس‌ها و نشانک‌ها روی خود دستگاه تو (localStorage) ذخیره می‌شوند، نه روی سرور. هیچ کوکی تبلیغاتی یا ردیاب تحلیلی وجود ندارد.",
        en: "To keep you signed in, one session cookie is used (authentication only). Lesson notes and bookmarks are stored on your own device (localStorage), not on the server. There are no ad cookies and no analytics trackers.",
      },
    },
    {
      heading: { fa: "فروش داده؟ نه.", en: "Selling data? No." },
      body: {
        fa: "اطلاعات تو فروخته نمی‌شود، اجاره داده نمی‌شود و برای تبلیغات استفاده نمی‌شود. این پلتفرم تبلیغ ندارد و نخواهد داشت.",
        en: "Your data is not sold, rented out, or used for advertising. This platform has no ads and will not have any.",
      },
    },
    {
      heading: { fa: "سرویس‌های بیرونی", en: "Third-party services" },
      body: {
        fa: "برای بخش اجتماع گیت‌هاب، درخواست‌ها به API عمومی گیت‌هاب زده می‌شود. اگر از امکانات هوش مصنوعی استفاده کنی، متن درخواستت برای پردازش به سرویس هوش مصنوعی ارسال می‌شود. هیچ سرویس بیرونی دیگری داده‌ای از تو دریافت نمی‌کند.",
        en: "The GitHub community hub makes requests to the public GitHub API. If you use the AI features, your prompt text is sent to the AI service for processing. No other third party receives your data.",
      },
    },
    {
      heading: { fa: "کنترل با خودت است", en: "You stay in control" },
      body: {
        fa: "می‌توانی پروفایلت را هر زمان ویرایش کنی، تنظیمات اعلان‌ها را تغییر دهی، و از صفحهٔ تنظیمات با تأیید رمز عبور، حساب و همهٔ داده‌هایت را برای همیشه حذف کنی. اگر سؤالی دربارهٔ داده‌هایت داری، از همان‌جا یا از صفحهٔ گیت‌هاب پروژه پیگیری کن.",
        en: "You can edit your profile anytime, change notification preferences, and — with password confirmation — permanently delete your account and all of its data from Settings. If you have questions about your data, reach out there or via the project's GitHub page.",
      },
    },
  ],

  guidelines: [
    {
      heading: { fa: "اینجا جای یادگیری است", en: "This is a place to learn" },
      body: {
        fa: "بسیاری از اعضای اینجا تازه شروع کرده‌اند — شاید سؤال‌های ساده بپرسند، شاید کدی بنویسند که خطا دارد. با حوصله رفتار کن؛ همهٔ ما یک روز از صفر شروع کردیم.",
        en: "Many members here are just starting out — they may ask simple questions or write code full of bugs. Be patient with them; every one of us once started from zero.",
      },
    },
    {
      heading: { fa: "با مهربانی", en: "Be kind" },
      body: {
        fa: "تحقیر، توهین، تبعیض، آزار و شکار شخصی جایز نیست — نه در پروژه‌ها، نه در گفت‌وگوها، نه در هیچ‌جای این پلتفرم. نقد کد آزاد است؛ نقدِ شخص، نه.",
        en: "No humiliation, insults, discrimination, harassment or witch-hunting — not in projects, not in chats, nowhere. Critique the code freely; never the person.",
      },
    },
    {
      heading: { fa: "کار واقعی منتشر کن", en: "Share real work" },
      body: {
        fa: "پروژه‌ای که منتشر می‌کنی مال خودت باشد یا با اجازه. کپی‌برداری بدون ذکر منبع، اسپم کردن فید، و تبلیغ محصول برای فروش، فضای یادگیری را خراب می‌کند.",
        en: "Publish work that is yours, or shared with permission. Uncredited copying, feed spam, and advertising products for sale damage the learning space for everyone.",
      },
    },
    {
      heading: { fa: "اگر چیزی دیدی، بگو", en: "See something, say something" },
      body: {
        fa: "اگر محتوای آزاردهنده یا خطرناکی دیدی، آن را گزارش کن یا کاربر را بلاک کن. گزارش‌ها جدی گرفته می‌شوند.",
        en: "If you see harmful or dangerous content, report it or block the user. Reports are taken seriously.",
      },
    },
    {
      heading: { fa: "پیامد تخلف‌ها", en: "When rules are broken" },
      body: {
        fa: "برای تخلف کوچک: تذکر. برای تکرار: محدود شدن. برای آزار جدی یا تلاش برای نفوذ: مسدود شدن کامل حساب. این قانون‌ها ساده‌اند چون قرار است برای همه — از جمله سازندهٔ این پلتفرم — رعایت شوند.",
        en: "Minor violations get a warning. Repeats get limited. Serious harassment or attempted break-ins get the account fully blocked. These rules are simple because they apply to everyone — including the person who built this platform.",
      },
    },
  ],
};
