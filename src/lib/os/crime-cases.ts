// TEKA NEXUS — CRIME SCENE content (Task 19).
// Forensic mini-investigations: read the evidence, answer the questions,
// close the case. Multiple choice keeps answers fair (no spelling pain).

export type CrimeClue = {
  id: string;
  evidence: { fa: string; en: string };
  question: { fa: string; en: string };
  options: { fa: string; en: string }[];
  answer: number; // index into options
  explain: { fa: string; en: string };
};

export type CrimeCase = {
  id: string;
  emoji: string;
  difficulty: "EASY" | "HARD";
  title: { fa: string; en: string };
  story: { fa: string; en: string };
  clues: CrimeClue[];
};

export const CRIME_CASES: CrimeCase[] = [
  {
    id: "case-1-heist",
    emoji: "💾",
    difficulty: "EASY",
    title: { fa: "سرقت کد منبع", en: "The Source Code Heist" },
    story: {
      fa: "ساعت ۸:۱۷ صبح، استارتاپ «داده‌بان» گزارش می‌دهد مخزن خصوصی کد منبع‌شان دستکاری شده است. تیم امنیت سه مدرک پیدا می‌کند: لاگ سرور Git، لیست نشست‌های فعال و یک ایمیل مشکوک. تو کارآگاه سایبری این پرونده‌ای.",
      en: "At 08:17 the startup \"Databaan\" reports that their private source-code repository was tampered with. The security team found three pieces of evidence: a Git server log, a list of active sessions, and a suspicious email. You are the cyber detective on this case.",
    },
    clues: [
      {
        id: "c1-q1",
        evidence: {
          fa: "لاگ سرور Git:\n03:41 push از IP 185.23.14.7 با توکن «arash_dev»\n03:44 push دوم از همان IP با توکن «sara_frontend»\n03:47 force-push مخزن main",
          en: "Git server log:\n03:41 push from IP 185.23.14.7 with token \"arash_dev\"\n03:44 second push from the same IP with token \"sara_frontend\"\n03:47 force-push on main",
        },
        question: { fa: "لاگ چه چیزی را نشان می‌دهد؟", en: "What does the log reveal?" },
        options: [
          { fa: "دو نفر هم‌زمان از دو شهر کار می‌کردند", en: "Two people were working at the same time from two cities" },
          { fa: "یک مهاجم توکن‌های دو کاربر را از یک IP استفاده کرده است", en: "An attacker used two users' tokens from a single IP" },
          { fa: "سرور ساعت خود را اشتباه نشان می‌دهد", en: "The server clock is wrong" },
          { fa: "پوش‌ها عادی بودند و مشکلی ندارد", en: "The pushes were normal and harmless" },
        ],
        answer: 1,
        explain: {
          fa: "دو توکن متفاوت از یک IP دقیقاً الگوی «سرقت توکن» است؛ مهاجم با حساب‌های ربوده‌شده push کرده است.",
          en: "Two different tokens from one IP is the classic token-theft pattern; the attacker pushed with stolen accounts.",
        },
      },
      {
        id: "c1-q2",
        evidence: {
          fa: "لیست نشست‌های فعال (ساعت حمله 03:41):\n• arash_dev — تهران، IP 91.99.4.12، آخرین فعالیت 23:10 دیروز\n• sara_frontend — تهران، IP 91.99.8.55، آخرین فعالیت 23:05 دیروز\n• session ناشناس — IP 185.23.14.7، مرورگر curl/8.0",
          en: "Active sessions at attack time (03:41):\n• arash_dev — Tehran, IP 91.99.4.12, last seen 23:10 yesterday\n• sara_frontend — Tehran, IP 91.99.8.55, last seen 23:05 yesterday\n• unknown session — IP 185.23.14.7, browser curl/8.0",
        },
        question: { fa: "کاربران هنگام حمله کجا بودند؟", en: "Where were the users at attack time?" },
        options: [
          { fa: "آنلاین بودند و خودشان پوش کرده‌اند", en: "They were online and pushed themselves" },
          { fa: "خواب بودند؛ آخرین فعالیتشان ساعت 23 شب است", en: "They were asleep; their last activity was 23:00 the previous night" },
          { fa: "در حال مسافرت بودند", en: "They were traveling" },
          { fa: "از دو دستگاه مختلف وارد شده بودند", en: "They had logged in from two different devices" },
        ],
        answer: 1,
        explain: {
          fa: "آخرین فعالیت واقعی هر دو کاربر ۲۳ شب است، ولی توکن‌شان ساعت ۳:۴۱ بامداد استفاده شده — یعنی توکن‌ها بدون حضورشان به سرقت رفته بودند.",
          en: "Both users' real last activity was 23:00, but their tokens were used at 03:41 — the tokens were stolen while they were away.",
        },
      },
      {
        id: "c1-q3",
        evidence: {
          fa: "ایمیل دریافتی سارا (دیروز 18:02):\n«سلام سارا! CI جدید ما راه‌اندازی شده. لطفاً برای فعال‌سازی، توکن دسترسی‌ات را در این لینک وارد کن:\nhxxp://teka-ci-verify.example-login.com»\nفرستنده: it-support@teka-nexus-support.com",
          en: "Email received by Sara (yesterday 18:02):\n\"Hi Sara! Our new CI is ready. To activate it, please enter your access token at:\nhxxp://teka-ci-verify.example-login.com\"\nSender: it-support@teka-nexus-support.com",
        },
        question: { fa: "این ایمیل چه نوع حمله‌ای است؟", en: "What kind of attack is this email?" },
        options: [
          { fa: "DDoS", en: "DDoS" },
          { fa: "Phishing (فیشینگ)", en: "Phishing" },
          { fa: "SQL Injection", en: "SQL Injection" },
          { fa: "Brute Force", en: "Brute Force" },
        ],
        answer: 1,
        explain: {
          fa: "ایمیل جعلی با دامنه شبیه‌سازی‌شده و لینک ورود تقلبی، الگوی کلاسیک فیشینگ برای دزدیدن توکن است.",
          en: "A fake email with a look-alike domain and a bogus login link is a classic phishing pattern for stealing tokens.",
        },
      },
      {
        id: "c1-q4",
        evidence: {
          fa: "دستور رفع فوری تیم واکنش:\n۱) ابطال همه توکن‌ها\n۲) فعال‌سازی 2FA برای همه اعضا\n۳) بازگرداندن main به کامیت قبل از 03:41",
          en: "Incident-response runbook:\n1) Revoke all tokens\n2) Enable 2FA for every member\n3) Restore main to the commit before 03:41",
        },
        question: { fa: "کدام اقدام جلوی تکرار این حمله را می‌گیرد؟", en: "Which measure prevents this attack from repeating?" },
        options: [
          { fa: "فقط بازگرداندن کد", en: "Only restoring the code" },
          { fa: "فقط تغییر ساعت سرور", en: "Only fixing the server clock" },
          { fa: "2FA + ابطال توکن‌ها + آموزش فیشینگ", en: "2FA + token revocation + phishing awareness training" },
          { fa: "بستن مخزن برای همیشه", en: "Closing the repository forever" },
        ],
        answer: 2,
        explain: {
          fa: "دفاع لایه‌ای: 2FA جلوی استفاده از رمز مسروقه را می‌گیرد، ابطال توکن‌ها دسترسی مهاجم را قطع می‌کند و آموزش، ایمیل فیشینگ بعدی را خنثی می‌کند.",
          en: "Defense in depth: 2FA blocks stolen passwords, revoking tokens cuts the attacker's access, and training neutralizes the next phishing email.",
        },
      },
    ],
  },
  {
    id: "case-2-midnight",
    emoji: "🌙",
    difficulty: "HARD",
    title: { fa: "حمله نیمه‌شب", en: "The Midnight Breach" },
    story: {
      fa: "وب‌سایت فروشگاه «تکاشاپ» نیمه‌شب از دسترس خارج شد. صبح که برگشت، گزارش شده ۳۱۰ حساب کاربری لاگین‌های ناموفق پشت‌سرهم داشته‌اند و یک سفارش جعلی ۵۰ میلیونی ثبت شده. سه مدرک در پرونده است: لاگ WAF، لاگ دیتابیس و فایل access log.",
      en: "The \"TekaShop\" store went down at midnight. When it came back, 310 user accounts showed bursts of failed logins and a fake 50-million order was placed. Three pieces of evidence: the WAF log, the database log, and the access log.",
    },
    clues: [
      {
        id: "c2-q1",
        evidence: {
          fa: "لاگ WAF (23:58 → 00:41):\n42,318 درخواست POST /login از 6 IP مختلف\nالگوی: user=admin، pass=test0001 → test9999\nسپس: user=admin، pass=T3ka@2026! ✅ 200",
          en: "WAF log (23:58 → 00:41):\n42,318 POST /login requests from 6 IPs\nPattern: user=admin, pass=test0001 → test9999\nThen: user=admin, pass=T3ka@2026! ✅ 200",
        },
        question: { fa: "حمله اول چه نوعی بود؟", en: "What was the first attack?" },
        options: [
          { fa: "Brute Force (جستجوی فراگیر رمز)", en: "Brute Force" },
          { fa: "XSS", en: "XSS" },
          { fa: "Path Traversal", en: "Path Traversal" },
          { fa: "Clickjacking", en: "Clickjacking" },
        ],
        answer: 0,
        explain: {
          fa: "تلاش‌های پشت‌سرهم با رمزهای شماره‌دار = حمله Brute Force روی حساب admin.",
          en: "Rapid-fire numbered password attempts = a Brute Force attack against the admin account.",
        },
      },
      {
        id: "c2-q2",
        evidence: {
          fa: "لاگ دیتابیس (00:44):\nSELECT * FROM products WHERE id = 12 OR 1=1\nو سپس: UPDATE orders SET price=0 WHERE id=8812\nمنبع درخواست: cookie session معتبر admin",
          en: "Database log (00:44):\nSELECT * FROM products WHERE id = 12 OR 1=1\nThen: UPDATE orders SET price=0 WHERE id=8812\nRequest source: valid admin session cookie",
        },
        question: { fa: "لاگ دیتابیس چه حمله‌ای را نشان می‌دهد؟", en: "What does the database log show?" },
        options: [
          { fa: "SQL Injection با نشست مسروقه", en: "SQL Injection using a stolen session" },
          { fa: "حمله DNS", en: "A DNS attack" },
          { fa: "خطای سخت‌افزاری", en: "A hardware failure" },
          { fa: "بکاپ خودکار", en: "An automatic backup" },
        ],
        answer: 0,
        explain: {
          fa: "عبارت «OR 1=1» امضای SQL Injection است؛ مهاجم با نشست ربوده‌شده admin قیمت سفارش را صفر کرده است.",
          en: "The \"OR 1=1\" signature is SQL Injection; the attacker zeroed the order price with a hijacked admin session.",
        },
      },
      {
        id: "c2-q3",
        evidence: {
          fa: "Access log (00:47):\nGET /uploads/../../etc/passwd → 500\nGET /admin/debug?env=1 → 200 (خروجی: SECRET_KEY=...)\nPOST /api/checkout (بدون توکن CSRF) → 200",
          en: "Access log (00:47):\nGET /uploads/../../etc/passwd → 500\nGET /admin/debug?env=1 → 200 (output: SECRET_KEY=...)\nPOST /api/checkout (no CSRF token) → 200",
        },
        question: { fa: "مهاجم با /admin/debug چه کرد؟", en: "What did the attacker do with /admin/debug?" },
        options: [
          { fa: "کلید مخفی سرور را بیرون کشید", en: "Leaked the server's secret key" },
          { fa: "فقط صفحه خطا دید", en: "Just saw an error page" },
          { fa: "پسورد همه را عوض کرد", en: "Changed everyone's password" },
          { fa: "کاره‌ای نکرد؛ درخواست رد شد", en: "Nothing; the request was rejected" },
        ],
        answer: 0,
        explain: {
          fa: "پاسخ 200 همراه با خروجی SECRET_KEY یعنی مهاجم کلید امضای توکن‌ها را به دست آورده — فاجعه‌بارترین نشت این پرونده.",
          en: "A 200 response printing SECRET_KEY means the attacker obtained the token-signing key — the worst leak in this case.",
        },
      },
      {
        id: "c2-q4",
        evidence: {
          fa: "چک‌لیست امنیتی تکاشاپ (پیشنهادی):\n▢ محدودسازی تلاش لاگین (rate limit + قفل حساب)\n▢ پارامتری‌سازی کوئری‌ها (prepared statements)\n▢ چرخش کلیدها + حذف endpoint دیباگ در پروداکشن\n▢ توکن CSRF روی همه فرم‌ها",
          en: "TekaShop security checklist (proposed):\n▢ Login rate-limiting + account lockout\n▢ Parameterized queries (prepared statements)\n▢ Rotate keys + remove the debug endpoint in production\n▢ CSRF tokens on all forms",
        },
        question: { fa: "کدام گزینه همه سه حمله را پوشش می‌دهد؟", en: "Which option covers all three attacks?" },
        options: [
          { fa: "فقط rate limit", en: "Only rate limiting" },
          { fa: "هر چهار مورد چک‌لیست با هم", en: "All four checklist items together" },
          { fa: "فقط حذف endpoint دیباگ", en: "Only removing the debug endpoint" },
          { fa: "فقط CSRF", en: "Only CSRF tokens" },
        ],
        answer: 1,
        explain: {
          fa: "دفاع لایه‌ای لازم است: rate limit جلوی Brute Force، prepared statements جلوی SQLi، و چرخش کلید/حذف دیباگ جلوی نشت را می‌گیرد.",
          en: "Layered defense is required: rate limiting stops brute force, prepared statements stop SQLi, and key rotation/removing debug stops the leak.",
        },
      },
    ],
  },
];

export function getCrimeCase(id: string): CrimeCase | undefined {
  return CRIME_CASES.find((c) => c.id === id);
}
