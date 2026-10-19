// TEKA Academy — "HTML & CSS: Zero to First Website" (html-basics).
// Pure content data: 5 modules × 4 lessons. Every code/starter/solution string
// is a COMPLETE standalone page that runs inside the sandboxed lesson iframe:
// no external resources, no <script> tags (inline onclick only), emoji/CSS
// visuals only. Bilingual en + fa. Challenge solutions pass every check,
// starters fail at least one.

import type { Course } from "./types";

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
    en: "From your very first tag to a complete personal profile page — 20 hands-on lessons, everything runs in your browser.",
    fa: "از اولین تگ تا یک صفحه‌ی پروفایلِ کامل — ۲۰ درسِ پروژه‌محور؛ همه‌چیز داخل مرورگر خودت اجرا می‌شود.",
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
  ],
};
