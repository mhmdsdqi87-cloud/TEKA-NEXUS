// TEKA Academy — "JavaScript: Make the Page Come Alive" (js-basics) — HALF A.
// Modules m1–m7 (28 lessons). Pure content data, rendered generically by the
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

export const jsModulesA: Module[] = [
  // ─── Module 1 ────────────────────────────────────────────
  {
    id: "js-m1",
    title: { en: "Hello, JavaScript", fa: "سلام، جاوااسکریپت" },
    blurb: {
      en: "Meet the third layer of the web: one tiny <script> tag that lets your page think, remember and react.",
      fa: "با لایه‌ی سومِ وب آشنا شو: یک تگ script کوچک که به صفحه‌ات فکر کردن، به‌خاطر سپردن و واکنش نشان دادن می‌دهد.",
    },
    lessons: [
      {
        id: "js-m1-l1",
        title: { en: "Your First Script", fa: "اولین اسکریپت" },
        goal: {
          en: "Add JavaScript to a page with a script tag and make it change what visitors see.",
          fa: "با تگ script جاوااسکریپت را به صفحه اضافه کنی و ببینی که دیدِ بازدیدکننده‌ها را عوض می‌کند.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "The third layer of the web", fa: "لایه‌ی سومِ وب" },
            blocks: [
              {
                type: "text",
                en: "You already know two layers: **HTML** is the skeleton (what the page IS) and **CSS** is the styling (what the page LOOKS like). JavaScript is the third layer: what the page DOES. It counts, remembers, makes decisions and reacts to clicks — it is the muscles and the brain.",
                fa: "تا اینجا دو لایه را می‌شناسی: **HTML** اسکلت است (صفحه چیست) و **CSS** ظاهر است (صفحه چه شکلی است). جاوااسکریپت لایه‌ی سوم است: صفحه چه می‌کند. جاوااسکریپت حساب می‌کند، به‌خاطر می‌سپارد، تصمیم می‌گیرد و به کلیک واکنش نشان می‌دهد — عضله و مغزِ صفحه است.",
              },
              {
                type: "text",
                en: "JavaScript enters a page through the `<script>` tag — a door from HTML-land into JS-land. Everything between `<script>` and `</script>` is JavaScript, and the browser runs it the moment it reads it, line by line. The professional habit: put the script at the end of `<body>`, just before `</body>`, so every element above it already exists when the script starts.",
                fa: "جاوااسکریپت از درِ `<script>` وارد صفحه می‌شود — دری از سرزمین HTML به سرزمین JS. هرچه بین `<script>` و `</script>` باشد جاوااسکریپت است و مرورگر همان لحظه‌ای که بهش می‌رسد، خط‌به‌خط اجرایش می‌کند. عادتِ حرفه‌ای: اسکریپت را آخرِ `body` بگذار، درست قبل از `</body>`، تا موقع اجرا همه‌ی عناصرِ بالای آن آماده باشند.",
              },
              {
                type: "tip",
                en: "JavaScript is case-sensitive, brutally. `document` works, `Document` does not. When code 'mysteriously' fails, check the letters first.",
                fa: "جاوااسکریپت به بزرگی و کوچکی حروف حساس است، بی‌رحم‌گونه. `document` کار می‌کند، `Document` نه. وقتی کد «به‌طرز مرموزی» خراب شد، اول حروف را چک کن.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Your first command", fa: "اولین فرمان" },
            blocks: [
              {
                type: "code",
                lang: "js",
                code: `// Find the element with id "out" and change its text
document.querySelector("#out").textContent = "Hello, world!";`,
              },
              {
                type: "text",
                en: "Read it inside-out: `document` is the whole page as an object. `querySelector(\"#out\")` searches the page and returns the element whose id is `out` — the `#` means 'an id'. `.textContent = ...` replaces that element's visible text. This pattern — find, then change — is 80% of what beginners do with JavaScript.",
                fa: "از داخل به بیرون بخوانش: `document` کل صفحه است به شکل یک شیء. `querySelector(\"#out\")` صفحه را می‌گردد و عنصری را برمی‌گرداند که id‌اش `out` است — علامت `#` یعنی «یک id». `.textContent = ...` هم متنِ قابل‌دیدنِ آن عنصر را عوض می‌کند. این الگو — پیدا کن، بعد عوض کن — هشتاد درصدِ کارِ تازه‌کارها با جاوااسکریپت است.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>First script</title>
  </head>
  <body>
    <h1>My first script 🎬</h1>
    <p id="out">Nothing has happened yet...</p>

    <script>
      document.querySelector("#out").textContent = "The script spoke! 👋";
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the paragraph's text was changed by JavaScript, after the page loaded.",
                  fa: "پیش‌نمایش را بزن — متنِ پاراگراف بعد از لودِ صفحه، توسط جاوااسکریپت عوض شده است.",
                },
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Where is the recommended place for the <script> tag?", fa: "جای پیشنهادیِ تگ script کجاست؟" },
                options: [
                  { en: "As the very first line of the page", fa: "اولین خطِ صفحه" },
                  { en: "At the end of <body>, just before </body>", fa: "آخرِ body، درست قبل از </body>" },
                  { en: "Inside the CSS file", fa: "داخل فایل CSS" },
                ],
                answer: 1,
                explain: {
                  en: "At the end of the body, every element above the script already exists — so the script can find and change them immediately.",
                  fa: "در آخرِ body همه‌ی عناصرِ بالای اسکریپت از قبل ساخته شده‌اند — پس اسکریپت همان اول می‌تواند آن‌ها را پیدا و عوض کند.",
                },
              },
              {
                q: { en: "What does document.querySelector(\"#score\") pick?", fa: "document.querySelector(\"#score\") چه چیزی را برمی‌دارد؟" },
                options: [
                  { en: "The element with id=\"score\"", fa: "عنصری که id آن score است" },
                  { en: "Every element on the page", fa: "همه‌ی عناصرِ صفحه" },
                  { en: "The class named score", fa: "کلاسی به نام score" },
                ],
                answer: 0,
                explain: {
                  en: "The `#` prefix means 'match by id'. For classes you would write `.score` with a dot.",
                  fa: "پیشوند `#` یعنی «با id پیدا کن». برای کلاس‌ها با نقطه می‌نویسی: `.score`.",
                },
              },
              {
                q: { en: "Which line changes the visible text of the element with id=\"msg\"?", fa: "کدام خط متنِ قابل‌دیدنِ عنصری با id برابر msg را عوض می‌کند؟" },
                options: [
                  { en: "document.querySelector(\"#msg\").textContent = \"Hi!\";", fa: "document.querySelector(\"#msg\").textContent = \"Hi!\";" },
                  { en: "querySelector.textContent(\"#msg\", \"Hi!\");", fa: "querySelector.textContent(\"#msg\", \"Hi!\");" },
                  { en: "<p id=\"msg\">Hi!</p>", fa: "<p id=\"msg\">Hi!</p>" },
                ],
                answer: 0,
                explain: {
                  en: "Find the element, then assign to its textContent — exactly that order, exactly that spelling.",
                  fa: "اول عنصر را پیدا کن، بعد به textContent‌اش مقدار بده — دقیقاً همین ترتیب، دقیقاً همین املای حروف.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Say it out loud", fa: "بلند بگو" },
            brief: {
              en: "The page has one output box with id \"out\". Inside the <script> tag, find #out and set its textContent to exactly: Hello, TEKA! — then press Check and watch your first JavaScript grade itself.",
              fa: "صفحه یک جعبه‌ی خروجی با id برابر out دارد. داخل تگ script، عنصر #out را پیدا کن و textContent‌اش را دقیقاً بگذار: Hello, TEKA! — بعد دکمه‌ی Check را بزن و ببین اولین جاوااسکریپتِ خودش را تصحیح می‌کند.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My first script</title>
  </head>
  <body>
    <h1>My first script ⚡</h1>
    <!-- Output box: your script will fill this -->
    <p id="out">Empty for now...</p>

    <script>
      // 1) Find the element with id "out" using document.querySelector
      // 2) Set its textContent to exactly: Hello, TEKA!
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My first script</title>
  </head>
  <body>
    <h1>My first script ⚡</h1>
    <!-- Output box: the script fills this -->
    <p id="out">Empty for now...</p>

    <script>
      // 1) Find the element with id "out"
      const box = document.querySelector("#out");
      // 2) Set its textContent — JavaScript is talking!
      box.textContent = "Hello, TEKA!";
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Two steps, two lines: first `const box = document.querySelector(\"#out\");` then assign to `box.textContent`.",
                fa: "دو قدم، دو خط: اول `const box = document.querySelector(\"#out\");` بعد به `box.textContent` مقدار بده.",
              },
              {
                en: "The `#` in \"#out\" matters — it means 'search by id'.",
                fa: "علامت `#` در \"#out\" مهم است — یعنی «با id جست‌وجو کن».",
              },
              {
                en: "The exact text is: Hello, TEKA! — capital letters, comma, exclamation mark.",
                fa: "متنِ دقیق: Hello, TEKA! — با حروف بزرگ، ویرگول و علامت تعجب.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#out", text: "Hello, TEKA!" },
                { selector: "#out", count: 1 },
                { selector: "script", count: 1 },
                { selector: "h1", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m1-l2",
        title: { en: "console.log vs the Page", fa: "console.log در برابر صفحه" },
        goal: {
          en: "Aim your output at the right audience: developer notes to the console, real content to the page.",
          fa: "خروجی‌ات را به مخاطبِ درست بزن: یادداشتِ برنامه‌نویس به کنسول، محتوای واقعی به صفحه.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "Two audiences, two channels", fa: "دو مخاطب، دو کانال" },
            blocks: [
              {
                type: "text",
                en: "JavaScript can speak to TWO different audiences. `console.log(...)` writes into the browser's developer console — invisible to visitors, perfect for inspecting values while you debug. Changing an element's `textContent` writes into the page itself — what real humans see. Same language, two very different megaphones.",
                fa: "جاوااسکریپت با دو مخاطبِ متفاوت حرف می‌زند. `console.log(...)` داخل کنسولِ توسعه‌دهنده‌ی مرورگر می‌نویسد — برای بازدیدکننده‌ها نامرئی است و برای دیدنِ مقادیر موقع اشکال‌زدنی عالی. اما عوض کردنِ `textContent` یک عنصر داخل خودِ صفحه می‌نویسد — همان چیزی که آدم‌های واقعی می‌بینند. یک زبان، دو بلندگوی خیلی متفاوت.",
              },
              {
                type: "code",
                lang: "js",
                code: `// Channel 1: developers only (open DevTools to see it)
console.log("Only developers will ever read this");

// Channel 2: the page itself
document.querySelector("#screen").textContent = "Everyone sees this";`,
              },
              {
                type: "warn",
                en: "console.log NEVER changes the page. The challenges in this course grade what is visible in the DOM — a solution full of console.log lines renders nothing and fails. When a challenge says 'render', it means textContent.",
                fa: "console.log هرگز صفحه را عوض نمی‌کند. چالش‌های این دوره چیزی را نمره می‌دهند که در DOM دیده می‌شود — راه‌حلی که پر از console.log باشد هیچی رندر نمی‌کند و رد می‌شود. وقتی چالش می‌گوید «رندر کن»، یعنی textContent.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Opening the console", fa: "باز کردنِ کنسول" },
            blocks: [
              {
                type: "tip",
                en: "Try it now: press F12 (or right-click → Inspect) and open the Console tab. Every console.log you run shows up there — it is your window into what the code is really thinking.",
                fa: "همین حالا امتحان کن: F12 را بزن (یا راست‌کلیک → Inspect) و تبِ Console را باز کن. هر console.log که اجرا کنی همان‌جا ظاهر می‌شود — کنسول پنجره‌ی توست به اینکه کد واقعاً چه فکری می‌کند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Console vs page</title>
  </head>
  <body>
    <h1>Two ways to speak 📣</h1>
    <div id="screen">...</div>

    <script>
      console.log("Psst — only developers open the console.");
      document.querySelector("#screen").textContent = "Hello, everyone on the page!";
    </script>
  </body>
</html>`,
                caption: {
                  en: "Preview it, then open DevTools → Console: one message went to each audience.",
                  fa: "پیش‌نمایش را بزن، بعد DevTools → Console را باز کن: یک پیام به هر مخاطب رفت.",
                },
              },
              {
                type: "text",
                en: "Professional rhythm: log while building, render for shipping. When you are unsure what a variable holds, `console.log(it)` — when you want the user to see something, put it in the DOM.",
                fa: "ریتمِ حرفه‌ای: موقع ساختن، log کن؛ برای تحویل دادن، رندر کن. وقتی مطمئن نیستی یک متغیر چی دارد، `console.log(it)` بزن — وقتی می‌خواهی کاربر چیزی ببیند، به DOM بده.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which output can a normal website visitor see?", fa: "کدام خروجی را یک بازدیدکننده‌ی معمولی می‌بیند؟" },
                options: [
                  { en: "console.log(\"hi\")", fa: "console.log(\"hi\")" },
                  { en: "element.textContent = \"hi\"", fa: "element.textContent = \"hi\"" },
                  { en: "Both, equally", fa: "هر دو را به یک اندازه" },
                ],
                answer: 1,
                explain: {
                  en: "The console is a developer tool hidden from normal browsing; textContent changes the visible page.",
                  fa: "کنسول ابزارِ توسعه‌دهنده است و در حالت عادی دیده نمی‌شود؛ textContent صفحه‌ی قابل‌دیدن را عوض می‌کند.",
                },
              },
              {
                q: { en: "What is console.log mainly for?", fa: "console.log بیشتر برای چیست؟" },
                options: [
                  { en: "Making pop-up windows", fa: "ساختنِ پنجره‌های پاپ‌آپ" },
                  { en: "Inspecting values while you develop and debug", fa: "دیدنِ مقادیر موقع توسعه و اشکال‌زدن" },
                  { en: "Styling the page", fa: "استایل دادن به صفحه" },
                ],
                answer: 1,
                explain: {
                  en: "It prints values into DevTools so you can check what your code is doing, step by step.",
                  fa: "مقادیر را در DevTools چاپ می‌کند تا قدم‌به‌قدم ببینی کدت چه می‌کند.",
                },
              },
              {
                q: { en: "Your challenge answer renders everything with console.log. What happens?", fa: "اگر جوابِ چالش را همه با console.log رندر کنی چه می‌شود؟" },
                options: [
                  { en: "It passes — the console counts as the page", fa: "قبول می‌شود — کنسول هم حسابِ صفحه است" },
                  { en: "It fails — the graded DOM stays empty", fa: "رد می‌شود — DOM نمره‌گرفته خالی می‌ماند" },
                  { en: "The browser crashes", fa: "مرورگر کرش می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Grading reads the DOM. If the result never lands in an element, the checks find nothing.",
                  fa: "نمره‌دهی DOM را می‌خواند. اگر نتیجه هرگز داخل عنصری ننشیند، چک‌ها چیزی پیدا نمی‌کنند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Double message", fa: "پیامِ دوگانه" },
            brief: {
              en: "The page has two boxes: #log (the developer channel) and #screen (the visitor channel). Write a script that sets #log textContent to exactly: Invisible message for developers — and #screen textContent to exactly: Visible message for visitors.",
              fa: "صفحه دو جعبه دارد: #log (کانالِ توسعه‌دهنده) و #screen (کانالِ بازدیدکننده). اسکریپتی بنویس که textContent‌ی #log را دقیقاً بگذار: Invisible message for developers — و textContent‌ی #screen را دقیقاً: Visible message for visitors.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Two channels</title>
  </head>
  <body>
    <h1>Who is reading? 👀</h1>
    <div id="log">dev channel: empty</div>
    <div id="screen">visitor channel: empty</div>

    <script>
      // 1) Fill #log with: Invisible message for developers
      // 2) Fill #screen with: Visible message for visitors
      // Two elements, two textContent assignments 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Two channels</title>
  </head>
  <body>
    <h1>Who is reading? 👀</h1>
    <div id="log">dev channel: empty</div>
    <div id="screen">visitor channel: empty</div>

    <script>
      // Channel 1: the developer note
      const log = document.querySelector("#log");
      log.textContent = "Invisible message for developers";

      // Channel 2: the visitor-facing message
      const screen = document.querySelector("#screen");
      screen.textContent = "Visible message for visitors";
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The same pattern twice: querySelector, then textContent. Only the id and the message change.",
                fa: "همان الگو، دو بار: querySelector، بعد textContent. فقط id و پیام عوض می‌شود.",
              },
              {
                en: "You can skip the variable: document.querySelector(\"#log\").textContent = \"...\"; works in one line.",
                fa: "می‌توانی متغیر را هم کنار بگذاری: document.querySelector(\"#log\").textContent = \"...\"; در یک خط کار می‌کند.",
              },
              {
                en: "Copy the two messages character by character from the brief — capital letters count.",
                fa: "دو پیام را حرف‌به‌حرف از صورتِ چالش کپی کن — حروف بزرگ مهم‌اند.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#log", text: "Invisible message for developers" },
                { selector: "#screen", text: "Visible message for visitors" },
                { selector: "#log", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m1-l3",
        title: { en: "Statements & Comments", fa: "دستورها و کامنت‌ها" },
        goal: {
          en: "Write clean statements in the right order — and leave human notes the machine politely ignores.",
          fa: "دستورهای تمیز در ترتیبِ درست بنویسی — و یادداشت‌هایی برای آدم‌ها بگذاری که ماشین محترمانه نادیده می‌گیرد.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "One line, one instruction", fa: "یک خط، یک دستور" },
            blocks: [
              {
                type: "text",
                en: "A **statement** is one complete instruction for the browser. JavaScript reads your script from top to bottom and runs statements one by one, in order. Change the order and you change the behavior — the last assignment wins.",
                fa: "یک **دستور** (Statement) یک فرمانِ کامل برای مرورگر است. جاوااسکریپت اسکریپت را از بالا به پایین می‌خواند و دستورها را یکی‌یکی، به ترتیب اجرا می‌کند. ترتیب را عوض کنی، رفتار عوض می‌شود — آخرین مقداردهی برنده است.",
              },
              {
                type: "code",
                lang: "js",
                code: `const out = document.querySelector("#out");
out.textContent = "First";      // this runs...
out.textContent = "Second";    // ...then this overwrites it
// Visitor sees: Second`,
              },
              {
                type: "tip",
                en: "End each statement with a semicolon `;`. JavaScript can often survive without one, but pros keep them — they mark exactly where an instruction ends and prevent rare, painful bugs.",
                fa: "هر دستور را با سمی‌کالن `;` تمام کن. جاوااسکریپت معمولاً بدونش هم زنده می‌ماند، ولی حرفه‌ای‌ها نگهش می‌دارند — سمی‌کالن دقیقاً نشان می‌دهد دستور کجا تمام می‌شود و از باگ‌های کمیابِ دردناک جلوگیری می‌کند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Comments: notes for humans", fa: "کامنت‌ها: یادداشت برای آدم‌ها" },
            blocks: [
              {
                type: "text",
                en: "A **comment** is a note for humans that JavaScript completely ignores. `//` comments out the rest of the LINE; `/* ... */` comments out a whole BLOCK. Use them to explain WHY code exists — and to switch a line off temporarily without deleting it ('commenting out').",
                fa: "یک **کامنت** یادداشتی برای آدم‌هاست که جاوااسکریپت کاملاً نادیده‌اش می‌گیرد. `//` بقیه‌ی آن خط را کامنت می‌کند؛ `/* ... */` یک بلوک کامل را. از کامنت برای توضیحِ «چرا»ی کد استفاده کن — و برای خاموش کردنِ موقتِ یک خط بدون پاک کردنش («کامنت کردن»).",
              },
              {
                type: "code",
                lang: "js",
                code: `// This whole line is ignored
out.textContent = "Visible";   // only the text after // is ignored
/* A block comment:
   out.textContent = "Broken";
   can safely hold dead code */
out.textContent = "Final";`,
              },
              {
                type: "warn",
                en: "A comment can explain code but cannot fix it. If a line is broken, do not just bury it in comments forever — understand it, repair it, and keep the comment to warn your future self.",
                fa: "کامنت می‌تواند کد را توضیح دهد ولی نمی‌تواند درستش کند. اگر خطی خراب است، آن را تا ابد زیر کامنت دفن نکن — بفهمش، تعمیرش کن، و کامنت را برای هشدار به «خودِ آینده‌ات» نگه دار.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does JavaScript do with comments?", fa: "جاوااسکریپت با کامنت‌ها چه می‌کند؟" },
                options: [
                  { en: "Runs them slowly", fa: "آهسته اجرایشان می‌کند" },
                  { en: "Ignores them completely", fa: "کاملاً نادیده می‌گیرد" },
                  { en: "Shows them to visitors", fa: "به بازدیدکننده‌ها نشان می‌دهد" },
                ],
                answer: 1,
                explain: {
                  en: "Comments exist only for humans reading the source. The engine skips them entirely.",
                  fa: "کامنت فقط برای آدم‌هایی است که سورس را می‌خوانند. موتور اجرا ازشان کامل رد می‌شود.",
                },
              },
              {
                q: { en: "Two statements both set #out.textContent. Which text does the visitor see?", fa: "دو دستور هر دو به #out.textContent مقدار می‌دهند. بازدیدکننده کدام متن را می‌بیند؟" },
                options: [
                  { en: "The first one", fa: "اولی را" },
                  { en: "The last one", fa: "آخری را" },
                  { en: "Both, side by side", fa: "هر دو را کنار هم" },
                ],
                answer: 1,
                explain: {
                  en: "Statements run top to bottom; the final assignment overwrites the earlier one.",
                  fa: "دستورها بالا به پایین اجرا می‌شوند؛ مقداردهیِ آخر، قبلی را بازنویسی می‌کند.",
                },
              },
              {
                q: { en: "Which is a correct single-line comment?", fa: "کدام یک کامنتِ صحیحِ تک‌خطی است؟" },
                options: [
                  { en: "// like this", fa: "// مثل این" },
                  { en: "<!-- like this -->", fa: "<!-- مثل این -->" },
                  { en: "** like this **", fa: "** مثل این **" },
                ],
                answer: 0,
                explain: {
                  en: "// is the JavaScript comment. <!-- --> is HTML — it does nothing inside a <script> block.",
                  fa: "// کامنتِ جاوااسکریپت است. <!-- --> مالِ HTML است — داخل بلوک script هیچ کاری نمی‌کند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Statement doctor", fa: "دکترِ دستورها" },
            brief: {
              en: "The starter script contains a broken line, already switched off with a comment. Below it, write TWO correct statements: set #first textContent to exactly: Statements run in order — then set #second textContent to exactly: One line, one instruction.",
              fa: "اسکریپتِ شروع یک خطِ خراب دارد که از قبل با کامنت خاموش شده. زیرش دو دستورِ سالم بنویس: اول textContent‌ی #first را دقیقاً بگذار: Statements run in order — بعد textContent‌ی #second را دقیقاً: One line, one instruction.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Statement doctor</title>
  </head>
  <body>
    <h1>Doctor, fix the flow 🩺</h1>
    <p id="first">...</p>
    <p id="second">...</p>

    <script>
      // This line is broken — that is why it is commented out:
      // first.textContent = ;  // <- nothing to assign!

      // Now write two healthy statements:
      // 1) #first gets: Statements run in order
      // 2) #second gets: One line, one instruction

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Statement doctor</title>
  </head>
  <body>
    <h1>Doctor, fix the flow 🩺</h1>
    <p id="first">...</p>
    <p id="second">...</p>

    <script>
      // This line is broken — that is why it is commented out:
      // first.textContent = ;  // <- nothing to assign!

      // Statement 1: runs first
      document.querySelector("#first").textContent = "Statements run in order";

      // Statement 2: runs second
      document.querySelector("#second").textContent = "One line, one instruction";
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Find the element first: document.querySelector(\"#first\"). Then assign the message to its textContent.",
                fa: "اول عنصر را پیدا کن: document.querySelector(\"#first\"). بعد پیام را به textContent‌اش بده.",
              },
              {
                en: "One statement per line, each ending with a semicolon.",
                fa: "هر خط یک دستور، هر دستور با سمی‌کالن تمام شود.",
              },
              {
                en: "Order matters: #first must be filled by the statement ABOVE the one filling #second.",
                fa: "ترتیب مهم است: #first باید با دستوری پر شود که بالایِ دستورِ #second است.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#first", text: "Statements run in order" },
                { selector: "#second", text: "One line, one instruction" },
                { selector: "p", count: 2 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m1-l4",
        title: { en: "Mini-project: Self Intro Card", fa: "مینی‌پروژه: کارت معرفی" },
        goal: {
          en: "Combine everything from module 1: three variables, three finds, three renders — one personal card.",
          fa: "همه‌چیزِ ماژول یک را ترکیب کنی: سه متغیر، سه بار پیدا کردن، سه بار رندر — یک کارتِ شخصی.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "Plan first, type second", fa: "اول طرح، بعد تایپ" },
            blocks: [
              {
                type: "text",
                en: "Mini-projects are where tools become skills. This one has a three-beat rhythm you will reuse forever: **1)** store your data in variables, **2)** find each target element, **3)** render each value into its slot. Plan the three beats before touching the keyboard.",
                fa: "مینی‌پروژه‌ها جایی‌اند که ابزارها مهارت می‌شوند. این یکی ریتمِ سه‌ضربی‌ای دارد که همیشه استفاده می‌کنی: **۱)** داده‌هایت را در متغیرها بریز، **۲)** هر عنصرِ مقصد را پیدا کن، **۳)** هر مقدار را در جای خودش رندر کن. قبل از تایپ، این سه ضرب را طرح بزن.",
              },
              {
                type: "code",
                lang: "js",
                code: `// Beat 1 — the data
const myName = "Sara";
const myCity = "Tehran";
const myGoal = "web developer";

// Beat 2 + 3 — find each element, render into it
document.querySelector("#name").textContent = myName;
document.querySelector("#city").textContent = myCity;
document.querySelector("#goal").textContent = myGoal;`,
              },
              {
                type: "tip",
                en: "Why store values in variables instead of typing them straight into the render line? One change updates every copy — and your code reads like a sentence about YOU, not a pile of magic strings.",
                fa: "چرا مقدارها را در متغیر بریزیم و مستقیم توی خطِ رندر ننویسیم؟ یک تغییر، همه‌ی نسخه‌ها را به‌روز می‌کند — و کدت مثل یک جمله درباره‌ی «خودت» خوانده می‌شود، نه انبوهی از رشته‌های جادویی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The card, assembled", fa: "کارت، سرهم‌شده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Self intro card</title>
  </head>
  <body style="font-family: sans-serif">
    <div style="border: 2px solid #10b981; border-radius: 12px; padding: 16px; max-width: 320px">
      <h1 style="margin: 0 0 8px">🪪 <span id="name">?</span></h1>
      <p style="margin: 4px 0">City: <span id="city">?</span></p>
      <p style="margin: 4px 0">Goal: <span id="goal">?</span></p>
    </div>

    <script>
      const myName = "Aria";
      document.querySelector("#name").textContent = myName;
    </script>
  </body>
</html>`,
                caption: {
                  en: "A tiny card layout — the spans with ids are the slots your script fills.",
                  fa: "یک چیدمانِ کارتِ کوچک — spanهایی که id دارند، خانه‌هایی هستند که اسکریپت پر می‌کند.",
                },
              },
              {
                type: "warn",
                en: "Match ids exactly: the script's \"#city\" must equal the HTML's id=\"city\" — letter for letter. A silent mismatch means querySelector returns null and the next line crashes.",
                fa: "id‌ها را دقیقاً جور کن: \"#city\" در اسکریپت باید با id=\"city\" در HTML مو‌به‌مو برابر باشد. یک عدم‌تطابقِ بی‌سروصدا یعنی querySelector مقدار null برمی‌گرداند و خطِ بعدی کرش می‌کند.",
              },
              {
                type: "tip",
                en: "After passing, make the card yours: swap in your real name and city — the structure will not break, because the variables carry the data.",
                fa: "بعد از قبول شدن، کارت را مالِ خودت کن: اسم و شهرِ واقعی‌ات را بگذار — ساختار نمی‌شکند، چون داده‌ها را متغیرها حمل می‌کنند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why store 'Sara' in a variable before rendering it?", fa: "چرا «Sara» را قبل از رندر در متغیر بریزیم؟" },
                options: [
                  { en: "The page renders faster", fa: "صفحه سریع‌تر رندر می‌شود" },
                  { en: "The data lives in one place — easy to change and reuse", fa: "داده یک‌جا زندگی می‌کند — تغییر و استفاده‌ی مجددش راحت است" },
                  { en: "Variables are required by HTML", fa: "HTML متغیر را الزامی کرده" },
                ],
                answer: 1,
                explain: {
                  en: "One variable, many renders: change it once and every slot that uses it updates together.",
                  fa: "یک متغیر، چند رندر: یک بار عوضش کنی، همه‌ی خانه‌هایی که ازش استفاده می‌کنند با هم به‌روز می‌شوند.",
                },
              },
              {
                q: { en: "querySelector(\"#goal\") returns null. What is the most likely cause?", fa: "querySelector(\"#goal\") مقدار null برمی‌گرداند. محتمل‌ترین دلیل چیست؟" },
                options: [
                  { en: "No element has id=\"goal\"", fa: "هیچ عنصری id برابر goal ندارد" },
                  { en: "The variable is a string", fa: "متغیر رشته است" },
                  { en: "The script is too long", fa: "اسکریپت خیلی طولانی است" },
                ],
                answer: 0,
                explain: {
                  en: "null means 'nothing matched' — a typo in the id or a missing element. Check both spellings.",
                  fa: "null یعنی «هیچ چیز پیدا نشد» — یک غلطِ تایپی در id یا عنصری که وجود ندارد. هر دو املای حروف را چک کن.",
                },
              },
              {
                q: { en: "Which order keeps the script working?", fa: "کدام ترتیب اسکریپت را سالم نگه می‌دارد؟" },
                options: [
                  { en: "Render first, declare variables later", fa: "اول رندر، بعد تعریف متغیرها" },
                  { en: "Declare variables, then render", fa: "اول متغیرها، بعد رندر" },
                  { en: "It does not matter", fa: "فرقی نمی‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Statements run top to bottom — a value must exist before the line that uses it.",
                  fa: "دستورها بالا به پایین اجرا می‌شوند — مقدار باید قبل از خطی که ازش استفاده می‌کند وجود داشته باشد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Self Intro Card", fa: "کارت معرفی" },
            brief: {
              en: "Build the intro card with these exact values: name → Sara, city → Tehran, goal → web developer. Store each one in its own variable, then render them into the #name, #city and #goal spans. After passing, swap the values to make it truly yours.",
              fa: "کارت معرفی را با این مقادیرِ دقیق بساز: name → Sara، city → Tehran، goal → web developer. هرکدام را در متغیرِ خودش بریز، بعد در spanهای #name و #city و #goal رندر کن. بعد از قبول شدن، مقدارها را عوض کن تا واقعاً مالِ خودت شود.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Self Intro Card</title>
  </head>
  <body>
    <div class="card">
      <h1>🪪 <span id="name">?</span></h1>
      <p>City: <span id="city">?</span></p>
      <p>Goal: <span id="goal">?</span></p>
    </div>

    <script>
      // Beat 1: three variables — myName "Sara", myCity "Tehran", myGoal "web developer"
      // Beat 2: render each into its span: #name, #city, #goal
      // Three variables + three renders 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Self Intro Card</title>
  </head>
  <body>
    <div class="card">
      <h1>🪪 <span id="name">?</span></h1>
      <p>City: <span id="city">?</span></p>
      <p>Goal: <span id="goal">?</span></p>
    </div>

    <script>
      // Beat 1: the data, in variables
      const myName = "Sara";
      const myCity = "Tehran";
      const myGoal = "web developer";

      // Beat 2: find each slot, render each value
      document.querySelector("#name").textContent = myName;
      document.querySelector("#city").textContent = myCity;
      document.querySelector("#goal").textContent = myGoal;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Variables first: const myName = \"Sara\"; — then three render lines under them.",
                fa: "اول متغیرها: const myName = \"Sara\"; — بعد سه خطِ رندر زیرشان.",
              },
              {
                en: "Each render follows the pattern: document.querySelector(\"#city\").textContent = myCity;",
                fa: "هر رندر از همین الگو پیروی می‌کند: document.querySelector(\"#city\").textContent = myCity;",
              },
              {
                en: "The goal value is 'web developer' — lowercase w, one space.",
                fa: "مقدارِ goal برابر 'web developer' است — w کوچک، یک فاصله.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#name", text: "Sara" },
                { selector: "#city", text: "Tehran" },
                { selector: "#goal", text: "web developer" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 2 ────────────────────────────────────────────
  {
    id: "js-m2",
    title: { en: "Variables & Types", fa: "متغیرها و نوع‌ها" },
    blurb: {
      en: "Labelled boxes for data: let, const, numbers, strings, booleans — plus template literals, the string tool you will use every single day.",
      fa: "جعبه‌های برچسب‌دار برای داده: let و const، عدد و رشته و بولین — به‌علاوه‌ی template literal، ابزارِ رشته‌ای که هر روز استفاده می‌کنی.",
    },
    lessons: [
      {
        id: "js-m2-l1",
        title: { en: "Boxes: let, const, numbers & strings", fa: "جعبه‌ها: let و const، عدد و رشته" },
        goal: {
          en: "Store data in let/const variables and tell numbers and strings apart — including when + glues instead of adds.",
          fa: "داده را در متغیرهای let و const بریزی و عدد را از رشته تشخیص دهی — حتی وقتی + به‌جای جمع کردن می‌چسباند.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "let: a box you can refill", fa: "let: جعبه‌ای که می‌شود پرش کرد" },
            blocks: [
              {
                type: "text",
                en: "A variable is a labelled box for a value. You create one with `let` (refillable) or `const` (sealed after the first fill). Creating and filling in one line is called **declaring and initializing**. From that line on, the box's name IS its value — write the name, JavaScript brings the content.",
                fa: "متغیر یک جعبه‌ی برچسب‌دار برای یک مقدار است. با `let` می‌سازیش (پُرکردنی) یا با `const` (بعد از اولین پُر شدن، مهروموم‌شده). ساختن و پُر کردن در یک خط را «اعلام و مقداردهی» می‌گویند. از آن خط به بعد، نامِ جعبه همان مقدارش است — نام را بنویسی، جاوااسکریپت محتوا را می‌آورد.",
              },
              {
                type: "code",
                lang: "js",
                code: `let score = 10;   // create + fill
score = 15;       // refill — allowed with let
const birthYear = 2008;  // sealed: never reassign this`,
              },
              {
                type: "warn",
                en: "Reassigning a const throws an error and stops the whole script. Default to const; reach for let ONLY when the value must change later. (The graded scripts you have met so far all use const — so a wrong let has never bitten you here.)",
                fa: "مقداردهیِ دوباره به یک const خطا می‌دهد و کل اسکریپت را متوقف می‌کند. پیش‌فرضت const باشد؛ فقط وقتی مقدار باید بعداً عوض شود سراغ let برو. (اسکریپت‌های نمره‌ای‌ای که تا اینجا دیده‌ای همه const دارند — پس let اشتباه هنوز گازت نگرفته.)",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Numbers meet strings", fa: "وقتی عدد به رشته می‌رسد" },
            blocks: [
              {
                type: "text",
                en: "Two types you will use constantly: **number** — plain digits, no quotes (`7`, `3.14`, `-2`) — and **string** — text wrapped in quotes (`\"7\"`, `\"hello\"`). Same characters, different type, different behavior: number + number is math; string + string is gluing (**concatenation**).",
                fa: "دو نوعی که مدام استفاده می‌کنی: **عدد** (number) — فقط رقم، بدون گیومه (`7`، `3.14`، `-2`) — و **رشته** (string) — متن داخل گیومه (`\"7\"`، `\"hello\"`). همان کاراکترها، نوعِ متفاوت، رفتارِ متفاوت: عدد + عدد ریاضی است؛ رشته + رشته چسباندن است (**ترکیب رشته‌ها**).",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Numbers in action</title>
  </head>
  <body>
    <h1>Math, live ⚡</h1>
    <p>7 + 3 = <span id="sum">?</span></p>
    <p>"7" + "3" = <span id="glued">?</span></p>

    <script>
      document.querySelector("#sum").textContent = 7 + 3;        // 10
      document.querySelector("#glued").textContent = "7" + "3";  // 73
    </script>
  </body>
</html>`,
                caption: {
                  en: "Quotes change everything: 10 vs 73. Watch the preview.",
                  fa: "گیومه همه‌چیز را عوض می‌کند: 10 در برابر 73. پیش‌نمایش را ببین.",
                },
              },
              {
                type: "tip",
                en: "Mixing types glues too: `7 + \"3\"` is \"73\". If a calculation ever goes strangely long or glued, suspect quotes around a number.",
                fa: "قاطی کردن هم می‌چسباند: `7 + \"3\"` می‌شود \"73\". اگر یک محاسبه یک‌باره کش‌دار یا چسبیده شد، به گیومه‌ی دورِ عدد شک کن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "const x = 5; then x = 9; — what happens?", fa: "const x = 5; بعد x = 9; — چه می‌شود؟" },
                options: [
                  { en: "x becomes 9", fa: "x می‌شود 9" },
                  { en: "An error — const cannot be reassigned", fa: "خطا — const را نمی‌شود دوباره مقدار داد" },
                  { en: "x becomes 59", fa: "x می‌شود 59" },
                ],
                answer: 1,
                explain: {
                  en: "const is sealed after initialization. Need a refillable box? Use let.",
                  fa: "const بعد از مقداردهیِ اول مهروموم است. جعبه‌ی پُرکردنی می‌خواهی؟ let.",
                },
              },
              {
                q: { en: "What is \"7\" + 3 ?", fa: "نتیجه‌ی \"7\" + 3 چیست؟" },
                options: [
                  { en: "10", fa: "10" },
                  { en: "\"73\"", fa: "\"73\"" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 1,
                explain: {
                  en: "When one side is a string, + switches from math to concatenation: \"7\" + 3 → \"73\".",
                  fa: "وقتی یک طرف رشته باشد، + از ریاضی به چسباندن می‌زند: \"7\" + 3 → \"73\".",
                },
              },
              {
                q: { en: "Which is a valid variable name?", fa: "کدام یک نامِ متغیرِ مجاز است؟" },
                options: [
                  { en: "2cool", fa: "2cool" },
                  { en: "my-name", fa: "my-name" },
                  { en: "userName", fa: "userName" },
                ],
                answer: 2,
                explain: {
                  en: "Names cannot start with a digit or contain dashes. camelCase like userName is the convention.",
                  fa: "نام‌ها نمی‌توانند با رقم شروع شوند یا خطِ تیره داشته باشند. camelCase مثل userName رسمِ رایج است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Instant math", fa: "ریاضیِ فوری" },
            brief: {
              en: "The page shows the label \"7 + 3 =\" and an empty #sum box. Store 7 and 3 in two const variables, add them, and render the result into #sum. The box must show exactly: 10",
              fa: "صفحه برچسبِ \"7 + 3 =\" و جعبه‌ی خالیِ #sum را نشان می‌دهد. عدد 7 و 3 را در دو متغیر const بریز، جمعشان کن و نتیجه را در #sum رندر کن. جعبه باید دقیقاً نشان بدهد: 10",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Instant math</title>
  </head>
  <body>
    <h1>The adding machine ➕</h1>
    <p id="label">7 + 3 = <span id="sum">?</span></p>

    <script>
      // 1) Two const variables: a = 7, b = 3
      // 2) A third const: sum = a + b
      // 3) Render sum into #sum — expected: 10

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Instant math</title>
  </head>
  <body>
    <h1>The adding machine ➕</h1>
    <p id="label">7 + 3 = <span id="sum">?</span></p>

    <script>
      // 1) Two numbers in two sealed boxes
      const a = 7;
      const b = 3;
      // 2) Add them (number + number = math)
      const sum = a + b; // Expected: 10
      // 3) Render the result
      document.querySelector("#sum").textContent = sum;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Write numbers WITHOUT quotes: const a = 7; — quotes would make it text.",
                fa: "عدد را بدون گیومه بنویس: const a = 7; — گیومه آن را متن می‌کند.",
              },
              {
                en: "const sum = a + b; — then one render line for #sum.",
                fa: "const sum = a + b; — بعد یک خطِ رندر برای #sum.",
              },
              {
                en: "Expected output in the box: 10 — if you see 73, a quote sneaked in.",
                fa: "خروجیِ مورد انتظار در جعبه: 10 — اگر 73 دیدی، یک گیومه قاچاق شده.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#sum", text: "10" },
                { selector: "#sum", count: 1 },
                { selector: "#label", text: "7 + 3 =" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m2-l2",
        title: { en: "Booleans & typeof", fa: "بولین‌ها و typeof" },
        goal: {
          en: "Meet true/false values and use typeof to ask any value what type it is.",
          fa: "با مقادیر true و false آشنا شوی و با typeof از هر مقداری بپرسی چه نوعی است.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "The two-value type", fa: "نوعِ دومقداری" },
            blocks: [
              {
                type: "text",
                en: "A **boolean** is the smallest useful type: exactly `true` or `false` — no quotes, no other options. Booleans are the fuel of decisions: next module, every `if` will swallow one and choose a path. A comparison question produces one: `7 > 3` is `true`, `2 === 5` is `false`.",
                fa: "یک **بولین** (boolean) کوچک‌ترین نوعِ مفید است: دقیقاً `true` یا `false` — بدون گیومه، بدون گزینه‌ی دیگر. بولین‌ها سوختِ تصمیم‌ها هستند: در ماژول بعد هر `if` یکی را می‌بلعد و یک مسیر انتخاب می‌کند. یک سؤالِ مقایسه‌ای هم یکی تولید می‌کند: `7 > 3` می‌شود `true`، `2 === 5` می‌شود `false`.",
              },
              {
                type: "code",
                lang: "js",
                code: `const isOpen = true;      // a boolean box
const isRaining = false;

const isBig = 100 > 50;   // comparisons produce booleans
// isBig is true`,
              },
              {
                type: "tip",
                en: "true and false are keywords, not strings: `true` works, `\"true\"` is just text. No quotes on booleans — ever.",
                fa: "true و false کلمه‌ی کلیدی‌اند، نه رشته: `true` کار می‌کند، `\"true\"` فقط متن است. روی بولین‌ها هیچ‌وقت گیومه نگذار.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "typeof: the type detective", fa: "typeof: کارآگاهِ نوع‌ها" },
            blocks: [
              {
                type: "text",
                en: "Not sure what is inside a box? Ask with `typeof` — it returns a small string naming the type: `typeof 42` is `\"number\"`, `typeof \"hi\"` is `\"string\"`, `typeof true` is `\"boolean\"`. It is the first debugging tool you will reach for when values behave strangely.",
                fa: "مطمئن نیستی داخل جعبه چیست؟ با `typeof` بپرس — یک رشته‌ی کوچک برمی‌گرداند که نامِ نوع است: `typeof 42` می‌شود `\"number\"`، `typeof \"hi\"` می‌شود `\"string\"`، `typeof true` می‌شود `\"boolean\"`. اولین ابزارِ اشکال‌زدنیت خواهد بود وقتی مقادیر عجیب رفتار می‌کنند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Type detective</title>
  </head>
  <body>
    <h1>What am I? 🔎</h1>
    <p>typeof 42 → <span id="t1">?</span></p>
    <p>typeof "hi" → <span id="t2">?</span></p>
    <p>typeof true → <span id="t3">?</span></p>

    <script>
      document.querySelector("#t1").textContent = typeof 42;     // number
      document.querySelector("#t2").textContent = typeof "hi";   // string
      document.querySelector("#t3").textContent = typeof true;   // boolean
    </script>
  </body>
</html>`,
                caption: {
                  en: "Three values, three types — each rendered into its own span.",
                  fa: "سه مقدار، سه نوع — هرکدام در span خودش رندر شده.",
                },
              },
              {
                type: "warn",
                en: "typeof returns a STRING (like \"number\"), not a bare word. That is great news for rendering: you can drop it straight into textContent.",
                fa: "typeof یک رشته برمی‌گرداند (مثل \"number\")، نه کلمه‌ی لخت. برای رندر کردن خبرِ خوبی است: می‌توانی مستقیم داخل textContent بگذاری.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is typeof true?", fa: "typeof true چه برمی‌گرداند؟" },
                options: [
                  { en: "\"boolean\"", fa: "\"boolean\"" },
                  { en: "\"true\"", fa: "\"true\"" },
                  { en: "\"yes\"", fa: "\"yes\"" },
                ],
                answer: 0,
                explain: {
                  en: "typeof names the TYPE of the value, and true's type is boolean — returned as the string \"boolean\".",
                  fa: "typeof نامِ «نوعِ» مقدار را برمی‌گرداند و نوعِ true بولین است — به شکل رشته‌ی \"boolean\".",
                },
              },
              {
                q: { en: "Which line stores a boolean correctly?", fa: "کدام خط یک بولین را درست ذخیره می‌کند؟" },
                options: [
                  { en: "const ok = \"true\";", fa: "const ok = \"true\";" },
                  { en: "const ok = true;", fa: "const ok = true;" },
                  { en: "const ok = TRUE;", fa: "const ok = TRUE;" },
                ],
                answer: 1,
                explain: {
                  en: "No quotes (it is not text) and lowercase — JS keywords are case-sensitive.",
                  fa: "بدون گیومه (متن نیست) و با حروف کوچک — کلماتِ کلیدیِ JS به بزرگی حروف حساس‌اند.",
                },
              },
              {
                q: { en: "What does typeof return?", fa: "typeof چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "A number counting the types", fa: "عددی که تعداد نوع‌ها را می‌شمارد" },
                  { en: "A string naming the value's type", fa: "رشته‌ای که نوعِ مقدار را نام می‌برد" },
                  { en: "The value itself", fa: "خودِ مقدار" },
                ],
                answer: 1,
                explain: {
                  en: "Always a small string: \"number\", \"string\", \"boolean\" — perfect for rendering or logging.",
                  fa: "همیشه یک رشته‌ی کوچک: \"number\"، \"string\"، \"boolean\" — برای رندر یا log کردن عالی.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The type report", fa: "گزارشِ نوع‌ها" },
            brief: {
              en: "Fill the report: create one const per type — a number (like 42), a string (like \"hi\") and a boolean (true) — then use typeof to render each one's type into its span: #t1 must show number, #t2 string, #t3 boolean.",
              fa: "گزارش را پر کن: برای هر نوع یک const بساز — یک عدد (مثل 42)، یک رشته (مثل \"hi\") و یک بولین (true) — بعد با typeof نوعِ هرکدام را در span خودش رندر کن: #t1 باید number را نشان بدهد، #t2 رشته، #t3 بولین.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Type report</title>
  </head>
  <body>
    <h1>Report of the three types 📋</h1>
    <p>Value 1 is a <span id="t1">?</span></p>
    <p>Value 2 is a <span id="t2">?</span></p>
    <p>Value 3 is a <span id="t3">?</span></p>

    <script>
      // 1) Three consts: a number, a string, a boolean
      // 2) Render typeof each into #t1, #t2, #t3
      // Expected types: number / string / boolean

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Type report</title>
  </head>
  <body>
    <h1>Report of the three types 📋</h1>
    <p>Value 1 is a <span id="t1">?</span></p>
    <p>Value 2 is a <span id="t2">?</span></p>
    <p>Value 3 is a <span id="t3">?</span></p>

    <script>
      // 1) One box per type
      const n = 42;        // a number
      const s = "hi";      // a string
      const b = true;      // a boolean

      // 2) typeof asks each box what it holds
      document.querySelector("#t1").textContent = typeof n; // Expected: number
      document.querySelector("#t2").textContent = typeof s; // Expected: string
      document.querySelector("#t3").textContent = typeof b; // Expected: boolean
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "typeof 42, typeof \"hi\" and typeof true — each result goes into its own span.",
                fa: "typeof 42، typeof \"hi\" و typeof true — هر نتیجه در span خودش می‌رود.",
              },
              {
                en: "One render line per span: document.querySelector(\"#t1\").textContent = typeof n;",
                fa: "برای هر span یک خطِ رندر: document.querySelector(\"#t1\").textContent = typeof n;",
              },
              {
                en: "Remember: no quotes around true — and the words number/string/boolean appear automatically, do not type them yourself.",
                fa: "یادت باشد: دورِ true گیومه نگذار — و کلمه‌های number/string/boolean خودکار ظاهر می‌شوند، خودت تایپشان نکن.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#t1", text: "number" },
                { selector: "#t2", text: "string" },
                { selector: "#t3", text: "boolean" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m2-l3",
        title: { en: "Template literals", fa: "تمپلیت لیترال‌ها" },
        goal: {
          en: "Build living sentences with backticks and ${...} holes — strings that weave variables inside themselves.",
          fa: "جمله‌های زنده با بک‌تیک و حفره‌های ${...} بسازی — رشته‌هایی که متغیرها را داخل خودشان می‌بافند.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "The glue era is over", fa: "عصرِ چسباندن تمام است" },
            blocks: [
              {
                type: "text",
                en: "Gluing sentences with `+` works but gets ugly fast: `\"Hello, \" + name + \"! You are \" + age` — quotes everywhere, one missed `+` and the sentence breaks. The modern tool is the **template literal**: a string written between BACKTICKS (`` ` `` — the key above Tab) that accepts variables inside `${...}` holes.",
                fa: "چسباندنِ جمله‌ها با `+` کار می‌کند ولی سریع زشت می‌شود: `\"Hello, \" + name + \"! You are \" + age` — گیومه همه‌جا، یک `+` جامانده و جمله خراب. ابزارِ مدرن **تمپلیت لیترال** است: رشته‌ای که بین بک‌تیک‌ها نوشته می‌شود (`` ` `` — کلیدِ بالای Tab) و متغیرها را داخل حفره‌های `${...}` می‌پذیرد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const name = "Aria";
const age = 17;

// The old way (glue)
const old = "Hello, " + name + "! Age: " + age;

// The template literal way
const modern = \`Hello, \${name}! Age: \${age}\`;
// both are "Hello, Aria! Age: 17"`,
              },
              {
                type: "tip",
                en: "The two ingredients of \\${...}: the dollar sign and curly braces, INSIDE backticks. Anything between the braces is real JavaScript — `\\${age + 1}` computes, `\\${name.toUpperCase()}` transforms.",
                fa: "دو عنصرِ \\${...}: علامت دلار و آکولاد، داخل بک‌تیک. هرچه بین آکولادها باشد جاوااسکریپتِ واقعی است — `\\${age + 1}` محاسبه می‌کند، `\\${name.toUpperCase()}` تبدیل می‌کند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Multi-line superpower", fa: "قدرتِ چندخطی" },
            blocks: [
              {
                type: "text",
                en: "A second superpower: template literals can span multiple lines — just press Enter inside the backticks. Normal quotes forbid it. That is why template literals will later build whole HTML snippets.",
                fa: "یک ابرقدرتِ دوم: تمپلیت لیترال می‌تواند چندخطی باشد — فقط داخل بک‌تیک‌ها Enter بزن. گیومه‌های معمولی چنین چیزی را ممنوع می‌کنند. به همین دلیل بعداً تمپلیت لیترال‌ها تکه‌های کاملِ HTML می‌سازند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Living sentences</title>
  </head>
  <body>
    <h1>Greeting machine 💬</h1>
    <p id="msg">?</p>
    <p id="bye">?</p>

    <script>
      const name = "Sara";
      const snack = "cookies";

      document.querySelector("#msg").textContent = \`Hi \${name}! Want some \${snack}?\`;
      document.querySelector("#bye").textContent = \`Bye \${name}. See you soon.\`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "One template literal per message — the variables weave themselves into the sentences.",
                  fa: "برای هر پیام یک تمپلیت لیترال — متغیرها خودشان را داخل جمله‌ها می‌بافند.",
                },
              },
              {
                type: "warn",
                en: "Three symbols, one job each: backtick ` opens/closes the literal, ${ opens a hole, } closes it. A plain quote \" inside will NOT open a hole — and forgetting the closing } is the classic crash of this lesson.",
                fa: "سه نماد، هرکدام یک کار: بک‌تیک ` لیترال را باز/بسته می‌کند، ${ حفره را باز می‌کند و } می‌بندد. گیومه‌ی معمولی \" حفره باز نمی‌کند — و فراموش کردنِ } پایانی همان کرشِ معروفِ این درس است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which uses a template literal correctly?", fa: "کدام یک تمپلیت لیترال را درست استفاده می‌کند؟" },
                options: [
                  { en: "\"Hello ${name}\"", fa: "\"Hello ${name}\"" },
                  { en: "`Hello ${name}`", fa: "`Hello ${name}`" },
                  { en: "`Hello name`", fa: "`Hello name`" },
                ],
                answer: 1,
                explain: {
                  en: "Backticks are mandatory, and the ${...} hole is what injects the variable. Plain quotes keep ${name} as literal text.",
                  fa: "بک‌تیک اجباری است و حفره‌ی ${...} است که متغیر را تزریق می‌کند. گیومه‌ی معمولی ${name} را همان متنِ خشک نگه می‌دارد.",
                },
              },
              {
                q: { en: "const age = 17; what is `Age: ${age + 1}`?", fa: "const age = 17; نتیجه‌ی `Age: ${age + 1}` چیست؟" },
                options: [
                  { en: "\"Age: 18\" — the hole computes", fa: "\"Age: 18\" — حفره محاسبه می‌کند" },
                  { en: "\"Age: age + 1\"", fa: "\"Age: age + 1\"" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 0,
                explain: {
                  en: "Inside ${...} sits real JavaScript — it evaluates (to 18) and the result is placed in the string.",
                  fa: "داخل ${...} جاوااسکریپتِ واقعی است — محاسبه می‌شود (18) و نتیجه در رشته می‌نشیند.",
                },
              },
              {
                q: { en: "Why do template literals beat \"a\" + b + \"c\" gluing?", fa: "چرا تمپلیت لیترال از چسباندنِ \"a\" + b + \"c\" بهتر است؟" },
                options: [
                  { en: "It runs faster", fa: "سریع‌تر اجرا می‌شود" },
                  { en: "It is easier to read and harder to break", fa: "خواناتر است و سخت‌تر خراب می‌شود" },
                  { en: "It works in HTML too", fa: "در HTML هم کار می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "The sentence stays whole — no quote/+ gymnastics, no missed pluses.",
                  fa: "جمله یکپارچه می‌ماند — نه شیرین‌کاریِ گیومه و +، نه +ِ جامانده.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The greeting machine", fa: "ماشینِ سلام و احوال‌پرسی" },
            brief: {
              en: "Feed the machine two variables — name = \"Aria\" and drink = \"tea\" — then build two template literals: #msg must show exactly: Hello Aria! Want some tea? — and #bye must show: Bye Aria. See you soon.",
              fa: "به ماشین دو متغیر بده — name = \"Aria\" و drink = \"tea\" — بعد دو تمپلیت لیترال بساز: #msg باید دقیقاً نشان بدهد: Hello Aria! Want some tea? — و #bye باید نشان بدهد: Bye Aria. See you soon.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Greeting machine</title>
  </head>
  <body>
    <h1>The greeting machine 💬</h1>
    <p id="msg">?</p>
    <p id="bye">?</p>

    <script>
      // 1) const name = "Aria";  const drink = "tea";
      // 2) Fill #msg with a template literal:
      //    Hello Aria! Want some tea?
      // 3) Fill #bye with: Bye Aria. See you soon.

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Greeting machine</title>
  </head>
  <body>
    <h1>The greeting machine 💬</h1>
    <p id="msg">?</p>
    <p id="bye">?</p>

    <script>
      // 1) The ingredients
      const name = "Aria";
      const drink = "tea";

      // 2) Weave them into sentences with backticks
      const msg = \`Hello \${name}! Want some \${drink}?\`; // Expected: Hello Aria! Want some tea?
      const bye = \`Bye \${name}. See you soon.\`;         // Expected: Bye Aria. See you soon.

      // 3) Render both
      document.querySelector("#msg").textContent = msg;
      document.querySelector("#bye").textContent = bye;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Wrap the sentence in backticks, drop the variables into ${name} and ${drink}.",
                fa: "جمله را داخل بک‌تیک بپیچ و متغیرها را در ${name} و ${drink} بگذار.",
              },
              {
                en: "The key above Tab gives you a backtick ` — plain quotes will NOT make the holes work.",
                fa: "کلیدِ بالای Tab بک‌تیک ` می‌دهد — گیومه‌ی معمولی حفره‌ها را کار نمی‌اندازد.",
              },
              {
                en: "Build each sentence in a const first (msg, bye), then two render lines.",
                fa: "هر جمله را اول در یک const بساز (msg و bye)، بعد دو خطِ رندر.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#msg", text: "Hello Aria!" },
                { selector: "#msg", text: "Want some tea?" },
                { selector: "#bye", text: "Bye Aria." },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m2-l4",
        title: { en: "Mini-project: Age Calculator", fa: "مینی‌پروژه: محاسبه‌گرِ سن" },
        goal: {
          en: "Ship your first data pipeline: constants in, one subtraction, a template-limited sentence out.",
          fa: "اولین خطِ لوله‌کشیِ داده‌ات را تحویل بده: ثابت‌ها داخل، یک تفریق، یک جمله با تمپلیت لیترال بیرون.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Programs are pipelines", fa: "برنامه‌ها لوله‌اند" },
            blocks: [
              {
                type: "text",
                en: "Almost every program is a pipeline: **input → computation → output**. The Age Calculator is the simplest honest example: two constants go in, one subtraction computes the age, a template literal dresses the number in words, textContent ships it to the screen. Learn to see this shape and every future project is just a longer pipe.",
                fa: "تقریباً هر برنامه‌ای یک لوله است: **ورودی → محاسبه → خروجی**. محاسبه‌گرِ ساده‌ترین مثالِ صادقانه است: دو ثابت داخل می‌روند، یک تفریق سن را حساب می‌کند، یک تمپلیت لیترال عدد را در کلمه‌ها می‌پوشاند و textContent آن را به صفحه می‌فرستد. این شکل را یاد بگیری، هر پروژه‌ی آینده فقط یک لوله‌ی بلندتر است.",
              },
              {
                type: "code",
                lang: "js",
                code: `// input
const birthYear = 2008;
const thisYear = 2026;

// computation
const age = thisYear - birthYear; // 18

// output
const sentence = \`You are \${age} years old.\`;`,
              },
              {
                type: "tip",
                en: "Name constants after what they MEAN, not their type: birthYear, not number1. Future-you reads names, not memories.",
                fa: "ثابت‌ها را به «معنی‌شان» نام‌گذاری کن، نه نوعشان: birthYear، نه number1. خودِ آینده نام‌ها را می‌خواند، نه خاطره‌ها را.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Why a fixed thisYear?", fa: "چرا thisYear ثابت است؟" },
            blocks: [
              {
                type: "text",
                en: "You might wonder: should the program read today's real date? Real apps do — but real apps also run in places you cannot grade. In this course every challenge runs deterministically, so we pin `thisYear` as a constant. Same math, same sentence, every single run — a habit that makes bugs reproducible and lessons fair.",
                fa: "شاید بپرسی: برنامه نباید تاریخِ واقعیِ امروز را بخواند؟ برنامه‌های واقعی می‌خوانند — ولی برنامه‌های واقعی جاهایی اجرا می‌شوند که قابل نمره‌دهی نیست. در این دوره هر چالش به‌صورت قطعی (deterministic) اجرا می‌شود، پس `thisYear` را یک ثابت می‌گذاریم. همان ریاضی، همان جمله، در هر اجرا — عادتی که باگ‌ها را قابل بازتولید و درس‌ها را منصفانه می‌کند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Age calculator</title>
  </head>
  <body>
    <h1>Age machine 🎂</h1>
    <p id="birth">Born in: ?</p>
    <p id="age">?</p>

    <script>
      const birthYear = 2010;
      const thisYear = 2026;
      const age = thisYear - birthYear;

      document.querySelector("#birth").textContent = \`Born in: \${birthYear}\`;
      document.querySelector("#age").textContent = \`You are \${age} years old.\`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "The full pipeline in eight lines — change 2010 and the sentence re-ages instantly.",
                  fa: "کل خطِ لوله در هشت خط — 2010 را عوض کن، جمله همان لحظه پیر یا جوان می‌شود.",
                },
              },
              {
                type: "warn",
                en: "Order is the law: birthYear and thisYear must exist BEFORE the subtraction line, and age before the sentence. Any line moved down finds an empty box and crashes.",
                fa: "ترتیب قانون است: birthYear و thisYear باید قبل از خطِ تفریق باشند و age قبل از جمله. هر خطی که پایین‌تر برود جعبه‌ی خالی پیدا می‌کند و کرش می‌کند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "birthYear = 2008, thisYear = 2026. What does #age show?", fa: "birthYear = 2008 و thisYear = 2026. #age چه چیزی نشان می‌دهد؟" },
                options: [
                  { en: "You are 18 years old.", fa: "You are 18 years old." },
                  { en: "You are 2008 years old.", fa: "You are 2008 years old." },
                  { en: "You are 18-18 years old.", fa: "You are 18-18 years old." },
                ],
                answer: 0,
                explain: {
                  en: "2026 - 2008 = 18, and the template literal slides the number into the sentence.",
                  fa: "2026 منهای 2008 می‌شود 18، و تمپلیت لیترال عدد را داخل جمله می‌لغزاند.",
                },
              },
              {
                q: { en: "Which line uses the pipeline order correctly?", fa: "کدام خط ترتیبِ لوله را درست رعایت می‌کند؟" },
                options: [
                  { en: "Render the sentence, then compute age", fa: "اول جمله را رندر کن، بعد سن را حساب کن" },
                  { en: "Compute age, then build the sentence with it", fa: "اول سن را حساب کن، بعد با آن جمله را بساز" },
                  { en: "Order never matters in JS", fa: "در JS ترتیب هیچ‌وقت مهم نیست" },
                ],
                answer: 1,
                explain: {
                  en: "Every value must exist before the line that consumes it — input, compute, output.",
                  fa: "هر مقدار باید قبل از خطی که مصرفش می‌کند وجود داشته باشد — ورودی، محاسبه، خروجی.",
                },
              },
              {
                q: { en: "Why is thisYear a const instead of reading the real date?", fa: "چرا thisYear یک const است و تاریخِ واقعی خوانده نمی‌شود؟" },
                options: [
                  { en: "Real dates are illegal in JavaScript", fa: "تاریخ‌های واقعی در جاوااسکریپت غیرقانونی‌اند" },
                  { en: "So every run is deterministic and gradable", fa: "تا هر اجرا قطعی و قابل نمره‌دهی باشد" },
                  { en: "Const is faster than Date", fa: "const از Date سریع‌تر است" },
                ],
                answer: 1,
                explain: {
                  en: "Pinned constants make every run identical — that is what lets the challenge grade you fairly.",
                  fa: "ثابت‌های ثابت‌شده هر اجرا را یکسان می‌کنند — همان چیزی که چالش را منصفانه نمره می‌دهد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Age Calculator", fa: "محاسبه‌گرِ سن" },
            brief: {
              en: "Build the full pipeline: const birthYear = 2008 and const thisYear = 2026. Compute the age, render 'Born in: 2008' into #birth, and render the sentence into #age — it must show exactly: You are 18 years old.",
              fa: "کل خطِ لوله را بساز: const birthYear = 2008 و const thisYear = 2026. سن را حساب کن، 'Born in: 2008' را در #birth رندر کن و جمله را در #age رندر کن — باید دقیقاً نشان بدهد: You are 18 years old.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Age Calculator</title>
  </head>
  <body>
    <h1>Age machine 🎂</h1>
    <p id="birth">Born in: ?</p>
    <p id="age">?</p>

    <script>
      // Input: const birthYear = 2008; const thisYear = 2026;
      // Compute: the subtraction
      // Output:
      //   #birth  →  Born in: 2008
      //   #age    →  You are 18 years old.

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Age Calculator</title>
  </head>
  <body>
    <h1>Age machine 🎂</h1>
    <p id="birth">Born in: ?</p>
    <p id="age">?</p>

    <script>
      // Input: the two pinned constants
      const birthYear = 2008;
      const thisYear = 2026;

      // Compute: input minus input
      const age = thisYear - birthYear; // Expected: 18

      // Output: two template literals, two renders
      document.querySelector("#birth").textContent = \`Born in: \${birthYear}\`;
      document.querySelector("#age").textContent = \`You are \${age} years old.\`; // You are 18 years old.
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Three beats: two consts, one subtraction, two renders. Nothing else.",
                fa: "سه ضرب: دو const، یک تفریق، دو رندر. همین و بس.",
              },
              {
                en: "#age needs a template literal: `You are ${age} years old.` — mind the period at the end.",
                fa: "#age به یک تمپلیت لیترال نیاز دارد: `You are ${age} years old.` — به نقطه‌ی آخرش دقت کن.",
              },
              {
                en: "Expected in the boxes: 'Born in: 2008' and 'You are 18 years old.'",
                fa: "خروجیِ مورد انتظارِ جعبه‌ها: 'Born in: 2008' و 'You are 18 years old.'",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#birth", text: "Born in: 2008" },
                { selector: "#age", text: "You are 18 years old." },
                { selector: "#age", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 3 ────────────────────────────────────────────
  {
    id: "js-m3",
    title: { en: "Making Decisions", fa: "تصمیم‌گیری" },
    blurb: {
      en: "Give your code a mind of its own: comparison questions, if/else forks and the logical glue that lets one script choose between many paths.",
      fa: "به کدت مغز بده: سؤال‌های مقایسه‌ای، دوراهی‌های if/else و چسبِ منطقی‌ای که به یک اسکریپت اجازه می‌دهد بین چند مسیر انتخاب کند.",
    },
    lessons: [
      {
        id: "js-m3-l1",
        title: { en: "Asking Questions: Comparisons", fa: "پرسش‌ها: مقایسه‌ها" },
        goal: {
          en: "Turn any question about your data into a boolean with ===, !==, >, <, >= and <=.",
          fa: "با === و !== و > و < و >= و <= هر سؤالی درباره‌ی داده‌هایت را به یک بولین تبدیل کنی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Six ways to ask", fa: "شش راه برای پرسیدن" },
            blocks: [
              {
                type: "text",
                en: "A **comparison** is a question that produces a boolean answer. You have six question operators: `===` ('are these equal?'), `!==` ('are these different?'), and the four familiar ones from math: `>` and `<` (strictly more / less) plus `>=` and `<=` (or equal). Every question returns exactly one of the two booleans: `true` or `false`.",
                fa: "یک **مقایسه** سؤالی است که جوابش بولین می‌شود. شش عملگرِ پرسشی داری: `===` («این دو مساوی‌اند؟»)، `!==` («این دو متفاوت‌اند؟») و چهار آشنای ریاضی: `>` و `<` (اکیداً بیشتر / کمتر) به‌علاوه‌ی `>=` و `<=` (یا مساوی). هر سؤال دقیقاً یکی از دو بولین را برمی‌گرداند: `true` یا `false`.",
              },
              {
                type: "code",
                lang: "js",
                code: `const ticketAge = 18;

const isAdult = 20 >= ticketAge;   // true — 20 is at least 18
const isKid   = 10 < ticketAge;    // true — 10 is under 18
const exact   = 18 === ticketAge;  // true — exactly equal
const notIt   = 18 !== ticketAge;  // false — they ARE equal`,
              },
              {
                type: "warn",
                en: "`=` and `===` are different species. One `=` STORES: `x = 5` puts 5 into x. Three `===` ASKS: `x === 5` asks 'is x equal to 5?'. Mixing them up is the classic rookie trap — inside a question, you want the three equals.",
                fa: "`=` و `===` دو گونه‌ی متفاوت‌اند. یک `=` «ذخیره» می‌کند: `x = 5` عدد 5 را داخل x می‌گذارد. سه‌تای `===` «سؤال» می‌پرسد: `x === 5` می‌پرسد «آیا x مساوی 5 است؟». قاطی کردنشان تله‌ی کلاسیکِ تازه‌کارهاست — داخلِ سؤال، سه تساوی می‌خواهی.",
              },
              {
                type: "text",
                en: "Comparisons work on strings too: `\"tea\" === \"tea\"` is true — the machine compares letter by letter. Case matters: `\"Tea\" === \"tea\"` is false, because a capital T is simply a different character.",
                fa: "مقایسه با رشته‌ها هم کار می‌کند: `\"tea\" === \"tea\"` درست است — ماشین حرف‌به‌حرف مقایسه می‌کند. بزرگی حروف مهم است: `\"Tea\" === \"tea\"` نادرست است، چون T بزرگ برای ماشین کاراکترِ دیگری است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Questions, live on the page", fa: "پرسش‌ها، زنده روی صفحه" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Question machine</title>
  </head>
  <body>
    <h1>True or false? 🤔</h1>
    <p>Is 20 at least 18? → <span id="q1">?</span></p>
    <p>Is "tea" equal to "coffee"? → <span id="q2">?</span></p>

    <script>
      document.querySelector("#q1").textContent = 20 >= 18;          // true
      document.querySelector("#q2").textContent = "tea" === "coffee"; // false
    </script>
  </body>
</html>`,
                caption: {
                  en: "Booleans render themselves as the plain words true and false — no quotes needed.",
                  fa: "بولین‌ها خودشان را به شکل کلمه‌های ساده‌ی true و false رندر می‌کنند — گیومه لازم نیست.",
                },
              },
              {
                type: "tip",
                en: "A comparison's answer fits in a variable like any value: `const canRide = height >= 120;` — the question is asked once, and the boolean rides along wherever you need it next.",
                fa: "جوابِ یک مقایسه مثل هر مقدار دیگری در متغیر جا می‌شود: `const canRide = height >= 120;` — سؤال یک بار پرسیده می‌شود و بولینِ به‌دست‌آمده هرجا لازمش داشته باشی همراهت است.",
              },
              {
                type: "text",
                en: "Six operators, endless questions: 'is the cart empty?', 'did the user type a valid name?', 'is this the last lap?' — every one of them collapses to a comparison. In the next lesson you will hand these booleans to `if` and watch your code choose.",
                fa: "شش عملگر، بی‌نهایت سؤال: «سبدخرید خالی است؟»، «آیا نامی که کاربر نوشته معتبر است؟»، «آیا این آخرین دور است؟» — هرکدام به یک مقایسه فرو می‌کاهند. در درسِ بعد این بولین‌ها را به `if` می‌دهی و می‌بینی کدت انتخاب می‌کند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does 7 === 7 return?", fa: "نتیجه‌ی 7 === 7 چیست؟" },
                options: [
                  { en: "true", fa: "true" },
                  { en: "false", fa: "false" },
                  { en: "\"yes\"", fa: "\"yes\"" },
                ],
                answer: 0,
                explain: {
                  en: "=== asks 'are these equal?' — 7 and 7 are, so the answer is the boolean true.",
                  fa: "=== می‌پرسد «این دو مساوی‌اند؟» — 7 و 7 مساوی‌اند، پس جواب بولینِ true است.",
                },
              },
              {
                q: { en: "Which operator STORES a value instead of asking a question?", fa: "کدام عملگر مقدار را «ذخیره» می‌کند نه اینکه سؤال بپرسد؟" },
                options: [
                  { en: "===", fa: "===" },
                  { en: "=", fa: "=" },
                  { en: ">=", fa: ">=" },
                ],
                answer: 1,
                explain: {
                  en: "One = assigns: x = 5 stores 5 into x. Three === compares: x === 5 asks a question.",
                  fa: "یک = مقدار می‌دهد: x = 5 عدد 5 را داخل x ذخیره می‌کند. سه‌تای === مقایسه می‌کند: x === 5 سؤال می‌پرسد.",
                },
              },
              {
                q: { en: "What is 10 !== 10 ?", fa: "نتیجه‌ی 10 !== 10 چیست؟" },
                options: [
                  { en: "true", fa: "true" },
                  { en: "false", fa: "false" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 1,
                explain: {
                  en: "!== asks 'are these DIFFERENT?' — 10 and 10 are the same, so the answer is false.",
                  fa: "!== می‌پرسد «این دو متفاوت‌اند؟» — 10 و 10 یکسان‌اند، پس جواب false است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The ticket question", fa: "پرسشِ بلیت" },
            brief: {
              en: "The movie-night page has two answer boxes. Create const age = 15; then render the QUESTIONS' results — never the words themselves: #adult shows the result of age >= 18 (expected: false) and #teen shows the result of age >= 13 (expected: true).",
              fa: "صفحه‌ی شبِ فیلم دو جعبه‌ی جواب دارد. const age = 15 را بساز؛ بعد «نتیجه‌ی سؤال‌ها» را رندر کن — نه خودِ کلمه‌ها را: #adult نتیجه‌ی age >= 18 را نشان بدهد (انتظار: false) و #teen نتیجه‌ی age >= 13 را (انتظار: true).",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Movie night</title>
  </head>
  <body>
    <h1>Movie night 🎬</h1>
    <p>Adult ticket? <span id="adult">?</span></p>
    <p>Teen ticket? <span id="teen">?</span></p>

    <script>
      // 1) const age = 15;
      // 2) Render (age >= 18) into #adult   → expected: false
      // 3) Render (age >= 13) into #teen    → expected: true
      // Let the comparison compute the answer 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Movie night</title>
  </head>
  <body>
    <h1>Movie night 🎬</h1>
    <p>Adult ticket? <span id="adult">?</span></p>
    <p>Teen ticket? <span id="teen">?</span></p>

    <script>
      // The data
      const age = 15;

      // Two questions, two boolean answers, straight into the boxes
      document.querySelector("#adult").textContent = age >= 18; // Expected: false
      document.querySelector("#teen").textContent = age >= 13;  // Expected: true
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "One line per box: document.querySelector(\"#adult\").textContent = age >= 18;",
                fa: "برای هر جعبه یک خط: document.querySelector(\"#adult\").textContent = age >= 18;",
              },
              {
                en: "Never type true or false yourself — the >= comparison produces them.",
                fa: "خودت true یا false تایپ نکن — مقایسه‌ی >= خودش تولیدشان می‌کند.",
              },
              {
                en: "Expected on the page: Adult ticket? false — Teen ticket? true",
                fa: "انتظار در صفحه: Adult ticket? false — Teen ticket? true",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#adult", text: "false" },
                { selector: "#teen", text: "true" },
                { selector: "#adult", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m3-l2",
        title: { en: "if: The Fork in the Road", fa: "if: دوراهیِ مسیر" },
        goal: {
          en: "Send your script down different paths with if and else — code that reacts to the data it meets.",
          fa: "اسکریپتت را با if و else به مسیرهای مختلف بفرستی — کدی که به داده‌ای که می‌بیند واکنش نشان می‌دهد.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Two paths, one gate", fa: "دو مسیر، یک دروازه" },
            blocks: [
              {
                type: "text",
                en: "`if` is a gate: `if (condition) { ... }` — the condition is just a boolean, usually from a comparison. True? The block runs. False? The block is skipped entirely. Add `else { ... }` and you get the second path: exactly ONE of the two blocks runs, never both.",
                fa: "`if` یک دروازه است: `if (condition) { ... }` — شرط چیزی جز یک بولین نیست، معمولاً از یک مقایسه. درست؟ بلوک اجرا می‌شود. غلط؟ بلوک کلاً رد می‌شود. یک `else { ... }` هم اضافه کنی، مسیرِ دوم را داری: دقیقاً «یکی» از دو بلوک اجرا می‌شود، هرگز هر دو.",
              },
              {
                type: "code",
                lang: "js",
                code: `const temperature = 35;

if (temperature > 30) {
  // runs only when the condition is true
  document.querySelector("#advice").textContent = "Hot day! Drink water.";
} else {
  // runs only when the condition is false
  document.querySelector("#advice").textContent = "Nice day! Go outside.";
}
// temperature is 35 → the visitor sees: Hot day! Drink water.`,
              },
              {
                type: "tip",
                en: "The parentheses hold the QUESTION, the curly braces hold the CONSEQUENCES. Reading it aloud — 'if the temperature is over 30, say it is hot; otherwise, say it is nice' — is half the skill.",
                fa: "پرانتزها «سؤال» را نگه می‌دارند و آکولادها «پیامد»ها را. بلند خواندنش — «اگر دما بالای ۳۰ بود بگو گرم است؛ وگرنه بگو هوای خوبی است» — نصفِ مهارت است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Watch the fork switch", fa: "دوراهی را در حالِ عوض شدن ببین" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The fork</title>
  </head>
  <body>
    <h1>Two cities, two verdicts 🌦️</h1>
    <p>Tehran: <span id="tehran">?</span></p>
    <p>Rasht: <span id="rasht">?</span></p>

    <script>
      const tehranTemp = 35;
      if (tehranTemp > 30) {
        document.querySelector("#tehran").textContent = "Hot day!";
      } else {
        document.querySelector("#tehran").textContent = "Nice day!";
      }

      const rashtTemp = 24;
      if (rashtTemp > 30) {
        document.querySelector("#rasht").textContent = "Hot day!";
      } else {
        document.querySelector("#rasht").textContent = "Nice day!";
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Same code, different data, different path — that is what a decision looks like.",
                  fa: "همان کد، داده‌ی متفاوت، مسیرِ متفاوت — این است شکلِ یک تصمیم.",
                },
              },
              {
                type: "text",
                en: "Need more than two outcomes? Stack another door with `else if` — a full chain of doors is the very next lesson. For two paths, if/else is all you need.",
                fa: "بیشتر از دو جواب می‌خواهی؟ با `else if` یک دروازه‌ی دیگر روی هم بچین — زنجیره‌ی کاملِ دروازه‌ها درسِ بعدی است. برای دو مسیر، if/else همان همه‌چیز است.",
              },
              {
                type: "warn",
                en: "The condition must be a question, not an assignment: `if (temp > 30)` asks; `if (temp = 30)` would STORE 30 into temp — a bug that sneaks past the eye. Three equals whenever you mean equals.",
                fa: "شرط باید سؤال باشد، نه مقداردهی: `if (temp > 30)` سؤال می‌پرسد؛ `if (temp = 30)` عدد 30 را داخل temp «ذخیره» می‌کند — باگی است که از چشم فرار می‌کند. هر وقت منظورت مساوی بودن است، سه تساوی بگذار.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In an if/else pair, how many blocks run?", fa: "در یک جفت if/else چند بلوک اجرا می‌شود؟" },
                options: [
                  { en: "Exactly one — always", fa: "دقیقاً یکی — همیشه" },
                  { en: "Both, one after the other", fa: "هر دو، پشت سر هم" },
                  { en: "Neither — it only checks", fa: "هیچ‌کدام — فقط چک می‌کند" },
                ],
                answer: 0,
                explain: {
                  en: "The gate picks a path: condition true → the if block; false → the else block. One per run.",
                  fa: "دروازه یک مسیر انتخاب می‌کند: شرط درست → بلوک if؛ غلط → بلوک else. در هر اجرا فقط یکی.",
                },
              },
              {
                q: { en: "if (score = 100) — what is wrong?", fa: "if (score = 100) — مشکلش چیست؟" },
                options: [
                  { en: "= stores instead of asking — use ===", fa: "= ذخیره می‌کند نه اینکه بپرسد — از === استفاده کن" },
                  { en: "Nothing, it works fine", fa: "هیچی، درست کار می‌کند" },
                  { en: "score must be in quotes", fa: "score باید داخل گیومه باشد" },
                ],
                answer: 0,
                explain: {
                  en: "One = assigns 100 to score instead of comparing. The gate then always looks 'truthy' — a silent logic bug.",
                  fa: "یک = به‌جای مقایسه، عدد 100 را داخل score می‌گذارد. دروازه بعداً همیشه «درست» به نظر می‌رسد — یک باگِ منطقیِ بی‌سروصدا.",
                },
              },
              {
                q: { en: "const hour = 9; if (hour < 12) renders \"Good morning\", else \"Good evening\" — what appears?", fa: "const hour = 9; اگر hour < 12 رندرش \"Good morning\" باشد وگرنه \"Good evening\" — چه چیزی ظاهر می‌شود؟" },
                options: [
                  { en: "Good morning", fa: "Good morning" },
                  { en: "Good evening", fa: "Good evening" },
                  { en: "Both lines", fa: "هر دو خط" },
                ],
                answer: 0,
                explain: {
                  en: "9 < 12 is true, so the if block runs and the else block is skipped.",
                  fa: "9 < 12 درست است، پس بلوک if اجرا می‌شود و بلوک else رد می‌شود.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The doorkeeper", fa: "نگهبانِ در" },
            brief: {
              en: "Club TEKA has a rule: age 18 or more gets in. Create const age = 20; then write one if/else: if (age >= 18) → #verdict shows exactly: Welcome in! — otherwise it shows: Sorry, adults only. With age 20 the box must show the welcome.",
              fa: "کلابِ TEKA قانون دارد: ۱۸ سال به بالا وارد می‌شود. const age = 20 را بساز؛ بعد یک if/else بنویس: if (age >= 18) → #verdict دقیقاً نشان بدهد: Welcome in! — وگرنه نشان بدهد: Sorry, adults only. با سنِ ۲۰، جعبه باید خوش‌آمد را نشان بدهد.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Club TEKA</title>
  </head>
  <body>
    <h1>Club TEKA 🚪</h1>
    <p id="verdict">?</p>

    <script>
      // 1) const age = 20;
      // 2) if (age >= 18): #verdict gets "Welcome in!"
      // 3) else: #verdict gets "Sorry, adults only."
      // One gate, two paths 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Club TEKA</title>
  </head>
  <body>
    <h1>Club TEKA 🚪</h1>
    <p id="verdict">?</p>

    <script>
      // The data
      const age = 20;

      // The gate: one question, two consequences
      if (age >= 18) {
        document.querySelector("#verdict").textContent = "Welcome in!";
      } else {
        document.querySelector("#verdict").textContent = "Sorry, adults only.";
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The skeleton: if (age >= 18) { ... } else { ... } — question in parentheses, consequences in braces.",
                fa: "اسکلت: if (age >= 18) { ... } else { ... } — سؤال در پرانتز، پیامدها در آکولاد.",
              },
              {
                en: "Render inside EACH path: the if block renders the welcome, the else block renders the sorry.",
                fa: "داخل «هر» مسیر رندر کن: بلوک if خوش‌آمد را می‌رندرد و بلوک else پوزش را.",
              },
              {
                en: "Exact texts: Welcome in! and Sorry, adults only.",
                fa: "متن‌های دقیق: Welcome in! و Sorry, adults only.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#verdict", text: "Welcome in!" },
                { selector: "#verdict", count: 1 },
                { selector: "h1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m3-l3",
        title: { en: "else if & the Logic Glue", fa: "else if و چسبِ منطقی" },
        goal: {
          en: "Stack many doors with else if — and merge questions with &&, || and !.",
          fa: "با else if چند دروازه را پشت هم بچینی — و سؤال‌ها را با && و || و ! ترکیب کنی.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Many doors in a row", fa: "دروازه‌های پشتِ سرِ هم" },
            blocks: [
              {
                type: "text",
                en: "An `else if` chain is a row of doors checked TOP TO BOTTOM: the first question that answers true runs its block, and every door after it is skipped. A final `else` catches everything no door claimed. Shape: `if ... else if ... else if ... else`.",
                fa: "زنجیره‌ی `else if` ردیفی از دروازه‌هاست که از «بالا به پایین» بررسی می‌شود: اولین سؤالی که جوابش true شود بلوکش اجرا می‌شود و همه‌ی دروازه‌های بعدی رد می‌شوند. یک `else` پایانی هم هرچه را هیچ دروازه‌ای نگرفته جمع می‌کند. شکل: `if ... else if ... else if ... else`.",
              },
              {
                type: "code",
                lang: "js",
                code: `const score = 78;

if (score >= 90) {
  document.querySelector("#grade").textContent = "A";
} else if (score >= 75) {
  document.querySelector("#grade").textContent = "B";
} else {
  document.querySelector("#grade").textContent = "C";
}
// 78 fails the first door, passes the second → B`,
              },
              {
                type: "tip",
                en: "Order is power: put the HIGHEST bar first. If `score >= 75` came before `score >= 90`, a 95 would happily take a B and never reach the A.",
                fa: "ترتیب قدرت است: بالاترین شرط را اول بگذار. اگر `score >= 75` قبل از `score >= 90` بیاید، نمره‌ی ۹۵ راضی یک B می‌گیرد و هرگز به A نمی‌رسد.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "and, or, not", fa: "و، یا، نه" },
            blocks: [
              {
                type: "text",
                en: "One question is rarely enough — real rules are compound: 'has a ticket AND is 18 or older'. Three glue operators combine booleans: `&&` (and — BOTH sides must be true), `||` (or — AT LEAST ONE true), `!` (not — flips the answer).",
                fa: "یک سؤال به‌ندرت کافی است — قوانینِ واقعی مرکب‌اند: «بلیت دارد «و» ۱۸ سالش گذشته است». سه عملگرِ چسب بولین‌ها را ترکیب می‌کنند: `&&` (و — «هر دو» طرف باید درست باشند)، `||` (یا — «حداقل یکی» درست)، `!` (نه — جواب را برعکس می‌کند).",
              },
              {
                type: "code",
                lang: "js",
                code: `const hasTicket = true;
const age = 20;
const canEnter = hasTicket && age >= 18;  // true && true → true

const isFriday = false;
const isHoliday = true;
const canSleep = isFriday || isHoliday;   // false || true → true

const isRaining = false;
const isSunny = !isRaining;               // !false → true`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Logic glue</title>
  </head>
  <body>
    <h1>Cinema door 🎟️</h1>
    <p id="verdict">?</p>

    <script>
      const hasTicket = true;
      const age = 20;

      if (hasTicket && age >= 18) {
        document.querySelector("#verdict").textContent = "Enjoy the movie!";
      } else {
        document.querySelector("#verdict").textContent = "No entry.";
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Both questions true — the && gate opens.",
                  fa: "هر دو سؤال درست — دروازه‌ی && باز می‌شود.",
                },
              },
              {
                type: "warn",
                en: "&& is strict, || is generous. Swap them by accident and the door policy changes: with ||, someone with a ticket but aged 12 would stroll right in.",
                fa: "&& سخت‌گیر است، || بخشنده. تصادفی جایشان را عوض کنی، سیاستِ در عوض می‌شود: با ||، کسی که بلیت دارد ولی ۱۲ سالش است راحت وارد می‌شود.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In an else if chain, which blocks run?", fa: "در زنجیره‌ی else if کدام بلوک‌ها اجرا می‌شوند؟" },
                options: [
                  { en: "Every question that is true", fa: "هر سؤالی که درست باشد" },
                  { en: "Only the FIRST true one — the rest are skipped", fa: "فقط «اولین» سؤالِ درست — بقیه رد می‌شوند" },
                  { en: "Always the last one", fa: "همیشه آخری" },
                ],
                answer: 1,
                explain: {
                  en: "The chain checks top to bottom and stops at the first true question — later doors never get asked.",
                  fa: "زنجیره از بالا به پایین چک می‌کند و سرِ اولین سؤالِ درست می‌ایستد — دروازه‌های بعدی دیگر پرسیده نمی‌شوند.",
                },
              },
              {
                q: { en: "true && false → ?", fa: "true && false → ؟" },
                options: [
                  { en: "true", fa: "true" },
                  { en: "false", fa: "false" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 1,
                explain: {
                  en: "&& demands BOTH sides true. One false spoils the and — the answer is false.",
                  fa: "&& به «هر دو» طرفِ درست نیاز دارد. یک false کافی است تا «و» خراب شود — جواب false است.",
                },
              },
              {
                q: { en: "true || false → ?", fa: "true || false → ؟" },
                options: [
                  { en: "false", fa: "false" },
                  { en: "true", fa: "true" },
                  { en: "Depends on the weather", fa: "به آب‌وهوا بستگی دارد" },
                ],
                answer: 1,
                explain: {
                  en: "|| needs only ONE true side. true || anything is always true.",
                  fa: "|| فقط به «یکی» طرفِ درست نیاز دارد. true || هرچیزی همیشه true است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The weather advisor", fa: "مشاورِ آب‌وهوا" },
            brief: {
              en: "Create const temp = 35; then build the chain: temp >= 30 → #advice shows exactly: Stay cool indoors. — else if temp >= 20 → Perfect for a walk. — else → Take a jacket. With temp 35 the first door must win.",
              fa: "const temp = 35 را بساز؛ بعد زنجیره را بساز: temp >= 30 → #advice دقیقاً نشان بدهد: Stay cool indoors. — else if temp >= 20 → Perfect for a walk. — else → Take a jacket. با دمای ۳۵ باید درِ اول برنده شود.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Weather advisor</title>
  </head>
  <body>
    <h1>Weather advisor ⛅</h1>
    <p id="advice">?</p>

    <script>
      // 1) const temp = 35;
      // 2) if (temp >= 30)        → "Stay cool indoors."
      //    else if (temp >= 20)   → "Perfect for a walk."
      //    else                   → "Take a jacket."
      // Highest bar first 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Weather advisor</title>
  </head>
  <body>
    <h1>Weather advisor ⛅</h1>
    <p id="advice">?</p>

    <script>
      // The data
      const temp = 35;

      // Three doors, highest bar first
      if (temp >= 30) {
        document.querySelector("#advice").textContent = "Stay cool indoors.";
      } else if (temp >= 20) {
        document.querySelector("#advice").textContent = "Perfect for a walk.";
      } else {
        document.querySelector("#advice").textContent = "Take a jacket.";
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Skeleton: if (...) { ... } else if (...) { ... } else { ... } — three doors, top to bottom.",
                fa: "اسکلت: if (...) { ... } else if (...) { ... } else { ... } — سه دروازه، از بالا به پایین.",
              },
              {
                en: "Order the questions from the highest bar down: 30, then 20, then everything else.",
                fa: "سؤال‌ها را از بالاترین شرط به پایین بچین: اول ۳۰، بعد ۲۰، بعد هرچیز دیگر.",
              },
              {
                en: "Exact texts: Stay cool indoors. / Perfect for a walk. / Take a jacket. — mind the periods.",
                fa: "متن‌های دقیق: Stay cool indoors. / Perfect for a walk. / Take a jacket. — به نقطه‌ها دقت کن.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#advice", text: "Stay cool indoors." },
                { selector: "#advice", count: 1 },
                { selector: "h1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m3-l4",
        title: { en: "Mini-project: The Ticket Machine", fa: "مینی‌پروژه: ماشینِ بلیت" },
        goal: {
          en: "Combine comparisons, an else if chain and template literals into one small cinema ticket printer.",
          fa: "مقایسه‌ها، زنجیره‌ی else if و تمپلیت لیترال‌ها را در یک چاپگرِ بلیتِ کوچکِ سینما ترکیب کنی.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "Rules first, code second", fa: "اول قوانین، بعد کد" },
            blocks: [
              {
                type: "text",
                en: "Real programs begin as RULES written in plain language. The cinema's rules: under 13 → 'Child — free popcorn'; 13 to 17 → 'Teen — half price'; 18 or more → 'Adult — full price'. Your job: translate each rule into one door of an else if chain — in the SAME order as the rules.",
                fa: "برنامه‌های واقعی با «قوانین»ی به زبانِ آدمی شروع می‌شوند. قوانینِ سینما: زیرِ ۱۳ → «Child — free popcorn»؛ ۱۳ تا ۱۷ → «Teen — half price»؛ ۱۸ به بالا → «Adult — full price». کارِ تو: هر قانون را به یکی از دروازه‌های زنجیره‌ی else if ترجمه کنی — با «همان ترتیبِ» قوانین.",
              },
              {
                type: "code",
                lang: "js",
                code: `const age = 15;

if (age < 13) {
  document.querySelector("#ticket").textContent = \`Child — free popcorn (\${age})\`;
} else if (age < 18) {
  document.querySelector("#ticket").textContent = \`Teen — half price (\${age})\`;
} else {
  document.querySelector("#ticket").textContent = \`Adult — full price (\${age})\`;
}
// 15 fails door one, passes door two → Teen — half price (15)`,
              },
              {
                type: "tip",
                en: "Notice the middle door only asks age < 18 — it does not need 'and at least 13', because anyone under 13 was already caught by the first door. A chain carries its own memory: what earlier doors miss, later doors inherit.",
                fa: "دقت کن دروازه‌ی وسط فقط age < 18 می‌پرسد — لازم نیست بگوید «و حداقل ۱۳»، چون هر کس زیرِ ۱۳ باشد از قبل توسط درِ اول گرفته شده. زنجیره حافظه‌ی خودش را دارد: آنچه دروازه‌های قبلی نگرفتند، به بعدی‌ها می‌رسد.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The machine, assembled", fa: "ماشین، سرهم‌شده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Ticket machine</title>
  </head>
  <body>
    <h1>Cinema ticket machine 🎟️</h1>
    <p id="ageLine">?</p>
    <p id="ticket">?</p>

    <script>
      const age = 15;

      document.querySelector("#ageLine").textContent = \`Ticket for age \${age}\`;

      if (age < 13) {
        document.querySelector("#ticket").textContent = \`Child — free popcorn (\${age})\`;
      } else if (age < 18) {
        document.querySelector("#ticket").textContent = \`Teen — half price (\${age})\`;
      } else {
        document.querySelector("#ticket").textContent = \`Adult — full price (\${age})\`;
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Change the age constant and the machine re-decides — that is the whole magic.",
                  fa: "ثابتِ سن را عوض کن، ماشین دوباره تصمیم می‌گیرد — همه‌ی جادو همین است.",
                },
              },
              {
                type: "warn",
                en: "Template literal holes work ONLY inside backticks: `... (${age})` weaves the number into the sentence; \"... (${age})\" would print the raw text ${age} with no number at all.",
                fa: "حفره‌های تمپلیت لیترال فقط داخل بک‌تیک کار می‌کنند: `... (${age})` عدد را داخل جمله می‌بافد؛ \"... (${age})\" همان متنِ خامِ ${age} را بدون هیچ عددی چاپ می‌کند.",
              },
              {
                type: "tip",
                en: "After passing, feed the machine 8, then 17, then 30 — watch all three doors do their job in turn.",
                fa: "بعد از قبول شدن، به ماشین ۸ بعد ۱۷ بعد ۳۰ بده — ببین هر سه دروازه یکی‌یکی کارشان را انجام می‌دهند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "age = 10 → which door runs?", fa: "age = 10 → کدام دروازه اجرا می‌شود؟" },
                options: [
                  { en: "Child — free popcorn", fa: "Child — free popcorn" },
                  { en: "Teen — half price", fa: "Teen — half price" },
                  { en: "Adult — full price", fa: "Adult — full price" },
                ],
                answer: 0,
                explain: {
                  en: "10 < 13 is true at the very first door — the chain stops there.",
                  fa: "10 < 13 همان درِ اول درست است — زنجیره همان‌جا می‌ایستد.",
                },
              },
              {
                q: { en: "Why does the teen door only ask age < 18?", fa: "چرا دروازه‌ی نوجوان فقط age < 18 می‌پرسد؟" },
                options: [
                  { en: "Under-13s were already caught by the first door", fa: "زیرِ ۱۳ سالی‌ها از قبل توسط درِ اول گرفته شده‌اند" },
                  { en: "Because 13 is an unlucky number", fa: "چون ۱۳ عدد بدیاقتی است" },
                  { en: "It also needs age >= 13 or the code crashes", fa: "به age >= 13 هم نیاز دارد وگرنه کد کرش می‌کند" },
                ],
                answer: 0,
                explain: {
                  en: "The chain stops at the first true door — by the time the teen door is asked, under-13s are already gone.",
                  fa: "زنجیره سرِ اولین سؤالِ درست می‌ایستد — وقتی نوبت به دروازه‌ی نوجوان می‌رسد، زیرِ ۱۳ سالی‌ها دیگر آنجا نیستند.",
                },
              },
              {
                q: { en: "Which line renders 'Adult — full price (30)' for age 30?", fa: "کدام خط برای age برابر 30 رندرش 'Adult — full price (30)' است؟" },
                options: [
                  { en: "The backtick literal `Adult — full price (${age})`", fa: "تمپلیت لیترال با بک‌تیک: `Adult — full price (${age})`" },
                  { en: "The quoted text \"Adult — full price (${age})\"", fa: "متنِ گیومه‌دار: \"Adult — full price (${age})\"" },
                  { en: "The plain text Adult — full price (age)", fa: "متنِ ساده: Adult — full price (age)" },
                ],
                answer: 0,
                explain: {
                  en: "Only inside backticks does ${age} become a hole that the value fills.",
                  fa: "فقط داخل بک‌تیک است که ${age} یک حفره می‌شود که مقدارش را پر می‌کند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Ticket Machine", fa: "ماشینِ بلیت" },
            brief: {
              en: "Create const age = 15 and the three-door machine. With 15, #ticket must show exactly: Teen — half price (15) — built with a template literal that weaves age in. Rules: under 13 → Child — free popcorn (age); 13–17 → Teen — half price (age); 18+ → Adult — full price (age).",
              fa: "const age = 15 و ماشینِ سه‌دروازه‌ای را بساز. با ۱۵، #ticket باید دقیقاً نشان بدهد: Teen — half price (15) — ساخته‌شده با تمپلیت لیترالی که سن را داخل جمله می‌بافد. قوانین: زیرِ ۱۳ → Child — free popcorn (age)؛ ۱۳ تا ۱۷ → Teen — half price (age)؛ ۱۸ به بالا → Adult — full price (age).",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Ticket machine</title>
  </head>
  <body>
    <h1>Cinema ticket machine 🎟️</h1>
    <p id="ticket">?</p>

    <script>
      // 1) const age = 15;
      // 2) Three doors in order:
      //      age < 13   → "Child — free popcorn (age)"
      //      age < 18   → "Teen — half price (age)"
      //      otherwise  → "Adult — full price (age)"
      // 3) Weave age into each door's message with a template literal

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Ticket machine</title>
  </head>
  <body>
    <h1>Cinema ticket machine 🎟️</h1>
    <p id="ticket">?</p>

    <script>
      // The rules of the machine, door by door
      const age = 15;

      if (age < 13) {
        document.querySelector("#ticket").textContent = \`Child — free popcorn (\${age})\`;
      } else if (age < 18) {
        document.querySelector("#ticket").textContent = \`Teen — half price (\${age})\`;
      } else {
        document.querySelector("#ticket").textContent = \`Adult — full price (\${age})\`;
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Skeleton: if (age < 13) { ... } else if (age < 18) { ... } else { ... }.",
                fa: "اسکلت: if (age < 13) { ... } else if (age < 18) { ... } else { ... }.",
              },
              {
                en: "Each door renders a backtick literal: `Teen — half price (${age})` — the hole slides the number in.",
                fa: "هر دروازه یک تمپلیت لیترال با بک‌تیک رندر می‌کند: `Teen — half price (${age})` — حفره عدد را داخل جمله می‌لغزاند.",
              },
              {
                en: "Expected in the box: Teen — half price (15)",
                fa: "انتظار در جعبه: Teen — half price (15)",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#ticket", text: "Teen — half price" },
                { selector: "#ticket", text: "(15)" },
                { selector: "#ticket", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 4 ────────────────────────────────────────────
  {
    id: "js-m4",
    title: { en: "Loops", fa: "حلقه‌ها" },
    blurb: {
      en: "Stop copy-pasting: one while and one for can do a thousand lines of work — counting, repeating and collecting as they go.",
      fa: "دیگر کپی‌پیست نکن: یک while و یک for می‌توانند هزار خط کار انجام بدهند — شمردن، تکرار کردن و جمع کردن در حینِ حرکت.",
    },
    lessons: [
      {
        id: "js-m4-l1",
        title: { en: "while: Repeat While True", fa: "while: تکرار تا وقتی درست است" },
        goal: {
          en: "Drive a while loop through its three parts — start, keep-going question, update — without ever spinning forever.",
          fa: "حلقه‌ی while را با سه بخشش برانی — شروع، سؤالِ ادامه، به‌روزرسانی — بدون اینکه هرگز تا ابد نچرخی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Three parts, one escape route", fa: "سه بخش، یک راهِ فرار" },
            blocks: [
              {
                type: "text",
                en: "`while` repeats a block FOR AS LONG AS its question stays true: `while (condition) { ... }`. Every healthy loop has three parts: **1)** a start (`let i = 1;`), **2)** the keep-going question (`i <= 5`), **3)** an update inside the body (`i = i + 1;`) that moves the world toward the question becoming false.",
                fa: "`while` یک بلوک را «تا وقتی که» سؤالش درست است تکرار می‌کند: `while (condition) { ... }`. هر حلقه‌ی سالم سه بخش دارد: **۱)** شروع (`let i = 1;`)، **۲)** سؤالِ ادامه (`i <= 5`)، **۳)** یک به‌روزرسانی داخل بدنه (`i = i + 1;`) که دنیا را به سمتِ دروغ‌شدنِ سؤال جلو می‌برد.",
              },
              {
                type: "code",
                lang: "js",
                code: `let i = 1;                  // 1) start
let line = "";

while (i <= 5) {            // 2) keep going while this is true
  line = line + i + " ";    //    the work: grow the line
  i = i + 1;                // 3) update — the escape route!
}
// line is "1 2 3 4 5 "`,
              },
              {
                type: "warn",
                en: "Delete the update line and the question never turns false: the loop spins forever and freezes the page — the famous infinite loop. Before running any while, find its escape route.",
                fa: "خطِ به‌روزرسانی را پاک کنی، سؤال هرگز دروغ نمی‌شود: حلقه تا ابد می‌چرخد و صفحه را قفل می‌کند — همان حلقه‌ی بی‌نهایتِ معروف. قبل از اجرای هر while، راهِ فرارش را پیدا کن.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Countdown, live", fa: "شمارشِ معکوس، زنده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Countdown</title>
  </head>
  <body>
    <h1>Launch pad 🚀</h1>
    <p id="launch">?</p>

    <script>
      let t = 3;
      let line = "";

      while (t > 0) {
        line = line + t + " ";
        t = t - 1;
      }
      line = line + "Liftoff!";

      document.querySelector("#launch").textContent = line;
      // "3 2 1 Liftoff!"
    </script>
  </body>
</html>`,
                caption: {
                  en: "The loop collects the countdown; the render happens once, after the loop is done.",
                  fa: "حلقه شمارشِ معکوس را جمع می‌کند؛ رندر یک‌بار، بعد از تمام‌شدنِ حلقه انجام می‌شود.",
                },
              },
              {
                type: "text",
                en: "Read a while like a sentence: 'WHILE t is above zero, add t to the line and count t down.' The body runs three times (t = 3, 2, 1), then the question fails at 0 and the program continues below the loop.",
                fa: "while را مثل یک جمله بخوان: «تا وقتی t بالای صفر است، t را به خط اضافه کن و یکی‌یکی کمش کن.» بدنه سه بار اجرا می‌شود (t = 3 و 2 و 1)، بعد سؤال روی صفر جواب را می‌گیرد و برنامه زیرِ حلقه ادامه پیدا می‌کند.",
              },
              {
                type: "tip",
                en: "Collect DURING the loop, render ONCE after it — the cleanest habit for loop output. Rendering inside the loop works too, but the page flickers through ten half-ready versions.",
                fa: "موقعِ حرکتِ حلقه «جمع» کن، بعد از تمام‌شدنش «یک‌بار» رندر کن — تمیزترین عادت برای خروجیِ حلقه. رندر داخلِ حلقه هم کار می‌کند، ولی صفحه ده نسخه‌ی نیمه‌آماده را پشت‌سرهم نشان می‌دهد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which are the three parts of a healthy while loop?", fa: "سه بخشِ یک حلقه‌ی سالمِ while کدام‌اند؟" },
                options: [
                  { en: "Start, keep-going question, update", fa: "شروع، سؤالِ ادامه، به‌روزرسانی" },
                  { en: "HTML, CSS, JavaScript", fa: "HTML و CSS و JavaScript" },
                  { en: "Quotes, braces, semicolons", fa: "گیومه، آکولاد، سمی‌کالن" },
                ],
                answer: 0,
                explain: {
                  en: "Start the counter, ask the question each lap, update so the question can eventually fail — all three, always.",
                  fa: "شمارنده را شروع کن، در هر دور سؤال را بپرس، به‌روزرسانی کن تا سؤال بالاخره جواب را بگیرد — هر سه، همیشه.",
                },
              },
              {
                q: { en: "A while loop never updates its counter. What happens?", fa: "یک حلقه‌ی while هرگز شمارنده‌اش را به‌روز نمی‌کند. چه می‌شود؟" },
                options: [
                  { en: "It runs exactly once", fa: "دقیقاً یک‌بار اجرا می‌شود" },
                  { en: "It spins forever — the page freezes", fa: "تا ابد می‌چرخد — صفحه قفل می‌شود" },
                  { en: "The browser shows an error and skips it", fa: "مرورگر خطا نشان می‌دهد و ردش می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Without the update the question stays true forever: the infinite loop. The escape route is mandatory.",
                  fa: "بدون به‌روزرسانی، سؤال تا ابد درست می‌ماند: حلقه‌ی بی‌نهایت. راهِ فرار اجباری است.",
                },
              },
              {
                q: { en: "let t = 3; while (t > 0) { t = t - 1; } — how many times does the body run?", fa: "let t = 3; while (t > 0) { t = t - 1; } — بدنه چند بار اجرا می‌شود؟" },
                options: [
                  { en: "2", fa: "۲" },
                  { en: "3", fa: "۳" },
                  { en: "4", fa: "۴" },
                ],
                answer: 1,
                explain: {
                  en: "t takes 3, 2, 1 — three laps; at 0 the question t > 0 finally fails.",
                  fa: "t به ترتیب ۳ و ۲ و ۱ می‌شود — سه دور؛ روی صفر بالاخره سؤالِ t > 0 جواب را می‌گیرد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Liftoff", fa: "بلندشدن" },
            brief: {
              en: "Launch countdown: start a counter at 5 and a line at \"\". While the counter is above zero, add it (plus a space) to the line and count it down. After the loop, add Liftoff! and render everything into #launch. It must show: 5 4 3 2 1 Liftoff!",
              fa: "شمارشِ معکوسِ پرتاب: شمارنده را روی ۵ و خط را روی \"\" شروع کن. تا وقتی شمارنده بالای صفر است، خودش (به‌علاوه‌ی یک فاصله) را به خط اضافه و یکی کمش کن. بعد از حلقه، Liftoff! را اضافه و همه را در #launch رندر کن. باید نشان بدهد: 5 4 3 2 1 Liftoff!",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Liftoff</title>
  </head>
  <body>
    <h1>Launch pad 🚀</h1>
    <p id="launch">?</p>

    <script>
      // 1) let t = 5;  let line = "";
      // 2) while (t > 0): add t + a space to line, then decrease t
      // 3) After the loop: add Liftoff! to line
      // 4) Render line into #launch

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Liftoff</title>
  </head>
  <body>
    <h1>Launch pad 🚀</h1>
    <p id="launch">?</p>

    <script>
      // 1) Start: counter at 5, line empty
      let t = 5;
      let line = "";

      // 2) Keep going while the counter is above zero
      while (t > 0) {
        line = line + t + " ";  // collect this lap
        t = t - 1;              // the escape route!
      }

      // 3) The finale, after the loop
      line = line + "Liftoff!";

      // 4) One render
      document.querySelector("#launch").textContent = line; // 5 4 3 2 1 Liftoff!
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The update is your escape route: t = t - 1; inside the body, every single lap.",
                fa: "به‌روزرسانی راهِ فرار توست: t = t - 1; داخل بدنه، در هر تک‌دور.",
              },
              {
                en: "Grow the line with: line = line + t + \" \";",
                fa: "خط را بزرگ کن با: line = line + t + \" \";",
              },
              {
                en: "After the loop: line = line + \"Liftoff!\"; then one render into #launch.",
                fa: "بعد از حلقه: line = line + \"Liftoff!\"; بعد یک رندر داخل #launch.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#launch", text: "5 4 3 2 1" },
                { selector: "#launch", text: "Liftoff!" },
                { selector: "#launch", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m4-l2",
        title: { en: "for: The Counting Loop", fa: "for: حلقه‌ی شمارش" },
        goal: {
          en: "Pack the loop's three parts into one tidy header with for — and build tables of any size in seconds.",
          fa: "سه بخشِ حلقه را با for در یک سرصفحه‌ی مرتب جمع کنی — و در چند ثانیه جدولِ هر اندازه‌ای بسازی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Same three parts, one tidy line", fa: "همان سه بخش، یک خطِ مرتب" },
            blocks: [
              {
                type: "text",
                en: "`for` packs the loop trio into the header: `for (start; question; update) { body }`. Slot 1 runs once before anything; slot 2 is asked before every lap; slot 3 runs after every lap. It is the same loop as the while version — except you can no longer forget the update, it lives right there in the header.",
                fa: "`for` سه‌گانه‌ی حلقه را در سرصفحه جمع می‌کند: `for (start; question; update) { body }`. خانه‌ی ۱ فقط یک‌بار قبل از همه‌چیز اجرا می‌شود؛ خانه‌ی ۲ قبل از هر دور پرسیده می‌شود؛ خانه‌ی ۳ بعد از هر دور اجرا می‌شود. همان حلقه‌ی نسخه‌ی while است — با این فرق که دیگر فراموش‌کردنِ به‌روزرسانی ممکن نیست؛ همان‌جا در سرصفحه زندگی می‌کند.",
              },
              {
                type: "code",
                lang: "js",
                code: `let line = "";

for (let i = 1; i <= 5; i++) {
  line = line + i + " ";
}
// line is "1 2 3 4 5 " — the while loop's twin`,
              },
              {
                type: "tip",
                en: "`i++` is shorthand for `i = i + 1` (add one); `i--` subtracts one; `i += 2` jumps two. These shorthands are everywhere in real code — learn them once, read them forever.",
                fa: "`i++` شکلِ کوتاهِ `i = i + 1` است (یکی اضافه)؛ `i--` یکی کم می‌کند؛ `i += 2` دوتا دوتا می‌پرد. این شکل‌های کوتاه همه‌جای کدِ واقعی هست — یک بار یاد بگیری، همیشه می‌خوانی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "A table in six lines", fa: "یک جدول در شش خط" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Times table</title>
  </head>
  <body>
    <h1>The 3× table ✖️</h1>
    <p id="table">?</p>

    <script>
      let line = "";

      for (let i = 1; i <= 5; i++) {
        line = line + \`3 x \${i} = \${3 * i}  |  \`;
      }

      document.querySelector("#table").textContent = line;
      // "3 x 1 = 3 | 3 x 2 = 6 | 3 x 3 = 9 | 3 x 4 = 12 | 3 x 5 = 15"
    </script>
  </body>
</html>`,
                caption: {
                  en: "Five laps, one growing line — the loop does the copy-paste work you would have done by hand.",
                  fa: "پنج دور، یک خطِ در حالِ رشد — حلقه همان کارِ کپی‌پیستی را می‌کند که قرار بود با دست بکنی.",
                },
              },
              {
                type: "text",
                en: "Trace one lap to believe it: i starts at 1, the question 1 <= 5 is true, the body glues '3 x 1 = 3' onto the line, then i++ makes i a 2. Laps roll on until i becomes 6 — the question fails, the loop ends, life continues below.",
                fa: "یک دور را دنبال کن تا باورت شود: i از ۱ شروع می‌شود، سؤالِ 1 <= 5 درست است، بدنه «3 x 1 = 3» را به خط می‌چسباند، بعد i++ می‌کند i را ۲. دورها ادامه پیدا می‌کند تا i شش شود — سؤال جواب را می‌گیرد، حلقه تمام می‌شود، زندگی زیرِ حلقه ادامه دارد.",
              },
              {
                type: "warn",
                en: "Do not fight the header: let the update slot do the counting. Changing i inside the body too (i = i + 5; ...) skips steps or traps you in an infinite loop.",
                fa: "با سرصفحه نجنگ: شمردن را به خانه‌ی به‌روزرسانی بسپار. اگر داخل بدنه هم i را دستکاری کنی (i = i + 5; ...) از بعضی پله‌ها می‌پری یا در حلقه‌ی بی‌نهایت گیر می‌کنی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which header counts 1 through 10?", fa: "کدام سرصفحه از ۱ تا ۱۰ می‌شمارد؟" },
                options: [
                  { en: "for (let i = 1; i <= 10; i++)", fa: "for (let i = 1; i <= 10; i++)" },
                  { en: "for (let i = 0; i > 10; i++)", fa: "for (let i = 0; i > 10; i++)" },
                  { en: "for (10; i++; i <= 10)", fa: "for (10; i++; i <= 10)" },
                ],
                answer: 0,
                explain: {
                  en: "Start at 1, keep going while i is at most 10, add one each lap — the classic count-up.",
                  fa: "از ۱ شروع کن، تا وقتی i حداکثر ۱۰ است ادامه بده، هر دور یکی اضافه کن — شمارشِ کلاسیکِ رو به بالا.",
                },
              },
              {
                q: { en: "i++ means:", fa: "i++ یعنی:" },
                options: [
                  { en: "i stays the same", fa: "i همان می‌ماند" },
                  { en: "add one to i", fa: "یکی به i اضافه کن" },
                  { en: "double i", fa: "i را دو برابر کن" },
                ],
                answer: 1,
                explain: {
                  en: "i++ is the shorthand for i = i + 1 — the standard one-step update.",
                  fa: "i++ شکلِ کوتاهِ i = i + 1 است — به‌روزرسانیِ استانداردِ یک‌قدمی.",
                },
              },
              {
                q: { en: "for (let i = 1; i <= 3; i++) — how many laps?", fa: "for (let i = 1; i <= 3; i++) — چند دور؟" },
                options: [
                  { en: "2", fa: "۲" },
                  { en: "3", fa: "۳" },
                  { en: "4", fa: "۴" },
                ],
                answer: 1,
                explain: {
                  en: "i takes 1, 2, 3 — three laps; at 4 the question 4 <= 3 fails.",
                  fa: "i به ترتیب ۱ و ۲ و ۳ می‌شود — سه دور؛ روی ۴ سؤالِ 4 <= 3 جواب را می‌گیرد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The 5× table", fa: "جدولِ ۵×" },
            brief: {
              en: "Build the 5× table with one for loop from 1 to 5. Each lap, glue a piece like 5 x 1 = 5 onto the line — use a template literal with ${i} and ${5 * i} — separated by double spaces and \" | \". Render into #table. It must show 5 x 3 = 15 and 5 x 5 = 25.",
              fa: "جدولِ ۵× را با یک حلقه‌ی for از ۱ تا ۵ بساز. هر دور، یک تکه مثل 5 x 1 = 5 به خط بچسبان — با تمپلیت لیترال و ${i} و ${5 * i} — و با دو فاصله و \" | \" از هم جدا کن. در #table رندر کن. باید 5 x 3 = 15 و 5 x 5 = 25 را نشان بدهد.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Times table</title>
  </head>
  <body>
    <h1>The 5× table ✖️</h1>
    <p id="table">?</p>

    <script>
      // 1) let line = "";
      // 2) for (let i = 1; i <= 5; i++):
      //      line = line + \`5 x \${i} = \${5 * i}  |  \`;
      // 3) Render line into #table

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Times table</title>
  </head>
  <body>
    <h1>The 5× table ✖️</h1>
    <p id="table">?</p>

    <script>
      // 1) The line starts empty
      let line = "";

      // 2) Five laps: i takes 1, 2, 3, 4, 5
      for (let i = 1; i <= 5; i++) {
        line = line + \`5 x \${i} = \${5 * i}  |  \`;
      }

      // 3) One render, after the loop
      document.querySelector("#table").textContent = line;
      // "5 x 1 = 5 | 5 x 2 = 10 | 5 x 3 = 15 | 5 x 4 = 20 | 5 x 5 = 25"
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Header: for (let i = 1; i <= 5; i++) — three slots, one line.",
                fa: "سرصفحه: for (let i = 1; i <= 5; i++) — سه خانه، یک خط.",
              },
              {
                en: "Inside the body, a backtick literal: `5 x ${i} = ${5 * i}  |  ` — the holes compute the row for you.",
                fa: "داخل بدنه یک تمپلیت لیترال با بک‌تیک: `5 x ${i} = ${5 * i}  |  ` — حفره‌ها هر سطر را برایت حساب می‌کنند.",
              },
              {
                en: "Render once after the loop: document.querySelector(\"#table\").textContent = line;",
                fa: "بعد از حلقه یک‌بار رندر کن: document.querySelector(\"#table\").textContent = line;",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#table", text: "5 x 3 = 15" },
                { selector: "#table", text: "5 x 5 = 25" },
                { selector: "#table", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m4-l3",
        title: { en: "Loops Meet Decisions", fa: "حلقه به تصمیم می‌رسد" },
        goal: {
          en: "Put if inside for and filter the world: pick only the numbers you want with the % remainder operator.",
          fa: "داخل for یک if بگذاری و جهان را فیلتر کنی: با عملگرِ باقیمانده ٪ فقط عددهای دلخواهت را برداری.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "The % operator: remainder", fa: "عملگرِ ٪: باقیمانده" },
            blocks: [
              {
                type: "text",
                en: "`%` (modulo) divides and returns only the REMAINDER: `10 % 2` is 0 (ten splits into fives, nothing left), `7 % 2` is 1. That makes it the universal even/odd/multiple detector: a number is even exactly when `n % 2 === 0`.",
                fa: "`%` (موژول) تقسیم می‌کند و فقط «باقیمانده» را برمی‌گرداند: `10 % 2` می‌شود 0 (ده به پنج‌تای تقسیم می‌شود، چیزی نمی‌ماند)، `7 % 2` می‌شود 1. همین آن را به تشخیص‌دهنده‌ی همگانیِ زوج/فرد/مضرب تبدیل می‌کند: یک عدد دقیقاً وقتی زوج است که `n % 2 === 0`.",
              },
              {
                type: "code",
                lang: "js",
                code: `10 % 2   // 0 → ten is even
7 % 2    // 1 → seven is odd
12 % 3   // 0 → 12 is a multiple of 3
11 % 3   // 2 → almost, but two left over`,
              },
              {
                type: "tip",
                en: "'Every 3rd item', 'every other row', 'divisible by 5' — any rhythm hiding in data is one % question away.",
                fa: "«هر آیتمِ سوم»، «یک‌درمیان»، «بخش‌پذیر بر ۵» — هر ریتمی که در داده پنهان باشد، فقط یک سؤالِ ٪ فاصله دارد.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The even picker", fa: "جداکنِ زوج‌ها" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Even picker</title>
  </head>
  <body>
    <h1>Even numbers 1–10 🔢</h1>
    <p id="evens">?</p>

    <script>
      let line = "";

      for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
          line = line + i + " ";
        }
      }

      document.querySelector("#evens").textContent = line;
      // "2 4 6 8 10 "
    </script>
  </body>
</html>`,
                caption: {
                  en: "Ten numbers walk past the gate; only the evens get in.",
                  fa: "ده عدد از دروازه رد می‌شوند؛ فقط زوج‌ها وارد می‌شوند.",
                },
              },
              {
                type: "warn",
                en: "Inside the if, ask with THREE equals: i % 2 === 0. A single = would assign 0 to the whole question — a silent bug that passes every even number and every odd one too.",
                fa: "داخل if با «سه» تساوی بپرس: i % 2 === 0. یک = کلِ سؤال را صفر می‌کند — باگی بی‌سروصدا که هر عدد زوج و هر عدد فردی را هم رد می‌کند.",
              },
              {
                type: "text",
                en: "This is your first time nesting two structures inside each other: the if lives INSIDE the loop, so the question is asked once per lap. Nesting is how programs build real logic — small machines inside big machines.",
                fa: "این اولین باری است که دو ساختار داخل هم می‌نشینند: if «داخلِ» حلقه زندگی می‌کند، پس سؤال در هر دور یک‌بار پرسیده می‌شود. تودرتویی همان چیزی است که برنامه‌ها با آن منطقِ واقعی می‌سازند — ماشین‌های کوچک داخلِ ماشین‌های بزرگ.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "10 % 3 → ?", fa: "10 % 3 → ؟" },
                options: [
                  { en: "3", fa: "۳" },
                  { en: "1", fa: "۱" },
                  { en: "0", fa: "۰" },
                ],
                answer: 1,
                explain: {
                  en: "3 fits into 10 three times (9), leaving 1 — the remainder is 1.",
                  fa: "عدد ۳ سه بار در ۱۰ جا می‌شود (۹)، و ۱ باقی می‌ماند — باقیمانده ۱ است.",
                },
              },
              {
                q: { en: "Which question finds even numbers?", fa: "کدام سؤال عددهای زوج را پیدا می‌کند؟" },
                options: [
                  { en: "i % 2 === 0", fa: "i % 2 === 0" },
                  { en: "i / 2 === 0", fa: "i / 2 === 0" },
                  { en: "i === 2", fa: "i === 2" },
                ],
                answer: 0,
                explain: {
                  en: "Even numbers divide by 2 with NO remainder — so the remainder must be exactly 0.",
                  fa: "عددهای زوج بر ۲ «بدون باقیمانده» بخش‌پذیرند — پس باقیمانده باید دقیقاً صفر باشد.",
                },
              },
              {
                q: { en: "Where does the if belong?", fa: "if کجا باید بنشیند؟" },
                options: [
                  { en: "Inside the loop's body — asked once per lap", fa: "داخل بدنه‌ی حلقه — در هر دور یک‌بار پرسیده می‌شود" },
                  { en: "Above the loop, before it starts", fa: "بالای حلقه، قبل از شروعش" },
                  { en: "Inside the for header", fa: "داخل سرصفحه‌ی for" },
                ],
                answer: 0,
                explain: {
                  en: "The gate must judge every number — so it travels with the loop, once per lap.",
                  fa: "دروازه باید تک‌تک عددها را داوری کند — پس با حلقه سفر می‌کند، در هر دور یک‌بار.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The even picker", fa: "جداکنِ زوج‌ها" },
            brief: {
              en: "Loop from 1 to 10 and keep only the even numbers: each lap, if i % 2 === 0, glue i (plus a space) onto the line. Render into #evens. It must show: 2 4 6 8 10",
              fa: "از ۱ تا ۱۰ حلقه بزن و فقط عددهای زوج را نگه دار: هر دور اگر i % 2 === 0، عدد i (به‌علاوه‌ی یک فاصله) را به خط بچسبان. در #evens رندر کن. باید نشان بدهد: 2 4 6 8 10",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Even picker</title>
  </head>
  <body>
    <h1>Even numbers 1–10 🔢</h1>
    <p id="evens">?</p>

    <script>
      // 1) let line = "";
      // 2) for (let i = 1; i <= 10; i++):
      //      if (i % 2 === 0): line = line + i + " ";
      // 3) Render line into #evens — expected: 2 4 6 8 10

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Even picker</title>
  </head>
  <body>
    <h1>Even numbers 1–10 🔢</h1>
    <p id="evens">?</p>

    <script>
      // The accumulator
      let line = "";

      // Walk all ten numbers, gate each one
      for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
          line = line + i + " ";  // only evens pass the gate
        }
      }

      // One render
      document.querySelector("#evens").textContent = line; // 2 4 6 8 10
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The standard walk: for (let i = 1; i <= 10; i++).",
                fa: "قدم‌زدنِ استاندارد: for (let i = 1; i <= 10; i++).",
              },
              {
                en: "The gate: if (i % 2 === 0) { line = line + i + \" \"; }",
                fa: "دروازه: if (i % 2 === 0) { line = line + i + \" \"; }",
              },
              {
                en: "Render once after the loop — expected line: 2 4 6 8 10",
                fa: "بعد از حلقه یک‌بار رندر کن — خطِ مورد انتظار: 2 4 6 8 10",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#evens", text: "2 4 6 8 10" },
                { selector: "#evens", count: 1 },
                { selector: "h1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m4-l4",
        title: { en: "Mini-project: The Fizz Song", fa: "مینی‌پروژه: آهنگِ فیز" },
        goal: {
          en: "Ship the classroom classic: a loop that sings numbers and shouts Fizz on every multiple of 3.",
          fa: "کلاسیکِ کلاس‌ها را تحویل بده: حلقه‌ای که عدد می‌خواند و روی هر مضربِ ۳ فریادِ Fizz می‌کشد.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "One loop, two voices", fa: "یک حلقه، دو صدا" },
            blocks: [
              {
                type: "text",
                en: "The classroom classic, your version: count 1 to 15; normally the loop sings the number itself, but on every multiple of 3 it shouts Fizz instead. You now own every piece: for (module 4), % (this module), if/else (module 3), template literals and the growing line (module 2).",
                fa: "کلاسیکِ کلاس‌ها، نسخه‌ی تو: از ۱ تا ۱۵ بشمار؛ حلقه معمولاً خودِ عدد را می‌خواند، ولی روی هر مضربِ ۳ به‌جایش Fizz فریاد می‌کشد. حالا همه‌ی قطعه‌ها را داری: for (ماژول ۴)، ٪ (همین ماژول)، if/else (ماژول ۳)، تمپلیت لیترال و خطِ در حالِ رشد (ماژول ۲).",
              },
              {
                type: "code",
                lang: "js",
                code: `let song = "";

for (let i = 1; i <= 15; i++) {
  if (i % 3 === 0) {
    song = song + "Fizz ";       // voice 1: the shout
  } else {
    song = song + i + " ";       // voice 2: the number
  }
}
// "1 2 Fizz 4 5 Fizz 7 8 Fizz 10 11 Fizz 13 14 Fizz "`,
              },
              {
                type: "tip",
                en: "Verify loops with your brain first: 3, 6, 9, 12 and 15 are the multiples of 3 — count them: exactly five Fizz words should appear.",
                fa: "حلقه‌ها را اول با مغزت چک کن: ۳ و ۶ و ۹ و ۱۲ و ۱۵ مضرب‌های ۳ هستند — بشمار: دقیقاً پنج تا Fizz باید ظاهر شود.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "On stage", fa: "روی صحنه" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fizz song</title>
  </head>
  <body>
    <h1>The Fizz song 🎤</h1>
    <p id="song">?</p>

    <script>
      let song = "";

      for (let i = 1; i <= 15; i++) {
        if (i % 3 === 0) {
          song = song + "Fizz ";
        } else {
          song = song + i + " ";
        }
      }

      document.querySelector("#song").textContent = song;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Fifteen laps, one song, five shouts.",
                  fa: "پانزده دور، یک آهنگ، پنج فریاد.",
                },
              },
              {
                type: "warn",
                en: "Fizz REPLACES the number — the if/else guarantees exactly one of the two voices per lap. Write both lines without the else and multiples of 3 would sing twice: \"3 Fizz\".",
                fa: "Fizz «جایگزینِ» عدد می‌شود — if/else تضمین می‌کند در هر دور دقیقاً یکی از دو صدا باشد. اگر هر دو خط را بدون else بنویسی، مضرب‌های ۳ دوبار می‌خوانند: \"3 Fizz\".",
              },
              {
                type: "tip",
                en: "Stretch goal after passing: add a second rule — multiples of 5 shout Buzz, multiples of 15 shout FizzBuzz. Order the doors carefully!",
                fa: "هدفِ بعد از قبولی: قانونِ دوم اضافه کن — مضرب‌های ۵ فریادِ Buzz بکشند و مضرب‌های ۱۵ فریادِ FizzBuzz. ترتیبِ دروازه‌ها را دقیق بچین!",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Lap i = 9 → the song gains:", fa: "دورِ i = 9 → آهنگ چه می‌گیرد؟" },
                options: [
                  { en: "\"9 \"", fa: "\"9 \"" },
                  { en: "\"Fizz \"", fa: "\"Fizz \"" },
                  { en: "\"9 Fizz \"", fa: "\"9 Fizz \"" },
                ],
                answer: 1,
                explain: {
                  en: "9 is a multiple of 3 (9 % 3 === 0), so Fizz REPLACES the number — nothing else is added.",
                  fa: "۹ مضربِ ۳ است (9 % 3 === 0)، پس Fizz «جایگزینِ» عدد می‌شود — چیز دیگری اضافه نمی‌شود.",
                },
              },
              {
                q: { en: "Lap i = 4 → the song gains:", fa: "دورِ i = 4 → آهنگ چه می‌گیرد؟" },
                options: [
                  { en: "\"Fizz \"", fa: "\"Fizz \"" },
                  { en: "\"4 \"", fa: "\"4 \"" },
                  { en: "nothing", fa: "هیچی" },
                ],
                answer: 1,
                explain: {
                  en: "4 % 3 is 1, not 0 — not a multiple, so the else path sings the number itself.",
                  fa: "4 % 3 می‌شود ۱، نه صفر — مضرب نیست، پس مسیرِ else خودِ عدد را می‌خواند.",
                },
              },
              {
                q: { en: "Why i % 3 === 0?", fa: "چرا i % 3 === 0؟" },
                options: [
                  { en: "It asks 'does 3 divide i with nothing left over?'", fa: "می‌پرسد «آیا ۳ در i جا می‌شود و چیزی باقی نمی‌ماند؟»" },
                  { en: "It divides i by 3", fa: "i را بر ۳ تقسیم می‌کند" },
                  { en: "It checks whether i is the number 3", fa: "چک می‌کند که آیا i همان عدد ۳ است" },
                ],
                answer: 0,
                explain: {
                  en: "A zero remainder means 'divides evenly' — that is the definition of a multiple.",
                  fa: "باقیمانده‌ی صفر یعنی «کامل تقسیم شد» — این همان تعریفِ مضرب است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Fizz Song", fa: "آهنگِ فیز" },
            brief: {
              en: "Sing it: loop 1 to 15 and build the song into #song. Numbers separated by spaces; every multiple of 3 becomes Fizz. Expected: 1 2 Fizz 4 5 Fizz 7 8 Fizz 10 11 Fizz 13 14 Fizz",
              fa: "بخوانش: از ۱ تا ۱۵ حلقه بزن و آهنگ را در #song بساز. عدد‌ها با فاصله جدا شوند؛ هر مضربِ ۳ می‌شود Fizz. انتظار: 1 2 Fizz 4 5 Fizz 7 8 Fizz 10 11 Fizz 13 14 Fizz",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fizz song</title>
  </head>
  <body>
    <h1>The Fizz song 🎤</h1>
    <p id="song">?</p>

    <script>
      // 1) let song = "";
      // 2) for (let i = 1; i <= 15; i++):
      //      multiple of 3?  → song = song + "Fizz ";
      //      otherwise       → song = song + i + " ";
      // 3) Render song into #song

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fizz song</title>
  </head>
  <body>
    <h1>The Fizz song 🎤</h1>
    <p id="song">?</p>

    <script>
      // The song starts silent
      let song = "";

      // Fifteen laps, two voices, if/else picks one per lap
      for (let i = 1; i <= 15; i++) {
        if (i % 3 === 0) {
          song = song + "Fizz ";   // the shout
        } else {
          song = song + i + " ";   // the number
        }
      }

      // One render
      document.querySelector("#song").textContent = song;
      // "1 2 Fizz 4 5 Fizz 7 8 Fizz 10 11 Fizz 13 14 Fizz "
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Skeleton: for (let i = 1; i <= 15; i++) { if (i % 3 === 0) { ... } else { ... } }.",
                fa: "اسکلت: for (let i = 1; i <= 15; i++) { if (i % 3 === 0) { ... } else { ... } }.",
              },
              {
                en: "Fizz branch: song = song + \"Fizz \";  number branch: song = song + i + \" \";",
                fa: "شاخه‌ی Fizz: song = song + \"Fizz \";  شاخه‌ی عدد: song = song + i + \" \";",
              },
              {
                en: "Check your work: 1 2 Fizz 4 5 Fizz 7 8 Fizz 10 11 Fizz 13 14 Fizz",
                fa: "کارِت را چک کن: 1 2 Fizz 4 5 Fizz 7 8 Fizz 10 11 Fizz 13 14 Fizz",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#song", text: "1 2 Fizz 4" },
                { selector: "#song", text: "13 14 Fizz" },
                { selector: "#song", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 5 ────────────────────────────────────────────
  {
    id: "js-m5",
    title: { en: "Functions", fa: "توابع" },
    blurb: {
      en: "Wrap code into named, reusable machines: define once, feed inputs, get answers back — the biggest clean-up tool in programming.",
      fa: "کد را در ماشین‌های نام‌دار و قابل‌استفاده‌ی مجدد بپیچ: یک بار تعریف کن، ورودی بده، جواب بگیر — بزرگ‌ترین ابزارِ مرتب‌کاری در برنامه‌نویسی.",
    },
    lessons: [
      {
        id: "js-m5-l1",
        title: { en: "Define Once, Call Many Times", fa: "یک بار تعریف، چند بار صدا" },
        goal: {
          en: "Package statements into a named function and switch them on with a call — one definition, unlimited replays.",
          fa: "دستورها را در یک تابعِ نام‌دار بسته‌بندی کنی و با صدا زدن روشنشان کنی — یک تعریف، بی‌نهایت پخشِ دوباره.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "The packaging machine", fa: "ماشینِ بسته‌بندی" },
            blocks: [
              {
                type: "text",
                en: "A **function** is a named block of statements that does NOTHING until you call it. Defining parks the machine: `function honk() { ... }`. Calling presses its button: `honk();` — only now do the statements inside run. The parentheses `()` are the call button itself.",
                fa: "یک **تابع** بلوکی از دستورها با یک نام است که تا صدایش نکنی «هیچ کاری نمی‌کند». تعریف کردن، ماشین را پارک می‌کند: `function honk() { ... }`. صدا زدن، دکمه‌اش را می‌فشارد: `honk();` — فقط حالا دستورهای داخلش اجرا می‌شوند. پرانتزهای `()` خودِ دکمه‌ی صدا زدن‌اند.",
              },
              {
                type: "code",
                lang: "js",
                code: `function honk() {
  document.querySelector("#horn").textContent = "Beep beep!";
}

honk();  // nothing happened until THIS line
honk();  // and it can run again... and again`,
              },
              {
                type: "tip",
                en: "Name functions with verbs — honk, greet, drawCard — because they DO things. And remember: writing `honk;` without parentheses does nothing; you merely mention the machine instead of pressing its button.",
                fa: "توابع را با «فعل» نام‌گذاری کن — honk و greet و drawCard — چون کارِ انجام دادنشان. و یادت باشد: نوشتنِ `honk;` بدون پرانتز هیچ کاری نمی‌کند؛ تو فقط اسمِ ماشین را می‌بری، دکمه‌اش را نمی‌فشاری.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Define above, call below", fa: "تعریف بالا، صدا پایین" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Function demo</title>
  </head>
  <body>
    <h1>The horn 🔊</h1>
    <p id="horn">quiet...</p>

    <script>
      // definition: parked, waiting
      function honk() {
        document.querySelector("#horn").textContent = "Beep beep!";
      }

      // call: press the button
      honk();
    </script>
  </body>
</html>`,
                caption: {
                  en: "The definition parks the machine; the call drives it.",
                  fa: "تعریف، ماشین را پارک می‌کند؛ صدا زدن، روشنش می‌کند.",
                },
              },
              {
                type: "text",
                en: "Why package code? Three wins: **reuse** (define once, call a hundred times), **readability** (a line like `honk();` says what happens), and **repairability** (a fix inside the function repairs every call at once). Real pages call the same function hundreds of times.",
                fa: "چرا کد را بسته‌بندی کنیم؟ سه برد: **استفاده‌ی مجدد** (یک بار تعریف، صد بار صدا)، **خوانایی** (خطی مثل `honk();` خودش را توضیح می‌دهد) و **تعمیرپذیری** (یک اصلاح داخل تابع، همه‌ی صداها را یک‌جا درست می‌کند). صفحاتِ واقعی همین تابع را صدها بار صدا می‌زنند.",
              },
              {
                type: "warn",
                en: "Keep the safest order for now: define ABOVE, call BELOW — statements run top to bottom, so the machine must be parked before its button is pressed.",
                fa: "فعلاً به امن‌ترین ترتیب وفادار باش: تعریف «بالا»، صدا «پایین» — دستورها بالا به پایین اجرا می‌شوند، پس ماشین باید قبل از فشردنِ دکمه‌اش پارک شده باشد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does a function do BEFORE it is called?", fa: "تابع قبل از صدا زده شدن چه می‌کند؟" },
                options: [
                  { en: "It runs quietly in the background", fa: "بی‌سروصدا در پس‌زمینه اجرا می‌شود" },
                  { en: "Nothing — it waits, parked", fa: "هیچی — پارک شده و منتظر است" },
                  { en: "It runs twice", fa: "دو بار اجرا می‌شود" },
                ],
                answer: 1,
                explain: {
                  en: "A definition is a parking job. The statements inside only run when a call presses the button.",
                  fa: "تعریف فقط پارک کردن است. دستورهای داخلش فقط وقتی اجرا می‌شوند که صدا زدن دکمه را بفشارد.",
                },
              },
              {
                q: { en: "Which line actually runs the function honk?", fa: "کدام خط واقعاً تابع honk را اجرا می‌کند؟" },
                options: [
                  { en: "honk;", fa: "honk;" },
                  { en: "honk();", fa: "honk();" },
                  { en: "function honk();", fa: "function honk();" },
                ],
                answer: 1,
                explain: {
                  en: "The parentheses are the call button: honk() runs it; honk; merely mentions it.",
                  fa: "پرانتزها دکمه‌ی صدا هستند: honk() اجرایش می‌کند؛ honk; فقط اسمش را می‌برد.",
                },
              },
              {
                q: { en: "Why package statements into a function?", fa: "چرا دستورها را داخل تابع بسته‌بندی کنیم؟" },
                options: [
                  { en: "The page loads faster", fa: "صفحه سریع‌تر لود می‌شود" },
                  { en: "Define once — reuse, read and repair in one place", fa: "یک بار تعریف — استفاده‌ی مجدد، خواندن و تعمیر، همه یک‌جا" },
                  { en: "HTML requires it", fa: "HTML آن را الزامی کرده" },
                ],
                answer: 1,
                explain: {
                  en: "Functions are the clean-up tool: one definition serves unlimited calls and one fix repairs them all.",
                  fa: "توابع ابزارِ مرتب‌کاری‌اند: یک تعریف به بی‌نهایت صدا خدمت می‌کند و یک اصلاح همه را درست می‌کند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Sound the horn", fa: "بوق بزن" },
            brief: {
              en: "Define a function named honk that sets #horn textContent to exactly: Beep beep! — then call it once. The definition alone does nothing; the call makes it sing.",
              fa: "تابعی به نام honk تعریف کن که textContent‌ی #horn را دقیقاً بگذار: Beep beep! — بعد یک بار صداش کن. تعریف به‌تنهایی هیچ نمی‌کند؛ صدا زدن است که آوازش می‌دهد.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Sound the horn</title>
  </head>
  <body>
    <h1>The horn 🔊</h1>
    <p id="horn">quiet...</p>

    <script>
      // 1) Define a function named honk
      //    inside it: set #horn textContent to exactly: Beep beep!
      // 2) AFTER the definition, call it once: honk();
      // Definition first, call second 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Sound the horn</title>
  </head>
  <body>
    <h1>The horn 🔊</h1>
    <p id="horn">quiet...</p>

    <script>
      // 1) Definition: the parked machine
      function honk() {
        document.querySelector("#horn").textContent = "Beep beep!";
      }

      // 2) Call: press the button
      honk();
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Two parts: function honk() { ... } — then the call honk();",
                fa: "دو بخش: function honk() { ... } — بعد صدایش: honk();",
              },
              {
                en: "The render line goes INSIDE the function; the call goes below the definition.",
                fa: "خطِ رندر «داخلِ» تابع می‌رود؛ صدا زدن زیرِ تعریف.",
              },
              {
                en: "Exact text: Beep beep!",
                fa: "متنِ دقیق: Beep beep!",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#horn", text: "Beep beep!" },
                { selector: "#horn", count: 1 },
                { selector: "h1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m5-l2",
        title: { en: "Parameters: Teaching the Machine", fa: "پارامترها: یاد دادن به ماشین" },
        goal: {
          en: "Give your functions inputs with parameters so one machine handles a thousand different cases.",
          fa: "به توابعت با پارامتر ورودی بدهی تا یک ماشین هزار حالتِ مختلف را هندل کند.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Named holes", fa: "حفره‌های نام‌دار" },
            blocks: [
              {
                type: "text",
                en: "A **parameter** is a named hole in the definition: `function greet(name) { ... }`. An **argument** is the value you drop into that hole at call time: `greet(\"Sara\")`. Inside the function, the parameter behaves like a variable created fresh for every call — same machine, different fuel.",
                fa: "یک **پارامتر** حفره‌ای نام‌دار در تعریف است: `function greet(name) { ... }`. یک **آرگومان** مقداری است که موقعِ صدا زدن داخل آن حفره می‌ریزی: `greet(\"Sara\")`. داخل تابع، پارامتر مثل متغیری رفتار می‌کند که برای هر صدا تازه ساخته می‌شود — همان ماشین، سوختِ متفاوت.",
              },
              {
                type: "code",
                lang: "js",
                code: `function greet(name) {
  document.querySelector("#out").textContent = \`Hello, \${name}!\`;
}

greet("Sara");  // Hello, Sara!
greet("Nima");  // Hello, Nima!`,
              },
              {
                type: "tip",
                en: "One definition, endless variety: the function's logic never changes — only the arguments do. That is the whole trick behind personalized pages.",
                fa: "یک تعریف، بی‌نهایت تنوع: منطقِ تابع هرگز عوض نمی‌شود — فقط آرگومان‌ها عوض می‌شوند. کلِ ترفندِ صفحاتِ شخصی‌سازی‌شده همین است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Two holes at once", fa: "دو حفره با هم" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Two parameters</title>
  </head>
  <body>
    <h1>Meeting machine 🤝</h1>
    <p id="card1">?</p>
    <p id="card2">?</p>

    <script>
      // three holes: where to render, who, from where
      function introduce(target, name, city) {
        document.querySelector(target).textContent =
          \`\${name} comes from \${city}.\`;
      }

      introduce("#card1", "Sara", "Tehran");
      introduce("#card2", "Nima", "Tabriz");
    </script>
  </body>
</html>`,
                caption: {
                  en: "Same machine, two calls — three arguments fill three holes each time.",
                  fa: "همان ماشین، دو صدا — هر بار سه آرگومان، سه حفره را پر می‌کنند.",
                },
              },
              {
                type: "warn",
                en: "Arguments fill parameters POSITION by position: (\"#card1\", \"Sara\", \"Tehran\") maps target → \"#card1\", name → \"Sara\", city → \"Tehran\". Swap two of them and the sentence garbles.",
                fa: "آرگومان‌ها «به ترتیبِ موقعیت» پارامترها را پر می‌کنند: (\"#card1\", \"Sara\", \"Tehran\") یعنی target → \"#card1\"، name → \"Sara\"، city → \"Tehran\". دوتایشان را جابه‌جا کنی، جمله به‌هم می‌ریزد.",
              },
              {
                type: "text",
                en: "A function can do everything you can do at the top level — including querySelector. Passing the TARGET as a parameter (as above) is a pro move: one machine, many destinations.",
                fa: "یک تابع هر کاری را که در سطحِ بالا می‌کنی می‌تواند بکند — از جمله querySelector. دادنِ «مقصد» به‌علاوه‌ی پارامتر (مثل بالا) حرکتِ حرفه‌ای است: یک ماشین، چند مقصد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In greet(name), what is name?", fa: "در greet(name)، name چیست؟" },
                options: [
                  { en: "A parameter — a named hole in the definition", fa: "یک پارامتر — حفره‌ای نام‌دار در تعریف" },
                  { en: "An argument — a value at call time", fa: "یک آرگومان — مقداری موقع صدا زدن" },
                  { en: "A string literal", fa: "یک رشته‌ی ثابت" },
                ],
                answer: 0,
                explain: {
                  en: "Parameters live in the DEFINITION; arguments are the real values supplied at each call.",
                  fa: "پارامترها در «تعریف» زندگی می‌کنند؛ آرگومان‌ها مقدارهای واقعی‌ای‌اند که در هر صدا داده می‌شوند.",
                },
              },
              {
                q: { en: "In greet(\"Sara\"), what is \"Sara\"?", fa: "در greet(\"Sara\")، \"Sara\" چیست؟" },
                options: [
                  { en: "A parameter", fa: "یک پارامتر" },
                  { en: "An argument — the value dropped into the hole", fa: "یک آرگومان — مقداری که داخل حفره می‌ریزد" },
                  { en: "A bug", fa: "یک باگ" },
                ],
                answer: 1,
                explain: {
                  en: "Call time = argument time: \"Sara\" is the fuel this particular run burns.",
                  fa: "موقعِ صدا زدن = وقتِ آرگومان: \"Sara\" سوختِ همین اجراست.",
                },
              },
              {
                q: { en: "greet(\"Sara\", \"Tehran\") but greet(name) has one hole — what happens to \"Tehran\"?", fa: "greet(\"Sara\", \"Tehran\") ولی greet(name) فقط یک حفره دارد — \"Tehran\" چه می‌شود؟" },
                options: [
                  { en: "Both are used", fa: "هر دو استفاده می‌شوند" },
                  { en: "It is ignored — no hole for it", fa: "نادیده گرفته می‌شود — حفره‌ای ندارد" },
                  { en: "The script crashes", fa: "اسکریپت کرش می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Extra arguments simply have nowhere to land; the function uses its holes and moves on. (Fewer arguments than holes leaves those holes undefined.)",
                  fa: "آرگومان‌های اضافه جایی برای فرود ندارند؛ تابع از حفره‌هایش استفاده می‌کند و ادامه می‌دهد. (کمتر آوردن هم حفره‌ها را undefined می‌گذارد.)",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The personal greeter", fa: "سلام‌کننده‌ی شخصی" },
            brief: {
              en: "Define greet(target, name): inside, render the template literal `Hello, ${name}!` into the element that target points to. Then call it twice — greet(\"#greet1\", \"Sara\") and greet(\"#greet2\", \"Aria\"). One definition, two personalized hellos.",
              fa: "greet(target, name) را تعریف کن: داخلش، تمپلیت لیترال `Hello, ${name}!` را در عنصری که target به آن اشاره می‌کند رندر کن. بعد دو بار صداش بزن — greet(\"#greet1\", \"Sara\") و greet(\"#greet2\", \"Aria\"). یک تعریف، دو سلامِ شخصی.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Personal greeter</title>
  </head>
  <body>
    <h1>The greeter 📣</h1>
    <p id="greet1">?</p>
    <p id="greet2">?</p>

    <script>
      // 1) Define greet(target, name):
      //    inside, render the template literal \`Hello, \${name}!\`
      //    into the element that target points to
      // 2) Call it twice:
      //    greet("#greet1", "Sara")  and  greet("#greet2", "Aria")

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Personal greeter</title>
  </head>
  <body>
    <h1>The greeter 📣</h1>
    <p id="greet1">?</p>
    <p id="greet2">?</p>

    <script>
      // One machine, two holes: where to render + who to greet
      function greet(target, name) {
        document.querySelector(target).textContent = \`Hello, \${name}!\`;
      }

      // Two calls, different arguments — one definition
      greet("#greet1", "Sara"); // Expected: Hello, Sara!
      greet("#greet2", "Aria"); // Expected: Hello, Aria!
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Definition: function greet(target, name) { document.querySelector(target).textContent = `Hello, ${name}!`; }",
                fa: "تعریف: function greet(target, name) { document.querySelector(target).textContent = `Hello, ${name}!`; }",
              },
              {
                en: "The target hole is a selector string — querySelector(target) uses it to find the element.",
                fa: "حفره‌ی target یک رشته‌ی سلکتور است — querySelector(target) با آن عنصر را پیدا می‌کند.",
              },
              {
                en: "Two calls below the definition: greet(\"#greet1\", \"Sara\"); greet(\"#greet2\", \"Aria\");",
                fa: "دو صدا زیرِ تعریف: greet(\"#greet1\", \"Sara\"); و greet(\"#greet2\", \"Aria\");",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#greet1", text: "Hello, Sara!" },
                { selector: "#greet2", text: "Hello, Aria!" },
                { selector: "#greet1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m5-l3",
        title: { en: "return: Machines That Answer", fa: "return: ماشین‌هایی که جواب می‌دهند" },
        goal: {
          en: "Make functions compute and hand back values with return — so results can be stored, combined and rendered.",
          fa: "توابع را با return به ماشین‌های حسابگری تبدیل کنی که مقدار برمی‌گردانند — تا نتیجه‌ها ذخیره، ترکیب و رندر شوند.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "The answer comes back", fa: "جواب برمی‌گردد" },
            blocks: [
              {
                type: "text",
                en: "`return` hands a value back to whoever called. The magic: the CALL ITSELF becomes that value. After `return n * 2` inside double(), the expression `double(21)` IS 42 — store it, print it, or weave it into a template literal like any other value.",
                fa: "`return` یک مقدار را به صدا زننده پس می‌دهد. جادو اینجاست: «خودِ صدا» تبدیل به آن مقدار می‌شود. بعد از `return n * 2` داخل double، عبارتِ `double(21)` همان 42 است — مثل هر مقدار دیگری می‌توانی ذخیره‌اش کنی، چاپش کنی یا داخل تمپلیت لیترال ببافیش.",
              },
              {
                type: "code",
                lang: "js",
                code: `function double(n) {
  return n * 2;
}

const d = double(21);   // the call becomes 42
// d is 42

const shout = \`Twice 21 is \${double(21)}\`; // works in templates too`,
              },
              {
                type: "tip",
                en: "return ≠ render. return gives the value to YOUR code; textContent gives it to the VISITOR. Strong functions return raw answers — the caller decides where each answer lands.",
                fa: "return ≠ رندر. return مقدار را به «کدِ تو» می‌دهد؛ textContent آن را به «بازدیدکننده» می‌دهد. توابعِ قوی جوابِ خام برمی‌گردانند — تصمیمِ اینکه هر جواب کجا بنشیند با صدا زننده است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Compute upstairs, render downstairs", fa: "بالا حساب کن، پایین رندر کن" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Price machine</title>
  </head>
  <body>
    <h1>Price machine 🏷️</h1>
    <p id="p1">?</p>
    <p id="p2">?</p>

    <script>
      // the machine: pure calculation, no rendering
      function halfPrice(price) {
        return price / 2;
      }

      // the caller: computes, then renders
      const p1 = halfPrice(40);
      document.querySelector("#p1").textContent = \`Half of 40 is \${p1}\`;
      document.querySelector("#p2").textContent = \`Half of 90 is \${halfPrice(90)}\`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "The machine stays pure; the bottom lines decide where each answer lands.",
                  fa: "ماشین خالص می‌ماند؛ خط‌های پایین تصمیم می‌گیرند هر جواب کجا بنشیند.",
                },
              },
              {
                type: "warn",
                en: "Code after return never runs — return is a one-way exit door. And a function WITHOUT any return answers undefined. A missing return is the classic 'my box shows undefined' bug.",
                fa: "کدِ بعد از return هرگز اجرا نمی‌شود — return دری یک‌طرفه است. و تابعی که اصلاً return ندارد، undefined جواب می‌دهد. جا انداختنِ return همان باگِ معروفِ «جعبه‌ام undefined نشان می‌دهد» است.",
              },
              {
                type: "text",
                en: "This split — calculation inside the function, rendering outside — is how real apps stay clean and testable. You will reuse it in the mini-project: a grade judge that returns letters, a caller that renders them.",
                fa: "این تفکیک — محاسبه داخل تابع، رندر بیرونش — همان چیزی است که اپ‌های واقعی را تمیز و قابل‌آزمون نگه می‌دارد. در مینی‌پروژه هم ازش استفاده می‌کنی: داوری نمره که حرف برمی‌گرداند، و صدایی که رندر می‌کند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "After return inside double(), what does the CALL double(21) evaluate to?", fa: "بعد از return داخل double، «صدا»ی double(21) به چه چیزی تبدیل می‌شود؟" },
                options: [
                  { en: "undefined", fa: "undefined" },
                  { en: "42", fa: "42" },
                  { en: "The string \"double\"", fa: "رشته‌ی \"double\"" },
                ],
                answer: 1,
                explain: {
                  en: "return makes the call itself become the returned value — 21 * 2 = 42.",
                  fa: "return خودِ صدا را به مقدارِ برگشتی تبدیل می‌کند — 21 × 2 = 42.",
                },
              },
              {
                q: { en: "Statements AFTER return inside a function...", fa: "دستورهای «بعد از» return داخل یک تابع..." },
                options: [
                  { en: "Run twice", fa: "دو بار اجرا می‌شوند" },
                  { en: "Never run", fa: "هرگز اجرا نمی‌شوند" },
                  { en: "Crash the page", fa: "صفحه را کرش می‌کنند" },
                ],
                answer: 1,
                explain: {
                  en: "return exits the function immediately — anything below it is unreachable dead code.",
                  fa: "return فوراً از تابع بیرون می‌زند — هرچه زیرش باشد کدِ مرده‌ی دست‌نیافتنی است.",
                },
              },
              {
                q: { en: "A function with no return answers:", fa: "تابعی که return ندارد چه جوابی می‌دهد؟" },
                options: [
                  { en: "0", fa: "0" },
                  { en: "undefined", fa: "undefined" },
                  { en: "The last statement's text", fa: "متنِ آخرین دستور" },
                ],
                answer: 1,
                explain: {
                  en: "No return means no answer — the call becomes undefined, which renders as the word undefined.",
                  fa: "نبودِ return یعنی بی‌جوابی — صدا تبدیل به undefined می‌شود که رندرش همان کلمه‌ی undefined است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The doubler", fa: "دوبرابرکن" },
            brief: {
              en: "Define function double(n) that RETURNS n * 2 — no rendering inside. Then render the calls: #d1 shows double(7) (expected: 14) and #d2 shows double(30) (expected: 60). Machine answers, caller renders.",
              fa: "تابع double(n) را تعریف کن که n * 2 را «برگرداند» — بدون رندر داخلش. بعد صداها را رندر کن: #d1 نتیجه‌ی double(7) را نشان بدهد (انتظار: 14) و #d2 نتیجه‌ی double(30) (انتظار: 60). ماشین جواب می‌دهد، صدا زننده رندر می‌کند.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The doubler</title>
  </head>
  <body>
    <h1>The doubler ✖️2</h1>
    <p>double(7) → <span id="d1">?</span></p>
    <p>double(30) → <span id="d2">?</span></p>

    <script>
      // 1) Define function double(n) that RETURNS n * 2
      // 2) Render double(7) into #d1   → expected: 14
      // 3) Render double(30) into #d2  → expected: 60
      // return sends the answer back; the call becomes the value

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The doubler</title>
  </head>
  <body>
    <h1>The doubler ✖️2</h1>
    <p>double(7) → <span id="d1">?</span></p>
    <p>double(30) → <span id="d2">?</span></p>

    <script>
      // 1) The answering machine: pure calculation
      function double(n) {
        return n * 2;
      }

      // 2) Each call becomes its returned value
      document.querySelector("#d1").textContent = double(7);   // Expected: 14
      document.querySelector("#d2").textContent = double(30);  // Expected: 60
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The machine: function double(n) { return n * 2; } — nothing else inside.",
                fa: "ماشین: function double(n) { return n * 2; } — داخلش چیزی دیگر نباشد.",
              },
              {
                en: "Render with the call itself: document.querySelector(\"#d1\").textContent = double(7);",
                fa: "با خودِ صدا رندر کن: document.querySelector(\"#d1\").textContent = double(7);",
              },
              {
                en: "Expected: #d1 shows 14, #d2 shows 60.",
                fa: "انتظار: #d1 نشان بدهد 14 و #d2 نشان بدهد 60.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#d1", text: "14" },
                { selector: "#d2", text: "60" },
                { selector: "#d1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m5-l4",
        title: { en: "Mini-project: The Grade Judge", fa: "مینی‌پروژه: داورِ نمره" },
        goal: {
          en: "Fuse modules 3 and 5: one function holding an else if chain, judging any score you feed it.",
          fa: "ماژول ۳ و ۵ را با هم ذوب کنی: یک تابع که زنجیره‌ی else if را در دل دارد و هر نمره‌ای را که بهش بدهی داوری می‌کند.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "A judge as a function", fa: "داوری به شکل تابع" },
            blocks: [
              {
                type: "text",
                en: "The rules: 90 or more → grade A; 75 to 89 → grade B; anything below → grade C. The judge is a function: it TAKES a score (parameter) and RETURNS a letter. The else if chain lives inside; the caller feeds it as many scores as it likes.",
                fa: "قوانین: ۹۰ به بالا → نمره‌ی A؛ ۷۵ تا ۸۹ → نمره‌ی B؛ پایین‌تر از آن → نمره‌ی C. داور یک تابع است: یک نمره «می‌گیرد» (پارامتر) و یک حرف «برمی‌گرداند» (return). زنجیره‌ی else if داخلش زندگی می‌کند؛ صدا زننده هرچقدر خواست بهش نمره می‌دهد.",
              },
              {
                type: "code",
                lang: "js",
                code: `function grade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 75) {
    return "B";
  } else {
    return "C";
  }
}

grade(92);  // "A"
grade(60);  // "C"`,
              },
              {
                type: "tip",
                en: "Early returns make chains short-circuit: the first door that opens exits immediately. Highest bar first, exactly as you learned in module 3.",
                fa: "returnهای زودهنگام زنجیره را میان‌بر می‌زنند: اولین دروازه‌ای که باز شود فوراً بیرون می‌زند. بالاترین شرط اول — درست همان‌طور که در ماژول ۳ یاد گرفتی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Feed it three students", fa: "سه دانش‌آموز را بهش بده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Grade judge</title>
  </head>
  <body>
    <h1>Report cards 📝</h1>
    <p id="g1">?</p>
    <p id="g2">?</p>
    <p id="g3">?</p>

    <script>
      // the judge: score in, letter out
      function grade(score) {
        if (score >= 90) {
          return "A";
        } else if (score >= 75) {
          return "B";
        } else {
          return "C";
        }
      }

      // the caller: three feeds, three renders
      document.querySelector("#g1").textContent = \`Score 92 → grade \${grade(92)}\`;
      document.querySelector("#g2").textContent = \`Score 78 → grade \${grade(78)}\`;
      document.querySelector("#g3").textContent = \`Score 60 → grade \${grade(60)}\`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "One judge, three students — the chain is written once but judges forever.",
                  fa: "یک داور، سه دانش‌آموز — زنجیره یک بار نوشته می‌شود ولی تا ابد داوری می‌کند.",
                },
              },
              {
                type: "warn",
                en: "return sends the letter BACK — if a branch forgets its return, that path answers undefined and the page shows the word undefined. Every door must carry its own return.",
                fa: "return حرف را «پس» می‌فرستد — اگر شاخه‌ای return‌اش را فراموش کند، آن مسیر undefined جواب می‌دهد و صفحه کلمه‌ی undefined را نشان می‌دهد. هر دروازه باید returnِ خودش را داشته باشد.",
              },
              {
                type: "text",
                en: "Mini-project rhythm, once more: rules in plain words → a pure machine that returns → feed it data → render the answers. This is the shape of almost every real feature you will ever build.",
                fa: "ریتمِ مینی‌پروژه، یک بار دیگر: قوانین به زبانِ آدمی → یک ماشینِ خالص که return می‌کند → داده بهش بده → جواب‌ها را رندر کن. این همان شکلی است که تقریباً هر قابلیتِ واقعی در آینده می‌سازی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "grade(78) → ?", fa: "grade(78) → ؟" },
                options: [
                  { en: "\"A\"", fa: "\"A\"" },
                  { en: "\"B\"", fa: "\"B\"" },
                  { en: "\"C\"", fa: "\"C\"" },
                ],
                answer: 1,
                explain: {
                  en: "78 fails the 90 door, passes the 75 door → B.",
                  fa: "۷۸ از درِ ۹۰ رد می‌شود و از درِ ۷۵ رد نمی‌شود → B.",
                },
              },
              {
                q: { en: "A branch forgets its return. The caller gets:", fa: "شاخه‌ای return‌اش را فراموش می‌کند. صدا زننده چه می‌گیرد؟" },
                options: [
                  { en: "The letter anyway", fa: "باز هم حرف را" },
                  { en: "undefined", fa: "undefined" },
                  { en: "0", fa: "0" },
                ],
                answer: 1,
                explain: {
                  en: "A path without return answers undefined — the famous invisible bug. Every branch returns.",
                  fa: "مسیری بدون return جوابش undefined است — باگِ نامرئیِ معروف. هر شاخه return دارد.",
                },
              },
              {
                q: { en: "Why put the else if chain INSIDE the function?", fa: "چرا زنجیره‌ی else if «داخلِ» تابع باشد؟" },
                options: [
                  { en: "One judge, unlimited scores — write the rules once", fa: "یک داور، بی‌نهایت نمره — قوانین یک بار نوشته می‌شوند" },
                  { en: "It looks nicer", fa: "قشنگ‌تر دیده می‌شود" },
                  { en: "HTML demands it", fa: "HTML آن را الزامی کرده" },
                ],
                answer: 0,
                explain: {
                  en: "The chain is the judge's brain; the function wraps it so ANY score can be judged with one call.",
                  fa: "زنجیره مغزِ داور است؛ تابع آن را می‌پیچد تا هر نمره‌ای با یک صدا داوری شود.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Grade Judge", fa: "داورِ نمره" },
            brief: {
              en: "Define grade(score) with the chain — 90+ returns A, 75+ returns B, otherwise C — then render: #g1 shows grade(92), #g2 shows grade(78), #g3 shows grade(60). Expected letters: A, B, C.",
              fa: "grade(score) را با زنجیره تعریف کن — ۹۰ به بالا A برگرداند، ۷۵ به بالا B، وگرنه C — بعد رندر کن: #g1 نتیجه‌ی grade(92)، #g2 نتیجه‌ی grade(78)، #g3 نتیجه‌ی grade(60). حرف‌های مورد انتظار: A، B، C.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Grade judge</title>
  </head>
  <body>
    <h1>Report cards 📝</h1>
    <p>Score 92 → <span id="g1">?</span></p>
    <p>Score 78 → <span id="g2">?</span></p>
    <p>Score 60 → <span id="g3">?</span></p>

    <script>
      // 1) Define grade(score):
      //      score >= 90 → return "A"
      //      score >= 75 → return "B"
      //      otherwise   → return "C"
      // 2) Render grade(92) into #g1, grade(78) into #g2, grade(60) into #g3

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Grade judge</title>
  </head>
  <body>
    <h1>Report cards 📝</h1>
    <p>Score 92 → <span id="g1">?</span></p>
    <p>Score 78 → <span id="g2">?</span></p>
    <p>Score 60 → <span id="g3">?</span></p>

    <script>
      // The judge: rules inside, letter out — every branch returns
      function grade(score) {
        if (score >= 90) {
          return "A";
        } else if (score >= 75) {
          return "B";
        } else {
          return "C";
        }
      }

      // Feed three scores, render three letters
      document.querySelector("#g1").textContent = grade(92); // A
      document.querySelector("#g2").textContent = grade(78); // B
      document.querySelector("#g3").textContent = grade(60); // C
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Each branch is one line: return \"A\"; — the chain decides WHICH one runs.",
                fa: "هر شاخه یک خط است: return \"A\"; — زنجیره تصمیم می‌گیرد «کدام» اجرا شود.",
              },
              {
                en: "Highest bar first: if (score >= 90) ... else if (score >= 75) ... else ...",
                fa: "بالاترین شرط اول: if (score >= 90) ... else if (score >= 75) ... else ...",
              },
              {
                en: "Render the CALLS directly: document.querySelector(\"#g1\").textContent = grade(92);",
                fa: "خودِ صداها را رندر کن: document.querySelector(\"#g1\").textContent = grade(92);",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#g1", text: "A" },
                { selector: "#g2", text: "B" },
                { selector: "#g3", text: "C" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 6 ────────────────────────────────────────────
  {
    id: "js-m6",
    title: { en: "Arrays", fa: "آرایه‌ها" },
    blurb: {
      en: "One box, many values: store lists, walk them with loops, sum them up — the data shape behind feeds, carts and scoreboards.",
      fa: "یک جعبه، چندین مقدار: لیست نگه دار، با حلقه قدم بزن، جمع بزن — شکلِ داده‌ایِ پشتِ فیدها، سبدخریدها و جدولِ امتیازها.",
    },
    lessons: [
      {
        id: "js-m6-l1",
        title: { en: "The List Box: Create & Index", fa: "جعبه‌ی لیست: ساختن و شمردن" },
        goal: {
          en: "Store many values in one array and fetch any single one by its zero-based index.",
          fa: "چند مقدار را در یک آرایه بریزی و هر تک‌مقدار را با اندیسِ صفر-محورش برداری.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "A box with numbered slots", fa: "جعبه‌ای با خانه‌های شماره‌دار" },
            blocks: [
              {
                type: "text",
                en: "An **array** is one box holding MANY values in order: `const fruits = [\"apple\", \"banana\", \"cherry\"]`. Each value sits in a numbered slot, and — the famous twist — counting starts at ZERO: `[0]` is the FIRST element, `[2]` is the third. `.length` counts the slots; asking beyond the end politely answers `undefined`.",
                fa: "یک **آرایه** جعبه‌ای است که «چندین» مقدار را به ترتیب نگه می‌دارد: `const fruits = [\"apple\", \"banana\", \"cherry\"]`. هر مقدار در خانه‌ای شماره‌دار می‌نشیند و — این همان چرخشِ معروف است — شمردن از «صفر» شروع می‌شود: `[0]` اولین عنصر است و `[2]` سومی. `.length` تعداد خانه‌ها را می‌شمارد و پرسیدنِ فراتر از انتها مؤدبانه `undefined` جواب می‌دهد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const fruits = ["apple", "banana", "cherry"];

fruits[0];      // "apple"  — the FIRST slot
fruits[2];      // "cherry" — the THIRD slot
fruits.length;  // 3
fruits[5];      // undefined — no such slot (no crash)`,
              },
              {
                type: "warn",
                en: "Zero-based! The first element is [0], and the LAST is [length - 1]. 'The third item is fruits[2]' feels wrong for about a week — then it feels normal.",
                fa: "پایه‌صفر است! اولین عنصر [0] است و «آخری» [length - 1]. اینکه «موردِ سوم fruits[2] است» حدوداً یک هفته غلط به نظر می‌رسد — بعد عادی می‌شود.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Read from the list, render", fa: "از لیست بخوان، رندر کن" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Score reader</title>
  </head>
  <body>
    <h1>Top scores 🏆</h1>
    <p>First: <span id="first">?</span></p>
    <p>Last: <span id="last">?</span></p>
    <p>How many: <span id="count">?</span></p>

    <script>
      const scores = [90, 85, 78];

      document.querySelector("#first").textContent = scores[0];
      document.querySelector("#last").textContent = scores[2];
      document.querySelector("#count").textContent = scores.length;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Three fetches from one box — by index, by index, by length.",
                  fa: "سه برداشت از یک جعبه — دو بار با اندیس، یک بار با length.",
                },
              },
              {
                type: "tip",
                en: "`.length` is a PROPERTY (no parentheses) — a plain number you can render, compare or loop with. `scores.length` and `scores[0]` are read-only peeks; the list is never disturbed.",
                fa: "`.length` یک «ویژگی» است (بدون پرانتز) — یک عددِ ساده که می‌توانی رندرش کنی، مقایسه‌اش کنی یا با آن حلقه بزنی. `scores.length` و `scores[0]` فقط نگاه‌کردن‌اند؛ لیست هیچ‌وقت به‌هم نمی‌ریزد.",
              },
              {
                type: "text",
                en: "Order is guaranteed: the array keeps exactly the order you wrote, so `scores[0]` is forever the first thing you put in. And arrays slot straight into template literals too — `First: ${scores[0]}` weaves the fetched value into a sentence.",
                fa: "ترتیب تضمین‌شده است: آرایه دقیقاً همان ترتیبی را نگه می‌دارد که نوشتی، پس `scores[0]` تا ابد اولین چیزی است که داخلش ریختی. و آرایه‌ها مستقیم داخل تمپلیت لیترال هم می‌نشینند — `First: ${scores[0]}` مقدارِ برداشته‌شده را داخل جمله می‌بافد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "const c = [\"a\", \"b\", \"c\"]; what is c[1]?", fa: "const c = [\"a\", \"b\", \"c\"]; نتیجه‌ی c[1] چیست؟" },
                options: [
                  { en: "\"a\"", fa: "\"a\"" },
                  { en: "\"b\"", fa: "\"b\"" },
                  { en: "\"c\"", fa: "\"c\"" },
                ],
                answer: 1,
                explain: {
                  en: "Index 1 is the SECOND slot — counting starts at 0.",
                  fa: "اندیسِ ۱ همان خانه‌ی «دوم» است — شمردن از ۰ شروع می‌شود.",
                },
              },
              {
                q: { en: "[7, 8, 9].length → ?", fa: "[7, 8, 9].length → ؟" },
                options: [
                  { en: "2", fa: "۲" },
                  { en: "3", fa: "۳" },
                  { en: "9", fa: "۹" },
                ],
                answer: 1,
                explain: {
                  en: "length counts the elements: three values, length 3.",
                  fa: "length عناصر را می‌شمارد: سه مقدار، length برابر ۳.",
                },
              },
              {
                q: { en: "[1, 2, 3][9] → ?", fa: "[1, 2, 3][9] → ؟" },
                options: [
                  { en: "It crashes the page", fa: "صفحه را کرش می‌کند" },
                  { en: "undefined", fa: "undefined" },
                  { en: "9", fa: "9" },
                ],
                answer: 1,
                explain: {
                  en: "Asking past the end is not an error — JavaScript politely hands back undefined.",
                  fa: "پرسیدنِ فراتر از انتها خطا نیست — جاوااسکریپت مؤدبانه undefined تحویل می‌دهد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Score reader", fa: "خواننده‌ی امتیاز" },
            brief: {
              en: "Create const scores = [90, 85, 78]; then render: #first shows scores[0] (expected: 90), #last shows scores[2] (expected: 78), #count shows scores.length (expected: 3).",
              fa: "const scores = [90, 85, 78] را بساز؛ بعد رندر کن: #first نتیجه‌ی scores[0] (انتظار: 90)، #last نتیجه‌ی scores[2] (انتظار: 78)، #count نتیجه‌ی scores.length (انتظار: 3).",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Score reader</title>
  </head>
  <body>
    <h1>Top scores 🏆</h1>
    <p>First: <span id="first">?</span></p>
    <p>Last: <span id="last">?</span></p>
    <p>How many: <span id="count">?</span></p>

    <script>
      // 1) const scores = [90, 85, 78];
      // 2) #first  → scores[0]
      //    #last   → scores[2]
      //    #count  → scores.length

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Score reader</title>
  </head>
  <body>
    <h1>Top scores 🏆</h1>
    <p>First: <span id="first">?</span></p>
    <p>Last: <span id="last">?</span></p>
    <p>How many: <span id="count">?</span></p>

    <script>
      // One box, three slots
      const scores = [90, 85, 78];

      // Zero-based indexing: [0] first, [2] third, length counts
      document.querySelector("#first").textContent = scores[0];   // Expected: 90
      document.querySelector("#last").textContent = scores[2];    // Expected: 78
      document.querySelector("#count").textContent = scores.length; // Expected: 3
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Three render lines, one pattern: document.querySelector(\"#first\").textContent = scores[0];",
                fa: "سه خطِ رندر با یک الگو: document.querySelector(\"#first\").textContent = scores[0];",
              },
              {
                en: "The last element of three is index 2 — not 3. Zero-based, always.",
                fa: "آخرین عنصرِ سه‌تایی، اندیسِ ۲ است — نه ۳. همیشه پایه‌صفر.",
              },
              {
                en: "length is a property — no parentheses: scores.length",
                fa: "length یک ویژگی است — بدون پرانتز: scores.length",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#first", text: "90" },
                { selector: "#last", text: "78" },
                { selector: "#count", text: "3" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m6-l2",
        title: { en: "Walking the List", fa: "قدم‌زدن در لیست" },
        goal: {
          en: "Visit every element with the classic for + length loop and collect the whole list into one line.",
          fa: "با حلقه‌ی کلاسیکِ for و length به سرِ تک‌تک عناصر بروی و کلِ لیست را در یک خط جمع کنی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "The classic walk", fa: "قدم‌زدنِ کلاسیک" },
            blocks: [
              {
                type: "text",
                en: "The signature pattern of arrays: loop from 0 WHILE `i < arr.length`, and inside the body `arr[i]` is the current element. First lap i is 0 (the first element), next lap 1, and so on — the loop stops exactly when the list runs out.",
                fa: "الگوی امضادارِ آرایه‌ها: از ۰ حلقه بزن «تا وقتی» `i < arr.length`، و داخل بدنه `arr[i]` همان عنصرِ جاری است. دورِ اول i برابر ۰ است (اولین عنصر)، دورِ بعد ۱ و همین‌طور — حلقه دقیقاً وقتی می‌ایستد که لیست تمام شود.",
              },
              {
                type: "code",
                lang: "js",
                code: `const names = ["Sara", "Aria", "Nima"];
let roll = "";

for (let i = 0; i < names.length; i++) {
  roll = roll + names[i] + ", ";
}
// roll is "Sara, Aria, Nima, "`,
              },
              {
                type: "tip",
                en: "Why `i < names.length` and not `<=`? The last valid index is length - 1 (here 2). With <= the loop would take one extra step into undefined.",
                fa: "چرا `i < names.length` و نه `<=`؟ آخرین اندیسِ معتبر length - 1 است (اینجا ۲). با <= حلقه یک قدمِ اضافه به سمتِ undefined برمی‌دارد.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Roll call, live", fa: "حاضر و غایب، زنده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Roll call</title>
  </head>
  <body>
    <h1>Roll call 📋</h1>
    <p id="roll">?</p>

    <script>
      const names = ["Sara", "Aria", "Nima"];
      let roll = "";

      for (let i = 0; i < names.length; i++) {
        roll = roll + names[i] + ", ";
      }

      document.querySelector("#roll").textContent = roll;
      // "Sara, Aria, Nima, "
    </script>
  </body>
</html>`,
                caption: {
                  en: "Three laps, three names — the line grows by one name each lap.",
                  fa: "سه دور، سه نام — خط با هر دور یک نام بزرگ‌تر می‌شود.",
                },
              },
              {
                type: "warn",
                en: "Start at 1 and you silently skip the first element; start at 0 with <= and you step past the end. The header (let i = 0; i < arr.length; i++) is muscle memory — copy it exactly.",
                fa: "از ۱ شروع کنی بی‌سروصدا عنصرِ اول را جا می‌اندازی؛ از ۰ با <= شروع کنی از انتها رد می‌شوی. سرصفحه‌ی (let i = 0; i < arr.length; i++) حافظه‌ی عضلانی است — مو‌به‌مو کپی‌اش کن.",
              },
              {
                type: "text",
                en: "This walk powers everything: feeds, shopping carts, friend lists, search results — anywhere a page shows 'many of something', a loop like this is underneath.",
                fa: "این قدم‌زدن همه‌چیز را می‌گرداند: فیدها، سبدخریدها، لیست دوستان، نتایج جست‌وجو — هرجا صفحه «چندتا از یک چیز» نشان می‌دهد، زیرش حلقه‌ای شبیه این است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why i < arr.length and not <=?", fa: "چرا i < arr.length و نه <=؟" },
                options: [
                  { en: "It runs faster", fa: "سریع‌تر اجرا می‌شود" },
                  { en: "The last valid index is length - 1", fa: "آخرین اندیسِ معتبر length - 1 است" },
                  { en: "Just a style choice", fa: "فقط یک سلیقه است" },
                ],
                answer: 1,
                explain: {
                  en: "Indexes run 0..length-1. Adding <= would visit arr[length] — undefined.",
                  fa: "اندیس‌ها از ۰ تا length-1 می‌روند. اضافه‌کردنِ <= یعنی رفتن سراغ arr[length] — یعنی undefined.",
                },
              },
              {
                q: { en: "Inside the loop, the current element is:", fa: "داخل حلقه، عنصرِ جاری کدام است؟" },
                options: [
                  { en: "arr[i]", fa: "arr[i]" },
                  { en: "arr.length", fa: "arr.length" },
                  { en: "i", fa: "i" },
                ],
                answer: 0,
                explain: {
                  en: "i is the slot number; arr[i] fetches what lives in that slot this lap.",
                  fa: "i شماره‌ی خانه است؛ arr[i] همان چیزی را می‌آورد که این دور در آن خانه است.",
                },
              },
              {
                q: { en: "names has 3 items → the body runs how many times?", fa: "names سه عضو دارد → بدنه چند بار اجرا می‌شود؟" },
                options: [
                  { en: "2", fa: "۲" },
                  { en: "3", fa: "۳" },
                  { en: "4", fa: "۴" },
                ],
                answer: 1,
                explain: {
                  en: "One lap per element: i takes 0, 1, 2 — three laps, then i < 3 fails at 3.",
                  fa: "برای هر عنصر یک دور: i به ترتیب ۰ و ۱ و ۲ می‌شود — سه دور، بعد i < 3 روی ۳ جواب را می‌گیرد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Roll call", fa: "حاضر و غایب" },
            brief: {
              en: "Create const names = [\"Sara\", \"Aria\", \"Nima\"]; then walk it with the classic loop, gluing each name plus \", \" onto a line. Render into #roll. It must contain: Sara, Aria, Nima",
              fa: "const names = [\"Sara\", \"Aria\", \"Nima\"] را بساز؛ بعد با حلقه‌ی کلاسیک قدم بزن و هر نام را به‌علاوه‌ی \", \" به خط بچسبان. در #roll رندر کن. باید شامل این باشد: Sara, Aria, Nima",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Roll call</title>
  </head>
  <body>
    <h1>Roll call 📋</h1>
    <p id="roll">?</p>

    <script>
      // 1) const names = ["Sara", "Aria", "Nima"];
      // 2) let roll = "";
      // 3) for (let i = 0; i < names.length; i++):
      //      roll = roll + names[i] + ", ";
      // 4) Render roll into #roll

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Roll call</title>
  </head>
  <body>
    <h1>Roll call 📋</h1>
    <p id="roll">?</p>

    <script>
      // The list
      const names = ["Sara", "Aria", "Nima"];

      // The accumulator
      let roll = "";

      // The classic walk: one lap per element
      for (let i = 0; i < names.length; i++) {
        roll = roll + names[i] + ", ";
      }

      // One render
      document.querySelector("#roll").textContent = roll;
      // "Sara, Aria, Nima, "
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Header exactly: for (let i = 0; i < names.length; i++) — starting at 0, strict <.",
                fa: "سرصفحه دقیقاً: for (let i = 0; i < names.length; i++) — شروع از ۰، < سخت‌گیرانه.",
              },
              {
                en: "Inside: roll = roll + names[i] + \", \"; — fetch the current element, glue it on.",
                fa: "داخلش: roll = roll + names[i] + \", \"; — عنصرِ جاری را بردار، بچسبان.",
              },
              {
                en: "Expected line: Sara, Aria, Nima",
                fa: "خطِ مورد انتظار: Sara, Aria, Nima",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#roll", text: "Sara, Aria, Nima" },
                { selector: "#roll", text: "Nima" },
                { selector: "#roll", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m6-l3",
        title: { en: "The Accumulator: Sum & Best", fa: "انباشتگر: جمع و بهترین" },
        goal: {
          en: "Carry a running total and a running champion across the loop — the two most reused accumulator patterns in existence.",
          fa: "در طول حلقه یک جمعِ جاری و یک قهرمانِ جاری با خودت حمل کنی — دو الگوی انباشتِ پرتکرارِ دنیا.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Carry a total, crown a champion", fa: "یک جمع حمل کن، یک قهرمان تاج بگذار" },
            blocks: [
              {
                type: "text",
                en: "Two loops-in-one lessons. The **sum**: start `total` at 0, each lap add the current element — `total = total + arr[i]`. The **best**: start `best` at 0, each lap check `if (arr[i] > best)` and crown a new champion when it wins. Both boxes must exist BEFORE the loop starts.",
                fa: "دو درس در یک درس. **جمع**: «total» را از ۰ شروع کن و در هر دور عنصرِ جاری را اضافه کن — `total = total + arr[i]`. **بهترین**: «best» را از ۰ شروع کن و در هر دور چک کن `if (arr[i] > best)` و هر وقت قهرمانِ جدید آمد، تاجش را بده. هر دو جعبه باید «قبل از» شروعِ حلقه موجود باشند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const points = [10, 25, 15, 30];

let total = 0;
let best = 0;

for (let i = 0; i < points.length; i++) {
  total = total + points[i];        // sum: absorb every element
  if (points[i] > best) {           // best: only champions update
    best = points[i];
  }
}
// total is 80, best is 30`,
              },
              {
                type: "tip",
                en: "Two accumulators can live in ONE loop — one walk through the list, two answers at the end. Professionals hate walking the same list twice.",
                fa: "دو انباشتگر می‌توانند در «یک» حلقه زندگی کنند — یک قدم‌زدن در لیست، دو جواب در انتها. حرفه‌ای‌ها از دو بار قدم‌زدن در یک لیست بیزارند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Watch the boxes grow", fa: "ببین جعبه‌ها بزرگ می‌شوند" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Sum and best</title>
  </head>
  <body>
    <h1>Sum & star ⭐</h1>
    <p>Sum: <span id="sum">?</span></p>
    <p>Best: <span id="best">?</span></p>

    <script>
      const points = [10, 25, 15, 30];

      let total = 0;
      let best = 0;

      for (let i = 0; i < points.length; i++) {
        total = total + points[i];
        if (points[i] > best) {
          best = points[i];
        }
      }

      document.querySelector("#sum").textContent = total;  // 80
      document.querySelector("#best").textContent = best;  // 30
    </script>
  </body>
</html>`,
                caption: {
                  en: "Four laps: total absorbs 10, 25, 15, 30; best changes only when a bigger number shows up.",
                  fa: "چهار دور: total دنبالِ هم ۱۰ و ۲۵ و ۱۵ و ۳۰ را می‌بلعد؛ best فقط وقتی عوض می‌شود که عدد بزرگ‌تری سر برسد.",
                },
              },
              {
                type: "warn",
                en: "Forgetting to START the accumulators breaks everything: total and best must be born (at 0) before the loop. A box that does not exist cannot absorb anything.",
                fa: "فراموش‌کردنِ «شروعِ» انباشتگرها همه‌چیز را خراب می‌کند: total و best باید (روی ۰) قبل از حلقه متولد شوند. جعبه‌ای که وجود ندارد نمی‌تواند چیزی را در خودش جمع کند.",
              },
              {
                type: "text",
                en: "Averages are one line away: `total / points.length` — you will use exactly that in the mini-project. Save it.",
                fa: "میانگین یک خط فاصله دارد: `total / points.length` — در مینی‌پروژه دقیقاً از همین استفاده می‌کنی. نگهش دار.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Walking [5, 5, 5] with total starting at 0 — what is total after the loop?", fa: "قدم‌زدن در [5, 5, 5] با total از ۰ — بعد از حلقه total چند است؟" },
                options: [
                  { en: "5", fa: "۵" },
                  { en: "15", fa: "۱۵" },
                  { en: "0", fa: "۰" },
                ],
                answer: 1,
                explain: {
                  en: "The total absorbs each element: 5 + 5 + 5 = 15.",
                  fa: "جمع تک‌تک عناصر را می‌بلعد: 5 + 5 + 5 = 15.",
                },
              },
              {
                q: { en: "What does best need BEFORE the loop?", fa: "best قبل از حلقه به چه چیزی نیاز دارد؟" },
                options: [
                  { en: "A starting value (like 0)", fa: "یک مقدارِ شروع (مثل ۰)" },
                  { en: "A return statement", fa: "یک return" },
                  { en: "Quotes around it", fa: "دورش گیومه" },
                ],
                answer: 0,
                explain: {
                  en: "The champion starts as 0 and gets dethroned whenever a bigger number appears.",
                  fa: "قهرمان از ۰ شروع می‌شود و هر وقت عددِ بزرگ‌تری ظاهر شد، تاجش را می‌دهد.",
                },
              },
              {
                q: { en: "When does best update?", fa: "best کی به‌روز می‌شود؟" },
                options: [
                  { en: "Every single lap", fa: "هر تک‌دور" },
                  { en: "Only when points[i] > best", fa: "فقط وقتی points[i] > best" },
                  { en: "Never — it stays 0", fa: "هرگز — همان ۰ می‌ماند" },
                ],
                answer: 1,
                explain: {
                  en: "The if guards the crown: only a bigger challenger takes it.",
                  fa: "if نگهبانِ تاج است: فقط رقیبِ بزرگ‌تر آن را می‌گیرد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Sum & star", fa: "جمع و ستاره" },
            brief: {
              en: "Create const points = [10, 25, 15, 30]; then ONE loop that builds both: sum absorbs every element, best keeps the biggest. Render #sum (expected: 80) and #best (expected: 30).",
              fa: "const points = [10, 25, 15, 30] را بساز؛ بعد «یک» حلقه که هر دو را بسازد: sum هر عنصر را ببلعد و best بزرگ‌ترین را نگه دارد. #sum را رندر کن (انتظار: 80) و #best (انتظار: 30).",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Sum and star</title>
  </head>
  <body>
    <h1>Sum & star ⭐</h1>
    <p>Sum: <span id="sum">?</span></p>
    <p>Best: <span id="best">?</span></p>

    <script>
      // 1) const points = [10, 25, 15, 30];
      // 2) let sum = 0;  let best = 0;
      // 3) ONE loop over points:
      //      sum = sum + points[i];
      //      if (points[i] > best) { best = points[i]; }
      // 4) Render sum into #sum and best into #best

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Sum and star</title>
  </head>
  <body>
    <h1>Sum & star ⭐</h1>
    <p>Sum: <span id="sum">?</span></p>
    <p>Best: <span id="best">?</span></p>

    <script>
      // The list and the two boxes, born before the loop
      const points = [10, 25, 15, 30];
      let sum = 0;
      let best = 0;

      // One walk, two answers
      for (let i = 0; i < points.length; i++) {
        sum = sum + points[i];        // the absorber
        if (points[i] > best) {       // the crown guard
          best = points[i];
        }
      }

      // Render both, after the loop
      document.querySelector("#sum").textContent = sum;   // Expected: 80
      document.querySelector("#best").textContent = best; // Expected: 30
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Both boxes first: let sum = 0; let best = 0; — then one for loop.",
                fa: "اول هر دو جعبه: let sum = 0; و let best = 0; — بعد یک حلقه‌ی for.",
              },
              {
                en: "Sum line: sum = sum + points[i];  Crown guard: if (points[i] > best) { best = points[i]; }",
                fa: "خطِ جمع: sum = sum + points[i];  نگهبانِ تاج: if (points[i] > best) { best = points[i]; }",
              },
              {
                en: "Expected: #sum shows 80, #best shows 30.",
                fa: "انتظار: #sum نشان بدهد 80 و #best نشان بدهد 30.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#sum", text: "80" },
                { selector: "#best", text: "30" },
                { selector: "#sum", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m6-l4",
        title: { en: "Mini-project: The Scoreboard", fa: "مینی‌پروژه: جدولِ امتیازها" },
        goal: {
          en: "Read a whole season in one walk: count, sum, average and top score of four matches.",
          fa: "یک فصلِ کامل را در یک قدم‌زدن بخوانی: تعداد، جمع، میانگین و بالاترین امتیازِ چهار بازی.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "One walk, four answers", fa: "یک قدم‌زدن، چهار جواب" },
            blocks: [
              {
                type: "text",
                en: "The season: `const points = [90, 80, 70, 100]`. Four stats to publish: **count** = `points.length` (no loop needed!), **sum** and **best** = one loop with two accumulators, **average** = `sum / count`. Plan the outputs first, then let one walk fill them.",
                fa: "فصل: `const points = [90, 80, 70, 100]`. چهار آمار برای انتشار: **count** برابر `points.length` (بدون حلقه!)، **sum** و **best** = یک حلقه با دو انباشتگر، **average** = `sum / count`. اول خروجی‌ها را طرح بزن، بعد بگذار یک قدم‌زدن پرشان کند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const points = [90, 80, 70, 100];

let sum = 0;
let best = 0;
for (let i = 0; i < points.length; i++) {
  sum = sum + points[i];
  if (points[i] > best) {
    best = points[i];
  }
}

const count = points.length;   // 4
const avg = sum / count;       // 85`,
              },
              {
                type: "tip",
                en: "While learning, pick data that divides cleanly: 340 / 4 = 85 — no decimal dust to fight. Once confident, averages like 86.25 render just fine too.",
                fa: "موقعِ یادگیری داده‌ای انتخاب کن که تمیز تقسیم شود: 340 / 4 = 85 — بدون غبارِ اعشار. وقتی مطمئن شدی، میانگین‌هایی مثل 86.25 هم رندر می‌شوند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Board, assembled", fa: "جدول، سرهم‌شده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Scoreboard</title>
  </head>
  <body>
    <h1>Season board 📊</h1>
    <p>Games played: <span id="count">?</span></p>
    <p>Total points: <span id="sum">?</span></p>
    <p>Average: <span id="avg">?</span></p>
    <p>Top score: <span id="top">?</span></p>

    <script>
      const points = [90, 80, 70, 100];

      // one walk, two accumulators
      let sum = 0;
      let best = 0;
      for (let i = 0; i < points.length; i++) {
        sum = sum + points[i];
        if (points[i] > best) {
          best = points[i];
        }
      }

      // the two stats that need no loop
      const count = points.length; // 4
      const avg = sum / count;     // 85

      // publish everything
      document.querySelector("#count").textContent = count;
      document.querySelector("#sum").textContent = sum;
      document.querySelector("#avg").textContent = avg;
      document.querySelector("#top").textContent = best;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Four stats, one loop — the season read at a glance.",
                  fa: "چهار آمار، یک حلقه — کل فصل در یک نگاه خوانده شد.",
                },
              },
              {
                type: "warn",
                en: "Order, as always: compute ALL the stats first, render LAST. A render line placed above the loop prints the boxes' starting values (0), not the results.",
                fa: "ترتیب، مثل همیشه: اول «همه‌ی» آمارها را حساب کن، رندر در آخر. خطِ رندری که بالای حلقه بنشیند مقدارهای شروعِ جعبه‌ها را چاپ می‌کند (۰)، نه نتیجه‌ها را.",
              },
              {
                type: "tip",
                en: "Stretch after passing: add a worst-score accumulator — a champion in reverse (points[i] < worst). Same walk, one more crown.",
                fa: "بعد از قبولی: یک انباشتگرِ بدترین-امتیاز اضافه کن — قهرمانی در جهتِ برعکس (points[i] < worst). همان قدم‌زدن، یک تاجِ دیگر.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Average of [90, 80, 70, 100]?", fa: "میانگینِ [90, 80, 70, 100]؟" },
                options: [
                  { en: "85", fa: "۸۵" },
                  { en: "80", fa: "۸۰" },
                  { en: "340", fa: "۳۴۰" },
                ],
                answer: 0,
                explain: {
                  en: "Sum is 340, count is 4 — 340 / 4 = 85.",
                  fa: "جمع ۳۴۰ است، تعداد ۴ — 340 / 4 = 85.",
                },
              },
              {
                q: { en: "Which stat does NOT need the loop?", fa: "کدام آمار به حلقه نیاز ندارد؟" },
                options: [
                  { en: "sum", fa: "sum" },
                  { en: "best", fa: "best" },
                  { en: "count — it is just points.length", fa: "count — همان points.length است" },
                ],
                answer: 2,
                explain: {
                  en: "length is a ready-made property; sum and best need to see every element once.",
                  fa: "length یک ویژگیِ آماده است؛ sum و best باید هر عنصر را یک‌بار ببینند.",
                },
              },
              {
                q: { en: "Render lines placed ABOVE the loop would show:", fa: "خط‌های رندری که «بالای» حلقه بنشینند چه نشان می‌دهند؟" },
                options: [
                  { en: "The final results", fa: "نتیجه‌های نهایی" },
                  { en: "The starting values (0)", fa: "مقدارهای شروع (۰)" },
                  { en: "undefined everywhere", fa: "همه‌جا undefined" },
                ],
                answer: 1,
                explain: {
                  en: "Statements run top to bottom — above the loop, the accumulators are still at 0.",
                  fa: "دستورها بالا به پایین اجرا می‌شوند — بالای حلقه، انباشتگرها هنوز روی ۰ هستند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Scoreboard", fa: "جدولِ امتیازها" },
            brief: {
              en: "Create const points = [90, 80, 70, 100]; then publish the season: #count shows 4 (points.length), #sum shows 340, #avg shows 85 (sum / count), #top shows 100. Build sum and top with ONE loop of two accumulators.",
              fa: "const points = [90, 80, 70, 100] را بساز؛ بعد فصل را منتشر کن: #count نشان بدهد 4 (points.length)، #sum نشان بدهد 340، #avg نشان بدهد 85 (sum / count)، #top نشان بدهد 100. جمع و بهترین را با «یک» حلقه و دو انباشتگر بساز.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Scoreboard</title>
  </head>
  <body>
    <h1>Season board 📊</h1>
    <p>Games played: <span id="count">?</span></p>
    <p>Total points: <span id="sum">?</span></p>
    <p>Average: <span id="avg">?</span></p>
    <p>Top score: <span id="top">?</span></p>

    <script>
      // 1) const points = [90, 80, 70, 100];
      // 2) ONE loop: build sum and best (both start at 0)
      // 3) count = points.length;  avg = sum / count;
      // 4) Render: #count, #sum, #avg, #top  →  4 / 340 / 85 / 100

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Scoreboard</title>
  </head>
  <body>
    <h1>Season board 📊</h1>
    <p>Games played: <span id="count">?</span></p>
    <p>Total points: <span id="sum">?</span></p>
    <p>Average: <span id="avg">?</span></p>
    <p>Top score: <span id="top">?</span></p>

    <script>
      // The season
      const points = [90, 80, 70, 100];

      // One walk, two accumulators
      let sum = 0;
      let best = 0;
      for (let i = 0; i < points.length; i++) {
        sum = sum + points[i];
        if (points[i] > best) {
          best = points[i];
        }
      }

      // The no-loop stats
      const count = points.length; // 4
      const avg = sum / count;     // 85

      // Publish, after all computing
      document.querySelector("#count").textContent = count; // 4
      document.querySelector("#sum").textContent = sum;     // 340
      document.querySelector("#avg").textContent = avg;     // 85
      document.querySelector("#top").textContent = best;    // 100
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Boxes first: let sum = 0; let best = 0; — one loop fills both.",
                fa: "اول جعبه‌ها: let sum = 0; و let best = 0; — یک حلقه هر دو را پر می‌کند.",
              },
              {
                en: "avg is one line: const avg = sum / points.length;",
                fa: "avg یک خط است: const avg = sum / points.length;",
              },
              {
                en: "Expected board: 4 / 340 / 85 / 100.",
                fa: "جدولِ مورد انتظار: 4 / 340 / 85 / 100.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#count", text: "4" },
                { selector: "#sum", text: "340" },
                { selector: "#avg", text: "85" },
                { selector: "#top", text: "100" },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 7 ────────────────────────────────────────────
  {
    id: "js-m7",
    title: { en: "Objects", fa: "اشیاء" },
    blurb: {
      en: "Group related facts under named labels: build objects, update them, and walk arrays of them — the shape real apps are made of.",
      fa: "حقایقِ مرتبط را زیر برچسب‌های نام‌دار گروه کن: شیء بساز، به‌روزش کن، و در آرایه‌ای از آن‌ها قدم بزن — شکلی که اپ‌های واقعی از آن ساخته شده‌اند.",
    },
    lessons: [
      {
        id: "js-m7-l1",
        title: { en: "Data with Name Tags", fa: "داده با برچسبِ نام" },
        goal: {
          en: "Bundle related facts into one object with key: value pairs and read any fact by its label.",
          fa: "حقایقِ مرتبط را با جفت‌های key: value در یک شیء بسته‌بندی کنی و هر حقیقت را با برچسبش بخوانی.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "Arrays group many; objects group ONE thing", fa: "آرایه «چند تا» را گروه می‌کند؛ شیء حقایقِ «یک چیز» را" },
            blocks: [
              {
                type: "text",
                en: "An **object** stores facts about ONE thing under named labels: `const player = { name: \"Sara\", city: \"Tehran\", level: 7 }`. Each `key: value` pair is a fact; the dot reads one fact back — `player.name` is \"Sara\". Arrays hold many interchangeable items; objects hold the different facts that belong together.",
                fa: "یک **شیء** حقایقِ مربوط به «یک چیز» را زیر برچسب‌های نام‌دار نگه می‌دارد: `const player = { name: \"Sara\", city: \"Tehran\", level: 7 }`. هر جفتِ `key: value` یک حقیقت است؛ نقطه یک حقیقت را پس می‌خواند — `player.name` می‌شود \"Sara\". آرایه‌ها آیتم‌های هم‌جنسِ زیاد را نگه می‌دارند؛ اشیاء حقایقِ متفاوتِ به‌هم‌پیوسته را.",
              },
              {
                type: "code",
                lang: "js",
                code: `const player = {
  name: "Sara",
  city: "Tehran",
  level: 7,
};

player.name;   // "Sara"
player.level;  // 7
player.city;   // "Tehran"`,
              },
              {
                type: "tip",
                en: "Choose an ARRAY when items are interchangeable (a list of scores); an OBJECT when facts belong together (one player). And the biggest truth of all: real-world data is usually an ARRAY of OBJECTS — lesson three!",
                fa: "وقتی آیتم‌ها هم‌جنس‌اند «آرایه» انتخاب کن (لیست امتیازها)؛ وقتی حقایق به هم تعلق دارند «شیء» (یک بازیکن). و بزرگ‌ترین حقیقت: داده‌ی دنیای واقعی معمولاً «آرایه‌ای از اشیاء» است — درسِ سوم!",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Profile, rendered", fa: "پروفایل، رندرشده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Player profile</title>
  </head>
  <body>
    <h1>Player profile 🎮</h1>
    <p>Name: <span id="name">?</span></p>
    <p>City: <span id="city">?</span></p>
    <p>Level: <span id="level">?</span></p>

    <script>
      const player = { name: "Sara", city: "Tehran", level: 7 };

      document.querySelector("#name").textContent = player.name;
      document.querySelector("#city").textContent = player.city;
      document.querySelector("#level").textContent = player.level;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Three dots, three facts — each label delivers its own value.",
                  fa: "سه نقطه، سه حقیقت — هر برچسب مقدارِ خودش را تحویل می‌دهد.",
                },
              },
              {
                type: "warn",
                en: "The KEY is written bare (no quotes) in the object, and read bare with a dot: `player.name` — not `player(\"name\")`, not `\"player\".name`. One dot, then the label.",
                fa: "«کلید» داخل شیء لخت نوشته می‌شود (بدون گیومه) و با نقطه و لخت خوانده می‌شود: `player.name` — نه `player(\"name\")`، نه `\"player\".name`. یک نقطه، بعد برچسب.",
              },
              {
                type: "text",
                en: "Objects keep code honest: one variable carries a whole profile, and adding a new fact later is ONE new line — nothing else in your program has to move.",
                fa: "اشیاء کد را صادق نگه می‌دارند: یک متغیر کلِ پروفایل را حمل می‌کند و اضافه‌کردنِ یک حقیقتِ جدید بعداً فقط «یک» خطِ جدید است — هیچ‌جای دیگر برنامه‌ات لازم نیست تکان بخورد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does player.level read?", fa: "player.level چه چیزی را می‌خواند؟" },
                options: [
                  { en: "The value stored under the key level", fa: "مقداری که زیر کلیدِ level ذخیره شده" },
                  { en: "The string \"level\"", fa: "رشته‌ی \"level\"" },
                  { en: "Nothing — it is a comment", fa: "هیچی — کامنت است" },
                ],
                answer: 0,
                explain: {
                  en: "The dot asks the object for the value of that key: level holds 7.",
                  fa: "نقطه از شیء مقدارِ آن کلید را می‌پرسد: level عددِ 7 را نگه می‌دارد.",
                },
              },
              {
                q: { en: "Which is a correct object?", fa: "کدام یک شیءِ درست است؟" },
                options: [
                  { en: "{ name: \"Sara\" }", fa: "{ name: \"Sara\" }" },
                  { en: "(name = \"Sara\")", fa: "(name = \"Sara\")" },
                  { en: "[\"name\" → \"Sara\"]", fa: "[\"name\" → \"Sara\"]" },
                ],
                answer: 0,
                explain: {
                  en: "Curly braces + key: value pairs — that is the object shape.",
                  fa: "آکولاد + جفت‌های key: value — این همان شکلِ شیء است.",
                },
              },
              {
                q: { en: "How many facts can one object carry?", fa: "یک شیء چند حقیقت می‌تواند حمل کند؟" },
                options: [
                  { en: "Exactly one", fa: "دقیقاً یکی" },
                  { en: "Exactly three", fa: "دقیقاً سه‌تا" },
                  { en: "As many as you write — mixed types allowed", fa: "هرچقدر بنویسی — نوع‌های قاطی هم مجاز است" },
                ],
                answer: 2,
                explain: {
                  en: "Objects grow freely: strings, numbers, booleans — each pair is another fact about the same thing.",
                  fa: "اشیاء آزادانه بزرگ می‌شوند: رشته، عدد، بولین — هر جفت یک حقیقتِ دیگر درباره‌ی همان یک چیز است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Profile reader", fa: "خواننده‌ی پروفایل" },
            brief: {
              en: "Create const player = { name: \"Sara\", city: \"Tehran\", level: 7 }; then render: #name shows player.name, #city shows player.city, #level shows player.level.",
              fa: "const player = { name: \"Sara\", city: \"Tehran\", level: 7 } را بساز؛ بعد رندر کن: #name نشان بدهد player.name، #city نشان بدهد player.city، #level نشان بدهد player.level.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Player profile</title>
  </head>
  <body>
    <h1>Player profile 🎮</h1>
    <p>Name: <span id="name">?</span></p>
    <p>City: <span id="city">?</span></p>
    <p>Level: <span id="level">?</span></p>

    <script>
      // 1) const player = { name: "Sara", city: "Tehran", level: 7 };
      // 2) Render player.name into #name, player.city into #city,
      //    player.level into #level

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Player profile</title>
  </head>
  <body>
    <h1>Player profile 🎮</h1>
    <p>Name: <span id="name">?</span></p>
    <p>City: <span id="city">?</span></p>
    <p>Level: <span id="level">?</span></p>

    <script>
      // One object, three labelled facts
      const player = { name: "Sara", city: "Tehran", level: 7 };

      // Each dot reads one fact
      document.querySelector("#name").textContent = player.name;   // Sara
      document.querySelector("#city").textContent = player.city;   // Tehran
      document.querySelector("#level").textContent = player.level; // 7
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Object first: const player = { name: \"Sara\", city: \"Tehran\", level: 7 };",
                fa: "اول شیء: const player = { name: \"Sara\", city: \"Tehran\", level: 7 };",
              },
              {
                en: "Each render is one dot: player.name, player.city, player.level.",
                fa: "هر رندر یک نقطه است: player.name و player.city و player.level.",
              },
              {
                en: "Expected: Sara / Tehran / 7.",
                fa: "انتظار: Sara / Tehran / 7.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#name", text: "Sara" },
                { selector: "#city", text: "Tehran" },
                { selector: "#level", text: "7" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m7-l2",
        title: { en: "Update, Add, Weave", fa: "به‌روزرسانی، افزودن، بافتن" },
        goal: {
          en: "Change a property, add a brand-new one, and slide object values into template literals.",
          fa: "یک ویژگی را عوض کنی، یکی کاملاً جدید اضافه کنی، و مقادیرِ شیء را داخل تمپلیت لیترال‌ها ببافی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Objects are alive", fa: "اشیاء زنده‌اند" },
            blocks: [
              {
                type: "text",
                en: "Objects CHANGE — that is the point. `player.level = 9;` updates an existing key; `player.city = \"Shiraz\";` adds a brand-new key on the fly. This is how apps remember: levels gained, cart items added, profiles edited — all object property updates.",
                fa: "اشیاء «تغییر» می‌کنند — نقطه‌ی قوتشان همین است. `player.level = 9;` یک کلیدِ موجود را به‌روز می‌کند؛ `player.city = \"Shiraz\";` یک کلیدِ کاملاً جدید در حینِ کار اضافه می‌کند. اپ‌ها با همین یادشان می‌ماند: سطح‌هایی که گرفته شده، آیتم‌هایی که به سبد رفته، پروفایل‌هایی که ویرایش شده — همه به‌روزرسانیِ ویژگی‌های شیء.",
              },
              {
                type: "code",
                lang: "js",
                code: `const player = { name: "Aria", level: 1 };

player.level = 9;          // update an existing key
player.city = "Shiraz";    // add a brand-new key

player.level;  // 9
player.city;   // "Shiraz"`,
              },
              {
                type: "tip",
                en: "Template literals love objects: `${player.name} is level ${player.level}` — weave facts straight into sentences, no middle variables needed.",
                fa: "تمپلیت لیترال‌ها عاشق اشیاء هستند: `${player.name} is level ${player.level}` — حقایق را مستقیم داخل جمله بباف، بدون متغیرِ واسطه.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Level up, live", fa: "ارتقای سطح، زنده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Level up</title>
  </head>
  <body>
    <h1>Level up ⬆️</h1>
    <p id="line1">?</p>
    <p id="line2">?</p>

    <script>
      const player = { name: "Aria", level: 1 };

      // update one key...
      player.level = 9;
      // ...and add another
      player.city = "Shiraz";

      document.querySelector("#line1").textContent =
        \`\${player.name} is level \${player.level}\`;
      document.querySelector("#line2").textContent =
        \`\${player.name} comes from \${player.city}\`;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Same const, new contents — the object grew and changed on the spot.",
                  fa: "همان const، محتوای جدید — شیء همان‌جا بزرگ و عوض شد.",
                },
              },
              {
                type: "warn",
                en: "const objects CAN be updated — const freezes the LABEL, not the contents. Only reassigning the whole box (`player = ...`) would throw an error.",
                fa: "اشیاءِ const «قابل» به‌روزرسانی‌اند — const برچسب را مهروموم می‌کند، نه محتوا را. فقط دوباره مقدار دادن به کلِ جعبه (`player = ...`) خطا می‌دهد.",
              },
              {
                type: "text",
                en: "Reading order inside the hole: `${player.level}` — dot first, then render. And remember: the hole only works inside BACKTICKS; plain quotes would print the raw ${player.level} text.",
                fa: "ترتیبِ خواندن داخل حفره: `${player.level}` — اول نقطه، بعد رندر. و یادت باشد: حفره فقط داخل «بک‌تیک» کار می‌کند؛ گیومه‌ی معمولی همان متنِ خامِ ${player.level} را چاپ می‌کند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "const player = {...}; player.level = 9; — legal?", fa: "const player = {...}; و بعد player.level = 9; — مجاز است؟" },
                options: [
                  { en: "Yes — const freezes the box's label, not its contents", fa: "بله — const برچسبِ جعبه را مهروموم می‌کند، نه محتوایش را" },
                  { en: "No — const never changes", fa: "نه — const هرگز تغییر نمی‌کند" },
                  { en: "Only if the object was made with let", fa: "فقط اگر شیء با let ساخته شده باشد" },
                ],
                answer: 0,
                explain: {
                  en: "Updating a property is fine under const; only reassigning the whole variable errors.",
                  fa: "به‌روزرسانیِ ویژگی زیرِ const اشکالی ندارد؛ فقط مقداردهیِ دوباره به کلِ متغیر خطا می‌دهد.",
                },
              },
              {
                q: { en: "player.badge = \"gold\" — but badge did not exist yet?", fa: "player.badge = \"gold\" — ولی badge از قبل وجود نداشت؟" },
                options: [
                  { en: "An error", fa: "خطا" },
                  { en: "It creates the new key", fa: "کلیدِ جدید را می‌سازد" },
                  { en: "It is silently ignored", fa: "بی‌سروصدا نادیده گرفته می‌شود" },
                ],
                answer: 1,
                explain: {
                  en: "Assigning to a missing key ADDS it — objects grow on demand.",
                  fa: "مقدار دادن به کلیدِ ناموجود آن را «اضافه» می‌کند — اشیاء در صورتِ نیاز بزرگ می‌شوند.",
                },
              },
              {
                q: { en: "`Hi ${player.name}` — what makes the hole work?", fa: "`Hi ${player.name}` — چه چیزی حفره را کار می‌اندازد؟" },
                options: [
                  { en: "The backticks around the whole sentence", fa: "بک‌تیک‌هایی که کلِ جمله را گرفته‌اند" },
                  { en: "Double quotes", fa: "گیومه‌های دوتایی" },
                  { en: "Parentheses around player.name", fa: "پرانتز دورِ player.name" },
                ],
                answer: 0,
                explain: {
                  en: "Holes (${...}) only work inside backtick template literals — never inside plain quotes.",
                  fa: "حفره‌ها (${...}) فقط داخل تمپلیت لیترالِ بک‌تیک کار می‌کنند — هرگز داخل گیومه‌ی معمولی.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Level up!", fa: "ارتقا بده!" },
            brief: {
              en: "Start with const player = { name: \"Aria\", level: 1 }; then update level to 9 and add city \"Shiraz\". Render #line1 as exactly: Aria is level 9 — and #line2 as: Aria comes from Shiraz. Both with template literals.",
              fa: "با const player = { name: \"Aria\", level: 1 } شروع کن؛ بعد level را به ۹ به‌روز کن و city را \"Shiraz\" اضافه کن. #line1 را دقیقاً رندر کن: Aria is level 9 — و #line2 را: Aria comes from Shiraz. هر دو با تمپلیت لیترال.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Level up</title>
  </head>
  <body>
    <h1>Level up ⬆️</h1>
    <p id="line1">?</p>
    <p id="line2">?</p>

    <script>
      // 1) const player = { name: "Aria", level: 1 };
      // 2) Update: player.level = 9;   Add: player.city = "Shiraz";
      // 3) Render #line1:  Aria is level 9      (template literal!)
      //    Render #line2:  Aria comes from Shiraz

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Level up</title>
  </head>
  <body>
    <h1>Level up ⬆️</h1>
    <p id="line1">?</p>
    <p id="line2">?</p>

    <script>
      // 1) The player arrives at level 1
      const player = { name: "Aria", level: 1 };

      // 2) Life happens: update one key, add another
      player.level = 9;
      player.city = "Shiraz";

      // 3) Weave the facts into sentences
      document.querySelector("#line1").textContent = \`\${player.name} is level \${player.level}\`;
      document.querySelector("#line2").textContent = \`\${player.name} comes from \${player.city}\`;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Update is one line: player.level = 9;  Add is one line: player.city = \"Shiraz\";",
                fa: "به‌روزرسانی یک خط است: player.level = 9;  افزودن هم یک خط: player.city = \"Shiraz\";",
              },
              {
                en: "Render with a backtick literal: `${player.name} is level ${player.level}`",
                fa: "با تمپلیت لیترالِ بک‌تیک رندر کن: `${player.name} is level ${player.level}`",
              },
              {
                en: "Expected: #line1 shows Aria is level 9 — #line2 shows Aria comes from Shiraz.",
                fa: "انتظار: #line1 نشان بدهد Aria is level 9 — #line2 نشان بدهد Aria comes from Shiraz.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#line1", text: "Aria is level 9" },
                { selector: "#line2", text: "Aria comes from Shiraz" },
                { selector: "#line1", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m7-l3",
        title: { en: "Arrays of Objects: The Real-World Pattern", fa: "آرایه‌ای از اشیاء: الگوی دنیای واقعی" },
        goal: {
          en: "Combine both data shapes — walk an array of objects and render each one's facts.",
          fa: "هر دو شکلِ داده را ترکیب کنی — در آرایه‌ای از اشیاء قدم بزنی و حقایقِ هرکدام را رندر کنی.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "A row of profiles", fa: "ردیفی از پروفایل‌ها" },
            blocks: [
              {
                type: "text",
                en: "Now the two shapes click together: an ARRAY whose elements are OBJECTS — `[{ name: \"Sara\", score: 90 }, { ... }]`. This is THE pattern behind every feed, user list and shopping cart. Walk it with the classic loop; each lap, grab the current object and read its keys.",
                fa: "حالا دو شکل در هم کلیک می‌کنند: یک «آرایه» که عناصرش «شیء» هستند — `[{ name: \"Sara\", score: 90 }, { ... }]`. این همان الگوی پشتِ هر فید، هر لیست کاربران و هر سبدخرید است. با حلقه‌ی کلاسیک قدم بزن؛ در هر دور، شیءِ جاری را بردار و کلیدهایش را بخوان.",
              },
              {
                type: "code",
                lang: "js",
                code: `const students = [
  { name: "Sara", score: 90 },
  { name: "Nima", score: 85 },
  { name: "Aria", score: 78 },
];

let list = "";
for (let i = 0; i < students.length; i++) {
  const s = students[i];   // this lap's object
  list = list + \`\${s.name}: \${s.score}  ·  \`;
}
// "Sara: 90 · Nima: 85 · Aria: 78 · "`,
              },
              {
                type: "tip",
                en: "One const per lap: `const s = students[i]` — a fresh box each lap holding the current object, so the line below reads like English: s.name, s.score.",
                fa: "در هر دور یک const: `const s = students[i]` — هر دور یک جعبه‌ی تازه که شیءِ جاری را نگه می‌دارد، تا خطِ پایینش مثل انگلیسیِ ساده خوانده شود: s.name و s.score.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The class register, live", fa: "صورتمجلسِ کلاس، زنده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Class register</title>
  </head>
  <body>
    <h1>Class register 🎓</h1>
    <p id="list">?</p>

    <script>
      const students = [
        { name: "Sara", score: 90 },
        { name: "Nima", score: 85 },
        { name: "Aria", score: 78 },
      ];

      let list = "";

      for (let i = 0; i < students.length; i++) {
        const s = students[i];
        list = list + \`\${s.name}: \${s.score}  ·  \`;
      }

      document.querySelector("#list").textContent = list;
      // "Sara: 90 · Nima: 85 · Aria: 78 · "
    </script>
  </body>
</html>`,
                caption: {
                  en: "Three laps, three objects, one growing register line.",
                  fa: "سه دور، سه شیء، یک خطِ صورتمجلسی که بزرگ‌تر می‌شود.",
                },
              },
              {
                type: "warn",
                en: "Two dots, one line: `students[i].name` — FIRST the index [i] picks WHICH object, THEN .name reads its key. You cannot read a key before choosing the object.",
                fa: "دو انتخاب در یک خط: `students[i].name` — «اول» اندیسِ [i] مشخص می‌کند «کدام» شیء، «بعد» .name کلیدش را می‌خواند. نمی‌شود قبل از انتخابِ شیء، کلیدش را خواند.",
              },
              {
                type: "text",
                en: "Scale check: Instagram's feed is an array of post objects; a shop cart is an array of product objects; a chat is an array of message objects. You have just learned the shape the whole internet is stored in.",
                fa: "مقیاس: فیدِ اینستاگرام آرایه‌ای از شیءِ پست‌هاست؛ سبدِ یک فروشگاه آرایه‌ای از شیءِ محصول‌هاست؛ یک چت آرایه‌ای از شیءِ پیام‌هاست. همین الان شکلی را یاد گرفتی که کلِ اینترنت در آن ذخیره می‌شود.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "students[i] is…", fa: "students[i] چیست؟" },
                options: [
                  { en: "A number", fa: "یک عدد" },
                  { en: "One object from the array — this lap's student", fa: "یک شیء از آرایه — دانش‌آموزِ همین دور" },
                  { en: "The whole array", fa: "کلِ آرایه" },
                ],
                answer: 1,
                explain: {
                  en: "The index picks out ONE element — and in this array, each element is an object.",
                  fa: "اندیس «یکی» از عناصر را برمی‌دارد — و در این آرایه، هر عنصر یک شیء است.",
                },
              },
              {
                q: { en: "The current lap's object is stored in s. Its score is:", fa: "شیءِ دورِ جاری در s است. نمره‌اش کدام است؟" },
                options: [
                  { en: "s.score", fa: "s.score" },
                  { en: "s(score)", fa: "s(score)" },
                  { en: "score.s", fa: "score.s" },
                ],
                answer: 0,
                explain: {
                  en: "Dot + key reads one fact: s.score.",
                  fa: "نقطه + کلید یک حقیقت را می‌خواند: s.score.",
                },
              },
              {
                q: { en: "3 students → the loop body runs:", fa: "۳ دانش‌آموز → بدنه‌ی حلقه اجرا می‌شود:" },
                options: [
                  { en: "2 times", fa: "۲ بار" },
                  { en: "3 times", fa: "۳ بار" },
                  { en: "4 times", fa: "۴ بار" },
                ],
                answer: 1,
                explain: {
                  en: "One lap per object: length is 3, indexes 0..2.",
                  fa: "برای هر شیء یک دور: length برابر ۳ است، اندیس‌ها ۰ تا ۲.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Class register", fa: "صورتمجلسِ کلاس" },
            brief: {
              en: "Create const students with three objects — { name: \"Sara\", score: 90 }, { name: \"Nima\", score: 85 }, { name: \"Aria\", score: 78 }. Walk it with the classic loop (grab each lap's object with const s = students[i]) and build the line with a template literal. Render into #list. It must contain: Sara: 90, Nima: 85, Aria: 78",
              fa: "const students با سه شیء بساز — { name: \"Sara\", score: 90 } و { name: \"Nima\", score: 85 } و { name: \"Aria\", score: 78 }. با حلقه‌ی کلاسیک قدم بزن (شیءِ هر دور را با const s = students[i] بردار) و خط را با تمپلیت لیترال بساز. در #list رندر کن. باید شامل این‌ها باشد: Sara: 90، Nima: 85، Aria: 78",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Class register</title>
  </head>
  <body>
    <h1>Class register 🎓</h1>
    <p id="list">?</p>

    <script>
      // 1) const students = [
      //      { name: "Sara", score: 90 },
      //      { name: "Nima", score: 85 },
      //      { name: "Aria", score: 78 },
      //    ];
      // 2) let list = "";
      // 3) Loop: const s = students[i];
      //      list = list + \`\${s.name}: \${s.score}  ·  \`;
      // 4) Render list into #list

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Class register</title>
  </head>
  <body>
    <h1>Class register 🎓</h1>
    <p id="list">?</p>

    <script>
      // Three objects in one array — the real-world shape
      const students = [
        { name: "Sara", score: 90 },
        { name: "Nima", score: 85 },
        { name: "Aria", score: 78 },
      ];

      // The accumulator
      let list = "";

      // Each lap: grab this lap's object, read its keys
      for (let i = 0; i < students.length; i++) {
        const s = students[i];
        list = list + \`\${s.name}: \${s.score}  ·  \`;
      }

      // One render
      document.querySelector("#list").textContent = list;
      // "Sara: 90 · Nima: 85 · Aria: 78 · "
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Header: for (let i = 0; i < students.length; i++) — then const s = students[i];",
                fa: "سرصفحه: for (let i = 0; i < students.length; i++) — بعد const s = students[i];",
              },
              {
                en: "Build with a backtick literal: `${s.name}: ${s.score}  ·  `",
                fa: "با تمپلیت لیترالِ بک‌تیک بساز: `${s.name}: ${s.score}  ·  `",
              },
              {
                en: "Expected line: Sara: 90 · Nima: 85 · Aria: 78",
                fa: "خطِ مورد انتظار: Sara: 90 · Nima: 85 · Aria: 78",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#list", text: "Sara: 90" },
                { selector: "#list", text: "Nima: 85" },
                { selector: "#list", text: "Aria: 78" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m7-l4",
        title: { en: "Mini-project: The Team Roster", fa: "مینی‌پروژه: فهرستِ تیم" },
        goal: {
          en: "Half-A finale: functions + arrays + objects + loops + template literals build a complete team roster page.",
          fa: "پایانِ نیمه‌ی اول: توابع + آرایه‌ها + اشیاء + حلقه‌ها + تمپلیت لیترال‌ها یک صفحه‌ی فهرستِ تیمِ کامل می‌سازند.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "One function, many members", fa: "یک تابع، چند عضو" },
            blocks: [
              {
                type: "text",
                en: "The finale stacks EVERYTHING from half A: a pure function `describe(member)` turns ONE object into one string (`Sara (designer)`); the loop feeds it each team member and glues the results together; one render at the end publishes the roster. Function (m5) + array (m6) + object (m7) + loop (m4) + template literal (m2) — five modules, one page.",
                fa: "پایانی همه‌چیزِ نیمه‌ی اول را روی هم می‌چیند: یک تابعِ خالصِ `describe(member)` «یک» شیء را به یک رشته تبدیل می‌کند (`Sara (designer)`)؛ حلقه هر عضوِ تیم را بهش می‌دهد و نتیجه‌ها را به هم می‌چسباند؛ یک رندر در آخر فهرست را منتشر می‌کند. تابع (م۵) + آرایه (م۶) + شیء (م۷) + حلقه (م۴) + تمپلیت لیترال (م۲) — پنج ماژول، یک صفحه.",
              },
              {
                type: "code",
                lang: "js",
                code: `const team = [
  { name: "Sara", role: "designer" },
  { name: "Aria", role: "developer" },
  { name: "Nima", role: "security" },
];

function describe(member) {
  return \`\${member.name} (\${member.role})\`;
}

let roster = "";
for (let i = 0; i < team.length; i++) {
  roster = roster + describe(team[i]) + " | ";
}
// "Sara (designer) | Aria (developer) | Nima (security) | "`,
              },
              {
                type: "tip",
                en: "This is the professional shape: a pure function turns one object into one string, a loop scales it, a single render publishes it. You have just built a tiny view engine — the seed of every real app.",
                fa: "این همان شکلِ حرفه‌ای است: یک تابعِ خالص یک شیء را به یک رشته تبدیل می‌کند، حلقه آن را مقیاس می‌دهد و یک رندر منتشرش می‌کند. همین الان یک موتورِ نمایشِ کوچک ساختی — دانه‌ی هر اپ واقعی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The roster, assembled", fa: "فهرست، سرهم‌شده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Team roster</title>
  </head>
  <body>
    <h1>Team roster 🧑‍💻</h1>
    <p id="roster">?</p>
    <p id="size">?</p>

    <script>
      const team = [
        { name: "Sara", role: "designer" },
        { name: "Aria", role: "developer" },
        { name: "Nima", role: "security" },
      ];

      // one member → one string (pure: return, no render)
      function describe(member) {
        return \`\${member.name} (\${member.role})\`;
      }

      // scale it: glue every member's string into the roster
      let roster = "";
      for (let i = 0; i < team.length; i++) {
        roster = roster + describe(team[i]) + " | ";
      }

      // publish once
      document.querySelector("#roster").textContent = roster;
      document.querySelector("#size").textContent = team.length; // 3
    </script>
  </body>
</html>`,
                caption: {
                  en: "Five modules in nine lines of script — the whole first half, working together.",
                  fa: "پنج ماژول در نه خطِ اسکریپت — کلِ نیمه‌ی اول، با هم کار می‌کنند.",
                },
              },
              {
                type: "warn",
                en: "describe RETURNS a string — it does not render. The loop glues the returned strings together; the LAST line renders once. If describe tried to render itself, every call would overwrite the same box.",
                fa: "describe رشته «برمی‌گرداند» — رندر نمی‌کند. حلقه رشته‌های برگشتی را به هم می‌چسباند؛ «آخرین» خط یک‌بار رندر می‌کند. اگر describe خودش رندر می‌کرد، هر صدا همان جعبه را از نو بازنویسی می‌کرد.",
              },
              {
                type: "tip",
                en: "After passing, add yourself as a fourth member — or teach describe to include a level. The structure will not flinch: one more object, one more lap, zero rewrites.",
                fa: "بعد از قبولی، خودت را به‌عنوان عضوِ چهارم اضافه کن — یا به describe یاد بده سطح را هم بگوید. ساختار حتی تکان نمی‌خورد: یک شیءِ بیشتر، یک دورِ بیشتر، بدون هیچ بازنویسی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "describe(member) should ___ the string.", fa: "describe(member) باید رشته را ___ کند." },
                options: [
                  { en: "return", fa: "برگرداند (return)" },
                  { en: "render into #roster", fa: "داخل #roster رندر کند" },
                  { en: "console.log", fa: "با console.log چاپ کند" },
                ],
                answer: 0,
                explain: {
                  en: "Pure machine: return. The caller glues and renders — the split you learned in module 5.",
                  fa: "ماشینِ خالص: return. صدا زننده می‌چسباند و رندر می‌کند — همان تفکیکِ ماژول ۵.",
                },
              },
              {
                q: { en: "Who fills #roster?", fa: "#roster را چه کسی پر می‌کند؟" },
                options: [
                  { en: "describe, on every call", fa: "describe، در هر صدا" },
                  { en: "The loop, lap by lap", fa: "حلقه، دور به دور" },
                  { en: "The final render line — once", fa: "خطِ رندرِ آخر — یک‌بار" },
                ],
                answer: 2,
                explain: {
                  en: "Collect during the loop, render once at the end — the loop-output habit from module 4.",
                  fa: "موقعِ حلقه جمع کن، در انتها یک‌بار رندر کن — همان عادتِ خروجیِ حلقه از ماژول ۴.",
                },
              },
              {
                q: { en: "team.length for 3 members → #size shows:", fa: "team.length برای ۳ عضو → #size نشان می‌دهد:" },
                options: [
                  { en: "2", fa: "۲" },
                  { en: "3", fa: "۳" },
                  { en: "\"three\"", fa: "\"three\"" },
                ],
                answer: 1,
                explain: {
                  en: "length counts the elements: three members, 3.",
                  fa: "length عناصر را می‌شمارد: سه عضو، یعنی ۳.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Team Roster", fa: "فهرستِ تیم" },
            brief: {
              en: "The team array is given in the starter. Define describe(member) that RETURNS `${member.name} (${member.role})` — then loop: each lap, glue describe(team[i]) + \" | \" onto the roster. Render the roster into #roster and team.length into #size. Expected: Sara (designer) | Aria (developer) | Nima (security) — and 3.",
              fa: "آرایه‌ی team در starter داده شده. describe(member) را تعریف کن که `${member.name} (${member.role})` را «برگرداند» — بعد حلقه بزن: در هر دور، describe(team[i]) + \" | \" را به فهرست بچسبان. فهرست را در #roster و team.length را در #size رندر کن. انتظار: Sara (designer) | Aria (developer) | Nima (security) — و 3.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Team roster</title>
  </head>
  <body>
    <h1>Team roster 🧑‍💻</h1>
    <p id="roster">?</p>
    <p id="size">?</p>

    <script>
      // Given: the team data
      const team = [
        { name: "Sara", role: "designer" },
        { name: "Aria", role: "developer" },
        { name: "Nima", role: "security" },
      ];

      // 1) Define describe(member) — RETURN the template literal:
      //    \`\${member.name} (\${member.role})\`
      // 2) let roster = "";  then loop:
      //    roster = roster + describe(team[i]) + " | ";
      // 3) Render roster into #roster and team.length into #size

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Team roster</title>
  </head>
  <body>
    <h1>Team roster 🧑‍💻</h1>
    <p id="roster">?</p>
    <p id="size">?</p>

    <script>
      // Given: the team data
      const team = [
        { name: "Sara", role: "designer" },
        { name: "Aria", role: "developer" },
        { name: "Nima", role: "security" },
      ];

      // 1) One member → one string (pure machine: return, no render)
      function describe(member) {
        return \`\${member.name} (\${member.role})\`;
      }

      // 2) Scale it: glue every member's string into the roster
      let roster = "";
      for (let i = 0; i < team.length; i++) {
        roster = roster + describe(team[i]) + " | ";
      }

      // 3) Render once, at the end
      document.querySelector("#roster").textContent = roster;
      document.querySelector("#size").textContent = team.length; // 3
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The function: function describe(member) { return `${member.name} (${member.role})`; } — backticks!",
                fa: "تابع: function describe(member) { return `${member.name} (${member.role})`; } — با بک‌تیک!",
              },
              {
                en: "Loop body: roster = roster + describe(team[i]) + \" | \";",
                fa: "بدنه‌ی حلقه: roster = roster + describe(team[i]) + \" | \";",
              },
              {
                en: "Expected: #roster shows Sara (designer) | Aria (developer) | Nima (security) — #size shows 3.",
                fa: "انتظار: #roster نشان بدهد Sara (designer) | Aria (developer) | Nima (security) — #size نشان بدهد 3.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#roster", text: "Sara (designer)" },
                { selector: "#roster", text: "Nima (security)" },
                { selector: "#size", text: "3" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // __JS_A_APPEND__
];
