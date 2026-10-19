// TEKA NEXUS — Academy portal tools: content data.
// All learner-facing BODY text uses the bilingual L pattern ({ en, fa });
// every other locale falls back to English. UI chrome lives in tools-dict.ts.
//
// Honesty rules enforced by this data:
//  - Python ground truths are NEVER hardcoded into the components — they are
//    computed at runtime with pylite (every snippet here runs on it).
//  - HTML ground truths come from a real sandboxed-iframe DOM parse.
//  - Python examples in the Encyclopedia are real-world Python (the sandbox
//    subset can't express every one — that's fine, they are never "executed").

import type { L } from "@/lib/academy/types";
import type {
  BugCategoryKey,
  ErrorCategoryKey,
  ErrorLangKey,
  SeverityKey,
} from "./tools-dict";

// ─── 1 · Bug Detective — curated case files ──────────────────

export type ToolCheck = {
  /** Human-readable assertion, shown as a checklist row. */
  label: L;
  selector: string;
  /** textContent must contain this (case-insensitive). */
  text?: string;
  /** textContent must NOT contain this (case-insensitive). */
  textNot?: string;
  /** Element must carry this attribute with this exact value. */
  attrName?: string;
  attrValue?: string;
  /** Minimum number of matches (default 1). */
  count?: number;
  /** Maximum number of matches (e.g. 0 = must not exist). */
  maxCount?: number;
  /** Computed style must equal this value (e.g. "rgb(255, 0, 0)"). */
  style?: { prop: string; value: string };
};

export type BugCase = {
  id: string;
  /** Case-file number shown in the detective badge ("CASE 042"). */
  num: string;
  title: L;
  /** What the learner "notices" before opening the code. */
  symptom: L;
  language: "python" | "html";
  category: BugCategoryKey;
  buggyCode: string;
  /** Python only: exact stdout the fixed program must print. */
  expected?: string[];
  /** Python only: lines fed to input(). */
  stdin?: string[];
  /** HTML only: DOM assertions that define "fixed". */
  checks?: ToolCheck[];
  /** Exactly 3 progressive hints. */
  hints: L[];
  /** One-line explanation, revealed only after the case is closed. */
  why: L;
  /** Revealed only on explicit request. */
  fixedCode: string;
};

export const BUG_CASES: BugCase[] = [
  {
    id: "bc-042",
    num: "042",
    title: { en: "The Ticket That Doesn't Exist", fa: "بلیتی که وجود نداره" },
    symptom: {
      en: "“My box-office loop prints one ticket too many… actually, it crashes trying. There are only 4 tickets!”",
      fa: "«حلقهٔ باجهٔ بلیت یه بلیت اضافه چاپ می‌کنه… راستش دقیق‌تر بگم، وسط کار کرش می‌کنه. مگه ۴ تا بلیت بیشتر داریم؟!»",
    },
    language: "python",
    category: "off-by-one",
    buggyCode: `tickets = ["A1", "A2", "A3", "A4"]
n = len(tickets)
i = 0
while i <= n:
    print(tickets[i])
    i = i + 1`,
    expected: ["A1", "A2", "A3", "A4"],
    hints: [
      {
        en: "Trace i by hand: the body runs for i = 0, 1, 2, 3, 4. What lives at tickets[4]?",
        fa: "با دست دنبال i برو: بدنهٔ حلقه برای i = ۰ و ۱ و ۲ و ۳ و ۴ اجرا می‌شه. حالا tickets[4] چی داره؟",
      },
      {
        en: "With 4 tickets the last valid index is 3 — counting starts at 0.",
        fa: "با ۴ تا بلیت، آخرین اندیسِ مجاز ۳ می‌شه — چون شمارش از صفر شروع می‌شه.",
      },
      {
        en: "Compare `i <= n` with `i < n`. Only one of them stops before running off the end.",
        fa: "`i <= n` رو با `i < n` مقایسه کن. فقط یکی‌شون قبل از رسیدن به آخرِ لیست می‌ایسته.",
      },
    ],
    why: {
      en: "Indexing starts at 0, so the last item sits at n − 1 — `i <= n` asks for one item past the end.",
      fa: "اندیس‌گذاری از صفر شروع می‌شه، پس آخرین آیتم توی خونهٔ n − 1 ـه — و `i <= n` داره یکی بعد از آخر رو می‌خواد.",
    },
    fixedCode: `tickets = ["A1", "A2", "A3", "A4"]
n = len(tickets)
i = 0
while i < n:
    print(tickets[i])
    i = i + 1`,
  },
  {
    id: "bc-051",
    num: "051",
    title: { en: "The Giant Recipe Steps", fa: "مراحلِ غول‌پیکرِ دستور پخت" },
    symptom: {
      en: "“I wrote my recipe page and suddenly both steps render HUGE — like they're part of the heading!”",
      fa: "«صفحهٔ دستور پختم رو نوشتم و یهو هر دو تا مرحله خیلی بزرگ رندر می‌شن — انگار بخشی از خود تیترن!»",
    },
    language: "html",
    category: "missing-tag",
    buggyCode: `<h1>Bake Club</h1>
<h2>Today: honey cake
<p>Preheat the oven to 180°C.</p>
<p>Mix, pour, wait.</p>`,
    checks: [
      {
        label: { en: "The <h1> still says “Bake Club”", fa: "تگ <h1> هنوز می‌گه «Bake Club»" },
        selector: "h1",
        text: "Bake Club",
      },
      {
        label: { en: "No paragraph is trapped inside the heading", fa: "هیچ پاراگرافی داخل تیتر گیر نیفتاده" },
        selector: "h2 p",
        maxCount: 0,
      },
      {
        label: { en: "Both steps render as normal paragraphs", fa: "هر دو مرحله به‌عنوان پاراگرافِ عادی رندر می‌شن" },
        selector: "p",
        count: 2,
      },
    ],
    hints: [
      {
        en: "Look at the live preview: the steps are heading-huge. The browser thinks they belong to the <h2>.",
        fa: "به پیش‌نمایش زنده نگاه کن: مراحل به اندازهٔ تیتر بزرگن. مرورگر فکر می‌کنه بخشی از <h2> هستن.",
      },
      {
        en: "A tag stays open until the browser sees its closing tag. Where does <h2> ever close?",
        fa: "یه تگ باز می‌مونه تا وقتی مرورگر تگ بستنش رو ببینه. <h2> کِی بسته می‌شه؟",
      },
      {
        en: "Add </h2> right after “Today: honey cake”.",
        fa: "درست بعد از «Today: honey cake» یه </h2> اضافه کن.",
      },
    ],
    why: {
      en: "Without </h2> the heading never closes, so the browser pulls the following paragraphs inside it.",
      fa: "بدون </h2> تیتر هیچ‌وقت بسته نمی‌شه، برای همین مرورگر پاراگراف‌های بعدی رو می‌کشه داخلش.",
    },
    fixedCode: `<h1>Bake Club</h1>
<h2>Today: honey cake</h2>
<p>Preheat the oven to 180°C.</p>
<p>Mix, pour, wait.</p>`,
  },
  {
    id: "bc-017",
    num: "017",
    title: { en: "The Half Apple Vanished", fa: "نصف سیب غیبش زد" },
    symptom: {
      en: "“Splitting 5 apples between 2 friends says each gets 2 — but where did the half apple go? And the bill was for 2.5!”",
      fa: "«وقتی ۵ تا سیب رو بین ۲ نفر تقسیم می‌کنم، می‌گه هر کس ۲ تا — پس نصف سیب کجاست؟ حساب قرار بود ۲٫۵ بشه!»",
    },
    language: "python",
    category: "wrong-operator",
    buggyCode: `apples = 5
friends = 2
each = apples // friends
leftover = apples % friends
print(f"Each friend gets {each} apples")
print(f"Leftover: {leftover}")`,
    expected: ["Each friend gets 2.5 apples", "Leftover: 1"],
    hints: [
      {
        en: "Run it. Python prints a whole number — but the target says 2.5.",
        fa: "اجرا کن. پایتون یه عدد کامل چاپ می‌کنه — ولی خروجیِ هدف ۲٫۵ می‌گه.",
      },
      {
        en: "// chops off the decimal part. 5 / 2 is 2.5 — 5 // 2 is 2.",
        fa: "عملگر // قسمت اعشار رو می‌بره. 5 / 2 می‌شه ۲٫۵ ولی 5 // 2 می‌شه ۲.",
      },
      {
        en: "Keep // only when you truly want whole numbers. Swap it for a single /.",
        fa: "// رو فقط وقتی استفاده کن که واقعاً عدد کامل می‌خوای. جایگزینش کن با یه / ساده.",
      },
    ],
    why: {
      en: "// is floor division — it throws away the .5. Plain / keeps the decimals.",
      fa: "عملگر // تقسیمِ گرد به پایینه — اعشار رو دور می‌ندازه. ولی / ساده اعشار رو نگه می‌داره.",
    },
    fixedCode: `apples = 5
friends = 2
each = apples / friends
leftover = apples % friends
print(f"Each friend gets {each} apples")
print(f"Leftover: {leftover}")`,
  },
  {
    id: "bc-033",
    num: "033",
    title: { en: "The Style That Never Shows Up", fa: "استایلی که هیچ‌وقت نمیاد" },
    symptom: {
      en: "“My CSS looks perfect — red, bold, everything. But the warning text stays stubbornly black.”",
      fa: "«CSS ـم انگار بی‌نقصه — قرمز، بولد، همه‌چی. ولی متن هشدار همچنان لجبازانه سیاه می‌مونه.»",
    },
    language: "html",
    category: "bad-selector",
    buggyCode: `<style>
  .warning {
    color: red;
    font-weight: bold;
  }
</style>

<p class="warn">Low battery — charge soon!</p>`,
    checks: [
      {
        label: { en: "The paragraph exists with its text", fa: "پاراگراف با متنش هست" },
        selector: "p",
        text: "Low battery",
      },
      {
        label: { en: "Its text computes to red", fa: "رنگِ محاسبه‌شدهٔ متن قرمزه" },
        selector: "p",
        style: { prop: "color", value: "rgb(255, 0, 0)" },
      },
      {
        label: { en: "Its text computes to bold (700)", fa: "وزنِ محاسبه‌شدهٔ متن بولده (700)" },
        selector: "p",
        style: { prop: "font-weight", value: "700" },
      },
    ],
    hints: [
      {
        en: "The preview shows plain black text — the rule never matched anything.",
        fa: "پیش‌نمایش متنِ سادهٔ سیاه نشون می‌ده — یعنی قانون CSS به هیچی نخورده.",
      },
      {
        en: "The rule says .warning. The element says class=\"warn\". Match them letter by letter.",
        fa: "قانون می‌گه .warning ولی عنصر می‌گه class=\"warn\". حرف‌به‌حرف مقایسه‌شون کن.",
      },
      {
        en: "Change class=\"warn\" to class=\"warning\".",
        fa: "class=\"warn\" رو به class=\"warning\" تغییر بده.",
      },
    ],
    why: {
      en: "In CSS, .warning only matches class=\"warning\" — the class names must match letter for letter.",
      fa: "توی CSS، سلکتور .warning فقط با class=\"warning\" می‌خونه — اسم کلاس باید دقیقاً حرف‌به‌حرف یکی باشه.",
    },
    fixedCode: `<style>
  .warning {
    color: red;
    font-weight: bold;
  }
</style>

<p class="warning">Low battery — charge soon!</p>`,
  },
  {
    id: "bc-008",
    num: "008",
    title: { en: "The Age That Refuses Math", fa: "سنی که با ریاضی جوش نمی‌خوره" },
    symptom: {
      en: "“The user types their age — 12 — and the program instantly refuses to do any math. Every single time.”",
      fa: "«کاربر سنش رو تایپ می‌کنه — ۱۲ — و برنامه همون لحظه از انجام هر محاسبه‌ای سر باز می‌زنه. همیشه همینه.»",
    },
    language: "python",
    category: "type-confusion",
    buggyCode: `age = input()
next_year = age + 1
print(f"Next year you'll be {next_year}")`,
    stdin: ["12"],
    expected: ["Next year you'll be 13"],
    hints: [
      {
        en: "input() always hands you TEXT — even when the user typed digits.",
        fa: "input() همیشه بهت متن می‌ده — حتی وقتی کاربر عدد تایپ کرده باشه.",
      },
      {
        en: "'12' + 1 mixes a str with an int. Python refuses.",
        fa: "'12' + 1 یعنی جمعِ str با int. پایتون قبول نمی‌کنه.",
      },
      {
        en: "Wrap the input in int(...) to turn the text '12' into the number 12.",
        fa: "ورودی رو داخل int(...) بذار تا متنِ '12' تبدیل بشه به عدد ۱۲.",
      },
    ],
    why: {
      en: "input() returns a str; math needs an int — convert with int() before adding.",
      fa: "تابع input() یه str برمی‌گردونه؛ ولی محاسبه به int نیاز داره — قبل از جمع با int() تبدیلش کن.",
    },
    fixedCode: `age = int(input())
next_year = age + 1
print(f"Next year you'll be {next_year}")`,
  },
  {
    id: "bc-088",
    num: "088",
    title: { en: "The Photo That Lost Its Voice", fa: "عکسی که صداشو گم کرد" },
    symptom: {
      en: "“Screen readers can't describe my cat photo, and the browser shows a weird broken image. The tag looked fine when I wrote it!”",
      fa: "«اسکرین‌ریدرها نمی‌تونن عکس گربه‌م رو توصیف کنن و مرورگر هم یه تصویر خرابِ عجیب نشون می‌ده. موقع نوشتن تگ انگار همه‌چی درست بود!»",
    },
    language: "html",
    category: "string-format",
    buggyCode: `<h1>Adoption Day</h1>
<img src="cat.jpg alt="A sleepy orange cat">
<p>Meet Marmalade — Saturdays 10 to 12.</p>`,
    checks: [
      {
        label: { en: "The image carries its alt text", fa: "عکس متن alt خودش رو داره" },
        selector: "img",
        attrName: "alt",
        attrValue: "A sleepy orange cat",
      },
      {
        label: { en: "The src is exactly “cat.jpg”", fa: "مقدار src دقیقاً «cat.jpg» هست" },
        selector: "img",
        attrName: "src",
        attrValue: "cat.jpg",
      },
      {
        label: { en: "The info line is still a paragraph", fa: "خط معرفی هنوز یه پاراگرافه" },
        selector: "p",
        text: "Marmalade",
      },
    ],
    hints: [
      {
        en: "Look closely at the <img> line — count the quotation marks.",
        fa: "خوب به خطِ <img> نگاه کن — تعداد گیومه‌ها رو بشمار.",
      },
      {
        en: "A quote that opens must close: src=\"cat.jpg alt=\" swallows the alt attribute whole.",
        fa: "هر گیومه‌ای که باز می‌شه باید بسته بشه: src=\"cat.jpg alt=\" کلِ ویژگی alt رو می‌بلعه.",
      },
      {
        en: "Give src its own closing quote: src=\"cat.jpg\" alt=\"A sleepy orange cat\".",
        fa: "به src گیومهٔ بستنش رو بده: src=\"cat.jpg\" alt=\"A sleepy orange cat\".",
      },
    ],
    why: {
      en: "The alt=\" quote was never closed, so the browser ate the rest of the tag into broken attributes.",
      fa: "گیومهٔ alt=\" هیچ‌وقت بسته نشد، برای همین مرورگر بقیهٔ تگ رو خورد و تبدیلش کرد به ویژگی‌های خراب.",
    },
    fixedCode: `<h1>Adoption Day</h1>
<img src="cat.jpg" alt="A sleepy orange cat">
<p>Meet Marmalade — Saturdays 10 to 12.</p>`,
  },
  {
    id: "bc-073",
    num: "073",
    title: { en: "The Backup That Wasn't", fa: "بکاپی که اصلاً بکاپ نبود" },
    symptom: {
      en: "“I added the phone to my backup list… and it appeared in the shopping cart too. Is my code haunted?”",
      fa: "«گوشی رو به لیست بکاپم اضافه کردم… و همون لحظه توی سبد خرید هم ظاهر شد. کدم رو جن گرفته یا چی؟»",
    },
    language: "python",
    category: "mutation",
    buggyCode: `cart = ["book", "pen"]
backup = cart
backup.append("phone")
print(f"Cart: {cart}")
print(f"Backup: {backup}")`,
    expected: ["Cart: ['book', 'pen']", "Backup: ['book', 'pen', 'phone']"],
    hints: [
      {
        en: "backup and cart print the same thing — suspicious. Are they two lists, or one list with two names?",
        fa: "backup و cart یه چیز رو چاپ می‌کنن — مشکوکه. دو تا لیست‌ان یا یه لیست با دو تا اسم؟",
      },
      {
        en: "`=` copies the label, not the list. Both names point at the same boxes in memory.",
        fa: "عملگر = فقط لیبل رو کپی می‌کنه نه خود لیست رو. هر دو اسم به یه جعبه‌های مشترک تو حافظه اشاره می‌کنن.",
      },
      {
        en: "Make a real copy: backup = cart.copy() (or list(cart)).",
        fa: "یه کپی واقعی بساز: backup = cart.copy() (یا list(cart)).",
      },
    ],
    why: {
      en: "`backup = cart` creates a second name for the SAME list — appending through either name changes the one shared list.",
      fa: "«backup = cart» برای همون یه لیست اسم دوم می‌سازه — append از هر اسمی که بزنی، همون لیست مشترک تغییر می‌کنه.",
    },
    fixedCode: `cart = ["book", "pen"]
backup = cart.copy()
backup.append("phone")
print(f"Cart: {cart}")
print(f"Backup: {backup}")`,
  },
  {
    id: "bc-106",
    num: "106",
    title: { en: "The Countdown That Never Lifts Off", fa: "شمارشی که هیچ‌وقت پرتاب نمی‌شه" },
    symptom: {
      en: "“My rocket prints T-minus 3 forever and Liftoff never comes. I had to close the whole tab.”",
      fa: "«موشک من بی‌وقفه T-minus 3 چاپ می‌کنه و Liftoff هیچ‌وقت نمیاد. مجبور شدم کل تب رو ببندم.»",
    },
    language: "python",
    category: "infinite-loop",
    buggyCode: `launch = 3
while launch > 0:
    print(f"T-minus {launch}…")
print("Liftoff! 🚀")`,
    expected: ["T-minus 3…", "T-minus 2…", "T-minus 1…", "Liftoff! 🚀"],
    hints: [
      {
        en: "The rocket never counts down — launch stays 3 forever.",
        fa: "موشک هیچ‌وقت کم نمی‌شه — launch برای همیشه ۳ می‌مونه.",
      },
      {
        en: "A while loop only stops when its condition turns False. What could ever turn `launch > 0` False?",
        fa: "حلقهٔ while فقط وقتی می‌ایسته که شرطش False بشه. چی می‌تونه `launch > 0` رو False کنه؟",
      },
      {
        en: "Subtract 1 from launch INSIDE the loop body, before the loop ends.",
        fa: "داخل بدنهٔ حلقه و قبل از تموم شدنش، یه واحد از launch کم کن.",
      },
    ],
    why: {
      en: "Nothing inside the loop ever changes launch, so the condition stays True forever.",
      fa: "هیچ‌چیز داخل حلقه مقدار launch رو عوض نمی‌کنه، پس شرط برای همیشه True می‌مونه.",
    },
    fixedCode: `launch = 3
while launch > 0:
    print(f"T-minus {launch}…")
    launch = launch - 1
print("Liftoff! 🚀")`,
  },
];

// ─── 2 · Error Encyclopedia — mistake library ────────────────

export type ErrorEntry = {
  id: string;
  lang: ErrorLangKey;
  category: ErrorCategoryKey;
  severity: SeverityKey;
  /** Verbatim error / symptom text (searchable, mono). */
  errorText: string;
  /** Sandbox variant of the message, also searchable. */
  altText?: string;
  plainMeaning: L;
  causes: L[];
  fixes: L[];
  prevention: L;
  /** Minimal (real-language) repro — shown read-only, never "executed". */
  broken?: string;
  fixed?: string;
  /** Related lesson title labels (non-navigating). */
  related?: L[];
};

export const ERROR_ENTRIES: ErrorEntry[] = [
  {
    id: "ee-indentation",
    lang: "python",
    category: "syntax",
    severity: "medium",
    errorText: "IndentationError: expected an indented block",
    altText: "unindent does not match any outer indentation level",
    plainMeaning: {
      en: "Python uses indentation to know which lines belong inside an if, loop or function. This line should be pushed in — but it isn't.",
      fa: "پایتون با تورفتگی می‌فهمه کدوم خط‌ها داخل if یا حلقه یا تابع‌ان. این خط باید تورفته باشه ولی نیست.",
    },
    causes: [
      {
        en: "A level of indentation got deleted or lost while editing.",
        fa: "یه پله از تورفتگی‌ها موقع ویرایش حذف یا گم شده.",
      },
      {
        en: "Tabs and spaces are mixed, so Python sees different widths.",
        fa: "تب و فاصله قاطی شدن و پایتون عرض‌های متفاوتی می‌بینه.",
      },
      {
        en: "The block after `:` is simply missing.",
        fa: "بدنهٔ بعد از «:» اصلاً نوشته نشده.",
      },
    ],
    fixes: [
      {
        en: "Indent the lines that belong inside the block — usually 4 spaces.",
        fa: "خط‌هایی که داخل بدنه‌ان رو تورفتگی بده — معمولاً ۴ تا فاصله.",
      },
      {
        en: "Re-indent the whole block consistently (select it, shift right/left).",
        fa: "کل بلوک رو یک‌دست دوباره تورفتگی بده (انتخابش کن، یه‌جا راست/چپ کن).",
      },
      {
        en: "If the block must be empty for now, write `pass`.",
        fa: "اگه فعلاً بدنه باید خالی بمونه، بنویس pass.",
      },
    ],
    prevention: {
      en: "Let the editor auto-indent and stick to 4 spaces per level — never mix tabs and spaces.",
      fa: "بذار ادیتور خودش تورفتگی بده و همیشه ۴ فاصله در هر پله استفاده کن — تب و فاصله رو قاطی نکن.",
    },
    broken: `if score > 10:
print("Win!")`,
    fixed: `if score > 10:
    print("Win!")`,
    related: [{ en: "if / elif / else", fa: "اگر / وگرنه اگر / وگرنه" }],
  },
  {
    id: "ee-str-float",
    lang: "python",
    category: "type",
    severity: "high",
    errorText: "TypeError: can't multiply sequence by non-int of type 'float'",
    altText: "'str' and numbers can't be combined with '*'",
    plainMeaning: {
      en: "You multiplied text (a str) by a decimal number. Text only repeats with whole numbers.",
      fa: "متن (str) رو در یه عدد اعشاری ضرب کردی. متن فقط با عددهای کامل تکرار می‌شه.",
    },
    causes: [
      {
        en: "input() gave you text and you used it in math without converting.",
        fa: "input() بهت متن داده و تو بدون تبدیل ازش توی محاسبه استفاده کردی.",
      },
      {
        en: "You meant to call float() but did the math on the raw string.",
        fa: "قرار بود float() صدا بزنی ولی محاسبه روی خود رشته انجام شده.",
      },
    ],
    fixes: [
      {
        en: "Convert first: price = float(input()) — then multiply.",
        fa: "اول تبدیل کن: price = float(input()) — بعد ضرب کن.",
      },
      {
        en: "If the number should be whole, use int() instead.",
        fa: "اگه عدد باید کامل باشه، به‌جاش int() استفاده کن.",
      },
    ],
    prevention: {
      en: "Convert user input at the boundary — the exact line where it enters your program.",
      fa: "ورودی کاربر رو همون اولِ راه تبدیل کن — دقیقاً همون خطی که وارد برنامته می‌شه.",
    },
    broken: `price = input()
total = price * 1.5`,
    fixed: `price = float(input())
total = price * 1.5`,
    related: [{ en: "Asking the User", fa: "حرف زدن با کاربر" }],
  },
  {
    id: "ee-nameerror",
    lang: "python",
    category: "runtime",
    severity: "medium",
    errorText: "NameError: name 'total' is not defined",
    altText: "'total' is not defined — did you forget to create it, or to import a module?",
    plainMeaning: {
      en: "Python reached a name it has never seen — no variable or function with that label exists yet.",
      fa: "پایتون به اسمی رسیده که تا حالا ندیده — هیچ متغیر یا تابعی با این برچسب هنوز وجود نداره.",
    },
    causes: [
      { en: "A typo: `totl` instead of `total`.", fa: "غلط تایپی: به‌جای total نوشتی totl." },
      {
        en: "The variable is used before the line that creates it has run.",
        fa: "متغیر قبل از این‌که خطِ ساختنش اجرا بشه استفاده شده.",
      },
      {
        en: "It lives inside a function, but you're reading it outside.",
        fa: "متغیر داخل تابع ساخته شده ولی تو بیرون از تابع می‌خونیش.",
      },
    ],
    fixes: [
      {
        en: "Check the spelling against the line where you created it.",
        fa: "املتش رو با خطی که ساختیش مقایسه کن.",
      },
      {
        en: "Move the assignment above the first use.",
        fa: "خطِ مقداردهی رو ببر بالای اولین استفاده.",
      },
      {
        en: "If a function creates it, return the value and store it outside.",
        fa: "اگه تابع می‌سازتش، با return برگردونش و بیرون ذخیره‌ش کن.",
      },
    ],
    prevention: {
      en: "Create variables right before you need them and keep one spelling per name.",
      fa: "متغیر رو درست قبل از نیازت بساز و برای هر اسم فقط یه املای ثابت داشته باش.",
    },
    broken: `print(total)
total = 5`,
    fixed: `total = 5
print(total)`,
    related: [{ en: "Boxes with Names", fa: "جعبه‌هایی با اسم" }],
  },
  {
    id: "ee-indexerror",
    lang: "python",
    category: "runtime",
    severity: "medium",
    errorText: "IndexError: list index out of range",
    altText: "index out of range — the collection has 4 items (valid: 0…3)",
    plainMeaning: {
      en: "You asked a list for a position that doesn't exist. A list of 3 items only has indexes 0, 1 and 2.",
      fa: "از لیست خواستی به خونه‌ای نگاه کنی که وجود نداره. لیستِ ۳تایی فقط اندیس‌های ۰ و ۱ و ۲ رو داره.",
    },
    causes: [
      {
        en: "Using `<=` with `len(list)` in a loop — one step too far.",
        fa: "استفاده از <= کنار len(list) توی حلقه — یه قدم بیشتر.",
      },
      {
        en: "Guessing a position without checking the list's length.",
        fa: "حدس زدن اندیس بدون چک کردن طول لیست.",
      },
      {
        en: "The list is empty — even [0] is out of range.",
        fa: "لیست خالیه — حتی [0] هم خارج از محدوده‌ست.",
      },
    ],
    fixes: [
      {
        en: "Loop directly with `for item in items:` — no index math at all.",
        fa: "مستقیم با «for item in items:» حلقه بزن — اصلاً سراغ محاسبهٔ اندیس نرو.",
      },
      { en: "If you must index, use `range(len(items))`.", fa: "اگه واقعاً به اندیس نیاز داری، از range(len(items)) استفاده کن." },
      { en: "Check `len(items)` before reading an index.", fa: "قبل از خوندن اندیس، len(items) رو چک کن." },
    ],
    prevention: {
      en: "Prefer for-each loops over manual indexing — fewer chances to run off the end.",
      fa: "حلقهٔ for-each رو به اندیس‌گیری دستی ترجیح بده — شانس پریدن از آخرِ لیست کمتر می‌شه.",
    },
    broken: `pets = ["cat", "dog", "fish"]
for i in range(len(pets) + 1):
    print(pets[i])`,
    fixed: `pets = ["cat", "dog", "fish"]
for pet in pets:
    print(pet)`,
    related: [{ en: "for Loops & range()", fa: "حلقهٔ for و range" }],
  },
  {
    id: "ee-infinite-while",
    lang: "python",
    category: "logic",
    severity: "high",
    errorText: "your program ran too long — check for an infinite loop",
    altText: "too much output — over 500 lines (an infinite print loop?)",
    plainMeaning: {
      en: "The while condition never turns False, so the loop repeats forever and the page freezes.",
      fa: "شرط while هیچ‌وقت False نمی‌شه، برای همین حلقه برای همیشه تکرار می‌شه و صفحه هنگ می‌کنه.",
    },
    causes: [
      {
        en: "You forgot to update the counter inside the loop body.",
        fa: "یادت رفته متغیر شمارنده رو داخل بدنهٔ حلقه به‌روز کنی.",
      },
      {
        en: "The update moves the wrong way (`i = i + 1` where you needed `- 1`).",
        fa: "به‌روزرسانی به جهت اشتباه حرکت می‌کنه (i = i + 1 نوشتی در حالی که - 1 لازم بود).",
      },
      {
        en: "The condition can never be False for the values involved.",
        fa: "شرط با این مقادیر اصلاً نمی‌تونه False بشه.",
      },
    ],
    fixes: [
      {
        en: "Change something inside the body that moves toward the condition failing.",
        fa: "یکی از مقادیر شرط رو داخل بدنه طوری تغییر بده که شرط به سمت False بره.",
      },
      {
        en: "Print the variable each round — if it never changes, you found the bug.",
        fa: "هر دور متغیر رو print کن — اگه هیچ‌وقت عوض نشد، باگ رو پیدا کردی.",
      },
      {
        en: "As a safety net, add a maximum-iterations guard with break.",
        fa: "برای امنیت، یه سقفِ تکرار بذار و با break ازش خارج شو.",
      },
    ],
    prevention: {
      en: "Before every while loop, answer out loud: “what exactly makes this condition become False?”",
      fa: "قبل از هر حلقهٔ while بلند جواب بده: «دقیقاً چی این شرط رو False می‌کنه؟»",
    },
    broken: `fuel = 5
while fuel > 0:
    print(f"Fuel: {fuel}")`,
    fixed: `fuel = 5
while fuel > 0:
    print(f"Fuel: {fuel}")
    fuel = fuel - 1`,
    related: [{ en: "while Loops", fa: "حلقهٔ while" }],
  },
  {
    id: "ee-mutable-default",
    lang: "python",
    category: "logic",
    severity: "high",
    errorText: "A default argument keeps its old value between calls",
    plainMeaning: {
      en: "A default like `def add(item, bag=[])` creates ONE list when the function is defined — every call shares that same list.",
      fa: "یه مقدار پیش‌فرض مثل «def add(item, bag=[])» موقع تعریف تابع یه لیست می‌سازه — و همهٔ صدا زدن‌ها همون یه لیست رو به اشتراک می‌ذارن.",
    },
    causes: [
      { en: "Using [] or {} as a default value.", fa: "استفاده از [] یا {} به‌عنوان مقدار پیش‌فرض." },
      {
        en: "Assuming the default is rebuilt on every call.",
        fa: "این تصور که پیش‌فرض هر بار دوباره ساخته می‌شه.",
      },
    ],
    fixes: [
      {
        en: "Default to None and create the list inside: `if bag is None: bag = []`.",
        fa: "پیش‌فرض رو None بذار و لیست رو داخل تابع بساز: «if bag is None: bag = []».",
      },
      {
        en: "Return a new list instead of mutating the shared one.",
        fa: "به‌جای تغییر لیست مشترک، یه لیست جدید بساز و برگردون.",
      },
    ],
    prevention: {
      en: "Never use a mutable value (list, dict) as a default argument — use None.",
      fa: "هیچ‌وقت یه مقدار تغییرپذیر (لیست یا دیکشنری) رو پیش‌فرض نذار — None استفاده کن.",
    },
    broken: `def add(item, bag=[]):
    bag.append(item)
    return bag

print(add("pen"))   # ['pen']
print(add("key"))   # ['pen', 'key'] — ?!`,
    fixed: `def add(item, bag=None):
    if bag is None:
        bag = []
    bag.append(item)
    return bag

print(add("pen"))   # ['pen']
print(add("key"))   # ['key']`,
    related: [{ en: "Functions: Your Own Verbs", fa: "توابع: فعل‌های خودت" }],
  },
  {
    id: "ee-equal-signs",
    lang: "python",
    category: "syntax",
    severity: "medium",
    errorText: "SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?",
    altText: "SyntaxError: invalid syntax",
    plainMeaning: {
      en: "You used one = (which stores a value) where Python needed two == (which compares values).",
      fa: "جایی که پایتون دو تا == (مقایسه) می‌خواست، تو یه = (ذخیرهٔ مقدار) گذاشتی.",
    },
    causes: [
      {
        en: "Writing `if x = 5:` — assignment inside a condition.",
        fa: "نوشتن «if x = 5:» — یعنی انتساب داخل شرط.",
      },
      {
        en: "Typing = out of habit in a comparison.",
        fa: "از سر عادت توی مقایسه = تایپ کردی.",
      },
    ],
    fixes: [
      {
        en: "In a condition, compare with ==: `if answer == \"yes\":`",
        fa: "داخل شرط با == مقایسه کن: «if answer == \"yes\":»",
      },
      {
        en: "Keep single = only for storing values: `score = 0`.",
        fa: "= تکی رو فقط برای ذخیرهٔ مقدار نگه دار: «score = 0».",
      },
    ],
    prevention: {
      en: "Read = as “becomes” and == as “is equal to” — say it out loud while you learn.",
      fa: "= رو بخون «می‌شه» و == رو بخون «برابر با» — موقع یادگیری بلند بگو.",
    },
    broken: `answer = "yes"
if answer = "yes":
    print("Welcome!")`,
    fixed: `answer = "yes"
if answer == "yes":
    print("Welcome!")`,
  },
  {
    id: "ee-zerodivision",
    lang: "python",
    category: "runtime",
    severity: "low",
    errorText: "ZeroDivisionError: division by zero",
    plainMeaning: {
      en: "You divided by zero — Python refuses because the result has no meaning.",
      fa: "بر صفر تقسیم کردی — پایتون قبول نمی‌کنه چون نتیجه‌ش معنی نداره.",
    },
    causes: [
      {
        en: "A count or total is still 0 when the division runs.",
        fa: "یه شمارنده یا جمع هنوز صفره که تقسیم اجرا می‌شه.",
      },
      {
        en: "The user typed 0 and you didn't check it.",
        fa: "کاربر ۰ وارد کرده و تو چکش نکردی.",
      },
    ],
    fixes: [
      {
        en: "Check first: `if people > 0: share = total / people`",
        fa: "اول چک کن: «if people > 0: share = total / people»",
      },
      {
        en: "Give a sensible fallback message when the divisor is 0.",
        fa: "وقتی مقسوم‌علیه صفره، یه پیامِ منطقی نشون بده.",
      },
    ],
    prevention: {
      en: "Any divisor that comes from data or user input deserves a zero check.",
      fa: "هر مقسوم‌علیه‌ای که از داده یا ورودی کاربر میاد، حق داره یه چکِ صفر داشته باشه.",
    },
    broken: `total = 100
people = 0
print(total / people)`,
    fixed: `total = 100
people = 0
if people > 0:
    print(total / people)
else:
    print("Nobody to split with!")`,
  },
  {
    id: "ee-unclosed-tag",
    lang: "html",
    category: "html",
    severity: "medium",
    errorText: "Elements swallow their neighbours (no error shown — the page just looks wrong)",
    plainMeaning: {
      en: "A tag you opened was never closed, so the browser keeps it open and pulls later content inside it.",
      fa: "تگی که باز کردی هیچ‌وقت بسته نشده، برای همین مرورگر باز نگهش می‌داره و محتوای بعدی رو می‌کشه داخلش.",
    },
    causes: [
      { en: "Forgot the closing tag like </h2> or </a>.", fa: "تگ بستن مثل </h2> یا </a> یادت رفته." },
      {
        en: "Tags crossed instead of nesting (…<b>…<i>…</b>…</i>…).",
        fa: "تگ‌ها به‌جای تودرتو شدن، از روی هم رد شدن (…<b>…<i>…</b>…</i>…).",
      },
    ],
    fixes: [
      {
        en: "Find the opening tag and add its closing partner in the right place.",
        fa: "تگ باز رو پیدا کن و جفتِ بستنش رو سر جاش اضافه کن.",
      },
      {
        en: "Keep nesting tidy: last opened, first closed.",
        fa: "تودرتو رو مرتب نگه دار: آخرینِ باز‌شده، اولینِ بسته‌شده.",
      },
    ],
    prevention: {
      en: "Close each tag immediately after opening it, then type the content between the pair.",
      fa: "هر تگ رو درست بعد از باز کردنش ببند، بعد محتوا رو بین جفتش تایپ کن.",
    },
    broken: `<h2>Top songs
<p>Song one</p>`,
    fixed: `<h2>Top songs</h2>
<p>Song one</p>`,
    related: [{ en: "Close what you open", fa: "هر چه باز می‌کنی، ببند" }],
  },
  {
    id: "ee-selector",
    lang: "html",
    category: "css",
    severity: "high",
    errorText: "The style rule never appears on the element",
    plainMeaning: {
      en: "The rule and the element don't match: a typo — or a specificity fight your rule lost.",
      fa: "قانون CSS و عنصر به هم نمی‌خورن: یا یه غلط تایپی — یا جنگِ specificity که قانون تو باخته.",
    },
    causes: [
      {
        en: "Class name mismatch: .warning vs class=\"warn\".",
        fa: "اسم کلاس نمی‌خونه: .warning ولی class=\"warn\".",
      },
      {
        en: "Using #id for something that only has a class (or the reverse).",
        fa: "استفاده از #id برای چیزی که فقط کلاس داره (یا برعکس).",
      },
      {
        en: "Another rule with higher specificity (or !important) overrides yours.",
        fa: "یه قانون دیگه با specificity بالاتر (یا !important) جای قانون تو نشسته.",
      },
    ],
    fixes: [
      {
        en: "Check the selector letter by letter against the class/id in the markup.",
        fa: "سلکتور رو حرف‌به‌حرف با کلاس/آیدی داخل HTML مقایسه کن.",
      },
      {
        en: "In DevTools, open the Styles panel — crossed-out rules lost the fight.",
        fa: "توی DevTools پنل Styles رو باز کن — قانون‌های خط‌خورده بازندهٔ جنگن.",
      },
      {
        en: "Raise specificity deliberately, or remove the competing rule.",
        fa: "عمداً specificity رو بالاتر ببر، یا قانون رقیب رو حذف کن.",
      },
    ],
    prevention: {
      en: "Copy class names instead of retyping them, and keep selectors as simple as possible.",
      fa: "اسم کلاس‌ها رو به‌جای تایپ دوباره کپی کن و سلکتورها رو تا جای ممکن ساده نگه دار.",
    },
    broken: `<style>.card-title { color: teal; }</style>
<h3 class="cardtitle">Welcome</h3>`,
    fixed: `<style>.card-title { color: teal; }</style>
<h3 class="card-title">Welcome</h3>`,
    related: [{ en: "Classes & ids: name it, style it", fa: "کلاس و آیدی: نام بگذار، استایل بده" }],
  },
  {
    id: "ee-margin-collapse",
    lang: "html",
    category: "css",
    severity: "medium",
    errorText: "The margin between parent and child disappears",
    plainMeaning: {
      en: "Vertical margins collapse into one: the child's margin-top 'escapes' instead of pushing it down inside the parent.",
      fa: "مارجین‌های عمودی توی هم ذوب می‌شن: margin-top بچه به‌جای این‌که داخل والد فشار بده، «فرار می‌کنه» بیرون.",
    },
    causes: [
      {
        en: "margin-top on the first child with no border/padding between it and the parent.",
        fa: "margin-top روی اولین فرزند، بدون هیچ border یا padding بینش و والد.",
      },
      {
        en: "Adjacent siblings' bottom + top margins merging into one.",
        fa: "مارجین پایینیِ یه خواهر/برادر با مارجین بالاییِ بعدی یکی می‌شه.",
      },
    ],
    fixes: [
      {
        en: "Use padding on the parent instead of margin on the child.",
        fa: "به‌جای مارجین روی فرزند، از padding روی والد استفاده کن.",
      },
      {
        en: "Or give the parent `display: flow-root` (or a border / overflow: hidden).",
        fa: "یا به والد «display: flow-root» بده (یا border یا overflow: hidden).",
      },
      {
        en: "Space siblings with one direction only (e.g. margin-bottom for everyone).",
        fa: "فاصلهٔ خواهر/برادرها رو فقط یه‌طرفه بده (مثلاً همه فقط margin-bottom).",
      },
    ],
    prevention: {
      en: "For inner spacing prefer padding; keep one margin direction across siblings.",
      fa: "برای فاصلهٔ داخلی padding رو ترجیح بده و بین خواهر/برادرها فقط یه جهتِ مارجین داشته باش.",
    },
    broken: `<style>
  .box { background: #eee; }
  .box h3 { margin-top: 40px; }
</style>
<div class="box"><h3>Title</h3></div>`,
    fixed: `<style>
  .box { background: #eee; padding-top: 40px; }
</style>
<div class="box"><h3>Title</h3></div>`,
    related: [{ en: "Padding vs margin", fa: "padding در برابر margin" }],
  },
  {
    id: "ee-img-alt",
    lang: "html",
    category: "accessibility",
    severity: "medium",
    errorText: "<img> without an alt attribute",
    plainMeaning: {
      en: "Screen-reader users hear the file name — or nothing at all. The image has no text voice.",
      fa: "کاربرهای اسکرین‌ریدر اسم فایل رو می‌شنون — یا هیچی. تصویر هیچ صدای متنی نداره.",
    },
    causes: [
      {
        en: "alt felt optional when the image “obviously” spoke for itself.",
        fa: "alt اختیاری به نظر رسید چون عکس «به‌ظاهر» خودش گویا بود.",
      },
      { en: "Copy-pasted <img> tags skipped it.", fa: "تگ‌های img که کپی می‌شن، alt رو جا می‌ذارن." },
    ],
    fixes: [
      {
        en: "Add alt=\"…\" that describes what the image shows or does.",
        fa: "یه alt=\"…\" اضافه کن که بگه عکس چی نشون می‌ده یا چه‌کاره‌ست.",
      },
      {
        en: "Purely decorative images: keep alt=\"\" (empty) so readers skip them.",
        fa: "عکس‌های صرفاً تزئینی: alt=\"\" خالی بذار تا ریدرها ردش کنن.",
      },
    ],
    prevention: {
      en: "Treat alt as part of the tag — write it the moment you write src.",
      fa: "alt رو جزءِ جدانشدنی تگ ببین — همون لحظه که src رو نوشتی، بنویسش.",
    },
    broken: `<img src="team.jpg">`,
    fixed: `<img src="team.jpg" alt="The five of us after the demo day">`,
    related: [{ en: "Images and their voice: alt", fa: "تصاویر و صدایشان: alt" }],
  },
  {
    id: "ee-button-form",
    lang: "html",
    category: "browser",
    severity: "medium",
    errorText: "Clicking a button reloads the page and the form input is lost",
    plainMeaning: {
      en: "Inside a <form>, a plain <button> defaults to type=\"submit\" — the browser sends the form and reloads the page.",
      fa: "داخل فرم، یه <button> ساده به‌طور پیش‌فرض type=\"submit\" هست — یعنی مرورگر فرم رو می‌فرسته و صفحه رو دوباره لود می‌کنه.",
    },
    causes: [
      {
        en: "Added a helper button (e.g. “Add ingredient”) without a type.",
        fa: "یه دکمهٔ کمکی (مثل «افزودن») بدون type گذاشتی.",
      },
      {
        en: "Assumed buttons only “do things” — inside forms they submit.",
        fa: "فکر می‌کردی دکمه فقط «کارت انجام می‌ده» — ولی داخل فرم، سابمیت می‌کنه.",
      },
    ],
    fixes: [
      {
        en: "Give every non-submitting button type=\"button\".",
        fa: "به هر دکمه‌ای که قرار نیست فرم رو بفرسته، type=\"button\" بده.",
      },
      {
        en: "Keep type=\"submit\" only for the real submit button, and handle the form's submit event.",
        fa: "type=\"submit\" رو فقط برای دکمهٔ اصلی سابمیت نگه دار و رویداد submit فرم رو مدیریت کن.",
      },
    ],
    prevention: {
      en: "Decide each button's role out loud — submits, or just clicks? The type follows the role.",
      fa: "نقش هر دکمه رو بلند بگو — سابمیت می‌کنه یا فقط کلیکه؟ type از روی نقش مشخص می‌شه.",
    },
    broken: `<form>
  <input name="item">
  <button onclick="addItem()">Add</button>
  <button>Save</button>
</form>`,
    fixed: `<form>
  <input name="item">
  <button type="button" onclick="addItem()">Add</button>
  <button type="submit">Save</button>
</form>`,
    related: [{ en: "Forms: listening to people", fa: "فرم‌ها؛ گوش دادن به آدم‌ها" }],
  },
  {
    id: "ee-undefined-fn",
    lang: "javascript",
    category: "javascript",
    severity: "high",
    errorText: "Uncaught TypeError: undefined is not a function",
    plainMeaning: {
      en: "JS looked for a function under that name and found undefined — the function doesn't exist (yet) or is spelled differently.",
      fa: "جاوااسکریپت دنبال تابعی با اون اسم گشت و undefined پیدا کرد — یا تابع هنوز وجود نداره یا املاش فرق داره.",
    },
    causes: [
      {
        en: "Typo: getElementByID instead of getElementById.",
        fa: "غلط تایپی: getElementByID به‌جای getElementById.",
      },
      {
        en: "Calling it before the script that defines it has run.",
        fa: "صدا زدنش قبل از این‌که اسکریپتِ تعریفش اجرا بشه.",
      },
      {
        en: "The object simply has no such method.",
        fa: "این شیء اصلاً همچین متدی نداره.",
      },
    ],
    fixes: [
      {
        en: "Check the exact spelling — JS names are case-sensitive.",
        fa: "املای دقیق رو چک کن — اسم‌ها توی JS به بزرگی/کوچکی حروف حساسن.",
      },
      {
        en: "Move the call after the definition, or wrap it in DOMContentLoaded.",
        fa: "صدا زدن رو ببر بعد از تعریف، یا بپیچشش توی DOMContentLoaded.",
      },
      {
        en: "console.log the object to see what it actually has.",
        fa: "با console.log شیء رو ببین که واقعاً چه چیزهایی داره.",
      },
    ],
    prevention: {
      en: "Copy function names from their definition and keep one casing style everywhere.",
      fa: "اسم توابع رو از تعریفشون کپی کن و همه‌جا فقط یه سبکِ نام‌گذاری داشته باش.",
    },
    broken: `const btn = document.getElementByID("go");
btn.addEventListener("click", start);`,
    fixed: `const btn = document.getElementById("go");
btn.addEventListener("click", start);`,
  },
  {
    id: "ee-const-reassign",
    lang: "javascript",
    category: "javascript",
    severity: "medium",
    errorText: "Uncaught TypeError: Assignment to constant variable.",
    plainMeaning: {
      en: "You tried to give a new value to a const — consts can't be reassigned after creation.",
      fa: "خواستی به یه const مقدار جدید بدی — const بعد از ساخته شدن دیگه مقدارش عوض نمی‌شه.",
    },
    causes: [
      {
        en: "Used const for something that changes (a counter, a rebuilt list).",
        fa: "برای چیزی که تغییر می‌کنه const گذاشتی (یه شمارنده یا لیستی که از نو ساخته می‌شه).",
      },
      {
        en: "Confused const with “its contents can't change” — objects/arrays can still mutate.",
        fa: "const رو با «محتواش عوض نمی‌شه» قاطی کردی — آرایه و شیء هنوز قابل تغییرن.",
      },
    ],
    fixes: [
      { en: "Use let when the value will change.", fa: "اگه مقدار قراره عوض بشه، از let استفاده کن." },
      {
        en: "If only the contents change (push, editing fields), const is fine — don't reassign the name.",
        fa: "اگه فقط محتوا عوض می‌شه (push یا ویرایش فیلدها)، const اوکیه — اسم رو دوباره مقدار نده.",
      },
    ],
    prevention: {
      en: "Default to const; switch to let the moment a reassignment is really needed.",
      fa: "پیش‌فرضت const باشه؛ همون لحظه که واقعاً به مقداردهی دوباره نیاز شد، برو سراغ let.",
    },
    broken: `const score = 0;
score = score + 10;`,
    fixed: `let score = 0;
score = score + 10;`,
  },
  {
    id: "ee-404",
    lang: "general",
    category: "network",
    severity: "low",
    errorText: "404 Not Found",
    plainMeaning: {
      en: "The server understood you, but nothing lives at that address. The page moved, was renamed — or the URL has a typo.",
      fa: "سرور حرفت رو فهمید ولی اون آدرس هیچی نداره. صفحه جابه‌جا شده، اسمش عوض شده — یا URL غلط تایپی داره.",
    },
    causes: [
      { en: "Typo in the path (/apit instead of /api).", fa: "غلط تایپی تو مسیر (/apit به‌جای /api)." },
      { en: "The resource was deleted or moved.", fa: "منبع حذف شده یا جابه‌جا شده." },
      { en: "A URL parameter is missing (no id given).", fa: "یه پارامتر URL جا افتاده (مثلاً id نداده‌ای)." },
    ],
    fixes: [
      { en: "Re-check the URL letter by letter.", fa: "URL رو حرف‌به‌حرف دوباره چک کن." },
      {
        en: "Confirm the resource still exists — hit the list endpoint first.",
        fa: "مطمئن شو منبع هنوز وجود داره — اول endpoint لیست رو صدا بزن.",
      },
      {
        en: "On your own site, build a friendly 404 page with a way back.",
        fa: "توی سایت خودت یه صفحهٔ 404 خوش‌برخورد با مسیر برگشت بساز.",
      },
    ],
    prevention: {
      en: "Link to routes from one central place (constants) instead of hand-typing paths.",
      fa: "لینک به مسیرها رو از یه جای مرکزی (ثابت‌ها) بده، نه تایپ دستی هر بار.",
    },
  },
  {
    id: "ee-cors",
    lang: "general",
    category: "network",
    severity: "high",
    errorText: "Blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present",
    plainMeaning: {
      en: "The browser fetched data from another origin, but that server never said your site may read it — so the browser blocks the response.",
      fa: "مرورگر داده‌ای از یه origin دیگه گرفت، ولی اون سرور هیچ‌وقت نگفته سایت تو اجازهٔ خوندنش رو داره — برای همین مرورگر جواب رو بلاک می‌کنه.",
    },
    causes: [
      { en: "Calling an API that doesn't allow your origin.", fa: "صدا زدن یه API که origin تو رو اجازه نمی‌ده." },
      {
        en: "Missing headers or credentials the API requires.",
        fa: "هدر یا اعتبارنامه‌هایی که API لازم داره ارسال نشدن.",
      },
      { en: "Testing from file:// instead of a real origin.", fa: "تست از طریق file:// به‌جای یه origin واقعی." },
    ],
    fixes: [
      {
        en: "On the server, allow your origin via Access-Control-Allow-Origin.",
        fa: "روی سرور، origin خودت رو با Access-Control-Allow-Origin مجاز کن.",
      },
      {
        en: "When you can't change the API, route the call through your own backend.",
        fa: "وقتی API دست تو نیست، درخواست رو از بک‌اند خودت رد کن.",
      },
      {
        en: "During development, serve both sides from the same origin.",
        fa: "توی توسعه، هر دو سمت رو از یه origin سرو کن.",
      },
    ],
    prevention: {
      en: "Decide the CORS policy on the server deliberately — it's a security feature, not a nuisance.",
      fa: "سیاست CORS رو عمداً و آگاهانه روی سرور تعیین کن — این یه ویژگی امنیتیه، نه اذیت‌کردن تو.",
    },
  },
];

// ─── 3 · Predict the Output — questions ──────────────────────

export type PredictOption = {
  /** Machine-comparable value: normalized stdout (py) or canonical DOM value (html). */
  value: string;
  /** Localized display label for values that aren't language-neutral. */
  label?: L;
};

export type PredictQ = {
  id: string;
  language: "python" | "html";
  prompt: L;
  code: string;
  mode: "choice" | "typed";
  options?: PredictOption[];
  explain: L;
  /** Python: lines fed to input(). */
  stdin?: string[];
  /** HTML: how the hidden sandbox computes ground truth. */
  dom?: { kind: "text" } | { kind: "count"; selector: string };
};

export const PREDICT_QUESTIONS: PredictQ[] = [
  {
    id: "pq-1",
    language: "python",
    prompt: {
      en: "Two tiny math lines. What do they print?",
      fa: "دو خطِ ریاضیِ کوچولو. چی چاپ می‌کنن؟",
    },
    code: `a = 7
b = 2
print(a // b)
print(a % b)`,
    mode: "choice",
    options: [
      { value: "3\n1" },
      { value: "3.5\n1" },
      { value: "3\n2" },
    ],
    explain: {
      en: "// keeps only the whole part (7 // 2 = 3) and % is what's left over (7 % 2 = 1).",
      fa: "عملگر // فقط قسمت کامل رو نگه می‌داره (7 // 2 = ۳) و % باقی‌مونده‌ست (7 % 2 = ۱).",
    },
  },
  {
    id: "pq-2",
    language: "python",
    prompt: {
      en: "Strings can multiply too. What comes out?",
      fa: "رشته‌ها هم ضرب دارن. چی درمیاد؟",
    },
    code: `word = "ha"
print(word * 3)
print(len(word) * 2)`,
    mode: "choice",
    options: [
      { value: "hahaha\n4" },
      { value: "hahaha\n2" },
      { value: "ha ha ha\n4" },
    ],
    explain: {
      en: "A string * 3 repeats it three times with no spaces; len(\"ha\") is 2, and 2 * 2 = 4.",
      fa: "رشته در ۳ یعنی سه بار تکرار بدون فاصله؛ len(\"ha\") می‌شه ۲ و 2 * 2 می‌شه ۴.",
    },
  },
  {
    id: "pq-3",
    language: "python",
    prompt: {
      en: "An accumulator loop — and a sneaky second print. What appears?",
      fa: "یه حلقهٔ جمع‌زن — و یه چاپِ دومِ موذی. چی ظاهر می‌شه؟",
    },
    code: `total = 0
for n in [2, 4, 6]:
    total = total + n
print(total)
print(n)`,
    mode: "choice",
    options: [
      { value: "12\n6" },
      { value: "12\n0" },
      { value: "24\n6" },
    ],
    explain: {
      en: "total collects 2 + 4 + 6 = 12, and the loop variable n keeps its last value (6) after the loop ends.",
      fa: "total دانه‌دانه ۲ + ۴ + ۶ = ۱۲ می‌شه و متغیر حلقه n بعد از تموم شدن حلقه، آخرین مقدارش (۶) رو نگه می‌داره.",
    },
  },
  {
    id: "pq-4",
    language: "python",
    prompt: {
      en: "Three branches, one temperature. Exactly what prints?",
      fa: "سه تا شاخه، یه دما. دقیقاً چی چاپ می‌شه؟",
    },
    code: `temp = 31
if temp > 30:
    print("Hot day")
elif temp > 20:
    print("Nice day")
else:
    print("Cold day")`,
    mode: "choice",
    options: [
      { value: "Hot day" },
      { value: "Hot day\nNice day" },
      { value: "Nice day" },
    ],
    explain: {
      en: "The first True branch wins and the whole if/elif/else chain stops — 31 > 30, so only “Hot day” prints.",
      fa: "اولین شاخهٔ True برنده می‌شه و کل زنجیرهٔ if/elif/else همون‌جا تموم می‌شه — چون ۳۱ > ۳۰، فقط «Hot day» چاپ می‌شه.",
    },
  },
  {
    id: "pq-5",
    language: "python",
    prompt: {
      en: "List surgery: append, sort, then peek. What prints?",
      fa: "جراحی لیست: append، بعد sort، بعد یه نگاه. چی چاپ می‌شه؟",
    },
    code: `nums = [3, 1, 2]
nums.append(9)
nums.sort()
print(nums)
print(nums[-1])`,
    mode: "choice",
    options: [
      { value: "[1, 2, 3, 9]\n9" },
      { value: "[3, 1, 2, 9]\n9" },
      { value: "[1, 2, 3, 9]\n3" },
    ],
    explain: {
      en: "After appending 9 and sorting, the list is [1, 2, 3, 9]; index -1 means “the last item” = 9.",
      fa: "بعد از اضافه‌شدن ۹ و مرتب‌شدن، لیست [1, 2, 3, 9] می‌شه؛ اندیس ‎-۱ یعنی «آخرین آیتم» یعنی ۹.",
    },
  },
  {
    id: "pq-6",
    language: "python",
    prompt: {
      en: "Dictionaries can be edited in place. What do the two prints say?",
      fa: "دیکشنری رو می‌شه همون‌جا ویرایش کرد. این دو تا چاپ چی می‌گن؟",
    },
    code: `ages = {"Sara": 14, "Ali": 15}
ages["Ali"] = 16
print(ages["Ali"])
print(len(ages))`,
    mode: "choice",
    options: [
      { value: "16\n2" },
      { value: "15\n2" },
      { value: "16\n3" },
    ],
    explain: {
      en: "Assigning to an existing key overwrites its value (16), and len counts keys — still 2 people.",
      fa: "مقدار دادن به کلیدِ موجود، مقدار قبلی رو بازنویسی می‌کنه (۱۶) و len تعداد کلیدها رو می‌شمره — هنوز ۲ نفر.",
    },
  },
  {
    id: "pq-7",
    language: "python",
    prompt: {
      en: "Hard mode — no options. Type the exact output, one line per printed line.",
      fa: "حالت سخت — بدون گزینه. خروجی دقیق رو تایپ کن، هر خط چاپ‌شده یه خط.",
    },
    code: `i = 1
while True:
    if i * i > 20:
        break
    print(i * i)
    i = i + 1`,
    mode: "typed",
    explain: {
      en: "The loop prints squares while they stay ≤ 20: 1, 4, 9, 16 — then 5 × 5 = 25 > 20 triggers break.",
      fa: "حلقه تا وقتی مربع‌ها ≤ ۲۰ هستن چاپ می‌کنه: ۱، ۴، ۹، ۱۶ — بعد 5 × 5 = ۲۵ از ۲۰ بزرگ‌تر می‌شه و break می‌زنه.",
    },
  },
  {
    id: "pq-8",
    language: "python",
    prompt: {
      en: "Hard mode — no options. A function, its result, and a nested call. Type the exact output.",
      fa: "حالت سخت — بدون گزینه. یه تابع، نتیجه‌ش و یه صدا زدنِ تودرتو. خروجی دقیق رو تایپ کن.",
    },
    code: `def shout(word):
    return word.upper() + "!"

msg = shout("go")
print(msg)
print(shout(msg))`,
    mode: "typed",
    explain: {
      en: "shout(\"go\") is \"GO!\"; shouting THAT upper-cases it again and adds one more ! — \"GO!!\".",
      fa: "shout(\"go\") می‌شه «GO!»؛ دوباره shout کردنش یعنی یه upper دیگر به‌علاوهٔ یه علامت تعجب دیگر — «GO!!».",
    },
  },
  {
    id: "pq-9",
    language: "html",
    prompt: {
      en: "This markup has no closing </li> tags. How many list items does the browser really render?",
      fa: "این کد تگ‌های </li> بسته نداره. مرورگر واقعاً چند تا آیتم لیست رندر می‌کنه؟",
    },
    code: `<ul>
  <li>Tea
  <li>Coffee
</ul>`,
    mode: "choice",
    options: [
      { value: "1", label: { en: "1 item", fa: "۱ آیتم" } },
      { value: "2", label: { en: "2 items", fa: "۲ آیتم" } },
      { value: "3", label: { en: "3 items", fa: "۳ آیتم" } },
    ],
    explain: {
      en: "The browser auto-closes an <li> the moment the next one (or </ul>) starts — you get exactly 2 items.",
      fa: "مرورگر درست وقتی <li> بعدی (یا </ul>) شروع می‌شه، خودش قبلی رو می‌بنده — دقیقاً ۲ آیتم داری.",
    },
    dom: { kind: "count", selector: "li" },
  },
  {
    id: "pq-10",
    language: "html",
    prompt: {
      en: "The <b> and <i> tags are crossed like shoelaces. What plain text does the page end up with?",
      fa: "تگ‌های <b> و <i> مثل بند کفش از روی هم رد شدن. متنِ سادهٔ نهایی صفحه چی می‌شه؟",
    },
    code: `<div>Order:
  <b>Tea <i>with mint</b> please</i>
</div>`,
    mode: "choice",
    options: [
      { value: "Order: Tea with mint please" },
      { value: "Order: Tea with mint" },
      { value: "Order: Tea please" },
    ],
    explain: {
      en: "The browser silently repairs crossed tags — but it never deletes text, so every word survives.",
      fa: "مرورگر تگ‌های به‌هم‌ریخته رو بی‌سر‌و‌صدا مرتب می‌کنه — ولی هیچ متنی رو پاک نمی‌کنه، پس همهٔ کلمه‌ها زنده می‌مونن.",
    },
    dom: { kind: "text" },
  },
];

// ─── 4 · Glossary — bilingual terms ──────────────────────────

export type GlossaryTerm = {
  id: string;
  /** English term (also the search/sort anchor). */
  term: string;
  /** Persian term shown next to it. */
  termFa: string;
  meaning: L;
  example: { lang: "python" | "html"; code: string };
  /** Related lesson title labels (non-navigating). */
  related?: L[];
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "gt-variable",
    term: "Variable",
    termFa: "متغیر",
    meaning: {
      en: "A labeled box that stores a value — you can read it and replace it later.",
      fa: "یه جعبه با اسم که یه مقدار رو نگه می‌داره — می‌تونی بعداً بخونیش یا عوضش کنی.",
    },
    example: { lang: "python", code: `score = 10\nscore = score + 5` },
    related: [{ en: "Boxes with Names", fa: "جعبه‌هایی با اسم" }],
  },
  {
    id: "gt-constant",
    term: "Constant",
    termFa: "ثابت",
    meaning: {
      en: "A value that stays the same while the program runs. Python spells it in CAPITALS by convention.",
      fa: "مقداری که موقع اجرای برنامه ثابت می‌مونه. توی پایتون طبق قرارداد با حروف بزرگ نوشته می‌شه.",
    },
    example: { lang: "python", code: `MAX_TRIES = 3` },
  },
  {
    id: "gt-data-type",
    term: "Data type",
    termFa: "نوع داده",
    meaning: {
      en: "The kind of a value — int, float, str, bool… It decides what you can do with it.",
      fa: "نوعِ یه مقدار — int، float، str، bool و… همین تعیین می‌کنه باهاش چی کار می‌تونی بکنی.",
    },
    example: { lang: "python", code: `age = 12        # int\nname = "Sara"   # str` },
    related: [{ en: "Strings with Superpowers", fa: "رشته‌های ابرقهرمان" }],
  },
  {
    id: "gt-operator",
    term: "Operator",
    termFa: "عملگر",
    meaning: {
      en: "A symbol that combines values: + − * / // % and comparisons like ==.",
      fa: "نمادی که مقدارها رو ترکیب می‌کنه: + − * / // % و مقایسه‌هایی مثل ==.",
    },
    example: { lang: "python", code: `print(7 // 2)  # 3\nprint(7 % 2)   # 1` },
  },
  {
    id: "gt-condition",
    term: "Condition",
    termFa: "شرط",
    meaning: {
      en: "A yes/no question the program asks (it answers True or False) to choose a path.",
      fa: "یه سؤال بله/خیر که برنامه می‌پرسه (جوابش True یا False می‌شه) تا مسیر رو انتخاب کنه.",
    },
    example: { lang: "python", code: `if temp > 30:\n    print("Hot")` },
    related: [{ en: "if / elif / else", fa: "اگر / وگرنه اگر / وگرنه" }],
  },
  {
    id: "gt-loop",
    term: "Loop",
    termFa: "حلقه",
    meaning: {
      en: "A way to repeat lines — for walks through a collection, while repeats until its condition fails.",
      fa: "راهی برای تکرار خط‌ها — for روی یه مجموعه راه می‌ره و while تکرار می‌کنه تا شرطش باطل بشه.",
    },
    example: { lang: "python", code: `for i in range(3):\n    print(i)` },
    related: [{ en: "for Loops & range()", fa: "حلقهٔ for و range" }],
  },
  {
    id: "gt-function",
    term: "Function",
    termFa: "تابع",
    meaning: {
      en: "A named block of code you can run whenever you want — your own reusable verb.",
      fa: "یه بلوک کد با اسم که هر وقت بخوای می‌تونی اجراش کنی — فعلِ قابل‌استفادهٔ خودت.",
    },
    example: { lang: "python", code: `def greet(name):\n    print(f"Hi {name}")` },
    related: [{ en: "Functions: Your Own Verbs", fa: "توابع: فعل‌های خودت" }],
  },
  {
    id: "gt-parameter",
    term: "Parameter",
    termFa: "پارامتر",
    meaning: {
      en: "A placeholder a function receives. The real value you pass in is called an argument.",
      fa: "جای‌نگهداری‌ای که تابع تحویل می‌گیره. مقدار واقعی که می‌فرستی «آرگومان» نام داره.",
    },
    example: { lang: "python", code: `def double(x):   # x = parameter\n    return x * 2` },
  },
  {
    id: "gt-return",
    term: "Return value",
    termFa: "مقدار بازگشتی",
    meaning: {
      en: "The answer a function hands back to whoever called it.",
      fa: "جوابی که تابع به کسی که صداش زده برمی‌گردونه.",
    },
    example: { lang: "python", code: `def double(x):\n    return x * 2\n\nprint(double(4))  # 8` },
    related: [{ en: "return: Machines That Answer", fa: "return: ماشینی که جواب می‌ده" }],
  },
  {
    id: "gt-list",
    term: "List",
    termFa: "لیست",
    meaning: {
      en: "An ordered team of values in one box — you can add, remove and walk through it.",
      fa: "یه تیم مرتب از مقدارها توی یه جعبه — می‌تونی بهش اضافه کنی، ازش کم کنی و روش حلقه بزنی.",
    },
    example: { lang: "python", code: `pets = ["cat", "dog"]\npets.append("fish")` },
    related: [{ en: "Lists: The Value Team", fa: "لیست: تیم مقدارها" }],
  },
  {
    id: "gt-dictionary",
    term: "Dictionary",
    termFa: "دیکشنری",
    meaning: {
      en: "A set of key → value pairs, like a real dictionary: look up a word (key), get its meaning (value).",
      fa: "مجموعه‌ای از جفت‌های کلید ← مقدار، مثل دیکشنری واقعی: واژه (کلید) رو نگاه کن، معنی (مقدار) رو بگیر.",
    },
    example: { lang: "python", code: `ages = {"Sara": 14}\nprint(ages["Sara"])` },
    related: [{ en: "Dictionaries: Labeled Data", fa: "دیکشنری: دادهٔ برچسب‌دار" }],
  },
  {
    id: "gt-string",
    term: "String",
    termFa: "رشته",
    meaning: {
      en: "Text between quotes — a chain of characters you can slice, join and shout (upper).",
      fa: "متنی که بین گیومه‌ست — زنجیره‌ای از حرف‌ها که می‌تونی بریش کنی، به‌هم بچسبونی و داد بکشی (upper).",
    },
    example: { lang: "python", code: `name = "Sara"\nprint(name.upper())` },
  },
  {
    id: "gt-boolean",
    term: "Boolean",
    termFa: "بولی",
    meaning: {
      en: "The two-value type: True or False. The fuel of every condition.",
      fa: "نوعی که فقط دو مقدار داره: True یا False. سوختِ همهٔ شرط‌ها.",
    },
    example: { lang: "python", code: `is_raining = False\nprint(is_raining)` },
  },
  {
    id: "gt-index",
    term: "Index",
    termFa: "اندیس",
    meaning: {
      en: "A position inside a list or string — it starts at 0, and −1 means the last item.",
      fa: "یه جایگاه توی لیست یا رشته — از صفر شروع می‌شه و ‎-۱ یعنی آخرین آیتم.",
    },
    example: { lang: "python", code: `word = "code"\nprint(word[0])   # c\nprint(word[-1])  # e` },
  },
  {
    id: "gt-bug",
    term: "Bug",
    termFa: "باگ",
    meaning: {
      en: "A mistake in code that makes it behave differently from what you intended.",
      fa: "یه اشتباه توی کد که باعث می‌شه رفتارش با چیزی که تو ذهنت بود فرق کنه.",
    },
    example: { lang: "python", code: `# bug: prints 3 items instead of 2\nfor i in range(3):\n    print("hi")` },
  },
  {
    id: "gt-debugging",
    term: "Debugging",
    termFa: "اشکال‌زدایی",
    meaning: {
      en: "Detective work: reproduce the bug, form a hypothesis, test it, fix the cause — not the symptom.",
      fa: "کارِ کارآگاهی: باگ رو بازسازی کن، حدس بزن، امتحان کن و علت رو درست کن — نه علامتش رو.",
    },
    example: { lang: "python", code: `print(f"DEBUG total={total}")  # trace it` },
  },
  {
    id: "gt-algorithm",
    term: "Algorithm",
    termFa: "الگوریتم",
    meaning: {
      en: "A step-by-step recipe for solving a problem — written before any code.",
      fa: "دستور پختِ قدم‌به‌قدم برای حل یه مسئله — قبل از هر خط کد.",
    },
    example: { lang: "python", code: `# 1. read input  2. double it  3. print` },
  },
  {
    id: "gt-pseudocode",
    term: "Pseudocode",
    termFa: "شبه‌کد",
    meaning: {
      en: "Plain-language fake code that sketches the plan — no exact syntax, just the logic.",
      fa: "کدِ قلابی به زبون آدمیزاد که نقشه رو طرح می‌کنه — نه سینتکس دقیق، فقط منطق.",
    },
    example: { lang: "python", code: `# if user is logged in → show feed\n# else → show login` },
  },
  {
    id: "gt-compiler",
    term: "Compiler",
    termFa: "کامپایلر",
    meaning: {
      en: "A translator that turns ALL your source code into machine instructions first, then the program runs.",
      fa: "مترجمی که اول کل کدت رو به دستورهای ماشینی تبدیل می‌کنه، بعد برنامه اجرا می‌شه.",
    },
    example: { lang: "python", code: `# C: compile once → run many times` },
  },
  {
    id: "gt-interpreter",
    term: "Interpreter",
    termFa: "مفسر",
    meaning: {
      en: "A translator that runs your code line by line, top to bottom — that's exactly what pylite does for you here.",
      fa: "مترجمی که کدت رو خط‌به‌خط و از بالا به پایین اجرا می‌کنه — دقیقاً کاری که pylite همین‌جا برای تو می‌کنه.",
    },
    example: { lang: "python", code: `# Python: each line runs as you reach it` },
  },
  {
    id: "gt-api",
    term: "API",
    termFa: "API",
    meaning: {
      en: "A menu of requests one program offers to another — ask politely, get structured data back.",
      fa: "منوی درخواست‌هایی که یه برنامه به برنامهٔ دیگه می‌ده — مودبانه بپرس، دادهٔ ساخت‌یافته بگیر.",
    },
    example: { lang: "python", code: `# GET /api/users → list of users (JSON)` },
  },
  {
    id: "gt-http",
    term: "HTTP",
    termFa: "HTTP",
    meaning: {
      en: "The web's request/response language: the browser asks (GET, POST…), the server answers with a status code.",
      fa: "زبونِ درخواست/جوابِ وب: مرورگر می‌پرسه (GET، POST و…)، سرور با یه کد وضعیت جواب می‌ده.",
    },
    example: { lang: "python", code: `# GET /page  →  200 OK\n# GET /nope  →  404 Not Found` },
  },
  {
    id: "gt-server",
    term: "Server",
    termFa: "سرور",
    meaning: {
      en: "A computer (or program) that waits for requests and sends back answers — the always-awake half of the web.",
      fa: "یه کامپیوتر (یا برنامه) که منتظر درخواست می‌مونه و جواب می‌فرسته — نیمهٔ همیشه‌بیدارِ وب.",
    },
    example: { lang: "python", code: `# server: listens on port → responds` },
  },
  {
    id: "gt-client",
    term: "Client",
    termFa: "کلاینت",
    meaning: {
      en: "The side that asks — your browser is a client: it requests pages and renders the answers.",
      fa: "سمتی که درخواست می‌ده — مرورگرت یه کلاینته: صفحه می‌خواد و جواب‌ها رو رندر می‌کنه.",
    },
    example: { lang: "python", code: `# client: fetch page → render it` },
  },
  {
    id: "gt-database",
    term: "Database",
    termFa: "پایگاه داده",
    meaning: {
      en: "A program built to store data safely, search it fast, and keep it consistent.",
      fa: "برنامه‌ای که برای ذخیرهٔ امن داده، جست‌وجوی سریع و حفظ سازگاریش ساخته شده.",
    },
    example: { lang: "python", code: `# SELECT * FROM users;` },
  },
  {
    id: "gt-html-tag",
    term: "HTML tag",
    termFa: "تگ HTML",
    meaning: {
      en: "A labeled bracket that marks what content IS: <h1>heading</h1>. Open it, fill it, close it.",
      fa: "براکتِ برچسب‌دار که مشخص می‌کنه محتوا «چیه»: <h1>تیتر</h1>. باز کن، پر کن، ببند.",
    },
    example: { lang: "html", code: `<p>Hello, world!</p>` },
    related: [{ en: "Hello, HTML", fa: "سلام، HTML" }],
  },
  {
    id: "gt-css-selector",
    term: "CSS selector",
    termFa: "سلکتور CSS",
    meaning: {
      en: "The “who?” part of a CSS rule — p, .card, #hero decide which elements get painted.",
      fa: "بخشِ «کی؟» توی قانون CSS — p و .card و #hero تصمیم می‌گیرن کدوم عنصرها رنگ بگیرن.",
    },
    example: { lang: "html", code: `<style>.card { color: teal; }</style>` },
    related: [{ en: "Classes & ids: name it, style it", fa: "کلاس و آیدی: نام بگذار، استایل بده" }],
  },
  {
    id: "gt-component",
    term: "Component",
    termFa: "کامپوننت",
    meaning: {
      en: "A self-contained piece of UI (a card, a button) you build once and reuse everywhere.",
      fa: "یه تکهٔ خودکفای رابط کاربری (مثل کارت یا دکمه) که یه بار می‌سازی و همه‌جا استفاده می‌کنی.",
    },
    example: { lang: "html", code: `<!-- <UserCard> used 12 times -->` },
  },
  {
    id: "gt-commit",
    term: "Commit",
    termFa: "کامیت",
    meaning: {
      en: "A saved snapshot of your project with a message — a checkpoint you can always return to.",
      fa: "یه عکس فوری از پروژه‌ت با یه پیام — نقطه‌ای که همیشه می‌تونی بهش برگردی.",
    },
    example: { lang: "python", code: `# git commit -m "add login page"` },
  },
  {
    id: "gt-branch",
    term: "Branch",
    termFa: "برنچ",
    meaning: {
      en: "A parallel line of work that copies the project so you can experiment safely, then merge back.",
      fa: "یه خطِ موازی از کار که از پروژه کپی می‌گیره تا امن آزمایش کنی، بعد دوباره بهش وصلش می‌کنی.",
    },
    example: { lang: "python", code: `# git switch -c dark-mode` },
  },
];
