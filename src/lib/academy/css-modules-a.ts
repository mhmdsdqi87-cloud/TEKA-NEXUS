// TEKA NEXUS — CSS course, part A (modules m1–m7, 28 lessons).
// Authored in Task 16. Graded via inline-style HtmlCheck.styleIncludes + DOM structure.

import type { Module } from "./types";

export const cssModulesA: Module[] = [
  {
    id: "css-m1",
    title: { en: "CSS First Steps", fa: "اولین قدم‌های CSS" },
    blurb: {
      en: "Meet the language that paints the web — syntax, your first selectors, and your first styled page.",
      fa: "با زبانی آشنا شو که وب رو رنگ می‌زنه — سینتکس، اولین سلکتورها و اولین صفحه استایل‌دار.",
    },
    lessons: [
      {
        id: "css-m1-l1",
        title: { en: "What Is CSS?", fa: "CSS چیست؟" },
        goal: { en: "Understand what CSS does and write your very first rule.", fa: "بفهم CSS چه‌کار می‌کنه و اولین قانونت رو بنویس." },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "HTML is the **skeleton** of a page — headings, paragraphs, buttons. CSS (Cascading Style Sheets) is the **skin and paint**: colors, sizes, spacing, layout. Every beautiful site you know is HTML wearing a CSS outfit.", fa: "HTML اسکلت صفحه‌ست — تیتر، پاراگراف، دکمه. CSS پوست و رنگه: رنگ‌ها، اندازه‌ها، فاصله‌ها و چیدمان. هر سایت خوشگلی که می‌شناسی، HTML هست با یک لباس CSS." },
              { type: "code", lang: "css", runnable: false, code: `selector {\n  property: value;\n  property: value;\n}`, caption: { en: "The universal shape of every CSS rule.", fa: "شکل کلی هر قانون CSS." } },
              { type: "text", en: "A rule has three parts: a **selector** (who to style), **properties** (what to change) and **values** (how). `h1 { color: crimson; }` means: \"find every `<h1>` and paint it crimson.\"", fa: "هر قانون سه بخش داره: **سلکتور** (به چه کسی استایل بديم)، **پراپرتی‌ها** (چی رو عوض کنیم) و **مقدارها** (چطور). ‏`h1 { color: crimson; }` یعنی: «هر <h1> رو پیدا کن و قرمزش کن.»" },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "CSS lives in three places. For now we'll use the **inline style**: a `style=\"…\"` attribute right on the tag. It's perfect for quick experiments — later you'll learn the more powerful ways.", fa: "CSS سه جا زندگی می‌کنه. فعلاً از **استایل درون‌خطی** استفاده می‌کنیم: صفت `style=\"…\"` روی خود تگ. برای تست سریع عالیه — بعداً راه‌های قدرتمندتر رو یاد می‌گیری." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<body>\n  <h1 style="color: crimson;">Breaking news</h1>\n  <p style="color: gray;">…and CSS just painted its first word.</p>\n</body>\n</html>` },
              { type: "tip", en: "One rule, one semicolon: `color: crimson;`. Forgetting the semicolon between declarations is the #1 beginner bug.", fa: "هر قانون با سمی‌کالن: ‏`color: crimson;`‏. فراموش‌کردن سمی‌کالن بین تعریف‌ها باگ شماره یک تازه‌کارهاست." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does CSS mainly control?", fa: "CSS بیشتر چه چیزی رو کنترل می‌کنه؟" },
                options: [
                  { en: "The structure and meaning of content", fa: "ساختار و معنی محتوا" },
                  { en: "The appearance — colors, sizes, layout", fa: "ظاهر — رنگ‌ها، اندازه‌ها و چیدمان" },
                  { en: "Saving data in a database", fa: "ذخیره داده در دیتابیس" },
                  { en: "Sending emails", fa: "ارسال ایمیل" },
                ],
                answer: 1,
                explain: { en: "HTML = structure, CSS = appearance, JavaScript = behavior. Clean separation.", fa: "HTML = ساختار، CSS = ظاهر، جاوااسکریپت = رفتار. تفکیک تمیز." },
              },
              {
                q: { en: "Which one is a complete, correct CSS declaration?", fa: "کدوم یک تعریف کامل و درست CSS هست؟" },
                options: [
                  { en: "color = green", fa: "color = green" },
                  { en: "color: green", fa: "color: green" },
                  { en: "color: green;", fa: "color: green;" },
                  { en: "green: color;", fa: "green: color;" },
                ],
                answer: 2,
                explain: { en: "Property first, colon, value, semicolon. That's the contract.", fa: "اول پراپرتی، دونقطه، مقدار، سمی‌کالن. همین قراره." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Paint Your First Word", fa: "اولین کلمه‌ات را رنگ کن" },
            brief: { en: "Use inline styles: make the <h1> red (crimson) and the <p> a blue color (steelblue). Keep the texts exactly as they are.", fa: "از استایل درون‌خطی استفاده کن: تگ <h1> رو قرمز (crimson) و تگ <p> رو آبی (steelblue) کن. متن‌ها رو دست نزن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>First paint</title>\n</head>\n<body>\n  <!-- TODO: add style="" with color to the h1 -->\n  <h1>Hello, CSS!</h1>\n  <!-- TODO: add style="" with color to the p -->\n  <p>I am learning to paint the web.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>First paint</title>\n</head>\n<body>\n  <h1 style="color: crimson;">Hello, CSS!</h1>\n  <p style="color: steelblue;">I am learning to paint the web.</p>\n</body>\n</html>`,
            hints: [
              { en: "Inline style goes INSIDE the opening tag: <h1 style=\"color: crimson;\">.", fa: "استایل درون‌خطی داخل تگ شروع می‌ره: ‏<h1 style=\"color: crimson;\">‏." },
              { en: "Two tags, two separate style attributes — each tag gets its own.", fa: "دو تا تگ، دو تا صفت style جدا — هر تگ مال خودش رو داره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", text: "Hello, CSS!", styleIncludes: "color: crimson" },
                { selector: "p", text: "I am learning", styleIncludes: "color: steelblue" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m1-l2",
        title: { en: "Where CSS Lives", fa: "CSS کجا زندگی می‌کند؟" },
        goal: { en: "Apply styles three ways and know when to use each.", fa: "سه روش اعمال استایل رو یاد بگیر و بدون هر کی کجا به کار میاد." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Three homes for CSS.** 1) Inline `style=\"\"` on a tag — quick, but messy at scale. 2) A `<style>` block in the head — rules for the whole page. 3) A separate `.css` file linked with `<link rel=\"stylesheet\" href=\"styles.css\">` — the pro way for real projects.", fa: "**سه خونه برای CSS.** ‏۱) استایل درون‌خطی `style=\"\"` روی تگ — سریع ولی تو پروژه بزرگ شلوغ می‌شه. ‏۲) بلاک `<style>` توی head — قانون برای کل صفحه. ‏۳) فایل جدا `.css` با `<link rel=\"stylesheet\" href=\"styles.css\">` — راه حرفه‌ای برای پروژه واقعی." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    h1 { color: teal; }\n    p  { color: dimgray; }\n  </style>\n</head>\n<body>\n  <h1>Styled by a style block</h1>\n  <p>One block rules the whole page.</p>\n</body>\n</html>` },
              { type: "tip", en: "In real projects you'll almost always use the linked .css file. Inline styles are for quick tests and dynamic values.", fa: "تو پروژه واقعی تقریباً همیشه فایل css لینک‌شده استفاده می‌شه. استایل درون‌خطی برای تست سریع و مقادیر پویاست." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Who wins?** If the same tag is styled in several places, the more *specific* one wins: inline style beats `<style>` block, and a `<style>` block beats a linked file (when rules tie). That's the \"cascade\" in Cascading Style Sheets.", fa: "**کی برنده می‌شه؟** اگه یک تگ در چند جا استایل بگیره، حالت **مشخص‌تر** می‌بره: استایل درون‌خطی از بلاک `<style>` قوی‌تره و بلاک از فایل لینک‌شده (وقتی قوانین هم‌ارز باشن). این همون «آبشاری» توی Cascading Style Sheets هست." },
              { type: "code", lang: "css", runnable: false, code: `/* linked file */\np { color: gray; }   /* applied first */\n\n/* <style> block */\np { color: teal; }   /* wins over the file */` },
              { type: "warn", en: "Don't mix all three randomly on one page — pick one main strategy, use others sparingly.", fa: "هر سه روش رو روی یک صفحه قاطی نکن — یک استراتژی اصلی انتخاب کن و بقیه رو به‌ندرت استفاده کن." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which tag links an external CSS file?", fa: "کدوم تگ فایل CSS بیرونی رو لینک می‌کنه؟" },
                options: [
                  { en: "<css src=\"style.css\">", fa: "<css src=\"style.css\">" },
                  { en: "<link rel=\"stylesheet\" href=\"style.css\">", fa: "<link rel=\"stylesheet\" href=\"style.css\">" },
                  { en: "<script src=\"style.css\">", fa: "<script src=\"style.css\">" },
                  { en: "<a href=\"style.css\">", fa: "<a href=\"style.css\">" },
                ],
                answer: 1,
                explain: { en: "<link rel=\"stylesheet\"> in the <head> is the standard way to attach a CSS file.", fa: "<link rel=\"stylesheet\"> داخل <head> راه استاندارد وصل‌کردن فایل CSS هست." },
              },
              {
                q: { en: "A tag has `style=\"color: red\"` AND a <style> rule making it teal. What color shows?", fa: "یک تگ هم `style=\"color: red\"` داره هم قانون <style> سبزآبی. چه رنگی نمایش داده می‌شه؟" },
                options: [
                  { en: "Teal — style blocks always win", fa: "سبزآبی — بلاک style همیشه می‌بره" },
                  { en: "Red — inline style is more specific", fa: "قرمز — استایل درون‌خطی مشخص‌تره" },
                  { en: "Both — the browser blends them", fa: "هر دو — مرورگر ترکیب‌شون می‌کنه" },
                  { en: "Neither — CSS is ignored", fa: "هیچ‌کدام — CSS نادیده گرفته می‌شه" },
                ],
                answer: 1,
                explain: { en: "Inline beats block rules. Specificity is a superpower worth knowing early.", fa: "درون‌خطی از قوانین بلاک قوی‌تره. مشخص‌بودن یه ابرقدرته که زود بدونیش." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Three Ways, One Page", fa: "سه روش، یک صفحه" },
            brief: { en: "Build a page with a <style> block that colors the <h1> green (seagreen), and give the <p> an inline style with color: slategray. Keep both texts unchanged.", fa: "صفحه‌ای بساز که بلاک <style> رنگ <h1> رو سبز (seagreen) کنه و <p> استایل درون‌خطی با color: slategray بگیره. متن‌ها دست نخورن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Where CSS lives</title>\n  <!-- TODO: add a <style> block here -->\n</head>\n<body>\n  <h1>CSS lives in style blocks too</h1>\n  <!-- TODO: give this p an inline style -->\n  <p>Inline style is my backup plan.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Where CSS lives</title>\n  <style>\n    h1 { color: seagreen; }\n  </style>\n</head>\n<body>\n  <h1>CSS lives in style blocks too</h1>\n  <p style="color: slategray;">Inline style is my backup plan.</p>\n</body>\n</html>`,
            hints: [
              { en: "The <style> block goes in the <head>: <style> h1 { color: seagreen; } </style>.", fa: "بلاک <style> می‌ره داخل <head>: ‏<style> h1 { color: seagreen; } </style>‏." },
              { en: "The paragraph needs its own inline attribute: style=\"color: slategray;\".", fa: "پاراگراف صفت درون‌خطی خودش رو می‌خواد: ‏style=\"color: slategray;\"‏." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "style" },
                { selector: "h1", text: "CSS lives in style blocks too" },
                { selector: "p", text: "Inline style is my backup plan", styleIncludes: "color: slategray" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m1-l3",
        title: { en: "Selectors: Who Gets Styled", fa: "سلکتورها: چه کسی استایل می‌گیرد؟" },
        goal: { en: "Target tags by name, class and id with confidence.", fa: "تگ‌ها رو با نام، کلاس و آی‌دی با اعتمادبه‌نفس هدف بگیر." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A selector answers one question: **which elements?** The simplest is the **type selector** — just the tag name: `h1`, `p`, `button`. It styles every one of them on the page.", fa: "سلکتور به یک سوال جواب می‌ده: **کدوم عناصر؟** ساده‌ترینش **سلکتور تایپ** هست — فقط اسم تگ: ‏`h1`‏، ‏`p`‏، ‏`button`‏. همه‌ی اون تگ‌ها رو در صفحه استایل می‌ده." },
              { type: "code", lang: "css", runnable: false, code: `h1 {\n  color: navy;\n}\n/* every <h1> on the page turns navy */` },
              { type: "text", en: "But sometimes you want *some* paragraphs styled, not all. Enter the **class** — a reusable label you put on any tag: `<p class=\"note\">`. Then style `.note`. Classes are the bread and butter of real CSS.", fa: "ولی گاهی می‌خوای فقط *بعضی* پاراگراف‌ها استایل بگیرن. اینجاست که **کلاس** میاد — یک برچسب قابل استفاده‌ی مجدد روی هر تگی: ‏`<p class=\"note\">`‏. بعد `.note` رو استایل بده. کلاس‌ها نون و آب CSS واقعی هستن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    p { color: dimgray; }\n    .note { color: darkorange; }\n  </style>\n</head>\n<body>\n  <p>A normal paragraph.</p>\n  <p class="note">A highlighted note!</p>\n  <p>Another normal one.</p>\n  <p class="note">Notes share one class.</p>\n</body>\n</html>` },
              { type: "text", en: "The **id** is a unique name for exactly one element: `<div id=\"header\">` styled with `#header`. Use ids for one-of-a-kind anchors; use classes for anything reusable.", fa: "**آی‌دی** یه اسم یکتا برای دقیقاً یک عنصره: ‏`<div id=\"header\">`‏ که با `#header` استایل می‌شه. آی‌دی برای چیزهای خاص و تکی، کلاس برای هرچی قابل استفاده مجدد." },
              { type: "warn", en: "Class selectors start with a dot (.note), id selectors with a hash (#header). Mixing these up is a classic silent bug — the page just stays unstyled.", fa: "سلکتور کلاس با نقطه شروع می‌شه (.note) و آی‌دی با هش (#header). قاطی‌کردنشون باگ ساکت کلاسیکه — صفحه همون بی‌استایل می‌مونه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How do you select elements with class=\"card\"?", fa: "عناصر با class=\"card\" رو چطور انتخاب می‌کنی؟" },
                options: [
                  { en: "card { }", fa: "card { }" },
                  { en: "#card { }", fa: "#card { }" },
                  { en: ".card { }", fa: ".card { }" },
                  { en: "*card { }", fa: "*card { }" },
                ],
                answer: 2,
                explain: { en: "A leading dot means \"this is a class\".", fa: "نقطه اول یعنی «این یک کلاسه»." },
              },
              {
                q: { en: "Which selector styles the single element <footer id=\"site-foot\">?", fa: "کدوم سلکتور تنها عنصر <footer id=\"site-foot\"> رو استایل می‌ده؟" },
                options: [
                  { en: ".site-foot", fa: ".site-foot" },
                  { en: "#site-foot", fa: "#site-foot" },
                  { en: "footer.site-foot", fa: "footer.site-foot" },
                  { en: "*site-foot", fa: "*site-foot" },
                ],
                answer: 1,
                explain: { en: "Ids are unique — #site-foot targets exactly that one element.", fa: "آی‌دی‌ها یکتا هستن — ‏#site-foot دقیقاً همون یک عنصر رو هدف می‌گیره." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Mark the Notes", fa: "یادداشت‌ها را علامت بزن" },
            brief: { en: "In the <style> block, write a .warn rule with color: firebrick, and give the class=\"warn\" to the second paragraph only. Keep the first paragraph plain.", fa: "داخل بلاک <style> یک قانون .warn با color: firebrick بنویس و فقط به پاراگراف دوم کلاس warn بده. پاراگراف اول ساده بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    /* TODO: .warn rule with color: firebrick */\n  </style>\n</head>\n<body>\n  <p>Cookies keep you signed in.</p>\n  <!-- TODO: add class="warn" to this paragraph -->\n  <p>Never share your password with anyone!</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .warn { color: firebrick; }\n  </style>\n</head>\n<body>\n  <p>Cookies keep you signed in.</p>\n  <p class="warn">Never share your password with anyone!</p>\n</body>\n</html>`,
            hints: [
              { en: "The rule is .warn { color: firebrick; } — dot included.", fa: "قانون می‌شه .warn { color: firebrick; } — نقطه یادت نره." },
              { en: "Class attribute on the tag: <p class=\"warn\">…</p>.", fa: "صفت کلاس روی تگ: ‏<p class=\"warn\">…</p>‏." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "p.warn", count: 1 },
                { selector: "p.warn", text: "Never share your password" },
                { selector: "p:not(.warn)", text: "Cookies keep you signed in" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m1-l4",
        title: { en: "MINI-PROJECT: First Styled Page", fa: "پروژه کوچک: اولین صفحه استایل‌دار" },
        goal: { en: "Combine selectors and colors into your first finished page.", fa: "سلکتورها و رنگ‌ها رو ترکیب کن و اولین صفحه تمام‌شده‌ات رو بساز." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Time to combine everything: a **page header**, an **intro**, and **two paragraphs**, where each part gets its own voice through color. Real pages are exactly this — elements plus rules, over and over.", fa: "وقتشه همه‌چی رو ترکیب کنی: یک **هدر صفحه**، یک **معرفی** و **دو پاراگراف**، که هر بخش با رنگ خودش صدا پیدا می‌کنه. صفحات واقعی دقیقاً همینن — عنصر به‌علاوه قانون، باز و باز." },
              { type: "tip", en: "Name classes by *purpose* (.brand, .intro), not by looks (.blue-text). Purpose survives redesigns; looks don't.", fa: "کلاس‌ها رو با *هدف* اسم‌گذاری کن (.brand، .intro) نه با ظاهر (.blue-text). هدف با ری‌دیزاین زنده می‌مونه؛ ظاهر نه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A tiny design recipe you can reuse forever: dark text on light background, **one** accent color for the brand, **one** muted color for secondary text. Constraint is what makes pages look designed instead of decorated.", fa: "یه دستور طراحی کوچیک که همیشه قابل استفاده‌ست: متن تیره روی پس‌زمینه روشن، **یک** رنگ تاکیدی برای برند و **یک** رنگ ملایم برای متن فرعی. محدودبودنه که صفحه رو «طراحی‌شده» نشون می‌ده نه «تزئین‌شده»." },
              { type: "code", lang: "css", runnable: false, code: `/* The recipe, in CSS */\n.brand  { color: darkslateblue; }  /* accent  */\n.intro  { color: slategray; }      /* muted   */\nh2      { color: teal; }           /* section */` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why limit a page to one accent color?", fa: "چرا صفحه رو به یک رنگ تاکیدی محدود کنیم؟" },
                options: [
                  { en: "It looks richer", fa: "پررنگ‌تر دیده می‌شه" },
                  { en: "It creates visual hierarchy and calm", fa: "سلسله‌مراتب بصری و آرامش ایجاد می‌کنه" },
                  { en: "CSS requires exactly one color", fa: "CSS دقیقاً یک رنگ می‌خواد" },
                  { en: "It hides the HTML", fa: "HTML رو پنهان می‌کنه" },
                ],
                answer: 1,
                explain: { en: "One accent = the eye knows where to look. That's design, not decoration.", fa: "یک رنگ تاکیدی = چشم می‌دونه کجا نگاه کنه. این دیزاین هست، نه تزئین." },
              },
              {
                q: { en: "Which class name survives a redesign best?", fa: "کدوم اسم کلاس بعد از ری‌دیزاین بهتر دوام میاره؟" },
                options: [
                  { en: ".red-heading", fa: ".red-heading" },
                  { en: ".text-22px", fa: ".text-22px" },
                  { en: ".section-title", fa: ".section-title" },
                  { en: ".style1", fa: ".style1" },
                ],
                answer: 2,
                explain: { en: ".section-title describes purpose — the color and size can change freely.", fa: "‏.section-title هدف رو توصیف می‌کنه — رنگ و اندازه آزادانه می‌تونن عوض شن." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Build \"Daily Byte\"", fa: "«دیلی بایت» را بساز" },
            brief: { en: "Style a mini news page: h1 gets class \"brand\" with inline style color: darkslateblue, the intro p gets class \"intro\" with inline style color: slategray, and the two article h2s get color: teal inline. Keep all texts.", fa: "یک صفحه خبری کوچیک استایل بده: h1 کلاس brand با استایل درون‌خطی color: darkslateblue بگیره، p معرفی کلاس intro با استایل درون‌خطی color: slategray، و دو تا h2 مقاله‌ها استایل درون‌خطی color: teal بگیرن. متن‌ها حفظ شن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Daily Byte</title>\n</head>\n<body>\n  <!-- TODO: class="brand" + inline color: darkslateblue -->\n  <h1>Daily Byte</h1>\n  <!-- TODO: class="intro" + inline color: slategray -->\n  <p>Tech news, one byte at a time.</p>\n  <!-- TODO: inline color: teal on both h2 -->\n  <h2>CSS turns 30</h2>\n  <p>The language of paint keeps evolving.</p>\n  <h2>Browsers get faster</h2>\n  <p>New engines ship weekly improvements.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Daily Byte</title>\n</head>\n<body>\n  <h1 class="brand" style="color: darkslateblue;">Daily Byte</h1>\n  <p class="intro" style="color: slategray;">Tech news, one byte at a time.</p>\n  <h2 style="color: teal;">CSS turns 30</h2>\n  <p>The language of paint keeps evolving.</p>\n  <h2 style="color: teal;">Browsers get faster</h2>\n  <p>New engines ship weekly improvements.</p>\n</body>\n</html>`,
            hints: [
              { en: "One tag can carry several attributes: <h1 class=\"brand\" style=\"color: darkslateblue;\">.", fa: "یک تگ می‌تونه چند صفت داشته باشه: ‏<h1 class=\"brand\" style=\"color: darkslateblue;\">‏." },
              { en: "Both h2 elements get the same inline color — repetition is fine for now.", fa: "هر دو h2 همین استایل درون‌خطی رو می‌گیرن — فعلاً تکرار اشکال نداره." },
              { en: "Order matters not — classes and style attributes coexist happily.", fa: "ترتیب مهم نیست — کلاس و استایل درون‌خطی با هم کنار میان." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1.brand", text: "Daily Byte", styleIncludes: "color: darkslateblue" },
                { selector: "p.intro", text: "Tech news", styleIncludes: "color: slategray" },
                { selector: "h2", count: 2 },
                { selector: "h2", styleIncludes: "color: teal", count: 2 },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m2",
    title: { en: "Colors & Text", fa: "رنگ‌ها و متن" },
    blurb: {
      en: "Master the palette and the printed word — color values, text styling, and fonts.",
      fa: "پالت و تایپوگرافی رو مسلط شو — مقادیر رنگ، استایل متن و فونت‌ها.",
    },
    lessons: [
      {
        id: "css-m2-l1",
        title: { en: "Color Values", fa: "مقادیر رنگ" },
        goal: { en: "Write colors three ways: names, hex codes and rgb().", fa: "رنگ‌ها رو به سه روش بنویس: اسم‌ها، کدهای هگز و rgb()." },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "CSS speaks three color dialects. **Names**: `red`, `teal`, `rebeccapurple` — friendly but limited (~140). **Hex**: `#ff6600` — six hex digits, two per channel (red, green, blue). **rgb()**: `rgb(255, 102, 0)` — same thing in numbers.", fa: "CSS سه لهجه رنگ داره. **اسم‌ها**: ‏`red`‏، ‏`teal`‏، ‏`rebeccapurple`‏ — دوستانه ولی محدود (~۱۴۰ تا). **هگز**: ‏`#ff6600`‏ — شش رقم هگز، دوتا برای هر کانال (قرمز، سبز، آبی). **rgb()**: ‏`rgb(255, 102, 0)`‏ — همون ولی با عدد." },
              { type: "code", lang: "css", runnable: false, code: `.a { color: teal; }              /* name   */\n.b { color: #008080; }            /* hex    */\n.c { color: rgb(0, 128, 128); }   /* rgb    */\n/* all three are the same teal! */` },
              { type: "tip", en: "Hex shorthand: when pairs repeat, #aabbcc can shrink to #abc. #ff8800 → #f80.", fa: "هگز خلاصه: وقتی جفت‌ها تکراری‌ان، ‏#aabbcc می‌شه #abc. ‏#ff8800 می‌شه #f80." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Reading hex like a pro**: `#336699` = R 0x33 (51), G 0x66 (102), B 0x99 (153) — a calm steel blue. High first pair = reddish, high second = greenish, high third = bluish. `#000000` is black (all off), `#ffffff` is white (all on).", fa: "**خوندن هگز مثل حرفه‌ای‌ها**: ‏`#336699`‏ یعنی R کد ۰x۳۳ (۵۱)، G کد ۰x۶۶ (۱۰۲)، B کد ۰x۹۹ (۱۵۳) — یک آبی فولادی آروم. جفت اول بالا = مایل به قرمز، جفت دوم = سبز، جفت سوم = آبی. ‏`#000000` سیاهه و `#ffffff` سفید." },
              { type: "warn", en: "Names are inconsistent across your design (\"crimson\" vs \"firebrick\" look almost the same). For real projects: pick ONE format — usually hex — and stick to it.", fa: "اسم‌ها تو دیزاین ناسازگارن («crimson» و «firebrick» تقریباً یکین). تو پروژه واقعی: یکی از فرمت‌ها رو انتخاب کن — معمولاً هگز — و به همون وفادار بمون." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does #000000 look like?", fa: "‏#000000 چه شکلیه؟" },
                options: [
                  { en: "White", fa: "سفید" },
                  { en: "Black", fa: "سیاه" },
                  { en: "Red", fa: "قرمز" },
                  { en: "Transparent", fa: "شفاف" },
                ],
                answer: 1,
                explain: { en: "All channels zero = no light = black.", fa: "همه کانال‌ها صفر = بدون نور = سیاه." },
              },
              {
                q: { en: "Which is a valid hex color?", fa: "کدوم یک رنگ هگز معتبره؟" },
                options: [
                  { en: "ff6600", fa: "ff6600" },
                  { en: "#ff6600", fa: "#ff6600" },
                  { en: "rgb ff6600", fa: "rgb ff6600" },
                  { en: "hex(ff6600)", fa: "hex(ff6600)" },
                ],
                answer: 1,
                explain: { en: "Hex values always start with #.", fa: "مقادیر هگز همیشه با # شروع می‌شن." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Three Dialects", fa: "سه لهجه" },
            brief: { en: "Give the three lines their colors inline: the .name line color: teal, the .hex line color: #4b0082, and the .rgb line color: rgb(70, 130, 180). Texts stay untouched.", fa: "به سه خط رنگ‌هاشون رو درون‌خطی بده: خط .name رنگ teal، خط .hex رنگ #4b0082 و خط .rgb رنگ rgb(70, 130, 180). متن‌ها دست نخورن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Color dialects</title>\n</head>\n<body>\n  <!-- TODO: inline color: teal -->\n  <p class="name">I speak in names.</p>\n  <!-- TODO: inline color: #4b0082 -->\n  <p class="hex">I speak in hex.</p>\n  <!-- TODO: inline color: rgb(70, 130, 180) -->\n  <p class="rgb">I speak in rgb.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Color dialects</title>\n</head>\n<body>\n  <p class="name" style="color: teal;">I speak in names.</p>\n  <p class="hex" style="color: #4b0082;">I speak in hex.</p>\n  <p class="rgb" style="color: rgb(70, 130, 180);">I speak in rgb.</p>\n</body>\n</html>`,
            hints: [
              { en: "Hex needs its # — style=\"color: #4b0082;\".", fa: "هگز به # نیاز داره — ‏style=\"color: #4b0082;\"‏." },
              { en: "rgb() goes inside quotes exactly like a name: style=\"color: rgb(70, 130, 180);\".", fa: "‏rgb() هم دقیقاً مثل اسم داخل کوتیشن می‌ره: ‏style=\"color: rgb(70, 130, 180);\"‏." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "p.name", styleIncludes: "color: teal" },
                { selector: "p.hex", styleIncludes: "color: #4b0082" },
                { selector: "p.rgb", styleIncludes: "color: rgb(70,130,180)" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m2-l2",
        title: { en: "Styling Text", fa: "استایل دادن به متن" },
        goal: { en: "Control alignment, decoration, spacing and line height.", fa: "ترازبندی، تزئین، فاصله و ارتفاع خط رو کنترل کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Text is the star of most pages. These properties do 90% of the work: **color** (paint), **text-align** (left/center/right), **text-decoration** (underline, line-through, none), **letter-spacing** (gap between letters), **line-height** (gap between lines).", fa: "متن ستاره اکثر صفحه‌هاست. این پراپرتی‌ها ۹۰٪ کار رو می‌کنن: ‏**color** (رنگ)، **text-align** (چپ/وسط/راست)، **text-decoration** (زیرخط، خط‌خورده، هیچی)، **letter-spacing** (فاصله حرف‌ها)، **line-height** (فاصله خط‌ها)." },
              { type: "code", lang: "css", runnable: false, code: `.quote {\n  color: darkslategray;\n  text-align: center;\n  letter-spacing: 1px;\n  line-height: 1.8;   /* unitless = ×font size */\n  text-decoration: none;\n}` },
              { type: "tip", en: "line-height without units (1.8) scales with the font size — always prefer it over fixed px.", fa: "‏line-height بدون واحد (1.8) با اندازه فونت مقیاس می‌شه — همیشه به جای پیکسل ثابت ازش استفاده کن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    h1 { text-align: center; letter-spacing: 4px; }\n    .old { text-decoration: line-through; }\n    a { text-decoration: none; }\n  </style>\n</head>\n<body>\n  <h1>WIDE HEADER</h1>\n  <p class="old">This idea is cancelled.</p>\n  <a href="#">Clean link, no underline</a>\n</body>\n</html>` },
              { type: "text", en: "**Line-height magic**: for comfortable reading, body text wants 1.5–1.8. Headings are fine tighter (1.1–1.3). This one property makes pages instantly feel professional.", fa: "**جادوی line-height**: برای خوندن راحت، متن بدنه ۱٫۵ تا ۱٫۸ می‌خواد. تیترها می‌تونن فشرده‌تر باشن (۱٫۱ تا ۱٫۳). همین یک پراپرتی صفحه رو فوری حرفه‌ای نشون می‌ده." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How do you center a heading's text?", fa: "متن یک تیتر رو چطور وسط‌چین کنیم؟" },
                options: [
                  { en: "text-position: center", fa: "text-position: center" },
                  { en: "text-align: center", fa: "text-align: center" },
                  { en: "align: middle", fa: "align: middle" },
                  { en: "center: true", fa: "center: true" },
                ],
                answer: 1,
                explain: { en: "text-align: center — on the block element itself.", fa: "‏text-align: center — روی خود عنصر بلاکی." },
              },
              {
                q: { en: "Which removes the underline from a link?", fa: "کدوم زیرخط لینک رو برمی‌داره؟" },
                options: [
                  { en: "text-decoration: none;", fa: "text-decoration: none;" },
                  { en: "underline: false;", fa: "underline: false;" },
                  { en: "text-style: plain;", fa: "text-style: plain;" },
                  { en: "decoration: off;", fa: "decoration: off;" },
                ],
                answer: 0,
                explain: { en: "text-decoration: none is the classic link reset.", fa: "‏text-decoration: none ریست کلاسیک لینک هست." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Poetry Panel", fa: "پنل شعر" },
            brief: { en: "Style the poem inline: the h2 gets text-align: center and letter-spacing: 3px; each of the two lines gets line-height: 2 and color: dimgray.", fa: "شعر رو درون‌خطی استایل بده: h2 ‏text-align: center و letter-spacing: 3px بگیره؛ هر دو خط line-height: 2 و color: dimgray بگیرن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Poetry panel</title>\n</head>\n<body>\n  <!-- TODO: text-align: center + letter-spacing: 3px -->\n  <h2>Midnight Compile</h2>\n  <!-- TODO: line-height: 2 + color: dimgray on each line -->\n  <p>One semicolon lost in the dark,</p>\n  <p>a thousand bugs begin to spark.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Poetry panel</title>\n</head>\n<body>\n  <h2 style="text-align: center; letter-spacing: 3px;">Midnight Compile</h2>\n  <p style="line-height: 2; color: dimgray;">One semicolon lost in the dark,</p>\n  <p style="line-height: 2; color: dimgray;">a thousand bugs begin to spark.</p>\n</body>\n</html>`,
            hints: [
              { en: "Multiple declarations share one style attribute, separated by ; — style=\"text-align: center; letter-spacing: 3px;\".", fa: "چند تعریف توی یک صفت style با ; جدا می‌شن — ‏style=\"text-align: center; letter-spacing: 3px;\"‏." },
              { en: "Both poem lines carry the same pair of declarations.", fa: "هر دو خط شعر همین دو تعریف رو دارن." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h2", styleIncludes: "text-align: center" },
                { selector: "h2", styleIncludes: "letter-spacing: 3px" },
                { selector: "p", styleIncludes: "line-height: 2", count: 2 },
                { selector: "p", styleIncludes: "color: dimgray", count: 2 },
              ],
            },
          },
        ],
      },
      {
        id: "css-m2-l3",
        title: { en: "Fonts & Font Size", fa: "فونت و اندازه فونت" },
        goal: { en: "Choose font families, sizes and weights that read beautifully.", fa: "خانواده فونت، اندازه و وزنی انتخاب کن که قشنگ خونده بشه." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**font-family** is a wish list: `font-family: \"Segoe UI\", Arial, sans-serif;` — the browser tries fonts left to right and uses the first one installed. Always end with a generic family (`sans-serif`, `serif`, `monospace`) as a safety net.", fa: "**font-family** یه لیست آرزوئه: ‏`font-family: \"Segoe UI\", Arial, sans-serif;`‏ — مرورگر از چپ به راست امتحان می‌کنه و اولین فونت نصب‌شده رو استفاده می‌کنه. همیشه آخرش یه خانواده کلی (‏`sans-serif`‏، ‏`serif`‏، ‏`monospace`‏) بذار به عنوان تور ایمنی." },
              { type: "code", lang: "css", runnable: false, code: `body {\n  font-family: Tahoma, Arial, sans-serif;\n  font-size: 16px;\n}\nh1 {\n  font-size: 32px;\n  font-weight: 700;   /* 400 = normal, 700 = bold */\n}` },
              { type: "text", en: "**Sizes**: `px` is exact pixels; `rem` scales with the page's base font (16px by default) — 2rem = 32px; `%` and `em` scale with the parent. Rem is the modern favorite because it respects user zoom settings.", fa: "**اندازه‌ها**: ‏`px` پیکسل دقیقه؛ ‏`rem` با فونت پایه صفحه مقیاس می‌شه (پیش‌فرض ۱۶ پیکسل) — ‏۲rem = ۳۲ پیکسل؛ ‏`%` و ‏`em` با والد مقیاس می‌شن. ‏rem محبوب مدرنه چون به زوم کاربر احترام می‌ذاره." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Want a custom font? **Google Fonts** gives hundreds free: add their `<link>` in your head, then use the family name. (The network needs to allow it — in sandboxed previews you may see the fallback instead, which is exactly why the fallback list exists!)", fa: "فونت خاص می‌خوای؟ **Google Fonts** صدها فونت رایگان می‌ده: تگ `<link>` اون‌ها رو بذار توی head و اسم خانواده رو استفاده کن. (شبکه ممکنه اجازه نده — تو پیش‌نمایش sandbox ممکنه فونت جایگزین ببینی، که دقیقاً دلیل وجود لیست جایگزینه!)" },
              { type: "code", lang: "html", runnable: false, code: `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet">\n\n<style>\n  body { font-family: Vazirmatn, Tahoma, sans-serif; }\n</style>`, caption: { en: "Loading Vazirmatn — the beloved Persian web font.", fa: "بارگذاری وزیرمتن — فونت وب محبوب فارسی." } },
              { type: "tip", en: "For Persian text, Tahoma and Vazirmatn are the classic safe choices.", fa: "برای متن فارسی، تahoma و وزیرمتن انتخاب‌های امن کلاسیکن." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why end font-family with a generic like sans-serif?", fa: "چرا آخر font-family یک جنریک مثل sans-serif می‌ذاریم؟" },
                options: [
                  { en: "It looks nicer", fa: "قشنگ‌تره" },
                  { en: "As a fallback if none of the named fonts exist", fa: "اگه هیچ‌کدوم از فونت‌های اسم‌برده وجود نداشته باشن" },
                  { en: "It makes CSS shorter", fa: "CSS رو کوتاه‌تر می‌کنه" },
                  { en: "Browsers require it", fa: "مرورگرها اجباری‌ش کردن" },
                ],
                answer: 1,
                explain: { en: "The generic family is the safety net — the browser always has one.", fa: "خانواده جنریک تور ایمنیه — مرورگر همیشه یکی داره." },
              },
              {
                q: { en: "If the base font is 16px, how big is 2rem?", fa: "اگه فونت پایه ۱۶ پیکسل باشه، ‏۲rem چقدره؟" },
                options: [
                  { en: "16px", fa: "۱۶ پیکسل" },
                  { en: "24px", fa: "۲۴ پیکسل" },
                  { en: "32px", fa: "۳۲ پیکسل" },
                  { en: "2px", fa: "۲ پیکسل" },
                ],
                answer: 2,
                explain: { en: "1rem = 16px, so 2rem = 32px.", fa: "‏۱rem = ۱۶px، پس ‏۲rem = ۳۲px." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Type Scale", fa: "مقیاس تایپوگرافی" },
            brief: { en: "Give the h1 inline style font-size: 36px and font-weight: 700; give the paragraph font-family: Georgia, serif and font-size: 18px; the small print gets font-size: 12px.", fa: "به h1 استایل درون‌خطی font-size: 36px و font-weight: 700 بده؛ به پاراگراف font-family: Georgia, serif و font-size: 18px؛ به متن کوچیک font-size: 12px." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Type scale</title>\n</head>\n<body>\n  <!-- TODO: font-size: 36px + font-weight: 700 -->\n  <h1>The Big Idea</h1>\n  <!-- TODO: font-family: Georgia, serif + font-size: 18px -->\n  <p>An essay about careful typography.</p>\n  <!-- TODO: font-size: 12px -->\n  <small>Published 1404 — read time 4 min</small>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Type scale</title>\n</head>\n<body>\n  <h1 style="font-size: 36px; font-weight: 700;">The Big Idea</h1>\n  <p style="font-family: Georgia, serif; font-size: 18px;">An essay about careful typography.</p>\n  <small style="font-size: 12px;">Published 1404 — read time 4 min</small>\n</body>\n</html>`,
            hints: [
              { en: "Multi-word font names need quotes in CSS: font-family: Georgia, serif works because Georgia is one word.", fa: "اسم فونت‌های چندکلمه‌ای توی CSS کوتیشن می‌خوان: ‏font-family: Georgia, serif چون Georgia تک‌کلمه‌ست اوکیه." },
              { en: "font-weight: 700 is the numeric way to say bold.", fa: "‏font-weight: 700 روش عددی گفتن بولد هست." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", styleIncludes: "font-size: 36px" },
                { selector: "h1", styleIncludes: "font-weight: 700" },
                { selector: "p", styleIncludes: "font-family: Georgia,serif" },
                { selector: "small", styleIncludes: "font-size: 12px" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m2-l4",
        title: { en: "MINI-PROJECT: Poem Page", fa: "پروژه کوچک: صفحه شعر" },
        goal: { en: "Ship a complete, atmospheric poem page with typography you chose.", fa: "یک صفحه شعر کامل با حس‌وحال و تایپوگرافی انتخابی خودت تحویل بده." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Design brief: a **calm night page** — dark navy background, soft silver text, generous line spacing, and the title standing out in a lighter tone. One mood, carried by color + spacing alone.", fa: "بریف طراحی: یک **صفحه شب آرام** — پس‌زمینه سرمه‌ای تیره، متن نقره‌ای نرم، فاصله خط بخشنده و تیتری که با رنگ روشن‌تر خودش رو نشون بده. یک حس‌وحال، فقط با رنگ و فاصله." },
              { type: "code", lang: "css", runnable: false, code: `/* Night mode recipe */\n/* body  */ background-color: #0f172a; color: #cbd5e1;\n/* title */ color: #e2e8f0; letter-spacing: 6px;\n/* verse */ line-height: 2.2;` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "New property unlock: **background-color** — it paints the element's box, not the text. On `<body>` it fills the whole page. Light-on-dark is called *dark mode*, and contrast matters: light gray on dark navy reads well; dim gray on black does not.", fa: "پراپرتی جدید: **background-color** — باکس عنصر رو رنگ می‌کنه نه متنش رو. روی `<body>` کل صفحه رو پر می‌کنه. روشن روی تیره اسمش *دارک مود* هست و کنتراست مهمه: خاکستری روشن روی سرمه‌ای تیره خوب خونده می‌شه؛ خاکستری تیره روی سیاه نه." },
              { type: "warn", en: "Check contrast: text and background need enough difference. Squint at your page — if text melts into the background, raise the contrast.", fa: "کنتراست رو چک کن: متن و پس‌زمینه باید اختلاف کافی داشته باشن. چشمت رو ریز کن — اگه متن توی پس‌زمینه گم شد، کنتراست رو ببر بالا." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does background-color paint?", fa: "‏background-color چه چیزی رو رنگ می‌کنه؟" },
                options: [
                  { en: "The text characters", fa: "حروف متن" },
                  { en: "The element's box behind the content", fa: "باکس عنصر پشت محتوا" },
                  { en: "The whole monitor", fa: "کل مانیتور" },
                  { en: "Only the borders", fa: "فقط خط‌های دور" },
                ],
                answer: 1,
                explain: { en: "background-color fills the element's box — content sits on top of it.", fa: "‏background-color باکس عنصر رو پر می‌کنه — محتوا روش می‌شینه." },
              },
              {
                q: { en: "Which pair has GOOD contrast for body text?", fa: "کدوم جفت برای متن بدنه کنتراست خوبی داره؟" },
                options: [
                  { en: "Light gray on white", fa: "خاکستری روشن روی سفید" },
                  { en: "Dark navy on black", fa: "سرمه‌ای تیره روی سیاه" },
                  { en: "White on dark navy", fa: "سفید روی سرمه‌ای تیره" },
                  { en: "Gray on slightly-different gray", fa: "خاکستری روی خاکستری کمی متفاوت" },
                ],
                answer: 2,
                explain: { en: "White on dark navy = strong, comfortable contrast.", fa: "سفید روی سرمه‌ای تیره = کنتراست قوی و راحت." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Night Verse", fa: "بیت شبانه" },
            brief: { en: "Build the night page: <body> gets inline background-color: #0f172a and color: #cbd5e1; the h1 gets letter-spacing: 6px and color: #e2e8f0; each of the two verse <p> gets line-height: 2.2.", fa: "صفحه شب رو بساز: ‏<body> استایل درون‌خطی background-color: #0f172a و color: #cbd5e1 بگیره؛ h1 ‏letter-spacing: 6px و color: #e2e8f0؛ هر دو <p> بیت line-height: 2.2." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Night verse</title>\n</head>\n<!-- TODO: background-color: #0f172a + color: #cbd5e1 on body -->\n<body>\n  <!-- TODO: letter-spacing: 6px + color: #e2e8f0 -->\n  <h1>SILENT SERVER</h1>\n  <!-- TODO: line-height: 2.2 on each verse line -->\n  <p>The fans breathe slow at 3 a.m.,</p>\n  <p>a cursor blinking: compile again.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Night verse</title>\n</head>\n<body style="background-color: #0f172a; color: #cbd5e1;">\n  <h1 style="letter-spacing: 6px; color: #e2e8f0;">SILENT SERVER</h1>\n  <p style="line-height: 2.2;">The fans breathe slow at 3 a.m.,</p>\n  <p style="line-height: 2.2;">a cursor blinking: compile again.</p>\n</body>\n</html>`,
            hints: [
              { en: "The style goes on the <body> tag itself: <body style=\"background-color: #0f172a; color: #cbd5e1;\">.", fa: "استایل می‌ره روی خود تگ <body>: ‏<body style=\"background-color: #0f172a; color: #cbd5e1;\">‏." },
              { en: "Keep both hex colors exactly as given — they were chosen for contrast.", fa: "هر دو رنگ هگز رو دقیقاً همون‌طور که داده شده نگه دار — برای کنتراست انتخاب شدن." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "body", styleIncludes: "background-color: #0f172a" },
                { selector: "body", styleIncludes: "color: #cbd5e1" },
                { selector: "h1", styleIncludes: "letter-spacing: 6px" },
                { selector: "h1", styleIncludes: "color: #e2e8f0" },
                { selector: "p", styleIncludes: "line-height: 2.2", count: 2 },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m3",
    title: { en: "The Box Model", fa: "مدل باکس" },
    blurb: {
      en: "Every element is a box. Learn its padding, border, margin — and size boxes like a pro.",
      fa: "هر عنصر یک باکسه. پدینگ، بوردر و مارجینش رو یاد بگیر — و باکس‌ها رو مثل حرفه‌ای‌ها اندازه بگیر.",
    },
    lessons: [
      {
        id: "css-m3-l1",
        title: { en: "Padding & Border", fa: "پدینگ و بوردر" },
        goal: { en: "Give elements breathing room and visible edges.", fa: "به عناصر جای نفس دادن و لبه‌های قابل دیدن بده." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Picture every element as a **picture frame**: the content (photo), then **padding** (the mat between photo and frame), then the **border** (the frame itself), then **margin** (empty wall around the frame). Padding pushes inward — it's *inside* the element, right behind the content.", fa: "هر عنصر رو مثل یک **قاب عکس** ببین: محتوا (عکس)، بعدش **پدینگ** (کاغذ بین عکس و قاب)، بعدش **بوردر** (خود قاب) و بعدش **مارجین** (دیوار خالی دور قاب). پدینگ به داخل فشار میاره — *داخل* عنصره، دقیقاً پشت محتوا." },
              { type: "code", lang: "css", runnable: false, code: `.card {\n  padding: 16px;          /* all sides        */\n  padding: 8px 16px;      /* top/bottom  sides*/\n  border: 1px solid #e2e8f0;  /* width style color */\n  border-radius: 12px;    /* rounded corners  */\n}` },
              { type: "tip", en: "border shorthand order: width style color — `1px solid gray`. Style is required: solid, dashed, dotted.", fa: "ترتیب خلاصه‌نویسی بوردر: عرض، استایل، رنگ — ‏`1px solid gray`‏. استایل اجباریه: solid، dashed، dotted." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .badge {\n      padding: 6px 14px;\n      border: 2px solid teal;\n      border-radius: 999px;\n    }\n    .panel {\n      padding: 24px;\n      border: 1px dashed slategray;\n    }\n  </style>\n</head>\n<body>\n  <span class="badge">NEW</span>\n  <div class="panel">A roomy panel with a dashed edge.</div>\n</body>\n</html>` },
              { type: "text", en: "See how padding turned tiny labels into *buttons* and plain text into *panels*? Space is what makes elements feel tangible — flat text vs. tappable chip.", fa: "دیدی چطور پدینگ لیبل کوچیک رو تبدیل به *دکمه* کرد و متن ساده رو به *پنل*؟ فاصلهه که به عنصر حس لمس‌پذیری می‌ده — متن صاف در برابر چیپ قابل کلیک." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which property adds space INSIDE an element, behind its content?", fa: "کدوم پراپرتی فاصله داخل عنصر، پشت محتوا اضافه می‌کنه؟" },
                options: [
                  { en: "margin", fa: "margin" },
                  { en: "padding", fa: "padding" },
                  { en: "spacing", fa: "spacing" },
                  { en: "gap", fa: "gap" },
                ],
                answer: 1,
                explain: { en: "Padding is inside the border; margin is outside.", fa: "پدینگ داخل بوردره؛ مارجین بیرونه." },
              },
              {
                q: { en: "What's missing in `border: solid red;`?", fa: "تو `border: solid red;` چی جا افتاده؟" },
                options: [
                  { en: "Nothing — it's valid", fa: "هیچی — معتبره" },
                  { en: "The width (like 1px)", fa: "عرض (مثل ۱px)" },
                  { en: "A semicolon", fa: "سمی‌کالن" },
                  { en: "The border-radius", fa: "بوردر-ردیوس" },
                ],
                answer: 1,
                explain: { en: "It actually works with default width (3px)! But being explicit — `2px solid red` — is the professional habit.", fa: "راستش با عرض پیش‌فرض (۳px) کار می‌کنه! ولی صریح نوشتن — ‏`2px solid red`‏ — عادت حرفه‌ایه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Chips of Status", fa: "چیپ‌های وضعیت" },
            brief: { en: "Make three status chips with inline styles: each span gets padding: 6px 14px, border-radius: 999px and its own border — 2px solid seagreen / 2px solid orange / 2px solid crimson. Texts stay.", fa: "سه چیپ وضعیت با استایل درون‌خطی بساز: هر span ‏padding: 6px 14px، ‏border-radius: 999px و بوردر خودش — ‏2px solid seagreen / 2px solid orange / 2px solid crimson. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Status chips</title>\n</head>\n<body>\n  <!-- TODO: padding + border-radius + border 2px solid seagreen -->\n  <span>ONLINE</span>\n  <!-- TODO: same recipe, border 2px solid orange -->\n  <span>BUSY</span>\n  <!-- TODO: same recipe, border 2px solid crimson -->\n  <span>OFFLINE</span>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Status chips</title>\n</head>\n<body>\n  <span style="padding: 6px 14px; border-radius: 999px; border: 2px solid seagreen;">ONLINE</span>\n  <span style="padding: 6px 14px; border-radius: 999px; border: 2px solid orange;">BUSY</span>\n  <span style="padding: 6px 14px; border-radius: 999px; border: 2px solid crimson;">OFFLINE</span>\n</body>\n</html>`,
            hints: [
              { en: "Each chip carries three declarations: padding, border-radius, border.", fa: "هر چیپ سه تعریف داره: padding، border-radius، border." },
              { en: "border shorthand: border: 2px solid seagreen;", fa: "خلاصه‌نویسی بوردر: ‏border: 2px solid seagreen;‏" },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "span", count: 3 },
                { selector: "span", styleIncludes: "padding: 6px 14px", count: 3 },
                { selector: "span", styleIncludes: "border-radius: 999px", count: 3 },
                { selector: "span", styleIncludes: "border: 2px solid seagreen" },
                { selector: "span", styleIncludes: "border: 2px solid crimson" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m3-l2",
        title: { en: "Margin & Spacing", fa: "مارجین و فاصله‌گذاری" },
        goal: { en: "Separate elements with margin — and dodge the collapse trap.", fa: "عناصر رو با مارجین جدا کن — و از تله فروپاشی فرار کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Margin** is the empty space OUTSIDE the border — it pushes other elements away. Two paragraphs with `margin-bottom: 24px` and `margin-top: 24px` seem like they'd be 48px apart… but margins *collapse*: adjacent vertical margins merge into the bigger one (24px). One of CSS's oldest surprises.", fa: "**مارجین** فضای خالی بیرون بوردره — بقیه عناصر رو عقب می‌فرسته. دو پاراگراف با `margin-bottom: 24px` و `margin-top: 24px` به‌ظاهر باید ۴۸ پیکسل فاصله داشته باشن… ولی مارجین‌ها *فرو می‌ریزن*: مارجین‌های عمودی مجاور در بزرگ‌ترشون ادغام می‌شن (۲۴px). یکی از قدیمی‌ترین غافلگیری‌های CSS." },
              { type: "code", lang: "css", runnable: false, code: `.card   { margin: 16px; }              /* all sides */\n.card   { margin: 16px auto; }         /* v h — auto centers! */\n.note   { margin-left: auto; }         /* pushes right */` },
              { type: "tip", en: "`margin: 0 auto;` is the legendary centering spell for fixed-width blocks. Auto side margins split the free space equally.", fa: "‏`margin: 0 auto;` طلسم افسانه‌ای وسط‌چین‌کردن بلاک‌های عرض ثابته. مارجین‌های auto فضای خالی رو مساوی تقسیم می‌کنن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Spacing rhythm**: pick one spacing unit (say 8px) and use multiples — 8, 16, 24, 32. Pages with a consistent rhythm feel \"designed\"; random spacing (13px, 9px, 27px) feels noisy even when you can't say why.", fa: "**ریتم فاصله**: یک واحد فاصله انتخاب کن (مثلاً ۸px) و مضاربش رو استفاده کن — ۸، ۱۶، ۲۴، ۳۲. صفحه‌های با ریتم یکنواخت «طراحی‌شده» حس می‌شن؛ فاصله‌های شانسی (۱۳px، ۹px، ۲۷px) بی‌قرار به نظر میان حتی وقتی نمی‌تونی بگی چرا." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .card {\n      border: 1px solid #e2e8f0;\n      border-radius: 10px;\n      padding: 16px;\n      margin: 16px auto;\n      width: 260px;\n    }\n  </style>\n</head>\n<body>\n  <div class="card">Centered card — margin auto did it.</div>\n  <div class="card">Me too. Rhythm: 16 everywhere.</div>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Two stacked elements: margin-bottom: 30px on the first, margin-top: 10px on the second. Real gap?", fa: "دو عنصر روی هم: ‏margin-bottom: 30px اولی، ‏margin-top: 10px دومی. فاصله واقعی؟" },
                options: [
                  { en: "40px", fa: "۴۰ پیکسل" },
                  { en: "30px — margins collapse", fa: "۳۰ پیکسل — مارجین‌ها فرو می‌ریزن" },
                  { en: "10px", fa: "۱۰ پیکسل" },
                  { en: "20px", fa: "۲۰ پیکسل" },
                ],
                answer: 1,
                explain: { en: "Adjacent vertical margins merge into the larger — 30px.", fa: "مارجین‌های عمودی مجاور در بزرگ‌تر ادغام می‌شن — ۳۰px." },
              },
              {
                q: { en: "How do you horizontally center a 260px-wide card?", fa: "کارت ۲۶۰ پیکسلی رو افقی چطور وسط‌چین کنیم؟" },
                options: [
                  { en: "margin: auto 0;", fa: "margin: auto 0;" },
                  { en: "margin: 0 auto;", fa: "margin: 0 auto;" },
                  { en: "center: true;", fa: "center: true;" },
                  { en: "align: center;", fa: "align: center;" },
                ],
                answer: 1,
                explain: { en: "Top/bottom 0, left/right auto → equal side margins → centered.", fa: "بالا/پایین صفر، چپ/راست auto → مارجین‌های مساوی → وسط." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Centered Notice Board", fa: "تابلوی اعلان‌های وسط‌چین" },
            brief: { en: "Give each .note inline styles: width: 300px, margin: 0 auto (so they center), margin-top: 16px extra on all but handled by one value — just use margin: 16px auto. Border and padding are already provided in the <style> block. Add the inline margin: 16px auto and width: 300px to both.", fa: "به هر .note استایل درون‌خطی بده: width: 300px و margin: 16px auto (تا وسط‌چین شن). بوردر و پدینگ توی بلاک <style> هست. به هر دو، همین مارجین و عرض رو اضافه کن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .note {\n      border: 1px solid tan;\n      border-radius: 10px;\n      padding: 12px 16px;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: width: 300px + margin: 16px auto -->\n  <div class="note">Server maintenance tonight at 2 a.m.</div>\n  <!-- TODO: width: 300px + margin: 16px auto -->\n  <div class="note">New academy modules just dropped.</div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .note {\n      border: 1px solid tan;\n      border-radius: 10px;\n      padding: 12px 16px;\n    }\n  </style>\n</head>\n<body>\n  <div class="note" style="width: 300px; margin: 16px auto;">Server maintenance tonight at 2 a.m.</div>\n  <div class="note" style="width: 300px; margin: 16px auto;">New academy modules just dropped.</div>\n</body>\n</html>`,
            hints: [
              { en: "One attribute, two declarations: style=\"width: 300px; margin: 16px auto;\".", fa: "یک صفت، دو تعریف: ‏style=\"width: 300px; margin: 16px auto;\"‏." },
              { en: "The auto side margins are what centers each 300px note.", fa: "مارجین‌های auto کناری هستن که هر نوت ۳۰۰ پیکسلی رو وسط می‌کنن." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".note", count: 2 },
                { selector: ".note", styleIncludes: "width: 300px", count: 2 },
                { selector: ".note", styleIncludes: "margin: 16px auto", count: 2 },
              ],
            },
          },
        ],
      },
      {
        id: "css-m3-l3",
        title: { en: "Width, Height & box-sizing", fa: "عرض، ارتفاع و box-sizing" },
        goal: { en: "Size boxes predictably — and meet the property that fixes CSS's biggest trap.", fa: "باکس‌ها رو قابل پیش‌بینی اندازه بده — و با پراپرتی‌ای آشنا شو که بزرگ‌ترین تله CSS رو درست می‌کنه." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Set `width: 200px; padding: 20px;` on a box… and it becomes **240px wide** (200 + 20 + 20). By default CSS adds padding and border ON TOP of your width. This trap has ruined a thousand layouts.", fa: "روی یک باکس ‏`width: 200px; padding: 20px;`‏ بذار… و می‌شه **۲۴۰ پیکسل** عرض (۲۰۰ + ۲۰ + ۲۰). به‌صورت پیش‌فرض CSS پدینگ و بوردر رو *روی* عرضت اضافه می‌کنه. این تله هزار تا لایوت خراب کرده." },
              { type: "code", lang: "css", runnable: false, code: `.box {\n  box-sizing: border-box;  /* width now INCLUDES padding + border */\n  width: 200px;\n  padding: 20px;           /* content shrinks, box stays 200px */\n}` },
              { type: "tip", en: "box-sizing: border-box makes width mean \"final box width\". Most real projects apply it to every element with a single rule.", fa: "‏box-sizing: border-box کاری می‌کنه width یعنی «عرض نهایی باکس». اکثر پروژه‌های واقعی با یک قانون اون رو به همه عناصر اعمال می‌کنن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Percent widths** are relative to the parent: `width: 50%` = half the parent. Combine with `max-width` for the pro pattern: `width: 100%; max-width: 600px;` — full width on phones, capped at 600px on desktop. This one line is in basically every responsive page.", fa: "**عرض درصدی** نسبت به والدشه: ‏`width: 50%` یعنی نصف والد. با `max-width` ترکیبش کن برای الگوی حرفه‌ای: ‏`width: 100%; max-width: 600px;` — تو موبایل تمام‌عرض، تو دسکتاپ سقف ۶۰۰ پیکسل. همین یک خط تقریباً توی هر صفحه ریسپانسیو هست." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .box {\n      box-sizing: border-box;\n      width: 100%;\n      max-width: 320px;\n      padding: 16px;\n      border: 2px solid teal;\n      border-radius: 8px;\n      margin: 16px auto;\n    }\n  </style>\n</head>\n<body>\n  <div class="box">Fluid but capped: 100% width, max 320px — resize me!</div>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "With box-sizing: border-box, width: 200px and padding: 30px — the rendered box is…", fa: "با box-sizing: border-box و width: 200px و padding: 30px — باکس رندرشده…" },
                options: [
                  { en: "260px", fa: "۲۶۰ پیکسل" },
                  { en: "200px — padding is inside", fa: "۲۰۰ پیکسل — پدینگ داخل می‌مونه" },
                  { en: "170px", fa: "۱۷۰ پیکسل" },
                  { en: "Depends on the browser", fa: "بستگی به مرورگر داره" },
                ],
                answer: 1,
                explain: { en: "border-box: the declared width is the final width; padding eats into content.", fa: "‏border-box: عرض اعلام‌شده عرض نهایی‌ست؛ پدینگ از محتوا می‌خوره." },
              },
              {
                q: { en: "What does width: 100%; max-width: 640px achieve?", fa: "‏width: 100% و max-width: 640px چه کارمی‌کنن؟" },
                options: [
                  { en: "Always 640px", fa: "همیشه ۶۴۰ پیکسل" },
                  { en: "Full width but never wider than 640px", fa: "تمام‌عرض ولی هرگز بیشتر از ۶۴۰ پیکسل نه" },
                  { en: "Always 100px", fa: "همیشه ۱۰۰ پیکسل" },
                  { en: "Nothing — invalid combo", fa: "هیچی — ترکیب نامعتبر" },
                ],
                answer: 1,
                explain: { en: "Fluid on small screens, capped on big ones — the core responsive pattern.", fa: "تو صفحه‌های کوچیک سیال، تو بزرگ‌ها سقف‌دار — الگوی اصلی ریسپانسیو." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Capped Container", fa: "کانتینر سقف‌دار" },
            brief: { en: "Build the pro container: on the .wrap div, inline style box-sizing: border-box, width: 100%, max-width: 420px, padding: 20px and margin: 16px auto.", fa: "کانتینر حرفه‌ای بساز: روی div کلاس wrap استایل درون‌خطی box-sizing: border-box، width: 100%، max-width: 420px، padding: 20px و margin: 16px auto بده." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Capped container</title>\n  <style>\n    body { margin: 0; }\n    .wrap {\n      border: 1px solid slategray;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: box-sizing: border-box; width: 100%; max-width: 420px; padding: 20px; margin: 16px auto -->\n  <div class="wrap">I fill phones but stay elegant on desktop.</div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Capped container</title>\n  <style>\n    body { margin: 0; }\n    .wrap {\n      border: 1px solid slategray;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="wrap" style="box-sizing: border-box; width: 100%; max-width: 420px; padding: 20px; margin: 16px auto;">I fill phones but stay elegant on desktop.</div>\n</body>\n</html>`,
            hints: [
              { en: "Five declarations in one style attribute, separated by semicolons.", fa: "پنج تعریف توی یک صفت style با سمی‌کالن جدا شده." },
              { en: "Copy the exact values from the brief — max-width: 420px.", fa: "مقادیر رو دقیق از بریف کپی کن — ‏max-width: 420px." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".wrap", styleIncludes: "box-sizing: border-box" },
                { selector: ".wrap", styleIncludes: "width: 100%" },
                { selector: ".wrap", styleIncludes: "max-width: 420px" },
                { selector: ".wrap", styleIncludes: "padding: 20px" },
                { selector: ".wrap", styleIncludes: "margin: 16px auto" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m3-l4",
        title: { en: "MINI-PROJECT: Profile Card", fa: "پروژه کوچک: کارت پروفایل" },
        goal: { en: "Assemble box model skills into a polished profile card.", fa: "مهارت‌های باکس‌مodel رو جمع کن و یک کارت پروفایل صیقلی بساز." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The **profile card** is the \"hello world\" of UI design — and every ingredient is one you now own: padding for breathing room, border + radius for shape, margin for placement, background for mood, max-width + auto margins for centering.", fa: "**کارت پروفایل** «hello world» دنیای UI هست — و هر موادّش الان مال خودته: پدینگ برای نفس‌کشیدن، بوردر و رادیوس برای فرم، مارجین برای جای‌گیری، بک‌گراند برای حس‌وحال، ‏max-width و مارجین auto برای وسط‌چینی." },
              { type: "tip", en: "Design order that never fails: structure first (HTML), then spacing (padding/margin), then color, then details (radius, shadows).", fa: "ترتیب طراحی که همیشه جواب می‌ده: اول ساختار (HTML)، بعد فاصله (padding/margin)، بعد رنگ، بعد جزئیات (ردیوس، سایه)." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Watch the layering in this recipe — each property has ONE job: box-sizing owns sizing, padding owns inner space, margin owns placement, background-color owns mood. When something looks off, ask \"which job is missing?\" — debugging UI is 90% asking that question.", fa: "لایه‌بندی این دستور رو ببین — هر پراپرتی فقط یک کار داره: box-sizing مسئول اندازه، padding مسئول فضای داخلی، margin مسئول جای‌گیری، background-color مسئول حس‌وحال. وقتی چیزی عجیب به نظر میاد بپرس «کدوم کار جا مونده؟» — دیباگ UI ‏۹۰٪ همینه که این سوال رو بپرسی." },
              { type: "code", lang: "css", runnable: false, code: `.profile {\n  box-sizing: border-box;\n  width: 100%; max-width: 320px;\n  margin: 24px auto;\n  padding: 24px;\n  background-color: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 16px;\n  text-align: center;\n}` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which property pair centers the card horizontally?", fa: "کدوم جفت پراپرتی کارت رو افقی وسط می‌کنه؟" },
                options: [
                  { en: "width + padding", fa: "width + padding" },
                  { en: "max-width + margin auto", fa: "max-width + margin auto" },
                  { en: "text-align + border", fa: "text-align + border" },
                  { en: "box-sizing + radius", fa: "box-sizing + radius" },
                ],
                answer: 1,
                explain: { en: "A width (or max-width) plus equal auto side margins = centered block.", fa: "یک عرض به‌علاوه مارجین‌های auto مساوی = بلاک وسط‌چین." },
              },
              {
                q: { en: "text-align: center on the card affects…", fa: "‏text-align: center روی کارت اثر می‌ذاره روی…" },
                options: [
                  { en: "The card's position on the page", fa: "جای کارت در صفحه" },
                  { en: "The inline content inside it (text)", fa: "محتوای درون‌خطی داخلش (متن)" },
                  { en: "The border color", fa: "رنگ بوردر" },
                  { en: "Nothing here", fa: "اینجا هیچی" },
                ],
                answer: 1,
                explain: { en: "text-align aligns INLINE content — text, images, spans — not the block itself.", fa: "‏text-align محتوای درون‌خطی رو تراز می‌کنه — متن، عکس، اسپن — نه خود بلاک رو." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Card: \"Ara, Bug Hunter\"", fa: "کارت: «آرا، شکارچی باگ»" },
            brief: { en: "Style the .card div inline with: box-sizing: border-box; width: 100%; max-width: 320px; margin: 24px auto; padding: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center. Keep all texts.", fa: "روی div کلاس card این استایل‌های درون‌خطی رو بذار: box-sizing: border-box; width: 100%; max-width: 320px; margin: 24px auto; padding: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Profile card</title>\n</head>\n<body>\n  <!-- TODO: the full inline recipe from the brief -->\n  <div class="card">\n    <h2>Ara</h2>\n    <p>Bug hunter · TEKA member</p>\n    <p><em>"Every crash is a clue."</em></p>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Profile card</title>\n</head>\n<body>\n  <div class="card" style="box-sizing: border-box; width: 100%; max-width: 320px; margin: 24px auto; padding: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center;">\n    <h2>Ara</h2>\n    <p>Bug hunter · TEKA member</p>\n    <p><em>"Every crash is a clue."</em></p>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Nine declarations, one attribute — order doesn't matter, completeness does.", fa: "نُه تعریف، یک صفت — ترتیب مهم نیست، کامل بودن مهمه." },
              { en: "The two colors are #f8fafc (background) and #e2e8f0 (border).", fa: "دو رنگ: ‏#f8fafc (بک‌گراند) و #e2e8f0 (بوردر)." },
              { en: "Finish with text-align: center — the human touch.", fa: "با text-align: center تمومش کن — لمس انسانی." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".card", text: "Ara" },
                { selector: ".card", styleIncludes: "box-sizing: border-box" },
                { selector: ".card", styleIncludes: "max-width: 320px" },
                { selector: ".card", styleIncludes: "margin: 24px auto" },
                { selector: ".card", styleIncludes: "padding: 24px" },
                { selector: ".card", styleIncludes: "background-color: #f8fafc" },
                { selector: ".card", styleIncludes: "border: 1px solid #e2e8f0" },
                { selector: ".card", styleIncludes: "border-radius: 16px" },
                { selector: ".card", styleIncludes: "text-align: center" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m4",
    title: { en: "Selectors Pro", fa: "سلکتورهای حرفه‌ای" },
    blurb: {
      en: "Descendants, grouping, pseudo-classes and the specificity pecking order.",
      fa: "سلکتورهای فرزند، گروهی، شبه‌کلاس‌ها و سلسله‌مراتب specificity.",
    },
    lessons: [
      {
        id: "css-m4-l1",
        title: { en: "Descendant & Grouping", fa: "سلکتور فرزند و گروهی" },
        goal: { en: "Style elements inside other elements — and many selectors at once.", fa: "عناصر داخل عناصر دیگه رو استایل بده — و چند سلکتور رو همزمان." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The **descendant selector** targets elements *inside* another: `nav a` means \"every `<a>` inside a `<nav>`\" — a space between selectors means *inside*. Links elsewhere on the page stay untouched.", fa: "**سلکتور فرزند** عناصر *داخل* یک عنصر دیگه رو هدف می‌گیره: ‏`nav a` یعنی «هر `<a>` داخل `<nav>`» — فاصله بین سلکتورها یعنی *داخل*. لینک‌های جای دیگه‌ی صفحه دست‌نخورده می‌مونن." },
              { type: "code", lang: "css", runnable: false, code: `nav a {\n  color: teal;\n  text-decoration: none;\n}\n.card p {\n  line-height: 1.7;\n}   /* only paragraphs inside .card */` },
              { type: "text", en: "**Grouping** shares one rule between selectors: comma between them. `h1, h2, h3 { font-weight: 700; }` — one rule, three targets. Perfect for consistent families of elements.", fa: "**گروه‌بندی** یک قانون رو بین چند سلکتور به اشتراک می‌ذاره: ویرگول بین‌شون. ‏`h1, h2, h3 { font-weight: 700; }` — یک قانون، سه هدف. برای یکدست‌کردن خانواده عناصر عالیه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    nav a { color: teal; text-decoration: none; }\n    footer a { color: slategray; }\n    h1, h2 { font-weight: 800; }\n  </style>\n</head>\n<body>\n  <nav><a href="#">Home</a> · <a href="#">Courses</a></nav>\n  <h1>Title</h1>\n  <p>Visit <a href="#">our sponsor</a> — different color.</p>\n  <footer><a href="#">Legal</a></footer>\n</body>\n</html>` },
              { type: "tip", en: "Read `nav a` out loud as \"anchors inside nav\". Saying selectors as sentences makes complex ones easy.", fa: "‏`nav a` رو بلند بخون: «انکرهای داخل nav». سلکتورها رو جمله‌وار گفتن پیچیده‌ها رو ساده می‌کنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does `.card p` select?", fa: "‏`.card p` چه چیزی رو انتخاب می‌کنه؟" },
                options: [
                  { en: "Every paragraph on the page", fa: "هر پاراگراف صفحه" },
                  { en: "Paragraphs inside .card elements", fa: "پاراگراف‌های داخل عناصر .card" },
                  { en: "The .card element itself", fa: "خود عنصر .card" },
                  { en: "Nothing — invalid selector", fa: "هیچی — سلکتور نامعتبر" },
                ],
                answer: 1,
                explain: { en: "Space = descendant. Only <p> elements nested inside .card match.", fa: "فاصله = فرزند. فقط <p>هایی که داخل .card تو در تو ان.match می‌شن." },
              },
              {
                q: { en: "Which groups h1 and h2 into one rule?", fa: "کدوم h1 و h2 رو توی یک قانون گروه می‌کنه؟" },
                options: [
                  { en: "h1 h2 { }", fa: "h1 h2 { }" },
                  { en: "h1, h2 { }", fa: "h1, h2 { }" },
                  { en: "h1 + h2 { }", fa: "h1 + h2 { }" },
                  { en: "h1(h2) { }", fa: "h1(h2) { }" },
                ],
                answer: 1,
                explain: { en: "Comma = grouping. The space version means h2 INSIDE h1 (rare).", fa: "ویرگول = گروه. نسخه فاصله یعنی h2 داخل h1 (نادر)." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Nav vs. Footer Links", fa: "لینک‌های ناوبری و فوتر" },
            brief: { en: "In the <style> block: `nav a` gets color: teal, `footer a` gets color: slategray. Also group h1, h2 with font-weight: 800. Keep the HTML as is.", fa: "داخل بلاک <style>: به ‏`nav a` رنگ teal و به ‏`footer a` رنگ slategray بده. همچنین h1 و h2 رو با font-weight: 800 گروه کن. HTML دست نخوره." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    /* TODO: nav a → color: teal */\n    /* TODO: footer a → color: slategray */\n    /* TODO: group h1, h2 → font-weight: 800 */\n  </style>\n</head>\n<body>\n  <nav><a href="#">Docs</a></nav>\n  <h1>Knowledge Base</h1>\n  <footer><a href="#">Privacy</a></footer>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    nav a { color: teal; }\n    footer a { color: slategray; }\n    h1, h2 { font-weight: 800; }\n  </style>\n</head>\n<body>\n  <nav><a href="#">Docs</a></nav>\n  <h1>Knowledge Base</h1>\n  <footer><a href="#">Privacy</a></footer>\n</body>\n</html>`,
            hints: [
              { en: "Three rules inside one <style> block — each on its own line.", fa: "سه قانون داخل یک بلاک <style> — هر کدوم یه خط." },
              { en: "Grouping uses a comma: h1, h2 { … }.", fa: "گروه‌بندی با ویرگول: ‏h1, h2 { … }‏." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "style" },
                { selector: "nav a", text: "Docs" },
                { selector: "footer a", text: "Privacy" },
                { selector: "h1", text: "Knowledge Base" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m4-l2",
        title: { en: "Pseudo-classes: :hover", fa: "شبه‌کلاس‌ها: :hover" },
        goal: { en: "React to the user — style elements on hover, focus and more.", fa: "به کاربر واکنش نشون بده — استایل روی هاور، فوکوس و بیشتر." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A **pseudo-class** styles an element in a particular *state*. The most loved: `:hover` — active only while the pointer is over the element. Buttons that brighten on hover, links that underline themselves — that's pseudo-classes at work.", fa: "**شبه‌کلاس** یک عنصر رو در یک *حالت* خاص استایل می‌ده. محبوب‌ترینش: ‏`:hover` — فقط وقتی نشانگر روی عنصره فعال می‌شه. دکمه‌هایی که موقع هاور روشن می‌شن، لینک‌هایی که خودشون زیرخط می‌گیرن — کار شبه‌کلاس‌هاست." },
              { type: "code", lang: "css", runnable: false, code: `button {\n  background-color: teal;\n}\nbutton:hover {\n  background-color: darkcyan;  /* brighter on hover */\n}` },
              { type: "tip", en: "Other stars: :focus (keyboard/typing focus), :first-child, :nth-child(2), :checked. Same syntax — colon after the selector.", fa: "ستاره‌های دیگه: ‏:focus (فوکوس کیبورد)، ‏:first-child، ‏:nth-child(2)، ‏:checked. همین سینتکس — دونقطه بعد از سلکتور." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Grading reality check**: `:hover` styles can't be tested by DOM checks (no mouse in a test!). So in challenges we grade the *structure* — that the rule and element exist — while the solution shows the full hover magic for the live preview. You'll always SEE hover work in the preview pane; the checker just verifies the pieces.", fa: "**واقعیت نمره‌دهی**: استایل‌های `:hover` با چک DOM قابل تست نیستن (تست ماوس نداریم!). پس تو چالش‌ها *ساختار* رو چک می‌کنیم — اینکه قانون و عنصر وجود دارن — و راه‌حل جادوی کامل هاور رو برای پیش‌نمایش زنده نشون می‌ده. تو پنل پیش‌نمایش هاور رو زنده می‌بینی؛ چکر فقط قطعه‌ها رو تأیید می‌کنه." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .cta {\n      padding: 10px 20px;\n      background-color: teal;\n      color: white;\n    }\n    .cta:hover { background-color: darkcyan; }\n  </style>\n</head>\n<body>\n  <button class="cta">Hover me!</button>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "When does .btn:hover apply?", fa: "‏.btn:hover کی اعمال می‌شه؟" },
                options: [
                  { en: "Always", fa: "همیشه" },
                  { en: "While the pointer is over the button", fa: "وقتی نشانگر روی دکمه‌ست" },
                  { en: "After clicking", fa: "بعد از کلیک" },
                  { en: "On page load", fa: "هنگام لود صفحه" },
                ],
                answer: 1,
                explain: { en: ":hover = pointer state. Click would be :active, focus :focus.", fa: "‏:hover حالت نشانگره. کلیک می‌شه :active و فوکوس می‌شه :focus." },
              },
              {
                q: { en: "Which styles the SECOND child in a list?", fa: "کدوم فرزند دوم لیست رو استایل می‌ده؟" },
                options: [
                  { en: "li:nth-child(2)", fa: "li:nth-child(2)" },
                  { en: "li.second", fa: "li.second" },
                  { en: "li[2]", fa: "li[2]" },
                  { en: "li:second", fa: "li:second" },
                ],
                answer: 0,
                explain: { en: ":nth-child(n) counts from 1 — nth-child(2) is the second item.", fa: "‏:nth-child(n) از ۱ می‌شماره — ‏nth-child(2) آیتم دومه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Breathing Button", fa: "دکمه‌ای که نفس می‌کشد" },
            brief: { en: "Build a hover-ready button: give the button class \"cta\" plus inline style padding: 10px 20px and background-color: teal. Then in the <style> block add `.cta:hover { background-color: darkcyan; }`. Preview it and hover!", fa: "دکمه‌ای آماده‌ی هاور بساز: به دکمه کلاس cta و استایل درون‌خطی padding: 10px 20px و background-color: teal بده. بعد داخل <style> قانون `.cta:hover { background-color: darkcyan; }` رو اضافه کن. پیش‌نمایش رو ببین و هاور کن!" },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    /* TODO: .cta:hover rule */\n  </style>\n</head>\n<body>\n  <!-- TODO: class="cta" + inline padding + background-color: teal -->\n  <button>Join the crew</button>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .cta:hover { background-color: darkcyan; }\n  </style>\n</head>\n<body>\n  <button class="cta" style="padding: 10px 20px; background-color: teal;">Join the crew</button>\n</body>\n</html>`,
            hints: [
              { en: "The inline pair first: style=\"padding: 10px 20px; background-color: teal;\".", fa: "اول جفت درون‌خطی: ‏style=\"padding: 10px 20px; background-color: teal;\"‏." },
              { en: "The hover rule lives in the <style> block: .cta:hover { background-color: darkcyan; }.", fa: "قانون هاور توی بلاک <style> می‌ره: ‏.cta:hover { background-color: darkcyan; }‏." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "button.cta", text: "Join the crew" },
                { selector: "button.cta", styleIncludes: "padding: 10px 20px" },
                { selector: "button.cta", styleIncludes: "background-color: teal" },
                { selector: "style" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m4-l3",
        title: { en: "Specificity: Who Wins", fa: "Specificity: کی می‌برد؟" },
        goal: { en: "Predict exactly which rule applies when they collide.", fa: "دقیقاً پیش‌بینی کن وقتی قوانین برخورد می‌کنن کدوم اعمال می‌شه." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "When two rules target the same element, CSS doesn't flip a coin — it uses **specificity**, a pecking order from weakest to strongest: type (`p`) < class (`.note`) < id (`#main`) < inline `style=\"\"`. Higher on the ladder wins, regardless of order.", fa: "وقتی دو قانون به یک عنصر می‌رسن، CSS شیر یا خط نمی‌ندازه — از **specificity** استفاده می‌کنه، سلسله‌مراتب از ضعیف به قوی: تایپ (`p`) < کلاس (`.note`) < آی‌دی (`#main`) < استایل درون‌خطی `style=\"\"`. هر کی بالاتره می‌بره، مهم نیست کجا نوشته شده." },
              { type: "code", lang: "css", runnable: false, code: `p        { color: gray; }      /* weakest  */\n.note    { color: orange; }    /* stronger */\n#main    { color: teal; }      /* stronger */\n/* <p id="main" class="note" style="color: navy">  → NAVY */` },
              { type: "warn", en: "!important (like `color: red !important;`) jumps to the top of everything. Avoid it — it makes debugging misery. Only reach for it in emergencies.", fa: "‏!important (مثل `color: red !important;`) می‌پره بالای همه‌چیز. ازش دوری کن — دیباگ رو به جهنم تبدیل می‌کنه. فقط تو حالت اضطراری." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Why pros keep specificity LOW**: a page styled mostly with simple classes stays easy to fix. The moment you chain ids (`#main .card .title`), overriding anything requires an even longer selector — this spirals into \"CSS wars\". Rule of thumb: classes for 95% of styling, ids only for unique anchors.", fa: "**چرا حرفه‌ای‌ها specificity رو پایین نگه می‌دارن**: صفحه‌ای که بیشتر با کلاس‌های ساده استایل شده، راحت اصلاح می‌شه. لحظه‌ای که آی‌دی‌ها رو زنجیر می‌کنی (`#main .card .title`)، بازنویسی هر چیزی سلکتور طولانی‌تری می‌خواد — این به «جنگ‌های CSS» می‌رسه. قاعده سرانگشتی: ‏۹۵٪ استایل با کلاس، آی‌دی فقط برای لنگرهای خاص." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    p { color: gray; }\n    .hl { color: orange; }\n  </style>\n</head>\n<body>\n  <p>Gray.</p>\n  <p class="hl">Orange — class beats type.</p>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Order the ladder, weakest to strongest:", fa: "نردبان رو از ضعیف به قوی مرتب کن:" },
                options: [
                  { en: "type < class < id < inline", fa: "تایپ < کلاس < آی‌دی < درون‌خطی" },
                  { en: "inline < id < class < type", fa: "درون‌خطی < آی‌دی < کلاس < تایپ" },
                  { en: "class < type < inline < id", fa: "کلاس < تایپ < درون‌خطی < آی‌دی" },
                  { en: "All equal — order decides", fa: "همه مساوی — ترتیب تصمیم می‌گیره" },
                ],
                answer: 0,
                explain: { en: "Type, then class, then id, then inline style on the element itself.", fa: "تایپ، بعد کلاس، بعد آی‌دی، بعد استایل درون‌خطی روی خود عنصر." },
              },
              {
                q: { en: "`p { color: gray }` and `.hl { color: orange }` both hit one paragraph with class hl. Color?", fa: "‏`p { color: gray }` و `.hl { color: orange }` هر دو به یک پاراگراف با کلاس hl می‌رسن. رنگ؟" },
                options: [
                  { en: "Gray — p is shorter", fa: "خاکستری — ‏p کوتاه‌تره" },
                  { en: "Orange — class outranks type", fa: "نارنجی — کلاس از تایپ بالاتره" },
                  { en: "Depends on browser", fa: "بستگی به مرورگر" },
                  { en: "Gradient of both", fa: "ترکیب هر دو" },
                ],
                answer: 1,
                explain: { en: "Class > type. Specificity first, order only breaks ties.", fa: "کلاس > تایپ. اول specificity؛ ترتیب فقط تساوی رو می‌شکنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Beat the Base", fa: "پایه را شکست بده" },
            brief: { en: "The <style> block already makes paragraphs gray. Add a .hl rule with color: darkorange and give class=\"hl\" to the second paragraph (keep its inline style attribute with color: teal — inline wins, showing the ladder's top step).", fa: "بلاک <style> فعلاً پاراگراف‌ها رو خاکستری می‌کنه. یک قانون .hl با color: darkorange اضافه کن و به پاراگراف دوم کلاس hl بده (صفت استایل درون‌خطی‌اش با color: teal بمونه — درون‌خطی می‌بره و پله آخر نردبان رو نشون می‌ده)." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    p { color: gray; }\n    /* TODO: .hl → color: darkorange */\n  </style>\n</head>\n<body>\n  <p>Plain gray paragraph.</p>\n  <!-- TODO: add class="hl" (keep the inline style!) -->\n  <p style="color: teal;">I carry both class and inline style.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    p { color: gray; }\n    .hl { color: darkorange; }\n  </style>\n</head>\n<body>\n  <p>Plain gray paragraph.</p>\n  <p class="hl" style="color: teal;">I carry both class and inline style.</p>\n</body>\n</html>`,
            hints: [
              { en: "Class rule: .hl { color: darkorange; } — right under the p rule.", fa: "قانون کلاس: ‏.hl { color: darkorange; } — درست زیر قانون p." },
              { en: "The paragraph keeps BOTH: class=\"hl\" and style=\"color: teal;\".", fa: "پاراگراف هر دو رو نگه می‌داره: ‏class=\"hl\" و style=\"color: teal;\"‏." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "p.hl", styleIncludes: "color: teal" },
                { selector: "p:not(.hl)", text: "Plain gray paragraph" },
                { selector: "style" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m4-l4",
        title: { en: "MINI-PROJECT: Link Menu", fa: "پروژه کوچک: منوی لینک" },
        goal: { en: "Build a styled navigation menu with descendant selectors and hover states.", fa: "یک منوی ناوبری استایل‌دار با سلکتورهای فرزند و حالت‌های هاور بساز." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Menus are where selectors shine: one `.menu` class on the container, then `.menu a` styles all links inside — no classes needed on individual links. Add `.menu a:hover` for the reactive layer. Three rules, a whole menu.", fa: "منوها جایی هستن که سلکتورها می‌درخشن: یک کلاس `.menu` روی کانتینر، بعد `.menu a` همه لینک‌های داخل رو استایل می‌ده — بدون نیاز به کلاس روی تک‌تک لینک‌ها. ‏`.menu a:hover` هم لایه واکنشی رو اضافه می‌کنه. سه قانون، یک منوی کامل." },
              { type: "code", lang: "css", runnable: false, code: `.menu {\n  display: inline-block;\n  padding: 12px 16px;\n  background-color: #0f172a;\n  border-radius: 12px;\n}\n.menu a {\n  color: #e2e8f0;\n  text-decoration: none;\n  margin: 0 8px;\n}\n.menu a:hover { color: #67e8f9; }` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "You just met **display: inline-block** — a hybrid: the container flows like text but accepts width/padding like a block. Full display deep-dive comes in the flexbox modules; for menus, inline-block on the container is a handy shortcut.", fa: "الان با **display: inline-block** آشنا شدی — یک هیبرید: کانتینر مثل متن جریان می‌گیره ولی عرض/پدینگ مثل بلاک قبول می‌کنه. دیپ‌دایو کامل display تو ماژول‌های فلکس‌باکس میاد؛ برای منوها inline-block روی کانتینر یه میان‌بر دست‌باله." },
              { type: "warn", en: "Links have a default blue + underline. A nav menu almost always resets BOTH: color + text-decoration: none.", fa: "لینک‌ها آبی + زیرخط پیش‌فرض دارن. منوی ناوبری تقریباً همیشه هر دو رو ریست می‌کنه: رنگ + ‏text-decoration: none." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why put the class on the <nav> instead of each link?", fa: "چرا کلاس رو روی <nav> می‌ذاریم نه روی هر لینک؟" },
                options: [
                  { en: "It's shorter to type", fa: "تایپش کوتاه‌تره" },
                  { en: "One rule then covers all links inside — easier to maintain", fa: "یک قانون همه لینک‌های داخل رو پوشش می‌ده — نگهداری راحت‌تر" },
                  { en: "Links can't have classes", fa: "لینک‌ها کلاس قبول نمی‌کنن" },
                  { en: "It makes hover impossible", fa: "هاور رو غیرممکن می‌کنه" },
                ],
                answer: 1,
                explain: { en: ".menu a is the scalable pattern — add a link, it's styled automatically.", fa: "‏.menu a الگوی مقیاس‌پذیره — لینک اضافه کن، خودکار استایل می‌گیره." },
              },
              {
                q: { en: "What resets a link's default underline?", fa: "زیرخط پیش‌فرض لینک رو چی ریست می‌کنه؟" },
                options: [
                  { en: "text-decoration: none;", fa: "text-decoration: none;" },
                  { en: "underline: none;", fa: "underline: none;" },
                  { en: "border-bottom: 0;", fa: "border-bottom: 0;" },
                  { en: "font-style: normal;", fa: "font-style: normal;" },
                ],
                answer: 0,
                explain: { en: "text-decoration: none — the classic nav-menu reset.", fa: "‏text-decoration: none — ریست کلاسیک منوی ناوبری." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The TEKA Menu", fa: "منوی تکا" },
            brief: { en: "Keep the <style> block's three rules (.menu, .menu a, .menu a:hover). In the HTML: give the nav class=\"menu\" and keep its inline style with background-color: #0f172a and border-radius: 12px. Keep all three links and their texts.", fa: "سه قانون بلاک <style> رو نگه دار (.menu، ‏.menu a، ‏.menu a:hover). تو HTML به nav کلاس menu بده و استایل درون‌خطی‌اش با background-color: #0f172a و border-radius: 12px بمونه. هر سه لینک و متن‌هاشون بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .menu { display: inline-block; padding: 12px 16px; }\n    .menu a { color: #e2e8f0; text-decoration: none; margin: 0 8px; }\n    .menu a:hover { color: #67e8f9; }\n  </style>\n</head>\n<body>\n  <!-- TODO: class="menu" + inline background-color: #0f172a + border-radius: 12px -->\n  <nav>\n    <a href="#">Academy</a>\n    <a href="#">Projects</a>\n    <a href="#">Teams</a>\n  </nav>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .menu { display: inline-block; padding: 12px 16px; }\n    .menu a { color: #e2e8f0; text-decoration: none; margin: 0 8px; }\n    .menu a:hover { color: #67e8f9; }\n  </style>\n</head>\n<body>\n  <nav class="menu" style="background-color: #0f172a; border-radius: 12px;">\n    <a href="#">Academy</a>\n    <a href="#">Projects</a>\n    <a href="#">Teams</a>\n  </nav>\n</body>\n</html>`,
            hints: [
              { en: "Two attributes on one tag: class=\"menu\" AND style=\"background-color: #0f172a; border-radius: 12px;\".", fa: "دو صفت روی یک تگ: ‏class=\"menu\" و style=\"background-color: #0f172a; border-radius: 12px;\"‏." },
              { en: "Don't touch the three <a> elements — .menu a styles them.", fa: "سه تا <a> رو دست نزن — ‏.menu a استایل‌شون می‌ده." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "nav.menu", count: 1 },
                { selector: "nav.menu", styleIncludes: "background-color: #0f172a" },
                { selector: "nav.menu", styleIncludes: "border-radius: 12px" },
                { selector: "nav a", count: 3 },
                { selector: "nav a", text: "Academy" },
                { selector: "nav a", text: "Teams" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m5",
    title: { en: "Flexbox Basics", fa: "فلکس‌باکس — پایه" },
    blurb: {
      en: "The layout superpower: rows and columns that actually behave.",
      fa: "ابرقهرمان چیدمان: سطر و ستون‌هایی که واقعاً حرف گوش می‌کنن.",
    },
    lessons: [
      {
        id: "css-m5-l1",
        title: { en: "display: flex + gap", fa: "display: flex و gap" },
        goal: { en: "Turn any container into a flexible row with clean gaps.", fa: "هر کانتینری رو به یک سطر انعطاف‌پذیر با فاصله تمیز تبدیل کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "`display: flex` transforms a container: its direct children line up **in a row** and become *flex items* that share the space. Add `gap: 12px;` and you get clean spacing BETWEEN items — no margin hacks, no collapsing. This one-two punch replaced 20 years of float hacks.", fa: "‏`display: flex` کانتینر رو تبدیل می‌کنه: بچه‌های مستقیمش **در یک سطر** می‌شینن و به *فلکس آیتم* تبدیل می‌شن که فضا رو تقسیم می‌کنن. با `gap: 12px;` فاصله تمیز بین آیتم‌ها داری — بدون هک مارجین و بدون فروپاشی. همین دوتایی بیست سال هک float رو منسوخ کرد." },
              { type: "code", lang: "css", runnable: false, code: `.row {\n  display: flex;\n  gap: 12px;      /* space BETWEEN items */\n}` },
              { type: "tip", en: "gap only works inside flex/grid containers. On normal block containers it's ignored.", fa: "‏gap فقط داخل کانتینرهای flex/grid کار می‌کنه. روی کانتینرهای بلاکی معمولی نادیده گرفته می‌شه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .row {\n      display: flex;\n      gap: 12px;\n      padding: 12px;\n      background-color: #f1f5f9;\n      border-radius: 10px;\n    }\n    .box {\n      padding: 16px 22px;\n      background-color: teal;\n      color: white;\n      border-radius: 8px;\n    }\n  </style>\n</head>\n<body>\n  <div class="row">\n    <div class="box">One</div>\n    <div class="box">Two</div>\n    <div class="box">Three</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Three divs, one rule, instant toolbar. Before flexbox this took floats + clears + prayers. Note the children did NOT need any display change — the CONTAINER owns the layout.", fa: "سه تا div، یک قانون، ابزار فوری. قبل از فلکس‌باکس این یعنی float + clear + دعا. دقت کن بچه‌ها هیچ تغییری نیاز نداشتن — کانتینره که چیدمان رو مالکه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Where does display: flex go?", fa: "‏display: flex کجا می‌ره؟" },
                options: [
                  { en: "On the children", fa: "روی بچه‌ها" },
                  { en: "On the container", fa: "روی کانتینر" },
                  { en: "On the body only", fa: "فقط روی body" },
                  { en: "In a separate file", fa: "توی فایل جدا" },
                ],
                answer: 1,
                explain: { en: "The container owns the layout: display: flex on it arranges the children.", fa: "کانتینر مالک چیدمانه: ‏display: flex روی خودش بچه‌ها رو می‌چینه." },
              },
              {
                q: { en: "gap: 12px in a flex container creates…", fa: "‏gap: 12px داخل کانتینر flex می‌سازه…" },
                options: [
                  { en: "12px padding inside each item", fa: "۱۲px پدینگ داخل هر آیتم" },
                  { en: "12px space between items", fa: "۱۲px فاصله بین آیتم‌ها" },
                  { en: "12px border", fa: "۱۲px بوردر" },
                  { en: "12px margin on the container", fa: "۱۲px مارجین روی کانتینر" },
                ],
                answer: 1,
                explain: { en: "gap is the modern, clean space-between-items tool.", fa: "‏gap ابزار مدرن و تمیز فاصله بین آیتم‌هاست." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Toolbar Row", fa: "سطر نوار ابزار" },
            brief: { en: "Make a flex toolbar: the .bar div gets inline style display: flex; gap: 12px; the three buttons keep their texts. Style them with the provided <style> block rules.", fa: "یک نوار ابزار فلکس بساز: div کلاس bar استایل درون‌خطی display: flex; gap: 12px بگیره؛ سه دکمه متن‌هاشون بمونن و استایلشون از بلاک <style> بیاد." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    button {\n      padding: 10px 18px;\n      border: 0;\n      border-radius: 8px;\n      background-color: teal;\n      color: white;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: display: flex + gap: 12px inline on the bar -->\n  <div class="bar">\n    <button>Save</button>\n    <button>Preview</button>\n    <button>Publish</button>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    button {\n      padding: 10px 18px;\n      border: 0;\n      border-radius: 8px;\n      background-color: teal;\n      color: white;\n    }\n  </style>\n</head>\n<body>\n  <div class="bar" style="display: flex; gap: 12px;">\n    <button>Save</button>\n    <button>Preview</button>\n    <button>Publish</button>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "One style attribute, two declarations: style=\"display: flex; gap: 12px;\".", fa: "یک صفت، دو تعریف: ‏style=\"display: flex; gap: 12px;\"‏." },
              { en: "Buttons don't need classes — the container does the arranging.", fa: "دکمه‌ها کلاس لازم ندارن — کانتینر مرتبشون می‌کنه." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".bar", styleIncludes: "display: flex" },
                { selector: ".bar", styleIncludes: "gap: 12px" },
                { selector: ".bar button", count: 3 },
                { selector: ".bar button", text: "Publish" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m5-l2",
        title: { en: "flex-direction", fa: "flex-direction" },
        goal: { en: "Flip between rows and columns with one declaration.", fa: "با یک تعریف بین سطر و ستون جابه‌جا شو." },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**flex-direction** chooses the main axis: `row` (default — left to right) or `column` (top to bottom). Same children, same styles — the layout rotates. `row-reverse` and `column-reverse` flip the order too (careful in RTL languages — visual order flips again).", fa: "**flex-direction** محور اصلی رو انتخاب می‌کنه: ‏`row` (پیش‌فرض — چپ به راست) یا `column` (بالا به پایین). همون بچه‌ها، همون استایل‌ها — لایوت می‌چرخه. ‏`row-reverse` و `column-reverse` هم ترتیب رو برعکس می‌کنن (تو زبان‌های RTL حواست باشه — ترتیب بصری دوباره برعکس می‌شه)." },
              { type: "code", lang: "css", runnable: false, code: `.stack {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;      /* now vertical gaps */\n}` },
              { type: "tip", en: "gap follows the direction: in a column it spaces vertically automatically. One value, both worlds.", fa: "‏gap مسیر رو دنبال می‌کنه: تو ستون، خودکار عمودی فاصله می‌ده. یک مقدار، دو دنیا." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .stack {\n      display: flex;\n      flex-direction: column;\n      gap: 8px;\n      width: 220px;\n    }\n    .item {\n      padding: 10px 14px;\n      background-color: #e0f2fe;\n      border: 1px solid teal;\n      border-radius: 8px;\n    }\n  </style>\n</head>\n<body>\n  <div class="stack">\n    <div class="item">Step 1: plan</div>\n    <div class="item">Step 2: build</div>\n    <div class="item">Step 3: ship</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Columns power cards, feeds, forms, settings pages — the backbone of vertical UI. Change one word (`row`↔`column`) and the same markup reshapes.", fa: "ستون‌ها موتور کارت‌ها، فیدها، فرم‌ها و صفحه‌های تنظیماتن — ستون فقرات UI عمودی. یک کلمه رو عوض کن (`row`↔`column`) و همون مارک‌آپ شکل دیگه‌ای می‌گیره." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Default flex-direction is…", fa: "مقدار پیش‌فرض flex-direction هست…" },
                options: [
                  { en: "column", fa: "column" },
                  { en: "row", fa: "row" },
                  { en: "inline", fa: "inline" },
                  { en: "auto", fa: "auto" },
                ],
                answer: 1,
                explain: { en: "Flex defaults to a row — you opt into columns.", fa: "فلکس پیش‌فرض سطره — ستون رو باید خودت انتخاب کنی." },
              },
              {
                q: { en: "In flex-direction: column, gap: 8px spaces items…", fa: "تو flex-direction: column مقدار gap: 8px فاصله می‌ده…" },
                options: [
                  { en: "Horizontally", fa: "افقی" },
                  { en: "Vertically", fa: "عمودی" },
                  { en: "Diagonally", fa: "قطری" },
                  { en: "Not at all", fa: "اصلاً" },
                ],
                answer: 1,
                explain: { en: "gap follows the main axis — vertical in a column.", fa: "‏gap محور اصلی رو دنبال می‌کنه — تو ستون عمودیه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Vertical Steps", fa: "پله‌های عمودی" },
            brief: { en: "Give the .steps container inline style display: flex; flex-direction: column; gap: 8px. Keep the three step divs and the <style> rules untouched.", fa: "به کانتینر .steps استایل درون‌خطی display: flex; flex-direction: column; gap: 8px بده. سه div پله و قوانین <style> دست نخورن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .step {\n      padding: 10px 14px;\n      background-color: #ecfeff;\n      border-left: 4px solid teal;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: flex column + gap: 8px -->\n  <div class="steps">\n    <div class="step">1 · Install</div>\n    <div class="step">2 · Learn</div>\n    <div class="step">3 · Build</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .step {\n      padding: 10px 14px;\n      background-color: #ecfeff;\n      border-left: 4px solid teal;\n    }\n  </style>\n</head>\n<body>\n  <div class="steps" style="display: flex; flex-direction: column; gap: 8px;">\n    <div class="step">1 · Install</div>\n    <div class="step">2 · Learn</div>\n    <div class="step">3 · Build</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Three declarations: display: flex; flex-direction: column; gap: 8px;", fa: "سه تعریف: ‏display: flex; flex-direction: column; gap: 8px;‏" },
              { en: "The steps divs keep their class — no changes needed there.", fa: "divهای پله کلاس‌شون رو نگه می‌دارن — اونجا تغییری لازم نیست." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".steps", styleIncludes: "display: flex" },
                { selector: ".steps", styleIncludes: "flex-direction: column" },
                { selector: ".steps", styleIncludes: "gap: 8px" },
                { selector: ".step", count: 3 },
              ],
            },
          },
        ],
      },
      {
        id: "css-m5-l3",
        title: { en: "justify-content", fa: "justify-content" },
        goal: { en: "Distribute items along the main axis — center, space-between and friends.", fa: "آیتم‌ها رو در محور اصلی پخش کن — center، space-between و دوستانش." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**justify-content** decides what free space DOES along the main axis: `flex-start` (default, pack to start), `center`, `flex-end`, `space-between` (first and last at edges, equal gaps between), `space-around`/`space-evenly` (softer distributions). This is the \"alignment dial\" you'll reach for daily.", fa: "**justify-content** تصمیم می‌گیره فضای خالی در محور اصلی چیکار کنه: ‏`flex-start` (پیش‌فرض، جمع به ابتدا)، `center`، ‏`flex-end`، ‏`space-between` (اولی و آخری به لبه‌ها، فاصله مساوی بین بقیه)، ‏`space-around`/`space-evenly` (پخش‌های نرم‌تر). این همون «پیچ تنظیم» روزمره‌ته." },
              { type: "code", lang: "css", runnable: false, code: `.bar {\n  display: flex;\n  justify-content: space-between;  /* logo left, links right */\n}\n.hero-actions {\n  display: flex;\n  justify-content: center;         /* buttons centered */\n}` },
              { type: "tip", en: "space-between for navigation bars (brand ↔ menu), center for hero CTAs, flex-start for toolbars.", fa: "‏space-between برای نوارهای ناوبری (برند ↔ منو)، ‏center برای دکمه‌های هیرو، ‏flex-start برای نوار ابزار." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .navbar {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 12px 18px;\n      background-color: #0f172a;\n      border-radius: 12px;\n    }\n    .brand { color: #67e8f9; font-weight: bold; }\n    .links a { color: #e2e8f0; margin-left: 12px; text-decoration: none; }\n  </style>\n</head>\n<body>\n  <div class="navbar">\n    <span class="brand">TEKA</span>\n    <div class="links"><a href="#">Academy</a><a href="#">Live</a></div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "There's `align-items: center` too — it centers on the CROSS axis (vertical in a row). Together: justify-content = main axis, align-items = cross axis. Memorize the duo; every flex layout uses both.", fa: "‏`align-items: center` هم هست — روی محور عرضی وسط‌چین می‌کنه (تو سطر: عمودی). جمع‌بندی: justify-content = محور اصلی، align-items = محور عرضی. این دو نفره رو حفظ کن؛ هر لایوت فلکسی هر دو رو استفاده می‌کنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Navbar: brand left, links right, space in the middle. Which value?", fa: "نوار ناوبری: برند چپ، لینک‌ها راست، فاصله وسط. کدوم مقدار؟" },
                options: [
                  { en: "justify-content: center", fa: "justify-content: center" },
                  { en: "justify-content: space-between", fa: "justify-content: space-between" },
                  { en: "justify-content: flex-end", fa: "justify-content: flex-end" },
                  { en: "gap: 100%", fa: "gap: 100%" },
                ],
                answer: 1,
                explain: { en: "space-between pushes edges apart and distributes the middle space.", fa: "‏space-between لبه‌ها رو باز می‌کنه و وسط رو پخش می‌کنه." },
              },
              {
                q: { en: "In a flex ROW, which property centers items vertically?", fa: "تو سطر فلکس، کدوم پراپرتی آیتم‌ها رو عمودی وسط می‌کنه؟" },
                options: [
                  { en: "justify-content", fa: "justify-content" },
                  { en: "align-items", fa: "align-items" },
                  { en: "vertical-align", fa: "vertical-align" },
                  { en: "text-align", fa: "text-align" },
                ],
                answer: 1,
                explain: { en: "align-items works on the cross axis — vertical in a row.", fa: "‏align-items روی محور عرضیه — تو سطر یعنی عمودی." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Split Navbar", fa: "نوار ناوبری دوطرفه" },
            brief: { en: "Give the .nav container inline style display: flex; justify-content: space-between; align-items: center. Keep the brand span, both links and the <style> rules.", fa: "به کانتینر .nav استایل درون‌خطی display: flex; justify-content: space-between; align-items: center بده. اسپن برند، هر دو لینک و قوانین <style> بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .nav {\n      padding: 12px 18px;\n      background-color: #0f172a;\n      border-radius: 12px;\n    }\n    .brand { color: #67e8f9; font-weight: bold; }\n    .nav a { color: #e2e8f0; margin-left: 12px; text-decoration: none; }\n  </style>\n</head>\n<body>\n  <!-- TODO: flex + space-between + align-items: center -->\n  <div class="nav">\n    <span class="brand">TEKA</span>\n    <div><a href="#">Learn</a><a href="#">Build</a></div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .nav {\n      padding: 12px 18px;\n      background-color: #0f172a;\n      border-radius: 12px;\n    }\n    .brand { color: #67e8f9; font-weight: bold; }\n    .nav a { color: #e2e8f0; margin-left: 12px; text-decoration: none; }\n  </style>\n</head>\n<body>\n  <div class="nav" style="display: flex; justify-content: space-between; align-items: center;">\n    <span class="brand">TEKA</span>\n    <div><a href="#">Learn</a><a href="#">Build</a></div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Three declarations in one style attribute.", fa: "سه تعریف توی یک صفت style." },
              { en: "align-items: center is the last declaration — don't forget it.", fa: "‏align-items: center آخرین تعریفه — یادت نره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".nav", styleIncludes: "display: flex" },
                { selector: ".nav", styleIncludes: "justify-content: space-between" },
                { selector: ".nav", styleIncludes: "align-items: center" },
                { selector: ".brand", text: "TEKA" },
                { selector: ".nav a", count: 2 },
              ],
            },
          },
        ],
      },
      {
        id: "css-m5-l4",
        title: { en: "MINI-PROJECT: Simple Navbar", fa: "پروژه کوچک: نوار ناوبری" },
        goal: { en: "Ship a real-looking navbar with flex alignment end to end.", fa: "یک نوار ناوبری واقعی با تراز فلکسی از اول تا آخر تحویل بده." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Mission: the classic three-zone navbar — **brand** | **links** | **action button** — flex row, space-between, vertically centered. This exact skeleton powers most websites you visit daily.", fa: "مأموریت: نوار ناوبری کلاسیک سه‌بخشی — **برند** | **لینک‌ها** | **دکمه اکشن** — سطر فلکس، space-between و وسط‌چین عمودی. همین اسکلت موتور بیشتر سایت‌هایی هست که روزانه می‌بینی." },
              { type: "tip", en: "Order the declarations the way you think: display → direction → gap → justify → align. A consistent mental order makes flexbox effortless.", fa: "تعریف‌ها رو به ترتیب فکر بنویس: display → direction → gap → justify → align. ترتیب ذهنی ثابت فلکس‌باکس رو بی‌زحمت می‌کنه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Note the pattern for the middle links: wrap them in a div and give THAT div `display: flex; gap: 8px;`. Nested flex containers are normal and expected — outer bar aligns zones, inner row aligns links. Two small containers beat one giant rule.", fa: "به الگوی لینک‌های وسط دقت کن: اون‌ها رو توی یک div بپیچ و به خود اون div ‏`display: flex; gap: 8px;` بده. کانتینرهای فلکس تودرتو کاملاً عادی‌ان — نوار بیرونی بخش‌ها رو تراز می‌کنه، سطر داخلی لینک‌ها رو. دو کانتینر کوچک از یک قانون غول‌آسا بهتره." },
              { type: "code", lang: "css", runnable: false, code: `.zone-links {\n  display: flex;\n  gap: 8px;       /* links stay tight together */\n}` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Three zones must sit at far left, middle, far right. Recipe?", fa: "سه بخش باید چپ کامل، وسط و راست کامل بشینن. دستور؟" },
                options: [
                  { en: "flex + justify-content: space-between", fa: "flex + justify-content: space-between" },
                  { en: "flex + gap only", fa: "فقط flex + gap" },
                  { en: "flex-direction: column", fa: "flex-direction: column" },
                  { en: "text-align: justify", fa: "text-align: justify" },
                ],
                answer: 0,
                explain: { en: "space-between on the outer flex row spreads the three zones.", fa: "‏space-between روی سطر فلکس بیرونی، سه بخش رو باز می‌کنه." },
              },
              {
                q: { en: "Links inside the middle zone need their own…", fa: "لینک‌های داخل بخش وسط به خودشون نیاز دارن…" },
                options: [
                  { en: "display: flex; gap: 8px;", fa: "display: flex; gap: 8px;" },
                  { en: "display: block", fa: "display: block" },
                  { en: "position: fixed", fa: "position: fixed" },
                  { en: "flex: 100", fa: "flex: 100" },
                ],
                answer: 0,
                explain: { en: "Nested flex container keeps the link group tight while the outer bar spreads zones.", fa: "کانتینر فلکس تودرتو گروه لینک‌ها رو جمع نگه می‌داره در حالی که نوار بیرونی بخش‌ها رو پخش می‌کنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Full Navbar", fa: "نوار ناوبری کامل" },
            brief: { en: "On .topbar add inline display: flex; justify-content: space-between; align-items: center. On .zone-links add inline display: flex; gap: 8px. Keep brand, the three links, the Join button and <style> rules.", fa: "روی .topbar استایل درون‌خطی display: flex; justify-content: space-between; align-items: center بده. روی .zone-links استایل درون‌خطی display: flex; gap: 8px. برند، سه لینک، دکمه Join و قوانین <style> بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .topbar {\n      padding: 12px 18px;\n      background-color: #0f172a;\n      border-radius: 12px;\n    }\n    .brand { color: #67e8f9; font-weight: bold; }\n    .zone-links a { color: #e2e8f0; text-decoration: none; }\n    .join {\n      padding: 8px 16px;\n      border: 0;\n      border-radius: 8px;\n      background-color: teal;\n      color: white;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: flex row + space-between + align-items: center -->\n  <div class="topbar">\n    <span class="brand">TEKA</span>\n    <!-- TODO: display: flex + gap: 8px -->\n    <div class="zone-links">\n      <a href="#">Academy</a>\n      <a href="#">Projects</a>\n      <a href="#">Live</a>\n    </div>\n    <button class="join">Join</button>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .topbar {\n      padding: 12px 18px;\n      background-color: #0f172a;\n      border-radius: 12px;\n    }\n    .brand { color: #67e8f9; font-weight: bold; }\n    .zone-links a { color: #e2e8f0; text-decoration: none; }\n    .join {\n      padding: 8px 16px;\n      border: 0;\n      border-radius: 8px;\n      background-color: teal;\n      color: white;\n    }\n  </style>\n</head>\n<body>\n  <div class="topbar" style="display: flex; justify-content: space-between; align-items: center;">\n    <span class="brand">TEKA</span>\n    <div class="zone-links" style="display: flex; gap: 8px;">\n      <a href="#">Academy</a>\n      <a href="#">Projects</a>\n      <a href="#">Live</a>\n    </div>\n    <button class="join">Join</button>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Two containers get inline styles — .topbar and .zone-links.", fa: "دو کانتینر استایل درون‌خطی می‌گیرن — ‏.topbar و .zone-links." },
              { en: ".topbar: display: flex; justify-content: space-between; align-items: center;", fa: "‏.topbar: ‏display: flex; justify-content: space-between; align-items: center;‏" },
              { en: ".zone-links: display: flex; gap: 8px;", fa: "‏.zone-links: ‏display: flex; gap: 8px;‏" },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".topbar", styleIncludes: "display: flex" },
                { selector: ".topbar", styleIncludes: "justify-content: space-between" },
                { selector: ".topbar", styleIncludes: "align-items: center" },
                { selector: ".zone-links", styleIncludes: "display: flex" },
                { selector: ".zone-links", styleIncludes: "gap: 8px" },
                { selector: ".zone-links a", count: 3 },
                { selector: "button.join", text: "Join" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m6",
    title: { en: "Flexbox Advanced", fa: "فلکس‌باکس — پیشرفته" },
    blurb: {
      en: "Wrap, grow, shrink — make layouts that flex with real content.",
      fa: "شکستن خط، بزرگ‌شدن، کوچک‌شدن — لایوت‌هایی که با محتوای واقعی انعطاف می‌گیرن.",
    },
    lessons: [
      {
        id: "css-m6-l1",
        title: { en: "align-items & Centering", fa: "align-items و وسط‌چینی کامل" },
        goal: { en: "Center anything on both axes — the eternal interview question.", fa: "هر چیزی رو روی هر دو محور وسط کن — سوال ابدی مصاحبه‌ها." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The legendary \"center a box\" puzzle, solved in three lines: make the parent a flex container, then center on BOTH axes — `justify-content: center` (main axis) + `align-items: center` (cross axis). In a row: horizontal + vertical. Done.", fa: "معمای افسانه‌ای «باکس رو وسط بذار»، در سه خط حل می‌شه: والد رو فلکس کن، بعد روی هر دو محور وسط کن — ‏`justify-content: center` (محور اصلی) + `align-items: center` (محور عرضی). تو سطر: افقی + عمودی. تمام." },
              { type: "code", lang: "css", runnable: false, code: `.stage {\n  display: flex;\n  justify-content: center;   /* horizontal */\n  align-items: center;       /* vertical   */\n  height: 200px;\n}` },
              { type: "tip", en: "The parent needs a height (or min-height) for vertical centering to be visible — otherwise it's as tall as its content.", fa: "والد برای دیده‌شدن وسط‌چینی عمودی به ارتفاع نیاز داره (یا min-height) — وگرنه همون‌قدر بلنده که محتواش." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .stage {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 220px;\n      background-color: #f1f5f9;\n      border-radius: 12px;\n    }\n    .prize {\n      padding: 20px 28px;\n      background-color: teal;\n      color: white;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="stage">\n    <div class="prize">Perfectly centered 🎯</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "`align-items` has more values worth knowing: `stretch` (default — items fill the cross axis), `flex-start`, `flex-end`, `baseline` (align text baselines). Stretch is why equal-height cards happen for free in a row.", fa: "‏`align-items` مقادیر دیگه‌ای هم داره که ارزش بلد بودن دارن: ‏`stretch` (پیش‌فرض — آیتم‌ها محور عرضی رو پر می‌کنن)، ‏`flex-start`، ‏`flex-end`، ‏`baseline` (تراز خط پایه متن). ‏stretch همونیه که کارت‌های هم‌ارتفاع رو مجانی می‌ده." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Perfect centering needs which pair on the flex parent?", fa: "وسط‌چینی کامل به کدوم جفت روی والد فلکس نیاز داره؟" },
                options: [
                  { en: "justify-content + align-items = center", fa: "justify-content + align-items = center" },
                  { en: "margin + padding = auto", fa: "margin + padding = auto" },
                  { en: "text-align: center twice", fa: "دوبار text-align: center" },
                  { en: "position: center", fa: "position: center" },
                ],
                answer: 0,
                explain: { en: "Main axis + cross axis, both centered — the flex way.", fa: "محور اصلی + محور عرضی، هر دو وسط — روش فلکسی." },
              },
              {
                q: { en: "Default align-items value is…", fa: "مقدار پیش‌فرض align-items هست…" },
                options: [
                  { en: "stretch", fa: "stretch" },
                  { en: "center", fa: "center" },
                  { en: "flex-start", fa: "flex-start" },
                  { en: "baseline", fa: "baseline" },
                ],
                answer: 0,
                explain: { en: "Items stretch to fill the cross axis — free equal-height cards.", fa: "آیتم‌ها محور عرضی رو پر می‌کنن — کارت‌های هم‌ارتفاع مجانی." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Center Stage", fa: "سنتر استیج" },
            brief: { en: "Give the .stage inline style display: flex; justify-content: center; align-items: center; height: 220px. The .prize badge keeps its <style> styling and text.", fa: "به .stage استایل درون‌خطی display: flex; justify-content: center; align-items: center; height: 220px بده. نشان .prize استایل <style> و متنش رو نگه می‌داره." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .stage {\n      background-color: #f1f5f9;\n      border-radius: 12px;\n    }\n    .prize {\n      padding: 20px 28px;\n      background-color: teal;\n      color: white;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: flex + both centers + height: 220px -->\n  <div class="stage">\n    <div class="prize">Locked in 🎯</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .stage {\n      background-color: #f1f5f9;\n      border-radius: 12px;\n    }\n    .prize {\n      padding: 20px 28px;\n      background-color: teal;\n      color: white;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="stage" style="display: flex; justify-content: center; align-items: center; height: 220px;">\n    <div class="prize">Locked in 🎯</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Four declarations: display, two centers, height.", fa: "چهار تعریف: display، دو تا وسط‌چین، ارتفاع." },
              { en: "Both center values: justify-content: center; align-items: center;", fa: "هر دو مقدار center: ‏justify-content: center; align-items: center;‏" },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".stage", styleIncludes: "display: flex" },
                { selector: ".stage", styleIncludes: "justify-content: center" },
                { selector: ".stage", styleIncludes: "align-items: center" },
                { selector: ".stage", styleIncludes: "height: 220px" },
                { selector: ".prize", text: "Locked in" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m6-l2",
        title: { en: "flex-wrap & Responsive Rows", fa: "flex-wrap و سطرهای ریسپانسیو" },
        goal: { en: "Let rows break into graceful lines instead of squishing.", fa: "بذار سطرها به‌جای فشرده‌شدن، به خط‌های شیكش بشکنن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "By default flex items **never wrap** — five cards on a narrow phone shrink into a sad accordion. `flex-wrap: wrap;` lets items jump to the next line when space runs out, keeping their natural size. Combined with fixed widths it's the simplest responsive grid there is.", fa: "به‌صورت پیش‌فرض آیتم‌های فلکس **هیچ‌وقت نمی‌شکنن** — پنج کارت روی موبایل باریک به یک آکاردئون غمگین فشرده می‌شن. ‏`flex-wrap: wrap;` اجازه می‌ده آیتم‌ها وقتی جا تموم شد به خط بعدی بپرن و اندازه طبیعی‌شون رو نگه دارن. ترکیب با عرض ثابت، ساده‌ترین گرید ریسپانسیو دنیاست." },
              { type: "code", lang: "css", runnable: false, code: `.cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.card {\n  box-sizing: border-box;\n  width: 180px;   /* fixed width + wrap = auto grid */\n}` },
              { type: "tip", en: "With flex-wrap: wrap, `row-gap` and `column-gap` can differ: gap: 12px 16px means row-gap 12, column-gap 16.", fa: "با flex-wrap: wrap می‌تونن ‏row-gap و column-gap فرق کنن: ‏gap: 12px 16px یعنی سطر ۱۲، ستون ۱۶." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .cards {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 12px;\n    }\n    .card {\n      box-sizing: border-box;\n      width: 160px;\n      padding: 14px;\n      background-color: #ecfeff;\n      border: 1px solid teal;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="cards">\n    <div class="card">Alpha</div>\n    <div class="card">Beta</div>\n    <div class="card">Gamma</div>\n    <div class="card">Delta</div>\n    <div class="card">Epsilon</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Shrink the preview width and watch cards wrap — no media queries needed for this level of responsiveness. Flex handles overflow, you handle style.", fa: "عرض پیش‌نمایش رو کم کن و ببین کارت‌ها چطور می‌شکنن — بدون مدیا کوئری. فلکس سرریز رو مدیریت می‌کنه، تو فقط استایل." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Default flex wrapping behavior?", fa: "رفتار پیش‌فرض شکستن خط در فلکس؟" },
                options: [
                  { en: "Items wrap automatically", fa: "آیتم‌ها خودکار می‌شکنن" },
                  { en: "Items shrink on one line (nowrap)", fa: "آیتم‌ها در یک خط فشرده می‌شن (nowrap)" },
                  { en: "Items stack vertically", fa: "آیتم‌ها عمودی می‌شینن" },
                  { en: "Items disappear", fa: "آیتم‌ها ناپدید می‌شن" },
                ],
                answer: 1,
                explain: { en: "nowrap is the default — flex-wrap: wrap opts into breaking.", fa: "پیش‌فرض nowrap هست — ‏flex-wrap: wrap شکستن رو فعال می‌کنه." },
              },
              {
                q: { en: "Fixed-width items + flex-wrap: wrap gives you…", fa: "آیتم‌های عرض ثابت + ‏flex-wrap: wrap بهت می‌ده…" },
                options: [
                  { en: "A responsive grid without media queries", fa: "گرید ریسپانسیو بدون مدیا کوئری" },
                  { en: "An error", fa: "خطا" },
                  { en: "A vertical list", fa: "لیست عمودی" },
                  { en: "Overlapping cards", fa: "کارت‌های روی‌هم" },
                ],
                answer: 0,
                explain: { en: "Items fill rows, wrap when full — instant grid.", fa: "آیتم‌ها سطرها رو پر می‌کنن و موقع پرشدن می‌شکنن — گرید فوری." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Wrapping Gallery", fa: "گالری شکستنی" },
            brief: { en: "Give .gallery inline style display: flex; flex-wrap: wrap; gap: 12px. Each .tile keeps its <style> width: 150px and content. Five tiles total.", fa: "به .gallery استایل درون‌خطی display: flex; flex-wrap: wrap; gap: 12px بده. هر .tile عرض <style> خودش با width: 150px و محتواش رو نگه می‌داره. پنج تایل جمعاً." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .tile {\n      box-sizing: border-box;\n      width: 150px;\n      padding: 18px 12px;\n      text-align: center;\n      background-color: #ecfeff;\n      border: 1px solid teal;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: flex + wrap + gap: 12px -->\n  <div class="gallery">\n    <div class="tile">🌅</div>\n    <div class="tile">🏔️</div>\n    <div class="tile">🌊</div>\n    <div class="tile">🌲</div>\n    <div class="tile">🌙</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .tile {\n      box-sizing: border-box;\n      width: 150px;\n      padding: 18px 12px;\n      text-align: center;\n      background-color: #ecfeff;\n      border: 1px solid teal;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="gallery" style="display: flex; flex-wrap: wrap; gap: 12px;">\n    <div class="tile">🌅</div>\n    <div class="tile">🏔️</div>\n    <div class="tile">🌊</div>\n    <div class="tile">🌲</div>\n    <div class="tile">🌙</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "flex-wrap: wrap — the middle declaration people forget.", fa: "‏flex-wrap: wrap — تعریف وسطی که یادش می‌ره." },
              { en: "Five tiles stay as they are; only the gallery gets the inline style.", fa: "پنج تایل سر جاشونن؛ فقط گالری استایل درون‌خطی می‌گیره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".gallery", styleIncludes: "display: flex" },
                { selector: ".gallery", styleIncludes: "flex-wrap: wrap" },
                { selector: ".gallery", styleIncludes: "gap: 12px" },
                { selector: ".tile", count: 5 },
              ],
            },
          },
        ],
      },
      {
        id: "css-m6-l3",
        title: { en: "flex-grow & Sidebar Layouts", fa: "flex-grow و لایوت سایدبار" },
        goal: { en: "Make items share leftover space — the classic content + sidebar split.", fa: "بذار آیتم‌ها فضای باقی‌مانده رو تقسیم کنن — تقسیم کلاسیک محتوا و سایدبار." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**flex-grow** says \"when there's leftover space, give me a share\". `flex-grow: 1` on the main area + a fixed-width sidebar = the most common app layout ever: content eats the leftovers, sidebar stays cozy at 220px.", fa: "**flex-grow** می‌گه «وقتی فضای اضافه هست، سهم منو بده». ‏`flex-grow: 1` روی ناحیه اصلی + سایدبار عرض ثابت = رایج‌ترین لایوت اپ تاریخ: محتوا باقی‌مانده رو می‌خوره، سایدبار راحت در ۲۲۰px می‌مونه." },
              { type: "code", lang: "css", runnable: false, code: `.app {\n  display: flex;\n  gap: 16px;\n}\n.sidebar { width: 220px; }          /* fixed  */\n.main    { flex-grow: 1; }          /* fills the rest */` },
              { type: "tip", en: "flex-grow numbers are RATIOS: two items with 1 and 2 split leftovers ⅓ and ⅔.", fa: "عددهای flex-grow نسبت هستن: دو آیتم با ۱ و ۲، باقی‌مانده رو ⅓ و ⅔ تقسیم می‌کنن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .app {\n      display: flex;\n      gap: 16px;\n      min-height: 180px;\n    }\n    .sidebar {\n      width: 180px;\n      padding: 14px;\n      background-color: #0f172a;\n      color: #cbd5e1;\n      border-radius: 10px;\n    }\n    .main {\n      flex-grow: 1;\n      padding: 14px;\n      background-color: #f1f5f9;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="app">\n    <div class="sidebar">Sidebar</div>\n    <div class="main">Main — I eat all leftover space.</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Related knobs: `flex-shrink` (how much an item is ALLOWED to shrink when space is tight) and `flex-basis` (the starting size before growing/shrinking). The shorthand `flex: 1` = grow 1, shrink 1, basis 0 — \"share everything equally\".", fa: "پیچ‌های مربوطه: ‏`flex-shrink` (چقدر مجازه کوچیک شه وقتی جا کمه) و ‏`flex-basis` (اندازه شروع قبل از بزرگ/کوچیک شدن). خلاصه‌نویسی ‏`flex: 1` یعنی grow ۱، shrink ۱، basis ۰ — «همه‌چیز رو مساوی تقسیم کن»." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Sidebar fixed, main area fills the rest. Main gets…", fa: "سایدبار ثابت، ناحیه اصلی بقیه رو پر می‌کنه. ناحیه اصلی می‌گیره…" },
                options: [
                  { en: "flex-grow: 1", fa: "flex-grow: 1" },
                  { en: "width: 100%", fa: "width: 100%" },
                  { en: "flex-wrap: wrap", fa: "flex-wrap: wrap" },
                  { en: "align-self: end", fa: "align-self: end" },
                ],
                answer: 0,
                explain: { en: "flex-grow: 1 on the main + fixed width on the sidebar.", fa: "‏flex-grow: 1 روی اصلی + عرض ثابت روی سایدبار." },
              },
              {
                q: { en: "flex: 1 is shorthand for…", fa: "‏flex: 1 خلاصه‌ی…" },
                options: [
                  { en: "grow 1, shrink 1, basis 0", fa: "grow ۱، shrink ۱، basis ۰" },
                  { en: "one flex item", fa: "یک فلکس آیتم" },
                  { en: "flex-direction: 1", fa: "flex-direction: 1" },
                  { en: "100% width", fa: "عرض ۱۰۰٪" },
                ],
                answer: 0,
                explain: { en: "flex: 1 = equal sharing of space among all items using it.", fa: "‏flex: 1 = تقسیم مساوی فضا بین همه آیتم‌هایی که دارنش." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "App Shell", fa: "اسکلت اپلیکیشن" },
            brief: { en: "On .shell add inline display: flex; gap: 16px. On .main add inline flex-grow: 1. Keep .sidebar's fixed width from <style>. Both panels keep their texts.", fa: "روی .shell استایل درون‌خطی display: flex; gap: 16px بده. روی .main استایل درون‌خطی flex-grow: 1. عرض ثابت .sidebar از <style> بمونه. متن هر دو پنل بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .sidebar {\n      width: 170px;\n      padding: 14px;\n      background-color: #0f172a;\n      color: #cbd5e1;\n      border-radius: 10px;\n    }\n    .main {\n      padding: 14px;\n      background-color: #f1f5f9;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: display: flex + gap: 16px -->\n  <div class="shell">\n    <div class="sidebar">Menu</div>\n    <!-- TODO: flex-grow: 1 -->\n    <div class="main">Dashboard</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .sidebar {\n      width: 170px;\n      padding: 14px;\n      background-color: #0f172a;\n      color: #cbd5e1;\n      border-radius: 10px;\n    }\n    .main {\n      padding: 14px;\n      background-color: #f1f5f9;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="shell" style="display: flex; gap: 16px;">\n    <div class="sidebar">Menu</div>\n    <div class="main" style="flex-grow: 1;">Dashboard</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: ".shell: display: flex; gap: 16px;  —  .main: flex-grow: 1;", fa: "‏.shell: ‏display: flex; gap: 16px;‏ — ‏.main: ‏flex-grow: 1;‏" },
              { en: "Two style attributes on two different containers.", fa: "دو صفت style روی دو کانتینر متفاوت." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".shell", styleIncludes: "display: flex" },
                { selector: ".shell", styleIncludes: "gap: 16px" },
                { selector: ".main", styleIncludes: "flex-grow: 1" },
                { selector: ".sidebar", text: "Menu" },
                { selector: ".main", text: "Dashboard" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m6-l4",
        title: { en: "MINI-PROJECT: Pricing Row", fa: "پروژه کوچک: ردیف قیمت‌گذاری" },
        goal: { en: "Build the famous three-card pricing layout with a featured middle.", fa: "لایوت معروف سه‌کارته قیمت‌گذاری با کارت ویژه وسط رو بساز." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The pricing section: three equal cards in a row, the middle one visually **featured** (border + slight scale). Flex makes the equal sizing trivial — `flex: 1` on each card shares space perfectly. The featured card just gets extra styling.", fa: "بخش قیمت‌گذاری: سه کارت مساوی در یک سطر، کارت وسط **ویژه** (بوردر + کمی بزرگ‌تر). فلکس اندازه‌گیری مساوی رو بی‌دردسر می‌کنه — ‏`flex: 1` روی هر کارت فضا رو بی‌نقص تقسیم می‌کنه. کارت ویژه فقط استایل بیشتر می‌گیره." },
              { type: "code", lang: "css", runnable: false, code: `.plan  { flex: 1; }                  /* equal thirds  */\n.featured {\n  border: 2px solid teal;\n  transform: scale(1.04);            /* pops forward  */\n}` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Card anatomy worth copying: title (plan name), a **big price line** (font-size contrast does the selling), a feature list (ul), and a full-width button. Padding + gap create the breathing rhythm. `transform: scale(1.04)` is a 4% enlargement — enough to pop, small enough to stay classy.", fa: "آناتومی کارت که ارزش کپی‌کردن داره: عنوان (اسم پلن)، یک **خط قیمت بزرگ** (کنتراست فونت فروش رو انجام می‌ده)، لیست امکانات (ul) و دکمه تمام‌عرض. پدینگ + gap ریتم تنفس می‌سازه. ‏`transform: scale(1.04)` چهار درصد بزرگ‌نماییه — به‌اندازه کافی برجسته، به‌اندازه کافی شیک." },
              { type: "warn", en: "transform: scale on a flex item can overflow tight containers — give the row a little padding so the featured card doesn't clip.", fa: "‏transform: scale روی آیتم فلکس می‌تونه از کانتینرهای تنگ بیرون بزنه — به ردیف یه کم پدینگ بده تا کارت ویژه بریده نشه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Equal-width pricing cards in a row use…", fa: "کارت‌های قیمت هم‌عرض در یک سطر از … استفاده می‌کنن." },
                options: [
                  { en: "flex: 1 on each card", fa: "‏flex: 1 روی هر کارت" },
                  { en: "width: 33px", fa: "width: 33px" },
                  { en: "float: left", fa: "float: left" },
                  { en: "display: table", fa: "display: table" },
                ],
                answer: 0,
                explain: { en: "flex: 1 shares the row's space equally — the one-liner equalizer.", fa: "‏flex: 1 فضای سطر رو مساوی تقسیم می‌کنه — یک‌خطی مساوی‌کننده." },
              },
              {
                q: { en: "What does transform: scale(1.04) do?", fa: "‏transform: scale(1.04) چه کار می‌کنه؟" },
                options: [
                  { en: "Grows the card 4% visually", fa: "کارت رو ۴٪ بزرگ‌تر نشون می‌ده" },
                  { en: "Adds 4px padding", fa: "۴px پدینگ اضافه می‌کنه" },
                  { en: "Moves the card down", fa: "کارت رو می‌بره پایین" },
                  { en: "Rotates the card", fa: "کارت رو می‌چرخونه" },
                ],
                answer: 0,
                explain: { en: "scale multiplies the rendered size — 1.04 = +4%.", fa: "‏scale اندازه رندر رو ضرب می‌کنه — ‏۱.۰۴ = ‏+۴٪." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Three Plans", fa: "سه پلن" },
            brief: { en: "Give .plans inline display: flex; gap: 16px; padding: 8px. Give EACH .plan inline flex: 1; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center. Keep all texts.", fa: "به .plans استایل درون‌خطی display: flex; gap: 16px; padding: 8px بده. به هر .plan استایل درون‌خطی flex: 1; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Pricing</title>\n</head>\n<body>\n  <!-- TODO: flex + gap + padding on .plans -->\n  <div class="plans">\n    <!-- TODO: the plan recipe on each card -->\n    <div class="plan"><h3>Starter</h3><p>Free</p><ul><li>1 project</li></ul></div>\n    <div class="plan"><h3>Pro</h3><p>5$ / mo</p><ul><li>10 projects</li><li>Team</li></ul></div>\n    <div class="plan"><h3>Team</h3><p>12$ / mo</p><ul><li>∞ projects</li><li>Priority</li></ul></div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Pricing</title>\n</head>\n<body>\n  <div class="plans" style="display: flex; gap: 16px; padding: 8px;">\n    <div class="plan" style="flex: 1; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center;"><h3>Starter</h3><p>Free</p><ul><li>1 project</li></ul></div>\n    <div class="plan" style="flex: 1; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center;"><h3>Pro</h3><p>5$ / mo</p><ul><li>10 projects</li><li>Team</li></ul></div>\n    <div class="plan" style="flex: 1; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center;"><h3>Team</h3><p>12$ / mo</p><ul><li>∞ projects</li><li>Priority</li></ul></div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "The plan recipe repeats identically on all three cards — copy-paste is your friend.", fa: "دستور plan روی هر سه کارت یکسانه — کپی‌پیست دوستته." },
              { en: ".plans gets THREE declarations; each .plan gets SIX.", fa: "‏.plans سه تعریف می‌گیره؛ هر .plan شش تعریف." },
              { en: "Don't rename the classes — the checker looks for .plans and .plan.", fa: "کلاس‌ها رو عوض نکن — چکر دنبال .plans و .plan می‌گرده." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".plans", styleIncludes: "display: flex" },
                { selector: ".plans", styleIncludes: "gap: 16px" },
                { selector: ".plan", count: 3 },
                { selector: ".plan", styleIncludes: "flex: 1", count: 3 },
                { selector: ".plan", styleIncludes: "padding: 20px", count: 3 },
                { selector: ".plan", styleIncludes: "border-radius: 12px", count: 3 },
                { selector: ".plan h3", text: "Pro" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m7",
    title: { en: "CSS Grid", fa: "گرید CSS" },
    blurb: {
      en: "Two-dimensional layouts: rows AND columns, finally in one system.",
      fa: "لایوت‌های دوبعدی: سطر و ستون، بالاخره در یک سیستم.",
    },
    lessons: [
      {
        id: "css-m7-l1",
        title: { en: "display: grid + grid-template-columns", fa: "display: grid و ستون‌بندی" },
        goal: { en: "Define real columns and place items into them.", fa: "ستون‌های واقعی تعریف کن و آیتم‌ها رو داخل‌شون بچین." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Grid** is flexbox's two-dimensional sibling: rows AND columns at once. `display: grid; grid-template-columns: 1fr 1fr 1fr;` = three equal columns (`fr` = a fraction of free space). Items flow into the cells automatically, row by row.", fa: "**گرید** خواهر دوبعدی فلکس‌باکسه: سطر و ستون همزمان. ‏`display: grid; grid-template-columns: 1fr 1fr 1fr;` یعنی سه ستون مساوی (‏`fr` = یک کسر از فضای خالی). آیتم‌ها خودکار سل‌به‌سل، سطر به سطر جا می‌گیرن." },
              { type: "code", lang: "css", runnable: false, code: `.gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 12px;\n}` },
              { type: "tip", en: "repeat(3, 1fr) is the shorthand for 1fr 1fr 1fr — same thing, DRY-er.", fa: "‏repeat(3, 1fr) خلاصه‌ی 1fr 1fr 1fr هست — همون، ولی تمیزتر." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .gallery {\n      display: grid;\n      grid-template-columns: 1fr 1fr 1fr;\n      gap: 10px;\n    }\n    .cell {\n      padding: 22px 0;\n      text-align: center;\n      background-color: #ede9fe;\n      border-radius: 8px;\n    }\n  </style>\n</head>\n<body>\n  <div class="gallery">\n    <div class="cell">1</div>\n    <div class="cell">2</div>\n    <div class="cell">3</div>\n    <div class="cell">4</div>\n    <div class="cell">5</div>\n    <div class="cell">6</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Six cells, three columns — rows created themselves. Flex wraps but doesn't align columns across rows; grid keeps every column the SAME width even when rows differ. That's the two-dimensional superpower.", fa: "شش سل، سه ستون — سطرها خودشون ساخته شدن. فلکس می‌شکنه ولی ستون‌ها رو بین سطرها تراز نمی‌کنه؛ گرید هر ستون رو حتی با سطرهای متفاوت هم‌عرض نگه می‌داره. این همون ابرقدرت دوبعدیه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does the fr unit mean?", fa: "واحد fr یعنی چی؟" },
                options: [
                  { en: "Fixed ratio in pixels", fa: "نسبت ثابت به پیکسل" },
                  { en: "A fraction of the free space", fa: "یک کسر از فضای خالی" },
                  { en: "Frame", fa: "فریم" },
                  { en: "Font-relative", fa: "نسبت به فونت" },
                ],
                answer: 1,
                explain: { en: "fr = fraction. 1fr 1fr = two equal shares of leftover space.", fa: "‏fr = کسر. ‏1fr 1fr = دو سهم مساوی از فضای خالی." },
              },
              {
                q: { en: "grid-template-columns: 200px 1fr means…", fa: "‏grid-template-columns: 200px 1fr یعنی…" },
                options: [
                  { en: "Two 200px columns", fa: "دو ستون ۲۰۰ پیکسلی" },
                  { en: "Fixed 200px column + one flexible column", fa: "ستون ثابت ۲۰۰px + یک ستون انعطاف‌پذیر" },
                  { en: "Invalid syntax", fa: "سینتکس نامعتبر" },
                  { en: "Two rows", fa: "دو سطر" },
                ],
                answer: 1,
                explain: { en: "The sidebar pattern! Fixed + flexible, in one line.", fa: "الگوی سایدبار! ثابت + انعطاف‌پذیر، در یک خط." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Six-Up Gallery", fa: "گالری شش‌تایی" },
            brief: { en: "Give .grid inline style display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px. Six .cell divs keep their texts and <style> look.", fa: "به .grid استایل درون‌خطی display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px بده. شش div کلاس cell متن‌ها و ظاهر <style> خودشون رو نگه می‌دارن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .cell {\n      padding: 22px 0;\n      text-align: center;\n      background-color: #ede9fe;\n      border-radius: 8px;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: grid + 3 columns + gap: 10px -->\n  <div class="grid">\n    <div class="cell">1</div>\n    <div class="cell">2</div>\n    <div class="cell">3</div>\n    <div class="cell">4</div>\n    <div class="cell">5</div>\n    <div class="cell">6</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .cell {\n      padding: 22px 0;\n      text-align: center;\n      background-color: #ede9fe;\n      border-radius: 8px;\n    }\n  </style>\n</head>\n<body>\n  <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">\n    <div class="cell">1</div>\n    <div class="cell">2</div>\n    <div class="cell">3</div>\n    <div class="cell">4</div>\n    <div class="cell">5</div>\n    <div class="cell">6</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "grid-template-columns takes a LIST: 1fr 1fr 1fr — spaces between values.", fa: "‏grid-template-columns یه لیست می‌گیره: ‏1fr 1fr 1fr — بین مقادیر فاصله." },
              { en: "Exactly six .cell divs, in order.", fa: "دقیقاً شش div کلاس cell، به ترتیب." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".grid", styleIncludes: "display: grid" },
                { selector: ".grid", styleIncludes: "grid-template-columns: 1fr 1fr 1fr" },
                { selector: ".grid", styleIncludes: "gap: 10px" },
                { selector: ".cell", count: 6 },
              ],
            },
          },
        ],
      },
      {
        id: "css-m7-l2",
        title: { en: "Spanning & grid-column", fa: "کشیدن سلول و grid-column" },
        goal: { en: "Make items stretch across several columns — magazine layouts unlocked.", fa: "بذار آیتم‌ها چند ستون کش بیایند — لایوت مجله‌ای باز شد." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Any grid item can **span** multiple columns: `grid-column: span 2;` makes it twice as wide (it eats two cells). A hero image spanning the full row, then normal cells below — the classic magazine grid.", fa: "هر آیتم گرید می‌تونه چند ستون **کش** بیاد: ‏`grid-column: span 2;` عرضش رو دو برابر می‌کنه (دو تا سل می‌خوره). یک عکس هیرو که کل سطر رو کش میاد و سلول‌های عادی زیرش — گرید کلاسیک مجله‌ای." },
              { type: "code", lang: "css", runnable: false, code: `.hero {\n  grid-column: span 3;   /* full row in a 3-col grid */\n}\n.wide {\n  grid-column: span 2;   /* two-thirds wide */\n}` },
              { type: "text", en: "Spanning also works vertically with `grid-row: span 2;`. Mixing row and column spans creates the masonry-like \"bento box\" layouts you see in dashboards.", fa: "کشیدن عمودی هم با ‏`grid-row: span 2;` کار می‌کنه. ترکیب span سطر و ستون، لایوت‌های «جعبه بنتو» مانند masonry رو می‌سازه که تو داشبوردها می‌بینی." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .board {\n      display: grid;\n      grid-template-columns: 1fr 1fr 1fr;\n      gap: 10px;\n    }\n    .tile {\n      padding: 18px 0;\n      text-align: center;\n      background-color: #fef3c7;\n      border-radius: 8px;\n    }\n    .tile.hero { grid-column: span 3; }\n    .tile.wide { grid-column: span 2; }\n  </style>\n</head>\n<body>\n  <div class="board">\n    <div class="tile hero">HERO — spans all three</div>\n    <div class="tile wide">WIDE — spans two</div>\n    <div class="tile">1</div>\n    <div class="tile">2</div>\n    <div class="tile">3</div>\n  </div>\n</body>\n</html>` },
              { type: "tip", en: "Spans that don't fit leave holes. Count carefully: in a 3-column grid, span 2 + span 2 = 4 > 3, so the second wraps to the next row.", fa: "‏Spanهایی که جا نمی‌شن حفره می‌ذارن. حساب‌کتاب کن: تو گرید ۳ ستونه، ‏span 2 + span 2 = ۴ > ۳ پس دومی می‌ره سطر بعد." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In a 3-column grid, grid-column: span 3 gives…", fa: "تو گرید ۳ ستونه، ‏grid-column: span 3 می‌ده…" },
                options: [
                  { en: "One third of the row", fa: "یک‌سوم سطر" },
                  { en: "The full row", fa: "کل سطر" },
                  { en: "Three rows", fa: "سه سطر" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 1,
                explain: { en: "Spanning all 3 columns = the entire row.", fa: "کشیدن روی هر ۳ ستون = کل سطر." },
              },
              {
                q: { en: "Which spans VERTICALLY across two rows?", fa: "کدوم عمودی روی دو سطر کش میاد؟" },
                options: [
                  { en: "grid-column: span 2", fa: "grid-column: span 2" },
                  { en: "grid-row: span 2", fa: "grid-row: span 2" },
                  { en: "row-span: 2", fa: "row-span: 2" },
                  { en: "height: 2", fa: "height: 2" },
                ],
                answer: 1,
                explain: { en: "grid-row for rows, grid-column for columns.", fa: "‏grid-row برای سطر، grid-column برای ستون." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Bento Board", fa: "بورد بنتو" },
            brief: { en: "Keep the 3-column grid on .board (inline). Give the .hero tile inline grid-column: span 3 and the .wide tile inline grid-column: span 2. Keep the three normal tiles.", fa: "گرید ۳ ستونه روی .board رو نگه دار (درون‌خطی). به تایل .hero استایل درون‌خطی grid-column: span 3 و به .wide استایل درون‌خطی grid-column: span 2 بده. سه تایل عادی بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .board {\n      display: grid;\n      grid-template-columns: 1fr 1fr 1fr;\n      gap: 10px;\n    }\n    .tile {\n      padding: 18px 0;\n      text-align: center;\n      background-color: #fef3c7;\n      border-radius: 8px;\n    }\n  </style>\n</head>\n<body>\n  <div class="board">\n    <!-- TODO: grid-column: span 3 -->\n    <div class="tile hero">HERO</div>\n    <!-- TODO: grid-column: span 2 -->\n    <div class="tile wide">WIDE</div>\n    <div class="tile">1</div>\n    <div class="tile">2</div>\n    <div class="tile">3</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .board {\n      display: grid;\n      grid-template-columns: 1fr 1fr 1fr;\n      gap: 10px;\n    }\n    .tile {\n      padding: 18px 0;\n      text-align: center;\n      background-color: #fef3c7;\n      border-radius: 8px;\n    }\n  </style>\n</head>\n<body>\n  <div class="board">\n    <div class="tile hero" style="grid-column: span 3;">HERO</div>\n    <div class="tile wide" style="grid-column: span 2;">WIDE</div>\n    <div class="tile">1</div>\n    <div class="tile">2</div>\n    <div class="tile">3</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Only the two special tiles get inline styles — the grid setup stays in <style>.", fa: "فقط دو تایل خاص استایل درون‌خطی می‌گیرن — تنظیم گرید توی <style> می‌مونه." },
              { en: "The exact value text matters: \"HERO\" and \"WIDE\".", fa: "متن دقیق مهمه: «HERO» و «WIDE»." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".board", styleIncludes: "grid-template-columns: 1fr 1fr 1fr" },
                { selector: ".tile.hero", styleIncludes: "grid-column: span 3" },
                { selector: ".tile.wide", styleIncludes: "grid-column: span 2" },
                { selector: ".tile", count: 5 },
                { selector: ".tile", text: "HERO" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m7-l3",
        title: { en: "Rows, Areas & the Grid Mindset", fa: "سطرها، ناحیه‌ها و ذهنیت گرید" },
        goal: { en: "Control row heights and name regions like a blueprint.", fa: "ارتفاع سطرها رو کنترل کن و ناحیه‌ها رو مثل نقشه اسم‌گذاری کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "`grid-template-rows` mirrors the columns version — define row heights: `grid-template-rows: 80px 1fr;` = a fixed header row + a flexible body row. Combine with columns and you've declared the WHOLE page skeleton in two lines.", fa: "‏`grid-template-rows` مثل نسخه ستون‌هاست — ارتفاع سطرها رو تعریف کن: ‏`grid-template-rows: 80px 1fr;` یعنی یک سطر هدر ثابت + یک سطر بدنه انعطاف‌پذیر. با ستون‌ها ترکیبش کن و اسکلت کل صفحه رو در دو خط اعلام کن." },
              { type: "code", lang: "css", runnable: false, code: `.page {\n  display: grid;\n  grid-template-columns: 220px 1fr;\n  grid-template-rows: 64px 1fr;\n  min-height: 100vh;\n}\n/* 4 cells: header spans top, sidebar+main below */` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "For named placement there's **grid-template-areas** — you literally DRAW the layout with words: `\"header header\" \"sidebar main\"`. Each element then claims its name with `grid-area: header;`. It's CSS that reads like the design file.", fa: "برای جای‌گذاری اسم‌دار **grid-template-areas** هست — لایوت رو واقعاً با کلمه می‌کشی: ‏`\"header header\" \"sidebar main\"`. بعد هر عنصر با `grid-area: header;` اسمش رو ادعا می‌کنه. یه CSS که مثل فایل طراحی خونده می‌شه." },
              { type: "code", lang: "css", runnable: false, code: `.page {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\";\n  grid-template-columns: 220px 1fr;\n}\n.page-header { grid-area: header; }\n.page-nav    { grid-area: sidebar; }\n.page-main   { grid-area: main; }` },
              { type: "tip", en: "Areas need every row quoted and equal column counts — \"a a\" / \"b c\" is invalid; \"a a\" / \"b b\" isn't.", fa: "ناحیه‌ها هر سطر داخل کوتیشن و تعداد ستون مساوی می‌خوان — ‏\"a a\" / \"b c\" نامعتبره؛ ‏\"a a\" / \"b b\" معتبره." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "grid-template-rows: 64px 1fr creates…", fa: "‏grid-template-rows: 64px 1fr می‌سازه…" },
                options: [
                  { en: "Two 64px rows", fa: "دو سطر ۶۴ پیکسلی" },
                  { en: "A fixed 64px row + a flexible one", fa: "سطر ثابت ۶۴px + یک سطر انعطاف‌پذیر" },
                  { en: "64 columns", fa: "۶۴ ستون" },
                  { en: "A gap of 1fr", fa: "gap یک fr" },
                ],
                answer: 1,
                explain: { en: "Same logic as columns — fixed then flexible.", fa: "همون منطق ستون‌ها — ثابت بعد انعطاف‌پذیر." },
              },
              {
                q: { en: "grid-template-areas lets you…", fa: "‏grid-template-areas اجازه می‌ده…" },
                options: [
                  { en: "Name layout regions and place items by name", fa: "ناحیه‌های لایوت رو اسم‌گذاری و آیتم‌ها رو با اسم بچینی" },
                  { en: "Set fonts faster", fa: "سریع‌تر فونت ست کنی" },
                  { en: "Animate the grid", fa: "گرید رو انیمیت کنی" },
                  { en: "Skip the gap property", fa: "از gap بگذری" },
                ],
                answer: 0,
                explain: { en: "Draw the layout with quoted strings, claim cells by name.", fa: "لایوت رو با رشته‌های کوتیشن‌دار بکش، سل‌ها رو با اسم بردار." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Blueprint Rows", fa: "سطرهای نقشه" },
            brief: { en: "Give .layout inline style display: grid; grid-template-columns: 180px 1fr; grid-template-rows: 64px 1fr; gap: 8px. Keep the four region divs and their <style> rules.", fa: "به .layout استایل درون‌خطی display: grid; grid-template-columns: 180px 1fr; grid-template-rows: 64px 1fr; gap: 8px بده. چهار div ناحیه و قوانین <style> بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .layout { min-height: 240px; }\n    .region {\n      display: flex;\n      align-items: center;\n      padding: 0 14px;\n      border-radius: 8px;\n    }\n    .r-head { background-color: #0f172a; color: #e2e8f0; }\n    .r-side { background-color: #e0e7ff; }\n    .r-main { background-color: #f1f5f9; }\n  </style>\n</head>\n<body>\n  <!-- TODO: grid + 180px/1fr columns + 64px/1fr rows + gap: 8px -->\n  <div class="layout">\n    <div class="region r-head" style="grid-column: span 2;">Header</div>\n    <div class="region r-side">Sidebar</div>\n    <div class="region r-main">Main</div>\n    <div class="region r-side">Panel</div>\n    <div class="region r-main">Aside</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .layout { min-height: 240px; }\n    .region {\n      display: flex;\n      align-items: center;\n      padding: 0 14px;\n      border-radius: 8px;\n    }\n    .r-head { background-color: #0f172a; color: #e2e8f0; }\n    .r-side { background-color: #e0e7ff; }\n    .r-main { background-color: #f1f5f9; }\n  </style>\n</head>\n<body>\n  <div class="layout" style="display: grid; grid-template-columns: 180px 1fr; grid-template-rows: 64px 1fr; gap: 8px;">\n    <div class="region r-head" style="grid-column: span 2;">Header</div>\n    <div class="region r-side">Sidebar</div>\n    <div class="region r-main">Main</div>\n    <div class="region r-side">Panel</div>\n    <div class="region r-main">Aside</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Four declarations on .layout — columns, rows, gap, display.", fa: "چهار تعریف روی .layout — ستون‌ها، سطرها، gap و display." },
              { en: "Header already spans both columns; grid fills the rest automatically.", fa: "هدر از قبل هر دو ستون رو کشیده؛ گرید بقیه رو خودکار پر می‌کنه." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".layout", styleIncludes: "display: grid" },
                { selector: ".layout", styleIncludes: "grid-template-columns: 180px 1fr" },
                { selector: ".layout", styleIncludes: "grid-template-rows: 64px 1fr" },
                { selector: ".layout", styleIncludes: "gap: 8px" },
                { selector: ".region", count: 5 },
                { selector: ".r-head", text: "Header" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m7-l4",
        title: { en: "MINI-PROJECT: Photo Gallery", fa: "پروژه کوچک: گالری عکس" },
        goal: { en: "Finish module 7 with a responsive 3-column gallery with a featured wide shot.", fa: "ماژول ۷ رو با یک گالری ریسپانسیو ۳ ستونه با عکس ویژه‌ی پهن تموم کن." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The brief: six \"photos\" (emoji tiles), a 3-column grid, one wide shot spanning 2 columns at the top. A `minmax()` pro touch: `grid-template-columns: repeat(3, minmax(0, 1fr));` prevents content from forcing columns wider — the bulletproof version.", fa: "بریف: شش «عکس» (تایل ایموجی)، گرید ۳ ستونه و یک عکس پهن که ۲ ستون بالای گالری کش میاد. یه نکته حرفه‌ای با `minmax()`: ‏`grid-template-columns: repeat(3, minmax(0, 1fr));` جلوی عریض‌شدن ستون‌ها توسط محتوا رو می‌گیره — نسخه ضدگلوله." },
              { type: "code", lang: "css", runnable: false, code: `.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n}\n.shot.wide { grid-column: span 2; }` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Gallery anatomy: aspect-ratio keeps tiles photographic (`aspect-ratio: 4 / 3;`), object-fit handles real images inside (`object-fit: cover;`), and a caption via figure/figcaption turns tiles into stories. You'll meet aspect-ratio properly in module 13 — tonight it's a guest star.", fa: "آناتومی گالری: ‏aspect-ratio تایل‌ها رو عکس‌گونه نگه می‌داره (‏`aspect-ratio: 4 / 3;`)، ‏object-fit عکس واقعی داخل سل رو مدیریت می‌کنه (‏`object-fit: cover;`) و کپشن با figure/figcaption تایل‌ها رو به قصه تبدیل می‌کنه. ‏aspect-ratio رو تو ماژول ۱۳ جدی می‌خونی — امشب مهمونه." },
              { type: "tip", en: "Grid + wrap-like responsiveness comes free in module 10's media queries — same gallery, auto-adapting.", fa: "ریسپانسیو شدن گالری تو ماژول ۱۰ با مدیا کوئری مجانی میاد — همون گالری، خود-سازگار." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "repeat(3, minmax(0, 1fr)) protects against…", fa: "‏repeat(3, minmax(0, 1fr)) در برابر … محافظت می‌کنه." },
                options: [
                  { en: "Content forcing columns too wide", fa: "عریض‌شدن ستون‌ها توسط محتوا" },
                  { en: "Slow loading", fa: "لود کند" },
                  { en: "Old browsers only", fa: "فقط مرورگرهای قدیمی" },
                  { en: "Missing gap", fa: "gap گم‌شده" },
                ],
                answer: 0,
                explain: { en: "minmax(0, 1fr) lets columns shrink to zero — content can't stretch them.", fa: "‏minmax(0, 1fr) اجازه می‌ده ستون‌ها تا صفر جمع بشن — محتوا نمی‌تونه عریض‌شون کنه." },
              },
              {
                q: { en: "object-fit: cover on an <img> inside a grid cell…", fa: "‏object-fit: cover روی <img> داخل سل گرید…" },
                options: [
                  { en: "Fills the cell and crops the overflow", fa: "سل رو پر می‌کنه و اضافه‌ش رو برش می‌زنه" },
                  { en: "Blurs the image", fa: "عکس رو بلور می‌کنه" },
                  { en: "Adds a border", fa: "بوردر اضافه می‌کنه" },
                  { en: "Only works with videos", fa: "فقط با ویدیو کار می‌کنه" },
                ],
                answer: 0,
                explain: { en: "cover = fill the box, crop gracefully. Perfect gallery behavior.", fa: "‏cover = پر کردن باکس و برش شیک. رفتار ایده‌آل گالری." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Nature Shots", fa: "عکس‌های طبیعت" },
            brief: { en: "Give .gallery inline display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px. The .wide tile gets inline grid-column: span 2. Keep six .shot tiles and their texts (🌅 wide + 5 more).", fa: "به .gallery استایل درون‌خطی display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px بده. تایل .wide استایل درون‌خطی grid-column: span 2 بگیره. شش تایل .shot و متن‌هاشون بمونن (‏🌅 پهن + ۵ تا دیگه)." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .shot {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      aspect-ratio: 4 / 3;\n      background-color: #ecfeff;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: grid + repeat(3, minmax(0, 1fr)) + gap: 10px -->\n  <div class="gallery">\n    <!-- TODO: grid-column: span 2 -->\n    <div class="shot wide">🌅 Sunrise</div>\n    <div class="shot">🏔️ Peak</div>\n    <div class="shot">🌊 Wave</div>\n    <div class="shot">🌲 Forest</div>\n    <div class="shot">🌙 Night</div>\n    <div class="shot">🏜️ Desert</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .shot {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      aspect-ratio: 4 / 3;\n      background-color: #ecfeff;\n      border-radius: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="gallery" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px;">\n    <div class="shot wide" style="grid-column: span 2;">🌅 Sunrise</div>\n    <div class="shot">🏔️ Peak</div>\n    <div class="shot">🌊 Wave</div>\n    <div class="shot">🌲 Forest</div>\n    <div class="shot">🌙 Night</div>\n    <div class="shot">🏜️ Desert</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "The exact template: grid-template-columns: repeat(3, minmax(0, 1fr));", fa: "قالب دقیق: ‏grid-template-columns: repeat(3, minmax(0, 1fr));‏" },
              { en: "Six .shot elements total — the first one is .wide with span 2.", fa: "جمعاً شش عنصر .shot — اولی .wide با span 2 هست." },
              { en: "Keep every emoji and label — they're part of the grading.", fa: "همه ایموجی‌ها و لیبل‌ها بمونن — بخشی از نمره‌دهین." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".gallery", styleIncludes: "display: grid" },
                { selector: ".gallery", styleIncludes: "grid-template-columns: repeat(3,minmax(0,1fr))" },
                { selector: ".gallery", styleIncludes: "gap: 10px" },
                { selector: ".shot", count: 6 },
                { selector: ".shot.wide", styleIncludes: "grid-column: span 2" },
                { selector: ".shot.wide", text: "Sunrise" },
              ],
            },
          },
        ],
      },
    ],
  },
  // __TEKA16_CSS_A_APPEND__
];
