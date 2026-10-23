// TEKA Academy — "HTML & CSS: Zero to First Website" (html-basics).
// Pure content data: 8 modules × 4 lessons. Every code/starter/solution string
// is a COMPLETE standalone page that runs inside the sandboxed lesson iframe:
// no external resources, no <script> tags (inline onclick only), emoji/CSS
// visuals only. Bilingual en + fa. Challenge solutions pass every check,
// starters fail at least one.

import type { Course } from "./types";
import { htmlModulesC } from "./html-modules-c";

export const htmlCourse: Course = {
  id: "html-basics",
  language: "html",
  accent: "cyan",
  emoji: "⚡",
  title: {
    en: "HTML & CSS: Zero to First Website",
    fa: "HTML و CSS: از صفر تا اولین وب‌سایت",
  },
  tagline: {
    en: "From your very first tag to a complete product landing page — 73 hands-on lessons, everything runs in your browser.",
    fa: "از اولین تگ تا یک لندینگ‌پیجِ کامل — ۷۳ درسِ پروژه‌محور؛ همه‌چیز داخل مرورگر خودت اجرا می‌شود.",
  },
  modules: [
    // ─── Module 1 ────────────────────────────────────────────
    {
      id: "html-m1",
      title: { en: "Your First Page", fa: "اولین صفحه‌ات" },
      blurb: {
        en: "Tags, text, lists, links and images — from an empty file to a real page in the browser.",
        fa: "تگ‌ها، متن، لیست، لینک و تصویر — از یک فایل خالی تا یک صفحه‌ی واقعی توی مرورگر.",
      },
      lessons: [
        {
          id: "html-m1-l1",
          title: { en: "Hello, HTML", fa: "سلام، HTML" },
          goal: {
            en: "Write and understand your first complete HTML page.",
            fa: "اولین صفحه‌ی کامل HTML خودت را بنویسی و تک‌تک خط‌هایش را بفهمی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "The skeleton of every website", fa: "اسکلتی که همه‌ی سایت‌ها دارند" },
              blocks: [
                {
                  type: "text",
                  en: "Every website you have ever visited — from giant social networks to this very app — is built from one ingredient: HTML. HTML is not a programming language; it is a markup language. You take normal text and wrap pieces of it in tags, and each tag tells the browser what that piece IS: a heading, a paragraph, a link.",
                  fa: "هر سایتی که تا امروز دیدی — از شبکه‌های اجتماعی غول‌پیکر تا همین اپ — از یک ماده‌ی اولیه ساخته شده: HTML. اچ‌تی‌ام‌ال زبان برنامه‌نویسی نیست؛ زبانِ نشانه‌گذاری (Markup) است. یعنی متن معمولی برمی‌داری و تکه‌تکه‌اش را داخل تگ (Tag) می‌پیچی؛ هر تگ به مرورگر می‌گوید این تکه چیست: یک تیتر، یک پاراگراف، یک لینک.",
                },
                {
                  type: "text",
                  en: "The browser (Chrome, Firefox, Safari...) reads your file from top to bottom, tag by tag, and paints the page. You write the instructions; the browser does the drawing.",
                  fa: "مرورگر (Browser) فایل تو را از بالا به پایین، تگ‌به‌تگ می‌خواند و صفحه را نقاشی می‌کند. تو فقط دستور می‌نویسی؛ کشیدنِ نقاش با مرورگر است.",
                },
                {
                  type: "tip",
                  en: "Tag names are always written lowercase: `h1`, `p`, `body`. Uppercase works too, but lowercase is the professional habit — start it today.",
                  fa: "نام تگ‌ها را همیشه با حروف کوچک انگلیسی بنویس: `h1`، `p`، `body`. با حروف بزرگ هم کار می‌کند، ولی کوچک‌نویسی عادتِ حرفه‌ای‌هاست — از همین امروز.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Your first page, line by line", fa: "اولین صفحه، خط به خط" },
              blocks: [
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, world! 🌍</h1>
    <p>My name is Aria and this is the very first page I have ever built.</p>
  </body>
</html>`,
                  caption: {
                    en: "Your very first page — press Run and see it live!",
                    fa: "اولین صفحه‌ات — دکمه‌ی Run را بزن و زنده ببینش!",
                  },
                },
                {
                  type: "text",
                  en: "`<!DOCTYPE html>` is a one-line announcement: modern HTML lives here. Then `<html>` hugs the whole page. Inside it are two rooms: `<head>` — information for the browser, invisible — and `<body>` — everything humans see.",
                  fa: "`<!DOCTYPE html>` یک اعلامیه‌ی یک‌خطی است: اینجا HTML مدرن داریم. بعد `<html>` کل صفحه را در آغوش می‌گیرد. داخلش دو اتاق داریم: `<head>` اتاقِ مرورگر است (اطلاعاتی که دیده نمی‌شوند) و `<body>` اتاقِ آدم‌ها (هرچه واقعاً می‌بینی).",
                },
                {
                  type: "text",
                  en: "`<meta charset='UTF-8'>` tells the browser to support every language's letters — English, Persian, emoji. It is always the first line of the head. `<title>` becomes the name shown on the browser tab.",
                  fa: "`meta charset` با مقدار 'UTF-8' به مرورگر می‌گوید حروف همه‌ی زبان‌ها را پشتیبانی کن — انگلیسی، فارسی، ایموجی. این خط همیشه اولین خطِ head است. `<title>` هم می‌شود همان نوشته‌ای که روی تبِ مرورگر می‌بینی.",
                },
                {
                  type: "text",
                  en: "Inside the body: `<h1>` is the page's big headline and `<p>` is a paragraph. Notice the rhythm — almost every tag opens and closes as a pair: `<p>...</p>`, with a slash before the closing name.",
                  fa: "داخلِ body: `<h1>` تیترِ بزرگ صفحه است و `<p>` یک پاراگراف. به ریتم کد دقت کن — تقریباً هر تگ با جفتش باز و بسته می‌شود: `<p>...</p>`؛ قبل از نامِ تگِ پایانی یک اسلش می‌آید.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Close what you open", fa: "هر چه باز می‌کنی، ببند" },
              blocks: [
                {
                  type: "warn",
                  en: "Bug #1 of every beginner: a tag opened but never closed. The browser then guesses where the piece ends — and guesses wrong. Build the reflex now: open `<p>`, immediately type `</p>`, THEN write the content in between.",
                  fa: "باگ شماره‌ی یکِ همه‌ی تازه‌کارها: تگی که باز شده ولی بسته نشده. بعدش مرورگر حدس می‌زند تکه کجا تمام می‌شود — و همیشه اشتباه حدس می‌زند. همین حالا رفلکسش را بساز: `<p>` را که باز کردی، همان لحظه `</p>` را بنویس، بعد محتوا را وسطش بگذار.",
                },
                {
                  type: "tip",
                  en: "Indentation (two spaces for every nested level) means nothing to the browser — and everything to humans. Write code your future self can read.",
                  fa: "تا شدنِ کد (دو فاصله برای هر سطحِ تودرتو) برای مرورگر هیچ است و برای آدم‌ها همه‌چیز. کدی بنویس که «خودِ آینده‌ات» از خواندنش لذت ببرد.",
                },
                {
                  type: "text",
                  en: "One more tool: comments. `<!-- like this -->` is a note for humans that the browser completely ignores. Use them as sticky notes inside your code.",
                  fa: "یک ابزار دیگر: کامنت. `<!-- مثل این -->` یادداشتی برای آدم‌هاست و مرورگر کاملاً نادیده‌اش می‌گیرد. ازش به عنوان یادداشتِ چسبان داخل کدت استفاده کن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What is HTML, really?", fa: "HTML واقعاً چیست؟" },
                  options: [
                    {
                      en: "A programming language with loops and conditions",
                      fa: "یک زبان برنامه‌نویسی با حلقه و شرط",
                    },
                    {
                      en: "A markup language: tags wrap text and tell the browser what each piece is",
                      fa: "یک زبان نشانه‌گذاری: تگ‌ها متن را می‌پیچند و به مرورگر می‌گویند هر تکه چیست",
                    },
                    {
                      en: "A tool for drawing images",
                      fa: "ابزاری برای کشیدن تصویر",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "No loops, no variables — HTML only labels content. Styling is CSS's job (Module 3) and behavior is JavaScript's.",
                    fa: "نه حلقه دارد نه متغیر — HTML فقط برچسب می‌زند. زیباسازی کارِ CSS است (ماژول ۳) و رفتارِ صفحه کارِ جاوااسکریپت.",
                  },
                },
                {
                  q: {
                    en: "Where does the visible content — the text people actually see — go?",
                    fa: "محتوای قابل‌دیدن — متنی که آدم‌ها واقعاً می‌بینند — کجا می‌رود؟",
                  },
                  options: [
                    { en: "Inside `<head>`", fa: "داخلِ `<head>`" },
                    { en: "Inside `<body>`", fa: "داخلِ `<body>`" },
                    { en: "Inside `<title>`", fa: "داخلِ `<title>`" },
                  ],
                  answer: 1,
                  explain: {
                    en: "The head holds browser-only info (title, charset). People see the body.",
                    fa: "head اطلاعاتِ مخصوصِ مرورگر است (عنوان، charset). چیزی که آدم‌ها می‌بینند داخل body است.",
                  },
                },
                {
                  q: {
                    en: "Why put `<meta charset='UTF-8'>` on every page?",
                    fa: "چرا `<meta charset='UTF-8'>` را در هر صفحه می‌گذاریم؟",
                  },
                  options: [
                    { en: "It makes the page load faster", fa: "باعث می‌شود صفحه سریع‌تر بالا بیاید" },
                    {
                      en: "It lets the page display any language's letters and emoji",
                      fa: "باعث می‌شود صفحه حروفِ همه‌ی زبان‌ها و ایموجی را نشان بدهد",
                    },
                    { en: "It is the page's title", fa: "همان عنوان صفحه است" },
                  ],
                  answer: 1,
                  explain: {
                    en: "UTF-8 covers every alphabet — without it, Persian text and emoji can turn into random symbols.",
                    fa: "UTF-8 همه‌ی حروف جهان را پوشش می‌دهد — بدون آن ممکن است متن فارسی و ایموجی به علامت‌های عجیب و غریب تبدیل شوند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Hello, page!", fa: "سلام، صفحه!" },
              brief: {
                en: "Build your first real page: keep `<meta charset='UTF-8'>` in the head, add a `<title>` you like, one `<h1>` whose text is exactly: My First Page — and one `<p>` introducing you in a single sentence (any words).",
                fa: "اولین صفحه‌ی واقعی‌ات را بساز: `<meta charset='UTF-8'>` را در head نگه دار، یک `<title>` به دلخواه بگذار، یک `<h1>` که متنش دقیقاً این باشد: My First Page — و یک `<p>` که خودت را در یک جمله معرفی کنی (متنش با تو).",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>?</title>
  </head>
  <body>
    <!-- 1) an h1 that says exactly: My First Page -->
    <!-- 2) a p that introduces you in one sentence -->
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
  </head>
  <body>
    <h1>My First Page</h1>
    <p>Hi! I am Sara, I love astronomy, and this is the first page I have ever built.</p>
  </body>
</html>`,
              hints: [
                {
                  en: "Only two tags go inside `<body>`: the `h1` and the `p`.",
                  fa: "داخلِ `<body>` فقط دو تگ لازم داری: `h1` و `p`.",
                },
                {
                  en: "Write the h1 first, exactly: <h1>My First Page</h1> — capital letters and spaces matter.",
                  fa: "اول h1 را دقیقاً این‌طور بنویس: <h1>My First Page</h1> — حروف بزرگ و فاصله‌ها مهم‌اند.",
                },
                {
                  en: "Then one paragraph below it: <p>I am ... and I love ...</p>. Close both tags!",
                  fa: "بعدش یک پاراگراف زیرش: <p>من ... هستم و ... عاشقم</p>. هر دو تگ را ببند!",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "h1", text: "My First Page" },
                  { selector: "p", count: 1 },
                  { selector: "meta", attrName: "charset", attrValue: "UTF-8" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m1-l2",
          title: { en: "Text that means something", fa: "متنی که معنا دارد" },
          goal: {
            en: "Structure any text with the right headings, emphasis and breaks.",
            fa: "هر متنی را با تیترِ درست، تأکیدِ درست و شکستِ درست ساختار بدهی.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              title: { en: "The heading ladder", fa: "نردبان تیترها" },
              blocks: [
                {
                  type: "text",
                  en: "HTML gives you six heading tags, `h1` to `h6`: `h1` is the loudest, `h6` the quietest. But headings are not about size — they are about importance. `h1` = the page's one main title. `h2` = section titles. `h3` = titles inside a section.",
                  fa: "HTML شش تگ تیتر دارد، از `h1` تا `h6`: `h1` بلندترین است، `h6` آرام‌ترین. ولی موضوع، اندازه نیست؛ اهمیت است. `h1` تیترِ اصلیِ صفحه (فقط یکی). `h2` عنوانِ بخش‌ها. `h3` عنوان‌های داخلِ یک بخش.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Code Journal</title>
  </head>
  <body>
    <h1>My Code Journal 📓</h1>
    <h2>Week 1: meeting HTML</h2>
    <p>Today I wrote my first page. The browser actually listened to me!</p>
    <h2>Week 2: going deeper</h2>
    <h3>The day everything broke</h3>
    <p>I forgot one closing tag. Never again.</p>
    <h3>The fix</h3>
    <p>Close what you open. Every time.</p>
  </body>
</html>`,
                  caption: {
                    en: "A real page outline: h1 first, h2 sections, h3 inside them",
                    fa: "طرحِ یک صفحه‌ی واقعی: اول h1، بعد بخش‌های h2، بعد h3 داخلشان",
                  },
                },
                {
                  type: "warn",
                  en: "Two rules pros never break: pick headings by MEANING, never by size (CSS fixes size in Module 3) — and never skip levels, like jumping from `h1` straight to `h4`. Screen readers and Google climb your ladder; a broken ladder loses them.",
                  fa: "دو قانونی که حرفه‌ای‌ها هرگز نمی‌شکنند: تیتر را از روی معنا انتخاب کن، نه اندازه (اندازه را در ماژول ۳ با CSS درست می‌کنیم) — و هیچ‌وقت از پله‌ها نپر؛ مثلاً از `h1` یکو `h4` پریدن ممنوع. صفحه‌خوان‌ها و گوگل از نردبان تو بالا می‌روند؛ نردبانِ شکسته آن‌ها را گم می‌کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Bold, italic and honest breaks", fa: "پررنگ، ایتالیک و شکستِ صادقانه" },
              blocks: [
                {
                  type: "text",
                  en: "`strong` marks strongly important text (it renders bold). `em` marks emphasis (it renders italic). They carry MEANING — that is why we prefer them over their look-only cousins `b` and `i`.",
                  fa: "`strong` یعنی این متن به‌شدت مهم است (پررنگ دیده می‌شود). `em` یعنی تأکید (ایتالیک دیده می‌شود). این دو معنا حمل می‌کنند — برای همین به پسرعموهایِ فقط‌ظاهری‌شان، یعنی `b` و `i`، ترجیحشان می‌دهیم.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Movie Review</title>
  </head>
  <body>
    <h1>Review: The Robot's Garden 🤖</h1>
    <p>
      <strong>Verdict: watch it tonight.</strong><br>
      The story is <em>surprisingly</em> warm for a film about machines.
    </p>
    <hr>
    <p>
      Best line of the film:<br>
      <em>"Growing is just debugging yourself."</em>
    </p>
  </body>
</html>`,
                  caption: {
                    en: "strong, em, br and hr — all four in one tiny review",
                    fa: "strong و em و br و hr — هر چهار تا در یک نقدِ کوچک",
                  },
                },
                {
                  type: "text",
                  en: "Meet the two rebels with no closing pair: `br` pushes text to the next line, `hr` draws a quiet divider line between topics. They are called void tags — self-sufficient, no `</...>` needed.",
                  fa: "با دو یاغیِ بی‌جفت آشنا شو: `br` متن را به خط بعد می‌برد، `hr` یک خطِ آرامِ جداکننده بین دو موضوع می‌کشد. به این‌ها تگِ خالی (Void) می‌گویند — خودکفا هستند و `</...>` نمی‌خواهند.",
                },
                {
                  type: "warn",
                  en: "Do NOT stack `br` tags to fake spacing between blocks — spacing is CSS's job (Module 3). `br` is for honest line breaks: poems, addresses, song lyrics.",
                  fa: "برای ساختنِ فاصله‌ی قلابی بین بخش‌ها، کوه `br` نچین — فاصله انداختن کارِ CSS است (ماژول ۳). جای درستِ `br` شکستنِ واقعی خط است: شعر، آدرس، متنِ ترانه.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Outline first, fill second", fa: "اول طرح، بعد پر کردن" },
              blocks: [
                {
                  type: "tip",
                  en: "Write your headings FIRST — an empty ladder of h1, h2, h3 — and only then fill paragraphs under them. A professional structure in sixty seconds.",
                  fa: "اول تیترها را بنویس — یک نردبانِ خالی از h1 و h2 و h3 — بعد پاراگراف‌ها را زیرشان پر کن. ساختارِ حرفه‌ای، در شصت ثانیه.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Friday Flyer</title>
  </head>
  <body>
    <h1>Friday Film Night 🍿</h1>
    <h2>Where and when</h2>
    <p>This Friday, 8 PM, at my place.</p>
    <hr>
    <h2>Bring with you</h2>
    <p>One snack, one pillow, <strong>zero</strong> excuses.</p>
    <p><em>Pajamas are strongly encouraged.</em></p>
  </body>
</html>`,
                  caption: {
                    en: "A Friday flyer — outline first, then words",
                    fa: "تراکتِ جمعه‌شب — اول طرح، بعد کلمه‌ها",
                  },
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "The visible main title of your page should be…",
                    fa: "تیترِ اصلیِ قابل‌دیدن صفحه باید … باشد.",
                  },
                  options: [
                    { en: "`h1`", fa: "`h1`" },
                    { en: "`h6`", fa: "`h6`" },
                    { en: "`title`", fa: "`title`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`title` names the browser tab (invisible on the page itself); `h1` is the big visible heading.",
                    fa: "`title` اسم تبِ مرورگر است (روی خودِ صفحه دیده نمی‌شود)؛ `h1` تیترِ بزرگِ قابل‌دیدن است.",
                  },
                },
                {
                  q: {
                    en: "Which tag says: this word is extra important?",
                    fa: "کدام تگ می‌گوید: این کلمه خیلی مهم است؟",
                  },
                  options: [
                    { en: "`strong`", fa: "`strong`" },
                    { en: "`i`", fa: "`i`" },
                    { en: "`hr`", fa: "`hr`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`i` only changes the look; `strong` means importance — and looks can be restyled later with CSS.",
                    fa: "`i` فقط ظاهر را عوض می‌کند؛ `strong` یعنی اهمیت — و ظاهر را بعداً با CSS می‌شود عوض کرد.",
                  },
                },
                {
                  q: { en: "Which one needs NO closing tag?", fa: "کدام‌یک تگِ پایانی نمی‌خواهد؟" },
                  options: [
                    { en: "`strong`", fa: "`strong`" },
                    { en: "`hr`", fa: "`hr`" },
                    { en: "`em`", fa: "`em`" },
                  ],
                  answer: 1,
                  explain: {
                    en: "`hr` and `br` are void tags — they wrap nothing, so they close nothing.",
                    fa: "`hr` و `br` تگِ خالی‌اند — چیزی را نمی‌پیچند، پس چیزی هم نمی‌بندند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Friday night flyer", fa: "تراکتِ جمعه‌شب" },
              brief: {
                en: "Build a flyer for your own movie night: an `<h1>` whose text is exactly Movie Night, one `<h2>` (any section title), one `<strong>`, one `<em>`, and one `<hr>` between the parts.",
                fa: "برای شبِ فیلمِ خودت تراکت بساز: یک `<h1>` که متنش دقیقاً Movie Night باشد، یک `<h2>` (هر عنوانی)، یک `<strong>`، یک `<em>` و یک `<hr>` بین بخش‌ها.",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Movie Night</title>
  </head>
  <body>
    <h1>Big Event</h1>
    <p>All the details will live here.</p>
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Movie Night</title>
  </head>
  <body>
    <h1>Movie Night 🍿</h1>
    <p>This Friday, 8 PM, at my place.</p>
    <hr>
    <h2>Bring with you</h2>
    <p>One snack, one pillow and <strong>zero</strong> excuses.</p>
    <p><em>Pajamas are strongly encouraged.</em></p>
  </body>
</html>`,
              hints: [
                {
                  en: "Start with <h1>Movie Night</h1> — the checker looks for those exact words.",
                  fa: "با <h1>Movie Night</h1> شروع کن — بررسی‌کننده دقیقاً همین کلمه‌ها را می‌گردد.",
                },
                {
                  en: "Then an <hr>, then an <h2> with any title, then your paragraphs.",
                  fa: "بعد <hr>، بعد یک <h2> با هر عنوانی، بعد پاراگراف‌هایت.",
                },
                {
                  en: "Wrap one word in <strong>...</strong> and one word in <em>...</em>.",
                  fa: "یک کلمه را داخل <strong>...</strong> و یکی را داخل <em>...</em> بپیچان.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "h1", text: "Movie Night" },
                  { selector: "h2", count: 1 },
                  { selector: "strong", count: 1 },
                  { selector: "em", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m1-l3",
          title: { en: "Lists: the tidy superpower", fa: "لیست‌ها؛ ابرقدرتِ مرتب‌بودن" },
          goal: {
            en: "Build bullet lists, numbered lists and lists inside lists.",
            fa: "لیستِ گلوله‌ای، لیستِ شماره‌دار و لیستِ داخلِ لیست بسازی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Two kinds of lists", fa: "دو نوع لیست" },
              blocks: [
                {
                  type: "text",
                  en: "`ul` = unordered list: bullets, for things where order does not matter (shopping, hobbies). `ol` = ordered list: numbers, for sequences (recipe steps, rankings). Every single item — in both — is an `li`.",
                  fa: "`ul` لیست نامرتب است: گلوله‌ای، برای چیزهایی که ترتیبشان مهم نیست (خرید، سرگرمی‌ها). `ol` لیست مرتب است: شماره‌دار، برای دنباله‌ها (مراحل دستور پخت، رتبه‌بندی). و هر آیتم — در هر دو — یک `li` است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Pancake Saturday</title>
  </head>
  <body>
    <h1>Pancake Saturday 🥞</h1>
    <h2>Shopping list (any order)</h2>
    <ul>
      <li>Flour</li>
      <li>Milk</li>
      <li>Maple syrup</li>
    </ul>
    <h2>Steps (this order!)</h2>
    <ol>
      <li>Mix flour, eggs and milk.</li>
      <li>Heat the pan.</li>
      <li>Pour, flip, hope for the best.</li>
      <li>Cover with syrup.</li>
    </ol>
  </body>
</html>`,
                  caption: {
                    en: "Two lists, one page — feel the difference",
                    fa: "دو لیست، یک صفحه — تفاوت را حس کن",
                  },
                },
                {
                  type: "tip",
                  en: "The browser numbers `ol` items automatically — never type the numbers yourself. Insert a new item and everything renumbers like magic.",
                  fa: "مرورگر آیتم‌های `ol` را خودش شماره می‌زند — هرگز شماره‌ها را با دست ننویس. یک آیتم جدید اضافه کن، همه‌چیز مثل جادو دوباره شماره می‌خورد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Lists inside lists (nesting)", fa: "لیست داخلِ لیست (تودرتو)" },
              blocks: [
                {
                  type: "text",
                  en: "An `li` can hold a whole other list — a nested list. The inner list lives INSIDE the parent `li`, before its closing tag, indented one more level. This is how outlines, menus and multi-level plans are built.",
                  fa: "یک `li` می‌تواند یک لیستِ کاملِ دیگر را در خودش جا بدهد — لیستِ تودرتو. لیستِ داخلی داخلِ `li` مادر می‌نشیند، قبل از تگِ پایانی‌اش، با یک سطح تورفتگی بیشتر. طرح‌های چندسطحی و منوها همین‌طور ساخته می‌شوند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Trip Plan</title>
  </head>
  <body>
    <h1>Summer Trip Plan 🧳</h1>
    <ol>
      <li>Beach day
        <ul>
          <li>Sunscreen</li>
          <li>Badminton set</li>
        </ul>
      </li>
      <li>Mountain day
        <ul>
          <li>Hiking shoes</li>
          <li>Camera</li>
        </ul>
      </li>
      <li>Rest day (no list needed 😌)</li>
    </ol>
  </body>
</html>`,
                  caption: {
                    en: "A nested list: each day owns its own little list",
                    fa: "لیستِ تودرتو: هر روز، لیستِ کوچکِ خودش را دارد",
                  },
                },
                {
                  type: "warn",
                  en: "`li` lives ONLY inside `ul` or `ol`. A `ul` dropped directly inside another `ul` (without its own `li`) is invalid HTML — always wrap the inner list in the parent `li`.",
                  fa: "`li` فقط داخل `ul` یا `ol` زندگی می‌کند. یک `ul` که مستقیم داخل `ul` دیگر گذاشته شود (بدون `li` مخصوص خودش) HTML نامعتبر است — همیشه لیستِ داخلی را داخل `li` مادر بپیچان.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Where lists show up", fa: "لیست‌ها کجا پیدایشان می‌شود" },
              blocks: [
                {
                  type: "text",
                  en: "Lists are everywhere in real sites: feature lists, comment threads, song playlists — and yes, the navigation menu at the top of almost every website is secretly a list. You will meet that menu in Module 2.",
                  fa: "لیست‌ها همه‌جای سایت‌های واقعی هستند: لیست امکانات، رشته‌ی کامنت‌ها، پلی‌لیست‌ها — و بله، منوی بالای تقریباً هر سایتی، در خفا یک لیست است. با آن منو در ماژول ۲ روبه‌رو می‌شوی.",
                },
                {
                  type: "tip",
                  en: "Nesting rule of thumb: the inner list belongs to ONE item. If it could belong to two, your structure is confused — split or rephrase.",
                  fa: "قانون سرانگشتیِ تودرتویی: لیستِ داخلی متعلق به یک آیتم است. اگر می‌شد متعلق به دو آیتم باشد، یعنی ساختارت گیج است — بشکن یا بازنویسی کن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "A shopping list — does the order of items matter?",
                    fa: "لیست خرید — ترتیبِ آیتم‌ها مهم است؟",
                  },
                  options: [
                    { en: "No — so use `ul`", fa: "نه — پس از `ul` استفاده کن" },
                    { en: "Yes — so use `ol`", fa: "بله — پس از `ol` استفاده کن" },
                    { en: "Lists are only for numbers", fa: "لیست‌ها فقط برای اعداد هستند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "No order = unordered = `ul`. Flour before milk or milk before flour, the pancakes happen anyway.",
                    fa: "بدون ترتیب = نامرتب = `ul`. آرد قبل از شیر یا شیر قبل از آرد، در هر صورت پنکیک درست می‌شود.",
                  },
                },
                {
                  q: { en: "Who writes the numbers in an `ol`?", fa: "شماره‌های `ol` را کِی می‌نویسد؟" },
                  options: [
                    { en: "You type 1. 2. 3. by hand", fa: "خودت با دست ۱. ۲. ۳. تایپ می‌کنی" },
                    { en: "The browser, automatically", fa: "مرورگر، به‌صورت خودکار" },
                    { en: "Each `li` needs a number attribute", fa: "هر `li` به یک ویژگی شماره نیاز دارد" },
                  ],
                  answer: 1,
                  explain: {
                    en: "The browser counts the `li` elements for you — add, remove or reorder items and the numbers follow.",
                    fa: "مرورگر خودش `li`ها را می‌شمارد — آیتم اضافه یا حذف یا جابه‌جا کنی، شماره‌ها خودشان تنظیم می‌شوند.",
                  },
                },
                {
                  q: { en: "Where does a nested list go?", fa: "لیستِ تودرتو کجا می‌رود؟" },
                  options: [
                    { en: "Directly inside the outer `ul`", fa: "مستقیم داخل `ul` بیرونی" },
                    { en: "Inside ONE `li` of the outer list", fa: "داخلِ یک `li` از لیستِ بیرونی" },
                    { en: "Inside `<head>`", fa: "داخلِ `<head>`" },
                  ],
                  answer: 1,
                  explain: {
                    en: "The nested list is part of one item's content, so it lives inside that `li` — never bare inside the outer list.",
                    fa: "لیستِ تودرتو بخشی از محتوایِ یک آیتم است، پس داخل همان `li` می‌نشیند — هرگز لخت و عورت داخل لیستِ بیرونی.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Movie marathon plan", fa: "برنامه‌ی ماراتن فیلم" },
              brief: {
                en: "Plan a movie night: an `ol` with your top 3 movies (three `li`), plus a `ul` with 2 snacks (two `li`). The snack list can sit beside the ranking or be its own section — your call.",
                fa: "یک شب فیلم برنامه‌ریزی کن: یک `ol` با سه فیلمِ محبوبت (سه `li`)، به‌علاوه یک `ul` با دو تا خوراکی (دو `li`). لیستِ خوراکی می‌تواند کنار رتبه‌بندی باشد یا بخشِ جدا — با تو.",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Movie Marathon</title>
  </head>
  <body>
    <h1>Marathon Night 🎬</h1>
    <p>Three films, two snacks, zero regrets.</p>
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Movie Marathon</title>
  </head>
  <body>
    <h1>Marathon Night 🎬</h1>
    <h2>Top 3 movies</h2>
    <ol>
      <li>Spirited Away</li>
      <li>Spider-Verse</li>
      <li>Wall-E</li>
    </ol>
    <h2>Snack menu</h2>
    <ul>
      <li>Popcorn with extra butter</li>
      <li>Chocolate cookies</li>
    </ul>
  </body>
</html>`,
              hints: [
                {
                  en: "The ranking is an `ol` with three `li` children.",
                  fa: "رتبه‌بندی یک `ol` با سه فرزندِ `li` است.",
                },
                {
                  en: "The snacks are a `ul` — two `li` inside it.",
                  fa: "خوراکی‌ها یک `ul` است — دو `li` داخلش.",
                },
                {
                  en: "Every `li` opens and closes as a pair: <li>Wall-E</li>.",
                  fa: "هر `li` با جفتش باز و بسته می‌شود: <li>Wall-E</li>.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "ol", count: 1 },
                  { selector: "ol li", count: 3 },
                  { selector: "ul", count: 1 },
                  { selector: "ul li", count: 2 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m1-l4",
          title: { en: "Links and pictures", fa: "لینک‌ها و تصاویر" },
          goal: {
            en: "Connect pages with links and give every image a voice with alt.",
            fa: "با لینک صفحه‌ها را به هم وصل کنی و به هر تصویر با alt صدا بدهی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "The anchor: soul of the web", fa: "لنگر؛ روحِ وب" },
              blocks: [
                {
                  type: "text",
                  en: "The `a` tag (anchor) is the clickable text that jumps somewhere. The destination lives in the `href` attribute — attributes are extra settings written inside the opening tag. The text between the two tags is what people click.",
                  fa: "تگ `a` (لنگر — Anchor) همان متنیِ کلیک‌خور است که به جایی می‌پرد. مقصد در ویژگی (Attribute) به نام `href` زندگی می‌کند؛ ویژگی‌ها تنظیماتِ اضافه‌ای هستند که داخل تگِ آغازین نوشته می‌شوند. متنی که بین دو تگ است، چیزی است که کاربر کلیک می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Links</title>
  </head>
  <body>
    <h1>Places I Go 🧭</h1>
    <p>
      My favorite site:
      <a href="https://teka.dev">TEKA NEXUS</a>
    </p>
    <p>
      Open it in a new tab:
      <a href="https://teka.dev" target="_blank">TEKA NEXUS (new tab)</a>
    </p>
    <p>
      Or just email me:
      <a href="mailto:hi@teka.dev">hi@teka.dev</a>
    </p>
  </body>
</html>`,
                  caption: {
                    en: "Three flavors of link: normal, new tab, and email",
                    fa: "سه طعمِ لینک: معمولی، تبِ جدید و ایمیل",
                  },
                },
                {
                  type: "text",
                  en: "`target='_blank'` opens the link in a NEW tab — polite for outside sites. `mailto:someone@site.com` opens the visitor's email app with the address already filled in. (teka.dev is our safe example address — links do not need to resolve.)",
                  fa: "`target='_blank'` لینک را در تبِ جدید باز می‌کند — برای سایت‌های بیرونی لطف محسوب می‌شود. `mailto:...` برنامه‌ی ایمیلِ بازدیدکننده را با آدرسِ از قبل پرشده باز می‌کند. (teka.dev آدرسِ نمونه‌ی امنِ ماست — لازم نیست لینک‌ها واقعاً باز شوند.)",
                },
                {
                  type: "warn",
                  en: "Quotes matter: `href='https://teka.dev'`. Forget the quotes or the equals sign and the link silently dies — no error, just a link that goes nowhere.",
                  fa: "کوتیشن‌ها مهم‌اند: مقدارِ `href` را داخل کوتیشن بگذار. کوتیشن یا علامت مساوی را جا بیندازی، لینک بی‌صدا می‌میرد — نه خطایی می‌دهد، نه جایی می‌رود.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Images and their voice: alt", fa: "تصاویر و صدایشان: alt" },
              blocks: [
                {
                  type: "text",
                  en: "`img` places an image. It is another void tag: no closing pair — everything lives in its attributes. `src` = which image file to show. `alt` = a short text description of the image.",
                  fa: "`img` تصویر را روی صفحه می‌گذارد. این هم یک تگِ خالی است: جفتِ پایانی ندارد — همه‌چیز در ویژگی‌هایش است. `src` یعنی کدام فایلِ تصویری نمایش داده شود. `alt` یعنی توصیفِ کوتاهِ متنیِ تصویر.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Alt Text Demo</title>
  </head>
  <body>
    <h1>The cat file is missing 😾</h1>
    <img src="sunny-cat.png" alt="An orange cat sunbathing on a windowsill">
    <p>The image above cannot load in our offline sandbox —
       so the alt text steps in and does its job.</p>
    <hr>
    <p>Our stand-in "image", pure text: 🐱🐱</p>
  </body>
</html>`,
                  caption: {
                    en: "The broken image IS the lesson — watch alt save the day",
                    fa: "همین تصویرِ از-کار-افتاده درسِ ماست — ببین alt چطور نجات‌بخش می‌شود",
                  },
                },
                {
                  type: "text",
                  en: "Why alt is a big deal: blind visitors HEAR it through screen readers, search engines read it, and when the file fails to load it appears in the broken box. Rule for life: every `img` gets an `alt`. Always. No exceptions.",
                  fa: "چرا alt این‌قدر مهم است: بازدیدکننده‌های نابینا آن را با صفحه‌خوان می‌شنوند، موتورهای جست‌وجو آن را می‌خوانند، و وقتی فایل لود نشود همان متن در کادرِ خراب ظاهر می‌شود. قاعده‌ی همیشگی: هر `img` یک `alt` می‌گیرد. همیشه. بدون استثنا.",
                },
                {
                  type: "tip",
                  en: "In this sandbox, outside images cannot load (we are offline!). So our visual tricks are emoji, CSS art and inline SVG. On the open web, `src` would point to a real image file.",
                  fa: "در این سندباکس، تصاویرِ بیرونی لود نمی‌شوند (آفلاین هستیم!). پس ترفندهای تصویریِ ما ایموجی، نقاشی با CSS و SVGِ درون‌خطی است. در وبِ آزاد، `src` به یک فایلِ تصویریِ واقعی اشاره می‌کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Links + images together", fa: "لینک و تصویر، با هم" },
              blocks: [
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Star Club</title>
  </head>
  <body>
    <h1>Star Club ⭐</h1>
    <p>I am a huge fan of the night sky. Join me:</p>
    <p><a href="https://teka.dev" target="_blank">Tonight's sky guide</a></p>
    <p><a href="mailto:star@teka.dev">Email the club</a></p>
    <p><a href="#top">Back to top</a></p>
    <img src="telescope.png" alt="A small telescope pointing at the moon">
    <p>🔭 this line stands guard until the picture loads.</p>
  </body>
</html>`,
                  caption: {
                    en: "A tiny fan hub: three links and one alt-protected image",
                    fa: "یک هابِ طرفداریِ کوچک: سه لینک و یک تصویرِ محافظت‌شده با alt",
                  },
                },
                {
                  type: "tip",
                  en: "Link text should describe the destination: 'Read the sky guide', never 'click here'. Screen-reader users often jump from link to link — 'click here' tells them nothing.",
                  fa: "متنِ لینک باید مقصد را توصیف کند: «راهنمای آسمانِ امشب را بخوان»، هرگز «اینجا کلیک کن». کاربرانِ صفحه‌خوان از لینکی به لینک دیگر می‌پرند — «اینجا کلیک کن» هیچ چیزی به آن‌ها نمی‌گوید.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which attribute holds the link's destination?", fa: "کدام ویژگی مقصدِ لینک را نگه می‌دارد؟" },
                  options: [
                    { en: "`href`", fa: "`href`" },
                    { en: "`src`", fa: "`src`" },
                    { en: "`alt`", fa: "`alt`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`href` = hypertext reference, the address you jump to. `src` belongs to `img`.",
                    fa: "`href` یعنی نشانیِ مقصدی که به آن می‌پری. `src` مالِ `img` است.",
                  },
                },
                {
                  q: { en: "What does `target='_blank'` do?", fa: "`target='_blank'` چه می‌کند؟" },
                  options: [
                    { en: "Opens the link in a new tab", fa: "لینک را در تبِ جدید باز می‌کند" },
                    { en: "Makes the link text bold", fa: "متنِ لینک را پررنگ می‌کند" },
                    { en: "Adds an empty line after the link", fa: "بعد از لینک یک خط خالی می‌گذارد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "It tells the browser to open a fresh tab, keeping your page open behind it.",
                    fa: "به مرورگر می‌گوید یک تبِ تازه باز کند و صفحه‌ات پشت سرش باز بماند.",
                  },
                },
                {
                  q: { en: "Why write alt on every image?", fa: "چرا روی هر تصویر alt بنویسیم؟" },
                  options: [
                    {
                      en: "It describes the image when it cannot be seen",
                      fa: "وقتی تصویر دیده نمی‌شود، آن را توصیف می‌کند",
                    },
                    { en: "It makes the image bigger", fa: "تصویر را بزرگ‌تر می‌کند" },
                    { en: "It is the image's file name", fa: "همان نامِ فایلِ تصویر است" },
                  ],
                  answer: 0,
                  explain: {
                    en: "alt is read aloud by screen readers and shown when the file fails — the file name is `src`'s job.",
                    fa: "alt توسط صفحه‌خوان خوانده می‌شود و وقتی فایل لود نشود نشان داده می‌شود — کارِ نامِ فایل با `src` است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Fan hub", fa: "هابِ طرفداری" },
              brief: {
                en: "Make a tiny fan hub for anything you love: an `<h1>` naming your favorite thing, three `<a>` links — one to `https://teka.dev` with `target='_blank'`, one `mailto:fan@teka.dev`, one anywhere you like — plus one `img` with an `alt` (its `src` can be `star.png`; it will not load here and that is fine).",
                fa: "برای هر چیزی که دوستش داری یک هابِ طرفداریِ کوچک بساز: یک `<h1>` با نامِ چیزِ محبوبت، سه تا `<a>` — یکی به `https://teka.dev` با `target='_blank'`، یکی `mailto:fan@teka.dev` و یکی به هر جای دیگر — به‌علاوه یک `img` با `alt` (مقدار `src`اش می‌تواند `star.png` باشد؛ اینجا لود نمی‌شود و اشکالی ندارد).",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fan Hub</title>
  </head>
  <body>
    <h1>I love astronomy</h1>
    <p><a href="https://teka.dev">My favorite site</a></p>
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fan Hub</title>
  </head>
  <body>
    <h1>Star Club ⭐</h1>
    <p>Everything about my favorite thing: the night sky.</p>
    <p><a href="https://teka.dev" target="_blank">Tonight's sky guide</a></p>
    <p><a href="mailto:fan@teka.dev">Email the club</a></p>
    <p><a href="#top">Back to top</a></p>
    <img src="star.png" alt="A shooting star crossing a purple night sky">
  </body>
</html>`,
              hints: [
                {
                  en: "Link one: <a href=\"https://teka.dev\" target=\"_blank\">...</a> — both attributes inside the opening tag.",
                  fa: "لینکِ اول: <a href=\"https://teka.dev\" target=\"_blank\">...</a> — هر دو ویژگی داخل تگِ آغازین.",
                },
                {
                  en: "Link two starts with mailto: <a href=\"mailto:fan@teka.dev\">...</a>.",
                  fa: "لینکِ دوم با mailto شروع می‌شود: <a href=\"mailto:fan@teka.dev\">...</a>.",
                },
                {
                  en: "The image: <img src=\"star.png\" alt=\"describe your picture here\">.",
                  fa: "تصویر: <img src=\"star.png\" alt=\"توصیفِ تصویرت اینجا\">.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "a", count: 3 },
                  { selector: "a[target='_blank']", count: 1 },
                  { selector: "a[href^='mailto:']", count: 1 },
                  { selector: "img[alt]", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 2 ────────────────────────────────────────────
    {
      id: "html-m2",
      title: { en: "Structure & Meaning", fa: "ساختار و معنا" },
      blurb: {
        en: "Say what each part MEANS: semantic layout, cards, tables and forms.",
        fa: "بگو هر بخش چه معنایی دارد: چیدمانِ معنایی، کارت، جدول و فرم.",
      },
      lessons: [
        {
          id: "html-m2-l1",
          title: { en: "A page with a skeleton", fa: "صفحه‌ای با اسکلت" },
          goal: {
            en: "Lay out pages with header, nav, main, section and footer.",
            fa: "صفحه‌ها را با header و nav و main و section و footer چیدمان کنی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Why semantics", fa: "چرا معنایی؟" },
              blocks: [
                {
                  type: "text",
                  en: "You could build every page out of anonymous boxes — but then nothing would have meaning. Semantic tags say what each region IS: `header` (top: logo and title), `nav` (the menu), `main` (the one main content), `section` (a themed chunk of content), `footer` (bottom: credits, contacts).",
                  fa: "می‌شود همه‌ی صفحه را با جعبه‌های بی‌نام ساخت — ولی آن‌وقت هیچ‌چیز معنا نداشت. تگ‌های معنایی (Semantic) می‌گویند هر ناحیه چیست: `header` بالای صفحه (لوگو و عنوان)، `nav` منو، `main` محتوای اصلی، `section` یک قطعه‌ی هم‌موضوع، `footer` پایین صفحه (اعتبارها، راه‌های تماس).",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The Morning Blog</title>
  </head>
  <body>
    <header>
      <h1>The Morning Blog ☕</h1>
    </header>
    <nav>
      <a href="#posts">Posts</a> |
      <a href="#about">About me</a> |
      <a href="#hi">Say hi</a>
    </nav>
    <main>
      <section>
        <h2>Why I write</h2>
        <p>Because ideas get better when you explain them.</p>
      </section>
      <section>
        <h2>Today's post</h2>
        <p>Semantic tags: the quiet skeleton of every page you love.</p>
      </section>
    </main>
    <footer>
      <p>© 2025 The Morning Blog, brewed with too much coffee.</p>
    </footer>
  </body>
</html>`,
                  caption: {
                    en: "The five regions of a classic page — CSS (Module 3) will make this beautiful",
                    fa: "پنج ناحیه‌ی یک صفحه‌ی کلاسیک — CSS (ماژول ۳) این را زیبا می‌کند",
                  },
                },
                {
                  type: "tip",
                  en: "None of these tags change the look by themselves — they carry meaning, not paint. Google, screen readers and your teammates read them. The paint arrives in Module 3.",
                  fa: "هیچ‌کدام از این تگ‌ها به‌خودی‌خود ظاهر را عوض نمی‌کنند — معنا حمل می‌کنند، نه رنگ. گوگل، صفحه‌خوان‌ها و هم‌تیمی‌هایت آن‌ها را می‌خوانند. رنگ‌آمیزی در ماژول ۳ می‌رسد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Rules of the skeleton", fa: "قوانینِ اسکلت" },
              blocks: [
                {
                  type: "text",
                  en: "`header`, `nav` and `footer` may appear more than once (each `section` may have its own small header), but keep exactly ONE `main` per page — it is THE content. Order, top to bottom: header → nav → main → footer, with sections living inside main.",
                  fa: "`header` و `nav` و `footer` می‌توانند بیش از یک‌بار بیایند (هر `section` می‌تواند هدرِ کوچکِ خودش را داشته باشد)، ولی در هر صفحه فقط یک `main` — همان محتوای اصلی. ترتیب، از بالا به پایین: header ← nav ← main ← footer، و بخش‌ها داخل main می‌نشینند.",
                },
                {
                  type: "warn",
                  en: "Do not use `section` as a random box — each one deserves a heading or a clear theme. For pure layout boxes with no meaning, `div` (next lesson) is the honest tool.",
                  fa: "`section` را جعبه‌ی تصادفی نکن — هر کدام باید تیتر یا موضوعِ روشنی داشته باشند. برای جعبه‌های بی‌معنایِ صرفاً چیدمانی، `div` (درسِ بعد) ابزارِ صادقانه است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Read your page aloud", fa: "صفحه‌ات را بلند بخوان" },
              blocks: [
                {
                  type: "text",
                  en: "Stuck choosing tags? Say the page aloud: top... menu... the article part... the end. The words map one-to-one onto header, nav, main, footer. If a sentence sounds natural, your structure probably is.",
                  fa: "در انتخاب تگ گیر کردی؟ صفحه را بلند بخوان: بالا... منو... بخشِ مقاله‌ها... پایان. همین کلمه‌ها یک‌به‌یک می‌شوند header و nav و main و footer. اگر جمله برایت طبیعی به نظر رسید، ساختارت هم احتمالاً درست است.",
                },
                {
                  type: "tip",
                  en: "Bonus for free: semantic pages work better on phones, with search engines, and with translation tools — all three guess your layout from these tags.",
                  fa: "یک هدیه‌ی مجانی: صفحاتِ معنایی با موبایل، موتورهای جست‌وجو و ابزارهای ترجمه بهتر کار می‌کنند — هر سه، چیدمانت را از همین تگ‌ها حدس می‌زنند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "The menu bar goes inside…", fa: "نوارِ منو داخلِ … می‌رود." },
                  options: [
                    { en: "`nav`", fa: "`nav`" },
                    { en: "`footer`", fa: "`footer`" },
                    { en: "`head`", fa: "`head`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`nav` means 'navigation' — the region of links that moves people around the site.",
                    fa: "`nav` یعنی ناوبری — ناحیه‌ی لینک‌هایی که آدم‌ها را در سایت جابه‌جا می‌کنند.",
                  },
                },
                {
                  q: { en: "How many `main` elements should a page have?", fa: "یک صفحه چند تا `main` باید داشته باشد؟" },
                  options: [
                    { en: "Exactly one", fa: "دقیقاً یکی" },
                    { en: "As many as you want", fa: "هر چقدر که خواستی" },
                    { en: "Zero — it is optional", fa: "صفر — اختیاری است" },
                  ],
                  answer: 0,
                  explain: {
                    en: "One `main` = THE content of THE page. Everything else wraps around it.",
                    fa: "یک `main` یعنی محتوایِ اصلیِ همان صفحه. بقیه‌ی چیزها دورش می‌پیچند.",
                  },
                },
                {
                  q: {
                    en: "Copyright line and contact links at the very bottom?",
                    fa: "خطِ کپی‌رایت و لینک‌های تماس، در قعرِ صفحه؟",
                  },
                  options: [
                    { en: "`footer`", fa: "`footer`" },
                    { en: "`header`", fa: "`header`" },
                    { en: "`section`", fa: "`section`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The footer is the page's sign-off: copyright, small links, credits.",
                    fa: "footer امضای پایانی صفحه است: کپی‌رایت، لینک‌های کوچک، اعتبارها.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Blog skeleton", fa: "اسکلت وبلاگ" },
              brief: {
                en: "Build the bones of your future blog: a `header` (with any `h1`), a `nav`, a `main` containing exactly two `section`s (each with an `h2`), and a `footer`. No styling needed — today is about bones.",
                fa: "استخوان‌بندیِ وبلاگِ آینده‌ات را بساز: یک `header` (با هر `h1`)، یک `nav`، یک `main` که دقیقاً دو `section` دارد (هرکدام با یک `h2`) و یک `footer`. استایل لازم نیست — امروز مالِ استخوان‌هاست.",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Blog</title>
  </head>
  <body>
    <h1>My Blog</h1>
    <p>The skeleton will grow here.</p>
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Blog</title>
  </head>
  <body>
    <header>
      <h1>My Blog ✍️</h1>
    </header>
    <nav>
      <a href="#posts">Posts</a>
      <a href="#ideas">Ideas</a>
    </nav>
    <main>
      <section>
        <h2>Latest post</h2>
        <p>Why every beginner should blog their learning.</p>
      </section>
      <section>
        <h2>Coming soon</h2>
        <p>A series about building pages from zero.</p>
      </section>
    </main>
    <footer>
      <p>© 2025, written by me.</p>
    </footer>
  </body>
</html>`,
              hints: [
                {
                  en: "Order: header, then nav, then main, then footer.",
                  fa: "ترتیب: header، بعد nav، بعد main، بعد footer.",
                },
                {
                  en: "Both sections must live INSIDE main.",
                  fa: "هر دو section باید داخلِ main باشند.",
                },
                {
                  en: "Each section gets an h2 title — any words you like.",
                  fa: "هر section یک تیترِ h2 می‌گیرد — هر کلمه‌ای که دوست داری.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "nav", count: 1 },
                  { selector: "main", count: 1 },
                  { selector: "main section", count: 2 },
                  { selector: "footer", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m2-l2",
          title: { en: "div & span: the honest helpers", fa: "div و span؛ یاورهای صادق" },
          goal: {
            en: "Group chunks with div, wrap words with span, and nest tags correctly.",
            fa: "تکه‌های بزرگ را با div گروه کنی، کلمه‌ها را با span بپیچانی و تگ‌ها را درست تودرتو کنی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Two generic helpers", fa: "دو یاورِ همه‌کاره" },
              blocks: [
                {
                  type: "text",
                  en: "When no semantic tag fits, reach for `div` — a generic BLOCK box that takes a whole line and stacks vertically — and `span` — a generic INLINE wrapper that flows inside a sentence. `div` groups whole chunks; `span` dresses a few words.",
                  fa: "وقتی هیچ تگِ معنایی جور درنمی‌آید، سراغ `div` برو — یک جعبه‌ی عمومیِ بلاکی که یک خط کامل را می‌گیرد و عمودی می‌چیند — و `span` — یک پیچاننده‌ی عمومیِ درون‌خطی که وسط جمله جاری می‌شود. `div` تکه‌های بزرگ را گروه می‌کند؛ `span` چند کلمه را می‌آراید.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Blocks vs Inline</title>
  </head>
  <body>
    <h1>Watch how they flow</h1>
    <p>
      A sentence can contain
      <span>span one</span>
      and
      <span>span two</span>
      flowing inside the very same line.
    </p>
    <div>Div one: a whole block, all to itself.</div>
    <div>Div two: another block, another new line.</div>
    <p>
      Spans stay inline — <span>like this</span>.
      Divs stack like bricks.
    </p>
  </body>
</html>`,
                  caption: {
                    en: "Spans flow in the sentence; divs take the whole line",
                    fa: "spanها وسط جمله جاری می‌شوند؛ divها خطِ کامل را می‌گیرند",
                  },
                },
                {
                  type: "warn",
                  en: "`p` cannot contain `div` — paragraphs are for text, and a block box inside one confuses browsers into strange rewrites. Keep `div`s outside paragraphs.",
                  fa: "`p` نمی‌تواند `div` را در خودش جا بدهد — پاراگراف مالِ متن است و جعبه‌ی بلاکیِ داخلش مرورگر را به بازنویسی‌های عجیب می‌اندازد. `div`ها بیرونِ پاراگراف‌ها بمانند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Nesting like a pro", fa: "تودرتویی مثل حرفه‌ای‌ها" },
              blocks: [
                {
                  type: "text",
                  en: "Tags nest like boxes: the last one opened is the first one closed. Indent every new level with two spaces — your eyes will debug for you, because a mis- nest shows up as crooked indentation.",
                  fa: "تگ‌ها مثل جعبه تودرتو می‌شوند: آخری که باز شده، اولی است که بسته می‌شود. هر سطح جدید را با دو فاصله تورفتگی بده — چشم‌هایت برایت دیباگ می‌کنند، چون تودرتوییِ خراب، خودش را در تورفتگیِ کج نشان می‌دهد.",
                },
                {
                  type: "text",
                  en: "While nesting, you will want name labels: the `class` attribute. `class='card'` sticks a reusable name on any tag. It changes nothing visually yet — in Module 3 these names become your styling hooks. Start labeling now.",
                  fa: "وسطِ تودرتویی، به برچسبِ نام نیاز پیدا می‌کنی: ویژگیِ `class`. مقدار `class='card'` یک نامِ قابل‌استفاده‌ی مجدد به هر تگی می‌چسباند. هنوز از نظر ظاهری هیچ عوض نمی‌کند — در ماژول ۳ همین نام‌ها قلاب‌های استایل‌دادنت می‌شوند. از همین حالا برچسب بزن.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Now Playing</title>
  </head>
  <body>
    <h1>My player, bones only 🎧</h1>
    <div class="card">
      <h3>Midnight Compiler</h3>
      <p class="artist">Lo-Fi Bytes</p>
      <p>
        <span class="tag">lo-fi</span>
        <span class="tag">2025</span>
      </p>
    </div>
    <p>Class names now; the styling superpower arrives next module.</p>
  </body>
</html>`,
                  caption: {
                    en: "A card made of nested divs, paragraphs and labeled spans",
                    fa: "کاردی از divهای تودرتو، پاراگراف‌ها و spanهای برچسب‌دار",
                  },
                },
                {
                  type: "tip",
                  en: "Name classes after MEANING, not looks: `card`, `tag`, `bio` — good. `red-box` — bad, because looks change next week and the name stays wrong.",
                  fa: "کلاس‌ها را از روی معنا اسم‌گذاری کن، نه ظاهر: `card` و `tag` و `bio` — خوب. `red-box` — بد، چون ظاهر هفته‌ی بعد عوض می‌شود و نام همان اشتباه می‌ماند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Beware the div soup", fa: "از سوپِ div بپرهیز" },
              blocks: [
                {
                  type: "warn",
                  en: "Div soup: a page that is ONLY divs loses all meaning — for humans and machines. Semantic first (`header`, `nav`, `main`...); `div` only when nothing semantic fits.",
                  fa: "سوپِ div: صفحه‌ای که فقط از div تشکیل شده، همه‌ی معنایش را از دست می‌دهد — هم برای آدم‌ها هم برای ماشین‌ها. اول معنایی (`header`، `nav`، `main`...)؛ `div` فقط وقتی هیچ تگِ معنایی جور درنمی‌آید.",
                },
                {
                  type: "tip",
                  en: "Reflex to build: type the opening tag and the closing tag immediately (`<div></div>`), then fill the middle. Never leave an open tag behind you.",
                  fa: "رفلکسی که باید بسازی: تگِ آغازین را بنویس و بلافاصله تگِ پایانی‌اش را هم (`<div></div>`)، بعد وسطش را پر کن. هرگز تگِ بازی پشت سرت جا نگذار.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "Which one is a block container that groups whole chunks of content?",
                    fa: "کدام‌یک جعبه‌ی بلاکی است که تکه‌های بزرگِ محتوا را گروه می‌کند؟",
                  },
                  options: [
                    { en: "`div`", fa: "`div`" },
                    { en: "`span`", fa: "`span`" },
                    { en: "`b`", fa: "`b`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`div` = block (whole line, stacks). `span` = inline (flows inside text).",
                    fa: "`div` بلاک است (خط کامل، عمودی می‌چیند). `span` درون‌خطی است (وسط متن جاری می‌شود).",
                  },
                },
                {
                  q: {
                    en: "You want to highlight three words inside a long sentence. Best tag?",
                    fa: "می‌خواهی سه کلمه را وسطِ یک جمله‌ی بلند هایلایت کنی. بهترین تگ؟",
                  },
                  options: [
                    { en: "`span`", fa: "`span`" },
                    { en: "`div`", fa: "`div`" },
                    { en: "`h2`", fa: "`h2`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Words inside a sentence = inline = `span`. A `div` would rip the words onto their own lines.",
                    fa: "کلمه‌های وسطِ جمله = درون‌خطی = `span`. یک `div` کلمه‌ها را می‌قاپد و می‌برد خطِ جدا.",
                  },
                },
                {
                  q: { en: "Which nesting is invalid?", fa: "کدام تودرتویی نامعتبر است؟" },
                  options: [
                    { en: "A `p` containing a `div`", fa: "یک `p` که داخلش `div` است" },
                    { en: "A `div` containing a `p`", fa: "یک `div` که داخلش `p` است" },
                    { en: "A `div` containing a `span`", fa: "یک `div` که داخلش `span` است" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Paragraphs hold text; block boxes inside them break the model. `div` happily holds both `p` and `span`.",
                    fa: "پاراگراف متن نگه می‌دارد؛ جعبه‌ی بلاکیِ داخلش مدل را می‌شکند. `div` با کمال میل هم `p` نگه می‌دارد هم `span`.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Now playing card", fa: "کارتِ در حال پخش" },
              brief: {
                en: "Build a music card: a `div` with class exactly card, containing an `h3` (song title), a `p` (artist), and one more `p` holding two `span`s — each with class exactly tag (genre and year).",
                fa: "یک کارتِ موسیقی بساز: یک `div` با کلاسِ دقیقاً card، که داخلش یک `h3` (نام آهنگ)، یک `p` (خواننده) و یک `p` دیگر با دو `span` باشد — هرکدام با کلاسِ دقیقاً tag (سبک و سال).",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Now Playing</title>
  </head>
  <body>
    <h1>Now Playing 🎧</h1>
    <h3>Pick a song</h3>
    <p>The card structure goes here.</p>
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Now Playing</title>
  </head>
  <body>
    <h1>Now Playing 🎧</h1>
    <div class="card">
      <h3>Midnight Compiler</h3>
      <p class="artist">Lo-Fi Bytes</p>
      <p>
        <span class="tag">lo-fi</span>
        <span class="tag">2025</span>
      </p>
    </div>
  </body>
</html>`,
              hints: [
                {
                  en: "The card: <div class=\"card\"> ... </div> — everything else goes inside it.",
                  fa: "کارت: <div class=\"card\"> ... </div> — بقیه‌ی چیزها داخلش می‌روند.",
                },
                {
                  en: "Inside: an h3, then a p for the artist.",
                  fa: "داخلش: یک h3، بعد یک p برای خواننده.",
                },
                {
                  en: "Two tags in the last p: <span class=\"tag\">lo-fi</span> and <span class=\"tag\">2025</span>.",
                  fa: "دو تگ در pِ آخر: <span class=\"tag\">lo-fi</span> و <span class=\"tag\">2025</span>.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".card", count: 1 },
                  { selector: ".tag", count: 2 },
                  { selector: "h3", count: 1 },
                  { selector: "p", count: 2 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m2-l3",
          title: { en: "Tables for real data", fa: "جدول برای داده‌های واقعی" },
          goal: {
            en: "Build a clean schedule table with headers, rows and cells.",
            fa: "یک جدولِ تمیز با تیترستون‌ها، ردیف‌ها و سلول‌ها بسازی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "Rows and cells", fa: "ردیف‌ها و سلول‌ها" },
              blocks: [
                {
                  type: "text",
                  en: "A `table` is built row by row: each `tr` is one row. Inside rows, `td` is a normal cell and `th` is a header cell (bold and centered by default). The first row usually uses `th` for the column titles. The `border='1'` attribute below is just temporary scaffolding so you can SEE the grid — real styling arrives with CSS.",
                  fa: "یک `table` ردیف‌به‌ردیف ساخته می‌شود: هر `tr` یک ردیف است. داخل ردیف‌ها، `td` سلولِ معمولی است و `th` سلولِ تیتر (به‌صورت پیش‌فرض پررنگ و وسط‌چین). ردیفِ اول معمولاً برای عنوانِ ستون‌ها از `th` استفاده می‌کند. ویژگیِ `border='1'` در مثال زیر فقط داربستِ موقتی است تا شبکه را ببینی — استایلِ واقعی با CSS می‌آید.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Week</title>
  </head>
  <body>
    <h1>My Week 📅</h1>
    <table border="1">
      <tr>
        <th>Day</th>
        <th>Morning</th>
        <th>Afternoon</th>
      </tr>
      <tr>
        <td>Monday</td>
        <td>Math</td>
        <td>Guitar</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>HTML practice</td>
        <td>Football</td>
      </tr>
      <tr>
        <td>Wednesday</td>
        <td>Science</td>
        <td>Reading</td>
      </tr>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "One header row of th, then data rows of td",
                    fa: "یک ردیفِ تیتر از th، بعد ردیف‌های داده از td",
                  },
                },
                {
                  type: "tip",
                  en: "`th` is not decoration — it tells the browser 'this is a header'. Screen readers use it to announce which column each cell belongs to.",
                  fa: "`th` تزئین نیست — به مرورگر می‌گوید «این یک تیتر است». صفحه‌خوان‌ها از آن استفاده می‌کنند تا بگویند هر سلول به کدام ستون تعلق دارد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Design a table like a pro", fa: "جدول را مثل حرفه‌ای‌ها طراحی کن" },
              blocks: [
                {
                  type: "text",
                  en: "Before coding, answer two questions: how many COLUMNS? what is each ROW? Consistent rows make the table read like a clean grid. An empty cell is perfectly fine — but it still gets its own `<td></td>`; never skip the cell.",
                  fa: "قبل از کدنویسی به دو سؤال جواب بده: چند ستون؟ هر ردیف چیست؟ ردیف‌های هماهنگ، جدول را شبیه یک شبکه‌ی تمیز می‌کنند. سلولِ خالی کاملاً اشکالی ندارد — ولی با این حال `td` مخصوصِ خودش را می‌گیرد: `<td></td>`؛ هرگز سلول را از قلم نینداز.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Chore Chart</title>
  </head>
  <body>
    <h1>Chore Chart 🧹</h1>
    <table border="1">
      <tr>
        <th>Task</th>
        <th>Me</th>
        <th>Sibling</th>
      </tr>
      <tr>
        <td>Dishes</td>
        <td>Monday</td>
        <td>Thursday</td>
      </tr>
      <tr>
        <td>Trash</td>
        <td></td>
        <td>Every day</td>
      </tr>
      <tr>
        <td>Watering plants</td>
        <td>Weekends</td>
        <td></td>
      </tr>
    </table>
    <p>Empty cells still get their own td — the grid stays straight.</p>
  </body>
</html>`,
                  caption: {
                    en: "Empty cells keep the grid honest",
                    fa: "سلول‌های خالی شبکه را صاف نگه می‌دارند",
                  },
                },
                {
                  type: "warn",
                  en: "Every row should carry the same number of cells — one missing `td` shifts everything after it and the table looks haunted. (There IS a `colspan` for merging cells — a future skill.)",
                  fa: "هر ردیف باید همان تعدادِ سلولِ بقیه را داشته باشد — یک `td` جا افتاده همه‌چیز را بعد از خودش شیفت می‌دهد و جدول جن‌زده می‌شود. (برای ادغامِ سلول‌ها `colspan` هم هست — مهارتِ آینده.)",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Tables are for data", fa: "جدول مالِ داده است" },
              blocks: [
                {
                  type: "text",
                  en: "Golden rule: tables are for DATA — schedules, prices, scores, comparisons. Never for laying out the page; that job belongs to semantic tags plus CSS (very soon).",
                  fa: "قانون طلایی: جدول مالِ داده است — برنامه، قیمت، امتیاز، مقایسه. هرگز برای چیدمانِ صفحه؛ آن کار مالِ تگ‌های معنایی به‌اضافه‌ی CSS است (خیلی زود).",
                },
                {
                  type: "tip",
                  en: "Read your table aloud by rows: 'Monday: Math, Guitar.' If every sentence sounds right, your structure is right.",
                  fa: "جدولت را ردیف‌به‌ردیف بلند بخوان: «دوشنبه: ریاضی، گیتار.» اگر همه‌ی جمله‌ها درست از آب درآمدند، ساختارت هم درست است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which tag creates ONE table row?", fa: "کدام تگ یک ردیفِ جدول می‌سازد؟" },
                  options: [
                    { en: "`tr`", fa: "`tr`" },
                    { en: "`td`", fa: "`td`" },
                    { en: "`table`", fa: "`table`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`tr` = table row; the `td` cells ride inside it.",
                    fa: "`tr` یعنی ردیفِ جدول؛ سلول‌های `td` سوارِ آن هستند.",
                  },
                },
                {
                  q: { en: "Which cell type is for column titles?", fa: "کدام نوع سلول برای عنوانِ ستون‌هاست؟" },
                  options: [
                    { en: "`th`", fa: "`th`" },
                    { en: "`td`", fa: "`td`" },
                    { en: "`hr`", fa: "`hr`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`th` = table header cell — bold by default and meaningful to screen readers.",
                    fa: "`th` یعنی سلولِ تیترِ جدول — به‌طور پیش‌فرض پررنگ و برای صفحه‌خوان‌ها پرمعنا.",
                  },
                },
                {
                  q: { en: "How do you leave a cell empty?", fa: "چطور یک سلول را خالی بگذاری؟" },
                  options: [
                    { en: "`<td></td>`", fa: "`<td></td>`" },
                    { en: "Skip the td entirely", fa: "کلاً از td بگذری" },
                    { en: "Put a space inside the tr", fa: "یک فاصله داخل tr بگذاری" },
                  ],
                  answer: 0,
                  explain: {
                    en: "An empty pair still reserves the cell — skipping it shifts the whole row.",
                    fa: "جفتِ خالی هم سلول را رزرو می‌کند — از قلم انداختنش کل ردیف را شیفت می‌دهد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "My weekly schedule", fa: "برنامه‌ی هفتگی من" },
              brief: {
                en: "Build your schedule: a `table` with `border='1'`; the first row holds three `th` — Day, Morning, Afternoon; then three more `tr` rows for three days, each with three `td` cells (an empty cell is allowed).",
                fa: "برنامه‌ات را بساز: یک `table` با `border='1'`؛ ردیفِ اول سه `th` دارد — Day و Morning و Afternoon؛ بعد سه ردیفِ `tr` برای سه روز، هرکدام با سه سلولِ `td` (سلولِ خالی اشکال ندارد).",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Schedule</title>
  </head>
  <body>
    <h1>My Week 📅</h1>
    <table border="1">
      <tr>
        <td>Monday</td>
        <td>Math</td>
      </tr>
    </table>
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Schedule</title>
  </head>
  <body>
    <h1>My Week 📅</h1>
    <table border="1">
      <tr>
        <th>Day</th>
        <th>Morning</th>
        <th>Afternoon</th>
      </tr>
      <tr>
        <td>Saturday</td>
        <td>Math</td>
        <td>Painting</td>
      </tr>
      <tr>
        <td>Sunday</td>
        <td>HTML practice</td>
        <td>Football</td>
      </tr>
      <tr>
        <td>Monday</td>
        <td>Science</td>
        <td></td>
      </tr>
    </table>
  </body>
</html>`,
              hints: [
                {
                  en: "Row one: three th cells — Day, Morning, Afternoon.",
                  fa: "ردیفِ اول: سه سلولِ th — Day و Morning و Afternoon.",
                },
                {
                  en: "Then three tr rows; each holds three td cells.",
                  fa: "بعد سه ردیفِ tr؛ هرکدام سه سلولِ td دارند.",
                },
                {
                  en: "Count check: 4 rows total, 3 th, 9 td. An empty cell still needs <td></td>.",
                  fa: "شمارش: در کل ۴ ردیف، ۳ تا th، ۹ تا td. سلولِ خالی هم به `<td></td>` نیاز دارد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "table", count: 1 },
                  { selector: "th", count: 3 },
                  { selector: "tr", count: 4 },
                  { selector: "td", count: 9 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m2-l4",
          title: { en: "Forms: listening to people", fa: "فرم‌ها؛ گوش دادن به آدم‌ها" },
          goal: {
            en: "Build a complete signup form with labels, input types, textarea and a button.",
            fa: "یک فرمِ عضویتِ کامل با برچسب، انواع input و textarea و دکمه بسازی.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              title: { en: "Every input needs a label", fa: "هر ورودی یک برچسب می‌خواهد" },
              blocks: [
                {
                  type: "text",
                  en: "A `form` wraps the fields. Each field = a `label` (the question) + an `input` (the answer slot). Glue them together with `for` on the label and `id` on the input — same value. Now clicking the label wakes the field, and screen readers announce the pair properly.",
                  fa: "`form` فیلدها را در بر می‌گیرد. هر فیلد = یک `label` (سؤال) + یک `input` (جای جواب). آن‌ها را با `for` روی label و `id` روی input به هم گره بزن — مقدارِ یکسان. حالا کلیک روی برچسب، فیلد را بیدار می‌کند و صفحه‌خوان هم جفت را درست اعلام می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Pizza Order</title>
  </head>
  <body>
    <h1>Pizza Night Order 🍕</h1>
    <form>
      <p>
        <label for="name">Your name</label>
        <input type="text" id="name">
      </p>
      <p>
        <label for="mail">Email</label>
        <input type="email" id="mail">
      </p>
      <p>
        <label for="count">How many pizzas?</label>
        <input type="number" id="count">
      </p>
      <p>
        <input type="checkbox" id="cheese">
        <label for="cheese">Extra cheese, obviously</label>
      </p>
      <p>
        <label for="note">Note for the chef</label>
      </p>
      <p>
        <textarea id="note" rows="4"></textarea>
      </p>
      <button type="button">Send order 🚀</button>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "A complete little order form — click a label and watch its field wake up",
                    fa: "یک فرمِ سفارشِ کامل — روی برچسب کلیک کن و ببین فیلدش بیدار می‌شود",
                  },
                },
                {
                  type: "warn",
                  en: "`input` is a void tag — no closing pair. Everything it knows lives in its attributes: `type`, `id`, and friends.",
                  fa: "`input` تگِ خالی است — جفتِ پایانی ندارد. هرچه می‌داند در ویژگی‌هایش است: `type` و `id` و رفقا.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "type is the brain of an input", fa: "type مغزِ input است" },
              blocks: [
                {
                  type: "text",
                  en: "`type='text'` — an ordinary line. `type='email'` — on real sites the browser checks the @ for you. `type='number'` — digits with little arrows. `type='checkbox'` — an on/off toggle; the words next to it are its label. And `textarea` (a PAIR tag, unlike input) holds multi-line text — the rows attribute sets its height.",
                  fa: "`type='text'` — یک خطِ معمولی. `type='email'` — در سایت‌های واقعی مرورگر خودش @ را چک می‌کند. `type='number'` — عدد با فلش‌های کوچک. `type='checkbox'` — کلیدِ روشن/خاموش؛ کلمه‌های کنارش برچسبش هستند. و `textarea` (برخلاف input، تگِ جفت‌دار) متنِ چندخطی نگه می‌دارد — ویژگیِ rows ارتفاعش را تعیین می‌کند.",
                },
                {
                  type: "text",
                  en: "`button` inside a form: on real sites it submits everything. In our sandbox nothing is sent anywhere — so click away, safely.",
                  fa: "`button` داخل فرم: در سایت‌های واقعی همه‌چیز را ارسال می‌کند. در سندباکسِ ما چیزی به جایی فرستاده نمی‌شود — پس با خیالِ راحت کلیکش کن. (ما type='button' می‌گذاریم تا رفتارِ ارسال را بی‌خیال شود.)",
                },
                {
                  type: "tip",
                  en: "Give every input an `id` and match the label's `for` — this tiny habit is a huge accessibility win, and it is the first thing reviewers check.",
                  fa: "به هر input یک `id` بده و `for` برچسب را با آن برابر کن — این عادتِ کوچک، یک بردِ بزرگِ دسترس‌پذیری است و اولین چیزی است که داورها نگاه می‌کنند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Two small comforts", fa: "دو آسایشِ کوچک" },
              blocks: [
                {
                  type: "tip",
                  en: "Checkbox comfort: you can wrap the input INSIDE the label — `<label><input type='checkbox'> I agree</label>` — then the words themselves are clickable too.",
                  fa: "راحتیِ چک‌باکس: می‌توانی input را داخل label بپیچانی — `<label><input type='checkbox'> موافقم</label>` — بعد خودِ کلمه‌ها هم کلیک‌پذیر می‌شوند.",
                },
                {
                  type: "text",
                  en: "Bonus attribute: `placeholder` shows a faded hint INSIDE an empty field — `placeholder='Sara'` on a name input. It is a hint, never a replacement for the label.",
                  fa: "ویژگیِ هدیه: `placeholder` یک راهنمای کم‌رنگ داخلِ فیلدِ خالی نشان می‌دهد — مثل `placeholder='Sara'` روی ورودیِ نام. این یک راهنماست، هرگز جایگزینِ label نمی‌شود.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "How do you glue a label to its input?", fa: "برچسب را چطور به input بچسبانی؟" },
                  options: [
                    { en: "label's `for` equals input's `id`", fa: "`for` برچسب برابر با `id` ورودی شود" },
                    { en: "They must sit side by side", fa: "باید کنار هم بنشینند" },
                    { en: "Give both the same color", fa: "هر دو را هم‌رنگ کنی" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`for` + matching `id` — that link is what makes the label clickable and meaningful to screen readers.",
                    fa: "`for` + `id`ی برابر — همین پیوند است که برچسب را کلیک‌پذیر و برای صفحه‌خوان‌ها بامعنا می‌کند.",
                  },
                },
                {
                  q: { en: "A multi-line message field is…", fa: "فیلدِ پیامِ چندخطی … است." },
                  options: [
                    { en: "`textarea`", fa: "`textarea`" },
                    { en: "input with type='text'", fa: "input با type='text'" },
                    { en: "input with type='long'", fa: "input با type='long'" },
                  ],
                  answer: 0,
                  explain: {
                    en: "`textarea` is its own pair tag, made for multi-line text. type='long' does not exist.",
                    fa: "`textarea` خودش یک تگِ جفت‌دارِ مستقل است، برای متنِ چندخطی. type='long' اصلاً وجود ندارد.",
                  },
                },
                {
                  q: { en: "Asking 'how many pizzas?' — which type?", fa: "سؤالِ «چند تا پیتزا؟» — کدام نوع؟" },
                  options: [
                    { en: "type='number'", fa: "type='number'" },
                    { en: "type='email'", fa: "type='email'" },
                    { en: "type='checkbox'", fa: "type='checkbox'" },
                  ],
                  answer: 0,
                  explain: {
                    en: "A quantity is a number — and the browser even adds little up/down arrows for free.",
                    fa: "تعداد یعنی عدد — و مرورگر هم مجانی دو تا فلشِ بالا/پایین اضافه می‌کند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Game club signup", fa: "عضویت در باشگاه بازی" },
              brief: {
                en: "Build a game-club signup `form`: a `label`+`input type='text'` for the name, a `label`+`input type='email'`, a `label`+`input type='number'` for age, one checkbox with its own text, a `textarea` (why do you want to join?), and a `button`. At least three labels wired with for/id.",
                fa: "یک `form` عضویت در باشگاه بازی بساز: یک `label` با `input type='text'` برای نام، یک `label` با `input type='email'`، یک `label` با `input type='number'` برای سن، یک چک‌باکس با متنِ خودش، یک `textarea` (چرا می‌خواهی عضو شوی؟) و یک `button`. دست‌کم سه برچسب با for/id گره خورده باشند.",
              },
              starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Game Club</title>
  </head>
  <body>
    <h1>Game Club 🎮</h1>
    <form>
      <button type="button">Join</button>
    </form>
  </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Game Club</title>
  </head>
  <body>
    <h1>Game Club 🎮</h1>
    <form>
      <p>
        <label for="name">Your name</label>
        <input type="text" id="name" placeholder="Sara">
      </p>
      <p>
        <label for="mail">Email</label>
        <input type="email" id="mail">
      </p>
      <p>
        <label for="age">Your age</label>
        <input type="number" id="age">
      </p>
      <p>
        <input type="checkbox" id="agree">
        <label for="agree">I promise to play fair</label>
      </p>
      <p>
        <label for="why">Why do you want to join?</label>
      </p>
      <p>
        <textarea id="why" rows="4"></textarea>
      </p>
      <button type="button">Send my application 🚀</button>
    </form>
  </body>
</html>`,
              hints: [
                {
                  en: "Pattern for a field: <label for=\"x\">Words</label> then <input type=\"text\" id=\"x\">.",
                  fa: "الگوی یک فیلد: <label for=\"x\">کلمه‌ها</label> بعد <input type=\"text\" id=\"x\">.",
                },
                {
                  en: "The email field: <input type=\"email\" id=\"mail\"> — plus its label.",
                  fa: "فیلدِ ایمیل: <input type=\"email\" id=\"mail\"> — با برچسبش.",
                },
                {
                  en: "Checkbox + textarea + button close it out. Three labels with matching for/id.",
                  fa: "چک‌باکس و textarea و button کار را می‌بندند. سه label با for/id برابر.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "label", count: 3 },
                  { selector: "input[type='email']", count: 1 },
                  { selector: "input[type='checkbox']", count: 1 },
                  { selector: "textarea", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 3 ────────────────────────────────────────────
    {
      id: "html-m3",
      title: { en: "CSS — Make It Beautiful", fa: "CSS — زیبایش کن" },
      blurb: {
        en: "Colors, fonts, the box model, reusable classes and flexbox — turn plain gray pages into real designs.",
        fa: "رنگ، فونت، مدل جعبه‌ای، کلاس‌های قابل‌استفاده‌ی مجدد و فلکس‌باکس — صفحه‌های خاکستری را به طراحیِ واقعی تبدیل کن.",
      },
      lessons: [
        {
          id: "html-m3-l1",
          title: { en: "Hello, CSS", fa: "سلام، CSS" },
          goal: {
            en: "Paint a page from a <style> block with color, font-family and font-size.",
            fa: "با یک بلوک `<style>` صفحه را با color و font-family و font-size رنگ‌آمیزی کنی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "CSS: the paint of the web", fa: "CSS: رنگِ وب" },
              blocks: [
                {
                  type: "text",
                  en: "HTML is the skeleton; CSS is the paint. CSS (Cascading Style Sheets) is not another language of logic — it is a list of rules. Each rule grabs some elements and changes how they look: their color, their size, their font, their spacing.",
                  fa: "HTML اسکلت است؛ CSS رنگ. CSS مخففِ Cascading Style Sheets است ولی منطقِ جدیدی ندارد — فقط یک لیستِ قانون است. هر قانون چند عنصر را برمی‌دارد و ظاهرش را عوض می‌کند: رنگش، اندازه‌اش، فونتش، فاصله‌هایش.",
                },
                {
                  type: "text",
                  en: "The shape of every rule: `selector { property: value; }`. The selector decides WHO gets painted. Inside the curly braces you list the changes — each property with a value, each line ending in a semicolon.",
                  fa: "شکلِ هر قانون: `selector { property: value; }`. سلکتور (Selector) تعیین می‌کند «چه کسی» رنگ بگیرد. داخل آکولادها تغییرها را لیست می‌کنی — هر ویژگی با یک مقدار، و هر خط با سمی‌کالن تمام می‌شود.",
                },
                {
                  type: "tip",
                  en: "CSS lives inside a `<style>` tag in the `<head>` — the browser-only room from Module 1. The rules never show up as text; they quietly restyle the page.",
                  fa: "CSS داخل تگ `<style>` در `<head>` زندگی می‌کند — همان اتاقِ مخصوصِ مرورگر از ماژول ۱. قوانین هیچ‌وقت مثل متن دیده نمی‌شوند؛ آرام و بی‌سروصدا ظاهرِ صفحه را عوض می‌کنند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Your first stylesheet", fa: "اولین استایل‌شیتِ تو" },
              blocks: [
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Movie Night</title>
        <style>
            body {
                background: #fff7ed;
            }
            h1 {
                color: tomato;
                font-family: Georgia, serif;
            }
            p {
                color: #444444;
                font-size: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Movie Night Under the Stars</h1>
        <p>Friday, 8 PM, on the school roof. Bring a blanket!</p>
    </body>
</html>`,
                  caption: {
                    en: "Press Run — same skeleton, brand-new look.",
                    fa: "دکمه‌ی Run را بزن — همان اسکلت، ظاهری کاملاً جدید.",
                  },
                },
                {
                  type: "text",
                  en: "Read the rules: every `h1` is now tomato-colored with Georgia letters; every `p` is gray and 20 pixels tall. `#fff7ed` is a hex color — six digits mixing red, green and blue. Names like `tomato` work too, but hex opens up 16 million colors.",
                  fa: "قانون‌ها را بخوان: حالا هر `h1` گوجه‌ای‌رنگ است با حروفِ Georgia؛ هر `p` خاکستری است با ۲۰ پیکسل ارتفاع. `#fff7ed` یک رنگِ هگز (Hex) است — شش رقم که قرمز و سبز و آبی را قاطی می‌کند. اسم‌هایی مثل `tomato` هم کار می‌کنند، ولی هگز ۱۶ میلیون رنگ به تو می‌دهد.",
                },
                {
                  type: "text",
                  en: "`font-family` picks the letter shapes. Give a stack: `Georgia, serif` means 'try Georgia first; if it is missing, any serif font'. The browser takes the first one it has.",
                  fa: "`font-family` شکلِ حروف را انتخاب می‌کند. یک لیستِ پشتیبان بده: `Georgia, serif` یعنی «اول Georgia را امتحان کن؛ نبود، هر فونتِ سریف دیگر». مرورگر اولین گزینه‌ای را که داشته باشد برمی‌دارد.",
                },
                {
                  type: "warn",
                  en: "Forgot a semicolon? Everything after that line silently breaks. When your CSS 'does nothing', hunt for the missing `;` first.",
                  fa: "سمی‌کالن جا انداختی؟ همه‌ی خط‌های بعدش بی‌سروصدا از کار می‌افتند. هر وقت CSS انگار «هیچ کاری نمی‌کند»، اول دنبال سمی‌کالنِ گم‌شده بگرد.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "Where do you write CSS rules in a single-file page?",
                    fa: "قوانین CSS را در یک صفحه‌ی تک‌فایلی کجا می‌نویسیم؟",
                  },
                  options: [
                    {
                      en: "Anywhere inside `<body>`, as normal text",
                      fa: "هر جای `<body>`، به‌عنوان متنِ معمولی",
                    },
                    {
                      en: "In a `<style>` tag inside `<head>`",
                      fa: "داخلِ تگ `<style>` در `<head>`",
                    },
                    { en: "Inside the `<title>`", fa: "داخلِ `<title>`" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Style rules belong in the head, wrapped in `<style>`. Text written in the body would just... show up as text.",
                    fa: "قوانین استایل به head تعلق دارند و داخلِ `<style>` پیچیده می‌شوند. متنی که در body بنویسی فقط... همان‌طور متن دیده می‌شود!",
                  },
                },
                {
                  q: {
                    en: "Which line is a correct CSS rule?",
                    fa: "کدام خط یک قانونِ درستِ CSS است؟",
                  },
                  options: [
                    { en: "`p ( color = green )`", fa: "`p ( color = green )`" },
                    { en: "`color green -> p`", fa: "`color green -> p`" },
                    { en: "`p { color: green; }`", fa: "`p { color: green; }`" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Selector, curly braces, property: value, semicolon — `p { color: green; }` has all four.",
                    fa: "سلکتور، آکولاد، ویژگی: مقدار، سمی‌کالن — `p { color: green; }` هر چهار تا را دارد.",
                  },
                },
                {
                  q: {
                    en: "In `font-family: Georgia, serif;` what is `serif`?",
                    fa: "در `font-family: Georgia, serif;` نقشِ `serif` چیست؟",
                  },
                  options: [
                    {
                      en: "A fallback font, used if Georgia is missing",
                      fa: "فونتِ پشتیبان؛ اگر Georgia نبود، از آن استفاده می‌شود",
                    },
                    {
                      en: "A color that Georgia must match",
                      fa: "رنگی که Georgia باید شبیهش باشد",
                    },
                    { en: "The font's file size", fa: "حجمِ فایلِ فونت" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Font stacks are safety nets: the browser walks the list and uses the first available font.",
                    fa: "لیستِ فونت‌ها تورِ نجات است: مرورگر لیست را یکی‌یکی رد می‌کند و اولین فونتِ موجود را برمی‌دارد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Paint the poster", fa: "پوستر را رنگ کن" },
              brief: {
                en: "This poster is naked. Add a `<style>` tag to the head, then write two rules: one for `h1` that includes a `color`, and one for `p` that includes a `font-size`. Any colors and sizes you like — make it loud!",
                fa: "این پوستر لخت است. یک تگ `<style>` به head اضافه کن، بعد دو قانون بنویس: یکی برای `h1` که `color` داشته باشد و یکی برای `p` که `font-size` داشته باشد. رنگ و اندازه‌اش با تو — جیغ و داد بزن!",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Poster</title>
    </head>
    <body>
        <h1>Skate Jam - Saturday!</h1>
        <p>Music, ramps and free lemonade. Bring your board.</p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Poster</title>
        <style>
            body {
                background: #111827;
            }
            h1 {
                color: #fbbf24;
                font-size: 40px;
            }
            p {
                color: #f9fafb;
                font-size: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Skate Jam - Saturday!</h1>
        <p>Music, ramps and free lemonade. Bring your board.</p>
    </body>
</html>`,
              hints: [
                {
                  en: "The `<style>` tag goes in the `<head>`, right after `<title>`.",
                  fa: "تگ `<style>` در `<head>` می‌رود، درست بعد از `<title>`.",
                },
                {
                  en: "Inside it: `h1 { color: hotpink; }` and `p { font-size: 18px; }` — with semicolons.",
                  fa: "داخلش: `h1 { color: hotpink; }` و `p { font-size: 18px; }` — با سمی‌کالن‌هایشان.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "style", count: 1 },
                  { selector: "h1", count: 1 },
                  { selector: "style", text: "color" },
                  { selector: "style", text: "font-size" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m3-l2",
          title: { en: "Every element is a box", fa: "هر عنصری یک جعبه است" },
          goal: {
            en: "Control spacing and shape with padding, margin, border, background and border-radius.",
            fa: "فاصله‌ها و شکل را با padding و margin و border و background و border-radius کنترل کنی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "The framed photo", fa: "عکسِ قاب‌شده" },
              blocks: [
                {
                  type: "text",
                  en: "CSS sees every element as a rectangular box, even round-looking ones. The box has layers: the content in the middle, then `padding` (soft space inside), then `border` (the frame), then `margin` (space pushing neighbours away).",
                  fa: "CSS هر عنصری را یک جعبه‌ی مستطیلی می‌بیند، حتی آن‌هایی که گرد به نظر می‌رسند. جعبه لایه‌لایه است: محتوا وسط، بعد `padding` (فاصله‌ی نرمِ داخل)، بعد `border` (قاب) و بعد `margin` (فاصله‌ای که همسایه‌ها را عقب می‌راند).",
                },
                {
                  type: "text",
                  en: "Photo-on-a-wall analogy: the photo is the content, the mat around it is padding, the wooden frame is the border, and the empty wall you keep between frames is margin.",
                  fa: "شبیه عکسِ روی دیوار: خودِ عکس محتوا است، کاغذِ دورش padding، قابِ چوبی border، و دیوارِ خالی‌ای که بین قاب‌ها نگه می‌داری margin.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Box Cafe</title>
        <style>
            body {
                background: #fdf2f8;
            }
            div {
                background: white;
                padding: 24px;
                margin: 16px;
                border: 3px solid #f472b6;
                border-radius: 12px;
            }
        </style>
    </head>
    <body>
        <div>
            <h2>Cappuccino ☕</h2>
            <p>Espresso with steamed milk foam.</p>
        </div>
        <div>
            <h2>Cheesecake 🍰</h2>
            <p>Slow-baked, topped with berries.</p>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "Two plain divs become menu cards — five box properties did it.",
                    fa: "دو div ساده تبدیل به کارتِ منو شدند — پنج ویژگیِ جعبه‌ای این کار را کرد.",
                  },
                },
                {
                  type: "tip",
                  en: "`border: 3px solid #f472b6;` is shorthand — width, style and color in one line. `solid`, `dashed` and `dotted` are the classics.",
                  fa: "`border: 3px solid #f472b6;` یک خطِ خلاصه‌نویسی است — ضخامت و نوع و رنگ در یک خط. `solid` و `dashed` و `dotted` کلاسیک‌های همیشگی‌اند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Padding vs margin", fa: "padding در برابر margin" },
              blocks: [
                {
                  type: "text",
                  en: "The classic mix-up. `padding` grows the space INSIDE the box — the background stretches with it, so the box looks bigger and airier. `margin` adds space OUTSIDE — boxes move apart but each keeps its size.",
                  fa: "همان اشتباهِ همیشگی. `padding` فضای «داخلِ» جعبه را بزرگ می‌کند — پس‌زمینه هم با آن بزرگ می‌شود، پس جعبه بزرگ‌تر و هوادارتر به نظر می‌رسد. `margin` فضا را «بیرونِ» جعبه اضافه می‌کند — جعبه‌ها از هم دور می‌شوند ولی اندازه‌شان عوض نمی‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Rounded</title>
        <style>
            button {
                background: #0ea5e9;
                color: white;
                font-size: 18px;
                padding: 12px 24px;
                border: none;
                border-radius: 999px;
            }
        </style>
    </head>
    <body>
        <button>Order now</button>
    </body>
</html>`,
                  caption: {
                    en: "One border-radius: 999px turns the button into a pill.",
                    fa: "یک `border-radius: 999px` دکمه را کپسولی می‌کند.",
                  },
                },
                {
                  type: "text",
                  en: "`border-radius` rounds the corners: `12px` for soft, `999px` for a full pill, `50%` for a circle (memorize that trick — you will use it in Module 4).",
                  fa: "`border-radius` گوشه‌ها را گرد می‌کند: `12px` برای نرمی، `999px` برای کپسولِ کامل و `50%` برای دایره (این ترفند را حفظ کن — در ماژول ۴ به کارت می‌آید).",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "Which property adds space between the content and its own border?",
                    fa: "کدام ویژگی بین محتوا و قابِ خودِ جعبه فاصله می‌اندازد؟",
                  },
                  options: [
                    { en: "`margin`", fa: "`margin`" },
                    { en: "`padding`", fa: "`padding`" },
                    { en: "`border-radius`", fa: "`border-radius`" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Padding is the inner cushion; margin is the outer gap between boxes.",
                    fa: "padding بالشتکِ داخل است؛ margin فاصله‌ی بیرونیِ بین جعبه‌ها.",
                  },
                },
                {
                  q: {
                    en: "Two cards sit glued together. Which property pushes them apart?",
                    fa: "دو کارت چسبیده‌اند به هم. کدام ویژگی آن‌ها را از هم جدا می‌کند؟",
                  },
                  options: [
                    { en: "`font-size`", fa: "`font-size`" },
                    { en: "`padding`", fa: "`padding`" },
                    { en: "`margin`", fa: "`margin`" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Margin is space outside the box — exactly what separates neighbours.",
                    fa: "margin فاصله‌ی بیرونِ جعبه است — دقیقاً همان چیزی که همسایه‌ها را جدا می‌کند.",
                  },
                },
                {
                  q: {
                    en: "What does `border-radius: 50%` do to a square div?",
                    fa: "`border-radius: 50%` با یک div مربعی چه می‌کند؟",
                  },
                  options: [
                    { en: "Makes it a perfect circle", fa: "آن را دایره‌ی کامل می‌کند" },
                    { en: "Removes its border", fa: "قابش را حذف می‌کند" },
                    { en: "Doubles its size", fa: "اندازه‌اش را دو برابر می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Half-rounding every corner of a square turns it into a circle — the avatar trick.",
                    fa: "گرد کردنِ نصفه‌ونیمِ همه‌ی گوشه‌های یک مربع، آن را دایره می‌کند — همان ترفندِ آواتار.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Gift cards", fa: "کارت‌های هدیه" },
              brief: {
                en: "The two divs below are menu items from your lemonade stand. Add a `<style>` and give every `div` a `background`, `padding`, a `border`, and round corners with `border-radius`. Keep the two divs and their headings as they are.",
                fa: "دو div پایین آیتم‌های منوی لیمونادت هستند. یک `<style>` اضافه کن و به هر `div` یک `background` و `padding` و `border` بده و گوشه‌ها را با `border-radius` گرد کن. دو div و تیترهایشان را دست‌نخورده نگه دار.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Lemonade Stand</title>
    </head>
    <body>
        <div>
            <h2>Classic Lemonade 🍋</h2>
            <p>Ice cold, extra sharp.</p>
        </div>
        <div>
            <h2>Mint Lemonade 🌿</h2>
            <p>Fresh mint, crushed by hand.</p>
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Lemonade Stand</title>
        <style>
            body {
                background: #fef9c3;
            }
            div {
                background: white;
                padding: 20px;
                margin: 16px;
                border: 2px solid #facc15;
                border-radius: 12px;
            }
        </style>
    </head>
    <body>
        <div>
            <h2>Classic Lemonade 🍋</h2>
            <p>Ice cold, extra sharp.</p>
        </div>
        <div>
            <h2>Mint Lemonade 🌿</h2>
            <p>Fresh mint, crushed by hand.</p>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "Style them all at once: `div { ... }` in a `<style>` tag in the head.",
                  fa: "همه‌اشان را یک‌جا استایل بده: `div { ... }` داخل یک تگ `<style>` در head.",
                },
                {
                  en: "Four lines are enough: `background`, `padding: 20px`, `border: 2px solid ...`, `border-radius: 12px`.",
                  fa: "چهار خط کافی است: `background` و `padding: 20px` و `border: 2px solid ...` و `border-radius: 12px`.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "div", count: 2 },
                  { selector: "div h2", count: 2 },
                  { selector: "style", text: "padding" },
                  { selector: "style", text: "border-radius" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m3-l3",
          title: { en: "Classes & ids: name it, style it", fa: "کلاس و آیدی: نام بگذار، استایل بده" },
          goal: {
            en: "Mark elements with class and id attributes and style them with .class and #id selectors.",
            fa: "به عنصرها `class` و `id` بدهی و با سلکتورهای `.class` و `#id` استایلشان کنی.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              title: { en: "One class, many elements", fa: "یک کلاس، چند عنصر" },
              blocks: [
                {
                  type: "text",
                  en: "Element selectors paint everything: `p { }` colors ALL paragraphs. To paint only some, tag elements with a `class` attribute: `<h2 class='alert'>`. The dot selector `.alert { }` then paints exactly those.",
                  fa: "سلکتورِ عنصر همه‌چیز را رنگ می‌کند: `p { }` همه‌ی پاراگراف‌ها را می‌گیرد. اگر فقط بعضی‌ها را می‌خواهی، به آن‌ها یک `class` (کلاس) بده: `<h2 class='alert'>`. بعد سلکتورِ نقطه‌دارِ `.alert { }` دقیقاً همان‌ها را رنگ می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Toolkit</title>
        <style>
            body {
                background: #f0fdf4;
                font-family: Arial, sans-serif;
            }
            .badge {
                background: #16a34a;
                color: white;
                padding: 6px 14px;
                border-radius: 999px;
                margin: 4px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <h1>My Toolkit 🧰</h1>
        <span class="badge">HTML</span>
        <span class="badge">Patience</span>
        <span class="badge">Snacks</span>
    </body>
</html>`,
                  caption: {
                    en: "Three spans share one .badge rule — write once, reuse forever.",
                    fa: "سه span یک قانونِ `.badge` را به اشتراک می‌گذارند — یک‌بار بنویس، برای همیشه استفاده کن.",
                  },
                },
                {
                  type: "text",
                  en: "A class is a reusable label. Ten elements can share `class='badge'`; change the rule once and all ten update. (`display: inline-block` makes the little span accept padding like a real box.) This is how real sites stay small.",
                  fa: "کلاس یک برچسبِ قابل‌استفاده‌ی مجدد است. ده عنصر می‌توانند همگی `class='badge'` داشته باشند؛ یک‌بار قانون را عوض کنی، هر ده تا به‌روز می‌شوند. (`display: inline-block` هم باعث می‌شود span کوچک، padding را مثل یک جعبه‌ی واقعی بپذیرد.) سایت‌های واقعی هم با همین ترفند کوچک و جمع‌وجور می‌مانند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "ids: one of a kind", fa: "آیدی: فقط یکی از او" },
              blocks: [
                {
                  type: "text",
                  en: "An `id` marks ONE special element: `<div id='hero'>`. Style it with the hash selector `#hero { }`. Use ids for page landmarks — the hero, the contact form — and classes for anything repeatable.",
                  fa: "`id` یک عنصرِ خاص را نشانه می‌گیرد: `<div id='hero'>`. با سلکتورِ مربع `#hero { }` استایلش کن. id را برای بخش‌های شاخصِ صفحه بگذار — هیرو، فرمِ تماس — و class را برای هر چیزی که تکرارشدنی است.",
                },
                {
                  type: "warn",
                  en: "One id value per page. Two elements with `id='hero'` still render, but links that jump to it get confused. Class = unlimited. Id = unique.",
                  fa: "در هر صفحه یک مقدارِ id. دو عنصر با `id='hero'` هنوز رندر می‌شوند، ولی لینک‌هایی که به آن پرش می‌کنند گیج می‌شوند. کلاس = بی‌نهایت. آیدی = تک.",
                },
                {
                  type: "tip",
                  en: "Name classes after purpose, not paint: `alert`, `card`, `menu` beat `red-box` — tomorrow you repaint the red box blue, and the name stays true.",
                  fa: "کلاس‌ها را به نامِ نقششان نام‌گذاری کن، نه رنگشان: `alert` و `card` و `menu` از `red-box` بهترند — فردا که جعبه‌ی قرمز را آبی کنی، نامش هنوز درست می‌ماند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "You want five headings to share one look. Best tool?",
                    fa: "می‌خواهی پنج تیتر یک شکلِ مشترک داشته باشند. بهترین ابزار؟",
                  },
                  options: [
                    {
                      en: "Give each one a different id",
                      fa: "به هرکدام یک آیدیِ متفاوت بدهی",
                    },
                    {
                      en: "One class shared by all five",
                      fa: "یک کلاسِ مشترک بین هر پنج‌تا",
                    },
                    {
                      en: "Copy the CSS rule five times",
                      fa: "قانونِ CSS را پنج بار کپی کنی",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "One class, one rule, five happy headings — change it once, all five update.",
                    fa: "یک کلاس، یک قانون، پنج تیترِ خوشحال — یک‌بار عوضش کنی، هر پنج تا به‌روز می‌شوند.",
                  },
                },
                {
                  q: {
                    en: "The correct selector for `class='menu'` is…",
                    fa: "سلکتورِ درست برای `class='menu'` کدام است؟",
                  },
                  options: [
                    { en: "`#menu`", fa: "`#menu`" },
                    { en: "`menu()`", fa: "`menu()`" },
                    { en: "`.menu`", fa: "`.menu`" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Dot for class, hash for id: `.menu` selects the class, `#menu` would select an id.",
                    fa: "نقطه برای کلاس، مربع برای آیدی: `.menu` کلاس را برمی‌دارد و `#menu` سراغ آیدی می‌رود.",
                  },
                },
                {
                  q: {
                    en: "How many elements may carry `id='footer'` on one page?",
                    fa: "در یک صفحه چند عنصر می‌توانند `id='footer'` داشته باشند؟",
                  },
                  options: [
                    { en: "Exactly one", fa: "دقیقاً یکی" },
                    { en: "Exactly two", fa: "دقیقاً دو تا" },
                    { en: "As many as you like", fa: "هر چقدر که دوست داشته باشی" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Ids are unique — one element each. Shared styling is a job for classes.",
                    fa: "آیدی‌ها یکتا هستند — هر کدام فقط برای یک عنصر. استایلِ مشترک کارِ کلاس‌هاست.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The badge factory", fa: "کارخانه‌ی نشان‌ها" },
              brief: {
                en: "Give the `h1` the id `main-title`. Below it, add three `<span class='badge'>` elements — your three skills, any words. Then add a `<style>` with a `.badge` rule (background, padding, border-radius) and a `#main-title` rule with a `color`.",
                fa: "به `h1` آیدیِ `main-title` بده. زیرش سه تا `<span class='badge'>` اضافه کن — سه مهارتِ تو، با هر کلمه‌ای. بعد یک `<style>` بیفزای با یک قانونِ `.badge` (شامل background و padding و border-radius) و یک قانونِ `#main-title` که `color` داشته باشد.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Skills</title>
    </head>
    <body>
        <h1>Things I am good at</h1>
        <!-- three spans with class badge go here -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Skills</title>
        <style>
            #main-title {
                color: #7c3aed;
            }
            .badge {
                background: #ede9fe;
                color: #5b21b6;
                padding: 6px 14px;
                border-radius: 999px;
                margin: 4px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <h1 id="main-title">Things I am good at</h1>
        <span class="badge">HTML</span>
        <span class="badge">Design</span>
        <span class="badge">Snacks</span>
    </body>
</html>`,
              hints: [
                {
                  en: "An id goes straight on the tag: <h1 id='main-title'>. Style it with #main-title { }.",
                  fa: "آیدی مستقیم روی تگ می‌نشیند: <h1 id='main-title'>. با `#main-title { }` استایلش کن.",
                },
                {
                  en: "Then three spans: <span class='badge'>HTML</span> ... and one .badge rule in the style tag.",
                  fa: "بعدش سه span: <span class='badge'>HTML</span> ... و یک قانونِ `.badge` داخل تگ style.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "style", count: 1 },
                  { selector: "#main-title", count: 1 },
                  { selector: ".badge", count: 3 },
                  { selector: "style", text: "border-radius" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m3-l4",
          title: { en: "Flexbox: side by side", fa: "فلکس‌باکس: کنارِ هم" },
          goal: {
            en: "Line items up in a row with display: flex, then space them with gap, justify-content and align-items.",
            fa: "با `display: flex` عنصرها را در یک ردیف بچینی و با gap و justify-content و align-items فاصله و جایشان را تنظیم کنی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "The container is the boss", fa: "رئیس، همان جعبه‌ی مادر است" },
              blocks: [
                {
                  type: "text",
                  en: "Block elements are loners: each starts on a new line. Flexbox ends that. Put `display: flex` on a container and its direct children instantly line up in a row, hugging each other.",
                  fa: "عنصرهای بلوکی (Block) تنها هستند: هر کدام از خطِ جدید شروع می‌شود. فلکس‌باکس (Flexbox) به این تنهایی پایان می‌دهد. روی یک ظرف (Container) بنویس `display: flex` و فرزندانِ مستقیمش همان لحظه در یک ردیف، چسبیده به هم، می‌ایستند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Flex Playground</title>
        <style>
            body {
                background: #eff6ff;
                font-family: Arial, sans-serif;
            }
            .row {
                display: flex;
                gap: 12px;
                align-items: center;
            }
            .box {
                background: #2563eb;
                color: white;
                padding: 16px 20px;
                border-radius: 8px;
            }
        </style>
    </head>
    <body>
        <h1>Flex Playground 🧩</h1>
        <div class="row">
            <div class="box">One</div>
            <div class="box">Two</div>
            <div class="box">Three</div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "One display: flex and three lonely divs become a team.",
                    fa: "فقط یک `display: flex` و سه divِ تنها، تبدیل به یک تیم می‌شوند.",
                  },
                },
                {
                  type: "text",
                  en: "`gap` is the fixed breathing room between items — no more margin juggling. It only works between flex (and grid) children, which is why it pairs perfectly with `display: flex`.",
                  fa: "`gap` فاصله‌ی ثابت و نفس‌کشِ بین آیتم‌هاست — دیگر با margin کلنجار نرو. این ویژگی فقط بین فرزندانِ فلکس (و گرید) کار می‌کند؛ برای همین با `display: flex` عالی جفت می‌شود.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Two dials: justify & align", fa: "دو پیچ: justify و align" },
              blocks: [
                {
                  type: "text",
                  en: "`justify-content` slides items along the ROW (horizontally): `flex-start` (default), `center`, `flex-end`, and the crowd-pleaser `space-between` — first item at the start, last at the end, even spacing between.",
                  fa: "`justify-content` آیتم‌ها را در راستای ردیف (افقی) جابه‌جا می‌کند: `flex-start` (پیش‌فرض)، `center`، `flex-end` و محبوبِ همه `space-between` — اولی اولِ خط، آخری آخرِ خط، و فاصله‌ها برابر.",
                },
                {
                  type: "text",
                  en: "`align-items` works the other direction: it lines items up vertically. `align-items: center` is the classic fix for 'my buttons have different heights and look messy'.",
                  fa: "`align-items` از جهتِ دیگر کار می‌کند: آیتم‌ها را عمودی تنظیم می‌کند. `align-items: center` همان راه‌حلِ کلاسیکِ «دکمه‌های من قد و قواره‌ی مختلف دارند و به‌هم‌ریخته‌اند» است.",
                },
                {
                  type: "warn",
                  en: "`display: flex` goes on the PARENT (the row), never on the children. If each child is its own flex container, you get three tiny rows instead of one big one.",
                  fa: "`display: flex` را روی «والد» (خودِ ردیف) بگذار، نه روی فرزندها. اگر هر فرزند خودش یک فلکس باشد، به‌جای یک ردیفِ بزرگ، سه ردیفِ ریز می‌سازی.",
                },
                {
                  type: "tip",
                  en: "Add `flex-wrap: wrap` and the row politely wraps to a second line on narrow screens — your first step toward mobile-friendly pages (Module 4!).",
                  fa: "`flex-wrap: wrap` را هم اضافه کن تا ردیف در صفحه‌های باریک با ادب به خطِ دوم برود — اولین قدمِ تو به سمت صفحاتِ موبایل‌پسند (ماژول ۴!).",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "What makes a container's children sit in a row?",
                    fa: "چه چیزی فرزندانِ یک ظرف را در یک ردیف می‌نشاند؟",
                  },
                  options: [
                    {
                      en: "`row: yes` on each child",
                      fa: "`row: yes` روی هر فرزند",
                    },
                    {
                      en: "`display: flex` on each child",
                      fa: "`display: flex` روی هر فرزند",
                    },
                    {
                      en: "`display: flex` on the container",
                      fa: "`display: flex` روی ظرف (والد)",
                    },
                  ],
                  answer: 2,
                  explain: {
                    en: "Flexbox is set on the parent; the children become flex items automatically.",
                    fa: "فلکس روی والد تنظیم می‌شود؛ فرزندها خودبه‌خود آیتم‌های فلکس می‌شوند.",
                  },
                },
                {
                  q: {
                    en: "Which property adds equal, fixed spacing between flex items?",
                    fa: "کدام ویژگی بین آیتم‌های فلکس فاصله‌ای برابر و ثابت می‌گذارد؟",
                  },
                  options: [
                    { en: "`padding`", fa: "`padding`" },
                    { en: "`gap`", fa: "`gap`" },
                    { en: "`letter-spacing`", fa: "`letter-spacing`" },
                  ],
                  answer: 1,
                  explain: {
                    en: "`gap` is built for exactly this: constant space between items, no first/last edge cases.",
                    fa: "`gap` دقیقاً برای همین ساخته شده: فاصله‌ی ثابت بین آیتم‌ها، بدون دردسرِ اولی و آخری.",
                  },
                },
                {
                  q: {
                    en: "What does `justify-content: space-between` do?",
                    fa: "`justify-content: space-between` چه می‌کند؟",
                  },
                  options: [
                    { en: "Stacks items vertically", fa: "آیتم‌ها را عمودی می‌چیند" },
                    { en: "Centers all items", fa: "همه‌ی آیتم‌ها را وسط‌چین می‌کند" },
                    {
                      en: "First at the start, last at the end, equal gaps between",
                      fa: "اولی اول، آخری آخر، و فاصله‌های بین‌شان برابر",
                    },
                  ],
                  answer: 2,
                  explain: {
                    en: "space-between spreads items edge to edge with even gaps — great for navbars.",
                    fa: "space-between آیتم‌ها را از ابتدا تا انتها پهن می‌کند با فاصله‌های برابر — برای نوبارها عالی است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build a navbar", fa: "یک نوبار بساز" },
              brief: {
                en: "Under the `h1` in the header, wrap the three links in a `<div class='nav-row'>` and style it: `display: flex`, a `gap` of your choice, and `justify-content: center`. Keep all three links inside the nav.",
                fa: "زیر `h1` داخلِ header، سه لینک را داخلِ یک `<div class='nav-row'>` بپیچان و استایلش بده: `display: flex` و یک `gap` به انتخاب تو و `justify-content: center`. هر سه لینک باید داخلِ nav بمانند.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Site</title>
    </head>
    <body>
        <header>
            <h1>Arya's Corner</h1>
            <nav>
                <a href="https://teka.dev">Home</a>
                <a href="https://teka.dev">Projects</a>
                <a href="https://teka.dev">Contact</a>
            </nav>
        </header>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Site</title>
        <style>
            header {
                background: #0f172a;
                padding: 16px 24px;
            }
            h1 {
                color: white;
                margin-bottom: 12px;
            }
            .nav-row {
                display: flex;
                gap: 20px;
                justify-content: center;
            }
            .nav-row a {
                color: #7dd3fc;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Arya's Corner</h1>
            <nav>
                <div class="nav-row">
                    <a href="https://teka.dev">Home</a>
                    <a href="https://teka.dev">Projects</a>
                    <a href="https://teka.dev">Contact</a>
                </div>
            </nav>
        </header>
    </body>
</html>`,
              hints: [
                {
                  en: "Wrap the three <a> tags in <div class='nav-row'> ... </div>, still inside the nav.",
                  fa: "سه تگ `<a>` را داخلِ `<div class='nav-row'> ... </div>` بپیچان، همان‌طور که داخلِ nav هستند.",
                },
                {
                  en: "In the style tag: .nav-row { display: flex; gap: 20px; justify-content: center; }",
                  fa: "داخلِ تگ style: `.nav-row { display: flex; gap: 20px; justify-content: center; }`",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "nav a", count: 3 },
                  { selector: ".nav-row", count: 1 },
                  { selector: "style", text: "flex" },
                  { selector: "style", text: "gap" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 4 ────────────────────────────────────────────
    {
      id: "html-m4",
      title: { en: "Polish & Personality", fa: "پرداخت و شخصیت" },
      blurb: {
        en: "Gradients, shadows, hover magic, emoji icons and mobile-ready pages — ending with a Link-in-Bio mini project.",
        fa: "گرادیانت، سایه، جادوی hover، آیکون‌های ایموجی و صفحه‌های آماده‌ی موبایل — و در انتها یک مینی‌پروژه‌ی Link in Bio.",
      },
      lessons: [
        {
          id: "html-m4-l1",
          title: { en: "Gradients & shadows", fa: "گرادیانت و سایه" },
          goal: {
            en: "Style heroes with linear-gradient and add depth with box-shadow.",
            fa: "با `linear-gradient` هیرو بسازی و با `box-shadow` به صفحه عمق بدهی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Paint that flows", fa: "رنگی که جاری است" },
              blocks: [
                {
                  type: "text",
                  en: "Flat colors are honest; gradients are alive. `linear-gradient(to right, colorA, colorB)` paints a background that melts from one color into another. Direction first: `to right`, `to bottom`, `to bottom right` — or an angle like `135deg`.",
                  fa: "رنگِ تخت صادقانه است؛ گرادیانت (Gradient) زنده است. `linear-gradient(to right, colorA, colorB)` پس‌زمینه‌ای می‌سازد که از یک رنگ در رنگِ دیگر آب می‌شود. اول جهت: `to right` و `to bottom` و `to bottom right` — یا یک زاویه مثل `135deg`.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sunset Hero</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
            }
            .hero {
                background: linear-gradient(135deg, #f97316, #db2777);
                color: white;
                padding: 60px 24px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <section class="hero">
            <h1>Sunset Radio 🌅</h1>
            <p>Lo-fi beats for late-night coders.</p>
        </section>
    </body>
</html>`,
                  caption: {
                    en: "A full-width hero band in two colors — no image needed.",
                    fa: "یک نوارِ هیروی تمام‌عرض با دو رنگ — بدونِ هیچ عکسی.",
                  },
                },
                {
                  type: "text",
                  en: "Gradients replace background photos for banners, buttons and cards: zero downloads, perfectly sharp on every screen, tiny files. Two colors are enough — pick neighbours on the color wheel.",
                  fa: "گرادیانت می‌تواند جای عکسِ پس‌زمینه را برای بنر و دکمه و کارت بگیرد: هیچی دانلود نمی‌شود، روی هر صفحه‌ای شارپ می‌ماند و حجمِ فایل هم ریز است. دو رنگ کافی است — دو رنگِ همسایه را از چرخه‌ی رنگ انتخاب کن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Shadows: depth for free", fa: "سایه: عمقِ مجانی" },
              blocks: [
                {
                  type: "text",
                  en: "`box-shadow` lifts an element off the page. The recipe: horizontal offset, vertical offset, blur, color — `box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);`. The color often uses `rgba`, where the last number is transparency from 0 to 1.",
                  fa: "`box-shadow` عنصر را از صفحه بلند می‌کند. دستورِ پخت: جابه‌جاییِ افقی، جابه‌جاییِ عمودی، میزانِ محوی، رنگ — `box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);`. رنگ معمولاً `rgba` است که عددِ آخرش شفافیت است، از ۰ تا ۱.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Glow Card</title>
        <style>
            body {
                background: linear-gradient(to bottom, #1e1b4b, #312e81);
                font-family: Arial, sans-serif;
                padding: 40px;
            }
            .card {
                background: white;
                padding: 24px;
                border-radius: 16px;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>Midnight Club 🌙</h2>
            <p>Members get the good snacks.</p>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "White card, dark gradient page, one honest shadow — instant depth.",
                    fa: "کارتِ سفید، صفحه‌ی گرادیانتیِ تیره، یک سایه‌ی صادقانه — عمقِ فوری.",
                  },
                },
                {
                  type: "tip",
                  en: "Shadows that point straight down (first number 0) look like sunlight from above — the most natural choice. Huge blur + strong color = amateur; small blur + soft alpha = classy.",
                  fa: "سایه‌ای که مستقیم به پایین می‌رود (عددِ اول صفر) مثل نورِ آفتاب از بالا به نظر می‌رسد — طبیعی‌ترین انتخاب. محویِ غول‌پیکر و رنگِ پررنگ = تازه‌کاری؛ محویِ کم و شفافیتِ نرم = حرفه‌ای.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "Which line paints a two-color background?",
                    fa: "کدام خط یک پس‌زمینه‌ی دورنگ می‌سازد؟",
                  },
                  options: [
                    {
                      en: "`color: linear-gradient(blue, pink);`",
                      fa: "`color: linear-gradient(blue, pink);`",
                    },
                    {
                      en: "`background: linear-gradient(to right, #2563eb, #ec4899);`",
                      fa: "`background: linear-gradient(to right, #2563eb, #ec4899);`",
                    },
                    {
                      en: "`border: gradient(blue, pink);`",
                      fa: "`border: gradient(blue, pink);`",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "Gradients are background values — `color` paints text, not the box.",
                    fa: "گرادیانت مقدارِ background است — `color` رنگِ متن را عوض می‌کند، نه جعبه را.",
                  },
                },
                {
                  q: {
                    en: "In `box-shadow: 0 8px 20px rgba(0,0,0,0.25);` what is the `0`?",
                    fa: "در `box-shadow: 0 8px 20px rgba(0,0,0,0.25);` آن `0` چیست؟",
                  },
                  options: [
                    { en: "The transparency", fa: "شفافیت" },
                    { en: "The blur amount", fa: "میزانِ محوی" },
                    {
                      en: "The horizontal offset — no sideways shift",
                      fa: "جابه‌جاییِ افقی — یعنی هیچ جابه‌جایی به چپ و راست نیست",
                    },
                  ],
                  answer: 2,
                  explain: {
                    en: "Order is: horizontal, vertical, blur, color. Zero horizontal = the shadow falls straight down.",
                    fa: "ترتیب: افقی، عمودی، محوی، رنگ. افقیِ صفر یعنی سایه مستقیم می‌افتد پایین.",
                  },
                },
                {
                  q: {
                    en: "In `rgba(0, 0, 0, 0.25)`, what does `0.25` control?",
                    fa: "در `rgba(0, 0, 0, 0.25)` عددِ `0.25` چه چیزی را کنترل می‌کند؟",
                  },
                  options: [
                    {
                      en: "The transparency — 0 invisible, 1 solid",
                      fa: "شفافیت — صفر نامرئی، یک کاملاً مات",
                    },
                    { en: "The radius of the shadow", fa: "شعاعِ سایه" },
                    { en: "The rotation", fa: "چرخش" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Alpha is the last value: 0.25 means a soft, see-through black — perfect for shadows.",
                    fa: "آلفا آخرین عدد است: ‏0.25 یعنی مشکیِ نرم و نیمه‌شفاف — برای سایه عالی.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The glowing banner", fa: "بنرِ درخشان" },
              brief: {
                en: "Turn the `section` into a hero: give it `class='hero'`, then in a `<style>` give `.hero` a `background` that uses `linear-gradient` (pick your two colors), white `color`, `padding` and rounded corners — and add a `box-shadow` somewhere (the hero or a card).",
                fa: "`section` را به یک هیرو تبدیل کن: بهش `class='hero'` بده، بعد در یک `<style>` به `.hero` یک `background` با `linear-gradient` بده (دو رنگِ دلخواهت) و `color` سفید و `padding` و گوشه‌های گرد — و یک `box-shadow` هم جایی از صفحه اضافه کن (روی هیرو یا یک کارت).",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Launch Banner</title>
    </head>
    <body>
        <section>
            <h1>Nexus 2.0 is here!</h1>
            <p>Faster, brighter, yours.</p>
        </section>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Launch Banner</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
            }
            .hero {
                background: linear-gradient(120deg, #06b6d4, #7c3aed);
                color: white;
                padding: 60px 24px;
                border-radius: 24px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                text-align: center;
            }
        </style>
    </head>
    <body>
        <section class="hero">
            <h1>Nexus 2.0 is here!</h1>
            <p>Faster, brighter, yours.</p>
        </section>
    </body>
</html>`,
              hints: [
                {
                  en: "Add class='hero' to the section, then <style> with .hero { background: linear-gradient(...); }.",
                  fa: "به section کلاسِ `hero` را بده، بعد در `<style>` بنویس: `.hero { background: linear-gradient(...); }`.",
                },
                {
                  en: "Shadow recipe: box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); — four values, in order.",
                  fa: "دستورِ سایه: `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);` — چهار مقدار، به ترتیب.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".hero", count: 1 },
                  { selector: ".hero h1", count: 1 },
                  { selector: "style", text: "gradient" },
                  { selector: "style", text: "box-shadow" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m4-l2",
          title: { en: "Hover & transition", fa: "هاور و ترنزیشن" },
          goal: {
            en: "Make buttons and links respond to the pointer with :hover, and smooth the change with transition.",
            fa: "دکمه‌ها و لینک‌ها را با `:hover` به حرکتِ موس واکنش‌گو کنی و تغییرشان را با `transition` نرم و روان کنی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: ":hover — CSS listens to the mouse", fa: ":hover — گوش می‌دهد به موس" },
              blocks: [
                {
                  type: "text",
                  en: "So far CSS has been static. The `:hover` selector adds a second personality: rules inside `.btn:hover { }` apply ONLY while the visitor's pointer rests on the element. Move away — the rules vanish.",
                  fa: "تا حالا CSS ثابت بود. سلکتورِ `:hover` یک شخصیتِ دوم به عناصر می‌دهد: قانون‌هایی که داخلِ `.btn:hover { }` می‌نویسی فقط وقتی اجرا می‌شوند که نشانگرِ بازدیدکننده روی عنصر بایستد. نشانگر که برود، قانون‌ها هم می‌روند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Hover Demo</title>
        <style>
            body {
                background: #0f172a;
                font-family: Arial, sans-serif;
                text-align: center;
                padding-top: 80px;
            }
            .btn {
                background: #22d3ee;
                color: #083344;
                font-size: 20px;
                padding: 14px 32px;
                border: none;
                border-radius: 12px;
            }
            .btn:hover {
                background: #f472b6;
                color: white;
            }
        </style>
    </head>
    <body>
        <button class="btn">Hover me 🖱️</button>
    </body>
</html>`,
                  caption: {
                    en: "Run it, then sweep your pointer across the button.",
                    fa: "‏Run را بزن، بعد نشانگر را روی دکمه بچرخان.",
                  },
                },
                {
                  type: "tip",
                  en: "`:hover` works on anything: links, cards, list rows, whole sections. Hovering an entire card to lift its shadow is a favorite pro move.",
                  fa: "`:hover` روی هر چیزی کار می‌کند: لینک، کارت، سطرِ لیست، کلِ section. هاور روی کلِ کارت برای بلند کردنِ سایه‌اش، از حرکت‌های محبوبِ حرفه‌ای‌هاست.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "transition — the smooth operator", fa: "transition — نرم‌کننده‌ی حرفه‌ای" },
              blocks: [
                {
                  type: "text",
                  en: "Without help, hover changes snap instantly — blink and you miss it. `transition: background-color 0.3s;` on the element tells the browser: when background-color changes, take 0.3 seconds to glide there.",
                  fa: "بدون کمک، تغییرِ هاور در یک لحظه می‌پرد — پلک بزنی، از دستت رفته. `transition: background-color 0.3s;` روی عنصر به مرورگر می‌گوید: وقتی background-color عوض شد، ۰.۳ ثانیه وقت بگذار و نرم به رنگِ جدید بلغز.",
                },
                {
                  type: "warn",
                  en: "Put `transition` on the base element (`.btn`), NOT inside `:hover`. On the base, it animates the change in BOTH directions — arriving and leaving.",
                  fa: "`transition` را روی عنصرِ اصلی بگذار (`.btn`)، نه داخلِ `:hover`. روی عنصرِ اصلی، تغییر در «هر دو جهت» نرم می‌شود — هم ورود، هم خروج.",
                },
                {
                  type: "text",
                  en: "You can transition many properties: `background-color`, `color`, `box-shadow`, `border-radius`... List several: `transition: background-color 0.3s, box-shadow 0.3s;`.",
                  fa: "خیلی ویژگی‌ها را می‌شود transition داد: `background-color` و `color` و `box-shadow` و `border-radius`... چندتایش را پشت هم بنویس: `transition: background-color 0.3s, box-shadow 0.3s;`.",
                },
                {
                  type: "tip",
                  en: "Durations: 0.15s feels snappy, 0.3s is the friendly default, past 0.6s the interface feels sleepy.",
                  fa: "مدت‌ها: ‏0.15s تند و چابک است، ‏0.3s پیش‌فرضِ دوستانه و بالای 0.6s رابط به خواب‌آلودگی می‌زند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "When do `.btn:hover` rules apply?",
                    fa: "قوانینِ `.btn:hover` کی اجرا می‌شوند؟",
                  },
                  options: [
                    {
                      en: "While the pointer is over the element",
                      fa: "وقتی نشانگر روی عنصر است",
                    },
                    { en: "Only after a click", fa: "فقط بعد از کلیک" },
                    { en: "Always, on page load", fa: "همیشه، از لحظه‌ی باز شدنِ صفحه" },
                  ],
                  answer: 0,
                  explain: {
                    en: ":hover is a state — active exactly while the pointer rests on the element.",
                    fa: ":hover یک «حالت» است — دقیقاً وقتی فعال است که نشانگر روی عنصر بایستد.",
                  },
                },
                {
                  q: {
                    en: "Where should `transition` live so hover effects glide in AND out?",
                    fa: "`transition` کجا باید باشد تا افکتِ هاور هم هنگام ورود نرم باشد هم خروج؟",
                  },
                  options: [
                    { en: "Inside the `:hover` rule", fa: "داخلِ قانونِ `:hover`" },
                    {
                      en: "On the base element, e.g. `.btn`",
                      fa: "روی عنصرِ اصلی، مثل `.btn`",
                    },
                    { en: "Inside the `<body>` tag", fa: "داخلِ تگِ `<body>`" },
                  ],
                  answer: 1,
                  explain: {
                    en: "On the base element, the transition guards every change of that property — entering and leaving hover.",
                    fa: "روی عنصرِ اصلی، transition هر تغییری در آن ویژگی را نرم می‌کند — چه ورود به هاور، چه خروج از آن.",
                  },
                },
                {
                  q: {
                    en: "In `transition: color 0.4s;` what is `0.4s`?",
                    fa: "در `transition: color 0.4s;` مقدارِ `0.4s` چیست؟",
                  },
                  options: [
                    { en: "How long the change takes", fa: "اینکه تغییر چقدر طول می‌کشد" },
                    {
                      en: "How far the mouse must move",
                      fa: "اینکه موس باید چقدر حرکت کند",
                    },
                    {
                      en: "A delay before the page loads",
                      fa: "تأخیری قبل از باز شدنِ صفحه",
                    },
                  ],
                  answer: 0,
                  explain: {
                    en: "It is the duration of the animation: four tenths of a second from old value to new.",
                    fa: "مدتِ زمانِ انیمیشن است: چهار دهمِ ثانیه از مقدارِ قدیم تا جدید.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The breathing button", fa: "دکمه‌ای که نفس می‌کشد" },
              brief: {
                en: "Give the link `class='btn'`. In a `<style>`: style `.btn` (background, padding, border-radius) AND add a `.btn:hover` rule that changes its look (new background or color). Finish with `transition` on `.btn` so the change is smooth.",
                fa: "به لینک `class='btn'` بده. در یک `<style>`: به `.btn` استایل بده (background و padding و border-radius) و یک قانونِ `.btn:hover` هم بنویس که ظاهرش را عوض کند (رنگِ جدیدی برای background یا color). آخرش `transition` را روی `.btn` بگذار تا تغییر نرم باشد.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Join the Club</title>
    </head>
    <body>
        <a href="https://teka.dev">Join the club</a>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Join the Club</title>
        <style>
            body {
                background: #111827;
                font-family: Arial, sans-serif;
                text-align: center;
                padding-top: 80px;
            }
            .btn {
                background: #22d3ee;
                color: #083344;
                font-size: 20px;
                padding: 14px 32px;
                border-radius: 12px;
                text-decoration: none;
                transition: background-color 0.3s, color 0.3s;
            }
            .btn:hover {
                background: #f472b6;
                color: white;
            }
        </style>
    </head>
    <body>
        <a class="btn" href="https://teka.dev">Join the club</a>
    </body>
</html>`,
              hints: [
                {
                  en: "Two rules: .btn { ... } for the normal look, .btn:hover { ... } for the hover look.",
                  fa: "دو قانون: `.btn { ... }` برای ظاهرِ عادی و `.btn:hover { ... }` برای ظاهرِ هاور.",
                },
                {
                  en: "Then add to .btn: transition: background-color 0.3s; (on the base, not inside :hover).",
                  fa: "بعدش به `.btn` اضافه کن: `transition: background-color 0.3s;` (روی عنصرِ اصلی، نه داخلِ :hover).",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "a", count: 1 },
                  { selector: ".btn", count: 1 },
                  { selector: "style", text: "hover" },
                  { selector: "style", text: "transition" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m4-l3",
          title: { en: "Emoji icons & phones", fa: "آیکون‌های ایموجی و گوشی‌ها" },
          goal: {
            en: "Use emoji as zero-download icons and add the viewport meta so the page fits phones.",
            fa: "از ایموجی به‌عنوان آیکون‌های بدونِ دانلود استفاده کنی و متای viewport را اضافه کنی تا صفحه در گوشی جا شود.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              title: { en: "The free icon set", fa: "مجموعه‌ی آیکونِ مجانی" },
              blocks: [
                {
                  type: "text",
                  en: "Real sites sprinkle icons everywhere: next to menu items, features, buttons. Icons usually mean image files... but emoji are icons that are already on every device: 🚀 ⚡ 🎧 🌱 🍋. Zero downloads, always colorful.",
                  fa: "سایت‌های واقعی همه‌جا آیکون می‌پاشند: کنارِ آیتم‌های منو، کنارِ ویژگی‌ها، روی دکمه‌ها. آیکون معمولاً یعنی فایلِ عکس... ولی ایموجی آیکون‌هایی هستند که از قبل روی همه‌ی دستگاه‌ها نصب‌اند: 🚀 ⚡ 🎧 🌱 🍋. بدونِ دانلود، همیشه رنگی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Features</title>
        <style>
            body {
                background: #fefce8;
                font-family: Arial, sans-serif;
            }
            .feature {
                background: white;
                padding: 12px 16px;
                margin: 10px;
                border-radius: 12px;
                font-size: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Why Nexus? 🤔</h1>
        <div class="feature">⚡ Fast builds</div>
        <div class="feature">🎧 Human support</div>
        <div class="feature">🌱 Planet friendly</div>
    </body>
</html>`,
                  caption: {
                    en: "Emoji carry the design — no icon library, no image files.",
                    fa: "ایموجی‌ها بارِ طراحی را به دوش می‌کشند — نه کتابخانه‌ی آیکون، نه فایلِ عکس.",
                  },
                },
                {
                  type: "tip",
                  en: "Bigger emoji = bigger icons: set `font-size` on the element holding the emoji. An emoji inside a rounded, shadowed box IS a feature card.",
                  fa: "ایموجیِ بزرگ‌تر = آیکونِ بزرگ‌تر: برای عنصری که ایموجی دارد `font-size` را بالا ببر. یک ایموجی داخلِ جعبه‌ی گرد و سایه‌دار، خودش یک کارتِ ویژگی است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Phones deserve better", fa: "گوشی‌ها لایقِ بهترند" },
              blocks: [
                {
                  type: "text",
                  en: "Half of the web is browsed on phones. Without one line, a phone pretends to be a wide desktop monitor and zooms way out — your beautiful page shrinks into a tiny unreadable map. The fix is the viewport meta, in the head of every page:",
                  fa: "نصفِ وب با گوشی دیده می‌شود. بدونِ یک خط، گوشی خودش را مانیتورِ پهنِ دسکتاپ جا می‌زند و خیلی زوم‌اوت می‌کند — صفحه‌ی خوشگلت ریز می‌شود مثل نقشه‌ی یک شهر. راه‌حل متای viewport است، در head هر صفحه:",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Mobile Ready</title>
        <style>
            body {
                background: #ecfeff;
                font-family: Arial, sans-serif;
            }
            nav {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
            }
        </style>
    </head>
    <body>
        <h1>I fit phones now 📱</h1>
        <nav>
            <a href="https://teka.dev">🏠 Home</a>
            <a href="https://teka.dev">🖼️ Gallery</a>
            <a href="https://teka.dev">📬 Contact</a>
        </nav>
    </body>
</html>`,
                  caption: {
                    en: "The viewport meta + flex-wrap: the two-line mobile kit.",
                    fa: "متای viewport به‌اضافه‌ی flex-wrap: کیتِ دوخطیِ موبایل.",
                  },
                },
                {
                  type: "warn",
                  en: "Copy the viewport line EXACTLY: `<meta name='viewport' content='width=device-width, initial-scale=1'>`. It is invisible on desktop — but every phone thanks you.",
                  fa: "خطِ viewport را دقیقاً کپی کن: `<meta name='viewport' content='width=device-width, initial-scale=1'>`. روی دسکتاپ دیده نمی‌شود — ولی هر گوشی‌ای از تو تشکر می‌کند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "What does the viewport meta do?",
                    fa: "متای viewport چه می‌کند؟",
                  },
                  options: [
                    {
                      en: "Makes the page load faster",
                      fa: "باعث می‌شود صفحه سریع‌تر بالا بیاید",
                    },
                    {
                      en: "Tells phones to render the page at the device's real width",
                      fa: "به گوشی می‌گوید صفحه را با عرضِ واقعیِ دستگاه رندر کند",
                    },
                    {
                      en: "Changes the page's language",
                      fa: "زبانِ صفحه را عوض می‌کند",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "Without it, phones fake a desktop screen and zoom out. With it, your page matches the phone's width.",
                    fa: "بدون آن، گوشی خودش را دسکتاپ جا می‌زند و زوم‌اوت می‌کند. با آن، صفحه با عرضِ واقعیِ گوشی هم‌عرض می‌شود.",
                  },
                },
                {
                  q: {
                    en: "Where does `<meta name='viewport' ...>` go?",
                    fa: "`<meta name='viewport' ...>` کجا می‌رود؟",
                  },
                  options: [
                    { en: "Inside `<head>`", fa: "داخلِ `<head>`" },
                    { en: "Inside `<body>`", fa: "داخلِ `<body>`" },
                    { en: "Inside `<style>`", fa: "داخلِ `<style>`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "All meta tags live in the head — it is the browser's information room.",
                    fa: "همه‌ی متاها در head زندگی می‌کنند — اتاقِ اطلاعاتِ مرورگر.",
                  },
                },
                {
                  q: {
                    en: "Why use emoji instead of icon image files here?",
                    fa: "چرا به‌جای فایلِ عکسِ آیکون از ایموجی استفاده می‌کنیم؟",
                  },
                  options: [
                    {
                      en: "Emoji come from a paid CDN",
                      fa: "ایموجی‌ها از یک CDN پولی می‌آیند",
                    },
                    {
                      en: "Emoji are higher resolution than photos",
                      fa: "ایموجی‌ها رزولوشن‌شان از عکس بالاتر است",
                    },
                    {
                      en: "Emoji need no downloads and work offline on every device",
                      fa: "ایموجی دانلود نمی‌خواهند و آفلاین هم روی همه‌ی دستگاه‌ها کار می‌کنند",
                    },
                  ],
                  answer: 2,
                  explain: {
                    en: "Emoji are characters, not files — they ship with the device's fonts, so they work even fully offline.",
                    fa: "ایموجی «حرف» هستند، نه فایل — با فونت‌های خودِ دستگاه می‌آیند، پس حتی کاملاً آفلاین هم کار می‌کنند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Go mobile", fa: "موبایلی شو" },
              brief: {
                en: "Upgrade this page for phones: add the viewport meta to the head, and build a `nav` containing exactly three links — each starting with a different emoji.",
                fa: "این صفحه را برای گوشی‌ها آماده کن: متای viewport را به head اضافه کن و یک `nav` بساز که دقیقاً سه لینک دارد — هر کدام با یک ایموجیِ متفاوت شروع می‌شود.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Cafe Luna</title>
    </head>
    <body>
        <h1>Cafe Luna 🌙</h1>
        <p>Open 9 to 23, every day.</p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Cafe Luna</title>
        <style>
            body {
                background: #faf5ff;
                font-family: Arial, sans-serif;
            }
            nav {
                display: flex;
                gap: 18px;
                flex-wrap: wrap;
            }
        </style>
    </head>
    <body>
        <h1>Cafe Luna 🌙</h1>
        <p>Open 9 to 23, every day.</p>
        <nav>
            <a href="https://teka.dev">☕ Menu</a>
            <a href="https://teka.dev">🍰 Sweets</a>
            <a href="https://teka.dev">📍 Find us</a>
        </nav>
    </body>
</html>`,
              hints: [
                {
                  en: "The meta line goes in the head, under the charset meta: <meta name='viewport' content='width=device-width, initial-scale=1'>.",
                  fa: "خطِ متا در head می‌رود، زیرِ متای charset: <meta name='viewport' content='width=device-width, initial-scale=1'>.",
                },
                {
                  en: "Then: <nav> with three <a> tags — start each link text with an emoji, like 🍩 Donuts.",
                  fa: "بعدش: یک `<nav>` با سه تگ `<a>` — متنِ هر لینک را با ایموجی شروع کن، مثل «🍩 Donuts».",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "meta[name='viewport']", count: 1 },
                  { selector: "nav", count: 1 },
                  { selector: "nav a", count: 3 },
                  { selector: "h1", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m4-l4",
          title: { en: "Mini-project: Link in Bio", fa: "مینی‌پروژه: Link in Bio" },
          goal: {
            en: "Combine gradients, the box model, classes, flex and hover into one polished card page.",
            fa: "گرادیانت و مدلِ جعبه‌ای و کلاس‌ها و فلکس و هاور را در یک صفحه‌ی کارتِ تر و تمیز ترکیب کنی.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "One card, whole personality", fa: "یک کارت، تمامِ شخصیت" },
              blocks: [
                {
                  type: "text",
                  en: "You have seen them: the link-in-bio pages people put in their social bios. One centered card: round avatar, name, one-line bio, and a stack of buttons. It is the perfect mini project — every Module 3 and 4 skill in a single page.",
                  fa: "دیدی‌شان؟ همان صفحه‌های Link in Bio که آدم‌ها در بایوی شبکه‌های اجتماعی می‌گذارند. یک کارت در وسط: آواتارِ گرد، نام، بایوی یک‌خطی و چند دکمه‌ی زیر هم. مینی‌پروژه‌ی بی‌نقصی است — همه‌ی مهارت‌های ماژول ۳ و ۴ در یک صفحه.",
                },
                {
                  type: "text",
                  en: "The avatar trick from Module 3: a square div + `border-radius: 50%` = circle. Put an emoji inside at a big `font-size` and center it with `text-align: center` plus a matching `line-height`.",
                  fa: "ترفندِ آواتار از ماژول ۳: یک div مربعی به‌اضافه‌ی `border-radius: 50%` می‌شود دایره. داخلش یک ایموجی با `font-size` بزرگ بگذار و با `text-align: center` و یک `line-height` هم‌اندازه، وسطش نگه دار.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Arya Links</title>
        <style>
            body {
                background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 40px 16px;
            }
            .avatar {
                width: 90px;
                height: 90px;
                background: white;
                border-radius: 50%;
                font-size: 44px;
                line-height: 90px;
                margin: 0 auto;
            }
        </style>
    </head>
    <body>
        <div class="avatar">🦊</div>
        <h2>Arya Codes</h2>
        <p>Building tiny websites and big dreams.</p>
    </body>
</html>`,
                  caption: {
                    en: "Circle avatar: fixed size + border-radius: 50% + line-height as the vertical centerer.",
                    fa: "آواتارِ دایره‌ای: اندازه‌ی ثابت به‌اضافه‌ی `border-radius: 50%` به‌اضافه‌ی `line-height` برای وسط‌چینِ عمودی.",
                  },
                },
                {
                  type: "text",
                  en: "Buttons: each link gets `class='link-btn'` and `display: block` so it stretches like a real button; add `margin` between them and a `:hover` glow (`box-shadow`) with a `transition`.",
                  fa: "دکمه‌ها: به هر لینک `class='link-btn'` بده و `display: block` تا مثل دکمه‌ی واقعی کش بیاید؛ بین‌شان `margin` بگذار و یک هاله‌ی `:hover` (همان `box-shadow`) با `transition` اضافه کن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The build plan", fa: "نقشه‌ی ساخت" },
              blocks: [
                {
                  type: "text",
                  en: "The checklist, top to bottom: gradient body background, then `.card` (white, rounded, padded, shadowed), then the `.avatar` circle with your emoji, name (`h2`), one-line bio (`p`), three `.link-btn` links, and finally the `:hover` glow + `transition`.",
                  fa: "چک‌لیست از بالا به پایین: پس‌زمینه‌ی گرادیانتی برای body، بعد `.card` (سفید، گرد، با padding و سایه)، بعد دایره‌ی `.avatar` با ایموجیت، نام (`h2`)، بایوی یک‌خطی (`p`)، سه لینکِ `.link-btn` و آخرش هاله‌ی `:hover` به‌اضافه‌ی `transition`.",
                },
                {
                  type: "tip",
                  en: "Reuse beats repeat: all three buttons share ONE `.link-btn` rule. Change the color once — all three follow. Classes were built for exactly this moment.",
                  fa: "استفاده‌ی مجدد بهتر از تکرار است: هر سه دکمه یک قانونِ `.link-btn` را به اشتراک می‌گذارند. رنگ را یک‌بار عوض کن — هر سه دنباله‌رو می‌شوند. کلاس‌ها دقیقاً برای همین لحظه ساخته شده‌اند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "Square div → perfect circle. What is missing?",
                    fa: "یک div مربعی → دایره‌ی کامل. چه چیزی کم دارد؟",
                  },
                  options: [
                    { en: "`border-radius: 50%`", fa: "`border-radius: 50%`" },
                    { en: "`border: none`", fa: "`border: none`" },
                    { en: "`padding: 100%`", fa: "`padding: 100%`" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Half-rounding every corner of a square is the circle trick used by every avatar on the web.",
                    fa: "گرد کردنِ نیم‌مسیرِ همه‌ی گوشه‌های مربع، همان ترفندِ دایره است که همه‌ی آواتارهای وب از آن استفاده می‌کنند.",
                  },
                },
                {
                  q: {
                    en: "Why give all three buttons the same class?",
                    fa: "چرا هر سه دکمه یک کلاسِ مشترک می‌گیرند؟",
                  },
                  options: [
                    {
                      en: "So the page loads faster",
                      fa: "تا صفحه سریع‌تر بالا بیاید",
                    },
                    {
                      en: "Because ids are meant for groups",
                      fa: "چون آیدی‌ها برای گروه‌ها ساخته شده‌اند",
                    },
                    {
                      en: "So one rule styles them all and future edits stay one-line",
                      fa: "تا یک قانون هر سه را استایل کند و ویرایش‌های بعدی تک‌خطی بمانند",
                    },
                  ],
                  answer: 2,
                  explain: {
                    en: "Shared class = shared rule. Restyle three buttons by editing one line.",
                    fa: "کلاسِ مشترک یعنی قانونِ مشترک. با یک خط، هر سه دکمه ری‌استایل می‌شوند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Your Link in Bio", fa: "لینک‌های بیوگرافی تو" },
              brief: {
                en: "Build YOUR page: a gradient background on `body`; a `.card` containing a round `.avatar` div (any emoji), your name in an `h2`, and a one-line `p` bio. Then, below the card, exactly three links with `class='link-btn'` (href can be https://teka.dev). Add a `.link-btn:hover` glow with a `transition`.",
                fa: "صفحه‌ی خودت را بساز: پس‌زمینه‌ی گرادیانتی برای `body`؛ یک `.card` که داخلش دایره‌ی `.avatar` (با هر ایموجی) و نامِ تو در یک `h2` و یک بایوی یک‌خطی در `p` باشد. بعد، زیرِ کارت، دقیقاً سه لینک با `class='link-btn'` (href می‌تواند https://teka.dev باشد). یک هاله‌ی `.link-btn:hover` با `transition` هم اضافه کن.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>My Links</title>
    </head>
    <body>
        <div class="card">
            <h2>My Name</h2>
            <p>One line about me.</p>
        </div>
        <a href="https://teka.dev">My website</a>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>My Links</title>
        <style>
            body {
                background: linear-gradient(135deg, #f97316, #ec4899);
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 40px 16px;
            }
            .card {
                background: white;
                padding: 28px;
                border-radius: 20px;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
            }
            .avatar {
                width: 90px;
                height: 90px;
                background: linear-gradient(135deg, #fbbf24, #f97316);
                border-radius: 50%;
                font-size: 44px;
                line-height: 90px;
                margin: 0 auto;
            }
            .link-btn {
                display: block;
                background: #1e293b;
                color: white;
                padding: 12px;
                border-radius: 12px;
                margin: 10px 0;
                text-decoration: none;
                transition: box-shadow 0.3s;
            }
            .link-btn:hover {
                box-shadow: 0 0 0 3px #fbbf24;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="avatar">🦊</div>
            <h2>Arya Codes</h2>
            <p>Building tiny websites and big dreams.</p>
        </div>
        <a class="link-btn" href="https://teka.dev">🚀 My projects</a>
        <a class="link-btn" href="https://teka.dev">📝 My blog</a>
        <a class="link-btn" href="https://teka.dev">📬 Say hello</a>
    </body>
</html>`,
              hints: [
                {
                  en: "Circle avatar: a div with class avatar, width 90px, height 90px, border-radius 50%, font-size 44px, line-height 90px.",
                  fa: "آواتارِ گرد: یک div با کلاسِ avatar و `width: 90px` و `height: 90px` و `border-radius: 50%` و `font-size: 44px` و `line-height: 90px`.",
                },
                {
                  en: "Then three <a class='link-btn' href='https://teka.dev'> under the card, plus .link-btn { display: block; } and .link-btn:hover { box-shadow: ...; }.",
                  fa: "بعد سه تا `<a class='link-btn' href='https://teka.dev'>` زیرِ کارت، به‌اضافه‌ی `.link-btn { display: block; }` و `.link-btn:hover { box-shadow: ...; }`.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".card", count: 1 },
                  { selector: ".avatar", count: 1 },
                  { selector: ".link-btn", count: 3 },
                  { selector: "style", text: "hover" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 5 ────────────────────────────────────────────
    {
      id: "html-m5",
      title: { en: "The Big Build", fa: "ساختِ بزرگ" },
      blurb: {
        en: "Plan, build and ship a complete personal profile page — hero, about, skills, projects, contact form, footer, mobile-friendly.",
        fa: "یک صفحه‌ی پروفایلِ کامل را برنامه‌ریزی کن، بساز و تحویل بده — هیرو، درباره‌من، مهارت‌ها، پروژه‌ها، فرمِ تماس و فوتر؛ موبایل‌پسند.",
      },
      lessons: [
        {
          id: "html-m5-l1",
          title: { en: "Plan like a pro", fa: "مثل حرفه‌ای‌ها برنامه‌ریزی کن" },
          goal: {
            en: "Sketch a page as wireframe sections and give each one a semantic id.",
            fa: "صفحه را به‌صورت وایرفریمِ بخش‌بخش بکشی و به هر بخش یک id معنایی بدهی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Boxes before paint", fa: "اول جعبه‌ها، بعد رنگ" },
              blocks: [
                {
                  type: "text",
                  en: "Professionals never start with colors. They sketch a WIREFRAME: gray boxes with labels, nothing else. It answers 'what goes where' before 'what does it look like' — and saves hours of repaints.",
                  fa: "حرفه‌ای‌ها هیچ‌وقت با رنگ شروع نمی‌کنند. اول یک وایرفریم (Wireframe) می‌کشند: جعبه‌های خاکستری با برچسب، همین. وایرفریم قبل از «چه شکلی باشد» به «چه چیزی کجا باشد» جواب می‌دهد — و ساعت‌ها رنگ‌آمیزیِ دوباره را حذف می‌کند.",
                },
                {
                  type: "text",
                  en: "Our profile page, top to bottom: hero (name + one-line pitch), about (short story), skills (badges), projects (cards), contact (form), footer (sign-off). Six boxes — your whole page.",
                  fa: "صفحه‌ی پروفایل ما، از بالا به پایین: هیرو (نام به‌اضافه‌ی یک جمله)، درباره‌من (داستانِ کوتاه)، مهارت‌ها (نشان‌ها)، پروژه‌ها (کارت‌ها)، تماس (فرم) و فوتر (امضا). شش جعبه — همین کلِ صفحه‌ات است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Wireframe</title>
        <style>
            .wire {
                border: 2px dashed #94a3b8;
                padding: 16px;
                margin: 8px;
                color: #475569;
                font-family: Arial, sans-serif;
            }
        </style>
    </head>
    <body>
        <div class="wire">HERO: name + tagline</div>
        <div class="wire">ABOUT: my story</div>
        <div class="wire">SKILLS: badges</div>
        <div class="wire">PROJECTS: cards</div>
        <div class="wire">CONTACT: form</div>
        <div class="wire">FOOTER: sign-off</div>
    </body>
</html>`,
                  caption: {
                    en: "A wireframe: structure only, zero decoration.",
                    fa: "یک وایرفریم: فقط ساختار، بدونِ هیچ تزئینی.",
                  },
                },
                {
                  type: "tip",
                  en: "Paper works too. Draw six rectangles on paper, label them, THEN open the editor. Two minutes of sketching saves twenty minutes of reorganizing.",
                  fa: "کاغذ هم جواب می‌دهد. شش مستطیل روی کاغذ بکش، برچسب بزن، بعد ادیتور را باز کن. دو دقیقه طرح‌کشی، بیست دقیقه جابه‌جاییِ بعدی را کم می‌کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "From boxes to tags", fa: "از جعبه تا تگ" },
              blocks: [
                {
                  type: "text",
                  en: "Each wireframe box becomes real HTML: the hero is a `header` or a section with `id='hero'`, the story a `section id='about'`, and so on. Name ids after purpose — you will reuse them in CSS rules and in `href='#about'` links.",
                  fa: "هر جعبه‌ی وایرفریم HTML واقعی می‌شود: هیرو یک `header` است یا یک section با `id='hero'`، داستان یک `section id='about'` و همین‌طور تا آخر. آیدی‌ها را به نامِ نقششان بگذار — بعداً در قوانین CSS و در لینک‌های `href='#about'` دوباره به‌کارشان می‌بری.",
                },
                {
                  type: "warn",
                  en: "Do not skip the plan because 'it is a small page'. Small pages grow. The habit of plan → build → style is what separates websites from tag soup.",
                  fa: "به این بهانه که «صفحه کوچک است» نقشه را نپَر. صفحاتِ کوچک بزرگ می‌شوند. عادتِ «نقشه ← ساخت ← استایل» همان چیزی است که وب‌سایت را از «سوپِ تگ» جدا می‌کند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "A wireframe is…",
                    fa: "یک وایرفریم چیست؟",
                  },
                  options: [
                    {
                      en: "The final page with colors and shadows",
                      fa: "صفحه‌ی نهایی با رنگ و سایه",
                    },
                    {
                      en: "A rough sketch of the page's blocks, before any styling",
                      fa: "یک طرحِ خام از بلوک‌های صفحه، قبل از هر استایلی",
                    },
                    {
                      en: "A tool for testing browsers",
                      fa: "ابزاری برای تستِ مرورگرها",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "Wireframes fix structure and content placement first; paint comes later.",
                    fa: "وایرفریم اول ساختار و جای محتوا را قطعی می‌کند؛ رنگ و ظاهر بعداً می‌آید.",
                  },
                },
                {
                  q: {
                    en: "What belongs at the very top of a profile page?",
                    fa: "در بالاترین نقطه‌ی صفحه‌ی پروفایل چه چیزی می‌نشیند؟",
                  },
                  options: [
                    { en: "The footer", fa: "فوتر" },
                    { en: "The contact form", fa: "فرمِ تماس" },
                    {
                      en: "The hero: name plus a one-line pitch",
                      fa: "هیرو: نام به‌اضافه‌ی یک جمله",
                    },
                  ],
                  answer: 2,
                  explain: {
                    en: "The hero greets visitors first — name and pitch. Contact and footer wrap up the bottom.",
                    fa: "هیرو اول به بازدیدکننده سلام می‌کند — نام و یک جمله. تماس و فوتر پایین صفحه جمع می‌شوند.",
                  },
                },
                {
                  q: {
                    en: "Why plan sections before styling?",
                    fa: "چرا قبل از استایل دادن، بخش‌ها را برنامه‌ریزی می‌کنیم؟",
                  },
                  options: [
                    {
                      en: "Browsers refuse unstyled pages",
                      fa: "مرورگرها صفحه‌ی بی‌استایل را رد می‌کنند",
                    },
                    {
                      en: "Structure first means fewer rebuilds when design changes",
                      fa: "اولِ ساختار یعنی بعداً با تغییرِ طراحی، بازسازیِ کمتری لازم است",
                    },
                    {
                      en: "Planning makes CSS run faster",
                      fa: "برنامه‌ریزی باعث می‌شود CSS سریع‌تر اجرا شود",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "Solid structure survives redesigns — you repaint it, not rebuild it.",
                    fa: "ساختارِ محکم از ردیزاین جان به در می‌برد — آن را فقط رنگ دوباره می‌زنی، نه از نو می‌سازی.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Wireframe to HTML", fa: "از وایرفریم تا HTML" },
              brief: {
                en: "Build the skeleton of your profile: a `<main>` containing five sections with ids `hero`, `about`, `skills`, `projects` and `contact`. Give each section an `h2` label. Optional: the dashed-wire styling from the lesson.",
                fa: "اسکلتِ صفحه‌ی پروفایلت را بساز: یک `<main>` که پنج section دارد با آیدی‌های `hero` و `about` و `skills` و `projects` و `contact`. به هر section یک برچسبِ `h2` بده. اختیاری: همان استایلِ خط‌چینِ وایرفریم که در درس دیدی.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Profile - Plan</title>
    </head>
    <body>
        <main>
            <h1>My Profile</h1>
            <p>Sections coming soon...</p>
        </main>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Profile - Plan</title>
        <style>
            .wire {
                border: 2px dashed #94a3b8;
                padding: 16px;
                margin: 8px;
            }
        </style>
    </head>
    <body>
        <main>
            <section id="hero" class="wire">
                <h2>HERO: name + tagline</h2>
            </section>
            <section id="about" class="wire">
                <h2>ABOUT: my story</h2>
            </section>
            <section id="skills" class="wire">
                <h2>SKILLS: badges</h2>
            </section>
            <section id="projects" class="wire">
                <h2>PROJECTS: cards</h2>
            </section>
            <section id="contact" class="wire">
                <h2>CONTACT: form</h2>
            </section>
        </main>
    </body>
</html>`,
              hints: [
                {
                  en: "Five sections, each like: <section id='about'> <h2>...</h2> </section>, all inside <main>.",
                  fa: "پنج section، هرکدام شبیهِ `<section id='about'> <h2>...</h2> </section>`، و همه داخلِ `<main>`.",
                },
                {
                  en: "Ids must match exactly: hero, about, skills, projects, contact — lowercase.",
                  fa: "آیدی‌ها باید دقیقاً همین باشند: hero و about و skills و projects و contact — با حروفِ کوچک.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "main", count: 1 },
                  { selector: "#hero", count: 1 },
                  { selector: "#about", count: 1 },
                  { selector: "#skills", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m5-l2",
          title: { en: "Header, nav & hero", fa: "هدر، منو و هیرو" },
          goal: {
            en: "Build the page top: a flexbox nav inside a header, then a gradient hero and an about section.",
            fa: "بالای صفحه را بسازی: نوبارِ فلکسی داخلِ header، بعد یک هیروی گرادیانتی و یک بخشِ درباره‌من.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "First impressions", fa: "برداشتِ اول" },
              blocks: [
                {
                  type: "text",
                  en: "Visitors judge your page in two seconds. The top must answer: WHO is this (name), WHAT is it (one-line pitch), WHERE can I go (nav). That is the header + hero combo.",
                  fa: "بازدیدکننده در دو ثانیه قضاوتت می‌کند. بالای صفحه باید به این‌ها جواب بدهد: این کیست (نام)، کارش چیست (یک جمله)، و کجاها می‌شود رفت (منو). یعنی همان ترکیبِ header به‌اضافه‌ی hero.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Arya - Profile</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f8fafc;
            }
            header {
                background: #0f172a;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .logo {
                color: white;
                font-size: 20px;
            }
            nav {
                display: flex;
                gap: 16px;
            }
            nav a {
                color: #7dd3fc;
                text-decoration: none;
            }
            #hero {
                background: linear-gradient(120deg, #06b6d4, #7c3aed);
                color: white;
                padding: 56px 24px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <header>
            <div class="logo">AC</div>
            <nav>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
        <section id="hero">
            <h1>Hi, I am Arya 👋</h1>
            <p>I build small, fast, friendly websites.</p>
        </section>
    </body>
</html>`,
                  caption: {
                    en: "Flex header, gradient hero — the two-second handshake of your page.",
                    fa: "هدرِ فلکسی، هیروی گرادیانتی — دو ثانیه‌ی اولِ معرفیِ صفحه‌ات.",
                  },
                },
                {
                  type: "text",
                  en: "Two flexboxes do the work: `header` becomes a flex row so logo and nav sit on opposite ends (`justify-content: space-between`), and the `nav` is a flex row of links with `gap`.",
                  fa: "دو فلکس کار را انجام می‌دهند: `header` یک ردیفِ فلکسی می‌شود تا لوگو و منو دو سرِ صفحه بنشینند (`justify-content: space-between`)، و `nav` هم ردیفی از لینک‌ها با `gap`.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The about section", fa: "بخشِ درباره‌من" },
              blocks: [
                {
                  type: "text",
                  en: "About = three honest sentences: who you are, what you are learning or building, one fun fact. Resist the essay. A visitor who wants more will contact you.",
                  fa: "درباره‌من یعنی سه جمله‌ی صادقانه: کی هستی، چه می‌سازی یا چه یاد می‌گیری، و یک نکته‌ی جالب. وسوسه‌ی مقاله‌نویسی نشو. بازدیدکننده‌ای که بیشتر بخواهد، خودش تماس می‌گیرد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>About</title>
        <style>
            body {
                background: #ffffff;
                font-family: Arial, sans-serif;
            }
            #about {
                padding: 32px 24px;
            }
            #about h2 {
                color: #0f172a;
            }
            #about p {
                color: #475569;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <section id="about">
            <h2>About me</h2>
            <p>I am Arya, 15, from Tehran. I started HTML three
            weeks ago and I am already building pages like this
            one. Fun fact: my first program was a quiz about cats.</p>
        </section>
    </body>
</html>`,
                  caption: {
                    en: "Calm colors after a loud hero — contrast gives the page rhythm.",
                    fa: "بعد از هیروی پر سر و صدا، رنگ‌های آرام — تضاد به صفحه ریتم می‌دهد.",
                  },
                },
                {
                  type: "tip",
                  en: "White text needs a background dark or saturated enough to carry it. On light backgrounds, switch to a dark text color — contrast is not decoration, it is respect for the reader.",
                  fa: "متنِ سفید به پس‌زمینه‌ای به‌اندازه‌ی کافی تیره یا پررنگ نیاز دارد که آن را حمل کند. روی پس‌زمینه‌ی روشن، رنگِ متن را تیره کن — تضاد، تزئین نیست؛ احترام به خواننده است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "To pin the logo left and the nav right in one header row…",
                    fa: "برای اینکه لوگو یک سمت و منو سمتِ دیگرِ یک ردیفِ هدر بنشیند…",
                  },
                  options: [
                    {
                      en: "Give the header `display: flex` + `justify-content: space-between`",
                      fa: "به header بده `display: flex` به‌اضافه‌ی `justify-content: space-between`",
                    },
                    {
                      en: "Put the nav inside the logo",
                      fa: "منو را داخلِ لوگو بگذاری",
                    },
                    {
                      en: "Give the logo `position: top`",
                      fa: "به لوگو بدهی `position: top`",
                    },
                  ],
                  answer: 0,
                  explain: {
                    en: "Flex on the header + space-between pushes the two children to opposite ends.",
                    fa: "فلکس روی header به‌اضافه‌ی space-between دو فرزند را به دو سرِ ردیف می‌فرستد.",
                  },
                },
                {
                  q: {
                    en: "Links like `href='#about'` do what?",
                    fa: "لینک‌هایی مثل `href='#about'` چه می‌کنند؟",
                  },
                  options: [
                    {
                      en: "Open about.teka.dev",
                      fa: "about.teka.dev را باز می‌کنند",
                    },
                    {
                      en: "Jump to the element with id='about' on the same page",
                      fa: "به عنصری که id آن about است، در همان صفحه پرش می‌کنند",
                    },
                    {
                      en: "Delete the about section",
                      fa: "بخشِ درباره‌من را حذف می‌کنند",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "A hash link scrolls to the matching id — that is why section ids matter.",
                    fa: "لینکِ هش‌دار به عنصری که idِ متناظر دارد اسکرول می‌کند — برای همین آیدیِ بخش‌ها مهم است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Top of your page", fa: "بالای صفحه‌ات" },
              brief: {
                en: "Build the top of YOUR profile: a `header` whose `nav` contains exactly three links (hrefs like `#about` are fine) — and a `section id='hero'` with a gradient background containing an `h1` (your name) and a `p` (your pitch). Then a `section id='about'` with an `h2` and one `p`.",
                fa: "بالای صفحه‌ی خودت را بساز: یک `header` که `nav` آن دقیقاً سه لینک دارد (href مثل `#about` کافی است) — و یک `section id='hero'` با پس‌زمینه‌ی گرادیانتی که داخلش یک `h1` (نامِ تو) و یک `p` (جمله‌ی تو) باشد. بعدش هم یک `section id='about'` با یک `h2` و یک `p`.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>My Profile</title>
    </head>
    <body>
        <h1>My Profile</h1>
        <p>The top of my page is under construction.</p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>My Profile</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
            }
            header {
                background: #0f172a;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .logo {
                color: white;
                font-size: 20px;
            }
            nav {
                display: flex;
                gap: 16px;
            }
            nav a {
                color: #7dd3fc;
                text-decoration: none;
            }
            #hero {
                background: linear-gradient(120deg, #06b6d4, #7c3aed);
                color: white;
                padding: 56px 24px;
                text-align: center;
            }
            #about {
                padding: 32px 24px;
            }
            #about p {
                color: #475569;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <header>
            <div class="logo">AC</div>
            <nav>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
        <section id="hero">
            <h1>Hi, I am Arya 👋</h1>
            <p>I build small, fast, friendly websites.</p>
        </section>
        <section id="about">
            <h2>About me</h2>
            <p>Three weeks into HTML and already building pages.</p>
        </section>
    </body>
</html>`,
              hints: [
                {
                  en: "Nav links first: <nav><a href='#about'>About</a> ... </nav> inside <header> — three of them.",
                  fa: "اول لینک‌های nav: داخلِ `<header>` بنویس `<nav><a href='#about'>About</a> ... </nav>` — سه تا.",
                },
                {
                  en: "Then the hero: <section id='hero'> with h1 + p, and CSS: #hero { background: linear-gradient(...); color: white; }.",
                  fa: "بعد هیرو: `<section id='hero'>` با h1 و p، و در CSS: `#hero { background: linear-gradient(...); color: white; }`.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "header nav a", count: 3 },
                  { selector: "#hero", count: 1 },
                  { selector: "#about", count: 1 },
                  { selector: "style", text: "gradient" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m5-l3",
          title: { en: "Skills & project cards", fa: "مهارت‌ها و کارت‌های پروژه" },
          goal: {
            en: "Render skills as flex-wrapped badges and showcase projects in wrap-friendly card rows.",
            fa: "مهارت‌ها را به شکل نشان‌های فلکسیِ خط‌شکن نشان بدهی و پروژه‌ها را در ردیفِ کارت‌هایی بسازی که در موبایل می‌شکنند.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "Badges: small but loud", fa: "نشان‌ها: کوچک ولی جیغ" },
              blocks: [
                {
                  type: "text",
                  en: "Skills look best as pills: a `span` with `class='badge'`, styled with background, padding and `border-radius: 999px`. Put them in a flex row with `flex-wrap: wrap` so they wrap politely on narrow screens.",
                  fa: "مهارت‌ها به شکلِ کپسول (Pill) خوش‌ریخت‌ترند: یک `span` با `class='badge'` که با background و padding و `border-radius: 999px` استایل شده. آن‌ها را در یک ردیفِ فلکسی با `flex-wrap: wrap` بگذار تا در صفحه‌های باریک با نزاکت به خطِ بعد بروند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Skills</title>
        <style>
            body {
                background: #f8fafc;
                font-family: Arial, sans-serif;
            }
            .badges {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .badge {
                background: #e0f2fe;
                color: #075985;
                padding: 6px 14px;
                border-radius: 999px;
            }
        </style>
    </head>
    <body>
        <h2>Skills</h2>
        <div class="badges">
            <span class="badge">HTML</span>
            <span class="badge">CSS</span>
            <span class="badge">Flexbox</span>
            <span class="badge">Emoji 🎨</span>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "Flex + wrap + gap: the badge wall that survives any screen width.",
                    fa: "فلکس به‌اضافه‌ی wrap به‌اضافه‌ی gap: دیوارِ نشان‌ها که با هر عرضِ صفحه‌ای دوام می‌آورد.",
                  },
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Cards: the project shelf", fa: "کارت‌ها: قفسه‌ی پروژه‌ها" },
              blocks: [
                {
                  type: "text",
                  en: "A project card is the box model doing its job: a `div` with `class='card'`, an `h3` title, a one-line `p`, and an emoji cover. A flex row of cards with `gap` and `flex-wrap: wrap` becomes a shelf that rearranges itself on phones.",
                  fa: "کارتِ پروژه همان مدلِ جعبه‌ای است که سرِ کارش است: یک `div` با `class='card'` و یک تیترِ `h3` و یک `p` یک‌خطی و یک کاورِ ایموجی. ردیفِ فلکسیِ کارت‌ها با `gap` و `flex-wrap: wrap` قفسه‌ای می‌شود که در گوشی خودش را مرتب می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Projects</title>
        <style>
            body {
                background: #f1f5f9;
                font-family: Arial, sans-serif;
            }
            .grid {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 14px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
            }
        </style>
    </head>
    <body>
        <h2>Projects</h2>
        <div class="grid">
            <div class="card">
                <h3>🍅 Tomato Timer</h3>
                <p>A study timer that fights procrastination.</p>
            </div>
            <div class="card">
                <h3>🎸 Chord Coach</h3>
                <p>Flashcards for guitar chords, in emoji.</p>
            </div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "Two cards today, six tomorrow — the row wraps, nothing breaks.",
                    fa: "امروز دو کارت، فردا شش تا — ردیف می‌شکند ولی هیچ‌چیز نمی‌شکند.",
                  },
                },
                {
                  type: "tip",
                  en: "Keep card texts to one line. A card whispers 'click me'; a paragraph shouts 'read me later'. Short cards also stay the same height — much prettier.",
                  fa: "متنِ کارت‌ها را یک‌خطی نگه دار. کارت نجوا می‌کند «کلیکم کن»؛ پاراگراف داد می‌زند «بعداً بخوانمت». کارت‌های کوتاه هم قد و قواره‌شان برابر می‌ماند — خیلی خوش‌قیسه‌تر.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "Which trio makes a badge row wrap on small screens?",
                    fa: "کدام سه‌تایی ردیفِ نشان‌ها را در صفحه‌های کوچک می‌شکند؟",
                  },
                  options: [
                    {
                      en: "`display: flex` + `flex-wrap: wrap` + `gap`",
                      fa: "`display: flex` به‌اضافه‌ی `flex-wrap: wrap` به‌اضافه‌ی `gap`",
                    },
                    {
                      en: "`float: left` + `clear: both`",
                      fa: "`float: left` به‌اضافه‌ی `clear: both`",
                    },
                    {
                      en: "`display: block` + big margins",
                      fa: "`display: block` به‌اضافه‌ی marginهای بزرگ",
                    },
                  ],
                  answer: 0,
                  explain: {
                    en: "Flex lays the row, wrap lets it break into new lines, gap keeps the spacing even.",
                    fa: "فلکس ردیف را می‌چیند، wrap اجازه می‌دهد به خطوطِ جدید بشکند و gap فاصله‌ها را برابر نگه می‌دارد.",
                  },
                },
                {
                  q: {
                    en: "What belongs inside a project card?",
                    fa: "داخلِ کارتِ پروژه چه چیزی می‌نشیند؟",
                  },
                  options: [
                    {
                      en: "The full project source code",
                      fa: "کدِ کاملِ پروژه",
                    },
                    {
                      en: "An `h3` title plus a one-line description",
                      fa: "یک تیترِ `h3` به‌اضافه‌ی توضیحِ یک‌خطی",
                    },
                    {
                      en: "Only a giant image",
                      fa: "فقط یک عکسِ غول‌پیکر",
                    },
                  ],
                  answer: 1,
                  explain: {
                    en: "Title + one line is the teaser; the details live on the project's own page.",
                    fa: "تیتر به‌اضافه‌ی یک خط، چاپلوسیِ ورود است؛ جزئیات در صفحه‌ی خودِ پروژه زندگی می‌کنند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Fill the shelves", fa: "قفسه‌ها را پر کن" },
              brief: {
                en: "Add two sections: `section id='skills'` containing a `div class='badges'` with exactly three `span class='badge'` items — and `section id='projects'` containing exactly two `div class='card'`, each with an `h3` and a `p`. Style badges and cards in a `<style>` (padding + border-radius at minimum).",
                fa: "دو section اضافه کن: `section id='skills'` که داخلش یک `div class='badges'` با دقیقاً سه `span class='badge'` است — و `section id='projects'` که دقیقاً دو `div class='card'` دارد، هرکدام با یک `h3` و یک `p`. نشان‌ها و کارت‌ها را در `<style>` استایل بده (حداقلش padding و border-radius).",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Profile</title>
        <style>
            body {
                background: #f8fafc;
                font-family: Arial, sans-serif;
            }
        </style>
    </head>
    <body>
        <section id="skills">
            <h2>Skills</h2>
        </section>
        <section id="projects">
            <h2>Projects</h2>
        </section>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Profile</title>
        <style>
            body {
                background: #f8fafc;
                font-family: Arial, sans-serif;
            }
            .badges {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .badge {
                background: #e0f2fe;
                color: #075985;
                padding: 6px 14px;
                border-radius: 999px;
            }
            .grid {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 14px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
            }
        </style>
    </head>
    <body>
        <section id="skills">
            <h2>Skills</h2>
            <div class="badges">
                <span class="badge">HTML</span>
                <span class="badge">CSS</span>
                <span class="badge">Flexbox</span>
            </div>
        </section>
        <section id="projects">
            <h2>Projects</h2>
            <div class="grid">
                <div class="card">
                    <h3>🍅 Tomato Timer</h3>
                    <p>A study timer that fights procrastination.</p>
                </div>
                <div class="card">
                    <h3>🎸 Chord Coach</h3>
                    <p>Flashcards for guitar chords, in emoji.</p>
                </div>
            </div>
        </section>
    </body>
</html>`,
              hints: [
                {
                  en: "Badges: <div class='badges'> holding three <span class='badge'>...</span>.",
                  fa: "نشان‌ها: داخلِ `<div class='badges'>` سه تا `<span class='badge'>...</span>`.",
                },
                {
                  en: "Cards: two <div class='card'> each with h3 + p, styled with padding and border-radius.",
                  fa: "کارت‌ها: دو تا `<div class='card'>` که هرکدام h3 و p دارند، با استایلِ padding و border-radius.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "#skills .badge", count: 3 },
                  { selector: ".card", count: 2 },
                  { selector: ".card h3", count: 2 },
                  { selector: "style", text: "border-radius" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m5-l4",
          title: { en: "FINAL: ship your profile page", fa: "پایانی: صفحه‌ات را تحویل بده" },
          goal: {
            en: "Assemble the complete profile page — hero, about, skills, projects, contact form and footer — mobile-friendly and all yours.",
            fa: "صفحه‌ی کاملِ پروفایل را سوار کنی — هیرو، درباره‌من، مهارت‌ها، پروژه‌ها، فرمِ تماس و فوتر — موبایل‌پسند و از آنِ خودت.",
          },
          minutes: 18,
          steps: [
            {
              kind: "theory",
              title: { en: "The full recipe", fa: "دستورِ کامل" },
              blocks: [
                {
                  type: "text",
                  en: "Everything you have learned, in one page: skeleton + viewport meta, flexbox header nav, gradient hero, about section, badge row, card row, contact form (labels + input + textarea + button, from Module 2), and a footer to sign off.",
                  fa: "هرچه یاد گرفته‌ای، در یک صفحه: اسکلت به‌اضافه‌ی متای viewport، نوبارِ فلکسی در هدر، هیروی گرادیانتی، بخشِ درباره‌من، ردیفِ نشان‌ها، ردیفِ کارت‌ها، فرمِ تماس (label و input و textarea و button از ماژول ۲) و یک فوتر برای امضا.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Arya - Profile</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f8fafc;
            }
            header {
                background: #0f172a;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            nav {
                display: flex;
                gap: 16px;
            }
            nav a {
                color: #7dd3fc;
                text-decoration: none;
            }
            #hero {
                background: linear-gradient(120deg, #06b6d4, #7c3aed);
                color: white;
                padding: 56px 24px;
                text-align: center;
            }
            section {
                padding: 32px 24px;
            }
            .badges {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .badge {
                background: #e0f2fe;
                color: #075985;
                padding: 6px 14px;
                border-radius: 999px;
            }
            .grid {
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 14px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
            }
            input, textarea {
                display: block;
                margin-bottom: 12px;
                padding: 8px;
            }
            footer {
                background: #0f172a;
                color: #94a3b8;
                text-align: center;
                padding: 20px;
            }
        </style>
    </head>
    <body>
        <header>
            <strong>AC</strong>
            <nav>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
        <section id="hero">
            <h1>Hi, I am Arya 👋</h1>
            <p>I build small, fast, friendly websites.</p>
        </section>
        <section id="about">
            <h2>About me</h2>
            <p>Three weeks into HTML, already shipping pages.</p>
        </section>
        <section id="skills">
            <h2>Skills</h2>
            <div class="badges">
                <span class="badge">HTML</span>
                <span class="badge">CSS</span>
                <span class="badge">Flexbox</span>
            </div>
        </section>
        <section id="projects">
            <h2>Projects</h2>
            <div class="grid">
                <div class="card">
                    <h3>🍅 Tomato Timer</h3>
                    <p>A study timer that fights procrastination.</p>
                </div>
                <div class="card">
                    <h3>🎸 Chord Coach</h3>
                    <p>Flashcards for guitar chords, in emoji.</p>
                </div>
            </div>
        </section>
        <section id="contact">
            <h2>Contact me</h2>
            <form>
                <label for="mail">Your email</label>
                <input type="email" id="mail">
                <label for="msg">Your message</label>
                <textarea id="msg"></textarea>
                <button type="submit">Send ✉️</button>
            </form>
        </section>
        <footer>
            <p>Built with HTML + CSS by Arya - 2025</p>
        </footer>
    </body>
</html>`,
                  caption: {
                    en: "The whole course in one file — read it slowly, then rebuild it YOUR way.",
                    fa: "کلِ دوره در یک فایل — آرام‌آرام بخوانش، بعد به سبکِ خودت از نو بسازش.",
                  },
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Ship it & what is next", fa: "تحویل بده و بعدش؟" },
              blocks: [
                {
                  type: "text",
                  en: "The pre-flight checklist: every tag closed? exactly one `h1`? viewport meta present? hover works? badges wrap on a narrow window? If all five say yes — you have a real website.",
                  fa: "چک‌لیستِ قبل از پرواز: همه‌ی تگ‌ها بسته‌اند؟ دقیقاً یک `h1`؟ متای viewport هست؟ هاور کار می‌کند؟ نشان‌ها در پنجره‌ی باریک می‌شکنند؟ اگر هر پنج‌تا «آری» بود — یک وب‌سایتِ واقعی داری.",
                },
                {
                  type: "text",
                  en: "Next stops after this course: free hosting (your page goes live on the internet), more CSS (grid, animations, responsive units), and — when you are ready — JavaScript, the language of behavior. Your profile page will be your first portfolio piece.",
                  fa: "ایستگاه‌های بعدی: هاستِ مجانی (صفحه‌ات واقعاً روی اینترنت می‌رود)، CSS بیشتر (گرید، انیمیشن، واحدهای واکنش‌گرا) و — وقتی آماده بودی — جاوااسکریپت؛ زبانِ رفتارها. صفحه‌ی پروفایلت اولین قطعه‌ی پورتفولیوی توست.",
                },
                {
                  type: "tip",
                  en: "Keep this page as your template. Every new language you learn, rebuild it — you will literally SEE yourself growing.",
                  fa: "این صفحه را قالبِ خودت نگه دار. هر زبانِ جدیدی که یاد گرفتی، دوباره‌اش بساز — با چشمِ خودت رشد کردن را خواهی دید.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: {
                    en: "Which pair makes the page mobile-friendly?",
                    fa: "کدام جفت صفحه را موبایل‌پسند می‌کند؟",
                  },
                  options: [
                    {
                      en: "Viewport meta + flex-wrap",
                      fa: "متای viewport به‌اضافه‌ی flex-wrap",
                    },
                    {
                      en: "A bigger h1 + more colors",
                      fa: "یک h1 بزرگ‌تر به‌اضافه‌ی رنگ‌های بیشتر",
                    },
                    {
                      en: "Removing the nav",
                      fa: "حذف کردنِ منو",
                    },
                  ],
                  answer: 0,
                  explain: {
                    en: "The viewport meta matches the phone's width; flex-wrap lets rows reflow. Together: no sideways scrolling.",
                    fa: "متای viewport عرضِ گوشی را معیار می‌کند و flex-wrap اجازه می‌دهد ردیف‌ها از نو چیده شوند. با هم: بدونِ اسکرولِ افقی.",
                  },
                },
                {
                  q: {
                    en: "A working contact form needs…",
                    fa: "یک فرمِ تماسِ سالم نیاز دارد به…",
                  },
                  options: [
                    {
                      en: "Only a `<p>` with your email",
                      fa: "فقط یک `<p>` با ایمیلت",
                    },
                    {
                      en: "A `<script>` block",
                      fa: "یک بلوکِ `<script>`",
                    },
                    {
                      en: "A labeled input, a textarea and a submit button",
                      fa: "یک input با label و یک textarea و یک دکمه‌ی ارسال",
                    },
                  ],
                  answer: 2,
                  explain: {
                    en: "Label + input + textarea + button — you built exactly this in Module 2.",
                    fa: "label به‌اضافه‌ی input به‌اضافه‌ی textarea به‌اضافه‌ی button — دقیقاً همان که در ماژول ۲ ساختی.",
                  },
                },
                {
                  q: {
                    en: "How many `h1` elements should the page have?",
                    fa: "صفحه باید چند `h1` داشته باشد؟",
                  },
                  options: [
                    { en: "One per section", fa: "برای هر section یکی" },
                    { en: "Exactly one — the main title", fa: "دقیقاً یکی — تیترِ اصلی" },
                    { en: "As many as look nice", fa: "هر چقدر که قشنگ به نظر برسد" },
                  ],
                  answer: 1,
                  explain: {
                    en: "One h1 is the page's headline; sections take h2, subsections h3.",
                    fa: "یک h1، همان تیترِ اصلیِ صفحه؛ بخش‌ها h2 می‌گیرند و زیربخش‌ها h3.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "FINAL: The Big Build", fa: "پایانی: ساختِ بزرگ" },
              brief: {
                en: "Ship your complete profile page. Required: the viewport meta; a `section id='hero'` (with `h1` + `p`); a skills row with three `span class='badge'`; and a contact `<form>` (labeled input + textarea + button). Strongly recommended: header nav, about section, two project cards, footer — plus any styling that makes it YOURS.",
                fa: "صفحه‌ی کاملِ پروفایلت را تحویل بده. لازم: متای viewport؛ یک `section id='hero'` (با `h1` و `p`)؛ یک ردیفِ مهارت با سه `span class='badge'`؛ و یک `<form>` تماس (label و input و textarea و button). پیشنهادِ جدی: نوبار در هدر، بخشِ درباره‌من، دو کارتِ پروژه و فوتر — به‌اضافه‌ی هر استایلی که آن را «مالِ خودت» کند.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My Profile</title>
    </head>
    <body>
        <h1>My Profile</h1>
        <p>The big build starts here. Good luck, future me!</p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <title>Arya - Profile</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f8fafc;
            }
            header {
                background: #0f172a;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            nav {
                display: flex;
                gap: 16px;
            }
            nav a {
                color: #7dd3fc;
                text-decoration: none;
            }
            #hero {
                background: linear-gradient(120deg, #06b6d4, #7c3aed);
                color: white;
                padding: 56px 24px;
                text-align: center;
            }
            section {
                padding: 32px 24px;
            }
            .badges {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .badge {
                background: #e0f2fe;
                color: #075985;
                padding: 6px 14px;
                border-radius: 999px;
            }
            .grid {
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 14px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
            }
            input, textarea {
                display: block;
                margin-bottom: 12px;
                padding: 8px;
            }
            footer {
                background: #0f172a;
                color: #94a3b8;
                text-align: center;
                padding: 20px;
            }
        </style>
    </head>
    <body>
        <header>
            <strong>AC</strong>
            <nav>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
        <section id="hero">
            <h1>Hi, I am Arya 👋</h1>
            <p>I build small, fast, friendly websites.</p>
        </section>
        <section id="about">
            <h2>About me</h2>
            <p>Three weeks into HTML, already shipping pages.</p>
        </section>
        <section id="skills">
            <h2>Skills</h2>
            <div class="badges">
                <span class="badge">HTML</span>
                <span class="badge">CSS</span>
                <span class="badge">Flexbox</span>
            </div>
        </section>
        <section id="projects">
            <h2>Projects</h2>
            <div class="grid">
                <div class="card">
                    <h3>🍅 Tomato Timer</h3>
                    <p>A study timer that fights procrastination.</p>
                </div>
                <div class="card">
                    <h3>🎸 Chord Coach</h3>
                    <p>Flashcards for guitar chords, in emoji.</p>
                </div>
            </div>
        </section>
        <section id="contact">
            <h2>Contact me</h2>
            <form>
                <label for="mail">Your email</label>
                <input type="email" id="mail">
                <label for="msg">Your message</label>
                <textarea id="msg"></textarea>
                <button type="submit">Send ✉️</button>
            </form>
        </section>
        <footer>
            <p>Built with HTML + CSS by Arya - 2025</p>
        </footer>
    </body>
</html>`,
              hints: [
                {
                  en: "Start from the skeleton: head with charset + viewport, then header, sections, footer — copy the recipe from the lesson and swap in YOUR content.",
                  fa: "از اسکلت شروع کن: head با charset و viewport، بعد header و sectionها و footer — دستورِ درس را کپی کن و محتوای «خودت» را جایگزین کن.",
                },
                {
                  en: "The four checked pieces: meta viewport in the head, section id='hero', three span class='badge', and one form with input + textarea + button.",
                  fa: "چهار قطعه‌ای که بررسی می‌شوند: متای viewport در head، یک `section id='hero'`، سه `span class='badge'` و یک `form` با input و textarea و button.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "meta[name='viewport']", count: 1 },
                  { selector: "#hero", count: 1 },
                  { selector: ".badge", count: 3 },
                  { selector: "form", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 6 ────────────────────────────────────────────
    {
      id: "html-m6",
      title: { en: "Layouts Masterclass", fa: "استادِ چیدمان" },
      blurb: {
        en: "CSS Grid, position and media queries — the three tools behind every real-world layout, then you build Pricing Cards.",
        fa: "گرید، position و مدیاکوئری — سه ابزاری که پشتِ هر چیدمانِ واقعی هستند؛ آخرش هم کارت‌های قیمت‌گذاری را می‌سازی.",
      },
      lessons: [
        {
          id: "html-m6-l1",
          title: { en: "CSS Grid — layout in two dimensions", fa: "گرید — چیدمانِ دوبُعدی" },
          goal: {
            en: "Turn any container into a grid and carve it into columns with gap-sized gutters.",
            fa: "هر ظرفی را به گرید تبدیل کنی و با ستون‌ها و فاصله‌ی gap، چیدمانِ چندستونه بسازی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Flexbox was one line, Grid is a chessboard", fa: "فلکسباکس یک خط بود، گرید یک صفحه‌ی شطرنج" },
              blocks: [
                {
                  type: "text",
                  en: "Flexbox (Module 3) lines things up in ONE direction — a row OR a column. But look at any real page: a wall of product cards, an album grid, a dashboard. Those need BOTH directions at once. That is exactly what CSS Grid is for: you flip one switch — `display: grid` — on the CONTAINER, then describe its columns, and the children pour themselves into the cells automatically.",
                  fa: "فلکسباکس (ماژول ۳) چیزها را در «یک» جهت مرتب می‌کند — یک ردیف یا یک ستون. ولی به هر صفحه‌ی واقعی نگاه کن: دیوارِ کارت‌های محصول، گریدِ آلبوم‌ها، یک داشبورد. این‌ها به «هر دو جهت» هم‌زمان نیاز دارند. کارِ CSS Grid دقیقاً همین است: یک کلید را روی «ظرف» می‌زنی — `display: grid` — بعد ستون‌هایش را توصیف می‌کنی، و بچه‌ها خودشان داخل خانه‌ها می‌ریزند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Album Wall</title>
        <style>
            body {
                background: #0f172a;
                font-family: Arial, sans-serif;
                color: white;
                padding: 16px;
            }
            .wall {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .album {
                padding: 28px 8px;
                border-radius: 12px;
                text-align: center;
                font-size: 32px;
            }
        </style>
    </head>
    <body>
        <h1>🎧 My Album Wall</h1>
        <div class="wall">
            <div class="album" style="background: #7c3aed;">🎸</div>
            <div class="album" style="background: #06b6d4;">🎹</div>
            <div class="album" style="background: #f59e0b;">🥁</div>
            <div class="album" style="background: #ef4444;">🎺</div>
            <div class="album" style="background: #10b981;">🎻</div>
            <div class="album" style="background: #ec4899;">🎤</div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "Six albums, zero wrappers — the grid places them 3 per row by itself.",
                    fa: "شش آلبوم، بدونِ هیچ ظرفِ اضافه — گرید خودش سه‌تا‌سه‌تا می‌چیند.",
                  },
                },
                {
                  type: "text",
                  en: "Two lines did the magic: `display: grid` switches the container into grid mode, and `grid-template-columns: repeat(3, 1fr)` says: give me 3 columns, each `1fr` wide. The six albums fill the cells row by row — first three in row 1, next three in row 2. You never position a single child.",
                  fa: "دو خط، جادو را انجام دادند: `display: grid` ظرف را به حالت گرید می‌برد، و `grid-template-columns: repeat(3, 1fr)` می‌گوید: سه تا ستون می‌خواهم، هرکدام به پهنای `1fr`. شش آلبوم خانه‌به‌خانه پر می‌شوند — سه‌تای اول ردیفِ یک، سه‌تای بعدی ردیفِ دو. تو حتی یک بچه را دستی جا‌گذاری نمی‌کنی.",
                },
                {
                  type: "tip",
                  en: "The children need NO css of their own to be placed. If they jump out of the grid, the first suspect is always the container: is `display: grid` actually there?",
                  fa: "بچه‌ها برای جا گرفتن هیچ CSS خاصی لازم ندارند. اگر از گرید بیرون زدند، اولین مظنون همیشه ظرف است: آیا `display: grid` واقعاً آنجا هست؟",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "fr, repeat and gap — the three magic words", fa: "fr و repeat و gap — سه کلمه‌ی جادویی" },
              blocks: [
                {
                  type: "text",
                  en: "`fr` means *fraction*: one share of the FREE width. `1fr 1fr` = two equal halves. `1fr 2fr` = the second column gets TWO shares — twice as wide. That is the classic app layout: narrow menu on the left (`1fr`), big panel on the right (`2fr`). And `repeat(3, 1fr)` is just shorthand for `1fr 1fr 1fr` — say it once, not three times.",
                  fa: "`fr` یعنی *کسری از فضای خالی*. `1fr 1fr` = دو نیمه‌ی برابر. `1fr 2fr` = ستونِ دوم دو سهم می‌گیرد — دو برابرِ پهن‌تر. این همان چیدمانِ کلاسیکِ اپ‌هاست: منوی باریک چپ (`1fr`)، پنلِ بزرگِ راست (`2fr`). و `repeat(3, 1fr)` فقط خلاصه‌نویسیِ `1fr 1fr 1fr` است — یک بار بگو، نه سه بار.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Dashboard Skeleton</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                padding: 10px;
                box-sizing: border-box;
            }
            .app {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 10px;
                min-height: 90vh;
            }
            .side {
                background: #0f172a;
                color: #7dd3fc;
                border-radius: 10px;
                padding: 16px;
            }
            .main {
                background: #e0f2fe;
                border-radius: 10px;
                padding: 16px;
            }
        </style>
    </head>
    <body>
        <div class="app">
            <div class="side">⚙️ Menu — one share</div>
            <div class="main">📊 Main panel — two shares, twice as wide</div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "1fr + 2fr = the sidebar + main-panel skeleton of a thousand apps.",
                    fa: "1fr + 2fr = اسکلتِ «منو + پنلِ اصلی» که هزاران اپ با آن ساخته شده.",
                  },
                },
                {
                  type: "text",
                  en: "`gap` sets the gutters BETWEEN the cells — never inside them. `gap: 12px` applies to both rows and columns; `gap: 8px 20px` means 8px between rows and 20px between columns. Because gap lives on the container, the math stays clean: no fake margins on the outer edge, no first-child exceptions.",
                  fa: "`gap` فاصله‌ی «بینِ» خانه‌ها را می‌سازد — نه داخلشان. `gap: 12px` هم برای ردیف‌هاست هم ستون‌ها؛ `gap: 8px 20px` یعنی بین ردیف‌ها ۸ پیکسل و بین ستون‌ها ۲۰ پیکسل. چون gap روی ظرف است، حساب‌کتاب تمیز می‌ماند: نه marginِ تقلبی روی لبه‌ها، نه استثنا برای بچه‌ی اول و آخر.",
                },
                {
                  type: "warn",
                  en: "Bug #1 of grid beginners: writing `grid-template-columns` but forgetting `display: grid`. The property silently does NOTHING — no error, no warning, just a normal stacked page. Always pair them.",
                  fa: "باگِ شماره‌ی یکِ تازه‌کارهای گرید: نوشتنِ `grid-template-columns` ولی جا انداختنِ `display: grid`. آن ویژگی بی‌سروصدا هیچ کاری نمی‌کند — نه ارور، نه هشدار؛ فقط یک صفحه‌ی معمولیِ روی‌هم‌چیده. همیشه این دو را با هم بنویس.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which single declaration turns a container into a grid?", fa: "کدام یک خط، یک ظرف را به گرید تبدیل می‌کند؟" },
                  options: [
                    { en: "grid-template-columns: 1fr;", fa: "grid-template-columns: 1fr;" },
                    { en: "display: grid;", fa: "display: grid;" },
                    { en: "display: flex;", fa: "display: flex;" },
                  ],
                  answer: 1,
                  explain: {
                    en: "`grid-template-columns` only DESCRIBES the columns — the container must first switch modes with `display: grid`.",
                    fa: "`grid-template-columns` فقط ستون‌ها را «توصیف» می‌کند — ظرف باید اول با `display: grid` عوض حالت شود.",
                  },
                },
                {
                  q: { en: "grid-template-columns: 1fr 2fr creates…", fa: "grid-template-columns: 1fr 2fr می‌سازد…" },
                  options: [
                    { en: "Two rows, the first twice as tall", fa: "دو ردیف که اولی دو برابر بلندتر است" },
                    { en: "Two equal columns", fa: "دو ستونِ برابر" },
                    { en: "Two columns, the second twice as wide", fa: "دو ستون که دومی دو برابر پهن‌تر است" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Values map to columns left to right: 1 share, then 2 shares. fr is width, not height.",
                    fa: "مقادیر از چپ به راست به ستون‌ها می‌روند: یک سهم، بعد دو سهم. fr پهناست، نه ارتفاع.",
                  },
                },
                {
                  q: { en: "What does gap: 16px do on a grid container?", fa: "gap: 16px روی ظرفِ گرید چه می‌کند؟" },
                  options: [
                    { en: "Adds 16px of space between ALL rows and columns", fa: "بین همه‌ی ردیف‌ها و ستون‌ها ۱۶ پیکسل فاصله می‌اندازد" },
                    { en: "Adds 16px of padding inside each cell", fa: "داخلِ هر خانه ۱۶ پیکسل padding می‌گذارد" },
                    { en: "Adds 16px of margin around the whole grid", fa: "دورِ کلِ گرید ۱۶ پیکسل margin می‌گذارد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "gap is the spacing between tracks — inside cells you would use padding on the children.",
                    fa: "gap فاصله‌ی «بینِ» ردیف‌ها و ستون‌هاست — داخلِ خانه‌ها را با padding روی بچه‌ها تنظیم می‌کنی.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The gallery wall", fa: "دیوارِ گالری" },
              brief: {
                en: "Build a photo wall for your page: a `div class='grid'` containing EXACTLY three `div class='tile'` (put any emoji or word inside each). In the `<style>`, give `.grid` `display: grid` with `grid-template-columns: repeat(3, 1fr)` and a `gap`, and style `.tile` so it looks like a tile (padding, border-radius, background).",
                fa: "برای صفحه‌ات یک دیوارِ گالری بساز: یک `div class='grid'` که دقیقاً سه تا `div class='tile'` دارد (داخل هرکدام هر ایموجی یا کلمه‌ای خواستی). در `<style>` به `.grid` بده: `display: grid` و `grid-template-columns: repeat(3, 1fr)` و یک `gap`؛ و `.tile` را طوری استایل بده که شبیه کاشی شود (padding و border-radius و background).",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Gallery Wall</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 16px;
            }
            /* 1) .grid → display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; */
            /* 2) .tile → padding, border-radius, background, text-align: center; */
        </style>
    </head>
    <body>
        <h1>My Gallery 🖼️</h1>
        <div class="grid">
            <!-- three divs, each with class="tile" and something inside -->
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Gallery Wall</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 16px;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .tile {
                padding: 32px 8px;
                border-radius: 12px;
                background: #0ea5e9;
                color: white;
                text-align: center;
                font-size: 34px;
            }
        </style>
    </head>
    <body>
        <h1>My Gallery 🖼️</h1>
        <div class="grid">
            <div class="tile">🌊</div>
            <div class="tile">🏔️</div>
            <div class="tile">🌵</div>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "The container gets TWO lines: `display: grid;` and `grid-template-columns: repeat(3, 1fr);` plus `gap: 12px;`.",
                  fa: "ظرف فقط دو خطِ اصلی دارد: `display: grid;` و `grid-template-columns: repeat(3, 1fr);` به‌اضافه‌ی `gap: 12px;`.",
                },
                {
                  en: "Each tile is simply: <div class='tile'>🌊</div> — three of them, inside .grid.",
                  fa: "هر کاشی ساده است: <div class='tile'>🌊</div> — سه تا از این‌ها داخلِ .grid.",
                },
                {
                  en: "Give .tile some padding and a background so the three columns are visible.",
                  fa: "به .tile کمی padding و background بده تا سه ستون دیده شوند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".grid", count: 1 },
                  { selector: ".tile", count: 3 },
                  { selector: "style", text: "grid-template-columns" },
                  { selector: "style", text: "gap" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m6-l2",
          title: { en: "position — break out of the flow", fa: "position — خارج شدن از صف" },
          goal: {
            en: "Pin badges to corners with relative + absolute, and glue banners to the screen with fixed.",
            fa: "با ترکیبِ relative و absolute نشان‌ها را به گوشه‌ها بچسبانی، و با fixed بنرها را به صفحه بچسپانی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Static, relative, absolute: the anchoring game", fa: "static و relative و absolute: بازیِ لنگر انداختن" },
              blocks: [
                {
                  type: "text",
                  en: "Every element is `position: static` by default — it simply sits in the flow, shoulder to shoulder with its neighbours. Three upgrades change that: `relative` keeps the element exactly where it was BUT turns it into an anchor; `absolute` lifts an element OUT of the flow and pins it to the nearest anchored ancestor; `fixed` pins it to the browser window itself. The four properties `top / right / bottom / left` are the coordinates — they do nothing until the element is positioned.",
                  fa: "هر عنصری به‌طورِ پیش‌فرض `position: static` است — همان‌جا در صف می‌نشیند، شانه‌به‌شانه‌ی همسایه‌ها. سه ارتقا این را عوض می‌کند: `relative` عنصر را سرِ جایش نگه می‌دارد ولی آن را به یک «لنگر» تبدیل می‌کند؛ `absolute` عنصر را از صف بیرون می‌کشد و به نزدیک‌ترین لنگرِ اجدادش میخکوب می‌کند؛ `fixed` آن را به خودِ پنجره‌ی مرورگر می‌چسباند. چهار ویژگیِ `top / right / bottom / left` مختصات‌اند — تا وقتی عنصر position داشته باشد، هیچ‌کاری نمی‌کنند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sale Sticker</title>
        <style>
            body {
                background: #f8fafc;
                font-family: Arial, sans-serif;
                padding: 24px;
            }
            .photo {
                position: relative;
                width: 220px;
                background: linear-gradient(160deg, #a5b4fc, #818cf8);
                border-radius: 14px;
                padding: 44px 0 0;
                text-align: center;
                font-size: 60px;
            }
            .tag {
                position: absolute;
                top: 12px;
                right: 12px;
                background: #ef4444;
                color: white;
                padding: 4px 10px;
                border-radius: 999px;
                font-size: 14px;
            }
            .caption {
                font-size: 16px;
                color: #1e293b;
                background: white;
                margin: 8px 0 0;
                padding: 10px;
                border-radius: 0 0 14px 14px;
            }
        </style>
    </head>
    <body>
        <div class="photo">
            <span class="tag">SALE 50%</span>
            🎧
            <p class="caption">Wireless headphones</p>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "The classic online-shop sticker: red pill, glued to the card's top-right corner.",
                    fa: "استیکرِ کلاسیکِ فروشگاه‌های آنلاین: کپسولِ قرمز، چسبیده به گوشه‌ی بالا-راستِ کارت.",
                  },
                },
                {
                  type: "text",
                  en: "Read the pair carefully: `.photo` has `position: relative` — it stays in the flow but becomes the reference frame. `.tag` has `position: absolute` with `top: 12px; right: 12px` — so the browser measures 12px from `.photo`'s top-right corner and sticks the tag there. Remove the relative from `.photo` and the same coordinates suddenly measure from the PAGE's corner instead.",
                  fa: "این جفت را دقیق بخوان: `.photo` دارد `position: relative` — سرِ جایش می‌ماند ولی به قابِ مختصات تبدیل می‌شود. `.tag` دارد `position: absolute` با `top: 12px; right: 12px` — پس مرورگر از گوشه‌ی بالا-راستِ `.photo` ۱۲ پیکسل اندازه می‌گیرد و استیکر را همان‌جا می‌چسباند. اگر relative را از `.photo` برداری، همین مختصات‌ها یک‌دفعه از گوشه‌ی «صفحه» اندازه گرفته می‌شوند.",
                },
                {
                  type: "warn",
                  en: "An absolute element ALWAYS anchors to something. No positioned ancestor? Then it anchors to the whole page — the classic 'my badge flew to the top of the site' bug. Fix: give the intended parent `position: relative`.",
                  fa: "عنصرِ absolute «همیشه» به چیزی لنگر می‌اندازد. اجدادِ position‌دار پیدا نکند؟ آن‌وقت به کلِ صفحه لنگر می‌اندازد — همان باگِ معروفِ «نشانم پرید به بالای سایت». راه‌حل: به والدِ مقصد `position: relative` بده.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "fixed — glued to the screen", fa: "fixed — چسبیده به نمایشگر" },
              blocks: [
                {
                  type: "text",
                  en: "`position: fixed` measures from the browser window — not from any parent — and the element STAYS there while the page scrolls. That is the machinery behind cookie banners at the bottom, floating 'back to top' buttons, and mini music-players that never leave the corner. While absolute elements scroll away with the page, fixed elements are welded to your screen.",
                  fa: "`position: fixed` از پنجره‌ی مرورگر اندازه می‌گیرد — نه از هیچ والدی — و عنصر درحالی‌که صفحه اسکرول می‌شود «همان‌جا» می‌ماند. این موتورِ پشتِ بنرهای کوکی در پایینِ صفحه، دکمه‌های شناورِ «بازگشت به بالا» و پلیرهای کوچکی است که هرگز گوشه را ترک نمی‌کنند. عناصرِ absolute با صفحه می‌روند، ولی fixed به نمایشگرت جوش خورده است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Fixed Bars</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                padding-bottom: 70px;
            }
            p {
                padding: 0 24px;
                line-height: 1.8;
            }
            .top {
                position: fixed;
                top: 14px;
                right: 14px;
                background: #06b6d4;
                color: white;
                padding: 8px 14px;
                border-radius: 999px;
                text-decoration: none;
            }
            .cookie {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #0f172a;
                color: white;
                padding: 14px 20px;
            }
        </style>
    </head>
    <body>
        <a class="top" href="#top">↑ Top</a>
        <h1 id="top">A very long article</h1>
        <p>Scroll this preview and watch both bars: they do not move. Not one pixel.</p>
        <p>The blue pill is pinned 14px from the window's top-right corner.</p>
        <p>The dark banner sits glued to the bottom edge, full width —
           that is what left: 0; right: 0 together mean.</p>
        <p>Fixed elements ignore the page's flow completely.</p>
        <p>Every real cookie banner you have ever dismissed was built like this.</p>
        <p>One line of position — months of UX decisions. 😄</p>
        <div class="cookie">🍪 This website uses cookies (and occasional real ones).</div>
    </body>
</html>`,
                  caption: {
                    en: "Scroll the preview — fixed elements refuse to budge.",
                    fa: "پیش‌نمایش را اسکرول کن — عناصر fixed اصلاً تکان نمی‌خورند.",
                  },
                },
                {
                  type: "tip",
                  en: "`top: 0; left: 0; right: 0;` together stretch a fixed element across the whole width at the top — swap in `bottom: 0` and it hugs the bottom. Two coordinates = a corner; three = a full edge.",
                  fa: "`top: 0; left: 0; right: 0;` با هم، یک عنصر fixed را به‌طورِ کامل به پهنای بالای صفحه می‌کشند — `bottom: 0` بگذاری به پایین می‌چسبد. دو مختصات = یک گوشه؛ سه مختصات = یک لبه‌ی کامل.",
                },
                {
                  type: "text",
                  en: "Pocket summary: `static` = normal life. `relative` = stays put, becomes an anchor. `absolute` = pinned to the nearest anchored ancestor (usually a relative parent). `fixed` = pinned to the window, survives scrolling.",
                  fa: "خلاصه‌ی جیبی: `static` = زندگیِ عادی. `relative` = سرِ جایش می‌ماند ولی لنگر می‌شود. `absolute` = به نزدیک‌ترین اجدادِ لنگر (معمولاً والدِ relative) میخکوب می‌شود. `fixed` = به پنجره میخکوب می‌شود و با اسکرول نمی‌رود.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "An element with position: absolute and top/right coordinates pins to…", fa: "عنصری با position: absolute و مختصاتِ top و right به چه چیزی می‌چسبد؟" },
                  options: [
                    { en: "Always the browser window", fa: "همیشه پنجره‌ی مرورگر" },
                    { en: "The nearest ancestor that has a position (usually one marked relative)", fa: "نزدیک‌ترین جدی که position دارد (معمولاً والدی که relative است)" },
                    { en: "Its own original spot in the flow", fa: "محلِ قبلیِ خودش در صف" },
                  ],
                  answer: 1,
                  explain: {
                    en: "absolute measures from the nearest positioned ancestor — with none, it falls back to the whole page.",
                    fa: "absolute از نزدیک‌ترین جدِ position‌دار اندازه می‌گیرد — اگر نباشد، به کلِ صفحه برمی‌گردد.",
                  },
                },
                {
                  q: { en: "What does position: relative do all by itself (no top/left set)?", fa: "position: relative به‌تنهایی (بدون top و left) چه می‌کند؟" },
                  options: [
                    { en: "Nothing visible — but it turns the element into an anchor for absolute children", fa: "هیچ چیزِ قابل‌دیدنی — ولی عنصر را به لنگرِ بچه‌های absolute تبدیل می‌کند" },
                    { en: "Moves the element slightly down", fa: "عنصر را کمی به پایین می‌برد" },
                    { en: "Makes the element scroll with the page", fa: "باعث می‌شود عنصر با صفحه اسکرول شود" },
                  ],
                  answer: 0,
                  explain: {
                    en: "By itself relative changes nothing visually — its job is to become the reference frame.",
                    fa: "relative به‌تنهایی ظاهر را عوض نمی‌کند — کارش این است که قابِ مختصات شود.",
                  },
                },
                {
                  q: { en: "position: fixed measures its coordinates from…", fa: "position: fixed مختصاتش را از کجا اندازه می‌گیرد؟" },
                  options: [
                    { en: "The parent element", fa: "عنصرِ والد" },
                    { en: "The center of the page", fa: "وسطِ صفحه" },
                    { en: "The browser window — and stays put while the page scrolls", fa: "پنجره‌ی مرورگر — و با اسکرولِ صفحه سر جایش می‌ماند" },
                  ],
                  answer: 2,
                  explain: {
                    en: "fixed is relative to the viewport: cookie banners and floating buttons live here.",
                    fa: "fixed نسبت به viewport است: بنرهای کوکی و دکمه‌های شناور اینجا زندگی می‌کنند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Sticker on the photo", fa: "استیکر روی عکس" },
              brief: {
                en: "Build one product card for your online shop: a `div class='photo'` holding a big emoji, a `span class='tag'` whose text includes the word SALE, and a `p class='caption'` with the product name. In the CSS: `.photo { position: relative; }` and `.tag { position: absolute; top: …; right: …; }` so the sticker sits on the card's corner.",
                fa: "یک کارتِ محصول برای فروشگاه آنلاینت بساز: یک `div class='photo'` که یک ایموجیِ بزرگ دارد، یک `span class='tag'` که متنش کلمه‌ی SALE را دارد، و یک `p class='caption'` با نامِ محصول. در CSS: `.photo { position: relative; }` و `.tag { position: absolute; top: …; right: …; }` تا استیکر روی گوشه‌ی کارت بنشیند.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Shop Card</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            /* 1) .photo → position: relative; + size, background, border-radius */
            /* 2) .tag → position: absolute; top: …; right: …; + pill styles */
        </style>
    </head>
    <body>
        <div class="photo">
            <!-- add the span.tag with your SALE text here -->
            📷
            <p class="caption">Instant camera</p>
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Shop Card</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            .photo {
                position: relative;
                width: 220px;
                background: linear-gradient(160deg, #fbbf24, #f59e0b);
                border-radius: 14px;
                padding: 44px 0 0;
                text-align: center;
                font-size: 60px;
            }
            .tag {
                position: absolute;
                top: 12px;
                right: 12px;
                background: #ef4444;
                color: white;
                padding: 4px 10px;
                border-radius: 999px;
                font-size: 14px;
            }
            .caption {
                font-size: 16px;
                color: #1e293b;
                background: white;
                margin: 8px 0 0;
                padding: 10px;
                border-radius: 0 0 14px 14px;
            }
        </style>
    </head>
    <body>
        <div class="photo">
            <span class="tag">SALE 30%</span>
            📷
            <p class="caption">Instant camera</p>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "The anchor first: `.photo { position: relative; }` — without it the tag escapes to the page corner.",
                  fa: "اول لنگر: `.photo { position: relative; }` — بدونِ آن تگ به گوشه‌ی صفحه فرار می‌کند.",
                },
                {
                  en: "Then the pin: `.tag { position: absolute; top: 12px; right: 12px; }` — tweak the numbers to move it.",
                  fa: "بعد میخکوب کردن: `.tag { position: absolute; top: 12px; right: 12px; }` — عددها را عوض کن تا جابه‌جا شود.",
                },
                {
                  en: "The tag must contain the word SALE — like <span class='tag'>SALE 30%</span>.",
                  fa: "متنِ تگ باید کلمه‌ی SALE را داشته باشد — مثلِ <span class='tag'>SALE 30%</span>.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".photo", count: 1 },
                  { selector: ".tag", count: 1 },
                  { selector: ".tag", text: "sale" },
                  { selector: ".photo .caption", count: 1 },
                  { selector: "style", text: "position" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m6-l3",
          title: { en: "Media queries — one page, every screen", fa: "مدیاکوئری — یک صفحه برای همه‌ی نمایشگرها" },
          goal: {
            en: "Write @media rules that restyle the page on small screens — without touching the HTML.",
            fa: "قانونِ @media بنویسی تا صفحه روی نمایشگرهای کوچک خودش عوض شود — بدونِ دست زدن به HTML.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "The page that reshapes itself", fa: "صفحه‌ای که خودش را شکل می‌دهد" },
              blocks: [
                {
                  type: "text",
                  en: "Your page opens on a phone, a tablet, a laptop — same HTML, very different screens. Media queries let the CSS react: `@media (max-width: 600px) { … }` reads as 'WHEN the window is at most 600px wide, apply these rules'. The width where the design switches is called a breakpoint. This one idea is 90% of what people mean by 'responsive design'.",
                  fa: "صفحه‌ات روی موبایل باز می‌شود، روی تبلت، روی لپ‌تاپ — همان HTML، ولی نمایشگرهای خیلی متفاوت. مدیاکوئری‌ها به CSS اجازه‌ی واکنش می‌دهند: `@media (max-width: 600px) { … }` یعنی «وقتی پنجره حداکثر ۶۰۰ پیکسل عرض دارد، این قوانین را اعمال کن». عرضی که طرح آنجا عوض می‌شود را breakpoint می‌گویند. همین یک ایده، ۹۰٪ آن چیزی است که مردم به آن «طراحی واکنش‌گرا» می‌گویند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Responsive Cards</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f1f5f9;
                padding: 16px;
            }
            .cards {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 12px;
                text-align: center;
            }
            @media (max-width: 600px) {
                .cards {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <h1>Features</h1>
        <div class="cards">
            <div class="card">⚡ Fast</div>
            <div class="card">🔒 Secure</div>
            <div class="card">📱 Mobile-first</div>
        </div>
        <p>Squeeze the preview narrower than 600px — the cards stack. Stretch it back — they line up.</p>
    </body>
</html>`,
                  caption: {
                    en: "Same HTML, two layouts: 3 columns on wide, 1 column below 600px.",
                    fa: "همان HTML، دو چیدمان: روی صفحه‌ی پهن ۳ ستون، زیرِ ۶۰۰ پیکسل ۱ ستون.",
                  },
                },
                {
                  type: "text",
                  en: "The only new syntax is the wrapper: `@media (condition) { normal CSS }`. Inside go perfectly ordinary rules — and they simply OVERRIDE the matching base rules while the condition holds. Here the base grid has 3 columns; on narrow screens one line swaps it to a single column. Nothing else moves.",
                  fa: "تنها سینتکسِ جدید همان قاب است: `@media (شرط) { CSSِ معمولی }`. داخلش قانون‌های کاملاً معمولی می‌روند — و تا وقتی شرط برقرار است، همان‌قانون‌هایِ پایه را «بی‌اثر» می‌کنند. اینجا گریدِ پایه سه ستون است؛ روی صفحه‌ی باریک یک خط آن را تک‌ستونه می‌کند. هیچ‌چیزِ دیگری تکان نمی‌خورد.",
                },
                {
                  type: "warn",
                  en: "Media queries measure the REAL viewport. Without `<meta name='viewport'>` in the head (Module 4!), phones pretend to be a 980px desktop and your carefully written queries never fire. Viewport meta first, queries second.",
                  fa: "مدیاکوئری‌ها viewport واقعی را اندازه می‌گیرند. بدونِ `<meta name='viewport'>` در head (ماژول ۴!)، موبایل‌ها خودشان را دسکتاپِ ۹۸۰ پیکسلی جا می‌زنند و کوئری‌های دقیقِ تو هرگز اجرا نمی‌شوند. اول متای viewport، بعد کوئری‌ها.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Choosing breakpoints like a pro", fa: "انتخابِ breakpoint مثل یک حرفه‌ای" },
              blocks: [
                {
                  type: "text",
                  en: "Two directions exist. `max-width` means 'up to this width' — you write the desktop styles first, then fix small screens. `min-width` means 'from this width up' — you write the MOBILE styles as the base, then enhance for big screens (this is called mobile-first, and most modern teams live there). Both are correct; pick one direction per project and stay consistent.",
                  fa: "دو جهت وجود دارد. `max-width` یعنی «تا این عرض» — اول استایل‌های دسکتاپ را می‌نویسی، بعد صفحه‌های کوچک را درست می‌کنی. `min-width` یعنی «از این عرض به بالا» — استایل‌های «موبایل» را به‌عنوانِ پایه می‌نویسی، بعد برای صفحه‌های بزرگ ارتقا می‌دهی (اسمش mobile-first است و بیشترِ تیم‌های امروزی همان‌جا زندگی می‌کنند). هر دو درست‌اند؛ برای هر پروژه یک جهت انتخاب کن و به آن وفادار بمان.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Mobile-first Nav</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #0f172a;
            }
            nav {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 16px;
            }
            nav a {
                color: #7dd3fc;
                text-decoration: none;
                padding: 8px 12px;
                background: #1e293b;
                border-radius: 8px;
            }
            @media (min-width: 700px) {
                nav {
                    flex-direction: row;
                }
            }
        </style>
    </head>
    <body>
        <nav>
            <a href="#">Home</a>
            <a href="#">Music</a>
            <a href="#">Tour</a>
            <a href="#">Contact</a>
        </nav>
    </body>
</html>`,
                  caption: {
                    en: "Mobile-first: a stacked menu by default, a row from 700px up.",
                    fa: "موبایل‌فرست: منوی روی‌هم به‌صورتِ پیش‌فرض، و از ۷۰۰ پیکسل به بالا یک ردیف.",
                  },
                },
                {
                  type: "tip",
                  en: "A media query only overrides the properties you LIST inside it — everything else inherits from the base styles. You rarely rewrite a whole component; usually it is one or two lines, like flipping flex-direction or a grid-template-columns.",
                  fa: "مدیاکوئری فقط همان ویژگی‌هایی را بی‌اثر می‌کند که داخلش «لیست» کرده‌ای — بقیه از استایل‌های پایه به ارث می‌رسد. معمولاً کلِ یک کامپوننت را بازنویسی نمی‌کنی؛ یک یا دو خط است، مثل عوض کردنِ flex-direction یا grid-template-columns.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "@media (max-width: 600px) { … } applies when…", fa: "قانونِ @media (max-width: 600px) کِی اجرا می‌شود؟" },
                  options: [
                    { en: "The window is 600px wide or narrower", fa: "پنجره ۶۰۰ پیکسل یا باریک‌تر باشد" },
                    { en: "The window is wider than 600px", fa: "پنجره پهن‌تر از ۶۰۰ پیکسل باشد" },
                    { en: "Always, on every screen", fa: "همیشه و روی هر نمایشگری" },
                  ],
                  answer: 0,
                  explain: {
                    en: "max-width means 'up to this width' — so the rules live on small screens.",
                    fa: "max-width یعنی «تا این عرض» — پس این قوانین روی صفحه‌های کوچک زندگی می‌کنند.",
                  },
                },
                {
                  q: { en: "What is allowed inside a media query's braces?", fa: "داخلِ آکولادهای مدیاکوئری چه چیزی مجاز است؟" },
                  options: [
                    { en: "Only color properties", fa: "فقط ویژگی‌های رنگ" },
                    { en: "HTML tags, to add mobile elements", fa: "تگ‌های HTML، برای افزودن عنصرِ موبایلی" },
                    { en: "Normal CSS rules that override the base styles while the condition matches", fa: "قانون‌های معمولی CSS که تا وقتی شرط برقرار است، استایل‌های پایه را بی‌اثر می‌کنند" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Inside @media you write ordinary CSS — the condition just decides when it wins.",
                    fa: "داخلِ @media همان CSSِ همیشگی را می‌نویسی — شرط فقط تصمیم می‌گیرد کِی حرف‌شنوی شود.",
                  },
                },
                {
                  q: { en: "Why must the viewport meta be present for media queries to work on phones?", fa: "چرا متای viewport باید باشد تا مدیاکوئری‌ها روی موبایل کار کنند؟" },
                  options: [
                    { en: "It makes the CSS load faster", fa: "باعث می‌شود CSS سریع‌تر لود شود" },
                    { en: "Without it the phone fakes a wide desktop width, so the queries never match", fa: "بدونِ آن، موبایل خودش را دسکتاپِ پهن جا می‌زند و کوئری‌ها هرگز matching نمی‌شوند" },
                    { en: "It is only needed for tablets", fa: "فقط برای تبلت‌ها لازم است" },
                  ],
                  answer: 1,
                  explain: {
                    en: "The viewport meta reports the real device width — that is the number media queries measure.",
                    fa: "متای viewport عرضِ واقعیِ دستگاه را گزارش می‌کند — همان عددی که مدیاکوئری‌ها اندازه می‌گیرند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The responsive wall", fa: "دیوارِ واکنش‌گرا" },
              brief: {
                en: "Make the classic responsive move: a `div class='cards'` with EXACTLY three `div class='card'` children (any content), styled as a 3-column grid with a gap — then add `@media (max-width: 600px)` that sets `.cards { grid-template-columns: 1fr; }` so everything stacks on phones. Keep the viewport meta in the head.",
                fa: "حرکتِ کلاسیکِ واکنش‌گرا را انجام بده: یک `div class='cards'` با دقیقاً سه تا `div class='card'` (محتوایش با تو)، به‌صورتِ گریدِ سه‌ستونه با gap — بعد یک `@media (max-width: 600px)` اضافه کن که `.cards { grid-template-columns: 1fr; }` بگذارد تا روی موبایل همه روی‌هم بچینند. متای viewport را هم در head نگه دار.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Responsive Wall</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f1f5f9;
                padding: 16px;
            }
            .cards {
                display: grid;
                gap: 12px;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 12px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <!-- TODO: add the @media (max-width: 600px) block in the <style> above -->
        <h1>Our services</h1>
        <div class="cards">
            <div class="card">🎨 Design</div>
            <div class="card">💻 Code</div>
            <div class="card">🚀 Launch</div>
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Responsive Wall</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f1f5f9;
                padding: 16px;
            }
            .cards {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 12px;
                text-align: center;
            }
            @media (max-width: 600px) {
                .cards {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <h1>Our services</h1>
        <div class="cards">
            <div class="card">🎨 Design</div>
            <div class="card">💻 Code</div>
            <div class="card">🚀 Launch</div>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "The base grid: `.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }`.",
                  fa: "گریدِ پایه: `.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }`.",
                },
                {
                  en: "The media query wraps an ordinary rule: @media (max-width: 600px) { .cards { grid-template-columns: 1fr; } }.",
                  fa: "مدیاکوئری یک قانونِ معمولی را می‌پیچد: @media (max-width: 600px) { .cards { grid-template-columns: 1fr; } }.",
                },
                {
                  en: "Only ONE property changes on mobile: grid-template-columns. That is the whole trick.",
                  fa: "روی موبایل فقط «یک» ویژگی عوض می‌شود: grid-template-columns. کلِ ترفند همین است.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".cards", count: 1 },
                  { selector: ".card", count: 3 },
                  { selector: "style", text: "grid-template-columns" },
                  { selector: "style", text: "@media" },
                  { selector: "style", text: "max-width" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m6-l4",
          title: { en: "Mini-project: Pricing Cards", fa: "مینی‌پروژه: کارت‌های قیمت" },
          goal: {
            en: "Combine grid + a highlighted middle card to build the pricing section every product page has.",
            fa: "گرید و کارتِ شاخصِ وسط را ترکیب کنی تا همان بخشِ قیمت‌گذاری‌ای را بسازی که روی هر صفحه‌ی محصولی هست.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              title: { en: "The anatomy of a pricing section", fa: "کالبدشکافیِ بخشِ قیمت‌گذاری" },
              blocks: [
                {
                  type: "text",
                  en: "Streaming services, gyms, SaaS tools — they all show three plans side by side, and the middle one is ALWAYS shouting 'most popular'. The recipe: a grid container (`.plans`), three card children (`.plan`), and the middle card wearing a second class (`.featured`) that adds a colored border and a slight scale-up. Everything else is text you already master: heading, price, list, button.",
                  fa: "سرویس‌های استریم، باشگاه‌ها، ابزارهای SaaS — همه سه تا پلن کنارِ هم نشان می‌دهند و وسطی همیشه داد می‌زند «محبوب‌ترین». دستورِ پخت: یک ظرفِ گرید (`.plans`)، سه تا کارت (`.plan`)، و کارتِ وسطی که یک کلاسِ دوم (`.featured`) دارد که قابِ رنگی و کمی بزرگ‌نمایی به آن می‌دهد. بقیه متنی است که از قبل استادش هستی: تیتر، قیمت، لیست، دکمه.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>TEKA Cloud Pricing</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #0f172a;
                color: #e2e8f0;
                padding: 24px;
            }
            h1 { text-align: center; }
            .plans {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                max-width: 800px;
                margin: 0 auto;
            }
            .plan {
                background: #1e293b;
                border-radius: 14px;
                padding: 20px;
                text-align: center;
            }
            .featured {
                border: 2px solid #06b6d4;
                transform: scale(1.05);
            }
            .price {
                font-size: 32px;
                color: #7dd3fc;
            }
            ul { list-style: none; padding: 0; }
            li { padding: 6px 0; }
            button {
                width: 100%;
                padding: 10px;
                border: 0;
                border-radius: 8px;
                background: #06b6d4;
                color: #062a3a;
                font-size: 15px;
            }
        </style>
    </head>
    <body>
        <h1>TEKA Cloud ☁️</h1>
        <div class="plans">
            <div class="plan">
                <h3>Starter</h3>
                <div class="price">$0</div>
                <ul>
                    <li>1 project</li>
                    <li>Community help</li>
                </ul>
                <button>Choose Starter</button>
            </div>
            <div class="plan featured">
                <h3>Pro</h3>
                <div class="price">$9</div>
                <ul>
                    <li>10 projects</li>
                    <li>Priority support</li>
                    <li>Custom domain</li>
                </ul>
                <button>Choose Pro</button>
            </div>
            <div class="plan">
                <h3>Team</h3>
                <div class="price">$29</div>
                <ul>
                    <li>Unlimited projects</li>
                    <li>SSO login</li>
                </ul>
                <button>Choose Team</button>
            </div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "The full pattern — spot the middle card carrying TWO classes: plan + featured.",
                    fa: "الگوی کامل — به کارتِ وسط نگاه کن که «دو» کلاس دارد: plan و featured.",
                  },
                },
                {
                  type: "text",
                  en: "The highlight trick is Module 3's double-class move: `class='plan featured'` means the card gets BOTH rule sets — the shared card look from `.plan`, and the special border + `transform: scale(1.05)` (5% bigger) from `.featured`. One extra class, zero duplicated CSS. `transform: scale()` is a preview taste — it grows the card visually without moving its neighbours.",
                  fa: "ترفندِ هایلایت همان حرکتِ دوکلاسه‌ی ماژول ۳ است: `class='plan featured'` یعنی کارت هر دو مجموعه‌قانون را می‌گیرد — ظاهرِ مشترک را از `.plan` و قابِ ویژه + `transform: scale(1.05)` (پنج‌درصد بزرگ‌تر) را از `.featured`. یک کلاسِ اضافه، صفر تکرارِ CSS. `transform: scale()` یک چشک است — کارت را بزرگ نشان می‌دهد بدونِ اینکه همسایه‌ها را جابه‌جا کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Markup first, sparkle later", fa: "اول اسکلت، بعد برق‌و‌جلا" },
              blocks: [
                {
                  type: "text",
                  en: "Pros never start with colors. First the bare structure: container → three cards → inside each card a name, a price, a list, a button. ONLY when the skeleton reads clearly does the CSS arrive. This order saves you from the classic trap: beautiful styles wrapped around broken structure.",
                  fa: "حرفه‌ای‌ها هرگز با رنگ شروع نمی‌کنند. اول اسکلتِ لخت: ظرف → سه کارت → داخلِ هر کارت یک نام، یک قیمت، یک لیست، یک دکمه. فقط وقتی اسکلت خوانا شد، CSS می‌آید. این ترتیب نجاتت می‌دهد از تله‌ی معروف: استایلِ قشنگ دورِ ساختارِ خراب.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pricing — skeleton</title>
    </head>
    <body>
        <!-- pricing section: one container, three plans -->
        <div class="plans">
            <div class="plan">
                <h3>Plan name</h3>
                <div class="price">$0</div>
                <ul>
                    <li>feature one</li>
                    <li>feature two</li>
                </ul>
                <button>Choose</button>
            </div>
            <!-- duplicate this block twice, mark the middle one featured -->
        </div>
    </body>
</html>`,
                  caption: {
                    en: "The skeleton you write before ANY styling — duplicate it, then name the middle card.",
                    fa: "اسکleti که قبل از هر استایلی می‌نویسی — دو بار کپیش کن، بعد کارتِ وسط را نام‌گذاری کن.",
                  },
                },
                {
                  type: "tip",
                  en: "Keep the price in its OWN element (`.price`), not inside the h3 — then you can make the number huge and colored without dragging the plan name along. And keep features as a real `ul` list: semantic (Module 1) and easy to style line by line.",
                  fa: "قیمت را در عنصرِ «خودش» (`.price`) نگه دار، نه داخلِ h3 — بعد می‌توانی عدد را بزرگ و رنگی کنی بدونِ اینکه نامِ پلن هم با آن بزرگ شود. و امکانات را یک لیستِ واقعیِ `ul` نگه دار: معنایی (ماژول ۱) و راحت برای استایلِ خط‌به‌خط.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "How do you give one card two classes, plan AND featured?", fa: "چطور به یک کارت دو کلاس بدهی: plan و featured؟" },
                  options: [
                    { en: "class='plan, featured'", fa: "class='plan, featured'" },
                    { en: "class='plan featured' — a space separates them", fa: "class='plan featured' — فاصله جداشان می‌کند" },
                    { en: "It is impossible; one element, one class", fa: "غیرممکن است؛ یک عنصر، یک کلاس" },
                  ],
                  answer: 1,
                  explain: {
                    en: "A space-separated list inside class='…' — each name picks up its own CSS rules.",
                    fa: "داخلِ class='…' لیستی جداشده با فاصله — هر نام قوانینِ CSS خودش را می‌گیرد.",
                  },
                },
                {
                  q: { en: "Why keep the price in its own .price element?", fa: "چرا قیمت را در عنصرِ جدایِ .price نگه می‌داریم؟" },
                  options: [
                    { en: "So you can style just the number — size, color — without touching the rest", fa: "تا فقط خودِ عدد را استایل بدهی — اندازه و رنگ — بدونِ دست زدن به بقیه" },
                    { en: "HTML requires every price to be wrapped", fa: "HTML الزام کرده که هر قیمت پیچیده شود" },
                    { en: "It makes the page load faster", fa: "صفحه را سریع‌تر لود می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "An element per part = independent styling. That is the whole class system in miniature.",
                    fa: "برای هر بخش یک عنصر = استایلِ مستقل. کلِ سیستمِ کلاس‌ها در اندازه‌ی مینیاتوری.",
                  },
                },
                {
                  q: { en: "What is the semantic way to list a plan's features?", fa: "روشِ معناییِ لیست‌کردنِ امکاناتِ یک پلن چیست؟" },
                  options: [
                    { en: "One long p with dashes", fa: "یک p طولانی با خطِ تیره" },
                    { en: "Repeated h3 tags", fa: "چند تا h3 پشتِ سرِ هم" },
                    { en: "A ul with one li per feature", fa: "یک ul با یک li برای هر امکان" },
                  ],
                  answer: 2,
                  explain: {
                    en: "A feature list IS a list — ul/li carries that meaning to browsers, screen readers and CSS.",
                    fa: "لیستِ امکانات «لیست» است — ul/li این معنا را به مرورگر، صفحه‌خوان و CSS می‌رساند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Pricing Cards", fa: "کارت‌های قیمت" },
              brief: {
                en: "Build the pricing section for ANY product you like: a `div class='plans'` with EXACTLY three `div class='plan'` cards; the MIDDLE plan also gets class `featured`. Each plan contains: an `h3` name (the middle one must say Pro), a `div class='price'` with a price, a `ul` with at least two `li` features, and a `button`. Style `.plans` as a 3-column grid with a gap.",
                fa: "بخشِ قیمت‌گذاریِ «هر محصولی» که دوست داری را بساز: یک `div class='plans'` با دقیقاً سه کارتِ `div class='plan'`؛ پلنِ «وسطی» کلاسِ `featured` را هم می‌گیرد. هر پلن دارد: یک `h3` با نامِ پلن (وسطی باید بگوید Pro)، یک `div class='price'` با قیمت، یک `ul` با حداقل دو `li`، و یک `button`. استایلِ `.plans`: گریدِ سه‌ستونه با gap.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pricing</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            .plans {
                display: grid;
                gap: 16px;
            }
            /* TODO 1) three columns: grid-template-columns: repeat(3, 1fr); */
            /* TODO 2) card look for .plan; special border + scale for .featured */
            /* TODO 3) big colored .price */
        </style>
    </head>
    <body>
        <h1>Choose your plan</h1>
        <div class="plans">
            <div class="plan">
                <h3>Basic</h3>
                <!-- add .price, ul with 2+ li, button -->
            </div>
            <div class="plan">
                <h3>???</h3>
                <!-- middle card: add featured class + Pro name -->
            </div>
            <div class="plan">
                <h3>Ultra</h3>
                <!-- add .price, ul with 2+ li, button -->
            </div>
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pricing</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            .plans {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
            }
            .plan {
                background: white;
                border-radius: 14px;
                padding: 20px;
                text-align: center;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
            }
            .featured {
                border: 2px solid #7c3aed;
                transform: scale(1.05);
            }
            .price {
                font-size: 32px;
                color: #7c3aed;
            }
            ul {
                list-style: none;
                padding: 0;
            }
            li { padding: 6px 0; }
            button {
                width: 100%;
                padding: 10px;
                border: 0;
                border-radius: 8px;
                background: #7c3aed;
                color: white;
                font-size: 15px;
            }
        </style>
    </head>
    <body>
        <h1>Choose your plan</h1>
        <div class="plans">
            <div class="plan">
                <h3>Basic</h3>
                <div class="price">$0</div>
                <ul>
                    <li>3 photos</li>
                    <li>Watermark</li>
                </ul>
                <button>Choose Basic</button>
            </div>
            <div class="plan featured">
                <h3>Pro</h3>
                <div class="price">$12</div>
                <ul>
                    <li>Unlimited photos</li>
                    <li>No watermark</li>
                    <li>HD export</li>
                </ul>
                <button>Choose Pro</button>
            </div>
            <div class="plan">
                <h3>Ultra</h3>
                <div class="price">$29</div>
                <ul>
                    <li>Team seats</li>
                    <li>API access</li>
                </ul>
                <button>Choose Ultra</button>
            </div>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "Three columns first: `.plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }`.",
                  fa: "اول سه ستون: `.plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }`.",
                },
                {
                  en: "The middle card is <div class='plan featured'> with <h3>Pro</h3> inside — one element, two classes.",
                  fa: "کارتِ وسط <div class='plan featured'> است با <h3>Pro</h3> داخلش — یک عنصر، دو کلاس.",
                },
                {
                  en: "Every plan needs: h3 + div.price + ul (2+ li) + button. Copy the shape, change the words.",
                  fa: "هر پلن این‌ها را لازم دارد: h3 + div.price + ul (دو li یا بیشتر) + button. شکل را کپی کن، کلمه‌ها را عوض کن.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".plans", count: 1 },
                  { selector: ".plan", count: 3 },
                  { selector: ".featured", count: 1 },
                  { selector: ".price", count: 3 },
                  { selector: ".plan button", count: 3 },
                  { selector: "h3", text: "pro" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 7 ────────────────────────────────────────────
    {
      id: "html-m7",
      title: { en: "Pro Components", fa: "کامپوننت‌های حرفه‌ای" },
      blurb: {
        en: "Accordions, badges, progress bars, timelines — the building blocks real dashboards are made of, ending in a Server Status Dashboard build.",
        fa: "آکاردئون، نشان، نوارِ پیشرفت و تایم‌لاین — قطعه‌هایی که داشبوردهای واقعی از آن‌ها ساخته می‌شوند؛ آخرش ساختِ داشبوردِ وضعیتِ سرور.",
      },
      lessons: [
        {
          id: "html-m7-l1",
          title: { en: "details & summary — the zero-JS accordion", fa: "details و summary — آکاردئونِ بدونِ جاوااسکریپت" },
          goal: {
            en: "Build click-to-open FAQ sections with native HTML — not one line of JavaScript.",
            fa: "بخشِ سؤالاتِ متداولِ کلیک‌خور بسازی با HTML خالص — بدونِ حتی یک خط جاوااسکریپت.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              title: { en: "A widget built into the browser", fa: "ویجتی که داخلِ مرورگر ساخته شده" },
              blocks: [
                {
                  type: "text",
                  en: "You know the pattern from every FAQ page: the question is visible, the answer hides until you click. For years that required JavaScript. Then HTML grew its own solution: `<details>` is the whole collapsible box, and `<summary>` is the always-visible title line. Everything else you put inside details stays hidden until the user clicks. The triangle marker and the open/close behavior? The browser ships them for free.",
                  fa: "این الگو را از همه‌ی صفحاتِ FAQ می‌شناسی: سؤال دیده می‌شود، جواب پنهان است تا کلیک کنی. سال‌ها برای این کار جاوااسکریپت لازم بود. بعد HTML راه‌حلِ خودش را ساخت: `<details>` کلِ جعبه‌ی تاشو است و `<summary>` همان خطِ همیشه‌دیدنی. هر چیزِ دیگری که داخلِ details بگذاری، تا کلیک نکند پنهان می‌ماند. مثلثِ کنارش و بازوبسته شدنش؟ مرورگر مجانی تحویل می‌دهد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>FAQ</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            details {
                background: white;
                border-radius: 10px;
                padding: 12px 16px;
                margin-bottom: 10px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }
            summary {
                font-weight: bold;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <h1>❓ FAQ</h1>
        <details>
            <summary>Is TEKA Academy really free?</summary>
            <p>Yes. Every lesson, every challenge, zero fees.</p>
        </details>
        <details>
            <summary>Do I need to install anything?</summary>
            <p>No. Everything runs in your browser.</p>
        </details>
        <details>
            <summary>Can I share my certificates?</summary>
            <p>Of course — brag loudly.</p>
        </details>
    </body>
</html>`,
                  caption: {
                    en: "Click each question — open and close costs zero lines of script.",
                    fa: "روی هر سؤال کلیک کن — بازوبسته شدن، صفر خطِ اسکریپت خرج دارد.",
                  },
                },
                {
                  type: "text",
                  en: "Notice the anatomy: the `<summary>` comes FIRST inside details — that is the clickable headline. The `<p>` after it is the payload, hidden by default. Styling works like any element: here details became a white rounded card, and `cursor: pointer` on the summary whispers 'you can click me'.",
                  fa: "به کالبدش دقت کن: `<summary>` «اول» داخلِ details می‌آید — همان تیترِ کلیک‌خور است. `<p>` بعد از آن محتواست که به‌صورتِ پیش‌فرض پنهان است. استایل هم مثل هر عنصری کار می‌کند: اینجا details شده یک کارتِ سفیدِ گرد، و `cursor: pointer` روی summary زمزمه می‌کند «من را می‌شود کلیک کرد».",
                },
                {
                  type: "tip",
                  en: "Add the bare word `open` — `<details open>` — and that box starts EXPANDED. Perfect for the one question everyone asks first.",
                  fa: "فقط کلمه‌ی `open` را اضافه کن — `<details open>` — و آن جعبه «باز» شروع می‌شود. عالی برای همان یک سوالی که همه اول می‌پرسند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Anything can hide inside", fa: "هر چیزی می‌تواند داخلش پنهان شود" },
              blocks: [
                {
                  type: "text",
                  en: "A details box is not limited to a paragraph. Inside you can pack lists, images, even OTHER details (nested accordions — mind-blown?). Real-world uses: FAQ sections, 'read more' teasers, settings panels, spoiler blocks in fan forums, step-by-step instructions where each step expands.",
                  fa: "جعبه‌ی details فقط پاراگراف نیست. داخلش می‌توانی لیست بگذاری، تصویر بگذاری، حتی «details دیگر» (آکاردئونِ تودرتو — ذهنت منفجر شد؟). کاربردهای واقعی: بخشِ سؤالاتِ متداول، «ادامه‌ی مطلب»، پنلِ تنظیمات، بلوکِ اسپویلر در فروم‌ها، دستورالعمل‌های قدم‌به‌قدم که هر قدم باز می‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Details in the wild</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            details {
                background: white;
                border-radius: 10px;
                padding: 12px 16px;
                margin-bottom: 10px;
            }
            summary { font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>🎸 Fan club — season notes</h1>
        <details open>
            <summary>What you missed this season</summary>
            <ul>
                <li>3–2 in the derby 🔥</li>
                <li>New captain appointed</li>
                <li>Stadium got new floodlights</li>
            </ul>
        </details>
        <details>
            <summary>Spoiler: who scored the last-minute winner?</summary>
            <p>Number 9. Of course it was number 9.</p>
        </details>
    </body>
</html>`,
                  caption: {
                    en: "First box starts open (the open attribute), the spoiler starts closed.",
                    fa: "جعبه‌ی اول باز شروع می‌شود (ویژگیِ open)، اسپویلر بسته.",
                  },
                },
                {
                  type: "warn",
                  en: "Do not hide ESSENTIAL info behind a closed details — prices, shipping costs, legal warnings. Hidden content gets skipped. The rule of thumb: summary hides secondary detail, never the headline news.",
                  fa: "اطلاعاتِ «حیاتی» را پشتِ detailsِ بسته پنهان نکن — قیمت‌ها، هزینه‌ی ارسال، هشدارهای قانونی. محتوای پنهان، دیده نمی‌شود. قانونِ سرانگشتی: summary جزئیاتِ فرعی را پنهان می‌کند، نه خبرِ اصلی را.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which tag is the always-visible, clickable title of a collapsible box?", fa: "کدام تگ، تیترِ همیشه‌دیدنی و کلیک‌خورِ یک جعبه‌ی تاشو است؟" },
                  options: [
                    { en: "details", fa: "details" },
                    { en: "summary", fa: "summary" },
                    { en: "caption", fa: "caption" },
                  ],
                  answer: 1,
                  explain: {
                    en: "summary sits first inside details and stays visible; the rest of the content toggles.",
                    fa: "summary اولِ داخلِ details می‌نشیند و همیشه دیده می‌شود؛ بقیه‌ی محتوا بازوبسته می‌شود.",
                  },
                },
                {
                  q: { en: "How do you make a details box start already open?", fa: "چطور کاری کنی یک details از اول باز باشد؟" },
                  options: [
                    { en: "<details open>", fa: "<details open>" },
                    { en: "<details visible>", fa: "<details visible>" },
                    { en: "You cannot — they always start closed", fa: "نمی‌شود — همیشه بسته شروع می‌شوند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The bare boolean attribute `open` means 'start expanded'. Clicking still toggles it.",
                    fa: "ویژگیِ بولیِ `open` یعنی «باز شروع کن». کلیک باز هم بازوبسته‌اش می‌کند.",
                  },
                },
                {
                  q: { en: "What do details + summary give you with ZERO JavaScript?", fa: "details و summary با صفر جاوااسکریپت چه به تو می‌دهند؟" },
                  options: [
                    { en: "A dropdown menu with selectable options", fa: "یک منوی کشویی با گزینه‌های قابل‌انتخاب" },
                    { en: "Click-to-open / click-to-close behavior, handled by the browser", fa: "رفتارِ کلیک-باز و کلیک-بسته، که خودِ مرورگر انجامش می‌دهد" },
                    { en: "A popup window over the page", fa: "یک پنجره‌ی پاپ‌آپ روی صفحه" },
                  ],
                  answer: 1,
                  explain: {
                    en: "The toggle is native browser behavior — accessible, fast, and free.",
                    fa: "بازوبسته شدن رفتارِ بومیِ مرورگر است — قابل‌دسترس، سریع و مجانی.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The FAQ accordion", fa: "آکاردئونِ سؤالاتِ متداول" },
              brief: {
                en: "Build the FAQ for your own project: at least THREE `<details>` boxes, each with a `<summary>` question and a `<p>` answer. One question must contain the word free, and EXACTLY one details must carry the `open` attribute (starts expanded). Style the boxes as white rounded cards with `cursor: pointer` on the summary.",
                fa: "برای پروژه‌ی خودت یک FAQ بساز: حداقل «سه» تا `<details>`، هرکدام با یک `<summary>` سؤال و یک `<p>` جواب. یکی از سؤال‌ها باید کلمه‌ی free را داشته باشد، و «دقیقاً یک» details باید ویژگیِ `open` را داشته باشد (باز شروع شود). جعبه‌ها را کارتِ سفیدِ گرد کن و روی summary هم `cursor: pointer` بگذار.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>FAQ</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            details {
                background: white;
                border-radius: 10px;
                padding: 12px 16px;
                margin-bottom: 10px;
            }
            summary { font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>❓ FAQ — PhotoCamp</h1>
        <!-- TODO: three details boxes; one must start open; one question says "free" -->
        <details>
            <summary>What gear do I need?</summary>
            <p>Any camera you already own — even a phone.</p>
        </details>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>FAQ</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            details {
                background: white;
                border-radius: 10px;
                padding: 12px 16px;
                margin-bottom: 10px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }
            summary { font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>❓ FAQ — PhotoCamp</h1>
        <details open>
            <summary>Is PhotoCamp free to join?</summary>
            <p>Yes — the starter track is completely free, forever.</p>
        </details>
        <details>
            <summary>What gear do I need?</summary>
            <p>Any camera you already own — even a phone.</p>
        </details>
        <details>
            <summary>Do I get a certificate?</summary>
            <p>After the final photo walk, yes.</p>
        </details>
    </body>
</html>`,
              hints: [
                {
                  en: "Shape of one item: <details> <summary>Question?</summary> <p>Answer.</p> </details> — make three.",
                  fa: "شکلِ هر آیتم: <details> <summary>سؤال؟</summary> <p>جواب.</p> </details> — سه تا بساز.",
                },
                {
                  en: "Starting open = just add the word: <details open>. One box only.",
                  fa: "باز شروع شدن = فقط یک کلمه اضافه کن: <details open>. فقط یک جعبه.",
                },
                {
                  en: "The word free can live anywhere in a summary's text — e.g. 'Is it free to join?'",
                  fa: "کلمه‌ی free هر جای متنِ summary می‌تواند باشد — مثلِ «Is it free to join?»",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "details", count: 3 },
                  { selector: "summary", count: 3 },
                  { selector: "details[open]", count: 1 },
                  { selector: "summary", text: "free" },
                  { selector: "details p", count: 3 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m7-l2",
          title: { en: "Badges & progress bars", fa: "نشان‌ها و نوارهای پیشرفت" },
          goal: {
            en: "Style pill badges and build progress bars out of plain divs — the small components dashboards run on.",
            fa: "نشان‌های کپسولی بسازی و نوارِ پیشرفت را از div خالی دربیاوری — قطعه‌های کوچکی که داشبوردها رویشان سوارند.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Badges: tiny labels, big jobs", fa: "نشان‌ها: برچسب‌های کوچک، مأموریت‌های بزرگ" },
              blocks: [
                {
                  type: "text",
                  en: "A badge is a tiny pill carrying one word: a genre tag on a song, Online / Offline, a notification count, a plan tier. The recipe is three properties on a `span`: some `padding`, `border-radius: 999px` (Module 3's pill — 999 is a joke number meaning 'as round as possible'), and a `background` whose color carries the meaning. Green = good, amber = warning, red = problem.",
                  fa: "نشان (Badge) یک کپسولِ کوچک است با یک کلمه: ژانرِ یک آهنگ، Online یا Offline، تعدادِ اعلان‌ها، سطحِ اشتراک. دستورِ پختش سه ویژگی روی یک `span` است: کمی `padding`، `border-radius: 999px` (همان کپسولِ ماژول ۳ — عددِ ۹۹۹ شوخی است یعنی «هرچه می‌شود گردتر»)، و یک `background` که رنگش معنا حمل می‌کند. سبز = خوب، کهربایی = هشدار، قرمز = مشکل.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Now Playing</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #18181b;
                color: white;
                padding: 24px;
            }
            .track {
                display: flex;
                align-items: center;
                gap: 12px;
                background: #27272a;
                border-radius: 10px;
                padding: 10px 14px;
                margin-bottom: 8px;
            }
            .title { flex: 1; }
            .badge {
                padding: 4px 12px;
                border-radius: 999px;
                font-size: 12px;
            }
            .lofi { background: #7c3aed; }
            .rock { background: #ef4444; }
            .pop  { background: #06b6d4; }
        </style>
    </head>
    <body>
        <h1>🎵 Tonight's queue</h1>
        <div class="track">
            <span class="title">Midnight Study 🌙</span>
            <span class="badge lofi">lo-fi</span>
        </div>
        <div class="track">
            <span class="title">Thunder Riff ⚡</span>
            <span class="badge rock">rock</span>
        </div>
        <div class="track">
            <span class="title">Sugar Pop 🍬</span>
            <span class="badge pop">pop</span>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "One .badge class for the shape, one color class per meaning — the two-class pattern again.",
                    fa: "یک کلاسِ .badge برای شکل، یک کلاسِ رنگی برای هر معنا — باز همان الگویِ دوکلاسه.",
                  },
                },
                {
                  type: "text",
                  en: "Look at the two-class split: `.badge` owns the SHAPE (padding, radius, size) — shared by every badge. `.lofi`, `.rock`, `.pop` only set a color. Add a fourth genre and you write exactly one new rule. This separation — shape once, color per meaning — is how real design systems stay small.",
                  fa: "به تقسیمِ دوکلاسه نگاه کن: `.badge` «شکل» را دارد (padding و radius و اندازه) — مشترک بین همه‌ی نشان‌ها. `.lofi` و `.rock` و `.pop` فقط رنگ می‌گذارند. ژانرِ چهارمی اضافه کنی، دقیقاً یک قانونِ جدید می‌نویسی. همین تفکیک — شکلِ یک‌بار، رنگِ هر معنا — کاری است که سیستم‌های طراحیِ واقعی کوچک نگه می‌دارد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The progress bar: two divs and a width", fa: "نوارِ پیشرفت: دو div و یک width" },
              blocks: [
                {
                  type: "text",
                  en: "There is no magic progress tag you need — the pattern is two nested divs. The OUTER div is the track: a fixed height, gray background, fully rounded. The INNER div is the fill: same height (100%), a colored background, and a `width` in percent. The width IS the progress — `width: 70%` paints 70% of the track. Change one number, the bar moves.",
                  fa: "تگِ جادوییِ مخصوصِ پیشرفت لازم نیست — الگو دو divِ تودرتو است. divِ «بیرونی» ریل است: ارتفاعِ ثابت، پس‌زمینه‌ی خاکستری، کاملاً گرد. divِ «درونی» پرکننده است: همان ارتفاع (۱۰۰٪)، پس‌زمینه‌ی رنگی، و یک `width` درصدی. خودِ width یعنی پیشرفت — `width: 70%` یعنی ۷۰٪ ریل رنگ می‌شود. یک عدد را عوض کن، نوار حرکت می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Skill bars</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            .skill { margin-bottom: 14px; }
            .label {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
            }
            .bar {
                height: 14px;
                background: #e2e8f0;
                border-radius: 999px;
            }
            .fill {
                height: 100%;
                border-radius: 999px;
                background: linear-gradient(90deg, #06b6d4, #7c3aed);
            }
        </style>
    </head>
    <body>
        <h2>My skills</h2>
        <div class="skill">
            <div class="label"><span>HTML</span><span>80%</span></div>
            <div class="bar"><div class="fill" style="width: 80%"></div></div>
        </div>
        <div class="skill">
            <div class="label"><span>CSS</span><span>65%</span></div>
            <div class="bar"><div class="fill" style="width: 65%"></div></div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "Track + fill + width percent — drag the numbers and watch it breathe.",
                    fa: "ریل + پرکننده + عرضِ درصدی — عددها را عوض کن و ببین نفس می‌کشد.",
                  },
                },
                {
                  type: "tip",
                  en: "Put the fill's width as an inline `style='width: 70%'` (like above) or in its own class — both fine. But always give the bar a TEXT label with the number: a naked bar tells a screen reader nothing, and 'CSS 65%' tells humans instantly.",
                  fa: "عرضِ پرکننده را inline بگذار `style='width: 70%'` (مثل بالا) یا در کلاسِ خودش — هر دو خوب است. ولی همیشه کنارِ نوار یک برچسبِ متنی با عدد بگذار: نوارِ لُخت به صفحه‌خوان هیچ نمی‌گوید، ولی «CSS 65%» را آدم‌ها همان لحظه می‌فهمند.",
                },
                {
                  type: "warn",
                  en: "The fill is EMPTY (no text) — if you forget its width it collapses to zero and vanishes. 'My bar disappeared' almost always means 'I never set the width' or 'the height is 0'.",
                  fa: "پرکننده «خالی» است (متنی ندارد) — اگر width یادت برود، جمع می‌شود به صفر و غیبش می‌زند. «نوارم ناپدید شد» تقریباً همیشه یعنی «width نگذاشتم» یا «ارتفاع صفر است».",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What turns a span into a pill-shaped badge?", fa: "چه چیزی یک span را به نشانِ کپسولی تبدیل می‌کند؟" },
                  options: [
                    { en: "border-style: pill", fa: "border-style: pill" },
                    { en: "display: badge", fa: "display: badge" },
                    { en: "border-radius: 999px — fully rounded ends", fa: "border-radius: 999px — دو سرِ کاملاً گرد" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Half the height as a radius = a perfect pill. 999px is just 'as round as possible'.",
                    fa: "شعاعی به‌اندازه‌ی نصفِ ارتفاع = کپسولِ کامل. ۹۹۹ پیکسل فقط یعنی «هرچه گردتر».",
                  },
                },
                {
                  q: { en: "In the two-div progress bar, the visible progress comes from…", fa: "در نوارِ پیشرفتِ دو-divی، پیشرفتِ قابل‌دیدن از کجا می‌آید؟" },
                  options: [
                    { en: "The .bar's border color", fa: "رنگِ borderِ .bar" },
                    { en: "The inner .fill div's width percentage inside the .bar track", fa: "عرضِ درصدیِ divِ داخلیِ .fill داخلِ ریلِ .bar" },
                    { en: "A special progress attribute on the bar", fa: "یک ویژگیِ خاصِ progress روی نوار" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Track (outer) + fill (inner) + width percent — that is the whole component.",
                    fa: "ریل (بیرونی) + پرکننده (درونی) + عرضِ درصدی — کلِ کامپوننت همین است.",
                  },
                },
                {
                  q: { en: "Why does a badge often carry two classes, like class='badge rock'?", fa: "چرا نشان‌ها اغلب دو کلاس دارند، مثل class='badge rock'؟" },
                  options: [
                    { en: "'badge' shares the shape; 'rock' adds that meaning's color", fa: "«badge» شکلِ مشترک را می‌دهد؛ «rock» رنگِ آن معنا را اضافه می‌کند" },
                    { en: "One of them is a required id", fa: "یکی‌شان idِ اجباری است" },
                    { en: "Two classes make the page faster", fa: "دو کلاس صفحه را سریع‌تر می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Shape written once, color per meaning — add a genre, add one rule, done.",
                    fa: "شکل یک‌بار نوشته می‌شود، رنگ برای هر معنا — ژانر جدید، یک قانون، تمام.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The skill wall", fa: "دیوارِ مهارت‌ها" },
              brief: {
                en: "Build a 'My skills' section: an `h2` that says My skills, then THREE `div class='skill'` blocks. Each skill has a `span class='label'` naming it (HTML, CSS, Grid — or your own) and a `div class='bar'` containing a `div class='fill'`. Give the fills DIFFERENT widths (inline styles are fine) and the bar a track + rounded look.",
                fa: "بخشِ «My skills» را بساز: یک `h2` که بنویسد My skills، بعد «سه» تا `div class='skill'`. هر مهارت یک `span class='label'` دارد که نامش را می‌گوید (HTML و CSS و Grid — یا خودت) و یک `div class='bar'` که داخلش یک `div class='fill'` است. به fillها عرضِ «متفاوت» بده (استایلِ inline هم آزاد است) و به نوار ظاهرِ ریل‌مانند و گرد بده.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Skill wall</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            /* TODO 1) .bar → height, gray track, border-radius: 999px */
            /* TODO 2) .fill → height: 100%; colored background */
            /* TODO 3) three .skill blocks with .label + .bar > .fill */
        </style>
    </head>
    <body>
        <h2>My skills</h2>
        <!-- build three skills here -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Skill wall</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f8fafc;
                padding: 24px;
            }
            .skill { margin-bottom: 14px; }
            .label { margin-bottom: 4px; font-weight: bold; }
            .bar {
                height: 14px;
                background: #e2e8f0;
                border-radius: 999px;
            }
            .fill {
                height: 100%;
                border-radius: 999px;
                background: linear-gradient(90deg, #06b6d4, #7c3aed);
            }
        </style>
    </head>
    <body>
        <h2>My skills</h2>
        <div class="skill">
            <span class="label">HTML — 80%</span>
            <div class="bar"><div class="fill" style="width: 80%"></div></div>
        </div>
        <div class="skill">
            <span class="label">CSS — 65%</span>
            <div class="bar"><div class="fill" style="width: 65%"></div></div>
        </div>
        <div class="skill">
            <span class="label">Grid — 40%</span>
            <div class="bar"><div class="fill" style="width: 40%"></div></div>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "One skill's shape: <div class='skill'> <span class='label'>HTML</span> <div class='bar'><div class='fill' style='width: 80%'></div></div> </div>",
                  fa: "شکلِ یک مهارت: <div class='skill'> <span class='label'>HTML</span> <div class='bar'><div class='fill' style='width: 80%'></div></div> </div>",
                },
                {
                  en: "The track: .bar { height: 14px; background: #e2e8f0; border-radius: 999px; } and .fill { height: 100%; background: …; }",
                  fa: "ریل: .bar { height: 14px; background: #e2e8f0; border-radius: 999px; } و .fill { height: 100%; background: …; }",
                },
                {
                  en: "Three .skill blocks total — change the width percent in each so they differ.",
                  fa: "در کل سه تا .skill — درصدِ width را در هرکدام عوض کن تا با هم فرق کنند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "h2", text: "my skills" },
                  { selector: ".skill", count: 3 },
                  { selector: ".bar", count: 3 },
                  { selector: ".fill", count: 3 },
                  { selector: ".skill .label", count: 3 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m7-l3",
          title: { en: "Build a timeline", fa: "ساختِ تایم‌لاین" },
          goal: {
            en: "Combine border-left, spacing and positioned dots into a professional vertical timeline.",
            fa: "با border-left و فاصله‌ها و نقطه‌های position‌دار، یک تایم‌لاینِ عمودیِ حرفه‌ای بسازی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "A rail and its stations", fa: "یک ریل و ایستگاه‌هایش" },
              blocks: [
                {
                  type: "text",
                  en: "A vertical timeline is two ingredients: a continuous RAIL on the left, and EVENTS hanging beside it. The rail is just `border-left` on the container — one line, unbroken. Each event is a block (`.event`) with a title and a description, and a little DOT pinned exactly onto the rail. You built every piece already: borders (Module 3), positioning (Module 6). Now they assemble.",
                  fa: "تایم‌لاینِ عمودی دو ماده دارد: یک «ریل»ِ پیوسته در چپ، و «رویدادها» که کنارش آویزانند. ریل فقط `border-left` روی ظرف است — یک خط، بدونِ شکستگی. هر رویداد یک بلاک است (`.event`) با تیتر و توضیح، و یک نقطه‌ی کوچک که دقیقاً روی ریل میخکوب شده. همه‌ی قطعه‌ها را قبلاً ساخته‌ای: border (ماژول ۳)، positioning (ماژول ۶). حالا سرهمشان می‌کنیم.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Road to the Final</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f0fdf4;
                padding: 24px;
            }
            .timeline {
                border-left: 4px solid #10b981;
                padding-left: 20px;
                margin: 24px;
            }
            .event {
                position: relative;
                padding-bottom: 20px;
            }
            .dot {
                position: absolute;
                top: 4px;
                left: -29px;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #10b981;
            }
        </style>
    </head>
    <body>
        <h1>⚽ Road to the Final</h1>
        <div class="timeline">
            <div class="event">
                <span class="dot"></span>
                <h3>Quarter-final</h3>
                <p>We won 2–0. The stadium was on fire. 🔥</p>
            </div>
            <div class="event">
                <span class="dot"></span>
                <h3>Semi-final</h3>
                <p>Penalties. Heartbeats. 5–4.</p>
            </div>
            <div class="event">
                <span class="dot"></span>
                <h3>The Final 🏆</h3>
                <p>Saturday, 21:00. Be there.</p>
            </div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "Green rail on the container, green dots pinned onto it — one continuous story.",
                    fa: "ریلِ سبز روی ظرف، نقطه‌های سبزِ میخکوب‌شده روی آن — یک روایتِ پیوسته.",
                  },
                },
                {
                  type: "text",
                  en: "The dot is a positioned span (Module 6, lesson 2 — told you it would come back): `.event` gets `position: relative` so every event becomes its own measuring frame, and `.dot` gets `position: absolute` with a NEGATIVE `left` that pulls it backwards onto the rail. `border-radius: 50%` on a square = a circle.",
                  fa: "نقطه یک spanِ position‌دار است (ماژول ۶، درسِ ۲ — گفتم برمی‌گردد): `.event` می‌گیرد `position: relative` تا هر رویداد خودش قابِ اندازه‌گیری شود، و `.dot` می‌گیرد `position: absolute` با `left` «منفی» که آن را به عقب و روی ریل می‌کشد. `border-radius: 50%` روی یک مربع = دایره.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "What belongs on a timeline", fa: "چه چیزی به تایم‌لاین می‌آید" },
              blocks: [
                {
                  type: "text",
                  en: "Timelines fit anything that has an ORDER: a company's history, a football club's season, a product roadmap (v1.0 → v1.5 → v2.0), a recipe's steps, a course's modules. Keep every event the same SHAPE — dot, title (with the date inside it), short description — and the reader's eye slides down the rail effortlessly.",
                  fa: "تایم‌لاین برای هر چیزی است که «ترتیب» دارد: تاریخچه‌ی یک شرکت، فصلِ یک باشگاهِ فوتبال، نقشه‌ی راهِ محصول (v1.0 → v1.5 → v2.0)، مراحلِ یک دستورِ پخت، ماژول‌های یک دوره. شکلِ همه‌ی رویدادها را یکی نگه دار — نقطه، تیتر (تاریخ داخلش)، توضیحِ کوتاه — و چشمِ خواننده روی ریل سُر می‌خورد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!-- one event = one shape, repeated -->
<div class="event">
    <span class="dot"></span>
    <h3>v1.0 — March</h3>
    <p>First public release. Two users: me and my mom.</p>
</div>
<div class="event">
    <span class="dot"></span>
    <h3>v1.5 — June</h3>
    <p>Dark mode. The people demanded it.</p>
</div>`,
                  caption: {
                    en: "Copy the event shape, change the words — that is component thinking.",
                    fa: "شکلِ رویداد را کپی کن، کلمه‌ها را عوض کن — این یعنی تفکرِ کامپوننتی.",
                  },
                },
                {
                  type: "tip",
                  en: "Extra states are one class away: give finished events an extra class like `done` and color their dots gray — `.done .dot { background: #94a3b8; }`. Past = gray, present = bright. Instant roadmap semantics.",
                  fa: "حالت‌های اضافه یک کلاس فاصله دارند: به رویدادهای تمام‌شده یک کلاسِ اضافه مثل `done` بده و نقطه‌هایشان را خاکستری کن — `.done .dot { background: #94a3b8; }`. گذشته = خاکستری، حال = روشن. معنای نقشه‌ی راه، فوری.",
                },
                {
                  type: "warn",
                  en: "The border goes on the CONTAINER, not on each event — a border per event gives you a dotted, broken ladder instead of one continuous rail. One rail, many stations.",
                  fa: "border را روی «ظرف» بگذار، نه روی هر رویداد — border برای هر رویداد یک نردبانِ نقطه‌چینِ شکسته می‌سازد، نه یک ریلِ پیوسته. یک ریل، چند ایستگاه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Where does the continuous vertical rail come from?", fa: "ریلِ عمودیِ پیوسته از کجا می‌آید؟" },
                  options: [
                    { en: "A border on each event", fa: "یک border روی هر رویداد" },
                    { en: "border-left on the .timeline container", fa: "border-left روی ظرفِ .timeline" },
                    { en: "A background image behind the page", fa: "یک تصویرِ پس‌زمینه پشتِ صفحه" },
                  ],
                  answer: 1,
                  explain: {
                    en: "One border on the container = one unbroken rail. Per-event borders break the line.",
                    fa: "یک border روی ظرف = یک ریلِ بی‌شکست. borderِ تکی روی رویدادها خط را قطع می‌کند.",
                  },
                },
                {
                  q: { en: "Why does each .event need position: relative?", fa: "چرا هر .event به position: relative نیاز دارد؟" },
                  options: [
                    { en: "So its absolutely-positioned dot measures from the event itself", fa: "تا نقطه‌ی absolute‌اش از خودِ همان رویداد اندازه بگیرد" },
                    { en: "To make the event bold", fa: "تا رویداد بولد شود" },
                    { en: "It does not — relative is only decoration", fa: "لازم ندارد — relative فقط تزئین است" },
                  ],
                  answer: 0,
                  explain: {
                    en: "relative turns each event into the anchor frame; the dot's negative left then reaches back onto the rail.",
                    fa: "relative هر رویداد را به قابِ لنگر تبدیل می‌کند؛ بعد leftِ منفیِ نقطه، آن را به عقب و روی ریل می‌رساند.",
                  },
                },
                {
                  q: { en: "What makes the .dot a perfect circle?", fa: "چه چیزی .dot را به دایره‌ی کامل تبدیل می‌کند؟" },
                  options: [
                    { en: "border-style: round", fa: "border-style: round" },
                    { en: "position: circle", fa: "position: circle" },
                    { en: "Equal width and height + border-radius: 50%", fa: "width و height برابر + border-radius: 50%" },
                  ],
                  answer: 2,
                  explain: {
                    en: "A square with a 50% radius is a circle — the same trick pills use with 999px.",
                    fa: "مربع با شعاعِ ۵۰٪ می‌شود دایره — همان ترفندِ کپسول‌ها با ۹۹۹ پیکسل.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The roadmap", fa: "نقشه‌ی راه" },
              brief: {
                en: "Build a roadmap or history timeline: a `div class='timeline'` with THREE `div class='event'` children. Each event contains: a `span class='dot'`, an `h3` title that includes a year (the first one must include 2024), and a `p` description. Style: `border-left` rail on `.timeline`, `position: relative` on `.event`, an absolutely-positioned circular `.dot`.",
                fa: "یک تایم‌لاینِ نقشه‌ی راه یا تاریخچه بساز: یک `div class='timeline'` با «سه» تا `div class='event'`. هر رویداد دارد: یک `span class='dot'`، یک `h3` که داخلش سال باشد (اولی باید 2024 را داشته باشد)، و یک `p` توضیح. استایل: ریلِ `border-left` روی `.timeline`، `position: relative` روی `.event`، و `.dot` دایره‌ایِ absolute.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Roadmap</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f0fdf4;
                padding: 24px;
            }
            /* TODO 1) .timeline → border-left: 4px solid #10b981; padding-left: 20px; */
            /* TODO 2) .event → position: relative; */
            /* TODO 3) .dot → position: absolute; square + border-radius: 50%; */
        </style>
    </head>
    <body>
        <h1>🗺️ My app's roadmap</h1>
        <div class="timeline">
            <!-- three events, each with a dot, an h3 (with a year) and a p -->
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Roadmap</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f0fdf4;
                padding: 24px;
            }
            .timeline {
                border-left: 4px solid #10b981;
                padding-left: 20px;
                margin: 24px;
            }
            .event {
                position: relative;
                padding-bottom: 20px;
            }
            .dot {
                position: absolute;
                top: 4px;
                left: -29px;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #10b981;
            }
        </style>
    </head>
    <body>
        <h1>🗺️ My app's roadmap</h1>
        <div class="timeline">
            <div class="event">
                <span class="dot"></span>
                <h3>2024 — First sketch</h3>
                <p>A notebook full of ideas and one wireframe.</p>
            </div>
            <div class="event">
                <span class="dot"></span>
                <h3>2025 — Public beta</h3>
                <p>Fifty brave testers. Two hundred bug reports.</p>
            </div>
            <div class="event">
                <span class="dot"></span>
                <h3>2026 — Version 1.0</h3>
                <p>Ship it. Then celebrate. Then ship more.</p>
            </div>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "One event's shape: <div class='event'> <span class='dot'></span> <h3>2024 — Title</h3> <p>Story.</p> </div>",
                  fa: "شکلِ یک رویداد: <div class='event'> <span class='dot'></span> <h3>2024 — عنوان</h3> <p>داستان.</p> </div>",
                },
                {
                  en: "The dot: a 14px square span, border-radius: 50%, position: absolute, left: -29px pulls it onto the rail.",
                  fa: "نقطه: یک span مربعِ ۱۴ پیکسلی، border-radius: 50%، position: absolute، و left: -29px که روی ریل بکشدش.",
                },
                {
                  en: "border-left goes on .timeline (the container), position: relative on .event (the anchor).",
                  fa: "border-left روی .timeline می‌رود (ظرف)، position: relative روی .event (لنگر).",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".timeline", count: 1 },
                  { selector: ".event", count: 3 },
                  { selector: ".dot", count: 3 },
                  { selector: ".event h3", count: 3 },
                  { selector: "h3", text: "2024" },
                  { selector: "style", text: "border-left" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m7-l4",
          title: { en: "Mini-project: Server Status Dashboard", fa: "مینی‌پروژه: داشبوردِ وضعیتِ سرور" },
          goal: {
            en: "Compose badges + progress bars into a status dashboard — the page every serious service ships.",
            fa: "نشان‌ها و نوارهای پیشرفت را ترکیب کنی و داشبوردِ وضعیت بسازی — همان صفحه‌ای که هر سرویسِ جدی منتشرش می‌کند.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              title: { en: "The status page, decoded", fa: "رمزگشاییِ صفحه‌ی وضعیت" },
              blocks: [
                {
                  type: "text",
                  en: "When a big site breaks, everyone runs to its status page — GitHub, Vercel, Discord all have one. Look closely: each row is just this lesson set composed — a service NAME, a colored status BADGE (Operational / Degraded / Down), and an uptime PROGRESS BAR. You already own all three pieces. Today you assemble them into something that looks like it belongs in a company's ops room.",
                  fa: "وقتی یک سایتِ بزرگ می‌شکند، همه به صفحه‌ی وضعیتش هجوم می‌آورند — GitHub و Vercel و Discord همه دارند. دقیق نگاه کن: هر ردیف فقط همین درس‌های اخیر است که سرهم شده‌اند — یک «نامِ» سرویس، یک «نشانِ» رنگی وضعیت (Operational / Degraded / Down)، و یک «نوارِ پیشرفتِ» uptime. هر سه قطعه را already داری. امروز آنها را به چیزی سرهم می‌کنی که شبیه اتاقِ عملیاتِ یک شرکت است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Status</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #0f172a;
                color: #e2e8f0;
                padding: 24px;
            }
            h1 { font-size: 22px; }
            .service {
                display: flex;
                align-items: center;
                gap: 14px;
                background: #1e293b;
                border-radius: 12px;
                padding: 14px 18px;
                margin-bottom: 10px;
            }
            .name { width: 110px; font-weight: bold; }
            .status {
                padding: 4px 12px;
                border-radius: 999px;
                font-size: 13px;
            }
            .ok   { background: #065f46; color: #6ee7b7; }
            .warn { background: #78350f; color: #fcd34d; }
            .down { background: #7f1d1d; color: #fca5a5; }
            .bar {
                flex: 1;
                height: 10px;
                background: #334155;
                border-radius: 999px;
            }
            .fill {
                height: 100%;
                border-radius: 999px;
                background: #10b981;
            }
        </style>
    </head>
    <body>
        <h1>🟢 System status</h1>
        <div class="service">
            <span class="name">API</span>
            <span class="status ok">Operational</span>
            <div class="bar"><div class="fill" style="width: 99%"></div></div>
        </div>
        <div class="service">
            <span class="name">Database</span>
            <span class="status warn">Degraded</span>
            <div class="bar"><div class="fill" style="width: 74%"></div></div>
        </div>
        <div class="service">
            <span class="name">CDN</span>
            <span class="status down">Down</span>
            <div class="bar"><div class="fill" style="width: 12%"></div></div>
        </div>
    </body>
</html>`,
                  caption: {
                    en: "Name + badge + bar, three times. All three states shown: green, amber, red.",
                    fa: "نام + نشان + نوار، سه بار. هر سه حالت: سبز، کهربایی، قرمز.",
                  },
                },
                {
                  type: "text",
                  en: "Each row is a flex line (Module 3): the name takes its small fixed width, the badge hugs its text, and `.bar { flex: 1 }` stretches to swallow all the LEFTOVER width — that is why every bar ends perfectly aligned. The status classes `.ok / .warn / .down` reuse the badge-color pattern from the previous lesson.",
                  fa: "هر ردیف یک خطِ فلکس است (ماژول ۳): نام، عرضِ کوچکِ ثابت می‌گیرد؛ نشان به اندازه‌ی متنش می‌چسبد؛ و `.bar { flex: 1 }` آن‌قدر کش می‌آید که همه‌ی فضای «باقی‌مانده» را قورت بدهد — برای همین همه‌ی نوارها سرِ خطِ هم تمام می‌شوند. کلاس‌های `.ok / .warn / .down` هم همان الگویِ رنگِ نشانِ درسِ قبل‌اند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Compose, don't copy-paste", fa: "سرهم کن، کپی-پیست نکن" },
              blocks: [
                {
                  type: "text",
                  en: "The professional move is not writing three different rows — it is building ONE row well and repeating its structure. Component thinking: `.service` is a row, `.status` is a badge, `.bar > .fill` is a meter. Because every row uses the SAME class names, the CSS stays tiny and any new service is a copy of the markup, not of the styles.",
                  fa: "حرکتِ حرفه‌ای این نیست که سه ردیفِ متفاوت بنویسی — این است که «یک» ردیف را خوب بسازی و ساختارش را تکرار کنی. تفکرِ کامپوننتی: `.service` یک ردیف است، `.status` یک نشان، `.bar > .fill` یک سنجه. چون همه‌ی ردیف‌ها «همان» اسم‌های کلاس را دارند، CSS کوچک می‌ماند و سرویسِ جدید فقط کپیِ مارک‌آپ است، نه استایل.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!-- one row = the component; duplicate it per service -->
<div class="service">
    <span class="name">Service name</span>
    <span class="status ok">Operational</span>
    <div class="bar"><div class="fill" style="width: 99%"></div></div>
</div>
<!-- states: ok → Operational, warn → Degraded, down → Down -->`,
                  caption: {
                    en: "The row template — swap the name, the state class and the width.",
                    fa: "قالبِ ردیف — نام و کلاسِ حالت و عرض را عوض کن.",
                  },
                },
                {
                  type: "tip",
                  en: "Keep the three state classes (.ok, .warn, .down) DEFINED even if you don't use all of them — a status page must be ready for a bad day. Design systems are always prepared for the state you hope never happens.",
                  fa: "سه کلاسِ حالت (.ok و .warn و .down) را همیشه «تعریف‌شده» نگه دار حتی اگر از همه‌شان استفاده نکنی — صفحه‌ی وضعیت باید برای روزِ بد آماده باشد. سیستم‌های طراحی همیشه برای حالتی آماده‌اند که آرزو می‌کنی هرگز رخ ندهد.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "One status row is composed of…", fa: "یک ردیفِ وضعیت از چه ساخته شده؟" },
                  options: [
                    { en: "A .name, a .status badge, and a .bar with a .fill inside", fa: "یک .name، یک نشانِ .status، و یک .bar با .fill داخلش" },
                    { en: "A table with three cells", fa: "یک جدول با سه سلول" },
                    { en: "Three nested details boxes", fa: "سه تا details تودرتو" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Name + badge + meter — the exact pieces from lessons 2 and 3 of this module.",
                    fa: "نام + نشان + سنجه — دقیقاً قطعه‌های درس‌های ۲ و ۳ همین ماژول.",
                  },
                },
                {
                  q: { en: "Why do all rows share the same class names (.service, .status, .bar)?", fa: "چرا همه‌ی ردیف‌ها همان اسم‌های کلاس را دارند (.service و .status و .bar)؟" },
                  options: [
                    { en: "One CSS definition then styles every row — consistency means less code", fa: "یک تعریفِ CSS بعد همه‌ی ردیف‌ها را استایل می‌دهد — یکدستی یعنی کدِ کمتر" },
                    { en: "Because ids are forbidden in HTML", fa: "چون id در HTML ممنوع است" },
                    { en: "To make the HTML file bigger and safer", fa: "تا فایلِ HTML بزرگ‌تر و مطمئن‌تر شود" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Shared classes = shared rules. Add a service, add markup — zero new CSS.",
                    fa: "کلاسِ مشترک = قانونِ مشترک. سرویسِ جدید یعنی مارک‌آپ — صفر CSSِ جدید.",
                  },
                },
                {
                  q: { en: "What does flex: 1 achieve on the .bar inside a flex row?", fa: "flex: 1 روی .bar داخلِ ردیفِ فلکس چه می‌کند؟" },
                  options: [
                    { en: "It makes the bar exactly 1px tall", fa: "نوار را دقیقاً ۱ پیکسل می‌کند" },
                    { en: "It stretches the bar to fill the space left over after the name and badge", fa: "نوار را می‌کشد تا فضای باقی‌مانده بعد از نام و نشان را پر کند" },
                    { en: "It centers the bar vertically", fa: "نوار را عمودی وسط‌چین می‌کند" },
                  ],
                  answer: 1,
                  explain: {
                    en: "flex: 1 = 'take the leftovers' — that is why every bar ends at the same right edge.",
                    fa: "flex: 1 یعنی «باقی‌مانده را بگیر» — برای همین همه‌ی نوارها به یک لبه‌ی راست می‌رسند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Server Status Dashboard", fa: "داشبوردِ وضعیتِ سرور" },
              brief: {
                en: "Build the status page: an `h1` (any title), then THREE `div class='service'` rows. Each row: a `span class='name'` (your three services must include API, Database and CDN), a `span class='status'` whose text is Operational / Degraded / Down respectively (one each), and a `div class='bar'` wrapping a `div class='fill'`. Style the rows as flex lines with a gap; make the status pill-shaped with .ok/.warn/.down colors.",
                fa: "صفحه‌ی وضعیت را بساز: یک `h1` (هر عنوانی)، بعد «سه» ردیفِ `div class='service'`. هر ردیف: یک `span class='name'` (سه سرویسِ تو باید API و Database و CDN را داشته باشند)، یک `span class='status'` که متنش به‌ترتیب Operational / Degraded / Down باشد (از هر کدام یکی)، و یک `div class='bar'` که `div class='fill'` را در بر دارد. ردیف‌ها را خطِ فلکس با gap کن؛ نشان را کپسولی کن با رنگ‌های .ok/.warn/.down.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Status</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #0f172a;
                color: #e2e8f0;
                padding: 24px;
            }
            /* TODO 1) .service → display: flex; align-items: center; gap: 14px; card look */
            /* TODO 2) .status → pill; plus .ok / .warn / .down colors */
            /* TODO 3) .bar + .fill → the uptime meter */
        </style>
    </head>
    <body>
        <h1>🟢 System status</h1>
        <!-- three .service rows: API (Operational), Database (Degraded), CDN (Down) -->
        <div class="service">
            <span class="name">API</span>
            <span class="status ok">Operational</span>
            <div class="bar"><div class="fill" style="width: 99%"></div></div>
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Status</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #0f172a;
                color: #e2e8f0;
                padding: 24px;
            }
            h1 { font-size: 22px; }
            .service {
                display: flex;
                align-items: center;
                gap: 14px;
                background: #1e293b;
                border-radius: 12px;
                padding: 14px 18px;
                margin-bottom: 10px;
            }
            .name { width: 110px; font-weight: bold; }
            .status {
                padding: 4px 12px;
                border-radius: 999px;
                font-size: 13px;
            }
            .ok   { background: #065f46; color: #6ee7b7; }
            .warn { background: #78350f; color: #fcd34d; }
            .down { background: #7f1d1d; color: #fca5a5; }
            .bar {
                flex: 1;
                height: 10px;
                background: #334155;
                border-radius: 999px;
            }
            .fill {
                height: 100%;
                border-radius: 999px;
                background: #10b981;
            }
        </style>
    </head>
    <body>
        <h1>🟢 System status</h1>
        <div class="service">
            <span class="name">API</span>
            <span class="status ok">Operational</span>
            <div class="bar"><div class="fill" style="width: 99%"></div></div>
        </div>
        <div class="service">
            <span class="name">Database</span>
            <span class="status warn">Degraded</span>
            <div class="bar"><div class="fill" style="width: 74%"></div></div>
        </div>
        <div class="service">
            <span class="name">CDN</span>
            <span class="status down">Down</span>
            <div class="bar"><div class="fill" style="width: 12%"></div></div>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "Duplicate the API row twice; change name to Database and CDN, states to warn → Degraded and down → Down.",
                  fa: "ردیفِ API را دو بار تکرار کن؛ نام را Database و CDN کن، حالت‌ها را warn → Degraded و down → Down.",
                },
                {
                  en: "The row: .service { display: flex; align-items: center; gap: 14px; } — name fixed width, bar flex: 1.",
                  fa: "ردیف: .service { display: flex; align-items: center; gap: 14px; } — نام عرضِ ثابت، نوار flex: 1.",
                },
                {
                  en: "Exact badge texts matter: Operational, Degraded, Down — one per row.",
                  fa: "متنِ دقیقِ نشان‌ها مهم است: Operational و Degraded و Down — از هرکدام یکی.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".service", count: 3 },
                  { selector: ".name", count: 3 },
                  { selector: ".name", text: "api" },
                  { selector: ".status", count: 3 },
                  { selector: ".status", text: "operational" },
                  { selector: ".service .fill", count: 3 },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 8 ────────────────────────────────────────────
    {
      id: "html-m8",
      title: { en: "Ship It Like a Pro", fa: "منتشر کن مثل یک حرفه‌ای" },
      blurb: {
        en: "Accessibility, meta tags & SEO, big-page organization — then the final project: a complete Product Landing Page.",
        fa: "دسترس‌پذیری، متا تگ‌ها و سئو، نظم در صفحه‌های بزرگ — و در پایان پروژه‌ی نهایی: یک لندینگ‌پیجِ کاملِ محصول.",
      },
      lessons: [
        {
          id: "html-m8-l1",
          title: { en: "Accessibility — the web for everyone", fa: "دسترس‌پذیری — وب برای همه" },
          goal: {
            en: "Make pages usable for screen readers and keyboards: alt, label for, aria-label, clean heading order.",
            fa: "صفحه‌ات را برای صفحه‌خوان‌ها و کیبورد قابل‌استفاده کنی: alt و label و aria-label و ترتیبِ تمیزِ تیترها.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "Who else is 'reading' your page", fa: "چه کسانی دیگری صفحه‌ات را «می‌خوانند»" },
              blocks: [
                {
                  type: "text",
                  en: "Not everyone meets your page the same way. A blind visitor hears it through a screen reader — software that reads the HTML aloud. A user with a broken arm navigates by keyboard only. Someone on a train with a slow connection may get broken images. Accessibility (a11y for short) means building so all of them can still use your page. Bonus: Google reads your page exactly like a screen reader — accessibility IS SEO's shy twin.",
                  fa: "همه با صفحه‌ات یک‌جور رو‌به‌رو نمی‌شوند. بازدیدکننده‌ی نابینا آن را با صفحه‌خوان (Screen Reader) «می‌شنود» — نرم‌افزاری که HTML را بلند می‌خواند. کاربری با دستِ شکسته فقط با کیبورد حرکت می‌کند. کسی در قطار با اینترنتِ ضعیف ممکن است تصویرِ خراب بگیرد. دسترس‌پذیری (a11y) یعنی طوری بسازی که همه بتوانند از صفحه‌ات استفاده کنند. بونوس: گوگل صفحه‌ات را دقیقاً مثل یک صفحه‌خوان می‌خواند — دسترس‌پذیری همان دوقلوی خجالتیِ سئوست.",
                },
                {
                  type: "text",
                  en: "Your first three tools, all attributes and habits you ALREADY know: `alt` on images, `label for` on form fields, and a tidy heading order. Small effort, massive difference — roughly 1 in 5 people lives with some disability.",
                  fa: "سه ابزارِ اولت همه ویژگی و عادت‌هایی هستند که «از قبل» می‌شناسی: `alt` روی تصاویر، `label for` روی فیلدهای فرم، و ترتیبِ مرتبِ تیترها. زحمتِ کم، تفاوتِ عظیم — تقریباً یک نفر از هر پنج نفر با نوعی معلولیت زندگی می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Alt in action</title>
    </head>
    <body>
        <h1>Today's special 🍕</h1>
        <img src="margherita.png" alt="A hot margherita pizza with basil leaves on a wooden board">
        <p>The picture cannot load in this offline sandbox —
           and that is exactly how a blind visitor experiences
           EVERY image. For them, the alt text IS the image.</p>
    </body>
</html>`,
                  caption: {
                    en: "Broken image? The alt text steps in — the same text a screen reader speaks.",
                    fa: "تصویر خراب شد؟ متنِ alt وارد میدان می‌شود — همان متنی که صفحه‌خوان بلند می‌خواند.",
                  },
                },
                {
                  type: "text",
                  en: "A good `alt` describes what the image SHOWS or DOES — 'A hot margherita pizza with basil leaves', not 'pizza.png' and not 'image'. A screen reader user decides from your alt whether that photo matters. Empty alt (`alt=''`) is also a statement: 'decorative, skip it' — but never OMIT the attribute entirely.",
                  fa: "یک `alt` خوب توصیف می‌کند که تصویر «چه نشان می‌دهد یا چه کار می‌کند» — «یک پیتزای مارگاریتای داغ با برگ ریحان»، نه «pizza.png» و نه «image». کاربرِ صفحه‌خوان از روی alt تو تصمیم می‌گیرد آن عکس مهم است یا نه. altِ خالی (`alt=''`) هم یک جمله است: «تزئینی است، ردش کن» — ولی هرگز خودِ ویژگی را حذف نکن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Labels, aria-label and the heading ladder", fa: "لیبل‌ها، aria-label و نردبانِ تیترها" },
              blocks: [
                {
                  type: "text",
                  en: "Form fields need names. The pair `<label for='size'>` + `<input id='size'>` does double duty: clicking the label focuses the input (huge for motor-impaired users), and the screen reader announces 'size' when the input is reached. The rule is strict: `for` must EXACTLY equal the input's `id`.",
                  fa: "فیلدهای فرم به نام نیاز دارند. جفتِ `<label for='size'>` + `<input id='size'>` دو کار می‌کند: کلیک روی لیبل، فوکوس را به input می‌برد (برای کاربرانِ با محدودیتِ حرکتی عالی است)، و صفحه‌خوان وقتی به input می‌رسد «size» را اعلام می‌کند. قانونِ سفت‌وسخت: `for` باید دقیقاً برابر با `id` آن input باشد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Accessible controls</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            button { font-size: 20px; padding: 8px 14px; }
        </style>
    </head>
    <body>
        <h1>Shop</h1>
        <h2>Vintage camera</h2>
        <label for="size">Size</label>
        <input type="text" id="size" placeholder="M / L">
        <button aria-label="Add to cart">🛒</button>
        <p>The button shows only an emoji — but a screen reader
           announces its aria-label: "Add to cart, button".</p>
    </body>
</html>`,
                  caption: {
                    en: "Icon-only buttons are invisible to screen readers — until you give them aria-label.",
                    fa: "دکمه‌های فقط-آیکونی برای صفحه‌خوان‌ها نامرئی‌اند — تا وقتی aria-label بدهی.",
                  },
                },
                {
                  type: "text",
                  en: "`aria-label` attaches an invisible name to an element — the standard fix for icon-only buttons like 🔍 or 🛒, for nav landmarks, and for any control whose visible text is just a symbol. Screen readers speak it exactly like visible text.",
                  fa: "`aria-label` یک نامِ نامرئی به عنصر می‌چسباند — راه‌حلِ استانداردِ دکمه‌های فقط-آیکونی مثل 🔍 یا 🛒، برای navها و هر کنترلی که متنِ قابل‌دیدنش فقط یک سمبل است. صفحه‌خوان آن را دقیقاً مثل متنِ عادی می‌خواند.",
                },
                {
                  type: "warn",
                  en: "Headings are the screen reader's table of contents — users jump h1 → h2 → h3 like chapters. Skip levels (h1 straight to h4) and your page sounds like a book with torn-out pages. One h1 per page, then order without gaps (Module 1's rule — it was accessibility all along).",
                  fa: "تیترها فهرستِ مطالبِ صفحه‌خوان‌اند — کاربرها مثل فصل‌های کتاب از h1 به h2 به h3 می‌پرند. از پله‌ها نپر (h1 بعد یکو h4) و صفحه‌ات مثل کتابی می‌شود که صفحاتش کنده شده. در هر صفحه یک h1، بعد ترتیبِ بدونِ پرش (قانونِ ماژول ۱ — از اول دسترس‌پذیری بود).",
                },
                {
                  type: "tip",
                  en: "The cheapest test: unplug your mouse for ten minutes and Tab through your own page. Can you reach every control? Can you tell what the 🔍 button does? That is a11y auditing in one habit.",
                  fa: "ارزان‌ترین تست: ده دقیقه موس را کنار بگذار و با Tab از صفحه‌ات رد شو. به همه‌ی کنترل‌ها می‌رسی؟ می‌فهمی دکمه‌ی 🔍 چه کار می‌کند؟ همین عادت، خودِ ممیزیِ دسترس‌پذیری است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Good alt text is…", fa: "یک alt خوب چه شکلی است؟" },
                  options: [
                    { en: "A short description of what the image shows or does", fa: "توصیفی کوتاه از اینکه تصویر چه نشان می‌دهد یا چه می‌کند" },
                    { en: "The image's file name", fa: "اسمِ فایلِ تصویر" },
                    { en: "A list of keywords repeated for SEO", fa: "فهرستی از کلماتِ کلیدیِ تکرارشده برای سئو" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Write for a listener who cannot see: describe the content or purpose, briefly.",
                    fa: "برای شنونده‌ای بنویس که نمی‌تواند ببیند: محتوا یا هدف را کوتاه توصیف کن.",
                  },
                },
                {
                  q: { en: "<label for='size'> connects to the input by…", fa: "<label for='size'> از طریق چه چیزی به input وصل می‌شود؟" },
                  options: [
                    { en: "The input's class name", fa: "نامِ کلاسِ input" },
                    { en: "The input's id='size' — for must exactly equal the id", fa: "id اینپوت: id='size' — for باید دقیقاً برابر با id باشد" },
                    { en: "Their position on the page", fa: "جای‌شان روی صفحه" },
                  ],
                  answer: 1,
                  explain: {
                    en: "for ↔ id is an exact-match contract; one letter off and the label is orphaned.",
                    fa: "for ↔ id یک قراردادِ دقیق است؛ یک حرف خطا کند، لیبل یتیم می‌شود.",
                  },
                },
                {
                  q: { en: "When does a button need aria-label?", fa: "دکمه کِی به aria-label نیاز دارد؟" },
                  options: [
                    { en: "When it has no visible text — like an icon-only button", fa: "وقتی متنِ قابل‌دیدن ندارد — مثل دکمه‌ی فقط-آیکونی" },
                    { en: "On every button, always", fa: "روی هر دکمه، همیشه" },
                    { en: "Never — buttons cannot have labels", fa: "هرگز — دکمه‌ها لیبل نمی‌پذیرند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "A visible text already names the button; aria-label is for the silent ones (🔍, 🛒).",
                    fa: "متنِ قابل‌دیدن خودش نامِ دکمه است؛ aria-label برای بچه‌های ساکت است (🔍 و 🛒).",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The accessible shop card", fa: "کارتِ فروشگاهِ دسترس‌پذیر" },
              brief: {
                en: "Build one product card the accessible way: an `h1` (shop name), an `h2` (product name), an `img src='shoes.png'` with a real descriptive `alt`, a `<label for='size'>` + `<input id='size'>` pair for the size field, and a button containing ONLY an emoji (🛒) with the exact attribute `aria-label='Add to cart'`.",
                fa: "یک کارتِ محصول را دسترس‌پذیر بساز: یک `h1` (نامِ فروشگاه)، یک `h2` (نامِ محصول)، یک `img src='shoes.png'` با `alt` واقعی و توصیفی، جفتِ `<label for='size'>` + `<input id='size'>` برای فیلدِ سایز، و یک دکمه که فقط یک ایموجی دارد (🛒) با ویژگیِ دقیقِ `aria-label='Add to cart'`.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sneaker shop</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            img { width: 200px; border-radius: 12px; }
            button { font-size: 22px; padding: 8px 14px; }
        </style>
    </head>
    <body>
        <h1>Sole Story 👟</h1>
        <!-- TODO: h2 product name -->
        <!-- TODO: img with a descriptive alt -->
        <!-- TODO: label for='size' + input id='size' -->
        <!-- TODO: emoji-only button with aria-label='Add to cart' -->
        <button>🛒</button>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sneaker shop</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            img { width: 200px; border-radius: 12px; }
            button { font-size: 22px; padding: 8px 14px; }
            label { display: block; margin-top: 12px; }
            input { padding: 6px; margin-top: 4px; }
        </style>
    </head>
    <body>
        <h1>Sole Story 👟</h1>
        <h2>Cloud Runner 2</h2>
        <img src="shoes.png" alt="A pair of white running shoes with blue stripes">
        <label for="size">Size</label>
        <input type="text" id="size" placeholder="41 / 42 / 43">
        <button aria-label="Add to cart">🛒</button>
    </body>
</html>`,
              hints: [
                {
                  en: "The image: <img src='shoes.png' alt='describe the shoes in your own words'> — describe, don't name the file.",
                  fa: "تصویر: <img src='shoes.png' alt='کفش‌ها را با کلماتِ خودت توصیف کن'> — توصیف کن، اسمِ فایل نگو.",
                },
                {
                  en: "The pair: <label for='size'>Size</label> then <input id='size'> — for and id must match letter by letter.",
                  fa: "جفت: <label for='size'>Size</label> بعد <input id='size'> — for و id باید حرف‌به‌حرف یکی باشند.",
                },
                {
                  en: "The button: <button aria-label='Add to cart'>🛒</button> — exact attribute value.",
                  fa: "دکمه: <button aria-label='Add to cart'>🛒</button> — مقدارِ ویژگی دقیقاً همین.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "img[alt]", count: 1 },
                  { selector: "label[for='size']", count: 1 },
                  { selector: "#size", count: 1 },
                  {
                    selector: "button[aria-label='Add to cart']",
                    attrName: "aria-label",
                    attrValue: "Add to cart",
                  },
                  { selector: "h2", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m8-l2",
          title: { en: "Meta tags & SEO — how the world sees your page", fa: "متا تگ‌ها و سئو — دنیا چطور صفحه‌ات را می‌بیند" },
          goal: {
            en: "Write the head that Google and chat apps read: title, description, og: previews, lang.",
            fa: "آن head را بنویسی که گوگل و تلگرام می‌خوانند: title و description و پیش‌نمایشِ og و ویژگیِ lang.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Your head is your business card", fa: "head تو همان کارتِ ویزیت است" },
              blocks: [
                {
                  type: "text",
                  en: "Visitors see your body — but Google, Telegram, WhatsApp and Twitter mostly read your HEAD. `<title>` becomes the blue headline of your search result AND the browser-tab text. `<meta name='description'>` becomes the gray snippet under it — your one free ad line. Write the description like a mini-ad, around 150 characters, because a blank one lets Google improvise (and Google's improv is rarely on-brand).",
                  fa: "بازدیدکننده body را می‌بیند — ولی گوگل و تلگرام و واتساپ و توییتر بیشترِ head را می‌خوانند. `<title>` می‌شود تیترِ آبیِ نتیجه‌ی جست‌وجو «و» نوشته‌ی تبِ مرورگر. `<meta name='description'>` می‌شود متنِ خاکستری زیرش — همان یک خطِ تبلیغِ مجانی. description را مثل یک تبلیغِ مینی بنویس، حدودِ ۱۵۰ حرف؛ چون اگر خالی بگذاری گوگل بداهه‌نوازی می‌کند (و بداهه‌ی گوگل معمولاً به‌نامِ تو نیست).",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cafe Nazdik — specialty coffee in the neighborhood</title>
        <meta name="description"
            content="Small specialty cafe: espresso, homemade cakes, fast wifi. Open 8–22 every day.">
        <meta property="og:title" content="Cafe Nazdik ☕">
        <meta property="og:description"
            content="Best espresso in the neighborhood. Come thirsty.">
        <meta property="og:type" content="website">
    </head>
    <body>
        <h1>Cafe Nazdik ☕</h1>
        <p>Open 8–22 · Fast wifi · Homemade cakes</p>
    </body>
</html>`,
                  caption: {
                    en: "A head Google can flirt with and chat apps can preview — six tags, all invisible.",
                    fa: "یک head که گوگل باهاش چشمک بزند و اپ‌های چت بتوانند پیش‌نمایش بسازند — شش تگ، همه نامرئی.",
                  },
                },
                {
                  type: "text",
                  en: "Two families live in that head. `name=` metas serve browsers and search engines (description, viewport, charset). `property=` metas with the `og:` prefix are Open Graph tags — invented by Facebook, adopted by everyone — and they draw the CARD that appears when someone shares your link in a chat or feed. og:title may be shorter and more human than your SEO title; they play different rooms.",
                  fa: "دو خانواده در آن head زندگی می‌کنند. متاهای `name=` در خدمتِ مرورگر و موتورِ جست‌وجو هستند (description و viewport و charset). متاهای `property=` با پیشوندِ `og:` همان تگ‌های Open Graph‌اند — ساخته‌ی فیسبوک، adopted توسط همه — و همان «کارت» را می‌کشند که وقتی لینکت را در چت یا فید کسی به‌اشتراک می‌گذارند ظاهر می‌شود. og:title می‌تواند کوتاه‌تر و آدمیزادترِ عنوانِ سئوی تو باشد؛ آنها برای سالن‌های متفاوتی بازی می‌کنند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "lang — a tiny attribute with a loud voice", fa: "lang — ویژگیِ کوچک با صدای بلند" },
              blocks: [
                {
                  type: "text",
                  en: "`<html lang='en'>` declares the page's language in one attribute. Three audiences listen: screen readers pick the right pronunciation rules (English in a Persian sentence sounds very different from Persian in an English sentence); search engines use it for language targeting; browsers offer to translate when lang disagrees with the content. For a Persian page it is `<html lang='fa'>` — add `dir='rtl'` and the page mirrors right-to-left, a story for another day.",
                  fa: "`<html lang='en'>` زبانِ صفحه را با یک ویژگی اعلام می‌کند. سه مخاطبِ شنوا دارد: صفحه‌خوان‌ها قواعدِ تلفظِ درست را انتخاب می‌کنند (انگلیسی داخلِ جمله‌ی فارسی خیلی فرق دارد با فارسی داخلِ جمله‌ی انگلیسی)؛ موتورهای جست‌وجو برای هدف‌گیریِ زبانی استفاده‌اش می‌کنند؛ مرورگرها وقتی lang با محتوا نخواند پیشنهادِ ترجمه می‌دهند. برای صفحه‌ی فارسی می‌شود `<html lang='fa'>` — `dir='rtl'` هم اضافه کنی صفحه آینه می‌شود و راست‌به‌چپ می‌چیند؛ قصه‌ی روزِ دیگری است.",
                },
                {
                  type: "tip",
                  en: "The professional head order: charset → viewport → title → description → og: tags. Charset first (it must be read before any text), title next (it is the most important line you own).",
                  fa: "ترتیبِ حرفه‌ایِ head: charset → viewport → title → description → تگ‌های og:. اول charset (باید قبل از هر متنی خوانده شود)، بعد title (مهم‌ترین خطِ مالِ توست).",
                },
                {
                  type: "warn",
                  en: "Never keyword-stuff: <title>Camera buy camera best camera cheap camera</title> reads as spam to Google AND to humans. One clear title — brand + what it is — beats ten repetitions.",
                  fa: "هرگز کلمه‌کلیدی‌باران نکن: title‌ای مثل «دوربین بخر دوربین بهترین دوربین دوربین ارزان» هم برای گوگل اسپم است هم برای آدم‌ها. یک عنوانِ شفاف — برند + اینکه چیست — از ده تکرار قوی‌تر است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which tag becomes the blue headline of your Google result?", fa: "کدام تگ می‌شود تیترِ آبیِ نتیجه‌ی گوگل؟" },
                  options: [
                    { en: "<h1>", fa: "<h1>" },
                    { en: "<title>", fa: "<title>" },
                    { en: "og:title", fa: "og:title" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Google lifts the <title> for the result headline (it may rewrite it if you spam). h1 matters for the page, title for the listing.",
                    fa: "گوگل تیترِ نتیجه را از <title> برمی‌دارد (اگر اسپم کنی ممکن است خودش بازنویسی‌اش کند). h1 برای صفحه مهم است، title برای فهرستِ نتایج.",
                  },
                },
                {
                  q: { en: "og:title and og:description control…", fa: "og:title و og:description کنترل می‌کنند…" },
                  options: [
                    { en: "The preview card shown when your link is shared in chat apps and social feeds", fa: "کارتِ پیش‌نمایشی که وقتی لینکت را در اپ‌های چت و فیدهای اجتماعی می‌فرستی نشان داده می‌شود" },
                    { en: "The browser tab text", fa: "نوشته‌ی تبِ مرورگر" },
                    { en: "The page's font size", fa: "اندازه‌ی فونتِ صفحه" },
                  ],
                  answer: 0,
                  explain: {
                    en: "og: = Open Graph = the share card. Title/description for SEO, og: for social.",
                    fa: "og: یعنی Open Graph یعنی کارتِ اشتراک‌گذاری. title و description برای سئو، og: برای شبکه‌های اجتماعی.",
                  },
                },
                {
                  q: { en: "What does <html lang='fa'> actually do?", fa: "<html lang='fa'> واقعاً چه می‌کند؟" },
                  options: [
                    { en: "It translates the page to Persian", fa: "صفحه را به فارسی ترجمه می‌کند" },
                    { en: "It sets the text size for Persian", fa: "اندازه‌ی متنِ فارسی را تنظیم می‌کند" },
                    { en: "It declares the page's language — screen readers pronounce it right, search engines classify it", fa: "زبانِ صفحه را اعلام می‌کند — صفحه‌خوان درست تلفظ می‌کند، موتورِ جست‌وجو درست دسته‌بندی می‌کند" },
                  ],
                  answer: 2,
                  explain: {
                    en: "lang declares, it does not translate. Declaration powers pronunciation and classification.",
                    fa: "lang اعلام می‌کند، ترجمه نمی‌کند. از دلِ اعلام، تلفظِ درست و دسته‌بندیِ درست بیرون می‌آید.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Write the head", fa: "head را بنویس" },
              brief: {
                en: "The body of a cafe page is done — the head is naked. Complete it: give `<html>` the attribute `lang='en'`; write a `<title>` containing the word Cafe; add `<meta name='description'>` with your own ad line; add `<meta property='og:title'>` and `<meta property='og:description'>` for the share card.",
                fa: "بدنه‌ی صفحه‌ی یک کافه آماده است — ولی head لخت است. کاملش کن: به `<html>` ویژگیِ `lang='en'` بده؛ یک `<title>` بنویس که کلمه‌ی Cafe را داشته باشد؛ یک `<meta name='description'>` با تبلیغِ خودت اضافه کن؛ و برای کارتِ اشتراک‌گذاری `<meta property='og:title'>` و `<meta property='og:description'>` بگذار.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>???</title>
        <!-- TODO 1) html lang="en" -->
        <!-- TODO 2) meta name="description" -->
        <!-- TODO 3) og:title + og:description for the share card -->
    </head>
    <body>
        <h1>Cafe Nazdik ☕</h1>
        <p>Open 8–22 · Fast wifi · Homemade cakes</p>
        <p><em>The espresso machine never sleeps.</em></p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cafe Nazdik — specialty coffee in the neighborhood</title>
        <meta name="description"
            content="Small specialty cafe: espresso, homemade cakes, fast wifi. Open 8–22 every day.">
        <meta property="og:title" content="Cafe Nazdik ☕">
        <meta property="og:description"
            content="Best espresso in the neighborhood. Come thirsty.">
    </head>
    <body>
        <h1>Cafe Nazdik ☕</h1>
        <p>Open 8–22 · Fast wifi · Homemade cakes</p>
        <p><em>The espresso machine never sleeps.</em></p>
    </body>
</html>`,
              hints: [
                {
                  en: "The language: <html lang='en'> — one attribute on the opening html tag.",
                  fa: "زبان: <html lang='en'> — یک ویژگی روی تگِ آغازینِ html.",
                },
                {
                  en: "Description shape: <meta name='description' content='your ad line here'>.",
                  fa: "شکلِ description: <meta name='description' content='خطِ تبلیغِ تو'>.",
                },
                {
                  en: "The share card uses property, not name: <meta property='og:title' content='…'>.",
                  fa: "کارتِ اشتراک از property استفاده می‌کند، نه name: <meta property='og:title' content='…'>.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "html[lang='en']", count: 1 },
                  { selector: "title", text: "cafe" },
                  { selector: "meta[name='description']", count: 1 },
                  { selector: "meta[property='og:title']", count: 1 },
                  { selector: "meta[property='og:description']", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m8-l3",
          title: { en: "Big pages, zero chaos", fa: "صفحه‌های بزرگ، بدونِ آشوب" },
          goal: {
            en: "Keep a long page organized: id anchors, comment banners, and one class-naming system.",
            fa: "صفحه‌ی طولانی را منظم نگه داری: لنگرهای id، پرچم‌های کامنت، و یک سیستمِ نام‌گذاریِ کلاس.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Signposts for humans", fa: "تابلوی راهنما برای آدم‌ها" },
              blocks: [
                {
                  type: "text",
                  en: "Real pages are 500+ lines. Three habits keep them sane. First: every major section gets an `id` — which ALSO powers the nav (`href='#pricing'` jumps there; Module 5's anchors). Second: loud HTML comment banners between sections, so scrolling the code feels like walking a labeled corridor. Third: one consistent class vocabulary across the whole file.",
                  fa: "صفحه‌های واقعی ۵۰۰ خط و بیشترند. سه عادت نگاهشان می‌دارد. اول: هر بخشِ اصلی یک `id` می‌گیرد — که ضمناً منو را هم راه می‌اندازد (`href='#pricing'` همان‌جا می‌پرد؛ لنگرهای ماژول ۵). دوم: پرچم‌های کامنتِ بلند بین بخش‌ها، تا اسکرول‌کردنِ کد شبیه راه‌رفتن در راهرویِ برچسب‌دار باشد. سوم: یک واژگانِ یکدستِ کلاس در کلِ فایل.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Nimbus Notes</title>
    </head>
    <body>
        <nav>
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
        </nav>

        <!-- ═══════════ HERO ═══════════ -->
        <section id="hero">
            <h1>Nimbus Notes 📝</h1>
            <p>Notes that follow you to every device.</p>
        </section>

        <!-- ═══════════ FEATURES ═══════════ -->
        <section id="features">
            <h2>Features</h2>
        </section>

        <!-- ═══════════ PRICING ═══════════ -->
        <section id="pricing">
            <h2>Pricing</h2>
        </section>

        <!-- ═══════════ CONTACT ═══════════ -->
        <section id="contact">
            <h2>Contact</h2>
        </section>
    </body>
</html>`,
                  caption: {
                    en: "Comment banners + section ids: the code reads like a map, and the nav just works.",
                    fa: "پرچمِ کامنت + idِ بخش‌ها: کد مثل نقشه خوانده می‌شود و منو هم کار می‌کند.",
                  },
                },
                {
                  type: "text",
                  en: "The comments are invisible on the page — the browser skips them — but at 2 AM when a bug hides somewhere in 600 lines, those banners are streetlights. Notice the pattern: id, then banner, then section. Same order, every time. Rhythm is the whole secret.",
                  fa: "کامنت‌ها روی صفحه دیده نمی‌شوند — مرورگر ازشان رد می‌شود — ولی ساعتِ ۲ شب که باگی در ۶۰۰ خط قایم شده، این پرچم‌ها چراغِ خیابان‌اند. به الگو دقت کن: id، بعد پرچم، بعد section. همان ترتیب، هر بار. ریتم، کلِ راز است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "A naming system in three rules", fa: "سیستمِ نام‌گذاری در سه قانون" },
              blocks: [
                {
                  type: "text",
                  en: "Rule 1: lowercase-kebab-case — `product-card`, never `ProductCard` or `productcard`. Rule 2: name by ROLE, not by look — `.highlight` survives the day you recolor it; `.yellow-box` becomes a lie. Rule 3: component + part — a card's title is `.card-title`, its button is `.card-button`. Three rules, ten seconds each, weeks of sanity.",
                  fa: "قانونِ ۱: کباپ-کیسِ حروفِ کوچک — `product-card`، نه `ProductCard` و نه `productcard`. قانونِ ۲: از روی «نقش» نام‌گذاری کن، نه از روی ظاهر — `.highlight` روزی که رنگش را عوض کنی هم سرِ جایش می‌ماند؛ `.yellow-box` همان روز دروغ می‌شود. قانونِ ۳: کامپوننت + قطعه — تیترِ یک کارت می‌شود `.card-title`، دکمه‌اش می‌شود `.card-button`. سه قانون، ده ثانیه هرکدام، هفته‌ها آرامش.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!-- 😬 before: names that lie -->
<div class="box1">
    <p class="bigRed">Flash sale — today only!</p>
    <button class="btn2">Grab it</button>
</div>

<!-- 😎 after: names that explain -->
<div class="promo-banner">
    <p class="promo-title">Flash sale — today only!</p>
    <button class="promo-button">Grab it</button>
</div>`,
                  caption: {
                    en: "Same page, but the second one explains itself to the next reader (future you).",
                    fa: "همان صفحه، ولی دومی خودش را برای خواننده‌ی بعدی (خودِ آینده‌ات) توضیح می‌دهد.",
                  },
                },
                {
                  type: "tip",
                  en: "For a growing page, write a mini style guide as a CSS comment at the top of your <style>: list your classes, one line each. It is the API documentation of your own page.",
                  fa: "برای صفحه‌ای که بزرگ می‌شود، یک راهنمای مینی به‌شکلِ کامنتِ CSS در بالای `<style>` بنویس: کلاس‌هایت را لیست کن، هرکدام یک خط. این همان مستنداتِ API صفحه‌ی خودت است.",
                },
                {
                  type: "warn",
                  en: "Renaming later is expensive — every class name is a promise referenced in CSS, JS and your memory. Spend the ten seconds NOW; future you will send a thank-you note.",
                  fa: "تغییرِ نام بعداً گران است — هر اسمِ کلاس یک قول است که در CSS و JS و حافظه‌ات به آن ارجاع شده. همان حالا ده ثانیه وقت بگذار؛ خودِ آینده‌ات برایت کارتِ تشکر می‌فرستد.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Why give each big section an id?", fa: "چرا هر بخشِ بزرگ یک id می‌گیرد؟" },
                  options: [
                    { en: "Nav links can jump to it (#features) — and your code stays findable", fa: "لینک‌های منو می‌توانند به آن بپرند (#features) — و کدت هم قابل‌یافتن می‌ماند" },
                    { en: "CSS requires an id on every section", fa: "CSS روی هر section به id نیاز دارد" },
                    { en: "It makes the page load faster", fa: "صفحه را سریع‌تر لود می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "One id serves two masters: anchor navigation and human navigation of the code.",
                    fa: "یک id به دو ارباب خدمت می‌کند: ناوبریِ لینک‌ها و ناوبریِ آدم‌ها در کد.",
                  },
                },
                {
                  q: { en: "The best class name for a box that is highlighted in yellow today is…", fa: "بهترین نامِ کلاس برای جعبه‌ای که امروز زرد هایلایت شده…" },
                  options: [
                    { en: ".yellow-box", fa: ".yellow-box" },
                    { en: ".something2", fa: ".something2" },
                    { en: ".highlight — name the role, not the color", fa: ".highlight — نقش را نام‌گذاری کن، نه رنگ را" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Looks change, roles don't. Role names survive redesigns; color names become lies.",
                    fa: "ظاهر عوض می‌شود، نقش نه. نامِ نقشِ بازطراحی‌ها را زنده می‌مانَد؛ نامِ رنگ دروغ می‌شود.",
                  },
                },
                {
                  q: { en: "HTML comment banners between sections are…", fa: "پرچم‌های کامنت بین بخش‌ها…" },
                  options: [
                    { en: "Shown as small captions on the page", fa: "روی صفحه به‌شکلِ کپشنِ کوچک دیده می‌شوند" },
                    { en: "Invisible on the page, priceless when editing the code", fa: "روی صفحه نامرئی‌اند، ولی موقعِ ویرایشِ کد بی‌قیمت‌اند" },
                    { en: "Required by the HTML standard", fa: "استانداردِ HTML الزامشان کرده" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Comments are for humans only — the browser ignores them completely.",
                    fa: "کامنت فقط برای آدم‌هاست — مرورگر کاملاً نادیده‌اش می‌گیرد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The organized page", fa: "صفحه‌ی منظم" },
              brief: {
                en: "Build the SKELETON of a big page: a `nav` with links to #hero, #features, #pricing and #contact; then four `<section>` elements with EXACTLY those ids — the hero gets an `h1`, the other three an `h2` each. Above each section, write an HTML comment banner (any loud text you like). No CSS needed — organization is the exercise.",
                fa: "اسکلتی یک صفحه‌ی بزرگ را بساز: یک `nav` با لینک به #hero و #features و #pricing و #contact؛ بعد چهار تا `<section>` با «دقیقاً» همین idها — hero یک `h1` دارد، سه‌تای دیگر هرکدام یک `h2`. بالای هر section یک پرچمِ کامنتِ HTML بنویس (هر متنِ پرسر و صدایی خواستی). CSS لازم نیست — خودِ نظم، تمرین است.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Nimbus Notes</title>
    </head>
    <body>
        <nav>
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
        </nav>

        <!-- ═══════════ HERO ═══════════ -->
        <section id="hero">
            <h1>Nimbus Notes 📝</h1>
            <p>Notes that follow you everywhere.</p>
        </section>

        <!-- TODO: features section (id + h2) with a comment banner -->
        <!-- TODO: pricing section (id + h2) with a comment banner -->
        <!-- TODO: contact section (id + h2) with a comment banner -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Nimbus Notes</title>
    </head>
    <body>
        <nav>
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
        </nav>

        <!-- ═══════════ HERO ═══════════ -->
        <section id="hero">
            <h1>Nimbus Notes 📝</h1>
            <p>Notes that follow you everywhere.</p>
        </section>

        <!-- ═══════════ FEATURES ═══════════ -->
        <section id="features">
            <h2>Features</h2>
            <p>Sync, search, and zero clutter.</p>
        </section>

        <!-- ═══════════ PRICING ═══════════ -->
        <section id="pricing">
            <h2>Pricing</h2>
            <p>Free forever for personal notes.</p>
        </section>

        <!-- ═══════════ CONTACT ═══════════ -->
        <section id="contact">
            <h2>Contact</h2>
            <p>hello@nimbus.notes</p>
        </section>
    </body>
</html>`,
              hints: [
                {
                  en: "Each missing section is the same shape: comment banner, then <section id='features'> with an <h2> inside.",
                  fa: "هر بخشِ جامانده همان شکل است: پرچمِ کامنت، بعد <section id='features'> با یک <h2> داخلش.",
                },
                {
                  en: "Ids must match the nav links exactly: hero, features, pricing, contact — lowercase.",
                  fa: "idها باید دقیقاً با لینک‌های منو یکی باشند: hero و features و pricing و contact — با حروفِ کوچک.",
                },
                {
                  en: "Comments look like: <!-- ═══════════ PRICING ═══════════ --> — any text works.",
                  fa: "کامنت‌ها این شکلی‌اند: <!-- ═══════════ PRICING ═══════════ --> — هر متنی کار می‌کند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "nav", count: 1 },
                  { selector: "#hero", count: 1 },
                  { selector: "#features", count: 1 },
                  { selector: "#pricing", count: 1 },
                  { selector: "#contact", count: 1 },
                  {
                    selector: "a[href='#features']",
                    attrName: "href",
                    attrValue: "#features",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "html-m8-l4",
          title: { en: "Final Project: Product Landing Page", fa: "پروژه‌ی نهایی: لندینگ‌پیجِ محصول" },
          goal: {
            en: "Ship a complete landing page — nav, gradient hero with CTA, feature grid, testimonial, footer — using everything from Modules 1–8.",
            fa: "یک لندینگ‌پیجِ کامل منتشر کنی — منو، هیروی گرادیانتی با دکمه، گریدِ امکانات، نظرِ مشتری و فوتر — با همه‌چیزِ ماژول ۱ تا ۸.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              title: { en: "The anatomy of a landing page", fa: "کالبدشکافیِ لندینگ‌پیج" },
              blocks: [
                {
                  type: "text",
                  en: "A landing page is one page with ONE goal — sign up, buy, download. Strip any famous landing page and you find the same skeleton: a `nav` (a few anchor links), a `hero` (big h1 + one-line pitch + a CTA button on a gradient), a `features` grid (three cards — Module 6's grid), one `testimonial` (a real quote in a blockquote), and a `footer`. You have built every piece individually across eight modules. Today they become one page.",
                  fa: "لندینگ‌پیج یک صفحه با «یک» هدف است — ثبت‌نام، خرید، دانلود. هر لندینگِ معروفی را باز کنی به همین اسکلت می‌رسی: یک `nav` (چند لینکِ لنگر)، یک `hero` (h1 بزرگ + یک جمله + دکمه‌ی CTA روی گرادیان)، یک گریدِ `features` (سه کارت — گریدِ ماژول ۶)، یک `testimonial` (یک نقل‌قولِ واقعی داخلِ blockquote)، و یک `footer`. هر قطعه را در هشت ماژول جدا جدا ساخته‌ای. امروز می‌شوند یک صفحه.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nimbus Notes — notes that follow you</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f8fafc;
                color: #0f172a;
            }
            nav {
                display: flex;
                gap: 20px;
                padding: 16px 24px;
                background: #0f172a;
            }
            nav a { color: #7dd3fc; text-decoration: none; }
            .hero {
                background: linear-gradient(120deg, #06b6d4, #7c3aed);
                color: white;
                text-align: center;
                padding: 72px 24px;
            }
            .cta {
                display: inline-block;
                margin-top: 16px;
                background: white;
                color: #0f172a;
                padding: 12px 28px;
                border-radius: 999px;
                text-decoration: none;
                font-weight: bold;
            }
            .features {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                padding: 40px 24px;
            }
            .feature {
                background: white;
                border-radius: 12px;
                padding: 24px;
                text-align: center;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
            }
            blockquote {
                margin: 0;
                padding: 40px 24px;
                text-align: center;
                font-size: 20px;
                font-style: italic;
            }
            footer {
                background: #0f172a;
                color: #94a3b8;
                text-align: center;
                padding: 20px;
            }
            @media (max-width: 600px) {
                .features { grid-template-columns: 1fr; }
            }
        </style>
    </head>
    <body>
        <nav>
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
        </nav>
        <section class="hero" id="hero">
            <h1>Nimbus Notes 📝</h1>
            <p>Notes that follow you to every device.</p>
            <a class="cta" href="#">Start free</a>
        </section>
        <section class="features" id="features">
            <div class="feature"><h3>⚡ Instant sync</h3><p>Every device, same note.</p></div>
            <div class="feature"><h3>🔍 Deep search</h3><p>Find 2019's grocery list.</p></div>
            <div class="feature"><h3>🔒 Private</h3><p>Your notes, encrypted.</p></div>
        </section>
        <blockquote>"I replaced four apps with one page of HTML." — a happy user</blockquote>
        <footer>Built with plain HTML + CSS — Module 8 graduate 🎓</footer>
    </body>
</html>`,
                  caption: {
                    en: "The complete landing anatomy — every piece is a callback to a module you finished.",
                    fa: "کالبدِ کاملِ لندینگ — هر قطعه یک یادآوری از ماژولی است که تمامش کرده‌ای.",
                  },
                },
                {
                  type: "text",
                  en: "Trace the callbacks: gradient hero = Module 4. Grid features = Module 6. Pill CTA + card shadows = Module 3. Media query stack = Module 6 again. Anchor nav = Module 5. alt/labels/lang = Module 8. Nothing here is new — that is exactly the point of a final project.",
                  fa: "یادآوری‌ها را دنبال کن: هیروی گرادیانتی = ماژول ۴. گریدِ امکانات = ماژول ۶. CTA کپسولی + سایه‌ی کارت‌ها = ماژول ۳. تک‌ستونه شدن با مدیاکوئری = باز ماژول ۶. منوی لنگردار = ماژول ۵. alt و label و lang = ماژول ۸. اینجا هیچ‌چیزِ جدید نیست — و این دقیقاً نقطه‌ی پروژه‌ی نهایی است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The launch checklist", fa: "چک‌لیستِ پرتاب" },
              blocks: [
                {
                  type: "text",
                  en: "Before you call it shipped, run the pro checklist: viewport meta in the head? `lang` on the html tag? Exactly one h1, no skipped levels? alt on every meaningful image? label for every input? sections with ids + comment banners? a media query for phones? consistent kebab-case classes? One YES per line and you are flying.",
                  fa: "قبل از اینکه بگویی منتشر شد، چک‌لیستِ حرفه‌ای‌ها را رد کن: متای viewport در head هست؟ `lang` روی تگِ html هست؟ دقیقاً یک h1 و بدونِ پرش از پله‌ها؟ روی هر تصویرِ با‌معنا alt هست؟ برای هر input یک label؟ بخش‌ها با id و پرچمِ کامنت؟ یک مدیاکوئری برای موبایل؟ کلاس‌ها با کباپ-کیسِ یکدست؟ برای هر خط یک «بله» و پرواز می‌کنی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!-- your build map — every TODO is a check-list line -->
<nav> … anchor links … </nav>
<section class="hero"> h1 + p + a.cta </section>
<section class="features"> 3 × div.feature </section>
<blockquote> one honest customer quote </blockquote>
<footer> small sign-off </footer>`,
                  caption: {
                    en: "Five landmarks — build them in this order, top to bottom.",
                    fa: "پنج نقطه‌ی شهری — به همین ترتیب از بالا به پایین بسازشان.",
                  },
                },
                {
                  type: "tip",
                  en: "The CTA is the whole page's reason to exist: one verb, first person, zero hesitation — 'Start free', 'Get the app', 'Book a table'. If your button label needs a second read, it needs a rewrite.",
                  fa: "CTA دلیلِ وجودِ کلِ صفحه است: یک فعل، اول‌شخص، صفر تردید — «Start free»، «Get the app»، «Book a table». اگر برچسبِ دکمه‌ات دوبار‌خوانی می‌خواهد، بازنویسی می‌خواهد.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What is a CTA?", fa: "CTA چیست؟" },
                  options: [
                    { en: "Call To Action — the one button you most want visitors to click", fa: "Call To Action — همان یک دکمه‌ای که بیشترین دل‌خواهی‌ات این است بازدیدکننده کلیکش کند" },
                    { en: "A CSS color palette", fa: "یک پالتِ رنگِ CSS" },
                    { en: "The page's footer section", fa: "بخشِ فوترِ صفحه" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Every landing page funnels the visitor toward one action — the CTA button IS that action.",
                    fa: "هر لندینگی بازدیدکننده را به‌سوی یک عمل هدایت می‌کند — دکمه‌ی CTA «خودِ» آن عمل است.",
                  },
                },
                {
                  q: { en: "The classic landing-page order is…", fa: "ترتیبِ کلاسیکِ لندینگ‌پیج…" },
                  options: [
                    { en: "nav → hero (with CTA) → features → testimonial → footer", fa: "منو → هیرو (با CTA) → امکانات → نظرِ مشتری → فوتر" },
                    { en: "footer → features → hero → nav", fa: "فوتر → امکانات → هیرو → منو" },
                    { en: "Random — the order never matters", fa: "دلخواه — ترتیب هیچ‌وقت مهم نیست" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Who we are → why care → proof → what to do. The order IS the persuasion.",
                    fa: "ما کیستیم → چرا مهم است → مدرک → حالا چه کنی. همین ترتیب، خودِ اقناع است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Product Landing Page 🚀", fa: "لندینگ‌پیجِ محصول 🚀" },
              brief: {
                en: "THE FINAL BOSS. Build a complete landing page for YOUR product: a `nav` with at least two links; a `section class='hero'` containing an `h1` (product name), a `p` tagline, and an `a class='cta'` whose text contains start (e.g. 'Start free') — give the hero a gradient background; a `section class='features'` with EXACTLY three `div class='feature'`; one `blockquote` testimonial; a `footer`. Style everything — this is your portfolio piece.",
                fa: "باSSِ نهایی. یک لندینگ‌پیجِ کامل برای محصولِ «خودت» بساز: یک `nav` با حداقل دو لینک؛ یک `section class='hero'` که داخلش `h1` (نامِ محصول)، یک `p` شعار، و یک `a class='cta'` باشد که متنش کلمه‌ی start را دارد (مثلِ «Start free») — به هیرو پس‌زمینه‌ی گرادیان بده؛ یک `section class='features'` با دقیقاً سه `div class='feature'`؛ یک `blockquote` برای نظرِ مشتری؛ و یک `footer`. همه‌چیز را استایل بده — این قطعه‌ی پورتفولیوی توست.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>My product</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f8fafc;
            }
            /* TODO 1) .hero → gradient background, centered, big padding */
            /* TODO 2) .cta → white pill button inside the hero */
            /* TODO 3) .features → grid, 3 columns, gap; .feature → cards */
            /* TODO 4) blockquote + footer styling */
        </style>
    </head>
    <body>
        <nav>
            <!-- at least two links -->
        </nav>
        <section class="hero">
            <!-- h1 product name + p tagline + a.cta "Start free" -->
        </section>
        <!-- section.features with three div.feature -->
        <!-- blockquote testimonial -->
        <!-- footer -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nimbus Notes — notes that follow you</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f8fafc;
                color: #0f172a;
            }
            nav {
                display: flex;
                gap: 20px;
                padding: 16px 24px;
                background: #0f172a;
            }
            nav a { color: #7dd3fc; text-decoration: none; }
            .hero {
                background: linear-gradient(120deg, #06b6d4, #7c3aed);
                color: white;
                text-align: center;
                padding: 72px 24px;
            }
            .cta {
                display: inline-block;
                margin-top: 16px;
                background: white;
                color: #0f172a;
                padding: 12px 28px;
                border-radius: 999px;
                text-decoration: none;
                font-weight: bold;
            }
            .features {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                padding: 40px 24px;
            }
            .feature {
                background: white;
                border-radius: 12px;
                padding: 24px;
                text-align: center;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
            }
            blockquote {
                margin: 0;
                padding: 40px 24px;
                text-align: center;
                font-size: 20px;
                font-style: italic;
            }
            footer {
                background: #0f172a;
                color: #94a3b8;
                text-align: center;
                padding: 20px;
            }
            @media (max-width: 600px) {
                .features { grid-template-columns: 1fr; }
            }
        </style>
    </head>
    <body>
        <nav>
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
        </nav>
        <section class="hero" id="hero">
            <h1>Nimbus Notes 📝</h1>
            <p>Notes that follow you to every device.</p>
            <a class="cta" href="#">Start free</a>
        </section>
        <section class="features" id="features">
            <div class="feature"><h3>⚡ Instant sync</h3><p>Every device, same note.</p></div>
            <div class="feature"><h3>🔍 Deep search</h3><p>Find 2019's grocery list.</p></div>
            <div class="feature"><h3>🔒 Private</h3><p>Your notes, encrypted.</p></div>
        </section>
        <blockquote>"I replaced four apps with one page of HTML." — a happy user</blockquote>
        <footer>Built with plain HTML + CSS — Module 8 graduate 🎓</footer>
    </body>
</html>`,
              hints: [
                {
                  en: "Order: nav → .hero (h1 + p + a.cta 'Start free') → .features (3 × .feature) → blockquote → footer. Build top to bottom.",
                  fa: "ترتیب: nav → .hero (h1 + p + a.cta با متنِ Start free) → .features (سه تا .feature) → blockquote → footer. از بالا به پایین بساز.",
                },
                {
                  en: "Hero glow: .hero { background: linear-gradient(120deg, #06b6d4, #7c3aed); color: white; text-align: center; padding: 72px 24px; }",
                  fa: "درخششِ هیرو: .hero { background: linear-gradient(120deg, #06b6d4, #7c3aed); color: white; text-align: center; padding: 72px 24px; }",
                },
                {
                  en: "The CTA is an anchor wearing a class: <a class='cta' href='#'>Start free</a> — the text must contain 'start'.",
                  fa: "CTA یک لینکِ کلاس‌دار است: <a class='cta' href='#'>Start free</a> — متنش باید کلمه‌ی start را داشته باشد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: ".hero", count: 1 },
                  { selector: ".cta", count: 1 },
                  { selector: ".cta", text: "start" },
                  { selector: ".feature", count: 3 },
                  { selector: "blockquote", count: 1 },
                  { selector: "footer", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },

    // ─── Module 9 ────────────────────────────────────────────
    {
      id: "html-m9",
      title: { en: "Tables & Data", fa: "جدول‌ها و داده‌ها" },
      blurb: {
        en: "Turn Module 2's first grid into real data tables: anatomy, merged cells and a styled scoreboard.",
        fa: "شبکه‌ی ساده‌ی ماژول ۲ را به جدولِ داده‌ی واقعی تبدیل کن: کالبدشکافی، سلول‌های ادغام‌شده و یک جدولِ امتیازِ استایل‌دار.",
      },
      lessons: [
        {
          id: "html-m9-l1",
          title: { en: "Table anatomy: caption, thead, tbody", fa: "کالبدشکافیِ جدول: caption و thead و tbody" },
          goal: {
            en: "Rebuild a table with the professional skeleton: caption, header section and data section.",
            fa: "جدول را با اسکلتِ حرفه‌ای بازسازی کنی: caption و بخشِ تیترها و بخشِ داده‌ها.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Why your Module 2 table was a puppy", fa: "جدولِ ماژول ۲ چرا هنوز بچه بود" },
              blocks: [
                {
                  type: "text",
                  en: "In Module 2 you built your first table out of `tr`, `td` and `th` — perfect for a weekly schedule. But real data tables — price lists, match results, lab reports — need a structure the BROWSER can reason about: which rows are headers, which rows are data, and what is this whole table even about? Three tags answer those three questions: `caption`, `thead` and `tbody`.",
                  fa: "در ماژول ۲ اولین جدولت را با `tr` و `td` و `th` ساختی — برای برنامه‌ی هفتگی عالی بود. ولی جدول‌های داده‌ی واقعی — لیستِ قیمت، نتایجِ مسابقه، گزارشِ آزمایشگاه — به ساختاری نیاز دارند که «مرورگر» بتواند باهاش استدلال کند: کدام ردیف‌ها تیترند، کدام‌ها داده، و اصلاً این جدول درباره‌ی چیست؟ سه تگ به همین سه سؤال جواب می‌دهند: `caption` و `thead` و `tbody`.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Anatomy</title>
  </head>
  <body>
    <table border="1">
      <caption>Dusty Bites — prices</caption>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bagel</td>
          <td>$3</td>
        </tr>
        <tr>
          <td>Flat white</td>
          <td>$4</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "caption names the table, thead holds the header row, tbody holds the data",
                    fa: "caption اسمِ جدول است، thead ردیفِ تیترها را نگه می‌دارد، tbody داده‌ها را",
                  },
                },
                {
                  type: "text",
                  en: "The reading order matters: `caption` must be the FIRST child inside `table`, then `thead`, then `tbody`. The browser forgives other orders, but screen readers announce the caption as the table's NAME — and they expect it first.",
                  fa: "ترتیبِ خواندن مهم است: `caption` باید «اولین» بچه‌ی `table` باشد، بعد `thead`، بعد `tbody`. مرورگر با ترتیب‌های دیگر هم مدارا می‌کند، ولی صفحه‌خوان‌ها caption را به‌عنوان «نامِ» جدول اعلام می‌کنند — و انتظار دارند اول بیاید.",
                },
                {
                  type: "tip",
                  en: "`caption` vs an `h2` above the table: the caption BELONGS to the table. Move the table, the caption moves with it; screen readers introduce the table by its caption. A heading above it is just a stranger standing nearby.",
                  fa: "`caption` در مقابلِ یک `h2` بالای جدول: caption «مالِ» جدول است. جدول را جابه‌جا کنی، caption باهاش می‌رود؛ صفحه‌خوان‌ها جدول را با caption معرفی می‌کنند. تیتری که بالای جدول است فقط یک رهگذرِ غریبه است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The rules of the house", fa: "قوانینِ خانه" },
              blocks: [
                {
                  type: "warn",
                  en: "Inside `thead` or `tbody` only `tr` may live. Inside `tr` only `th` and `td`. Drop a `div` or a `p` straight into a table and the browser will 'fix' it by dragging it OUT of the table — your layout breaks silently and you will blame the wrong line.",
                  fa: "داخلِ `thead` یا `tbody` فقط `tr` حق زندگی دارد. داخلِ `tr` فقط `th` و `td`. یک `div` یا `p` را مستقیم داخل جدول بگذاری، مرورگر 'درستش می‌کند' — یعنی بیرونش می‌کشد — و چیدمانت بی‌سروصدا خراب می‌شود و تو خطِ اشتباهی را مقصر می‌کنی.",
                },
                {
                  type: "text",
                  en: "Here is a secret: if you write rows directly inside `table` without a `tbody`, the browser quietly invents one for you — an anonymous tbody you cannot target with CSS or JS. Professionals write `tbody` explicitly so their code and the browser agree on what exists.",
                  fa: "یک راز: اگر ردیف‌ها را مستقیم داخل `table` بنویسی و `tbody` نگذاری، مرورگر بی‌سروصدا برایت یکی می‌سازد — یک tbody بی‌نام که نه با CSS می‌توانی بگیریش نه با JS. حرفه‌ای‌ها `tbody` را صریح می‌نویسند تا کدِ آن‌ها و مرورگر روی «چه چیزی وجود دارد» هم‌عقیده باشند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Teka FC — results</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      table { border-collapse: collapse; }
      caption { font-weight: bold; padding: 8px; }
      th, td { border: 1px solid #94a3b8; padding: 8px 14px; }
      thead th { background: #0f172a; color: white; }
    </style>
  </head>
  <body>
    <table>
      <caption>Teka FC — season results</caption>
      <thead>
        <tr><th>Match</th><th>Score</th><th>Result</th></tr>
      </thead>
      <tbody>
        <tr><td>vs Moon FC</td><td>2–0</td><td>Win ✅</td></tr>
        <tr><td>vs Storm United</td><td>1–1</td><td>Draw ➖</td></tr>
        <tr><td>vs Rocket SC</td><td>3–1</td><td>Win ✅</td></tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "A real scoreboard — press Run, then imagine 500 rows. thead/tbody still hold.",
                    fa: "یک جدولِ امتیازِ واقعی — Run را بزن، بعد ۵۰۰ ردیف را تصور کن. thead و tbody هنوز سرِ جایشان هستند.",
                  },
                },
                {
                  type: "tip",
                  en: "One table = one idea. Results and player salaries are two different stories — give each its own table with its own caption. Mash-ups confuse readers and screen readers alike.",
                  fa: "یک جدول = یک ایده. نتایجِ مسابقه و حقوقِ بازیکن‌ها دو قصه‌ی متفاوت‌اند — به هرکدام جدول و caption خودش را بده. قاطی‌کردن هم خواننده را گیج می‌کند هم صفحه‌خوان را.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Where must <caption> sit?", fa: "<caption> باید کجا بنشیند؟" },
                  options: [
                    { en: "As the first child inside the <table>", fa: "به‌عنوان اولین بچه، داخلِ <table>" },
                    { en: "Right above the table, outside it", fa: "درست بالای جدول، بیرون از آن" },
                    { en: "Inside <thead>, before the first <tr>", fa: "داخلِ <thead>، قبل از اولین <tr>" },
                  ],
                  answer: 0,
                  explain: {
                    en: "caption is part of the table itself — first child inside it. A heading above is just visual, not the table's name.",
                    fa: "caption بخشی از خودِ جدول است — اولین بچه‌اش. تیتری که بالای جدول می‌گذاری فقط دکوری است، نامِ جدول نیست.",
                  },
                },
                {
                  q: { en: "<thead> holds…", fa: "<thead> نگه می‌دارد…" },
                  options: [
                    { en: "the data rows of the table", fa: "ردیف‌های داده‌ی جدول را" },
                    { en: "the header row(s) of <th> cells", fa: "ردیف(های) تیتر را که سلول‌های <th> دارند" },
                    { en: "the table's border settings", fa: "تنظیماتِ خطِ جدول را" },
                  ],
                  answer: 1,
                  explain: {
                    en: "thead = table HEAD: the th header rows. Data rows belong to tbody.",
                    fa: "thead یعنی سرِ جدول: ردیف‌های تیترِ th. ردیف‌های داده مالِ tbody هستند.",
                  },
                },
                {
                  q: { en: "You skip <tbody> and write <tr>s straight into <table>. What happens?", fa: "بدون <tbody>، <tr>ها را مستقیم داخل <table> می‌نویسی. چه می‌شود؟" },
                  options: [
                    { en: "The page refuses to load", fa: "صفحه بارگذاری نمی‌شود" },
                    { en: "The browser creates an anonymous tbody you can't target", fa: "مرورگر یک tbody بی‌نام می‌سازد که نمی‌توانی بگیریش" },
                    { en: "The rows render as plain paragraphs", fa: "ردیف‌ها به‌شکل پاراگرافِ ساده نمایش داده می‌شوند" },
                  ],
                  answer: 1,
                  explain: {
                    en: "The table still renders — but without an explicit tbody, styling and scripting the data rows gets blurry. Write it yourself.",
                    fa: "جدول همچنان رندر می‌شود — ولی بدونِ tbodyِ صریح، استایل‌دادن و اسکریپت‌نویسیِ ردیف‌های داده تار می‌شود. خودت بنویسش.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Anatomy Lab 🧬", fa: "آزمایشگاهِ کالبدشکافی 🧬" },
              brief: {
                en: "Rebuild the cafe price table with the full skeleton: a `table` containing a `caption` whose text contains the word menu; a `thead` with one row holding EXACTLY two `th`; a `tbody` with EXACTLY two rows, each holding two `td`. Any menu items you like.",
                fa: "جدولِ قیمتِ کافه را با اسکلتِ کامل بازسازی کن: یک `table` که داخلش `caption` دارد و متنِ آن کلمه‌ی menu را دارد؛ یک `thead` با یک ردیف که دقیقاً دو `th` دارد؛ و یک `tbody` با دقیقاً دو ردیف که هرکدام دو `td` دارند. آیتم‌های منو هر چه خواستی.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Anatomy Lab</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            table, th, td { border: 1px solid #94a3b8; border-collapse: collapse; padding: 8px 14px; }
        </style>
    </head>
    <body>
        <h1>Dusty Bites 🥨</h1>
        <!-- TODO 1) <caption> with the word "menu" — as the FIRST child of table -->
        <table>
            <!-- TODO 2) <thead> with one <tr> of two <th> -->
            <!-- TODO 3) <tbody> with two <tr>, each with two <td> -->
        </table>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Anatomy Lab</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            table, th, td { border: 1px solid #94a3b8; border-collapse: collapse; padding: 8px 14px; }
        </style>
    </head>
    <body>
        <h1>Dusty Bites 🥨</h1>
        <table>
            <caption>Dusty Bites menu</caption>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Bagel</td>
                    <td>$3</td>
                </tr>
                <tr>
                    <td>Flat white</td>
                    <td>$4</td>
                </tr>
            </tbody>
        </table>
    </body>
</html>`,
              hints: [
                {
                  en: "Order inside the table: caption first, then thead, then tbody. Three sections, top to bottom.",
                  fa: "ترتیب داخل جدول: اول caption، بعد thead، بعد tbody. سه بخش، از بالا به پایین.",
                },
                {
                  en: "The header section: <thead><tr><th>Item</th><th>Price</th></tr></thead> — exactly two th.",
                  fa: "بخشِ تیترها: <thead><tr><th>Item</th><th>Price</th></tr></thead> — دقیقاً دو th.",
                },
                {
                  en: "Each data row is: <tr><td>Bagel</td><td>$3</td></tr> — wrap TWO of those in <tbody>…</tbody>.",
                  fa: "هر ردیفِ داده: <tr><td>Bagel</td><td>$3</td></tr> — دو تا از این‌ها را داخلِ <tbody>…</tbody> بپیچان.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "table", count: 1 },
                  { selector: "table caption", text: "menu" },
                  { selector: "thead th", count: 2 },
                  { selector: "tbody tr", count: 2 },
                  { selector: "tbody td", count: 4 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m9-l2",
          title: { en: "Merged cells: colspan & rowspan", fa: "سلول‌های ادغام‌شده: colspan و rowspan" },
          goal: {
            en: "Stretch cells across columns with colspan and down rows with rowspan.",
            fa: "سلول‌ها را با colspan روی ستون‌ها بکشی و با rowspan روی ردیف‌ها.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "One cell, many columns", fa: "یک سلول، چند ستون" },
              blocks: [
                {
                  type: "text",
                  en: "Real tables love a big title row: 'Results' stretched across all three columns. That is the `colspan` attribute — written on a `th` or `td`, it stretches that ONE cell across N columns: `<th colspan='3'>`. No CSS, no tricks — pure HTML.",
                  fa: "جدول‌های واقعی عاشقِ یک ردیفِ تیترِ بزرگ‌اند: «نتایج» که روی هر سه ستون کشیده شده. آن ویژگیِ `colspan` است — روی `th` یا `td` نوشته می‌شود و آن «یک» سلول را روی N ستون می‌کشد: `<th colspan='3'>`. بدونِ CSS، بدونِ کلک — کاملاً HTML.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Colspan</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      table, th, td { border: 1px solid #94a3b8; border-collapse: collapse; padding: 8px 14px; }
      thead th { background: #0f172a; color: white; }
    </style>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th colspan="3">🏆 Season Results</th>
        </tr>
        <tr>
          <th>Match</th><th>Score</th><th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>vs Moon FC</td><td>2–0</td><td>Win ✅</td></tr>
        <tr><td>vs Storm Utd</td><td>1–1</td><td>Draw ➖</td></tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "The title cell spans 3 columns; the header row below still has 3 normal cells",
                    fa: "سلولِ تیتر روی ۳ ستون کشیده شده؛ ردیفِ تیترِ زیرش هنوز ۳ سلولِ معمولی دارد",
                  },
                },
                {
                  type: "text",
                  en: "The trade: after merging, that row simply holds FEWER cells. `colspan='3'` replaces three cells with one. A 3-column table wants every row's colspan values to add up to 3 — one `colspan='3'` cell alone, or three plain cells, or one `colspan='2'` + one plain. Miscount and the table gets a limp.",
                  fa: "معامله این است: بعد از ادغام، آن ردیف به‌سادگی «سلولِ کمتری» دارد. `colspan='3'` سه سلول را با یک‌عدد عوض می‌کند. جدولِ ۳ ستونه دوست دارد جمعِ colspanهای هر ردیف ۳ بشود — یا یک سلولِ `colspan='3'` تنها، یا سه سلولِ ساده، یا یک `colspan='2'` + یک سلولِ ساده. اشتباه بشماری، جدول لنگ می‌زند.",
                },
                {
                  type: "tip",
                  en: "Count cells per row like a cashier: 2 + 1 = 3 columns ✓. That one habit kills 90% of broken-table bugs.",
                  fa: "سلول‌های هر ردیف را مثل یک صندوقدار بشمار: ۲ + ۱ = ۳ ستون ✓. همین یک عادت، ۹۰٪ باگ‌های جدولِ خراب را می‌کشد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "rowspan: stretching down instead", fa: "rowspan: کشیدن به سمتِ پایین" },
              blocks: [
                {
                  type: "text",
                  en: "`rowspan='2'` stretches a cell DOWN through two rows — perfect for a day name that covers two time slots. The twist: the rows below must NOT re-declare that slot. The Monday cell already occupies its place in row two, so row two is written with one cell fewer.",
                  fa: "`rowspan='2'` یک سلول را به سمتِ «پایین» روی دو ردیف می‌کشد — برای نامِ روزی که دو ساعتِ برنامه را پوشش می‌دهد عالی است. نکته‌اش: ردیف‌های پایین نباید آن جایگاه را دوباره اعلام کنند. سلولِ Monday جای خودش در ردیفِ دوم را گرفته، پس ردیفِ دوم با یک سلولِ کمتر نوشته می‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rowspan</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      table, th, td { border: 1px solid #94a3b8; border-collapse: collapse; padding: 8px 14px; }
      thead th { background: #0f172a; color: white; }
      tbody th { background: #e2e8f0; }
    </style>
  </head>
  <body>
    <table>
      <thead>
        <tr><th>Day</th><th>10:00</th><th>12:00</th></tr>
      </thead>
      <tbody>
        <tr>
          <th rowspan="2">Monday</th>
          <td>Math</td>
          <td>Guitar</td>
        </tr>
        <tr>
          <!-- Monday already spans this row — only 2 cells here -->
          <td>Chess</td>
          <td>Lunch 😋</td>
        </tr>
        <tr>
          <th>Tuesday</th>
          <td>HTML practice</td>
          <td>Football</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "Monday spans down 2 rows — the second Monday row holds only 2 cells",
                    fa: "Monday روی ۲ ردیف پایین کشیده شده — ردیفِ دومِ دوشنبه فقط ۲ سلول دارد",
                  },
                },
                {
                  type: "warn",
                  en: "The classic rowspan bug: re-writing the merged cell in the next row. The grid shifts one column left and every row after looks drunk. When a cell above spans down, skip it below.",
                  fa: "باگِ کلاسیکِ rowspan: نوشتنِ دوباره‌ی سلولِ ادغام‌شده در ردیفِ بعدی. شبکه یک ستون به چپ می‌لغزد و همه‌ی ردیف‌های بعدی مست به‌نظر می‌رسند. وقتی سلولی از بالا به پایین کشیده شده، پایین ازش بگذر.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "<td colspan='2'> means the cell…", fa: "<td colspan='2'> یعنی این سلول…" },
                  options: [
                    { en: "occupies 2 columns in its row", fa: "در ردیفِ خودش ۲ ستون را اشغال می‌کند" },
                    { en: "occupies 2 rows", fa: "۲ ردیف را اشغال می‌کند" },
                    { en: "shows its text twice as large", fa: "متنش را دو برابر بزرگ نشان می‌دهد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "col = columns (across), row = rows (down). colspan='2' eats two column slots in the same row.",
                    fa: "col یعنی ستون (افقی)، row یعنی ردیف (عمودی). colspan='2' دو جایگاهِ ستونی در همان ردیف را می‌خورد.",
                  },
                },
                {
                  q: { en: "A 4-column table: one row has <th colspan='2'>Title</th> plus data. How many more cells fit in that row?", fa: "جدولِ ۴ ستونه: یک ردیف <th colspan='2'>Title</th> دارد به‌اضافه‌ی داده. چند سلولِ دیگر در آن ردیف جا می‌شود؟" },
                  options: [
                    { en: "1", fa: "۱" },
                    { en: "2", fa: "۲" },
                    { en: "3", fa: "۳" },
                  ],
                  answer: 1,
                  explain: {
                    en: "colspan='2' uses 2 of the 4 slots — 2 plain cells remain to complete the row.",
                    fa: "colspan='2' دو جایگاه از ۴ را می‌گیرد — ۲ سلولِ ساده باقی می‌ماند تا ردیف کامل شود.",
                  },
                },
                {
                  q: { en: "A cell with rowspan='3' affects…", fa: "سلولی با rowspan='3' روی چه اثر می‌گذارد…" },
                  options: [
                    { en: "the two rows BELOW it — they must skip its slot", fa: "دو ردیفِ «پایینِ» خودش — باید جایگاهش را رد کنند" },
                    { en: "the row above it", fa: "ردیفِ بالای خودش" },
                    { en: "only its own row", fa: "فقط ردیفِ خودش" },
                  ],
                  answer: 0,
                  explain: {
                    en: "rowspan reaches downward. The next two rows are written one cell short, exactly where the tall cell sits.",
                    fa: "rowspan به پایین می‌رسد. دو ردیفِ بعدی، درست در جایگاهِ آن سلولِ قدی، یک سلول کمتر نوشته می‌شوند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The merged menu 🧩", fa: "منوی ادغام‌شده 🧩" },
              brief: {
                en: "Build a two-column price table with a merged banner: a `table`; inside `thead`, ONE row with a single `th colspan='2'` whose text contains the word prices; then a second header row of two normal `th`; a `tbody` with EXACTLY two rows of two `td` each.",
                fa: "یک جدولِ قیمتیِ دوستونه با بنرِ ادغام‌شده بساز: یک `table`؛ داخلِ `thead` یک ردیف با یک `th colspan='2'` که متنش کلمه‌ی prices را دارد؛ بعد یک ردیفِ تیترِ دوم با دو `th` معمولی؛ و یک `tbody` با دقیقاً دو ردیفِ دو‌تاییِ `td`.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Merged Menu</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            table, th, td { border: 1px solid #94a3b8; border-collapse: collapse; padding: 8px 14px; }
            thead th { background: #0f172a; color: white; }
        </style>
    </head>
    <body>
        <h1>Sweet Corner 🍰</h1>
        <table>
            <thead>
                <!-- TODO 1) one <tr> with a single <th colspan="2"> containing "prices" -->
                <!-- TODO 2) one <tr> with two normal <th> -->
            </thead>
            <tbody>
                <!-- TODO 3) two <tr>, each with two <td> -->
            </tbody>
        </table>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Merged Menu</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            table, th, td { border: 1px solid #94a3b8; border-collapse: collapse; padding: 8px 14px; }
            thead th { background: #0f172a; color: white; }
        </style>
    </head>
    <body>
        <h1>Sweet Corner 🍰</h1>
        <table>
            <thead>
                <tr>
                    <th colspan="2">Sweet Corner prices</th>
                </tr>
                <tr>
                    <th>Dessert</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Chocolate cake</td>
                    <td>$5</td>
                </tr>
                <tr>
                    <td>Baklava</td>
                    <td>$4</td>
                </tr>
            </tbody>
        </table>
    </body>
</html>`,
              hints: [
                {
                  en: "The banner cell: <th colspan='2'>Sweet Corner prices</th> — one cell, two columns wide.",
                  fa: "سلولِ بنر: <th colspan='2'>Sweet Corner prices</th> — یک سلول، به پهنای دو ستون.",
                },
                {
                  en: "Second header row is normal: <tr><th>Dessert</th><th>Price</th></tr>.",
                  fa: "ردیفِ تیترِ دوم معمولی است: <tr><th>Dessert</th><th>Price</th></tr>.",
                },
                {
                  en: "Count check: banner row = 1 cell (colspan 2), header row = 2 cells, each tbody row = 2 cells. Totals add up to 2 columns everywhere.",
                  fa: "شمارش: ردیفِ بنر = ۱ سلول (colspan 2)، ردیفِ تیتر = ۲ سلول، هر ردیفِ tbody = ۲ سلول. همه‌جا جمعش ۲ ستون درمی‌شود.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "table", count: 1 },
                  { selector: "th[colspan='2']", count: 1 },
                  { selector: "thead th", text: "price" },
                  { selector: "tbody tr", count: 2 },
                  { selector: "tbody td", count: 4 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m9-l3",
          title: { en: "Dress the table: inline styles", fa: "جدول را بپوشان: استایلِ درون‌خطی" },
          goal: {
            en: "Turn a naked grid into a polished table using the style attribute: collapse borders, pad cells, paint the header.",
            fa: "شبکه‌ی لخت را با ویژگیِ style به جدولی آراسته تبدیل کنی: خطوطِ ادغام‌شده، سلول‌های پُر و تیترِ رنگی.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "Borders that don't lie twice", fa: "خط‌هایی که دو بار دروغ نمی‌گویند" },
              blocks: [
                {
                  type: "text",
                  en: "The old `border='1'` scaffolding from Module 2 draws a DOUBLE grid: every cell draws its own border next to its neighbor's. The pro fix is one declaration on the table: `border-collapse: collapse` — adjacent borders merge into single hairlines. Add `padding` on the cells and the table instantly looks grown-up.",
                  fa: "داربستِ `border='1'` از ماژول ۲ یک شبکه‌ی «دولایه» می‌کشد: هر سلول خطِ خودش را کنارِ خطِ همسایه‌اش می‌کشد. راه‌حلِ حرفه‌ای یک اعلامیه روی جدول است: `border-collapse: collapse` — خط‌های چسبیده در یک خطِ نازک ادغام می‌شوند. کمی `padding` روی سلول‌ها اضافه کنی، جدول همان لحظه بزرگ‌سال می‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Inline table</title>
  </head>
  <body>
    <table style="border-collapse: collapse;">
      <thead>
        <tr>
          <th style="background-color: #0f172a; color: white; padding: 10px 16px;">Item</th>
          <th style="background-color: #0f172a; color: white; padding: 10px 16px;">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Bagel</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">$3</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Flat white</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">$4</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "Same table as Module 2 — but collapse + padding + a dark header = instant glow-up",
                    fa: "همان جدولِ ماژول ۲ — ولی با collapse و padding و تیترِ تیره = یک جهشِ آنی",
                  },
                },
                {
                  type: "tip",
                  en: "The style attribute holds CSS declarations separated by semicolons: style='border: 1px solid #cbd5e1; padding: 10px 16px'. You met it on cards and badges in Modules 6–7 — tables wear it the same way.",
                  fa: "ویژگیِ style اعلامیه‌های CSS را با سمی‌کالن نگه می‌دارد: style='border: 1px solid #cbd5e1; padding: 10px 16px'. در ماژول‌های ۶ و ۷ روی کارت‌ها و بج‌ها دیدیش — جدول‌ها هم همان‌طور می‌پوشندش.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Zebra rows and the exact-name rule", fa: "ردیف‌های گورخری و قانونِ اسمِ دقیق" },
              blocks: [
                {
                  type: "text",
                  en: "Pro tables alternate row backgrounds — the zebra stripe — so eyes don't slide across the row. In pure HTML you paint each `tr` yourself: `<tr style='background-color: #f1f5f9'>`. When you reach CSS courses, `:nth-child(even)` automates this; today the attribute is your gym.",
                  fa: "جدول‌های حرفه‌ای پس‌زمینه‌ی ردیف‌ها را یکی‌درمیان رنگ می‌کنند — راه‌راهِ گورخری — تا چشم روی ردیف سُر نخورد. در HTMLِ خالص خودت هر `tr` را رنگ می‌زنی: `<tr style='background-color: #f1f5f9'>`. وقتی به دوره‌های CSS برسی، `:nth-child(even)` این را خودکار می‌کند؛ امروز ویژگیِ style باشگاهِ توست.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Zebra</title>
  </head>
  <body>
    <table style="border-collapse: collapse;">
      <caption style="font-weight: bold; padding: 8px;">Ladder standings</caption>
      <thead>
        <tr>
          <th style="background-color: #0f172a; color: white; padding: 10px 16px;">Player</th>
          <th style="background-color: #0f172a; color: white; padding: 10px 16px;">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #ffffff;">
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Aria</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">120</td>
        </tr>
        <tr style="background-color: #f1f5f9;">
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Sara</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">98</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "White and #f1f5f9 alternate — the zebra pattern",
                    fa: "سفید و #f1f5f9 یکی‌درمیان — الگوی گورخری",
                  },
                },
                {
                  type: "warn",
                  en: "Property names must be EXACT: the collapsed-borders declaration is `border-collapse: collapse` (not `border: collapse`), and the paint property is `background-color` (not `background`). Close spelling does not count — CSS is a language of exact words.",
                  fa: "نامِ ویژگی‌ها باید «دقیق» باشد: اعلامیه‌ی خطوطِ ادغام‌شده `border-collapse: collapse` است (نه `border: collapse`)، و ویژگیِ رنگ‌آمیزی `background-color` است (نه `background`). املای نزدیک حساب نمی‌شود — CSS زبانِ کلماتِ دقیق است.",
                },
                {
                  type: "text",
                  en: "Honest footnote: inline styles don't reuse — 50 cells means 50 copies, which is why real projects move this to a `<style>` block with classes. In this course the graded challenges read the style attribute directly, so you practice it here; the CSS courses will show you the reusable way.",
                  fa: "پانویسِ صادقانه: استایلِ درون‌خطی قابل‌استفاده‌ی مجدد نیست — ۵۰ سلول یعنی ۵۰ نسخه؛ برای همین پروژه‌های واقعی این را به بلوکِ `<style>` و کلاس‌ها می‌برند. در این دوره، چالش‌های نمره‌دهی مستقیم ویژگیِ style را می‌خوانند و همین‌جا تمرینش می‌کنی؛ دوره‌های CSS راهِ قابل‌استفاده را نشان می‌دهند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does border-collapse: collapse do?", fa: "border-collapse: collapse چه می‌کند؟" },
                  options: [
                    { en: "Merges adjacent cell borders into single lines", fa: "خط‌های کناریِ سلول‌ها را در خطوطِ تکی ادغام می‌کند" },
                    { en: "Removes all borders", fa: "همه‌ی خط‌ها را حذف می‌کند" },
                    { en: "Shrinks the table's width", fa: "پهنای جدول را جمع می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Without it, each cell draws its own border next to its neighbor's — the doubled-grid look. Collapse merges them.",
                    fa: "بدونِ آن هر سلول خطِ خودش را کنارِ همسایه‌اش می‌کشد — همان ظاهرِ دولایه. collapse آنها را یکی می‌کند.",
                  },
                },
                {
                  q: { en: "Where does padding for table cells go?", fa: "padding سلول‌های جدول کجا می‌رود؟" },
                  options: [
                    { en: "On the th/td cells themselves", fa: "روی خودِ سلول‌های th و td" },
                    { en: "On the table only", fa: "فقط روی table" },
                    { en: "On the caption", fa: "روی caption" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Padding is per-cell breathing room — it belongs on th and td (or a CSS rule targeting them).",
                    fa: "padding فضای تنفسیِ هر سلول است — مالِ th و td است (یا قانونِ CSSی که آنها را می‌گیرد).",
                  },
                },
                {
                  q: { en: "Which attribute carries inline CSS?", fa: "کدام ویژگی CSSِ درون‌خطی را حمل می‌کند؟" },
                  options: [
                    { en: "css", fa: "css" },
                    { en: "style", fa: "style" },
                    { en: "class", fa: "class" },
                  ],
                  answer: 1,
                  explain: {
                    en: "style='…' holds declarations right on the element. class only names the element for later CSS.",
                    fa: "style='…' اعلامیه‌ها را مستقیم روی عنصر نگه می‌دارد. class فقط برای عنصر اسم می‌گذارد تا CSS بعداً پیدایش کند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The polished price list ✨", fa: "لیستِ قیمتِ آراسته ✨" },
              brief: {
                en: "Polish a 2-column price table with INLINE styles: the `table` gets `style='border-collapse: collapse'`; EVERY `thead` `th` gets `style` containing `background-color: #0f172a` AND `color: white`; EVERY `tbody` `td` gets `style` containing `border: 1px solid #cbd5e1` and some `padding`. Two data rows × two columns.",
                fa: "یک جدولِ قیمتیِ دوستونه را با استایلِ «درون‌خطی» آراسته کن: `table` ویژگیِ `style='border-collapse: collapse'` می‌گیرد؛ «هر» `th` داخلِ `thead` یک `style` دارد که `background-color: #0f172a` و `color: white` را دارد؛ و «هر» `td` داخلِ `tbody` یک `style` دارد که `border: 1px solid #cbd5e1` و کمی `padding` دارد. دو ردیفِ داده × دو ستون.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Polished Price List</title>
    </head>
    <body>
        <h1>Book Nook 📚</h1>
        <!-- TODO: table with style="border-collapse: collapse;" -->
        <table>
            <thead>
                <tr>
                    <!-- TODO: th with style="background-color: #0f172a; color: white; padding: 10px 16px;" -->
                </tr>
            </thead>
            <tbody>
                <!-- TODO: two rows, each td styled with border + padding -->
            </tbody>
        </table>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Polished Price List</title>
    </head>
    <body>
        <h1>Book Nook 📚</h1>
        <table style="border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="background-color: #0f172a; color: white; padding: 10px 16px;">Book</th>
                    <th style="background-color: #0f172a; color: white; padding: 10px 16px;">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">HTML for Humans</td>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">$9</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">CSS for Cats</td>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">$8</td>
                </tr>
            </tbody>
        </table>
    </body>
</html>`,
              hints: [
                {
                  en: "The table tag: <table style='border-collapse: collapse;'> — one declaration, on the table.",
                  fa: "تگِ جدول: <table style='border-collapse: collapse;'> — یک اعلامیه، روی خودِ جدول.",
                },
                {
                  en: "Header cells: <th style='background-color: #0f172a; color: white; padding: 10px 16px;'>Book</th> — both properties, exactly spelled.",
                  fa: "سلول‌های تیتر: <th style='background-color: #0f172a; color: white; padding: 10px 16px;'>Book</th> — هر دو ویژگی، با املای دقیق.",
                },
                {
                  en: "Data cells: <td style='border: 1px solid #cbd5e1; padding: 10px 16px;'>$9</td> — every td in the tbody, 4 of them.",
                  fa: "سلول‌های داده: <td style='border: 1px solid #cbd5e1; padding: 10px 16px;'>$9</td> — همه‌ی tdهای tbody، چهار تا.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "table", styleIncludes: "border-collapse: collapse" },
                  { selector: "thead th", styleIncludes: "background-color: #0f172a" },
                  { selector: "thead th", styleIncludes: "color: white" },
                  { selector: "tbody td", count: 4 },
                  { selector: "tbody td", styleIncludes: "border: 1px solid" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m9-l4",
          title: { en: "Mini-project: Class Scoreboard", fa: "مینی‌پروژه: جدولِ امتیازهای کلاس" },
          goal: {
            en: "Ship a complete data table: caption, scoped headers, four players, styled header row.",
            fa: "یک جدولِ داده‌ی کامل تحویل بدهی: caption و تیترهای scope دار و چهار بازیکن و ردیفِ تیترِ رنگی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "scope: wiring headers to data", fa: "scope: سیم‌کشیِ تیترها به داده" },
              blocks: [
                {
                  type: "text",
                  en: "One last attribute makes a table truly pro: `scope`. On a column header you write `<th scope='col'>` — this describes the column below me. When a data row STARTS with a header cell — the player's name! — that cell is `<th scope='row'>`: I describe this row. Screen readers use scope to announce 'Aria, score 120' instead of a meaningless cell recital.",
                  fa: "یک ویژگیِ آخر، جدول را واقعاً حرفه‌ای می‌کند: `scope`. روی تیترِ ستون می‌نویسی `<th scope='col'>` — یعنی «من تیترِ ستونِ زیرم هستم». وقتی ردیفِ داده با یک سلولِ تیتری شروع می‌شود — اسمِ بازیکن! — آن سلول `<th scope='row'>` است: «من تیترِ این ردیفم». صفحه‌خوان‌ها با scope به‌جای تلاوتِ بی‌روحِ سلول‌ها می‌گویند «آریا، امتیاز ۱۲۰».",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Scoped</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      table { border-collapse: collapse; }
      th, td { border: 1px solid #cbd5e1; padding: 10px 16px; }
      thead th { background: #0f172a; color: white; }
      tbody th { background: #e2e8f0; text-align: left; }
    </style>
  </head>
  <body>
    <table>
      <caption>Class scoreboard</caption>
      <thead>
        <tr>
          <th scope="col">Player</th>
          <th scope="col">Score</th>
          <th scope="col">Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Aria</th>
          <td>120</td><td>Pro</td>
        </tr>
        <tr>
          <th scope="row">Sara</th>
          <td>98</td><td>Rookie</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "scope='col' on top, scope='row' on the names — a table a screen reader can narrate",
                    fa: "scope='col' بالا، scope='row' روی اسم‌ها — جدولی که صفحه‌خوان بتواند روایتش کند",
                  },
                },
                {
                  type: "tip",
                  en: "`th` inside `tbody` is not only legal — it is the recommended way to mark row headers. Bold + centered by default; a tiny `text-align: left` on `tbody th` brings the names back to earth.",
                  fa: "`th` داخلِ `tbody` نه‌تنها قانونی است بلکه راهِ توصیه‌شده‌ی تیترِ ردیف است. به‌طور پیش‌فرض پررنگ و وسط‌چین است؛ یک `text-align: left` کوچک روی `tbody th` اسم‌ها را به زمین برمی‌گرداند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The full recipe, in order", fa: "دستورِ کامل، به ترتیب" },
              blocks: [
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Scoreboard</title>
  </head>
  <body>
    <!-- build order: caption → thead → tbody → styles -->
    <table style="border-collapse: collapse;">
      <caption style="font-weight: bold; padding: 8px;">Frontend class — week 3</caption>
      <thead>
        <tr>
          <th scope="col" style="background-color: #0f172a; color: white; padding: 10px 16px;">Player</th>
          <th scope="col" style="background-color: #0f172a; color: white; padding: 10px 16px;">Score</th>
          <th scope="col" style="background-color: #0f172a; color: white; padding: 10px 16px;">Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" style="border: 1px solid #cbd5e1; padding: 10px 16px;">Aria</th>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">120</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Pro</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "The skeleton you will ship in the challenge — one player shown; add three more",
                    fa: "اسکلتی که در چالش تحویل می‌دهی — یک بازیکن نشان داده شده؛ سه‌تای دیگر اضافه کن",
                  },
                },
                {
                  type: "text",
                  en: "Build order that never fails: `caption` first, then `thead` (three `th scope='col'`), then `tbody` (each row = one `th scope='row'` + two `td`), styles last. Text block by text block, the table grows without surprises.",
                  fa: "ترتیبِ ساختنِ هرگز‌شکست‌ناپذیر: اول `caption`، بعد `thead` (سه `th scope='col'`)، بعد `tbody` (هر ردیف = یک `th scope='row'` + دو `td`)، و در آخر استایل‌ها. بلوک‌به‌بلوک جدول بدونِ غافلگیری بزرگ می‌شود.",
                },
                {
                  type: "warn",
                  en: "Cell math: a 3-column tbody row needs EXACTLY 3 cells — one th + two td. Four players = four rows = twelve cells total in tbody. Count before you press Check.",
                  fa: "ریاضیِ سلول: ردیفِ ۳ ستونه در tbody دقیقاً ۳ سلول می‌خواهد — یک th + دو td. چهار بازیکن = چهار ردیف = دوازده سلول در کلِ tbody. قبل از زدنِ Check بشمار.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "scope='row' belongs on…", fa: "scope='row' روی چه می‌نشیند…" },
                  options: [
                    { en: "the header cell that starts a data row (e.g. a player name)", fa: "سلولِ تیتری که یک ردیفِ داده را شروع می‌کند (مثل اسمِ بازیکن)" },
                    { en: "every td in the table", fa: "همه‌ی tdهای جدول" },
                    { en: "the caption", fa: "روی caption" },
                  ],
                  answer: 0,
                  explain: {
                    en: "scope declares the header's AXIS: col = I name this column, row = I name this row.",
                    fa: "scope «محورِ» تیتر را اعلام می‌کند: col یعنی نامِ این ستونم، row یعنی نامِ این ردیفم.",
                  },
                },
                {
                  q: { en: "Which order is valid inside a <table>?", fa: "کدام ترتیب داخلِ <table> درست است؟" },
                  options: [
                    { en: "caption, thead, tbody", fa: "caption، بعد thead، بعد tbody" },
                    { en: "tbody, caption, thead", fa: "tbody، بعد caption، بعد thead" },
                    { en: "thead, caption, tbody", fa: "thead، بعد caption، بعد tbody" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Caption first (it names the table), header section next, data last — the order screen readers expect.",
                    fa: "اول caption (نامِ جدول را می‌گوید)، بعد بخشِ تیترها، در آخر داده‌ها — همان ترتیبی که صفحه‌خوان‌ها انتظارش را دارند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Class Scoreboard 🏆", fa: "جدولِ امتیازهای کلاس 🏆" },
              brief: {
                en: "THE SCOREBOARD. Build: a `table` with a `caption` whose text contains the word scoreboard; a `thead` with one row of EXACTLY three `th`, each carrying `style` with `background-color: #0f172a` and `color: white`; a `tbody` with EXACTLY four rows, each starting with a `th scope='row'` (a player name) followed by two `td` (score + level). Style the cells with `border: 1px solid #cbd5e1` and `padding` too.",
                fa: "جدولِ امتیازها. بساز: یک `table` با `caption` که متنش کلمه‌ی scoreboard را دارد؛ یک `thead` با یک ردیفِ دقیقاً سه‌تاییِ `th` که هرکدام `style` با `background-color: #0f172a` و `color: white` دارند؛ و یک `tbody` با دقیقاً چهار ردیف که هرکدام با یک `th scope='row'` (اسمِ بازیکن) شروع می‌شوند و بعدش دو `td` (امتیاز + سطح) دارند. سلول‌ها را با `border: 1px solid #cbd5e1` و `padding` هم استایل بده.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Class Scoreboard</title>
    </head>
    <body>
        <h1>HTML Course — Top Players 🏆</h1>
        <!-- TODO 1) table + caption containing "scoreboard" -->
        <table style="border-collapse: collapse;">
            <thead>
                <!-- TODO 2) one <tr> with three <th scope="col"> styled dark -->
            </thead>
            <tbody>
                <!-- TODO 3) four <tr>: th scope="row" + two td each -->
            </tbody>
        </table>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Class Scoreboard</title>
    </head>
    <body>
        <h1>HTML Course — Top Players 🏆</h1>
        <table style="border-collapse: collapse;">
            <caption style="font-weight: bold; padding: 8px;">Class scoreboard</caption>
            <thead>
                <tr>
                    <th scope="col" style="background-color: #0f172a; color: white; padding: 10px 16px;">Player</th>
                    <th scope="col" style="background-color: #0f172a; color: white; padding: 10px 16px;">Score</th>
                    <th scope="col" style="background-color: #0f172a; color: white; padding: 10px 16px;">Level</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" style="border: 1px solid #cbd5e1; padding: 10px 16px; text-align: left;">Aria</th>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">120</td>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Pro</td>
                </tr>
                <tr>
                    <th scope="row" style="border: 1px solid #cbd5e1; padding: 10px 16px; text-align: left;">Sara</th>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">98</td>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Rookie</td>
                </tr>
                <tr>
                    <th scope="row" style="border: 1px solid #cbd5e1; padding: 10px 16px; text-align: left;">Kian</th>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">87</td>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Rookie</td>
                </tr>
                <tr>
                    <th scope="row" style="border: 1px solid #cbd5e1; padding: 10px 16px; text-align: left;">Nima</th>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">74</td>
                    <td style="border: 1px solid #cbd5e1; padding: 10px 16px;">Cadet</td>
                </tr>
            </tbody>
        </table>
    </body>
</html>`,
              hints: [
                {
                  en: "Header row pattern: <th scope='col' style='background-color: #0f172a; color: white; padding: 10px 16px;'>Player</th> — three of these, one per column.",
                  fa: "الگوی ردیفِ تیتر: <th scope='col' style='background-color: #0f172a; color: white; padding: 10px 16px;'>Player</th> — سه‌تا از این، برای هر ستون یکی.",
                },
                {
                  en: "Each player row: <tr><th scope='row' style='border: 1px solid #cbd5e1; padding: 10px 16px;'>Aria</th><td style='border: 1px solid #cbd5e1; padding: 10px 16px;'>120</td><td style='border: 1px solid #cbd5e1; padding: 10px 16px;'>Pro</td></tr>",
                  fa: "هر ردیفِ بازیکن: <tr><th scope='row' style='border: 1px solid #cbd5e1; padding: 10px 16px;'>Aria</th><td style='border: 1px solid #cbd5e1; padding: 10px 16px;'>120</td><td style='border: 1px solid #cbd5e1; padding: 10px 16px;'>Pro</td></tr>",
                },
                {
                  en: "Final count: caption ✓, 3 thead th, 4 tbody rows, 4 th[scope='row'], 8 tbody td. Anything else is extra or missing.",
                  fa: "شمارشِ نهایی: caption ✓، سه th در thead، چهار ردیف در tbody، چهار th[scope='row']، هشت td در tbody. هر چیز دیگری یا اضافه است یا جا مانده.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "table caption", text: "scoreboard" },
                  { selector: "thead th", count: 3 },
                  { selector: "thead th", styleIncludes: "background-color: #0f172a" },
                  { selector: "tbody tr", count: 4 },
                  { selector: "th[scope='row']", count: 4 },
                  { selector: "tbody td", count: 8 },
                ],
              },
            },
          ],
        },
      ],
    },

    // ─── Module 10 ───────────────────────────────────────────
    {
      id: "html-m10",
      title: { en: "Forms That Work", fa: "فرم‌هایی که کار می‌کنند" },
      blurb: {
        en: "Inputs, labels, selects and buttons — collect real information from real humans, accessibly.",
        fa: "اینپوت، لیبل، منوی کشویی و دکمه — از آدم‌های واقعی، به‌شکلِ درست و دسترس‌پذیر، اطلاعاتِ واقعی جمع کن.",
      },
      lessons: [
        {
          id: "html-m10-l1",
          title: { en: "The form skeleton: form, label, input", fa: "اسکلتِ فرم: form و label و input" },
          goal: {
            en: "Build your first working question: a labeled text input inside a form, with a submit button.",
            fa: "اولین سؤالِ کاری‌ات را بسازی: یک اینپوتِ متنیِ لیبل‌دار داخلِ form، با دکمه‌ی ارسال.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "A form is a conversation", fa: "فرم یک گفت‌وگوست" },
              blocks: [
                {
                  type: "text",
                  en: "Everything you have built so far TALKS: headings announce, paragraphs explain, tables report. Forms are where the page finally LISTENS. Search boxes, logins, comment fields, pizza orders — all of them are `form`s: a container tag that wraps questions (`form`), each question being a control. The simplest control is `<input>`.",
                  fa: "تا امروز هرچه ساختی فقط «حرف می‌زد»: تیتر اعلام می‌کرد، پاراگراف توضیح می‌داد، جدول گزارش می‌داد. فرم‌ها جایی‌اند که صفحه بالاخره «گوش می‌دهد». باکسِ جست‌وجو، لاگین، فیلدِ کامنت، سفارشِ پیتزا — همه‌شان `form`‌اند: تگِ ظرفی که سؤال‌ها را می‌پیچد و هر سؤال یک کنترل است. ساده‌ترین کنترل `<input>` است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>First form</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      label { display: block; margin-bottom: 4px; font-weight: bold; }
      input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
      button { margin-top: 12px; padding: 10px 20px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
    </style>
  </head>
  <body>
    <h1>Join the club ✍️</h1>
    <form>
      <label for="name">Your name</label>
      <input type="text" id="name" name="name" placeholder="e.g. Aria">
      <button type="submit">Join</button>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "Press Run, click the LABEL — the box focuses. That is the for/id handshake.",
                    fa: "Run را بزن، روی «لیبل» کلیک کن — باکس فعال می‌شود. آن همان دست‌دادنِ for و id است.",
                  },
                },
                {
                  type: "text",
                  en: "`<input>` is a VOID tag — it opens and never closes; everything it is lives in its attributes. `type` decides its behavior (`text` here), `id` gives it a page-unique name, `name` labels the data it will carry, `placeholder` ghosts a hint inside the box.",
                  fa: "`<input>` یک تگِ VOID است — باز می‌شود و هرگز بسته نمی‌شود؛ همه‌چیزِ آن در ویژگی‌هایش است. `type` رفتارش را تعیین می‌کند (اینجا `text`)، `id` یک نامِ یکتا در صفحه به‌اش می‌دهد، `name` برچسبِ داده‌ای است که حمل می‌کند، و `placeholder` یک سایه‌نشانِ راهنما داخلِ جعبه است.",
                },
                {
                  type: "tip",
                  en: "The label's `for` must EXACTLY match the input's `id` — character by character. One missing letter and the link is silently dead: no focus on click, no announcement for screen readers.",
                  fa: "`for` لیبل باید «دقیقاً» با `id` اینپوت برابر باشد — حرف‌به‌حرف. یک حرف جا بیفتد و پیوند بی‌سروصدا می‌میرد: نه کلیک روی لیبل فوکوس می‌کند، نه صفحه‌خوان چیزی اعلام می‌کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Why label is not decoration", fa: "چرا label فقط دکور نیست" },
              blocks: [
                {
                  type: "text",
                  en: "A `label` wired to its input by `for`/`id` does three jobs at once: clicking the label focuses the input (a much bigger tap target on phones); screen readers read the label aloud when the user lands in the field; and it makes the whole question — not just a floating box — one clickable unit. Three wins, one attribute.",
                  fa: "یک `label` که با `for`/`id` به اینپوتش وصل شده سه کار همزمان می‌کند: کلیک روی لیبل، اینپوت را فوکوس می‌کند (روی موبایل یک هدفِ لمسیِ خیلی بزرگ‌تر)؛ صفحه‌خوان وقتی کاربر می‌رسد داخلِ فیلد، لیبل را بلند می‌خواند؛ و کلِ «سؤال» را — نه فقط یک جعبه‌ی شناور — یک واحدِ کلیک‌کردنی می‌کند. سه برد، با یک ویژگی.",
                },
                {
                  type: "warn",
                  en: "`placeholder` is a hint that VANISHES the moment typing starts. It can never replace the label — people forget what the box was for, and screen readers treat placeholders as unreliable. Label = the question. Placeholder = a whisper.",
                  fa: "`placeholder` راهنمایی است که «همان لحظه‌ای که تایپ شروع می‌شود ناپدید می‌شود». هرگز جایگزینِ label نمی‌شود — آدم‌ها یادشان می‌رود جعبه برای چه بود و صفحه‌خوان‌ها placeholder را غیرقابل‌اعتماد می‌دانند. label همان سؤال است. placeholder فقط یک نجوا است.",
                },
                {
                  type: "text",
                  en: "One more quiet hero: the `name` attribute. When the form is submitted, the data travels as pairs of `name=value` — `name='email'` is the ADDRESS your data lives at. An input without a name is luggage with no destination: whatever the user types gets lost.",
                  fa: "یک قهرمانِ بی‌سروصدا هم هست: ویژگیِ `name`. وقتی فرم ارسال می‌شود، داده‌ها به‌شکلِ جفت‌های `name=value` سفر می‌کنند — `name='email'` همان «نشانی» است که داده‌ات در آن زندگی می‌کند. اینپوتی بدونِ name چمدانی بدونِ مقصد است: هرچه کاربر تایپ کند، گم می‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Anatomy of one input</title>
  </head>
  <body>
    <form>
      <!-- label: the question -->
      <label for="email">Email address</label>
      <!-- type: behavior · id: the page-unique hook · name: the data's address -->
      <input type="email" id="email" name="email" placeholder="you@example.com">
      <!-- placeholder: a whisper, not the question -->
    </form>
  </body>
</html>`,
                  caption: {
                    en: "Four attributes, four jobs — read the comments, they map each one",
                    fa: "چهار ویژگی، چهار کار — کامنت‌ها را بخوان، هرکدام را نشان می‌دهند",
                  },
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "How does a label pair with its input?", fa: "لیبل چطور با اینپوتش جفت می‌شود؟" },
                  options: [
                    { en: "label's for matches the input's id", fa: "for لیبل با id اینپوت برابر می‌شود" },
                    { en: "label's for matches the input's name", fa: "for لیبل با name اینپوت برابر می‌شود" },
                    { en: "the label is placed inside the input", fa: "لیبل داخلِ اینپوت قرار می‌گیرد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "for + id is the handshake. name labels the data for submission; it plays no role in the pairing.",
                    fa: "for و id همان دست‌دادن هستند. name برچسبِ داده برای ارسال است و در جفت‌شدن نقشی ندارد.",
                  },
                },
                {
                  q: { en: "<input> is…", fa: "<input> …" },
                  options: [
                    { en: "a self-closing void tag — no closing pair", fa: "یک تگِ void خودبسته — بدونِ جفتِ پایانی" },
                    { en: "a container that needs </input>", fa: "یک ظرف که به </input> نیاز دارد" },
                    { en: "only valid inside a table", fa: "فقط داخلِ جدول معتبر است" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Input is void: all its meaning lives in attributes. There is no </input> in valid HTML.",
                    fa: "input از نوع void است: همه‌ی معنایش در ویژگی‌هاست. در HTMLِ معتبر اصلاً </input> وجود ندارد.",
                  },
                },
                {
                  q: { en: "What does name='email' on an input actually do?", fa: "name='email' روی اینپوت واقعاً چه می‌کند؟" },
                  options: [
                    { en: "Names the field's data when the form is submitted", fa: "داده‌ی فیلد را موقع ارسالِ فرم نام‌گذاری می‌کند" },
                    { en: "Styles the input's border", fa: "خطِ دورِ اینپوت را استایل می‌دهد" },
                    { en: "Shows gray hint text inside the box", fa: "متنِ راهنمای خاکستری داخلِ جعبه نشان می‌دهد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "On submit, data leaves as name=value pairs. Gray hint text is placeholder's job — styling is CSS's.",
                    fa: "موقع ارسال، داده به‌شکلِ جفت‌های name=value بیرون می‌رود. متنِ راهنمای خاکستری کارِ placeholder است — استایل هم کارِ CSS.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The name-tag form 🏷️", fa: "فرمِ نام‌نویسی 🏷️" },
              brief: {
                en: "Build a tiny club sign-up: a `form` containing a `label for='fullname'` (its text should contain the word name), an `input` with `id='fullname'` and `type='text'` and `name='fullname'`, and a `button` (any label — say Join). Wire the handshake: for matches id.",
                fa: "یک ثبت‌نامِ کوچکِ باشگاه بساز: یک `form` که داخلش یک `label for='fullname'` باشد (متنش کلمه‌ی name را داشته باشد)، یک `input` با `id='fullname'` و `type='text'` و `name='fullname'`، و یک `button` (هر برچسبی — مثلاً Join). دست‌دادن را وصل کن: for با id برابر باشد.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Name-tag form</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin-bottom: 4px; font-weight: bold; }
            input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { margin-top: 12px; padding: 10px 20px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <h1>Join the club ✍️</h1>
        <form>
            <!-- TODO 1) label with for="fullname", text containing "name" -->
            <!-- TODO 2) input id="fullname" type="text" name="fullname" -->
            <!-- TODO 3) a button, e.g. Join -->
        </form>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Name-tag form</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin-bottom: 4px; font-weight: bold; }
            input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { margin-top: 12px; padding: 10px 20px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <h1>Join the club ✍️</h1>
        <form>
            <label for="fullname">Your full name</label>
            <input type="text" id="fullname" name="fullname" placeholder="e.g. Aria Mohammadi">
            <button type="submit">Join</button>
        </form>
    </body>
</html>`,
              hints: [
                {
                  en: "The pair: <label for='fullname'>Your full name</label> right above <input type='text' id='fullname' name='fullname'>.",
                  fa: "جفت: <label for='fullname'>Your full name</label> درست بالای <input type='text' id='fullname' name='fullname'>.",
                },
                {
                  en: "Input is void — no closing tag. All four attributes sit on the one tag.",
                  fa: "input از نوع void است — تگِ پایانی ندارد. هر چهار ویژگی روی همان یک تگ می‌نشینند.",
                },
                {
                  en: "The button: <button type='submit'>Join</button> — inside the form, after the input.",
                  fa: "دکمه: <button type='submit'>Join</button> — داخلِ فرم، بعد از اینپوت.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "form", count: 1 },
                  { selector: "label[for='fullname']", count: 1 },
                  { selector: "input#fullname", count: 1 },
                  { selector: "input[type='text']", count: 1 },
                  { selector: "form button", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m10-l2",
          title: { en: "The type tour: email, password, radio, checkbox", fa: "تورِ تایپ‌ها: email و password و radio و checkbox" },
          goal: {
            en: "Pick the right input type for every question — and group radios so only one wins.",
            fa: "برای هر سؤال، تایپِ درستِ اینپوت را انتخاب کنی — و radioها را گروه کنی که فقط یکی ببرد.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "Same tag, different personalities", fa: "همان تگ، شخصیت‌های متفاوت" },
              blocks: [
                {
                  type: "text",
                  en: "`type` is the input's personality dial, and it changes THREE things at once: the on-screen keyboard (email gives you the @ key on phones), the validation (type='email' refuses to submit without a proper address), and the widget itself (date opens a real calendar). One attribute, a free UX upgrade.",
                  fa: "`type` پیچِ شخصیتِ اینپوت است و سه چیز را همزمان عوض می‌کند: کیبوردِ روی صفحه (email روی موبایل کلیدِ @ می‌آورد)، اعتبارسنجی (type='email' بدونِ آدرسِ درست اجازه‌ی ارسال نمی‌دهد)، و خودِ ویجت (date یک تقویمِ واقعی باز می‌کند). یک ویژگی، یک ارتقای رایگانِ تجربه‌ی کاربری.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Type tour</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      label { display: block; margin-bottom: 4px; font-weight: bold; }
      input { margin-bottom: 12px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
    </style>
  </head>
  <body>
    <form>
      <label for="mail">email — checks for @ on submit</label>
      <input type="email" id="mail" name="mail">
      <label for="pass">password — typed letters become dots</label>
      <input type="password" id="pass" name="pass">
      <label for="age">number — numeric keypad + arrows</label>
      <input type="number" id="age" name="age">
      <label for="day">date — opens a native calendar</label>
      <input type="date" id="day" name="day">
    </form>
  </body>
</html>`,
                  caption: {
                    en: "Five inputs, one tag — only type changes. Try submitting an email without @.",
                    fa: "پنج اینپوت، یک تگ — فقط type عوض می‌شود. یک ایمیلِ بدونِ @ ارسال کن و ببین.",
                  },
                },
                {
                  type: "tip",
                  en: "type='email' validation is free quality control: the browser blocks the submit and shows a bubble. You wrote zero lines of checking logic — the type did it.",
                  fa: "اعتبارسنجیِ type='email' کنترلِ کیفیتیِ مجانی است: مرورگر ارسال را قفل می‌کند و یک حبابِ خطا نشان می‌دهد. تو صفر خطِ منطقِ چک نوشتی — خودِ type انجامش داد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Choices: radio vs checkbox", fa: "انتخاب‌ها: radio در مقابلِ checkbox" },
              blocks: [
                {
                  type: "text",
                  en: "Two types handle choices. `checkbox` = many-of-many: toppings, interests, agreeing to terms. `radio` = one-of-many: size S/M/L, payment method. The magic that makes radios ONE group is a shared `name`: every radio with `name='size'` belongs to the same question, so picking one releases the others.",
                  fa: "دو تایپ انتخاب‌ها را مدیریت می‌کنند. `checkbox` = چندتا از چندتا: تاپینگ‌ها، علاقه‌مندی‌ها، قبولِ قوانین. `radio` = یکی از چندتا: سایزِ S/M/L، روشِ پرداخت. جادویی که radioها را «یک گروه» می‌کند `name` مشترک است: هر radio با `name='size'` عضوِ همان سؤال است، پس انتخابِ یکی، بقیه را رها می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Radio vs checkbox</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      fieldset { border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 12px; }
      legend { font-weight: bold; padding: 0 6px; }
      label { display: block; margin: 6px 0; }
    </style>
  </head>
  <body>
    <form>
      <fieldset>
        <legend>Size (pick ONE — shared name makes them a group)</legend>
        <label><input type="radio" name="size" value="s"> Small</label>
        <label><input type="radio" name="size" value="m" checked> Medium</label>
        <label><input type="radio" name="size" value="l"> Large</label>
      </fieldset>
      <fieldset>
        <legend>Extras (pick MANY — independent checkboxes)</legend>
        <label><input type="checkbox" name="extra" value="cheese"> Extra cheese</label>
        <label><input type="checkbox" name="extra" value="drink"> A drink</label>
      </fieldset>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "Radios share name='size' — choose one, the rest release. Checkboxes are loners.",
                    fa: "radioها name='size' مشترک دارند — یکی را انتخاب کن، بقیه آزاد می‌شوند. checkboxها تنهابازند.",
                  },
                },
                {
                  type: "warn",
                  en: "Radios WITHOUT a shared name are strangers: click all three, all three stay checked. If your 'pick one' question lets users pick three, the bug is a missing `name` — not a missing brain.",
                  fa: "radioهای بدونِ name مشترک غریبه‌اند: روی هر سه کلیک کن، هر سه تیک می‌خورند. اگر سؤالِ «فقط یکی انتخاب کن» بگذارد سه‌تا انتخاب شود، باگِ آن `name`ِ جاافتاده است — نه کمبودِ هوش.",
                },
                {
                  type: "tip",
                  en: "Tiny radio circles are thumb-hostile. Wrap each radio in its `<label>` (like the demo) — now the WORD is clickable too. Notice the second pattern: label WITHOUT for/id simply wraps the input.",
                  fa: "دایره‌های ریزِ radio با شست دشمن‌اند. هر radio را داخلِ `<label>` خودش بپیچان (مثل نمونه) — حالا «کلمه» هم کلیک‌شدنی است. الگوی دوم را ببین: label بدونِ for/id به‌سادگی اینپوت را در آغوش می‌گیرد.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which input type blocks submission until a real address is entered?", fa: "کدام تایپ، ارسال را تا وقتی آدرسِ واقعی وارد نشده قفل می‌کند؟" },
                  options: [
                    { en: "email", fa: "email" },
                    { en: "text", fa: "text" },
                    { en: "password", fa: "password" },
                  ],
                  answer: 0,
                  explain: {
                    en: "type='email' validates for @ on submit — free validation from the browser.",
                    fa: "type='email' موقع ارسال @ را چک می‌کند — اعتبارسنجیِ مجانی از مرورگر.",
                  },
                },
                {
                  q: { en: "Three radios must share which attribute to become ONE group?", fa: "سه radio باید کدام ویژگی را مشترک داشته باشند تا «یک گروه» شوند؟" },
                  options: [
                    { en: "name", fa: "name" },
                    { en: "id", fa: "id" },
                    { en: "class", fa: "class" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Shared name = one question. id must stay UNIQUE per element — sharing ids would break labels.",
                    fa: "name مشترک یعنی یک سؤال. id باید برای هر عنصر «یکتا» بماند — id مشترک لیبل‌ها را می‌شکند.",
                  },
                },
                {
                  q: { en: "Choosing 3 pizza toppings out of 8 is a job for…", fa: "انتخابِ ۳ تاپینگ از بینِ ۸ تاپینگ کارِ … است." },
                  options: [
                    { en: "checkboxes — many-of-many", fa: "checkboxها — چندتا از چندتا" },
                    { en: "radios — one-of-many", fa: "radioها — یکی از چندتا" },
                    { en: "one type='text' input", fa: "یک اینپوتِ type='text'" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Independent, stackable picks = checkbox. Forced single pick = radio.",
                    fa: "انتخاب‌های مستقل و انباشتی = checkbox. انتخابِ اجباریِ تکی = radio.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Sign-up skeleton 🦴", fa: "اسکلتِ ثبت‌نام 🦴" },
              brief: {
                en: "Build the sign-up bones: a `form` with — an `input type='email'` with a label; an `input type='password'` with a label; EXACTLY two radios sharing `name='plan'` (basic / pro), each with a label; one `input type='checkbox'` for the terms, with a label; and a `button`. Every control gets a label — five labels in total.",
                fa: "استخوان‌بندیِ ثبت‌نام را بساز: یک `form` با — یک `input type='email'` با لیبل؛ یک `input type='password'` با لیبل؛ دقیقاً دو radio با `name='plan'` مشترک (basic / pro) که هرکدام لیبل دارند؛ یک `input type='checkbox'` برای قوانین با لیبل؛ و یک `button`. هر کنترل یک لیبل — در مجموع پنج لیبل.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sign-up skeleton</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin: 8px 0 4px; font-weight: bold; }
            input[type="email"], input[type="password"] { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
        </style>
    </head>
    <body>
        <h1>Create account 🦴</h1>
        <form>
            <!-- TODO 1) label + input type="email" -->
            <!-- TODO 2) label + input type="password" -->
            <!-- TODO 3) two radios, both name="plan", each with a label -->
            <!-- TODO 4) one checkbox with a label (the terms) -->
            <!-- TODO 5) a submit button -->
        </form>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sign-up skeleton</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin: 8px 0 4px; font-weight: bold; }
            input[type="email"], input[type="password"] { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
        </style>
    </head>
    <body>
        <h1>Create account 🦴</h1>
        <form>
            <label for="mail">Email</label>
            <input type="email" id="mail" name="mail">
            <label for="pass">Password</label>
            <input type="password" id="pass" name="pass">
            <p>Pick a plan:</p>
            <label><input type="radio" name="plan" value="basic"> Basic — free</label>
            <label><input type="radio" name="plan" value="pro"> Pro — $5/mo</label>
            <label><input type="checkbox" name="terms"> I accept the terms</label>
            <button type="submit">Create account</button>
        </form>
    </body>
</html>`,
              hints: [
                {
                  en: "Email + password are plain inputs with a type each: <input type='email' id='mail' name='mail'> above its label pair.",
                  fa: "ایمیل و پسورد اینپوت‌های ساده‌ای با type خودشان‌اند: <input type='email' id='mail' name='mail'> به‌همراه جفتِ لیبلش.",
                },
                {
                  en: "The radio group: <label><input type='radio' name='plan' value='basic'> Basic</label> — same name on BOTH radios.",
                  fa: "گروهِ radio: <label><input type='radio' name='plan' value='basic'> Basic</label> — name مشترک روی «هر دو» radio.",
                },
                {
                  en: "Count the labels: email, password, basic, pro, terms = 5. Wrap or for/id — your call.",
                  fa: "لیبل‌ها را بشمار: email، password، basic، pro، terms = ۵. یا بپیچان یا for/id — انتخاب با خودت.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "input[type='email']", count: 1 },
                  { selector: "input[type='password']", count: 1 },
                  { selector: "input[name='plan']", count: 2 },
                  { selector: "input[type='checkbox']", count: 1 },
                  { selector: "form label", count: 5 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m10-l3",
          title: { en: "Selects, textareas and the submit button", fa: "منوی کشویی، textarea و دکمه‌ی ارسال" },
          goal: {
            en: "Add a dropdown, a multiline message box and a real submit button to your forms.",
            fa: "به فرم‌هایت منوی کشویی، جعبه‌ی پیامِ چندخطی و یک دکمه‌ی ارسالِ واقعی اضافه کنی.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "The dropdown: select + option", fa: "منوی کشویی: select و option" },
              blocks: [
                {
                  type: "text",
                  en: "When the choices are FIXED and there are more than three or four, a dropdown beats a pile of radios: `<select>` wraps one `<option>` per choice. The `value` attribute is what gets submitted; the option's text is what humans see. Without a `selected` attribute, the first option shows by default.",
                  fa: "وقتی انتخاب‌ها «ثابت»‌اند و از سه‌چهار تا بیشتر، منوی کشویی از تلهم radioها بهتر است: `<select>` برای هر انتخاب یک `<option>` می‌پیچد. ویژگیِ `value` چیزی است که ارسال می‌شود؛ متنِ option چیزی است که آدم‌ها می‌بینند. بدونِ `selected`، به‌طور پیش‌فرض گزینه‌ی اول نشان داده می‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Select</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      label { display: block; margin-bottom: 4px; font-weight: bold; }
      select, textarea { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; }
    </style>
  </head>
  <body>
    <form>
      <label for="topic">Topic</label>
      <select id="topic" name="topic">
        <option value="">Choose a topic…</option>
        <option value="bug">Bug report 🐛</option>
        <option value="idea" selected>Feature idea 💡</option>
        <option value="love">Just saying hi 💜</option>
      </select>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "First option is a fake placeholder with empty value — the real default is 'selected'",
                    fa: "گزینه‌ی اول یک placeholderِ قلابی با value خالی است — پیش‌فرضِ واقعی همان 'selected' است",
                  },
                },
                {
                  type: "tip",
                  en: "Pro pattern: a first option like <option value=''>Choose a topic…</option> — value is EMPTY, so if the user never picks, the submitted data is honestly empty instead of pretending they chose 'Bug report'.",
                  fa: "الگوی حرفه‌ای: گزینه‌ی اولی مثل <option value=''>Choose a topic…</option> — value «خالی» است، پس اگر کاربر هیچ‌وقت انتخاب نکند، داده‌ی ارسالی صادقانه خالی است؛ نه اینکه وانمود کند 'Bug report' را برگزیده.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Long text and the big button", fa: "متنِ بلند و دکمه‌ی بزرگ" },
              blocks: [
                {
                  type: "text",
                  en: "`input` is single-line by nature. For messages, reviews, feedback — anything that wraps — use `<textarea>`, the multiline box. `rows='4'` sets its visible height; `placeholder` works here too. And unlike input, textarea is NOT void: it opens and closes, and any text between its tags becomes its starting content.",
                  fa: "`input` ذاتاً تک‌خطی است. برای پیام، نقد، بازخورد — هرچیزی که می‌شکند و چندخطی می‌شود — از `<textarea>` استفاده کن، جعبه‌ی چندخطی. `rows='4'` ارتفاعِ قابل‌دیدنش را تعیین می‌کند؛ `placeholder` هم اینجا کار می‌کند. و برخلافِ input، تِکست‌اریا void «نیست»: باز و بسته می‌شود و هر متنی بینِ تگ‌هایش محتوای اولیه‌اش می‌شود.",
                },
                {
                  type: "text",
                  en: "The `button` is the conversation's period mark. Inside a form, `<button>` is `type='submit'` BY DEFAULT — pressing it (or Enter in any field) sends the form. Give buttons real text: 'Send feedback', not 'OK'. The button's label is the sentence that closes the deal.",
                  fa: "`button` نقطه‌ی پایانِ گفت‌وگوست. داخلِ فرم، `<button>` به‌طور پیش‌فرض `type='submit'` است — فشارش (یا زدنِ Enter در هر فیلدی) فرم را می‌فرستد. به دکمه‌ها متنِ واقعی بده: «Send feedback»، نه «OK». برچسبِ دکمه همان جمله‌ای است که معامله را می‌بندد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Feedback</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      label { display: block; margin: 10px 0 4px; font-weight: bold; }
      select, textarea { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; }
      textarea { width: 280px; }
      button { margin-top: 12px; padding: 10px 22px; border: 0; border-radius: 8px; background: #7c3aed; color: white; }
    </style>
  </head>
  <body>
    <form>
      <label for="topic">Topic</label>
      <select id="topic" name="topic">
        <option value="">Choose a topic…</option>
        <option value="bug">Bug report 🐛</option>
        <option value="idea">Feature idea 💡</option>
      </select>
      <label for="msg">Your message</label>
      <textarea id="msg" name="msg" rows="4" placeholder="Tell us everything…"></textarea>
      <button type="submit">Send feedback</button>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "The full small form: label → select, label → textarea, button closes it",
                    fa: "فرمِ کوچکِ کامل: لیبل → select، لیبل → textarea، و دکمه آن را می‌بندد",
                  },
                },
                {
                  type: "warn",
                  en: "Two button sins: (1) a button with only an emoji — screen readers announce nothing useful; (2) re-styling a `div` into a 'button' — it looks right but Enter ignores it. Real `<button>`, real words.",
                  fa: "دو گناهِ دکمه: (۱) دکمه‌ای که فقط ایموجی دارد — صفحه‌خوان هیچ چیزِ مفیدی اعلام نمی‌کند؛ (۲) مبدل‌کردنِ یک `div` به «دکمه» — ظاهرش درست است ولی Enter نادیده‌اش می‌گیرد. `<button>` واقعی، کلماتِ واقعی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Each choice inside a dropdown is…", fa: "هر انتخاب داخلِ منوی کشویی یک … است." },
                  options: [
                    { en: "<option> inside the <select>", fa: "<option> داخلِ <select>" },
                    { en: "<li> inside the <select>", fa: "<li> داخلِ <select>" },
                    { en: "<choice> inside the <select>", fa: "<choice> داخلِ <select>" },
                  ],
                  answer: 0,
                  explain: {
                    en: "select = the box, option = each choice. value is what's sent; the text is what's shown.",
                    fa: "select یعنی جعبه، option یعنی هر انتخاب. value همان است که ارسال می‌شود؛ متن همان است که دیده می‌شود.",
                  },
                },
                {
                  q: { en: "What does rows='4' on a textarea control?", fa: "rows='4' روی textarea چه را کنترل می‌کند؟" },
                  options: [
                    { en: "How many text lines are visible", fa: "چند خطِ متن دیده شود" },
                    { en: "The maximum characters allowed", fa: "حداکثرِ کاراکترهای مجاز" },
                    { en: "The font size", fa: "اندازه‌ی فونت" },
                  ],
                  answer: 0,
                  explain: {
                    en: "rows = visible height in lines. It can still scroll — rows is the window, not a limit.",
                    fa: "rows یعنی ارتفاعِ قابل‌دید بر حسبِ خط. هنوز می‌تواند اسکرول کند — rows پنجره است، نه سقف.",
                  },
                },
                {
                  q: { en: "A <button> inside a form defaults to…", fa: "یک <button> داخلِ فرم به‌طور پیش‌فرض … است." },
                  options: [
                    { en: "type='submit' — it sends the form", fa: "type='submit' — فرم را می‌فرستد" },
                    { en: "type='reset'", fa: "type='reset'" },
                    { en: "nothing — buttons are always dead", fa: "هیچ — دکمه‌ها همیشه مرده‌اند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Inside a form, plain <button> is submit. That is why Enter in a field also sends the form.",
                    fa: "داخلِ فرم، <button> ساده یعنی submit. برای همین Enter داخلِ فیلد هم فرم را می‌فرستد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The feedback machine 📮", fa: "ماشینِ بازخورد 📮" },
              brief: {
                en: "Build the feedback form: a `form` containing — a `label for='topic'` + a `select id='topic'` with EXACTLY three `<option>`s; a `label for='msg'` + a `<textarea id='msg'>` with a `rows` attribute and a placeholder; and a `button type='submit'` whose text contains the word send.",
                fa: "فرمِ بازخورد را بساز: یک `form` که داخلش — یک `label for='topic'` + یک `select id='topic'` با دقیقاً سه `<option>` باشد؛ یک `label for='msg'` + یک `<textarea id='msg'>` با ویژگیِ `rows` و یک placeholder؛ و یک `button type='submit'` که متنش کلمه‌ی send را داشته باشد.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Feedback machine</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin: 10px 0 4px; font-weight: bold; }
            select, textarea { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; }
            button { margin-top: 12px; padding: 10px 22px; border: 0; border-radius: 8px; background: #7c3aed; color: white; }
        </style>
    </head>
    <body>
        <h1>Talk to us 📮</h1>
        <form>
            <!-- TODO 1) label for="topic" + select id="topic" with exactly 3 options -->
            <!-- TODO 2) label for="msg" + textarea id="msg" rows + placeholder -->
            <!-- TODO 3) button type="submit", text contains "send" -->
        </form>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Feedback machine</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin: 10px 0 4px; font-weight: bold; }
            select, textarea { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; }
            button { margin-top: 12px; padding: 10px 22px; border: 0; border-radius: 8px; background: #7c3aed; color: white; }
        </style>
    </head>
    <body>
        <h1>Talk to us 📮</h1>
        <form>
            <label for="topic">Topic</label>
            <select id="topic" name="topic">
                <option value="">Choose a topic…</option>
                <option value="bug">Bug report 🐛</option>
                <option value="idea">Feature idea 💡</option>
            </select>
            <label for="msg">Your message</label>
            <textarea id="msg" name="msg" rows="4" placeholder="Tell us everything…"></textarea>
            <button type="submit">Send feedback</button>
        </form>
    </body>
</html>`,
              hints: [
                {
                  en: "Dropdown shape: <select id='topic' name='topic'> wrapping three <option> lines — first one value=''.",
                  fa: "شکلِ منو: <select id='topic' name='topic'> که سه خطِ <option> را می‌پیچد — اولی value=''.",
                },
                {
                  en: "The message box: <textarea id='msg' name='msg' rows='4' placeholder='Tell us everything…'></textarea> — it CLOSES.",
                  fa: "جعبه‌ی پیام: <textarea id='msg' name='msg' rows='4' placeholder='Tell us everything…'></textarea> — که «بسته می‌شود».",
                },
                {
                  en: "Button: <button type='submit'>Send feedback</button> — 'send' lives in the text.",
                  fa: "دکمه: <button type='submit'>Send feedback</button> — کلمه‌ی send در متنش زندگی می‌کند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "form select", count: 1 },
                  { selector: "select option", count: 3 },
                  { selector: "form textarea", count: 1 },
                  { selector: "button[type='submit']", text: "send" },
                  { selector: "form label", count: 2 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m10-l4",
          title: { en: "Mini-project: Pizza Order Form", fa: "مینی‌پروژه: فرمِ سفارشِ پیتزا" },
          goal: {
            en: "Assemble every control you know — text, radios, checkboxes, textarea, submit — into one order form.",
            fa: "همه‌ی کنترل‌هایی که می‌شناسی — متن و radio و checkbox و textarea و submit — را در یک فرمِ سفارش مونتاژ کنی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "fieldset & legend: grouping questions", fa: "fieldset و legend: گروه‌کردنِ سؤال‌ها" },
              blocks: [
                {
                  type: "text",
                  en: "Long forms read like a form when related questions live in a `fieldset` — a bordered box — crowned by a `legend`, its title. Radio groups ADORE fieldsets: the legend IS the question ('Size'), the radios are the answers. Screen readers announce the legend before each field inside, so context travels with every choice.",
                  fa: "فرم‌های بلند وقتی سؤال‌های مرتبط در یک `fieldset` زندگی کنند — یک جعبه‌ی خط‌دار — شبیه «فرم» می‌شوند که تاجش یک `legend` است، همان عنوانش. گروه‌های radio عاشقِ fieldset‌اند: legend همان «سؤال» است (Size) و radioها «جواب‌ها». صفحه‌خوان‌ها قبل از هر فیلدِ داخل، legend را اعلام می‌کنند؛ پس بافتِ سؤال همراهِ هر انتخاب سفر می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fieldset</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      fieldset { border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 12px; }
      legend { font-weight: bold; padding: 0 6px; }
      label { display: block; margin: 6px 0; }
    </style>
  </head>
  <body>
    <form>
      <fieldset>
        <legend>Size — pick one</legend>
        <label><input type="radio" name="size" value="s"> Small 🍕</label>
        <label><input type="radio" name="size" value="m"> Medium 🍕🍕</label>
        <label><input type="radio" name="size" value="l"> Large 🍕🍕🍕</label>
      </fieldset>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "The legend titles the group; the radios answer it — one name, one question",
                    fa: "legend به گروه عنوان می‌دهد؛ radioها جوابش هستند — یک name، یک سؤال",
                  },
                },
                {
                  type: "tip",
                  en: "Free context: with the radios inside the fieldset, a screen reader says 'Size — pick one, Small, radio button' — the user never hears a naked, context-free 'radio button'.",
                  fa: "بافتِ مجانی: وقتی radioها داخلِ fieldset باشند، صفحه‌خوان می‌گوید «Size — pick one، Small، دکمه‌ی radio» — کاربر هرگز یک «دکمه‌ی radio» برهنه و بی‌بافت نمی‌شنود.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The full order form, walked", fa: "فرمِ کاملِ سفارش، قدم‌به‌قدم" },
              blocks: [
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pizza order</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      label { display: block; margin: 10px 0 4px; font-weight: bold; }
      input[type="text"], textarea { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
      fieldset { border: 1px solid #cbd5e1; border-radius: 8px; margin: 12px 0; }
      legend { font-weight: bold; padding: 0 6px; }
      button { margin-top: 12px; padding: 12px 26px; border: 0; border-radius: 8px; background: #f97316; color: white; font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>Order a pizza 🍕</h1>
    <form>
      <label for="customer">Your name</label>
      <input type="text" id="customer" name="customer" placeholder="e.g. Aria">
      <fieldset>
        <legend>Size — pick one</legend>
        <label><input type="radio" name="size" value="s"> Small</label>
        <label><input type="radio" name="size" value="m" checked> Medium</label>
        <label><input type="radio" name="size" value="l"> Large</label>
      </fieldset>
      <fieldset>
        <legend>Extras — pick many</legend>
        <label><input type="checkbox" name="extra" value="cheese"> Extra cheese</label>
        <label><input type="checkbox" name="extra" value="mushroom"> Mushrooms</label>
      </fieldset>
      <label for="notes">Notes for the chef</label>
      <textarea id="notes" name="notes" rows="3" placeholder="Less salt, more basil…"></textarea>
      <button type="submit">Order now</button>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "Every control from this module, in cooking order — press Run and place an order",
                    fa: "همه‌ی کنترل‌های این ماژول، در ترتیبِ آشپزی — Run را بزن و سفارش بده",
                  },
                },
                {
                  type: "text",
                  en: "Build order for the challenge: contact question first (label + text input), then the two fieldsets (size radios, extras checkboxes), then the notes textarea, then the submit button. One control per line of thinking — and every control keeps its label handshake.",
                  fa: "ترتیبِ ساختنِ چالش: اول سؤالِ تماس (لیبل + اینپوتِ متنی)، بعد دو fieldset (radioهای سایز، checkboxهای اضافه‌ها)، بعد textareaِ یادداشت‌ها، و در آخر دکمه‌ی ارسال. هر خطِ فکر یک کنترل — و همه‌ی کنترل‌ها دست‌دادنِ لیبلشان را نگه می‌دارند.",
                },
                {
                  type: "warn",
                  en: "The graded bits here are structural: the radio count, the legend, the labeled customer field. Style freely — but do not delete a control while decorating.",
                  fa: "بخش‌های نمره‌ای اینجا ساختاری‌اند: تعدادِ radioها، legend، و فیلدِ لیبل‌دارِ مشتری. آزادانه استایل بده — ولی موقع آراستن، کنترلی را پاک نکن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "The title of a fieldset is written in…", fa: "عنوانِ یک fieldset در … نوشته می‌شود." },
                  options: [
                    { en: "<legend>", fa: "<legend>" },
                    { en: "<caption>", fa: "<caption>" },
                    { en: "<title>", fa: "<title>" },
                  ],
                  answer: 0,
                  explain: {
                    en: "legend titles the GROUP (fieldset). caption belongs to tables; title lives in the head.",
                    fa: "legend به «گروه» (fieldset) عنوان می‌دهد. caption مالِ جدول‌هاست؛ title هم در head زندگی می‌کند.",
                  },
                },
                {
                  q: { en: "Best structure for 'choose ONE size of three'?", fa: "بهترین ساختار برای «فقط یک سایز از سه‌تا انتخاب کن» چیست؟" },
                  options: [
                    { en: "three radios with a shared name, inside a fieldset with a legend", fa: "سه radio با name مشترک، داخلِ یک fieldset با legend" },
                    { en: "three independent checkboxes", fa: "سه checkboxِ مستقل" },
                    { en: "three type='text' inputs", fa: "سه اینپوتِ type='text'" },
                  ],
                  answer: 0,
                  explain: {
                    en: "One-of-many = radios + shared name; the fieldset+legend gives the group its question.",
                    fa: "یکی از چندتا = radioها + name مشترک؛ fieldset و legend هم به گروه سؤالش را می‌دهند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Pizza order form 🍕", fa: "فرمِ سفارشِ پیتزا 🍕" },
              brief: {
                en: "THE ORDER FORM. Build a `form` with: a `label for='customer'` + an `input id='customer'` with `type='text'`; a `fieldset` whose `legend` text contains the word size, holding EXACTLY three radios with `name='size'` (each inside a label); a second group with EXACTLY two `input type='checkbox'`; a `<textarea>`; and a `button type='submit'` whose text contains the word order.",
                fa: "فرمِ سفارش. یک `form` بساز با: یک `label for='customer'` + یک `input id='customer'` با `type='text'`؛ یک `fieldset` که متنِ `legend`اش کلمه‌ی size را دارد و دقیقاً سه radio با `name='size'` دارد (هرکدام داخلِ یک label)؛ یک گروهِ دوم با دقیقاً دو `input type='checkbox'`؛ یک `<textarea>`؛ و یک `button type='submit'` که متنش کلمه‌ی order را دارد.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pizza order form</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin: 10px 0 4px; font-weight: bold; }
            input[type="text"], textarea { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            fieldset { border: 1px solid #cbd5e1; border-radius: 8px; margin: 12px 0; }
            legend { font-weight: bold; padding: 0 6px; }
            button { margin-top: 12px; padding: 12px 26px; border: 0; border-radius: 8px; background: #f97316; color: white; font-size: 16px; }
        </style>
    </head>
    <body>
        <h1>Order a pizza 🍕</h1>
        <form>
            <!-- TODO 1) label for="customer" + input id="customer" type="text" -->
            <!-- TODO 2) fieldset with legend containing "size" + exactly 3 radios name="size", each in a label -->
            <!-- TODO 3) a group with exactly 2 checkboxes (each in a label) -->
            <!-- TODO 4) a textarea for notes -->
            <!-- TODO 5) button type="submit", text contains "order" -->
        </form>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pizza order form</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            label { display: block; margin: 10px 0 4px; font-weight: bold; }
            input[type="text"], textarea { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            fieldset { border: 1px solid #cbd5e1; border-radius: 8px; margin: 12px 0; }
            legend { font-weight: bold; padding: 0 6px; }
            button { margin-top: 12px; padding: 12px 26px; border: 0; border-radius: 8px; background: #f97316; color: white; font-size: 16px; }
        </style>
    </head>
    <body>
        <h1>Order a pizza 🍕</h1>
        <form>
            <label for="customer">Your name</label>
            <input type="text" id="customer" name="customer" placeholder="e.g. Aria">
            <fieldset>
                <legend>Size — pick one</legend>
                <label><input type="radio" name="size" value="s"> Small</label>
                <label><input type="radio" name="size" value="m" checked> Medium</label>
                <label><input type="radio" name="size" value="l"> Large</label>
            </fieldset>
            <fieldset>
                <legend>Extras — pick many</legend>
                <label><input type="checkbox" name="extra" value="cheese"> Extra cheese</label>
                <label><input type="checkbox" name="extra" value="mushroom"> Mushrooms</label>
            </fieldset>
            <label for="notes">Notes for the chef</label>
            <textarea id="notes" name="notes" rows="3" placeholder="Less salt, more basil…"></textarea>
            <button type="submit">Order now</button>
        </form>
    </body>
</html>`,
              hints: [
                {
                  en: "The size group: <fieldset><legend>Size — pick one</legend> + three <label><input type='radio' name='size' value='…'>…</label></fieldset>.",
                  fa: "گروهِ سایز: <fieldset><legend>Size — pick one</legend> + سه <label><input type='radio' name='size' value='…'>…</label></fieldset>.",
                },
                {
                  en: "The customer pair: <label for='customer'>Your name</label> + <input type='text' id='customer' name='customer'>.",
                  fa: "جفتِ مشتری: <label for='customer'>Your name</label> + <input type='text' id='customer' name='customer'>.",
                },
                {
                  en: "Count before Check: 3 radios (one name), 2 checkboxes, 1 textarea, 1 button with 'order' in its text.",
                  fa: "قبل از Check بشمار: ۳ radio (یک name)، ۲ checkbox، ۱ textarea، و ۱ دکمه که کلمه‌ی order در متنش باشد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "input#customer", count: 1 },
                  { selector: "fieldset legend", text: "size" },
                  { selector: "input[name='size']", count: 3 },
                  { selector: "input[type='checkbox']", count: 2 },
                  { selector: "form textarea", count: 1 },
                  { selector: "button[type='submit']", text: "order" },
                ],
              },
            },
          ],
        },
      ],
    },

    // ─── Module 11 ───────────────────────────────────────────
    {
      id: "html-m11",
      title: { en: "Media & Embeds", fa: "رسانه و جاسازی‌ها" },
      blurb: {
        en: "Images that adapt, native video and audio players, iframes — make pages rich and fast.",
        fa: "تصویرهایی که خودشان را وفق می‌دهند، پخش‌کننده‌های بومیِ ویدیو و صدا، iframe — صفحه‌ات را غنی و سریع کن.",
      },
      lessons: [
        {
          id: "html-m11-l1",
          title: { en: "img, pro edition: alt, srcset, loading", fa: "img در نسخه‌ی حرفه‌ای: alt و srcset و loading" },
          goal: {
            en: "Upgrade the plain <img> from Module 1 into a fast, accessible, responsive media element.",
            fa: "<img> ساده‌ی ماژول ۱ را به یک عنصرِ رسانه‌ایِ سریع و دسترس‌پذیر و واکنش‌گرا ارتقا بدهی.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "alt, the three modes", fa: "سه حالتِ alt" },
              blocks: [
                {
                  type: "text",
                  en: "You met `alt` in Module 1 as 'describe the picture'. The pro version knows THREE modes. Meaningful image? Write what it COMMUNICATES: alt='A hot margherita pizza with basil leaves' — the words someone needs if the image never loads. Purely decorative (a divider, a background flourish)? Write `alt=''` — EMPTY — and screen readers politely skip it. Filename as alt (`alt='IMG_2044.jpg'`)? That is a bug wearing a feature's clothes.",
                  fa: "`alt` را در ماژول ۱ به‌عنوان «تصویر را توصیف کن» دیدی. نسخه‌ی حرفه‌ای سه حالت دارد. تصویرِ بامعنا؟ بنویس چه چیزی را «منتقل می‌کند»: alt='A hot margherita pizza with basil leaves' — کلماتی که اگر تصویر بارگذاری نشود لازم است. تصویرِ صرفاً تزئینی (یک جداکننده، یک نقش‌ونگارِ پس‌زمینه)؟ بنویس `alt=''` — «خالی» — و صفحه‌خوان محترمانه ازش رد می‌شود. اسمِ فایل به‌جای alt (`alt='IMG_2044.jpg'`)؟ آن یک باگ است که لباسِ قابلیت پوشیده.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Alt modes</title>
  </head>
  <body>
    <h1>Alt, three ways</h1>
    <!-- 1) meaningful: describe what it communicates -->
    <img src="pizza.png" alt="A hot margherita pizza with basil leaves on a wooden board" width="300" height="200">
    <!-- 2) decorative: EMPTY alt — screen readers skip it -->
    <img src="divider.png" alt="" width="300" height="8">
    <!-- 3) broken: filename is not a description -->
    <img src="IMG_2044.jpg" alt="IMG_2044.jpg" width="300" height="200">
  </body>
</html>`,
                  caption: {
                    en: "Close your eyes and 'read' this page through the alts — number 2 vanishes, number 3 is noise",
                    fa: "چشمانت را ببند و این صفحه را فقط با altها 'بخوان' — شماره‌ی ۲ محو می‌شود، شماره‌ی ۳ فقط سر‌وصداست",
                  },
                },
                {
                  type: "tip",
                  en: "The blind test: hand your page to someone who only sees the alt texts. Could they sketch what matters? If yes, your alts are pro-grade.",
                  fa: "آزمونِ نابینا: صفحه‌ات را به کسی بده که فقط متنِ altها را می‌بیند. آیا می‌تواند مهم‌های صفحه را بکشد؟ اگر بله، altهایت در سطحِ حرفه‌ای‌اند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "width, height, loading, srcset", fa: "width و height و loading و srcset" },
              blocks: [
                {
                  type: "text",
                  en: "Three attributes turn a slow image into a fast one. `width` and `height` (in pixels) reserve the box BEFORE the file arrives — text below stops jumping when the image pops in. `loading='lazy'` tells the browser: don't download me until the reader scrolls near — perfect for galleries, skip it for the hero image at the top.",
                  fa: "سه ویژگی یک تصویرِ کند را تند می‌کنند. `width` و `height` (بر حسبِ پیکسل) «قبل از رسیدنِ فایل» جعبه را رزرو می‌کنند — متنِ پایین دیگر موقع ظاهرشدنِ تصویر نمی‌پرد. `loading='lazy'` به مرورگر می‌گوید: تا وقتی خواننده نزدیکم اسکرول نکرده، دانلودم نکن — برای گالری‌ها عالی است؛ برای تصویرِ هیروی بالای صفحه نه.",
                },
                {
                  type: "text",
                  en: "And the big one: `srcset`. It offers the SAME photo in several widths and lets the BROWSER choose by screen size: `srcset='cat-400.png 400w, cat-1200.png 1200w'`. A phone downloads the small file; a 4K monitor takes the big one. The `400w` suffix is a width descriptor — 'this file is 400 pixels wide'. It is a hint list, not a slideshow.",
                  fa: "و بزرگ‌ترین‌شان: `srcset`. همان عکس را در چند پهنا «پیشنهاد» می‌دهد و انتخاب را به «مرورگر» می‌سپارد تا بر اساسِ اندازه‌ی صفحه تصمیم بگیرد: `srcset='cat-400.png 400w, cat-1200.png 1200w'`. گوشی فایلِ کوچک را می‌گیرد؛ مانیتورِ 4K بزرگش را. پسوندِ `400w` توصیف‌گرِ پهناست — یعنی «این فایل ۴۰۰ پیکسل پهنا دارد». این یک لیستِ پیشنهاد است، نه اسلایدشو.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pro img</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      figure { margin: 0; }
      img { max-width: 100%; border-radius: 12px; }
      figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
    </style>
  </head>
  <body>
    <figure>
      <img
        src="ninja-cat-800.png"
        srcset="ninja-cat-400.png 400w, ninja-cat-800.png 800w, ninja-cat-1600.png 1600w"
        sizes="(max-width: 600px) 400px, 800px"
        alt="A cat in a black ninja hood, mid-leap across a rooftop at sunset"
        width="800" height="500"
        loading="lazy">
      <figcaption>The dojo's mascot, caught mid-training 🐱‍👤</figcaption>
    </figure>
  </body>
</html>`,
                  caption: {
                    en: "The full pro <img> — sandbox files are placeholders; in real life they exist. The ATTRIBUTES are the lesson.",
                    fa: "همان <img> حرفه‌ایِ کامل — فایل‌ها در سندباکس جای‌نگه‌دارند؛ در دنیای واقعی موجودند. «ویژگی‌ها» درسِ ما هستند.",
                  },
                },
                {
                  type: "warn",
                  en: "srcset picks ONE image for the CURRENT screen — it is not a carousel and it never cycles. And it needs the SAME picture at different sizes; two different photos in srcset will confuse more than it helps.",
                  fa: "srcset برای صفحه‌ی «فعلی» فقط «یک» تصویر انتخاب می‌کند — نه کاروسل است و هرگز نمی‌چرخد. و به همان عکس در اندازه‌های مختلف نیاز دارد؛ دو عکسِ متفاوت در srcset بیشتر گیج می‌کند تا کمک.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "A purely decorative divider image should have…", fa: "یک تصویرِ جداکننده که فقط تزئینی است باید … داشته باشد." },
                  options: [
                    { en: "alt='' — empty, so screen readers skip it", fa: "alt='' — خالی، تا صفحه‌خوان ازش رد شود" },
                    { en: "alt='decoration'", fa: "alt='decoration'" },
                    { en: "no alt attribute at all", fa: "اصلاً ویژگیِ alt نداشته باشد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Empty alt = 'I am decoration, announce nothing'. A MISSING alt makes screen readers guess — often they read the filename.",
                    fa: "alt خالی یعنی «من تزئینم، چیزی اعلام نکن». نبودِ alt باعث می‌شود صفحه‌خوان حدس بزند — معمولاً اسمِ فایل را می‌خواند.",
                  },
                },
                {
                  q: { en: "loading='lazy' does…", fa: "loading='lazy' چه می‌کند…" },
                  options: [
                    { en: "defers downloading until the reader scrolls near the image", fa: "دانلود را تا وقتی خواننده نزدیکِ تصویر اسکرول نکرده به تعویق می‌اندازد" },
                    { en: "converts the image to grayscale", fa: "تصویر را سیاه‌وسفید می‌کند" },
                    { en: "compresses the file on the server", fa: "فایل را روی سرور فشرده می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Lazy loading saves data and speeds first paint. Hero images at the top of the page should NOT be lazy.",
                    fa: "لودِ تنبل داده ذخیره می‌کند و اولین نقاشیِ صفحه را سریع می‌کند. تصویرهای هیروی بالای صفحه نباید lazy باشند.",
                  },
                },
                {
                  q: { en: "srcset='cat-400.png 400w, cat-1200.png 1200w' means…", fa: "srcset='cat-400.png 400w, cat-1200.png 1200w' یعنی…" },
                  options: [
                    { en: "the browser picks one file based on the screen size", fa: "مرورگر بر اساسِ اندازه‌ی صفحه یکی از فایل‌ها را انتخاب می‌کند" },
                    { en: "two images show side by side", fa: "دو تصویر کنارِ هم نشان داده می‌شوند" },
                    { en: "the images cycle like a slideshow", fa: "تصویرها مثل اسلایدشو می‌چرخند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "srcset = a menu of sizes; the browser orders the right dish. One image, chosen smartly.",
                    fa: "srcset = منویی از اندازه‌ها؛ مرورگر غذای درست را سفارش می‌دهد. یک تصویر، انتخاب‌شده به‌شکلِ هوشمند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The lazy hero 🖼️", fa: "هیروی تنبل 🖼️" },
              brief: {
                en: "Build a pro media block: a `figure` wrapping an `img` + a `figcaption`. The img must carry ALL of: a real-words `alt`, `width` and `height` attributes, `loading='lazy'`, a `srcset` with two entries, and a plain `src` fallback. Any images you like.",
                fa: "یک بلوکِ رسانه‌ایِ حرفه‌ای بساز: یک `figure` که `img` + `figcaption` را می‌پیچد. img باید «همه‌ی» این‌ها را داشته باشد: یک `alt` با کلماتِ واقعی، ویژگی‌های `width` و `height`، `loading='lazy'`، یک `srcset` با دو مدخل، و یک `src` ساده به‌عنوانِ جایگزین. تصویرها هر چه خواستی.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Lazy hero</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            figure { margin: 0; }
            img { max-width: 100%; border-radius: 12px; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>Rooftop dojo 🥷</h1>
        <!-- TODO: <figure> wrapping an img + figcaption -->
        <!-- img needs: src, srcset (two entries), alt (real words), width, height, loading="lazy" -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Lazy hero</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            figure { margin: 0; }
            img { max-width: 100%; border-radius: 12px; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>Rooftop dojo 🥷</h1>
        <figure>
            <img
                src="ninja-cat-800.png"
                srcset="ninja-cat-400.png 400w, ninja-cat-1600.png 1600w"
                alt="A cat in a black ninja hood, mid-leap across a rooftop at sunset"
                width="800" height="500"
                loading="lazy">
            <figcaption>The dojo's mascot, caught mid-training 🐱‍👤</figcaption>
        </figure>
    </body>
</html>`,
              hints: [
                {
                  en: "The attribute stack on one img: src → srcset → alt → width/height → loading='lazy'. Order on the tag does not matter; PRESENCE does.",
                  fa: "پشته‌ی ویژگی‌ها روی یک img: src → srcset → alt → width/height → loading='lazy'. ترتیب روی تگ مهم نیست؛ «بودنشان» مهم است.",
                },
                {
                  en: "srcset shape: srcset='cat-400.png 400w, cat-1600.png 1600w' — file, space, width-descriptor, comma, repeat.",
                  fa: "شکلِ srcset: srcset='cat-400.png 400w, cat-1600.png 1600w' — فایل، فاصله، توصیف‌گرِ پهنا، ویرگول، تکرار.",
                },
                {
                  en: "figcaption sits AFTER the img, still inside the figure.",
                  fa: "figcaption بعد از img می‌نشیند، هنوز داخلِ figure.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "figure img", count: 1 },
                  { selector: "img[alt]", count: 1 },
                  { selector: "img[loading='lazy']", count: 1 },
                  { selector: "img[srcset]", count: 1 },
                  { selector: "img[width]", count: 1 },
                  { selector: "figcaption", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m11-l2",
          title: { en: "Video & audio: the native players", fa: "video و audio؛ پخش‌کننده‌های بومی" },
          goal: {
            en: "Embed video and audio with the native players — controls, sources and the politeness rules.",
            fa: "ویدیو و صدا را با پخش‌کننده‌های بومی جا بدهی — controls و sourceها و قواعدِ ادب.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "One tag, a full player", fa: "یک تگ، یک پخش‌کننده‌ی کامل" },
              blocks: [
                {
                  type: "text",
                  en: "No plugins, no widgets to install: `<video controls src='clip.mp4'></video>` gives you a real player — play, pause, seek, volume, fullscreen — drawn by the BROWSER. The `controls` attribute is a boolean: its PRESENCE turns the UI on. `width` sizes the stage, and any text between the tags shows only in ancient browsers as a fallback.",
                  fa: "نه پلاگین، نه ویجت برای نصب: `<video controls src='clip.mp4'></video>` یک پخش‌کننده‌ی واقعی می‌دهد — پخش، توقف، جابه‌جایی، صدا، تمام‌صفحه — که خودِ «مرورگر» می‌کشدش. ویژگیِ `controls` بولی است: «بودنش» رابطِ کاربری را روشن می‌کند. `width` صحنه را اندازه می‌کند و متنی که بینِ تگ‌ها می‌نویسی فقط در مرورگرهای باستانی به‌عنوانِ جایگزین نشان داده می‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Video</title>
  </head>
  <body>
    <h1>Launch day 🚀</h1>
    <video controls width="480" poster="launch-cover.png">
      <source src="launch.webm" type="video/webm">
      <source src="launch.mp4" type="video/mp4">
      Your browser does not support embedded video.
    </video>
  </body>
</html>`,
                  caption: {
                    en: "Two <source> children: the browser takes the FIRST format it can play",
                    fa: "دو بچه‌ی <source>: مرورگر اولین فرمتی که بتواند پخش کند را برمی‌دارد",
                  },
                },
                {
                  type: "text",
                  en: "The nested `<source>` children replace src on the tag: list your formats best-first (`webm` before `mp4`) and the browser picks the first it understands. `audio` works identically — same controls, same source children, just no stage.",
                  fa: "بچه‌های `<source>` جای src روی تگ را می‌گیرند: فرمت‌ها را از بهترین شروع کن (`webm` قبل از `mp4`) و مرورگر اولین فرمتی که می‌فهمد را برمی‌دارد. `audio` دقیقاً همین‌طور کار می‌کند — همان controls، همان بچه‌های source، فقط بدونِ صحنه.",
                },
                {
                  type: "tip",
                  en: "In this sandbox the media files are placeholders — the player box shows but stays black. In real life you point src at real files. The TAGS, attributes and structure are what you are learning here.",
                  fa: "در این سندباکس فایل‌های رسانه جای‌نگه‌دارند — جعبه‌ی پخش‌کننده می‌آید ولی سیاه می‌ماند. در دنیای واقعی src را به فایل‌های واقعی اشاره می‌دهی. چیزی که اینجا یاد می‌گیری «تگ‌ها» و ویژگی‌ها و ساختار است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "poster, autoplay and politeness", fa: "poster و autoplay و قواعدِ ادب" },
              blocks: [
                {
                  type: "text",
                  en: "`poster='cover.png'` is the thumbnail shown BEFORE the user presses play — your video's book cover. `muted` starts the video silent. `loop` replays forever. `autoplay` tries to start automatically, and here is the rule the whole web lives by: browsers only HONOR autoplay when the video is also `muted`. Sound without consent is the web's most-hated feature.",
                  fa: "`poster='cover.png` جلدِ کتابِ ویدیوی توست: تصویری که «قبل از» زدنِ play نشان داده می‌شود. `muted` ویدیو را بی‌صدا شروع می‌کند. `loop` برای همیشه تکرار می‌کند. `autoplay` تلاش می‌کند خودش شروع کند و اینجا قاعده‌ای که کلِ وب به آن پایبند است: مرورگرها autoplay را فقط وقتی محترم می‌شمارند که ویدیو `muted` هم باشد. صدا بدونِ اجازه، منفورترین قابلیتِ وب است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Polite media</title>
  </head>
  <body>
    <h1>Podcast & clip 🎧</h1>
    <!-- ambient loop: muted + autoplay + loop — the only honored combo -->
    <video muted autoplay loop width="320" poster="rain-cover.png">
      <source src="rain.webm" type="video/webm">
    </video>
    <!-- audio: same anatomy, smaller box -->
    <audio controls>
      <source src="episode-01.mp3" type="audio/mpeg">
      Your browser does not support embedded audio.
    </audio>
  </body>
</html>`,
                  caption: {
                    en: "Ambient video = muted+autoplay+loop; the podcast stays patient until its controls are pressed",
                    fa: "ویدیوی محیطی = muted+autoplay+loop؛ پادکست هم صبور می‌ماند تا controlsاش را بزنند",
                  },
                },
                {
                  type: "warn",
                  en: "Design as if autoplay is ALWAYS muted: if your message needs sound to make sense, you don't have a design — you have a noise complaint waiting to happen.",
                  fa: "طراحی کن انگار autoplay «همیشه» بی‌صدا است: اگر پیامت برای فهمیده‌شدن به صدا نیاز دارد، طراحی نداری — یک شکایتِ سروصدا در راه است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which attribute draws the play/pause/volume UI?", fa: "کدام ویژگی رابطِ play/pause/volume را می‌کشد؟" },
                  options: [
                    { en: "controls", fa: "controls" },
                    { en: "autoplay", fa: "autoplay" },
                    { en: "poster", fa: "poster" },
                  ],
                  answer: 0,
                  explain: {
                    en: "controls is a boolean attribute — present means the browser's native player UI shows.",
                    fa: "controls یک ویژگیِ بولی است — بودنش یعنی رابطِ پخش‌کننده‌ی بومیِ مرورگر نشان داده شود.",
                  },
                },
                {
                  q: { en: "Which autoplay combo do modern browsers actually honor?", fa: "کدام ترکیبِ autoplay را مرورگرهای مدرن واقعاً محترم می‌شمارند؟" },
                  options: [
                    { en: "autoplay + muted", fa: "autoplay + muted" },
                    { en: "autoplay with sound", fa: "autoplay با صدا" },
                    { en: "autoplay + loud volume", fa: "autoplay + صدای بلند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Silent autoplay is allowed; audible autoplay is blocked. That is why background loops are always muted.",
                    fa: "autoplayِ بی‌صدا مجاز است؛ autoplayِ صدا دار قفل می‌شود. برای همین لوپ‌های پس‌زمینه همیشه muted هستند.",
                  },
                },
                {
                  q: { en: "poster is…", fa: "poster همان … است." },
                  options: [
                    { en: "the thumbnail shown before play", fa: "تصویری که قبل از پخش نشان داده می‌شود" },
                    { en: "the video's file format", fa: "فرمتِ فایلِ ویدیو" },
                    { en: "the volume level", fa: "سطحِ صدا" },
                  ],
                  answer: 0,
                  explain: {
                    en: "poster = the pre-play cover image. Without it the player shows the first video frame or black.",
                    fa: "poster یعنی تصویرِ جلدِ قبل از پخش. بدونِ آن پخش‌کننده اولین فریمِ ویدیو یا سیاهی را نشان می‌دهد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The media shelf 🎬", fa: "قفسه‌ی رسانه 🎬" },
              brief: {
                en: "Build a media shelf: an `<h2>` with the word trailer; a `<video controls>` that ALSO carries a `poster` attribute and contains EXACTLY two nested `<source>` children (two formats); below it, an `<audio controls>` containing one `<source>`. No styling required — structure is the grade.",
                fa: "یک قفسه‌ی رسانه بساز: یک `<h2>` که کلمه‌ی trailer را دارد؛ یک `<video controls>` که «همچنین» ویژگیِ `poster` دارد و دقیقاً دو بچه‌ی `<source>` تودرتو دارد (دو فرمت)؛ و زیرش یک `<audio controls>` که یک `<source>` دارد. استایل لازم نیست — نمره با ساختار است.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Media shelf</title>
    </head>
    <body>
        <h1>Nimbus Notes — press kit 📼</h1>
        <!-- TODO 1) h2 containing "trailer" -->
        <!-- TODO 2) video with controls + poster + two nested <source> children -->
        <!-- TODO 3) audio with controls + one nested <source> -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Media shelf</title>
    </head>
    <body>
        <h1>Nimbus Notes — press kit 📼</h1>
        <h2>Official trailer</h2>
        <video controls width="480" poster="trailer-cover.png">
            <source src="trailer.webm" type="video/webm">
            <source src="trailer.mp4" type="video/mp4">
            Your browser does not support embedded video.
        </video>
        <h2>Podcast interview</h2>
        <audio controls>
            <source src="interview.mp3" type="audio/mpeg">
            Your browser does not support embedded audio.
        </audio>
    </body>
</html>`,
              hints: [
                {
                  en: "Video skeleton: <video controls poster='cover.png'> <source src='a.webm' type='video/webm'> <source src='a.mp4' type='video/mp4'> </video>.",
                  fa: "اسکلتِ ویدیو: <video controls poster='cover.png'> <source src='a.webm' type='video/webm'> <source src='a.mp4' type='video/mp4'> </video>.",
                },
                {
                  en: "Audio skeleton: <audio controls> <source src='talk.mp3' type='audio/mpeg'> </audio>.",
                  fa: "اسکلتِ صدا: <audio controls> <source src='talk.mp3' type='audio/mpeg'> </audio>.",
                },
                {
                  en: "controls is a bare word — no equals sign needed. poster takes the cover file.",
                  fa: "controls یک کلمه‌ی لخت است — علامتِ مساوی نمی‌خواهد. poster فایلِ جلد را می‌گیرد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "video[controls]", count: 1 },
                  { selector: "video[poster]", count: 1 },
                  { selector: "video source", count: 2 },
                  { selector: "audio[controls]", count: 1 },
                  { selector: "audio source", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m11-l3",
          title: { en: "iframe: a window into another page", fa: "iframe؛ پنجره‌ای به صفحه‌ای دیگر" },
          goal: {
            en: "Embed other pages — maps, players, docs — safely and accessibly with iframe.",
            fa: "صفحه‌های دیگر — نقشه، پخش‌کننده، سند — را با iframe امن و دسترس‌پذیر جا بدهی.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              title: { en: "Borrowed real estate", fa: "ملکِ قرضی" },
              blocks: [
                {
                  type: "text",
                  en: "An `<iframe>` is a window cut into your page showing ANOTHER document: a Google Map, a YouTube player, a live chart. `src` is the embedded page's address, `width`/`height` size the window. YouTube and Google Maps hand you ready-made iframe snippets — your job is to adjust size and add the attributes they forget.",
                  fa: "`<iframe>` پنجره‌ای است که در صفحه‌ات می‌بُری و «سندِ دیگری» را نشان می‌دهد: نقشه‌ی گوگل، پخش‌کننده‌ی یوتیوب، نمودارِ زنده. `src` نشانیِ صفحه‌ی جاسازی‌شده است و `width`/`height` پنجره را اندازه می‌کنند. یوتیوب و گوگل‌مپ snippetهای آماده‌ی iframe به تو می‌دهند — کارِ تو این است که اندازه را تنظیم کنی و ویژگی‌هایی که آنها فراموش می‌کنند را اضافه کنی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>iframe</title>
  </head>
  <body>
    <h1>Find the dojo 📍</h1>
    <iframe
        src="https://example.com/map"
        title="Map showing the Rooftop Dojo location"
        width="400" height="300"
        loading="lazy">
    </iframe>
  </body>
</html>`,
                  caption: {
                    en: "src = what to show, title = how to announce it, width/height = how big",
                    fa: "src = چه چیزی نشان بده، title = چطور اعلامش کن، width/height = چقدر بزرگ",
                  },
                },
                {
                  type: "text",
                  en: "`title` on an iframe is accessibility gold: screen readers announce the FRAME by its title — 'Map showing the Rooftop Dojo location' — instead of a mysterious 'frame'. And `loading='lazy'` works on iframes too: far-down embeds wait their turn.",
                  fa: "`title` روی iframe طلاست: صفحه‌خوان «فریم» را با عنوانش اعلام می‌کند — «نقشه‌ی مکانِ Rooftop Dojo» — به‌جای یک «فریم» مرموز. و `loading='lazy'` روی iframe هم کار می‌کند: جاسازی‌های پایینِ صفحه نوبتشان را صبر می‌کنند.",
                },
                {
                  type: "tip",
                  en: "Give iframes rounded corners to blend into your design: style='border-radius: 12px' — frames are boxes like any other.",
                  fa: "به iframeها گوشه‌ی گرد بده تا با طراحی‌ات بیامیزند: style='border-radius: 12px' — فریم‌ها هم جعبه‌اند مثل بقیه.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Politeness and security", fa: "ادب و امنیت" },
              blocks: [
                {
                  type: "warn",
                  en: "If an iframe stays blank, the target site probably REFUSES embedding — banks, some socials and many news sites send an X-Frame-Options header meaning 'don't frame me'. A blank frame is not your bug; pick a different source.",
                  fa: "اگر یک iframe سفید ماند، احتمالاً سایتِ مقصد «اجازه‌ی جاسازی نمی‌دهد» — بانک‌ها، بعضی شبکه‌های اجتماعی و خیلی از سایت‌های خبری هدرِ X-Frame-Options را می‌فرستند که یعنی «من را فریم نکن». فریمِ سفید باگِ تو نیست؛ یک منبعِ دیگر پیدا کن.",
                },
                {
                  type: "text",
                  en: "Trust matters: a framed page RUNS inside your page — its code can read nothing of yours (frames are walled), but it still loads, spends the visitor's data, and wears your page's reputation. Embed services you'd sign your name under. For extra caution, the `sandbox` attribute strips the frame's powers down (no forms, no scripts) — paranoia mode exists when you need it.",
                  fa: "اعتماد مهم است: صفحه‌ی فریم‌شده «داخلِ» صفحه‌ات اجرا می‌شود — کدش هیچ‌چیزِ تو را نمی‌بیند (فریم‌ها دیوار دارند) ولی همچنان بارگذاری می‌شود، داده‌ی بازدیدکننده را می‌خورد و اعتبارِ صفحه‌ات را می‌پوشد. خدماتی را جاسازی کن که حاضری زیرِ اسمشان امضا بزنی. برای احتیاطِ بیشتر، ویژگیِ `sandbox` قدرت‌های فریم را می‌بُرد (بدونِ فرم، بدونِ اسکریپت) — حالتِ بدگمانی برای وقتی که لازمش داری وجود دارد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Embed wall</title>
  </head>
  <body>
    <h1>The embed wall 🧱</h1>
    <iframe
        src="https://example.com/player"
        title="Episode player — season 2"
        width="480" height="270"
        loading="lazy">
    </iframe>
    <iframe
        src="https://example.com/map"
        title="Map to the venue"
        width="480" height="270"
        style="width: 100%; border-radius: 12px;"
        loading="lazy">
    </iframe>
  </body>
</html>`,
                  caption: {
                    en: "Two frames, both titled, both lazy — the second stretches full-width",
                    fa: "دو فریم، هر دو با title، هر دو lazy — دومی تمام‌پهنا کشیده شده",
                  },
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does the src attribute on an iframe hold?", fa: "ویژگیِ src روی iframe چه را نگه می‌دارد؟" },
                  options: [
                    { en: "The address of the embedded page", fa: "نشانیِ صفحه‌ای که جاسازی می‌شود" },
                    { en: "Your page's own URL", fa: "URL خودِ صفحه‌ات" },
                    { en: "A video file format", fa: "یک فرمتِ فایلِ ویدیویی" },
                  ],
                  answer: 0,
                  explain: {
                    en: "src points at the OTHER document — the one you are borrowing real estate from.",
                    fa: "src به «سندِ دیگر» اشاره می‌کند — همان که ازش ملک قرض می‌گیری.",
                  },
                },
                {
                  q: { en: "Why put title on an iframe?", fa: "چرا روی iframe بگذاریم؟" },
                  options: [
                    { en: "Screen readers announce the frame by its title", fa: "صفحه‌خوان فریم را با عنوانش اعلام می‌کند" },
                    { en: "It makes the iframe load faster", fa: "iframe را سریع‌تر بارگذاری می‌کند" },
                    { en: "It changes the frame's border color", fa: "رنگِ خطِ دورِ فریم را عوض می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "title names the frame for assistive tech — 'Episode player' instead of a bare 'frame'.",
                    fa: "title فریم را برای فناوری‌های یاری نام‌گذاری می‌کند — «پخش‌کننده‌ی قسمت» به‌جای یک «فریم» لخت.",
                  },
                },
                {
                  q: { en: "An iframe shows blank. Most likely cause?", fa: "یک iframe سفید نشان می‌دهد. محتمل‌ترین دلیل؟" },
                  options: [
                    { en: "The target site refuses to be embedded", fa: "سایتِ مقصد جاسازی را رد می‌کند" },
                    { en: "Your HTML has a typo in <iframe>", fa: "HTMLات غلطِ تایپی در <iframe> دارد" },
                    { en: "The internet is slow", fa: "اینترنت کند است" },
                  ],
                  answer: 0,
                  explain: {
                    en: "X-Frame-Options and friends let big sites say 'don't frame me' — blank frame, no error of yours.",
                    fa: "X-Frame-Options و دوستانش به سایت‌های بزرگ اجازه می‌دهند بگویند «من را فریم نکن» — فریمِ سفید، بدونِ هیچ خطایی از طرفِ تو.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The embed wall 🧱", fa: "دیوارِ جاسازی 🧱" },
              brief: {
                en: "Build the embed wall: EXACTLY two `<iframe>`s. BOTH carry a descriptive `title` attribute, a `width` attribute, and `loading='lazy'`. The SECOND iframe gets `style='width: 100%'` so it stretches full-width. (Blank previews in the sandbox are fine — real embed URLs only work live.)",
                fa: "دیوارِ جاسازی را بساز: دقیقاً دو `<iframe>`. «هر دو» یک `title` توصیفی دارند، یک ویژگیِ `width` دارند و `loading='lazy'`. iframeِ «دوم» `style='width: 100%'` می‌گیرد تا تمام‌پهنا کشیده شود. (پیش‌نمایشِ سفید در سندباکس اشکالی ندارد — URLهای واقعی فقط زنده کار می‌کنند.)",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Embed wall</title>
    </head>
    <body>
        <h1>Episode 12 — media kit 🧱</h1>
        <!-- TODO 1) iframe: src, title, width, loading="lazy" -->
        <!-- TODO 2) second iframe, same attrs + style="width: 100%" -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Embed wall</title>
    </head>
    <body>
        <h1>Episode 12 — media kit 🧱</h1>
        <iframe
            src="https://example.com/player"
            title="Episode player — season 2"
            width="480" height="270"
            loading="lazy">
        </iframe>
        <iframe
            src="https://example.com/map"
            title="Map to the venue"
            width="480" height="270"
            style="width: 100%; border-radius: 12px;"
            loading="lazy">
        </iframe>
    </body>
</html>`,
              hints: [
                {
                  en: "Frame one: <iframe src='…' title='Episode player' width='480' height='270' loading='lazy'></iframe>.",
                  fa: "فریمِ اول: <iframe src='…' title='Episode player' width='480' height='270' loading='lazy'></iframe>.",
                },
                {
                  en: "Both frames need BOTH title and loading='lazy' — the checker looks at every iframe.",
                  fa: "هر دو فریم هم title می‌خواهند هم loading='lazy' — چکر به همه‌ی iframeها نگاه می‌کند.",
                },
                {
                  en: "Full-width: style='width: 100%' on the second iframe — write the declaration exactly like that.",
                  fa: "تمام‌پهنا: style='width: 100%' روی iframeِ دوم — اعلامیه را دقیقاً همین‌طور بنویس.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "iframe", count: 2 },
                  { selector: "iframe[title]", count: 2 },
                  { selector: "iframe[width]", count: 2 },
                  { selector: "iframe", attrName: "loading", attrValue: "lazy" },
                  { selector: "iframe", styleIncludes: "width: 100%" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m11-l4",
          title: { en: "Mini-project: Media Gallery", fa: "مینی‌پروژه: گالریِ رسانه" },
          goal: {
            en: "Assemble figures, captions, lazy images and a video into one styled gallery wall.",
            fa: "figureها و کپشن‌ها و تصویرهای lazy و یک ویدیو را در یک دیوارِ گالریِ استایل‌دار مونتاژ کنی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "figure & figcaption, revisited", fa: "figure و figcaption، دوباره" },
              blocks: [
                {
                  type: "text",
                  en: "Media + its caption = `figure` + `figcaption` — the pair you met in the lazy-hero lesson. The beautiful part: figure is not just for images. A video with its caption, an audio episode with its title, even a table with its explanation — all travel as one `figure` unit.",
                  fa: "رسانه + کپشنش = `figure` + `figcaption` — همان جفتی که در درسِ هیروی تنبل دیدی. زیبایی‌اش این است: figure فقط برای عکس نیست. ویدیو با کپشنش، قسمتِ پادکست با عنوانش، حتی جدول با توضیحش — همه به‌عنوانِ یک واحدِ `figure` سفر می‌کنند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Figure for everything</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      figure { margin: 0 0 16px; }
      img, video { width: 100%; max-width: 420px; border-radius: 12px; display: block; }
      figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
    </style>
  </head>
  <body>
    <figure>
      <img src="studio-800.png" alt="The Teka studio desk with two monitors and a microphone"
           width="800" height="500" loading="lazy">
      <figcaption>Where episode 12 was recorded.</figcaption>
    </figure>
    <figure>
      <video controls width="420" poster="ep12-cover.png">
        <source src="ep12.webm" type="video/webm">
      </video>
      <figcaption>Episode 12 — building the academy.</figcaption>
    </figure>
  </body>
</html>`,
                  caption: {
                    en: "Same wrapper, two media types — figure does not care what's inside",
                    fa: "همان پیچاننده، دو نوعِ رسانه — figure برایش مهم نیست داخلش چیست",
                  },
                },
                {
                  type: "tip",
                  en: "Caption craft: the figcaption explains WHY it matters ('Where episode 12 was recorded'), not what is obviously visible ('two monitors'). Alt describes; figcaption narrates.",
                  fa: "هنرِ کپشن: figcaption توضیح می‌دهد «چرا» مهم است ('Where episode 12 was recorded')، نه آنچه بدیهی دیده می‌شود ('دو مانیتور'). alt توصیف می‌کند؛ figcaption روایت می‌کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The gallery wall, assembled", fa: "دیوارِ گالری، مونتاژشده" },
              blocks: [
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Media gallery</title>
  </head>
  <body>
    <h1>Dojo media wall 🖼️</h1>
    <section style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
      <figure>
        <img src="rooftop-800.png" alt="Sunset over the city from the dojo rooftop"
             width="800" height="500" loading="lazy">
        <figcaption>Class happens up here.</figcaption>
      </figure>
      <figure>
        <img src="belts-800.png" alt="A row of colored belts hanging on a wooden rack"
             width="800" height="500" loading="lazy">
        <figcaption>The belt wall — white to black.</figcaption>
      </figure>
      <figure>
        <video controls width="400" poster="sparring-cover.png">
          <source src="sparring.webm" type="video/webm">
        </video>
        <figcaption>Friday sparring, 60 seconds of it.</figcaption>
      </figure>
    </section>
    <footer>Built with lazy images and zero plugins.</footer>
  </body>
</html>`,
                  caption: {
                    en: "One grid section, three figures — the wall from Module 6, now carrying real media",
                    fa: "یک section با گرید، سه figure — همان دیوارِ ماژول ۶، حالا با رسانه‌ی واقعی",
                  },
                },
                {
                  type: "text",
                  en: "Build order: the `section` with its inline grid style first (the wall), then hang three `figure`s on it — two images, one video. Every image keeps its alt; every figure keeps its figcaption; the video keeps controls.",
                  fa: "ترتیبِ ساختن: اول `section` با استایلِ گریدِ درون‌خطی‌اش (دیوار)، بعد سه `figure` ازش آویزان کن — دو تصویر، یک ویدیو. هر تصویر alt خودش را دارد؛ هر figure کپشن خودش را؛ و ویدیو هم controlsاش را.",
                },
                {
                  type: "warn",
                  en: "figcaption does NOT replace alt. A screen reader reads the alt when it meets the IMAGE; the caption it reads after the figure. They are two different announcements — give both real words.",
                  fa: "figcaption جای alt را «نمی‌گیرد». صفحه‌خوان وقتی به «تصویر» می‌رسد alt را می‌خواند؛ کپشن را بعد از figure. دو اعلامِ متفاوت‌اند — برای هر دو کلماتِ واقعی بگذار.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "The caption of a <figure> is written in…", fa: "کپشنِ یک <figure> در … نوشته می‌شود." },
                  options: [
                    { en: "<figcaption>", fa: "<figcaption>" },
                    { en: "<caption>", fa: "<caption>" },
                    { en: "<legend>", fa: "<legend>" },
                  ],
                  answer: 0,
                  explain: {
                    en: "figcaption belongs to figures; caption belongs to tables; legend belongs to fieldsets. Three families, three caption tags.",
                    fa: "figcaption مالِ figureهاست؛ caption مالِ جدول‌ها؛ legend مالِ fieldsetها. سه خانواده، سه تگِ کپشن.",
                  },
                },
                {
                  q: { en: "In a gallery, each image's alt should…", fa: "در گالری، altِ هر تصویر باید…" },
                  options: [
                    { en: "describe the image — figcaption does not replace it", fa: "تصویر را توصیف کند — figcaption جایگزینش نمی‌شود" },
                    { en: "always be empty because figcaption exists", fa: "همیشه خالی باشد چون figcaption وجود دارد" },
                    { en: "repeat the filename", fa: "اسمِ فایل را تکرار کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "alt is read AT the image, figcaption after the figure — two announcements, both deserve real words.",
                    fa: "alt «سرِ جایِ» تصویر خوانده می‌شود، figcaption بعد از figure — دو اعلامِ جدا، هر دو لایقِ کلماتِ واقعی.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Media gallery 🖼️", fa: "گالریِ رسانه 🖼️" },
              brief: {
                en: "Build the gallery: a `<section>` with inline `style` containing `display: grid`; inside it EXACTLY three `<figure>`s — two holding an `img` (with a real-words `alt` and `loading='lazy'`) and one holding a `<video controls>`. EVERY figure ends with a `figcaption`.",
                fa: "گالری را بساز: یک `<section>` با `style` درون‌خطی که `display: grid` دارد؛ داخلش دقیقاً سه `<figure>` — دو تایان یک `img` دارند (با `alt` واقعی و `loading='lazy'`) و یک‌تایان `<video controls>`. «هر» figure با یک `figcaption` تمام می‌شود.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Media gallery</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            figure { margin: 0; }
            img, video { width: 100%; max-width: 420px; border-radius: 12px; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>Dojo media wall 🖼️</h1>
        <!-- TODO 1) section with style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;" -->
        <!-- TODO 2) figure 1: img (alt + loading="lazy") + figcaption -->
        <!-- TODO 3) figure 2: img (alt + loading="lazy") + figcaption -->
        <!-- TODO 4) figure 3: video controls + figcaption -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Media gallery</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            figure { margin: 0; }
            img, video { width: 100%; max-width: 420px; border-radius: 12px; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>Dojo media wall 🖼️</h1>
        <section style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            <figure>
                <img src="rooftop-800.png" alt="Sunset over the city from the dojo rooftop"
                     width="800" height="500" loading="lazy">
                <figcaption>Class happens up here.</figcaption>
            </figure>
            <figure>
                <img src="belts-800.png" alt="A row of colored belts hanging on a wooden rack"
                     width="800" height="500" loading="lazy">
                <figcaption>The belt wall — white to black.</figcaption>
            </figure>
            <figure>
                <video controls width="400" poster="sparring-cover.png">
                    <source src="sparring.webm" type="video/webm">
                </video>
                <figcaption>Friday sparring, 60 seconds of it.</figcaption>
            </figure>
        </section>
        <footer>Built with lazy images and zero plugins.</footer>
    </body>
</html>`,
              hints: [
                {
                  en: "The wall: <section style='display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;'> — write the style exactly like that.",
                  fa: "دیوار: <section style='display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;'> — استایل را دقیقاً همین‌طور بنویس.",
                },
                {
                  en: "Each image figure: <figure><img src='…' alt='…' loading='lazy'><figcaption>…</figcaption></figure>.",
                  fa: "هر figureِ تصویردار: <figure><img src='…' alt='…' loading='lazy'><figcaption>…</figcaption></figure>.",
                },
                {
                  en: "Count: 3 figures, 2 img[alt], 1 video[controls], 3 figcaptions.",
                  fa: "بشمار: ۳ figure، ۲ img[alt]، ۱ video[controls]، ۳ figcaption.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "section", styleIncludes: "display: grid" },
                  { selector: "section figure", count: 3 },
                  { selector: "figure img[alt]", count: 2 },
                  { selector: "figure figcaption", count: 3 },
                  { selector: "figure video[controls]", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },

    // ─── Module 12 ───────────────────────────────────────────
    {
      id: "html-m12",
      title: { en: "Final: Semantic Pro Page", fa: "پایانی: صفحه‌ی حرفه‌ای و معنایی" },
      blurb: {
        en: "Landmarks, articles and the accessibility pass — then the semantic capstone that ties all 12 modules together.",
        fa: "نقاطِ شهریِ معنایی، مقاله و پاسِ دسترس‌پذیری — بعد کپ‌استونِ معنایی که هر ۱۲ ماژول را به هم گره می‌زند.",
      },
      lessons: [
        {
          id: "html-m12-l1",
          title: { en: "Landmarks: header, nav, main, aside, footer", fa: "نقاطِ شهری: header و nav و main و aside و footer" },
          goal: {
            en: "Replace div-soup with real landmarks a screen reader can navigate like subway stops.",
            fa: "شورِ div را با نقاطِ شهریِ واقعی عوض کنی که صفحه‌خوان مثل ایستگاه‌های مترو در آنها بپرد.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "From div-soup to landmarks", fa: "از شورِ div تا نقاطِ شهری" },
              blocks: [
                {
                  type: "text",
                  en: "Module 8 taught you to organize with sections and ids. Now meet the REAL names. `header` = the page's top strip (logo, site title). `nav` = the major menu of links. `main` = THE content — exactly one per page. `aside` = a side note (related links, a promo). `footer` = the bottom strip (copyright, contact). These five are LANDMARKS: a screen reader user opens your page and jumps straight to main — like hopping on the right subway line without reading the whole map.",
                  fa: "ماژول ۸ یادت داد با section و id سازمان بدهی. حالا «اسم‌های واقعی» را ببین. `header` = نوارِ بالای صفحه (لوگو، نامِ سایت). `nav` = منوی اصلیِ لینک‌ها. `main` = «خودِ» محتوا — دقیقاً یکی در هر صفحه. `aside` = یادداشتِ کناری (لینک‌های مرتبط، یک پیشنهاد). `footer` = نوارِ پایین (کپی‌رایت، تماس). این پنج‌تا «نقطه‌ی شهری» (Landmark) هستند: کاربرِ صفحه‌خوان صفحه‌ات را باز می‌کند و مستقیم به main می‌پرد — مثل سوارشدن به خطِ درستِ مترو بدونِ خواندنِ کلِ نقشه.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Landmark city</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
      header, footer { background: #0f172a; color: #e2e8f0; padding: 14px 20px; }
      nav a { color: #7dd3fc; margin-right: 14px; }
      main { padding: 20px; max-width: 640px; }
      aside { background: #fef9c3; border-radius: 8px; padding: 12px; margin-top: 16px; }
    </style>
  </head>
  <body>
    <header>
      <strong>Rooftop Dojo</strong>
      <nav>
        <a href="#classes">Classes</a>
        <a href="#join">Join</a>
      </nav>
    </header>
    <main>
      <h1>Train above the city 🥋</h1>
      <p>Sunset classes on the rooftop, three times a week.</p>
      <aside>
        <p>Looking for kids' classes? They moved to Saturdays.</p>
      </aside>
    </main>
    <footer>
      <p>Rooftop Dojo · 12 Sky Street · since 2019</p>
    </footer>
  </body>
</html>`,
                  caption: {
                    en: "Five landmarks, one page — a screen reader announces each like a station name",
                    fa: "پنج نقطه‌ی شهری، یک صفحه — صفحه‌خوان هرکدام را مثل اسمِ ایستگاه اعلام می‌کند",
                  },
                },
                {
                  type: "tip",
                  en: "A top-level `header` and `footer` get free, automatic landmark roles (banner and contentinfo). Careful: a header INSIDE an article is just an article's header — no banner role. Nesting changes meaning.",
                  fa: "`header` و `footer` در سطحِ بالا به‌طور خودکار و مجانی نقشِ نقطه‌ی شهری می‌گیرند (banner و contentinfo). حواست باشد: headerِ «داخلِ» article فقط تیترِ همان مقاله است — نقشِ banner ندارد. تودرتویی معنا را عوض می‌کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The rules of the roads", fa: "قوانینِ خیابان‌ها" },
              blocks: [
                {
                  type: "text",
                  en: "Three road rules. (1) `main` appears EXACTLY once — it is the destination, and there is one destination. (2) `nav` is for MAJOR navigation groups only; a row of legal links in the footer can stay plain. (3) `aside` is optional and tangential — if removing it loses nothing important, it belonged there.",
                  fa: "سه قانونِ خیابان. (۱) `main` دقیقاً «یک‌بار» می‌آید — مقصد یکی است. (۲) `nav` فقط برای گروه‌های اصلیِ ناوبری است؛ ردیفِ لینک‌های حقوقی در فوتر می‌تواند ساده بماند. (۳) `aside` اختیاری و حاشیه‌ای است — اگر حذفش هیچ چیزِ مهمی از بین نبرد، جای درستش همین‌جا بوده.",
                },
                {
                  type: "warn",
                  en: "An empty landmark is an empty station: `<header></header>` with nothing inside still gets announced as 'banner' — and delivers nothing. Landmarks wrap real content or they do not exist.",
                  fa: "نقطه‌ی شهریِ خالی یعنی ایستگاهِ خالی: `<header></header>` با هیچ‌چیزِ داخلش همچنان به‌عنوان 'banner' اعلام می‌شود — و هیچ نمی‌رساند. یا نقطه‌ی شهری محتوای واقعی را می‌پیچد، یا اصلاً وجود ندارد.",
                },
                {
                  type: "tip",
                  en: "The skip link: make the FIRST link on the page 'Skip to content' pointing at #main (give main an id). Keyboard users press Tab once, Enter — and skip the whole menu. Small code, huge kindness.",
                  fa: "لینکِ پرش: اولین لینکِ صفحه را 'Skip to content' بگذار که به #main اشاره کند (به main یک id بده). کاربرِ کیبورد یک Tab می‌زند، Enter — و از کلِ منو رد می‌شود. کدِ کوچک، مهربانیِ بزرگ.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Skip link</title>
  </head>
  <body>
    <header>
      <nav aria-label="Main">
        <a href="#classes">Classes</a>
        <a href="#join">Join</a>
      </nav>
    </header>
    <main id="main">
      <h1>Train above the city 🥋</h1>
      <p>Content starts here — and the skip link lands right on it.</p>
    </main>
  </body>
</html>`,
                  caption: {
                    en: "main carries an id; a 'Skip to content' link can aim at it (added in the full project)",
                    fa: "main یک id دارد؛ لینکِ 'Skip to content' می‌تواند به آن نشانه برود (در پروژه‌ی کامل اضافه می‌شود)",
                  },
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which landmark appears EXACTLY once per page?", fa: "کدام نقطه‌ی شهری «دقیقاً یک‌بار» در هر صفحه می‌آید؟" },
                  options: [
                    { en: "main", fa: "main" },
                    { en: "header", fa: "header" },
                    { en: "nav", fa: "nav" },
                  ],
                  answer: 0,
                  explain: {
                    en: "One page, one main. Headers and navs can legitimately repeat (a nav inside a section, a header inside an article).",
                    fa: "یک صفحه، یک main. header و nav به‌طور قانونی می‌توانند تکرار شوند (nav داخلِ section، header داخلِ article).",
                  },
                },
                {
                  q: { en: "aside is for…", fa: "aside برای … است." },
                  options: [
                    { en: "tangential side content — remove it and nothing vital is lost", fa: "محتوای حاشیه‌ایِ کناری — حذفش کنی هیچ چیزِ حیاتی از بین نمی‌رود" },
                    { en: "the page's most important content", fa: "مهم‌ترین محتوای صفحه" },
                    { en: "the list of navigation links", fa: "فهرستِ لینک‌های ناوبری" },
                  ],
                  answer: 0,
                  explain: {
                    en: "aside = the margin note: related links, a promo, a fun fact. Vital content belongs in main.",
                    fa: "aside = حاشیه‌نویسی: لینک‌های مرتبط، یک پیشنهاد، یک دانستنیِ جالب. محتوای حیاتی مالِ main است.",
                  },
                },
                {
                  q: { en: "What is the difference between <header> and a plain <div class='top'>?", fa: "فرقِ <header> با یک <div class='top'> ساده چیست؟" },
                  options: [
                    { en: "header carries landmark meaning assistive tech can jump to", fa: "header معنای نقطه‌ی شهری دارد که فناوری‌های یاری می‌توانند به آن بپرند" },
                    { en: "header is blue by default", fa: "header به‌طور پیش‌فرض آبی است" },
                    { en: "none — they are identical", fa: "هیچ — دقیقاً یکسان‌اند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Same look (until CSS), different MEANING. Landmarks are a navigation API, not decoration.",
                    fa: "ظاهرِ یکسان (تا وقتی CSS بیاید)، «معنای» متفاوت. نقاطِ شهری یک API ناوبری‌اند، نه دکور.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Landmark skeleton 🏗️", fa: "اسکلتِ نقاطِ شهری 🏗️" },
              brief: {
                en: "Convert the div-soup starter into landmarks: a `header` containing a `nav` with EXACTLY two links; a `main` containing an `h1` and a `p`; an `aside` containing a `p`; a `footer` containing a `p`. Keep the texts — only the containers change.",
                fa: "شورِ div در starter را به نقاطِ شهری تبدیل کن: یک `header` که داخلش `nav` با دقیقاً دو لینک دارد؛ یک `main` که داخلش یک `h1` و یک `p` دارد؛ یک `aside` که داخلش یک `p` دارد؛ و یک `footer` که داخلش یک `p` دارد. متن‌ها بمانند — فقط ظرف‌ها عوض می‌شوند.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Landmark skeleton</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
            .strip { background: #0f172a; color: #e2e8f0; padding: 14px 20px; }
            .strip a { color: #7dd3fc; margin-right: 14px; }
            .content { padding: 20px; max-width: 640px; }
            .note { background: #fef9c3; border-radius: 8px; padding: 12px; margin-top: 16px; }
        </style>
    </head>
    <body>
        <!-- TODO 1) header wrapping the site name + a nav with EXACTLY two links -->
        <div class="strip">
            <strong>Rooftop Dojo</strong>
            <a href="#classes">Classes</a>
            <a href="#join">Join</a>
        </div>
        <!-- TODO 2) main with the h1 + p -->
        <div class="content">
            <h1>Train above the city 🥋</h1>
            <p>Sunset classes on the rooftop, three times a week.</p>
        </div>
        <!-- TODO 3) aside with the p -->
        <div class="note">
            <p>Looking for kids' classes? They moved to Saturdays.</p>
        </div>
        <!-- TODO 4) footer with the p -->
        <div class="strip">
            <p>Rooftop Dojo · 12 Sky Street · since 2019</p>
        </div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Landmark skeleton</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
            header, footer { background: #0f172a; color: #e2e8f0; padding: 14px 20px; }
            nav a { color: #7dd3fc; margin-right: 14px; }
            main { padding: 20px; max-width: 640px; }
            aside { background: #fef9c3; border-radius: 8px; padding: 12px; margin-top: 16px; }
        </style>
    </head>
    <body>
        <header>
            <strong>Rooftop Dojo</strong>
            <nav>
                <a href="#classes">Classes</a>
                <a href="#join">Join</a>
            </nav>
        </header>
        <main>
            <h1>Train above the city 🥋</h1>
            <p>Sunset classes on the rooftop, three times a week.</p>
            <aside>
                <p>Looking for kids' classes? They moved to Saturdays.</p>
            </aside>
        </main>
        <footer>
            <p>Rooftop Dojo · 12 Sky Street · since 2019</p>
        </footer>
    </body>
</html>`,
              hints: [
                {
                  en: "Swap the divs for their real names: div.strip (top) → header, div.content → main, div.note → aside, div.strip (bottom) → footer.",
                  fa: "divها را با اسم‌های واقعی‌شان عوض کن: div.strip (بالا) → header، div.content → main، div.note → aside، div.strip (پایین) → footer.",
                },
                {
                  en: "Wrap the two links in <nav>…</nav> — inside the header, after the site name.",
                  fa: "دو لینک را داخلِ <nav>…</nav> بپیچان — داخلِ header، بعد از نامِ سایت.",
                },
                {
                  en: "The aside can sit inside main, right after the p — side notes usually live in the main flow's margin.",
                  fa: "aside می‌تواند داخلِ main و درست بعد از p بنشیند — حاشیه‌نویسی‌ها معمولاً در حاشیه‌ی جریانِ اصلی زندگی می‌کنند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "header nav", count: 1 },
                  { selector: "header nav a", count: 2 },
                  { selector: "main h1", count: 1 },
                  { selector: "main p", count: 1 },
                  { selector: "aside p", count: 1 },
                  { selector: "footer p", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m12-l2",
          title: { en: "article & section: the publishing pair", fa: "article و section؛ جفتِ نشر" },
          goal: {
            en: "Structure a real post with article, dated headings via <time>, and headed sections.",
            fa: "یک پستِ واقعی را با article و تیترهای تاریخ‌دارِ <time> و بخش‌های تیترمنظم بسازی.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              title: { en: "article = standalone", fa: "article یعنی مستقل" },
              blocks: [
                {
                  type: "text",
                  en: "`article` marks a piece that makes sense ALL BY ITSELF — a blog post, a product card, a review, a comment. The test: could it be syndicated in an RSS feed, alone, with its own title, and still make sense? Then it is an article. `section` is different: a themed CHAPTER inside something bigger — and every section should introduce itself with a heading (`h2` and below).",
                  fa: "`article` تکه‌ای را علامت می‌زند که «به‌تنهایی» معنا دارد — یک پستِ وبلاگ، یک کارتِ محصول، یک نقد، یک کامنت. آزمونش: آیا می‌شود آن را تنها، با عنوانِ خودش، در یک فیدِ RSS منتشر کرد و همچنان فهمید؟ پس article است. `section` فرق دارد: یک «فصل» موضوعی داخلِ چیزی بزرگ‌تر — و هر section باید با یک تیتر (`h2` و پایین‌تر) خودش را معرفی کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Blog post</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 640px; }
      article header { border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; }
      time { color: #64748b; font-size: 14px; }
      section { margin-top: 16px; }
    </style>
  </head>
  <body>
    <article>
      <header>
        <h1>Why we teach HTML first</h1>
        <time datetime="2026-02-14">14 Feb 2026</time>
      </header>
      <section>
        <h2>The case for markup</h2>
        <p>HTML is the one language every device already speaks.</p>
        <p>No installs, no setup — view source and you are in the code.</p>
      </section>
      <section>
        <h2>What comes next</h2>
        <p>CSS adds the paint, JS adds the reflexes.</p>
      </section>
    </article>
  </body>
</html>`,
                  caption: {
                    en: "article wraps the whole post; its header carries title + date; sections are the chapters",
                    fa: "article کلِ پست را می‌پیچد؛ headerاش عنوان + تاریخ دارد؛ sectionها همان فصل‌ها هستند",
                  },
                },
                {
                  type: "text",
                  en: "See the `<time>` element? Humans read '14 Feb 2026'; the `datetime='2026-02-14'` attribute gives machines the ISO date — search engines, calendars and scripts parse it without guessing. Display text and machine truth, in one tag.",
                  fa: "عنصرِ `<time>` را دیدی؟ آدم‌ها '14 Feb 2026' را می‌خوانند؛ ویژگیِ `datetime='2026-02-14'` به ماشین‌ها تاریخِ ISO را می‌دهد — موتورهای جست‌وجو، تقویم‌ها و اسکریپت‌ها بدونِ حدس آن را می‌خوانند. متنِ نمایش و حقیقتِ ماشینی، در یک تگ.",
                },
                {
                  type: "tip",
                  en: "Can't decide article vs section? Ask: does it have its own TITLE and could it be shared alone? → article. Is it a labeled CHAPTER of something bigger? → section.",
                  fa: "بین article و section مرددی؟ بپرس: عنوانِ خودش را دارد و می‌تواند تنها به‌اشتراک گذاشته شود؟ → article. یک «فصلِ» برچسب‌دار از چیزی بزرگ‌تر است؟ → section.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Headings are the map", fa: "تیترها همان نقشه‌اند" },
              blocks: [
                {
                  type: "text",
                  en: "Screen reader users navigate long pages by HEADINGS — they pull up the heading list and jump. That map only works if it is ordered: ONE `h1` for the page (here, the article's title), `h2` for each major section, `h3` inside those. Never skip levels — an `h4` under an `h2` reads like a hole in the staircase.",
                  fa: "کاربرانِ صفحه‌خوان صفحاتِ بلند را با «تیترها» ناوبری می‌کنند — فهرستِ تیترها را بالا می‌آورند و می‌پرند. آن نقشه فقط وقتی کار می‌کند که مرتب باشد: «یک» `h1` برای صفحه (اینجا، عنوانِ مقاله)، `h2` برای هر بخشِ اصلی، و `h3` داخلِ آنها. هرگز از پله نپر — یک `h4` زیرِ `h2` مثل حفره‌ای وسطِ پلکان خوانده می‌شود.",
                },
                {
                  type: "warn",
                  en: "Never choose headings by SIZE — 'h3 looks right for this line' is a design thought, not a structure thought. Pick by RANK in the outline; CSS will handle the looks in the CSS course.",
                  fa: "هرگز تیتر را بر اساسِ «اندازه» انتخاب نکن — «h3 برای این خط به‌نظر درست می‌آید» یک فکرِ طراحی است نه ساختار. بر اساسِ «رتبه» در طرحِ کلی انتخاب کن؛ ظاهرش را CSS در دوره‌ی خودش حل می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Outline check</title>
  </head>
  <body>
    <article>
      <h1>One h1 — the page's title</h1>
      <section>
        <h2>Chapter one</h2>
        <p>…</p>
        <h3>A sub-point inside chapter one</h3>
        <p>…</p>
      </section>
      <section>
        <h2>Chapter two</h2>
        <p>…</p>
      </section>
    </article>
  </body>
</html>`,
                  caption: {
                    en: "The outline: h1 → h2 → h3, each level inside its parent — no holes in the staircase",
                    fa: "طرحِ کلی: h1 → h2 → h3، هر پله داخلِ والدش — بدونِ حفره در پلکان",
                  },
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "A self-contained post with its own title is…", fa: "یک پستِ مستقل با عنوانِ خودش یک … است." },
                  options: [
                    { en: "article", fa: "article" },
                    { en: "section", fa: "section" },
                    { en: "aside", fa: "aside" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The RSS test passes → article. section is a chapter of something bigger.",
                    fa: "آزمونِ RSS را پاس می‌کند → article. section فصلی از چیزی بزرگ‌تر است.",
                  },
                },
                {
                  q: { en: "Every <section> should open with…", fa: "هر <section> باید با … باز شود." },
                  options: [
                    { en: "a heading (h2–h6) introducing the chapter", fa: "یک تیتر (h2 تا h6) که فصل را معرفی کند" },
                    { en: "an image", fa: "یک تصویر" },
                    { en: "a nav with links", fa: "یک nav با لینک‌ها" },
                  ],
                  answer: 0,
                  explain: {
                    en: "A section without a heading is an unlabeled drawer — the heading IS its label.",
                    fa: "section بدونِ تیتر یک کشوی بی‌برچسب است — تیتر همان برچسبش است.",
                  },
                },
                {
                  q: { en: "datetime='2026-02-14' on a <time> element is…", fa: "datetime='2026-02-14' روی عنصرِ <time> همان … است." },
                  options: [
                    { en: "the machine-readable date (ISO), while the tag's text stays human-friendly", fa: "تاریخِ ماشین‌خوان (ISO)، در حالی که متنِ تگ برای آدم‌ها دوستانه می‌ماند" },
                    { en: "the display text users see", fa: "متنِ نمایشی که کاربران می‌بینند" },
                    { en: "a timezone declaration", fa: "اعلامیه‌ی منطقه‌ی زمانی" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Humans read the tag's text; machines read datetime. Two audiences, one element.",
                    fa: "آدم‌ها متنِ تگ را می‌خوانند؛ ماشین‌ها datetime را. دو مخاطب، یک عنصر.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The mini blog post ✍️", fa: "پستِ مینی‌وبلاگ ✍️" },
              brief: {
                en: "Build a post: one `article` containing — an `h1` (the post title); a `<time>` element with `datetime='2026-02-14'` (human text may differ); EXACTLY two `section`s, each opening with an `h2` and holding at least one `p`.",
                fa: "یک پست بساز: یک `article` که داخلش — یک `h1` (عنوانِ پست)؛ یک عنصرِ `<time>` با `datetime='2026-02-14'` (متنِ آدمیزاد می‌تواند فرق کند)؛ و دقیقاً دو `section` باشد که هرکدام با یک `h2` باز می‌شوند و دست‌کم یک `p` دارند.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mini blog post</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 640px; }
            time { color: #64748b; font-size: 14px; }
            section { margin-top: 16px; }
        </style>
    </head>
    <body>
        <!-- TODO 1) article wrapping everything -->
        <!-- TODO 2) h1 with the post title + time datetime="2026-02-14" -->
        <!-- TODO 3) EXACTLY two sections, each: h2 + at least one p -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mini blog post</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 640px; }
            time { color: #64748b; font-size: 14px; }
            section { margin-top: 16px; }
        </style>
    </head>
    <body>
        <article>
            <header>
                <h1>Why we teach HTML first</h1>
                <time datetime="2026-02-14">14 Feb 2026</time>
            </header>
            <section>
                <h2>The case for markup</h2>
                <p>HTML is the one language every device already speaks.</p>
                <p>No installs, no setup — view source and you are in the code.</p>
            </section>
            <section>
                <h2>What comes next</h2>
                <p>CSS adds the paint, JS adds the reflexes.</p>
            </section>
        </article>
    </body>
</html>`,
              hints: [
                {
                  en: "Skeleton: <article> <h1>…</h1> <time datetime='2026-02-14'>14 Feb 2026</time> + two <section>s. </article>.",
                  fa: "اسکلت: <article> <h1>…</h1> <time datetime='2026-02-14'>14 Feb 2026</time> + دو <section>. </article>.",
                },
                {
                  en: "A wrapping <header> around h1 + time is optional polish — the checker only needs the h1 and the time inside the article.",
                  fa: "پیچیدنِ <header> دورِ h1 و time آراستگیِ اختیاری است — چکر فقط h1 و time را داخلِ article می‌خواهد.",
                },
                {
                  en: "Each section: <section><h2>Chapter</h2><p>…</p></section> — exactly two of them.",
                  fa: "هر section: <section><h2>Chapter</h2><p>…</p></section> — دقیقاً دو تا.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "article", count: 1 },
                  { selector: "article h1", count: 1 },
                  { selector: "article time", attrName: "datetime", attrValue: "2026-02-14" },
                  { selector: "article section h2", count: 2 },
                  { selector: "article section p", count: 2 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m12-l3",
          title: { en: "The accessibility pass", fa: "پاسِ دسترس‌پذیری" },
          goal: {
            en: "Audit a page like an auditor: name every unlabeled thing, fix every silent control.",
            fa: "مثل یک ممیز صفحه را ممیزی کنی: به هر چیزِ بی‌نام نام بدهی و هر کنترلِ خاموش را تعمیر کنی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "The five-second fixes", fa: "تعمیرهای پنج‌ثانیه‌ای" },
              blocks: [
                {
                  type: "text",
                  en: "Accessibility is not a module you install — it is a habit of NAMING things. The five-second fixes you already know, gathered: every meaningful image gets an `alt`; every input gets its `label for`/`id` handshake; every button gets real text; `<html lang>` declares the language; headings climb the ladder without skipping. Each fix is one attribute — and each one unlocks the page for a whole group of people.",
                  fa: "دسترس‌پذیری ماژولی نیست که نصب کنی — عادتِ «نام‌گذاریِ» چیزهاست. تعمیرهای پنج‌ثانیه‌ای که می‌شناسی، جمع‌شده: هر تصویرِ بامعنا یک `alt` می‌گیرد؛ هر اینپوت دست‌دادنِ `label for`/`id` خودش را دارد؛ هر دکمه متنِ واقعی دارد؛ `<html lang>` زبان را اعلام می‌کند؛ تیترها بی‌پرش از نردبان بالا می‌روند. هر تعمیر یک ویژگی است — و هرکدام صفحه را برای یک گروهِ کامل از آدم‌ها باز می‌کند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Before / after</title>
  </head>
  <body>
    <!-- BEFORE: a silent page -->
    <!-- <img src="mascot.png"> -->
    <!-- <input type="text"> -->
    <!-- <button>🔍</button> -->

    <!-- AFTER: a page that speaks -->
    <img src="mascot.png" alt="The academy's owl mascot wearing a graduation cap" width="200" height="200">
    <label for="q">Search lessons</label>
    <input type="text" id="q" name="q" placeholder="e.g. tables">
    <button type="submit">🔍 Search</button>
  </body>
</html>`,
                  caption: {
                    en: "Three silent elements, three attributes — and the page starts talking",
                    fa: "سه عنصرِ خاموش، سه ویژگی — و صفحه شروع به حرف‌زدن می‌کند",
                  },
                },
                {
                  type: "tip",
                  en: "`aria-label` names things that have NO visible text: an icon-only button ('Close'), a second nav ('Footer navigation'), an iframe. It is the invisible label of last resort — visible text is always better.",
                  fa: "`aria-label` چیزهایی را نام می‌دهد که «متنِ قابل‌دید» ندارند: یک دکمه‌ی آیکونی ('Close')، یک nav دوم ('Footer navigation')، یک iframe. آخرین پناهِ لیبلِ نامرئی است — متنِ قابل‌دید همیشه بهتر است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The keyboard test", fa: "آزمونِ کیبورد" },
              blocks: [
                {
                  type: "text",
                  en: "Here is the audit that finds what eyes miss: UNPLUG THE MOUSE. Press Tab — a focus ring should walk through every interactive thing in order: links, buttons, inputs. Press Enter on each — it should activate. If anything refuses focus or ignores Enter, it is broken for anyone who cannot use a mouse — and for power users too.",
                  fa: "این ممیزی چیزی را پیدا می‌کند که چشم نمی‌بیند: «ماوس را از پریز بکش». Tab را بزن — حلقه‌ی فوکوس باید به‌ترتیب از همه‌ی چیزهای تعاملی بگذرد: لینک‌ها، دکمه‌ها، اینپوت‌ها. روی هرکدام Enter بزن — باید کار کند. اگر چیزی فوکوس را رد کرد یا Enter را نادیده گرفت، برای هرکسی که ماوس ندارد خراب است — و برای کاربرانِ حرفه‌ای هم.",
                },
                {
                  type: "warn",
                  en: "The classic crime: `<div onclick='…'>Click me</div>`. It LOOKS like a button but Tab skips it, Enter ignores it, screen readers stay silent. Real `<button>` — looks, focus, activation and announcement, all free.",
                  fa: "جنایتِ کلاسیک: `<div onclick='…'>Click me</div>`. شبیه دکمه «دیده می‌شود» ولی Tab از آن می‌پرد، Enter نادیده‌اش می‌گیرد، صفحه‌خوان سکوت می‌کند. `<button>` واقعی — ظاهر، فوکوس، فعال‌سازی و اعلام، همه مجانی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Two navs</title>
  </head>
  <body>
    <!-- two navs? name them — screen readers announce 'Main navigation', 'Footer navigation' -->
    <header>
      <nav aria-label="Main">
        <a href="#lessons">Lessons</a>
        <a href="#exams">Exams</a>
      </nav>
    </header>
    <footer>
      <nav aria-label="Footer">
        <a href="#terms">Terms</a>
        <a href="#privacy">Privacy</a>
      </nav>
    </footer>
  </body>
</html>`,
                  caption: {
                    en: "Same tag, different names — aria-label distinguishes landmarks of the same kind",
                    fa: "همان تگ، اسم‌های متفاوت — aria-label نقطه‌های شهریِ هم‌نوع را از هم جدا می‌کند",
                  },
                },
                {
                  type: "tip",
                  en: "Audit order that works: (1) keyboard pass with Tab, (2) read alts aloud, (3) check every input has a label, (4) check headings climb in order, (5) lang on html. Five passes, five minutes, a pro-grade page.",
                  fa: "ترتیبِ ممیزی که جواب می‌دهد: (۱) پاسِ کیبورد با Tab، (۲) altها را بلند بخوان، (۳) چک کن هر اینپوت لیبل دارد، (۴) چک کن تیترها به‌ترتیب بالا رفته‌اند، (۵) lang روی html. پنج پاس، پنج دقیقه، یک صفحه‌ی در سطحِ حرفه‌ای.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "An icon-only button (just a magnifier emoji) needs…", fa: "دکمه‌ای که فقط آیکون دارد (فقط ایموجی ذره‌بین) به … نیاز دارد." },
                  options: [
                    { en: "an aria-label — or better, visible text next to the icon", fa: "یک aria-label — یا بهتر، متنِ قابل‌دید کنارِ آیکون" },
                    { en: "a bigger emoji", fa: "یک ایموجیِ بزرگ‌تر" },
                    { en: "nothing — icons speak for themselves", fa: "هیچ — آیکون‌ها خودشان حرف می‌زنند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "No visible text = no name = silence. aria-label supplies the missing name (visible text is even better).",
                    fa: "بدونِ متنِ قابل‌دید = بدونِ نام = سکوت. aria-label نامِ گم‌شده را می‌دهد (متنِ قابل‌دید حتی بهتر است).",
                  },
                },
                {
                  q: { en: "Pressing Tab on a page…", fa: "زدنِ Tab در صفحه …" },
                  options: [
                    { en: "moves focus through the interactive controls in order", fa: "فوکوس را به‌ترتیب بین کنترل‌های تعاملی جابه‌جا می‌کند" },
                    { en: "reloads the page", fa: "صفحه را رفرش می‌کند" },
                    { en: "submits every form at once", fa: "همه‌ی فرم‌ها را همزمان ارسال می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Tab is the keyboard walker. If it skips your 'button', the button is fake — div with onclick.",
                    fa: "Tab پیاده‌رویِ کیبورد است. اگر از «دکمه‌ات» رد شد، دکمه قلابی است — div با onclick.",
                  },
                },
                {
                  q: { en: "A page has two navs. What is the pro move?", fa: "صفحه‌ای دو تا nav دارد. حرکتِ حرفه‌ای چیست؟" },
                  options: [
                    { en: "give each an aria-label, e.g. 'Main' and 'Footer'", fa: "به هرکدام یک aria-label بده، مثلاً 'Main' و 'Footer'" },
                    { en: "delete one — two navs are illegal", fa: "یکی را پاک کن — دو nav غیرقانونی است" },
                    { en: "nothing — navs are anonymous by design", fa: "هیچ — navها به‌طور پیش‌فرض بی‌نام‌اند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Repeated landmark types are legal but need names — otherwise 'navigation, navigation' means nothing.",
                    fa: "تکرارِ نوعِ نقطه‌ی شهری قانونی است ولی نام می‌خواهد — وگرنه 'navigation، navigation' هیچ معنایی ندارد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The a11y rescue 🛠️", fa: "نجاتِ دسترس‌پذیری 🛠️" },
              brief: {
                en: "RESCUE MISSION. The starter page fails the audit. Fix exactly these: give the `img` a real-words `alt`; give the search `input` the `id='search'` and add a `<label for='search'>` whose text contains the word search; give the `nav` an `aria-label` of your choice; give the `button` visible text containing the word search (alongside the emoji).",
                fa: "مأموریتِ نجات. صفحه‌ی starter ممیزی را رد نمی‌کند. دقیقاً این‌ها را تعمیر کن: به `img` یک `alt` با کلماتِ واقعی بده؛ به اینپوتِ جست‌وجو `id='search'` بده و یک `<label for='search'>` اضافه کن که متنش کلمه‌ی search را دارد؛ به `nav` یک `aria-label` به انتخابِ خودت بده؛ و به `button` متنِ قابل‌دیدی بده که کلمه‌ی search را دارد (کنارِ ایموجی).",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>A11y rescue</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { padding: 8px 14px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <header>
            <nav>
                <a href="#lessons">Lessons</a>
                <a href="#exams">Exams</a>
            </nav>
        </header>
        <main>
            <h1>Lesson finder 🔎</h1>
            <!-- 1) img has NO alt — give it real words -->
            <img src="mascot.png" width="200" height="200">
            <!-- 2) input has NO id, and there is NO label — fix the pair -->
            <input type="text" name="q" placeholder="e.g. tables">
            <!-- 3) button has NO text — only an emoji -->
            <button type="submit">🔍</button>
        </main>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>A11y rescue</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { padding: 8px 14px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <header>
            <nav aria-label="Main">
                <a href="#lessons">Lessons</a>
                <a href="#exams">Exams</a>
            </nav>
        </header>
        <main>
            <h1>Lesson finder 🔎</h1>
            <img src="mascot.png" alt="The academy's owl mascot wearing a graduation cap" width="200" height="200">
            <label for="search">Search lessons</label>
            <input type="text" id="search" name="q" placeholder="e.g. tables">
            <button type="submit">🔍 Search</button>
        </main>
    </body>
</html>`,
              hints: [
                {
                  en: "The image: <img src='mascot.png' alt='describe the mascot in real words' …> — presence of the attribute is what's graded.",
                  fa: "تصویر: <img src='mascot.png' alt='مَسکات را با کلمات واقعی توصیف کن' …> — چیزی که نمره می‌گیرد «بودنِ» ویژگی است.",
                },
                {
                  en: "The pair: <label for='search'>Search lessons</label> + <input type='text' id='search' …>.",
                  fa: "جفت: <label for='search'>Search lessons</label> + <input type='text' id='search' …>.",
                },
                {
                  en: "Nav gets <nav aria-label='Main'>; button becomes <button type='submit'>🔍 Search</button>.",
                  fa: "nav می‌شود <nav aria-label='Main'>؛ دکمه می‌شود <button type='submit'>🔍 Search</button>.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "img[alt]", count: 1 },
                  { selector: "input#search", count: 1 },
                  { selector: "label[for='search']", count: 1 },
                  { selector: "nav[aria-label]", count: 1 },
                  { selector: "button", text: "search" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m12-l4",
          title: { en: "FINAL PROJECT: The Semantic Pro Page", fa: "پروژه‌ی نهایی: صفحه‌ی حرفه‌ای و معنایی" },
          goal: {
            en: "Ship the graduation page: landmarks, a dated article, a labeled form and an a11y pass — all in one.",
            fa: "صفحه‌ی فارغ‌التحصیلی را تحویل بدهی: نقاطِ شهری، یک مقاله‌ی تاریخ‌دار، یک فرمِ لیبل‌دار و پاسِ دسترس‌پذیری — همه در یک صفحه.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "Everything, on one page", fa: "همه‌چیز، در یک صفحه" },
              blocks: [
                {
                  type: "text",
                  en: "Twelve modules, one page. The reference build below fuses EVERYTHING you learned: `lang` on html (M8), landmarks (yesterday), a dated `article` with `time` (today), a `figure` with a real `alt` and `loading='lazy'` (M11), a labeled email form (M10), and the launch checklist from M8's final. Read it like a museum map — then rebuild it YOURS in the challenge.",
                  fa: "دوازده ماژول، یک صفحه. نمونه‌ی مرجعِ زیر «همه‌چیزِ» آموخته‌هایت را یکی می‌کند: `lang` روی html (م۸)، نقاطِ شهری (دیروز)، یک `article` تاریخ‌دار با `time` (امروز)، یک `figure` با `alt` واقعی و `loading='lazy'` (م۱۱)، یک فرمِ ایمیلیِ لیبل‌دار (م۱۰)، و چک‌لیستِ پرتاب از پایانی‌ی م۸. مثل نقشه‌ی موزه بخوانش — بعد در چالش، نسخه‌ی «خودت» را بساز.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rooftop Dojo — train above the city</title>
  </head>
  <body>
    <header>
      <strong>Rooftop Dojo</strong>
      <nav aria-label="Main">
        <a href="#story">Story</a>
        <a href="#join">Join</a>
      </nav>
    </header>
    <main>
      <article>
        <h1>Train above the city 🥋</h1>
        <time datetime="2026-02-14">14 Feb 2026</time>
        <p>Sunset classes on the rooftop — three times a week, all levels.</p>
        <figure>
          <img src="dojo-rooftop-800.png"
               alt="Students in white belts practicing at sunset on a city rooftop"
               width="800" height="500" loading="lazy">
          <figcaption>Thursday's sunset class.</figcaption>
        </figure>
      </article>
      <section>
        <h2>Join the next class</h2>
        <form>
          <label for="email">Your email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com">
          <button type="submit">Subscribe</button>
        </form>
      </section>
      <aside>
        <p>Kids' classes moved to Saturdays.</p>
      </aside>
    </main>
    <footer>
      <p>Rooftop Dojo · 12 Sky Street · since 2019</p>
    </footer>
  </body>
</html>`,
                  caption: {
                    en: "The graduation reference — every tag is a callback to a module you finished",
                    fa: "نمونه‌ی مرجعِ فارغ‌التحصیلی — هر تگ یک یادآوری از ماژولی است که تمامش کرده‌ای",
                  },
                },
                {
                  type: "text",
                  en: "Trace the callbacks: `lang` + real button text = M8/M12-l3. Landmarks = M12-l1. article + time = M12-l2. figure/figcaption/alt/lazy = M11. label+input+button = M10. Nothing here is new — that is exactly what a final project means.",
                  fa: "یادآوری‌ها را دنبال کن: `lang` + متنِ واقعیِ دکمه = م۸/م۱۲-درس۳. نقاطِ شهری = م۱۲-درس۱. article و time = م۱۲-درس۲. figure و figcaption و alt و lazy = م۱۱. label و input و button = م۱۰. اینجا هیچ‌چیزِ جدید نیست — و این دقیقاً یعنی پروژه‌ی نهایی.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The graduation checklist", fa: "چک‌لیستِ فارغ‌التحصیلی" },
              blocks: [
                {
                  type: "text",
                  en: "Before you press Check, run the graduation checklist — the same one employers and auditors run: `lang` on the html tag? nav carries `aria-label`? exactly one `h1` inside main? a section with its own `h2`? every image with a real-words `alt`? the form's label wired with `for` to its input's `id`? a footer with real content? Eight lines, eight YESes — and the page ships.",
                  fa: "قبل از زدنِ Check، چک‌لیستِ فارغ‌التحصیلی را رد کن — همان که کارفرماها و ممیزها رد می‌کنند: `lang` روی تگِ html هست؟ nav دارای `aria-label` است؟ دقیقاً یک `h1` داخلِ main هست؟ یک section با `h2` خودش هست؟ هر تصویر `alt` با کلماتِ واقعی دارد؟ لیبلِ فرم با `for` به `id` اینپوت وصل است؟ فوتر محتوای واقعی دارد؟ هشت خط، هشت «بله» — و صفحه پرتاب می‌شود.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!-- your build map — every line is a graded check -->
<html lang="en">                       ← 1
<header> <nav aria-label="…"> 2 links </nav> </header>   ← 2, 3
<main> <h1>…</h1> </main>              ← 4
<section> <h2>…</h2> … </section>      ← 5
<img alt="real words" …>               ← 6
<form> <label for="email"> + <input id="email" type="email"> + <button> </form>  ← 7, 8
<footer> … </footer>                   ← 9`,
                  caption: {
                    en: "Nine lines to graduation — build top to bottom, check the map as you go",
                    fa: "نه خط تا فارغ‌التحصیلی — از بالا به پایین بساز و همزمان نقشه را چک کن",
                  },
                },
                {
                  type: "warn",
                  en: "Do not smuggle div-soup habits in: a `<div class='header'>` will LOOK fine but FAIL the checks — landmarks must be the real tags. This is the one page where structure IS the grade.",
                  fa: "عادت‌های شورِ div را قاچاق نکن: `<div class='header'>` «به‌نظر» درست می‌آید ولی چک‌ها را رد نمی‌کند — نقطه‌های شهری باید تگ‌های واقعی باشند. این تنها صفحه‌ای است که «ساختار» خودِ نمره است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which two elements are one-per-page by rule?", fa: "کدام دو عنصر طبق قانون «یکی در هر صفحه» هستند؟" },
                  options: [
                    { en: "main and h1", fa: "main و h1" },
                    { en: "header and footer", fa: "header و footer" },
                    { en: "section and aside", fa: "section و aside" },
                  ],
                  answer: 0,
                  explain: {
                    en: "One destination (main), one title (h1). The rest can legitimately repeat.",
                    fa: "یک مقصد (main)، یک عنوان (h1). بقیه به‌طور قانونی می‌توانند تکرار شوند.",
                  },
                },
                {
                  q: { en: "The accessible pairing for an email field is…", fa: "جفت‌شدنِ دسترس‌پذیرِ فیلدِ ایمیل همان … است." },
                  options: [
                    { en: "label for='email' + input id='email' type='email'", fa: "label for='email' + input id='email' type='email'" },
                    { en: "input with a placeholder only", fa: "اینپوت با placeholder تنها" },
                    { en: "input inside a div with class='label'", fa: "اینپوت داخلِ div با class='label'" },
                  ],
                  answer: 0,
                  explain: {
                    en: "for/id wires the name; type='email' adds free validation. Placeholder is a whisper, not a name.",
                    fa: "for و id نام را سیم‌کشی می‌کنند؛ type='email' هم اعتبارسنجیِ مجانی می‌دهد. placeholder نجواست، نه نام.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Semantic Pro Page 🏁", fa: "صفحه‌ی حرفه‌ای و معنایی 🏁" },
              brief: {
                en: "THE GRADUATION PAGE. Build it all: `<html lang='en'>`; a `header` containing a `nav aria-label='…'` with EXACTLY two links; a `main` containing an `h1`; a `section` containing an `h2`; an `img` with a real-words `alt`; a `form` containing a `label for='email'` (text contains email), an `input id='email'` with `type='email'`, and a `button` whose text contains the word subscribe; and a `footer`. Style it proudly — this is your portfolio piece.",
                fa: "صفحه‌ی فارغ‌التحصیلی. همه‌اش را بساز: `<html lang='en'>`؛ یک `header` که داخلش `nav aria-label='…'` با دقیقاً دو لینک دارد؛ یک `main` که داخلش `h1` دارد؛ یک `section` که داخلش `h2` دارد؛ یک `img` با `alt` واقعی؛ یک `form` که داخلش یک `label for='email'` (متنش کلمه‌ی email را دارد)، یک `input id='email'` با `type='email'`، و یک `button` که متنش کلمه‌ی subscribe را دارد؛ و یک `footer`. با افتخار استایلش بده — این قطعه‌ی پورتفولیوی توست.",
              },
              starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Graduation page</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
            header, footer { background: #0f172a; color: #e2e8f0; padding: 14px 20px; }
            nav a { color: #7dd3fc; margin-right: 14px; }
            main { padding: 20px; max-width: 640px; }
            input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { margin-top: 8px; padding: 10px 20px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <!-- TODO 1) html lang="en" (edit the opening tag) -->
        <!-- TODO 2) header with nav aria-label + EXACTLY two links -->
        <header>
        </header>
        <!-- TODO 3) main with h1 -->
        <main>
        </main>
        <!-- TODO 4) section with h2 + form: label for="email" + input id="email" type="email" + button "…subscribe…" -->
        <!-- TODO 5) img with a real-words alt -->
        <!-- TODO 6) footer -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Rooftop Dojo — graduation page</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
            header, footer { background: #0f172a; color: #e2e8f0; padding: 14px 20px; }
            nav a { color: #7dd3fc; margin-right: 14px; }
            main { padding: 20px; max-width: 640px; }
            input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { margin-top: 8px; padding: 10px 20px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <header>
            <strong>Rooftop Dojo</strong>
            <nav aria-label="Main">
                <a href="#story">Story</a>
                <a href="#join">Join</a>
            </nav>
        </header>
        <main>
            <h1>Train above the city 🥋</h1>
            <time datetime="2026-02-14">14 Feb 2026</time>
            <p>Sunset classes on the rooftop — three times a week, all levels.</p>
            <img src="dojo-rooftop-800.png"
                 alt="Students in white belts practicing at sunset on a city rooftop"
                 width="800" height="500" loading="lazy">
            <section>
                <h2>Join the next class</h2>
                <form>
                    <label for="email">Your email</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com">
                    <button type="submit">Subscribe</button>
                </form>
            </section>
        </main>
        <footer>
            <p>Rooftop Dojo · 12 Sky Street · since 2019</p>
        </footer>
    </body>
</html>`,
              hints: [
                {
                  en: "The opening tag becomes <html lang='en'> — one attribute, checked first.",
                  fa: "تگِ آغازین می‌شود <html lang='en'> — یک ویژگی، اول از همه چک می‌شود.",
                },
                {
                  en: "Landmarks: <header><nav aria-label='Main'><a>…</a><a>…</a></nav></header> — exactly two links.",
                  fa: "نقاطِ شهری: <header><nav aria-label='Main'><a>…</a><a>…</a></nav></header> — دقیقاً دو لینک.",
                },
                {
                  en: "The form trio + final sweep: <label for='email'>Your email</label> + <input type='email' id='email'> + <button type='submit'>Subscribe</button>; then check one h1 in main, one section h2, img with alt, footer with content — all nine lines of the build map. A <div class='header'> will look fine and fail everything: landmarks must be real tags.",
                  fa: "سه‌گانه‌ی فرم + جاروی نهایی: <label for='email'>Your email</label> + <input type='email' id='email'> + <button type='submit'>Subscribe</button>؛ بعد چک کن: یک h1 داخلِ main، یک section با h2، تصویر با alt، فوترِ پرمحتوا — هر نه خطِ نقشه. <div class='header'> به‌نظر درست می‌آید ولی همه‌چیز را رد می‌کند: نقطه‌های شهری باید تگ‌های واقعی باشند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "html[lang='en']", count: 1 },
                  { selector: "nav[aria-label]", count: 1 },
                  { selector: "header nav a", count: 2 },
                  { selector: "main h1", count: 1 },
                  { selector: "section h2", count: 1 },
                  { selector: "img[alt]", count: 1 },
                  { selector: "form label[for='email']", count: 1 },
                  { selector: "input#email", count: 1 },
                  { selector: "footer", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 13 ───────────────────────────────────────────
    {
      id: "html-m13",
      title: { en: "Disclosure: details & dialog", fa: "بازشونده‌ها: details و dialog" },
      blurb: {
        en: "Native accordions, exclusive groups and real dialogs — interaction with zero JavaScript.",
        fa: "آکاردئونِ بومی، گروه‌های انحصاری و دیالوگِ واقعی — تعامل بدونِ حتی یک خط جاوااسکریپت.",
      },
      lessons: [
        {
          id: "html-m13-l1",
          title: { en: "details & summary: click to reveal", fa: "details و summary: کلیک کن تا ببینی" },
          goal: {
            en: "Build native accordions with details and summary — zero JavaScript, works everywhere.",
            fa: "با details و summary آکاردئونِ بومی بسازی — بدونِ جاوااسکریپت و همه‌جا کار می‌کند.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "The two-line accordion", fa: "آکاردئونِ دو خطی" },
              blocks: [
                {
                  type: "text",
                  en: "Until now, anything hidden on a page needed JavaScript to appear. Meet `details` — a native disclosure widget. Whatever you put inside it is folded away, and the browser draws a small triangle and handles the click for you. `summary` is the visible handle: the one line the user sees and clicks. Everything after the summary is the hidden payload.",
                  fa: "تا حالا هر چیزی که مخفی بود، برای پیدا شدن به جاوااسکریپت نیاز داشت. با `details` آشنا شو — یک ابزارِ بازشونده‌ی بومی. هرچه داخلش بگذاری تا می‌شود، و مرورگر خودش یک مثلثِ کوچک می‌کشد و کلیک را هم مدیریت می‌کند. `summary` دستگیره‌ی قابل‌دیدن است: همان یک خطی که کاربر می‌بیند و کلیک می‌کند. هرچه بعد از summary بیاید، محتوای پنهان است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Mini FAQ</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
      summary { font-weight: bold; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Mini FAQ</h1>
    <details>
      <summary>Can I use details without JavaScript?</summary>
      <p>Yes — the browser opens and closes it natively. Two tags and you are done.</p>
    </details>
    <details>
      <summary>Does it work on phones too?</summary>
      <p>Everywhere. Every browser has supported it for years.</p>
    </details>
  </body>
</html>`,
                  caption: {
                    en: "Two details = a working FAQ. Click the summaries in the preview!",
                    fa: "دو تا details یعنی یک FAQ آماده. در پیش‌نمایش روی summaryها کلیک کن!",
                  },
                },
                {
                  type: "text",
                  en: "Rules of the pair: the FIRST `summary` inside a `details` is the handle; everything else is hidden content. If you forget the summary, the browser prints the boring word 'Details' as the handle — always write your own. And the handle is not limited to plain text: a heading or an icon works too.",
                  fa: "قانونِ این جفت: اولین `summary` داخلِ `details` همان دستگیره است؛ بقیه، محتوای پنهان. اگر summary را ننویسی، مرورگر کلمه‌ی خسته‌کننده‌ی 'Details' را به‌عنوانِ دستگیره می‌گذارد — پس همیشه دستگیره‌ی خودت را بنویس. دستگیره هم فقط متنِ ساده نیست: تیتر یا آیکون هم می‌شود.",
                },
                {
                  type: "warn",
                  en: "Folded is not deleted: the hidden content stays in the DOM. Ctrl+F finds it, search engines index it, screen readers can reach it. Disclosure folds content away — it never erases it. (For truly invisible content, meet `hidden` in the next module.)",
                  fa: "تاشدن یعنی حذف نیست: محتوای پنهان سرِ جایش در DOM می‌ماند. Ctrl+F پیدایش می‌کند، موتورهای جست‌وجو ایندکسش می‌کنند و صفحه‌خوان‌ها به آن می‌رسند. بازشونده محتوا را می‌پیچد، هرگز پاکش نمی‌کند. (برای «واقعاً نامرئی»، در ماژول بعد با hidden آشنا می‌شوی.)",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "open: ship it unfolded", fa: "open: از همان اول، باز تحویل بده" },
              blocks: [
                {
                  type: "text",
                  en: "By default every details starts folded. Add the boolean attribute `open` and it ships already expanded: `<details open>`. No value needed — the word itself is the switch. Remove it, and the box folds again. That is the whole API.",
                  fa: "به‌طورِ پیش‌فرض هر details تاشده شروع می‌شود. ویژگیِ بولیِ `open` را اضافه کن تا از همان اول باز باشد: `<details open>`. نیازی به مقدار نیست — خودِ کلمه، کلید است. برداریش کنی، دوباره تا می‌شود. کلِ API همین است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>One open by default</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
      summary { font-weight: bold; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Refund questions</h1>
    <details open>
      <summary>How fast are refunds?</summary>
      <p>Back on your card within 3 working days — the question everyone asks first.</p>
    </details>
    <details>
      <summary>Can I refund a gift card?</summary>
      <p>Yes, but it returns as store credit, not cash.</p>
    </details>
  </body>
</html>`,
                  caption: {
                    en: "The open attribute: the first question ships unfolded",
                    fa: "ویژگیِ open: سؤالِ اول از همان اول باز است",
                  },
                },
                {
                  type: "text",
                  en: "Where disclosure shines: FAQ sections, spoilers, 'continue reading' intros, filter panels, file trees, long settings pages split into foldable groups. One tag pair, no framework, no bugs.",
                  fa: "کجاها بازشونده می‌درخشد: بخشِ سؤالاتِ متداول، اسپویلرها، مقدمه‌های «ادامه‌ی مطلب»، پنلِ فیلترها، درختِ فایل‌ها و صفحه‌های تنظیماتِ طولانی که به گروه‌های تاشده تقسیم می‌شوند. یک جفتِ تگ، بدونِ فریم‌ورک، بدونِ باگ.",
                },
                {
                  type: "tip",
                  en: "UX habit: on an FAQ, open the single most-asked question by default. The reader sees the pattern ('I can click these') AND gets the top answer for free.",
                  fa: "عادتِ تجربه‌ی کاربری: در یک FAQ، همان یک سؤالی که بیشترین تکرار را دارد به‌صورتِ پیش‌فرض باز بگذار. خواننده هم الگو را می‌فهمد (این‌ها را می‌شود باز کرد) و هم پاسخِ داغ را مجانی می‌گیرد.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Inside <details>, what role does <summary> play?", fa: "داخلِ <details>، نقشِ <summary> چیست؟" },
                  options: [
                    { en: "The hidden content revealed on click", fa: "محتوای پنهانی که با کلیک پیدا می‌شود" },
                    { en: "The visible handle the user clicks to fold and unfold", fa: "دستگیره‌ی قابل‌دیدنی که کاربر با کلیک روی آن باز و بسته می‌کند" },
                    { en: "A required caption under the details box", fa: "زیرنویسِ اجباریِ زیرِ جعبه‌ی details" },
                  ],
                  answer: 1,
                  explain: {
                    en: "First summary = the handle; everything after it is the payload. No summary? The browser writes 'Details' for you.",
                    fa: "اولین summary دستگیره است؛ هرچه بعدش بیاید محتواست. summary هم ننویسی؟ مرورگر خودش 'Details' می‌نویسد.",
                  },
                },
                {
                  q: { en: "Which snippet ships an accordion already expanded?", fa: "کدام قطعه کد، آکاردئون را از همان اول باز نشان می‌دهد؟" },
                  options: [
                    { en: "<details expanded>", fa: "<details expanded>" },
                    { en: "<details open>", fa: "<details open>" },
                    { en: "<details visible>", fa: "<details visible>" },
                    { en: "<details active>", fa: "<details active>" },
                  ],
                  answer: 1,
                  explain: {
                    en: "`open` is a boolean attribute: presence = expanded. No value, no JavaScript.",
                    fa: "`open` یک ویژگیِ بولی است: بودنش یعنی باز. بدونِ مقدار، بدونِ جاوااسکریپت.",
                  },
                },
                {
                  q: { en: "A details is folded. Which is TRUE about its hidden paragraph?", fa: "یک details تا شده. درباره‌ی پاراگرافِ پنهانش کدام درست است؟" },
                  options: [
                    { en: "It is removed from the DOM until opened", fa: "تا باز شود از DOM حذف شده است" },
                    { en: "It stays in the DOM; only its display is folded", fa: "در DOM می‌ماند؛ فقط نمایشش تا شده" },
                    { en: "Search engines cannot see it", fa: "موتورهای جست‌وجو نمی‌توانند ببینندش" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Disclosure folds; it does not delete. The content is still in the DOM for Ctrl+F, crawlers and screen readers.",
                    fa: "بازشونده تا می‌کند، پاک نمی‌کند. محتوا برای Ctrl+F و خزنده‌ها و صفحه‌خوان‌ها همچنان در DOM است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The mini FAQ 📖", fa: "مینی‌FAQ 📖" },
              brief: {
                en: "Build a FAQ page: EXACTLY three `details` elements, each with its own `summary` (a real question) and at least one `p` of answer inside. Make the first one start `open`.",
                fa: "یک صفحه‌ی FAQ بساز: دقیقاً سه تا `details` که هرکدام `summary` خودش (یک سؤالِ واقعی) و دست‌کم یک `p` از جواب را داخل دارد. اولی را با `open` شروع کن.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mini FAQ</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
            summary { font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>Mini FAQ</h1>
        <!-- TODO: EXACTLY three details, each with a summary + one p of answer -->
        <!-- TODO: the FIRST details must carry the open attribute -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mini FAQ</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
            summary { font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>Mini FAQ</h1>
        <details open>
            <summary>How fast is delivery?</summary>
            <p>Two working days for cities, four for remote areas.</p>
        </details>
        <details>
            <summary>Can I change my address after ordering?</summary>
            <p>Yes — up to one hour after the order is placed.</p>
        </details>
        <details>
            <summary>Do you ship internationally?</summary>
            <p>We ship to 12 countries; costs show at checkout.</p>
        </details>
    </body>
</html>`,
              hints: [
                {
                  en: "Skeleton per item: <details><summary>Question?</summary><p>Answer.</p></details> — three times.",
                  fa: "اسکلتِ هر آیتم: <details><summary>سؤال؟</summary><p>جواب.</p></details> — سه بار.",
                },
                {
                  en: "Open-by-default = <details open> on the first one — no value, just the word.",
                  fa: "بازِ پیش‌فرض یعنی <details open> روی اولی — بدونِ مقدار، فقط خودِ کلمه.",
                },
                {
                  en: "Count check: exactly 3 details, 3 summaries, at least 3 answers (one p each), exactly 1 with open.",
                  fa: "شمارش: دقیقاً ۳ details و ۳ summary و دست‌کم ۳ جواب (هرکدام یک p)، و دقیقاً یکی با open.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "details", count: 3 },
                  { selector: "details summary", count: 3 },
                  { selector: "details p", count: 3 },
                  { selector: "details[open]", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m13-l2",
          title: { en: "The name attribute: exclusive accordions", fa: "ویژگیِ name: آکاردئونِ انحصاری" },
          goal: {
            en: "Group accordions with name so opening one folds the others — the classic product-FAQ behavior, zero JS.",
            fa: "با name آکاردئون‌ها را گروه کنی تا باز شدنِ یکی، بقیه را ببندد — همان رفتارِ کلاسیکِ FAQ، بدونِ جاوااسکریپت.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "One open at a time", fa: "هر بار، فقط یکی" },
              blocks: [
                {
                  type: "text",
                  en: "Real FAQs rarely let five answers stack up. Give several `details` the SAME `name` attribute and the browser links them: opening one automatically folds the others. An exclusive accordion — in pure HTML.",
                  fa: "FAQهای واقعی معمولاً نمی‌گذارند پنج جواب روی هم تلنبار شود. به چند `details` یک ویژگیِ `name` یکسان بده و مرورگر آنها را به هم وصل می‌کند: باز شدنِ یکی، بقیه را خودکار می‌بندد. یک آکاردئونِ انحصاری — با HTMLِ خالص.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Exclusive FAQ</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
      summary { font-weight: bold; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Shipping questions</h1>
    <details name="faq" open>
      <summary>Where is my order?</summary>
      <p>Tracking starts the moment the courier scans your box.</p>
    </details>
    <details name="faq">
      <summary>Can I pick up in store?</summary>
      <p>Yes — choose store pickup at checkout, free within 24h.</p>
    </details>
    <details name="faq">
      <summary>What if nobody is home?</summary>
      <p>The courier retries twice, then holds the box for 5 days.</p>
    </details>
  </body>
</html>`,
                  caption: {
                    en: "Same name = one group: open the second box in the preview and watch the first fold itself",
                    fa: "name یکسان یعنی یک گروه: در پیش‌نمایش جعبه‌ی دوم را باز کن و ببین اولی خودش تا می‌شود",
                  },
                },
                {
                  type: "text",
                  en: "The name value is your label for the group — pick one word like 'faq' or 'filters'. Every details sharing that label joins the group; details with other names (or none) stay independent.",
                  fa: "مقدارِ name برچسبِ تو برای گروه است — یک کلمه انتخاب کن مثل 'faq' یا 'filters'. هر details که همین برچسب را داشته باشد واردِ گروه می‌شود؛ detailsهایی با نامِ دیگر (یا بدونِ نام) مستقل می‌مانند.",
                },
                {
                  type: "tip",
                  en: "Keep `open` on exactly one member to set the default-open item. When the user opens another, that one folds too — the group always has at most one open.",
                  fa: "روی دقیقاً یکی از اعضا `open` بگذار تا آیتمِ پیش‌فرضِ باز را تعیین کنی. وقتی کاربر یکی دیگر را باز کند، همان هم تا می‌شود — گروه همیشه حداکثر یکیِ باز دارد.",
                },
                {
                  type: "warn",
                  en: "The group spans the WHOLE page: two unrelated accordion lists with the same name will fight each other. Scope your names — 'faq' for the FAQ, 'specs' for the spec sheet.",
                  fa: "گروه، کلِ صفحه را پوشش می‌دهد: دو فهرستِ آکاردئونِ بی‌ربط با یک name با هم می‌جنگند. نام‌ها را محدود نگه دار — 'faq' برای سؤالات، 'specs' برای مشخصات.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Nesting and graceful aging", fa: "تودرتو و پیر شدنِ باوقار" },
              blocks: [
                {
                  type: "text",
                  en: "Details can nest: a `details` inside another `details` becomes a sub-item — instant file trees and 'chapter → topic' outlines. Each folds independently.",
                  fa: "details می‌تواند تودرتو باشد: یک `details` داخلِ detailsِ دیگر می‌شود زیرآیتم — همان درختِ فایل و طرحِ «فصل → موضوع». هرکدام مستقل باز و بسته می‌شوند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Nested tree</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      details { margin-left: 0; }
      details details { margin-left: 22px; }
      summary { font-weight: bold; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Course files</h1>
    <details>
      <summary>📁 lessons</summary>
      <details>
        <summary>📁 module-13</summary>
        <p>details.html · dialog.html · help-center.html</p>
      </details>
      <details>
        <summary>📁 module-14</summary>
        <p>data-attributes.html · tabindex.html</p>
      </details>
    </details>
  </body>
</html>`,
                  caption: {
                    en: "Nested details: a file tree with zero JavaScript",
                    fa: "details تودرتو: یک درختِ فایل بدونِ حتی یک خط جاوااسکریپت",
                  },
                },
                {
                  type: "text",
                  en: "One more quiet virtue: on an old browser that does not know `name`, the accordions simply stop being exclusive — they still open and close perfectly. That is progressive enhancement: new browsers get the bonus behavior, old ones lose nothing.",
                  fa: "یک خصلتِ آرامِ دیگر: در مرورگرِ قدیمیِ که name را نمی‌شناسد، آکاردئون‌ها فقط «انحصاری» بودن را از دست می‌دهند — باز و بسته شدنشان بی‌نقص می‌ماند. این همان ارتقای تدریجی است: مرورگرِ نو رفتارِ جایزه می‌گیرد، مرورگرِ کهنه هیچ‌چیز از دست نمی‌دهد.",
                },
                {
                  type: "tip",
                  en: "Nest one level deep, maybe two. Three+ levels of folded boxes and readers lose the map — flatten instead.",
                  fa: "یک سطح تودرتو کن، حداکثر دو. سه سطح یا بیشترِ جعبه‌ی تاشده و خواننده نقشه را گم می‌کند — به‌جایش صافش کن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Several details share name='faq'. What happens when the user opens a second one?", fa: "چند details با name='faq' داریم. وقتی کاربر دومی را باز کند چه می‌شود؟" },
                  options: [
                    { en: "Both stay open — name does nothing", fa: "هر دو باز می‌مانند — name کاری نمی‌کند" },
                    { en: "The first one folds automatically", fa: "اولی خودکار تا می‌شود" },
                    { en: "The whole page reloads", fa: "کلِ صفحه دوباره بارگذاری می‌شود" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Same name = one exclusive group: at most one member open at any moment.",
                    fa: "name یکسان یعنی یک گروهِ انحصاری: در هر لحظه حداکثر یک عضو باز.",
                  },
                },
                {
                  q: { en: "On an old browser without `name` support, your grouped accordions…", fa: "در مرورگرِ قدیمیِ بدونِ پشتیبانیِ name، آکاردئون‌های گروهیِ تو…" },
                  options: [
                    { en: "break completely", fa: "کاملاً می‌شکنند" },
                    { en: "still open and close, just independently", fa: "همچنان باز و بسته می‌شوند؛ فقط مستقل" },
                    { en: "hide their content forever", fa: "محتوایشان برای همیشه مخفی می‌شود" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Progressive enhancement: the exclusive bonus disappears, the core widget survives.",
                    fa: "ارتقای تدریجی: رفتارِ جایزه از بین می‌رود، ولی خودِ ابزار سالم می‌ماند.",
                  },
                },
                {
                  q: { en: "You want the SECOND accordion open on load, others folded. You…", fa: "می‌خواهی دومین آکاردئون موقعِ لود باز باشد و بقیه تا. چه می‌کنی؟" },
                  options: [
                    { en: "Put open on the first details anyway", fa: "به هر حال open را روی اولی می‌گذارم" },
                    { en: "Put open on the second details", fa: "open را روی دومی می‌گذارم" },
                    { en: "Nothing — browsers open the last one by default", fa: "هیچی — مرورگرها آخری را باز می‌گذارند" },
                    { en: "Add name='open' to the second details", fa: "به دومی name='open' می‌دهم" },
                  ],
                  answer: 1,
                  explain: {
                    en: "`open` marks the default-open member, wherever it stands in the group.",
                    fa: "`open` عضوِ بازِ پیش‌فرض را مشخص می‌کند، هرجا که در گروه باشد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The exclusive FAQ 🎛", fa: "FAQ انحصاری 🎛" },
              brief: {
                en: "Rebuild the FAQ as an exclusive group: EXACTLY three `details` with `name='faq'`, each with a `summary` and a `p`; exactly ONE of them carries `open`.",
                fa: "FAQ را به‌صورتِ گروهِ انحصاری بساز: دقیقاً سه `details` با `name='faq'` که هرکدام یک `summary` و یک `p` دارند؛ و دقیقاً یکی از آنها `open` دارد.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Exclusive FAQ</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
            summary { font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>Shipping questions</h1>
        <!-- TODO: three details, each with name="faq" + summary + p -->
        <!-- TODO: exactly ONE of them also carries open -->
        <details>
            <summary>Where is my order?</summary>
        </details>
        <!-- two more details needed… -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Exclusive FAQ</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
            summary { font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>Shipping questions</h1>
        <details name="faq" open>
            <summary>Where is my order?</summary>
            <p>Tracking starts the moment the courier scans your box.</p>
        </details>
        <details name="faq">
            <summary>Can I pick up in store?</summary>
            <p>Yes — choose store pickup at checkout, free within 24h.</p>
        </details>
        <details name="faq">
            <summary>What if nobody is home?</summary>
            <p>The courier retries twice, then holds the box for 5 days.</p>
        </details>
    </body>
</html>`,
              hints: [
                {
                  en: "Add name='faq' to ALL three details — one typo'd name quietly leaves the group.",
                  fa: "به هر سه details مقدار name='faq' بده — یک غلطِ تایپی در name، آن را بی‌سروصدا از گروه بیرون می‌اندازد.",
                },
                {
                  en: "Exactly one member gets open: <details name='faq' open>. Two opens = fail.",
                  fa: "دقیقاً یک عضو open می‌گیرد: <details name='faq' open>. دو تا open یعنی رد.",
                },
                {
                  en: "Every details needs its own <p> answer inside — the checker counts the paragraphs.",
                  fa: "هر details باید یک <p> جواب داخلش داشته باشد — چکر پاراگراف‌ها را می‌شمارد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "details", count: 3 },
                  { selector: "details[name='faq']", count: 3 },
                  { selector: "details[name='faq'] summary", count: 3 },
                  { selector: "details[name='faq'] p", count: 3 },
                  { selector: "details[name='faq'][open]", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m13-l3",
          title: { en: "dialog: the real modal", fa: "dialog: مودالِ واقعی" },
          goal: {
            en: "Show a native dialog with open, and close it with a form method='dialog' — no hand-built modals ever again.",
            fa: "یک dialog بومی را با open نشان بدهی و با form method='dialog' ببندی — دیگر هیچ‌وقت مودالِ دست‌ساز نه.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "HTML's built-in window", fa: "پنجره‌ی داخلِ HTML" },
              blocks: [
                {
                  type: "text",
                  en: "For years developers hand-built 'modals' from divs and piles of JavaScript — focus traps, ESC keys, scroll locks, all manual. HTML now ships the real thing: `<dialog>`. It renders like a floating window on top of the page, and the browser manages its visibility.",
                  fa: "سال‌ها برنامه‌نویس‌ها «مودال» را با div و انبوهِ جاوااسکریپت دست‌ساز می‌ساختند — قفلِ فوکوس، کلید ESC، قفلِ اسکرول، همه دستی. HTML حالا نسخه‌ی اصل را دارد: `<dialog>`. مثل یک پنجره‌ی شناور روی صفحه دیده می‌شود و دیده‌شدنش را مرورگر مدیریت می‌کند.",
                },
                {
                  type: "text",
                  en: "Two states: without the `open` attribute a dialog is invisible; with `<dialog open>` it shows as a NON-modal window — the page around it stays usable. (There is also a JavaScript method showModal() for a true modal with dark backdrop — later, in the JS course.)",
                  fa: "دو حالت دارد: بدونِ ویژگیِ `open` دیالوگ دیده نمی‌شود؛ با `<dialog open>` به‌شکلِ یک پنجره‌ی «غیرمودال» ظاهر می‌شود — اطرافِ صفحه همچنان قابل‌استفاده است. (روشِ showModal() با جاوااسکریپت هم هست برای مودالِ تمام‌عیار با پس‌زمینه‌ی تیره — بعداً در دوره‌ی JS.)",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>What's new</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      dialog { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; max-width: 380px; }
    </style>
  </head>
  <body>
    <h1>Product updates</h1>
    <p>Release 3.2 just shipped.</p>
    <dialog open>
      <h2>What's new in 3.2</h2>
      <p>Dark mode, faster search, and folders for projects.</p>
    </dialog>
  </body>
</html>`,
                  caption: {
                    en: "A native dialog, visible via the open attribute — no JavaScript anywhere",
                    fa: "یک dialog بومی که با ویژگیِ open دیده می‌شود — بدونِ هیچ جاوااسکریپتی",
                  },
                },
                {
                  type: "tip",
                  en: "The browser centers a dialog by default and gives it a sensible border — a decent modal with zero CSS.",
                  fa: "مرورگر dialog را به‌طورِ پیش‌فرض وسط صفحه می‌گذارد و حاشیه‌ی معقولی هم به آن می‌دهد — یک مودالِ آبرومند با صفر خط CSS.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Close without JavaScript", fa: "بستن، بدونِ جاوااسکریپت" },
              blocks: [
                {
                  type: "text",
                  en: "The magic close: put a `<form method='dialog'>` inside the dialog with a `<button>` in it. Clicking that button closes the dialog — the form's dialog method tells the browser 'submit = close'. No handlers, no libraries.",
                  fa: "جادوی بستن: داخلِ dialog یک `<form method='dialog'>` بگذار و یک `<button>` هم داخلش. با کلیک روی آن دکمه، دیالوگ بسته می‌شود — متدِ dialog فرم به مرورگر می‌گوید «ارسال = بستن». بدونِ هندلر، بدونِ کتابخانه.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Cookie choice</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      dialog { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; max-width: 380px; }
      button { margin-top: 8px; padding: 8px 18px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
    </style>
  </head>
  <body>
    <h1>Welcome back</h1>
    <dialog open>
      <h2>We use cookies 🍪</h2>
      <p>Only for keeping you signed in. Nothing spooky.</p>
      <form method="dialog">
        <button type="submit">Got it</button>
      </form>
    </dialog>
  </body>
</html>`,
                  caption: {
                    en: "Click 'Got it' in the preview — the dialog closes itself. Zero JavaScript.",
                    fa: "در پیش‌نمایش روی 'Got it' کلیک کن — دیالوگ خودش بسته می‌شود. صفر جاوااسکریپت.",
                  },
                },
                {
                  type: "text",
                  en: "Accessibility freebie: a dialog already has the dialog role, and its name comes from its heading or aria-label — give it an `h2` (or aria-label) so screen readers announce 'We use cookies, dialog' instead of just 'dialog'.",
                  fa: "هدیه‌ی دسترس‌پذیری: dialog از اول نقشِ dialog دارد و نامش از تیترش یا aria-label می‌آید — برایش یک `h2` (یا aria-label) بگذار تا صفحه‌خوان بگوید «We use cookies، دیالوگ»، نه فقط «دیالوگ».",
                },
                {
                  type: "warn",
                  en: "Do not stuff whole pages inside dialogs. A dialog is one short, focused decision — confirm, cookie choice, quick tip. Long content belongs on the page itself.",
                  fa: "کلِ صفحه را داخلِ dialog نچپان. dialog یک تصمیمِ کوتاه و متمرکز است — تأیید، انتخابِ کوکی، نکته‌ی سریع. محتوای بلند جای‌اش روی خودِ صفحه است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "A <dialog> without the open attribute is…", fa: "یک <dialog> بدونِ ویژگیِ open…" },
                  options: [
                    { en: "shown modally with a dark backdrop", fa: "به‌صورتِ مودال با پس‌زمینه‌ی تیره نشان داده می‌شود" },
                    { en: "invisible", fa: "نامرئی است" },
                    { en: "shown inline in the text flow", fa: "داخلِ جریانِ متن نشان داده می‌شود" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Hidden until `open` (or showModal()) says otherwise.",
                    fa: "تا وقتی `open` (یا showModal()) نگوید، مخفی است.",
                  },
                },
                {
                  q: { en: "Which pair closes a dialog with zero JavaScript?", fa: "کدام جفت، dialog را بدونِ جاوااسکریپت می‌بندد؟" },
                  options: [
                    { en: "<form method='dialog'> containing a <button>", fa: "<form method='dialog'> حاویِ یک <button>" },
                    { en: "<a href='close'>", fa: "<a href='close'>" },
                    { en: "<button onclick='hide()'>", fa: "<button onclick='hide()'>" },
                    { en: "<form action='close'> containing a <button>", fa: "<form action='close'> حاویِ یک <button>" },
                  ],
                  answer: 0,
                  explain: {
                    en: "method='dialog' means: submitting this form closes the dialog it lives in.",
                    fa: "method='dialog' یعنی: ارسالِ این فرم، همان دیالوگی که داخلش است را می‌بندد.",
                  },
                },
                {
                  q: { en: "The accessible name of a dialog comes from…", fa: "نامِ قابل‌دسترسِ یک dialog از … می‌آید." },
                  options: [
                    { en: "its heading or aria-label", fa: "تیترش یا aria-label" },
                    { en: "its background color", fa: "رنگِ پس‌زمینه‌اش" },
                    { en: "a random word the browser picks", fa: "کلمه‌ای تصادفی که مرورگر انتخاب می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Give every dialog an h2 or aria-label so screen readers announce something meaningful.",
                    fa: "به هر dialog یک h2 یا aria-label بده تا صفحه‌خوان چیزِ بامعنایی اعلام کند.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The cookie dialog 🍪", fa: "دیالوگِ کوکی 🍪" },
              brief: {
                en: "Build a page with an `h1` and a `<dialog open>` that contains: an `h2` with the word cookie, one `p`, and a `<form method='dialog'>` holding a `button` whose text contains got.",
                fa: "صفحه‌ای بساز با یک `h1` و یک `<dialog open>` که داخلش باشد: یک `h2` با کلمه‌ی cookie، یک `p`، و یک `<form method='dialog'>` که `button`ای دارد با متنی شاملِ کلمه‌ی got.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cookie choice</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            dialog { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; max-width: 380px; }
            button { margin-top: 8px; padding: 8px 18px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <h1>Welcome back</h1>
        <!-- TODO: a <dialog open> containing:
             h2 (word "cookie") + one p + form method="dialog" with a button (text contains "got") -->
        <dialog>
        </dialog>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cookie choice</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            dialog { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; max-width: 380px; }
            button { margin-top: 8px; padding: 8px 18px; border: 0; border-radius: 8px; background: #0ea5e9; color: white; }
        </style>
    </head>
    <body>
        <h1>Welcome back</h1>
        <dialog open>
            <h2>We use cookies 🍪</h2>
            <p>Only for keeping you signed in. Nothing spooky.</p>
            <form method="dialog">
                <button type="submit">Got it</button>
            </form>
        </dialog>
    </body>
</html>`,
              hints: [
                {
                  en: "Visible dialog = <dialog open>. The empty <dialog> in the starter is invisible until you add open.",
                  fa: "دیالوگِ دیده‌شدنی یعنی <dialog open>. dialog خالیِ استارتر تا وقتی open اضافه نکنی نامرئی است.",
                },
                {
                  en: "Close machinery: <form method='dialog'><button type='submit'>Got it</button></form> — inside the dialog.",
                  fa: "ماشینِ بستن: <form method='dialog'><button type='submit'>Got it</button></form> — داخلِ خودِ dialog.",
                },
                {
                  en: "Content order inside the dialog: h2 first (announced as its name), then the p, then the closing form.",
                  fa: "ترتیبِ محتوا داخلِ dialog: اول h2 (به‌عنوانِ نامش اعلام می‌شود)، بعد p، و بعد فرمِ بستن.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "dialog", count: 1 },
                  { selector: "dialog[open]", count: 1 },
                  { selector: "dialog h2", text: "cookie" },
                  { selector: "dialog p", count: 1 },
                  { selector: "dialog form", attrName: "method", attrValue: "dialog" },
                  { selector: "dialog form button", text: "got" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m13-l4",
          title: { en: "Module project: the Help Center", fa: "پروژه‌ی ماژول: مرکزِ راهنما" },
          goal: {
            en: "Combine exclusive accordions, a nested tree and a dialog into one support page.",
            fa: "آکاردئونِ انحصاری و یک درختِ تودرتو و dialog را در یک صفحه‌ی پشتیبانی ترکیب کنی.",
          },
          minutes: 17,
          steps: [
            {
              kind: "theory",
              title: { en: "The assembly plan", fa: "نقشه‌ی مونتاژ" },
              blocks: [
                {
                  type: "text",
                  en: "A real support page in four moves: a `header` + `main` skeleton from Module 12; the FAQ as an EXCLUSIVE group (`details name='faq'`, one open); a 'more resources' NESTED details tree; and a `dialog open` for contacting support. Every disclosure pattern from this module, one page.",
                  fa: "یک صفحه‌ی پشتیبانیِ واقعی در چهار حرکت: اسکلتِ `header` و `main` از ماژول ۱۲؛ FAQ به‌صورتِ گروهِ «انحصاری» (details با name='faq' و یکی باز)؛ یک درختِ «تودرتو» برای منابعِ بیشتر؛ و یک `dialog open` برای تماس با پشتیبانی. همه‌ی الگوهای بازشونده‌ی این ماژول، در یک صفحه.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Help Center</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
      header, footer { background: #0f172a; color: #e2e8f0; padding: 12px 20px; }
      main { padding: 20px; max-width: 640px; }
      details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin: 8px 0; }
      summary { font-weight: bold; cursor: pointer; }
      details details { margin-left: 22px; }
      dialog { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; max-width: 380px; }
    </style>
  </head>
  <body>
    <header><strong>Skyline Hosting</strong></header>
    <main>
      <h1>Help Center</h1>
      <h2>Popular questions</h2>
      <details name="faq" open>
        <summary>How do I point my domain here?</summary>
        <p>Change the two nameservers in your registrar panel.</p>
      </details>
      <details name="faq">
        <summary>Can I host two sites?</summary>
        <p>Yes — every plan includes three domains.</p>
      </details>
      <details>
        <summary>📁 More resources</summary>
        <details>
          <summary>📁 Guides</summary>
          <p>DNS basics · SSL setup · Migrating WordPress</p>
        </details>
      </details>
    </main>
    <dialog open>
      <h2>Contact support</h2>
      <p>Median reply time: 40 minutes, any timezone.</p>
      <form method="dialog">
        <button type="submit">Close</button>
      </form>
    </dialog>
    <footer><p>© Skyline Hosting</p></footer>
  </body>
</html>`,
                  caption: {
                    en: "The whole module in one page — open boxes, fold them, close the dialog",
                    fa: "کلِ ماژول در یک صفحه — جعبه‌ها را باز کن، ببند، و دیالوگ را ببند",
                  },
                },
                {
                  type: "tip",
                  en: "Name scoping recap: the FAQ group is 'faq'; the resource tree's details have NO name, so they nest independently. Different jobs, different names (or none).",
                  fa: "یادآوریِ محدودکردنِ نام: گروهِ FAQ با 'faq' است؛ detailsهای درختِ منابع «بدونِ name» هستند تا مستقل تودرتو بمانند. کارهای متفاوت، نام‌های متفاوت (یا بدونِ نام).",
                },
                {
                  type: "warn",
                  en: "Keep dialog content short — one heading, one or two sentences, one action. If your dialog needs a scrollbar, it is a page, not a dialog.",
                  fa: "محتوای dialog را کوتاه نگه دار — یک تیتر، یکی دو جمله، یک دکمه. اگر dialog به اسکرول نیاز دارد، آن یک صفحه است نه دیالوگ.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Polish that costs nothing", fa: "صیقل‌کاریِ مجانی" },
              blocks: [
                {
                  type: "text",
                  en: "Order matters: FAQ first (most visited), then the resource tree, then the contact dialog. Put the most-asked question first AND open by default — returning users find it before they even click.",
                  fa: "ترتیب مهم است: اول FAQ (پربازدیدترین)، بعد درختِ منابع، بعد دیالوگِ تماس. سؤالِ پُرتکرار را اول بگذار «و» پیش‌فرض باز نگهش دار — کاربرِ همیشگی قبل از هر کلیکی پیدایش می‌کند.",
                },
                {
                  type: "text",
                  en: "Give every summary a REAL question, not 'Question 1'. Summaries are the page's table of contents for scanners — vague handles make the whole page look vague.",
                  fa: "به هر summary یک «سؤالِ واقعی» بده، نه 'Question 1'. summaryها فهرستِ محتوای صفحه برای تندخوان‌ها هستند — دستگیره‌های مبهم، کلِ صفحه را مبهم نشان می‌دهند.",
                },
                {
                  type: "tip",
                  en: "The two-click test: can a visitor reach any answer in at most two clicks? FAQ = one click. Tree = two. If something needs three, promote it to the FAQ.",
                  fa: "آزمونِ دوکلیکی: آیا بازدیدکننده هر جوابی را حداکثر با دو کلیک می‌رسد؟ FAQ = یک کلیک. درخت = دو کلیک. اگر چیزی سه کلیک بخواهد، ترفیعش بده به FAQ.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "The FAQ group and the resource tree on one page. Correct setup?", fa: "گروهِ FAQ و درختِ منابع در یک صفحه. تنظیمِ درست کدام است؟" },
                  options: [
                    { en: "name='faq' on the three FAQ details only; the tree's details stay unnamed", fa: "name='faq' فقط روی سه detailsِ FAQ؛ detailsهای درخت بدونِ نام بمانند" },
                    { en: "name='faq' on every details on the page", fa: "name='faq' روی همه‌ی detailsهای صفحه" },
                    { en: "name='tree' on the FAQ details", fa: "name='tree' روی detailsهای FAQ" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Names group what should fold together; the tree folds independently by nesting, not by name.",
                    fa: "name چیزهایی را گروه می‌کند که باید با هم تا شوند؛ درخت با «تودرتویی» مستقل است، نه با name.",
                  },
                },
                {
                  q: { en: "The contact dialog should contain…", fa: "دیالوگِ تماس باید داشته باشد…" },
                  options: [
                    { en: "a heading, one or two sentences, one closing action", fa: "یک تیتر، یکی دو جمله، و یک اقدامِ بستن" },
                    { en: "the entire billing policy", fa: "کلِ سیاستِ صورتحساب" },
                    { en: "nothing — empty dialogs load faster", fa: "هیچی — دیالوگِ خالی سریع‌تر لود می‌شود" },
                  ],
                  answer: 0,
                  explain: {
                    en: "A dialog is one focused decision. Long content is page content.",
                    fa: "dialog یک تصمیمِ متمرکز است. محتوای بلند، محتوای صفحه است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Help Center 🛎", fa: "مرکزِ راهنما 🛎" },
              brief: {
                en: "Build the Help Center: a `header`, a `main` containing EXACTLY three `details` with `name='faq'` (exactly one `open`, each with `summary` + `p`) PLUS one nested pair (`details` inside a `details`); and a `dialog open` with a `<form method='dialog'>` holding a `button`. A `footer` closes the page.",
                fa: "مرکزِ راهنما را بساز: یک `header`، یک `main` که «دقیقاً» سه `details` با `name='faq'` دارد (دقیقاً یکی `open`، هرکدام با `summary` و `p`) به‌علاوه‌ی یک جفتِ تودرتو (`details` داخلِ `details`)؛ و یک `dialog open` با `<form method='dialog'>` که `button` دارد. یک `footer` هم صفحه را می‌بندد.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Help Center</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
            header, footer { background: #0f172a; color: #e2e8f0; padding: 12px 20px; }
            main { padding: 20px; max-width: 640px; }
            details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin: 8px 0; }
            summary { font-weight: bold; cursor: pointer; }
            details details { margin-left: 22px; }
            dialog { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; max-width: 380px; }
        </style>
    </head>
    <body>
        <header><strong>Skyline Hosting</strong></header>
        <main>
            <h1>Help Center</h1>
            <!-- TODO 1) three details with name="faq" — exactly one open, each: summary + p -->
            <!-- TODO 2) one details INSIDE a details (resource tree) -->
            <!-- TODO 3) dialog open with form method="dialog" + button -->
        </main>
        <footer><p>© Skyline Hosting</p></footer>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Help Center</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
            header, footer { background: #0f172a; color: #e2e8f0; padding: 12px 20px; }
            main { padding: 20px; max-width: 640px; }
            details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin: 8px 0; }
            summary { font-weight: bold; cursor: pointer; }
            details details { margin-left: 22px; }
            dialog { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; max-width: 380px; }
        </style>
    </head>
    <body>
        <header><strong>Skyline Hosting</strong></header>
        <main>
            <h1>Help Center</h1>
            <details name="faq" open>
                <summary>How do I point my domain here?</summary>
                <p>Change the two nameservers in your registrar panel.</p>
            </details>
            <details name="faq">
                <summary>Can I host two sites?</summary>
                <p>Yes — every plan includes three domains.</p>
            </details>
            <details name="faq">
                <summary>Is SSL included?</summary>
                <p>Free certificates on every domain, renewed automatically.</p>
            </details>
            <details>
                <summary>📁 More resources</summary>
                <details>
                    <summary>📁 Guides</summary>
                    <p>DNS basics · SSL setup · Migrating WordPress</p>
                </details>
            </details>
            <dialog open>
                <h2>Contact support</h2>
                <p>Median reply time: 40 minutes, any timezone.</p>
                <form method="dialog">
                    <button type="submit">Close</button>
                </form>
            </dialog>
        </main>
        <footer><p>© Skyline Hosting</p></footer>
    </body>
</html>`,
              hints: [
                {
                  en: "FAQ trio: three <details name='faq'>, the first with open. Each holds <summary> + <p>.",
                  fa: "سه‌گانه‌ی FAQ: سه <details name='faq'> که اولی open دارد. هرکدام <summary> و <p> دارند.",
                },
                {
                  en: "Nested tree = a details whose content is another details. Keep them WITHOUT name so they stay independent.",
                  fa: "درختِ تودرتو یعنی detailsی که محتوایش یک details دیگر است. آنها را «بدونِ name» نگه دار تا مستقل بمانند.",
                },
                {
                  en: "Dialog: <dialog open><h2>…</h2><p>…</p><form method='dialog'><button>Close</button></form></dialog> — inside main.",
                  fa: "دیالوگ: <dialog open><h2>…</h2><p>…</p><form method='dialog'><button>Close</button></form></dialog> — داخلِ main.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "header", count: 1 },
                  { selector: "details[name='faq']", count: 3 },
                  { selector: "details[name='faq'][open]", count: 1 },
                  { selector: "details[name='faq'] p", count: 3 },
                  { selector: "details details", count: 1 },
                  { selector: "dialog[open]", count: 1 },
                  { selector: "dialog form[method='dialog']", count: 1 },
                  { selector: "dialog form[method='dialog'] button", count: 1 },
                  { selector: "footer", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Module 14 ───────────────────────────────────────────
    {
      id: "html-m14",
      title: { en: "Power Attributes", fa: "ویژگی‌های قدرتمند" },
      blurb: {
        en: "data-*, contenteditable, hidden, tabindex and first ARIA — the quiet metadata that powers real apps.",
        fa: "data-* و contenteditable و hidden و tabindex و نخستین ARIA — فراداده‌ی خاموشی که اپ‌های واقعی را می‌چرخاند.",
      },
      lessons: [
        {
          id: "html-m14-l1",
          title: { en: "data-*: your own attributes", fa: "data-*: ویژگی‌های خودت" },
          goal: {
            en: "Invent legal custom attributes that carry machine info without lying to HTML.",
            fa: "ویژگی‌های سفارشیِ قانونی بسازی که اطلاعاتِ ماشینی حمل می‌کنند و به HTML دروغ نمی‌گویند.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "Invent, legally", fa: "قانونی اختراع کن" },
              blocks: [
                {
                  type: "text",
                  en: "HTML allows exactly ONE namespace for your own attributes: any name starting with `data-`. `data-price='9'`, `data-id='sku-42'`, `data-level='pro'` — invisible to visitors, machine-readable by CSS and JavaScript, and 100% valid HTML.",
                  fa: "HTML دقیقاً یک فضای نام برای ویژگی‌های خودت مجاز می‌داند: هر نامی که با `data-` شروع شود. مثل `data-price='9'` یا `data-id='sku-42'` یا `data-level='pro'` — برای بازدیدکننده نامرئی، برای CSS و جاوااسکریپت خوانا، و صددرصد HTMLِ معتبر.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Smart shelf</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      .card { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; }
      [data-featured="true"] { border-color: #f59e0b; box-shadow: 0 0 0 3px #fde68a; }
    </style>
  </head>
  <body>
    <h1>Smart shelf</h1>
    <div class="card" data-name="espresso" data-price="9">
      <h3>Espresso beans</h3>
      <p>$9 · 250g</p>
    </div>
    <div class="card" data-name="mug" data-price="14" data-featured="true">
      <h3>Studio mug</h3>
      <p>$14 · handmade</p>
    </div>
    <div class="card" data-name="filter" data-price="6">
      <h3>Paper filters</h3>
      <p>$6 · 100 sheets</p>
    </div>
  </body>
</html>`,
                  caption: {
                    en: "The featured card is styled by its data attribute — no extra class needed",
                    fa: "کارتِ ویژه با همان ویژگیِ data استایل می‌گیرد — بدونِ کلاسِ اضافه",
                  },
                },
                {
                  type: "text",
                  en: "The rules: lowercase, no spaces, hyphens allowed (`data-published-at`). The value is always a string. Keep DISPLAY content in the text; keep MACHINE info in data-* — the price shows as '$9' but lives as data-price='9'.",
                  fa: "قانون‌ها: حروفِ کوچک، بدونِ فاصله، خط‌تیره مجاز (مثل `data-published-at`). مقدار همیشه رشته است. محتوای «نمایشی» را در متن بگذار؛ اطلاعاتِ «ماشینی» را در data-* — قیمت به‌شکلِ '$9' دیده می‌شود ولی به‌شکلِ data-price='9' زندگی می‌کند.",
                },
                {
                  type: "warn",
                  en: "Why not invent `price='9'`? Unknown attributes are silently ignored — the page 'works' but every tool (validators, frameworks, teammates) sees garbage. The `data-` prefix is the contract that says 'this is mine, on purpose'.",
                  fa: "چرا مثلاً `price='9'` اختراع نکنیم؟ ویژگی‌های ناشناخته بی‌سروصدا نادیده گرفته می‌شوند — صفحه «کار می‌کند» ولی هر ابزاری (اعتبارسنج‌ها، فریم‌ورک‌ها، هم‌تیمی‌ها) آشغال می‌بیند. پیشوندِ `data-` همان قرارداد است که می‌گوید «این مالِ من است، عمداً».",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Who reads them", fa: "چه کسی می‌خواندشان" },
              blocks: [
                {
                  type: "text",
                  en: "Three readers. JavaScript (`element.dataset.price`) — the engine of shopping carts, filters and tests. CSS (`[data-featured='true']` selectors) — style variants without extra classes. And you, six months later, when the markup still explains itself.",
                  fa: "سه خواننده. جاوااسکریپت (element.dataset.price) — موتورِ سبد خرید و فیلترها و تست‌ها. CSS (سلکتورِ [data-featured='true']) — حالت‌های ظاهری بدونِ کلاسِ اضافه. و خودِ تو، شش ماه بعد، وقتی مارک‌آپ هنوز خودش را توضیح می‌دهد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Data-driven row</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      tr[data-tier="pro"] { background: #ecfdf5; }
      tr[data-tier="pro"] td:first-child::after { content: " ⭐"; }
    </style>
  </head>
  <body>
    <h1>Plans</h1>
    <table border="1" cellpadding="8">
      <tr data-tier="basic"><td>Basic</td><td>$5</td></tr>
      <tr data-tier="pro"><td>Pro</td><td>$12</td></tr>
      <tr data-tier="team"><td>Team</td><td>$29</td></tr>
    </table>
  </body>
</html>`,
                  caption: {
                    en: "One attribute drives both the styling and (later) the JavaScript logic",
                    fa: "یک ویژگی، هم استایل را می‌رانَد و هم (بعداً) منطقِ جاوااسکریپت را",
                  },
                },
                {
                  type: "tip",
                  en: "Name data-* like tiny API fields: data-user-id, data-created-at. Future-JS-you will thank present-HTML-you.",
                  fa: "data-* را مثل فیلدهای یک API کوچک نام‌گذاری کن: data-user-id و data-created-at. جاوااسکریپتِ آینده از HTMLِ امروزت تشکر می‌کند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which is a VALID custom attribute?", fa: "کدام یک ویژگیِ سفارشیِ «معتبر» است؟" },
                  options: [
                    { en: "data-user-id='42'", fa: "data-user-id='42'" },
                    { en: "user-id='42'", fa: "user-id='42'" },
                    { en: "data user id='42'", fa: "data user id='42'" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Anything starting with data- is legal; made-up names are silently dropped by validators and tools.",
                    fa: "هر چیزی که با data- شروع شود قانونی است؛ نام‌های خودساخته را اعتبارسنج‌ها و ابزارها بی‌سروصدا کنار می‌گذارند.",
                  },
                },
                {
                  q: { en: "Where does machine-only info like an internal SKU live?", fa: "اطلاعاتِ مخصوصِ ماشین مثل SKUِ داخلی کجا زندگی می‌کند؟" },
                  options: [
                    { en: "In the visible text of the card", fa: "در متنِ قابل‌دیدنِ کارت" },
                    { en: "In a data-* attribute", fa: "در یک ویژگیِ data-*" },
                    { en: "In a made-up attribute like sku='…'", fa: "در یک ویژگیِ خودساخته مثل sku='…'" },
                    { en: "In the title attribute", fa: "در ویژگیِ title" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Display in text, machine data in data-*. That split keeps both audiences happy.",
                    fa: "نمایش در متن، داده‌ی ماشینی در data-*. همین تفکیک هر دو مخاطب را راضی نگه می‌دارد.",
                  },
                },
                {
                  q: { en: "Who can read data-* attributes?", fa: "چه کسی می‌تواند data-* را بخواند؟" },
                  options: [
                    { en: "Only JavaScript", fa: "فقط جاوااسکریپت" },
                    { en: "JavaScript, CSS selectors and validators — it is standard HTML", fa: "جاوااسکریپت و سلکتورهای CSS و اعتبارسنج‌ها — چون HTMLِ استاندارد است" },
                    { en: "Nobody — it works like a comment", fa: "هیچ‌کس — مثل کامنت عمل می‌کند" },
                  ],
                  answer: 1,
                  explain: {
                    en: "dataset in JS, [data-x] selectors in CSS, and full validator support.",
                    fa: "dataset در جاوااسکریپت، سلکتورهای [data-x] در CSS، و پشتیبانیِ کاملِ اعتبارسنج‌ها.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The smart shelf 🏷", fa: "قفسه‌ی هوشمند 🏷" },
              brief: {
                en: "Build a shelf of EXACTLY three product cards (three `div`s): each carries `data-name` (any value), `data-price` (a number like '9'), and an `h3` with the visible product name. One card also has `data-featured='true'`.",
                fa: "یک قفسه با دقیقاً سه کارتِ محصول بساز (سه `div`): هرکدام `data-name` (هر مقداری)، `data-price` (یک عدد مثل '9') و یک `h3` با نامِ قابل‌دیدنِ محصول دارد. یک کارت هم `data-featured='true'` دارد.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Smart shelf</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            .card { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; }
            [data-featured="true"] { border-color: #f59e0b; box-shadow: 0 0 0 3px #fde68a; }
        </style>
    </head>
    <body>
        <h1>Smart shelf</h1>
        <!-- TODO: each card gets data-name + data-price; one card gets data-featured="true" -->
        <div class="card">
            <h3>Espresso beans</h3>
            <p>$9 · 250g</p>
        </div>
        <!-- two more cards needed… -->
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Smart shelf</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            .card { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; }
            [data-featured="true"] { border-color: #f59e0b; box-shadow: 0 0 0 3px #fde68a; }
        </style>
    </head>
    <body>
        <h1>Smart shelf</h1>
        <div class="card" data-name="espresso" data-price="9">
            <h3>Espresso beans</h3>
            <p>$9 · 250g</p>
        </div>
        <div class="card" data-name="mug" data-price="14" data-featured="true">
            <h3>Studio mug</h3>
            <p>$14 · handmade</p>
        </div>
        <div class="card" data-name="filter" data-price="6">
            <h3>Paper filters</h3>
            <p>$6 · 100 sheets</p>
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "Attributes go on the opening tag: <div class='card' data-name='espresso' data-price='9'>.",
                  fa: "ویژگی‌ها روی تگِ آغازین می‌روند: <div class='card' data-name='espresso' data-price='9'>.",
                },
                {
                  en: "data-featured needs the EXACT value 'true' (lowercase) — the CSS and the checker both match it literally.",
                  fa: "مقدارِ data-featured باید دقیقاً 'true' باشد (حروفِ کوچک) — هم CSS هم چکر، آن را همین‌طوری مطابقت می‌دهند.",
                },
                {
                  en: "Each of the three cards keeps an <h3> with the visible name — data-* carries the machine info, the h3 carries the human info.",
                  fa: "هر سه کارت یک <h3> با نامِ قابل‌دیدن نگه می‌دارند — data-* اطلاعاتِ ماشینی را حمل می‌کند و h3 اطلاعاتِ آدمیزاد را.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "div[data-name]", count: 3 },
                  { selector: "div[data-price]", count: 3 },
                  { selector: "div[data-featured='true']", count: 1 },
                  { selector: "div h3", count: 3 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m14-l2",
          title: { en: "contenteditable, hidden & spellcheck", fa: "contenteditable و hidden و spellcheck" },
          goal: {
            en: "Turn any element into an editor, hide content the official way, and tame the red squiggles.",
            fa: "هر عنصری را به ویرایشگر تبدیل کنی، محتوا را رسمی مخفی کنی و خط‌های قرمز را رام کنی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              title: { en: "Every element is an editor", fa: "هر عنصری می‌تواند ویرایشگر باشد" },
              blocks: [
                {
                  type: "text",
                  en: "One attribute — `contenteditable='true'` — turns ANY element into a live text editor in the browser. It is the birthplace of every 'edit your bio' demo, and the base of real editors.",
                  fa: "یک ویژگی — `contenteditable='true'` — هر عنصری را به یک ویرایشگرِ زنده‌ی متن در مرورگر تبدیل می‌کند. زادگاهِ هر دموی «بیوگرافی‌ات را ویرایش کن» و پایه‌ی ویرایشگرهای واقعی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Editable card</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      article { background: white; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px 20px; }
      [contenteditable] { outline: none; border-bottom: 1px dashed #94a3b8; }
      [contenteditable]:focus { border-bottom-color: #0ea5e9; }
    </style>
  </head>
  <body>
    <article>
      <h2 contenteditable="true">Aria Nakamura</h2>
      <p contenteditable="true">Frontend student. Click this line and type — yes, really.</p>
      <p contenteditable="true" spellcheck="false">user_name_42</p>
    </article>
  </body>
</html>`,
                  caption: {
                    en: "Click any line in the preview and type — no form, no JavaScript",
                    fa: "در پیش‌نمایش روی هر خط کلیک کن و تایپ کن — بدونِ فرم و بدونِ جاوااسکریپت",
                  },
                },
                {
                  type: "text",
                  en: "`hidden` is the official OFF switch: `<p hidden>` removes the element from display AND from the accessibility tree. Different from details (folded but findable) — hidden means truly out of sight, until JavaScript removes the attribute.",
                  fa: "`hidden` کلیدِ رسمیِ خاموش است: `<p hidden>` عنصر را هم از نمایش حذف می‌کند هم از درختِ دسترس‌پذیری. فرقش با details (تاشده ولی پیداشدنی) این است — hidden یعنی واقعاً از نظر خارج، تا وقتی که جاوااسکریپت ویژگی را بردارد.",
                },
                {
                  type: "tip",
                  en: "`spellcheck='false'` on editable elements that hold code, usernames or URLs — kills the red squiggles under words that are not typos.",
                  fa: "روی عناصرِ قابل‌ویرایشی که کد، نامِ کاربری یا URL دارند `spellcheck='false'` بگذار — خط‌های قرمزِ زیرِ کلمه‌هایی که غلط املایی نیستند از بین می‌رود.",
                },
                {
                  type: "warn",
                  en: "Do not fight `hidden` with CSS: if you display that element with CSS anyway, the attribute's promise breaks and screen readers get contradicted. hidden is a contract — keep it.",
                  fa: "با CSS با `hidden` نجنگ: اگر آن عنصر را به‌هرترتیب با CSS نمایش بدهی، قولِ ویژگی می‌شکند و صفحه‌خوان دچار تناقض می‌شود. hidden یک قرارداد است — نگهش دار.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Choose the right tool", fa: "ابزارِ درست را انتخاب کن" },
              blocks: [
                {
                  type: "text",
                  en: "Three states of 'not shown', one table: `details` — folded but in the DOM and findable (user can open it). `hidden` — completely out of display and accessibility tree (only JS brings it back). `display:none` via CSS — visually gone, but you are fighting HTML's own switch; use the attribute when you mean it.",
                  fa: "سه حالتِ «نشان داده نمی‌شود»، یک جدول: `details` — تا شده ولی در DOM و پیداشدنی (کاربر می‌تواند بازش کند). `hidden` — کاملاً از نمایش و درختِ دسترس‌پذیری خارج (فقط JS برش می‌گرداند). و display:none با CSS — از نظرِ چشم رفته، ولی داری با کلیدِ خودِ HTML می‌جنگی؛ وقتی منظورت همین است، از ویژگی استفاده کن.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Three states</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      details { background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
      summary { font-weight: bold; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Three states of "not shown"</h1>
    <details>
      <summary>Folded — click to open</summary>
      <p>In the DOM, findable with Ctrl+F, openable by the user.</p>
    </details>
    <p hidden>This paragraph is hidden — only JavaScript can reveal it.</p>
    <p>You see exactly two things above this line. The hidden p is NOT one of them.</p>
  </body>
</html>`,
                  caption: {
                    en: "hidden removes the element completely — count the visible lines",
                    fa: "hidden عنصر را کامل حذف می‌کند — خط‌های قابل‌دیدن را بشمار",
                  },
                },
                {
                  type: "tip",
                  en: "Use case map: FAQ → details. Secret reveal after a click → hidden (toggled by JS). Editor prototype → contenteditable. Three attributes, zero overlap.",
                  fa: "نقشه‌ی کاربرد: FAQ → details. آشکارسازیِ مخفی با کلیک → hidden (که JS روشن و خاموش می‌کند). نمونه‌ی ویرایشگر → contenteditable. سه ویژگی، بدونِ هیچ هم‌پوشانی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which snippet makes a paragraph editable in the browser?", fa: "کدام قطعه کد، یک پاراگراف را در مرورگر قابل‌ویرایش می‌کند؟" },
                  options: [
                    { en: "<p contenteditable='true'>", fa: "<p contenteditable='true'>" },
                    { en: "<p editable>", fa: "<p editable>" },
                    { en: "<p content='editable'>", fa: "<p content='editable'>" },
                  ],
                  answer: 0,
                  explain: {
                    en: "contenteditable with value 'true' (or an empty value) — any other spelling is just an unknown attribute.",
                    fa: "contenteditable با مقدار 'true' (یا مقدارِ خالی) — هر املای دیگری فقط یک ویژگیِ ناشناخته است.",
                  },
                },
                {
                  q: { en: "Difference between <p hidden> and a folded <details>?", fa: "فرقِ <p hidden> با یک detailsِ تاشده چیست؟" },
                  options: [
                    { en: "hidden keeps it in the accessibility tree, details does not", fa: "hidden در درختِ دسترس‌پذیری نگه می‌دارد، details نه" },
                    { en: "hidden removes it from display AND the accessibility tree; a folded details stays in the DOM", fa: "hidden از نمایش و درختِ دسترس‌پذیری حذف می‌کند؛ detailsِ تاشده در DOM می‌ماند" },
                    { en: "There is no difference", fa: "فرقی نیست" },
                    { en: "details removes content from the DOM until opened", fa: "details تا باز نشود محتوا را از DOM حذف می‌کند" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Folded content waits to be revealed; hidden content is officially gone until JS returns it.",
                    fa: "محتوای تاشده منتظرِ آشکارشدن است؛ محتوای hidden رسمی رفته تا JS برگرداندش.",
                  },
                },
                {
                  q: { en: "spellcheck='false' is best for…", fa: "spellcheck='false' برای چه چیزی بهترین است؟" },
                  options: [
                    { en: "all paragraphs on every page", fa: "همه‌ی پاراگراف‌های هر صفحه" },
                    { en: "editable areas holding code, usernames or URLs", fa: "نواحیِ قابل‌ویرایشی که کد، نامِ کاربری یا URL دارند" },
                    { en: "images", fa: "تصاویر" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Squiggles help prose and hurt code. Toggle per element.",
                    fa: "خط‌های قرمز برای متنِ نثر کمک‌اند و برای کد آزار. برای هر عنصر جداگانه تنظیمش کن.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The editable profile card ✏️", fa: "کارتِ پروفایلِ قابل‌ویرایش ✏️" },
              brief: {
                en: "Build a profile card: an `article` containing an `h2` with `contenteditable='true'`, a `p` with `contenteditable='true'`, and one `p` with the `hidden` attribute (a secret tip).",
                fa: "یک کارتِ پروفایل بساز: یک `article` که داخلش یک `h2` با `contenteditable='true'`، یک `p` با `contenteditable='true'`، و یک `p` با ویژگیِ `hidden` (یک نکته‌ی مخفی) باشد.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Editable profile card</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            article { background: white; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px 20px; }
            [contenteditable] { outline: none; border-bottom: 1px dashed #94a3b8; }
        </style>
    </head>
    <body>
        <article>
            <!-- TODO 1) h2 with contenteditable="true" -->
            <h2>Aria Nakamura</h2>
            <!-- TODO 2) p with contenteditable="true" -->
            <p>Frontend student. Loves tiny HTML wins.</p>
            <!-- TODO 3) p with the hidden attribute (a secret tip) -->
        </article>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Editable profile card</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            article { background: white; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px 20px; }
            [contenteditable] { outline: none; border-bottom: 1px dashed #94a3b8; }
            [contenteditable]:focus { border-bottom-color: #0ea5e9; }
        </style>
    </head>
    <body>
        <article>
            <h2 contenteditable="true">Aria Nakamura</h2>
            <p contenteditable="true">Frontend student. Loves tiny HTML wins.</p>
            <p hidden>Secret tip: the h2 is editable too — try renaming yourself.</p>
        </article>
    </body>
</html>`,
              hints: [
                {
                  en: "Exactly: <h2 contenteditable='true'> — value 'true', lowercase, on the opening tag.",
                  fa: "دقیقاً این‌طوری: <h2 contenteditable='true'> — مقدارِ 'true' با حروفِ کوچک، روی تگِ آغازین.",
                },
                {
                  en: "The hidden paragraph is simply <p hidden>…</p> — no value needed.",
                  fa: "پاراگرافِ مخفی ساده‌تر است: <p hidden>…</p> — بدونِ مقدار.",
                },
                {
                  en: "Everything stays INSIDE the <article>…</article> — the checker queries article h2 and article p.",
                  fa: "همه‌چیز داخلِ <article>…</article> می‌ماند — چکر با article h2 و article p جست‌وجو می‌کند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "article", count: 1 },
                  { selector: "article h2[contenteditable='true']", count: 1 },
                  { selector: "article p[contenteditable='true']", count: 1 },
                  { selector: "article p[hidden]", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m14-l3",
          title: { en: "tabindex & the keyboard", fa: "tabindex و صفحه‌کلید" },
          goal: {
            en: "Make non-focusable elements keyboard-reachable — and learn why 0 beats 5.",
            fa: "عناصرِ بدون‌فوکوس را برای صفحه‌کلید قابل‌دسترس کنی — و بفهمی چرا 0 بهتر از 5 است.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "The Tab key is a map", fa: "کلیدِ Tab یک نقشه است" },
              blocks: [
                {
                  type: "text",
                  en: "Keyboard users (motor disabilities, power users, screen-reader jockeys) do not click — they TAB. Links, buttons and inputs are in the tab order natively. `div`s and `span`s are not: press Tab on a div-button and the focus sails past it.",
                  fa: "کاربرانِ صفحه‌کلید (معلولانِ حرکتی، پاورکاربرها، کاربرانِ صفحه‌خوان) کلیک نمی‌کنند — Tab می‌زنند. لینک و دکمه و اینپوت به‌طورِ طبیعی در ترتیبِ Tab هستند. `div` و `span` نیستند: روی یک دکمه‌ی div-ی Tab بزنی، فوکوس از کنارش رد می‌شود.",
                },
                {
                  type: "text",
                  en: "`tabindex` fixes that with three values: `tabindex='0'` — join the natural tab order (the good default); `tabindex='-1'` — focusable only by script or click, skipped by Tab (for programmatic focus); positive numbers like `tabindex='5'` — a manual order that overrides everything (avoid: it ages terribly).",
                  fa: "`tabindex` با سه مقدار این را حل می‌کند: `tabindex='0'` — بپیوند به ترتیبِ طبیعیِ Tab (پیش‌فرضِ خوب)؛ `tabindex='-1'` — فقط با اسکریپت یا کلیک فوکوس‌پذیر، از Tab می‌پرد (برای فوکوسِ برنامه‌ای)؛ اعدادِ مثبت مثل `tabindex='5'` — یک ترتیبِ دستی که همه‌چیز را Override می‌کند (اجتناب کن: با گذرِ زمان فاجعه می‌شود).",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Keyboard toolbar</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      span[role="button"] { display: inline-block; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 14px; margin-right: 8px; cursor: pointer; }
      span[role="button"]:focus { outline: 3px solid #0ea5e9; outline-offset: 2px; }
    </style>
  </head>
  <body>
    <h1>Keyboard toolbar</h1>
    <p>Press Tab — every chip takes its turn.</p>
    <span role="button" tabindex="0">✎ Edit</span>
    <span role="button" tabindex="0">🔍 Search</span>
    <span role="button" tabindex="0">⋮ More</span>
  </body>
</html>`,
                  caption: {
                    en: "Tab through the chips — a span with role+tabindex behaves like a button on the keyboard",
                    fa: "با Tab از بین چیپ‌ها رد شو — یک span با role و tabindex، روی صفحه‌کلید مثل دکمه رفتار می‌کند",
                  },
                },
                {
                  type: "tip",
                  en: "Best tabindex is usually NONE: put elements in the DOM in visual order and the browser builds the right map for free.",
                  fa: "بهترین tabindex معمولاً «هیچ» است: عناصر را به همان ترتیبی که دیده می‌شوند در DOM بچین تا مرورگر نقشه را مجانی و درست بسازد.",
                },
                {
                  type: "warn",
                  en: "tabindex only lights the door; it does not build the room. A `<span tabindex='0'>` gets focus but does nothing on Enter — real behavior needs role and (later) JavaScript.",
                  fa: "tabindex فقط چراغِ در را روشن می‌کند؛ اتاق را نمی‌سازد. یک `<span tabindex='0'>` فوکوس می‌گیرد ولی با Enter کاری نمی‌کند — رفتارِ واقعی به role و (بعداً) جاوااسکریپت نیاز دارد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Focus, made visible", fa: "فوکوس، قابل‌دیدن" },
              blocks: [
                {
                  type: "text",
                  en: "The focused element shows a FOCUS RING — the outline you see when tabbing. Keyboard users navigate by it like a cursor. Removing it 'because it looks ugly' blinds the whole keyboard audience.",
                  fa: "عنصرِ فوکوس‌شده یک «حلقه‌ی فوکوس» نشان می‌دهد — همان کادری که موقعِ Tab می‌بینی. کاربرانِ صفحه‌کلید با آن مثل نشانگر ناوبری می‌کنند. برداشتنِ آن «چون زشت است»، کلِ مخاطبِ صفحه‌کلید را کور می‌کند.",
                },
                {
                  type: "text",
                  en: "Where does `tabindex='-1'` earn its keep? Focusing things programmatically: a dialog that receives focus when it opens, a form error message the script jumps to. Tab skips it; scripts cannot.",
                  fa: "`tabindex='-1'` کجا به کار می‌آید؟ فوکوسِ برنامه‌ای: دیالوگی که موقعِ باز شدن فوکوس می‌گیرد، یا پیامِ خطای فرمی که اسکریپت به آن می‌پرد. Tab از آن رد می‌شود؛ اسکریپت‌ها نه.",
                },
                {
                  type: "tip",
                  en: "Audit habit: put the mouse away and Tab through your page top to bottom. If focus ever disappears or jumps weirdly, real users are already lost.",
                  fa: "عادتِ حسابرسی: موس را کنار بگذار و با Tab از اول تا آخرِ صفحه برو. اگر فوکوس یک‌جا گم شد یا عجیب پرید، کاربرهای واقعی همین حالا گم شده‌اند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which value makes a span join the NATURAL tab order?", fa: "کدام مقدار، یک span را به ترتیبِ «طبیعیِ» Tab می‌برد؟" },
                  options: [
                    { en: "tabindex='0'", fa: "tabindex='0'" },
                    { en: "tabindex='1'", fa: "tabindex='1'" },
                    { en: "tabindex='-1'", fa: "tabindex='-1'" },
                  ],
                  answer: 0,
                  explain: {
                    en: "0 = 'treat me like a native focusable element, in DOM order.'",
                    fa: "0 یعنی «مثل یک عنصرِ بومیِ فوکوس‌پذیر، به ترتیبِ DOM با من رفتار کن.»",
                  },
                },
                {
                  q: { en: "tabindex='-1' means…", fa: "یعنی tabindex='-1'…" },
                  options: [
                    { en: "the element is removed from the DOM", fa: "عنصر از DOM حذف می‌شود" },
                    { en: "focusable by script or click only — Tab skips it", fa: "فقط با اسکریپت یا کلیک فوکوس‌پذیر — Tab از آن رد می‌شود" },
                    { en: "first in the tab order", fa: "اول در ترتیبِ Tab" },
                    { en: "the element is disabled", fa: "عنصر غیرفعال می‌شود" },
                  ],
                  answer: 1,
                  explain: {
                    en: "-1 is for programmatic focus: dialogs, error targets, skip targets.",
                    fa: "1- برای فوکوسِ برنامه‌ای است: دیالوگ‌ها، مقصدِ خطاها، مقصدِ پرش‌ها.",
                  },
                },
                {
                  q: { en: "A page whose DOM order matches the visual order needs…", fa: "صفحه‌ای که ترتیبِ DOM‌اش با ترتیبِ دیداری می‌خواند، به چه چیزی نیاز دارد؟" },
                  options: [
                    { en: "no tabindex at all — DOM order carries it", fa: "هیچ tabindexای — ترتیبِ DOM خودش کفایت می‌کند" },
                    { en: "tabindex 1, 2, 3… on everything", fa: "tabindex با اعدادِ ۱ و ۲ و ۳ روی همه‌چیز" },
                    { en: "tabindex='0' on every single element", fa: "tabindex='0' روی تک‌تکِ عناصر" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Positive tabindexes are a maintenance trap; natural order needs none.",
                    fa: "tabindexهای مثبت دامِ نگهداری‌اند؛ ترتیبِ طبیعی به هیچ‌کدام نیاز ندارد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The tab-friendly toolbar ⌨️", fa: "نوارِ ابزارِ دوستدارِ Tab ⌨️" },
              brief: {
                en: "Build a `nav` toolbar containing EXACTLY three `<span>` items with `role='button'` AND `tabindex='0'` (icon + word, e.g. ✎ Edit), plus one `<div tabindex='-1'>` holding a short tip.",
                fa: "یک `nav` به‌عنوانِ نوارِ ابزار بساز که دقیقاً سه `<span>` با `role='button'` و `tabindex='0'` در آن باشد (آیکون + کلمه، مثل ✎ Edit)، به‌علاوه‌ی یک `<div tabindex='-1'>` با یک نکته‌ی کوتاه.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Keyboard toolbar</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            span[role="button"] { display: inline-block; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 14px; margin-right: 8px; cursor: pointer; }
            span[role="button"]:focus { outline: 3px solid #0ea5e9; outline-offset: 2px; }
        </style>
    </head>
    <body>
        <h1>Keyboard toolbar</h1>
        <!-- TODO: nav with EXACTLY three spans: role="button" + tabindex="0" -->
        <!-- TODO: one div with tabindex="-1" holding a short tip -->
        <span>✎ Edit</span>
        <span>🔍 Search</span>
        <span>⋮ More</span>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Keyboard toolbar</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            span[role="button"] { display: inline-block; background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 14px; margin-right: 8px; cursor: pointer; }
            span[role="button"]:focus { outline: 3px solid #0ea5e9; outline-offset: 2px; }
        </style>
    </head>
    <body>
        <h1>Keyboard toolbar</h1>
        <nav aria-label="Editor actions">
            <span role="button" tabindex="0">✎ Edit</span>
            <span role="button" tabindex="0">🔍 Search</span>
            <span role="button" tabindex="0">⋮ More</span>
        </nav>
        <div tabindex="-1">Tip: press Tab to move, Enter to activate — once JavaScript is wired.</div>
    </body>
</html>`,
              hints: [
                {
                  en: "Each chip needs BOTH: <span role='button' tabindex='0'>✎ Edit</span> — role alone is not focusable.",
                  fa: "هر چیپ «هر دو» را لازم دارد: <span role='button' tabindex='0'>✎ Edit</span> — role به‌تنهایی فوکوس‌پذیر نیست.",
                },
                {
                  en: "The tip box: <div tabindex='-1'>…</div> — focusable by script, skipped by Tab.",
                  fa: "جعبه‌ی نکته: <div tabindex='-1'>…</div> — با اسکریپت فوکوس‌پذیر، از Tab می‌پرد.",
                },
                {
                  en: "The three spans must be INSIDE the <nav> — the checker counts nav span[role='button'].",
                  fa: "سه span باید «داخلِ» <nav> باشند — چکر nav span[role='button'] را می‌شمارد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "nav", count: 1 },
                  { selector: "nav span[role='button']", count: 3 },
                  { selector: "nav span[tabindex='0']", count: 3 },
                  { selector: "div[tabindex='-1']", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m14-l4",
          title: { en: "First ARIA: labels, hidden, expanded", fa: "نخستین ARIA: label و hidden و expanded" },
          goal: {
            en: "Name icon buttons, silence decoration, and mark expanders with your first aria-* attributes.",
            fa: "دکمه‌های آیکونی را نام‌گذاری کنی، تزئینات را ساکت کنی و بازشونده‌ها را با نخستین ویژگی‌های aria-* علامت بزنی.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              title: { en: "When HTML is not enough", fa: "وقتی HTML کافی نیست" },
              blocks: [
                {
                  type: "text",
                  en: "ARIA (Accessible Rich Internet Applications) is a set of attributes that add MEANING for assistive technology when plain HTML cannot express it. Golden rule: native HTML first — a real `<button>` beats ARIA on a div every time. ARIA is the seasoning, not the meal.",
                  fa: "ARIA (اکسریا —Accessible Rich Internet Applications) مجموعه‌ای از ویژگی‌هاست که وقتی HTMLِ ساده معنا را نمی‌رساند، آن را برای فناوری‌های یاری‌رسان اضافه می‌کند. قانونِ طلایی: اول HTMLِ بومی — یک `<button>` واقعی همیشه از ARIA روی div برنده است. ARIA چاشنی است، نه غذا.",
                },
                {
                  type: "text",
                  en: "`aria-label` gives an element its spoken NAME when visible text is missing or unclear — the classic case: an icon-only button. `<button aria-label='Close'>×</button>` is announced as 'Close button', not 'times button' or just 'button'.",
                  fa: "`aria-label` به عنصر «نامِ گفتاری» می‌دهد وقتی متنِ قابل‌دیدن نیست یا گویا نیست — حالتِ کلاسیک: دکمه‌ی فقط‌آیکونی. `<button aria-label='Close'>×</button>` به‌صورتِ «دکمه‌ی Close» اعلام می‌شود، نه «دکمه‌ی ضربدر» و نه فقط «دکمه».",
                },
                {
                  type: "text",
                  en: "`aria-hidden='true'` mutes an element for screen readers while keeping it visible — for pure decoration: ✨ sparkles, divider arrows, repeated icons. The eye may enjoy it; the ear must not trip on it.",
                  fa: "`aria-hidden='true'` عنصر را برای صفحه‌خوان بی‌صدا می‌کند ولی دیده می‌ماند — برای تزئینِ خالص: ستاره‌های ✨، فلش‌های جداکننده، آیکون‌های تکراری. چشم لذت ببرد؛ گوش روی آن نلغزد.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Polite toolbar</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      nav { display: flex; gap: 8px; align-items: center; }
      button { padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }
      button:focus { outline: 3px solid #0ea5e9; outline-offset: 2px; }
    </style>
  </head>
  <body>
    <h1>Document</h1>
    <nav aria-label="Document actions">
      <button aria-label="Close">✕</button>
      <button aria-label="Search">🔍</button>
      <button aria-label="More options" aria-expanded="false">⋮</button>
      <span aria-hidden="true">✨✨✨</span>
    </nav>
  </body>
</html>`,
                  caption: {
                    en: "Icon buttons speak via aria-label; the sparkles stay silent via aria-hidden",
                    fa: "دکمه‌های آیکونی با aria-label حرف می‌زنند؛ ستاره‌ها با aria-hidden ساکت می‌مانند",
                  },
                },
                {
                  type: "tip",
                  en: "Never say 'button' or 'image' inside aria-label — the role is announced automatically. 'Close', not 'Close button'.",
                  fa: "داخلِ aria-label هیچ‌وقت کلمه‌ی button یا image ننویس — نقش خودکار اعلام می‌شود. بگو 'Close'، نه 'Close button'.",
                },
                {
                  type: "warn",
                  en: "aria-label is INVISIBLE. It never replaces visible text — and where both exist, it OVERRIDES the text as the accessible name, so never let it contradict what the eye reads.",
                  fa: "aria-label «نامرئی» است. هیچ‌وقت جای متنِ قابل‌دیدن را نمی‌گیرد — و هرجا هر دو باشند، به‌عنوانِ نامِ قابل‌دسترس روی متن «Override» می‌شود؛ پس نگذار با آنچه چشم می‌خواند تناقض داشته باشد.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "aria-expanded: the open sign", fa: "aria-expanded: تابلوی «باز است»" },
              blocks: [
                {
                  type: "text",
                  en: "When a control opens and closes something (menu, accordion), add `aria-expanded='true'` or `'false'` to the CONTROL itself. Screen readers then announce 'More options, collapsed button' — state, spoken.",
                  fa: "وقتی یک کنترل چیزی را باز و بسته می‌کند (منو، آکاردئون)، به «خودِ کنترل» `aria-expanded='true'` یا `'false'` بده. آن‌وقت صفحه‌خوان اعلام می‌کند «More options، دکمه‌ی بسته» — یعنی حالت، گفتار می‌شود.",
                },
                {
                  type: "text",
                  en: "Native `<details>` does this for you — its summary reports the expanded state automatically. aria-expanded is for CUSTOM controls: div-menus, JS accordions, burger buttons.",
                  fa: "`<details>` بومی این را خودش انجام می‌دهد — summaryاش حالتِ باز/بسته را خودکار اعلام می‌کند. aria-expanded برای کنترل‌های «دست‌ساز» است: منوهای div، آکاردئون‌های JS، دکمه‌های همبرگری.",
                },
                {
                  type: "tip",
                  en: "Three ARIA friends to start: aria-label (name), aria-hidden (mute), aria-expanded (state). A dozen more exist — you will meet them only when HTML truly cannot say it.",
                  fa: "سه دوستِ ARIA برای شروع: aria-label (نام)، aria-hidden (سکوت)، aria-expanded (حالت). بالای ده‌تای دیگر هم هست — فقط وقتی HTML واقعاً نتواند بگوید، با آنها آشنا می‌شوی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "An icon-only button shows '🔍'. Its accessible name should come from…", fa: "یک دکمه‌ی فقط‌آیکونی '🔍' نشان می‌دهد. نامِ قابل‌دسترسش باید از … بیاید." },
                  options: [
                    { en: "aria-label='Search'", fa: "aria-label='Search'" },
                    { en: "the emoji itself", fa: "خودِ ایموجی" },
                    { en: "nothing — icons need no name", fa: "هیچ‌جا — آیکون به نام نیاز ندارد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Icon-only controls MUST carry an aria-label; emojis announce as unpredictable words.",
                    fa: "کنترل‌های فقط‌آیکونی «باید» aria-label داشته باشند؛ ایموجی‌ها به شکلِ کلمه‌های غیرقابل‌پیش‌بینی خوانده می‌شوند.",
                  },
                },
                {
                  q: { en: "aria-hidden='true' on a decorative span means…", fa: "aria-hidden='true' روی یک span تزئینی یعنی…" },
                  options: [
                    { en: "removed from the DOM", fa: "از DOM حذف می‌شود" },
                    { en: "still visible, but silent for screen readers", fa: "همچنان دیده می‌شود، ولی برای صفحه‌خوان بی‌صدا است" },
                    { en: "invisible to everyone", fa: "برای همه نامرئی است" },
                    { en: "not focusable by Tab", fa: "با Tab فوکوس نمی‌گیرد" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Eyes keep it, ears lose it. Pure decoration, zero noise.",
                    fa: "چشم نگه می‌دارد، گوش نمی‌شنود. تزئینِ خالص، بدونِ هیچ سر‌وصدایی.",
                  },
                },
                {
                  q: { en: "aria-expanded belongs on…", fa: "aria-expanded جای آن است که روی … باشد." },
                  options: [
                    { en: "the control that opens and closes the thing", fa: "کنترلی که چیزی را باز و بسته می‌کند" },
                    { en: "the thing that gets opened", fa: "چیزی که باز می‌شود" },
                    { en: "the page body", fa: "بدنه‌ی صفحه" },
                  ],
                  answer: 0,
                  explain: {
                    en: "State lives on the control: 'Menu, collapsed button'.",
                    fa: "حالت روی کنترل زندگی می‌کند: «منو، دکمه‌ی بسته».",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The polite toolbar 🤝", fa: "نوارِ ابزارِ مؤدبانه 🤝" },
              brief: {
                en: "Build a `nav` toolbar with EXACTLY three `<button>`s, each with its own `aria-label` (icon symbols as text, e.g. ✕, 🔍, ⋮). One button must have `aria-label='Close'`, one must carry `aria-expanded='false'`, and add one decorative `<span aria-hidden='true'>`.",
                fa: "یک `nav` به‌عنوانِ نوارِ ابزار با دقیقاً سه `<button>` بساز که هرکدام `aria-label` خودش را دارند (نمادِ آیکون به‌جای متن، مثل ✕ و 🔍 و ⋮). یک دکمه باید `aria-label='Close'` داشته باشد، یکی باید `aria-expanded='false'` داشته باشد، و یک `<span aria-hidden='true'>` تزئینی هم اضافه کن.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Polite toolbar</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            nav { display: flex; gap: 8px; align-items: center; }
            button { padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }
        </style>
    </head>
    <body>
        <h1>Document</h1>
        <!-- TODO: nav with three buttons — each needs aria-label;
             one must be aria-label="Close", one needs aria-expanded="false";
             plus one <span aria-hidden="true"> with decoration -->
        <nav>
            <button>✕</button>
            <button>🔍</button>
            <button>⋮</button>
        </nav>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Polite toolbar</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            nav { display: flex; gap: 8px; align-items: center; }
            button { padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }
            button:focus { outline: 3px solid #0ea5e9; outline-offset: 2px; }
        </style>
    </head>
    <body>
        <h1>Document</h1>
        <nav aria-label="Document actions">
            <button aria-label="Close">✕</button>
            <button aria-label="Search">🔍</button>
            <button aria-label="More options" aria-expanded="false">⋮</button>
            <span aria-hidden="true">✨✨✨</span>
        </nav>
    </body>
</html>`,
              hints: [
                {
                  en: "Every button gets its own aria-label: <button aria-label='Close'>✕</button>. Three labels, three buttons.",
                  fa: "هر دکمه aria-label خودش را می‌گیرد: <button aria-label='Close'>✕</button>. سه دکمه، سه label.",
                },
                {
                  en: "The expander: <button aria-label='More options' aria-expanded='false'>⋮</button> — state on the control.",
                  fa: "بازشونده: <button aria-label='More options' aria-expanded='false'>⋮</button> — حالت روی خودِ کنترل.",
                },
                {
                  en: "Decoration: <span aria-hidden='true'>✨✨✨</span> — visible, silent.",
                  fa: "تزئین: <span aria-hidden='true'>✨✨✨</span> — دیده می‌شود، صدایی ندارد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "nav button[aria-label]", count: 3 },
                  { selector: "button[aria-label='Close']", count: 1 },
                  { selector: "button[aria-expanded='false']", count: 1 },
                  { selector: "nav span[aria-hidden='true']", count: 1 },
                ],
              },
            },
          ],
        },
      ],
    },

    // ─── Module 15 ───────────────────────────────────────────
    {
      id: "html-m15",
      title: { en: "SEO & Metadata", fa: "سئو و فراداده" },
      blurb: {
        en: "Heading outlines, robots, canonical, full share cards and the professional head — get found, get clicked.",
        fa: "نقشه‌ی تیترها و robots و canonical و کارتِ اشتراکِ کامل و headِ حرفه‌ای — پیدا شو، کلیک بگیر.",
      },
      lessons: [
        {
          id: "html-m15-l1",
          title: { en: "One h1, honest outline", fa: "یک h1، نقشه‌ی صادقانه" },
          goal: {
            en: "Structure your headings so both Google and a skimming human grasp the page in seconds.",
            fa: "تیترها را آن‌قدر منظم بچینی که هم گوگل و هم یک خواننده‌ی عجول، صفحه را در چند ثانیه بفهمد.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "Headings are the table of contents", fa: "تیترها همان فهرستِ مطالب‌اند" },
              blocks: [
                {
                  type: "text",
                  en: "Google does not 'see' your page like a picture — it READS it. And the first thing it reads to understand the page is the heading outline: h1, h2, h3... like a book's table of contents. The h1 is the promise of the whole page (one per page!), each h2 is a chapter, each h3 a sub-point. Get this outline right and both Google and skimming humans instantly know what you offer.",
                  fa: "گوگل صفحه‌ات را مثل عکس «نمی‌بیند» — آن را می‌خواند. و نخستین چیزی که برای فهمیدنِ موضوعِ صفحه می‌خواند، نقشه‌ی تیترهاست: h1 و h2 و h3... درست مثل فهرستِ یک کتاب. h1 قولِ کلِ صفحه است (در هر صفحه فقط یکی!)، هر h2 یک فصل است و هر h3 یک زیرموضوع. این نقشه را درست بچین تا هم گوگل و هم خواننده‌ی عجول، همان اول بفهمد چه چیزی به آن‌ها پیشنهاد می‌دهی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Slow Coffee — Brewing Guide</title>
  </head>
  <body>
    <h1>The Slow Coffee Guide</h1>
    <p>Everything we learned in two years of brewing.</p>

    <h2>Choosing your beans</h2>
    <p>Origin and roast level change everything.</p>
    <h3>Arabica vs Robusta</h3>
    <p>Two plants, two personalities.</p>

    <h2>Brewing methods</h2>
    <p>Four ways from simple to ceremonial.</p>
    <h3>Pour over</h3>
    <p>Patience, a kettle and a gooseneck spout.</p>
  </body>
</html>`,
                  caption: {
                    en: "Read only the headings — they already tell the whole story",
                    fa: "فقط تیترها را بخوان — خودشان کلِ ماجرا را می‌گویند",
                  },
                },
                {
                  type: "text",
                  en: "The rule of the ladder: h1 → h2 → h3, no skipping. If you jump from h1 straight to h4, the outline breaks — it reads like a book where chapter 1 is followed by chapter 7. Want a smaller heading? That is CSS's job (font-size), never a reason to pick a deeper level.",
                  fa: "قانونِ نردبان: از h1 به h2 و بعد h3 — بدونِ پرش. اگر از h1 بپری روی h4، نقشه می‌شکند؛ مثل کتابی که بعد از فصلِ ۱ ناگهان فصلِ ۷ بیاید. تیترِ کوچک‌تری می‌خواهی؟ کارِ CSS است (font-size) — هرگز دلیلِ انتخابِ سطحِ عمیق‌تر نیست.",
                },
                {
                  type: "warn",
                  en: "Keyword stuffing is the oldest SEO sin: 'coffee coffee best coffee cheap coffee'. Google penalizes it, humans smell it. Write headings for a curious human; search engines reward exactly that.",
                  fa: "حشوِ کلمه‌ی کلیدی، قدیمی‌ترین گناهِ سئوست: «قهوه قهوه بهترین قهوه قهوه ارزان». هم گوگل جریمه‌اش می‌کند و هم آدم‌ها بو می‌برند. تیترها را برای یک انسانِ کنجکاو بنویس؛ موتورهای جست‌وجو دقیقاً همان را پاداش می‌دهند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The skim test", fa: "آزمونِ تندخوانی" },
              blocks: [
                {
                  type: "text",
                  en: "Here is the test professionals run: ignore all body text and read ONLY the headings, top to bottom. If that skeleton alone tells a sensible story — what this is, for whom, which chapters — your outline is honest. If it reads like noise, no meta tag in the world will save it.",
                  fa: "آزمونی که حرفه‌ای‌ها می‌گیرند این است: همه‌ی متنِ بدنه را کور کن و فقط تیترها را از بالا به پایین بخوان. اگر همین اسکلت، یک داستانِ بامعنا تعریف کرد — این چیست، برای کیست، کدام فصل‌ها را دارد — نقشه‌ات صادقانه است. اگر نامربوط و آشفته بود، هیچ متاتگی در دنیا نجاتش نمی‌دهد.",
                },
                {
                  type: "text",
                  en: "One h1 per page, always. The h1 is the page's contract with the visitor: 'this page is about X'. Two h1s means two contracts, and Google quietly picks one — not necessarily yours. Every other heading is h2 or deeper.",
                  fa: "در هر صفحه فقط یک h1، همیشه. h1 قراردادِ صفحه با بازدیدکننده است: «این صفحه درباره‌ی X است». دو تا h1 یعنی دو قرارداد؛ و گوگل بی‌سروصدا یکی را انتخاب می‌کند — لزوماً آن که تو خواسته‌ای. همه‌ی تیترهای دیگر h2 یا عمیق‌ترند.",
                },
                {
                  type: "tip",
                  en: "Put the page's main keyword ONCE, naturally, in the h1 — 'Sourdough 101: the 24-hour loaf' beats 'Home'. Then let the h2s carry the sub-topics. Natural beats clever.",
                  fa: "کلمه‌ی کلیدیِ اصلیِ صفحه را یک بار، طبیعی، داخلِ h1 بگذار — «سوردم ۱۰۱: نانِ ۲۴ ساعته» از «خانه» خیلی بهتر است. بعد بگذار h2ها موضوع‌های فرعی را حمل کنند. طبیعی‌بودن از باهوش‌بودن بهتر است.",
                },
                {
                  type: "text",
                  en: "And a bridge to the next lessons: the heading outline is the BODY half of SEO. The HEAD half — title, description, robots, canonical — is where the next three lessons live.",
                  fa: "و پلی به درس‌های بعد: نقشه‌ی تیترها نیمه‌ی «بدنِ» سئوست. نیمه‌ی «سر» — title و description و robots و canonical — خانه‌ی سه درسِ بعدی است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "How many h1 elements does a well-structured page have?", fa: "یک صفحه‌ی خوش‌ساختار چند تا h1 دارد؟" },
                  options: [
                    { en: "Exactly one", fa: "دقیقاً یکی" },
                    { en: "One per section", fa: "به‌اندازه‌ی هر بخش" },
                    { en: "As many as you like", fa: "هرچقدر که دوست داشتی" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The h1 is the page's contract; two contracts and Google picks one for you.",
                    fa: "h1 قراردادِ صفحه با بازدیدکننده است؛ دو قرارداد یعنی گوگل خودش یکی را انتخاب می‌کند.",
                  },
                },
                {
                  q: { en: "You want a visually smaller heading inside a section. You should…", fa: "داخلِ یک بخش تیتری کوچک‌تر از نظرِ ظاهری می‌خواهی. باید…" },
                  options: [
                    { en: "use h4, because it is smaller", fa: "از h4 استفاده کنی چون کوچک‌تر است" },
                    { en: "keep h2 and shrink it with CSS", fa: "همان h2 را نگه داری و با CSS کوچکش کنی" },
                    { en: "use a p with bold text", fa: "از p با متنِ درشت استفاده کنی" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Outline depth means MEANING; size means CSS. Never mix the two jobs.",
                    fa: "عمقِ نردبان یعنی «معنا»؛ اندازه یعنی CSS. هرگز این دو کار را با هم قاطی نکن.",
                  },
                },
                {
                  q: { en: "The 'skim test' means…", fa: "«آزمونِ تندخوانی» یعنی…" },
                  options: [
                    { en: "read only the meta description", fa: "فقط متا دیسکریپشن را بخوانی" },
                    { en: "read only the headings, top to bottom", fa: "فقط تیترها را از بالا به پایین بخوانی" },
                    { en: "count the keywords per paragraph", fa: "تعدادِ کلمه‌های کلیدیِ هر پاراگراف را بشماری" },
                  ],
                  answer: 1,
                  explain: {
                    en: "If the headings alone tell the story, the outline is honest.",
                    fa: "اگر فقط تیترها داستان را بگویند، نقشه صادقانه است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The skimmable article 🗞️", fa: "مقاله‌ی تندخوان 🗞️" },
              brief: {
                en: "Build a travel article: EXACTLY one `h1` containing the word Travel, AT LEAST two `h2` chapter headings, and at least one `h3`. Ladder order only — no skipping.",
                fa: "یک مقاله‌ی سفر بساز: دقیقاً یک `h1` که کلمه‌ی Travel را دارد، دست‌کم دو `h2` به‌عنوانِ تیترِ فصل‌ها و دست‌کم یک `h3`. فقط پله‌به‌پله — بدونِ پرش.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Skim test</title>
    </head>
    <body>
        <h1>My Trip to the North</h1>
        <p>TODO: the outline — exactly one h1 containing the word Travel,
           two h2 chapters, and at least one h3. Ladder order only.</p>

        <h2>Day one</h2>
        <p>TODO: add the second h2 chapter and at least one h3 sub-point.</p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Skim test</title>
    </head>
    <body>
        <h1>Travel Diary: Three Days in the North</h1>
        <p>A weekend that smelled of pine and cardamom tea.</p>

        <h2>Day one — the road</h2>
        <p>Two hundred curves, one unforgettable valley.</p>
        <h3>The forest detour</h3>
        <p>We followed a dirt sign and found a waterfall.</p>

        <h2>Day two — the lake</h2>
        <p>Canoes, fog, and the best breakfast of the trip.</p>
    </body>
</html>`,
              hints: [
                {
                  en: "The h1 carries the main keyword: <h1>Travel Diary: ...</h1> — exactly one on the page.",
                  fa: "h1 کلمه‌ی کلیدیِ اصلی را حمل می‌کند: <h1>Travel Diary: ...</h1> — در کلِ صفحه فقط یکی.",
                },
                {
                  en: "Chapters are h2: <h2>Day one — the road</h2> ... you need at least two.",
                  fa: "فصل‌ها h2 هستند: <h2>Day one — the road</h2> ... دست‌کم دو تا لازم است.",
                },
                {
                  en: "A sub-point inside a chapter: <h3>The forest detour</h3> — one level deeper, no skipping.",
                  fa: "یک زیرموضوع داخلِ فصل: <h3>The forest detour</h3> — یک پله عمیق‌تر، بدونِ پرش.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "h1", count: 1 },
                  { selector: "h1", text: "travel" },
                  { selector: "h2", count: 2 },
                  { selector: "h3", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m15-l2",
          title: { en: "robots & canonical: invite or shoo", fa: "robots و canonical: دعوت کن یا جلویش را بگیر" },
          goal: {
            en: "Keep private pages out of Google and merge duplicate URLs with robots and canonical.",
            fa: "صفحه‌های خصوصی را از گوگل دور کنی و آدرس‌های تکراری را با robots و canonical یکی کنی.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "The bouncer at your door", fa: "بیرون‌کننده‌ی پشتِ در" },
              blocks: [
                {
                  type: "text",
                  en: "By default every page you publish is offered to search engines: they may list it and follow its links. The `robots` meta tag is your bouncer: `<meta name='robots' content='noindex'>` means 'do not list this page'; `nofollow` adds 'and do not trust its links'. Together: `noindex, nofollow`. The default behavior is `index, follow` — you only write the tag to opt out.",
                  fa: "به‌طورِ پیش‌فرض هر صفحه‌ای که منتشر می‌کنی به موتورهای جست‌وجو پیشنهاد می‌شود: اجازه دارند فهرستش کنند و لینک‌هایش را دنبال کنند. متاتگِ `robots` بیرون‌کننده‌ی پشتِ در توست: `<meta name='robots' content='noindex'>` یعنی «این صفحه را فهرست نکن»؛ `nofollow` اضافه می‌کند «و لینک‌هایش را هم دنبال نکن». با هم: `noindex, nofollow`. رفتارِ پیش‌فرض `index, follow` است — تگ را فقط برای خارج‌شدن از این قرارداد می‌نویسی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Order confirmed — Meadow Bakery</title>
    <meta name="robots" content="noindex">
  </head>
  <body>
    <h1>Thanks for your order! 🎉</h1>
    <p>Your sourdough ships tomorrow at 7:00.</p>
    <p>This page is private: search engines skip it, your inbox links to it.</p>
  </body>
</html>`,
                  caption: {
                    en: "A thank-you page nobody should find via Google",
                    fa: "صفحه‌ی تشکری که هیچ‌کس نباید از راهِ گوگل پیدایش کند",
                  },
                },
                {
                  type: "text",
                  en: "Where noindex earns its salary: order confirmations, admin dashboards, staging previews, internal search results, print versions. Anything with 'private' written on it in invisible ink.",
                  fa: "کجاها noindex حقوقش را می‌گیرد: صفحه‌های تأییدِ سفارش و پنلِ مدیریت و پیش‌نمایشِ نسخه‌ی آزمایشی و نتایجِ جست‌وجوی داخلی و نسخه‌های چاپی. هرچه با جوهرِ نامرئی رویش «خصوصی» نوشته شده.",
                },
                {
                  type: "warn",
                  en: "The horror story: a whole company once noindexed their own homepage for months — traffic flatlined and nobody noticed. Before shipping a robots tag, ask: do I WANT Google to forget this page exists?",
                  fa: "داستانِ ترسناک: یک شرکتِ کامل، مدت‌ها noindex را روی صفحه‌ی نخستِ خودشان گذاشته بودند — ترافیک به صفر رسید و کسی هم نفهمید. قبل از انتشارِ تگِ robots از خودت بپرس: می‌خواهم گوگل فراموش کند این صفحه اصلاً وجود دارد؟",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "One address, one page", fa: "یک آدرس، یک صفحه" },
              blocks: [
                {
                  type: "text",
                  en: "Now the opposite problem: pages that exist TOO many times. `.../bread?color=red`, `.../bread?color=blue`, `.../bread?utm=tweet` — one real page, four URLs. Google sees copies and splits its trust between them, so NONE ranks well. Duplicate content is not a penalty; it is a dilution.",
                  fa: "حالا مشکلِ برعکس: صفحه‌هایی که بیش از حد وجود دارند. `.../bread?color=red` و `.../bread?color=blue` و `.../bread?utm=tweet` — یک صفحه‌ی واقعی، چهار آدرس. گوگل کپی‌ها را می‌بیند و اعتمادش را بین‌شان تقسیم می‌کند؛ در نتیجه هیچ‌کدام خوب رتبه نمی‌گیرد. محتوای تکراری جریمه نیست؛ رقیق‌شدن است.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sourdough 101 — Meadow Bakery</title>
    <link rel="canonical" href="https://meadowbakery.example/bread">
  </head>
  <body>
    <h1>Sourdough 101</h1>
    <p>Reached here from a promo link with coupons and filters?
       This line tells Google: the real address is the one above.</p>
  </body>
</html>`,
                  caption: {
                    en: "canonical: the official address, declared on every copy",
                    fa: "canonical: آدرسِ رسمی که روی هر کپی اعلام می‌شود",
                  },
                },
                {
                  type: "text",
                  en: "`<link rel='canonical' href='https://site.example/bread'>` whispers to every crawler: 'whatever URL you reached, the master copy lives here — give THIS address the credit.' Every copy carries the same line, pointing at the one true URL.",
                  fa: "`<link rel='canonical' href='https://site.example/bread'>` برای هر خزنده زمزمه می‌کند: «با هر آدرسی که رسیدی، نسخه‌ی اصلی آن‌جاست؛ اعتبار را به همین آدرس بده.» همه‌ی کپی‌ها همین یک خط را دارند و به همان یک آدرسِ درست اشاره می‌کنند.",
                },
                {
                  type: "tip",
                  en: "robots and canonical solve opposite problems: robots = 'keep this page OUT of results' (an order), canonical = 'many URLs, one true page' (a hint). Real sites use both.",
                  fa: "robots و canonical دو مشکلِ متضاد را حل می‌کنند: robots یعنی «این صفحه را از نتایج بیرون نگه دار» (دستور) و canonical یعنی «آدرس‌های زیاد، یک صفحه‌ی اصلی» (راهنما). سایت‌های واقعی از هر دو استفاده می‌کنند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "`<meta name='robots' content='noindex'>` on a page means…", fa: "متاتگِ robots با مقدارِ noindex روی یک صفحه یعنی…" },
                  options: [
                    { en: "search engines must not list it", fa: "موتورهای جست‌وجو نباید آن را فهرست کنند" },
                    { en: "the page is deleted from the server", fa: "صفحه از سرور حذف می‌شود" },
                    { en: "users cannot open the page", fa: "کاربرها نمی‌توانند صفحه را باز کنند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "noindex only removes the page from search results; visitors and the page itself are untouched.",
                    fa: "noindex فقط صفحه را از نتایجِ جست‌وجو بیرون می‌آورد؛ نه کاربرها و نه خودِ صفحه دست می‌خورند.",
                  },
                },
                {
                  q: { en: "Four URLs show the same product page. The fix is…", fa: "چهار آدرس، یک صفحه‌ی محصول را نشان می‌دهند. راه‌حل چیست؟" },
                  options: [
                    { en: "delete three of the pages", fa: "سه صفحه را حذف کنی" },
                    { en: "noindex all four", fa: "هر چهار تا را noindex کنی" },
                    { en: "add a canonical link pointing to the master URL", fa: "یک canonical اضافه کنی که به آدرسِ اصلی اشاره کند" },
                  ],
                  answer: 2,
                  explain: {
                    en: "canonical gathers all the trust at one address — the pages stay, the duplicates stop diluting.",
                    fa: "canonical همه‌ی اعتماد را سرِ یک آدرس جمع می‌کند — صفحه‌ها می‌مانند و کپی‌ها دیگر اعتبار را رقیق نمی‌کنند.",
                  },
                },
                {
                  q: { en: "Which page should carry noindex?", fa: "کدام صفحه باید noindex داشته باشد؟" },
                  options: [
                    { en: "the homepage", fa: "صفحه‌ی نخستِ سایت" },
                    { en: "the pricing page", fa: "صفحه‌ی قیمت‌ها" },
                    { en: "the 'order confirmed' thank-you page", fa: "صفحه‌ی «سفارش شما ثبت شد»" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Private, transactional, zero search value — the perfect noindex candidate.",
                    fa: "خصوصی و بدونِ ارزشِ جست‌وجو — بهترین کاندیدِ noindex.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The private preview 🔒", fa: "پیش‌نمایشِ خصوصی 🔒" },
              brief: {
                en: "Build a 'Preview' page that search engines must skip: a `title` containing the word Preview, `<meta name='robots' content='noindex'>`, a `<meta name='description'>`, and `<link rel='canonical' href='https://teka.example/pricing'>` pointing to the public version (use this exact URL).",
                fa: "یک صفحه‌ی «Preview» بساز که موتورهای جست‌وجو از آن رد شوند: یک `title` که کلمه‌ی Preview را دارد، `<meta name='robots' content='noindex'>`، یک `<meta name='description'>` و `<link rel='canonical' href='https://teka.example/pricing'>` که به نسخه‌ی عمومی اشاره می‌کند (همین آدرسِ دقیق را بنویس).",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Preview — Pricing v2</title>
        <!-- TODO 1) <meta name="robots" content="noindex"> — keep this draft out of Google -->
        <!-- TODO 2) <meta name="description"> — one line about the new plans -->
        <!-- TODO 3) <link rel="canonical" href="https://teka.example/pricing"> -->
    </head>
    <body>
        <h1>Pricing (draft)</h1>
        <p>New plans are being tested here before going live.</p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Preview — Pricing v2</title>
        <meta name="robots" content="noindex">
        <meta name="description" content="Draft preview of the new pricing plans. Not for search engines.">
        <link rel="canonical" href="https://teka.example/pricing">
    </head>
    <body>
        <h1>Pricing (draft)</h1>
        <p>New plans are being tested here before going live.</p>
    </body>
</html>`,
              hints: [
                {
                  en: "The bouncer: <meta name='robots' content='noindex'> — an order, not a suggestion.",
                  fa: "بیرون‌کننده: <meta name='robots' content='noindex'> — این یک دستور است، نه پیشنهاد.",
                },
                {
                  en: "The address card: <link rel='canonical' href='https://teka.example/pricing'> — exactly this URL.",
                  fa: "کارتِ آدرس: <link rel='canonical' href='https://teka.example/pricing'> — دقیقاً همین آدرس.",
                },
                {
                  en: "Count check: one robots meta, one description, one canonical, and a title containing Preview.",
                  fa: "شمارش: یک متای robots و یک description و یک canonical و یک title که Preview دارد.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "title", count: 1, text: "preview" },
                  { selector: "meta[name='robots']", count: 1, attrName: "content", attrValue: "noindex" },
                  { selector: "meta[name='description']", count: 1 },
                  { selector: "link[rel='canonical']", count: 1, attrName: "href", attrValue: "https://teka.example/pricing" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m15-l3",
          title: { en: "The complete share card", fa: "کارتِ اشتراکِ کامل" },
          goal: {
            en: "Complete the Open Graph set — image, url, type — and ask Twitter for the big card.",
            fa: "مجموعه‌ی Open Graph را کامل کنی — image و url و type — و از توییتر کارتِ بزرگ را بخواهی.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "The card chats draw for you", fa: "کارتی که چت‌ها برایت می‌کشند" },
              blocks: [
                {
                  type: "text",
                  en: "A quick recap from Module 8, then one level deeper: when your link is pasted into a chat or feed, the app fetches your head and draws a CARD — image on top, title, description. You know og:title and og:description; today we complete the set with `og:image` (the picture), `og:url` (the official address) and `og:type` (what kind of thing: usually `website`).",
                  fa: "یک مرورِ سریع از ماژول ۸ و بعد یک پله عمیق‌تر: وقتی لینکت را کسی در چت یا فید می‌چسباند، اپ head تو را می‌خواند و یک «کارت» می‌کشد — عکسِ بالا و عنوان و توضیحات. og:title و og:description را می‌شناسی؛ امروز مجموعه را با `og:image` (تصویر) و `og:url` (آدرسِ رسمی) و `og:type` (نوعِ چیز: معمولاً `website`) کامل می‌کنیم.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Rosewater Croissant — Meadow Bakery</title>
    <meta property="og:title" content="Rosewater Croissant 🥐">
    <meta property="og:description" content="Three days of dough, one drop of rose.">
    <meta property="og:image" content="https://meadowbakery.example/img/croissant.jpg">
    <meta property="og:url" content="https://meadowbakery.example/croissant">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
  </head>
  <body>
    <h1>Rosewater Croissant</h1>
    <p>Share this link anywhere — the card travels with it.</p>
  </body>
</html>`,
                  caption: {
                    en: "The full card: title, description, image, url, type — plus one Twitter flag",
                    fa: "کارتِ کامل: title و description و image و url و type — به‌علاوه‌ی یک پرچمِ توییتر",
                  },
                },
                {
                  type: "text",
                  en: "Two iron rules for og:image. First: an ABSOLUTE URL (`https://…`), never a relative one — the chat app fetches the image from its own context, your page's address is not there. Second: size around 1200×630 pixels — big enough for the large card, and the standard ratio crops cleanly everywhere.",
                  fa: "دو قانونِ آهنین برای og:image. اول: آدرسِ «مطلق» (`https://…`)، هیچ‌وقت نسبی — اپِ چت تصویر را از دلِ خودش می‌گیرد و آدرسِ صفحه‌ی تو آن‌جا نیست. دوم: اندازه‌ی حدود ۱۲۰۰×۶۳۰ پیکسل — به‌اندازه‌ی کافی بزرگ برای کارتِ بزرگ، و با نسبتِ استاندارد که هرجا برش بخورد تمیز می‌ماند.",
                },
                {
                  type: "text",
                  en: "Why absolute URLs matter: when someone shares your link, the fetcher may be a server with zero context. A relative `img/cake.jpg` resolves against THEIR request and breaks. Absolute URLs are the only safe dialect.",
                  fa: "چرا آدرسِ مطلق مهم است: وقتی کسی لینکت را به اشتراک می‌گذارد، گیرنده ممکن است یک سرورِ بی‌زمینه باشد. یک آدرسِ نسبی مثل `img/cake.jpg` نسبت به درخواستِ «او» حل می‌شود و می‌شکند. آدرسِ مطلق تنها گویشِ امن است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Twitter's dialect", fa: "گویشِ توییتر" },
              blocks: [
                {
                  type: "text",
                  en: "Open Graph became the universal language — X/Twitter mostly speaks it too, but with one flag of its own: `<meta name='twitter:card' content='summary_large_image'>` asks for the BIG card (image above text) instead of the small square. Without it you get the tiny summary.",
                  fa: "Open Graph زبانِ مشترکِ همه شد — توییتر (X) هم بیشترِ آن را می‌فهمد، ولی یک پرچمِ مخصوصِ خودش دارد: `<meta name='twitter:card' content='summary_large_image'>` کارتِ «بزرگ» را می‌خواهد (عکس بالای متن) نه مربعِ کوچک را. بدونِ این خط، کارتِ ریز می‌گیری.",
                },
                {
                  type: "text",
                  en: "Everything else is fallback: if `twitter:title` / `twitter:description` / `twitter:image` are missing, Twitter quietly reads the og: twins. So the professional minimum is the full og: set plus ONE twitter:card line.",
                  fa: "بقیه‌اش جایگزین‌اند: اگر `twitter:title` یا `twitter:description` یا `twitter:image` نباشند، توییتر بی‌سروصدا از جفت‌های og: می‌خواند. پس حداقلِ حرفه‌ای، مجموعه‌ی کاملِ og: به‌علاوه‌ی همان یک خطِ twitter:card است.",
                },
                {
                  type: "text",
                  en: "One caution: the og:image is the first thing MANY humans see of your page — it is marketing, not decoration. Text on the image must stay readable at thumbnail size; three words beat thirty.",
                  fa: "یک هشدار: og:image نخستین چیزی است که خیلی‌ها از صفحه‌ات می‌بینند — این «تبلیغ» است نه تزئین. متنِ روی عکس باید در اندازه‌ی بندانگشتی هم خوانا بماند؛ سه کلمه از سی کلمه بهتر است.",
                },
                {
                  type: "tip",
                  en: "Testing habit: paste your URL into a share debugger (search 'open graph debugger') before shipping. Cards are cached — fix the tags, then re-scrape.",
                  fa: "عادتِ تست: قبل از انتشار، آدرست را در یکی از دیباگرهای اشتراک‌گذاری بچسبان (جست‌وجو کن: open graph debugger). کارت‌ها کش می‌شوند — تگ‌ها را درست کن، بعد دوباره اسکرپ بگیر.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which og: tag draws the picture on a share card?", fa: "کدام تگِ og: عکسِ روی کارتِ اشتراک را می‌کشد؟" },
                  options: [
                    { en: "og:picture", fa: "og:picture" },
                    { en: "og:image", fa: "og:image" },
                    { en: "og:thumbnail", fa: "og:thumbnail" },
                  ],
                  answer: 1,
                  explain: {
                    en: "og:image — absolute URL, around 1200×630.",
                    fa: "og:image — با آدرسِ مطلق و حدود ۱۲۰۰×۶۳۰.",
                  },
                },
                {
                  q: { en: "An og:image URL should be…", fa: "آدرسِ og:image باید…" },
                  options: [
                    { en: "absolute (https://…)", fa: "مطلق باشد (https://…)" },
                    { en: "relative (img/cake.jpg)", fa: "نسبی باشد (img/cake.jpg)" },
                    { en: "whatever is shortest", fa: "هر چه کوتاه‌تر باشد" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The fetcher has zero context; relative URLs break. Absolute only.",
                    fa: "گیرنده هیچ زمینه‌ای از صفحه‌ات ندارد؛ آدرسِ نسبی می‌شکند. فقط مطلق.",
                  },
                },
                {
                  q: { en: "twitter:card with content 'summary_large_image' means…", fa: "twitter:card با مقدارِ summary_large_image یعنی…" },
                  options: [
                    { en: "it adds a Twitter account to the page", fa: "یک حسابِ توییتر به صفحه اضافه می‌شود" },
                    { en: "the page shares itself automatically", fa: "صفحه خودش را خودکار به اشتراک می‌گذارد" },
                    { en: "it requests the big card: image above text", fa: "کارتِ بزرگ را می‌خواهد: عکس بالای متن" },
                  ],
                  answer: 2,
                  explain: {
                    en: "One flag, one big card. Everything else falls back to the og: twins.",
                    fa: "یک پرچم، یک کارتِ بزرگ. بقیه‌اش از جفت‌های og: پر می‌شود.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The bakery card 🥐", fa: "کارتِ نانوایی 🥐" },
              brief: {
                en: "Complete the head of a croissant page: `og:title`, `og:description`, `og:image` (absolute URL), `og:type` with value website, and `twitter:card` with value summary_large_image.",
                fa: "headِ صفحه‌ی یک کروسان را کامل کن: `og:title` و `og:description` و `og:image` (با آدرسِ مطلق) و `og:type` با مقدارِ website و `twitter:card` با مقدارِ summary_large_image.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Rosewater Croissant — Meadow Bakery</title>
        <!-- TODO 1) og:title + og:description -->
        <!-- TODO 2) og:image (absolute URL) + og:type = website -->
        <!-- TODO 3) twitter:card = summary_large_image -->
    </head>
    <body>
        <h1>Rosewater Croissant</h1>
        <p>Three days of dough, one drop of rose.</p>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Rosewater Croissant — Meadow Bakery</title>
        <meta property="og:title" content="Rosewater Croissant 🥐">
        <meta property="og:description" content="Three days of dough, one drop of rose.">
        <meta property="og:image" content="https://meadowbakery.example/img/croissant.jpg">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
    </head>
    <body>
        <h1>Rosewater Croissant</h1>
        <p>Three days of dough, one drop of rose.</p>
    </body>
</html>`,
              hints: [
                {
                  en: "og: tags use property, not name: <meta property='og:title' content='…'>.",
                  fa: "تگ‌های og: از property استفاده می‌کنند نه name: <meta property='og:title' content='…'>.",
                },
                {
                  en: "The image must be absolute: <meta property='og:image' content='https://…'>.",
                  fa: "عکس باید مطلق باشد: <meta property='og:image' content='https://…'>.",
                },
                {
                  en: "twitter:card lives in name, not property: <meta name='twitter:card' content='summary_large_image'>.",
                  fa: "twitter:card در name است نه property: <meta name='twitter:card' content='summary_large_image'>.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "meta[property='og:title']", count: 1 },
                  { selector: "meta[property='og:image']", count: 1 },
                  { selector: "meta[property='og:type']", count: 1, attrName: "content", attrValue: "website" },
                  { selector: "meta[name='twitter:card']", count: 1, attrName: "content", attrValue: "summary_large_image" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m15-l4",
          title: { en: "The professional head: full audit", fa: "headِ حرفه‌ای: ممیزیِ کامل" },
          goal: {
            en: "Assemble the complete nine-line head — charset to canonical — and ship it in one pass.",
            fa: "headِ کاملِ نه‌خطی را سرهم کنی — از charset تا canonical — و یک‌جا تحویل بدهی.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              title: { en: "The nine-line head", fa: "headِ نه‌خطی" },
              blocks: [
                {
                  type: "text",
                  en: "Time to audit. A professional head is ~9 lines, each one a decision: charset (letters never break), viewport (phones get a real layout), title (the search snippet's headline), description (the snippet's ad line), canonical (one true address), favicon (the tab icon), theme-color (the browser bar's paint), og:title + og:image (the share card). Memorize the list — you will type it hundreds of times in your career.",
                  fa: "وقتِ ممیزی است. headِ حرفه‌ای حدود ۹ خط دارد و هر خط یک تصمیم است: charset (حروف نمی‌شکنند) و viewport (گوشی چیدمانِ واقعی می‌گیرد) و title (تیترِ اسنیپتِ جست‌وجو) و description (خطِ تبلیغِ اسنیپت) و canonical (یک آدرسِ اصلی) و favicon (آیکونِ تب) و theme-color (رنگِ نوارِ مرورگر) و og:title و og:image (کارتِ اشتراک). این فهرست را حفظ شو — در طولِ زندگیِ کاری‌ات صدها بار تایپش می‌کنی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Meadow Bakery — Fresh sourdough daily</title>
    <meta name="description" content="Wood-fired sourdough, croissants and rye in the old town. Baked at 6, gone by noon.">
    <link rel="canonical" href="https://meadowbakery.example/">
    <link rel="icon" href="favicon.png">
    <meta name="theme-color" content="#7c3aed">
    <meta property="og:title" content="Meadow Bakery">
    <meta property="og:image" content="https://meadowbakery.example/img/storefront.jpg">
  </head>
  <body>
    <h1>Meadow Bakery</h1>
    <p>One head, nine decisions — every one of them works while you sleep.</p>
  </body>
</html>`,
                  caption: {
                    en: "The whole checklist in one small head",
                    fa: "کلِ چک‌لیست در یک headِ کوچک",
                  },
                },
                {
                  type: "text",
                  en: "Order matters less than presence — except charset, which must sit first (the browser reads it before any text). Everything else can follow in the order above; reviewers read it like a checklist.",
                  fa: "ترتیب به‌اندازه‌ی «بودن» مهم نیست — به‌جز charset که باید اول بنشیند (مرورگر قبل از هر متنی آن را می‌خواند). بقیه می‌توانند به همان ترتیبِ بالا بیایند؛ کسی که کدت را می‌خواند، آن را مثل چک‌لیست می‌بیند.",
                },
                {
                  type: "text",
                  en: "What is NOT in the professional head: the keywords meta (Google has ignored it since 2009 — stuffers killed it). If a tutorial from 2008 says otherwise, close the tab.",
                  fa: "چه چیزی در headِ حرفه‌ای «نیست»: متای keywords (گوگل از سالِ ۲۰۰۹ آن را نادیده می‌گیرد — حشوکنندگان کشتش دادند). اگر آموزشِ سالِ ۲۰۰۸ خلافش را گفت، تب را ببند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "favicon & theme-color: the small wins", fa: "favicon و theme-color: بردهای کوچک" },
              blocks: [
                {
                  type: "text",
                  en: "The favicon is that 16-pixel icon on the browser tab. `<link rel='icon' href='favicon.png'>` — twenty characters, and suddenly your tab looks like a product instead of a default globe. Bookmarks, history lists and phone home screens all reuse it.",
                  fa: "favicon همان آیکونِ ۱۶ پیکسلی روی تبِ مرورگر است. `<link rel='icon' href='favicon.png'>` — بیست کاراکتر، و ناگهان تبِ تو شبیه یک محصول می‌شود نه یک کره‌ی پیش‌فرض. بوکمارک‌ها و تاریخچه و صفحه‌ی اصلیِ گوشی، همه از همان استفاده می‌کنند.",
                },
                {
                  type: "text",
                  en: "`<meta name='theme-color' content='#0ea5e9'>` paints the browser's address bar (and Android's app switcher) with your brand color — a tiny touch that makes a mobile page feel 'designed'. Any hex value works; pick one from your palette.",
                  fa: "`<meta name='theme-color' content='#0ea5e9'>` نوارِ آدرسِ مرورگر (و سوئیچرِ اپ‌ها در اندروید) را با رنگِ برندت رنگ می‌کند — یک لمسِ کوچک که صفحه‌ی موبایل را «طراحی‌شده» حس می‌کند. هر مقدارِ هگز کار می‌کند؛ یکی از پالتِ خودت را انتخاب کن.",
                },
                {
                  type: "tip",
                  en: "Ship order for a new page: write the body whenever you like, but before publishing, walk the 9-line checklist top to bottom. Ninety seconds, and the page is born professional.",
                  fa: "ترتیبِ انتشارِ یک صفحه‌ی نو: بدنه را هر وقت خواستی بنویس، ولی قبل از انتشار، چک‌لیستِ ۹ خطی را از بالا به پایین مرور کن. نود ثانیه، و صفحه با سابقه‌ی حرفه‌ای به دنیا می‌آید.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Which head line is ignored by Google but still typed by thousands of tutorials?", fa: "کدام خطِ head را گوگل نادیده می‌گیرد ولی هزاران آموزش هنوز می‌نویسندش؟" },
                  options: [
                    { en: "title", fa: "title" },
                    { en: "meta keywords", fa: "meta keywords" },
                    { en: "meta description", fa: "meta description" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Google dropped keywords in 2009. Title and description still rule the snippet.",
                    fa: "گوگل از ۲۰۰۹ keywords را کنار گذاشت. title و description هنوز فرمانروای اسنیپت‌اند.",
                  },
                },
                {
                  q: { en: "What does meta theme-color do?", fa: "متای theme-color چه می‌کند؟" },
                  options: [
                    { en: "changes the page background", fa: "پس‌زمینه‌ی صفحه را عوض می‌کند" },
                    { en: "colors all the links", fa: "رنگِ همه‌ی لینک‌ها را عوض می‌کند" },
                    { en: "paints the browser's address bar with a brand color", fa: "نوارِ آدرسِ مرورگر را با رنگِ برند رنگ می‌کند" },
                  ],
                  answer: 2,
                  explain: {
                    en: "One meta line and the mobile browser wears your palette.",
                    fa: "یک خطِ متا و مرورگرِ موبایل، پالتِ تو را می‌پوشد.",
                  },
                },
                {
                  q: { en: "Which line must come FIRST in the head?", fa: "کدام خط باید اولِ head بیاید؟" },
                  options: [
                    { en: "meta description", fa: "meta description" },
                    { en: "title", fa: "title" },
                    { en: "meta charset", fa: "meta charset" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Charset first — the browser must know the encoding before reading any text.",
                    fa: "اول charset — مرورگر باید قبل از خواندنِ هر متنی، کدگذاری را بشناسد.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The product head 🧢", fa: "headِ محصول 🧢" },
              brief: {
                en: "Build the complete head of a 'TEKA Keyboard' product page: `meta charset`, `meta name='viewport'`, a `title` containing TEKA, `meta name='description'`, `<link rel='icon'>`, `<meta name='theme-color' content='#0ea5e9'>`, and `<link rel='canonical' href='https://teka.example/keyboard'>` (exact URL). A small body with one `h1` completes it.",
                fa: "headِ کاملِ صفحه‌ی محصولِ «TEKA Keyboard» را بساز: `meta charset` و `meta name='viewport'` و یک `title` که TEKA را دارد و `meta name='description'` و `<link rel='icon'>` و `<meta name='theme-color' content='#0ea5e9'>` و `<link rel='canonical' href='https://teka.example/keyboard'>` (همین آدرسِ دقیق). یک بدنه‌ی کوچک با یک `h1` هم کار را کامل می‌کند.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Keyboard</title>
        <!-- TODO 1) viewport + a title containing TEKA -->
        <!-- TODO 2) meta description + link rel="icon" -->
        <!-- TODO 3) theme-color #0ea5e9 + canonical https://teka.example/keyboard -->
    </head>
    <body>
        <h1>TEKA Keyboard</h1>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TEKA Keyboard — Type like you mean it</title>
        <meta name="description" content="A mechanical keyboard for people who write all day. Hot-swappable, quiet, beautiful.">
        <link rel="icon" href="favicon.png">
        <meta name="theme-color" content="#0ea5e9">
        <link rel="canonical" href="https://teka.example/keyboard">
    </head>
    <body>
        <h1>TEKA Keyboard</h1>
    </body>
</html>`,
              hints: [
                {
                  en: "Order in the head: charset first, then viewport, then the rest.",
                  fa: "ترتیب در head: اول charset، بعد viewport، بعد بقیه.",
                },
                {
                  en: "Exact values: theme-color content='#0ea5e9' and canonical href='https://teka.example/keyboard'.",
                  fa: "مقدارهای دقیق: theme-color با content='#0ea5e9' و canonical با href='https://teka.example/keyboard'.",
                },
                {
                  en: "The favicon is a link, not a meta: <link rel='icon' href='favicon.png'>.",
                  fa: "favicon یک link است نه meta: <link rel='icon' href='favicon.png'>.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "meta[charset]", count: 1 },
                  { selector: "meta[name='viewport']", count: 1 },
                  { selector: "title", count: 1, text: "teka" },
                  { selector: "meta[name='description']", count: 1 },
                  { selector: "link[rel='icon']", count: 1 },
                  { selector: "meta[name='theme-color']", count: 1, attrName: "content", attrValue: "#0ea5e9" },
                  { selector: "link[rel='canonical']", count: 1, attrName: "href", attrValue: "https://teka.example/keyboard" },
                ],
              },
            },
          ],
        },
      ],
    },

    // ─── Module 16 ───────────────────────────────────────────
    {
      id: "html-m16",
      title: { en: "Accessibility Deep Dive", fa: "دسترس‌پذیری در عمق" },
      blurb: {
        en: "Alt laws, autocomplete, aria-live and the skip link — open the front door for every visitor.",
        fa: "قانون‌های alt و autocomplete و aria-live و skip link — درِ خانه را به روی همه باز کن.",
      },
      lessons: [
        {
          id: "html-m16-l1",
          title: { en: "Alt text: the three laws", fa: "alt: سه قانون" },
          goal: {
            en: "Write alts that inform, stay silent on purpose, and name the action — for every image on your page.",
            fa: "altهایی بنویسی که اطلاعات بدهند، عمداً ساکت بمانند و کار را نام ببرند — برای هر تصویرِ صفحه.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "Ears instead of eyes", fa: "گوش به‌جای چشم" },
              blocks: [
                {
                  type: "text",
                  en: "Millions of people browse by LISTENING: a screen reader walks the page and narrates it. When it reaches an image it says 'image' and then reads the alt text — the ONLY thing that image can say. No alt? It reads the file name: 'image: IMG_2044 dot j p g'. That is what skipping alt sounds like.",
                  fa: "میلیون‌ها آدم با «گوش» وب‌گردی می‌کنند: صفحه‌خوان از صفحه رد می‌شود و آن را بلند می‌خواند. وقتی به تصویر می‌رسد می‌گوید «تصویر» و بعد alt را می‌خواند — تنها چیزی که آن تصویر می‌تواند بگوید. alt نباشد؟ نامِ فایل را می‌خواند: «تصویر: IMG_2044 نقطه j p g». این است صدای بی‌توجهی به alt.",
                },
                {
                  type: "text",
                  en: "Law one — informative images: the alt describes the CONTENT in plain words, as if describing the photo to a friend on the phone. 'Canoe on a calm lake at sunrise' — not 'photo', not 'lake1'.",
                  fa: "قانونِ یکم — تصویرهای اطلاع‌رسان: alt «محتوا» را با کلماتِ ساده توصیف می‌کند؛ انگار برای دوستی تلفنی عکس را وصف می‌کنی. «قایقی در دریاچه‌ای آرام، در طلوع» — نه «عکس» و نه lake1.",
                },
                {
                  type: "text",
                  en: "Law two — decorative images: a divider, a background flourish, a gradient blob — pure decoration, zero information. Give them the EMPTY alt: `alt=''`. The screen reader then skips the whole thing. Silence is the gift.",
                  fa: "قانونِ دوم — تصویرهای تزئینی: جداکننده و نقش‌ونگارِ پس‌زمینه و یک لکه‌ی گرادیانی — تزئینِ محض، اطلاعاتِ صفر. به آنها altِ «خالی» بده: `alt=''`. آن‌وقت صفحه‌خوان کلِ آن را رد می‌کند. سکوت، خودش هدیه است.",
                },
                {
                  type: "text",
                  en: "Law three — functional images: when the image IS a control (a logo that links home, an icon button), the alt names the ACTION: `alt='Home'`, `alt='Search'`. Describe where the click takes you, not what the pixels look like.",
                  fa: "قانونِ سوم — تصویرهای کارکردی: وقتی تصویر خودش یک «کنترل» است (لوگویی که به خانه لینک می‌شود، یک دکمه‌ی آیکونی)، alt «کار» را نام می‌برد: `alt='Home'` و `alt='Search'`. توصیف کن کلیک به کجا می‌رسد، نه پیکسل‌ها چه شکلی‌اند.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Three kinds of alt</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      img { width: 120px; height: 80px; object-fit: cover; border-radius: 8px; display: block; margin: 8px 0; background: #cbd5e1; }
    </style>
  </head>
  <body>
    <h1>Three kinds of alt</h1>

    <img src="lake.png" alt="Canoe on a calm lake at sunrise">
    <p>Informative: alt describes the scene.</p>

    <img src="divider.png" alt="">
    <p>Decorative: empty alt = the reader skips it.</p>

    <a href="#top">
      <img src="arrow.png" alt="Back to top">
    </a>
    <p>Functional: alt names the action, not the pixels.</p>
  </body>
</html>`,
                  caption: {
                    en: "Informative, decorative, functional — one alt strategy each",
                    fa: "اطلاع‌رسان و تزئینی و کارکردی — برای هر کدام یک استراتژیِ alt",
                  },
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Bad alts and how to smell them", fa: "altهای بد و بو کشیدنشان" },
              blocks: [
                {
                  type: "text",
                  en: "The rogues' gallery: `alt='image'` (says nothing), `alt='IMG_2044.jpg'` (a filename), `alt='image of a lake'` ('image of' is redundant — the reader already announced 'image'), and keyword-stuffed alts trying to please Google ('cheap flight hotel deal buy'). Each one wastes the listener's time.",
                  fa: "گالریِ خلافکارها: `alt='image'` (هیچ نمی‌گوید) و `alt='IMG_2044.jpg'` (نامِ فایل) و `alt='image of a lake'` («image of» زائد است — صفحه‌خوان خودش «تصویر» را اعلام کرده) و altهای پُر از کلمه‌ی کلیدی برای خوش‌آمدنِ گوگل («ارزان پرواز هتل تخفیف بخر»). هر کدام وقتِ شنونده را می‌سوزانند.",
                },
                {
                  type: "text",
                  en: "The professional test: imagine you deleted the image. Would your alt text leave a hole in the page's meaning? If yes — the image is informative, write a real description. If the page loses nothing — decorative, and `alt=''` is the honest answer.",
                  fa: "آزمونِ حرفه‌ای: تصور کن تصویر را پاک کردی. آیا alt تو جای خالی‌ای در معنای صفحه می‌گذارد؟ اگر بله — تصویر اطلاع‌رسان است؛ یک توصیفِ واقعی بنویس. اگر صفحه هیچ چیزش کم نشد — تزئینی است و `alt=''` جوابِ صادقانه است.",
                },
                {
                  type: "tip",
                  en: "Alt is also an SEO win: Google Images reads it. But write for ears first — a good description serves both masters without trying.",
                  fa: "alt برای سئو هم برد است: Google Images آن را می‌خواند. ولی اول برای گوش بنویس — توصیفِ خوب، بی‌آنکه تلاش کند، هر دو ارباب را راضی می‌کند.",
                },
                {
                  type: "text",
                  en: "Bridge to the challenge: you will build a gallery with one image of each law — informative, decorative, functional. Three alts, three completely different strategies.",
                  fa: "پل به چالش: گالری‌ای می‌سازی با یک تصویر از هر قانون — اطلاع‌رسان و تزئینی و کارکردی. سه alt، سه استراتژیِ کاملاً متفاوت.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "A purely decorative divider image should carry…", fa: "یک تصویرِ جداکننده‌ی کاملاً تزئینی باید چه داشته باشد؟" },
                  options: [
                    { en: "alt='' (empty)", fa: "alt='' (خالی)" },
                    { en: "alt='divider'", fa: "alt='divider'" },
                    { en: "no alt attribute at all", fa: "اصلاً بدونِ ویژگیِ alt" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Empty alt = 'skip me'. Missing alt = the screen reader reads the file name aloud.",
                    fa: "alt خالی یعنی «ردم کن». نبودنِ alt یعنی صفحه‌خوان نامِ فایل را بلند بخواند.",
                  },
                },
                {
                  q: { en: "A logo image inside a link to the homepage needs…", fa: "لوگویی که داخلِ لینکِ صفحه‌ی نخست است چه altی می‌خواهد؟" },
                  options: [
                    { en: "alt='logo'", fa: "alt='logo'" },
                    { en: "alt='Home'", fa: "alt='Home'" },
                    { en: "alt='company logo blue circle'", fa: "alt='company logo blue circle'" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Functional image: name the action ('Home'), not the appearance.",
                    fa: "تصویرِ کارکردی: کار را نام ببر («Home»)، نه ظاهر را.",
                  },
                },
                {
                  q: { en: "Which alt is best for a photo of a canoe on a lake?", fa: "برای عکسِ قایقی در دریاچه کدام alt بهترین است؟" },
                  options: [
                    { en: "'photo'", fa: "'photo'" },
                    { en: "'lake photo image jpg'", fa: "'lake photo image jpg'" },
                    { en: "'Canoe on a calm lake at sunrise'", fa: "'Canoe on a calm lake at sunrise'" },
                  ],
                  answer: 2,
                  explain: {
                    en: "Describe the scene in plain words, as to a friend on the phone.",
                    fa: "صحنه را با کلماتِ ساده وصف کن؛ انگار تلفنی برای دوستت تعریف می‌کنی.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The gallery that talks 🖼️", fa: "گالریِ زبان‌باز 🖼️" },
              brief: {
                en: "Build a mini gallery with EXACTLY three `img` elements: one informative with an alt containing the word mountain, one decorative with alt='' exactly, and one functional inside `<a href='#top'>` with alt='Back to top'.",
                fa: "یک گالریِ کوچک با دقیقاً سه `img` بساز: یکی اطلاع‌رسان با altی که کلمه‌ی mountain را دارد، یکی تزئینی با altِ کاملاً خالی (`alt=''`) و یکی کارکردی داخلِ `<a href='#top'>` با `alt='Back to top'`.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mountain gallery</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            img { width: 240px; height: 150px; object-fit: cover; border-radius: 8px; display: block; margin: 8px 0; background: #cbd5e1; }
        </style>
    </head>
    <body>
        <h1>Mountain gallery</h1>
        <!-- TODO: img 1 — informative, alt contains "mountain" -->
        <!-- TODO: img 2 — decorative, alt="" exactly -->
        <!-- TODO: img 3 — functional inside <a href="#top">, alt="Back to top" -->
        <img src="peak.png" alt="photo">
        <img src="divider.png" alt="photo">
        <img src="arrow.png" alt="photo">
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mountain gallery</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            img { width: 240px; height: 150px; object-fit: cover; border-radius: 8px; display: block; margin: 8px 0; background: #cbd5e1; }
        </style>
    </head>
    <body>
        <h1>Mountain gallery</h1>
        <img src="peak.png" alt="Snowy mountain peak above the clouds">
        <img src="divider.png" alt="">
        <a href="#top">
            <img src="arrow.png" alt="Back to top">
        </a>
    </body>
</html>`,
              hints: [
                {
                  en: "Informative: <img src='peak.png' alt='Snowy mountain peak above the clouds'> — real words, real scene.",
                  fa: "اطلاع‌رسان: <img src='peak.png' alt='Snowy mountain peak above the clouds'> — کلماتِ واقعی، صحنه‌ی واقعی.",
                },
                {
                  en: "Decorative: <img src='divider.png' alt=''> — the attribute exists but is empty.",
                  fa: "تزئینی: <img src='divider.png' alt=''> — ویژگی هست ولی خالی است.",
                },
                {
                  en: "Functional: wrap the img in <a href='#top'> and give it alt='Back to top' — the action, not the arrow.",
                  fa: "کارکردی: img را داخلِ <a href='#top'> بپیچ و به‌اش alt='Back to top' بده — کار، نه فلش.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "img", count: 3 },
                  { selector: "img[alt*='mountain']", count: 1 },
                  { selector: "img", count: 1, attrName: "alt", attrValue: "" },
                  { selector: "a img", count: 1, attrName: "alt", attrValue: "Back to top" },
                ],
              },
            },
          ],
        },
        {
          id: "html-m16-l2",
          title: { en: "autocomplete: the form that fills itself", fa: "autocomplete: فرمی که خودش پُر می‌شود" },
          goal: {
            en: "Wire inputs with autocomplete and aria-describedby so browsers, ears and thumbs all cooperate.",
            fa: "ورودی‌ها را با autocomplete و aria-describedby سیم‌کشی کنی تا مرورگر و گوش و انگشت، همه همکاری کنند.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              title: { en: "Let the browser do the typing", fa: "تایپ را بگذار گردنِ مرورگر" },
              blocks: [
                {
                  type: "text",
                  en: "Nobody enjoys typing their address on a phone. `autocomplete` tells the browser what each field IS, so it can fill it from the user's saved profile: `autocomplete='name'`, `'email'`, `'tel'`, `'street-address'`, `'new-password'`. Checkout flows with proper autocomplete convert dramatically better — fewer fields typed, fewer typos, fewer abandoned carts.",
                  fa: "هیچ‌کس لذت نمی‌برد روی گوشی آدرسش را تایپ کند. `autocomplete` به مرورگر می‌گوید هر فیلد «چه هست» تا آن را از پروفایلِ ذخیره‌شده‌ی کاربر پُر کند: `autocomplete='name'` و `'email'` و `'tel'` و `'street-address'` و `'new-password'`. فرم‌های پرداخت با autocompleteِ درست، به‌طرز چشمگیری بهتر فروش می‌روند — تایپِ کمتر، غلطِ کمتر، سبدِ رهاشده‌ی کمتر.",
                },
                {
                  type: "text",
                  en: "The browser is not guessing — you declared it. Screen readers also announce the expected type, and password managers trust the field. One attribute, three audiences served.",
                  fa: "مرورگر حدس نمی‌زند — تو اعلامش کرده‌ای. صفحه‌خوان‌ها هم نوعِ موردِ انتظار را اعلام می‌کنند و مدیرِ رمزها هم به فیلد اعتماد می‌کند. یک ویژگی، سه مخاطبِ راضی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Fast checkout</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 480px; }
      label { display: block; margin-top: 12px; font-weight: bold; }
      input { width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
      button { margin-top: 14px; padding: 10px 18px; background: #0ea5e9; color: white; border: 0; border-radius: 8px; }
    </style>
  </head>
  <body>
    <h1>Fast checkout</h1>
    <form>
      <label for="name">Full name</label>
      <input id="name" type="text" autocomplete="name">

      <label for="email">Email</label>
      <input id="email" type="email" autocomplete="email">

      <label for="code">One-time code</label>
      <input id="code" type="text" inputmode="numeric" autocomplete="one-time-code">

      <button type="submit">Pay now</button>
    </form>
  </body>
</html>`,
                  caption: {
                    en: "Three fields, three autocomplete tokens, one happy thumb",
                    fa: "سه فیلد و سه توکنِ autocomplete و یک شستِ خوشحال",
                  },
                },
                {
                  type: "text",
                  en: "Bonus for phones: `inputmode='numeric'` slides up the NUMBER keypad instead of letters — perfect for PINs and one-time codes. It changes the keyboard, not the validation; `type` still rules the data.",
                  fa: "هدیه‌ای برای گوشی‌ها: `inputmode='numeric'` صفحه‌کلیدِ «اعداد» را بالا می‌آورد نه حرف‌ها را — برای PIN و کدِ یک‌بارمصرف عالی است. این ویژگی صفحه‌کلید را عوض می‌کند نه اعتبارسنجی را؛ `type` همچنان فرمانده‌ی داده است.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Hints that ears can hear", fa: "راهنمایی‌هایی که گوش می‌شنود" },
              blocks: [
                {
                  type: "text",
                  en: "A hint written under an input is only half-delivered: eyes see it, screen readers hear NOTHING — they hop from field to field. `aria-describedby` wires the input to its hint: `<input aria-describedby='hint'>` + `<p id='hint'>`. Now the hint is read right after the field. The gap between seeing and hearing, closed with one id.",
                  fa: "راهنمایی‌ای که زیرِ input نوشته شده نیمه‌تحویل است: چشم می‌بیندش، صفحه‌خوان «هیچ» نمی‌شنود — از فیلدی به فیلدِ بعد می‌پرد. `aria-describedby` ورودی را به راهنمایش سیم‌کشی می‌کند: `<input aria-describedby='hint'>` + `<p id='hint'>`. حالا راهنما درست بعد از فیلد خوانده می‌شود. فاصله‌ی دیدن و شنیدن، با یک id بسته شد.",
                },
                {
                  type: "text",
                  en: "And the oldest trap in forms: the placeholder. It disappears the moment typing starts — try remembering your own address while the label evaporates. Placeholders are for EXAMPLES ('aria@teka.dev'), never for labels. The `<label>` stays: visible, attached with `for`, readable.",
                  fa: "و دامِ کهنه‌ی فرم‌ها: placeholder. همان لحظه که تایپ شروع می‌شود ناپدید می‌شود — امتحان کن آدرست را به‌خاطر بسپاری در حالی که برچسبش بخار می‌شود. placeholder جایش برای «مثال» است ('aria@teka.dev')، هرگز برای label. `<label>` باید بماند: پیدا، چسبیده با `for` و خوانا.",
                },
                {
                  type: "warn",
                  en: "Screen-reader order: label → field type → hint (if wired with aria-describedby) → state. If your hint is not wired, the user hears 'edit text, blank' with zero context. Wire the id; it is ten characters of kindness.",
                  fa: "ترتیبِ خواندن برای صفحه‌خوان: label و بعد نوعِ فیلد و بعد راهنما (اگر با aria-describedby وصل شده باشد) و بعد وضعیت. اگر راهنما وصل نباشد، کاربر می‌شنود «edit text، خالی» بدونِ هیچ بافتی. آن id را وصل کن؛ ده کاراکترِ مهربانی است.",
                },
                {
                  type: "tip",
                  en: "Most-used autocomplete values to memorize: name, email, tel, street-address, postal-code, new-password, one-time-code. They cover 90% of real forms.",
                  fa: "پرکاربردترین مقدارهای autocomplete برای حفظ‌کردن: name و email و tel و street-address و postal-code و new-password و one-time-code. اینها ۹۰٪ فرم‌های واقعی را پوشش می‌دهند.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "autocomplete='email' on an input means…", fa: "autocomplete='email' روی یک input یعنی…" },
                  options: [
                    { en: "the field must contain @", fa: "فیلد باید @ داشته باشد" },
                    { en: "the browser may fill it from the saved profile", fa: "مرورگر می‌تواند آن را از پروفایلِ ذخیره‌شده پُر کند" },
                    { en: "the field is required", fa: "فیلد اجباری است" },
                  ],
                  answer: 1,
                  explain: {
                    en: "autocomplete declares WHAT the field is, so the browser can autofill it.",
                    fa: "autocomplete اعلام می‌کند فیلد «چیست» تا مرورگر بتواند پُرش کند.",
                  },
                },
                {
                  q: { en: "The right tool for a hint paragraph under a field is…", fa: "ابزارِ درست برای یک پاراگرافِ راهنما زیرِ فیلد چیست؟" },
                  options: [
                    { en: "placeholder", fa: "placeholder" },
                    { en: "aria-describedby pointing to the hint's id", fa: "aria-describedby که به idِ راهنما اشاره کند" },
                    { en: "the title attribute", fa: "ویژگیِ title" },
                  ],
                  answer: 1,
                  explain: {
                    en: "aria-describedby makes the hint audible right after the field; placeholder is visual-only and vanishes on typing.",
                    fa: "aria-describedby راهنما را درست بعد از فیلد شنیدنی می‌کند؛ placeholder فقط دیدنی است و با تایپ محو می‌شود.",
                  },
                },
                {
                  q: { en: "inputmode='numeric' changes…", fa: "inputmode='numeric' چه چیزی را عوض می‌کند؟" },
                  options: [
                    { en: "which keyboard slides up on phones", fa: "این را که روی گوشی کدام صفحه‌کلید بالا بیاید" },
                    { en: "what data counts as valid", fa: "این را که چه داده‌ای معتبر است" },
                    { en: "the field's width", fa: "پهنای فیلد را" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Keyboard only. Validation still belongs to type and pattern.",
                    fa: "فقط صفحه‌کلید. اعتبارسنجی همچنان کارِ type و pattern است.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The polite signup ✉️", fa: "عضویتِ مؤدبانه ✉️" },
              brief: {
                en: "Build a signup form: a `label for='email'`, an `input type='email'` with `id='email'` and `autocomplete='email'`, a hint `<p id='email-hint'>` wired to the input via `aria-describedby='email-hint'`, and a second input with `autocomplete='name'`. A `button` submits it.",
                fa: "یک فرمِ عضویت بساز: `label for='email'` و یک `input type='email'` با `id='email'` و `autocomplete='email'` و یک راهنمای `<p id='email-hint'>` که با `aria-describedby='email-hint'` به input وصل شده و یک input دوم با `autocomplete='name'`. یک `button` هم فرم را بفرستد.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Newsletter</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 480px; }
            input { display: block; margin: 8px 0; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { padding: 10px 18px; background: #0ea5e9; color: white; border: 0; border-radius: 8px; }
        </style>
    </head>
    <body>
        <h1>Join the newsletter</h1>
        <!-- TODO 1) label for="email" -->
        <!-- TODO 2) the email input needs id="email" + autocomplete="email" -->
        <!-- TODO 3) hint <p id="email-hint"> wired with aria-describedby -->
        <!-- TODO 4) a name input with autocomplete="name" -->
        <form>
            <input type="email" placeholder="you@example.com">
            <button type="submit">Join</button>
        </form>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Newsletter</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 480px; }
            label { display: block; margin-top: 10px; font-weight: bold; }
            input { display: block; margin: 6px 0; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; }
            button { margin-top: 10px; padding: 10px 18px; background: #0ea5e9; color: white; border: 0; border-radius: 8px; }
        </style>
    </head>
    <body>
        <h1>Join the newsletter</h1>
        <form>
            <label for="name">Full name</label>
            <input id="name" type="text" autocomplete="name">

            <label for="email">Email</label>
            <input id="email" type="email" autocomplete="email" aria-describedby="email-hint">
            <p id="email-hint">One email per week. No spam, unsubscribe anytime.</p>

            <button type="submit">Join</button>
        </form>
    </body>
</html>`,
              hints: [
                {
                  en: "Label + field, welded: <label for='email'>Email</label> and <input id='email' type='email' autocomplete='email'>.",
                  fa: "label و فیلد، جوش‌خورده: <label for='email'>Email</label> و <input id='email' type='email' autocomplete='email'>.",
                },
                {
                  en: "Wire the hint: aria-describedby='email-hint' on the input, and id='email-hint' on the <p>.",
                  fa: "راهنما را وصل کن: روی input مقدارِ aria-describedby='email-hint' و روی <p> مقدارِ id='email-hint'.",
                },
                {
                  en: "Second field: <input id='name' type='text' autocomplete='name'> with its own label.",
                  fa: "فیلدِ دوم: <input id='name' type='text' autocomplete='name'> با label خودش.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "label[for='email']", count: 1 },
                  { selector: "input[type='email']", count: 1, attrName: "autocomplete", attrValue: "email" },
                  { selector: "input[aria-describedby='email-hint']", count: 1 },
                  { selector: "p#email-hint", count: 1 },
                  { selector: "input[autocomplete='name']", count: 1 },
                  { selector: "button", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m16-l3",
          title: { en: "aria-live: the invisible announcer", fa: "aria-live: اعلام‌کننده‌ی نامرئی" },
          goal: {
            en: "Make dynamic updates — toasts, statuses, errors — audible to screen readers with aria-live.",
            fa: "به‌روزرسانی‌های پویا — توست و وضعیت و خطا — را با aria-live برای صفحه‌خوان‌ها شنیدنی کنی.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "The invisible announcer", fa: "اعلام‌کننده‌ی نامرئی" },
              blocks: [
                {
                  type: "text",
                  en: "A click happens, JavaScript updates a box on screen: 'Saved ✓'. Eyes: informed. Ears: nothing — screen readers narrate the place they are CURRENTLY reading, and a distant box silently swapping text is not in their sentence. `aria-live` turns any element into an announcer: when its content changes, the change is spoken.",
                  fa: "یک کلیک می‌شود، جاوااسکریپت جعبه‌ای روی صفحه را به‌روز می‌کند: «Saved ✓». چشم: باخبر. گوش: هیچ — صفحه‌خوان همان‌جایی را می‌خواند که «الان» در آن است و جعبه‌ای که آن‌طرفِ صفحه بی‌صدا متنش عوض می‌شود، در جمله‌ی او نیست. `aria-live` هر عنصری را تبدیل می‌کند به یک اعلام‌کننده: وقتی محتوایش عوض شود، تغییر بلند گفته می‌شود.",
                },
                {
                  type: "text",
                  en: "Two volumes only. `aria-live='polite'`: wait for the current sentence to finish, then announce — the default for toasts and status lines. `aria-live='assertive'`: interrupt NOW — reserved for genuine emergencies ('session expired', 'error — data not saved'). Ninety percent of the time you want polite.",
                  fa: "فقط دو بلندیِ صدا. `aria-live='polite'`: صبر کن جمله‌ی فعلی تمام شود، بعد اعلام کن — انتخابِ پیش‌فرض برای توست‌ها و خطِ وضعیت. `aria-live='assertive'`: همین حالا قطعش کن — فقط برای فوریت‌های واقعی («نشست منقضی شد»، «خطا — داده ذخیره نشد»). نود درصدِ مواقع، polite همان است که می‌خواهی.",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Live toast</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 480px; }
      #toast { margin-top: 12px; padding: 10px 14px; background: #ecfdf5; border: 1px solid #34d399; border-radius: 8px; min-height: 20px; }
    </style>
  </head>
  <body>
    <h1>Live toast</h1>
    <p>When JavaScript swaps the toast text, screen readers speak it — no focus stolen.</p>

    <div id="toast" role="status" aria-live="polite">
      Waiting for something to happen…
    </div>
  </body>
</html>`,
                  caption: {
                    en: "The box is live: content changes get spoken, politely",
                    fa: "جعبه زنده است: تغییرِ محتوا، مؤدبانه گفته می‌شود",
                  },
                },
                {
                  type: "text",
                  en: "One rule surprises everyone: build the live region in the HTML from the start (even empty), and later CHANGE its content. A region injected fresh by JavaScript is often missed — screen readers register announcers while walking the page, not when regions pop into existence.",
                  fa: "یک قاعده همه را غافلگیر می‌کند: ناحیه‌ی زنده را از اول در HTML بساز (حتی خالی) و بعداً «محتوایش» را عوض کن. ناحیه‌ای که تازه با جاوااسکریپت به صفحه تزریق شود اغلب از دست می‌رود — صفحه‌خوان‌ها اعلام‌کننده‌ها را هنگامِ گشتن در صفحه ثبت می‌کنند، نه وقتی ناحیه‌ای ناگهان به دنیا می‌آید.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "role='status' and role='alert'", fa: "role=status و role=alert" },
              blocks: [
                {
                  type: "text",
                  en: "Two shorthand roles carry live semantics built-in. `role='status'` = polite announcer (implicit aria-live='polite'), made for 'Saved ✓' and cart updates. `role='alert'` = assertive announcer (implicit aria-live='assertive'), made for errors that cannot wait. Same behavior, friendlier names — and they read better in code reviews.",
                  fa: "دو نقشِ خلاصه‌نویس، معنای زنده را به‌صورتِ خودکار دارند. `role='status'` یعنی اعلام‌کننده‌ی مؤدب (همان aria-live='polite' ضمنی) — ساخته‌شده برای «Saved ✓» و به‌روزرسانیِ سبد خرید. `role='alert'` یعنی اعلام‌کننده‌ی پرخاشگر (aria-live='assertive' ضمنی) — برای خطاهایی که صبر نمی‌کنند. همان رفتار، نام‌های آدمیزادی — و در بازخوانیِ کد هم خواناترند.",
                },
                {
                  type: "text",
                  en: "Writing for ears: announce SHORT, FINISHED sentences — 'Item added to cart' beats 'added'. One change at a time; stacking five updates in a live region garbles them into noise.",
                  fa: "نوشتن برای گوش: جمله‌های کوتاه و «تمام‌شده» اعلام کن — «Item added to cart» بهتر از «added» است. هر بار یک تغییر؛ پنج به‌روزرسانیِ پشتِ‌هم داخلِ یک ناحیه‌ی زنده، همه را درهم می‌ریزد و به شلوغی تبدیل می‌کند.",
                },
                {
                  type: "tip",
                  en: "Rule of thumb: status = success/info (polite), alert = errors/danger (assertive). If your 'error' is really just a tip, downgrade it — nobody likes being shouted at.",
                  fa: "قانونِ سرانگشتی: status برای موفقیت و اطلاعات (مؤدب)، alert برای خطا و خطر (پرخاشگر). اگر «خطای» تو در واقع فقط یک راهنماست، تنزلش بده — هیچ‌کس دوست ندارد سرش داد بزنند.",
                },
                {
                  type: "text",
                  en: "Bridge to the challenge: a demo page with a live toast box (role='status') and the button JavaScript would use to fill it — the anatomy is yours to build.",
                  fa: "پل به چالش: صفحه‌ای با جعبه‌ی توستِ زنده (role='status') و دکمه‌ای که قرار است بعداً جاوااسکریپت آن را پُر کند — ساختنِ این کالبد، کارِ خودت است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "aria-live='polite' means the screen reader…", fa: "aria-live='polite' یعنی صفحه‌خوان…" },
                  options: [
                    { en: "interrupts immediately", fa: "بلافاصله حرفِ همه را قطع می‌کند" },
                    { en: "finishes the current sentence, then announces", fa: "جمله‌ی فعلی را تمام می‌کند، بعد اعلام می‌کند" },
                    { en: "stays silent forever", fa: "برای همیشه ساکت می‌ماند" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Polite = wait your turn, then speak. Assertive is the interrupting one.",
                    fa: "Polite یعنی نوبتت را منتظر بمان، بعد حرف بزن. Assertive همان قطع‌کننده است.",
                  },
                },
                {
                  q: { en: "role='alert' is best described as…", fa: "role='alert' کدام توصیف است؟" },
                  options: [
                    { en: "an assertive announcer for urgent errors", fa: "اعلام‌کننده‌ی پرخاشگر برای خطاهای فوری" },
                    { en: "a polite status line", fa: "یک خطِ وضعیتِ مؤدب" },
                    { en: "a visual alert box", fa: "یک جعبه‌ی هشدارِ دیداری" },
                  ],
                  answer: 0,
                  explain: {
                    en: "role='alert' implies aria-live='assertive' — for errors that cannot wait.",
                    fa: "role='alert' یعنی aria-live='assertive' ضمنی — برای خطاهایی که صبر نمی‌کنند.",
                  },
                },
                {
                  q: { en: "The correct way to use a live region is…", fa: "راهِ درستِ استفاده از ناحیه‌ی زنده چیست؟" },
                  options: [
                    { en: "inject it with JavaScript right when needed", fa: "همان موقع که لازم شد با جاوااسکریپت تزریقش کنی" },
                    { en: "build it in the HTML from the start, then change its content", fa: "از اول در HTML بسازی‌اش، بعد محتوایش را عوض کنی" },
                    { en: "give it to every div on the page", fa: "به هر div صفحه‌ات بدهی‌اش" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Announcers are registered while the reader walks the page — ship them in the HTML, update them later.",
                    fa: "اعلام‌کننده‌ها هنگامِ گشتنِ صفحه‌خوان ثبت می‌شوند — از اول در HTML بفرست، بعداً به‌روز کن.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The toast that speaks 🔔", fa: "توستِ زبان‌باز 🔔" },
              brief: {
                en: "Build a demo: EXACTLY one `<div role='status' aria-live='polite'>` whose text contains the word Saved, plus one `<button>` next to it (the control JavaScript would use).",
                fa: "یک نمونه بساز: دقیقاً یک `<div role='status' aria-live='polite'>` که متنش کلمه‌ی Saved را دارد و یک `<button>` کنارش (همان کنترلی که جاوااسکریپت از آن استفاده می‌کند).",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Demo</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 480px; }
            #toast { margin-top: 12px; padding: 10px 14px; background: #ecfdf5; border: 1px solid #34d399; border-radius: 8px; min-height: 20px; }
        </style>
    </head>
    <body>
        <h1>Demo</h1>
        <!-- TODO: a <div role="status" aria-live="polite"> whose text contains Saved -->
        <button>Save changes</button>
        <div id="toast"></div>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Demo</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 480px; }
            #toast { margin-top: 12px; padding: 10px 14px; background: #ecfdf5; border: 1px solid #34d399; border-radius: 8px; min-height: 20px; }
        </style>
    </head>
    <body>
        <h1>Demo</h1>
        <button>Save changes</button>
        <div id="toast" role="status" aria-live="polite">
            Saved ✓ — your changes are on the server.
        </div>
    </body>
</html>`,
              hints: [
                {
                  en: "The announcer: <div role='status' aria-live='polite'>Saved ✓</div> — exactly one on the page.",
                  fa: "اعلام‌کننده: <div role='status' aria-live='polite'>Saved ✓</div> — در کلِ صفحه فقط یکی.",
                },
                {
                  en: "role='status' alone would already be polite — but spell out aria-live='polite' today.",
                  fa: "role='status' به‌تنهایی هم مؤدب است — ولی امروز aria-live='polite' را هم صریح بنویس.",
                },
                {
                  en: "Keep the button next to it — the control JavaScript will use to fill the toast.",
                  fa: "دکمه را کنارش نگه دار — همان کنترلی که جاوااسکریپت با آن توست را پُر می‌کند.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "[role='status']", count: 1 },
                  { selector: "[role='status']", count: 1, attrName: "aria-live", attrValue: "polite" },
                  { selector: "[role='status']", count: 1, text: "saved" },
                  { selector: "button", count: 1 },
                ],
              },
            },
          ],
        },
        {
          id: "html-m16-l4",
          title: { en: "The skip link: an express lane", fa: "skip link: مسیرِ سریع" },
          goal: {
            en: "Give keyboard users a one-Tab shortcut from the top of the page straight into the content.",
            fa: "به کاربرانِ صفحه‌کلید یک میان‌برِ یک‌Tabی از بالای صفحه بدهی، مستقیم تا داخلِ محتوا.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              title: { en: "Twenty Tabs before the content", fa: "بیست Tab قبل از محتوا" },
              blocks: [
                {
                  type: "text",
                  en: "Tab through a typical site as a keyboard user: logo, home, products, about, cart, wishlist, support, blog… by the time you reach the actual article you have pressed Tab twenty times — on EVERY page. The skip link is the professional fix: a link, first in the HTML, that jumps straight to `#main`.",
                  fa: "خودت را جای کاربرِ صفحه‌کلید بگذار و در یک سایتِ معمولی Tab بزن: لوگو و خانه و محصولات و درباره و سبد و علاقه‌مندی‌ها و پشتیبانی و بلاگ… تا به خودِ مقاله برسی، بیست بار Tab زده‌ای — در «هر» صفحه. skip link راه‌حلِ حرفه‌ای است: یک لینک، اولِ HTML، که مستقیم می‌پرد به `#main`.",
                },
                {
                  type: "text",
                  en: "Why the first element? Because it must be the FIRST thing Tab reaches — before the whole navigation maze. Sighted keyboard users see it flash into view when focused (that is the trick on every big site: press Tab on github.com and watch the top-left).",
                  fa: "چرا اولین عنصر؟ چون باید «اولین چیزی» باشد که Tab به آن می‌رسد — قبل از کلِ هزارتوِ منوها. کاربرانِ صفحه‌کلیدیِ بینا آن را می‌بینند که با فوکوس، جلوی چشم ظاهر می‌شود (همان ترفندی که در همه‌ی سایت‌های بزرگ است: در github.com یک Tab بزن و گوشه‌ی بالا-چپ را ببین).",
                },
                {
                  type: "code",
                  lang: "html",
                  code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Express lane</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
      .skip { position: absolute; left: -999px; background: #0ea5e9; color: white; padding: 10px 16px; border-radius: 8px; }
      .skip:focus { left: 16px; }
    </style>
  </head>
  <body>
    <a class="skip" href="#main">Skip to content</a>

    <header>
      <nav>
        <a href="#shop">Shop</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main id="main">
      <h1>Fresh bread, zero detours</h1>
      <p>Press Tab once: the skip link appears. Press Enter: you land right here.</p>
    </main>
  </body>
</html>`,
                  caption: {
                    en: "Press Tab once in the preview — the skip link slides into view",
                    fa: "در پیش‌نمایش یک بار Tab بزن — skip link سر می‌کشد بیرون",
                  },
                },
                {
                  type: "text",
                  en: "The mechanics: `<a class='skip' href='#main'>Skip to content</a>` … `<main id='main'>`. The href must EXACTLY match the id — one missing # or one typo and the express lane leads nowhere. The browser moves focus AND scrolls there.",
                  fa: "مکانیزم: `<a class='skip' href='#main'>Skip to content</a>` و بعد `<main id='main'>`. href باید «دقیقاً» با id یکی باشد — یک # که جا بیفتد یا یک غلطِ تایپی، و مسیرِ سریع به هیچ‌جا نمی‌رسد. مرورگر هم فوکوس را می‌برد هم اسکرول می‌کند.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Hidden until needed", fa: "پنهان تا وقتی لازم شود" },
              blocks: [
                {
                  type: "text",
                  en: "Visually the skip link usually hides — but NEVER with display:none (that removes it from Tab too). The pattern: park it off-screen with position:absolute, and on :focus slide it back. HTML carries the structure; CSS only choreographs the entrance.",
                  fa: "از نظرِ ظاهری skip link معمولاً پنهان است — ولی «هرگز» با display:none (آن هم آن را از Tab حذف می‌کند). الگو: با position:absolute پارکش کن بیرونِ صفحه، و با :focus سرش را بیاور داخل. HTML اسکلت را حمل می‌کند؛ CSS فقط رقصِ ورود را کارگردانی می‌کند.",
                },
                {
                  type: "text",
                  en: "The same href='#main' trick powers 'back to top' links and footnote jumps — any in-page navigation. Anchors are the web's teleporters, and they cost zero JavaScript.",
                  fa: "همان ترفندِ href='#main' موتورِ لینک‌های «برو به بالا» و پرش‌های پانویس هم هست — هر جابه‌جاییِ درونِ صفحه‌ای. لنگرها تله‌پورتِ وب‌اند و هزینه‌شان صفر جاوااسکریپت است.",
                },
                {
                  type: "warn",
                  en: "Do not stop at the skip link: a real accessibility pass also checks focus visibility (module 6's :focus-visible), heading order and form labels. The skip link is the front door, not the whole house.",
                  fa: "در skip link متوقف نشو: یک بازبینیِ واقعیِ دسترس‌پذیری، دیده‌شدنِ فوکوس (:focus-visible از ماژول ۶) و ترتیبِ تیترها و labelهای فرم را هم چک می‌کند. skip link درِ ورودی است، نه کلِ خانه.",
                },
                {
                  type: "tip",
                  en: "Test in five seconds: open your page, mash Tab. If a skip link appears first and focus never gets lost, your keyboard story is already better than most of the web.",
                  fa: "تستِ پنج‌ثانیه‌ای: صفحه‌ات را باز کن، Tab را پشتِ‌سرِهم بزن. اگر اول skip link پیدا شد و فوکوس هیچ‌وقت گم نشد، داستانِ صفحه‌کلیدِ تو از بیشترِ وب بهتر است.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Where does the skip link belong in the HTML?", fa: "skip link در HTML کجا باید بنشیند؟" },
                  options: [
                    { en: "inside the footer", fa: "داخلِ footer" },
                    { en: "as the first element, before the nav", fa: "به‌عنوانِ اولین عنصر، قبل از nav" },
                    { en: "after the main content", fa: "بعد از محتوای اصلی" },
                  ],
                  answer: 1,
                  explain: {
                    en: "First in the HTML = first thing Tab reaches. That is the whole point.",
                    fa: "اولِ HTML یعنی اولین چیزی که Tab می‌گیرد. کلِ ماجرا همین است.",
                  },
                },
                {
                  q: { en: "href='#main' works when…", fa: "href='#main' کی کار می‌کند؟" },
                  options: [
                    { en: "an element with id='main' exists", fa: "عنصری با id='main' وجود داشته باشد" },
                    { en: "a file main.html exists", fa: "فایلی به نامِ main.html وجود داشته باشد" },
                    { en: "the page has a <main> anywhere — id not needed", fa: "صفحه یک <main> داشته باشد — بدونِ نیاز به id" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The anchor jumps to the id — one missing # or one typo and it goes nowhere.",
                    fa: "لنگر به id می‌پرد — یک # که جا بیفتد یا یک غلطِ تایپی، و دیگر به هیچ‌جا نمی‌رسد.",
                  },
                },
                {
                  q: { en: "Why not display:none for the skip link?", fa: "چرا برای skip link از display:none استفاده نکنیم؟" },
                  options: [
                    { en: "it also removes the link from the Tab order", fa: "لینک را از ترتیبِ Tab هم حذف می‌کند" },
                    { en: "it is deprecated", fa: "منسوخ شده است" },
                    { en: "it makes the link ugly", fa: "لینک را زشت می‌کند" },
                  ],
                  answer: 0,
                  explain: {
                    en: "display:none unmounts it from the keyboard too — park it off-screen and bring it back on :focus.",
                    fa: "display:none آن را از صفحه‌کلید هم حذف می‌کند — با position:absolute پارکش کن و با :focus برگردانش.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The express lane 🚄", fa: "مسیرِ سریع 🚄" },
              brief: {
                en: "Build a page with a skip link: `<a class='skip' href='#main'>` whose text contains Skip to content, a `<main id='main'>` (exact id), and a `header` with a `nav` holding exactly three links.",
                fa: "صفحه‌ای با skip link بساز: `<a class='skip' href='#main'>` که متنش Skip to content را دارد، یک `<main id='main'>` (همین id) و یک `header` با `nav` که دقیقاً سه لینک دارد.",
              },
              starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Express lane</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            .skip { position: absolute; left: -999px; background: #0ea5e9; color: white; padding: 10px 16px; border-radius: 8px; }
            .skip:focus { left: 16px; }
        </style>
    </head>
    <body>
        <!-- TODO 1) first element: <a class="skip" href="#main">Skip to content</a> -->
        <header>
            <nav>
                <a href="#shop">Shop</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
        <!-- TODO 2) give main the id="main" -->
        <main>
            <h1>Express lane</h1>
            <p>One Tab from the top, straight into the content.</p>
        </main>
    </body>
</html>`,
              solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Express lane</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; max-width: 560px; }
            .skip { position: absolute; left: -999px; background: #0ea5e9; color: white; padding: 10px 16px; border-radius: 8px; }
            .skip:focus { left: 16px; }
        </style>
    </head>
    <body>
        <a class="skip" href="#main">Skip to content</a>

        <header>
            <nav>
                <a href="#shop">Shop</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>

        <main id="main">
            <h1>Express lane</h1>
            <p>One Tab from the top, straight into the content.</p>
        </main>
    </body>
</html>`,
              hints: [
                {
                  en: "First element in the body: <a class='skip' href='#main'>Skip to content</a> — text matters.",
                  fa: "اولین عنصرِ body: <a class='skip' href='#main'>Skip to content</a> — متن مهم است.",
                },
                {
                  en: "The target: <main id='main'> — the id must be exactly main.",
                  fa: "مقصد: <main id='main'> — id باید دقیقاً main باشد.",
                },
                {
                  en: "Nav stays natural: three links inside header > nav.",
                  fa: "nav سرِ جایش می‌ماند: سه لینک داخلِ header و nav.",
                },
              ],
              check: {
                kind: "html",
                checks: [
                  { selector: "a.skip", count: 1, text: "skip to content" },
                  { selector: "a[href='#main']", count: 1 },
                  { selector: "main#main", count: 1 },
                  { selector: "header nav a", count: 3 },
                ],
              },
            },
          ],
        },
      ],
    },
    // ─── Modules 17–18 (Task 17) ──────────────────────────────
    ...htmlModulesC,
  ],
};
