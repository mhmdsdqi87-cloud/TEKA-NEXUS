// TEKA Academy — "JavaScript: Make the Page Come Alive" (js-basics) — HALF B.
// Modules m8–m19 (49 lessons). Pure content data, rendered generically by the
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
//   • Event-driven challenges follow the state → render() → listen pattern:
//     the script paints its starting state synchronously (what the grader
//     checks), then attaches listeners so the learner can play in the preview.
//     Handler logic is test-fired once with a fake event where a result must
//     be visible to the grader.
//   • Theory: lang "js" blocks are static highlighted code (no runnable flag);
//     live behavior is demoed with lang "html" blocks (<script> + output div).
// Solutions pass every check; starters fail at least one (the script is empty).

import type { Module } from "./types";

export const jsModulesB: Module[] = [
  // ─── Module 8 ────────────────────────────────────────────
  {
    id: "js-m8",
    title: { en: "DOM Selectors", fa: "انتخاب‌گرهای DOM" },
    blurb: {
      en: "Select like a pro: grab every match at once with querySelectorAll, choose between text and HTML, and paint elements with the style property.",
      fa: "حرفه‌ای انتخاب کن: با querySelectorAll همه‌ی matches را یک‌جا بگیر، بین text و HTML انتخاب کن و عناصر را با خاصیت style رنگ‌آمیزی کن.",
    },
    lessons: [
      {
        id: "js-m8-l1",
        title: { en: "querySelectorAll — Grab Them All", fa: "querySelectorAll — همه را یک‌جا بگیر" },
        goal: {
          en: "Select many elements at once with querySelectorAll and update all of them with one loop.",
          fa: "با querySelectorAll چند عنصر را هم‌زمان انتخاب کنی و با یک حلقه همه را با هم عوض کنی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "One match vs every match", fa: "یک match در برابر همه‌ی matchها" },
            blocks: [
              {
                type: "text",
                en: "`querySelector` has a quiet limitation: it returns only the FIRST match and ignores the rest. Its big sibling `querySelectorAll` returns EVERY element that fits the selector, gathered into a NodeList — an array-like list you can loop over. Same CSS selector language, same `#id` and `.class` prefixes, wildly different reach.",
                fa: "`querySelector` یک محدودیتِ ساکت دارد: فقط اولین match را برمی‌گرداند و بقیه را نادیده می‌گیرد. برادر بزرگش `querySelectorAll` همه‌ی عنصرهایی که با سلکتور جور درمی‌آیند را برمی‌گرداند، داخل یک NodeList — فهرستی شبیه آرایه که می‌توانی رویش حلقه بزنی. همان زبانِ سلکتورهای CSS، همان پیشوندهای `#id` و `.class`، اما با بردی کاملاً متفاوت.",
              },
              {
                type: "code",
                lang: "js",
                code: `// ONE element (the first match, or null):
const hero = document.querySelector(".card");

// EVERY element (a NodeList — never null, maybe empty):
const cards = document.querySelectorAll(".card");

console.log(cards.length); // how many did we find?`,
              },
              {
                type: "tip",
                en: "querySelector can come back empty-handed and hand you `null` — then .textContent on it crashes. querySelectorAll never lies like that: no matches simply means an empty list with length 0.",
                fa: "querySelector ممکن است دست‌خالی برگردد و `null` بدهد — و .textContent روی null کرش می‌کند. اما querySelectorAll هرگز این‌طور گولت نمی‌زند: بدون match یعنی یک فهرستِ خالی با length صفر.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "One loop, many elements", fa: "یک حلقه، خیلی عنصر" },
            blocks: [
              {
                type: "text",
                en: "A NodeList plays by array rules where it matters: it has `.length` and you can walk it with `for...of`. That unlocks the classic bulk-update move — find every matching element and give each one the same treatment in a single loop.",
                fa: "NodeList جایی که مهم است، قوانینِ آرایه را رعایت می‌کند: `.length` دارد و می‌توانی با `for...of` رویش قدم بزنی. این همان حرکتِ کلاسیکِ به‌روزرسانیِ گروهی را آزاد می‌کند — همه‌ی عنصرهای matching را پیدا کن و در یک حلقه به هرکدام همان یک رفتار را بده.",
              },
              {
                type: "code",
                lang: "js",
                code: `const items = document.querySelectorAll(".item");

for (const item of items) {
  item.textContent = "✅ Updated by the loop";
}`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Bulk update</title>
  </head>
  <body>
    <h1>Chores 🧹</h1>
    <ul>
      <li class="item">dishes</li>
      <li class="item">laundry</li>
      <li class="item">homework</li>
    </ul>

    <script>
      const items = document.querySelectorAll(".item");
      for (const item of items) {
        item.textContent = "✅ " + item.textContent;
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — every .item got the ✅ prefix, in one loop pass.",
                  fa: "پیش‌نمایش را بزن — همه‌ی .itemها پیشوندِ ✅ گرفتند، در یک گذرِ حلقه.",
                },
              },
              {
                type: "warn",
                en: "A NodeList is array-LIKE: .length and for...of work, but some array methods (like .map) do not exist on it. If you ever truly need array superpowers, wrap it: Array.from(nodeList).",
                fa: "NodeList «شبیه آرایه» است: .length و for...of کار می‌کنند، اما بعضی از متدهای آرایه (مثل .map) رویش وجود ندارند. اگر یک بار واقعاً به قدرت‌های آرایه نیاز داشتی، بپیچانش: Array.from(nodeList).",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does querySelectorAll(\".card\") return when 4 cards exist?", fa: "اگر ۴ کارت وجود داشته باشد، querySelectorAll(\".card\") چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "Only the first card", fa: "فقط اولین کارت" },
                  { en: "A NodeList of all 4 cards", fa: "یک NodeList از هر ۴ کارت" },
                  { en: "The text of all cards glued together", fa: "متنِ همه‌ی کارت‌ها چسبانده به هم" },
                ],
                answer: 1,
                explain: {
                  en: "querySelectorAll gathers every match into one NodeList — that is its whole job.",
                  fa: "querySelectorAll همه‌ی matchها را در یک NodeList جمع می‌کند — کلِ کارش همین است.",
                },
              },
              {
                q: { en: "How many matches does querySelectorAll return when NOTHING fits the selector?", fa: "وقتی هیچ عنصری با سلکتور جور نمی‌شود، querySelectorAll چند match برمی‌گرداند؟" },
                options: [
                  { en: "null", fa: "null" },
                  { en: "An empty list (length 0)", fa: "یک فهرست خالی (length صفر)" },
                  { en: "It throws an error", fa: "خطا می‌دهد" },
                ],
                answer: 1,
                explain: {
                  en: "It always hands back a NodeList — zero matches means an empty one, so .length is 0 and the loop simply runs zero times.",
                  fa: "همیشه یک NodeList تحویل می‌دهد — صفر match یعنی NodeList خالی، پس .length صفر است و حلقه هم صفر بار می‌چرخد.",
                },
              },
              {
                q: { en: "Which loop correctly updates every element in the NodeList `cards`?", fa: "کدام حلقه همه‌ی عنصرهای NodeList به نام cards را درست به‌روز می‌کند؟" },
                options: [
                  { en: "for (const c of cards) { c.textContent = \"Hi\"; }", fa: "for (const c of cards) { c.textContent = \"Hi\"; }" },
                  { en: "cards.textContent = \"Hi\";", fa: "cards.textContent = \"Hi\";" },
                  { en: "querySelector(\".card\").textContent = \"Hi\";", fa: "querySelector(\".card\").textContent = \"Hi\";" },
                ],
                answer: 0,
                explain: {
                  en: "You cannot set textContent on a whole list — you visit each element in a loop and update it one by one.",
                  fa: "نمی‌توان روی یک فهرستِ کامل textContent گذاشت — باید در حلقه تک‌تک عناصر را ببینی و یکی‌یکی عوض کنی.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Status sweep", fa: "جاروی وضعیت" },
            brief: {
              en: "The page shows 4 tasks, each a <p class=\"task\"> still reading \"pending...\". Select ALL of them with querySelectorAll, loop, and set every task's textContent to exactly: Done ✅ — then render the summary into #total: it must show exactly: Total: 4",
              fa: "صفحه ۴ کارت نشان می‌دهد، هرکدام یک <p class=\"task\"> که هنوز می‌گوید \"pending...\". همه را با querySelectorAll بگیر، حلقه بزن و textContent‌ی هر کارت را دقیقاً بگذار: Done ✅ — بعد خلاصه را در #total رندر کن: باید دقیقاً نشان بدهد: Total: 4",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Status sweep</title>
  </head>
  <body>
    <h1>Mission control 🛰️</h1>
    <p class="task">pending...</p>
    <p class="task">pending...</p>
    <p class="task">pending...</p>
    <p class="task">pending...</p>
    <p id="total">?</p>

    <script>
      // 1) Grab ALL .task elements with querySelectorAll
      // 2) Loop over them and set each textContent to: Done ✅
      // 3) Render "Total: 4" into #total (use .length!)
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Status sweep</title>
  </head>
  <body>
    <h1>Mission control 🛰️</h1>
    <p class="task">pending...</p>
    <p class="task">pending...</p>
    <p class="task">pending...</p>
    <p class="task">pending...</p>
    <p id="total">?</p>

    <script>
      // 1) All tasks in one NodeList
      const tasks = document.querySelectorAll(".task");

      // 2) One loop, every task updated
      for (const task of tasks) {
        task.textContent = "Done ✅";
      }

      // 3) The summary — length knows the answer
      document.querySelector("#total").textContent = "Total: " + tasks.length;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Two moves: querySelectorAll for the collection, for...of to visit each element.",
                fa: "دو حرکت: querySelectorAll برای مجموعه، for...of برای دیدنِ تک‌تک عناصر.",
              },
              {
                en: "The summary writes itself: \"Total: \" + tasks.length — length counts them for you.",
                fa: "خلاصه خودش نوشته می‌شود: \"Total: \" + tasks.length — length خودش می‌شمارد.",
              },
              {
                en: "Each task must read exactly: Done ✅ — capital D, space, emoji.",
                fa: "هر کارت باید دقیقاً این باشد: Done ✅ — D بزرگ، فاصله، ایموجی.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".task", text: "Done ✅" },
                { selector: "#total", text: "Total: 4" },
                { selector: ".task", count: 4 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m8-l2",
        title: { en: "textContent vs innerHTML", fa: "textContent در برابر innerHTML" },
        goal: {
          en: "Choose deliberately between plain text (textContent) and parsed HTML (innerHTML) — and know which one is safe for user input.",
          fa: "آگاهانه بین متنِ ساده (textContent) و HTML تفسیرشده (innerHTML) انتخاب کنی — و بدانی کدام برای ورودیِ کاربر امن است.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Two ways to fill a box", fa: "دو راه برای پر کردنِ یک جعبه" },
            blocks: [
              {
                type: "text",
                en: "`textContent` and `innerHTML` both fill an element — but they speak different dialects. `textContent` treats everything as PLAIN TEXT: tags you write appear on screen as literal characters. `innerHTML` treats your string as HTML: the browser PARSES it, so tags become real elements inside the page.",
                fa: "`textContent` و `innerHTML` هر دو عنصری را پر می‌کنند — اما به دو لهجه‌ی متفاوت حرف می‌زنند. `textContent` همه‌چیز را «متن ساده» می‌بیند: تگ‌هایی که می‌نویسی، به‌شکل کاراکترهای عیناً روی صفحه ظاهر می‌شوند. اما `innerHTML` رشته‌ات را HTML می‌داند: مرورگر آن را PARSE می‌کند، پس تگ‌ها به عنصرهای واقعی داخل صفحه تبدیل می‌شوند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const plain = document.querySelector("#plain");
const rich = document.querySelector("#rich");

// Plain text: the tags will be VISIBLE as text
plain.textContent = "<strong>Hi</strong>";

// HTML: the browser builds a real <strong> element
rich.innerHTML = "<strong>Hi</strong>";`,
              },
              {
                type: "tip",
                en: "Rule of thumb: textContent for words, innerHTML for structure. If you need bold, line breaks or icons inside your output, innerHTML is the tool.",
                fa: "قانون سرانگشتی: textContent برای کلمه‌ها، innerHTML برای ساختار. اگر داخل خروجی‌ات بولد یا خط جدید یا آیکون لازم داری، ابزارت innerHTML است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The safety rule", fa: "قانونِ ایمنی" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Text vs HTML</title>
  </head>
  <body>
    <h1>Same string, two translators 📺</h1>
    <p id="plain">...</p>
    <p id="rich">...</p>

    <script>
      const raw = "<strong>TEKA</strong>";
      document.querySelector("#plain").textContent = raw; // shows the tags
      document.querySelector("#rich").innerHTML = raw;    // builds the tags
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one line shows literal tags, the other renders real bold text.",
                  fa: "پیش‌نمایش را بزن — یک خط تگ‌ها را عیناً نشان می‌دهد، خطِ دیگر بولدِ واقعی رندر می‌کند.",
                },
              },
              {
                type: "warn",
                en: "NEVER pass user-typed text through innerHTML — a visitor could type HTML (or worse) and inject it into your page. Anything a user typed goes through textContent. innerHTML is only for HTML YOU wrote yourself.",
                fa: "هرگز متنی که کاربر تایپ کرده را از innerHTML رد نکن — یک بازدیدکننده می‌تواند HTML تایپ کند (یا بدتر) و به صفحه‌ات تزریقش کند. هرچه کاربر تایپ کرده از textContent می‌رود. innerHTML فقط برای HTMLی است که خودت نوشته‌ای.",
              },
              {
                type: "text",
                en: "This is the same `#` and class selector language you already know — innerHTML just changes what lands INSIDE the element. You can even chain it with querySelectorAll: loop over a list and give each element its own HTML.",
                fa: "این همان زبانِ سلکتورهای `#` و کلاس است که می‌شناسی — innerHTML فقط عوض می‌کند چه چیزی داخلِ عنصر می‌نشیند. حتی می‌توانی با querySelectorAll ترکیبش کنی: روی فهرست حلقه بزن و به هر عنصر HTMLِ خودش را بده.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "You set textContent to \"<b>Wow</b>\". What does the visitor see?", fa: "اگر textContent را بگذاری \"<b>Wow</b>\"، بازدیدکننده چه می‌بیند؟" },
                options: [
                  { en: "Bold text: Wow", fa: "متن بولد: Wow" },
                  { en: "The literal characters <b>Wow</b>", fa: "کاراکترهای عیناً <b>Wow</b>" },
                  { en: "Nothing — the tags vanish", fa: "هیچی — تگ‌ها ناپدید می‌شوند" },
                ],
                answer: 1,
                explain: {
                  en: "textContent is plain text — tags are just characters, shown exactly as typed.",
                  fa: "textContent متنِ ساده است — تگ‌ها فقط کاراکترند و دقیقاً همان‌طور که تایپ شده‌اند نشان داده می‌شوند.",
                },
              },
              {
                q: { en: "Which property turns a string into REAL elements inside the page?", fa: "کدام خاصیت یک رشته را به عنصرهای واقعی داخل صفحه تبدیل می‌کند؟" },
                options: [
                  { en: "textContent", fa: "textContent" },
                  { en: "innerHTML", fa: "innerHTML" },
                  { en: "querySelector", fa: "querySelector" },
                ],
                answer: 1,
                explain: {
                  en: "innerHTML is parsed as HTML, so <strong> becomes a real strong element in the DOM.",
                  fa: "innerHTML به‌عنوان HTML تفسیر می‌شود، پس <strong> به یک عنصر strong واقعی در DOM تبدیل می‌شود.",
                },
              },
              {
                q: { en: "A user typed a comment into an input. How do you put it on the page?", fa: "کاربر یک کامنت در input تایپ کرده. چطور آن را روی صفحه بگذاری؟" },
                options: [
                  { en: "innerHTML — it preserves everything", fa: "innerHTML — همه‌چیز را حفظ می‌کند" },
                  { en: "textContent — user input must never be parsed as HTML", fa: "textContent — ورودیِ کاربر هرگز نباید HTML تفسیر شود" },
                  { en: "console.log — that is the safest", fa: "console.log — این امن‌ترین است" },
                ],
                answer: 1,
                explain: {
                  en: "User input through innerHTML lets visitors inject markup into your page — textContent keeps their words as plain, harmless text.",
                  fa: "ورودیِ کاربر از راه innerHTML اجازه می‌دهد بازدیدکننده‌ها markup به صفحه‌ات تزریق کنند — textContent حرف‌هایشان را متنِ ساده و بی‌خطر نگه می‌دارد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Badge builder", fa: "سازنده‌ی نشان" },
            brief: {
              en: "The page has #out containing two paragraphs: #plain and #rich. Put the exact string <strong>TEKA</strong> into #plain using textContent (it will show as literal characters), and put <strong>TEKA</strong> is live! into #rich using innerHTML (a real bold element will appear).",
              fa: "صفحه #out دارد که دو پاراگراف داخلش است: #plain و #rich. رشته‌ی دقیقِ <strong>TEKA</strong> را با textContent در #plain بگذار (به‌شکل کاراکترهای عیناً دیده می‌شود) و <strong>TEKA</strong> is live! را با innerHTML در #rich بگذار (یک عنصر بولدِ واقعی ظاهر می‌شود).",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Badge builder</title>
  </head>
  <body>
    <h1>Badge factory 🏭</h1>
    <div id="out">
      <p id="plain">...</p>
      <p id="rich">...</p>
    </div>

    <script>
      // 1) #plain ← textContent = <strong>TEKA</strong>   (literal!)
      // 2) #rich  ← innerHTML  = <strong>TEKA</strong> is live!
      // Which property for which box? 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Badge builder</title>
  </head>
  <body>
    <h1>Badge factory 🏭</h1>
    <div id="out">
      <p id="plain">...</p>
      <p id="rich">...</p>
    </div>

    <script>
      // 1) Plain text: the tags stay visible characters
      document.querySelector("#plain").textContent = "<strong>TEKA</strong>";

      // 2) HTML: the tags become a real bold element
      document.querySelector("#rich").innerHTML = "<strong>TEKA</strong> is live!";
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Line 1 uses textContent, line 2 uses innerHTML — that IS the whole lesson.",
                fa: "خطِ اول از textContent استفاده می‌کند، خطِ دوم از innerHTML — کلِ درس همین است.",
              },
              {
                en: "For #rich, the string is: <strong>TEKA</strong> is live! — don't forget the trailing words.",
                fa: "برای #rich رشته این است: <strong>TEKA</strong> is live! — کلمه‌های آخر را جا نینداز.",
              },
              {
                en: "After it passes, press Preview: #plain shows tags as text, #rich shows real bold.",
                fa: "بعد از قبول شدن، پیش‌نمایش را بزن: #plain تگ‌ها را به‌شکل متن نشان می‌دهد، #rich بولدِ واقعی را.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#plain", text: "<strong>TEKA</strong>" },
                { selector: "#rich strong", count: 1 },
                { selector: "#rich", text: "is live!" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m8-l3",
        title: { en: "Painting with .style", fa: "نقاشی با .style" },
        goal: {
          en: "Change an element's look from JavaScript using the style property — and translate CSS names into JS camelCase.",
          fa: "ظاهرِ عنصر را از جاوااسکریپت با خاصیت style عوض کنی — و نام‌های CSS را به camelCase جاوااسکریپت ترجمه کنی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "A direct line to inline CSS", fa: "یک خط مستقیم به CSSِ درون‌خطی" },
            blocks: [
              {
                type: "text",
                en: "Every element carries a `.style` object — JavaScript's private paintbrush. Assign to it and the element instantly grows an inline `style=\"...\"` attribute, the strongest normal layer of CSS. One catch: CSS writes `font-size` with a dash, JavaScript writes `fontSize` in camelCase. The dash is illegal in a variable name, so the letter after it gets capitalized instead.",
                fa: "هر عنصری یک شیء `.style` دارد — قلم‌موی مخصوصِ جاوااسکریپت. بهش مقدار بده و عنصر همان لحظه یک اتریبیوتِ درون‌خطیِ `style=\"...\"` می‌گیرد؛ قوی‌ترین لایه‌ی عادی CSS. یک نکته: CSS می‌نویسد `font-size` با خط تیره، جاوااسکریپت می‌نویسد `fontSize` به‌صورت camelCase. خط تیره در نام متغیر غیرمجاز است، پس حرفِ بعدش بزرگ می‌شود.",
              },
              {
                type: "code",
                lang: "js",
                code: `const box = document.querySelector("#box");

box.style.color = "crimson";        // CSS: color: crimson
box.style.backgroundColor = "gold"; // CSS: background-color: gold
box.style.fontSize = "32px";        // CSS: font-size: 32px`,
              },
              {
                type: "tip",
                en: "Size-style values need UNITS: fontSize = \"32px\" works, fontSize = \"32\" does nothing. When a style change 'silently fails', the missing \"px\" is the usual suspect.",
                fa: "مقدارهای سایز به «واحد» نیاز دارند: fontSize = \"32px\" کار می‌کند، fontSize = \"32\" هیچ کاری نمی‌کند. وقتی تغییر استایل «بی‌صدا شکست خورد»، مظنونِ همیشگی همان \"px\" جاافتاده است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Painting many at once", fa: "نقاشیِ گروهی" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Style painter</title>
  </head>
  <body>
    <h1 id="sign">OPEN 🌟</h1>
    <span class="lamp">●</span>
    <span class="lamp">●</span>
    <span class="lamp">●</span>

    <script>
      const sign = document.querySelector("#sign");
      sign.style.color = "crimson";
      sign.style.fontSize = "40px";

      // Combine with querySelectorAll: paint every lamp
      const lamps = document.querySelectorAll(".lamp");
      for (const lamp of lamps) {
        lamp.style.backgroundColor = "gold";
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one element styled directly, three more painted by a loop.",
                  fa: "پیش‌نمایش را بزن — یک عنصر مستقیم استایل گرفت، سه عنصر دیگر با حلقه رنگ شدند.",
                },
              },
              {
                type: "warn",
                en: ".style writes INLINE style (the style=\"...\" attribute). It overrides your stylesheet — handy for JS-driven changes, but don't paint whole layouts this way; big looks still belong in CSS classes (coming up in the DOM Building module).",
                fa: ".style استایلِ درون‌خطی می‌نویسد (اتریبیوت style=\"...\"). از استایل‌شیتِ شما قوی‌تر است — برای تغییرهای رانده‌شده از JS عالی است، اما کلِ لی‌اوت را این‌طور نقاشی نکن؛ ظاهرهای بزرگ هنوز کارِ کلاس‌های CSS است (در ماژول ساختِ DOM می‌آید).",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How does JavaScript write the CSS property `background-color`?", fa: "جاوااسکریپت خاصیت background-color را چطور می‌نویسد؟" },
                options: [
                  { en: "background-color", fa: "background-color" },
                  { en: "backgroundColor", fa: "backgroundColor" },
                  { en: "Background_Color", fa: "Background_Color" },
                ],
                answer: 1,
                explain: {
                  en: "The dash disappears and the next letter is capitalized: camelCase. background-color → backgroundColor.",
                  fa: "خط تیره حذف می‌شود و حرفِ بعدی بزرگ می‌شود: camelCase. background-color ← backgroundColor.",
                },
              },
              {
                q: { en: "What does box.style.fontSize = \"32px\" actually write into the HTML?", fa: "box.style.fontSize = \"32px\" دقیقاً چه چیزی در HTML می‌نویسد؟" },
                options: [
                  { en: "An inline style attribute on the element", fa: "یک اتریبیوت style درون‌خطی روی عنصر" },
                  { en: "A new <style> tag in the head", fa: "یک تگ style جدید در head" },
                  { en: "A CSS file next to the page", fa: "یک فایل CSS کنار صفحه" },
                ],
                answer: 0,
                explain: {
                  en: ".style edits the element's own style=\"...\" attribute — the strongest normal CSS layer.",
                  fa: ".style اتریبیوتِ style=\"...\" خودِ عنصر را ویرایش می‌کند — قوی‌ترین لایه‌ی عادی CSS.",
                },
              },
              {
                q: { en: "Which line makes the text bigger?", fa: "کدام خط متن را بزرگ‌تر می‌کند؟" },
                options: [
                  { en: "el.style.fontSize = \"24\";", fa: "el.style.fontSize = \"24\";" },
                  { en: "el.style.font-size = \"24px\";", fa: "el.style.font-size = \"24px\";" },
                  { en: "el.style.fontSize = \"24px\";", fa: "el.style.fontSize = \"24px\";" },
                ],
                answer: 2,
                explain: {
                  en: "camelCase name, AND a unit on the value. The first line lacks \"px\", the second uses an illegal dash.",
                  fa: "نام به camelCase، و همUnits روی مقدار. خطِ اول \"px\" ندارد و خطِ دوم خط تیره‌ی غیرمجاز دارد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Neon sign", fa: "تابلوی نئون" },
            brief: {
              en: "Build the night sign: set #sign's style.color to aqua and style.fontSize to 40px, then loop over the three .lamp spans and give each one style.backgroundColor of gold. The CSS-looking attribute is written by your JavaScript — no stylesheet edits.",
              fa: "تابلوی شب را بساز: style.color‌ی #sign را بگذار aqua و style.fontSize‌اش را 40px، بعد روی سه spanی .lamp حلقه بزن و به هرکدام style.backgroundColor بده gold. اتریبیوتِ شبیه CSS را جاوااسکریپتِ تو می‌نویسد — بدون دست‌زدن به استایل‌شیت.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Neon sign</title>
  </head>
  <body>
    <h1 id="sign">TEKA NIGHT</h1>
    <span class="lamp">●</span>
    <span class="lamp">●</span>
    <span class="lamp">●</span>

    <script>
      // 1) #sign: style.color = "aqua" and style.fontSize = "40px"
      // 2) Every .lamp: style.backgroundColor = "gold" (loop them!)
      // Paint below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Neon sign</title>
  </head>
  <body>
    <h1 id="sign">TEKA NIGHT</h1>
    <span class="lamp">●</span>
    <span class="lamp">●</span>
    <span class="lamp">●</span>

    <script>
      // The headline
      const sign = document.querySelector("#sign");
      sign.style.color = "aqua";
      sign.style.fontSize = "40px";

      // The lamps — one loop, three painted dots
      const lamps = document.querySelectorAll(".lamp");
      for (const lamp of lamps) {
        lamp.style.backgroundColor = "gold";
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "camelCase in JS: backgroundColor, fontSize — with quotes around values and px on sizes.",
                fa: "در JS به camelCase: backgroundColor، fontSize — مقدارها در گیومه و px روی سایزها.",
              },
              {
                en: "The lamps are a NodeList — same querySelectorAll + for...of sweep as before, just painting instead of writing.",
                fa: "لامپ‌ها یک NodeList هستند — همان جاروی querySelectorAll + for...ofِ قبلی، فقط به‌جای نوشتن، نقاشی می‌کند.",
              },
              {
                en: "Check the preview: the h1 must be aqua and 40px, all three dots gold.",
                fa: "پیش‌نمایش را چک کن: h1 باید آکوا و 40px باشد و هر سه نقطه طلایی.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#sign", styleIncludes: "color: aqua" },
                { selector: "#sign", styleIncludes: "font-size: 40px" },
                { selector: ".lamp", styleIncludes: "background-color: gold" },
                { selector: ".lamp", count: 3 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m8-l4",
        title: { en: "Mini-project: Profile Card", fa: "مینی‌پروژه: کارت پروفایل" },
        goal: {
          en: "Combine every selector tool — querySelector, querySelectorAll, textContent, innerHTML and style — to fill a profile card from one data object.",
          fa: "همه‌ی ابزارهای انتخاب‌گر را ترکیب کنی — querySelector، querySelectorAll، textContent، innerHTML و style — تا یک کارت پروفایل را از یک شیء داده پر کنی.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "The pipeline: data → DOM", fa: "خطِ لوله: داده → DOM" },
            blocks: [
              {
                type: "text",
                en: "Real pages are fill-in-the-blanks machines: a JavaScript object holds the DATA, the HTML holds the SLOTS, and your script shuttles the first into the second. The professional order is always: 1) define the data, 2) select the slots, 3) write. Data first — you cannot render what does not exist yet.",
                fa: "صفحه‌های واقعی ماشینِ «جای خالی‌ها را پر کن» هستند: یک شیء جاوااسکریپت داده را نگه می‌دارد، HTML جاهای خالی را، و اسکریپتِ تو اولی را در دومی می‌ریزد. ترتیبِ حرفه‌ای همیشه این است: ۱) داده را تعریف کن، ۲) جاهای خالی را انتخاب کن، ۳) بنویس. اول داده — چیزی که هنوز وجود ندارد را نمی‌شود رندر کرد.",
              },
              {
                type: "code",
                lang: "js",
                code: `// 1) The data
const dev = {
  name: "Sara",
  role: "Frontend Dev",
  skills: ["HTML", "CSS", "JS"],
};

// 2) + 3) select slots, write data in
document.querySelector("#name").textContent = dev.name;
document.querySelector("#role").textContent = dev.role;`,
              },
              {
                type: "tip",
                en: "Mixed outputs need mixed tools: textContent for plain fields, innerHTML when a slot needs real tags, .style when one slot needs a one-off color. One card, three tools — that is normal.",
                fa: "خروجی‌های ترکیبی ابزارهای ترکیبی می‌خواهند: textContent برای فیلدهای ساده، innerHTML وقتی جای خالی به تگ واقعی نیاز دارد، .style وقتی یک جای خالی به یک رنگِ خاص نیاز دارد. یک کارت، سه ابزار — این کاملاً normal است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Arrays into slots", fa: "آرایه‌ها داخل جاهای خالی" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Card filler</title>
  </head>
  <body>
    <div id="card">
      <h2 id="name">...</h2>
      <p id="role">...</p>
      <p><span class="skill">?</span> <span class="skill">?</span> <span class="skill">?</span></p>
      <p id="status">...</p>
    </div>

    <script>
      const dev = {
        name: "Sara",
        role: "Frontend Dev",
        skills: ["HTML", "CSS", "JS"],
      };

      document.querySelector("#name").textContent = dev.name;
      document.querySelector("#role").textContent = dev.role;

      const slots = document.querySelectorAll(".skill");
      for (let i = 0; i < slots.length; i++) {
        slots[i].textContent = dev.skills[i];
      }

      const status = document.querySelector("#status");
      status.textContent = "● Online";
      status.style.color = "green";
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — name, role, three skills in order, and a green status dot, all from one object.",
                  fa: "پیش‌نمایش را بزن — نام، نقش، سه مهارت به‌ترتیب و یک نقطه‌ی وضعیتِ سبز، همه از یک شیء.",
                },
              },
              {
                type: "text",
                en: "Notice the index loop here: `for (let i = 0; ...)`. The i-th slot receives the i-th skill — position matters when you are filling an ordered list of slots. When order does not matter, plain `for...of` stays simpler.",
                fa: "به حلقه‌ی اندیسی اینجا دقت کن: `for (let i = 0; ...)`. slotِ iاُم، مهارتِ iاُم را می‌گیرد — وقتی جای خالی‌ها ترتیب‌دارند، موقعیت مهم است. وقتی ترتیب مهم نیست، همان `for...of` ساده‌تر است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is the professional order for filling a card?", fa: "ترتیبِ حرفه‌ای برای پر کردنِ یک کارت چیست؟" },
                options: [
                  { en: "Select slots, define data, write", fa: "جاهای خالی را انتخاب کن، داده را تعریف کن، بنویس" },
                  { en: "Define data, select slots, write", fa: "داده را تعریف کن، جاهای خالی را انتخاب کن، بنویس" },
                  { en: "Write, then hope the data appears", fa: "بنویس و امیدوار باش داده ظاهر شود" },
                ],
                answer: 1,
                explain: {
                  en: "Data first: the script can only render values that already exist in variables.",
                  fa: "اول داده: اسکریپت فقط می‌تواند مقدارهایی را رندر کند که از قبل در متغیرها موجودند.",
                },
              },
              {
                q: { en: "Three .skill slots and a 3-item skills array — which loop fills them in ORDER?", fa: "سه slotی .skill و یک آرایه‌ی مهارتِ ۳تایی — کدام حلقه به‌ترتیب پرشان می‌کند؟" },
                options: [
                  { en: "for (let i = 0; i < slots.length; i++) { slots[i].textContent = skills[i]; }", fa: "for (let i = 0; i < slots.length; i++) { slots[i].textContent = skills[i]; }" },
                  { en: "for (const s of slots) { s.textContent = skills; }", fa: "for (const s of slots) { s.textContent = skills; }" },
                  { en: "slots = skills;", fa: "slots = skills;" },
                ],
                answer: 0,
                explain: {
                  en: "The index loop pairs slot[i] with skills[i] — position by position, in order.",
                  fa: "حلقه‌ی اندیسی slot[i] را با skills[i] جفت می‌کند — موقعیت‌به‌موقعیت، به‌ترتیب.",
                },
              },
              {
                q: { en: "The status line must be green. Which two lines do it?", fa: "خطِ وضعیت باید سبز شود. کدام دو خط این کار را می‌کنند؟" },
                options: [
                  { en: "status.textContent = \"● Online\"; status.style.color = \"green\";", fa: "status.textContent = \"● Online\"; status.style.color = \"green\";" },
                  { en: "status.innerHTML = green;", fa: "status.innerHTML = green;" },
                  { en: "style.color(status, \"green\");", fa: "style.color(status, \"green\");" },
                ],
                answer: 0,
                explain: {
                  en: "Text through textContent, color through .style.color — each tool does its one job.",
                  fa: "متن از textContent، رنگ از .style.color — هر ابزار کارِ خودش را می‌کند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Card writer", fa: "نویسنده‌ی کارت" },
            brief: {
              en: "The card skeleton and the data are both on the page: const dev = { name: \"Sara\", role: \"Frontend Dev\", skills: [\"HTML\", \"CSS\", \"JS\"] }. Fill #name and #role with textContent, fill the three .skill spans IN ORDER with the skills array, and make #status show ● Online with style.color of green.",
              fa: "اسکلتِ کارت و داده هر دو روی صفحه‌اند: const dev = { name: \"Sara\", role: \"Frontend Dev\", skills: [\"HTML\", \"CSS\", \"JS\"] }. ‏#name و #role را با textContent پر کن، سه spanی .skill را به‌ترتیب با آرایه‌ی skills پر کن، و #status را بگذار ● Online با style.color برابر green.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Profile card</title>
  </head>
  <body>
    <div id="card">
      <h2 id="name">...</h2>
      <p id="role">...</p>
      <p><span class="skill">?</span> <span class="skill">?</span> <span class="skill">?</span></p>
      <p id="status">...</p>
    </div>

    <script>
      // The data (already defined — do not retype):
      const dev = {
        name: "Sara",
        role: "Frontend Dev",
        skills: ["HTML", "CSS", "JS"],
      };

      // 1) #name ← dev.name,  #role ← dev.role (textContent)
      // 2) Fill the three .skill spans in order (index loop)
      // 3) #status ← "● Online" and style.color = "green"

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Profile card</title>
  </head>
  <body>
    <div id="card">
      <h2 id="name">...</h2>
      <p id="role">...</p>
      <p><span class="skill">?</span> <span class="skill">?</span> <span class="skill">?</span></p>
      <p id="status">...</p>
    </div>

    <script>
      const dev = {
        name: "Sara",
        role: "Frontend Dev",
        skills: ["HTML", "CSS", "JS"],
      };

      // Simple fields
      document.querySelector("#name").textContent = dev.name;
      document.querySelector("#role").textContent = dev.role;

      // Array → ordered slots
      const slots = document.querySelectorAll(".skill");
      for (let i = 0; i < slots.length; i++) {
        slots[i].textContent = dev.skills[i];
      }

      // Status: text + paint
      const status = document.querySelector("#status");
      status.textContent = "● Online";
      status.style.color = "green";
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Two plain fields, one index loop for the array, one style line — four small moves.",
                fa: "دو فیلد ساده، یک حلقه‌ی اندیسی برای آرایه، یک خط استایل — چهار حرکتِ کوچک.",
              },
              {
                en: "In the loop: slots[i].textContent = dev.skills[i]; — same i on both sides.",
                fa: "داخل حلقه: slots[i].textContent = dev.skills[i]; — همان i در هر دو طرف.",
              },
              {
                en: "Expected card: Sara · Frontend Dev · HTML CSS JS · ● Online (green).",
                fa: "کارتِ مورد انتظار: Sara · Frontend Dev · HTML CSS JS · ● Online (سبز).",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#name", text: "Sara" },
                { selector: "#role", text: "Frontend Dev" },
                { selector: ".skill", count: 3 },
                { selector: ".skill", text: "CSS" },
                { selector: "#status", styleIncludes: "color: green" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 9 ────────────────────────────────────────────
  {
    id: "js-m9",
    title: { en: "Events", fa: "رویدادها" },
    blurb: {
      en: "Make the page listen: clicks, typing and key presses — plus the event object that tells you exactly what happened and where.",
      fa: "صفحه را شنوا کن: کلیک، تایپ و کلید — به‌اضافه‌ی شیء رویداد که دقیقاً به تو می‌گوید چه اتفاقی افتاد و کجا.",
    },
    lessons: [
      {
        id: "js-m9-l1",
        title: { en: "addEventListener — The Page Starts Listening", fa: "addEventListener — صفحه شنوا می‌شود" },
        goal: {
          en: "Wire a button to a function with addEventListener, following the pro pattern: state → render → listen.",
          fa: "با addEventListener یک دکمه را به یک تابع سیم‌کشی کنی، با الگوی حرفه‌ای: state ← render ← listen.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Code that waits", fa: "کدی که منتظر می‌ماند" },
            blocks: [
              {
                type: "text",
                en: "Until now your scripts ran top-to-bottom, once, and were done. Events change everything: you can tell the browser \"WHEN this happens, run THAT function\" — and the code waits, ready to fire again and again. `addEventListener` takes two arguments: the event name as a string (`\"click\"`) and the function to run.",
                fa: "تا حالا اسکریپت‌هایت بالا-به-پایین، یک بار اجرا می‌شدند و تمام. رویدادها همه‌چیز را عوض می‌کنند: می‌توانی به مرورگر بگویی «وقتی این اتفاق افتاد، آن تابع را اجرا کن» — و کد منتظر می‌ماند، آماده‌ی شلیکِ دوباره و دوباره. `addEventListener` دو آرگومان می‌گیرد: نامِ رویداد به‌صورت رشته (`\"click\"`) و تابعی که باید اجرا شود.",
              },
              {
                type: "code",
                lang: "js",
                code: `const btn = document.querySelector("#go");

function shout() {
  document.querySelector("#out").textContent = "You clicked! 🔔";
}

btn.addEventListener("click", shout);`,
              },
              {
                type: "tip",
                en: "See how it says `shout` and NOT `shout()`? You hand over the RECIPE, not the meal. addEventListener calls the function for you when the click actually lands — writing `shout()` would run it once right now, which is not what you want.",
                fa: "دیدی که می‌نویسیم `shout` و نه `shout()`؟ تو «دستورِ پخت» را تحویل می‌دهی، نه غذای آماده را. addEventListener خودش موقعی که کلیک واقعاً فرود آمد تابع را صدا می‌زند — نوشتنِ `shout()` یعنی همین حالا یک بار اجرایش کن، که آن چیزی نیست که می‌خواهی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The state → render → listen pattern", fa: "الگوی state ← render ← listen" },
            blocks: [
              {
                type: "text",
                en: "Interactive pages live by a three-beat rhythm. STATE: a variable holds the truth (how many clicks?). RENDER: one function draws that truth onto the screen. LISTEN: event handlers change the state and call render again. Separating render from the handlers means every path — startup, click, ten clicks — shows a correct screen.",
                fa: "صفحه‌های تعاملی با ریتمِ سه‌ضربی زندگی می‌کنند. STATE: یک متغیر حقیقت را نگه می‌دارد (چند کلیک؟). RENDER: یک تابع آن حقیقت را روی صفحه می‌کشد. LISTEN: هندلرهای رویداد state را عوض می‌کنند و render را دوباره صدا می‌زنند. جدا کردنِ render از هندلرها یعنی هر مسیر — استارت، کلیک، ده کلیک — صفحه‌ی درست نشان می‌دهد.",
              },
              {
                type: "code",
                lang: "js",
                code: `let clicks = 0;
const out = document.querySelector("#out");

function render() {
  out.textContent = "Clicks: " + clicks;
}

function addOne() {
  clicks = clicks + 1;  // 1) change the state
  render();             // 2) redraw the screen
}

render(); // first paint — before ANY click
btn.addEventListener("click", addOne);`,
              },
              {
                type: "tip",
                en: "That final `render()` line is a ritual worth stealing: call it once at startup so the page shows real state immediately. A page that renders its starting state before the first interaction always feels alive.",
                fa: "آن خطِ آخرِ `render()` آیینی است که ارزش دزدیدن دارد: یک بار موقع استارت صدايش بزن تا صفحه بلافاصله stateِ واقعی را نشان بدهد. صفحه‌ای که قبل از اولین تعامل، وضعیتِ شروعش را رندر می‌کند، همیشه زنده حس می‌شود.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>First listener</title>
  </head>
  <body>
    <h1>Doorbell 🔔</h1>
    <button id="go">Ring</button>
    <p id="out">Clicks: 0</p>

    <script>
      let clicks = 0;
      const out = document.querySelector("#out");

      function render() {
        out.textContent = "Clicks: " + clicks;
      }

      function addOne() {
        clicks = clicks + 1;
        render();
      }

      render();
      document.querySelector("#go").addEventListener("click", addOne);
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview and click Ring — the number climbs. The startup line was painted before you touched anything.",
                  fa: "پیش‌نمایش را بزن و Ring را کلیک کن — عدد بالا می‌رود. خطِ شروع قبل از اینکه به هیچ‌چیز دست بزنی کشیده شده بود.",
                },
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What are the two arguments of addEventListener?", fa: "دو آرگومانِ addEventListener چیستند؟" },
                options: [
                  { en: "The event name (a string) and the function to run", fa: "نام رویداد (یک رشته) و تابعی که اجرا شود" },
                  { en: "Two element ids", fa: "دو id از عناصر" },
                  { en: "A function and how many times to run it", fa: "یک تابع و چند بار باید اجرا شود" },
                ],
                answer: 0,
                explain: {
                  en: "addEventListener(\"click\", myFunction) — WHAT to listen for, then WHAT to do.",
                  fa: "addEventListener(\"click\", myFunction) — به چه چیزی گوش بدهد، بعد چه کند.",
                },
              },
              {
                q: { en: "Why `btn.addEventListener(\"click\", shout)` and not `shout()`?", fa: "چرا btn.addEventListener(\"click\", shout) و نه shout()؟" },
                options: [
                  { en: "No difference — both work the same", fa: "فرقی ندارد — هر دو یک‌اندازه کار می‌کنند" },
                  { en: "You pass the function itself so it runs LATER, on each click", fa: "خودِ تابع را پاس می‌دهی تا بعداً و در هر کلیک اجرا شود" },
                  { en: "shout() would crash the page", fa: "shout() صفحه را می‌کُشد" },
                ],
                answer: 1,
                explain: {
                  en: "shout() would run once immediately; passing shout (no parentheses) lets addEventListener call it on every future click.",
                  fa: "shout() همان لحظه یک بار اجرا می‌شود؛ اما پاس دادنِ shout (بدون پرانتز) اجازه می‌دهد addEventListener آن را در هر کلیکِ آینده صدا بزند.",
                },
              },
              {
                q: { en: "In the state → render → listen pattern, what does a click handler do?", fa: "در الگوی state ← render ← listen، هندلرِ کلیک چه می‌کند؟" },
                options: [
                  { en: "Draws the screen directly, ignoring state", fa: "صفحه را مستقیم می‌کشد و state را نادیده می‌گیرد" },
                  { en: "Changes the state, then calls render()", fa: "state را عوض می‌کند، بعد render() را صدا می‌زند" },
                  { en: "Nothing — render does everything", fa: "هیچی — همه‌چیز کارِ render است" },
                ],
                answer: 1,
                explain: {
                  en: "Handlers update the state and ask render to redraw — so the screen is always a faithful mirror of the state.",
                  fa: "هندلرها state را به‌روز می‌کنند و از render می‌خواهند دوباره بکشد — تا صفحه همیشه آینه‌ی وفادارِ state باشد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Clap counter", fa: "شمارنده‌ی تشویق" },
            brief: {
              en: "Build a clap meter: let claps = 0, a render() that writes \"Claps: \" + claps into #out, an addOne() that increments and re-renders. Call render() once at startup (the grader checks that first paint: Claps: 0), then attach addOne to #clap's click event — try it live in the preview!",
              fa: "یک تشویق‌سنج بساز: let claps = 0، یک render() که \"Claps: \" + claps را در #out می‌نویسد، و یک addOne() که یکی اضافه می‌کند و دوباره رندر می‌کند. render() را یک بار موقع استارت صدا بزن (نمره‌دهنده همان نقاشیِ اول را چک می‌کند: Claps: 0)، بعد addOne را به رویدادِ کلیکِ #clap وصل کن — در پیش‌نمایش زنده امتحانش کن!",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Clap counter</title>
  </head>
  <body>
    <h1>Applause meter 👏</h1>
    <button id="clap">Clap!</button>
    <p id="out">?</p>

    <script>
      // 1) let claps = 0
      // 2) render(): writes "Claps: " + claps into #out
      // 3) addOne(): claps = claps + 1, then render()
      // 4) Call render() once NOW, then listen for clicks on #clap

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Clap counter</title>
  </head>
  <body>
    <h1>Applause meter 👏</h1>
    <button id="clap">Clap!</button>
    <p id="out">?</p>

    <script>
      // STATE
      let claps = 0;
      const out = document.querySelector("#out");

      // RENDER
      function render() {
        out.textContent = "Claps: " + claps;
      }

      // EVENT: change state, redraw
      function addOne() {
        claps = claps + 1;
        render();
      }

      // First paint + listen
      render();
      document.querySelector("#clap").addEventListener("click", addOne);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Four beats: state variable, render function, handler function, one startup render() + one addEventListener.",
                fa: "چهار ضرب: متغیرِ state، تابعِ render، تابعِ هندلر، یک render() در شروع + یک addEventListener.",
              },
              {
                en: "Pass the function WITHOUT parentheses: addEventListener(\"click\", addOne).",
                fa: "تابع را بدون پرانتز پاس بده: addEventListener(\"click\", addOne).",
              },
              {
                en: "The startup paint must read exactly: Claps: 0",
                fa: "نقاشیِ شروع باید دقیقاً این باشد: Claps: 0",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#out", text: "Claps: 0" },
                { selector: "#clap", count: 1 },
                { selector: "#out", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m9-l2",
        title: { en: "input — Reacting to Typing", fa: "input — واکنش به تایپ" },
        goal: {
          en: "Read an input's .value and keep a live mirror of the user's typing using the input event.",
          fa: "‎.value‌ی یک input را بخوانی و با رویداد input یک آینه‌ی زنده از تایپِ کاربر بسازی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Inputs hide their text in .value", fa: "inputها متن‌شان را در .value پنهان می‌کنند" },
            blocks: [
              {
                type: "text",
                en: "An `<input>` is not a normal element: it has no children, so `textContent` is always empty. What the user typed lives in a property called `.value`. Read it whenever you need it — and remember it is always a STRING of characters, even when it looks like a number.",
                fa: "`<input>` عنصرِ عادی نیست: فرزندی ندارد، پس `textContent` همیشه خالی است. چیزی که کاربر تایپ کرده در خاصیتی به نام `.value` زندگی می‌کند. هر وقت خواستی بخوانش — و یادت باشد همیشه یک رشته‌ی کاراکتری است، حتی وقتی شکلِ عدد دارد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const input = document.querySelector("#name");

console.log(input.value); // whatever the user typed

// inputs fire "input" on EVERY keystroke:
input.addEventListener("input", function () {
  console.log("New value:", input.value);
});`,
              },
              {
                type: "tip",
                en: "Element vocabulary check: normal elements speak textContent, form fields speak .value. Mixing them up is the #1 beginner bug with forms.",
                fa: "واژه‌نامه‌ی عناصر: عناصرِ عادی با textContent حرف می‌زنند، فیلدهای فرم با .value. قاطی‌کردنشان باگِ شماره‌ی یکِ تازه‌کارها با فرم‌هاست.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The live mirror + a fair first paint", fa: "آینه‌ی زنده + اولین نقاشیِ منصفانه" },
            blocks: [
              {
                type: "text",
                en: "Here is a trick with real consequences: you can PRE-FILL an input in the HTML with `value=\"...\"`. Then the startup `greet()` call has real data to render — before the user has touched anything. The listener keeps the mirror live after that. A grader (which cannot type!) reads exactly that first paint.",
                fa: "یک ترفند با عواقبِ واقعی: می‌توانی input را در HTML از قبل پر کنی با `value=\"...\"`. آن‌وقت صدازدنِ اولیه‌ی `greet()` داده‌ی واقعی برای رندر دارد — قبل از اینکه کاربر دست بزند. بعد از آن، listener آینه را زنده نگه می‌دارد. نمره‌دهنده (که نمی‌تواند تایپ کند!) دقیقاً همان نقاشیِ اول را می‌خواند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const input = document.querySelector("#name");
const out = document.querySelector("#out");

function greet() {
  out.textContent = "Hello, " + input.value + "!";
}

greet(); // first paint with the pre-filled value
input.addEventListener("input", greet); // live mirror after that`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Live mirror</title>
  </head>
  <body>
    <h1>Guest book 📖</h1>
    <input id="name" value="Sara" placeholder="Your name">
    <p id="out">...</p>

    <script>
      const input = document.querySelector("#name");
      const out = document.querySelector("#out");

      function greet() {
        out.textContent = "Hello, " + input.value + "!";
      }

      greet();
      input.addEventListener("input", greet);
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview: it greets Sara instantly, then follows every letter you type.",
                  fa: "پیش‌نمایش را بزن: همان اول به Sara سلام می‌کند، بعد هر حرفی که تایپ کنی دنبالش می‌رود.",
                },
              },
              {
                type: "warn",
                en: "The event is named \"input\" — one word, lowercase. \"typing\" or \"write\" are not events; the browser only knows its own event names.",
                fa: "نامِ رویداد \"input\" است — یک کلمه، با حروف کوچک. \"typing\" یا \"write\" رویداد نیستند؛ مرورگر فقط نام‌های رویدادِ خودش را می‌شناسد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How do you read what a user typed into an <input>?", fa: "چیزی که کاربر در <input> تایپ کرده را چطور می‌خوانی؟" },
                options: [
                  { en: "input.textContent", fa: "input.textContent" },
                  { en: "input.value", fa: "input.value" },
                  { en: "input.innerHTML", fa: "input.innerHTML" },
                ],
                answer: 1,
                explain: {
                  en: "Inputs have no children — their content lives in the .value property.",
                  fa: "inputها فرزند ندارند — محتوایشان در خاصیتِ .value زندگی می‌کند.",
                },
              },
              {
                q: { en: "Which event fires on EVERY keystroke in a text field?", fa: "کدام رویداد با هر ضربه‌ی کلید در یک فیلد متنی اجرا می‌شود؟" },
                options: [
                  { en: "\"click\"", fa: "\"click\"" },
                  { en: "\"keydown\" only", fa: "فقط \"keydown\"" },
                  { en: "\"input\"", fa: "\"input\"" },
                ],
                answer: 2,
                explain: {
                  en: "The input event fires every time the value changes — perfect for live mirrors.",
                  fa: "رویداد input هر بار که value عوض شود اجرا می‌شود — برای آینه‌های زنده عالی است.",
                },
              },
              {
                q: { en: "Why call greet() once at startup when the input has value=\"Sara\"?", fa: "اگر input مقدار value=\"Sara\" دارد، چرا greet() را یک بار موقع استارت صدا می‌زنیم؟" },
                options: [
                  { en: "So the page shows real state before the first keystroke — and graders can see it", fa: "تا صفحه قبل از اولین ضربه‌ی کلید state واقعی را نشان بدهد — و نمره‌دهنده هم ببیند" },
                  { en: "It is required by HTML rules", fa: "قوانین HTML آن را الزامی کرده" },
                  { en: "No reason — it is just decoration", fa: "دلیلی ندارد — فقط تزئین است" },
                ],
                answer: 0,
                explain: {
                  en: "The pre-filled value plus one startup call means the correct greeting is painted before any interaction happens.",
                  fa: "مقدارِ از-قبل-پرشده به‌اضافه‌ی یک صدازدن در شروع یعنی سلامِ درست، قبل از هر تعاملی، کشیده شده است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Live badge", fa: "نشانِ زنده" },
            brief: {
              en: "The page has an input #nick pre-filled with TEKA-fan and an empty #out. Write greet() that renders \"Welcome, \" + input.value + \"!\" into #out. Call greet() once at startup (so the grader sees: Welcome, TEKA-fan!) and attach it to the input event so it updates live while typing.",
              fa: "صفحه یک input به نام #nick دارد که با TEKA-fan از قبل پر شده و یک #out خالی. تابع greet() را بنویس که \"Welcome, \" + input.value + \"!\" را در #out رندر کند. greet() را یک بار موقع استارت صدا بزن (تا نمره‌دهنده این را ببیند: Welcome, TEKA-fan!) و به رویداد input وصلش کن تا موقع تایپ زنده به‌روز شود.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Live badge</title>
  </head>
  <body>
    <h1>Name badge 🎫</h1>
    <input id="nick" value="TEKA-fan" placeholder="Type a nickname">
    <p id="out">...</p>

    <script>
      // 1) greet(): renders "Welcome, " + nick.value + "!" into #out
      // 2) Call greet() once at startup
      // 3) Listen to the "input" event on #nick

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Live badge</title>
  </head>
  <body>
    <h1>Name badge 🎫</h1>
    <input id="nick" value="TEKA-fan" placeholder="Type a nickname">
    <p id="out">...</p>

    <script>
      const nick = document.querySelector("#nick");
      const out = document.querySelector("#out");

      function greet() {
        out.textContent = "Welcome, " + nick.value + "!";
      }

      // First paint with the pre-filled nickname
      greet();

      // Live mirror on every keystroke
      nick.addEventListener("input", greet);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The greeting is plain string gluing: \"Welcome, \" + nick.value + \"!\" — three pieces, two plus signs.",
                fa: "سلام، چسباندنِ ساده‌ی رشته‌هاست: \"Welcome, \" + nick.value + \"!\" — سه تکه، دو علامتِ +.",
              },
              {
                en: "The listener line: nick.addEventListener(\"input\", greet); — event name in quotes, function without.",
                fa: "خطِ listener: nick.addEventListener(\"input\", greet); — نامِ رویداد در گیومه، تابع بدون گیومه.",
              },
              {
                en: "Startup paint must read exactly: Welcome, TEKA-fan!",
                fa: "نقاشیِ شروع باید دقیقاً این باشد: Welcome, TEKA-fan!",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#out", text: "Welcome, TEKA-fan!" },
                { selector: "#nick", attrName: "value", attrValue: "TEKA-fan" },
                { selector: "input", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m9-l3",
        title: { en: "keydown & the Event Object", fa: "keydown و شیء رویداد" },
        goal: {
          en: "React to key presses and read the event object — and test-fire a handler with a fake event so its output is visible without a keyboard.",
          fa: "به فشردنِ کلید واکنش نشان بدهی و شیء رویداد را بخوانی — و هندلر را با یک رویدادِ قلابی تست‌شلیک کنی تا خروجی‌اش بدون کیبورد دیده شود.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "The handler gets a report", fa: "هندلر یک گزارش می‌گیرد" },
            blocks: [
              {
                type: "text",
                en: "When an event fires, the browser hands your function a REPORT of what happened — the event object. It arrives as the function's first parameter. For keyboard events the star field is `event.key`: exactly which key was pressed, as a string — `\"Enter\"`, `\"a\"`, `\"ArrowUp\"`, `\" \"` for space. One handler can therefore respond to every key differently.",
                fa: "وقتی رویدادی شلیک شود، مرورگر یک «گزارش» از اتفاق به تابع تو می‌دهد — شیء رویداد. این به‌عنوان اولین پارامترِ تابع می‌رسد. برای رویدادهای کیبورد، ستاره‌ی ماجرا `event.key` است: دقیقاً کدام کلید فشرده شد، به‌صورت رشته — `\"Enter\"`، `\"a\"`، `\"ArrowUp\"`، و `\" \"` برای Space. پس یک هندلر می‌تواند به هر کلید جوابِ متفاوت بدهد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const box = document.querySelector("#box");
const out = document.querySelector("#out");

function report(event) {
  out.textContent = "You pressed: " + event.key;
}

box.addEventListener("keydown", report);`,
              },
              {
                type: "tip",
                en: "The parameter name is yours — event, e, ev all work. But it MUST be there, or the report is lost. Most style guides say `event` or `e`.",
                fa: "نامِ پارامتر با توست — event، e، ev همه کار می‌کنند. اما باید باشد، وگرنه گزارش گم می‌شود. بیشتر راهنماهای سبک می‌گویند `event` یا `e`.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Test-firing with a fake event", fa: "تست‌شلیک با رویدادِ قلابی" },
            blocks: [
              {
                type: "text",
                en: "Here is a secret pros use daily: a handler is just a FUNCTION. You can call it yourself, passing a fake event — a plain object with the fields your handler reads. `report({ key: \"Enter\" })` runs the exact same code a real keypress would run. That is how you test reactions without a keyboard, and how a grader (which cannot press keys) verifies your handler's output.",
                fa: "رازی که حرفه‌ای‌ها هر روز استفاده می‌کنند: هندلر فقط یک تابع است. می‌توانی خودت صدایش بزنی و یک رویدادِ قلابی پاس بدهی — یک شیء ساده با همان فیلدهایی که هندلرت می‌خواند. ‏`report({ key: \"Enter\" })` دقیقاً همان کدی را اجرا می‌کند که یک فشردنِ واقعیِ کلید اجرا می‌کرد. این‌طور بدون کیبورد واکنش‌ها را تست می‌کنند، و نمره‌دهنده (که نمی‌تواند کلید بزند!) خروجیِ هندلرت را همین‌طور تأیید می‌کند.",
              },
              {
                type: "code",
                lang: "js",
                code: `// The handler, unchanged:
function report(event) {
  out.textContent = "Last key: " + event.key;
}

// Test-fire ONCE at startup — paints a sample:
report({ key: "Enter" });

// Then the real listener:
box.addEventListener("keydown", report);`,
              },
              {
                type: "warn",
                en: "A fake event is a plain object: { key: \"Enter\" }. Only the fields your handler actually reads need to exist — report only touches event.key, so that one field is enough.",
                fa: "رویدادِ قلابی یک شیء ساده است: { key: \"Enter\" }. فقط فیلدهایی که هندلرت واقعاً می‌خواند لازم است وجود داشته باشند — report فقط به event.key دست می‌زند، پس همان یک فیلد کافی است.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Key reporter</title>
  </head>
  <body>
    <h1>Key log ⌨️</h1>
    <input id="box" placeholder="Click here, then press keys">
    <p id="out">...</p>

    <script>
      const box = document.querySelector("#box");
      const out = document.querySelector("#out");

      function report(event) {
        out.textContent = "Last key: " + event.key;
      }

      report({ key: "Enter" }); // sample, painted at startup
      box.addEventListener("keydown", report);
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview: \"Last key: Enter\" is already there (the test-fire), then press real keys inside the input.",
                  fa: "پیش‌نمایش را بزن: \"Last key: Enter\" از قبل آنجاست (تست‌شلیک)، بعد داخل input کلیدهای واقعی فشار بده.",
                },
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Inside a keydown handler, where do you find WHICH key was pressed?", fa: "داخل هندلرِ keydown، کجا پیدا می‌کنی کدام کلید فشرده شده؟" },
                options: [
                  { en: "event.key", fa: "event.key" },
                  { en: "box.textContent", fa: "box.textContent" },
                  { en: "keydown.value", fa: "keydown.value" },
                ],
                answer: 0,
                explain: {
                  en: "The event object reports the details — event.key is the pressed key as a string.",
                  fa: "شیء رویداد جزئیات را گزارش می‌دهد — event.key همان کلیدِ فشرده‌شده به‌صورت رشته است.",
                },
              },
              {
                q: { en: "What does report({ key: \"Enter\" }) do?", fa: "report({ key: \"Enter\" }) چه می‌کند؟" },
                options: [
                  { en: "Sends a real Enter keypress to the operating system", fa: "یک فشردنِ واقعیِ Enter به سیستم‌عامل می‌فرستد" },
                  { en: "Calls the handler once with a fake event, running its real logic", fa: "هندلر را یک بار با رویدادِ قلابی صدا می‌زند و منطقِ واقعی‌اش را اجرا می‌کند" },
                  { en: "Nothing — handlers can only run from real events", fa: "هیچی — هندلرها فقط از رویدادهای واقعی اجرا می‌شوند" },
                ],
                answer: 1,
                explain: {
                  en: "Handlers are plain functions — you may call them with a fake event object to test the logic synchronously.",
                  fa: "هندلرها تابع‌های ساده‌اند — می‌توانی با یک شیء رویدادِ قلابی صدایشان بزنی تا منطق را هم‌زمان تست کنی.",
                },
              },
              {
                q: { en: "Your handler only reads event.key. Which fake event is valid?", fa: "هندلرت فقط event.key را می‌خواند. کدام رویدادِ قلابی معتبر است؟" },
                options: [
                  { en: "report({ key: \"a\" })", fa: "report({ key: \"a\" })" },
                  { en: "report(\"a\")", fa: "report(\"a\")" },
                  { en: "report({ button: 1 })", fa: "report({ button: 1 })" },
                ],
                answer: 0,
                explain: {
                  en: "It must be an OBJECT carrying the fields the handler reads — here, key: \"a\".",
                  fa: "باید یک شیء باشد که فیلدهای خوانده‌شده توسط هندلر را دارد — اینجا، key: \"a\".",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Key log", fa: "گزارش کلیدها" },
            brief: {
              en: "Build the key logger: a report(event) function that renders \"Last key: \" + event.key into #last. Test-fire it once at startup with report({ key: \"Enter\" }) — the grader reads that painted sample — then attach report to #box's keydown event so real typing updates it live.",
              fa: "گزارش‌گیرِ کلیدها را بساز: تابع report(event) که \"Last key: \" + event.key را در #last رندر می‌کند. یک بار موقع استارت با report({ key: \"Enter\" }) تست‌شلیکش کن — نمره‌دهنده همان نمونه‌ی کشیده‌شده را می‌خواند — بعد report را به رویداد keydown‌ی #box وصل کن تا تایپِ واقعی زنده به‌روزش کند.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Key log</title>
  </head>
  <body>
    <h1>Key log ⌨️</h1>
    <input id="box" placeholder="Click here, then press keys">
    <p id="last">...</p>

    <script>
      // 1) report(event): renders "Last key: " + event.key into #last
      // 2) Test-fire once: report({ key: "Enter" })
      // 3) Listen: #box keydown → report

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Key log</title>
  </head>
  <body>
    <h1>Key log ⌨️</h1>
    <input id="box" placeholder="Click here, then press keys">
    <p id="last">...</p>

    <script>
      const box = document.querySelector("#box");
      const last = document.querySelector("#last");

      // The handler — one parameter, one read
      function report(event) {
        last.textContent = "Last key: " + event.key;
      }

      // Test-fire once so a sample is painted at startup
      report({ key: "Enter" });

      // Then the real thing: live key presses
      box.addEventListener("keydown", report);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "report takes ONE parameter called event and writes \"Last key: \" + event.key.",
                fa: "report یک پارامتر به نام event می‌گیرد و \"Last key: \" + event.key را می‌نویسد.",
              },
              {
                en: "The test-fire is a normal function call with an object: report({ key: \"Enter\" });",
                fa: "تست‌شلیک یک صدازدنِ عادیِ تابع با یک شیء است: report({ key: \"Enter\" });",
              },
              {
                en: "Startup paint must read exactly: Last key: Enter",
                fa: "نقاشیِ شروع باید دقیقاً این باشد: Last key: Enter",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#last", text: "Last key: Enter" },
                { selector: "#last", count: 1 },
                { selector: "input", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m9-l4",
        title: { en: "Mini-project: Event Playground", fa: "مینی‌پروژه: زمین بازی رویدادها" },
        goal: {
          en: "Attach one shared handler to many buttons and use event.target to know which one was clicked.",
          fa: "یک هندلرِ مشترک را به چند دکمه وصل کنی و با event.target بفهمی کدام کلیک خورده.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "One handler, many buttons", fa: "یک هندلر، چند دکمه" },
            blocks: [
              {
                type: "text",
                en: "Writing a separate function for every button does not scale. The pro move: give all the buttons the same class, select them ALL with querySelectorAll, loop, and attach the SAME handler to each. Inside the handler, `event.target` is the exact element that was clicked — its textContent, its id, everything.",
                fa: "برای هر دکمه یک تابعِ جدا بنویسی، مقیاس‌پذیر نیست. حرکتِ حرفه‌ای: به همه‌ی دکمه‌ها یک کلاس بده، همه را با querySelectorAll بگیر، حلقه بزن و به هرکدام همان یک هندلر را وصل کن. داخل هندلر، `event.target` دقیقاً همان عنصری است که کلیک خورده — textContent‌اش، id‌اش، همه‌چیزش.",
              },
              {
                type: "code",
                lang: "js",
                code: `function answer(event) {
  const who = event.target; // the exact button clicked
  document.querySelector("#out").textContent =
    "You chose: " + who.textContent;
}

for (const btn of document.querySelectorAll(".choice")) {
  btn.addEventListener("click", answer);
}`,
              },
              {
                type: "tip",
                en: "One function, N listeners, zero duplication — and event.target carries the identity. This is the pattern behind tabs, menus and every button grid on the web.",
                fa: "یک تابع، N شنونده، صفر تکرار — و event.target هویت را با خودش می‌آورد. این الگوی پشتِ تب‌ها، منوها و هر شبکه‌ی دکمه‌ای در وب است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "A status line that exists before clicks", fa: "خطِ وضعیتی که قبل از کلیک‌ها وجود دارد" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Choices</title>
  </head>
  <body>
    <h1>Pick your fuel ⛽</h1>
    <button class="choice">Coffee ☕</button>
    <button class="choice">Tea 🍵</button>
    <button class="choice">Water 💧</button>
    <p id="out">Waiting for a choice...</p>
    <p id="status">?</p>

    <script>
      const out = document.querySelector("#out");
      const choices = document.querySelectorAll(".choice");

      function answer(event) {
        out.textContent = "You chose: " + event.target.textContent;
      }

      for (const btn of choices) {
        btn.addEventListener("click", answer);
      }

      // Startup paint: status BEFORE any click
      document.querySelector("#status").textContent =
        "Choices ready: " + choices.length;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview: the status line already counts the buttons; clicking any of them updates #out.",
                  fa: "پیش‌نمایش را بزن: خطِ وضعیت از قبل تعداد دکمه‌ها را نوشته؛ کلیک روی هرکدام #out را به‌روز می‌کند.",
                },
              },
              {
                type: "warn",
                en: "Real apps always show a starting state BEFORE the first interaction — a status line, a zeroed score, an empty-state message. Paint it synchronously at startup; interaction updates come later.",
                fa: "اپ‌های واقعی همیشه قبل از اولین تعامل یک وضعیتِ شروع نشان می‌دهند — یک خطِ وضعیت، یک امتیازِ صفر، یک پیامِ خالی‌بودن. همان را موقع استارت، هم‌زمان نقاشی کن؛ به‌روزرسانی‌های تعاملی بعداً می‌آیند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Inside a shared click handler, what is event.target?", fa: "داخل یک هندلرِ مشترکِ کلیک، event.target چیست؟" },
                options: [
                  { en: "The whole page", fa: "کل صفحه" },
                  { en: "The exact element that was clicked", fa: "دقیقاً همان عنصری که کلیک خورده" },
                  { en: "The function itself", fa: "خودِ تابع" },
                ],
                answer: 1,
                explain: {
                  en: "event.target points at the element that fired the event — read its textContent to know which button.",
                  fa: "event.target به عنصری اشاره می‌کند که رویداد را شلیک کرده — textContent‌اش را بخوان تا بفهمی کدام دکمه.",
                },
              },
              {
                q: { en: "How do you attach one handler to 5 buttons at once?", fa: "چطور یک هندلر را هم‌زمان به ۵ دکمه وصل کنی؟" },
                options: [
                  { en: "querySelectorAll + a loop + addEventListener on each", fa: "querySelectorAll + حلقه + addEventListener روی هرکدام" },
                  { en: "One addEventListener with all 5 ids", fa: "یک addEventListener با هر ۵ id" },
                  { en: "It is impossible — one handler per element", fa: "غیرممکن است — برای هر عنصر یک هندلر" },
                ],
                answer: 0,
                explain: {
                  en: "Select them all, loop over the NodeList, attach the same function to every element.",
                  fa: "همه را انتخاب کن، روی NodeList حلقه بزن، همان یک تابع را به هر عنصر وصل کن.",
                },
              },
              {
                q: { en: "What should the page show BEFORE the first click?", fa: "صفحه قبل از اولین کلیک چه چیزی باید نشان بدهد؟" },
                options: [
                  { en: "Nothing — blank until clicked", fa: "هیچی — خالی تا کلیک" },
                  { en: "A synchronously painted starting state", fa: "یک وضعیتِ شروع که هم‌زمان نقاشی شده" },
                  { en: "A random message", fa: "یک پیامِ تصادفی" },
                ],
                answer: 1,
                explain: {
                  en: "Paint the startup state in the script itself — users (and graders) land on a meaningful page.",
                  fa: "وضعیتِ شروع را داخل خودِ اسکریپت نقاشی کن — کاربرها (و نمره‌دهنده‌ها) به صفحه‌ای بامعنا می‌رسند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Choice board", fa: "تخته‌ی انتخاب" },
            brief: {
              en: "Three food buttons share one handler. Render \"Choices ready: \" + the number of .choice buttons into #status at startup. Give answer(event) one parameter; it must render \"You chose: \" + event.target.textContent into #out. Test-fire answer once with the fake event answer({ target: { textContent: \"Pizza 🍕\" } }) so the board shows a sample, then attach it to all three buttons via a loop.",
              fa: "سه دکمه‌ی غذا یک هندلر مشترک دارند. موقع استارت، \"Choices ready: \" + تعدادِ دکمه‌های .choice را در #status رندر کن. به answer(event) یک پارامتر بده؛ باید \"You chose: \" + event.target.textContent را در #out رندر کند. answer را یک بار با رویدادِ قلابیِ answer({ target: { textContent: \"Pizza 🍕\" } }) تست‌شلیک کن تا تخته یک نمونه نشان بدهد، بعد با حلقه به هر سه دکمه وصلش کن.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Choice board</title>
  </head>
  <body>
    <h1>Dinner vote 🍽️</h1>
    <button class="choice">Pizza 🍕</button>
    <button class="choice">Kebab 🍢</button>
    <button class="choice">Salad 🥗</button>
    <p id="out">...</p>
    <p id="status">?</p>

    <script>
      // 1) answer(event): #out ← "You chose: " + event.target.textContent
      // 2) Test-fire once: answer({ target: { textContent: "Pizza 🍕" } })
      // 3) Loop: attach answer to every .choice
      // 4) #status ← "Choices ready: " + number of choices

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Choice board</title>
  </head>
  <body>
    <h1>Dinner vote 🍽️</h1>
    <button class="choice">Pizza 🍕</button>
    <button class="choice">Kebab 🍢</button>
    <button class="choice">Salad 🥗</button>
    <p id="out">...</p>
    <p id="status">?</p>

    <script>
      const out = document.querySelector("#out");
      const choices = document.querySelectorAll(".choice");

      // One handler for every button
      function answer(event) {
        out.textContent = "You chose: " + event.target.textContent;
      }

      // Sample paint: a fake event with a fake target
      answer({ target: { textContent: "Pizza 🍕" } });

      // Then the real thing: every button, same handler
      for (const btn of choices) {
        btn.addEventListener("click", answer);
      }

      // Startup status, before any click
      document.querySelector("#status").textContent =
        "Choices ready: " + choices.length;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The fake event nests one level: { target: { textContent: \"Pizza 🍕\" } } — target is an object too.",
                fa: "رویدادِ قلابی یک سطح تو در تو دارد: { target: { textContent: \"Pizza 🍕\" } } — target هم خودش یک شیء است.",
              },
              {
                en: "#status uses choices.length — select them all first, then count.",
                fa: "#status از choices.length استفاده می‌کند — اول همه را انتخاب کن، بعد بشمار.",
              },
              {
                en: "Expected at startup: #out = You chose: Pizza 🍕 · #status = Choices ready: 3",
                fa: "مورد انتظار موقع شروع: #out = You chose: Pizza 🍕 · #status = Choices ready: 3",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#status", text: "Choices ready: 3" },
                { selector: "#out", text: "You chose: Pizza 🍕" },
                { selector: ".choice", count: 3 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 10 ───────────────────────────────────────────
  {
    id: "js-m10",
    title: { en: "DOM Building", fa: "ساختن با DOM" },
    blurb: {
      en: "Stop only editing what exists: create elements from scratch, build lists out of data, tear them down, and flip CSS classes with classList.",
      fa: "دیگر فقط چیزی که هست را ویرایش نکن: از صفر عنصر بساز، از دلِ داده فهرست بساز، خرابشان کن و با classList کلاس‌های CSS را سوییچ کن.",
    },
    lessons: [
      {
        id: "js-m10-l1",
        title: { en: "createElement & append", fa: "createElement و append" },
        goal: {
          en: "Create brand-new elements with createElement and attach them to the page with append.",
          fa: "با createElement عنصرهای کاملاً جدید بسازی و با append به صفحه وصلشان کنی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Born invisible", fa: "متولدِ نامرئی" },
            blocks: [
              {
                type: "text",
                en: "Everything so far changed elements that ALREADY existed in the HTML. `document.createElement(\"li\")` makes a brand-new element node, built in JavaScript memory — fresh, empty and completely invisible, because nothing on the page knows it exists yet. It becomes real the moment you attach it with `.append()`.",
                fa: "تا اینجا همه‌چیز عنصرهایی را عوض می‌کرد که از قبل در HTML وجود داشتند. ‏`document.createElement(\"li\")` یک نودِ عنصرِ کاملاً جدید می‌سازد، داخل حافظه‌ی جاوااسکریپت — تازه، خالی و کاملاً نامرئی، چون هنوز هیچ‌جای صفحه از وجودش خبر ندارد. لحظه‌ای که با `.append()` وصلش کنی، واقعی می‌شود.",
              },
              {
                type: "code",
                lang: "js",
                code: `// 1) CREATE — born in memory, invisible
const li = document.createElement("li");

// 2) FILL — give it content
li.textContent = "New item 🆕";

// 3) ATTACH — now it exists on the page
document.querySelector("#list").append(li);`,
              },
              {
                type: "tip",
                en: "createElement takes the tag name WITHOUT angle brackets: \"li\", not \"<li>\". It is just a name, like the argument of querySelector is just a selector.",
                fa: "createElement نامِ تگ را بدون علامت‌های <> می‌گیرد: \"li\"، نه \"<li>\". فقط یک نام است — همان‌طور که آرگومانِ querySelector فقط یک سلکتور است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The three beats in action", fa: "سه ضرب در عمل" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Element factory</title>
  </head>
  <body>
    <h1>Todo list 📝</h1>
    <ul id="list"></ul>

    <script>
      const list = document.querySelector("#list");

      // Three beats, two items
      const first = document.createElement("li");
      first.textContent = "Feed the cat 🐱";
      list.append(first);

      const second = document.createElement("li");
      second.textContent = "Water the plants 🌱";
      list.append(second);
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the <ul> in the HTML is empty; both items were born in JavaScript and attached at load.",
                  fa: "پیش‌نمایش را بزن — <ul> داخل HTML خالی است؛ هر دو آیتم در جاوااسکریپت متولد شده‌اند و موقع لود وصل شده‌اند.",
                },
              },
              {
                type: "text",
                en: "`append` always places the new element as the LAST child of the parent — so the natural rhythm for building lists is create → fill → append, repeated. Next lesson we let a loop do the repeating.",
                fa: "`append` همیشه عنصر جدید را به‌عنوان آخرین فرزندِ والد می‌گذارد — پس ریتمِ طبیعیِ ساختنِ فهرست‌ها همین است: بساز → پر کن → وصل کن، و تکرار. درسِ بعد می‌گذاریم حلقه تکرار را انجام بدهد.",
              },
              {
                type: "warn",
                en: "An element you create but never append stays a ghost: real in memory, absent from the page. If your new element is not showing, the missing append is the first suspect.",
                fa: "عنصری که بسازی ولی هرگز append نکنی روح می‌ماند: در حافظه واقعی، روی صفحه غایب. اگر عنصرِ جدیدت نشان داده نمی‌شود، اولین مظنون همان append جاافتاده است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does document.createElement(\"li\") do?", fa: "document.createElement(\"li\") چه می‌کند؟" },
                options: [
                  { en: "Finds the first <li> on the page", fa: "اولین <li> صفحه را پیدا می‌کند" },
                  { en: "Creates a new, empty <li> element in memory", fa: "یک عنصر <li> جدید و خالی در حافظه می‌سازد" },
                  { en: "Deletes all <li> elements", fa: "همه‌ی عناصر <li> را پاک می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "It builds a fresh element node in memory — invisible until you append it somewhere.",
                  fa: "یک نودِ عنصرِ تازه در حافظه می‌سازد — تا وقتی جایی وصلش نکنی نامرئی است.",
                },
              },
              {
                q: { en: "A created element that you never append is…", fa: "عنصری که ساختی ولی هرگز append نکردی…" },
                options: [
                  { en: "…visible but empty", fa: "…دیده می‌شود ولی خالی است" },
                  { en: "…automatically added to the end of body", fa: "…به‌طور خودکار به آخرِ body اضافه می‌شود" },
                  { en: "…invisible — it only lives in memory", fa: "…نامرئی است — فقط در حافظه زندگی می‌کند" },
                ],
                answer: 2,
                explain: {
                  en: "No append, no page. The element exists in JavaScript but the document never hears about it.",
                  fa: "بدون append، بدون صفحه. عنصر در جاوااسکریپت هست ولی سند هرگز از آن باخبر نمی‌شود.",
                },
              },
              {
                q: { en: "Where does parent.append(el) place el?", fa: "parent.append(el) عنصر el را کجا می‌گذارد؟" },
                options: [
                  { en: "As the last child of parent", fa: "به‌عنوان آخرین فرزندِ والد" },
                  { en: "As the first child of parent", fa: "به‌عنوان اولین فرزندِ والد" },
                  { en: "It replaces parent entirely", fa: "کلاً جای والد را می‌گیرد" },
                ],
                answer: 0,
                explain: {
                  en: "append adds to the end of the children list — new items keep stacking up underneath.",
                  fa: "append به انتهای فهرستِ فرزندها اضافه می‌کند — آیتم‌های جدید زیر هم روی هم تلنبار می‌شوند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Guest list", fa: "فهرست مهمان‌ها" },
            brief: {
              en: "The <ul id=\"list\"> starts empty. Build the guest list in JavaScript: const guests = [\"Ava\", \"Ben\", \"Cleo\"] — for each name, create an <li>, set its textContent to \"🎟️ \" + the name, and append it to #list. The page must end with exactly 3 list items.",
              fa: "‏<ul id=\"list\"> خالی شروع می‌شود. فهرست مهمان‌ها را در جاوااسکریپت بساز: const guests = [\"Ava\", \"Ben\", \"Cleo\"] — برای هر نام، یک <li> بساز، textContent‌اش را بگذار \"🎟️ \" + نام، و به #list وصلش کن. صفحه در انتها باید دقیقاً ۳ آیتمِ فهرست داشته باشد.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Guest list</title>
  </head>
  <body>
    <h1>Party door 🎉</h1>
    <ul id="list"></ul>

    <script>
      // const guests = ["Ava", "Ben", "Cleo"];
      // For each guest:
      //   1) document.createElement("li")
      //   2) textContent = "🎟️ " + name
      //   3) append to #list
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Guest list</title>
  </head>
  <body>
    <h1>Party door 🎉</h1>
    <ul id="list"></ul>

    <script>
      const guests = ["Ava", "Ben", "Cleo"];
      const list = document.querySelector("#list");

      for (const name of guests) {
        const li = document.createElement("li"); // create
        li.textContent = "🎟️ " + name;            // fill
        list.append(li);                          // attach
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The three beats run INSIDE the loop: create, fill with \"🎟️ \" + name, append.",
                fa: "سه ضرب داخل حلقه اجرا می‌شوند: بساز، با \"🎟️ \" + name پر کن، وصل کن.",
              },
              {
                en: "Create the element inside the loop so each guest gets their own fresh <li>.",
                fa: "عنصر را داخل حلقه بساز تا هر مهمان <li> تازه‌ی خودش را بگیرد.",
              },
              {
                en: "Expected: 3 items reading 🎟️ Ava · 🎟️ Ben · 🎟️ Cleo",
                fa: "مورد انتظار: ۳ آیتم 🎟️ Ava · 🎟️ Ben · 🎟️ Cleo",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#list li", count: 3 },
                { selector: "#list li", text: "Ava" },
                { selector: "#list", text: "Cleo" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m10-l2",
        title: { en: "Build Lists from Data", fa: "فهرست‌سازی از دلِ داده" },
        goal: {
          en: "Turn an array of objects into rendered rows — the render-from-data pattern behind every feed, cart and leaderboard.",
          fa: "یک آرایه از شیءها را به ردیف‌های رندرشده تبدیل کنی — الگویِ رندر-از-داده‌ای که پشتِ هر فید، سبد خرید و جدول امتیازات است.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "One loop, one element per item", fa: "یک حلقه، برای هر آیتم یک عنصر" },
            blocks: [
              {
                type: "text",
                en: "Now stack the two skills: data in an array, elements in a loop. For each item in the array you run the three beats — create, fill, append — and the page grows one row per item. Change the array, re-run, and the page follows. This single pattern builds every feed, chat log, search result and cart on the web.",
                fa: "حالا دو مهارت را روی هم بچین: داده در آرایه، عناصر در حلقه. برای هر آیتمِ آرایه سه ضرب را اجرا می‌کنی — بساز، پر کن، وصل کن — و صفحه به‌ازای هر آیتم یک ردیف بزرگ می‌شود. آرایه را عوض کن، دوباره اجرا کن، صفحه دنبالش می‌آید. همین یک الگو هر فید، لاگِ چت، نتیجه‌ی جست‌وجو و سبد خریدِ وب را می‌سازد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const fruits = ["🍎 Apple", "🍌 Banana", "🍒 Cherry"];
const list = document.querySelector("#list");

for (const fruit of fruits) {
  const li = document.createElement("li"); // fresh each pass
  li.textContent = fruit;
  list.append(li);
}`,
              },
              {
                type: "tip",
                en: "Declare the element INSIDE the loop. One pass = one fresh element. If you create it once outside and append it repeatedly, you just move the SAME element around — the list never grows.",
                fa: "عنصر را داخل حلقه تعریف کن. هر گذر = یک عنصرِ تازه. اگر یک بار بیرون بسازی و مدام append کنی، فقط همان یک عنصر را جابه‌جا می‌کنی — فهرست هیچ‌وقت بزرگ نمی‌شود.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Objects make rows richer", fa: "شیءها ردیف‌ها را غنی‌تر می‌کنند" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .card { border: 1px solid #ddd; border-radius: 8px;
              padding: 8px; margin: 6px 0; }
    </style>
  </head>
  <body>
    <h1>Menu board 🍽️</h1>
    <div id="board"></div>

    <script>
      const dishes = [
        { name: "Ghormeh Sabzi", price: 9 },
        { name: "Fesenjan", price: 12 },
      ];
      const board = document.querySelector("#board");

      for (const dish of dishes) {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = dish.name + " — $" + dish.price;
        board.append(card);
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — each object became one styled card, built purely from the array.",
                  fa: "پیش‌نمایش را بزن — هر شیء به یک کارتِ استایل‌دار تبدیل شد، ساخته‌شده‌ی خالص از دلِ آرایه.",
                },
              },
              {
                type: "text",
                en: "One new friend appeared: `card.className = \"card\"` gives the fresh element a class — so CSS can style every row the same way. You will meet its surgical sibling, classList, in the class-toggling lesson.",
                fa: "یک دوستِ جدید هم آمد: `card.className = \"card\"` به عنصرِ تازه کلاس می‌دهد — تا CSS بتواند همه‌ی ردیف‌ها را یک‌شکل استایل بدهد. برادرِ جراحِ آن، یعنی classList، را در درسِ سوییچ‌کردنِ کلاس می‌بینی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why create the element INSIDE the loop?", fa: "چرا عنصر را داخل حلقه می‌سازیم؟" },
                options: [
                  { en: "It is faster", fa: "سریع‌تر است" },
                  { en: "Each item needs its own fresh element — reusing one just moves it", fa: "هر آیتم به عنصرِ تازه‌ی خودش نیاز دارد — استفاده‌ی دوباره از یک عنصر فقط جابه‌جایی‌اش است" },
                  { en: "JavaScript requires it", fa: "جاوااسکریپت الزامش کرده" },
                ],
                answer: 1,
                explain: {
                  en: "Appending the same element twice MOVES it; a growing list needs one new element per pass.",
                  fa: "append دوباره‌ی همان عنصر، آن را جابه‌جا می‌کند؛ فهرستِ درحال‌رشد به یک عنصرِ جدید در هر گذر نیاز دارد.",
                },
              },
              {
                q: { en: "What is the render-from-data pattern's order?", fa: "ترتیبِ الگویِ رندر-از-داده چیست؟" },
                options: [
                  { en: "Create elements, then invent data for them", fa: "اول عنصر بساز، بعد برایشان داده اختراع کن" },
                  { en: "Define the data array, loop it, create-fill-append per item", fa: "آرایه‌ی داده را تعریف کن، حلقه بزن، برای هر آیتم بساز-پرکن-وصل‌کن" },
                  { en: "Write all HTML by hand, then loop for no reason", fa: "کل HTML را دستی بنویس، بعد بی‌دلیل حلقه بزن" },
                ],
                answer: 1,
                explain: {
                  en: "Data is the source of truth; the loop translates each item into one DOM element.",
                  fa: "داده منبعِ حقیقت است؛ حلقه هر آیتم را به یک عنصرِ DOM ترجمه می‌کند.",
                },
              },
              {
                q: { en: "What does card.className = \"card\" do?", fa: "card.className = \"card\" چه می‌کند؟" },
                options: [
                  { en: "Sets the element's id to card", fa: "id‌ی عنصر را می‌گذارد card" },
                  { en: "Gives the element the class card, so CSS can style it", fa: "به عنصر کلاس card می‌دهد، تا CSS بتواند استایلش بدهد" },
                  { en: "Creates a new CSS file", fa: "یک فایل CSS جدید می‌سازد" },
                ],
                answer: 1,
                explain: {
                  en: "className assigns the class attribute — the bridge between your created elements and the stylesheet.",
                  fa: "className اتریبیوتِ class را تعیین می‌کند — پلِ بین عنصرهای ساخته‌شده و استایل‌شیت.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Leaderboard", fa: "جدول امتیازات" },
            brief: {
              en: "Render the leaderboard from its data: const scores = [{ name: \"Sara\", points: 120 }, { name: \"Ali\", points: 95 }, { name: \"Mina\", points: 80 }]. Loop it, and for each player create a <div class=\"row\"> inside #board with textContent: name + \" — \" + points + \" pts\".",
              fa: "جدول امتیازات را از دلِ داده‌اش رندر کن: const scores = [{ name: \"Sara\", points: 120 }, { name: \"Ali\", points: 95 }, { name: \"Mina\", points: 80 }]. روی آن حلقه بزن و برای هر بازیکن یک <div class=\"row\"> داخل #board بساز با textContent: name + \" — \" + points + \" pts\".",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .row { border-bottom: 1px solid #ddd; padding: 6px 2px; }
    </style>
  </head>
  <body>
    <h1>Tournament 🏆</h1>
    <div id="board"></div>

    <script>
      // Data:
      const scores = [
        { name: "Sara", points: 120 },
        { name: "Ali", points: 95 },
        { name: "Mina", points: 80 },
      ];
      // Loop: for each player, create a div.row,
      // textContent = name + " — " + points + " pts",
      // append to #board 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .row { border-bottom: 1px solid #ddd; padding: 6px 2px; }
    </style>
  </head>
  <body>
    <h1>Tournament 🏆</h1>
    <div id="board"></div>

    <script>
      const scores = [
        { name: "Sara", points: 120 },
        { name: "Ali", points: 95 },
        { name: "Mina", points: 80 },
      ];
      const board = document.querySelector("#board");

      for (const player of scores) {
        const row = document.createElement("div");
        row.className = "row";
        row.textContent = player.name + " — " + player.points + " pts";
        board.append(row);
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Inside the loop you have one player — read player.name and player.points.",
                fa: "داخل حلقه یک player داری — player.name و player.points را بخوان.",
              },
              {
                en: "Create a div, set className = \"row\", build the text, append to #board.",
                fa: "یک div بساز، className = \"row\" بگذار، متن را بساز، به #board وصل کن.",
              },
              {
                en: "The first row must read exactly: Sara — 120 pts",
                fa: "ردیفِ اول باید دقیقاً این باشد: Sara — 120 pts",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".row", count: 3 },
                { selector: ".row", text: "Sara" },
                { selector: "#board", text: "120 pts" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m10-l3",
        title: { en: "remove & Clean Slate", fa: "remove و تخته‌ی پاک" },
        goal: {
          en: "Delete elements with remove(), wipe a container for a fresh re-render, and know which tool fits which job.",
          fa: "با remove() عنصرها را حذف کنی، یک ظرف را برای رندرِ دوباره پاک کنی و بدانی کدام ابزار برای کدام کار است.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "Tearing down", fa: "خراب‌کردن" },
            blocks: [
              {
                type: "text",
                en: "Building is half the job — real pages also tear down. `el.remove()` deletes one element from the page instantly. To empty a whole container, the pro shortcut is `container.innerHTML = \"\"` — every child vanishes, the container itself survives. That wipe-then-rebuild move is the heart of re-rendering.",
                fa: "ساختن نصفِ کار است — صفحه‌های واقعی خراب هم می‌کنند. ‏`el.remove()` یک عنصر را همان لحظه از صفحه حذف می‌کند. برای خالی کردنِ یک ظرفِ کامل، میان‌بُرِ حرفه‌ای `container.innerHTML = \"\"` است — همه‌ی فرزندها ناپدید می‌شوند، خودِ ظرف زنده می‌ماند. همین حرکتِ پاک-کن-بعد-بساز، قلبِ رندرِ دوباره است.",
              },
              {
                type: "code",
                lang: "js",
                code: `// Delete ONE element:
document.querySelector("#old-banner").remove();

// Empty a container — children gone, container stays:
const list = document.querySelector("#list");
list.innerHTML = "";`,
              },
              {
                type: "warn",
                en: "The two are NOT twins: remove() deletes the element itself (it is gone from the page forever); innerHTML = \"\" deletes only the children and keeps the container. Picking the wrong one deletes too much or too little.",
                fa: "این دو دوقلو نیستند: remove() خودِ عنصر را حذف می‌کند (برای همیشه از صفحه می‌رود)؛ innerHTML = \"\" فقط فرزندها را حذف می‌کند و ظرف را نگه می‌دارد. انتخابِ اشتباه یا زیادی حذف می‌کند یا زیادی کم.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The wipe-and-rebuild cycle", fa: "چرخه‌ی پاک‌کن-بعد-بساز" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Clean slate</title>
  </head>
  <body>
    <h1>Café queue ☕</h1>
    <ul id="queue">
      <li>yesterday's order 1</li>
      <li>yesterday's order 2</li>
      <li>yesterday's order 3</li>
    </ul>

    <script>
      const queue = document.querySelector("#queue");
      const orders = ["Nima — latte", "Parna — tea", "Reza — juice"];

      // Wipe yesterday (the HTML above was pre-filled)
      queue.innerHTML = "";

      // Rebuild from today's data
      for (const order of orders) {
        const li = document.createElement("li");
        li.textContent = order;
        queue.append(li);
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the three stale items are gone, replaced by fresh data. Same container, new truth.",
                  fa: "پیش‌نمایش را بزن — سه آیتمِ کهنه رفته‌اند و داده‌ی تازه جایشان نشسته. همان ظرف، حقیقتِ جدید.",
                },
              },
              {
                type: "text",
                en: "Why wipe at all? If you just append new items onto old ones, the page shows BOTH generations — stale rows stacking under fresh ones. Wipe first, then rebuild: the container always mirrors the current data exactly.",
                fa: "اصلاً چرا پاک کنیم؟ اگر آیتم‌های جدید را روی قدیمی‌ها append کنی، صفحه هر دو نسل را نشان می‌دهد — ردیف‌های کهنه زیر تازه‌ها تلنبار می‌شوند. اول پاک کن، بعد بساز: ظرف همیشه دقیقاً آینه‌ی داده‌ی فعلی است.",
              },
              {
                type: "tip",
                en: "remove() needs a found element — if querySelector returns null, .remove() crashes. Wipe patterns with innerHTML = \"\" never have that problem.",
                fa: "remove() به یک عنصرِ پیدا‌شده نیاز دارد — اگر querySelector مقدار null برگرداند، ‎.remove()‎ کرش می‌کند. الگوی پاک‌کردن با innerHTML = \"\" هرگز آن مشکل را ندارد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is the difference between el.remove() and parent.innerHTML = \"\"?", fa: "فرقِ el.remove() با parent.innerHTML = \"\" چیست؟" },
                options: [
                  { en: "No difference — both delete the same things", fa: "فرقی ندارد — هر دو همین‌طور را پاک می‌کنند" },
                  { en: "remove() deletes the element itself; innerHTML = \"\" deletes only the children", fa: "remove() خودِ عنصر را حذف می‌کند؛ innerHTML = \"\" فقط فرزندها را حذف می‌کند" },
                  { en: "innerHTML = \"\" deletes the parent too", fa: "innerHTML = \"\" والد را هم حذف می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "One removes a single element from the page; the other empties a container while keeping it.",
                  fa: "یکی یک عنصرِ تکی را از صفحه حذف می‌کند؛ دیگری ظرف را خالی می‌کند ولی خودش را نگه می‌دارد.",
                },
              },
              {
                q: { en: "Why wipe a list before re-rendering it from new data?", fa: "چرا قبل از رندرِ دوباره از داده‌ی جدید، فهرست را پاک می‌کنیم؟" },
                options: [
                  { en: "So old and new items don't stack together", fa: "تا آیتم‌های قدیمی و جدید روی هم تلنبار نشوند" },
                  { en: "Because append is slow", fa: "چون append کند است" },
                  { en: "No reason — appending twice is fine", fa: "دلیلی ندارد — دو بار append کردن اشکالی ندارد" },
                ],
                answer: 0,
                explain: {
                  en: "Without the wipe, the container shows both generations. Wipe → rebuild keeps it a true mirror of the data.",
                  fa: "بدون پاک‌کردن، ظرف هر دو نسل را نشان می‌دهد. پاک‌کن ← بساز، آن را آینه‌ی واقعیِ داده نگه می‌دارد.",
                },
              },
              {
                q: { en: "When does .remove() crash your script?", fa: "‏.remove()‎ کِی اسکریپتت را کرش می‌کند؟" },
                options: [
                  { en: "When the element has children", fa: "وقتی عنصر فرزند داشته باشد" },
                  { en: "When querySelector returned null (nothing matched)", fa: "وقتی querySelector مقدار null برگردانده باشد (هیچ‌چیز match نشده)" },
                  { en: "Never — remove is always safe", fa: "هرگز — remove همیشه امن است" },
                ],
                answer: 1,
                explain: {
                  en: "null.remove() cannot work — nothing is there to remove. That is why the wipe pattern is the safer default.",
                  fa: "‏null.remove()‎ نمی‌تواند کار کند — چیزی برای حذف‌کردن نیست. برای همین الگویِ پاک‌کردن پیش‌فرضِ امن‌تر است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Queue reset", fa: "ریستِ صف" },
            brief: {
              en: "The #queue starts with 3 stale orders in the HTML. In the script: wipe #queue completely (innerHTML = \"\"), then rebuild it from const queue = [\"Nima\", \"Parna\", \"Reza\", \"Sahar\"] — one <li> per name — and render \"In queue: 4\" into #count. The page must end with exactly 4 list items (the stale ones must be gone).",
              fa: "‏#queue با ۳ سفارشِ کهنه در HTML شروع می‌شود. در اسکریپت: #queue را کامل پاک کن (innerHTML = \"\")، بعد از const queue = [\"Nima\", \"Parna\", \"Reza\", \"Sahar\"] از نو بسازش — برای هر نام یک <li> — و \"In queue: 4\" را در #count رندر کن. صفحه در انتها باید دقیقاً ۴ آیتم داشته باشد (کهنه‌ها باید رفته باشند).",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Queue reset</title>
  </head>
  <body>
    <h1>Café queue ☕</h1>
    <ul id="queue">
      <li>stale order 1</li>
      <li>stale order 2</li>
      <li>stale order 3</li>
    </ul>
    <p id="count">?</p>

    <script>
      // const queue = ["Nima", "Parna", "Reza", "Sahar"];
      // 1) Wipe #queue (innerHTML = "")
      // 2) Rebuild: one <li> per name
      // 3) #count ← "In queue: 4"

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Queue reset</title>
  </head>
  <body>
    <h1>Café queue ☕</h1>
    <ul id="queue">
      <li>stale order 1</li>
      <li>stale order 2</li>
      <li>stale order 3</li>
    </ul>
    <p id="count">?</p>

    <script>
      const names = ["Nima", "Parna", "Reza", "Sahar"];
      const queueEl = document.querySelector("#queue");

      // Wipe yesterday completely
      queueEl.innerHTML = "";

      // Rebuild from today's data
      for (const name of names) {
        const li = document.createElement("li");
        li.textContent = name;
        queueEl.append(li);
      }

      // The count follows the data
      document.querySelector("#count").textContent = "In queue: " + names.length;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "One line wipes everything: queue.innerHTML = \"\"; — then the loop rebuilds.",
                fa: "یک خط همه‌چیز را پاک می‌کند: queue.innerHTML = \"\"; — بعد حلقه از نو می‌سازد.",
              },
              {
                en: "If the stale items survive, the wipe line is missing or comes AFTER the loop.",
                fa: "اگر آیتم‌های کهنه زنده ماندند، خطِ پاک‌کردن جا افتاده یا بعد از حلقه آمده.",
              },
              {
                en: "The count line: \"In queue: \" + names.length — the data counts itself.",
                fa: "خطِ شمارنده: \"In queue: \" + names.length — داده خودش می‌شمارد.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#queue li", count: 4 },
                { selector: "#queue li", text: "Parna" },
                { selector: "#count", text: "In queue: 4" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m10-l4",
        title: { en: "classList — The Style Switch", fa: "classList — سوییچِ استایل" },
        goal: {
          en: "Flip CSS classes on and off with classList add/remove/toggle/contains — JavaScript switches, CSS paints.",
          fa: "کلاس‌های CSS را با add/remove/toggle/contains‌ی classList سوییچ کنی — جاوااسکریپت کلید را می‌زند، CSS رنگ می‌کشد.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Verbs for the class attribute", fa: "فعل‌هایی برای اتریبیوتِ class" },
            blocks: [
              {
                type: "text",
                en: "You saw `className = \"...\"` replace the whole class attribute at once. Its careful sibling `classList` works like a set of verbs on the SAME attribute: add one class, remove one, flip one, or ask if one is present. JavaScript flips the switch; your CSS decides what the switch turns on.",
                fa: "دیدی که `className = \"...\"` کلِ اتریبیوتِ class را یک‌جا عوض می‌کند. خواهرِ محتاطش `classList` مثل مجموعه‌ای از فعل‌ها روی همان اتریبیوت کار می‌کند: یکی اضافه کن، یکی بردار، یکی سوییچ کن، یا بپرس اصلاً هست یا نه. جاوااسکریپت کلید را می‌زند؛ CSS‌ی تو تصمیم می‌گیرد کلید چه چیزی را روشن کند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const chip = document.querySelector("#chip");

chip.classList.add("active");     // class="chip active"
chip.classList.remove("hidden");  // gone
chip.classList.toggle("dark");    // on if off, off if on

if (chip.classList.contains("active")) {
  // do something only when the class is present
}`,
              },
              {
                type: "tip",
                en: "Prefer classList over className when you mean to change ONE class: className overwrites everything, classList touches only what you name.",
                fa: "وقتی منظورت فقط یک کلاس است، classList را به className ترجیح بده: className همه‌چیز را بازنویسی می‌کند، classList فقط همان را دست می‌زند که نام می‌بری.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The done switch, driven by data", fa: "کلیدِ done، رانده‌شده از دلِ داده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .todo { padding: 4px 0; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Today 📋</h1>
    <ul>
      <li class="todo">Buy milk</li>
      <li class="todo">Study JS</li>
    </ul>

    <script>
      const state = [true, false];
      const items = document.querySelectorAll(".todo");

      for (let i = 0; i < items.length; i++) {
        if (state[i]) {
          items[i].classList.add("done");
        }
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the first todo is struck through, driven by the true in the state array.",
                  fa: "پیش‌نمایش را بزن — اولین کار خط‌خورده است، به فرمانِ true در آرایه‌ی state.",
                },
              },
              {
                type: "text",
                en: "This is the decisive upgrade from painting with .style: the LOOK lives in a CSS class (styled once by a designer), and JavaScript only decides WHO gets the class. Appearance and logic shake hands without stepping on each other.",
                fa: "این همان ارتقای سرنوشت‌ساز نسبت به نقاشی با .style است: ظاهر در یک کلاسِ CSS زندگی می‌کند (یک بار توسط طراح استایل خورده) و جاوااسکریپت فقط تصمیم می‌گیرد کِی کلاس بگیرد. ظاهر و منطق دست می‌دهند بدون اینکه پای هم لگد بزنند.",
              },
              {
                type: "warn",
                en: "toggle() flips: class present → removed, absent → added. It is perfect for click-to-highlight UIs; in this challenge's graded path, stick to add() driven by the state array.",
                fa: "‏toggle() سوییچ می‌زند: کلاس هست ← حذف، نیست ← اضافه. برای رابط‌های «کلیک کن تا روشن شود» عالی است؛ در مسیرِ نمره‌گرفتنِ این چالش، همان add() رانده‌شده از آرایه‌ی state بماند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does classList.toggle(\"dark\") do?", fa: "classList.toggle(\"dark\") چه می‌کند؟" },
                options: [
                  { en: "Always adds the class", fa: "همیشه کلاس را اضافه می‌کند" },
                  { en: "Always removes the class", fa: "همیشه کلاس را حذف می‌کند" },
                  { en: "Adds it if absent, removes it if present", fa: "اگر نبود اضافه می‌کند، اگر بود حذف می‌کند" },
                ],
                answer: 2,
                explain: {
                  en: "toggle is the flip switch — perfect for on/off UI states like dark mode.",
                  fa: "toggle کلیدِ سوییچ است — برای وضعیت‌های روشن/خاموشِ رابط مثل حالت شب عالی است.",
                },
              },
              {
                q: { en: "Why put looks in CSS classes instead of .style lines?", fa: "چرا ظاهر را در کلاس‌های CSS می‌گذاریم نه خط‌های .style؟" },
                options: [
                  { en: "CSS classes style every matching element once; JS just switches the class", fa: "کلاس‌های CSS یک بار همه‌ی عناصرِ matching را استایل می‌دهند؛ JS فقط کلاس را سوییچ می‌کند" },
                  { en: ".style is broken in browsers", fa: "‎.style در مرورگرها خراب است" },
                  { en: "classList is the only way to change colors", fa: "classList تنها راهِ عوض‌کردنِ رنگ است" },
                ],
                answer: 0,
                explain: {
                  en: "Appearance lives with CSS, decisions live with JavaScript — classList is the handshake between them.",
                  fa: "ظاهر پیشِ CSS می‌ماند، تصمیم‌ها پیشِ جاوااسکریپت — classList همان دست‌دادنِ بین این دو است.",
                },
              },
              {
                q: { en: "Which line asks: \"does this element have the done class?\"", fa: "کدام خط می‌پرسد: «آیا این عنصر کلاس done دارد؟»" },
                options: [
                  { en: "el.classList.contains(\"done\")", fa: "el.classList.contains(\"done\")" },
                  { en: "el.classList.add(\"done\")", fa: "el.classList.add(\"done\")" },
                  { en: "el.classList.toggle(\"done\")", fa: "el.classList.toggle(\"done\")" },
                ],
                answer: 0,
                explain: {
                  en: "contains returns true or false — it asks, it does not change.",
                  fa: "contains مقدار true یا false برمی‌گرداند — می‌پرسد، تغییر نمی‌دهد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Todo marks", fa: "نشان‌های کارها" },
            brief: {
              en: "The state array [true, false, true, false] says which of the four .todo items are done. Loop with an index, and for every done item run classList.add(\"done\") — the CSS already strikes those through. Also render \"Done: 2\" into #doneCount by counting the true values in your loop.",
              fa: "آرایه‌ی state یعنی [true, false, true, false] می‌گوید کدام‌یک از چهار آیتمِ .todo انجام شده‌اند. با اندیس حلقه بزن و برای هر آیتمِ done ‏classList.add(\"done\") را اجرا کن — CSS از قبل خط‌خورده‌شان می‌کند. همچنین \"Done: 2\" را در #doneCount رندر کن، با شمردنِ trueها در حلقه‌ات.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .todo { padding: 4px 0; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Today 📋</h1>
    <ul id="todos">
      <li class="todo">Buy milk</li>
      <li class="todo">Study JS</li>
      <li class="todo">Walk the dog</li>
      <li class="todo">Sleep</li>
    </ul>
    <p id="doneCount">?</p>

    <script>
      // Which ones are done:
      const state = [true, false, true, false];
      // 1) Loop items with an index (let i = 0; ...)
      // 2) If state[i] is true → items[i].classList.add("done")
      // 3) Count the done ones → #doneCount ← "Done: 2"

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .todo { padding: 4px 0; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Today 📋</h1>
    <ul id="todos">
      <li class="todo">Buy milk</li>
      <li class="todo">Study JS</li>
      <li class="todo">Walk the dog</li>
      <li class="todo">Sleep</li>
    </ul>
    <p id="doneCount">?</p>

    <script>
      const state = [true, false, true, false];
      const items = document.querySelectorAll(".todo");
      let doneCount = 0;

      for (let i = 0; i < items.length; i++) {
        if (state[i]) {
          items[i].classList.add("done");
          doneCount = doneCount + 1;
        }
      }

      document.querySelector("#doneCount").textContent = "Done: " + doneCount;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "This needs the INDEX loop: for (let i = 0; i < items.length; i++) — state[i] pairs with items[i].",
                fa: "این حلقه‌ی اندیسی می‌خواهد: for (let i = 0; i < items.length; i++) — state[i] با items[i] جفت می‌شود.",
              },
              {
                en: "Inside the if, two lines: classList.add(\"done\") and doneCount = doneCount + 1.",
                fa: "داخل if دو خط: classList.add(\"done\") و doneCount = doneCount + 1.",
              },
              {
                en: "Exactly 2 items must get .done — check the preview for two struck-through lines.",
                fa: "دقیقاً ۲ آیتم باید .done بگیرند — در پیش‌نمایش دو خطِ خط‌خورده ببین.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".todo.done", count: 2 },
                { selector: "#todos", text: "Study JS" },
                { selector: "#doneCount", text: "Done: 2" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 11 ───────────────────────────────────────────
  {
    id: "js-m11",
    title: { en: "Mini Games Lab", fa: "آزمایشگاه بازی‌های کوچک" },
    blurb: {
      en: "Three playable builds — counter, quiz show, click race, number hunt — all running the same pro pattern: state, render, listen.",
      fa: "چهار ساختِ قابل‌بازی — شمارنده، مسابقه‌ی سؤال، مسابقه‌ی کلیک، شکارِ عدد — همه با همان الگوی حرفه‌ای: state، render، listen.",
    },
    lessons: [
      {
        id: "js-m11-l1",
        title: { en: "Game #1: Power Counter", fa: "بازی ۱: شمارنده‌ی قدرت" },
        goal: {
          en: "Build a two-button game where every button changes the state differently but shares one render function.",
          fa: "بازی‌ای با دو دکمه بسازی که هر دکمه state را جورِ دیگری عوض می‌کند ولی هر دو یک render مشترک دارند.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "One state, many mutations", fa: "یک state، چند دگرگونی" },
            blocks: [
              {
                type: "text",
                en: "Every game — from a clicker to a 3D shooter — runs the same loop: STATE holds the truth, RENDER draws it, EVENTS change the truth and redraw. What varies between games is only the mutation rules. A power counter has two: +1 and ×2. Same skeleton, different math.",
                fa: "هر بازی‌ای — از یک کلیک‌کننده تا یک شوترِ سه‌بعدی — همان یک حلقه را می‌چرخاند: STATE حقیقت را نگه می‌دارد، RENDER نقاشی‌اش می‌کند، EVENTS حقیقت را عوض می‌کنند و دوباره نقاشی می‌کنند. تنها چیزی که بین بازی‌ها فرق می‌کند قواعدِ دگرگونی است. شمارنده‌ی قدرت دو تا دارد: ‎+1 و ×2. همان اسکلت، ریاضیِ متفاوت.",
              },
              {
                type: "code",
                lang: "js",
                code: `let power = 0;
const out = document.querySelector("#score");

function render() {
  out.textContent = "Power: " + power;
}

function addOne() {
  power = power + 1;   // mutation rule 1
  render();
}

function double() {
  power = power * 2;   // mutation rule 2
  render();
}

render();
document.querySelector("#plus").addEventListener("click", addOne);
document.querySelector("#double").addEventListener("click", double);`,
              },
              {
                type: "tip",
                en: "Two buttons, two handlers, ONE render — that separation is the whole design. When the rules change, you edit a 3-line handler; render never hears about it.",
                fa: "دو دکمه، دو هندلر، یک render — همین جداسازی کلِ طراحی است. وقتی قواعد عوض می‌شوند، یک هندلرِ سه‌خطی را ویرایش می‌کنی؛ render اصلاً بی‌خبر می‌ماند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The reset — a third rule", fa: "ریست — قاعده‌ی سوم" },
            blocks: [
              {
                type: "code",
                lang: "js",
                code: `function reset() {
  power = 0;   // back to the starting truth
  render();
}

document.querySelector("#reset").addEventListener("click", reset);`,
              },
              {
                type: "text",
                en: "A reset is just a third mutation rule — and notice it is the most satisfying one to build, because it needs zero cleverness: set the state back, call render, done. Games feel 'complete' the moment undo/reset exists.",
                fa: "ریست فقط قاعده‌ی سومِ دگرگونی است — و لذت‌بخش‌ترینِ آن‌هاست برای ساختن، چون هیچ نبوغی نمی‌خواهد: state را برگردان، render را صدا بزن، تمام. بازی‌ها همان لحظه «کامل» حس می‌شوند که undo/reset داشته باشند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Power counter</title>
  </head>
  <body>
    <h1>Power station ⚡</h1>
    <p id="score">Power: 0</p>
    <button id="plus">+1</button>
    <button id="double">×2</button>
    <button id="reset">Reset</button>

    <script>
      let power = 0;
      const out = document.querySelector("#score");

      function render() {
        out.textContent = "Power: " + power;
      }
      function addOne() { power = power + 1; render(); }
      function double()  { power = power * 2; render(); }
      function reset()   { power = 0; render(); }

      render();
      document.querySelector("#plus").addEventListener("click", addOne);
      document.querySelector("#double").addEventListener("click", double);
      document.querySelector("#reset").addEventListener("click", reset);
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview and play: +1, ×2, Reset — three rules, one screen that never lies.",
                  fa: "پیش‌نمایش را بزن و بازی کن: ‎+1، ×2، Reset — سه قاعده، یک صفحه که هرگز دروغ نمی‌گوید.",
                },
              },
              {
                type: "warn",
                en: "The grader sees the FIRST paint only: \"Power: 0\" at load. It cannot click — so the startup render() is not decoration here, it IS the graded state.",
                fa: "نمره‌دهنده فقط اولین نقاشی را می‌بیند: \"Power: 0\" در لحظه‌ی لود. نمی‌تواند کلیک کند — پس render()‌ی شروع اینجا تزئین نیست، همین «وضعیتِ نمره‌گرفته» است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What changes between two different games built on state → render → listen?", fa: "دو بازیِ مختلف که روی state ← render ← listen ساخته شده‌اند، در چه چیزی فرق دارند؟" },
                options: [
                  { en: "The pattern itself", fa: "خودِ الگو" },
                  { en: "The mutation rules — how the state changes", fa: "قواعدِ دگرگونی — اینکه state چطور عوض می‌شود" },
                  { en: "Nothing at all", fa: "هیچ‌چیز" },
                ],
                answer: 1,
                explain: {
                  en: "The skeleton is identical; each game defines its own rules for changing the state.",
                  fa: "اسکلت یکسان است؛ هر بازی قواعدِ خودش را برای عوض‌کردنِ state تعریف می‌کند.",
                },
              },
              {
                q: { en: "Why do +1 and ×2 share one render()?", fa: "چرا ‎+1 و ×2 یک render() مشترک دارند؟" },
                options: [
                  { en: "To save one line of code", fa: "برای صرفه‌جویی در یک خط کد" },
                  { en: "So every path to a new state draws through the same correct screen-drawing code", fa: "تا هر مسیری به state جدید، از همان کدِ درستِ نقاشیِ صفحه رد شود" },
                  { en: "They do not — each needs its own render", fa: "ندارند — هرکدام render خودش را می‌خواهد" },
                ],
                answer: 1,
                explain: {
                  en: "One render, always correct: handlers change the state, render draws whatever the state now is.",
                  fa: "یک render، همیشه درست: هندلرها state را عوض می‌کنند، render هرچه حالا state است را می‌کشد.",
                },
              },
              {
                q: { en: "What does the grader check in this counter challenge?", fa: "نمره‌دهنده در چالشِ شمارنده چه چیزی را چک می‌کند؟" },
                options: [
                  { en: "The first paint: \"Power: 0\" rendered synchronously at load", fa: "اولین نقاشی: \"Power: 0\" که هم‌زمان با لود رندر شده" },
                  { en: "Ten automatic clicks", fa: "ده کلیکِ خودکار" },
                  { en: "The number of lines in your script", fa: "تعداد خط‌های اسکریپتت" },
                ],
                answer: 0,
                explain: {
                  en: "Grading happens ~60ms after load on the painted DOM — the startup render is what gets graded.",
                  fa: "نمره‌دهی ~۶۰ میلی‌ثانیه بعد از لود روی DOMِ نقاشی‌شده انجام می‌شود — render شروع همان چیزی است که نمره می‌گیرد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Power station", fa: "نیروگاهِ قدرت" },
            brief: {
              en: "Build the power station: let power = 0, render() writing \"Power: \" + power into #score. Three handlers — addOne (+1), doubleIt (×2), reset — each mutating then re-rendering. Call render() once at startup (grader reads: Power: 0) and attach all three buttons. Play it in the preview after passing!",
              fa: "نیروگاهِ قدرت را بساز: let power = 0 و render() که \"Power: \" + power را در #score می‌نویسد. سه هندلر — addOne ‏(+1)، doubleIt ‏(×2)، reset — که هرکدام mutate می‌کنند و دوباره رندر می‌کنند. render() را یک بار موقع استارت صدا بزن (نمره‌دهنده می‌خواند: Power: 0) و هر سه دکمه را وصل کن. بعد از قبول شدن در پیش‌نمایش بازی کن!",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Power station</title>
  </head>
  <body>
    <h1>Power station ⚡</h1>
    <p id="score">?</p>
    <button id="plus">+1</button>
    <button id="double">×2</button>
    <button id="reset">Reset</button>

    <script>
      // 1) let power = 0; render() writes "Power: " + power into #score
      // 2) addOne: +1 · doubleIt: ×2 · reset: back to 0 (each ends with render())
      // 3) render() once NOW
      // 4) Attach all three buttons with addEventListener

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Power station</title>
  </head>
  <body>
    <h1>Power station ⚡</h1>
    <p id="score">?</p>
    <button id="plus">+1</button>
    <button id="double">×2</button>
    <button id="reset">Reset</button>

    <script>
      // STATE
      let power = 0;
      const out = document.querySelector("#score");

      // RENDER
      function render() {
        out.textContent = "Power: " + power;
      }

      // THREE RULES
      function addOne()  { power = power + 1; render(); }
      function doubleIt() { power = power * 2; render(); }
      function reset()   { power = 0; render(); }

      // First paint + listen
      render();
      document.querySelector("#plus").addEventListener("click", addOne);
      document.querySelector("#double").addEventListener("click", doubleIt);
      document.querySelector("#reset").addEventListener("click", reset);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Three near-identical handlers — copy the shape: change power, then render().",
                fa: "سه هندلرِ تقریباً یکسان — شکل را کپی کن: power را عوض کن، بعد render().",
              },
              {
                en: "Multiplication in JS uses *: power = power * 2.",
                fa: "ضرب در JS با * است: power = power * 2.",
              },
              {
                en: "Startup paint must read exactly: Power: 0",
                fa: "نقاشیِ شروع باید دقیقاً این باشد: Power: 0",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#score", text: "Power: 0" },
                { selector: "#plus", count: 1 },
                { selector: "#double", count: 1 },
                { selector: "#reset", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m11-l2",
        title: { en: "Game #2: Quiz Show", fa: "بازی ۲: مسابقه‌ی سؤال" },
        goal: {
          en: "Render a question and its option buttons from a data object, and grade answers by comparing the clicked text.",
          fa: "یک سؤال و دکمه‌های گزینه‌اش را از یک شیء داده رندر کنی و جواب‌ها را با مقایسه‌ی متنِ کلیک‌شده نمره بدهی.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Quizzes are data first", fa: "مسابقه‌ها اول داده‌اند" },
            blocks: [
              {
                type: "text",
                en: "A quiz question is just an object: the question text, its options as an array, and the index of the correct answer. Render means: put the question into one element, build one button per option, and paint a feedback line. The data can change a hundred times — the rendering code never does.",
                fa: "یک سؤالِ مسابقه فقط یک شیء است: متنِ سؤال، گزینه‌هایش به‌صورت آرایه، و اندیسِ جوابِ درست. رندر یعنی: سؤال را در یک عنصر بگذار، برای هر گزینه یک دکمه بساز، و یک خطِ بازخورد نقاشی کن. داده می‌تواند صد بار عوض شود — کدِ رندر هیچ‌وقت.",
              },
              {
                type: "code",
                lang: "js",
                code: `const quiz = {
  q: "Which language makes pages come alive?",
  options: ["HTML", "CSS", "JavaScript"],
  answer: 2,
};

const qEl = document.querySelector("#q");
const opts = document.querySelector("#opts");

qEl.textContent = quiz.q;              // the question
for (const option of quiz.options) {   // one button per option
  const btn = document.createElement("button");
  btn.className = "opt";
  btn.textContent = option;
  opts.append(btn);
}`,
              },
              {
                type: "tip",
                en: "quiz.answer is an INDEX (0, 1, 2) — not the text. The correct option text is quiz.options[quiz.answer]. Keep the two apart in your head and the grading logic writes itself.",
                fa: "‏quiz.answer یک اندیس است (۰، ۱، ۲) — نه متن. متنِ گزینه‌ی درست می‌شود quiz.options[quiz.answer]. این دو را در ذهنت جدا نگه دار و منطقِ نمره‌دهی خودش نوشته می‌شود.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Grading the click", fa: "نمره‌دادن به کلیک" },
            blocks: [
              {
                type: "text",
                en: "The click handler gets the clicked button through `event.target` (last module's move!). Since every option button shows its own text, comparing `event.target.textContent` with `quiz.options[quiz.answer]` decides correct or wrong — no indices to track, no extra data on the buttons.",
                fa: "هندلرِ کلیک، دکمه‌ی کلیک‌خورده را از طریق `event.target` می‌گیرد (همان حرکتِ ماژولِ قبل!). چون هر دکمه‌ی گزینه متنِ خودش را نشان می‌دهد، مقایسه‌ی `event.target.textContent` با `quiz.options[quiz.answer]` درست یا غلط را تصمیم می‌گیرد — نه اندیسی باید دنبالش بگردی نه داده‌ی اضافه‌ای روی دکمه‌ها می‌گذاری.",
              },
              {
                type: "code",
                lang: "js",
                code: `const feedback = document.querySelector("#feedback");

function pick(event) {
  if (event.target.textContent === quiz.options[quiz.answer]) {
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = "❌ Not quite — try again!";
  }
}

// attach to every .opt button (loop!)`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Quiz show</title>
  </head>
  <body>
    <h1>Quiz show 🎬</h1>
    <p id="q">?</p>
    <div id="opts"></div>
    <p id="feedback">Pick an answer!</p>

    <script>
      const quiz = {
        q: "Which tag paints the page?",
        options: ["<html>", "<style>", "<head>"],
        answer: 1,
      };
      const qEl = document.querySelector("#q");
      const opts = document.querySelector("#opts");
      const feedback = document.querySelector("#feedback");

      qEl.textContent = quiz.q;
      for (const option of quiz.options) {
        const btn = document.createElement("button");
        btn.className = "opt";
        btn.textContent = option;
        btn.addEventListener("click", pick);
        opts.append(btn);
      }

      function pick(event) {
        if (event.target.textContent === quiz.options[quiz.answer]) {
          feedback.textContent = "✅ Correct!";
        } else {
          feedback.textContent = "❌ Not quite — try again!";
        }
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview and answer — the feedback line reacts to your choice.",
                  fa: "پیش‌نمایش را بزن و جواب بده — خطِ بازخورد به انتخابت واکنش نشان می‌دهد.",
                },
              },
              {
                type: "warn",
                en: "The startup feedback line exists BEFORE any click — a real quiz never shows a blank screen while it waits. One painted line, one honest first impression.",
                fa: "خطِ بازخوردِ شروع قبل از هر کلیکی وجود دارد — یک مسابقه‌ی واقعی هرگز منتظرِ اولین کلیک، صفحه‌ی خالی نشان نمی‌دهد. یک خطِ نقاشی‌شده، یک اولین‌برداشتِ صادقانه.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In the quiz object, what does answer: 2 mean?", fa: "در شیءِ quiz، یعنی answer: 2 چه معنایی دارد؟" },
                options: [
                  { en: "The second option is correct (1-based)", fa: "گزینه‌ی دوم درست است (از ۱ شروع)" },
                  { en: "The option at index 2 is correct — the third one", fa: "گزینه‌ای که اندیس ۲ دارد درست است — سومی" },
                  { en: "The quiz has 2 questions", fa: "مسابقه ۲ سؤال دارد" },
                ],
                answer: 1,
                explain: {
                  en: "Indexes start at 0, so answer: 2 points at options[2] — the third option.",
                  fa: "اندیس‌ها از ۰ شروع می‌شوند، پس answer: 2 به options[2] اشاره می‌کند — گزینه‌ی سوم.",
                },
              },
              {
                q: { en: "How does the handler know WHICH option was clicked?", fa: "هندلر از کجا می‌فهمد کدام گزینه کلیک خورده؟" },
                options: [
                  { en: "It guesses from the timing", fa: "از روی زمان‌بندی حدس می‌زند" },
                  { en: "event.target.textContent — the clicked button's own text", fa: "event.target.textContent — متنِ خودِ دکمه‌ی کلیک‌خورده" },
                  { en: "It re-renders the quiz and checks the DOM order", fa: "مسابقه را دوباره رندر می‌کند و ترتیب DOM را چک می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Each button carries its option text — event.target hands you that button, the comparison does the rest.",
                  fa: "هر دکمه متنِ گزینه‌اش را دارد — event.target همان دکمه را به تو می‌دهد، مقایسه بقیه‌اش را می‌کند.",
                },
              },
              {
                q: { en: "What should #feedback show before the first click?", fa: "‏#feedback قبل از اولین کلیک چه باید نشان بدهد؟" },
                options: [
                  { en: "Nothing — it stays empty", fa: "هیچی — خالی می‌ماند" },
                  { en: "A painted starting line like \"Pick an answer!\"", fa: "یک خطِ شروعِ نقاشی‌شده مثل \"Pick an answer!\"" },
                  { en: "The correct answer, of course", fa: "البته که جوابِ درست" },
                ],
                answer: 1,
                explain: {
                  en: "Paint the starting state synchronously — the screen is complete from the first millisecond.",
                  fa: "وضعیتِ شروع را هم‌زمان نقاشی کن — صفحه از اولین میلی‌ثانیه کامل است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "One-question quiz", fa: "مسابقه‌ی یک‌سؤالی" },
            brief: {
              en: "The data is provided: const quiz = { q: \"Which language makes pages come alive?\", options: [\"HTML\", \"CSS\", \"JavaScript\"], answer: 2 }. Render quiz.q into #q, build one button.opt per option inside #opts (each with addEventListener calling pick), and paint \"Pick an answer!\" into #feedback. The pick handler compares event.target.textContent with quiz.options[quiz.answer] and writes \"✅ Correct!\" or \"❌ Not quite — try again!\" into #feedback.",
              fa: "داده از قبل هست: const quiz = { q: \"Which language makes pages come alive?\", options: [\"HTML\", \"CSS\", \"JavaScript\"], answer: 2 }. ‏quiz.q را در #q رندر کن، داخل #opts برای هر گزینه یک دکمه‌ی .opt بساز (هرکدام با addEventListener که pick را صدا می‌زند) و \"Pick an answer!\" را در #feedback نقاشی کن. هندلرِ pick ‏event.target.textContent را با quiz.options[quiz.answer] مقایسه می‌کند و \"✅ Correct!\" یا \"❌ Not quite — try again!\" را در #feedback می‌نویسد.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Quiz show</title>
  </head>
  <body>
    <h1>Quiz show 🎬</h1>
    <p id="q">?</p>
    <div id="opts"></div>
    <p id="feedback">?</p>

    <script>
      // Data (do not change):
      const quiz = {
        q: "Which language makes pages come alive?",
        options: ["HTML", "CSS", "JavaScript"],
        answer: 2,
      };
      // 1) #q ← quiz.q
      // 2) Loop quiz.options: create button.opt, text = option, append to #opts, listen for clicks
      // 3) #feedback ← "Pick an answer!"
      // 4) pick(event): compare event.target.textContent with quiz.options[quiz.answer]

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Quiz show</title>
  </head>
  <body>
    <h1>Quiz show 🎬</h1>
    <p id="q">?</p>
    <div id="opts"></div>
    <p id="feedback">?</p>

    <script>
      const quiz = {
        q: "Which language makes pages come alive?",
        options: ["HTML", "CSS", "JavaScript"],
        answer: 2,
      };
      const qEl = document.querySelector("#q");
      const opts = document.querySelector("#opts");
      const feedback = document.querySelector("#feedback");

      // The question + the starting line
      qEl.textContent = quiz.q;
      feedback.textContent = "Pick an answer!";

      // One button per option, all listening
      function pick(event) {
        if (event.target.textContent === quiz.options[quiz.answer]) {
          feedback.textContent = "✅ Correct!";
        } else {
          feedback.textContent = "❌ Not quite — try again!";
        }
      }

      for (const option of quiz.options) {
        const btn = document.createElement("button");
        btn.className = "opt";
        btn.textContent = option;
        btn.addEventListener("click", pick);
        opts.append(btn);
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Button loop: createElement(\"button\"), className = \"opt\", textContent = option, append, addEventListener(\"click\", pick).",
                fa: "حلقه‌ی دکمه‌ها: createElement(\"button\")، ‏className = \"opt\"، ‏textContent = option، ‏append، ‏addEventListener(\"click\", pick).",
              },
              {
                en: "In pick, the correct text is quiz.options[quiz.answer] — compare it with event.target.textContent.",
                fa: "در pick، متنِ درست quiz.options[quiz.answer] است — با event.target.textContent مقایسه‌اش کن.",
              },
              {
                en: "Startup: #q shows the question, #feedback shows Pick an answer!, and 3 .opt buttons exist.",
                fa: "موقع شروع: #q سؤال را نشان می‌دهد، #feedback نشان می‌دهد Pick an answer!، و ۳ دکمه‌ی .opt وجود دارند.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#q", text: "Which language makes pages come alive?" },
                { selector: ".opt", count: 3 },
                { selector: "#feedback", text: "Pick an answer!" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m11-l3",
        title: { en: "Game #3: Click Race", fa: "بازی ۳: مسابقه‌ی کلیک" },
        goal: {
          en: "Track two scores in one state, guard the game with a finished flag, and declare a winner.",
          fa: "دو امتیاز را در یک state دنبال کنی، بازی را با یک پرچمِ all-done محافظت کنی و برنده را اعلام کنی.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Two scores, one flag", fa: "دو امتیاز، یک پرچم" },
            blocks: [
              {
                type: "text",
                en: "A race between two players needs a slightly bigger state: two scores AND a boolean flag `over` that says the game has finished. The flag is the guard: once someone wins, further clicks are ignored. State machines — a truth plus rules about when it may change — are how every real game keeps itself honest.",
                fa: "مسابقه‌ی بین دو بازیکن به state کمی بزرگ‌تری نیاز دارد: دو امتیاز و یک پرچمِ بولیِ `over` که می‌گوید بازی تمام شده. پرچم همان محافظ است: وقتی کسی برد، کلیک‌های بعدی نادیده گرفته می‌شوند. ماشین‌های وضعیت — یک حقیقت به‌اضافه‌ی قواعدی درباره‌ی اینکه کِی اجازه‌ی تغییر دارد — همان چیزی هستند که هر بازی واقعی را سرِ پا و صادق نگه می‌دارند.",
              },
              {
                type: "code",
                lang: "js",
                code: `let s1 = 0, s2 = 0, over = false;

function point1() {
  if (over) return;      // the guard: game's done, click ignored
  s1 = s1 + 1;
  render();
  checkWin();
}`,
              },
              {
                type: "tip",
                en: "`if (over) return;` is the standard early-exit: if the game is over, leave the handler immediately — no state change, no render. Two words that turn a broken game into a fair one.",
                fa: "‏`if (over) return;` همان خروجِ سریعِ استاندارد است: اگر بازی تمام شده، بلافاصله از هندلر بیرون برو — نه تغییری در state نه رندری. دو کلمه که یک بازیِ خراب را به بازی‌ای منصفانه تبدیل می‌کند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Checking the win, painting it once", fa: "چک‌کردنِ برد، نقاشیِ یک‌باره‌اش" },
            blocks: [
              {
                type: "code",
                lang: "js",
                code: `function checkWin() {
  if (s1 >= 5) { over = true; status.textContent = "Player 1 wins! 🏆"; }
  if (s2 >= 5) { over = true; status.textContent = "Player 2 wins! 🏆"; }
}

function render() {
  s1El.textContent = "" + s1;
  s2El.textContent = "" + s2;
}`,
              },
              {
                type: "text",
                en: "Win-checking happens right AFTER each mutation — the moment the truth changes is the moment to ask if the game ended. And it writes into the status line, which is painted at startup too: \"First to 5 — tap your side!\". The screen tells the whole story before, during and after the race.",
                fa: "چک‌کردنِ برد درست بعد از هر دگرگونی انجام می‌شود — لحظه‌ای که حقیقت عوض می‌شود، همان لحظه‌ی پرسیدنِ اینکه آیا بازی تمام شد. و در خطِ وضعیت می‌نویسد که موقع استارت هم نقاشی می‌شود: \"First to 5 — tap your side!\". صفحه قبل، حین و بعد از مسابقه، کلِ ماجرا را روایت می‌کند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Click race</title>
  </head>
  <body>
    <h1>Tug of clicks 🪢</h1>
    <button id="p1">Player 1 🐱</button>
    <button id="p2">Player 2 🐶</button>
    <p><span id="s1">0</span> — <span id="s2">0</span></p>
    <p id="status">First to 5 — tap your side!</p>

    <script>
      let s1 = 0, s2 = 0, over = false;
      const s1El = document.querySelector("#s1");
      const s2El = document.querySelector("#s2");
      const status = document.querySelector("#status");

      function render() {
        s1El.textContent = "" + s1;
        s2El.textContent = "" + s2;
      }
      function checkWin() {
        if (s1 >= 5) { over = true; status.textContent = "Player 1 wins! 🏆"; }
        if (s2 >= 5) { over = true; status.textContent = "Player 2 wins! 🏆"; }
      }
      function point1() {
        if (over) return;
        s1 = s1 + 1; render(); checkWin();
      }
      function point2() {
        if (over) return;
        s2 = s2 + 1; render(); checkWin();
      }

      render(); // 0 — 0, race ready
      document.querySelector("#p1").addEventListener("click", point1);
      document.querySelector("#p2").addEventListener("click", point2);
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview and race a friend — five taps end it, the flag blocks the rest.",
                  fa: "پیش‌نمایش را بزن و با یک دوست مسابقه بده — پنج ضربه تمامش می‌کند، پرچم بقیه را سد می‌کند.",
                },
              },
              {
                type: "warn",
                en: "Graders cannot tap: they read the startup paint — scores 0 and 0, status \"First to 5…\". The race itself is yours to play in the preview.",
                fa: "نمره‌دهنده‌ها نمی‌توانند ضربه بزنند: آن‌ها نقاشیِ شروع را می‌خوانند — امتیازهای ۰ و ۰، وضعیتِ \"First to 5…\". مسابقه‌ی واقعی مالِ توست، در پیش‌نمایش.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is the `over` flag for?", fa: "پرچمِ over برای چیست؟" },
                options: [
                  { en: "Counting how many clicks happened", fa: "شمردنِ تعداد کلیک‌ها" },
                  { en: "Guarding the game — after a win, further clicks are ignored", fa: "محافظت از بازی — بعد از برد، کلیک‌های بعدی نادیده گرفته می‌شوند" },
                  { en: "Choosing the winner randomly", fa: "انتخابِ تصادفیِ برنده" },
                ],
                answer: 1,
                explain: {
                  en: "Every handler starts with if (over) return; — the flag freezes the state once the game ends.",
                  fa: "هر هندلر با if (over) return; شروع می‌شود — پرچم بعد از پایانِ بازی state را منجمد می‌کند.",
                },
              },
              {
                q: { en: "When should checkWin() run?", fa: "checkWin() کِی باید اجرا شود؟" },
                options: [
                  { en: "Once at startup only", fa: "فقط یک بار موقع استارت" },
                  { en: "Right after each score changes", fa: "درست بعد از هر تغییری در امتیاز" },
                  { en: "It is never needed", fa: "اصلاً لازم نیست" },
                ],
                answer: 1,
                explain: {
                  en: "The moment the truth changes is the moment to ask whether the game just ended.",
                  fa: "لحظه‌ای که حقیقت عوض می‌شود، همان لحظه‌ی پرسیدنِ این است که آیا بازی همین حالا تمام شد.",
                },
              },
              {
                q: { en: "What does the grader read from the race page?", fa: "نمره‌دهنده از صفحه‌ی مسابقه چه چیزی می‌خواند؟" },
                options: [
                  { en: "The result after simulating 5 clicks", fa: "نتیجه بعد از شبیه‌سازی ۵ کلیک" },
                  { en: "The startup paint: 0 — 0 and the \"First to 5\" status", fa: "نقاشیِ شروع: 0 — 0 و وضعیتِ \"First to 5\"" },
                  { en: "Nothing — races cannot be graded", fa: "هیچی — مسابقه‌ها نمره‌بردار نیستند" },
                ],
                answer: 1,
                explain: {
                  en: "The synchronous first paint is the graded state; the interactive race is for the preview.",
                  fa: "اولین نقاشیِ هم‌زمان همان وضعیتِ نمره‌گرفته است؛ مسابقه‌ی تعاملی مالِ پیش‌نمایش است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Tug of clicks", fa: "طناب‌کشیِ کلیک‌ها" },
            brief: {
              en: "Build the race: state let s1 = 0, s2 = 0, over = false. render() paints #s1 and #s2 (as text). point1 and point2 handlers: if over, return; add 1 to their score; render; checkWin. checkWin sets over = true and writes \"Player 1 wins! 🏆\" / \"Player 2 wins! 🏆\" into #status at 5+. Paint the startup state: scores 0/0 and #status exactly: First to 5 — tap your side!",
              fa: "مسابقه را بساز: state یعنی let s1 = 0، s2 = 0، over = false. ‏render() ‏#s1 و #s2 را (به‌صورت متن) نقاشی می‌کند. هندلرهای point1 و point2: اگر over بود، برگرد؛ یکی به امتیازشان اضافه کن؛ رندر؛ checkWin. ‏checkWin در ۵+ ‏over را true می‌کند و \"Player 1 wins! 🏆\" / \"Player 2 wins! 🏆\" را در #status می‌نویسد. وضعیتِ شروع را نقاشی کن: امتیازها ۰/۰ و #status دقیقاً: First to 5 — tap your side!",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Click race</title>
  </head>
  <body>
    <h1>Tug of clicks 🪢</h1>
    <button id="p1">Player 1 🐱</button>
    <button id="p2">Player 2 🐶</button>
    <p><span id="s1">?</span> — <span id="s2">?</span></p>
    <p id="status">?</p>

    <script>
      // 1) State: let s1 = 0, s2 = 0, over = false;
      // 2) render(): paint #s1 and #s2
      // 3) point1/point2: if (over) return; +1; render(); checkWin();
      // 4) checkWin(): at 5 → over = true, status = "Player X wins! 🏆"
      // 5) Paint startup: scores "0" and status "First to 5 — tap your side!"

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Click race</title>
  </head>
  <body>
    <h1>Tug of clicks 🪢</h1>
    <button id="p1">Player 1 🐱</button>
    <button id="p2">Player 2 🐶</button>
    <p><span id="s1">?</span> — <span id="s2">?</span></p>
    <p id="status">?</p>

    <script>
      // STATE
      let s1 = 0, s2 = 0, over = false;
      const s1El = document.querySelector("#s1");
      const s2El = document.querySelector("#s2");
      const status = document.querySelector("#status");

      // RENDER
      function render() {
        s1El.textContent = "" + s1;
        s2El.textContent = "" + s2;
      }

      // WIN CHECK
      function checkWin() {
        if (s1 >= 5) { over = true; status.textContent = "Player 1 wins! 🏆"; }
        if (s2 >= 5) { over = true; status.textContent = "Player 2 wins! 🏆"; }
      }

      // TWO RULES
      function point1() {
        if (over) return;
        s1 = s1 + 1;
        render();
        checkWin();
      }
      function point2() {
        if (over) return;
        s2 = s2 + 1;
        render();
        checkWin();
      }

      // Startup paint + listen
      render();
      status.textContent = "First to 5 — tap your side!";
      document.querySelector("#p1").addEventListener("click", point1);
      document.querySelector("#p2").addEventListener("click", point2);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "One state line holds all three: let s1 = 0, s2 = 0, over = false;",
                fa: "یک خطِ state هر سه را نگه می‌دارد: let s1 = 0, s2 = 0, over = false;",
              },
              {
                en: "Every point handler starts with if (over) return; — the guard comes FIRST.",
                fa: "هر هندلرِ امتیاز با if (over) return; شروع می‌شود — محافظ اول می‌آید.",
              },
              {
                en: "Startup paint: #s1 and #s2 show 0, #status shows First to 5 — tap your side!",
                fa: "نقاشیِ شروع: #s1 و #s2 عددِ 0، و #status نشان می‌دهد First to 5 — tap your side!",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#s1", text: "0" },
                { selector: "#s2", text: "0" },
                { selector: "#status", text: "First to 5" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m11-l4",
        title: { en: "Game #4: Guess the Number", fa: "بازی ۴: حدسِ عدد" },
        goal: {
          en: "Build a comparison game around a pinned secret — deterministic on every run, gradeable by machines.",
          fa: "یک بازیِ مقایسه‌ای حولِ یک رازِ ثابت بسازی — در هر اجرا قطعی، و قابل نمره‌دهی توسط ماشین.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "The pinned secret", fa: "رازِ ثابت‌شده" },
            blocks: [
              {
                type: "text",
                en: "A guessing game lives on a secret number. Games in the wild pick it randomly — but random is poison for anything graded: every run would differ. The course convention: PIN the secret as a const. `const SECRET = 9;` — every run identical, every game fair, every grader able to verify your logic.",
                fa: "بازیِ حدس روی یک عددِ راز زندگی می‌کند. بازی‌های بیرونی آن را تصادفی انتخاب می‌کنند — اما تصادف برای هرچیزی که نمره بگیرد سم است: هر اجرا فرق می‌کرد. قراردادِ این دوره: راز را به‌صورت const ثابت کن. ‏`const SECRET = 9;` — هر اجرا یکسان، هر بازی منصفانه، و هر نمره‌دهنده قادر به تأییدِ منطقت.",
              },
              {
                type: "code",
                lang: "js",
                code: `const SECRET = 9;

function evaluate() {
  const guess = Number(input.value); // text → real number
  if (guess === SECRET) {
    msg.textContent = "🎉 You got it!";
  } else if (guess < SECRET) {
    msg.textContent = "Too low! ⬇️";
  } else {
    msg.textContent = "Too high! ⬆️";
  }
}`,
              },
              {
                type: "tip",
                en: "Number(input.value) converts the typed TEXT into a real number. Without it, \"10\" < 9 compares strings character-by-character and lies to you. Convert first, compare second.",
                fa: "‏Number(input.value) متنِ تایپ‌شده را به عددِ واقعی تبدیل می‌کند. بدون آن، \"10\" < 9 رشته‌ها را حرف‌به‌حرف مقایسه می‌کند و به تو دروغ می‌گوید. اول تبدیل کن، بعد مقایسه کن.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Seed the guess, evaluate once", fa: "حدس را بکار، یک بار ارزیابی کن" },
            blocks: [
              {
                type: "text",
                en: "The three-branch if is the whole game logic — and it can run without any click. Pre-fill the input with `value=\"4\"`, call `evaluate()` once at startup, and the page opens with a real verdict painted: \"Too low! ⬇️\". Then attach the button so every new guess re-evaluates. Startup logic + live logic, same function.",
                fa: "‏if سه‌شاخه کلِ منطقِ بازی است — و می‌تواند بدون هیچ کلیکی اجرا شود. input را با `value=\"4\"` از قبل پر کن، `evaluate()` را یک بار موقع استارت صدا بزن، و صفحه با یک حکمِ واقعیِ نقاشی‌شده باز می‌شود: \"Too low! ⬇️\". بعد دکمه را وصل کن تا هر حدسِ جدید دوباره ارزیابی شود. منطقِ شروع + منطقِ زنده، همان یک تابع.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Guess the number</title>
  </head>
  <body>
    <h1>Crack the safe 🔐</h1>
    <input id="guess" value="4" placeholder="1–20">
    <button id="try">Try</button>
    <p id="msg">...</p>

    <script>
      const SECRET = 9;
      const input = document.querySelector("#guess");
      const msg = document.querySelector("#msg");

      function evaluate() {
        const guess = Number(input.value);
        if (guess === SECRET) {
          msg.textContent = "🎉 You got it!";
        } else if (guess < SECRET) {
          msg.textContent = "Too low! ⬇️";
        } else {
          msg.textContent = "Too high! ⬆️";
        }
      }

      evaluate(); // first verdict, painted at startup
      document.querySelector("#try").addEventListener("click", evaluate);
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview: the safe already judged 4 as too low. Type 9 and press Try.",
                  fa: "پیش‌نمایش را بزن: گاوصندوق ۴ را از قبل «خیلی کم» حکم زده. عدد ۹ را تایپ کن و Try را بزن.",
                },
              },
              {
                type: "warn",
                en: "Three-branch if reads top-down: equality first, then too-low, then the else must be too-high. Reordering the branches breaks the logic in ways that are painful to spot.",
                fa: "‏if سه‌شاخه از بالا به پایین خوانده می‌شود: اول برابری، بعد خیلی-کم، و else ناچار خیلی-زیاد است. جابه‌جاییِ شاخه‌ها منطق را جوری می‌شکند که پیدا کردنش دردناک است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why is the secret a pinned const instead of a random number?", fa: "چرا راز یک const ثابت است نه یک عددِ تصادفی؟" },
                options: [
                  { en: "Random numbers are slow", fa: "اعداد تصادفی کندند" },
                  { en: "Every run must be identical and deterministic — especially for grading", fa: "هر اجرا باید یکسان و قطعی باشد — مخصوصاً برای نمره‌دهی" },
                  { en: "Const secrets are harder to guess", fa: "رازهای const سخت‌تر حدس زده می‌شوند" },
                ],
                answer: 1,
                explain: {
                  en: "Pinned constants make every run reproducible — the fair way to grade logic.",
                  fa: "ثابت‌های پین‌شده هر اجرا را بازتولیدپذیر می‌کنند — راهِ منصفانه‌ی نمره‌دادن به منطق.",
                },
              },
              {
                q: { en: "What does Number(input.value) do?", fa: "Number(input.value) چه می‌کند؟" },
                options: [
                  { en: "Rounds the input to 2 decimals", fa: "ورودی را به ۲ رقمِ اعشار گرد می‌کند" },
                  { en: "Converts the typed text into a real number for comparisons", fa: "متنِ تایپ‌شده را به عددِ واقعی برای مقایسه تبدیل می‌کند" },
                  { en: "Nothing — inputs are already numbers", fa: "هیچی — inputها از قبل عددند" },
                ],
                answer: 1,
                explain: {
                  en: "input.value is always a string; Number() turns \"10\" into 10 so < and > compare sizes, not letters.",
                  fa: "‏input.value همیشه رشته است؛ Number()‏ \"10\" را به ۱۰ تبدیل می‌کند تا < و > سایز را مقایسه کنند نه حرف‌ها را.",
                },
              },
              {
                q: { en: "With SECRET = 9, which branch runs for a guess of 12?", fa: "با SECRET = 9، برای حدسِ ۱۲ کدام شاخه اجرا می‌شود؟" },
                options: [
                  { en: "\"🎉 You got it!\"", fa: "\"🎉 You got it!\"" },
                  { en: "\"Too low! ⬇️\"", fa: "\"Too low! ⬇️\"" },
                  { en: "\"Too high! ⬆️\"", fa: "\"Too high! ⬆️\"" },
                ],
                answer: 2,
                explain: {
                  en: "12 is not equal to 9 and not less than 9 — the else branch catches it: too high.",
                  fa: "۱۲ نه برابرِ ۹ است نه کمتر از آن — شاخه‌ی else آن را می‌گیرد: خیلی زیاد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Crack the safe", fa: "گاوصندوق را باز کن" },
            brief: {
              en: "The input #guess is pre-filled with 4 and #try is the button. Pin const SECRET = 9. Write evaluate(): read Number(input.value), render \"🎉 You got it!\" / \"Too low! ⬇️\" / \"Too high! ⬆️\" into #msg by comparison. Call evaluate() once at startup (grader reads the verdict for 4: Too low!) and attach it to #try's click.",
              fa: "input‌ی به نام #guess با ۴ از قبل پر شده و #try دکمه است. ‏const SECRET = 9 را پین کن. ‏evaluate() را بنویس: Number(input.value) را بخوان، و با مقایسه \"🎉 You got it!\" / \"Too low! ⬇️\" / \"Too high! ⬆️\" را در #msg رندر کن. ‏evaluate() را یک بار موقع استارت صدا بزن (نمره‌دهنده حکمِ ۴ را می‌خواند: Too low!) و به رویدادِ کلیکِ #try وصلش کن.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Guess the number</title>
  </head>
  <body>
    <h1>Crack the safe 🔐</h1>
    <input id="guess" value="4" placeholder="1–20">
    <button id="try">Try</button>
    <p id="msg">...</p>

    <script>
      // 1) const SECRET = 9;
      // 2) evaluate(): Number(input.value) → compare with SECRET
      //    🎉 You got it!  /  Too low! ⬇️  /  Too high! ⬆️
      // 3) evaluate() once at startup
      // 4) Listen: #try click → evaluate

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Guess the number</title>
  </head>
  <body>
    <h1>Crack the safe 🔐</h1>
    <input id="guess" value="4" placeholder="1–20">
    <button id="try">Try</button>
    <p id="msg">...</p>

    <script>
      // The pinned secret — every run identical
      const SECRET = 9;
      const input = document.querySelector("#guess");
      const msg = document.querySelector("#msg");

      function evaluate() {
        const guess = Number(input.value); // text → number
        if (guess === SECRET) {
          msg.textContent = "🎉 You got it!";
        } else if (guess < SECRET) {
          msg.textContent = "Too low! ⬇️";
        } else {
          msg.textContent = "Too high! ⬆️";
        }
      }

      // First verdict, painted at startup
      evaluate();

      // Live: every Try re-evaluates
      document.querySelector("#try").addEventListener("click", evaluate);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Three branches in order: === SECRET, then < SECRET, then plain else.",
                fa: "سه شاخه به‌ترتیب: === SECRET، بعد < SECRET، بعد else ساده.",
              },
              {
                en: "With SECRET = 9 and input value 4: 4 < 9 → \"Too low! ⬇️\" is the startup verdict.",
                fa: "با SECRET = 9 و مقدارِ ۴ در input: ‏۴ < ۹ ← \"Too low! ⬇️\" همان حکمِ شروع است.",
              },
              {
                en: "The listener reuses the same function: addEventListener(\"click\", evaluate).",
                fa: "listener همان تابع را دوباره استفاده می‌کند: addEventListener(\"click\", evaluate).",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#msg", text: "Too low!" },
                { selector: "#guess", attrName: "value", attrValue: "4" },
                { selector: "#try", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 12 ───────────────────────────────────────────
  {
    id: "js-m12",
    title: { en: "Data & Storage", fa: "داده و ذخیره‌سازی" },
    blurb: {
      en: "Real apps run on structured data: arrays of objects, the JSON suitcase, search & filter — and where pages remember things between visits.",
      fa: "اپ‌های واقعی روی داده‌ی ساخت‌یافته می‌چرخند: آرایه‌ای از شیءها، چمدانِ JSON، جست‌وجو و فیلتر — و اینکه صفحه‌ها بین دو بازدید چه‌چیز را به‌خاطر می‌سپارند.",
    },
    lessons: [
      {
        id: "js-m12-l1",
        title: { en: "Arrays of Objects", fa: "آرایه‌ای از شیءها" },
        goal: {
          en: "Render a catalog from an array of objects — the exact shape of data behind every real product list.",
          fa: "یک کاتالوگ را از آرایه‌ای از شیءها رندر کنی — دقیقاً همان شکلی که پشتِ هر فهرستِ محصولِ واقعی است.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Records with labels", fa: "رکوردهایی با برچسب" },
            blocks: [
              {
                type: "text",
                en: "Flat arrays hold simple values — names, numbers. Real data arrives richer: an ARRAY OF OBJECTS, where each object is one RECORD with labeled fields. `products[0]` is the first record; `products[0].name` is its name field. Array gives you the position, the object gives you the meaning.",
                fa: "آرایه‌های ساده مقدارهای خام نگه می‌دارند — اسم، عدد. داده‌ی واقعی ثروتمندتر می‌رسد: یک آرایه‌ای از شیءها، که هر شیء یک رکورد با فیلدهای برچسب‌دار است. ‏`products[0]` اولین رکورد است؛ `products[0].name` فیلدِ نامِ آن. آرایه جایگاه را می‌دهد، شیء معنا را.",
              },
              {
                type: "code",
                lang: "js",
                code: `const products = [
  { name: "Laptop", price: 900 },
  { name: "Mouse", price: 25 },
  { name: "Cable", price: 8 },
];

console.log(products.length);     // 3 records
console.log(products[0].name);    // "Laptop"
console.log(products[1].price);   // 25`,
              },
              {
                type: "tip",
                en: "Field names are a contract with yourself: every record has name and price, spelled identically. One typo in a field name and that record renders 'undefined' — the classic symptom of a broken contract.",
                fa: "نامِ فیلدها یک قرارداد با خودت است: هر رکورد name و price دارد، با املاهای کاملاً یکسان. یک غلطِ املایی در نامِ فیلد و آن رکورد «undefined» رندر می‌کند — نشانه‌ی کلاسیکِ قراردادِ شکسته.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Records become cards", fa: "رکوردها کارت می‌شوند" },
            blocks: [
              {
                type: "text",
                en: "The render-from-data pattern you built in the DOM module now eats objects: loop the array, and inside each pass read TWO fields to build one richer row. Template literals make the assembled text readable — backticks with `${...}` holes instead of a chain of plus signs.",
                fa: "الگویِ رندر-از-داده‌ای که در ماژولِ DOM ساختی، حالا شیء می‌خورد: روی آرایه حلقه بزن و در هر گذر دو فیلد را بخوان تا یک ردیفِ ثروتمندتر بسازی. تمپلیت لیترال‌ها متنِ مونتاژشده را خوانا می‌کنند — بک‌تیک با حفره‌های `${...}` به‌جای زنجیره‌ای از علامتِ +.",
              },
              {
                type: "code",
                lang: "js",
                code: `const shelf = document.querySelector("#shelf");

for (const product of products) {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = \`\${product.name} — $\${product.price}\`;
  shelf.append(card);
}`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .card { border: 1px solid #ddd; border-radius: 8px;
              padding: 8px; margin: 6px 0; }
    </style>
  </head>
  <body>
    <h1>Shop shelf 🛒</h1>
    <div id="shelf"></div>

    <script>
      const products = [
        { name: "Laptop", price: 900 },
        { name: "Mouse", price: 25 },
        { name: "Cable", price: 8 },
      ];
      const shelf = document.querySelector("#shelf");

      for (const product of products) {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = product.name + " — $" + product.price;
        shelf.append(card);
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — three records, three cards, each built from two labeled fields.",
                  fa: "پیش‌نمایش را بزن — سه رکورد، سه کارت، هرکدام از دو فیلدِ برچسب‌دار ساخته شده.",
                },
              },
              {
                type: "warn",
                en: "The object fields are READ here, never typed twice: add a fourth product to the array and the loop renders a fourth card with zero extra code. That is the data-driven way.",
                fa: "فیلدهای شیء اینجا فقط خوانده می‌شوند، هرگز دوباره تایپ نمی‌شوند: محصولِ چهارمی به آرایه اضافه کن و حلقه یک کارتِ چهارم رندر می‌کند، با صفر کدِ اضافه. این همان راهِ داده‌محور است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "With products = [{ name: \"Laptop\", price: 900 }, { name: \"Mouse\", price: 25 }], what is products[1].price?", fa: "با products = [{ name: \"Laptop\", price: 900 }, { name: \"Mouse\", price: 25 }]، مقدار products[1].price چیست؟" },
                options: [
                  { en: "900 — the first record", fa: "۹۰۰ — اولین رکورد" },
                  { en: "25 — the second record's price field", fa: "۲۵ — فیلدِ price رکورد دوم" },
                  { en: "undefined", fa: "undefined" },
                ],
                answer: 1,
                explain: {
                  en: "Index [1] selects the second object, then .price reads its price field.",
                  fa: "اندیس [1] شیءِ دوم را انتخاب می‌کند، بعد ‎.price فیلدِ قیمتش را می‌خواند.",
                },
              },
              {
                q: { en: "What does products.length tell you?", fa: "‏products.length چه چیزی را می‌گوید؟" },
                options: [
                  { en: "How many fields each object has", fa: "هر شیء چند فیلد دارد" },
                  { en: "How many records the array holds", fa: "آرایه چند رکورد دارد" },
                  { en: "The longest product name", fa: "بلندترین نامِ محصول" },
                ],
                answer: 1,
                explain: {
                  en: "length counts array items — here, the number of product records.",
                  fa: "length آیتم‌های آرایه را می‌شمارد — اینجا یعنی تعداد رکوردهای محصول.",
                },
              },
              {
                q: { en: "A card renders \"undefined — $25\". What most likely broke?", fa: "یک کارت \"undefined — $25\" رندر کرده. به احتمال زیاد چه چیزی شکسته؟" },
                options: [
                  { en: "The loop ran too many times", fa: "حلقه زیادی چرخیده" },
                  { en: "A field name typo — like product.nam instead of product.name", fa: "یک غلطِ املایی در نامِ فیلد — مثل product.nam به‌جای product.name" },
                  { en: "The div has the wrong class", fa: "div کلاسِ اشتباهی دارد" },
                ],
                answer: 1,
                explain: {
                  en: "undefined means the field you asked for does not exist on that object — check the spelling of the field name.",
                  fa: "undefined یعنی فیلدی که خواستی روی آن شیء وجود ندارد — املاِ نامِ فیلد را چک کن.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Shop shelf", fa: "قفسه‌ی فروشگاه" },
            brief: {
              en: "The products array (3 items, each with name and price) is already in the script. Loop it and for each product create a <div class=\"card\"> inside #shelf with textContent: product.name + \" — $\" + product.price. The shelf must end with exactly 3 cards.",
              fa: "آرایه‌ی products (۳ آیتم، هرکدام با name و price) از قبل در اسکریپت هست. رویش حلقه بزن و برای هر محصول یک <div class=\"card\"> داخل #shelf بساز با textContent: product.name + \" — $\" + product.price. قفسه در انتها باید دقیقاً ۳ کارت داشته باشد.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .card { border: 1px solid #ddd; border-radius: 8px;
              padding: 8px; margin: 6px 0; }
    </style>
  </head>
  <body>
    <h1>Shop shelf 🛒</h1>
    <div id="shelf"></div>

    <script>
      // Data (do not change):
      const products = [
        { name: "Laptop", price: 900 },
        { name: "Mouse", price: 25 },
        { name: "Cable", price: 8 },
      ];
      // Loop: for each product, create div.card,
      // textContent = product.name + " — $" + product.price,
      // append to #shelf 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .card { border: 1px solid #ddd; border-radius: 8px;
              padding: 8px; margin: 6px 0; }
    </style>
  </head>
  <body>
    <h1>Shop shelf 🛒</h1>
    <div id="shelf"></div>

    <script>
      const products = [
        { name: "Laptop", price: 900 },
        { name: "Mouse", price: 25 },
        { name: "Cable", price: 8 },
      ];
      const shelf = document.querySelector("#shelf");

      // One record → one card
      for (const product of products) {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = product.name + " — $" + product.price;
        shelf.append(card);
      }
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Same loop skeleton as the leaderboard — only the field reads changed: product.name, product.price.",
                fa: "همان اسکلتِ حلقه‌ی جدولِ امتیازات — فقط خواندنِ فیلدها عوض شده: product.name، ‏product.price.",
              },
              {
                en: "Set className = \"card\" so the CSS styles every card.",
                fa: "‏className = \"card\" را بگذار تا CSS هر کارت را استایل بدهد.",
              },
              {
                en: "First card must read exactly: Laptop — $900",
                fa: "کارتِ اول باید دقیقاً این باشد: Laptop — $900",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".card", count: 3 },
                { selector: ".card", text: "Laptop" },
                { selector: "#shelf", text: "$900" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m12-l2",
        title: { en: "JSON — The Data Suitcase", fa: "JSON — چمدانِ داده" },
        goal: {
          en: "Pack objects into JSON strings with stringify and unpack them back with parse — the round trip behind every save and every API.",
          fa: "شیءها را با stringify داخل رشته‌ی JSON بسته‌بندی کنی و با parse بازشان کنی — همان رفت‌وبرگشتی که پشتِ هر ذخیره و هر API است.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Objects that travel", fa: "شیءهایی که سفر می‌کنند" },
            blocks: [
              {
                type: "text",
                en: "A JavaScript object lives only in memory — the moment the page closes, it is gone. JSON is the TEXT form of an object: a string that can be stored in a file, sent over the network, or saved in the browser. `JSON.stringify(object)` packs the object into such a string; `JSON.parse(string)` unpacks it back into a living object. Pack, travel, unpack.",
                fa: "یک شیءِ جاوااسکریپت فقط در حافظه زندگی می‌کند — همان لحظه که صفحه بسته شود، می‌میرد. JSON فرمِ متنیِ شیء است: رشته‌ای که می‌شود در فایل ذخیره‌اش کرد، روی شبکه فرستاد یا در مرورگر نگه داشت. ‏`JSON.stringify(object)` شیء را داخل چنین رشته‌ای بسته‌بندی می‌کند؛ `JSON.parse(string)` آن را به شیءِ زنده برمی‌گرداند. بسته‌بندی، سفر، بازکردن.",
              },
              {
                type: "code",
                lang: "js",
                code: `const user = { name: "Sara", streak: 4 };

const packed = JSON.stringify(user);
// '{"name":"Sara","streak":4}'  ← a plain string now

const unpacked = JSON.parse(packed);
console.log(unpacked.streak); // 4 — alive again`,
              },
              {
                type: "tip",
                en: "JSON looks like a JS object but it is a stricter dialect: keys wear double quotes, and there are no functions or comments — data only. If parse crashes, the string was not valid JSON.",
                fa: "JSON شبیه شیءِ JS است ولی لهجه‌ی سخت‌گیرانه‌تری دارد: کلیدها گیومه‌ی دوتایی دارند و نه تابعی در کار است نه کامنتی — فقط داده. اگر parse کرش کرد، یعنی رشته JSON معتبر نبوده.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The round trip, rendered", fa: "رفت‌وبرگشت، رندرشده" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>JSON round trip</title>
  </head>
  <body>
    <h1>Data suitcase 🧳</h1>
    <p id="raw">...</p>
    <p id="alive">...</p>

    <script>
      const user = { name: "Sara", streak: 4 };

      // Pack it — now it is a string you could save anywhere
      const packed = JSON.stringify(user);
      document.querySelector("#raw").textContent = packed;

      // Unpack it — a living object again
      const unpacked = JSON.parse(packed);
      document.querySelector("#alive").textContent =
        unpacked.name + " has a " + unpacked.streak + "-day streak";
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — #raw shows the packed string, #alive proves the unpacked object works.",
                  fa: "پیش‌نمایش را بزن — #raw رشته‌ی بسته‌بندی‌شده را نشان می‌دهد و #alive ثابت می‌کند شیءِ بازشده کار می‌کند.",
                },
              },
              {
                type: "warn",
                en: "JSON.parse trusts its input. Parsing broken or hostile JSON throws an error and stops the script — only parse strings you wrote or that came from a source you trust.",
                fa: "‏JSON.parse به ورودی‌اش اعتماد می‌کند. parse‌کردنِ JSON خراب یا خطرناک خطا می‌دهد و اسکریپت را می‌ایستاند — فقط رشته‌هایی را parse کن که خودت نوشته‌ای یا از منبعی مطمئن آمده‌اند.",
              },
              {
                type: "text",
                en: "Why should a beginner care? Because storage and APIs speak ONLY strings: localStorage stores strings, servers answer with strings. stringify is the boarding pass that lets your objects travel, parse is passport control on arrival.",
                fa: "چرا یک تازه‌کار باید بهش اهمیت بدهد؟ چون ذخیره‌سازی و APIها فقط رشته حرف می‌زنند: localStorage رشته ذخیره می‌کند، سرورها با رشته جواب می‌دهند. stringify همان بلیتِ پرواز است که اجازه می‌دهد شیءهایت سفر کنند، parse هم کنترلِ گذرنامه هنگام رسیدن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does JSON.stringify(user) return?", fa: "‏JSON.stringify(user) چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "A copy of the object", fa: "یک کپی از شیء" },
                  { en: "A JSON string — the text form of the object", fa: "یک رشته‌ی JSON — فرمِ متنیِ شیء" },
                  { en: "The number of fields in the object", fa: "تعداد فیلدهای شیء" },
                ],
                answer: 1,
                explain: {
                  en: "stringify packs the object into a string like '{\"name\":\"Sara\"}' — storable and sendable.",
                  fa: "stringify شیء را داخل رشته‌ای مثل '{\"name\":\"Sara\"}' بسته‌بندی می‌کند — قابل ذخیره و قابل ارسال.",
                },
              },
              {
                q: { en: "What does JSON.parse(packed) return?", fa: "‏JSON.parse(packed) چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "A living object with real fields you can read", fa: "یک شیءِ زنده با فیلدهای واقعی که می‌توانی بخوانی" },
                  { en: "A longer string", fa: "یک رشته‌ی طولانی‌تر" },
                  { en: "true if the JSON is valid", fa: "اگر JSON معتبر باشد true" },
                ],
                answer: 0,
                explain: {
                  en: "parse unpacks the string back into an object — unpacked.streak is a number again.",
                  fa: "parse رشته را دوباره به شیء باز می‌کند — unpacked.streak دوباره یک عدد است.",
                },
              },
              {
                q: { en: "Why does JSON exist at all?", fa: "اصلاً JSON چرا وجود دارد؟" },
                options: [
                  { en: "Objects only live in memory; JSON is the text form that can be stored and sent", fa: "شیءها فقط در حافظه زندگی می‌کنند؛ JSON فرمِ متنی است که می‌شود ذخیره و ارسالش کرد" },
                  { en: "It makes code run faster", fa: "کد را سریع‌تر اجرا می‌کند" },
                  { en: "It is a replacement for HTML", fa: "جایگزینِ HTML است" },
                ],
                answer: 0,
                explain: {
                  en: "Storage and networks speak strings — stringify/parse is the bridge between those strings and your objects.",
                  fa: "ذخیره‌سازی و شبکه با رشته حرف می‌زنند — stringify/parse همان پلِ بین آن رشته‌ها و شیءهای توست.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Save & load", fa: "ذخیره و بارگذاری" },
            brief: {
              en: "Two moves. 1) The script has const saved = '{\"name\":\"Dara\",\"level\":3}' — pretend this came from storage. JSON.parse it into a variable and render into #profile: \"Player: \" + name + \" — Level \" + level. 2) Build const snapshot = { clicks: 12, best: 42 } and render JSON.stringify(snapshot) into #raw as text.",
              fa: "دو حرکت. ۱) اسکریپت const saved = '{\"name\":\"Dara\",\"level\":3}' را دارد — فرض کن از ذخیره‌سازی آمده. آن را با JSON.parse در یک متغیر بریز و در #profile رندر کن: \"Player: \" + name + \" — Level \" + level. ۲) ‏const snapshot = { clicks: 12, best: 42 } را بساز و JSON.stringify(snapshot) را به‌صورت متن در #raw رندر کن.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Save & load</title>
  </head>
  <body>
    <h1>Data suitcase 🧳</h1>
    <p id="profile">...</p>
    <p id="raw">...</p>

    <script>
      // Pretend this string came from storage:
      const saved = '{"name":"Dara","level":3}';
      // 1) JSON.parse(saved) → render "Player: Dara — Level 3" into #profile
      // 2) const snapshot = { clicks: 12, best: 42 };
      //    JSON.stringify(snapshot) → #raw as text

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Save & load</title>
  </head>
  <body>
    <h1>Data suitcase 🧳</h1>
    <p id="profile">...</p>
    <p id="raw">...</p>

    <script>
      // Pretend this string came from storage:
      const saved = '{"name":"Dara","level":3}';

      // 1) Unpack and render the record
      const player = JSON.parse(saved);
      document.querySelector("#profile").textContent =
        "Player: " + player.name + " — Level " + player.level;

      // 2) Pack a fresh object and show the string
      const snapshot = { clicks: 12, best: 42 };
      document.querySelector("#raw").textContent = JSON.stringify(snapshot);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Parse first: const player = JSON.parse(saved); — then read player.name and player.level.",
                fa: "اول parse کن: const player = JSON.parse(saved); — بعد player.name و player.level را بخوان.",
              },
              {
                en: "For #raw, assign the STRING that stringify returns — no extra text around it.",
                fa: "برای #raw همان رشته‌ای را بگذار که stringify برمی‌گرداند — بدون متنِ اضافه دورش.",
              },
              {
                en: "Expected: #profile = Player: Dara — Level 3 · #raw = {\"clicks\":12,\"best\":42}",
                fa: "مورد انتظار: #profile = Player: Dara — Level 3 · #raw = {\"clicks\":12,\"best\":42}",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#profile", text: "Player: Dara — Level 3" },
                { selector: "#raw", text: '"best":42' },
                { selector: "#raw", text: '"clicks":12' },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m12-l3",
        title: { en: "Search & Filter", fa: "جست‌وجو و فیلتر" },
        goal: {
          en: "Render only the records that pass a condition — the filter pattern behind every search result page.",
          fa: "فقط رکوردهایی را رندر کنی که از یک شرط رد می‌شوند — الگویِ فیلترِ پشتِ هر صفحه‌ی نتیجه‌ی جست‌وجو.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "The filter pattern", fa: "الگویِ فیلتر" },
            blocks: [
              {
                type: "text",
                en: "Nobody renders a whole library — they render the MATCHES. The filter pattern is a loop with one `if` inside: for every record, ask a yes/no question, and only when the answer is yes, create and append the element. The rule lives in exactly one line; change the rule, the rendered page follows.",
                fa: "هیچ‌کس کلِ کتابخانه را رندر نمی‌کند — MATCHها را رندر می‌کند. الگویِ فیلتر یک حلقه با یک `if` داخلش است: برای هر رکورد یک سؤالِ بله/خیر بپرس، و فقط وقتی جواب بله بود، عنصر را بساز و وصل کن. قاعده دقیقاً در یک خط زندگی می‌کند؛ قاعده را عوض کن، صفحه‌ی رندرشده دنبالش می‌آید.",
              },
              {
                type: "code",
                lang: "js",
                code: `const list = document.querySelector("#short");

for (const book of books) {
  if (book.pages < 200) {           // ← the rule, one line
    const li = document.createElement("li");
    li.textContent = book.title + " — short read";
    list.append(li);
  }
}`,
              },
              {
                type: "tip",
                en: "Counting and rendering ride the same loop: bump a counter inside the same if, and you get both the filtered list AND the \"2 of 4 match\" summary in one pass.",
                fa: "شمردن و رندرکردن سوارِ همان یک حلقه‌اند: داخل همان if یک شمارنده را بالا ببر تا هم فهرستِ فیلترشده را بگیری هم خلاصه‌ی «۲ از ۴» را، در یک گذر.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Filters in the wild", fa: "فیلترها در طبیعت" },
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
    <h1>Weekend shelf 📚</h1>
    <p id="info">?</p>
    <ul id="short"></ul>

    <script>
      const books = [
        { title: "JS Basics", pages: 180 },
        { title: "Big History", pages: 640 },
        { title: "CSS Art", pages: 120 },
        { title: "Deep Web", pages: 310 },
      ];
      const list = document.querySelector("#short");
      const info = document.querySelector("#info");
      let matches = 0;

      for (const book of books) {
        if (book.pages < 200) {
          const li = document.createElement("li");
          li.textContent = book.title + " — " + book.pages + " pages";
          list.append(li);
          matches = matches + 1;
        }
      }

      info.textContent = "Short books: " + matches;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — two of the four books pass the < 200 rule, and the summary agrees.",
                  fa: "پیش‌نمایش را بزن — دو کتاب از چهار کتاب از قاعده‌ی < 200 رد می‌شوند و خلاصه هم با آن‌ها موافق است.",
                },
              },
              {
                type: "text",
                en: "This exact shape — data, one rule, matches rendered with a counter — is a search results page in miniature. Swap `book.pages < 200` for `item.price < 50` or `user.score > 100` and you have a shop filter, a leaderboard cutoff, an inbox search.",
                fa: "دقیقاً همین شکل — داده، یک قاعده، رندرِ matchها با یک شمارنده — یک صفحه‌ی نتیجه‌ی جست‌وجو در ابعاد مینیاتوری است. ‏`book.pages < 200` را با `item.price < 50` یا `user.score > 100` عوض کن و یک فیلترِ فروشگاه، خطِ بریدگیِ جدولِ امتیازات یا جست‌وجوی ایمیل داری.",
              },
              {
                type: "warn",
                en: "Zero matches is a valid outcome: the loop runs, the if never fires, the list stays empty. Real UIs paint a friendly \"no results\" message for that case — you will add such fallbacks in bigger projects.",
                fa: "صفر match هم یک نتیجه‌ی معتبر است: حلقه می‌چرخد، if هرگز شلیک نمی‌کند، فهرست خالی می‌ماند. رابط‌های واقعی برای این حالت یک پیامِ دوستانه‌ی «نتیجه‌ای نبود» نقاشی می‌کنند — در پروژه‌های بزرگ‌تر چنین fallbackهایی اضافه خواهی کرد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Where does the filter rule live in the pattern?", fa: "قاعده‌ی فیلتر در این الگو کجا زندگی می‌کند؟" },
                options: [
                  { en: "In the createElement call", fa: "داخل صدازدنِ createElement" },
                  { en: "In one if statement inside the loop", fa: "در یک if داخل حلقه" },
                  { en: "In the CSS", fa: "در CSS" },
                ],
                answer: 1,
                explain: {
                  en: "One if = one rule. Every record is asked the question; only yes-answers get rendered.",
                  fa: "یک if = یک قاعده. از هر رکورد سؤال پرسیده می‌شود؛ فقط جواب‌های بله رندر می‌شوند.",
                },
              },
              {
                q: { en: "How do you also COUNT the matches while filtering?", fa: "هم‌زمان با فیلترکردن، matchها را چطور بشماری؟" },
                options: [
                  { en: "Run a second loop over the DOM", fa: "یک حلقه‌ی دوم روی DOM بینداز" },
                  { en: "Bump a counter inside the same if", fa: "داخل همان if یک شمارنده را بالا ببر" },
                  { en: "Count the children of body", fa: "فرزندهای body را بشمار" },
                ],
                answer: 1,
                explain: {
                  en: "matches = matches + 1 inside the if counts exactly the records that pass — one pass does both jobs.",
                  fa: "‏matches = matches + 1 داخل if دقیقاً رکوردهای ردشده را می‌شمارد — یک گذر هر دو کار را می‌کند.",
                },
              },
              {
                q: { en: "No book passes the rule. What does the page show?", fa: "هیچ کتابی از قاعده رد نمی‌شود. صفحه چه نشان می‌دهد؟" },
                options: [
                  { en: "An error", fa: "خطا" },
                  { en: "An empty list — and a good UI would say \"no results\"", fa: "یک فهرست خالی — و یک UI خوب می‌گوید «نتیجه‌ای نبود»" },
                  { en: "All the books anyway", fa: "به‌هرحال همه‌ی کتاب‌ها" },
                ],
                answer: 1,
                explain: {
                  en: "Zero matches renders zero elements — the loop simply never reaches createElement.",
                  fa: "صفر match یعنی صفر عنصرِ رندرشده — حلقه هیچ‌وقت به createElement نمی‌رسد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Short books shelf", fa: "قفسه‌ی کتاب‌های کوتاه" },
            brief: {
              en: "The books array (4 records with title and pages) is provided. Filter it: render ONLY the books with pages < 200 into #short, each as a <li class=\"book\"> with textContent: book.title + \" — \" + book.pages + \" pages\". Count the matches in the same loop and render \"Short books: 2\" into #info.",
              fa: "آرایه‌ی books (۴ رکورد با title و pages) از قبل هست. فیلترش کن: فقط کتاب‌هایی را که pages < 200 دارند در #short رندر کن، هرکدام به‌صورت <li class=\"book\"> با textContent: book.title + \" — \" + book.pages + \" pages\". تعدادِ matchها را در همان حلقه بشمار و \"Short books: 2\" را در #info رندر کن.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Short books</title>
  </head>
  <body>
    <h1>Weekend shelf 📚</h1>
    <p id="info">?</p>
    <ul id="short"></ul>

    <script>
      // Data (do not change):
      const books = [
        { title: "JS Basics", pages: 180 },
        { title: "Big History", pages: 640 },
        { title: "CSS Art", pages: 120 },
        { title: "Deep Web", pages: 310 },
      ];
      // 1) Loop books; if book.pages < 200:
      //      create li.book, textContent = title + " — " + pages + " pages"
      //      append to #short, count it
      // 2) #info ← "Short books: " + count

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Short books</title>
  </head>
  <body>
    <h1>Weekend shelf 📚</h1>
    <p id="info">?</p>
    <ul id="short"></ul>

    <script>
      const books = [
        { title: "JS Basics", pages: 180 },
        { title: "Big History", pages: 640 },
        { title: "CSS Art", pages: 120 },
        { title: "Deep Web", pages: 310 },
      ];
      const list = document.querySelector("#short");
      const info = document.querySelector("#info");
      let matches = 0;

      for (const book of books) {
        if (book.pages < 200) { // the rule
          const li = document.createElement("li");
          li.className = "book";
          li.textContent = book.title + " — " + book.pages + " pages";
          list.append(li);
          matches = matches + 1;
        }
      }

      info.textContent = "Short books: " + matches;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The if guards THREE lines: create the li, fill it, append it — plus the counting line.",
                fa: "if سه خط را محافظت می‌کند: li را بساز، پرش کن، وصلش کن — به‌اضافه‌ی خطِ شمردن.",
              },
              {
                en: "180 and 120 pass the < 200 rule; 640 and 310 must NOT appear.",
                fa: "‏۱۸۰ و ۱۲۰ از قاعده‌ی < 200 رد می‌شوند؛ ۶۴۰ و ۳۱۰ نباید ظاهر شوند.",
              },
              {
                en: "Summary must read exactly: Short books: 2",
                fa: "خلاصه باید دقیقاً این باشد: Short books: 2",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".book", count: 2 },
                { selector: "#short", text: "CSS Art" },
                { selector: "#short", text: "JS Basics" },
                { selector: "#info", text: "Short books: 2" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m12-l4",
        title: { en: "Remembering: localStorage", fa: "به‌خاطر سپردن: localStorage" },
        goal: {
          en: "Understand how pages remember data between visits with localStorage — and why graded code parses a fixed string instead of touching storage.",
          fa: "بفهمی صفحه‌ها بین دو بازدید چطور داده را با localStorage به‌خاطر می‌سپارند — و چرا کدِ نمره‌گرفته به‌جای دست‌زدن به حافظه، یک رشته‌ی ثابت را parse می‌کند.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "The browser's notebook", fa: "دفترچه‌ی مرورگر" },
            blocks: [
              {
                type: "text",
                en: "Every page forgets everything on reload — variables die with the page. `localStorage` is the browser's tiny per-site notebook that SURVIVES reloads and even browser restarts. Two verbs: `localStorage.setItem(key, value)` writes, `localStorage.getItem(key)` reads. One catch: it stores STRINGS only — which is exactly why JSON rides along.",
                fa: "هر صفحه‌ای موقع رفرش همه‌چیز را فراموش می‌کند — متغیرها با صفحه می‌میرند. ‏`localStorage` دفترچه‌ی کوچکِ هر-سایتیِ مرورگر است که از رفرش و حتی ری‌استارتِ مرورگر جان به در می‌برد. دو فعل: `localStorage.setItem(key, value)` می‌نویسد، `localStorage.getItem(key)` می‌خواند. یک نکته: فقط رشته ذخیره می‌کند — و دقیقاً به همین دلیل است که JSON همراهش می‌آید.",
              },
              {
                type: "code",
                lang: "js",
                code: `// Save (only strings fit — pack the object first):
localStorage.setItem("user", JSON.stringify(user));

// Load (later, maybe after a reload):
const packed = localStorage.getItem("user");
if (packed) {
  const user2 = JSON.parse(packed); // unpacked, alive again
}`,
              },
              {
                type: "tip",
                en: "The getItem/check/parse dance is the standard save-load shape: read the string, make sure it exists, then unpack it. Missing key → getItem returns null, and the if quietly skips.",
                fa: "رقصِ getItem/check/parse همان شکلِ استانداردِ ذخیره-بارگذاری است: رشته را بخوان، مطمئن شو هست، بعد بازش کن. کلیدِ غایب ← getItem مقدار null می‌دهد و if بی‌سروصدا رد می‌شود.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Why graded code uses a stand-in", fa: "چرا کدِ نمره‌گرفته بدل استفاده می‌کند" },
            blocks: [
              {
                type: "warn",
                en: "localStorage can be BLOCKED — private browsing, sandboxed frames, cleared data. Real apps wrap it in try/catch for exactly that reason. And a graded challenge reloads a FRESH sandboxed frame every time: storage would always be empty, so a storage-dependent solution could never be verified. Graded code therefore parses a FIXED string that stands in for what getItem would return.",
                fa: "‏localStorage می‌تواند بلاک شود — مرورِ ناشناس، فریم‌های سندباکس‌شده، پاک‌شدنِ داده. اپ‌های واقعی دقیقاً به همین دلیل آن را در try/catch می‌پیچند. و یک چالشِ نمره‌گرفته هر بار یک فریمِ سندباکسِ تازه لود می‌کند: حافظه همیشه خالی است، پس راه‌حلی که به حافظه وابسته باشد هرگز قابل تأیید نیست. برای همین کدِ نمره‌گرفته یک رشته‌ی ثابت را parse می‌کند که بدلِ خروجیِ getItem است.",
              },
              {
                type: "code",
                lang: "js",
                code: `// In real life:  const packed = localStorage.getItem("user");
// In graded code, a stand-in with the SAME shape:
const packed = '{"name":"Mina","visits":6}';

const user = JSON.parse(packed);
document.querySelector("#hello").textContent =
  "Welcome back, " + user.name + "! Visits: " + user.visits;`,
              },
              {
                type: "text",
                en: "Notice what did NOT change: everything downstream of the string. Parse it, read the fields, render them — your rendering code cannot tell a localStorage string from a stand-in. That is the beauty of the data-shaped boundary: swap the source, keep the pipeline.",
                fa: "دقت کن چه چیزی عوض نشد: همه‌چیزِ بعد از رشته. parse‌اش کن، فیلدها را بخوان، رندرشان کن — کدِ رندرِ تو نمی‌تواند بفهمد رشته از localStorage آمده یا از یک بدل. زیباییِ مرزِ داده‌محور همین است: منبع را عوض کن، خطِ لوله را نگه دار.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome back</title>
  </head>
  <body>
    <h1>Returning visitor 🚪</h1>
    <p id="hello">...</p>

    <script>
      // Stand-in for: localStorage.getItem("user")
      const packed = '{"name":"Mina","visits":6}';

      const user = JSON.parse(packed);
      document.querySelector("#hello").textContent =
        "Welcome back, " + user.name + "! Visits: " + user.visits;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the greeting is built from the parsed record, exactly as it would be from real storage.",
                  fa: "پیش‌نمایش را بزن — سلام از رکوردِ parse‌شده ساخته شده، دقیقاً مثل وقتی که از حافظه‌ی واقعی می‌آمد.",
                },
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What type of values can localStorage store?", fa: "‏localStorage چه نوع مقدارهایی می‌تواند ذخیره کند؟" },
                options: [
                  { en: "Any JavaScript object, directly", fa: "هر شیءِ جاوااسکریپتی، مستقیم" },
                  { en: "Strings only", fa: "فقط رشته" },
                  { en: "Numbers only", fa: "فقط عدد" },
                ],
                answer: 1,
                explain: {
                  en: "Strings only — which is why objects travel as JSON: stringify before setItem, parse after getItem.",
                  fa: "فقط رشته — برای همین شیءها به‌صورت JSON سفر می‌کنند: قبل از setItem ‏stringify، بعد از getItem ‏parse.",
                },
              },
              {
                q: { en: "Why wrap localStorage calls in try/catch in real apps?", fa: "در اپ‌های واقعی چرا صدازدن‌های localStorage را در try/catch می‌پیچیم؟" },
                options: [
                  { en: "It makes saving faster", fa: "ذخیره‌سازی را سریع‌تر می‌کند" },
                  { en: "Storage can be blocked (private mode, sandbox) and would crash the script", fa: "حافظه می‌تواند بلاک شود (حالت ناشناس، سندباکس) و اسکریپت را کرش کند" },
                  { en: "localStorage is deprecated", fa: "‏localStorage منسوخ شده" },
                ],
                answer: 1,
                explain: {
                  en: "Access can throw where storage is unavailable — the catch keeps the app alive without memory.",
                  fa: "جایی که حافظه در دسترس نیست، دسترسی خطا می‌دهد — catch اپ را بدون حافظه زنده نگه می‌دارد.",
                },
              },
              {
                q: { en: "Why does the graded challenge parse a fixed string instead of calling getItem?", fa: "چرا چالشِ نمره‌گرفته یک رشته‌ی ثابت را parse می‌کند نه اینکه getItem را صدا بزند؟" },
                options: [
                  { en: "getItem is illegal in JavaScript", fa: "‏getItem در جاوااسکریپت غیرقانونی است" },
                  { en: "Each graded run loads a fresh sandbox where storage is empty — a fixed string keeps the run deterministic", fa: "هر اجرای نمره‌گرفته یک سندباکسِ تازه لود می‌کند که حافظه‌اش خالی است — رشته‌ی ثابت اجرا را قطعی نگه می‌دارد" },
                  { en: "Fixed strings are faster to parse", fa: "parse‌کردنِ رشته‌ی ثابت سریع‌تر است" },
                ],
                answer: 1,
                explain: {
                  en: "Same shape, deterministic source: the stand-in string behaves exactly like a getItem result, every single run.",
                  fa: "همان شکل، منبعِ قطعی: رشته‌ی بدل دقیقاً مثل نتیجه‌ی getItem رفتار می‌کند، در هر اجرا.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Welcome back", fa: "خوش آمدی، دوباره" },
            brief: {
              en: "The script has const saved = '{\"name\":\"Mina\",\"visits\":6}' — the stand-in for localStorage.getItem(\"user\"). Parse it and render into #hello: \"Welcome back, \" + name + \"! Visits: \" + visits — so the grader reads: Welcome back, Mina! Visits: 6",
              fa: "اسکریپت const saved = '{\"name\":\"Mina\",\"visits\":6}' را دارد — بدلِ localStorage.getItem(\"user\"). آن را parse کن و در #hello رندر کن: \"Welcome back, \" + name + \"! Visits: \" + visits — تا نمره‌دهنده این را بخواند: Welcome back, Mina! Visits: 6",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome back</title>
  </head>
  <body>
    <h1>Returning visitor 🚪</h1>
    <p id="hello">...</p>

    <script>
      // Stand-in for: localStorage.getItem("user")
      const saved = '{"name":"Mina","visits":6}';
      // 1) JSON.parse(saved)
      // 2) #hello ← "Welcome back, " + name + "! Visits: " + visits

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome back</title>
  </head>
  <body>
    <h1>Returning visitor 🚪</h1>
    <p id="hello">...</p>

    <script>
      // Stand-in for: localStorage.getItem("user")
      const saved = '{"name":"Mina","visits":6}';

      // Unpack the record and greet the returning player
      const user = JSON.parse(saved);
      document.querySelector("#hello").textContent =
        "Welcome back, " + user.name + "! Visits: " + user.visits;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "One parse, one render: const user = JSON.parse(saved); then read user.name and user.visits.",
                fa: "یک parse، یک رندر: const user = JSON.parse(saved); بعد user.name و user.visits را بخوان.",
              },
              {
                en: "Mind the punctuation: \"Welcome back, \" then \"! Visits: \" — comma inside the first, exclamation inside the second.",
                fa: "به علائم دقت کن: \"Welcome back, \" بعد \"! Visits: \" — ویرگول داخل اولی، علامت تعجب داخل دومی.",
              },
              {
                en: "Final line must read exactly: Welcome back, Mina! Visits: 6",
                fa: "خطِ نهایی باید دقیقاً این باشد: Welcome back, Mina! Visits: 6",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#hello", text: "Welcome back, Mina! Visits: 6" },
                { selector: "#hello", count: 1 },
                { selector: "script", count: 1 },
                { selector: "h1", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 13 ───────────────────────────────────────────
  {
    id: "js-m13",
    title: { en: "Final: Real App", fa: "پروژه‌ی نهایی: یک اپ واقعی" },
    blurb: {
      en: "The capstone: build Study Tracker — a real interactive app with state, a render function, toggling, adding and removing. Everything from the course, in one working page.",
      fa: "پروژه‌ی پایانی: Study Tracker را بساز — یک اپِ تعاملیِ واقعی با state، تابعِ render، toggle، افزودن و حذف. همه‌ی دوره، در یک صفحه‌ی کارا.",
    },
    lessons: [
      {
        id: "js-m13-l1",
        title: { en: "Anatomy of an App", fa: "کالبدشکافیِ یک اپ" },
        goal: {
          en: "See the three layers every app is made of — state, render, events — and derive a summary line from a state array.",
          fa: "سه لایه‌ای که هر اپ از آن‌ها ساخته شده را ببینی — state، render، events — و یک خطِ خلاصه از آرایه‌ی state مشتق کنی.",
        },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            title: { en: "Three layers, one golden rule", fa: "سه لایه، یک قانونِ طلایی" },
            blocks: [
              {
                type: "text",
                en: "Strip any app — a todo list, Telegram, a bank dashboard — and the same three layers remain. STATE: the data, plain variables and arrays. RENDER: a function that draws the state onto the screen. EVENTS: handlers that change the state and call render again. The golden rule that keeps it all sane: NEVER edit the screen directly when something changes — change the STATE, then call RENDER. The screen is a mirror, never the source.",
                fa: "هر اپی را — یک لیست کارها، تلگرام، داشبوردِ بانک — لخت کن و همان سه لایه باقی می‌ماند. STATE: داده، متغیرها و آرایه‌های ساده. RENDER: تابعی که state را روی صفحه می‌کشد. EVENTS: هندلرهایی که state را عوض می‌کنند و render را دوباره صدا می‌زنند. و قانونِ طلایی‌ای که همه‌چیز را سرِ جایش نگه می‌دارد: وقتی چیزی عوض می‌شود هرگز مستقیم صفحه را ویرایش نکن — STATE را عوض کن، بعد RENDER را صدا بزن. صفحه آینه است، هرگز منبع نیست.",
              },
              {
                type: "code",
                lang: "js",
                code: `// 1) STATE — the single source of truth
const tasks = [
  { title: "Math", done: true },
  { title: "History", done: false },
  { title: "Art", done: false },
];

// 2) RENDER — reads state, draws screen
function render() {
  // ...draw from tasks...
}

// 3) EVENTS — change state, then render()
// every handler ends in render();`,
              },
              {
                type: "tip",
                en: "\"Single source of truth\" is the phrase you will hear in every codebase: the screen is a MIRROR of the state, never the other way around. Data lives in variables; pixels live on screen; render is the one-way bridge.",
                fa: "عبارتِ «تک‌منبعِ حقیقت» را در هر کدبیسی خواهی شنید: صفحه آینه‌ی state است، هرگز برعکس. داده در متغیرها زندگی می‌کند؛ پیکسل‌ها روی صفحه؛ render همان پلِ یک‌طرفه است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Derived data — the summary line", fa: "داده‌ی مشتق — خطِ خلاصه" },
            blocks: [
              {
                type: "text",
                en: "\"3 tasks, 1 done\" is not stored anywhere — it is DERIVED from the state with a loop. Counting derived values instead of storing them means they can never drift out of sync with the truth. Store less, compute more.",
                fa: "«۳ کار، ۱ انجام‌شده» هیچ‌جا ذخیره نمی‌شود — از state با یک حلقه مشتق می‌شود. شمردنِ مقادیرِ مشتق به‌جای ذخیره‌کردنشان یعنی هرگز نمی‌توانند از حقیقت عقب بیفتند. کمتر ذخیره کن، بیشتر محاسبه کن.",
              },
              {
                type: "code",
                lang: "js",
                code: `let doneCount = 0;
for (const task of tasks) {
  if (task.done) {
    doneCount = doneCount + 1;
  }
}

document.querySelector("#count").textContent =
  tasks.length + " tasks, " + doneCount + " done";`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Study tracker</title>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: false },
      ];

      let doneCount = 0;
      for (const task of tasks) {
        if (task.done) doneCount = doneCount + 1;
      }

      document.querySelector("#count").textContent =
        tasks.length + " tasks, " + doneCount + " done";
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the summary is computed from the array, not typed by hand.",
                  fa: "پیش‌نمایش را بزن — خلاصه از آرایه محاسبه شده، نه دستی تایپ شده.",
                },
              },
              {
                type: "warn",
                en: "If you ever catch yourself typing \"3 tasks, 1 done\" as a literal string in an app, stop: the moment a fourth task appears, that line lies. Always derive counts from the data.",
                fa: "اگر یک روز خودت را گرفتی که در یک اپ «۳ کار، ۱ انجام‌شده» را به‌صورت رشته‌ی ثابت تایپ می‌کنی، بس کن: لحظه‌ای که کارِ چهارم بیاید، آن خط دروغ می‌گوید. شمارنده‌ها را همیشه از داده مشتق کن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is the golden rule of the state → render → events architecture?", fa: "قانونِ طلاییِ معماریِ state ← render ← events چیست؟" },
                options: [
                  { en: "Edit the screen directly whenever something changes", fa: "هر وقت چیزی عوض شد مستقیم صفحه را ویرایش کن" },
                  { en: "Change the state, then call render — the screen is a mirror", fa: "state را عوض کن، بعد render را صدا بزن — صفحه آینه است" },
                  { en: "Store the screen's text in a variable", fa: "متنِ صفحه را در یک متغیر ذخیره کن" },
                ],
                answer: 1,
                explain: {
                  en: "State is the single source of truth; render redraws whatever it holds; events only touch state.",
                  fa: "state تک‌منبعِ حقیقت است؛ render هرچه در آن است دوباره می‌کشد؛ events فقط به state دست می‌زنند.",
                },
              },
              {
                q: { en: "\"3 tasks, 1 done\" — where does this line come from?", fa: "«۳ کار، ۱ انجام‌شده» — این خط از کجا می‌آید؟" },
                options: [
                  { en: "It is typed as a constant in the HTML", fa: "به‌صورت ثابت در HTML تایپ می‌شود" },
                  { en: "It is derived from the state with a counting loop", fa: "از state با یک حلقه‌ی شمارش مشتق می‌شود" },
                  { en: "It is asked from the user", fa: "از کاربر پرسیده می‌شود" },
                ],
                answer: 1,
                explain: {
                  en: "Derived data can never disagree with the truth — stored duplicates always eventually do.",
                  fa: "داده‌ی مشتق هرگز با حقیقت ناهم‌خوان نمی‌شود؛ کپی‌های ذخیره‌شده سرانجام همیشه می‌شوند.",
                },
              },
              {
                q: { en: "In the three layers, what does an event handler do?", fa: "در سه لایه، هندلرِ رویداد چه می‌کند؟" },
                options: [
                  { en: "Draws pixels directly", fa: "مستقیم پیکسل می‌کشد" },
                  { en: "Changes the state, then calls render()", fa: "state را عوض می‌کند، بعد render() را صدا می‌زند" },
                  { en: "Redefines the tasks array from scratch", fa: "آرایه‌ی tasks را از صفر دوباره تعریف می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Handlers mutate the state and ask render to reflect it — that is their entire job.",
                  fa: "هندلرها state را دگرگون می‌کنند و از render می‌خواهند منعکسش کند — کلِ کارشان همین است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Count the state", fa: "شمارشِ state" },
            brief: {
              en: "First brick of Study Tracker: the tasks array is provided. Loop it, count the tasks with done: true, and render into #count: tasks.length + \" tasks, \" + doneCount + \" done\" — it must read exactly: 3 tasks, 1 done",
              fa: "اولین آجرِ Study Tracker: آرایه‌ی tasks از قبل هست. رویش حلقه بزن، کارهایی را که done: true دارند بشمار و در #count رندر کن: tasks.length + \" tasks, \" + doneCount + \" done\" — باید دقیقاً بخواند: 3 tasks, 1 done",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Study tracker</title>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <p id="count">?</p>

    <script>
      // STATE (do not change):
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: false },
      ];
      // 1) Loop tasks, count the ones with done === true
      // 2) #count ← tasks.length + " tasks, " + doneCount + " done"

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Study tracker</title>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: false },
      ];

      // Derived data: count the done tasks
      let doneCount = 0;
      for (const task of tasks) {
        if (task.done) {
          doneCount = doneCount + 1;
        }
      }

      document.querySelector("#count").textContent =
        tasks.length + " tasks, " + doneCount + " done";
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Counting loop: let doneCount = 0; then if (task.done) doneCount = doneCount + 1;",
                fa: "حلقه‌ی شمارش: let doneCount = 0; بعد if (task.done) doneCount = doneCount + 1;",
              },
              {
                en: "The final line glues four pieces: tasks.length + \" tasks, \" + doneCount + \" done\"",
                fa: "خطِ نهایی چهار تکه را می‌چسباند: tasks.length + \" tasks, \" + doneCount + \" done\"",
              },
              {
                en: "Expected output: 3 tasks, 1 done",
                fa: "خروجیِ مورد انتظار: 3 tasks, 1 done",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#count", text: "3 tasks, 1 done" },
                { selector: "#count", count: 1 },
                { selector: "script", count: 1 },
                { selector: "h1", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m13-l2",
        title: { en: "The Render Function", fa: "تابعِ render" },
        goal: {
          en: "Write one render() that wipes the list and rebuilds it from state — the clean-slate heart of every app.",
          fa: "یک render() بنویسی که فهرست را پاک می‌کند و از state از نو می‌سازد — قلبِ تخته‌پاکِ هر اپ.",
        },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            title: { en: "Wipe, rebuild, trust", fa: "پاک کن، بساز، اعتماد کن" },
            blocks: [
              {
                type: "text",
                en: "The render function is the app's painter, and it has one strategy for everything: WIPE the container (innerHTML = \"\"), REBUILD every element from the current state, TRUST nothing left over from the last paint. Whether the state changed by a toggle, an add or a delete — render does the identical thing: read state, draw state.",
                fa: "تابعِ render نقاشِ اپ است و برای همه‌چیز یک استراتژی دارد: ظرف را پاک کن (innerHTML = \"\")، هر عنصر را از state فعلی از نو بساز، و به هیچ چیزی که از نقاشیِ قبلی مانده اعتماد نکن. مهم نیست state با toggle عوض شده یا add یا delete — render دقیقاً همان یک کار را می‌کند: state را بخوان، state را بکش.",
              },
              {
                type: "code",
                lang: "js",
                code: `function render() {
  const list = document.querySelector("#list");

  // 1) wipe — no leftovers
  list.innerHTML = "";

  // 2) rebuild from state
  for (const task of tasks) {
    const li = document.createElement("li");
    li.className = "task";
    li.textContent = task.title;
    if (task.done) {
      li.classList.add("done");
    }
    list.append(li);
  }

  // 3) derived summary
  countEl.textContent = tasks.length + " tasks, " + doneCount() + " done";
}`,
              },
              {
                type: "tip",
                en: "If render is right ONCE, it is right FOREVER — that is the payoff of the clean-slate style. No patching, no incremental updates to get wrong; every paint is a full, honest redraw.",
                fa: "اگر render یک بار درست باشد، برای همیشه درست است — دستاوردِ سبکِ تخته‌پاک همین است. نه وصله‌کاری، نه به‌روزرسانی‌های تدریجی‌ای که جایی خراب شوند؛ هر نقاشی، یک بازکشیِ کامل و صادقانه است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Calling render at startup", fa: "صدازدنِ render موقع استارت" },
            blocks: [
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: true },
        { title: "Music", done: false },
      ];
      const list = document.querySelector("#list");
      const countEl = document.querySelector("#count");

      function render() {
        list.innerHTML = "";
        for (const task of tasks) {
          const li = document.createElement("li");
          li.className = "task";
          li.textContent = task.title;
          if (task.done) li.classList.add("done");
          list.append(li);
        }
        let doneCount = 0;
        for (const task of tasks) {
          if (task.done) doneCount = doneCount + 1;
        }
        countEl.textContent = tasks.length + " tasks, " + doneCount + " done";
      }

      render(); // first paint
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one render() call drew the whole screen: list, done-marks, summary.",
                  fa: "پیش‌نمایش را بزن — یک صدازدنِ render() کلِ صفحه را کشید: فهرست، نشان‌های done، خلاصه.",
                },
              },
              {
                type: "text",
                en: "Tomorrow, adding a task means: tasks.push(...), render(). Toggling means: flip done, render(). Deleting means: remove from the array, render(). ONE function absorbs every future feature — this is the quiet superpower you are building toward in the capstone.",
                fa: "فردا، اضافه‌کردنِ کار یعنی: tasks.push(...)، ‏render(). سوییچ‌کردن یعنی: done را برگردان، ‏render(). حذف یعنی: از آرایه بردار، ‏render(). یک تابع هر قابلیتِ آینده را جذب می‌کند — این همان ابرقدرتِ آرومی است که در پروژه‌ی پایانی به‌سویش می‌روی.",
              },
              {
                type: "warn",
                en: "Keep render SELF-CONTAINED: it reads only the state and the DOM. No parameters, no special cases — if you are tempted to pass arguments into render, you are usually writing a second function.",
                fa: "render را خودکفا نگه دار: فقط state و DOM را می‌خواند. بدون پارامتر، بدون استثنا — اگر وسوسه شدی به render آرگومان پاس بدهی، معمولاً داری تابعِ دومی می‌نویسی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is render()'s first move?", fa: "اولین حرکتِ render() چیست؟" },
                options: [
                  { en: "Wipe the container: list.innerHTML = \"\"", fa: "پاک‌کردنِ ظرف: list.innerHTML = \"\"" },
                  { en: "Ask the user for new data", fa: "گرفتنِ داده‌ی جدید از کاربر" },
                  { en: "Redefine the tasks array", fa: "تعریفِ دوباره‌ی آرایه‌ی tasks" },
                ],
                answer: 0,
                explain: {
                  en: "Wipe first — then rebuild from state. No leftovers from the previous paint.",
                  fa: "اول پاک کن — بعد از state از نو بساز. هیچ مانده‌ای از نقاشی‌ی قبلی نماند.",
                },
              },
              {
                q: { en: "Why is the summary line computed INSIDE render?", fa: "چرا خطِ خلاصه داخل render محاسبه می‌شود؟" },
                options: [
                  { en: "So it is recomputed from fresh state on every paint and can never go stale", fa: "تا در هر نقاشی از state تازه دوباره محاسبه شود و هرگز کهنه نشود" },
                  { en: "To save memory", fa: "برای صرفه‌جویی در حافظه" },
                  { en: "Because HTML requires it", fa: "چون HTML الزامش کرده" },
                ],
                answer: 0,
                explain: {
                  en: "Derived data computed at paint time is always in sync with the state being drawn.",
                  fa: "داده‌ی مشتق که موقعِ نقاشی محاسبه می‌شود، همیشه هم‌گام با همان stateی است که کشیده می‌شود.",
                },
              },
              {
                q: { en: "A new feature 'delete a task' arrives. What changes?", fa: "قابلیت جدیدِ «حذف کار» می‌رسد. چه چیزی عوض می‌شود؟" },
                options: [
                  { en: "render() must be rewritten for delete mode", fa: "render() باید برای حالتِ حذف از نو نوشته شود" },
                  { en: "Only a handler: remove from the array, call the same render()", fa: "فقط یک هندلر: از آرایه بردار، همان render() را صدا بزن" },
                  { en: "The whole app needs a rebuild", fa: "کلِ اپ باید از نو ساخته شود" },
                ],
                answer: 1,
                explain: {
                  en: "The clean-slate render already knows how to draw ANY state — handlers just change the state.",
                  fa: "render تخته‌پاک از قبل بلد است هر stateی را بکشد — هندلرها فقط state را عوض می‌کنند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Draw the list", fa: "فهرست را بکش" },
            brief: {
              en: "Give Study Tracker its render(): the 4-task state is provided. Write render() that wipes #list, builds one <li class=\"task\"> per task (textContent = task.title, classList.add(\"done\") when task.done), counts done in the same pass or a second loop, and renders tasks.length + \" tasks, \" + doneCount + \" done\" into #count. Call render() once at startup.",
              fa: "به Study Tracker تابعِ render‌اش را بده: state‌ی ۴ کاره از قبل هست. ‏render() را بنویس که #list را پاک کند، برای هر کار یک <li class=\"task\"> بسازد (textContent = task.title و classList.add(\"done\") وقتی task.done)، تعدادِ doneها را در همان گذر یا یک حلقه‌ی دوم بشمارد و tasks.length + \" tasks, \" + doneCount + \" done\" را در #count رندر کند. render() را یک بار موقع استارت صدا بزن.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      // STATE (do not change):
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: true },
        { title: "Music", done: false },
      ];
      // 1) render(): wipe #list, rebuild one li.task per task,
      //    add class "done" when task.done, count + summary into #count
      // 2) Call render() once at startup

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: true },
        { title: "Music", done: false },
      ];
      const list = document.querySelector("#list");
      const countEl = document.querySelector("#count");

      function render() {
        // wipe
        list.innerHTML = "";

        // rebuild from state
        let doneCount = 0;
        for (const task of tasks) {
          const li = document.createElement("li");
          li.className = "task";
          li.textContent = task.title;
          if (task.done) {
            li.classList.add("done");
            doneCount = doneCount + 1;
          }
          list.append(li);
        }

        // derived summary
        countEl.textContent = tasks.length + " tasks, " + doneCount + " done";
      }

      // first paint
      render();
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "render() = wipe + loop(li per task) + summary. Call it once after defining it.",
                fa: "‏render() = پاک‌کردن + حلقه(برای هر کار یک li) + خلاصه. بعد از تعریف، یک بار صدایش بزن.",
              },
              {
                en: "doneCount can be counted in the same loop: bump it inside the same if that adds the class.",
                fa: "‏doneCount را می‌توان در همان حلقه شمرد: داخل همان if که کلاس را اضافه می‌کند بالا ببرش.",
              },
              {
                en: "Expected: 4 li.task items, 2 of them .done, summary 4 tasks, 2 done",
                fa: "مورد انتظار: ۴ آیتمِ li.task، دو تا‌شان .done، خلاصه 4 tasks, 2 done",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".task", count: 4 },
                { selector: ".task.done", count: 2 },
                { selector: "#count", text: "4 tasks, 2 done" },
                { selector: "#list", text: "Music" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m13-l3",
        title: { en: "Wire the Interactions", fa: "سیم‌کشیِ تعامل‌ها" },
        goal: {
          en: "Add a toggle action that flips state and re-renders — and test-fire it once so the whole loop is provable.",
          fa: "یک عملِ toggle اضافه کنی که state را برمی‌گرداند و دوباره رندر می‌کند — و یک بار تست‌شلیکش کنی تا کلِ حلقه اثبات شود.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "The toggle action", fa: "عملِ toggle" },
            blocks: [
              {
                type: "text",
                en: "Now the golden rule pays off. Toggling a task is NOT a DOM operation — it is a state operation: flip `task.done` (the `!` operator turns true into false and back), then call render(). The screen follows automatically, done-marks and summary included.",
                fa: "حالا قانونِ طلایی سودش را می‌دهد. سوییچ‌کردنِ یک کار عملیاتِ DOM نیست — عملیاتِ state است: ‏`task.done` را برگردان (عملگرِ `!` مقدار true را false می‌کند و برعکس)، بعد render() را صدا بزن. صفحه خودش دنبالش می‌رود، نشان‌های done و خلاصه هم شامل می‌شوند.",
              },
              {
                type: "code",
                lang: "js",
                code: `function toggle(index) {
  tasks[index].done = !tasks[index].done; // flip the truth
  render();                               // mirror it
}

toggle(1); // test-fire: state changed, screen re-rendered`,
              },
              {
                type: "tip",
                en: "The test-fire is the capstone's signature move: calling toggle(1) once at startup proves — synchronously, on load — that the whole state → render loop works. The grader reads the AFTER picture: one more task done than the seed state had.",
                fa: "تست‌شلیک حرکتِ امضادارِ پروژه‌ی پایانی است: یک بار صدازدنِ toggle(1) موقع استارت، هم‌زمان و در لحظه‌ی لود ثابت می‌کند که کلِ حلقه‌ی state ← render کار می‌کند. نمره‌دهنده تصویرِ بعدی را می‌خواند: یک کار بیشتر از state اولیه انجام‌شده است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Clicks on rebuilt elements", fa: "کلیک روی عناصرِ بازساخته" },
            blocks: [
              {
                type: "text",
                en: "One subtlety the wipe creates: render() destroys the old <li>s and builds fresh ones — so listeners attached to the OLD items die with them. The fix: attach listeners INSIDE render, to each fresh <li>, right where it is born. Now every rebuild comes fully wired.",
                fa: "یک ظرافت که پاک‌کردن می‌سازد: render() ‏<li>های قدیمی را نابود می‌کند و تازه‌ها را می‌سازد — پس listenerهایی که به آیتم‌های قدیمی وصل بودند با آن‌ها می‌میرند. راه‌حل: listenerها را داخل render وصل کن، به هر <li> تازه، همان‌جا که به دنیا می‌آید. حالا هر بازسازی، کاملاً سیم‌کشی‌شده به دنیا می‌آید.",
              },
              {
                type: "code",
                lang: "js",
                code: `// inside render's loop:
for (let i = 0; i < tasks.length; i++) {
  const li = document.createElement("li");
  // ...fill li...

  // each fresh li gets its own click → toggle(i)
  li.addEventListener("click", function () {
    toggle(i);
  });
  list.append(li);
}`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      li { cursor: pointer; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <p>Click a task to toggle it!</p>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: false },
      ];
      const list = document.querySelector("#list");
      const countEl = document.querySelector("#count");

      function render() {
        list.innerHTML = "";
        let doneCount = 0;
        for (let i = 0; i < tasks.length; i++) {
          const li = document.createElement("li");
          li.className = "task";
          li.textContent = tasks[i].title;
          if (tasks[i].done) {
            li.classList.add("done");
            doneCount = doneCount + 1;
          }
          li.addEventListener("click", function () { toggle(i); });
          list.append(li);
        }
        countEl.textContent = tasks.length + " tasks, " + doneCount + " done";
      }

      function toggle(index) {
        tasks[index].done = !tasks[index].done;
        render();
      }

      toggle(1); // test-fire: History becomes done
      // (in the preview, click any task to toggle it live)
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview: History already shows done (the test-fire), and clicking any task toggles it live.",
                  fa: "پیش‌نمایش را بزن: History از قبل done نشان می‌دهد (تست‌شلیک)، و کلیک روی هر کار آن را زنده سوییچ می‌کند.",
                },
              },
              {
                type: "warn",
                en: "Use `let i` in that loop, never `var` — let gives each pass its own i, so each listener remembers ITS OWN index. With var, every listener would share the final value and clicking any task would toggle the last one.",
                fa: "در آن حلقه از `let i` استفاده کن، هرگز `var` نه — let به هر گذر i‌ی خودش را می‌دهد، پس هر listener اندیسِ خودش را به‌خاطر می‌سپارد. با var همه‌ی listenerها آخرین مقدار را شریک می‌شوند و کلیک روی هر کار، آخری را سوییچ می‌کند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does toggle(index) do — in which order?", fa: "‏toggle(index) چه می‌کند — با چه ترتیبی؟" },
                options: [
                  { en: "Renders first, then flips done", fa: "اول رندر می‌کند، بعد done را برمی‌گرداند" },
                  { en: "Flips tasks[index].done, then calls render()", fa: "‏tasks[index].done را برمی‌گرداند، بعد render() را صدا می‌زند" },
                  { en: "Recreates the whole tasks array", fa: "کلِ آرایه‌ی tasks را از نو می‌سازد" },
                ],
                answer: 1,
                explain: {
                  en: "State first, mirror second: flip the boolean, then let render redraw everything from the new truth.",
                  fa: "اول state، بعد آینه: بولی را برگردان، بعد بگذار render از حقیقتِ جدید همه‌چیز را بکشد.",
                },
              },
              {
                q: { en: "Why attach click listeners INSIDE render?", fa: "چرا listenerهای کلیک داخل render وصل می‌شوند؟" },
                options: [
                  { en: "The wipe destroys old elements (and their listeners) — fresh ones need fresh listeners", fa: "پاک‌کردن عناصرِ قدیمی (و listenerهایشان) را نابود می‌کند — تازه‌ها به listener تازه نیاز دارند" },
                  { en: "It looks nicer", fa: "قشنگ‌تر به نظر می‌رسد" },
                  { en: "Listeners outside render are illegal", fa: "listener بیرون از render غیرقانونی است" },
                ],
                answer: 0,
                explain: {
                  en: "Every rebuild creates brand-new <li>s; attaching at birth keeps every version of the list clickable.",
                  fa: "هر بازسازی <li>های کاملاً جدید می‌سازد؛ وصل‌کردن در لحظه‌ی تولد، هر نسخه‌ی فهرست را کلیک‌پذیر نگه می‌دارد.",
                },
              },
              {
                q: { en: "The test-fire toggle(1) runs at startup. What does the grader see?", fa: "تست‌شلیکِ toggle(1) موقع استارت اجرا می‌شود. نمره‌دهنده چه می‌بیند؟" },
                options: [
                  { en: "The original untouched list", fa: "فهرستِ دست‌نخورده‌ی اولیه" },
                  { en: "The re-rendered screen with task 1 flipped to done", fa: "صفحه‌ی رندرِ دوباره‌شده که کارِ ۱ در آن done شده" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 1,
                explain: {
                  en: "toggle mutates state and calls render synchronously — the graded DOM is the AFTER picture.",
                  fa: "‏‏toggle وضعیت را دگرگون می‌کند و render را هم‌زمان صدا می‌زند — DOMِ نمره‌گرفته تصویرِ «بعد» است.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Toggle test", fa: "تستِ toggle" },
            brief: {
              en: "Wire the full loop: render() builds the 3-task list (li.task, done class, count summary) with a click listener per fresh li calling toggle(i). toggle(index) flips tasks[index].done and re-renders. Test-fire toggle(1) ONCE at startup — the grader reads the after-picture: exactly 2 items .done and the summary: 3 tasks, 2 done",
              fa: "کلِ حلقه را سیم‌کشی کن: render() فهرستِ ۳ کاره را می‌سازد (li.task، کلاسِ done، خلاصه‌ی شمارنده) با یک listenerِ کلیک برای هر li تازه که toggle(i) را صدا می‌زند. ‏toggle(index) ‏tasks[index].done را برمی‌گرداند و دوباره رندر می‌کند. ‏toggle(1) را یک بار موقع استارت تست‌شلیک کن — نمره‌دهنده تصویرِ بعد را می‌خواند: دقیقاً ۲ آیتمِ .done و خلاصه‌ی: 3 tasks, 2 done",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      li { cursor: pointer; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      // STATE (do not change):
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: false },
      ];
      // 1) render(): wipe + rebuild (li.task, done class, count)
      //    each li gets: addEventListener("click", function () { toggle(i); })
      // 2) toggle(index): flip done, render()
      // 3) Test-fire: toggle(1) once at startup

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      li { cursor: pointer; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 📖</h1>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Art", done: false },
      ];
      const list = document.querySelector("#list");
      const countEl = document.querySelector("#count");

      function render() {
        list.innerHTML = "";
        let doneCount = 0;
        for (let i = 0; i < tasks.length; i++) {
          const li = document.createElement("li");
          li.className = "task";
          li.textContent = tasks[i].title;
          if (tasks[i].done) {
            li.classList.add("done");
            doneCount = doneCount + 1;
          }
          li.addEventListener("click", function () { toggle(i); });
          list.append(li);
        }
        countEl.textContent = tasks.length + " tasks, " + doneCount + " done";
      }

      function toggle(index) {
        tasks[index].done = !tasks[index].done;
        render();
      }

      // Test-fire once: proves the whole state → render loop
      toggle(1);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The loop needs the index for two things: tasks[i] AND toggle(i) — use for (let i = 0; ...).",
                fa: "حلقه به اندیس برای دو چیز نیاز دارد: tasks[i] و toggle(i) — از for (let i = 0; ...) استفاده کن.",
              },
              {
                en: "toggle is two lines: flip tasks[index].done with !, then render().",
                fa: "‏toggle دو خط است: ‏tasks[index].done را با ! برگردان، بعد render().",
              },
              {
                en: "After the test-fire: Math (done) + History (flipped) = 2 .done items, summary 3 tasks, 2 done",
                fa: "بعد از تست‌شلیک: Math (done) + History (برگشته) = ۲ آیتمِ .done، خلاصه 3 tasks, 2 done",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".task", count: 3 },
                { selector: ".task.done", count: 2 },
                { selector: "#count", text: "3 tasks, 2 done" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m13-l4",
        title: { en: "FINAL: Ship Study Tracker", fa: "پایانی: Study Tracker را به دریا بفرست" },
        goal: {
          en: "Assemble the complete app — state, render, toggle, add — with a test-fired addTask proving the whole machine, and play the live version yourself.",
          fa: "اپِ کامل را سرهم کنی — state، render، toggle، add — با یک addTaskِ تست‌شلیک‌شده که کلِ ماشین را اثبات می‌کند، و نسخه‌ی زنده را خودت بازی کنی.",
        },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            title: { en: "The full machine", fa: "ماشینِ کامل" },
            blocks: [
              {
                type: "text",
                en: "The capstone adds one more action to the machine you built: ADD. A new task is just a new object pushed onto the state array — `tasks.push({ title: title, done: false })` — followed by the ritual render(). With toggle already wired, the app now has the full life cycle: see tasks, flip tasks, create tasks.",
                fa: "پروژه‌ی پایانی یک عملِ دیگر به ماشینی که ساختی اضافه می‌کند: ADD. کارِ جدید فقط یک شیءِ جدید است که روی آرایه‌ی state می‌رود — `tasks.push({ title: title, done: false })` — به‌دنبالش همان آیینِ همیشگی، render(). با toggle که از قبل سیم‌کشی شده، اپ حالا چرخه‌ی کاملِ زندگی را دارد: کارها را ببین، سوییچشان کن، کار بساز.",
              },
              {
                type: "code",
                lang: "js",
                code: `function addTask(title) {
  tasks.push({ title: title, done: false }); // state grows
  render();                                  // mirror it
}`,
              },
              {
                type: "tip",
                en: "The input trick from the events module returns: pre-fill <input id=\"new\" value=\"...\"> and read .value. Reading an input's .value is always legal and synchronous — perfect for a deterministic startup.",
                fa: "ترفندِ input از ماژولِ رویدادها برمی‌گردد: ‏<input id=\"new\" value=\"...\"> را از قبل پر کن و ‎.value را بخوان. خواندنِ ‎.value‌ی input همیشه قانونی و هم‌زمان است — برای استارتِ قطعی عالی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The ship checklist", fa: "چک‌لیستِ تحویل" },
            blocks: [
              {
                type: "text",
                en: "Before shipping any interactive build, run the four-question checklist. One: does the first paint show real state? (render() called at startup.) Two: does every handler end in render()? Three: is the graded path synchronous — no timers, no randomness, nothing that waits? Four: are names readable — render, toggle, addTask say what they do. Four yeses, and the app is honest.",
                fa: "قبل از تحویلِ هر ساختِ تعاملی، چک‌لیستِ چهار-سؤالی را اجرا کن. یک: آیا اولین نقاشی state واقعی را نشان می‌دهد؟ (render() موقع استارت صدا زده شده.) دو: آیا هر هندلر به render ختم می‌شود؟ سه: آیا مسیرِ نمره‌گرفته هم‌زمان است — بدون تایمر، بدون تصادف، بدون هیچ چیزِ منتظر؟ چهار: آیا نام‌ها خوانا هستند — render، toggle، addTask می‌گویند چه می‌کنند. چهار بارِ بله، و اپ صادقانه است.",
              },
              {
                type: "code",
                lang: "js",
                code: `// Startup sequence of the final app:
render();                 // 1) paint the seeded state
addTask(input.value);     // 2) test-fire the add action
// → the grader reads the state AFTER the test-fire:
//   seeded tasks + one added task, summary updated.

// Live wiring (for you, in the preview):
addBtn.addEventListener("click", function () {
  addTask(input.value);
});`,
              },
              {
                type: "warn",
                en: "Order matters at startup: render() must exist before the first addTask calls it — define functions before the lines that use them, exactly like every pipeline in this course: input, compute, output.",
                fa: "ترتیب موقع استارت مهم است: render باید قبل از اولین addTask وجود داشته باشد که آن را صدا بزند — تابع‌ها را قبل از خط‌هایی که استفاده‌شان می‌کنند تعریف کن، دقیقاً مثل هر خطِ لوله‌ای در این دوره: ورودی، محاسبه، خروجی.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      li { cursor: pointer; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 1.0 📖</h1>
    <input id="new" value="Read 20 pages" placeholder="New task">
    <button id="add">Add</button>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Chemistry", done: false },
      ];
      const list = document.querySelector("#list");
      const countEl = document.querySelector("#count");
      const input = document.querySelector("#new");

      function render() {
        list.innerHTML = "";
        let doneCount = 0;
        for (let i = 0; i < tasks.length; i++) {
          const li = document.createElement("li");
          li.className = "task";
          li.textContent = tasks[i].title;
          if (tasks[i].done) {
            li.classList.add("done");
            doneCount = doneCount + 1;
          }
          li.addEventListener("click", function () { toggle(i); });
          list.append(li);
        }
        countEl.textContent = tasks.length + " tasks, " + doneCount + " done";
      }

      function toggle(index) {
        tasks[index].done = !tasks[index].done;
        render();
      }

      function addTask(title) {
        tasks.push({ title: title, done: false });
        render();
      }

      render();              // seeded state, painted
      addTask(input.value);  // test-fire: "Read 20 pages" joins the list

      // live: the Add button keeps the machine running
      document.querySelector("#add").addEventListener("click", function () {
        addTask(input.value);
      });
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — the app opens with 4 tasks (one test-fired), then click tasks to toggle and Add to create. It is YOUR app.",
                  fa: "پیش‌نمایش را بزن — اپ با ۴ کار باز می‌شود (یکی تست‌شلیک‌شده)، بعد کارها را کلیک کن تا سوییچ شوند و Add را بزن تا بسازی. این اپِ خودت است.",
                },
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does tasks.push({ title: t, done: false }) do?", fa: "‏tasks.push({ title: t, done: false }) چه می‌کند؟" },
                options: [
                  { en: "Replaces the array with one task", fa: "آرایه را با یک کار عوض می‌کند" },
                  { en: "Adds the new task object as the last element of the state", fa: "شیءِ کارِ جدید را به‌عنوان آخرین عنصرِ state اضافه می‌کند" },
                  { en: "Renders the task directly", fa: "کار را مستقیم رندر می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "push appends to the array — the state grows by one record, and render mirrors it.",
                  fa: "push به آرایه اضافه می‌کند — state یک رکورد بزرگ‌تر می‌شود و render آینه‌اش می‌شود.",
                },
              },
              {
                q: { en: "What is the correct startup order?", fa: "ترتیبِ درستِ استارت چیست؟" },
                options: [
                  { en: "addTask first, render later when convenient", fa: "اول addTask، بعد render هر وقت راحت بودی" },
                  { en: "render() first, then addTask(input.value) as the test-fire", fa: "اول render()، بعد addTask(input.value) به‌عنوان تست‌شلیک" },
                  { en: "Order never matters", fa: "ترتیب هیچ‌وقت مهم نیست" },
                ],
                answer: 1,
                explain: {
                  en: "Paint the seeded state first, then run the test-fired action — the graded DOM is the after-picture.",
                  fa: "اول state اولیه را نقاشی کن، بعد عملِ تست‌شلیک‌شده را اجرا کن — DOMِ نمره‌گرفته تصویرِ «بعد» است.",
                },
              },
              {
                q: { en: "Which is NOT part of the ship checklist?", fa: "کدام بخشی از چک‌لیستِ تحویل نیست؟" },
                options: [
                  { en: "First paint shows real state", fa: "اولین نقاشی state واقعی را نشان بدهد" },
                  { en: "Every handler ends in render()", fa: "هر هندلر به render ختم شود" },
                  { en: "Add a random task on every load for excitement", fa: "برای هیجان، در هر لود یک کارِ تصادفی اضافه شود" },
                ],
                answer: 2,
                explain: {
                  en: "Randomness breaks determinism — every graded run must be identical. The checklist keeps builds honest and verifiable.",
                  fa: "تصادف قطعی‌بودن را می‌شکند — هر اجرای نمره‌گرفته باید یکسان باشد. چک‌لیست ساخت‌ها را صادقانه و قابل‌تأیید نگه می‌دارد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Study Tracker 1.0", fa: "Study Tracker 1.0" },
            brief: {
              en: "Ship the full app. The 3-task state, input #new (pre-filled with \"Read 20 pages\") and #add button are provided. Write render() (li.task per task, done class, click → toggle(i), summary), toggle(index), and addTask(title) that pushes { title: title, done: false } and re-renders. Startup: render() once, then addTask(input.value) as the test-fire. Expected graded state: 4 tasks, 1 done, and \"Read 20 pages\" visible in the list.",
              fa: "اپِ کامل را به دریا بفرست. state‌ی ۳ کاره، input‌ی به نام #new (از قبل پر با \"Read 20 pages\") و دکمه‌ی #add از قبل هستند. ‏render() را بنویس (برای هر کار یک li.task، کلاسِ done، کلیک ← toggle(i)، خلاصه)، toggle(index)، و addTask(title) که { title: title, done: false } را push می‌کند و دوباره رندر می‌کند. استارت: یک بار render()، بعد addTask(input.value) به‌عنوان تست‌شلیک. وضعیتِ نمره‌گرفته‌ی مورد انتظار: ۴ کار، ۱ انجام‌شده، و \"Read 20 pages\" در فهرست دیده شود.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      li { cursor: pointer; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 1.0 📖</h1>
    <input id="new" value="Read 20 pages" placeholder="New task">
    <button id="add">Add</button>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      // STATE (do not change):
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Chemistry", done: false },
      ];
      // 1) render(): wipe + rebuild (li.task, done, click → toggle(i), summary)
      // 2) toggle(index): flip done, render()
      // 3) addTask(title): push { title: title, done: false }, render()
      // 4) Startup: render() once, then addTask(input.value)

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      li { cursor: pointer; }
      .done { color: #94a3b8; text-decoration: line-through; }
    </style>
  </head>
  <body>
    <h1>Study Tracker 1.0 📖</h1>
    <input id="new" value="Read 20 pages" placeholder="New task">
    <button id="add">Add</button>
    <ul id="list"></ul>
    <p id="count">?</p>

    <script>
      const tasks = [
        { title: "Math", done: true },
        { title: "History", done: false },
        { title: "Chemistry", done: false },
      ];
      const list = document.querySelector("#list");
      const countEl = document.querySelector("#count");
      const input = document.querySelector("#new");

      // RENDER — the clean-slate painter
      function render() {
        list.innerHTML = "";
        let doneCount = 0;
        for (let i = 0; i < tasks.length; i++) {
          const li = document.createElement("li");
          li.className = "task";
          li.textContent = tasks[i].title;
          if (tasks[i].done) {
            li.classList.add("done");
            doneCount = doneCount + 1;
          }
          li.addEventListener("click", function () { toggle(i); });
          list.append(li);
        }
        countEl.textContent = tasks.length + " tasks, " + doneCount + " done";
      }

      // TOGGLE — flip the truth, mirror it
      function toggle(index) {
        tasks[index].done = !tasks[index].done;
        render();
      }

      // ADD — grow the state, mirror it
      function addTask(title) {
        tasks.push({ title: title, done: false });
        render();
      }

      // STARTUP: seeded paint + test-fired add
      render();
      addTask(input.value);

      // LIVE: the Add button keeps the machine running
      document.querySelector("#add").addEventListener("click", function () {
        addTask(input.value);
      });
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "You wrote render and toggle last lesson — reuse them; only addTask is new.",
                fa: "‏render و toggle را درسِ قبل نوشتی — دوباره ازشان استفاده کن؛ فقط addTask جدید است.",
              },
              {
                en: "Startup is exactly two calls: render(); then addTask(input.value);",
                fa: "استارت دقیقاً دو صدازدن است: render(); بعد addTask(input.value);",
              },
              {
                en: "Expected: 4 li.task (Math done), summary 4 tasks, 1 done, and Read 20 pages in the list.",
                fa: "مورد انتظار: ۴ آیتمِ li.task (Math انجام‌شده)، خلاصه 4 tasks, 1 done، و Read 20 pages در فهرست.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".task", count: 4 },
                { selector: ".task.done", count: 1 },
                { selector: "#count", text: "4 tasks, 1 done" },
                { selector: "#list", text: "Read 20 pages" },
                { selector: "#add", count: 1 },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 14 ───────────────────────────────────────────
  {
    id: "js-m14",
    title: { en: "String Power Tools", fa: "ابزارهای قدرتمندِ رشته‌ها" },
    blurb: {
      en: "Strings grow up: cut them with slice, search them with includes, explode them with split, stitch arrays back with join — and let template literals do the gluing.",
      fa: "رشته‌ها بزرگ می‌شوند: با slice برششان بزن، با includes جست‌وجویشان کن، با split تکه‌تکه‌شان کن، با join آرایه را بدوز — و چسباندن را بسپار به تمپلیت لیترال‌ها.",
    },
    lessons: [
      {
        id: "js-m14-l1",
        title: { en: "split & join — Explode and Stitch", fa: "split و join — تکه‌تکه کردن و دوختن" },
        goal: {
          en: "Turn a string into an array with split, glue an array back into a string with join, and move through both with loops.",
          fa: "یک رشته را با split به آرایه تبدیل کنی، یک آرایه را با join دوباره به رشته بدوزی و با حلقه در هر دو راه بروی.",
        },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            title: { en: "One string becomes many", fa: "یک رشته، چند تکه می‌شود" },
            blocks: [
              {
                type: "text",
                en: "`split` is the opposite of glue: hand it a separator and it cuts a string into an ARRAY of pieces. `\"a,b,c\".split(\",\")` gives `[\"a\", \"b\", \"c\"]`. `join` runs the movie backwards: it takes an array and stitches the items into ONE string, placing the separator between them. Together they are a round trip: string → array → string.",
                fa: "`split` برعکسِ چسب است: یک جداکننده به‌اش می‌دهی و رشته را به یک «آرایه» از تکه‌ها می‌بُرد. `\"a,b,c\".split(\",\")` می‌دهد `[\"a\", \"b\", \"c\"]`. `join` فیلم را برعکس پخش می‌کند: یک آرایه می‌گیرد و آیتم‌ها را با جداکننده بین‌شان به «یک» رشته می‌دوزد. با هم یک رفت‌وبرگشت‌اند: رشته ← آرایه ← رشته.",
              },
              {
                type: "code",
                lang: "js",
                code: `const csv = "Ava,Sina,Mina";
const names = csv.split(",");        // ["Ava", "Sina", "Mina"]

const again = names.join(" • ");     // "Ava • Sina • Mina"

const chars = "TEKA".split("");      // ["T", "E", "K", "A"] — empty separator = every letter`,
              },
              {
                type: "tip",
                en: "The separator is the knife — it disappears from the pieces. And split with a separator that never appears simply returns the whole string as a one-item array: no error, no drama.",
                fa: "جداکننده همان چاقوست — از تکه‌ها محو می‌شود. و اگر جداکننده‌ای که داده‌ای در رشته پیدا نشود، split بی‌سروصدا کل رشته را به‌شکل یک آرایه‌ی تک‌آیتمی برمی‌گرداند: نه خطا، نه هیاهو.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Round trips and template glue", fa: "رفت‌وبرگشت و چسبِ تمپلیت" },
            blocks: [
              {
                type: "text",
                en: "The classic pipeline: a raw data string arrives, split turns it into pieces you can loop over, a loop processes each piece, and join (or a template literal) assembles the display string. Remember m2: template literals use backticks and `${...}` — anything between the braces is real JavaScript.",
                fa: "لوله‌ی کلاسیک: یک رشته‌ی داده‌ی خام می‌رسد، split آن را به تکه‌های قابلِ حلقه‌زدن تبدیل می‌کند، حلقه هر تکه را پردازش می‌کند و join (یا یک تمپلیت لیترال) رشته‌ی نمایش را سرهم می‌کند. یادت هست در m2: تمپلیت لیترال‌ها بک‌تیک دارند و `${...}` — هرچه بین آکولادها باشد جاوااسکریپتِ واقعی است.",
              },
              {
                type: "code",
                lang: "js",
                code: `const row = "Ava:stage";
const parts = row.split(":");              // ["Ava", "stage"]

const line = \`\${parts[0]} → \${parts[1]}\`;   // "Ava → stage" — template glue`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Split & join</title>
  </head>
  <body>
    <h1>Crew board 🎬</h1>
    <div id="board"></div>

    <script>
      const raw = "Ava:stage,Sina:lights,Mina:sound";
      const people = raw.split(",");
      for (const person of people) {
        const parts = person.split(":");
        const p = document.createElement("p");
        p.textContent = parts[0] + " → " + parts[1];
        document.querySelector("#board").append(p);
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one raw string becomes three rendered crew lines.",
                  fa: "پیش‌نمایش را بزن — یک رشته‌ی خام به سه خطِ رندرشده‌ی گروه تبدیل می‌شود.",
                },
              },
              {
                type: "warn",
                en: "split ALWAYS returns an array — even `[\"TEKA\"]` when the separator is missing. And join on an empty array quietly gives \"\". Loop over the split result, never over the original string.",
                fa: "split «همیشه» یک آرایه برمی‌گرداند — حتی `[\"TEKA\"]` وقتی جداکننده پیدا نشد. و join روی آرایه‌ی خالی بی‌سروصدا \"\" می‌دهد. روی نتیجه‌ی split حلقه بزن، نه روی خودِ رشته‌ی اصلی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does \"red,green,blue\".split(\",\") return?", fa: "\"red,green,blue\".split(\",\") چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "[\"red\", \"green\", \"blue\"]", fa: "[\"red\", \"green\", \"blue\"]" },
                  { en: "\"red,green,blue\" — the same string", fa: "\"red,green,blue\" — همان رشته‌ی خودش" },
                  { en: "[\"red,green,blue\"]", fa: "[\"red,green,blue\"]" },
                  { en: "Three separate variables", fa: "سه متغیرِ جدا از هم" },
                ],
                answer: 0,
                explain: {
                  en: "split cuts at every comma and gathers the pieces into an array of three strings.",
                  fa: "split در هر ویرگول می‌بُرد و تکه‌ها را در آرایه‌ای از سه رشته جمع می‌کند.",
                },
              },
              {
                q: { en: "What does [\"Mon\", \"Tue\"].join(\" | \") return?", fa: "[\"Mon\", \"Tue\"].join(\" | \") چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "\"Mon | Tue\"", fa: "\"Mon | Tue\"" },
                  { en: "\"Mon|Tue\" — join ignores spaces", fa: "\"Mon|Tue\" — join فاصله‌ها را نادیده می‌گیرد" },
                  { en: "[\"Mon | Tue\"]", fa: "[\"Mon | Tue\"]" },
                  { en: "\"MonTue\"", fa: "\"MonTue\"" },
                ],
                answer: 0,
                explain: {
                  en: "join places the separator BETWEEN items: Mon, then \" | \", then Tue — exactly as you typed it.",
                  fa: "join جداکننده را «بین» آیتم‌ها می‌گذارد: Mon، بعد \" | \"، بعد Tue — دقیقاً همان‌طور که تایپ کردی.",
                },
              },
              {
                q: { en: "\"TEKA\".split(\"\") returns…", fa: "\"TEKA\".split(\"\") چه برمی‌گرداند؟" },
                options: [
                  { en: "[\"T\", \"E\", \"K\", \"A\"]", fa: "[\"T\", \"E\", \"K\", \"A\"]" },
                  { en: "\"TEKA\"", fa: "\"TEKA\"" },
                  { en: "[\"TEKA\"]", fa: "[\"TEKA\"]" },
                  { en: "\"\" — an empty string", fa: "\"\" — یک رشته‌ی خالی" },
                ],
                answer: 0,
                explain: {
                  en: "An empty separator cuts between EVERY character, so you get one letter per item.",
                  fa: "جداکننده‌ی خالی بین «هر» کاراکتر می‌بُرد، پس به‌ازای هر حرف یک آیتم می‌گیری.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The crew board", fa: "تخته‌ی گروه" },
            brief: {
              en: "The page has an empty #board and an empty #out, and the raw string is already defined. In the script: split raw on \",\" and then each person on \":\" to render one <p class=\"crew\"> per person into #board with text like: Ava → stage — finally join ONLY the names with \" • \" and render into #out: Ava • Sina • Mina",
              fa: "صفحه یک #board و یک #out خالی دارد و رشته‌ی raw از قبل تعریف شده. در اسکریپت: raw را روی \",\" و هر نفر را روی \":\" split کن و برای هر نفر یک <p class=\"crew\"> در #board رندر کن با متنی مثل: Ava → stage — آخرِ کار فقط نام‌ها را با \" • \" join کن و در #out رندر کن: Ava • Sina • Mina",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The crew board</title>
  </head>
  <body>
    <h1>Backstage crew 🎭</h1>
    <div id="board"></div>
    <p id="out"></p>

    <script>
      const raw = "Ava:stage,Sina:lights,Mina:sound";
      // 1) raw.split(",") → people
      // 2) Loop: each person.split(":") → name + role
      // 3) Render <p class="crew"> with "name → role" into #board
      // 4) Collect the names, join with " • ", render into #out
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The crew board</title>
  </head>
  <body>
    <h1>Backstage crew 🎭</h1>
    <div id="board"></div>
    <p id="out"></p>

    <script>
      const raw = "Ava:stage,Sina:lights,Mina:sound";
      const people = raw.split(",");

      const names = [];
      const board = document.querySelector("#board");
      for (const person of people) {
        const parts = person.split(":");
        const p = document.createElement("p");
        p.className = "crew";
        p.textContent = parts[0] + " → " + parts[1];
        board.append(p);
        names.push(parts[0]);
      }

      document.querySelector("#out").textContent = names.join(" • ");
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Two splits: first on the comma (the people), then on the colon (each person's name and role).",
                fa: "دو split: اول روی ویرگول (مردم)، بعد روی دونقطه (نام و نقشِ هر نفر).",
              },
              {
                en: "Push each name into an array while you loop — then one join paints the summary.",
                fa: "همین‌طور که حلقه می‌چرخد هر نام را در یک آرایه push کن — بعد یک join، خلاصه را نقاشی می‌کند.",
              },
              {
                en: "Expected: 3 p.crew lines plus #out reading exactly: Ava • Sina • Mina",
                fa: "مورد انتظار: سه خطِ p.crew و #out که دقیقاً این را نشان می‌دهد: Ava • Sina • Mina",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".crew", count: 3 },
                { selector: ".crew", text: "Ava → stage" },
                { selector: "#out", text: "Ava • Sina • Mina" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m14-l2",
        title: { en: "includes, startsWith, endsWith", fa: "includes و startsWith و endsWith" },
        goal: {
          en: "Ask three yes/no questions about any string — contains, begins with, ends with — and search case-insensitively.",
          fa: "سه پرسشِ بله/نه از هر رشته بپرسی — شامل است، شروع می‌شود، تمام می‌شود — و بی‌توجه به بزرگیِ حروف جست‌وجو کنی.",
        },
        minutes: 16,
        steps: [
          {
            kind: "theory",
            title: { en: "Three questions about a string", fa: "سه پرسش از یک رشته" },
            blocks: [
              {
                type: "text",
                en: "These three methods all answer with a plain boolean. `includes(x)` — is x anywhere inside? `startsWith(x)` — does the string BEGIN with x? `endsWith(x)` — does it FINISH with x? Together they cover almost every text-detection need: spam filters, file extensions, command prefixes.",
                fa: "این سه متد همه با یک بولینِ ساده جواب می‌دهند. `includes(x)` — آیا x جایی داخلش هست؟ `startsWith(x)` — آیا رشته با x «شروع» می‌شود؟ `endsWith(x)` — آیا با x «تمام» می‌شود؟ با هم تقریباً هر نیازِ تشخیصِ متن را پوشش می‌دهند: فیلترِ هرزنامه، پسوندِ فایل، پیشوندِ دستور.",
              },
              {
                type: "code",
                lang: "js",
                code: `const file = "photo.PNG";

console.log(file.startsWith("photo"));  // true
console.log(file.endsWith(".png"));     // false — case matters!
console.log(file.includes("."));        // true`,
              },
              {
                type: "tip",
                en: "All three are case-sensitive: \"Hi\".includes(\"hi\") is false. When the case should not matter, lowercase BOTH sides first — the next block shows the idiom.",
                fa: "هر سه به بزرگیِ حروف حساس‌اند: \"Hi\".includes(\"hi\") برابر با false است. وقتی بزرگیِ حروف نباید مهم باشد، اول «هر دو طرف» را کوچک کن — در بلوکِ بعدی، رسم‌الخطِ این کار را می‌بینی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Case-insensitive searching", fa: "جست‌وجوی بی‌توجه به بزرگیِ حروف" },
            blocks: [
              {
                type: "text",
                en: "The everyday idiom: `text.toLowerCase().includes(word.toLowerCase())`. Lowercase both sides and \"SH\" happily finds \"Ship it\". It reads long, but it is THE pattern — you will type it a hundred times in real apps, and in the search lesson of the finale.",
                fa: "رسم‌الخطِ روزمره: `text.toLowerCase().includes(word.toLowerCase())`. هر دو طرف را کوچک کن و \"SH\" به‌راحتی \"Ship it\" را پیدا می‌کند. کمی بلند به نظر می‌رسد، اما دقیقاً «همین» الگوست — در اپ‌های واقعی صد بار تایپش خواهی کرد، و در درسِ جست‌وجوی فینال.",
              },
              {
                type: "code",
                lang: "js",
                code: `function containsWord(sentence, word) {
  return sentence.toLowerCase().includes(word.toLowerCase());
}

console.log(containsWord("Ship it today", "SHIP")); // true`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>String checks</title>
  </head>
  <body>
    <h1>Email gate 📧</h1>
    <p id="out"></p>

    <script>
      const email = "ava@teka.io";
      const p = document.querySelector("#out");
      if (email.includes("@") && email.endsWith(".io")) {
        p.textContent = "✅ " + email + " looks valid";
      } else {
        p.textContent = "⛔ " + email + " is not an email";
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — two boolean questions decide one verdict line.",
                  fa: "پیش‌نمایش را بزن — دو پرسشِ بولینی، یک خطِ حکم را تصمیم می‌گیرند.",
                },
              },
              {
                type: "warn",
                en: "includes checks an EXACT substring — spaces count. \"Buy now\".includes(\"buynow\") is false, and so is \"free  prize\".includes(\"free prize\") with a double space. Normalize with trim() (next lesson) when the text comes from humans.",
                fa: "includes «دقیقاً» زیررشته را چک می‌کند — فاصله‌ها هم حسابند. \"Buy now\".includes(\"buynow\") برابر با false است و \"free  prize\".includes(\"free prize\") با دو فاصله هم همین‌طور. وقتی متن از آدم‌ها می‌آید، با trim() (درسِ بعد) پاک‌سازی کن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does \"teka-academy.io\".endsWith(\".io\") return?", fa: "\"teka-academy.io\".endsWith(\".io\") چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "true", fa: "true" },
                  { en: "false", fa: "false" },
                  { en: "\".io\"", fa: "\".io\"" },
                  { en: "It throws an error", fa: "خطا می‌دهد" },
                ],
                answer: 0,
                explain: {
                  en: "The string literally finishes with the characters .io — endsWith answers true.",
                  fa: "رشته واقعاً با نویسه‌های .io تمام می‌شود — endsWith جواب true می‌دهد.",
                },
              },
              {
                q: { en: "What does \"Hello\".includes(\"hell\") return?", fa: "\"Hello\".includes(\"hell\") چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "false — capital H breaks the match", fa: "false — H بزرگ جورِ match را به هم می‌زند" },
                  { en: "true", fa: "true" },
                  { en: "\"hell\"", fa: "\"hell\"" },
                  { en: "undefined", fa: "undefined" },
                ],
                answer: 0,
                explain: {
                  en: "includes is case-sensitive: \"Hello\" contains \"Hell\", not \"hell\". Lowercase both sides to match anyway.",
                  fa: "includes به بزرگیِ حروف حساس است: در \"Hello\"، رشته‌ی \"Hell\" هست، نه \"hell\". اگر می‌خواهی به هر حال match شود، هر دو طرف را کوچک کن.",
                },
              },
              {
                q: { en: "Which method answers \"does it BEGIN with these characters?\"", fa: "کدام متد جواب می‌دهد «با این نویسه‌ها شروع می‌شود؟»" },
                options: [
                  { en: "startsWith", fa: "startsWith" },
                  { en: "includes", fa: "includes" },
                  { en: "endsWith", fa: "endsWith" },
                  { en: "split", fa: "split" },
                ],
                answer: 0,
                explain: {
                  en: "startsWith pins the BEGINNING; includes allows the match anywhere; endsWith pins the end.",
                  fa: "startsWith «ابتدا» را قفل می‌کند؛ includes اجازه می‌دهد match هر جای رشته باشد؛ endsWith انتها را قفل می‌کند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The spam detector", fa: "دیده‌بانِ هرزنامه" },
            brief: {
              en: "The comments array is seeded. Loop and render each comment as <p class=\"msg\"> with its own text, and add class \"flag\" to every comment that startsWith \"Buy\" OR includes \"free\" — finally render into #verdict: Caught: 2",
              fa: "آرایه‌ی comments از قبل هست. حلقه بزن و هر کامنت را به‌شکل <p class=\"msg\"> با متنِ خودش رندر کن، و به هر کامنتی که با \"Buy\" شروع می‌شود «یا» \"free\" را شامل می‌شود کلاس \"flag\" بده — آخر هم در #verdict رندر کن: Caught: 2",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Spam detector</title>
  </head>
  <body>
    <h1>Comment watch 👀</h1>
    <div id="feed"></div>
    <p id="verdict"></p>

    <script>
      const comments = ["Buy now!!!", "Great post, thanks", "free prize inside", "See you at class"];
      // 1) Loop over comments, render <p class="msg"> with the text into #feed
      // 2) If c.startsWith("Buy") || c.includes("free") → add class "flag"
      // 3) Count the flagged ones → #verdict: "Caught: N"
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Spam detector</title>
  </head>
  <body>
    <h1>Comment watch 👀</h1>
    <div id="feed"></div>
    <p id="verdict"></p>

    <script>
      const comments = ["Buy now!!!", "Great post, thanks", "free prize inside", "See you at class"];
      const feed = document.querySelector("#feed");
      let caught = 0;

      for (const c of comments) {
        const p = document.createElement("p");
        p.className = "msg";
        p.textContent = c;
        if (c.startsWith("Buy") || c.includes("free")) {
          p.classList.add("flag");
          caught = caught + 1;
        }
        feed.append(p);
      }

      document.querySelector("#verdict").textContent = "Caught: " + caught;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The verdict is an accumulator: let caught = 0 BEFORE the loop, add inside the if.",
                fa: "شمارنده یک انباشتگر است: قبل از حلقه let caught = 0 و داخلِ if اضافه‌اش کن.",
              },
              {
                en: "One if with || covers both spam signals — startsWith for \"Buy\", includes for \"free\".",
                fa: "یک if با || هر دو نشانه‌ی هرزنامه را می‌پوشاند — startsWith برای \"Buy\" و includes برای \"free\".",
              },
              {
                en: "Expected: 4 p.msg, exactly 2 with class flag, and #verdict reading: Caught: 2",
                fa: "مورد انتظار: چهار p.msg که دقیقاً دو تای‌شان کلاس flag دارند و #verdict این را نشان می‌دهد: Caught: 2",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".msg", count: 4 },
                { selector: ".msg.flag", count: 2 },
                { selector: "#verdict", text: "Caught: 2" },
                { selector: "#feed", text: "Great post, thanks" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m14-l3",
        title: { en: "trim, slice & Case Shifters", fa: "trim و slice و جابه‌جایانِ بزرگیِ حروف" },
        goal: {
          en: "Clean messy text with trim, cut pieces with slice, and shift case with toUpperCase / toLowerCase.",
          fa: "متن‌های شلوغ را با trim تمیز کنی، با slice تکه بگیری و با toUpperCase و toLowerCase بزرگیِ حروف را جابه‌جا کنی.",
        },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            title: { en: "The cleaning crew", fa: "تیمِ نظافت" },
            blocks: [
              {
                type: "text",
                en: "Text from the real world is dirty: \"  Ava  \" has sneaky spaces, \"sina\" wears the wrong case. `trim()` shaves whitespace from BOTH ends, `toUpperCase()` / `toLowerCase()` shift the case — and crucially, they all RETURN a new string. The original never changes; you keep the result.",
                fa: "متنِ دنیای واقعی کثیف است: \"  Ava  \" فاصله‌های قاچاقی دارد و \"sina\" لباسِ اشتباه پوشیده. `trim()` فاصله‌های دو سر را می‌تراشد و `toUpperCase()` و `toLowerCase()` بزرگیِ حروف را عوض می‌کنند — و نکته‌ی مهم: همه‌شان یک رشته‌ی «نو» برمی‌گردانند. اصلِ رشته هرگز عوض نمی‌شود؛ نتیجه را خودت نگه می‌داری.",
              },
              {
                type: "code",
                lang: "js",
                code: `const raw = "  Ava  ";

console.log(raw.trim());            // "Ava"
console.log(raw.toUpperCase());     // "  AVA  " — case only, no trim
console.log(raw.length);            // 7 — spaces count
console.log(raw.trim().length);     // 3`,
              },
              {
                type: "tip",
                en: ".length counts every character INCLUDING spaces — that is why trim() comes first in almost every validation (m18 lives on this).",
                fa: "‎.length همه‌ی نویسه‌ها را «با فاصله‌ها» می‌شمارد — به همین دلیل trim تقریباً همیشه اول از همه می‌آید (اعتبارسنجیِ m18 روی همین سوار است).",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "slice — the scissors", fa: "slice — قیچی" },
            blocks: [
              {
                type: "text",
                en: "`slice(start, end)` cuts from `start` up to but NOT including `end` — and if you skip `end`, it cuts to the finish. Negative numbers count from the END of the string. It is the safe way to take a prefix, a suffix, or any window of characters.",
                fa: "`slice(start, end)` از `start` تا «قبل از» `end` می‌بُرد — اگر `end` را ننویسی، تا تهِ رشته می‌بُرد. عددِ منفی از «انتهای» رشته می‌شمارد. این راهِ امن برای گرفتنِ پیشوند، پسوند، یا هر پنجره‌ای از نویسه‌هاست.",
              },
              {
                type: "code",
                lang: "js",
                code: `const word = "JavaScript";

console.log(word.slice(0, 4));   // "Java" — 0..3, end NOT included
console.log(word.slice(4));      // "Script" — from 4 to the end
console.log(word.slice(-6));     // "Script" — last 6 characters
console.log(word.slice(0, 3).toUpperCase()); // "JAV" — chains read left to right`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Username cleaner</title>
  </head>
  <body>
    <h1>Username factory 🏭</h1>
    <p id="out"></p>

    <script>
      const raw = "  Ava_99  ";
      const clean = raw.trim().toLowerCase().slice(0, 6);
      document.querySelector("#out").textContent = "Welcome, @" + clean;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — trim → lowercase → slice, one chained pipeline.",
                  fa: "پیش‌نمایش را بزن — trim و بعد lowercase و بعد slice: یک لوله‌ی زنجیره‌ای.",
                },
              },
              {
                type: "warn",
                en: "An empty range quietly gives \"\": \"code\".slice(5, 2) returns \"\" — no error, just nothing. If a slice comes back empty, suspect the numbers, not the machine.",
                fa: "بازه‌ی خالی بی‌سروصدا \"\" می‌دهد: \"code\".slice(5, 2) برمی‌گرداند \"\" — نه خطا، فقط هیچ. اگر slice دست‌خالی برگشت، به عددها شک کن، نه به ماشین.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does \"  hi  \".trim() return?", fa: "\"  hi  \".trim() چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "\"hi\"", fa: "\"hi\"" },
                  { en: "\"  hi  \" — unchanged", fa: "\"  hi  \" — بدون تغییر" },
                  { en: "\"hi  \"", fa: "\"hi  \"" },
                  { en: "It throws an error", fa: "خطا می‌دهد" },
                ],
                answer: 0,
                explain: {
                  en: "trim shaves whitespace from both ends — the middle of the string is never touched.",
                  fa: "trim فاصله‌های دو سر را می‌تراشد — وسطِ رشته هرگز دست نمی‌خورد.",
                },
              },
              {
                q: { en: "What does \"JavaScript\".slice(0, 4) return?", fa: "\"JavaScript\".slice(0, 4) چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "\"Java\"", fa: "\"Java\"" },
                  { en: "\"Jav\"", fa: "\"Jav\"" },
                  { en: "\"JavaS\"", fa: "\"JavaS\"" },
                  { en: "\"Script\"", fa: "\"Script\"" },
                ],
                answer: 0,
                explain: {
                  en: "slice(0, 4) takes indexes 0, 1, 2, 3 — the end index 4 is NOT included.",
                  fa: "slice(0, 4) اندیس‌های 0 و 1 و 2 و 3 را می‌گیرد — اندیسِ پایانیِ 4 «شامل» نمی‌شود.",
                },
              },
              {
                q: { en: "After `const up = \"code\".toUpperCase();` what is true?", fa: "بعد از `const up = \"code\".toUpperCase();` چه چیزی درست است؟" },
                options: [
                  { en: "up is \"CODE\" and the original is still \"code\"", fa: "up برابر با \"CODE\" است و اصلِ رشته همان \"code\" مانده" },
                  { en: "up is \"CODE\" and the original became \"CODE\" too", fa: "up برابر با \"CODE\" است و اصلِ رشته هم \"CODE\" شده" },
                  { en: "up is \"code\"", fa: "up برابر با \"code\" است" },
                  { en: "It throws an error", fa: "خطا می‌دهد" },
                ],
                answer: 0,
                explain: {
                  en: "Strings are immutable: case-shifters RETURN a new string and leave the original alone.",
                  fa: "رشته‌ها تغییرناپذیرند: جابه‌جایانِ بزرگیِ حروف یک رشته‌ی نو برمی‌گردانند و اصل را رها می‌کنند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The username factory", fa: "کارخانه‌ی نامِ کاربری" },
            brief: {
              en: "The raw array holds 3 messy usernames. Clean each one — trim, toLowerCase, then slice(0, 6) — and render it as <p class=\"user\"> into #board. Finally render into #report: First user: ava_99",
              fa: "آرایه‌ی raw سه نامِ کاربریِ شلوغ دارد. هرکدام را تمیز کن — trim و بعد toLowerCase و بعد slice(0, 6) — و به‌شکل <p class=\"user\"> در #board رندر کن. آخر هم در #report رندر کن: First user: ava_99",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Username factory</title>
  </head>
  <body>
    <h1>Username factory 🏭</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const raw = ["  Ava_99 ", "  SiNa ", "MiNa.Dev "];
      // 1) Loop over raw
      // 2) clean = name.trim().toLowerCase().slice(0, 6)
      // 3) Render <p class="user"> with the clean name into #board
      // 4) #report: "First user: " + the cleaned first name
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Username factory</title>
  </head>
  <body>
    <h1>Username factory 🏭</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const raw = ["  Ava_99 ", "  SiNa ", "MiNa.Dev "];
      const board = document.querySelector("#board");

      for (const name of raw) {
        const clean = name.trim().toLowerCase().slice(0, 6);
        const p = document.createElement("p");
        p.className = "user";
        p.textContent = clean;
        board.append(p);
      }

      const first = raw[0].trim().toLowerCase().slice(0, 6);
      document.querySelector("#report").textContent = "First user: " + first;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Chain the three tools left to right: name.trim().toLowerCase().slice(0, 6).",
                fa: "سه ابزار را از چپ به راست زنجیر کن: name.trim().toLowerCase().slice(0, 6).",
              },
              {
                en: "The report needs the SAME cleaning applied to raw[0] — reuse the exact chain.",
                fa: "برای گزارش باید همان پاک‌سازی را روی raw[0] اجرا کنی — همان زنجیره را عیناً تکرار کن.",
              },
              {
                en: "Expected: 3 p.user (ava_99, sina, mina.d) and #report reading: First user: ava_99",
                fa: "مورد انتظار: سه p.user (با ava_99 و sina و mina.d) و #report که نشان می‌دهد: First user: ava_99",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".user", count: 3 },
                { selector: ".user", text: "ava_99" },
                { selector: ".user", text: "mina.d" },
                { selector: "#report", text: "First user: ava_99" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m14-l4",
        title: { en: "Mini-project: Text Stats Machine", fa: "مینی‌پروژه: ماشینِ آمارِ متن" },
        goal: {
          en: "Combine every string tool into one pipeline: split, count, slice and shout — rendered into labeled stat boxes.",
          fa: "همه‌ی ابزارهای رشته را در یک لوله ترکیب کنی: split و شمردن و slice و فریاد — و در جعبه‌های آمارِ برچسب‌دار رندر کنی.",
        },
        minutes: 18,
        steps: [
          {
            kind: "theory",
            title: { en: "Plan the pipeline", fa: "لوله را طرح بریز" },
            blocks: [
              {
                type: "text",
                en: "Mini-projects start on paper. The flow: raw text → `split(\" \")` gives the words → words.length counts them → text.length counts characters → slice takes a preview → toUpperCase shouts. Five boxes, five derived values, zero new syntax — only tools you already own, assembled with intent.",
                fa: "مینی‌پروژه از روی کاغذ شروع می‌شود. جریان کار: متنِ خام ← `split(\" \")` واژه‌ها را می‌دهد ← words.length آنها را می‌شمارد ← text.length نویسه‌ها را می‌شمارد ← slice پیش‌نمایش می‌گیرد ← toUpperCase فریاد می‌زند. پنج جعبه، پنج مقدارِ مشتق‌شده، صفر سینتکسِ تازه — فقط ابزارهایی که داری، با نظم سرهم می‌شوند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const text = "code is fun";

const words = text.split(" ");      // ["code", "is", "fun"]
const first = words[0];             // "code"
const shout = text.toUpperCase();   // "CODE IS FUN"
const head = text.slice(0, 4);      // "code"`,
              },
              {
                type: "tip",
                en: "This pipeline assumes single spaces between words (our seeded texts are clean). Double spaces would create \"\" word-slots — a real app would clean that first, and now you know trim() is only the beginning.",
                fa: "این لوله فرض می‌کند بین واژه‌ها فقط یک فاصله است (متن‌های به‌کاررفته‌ی ما تمیزند). دو فاصله پشت‌سرهم خانه‌های \"\" می‌سازد — اپِ واقعی اول این را تمیز می‌کند، و حالا می‌دانی trim فقط شروعِ ماجراست.",
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
    <title>Text stats</title>
  </head>
  <body>
    <h1>Text stats machine 📊</h1>
    <p id="words"></p>
    <p id="shout"></p>

    <script>
      const text = "JavaScript makes the page come alive";
      const words = text.split(" ");
      document.querySelector("#words").textContent =
        "Words: " + words.length + ", first: " + words[0];
      document.querySelector("#shout").textContent = text.toUpperCase();
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one line of raw text becomes four live statistics.",
                  fa: "پیش‌نمایش را بزن — یک خطِ متنِ خام به چهار آمارِ زنده تبدیل می‌شود.",
                },
              },
              {
                type: "text",
                en: "Why this matters beyond the exercise: the exact same pipeline powers search boxes (count + preview), tweet composers (character counters) and file readers (first-line preview). You built a component pattern, not a toy.",
                fa: "اهمیتش فراتر از این تمرین است: همین لوله، موتورِ جعبه‌های جست‌وجو (شمارش + پیش‌نمایش)، نوشتارِ توییت (شمارنده‌ی نویسه) و خواندنِ فایل (پیش‌نمایشِ خطِ اول) است. تو یک الگوی کامپوننت ساختی، نه یک اسباب‌بازی.",
              },
              {
                type: "warn",
                en: "Numbers rendered into the DOM become text again. A number has no .length — only strings do. Concatenation (\"Words: \" + n) converts for you; raw math on rendered text does not exist.",
                fa: "عددهایی که به DOM رندر می‌شوند، دوباره متن می‌شوند. عدد .length ندارد — فقط رشته دارد. چسباندنِ رشته (\"Words: \" + n) تبدیل را انجام می‌دهد؛ اما روی متنِ رندرشده دیگر ریاضی وجود ندارد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which expression counts the words of `text` (single-spaced)?", fa: "کدام عبارت واژه‌های text را می‌شمارد (با فاصله‌های تکی)؟" },
                options: [
                  { en: "text.split(\" \").length", fa: "text.split(\" \").length" },
                  { en: "text.length", fa: "text.length" },
                  { en: "text.split(\"\").length", fa: "text.split(\"\").length" },
                  { en: "count(text)", fa: "count(text)" },
                ],
                answer: 0,
                explain: {
                  en: "split(\" \") breaks the text into words; .length then counts them. text.length would count CHARACTERS.",
                  fa: "split(\" \") متن را به واژه‌ها می‌شکند؛ بعد .length آنها را می‌شمارد. اما text.length «نویسه‌ها» را می‌شمارد.",
                },
              },
              {
                q: { en: "With text = \"code is fun\", what is text.split(\" \")[1]?", fa: "با text = \"code is fun\"، مقدار text.split(\" \")[1] چیست؟" },
                options: [
                  { en: "\"is\"", fa: "\"is\"" },
                  { en: "\"code\"", fa: "\"code\"" },
                  { en: "\"fun\"", fa: "\"fun\"" },
                  { en: "[\"is\"]", fa: "[\"is\"]" },
                ],
                answer: 0,
                explain: {
                  en: "Arrays index from 0: [0] is \"code\", [1] is \"is\".",
                  fa: "اندیسِ آرایه از 0 شروع می‌شود: [0] برابر با \"code\" و [1] برابر با \"is\" است.",
                },
              },
              {
                q: { en: "What is \"JavaScript\".length?", fa: "\"JavaScript\".length چند است؟" },
                options: [
                  { en: "10 — a number", fa: "10 — یک عدد" },
                  { en: "\"10\" — a string", fa: "\"10\" — یک رشته" },
                  { en: "9", fa: "9" },
                  { en: "It throws an error", fa: "خطا می‌دهد" },
                ],
                answer: 0,
                explain: {
                  en: "J-a-v-a-S-c-r-i-p-t: ten characters, and .length always returns a NUMBER.",
                  fa: "ده نویسه، و .length همیشه «عدد» برمی‌گرداند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The text stats machine", fa: "ماشینِ آمارِ متن" },
            brief: {
              en: "The text variable is seeded in the script. Build the machine: #words → Words: 6, #chars → Chars: 36, #shout → the text in UPPERCASE, #short → text.slice(0, 10). Compute everything from text — no hardcoded answers.",
              fa: "متغیرِ text در اسکریپت هست. ماشین را بساز: #words ← Words: 6 و #chars ← Chars: 36 و #shout ← متن با حروفِ بزرگ و #short ← text.slice(0, 10). همه‌چیز را از خودِ text حساب کن — جوابِ هاردکد ممنوع.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Text stats machine</title>
  </head>
  <body>
    <h1>Text stats machine 📊</h1>
    <p id="words"></p>
    <p id="chars"></p>
    <p id="shout"></p>
    <p id="short"></p>

    <script>
      const text = "JavaScript makes the page come alive";
      // 1) #words → "Words: " + text.split(" ").length
      // 2) #chars → "Chars: " + text.length
      // 3) #shout → text.toUpperCase()
      // 4) #short → text.slice(0, 10)
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Text stats machine</title>
  </head>
  <body>
    <h1>Text stats machine 📊</h1>
    <p id="words"></p>
    <p id="chars"></p>
    <p id="shout"></p>
    <p id="short"></p>

    <script>
      const text = "JavaScript makes the page come alive";
      const words = text.split(" ");

      document.querySelector("#words").textContent = "Words: " + words.length;
      document.querySelector("#chars").textContent = "Chars: " + text.length;
      document.querySelector("#shout").textContent = text.toUpperCase();
      document.querySelector("#short").textContent = text.slice(0, 10);
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Four boxes, four tool calls — every value derives from text itself.",
                fa: "چهار جعبه، چهار صدازدنِ ابزار — هر مقدار از خودِ text مشتق می‌شود.",
              },
              {
                en: "#short uses slice(0, 10) — the end index is NOT included, so you get exactly \"JavaScript\".",
                fa: "برای #short از slice(0, 10) استفاده کن — اندیسِ پایانی «شامل» نمی‌شود، پس دقیقاً \"JavaScript\" می‌گیری.",
              },
              {
                en: "Expected labels: Words: 6, Chars: 36, the shouted text, and JavaScript in #short.",
                fa: "برچسب‌های مورد انتظار: Words: 6 و Chars: 36 و متنِ فریادی و JavaScript در #short.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "#words", text: "Words: 6" },
                { selector: "#chars", text: "Chars: 36" },
                { selector: "#shout", text: "JAVASCRIPT MAKES" },
                { selector: "#short", text: "JavaScript" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 15 ───────────────────────────────────────────
  {
    id: "js-m15",
    title: { en: "Array Power Tools", fa: "ابزارهای قدرتمندِ آرایه‌ها" },
    blurb: {
      en: "Arrays get muscles: transform every item with map, keep only the survivors with filter, boil a list down to one number with reduce — then render the results straight onto the page.",
      fa: "آرایه‌ها عضله می‌گیرند: با map تک‌تکِ آیتم‌ها را تبدیل کن، با filter فقط بازمانده‌ها را نگه دار، با reduce یک فهرست را به یک عدد بجوشان — و بعد نتیجه‌ها را مستقیم روی صفحه رندر کن.",
    },
    lessons: [
      {
        id: "js-m15-l1",
        title: { en: "map — Transform Every Item", fa: "map — تک‌تک را تبدیل کن" },
        goal: {
          en: "Transform every item of an array with map — with both the long function form and the arrow shortcut — and render the results to the page.",
          fa: "با map تک‌تکِ آیتم‌های یک آرایه را تبدیل کنی — هم با شکلِ تابعیِ بلند و هم با میان‌بُرِ فلش — و نتیجه‌ها را به صفحه رندر کنی.",
        },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            title: { en: "The conveyor belt", fa: "نوارِ نقاله" },
            blocks: [
              {
                type: "text",
                en: "`map` is a conveyor belt: items go in one side, a function works on EACH one, and a brand-new array comes out the other side. The original array is untouched — map never edits, it always builds. The rule is strict: one input item, one output item, same order. That is why the new array always has exactly the same length.",
                fa: "`map` یک نوارِ نقاله است: آیتم‌ها از یک سو می‌روند داخل، یک تابع روی «هر» کدام کار می‌کند، و یک آرایه‌ی کاملاً نو از سوی دیگر بیرون می‌آید. آرایه‌ی اصلی دست‌نخورده می‌ماند — map هرگز ویرایش نمی‌کند، همیشه می‌سازد. قاعده‌اش سفت‌وسخت است: به‌ازای هر آیتمِ ورودی، یک آیتمِ خروجی، به همان ترتیب. برای همین آرایه‌ی نو همیشه دقیقاً همان طولِ قبلی را دارد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const prices = [100, 250, 40];

const doubled = prices.map(function (price) {
  return price * 2;
});                                        // [200, 500, 80]

console.log(prices);                       // [100, 250, 40] — untouched
console.log(doubled.length);               // 3 — one out per one in`,
              },
              {
                type: "tip",
                en: "You already know this shape: it is the for...of loop you have written since the DOM module, distilled into one method call. map IS the loop — collect into a new array, return the array.",
                fa: "این شکل را می‌شناسی: همان حلقه‌ی for...of است که از ماژولِ ساختن با DOM می‌نویسی، فشرده‌شده در یک صدازدنِ متد. map «خودِ حلقه» است — جمع کن در یک آرایه‌ی نو، آرایه را برگردان.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The arrow shortcut + real rendering", fa: "میان‌بُرِ فلش + رندرِ واقعی" },
            blocks: [
              {
                type: "text",
                en: "Writing `function (x) { return ... }` for a one-liner is wordy. The arrow form `x => x * 2` says the same thing in one breath: take x, give back x * 2. Both forms are the same function to map — pick the one that reads better and stay consistent.",
                fa: "نوشتنِ `function (x) { return ... }` برای یک خط، پرحرفی است. شکلِ فلشی `x => x * 2` همان را در یک نفَس می‌گوید: x بگیر، x * 2 بده. برای map هر دو شکل یک تابع‌اند — هرکدام که خواناتر است را انتخاب کن و همان را ادامه بده.",
              },
              {
                type: "code",
                lang: "js",
                code: `const scores = [12, 9, 17];

const labels = scores.map((s) => "Score: " + s);
// ["Score: 12", "Score: 9", "Score: 17"]

const long = scores.map(function (s) {
  return "Score: " + s;
});
// exactly the same array — just more words`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Price wall</title>
  </head>
  <body>
    <h1>Price wall 💰</h1>
    <div id="board"></div>

    <script>
      const prices = [100, 250, 40];
      const tags = prices.map((p) => "$" + p * 2);

      for (const tag of tags) {
        const el = document.createElement("p");
        el.textContent = tag;
        document.querySelector("#board").append(el);
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — one map builds the labels, one loop paints them.",
                  fa: "پیش‌نمایش را بزن — یک map برچسب‌ها را می‌سازد و یک حلقه نقاشی‌شان می‌کند.",
                },
              },
              {
                type: "warn",
                en: "map always returns an array — if you forget `return` inside a function body, every slot becomes undefined while the length still matches. One in, one out: a missing return is the #1 map bug.",
                fa: "map همیشه آرایه برمی‌گرداند — اگر داخلِ بدنه‌ی تابع `return` را جا بیندازی، همه‌ی خانه‌ها undefined می‌شوند در حالی که طول هنوز درست می‌ماند. یکی در، یکی بیرون: returnِ جامانده باگِ شماره‌ی یکِ map است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does [1, 2, 3].map((n) => n * 10) return?", fa: "[1, 2, 3].map((n) => n * 10) چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "[1, 2, 3]", fa: "[1, 2, 3]" },
                  { en: "[10, 20, 30]", fa: "[10, 20, 30]" },
                  { en: "60", fa: "60" },
                  { en: "30", fa: "30" },
                ],
                answer: 1,
                explain: {
                  en: "map runs the recipe on each item and collects the results, in order, into a new array.",
                  fa: "map دستورِ پخت را روی هر آیتم اجرا می‌کند و نتیجه‌ها را به‌ترتیب در یک آرایه‌ی نو جمع می‌کند.",
                },
              },
              {
                q: { en: "What is true about the ORIGINAL array after a map?", fa: "بعد از یک map، درباره‌ی آرایه‌ی «اصلی» چه چیزی درست است؟" },
                options: [
                  { en: "It is unchanged — map builds a new array", fa: "دست‌نخورده است — map یک آرایه‌ی نو می‌سازد" },
                  { en: "It is replaced by the transformed array", fa: "با آرایه‌ی تبدیل‌شده جایگزین می‌شود" },
                  { en: "It loses its items one by one", fa: "آیتم‌هایش یکی‌یکی از دست می‌رود" },
                  { en: "It becomes undefined", fa: "undefined می‌شود" },
                ],
                answer: 0,
                explain: {
                  en: "map never edits the source. It walks it once and returns a brand-new array of the same length.",
                  fa: "map هرگز به منبع دست نمی‌زند. یک بار روی آن راه می‌رود و یک آرایه‌ی کاملاً نو با همان طول برمی‌گرداند.",
                },
              },
              {
                q: { en: "You forget return inside your map function. What comes out?", fa: "return را داخلِ تابعِ map جا می‌اندازی. چه چیزی بیرون می‌آید؟" },
                options: [
                  { en: "An error", fa: "یک خطا" },
                  { en: "An empty array", fa: "یک آرایه‌ی خالی" },
                  { en: "An array of the same length, full of undefined", fa: "آرایه‌ای با همان طول، پر از undefined" },
                  { en: "The original array", fa: "خودِ آرایه‌ی اصلی" },
                ],
                answer: 2,
                explain: {
                  en: "No return means every call yields undefined — but the one-in-one-out rule keeps the length, so you get undefined-filled slots.",
                  fa: "بدون return هر صدازدن undefined می‌دهد — اما قاعده‌ی «یکی در، یکی بیرون» طول را نگه می‌دارد، پس خانه‌های پر از undefined می‌گیری.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The price wall", fa: "دیوارِ قیمت" },
            brief: {
              en: "The prices array is seeded: [4, 9, 16]. Build tags = prices.map((p) => \"$\" + p) and render each tag as a <p class=\"tag\"> into #board. Finally render into #report: First tag: $4 — computed from tags[0], not typed by hand.",
              fa: "آرایه‌ی prices از قبل هست: [4, 9, 16]. ‏tags را بساز = prices.map((p) => \"$\" + p) و هر tag را به‌شکل <p class=\"tag\"> در #board رندر کن. آخر هم در #report رندر کن: First tag: $4 — که از tags[0] حساب شود، نه دستی تایپ.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The price wall</title>
  </head>
  <body>
    <h1>Price wall 💰</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const prices = [4, 9, 16];
      // 1) tags = prices.map((p) => "$" + p)
      // 2) Loop over tags → render <p class="tag"> into #board
      // 3) #report: "First tag: " + tags[0]
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The price wall</title>
  </head>
  <body>
    <h1>Price wall 💰</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const prices = [4, 9, 16];

      const tags = prices.map((p) => "$" + p);
      const board = document.querySelector("#board");

      for (const tag of tags) {
        const el = document.createElement("p");
        el.className = "tag";
        el.textContent = tag;
        board.append(el);
      }

      document.querySelector("#report").textContent = "First tag: " + tags[0];
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The map call is one line: prices.map((p) => \"$\" + p).",
                fa: "صدازدنِ map یک خط است: prices.map((p) => \"$\" + p).",
              },
              {
                en: "Render exactly like the DOM module: createElement, className, textContent, append.",
                fa: "رندر دقیقاً مثل ماژولِ DOM: createElement و className و textContent و append.",
              },
              {
                en: "Expected: 3 p.tag lines ($4, $9, $16) plus #report reading: First tag: $4",
                fa: "مورد انتظار: سه خطِ p.tag ($4 و $9 و $16) و #report که نشان می‌دهد: First tag: $4",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".tag", count: 3 },
                { selector: ".tag", text: "$9" },
                { selector: "#report", text: "First tag: $4" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m15-l2",
        title: { en: "filter — Keep the Survivors", fa: "filter — بازمانده‌ها را نگه دار" },
        goal: {
          en: "Cut an array down with filter — boolean tests in, survivors out — and chain filter with map for the classic two-step pipeline.",
          fa: "با filter آرایه را کوتاه کنی — تستِ بولینی بده، بازمانده بگیر — و filter را با map زنجیر کنی برای لوله‌ی کلاسیکِ دوپله.",
        },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            title: { en: "The concert gate", fa: "دروازه‌ی کنسرت" },
            blocks: [
              {
                type: "text",
                en: "`filter` is a bouncer at a door: each item steps up, a boolean test asks ONE question — 'in or out?' — and only the items that answer true get through. The result is a new array, usually shorter, in the same order. The test must return a boolean: comparisons like `s >= 10` are perfect for the job.",
                fa: "`filter` مثل مأمورِ درِ ورودی است: هر آیتم جلو می‌آید، یک تستِ بولینی فقط یک پرسش می‌پرسد — «تأیید یا رد؟» — و فقط آیتم‌هایی که true جواب بدهند عبور می‌کنند. نتیجه یک آرایه‌ی نو است، معمولاً کوتاه‌تر، به همان ترتیب. تست باید بولین برگرداند: مقایسه‌هایی مثل `s >= 10` برای این کار عالی‌اند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const scores = [12, 9, 17, 5, 20];

const passing = scores.filter(function (s) {
  return s >= 10;
});                                     // [12, 17, 20]

console.log(scores.length);             // 5 — original untouched
console.log(passing.length);            // 3 — survivors only`,
              },
              {
                type: "tip",
                en: "The result can even be EMPTY: if no item passes, filter returns [] — not an error, not null. Your loops simply run zero times.",
                fa: "نتیجه حتی می‌تواند «خالی» باشد: اگر هیچ آیتمی رد نشود، filter یک [] می‌دهد — نه خطا، نه null. حلقه‌هایت هم فقط صفر بار می‌چرخند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Filter, then map", fa: "اول filter، بعد map" },
            blocks: [
              {
                type: "text",
                en: "The power move: chain them. filter decides WHICH items stay, map decides HOW they look. Read chains left to right — each step consumes the previous array and hands a new one to the next.",
                fa: "حرکتِ قدرتمند: زنجیره کن. filter تصمیم می‌گیرد «کدام» آیتم‌ها بمانند، map تصمیم می‌گیرد «چه‌شکلی» به نظر برسند. زنجیره را از چپ به راست بخوان — هر پله آرایه‌ی قبلی را می‌خورد و یک آرایه‌ی نو به پله‌ی بعد می‌دهد.",
              },
              {
                type: "code",
                lang: "js",
                code: `const scores = [12, 9, 17, 5, 20];

const badges = scores
  .filter((s) => s >= 10)
  .map((s) => s + " ✓");

console.log(badges);    // ["12 ✓", "17 ✓", "20 ✓"]`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Passing wall</title>
  </head>
  <body>
    <h1>Passing wall 🏅</h1>
    <div id="board"></div>

    <script>
      const scores = [12, 9, 17, 5, 20];
      const badges = scores.filter((s) => s >= 10).map((s) => s + " ✓");

      for (const badge of badges) {
        const el = document.createElement("p");
        el.textContent = badge;
        document.querySelector("#board").append(el);
      }
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — five scores in, three golden badges out.",
                  fa: "پیش‌نمایش را بزن — پنج نمره می‌رود داخل، سه نشانِ طلایی بیرون می‌آید.",
                },
              },
              {
                type: "warn",
                en: "Do not confuse the two: filter SHRINKS (a boolean test), map RESHAPES (a transformation). Swapping them changes what you get — filter first when you want labels for the survivors only.",
                fa: "این دو را اشتباه نگیر: filter «کم» می‌کند (تستِ بولینی) و map «تبدیل» می‌کند (تبدیل‌گری). جابه‌جایشان جواب را عوض می‌کند — اول filter، وقتی برچسب فقط برای بازمانده‌ها می‌خواهی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does [3, 8, 12].filter((n) => n > 5) return?", fa: "[3, 8, 12].filter((n) => n > 5) چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "[3]", fa: "[3]" },
                  { en: "[12]", fa: "[12]" },
                  { en: "[8, 12]", fa: "[8, 12]" },
                  { en: "[3, 8, 12]", fa: "[3, 8, 12]" },
                ],
                answer: 2,
                explain: {
                  en: "Only items answering true to n > 5 survive: 8 and 12, in their original order.",
                  fa: "فقط آیتم‌هایی که به n > 5 جوابِ true بدهند زنده می‌مانند: 8 و 12، به همان ترتیبِ قبلی.",
                },
              },
              {
                q: { en: "Compared to the input, the filter result is…", fa: "نتیجه‌ی filter در مقایسه با ورودی…" },
                options: [
                  { en: "Always the same length", fa: "همیشه همان طول" },
                  { en: "The same length or shorter", fa: "همان طول یا کوتاه‌تر" },
                  { en: "Always shorter", fa: "همیشه کوتاه‌تر" },
                  { en: "Usually longer", fa: "معمولاً بلندتر" },
                ],
                answer: 1,
                explain: {
                  en: "Every item can pass (same length) or some can fail (shorter) — filter never adds items.",
                  fa: "ممکن است همه‌ی آیتم‌ها رد شوند (همان طول) یا بعضی رد شوند (کوتاه‌تر) — filter هرگز آیتم اضافه نمی‌کند.",
                },
              },
              {
                q: { en: "What does filter return when NO item passes the test?", fa: "وقتی «هیچ» آیتمی تست را رد نکند، filter چه برمی‌گرداند؟" },
                options: [
                  { en: "An empty array []", fa: "یک آرایه‌ی خالی []" },
                  { en: "null", fa: "null" },
                  { en: "An error", fa: "خطا می‌دهد" },
                  { en: "The original array", fa: "خودِ آرایه‌ی اصلی" },
                ],
                answer: 0,
                explain: {
                  en: "filter always hands back an array — zero survivors means an empty one, and your loop just runs zero times.",
                  fa: "filter همیشه یک آرایه تحویل می‌دهد — صفر بازمانده یعنی آرایه‌ی خالی، و حلقه‌ات فقط صفر بار می‌چرخد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The passing wall", fa: "دیوارِ قبول‌ها" },
            brief: {
              en: "scores = [12, 9, 17, 5, 20] is seeded. Build passing = scores.filter((s) => s >= 10), render each as a <p class=\"pass\"> into #board, and render into #report: Passed: 3 — computed from passing.length, never typed.",
              fa: "‏scores = [12, 9, 17, 5, 20] از قبل هست. ‏passing را بساز = scores.filter((s) => s >= 10)، هرکدام را به‌شکل <p class=\"pass\"> در #board رندر کن و در #report رندر کن: Passed: 3 — که از passing.length حساب شود، نه دستی تایپ.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The passing wall</title>
  </head>
  <body>
    <h1>Passing wall 🏅</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const scores = [12, 9, 17, 5, 20];
      // 1) passing = scores.filter((s) => s >= 10)
      // 2) Loop over passing → render <p class="pass"> into #board
      // 3) #report: "Passed: " + passing.length
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The passing wall</title>
  </head>
  <body>
    <h1>Passing wall 🏅</h1>
    <div id="board"></div>
    <p id="report"></p>

    <script>
      const scores = [12, 9, 17, 5, 20];

      const passing = scores.filter((s) => s >= 10);
      const board = document.querySelector("#board");

      for (const score of passing) {
        const el = document.createElement("p");
        el.className = "pass";
        el.textContent = score;
        board.append(el);
      }

      document.querySelector("#report").textContent = "Passed: " + passing.length;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The filter call: scores.filter((s) => s >= 10) — the test is just a comparison, so it already returns a boolean.",
                fa: "صدازدنِ filter: ‏scores.filter((s) => s >= 10) — تست همان مقایسه است، پس خودبه‌خود بولین برمی‌گرداند.",
              },
              {
                en: "The report is a counter you get for free: passing.length.",
                fa: "شمارنده را مجانی می‌گیری: passing.length.",
              },
              {
                en: "Expected: 3 p.pass lines (12, 17, 20) plus #report reading: Passed: 3",
                fa: "مورد انتظار: سه خطِ p.pass (با 12 و 17 و 20) و #report که نشان می‌دهد: Passed: 3",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".pass", count: 3 },
                { selector: ".pass", text: "17" },
                { selector: "#report", text: "Passed: 3" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m15-l3",
        title: { en: "reduce — Boil It Down", fa: "reduce — بجوشان تا یک مقدار" },
        goal: {
          en: "Collapse an array to a single value with reduce — sums, counts, anything — by walking the accumulator pattern step by step.",
          fa: "با reduce یک آرایه را به یک مقدار برسانی — جمع و شمارش و هرچیز دیگر — با قدم‌زدن در الگوی انباشتگر.",
        },
        minutes: 16,
        steps: [
          {
            kind: "theory",
            title: { en: "From many, to one", fa: "از خیلی، به یک" },
            blocks: [
              {
                type: "text",
                en: "`map` and `filter` both return arrays. `reduce` is different: it boils the WHOLE array down to ONE value — a sum, a count, a longest word, anything you can build step by step. It needs two things: a starting value (the accumulator) and a function that receives `(accumulator, item)` and returns the NEXT accumulator.",
                fa: "‏map و filter هر دو آرایه برمی‌گردانند. اما `reduce` فرق دارد: کلِ آرایه را به «یک» مقدار می‌جوشاند — یک جمع، یک شمارش، بلندترین واژه، هرچه بتوانی قدم‌به‌قدم ساخت. دو چیز می‌خواهد: یک مقدارِ شروع (انباشتگر) و تابعی که `(accumulator, item)` می‌گیرد و انباشتگرِ «بعدی» را برمی‌گرداند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const bills = [40, 15, 30];

const total = bills.reduce(function (sum, bill) {
  return sum + bill;
}, 0);                                  // 85

// step by step: 0 → 40 → 55 → 85`,
              },
              {
                type: "tip",
                en: "The second argument (here 0) is the STARTING value of the accumulator. Without it, reduce starts from the first item — but pros always pass it explicitly: no surprises, and empty arrays stay safe.",
                fa: "آرگومانِ دوم (اینجا 0) مقدارِ «شروع» انباشتگر است. بدون آن، reduce از اولین آیتم شروع می‌کند — اما حرفه‌ای‌ها همیشه صریح پاس می‌دهند: نه غافلگیری، و آرایه‌ی خالی هم امن می‌ماند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "reduce is not only sums", fa: "reduce فقط جمع نیست" },
            blocks: [
              {
                type: "text",
                en: "Change the recipe, change the meaning. Counting survivors: start at 0, add 1 only when the item deserves it. Building a sentence: start at \"\", glue word after word. Same method — the accumulator just follows a different plan.",
                fa: "دستورِ پخت را عوض کن، معنا عوض می‌شود. شمردنِ قبول‌ها: از 0 شروع کن، فقط وقتی آیتم شایسته است یکی اضافه کن. ساختنِ یک جمله: از \"\" شروع کن، واژه‌واژه بچسبان. همان متد — انباشتگر فقط نقشه‌ی دیگری را دنبال می‌کند.",
              },
              {
                type: "code",
                lang: "js",
                code: `const scores = [12, 9, 17, 5, 20];

const passed = scores.reduce((count, s) => {
  if (s >= 10) {
    return count + 1;
  }
  return count;
}, 0);                                  // 3 — filter + length in one pass`,
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Cash register</title>
  </head>
  <body>
    <h1>Cash register 🧾</h1>
    <p id="total"></p>

    <script>
      const cart = [40, 15, 30];
      const total = cart.reduce((sum, price) => sum + price, 0);
      document.querySelector("#total").textContent = "Total: $" + total;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — three prices, one total. The loop is inside reduce.",
                  fa: "پیش‌نمایش را بزن — سه قیمت، یک جمع. حلقه داخلِ reduce است.",
                },
              },
              {
                type: "warn",
                en: "Every branch of your reduce function must `return`. Miss one path and the accumulator silently becomes undefined from there on — the classic silent bug of reduce.",
                fa: "هر شاخه از تابعِ reduce باید `return` داشته باشد. یک مسیر را جا بیندازی و انباشتگر از آن‌جا به بعد بی‌سروصدا undefined می‌شود — باگِ کلاسیکِ خاموشِ reduce.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does [1, 2, 3].reduce((a, b) => a + b, 0) return?", fa: "[1, 2, 3].reduce((a, b) => a + b, 0) چه برمی‌گرداند؟" },
                options: [
                  { en: "6", fa: "6" },
                  { en: "3", fa: "3" },
                  { en: "\"123\"", fa: "\"123\"" },
                  { en: "[1, 2, 3]", fa: "[1, 2, 3]" },
                ],
                answer: 0,
                explain: {
                  en: "The accumulator walks 0 → 1 → 3 → 6. The final accumulator is the return value: 6.",
                  fa: "انباشتگر قدم می‌زند: 0 ← 1 ← 3 ← 6. مقدارِ نهاییِ انباشتگر همان جواب است: 6.",
                },
              },
              {
                q: { en: "The second argument of reduce(fn, 0) is…", fa: "آرگومانِ دومِ reduce(fn, 0) چیست؟" },
                options: [
                  { en: "The first item", fa: "اولین آیتم" },
                  { en: "The array length", fa: "طولِ آرایه" },
                  { en: "A backup array", fa: "یک آرایه‌ی یدکی" },
                  { en: "The starting value of the accumulator", fa: "مقدارِ شروعِ انباشتگر" },
                ],
                answer: 3,
                explain: {
                  en: "It is the seed: the value the accumulator holds before the first item is processed.",
                  fa: "بذر است: مقداری که انباشتگر پیش از پردازشِ اولین آیتم در دست دارد.",
                },
              },
              {
                q: { en: "reduce returns…", fa: "reduce چه چیزی برمی‌گرداند؟" },
                options: [
                  { en: "Always a number", fa: "همیشه یک عدد" },
                  { en: "One value of any type", fa: "یک مقدار، از هر نوعی" },
                  { en: "Always an array", fa: "همیشه یک آرایه" },
                  { en: "Always a string", fa: "همیشه یک رشته" },
                ],
                answer: 1,
                explain: {
                  en: "Whatever the last accumulator is — a number, a string, even an object. The type is yours to choose.",
                  fa: "هرچه که انباشتگرِ آخر باشد — عدد، رشته، حتی شیء. نوعش را خودت انتخاب می‌کنی.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The cash register", fa: "صندوقِ فروشگاه" },
            brief: {
              en: "cart = [40, 15, 30, 25] is seeded. Render each price as a <p class=\"line\"> into #receipt (loop it), then compute total = cart.reduce((sum, price) => sum + price, 0) and render into #total: Total: $110",
              fa: "‏cart = [40, 15, 30, 25] از قبل هست. هر قیمت را به‌شکل <p class=\"line\"> در #receipt رندر کن (حلقه بزن)، بعد total را حساب کن = cart.reduce((sum, price) => sum + price, 0) و در #total رندر کن: Total: $110",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The cash register</title>
  </head>
  <body>
    <h1>Cash register 🧾</h1>
    <p id="total"></p>
    <div id="receipt"></div>

    <script>
      const cart = [40, 15, 30, 25];
      // 1) Loop over cart → render <p class="line"> with "$" + price into #receipt
      // 2) total = cart.reduce((sum, price) => sum + price, 0)
      // 3) #total: "Total: $" + total
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The cash register</title>
  </head>
  <body>
    <h1>Cash register 🧾</h1>
    <p id="total"></p>
    <div id="receipt"></div>

    <script>
      const cart = [40, 15, 30, 25];
      const receipt = document.querySelector("#receipt");

      for (const price of cart) {
        const line = document.createElement("p");
        line.className = "line";
        line.textContent = "$" + price;
        receipt.append(line);
      }

      const total = cart.reduce((sum, price) => sum + price, 0);
      document.querySelector("#total").textContent = "Total: $" + total;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "The loop paints the receipt; reduce computes the total. Two separate jobs — keep them in that order.",
                fa: "حلقه رسید را نقاشی می‌کند؛ reduce جمع را حساب می‌کند. دو کارِ جدا — به همین ترتیب نگه‌شان دار.",
              },
              {
                en: "reduce needs the starting value: cart.reduce((sum, price) => sum + price, 0).",
                fa: "‏reduce به مقدارِ شروع نیاز دارد: cart.reduce((sum, price) => sum + price, 0).",
              },
              {
                en: "Expected: 4 p.line rows plus #total reading: Total: $110",
                fa: "مورد انتظار: چهار ردیفِ p.line و #total که نشان می‌دهد: Total: $110",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".line", count: 4 },
                { selector: ".line", text: "$25" },
                { selector: "#total", text: "Total: $110" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "js-m15-l4",
        title: { en: "Mini-project: Leaderboard Machine", fa: "مینی‌پروژه: ماشینِ جدولِ رده‌بندی" },
        goal: {
          en: "Combine filter, map (with the index argument) and reduce into one leaderboard — ranked rows plus an average, all rendered.",
          fa: "‏filter و map (با آرگومانِ اندیس) و reduce را در یک جدولِ رده‌بندی ترکیب کنی — ردیف‌های رتبه‌دار به‌همراه میانگین، همه رندرشده.",
        },
        minutes: 18,
        steps: [
          {
            kind: "theory",
            title: { en: "The plan: the power triangle", fa: "طرح: سه‌ضلعیِ قدرت" },
            blocks: [
              {
                type: "text",
                en: "Big features are not new syntax — they are KNOWN tools in the right order. The leaderboard plan: `filter` keeps scores >= 10, `map` turns survivors into ranked labels, `reduce` sums everything for the average. Three steps, one chain.",
                fa: "قابلیت‌های بزرگ سینتکسِ نو نیستند — ابزارهای «آشنا» هستند، فقط به‌ترتیبِ درست. طرحِ جدولِ رده‌بندی: `filter` نمره‌های >= 10 را نگه می‌دارد، `map` بازمانده‌ها را به برچسبِ رتبه‌دار تبدیل می‌کند، `reduce` همه را جمع می‌زند تا میانگین بیاید. سه پله، یک زنجیره.",
              },
              {
                type: "code",
                lang: "js",
                code: `const scores = [17, 9, 20, 12];

const podium = scores
  .filter((s) => s >= 10)
  .map((s, i) => (i + 1) + ". " + s + " pts");

console.log(podium);
// ["1. 17 pts", "2. 20 pts", "3. 12 pts"]`,
              },
              {
                type: "tip",
                en: "map's function secretly takes a SECOND argument: the index. `(s, i) => (i + 1) + \". \" + s` numbers the survivors 1, 2, 3 — indexes count from 0, humans from 1, hence the +1.",
                fa: "تابعِ map یواشکی یک آرگومانِ «دوم» هم می‌گیرد: اندیس. ‏`(s, i) => (i + 1) + \". \" + s` بازمانده‌ها را 1 و 2 و 3 شماره می‌زند — اندیس از 0 می‌شمارد، آدم از 1، برای همین +1.",
              },
              {
                type: "code",
                lang: "js",
                code: `const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;

console.log(avg);   // 14.5`,
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
    <title>Leaderboard</title>
  </head>
  <body>
    <h1>Leaderboard 🏆</h1>
    <div id="podium"></div>
    <p id="avg"></p>

    <script>
      const scores = [17, 9, 20, 12];
      const podium = scores
        .filter((s) => s >= 10)
        .map((s, i) => (i + 1) + ". " + s + " pts");

      for (const row of podium) {
        const el = document.createElement("p");
        el.textContent = row;
        document.querySelector("#podium").append(el);
      }

      const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
      document.querySelector("#avg").textContent = "Average: " + avg;
    </script>
  </body>
</html>`,
                caption: {
                  en: "Press Preview — a ranked podium and a live average, from one array.",
                  fa: "پیش‌نمایش را بزن — یک سکوی رتبه‌دار و یک میانگینِ زنده، از یک آرایه.",
                },
              },
              {
                type: "text",
                en: "Why this pattern travels: shopping carts (filter in-stock → map labels → reduce total), dashboards (filter this week → map cards → reduce average), and every leaderboard ever. Same triangle: choose, shape, boil.",
                fa: "چرا این الگو همه‌جا می‌رود: سبدِ خرید (filter موجودها ← map برچسب‌ها ← reduce جمع)، داشبوردها (filter همین هفته ← map کارت‌ها ← reduce میانگین)، و هر جدولِ رده‌بندیِ تاریخ. همان سه‌ضلعی: انتخاب کن، شکل بده، بجوشان.",
              },
              {
                type: "warn",
                en: "Chains read left to right and each step returns a NEW array — the original never changes. If a chain surprises you, print each step with console.log before building the next one.",
                fa: "زنجیره از چپ به راست خوانده می‌شود و هر پله یک آرایه‌ی «نو» برمی‌گرداند — اصل هرگز عوض نمی‌شود. اگر زنجیره‌ای غافلگیرت کرد، خروجیِ هر پله را با console.log چاپ کن قبل از ساختنِ پله‌ی بعد.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In scores.filter(f).map(g), what runs first?", fa: "در scores.filter(f).map(g) کدام اول اجرا می‌شود؟" },
                options: [
                  { en: "filter", fa: "filter" },
                  { en: "map", fa: "map" },
                  { en: "Both at once", fa: "هر دو با هم" },
                  { en: "It depends on the scores", fa: "بستگی به نمره‌ها دارد" },
                ],
                answer: 0,
                explain: {
                  en: "Chains run left to right: filter shrinks first, then map reshapes what survived.",
                  fa: "زنجیره از چپ به راست اجرا می‌شود: اول filter کم می‌کند، بعد map بازمانده‌ها را شکل می‌دهد.",
                },
              },
              {
                q: { en: "In map((s, i) => ...), what is i?", fa: "در map((s, i) => ...) مقدارِ i چیست؟" },
                options: [
                  { en: "The item itself", fa: "خودِ آیتم" },
                  { en: "The index of the current item", fa: "اندیسِ آیتمِ فعلی" },
                  { en: "The array length", fa: "طولِ آرایه" },
                  { en: "The highest score", fa: "بالاترین نمره" },
                ],
                answer: 1,
                explain: {
                  en: "map hands each callback two gifts: the item and its index. Use i for numbering and positions.",
                  fa: "map به هر تابع دو هدیه می‌دهد: آیتم و اندیسش. ‏i را برای شماره‌گذاری و جایگاه‌ها به‌کار ببر.",
                },
              },
              {
                q: { en: "The average of an array is computed by…", fa: "میانگینِ یک آرایه را چطور حساب می‌کنی؟" },
                options: [
                  { en: "Mapping over it and adding 1", fa: "map زدن روی آن و اضافه‌کردنِ 1" },
                  { en: "Filtering it and reading .length", fa: "filter کردن و خواندنِ .length" },
                  { en: "Reducing the sum, then dividing by .length", fa: "جمع با reduce، بعد تقسیم بر .length" },
                  { en: "There is no way in plain JS", fa: "در جاوااسکریپتِ خالص راهی نیست" },
                ],
                answer: 2,
                explain: {
                  en: "reduce the sum with a 0 seed, then divide by items.length — two tools, one line.",
                  fa: "جمع را با reduce و بذرِ 0 بگیر، بعد بر items.length تقسیم کن — دو ابزار، یک خط.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The leaderboard", fa: "جدولِ رده‌بندی" },
            brief: {
              en: "scores = [17, 9, 20, 12] is seeded. Build podium = scores.filter((s) => s >= 10).map((s, i) => (i + 1) + \". \" + s + \" pts\") and render each row as a <p class=\"rank\"> into #podium. Then render into #avg: Average: 14.5 — computed with reduce and division.",
              fa: "‏scores = [17, 9, 20, 12] از قبل هست. ‏podium را بساز = scores.filter((s) => s >= 10).map((s, i) => (i + 1) + \". \" + s + \" pts\") و هر ردیف را به‌شکل <p class=\"rank\"> در #podium رندر کن. بعد در #avg رندر کن: Average: 14.5 — که با reduce و تقسیم حساب شود.",
            },
            starter: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The leaderboard</title>
  </head>
  <body>
    <h1>Leaderboard 🏆</h1>
    <div id="podium"></div>
    <p id="avg"></p>

    <script>
      const scores = [17, 9, 20, 12];
      // 1) podium = scores.filter((s) => s >= 10).map((s, i) => (i + 1) + ". " + s + " pts")
      // 2) Loop over podium → render <p class="rank"> into #podium
      // 3) avg = reduce sum / scores.length → #avg: "Average: " + avg
      // Write your code below 👇

    </script>
  </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>The leaderboard</title>
  </head>
  <body>
    <h1>Leaderboard 🏆</h1>
    <div id="podium"></div>
    <p id="avg"></p>

    <script>
      const scores = [17, 9, 20, 12];

      const podium = scores
        .filter((s) => s >= 10)
        .map((s, i) => (i + 1) + ". " + s + " pts");

      const box = document.querySelector("#podium");
      for (const row of podium) {
        const el = document.createElement("p");
        el.className = "rank";
        el.textContent = row;
        box.append(el);
      }

      const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
      document.querySelector("#avg").textContent = "Average: " + avg;
    </script>
  </body>
</html>`,
            hints: [
              {
                en: "Chain the two: scores.filter((s) => s >= 10).map((s, i) => ...) — filter first, map second.",
                fa: "دو تا را زنجیر کن: scores.filter((s) => s >= 10).map((s, i) => ...) — اول filter، بعد map.",
              },
              {
                en: "The average is the reduced sum divided by scores.length.",
                fa: "میانگین، جمعِ reduce‌شده تقسیم بر scores.length است.",
              },
              {
                en: "Expected: 3 p.rank rows plus #avg reading: Average: 14.5",
                fa: "مورد انتظار: سه ردیفِ p.rank و #avg که نشان می‌دهد: Average: 14.5",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".rank", count: 3 },
                { selector: ".rank", text: "1. 17 pts" },
                { selector: "#avg", text: "Average: 14.5" },
                { selector: "script", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },
];
