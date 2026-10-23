/**
 * TEKA NEXUS — additive community seeder (safe for the LIVE database).
 *
 * Unlike scripts/seed.ts (which WIPES everything and must never run on the
 * shared production database), this seeder:
 *   - creates demo users only if their email does not exist yet
 *   - creates demo projects only if their slug does not exist yet
 *   - never deletes anything (founder & real users are untouched)
 *   - is idempotent: running it twice is a no-op
 *
 * Content is Persian-first (the platform's audience) and backdated so the
 * community looks alive: projects, discussions, likes, follows, updates,
 * academy progress and certificates.
 *
 * Run:  unset DATABASE_URL DIRECT_URL && bun scripts/seed-community.ts
 */
import { randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ─── helpers ─────────────────────────────────────────────────

/** Mirrors src/lib/auth.ts hashPassword() exactly (scrypt + per-user salt). */
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const daysAgo = (d: number, hourJitter = 0) =>
  new Date(Date.now() - d * 86400000 - hourJitter * 3600000);

const DEMO_EMAIL_DOMAIN = "community.teka.dev";
/** Shared demo password — tell the founder so they can post as these personas. */
const DEMO_PASSWORD = "TekaDemo!1404";

/** Themed cover for every seeded project (matches /public/covers). */
const PROJECT_COVERS: Record<string, string> = {
  "takbook": "/covers/takbook.png",
  "challenge-kadeh": "/covers/challenge-kadeh.png",
  "hamyar-python": "/covers/hamyar-python.png",
  "donyaye-pixel": "/covers/donyaye-pixel.png",
  "masiryar": "/covers/masiryar.png",
  "negahban-form": "/covers/negahban-form.png",
};

// Ghost community: social-proof followers for the founder + organic likes.
const GHOST_TARGET_FOLLOWERS = 2578;
const GHOST_EMAIL_DOMAIN = "ghost.teka.dev";
// Weighted like distribution so "popular" ordering is believable.
const GHOST_LIKE_WEIGHTS: [string, number][] = [
  ["takbook", 0.35],
  ["hamyar-python", 0.25],
  ["challenge-kadeh", 0.15],
  ["donyaye-pixel", 0.12],
  ["masiryar", 0.08],
  ["negahban-form", 0.05],
];

function pickWeighted(weights: [string, number][]): string {
  const r = Math.random();
  let acc = 0;
  for (const [key, w] of weights) {
    acc += w;
    if (r < acc) return key;
  }
  return weights[weights.length - 1][0];
}

const GHOST_NAME_PREFIX = [
  "ali", "reza", "sara", "amir", "mahdi", "nima", "shirin", "elham",
  "hasan", "fateme", "pourya", "zeinab", "hossein", "maryam", "behnam",
  "nasim", "sina", "taraneh", "kaveh", "parisa",
];
const GHOST_NAME_SUFFIX = [
  "dev", "code", "web", "py", "js", "ui", "ops", "hex", "byte", "node",
  "pixel", "logic", "wave", "spark", "bit", "cloud", "stack", "flow",
];
const GHOST_BIOS = [
  "", "", "", "در حال یادگیری برنامه‌نویسی", "دوستدار تکنولوژی", "علاقه‌مند به دنیای وب",
  "پایتون‌باز", "دنبال‌کنندهٔ اخبار تک", "", "",
];

// ─── demo personas (Persian-first) ───────────────────────────

type Persona = {
  username: string;
  displayName: string;
  email: string;
  avatarColor: string;
  bio: string;
  skills: string[];
  interests: string[];
  goals: string[];
  website: string;
  xp: number;
  reputation: number;
  joinedDaysAgo: number;
};

const PERSONAS: Persona[] = [
  {
    username: "arash_dev",
    displayName: "آرش محمدی",
    email: `arash@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "cyan",
    bio: "فرانت‌اند کار و معلم برنامه‌نویسی بچه‌های محله 😄 عاشق ساختن چیزایی که فارسی‌زبا‌ها توش راحت باشن. الان روی تک‌بوک کار می‌کنم.",
    skills: ["frontend-development", "technical-writing"],
    interests: ["WEB_DEVELOPMENT", "OPEN_SOURCE", "DESIGN_TOOLS"],
    goals: ["build", "learn"],
    website: "",
    xp: 640,
    reputation: 48,
    joinedDaysAgo: 64,
  },
  {
    username: "sara_codes",
    displayName: "سارا کریمی",
    email: `sara@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "violet",
    bio: "بک‌اند کار پایتونی. سه ساله با جنگو و فست‌اپی‌آی نون در میارم. فکر می‌کنم هر کدی باید یه داستان قابل فهم داشته باشه — حتی واسه کسی که شش ماه بعد می‌خواد بخونتش!",
    skills: ["backend-development", "ai-and-data"],
    interests: ["DEVELOPER_TOOLS", "OPEN_SOURCE", "DATA_SCIENCE"],
    goals: ["build", "contribute"],
    website: "",
    xp: 890,
    reputation: 61,
    joinedDaysAgo: 58,
  },
  {
    username: "mohsen_ui",
    displayName: "محسن رضایی",
    email: `mohsen@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "ember",
    bio: "دیزاینر کدنویس. تایپوگرافی فارسی، رنگ و موشن موضوع‌های همیشگی منه. اگه رابط کاربریت به فارسی زشت بود، بگرد دنبال من 😁",
    skills: ["ui-ux", "frontend-development"],
    interests: ["DESIGN_TOOLS", "WEB_DEVELOPMENT", "INDIE_GAMES"],
    goals: ["build", "discover"],
    website: "",
    xp: 320,
    reputation: 22,
    joinedDaysAgo: 41,
  },
  {
    username: "niloofar_ml",
    displayName: "نیلوفر احمدی",
    email: `niloofar@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "lime",
    bio: "دانشجوی ارشد هوش مصنوعی. روی پردازش زبان فارسی کار می‌کنم — مدل‌هایی که فارسی رو جدی بگیرن، نه ترجمهٔ بد انگلیسی. عاشق دیتاست تمیزم.",
    skills: ["ai-and-data", "product-management"],
    interests: ["ARTIFICIAL_INTELLIGENCE", "DATA_SCIENCE", "MOBILE_DEVELOPMENT"],
    goals: ["build", "learn"],
    website: "",
    xp: 1050,
    reputation: 77,
    joinedDaysAgo: 72,
  },
  {
    username: "reza_gamedev",
    displayName: "رضا موسوی",
    email: `reza@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "rose",
    bio: "بازی‌ساز مستقل با گودو. یه بازی دوبعدی ایرانی می‌سازم که بوی شمال می‌ده 🌊 شیدرها و اسپرایت‌های دستی، بدون موتور آماده.",
    skills: ["game-development", "ui-ux"],
    interests: ["INDIE_GAMES", "DESIGN_TOOLS", "OTHER_TECHNOLOGY"],
    goals: ["build"],
    website: "",
    xp: 410,
    reputation: 29,
    joinedDaysAgo: 36,
  },
  {
    username: "mahsa_flutter",
    displayName: "مهسا توکلی",
    email: `mahsa@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "gold",
    bio: "موبایل‌دولوپر فلاتری. وسواس ۶۰ فریم روی گوشی‌های میان‌رده. معتقدم اپ فارسی حق داره هم خوشگل باشه هم سبک.",
    skills: ["mobile-development", "ui-ux"],
    interests: ["MOBILE_DEVELOPMENT", "HARDWARE_IOT", "WEB_DEVELOPMENT"],
    goals: ["contribute", "learn"],
    website: "",
    xp: 260,
    reputation: 18,
    joinedDaysAgo: 25,
  },
  {
    username: "amir_sec",
    displayName: "امیر حسینی",
    email: `amir@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "cyan",
    bio: "امنیت‌کار و دواپس. از بچگی کنجکاوم که چیزا چطور از داخل کار می‌کنن — الان حقوقیه که این کنجکاوی رو بخرن 😅 سخت‌گیرم روی اعتبارسنجی ورودی!",
    skills: ["devops", "qa-testing"],
    interests: ["CYBERSECURITY", "DEVELOPER_TOOLS", "OPEN_SOURCE"],
    goals: ["build", "contribute"],
    website: "",
    xp: 720,
    reputation: 53,
    joinedDaysAgo: 49,
  },
  {
    username: "zahra_docs",
    displayName: "زهرا نوری",
    email: `zahra@${DEMO_EMAIL_DOMAIN}`,
    avatarColor: "violet",
    bio: "نویسندهٔ مستندات فنی. ترجمهٔ مغز مهندس به جمله‌ی قابل فهم شغل منه. باور دارم بهترین کد بی‌مستندات، کد گمشده‌ست.",
    skills: ["technical-writing", "product-management"],
    interests: ["OPEN_SOURCE", "WEB_DEVELOPMENT", "DEVELOPER_TOOLS"],
    goals: ["contribute", "discover"],
    website: "",
    xp: 180,
    reputation: 12,
    joinedDaysAgo: 18,
  },
];

// ─── demo projects ───────────────────────────────────────────

type DemoProject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  ownerUsername: string;
  tags: string[];
  requiredSkills: string[];
  memberUsernames: { username: string; role: string }[];
  createdDaysAgo: number;
  updates?: { title: string; body: string; daysAgo: number }[];
};

const PROJECTS: DemoProject[] = [
  {
    slug: "takbook",
    name: "تک‌بوک",
    tagline: "کتابخانهٔ متن‌باز کتاب‌های آموزشی برنامه‌نویسی به فارسی",
    description:
      "تک‌بوک یه کتابخانهٔ آنلاین و رایگانه که کتاب‌ها و جزوه‌های درست‌وحسابی برنامه‌نویسی فارسی رو یه‌جا جمع می‌کنه.\n\nمشکل همیشه یکی بوده: منابع فارسی یا قدیمین، یا ترجمهٔ ماشینی بد دارن، یا پخشن تو ده تا کانال تلگرامی. تک‌بوک منابع رو با دسته‌بندی تمیز، جستجوی فارسی و صفحهٔ خوانایی راحت نشون می‌ده.\n\nهر کتاب یه صفحهٔ اختصاصی داره با فهرست، حجم، سطح (مبتدی تا پیشرفته) و تگ موضوعی. کاربرا می‌تونن منبع پیشنهاد بدن و بعد از بازبینی، کتاب اضافه می‌شه.\n\nنقشهٔ راه بعدی: حالت شب، ذخیرهٔ صفحه و پیشنهاد هوشمند بر اساس مسیر یادگیری.",
    category: "WEB_DEVELOPMENT",
    status: "RELEASED",
    ownerUsername: "arash_dev",
    tags: ["آموزش", "کتابخانه", "فارسی", "متن‌باز"],
    requiredSkills: ["frontend-development", "technical-writing", "backend-development"],
    memberUsernames: [
      { username: "zahra_docs", role: "CONTRIBUTOR" },
      { username: "mohsen_ui", role: "CONTRIBUTOR" },
    ],
    createdDaysAgo: 40,
    updates: [
      {
        title: "نسخهٔ ۱.۲ منتشر شد — جستجوی فارسی و ۴۰ کتاب جدید",
        body:
          "بالاخره جستجوی فارسی با نرمال‌سازی «ی/ي» و «ک/ك» راه افتاد و دیگه فرقی نمی‌کنه با کدوم کلید تایپ کنی.\n\n۴۰ منبع جدید هم اضافه شد — از مقدمهٔ پایتون تا طراحی پایگاه‌داده. از همهٔ دوستایی که پیشنهاد دادن ممنونم 🙏\n\nقدم بعدی: حالت شب و ذخیرهٔ صفحه.",
        daysAgo: 6,
      },
      {
        title: "اولین نسخهٔ عمومی تک‌بوک آماده‌ست!",
        body:
          "بعد از سه ماه کار آخر شب‌ها، تک‌بوک به نسخهٔ عمومی رسید 🎉\n\n۱۲۰ منبع فارسی توش هست، دسته‌بندی‌ها تمیزن و روی موبایل هم روانه. بازخوردتون رو همین‌جا بنویسید — مخصوصاً اگه جایی با فارسی‌خوانی مشکل داشتید.",
        daysAgo: 21,
      },
    ],
  },
  {
    slug: "challenge-kadeh",
    name: "چالش‌کده",
    tagline: "چالش‌های هفتگی برنامه‌نویسی با داوری کد به فارسی",
    description:
      "چالش‌کده هر هفته یه مسئلهٔ برنامه‌نویسی واقعی می‌ده و کدت رو آدم‌ها داوری می‌کنن — نه فقط تست خودکار.\n\nفرقش با سرویس‌های خارجی چیه؟ صورت مسئله و بازخورد به فارسی، سطح‌بندی از مبتدی تا پیشرفته، و تمرکز روی خوانایی و طراحی کد، نه فقط جواب درست.\n\nهر چالش سه بخش داره: صورت مسئله، ورودی/خروجی نمونه، و یک «نکتهٔ طراحی» که بعد از تحویل باز می‌شه. امتیاز کافئین ☕ برای پاداش شرکت منظم.\n\nدر حال ساخت نسخهٔ اول هستیم؛ علاقه‌مند به همکاری با فارسی‌زبا‌های علاقه‌مند به الگوریتم و داوری.",
    category: "DEVELOPER_TOOLS",
    status: "IN_DEVELOPMENT",
    ownerUsername: "sara_codes",
    tags: ["الگوریتم", "چالش", "آموزش"],
    requiredSkills: ["backend-development", "qa-testing", "frontend-development"],
    memberUsernames: [{ username: "amir_sec", role: "CONTRIBUTOR" }],
    createdDaysAgo: 26,
    updates: [
      {
        title: "داور کد نسخهٔ صفر راه افتاد",
        body:
          "فرم داوری کد آماده شد: هر داور می‌تونه سه برچسب بزنه — «خوانایی»، «کارایی» و «طراحی» — و توضیح بده چرا.\n\nهفتهٔ بعد اولین چالش آزمایشی رو با گروه کوچیک می‌گیریم تا جریان بازخورد رو بسناجیم.",
        daysAgo: 4,
      },
    ],
  },
  {
    slug: "hamyar-python",
    name: "همیار پایتون",
    tagline: "چت‌بات آموزش پایتون برای مبتدی‌های فارسی‌زبان",
    description:
      "همیار پایتون یه چت‌بات آموزشیه که به فارسی محاوره‌ای، مفاهیم پایتون رو قدم‌به‌قدم توضیح می‌ده و مثل معلم سقراطی، جواب آماده نمی‌ده — راهنمایی می‌کنه تا خودت به جواب برسی.\n\nتصمیم سقراطی عمدیه: باور داریم جواب‌های آماده یادگیری رو می‌کشن. بات به‌جای جواب، سؤال می‌پرسه، حدست رو می‌گه و وقتی گیر کردی یه راهنمای کوچیک می‌ده.\n\nمدل زبانی روی پایه‌ای فارسی تنظیم شده و بخش تمرین به ادیتور آنلاین وصله: بات پیشنهاد می‌ده، تو اجراش می‌کنی.\n\nفعلاً روی مباحث متغیر، شرط، حلقه، لیست و تابع تمرکز داریم.",
    category: "ARTIFICIAL_INTELLIGENCE",
    status: "BETA",
    ownerUsername: "niloofar_ml",
    tags: ["هوش مصنوعی", "پایتون", "آموزش"],
    requiredSkills: ["ai-and-data", "frontend-development", "technical-writing"],
    memberUsernames: [{ username: "zahra_docs", role: "VIEWER" }],
    createdDaysAgo: 33,
    updates: [
      {
        title: "نسخهٔ بتا با ۵۰۰ کاربر آزمایشی",
        body:
          "باتا ۵۰۰ کاربر آزمایشی از دانشجوهای ویدیو-آموزشی‌های پایتون، بازخورد جمع کردیم.\n\nنکتهٔ جالب: ۷۰٪ کاربرا گفتن حالت «راهنمایی به‌جای جواب» باعث شد مطلب رو بهتر یاد بگیرن؛ ولی ۳۰٪ توی جلسهٔ اول گیج شدن. داریم روی تشخیص «سطح گیر کردن» کار می‌کنیم تا راهنمایی‌ها ملایم‌تر بشن.",
        daysAgo: 9,
      },
    ],
  },
  {
    slug: "donyaye-pixel",
    name: "دنیای پیکسل",
    tagline: "بازی دوبعدی ایرانی با گودو — الهام از افسانه‌های شمال",
    description:
      "دنیای پیکسل یه بازی سکوبازی دوبعدیه که فضاش از طبیعت و افسانه‌های شمال ایران الهام گرفته: جنگل‌های مه‌گرفته، دریا و موجوداتی که مادربزرگ‌ها ازشون تعریف می‌کردن.\n\nهمه‌چیز دستی ساخته می‌شه: اسپرایت‌ها با پیکسل‌آرت خودم، موسیقی با ملودی‌های محلی، و دیالوگ‌ها کاملاً فارسی.\n\nموتور: گودو ۴. ساختار مرحله‌ها بر اساس سه فصل منه — جنگل، ساحل و کوه. دمو اولیه رو به‌زودی می‌ذارم.\n\nدنبال اسپرایت‌آرتیست و صداگذار علاقه‌مندم!",
    category: "INDIE_GAMES",
    status: "IN_DEVELOPMENT",
    ownerUsername: "reza_gamedev",
    tags: ["بازی", "گودو", "پیکسل‌آرت"],
    requiredSkills: ["game-development", "ui-ux", "other"],
    memberUsernames: [{ username: "mohsen_ui", role: "CONTRIBUTOR" }],
    createdDaysAgo: 17,
  },
  {
    slug: "masiryar",
    name: "مسیر یار",
    tagline: "اپ نقشهٔ راه برنامه‌نویسی با یادآور روزانه",
    description:
      "مسیر یار به تازه‌کارها کمک می‌کنه وسط راه گم نشن: مسیر شغلی رو انتخاب می‌کنی (فرانت‌اند، بک‌اند، موبایل، دیتا) و اپ هر روز یه گام کوچیک و مشخص بهت می‌ده.\n\nهر گام یه تمرین واقعیه، نه فقط «ویدیو ببین»: بنویس، خراب کن، درستش کن. زنجیرهٔ روزهای پشت‌سرهم و یادآور هوشمند که وقت خالیت رو پیدا می‌کنه، انگیزه رو نگه می‌داره.\n\nنمودار پیشرفت ساده‌ست و قشنگ: می‌بینی کجای نقشه‌ای و چقدر مونده.\n\nالان تو فاز طراحی‌ایم؛ دنبال فلاتری‌ست که تجربهٔ آفلاین-فرست بلده.",
    category: "MOBILE_DEVELOPMENT",
    status: "PLANNING",
    ownerUsername: "mahsa_flutter",
    tags: ["موبایل", "فلاتر", "آموزش"],
    requiredSkills: ["mobile-development", "ui-ux", "product-management"],
    memberUsernames: [],
    createdDaysAgo: 11,
  },
  {
    slug: "negahban-form",
    name: "نگهبان فرم",
    tagline: "کتابخانهٔ اعتبارسنجی فرم فارسی — کد ملی، شبا، موبایل",
    description:
      "نگهبان فرم یه کتابخانهٔ سبک اعتبارسنجی مخصوص فرم‌های فارسیه: کد ملی با الگوریتم درست، شمارهٔ شبا، شمارهٔ موبایل همهٔ اپراتورها، پلاک ماشین و کد پستی.\n\nچرا این مهمه؟ چون همهٔ پروژه‌های ایرانی هر بار همین چند تا اعتبارسنجی رو از اول می‌نویسن و ۹۰٪شون کد ملی رو با رجکس چک می‌کنن، نه با الگوریتم واقعی.\n\nهدف: صفر وابستگی، تایپ‌اسکریپت کامل، پشتیبانی از React و Vue، و مستندات فارسی با مثال واقعی.",
    category: "CYBERSECURITY",
    status: "IDEA",
    ownerUsername: "amir_sec",
    tags: ["اعتبارسنجی", "کتابخانه", "تایپ‌اسکریپت"],
    requiredSkills: ["backend-development", "frontend-development", "qa-testing"],
    memberUsernames: [],
    createdDaysAgo: 5,
  },
];

// ─── demo discussions ────────────────────────────────────────

type DemoComment = {
  projectSlug: string;
  authorUsername: string;
  body: string;
  hoursAgo: number;
  replyToBodyPrefix?: string; // body prefix of the comment this replies to
};

const COMMENTS: DemoComment[] = [
  {
    projectSlug: "takbook",
    authorUsername: "sara_codes",
    body: "این پروژه دقیقاً چیزیه که دلم می‌خواست سال‌ها بود کسی می‌ساخت! سؤال فنی: جستجوی فارسی رو با چه موتوری پیاده کردی؟ الستیک‌سیرچ سنگینه برای پروژه‌ای با این بودجهٔ صفر 😄",
    hoursAgo: 96,
  },
  {
    projectSlug: "takbook",
    authorUsername: "arash_dev",
    body: "ممنون سارا! نه، الستیک نه — از Postgres با امتیازدهی ساده استفاده کردم: نرمال‌سازی حروف عربی/فارسی، حذف نیم‌فاصله و جستجوی trigram. تا چند هزار سند عالی جواب می‌ده و هیچ سرویس اضافه‌ای لازم نداره. بعداً اگه لازم شد مهاجرت می‌کنیم.",
    hoursAgo: 90,
    replyToBodyPrefix: "این پروژه دقیقاً چیزیه",
  },
  {
    projectSlug: "takbook",
    authorUsername: "zahra_docs",
    body: "فهرست‌های خلاصهٔ هر کتاب رو خودت می‌نویسی یا از خود متن استخراج می‌شه؟ اگه بخوای، بخش راهنمای مشارکت رو می‌تونم بنویسم که بقیه هم بتونن منبع پیشنهاد بدن.",
    hoursAgo: 40,
  },
  {
    projectSlug: "takbook",
    authorUsername: "mohsen_ui",
    body: "تایپوگرافی صفحهٔ کتاب واقعاً تمیزه 👌 فقط یه پیشنهاد: فاصلهٔ خطوط توی حالت خواندن طولانی یه کم کمه؛ ۱.۸ به بالا چشم رو خیلی راحت‌تر نگه می‌داره.",
    hoursAgo: 12,
  },
  {
    projectSlug: "challenge-kadeh",
    authorUsername: "mahsa_flutter",
    body: "ایدهٔ داوری انسانی به‌جای تست خودکار فوق‌العاده‌ست — تو مسابقه‌های بیرونی همیشه حس می‌کردم کد خوانا جایی نداره! داوری کد فارسی رو چطور مدیریت می‌کنید؟ کامنت با جهت RTL سخت می‌شه گاهی.",
    hoursAgo: 50,
  },
  {
    projectSlug: "challenge-kadeh",
    authorUsername: "sara_codes",
    body: "دقیقاً همین مشکل اذیتمون می‌کرد! راه‌حل موقت: کامنت‌های داور داخل بلوک‌های جدا با dir خودکار رندر می‌شن — تشخیص جهت بر اساس اولین کاراکتر قوی متن. تو نسخهٔ بعدی یه پیش‌نمایش ازش می‌ذارم که نظرت رو ببینم 🙏",
    hoursAgo: 44,
    replyToBodyPrefix: "ایدهٔ داوری انسانی",
  },
  {
    projectSlug: "hamyar-python",
    authorUsername: "arash_dev",
    body: "بالاخره یه باتی که جواب آماده نمی‌ده! با بچه‌های کلاسم امتحانش کردم — یکی‌شون که همیشه از چت‌جی‌پی‌تی کپی می‌کرد، مجبور شد واقعاً فکر کنه 😂 سؤال: محدودیت توکن جلسه چقدره؟",
    hoursAgo: 70,
  },
  {
    projectSlug: "hamyar-python",
    authorUsername: "niloofar_ml",
    body: "خندیدم 😄 دقیقاً همون هدف منه. جلسه‌ها سقف ۱۲ پیام دارن و تاریخچهٔ کپ می‌شه تا تمرکز روی درس بمونه. از بازخورد بچه‌هات خوشحال می‌شم — مخصوصاً اگه جایی گیر کردن و بات کم‌کاری کرد!",
    hoursAgo: 62,
    replyToBodyPrefix: "بالاخره یه باتی",
  },
  {
    projectSlug: "donyaye-pixel",
    authorUsername: "mahsa_flutter",
    body: "اسپرایت‌های جنگل مه‌گرفته عالی از آب دراومدن 🌫 یه نکته: روی گوشی‌های ضعیف اگه افکت پارتیکل مه سنگین شد، نسخهٔ ساده‌ش رو هم بذار — تجربهٔ بازی موبایلی جدی‌گیریت می‌کنه.",
    hoursAgo: 30,
  },
  {
    projectSlug: "donyaye-pixel",
    authorUsername: "reza_gamedev",
    body: "حق با توئه، پارتیکل‌ها اولین قربانی بهینه‌سازی‌ان 😅 الان یه سیستم LOD ساده گذاشتم که زیر ۴ گیگ رم، مه رو با چند لایهٔ شفاف ثابت جایگزین می‌کنه. رو Redmi قدیمی خودم تست کردم، ۵۵ فریم می‌گیره!",
    hoursAgo: 24,
    replyToBodyPrefix: "اسپرایت‌های جنگل مه",
  },
  {
    projectSlug: "masiryar",
    authorUsername: "zahra_docs",
    body: "ایدهٔ «تمرین واقعی به‌جای ویدیو» دقیقاً حرف دل منه. پیشنهاد: برای هر مسیر یه صفحهٔ عمومی بساز که نقشه‌راه کاملش رو نشون بده — هم برای سئو خوبه، هم آدم‌ها قبل از نصب اپ می‌فهمن چی توشه.",
    hoursAgo: 20,
  },
  {
    projectSlug: "negahban-form",
    authorUsername: "sara_codes",
    body: "بالاخره یکی می‌خواد کد ملی رو با الگوریتم چک کنه نه رجکس 🥹 پیشنهاد فنی: برای شبا یه تابع جدا برای تبدیل بین فرمت IBAN و فرمت داخلی بذار، همه بهش نیاز پیدا می‌کنن. منتظر ریپوی اولیه‌ام!",
    hoursAgo: 8,
  },
];

// ─── seed execution ──────────────────────────────────────────

async function ensureSkills() {
  const { SKILLS } = await import("../src/lib/constants");
  for (const s of SKILLS) {
    await db.skill.upsert({
      where: { slug: s.slug },
      create: { slug: s.slug, name: s.name },
      update: {},
    });
  }
}

/** Sets themed covers on seeded projects (safe to re-run). */
async function applyCovers() {
  for (const [slug, cover] of Object.entries(PROJECT_COVERS)) {
    const project = await db.project.findUnique({ where: { slug }, select: { id: true, coverImage: true } });
    if (project && project.coverImage !== cover) {
      await db.project.update({ where: { id: project.id }, data: { coverImage: cover } });
      console.log(`  ~ cover set for ${slug}`);
    }
  }
}

/**
 * Ghost community — tops the founder up to GHOST_TARGET_FOLLOWERS followers
 * with plausible lightweight accounts (idempotent: only creates the missing
 * delta) and spreads organic-looking likes over the seeded projects.
 */
async function seedGhostCommunity() {
  const founder = await db.user.findUnique({
    where: { email: "mhmdsdqi87@gmail.com" },
    select: { id: true },
  });
  if (!founder) {
    console.warn("  ! founder not found — ghost seeding skipped");
    return;
  }

  const existingFollows = await db.follow.count({ where: { followingId: founder.id } });
  const missing = Math.max(0, GHOST_TARGET_FOLLOWERS - existingFollows);
  console.log(`  ghost followers: have ${existingFollows}, target ${GHOST_TARGET_FOLLOWERS}, missing ${missing}`);

  if (missing > 0) {
    const ghostHash = hashPassword(DEMO_PASSWORD);
    const used = new Set<string>();
    const ghosts: {
      email: string; username: string; passwordHash: string; displayName: string;
      avatarColor: string; bio: string; xp: number; reputation: number;
      onboardingCompleted: boolean; createdAt: Date;
    }[] = [];
    for (let i = 0; i < missing; i++) {
      let username = "";
      do {
        username = `${GHOST_NAME_PREFIX[Math.floor(Math.random() * GHOST_NAME_PREFIX.length)]}_${
          GHOST_NAME_SUFFIX[Math.floor(Math.random() * GHOST_NAME_SUFFIX.length)]
        }${Math.floor(Math.random() * 900) + 100}`;
      } while (used.has(username));
      used.add(username);
      ghosts.push({
        email: `${username}@${GHOST_EMAIL_DOMAIN}`,
        username,
        passwordHash: ghostHash,
        displayName: username,
        avatarColor: ["cyan", "violet", "ember", "lime", "rose", "gold"][Math.floor(Math.random() * 6)],
        bio: GHOST_BIOS[Math.floor(Math.random() * GHOST_BIOS.length)],
        xp: Math.floor(Math.random() * 150),
        reputation: Math.floor(Math.random() * 10),
        onboardingCompleted: true,
        createdAt: daysAgo(1 + Math.floor(Math.random() * 120), Math.floor(Math.random() * 24)),
      });
    }
    for (let i = 0; i < ghosts.length; i += 300) {
      await db.user.createMany({ data: ghosts.slice(i, i + 300) });
    }
    console.log(`  + ${ghosts.length} ghost users created`);
  }

  // ensure every ghost follows the founder
  const ghostIds = await db.user.findMany({
    where: { email: { endsWith: `@${GHOST_EMAIL_DOMAIN}` } },
    select: { id: true },
  });
  const followRows = ghostIds.map((g) => ({ followerId: g.id, followingId: founder.id }));
  // `skipDuplicates` is unsupported by the local SQLite mirror (type error +
  // runtime "Unknown argument"), so drop already-existing rows instead —
  // keeps re-runs idempotent on both SQLite and Postgres.
  const following = new Set(
    (
      await db.follow.findMany({
        where: { followingId: founder.id, followerId: { in: ghostIds.map((g) => g.id) } },
        select: { followerId: true },
      })
    ).map((f) => f.followerId),
  );
  const newFollowRows = followRows.filter((r) => !following.has(r.followerId));
  for (let i = 0; i < newFollowRows.length; i += 500) {
    await db.follow.createMany({ data: newFollowRows.slice(i, i + 500) });
  }
  console.log(`  + follows ensured for ${ghostIds.length} ghosts`);

  // organic likes: each ghost has a 30% chance to like one weighted project
  const projectIds = await db.project.findMany({
    where: { slug: { in: Object.keys(PROJECT_COVERS) } },
    select: { id: true, slug: true },
  });
  const idBySlug = new Map(projectIds.map((p) => [p.slug, p.id]));
  const likeRows: { userId: string; projectId: string }[] = [];
  for (const g of ghostIds) {
    if (Math.random() >= 0.3) continue;
    const slug = pickWeighted(GHOST_LIKE_WEIGHTS);
    const projectId = idBySlug.get(slug);
    if (projectId) likeRows.push({ userId: g.id, projectId });
  }
  const liked = new Set(
    (
      await db.projectLike.findMany({
        where: { userId: { in: ghostIds.map((g) => g.id) } },
        select: { userId: true, projectId: true },
      })
    ).map((l) => `${l.userId}:${l.projectId}`),
  );
  const newLikeRows = likeRows.filter((r) => !liked.has(`${r.userId}:${r.projectId}`));
  for (let i = 0; i < newLikeRows.length; i += 500) {
    await db.projectLike.createMany({ data: newLikeRows.slice(i, i + 500) });
  }
  console.log(`  + ${newLikeRows.length} ghost likes distributed`);
}

async function ensureUser(p: Persona) {
  const existing = await db.user.findUnique({ where: { email: p.email } });
  if (existing) return existing;
  const user = await db.user.create({
    data: {
      email: p.email,
      username: p.username,
      passwordHash: hashPassword(DEMO_PASSWORD),
      displayName: p.displayName,
      bio: p.bio,
      avatarColor: p.avatarColor,
      websiteUrl: p.website,
      role: "user",
      goals: JSON.stringify(p.goals),
      interests: JSON.stringify(p.interests),
      xp: p.xp,
      reputation: p.reputation,
      onboardingCompleted: true,
      createdAt: daysAgo(p.joinedDaysAgo),
    },
  });
  // link skills
  for (const slug of p.skills) {
    const skill = await db.skill.findUnique({ where: { slug } });
    if (skill) {
      await db.userSkill.create({ data: { userId: user.id, skillId: skill.id } }).catch(() => {});
    }
  }
  return user;
}

async function ensureProject(demo: DemoProject, usersByUsername: Map<string, { id: string }>) {
  const existing = await db.project.findUnique({ where: { slug: demo.slug } });
  if (existing) {
    console.log(`  = project ${demo.slug} already exists — skipping`);
    return null;
  }
  const owner = usersByUsername.get(demo.ownerUsername)!;
  const createdAt = daysAgo(demo.createdDaysAgo);
  const project = await db.project.create({
    data: {
      slug: demo.slug,
      name: demo.name,
      tagline: demo.tagline,
      description: demo.description,
      category: demo.category,
      status: demo.status,
      visibility: "PUBLIC",
      ownerId: owner.id,
      createdAt,
      updatedAt: demo.updates?.length
        ? daysAgo(demo.updates[0].daysAgo)
        : createdAt,
    },
  });

  await db.projectMember.create({
    data: { projectId: project.id, userId: owner.id, role: "OWNER", joinedAt: createdAt },
  });
  for (const m of demo.memberUsernames) {
    const u = usersByUsername.get(m.username)!;
    await db.projectMember.create({
      data: { projectId: project.id, userId: u.id, role: m.role, joinedAt: daysAgo(demo.createdDaysAgo - 1) },
    });
  }
  for (const tag of demo.tags) {
    await db.projectTag.create({ data: { projectId: project.id, tag } });
  }
  for (const slug of demo.requiredSkills) {
    const skill = await db.skill.findUnique({ where: { slug } });
    if (skill) {
      await db.projectRequiredSkill.create({
        data: { projectId: project.id, skillId: skill.id },
      }).catch(() => {});
    }
  }

  // activity trail
  await db.projectActivity.create({
    data: {
      projectId: project.id,
      actorId: owner.id,
      eventType: "PROJECT_CREATED",
      metadata: JSON.stringify({ name: demo.name }),
      createdAt,
    },
  });

  // updates + activity + contribution events
  for (const up of demo.updates ?? []) {
    const at = daysAgo(up.daysAgo);
    await db.projectUpdate.create({
      data: { projectId: project.id, authorId: owner.id, title: up.title, body: up.body, createdAt: at },
    });
    await db.projectActivity.create({
      data: {
        projectId: project.id,
        actorId: owner.id,
        eventType: "UPDATE_POSTED",
        metadata: JSON.stringify({ title: up.title }),
        createdAt: at,
      },
    });
    await db.contributionEvent.create({
      data: {
        userId: owner.id,
        projectId: project.id,
        eventType: "UPDATE_POSTED",
        sourceType: "update",
        sourceId: `${demo.slug}-${up.title.slice(0, 24)}`,
        xp: 5,
        reputation: 1,
        verifiedAt: at,
        createdAt: at,
      },
    }).catch(() => {});
  }

  console.log(`  + project ${demo.slug} created`);
  return project;
}

async function seedComments(usersByUsername: Map<string, { id: string }>, projectsBySlug: Map<string, { id: string }>) {
  for (const c of COMMENTS) {
    const project = projectsBySlug.get(c.projectSlug);
    const author = usersByUsername.get(c.authorUsername);
    if (!project || !author) continue;

    let parentId: string | null = null;
    if (c.replyToBodyPrefix) {
      const parent = await db.projectComment.findFirst({
        where: { projectId: project.id, body: { startsWith: c.replyToBodyPrefix } },
        select: { id: true },
      });
      parentId = parent?.id ?? null;
    }

    const dup = await db.projectComment.findFirst({
      where: { projectId: project.id, authorId: author.id, body: c.body },
      select: { id: true },
    });
    if (dup) continue;

    await db.projectComment.create({
      data: {
        projectId: project.id,
        authorId: author.id,
        parentId,
        body: c.body,
        createdAt: daysAgo(0, c.hoursAgo),
      },
    });

    // likes from other demo users (organic feel)
    const others = PERSONAS.filter((p) => p.username !== c.authorUsername);
    const likers = others.slice(0, 1 + (c.hoursAgo % 3));
    for (const l of likers) {
      const lu = usersByUsername.get(l.username)!;
      await db.projectLike.upsert({
        where: { userId_projectId: { userId: lu.id, projectId: project.id } },
        create: { userId: lu.id, projectId: project.id },
        update: {},
      }).catch(() => {});
    }
  }
}

async function seedFollows(usersByUsername: Map<string, { id: string }>) {
  // everyone follows the founder (if present) and 2-3 other personas
  const founder = await db.user.findUnique({
    where: { email: "mhmdsdqi87@gmail.com" },
    select: { id: true },
  });
  const pairs: [string, string][] = [];
  const names = PERSONAS.map((p) => p.username);
  for (const follower of names) {
    if (founder) pairs.push([follower, "FOUNDER"]);
    const start = follower.length % names.length;
    pairs.push([follower, names[(start + 1) % names.length]]);
    pairs.push([follower, names[(start + 3) % names.length]]);
  }
  for (const [followerName, target] of pairs) {
    const followerId = usersByUsername.get(followerName)!.id;
    const followingId = target === "FOUNDER" ? founder!.id : usersByUsername.get(target)!.id;
    if (followerId === followingId) continue;
    await db.follow
      .upsert({
        where: { followerId_followingId: { followerId, followingId } },
        create: { followerId, followingId },
        update: {},
      })
      .catch(() => {});
  }
}

async function seedAcademy(usersByUsername: Map<string, { id: string }>) {
  // Backdate realistic academy progress; lesson ids come from the live course
  // files so they always match what the app expects.
  try {
    const { getCourse } = await import("../src/lib/academy");
    const py = getCourse("python-basics");
    const html = getCourse("html-basics");
    if (!py || !html) return;

    const pyIds = py.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const htmlIds = html.modules.flatMap((m) => m.lessons.map((l) => l.id));

    const plans: { username: string; courseId: string; doneRatio: number; all: string[]; cert?: string }[] = [
      { username: "sara_codes", courseId: "python-basics", doneRatio: 1, all: pyIds, cert: "TEKA-PY-DEMO01" },
      { username: "arash_dev", courseId: "python-basics", doneRatio: 0.5, all: pyIds },
      { username: "arash_dev", courseId: "html-basics", doneRatio: 1, all: htmlIds, cert: "TEKA-HT-DEMO01" },
      { username: "niloofar_ml", courseId: "python-basics", doneRatio: 0.35, all: pyIds },
      { username: "mahsa_flutter", courseId: "html-basics", doneRatio: 0.25, all: htmlIds },
    ];

    for (const plan of plans) {
      const u = usersByUsername.get(plan.username)!;
      const count = Math.max(1, Math.floor(plan.all.length * plan.doneRatio));
      const done = plan.all.slice(0, count);
      await db.academyProgress.upsert({
        where: { userId_courseId: { userId: u.id, courseId: plan.courseId } },
        create: {
          userId: u.id,
          courseId: plan.courseId,
          completedLessons: JSON.stringify(done),
          lastLessonId: done[done.length - 1],
          updatedAt: daysAgo(3),
        },
        update: {},
      });
      if (plan.cert) {
        await db.academyCertificate
          .create({
            data: { userId: u.id, courseId: plan.courseId, code: plan.cert, createdAt: daysAgo(4) },
          })
          .catch(() => {}); // idempotent: unique code / unique (user, course)
      }
    }
    console.log("  + academy progress & certificates seeded");
  } catch (err) {
    console.warn("  ! academy seeding skipped:", err instanceof Error ? err.message : err);
  }
}

async function seedCollabRequest(usersByUsername: Map<string, { id: string }>, projectsBySlug: Map<string, { id: string }>) {
  const project = projectsBySlug.get("challenge-kadeh");
  const applicant = usersByUsername.get("mahsa_flutter");
  const owner = usersByUsername.get("sara_codes");
  if (!project || !applicant || !owner) return;
  const dup = await db.collaborationRequest.findUnique({
    where: { projectId_applicantId: { projectId: project.id, applicantId: applicant.id } },
    select: { id: true },
  });
  if (dup) return;
  await db.collaborationRequest.create({
    data: {
      projectId: project.id,
      applicantId: applicant.id,
      requestedRole: "CONTRIBUTOR",
      introduction:
        "سلام! فلاتری‌ست هستم ولی برای چالش‌کده دوست دارم سمت فرانت وب رو کمک کنم — تجربهٔ RTL و کامپوننت فارسی زیاد دارم. می‌تونم فرم ارسال کد و نمایش داوری رو بسازم. نمونه‌کار به‌زودی می‌فرستم!",
      status: "PENDING",
      createdAt: daysAgo(2),
    },
  });
  await db.notification.create({
    data: {
      recipientId: owner.id,
      actorId: applicant.id,
      type: "COLLAB_REQUEST",
      entityType: "project",
      entityId: project.id,
      payload: JSON.stringify({ projectName: "چالش‌کده", applicantName: "مهسا توکلی" }),
      createdAt: daysAgo(2),
    },
  });
}

async function main() {
  console.log("🌱 TEKA NEXUS — additive community seeder (live-DB safe)");
  await ensureSkills();

  const usersByUsername = new Map<string, { id: string }>();
  for (const p of PERSONAS) {
    const u = await ensureUser(p);
    usersByUsername.set(p.username, u);
    console.log(`  = user ${p.username} ready`);
  }

  const projectsBySlug = new Map<string, { id: string }>();
  for (const demo of PROJECTS) {
    const project = await ensureProject(demo, usersByUsername);
    if (project) projectsBySlug.set(demo.slug, project);
    else {
      const found = await db.project.findUnique({
        where: { slug: demo.slug },
        select: { id: true },
      });
      if (found) projectsBySlug.set(demo.slug, found);
    }
  }

  await seedComments(usersByUsername, projectsBySlug);
  await seedFollows(usersByUsername);
  await applyCovers();
  await seedGhostCommunity();
  await seedAcademy(usersByUsername);
  await seedCollabRequest(usersByUsername, projectsBySlug);

  const [userCount, projectCount, commentCount, likeCount, followCount] = await Promise.all([
    db.user.count(),
    db.project.count(),
    db.projectComment.count(),
    db.projectLike.count(),
    db.follow.count(),
  ]);
  console.log(`✅ done — users:${userCount} projects:${projectCount} comments:${commentCount} likes:${likeCount} follows:${followCount}`);
  console.log(`🔑 demo password for all seeded personas: ${DEMO_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error("seed failed:", e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
