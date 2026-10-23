// TEKA Academy — "JavaScript: Make the Page Come Alive" (js-basics) — HALF C.
// Modules m16–m17 (10 lessons). Pure content data, rendered generically by the
// lesson player. Bilingual en + fa.
//
// Runtime contract for every challenge (see html-runner.tsx):
//   • Starter/solution are COMPLETE HTML documents rendered in a sandboxed
//     iframe (allow-scripts) — <script> tags DO execute.
//   • Grading = DOM checks ~60ms after iframe load, so every challenge script
//     runs SYNCHRONOUSLY at parse time and is fully deterministic:
//     no fetch / timers / Math.random / Date in graded paths, and never
//     alert/confirm/prompt (blocked by the sandbox) — results are rendered
//     into visible DOM elements.
//   • Theory: lang "js" blocks are static highlighted code (no runnable flag);
//     live behavior is demoed with lang "html" blocks (<script> + output div).
// Solutions pass every check; starters fail at least one (the script is empty).

import type { Module } from "./types";

export const jsModulesC: Module[] = [
  // ─── Module 16 ───────────────────────────────────────────
  {
    id: "js-m16",
    title: { en: "Array Power", fa: "قدرتِ آرایه‌ها" },
    blurb: {
      en: "Raw arrays become page content: join items into polished lines, push records through the filter → map → join funnel, sort data into order, and finish with a mini dashboard that computes its own stats.",
      fa: "آرایه‌های خام محتوای صفحه می‌شوند: آیتم‌ها را به خط‌های تمیز join کن، رکوردها را از قیفِ filter و map و join عبور بده، داده را مرتب کن و آخرش به یک مینی‌داشبورد برس که آمارش را خودش حساب می‌کند.",
    },
    lessons: [
      {
        id: "js-m16-l1",
        title: { en: "join — One Line from Many", fa: "join — از چند آیتم، یک خط" },
        goal: {
          en: "Turn an array into one polished display string with join — and render it straight onto the page.",
          fa: "با join یک آرایه را به یک رشته‌ی نمایشیِ تمیز تبدیل کنی — و مستقیم روی صفحه رندرش کنی.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            title: { en: "The stitching machine", fa: "ماشینِ دوخت" },
            blocks: [
              {
                type: "text",
                en: "Arrays are perfect for STORING lists, but the page shows TEXT. `join` is the bridge: it walks the array and stitches every item into one string, gluing neighbors with whatever separator you hand it. `join(\", \")` puts a comma and a space between items; `join(\" | \")` puts a pipe with spaces.",
                fa: "آرایه‌ها برای «ذخیره‌ی» فهرست‌ها عالی‌اند، اما صفحه «متن» نشان می‌دهد. join پلِ بین این دو است: روی آرایه راه می‌رود و همه‌ی آیتم‌ها را به یک رشته می‌دوزد و همسایه‌ها را با هر جداکننده‌ای که بگویی به هم می‌چسباند. join(\", \") بین آیتم‌ها ویرگول و فاصله می‌گذارد؛ join(\" | \") یک خطِ عمودی با فاصله‌ها.",
              },
              {
                type: "code",
                lang: "js",
                code: `const crew = ["Sara", "Ali", "Mona"];

const line = crew.join(", ");
console.log(line);            // "Sara, Ali, Mona"

console.log(crew.length);     // 3 — join adds nothing, removes nothing
console.log(crew);            // ["Sara", "Ali", "Mona"] — untouched`,
              },
              {
                type: "text",
                en: "The separator is exactly what you type — nothing is added for you. `join(\",\")` gives `\"Sara,Ali,Mona\"` with no spaces, and `join(\"\")` smashes the items together. Pick the separator your design needs.",
                fa: "جداکننده دقیقاً همان است که تایپ می‌کنی — هیچی به‌جای تو اضافه نمی‌شود. join(\",\") بدون فاصله \"Sara,Ali,Mona\" می‌دهد و join(\"\") آیتم‌ها را به هم می‌چسباند. جداکننده‌ای را انتخاب کن که طراحی‌ات لازم دارد.",
              },
              {
                type: "tip",
                en: "join never edits the original array — like map and filter, it only reads and builds. Your list stays intact for whatever comes next.",
                fa: "join هرگز آرایه‌ی اصلی را ویرایش نمی‌کند — مثل map و filter فقط می‌خواند و می‌سازد. فهرستت برای هر اتفاقی که بعد بیفتد سالم می‌ماند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "From array to rendered line", fa: "از آرایه تا خطِ رندرشده" },
            blocks: [
              {
                type: "code",
                lang: "js",
                code: `// Two beats: build the string, then paint it
const tags = ["home", "code", "tea"];

document.querySelector("#line").textContent = tags.join(" • ");
// the page now shows: home • code • tea`,
              },
              {
                type: "text",
                en: "This is the compact cousin of the element-per-item rendering you built for the leaderboard: when the design is ONE line — a tag strip, a summary, a ticker — one element and one join beat a whole loop. Save the loop for when each item needs its own box.",
                fa: "این پسرخاله‌ی جمع‌وجورِ رندرِ «برای هر آیتم یک عنصر» است که برای جدولِ رده‌بندی ساختی: وقتی طراحی «یک خط» است — نوارِ برچسب، خلاصه، تیکر — یک عنصر و یک join از یک حلقه‌ی کامل بهتر است. حلقه را برای وقتی نگه دار که هر آیتم جعبه‌ی خودش را می‌خواهد.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Join line</title>
  </head>
  <body>
    <h1>Today's menu 🍽️</h1>
    <p id="line"></p>

    <script>
      const dishes = ["Soup", "Pasta", "Salad"];
      document.querySelector("#line").textContent = dishes.join(" • ");
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — three array items, one rendered line.",
                  fa: "پیش‌نمایش را بزن — سه آیتمِ آرایه، یک خطِ رندرشده.",
                },
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does [\"a\", \"b\", \"c\"].join(\" - \") return?", fa: "[\"a\", \"b\", \"c\"].join(\" - \") چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "\"abc\"", fa: "\"abc\"" },
                  { en: "\"a - b - c\"", fa: "\"a - b - c\"" },
                  { en: "[\"a\", \"b\", \"c\"]", fa: "[\"a\", \"b\", \"c\"]" },
                  { en: "\"a,b,c\"", fa: "\"a,b,c\"" },
                ],
                answer: 1,
                explain: {
                  en: "join walks the items and places the exact separator \" - \" between neighbors.",
                  fa: "join روی آیتم‌ها راه می‌رود و جداکننده‌ی دقیقِ \" - \" را بین همسایه‌ها می‌گذارد.",
                },
              },
              {
                q: { en: "After const text = list.join(\" | \"), what is list.length?", fa: "بعد از const text = list.join(\" | \")، مقدار list.length چیست؟" },
                options: [
                  { en: "0 — join empties the array", fa: "۰ — join آرایه را خالی می‌کند" },
                  { en: "The same as before — join only reads", fa: "همان قبلی — join فقط می‌خواند" },
                  { en: "1 — everything merged into one item", fa: "۱ — همه‌چیز در یک آیتم ادغام شده" },
                  { en: "It depends on the separator", fa: "بستگی به جداکننده دارد" },
                ],
                answer: 1,
                explain: {
                  en: "join reads the array and returns a string — the array itself keeps every item.",
                  fa: "join آرایه را می‌خواند و یک رشته برمی‌گرداند — خودِ آرایه تک‌تکِ آیتم‌ها را نگه می‌دارد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The one-line roster", fa: "فهرستِ یک‌خطی" },
            brief: {
              en: "The crew array is seeded: [\"Sara\", \"Ali\", \"Mona\", \"Reza\"]. Build line = crew.join(\", \") and render it into #roster. Then render into #head: Crew: 4 — computed from crew.length, never typed.",
              fa: "آرایه‌ی crew از قبل هست: [\"Sara\", \"Ali\", \"Mona\", \"Reza\"]. ‏line را بساز = crew.join(\", \") و در #roster رندر کن. بعد در #head رندر کن: Crew: 4 — که از crew.length حساب شود، نه دستی تایپ.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The one-line roster</title>
  </head>
  <body>
    <h1>One-line roster 📋</h1>
    <p id="head"></p>
    <p id="roster"></p>

    <script>
      const crew = ["Sara", "Ali", "Mona", "Reza"];
      // 1) line = crew.join(", ")
      // 2) Render line into #roster
      // 3) #head: "Crew: " + crew.length
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The one-line roster</title>
  </head>
  <body>
    <h1>One-line roster 📋</h1>
    <p id="head"></p>
    <p id="roster"></p>

    <script>
      const crew = ["Sara", "Ali", "Mona", "Reza"];

      const line = crew.join(", ");
      document.querySelector("#roster").textContent = line;

      document.querySelector("#head").textContent = "Crew: " + crew.length;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "One line does the stitching: crew.join(\", \"). One line paints it: #roster.textContent = line.",
                fa: "یک خط می‌دوزد: crew.join(\", \"). یک خط نقاشی می‌کند: #roster.textContent = line.",
              },
              {
                en: "The head line is string + number: \"Crew: \" + crew.length — JS converts the number for you.",
                fa: "خطِ سرِ صفحه، رشته به‌علاوه‌ی عدد است: \"Crew: \" + crew.length — جاوااسکریپت خودش عدد را تبدیل می‌کند.",
              },
              {
                en: "Expected: #roster reads Sara, Ali, Mona, Reza and #head reads Crew: 4",
                fa: "مورد انتظار: #roster می‌خواند Sara, Ali, Mona, Reza و #head می‌خواند Crew: 4",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#roster", text: "Sara, Ali, Mona, Reza" },
                { selector: "#head", text: "Crew: 4" },
                { selector: "#roster", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m16-l2",
        title: { en: "The map → join Pipeline", fa: "لوله‌ی map و join" },
        goal: {
          en: "Chain map and join to turn raw numbers into a polished display line — transform first, stitch second.",
          fa: "map و join را زنجیر کنی تا عددهای خام به یک خطِ نمایشیِ تمیز برسند — اول تبدیل، بعد دوخت.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            title: { en: "Transform, then stitch", fa: "اول تبدیل، بعد دوخت" },
            blocks: [
              {
                type: "text",
                en: "Two tools, one pipeline. `map` transforms each item and returns a new array; `join` stitches that array into one string. Raw data goes in one side, a polished display line comes out the other. The order matters: map FIRST (shape the items), join LAST (assemble the line).",
                fa: "دو ابزار، یک لوله. map هر آیتم را تبدیل می‌کند و یک آرایه‌ی نو برمی‌گرداند؛ join همان آرایه را به یک رشته می‌دوزد. داده‌ی خام از یک سو می‌رود و یک خطِ نمایشیِ تمیز از سوی دیگر بیرون می‌آید. ترتیب مهم است: اول map (به آیتم‌ها شکل بده)، آخر join (خط را سرهم کن).",
              },
              {
                type: "code",
                lang: "js",
                code: `const temps = [21, 25, 19];

const tags = temps.map((t) => t + "°C");
// ["21°C", "25°C", "19°C"]

const strip = tags.join(" | ");
// "21°C | 25°C | 19°C"

console.log(temps);   // [21, 25, 19] — the raw data is untouched`,
              },
              {
                type: "tip",
                en: "You can chain in one expression: temps.map((t) => t + \"°C\").join(\" | \"). Both styles are fine — two named steps (tags, strip) are easier to debug; one chain is faster to write.",
                fa: "می‌توانی در یک عبارت زنجیر کنی: temps.map((t) => t + \"°C\").join(\" | \"). هر دو سبک خوب‌اند — دو پله‌ی اسم‌دار (tags و strip) اشکال‌زدنش راحت‌تر است؛ زنجیره‌ی یک‌خطی تایپش سریع‌تر.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The weather ticker", fa: "تیکرِ هوا" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Weather ticker</title>
  </head>
  <body>
    <h1>Weather ticker 🌤️</h1>
    <p id="ticker"></p>

    <script>
      const temps = [21, 25, 19];
      const strip = temps.map((t) => t + "°C").join(" | ");
      document.querySelector("#ticker").textContent = strip;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — numbers became tags, tags became one ticker line.",
                  fa: "پیش‌نمایش را بزن — عددها برچسب شدند، برچسب‌ها یک خطِ تیکر شدند.",
                },
              },
              {
                type: "text",
                en: "Notice what did NOT happen: no loop, no createElement. When the whole output is one line of text, map + join + one textContent is the shortest honest path from data to page.",
                fa: "به چیزی که «نشد» دقت کن: نه حلقه، نه createElement. وقتی کلِ خروجی یک خطِ متن است، مسیرِ کوتاه و صادقانه از داده به صفحه همین است: map و join و یک textContent.",
              },
              {
                type: "warn",
                en: "Watch the details: \"°C\" must be typed identically everywhere. And if you swap the order — join first, map after — you would join the RAW numbers and then call .map on a STRING. Strings have no map. Order: map, then join.",
                fa: "به ریزه‌کاری‌ها دقت کن: \"°C\" باید همه‌جا یک‌سان تایپ شود. و اگر ترتیب را عوض کنی — اول join، بعد map — عددهای خام را join می‌کنی و بعد .map را روی یک «رشته» صدا می‌زنی. رشته map ندارد. ترتیب: اول map، بعد join.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does [1, 2, 3].map((n) => \"$\" + n).join(\" | \") return?", fa: "[1, 2, 3].map((n) => \"$\" + n).join(\" | \") چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "\"$1 | $2 | $3\"", fa: "\"$1 | $2 | $3\"" },
                  { en: "\"1 | 2 | 3\"", fa: "\"1 | 2 | 3\"" },
                  { en: "[\"$1\", \"$2\", \"$3\"]", fa: "[\"$1\", \"$2\", \"$3\"]" },
                  { en: "\"$$$\"", fa: "\"$$$\"" },
                ],
                answer: 0,
                explain: {
                  en: "map builds the \"$\" tags first, then join stitches them with \" | \" into one line.",
                  fa: "map اول برچسب‌های \"$\" را می‌سازد، بعد join آن‌ها را با \" | \" در یک خط می‌دوزد.",
                },
              },
              {
                q: { en: "What goes wrong in [1, 2].join(\" | \").map((n) => n + \"!\")?", fa: "در [1, 2].join(\" | \").map((n) => n + \"!\") چه چیزی خراب است؟" },
                options: [
                  { en: "Nothing — it works fine", fa: "هیچی — درست کار می‌کند" },
                  { en: "join runs first, so .map is called on a STRING — strings have no map", fa: "اول join اجرا می‌شود، پس .map روی یک «رشته» صدا زده می‌شود — رشته map ندارد" },
                  { en: "The map runs twice", fa: "map دو بار اجرا می‌شود" },
                  { en: "join deletes the array", fa: "join آرایه را پاک می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "join returns a string, and strings have no .map — the classic order bug. Transform with map first, then join.",
                  fa: "join یک رشته برمی‌گرداند و رشته .map ندارد — باگِ کلاسیکِ ترتیب. اول با map تبدیل کن، بعد join.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The temp strip", fa: "نوارِ دما" },
            brief: {
              en: "temps = [21, 25, 19, 30] is seeded. Build tags = temps.map((t) => t + \"°C\"), then strip = tags.join(\" | \") and render it into #ticker. Finally render into #meta: 4 cities — computed from tags.length.",
              fa: "‏temps = [21, 25, 19, 30] از قبل هست. ‏tags را بساز = temps.map((t) => t + \"°C\")، بعد strip = tags.join(\" | \") و در #ticker رندر کن. آخر هم در #meta رندر کن: 4 cities — که از tags.length حساب شود.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The temp strip</title>
  </head>
  <body>
    <h1>Temp strip 🌡️</h1>
    <p id="meta"></p>
    <p id="ticker"></p>

    <script>
      const temps = [21, 25, 19, 30];
      // 1) tags = temps.map((t) => t + "°C")
      // 2) strip = tags.join(" | ") → render into #ticker
      // 3) #meta: tags.length + " cities"
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The temp strip</title>
  </head>
  <body>
    <h1>Temp strip 🌡️</h1>
    <p id="meta"></p>
    <p id="ticker"></p>

    <script>
      const temps = [21, 25, 19, 30];

      const tags = temps.map((t) => t + "°C");
      const strip = tags.join(" | ");

      document.querySelector("#ticker").textContent = strip;
      document.querySelector("#meta").textContent = tags.length + " cities";
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Two named steps: tags = temps.map((t) => t + \"°C\"), then strip = tags.join(\" | \").",
                fa: "دو پله‌ی اسم‌دار: tags = temps.map((t) => t + \"°C\") و بعد strip = tags.join(\" | \").",
              },
              {
                en: "The meta line is a number glued to text: tags.length + \" cities\".",
                fa: "خطِ متا، عددی چسبیده به متن است: tags.length + \" cities\".",
              },
              {
                en: "Expected: #ticker reads 21°C | 25°C | 19°C | 30°C and #meta reads 4 cities",
                fa: "مورد انتظار: #ticker می‌خواند 21°C | 25°C | 19°C | 30°C و #meta می‌خواند 4 cities",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#ticker", text: "21°C | 25°C | 19°C | 30°C" },
                { selector: "#meta", text: "4 cities" },
                { selector: "h1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m16-l3",
        title: { en: "The Data Funnel: filter → map → join", fa: "قیفِ داده: filter و map و join" },
        goal: {
          en: "Filter records, format the survivors with map, and stitch them into one shelf line — the full data-to-display funnel.",
          fa: "رکوردها را filter کنی، بازمانده‌ها را با map فرمت کنی و در یک خطِ قفسه بدوزی — قیفِ کاملِ از داده تا نمایش.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "Real data travels in objects", fa: "داده‌ی واقعی با شیء سفر می‌کند" },
            blocks: [
              {
                type: "text",
                en: "Real lists are rarely plain strings — they are arrays of objects: products with prices, books with pages, tasks with done flags. The funnel handles them the same way: `filter` keeps the records that pass a test, `map` formats each survivor into a display string, `join` stitches the strings into one line.",
                fa: "فهرست‌های واقعی به‌ندرت رشته‌ی ساده‌اند — آرایه‌ای از شیءها هستند: محصول با قیمت، کتاب با تعدادِ صفحه، کار با پرچمِ انجام‌شدن. قیف با آن‌ها هم همین‌طور رفتار می‌کند: filter رکوردهایی را نگه می‌دارد که تست را رد کنند، map هر بازمانده را به یک رشته‌ی نمایشی فرمت می‌کند، join رشته‌ها را در یک خط می‌دوزد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const books = [
  { title: "JS for Humans", pages: 220 },
  { title: "CSS Magic", pages: 90 },
  { title: "Deep DOM", pages: 410 },
];

const short = books.filter((b) => b.pages < 300);
const titles = short.map((b) => b.title);

console.log(titles);              // ["JS for Humans", "CSS Magic"]
console.log(titles.join(" • "));  // "JS for Humans • CSS Magic"`,
              },
              {
                type: "tip",
                en: "Name every stage — short, titles — like steps in a recipe. When a pipeline misbehaves, console.log each stage and you see exactly where it went wrong.",
                fa: "هر پله را اسم بگذار — short و titles — مثل مراحلِ دستورِ پخت. وقتی لوله خراب شد، با console.log هر پله را ببین و دقیقاً بفهم کجا از آب درآمد.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The funnel on the page", fa: "قیف روی صفحه" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Short books</title>
  </head>
  <body>
    <h1>Short books 📚</h1>
    <p id="shelf"></p>

    <script>
      const books = [
        { title: "JS for Humans", pages: 220 },
        { title: "CSS Magic", pages: 90 },
        { title: "Deep DOM", pages: 410 },
      ];
      const titles = books.filter((b) => b.pages < 300).map((b) => b.title);
      document.querySelector("#shelf").textContent = titles.join(" • ");
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — three records in, two titles on the shelf, one line of code.",
                  fa: "پیش‌نمایش را بزن — سه رکورد می‌رود، دو عنوان روی قفسه می‌ماند، یک خط کد.",
                },
              },
              {
                type: "warn",
                en: "The filter test must answer true or false — `b.pages < 300` does. And a record that never survives the filter can NEVER be formatted by the map after it. Funnel order: filter, then map, then join.",
                fa: "تستِ filter باید true یا false جواب بدهد — `b.pages < 300` همین کار را می‌کند. و رکوردی که از filter رد نشود هرگز به mapِ بعدش نمی‌رسد تا فرمت شود. ترتیبِ قیف: اول filter، بعد map، آخر join.",
              },
              {
                type: "text",
                en: "One honest warning: a joined line grows with the data. For three books it is beautiful; for three hundred, render one element per item instead. join is for summaries, tags and tickers — not for long lists.",
                fa: "یک هشدارِ صادقانه: خطِ join‌شده با داده بلندتر می‌شود. برای سه کتاب قشنگ است؛ برای سیصدتا، به‌جایش برای هر آیتم یک عنصر رندر کن. join برای خلاصه و برچسب و تیکر است — نه برای فهرست‌های بلند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which order turns records into ONE display line?", fa: "کدام ترتیب رکوردها را به «یک» خطِ نمایشی می‌رساند؟" },
                options: [
                  { en: "join → map → filter", fa: "join ← map ← filter" },
                  { en: "map → join → filter", fa: "map ← join ← filter" },
                  { en: "filter → map → join", fa: "filter ← map ← join" },
                  { en: "join → filter → map", fa: "join ← filter ← map" },
                ],
                answer: 2,
                explain: {
                  en: "Filter picks the records, map formats each survivor, join assembles the final line.",
                  fa: "filter رکوردها را برمی‌گزیند، map هر بازمانده را فرمت می‌کند، join خطِ آخر را سرهم می‌کند.",
                },
              },
              {
                q: { en: "items has stocks 4, 0, 7, 0. What is items.filter((it) => it.stock > 0).length?", fa: "‏items موجودی‌های 4 و 0 و 7 و 0 دارد. items.filter((it) => it.stock > 0).length چند است؟" },
                options: [
                  { en: "4", fa: "۴" },
                  { en: "2", fa: "۲" },
                  { en: "0", fa: "۰" },
                  { en: "11", fa: "۱۱" },
                ],
                answer: 1,
                explain: {
                  en: "Only records with stock above zero survive: 4 and 7 — two survivors.",
                  fa: "فقط رکوردهایی که موجودی‌شان بالای صفر است زنده می‌مانند: 4 و 7 — دو بازمانده.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The in-stock shelf", fa: "قفسه‌ی موجودها" },
            brief: {
              en: "items is seeded with four records. Build available = items.filter((it) => it.stock > 0), then lines = available.map((it) => it.name + \" ×\" + it.stock), and render lines.join(\", \") into #shelf. Finally render into #meta: In stock: 2 — computed from available.length.",
              fa: "‏items با چهار رکورد از قبل هست. ‏available را بساز = items.filter((it) => it.stock > 0)، بعد lines = available.map((it) => it.name + \" ×\" + it.stock) و lines.join(\", \") را در #shelf رندر کن. آخر هم در #meta رندر کن: In stock: 2 — که از available.length حساب شود.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The in-stock shelf</title>
  </head>
  <body>
    <h1>In-stock shelf 📦</h1>
    <p id="meta"></p>
    <p id="shelf"></p>

    <script>
      const items = [
        { name: "Mouse", stock: 4 },
        { name: "Keyboard", stock: 0 },
        { name: "Monitor", stock: 7 },
        { name: "Cable", stock: 0 },
      ];
      // 1) available = items.filter((it) => it.stock > 0)
      // 2) lines = available.map((it) => it.name + " ×" + it.stock)
      // 3) lines.join(", ") → render into #shelf
      // 4) #meta: "In stock: " + available.length
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The in-stock shelf</title>
  </head>
  <body>
    <h1>In-stock shelf 📦</h1>
    <p id="meta"></p>
    <p id="shelf"></p>

    <script>
      const items = [
        { name: "Mouse", stock: 4 },
        { name: "Keyboard", stock: 0 },
        { name: "Monitor", stock: 7 },
        { name: "Cable", stock: 0 },
      ];

      const available = items.filter((it) => it.stock > 0);
      const lines = available.map((it) => it.name + " ×" + it.stock);

      document.querySelector("#shelf").textContent = lines.join(", ");
      document.querySelector("#meta").textContent = "In stock: " + available.length;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Filter first with it.stock > 0 — the two zero-stock records never reach the shelf.",
                fa: "اول با it.stock > 0 فیلتر کن — دو رکوردِ صفرِ موجودی هرگز به قفسه نمی‌رسند.",
              },
              {
                en: "The map builds strings: it.name + \" ×\" + it.stock — copy the × character from the brief.",
                fa: "map رشته می‌سازد: it.name + \" ×\" + it.stock — علامتِ × را از صورتِ چالش کپی کن.",
              },
              {
                en: "Expected: #shelf reads Mouse ×4, Monitor ×7 and #meta reads In stock: 2",
                fa: "مورد انتظار: #shelf می‌خواند Mouse ×4, Monitor ×7 و #meta می‌خواند In stock: 2",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#shelf", text: "Mouse ×4, Monitor ×7" },
                { selector: "#meta", text: "In stock: 2" },
                { selector: "h1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m16-l4",
        title: { en: "sort — Put Data in Order", fa: "sort — داده را مرتب کن" },
        goal: {
          en: "Sort numbers with compare functions, slice out the top results, and render an ordered podium.",
          fa: "عددها را با تابعِ مقایسه مرتب کنی، صدرنشین‌ها را با slice جدا کنی و یک سکوی مرتب رندر کنی.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "Order is information", fa: "ترتیب خودش اطلاعات است" },
            blocks: [
              {
                type: "text",
                en: "`sort` rearranges an array in place — and it hides a famous trap: with NO arguments it converts everything to strings and sorts alphabetically, so `[10, 9, 100]` becomes `[10, 100, 9]`. For numbers always pass a compare function: `(a, b) => a - b` sorts small to big, `(a, b) => b - a` sorts big to small.",
                fa: "‏sort آرایه را در جایش مرتب می‌کند — و تله‌ی معروفی دارد: بدونِ «هیچ آرگومانی» همه‌چیز را به رشته تبدیل می‌کند و الفبایی مرتب می‌کند، پس [10, 9, 100] می‌شود [10, 100, 9]. برای عددها همیشه یک تابعِ مقایسه بده: ‏(a, b) => a - b از کوچک به بزرگ مرتب می‌کند و (a, b) => b - a از بزرگ به کوچک.",
              },
              {
                type: "code",
                lang: "js",
                code: `const points = [10, 9, 100];

console.log(points.slice().sort());                 // [10, 100, 9] 😱 string order!
console.log(points.slice().sort((a, b) => a - b));  // [9, 10, 100] — small → big
console.log(points.slice().sort((a, b) => b - a));  // [100, 10, 9] — big → small
console.log(points);                                // [10, 9, 100] — untouched`,
              },
              {
                type: "tip",
                en: "Why points.slice() first? sort MUTATES the array it is called on. slice() with no arguments returns a copy — it works on arrays exactly like it worked on strings in the string module — so the original data stays safe, the same habit as map and filter.",
                fa: "چرا اول points.slice()؟ چون sort روی همان آرایه‌ای که صدا زده شده تغییر اعمال می‌کند (mutate). slice() بدون آرگومان یک کپی می‌دهد — روی آرایه دقیقاً مثل همان کاری که در ماژولِ رشته‌ها می‌کرد — پس داده‌ی اصلی سالم می‌ماند؛ همان عادتِ map و filter.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The top-N pattern", fa: "الگویِ صدرنشین‌ها" },
            blocks: [
              {
                type: "text",
                en: "Leaderboards, bestsellers, top scores — they all need the same trick: sort descending, then `slice(0, 3)` keeps only the first three. slice copies a section of an array: `slice(0, 3)` = items 0, 1 and 2. Chain it right after the sort and you have a podium.",
                fa: "جدولِ رده‌بندی، پرفروش‌ها، بالاترین امتیازها — همه به یک ترفند نیاز دارند: نزولی مرتب کن، بعد slice(0, 3) فقط سه‌تای اول را نگه می‌دارد. slice یک برش از آرایه را کپی می‌کند: slice(0, 3) یعنی آیتم‌های 0 و 1 و 2. همان‌جا بعد از sort زنجیرش کن و سکوی قهرمانی آماده است.",
              },
              {
                type: "code",
                lang: "js",
                code: `const scores = [42, 7, 19, 55, 30];

const podium = scores.slice().sort((a, b) => b - a).slice(0, 3);
// [55, 42, 30] — the three biggest, in order

console.log(podium.join(", "));   // "55, 42, 30"`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Top scores</title>
  </head>
  <body>
    <h1>Top scores 🏆</h1>
    <p id="podium"></p>

    <script>
      const scores = [42, 7, 19, 55, 30];
      const top3 = scores.slice().sort((a, b) => b - a).slice(0, 3);
      document.querySelector("#podium").textContent = top3.join(" • ");
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — five scores in, a three-spot podium out.",
                  fa: "پیش‌نمایش را بزن — پنج امتیاز می‌رود، یک سکوی سه‌نفره بیرون می‌آید.",
                },
              },
              {
                type: "warn",
                en: "Never sort data you still need in its original order without a copy — sort edits the array itself. scores.slice().sort(...) costs one extra word and saves the day.",
                fa: "هرگز داده‌ای را که هنوز به ترتیبِ اصلی‌اش نیاز داری بدونِ کپی مرتب نکن — sort خودِ آرایه را ویرایش می‌کند. scores.slice().sort(...) فقط یک کلمه بیشتر هزینه دارد و روزت را نجات می‌دهد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does [10, 9, 100].sort() return (no compare function)?", fa: "[10, 9, 100].sort() بدونِ تابعِ مقایسه چه برمی‌گرداند؟" },
                options: [
                  { en: "[9, 10, 100]", fa: "[9, 10, 100]" },
                  { en: "[10, 100, 9]", fa: "[10, 100, 9]" },
                  { en: "[100, 10, 9]", fa: "[100, 10, 9]" },
                  { en: "An error", fa: "خطا می‌دهد" },
                ],
                answer: 1,
                explain: {
                  en: "Without a compare function sort compares STRINGS: \"10\" < \"100\" < \"9\" — the famous alphabetical trap.",
                  fa: "بدونِ تابعِ مقایسه، sort «رشته‌ها» را مقایسه می‌کند: \"10\" < \"100\" < \"9\" — تله‌ی معروفِ الفبایی.",
                },
              },
              {
                q: { en: "Which compare function sorts numbers from big to small?", fa: "کدام تابعِ مقایسه عددها را از بزرگ به کوچک مرتب می‌کند؟" },
                options: [
                  { en: "(a, b) => a - b", fa: "(a, b) => a - b" },
                  { en: "(a, b) => b - a", fa: "(a, b) => b - a" },
                  { en: "(a, b) => a + b", fa: "(a, b) => a + b" },
                  { en: "(a, b) => 0", fa: "(a, b) => 0" },
                ],
                answer: 1,
                explain: {
                  en: "b - a is positive when b is bigger, so bigger numbers move to the front — descending order.",
                  fa: "وقتی b بزرگ‌تر باشد، حاصلِ b - a مثبت است، پس عددهای بزرگ‌تر جلو می‌روند — ترتیبِ نزولی.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Order the podium", fa: "سکو را مرتب کن" },
            brief: {
              en: "points = [42, 7, 19, 55, 30] is seeded. Build desc = points.slice().sort((a, b) => b - a) and render desc.join(\" | \") into #order. Then top3 = desc.slice(0, 3) and render into #podium: Top 3: 55, 42, 30 — built with join. Finally render into #lowest: Lowest: 7 — computed from desc[desc.length - 1], never typed.",
              fa: "‏points = [42, 7, 19, 55, 30] از قبل هست. ‏desc را بساز = points.slice().sort((a, b) => b - a) و desc.join(\" | \") را در #order رندر کن. بعد top3 = desc.slice(0, 3) و در #podium رندر کن: Top 3: 55, 42, 30 — که با join ساخته شود. آخر هم در #lowest رندر کن: Lowest: 7 — که از desc[desc.length - 1] حساب شود، نه دستی تایپ.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Order the podium</title>
  </head>
  <body>
    <h1>Podium order 🏅</h1>
    <p id="order"></p>
    <p id="podium"></p>
    <p id="lowest"></p>

    <script>
      const points = [42, 7, 19, 55, 30];
      // 1) desc = points.slice().sort((a, b) => b - a) → desc.join(" | ") into #order
      // 2) top3 = desc.slice(0, 3) → #podium: "Top 3: " + top3.join(", ")
      // 3) #lowest: "Lowest: " + desc[desc.length - 1]
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Order the podium</title>
  </head>
  <body>
    <h1>Podium order 🏅</h1>
    <p id="order"></p>
    <p id="podium"></p>
    <p id="lowest"></p>

    <script>
      const points = [42, 7, 19, 55, 30];

      const desc = points.slice().sort((a, b) => b - a);
      document.querySelector("#order").textContent = desc.join(" | ");

      const top3 = desc.slice(0, 3);
      document.querySelector("#podium").textContent = "Top 3: " + top3.join(", ");

      const lowest = desc[desc.length - 1];
      document.querySelector("#lowest").textContent = "Lowest: " + lowest;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The copy-first sort: points.slice().sort((a, b) => b - a) — big numbers first.",
                fa: "مرتب‌سازیِ اول-کپی-بعد-sort: points.slice().sort((a, b) => b - a) — عددهای بزرگ اول.",
              },
              {
                en: "The last item of a descending array is the smallest: desc[desc.length - 1].",
                fa: "آخرین آیتمِ آرایه‌ی نزولی، کوچک‌ترین است: desc[desc.length - 1].",
              },
              {
                en: "Expected: #order reads 55 | 42 | 30 | 19 | 7, #podium reads Top 3: 55, 42, 30, #lowest reads Lowest: 7",
                fa: "مورد انتظار: #order می‌خواند 55 | 42 | 30 | 19 | 7 و #podium می‌خواند Top 3: 55, 42, 30 و #lowest می‌خواند Lowest: 7",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#order", text: "55 | 42 | 30 | 19 | 7" },
                { selector: "#podium", text: "Top 3: 55, 42, 30" },
                { selector: "#lowest", text: "Lowest: 7" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m16-l5",
        title: { en: "Mini-project: Mini Dashboard", fa: "مینی‌پروژه: مینی‌داشبورد" },
        goal: {
          en: "Combine map, join, slice, sort and reduce to build a dashboard that renders rows AND computes its own stats.",
          fa: "map و join و slice و sort و reduce را ترکیب کنی تا داشبوردی بسازی که هم ردیف‌ها را رندر می‌کند هم آمارش را خودش حساب می‌کند.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "What a dashboard really is", fa: "داشبورد واقعاً چیست" },
            blocks: [
              {
                type: "text",
                en: "Strip away the fancy graphics and a dashboard is three jobs: show the raw rows, compute derived numbers (total, average, best), and paint the headline stats into boxes. ONE source array feeds everything — change the data and every number updates, because nothing was typed by hand.",
                fa: "اگر گرافیک‌های فانتزی را کنار بگذاری، داشبورد سه کار است: نشان‌دادنِ ردیف‌های خام، حساب‌کردنِ عددهای مشتق (جمع، میانگین، بهترین) و نقاشیِ آمارِ اصلی داخل جعبه‌ها. «یک» آرایه‌ی منبع به همه‌چیز غذا می‌دهد — داده را عوض کن و همه‌ی عددها به‌روز می‌شوند، چون هیچ‌چیز دستی تایپ نشده.",
              },
              {
                type: "code",
                lang: "js",
                code: `const sales = [120, 85, 200, 95, 150];

const total = sales.reduce((s, n) => s + n, 0);      // 650
const avg = total / sales.length;                    // 130
const best = sales.slice().sort((a, b) => b - a)[0]; // 200`,
              },
              {
                type: "tip",
                en: "Derived values live in variables with honest names — total, avg, best. If you ever catch yourself typing a computed number into a string literal, stop: that is a bug waiting for the data to change.",
                fa: "مقدارهای مشتق داخل متغیرهایی با اسمِ صادقانه زندگی می‌کنند — total و avg و best. اگر یک بار خواستی عددِ محاسبه‌شده را داخل خودِ رشته تایپ کنی، دست نگه دار: آنجا باگی است که منتظرِ عوض‌شدنِ داده نشسته.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Rows for detail, boxes for headlines", fa: "ردیف برای جزئیات، جعبه برای تیترها" },
            blocks: [
              {
                type: "text",
                en: "A good split: each data row gets its own element (loop + createElement — your leaderboard pattern), while the big numbers get dedicated stat boxes. Two render styles, one dataset.",
                fa: "تقسیمِ خوب: هر ردیفِ داده عنصرِ خودش را می‌گیرد (حلقه + createElement — همان الگویِ جدولِ رده‌بندی) و عددهای بزرگ هرکدام جعبه‌ی آمارِ خودشان را دارند. دو سبکِ رندر، یک داده.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Steps dashboard</title>
  </head>
  <body>
    <h1>Steps dashboard 🚶</h1>
    <div id="board"></div>
    <p id="total"></p>

    <script>
      const steps = [8000, 12000, 9500];
      const days = ["Mon", "Tue", "Wed"];

      for (let i = 0; i < steps.length; i++) {
        const el = document.createElement("p");
        el.className = "row";
        el.textContent = days[i] + ": " + steps[i];
        document.querySelector("#board").append(el);
      }

      const total = steps.reduce((s, n) => s + n, 0);
      document.querySelector("#total").textContent = "Total: " + total;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — rows from a loop, the headline from reduce.",
                  fa: "پیش‌نمایش را بزن — ردیف‌ها از حلقه، تیتر از reduce.",
                },
              },
              {
                type: "warn",
                en: "Grading reads the FINAL DOM. Compute with reduce, sort and slice — then render. A dashboard showing a correct-looking total you typed by hand fails the exact-text check the moment your formula drifts from the data.",
                fa: "نمره‌دهی DOMِ «نهایی» را می‌خواند. با reduce و sort و slice حساب کن — بعد رندر. داشبوردی که جمعِ درست‌نمای دستی‌تایپ‌شده نشان می‌دهد، همان لحظه‌ای که فرمولت از داده فاصله بگیرد چکِ متنِ دقیق را رد می‌کند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why compute the total with reduce instead of typing 650?", fa: "چرا جمع را با reduce حساب کنیم نه اینکه 650 را تایپ کنیم؟" },
                options: [
                  { en: "reduce is faster to type", fa: "تایپِ reduce سریع‌تر است" },
                  { en: "The number stays correct if the data changes — one source of truth", fa: "عدد با عوض‌شدنِ داده هم درست می‌ماند — یک منبعِ حقیقت" },
                  { en: "Typed numbers are not allowed in JavaScript", fa: "عددِ تایپ‌شده در جاوااسکریپت ممنوع است" },
                  { en: "reduce rounds the number", fa: "reduce عدد را گرد می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Computed values stay in sync with the data. Typed values go stale the moment the array changes.",
                  fa: "مقدارهای محاسبه‌شده با داده همگام می‌مانند. مقدارهای تایپ‌شده همان لحظه‌ای که آرایه عوض شود کهنه می‌شوند.",
                },
              },
              {
                q: { en: "In this dashboard, what does sales.slice().sort((a, b) => b - a)[0] give you?", fa: "در این داشبورد، sales.slice().sort((a, b) => b - a)[0] چه چیزی به تو می‌دهد؟" },
                options: [
                  { en: "The smallest sale", fa: "کوچک‌ترین فروش" },
                  { en: "The biggest sale", fa: "بزرگ‌ترین فروش" },
                  { en: "The first sale of the array", fa: "اولین فروشِ آرایه" },
                  { en: "The average", fa: "میانگین" },
                ],
                answer: 1,
                explain: {
                  en: "Sorted descending, the first item is the maximum — and slice() kept the original order safe.",
                  fa: "با ترتیبِ نزولی، اولین آیتم بیشینه است — و slice() ترتیبِ اصلی را سالم نگه داشت.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The mini dashboard", fa: "مینی‌داشبورد" },
            brief: {
              en: "sales = [120, 85, 200, 95, 150] and days = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\"] are seeded. 1) rows = sales.map((s, i) => days[i] + \": \" + s) — render each row as a <p class=\"row\"> into #board. 2) total = sales.reduce((s, n) => s + n, 0) → #total: Total: 650. 3) avg = total / sales.length → #avg: Average: 130. 4) best = sales.slice().sort((a, b) => b - a)[0] → #best: Best: 200. Everything computed, nothing typed.",
              fa: "‏sales = [120, 85, 200, 95, 150] و days = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\"] از قبل هستند. ۱) rows = sales.map((s, i) => days[i] + \": \" + s) — هر row را به‌شکل <p class=\"row\"> در #board رندر کن. ۲) total = sales.reduce((s, n) => s + n, 0) → ‏#total: Total: 650. ۳) avg = total / sales.length → ‏#avg: Average: 130. ۴) best = sales.slice().sort((a, b) => b - a)[0] → ‏#best: Best: 200. همه‌چیز محاسبه‌شده، هیچ‌چیز دستی.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The mini dashboard</title>
  </head>
  <body>
    <h1>Mini dashboard 📊</h1>
    <div id="board"></div>
    <p id="total"></p>
    <p id="avg"></p>
    <p id="best"></p>

    <script>
      const sales = [120, 85, 200, 95, 150];
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      // 1) rows = sales.map((s, i) => days[i] + ": " + s)
      //    → render each as <p class="row"> into #board
      // 2) total via reduce → #total: "Total: " + total
      // 3) avg = total / sales.length → #avg: "Average: " + avg
      // 4) best = sorted copy, first item → #best: "Best: " + best
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The mini dashboard</title>
  </head>
  <body>
    <h1>Mini dashboard 📊</h1>
    <div id="board"></div>
    <p id="total"></p>
    <p id="avg"></p>
    <p id="best"></p>

    <script>
      const sales = [120, 85, 200, 95, 150];
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

      const rows = sales.map((s, i) => days[i] + ": " + s);
      const board = document.querySelector("#board");

      for (const row of rows) {
        const el = document.createElement("p");
        el.className = "row";
        el.textContent = row;
        board.append(el);
      }

      const total = sales.reduce((s, n) => s + n, 0);
      const avg = total / sales.length;
      const best = sales.slice().sort((a, b) => b - a)[0];

      document.querySelector("#total").textContent = "Total: " + total;
      document.querySelector("#avg").textContent = "Average: " + avg;
      document.querySelector("#best").textContent = "Best: " + best;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "rows needs the index too: sales.map((s, i) => days[i] + \": \" + s).",
                fa: "‏rows به اندیس هم نیاز دارد: sales.map((s, i) => days[i] + \": \" + s).",
              },
              {
                en: "The three stats: reduce for total, division for avg, sorted-copy-first-item for best.",
                fa: "سه آمار: reduce برای total، تقسیم برای avg و اولین آیتمِ کپیِ مرتب‌شده برای best.",
              },
              {
                en: "Expected: 5 p.row lines (Mon: 120 … Fri: 150) plus Total: 650, Average: 130, Best: 200",
                fa: "مورد انتظار: پنج خطِ p.row ‏(Mon: 120 تا Fri: 150) به‌علاوه‌ی Total: 650 و Average: 130 و Best: 200",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".row", count: 5 },
                { selector: ".row", text: "Fri: 150" },
                { selector: "#total", text: "Total: 650" },
                { selector: "#avg", text: "Average: 130" },
                { selector: "#best", text: "Best: 200" },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 17 ───────────────────────────────────────────
  {
    id: "js-m17",
    title: { en: "Apps & Logic", fa: "اپ‌ها و منطق" },
    blurb: {
      en: "The app toolkit: template strings that build HTML, the state → render heartbeat, a quiz card deck, a tip calculator and a receipt-machine capstone — all deterministic, all rendered on load.",
      fa: "جعبه‌ابزارِ اپ: تمپلیت لیترال‌هایی که HTML می‌سازند، ضربانِ state و render، دسته‌کارت‌های آزمون، ماشین‌حسابِ انعام و پروژه‌ی پایانیِ ماشینِ رسید — همه قطعی، همه رندرشده موقع لود.",
    },
    lessons: [
      {
        id: "js-m17-l1",
        title: { en: "Template Strings Build HTML", fa: "تمپلیت لیترال‌ها HTML می‌سازند" },
        goal: {
          en: "Generate multi-line HTML with template literals and inject it with innerHTML — cards built from data, not typed by hand.",
          fa: "با تمپلیت لیترال‌ها HTMLِ چندخطی بسازی و با innerHTML تزریقش کنی — کارت‌هایی که از دلِ داده می‌آیند، نه تایپِ دستی.",
        },
        minutes: 8,
        steps: [
          {
            kind: "theory",
            title: { en: "Backticks, the reunion", fa: "بازهم بک‌تیک" },
            blocks: [
              {
                type: "text",
                en: "You met template literals in the strings module: backticks instead of quotes, and `${...}` injects any JavaScript expression. Now take them further — a template can span MANY lines, which makes it perfect for writing whole chunks of HTML with data holes in the middle.",
                fa: "تمپلیت لیترال‌ها را در ماژولِ رشته‌ها دیده بودی: بک‌تیک به‌جای کوتیشن و `${...}` که هر عبارتِ جاوااسکریپتی را تزریق می‌کند. حالا یک قدم جلوتر — تمپلیت می‌تواند «چند خطی» باشد و همین آن را برای نوشتنِ تکه‌های کاملِ HTML با سوراخ‌های داده در وسط، عالی می‌کند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const user = { name: "Nima", level: 7 };

const msg = \`Hi \${user.name}, level \${user.level}!\`;
// "Hi Nima, level 7!"

const next = \`Next stop: \${user.level + 1}\`;
// "Next stop: 8" — any expression goes inside \${}`,
              },
              {
                type: "tip",
                en: "Inside `${}` it is full JavaScript: math, .length, ternaries, object properties. If you can write it as an expression, you can inject it.",
                fa: "داخل `${}` جاوااسکریپتِ کامل است: ریاضی، .length، شرطِ سه‌تایی، پراپرتیِ شیء. هرچیزی که بتوانی به‌شکل عبارت بنویسی، می‌توانی تزریقش کنی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Templates that build cards", fa: "تمپلیت‌هایی که کارت می‌سازند" },
            blocks: [
              {
                type: "text",
                en: "The real power move: a multi-line template that IS the HTML — h2, paragraph, everything — with `${}` holes for the data. One assignment to innerHTML paints the whole card at once. No createElement, no className, no three-line dance.",
                fa: "حرکتِ اصلی: تمپلیتِ چندخطی که «خودِ HTML است» — h2 و پاراگراف و همه‌چیز — با سوراخ‌های `${}` برای داده. یک انتساب به innerHTML کلِ کارت را یک‌جا نقاشی می‌کند. نه createElement، نه className، نه آن رقصِ سه‌خطی.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Card from a template</title>
  </head>
  <body>
    <h1>Profile card 🪪</h1>
    <div id="card"></div>

    <script>
      const user = { name: "Mina", role: "Designer", level: 3 };
      document.querySelector("#card").innerHTML = \`
        <h2>\${user.name}</h2>
        <p>\${user.role} · Level \${user.level}</p>
      \`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one template, one assignment, a complete card.",
                  fa: "پیش‌نمایش را بزن — یک تمپلیت، یک انتساب، یک کارتِ کامل.",
                },
              },
              {
                type: "warn",
                en: "innerHTML trusts you completely: it parses your string AS HTML. That is exactly why the safety rule from the DOM module stands — templates + YOUR OWN data are fine; user-typed input inside innerHTML is an injection hole. Own data → innerHTML. Stranger data → createElement + textContent.",
                fa: "innerHTML کاملاً به تو اعتماد می‌کند: رشته‌ات را به‌عنوان HTML پارس می‌کند. دقیقاً به همین دلیل قانونِ ایمنیِ ماژولِ DOM سرِ جایش است — تمپلیت + داده‌ی «خودت» اشکالی ندارد؛ ورودیِ تایپ‌شده‌ی کاربر داخل innerHTML حفره‌ی تزریق است. داده‌ی خودت ← innerHTML. داده‌ی غریبه ← createElement و textContent.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which line correctly injects the variable plan into a template string?", fa: "کدام خط متغیرِ plan را درست داخل تمپلیت لیترال تزریق می‌کند؟" },
                options: [
                  { en: "`Plan: ${plan}`", fa: "`Plan: ${plan}`" },
                  { en: "`Plan: {plan}`", fa: "`Plan: {plan}`" },
                  { en: "`Plan: $plan`", fa: "`Plan: $plan`" },
                  { en: "\"Plan: ${plan}\"", fa: "\"Plan: ${plan}\"" },
                ],
                answer: 0,
                explain: {
                  en: "Backticks around the whole thing, and the variable inside ${...}. Regular quotes make it a plain string with no injection.",
                  fa: "کلِ رشته با بک‌تیک و متغیر داخل ${...}. کوتیشنِ معمولی آن را به رشته‌ی ساده‌ی بدونِ تزریق تبدیل می‌کند.",
                },
              },
              {
                q: { en: "Your template includes data the USER typed. What should you use?", fa: "تمپلیتت داده‌ای دارد که «کاربر» تایپ کرده. از چه استفاده کنی؟" },
                options: [
                  { en: "innerHTML — it is shorter", fa: "innerHTML — کوتاه‌تر است" },
                  { en: "createElement + textContent — stranger data never goes through innerHTML", fa: "createElement و textContent — داده‌ی غریبه هرگز از innerHTML رد نمی‌شود" },
                  { en: "console.log", fa: "console.log" },
                  { en: "textContent on <body>", fa: "textContent روی <body>" },
                ],
                answer: 1,
                explain: {
                  en: "innerHTML parses everything as HTML — stranger data can smuggle in tags. textContent inserts it as plain, harmless text.",
                  fa: "innerHTML همه‌چیز را به‌عنوان HTML پارس می‌کند — داده‌ی غریبه می‌تواند تگ قاچاق کند. textContent آن را به‌شکل متنِ ساده و بی‌خطر می‌نشاند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The card factory", fa: "کارخانه‌ی کارت" },
            brief: {
              en: "user = { name: \"Nima\", role: \"Student\", level: 7 } is seeded. 1) Render into #greet with textContent: Welcome, Nima! — built with a template string. 2) Build a multi-line template with an <h2> holding user.name and a <p> holding role · Level level (for example: Student · Level 7), and inject it into #card with innerHTML.",
              fa: "‏user = { name: \"Nima\", role: \"Student\", level: 7 } از قبل هست. ۱) در #greet با textContent رندر کن: Welcome, Nima! — که با تمپلیت لیترال ساخته شود. ۲) یک تمپلیتِ چندخطی بساز با <h2>‌ی user.name و <p>‌ای با «نقش · سطح» (مثل: Student · Level 7) و با innerHTML در #card تزریق کن.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The card factory</title>
  </head>
  <body>
    <h1>Card factory 🏭</h1>
    <p id="greet"></p>
    <div id="card"></div>

    <script>
      const user = { name: "Nima", role: "Student", level: 7 };
      // 1) #greet: a template string → "Welcome, Nima!"
      // 2) #card via innerHTML: a multi-line template with
      //    <h2>name</h2> and <p>role · Level level</p>
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The card factory</title>
  </head>
  <body>
    <h1>Card factory 🏭</h1>
    <p id="greet"></p>
    <div id="card"></div>

    <script>
      const user = { name: "Nima", role: "Student", level: 7 };

      document.querySelector("#greet").textContent = \`Welcome, \${user.name}!\`;

      document.querySelector("#card").innerHTML = \`
        <h2>\${user.name}</h2>
        <p>\${user.role} · Level \${user.level}</p>
      \`;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The greeting is one template: `Welcome, ${user.name}!` — backticks, not quotes.",
                fa: "سلام یکی است: `Welcome, ${user.name}!` — با بک‌تیک، نه کوتیشن.",
              },
              {
                en: "For the card, assign the whole multi-line template to #card.innerHTML — h2 first, p after.",
                fa: "برای کارت، کلِ تمپلیتِ چندخطی را به #card.innerHTML بده — اول h2، بعد p.",
              },
              {
                en: "Expected: #greet reads Welcome, Nima! and #card holds <h2>Nima</h2> plus Student · Level 7",
                fa: "مورد انتظار: #greet می‌خواند Welcome, Nima! و #card دارد <h2>Nima</h2> و Student · Level 7",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#greet", text: "Welcome, Nima!" },
                { selector: "#card h2", text: "Nima" },
                { selector: "#card p", text: "Level 7" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m17-l2",
        title: { en: "The state → render Heartbeat", fa: "ضربانِ state و render" },
        goal: {
          en: "Store the app's data in one state object and paint it with a render() function — change state, re-render, page updated.",
          fa: "داده‌ی اپ را در یک شیءِ state نگه داری و با تابعِ render نقاشی‌اش کنی — state را عوض کن، دوباره رندر کن، صفحه به‌روز شد.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            title: { en: "One state, one painter", fa: "یک state، یک نقاش" },
            blocks: [
              {
                type: "text",
                en: "Apps have a heartbeat: STATE (the current data) → RENDER (paint the state into the page). When the data lives in ONE object and one render() function reads ONLY that object, the page can never lie — whatever is in state is exactly what is on screen.",
                fa: "اپ‌ها ضربان دارند: state (داده‌ی فعلی) ← render (نقاشیِ state روی صفحه). وقتی داده در «یک» شیء زندگی می‌کند و یک تابعِ render که فقط همان شیء را می‌خواند، صفحه هرگز دروغ نمی‌گوید — هرچه در state باشد دقیقاً همان روی صفحه است.",
              },
              {
                type: "code",
                lang: "js",
                code: `const state = { name: "Ava", plan: "free", dark: true };

function render() {
  document.querySelector("#who").textContent = \`Name: \${state.name} (\${state.plan})\`;
  document.querySelector("#theme").textContent = state.dark ? "Theme: Dark" : "Theme: Light";
}

render(); // first paint`,
              },
              {
                type: "tip",
                en: "render() takes no arguments and reads no globals except state — that discipline is what makes it trustworthy. Every value it paints comes from one place.",
                fa: "‏render() نه آرگومان می‌گیرد و نه جز state چیزی دیگر می‌خواند — همین نظم است که قابل‌اعتمادش می‌کند. هر مقداری که نقاشی می‌کند از یک‌جا می‌آید.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The update cycle", fa: "چرخه‌ی به‌روزرسانی" },
            blocks: [
              {
                type: "text",
                en: "Here is the form-like flow: something changes state (like a user editing a form field), then render() runs again and overwrites the old paint. In real apps the change happens inside a click or input handler; here you fire both paints by hand so you can SEE the overwrite happen.",
                fa: "این همان جریانِ فرم‌مانند است: چیزی state را عوض می‌کند (مثل کاربری که یک فیلدِ فرم را ویرایش می‌کند)، بعد render() دوباره اجرا می‌شود و نقاشیِ قبلی را رونویسی می‌کند. در اپ‌های واقعی این تغییر داخل هندلرِ کلیک یا input اتفاق می‌افتد؛ اینجا هر دو نقاشی را دستی شلیک می‌کنی تا لحظه‌ی رونویسی را با چشم ببینی.",
              },
              {
                type: "code",
                lang: "js",
                code: `// ...state and render() from before...

render();                 // first paint: "Name: Ava (free)"

state.plan = "pro";       // the "form" changed
state.dark = false;
render();                 // repaint: "Name: Ava (pro)", "Theme: Light"`,
              },
              {
                type: "warn",
                en: "The #1 state bug: changing state and forgetting to call render(). The data is new, the page tells the old story — nothing looks broken, it is just stale. Rule: every state change ends with render().",
                fa: "باگِ شماره‌ی یکِ state: عوض‌کردنِ state و جاانداختنِ render(). داده نو است، صفحه هنوز قصه‌ی قدیمی را می‌گوید — هیچ‌چیز به‌ظر خراب نمی‌آید، فقط کهنه است. قاعده: هر تغییرِ state با render() تمام می‌شود.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does render() do in the state → render pattern?", fa: "در الگویِ state و render، تابعِ render چه می‌کند؟" },
                options: [
                  { en: "Changes the state object", fa: "شیءِ state را عوض می‌کند" },
                  { en: "Reads state and paints it into the DOM", fa: "state را می‌خواند و در DOM نقاشی می‌کند" },
                  { en: "Downloads new data", fa: "داده‌ی نو دانلود می‌کند" },
                  { en: "Validates the user's typing", fa: "تایپِ کاربر را اعتبارسنجی می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "render is the painter: it reads the current state and writes it into the page's elements. It never edits state itself.",
                  fa: "‏render همان نقاش است: stateِ فعلی را می‌خواند و داخل عناصرِ صفحه می‌نویسد. خودش هرگز state را ویرایش نمی‌کند.",
                },
              },
              {
                q: { en: "You set state.plan = \"pro\" but forgot render(). The page shows…", fa: "‏state.plan = \"pro\" را گذاشتی ولی render() را جا انداختی. صفحه نشان می‌دهد…" },
                options: [
                  { en: "\"Name: Ava (pro)\" — state changed", fa: "Name: Ava (pro) — که state عوض شده" },
                  { en: "The old plan — stale paint until render() runs", fa: "پلنِ قبلی — نقاشیِ کهنه تا وقتی render() اجرا شود" },
                  { en: "An error", fa: "یک خطا" },
                  { en: "An empty page", fa: "یک صفحه‌ی خالی" },
                ],
                answer: 1,
                explain: {
                  en: "Changing state alone touches nothing visible. The page updates only when render() repaints.",
                  fa: "فقط عوض‌کردنِ state هیچ‌چیزِ قابل‌دیدن را لمس نمی‌کند. صفحه فقط وقتی به‌روز می‌شود که render() دوباره نقاشی کند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The settings preview", fa: "پیش‌نمایشِ تنظیمات" },
            brief: {
              en: "state = { name: \"Ava\", plan: \"free\", dark: true } is seeded. 1) Write render(): #who gets `Name: ${state.name} (${state.plan})` and #theme gets state.dark ? \"Theme: Dark\" : \"Theme: Light\". 2) Call render() once at startup. 3) Then simulate a form submit: set state.plan = \"pro\" and state.dark = false, and call render() again. The final page must read: Name: Ava (pro) and Theme: Light.",
              fa: "‏state = { name: \"Ava\", plan: \"free\", dark: true } از قبل هست. ۱) تابعِ render() را بنویس: ‏#who مقدار `Name: ${state.name} (${state.plan})` بگیرد و #theme مقدار state.dark ? \"Theme: Dark\" : \"Theme: Light\". ۲) render() را یک بار موقع استارت صدا بزن. ۳) بعد ارسالِ فرم را شبیه‌سازی کن: state.plan = \"pro\" و state.dark = false بگذار و دوباره render() صدا بزن. صفحه‌ی نهایی باید این را بخواند: Name: Ava (pro) و Theme: Light.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The settings preview</title>
  </head>
  <body>
    <h1>Settings preview ⚙️</h1>
    <p id="who"></p>
    <p id="theme"></p>

    <script>
      const state = { name: "Ava", plan: "free", dark: true };
      // 1) render(): #who gets \`Name: \${state.name} (\${state.plan})\`
      //    and #theme gets state.dark ? "Theme: Dark" : "Theme: Light"
      // 2) Call render() once NOW
      // 3) Then: state.plan = "pro"; state.dark = false; render() again
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The settings preview</title>
  </head>
  <body>
    <h1>Settings preview ⚙️</h1>
    <p id="who"></p>
    <p id="theme"></p>

    <script>
      const state = { name: "Ava", plan: "free", dark: true };

      function render() {
        document.querySelector("#who").textContent = \`Name: \${state.name} (\${state.plan})\`;
        document.querySelector("#theme").textContent = state.dark ? "Theme: Dark" : "Theme: Light";
      }

      render();

      // The "form submit": state changes, then repaint
      state.plan = "pro";
      state.dark = false;
      render();
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "render() paints both lines from state only — one template string, one ternary.",
                fa: "‏render() هر دو خط را فقط از state نقاشی می‌کند — یک تمپلیت لیترال، یک شرطِ سه‌تایی.",
              },
              {
                en: "Two render() calls total: the first paint, then the repaint after the state changes.",
                fa: "دو بار render() در کل: اولین نقاشی، بعد نقاشیِ دوباره بعد از عوض‌شدنِ state.",
              },
              {
                en: "Expected final page: #who reads Name: Ava (pro) and #theme reads Theme: Light",
                fa: "صفحه‌ی نهاییِ مورد انتظار: ‏#who می‌خواند Name: Ava (pro) و #theme می‌خواند Theme: Light",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#who", text: "Name: Ava (pro)" },
                { selector: "#theme", text: "Theme: Light" },
                { selector: "#who", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m17-l3",
        title: { en: "Project: Quiz Cards", fa: "پروژه: کارت‌های آزمون" },
        goal: {
          en: "Render a whole quiz deck from one data array — cards via templates in a loop, plus a computed answer key.",
          fa: "کلِ دسته‌ی کارت‌های آزمون را از دلِ یک آرایه‌ی داده رندر کنی — کارت‌ها با تمپلیت داخل حلقه، به‌علاوه‌ی کلیدِ محاسبه‌شده.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "Quizzes are data first", fa: "آزمون‌ها اول داده‌اند" },
            blocks: [
              {
                type: "text",
                en: "You built a one-question quiz show in the games lab. Scaling up changes nothing conceptually: a quiz is an ARRAY of question objects — each with the question, its options, and the index of the correct one. Write the data honestly and the app writes itself.",
                fa: "در آزمایشگاه بازی‌ها یک مسابقه‌ی یک‌سؤالی ساختی. بزرگ‌کردنش از نظر مفهومی هیچ‌چیز را عوض نمی‌کند: یک آزمون، «آرایه‌ای از شیءهای سؤال» است — هرکدام با سؤال، گزینه‌ها و اندیسِ گزینه‌ی درست. داده را صادقانه بنویس، اپ خودش نوشته می‌شود.",
              },
              {
                type: "code",
                lang: "js",
                code: `const quiz = [
  { q: "Which language makes pages interactive?", options: ["JavaScript", "CSS"], answer: 0 },
  { q: "Which one is NOT a programming language?", options: ["Python", "HTML"], answer: 1 },
];

console.log(quiz[1].q);                       // the second question
console.log(quiz[1].options[quiz[1].answer]); // "HTML" — the correct option`,
              },
              {
                type: "tip",
                en: "answer stores an INDEX, not the text. That keeps the data clean and lets you compute with it — like turning 0 into \"1\" for humans who count from one.",
                fa: "‏answer یک «اندیس» است، نه متن. این کار داده را تمیز نگه می‌دارد و اجازه می‌دهد باهاش حساب کنی — مثل تبدیلِ 0 به \"1\" برای آدم‌هایی که از یک می‌شمارند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The deck, rendered in one loop", fa: "دسته‌ی کارت‌ها، رندرشده در یک حلقه" },
            blocks: [
              {
                type: "text",
                en: "The render recipe: loop over the array, build each card with a template string (question + options + answer), append it. Then the answer key — a map that turns every `answer` into a human number, joined with commas. Two tools you already own: the template loop and the map → join pipeline.",
                fa: "دستورِ پختِ رندر: روی آرایه حلقه بزن، هر کارت را با یک تمپلیت لیترال بساز (سؤال + گزینه‌ها + جواب) و اضافه کن. بعد کلیدِ آزمون — یک map که هر answer را به عددِ انسانی تبدیل می‌کند و با ویرگول join می‌شود. دو ابزاری که داری: حلقه‌ی تمپلیت و لوله‌ی map و join.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Quiz cards</title>
  </head>
  <body>
    <h1>Quiz cards 🃏</h1>
    <div id="board"></div>

    <script>
      const quiz = [
        { q: "2 + 2?", options: ["3", "4"], answer: 1 },
      ];
      for (let i = 0; i < quiz.length; i++) {
        const item = quiz[i];
        const el = document.createElement("div");
        el.className = "card";
        el.innerHTML = \`
          <h3>Q\${i + 1}. \${item.q}</h3>
          <p class="opt">\${item.options.join(" / ")}</p>
          <p class="ok">Answer: \${item.answer + 1}</p>
        \`;
        document.querySelector("#board").append(el);
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one loop, one template, a full card with Q number, options and answer.",
                  fa: "پیش‌نمایش را بزن — یک حلقه، یک تمپلیت، یک کارتِ کامل با شماره‌ی سؤال و گزینه‌ها و جواب.",
                },
              },
              {
                type: "warn",
                en: "Templates inside innerHTML must contain COMPLETE tags — every <p> you open must close. One missing </p> and the browser guesses your layout for you, usually wrongly. And remember: this data is ours, so innerHTML is safe here.",
                fa: "تمپلیت‌هایی که داخل innerHTML می‌روند باید «تگ‌های کامل» داشته باشند — هر <p> که باز می‌کنی باید بسته شود. یک </p>‌ی جامانده کافی است تا مرورگر خودش حدس بزند چیدمانت چیست، معمولاً هم اشتباه. و یادت باشد: این داده مالِ خود ماست، پس innerHTML اینجا امن است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How do you read the correct option's TEXT from a quiz item?", fa: "«متنِ» گزینه‌ی درست را چطور از یک آیتمِ آزمون می‌خوانی؟" },
                options: [
                  { en: "item.answer", fa: "item.answer" },
                  { en: "item.options[item.answer]", fa: "item.options[item.answer]" },
                  { en: "item.options.answer", fa: "item.options.answer" },
                  { en: "item.text", fa: "item.text" },
                ],
                answer: 1,
                explain: {
                  en: "answer is the index INTO the options array — item.options[item.answer] fetches the actual text.",
                  fa: "‏answer یک اندیس «داخل» آرایه‌ی options است — item.options[item.answer] خودِ متن را می‌آورد.",
                },
              },
              {
                q: { en: "What does quiz.map((item) => item.answer + 1).join(\", \") build?", fa: "quiz.map((item) => item.answer + 1).join(\", \") چه چیزی می‌سازد؟" },
                options: [
                  { en: "The questions in one line", fa: "سؤال‌ها را در یک خط" },
                  { en: "A human-readable answer key like \"1, 2\"", fa: "یک کلیدِ خوانا مثل \"1, 2\"" },
                  { en: "A new quiz array", fa: "یک آرایه‌ی آزمونِ نو" },
                  { en: "The number of questions", fa: "تعدادِ سؤال‌ها" },
                ],
                answer: 1,
                explain: {
                  en: "map converts each stored index (counting from 0) into a human number (counting from 1), join stitches them into one line.",
                  fa: "map هر اندیسِ ذخیره‌شده (از صفر) را به عددِ انسانی (از یک) تبدیل می‌کند و join همه را در یک خط می‌دوزد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The quiz cards", fa: "کارت‌های آزمون" },
            brief: {
              en: "quiz with two questions is seeded. Loop over it (use the index i) and for each item render a <div class=\"card\"> into #board whose innerHTML is a template with: <h3>Q${i + 1}. ${item.q}</h3>, a <p class=\"opt\"> with the options joined by \" / \", and a <p class=\"ok\"> with Answer: ${item.answer + 1}. Then build key = quiz.map((item) => item.answer + 1).join(\", \") and render into #report: Answer key: 1, 2",
              fa: "‏quiz با دو سؤال از قبل هست. روی آن حلقه بزن (با اندیسِ i) و برای هر آیتم یک <div class=\"card\"> در #board رندر کن که innerHTML‌اش تمپلیتی باشد با: ‏<h3>Q${i + 1}. ${item.q}</h3>، یک <p class=\"opt\"> با گزینه‌های join‌شده با \" / \" و یک <p class=\"ok\"> با Answer: ${item.answer + 1}. بعد key را بساز = quiz.map((item) => item.answer + 1).join(\", \") و در #report رندر کن: Answer key: 1, 2",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The quiz cards</title>
  </head>
  <body>
    <h1>Quiz cards 🃏</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const quiz = [
        { q: "Which language makes pages interactive?", options: ["JavaScript", "CSS"], answer: 0 },
        { q: "Which one is NOT a programming language?", options: ["Python", "HTML"], answer: 1 },
      ];
      // 1) Loop with index i → build <div class="card"> per item:
      //    innerHTML template with <h3>Q\${i + 1}. \${item.q}</h3>,
      //    <p class="opt">options joined with " / "</p>,
      //    <p class="ok">Answer: \${item.answer + 1}</p>
      // 2) key = quiz.map((item) => item.answer + 1).join(", ")
      // 3) #report: "Answer key: " + key
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The quiz cards</title>
  </head>
  <body>
    <h1>Quiz cards 🃏</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const quiz = [
        { q: "Which language makes pages interactive?", options: ["JavaScript", "CSS"], answer: 0 },
        { q: "Which one is NOT a programming language?", options: ["Python", "HTML"], answer: 1 },
      ];

      const board = document.querySelector("#board");

      for (let i = 0; i < quiz.length; i++) {
        const item = quiz[i];
        const el = document.createElement("div");
        el.className = "card";
        el.innerHTML = \`
          <h3>Q\${i + 1}. \${item.q}</h3>
          <p class="opt">\${item.options.join(" / ")}</p>
          <p class="ok">Answer: \${item.answer + 1}</p>
        \`;
        board.append(el);
      }

      const key = quiz.map((item) => item.answer + 1).join(", ");
      document.querySelector("#report").textContent = "Answer key: " + key;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The card is one template: Q number from i + 1, options via item.options.join(\" / \"), answer via item.answer + 1.",
                fa: "کارت یک تمپلیت است: شماره‌ی سؤال از i + 1، گزینه‌ها با item.options.join(\" / \") و جواب با item.answer + 1.",
              },
              {
                en: "createElement(\"div\"), el.className = \"card\", set innerHTML, then board.append(el) — the old rhythm, now with a template.",
                fa: "‏createElement(\"div\") و el.className = \"card\" و innerHTML و بعد board.append(el) — همان ریتمِ قدیمی، حالا با تمپلیت.",
              },
              {
                en: "Expected: two .card elements plus #report reading Answer key: 1, 2",
                fa: "مورد انتظار: دو عنصرِ .card و #report که می‌خواند Answer key: 1, 2",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".card", count: 2 },
                { selector: ".ok", text: "Answer: 2" },
                { selector: "#report", text: "Answer key: 1, 2" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m17-l4",
        title: { en: "Project: Tip Calculator", fa: "پروژه: ماشین‌حسابِ انعام" },
        goal: {
          en: "Turn fixed inputs into a computed bill breakdown — tip, total and per-person share, rendered with template strings.",
          fa: "ورودی‌های ثابت را به یک صورت‌حسابِ محاسبه‌شده تبدیل کنی — انعام، مجموع و سهمِ هر نفر، رندرشده با تمپلیت لیترال.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            title: { en: "Inputs, formulas, outputs", fa: "ورودی، فرمول، خروجی" },
            blocks: [
              {
                type: "text",
                en: "Every calculator is the same machine: inputs (the numbers you start from), formulas (turning inputs into outputs), rendering (painting the outputs). This lesson's version is deterministic on purpose — the inputs are fixed constants, so every run produces exactly the same breakdown. Perfect for learning the shape before wiring real forms.",
                fa: "هر ماشین‌حسابی همان یک ماشین است: ورودی (عددهای شروع)، فرمول (تبدیلِ ورودی به خروجی) و رندر (نقاشیِ خروجی). نسخه‌ی این درس عمداً قطعی است — ورودی‌ها ثابت‌اند، پس هر اجرا دقیقاً همین صورت‌حساب را می‌دهد. برای یادگرفتنِ شکل، قبل از سیم‌کشیِ فرم‌های واقعی، عالی است.",
              },
              {
                type: "code",
                lang: "js",
                code: `const order = { bill: 240, rate: 15, people: 4 };

const tip = order.bill * order.rate / 100;   // 36
const grand = order.bill + tip;              // 276
const each = grand / order.people;           // 69`,
              },
              {
                type: "tip",
                en: "Read formulas aloud: 'tip is bill times rate, divided by 100'. Keeping them in variables with honest names makes the render step almost boring — and boring is what you want in math code.",
                fa: "فرمول‌ها را بلند بخوان: «انعام، صورت‌حساب ضربدر نرخ، تقسیم بر صد». نگه‌داشتن‌شان در متغیرهایی با اسمِ صادقانه، مرحله‌ی رندر را تقریباً بی‌سروصدا می‌کند — و بی‌سروصدایی در کدِ ریاضی همان چیزی است که می‌خواهی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Render the breakdown", fa: "رندرِ صورت‌حساب" },
            blocks: [
              {
                type: "text",
                en: "Template strings were born for this: labels and numbers interleaved, computed live. `Tip: $${tip}` reads like the sentence it prints. One variable per line, one line per output.",
                fa: "تمپلیت لیترال‌ها برای همین کار به دنیا آمده‌اند: برچسب و عدد در هم، محاسبه‌شده در لحظه. ‏`Tip: $${tip}` همان جمله‌ای است که چاپ می‌کند. برای هر خط یک متغیر، برای هر خروجی یک خط.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Split the bill</title>
  </head>
  <body>
    <h1>Split the bill 🧾</h1>
    <p id="tip"></p>
    <p id="total"></p>

    <script>
      const order = { bill: 200, rate: 10, people: 2 };
      const tip = order.bill * order.rate / 100;   // 20
      const grand = order.bill + tip;              // 220

      document.querySelector("#tip").textContent = \`Tip: $\${tip}\`;
      document.querySelector("#total").textContent = \`Total: $\${grand}\`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the breakdown paints itself from two formulas.",
                  fa: "پیش‌نمایش را بزن — صورت‌حساب از دلِ دو فرمول نقاشی می‌شود.",
                },
              },
              {
                type: "warn",
                en: "JavaScript decimals can surprise: 0.1 + 0.2 gives 0.30000000000000004. Pick friendly numbers while learning (bill 240, rate 15 → tip exactly 36), and in real money apps round on purpose. In graded challenges the expected text is EXACT — match it to the last digit.",
                fa: "اعشارِ جاوااسکریپت غافلگیر می‌کند: 0.1 + 0.2 می‌شود 0.30000000000000004. موقع یادگیری عددهای دوستانه انتخاب کن (صورت‌حساب 240 با نرخ 15 ← انعام دقیقاً 36) و در اپ‌های واقعیِ پولی، گردکردن را عامدانه انجام بده. در چالش‌های نمره‌گرفته متنِ موردانتظار «دقیق» است — تا آخرین رقم با آن بخوان.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "bill = 200, rate = 10. What is the tip?", fa: "‏bill = 200 و rate = 10. انعام چند می‌شود؟" },
                options: [
                  { en: "2", fa: "۲" },
                  { en: "10", fa: "۱۰" },
                  { en: "20", fa: "۲۰" },
                  { en: "200", fa: "۲۰۰" },
                ],
                answer: 2,
                explain: {
                  en: "200 × 10 / 100 = 20 — bill times rate, divided by 100.",
                  fa: "‏200 × 10 / 100 = 20 — صورت‌حساب ضربدر نرخ، تقسیم بر صد.",
                },
              },
              {
                q: { en: "Which expression computes each person's share?", fa: "کدام عبارت سهمِ هر نفر را حساب می‌کند؟" },
                options: [
                  { en: "bill / people", fa: "bill / people" },
                  { en: "tip / people", fa: "tip / people" },
                  { en: "(bill + tip) / people", fa: "(bill + tip) / people" },
                  { en: "people / (bill + tip)", fa: "people / (bill + tip)" },
                ],
                answer: 2,
                explain: {
                  en: "Everyone splits the WHOLE bill plus tip — divide the grand total by the number of people.",
                  fa: "همه «کلِ» صورت‌حساب به‌علاوه‌ی انعام را تقسیم می‌کنند — مجموعِ کل را بر تعدادِ افراد تقسیم کن.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The tip calculator", fa: "ماشین‌حسابِ انعام" },
            brief: {
              en: "order = { bill: 240, rate: 15, people: 4 } is seeded. Compute: tip = order.bill * order.rate / 100, grand = order.bill + tip, each = grand / order.people. Render with template strings: #tip → Tip: $36, #total → Total: $276, #each → Each pays: $69. All three numbers computed — never typed.",
              fa: "‏order = { bill: 240, rate: 15, people: 4 } از قبل هست. حساب کن: tip = order.bill * order.rate / 100 و grand = order.bill + tip و each = grand / order.people. با تمپلیت لیترال رندر کن: ‏#tip ← Tip: $36 و #total ← Total: $276 و #each ← Each pays: $69. هر سه عدد محاسبه‌شده — نه تایپ‌شده.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The tip calculator</title>
  </head>
  <body>
    <h1>Tip calculator 💵</h1>
    <p id="tip"></p>
    <p id="total"></p>
    <p id="each"></p>

    <script>
      const order = { bill: 240, rate: 15, people: 4 };
      // 1) tip = order.bill * order.rate / 100
      // 2) grand = order.bill + tip
      // 3) each = grand / order.people
      // 4) Render with template strings:
      //    #tip → "Tip: $36" · #total → "Total: $276" · #each → "Each pays: $69"
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The tip calculator</title>
  </head>
  <body>
    <h1>Tip calculator 💵</h1>
    <p id="tip"></p>
    <p id="total"></p>
    <p id="each"></p>

    <script>
      const order = { bill: 240, rate: 15, people: 4 };

      const tip = order.bill * order.rate / 100;
      const grand = order.bill + tip;
      const each = grand / order.people;

      document.querySelector("#tip").textContent = \`Tip: $\${tip}\`;
      document.querySelector("#total").textContent = \`Total: $\${grand}\`;
      document.querySelector("#each").textContent = \`Each pays: $\${each}\`;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Three formulas, three variables: tip, grand, each — in that order (each needs grand).",
                fa: "سه فرمول، سه متغیر: tip و grand و each — به همین ترتیب (each به grand نیاز دارد).",
              },
              {
                en: "Inside the template, the $ is literal text and the number goes in ${}: `Tip: $${tip}`.",
                fa: "داخل تمپلیت، $ خودِ متن است و عدد داخل ${} می‌رود: `Tip: $${tip}`.",
              },
              {
                en: "Expected: Tip: $36, Total: $276, Each pays: $69",
                fa: "مورد انتظار: ‏Tip: $36 و Total: $276 و Each pays: $69",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#tip", text: "Tip: $36" },
                { selector: "#total", text: "Total: $276" },
                { selector: "#each", text: "Each pays: $69" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m17-l5",
        title: { en: "Capstone: Receipt Machine", fa: "پروژه‌ی پایانی: ماشینِ رسید" },
        goal: {
          en: "Ship a mini-app that renders receipt lines, computes a subtotal, applies a conditional discount and prints the total — the full app pipeline in one script.",
          fa: "یک مینی‌اپ تحویل بده که خط‌های رسید را رندر می‌کند، جمعِ کل را حساب می‌کند، تخفیفِ شرطی را اعمال می‌کند و جمعِ نهایی را چاپ می‌کند — کلِ لوله‌ی اپ در یک اسکریپت.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "The whole toolbox, one script", fa: "کلِ جعبه‌ابزار، یک اسکریپت" },
            blocks: [
              {
                type: "text",
                en: "This capstone deliberately stacks everything from the last two modules: an array of objects (the cart), map with an index to build numbered lines, a loop to render them, reduce for the subtotal, a ternary for conditional logic, and template strings for the totals. Read the plan first, then write it in order.",
                fa: "این پروژه‌ی پایانی عمداً همه‌چیزِ دو ماژولِ آخر را روی هم می‌چیند: آرایه‌ای از شیءها (سبدِ خرید)، map با اندیس برای ساختنِ خط‌های شماره‌دار، حلقه برای رندر، reduce برای جمعِ کل، شرطِ سه‌تایی برای منطقِ شرطی و تمپلیت لیترال برای جمع‌های نهایی. اول طرح را بخوان، بعد به همان ترتیب بنویس.",
              },
              {
                type: "code",
                lang: "js",
                code: `// the plan, in code
const cart = [{ name: "Book", price: 12 }, { name: "Pen", price: 3 }];

const lines = cart.map((it, i) => \`\${i + 1}. \${it.name} - $\${it.price}\`);
// ["1. Book - $12", "2. Pen - $3"]

const subtotal = cart.reduce((s, it) => s + it.price, 0);   // 15
const discount = subtotal >= 50 ? subtotal / 10 : 0;        // 0 — not big enough`,
              },
              {
                type: "tip",
                en: "The ternary `condition ? a : b` is your if/else in expression form — perfect when a value simply IS one of two options. Ten percent off when the cart is big, nothing otherwise, in a single line.",
                fa: "شرطِ سه‌تاییِ `condition ? a : b` همان if/else توست به شکلِ عبارت — عالی وقتی یک مقدار به‌سادگی یکی از دو گزینه است. ده‌درصد تخفیف اگر سبد بزرگ باشد، وگرنه هیچ — در یک خط.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Plan the order, then type it", fa: "ترتیب را بچین، بعد تایپ کن" },
            blocks: [
              {
                type: "text",
                en: "Real app logic has a strict order: RENDER the items first (the lines), COMPUTE the numbers second (subtotal → discount → final), RENDER the totals last. Nothing stops you from computing first — but a script read top-down should read like the story: items, math, totals.",
                fa: "منطقِ اپِ واقعی ترتیبِ سفت‌وسختی دارد: اول «آیتم‌ها را رندر کن» (خط‌ها)، بعد «عددها را حساب کن» (جمع ← تخفیف ← نهایی)، آخر «جمع‌ها را رندر کن». هیچ‌چیز جلوی زودتر حساب‌کردن را نمی‌گیرد — اما خواندنِ اسکریپت از بالا به پایین باید مثل یک قصه باشد: آیتم‌ها، ریاضی، جمع‌ها.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Mini receipt</title>
  </head>
  <body>
    <h1>Mini receipt 🧾</h1>
    <div id="items"></div>
    <p id="total"></p>

    <script>
      const cart = [{ name: "Book", price: 12 }, { name: "Pen", price: 3 }];
      const box = document.querySelector("#items");

      for (let i = 0; i < cart.length; i++) {
        const it = cart[i];
        const el = document.createElement("p");
        el.className = "line";
        el.textContent = \`\${i + 1}. \${it.name} - $\${it.price}\`;
        box.append(el);
      }

      const total = cart.reduce((s, it) => s + it.price, 0);
      document.querySelector("#total").textContent = \`Total: $\${total}\`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the receipt skeleton: numbered lines from data, a computed total.",
                  fa: "پیش‌نمایش را بزن — اسکلتِ رسید: خط‌های شماره‌دار از دلِ داده و یک جمعِ محاسبه‌شده.",
                },
              },
              {
                type: "warn",
                en: "The discount is a THRESHOLD: only when the subtotal reaches 50 does the 10% kick in. With the capstone cart the subtotal is exactly 60 — so expect Discount: -$6 and Total: $54. Compute it; do not reason it out by hand and type the result. The grader (and your future boss) wants the machine's answer.",
                fa: "تخفیف یک «آستانه» است: فقط وقتی جمعِ کل به 50 برسد، ده‌درصد فعال می‌شود. جمعِ سبدِ این پروژه دقیقاً 60 است — پس انتظارِ Discount: -$6 و Total: $54 را داشته باش. آن را «حساب» کن؛ نه اینکه با دست استدلال کنی و نتیجه را تایپ کنی. نمره‌دهنده (و رئیسِ آینده‌ات) جوابِ ماشین می‌خواهد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "cart is [{ price: 12 }, { price: 45 }]. What is cart.reduce((s, it) => s + it.price, 0)?", fa: "‏cart برابر [{ price: 12 }, { price: 45 }] است. cart.reduce((s, it) => s + it.price, 0) چند می‌شود؟" },
                options: [
                  { en: "0", fa: "۰" },
                  { en: "12", fa: "۱۲" },
                  { en: "45", fa: "۴۵" },
                  { en: "57", fa: "۵۷" },
                ],
                answer: 3,
                explain: {
                  en: "reduce starts at 0 and adds every price: 0 + 12 + 45 = 57.",
                  fa: "‏reduce از 0 شروع می‌کند و هر قیمت را اضافه می‌کند: 0 + 12 + 45 = 57.",
                },
              },
              {
                q: { en: "subtotal = 60. What is subtotal >= 50 ? subtotal / 10 : 0?", fa: "‏subtotal = 60. حاصلِ subtotal >= 50 ? subtotal / 10 : 0 چیست؟" },
                options: [
                  { en: "0 — the condition fails", fa: "۰ — شرط رد می‌شود" },
                  { en: "6 — the discount kicks in", fa: "۶ — تخفیف فعال می‌شود" },
                  { en: "50", fa: "۵۰" },
                  { en: "60", fa: "۶۰" },
                ],
                answer: 1,
                explain: {
                  en: "60 is at least 50, so the ternary picks subtotal / 10 = 6.",
                  fa: "‏60 دست‌کم 50 است، پس شرطِ سه‌تایی subtotal / 10 = 6 را برمی‌گزیند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The receipt machine", fa: "ماشینِ رسید" },
            brief: {
              en: "cart = [{ name: \"Book\", price: 12 }, { name: \"Pen\", price: 3 }, { name: \"Bag\", price: 45 }] is seeded. 1) lines = cart.map((it, i) => `${i + 1}. ${it.name} - $${it.price}`) — render each line as a <p class=\"line\"> into #items. 2) subtotal = cart.reduce((s, it) => s + it.price, 0). 3) discount = subtotal >= 50 ? subtotal / 10 : 0. 4) final = subtotal - discount. Render: #subtotal → Subtotal: $60, #discount → Discount: -$6, #final → Total: $54 — all computed.",
              fa: "‏cart = [{ name: \"Book\", price: 12 }, { name: \"Pen\", price: 3 }, { name: \"Bag\", price: 45 }] از قبل هست. ۱) lines = cart.map((it, i) => `${i + 1}. ${it.name} - $${it.price}`) — هر line را به‌شکل <p class=\"line\"> در #items رندر کن. ۲) subtotal = cart.reduce((s, it) => s + it.price, 0). ۳) discount = subtotal >= 50 ? subtotal / 10 : 0. ۴) final = subtotal - discount. رندر کن: ‏#subtotal ← Subtotal: $60 و #discount ← Discount: -$6 و #final ← Total: $54 — همه محاسبه‌شده.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The receipt machine</title>
  </head>
  <body>
    <h1>Receipt machine 🧾</h1>
    <div id="items"></div>
    <p id="subtotal"></p>
    <p id="discount"></p>
    <p id="final"></p>

    <script>
      const cart = [
        { name: "Book", price: 12 },
        { name: "Pen", price: 3 },
        { name: "Bag", price: 45 },
      ];
      // 1) lines = cart.map((it, i) => \`\${i + 1}. \${it.name} - $\${it.price}\`)
      //    → render each as <p class="line"> into #items
      // 2) subtotal via reduce → #subtotal: "Subtotal: $" + subtotal
      // 3) discount = subtotal >= 50 ? subtotal / 10 : 0 → #discount
      // 4) final = subtotal - discount → #final: "Total: $" + final
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The receipt machine</title>
  </head>
  <body>
    <h1>Receipt machine 🧾</h1>
    <div id="items"></div>
    <p id="subtotal"></p>
    <p id="discount"></p>
    <p id="final"></p>

    <script>
      const cart = [
        { name: "Book", price: 12 },
        { name: "Pen", price: 3 },
        { name: "Bag", price: 45 },
      ];

      const lines = cart.map((it, i) => \`\${i + 1}. \${it.name} - $\${it.price}\`);
      const box = document.querySelector("#items");

      for (const line of lines) {
        const el = document.createElement("p");
        el.className = "line";
        el.textContent = line;
        box.append(el);
      }

      const subtotal = cart.reduce((s, it) => s + it.price, 0);
      const discount = subtotal >= 50 ? subtotal / 10 : 0;
      const final = subtotal - discount;

      document.querySelector("#subtotal").textContent = \`Subtotal: $\${subtotal}\`;
      document.querySelector("#discount").textContent = \`Discount: -$\${discount}\`;
      document.querySelector("#final").textContent = \`Total: $\${final}\`;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The lines template has three holes: the number (i + 1), the name, and the price after a literal $.",
                fa: "تمپلیتِ خط‌ها سه سوراخ دارد: عدد ‏(i + 1) و نام و قیمت بعد از $‌ی ثابت.",
              },
              {
                en: "The three totals: reduce for subtotal, a ternary for discount, subtraction for final.",
                fa: "سه جمعِ نهایی: reduce برای subtotal، شرطِ سه‌تایی برای discount و تفریق برای final.",
              },
              {
                en: "Expected: 3 p.line rows (1. Book - $12 … 3. Bag - $45) plus Subtotal: $60, Discount: -$6, Total: $54",
                fa: "مورد انتظار: سه ردیفِ p.line ‏(1. Book - $12 تا 3. Bag - $45) به‌علاوه‌ی Subtotal: $60 و Discount: -$6 و Total: $54",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".line", count: 3 },
                { selector: ".line", text: "3. Bag - $45" },
                { selector: "#subtotal", text: "Subtotal: $60" },
                { selector: "#discount", text: "Discount: -$6" },
                { selector: "#final", text: "Total: $54" },
              ],
            },
          },
        ],
      },
    ],
  },
];
