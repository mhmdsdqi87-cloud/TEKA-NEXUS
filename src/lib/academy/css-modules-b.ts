// TEKA NEXUS — CSS course, part B (modules m8–m19, 49 lessons).
// Authored in Task 16 (m8–m13) and Task 17-c3 (m14–m19).
// m8–m13: position, transitions, responsive, animations, components, first final project.
// m14–m19: layout masterclass, modern effects, color systems, typography pro,
// micro-interactions and the grand finale (mega final project).

import type { Module } from "./types";

export const cssModulesB: Module[] = [
  {
    id: "css-m8",
    title: { en: "Position & Layers", fa: "موقعیت‌دهی و لایه‌ها" },
    blurb: {
      en: "Escape the normal flow: absolute, fixed, sticky and the z-index stack.",
      fa: "از جریان عادی فرار کن: absolute، fixed، sticky و پشته z-index.",
    },
    lessons: [
      {
        id: "css-m8-l1",
        title: { en: "position: relative & absolute", fa: "position: relative و absolute" },
        goal: { en: "Pin elements precisely inside their parent.", fa: "عناصر رو دقیق داخل والدشان سنجاق کن." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "By default elements sit in the **normal flow**. `position: relative;` keeps an element in place but makes it a *reference frame*. `position: absolute;` lifts an element out of the flow and pins it to the nearest positioned ancestor using `top/right/bottom/left`. Combo = badge on avatar, pin on map, corner ribbon.", fa: "به‌طور پیش‌فرض عناصر در **جریان عادی** می‌شینن. ‏`position: relative;` عنصر رو سر جاش نگه می‌داره ولی ازش یک *قاب مرجع* می‌سازه. ‏`position: absolute;` عنصر رو از جریان بیرون می‌کشه و با `top/right/bottom/left` به نزدیک‌ترین والد position دار می‌چسبونه. ترکیب‌شون = نشان روی آواتار، پین روی نقشه، روبان گوشه صفحه." },
              { type: "code", lang: "css", runnable: false, code: `.avatar { position: relative; }\n.avatar .dot {\n  position: absolute;\n  top: 0; right: 0;\n  width: 12px; height: 12px;\n}` },
              { type: "tip", en: "Golden rule: absolute needs a relative (or any positioned) parent, or it pins to the whole page.", fa: "قانون طلایی: absolute به یک والد relative (یا هر position دار) نیاز داره، وگرنه به کل صفحه می‌چسبه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .avatar {\n      position: relative;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 84px; height: 84px;\n      background-color: #0f172a;\n      color: #67e8f9;\n      border-radius: 50%;\n    }\n    .dot {\n      position: absolute;\n      top: 2px; right: 2px;\n      width: 16px; height: 16px;\n      background-color: #22c55e;\n      border: 2px solid white;\n      border-radius: 50%;\n    }\n  </style>\n</head>\n<body>\n  <div class="avatar">AR<div class="dot"></div></div>\n</body>\n</html>` },
              { type: "text", en: "The green dot reads the avatar's box, not the page — because the avatar is `relative`. That little coordinate system trick powers notification badges everywhere.", fa: "نقطه سبز مختصات رو از باکس آواتار می‌خونه نه از صفحه — چون آواتار `relative` هست. همون ترفند سیستم مختصات کوچیک که نشان‌های اعلان همه‌جا رو می‌سازه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "An absolute child pins to…", fa: "فرزند absolute به … سنجاق می‌شه." },
                options: [
                  { en: "Always the <body>", fa: "همیشه <body>" },
                  { en: "The nearest positioned ancestor", fa: "نزدیک‌ترین والد position دار" },
                  { en: "The screen", fa: "صفحه‌نمایش" },
                  { en: "Its own previous position", fa: "جای قبلی خودش" },
                ],
                answer: 1,
                explain: { en: "Nearest ancestor with position ≠ static. No such ancestor? The initial containing block (page).", fa: "نزدیک‌ترین والدی که position غیر از static داره. نبود؟ قاب اولیه صفحه." },
              },
              {
                q: { en: "position: relative alone (no offsets) does…", fa: "‏position: relative به‌تنهایی (بدون offset)…" },
                options: [
                  { en: "Nothing visible — but enables absolute children", fa: "چیزی دیده نمی‌شه — ولی فرزند absolute رو فعال می‌کنه" },
                  { en: "Centers the element", fa: "عنصر رو وسط می‌کنه" },
                  { en: "Hides the element", fa: "عنصر رو مخفی می‌کنه" },
                  { en: "Makes it scroll away", fa: "با اسکرول می‌ره" },
                ],
                answer: 0,
                explain: { en: "relative without offsets = invisible change + reference frame. Subtle but huge.", fa: "‏relative بدون offset = تغییر نامرئی + قاب مرجع. ظریف ولی عظیم." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Online Badge", fa: "نشان آنلاین" },
            brief: { en: "Give .avatar inline position: relative. Give .dot inline position: absolute; top: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border-radius: 50%. Keep texts and <style>.", fa: "به .avatar استایل درون‌خطی position: relative بده. به .dot استایل درون‌خطی position: absolute; top: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border-radius: 50%. متن‌ها و <style> بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .avatar {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 84px; height: 84px;\n      background-color: #0f172a;\n      color: #67e8f9;\n      border-radius: 50%;\n    }\n  </style>\n</head>\n<body>\n  <!-- TODO: position: relative -->\n  <div class="avatar">\n    SA\n    <!-- TODO: absolute + top/right + size + green + circle -->\n    <span class="dot"></span>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .avatar {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 84px; height: 84px;\n      background-color: #0f172a;\n      color: #67e8f9;\n      border-radius: 50%;\n    }\n  </style>\n</head>\n<body>\n  <div class="avatar" style="position: relative;">\n    SA\n    <span class="dot" style="position: absolute; top: 2px; right: 2px; width: 14px; height: 14px; background-color: #22c55e; border-radius: 50%;"></span>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Six declarations on .dot — position, top, right, width, height, background, radius (that's six, count them!).", fa: "شش تعریف روی .dot — position، top، right، width، height، بک‌گراند و رادیوس (بشمار، شش‌تاست!)" },
              { en: "The parent gets exactly one declaration: position: relative.", fa: "والد دقیقاً یک تعریف می‌گیره: ‏position: relative." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".avatar", styleIncludes: "position: relative" },
                { selector: ".avatar .dot", styleIncludes: "position: absolute" },
                { selector: ".avatar .dot", styleIncludes: "top: 2px" },
                { selector: ".avatar .dot", styleIncludes: "right: 2px" },
                { selector: ".avatar .dot", styleIncludes: "background-color: #22c55e" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m8-l2",
        title: { en: "fixed & sticky", fa: "fixed و sticky" },
        goal: { en: "Build bars that stay on screen and headers that stick.", fa: "نوارهایی بساز که روی صفحه می‌مونن و هدرهایی که می‌چسبن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "`position: fixed;` pins an element to the **viewport** — it ignores scrolling entirely. Chat bubbles, cookie banners, floating support buttons all live here. `position: sticky;` is the hybrid: scrolls normally UNTIL it hits its offset (`top: 0`), then sticks like glue — perfect table headers and section navs.", fa: "‏`position: fixed;` عنصر رو به **viewport** می‌چسبونه — از اسکرول کاملاً بی‌خیال می‌شه. حباب چت، بنر کوکی و دکمه شناور پشتیبانی همه اینجا زندگی می‌کنن. ‏`position: sticky;` هیبریده: عادی اسکرول می‌شه تا به offset خودش برسه (‏`top: 0`)، بعد مثل چسب می‌مونه — عالی برای هدر جدول‌ها و ناوبری بخش‌ها." },
              { type: "code", lang: "css", runnable: false, code: `.help-btn {\n  position: fixed;\n  bottom: 20px; right: 20px;\n}\n.table-head {\n  position: sticky;\n  top: 0;\n}` },
              { type: "warn", en: "fixed elements ignore their parents — z-index wars start here. Give floating UI a sane z-index (module 8.3!).", fa: "عناصر fixed از والدین بی‌اعتنا ان — جنگ‌های z-index از همین‌جا شروع می‌شه. به UI شناور یک z-index منطقی بده (ماژول ۸٫۳!)" },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Sticky gotcha**: the sticky element sticks only WITHIN its parent. If the parent is short, the sticky child scrolls away with it. The parent is the runway — no runway, no sticking.", fa: "**تله sticky**: عنصر sticky فقط *داخل* والدر sticky می‌مونه. اگه والد کوتاه باشه، فرزند همراهش می‌ره. والد باند پروازهاست — بدون باند، چسبوندن بی‌معنیه." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .bar {\n      position: sticky;\n      top: 0;\n      padding: 10px 16px;\n      background-color: #0f172a;\n      color: #e2e8f0;\n    }\n    .filler { height: 400px; background: linear-gradient(#f8fafc, #e2e8f0); }\n  </style>\n</head>\n<body>\n  <div class="bar">I stick when you scroll 👇</div>\n  <div class="filler"></div>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which position value ignores scrolling completely?", fa: "کدوم مقدار position از اسکرول کلاً بی‌اعتناست؟" },
                options: [
                  { en: "sticky", fa: "sticky" },
                  { en: "fixed", fa: "fixed" },
                  { en: "relative", fa: "relative" },
                  { en: "static", fa: "static" },
                ],
                answer: 1,
                explain: { en: "fixed = glued to the viewport. sticky = scrolls until offset, then stays.", fa: "‏fixed = چسبیده به viewport. ‏sticky = اسکرول تا offset، بعد می‌مونه." },
              },
              {
                q: { en: "Sticky stops sticking when…", fa: "‏sticky وقتی از چسبندگی می‌افته که…" },
                options: [
                  { en: "The page reloads", fa: "صفحه ریلود شه" },
                  { en: "Its parent scrolls past", fa: "والدش از دید بره" },
                  { en: "You scroll up", fa: "بالا اسکرول کنی" },
                  { en: "Never — it's forever", fa: "هرگز — ابدیه" },
                ],
                answer: 1,
                explain: { en: "Sticky is bounded by its parent box — parent gone, stick gone.", fa: "‏sticky محدود به باکس والدشه — والد رفت، چسب رفت." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Floating Help", fa: "دکمه راهنمای شناور" },
            brief: { en: "Give the help button inline style position: fixed; bottom: 20px; right: 20px; padding: 12px 18px; border-radius: 999px; background-color: teal; color: white; border: 0. Keep its text \"Help\".", fa: "به دکمه راهنما استایل درون‌خطی position: fixed; bottom: 20px; right: 20px; padding: 12px 18px; border-radius: 999px; background-color: teal; color: white; border: 0 بده. متن Help بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Floating help</title>\n</head>\n<body>\n  <p>Long content behind… scroll mentally :)</p>\n  <!-- TODO: the floating recipe -->\n  <button class="help">Help</button>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Floating help</title>\n</head>\n<body>\n  <p>Long content behind… scroll mentally :)</p>\n  <button class="help" style="position: fixed; bottom: 20px; right: 20px; padding: 12px 18px; border-radius: 999px; background-color: teal; color: white; border: 0;">Help</button>\n</body>\n</html>`,
            hints: [
              { en: "Seven declarations — position, bottom, right, padding, radius, background, color, border. Count: eight! Each from the brief.", fa: "تعریف‌ها رو از بریف بشمار — همه اینجاست." },
              { en: "fixed + bottom + right = bottom-right corner of the viewport.", fa: "‏fixed + bottom + right = گوشه پایین-راست viewport." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "button.help", text: "Help" },
                { selector: "button.help", styleIncludes: "position: fixed" },
                { selector: "button.help", styleIncludes: "bottom: 20px" },
                { selector: "button.help", styleIncludes: "right: 20px" },
                { selector: "button.help", styleIncludes: "border-radius: 999px" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m8-l3",
        title: { en: "z-index & Stacking", fa: "z-index و پشته‌بندی" },
        goal: { en: "Control which element wins when things overlap.", fa: "کنترل کن موقع هم‌پوشانی کدوم عنصر می‌بره." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Overlapping elements stack in **paint order** — later HTML on top. `z-index` reorders the stack: higher number = closer to viewer. It only works on **positioned** elements (relative/absolute/fixed/sticky) or flex/grid items. Random z-index values (999, 9999) are tech debt — use a small scale: 1, 10, 100.", fa: "عناصر هم‌پوشان در **ترتیب نقاشی** پشته می‌شن — HTML بعدی روش می‌شینه. ‏`z-index` ترتیب پشته رو عوض می‌کنه: عدد بالاتر = نزدیک‌تر به بیننده. فقط روی عناصر **position دار** (relative/absolute/fixed/sticky) یا آیتم‌های flex/grid کار می‌کنه. مقادیر شانسی (۹۹۹، ۹۹۹۹) بدهی فنی‌ان — از مقیاس کوچک استفاده کن: ۱، ۱۰، ۱۰۰." },
              { type: "code", lang: "css", runnable: false, code: `.modal   { position: fixed; z-index: 100; }\n.dropdown { position: absolute; z-index: 10; }\n.tooltip  { position: absolute; z-index: 1; }` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .layer {\n      position: absolute;\n      width: 140px; height: 140px;\n      border-radius: 12px;\n    }\n  </style>\n</head>\n<body style="margin:0">\n  <div style="position: relative; height: 180px;">\n    <div class="layer" style="background-color: rgba(34,211,238,.5); top: 10px; left: 10px; z-index: 1;">z1</div>\n    <div class="layer" style="background-color: rgba(167,139,250,.5); top: 40px; left: 40px; z-index: 2;">z2 — on top</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The violet card wins purely because of z-index: 2. Swap the values and the cyan one rises. When \"my dropdown hides behind the banner!\" — that's a z-index investigation, and now you know exactly where to look.", fa: "کارت بنفش فقط به‌خاطر z-index: 2 می‌بره. مقادیر رو عوض کن و آبی بالا میاد. وقتی «دراپ‌داون من پشت بنر گم می‌شه!» — یه پرونده z-indexه و الان دقیقاً می‌دونی کجا رو بگردی." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "z-index works on…", fa: "‏z-index کار می‌کنه روی…" },
                options: [
                  { en: "Every element", fa: "هر عنصری" },
                  { en: "Positioned elements and flex/grid items", fa: "عناصر position دار و آیتم‌های flex/grid" },
                  { en: "Only images", fa: "فقط عکس‌ها" },
                  { en: "Only links", fa: "فقط لینک‌ها" },
                ],
                answer: 1,
                explain: { en: "No position, no z-index — the classic silent failure.", fa: "بدون position، ‏z-index هم نیست — شکست ساکت کلاسیک." },
              },
              {
                q: { en: "Two overlapping positioned elements: z-index 5 and 9. Who shows on top?", fa: "دو عنصر position دار هم‌پوشان با z-index پنج و نه. کدوم رو می‌شینه؟" },
                options: [
                  { en: "z-index: 5", fa: "‏z-index: 5" },
                  { en: "z-index: 9", fa: "‏z-index: 9" },
                  { en: "The first in HTML", fa: "اولی تو HTML" },
                  { en: "Neither — they blur", fa: "هیچ‌کدوم — ترکیب می‌شن" },
                ],
                answer: 1,
                explain: { en: "Higher z-index = closer to the viewer.", fa: "‏z-index بالاتر = نزدیک‌تر به بیننده." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Stack Winner", fa: "برنده پشته" },
            brief: { en: "Two overlapping cards: give .card-a inline position: absolute; z-index: 2; background-color: rgba(34,211,238,0.5) and .card-b inline position: absolute; z-index: 1; background-color: rgba(167,139,250,0.5). Card A must sit on top. Keep sizes/positions from <style>.", fa: "دو کارت هم‌پوشان: به .card-a استایل درون‌خطی position: absolute; z-index: 2; background-color: rgba(34,211,238,0.5) و به .card-b استایل درون‌خطی position: absolute; z-index: 1; background-color: rgba(167,139,250,0.5) بده. کارت A باید بالا باشه. اندازه/جای <style> بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .wrap { position: relative; height: 190px; }\n    .card { width: 150px; height: 150px; border-radius: 12px; }\n  </style>\n</head>\n<body style="margin:0">\n  <div class="wrap">\n    <!-- TODO: absolute + z-index: 2 + cyan -->\n    <div class="card card-a" >A</div>\n    <!-- TODO: absolute + z-index: 1 + violet -->\n    <div class="card card-b" >B</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .wrap { position: relative; height: 190px; }\n    .card { width: 150px; height: 150px; border-radius: 12px; }\n  </style>\n</head>\n<body style="margin:0">\n  <div class="wrap">\n    <div class="card card-a" style="position: absolute; z-index: 2; background-color: rgba(34,211,238,0.5); top: 10px; left: 10px;">A</div>\n    <div class="card card-b" style="position: absolute; z-index: 1; background-color: rgba(167,139,250,0.5); top: 34px; left: 40px;">B</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Also copy the top/left pins from the solution so they overlap.", fa: "مقادیر top/left رو هم از راه‌حل کپی کن تا هم‌پوشان شن." },
              { en: "A wins with z-index: 2 — the HIGHER value.", fa: "‏A با z-index: 2 می‌بره — مقدار بالاتر." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".card-a", styleIncludes: "z-index: 2" },
                { selector: ".card-a", styleIncludes: "position: absolute" },
                { selector: ".card-b", styleIncludes: "z-index: 1" },
                { selector: ".card-b", styleIncludes: "background-color: rgba(167,139,250,0.5)" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m8-l4",
        title: { en: "MINI-PROJECT: Floating Help Button", fa: "پروژه کوچک: دکمه شناور کمک" },
        goal: { en: "Combine fixed positioning, z-index and polish into a real support widget.", fa: "‏fixed، ‏z-index و ظرافت رو ترکیب کن و یک ویجت پشتیبانی واقعی بساز." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The floating action button (FAB): fixed bottom-right, circular, with a shadow that separates it from the page and a z-index above content. Every chat widget, \"scroll to top\" and support bubble is this recipe.", fa: "دکمه شناور اکشن (FAB): fixed گوشه پایین-راست، دایره‌ای، با سایه‌ای که از صفحه جدا می‌کنه و z-index‌ای بالاتر از محتوا. هر ویجت چت، «برو بالا» و حباب پشتیبانی همین دستوره." },
              { type: "code", lang: "css", runnable: false, code: `.fab {\n  position: fixed;\n  bottom: 24px; right: 24px;\n  z-index: 50;\n  width: 56px; height: 56px;\n  border-radius: 50%;\n  box-shadow: 0 8px 24px rgba(13, 148, 136, 0.35);\n}` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Accessibility matters even on a FAB: real `<button>` (keyboard focusable), a clear `aria-label` for screen readers, and enough contrast. Floating UI is also content — treat it well.", fa: "دسترس‌پذیری حتی روی FAB مهمه: `<button>` واقعی (فوکوس کیبوردی)، ‏`aria-label` واضح برای اسکرین‌ریدر و کنتراست کافی. UI شناور هم محتوا ست — باهاش خوب رفتار کن." },
              { type: "code", lang: "html", runnable: false, code: `<button class="fab" aria-label="Open support chat">\n  💬\n</button>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why box-shadow on a FAB?", fa: "چرا FAB سایه می‌خواد؟" },
                options: [
                  { en: "To make it heavier", fa: "سنگین‌تر شه" },
                  { en: "To visually lift it off the page content", fa: "از نظر بصری از محتوای صفحه بلندش کنه" },
                  { en: "To add padding", fa: "پدینگ اضافه کنه" },
                  { en: "It's required by fixed", fa: "‏fixed اجباریش کرده" },
                ],
                answer: 1,
                explain: { en: "Shadow = elevation = \"this floats above\". Design language for depth.", fa: "سایه = ارتفاع = «این روش شناوره». زبان طراحی برای عمق." },
              },
              {
                q: { en: "Why aria-label on an emoji-only button?", fa: "چرا دکمه فقط-ایموجی aria-label می‌خواد؟" },
                options: [
                  { en: "For screen reader users to know its purpose", fa: "تا کاربران اسکرین‌ریدر هدفش رو بدونن" },
                  { en: "For SEO", fa: "برای سئو" },
                  { en: "To style it", fa: "برای استایل دادن" },
                  { en: "It's decoration", fa: "تزئینه" },
                ],
                answer: 0,
                explain: { en: "💬 means nothing to a screen reader — aria-label gives it a voice.", fa: "‏💬 برای اسکرین‌ریدر هیچ معنایی نداره — ‏aria-label بهش صدا می‌ده." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Support FAB", fa: "FAB پشتیبانی" },
            brief: { en: "Style the .fab button inline with: position: fixed; bottom: 24px; right: 24px; z-index: 50; width: 56px; height: 56px; border-radius: 50%; border: 0; background-color: #0d9488; color: white; font-size: 22px. Keep text 💬 and aria-label.", fa: "دکمه .fab رو درون‌خطی استایل بده: position: fixed; bottom: 24px; right: 24px; z-index: 50; width: 56px; height: 56px; border-radius: 50%; border: 0; background-color: #0d9488; color: white; font-size: 22px. متن 💬 و aria-label بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Support FAB</title>\n</head>\n<body>\n  <h1>Dashboard</h1>\n  <!-- TODO: the full FAB recipe -->\n  <button class="fab" aria-label="Open support chat">💬</button>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Support FAB</title>\n</head>\n<body>\n  <h1>Dashboard</h1>\n  <button class="fab" aria-label="Open support chat" style="position: fixed; bottom: 24px; right: 24px; z-index: 50; width: 56px; height: 56px; border-radius: 50%; border: 0; background-color: #0d9488; color: white; font-size: 22px;">💬</button>\n</body>\n</html>`,
            hints: [
              { en: "Eleven declarations — work through the brief value by value.", fa: "یازده تعریف — بریف رو مقدار به مقدار پیش برو." },
              { en: "z-index: 50 and position: fixed always travel together here.", fa: "‏z-index: 50 و position: fixed اینجا همیشه با هم میان." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "button.fab", text: "💬" },
                { selector: "button.fab", attrName: "aria-label", attrValue: "Open support chat" },
                { selector: "button.fab", styleIncludes: "position: fixed" },
                { selector: "button.fab", styleIncludes: "z-index: 50" },
                { selector: "button.fab", styleIncludes: "border-radius: 50%" },
                { selector: "button.fab", styleIncludes: "background-color: #0d9488" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m9",
    title: { en: "Transitions & Transform", fa: "ترنزیشن و ترنسفورم" },
    blurb: {
      en: "Motion that feels alive: smooth state changes, scaling, rotation, movement.",
      fa: "حرکتی که زنده‌ست: تغییر حالت‌های نرم، بزرگ‌نمایی، چرخش و جابه‌جایی.",
    },
    lessons: [
      {
        id: "css-m9-l1",
        title: { en: "transition: The Smooth Layer", fa: "transition: لایه نرمی" },
        goal: { en: "Turn instant jumps into buttery state changes.", fa: "پرش‌های ناگهانی رو به تغییرات لطیف تبدیل کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Without `transition`, style changes SNAP — hover flips color in 0ms. `transition: background-color 0.3s;` tells the browser: \"when background-color changes, take 0.3 seconds to get there\". The browser tweens every intermediate frame. Free animation, one line.", fa: "بدون `transition` تغییر استایل‌ها SNAP می‌کنه — هاور در صفر میلی‌ثانیه می‌پره. ‏`transition: background-color 0.3s;` به مرورگر می‌گه: «وقتی background-color عوض شد، ۰٫۳ ثانیه وقت بذار بری». مرورگر همه فریم‌های میانی رو می‌سازه. انیمیشن مجانی، با یک خط." },
              { type: "code", lang: "css", runnable: false, code: `.btn {\n  background-color: teal;\n  transition: background-color 0.3s;\n}\n.btn:hover { background-color: darkcyan; }` },
              { type: "tip", en: "`transition: all 0.3s;` animates everything — handy, but can cause weird multi-property motion. Prefer naming properties.", fa: "‏`transition: all 0.3s;` همه‌چیز رو انیمیت می‌کنه — به‌دردبخور ولی ممکنه حرکت‌های عجیب بسازه. بهتره اسم پراپرتی بیاری." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The full syntax: `transition: <property> <duration> <easing> <delay>;` — easing shapes the speed curve. `ease` (default, gentle), `linear` (robotic), `ease-out` (fast start, soft landing — the UI favorite), `ease-in` (slow start, fast exit).", fa: "سینتکس کامل: ‏`transition: <property> <duration> <easing> <delay>;` — ‏easing شکل منحنی سرعته. ‏`ease` (پیش‌فرض، ملایم)، ‏`linear` (روباتیک)، ‏`ease-out` (شروع تند، فرود نرم — محبوب UI)، ‏`ease-in` (شروع کند، خروج تند)." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .pill {\n      padding: 12px 22px;\n      border-radius: 999px;\n      background-color: #0f172a;\n      color: #e2e8f0;\n      transition: background-color 0.35s ease-out, transform 0.35s ease-out;\n    }\n    .pill:hover {\n      background-color: teal;\n      transform: translateY(-3px);\n    }\n  </style>\n</head>\n<body>\n  <button class="pill">Hover — I melt, not snap ✨</button>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "transition: background-color 0.3s makes…", fa: "‏transition: background-color 0.3s باعث می‌شه…" },
                options: [
                  { en: "The page load slower", fa: "لود صفحه کند شه" },
                  { en: "Background changes animate over 0.3s", fa: "تغییر بک‌گراند طی ۰٫۳ ثانیه انیمیت شه" },
                  { en: "Background blinks forever", fa: "بک‌گراند همیشه چشمک بزنه" },
                  { en: "Hover stop working", fa: "هاور کار نکنه" },
                ],
                answer: 1,
                explain: { en: "Transition = tween between old and new value over the duration.", fa: "‏transition = میان‌یابی بین مقدار قدیم و جدید در طول مدت." },
              },
              {
                q: { en: "Which easing feels best for UI micro-interactions?", fa: "کدوم easing برای میکروتعامل‌های UI بهتر حس می‌شه؟" },
                options: [
                  { en: "linear", fa: "linear" },
                  { en: "ease-out", fa: "ease-out" },
                  { en: "steps(10)", fa: "steps(10)" },
                  { en: "ease-in-out-in", fa: "ease-in-out-in" },
                ],
                answer: 1,
                explain: { en: "ease-out responds fast, lands soft — fingers love it.", fa: "‏ease-out سریع جواب می‌ده و نرم فرود میاد — دست‌ها عاشقشن." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Smooth Pill", fa: "قرص نرم" },
            brief: { en: "Give the .pill button inline style transition: background-color 0.3s ease-out; padding: 12px 22px; border-radius: 999px; background-color: teal; color: white; border: 0. Keep its text.", fa: "به دکمه .pill استایل درون‌خطی transition: background-color 0.3s ease-out; padding: 12px 22px; border-radius: 999px; background-color: teal; color: white; border: 0 بده. متنش بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Smooth pill</title>\n</head>\n<body>\n  <!-- TODO: the six-declaration recipe -->\n  <button class="pill">Subscribe</button>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Smooth pill</title>\n</head>\n<body>\n  <button class="pill" style="transition: background-color 0.3s ease-out; padding: 12px 22px; border-radius: 999px; background-color: teal; color: white; border: 0;">Subscribe</button>\n</body>\n</html>`,
            hints: [
              { en: "Six declarations, first one is the transition.", fa: "شش تعریف، اولی transition هست." },
              { en: "Exact transition value: background-color 0.3s ease-out.", fa: "مقدار دقیق transition: ‏background-color 0.3s ease-out." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "button.pill", text: "Subscribe" },
                { selector: "button.pill", styleIncludes: "transition: background-color 0.3s ease-out" },
                { selector: "button.pill", styleIncludes: "border-radius: 999px" },
                { selector: "button.pill", styleIncludes: "background-color: teal" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m9-l2",
        title: { en: "transform: scale, rotate, translate", fa: "transform: scale، rotate، translate" },
        goal: { en: "Reshape and move elements without touching the layout flow.", fa: "عناصر رو بدون به‌هم‌زدن چیدمان تغییر شکل بده و جابه‌جا کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**transform** reshapes visually WITHOUT disturbing the layout: `scale(1.1)` grows 10% (neighbors don't move), `rotate(45deg)` spins, `translate(10px, -4px)` slides. Unlike width/height changes, transforms are GPU-accelerated — the smooth path for hover effects.", fa: "**transform** ظاهر رو عوض می‌کنه بدون این‌که چیدمان رو disturb کنه: ‏`scale(1.1)` ده درصد بزرگ می‌کنه (همسایه‌ها تکان نمی‌خورن)، ‏`rotate(45deg)` می‌چرخونه، ‏`translate(10px, -4px)` می‌سونه. برخلاف width/height، ترنسفورم‌ها GPU-accelerated هستن — مسیر نرم برای هاور." },
              { type: "code", lang: "css", runnable: false, code: `.avatar:hover { transform: scale(1.08); }\n.stamp   { transform: rotate(-12deg); }\n.toast   { transform: translate(0, -8px); }` },
              { type: "warn", en: "rotate() also rotates the text inside — rotate the CONTAINER, not the words you want readable.", fa: "‏rotate() متن داخل رو هم می‌چرخونه — کانتینر رو بچرخون، نه کلمه‌هایی که باید خونده شن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .trio { display: flex; gap: 24px; justify-content: center; margin-top: 40px; }\n    .chip {\n      padding: 22px 18px;\n      background-color: #ede9fe;\n      border-radius: 12px;\n      transition: transform 0.3s ease-out;\n    }\n    .chip.s:hover { transform: scale(1.15); }\n    .chip.r { transform: rotate(-8deg); }\n    .chip.t:hover { transform: translateY(-10px); }\n  </style>\n</head>\n<body>\n  <div class="trio">\n    <div class="chip s">scale</div>\n    <div class="chip r">rotate</div>\n    <div class="chip t">translate</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Combine transforms in ONE declaration: `transform: scale(1.1) rotate(-3deg);` — right-to-left application, but visually: both at once. Chaining in separate declarations overrides — last one wins.", fa: "ترنسفورم‌ها رو تو یک تعریف ترکیب کن: ‏`transform: scale(1.1) rotate(-3deg);` — هر دو همزمان اعمال می‌شن. تعریف جدا جدا آخرین رو override می‌کنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "scale(1.2) makes an element 20% bigger and…", fa: "‏scale(1.2) عنصر رو ۲۰٪ بزرگ‌تر می‌کنه و…" },
                options: [
                  { en: "Pushes neighbors away", fa: "همسایه‌ها رو هل می‌ده" },
                  { en: "Leaves the layout untouched", fa: "چیدمان دست‌نخورده می‌مونه" },
                  { en: "Breaks the grid", fa: "گرید رو می‌شکنه" },
                  { en: "Doubles the padding", fa: "پدینگ رو دو برابر می‌کنه" },
                ],
                answer: 1,
                explain: { en: "Transform is visual-only — layout stays frozen. That's why it's smooth.", fa: "‏transform فقط بصریه — چیدمان فریز می‌مونه. برای همین نرمه." },
              },
              {
                q: { en: "Slide an element 8px up on hover:", fa: "عنصر رو موقع هاور ۸px ببر بالا:" },
                options: [
                  { en: "transform: translateY(-8px);", fa: "transform: translateY(-8px);" },
                  { en: "transform: move(-8px);", fa: "transform: move(-8px);" },
                  { en: "top: -8px always", fa: "همیشه top: -8px" },
                  { en: "transform: up(8);", fa: "transform: up(8);" },
                ],
                answer: 0,
                explain: { en: "Negative Y = up. translate doesn't disturb the flow.", fa: "‏Y منفی = بالا. ‏translate جریان رو به‌هم نمی‌زنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Pop on Hover", fa: "پرش موقع هاور" },
            brief: { en: "Give .logo-card inline style transform: rotate(-4deg); background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 14px; padding: 22px 30px; font-size: 22px. Keep text.", fa: "به .logo-card استایل درون‌خطی transform: rotate(-4deg); background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 14px; padding: 22px 30px; font-size: 22px بده. متن بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Stamp</title>\n</head>\n<body style="display: flex; justify-content: center; margin-top: 60px;">\n  <!-- TODO: the six-declaration stamp recipe -->\n  <div class="logo-card">TEKA ✦</div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Stamp</title>\n</head>\n<body style="display: flex; justify-content: center; margin-top: 60px;">\n  <div class="logo-card" style="transform: rotate(-4deg); background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 14px; padding: 22px 30px; font-size: 22px;">TEKA ✦</div>\n</body>\n</html>`,
            hints: [
              { en: "First declaration: transform: rotate(-4deg);", fa: "اولین تعریف: ‏transform: rotate(-4deg);‏" },
              { en: "Colors: background #fef3c7, border 1px solid #fcd34d.", fa: "رنگ‌ها: پس‌زمینه ‏#fef3c7 و بوردر ‏1px solid #fcd34d." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".logo-card", text: "TEKA" },
                { selector: ".logo-card", styleIncludes: "transform: rotate(-4deg)" },
                { selector: ".logo-card", styleIncludes: "background-color: #fef3c7" },
                { selector: ".logo-card", styleIncludes: "border: 1px solid #fcd34d" },
                { selector: ".logo-card", styleIncludes: "padding: 22px 30px" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m9-l3",
        title: { en: "Hover Choreography", fa: "رقص هاور" },
        goal: { en: "Pair transitions with transforms for the professional hover feel.", fa: "‏transition و transform رو جفت کن تا حس حرفه‌ای هاور به دست بیاد." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The pro hover formula: **transition on the base state** + **transform on the hover state**. `.card { transition: transform .25s ease-out, box-shadow .25s ease-out; } .card:hover { transform: translateY(-6px); box-shadow: … }`. The card lifts and gains a shadow in one fluid motion — depth + response.", fa: "فرمول حرفه‌ای هاور: **transition روی حالت پایه** + **transform روی حالت هاور**. ‏`.card { transition: transform .25s ease-out, box-shadow .25s ease-out; } .card:hover { transform: translateY(-6px); box-shadow: … }`. کارت بلند می‌شه و سایه می‌گیره در یک حرکت روان — عمق + پاسخ." },
              { type: "code", lang: "css", runnable: false, code: `.card {\n  transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;\n}\n.card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 12px 28px rgba(2, 8, 23, 0.18);\n}` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .card {\n      width: 200px;\n      padding: 20px;\n      background-color: white;\n      border: 1px solid #e2e8f0;\n      border-radius: 14px;\n      transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;\n    }\n    .card:hover {\n      transform: translateY(-6px);\n      box-shadow: 0 12px 28px rgba(2, 8, 23, 0.18);\n    }\n  </style>\n</head>\n<body style="background:#f8fafc; margin:0; padding: 40px;">\n  <div class="card">\n    <h3 style="margin:0 0 6px">Lift me</h3>\n    <p style="margin:0; color: #64748b">Hover = float + shadow.</p>\n  </div>\n</body>\n</html>` },
              { type: "tip", en: "Restraint: 2–6px of lift and a soft shadow. If a hover effect makes you notice IT instead of the content, it's too much.", fa: "خویشتن‌داری: ‏۲ تا ۶ پیکسل بلندشدن و سایه نرم. اگه افکت هاور به‌جای محتوا خودش رو نشون بده، زیادیه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Where does the transition property live?", fa: "پراپرتی transition کجا زندگی می‌کنه؟" },
                options: [
                  { en: "On the :hover rule", fa: "روی قانون :hover" },
                  { en: "On the base state, so both directions animate", fa: "روی حالت پایه، تا هر دو جهت انیمیت شن" },
                  { en: "On the <body>", fa: "روی <body>" },
                  { en: "Nowhere — it's a myth", fa: "هیچ‌جا — افسانه‌ست" },
                ],
                answer: 1,
                explain: { en: "Base-state transition animates hover-in AND hover-out smoothly.", fa: "‏transition روی حالت پایه، هم ورود و هم خروج هاور رو نرم می‌کنه." },
              },
              {
                q: { en: "Lift + shadow together read as…", fa: "بلندشدن + سایه با هم حس … می‌دن." },
                options: [
                  { en: "An error", fa: "خطا" },
                  { en: "Depth — the card is above the page", fa: "عمق — کارت بالای صفحه‌ست" },
                  { en: "A broken image", fa: "عکس خراب" },
                  { en: "Dark mode", fa: "دارک مود" },
                ],
                answer: 1,
                explain: { en: "Elevation cues (lift + shadow) are how 2D screens fake physics.", fa: "نشانه‌های ارتفاع (بلندشدن + سایه) همون‌طوره که صفحه دوبعدی فیزیک رو تقلید می‌کنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Lifting Card", fa: "کارت پرنده" },
            brief: { en: "Give .lift inline style transition: transform 0.25s ease-out; width: 220px; padding: 20px; background-color: white; border: 1px solid #e2e8f0; border-radius: 14px. Keep its heading and note.", fa: "به .lift استایل درون‌خطی transition: transform 0.25s ease-out; width: 220px; padding: 20px; background-color: white; border: 1px solid #e2e8f0; border-radius: 14px بده. تیتر و یادداشتش بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .lift:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(2,8,23,0.18); }\n  </style>\n</head>\n<body style="background:#f8fafc; margin:0; padding:40px;">\n  <!-- TODO: the six-declaration base recipe -->\n  <div class="lift">\n    <h3 style="margin:0 0 6px">Hover lift</h3>\n    <p style="margin:0; color:#64748b">Float + shadow, one motion.</p>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .lift:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(2,8,23,0.18); }\n  </style>\n</head>\n<body style="background:#f8fafc; margin:0; padding:40px;">\n  <div class="lift" style="transition: transform 0.25s ease-out; width: 220px; padding: 20px; background-color: white; border: 1px solid #e2e8f0; border-radius: 14px;">\n    <h3 style="margin:0 0 6px">Hover lift</h3>\n    <p style="margin:0; color:#64748b">Float + shadow, one motion.</p>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "The <style> hover rule already exists — your job is the base state.", fa: "قانون hover توی <style> هست — کار تو حالت پایه‌ست." },
              { en: "Six declarations, transition first.", fa: "شش تعریف، اولی transition." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".lift", styleIncludes: "transition: transform 0.25s ease-out" },
                { selector: ".lift", styleIncludes: "width: 220px" },
                { selector: ".lift", styleIncludes: "border-radius: 14px" },
                { selector: ".lift", text: "Hover lift" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m9-l4",
        title: { en: "MINI-PROJECT: Flip Cards", fa: "پروژه کوچک: کارت‌های شیک" },
        goal: { en: "Ship a trio of interactive cards with lift, glow and scale.", fa: "سه کارت تعاملی با بلندشدن، درخشش و بزرگ‌نمایی تحویل بده." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Final motion lab: three feature cards, each with `transition: transform .25s, box-shadow .25s` on base and a **different** hover recipe — one lifts, one scales, one glows its border via box-shadow color. Variety shows you understand the ingredients, not just one recipe.", fa: "آزمایشگاه نهایی حرکت: سه کارت ویژگی، هر کدوم با ‏`transition: transform .25s, box-shadow .25s` روی پایه و یه دستور هاور **متفاوت** — یکی بلند می‌شه، یکی scale می‌شه، یکی بوردرش با رنگ box-shadow می‌درخشه. تنوع نشون می‌ده موادّو می‌شناسی، نه فقط یه دستور." },
              { type: "code", lang: "css", runnable: false, code: `.c-lift:hover  { transform: translateY(-6px); }\n.c-grow:hover  { transform: scale(1.05); }\n.c-glow:hover  { box-shadow: 0 0 0 3px rgba(20,184,166,0.35); }` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Performance note: transform and opacity are the \"cheap\" animated properties (GPU-composited). Animating width/top/margin forces layout recalculation every frame — jank city. When in doubt: transform + opacity, nothing else.", fa: "نکته پرفورمنس: ‏transform و opacity پراپرتی‌های «ارزون» انیمیشن هستن (GPU-composited). انیمیت width/top/margin هر فریم چیدمان رو دوباره حساب می‌کنه — شهر کنده‌کاری. شک داشتی: فقط transform + opacity." },
              { type: "tip", en: "Keep durations 150–300ms. Below 100ms feels broken, above 400ms feels laggy.", fa: "مدت‌ها رو ۱۵۰ تا ۳۰۰ میلی‌ثانیه نگه دار. زیر ۱۰۰ حس خرابی می‌ده، بالای ۴۰۰ حس کندی." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "The GPU-friendly animation properties are…", fa: "پراپرتی‌های انیمیشن دوست‌دار GPU هستن…" },
                options: [
                  { en: "width and height", fa: "width و height" },
                  { en: "transform and opacity", fa: "transform و opacity" },
                  { en: "margin and padding", fa: "margin و padding" },
                  { en: "top and left", fa: "top و left" },
                ],
                answer: 1,
                explain: { en: "transform/opacity skip layout recalculation — buttery 60fps.", fa: "‏transform/opacity از محاسبه مجدد چیدمان رد می‌شن — ‏۶۰fps لطیف." },
              },
              {
                q: { en: "A good transition duration for hover is…", fa: "مدت خوب transition برای هاور…" },
                options: [
                  { en: "20ms", fa: "۲۰ms" },
                  { en: "250ms", fa: "۲۵۰ms" },
                  { en: "2s", fa: "۲s" },
                  { en: "0s", fa: "۰s" },
                ],
                answer: 1,
                explain: { en: "150–300ms is the sweet spot — felt but not waited for.", fa: "۱۵۰ تا ۳۰۰ms نقطه طلاییه — حس می‌شه ولی منتظرش نمی‌مونی." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Motion Trio", fa: "سه‌گانه حرکت" },
            brief: { en: "Give EACH .card inline transition: transform 0.25s ease-out; box-shadow 0.25s ease-out; flex: 1; padding: 22px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; text-align: center. Keep texts and <style> hover rules.", fa: "به هر .card استایل درون‌خطی transition: transform 0.25s ease-out; box-shadow 0.25s ease-out; flex: 1; padding: 22px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; text-align: center بده. متن‌ها و قوانین hover توی <style> بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .row { display: flex; gap: 16px; padding: 8px; }\n    .c-lift:hover { transform: translateY(-6px); }\n    .c-grow:hover { transform: scale(1.05); }\n    .c-glow:hover { box-shadow: 0 0 0 3px rgba(20,184,166,0.35); }\n  </style>\n</head>\n<body>\n  <div class="row">\n    <!-- TODO: the recipe on each card -->\n    <div class="card c-lift">Lift 🛗</div>\n    <div class="card c-grow">Grow 🔍</div>\n    <div class="card c-glow">Glow ✨</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .row { display: flex; gap: 16px; padding: 8px; }\n    .c-lift:hover { transform: translateY(-6px); }\n    .c-grow:hover { transform: scale(1.05); }\n    .c-glow:hover { box-shadow: 0 0 0 3px rgba(20,184,166,0.35); }\n  </style>\n</head>\n<body>\n  <div class="row">\n    <div class="card c-lift" style="transition: transform 0.25s ease-out; box-shadow 0.25s ease-out; flex: 1; padding: 22px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; text-align: center;">Lift 🛗</div>\n    <div class="card c-grow" style="transition: transform 0.25s ease-out; box-shadow 0.25s ease-out; flex: 1; padding: 22px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; text-align: center;">Grow 🔍</div>\n    <div class="card c-glow" style="transition: transform 0.25s ease-out; box-shadow 0.25s ease-out; flex: 1; padding: 22px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; text-align: center;">Glow ✨</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Same eight declarations on all three — only the extra class differs.", fa: "همون هشت تعریف روی هر سه — فقط کلاس اضافه فرق داره." },
              { en: "Two transitions in one value, comma-separated.", fa: "دو تا transition تو یک مقدار، با ویرگول." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".card", count: 3 },
                { selector: ".card", styleIncludes: "transition: transform 0.25s ease-out", count: 3 },
                { selector: ".card", styleIncludes: "flex: 1", count: 3 },
                { selector: ".card.c-glow", text: "Glow" },
                { selector: "style" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m10",
    title: { en: "Responsive Design", fa: "طراحی ریسپانسیو" },
    blurb: {
      en: "One page, every screen: media queries, mobile-first thinking, fluid units.",
      fa: "یک صفحه، هر صفحه‌نمایشی: مدیا کوئری، تفکر موبایل-اول و واحدهای سیال.",
    },
    lessons: [
      {
        id: "css-m10-l1",
        title: { en: "Media Queries", fa: "مدیا کوئری‌ها" },
        goal: { en: "Change styles based on screen size.", fa: "استایل‌ها رو بر اساس اندازه صفحه عوض کن." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A **media query** applies styles only when a condition matches: `@media (max-width: 600px) { … }` = \"on screens 600px wide or narrower\". Inside the braces go normal CSS rules that override the desktop versions. Two ingredients make it work: the query itself AND `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` in your head — without the meta tag, phones fake a 980px desktop and your queries never fire.", fa: "**مدیا کوئری** استایل‌ها رو فقط وقتی شرط برقراره اعمال می‌کنه: ‏`@media (max-width: 600px) { … }` یعنی «روی صفحه‌های ۶۰۰ پیکسل یا باریک‌تر». داخل آکولاد، قوانین عادی CSS میاد که نسخه دسکتاپ رو override می‌کنه. دو تا مواد لازمه: خود کوئری و `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` توی head — بدون متا، موبایل‌ها خودشون رو ۹۸۰ پیکسلی دسکتاپ جا می‌زنن و کوئری‌هات هیچ‌وقت آتیش نمی‌گیرن." },
              { type: "code", lang: "css", runnable: false, code: `@media (max-width: 600px) {\n  .cards { flex-direction: column; }\n  h1 { font-size: 28px; }\n}` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Common breakpoints: 600px (phones), 900px (tablets), 1200px (desktops). You don't need many — two or three breakpoints + fluid layouts (flex-wrap, percentages) cover almost everything. The magic combo from earlier lessons — `width: 100%; max-width: 600px;` — already responds without ANY query.", fa: "بریک‌پوینت‌های رایج: ۶۰۰px (موبایل)، ۹۰۰px (تبلت)، ۱۲۰۰px (دسکتاپ). زیاد لازم نیست — دو سه بریک‌پوینت + لایوت‌های سیال (flex-wrap، درصد) تقریباً همه‌چیز رو پوشش می‌ده. ترکیب جادویی درس‌های قبل — ‏`width: 100%; max-width: 600px;` — بدون هیچ کوئری‌ای خودش جواب می‌ده." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    .duo { display: flex; gap: 12px; }\n    .pane { flex: 1; padding: 18px; background-color: #ede9fe; border-radius: 10px; }\n    @media (max-width: 600px) {\n      .duo { flex-direction: column; }\n    }\n  </style>\n</head>\n<body>\n  <div class="duo">\n    <div class="pane">Narrow me — I stack!</div>\n    <div class="pane">Me too.</div>\n  </div>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "@media (max-width: 600px) applies when…", fa: "‏@media (max-width: 600px) اعمال می‌شه وقتی…" },
                options: [
                  { en: "Screen is exactly 600px", fa: "صفحه دقیقاً ۶۰۰px باشه" },
                  { en: "Screen is 600px or narrower", fa: "صفحه ۶۰۰px یا باریک‌تر باشه" },
                  { en: "Screen is wider than 600px", fa: "صفحه عریض‌تر از ۶۰۰px باشه" },
                  { en: "Never", fa: "هرگز" },
                ],
                answer: 1,
                explain: { en: "max-width = \"up to and including\". min-width = \"this size and up\".", fa: "‏max-width = «تا این اندازه». ‏min-width = «از این اندازه به بالا»." },
              },
              {
                q: { en: "Which tag makes media queries work on real phones?", fa: "کدوم تگ مدیا کوئری‌ها رو روی موبایل واقعی فعال می‌کنه؟" },
                options: [
                  { en: "<title>", fa: "<title>" },
                  { en: "<meta name=\"viewport\" …>", fa: "<meta name=\"viewport\" …>" },
                  { en: "<link rel=\"viewport\">", fa: "<link rel=\"viewport\">" },
                  { en: "No tag needed", fa: "تگی لازم نیست" },
                ],
                answer: 1,
                explain: { en: "The viewport meta tells phones to report their real width.", fa: "متای viewport به موبایل‌ها می‌گه عرض واقعی‌شون رو گزارش بدن." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Stack on Phones", fa: "روی موبایل بشکن" },
            brief: { en: "Make the page mobile-ready: add the viewport meta to <head>, and inside the existing <style> block add a media query for max-width: 600px that sets .duo's flex-direction: column. Keep the .duo base styles.", fa: "صفحه رو موبایل-آماده کن: متای viewport رو به <head> اضافه کن و داخل بلاک <style> یک مدیا کوئری برای max-width: 600px بذار که flex-direction: column رو روی .duo ست کنه. استایل‌های پایه .duo بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <!-- TODO: viewport meta -->\n  <style>\n    .duo { display: flex; gap: 12px; }\n    .pane { flex: 1; padding: 18px; background-color: #ede9fe; border-radius: 10px; }\n    /* TODO: media query max-width: 600px → .duo column */\n  </style>\n</head>\n<body>\n  <div class="duo">\n    <div class="pane">Photos</div>\n    <div class="pane">Stories</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    .duo { display: flex; gap: 12px; }\n    .pane { flex: 1; padding: 18px; background-color: #ede9fe; border-radius: 10px; }\n    @media (max-width: 600px) {\n      .duo { flex-direction: column; }\n    }\n  </style>\n</head>\n<body>\n  <div class="duo">\n    <div class="pane">Photos</div>\n    <div class="pane">Stories</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Meta goes right after charset: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">.", fa: "متا درست بعد از charset: ‏<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">‏." },
              { en: "The query wraps the rule: @media (max-width: 600px) { .duo { flex-direction: column; } }", fa: "کوئری قانون رو می‌پیچه: ‏@media (max-width: 600px) { .duo { flex-direction: column; } }‏" },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "meta[name='viewport']" },
                { selector: "style" },
                { selector: ".duo", count: 1 },
                { selector: ".pane", count: 2 },
                { selector: ".pane", text: "Photos" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m10-l2",
        title: { en: "Mobile-First Workflow", fa: "روش موبایل-اول" },
        goal: { en: "Think small first — the strategy behind every modern responsive site.", fa: "اول کوچیک فکر کن — استراتژی پشت هر سایت ریسپانسیو مدرن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Mobile-first** means: write styles for the PHONE first (simple, single column), then use `@media (min-width: 900px)` to ADD complexity for big screens. The opposite (desktop-first with max-width) means constantly REMOVING things — like carving a statue by breaking marble off. Building up is easier than cutting down.", fa: "**موبایل-اول** یعنی: اول استایل برای موبایل بنویس (ساده، تک‌ستونه)، بعد با ‏`@media (min-width: 900px)` پیچیدگی رو برای صفحه بزرگ اضافه کن. برعکسش (دسکتاپ-اول با max-width) یعنی مدام داریم چیزها رو *حذف* می‌کنیم — مثل مجسمه‌سازی با شکستن سنگ. از پایین ساختن از بالا بریدن راحت‌تره." },
              { type: "code", lang: "css", runnable: false, code: `/* Mobile = base */\n.feed { display: flex; flex-direction: column; gap: 12px; }\n\n/* Grow on desktop */\n@media (min-width: 900px) {\n  .feed { flex-direction: row; }\n}` },
              { type: "tip", en: "min-width queries read like sentences: \"from 900px and UP, become a row\".", fa: "کوئری‌های min-width مثل جمله می‌خونن: «از ۹۰۰px به بالا، سطر شو»." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Why it wins: most real traffic is mobile; constraints (small screen) force simpler defaults; and performance-friendly CSS loads only what phones need. Google also indexes mobile-first — your phone view IS your SEO view.", fa: "چرا می‌بره: بیشتر ترافیک واقعی موبایله؛ محدودیت‌ها (صفحه کوچیک) پیش‌فرض‌های ساده می‌سازن؛ و CSS فقط چیزی که موبایل لازم داره رو لود می‌کنه. گوگل هم موبایل-اول ایندکس می‌کنه — نمای موبایل همون نمای سئوته." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    .stats { display: flex; flex-direction: column; gap: 10px; }\n    .stat { padding: 14px; background-color: #ecfeff; border-radius: 10px; }\n    @media (min-width: 900px) {\n      .stats { flex-direction: row; }\n      .stat { flex: 1; text-align: center; }\n    }\n  </style>\n</head>\n<body>\n  <div class="stats">\n    <div class="stat">⚡ 200 lessons</div>\n    <div class="stat">🎓 4 paths</div>\n    <div class="stat">🏆 Free</div>\n  </div>\n</body>\n</html>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Mobile-first base styles describe…", fa: "استایل‌های پایه موبایل-اول توصیف می‌کنن…" },
                options: [
                  { en: "The desktop", fa: "دسکتاپ" },
                  { en: "The smallest screen, growing up", fa: "کوچک‌ترین صفحه، با رشد به بالا" },
                  { en: "Print only", fa: "فقط چاپ" },
                  { en: "Nothing — deprecated", fa: "هیچی — منسوخ" },
                ],
                answer: 1,
                explain: { en: "Base = phone. min-width queries add complexity upward.", fa: "پایه = موبایل. کوئری‌های min-width پیچیدگی رو به بالا اضافه می‌کنن." },
              },
              {
                q: { en: "@media (min-width: 900px) fires…", fa: "‏@media (min-width: 900px) فعال می‌شه…" },
                options: [
                  { en: "Only on exactly 900px", fa: "فقط دقیقاً روی ۹۰۰px" },
                  { en: "At 900px and wider", fa: "روی ۹۰۰px و عریض‌تر" },
                  { en: "Below 900px", fa: "زیر ۹۰۰px" },
                  { en: "On phones only", fa: "فقط موبایل" },
                ],
                answer: 1,
                explain: { en: "min-width = \"this size and up\".", fa: "‏min-width = «این اندازه و بالاتر»." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Mobile-First Stats", fa: "آمار موبایل-اول" },
            brief: { en: "In the <style> block: keep the column base of .stats, then add @media (min-width: 900px) making .stats a row (flex-direction: row) and each .stat flex: 1. Keep the viewport meta and texts.", fa: "داخل بلاک <style>: پایه ستونی .stats رو نگه دار، بعد ‏@media (min-width: 900px) اضافه کن که .stats سطر بشه (flex-direction: row) و هر .stat ‏flex: 1 بگیره. متای viewport و متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    .stats { display: flex; flex-direction: column; gap: 10px; }\n    .stat { padding: 14px; background-color: #ecfeff; border-radius: 10px; }\n    /* TODO: min-width: 900px → row + flex: 1 */\n  </style>\n</head>\n<body>\n  <div class="stats">\n    <div class="stat">⚡ 200 lessons</div>\n    <div class="stat">🎓 4 paths</div>\n    <div class="stat">🏆 Free</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    .stats { display: flex; flex-direction: column; gap: 10px; }\n    .stat { padding: 14px; background-color: #ecfeff; border-radius: 10px; }\n    @media (min-width: 900px) {\n      .stats { flex-direction: row; }\n      .stat { flex: 1; }\n    }\n  </style>\n</head>\n<body>\n  <div class="stats">\n    <div class="stat">⚡ 200 lessons</div>\n    <div class="stat">🎓 4 paths</div>\n    <div class="stat">🏆 Free</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Two rules inside the query: .stats row, .stat flex: 1.", fa: "دو قانون داخل کوئری: ‏.stats سطر، ‏.stat ‏flex: 1." },
              { en: "min-width: 900px — not max-width. Direction matters!", fa: "‏min-width: 900px — نه max-width. جهت مهمه!" },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "meta[name='viewport']" },
                { selector: ".stat", count: 3 },
                { selector: ".stat", text: "⚡ 200 lessons" },
                { selector: "style" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m10-l3",
        title: { en: "Fluid Units: rem, %, clamp()", fa: "واحدهای سیال: rem، درصد، clamp()" },
        goal: { en: "Replace fixed pixels with units that breathe with the screen.", fa: "پیکسل ثابت رو با واحدهایی عوض کن که با صفحه نفس می‌کشن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Units cheat-sheet**: `px` fixed. `%` relative to parent. `rem` relative to root font (1rem = 16px default) — scales with user settings. `vw`/`vh` = 1% of viewport width/height. Fluid typography: `font-size: clamp(18px, 3vw, 36px)` = never below 18, never above 36, 3% of viewport between. One line, three behaviors.", fa: "**برگه تقلب واحد‌ها**: ‏`px` ثابت. ‏`%` نسبت به والد. ‏`rem` نسبت به فونت ریشه (۱rem = ۱۶px پیش‌فرض) — با تنظیمات کاربر مقیاس می‌شه. ‏`vw`/`vh` = یک درصد عرض/ارتفاع viewport. تایپوگرافی سیال: ‏`font-size: clamp(18px, 3vw, 36px)` یعنی هیچ‌وقت زیر ۱۸، بالای ۳۶ نه، بین‌شون ۳٪ عرض صفحه. یک خط، سه رفتار." },
              { type: "code", lang: "css", runnable: false, code: `h1    { font-size: clamp(28px, 5vw, 56px); }\n.card { width: min(100%, 420px); }  /* fluid, capped */\np     { max-width: 60ch; }          /* readable line length */` },
              { type: "tip", en: "60ch (≈60 characters) is the scientifically comfy line length for paragraphs. Try it — instant typographic maturity.", fa: "‏۶۰ch (حدود ۶۰ کاراکتر) طول خط علمی-راحت برای پاراگرافه. امتحان کن — فوراً تایپوگرافیت بالغ می‌شه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    h1 { font-size: clamp(28px, 6vw, 60px); }\n    .wrap { width: min(100%, 480px); margin: 0 auto; }\n    p { max-width: 60ch; line-height: 1.7; color: #475569; }\n  </style>\n</head>\n<body>\n  <div class="wrap">\n    <h1>Fluid Title</h1>\n    <p>Resize the preview — my heading breathes between 28 and 60 pixels, my width caps at 480, and my lines stay 60ch. No media query touched me.</p>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The best responsive CSS is CSS that doesn't NEED media queries. Fluid units handle the in-between sizes where fixed breakpoints look awkward — 700px laptops, foldables, zoomed browsers.", fa: "بهترین CSS ریسپانسیو اونیه که به مدیا کوئری *نیاز* نداره. واحدهای سیال اندازه‌های بین‌بین رو هندل می‌کنن — جایی که بریک‌پوینت‌های ثابت عجیب به نظر میان: لپ‌تاپ ۷۰۰px، فولدبل‌ها، مرورگر زوم‌شده." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "1rem equals…", fa: "‏۱rem برابر است با…" },
                options: [
                  { en: "Always 10px", fa: "همیشه ۱۰px" },
                  { en: "The root font size (16px by default)", fa: "فونت ریشه (پیش‌فرض ۱۶px)" },
                  { en: "The parent's width", fa: "عرض والد" },
                  { en: "1% of viewport", fa: "۱٪ viewport" },
                ],
                answer: 1,
                explain: { en: "rem = root em. Change the root, everything scales.", fa: "‏rem = root em. ریشه رو عوض کن، همه‌چیز مقیاس می‌شه." },
              },
              {
                q: { en: "clamp(18px, 3vw, 36px) means…", fa: "‏clamp(18px, 3vw, 36px) یعنی…" },
                options: [
                  { en: "Exactly 3vw always", fa: "همیشه دقیقاً ۳vw" },
                  { en: "Fluid 3vw clamped between 18px and 36px", fa: "۳vw سیال محدود بین ۱۸ و ۳۶ پیکسل" },
                  { en: "Exactly 36px", fa: "دقیقاً ۳۶px" },
                  { en: "Invalid CSS", fa: "‏CSS نامعتبر" },
                ],
                answer: 1,
                explain: { en: "min, preferred, max — the three-argument fluid dial.", fa: "حداقل، ترجیحی، حداکثر — پیچ سیال سه‌آرگومانه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Fluid Hero", fa: "هیروی سیال" },
            brief: { en: "Give h1 inline style font-size: clamp(28px, 6vw, 60px); and the .wrap div inline style width: min(100%, 480px); margin: 0 auto;. Keep texts.", fa: "به h1 استایل درون‌خطی font-size: clamp(28px, 6vw, 60px); و به div کلاس wrap استایل درون‌خطی width: min(100%, 480px); margin: 0 auto; بده. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    p { line-height: 1.7; color: #475569; max-width: 60ch; }\n  </style>\n</head>\n<body>\n  <!-- TODO: width: min(100%, 480px); margin: 0 auto; -->\n  <div class="wrap">\n    <!-- TODO: font-size: clamp(28px, 6vw, 60px); -->\n    <h1>Fluid Hero</h1>\n    <p>I resize with the screen — no queries harmed.</p>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    p { line-height: 1.7; color: #475569; max-width: 60ch; }\n  </style>\n</head>\n<body>\n  <div class="wrap" style="width: min(100%, 480px); margin: 0 auto;">\n    <h1 style="font-size: clamp(28px, 6vw, 60px);">Fluid Hero</h1>\n    <p>I resize with the screen — no queries harmed.</p>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "clamp(min, preferred, max) — copy exactly: clamp(28px, 6vw, 60px).", fa: "‏clamp(min, preferred, max) — دقیق کپی کن: ‏clamp(28px, 6vw, 60px)." },
              { en: "min(100%, 480px) has a comma — don't miss it.", fa: "‏min(100%, 480px) ویرگول داره — جا ننداز." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", styleIncludes: "font-size: clamp(28px, 6vw, 60px)" },
                { selector: ".wrap", styleIncludes: "width: min(100%, 480px)" },
                { selector: ".wrap", styleIncludes: "margin: 0 auto" },
                { selector: ".wrap p", text: "I resize with the screen" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m10-l4",
        title: { en: "MINI-PROJECT: Responsive Blog Card", fa: "پروژه کوچک: کارت وبلاگ ریسپانسیو" },
        goal: { en: "A card that looks right on every width, using everything from this module.", fa: "کارتی که روی هر عرضی درست دیده می‌شه، با همه‌چیز این ماژول." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The responsive card checklist: viewport meta ✓, fluid width `width: min(100%, 420px)` ✓, centered with `margin: 0 auto` ✓, `box-sizing: border-box` ✓, readable text with line-height 1.7 ✓. Five lines of CSS — a card that survives 320px phones and 4K monitors alike.", fa: "چک‌لیست کارت ریسپانسیو: متای viewport ✓، عرض سیال ‏`width: min(100%, 420px)` ✓، وسط‌چین با `margin: 0 auto` ✓، ‏`box-sizing: border-box` ✓، متن خوانا با line-height 1.7 ✓. پنج خط CSS — کارتی که هم موبایل ۳۲۰px و هم مانیتور ۴K رو زنده می‌مونه." },
              { type: "code", lang: "css", runnable: false, code: `.post {\n  box-sizing: border-box;\n  width: min(100%, 420px);\n  margin: 16px auto;\n  padding: 20px;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n}` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Test protocol (do it every time): shrink the preview to ~320px — no horizontal scrollbar, text readable, nothing clipped. Then stretch wide — content capped, centered. If either fails, the guilty property is usually a fixed width or overflowing padding.", fa: "پروتکل تست (هر بار انجامش بده): پیش‌نمایش رو به ~۳۲۰px جمع کن — بدون اسکرول افقی، متن خوانا، هیچی بریده نشه. بعد بازش کن پهن — محتوا سقف‌دار و وسط‌چین. اگه یکی خراب شد، مقصر معمولاً عرض ثابت یا پدینگ سرریزکننده‌ست." },
              { type: "warn", en: "A page with a horizontal scrollbar on mobile is a broken page — 90% of the time it's an element wider than 100vw.", fa: "صفحه‌ای که روی موبایل اسکرول افقی داره، صفحه خرابه — ‏۹۰٪ مواقع یک عنصر عریض‌تر از ۱۰۰vw هست." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "width: min(100%, 420px) gives…", fa: "‏width: min(100%, 420px) می‌ده…" },
                options: [
                  { en: "Always 420px", fa: "همیشه ۴۲۰px" },
                  { en: "The smaller of full width and 420px", fa: "کوچک‌ترِ تمام‌عرض یا ۴۲۰px" },
                  { en: "Always 100%", fa: "همیشه ۱۰۰٪" },
                  { en: "420% of parent", fa: "۴۲۰٪ والد" },
                ],
                answer: 1,
                explain: { en: "min picks the smaller — fluid on phones, capped on desktops.", fa: "‏min کوچک‌تر رو انتخاب می‌کنه — سیال روی موبایل، سقف‌دار روی دسکتاپ." },
              },
              {
                q: { en: "First symptom of a broken responsive page?", fa: "اولین نشانه صفحه ریسپانسیو خراب؟" },
                options: [
                  { en: "Vertical scrollbar", fa: "اسکرول عمودی" },
                  { en: "Horizontal scrollbar on small screens", fa: "اسکرول افقی روی صفحه‌های کوچک" },
                  { en: "Slow fonts", fa: "فونت کند" },
                  { en: "Too many colors", fa: "رنگ زیاد" },
                ],
                answer: 1,
                explain: { en: "Horizontal scroll = something overflows = hunt the fixed width.", fa: "اسکرول افقی = چیزی سرریز شده = دنبال عرض ثابت بگرد." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Ship the Post Card", fa: "کارت پست را بفرست" },
            brief: { en: "Give .post inline style box-sizing: border-box; width: min(100%, 420px); margin: 16px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 14px. The page already has the viewport meta. Keep texts.", fa: "به .post استایل درون‌خطی box-sizing: border-box; width: min(100%, 420px); margin: 16px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 14px بده. صفحه متای viewport رو داره. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Blog</title>\n</head>\n<body style="margin:0; font-family: sans-serif;">\n  <!-- TODO: the six-declaration card recipe -->\n  <article class="post">\n    <h2 style="margin:0 0 8px">Fluid by design</h2>\n    <p style="margin:0; line-height: 1.7; color: #475569">This card flexes from phone to desktop with zero media queries.</p>\n  </article>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Blog</title>\n</head>\n<body style="margin:0; font-family: sans-serif;">\n  <article class="post" style="box-sizing: border-box; width: min(100%, 420px); margin: 16px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 14px;">\n    <h2 style="margin:0 0 8px">Fluid by design</h2>\n    <p style="margin:0; line-height: 1.7; color: #475569">This card flexes from phone to desktop with zero media queries.</p>\n  </article>\n</body>\n</html>`,
            hints: [
              { en: "Six declarations — start with box-sizing: border-box.", fa: "شش تعریف — با ‏box-sizing: border-box شروع کن." },
              { en: "width: min(100%, 420px); — the exact fluid syntax.", fa: "‏width: min(100%, 420px); — سینتکس دقیق سیال." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".post", styleIncludes: "box-sizing: border-box" },
                { selector: ".post", styleIncludes: "width: min(100%, 420px)" },
                { selector: ".post", styleIncludes: "margin: 16px auto" },
                { selector: ".post", styleIncludes: "padding: 20px" },
                { selector: ".post h2", text: "Fluid by design" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m11",
    title: { en: "Animations", fa: "انیمیشن‌ها" },
    blurb: {
      en: "Keyframes: motion that runs on its own — spinners, pulses, entrances.",
      fa: "کی‌فریم‌ها: حرکتی که خودش اجرا می‌شه — اسپینرها، پالس‌ها و ورودها.",
    },
    lessons: [
      {
        id: "css-m11-l1",
        title: { en: "@keyframes: Motion Frames", fa: "@keyframes: فریم‌های حرکت" },
        goal: { en: "Declare an animation's key moments and run it.", fa: "لحظه‌های کلیدی انیمیشن رو تعریف و اجرا کن." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**@keyframes** names a motion recipe with stops along the way: `from` (0%) to `to` (100%), or precise percentages for multi-step dances. Then `animation: name duration;` plays it. Unlike transition (state A → B), keyframes can do A → B → C → A loops.", fa: "**@keyframes** یک دستور حرکت با توقف‌ها تعریف می‌کنه: ‏`from` (۰٪) تا `to` (۱۰۰٪)، یا درصدهای دقیق برای رقص‌های چندمرحله‌ای. بعد ‏`animation: name duration;` اجراش می‌کنه. برخلاف transition (حالت A → B)، کی‌فریم می‌تونه حلقه‌ی A → B → C → A بسازه." },
              { type: "code", lang: "css", runnable: false, code: `@keyframes fade-in {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n.hero { animation: fade-in 0.6s ease-out; }` },
              { type: "tip", en: "Name keyframes for what they DO (fade-in, pop) — names are forever.", fa: "کی‌فریم‌ها رو به اسم کاری که می‌کنن نام‌گذاری کن (fade-in، pop) — اسم‌ها ماندگارن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes fade-in {\n      from { opacity: 0; transform: translateY(12px); }\n      to   { opacity: 1; transform: translateY(0); }\n    }\n    .hero {\n      animation: fade-in 0.7s ease-out;\n      padding: 26px;\n      background-color: #0f172a;\n      color: #e2e8f0;\n      border-radius: 14px;\n    }\n  </style>\n</head>\n<body>\n  <div class="hero">I rise and fade in on load ✨</div>\n</body>\n</html>` },
              { type: "text", en: "Refresh the preview — the card floats up while fading. That's the entrance animation pattern used by every polished site. transform + opacity again: the GPU-friendly duo.", fa: "پیش‌نمایش رو رفرش کن — کارت همزمان بالا میاد و ظاهر می‌شه. همون الگوی انیمیشن ورود که هر سایت صیقلی استفاده می‌کنه. بازم transform + opacity: دوتایی دوست‌دار GPU." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "transition vs @keyframes — keyframes can…", fa: "‏transition در برابر @keyframes — کی‌فریم می‌تونه…" },
                options: [
                  { en: "Only two states", fa: "فقط دو حالت" },
                  { en: "Chain multiple stops and loop", fa: "چند توقف رو زنجیر و حلقه کنه" },
                  { en: "Only animate colors", fa: "فقط رنگ انیمیت کنه" },
                  { en: "Replace JavaScript", fa: "جایگزین جاوااسکریپت شه" },
                ],
                answer: 1,
                explain: { en: "Percent stops (0%…100%) make keyframes multi-act; infinite loops included.", fa: "توقف‌های درصدی (۰٪…۱۰۰٪) کی‌فریم رو چندپرده می‌کنن؛ حلقه بی‌نهایت هم داره." },
              },
              {
                q: { en: "animation: fade-in 0.6s means…", fa: "‏animation: fade-in 0.6s یعنی…" },
                options: [
                  { en: "Play the fade-in keyframes over 0.6s", fa: "کی‌فریم fade-in در ۰٫۶ ثانیه اجرا شه" },
                  { en: "Wait 0.6s then fade", fa: "۰٫۶ صبر کن بعد محو شه" },
                  { en: "Fade 0.6 times", fa: "۰٫۶ بار محو شه" },
                  { en: "Invalid syntax", fa: "سینتکس نامعتبر" },
                ],
                answer: 0,
                explain: { en: "Name first, duration second — plays once by default.", fa: "اول اسم، بعد مدت — به‌صورت پیش‌فرض یک‌بار پخش می‌شه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Fade In the Hero", fa: "هیرو محوش کن" },
            brief: { en: "In <style>: write @keyframes rise-in (from opacity: 0 / translateY(12px) → to opacity: 1 / translateY(0)) and give .hero animation: rise-in 0.7s ease-out. Keep the base styles and text.", fa: "توی <style>: ‏@keyframes rise-in بنویس (from ‏opacity: 0 / ‏translateY(12px) → to ‏opacity: 1 / ‏translateY(0)) و به .hero بده: ‏animation: rise-in 0.7s ease-out. استایل پایه و متن بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .hero {\n      padding: 26px;\n      background-color: #0f172a;\n      color: #e2e8f0;\n      border-radius: 14px;\n    }\n    /* TODO: @keyframes rise-in + animation on .hero */\n  </style>\n</head>\n<body>\n  <div class="hero">Rise and shine 🌅</div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes rise-in {\n      from { opacity: 0; transform: translateY(12px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n    .hero {\n      animation: rise-in 0.7s ease-out;\n      padding: 26px;\n      background-color: #0f172a;\n      color: #e2e8f0;\n      border-radius: 14px;\n    }\n  </style>\n</head>\n<body>\n  <div class="hero">Rise and shine 🌅</div>\n</body>\n</html>`,
            hints: [
              { en: "Keyframes use from/to — no selector braces needed inside.", fa: "کی‌فریم از from/to استفاده می‌کنه — داخلش آکولاد سلکتور لازم نیست." },
              { en: "The animation declaration goes INSIDE the .hero rule.", fa: "تعریف animation داخل قانون .hero می‌ره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".hero", text: "Rise and shine" },
                { selector: "style" },
                { selector: ".hero", styleIncludes: "animation: rise-in 0.7s ease-out" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m11-l2",
        title: { en: "Infinite Loops & Delay", fa: "حلقه بی‌نهایت و تأخیر" },
        goal: { en: "Loop animations forever and stagger their starts.", fa: "انیمیشن رو همیشه تکرار کن و شروع‌ها رو پله‌ای کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Animation long-form: `animation: pulse 1.5s ease-in-out infinite alternate;` — **infinite** repeats forever, **alternate** plays backwards on every second pass (smooth ping-pong), and a trailing delay (`2s 0.5s infinite`) staggers starts. Loading spinners, breathing dots, notification pulses — all of these two words.", fa: "فرم بلند انیمیشن: ‏`animation: pulse 1.5s ease-in-out infinite alternate;` — **infinite** همیشه تکرار می‌کنه، **alternate** هر دور دوم رو معکوس پخش می‌کنه (پینگ‌پنگ نرم) و تأخیر انتهایی (‏`2s 0.5s infinite`) شروع‌ها رو پله‌ای می‌کنه. اسپینر لودینگ، نقطه‌های نفس‌کش، پالس اعلان — همه همین دو کلمه‌ان." },
              { type: "code", lang: "css", runnable: false, code: `@keyframes pulse {\n  from { transform: scale(1); }\n  to   { transform: scale(1.15); }\n}\n.live-dot { animation: pulse 1.2s ease-in-out infinite alternate; }` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes bounce {\n      from { transform: translateY(0); }\n      to   { transform: translateY(-10px); }\n    }\n    .ball { width: 34px; height: 34px; border-radius: 50%; background-color: teal;\n            animation: bounce 0.6s ease-in-out infinite alternate; }\n    .b2 { animation-delay: 0.15s; background-color: violet; }\n    .b3 { animation-delay: 0.3s; background-color: amber; background-color: #f59e0b; }\n    .trio { display: flex; gap: 10px; justify-content: center; margin-top: 60px; }\n  </style>\n</head>\n<body>\n  <div class="trio">\n    <div class="ball"></div>\n    <div class="ball b2"></div>\n    <div class="ball b3"></div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Three balls, same keyframes, staggered delays — an instant \"loading\" wave. Delay is the choreographer's secret: same motion, offset starts, feels alive.", fa: "سه توپ، همون کی‌فریم‌ها، تأخیر پله‌ای — یک موج «لودینگ» فوری. تأخیر راز کارگردان حرکته: همون حرکت، شروع‌های جابه‌جا، حس زنده بودن." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which keyword repeats an animation forever?", fa: "کدوم کلیدواژه انیمیشن رو همیشه تکرار می‌کنه؟" },
                options: [
                  { en: "forever", fa: "forever" },
                  { en: "infinite", fa: "infinite" },
                  { en: "loop", fa: "loop" },
                  { en: "repeat", fa: "repeat" },
                ],
                answer: 1,
                explain: { en: "animation-iteration-count: infinite — usually written inside the shorthand.", fa: "‏animation-iteration-count: infinite — معمولاً داخل خلاصه‌نویسی نوشته می‌شه." },
              },
              {
                q: { en: "alternate makes the animation…", fa: "‏alternate انیمیشن رو…" },
                options: [
                  { en: "Play backwards every other cycle — smooth ping-pong", fa: "هر دور یک‌بار در میان معکوس پخش کنه — پینگ‌پنگ نرم" },
                  { en: "Alternate between colors", fa: "بین رنگ‌ها یکی در میان کنه" },
                  { en: "Skip every second frame", fa: "هر فریم دوم رو رد کنه" },
                  { en: "Stop after two runs", fa: "بعد از دو دور نگه داره" },
                ],
                answer: 0,
                explain: { en: "No jarring jump back to start — it rewinds smoothly instead.", fa: "پرش تند به شروع نداری — به‌جاش نرم برمی‌گرده." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Wave Loader", fa: "لودر موجی" },
            brief: { en: "In <style>, add @keyframes bounce (from translateY(0) → to translateY(-10px)) and give .dot the animation: bounce 0.6s ease-in-out infinite alternate. Keep the three dots and their delay classes.", fa: "توی <style> ‏@keyframes bounce اضافه کن (from ‏translateY(0) → to ‏translateY(-10px)) و به .dot بده: ‏animation: bounce 0.6s ease-in-out infinite alternate. سه نقطه و کلاس‌های تأخیر بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .dot { width: 26px; height: 26px; border-radius: 50%; background-color: teal; }\n    .d2 { animation-delay: 0.15s; }\n    .d3 { animation-delay: 0.3s; }\n    .trio { display: flex; gap: 8px; justify-content: center; margin-top: 70px; }\n    /* TODO: @keyframes bounce + animation on .dot */\n  </style>\n</head>\n<body>\n  <div class="trio">\n    <div class="dot"></div>\n    <div class="dot d2"></div>\n    <div class="dot d3"></div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes bounce {\n      from { transform: translateY(0); }\n      to { transform: translateY(-10px); }\n    }\n    .dot { width: 26px; height: 26px; border-radius: 50%; background-color: teal; animation: bounce 0.6s ease-in-out infinite alternate; }\n    .d2 { animation-delay: 0.15s; }\n    .d3 { animation-delay: 0.3s; }\n    .trio { display: flex; gap: 8px; justify-content: center; margin-top: 70px; }\n  </style>\n</head>\n<body>\n  <div class="trio">\n    <div class="dot"></div>\n    <div class="dot d2"></div>\n    <div class="dot d3"></div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "The animation goes on .dot — all three inherit it.", fa: "‏animation روی .dot می‌ره — هر سه ارث می‌برن." },
              { en: "Exact value: bounce 0.6s ease-in-out infinite alternate.", fa: "مقدار دقیق: ‏bounce 0.6s ease-in-out infinite alternate." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".dot", count: 3 },
                { selector: ".dot", styleIncludes: "animation: bounce 0.6s ease-in-out infinite alternate", count: 3 },
                { selector: ".d2", styleIncludes: "animation-delay: 0.15s" },
                { selector: "style" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m11-l3",
        title: { en: "Entrance Choreography", fa: "کارگردانی ورود" },
        goal: { en: "Chain delayed entrance animations into a polished sequence.", fa: "انیمیشن‌های ورود با تأخیر رو به یک توالی صیقلی زنجیر کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Professional pages choreograph entrances: badge first, headline next, cards staggered after. Recipe: ONE shared keyframes (fade + rise), different `animation-delay` per element (0s, .15s, .3s), and — the missing piece until now — `animation-fill-mode: backwards;` so elements hold their `from` state during the delay (no flash of final state).", fa: "صفحه‌های حرفه‌ای ورودها رو کارگردانی می‌کنن: اول نشان، بعد تیتر، بعد کارت‌ها پله‌ای. دستور: یک کی‌فریم مشترک (محو + بالا اومدن)، ‏animation-delay متفاوت برای هر عنصر (۰s، ‏۰٫۱۵s، ‏۰٫۳s) و — قطعه گم‌شده تا امروز — ‏`animation-fill-mode: backwards;` تا عناصر در طول تأخیر حالت from رو نگه دارن (بدون فلاش حالت نهایی)." },
              { type: "code", lang: "css", runnable: false, code: `@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }\n.a { animation: rise .6s ease-out backwards; }\n.b { animation: rise .6s ease-out .15s backwards; }\n.c { animation: rise .6s ease-out .3s backwards; }` },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes rise {\n      from { opacity: 0; transform: translateY(14px); }\n      to { opacity: 1; transform: none; }\n    }\n    .step { padding: 14px; background-color: #f1f5f9; border-radius: 10px;\n            animation: rise 0.6s ease-out backwards; }\n    .s2 { animation-delay: 0.15s; }\n    .s3 { animation-delay: 0.3s; }\n    .col { display: flex; flex-direction: column; gap: 10px; width: min(100%, 340px); margin: 0 auto; }\n  </style>\n</head>\n<body>\n  <div class="col">\n    <div class="step">1 · Awake</div>\n    <div class="step s2">2 · Rising</div>\n    <div class="step s3">3 · Arrived</div>\n  </div>\n</body>\n</html>` },
              { type: "tip", en: "Sequence order should mirror reading order — eyes land where motion begins.", fa: "ترتیب توالی باید مثل ترتیب خوندن باشه — چشم جایی فرود میاد که حرکت شروع می‌شه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "animation-fill-mode: backwards prevents…", fa: "‏animation-fill-mode: backwards جلوی … رو می‌گیره." },
                options: [
                  { en: "The element flashing its final state during the delay", fa: "فلاش زدن حالت نهایی عنصر در طول تأخیر رو" },
                  { en: "Animations running twice", fa: "دوبار اجرا شدن انیمیشن رو" },
                  { en: "GPU usage", fa: "مصرف GPU رو" },
                  { en: "Nothing — it's decorative", fa: "هیچی — تزئینیه" },
                ],
                answer: 0,
                explain: { en: "It holds the from state during delay — no premature reveal.", fa: "حالت from رو در طول تأخیر نگه می‌داره — بدون نمایش زودهنگام." },
              },
              {
                q: { en: "Staggered entrance delays usually step by…", fa: "تأخیرهای ورود پله‌ای معمولاً با … پیش می‌رن." },
                options: [
                  { en: "5–10 seconds", fa: "۵–۱۰ ثانیه" },
                  { en: "100–200 milliseconds", fa: "۱۰۰–۲۰۰ میلی‌ثانیه" },
                  { en: "Random values", fa: "مقادیر شانسی" },
                  { en: "Exactly 1s", fa: "دقیقاً ۱ ثانیه" },
                ],
                answer: 1,
                explain: { en: "0.1–0.2s steps feel rhythmic; bigger gaps feel laggy.", fa: "پله‌های ۰٫۱ تا ۰٫۲ ثانیه ریتمیک حس می‌شن؛ بیشترش حس کندی می‌ده." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Staggered Steps", fa: "پله‌های پله‌ای" },
            brief: { en: "In <style>: keep @keyframes rise and .step base; give .step animation: rise 0.6s ease-out backwards; and set .s2 { animation-delay: 0.15s; } .s3 { animation-delay: 0.3s; }. Keep all texts.", fa: "توی <style>: ‏@keyframes rise و پایه .step رو نگه دار؛ به .step بده: ‏animation: rise 0.6s ease-out backwards; و ست کن ‏.s2 { animation-delay: 0.15s; } ‏.s3 { animation-delay: 0.3s; }. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes rise {\n      from { opacity: 0; transform: translateY(14px); }\n      to { opacity: 1; transform: none; }\n    }\n    .step { padding: 14px; background-color: #f1f5f9; border-radius: 10px; }\n    /* TODO: animation on .step + delays on .s2/.s3 */\n    .col { display: flex; flex-direction: column; gap: 10px; width: min(100%, 340px); margin: 0 auto; }\n  </style>\n</head>\n<body>\n  <div class="col">\n    <div class="step">Ship</div>\n    <div class="step s2">Test</div>\n    <div class="step s3">Build</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes rise {\n      from { opacity: 0; transform: translateY(14px); }\n      to { opacity: 1; transform: none; }\n    }\n    .step { padding: 14px; background-color: #f1f5f9; border-radius: 10px; animation: rise 0.6s ease-out backwards; }\n    .s2 { animation-delay: 0.15s; }\n    .s3 { animation-delay: 0.3s; }\n    .col { display: flex; flex-direction: column; gap: 10px; width: min(100%, 340px); margin: 0 auto; }\n  </style>\n</head>\n<body>\n  <div class="col">\n    <div class="step">Ship</div>\n    <div class="step s2">Test</div>\n    <div class="step s3">Build</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "One animation declaration on .step; delays only on the two offset classes.", fa: "یک تعریف animation روی .step؛ تأخیر فقط روی دو کلاس offset." },
              { en: "Don't forget backwards at the end of the animation value.", fa: "‏backwards رو آخر مقدار animation یادت نره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".step", count: 3 },
                { selector: ".step", styleIncludes: "animation: rise 0.6s ease-out backwards", count: 3 },
                { selector: ".s2", styleIncludes: "animation-delay: 0.15s" },
                { selector: ".s3", styleIncludes: "animation-delay: 0.3s" },
                { selector: ".step", text: "Ship" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m11-l4",
        title: { en: "MINI-PROJECT: Loading Spinner", fa: "پروژه کوچک: اسپینر لودینگ" },
        goal: { en: "Build the classic rotating spinner with pure CSS.", fa: "اسپینر چرخان کلاسیک رو با CSS خالص بساز." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The spinner secret: a **circle border where only one side is colored**, then `animation: spin 0.8s linear infinite;` rotating it 360°. `border: 6px solid #e2e8f0; border-top-color: teal; border-radius: 50%;` — the colored arc sweeps around and your eyes read it as spinning.", fa: "راز اسپینر: یک **بوردر دایره‌ای که فقط یک طرفش رنگیه**، بعد ‏`animation: spin 0.8s linear infinite;` که ۳۶۰ درجه می‌چرخونتش. ‏`border: 6px solid #e2e8f0; border-top-color: teal; border-radius: 50%;` — کمان رنگی دور می‌زنه و چشم‌ها می‌خوننش به شکل چرخش." },
              { type: "code", lang: "css", runnable: false, code: `@keyframes spin { to { transform: rotate(360deg); } }\n.spinner {\n  width: 44px; height: 44px;\n  border: 6px solid #e2e8f0;\n  border-top-color: teal;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}` },
              { type: "tip", en: "linear easing is CORRECT for continuous rotation — easing would make it stutter.", fa: "‏easing خطی برای چرخش پیوسته درسته — easingهای دیگه پرش می‌ندازن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Accessibility bonus: wrap spinners in `aria-busy=\"true\"` containers or add `aria-label=\"Loading\"` — motion communicates to eyes, labels communicate to screen readers. And respect `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }` for motion-sensitive users — professional empathy in one rule.", fa: "هدیه دسترس‌پذیری: اسپینر رو داخل کانتینر با `aria-busy=\"true\"` بذار یا `aria-label=\"Loading\"` اضافه کن — حرکت برای چشم‌ها حرف می‌زنه، لیبل برای اسکرین‌ریدر. و برای کاربران حساس به حرکت به `@media (prefers-reduced-motion: reduce)` احترام بذار — همدلی حرفه‌ای در یک قانون." },
              { type: "code", lang: "html", runnable: false, code: `<div role="status" aria-label="Loading">\n  <div class="spinner"></div>\n</div>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why only border-top-color colored?", fa: "چرا فقط border-top-color رنگیه؟" },
                options: [
                  { en: "It creates the visible arc that reads as spinning", fa: "کمان قابل دید می‌سازه که چرخش رو نشون می‌ده" },
                  { en: "Other borders aren't allowed", fa: "بوردرهای دیگه مجاز نیستن" },
                  { en: "It's faster", fa: "سریع‌تره" },
                  { en: "Tradition", fa: "سنت" },
                ],
                answer: 0,
                explain: { en: "One colored arc + full rotation = the universal spinner illusion.", fa: "یک کمان رنگی + چرخش کامل = توهم جهانی اسپینر." },
              },
              {
                q: { en: "Best easing for endless rotation?", fa: "بهترین easing برای چرخش بی‌پایان؟" },
                options: [
                  { en: "linear", fa: "linear" },
                  { en: "ease-in", fa: "ease-in" },
                  { en: "ease-out", fa: "ease-out" },
                  { en: "bounce", fa: "bounce" },
                ],
                answer: 0,
                explain: { en: "Constant speed, no hiccup at the loop point.", fa: "سرعت ثابت، بدون پرش در نقطه حلقه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Pure-CSS Spinner", fa: "اسپینر CSS خالص" },
            brief: { en: "In <style>: add @keyframes spin { to { transform: rotate(360deg); } } and give .spinner animation: spin 0.8s linear infinite; plus width: 44px; height: 44px; border: 6px solid #e2e8f0; border-top-color: teal; border-radius: 50%. Keep role/aria attributes.", fa: "توی <style>: ‏@keyframes spin { to { transform: rotate(360deg); } } اضافه کن و به .spinner بده: ‏animation: spin 0.8s linear infinite; به‌علاوه width: 44px; height: 44px; border: 6px solid #e2e8f0; border-top-color: teal; border-radius: 50%. صفت‌های role/aria بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .stage { display: flex; justify-content: center; margin-top: 70px; }\n    /* TODO: @keyframes spin + .spinner recipe */\n  </style>\n</head>\n<body>\n  <div class="stage" role="status" aria-label="Loading">\n    <div class="spinner"></div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    @keyframes spin { to { transform: rotate(360deg); } }\n    .spinner {\n      width: 44px; height: 44px;\n      border: 6px solid #e2e8f0;\n      border-top-color: teal;\n      border-radius: 50%;\n      animation: spin 0.8s linear infinite;\n    }\n    .stage { display: flex; justify-content: center; margin-top: 70px; }\n  </style>\n</head>\n<body>\n  <div class="stage" role="status" aria-label="Loading">\n    <div class="spinner"></div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "border shorthand first, then border-top-color overrides just the top.", fa: "اول خلاصه‌نویسی بوردر، بعد ‏border-top-color فقط بالا رو override می‌کنه." },
              { en: "Animation value: spin 0.8s linear infinite.", fa: "مقدار انیمیشن: ‏spin 0.8s linear infinite." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".spinner", styleIncludes: "animation: spin 0.8s linear infinite" },
                { selector: ".spinner", styleIncludes: "border-radius: 50%" },
                { selector: ".spinner", styleIncludes: "border-top-color: teal" },
                { selector: "[role='status']", attrName: "aria-label", attrValue: "Loading" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m12",
    title: { en: "Components Lab", fa: "کارگاه کامپوننت‌ها" },
    blurb: {
      en: "Assemble real UI: buttons, cards, navbars and badges — the parts every product is made of.",
      fa: "UI واقعی سرهم کن: دکمه‌ها، کارت‌ها، نوار ناوبری و نشان‌ها — قطعاتی که هر محصولی ازشون ساخته می‌شه.",
    },
    lessons: [
      {
        id: "css-m12-l1",
        title: { en: "Button Variants", fa: "واریانت‌های دکمه" },
        goal: { en: "Design primary, ghost and danger buttons from one shared recipe.", fa: "دکمه‌های primary و ghost و danger رو از یک دستور مشترک طراحی کن." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Every button is the same skeleton: padding for size, border-radius for character, font-size for voice, `cursor: pointer` for feel. A **variant** is that skeleton with a different skin — solid for the main action, outline for the quiet one, red for the destructive one. Build the skeleton once, multiply the skins.", fa: "هر دکمه یه اسکلت‌ه: پدینگ برای اندازه، ‏border-radius برای شخصیت، ‏font-size برای صدا و ‏`cursor: pointer` برای حس. یه **واریانت** همون اسکلت با پوسته متفاوته — توپر برای اکشن اصلی، خطی برای اکشن آروم، قرمز برای اکشن مخرب. اسکلت رو یک‌بار بساز، پوسته‌ها رو تکثیر کن." },
              { type: "code", lang: "css", runnable: false, code: `.btn {\n  padding: 10px 18px;\n  border-radius: 10px;\n  font-size: 15px;\n  cursor: pointer;\n}\n.btn-primary { background-color: #0d9488; color: white; border: 0; }\n.btn-ghost   { background-color: transparent; color: #0d9488; border: 2px solid #0d9488; }` },
              { type: "tip", en: "Buttons default to the plain arrow cursor — `cursor: pointer` is a two-word trust signal that says \"I'm clickable\".", fa: "دکمه‌ها به‌طور پیش‌فرض فلش ساده دارن — ‏`cursor: pointer` یه سیگنال اعتماد دو کلمه‌ست که می‌گه «من کلیک‌شدنی‌ام»." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .btn { padding: 10px 18px; border-radius: 10px; font-size: 15px; cursor: pointer;\n           transition: filter 0.2s ease-out; }\n    .btn:hover { filter: brightness(1.1); }\n    .primary { background-color: #0d9488; color: white; border: 0; }\n    .ghost   { background-color: transparent; color: #0d9488; border: 2px solid #0d9488; }\n    .danger  { background-color: #dc2626; color: white; border: 0; }\n    .row { display: flex; gap: 12px; justify-content: center; margin-top: 40px; }\n  </style>\n</head>\n<body>\n  <div class="row">\n    <button class="btn primary">Save changes</button>\n    <button class="btn ghost">Preview</button>\n    <button class="btn danger">Delete</button>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Hierarchy at a glance: the eye lands on the solid teal (do the main thing), the ghost is present but quiet (secondary), and red is saved for actions you can't undo. The classic rule: ONE solid primary per view — when everything shouts, nothing is heard.", fa: "سلسله‌مراتب یک‌نگاهی: چشم اول می‌ره سراغ توپر فیروزه‌ای (کار اصلی)، ‏ghost هست ولی آرومه (فرعی) و قرمز برای کارهای برگشت‌ناپذیر نگه داشته می‌شه. قانون کلاسیک: هر صفحه فقط یه دکمه primary توپر — وقتی همه داد می‌زنن، هیچ‌کی شنیده نمی‌شه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How many SOLID primary buttons should a view have?", fa: "یک صفحه چند تا دکمه primary توپر باید داشته باشه؟" },
                options: [
                  { en: "As many as possible", fa: "هرچی بیشتر بهتر" },
                  { en: "One — the main action", fa: "یکی — همون اکشن اصلی" },
                  { en: "Exactly three", fa: "دقیقاً سه تا" },
                  { en: "None — outlines only", fa: "هیچی — فقط خطی‌ها" },
                ],
                answer: 1,
                explain: { en: "One loud button gives the eye a decision. Everything else goes ghost or text.", fa: "یه دکمه بلند به چشم تصمیم‌گیری می‌ده. بقیه می‌شن ghost یا متنی." },
              },
              {
                q: { en: "What makes a ghost button a ghost?", fa: "چی یه دکمه ghost رو ghost می‌کنه؟" },
                options: [
                  { en: "opacity: 0.5", fa: "opacity: 0.5" },
                  { en: "Transparent background + colored border", fa: "بک‌گراند شفاف + بوردر رنگی" },
                  { en: "White text on white", fa: "متن سفید روی سفید" },
                  { en: "Smaller font only", fa: "فقط فونت کوچیک‌تر" },
                ],
                answer: 1,
                explain: { en: "Ghost = hollow: transparent fill, the border carries the color.", fa: "‏ghost = توخالی: پرکننده شفاف، بوردر رنگ رو حمل می‌کنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Button Trio", fa: "سه‌گانه دکمه" },
            brief: { en: "Give .row inline display: flex; gap: 12px; justify-content: center. Give EACH button inline padding: 10px 18px; border-radius: 10px; font-size: 15px; cursor: pointer. Then: .primary gets background-color: #0d9488; color: white; border: 0. .ghost gets background-color: transparent; color: #0d9488; border: 2px solid #0d9488. .danger gets background-color: #dc2626; color: white; border: 0. Keep texts.", fa: "به .row استایل درون‌خطی display: flex; gap: 12px; justify-content: center بده. به هر دکمه استایل درون‌خطی padding: 10px 18px; border-radius: 10px; font-size: 15px; cursor: pointer بده. بعد: ‏.primary می‌گیره ‏background-color: #0d9488; color: white; border: 0. ‏.ghost می‌گیره ‏background-color: transparent; color: #0d9488; border: 2px solid #0d9488. ‏.danger می‌گیره ‏background-color: #dc2626; color: white; border: 0. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Button trio</title>\n</head>\n<body>\n  <!-- TODO: flex row recipe -->\n  <div class="row">\n    <!-- TODO: shared skeleton + primary skin -->\n    <button class="btn primary">Save changes</button>\n    <!-- TODO: shared skeleton + ghost skin -->\n    <button class="btn ghost">Preview</button>\n    <!-- TODO: shared skeleton + danger skin -->\n    <button class="btn danger">Delete</button>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Button trio</title>\n</head>\n<body>\n  <div class="row" style="display: flex; gap: 12px; justify-content: center;">\n    <button class="btn primary" style="padding: 10px 18px; border-radius: 10px; font-size: 15px; cursor: pointer; background-color: #0d9488; color: white; border: 0;">Save changes</button>\n    <button class="btn ghost" style="padding: 10px 18px; border-radius: 10px; font-size: 15px; cursor: pointer; background-color: transparent; color: #0d9488; border: 2px solid #0d9488;">Preview</button>\n    <button class="btn danger" style="padding: 10px 18px; border-radius: 10px; font-size: 15px; cursor: pointer; background-color: #dc2626; color: white; border: 0;">Delete</button>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Seven declarations per button: four shared (padding, radius, font-size, cursor) + three skin (background, color, border).", fa: "هفت تعریف برای هر دکمه: چهار مشترک (پدینگ، رادیوس، فونت، cursor) + سه پوسته (بک‌گراند، رنگ، بوردر)." },
              { en: "Ghost's border is exactly 2px solid #0d9488 — the width matters.", fa: "بوردر ghost دقیقاً ‏2px solid #0d9488 هست — ضخامتش مهمه." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".row", styleIncludes: "display: flex" },
                { selector: "button.primary", text: "Save changes" },
                { selector: "button.primary", styleIncludes: "background-color: #0d9488" },
                { selector: "button.ghost", styleIncludes: "background-color: transparent" },
                { selector: "button.ghost", styleIncludes: "border: 2px solid #0d9488" },
                { selector: "button.danger", styleIncludes: "background-color: #dc2626" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m12-l2",
        title: { en: "Card Anatomy", fa: "کالبدشکافی کارت" },
        goal: { en: "Build the media-body-footer card that powers every feed and dashboard.", fa: "کارت media-body-footer که هر فید و داشبردی رو می‌سازه رو بساز." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Cards are the workhorse of the web — feeds, pricing, dashboards, search results. Anatomy: a **container** (border + radius + overflow: hidden), a **media** strip that bleeds to the edges, a **body** with real padding for title + text, and a **footer** meta row. Four zones, one component.", fa: "کارت‌ها اسب کار وب‌ان — فید، قیمت‌گذاری، داشبرد و نتایج جستجو. کالبدشکافی: یه **کانتینر** (بوردر + رادیوس + ‏overflow: hidden)، یه نوار **media** که تا لبه‌ها می‌ره، یه **body** با پدینگ واقعی برای تیتر + متن و یه **فوتر** به‌عنوان سطر متا. چهار ناحیه، یک کامپوننت." },
              { type: "code", lang: "css", runnable: false, code: `.card { border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; }\n.card-media { padding: 26px; text-align: center; }  /* bleeds to edges: NO padding on container */\n.card-body  { padding: 16px; }\n.card-foot  { padding: 12px 16px; border-top: 1px solid #e2e8f0; }` },
              { type: "tip", en: "`overflow: hidden` clips the media to the container's rounded corners — without it, sharp media corners poke out of your 14px radius.", fa: "‏`overflow: hidden` مدیا رو به گوشه‌های گرد کانتینر کلیپ می‌کنه — بدون اون، گوشه‌های تیز مدیا از رادیوس ۱۴ پیکسلیت بیرون می‌زنن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .card { width: 300px; margin: 30px auto; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; font-family: sans-serif; }\n    .media { padding: 26px; background-color: #0f172a; color: #67e8f9; font-size: 30px; text-align: center; }\n    .body { padding: 16px; }\n    .body h3 { margin: 0 0 6px; }\n    .body p { margin: 0; color: #475569; line-height: 1.6; font-size: 14px; }\n    .foot { display: flex; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px; }\n  </style>\n</head>\n<body>\n  <article class="card">\n    <div class="media">📡</div>\n    <div class="body">\n      <h3>Signal boosted</h3>\n      <p>Your post reached 2,400 feeds in the last hour.</p>\n    </div>\n    <div class="foot"><span>2h ago</span><span>📈 Analytics</span></div>\n  </article>\n</body>\n</html>` },
              { type: "text", en: "Note the padding choreography: container has NONE (so media touches the edges), body carries 16px, footer carries 12px 16px with a hairline border-top. The footer answers \"when, and where does this lead?\" — meta belongs there, small and muted.", fa: "به رقص پدینگ دقت کن: کانتینر هیچی نداره (تا مدیا به لبه‌ها بچسبه)، ‏body ‏۱۶ پیکسل داره و فوتر ‏۱۲×۱۶ با یه خط مویی border-top. فوتر به «کی، و کجا ختم می‌شه؟» جواب می‌ده — متا همون‌جاست، ریز و کم‌رنگ." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why does the card container get overflow: hidden?", fa: "چرا کانتینر کارت ‏overflow: hidden می‌گیره؟" },
                options: [
                  { en: "To hide the whole card", fa: "تا کل کارت مخفی شه" },
                  { en: "To clip media to the rounded corners", fa: "تا مدیا به گوشه‌های گرد کلیپ شه" },
                  { en: "To add padding", fa: "برای اضافه کردن پدینگ" },
                  { en: "To speed up rendering", fa: "برای رندر سریع‌تر" },
                ],
                answer: 1,
                explain: { en: "Radius + overflow = the media respects the card's shape.", fa: "‏رادیوس + overflow = مدیا شکل کارت رو رعایت می‌کنه." },
              },
              {
                q: { en: "Where does the card's padding live?", fa: "پدینگ کارت کجا زندگی می‌کنه؟" },
                options: [
                  { en: "On the container", fa: "روی کانتینر" },
                  { en: "On the body and footer — not the container", fa: "روی body و فوتر — نه کانتینر" },
                  { en: "On the h3", fa: "روی h3" },
                  { en: "Nowhere", fa: "هیچ‌جا" },
                ],
                answer: 1,
                explain: { en: "Container padding would push media off the edges — pad the inner zones instead.", fa: "پدینگ کانتینر مدیا رو از لبه‌ها جدا می‌کرد — به‌جاش ناحیه‌های داخلی رو پدینگ بده." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Build a Post Card", fa: "کارت پست رو بساز" },
            brief: { en: "Give article.post inline: border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; width: 320px. Give .media inline: padding: 26px; background-color: #0f172a; color: #67e8f9; font-size: 30px; text-align: center. Give .body inline: padding: 16px. Give .foot inline: display: flex; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px. Keep texts.", fa: "به article کلاس post استایل درون‌خطی border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; width: 320px بده. به .media استایل درون‌خطی padding: 26px; background-color: #0f172a; color: #67e8f9; font-size: 30px; text-align: center بده. به .body بده: ‏padding: 16px. به .foot بده: ‏display: flex; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Post card</title>\n</head>\n<body style="font-family: sans-serif;">\n  <!-- TODO: container recipe (border + radius + overflow + width) -->\n  <article class="post">\n    <!-- TODO: media strip recipe -->\n    <div class="media">📡</div>\n    <!-- TODO: body padding -->\n    <div class="body">\n      <h3 style="margin: 0 0 6px;">Signal boosted</h3>\n      <p style="margin: 0; color: #475569; line-height: 1.6; font-size: 14px;">Your post reached 2,400 feeds in the last hour.</p>\n    </div>\n    <!-- TODO: footer meta row -->\n    <div class="foot"><span>2h ago</span><span>📈 Analytics</span></div>\n  </article>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Post card</title>\n</head>\n<body style="font-family: sans-serif;">\n  <article class="post" style="border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; width: 320px; margin: 24px auto;">\n    <div class="media" style="padding: 26px; background-color: #0f172a; color: #67e8f9; font-size: 30px; text-align: center;">📡</div>\n    <div class="body" style="padding: 16px;">\n      <h3 style="margin: 0 0 6px;">Signal boosted</h3>\n      <p style="margin: 0; color: #475569; line-height: 1.6; font-size: 14px;">Your post reached 2,400 feeds in the last hour.</p>\n    </div>\n    <div class="foot" style="display: flex; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px;"><span>2h ago</span><span>📈 Analytics</span></div>\n  </article>\n</body>\n</html>`,
            hints: [
              { en: "Four recipes, four elements — copy each declaration list from the brief.", fa: "چهار دستور، چهار عنصر — هر لیست تعریف رو از بریف کپی کن." },
              { en: "The foot is also a mini flexbox: space-between pushes the two spans to the edges.", fa: "فوتر یه مینی‌فلکس هم هست: ‏space-between دو تا span رو به لبه‌ها می‌فرسته." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "article.post", styleIncludes: "overflow: hidden" },
                { selector: "article.post", styleIncludes: "border-radius: 14px" },
                { selector: ".post .media", text: "📡" },
                { selector: ".post .body", styleIncludes: "padding: 16px" },
                { selector: ".post .body h3", text: "Signal boosted" },
                { selector: ".post .foot", styleIncludes: "border-top: 1px solid #e2e8f0" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m12-l3",
        title: { en: "Badges & Status Pills", fa: "نشان‌ها و قرص‌های وضعیت" },
        goal: { en: "Stamp tiny labels that carry big meaning — status, counts and roles.", fa: "لیبل‌های ریز که معنی بزرگی حمل می‌کنن — وضعیت، شمارنده و نقش." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A **pill** is a tiny label with a fully-rounded border-radius: 999px — status (Online), roles (Admin), tags (CSS). Recipe: small padding (3px 10px), tiny font (12px), bold, and a soft two-tone scheme: light background + dark text of the SAME hue. Green for success, amber for warning, red for error — this color-coding is a language users already speak.", fa: "یه **قرص** لیبل کوچیکیه با گردی کامل ‏border-radius: 999px — وضعیت (Online)، نقش (Admin) و تگ (CSS). دستور: پدینگ کم (۳×۱۰)، فونت ریز (۱۲px)، بولد و یه طرح دورنگ نرم: بک‌گراند روشن + متن تیره از *همون* طیف. سبز برای موفقیت، کهربایی برای هشدار، قرمز برای خطا — این کد رنگی زبونیه که کاربرها از قبل بلدن." },
              { type: "code", lang: "css", runnable: false, code: `.pill {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.pill.ok   { background-color: #d1fae5; color: #065f46; }\n.pill.warn { background-color: #fef3c7; color: #92400e; }\n.pill.err  { background-color: #fee2e2; color: #991b1b; }` },
              { type: "tip", en: "Light bg + dark same-hue text beats saturated bg + white text for anything that isn't a call to action — pills sit next to text and shouldn't outshout it.", fa: "بک‌گراند روشن + متن تیره هم‌طیف، برای هرچیزی که CTA نیست از بک‌گراند اشباع + متن سفید بهتره — قرص‌ها کنار متن می‌شینن و نباید از متن بلندتر فریاد بزنن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { font-family: sans-serif; }\n    .row { display: flex; gap: 10px; justify-content: center; margin-top: 40px; }\n    .pill { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }\n    .ok   { background-color: #d1fae5; color: #065f46; }\n    .warn { background-color: #fef3c7; color: #92400e; }\n    .err  { background-color: #fee2e2; color: #991b1b; }\n    .bell { position: relative; font-size: 24px; }\n    .count { position: absolute; top: -6px; right: -10px; background-color: #dc2626; color: white;\n             border-radius: 999px; padding: 1px 6px; font-size: 11px; font-weight: 700; }\n  </style>\n</head>\n<body>\n  <div class="row">\n    <span class="pill ok">● Online</span>\n    <span class="pill warn">◌ Away</span>\n    <span class="pill err">✕ DND</span>\n    <span class="bell">🔔<span class="count">3</span></span>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The count badge is a different species: from module 8 — a `relative` parent plus an `absolute` dot pinned to its corner. Inline pills describe state; pinned dots count things. Same word \"badge\", two behaviors — now you can build both.", fa: "نشان شمارنده یه گونه دیگه‌ست: از ماژول ۸ — والد `relative` + یه نقطه `absolute` که به گوشه‌ش سنجاق شده. قرص‌های درون‌خطی وضعیت رو توصیف می‌کنن؛ نقطه‌های سنجاق‌شده چیزها رو می‌شمرن. همون کلمه «نشان»، دو رفتار — الان هر دوتاش رو می‌تونی بسازی." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "The classic pill radius value is…", fa: "مقدار کلاسیک گردی قرص …" },
                options: [
                  { en: "border-radius: 4px", fa: "border-radius: 4px" },
                  { en: "border-radius: 50%", fa: "border-radius: 50%" },
                  { en: "border-radius: 999px", fa: "border-radius: 999px" },
                  { en: "No radius", fa: "بدون رادیوس" },
                ],
                answer: 2,
                explain: { en: "999px forces the capsule shape whatever the height.", fa: "‏۹۹۹px هرقدر هم ارتفاع داشته باشه، شکل کپسولی رو تحمیل می‌کنه." },
              },
              {
                q: { en: "A red count badge pinned on a bell icon needs…", fa: "نشان قرمز شمارنده سنجاق‌شده روی آیکون زنگ نیاز داره به…" },
                options: [
                  { en: "position: fixed on the badge", fa: "position: fixed روی نشان" },
                  { en: "position: relative on the icon + absolute on the badge", fa: "position: relative روی آیکون + absolute روی نشان" },
                  { en: "float: right", fa: "float: right" },
                  { en: "A table", fa: "جدول" },
                ],
                answer: 1,
                explain: { en: "The icon is the reference frame; the badge pins to it — module 8's combo.", fa: "آیکون قاب مرجعه؛ نشان بهش سنجاق می‌شه — همون ترکیب ماژول ۸." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Status Board", fa: "تابلوی وضعیت" },
            brief: { en: "Give each .pill inline: display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700. Then .ok gets background-color: #d1fae5; color: #065f46. .warn gets background-color: #fef3c7; color: #92400e. .err gets background-color: #fee2e2; color: #991b1b. For the count: .bell gets inline position: relative and .count gets inline position: absolute; top: -6px; right: -10px; background-color: #dc2626; color: white; border-radius: 999px; padding: 1px 6px; font-size: 11px. Keep texts.", fa: "به هر .pill استایل درون‌خطی display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700 بده. بعد ‏.ok می‌گیره ‏background-color: #d1fae5; color: #065f46. ‏.warn می‌گیره ‏background-color: #fef3c7; color: #92400e. ‏.err می‌گیره ‏background-color: #fee2e2; color: #991b1b. برای شمارنده: ‏.bell استایل درون‌خطی ‏position: relative می‌گیره و ‏.count می‌گیره ‏position: absolute; top: -6px; right: -10px; background-color: #dc2626; color: white; border-radius: 999px; padding: 1px 6px; font-size: 11px. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Status board</title>\n</head>\n<body style="font-family: sans-serif;">\n  <div class="row" style="display: flex; gap: 10px; justify-content: center; margin-top: 40px;">\n    <!-- TODO: pill base + ok skin -->\n    <span class="pill ok">Online</span>\n    <!-- TODO: pill base + warn skin -->\n    <span class="pill warn">Away</span>\n    <!-- TODO: pill base + err skin -->\n    <span class="pill err">DND</span>\n    <!-- TODO: relative bell + absolute count -->\n    <span class="bell">🔔<span class="count">3</span></span>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Status board</title>\n</head>\n<body style="font-family: sans-serif;">\n  <div class="row" style="display: flex; gap: 10px; justify-content: center; margin-top: 40px;">\n    <span class="pill ok" style="display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background-color: #d1fae5; color: #065f46;">Online</span>\n    <span class="pill warn" style="display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background-color: #fef3c7; color: #92400e;">Away</span>\n    <span class="pill err" style="display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background-color: #fee2e2; color: #991b1b;">DND</span>\n    <span class="bell" style="position: relative; font-size: 24px;">🔔<span class="count" style="position: absolute; top: -6px; right: -10px; background-color: #dc2626; color: white; border-radius: 999px; padding: 1px 6px; font-size: 11px;">3</span></span>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Base recipe first (5 declarations × 3 pills), then the two-color skin per pill.", fa: "اول دستور پایه (۵ تعریف × ۳ قرص)، بعد پوسته دورنگ هر قرص." },
              { en: "Bell = position: relative, count = position: absolute — the module 8 combo.", fa: "زنگ = ‏position: relative، شمارنده = ‏position: absolute — همون ترکیب ماژول ۸." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".pill", count: 3 },
                { selector: ".pill", styleIncludes: "border-radius: 999px", count: 3 },
                { selector: ".pill.ok", styleIncludes: "background-color: #d1fae5" },
                { selector: ".pill.err", styleIncludes: "color: #991b1b" },
                { selector: ".bell", styleIncludes: "position: relative" },
                { selector: ".count", styleIncludes: "position: absolute" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m12-l4",
        title: { en: "MINI-PROJECT: Profile Header", fa: "پروژه کوچک: هدر پروفایل" },
        goal: { en: "Combine avatar, name, role pill, stats and a follow button into one polished header.", fa: "آواتار، اسم، قرص نقش، آمار و دکمه فالو رو در یک هدر صیقلی ترکیب کن." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Time to assemble. The profile header blueprint: a flex row (avatar | identity column | actions) where the identity column grows (`flex: 1`) and the actions hug the row's end (`margin-left: auto`). Below: a stats row — three numbers in a line. You already own every part: flex from modules 5-6, the circle avatar from the profile-card mini-project, pills from lesson 3, buttons from lesson 1.", fa: "وقت سرهم‌کردنه. نقشه هدر پروفایل: یه سطر فلکس (آواتار | ستون هویت | اکشن‌ها) که ستون هویت رشد می‌کنه (‏`flex: 1`) و اکشن‌ها به ته سطر می‌چسبن (‏`margin-left: auto`). زیرش: سطر آمار — سه عدد تو یه خط. همه قطعه‌ها رو داری: فلکس از ماژول‌های ۵ و ۶، آواتار دایره‌ای از پروژه کوچک کارت پروفایل، قرص‌ها از درس ۳ و دکمه‌ها از درس ۱." },
              { type: "code", lang: "css", runnable: false, code: `.profile  { display: flex; align-items: center; gap: 16px; }\n.identity { flex: 1; }\n.follow   { margin-left: auto; }   /* hugs the row's end */\n.stats    { display: flex; gap: 18px; margin-top: 14px; }` },
              { type: "tip", en: "`margin-left: auto` is the flexbox \"push to the end\" trick — it eats all free space to the element's left. No wrapper div needed.", fa: "‏`margin-left: auto` ترفند «هل بده ته سطر» توی فلکس‌باکسه — همه فضای خالی سمت چپ عنصر رو می‌بلعه. بدون نیاز به div راپر." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { font-family: sans-serif; }\n    .profile { display: flex; align-items: center; gap: 16px; width: 380px; margin: 30px auto;\n               padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; }\n    .avatar { width: 56px; height: 56px; border-radius: 50%; background-color: #0f172a; color: #67e8f9;\n              display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; }\n    .identity { flex: 1; }\n    .identity h2 { margin: 0 0 4px; font-size: 18px; }\n    .role { display: inline-block; padding: 2px 8px; border-radius: 999px; background-color: #ede9fe;\n            color: #6d28d9; font-size: 11px; font-weight: 700; }\n    .stats { display: flex; gap: 18px; margin-top: 14px; color: #64748b; font-size: 13px; }\n    .follow { margin-left: auto; padding: 8px 16px; border: 0; border-radius: 10px;\n              background-color: #0d9488; color: white; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <section class="profile">\n    <div class="avatar">SA</div>\n    <div class="identity">\n      <h2>Sara Ahmadi</h2>\n      <span class="role">Bug Hunter</span>\n      <div class="stats"><span>128 posts</span><span>4.2k followers</span><span>310 following</span></div>\n    </div>\n    <button class="follow">Follow</button>\n  </section>\n</body>\n</html>` },
              { type: "text", en: "Spacing rhythm: 16px between the big blocks (avatar/name/button), 4px inside the identity column, 14px before stats. Sizes come from the scale — nothing arbitrary. That's the difference between \"arranged\" and \"designed\".", fa: "ریتم فاصله‌ها: ‏۱۶ پیکسل بین بلاک‌های بزرگ (آواتار/اسم/دکمه)، ‏۴ پیکسل داخل ستون هویت و ‏۱۴ پیکسل قبل از آمار. اندازه‌ها از مقیاس میان — هیچ‌چیز شانسی نیست. همین فرق «چیده‌شده» و «طراحی‌شده» است." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What pushes the Follow button to the row's end without wrappers?", fa: "چی دکمه Follow رو بدون راپر ته سطر می‌فرسته؟" },
                options: [
                  { en: "float: right", fa: "float: right" },
                  { en: "margin-left: auto", fa: "margin-left: auto" },
                  { en: "position: absolute", fa: "position: absolute" },
                  { en: "text-align: right", fa: "text-align: right" },
                ],
                answer: 1,
                explain: { en: "Auto margin absorbs the free space — the flexbox-native push.", fa: "مارجین auto فضای خالی رو می‌بلعه — هل دادن بومی فلکس‌باکس." },
              },
              {
                q: { en: "The identity column uses flex: 1 so that…", fa: "ستون هویت ‏flex: 1 می‌گیره تا…" },
                options: [
                  { en: "It becomes exactly 1px wide", fa: "دقیقاً ۱ پیکسل عرض بگیره" },
                  { en: "It grows to fill the space between avatar and button", fa: "فضای بین آواتار و دکمه رو پر کنه" },
                  { en: "It scrolls", fa: "اسکرول بشه" },
                  { en: "The avatar shrinks", fa: "آواتار کوچیک شه" },
                ],
                answer: 1,
                explain: { en: "flex: 1 = grow to fill leftovers — the middle column breathes.", fa: "‏flex: 1 یعنی رشد کن و باقی‌مانده رو پر کن — ستون وسط نفس می‌کشه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Profile Header Card", fa: "کارت هدر پروفایل" },
            brief: { en: "Give .profile inline: display: flex; align-items: center; gap: 16px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; width: 380px. .avatar inline: width: 56px; height: 56px; border-radius: 50%; background-color: #0f172a; color: #67e8f9; display: flex; align-items: center; justify-content: center; font-size: 20px. .role inline: display: inline-block; padding: 2px 8px; border-radius: 999px; background-color: #ede9fe; color: #6d28d9; font-size: 11px; font-weight: 700. .stats inline: display: flex; gap: 18px; margin-top: 14px; color: #64748b; font-size: 13px. .follow button inline: margin-left: auto; padding: 8px 16px; border: 0; border-radius: 10px; background-color: #0d9488; color: white; cursor: pointer. Keep texts (SA, Sara Ahmadi, Bug Hunter, stats, Follow).", fa: "به .profile استایل درون‌خطی display: flex; align-items: center; gap: 16px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; width: 380px بده. ‏.avatar درون‌خطی: ‏width: 56px; height: 56px; border-radius: 50%; background-color: #0f172a; color: #67e8f9; display: flex; align-items: center; justify-content: center; font-size: 20px. ‏.role درون‌خطی: ‏display: inline-block; padding: 2px 8px; border-radius: 999px; background-color: #ede9fe; color: #6d28d9; font-size: 11px; font-weight: 700. ‏.stats درون‌خطی: ‏display: flex; gap: 18px; margin-top: 14px; color: #64748b; font-size: 13px. دکمه .follow درون‌خطی: ‏margin-left: auto; padding: 8px 16px; border: 0; border-radius: 10px; background-color: #0d9488; color: white; cursor: pointer. متن‌ها بمونن (SA، ‏Sara Ahmadi، ‏Bug Hunter، آمار و Follow)." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Profile header</title>\n</head>\n<body style="font-family: sans-serif;">\n  <!-- TODO: flex card recipe -->\n  <section class="profile">\n    <!-- TODO: circle avatar recipe -->\n    <div class="avatar">SA</div>\n    <div class="identity">\n      <h2 style="margin: 0 0 4px; font-size: 18px;">Sara Ahmadi</h2>\n      <!-- TODO: role pill recipe -->\n      <span class="role">Bug Hunter</span>\n      <!-- TODO: stats row recipe -->\n      <div class="stats"><span>128 posts</span><span>4.2k followers</span><span>310 following</span></div>\n    </div>\n    <!-- TODO: follow button recipe (push to the end!) -->\n    <button class="follow">Follow</button>\n  </section>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Profile header</title>\n</head>\n<body style="font-family: sans-serif;">\n  <section class="profile" style="display: flex; align-items: center; gap: 16px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; width: 380px; margin: 24px auto;">\n    <div class="avatar" style="width: 56px; height: 56px; border-radius: 50%; background-color: #0f172a; color: #67e8f9; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700;">SA</div>\n    <div class="identity" style="flex: 1;">\n      <h2 style="margin: 0 0 4px; font-size: 18px;">Sara Ahmadi</h2>\n      <span class="role" style="display: inline-block; padding: 2px 8px; border-radius: 999px; background-color: #ede9fe; color: #6d28d9; font-size: 11px; font-weight: 700;">Bug Hunter</span>\n      <div class="stats" style="display: flex; gap: 18px; margin-top: 14px; color: #64748b; font-size: 13px;"><span>128 posts</span><span>4.2k followers</span><span>310 following</span></div>\n    </div>\n    <button class="follow" style="margin-left: auto; padding: 8px 16px; border: 0; border-radius: 10px; background-color: #0d9488; color: white; cursor: pointer;">Follow</button>\n  </section>\n</body>\n</html>`,
            hints: [
              { en: "Five recipes: profile, avatar, role, stats, follow — work through the brief top to bottom.", fa: "پنج دستور: profile، avatar، role، stats و follow — بریف رو از بالا به پایین پیش برو." },
              { en: "The avatar text SA must stay inside the circle div.", fa: "متن SA باید داخل همون div دایره بمونه." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".profile", styleIncludes: "display: flex" },
                { selector: ".profile .avatar", styleIncludes: "border-radius: 50%" },
                { selector: ".profile .role", text: "Bug Hunter" },
                { selector: ".profile .stats", styleIncludes: "display: flex" },
                { selector: "button.follow", styleIncludes: "margin-left: auto" },
                { selector: "button.follow", text: "Follow" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m13",
    title: { en: "Final: Design Like a Pro", fa: "فینال: مثل یک حرفه‌ای طراحی کن" },
    blurb: {
      en: "Design tokens, spacing and type scales — then a capstone page that proves you're a designer now.",
      fa: "توکن‌های طراحی، مقیاس فاصله و تایپوگرافی — و بعد صفحه پایانی که ثابت می‌کنه حالا یه طراح هستی.",
    },
    lessons: [
      {
        id: "css-m13-l1",
        title: { en: "Design Tokens & CSS Variables", fa: "توکن‌های طراحی و متغیرهای CSS" },
        goal: { en: "Name your design decisions once and reuse them everywhere with var().", fa: "تصمیم‌های طراحی‌ات رو یک‌بار اسم‌گذاری کن و با ‏var() همه‌جا استفاده‌شون کن." },
        minutes: 13,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Pro sites don't repeat hex codes — they **name decisions**. A design token is a CSS variable: declare `--brand: #0d9488;` once on a scope (typically `:root`), read it anywhere inside with `var(--brand)`. Rebranding from teal to violet? Change ONE line and every button, badge and border follows. This is the machinery behind dark mode and theme pickers.", fa: "سایت‌های حرفه‌ای کدهای hex رو تکرار نمی‌کنن — **به تصمیم‌ها اسم می‌دن**. توکن طراحی یه متغیر CSSه: یک‌بار روی یه اسکوپ اعلامش کن (معمولاً `:root`)، بعد هرجا داخل اون اسکوپ بودی با `var(--brand)` بخونش. برند از فیروزه‌ای به بنفش عوض شد؟ فقط یه خط رو عوض کن — همه دکمه‌ها، نشان‌ها و بوردرها دنبالش عوض می‌شن. این همون موتوریه که پشت دارک‌مود و انتخاب‌گر تم‌هاست." },
              { type: "code", lang: "css", runnable: false, code: `:root {\n  --brand: #0d9488;\n  --ink: #0f172a;\n  --radius: 12px;\n}\n.btn   { background-color: var(--brand); border-radius: var(--radius); color: white; }\n.badge { color: var(--brand); border: 1px solid var(--brand); }` },
              { type: "tip", en: "Name tokens by ROLE, not by value: `--danger`, not `--red`. Values change (rebrands, dark mode); roles are forever.", fa: "توکن‌ها رو به *نقش* اسم‌گذاری کن نه به *مقدار*: ‏`--danger` نه `--red`. مقادیر عوض می‌شن (ری‌برند، دارک‌مود)؛ نقش‌ها همیشه می‌مونن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    .theme {\n      --brand: #7c3aed;\n      --radius: 14px;\n      --ink: #1e1b4b;\n      width: min(100%, 420px); margin: 30px auto; padding: 20px;\n      border: 1px solid #e2e8f0; border-radius: var(--radius); font-family: sans-serif;\n    }\n    .title { color: var(--ink); margin: 0 0 12px; }\n    .chip { display: inline-block; padding: 8px 16px; border-radius: var(--radius);\n            background-color: var(--brand); color: white; margin-right: 8px; }\n    .ghost { background-color: transparent; color: var(--brand); border: 2px solid var(--brand); }\n  </style>\n</head>\n<body>\n  <div class="theme">\n    <h2 class="title">Violet theme, one variable</h2>\n    <span class="chip">Pro</span>\n    <span class="chip ghost">Ghost</span>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The variables live on `.theme`, so every child inherits them — swap `--brand` to `#0d9488` in your head and picture the whole card re-skinning instantly. Variables cascade like inheritance: the scope decides who sees them.", fa: "متغیرها روی `.theme` زندگی می‌کنن پس همه بچه‌ها ارث می‌برن — توی ذهنت `--brand` رو به `#0d9488` عوض کن و تصور کن کل کارت در لحظه پوسته عوض می‌کنه. متغیرها مثل ارث‌بری cascade می‌شن: اسکوپ تصمیم می‌گیره کی می‌بینه‌شون." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How do you READ a token inside a declaration?", fa: "خوندن توکن داخل یه تعریف چطوره؟" },
                options: [
                  { en: "@brand", fa: "@brand" },
                  { en: "var(--brand)", fa: "var(--brand)" },
                  { en: "$(brand)", fa: "$(brand)" },
                  { en: "token(brand)", fa: "token(brand)" },
                ],
                answer: 1,
                explain: { en: "`--name` declares, `var(--name)` reads.", fa: "‏`--name` اعلام می‌کنه، ‏`var(--name)` می‌خونه." },
              },
              {
                q: { en: "Why is --danger a better token name than --red?", fa: "چرا ‏--danger اسم بهتری از --red برای توکنه؟" },
                options: [
                  { en: "It's shorter", fa: "کوتاه‌تره" },
                  { en: "Names by role survive rebrands and dark modes", fa: "اسمِ نقش از ری‌برند و دارک‌مود جان به در می‌بره" },
                  { en: "CSS requires it", fa: "CSS الزامش کرده" },
                  { en: "It renders faster", fa: "سریع‌تر رندر می‌شه" },
                ],
                answer: 1,
                explain: { en: "Danger can become orange in dark mode — the role never changes, the value can.", fa: "‏danger توی دارک‌مود می‌تونه نارنجی شه — نقش هیچ‌وقت عوض نمی‌شه، مقدار می‌شه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Token Theme", fa: "تم توکنی" },
            brief: { en: "Give .theme inline custom properties: --brand: #7c3aed; --radius: 14px; --ink: #1e1b4b. Give .chip inline: display: inline-block; padding: 8px 16px; border-radius: var(--radius); background-color: var(--brand); color: white. Give .title inline: color: var(--ink). Keep texts. The raw hex codes are now banned from children — everything reads var().", fa: "به .theme متغیرهای سفارشی درون‌خطی بده: ‏--brand: #7c3aed; --radius: 14px; --ink: #1e1b4b. به .chip استایل درون‌خطی display: inline-block; padding: 8px 16px; border-radius: var(--radius); background-color: var(--brand); color: white بده. به .title استایل درون‌خطی color: var(--ink) بده. متن‌ها بمونن. از این به بعد کد خام hex روی بچه‌ها ممنوعه — همه‌چیز با ‏var() خونده می‌شه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Token theme</title>\n</head>\n<body style="font-family: sans-serif;">\n  <!-- TODO: declare the three custom properties here -->\n  <div class="theme" style="width: min(100%, 420px); margin: 24px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 14px;">\n    <!-- TODO: color: var(--ink) instead of raw hex -->\n    <h2 class="title" style="margin: 0 0 12px; color: #1e1b4b;">Violet theme, one variable</h2>\n    <!-- TODO: border-radius + background via var() -->\n    <span class="chip" style="display: inline-block; padding: 8px 16px; border-radius: 14px; background-color: #7c3aed; color: white;">Pro</span>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Token theme</title>\n</head>\n<body style="font-family: sans-serif;">\n  <div class="theme" style="--brand: #7c3aed; --radius: 14px; --ink: #1e1b4b; width: min(100%, 420px); margin: 24px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: var(--radius);">\n    <h2 class="title" style="margin: 0 0 12px; color: var(--ink);">Violet theme, one variable</h2>\n    <span class="chip" style="display: inline-block; padding: 8px 16px; border-radius: var(--radius); background-color: var(--brand); color: white;">Pro</span>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Custom properties are declared like normal declarations — just with two dashes: --brand: #7c3aed;", fa: "متغیرهای سفارشی مثل تعریف‌های عادی اعلام می‌شن — فقط با دو خط تیره: ‏--brand: #7c3aed;" },
              { en: "Children read with var() — background-color: var(--brand) — the literal hex is now banned.", fa: "بچه‌ها با ‏var() می‌خونن — ‏background-color: var(--brand) — از این به بعد hex خام ممنوع." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".theme", styleIncludes: "--brand: #7c3aed" },
                { selector: ".theme", styleIncludes: "--radius: 14px" },
                { selector: ".chip", styleIncludes: "background-color: var(--brand)" },
                { selector: ".chip", styleIncludes: "border-radius: var(--radius)" },
                { selector: ".title", styleIncludes: "color: var(--ink)" },
                { selector: ".chip", text: "Pro" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m13-l2",
        title: { en: "Spacing & Type Scale", fa: "مقیاس فاصله و تایپوگرافی" },
        goal: { en: "Replace random sizes with a 4/8 spacing grid and a modular type scale.", fa: "اندازه‌های تصادفی رو با گرید فاصله ۴/۸ و مقیاس تایپوگرافی جایگزین کن." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Amateurs pick sizes by feel; pros pick from a **scale**. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64 — the 4/8 system, every gap a multiple of 4. Type scale: 12, 14, 16, 20, 24, 32, 48 — body at 16, one step up for h3, bigger jumps for h1. Two ladders, and suddenly every page has rhythm — users feel it without ever seeing it.", fa: "تازه‌کارها اندازه رو با حس انتخاب می‌کنن؛ حرفه‌ای‌ها از روی **مقیاس**. مقیاس فاصله: ‏۴، ‏۸، ‏۱۲، ‏۱۶، ‏۲۴، ‏۳۲، ‏۴۸، ‏۶۴ — سیستم ۴/۸ که هر فاصله‌ای مضرب ۴ هست. مقیاس تایپ: ‏۱۲، ‏۱۴، ‏۱۶، ‏۲۰، ‏۲۴، ‏۳۲، ‏۴۸ — ‏body روی ۱۶، یه پله بالاتر برای h3 و پله‌های بزرگ‌تر برای h1. دو تا نردبون، و ناگهان هر صفحه‌ای ریتم می‌گیره — کاربر حسش می‌کنه بدون این‌که ببینه‌ش." },
              { type: "code", lang: "css", runnable: false, code: `p     { font-size: 16px; line-height: 1.7; margin: 0 0 16px; }\nh3    { font-size: 20px; margin: 24px 0 8px; }\n.meta { font-size: 12px; color: #64748b; }\n.card { padding: 24px; }   /* section-to-section gap: 32 */` },
              { type: "warn", en: "Two elements 10px apart, neighbors 14px, a random 26px padding — nobody can say WHY. Arbitrary sizes leak chaos; scales leak calm.", fa: "دو عنصر با ۱۰ پیکسل فاصله، همسایه‌ها ۱۴ و یه پدینگ شانسی ۲۶ — هیچ‌کی نمی‌تونه بگه *چرا*. اندازه‌های تصادفی آشوب نشت می‌دن؛ مقیاس‌ها آرامش." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    body { font-family: sans-serif; margin: 0; }\n    .duo { display: flex; gap: 20px; padding: 20px; flex-wrap: wrap; }\n    .page { flex: 1; min-width: 220px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; }\n    .rand h1 { font-size: 31px; margin: 0 0 5px; }\n    .rand p  { font-size: 15px; margin: 0 0 9px; line-height: 1.45; }\n    .rand .tag { font-size: 13px; }\n    .scale h1 { font-size: 32px; margin: 0 0 8px; }\n    .scale p  { font-size: 16px; margin: 0 0 16px; line-height: 1.7; }\n    .scale .tag { font-size: 12px; color: #64748b; }\n  </style>\n</head>\n<body>\n  <div class="duo">\n    <div class="page rand"><h1>Ship Notes</h1><p>Same words, arbitrary sizes. Nothing is wrong, nothing sings.</p><span class="tag">v1.2</span></div>\n    <div class="page scale"><h1>Ship Notes</h1><p>Same words, 4/8 spacing and ×2 type steps. Instantly calmer.</p><span class="tag">v1.2</span></div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Left vs right: same content, same fonts — only the ladder changed. Body line-height lands at 1.6–1.7 (headings tighter, around 1.2). That \"calm\" you feel is consistency, and consistency is just a scale, applied.", fa: "چپ در برابر راست: همون محتوا و همون فونت — فقط نردبون عوض شده. line-height متن بدنه روی ۱٫۶ تا ۱٫۷ می‌شینه (تیترها جمع‌تر، حدود ۱٫۲). اون «آرامشی» که حس می‌کنی یکدستیه، و یکدستی هم فقط یه مقیاسه که اعمال شده." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which set belongs to the 4/8 spacing system?", fa: "کدوم مجموعه به سیستم فاصله ۴/۸ تعلق داره؟" },
                options: [
                  { en: "5, 11, 17, 23", fa: "۵، ‏۱۱، ‏۱۷، ‏۲۳" },
                  { en: "4, 8, 12, 16, 24, 32", fa: "۴، ‏۸، ‏۱۲، ‏۱۶، ‏۲۴، ‏۳۲" },
                  { en: "10, 20, 30, 40", fa: "۱۰، ‏۲۰، ‏۳۰، ‏۴۰" },
                  { en: "1, 2, 3, 5, 8", fa: "۱، ‏۲، ‏۳، ‏۵، ‏۸" },
                ],
                answer: 1,
                explain: { en: "Multiples of 4 — hands and eyes agree on them.", fa: "مضرب‌های ۴ — دست و چشم روی این‌ها توافق دارن." },
              },
              {
                q: { en: "Comfortable body line-height?", fa: "‏line-height راحت برای متن بدنه؟" },
                options: [
                  { en: "1.0 — tight like a heading", fa: "۱٫۰ — چسبیده مثل تیتر" },
                  { en: "1.6–1.7", fa: "۱٫۶ تا ۱٫۷" },
                  { en: "2.5 — airy everywhere", fa: "۲٫۵ — همه‌جا فضادار" },
                  { en: "0.8", fa: "۰٫۸" },
                ],
                answer: 1,
                explain: { en: "1.6–1.7 for paragraphs; around 1.2 for headings.", fa: "‏۱٫۶ تا ۱٫۷ برای پاراگراف؛ حدود ۱٫۲ برای تیترها." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Scale the Page", fa: "صفحه رو مقیاس‌دار کن" },
            brief: { en: "Apply the scale with inline styles: the h1 gets font-size: 48px. The p gets font-size: 16px; line-height: 1.7; margin: 0 0 16px. .meta gets font-size: 12px; color: #64748b. The .card gets padding: 24px. Keep texts and structure — every size must come from the ladder.", fa: "مقیاس رو با استایل درون‌خطی اعمال کن: ‏h1 می‌گیره ‏font-size: 48px. ‏p می‌گیره ‏font-size: 16px; line-height: 1.7; margin: 0 0 16px. ‏.meta می‌گیره ‏font-size: 12px; color: #64748b. ‏.card می‌گیره ‏padding: 24px. متن‌ها و ساختار بمونن — هر اندازه باید از نردبون بیاد." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Ship Notes</title>\n</head>\n<body style="font-family: sans-serif;">\n  <!-- TODO: padding: 24px -->\n  <article class="card">\n    <!-- TODO: font-size: 48px -->\n    <h1 style="margin: 0 0 8px;">Ship Notes</h1>\n    <!-- TODO: 16px body + line-height 1.7 + margin 0 0 16px -->\n    <p>Release 2.0 is out: faster feeds, darker dark mode, zero new bugs (we counted).</p>\n    <!-- TODO: 12px muted meta -->\n    <div class="meta">v2.0 · 5 min read</div>\n  </article>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Ship Notes</title>\n</head>\n<body style="font-family: sans-serif;">\n  <article class="card" style="padding: 24px; width: min(100%, 420px); margin: 24px auto;">\n    <h1 style="margin: 0 0 8px; font-size: 48px;">Ship Notes</h1>\n    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px; color: #475569;">Release 2.0 is out: faster feeds, darker dark mode, zero new bugs (we counted).</p>\n    <div class="meta" style="font-size: 12px; color: #64748b;">v2.0 · 5 min read</div>\n  </article>\n</body>\n</html>`,
            hints: [
              { en: "Five recipes from the brief: h1, p (three declarations), meta (two), card.", fa: "پنج دستور از بریف: ‏h1 و p (سه تعریف) و meta (دو تعریف) و card." },
              { en: "Sizes must be exact ladder values: 48, 16, 12, 24 — no neighbors.", fa: "اندازه‌ها باید دقیقاً پله‌های نردبون باشن: ‏۴۸، ‏۱۶، ‏۱۲، ‏۲۴ — بدون پله‌های مجاور." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", styleIncludes: "font-size: 48px" },
                { selector: "p", styleIncludes: "line-height: 1.7" },
                { selector: "p", styleIncludes: "margin: 0 0 16px" },
                { selector: ".meta", styleIncludes: "font-size: 12px" },
                { selector: ".card", styleIncludes: "padding: 24px" },
                { selector: ".card h1", text: "Ship Notes" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m13-l3",
        title: { en: "The Polish Pass", fa: "پاس صیقل" },
        goal: { en: "Turn functional into premium: layered shadows, consistent radius, real contrast.", fa: "کارکردی رو به پریمیوم تبدیل کن: سایه‌های لایه‌ای، گردی یکدست و کنتراست واقعی." },
        minutes: 12,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Polish is a checklist, not magic: **one radius family** (pick 10–14px and stay loyal), **layered shadows** (a tight 1px contact shadow + a wide soft one — never flat gray blobs), **hairline borders** (#e2e8f0) to define edges on light UI, and **real contrast** — body text at #475569+ on white, never #cbd5e1. The same recipe applied everywhere is what reads as \"premium\".", fa: "صیقل یه چک‌لیست‌ه نه جادو: **یه خانواده رادیوس** (۱۰ تا ۱۴ پیکسل انتخاب کن و وفادار بمون)، **سایه‌های لایه‌ای** (یه سایه تماس ۱ پیکسلی جمع‌شده + یه سایه پهن و نرم — هیچ‌وقت لکه خاکستری تخت)، **بوردرهای مویی** (‏#e2e8f0) برای تعریف لبه‌ها در UI روشن و **کنتراست واقعی** — متن بدنه روی سفید حداقل ‏#475569، هیچ‌وقت ‏#cbd5e1. همون دستور که همه‌جا اعمال شه همون چیزیه که «پریمیوم» خونده می‌شه." },
              { type: "code", lang: "css", runnable: false, code: `.card {\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  box-shadow: 0 1px 2px rgba(2, 8, 23, 0.06), 0 8px 24px rgba(2, 8, 23, 0.12);\n}\n.btn:focus-visible { outline: 3px solid rgba(13, 148, 136, 0.4); outline-offset: 2px; }` },
              { type: "tip", en: "Shadows are ~90% transparency: rgba(2, 8, 23, 0.12) at a large blur. Opaque gray shadows look like smudges.", fa: "سایه‌ها حدود ۹۰٪ شفافیت‌ان: ‏rgba(2, 8, 23, 0.12) با blur بزرگ. سایه‌های خاکستری مات مثل لکه روی صفحه دیده می‌شن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { font-family: sans-serif; margin: 0; padding: 24px; display: flex; gap: 20px; flex-wrap: wrap; }\n    .rough, .polished { flex: 1; min-width: 220px; padding: 20px; }\n    .rough { border: 3px solid #94a3b8; }\n    .rough h3 { margin: 0 0 6px; font-size: 19px; }\n    .rough p { margin: 0 0 12px; color: #cbd5e1; font-size: 14px; }\n    .rough button { padding: 6px 12px; border-radius: 3px; border: 0; background-color: #0d9488; color: white; }\n    .polished { border: 1px solid #e2e8f0; border-radius: 14px;\n                box-shadow: 0 1px 2px rgba(2, 8, 23, 0.06), 0 8px 24px rgba(2, 8, 23, 0.12); }\n    .polished h3 { margin: 0 0 6px; font-size: 20px; }\n    .polished p { margin: 0 0 16px; color: #475569; font-size: 14px; line-height: 1.7; }\n    .polished button { padding: 8px 16px; border-radius: 10px; border: 0; background-color: #0d9488; color: white; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class="rough"><h3>Before</h3><p>Thick border, low contrast, sharp button.</p><button>Meh</button></div>\n  <div class="polished"><h3>After</h3><p>Hairline border, readable text, soft depth.</p><button>Take my money</button></div>\n</body>\n</html>` },
              { type: "text", en: "Same layout, same colors — the right card just respects the checklist. One more professional habit: `:focus-visible` rings for keyboard users. Polish that only mouse users get isn't polish — it's exclusion.", fa: "همون چیدمان و همون رنگ‌ها — کارت راست فقط چک‌لیست رو رعایت کرده. یه عادت حرفه‌ای دیگه: حلقه‌های `:focus-visible` برای کاربران کیبورد. صیقلی‌ای که فقط کاربر موس ببینه صیقل نیست — طرد کردنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "A professional shadow is…", fa: "یه سایه حرفه‌ای …" },
                options: [
                  { en: "Solid gray, close behind", fa: "خاکستری توپر و چسبیده به عنصر" },
                  { en: "Black at low opacity with a large blur", fa: "مشکی با شفافیت کم و blur بزرگ" },
                  { en: "Red for attention", fa: "قرمز برای جلب توجه" },
                  { en: "Only for dark mode", fa: "فقط برای دارک‌مود" },
                ],
                answer: 1,
                explain: { en: "Soft, transparent, directional — depth without dirt.", fa: "نرم، شفاف و جهت‌دار — عمق بدون کثیفی." },
              },
              {
                q: { en: "Why :focus-visible instead of :focus?", fa: "چرا ‏:focus-visible به‌جای :focus؟" },
                options: [
                  { en: "It's faster", fa: "سریع‌تره" },
                  { en: "It shows the ring for keyboard focus but not mouse clicks", fa: "حلقه رو برای فوکوس کیبورد نشون می‌ده ولی برای کلیک موس نه" },
                  { en: "It works only on mobile", fa: "فقط روی موبایل کار می‌کنه" },
                  { en: "No reason", fa: "دلیل خاصی نداره" },
                ],
                answer: 1,
                explain: { en: "Keyboard users keep their ring; mouse users skip the flash.", fa: "کاربر کیبورد حلقه‌شو داره؛ کاربر موس از فلاش راحت می‌شه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Polish the Card", fa: "کارت رو صیقل بده" },
            brief: { en: "Give .card inline: border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 2px rgba(2, 8, 23, 0.06), 0 8px 24px rgba(2, 8, 23, 0.12); padding: 20px. Give the .save button inline: padding: 8px 16px; border: 0; border-radius: 10px; background-color: #0d9488; color: white; cursor: pointer. Keep texts.", fa: "به .card استایل درون‌خطی border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 2px rgba(2, 8, 23, 0.06), 0 8px 24px rgba(2, 8, 23, 0.12); padding: 20px بده. به دکمه .save استایل درون‌خطی padding: 8px 16px; border: 0; border-radius: 10px; background-color: #0d9488; color: white; cursor: pointer بده. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Polish pass</title>\n</head>\n<body style="font-family: sans-serif;">\n  <!-- TODO: hairline border + radius 14 + two-layer shadow -->\n  <div class="card" style="border: 3px solid #94a3b8; padding: 20px; width: min(100%, 380px); margin: 24px auto;">\n    <h3 style="margin: 0 0 6px; font-size: 20px;">Release Notes</h3>\n    <!-- TODO: bump contrast: #475569 -->\n    <p style="margin: 0 0 16px; color: #cbd5e1; font-size: 14px; line-height: 1.7;">Version 2.0 ships tonight at midnight.</p>\n    <!-- TODO: radius 10 + teal skin -->\n    <button class="save" style="padding: 6px 12px; border: 0; color: white;">Save</button>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Polish pass</title>\n</head>\n<body style="font-family: sans-serif;">\n  <div class="card" style="border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 2px rgba(2, 8, 23, 0.06), 0 8px 24px rgba(2, 8, 23, 0.12); padding: 20px; width: min(100%, 380px); margin: 24px auto;">\n    <h3 style="margin: 0 0 6px; font-size: 20px;">Release Notes</h3>\n    <p style="margin: 0 0 16px; color: #475569; font-size: 14px; line-height: 1.7;">Version 2.0 ships tonight at midnight.</p>\n    <button class="save" style="padding: 8px 16px; border: 0; border-radius: 10px; background-color: #0d9488; color: white; cursor: pointer;">Save</button>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Swap the 3px border for the hairline: 1px solid #e2e8f0, then add radius and the two-layer shadow.", fa: "بوردر ۳ پیکسلی رو با خط مویی عوض کن: ‏1px solid #e2e8f0، بعد رادیوس و سایه دولایه." },
              { en: "Copy the shadow value from the brief exactly — both layers, comma included.", fa: "مقدار سایه رو دقیق از بریف کپی کن — هر دو لایه، با ویرگول." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".card", styleIncludes: "border: 1px solid #e2e8f0" },
                { selector: ".card", styleIncludes: "border-radius: 14px" },
                { selector: ".card", styleIncludes: "box-shadow: 0 1px 2px rgba(2, 8, 23, 0.06), 0 8px 24px rgba(2, 8, 23, 0.12)" },
                { selector: ".card h3", text: "Release Notes" },
                { selector: "button.save", styleIncludes: "border-radius: 10px" },
                { selector: "button.save", styleIncludes: "background-color: #0d9488" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m13-l4",
        title: { en: "FINAL PROJECT: Capstone Page", fa: "پروژه پایانی: صفحه فینال" },
        goal: { en: "Ship a complete product page — navbar, hero, feature grid, footer — wearing every skill from this course.", fa: "یک صفحه محصول کامل تحویل بده — ناوبری، هیرو، گرید ویژگی‌ها و فوتر — با تمام مهارت‌های این دوره." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The capstone assembles the whole course in one page: a **navbar** (flex + space-between — module 5), a **hero** with scaled type and a pill CTA (modules 2 and 9), a **feature grid** (module 7), and a muted **footer**. Pro build order: shell first (sections + layout), content second, polish last. Never decorate a structure you haven't built.", fa: "پروژه فینال کل دوره رو توی یه صفحه سرهم می‌کنه: یه **navbar** (فلکس + space-between — ماژول ۵)، یه **هیرو** با تایپ مقیاس‌دار و دکمه قرصی CTA (ماژول‌های ۲ و ۹)، یه **گرید ویژگی‌ها** (ماژول ۷) و یه **فوتر** کم‌رنگ. ترتیب حرفه‌ای ساخت: اول اسکلت (بخش‌ها + چیدمان)، بعد محتوا و آخر صیقل. هرگز ساختاری که نساختی رو تزئین نکن." },
              { type: "code", lang: "css", runnable: false, code: `.bar  { display: flex; align-items: center; justify-content: space-between; }\n.hero { text-align: center; padding: 48px 20px; }\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n.feat { border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; }` },
              { type: "tip", en: "One accent color, reused everywhere via tokens, is what makes a page feel *designed* rather than assembled.", fa: "یه رنگ اکسنت که همه‌جا با توکن‌ها استفاده می‌شه، همون چیزیه که صفحه رو *طراحی‌شده* حس می‌کنه نه *سرهم‌شده*." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Final quality gate — run this before calling ANY page done: viewport meta ✓ · one flex/grid layout skeleton ✓ · exactly one primary button ✓ · one radius family ✓ · type scale, not arbitrary sizes ✓ · hover transitions ✓ · muted meta/footer text ✓. This checklist is the difference between a page that works and a page that ships.", fa: "دروازه نهایی کیفیت — قبل از این‌که هر صفحه‌ای رو «تمام» اعلام کنی اجراش کن: متای viewport ✓ · یه اسکلت چیدمان flex/grid ✓ · دقیقاً یه دکمه primary ✓ · یه خانواده رادیوس ✓ · مقیاس تایپ، نه اندازه‌های تصادفی ✓ · ترنزیشن‌های hover ✓ · متن کم‌رنگ برای متا/فوتر ✓. همین چک‌لیست فرق صفحه‌ایه که کار می‌کنه با صفحه‌ای که تحویل داده می‌شه." },
              { type: "code", lang: "html", runnable: false, code: `<nav class="bar"><span class="brand">TEKA</span><div class="links">…</div></nav>\n<section class="hero"><h1>…</h1><button class="cta">…</button></section>\n<section class="grid">\n  <article class="feat">…</article> ×3\n</section>\n<footer>…</footer>` },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Professional build order for a new page?", fa: "ترتیب حرفه‌ای ساخت یه صفحه جدید؟" },
                options: [
                  { en: "Polish first, structure later", fa: "اول صیقل، بعد ساختار" },
                  { en: "Shell → content → polish", fa: "اسکلت → محتوا → صیقل" },
                  { en: "Footer first", fa: "اول فوتر" },
                  { en: "Random — creativity!", fa: "شانسی — خلاقیت!" },
                ],
                answer: 1,
                explain: { en: "Layout skeleton, then fill, then decorate — decorating air wastes effort.", fa: "اول اسکلت چیدمان، بعد پر کردن، بعد تزئین — تزئینِ هدر رفتنه." },
              },
              {
                q: { en: "The hero CTA should be…", fa: "دکمه CTA هیرو باید…" },
                options: [
                  { en: "A ghost button", fa: "یه دکمه ghost" },
                  { en: "The page's one solid primary, impossible to miss", fa: "همون تک دکمه primary توپر صفحه، که از دور معلومه" },
                  { en: "Five of them", fa: "پنج‌تا ازش" },
                  { en: "A plain underlined link", fa: "یه لینک ساده زیرخط‌دار" },
                ],
                answer: 1,
                explain: { en: "One solid primary = the eye's single decision point.", fa: "یه primary توپر = تنها نقطه تصمیم چشم." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Ship the Capstone", fa: "صفحه فینال رو تحویل بده" },
            brief: { en: "Build the page with inline styles: nav.bar gets display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #e2e8f0 (keep .brand text TEKA and the two links Features / Pricing). section.hero gets text-align: center; padding: 48px 20px (keep the h1). button.cta gets padding: 12px 24px; border: 0; border-radius: 999px; background-color: #0d9488; color: white; font-size: 16px; cursor: pointer; text Start free. div.grid gets display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 0 20px; and EACH .feat gets border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px. Keep texts Tokens / Scale / Polish.", fa: "صفحه رو با استایل درون‌خطی بساز: ‏nav کلاس bar می‌گیره ‏display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #e2e8f0 (متن ‏.brand یعنی TEKA و دو لینک Features / Pricing بمونن). ‏section کلاس hero می‌گیره ‏text-align: center; padding: 48px 20px (‏h1 بمونه). دکمه .cta می‌گیره ‏padding: 12px 24px; border: 0; border-radius: 999px; background-color: #0d9488; color: white; font-size: 16px; cursor: pointer و متن ‏Start free. ‏div کلاس grid می‌گیره ‏display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 0 20px؛ و هر .feat می‌گیره ‏border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px. متن‌های Tokens / Scale / Polish بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>TEKA — Design like a pro</title>\n</head>\n<body style="font-family: sans-serif; margin: 0;">\n  <!-- TODO: flex + space-between bar -->\n  <nav class="bar">\n    <span class="brand" style="font-weight: 800;">TEKA</span>\n    <div class="links" style="display: flex; gap: 16px;">\n      <a href="#">Features</a>\n      <a href="#">Pricing</a>\n    </div>\n  </nav>\n  <!-- TODO: centered hero -->\n  <section class="hero">\n    <h1 style="margin: 0 0 8px; font-size: 48px;">Design like a pro</h1>\n    <p style="margin: 0 0 24px; color: #475569;">Eight modules of CSS, one page to prove it.</p>\n    <!-- TODO: pill CTA recipe -->\n    <button class="cta">Start free</button>\n  </section>\n  <!-- TODO: 3-column grid recipe -->\n  <div class="grid">\n    <!-- TODO: feat card recipe ×3 -->\n    <article class="feat"><h3 style="margin: 0 0 6px;">Tokens</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Name it once, use it everywhere.</p></article>\n    <article class="feat"><h3 style="margin: 0 0 6px;">Scale</h3><p style="margin: 0; color: #64748b; font-size: 14px;">4/8 spacing, ×2 type steps.</p></article>\n    <article class="feat"><h3 style="margin: 0 0 6px;">Polish</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Soft shadows, real contrast.</p></article>\n  </div>\n  <footer style="padding: 20px; text-align: center; color: #64748b; font-size: 12px;">Built with TEKA Academy</footer>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>TEKA — Design like a pro</title>\n</head>\n<body style="font-family: sans-serif; margin: 0;">\n  <nav class="bar" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #e2e8f0;">\n    <span class="brand" style="font-weight: 800;">TEKA</span>\n    <div class="links" style="display: flex; gap: 16px;">\n      <a href="#">Features</a>\n      <a href="#">Pricing</a>\n    </div>\n  </nav>\n  <section class="hero" style="text-align: center; padding: 48px 20px;">\n    <h1 style="margin: 0 0 8px; font-size: 48px;">Design like a pro</h1>\n    <p style="margin: 0 0 24px; color: #475569;">Eight modules of CSS, one page to prove it.</p>\n    <button class="cta" style="padding: 12px 24px; border: 0; border-radius: 999px; background-color: #0d9488; color: white; font-size: 16px; cursor: pointer;">Start free</button>\n  </section>\n  <div class="grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 0 20px;">\n    <article class="feat" style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px;"><h3 style="margin: 0 0 6px;">Tokens</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Name it once, use it everywhere.</p></article>\n    <article class="feat" style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px;"><h3 style="margin: 0 0 6px;">Scale</h3><p style="margin: 0; color: #64748b; font-size: 14px;">4/8 spacing, ×2 type steps.</p></article>\n    <article class="feat" style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px;"><h3 style="margin: 0 0 6px;">Polish</h3><p style="margin: 0; color: #64748b; font-size: 14px;">Soft shadows, real contrast.</p></article>\n  </div>\n  <footer style="padding: 20px; text-align: center; color: #64748b; font-size: 12px;">Built with TEKA Academy</footer>\n</body>\n</html>`,
            hints: [
              { en: "Four recipes — bar, hero+cta, grid, feat(×3). The brief lists every declaration.", fa: "چهار دستور — bar و hero+cta و grid و ‏feat(×۳). بریف همه تعریف‌ها رو لیست کرده." },
              { en: "repeat(3, 1fr) — mind the comma and both 1fr's. Count your .feat cards: three.", fa: "‏repeat(3, 1fr) — ویرگول و هر دو ‏1fr رو چک کن. کارت‌های .feat رو بشمار: سه‌تا." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "nav.bar", styleIncludes: "display: flex" },
                { selector: "nav.bar", styleIncludes: "justify-content: space-between" },
                { selector: ".brand", text: "TEKA" },
                { selector: "button.cta", text: "Start free" },
                { selector: "button.cta", styleIncludes: "border-radius: 999px" },
                { selector: ".grid", styleIncludes: "display: grid" },
                { selector: ".grid", styleIncludes: "grid-template-columns: repeat(3, 1fr)" },
                { selector: ".feat", count: 3 },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m14",
    title: { en: "Advanced Layout", fa: "چیدمان پیشرفته" },
    blurb: {
      en: "The big-page patterns: holy grail shells, sticky footers and centering anything, anywhere.",
      fa: "الگوهای صفحه‌های بزرگ: اسکلت هالی‌گریل، فوتر چسبان و وسط‌چین‌کردن هر چیز، هر جا.",
    },
    lessons: [
      {
        id: "css-m14-l1",
        title: { en: "The Holy Grail, Grid Edition", fa: "هالی‌گریل با گرید" },
        goal: { en: "Assemble the classic header / sidebar / main / footer shell with one grid.", fa: "اسکلت کلاسیک هدر، سایدبار، محتوا و فوتر رو با فقط یک گرید سوار کن." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The **holy grail** is the classic app/page skeleton: a header across the top, a footer across the bottom, and a sidebar + main area in between. One grid on the wrapper handles all four zones: `grid-template-columns` splits sidebar from content, `grid-template-rows` sizes the header, body and footer bands, and `min-height: 100vh` makes the shell fill the whole screen. Four zones, zero floats, zero nested wrappers.", fa: "**هالی‌گریل** اسکلت کلاسیک اپلیکیشن و صفحه‌ست: هدر در بالا، فوتر در پایین و سایدبار + محتوا بین این دو. فقط یک گرید روی والد، هر چهار ناحیه رو مدیریت می‌کنه: ‏`grid-template-columns` سایدبار رو از محتوا جدا می‌کنه، ‏`grid-template-rows` ارتفاع نوار هدر و بدنه و فوتر رو تنظیم می‌کنه و ‏`min-height: 100vh` اسکلت رو حداقل به اندازه کل صفحه می‌کنه. چهار ناحیه، بدون float و بدون wrapper تودرتو." },
              { type: "code", lang: "css", runnable: false, code: `.layout {\n  display: grid;\n  grid-template-columns: 220px 1fr; /* sidebar | main */\n  grid-template-rows: auto 1fr auto; /* head | body | foot */\n  min-height: 100vh;\n}\nheader, footer { grid-column: 1 / -1; }` },
              { type: "tip", en: "`1fr` means one fraction of whatever is LEFT — the sidebar takes its 220px and main swallows the rest. And `1 / -1` means from the first grid line to the last: the fast way to span all columns.", fa: "‏`1fr` یعنی یک سهم از فضایی که *باقی مونده* — سایدبار ‏220px خودش رو برمی‌داره و main بقیه رو قورت می‌ده. ‏`1 / -1` هم یعنی از خط اول گرید تا آخرین خط: سریع‌ترین راه برای پوشش همه ستون‌ها." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    * { box-sizing: border-box; }\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .layout {\n      display: grid;\n      grid-template-columns: 200px 1fr;\n      grid-template-rows: auto 1fr auto;\n      min-height: 100vh;\n    }\n    header, footer { grid-column: 1 / -1; }\n    header { padding: 14px 20px; background-color: #0f172a; color: #67e8f9; font-weight: 800; }\n    aside  { padding: 16px; background-color: #f8fafc; border-right: 1px solid #e2e8f0; }\n    main   { padding: 20px; }\n    footer { padding: 14px 20px; background-color: #0f172a; color: #94a3b8; font-size: 12px; }\n  </style>\n</head>\n<body>\n  <div class="layout">\n    <header>TEKA Admin</header>\n    <aside>Dashboard<br>Reports<br>Settings</aside>\n    <main>\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Overview</h1>\n      <p style="margin: 0; color: #475569;">One grid owns everything: header, sidebar, main, footer.</p>\n    </main>\n    <footer>© 2025 TEKA</footer>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Watch the auto-placement: header and footer declare `grid-column: 1 / -1`, so aside and main slide into the middle row's two columns all by themselves. Declare the exceptions; let the grid handle the rest.", fa: "به جای‌گذاری خودکار دقت کن: هدر و فوتر ‏`grid-column: 1 / -1` رو اعلام می‌کنن، در نتیجه aside و main خودشون می‌رن توی دو ستون ردیف وسط. استثناها رو اعلام کن؛ بقیه رو به گرید بسپار." },
              { type: "warn", en: "Never set `height: 100vh` on the shell — long content will overflow. `min-height` fills short screens and grows when needed.", fa: "هیچ‌وقت روی اسکلت ‏`height: 100vh` نذار — محتوای بلند سرریز می‌شه. ‏min-height صفحه‌های کوتاه رو پر می‌کنه و هر وقت لازم شد بزرگ می‌شه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In `grid-template-columns: 220px 1fr`, what does 1fr mean?", fa: "در ‏`grid-template-columns: 220px 1fr` مقدار ‏1fr یعنی چی؟" },
                options: [
                  { en: "Exactly 220 pixels", fa: "دقیقاً ‏۲۲۰ پیکسل" },
                  { en: "One fraction of the space left after the 220px column", fa: "یک سهم از فضای باقی‌مانده بعد از ستون ‏۲۲۰ پیکسلی" },
                  { en: "One percent of the page", fa: "یک درصد از صفحه" },
                  { en: "It forces the layout into one equal column", fa: "چیدمان رو به یک ستون مساوی محدود می‌کنه" },
                ],
                answer: 1,
                explain: { en: "fr = fraction of the REMAINING space. The 220px is carved out first, 1fr gets everything else.", fa: "‏fr یعنی سهم از فضای *باقی‌مانده*. اول ‏220px کنار گذاشته می‌شه، بعد ‏1fr همه بقیه رو برمی‌داره." },
              },
              {
                q: { en: "What does `grid-column: 1 / -1` do?", fa: "‏`grid-column: 1 / -1` چه کار می‌کنه؟" },
                options: [
                  { en: "Hides the element", fa: "عنصر رو مخفی می‌کنه" },
                  { en: "Spans the element from the first column line to the last", fa: "عنصر رو از خط ستون اول تا آخرین خط پوشش می‌ده" },
                  { en: "Moves the element down one row", fa: "عنصر رو یک ردیف پایین می‌بره" },
                  { en: "Gives the column a negative width", fa: "به ستون عرض منفی می‌ده" },
                ],
                answer: 1,
                explain: { en: "Line 1 to the last line = full-width span. The trick behind spanning headers and footers.", fa: "از خط ۱ تا خط آخر (‏`-1`) = پوشش کامل عرض. همون ترفندی که هدر و فوتر رو تمام‌عرض می‌کنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Assemble the Shell", fa: "اسکلت رو سوار کن" },
            brief: { en: "Give .layout inline: display: grid; grid-template-columns: 220px 1fr; min-height: 100vh. Give header inline: grid-column: 1 / -1; and footer inline: grid-column: 1 / -1; too. Keep every text: the aside links Dashboard / Reports / Settings, the main h1 Overview, and the footer © 2025 TEKA.", fa: "به ‏.layout استایل درون‌خطی ‏display: grid; grid-template-columns: 220px 1fr; min-height: 100vh بده. به header استایل درون‌خطی ‏grid-column: 1 / -1; بده و به footer هم دقیقاً همین. همه متن‌ها بمونن: لینک‌های aside یعنی Dashboard / Reports / Settings، تیتر main یعنی Overview و فوتر هم ‏© 2025 TEKA." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Shell</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <!-- TODO: display: grid + columns 220px 1fr + min-height: 100vh -->\n  <div class="layout">\n    <!-- TODO: grid-column: 1 / -1 -->\n    <header style="padding: 14px 20px; background-color: #0f172a; color: #67e8f9; font-weight: 800;">TEKA Admin</header>\n    <aside style="padding: 16px; background-color: #f8fafc; border-right: 1px solid #e2e8f0;">Dashboard<br>Reports<br>Settings</aside>\n    <main style="padding: 20px;">\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Overview</h1>\n      <p style="margin: 0; color: #475569;">One grid owns everything: header, sidebar, main, footer.</p>\n    </main>\n    <!-- TODO: grid-column: 1 / -1 -->\n    <footer style="padding: 14px 20px; background-color: #0f172a; color: #94a3b8; font-size: 12px;">© 2025 TEKA</footer>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Shell</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <div class="layout" style="display: grid; grid-template-columns: 220px 1fr; min-height: 100vh;">\n    <header style="grid-column: 1 / -1; padding: 14px 20px; background-color: #0f172a; color: #67e8f9; font-weight: 800;">TEKA Admin</header>\n    <aside style="padding: 16px; background-color: #f8fafc; border-right: 1px solid #e2e8f0;">Dashboard<br>Reports<br>Settings</aside>\n    <main style="padding: 20px;">\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Overview</h1>\n      <p style="margin: 0; color: #475569;">One grid owns everything: header, sidebar, main, footer.</p>\n    </main>\n    <footer style="grid-column: 1 / -1; padding: 14px 20px; background-color: #0f172a; color: #94a3b8; font-size: 12px;">© 2025 TEKA</footer>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Three declarations on .layout, one on header, one on footer — five lines total.", fa: "سه تعریف روی ‏.layout، یکی روی header و یکی روی footer — در کل پنج خط." },
              { en: "The span value is `1 / -1` — with spaces around the slash.", fa: "مقدار پوشش ‏`1 / -1` هست؛ دور اسلش فاصله بذار." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".layout", styleIncludes: "display: grid" },
                { selector: ".layout", styleIncludes: "grid-template-columns: 220px 1fr" },
                { selector: ".layout", styleIncludes: "min-height: 100vh" },
                { selector: "header", styleIncludes: "grid-column: 1 / -1" },
                { selector: "footer", styleIncludes: "grid-column: 1 / -1" },
                { selector: "aside", text: "Dashboard" },
                { selector: "main h1", text: "Overview" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m14-l2",
        title: { en: "The Sticky Footer", fa: "فوتر چسبان" },
        goal: { en: "Keep the footer pinned to the bottom of short pages with a flex column.", fa: "فوتر رو در صفحه‌های کوتاه با یه ستون فلکس به ته صفحه بچسبون." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Classic bug: a page with two lines of content — and the footer floats halfway up. The fix is a **flex-column page**: the wrapper gets `display: flex; flex-direction: column; min-height: 100vh;` and the footer gets `margin-top: auto;`. Auto margins absorb ALL free space, so the footer is pushed to the bottom no matter how little content there is.", fa: "باگ کلاسیک: صفحه‌ای با دو خط محتوا — و فوتری که نصفه‌کاره وسط صفحه ول شده. اصلاحش یه **صفحه ستون‌فلکسیه**: والد می‌گیره ‏`display: flex; flex-direction: column; min-height: 100vh;` و فوتر می‌گیره ‏`margin-top: auto;`. مارجین‌های `auto` همه فضای خالی رو می‌بلن، پس فوتر هر چقدر هم محتوا کم باشه می‌ره ته صفحه." },
              { type: "code", lang: "css", runnable: false, code: `.page {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\nfooter { margin-top: auto; }` },
              { type: "tip", en: "`100vh` = exactly one viewport of height. With min-height, short pages stretch to a full screen and long pages simply grow.", fa: "‏`100vh` یعنی دقیقاً یک viewport ارتفاع. با min-height صفحه‌های کوتاه به اندازه کل صفحه کش می‌آن و صفحه‌های بلند هم عادی بزرگ می‌شن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .page { display: flex; flex-direction: column; min-height: 100vh; }\n    header { padding: 12px 20px; background-color: #0f172a; color: #67e8f9; font-weight: 800; }\n    main { padding: 20px; }\n    footer { margin-top: auto; padding: 12px 20px; background-color: #0f172a; color: #94a3b8; font-size: 12px; }\n  </style>\n</head>\n<body>\n  <div class="page">\n    <header>TEKA</header>\n    <main>\n      <p style="margin: 0; color: #475569;">Two paragraphs of content — and the footer still sits at the very bottom.</p>\n    </main>\n    <footer>© 2025 TEKA</footer>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The footer doesn't care how much content the page has — two paragraphs or two thousand, `margin-top: auto` finds the gap and fills it. One recipe that every landing page and admin panel reuses forever.", fa: "فوتر کاری نداره صفحه چقدر محتوا داره — دو پاراگراف یا دو هزار تا، ‏`margin-top: auto` فاصله خالی رو پیدا می‌کنه و پرش می‌کنه. یک دستور که هر لندینگ و هر پنل ادمین برای همیشه ازش استفاده می‌کنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "The footer floats mid-page on a short page. The cleanest fix?", fa: "فوتر توی صفحه کوتاه وسط صفحه ول شده. تمیزترین راه‌حل چیه؟" },
                options: [
                  { en: "Wrapper: flex column + min-height: 100vh, footer: margin-top: auto", fa: "والد: ستون فلکس + ‏min-height: 100vh و فوتر: ‏margin-top: auto" },
                  { en: "position: fixed on the footer", fa: "‏position: fixed روی فوتر" },
                  { en: "Add a pile of empty paragraphs", fa: "یه عالمه پاراگراف خالی اضافه کن" },
                  { en: "Make the footer taller", fa: "فوتر رو بلندتر کن" },
                ],
                answer: 0,
                explain: { en: "fixed overlaps content and filler is a hack. Flex column + auto margin is the actual layout answer.", fa: "‏fixed روی محتوا می‌افته و پاراگراف خالی هم هکِ مزخرفه. ستون فلکس + مارجین auto جواب واقعی چیدمانه." },
              },
              {
                q: { en: "In a flex column, `margin-top: auto` on an element…", fa: "در ستون فلکس، ‏`margin-top: auto` روی یک عنصر…" },
                options: [
                  { en: "Sets the margin to zero", fa: "مارجین رو صفر می‌کنه" },
                  { en: "Absorbs all free vertical space above it", fa: "همه فضای عمودی خالی بالای خودش رو می‌بلره" },
                  { en: "Pushes the element out of the page", fa: "عنصر رو از صفحه بیرون می‌پرونه" },
                  { en: "Only works on images", fa: "فقط روی عکس‌ها کار می‌کنه" },
                ],
                answer: 1,
                explain: { en: "Auto margins in flexbox split the free space — margin-top: auto takes ALL of it, pushing the element down.", fa: "مارجین‌های auto در فلکس‌باکس فضای خالی رو تقسیم می‌کنن — ‏margin-top: auto همه‌ش رو برمی‌داره و عنصر رو می‌فرسته پایین." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Pin the Footer", fa: "فوتر رو بچسبون" },
            brief: { en: "Give .page inline: display: flex; flex-direction: column; min-height: 100vh. Give footer inline: margin-top: auto; padding: 16px 20px; background-color: #0f172a; color: #94a3b8; font-size: 12px. Keep all texts — header TEKA, main paragraph, footer © 2025 TEKA.", fa: "به ‏.page استایل درون‌خطی ‏display: flex; flex-direction: column; min-height: 100vh بده. به footer استایل درون‌خطی ‏margin-top: auto; padding: 16px 20px; background-color: #0f172a; color: #94a3b8; font-size: 12px بده. همه متن‌ها بمونن — هدر TEKA، پاراگراف main و فوتر ‏© 2025 TEKA." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Sticky footer</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <!-- TODO: flex column + min-height: 100vh -->\n  <div class="page">\n    <header style="padding: 12px 20px; background-color: #0f172a; color: #67e8f9; font-weight: 800;">TEKA</header>\n    <main style="padding: 20px;">\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Short page</h1>\n      <p style="margin: 0; color: #475569;">Barely any content here — where will the footer land?</p>\n    </main>\n    <!-- TODO: margin-top: auto + dark skin -->\n    <footer>© 2025 TEKA</footer>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Sticky footer</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <div class="page" style="display: flex; flex-direction: column; min-height: 100vh;">\n    <header style="padding: 12px 20px; background-color: #0f172a; color: #67e8f9; font-weight: 800;">TEKA</header>\n    <main style="padding: 20px;">\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Short page</h1>\n      <p style="margin: 0; color: #475569;">Barely any content here — where will the footer land?</p>\n    </main>\n    <footer style="margin-top: auto; padding: 16px 20px; background-color: #0f172a; color: #94a3b8; font-size: 12px;">© 2025 TEKA</footer>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "The wrapper takes three declarations; the footer's first one is margin-top: auto.", fa: "والد سه تعریف می‌گیره و اولین تعریف فوتر ‏margin-top: auto هست." },
              { en: "min-height: 100vh — vh not px.", fa: "‏min-height: 100vh — با واحد vh نه px." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".page", styleIncludes: "display: flex" },
                { selector: ".page", styleIncludes: "flex-direction: column" },
                { selector: ".page", styleIncludes: "min-height: 100vh" },
                { selector: "footer", styleIncludes: "margin-top: auto" },
                { selector: "footer", text: "© 2025 TEKA" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m14-l3",
        title: { en: "Centering: All the Ways", fa: "وسط‌چین‌کردن: همه راه‌ها" },
        goal: { en: "Center horizontally, vertically or both with the four pro recipes.", fa: "افقی، عمودی یا هر دو رو با چهار دستور حرفه‌ای وسط‌چین کن." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Four recipes cover 99% of cases. **Block**: `margin-inline: auto` plus a `width`. **Text**: `text-align: center` on the parent. **Flex**: `justify-content: center` (horizontal) plus `align-items: center` (vertical). **Grid**: `place-items: center` — both axes in one line. Pick by what you're centering: content goes text-align, boxes go auto margins or flex/grid.", fa: "چهار دستور ۹۹٪ موارد رو پوشش می‌ده. **بلوک**: ‏`margin-inline: auto` به‌علاوه یه `width`. **متن**: ‏`text-align: center` روی والد. **فلکس**: ‏`justify-content: center` (افقی) به‌علاوه ‏`align-items: center` (عمودی). **گرید**: ‏`place-items: center` — هر دو محور در یک خط. انتخاب بستگی داره چی رو وسط‌چین می‌کنی: محتوا با ‏text-align، باکس‌ها با مارجین auto یا فلکس/گرید." },
              { type: "code", lang: "css", runnable: false, code: `.box  { width: 320px; margin-inline: auto; }\n.dad  { text-align: center; }\n.flex { display: flex; justify-content: center; align-items: center; }\n.grid { display: grid; place-items: center; }` },
              { type: "tip", en: "`place-items: center` is the shortest vertical+horizontal centering in CSS — keep it loaded for modals, loaders and hero frames.", fa: "‏`place-items: center` کوتاه‌ترین راه وسط‌چین‌کردن عمودی+افقی در CSS هست — برای مودال‌ها و لودینگ‌ها و قاب‌های هیرو همیشه آماده داشته‌باشش." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .frame {\n      display: grid;\n      place-items: center;\n      min-height: 280px;\n      border: 1px dashed #cbd5e1;\n      border-radius: 14px;\n      margin: 20px;\n    }\n    .badge {\n      padding: 12px 20px;\n      border-radius: 999px;\n      background-color: #0f172a;\n      color: #67e8f9;\n      font-weight: 700;\n    }\n  </style>\n</head>\n<body>\n  <div class="frame"><div class="badge">Centered!</div></div>\n</body>\n</html>` },
              { type: "text", en: "The badge is dead-center on both axes with two declarations on the parent — the child did nothing. Before 2017 this took hacks and prayers; today it's a Tuesday.", fa: "بج با دو تعریف روی والد، دقیقاً وسطِ وسط می‌شینه — فرزند هیچ کاری نکرده. قبل از ۲۰۱۷ این کار هک و دعا می‌خواست؛ امروز یه کار روزمره‌ست." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which single declaration centers children on BOTH axes?", fa: "کدوم تک تعریف، فرزندها رو روی *هر دو* محور وسط‌چین می‌کنه؟" },
                options: [
                  { en: "text-align: center", fa: "‏text-align: center" },
                  { en: "place-items: center on a grid parent", fa: "‏place-items: center روی والد گرید" },
                  { en: "margin: auto", fa: "‏margin: auto" },
                  { en: "vertical-align: middle", fa: "‏vertical-align: middle" },
                ],
                answer: 1,
                explain: { en: "place-items is the shorthand for align-items + justify-items — a grid parent centers both ways.", fa: "‏place-items خلاصه‌شده‌ی ‏align-items + ‏justify-items هست — والد گرید هر دو طرف رو وسط می‌کنه." },
              },
              {
                q: { en: "Center one fixed-width card horizontally inside its section?", fa: "یه کارت با عرض مشخص رو فقط افقی داخل بخشش وسط‌چین کنی؟" },
                options: [
                  { en: "margin-inline: auto on the card itself", fa: "‏margin-inline: auto روی خود کارت" },
                  { en: "text-align: center on the card itself", fa: "‏text-align: center روی خود کارت" },
                  { en: "place-items on the card itself", fa: "‏place-items روی خود کارت" },
                  { en: "float: center", fa: "‏float: center" },
                ],
                answer: 0,
                explain: { en: "Auto margins on the box itself center it in the free space; text-align would only center its text.", fa: "مارجین auto روی خود باکس، اون رو توی فضای خالی وسط می‌کنه؛ ‏text-align فقط متنش رو وسط می‌ذاره." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Frame the Badge", fa: "بج رو قاب کن" },
            brief: { en: "Give .frame inline: display: grid; place-items: center; min-height: 320px; border: 1px dashed #cbd5e1; border-radius: 14px. Give .badge inline: padding: 12px 20px; border-radius: 999px; background-color: #0f172a; color: #67e8f9; font-weight: 700. Keep the text Centered!.", fa: "به ‏.frame استایل درون‌خطی ‏display: grid; place-items: center; min-height: 320px; border: 1px dashed #cbd5e1; border-radius: 14px بده. به ‏.badge استایل درون‌خطی ‏padding: 12px 20px; border-radius: 999px; background-color: #0f172a; color: #67e8f9; font-weight: 700 بده. متن ‏Centered! بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Centering</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <!-- TODO: display: grid + place-items: center + min-height + dashed border -->\n  <div class="frame" style="margin: 20px;">\n    <!-- TODO: pill skin -->\n    <div class="badge">Centered!</div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Centering</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <div class="frame" style="display: grid; place-items: center; min-height: 320px; border: 1px dashed #cbd5e1; border-radius: 14px; margin: 20px;">\n    <div class="badge" style="padding: 12px 20px; border-radius: 999px; background-color: #0f172a; color: #67e8f9; font-weight: 700;">Centered!</div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Both centering declarations live on the PARENT (.frame): display: grid + place-items: center.", fa: "هر دو تعریف وسط‌چین روی *والد* (یعنی ‏.frame) می‌شینه: ‏display: grid + ‏place-items: center." },
              { en: "The badge is the pill: border-radius: 999px.", fa: "بج همون قرصه: ‏border-radius: 999px." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".frame", styleIncludes: "display: grid" },
                { selector: ".frame", styleIncludes: "place-items: center" },
                { selector: ".frame", styleIncludes: "min-height: 320px" },
                { selector: ".badge", styleIncludes: "border-radius: 999px" },
                { selector: ".badge", styleIncludes: "background-color: #0f172a" },
                { selector: ".badge", text: "Centered!" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m14-l4",
        title: { en: "Build an Admin Shell", fa: "اسکلت ادمین بساز" },
        goal: { en: "Combine a grid shell, topbar and sidebar into one dashboard layout.", fa: "گرید اسکلت، تاپ‌بار و سایدبار رو در یک چیدمان داشبورد ترکیب کن." },
        minutes: 16,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Admin dashboards = the holy grail with opinions: a **topbar** across the top, a **sidebar** pinned left, content that scrolls. Same grid — `220px 1fr` — but the topbar spans it (`grid-column: 1 / -1`) and the sidebar separates from content with a single `border-right` hairline. Let the content scroll naturally; don't give the sidebar its own scroll unless it truly overflows.", fa: "داشبورد ادمین = همون هالی‌گریل با نظم بیشتر: یه **تاپ‌بار** در بالا، یه **سایدبار** چسبیده به چپ و محتوایی که اسکرول می‌شه. گرید همونه — ‏`220px 1fr` — فقط تاپ‌بار روی همه‌ش پهن می‌شه (‏`grid-column: 1 / -1`) و سایدبار با یه خط مویی ‏`border-right` از محتوا جدا می‌شه. بذار محتوا عادی اسکرول بشه؛ مگر این‌که واقعاً سرریز بشه، به سایدبار اسکرول جدا نده." },
              { type: "code", lang: "css", runnable: false, code: `.layout  { display: grid; grid-template-columns: 220px 1fr; grid-template-rows: auto 1fr; min-height: 100vh; }\n.topbar  { grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; }\n.sidebar { border-right: 1px solid #e2e8f0; }` },
              { type: "tip", en: "`grid-template-rows: auto 1fr` — the topbar takes what it needs, the content row takes the rest.", fa: "‏`grid-template-rows: auto 1fr` — تاپ‌بار هر چقدر لازم داره برمی‌داره و ردیف محتوا بقیه رو." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    * { box-sizing: border-box; }\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .layout { display: grid; grid-template-columns: 200px 1fr; grid-template-rows: auto 1fr; min-height: 100vh; }\n    .topbar { grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #e2e8f0; }\n    .sidebar { padding: 16px; background-color: #f8fafc; border-right: 1px solid #e2e8f0; }\n    main { padding: 20px; }\n  </style>\n</head>\n<body>\n  <div class="layout">\n    <header class="topbar">\n      <span style="font-weight: 800;">TEKA Admin</span>\n      <span style="color: #64748b; font-size: 12px;">arman@teka.dev</span>\n    </header>\n    <aside class="sidebar">Dashboard<br>Reports<br>Settings</aside>\n    <main>\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Orders</h1>\n      <p style="margin: 0; color: #475569;">142 open orders · 3 refunds pending</p>\n    </main>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Notice how little CSS this takes — the structure IS the styling. The sidebar's separation is one hairline; the topbar is flex + space-between. That restraint is exactly what makes admin UIs readable at 9am.", fa: "دقت کن چقدر CSS کم می‌خواد — خود ساختار، استایلِ صفحه‌ست. جداسازی سایدبار فقط یه خط موییه و تاپ‌بار همون فلکس + space-between. همین بازداره که رابط ادمین رو ساعت ۹ صبح هم خوانا نگه می‌داره." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Best columns for a fixed 220px sidebar + fluid content?", fa: "بهترین مقدار ستون‌ها برای سایدبار ثابت ‏۲۲۰ پیکسلی + محتوای سیال چیه؟" },
                options: [
                  { en: "grid-template-columns: 220px 1fr", fa: "‏grid-template-columns: 220px 1fr" },
                  { en: "grid-template-columns: 220px 50%", fa: "‏grid-template-columns: 220px 50%" },
                  { en: "grid-template-columns: repeat(2, 1fr)", fa: "‏grid-template-columns: repeat(2, 1fr)" },
                  { en: "grid-template-columns: auto auto", fa: "‏grid-template-columns: auto auto" },
                ],
                answer: 0,
                explain: { en: "Fixed value + one fraction: the sidebar never moves, content eats the remainder.", fa: "مقدار ثابت + یک سهم: سایدبار هیچ‌وقت تکان نمی‌خوره و محتوا بقیه فضا رو می‌خوره." },
              },
              {
                q: { en: "The topbar must span both columns. Which declaration?", fa: "تاپ‌بار باید روی هر دو ستون پهن شه. کدوم تعریف؟" },
                options: [
                  { en: "grid-row: 1 / -1", fa: "‏grid-row: 1 / -1" },
                  { en: "grid-column: 1 / -1", fa: "‏grid-column: 1 / -1" },
                  { en: "width: 200%", fa: "‏width: 200%" },
                  { en: "position: absolute", fa: "‏position: absolute" },
                ],
                answer: 1,
                explain: { en: "grid-column: 1 / -1 stretches across every column — exactly what a topbar wants.", fa: "‏grid-column: 1 / -1 روی همه ستون‌ها کش می‌آد — دقیقاً همون چیزی که تاپ‌بار می‌خواد." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Assemble the Dashboard", fa: "داشبورد رو سوار کن" },
            brief: { en: "Give .layout inline: display: grid; grid-template-columns: 220px 1fr; min-height: 100vh. Give header.topbar inline: grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #e2e8f0. Give aside inline: padding: 16px; border-right: 1px solid #e2e8f0. Give main inline: padding: 20px. Keep all texts.", fa: "به ‏.layout استایل درون‌خطی ‏display: grid; grid-template-columns: 220px 1fr; min-height: 100vh بده. به ‏header.topbar استایل درون‌خطی ‏grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #e2e8f0 بده. به aside استایل درون‌خطی ‏padding: 16px; border-right: 1px solid #e2e8f0 بده و به main استایل درون‌خطی ‏padding: 20px. همه متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Dashboard</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <!-- TODO: display: grid + columns 220px 1fr + min-height: 100vh -->\n  <div class="layout">\n    <!-- TODO: span both columns + flex + space-between -->\n    <header class="topbar">\n      <span class="brand" style="font-weight: 800;">TEKA Admin</span>\n      <span style="color: #64748b; font-size: 12px;">arman@teka.dev</span>\n    </header>\n    <!-- TODO: padding + right hairline -->\n    <aside>Dashboard<br>Reports<br>Settings</aside>\n    <!-- TODO: padding -->\n    <main>\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Orders</h1>\n      <p style="margin: 0; color: #475569;">142 open orders · 3 refunds pending</p>\n    </main>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Dashboard</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <div class="layout" style="display: grid; grid-template-columns: 220px 1fr; min-height: 100vh;">\n    <header class="topbar" style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #e2e8f0;">\n      <span class="brand" style="font-weight: 800;">TEKA Admin</span>\n      <span style="color: #64748b; font-size: 12px;">arman@teka.dev</span>\n    </header>\n    <aside style="padding: 16px; border-right: 1px solid #e2e8f0;">Dashboard<br>Reports<br>Settings</aside>\n    <main style="padding: 20px;">\n      <h1 style="margin: 0 0 8px; font-size: 24px;">Orders</h1>\n      <p style="margin: 0; color: #475569;">142 open orders · 3 refunds pending</p>\n    </main>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Topbar recipe: grid-column: 1 / -1 first, then the flex trio.", fa: "دستور تاپ‌بار: اول ‏grid-column: 1 / -1، بعد سه‌گانه فلکس." },
              { en: "The aside gets padding + border-right — one hairline separates it from main.", fa: "aside فقط padding + ‏border-right می‌گیره — یه خط مویی از main جدااش می‌کنه." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".layout", styleIncludes: "display: grid" },
                { selector: ".layout", styleIncludes: "grid-template-columns: 220px 1fr" },
                { selector: ".topbar", styleIncludes: "grid-column: 1 / -1" },
                { selector: ".topbar", styleIncludes: "justify-content: space-between" },
                { selector: "aside", text: "Dashboard" },
                { selector: "main h1", text: "Orders" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m15",
    title: { en: "Glassmorphism & Modern Effects", fa: "گلس‌مورفیسم و جلوه‌های مدرن" },
    blurb: {
      en: "Frosted panels, translucent borders, glows and aurora backgrounds — modern depth with inline-grade recipes.",
      fa: "پنل‌های شیشه‌ای، بوردرهای نیمه‌شفاف، درخشش و بک‌گراند شفق — عمقِ مدرن با استایل درون‌خطی.",
    },
    lessons: [
      {
        id: "css-m15-l1",
        title: { en: "Glass Panels: backdrop-filter", fa: "پنل شیشه‌ای با backdrop-filter" },
        goal: { en: "Frost whatever sits behind a card using backdrop-filter and translucent fills.", fa: "هر چیزی که پشت کارته رو با backdrop-filter و پرکننده‌های نیمه‌شفاف مات کن." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Glassmorphism is three layers stacked: (1) something colorful **behind** the panel, (2) a **translucent fill** like `rgba(255, 255, 255, 0.1)`, (3) `backdrop-filter: blur(12px)` which frosts whatever shows through. The blur eats the detail behind the card but keeps its colors — that's the frosted look. No colorful background behind = no visible glass.", fa: "گلس‌مورفیسم سه لایه روی هم‌ه: (۱) یه چیز رنگی **پشت** پنل، (۲) یه **پرکننده نیمه‌شفاف** مثل ‏`rgba(255, 255, 255, 0.1)` و (۳) ‏`backdrop-filter: blur(12px)` که هر چی از پشت رد می‌شه رو مات می‌کنه. بلر جزئیات پشت کارت رو می‌خوره ولی رنگ‌هاش رو نگه می‌داره — همون حس شیشه‌مات. اگه پشت کارت بک‌گراند رنگی نباشه، اصلاً شیشه‌ای دیده نمی‌شه." },
              { type: "code", lang: "css", runnable: false, code: `.glass {\n  background-color: rgba(255, 255, 255, 0.1); /* 10% white film */\n  backdrop-filter: blur(12px);                 /* frost behind */\n  border: 1px solid rgba(255, 255, 255, 0.25); /* lit edge */\n}` },
              { type: "warn", en: "`backdrop-filter` blurs what's BEHIND the element — not the element itself. On a plain white page it looks like nothing happened.", fa: "‏`backdrop-filter` چیزِ *پشتِ* عنصر رو مات می‌کنه — نه خود عنصر رو. روی صفحه سفید ساده انگار هیچ اتفاقی نیفتاده." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .scene {\n      min-height: 320px;\n      display: grid;\n      place-items: center;\n      background:\n        radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%),\n        radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%),\n        linear-gradient(160deg, #0f172a, #1e1b4b);\n    }\n    .glass {\n      background-color: rgba(255, 255, 255, 0.1);\n      backdrop-filter: blur(12px);\n      border: 1px solid rgba(255, 255, 255, 0.25);\n      border-radius: 16px;\n      padding: 24px;\n      color: #e2e8f0;\n      max-width: 320px;\n    }\n  </style>\n</head>\n<body>\n  <div class="scene">\n    <div class="glass">\n      <h2 style="margin: 0 0 8px;">Glass panel</h2>\n      <p style="margin: 0; line-height: 1.7;">The blobs behind are blurred by backdrop-filter — colors survive, detail melts.</p>\n    </div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The gradient scene behind is doing half the work. Alpha fills (0.05–0.15) let the scene glow through, and the blur turns sharp blobs into soft light. That's the entire trick — glass is staging, not styling.", fa: "بک‌گراند گرادیانیِ پشت صحنه نصف کار رو انجام می‌ده. پرکننده‌های آلفا (‏۰٫۰۵ تا ۰٫۱۵) می‌ذارن صحنه از پشت بدرخشه و بلر لکه‌های تیز رو به نور نرم تبدیل می‌کنه. کل ترفند همینه — شیشه یعنی صحنه‌آرایی، نه استایل‌دهی." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does `backdrop-filter: blur(12px)` blur?", fa: "‏`backdrop-filter: blur(12px)` چی رو مات می‌کنه؟" },
                options: [
                  { en: "The element's own text", fa: "متن خود عنصر رو" },
                  { en: "Everything painted behind the element", fa: "هر چیزی که پشت عنصر کشیده شده رو" },
                  { en: "The entire page", fa: "کل صفحه رو" },
                  { en: "Only the element's border", fa: "فقط بوردر عنصر رو" },
                ],
                answer: 1,
                explain: { en: "backdrop = what's behind. The element itself stays sharp; the scene behind it frosts over.", fa: "‏backdrop یعنی چیزی که پشتشه. خود عنصر تیز می‌مونه و صحنه پشتش مات می‌شه." },
              },
              {
                q: { en: "A believable glass fill is…", fa: "یه پرکننده باورپذیر برای شیشه …" },
                options: [
                  { en: "background-color: #fff", fa: "‏background-color: #fff" },
                  { en: "rgba(255, 255, 255, 0.1)", fa: "‏rgba(255, 255, 255, 0.1)" },
                  { en: "fully transparent", fa: "کاملاً شفاف" },
                  { en: "black at full opacity", fa: "مشکی با کدری کامل" },
                ],
                answer: 1,
                explain: { en: "~10% white lets the scene shine through while still reading as a solid pane.", fa: "حدود ‏۱۰٪ سفید می‌ذاره صحنه از پشت بدرخشه و همزمان حس یه پنل جامد رو می‌ده." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Frost the Card", fa: "کارت رو مات کن" },
            brief: { en: "Give .glass inline: background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 16px; padding: 24px. The .scene background stays exactly as it is. Keep the texts.", fa: "به ‏.glass استایل درون‌خطی ‏background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 16px; padding: 24px بده. بک‌گراند ‏.scene دقیقاً سر جاش بمونه. متن‌ها هم بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Glass</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <div class="scene" style="min-height: 320px; display: grid; place-items: center; background: radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%), radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%), linear-gradient(160deg, #0f172a, #1e1b4b);">\n    <!-- TODO: glass recipe: translucent fill + backdrop blur + lit border -->\n    <div class="glass" style="color: #e2e8f0; max-width: 320px; background-color: #94a3b8; border: 3px solid #ffffff;">\n      <h2 style="margin: 0 0 8px;">Glass panel</h2>\n      <p style="margin: 0; line-height: 1.7;">The blobs behind are blurred by backdrop-filter — colors survive, detail melts.</p>\n    </div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Glass</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <div class="scene" style="min-height: 320px; display: grid; place-items: center; background: radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%), radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%), linear-gradient(160deg, #0f172a, #1e1b4b);">\n    <div class="glass" style="color: #e2e8f0; max-width: 320px; background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 16px; padding: 24px;">\n      <h2 style="margin: 0 0 8px;">Glass panel</h2>\n      <p style="margin: 0; line-height: 1.7;">The blobs behind are blurred by backdrop-filter — colors survive, detail melts.</p>\n    </div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Three signature declarations: background-color: rgba(255, 255, 255, 0.1), backdrop-filter: blur(12px), border: 1px solid rgba(255, 255, 255, 0.25).", fa: "سه تعریف امضادار: ‏background-color: rgba(255, 255, 255, 0.1) و ‏backdrop-filter: blur(12px) و ‏border: 1px solid rgba(255, 255, 255, 0.25)." },
              { en: "Swap the 3px white border for a 1px translucent one, then add radius 16 and padding 24.", fa: "بوردر ۳ پیکسلی سفید رو با یه بوردر ۱ پیکسلی نیمه‌شفاف عوض کن، بعد رادیوس ۱۶ و پدینگ ۲۴ رو اضافه کن." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".glass", styleIncludes: "backdrop-filter: blur(12px)" },
                { selector: ".glass", styleIncludes: "background-color: rgba(255, 255, 255, 0.1)" },
                { selector: ".glass", styleIncludes: "border: 1px solid rgba(255, 255, 255, 0.25)" },
                { selector: ".glass", styleIncludes: "border-radius: 16px" },
                { selector: ".glass h2", text: "Glass panel" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m15-l2",
        title: { en: "Translucent Borders", fa: "بوردرهای نیمه‌شفاف" },
        goal: { en: "Edge dark and glass cards with rgba hairlines instead of harsh lines.", fa: "لبه کارت‌های تیره و شیشه‌ای رو با خط مویی rgba بکش، نه با خط‌های زننده." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "On dark surfaces a solid white border screams; `rgba(255, 255, 255, 0.15)` whispers. Alpha borders bend to ANY background — that's why glass panels always use them. Pro pattern: one uniform `1px solid rgba(255, 255, 255, 0.15)` around the card, then optionally a brighter `border-top-color` (0.25–0.35) to fake light landing on the top edge.", fa: "روی سطوح تیره بوردر سفید توپر داد می‌زنه؛ ‏`rgba(255, 255, 255, 0.15)` نجوا می‌کنه. بوردرهای آلفا با هر بک‌گراندی سازگار می‌شن — برای همینه که پنل‌های شیشه‌ای همیشه ازشون استفاده می‌کنن. الگوی حرفه‌ای: یه بوردر یکدست ‏`1px solid rgba(255, 255, 255, 0.15)` دور کارت و در صورت نیاز یه ‏`border-top-color` روشن‌تر (‏۰٫۲۵ تا ۰٫۳۵) برای شبیه‌سازی نورِ افتاده روی لبه بالا." },
              { type: "code", lang: "css", runnable: false, code: `.card { border: 1px solid rgba(255, 255, 255, 0.15); }\n.card.lit { border-top-color: rgba(255, 255, 255, 0.35); }` },
              { type: "tip", en: "10–20% white for dark surfaces; 6–12% black (rgba(2, 8, 23, 0.08)) for light ones.", fa: "برای سطوح تیره ‏۱۰ تا ۲۰٪ سفید؛ برای سطوح روشن ‏۶ تا ۱۲٪ مشکی (یعنی ‏rgba(2, 8, 23, 0.08))." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; display: flex; gap: 20px; flex-wrap: wrap; background-color: #020617; }\n    .card { flex: 1; min-width: 220px; border-radius: 14px; padding: 20px; color: #e2e8f0; background-color: #0f172a; }\n    .harsh { border: 3px solid #ffffff; }\n    .soft  { border: 1px solid rgba(255, 255, 255, 0.15); border-top-color: rgba(255, 255, 255, 0.35); }\n    h3 { margin: 0 0 8px; }\n    p { margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.7; }\n  </style>\n</head>\n<body>\n  <div class="card harsh"><h3>Harsh</h3><p>A 3px pure-white border shouts over the content.</p></div>\n  <div class="card soft"><h3>Soft</h3><p>A 15% white hairline defines the edge and a brighter top fakes the light.</p></div>\n</body>\n</html>` },
              { type: "text", en: "Same content, same surface — only the border philosophy changed. The lit top edge is a tiny detail, but tiny details are what \"designed\" means.", fa: "همون محتوا و همون سطح — فقط فلسفه بوردر عوض شده. لبه بالای روشن یه جزئیات ریزه، ولی دقیقاً همین جزئیات ریز معنیِ «طراحی‌شده» رو می‌سازن." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why rgba borders on dark and glass cards?", fa: "چرا روی کارت‌های تیره و شیشه‌ای از بوردر rgba استفاده می‌کنیم؟" },
                options: [
                  { en: "They adapt to any background instead of fighting it", fa: "چون با هر بک‌گراندی سازگار می‌شن، به‌جای این‌که باهاش بجنگن" },
                  { en: "Because they render thicker", fa: "چون ضخیم‌تر رندر می‌شن" },
                  { en: "Because browsers require rgba on dark", fa: "چون مرورگرها روی تم تیره rgba رو اجباری کردن" },
                  { en: "They make text brighter", fa: "متن رو روشن‌تر می‌کنن" },
                ],
                answer: 0,
                explain: { en: "A 15% white line defines the edge at ANY background color — solid white only works on one.", fa: "خط ۱۵٪ سفید لبه رو روی هر رنگ بک‌گراند تعریف می‌کنه؛ سفید توپر فقط روی یک زمینه جواب می‌ده." },
              },
              {
                q: { en: "A subtle lit top edge uses…", fa: "یه لبه بالای روشنِ ظریف از … استفاده می‌کنه." },
                options: [
                  { en: "border-top: 4px solid #fff", fa: "‏border-top: 4px solid #fff" },
                  { en: "border-top-color at around 0.3 alpha", fa: "‏border-top-color با آلفای حدود ۰٫۳" },
                  { en: "no border at all", fa: "اصلاً بدون بوردر" },
                  { en: "a background image", fa: "یه عکس بک‌گراند" },
                ],
                answer: 1,
                explain: { en: "Same hairline, slightly higher alpha on top — light from above, for free.", fa: "همون خط مویی، فقط با آلفای کمی بیشتر در بالا — نورِ از بالا، مجانی." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Soften the Edges", fa: "لبه‌ها رو نرم کن" },
            brief: { en: "Give .dark-card inline: background-color: #0f172a; border: 1px solid rgba(255, 255, 255, 0.15); border-top-color: rgba(255, 255, 255, 0.35); border-radius: 14px; padding: 20px. Keep the h3 Night mode card and the paragraph.", fa: "به ‏.dark-card استایل درون‌خطی ‏background-color: #0f172a; border: 1px solid rgba(255, 255, 255, 0.15); border-top-color: rgba(255, 255, 255, 0.35); border-radius: 14px; padding: 20px بده. تیتر ‏Night mode card و پاراگراف بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Edges</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px; background-color: #020617;">\n  <!-- TODO: swap the shouting border for hairline rgba + lit top edge -->\n  <div class="dark-card" style="color: #e2e8f0; border: 3px solid #ffffff;">\n    <h3 style="margin: 0 0 8px;">Night mode card</h3>\n    <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.7;">Fifteen percent white defines the edge without shouting.</p>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Edges</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px; background-color: #020617;">\n  <div class="dark-card" style="color: #e2e8f0; background-color: #0f172a; border: 1px solid rgba(255, 255, 255, 0.15); border-top-color: rgba(255, 255, 255, 0.35); border-radius: 14px; padding: 20px;">\n    <h3 style="margin: 0 0 8px;">Night mode card</h3>\n    <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.7;">Fifteen percent white defines the edge without shouting.</p>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "First fix the border: 1px solid rgba(255, 255, 255, 0.15). Then override the top with border-top-color: rgba(255, 255, 255, 0.35).", fa: "اول بوردر رو درست کن: ‏1px solid rgba(255, 255, 255, 0.15). بعد بالاش رو با ‏border-top-color: rgba(255, 255, 255, 0.35) روشن‌تر کن." },
              { en: "Don't forget background-color: #0f172a, radius 14 and padding 20.", fa: "‏background-color: #0f172a و رادیوس ۱۴ و پدینگ ۲۰ رو هم یادت نره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".dark-card", styleIncludes: "background-color: #0f172a" },
                { selector: ".dark-card", styleIncludes: "border: 1px solid rgba(255, 255, 255, 0.15)" },
                { selector: ".dark-card", styleIncludes: "border-top-color: rgba(255, 255, 255, 0.35)" },
                { selector: ".dark-card", styleIncludes: "border-radius: 14px" },
                { selector: ".dark-card h3", text: "Night mode card" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m15-l3",
        title: { en: "Glows & Neon Depth", fa: "درخشش و عمق نئونی" },
        goal: { en: "Add colored glows that read as light — layered, low-alpha, on purpose.", fa: "درخشش‌هایی اضافه کن که حس نور بدن — لایه‌ای، کم‌آلفا و هدفمند." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A glow is a **colored shadow**: same `box-shadow` syntax, but the color matches your accent and the alpha stays low. Two layers beat one — a tight `0 0 0 1px` ring for the crisp edge, plus `0 0 24px` of soft colored haze. On dark scenes, give headings the same accent as `text-shadow`.", fa: "درخشش یه **سایه رنگیه**: همون سینتکس ‏box-shadow، فقط رنگش همرنگ اکسنت توئه و آلفاش پایین می‌مونه. دو لایه از یک لایه بهتره — یه حلقه جمع‌شده ‏`0 0 0 1px` برای لبه تیز، به‌علاوه ‏`0 0 24px` هاله رنگی نرم. روی صحنه‌های تیره هم به تیترها همون رنگ رو به‌شکل ‏`text-shadow` بده." },
              { type: "code", lang: "css", runnable: false, code: `.glow-btn {\n  box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.35), 0 0 24px rgba(34, 211, 238, 0.35);\n}\n.hero-title { text-shadow: 0 0 24px rgba(34, 211, 238, 0.45); }` },
              { type: "warn", en: "Glow at high alpha stops being light and becomes an eye-ache. Keep alphas at 0.2–0.45 and let the blur do the work.", fa: "درخشش با آلفای بالا دیگه نور نیست، چشم‌آزاره. آلفا رو بین ‏۰٫۲ تا ۰٫۴۵ نگه دار و کار اصلی رو بنداز پایه blur." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; background-color: #020617; color: #e2e8f0; }\n    .stage { min-height: 300px; display: grid; place-items: center; text-align: center; }\n    h1 { margin: 0 0 20px; font-size: 40px; text-shadow: 0 0 24px rgba(34, 211, 238, 0.45); }\n    .glow-btn {\n      border: 0;\n      padding: 10px 20px;\n      border-radius: 12px;\n      background-color: #22d3ee;\n      color: #0f172a;\n      font-weight: 700;\n      box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.35), 0 0 24px rgba(34, 211, 238, 0.35);\n    }\n  </style>\n</head>\n<body>\n  <div class="stage">\n    <div>\n      <h1>Nebula Console</h1>\n      <button class="glow-btn">Launch</button>\n    </div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Both glows share ONE accent — cyan. The tight 1px ring keeps the button's silhouette readable while the 24px halo breathes around it. One accent, two layers, zero smudges.", fa: "هر دو درخشش از *یک* اکسنت مشترک استفاده می‌کنن — سایان. حلقه ۱ پیکسلی جمع‌شده، سایه‌روشنِ دکمه رو خوانا نگه می‌داره و هاله ۲۴ پیکسلی دورش نفس می‌کشه. یک اکسنت، دو لایه، بدون لکه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "A professional glow is…", fa: "یه درخشش حرفه‌ای …" },
                options: [
                  { en: "A solid 4px bright ring", fa: "یه حلقه توپر ۴ پیکسلی" },
                  { en: "A low-alpha colored shadow with a large blur", fa: "سایه رنگی با آلفای کم و blur بزرگ" },
                  { en: "A red pulse animation", fa: "یه انیمیشن چشمک قرمز" },
                  { en: "Only for white backgrounds", fa: "فقط برای بک‌گراند سفید" },
                ],
                answer: 1,
                explain: { en: "Low alpha + big blur = light. High alpha + small blur = stain.", fa: "آلفای کم + بلر بزرگ = نور. آلفای بالا + بلر کوچک = لکه." },
              },
              {
                q: { en: "Why layer `0 0 0 1px` + `0 0 24px` in one box-shadow?", fa: "چرا در یک ‏box-shadow دو لایه ‏`0 0 0 1px` و ‏`0 0 24px` رو با هم می‌ذاریم؟" },
                options: [
                  { en: "Because box-shadow needs two values to work", fa: "چون box-shadow برای کار کردن دو مقدار می‌خواد" },
                  { en: "A crisp edge ring plus a soft halo", fa: "یه حلقه لبه تیز به‌علاوه یه هاله نرم" },
                  { en: "To double the color intensity", fa: "برای دو برابر کردن شدت رنگ" },
                  { en: "It only matters on hover", fa: "فقط روی hover مهمه" },
                ],
                answer: 1,
                explain: { en: "The 1px ring defines the shape; the 24px layer spreads colored atmosphere around it.", fa: "حلقه ۱ پیکسلی شکل رو تعریف می‌کنه و لایه ۲۴ پیکسلی، حال‌وهوای رنگی رو دورش پخش می‌کنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Light It Up", fa: "روشنش کن" },
            brief: { en: "Give h1 inline: text-shadow: 0 0 24px rgba(34, 211, 238, 0.45). Give button.launch inline: background-color: #22d3ee; color: #0f172a; border: 0; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.35), 0 0 24px rgba(34, 211, 238, 0.35). Keep the texts.", fa: "به ‏h1 استایل درون‌خطی ‏text-shadow: 0 0 24px rgba(34, 211, 238, 0.45) بده. به دکمه ‏.launch استایل درون‌خطی ‏background-color: #22d3ee; color: #0f172a; border: 0; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.35), 0 0 24px rgba(34, 211, 238, 0.35) بده. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Glow</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; background-color: #020617; color: #e2e8f0;">\n  <div style="min-height: 300px; display: grid; place-items: center; text-align: center;">\n    <div>\n      <!-- TODO: text-shadow glow -->\n      <h1 style="margin: 0 0 20px; font-size: 40px;">Nebula Console</h1>\n      <!-- TODO: cyan skin + two-layer glow -->\n      <button class="launch" style="border: 0; padding: 10px 20px;">Launch</button>\n    </div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Glow</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; background-color: #020617; color: #e2e8f0;">\n  <div style="min-height: 300px; display: grid; place-items: center; text-align: center;">\n    <div>\n      <h1 style="margin: 0 0 20px; font-size: 40px; text-shadow: 0 0 24px rgba(34, 211, 238, 0.45);">Nebula Console</h1>\n      <button class="launch" style="background-color: #22d3ee; color: #0f172a; border: 0; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.35), 0 0 24px rgba(34, 211, 238, 0.35);">Launch</button>\n    </div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "The box-shadow has TWO layers separated by a comma — copy it exactly from the brief.", fa: "‏box-shadow دو لایه با ویرگول جدا شده — دقیق از بریف کپی‌ش کن." },
              { en: "The h1 needs one declaration: text-shadow with the cyan at 0.45 alpha.", fa: "‏h1 فقط یه تعریف می‌خواد: ‏text-shadow با سایان و آلفای ۰٫۴۵." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", styleIncludes: "text-shadow: 0 0 24px rgba(34, 211, 238, 0.45)" },
                { selector: "button.launch", styleIncludes: "background-color: #22d3ee" },
                { selector: "button.launch", styleIncludes: "box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.35), 0 0 24px rgba(34, 211, 238, 0.35)" },
                { selector: "button.launch", styleIncludes: "border-radius: 12px" },
                { selector: "button.launch", text: "Launch" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m15-l4",
        title: { en: "Aurora Backgrounds", fa: "بک‌گراندهای شفق" },
        goal: { en: "Stack radial + linear gradients in one background to paint scene lighting.", fa: "گرادیان‌های radial و linear رو در یک background روی هم بچین و نورپردازی صحنه بساز." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "One element can paint **multiple background layers** — comma-separated, first layer on top. The aurora recipe: two soft `radial-gradient` blobs of accent color over one dark `linear-gradient` base. `transparent` stops keep layers airy, so colors blend instead of hard-stopping.", fa: "یه عنصر می‌تونه چند **لایه بک‌گراند** بکشه — با ویرگول جدا می‌شن و لایه اول روی همه قرار می‌گیره. دستور شفق: دو لکه نرم ‏`radial-gradient` با رنگ اکسنت، روی یه پایه تیره از ‏`linear-gradient`. توقف‌های `transparent` لایه‌ها رو فضادار نگه می‌دارن تا رنگ‌ها توی هم ذوب بشن، نه این‌که لبه تیز بگیرن." },
              { type: "code", lang: "css", runnable: false, code: `.scene {\n  background:\n    radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%),\n    radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%),\n    linear-gradient(160deg, #0f172a, #1e1b4b);\n}` },
              { type: "tip", en: "`at 20% 20%` positions the blob's center — move the percentages to move the light.", fa: "‏`at 20% 20%` مرکز لکه رو تعیین می‌کنه — درصد‌ها رو جابه‌جا کن تا نور جابه‌جا شه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .hero {\n      min-height: 320px;\n      display: grid;\n      place-items: center;\n      text-align: center;\n      color: #e2e8f0;\n      background:\n        radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%),\n        radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%),\n        linear-gradient(160deg, #0f172a, #1e1b4b);\n    }\n    h1 { margin: 0 0 8px; font-size: 40px; }\n    p { margin: 0; color: #94a3b8; }\n  </style>\n</head>\n<body>\n  <div class="hero">\n    <div>\n      <h1>Nights of Nebula</h1>\n      <p>Three background layers, zero images: two blobs of light over a deep gradient.</p>\n    </div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "No image files, no canvas — pure CSS lighting. The purple and cyan blobs ride ON TOP of the dark gradient (first = top), and their transparent tails melt them into the base. Swap the accent colors and the whole mood changes.", fa: "بدون فایل عکس و بدون canvas — نورپردازی خالص CSS. لکه‌های بنفش و سایان *روی* گرادیان تیره می‌شینن (اولی یعنی بالایی) و دنباله شفافشون توی پایه ذوب می‌شن. رنگ‌های اکسنت رو عوض کن تا کل حال‌وهوا عوض شه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In a multi-layer background, which layer paints on top?", fa: "در بک‌گراند چندلایه، کدوم لایه بالاتر کشیده می‌شه؟" },
                options: [
                  { en: "The last one", fa: "آخرین لایه" },
                  { en: "The first one", fa: "اولین لایه" },
                  { en: "They get averaged together", fa: "لایه‌ها با هم میانگین می‌شن" },
                  { en: "It's random per load", fa: "هر بار شانسیه" },
                ],
                answer: 1,
                explain: { en: "First listed = painted last = on top. That's why the blobs go before the dark base.", fa: "اولین لایه = آخرین نقاشی = بالایی. برای همینه که لکه‌ها قبل از پایه تیره میان." },
              },
              {
                q: { en: "What does the `transparent 60%` stop do?", fa: "توقف `transparent 60%` چه کاری می‌کنه؟" },
                options: [
                  { en: "Makes the whole layer 60% visible", fa: "کل لایه رو ‏۶۰٪ قابل‌دیدن می‌کنه" },
                  { en: "Fades the blob out by 60% of its size", fa: "لکه رو تا ‏۶۰٪ اندازه‌ش محو می‌کنه" },
                  { en: "Adds a 60% border", fa: "یه بوردر ‏۶۰٪ اضافه می‌کنه" },
                  { en: "Speeds up rendering", fa: "رندر رو سریع‌تر می‌کنه" },
                ],
                answer: 1,
                explain: { en: "The color runs from full at the center to transparent at 60% — a soft blob with no hard edge.", fa: "رنگ از مرکز با کدری کامل شروع می‌شه و تا ‏۶۰٪ به شفاف می‌رسه — یعنی یه لکه نرم بدون لبه تیز." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Paint the Aurora", fa: "شفق رو بکش" },
            brief: { en: "Give .hero inline: background: radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%), radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%), linear-gradient(160deg, #0f172a, #1e1b4b); color: #e2e8f0; text-align: center; padding: 56px 20px. Keep the h1 and p.", fa: "به ‏.hero استایل درون‌خطی ‏background: radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%), radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%), linear-gradient(160deg, #0f172a, #1e1b4b); color: #e2e8f0; text-align: center; padding: 56px 20px بده. ‏h1 و p بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Aurora</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <!-- TODO: three-layer aurora background -->\n  <section class="hero" style="color: #e2e8f0; text-align: center; padding: 56px 20px;">\n    <h1 style="margin: 0 0 8px; font-size: 40px;">Nights of Nebula</h1>\n    <p style="margin: 0; color: #94a3b8;">Three background layers, zero images.</p>\n  </section>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Aurora</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <section class="hero" style="background: radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%), radial-gradient(at 80% 30%, rgba(34, 211, 238, 0.4), transparent 55%), linear-gradient(160deg, #0f172a, #1e1b4b); color: #e2e8f0; text-align: center; padding: 56px 20px;">\n    <h1 style="margin: 0 0 8px; font-size: 40px;">Nights of Nebula</h1>\n    <p style="margin: 0; color: #94a3b8;">Three background layers, zero images.</p>\n  </section>\n</body>\n</html>`,
            hints: [
              { en: "Three layers, comma-separated: purple blob, cyan blob, dark linear base. Order matters.", fa: "سه لایه با ویرگول: لکه بنفش، لکه سایان و پایه تیره linear. ترتیب مهمه." },
              { en: "Keep `at 20% 20%` and `at 80% 30%` exactly as written — they place the light.", fa: "‏`at 20% 20%` و ‏`at 80% 30%` رو دقیقاً همون‌طور که هستن نگه دار — این‌ها نور رو جای‌گذاری می‌کنن." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".hero", styleIncludes: "radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.5), transparent 60%)" },
                { selector: ".hero", styleIncludes: "linear-gradient(160deg, #0f172a, #1e1b4b)" },
                { selector: ".hero", styleIncludes: "color: #e2e8f0" },
                { selector: ".hero", styleIncludes: "padding: 56px 20px" },
                { selector: ".hero h1", text: "Nights of Nebula" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m16",
    title: { en: "Color Systems & Theming", fa: "سیستم رنگ و تم‌سازی" },
    blurb: {
      en: "Palettes that scale, contrast that passes WCAG, dark/light theming and semantic status colors.",
      fa: "پالت‌هایی که مقیاس می‌گیرن، کنتراستی که ‏WCAG رو پاس می‌کنه، تم روشن/تاریک و رنگ‌های وضعیت.",
    },
    lessons: [
      {
        id: "css-m16-l1",
        title: { en: "Palettes: the 60-30-10 Rule", fa: "پالت با قانون ۶۰-۳۰-۱۰" },
        goal: { en: "Build a palette with roles — dominant, secondary, accent — and stop inventing colors mid-project.", fa: "پالتی با نقش‌های مشخص بساز — غالب، مکمل، اکسنت — و وسط پروژه رنگ اختراع نکن." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**60-30-10** assigns roles: ~60% dominant neutral (backgrounds), ~30% secondary (cards, panels, borders), ~10% accent (buttons, links, highlights). The ratio forces restraint: with ONE accent, every button click pulls the eye. Slate neutrals plus one teal accent can carry an entire product.", fa: "**۶۰-۳۰-۱۰** نقش‌ها رو تعیین می‌کنه: حدود ‏۶۰٪ رنگ خنثی غالب (بک‌گراندها)، حدود ‏۳۰٪ مکمل (کارت‌ها، پنل‌ها، بوردرها) و حدود ‏۱۰٪ اکسنت (دکمه‌ها، لینک‌ها، تأکیدها). همین نسبت بازدارندگی میاره: با فقط *یک* اکسنت، هر کلیک روی دکمه چشم رو هدایت می‌کنه. خنثی‌های Slate به‌علاوه یه اکسنت teal می‌تونن کل یه محصول رو حمل کنن." },
              { type: "code", lang: "css", runnable: false, code: `/* 60% */ body { background-color: #f8fafc; }\n/* 30% */ .card { background-color: #ffffff; border: 1px solid #e2e8f0; }\n/* 10% */ .cta  { background-color: #0d9488; }` },
              { type: "warn", en: "A second accent means two things shouting. If everything is highlighted, nothing is.", fa: "اکسنت دوم یعنی دو تا چیز هم‌زمان داد می‌زنن. اگه همه‌چیز برجسته باشه، دیگه هیچی برجسته نیست." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; display: flex; gap: 20px; flex-wrap: wrap; }\n    .page { flex: 1; min-width: 240px; border-radius: 14px; padding: 20px; }\n    .chaos { border: 1px solid #e2e8f0; }\n    .chaos h3 { color: #ec4899; margin: 0 0 8px; }\n    .chaos button { background-color: #f59e0b; border: 0; padding: 8px 14px; border-radius: 8px; color: white; }\n    .system { background-color: #0f172a; color: #e2e8f0; }\n    .system h3 { margin: 0 0 8px; }\n    .system p { color: #94a3b8; }\n    .system button { background-color: #0d9488; border: 0; padding: 8px 14px; border-radius: 8px; color: white; }\n  </style>\n</head>\n<body>\n  <div class="page chaos"><h3>Chaos</h3><p style="color: #475569;">Pink heading, amber button, gray text — five unrelated colors.</p><button>Action</button></div>\n  <div class="page system"><h3>System</h3><p>Slate surfaces, one teal accent — the CTA is the only thing shouting.</p><button>Get started</button></div>\n</body>\n</html>` },
              { type: "text", en: "Left card uses five unrelated colors; right card uses one slate family plus ONE accent. Which button do you trust? The accent's whole job is to be the page's single decision point.", fa: "کارت چپ پنج رنگ بی‌ربط داره؛ کارت راست یه خانواده Slate به‌علاوه *یک* اکسنت. دکمه کدوم به چشمات اعتماد می‌ده؟ کار اکسنت همینه که تنها نقطه تصمیم صفحه باشه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In 60-30-10, the 10% is…", fa: "در قانون ۶۰-۳۰-۱۰، همون ‏۱۰٪ می‌شه …" },
                options: [
                  { en: "The accent, used for primary actions and highlights", fa: "اکسنت، که برای اقدام‌های اصلی و تأکیدها می‌شه" },
                  { en: "The page background", fa: "بک‌گراند صفحه" },
                  { en: "The borders", fa: "بوردرها" },
                  { en: "The footer color", fa: "رنگ فوتر" },
                ],
                answer: 0,
                explain: { en: "Accent = rarest color = strongest pull. Buttons and links live in that 10%.", fa: "اکسنت = کم‌یاب‌ترین رنگ = قوی‌ترین جاذبه. دکمه‌ها و لینک‌ها توی همون ۱۰٪ زندگی می‌کنن." },
              },
              {
                q: { en: "Your page needs a 4th accent color because…", fa: "صفحه‌ات به رنگ اکسنت چهارم نیاز داره چون…" },
                options: [
                  { en: "More colors look more professional", fa: "رنگ بیشتر حرفه‌ای‌تره" },
                  { en: "It probably doesn't — extend tints of the colors you have", fa: "احتمالاً نیاز نداره — از ته‌رنگ‌های رنگ‌های موجود استفاده کن" },
                  { en: "Users demand variety", fa: "کاربرها تنوع می‌خوان" },
                  { en: "CSS requires at least four", fa: "‏CSS حداقل چهار تا لازم داره" },
                ],
                answer: 1,
                explain: { en: "Almost every \"missing color\" is actually a tint or shade of one you already own.", fa: "تقریباً هر «رنگ گمشده‌ای» در واقع یه ته‌رنگ یا سایه از رنگیه که الان داری." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Discipline the Palette", fa: "پالت رو منظم کن" },
            brief: { en: "Give section.hero inline: background-color: #0f172a; color: #e2e8f0; text-align: center; padding: 48px 20px. Replace the button's random pink with the teal accent — button.cta inline: background-color: #0d9488; color: white; border: 0; border-radius: 10px; padding: 10px 20px; font-size: 16px; cursor: pointer. Keep the texts.", fa: "به ‏section.hero استایل درون‌خطی ‏background-color: #0f172a; color: #e2e8f0; text-align: center; padding: 48px 20px بده. رنگ صورتیِ شانسی دکمه رو با اکسنت teal عوض کن — دکمه ‏.cta استایل درون‌خطی ‏background-color: #0d9488; color: white; border: 0; border-radius: 10px; padding: 10px 20px; font-size: 16px; cursor: pointer می‌گیره. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Palette</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <!-- TODO: dark slate surface + light text -->\n  <section class="hero">\n    <h1 style="margin: 0 0 8px; font-size: 40px;">Build with discipline</h1>\n    <p style="margin: 0 0 24px; color: #94a3b8;">One surface family. One accent. Zero rainbow.</p>\n    <!-- TODO: teal accent skin -->\n    <button class="cta" style="background-color: #ec4899; border: 0; color: white; padding: 10px 20px;">Get started</button>\n  </section>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Palette</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <section class="hero" style="background-color: #0f172a; color: #e2e8f0; text-align: center; padding: 48px 20px;">\n    <h1 style="margin: 0 0 8px; font-size: 40px;">Build with discipline</h1>\n    <p style="margin: 0 0 24px; color: #94a3b8;">One surface family. One accent. Zero rainbow.</p>\n    <button class="cta" style="background-color: #0d9488; color: white; border: 0; border-radius: 10px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Get started</button>\n  </section>\n</body>\n</html>`,
            hints: [
              { en: "The hero is the 60% surface: background-color: #0f172a with color: #e2e8f0.", fa: "هیرو همون سطح ۶۰٪ هست: ‏background-color: #0f172a همراه ‏color: #e2e8f0." },
              { en: "Swap #ec4899 for #0d9488 — the ONE accent — then finish the button skin.", fa: "‏#ec4899 رو با #0d9488 عوض کن — همون *تک* اکسنت — بعد پوست دکمه رو کامل کن." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "section.hero", styleIncludes: "background-color: #0f172a" },
                { selector: "section.hero", styleIncludes: "color: #e2e8f0" },
                { selector: "button.cta", styleIncludes: "background-color: #0d9488" },
                { selector: "button.cta", styleIncludes: "border-radius: 10px" },
                { selector: "button.cta", text: "Get started" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m16-l2",
        title: { en: "Contrast That Passes", fa: "کنتراستِ پاس‌شو" },
        goal: { en: "Meet WCAG contrast: 4.5:1 for body text, 3:1 for large text — and fix failures fast.", fa: "کنتراست WCAG رو رعایت کن: ‏۴٫۵ به ۱ برای متن بدنه و ‏۳ به ۱ برای متن بزرگ — و خرابی‌ها رو سریع درست کن." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Contrast = the luminance ratio between text and its background. **WCAG AA**: normal text needs **4.5:1**, large text (24px+, or 19px bold) needs **3:1**. The practical ladder on white: `#0f172a` ≈ 16:1, `#475569` ≈ 7.4:1, `#64748b` ≈ 4.8:1 — but `#cbd5e1` collapses to ≈ 1.9:1, unreadable. Keep body at `#475569` or darker, muted meta at `#64748b`.", fa: "کنتراست یعنی نسبت درخشندگی بین متن و بک‌گراندش. **‏WCAG AA**: متن معمولی به **۴٫۵ به ۱** نیاز داره و متن بزرگ (‏۲۴ پیکسل به بالا یا ‏۱۹ پیکسل توپر) به **۳ به ۱**. نردبون عملی روی سفید: ‏`#0f172a` حدود ۱۶ به ۱، ‏`#475569` حدود ۷٫۴ به ۱ و ‏`#64748b` حدود ۴٫۸ به ۱ — ولی ‏`#cbd5e1` سقوط می‌کنه به حدود ۱٫۹ به ۱، یعنی ناخوانا. متن بدنه رو روی ‏`#475569` یا تیره‌تر نگه دار و متای کم‌رنگ رو روی ‏`#64748b`." },
              { type: "code", lang: "css", runnable: false, code: `.body { color: #475569; } /* ≈ 7.4:1 ✓ */\n.meta { color: #64748b; } /* ≈ 4.8:1 ✓ */\n.bad  { color: #cbd5e1; } /* ≈ 1.9:1 ✗ */` },
              { type: "warn", en: "Gray-on-gray (e.g. #94a3b8 on #f1f5f9) is the most common silent failure. When in doubt, darken one step.", fa: "خاکستری روی خاکستری (مثل ‏#94a3b8 روی ‏#f1f5f9) رایج‌ترین شکست بی‌صداست. شک داشتی، یک پله تیره‌ترش کن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; display: flex; gap: 20px; flex-wrap: wrap; }\n    .demo { flex: 1; min-width: 220px; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; }\n    .fail { color: #cbd5e1; }\n    .pass { color: #475569; }\n    .meta { color: #64748b; font-size: 12px; }\n  </style>\n</head>\n<body>\n  <div class="demo">\n    <h3 style="margin: 0 0 8px; color: #cbd5e1;">Fails</h3>\n    <p class="fail" style="margin: 0 0 12px; line-height: 1.7;">This body text is roughly 1.9:1 — unreadable for many users.</p>\n    <div class="meta">fails WCAG AA</div>\n  </div>\n  <div class="demo">\n    <h3 style="margin: 0 0 8px; color: #0f172a;">Passes</h3>\n    <p class="pass" style="margin: 0 0 12px; line-height: 1.7;">This body text sits around 7.4:1 — comfortable for almost everyone.</p>\n    <div class="meta">passes WCAG AA</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Same cards, same size — only the text colors moved. Squint at your screen: if text disappears before shapes do, your contrast is broken. Squinting is the world's cheapest audit tool.", fa: "کارت‌ها یکسان‌ان و فقط رنگ متن‌ها فرق کرده. یه ذره چشمت رو جمع کن: اگه متن زودتر از شکل‌ها گم شد، کنتراستت خرابه. جمع‌کردن چشم ارزون‌ترین ابزار ممیزی دنیاست." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Minimum WCAG AA contrast for normal body text?", fa: "حداقل کنتراست ‏WCAG AA برای متن بدنه چنده؟" },
                options: [
                  { en: "4.5:1", fa: "‏۴٫۵ به ۱" },
                  { en: "2:1", fa: "‏۲ به ۱" },
                  { en: "10:1", fa: "‏۱۰ به ۱" },
                  { en: "1:1", fa: "‏۱ به ۱" },
                ],
                answer: 0,
                explain: { en: "4.5:1 for normal text; 3:1 for large text (24px+ or 19px bold).", fa: "‏۴٫۵ به ۱ برای متن معمولی؛ ‏۳ به ۱ برای متن بزرگ (‏۲۴ پیکسل به بالا یا ‏۱۹ پیکسل توپر)." },
              },
              {
                q: { en: "Your #cbd5e1 text fails. The fastest fix?", fa: "متن ‏#cbd5e1 ات رد شده. سریع‌ترین راه‌حل؟" },
                options: [
                  { en: "Darken the text color", fa: "رنگ متن رو تیره‌تر کن" },
                  { en: "Add a text-shadow", fa: "یه text-shadow اضافه کن" },
                  { en: "Make it bold", fa: "توپرش کن" },
                  { en: "Increase letter-spacing", fa: "فاصله حروف رو بیشتر کن" },
                ],
                answer: 0,
                explain: { en: "Contrast is text vs background — change one of them. Darkening the text is the one-line fix.", fa: "کنتراست یعنی متن در برابر بک‌گراند — یکی از این دو رو عوض کن. تیره‌کردن متن، درست‌کردنِ تک‌خطیه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Rescue the Text", fa: "متن رو نجات بده" },
            brief: { en: "Fix the contrast with inline styles: p.desc gets color: #475569 (was #cbd5e1) and div.meta gets color: #64748b (was #94a3b8). Keep everything else — sizes, spacing, texts.", fa: "کنتراست رو با استایل درون‌خطی درست کن: ‏p.desc می‌گیره ‏color: #475569 (قبلاً ‏#cbd5e1 بود) و ‏div.meta می‌گیره ‏color: #64748b (قبلاً ‏#94a3b8 بود). بقیه چیزها بمونن — اندازه‌ها، فاصله‌ها و متن‌ها." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Contrast</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <article class="card" style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; max-width: 420px;">\n    <h3 style="margin: 0 0 8px; color: #0f172a;">Release notes</h3>\n    <!-- TODO: rescue to #475569 -->\n    <p class="desc" style="margin: 0 0 12px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">Version 2.0 ships tonight: faster feeds, darker dark mode, zero new bugs (we counted).</p>\n    <!-- TODO: rescue to #64748b -->\n    <div class="meta" style="font-size: 12px; color: #94a3b8;">v2.0 · 5 min read</div>\n  </article>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Contrast</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <article class="card" style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; max-width: 420px;">\n    <h3 style="margin: 0 0 8px; color: #0f172a;">Release notes</h3>\n    <p class="desc" style="margin: 0 0 12px; font-size: 14px; line-height: 1.7; color: #475569;">Version 2.0 ships tonight: faster feeds, darker dark mode, zero new bugs (we counted).</p>\n    <div class="meta" style="font-size: 12px; color: #64748b;">v2.0 · 5 min read</div>\n  </article>\n</body>\n</html>`,
            hints: [
              { en: "Two declarations change: #cbd5e1 → #475569 and #94a3b8 → #64748b.", fa: "دو تعریف عوض می‌شه: از ‏#cbd5e1 به ‏#475569 و از ‏#94a3b8 به ‏#64748b." },
              { en: "Don't touch sizes or margins — contrast is a color-only fix.", fa: "به اندازه‌ها و مارجین‌ها دست نزن — کنتراست فقط با رنگ درست می‌شه." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "p.desc", styleIncludes: "color: #475569" },
                { selector: "div.meta", styleIncludes: "color: #64748b" },
                { selector: ".card h3", text: "Release notes" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m16-l3",
        title: { en: "Dark & Light Themes", fa: "تم تاریک و روشن" },
        goal: { en: "Map palette roles to a dark theme: inverted surfaces, lighter accents, glow instead of shadow.", fa: "نقش‌های پالت رو به تم تاریک منتقل کن: سطوح وارونه، اکسنت‌های روشن‌تر و درخشش به‌جای سایه." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A theme is the same **roles with different values**. Dark mode is not inverted white: surfaces go `#0f172a` → `#1e293b`, text goes `#e2e8f0`, and accents step LIGHTER (teal-600 `#0d9488` on light becomes `#22d3ee` on dark) to keep contrast. Shadows barely show on dark — borders and glows replace them. In real projects, CSS custom properties (`--bg`, `--text`) make the swap one line.", fa: "تم یعنی همون **نقش‌ها با مقادیر متفاوت**. دارک‌مود، سفیدِ وارونه نیست: سطوح می‌شن ‏`#0f172a` و ‏`#1e293b`، متن می‌شه ‏`#e2e8f0` و اکسنت‌ها یه پله *روشن‌تر* می‌شن (‏teal-600 یعنی ‏`#0d9488` روی زمینه روشن، روی تیره می‌شه ‏`#22d3ee`) تا کنتراست حفظ شه. سایه‌ها روی تیره به‌سختی دیده می‌شن — جاش رو بوردر و درخشش می‌گیره. در پروژه‌های واقعی، متغیرهای CSS (مثل ‏`--bg` و ‏`--text`) جابه‌جایی تم رو به یک خط تبدیل می‌کنن." },
              { type: "code", lang: "css", runnable: false, code: `:root { --bg: #f8fafc; --text: #0f172a; --accent: #0d9488; }\n[data-theme="dark"] {\n  --bg: #0f172a; --text: #e2e8f0; --accent: #22d3ee;\n}` },
              { type: "tip", en: "Never pure #000 with pure #fff text — the vibration tires eyes. Slate pairs are calmer.", fa: "هیچ‌وقت ‏#000 خالص با متن ‏#fff خالص — لرزشش چشم رو خسته می‌کنه. جفت‌های Slate آرام‌ترن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; display: flex; gap: 20px; flex-wrap: wrap; }\n    .theme { flex: 1; min-width: 220px; border-radius: 14px; padding: 20px; }\n    .light { background-color: #f8fafc; border: 1px solid #e2e8f0; color: #0f172a; }\n    .dark  { background-color: #0f172a; color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.15); }\n    .light .accent { color: #0d9488; }\n    .dark .accent { color: #22d3ee; }\n  </style>\n</head>\n<body>\n  <div class="theme light">\n    <h3 style="margin: 0 0 8px;">Light</h3>\n    <p style="margin: 0 0 8px; color: #64748b; line-height: 1.7;">Dark text on light slate, teal-600 accent.</p>\n    <span class="accent">Read the docs →</span>\n  </div>\n  <div class="theme dark">\n    <h3 style="margin: 0 0 8px;">Dark</h3>\n    <p style="margin: 0 0 8px; color: #94a3b8; line-height: 1.7;">Light text on deep slate — the accent steps UP to teal-300.</p>\n    <span class="accent">Read the docs →</span>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Same layout, same copy — three value swaps per role and the whole panel flips. Note the accent: darker teal on light, brighter cyan on dark. Roles are constants; values are the theme.", fa: "همون چیدمان و همون متن — برای هر نقش فقط سه تا مقدار عوض می‌شه و کل پنل برمی‌گرده. به اکسنت دقت کن: روی روشن، teal تیره‌تر و روی تیره، سایان روشن‌تر. نقش‌ها ثابت‌ان؛ مقادیر، خودِ تم‌ان." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "A dark-mode surface should be…", fa: "سطح تم تاریک باید … باشه." },
                options: [
                  { en: "Pure #000000", fa: "‏#000000 خالص" },
                  { en: "A deep slate like #0f172a", fa: "یه Slate عمیق مثل ‏#0f172a" },
                  { en: "The same white as light mode", fa: "همون سفید تم روشن" },
                  { en: "50% gray", fa: "خاکستری ۵۰٪" },
                ],
                answer: 1,
                explain: { en: "Pure black + pure white vibrates. Deep slate surfaces keep dark mode restful.", fa: "مشکی خالص + سفید خالص لرزش می‌ندازه. سطوح Slate عمیق دارک‌مود رو آروم نگه می‌دارن." },
              },
              {
                q: { en: "Accent #0d9488 on a dark surface often needs…", fa: "اکسنت ‏#0d9488 روی سطح تیره معمولاً به … نیاز داره." },
                options: [
                  { en: "A lighter tint like #22d3ee", fa: "یه ته‌رنگ روشن‌تر مثل ‏#22d3ee" },
                  { en: "An even darker tint", fa: "یه ته‌رنگ تیره‌تر" },
                  { en: "More padding", fa: "پدینگ بیشتر" },
                  { en: "An italic style", fa: "استایل ایتالیک" },
                ],
                answer: 0,
                explain: { en: "Accents must keep 4.5:1 against their surface — on dark, that means a brighter step.", fa: "اکسنت باید روی سطح خودش ۴٫۵ به ۱ نگه داره — روی تیره یعنی یه پله روشن‌تر." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Flip the Theme", fa: "تم رو برگردون" },
            brief: { en: "Give .page inline: background-color: #0f172a; color: #e2e8f0; padding: 24px. Give .card inline: background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 14px; padding: 20px. Give the p inside .card inline: color: #cbd5e1 — on dark surfaces light grays are CORRECT. Keep the texts.", fa: "به ‏.page استایل درون‌خطی ‏background-color: #0f172a; color: #e2e8f0; padding: 24px بده. به ‏.card استایل درون‌خطی ‏background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 14px; padding: 20px بده. به ‏p داخل ‏.card استایل درون‌خطی ‏color: #cbd5e1 بده — روی سطوح تیره، خاکستری‌های روشن *درست*‌ان. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Theming</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <!-- TODO: flip to dark surface -->\n  <div class="page" style="padding: 24px;">\n    <h1 style="margin: 0 0 16px; font-size: 24px;">Nebula settings</h1>\n    <!-- TODO: dark card skin with rgba hairline -->\n    <div class="card" style="background-color: #ffffff; border: 1px solid #e2e8f0;">\n      <h3 style="margin: 0 0 8px;">Appearance</h3>\n      <!-- TODO: light gray works on dark -->\n      <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #475569;">Pick how the cosmos greets you every morning.</p>\n    </div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Theming</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0;">\n  <div class="page" style="background-color: #0f172a; color: #e2e8f0; padding: 24px;">\n    <h1 style="margin: 0 0 16px; font-size: 24px;">Nebula settings</h1>\n    <div class="card" style="background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 14px; padding: 20px;">\n      <h3 style="margin: 0 0 8px;">Appearance</h3>\n      <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #cbd5e1;">Pick how the cosmos greets you every morning.</p>\n    </div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Three surfaces swap: page #f8fafc→#0f172a, card #fff→#1e293b, text #475569→#cbd5e1.", fa: "سه سطح جابه‌جا می‌شه: صفحه از ‏#f8fafc به ‏#0f172a، کارت از ‏#fff به ‏#1e293b و متن از ‏#475569 به ‏#cbd5e1." },
              { en: "The card's border becomes a 15% white hairline — solid #e2e8f0 is too loud here.", fa: "بوردر کارت می‌شه خط مویی ۱۵٪ سفید — ‏#e2e8f0 توپر این‌جا زیادی سر و صداده." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".page", styleIncludes: "background-color: #0f172a" },
                { selector: ".page", styleIncludes: "color: #e2e8f0" },
                { selector: ".card", styleIncludes: "background-color: #1e293b" },
                { selector: ".card", styleIncludes: "border: 1px solid rgba(255, 255, 255, 0.15)" },
                { selector: ".card p", styleIncludes: "color: #cbd5e1" },
                { selector: ".card h3", text: "Appearance" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m16-l4",
        title: { en: "Semantic Status Colors", fa: "رنگ‌های وضعیت معنایی" },
        goal: { en: "Use green/amber/red as a consistent success-warning-danger vocabulary with tinted pills.", fa: "سبز/کهربایی/قرمز رو به‌عنوان واژگان ثابت موفقیت-هشدار-خطر با قرص‌های رنگی به کار ببر." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Status colors are a **vocabulary**, not decoration: green `#22c55e` = success, amber `#f59e0b` = warning, red `#ef4444` = danger, blue `#38bdf8` = info. The pro recipe for pills and toasts: text in the DARK shade of the family (`#16a34a`, `#d97706`, `#dc2626`) over a 10–15% alpha tint of the same hue, with a matching 40% border. And never let red near your brand — red means *stop*.", fa: "رنگ‌های وضعیت یه **واژگان**‌ان، نه تزئین: سبز ‏`#22c55e` یعنی موفقیت، کهربایی ‏`#f59e0b` یعنی هشدار، قرمز ‏`#ef4444` یعنی خطر و آبی ‏`#38bdf8` یعنی اطلاع. دستور حرفه‌ای برای قرص‌ها و اعلان‌ها: متن با رنگ *تیره‌ی* همون خانواده (‏`#16a34a`، ‏`#d97706`، ‏`#dc2626`) روی یه ته‌رنگ ۱۰ تا ۱۵٪ آلفا از همون طیف، با بوردر ۴۰٪ هماهنگ. و قرمز رو به برندت نزدیک نکن — قرمز یعنی *بایست*." },
              { type: "code", lang: "css", runnable: false, code: `.ok   { color: #16a34a; background-color: rgba(34, 197, 94, 0.12); border: 1px solid rgba(34, 197, 94, 0.4); }\n.warn { color: #d97706; background-color: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.4); }\n.err  { color: #dc2626; background-color: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.4); }` },
              { type: "tip", en: "Dark family text on a same-hue tint keeps contrast high — even saturated fills stay readable.", fa: "متن تیره از جنس همون خانواده روی ته‌رنگ هم‌طیف، کنتراست رو بالا نگه می‌داره — حتی پرکننده‌های اشباع خوانا می‌مونن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; }\n    .pill { display: inline-block; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; margin: 0 8px 8px 0; }\n    .ok   { color: #16a34a; background-color: rgba(34, 197, 94, 0.12); border: 1px solid rgba(34, 197, 94, 0.4); }\n    .warn { color: #d97706; background-color: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.4); }\n    .err  { color: #dc2626; background-color: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.4); }\n  </style>\n</head>\n<body>\n  <div>\n    <span class="pill ok">Passed</span>\n    <span class="pill warn">Pending</span>\n    <span class="pill err">Failed</span>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Three pills, one grammar: dark text, 12% tint, 40% border — only the hue changes. Deploy this exact grammar to toasts, badges, table rows and charts, and users read status at a glance without reading a word.", fa: "سه قرص، یک گرامر: متن تیره، ته‌رنگ ۱۲٪ و بوردر ۴۰٪ — فقط طیف رنگ عوض می‌شه. همین گرامر رو دقیقاً به اعلان‌ها و بج‌ها و ردیف جدول‌ها و نمودارها ببر و کاربر بدون خوندن حتی یک کلمه، وضعیت رو از دور می‌فهمه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which color signals a destructive action?", fa: "کدوم رنگ یعنی اقدام مخرب؟" },
                options: [
                  { en: "Red (#ef4444 family)", fa: "قرمز (خانواده ‏#ef4444)" },
                  { en: "Green", fa: "سبز" },
                  { en: "Amber", fa: "کهربایی" },
                  { en: "Blue", fa: "آبی" },
                ],
                answer: 0,
                explain: { en: "Red = danger/stop. That's why branding avoids it — it must stay free for errors.", fa: "قرمز = خطر/بایست. برای همینه که برندها ازش دوری می‌کنن — باید برای خطاها آزاد بمونه." },
              },
              {
                q: { en: "A readable status pill pairs…", fa: "یه قرص وضعیت خوانا جفت می‌کنه …" },
                options: [
                  { en: "Dark family text on a same-hue tint with a 40% border", fa: "متن تیره از همون خانواده روی ته‌رنگ هم‌طیف با بوردر ۴۰٪" },
                  { en: "White text on a fully saturated background", fa: "متن سفید روی بک‌گراند کاملاً اشباع" },
                  { en: "Random pastel + underline", fa: "پاستل شانسی + زیرخط" },
                  { en: "Bold 18px text everywhere", fa: "متن توپر ۱۸ پیکسلی همه‌جا" },
                ],
                answer: 0,
                explain: { en: "Tint + dark text = readable at any size; the 40% border sharpens the shape.", fa: "ته‌رنگ + متن تیره = خوانا در هر اندازه؛ بوردر ۴۰٪ هم شکل رو تیز می‌کنه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Build the Status Board", fa: "تابلوی وضعیت بساز" },
            brief: { en: "Three pills, one grammar. Every .pill gets inline: padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; border: 1px solid <hue 0.4>; background-color: <hue 0.12>. .ok: hue #22c55e, color #16a34a, text Passed. .warn: hue #f59e0b, color #d97706, text Pending. .err: hue #ef4444, color #dc2626, text Failed.", fa: "سه قرص، یک گرامر. هر ‏.pill استایل درون‌خطی ‏padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; border: 1px solid <طیف ۰٫۴>; background-color: <طیف ۰٫۱۲> می‌گیره. ‏.ok: طیف ‏#22c55e و رنگ ‏#16a34a و متن ‏Passed. ‏.warn: طیف ‏#f59e0b و رنگ ‏#d97706 و متن ‏Pending. ‏.err: طیف ‏#ef4444 و رنگ ‏#dc2626 و متن ‏Failed." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Status</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <!-- TODO: one grammar, three hues -->\n  <div>\n    <span class="pill ok" style="padding: 6px 14px; border-radius: 999px; border: 1px solid #cbd5e1; color: #334155;">Passed</span>\n    <span class="pill warn" style="padding: 6px 14px; border-radius: 999px; border: 1px solid #cbd5e1; color: #334155;">Pending</span>\n    <span class="pill err" style="padding: 6px 14px; border-radius: 999px; border: 1px solid #cbd5e1; color: #334155;">Failed</span>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Status</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <div>\n    <span class="pill ok" style="padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; border: 1px solid rgba(34, 197, 94, 0.4); background-color: rgba(34, 197, 94, 0.12); color: #16a34a;">Passed</span>\n    <span class="pill warn" style="padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; border: 1px solid rgba(245, 158, 11, 0.4); background-color: rgba(245, 158, 11, 0.12); color: #d97706;">Pending</span>\n    <span class="pill err" style="padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; border: 1px solid rgba(239, 68, 68, 0.4); background-color: rgba(239, 68, 68, 0.12); color: #dc2626;">Failed</span>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Same shape everywhere; only hue changes. bg alpha 0.12, border alpha 0.4.", fa: "شکل همه‌جا یکی‌ست؛ فقط طیف عوض می‌شه. آلفای بک‌گراند ۰٫۱۲ و آلفای بوردر ۰٫۴." },
              { en: "Text colors are the DARK shade of each family: #16a34a, #d97706, #dc2626.", fa: "رنگ متن‌ها، سایه تیره هر خانواده‌ست: ‏#16a34a و ‏#d97706 و ‏#dc2626." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".pill", count: 3 },
                { selector: ".ok", styleIncludes: "background-color: rgba(34, 197, 94, 0.12)" },
                { selector: ".ok", styleIncludes: "color: #16a34a" },
                { selector: ".ok", text: "Passed" },
                { selector: ".warn", styleIncludes: "background-color: rgba(245, 158, 11, 0.12)" },
                { selector: ".err", styleIncludes: "background-color: rgba(239, 68, 68, 0.12)" },
                { selector: ".err", styleIncludes: "color: #dc2626" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m17",
    title: { en: "Typography Pro", fa: "تایپوگرافی حرفه‌ای" },
    blurb: {
      en: "Modular scales, vertical rhythm, tracking and fluid clamp() type — text that feels engineered.",
      fa: "مقیاس مدولار، ریتم عمودی، فاصله‌گذاری حروف و تایپ سیال با clamp — متنی که مهندسی‌شده حس می‌شه.",
    },
    lessons: [
      {
        id: "css-m17-l1",
        title: { en: "The Modular Scale", fa: "مقیاس مدولار" },
        goal: { en: "Derive every font size from one ratio so the hierarchy locks into place.", fa: "همه اندازه‌های فونت رو از یک نسبت بگیر تا سلسله‌مراتب قفل بشه." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Pick body = 16px, then multiply by a ratio — **1.25** is the workhorse: 16 → 20 → 25 → 31 → 39 → 49. Round to the ladder **16 / 20 / 24 / 32 / 40 / 48** and forbid everything else. One ratio = automatic hierarchy: h1 at 48, h2 at 32, h3 at 20–24, body 16, meta 12. Sizes stop being opinions and become math.", fa: "بدنه رو ‏16px بگیر و بعد در یک نسبت ضرب کن — **۱٫۲۵** اسبِ کار پُره: ‏۱۶ ← ‏۲۰ ← ‏۲۵ ← ‏۳۱ ← ‏۳۹ ← ‏۴۹. گردش کن روی نردبون **۱۶ / ۲۰ / ۲۴ / ۳۲ / ۴۰ / ۴۸** و بقیه اندازه‌ها رو ممنوع کن. یک نسبت یعنی سلسله‌مراتب خودکار: ‏h1 روی ۴۸، ‏h2 روی ۳۲، ‏h3 روی ۲۰ تا ۲۴، بدنه ۱۶ و متا ۱۲. اندازه‌ها دیگه سلیقه نیستن، ریاضی‌ان." },
              { type: "code", lang: "css", runnable: false, code: `h1 { font-size: 48px; }\nh2 { font-size: 32px; }\nh3 { font-size: 20px; }\np  { font-size: 16px; }\n.meta { font-size: 12px; }` },
              { type: "tip", en: "Five to six sizes cover an entire site. If you need a 7th, the design has a problem — not the scale.", fa: "پنج تا شش اندازه کل سایت رو پوشش می‌ده. اگه به هفتمی رسیدی، مشکل از طراحی‌ه — نه از مقیاس." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; max-width: 640px; }\n    h1 { font-size: 48px; margin: 0 0 8px; }\n    h3 { font-size: 20px; margin: 24px 0 8px; }\n    p { font-size: 16px; line-height: 1.7; margin: 0 0 16px; color: #475569; }\n    .meta { font-size: 12px; color: #64748b; }\n  </style>\n</head>\n<body>\n  <div class="meta">Case study · 5 min read</div>\n  <h1>One ratio to rule them all</h1>\n  <p>Every size on this page comes from 16 × 1.25, rounded to the ladder. Hierarchy appears without a single arbitrary number.</p>\n  <h3>Why it works</h3>\n  <p>Related sizes are visibly related, and jumps in size mean jumps in importance. The reader never has to think about it.</p>\n</body>\n</html>` },
              { type: "text", en: "Nothing on this page was eyeballed. 12 → 16 → 20 → 48, each step from the same base. That's why it feels calm: your eye solves the same equation everywhere.", fa: "هیچ اندازه‌ای توی این صفحه با حدس انتخاب نشده. از ۱۲ تا ۱۶ و ۲۰ و ۴۸، هر پله از همون پایه اومده. برای همینه که آرامش داره: چشم تو همه‌جا همون یک معادله رو حل می‌کنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "A modular scale means…", fa: "مقیاس مدولار یعنی…" },
                options: [
                  { en: "Sizes derived from one base × one ratio", fa: "اندازه‌هایی که از یک پایه × یک نسبت درمیان" },
                  { en: "A different size per device", fa: "برای هر دستگاه یه اندازه جدا" },
                  { en: "One size for everything", fa: "یه اندازه برای همه‌چیز" },
                  { en: "Only px units allowed", fa: "فقط واحد px مجازه" },
                ],
                answer: 0,
                explain: { en: "Base × ratio, rounded. Every size is a step on the same ladder.", fa: "پایه × نسبت، با گردکردن. هر اندازه یه پله از همون نردبونه." },
              },
              {
                q: { en: "Body 16 with ratio 1.25 gives…", fa: "بدنه ۱۶ با نسبت ۱٫۲۵ می‌شه …" },
                options: [
                  { en: "20", fa: "‏۲۰" },
                  { en: "18", fa: "‏۱۸" },
                  { en: "24", fa: "‏۲۴" },
                  { en: "32", fa: "‏۳۲" },
                ],
                answer: 0,
                explain: { en: "16 × 1.25 = 20 — the next rung up.", fa: "‏۱۶ × ۱٫۲۵ = ‏۲۰ — یعنی پله بعدی نردبون." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Lock the Ladder", fa: "نردبون رو قفل کن" },
            brief: { en: "Apply the ladder with inline styles: h1 gets font-size: 48px; line-height: 1.2; margin: 0 0 8px. p gets font-size: 16px; line-height: 1.7; margin: 0 0 16px; color: #475569. .meta gets font-size: 12px; color: #64748b. .kicker gets font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #0d9488. Replace every arbitrary size. Keep texts.", fa: "نردبون رو با استایل درون‌خطی اعمال کن: ‏h1 می‌گیره ‏font-size: 48px; line-height: 1.2; margin: 0 0 8px. ‏p می‌گیره ‏font-size: 16px; line-height: 1.7; margin: 0 0 16px; color: #475569. ‏.meta می‌گیره ‏font-size: 12px; color: #64748b. ‏.kicker می‌گیره ‏font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #0d9488. همه اندازه‌های شانسی رو عوض کن. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Ladder</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px; max-width: 640px;">\n  <!-- TODO: 12px + letter-spacing + uppercase + accent -->\n  <div class="kicker" style="color: #94a3b8;">Case study</div>\n  <!-- TODO: 48px from the ladder -->\n  <h1 style="margin: 0 0 8px; font-size: 31px;">One ratio to rule them all</h1>\n  <!-- TODO: 16px body + line-height 1.7 -->\n  <p style="margin: 0 0 16px; font-size: 15px;">Every size on this page should come from the same ladder — no arbitrary numbers.</p>\n  <!-- TODO: 12px muted meta -->\n  <div class="meta" style="font-size: 13px;">5 min read</div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Ladder</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px; max-width: 640px;">\n  <div class="kicker" style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #0d9488;">Case study</div>\n  <h1 style="margin: 0 0 8px; font-size: 48px; line-height: 1.2;">One ratio to rule them all</h1>\n  <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.7; color: #475569;">Every size on this page should come from the same ladder — no arbitrary numbers.</p>\n  <div class="meta" style="font-size: 12px; color: #64748b;">5 min read</div>\n</body>\n</html>`,
            hints: [
              { en: "Ladder values only: 48, 16, 12. No 31s, no 15s, no 13s.", fa: "فقط پله‌های نردبون: ‏۴۸ و ‏۱۶ و ‏۱۲. بدون ۳۱ و ۱۵ و ۱۳." },
              { en: "The kicker is the label recipe: 12px, letter-spacing: 2px, uppercase, accent color.", fa: "‏kicker همون دستور لیبل هست: ‏۱۲ پیکسل، ‏letter-spacing: 2px، حروف‌بزرگ و رنگ اکسنت." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", styleIncludes: "font-size: 48px" },
                { selector: "p", styleIncludes: "font-size: 16px" },
                { selector: ".meta", styleIncludes: "font-size: 12px" },
                { selector: ".kicker", styleIncludes: "letter-spacing: 2px" },
                { selector: ".kicker", styleIncludes: "text-transform: uppercase" },
                { selector: ".kicker", text: "Case study" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m17-l2",
        title: { en: "line-height & letter-spacing", fa: "‏line-height و letter-spacing" },
        goal: { en: "Set vertical rhythm and tracking: tight big headings, roomy body, spaced caps labels.", fa: "ریتم عمودی و فاصله حروف رو تنظیم کن: تیترهای بزرگ جمع‌تر، بدنه فضادار و لیبل‌های حروف‌بزرگ باز." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Two dials control text texture. **line-height**: 1.6–1.7 for paragraphs, 1.1–1.2 for big headings (tight = confident) — and keep it **unitless** so children compute their own. **letter-spacing**: negative (−0.5px to −1px) for large headings, because big glyphs look loose; positive (1–2px) ONLY for uppercase micro-labels. Never track lowercase body text.", fa: "دو ولوم بافت متن رو کنترل می‌کنن. **line-height**: برای پاراگراف ‏۱٫۶ تا ۱٫۷ و برای تیترهای بزرگ ‏۱٫۱ تا ۱٫۲ (جمع = مطمئن) — و همیشه **بدون واحد** بمونه تا فرزندها مقدار خودشون رو حساب کنن. **letter-spacing**: برای تیترهای بزرگ منفی (‏منفی ۰٫۵ تا منفی ۱ پیکسل) چون گلیف‌های بزرگ باز به نظر می‌رسن؛ و مثبت (‏۱ تا ۲ پیکسل) فقط برای میکرولیبل‌های حروف‌بزرگ. هیچ‌وقت متن lowercase بدنه رو فاصله‌دار نکن." },
              { type: "code", lang: "css", runnable: false, code: `h1   { font-size: 40px; line-height: 1.15; letter-spacing: -1px; }\np    { line-height: 1.7; }\n.eyebrow { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }` },
              { type: "warn", en: "Tracked-out lowercase body text = amateur hour. If it's not uppercase and tiny, don't space it.", fa: "فاصله‌گذاری روی متن lowercase بدنه = امضای تازه‌کار. اگه حروف‌بزرگ و ریز نیست، دست نزن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; display: flex; gap: 24px; flex-wrap: wrap; }\n    .demo { flex: 1; min-width: 240px; }\n    .tight h1 { font-size: 34px; line-height: 1.15; letter-spacing: -1px; margin: 0 0 8px; }\n    .loose h1 { font-size: 34px; line-height: 2; letter-spacing: 2px; margin: 0 0 8px; }\n    p { line-height: 1.7; color: #475569; margin: 0; font-size: 15px; }\n  </style>\n</head>\n<body>\n  <div class="demo tight"><h1>Confident</h1><p>Tight heading, roomy body. The title holds itself together.</p></div>\n  <div class="demo loose"><h1>D r o n i n g</h1><p>Loose heading, spaced body — texture leaks away.</p></div>\n</body>\n</html>` },
              { type: "text", en: "Left title breathes DOWN into its body; right title floats away in letter salad. Same font, same size — two dials. This is why two pages with identical fonts can feel completely different.", fa: "تیتر چپ *پایین* می‌رسه به بدنه‌ش؛ تیتر راست ته‌ته توی سالاد حروف گم می‌شه. همون فونت و همون اندازه — فقط دو تا ولوم. برای همینه که دو صفحه با فونت‌های یکسان می‌تونن حس کاملاً متفاوتی بدن." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Heading line-height sits around…", fa: "‏line-height تیترها حدود …" },
                options: [
                  { en: "1.1–1.2", fa: "‏۱٫۱ تا ۱٫۲" },
                  { en: "1.8", fa: "‏۱٫۸" },
                  { en: "1.0", fa: "‏۱٫۰" },
                  { en: "2.2", fa: "‏۲٫۲" },
                ],
                answer: 0,
                explain: { en: "Big type needs less leading: 1.1–1.2 reads tight and intentional.", fa: "متن بزرگ فاصله خط کمتر می‌خواد: ‏۱٫۱ تا ۱٫۲ جمع و هدفمنده." },
              },
              {
                q: { en: "letter-spacing: 2px belongs on…", fa: "‏letter-spacing: 2px جاش … هست." },
                options: [
                  { en: "Body paragraphs", fa: "پاراگراف‌های بدنه" },
                  { en: "Small uppercase labels", fa: "لیبل‌های ریز حروف‌بزرگ" },
                  { en: "Every link", fa: "همه لینک‌ها" },
                  { en: "Numbers only", fa: "فقط اعداد" },
                ],
                answer: 1,
                explain: { en: "Positive tracking + uppercase + small = the eyebrow-label recipe. Body text stays at 0.", fa: "فاصله مثبت + حروف‌بزرگ + ریز = دستور لیبل اِیبرو. متن بدنه همون صفر می‌مونه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Set the Texture", fa: "بافت رو تنظیم کن" },
            brief: { en: "Give h1.hero-title inline: font-size: 40px; line-height: 1.15; letter-spacing: -1px; margin: 0 0 12px. Give p inline: line-height: 1.7; margin: 0; color: #475569. Give span.eyebrow inline: font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #0d9488. Keep texts.", fa: "به ‏h1.hero-title استایل درون‌خطی ‏font-size: 40px; line-height: 1.15; letter-spacing: -1px; margin: 0 0 12px بده. به ‏p استایل درون‌خطی ‏line-height: 1.7; margin: 0; color: #475569 بده. به ‏span.eyebrow استایل درون‌خطی ‏font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #0d9488 بده. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Texture</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <!-- TODO: 12px + tracking 2px + uppercase -->\n  <span class="eyebrow">Design system</span>\n  <!-- TODO: 40px + tight line-height + negative tracking -->\n  <h1 class="hero-title" style="margin: 0 0 12px; font-size: 40px; line-height: 2;">Type that holds itself together</h1>\n  <!-- TODO: roomy body -->\n  <p style="margin: 0; color: #475569;">Two dials — line-height and letter-spacing — decide whether text whispers or mumbles.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Texture</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <span class="eyebrow" style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #0d9488;">Design system</span>\n  <h1 class="hero-title" style="margin: 0 0 12px; font-size: 40px; line-height: 1.15; letter-spacing: -1px;">Type that holds itself together</h1>\n  <p style="margin: 0; line-height: 1.7; color: #475569;">Two dials — line-height and letter-spacing — decide whether text whispers or mumbles.</p>\n</body>\n</html>`,
            hints: [
              { en: "Heading: line-height: 1.15 + letter-spacing: -1px. Body: line-height: 1.7, spacing 0.", fa: "تیتر: ‏line-height: 1.15 + ‏letter-spacing: -1px. بدنه: ‏line-height: 1.7 و فاصله صفر." },
              { en: "The eyebrow is uppercase + 2px tracking — it's the only element allowed to spread.", fa: "اِیبرو حروف‌بزرگ + فاصله ۲ پیکسلی — تنها عنصری که اجازه باز شدن داره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".hero-title", styleIncludes: "line-height: 1.15" },
                { selector: ".hero-title", styleIncludes: "letter-spacing: -1px" },
                { selector: "p", styleIncludes: "line-height: 1.7" },
                { selector: ".eyebrow", styleIncludes: "letter-spacing: 2px" },
                { selector: ".eyebrow", styleIncludes: "text-transform: uppercase" },
                { selector: ".eyebrow", text: "Design system" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m17-l3",
        title: { en: "Font Stacks That Never Break", fa: "استک فونت‌های ضدشکست" },
        goal: { en: "Write font-family lists with safe fallbacks and fast system fonts.", fa: "لیست‌های font-family با فالبک‌های امن و فونت‌های سیستمی سریع بنویس." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "`font-family` is a **fallback list**: the browser walks it left to right and uses the first font it actually has. Two rules: always end with a **generic family** (`sans-serif`, `monospace`, `serif`) as the safety net, and quote multi-word names (\"Segoe UI\"). The **system stack** (`system-ui`) loads instantly — zero network — and looks native. Web fonts: max two weights, plus `font-display: swap` so text shows immediately.", fa: "‏`font-family` یه **لیست فالبکه**: مرورگر از چپ به راست می‌ره و اولین فونتی که واقعاً داشته باشه رو استفاده می‌کنه. دو قانون: همیشه با یه **خانواده عمومی** (‏`sans-serif`، ‏`monospace` یا ‏`serif`) تمامش کن که تورِ ایمنی باشه، و اسم‌های چندکلمه‌ای رو داخل گیومه بذار (مثل \"Segoe UI\"). **استک سیستمی** (یعنی ‏`system-ui`) بدون حتی یک بایت دانلود فوری میاد و حس بومی می‌ده. فونت‌های وب: حداکثر دو وزن، به‌علاوه ‏`font-display: swap` تا متن بلافاصله نمایش داده شه." },
              { type: "code", lang: "css", runnable: false, code: `body { font-family: system-ui, sans-serif; }\n.code { font-family: ui-monospace, monospace; }\n/* web fonts: @font-face + font-display: swap */` },
              { type: "tip", en: "system-ui matches the user's OS font — your UI feels at home everywhere, for free.", fa: "‏system-ui همون فونت سیستم‌عامل کاربر رو می‌گیره — رابط شما همه‌جا بومی به نظر می‌رسه، مجانی." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; padding: 24px; }\n    .code {\n      font-family: ui-monospace, monospace;\n      background-color: #0f172a;\n      color: #67e8f9;\n      padding: 16px;\n      border-radius: 10px;\n      font-size: 14px;\n      margin: 0;\n    }\n  </style>\n</head>\n<body>\n  <p style="margin: 0 0 12px; color: #475569; line-height: 1.7;">The paragraph runs on the system stack — instant and native. The terminal below runs on the mono stack.</p>\n  <pre class="code">bun run dev --port 3000</pre>\n</body>\n</html>` },
              { type: "text", en: "Two stacks, two jobs: system-ui for reading, ui-monospace for code. Both end in a generic family, so even on a watch or a fridge the text renders. Fallback chains aren't pessimism — they're engineering.", fa: "دو استک، دو مأموریت: ‏system-ui برای خوندن و ‏ui-monospace برای کد. هر دو با یه خانواده عمومی تمام می‌شن، پس حتی روی ساعت مچی یا یخچال هم متن رندر می‌شه. زنجیره فالبک بدبینی نیست — مهندسیه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why end a font stack with a generic family?", fa: "چرا استک فونت رو با یه خانواده عمومی تمام می‌کنیم؟" },
                options: [
                  { en: "Guaranteed fallback when every named font is missing", fa: "فالبک تضمینی برای وقتی که همه فونت‌های اسمی غایبن" },
                  { en: "CSS validation demands it", fa: "اعتبارسنجی CSS اجباریش کرده" },
                  { en: "It makes text bolder", fa: "متن رو توپرتر می‌کنه" },
                  { en: "It's just a comment", fa: "فقط یه کامنته" },
                ],
                answer: 0,
                explain: { en: "sans-serif / monospace / serif always exist — the chain can never fully fail.", fa: "‏sans-serif و ‏monospace و ‏serif همیشه وجود دارن — زنجیره هیچ‌وقت کامل شکست نمی‌خوره." },
              },
              {
                q: { en: "The biggest win of system-ui?", fa: "بزرگ‌ترین برتری ‏system-ui چیه؟" },
                options: [
                  { en: "Zero download, instant native look", fa: "بدون دانلود، ظاهر بومی و فوری" },
                  { en: "Fancier glyphs", fa: "گلیف‌های فانتزی‌تر" },
                  { en: "Smaller line-height", fa: "‏line-height کوچیک‌تر" },
                  { en: "More colors", fa: "رنگ بیشتر" },
                ],
                answer: 0,
                explain: { en: "It's already installed — no network request, no flash of fallback text.", fa: "از قبل نصبه — بدون درخواست شبکه و بدون پرش متن فالبک." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Harden the Fonts", fa: "فونت‌ها رو محکم کن" },
            brief: { en: "Give body inline: font-family: system-ui, sans-serif; color: #0f172a. Give pre.code inline: font-family: ui-monospace, monospace; background-color: #0f172a; color: #67e8f9; padding: 16px; border-radius: 10px; font-size: 14px. Replace the toy cursive font. Keep texts.", fa: "به ‏body استایل درون‌خطی ‏font-family: system-ui, sans-serif; color: #0f172a بده. به ‏pre.code استایل درون‌خطی ‏font-family: ui-monospace, monospace; background-color: #0f172a; color: #67e8f9; padding: 16px; border-radius: 10px; font-size: 14px بده. فونت شوخیِ cursive رو باطل کن. متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Stacks</title>\n</head>\n<body style="margin: 0; padding: 24px; font-family: cursive;">\n  <p style="margin: 0 0 12px; line-height: 1.7; color: #475569;">A paragraph should read in the system stack — not in someone's handwriting.</p>\n  <!-- TODO: mono stack + terminal skin -->\n  <pre class="code">bun run dev --port 3000</pre>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Stacks</title>\n</head>\n<body style="margin: 0; padding: 24px; font-family: system-ui, sans-serif; color: #0f172a;">\n  <p style="margin: 0 0 12px; line-height: 1.7; color: #475569;">A paragraph should read in the system stack — not in someone's handwriting.</p>\n  <pre class="code" style="font-family: ui-monospace, monospace; background-color: #0f172a; color: #67e8f9; padding: 16px; border-radius: 10px; font-size: 14px;">bun run dev --port 3000</pre>\n</body>\n</html>`,
            hints: [
              { en: "Body: font-family: system-ui, sans-serif — system first, generic last.", fa: "‏body: ‏font-family: system-ui, sans-serif — اول سیستمی، آخر خانواده عمومی." },
              { en: "The code block runs ui-monospace, monospace — and gets the dark terminal skin.", fa: "بلاک کد با ‏ui-monospace, monospace کار می‌کنه — و پوست ترمینال تیره هم می‌گیره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "body", styleIncludes: "font-family: system-ui, sans-serif" },
                { selector: "pre.code", styleIncludes: "font-family: ui-monospace, monospace" },
                { selector: "pre.code", styleIncludes: "background-color: #0f172a" },
                { selector: "pre.code", styleIncludes: "border-radius: 10px" },
                { selector: "pre.code", text: "bun run dev --port 3000" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m17-l4",
        title: { en: "Fluid Type with clamp()", fa: "تایپ سیال با clamp()" },
        goal: { en: "Make headings breathe between min and max sizes — no media queries.", fa: "تیترها رو بین حداقل و حداکثر اندازه سیال کن — بدون مدیاکوئری." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "`clamp(min, preferred, max)` — the browser uses **preferred** while it sits between the bounds, and clamps to min on small screens or max on huge ones. Pair it with viewport units: `clamp(32px, 6vw, 64px)` scales a headline from 32 to 64 as the window grows. One line replaces a stack of media queries.", fa: "‏`clamp(min, preferred, max)` — مرورگر تا وقتی مقدار **preferred** بین مرزهاست ازش استفاده می‌کنه و پایین‌تر از حداقل یا بالاتر از حداکثر، همون مرز رو اعمال می‌کنه. با واحدهای viewport جفتش کن: ‏`clamp(32px, 6vw, 64px)` تیتر رو همراه بزرگ‌شدن پنجره از ۳۲ تا ۶۴ بزرگ می‌کنه. یک خط، جای یه دسته مدیاکوئری." },
              { type: "code", lang: "css", runnable: false, code: `h1 { font-size: clamp(32px, 6vw, 64px); }\np  { font-size: clamp(14px, 1.5vw, 18px); }` },
              { type: "warn", en: "vw-only sizes (5vw with no clamp) explode on 4K monitors and shrivel on phones — clamp is the seatbelt.", fa: "اندازه‌های فقط-vw (مثل ‏5vw بدون clamp) روی مانیتورهای ۴K منفجر می‌شن و روی موبایل آتیشی می‌شن — clamp همون کمربند ایمنیه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; padding: 24px; }\n    h1 { font-size: clamp(32px, 6vw, 64px); margin: 0 0 12px; }\n    p { font-size: clamp(14px, 1.5vw, 18px); line-height: 1.7; color: #475569; margin: 0; max-width: 560px; }\n  </style>\n</head>\n<body>\n  <h1>Resize the preview</h1>\n  <p>Drag the preview width: the headline glides between 32px and 64px, the paragraph between 14px and 18px. No media query was harmed.</p>\n</body>\n</html>` },
              { type: "text", en: "Drag the preview's width and watch the type glide — never jump. The vw term makes it fluid; the min and max make it sane. Type that responds like water is what \"modern\" feels like.", fa: "عرض پیش‌نمایش رو بکش و ببین تایپ چطور لیز می‌خوره — بدون پرش. عبارت vw سیالش می‌کنه و حداقل و حداکثر عقلانی نگهش می‌دارن. تایپی که مثل آب واکنش نشون می‌ده، همون حس «مدرن» رو می‌سازه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "clamp(28px, 5vw, 56px) on a 320px phone renders…", fa: "‏clamp(28px, 5vw, 56px) روی گوشی ۳۲۰ پیکسلی رندر می‌شه …" },
                options: [
                  { en: "28px — the min clamps the tiny 5vw", fa: "‏۲۸ پیکسل — حداقل، مقدار کوچیکِ ‏۵vw رو مهار می‌کنه" },
                  { en: "56px", fa: "‏۵۶ پیکسل" },
                  { en: "16px", fa: "‏۱۶ پیکسل" },
                  { en: "It crashes the page", fa: "صفحه رو می‌شکنه" },
                ],
                answer: 0,
                explain: { en: "5vw of 320px = 16px, below the min — so 28px wins. Clamp always keeps you inside bounds.", fa: "‏۵vw از ‏۳۲۰ پیکسل می‌شه ‏۱۶ که زیر حداقله — پس ‏۲۸ برنده می‌شه. ‏clamp همیشه نگهت داخل مرزها." },
              },
              {
                q: { en: "The three arguments of clamp() are…", fa: "سه آرگومان ‏clamp() عبارت‌ان از…" },
                options: [
                  { en: "min, preferred, max", fa: "min‏، preferred‏، max" },
                  { en: "max, min, average", fa: "max‏، min‏، average" },
                  { en: "start, stop, step", fa: "start‏، stop‏، step" },
                  { en: "small, medium, large", fa: "small‏، medium‏، large" },
                ],
                answer: 0,
                explain: { en: "Minimum, preferred value, maximum — in that exact order.", fa: "حداقل، مقدار ترجیحی، حداکثر — دقیقاً به همین ترتیب." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Fluid Headline", fa: "تیتر سیال" },
            brief: { en: "Give h1 inline: font-size: clamp(32px, 6vw, 64px); line-height: 1.2; margin: 0 0 12px. Give p inline: font-size: clamp(14px, 1.5vw, 18px); line-height: 1.7; color: #475569; margin: 0. Keep the viewport meta and the texts.", fa: "به ‏h1 استایل درون‌خطی ‏font-size: clamp(32px, 6vw, 64px); line-height: 1.2; margin: 0 0 12px بده. به ‏p استایل درون‌خطی ‏font-size: clamp(14px, 1.5vw, 18px); line-height: 1.7; color: #475569; margin: 0 بده. متای viewport و متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Fluid</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <!-- TODO: clamp(32px, 6vw, 64px) -->\n  <h1 style="margin: 0 0 12px; font-size: 64px; line-height: 1.2;">Fluid by default</h1>\n  <!-- TODO: clamp(14px, 1.5vw, 18px) -->\n  <p style="line-height: 1.7; color: #475569; margin: 0; font-size: 18px;">One clamp per element, and the whole page breathes with the viewport.</p>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Fluid</title>\n</head>\n<body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px;">\n  <h1 style="margin: 0 0 12px; font-size: clamp(32px, 6vw, 64px); line-height: 1.2;">Fluid by default</h1>\n  <p style="font-size: clamp(14px, 1.5vw, 18px); line-height: 1.7; color: #475569; margin: 0;">One clamp per element, and the whole page breathes with the viewport.</p>\n</body>\n</html>`,
            hints: [
              { en: "clamp(min, preferred, max) — for the h1 that's clamp(32px, 6vw, 64px).", fa: "‏clamp(min‏، preferred‏، max) — برای ‏h1 می‌شه ‏clamp(32px, 6vw, 64px)." },
              { en: "Mind the commas: three arguments, two commas, no spaces missing.", fa: "ویرگول‌ها رو چک کن: سه آرگومان و دو ویرگول، بدون فاصله جاافتاده." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", styleIncludes: "font-size: clamp(32px, 6vw, 64px)" },
                { selector: "h1", styleIncludes: "line-height: 1.2" },
                { selector: "p", styleIncludes: "font-size: clamp(14px, 1.5vw, 18px)" },
                { selector: "p", styleIncludes: "color: #475569" },
                { selector: "h1", text: "Fluid by default" },
              ],
            },
          },
        ],
      },
    ],
  },
  // __TEKA16_CSS_B_APPEND__
  {
    id: "css-m18",
    title: { en: "Micro-interactions", fa: "میکرواینتراکشن‌ها" },
    blurb: {
      en: "The tiny feedback moments — hover, focus, press and disabled — that make an interface feel alive.",
      fa: "لحظه‌های کوچک بازخورد — ‏hover و ‏focus و فشردن و غیرفعال — که باعث می‌شن یک رابط کاربری زنده به نظر برسه.",
    },
    lessons: [
      {
        id: "css-m18-l1",
        title: { en: "Hover: The Button That Answers", fa: "هاور: دکمه‌ای که جواب می‌ده" },
        goal: { en: "Turn dead buttons into responsive ones with :hover and transition.", fa: "با ‏hover و ‏transition دکمه‌های بی‌روح رو واکنش‌گرا کن." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A **micro-interaction** is one tiny cause-and-effect moment: you hover, the button answers; you focus, the field glows. The most common one lives in the `:hover` pseudo-class — styles that apply *only while the pointer rests on the element*. But a hover that snaps instantly feels mechanical. Declare `transition` on the resting state, and the change becomes a smooth 150–250ms animation.", fa: "**میکرواینتراکشن** یعنی یک لحظه کوچک علت و معلول: موس می‌ره روی دکمه، دکمه جواب می‌ده؛ روی فیلد فوکوس می‌کنی، فیلد می‌درخشه. رایج‌ترین نمونه در شبه‌کلاس ‏`:hover` زندگی می‌کنه — استایل‌هایی که فقط وقتی *نشانگر روی عنصر ایستاده* اعمال می‌شن. ولی هاوری که یک‌دفعه و بدون مقدمه عوض بشه حس رباتیک می‌ده. روی حالت عادی عنصر ‏`transition` اعلام کن تا تغییر، به یک انیمیشن نرم ‏۱۵۰ تا ‏۲۵۰ میلی‌ثانیه‌ای تبدیل بشه." },
              { type: "code", lang: "css", runnable: false, code: `.btn {\n  background-color: #6d28d9;\n  transition: background-color 0.2s, transform 0.2s;\n}\n.btn:hover {\n  background-color: #8b5cf6;\n  transform: translateY(-2px);\n}` },
              { type: "tip", en: "150–250ms is the sweet spot for hover: fast enough to feel instant, slow enough to be seen. Below 100ms reads as a glitch, above 400ms feels laggy.", fa: "‏۱۵۰ تا ‏۲۵۰ میلی‌ثانیه نقطه طلایی برای hover هست: به‌قدری سریع که لحظه‌ای به نظر برسه و به‌قدری کند که دیده بشه. زیر ‏۱۰۰ میلی‌ثانیه شبیه خطا می‌شه و بالای ‏۴۰۰ میلی‌ثانیه حس کندی می‌ده." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; min-height: 100vh; display: flex; gap: 24px; justify-content: center; align-items: center; background-color: #0f172a; font-family: system-ui, sans-serif; }\n    .robot { border: 0; padding: 12px 24px; border-radius: 12px; background-color: #334155; color: #e2e8f0; }\n    .robot:hover { background-color: #475569; }\n    .alive { border: 0; padding: 12px 24px; border-radius: 12px; background-color: #6d28d9; color: #ffffff; cursor: pointer; transition: background-color 0.2s, transform 0.2s; }\n    .alive:hover { background-color: #8b5cf6; transform: translateY(-2px); }\n  </style>\n</head>\n<body>\n  <button class="robot">Robot mode</button>\n  <button class="alive">Alive mode</button>\n</body>\n</html>` },
              { type: "text", en: "Hover the two buttons: the left one teleports between colors, the right one glides. The magic is only the `transition` line — it tells the browser «when background-color or transform changes, take 0.2s to get there». Everything else about the two buttons is identical.", fa: "موس رو ببر روی هر دو دکمه: دکمه چپ بین دو رنگ تلپورت می‌شه و دکمه راست نرم سُر می‌خوره. همه‌ی جادو فقط همون خط ‏`transition` هست — به مرورگر می‌گه «هر وقت ‏background-color یا ‏transform عوض شد، ‏۰٫۲ ثانیه وقت بذار تا به مقصد برسی». بقیه‌ی مشخصات دو دکمه دقیقاً یکیه." },
              { type: "warn", en: "Hover doesn't exist on touch screens — a finger taps, it never hovers. Never hide critical information or the only path to an action behind :hover; use it for polish, not for function.", fa: "روی صفحه‌های لمسی خبری از hover نیست — انگشت ضربه می‌زنه، هاور نمی‌کنه. هیچ‌وقت اطلاعات مهم یا تنها راه رسیدن به یک عمل رو پشت ‏:hover مخفی نکن؛ ازش فقط برای پرداخت جزئیات استفاده کن، نه برای عملکرد اصلی." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "When do :hover styles apply?", fa: "استایل‌های ‏:hover چه زمانی اعمال می‌شن؟" },
                options: [
                  { en: "Only while the pointer is over the element", fa: "فقط وقتی نشانگر موس روی عنصره" },
                  { en: "Permanently, until the page reloads", fa: "برای همیشه، تا وقتی صفحه رفرش بشه" },
                  { en: "Only right after a click", fa: "فقط بلافاصله بعد از کلیک" },
                  { en: "Only on touch screens", fa: "فقط روی صفحه‌های لمسی" },
                ],
                answer: 0,
                explain: { en: ":hover is active exactly while the pointer rests on the element — entering applies it, leaving removes it.", fa: "‏:hover دقیقاً وقتی فعاله که نشانگر روی عنصر باشه — با ورود روشن و با خروج خاموش می‌شه." },
              },
              {
                q: { en: "What does `transition: background-color 0.2s` on the resting state do?", fa: "‏`transition: background-color 0.2s` روی حالت عادی عنصر چه کاری می‌کنه؟" },
                options: [
                  { en: "Animates every background-color change over 0.2 seconds", fa: "هر تغییری در ‏background-color رو طی ‏۰٫۲ ثانیه انیمیت می‌کنه" },
                  { en: "Delays the hover by 0.2 seconds before it starts", fa: "شروع ‏hover رو ‏۰٫۲ ثانیه عقب می‌ندازه" },
                  { en: "Makes the color permanently lighter", fa: "رنگ رو برای همیشه روشن‌تر می‌کنه" },
                  { en: "Nothing — transitions belong inside :hover", fa: "هیچی — جاش داخل ‏:hover هست" },
                ],
                answer: 0,
                explain: { en: "Declared on the resting state, transition watches that property and animates it whenever it changes — both into and out of :hover.", fa: "وقتی روی حالت عادی اعلام بشه، ‏transition اون ویژگی رو همیشه زیر نظر داره و هر تغییری رو انیمیت می‌کنه — هم موقع ورود به ‏:hover و هم موقع خروج ازش." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Answering Button", fa: "دکمه‌ای که جواب می‌ده" },
            brief: { en: "Give the .cta button inline: background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; cursor: pointer; and transition: background-color 0.2s, transform 0.2s. Keep the button text \"Start now\" and the h1 \"Pricing\" above it.", fa: "به دکمه‌ی ‏.cta استایل درون‌خطی ‏background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; cursor: pointer; و ‏transition: background-color 0.2s, transform 0.2s بده. متن دکمه «Start now» و تیتر بالای صفحه «Pricing» سر جاش بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Pricing</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">\n  <h1 style="margin: 0; font-size: 28px;">Pricing</h1>\n  <!-- TODO: add cursor: pointer + transition: background-color 0.2s, transform 0.2s -->\n  <button class="cta" style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; font-size: 16px;">Start now</button>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Pricing</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">\n  <h1 style="margin: 0; font-size: 28px;">Pricing</h1>\n  <button class="cta" style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; font-size: 16px; cursor: pointer; transition: background-color 0.2s, transform 0.2s;">Start now</button>\n</body>\n</html>`,
            hints: [
              { en: "Two declarations are missing: cursor: pointer and the transition line with both properties.", fa: "دو تعریف جا افتاده: ‏cursor: pointer و خط ‏transition که هر دو ویژگی رو داشته باشه." },
              { en: "The transition value is `background-color 0.2s, transform 0.2s` — two pairs, one comma.", fa: "مقدار ‏transition می‌شه ‏`background-color 0.2s, transform 0.2s` — دو جفت، با یه ویرگول." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".cta", styleIncludes: "background-color: #6d28d9" },
                { selector: ".cta", styleIncludes: "color: #ffffff" },
                { selector: ".cta", styleIncludes: "cursor: pointer" },
                { selector: ".cta", styleIncludes: "transition: background-color 0.2s, transform 0.2s" },
                { selector: ".cta", text: "Start now" },
                { selector: "h1", text: "Pricing" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m18-l2",
        title: { en: "Focus: The Keyboard Spotlight", fa: "فوکوس: نورافکن کیبورد" },
        goal: { en: "Make focus rings visible and beautiful instead of deleting them.", fa: "حلقه فوکوس رو به‌جای حذف‌کردن، مرئی و زیبا کن." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**Focus** is the state of the element that receives your keystrokes. Press **Tab** and a ring hops from link to link — that ring is the only way keyboard users know where they are. The oldest crime in web design is `outline: none` with no replacement: it erases the user's map. Keep the ring, restyle it — `:focus-visible` fires for keyboard focus while plain mouse clicks stay clean.", fa: "**فوکوس** حالت عنصریه که ضربه‌های کیبورد رو دریافت می‌کنه. ‏**Tab** رو بزن تا یه حلقه از لینکی به لینک دیگه بپره — اون حلقه تنها راهیه که کاربر کیبورد می‌فهمه الان کجاست. قدیمی‌ترین جنایت طراحی وب اینه که با ‏`outline: none` حلقه رو پاک کنی و هیچ جایگزینی نذاری: نقشه‌ی کاربر پاک می‌شه. حلقه رو نگه دار و فقط شکلش رو عوض کن — ‏`:focus-visible` برای فوکوس کیبورد فعاله و کلیک ساده‌ی موس رو درگیر نمی‌کنه." },
              { type: "code", lang: "css", runnable: false, code: `input {\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  outline: none;\n}\ninput:focus-visible {\n  outline: 2px solid #22d3ee;\n  outline-offset: 2px;\n}` },
              { type: "warn", en: "`outline` draws on top of the element and takes no layout space — unlike `border`, adding or removing it never shifts the page. That's exactly why it's the right tool for state rings.", fa: "‏outline روی عنصر کشیده می‌شه و هیچ فضایی در چیدمان نمی‌گیره — برخلاف ‏border، اضافه یا حذف‌کردنش هیچ‌وقت صفحه رو جابه‌جا نمی‌کنه. دقیقاً به همین دلیل ابزار درست برای حلقه‌ی حالت‌هاست." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; padding: 24px; }\n    label { display: block; font-weight: 700; margin-bottom: 6px; }\n    input { border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; width: 260px; outline: none; }\n    input:focus-visible { outline: 2px solid #22d3ee; outline-offset: 2px; }\n    button { border: 0; background-color: #0f172a; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer; }\n    button:focus-visible { outline: 2px solid #22d3ee; outline-offset: 2px; }\n  </style>\n</head>\n<body>\n  <label for="email">Email</label>\n  <input id="email" type="email" placeholder="you@example.com">\n  <button>Subscribe</button>\n</body>\n</html>` },
              { type: "text", en: "Click into the field, then press **Tab** a few times and watch the cyan ring travel from input to button. Mouse clicks keep the page clean; keyboard travel gets a glowing trail. One pattern, both worlds.", fa: "توی فیلد کلیک کن، بعد چند بار ‏**Tab** بزن و ببین حلقه فیروزه‌ای از فیلد به دکمه می‌رسه. کلیک موس صفحه رو تمیز نگه می‌داره و پیمایش با کیبورد یه رد نورانی از خودش به‌جا می‌ذاره. یک الگو، هر دو دنیا." },
              { type: "tip", en: "`outline-offset: 2px` pushes the ring 2px away from the element's edge — a small gap that makes the ring look intentional instead of glued on.", fa: "‏`outline-offset: 2px` حلقه رو ‏۲ پیکسل از لبه عنصر فاصله می‌ده — همین فاصله‌ی کوچیک باعث می‌شه حلقه عمدی و حرفه‌ای به نظر برسه، نه چسبیده به بدنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why is bare `outline: none` on inputs a crime?", fa: "چرا ‏`outline: none` خالی روی فیلدها جنایته؟" },
                options: [
                  { en: "Keyboard users lose their only sign of where they are", fa: "کاربر کیبورد تنها نشونه‌ی جای خودش رو از دست می‌ده" },
                  { en: "It makes the input slower", fa: "فیلد رو کند می‌کنه" },
                  { en: "It breaks the form submit", fa: "ارسال فرم رو می‌شکنه" },
                  { en: "It isn't — it's modern best practice", fa: "جنایت نیست — دقیقاً روش مدرنه" },
                ],
                answer: 0,
                explain: { en: "Without a visible focus indicator, keyboard users can't tell which element is active. Replace the default ring, don't delete it.", fa: "بدون نشونه‌ی مرئی فوکوس، کاربر کیبورد نمی‌فهمه الان کدوم عنصر فعاله. حلقه پیش‌فرض رو جایگزین کن، حذفش نکن." },
              },
              {
                q: { en: "What's the practical difference between outline and border?", fa: "تفاوت عملی ‏outline با ‏border چیه؟" },
                options: [
                  { en: "Outline never shifts the layout", fa: "‏outline هیچ‌وقت چیدمان رو جابه‌جا نمی‌کنه" },
                  { en: "Border can't have a color", fa: "‏border نمی‌تونه رنگ بگیره" },
                  { en: "Outline only works on buttons", fa: "‏outline فقط روی دکمه‌ها کار می‌کنه" },
                  { en: "They're aliases for the same thing", fa: "هر دو اسم یک چیز هستن" },
                ],
                answer: 0,
                explain: { en: "Border participates in the box model; outline is drawn on top and reserves no space — perfect for rings that appear and disappear.", fa: "‏border بخشی از مدل جعبه‌ست و جا می‌گیره؛ ‏outline روی عنصر کشیده می‌شه و جایی اشغال نمی‌کنه — برای حلقه‌هایی که میان و می‌رن عالیه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Keyboard Spotlight", fa: "نورافکن کیبورد" },
            brief: { en: "Give the input inline: border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; outline: 2px solid #22d3ee; outline-offset: 2px. Keep type=\"email\", placeholder=\"you@example.com\", the label \"Email\" and the button \"Subscribe\".", fa: "به فیلد ورودی استایل درون‌خطی ‏border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; outline: 2px solid #22d3ee; outline-offset: 2px بده. مقدار ‏type=\"email\" و ‏placeholder=\"you@example.com\" و برچسب «Email» و دکمه‌ی «Subscribe» سر جاش بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Subscribe</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px;">\n  <label for="email" style="display: block; font-weight: 700; margin-bottom: 8px;">Email</label>\n  <!-- TODO: outline: 2px solid #22d3ee + outline-offset: 2px -->\n  <input id="email" type="email" placeholder="you@example.com" style="border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; font-size: 14px;">\n  <button style="margin-top: 16px; border: 0; background-color: #0f172a; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer;">Subscribe</button>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Subscribe</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px;">\n  <label for="email" style="display: block; font-weight: 700; margin-bottom: 8px;">Email</label>\n  <input id="email" type="email" placeholder="you@example.com" style="outline: 2px solid #22d3ee; outline-offset: 2px; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; font-size: 14px;">\n  <button style="margin-top: 16px; border: 0; background-color: #0f172a; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer;">Subscribe</button>\n</body>\n</html>`,
            hints: [
              { en: "Two declarations: outline: 2px solid #22d3ee and outline-offset: 2px.", fa: "دو تعریف: ‏outline: 2px solid #22d3ee و ‏outline-offset: 2px." },
              { en: "Both go in the input's inline style — order doesn't matter.", fa: "هر دو توی استایل درون‌خطی فیلد میان — ترتیبشون مهم نیست." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "input", attrName: "type", attrValue: "email" },
                { selector: "input", attrName: "placeholder", attrValue: "you@example.com" },
                { selector: "input", styleIncludes: "outline: 2px solid #22d3ee" },
                { selector: "input", styleIncludes: "outline-offset: 2px" },
                { selector: "input", styleIncludes: "border-radius: 10px" },
                { selector: "label", text: "Email" },
                { selector: "button", text: "Subscribe" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m18-l3",
        title: { en: "The Lift: Shadow & Transform", fa: "بلند شدن: سایه و ترنسفورم" },
        goal: { en: "Give cards a physical hover lift with transform and shadows.", fa: "به کارت‌ها با ‏transform و سایه، بلند شدنِ فیزیکی بده." },
        minutes: 16,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The **lift** is the most copied card interaction on the web: on hover the card rises a few pixels and its shadow grows. It feels physical because it mimics gravity — closer means higher, and closer means a bigger shadow. Two properties do all the work: `transform: translateY(-4px)` moves without touching layout, and a larger `box-shadow` sells the height.", fa: "**بلند شدن** معروف‌ترین تعامل کارت در وب هست: با hover کارت چند پیکسل بالا می‌ره و سایه‌اش بزرگ‌تر می‌شه. فیزیکی حس می‌شه چون جاذبه رو تقلید می‌کنه — نزدیک‌تر یعنی بالاتر و نزدیک‌تر یعنی سایه‌ی بزرگ‌تر. همه‌ی کار رو دو ویژگی انجام می‌دن: ‏`transform: translateY(-4px)` بدون دست‌زدن به چیدمان جابه‌جا می‌کنه و ‏`box-shadow` بزرگ‌تر، حس ارتفاع رو منتقل می‌کنه." },
              { type: "code", lang: "css", runnable: false, code: `.card {\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15);\n  transition: transform 0.25s, box-shadow 0.25s;\n}\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2);\n}` },
              { type: "tip", en: "box-shadow's four numbers, in order: `X` (right), `Y` (down), `blur` (softness), `spread` (size). Hover shadows want a big Y and a big blur — as if light comes from above.", fa: "چهار عدد ‏box-shadow به ترتیب: ‏X (راست)، ‏Y (پایین)، ‏blur (نرمی) و ‏spread (اندازه). سایه‌ی حالت hover ‏Y بزرگ و ‏blur بزرگ می‌خواد — انگار نور از بالا می‌تابه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; min-height: 100vh; display: flex; gap: 24px; justify-content: center; align-items: center; background-color: #f1f5f9; font-family: system-ui, sans-serif; }\n    .card { width: 200px; padding: 24px; border-radius: 16px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15); transition: transform 0.25s, box-shadow 0.25s; }\n    .card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2); }\n    h3 { margin: 0 0 6px; }\n    p { margin: 0; color: #64748b; font-size: 14px; }\n  </style>\n</head>\n<body>\n  <div class="card"><h3>Notes</h3><p>Hover me — I rise.</p></div>\n  <div class="card"><h3>Tokens</h3><p>Me too, softly.</p></div>\n</body>\n</html>` },
              { type: "text", en: "Hover the cards: they rise, the shadow deepens, and nothing else on the page twitches. That's the point — `transform` is GPU-accelerated and skips layout entirely, so animating it never triggers reflow. Transform and opacity are the golden pair of performant motion.", fa: "موس رو ببر روی کارت‌ها: بالا می‌رن، سایه عمیق‌تر می‌شه و هیچ چیز دیگه‌ای توی صفحه تکان نمی‌خوره. نکته همینه — ‏transform با ‏GPU اجرا می‌شه و از چیدمان کاملاً رد می‌شه، پس انیمیت‌کردنش هیچ‌وقت باعث چیدمان دوباره نمی‌شه. ‏transform و ‏opacity جفت طلایی انیمیشن سبک هستن." },
              { type: "warn", en: "Too dark or too wide shadows turn cards into floating bricks. Stay subtle: 10–25px blur and 0.15–0.25 alpha. Depth whispers; it doesn't shout.", fa: "سایه‌های خیلی تیره یا خیلی پهن، کارت رو تبدیل به یه آجر شناور می‌کنن. ملایم بمون: ‏blur بین ‏۱۰ تا ‏۲۵ پیکسل و شفافیت بین ‏۰٫۱۵ تا ‏۰٫۲۵. عمق باید زمزمه کنه، نه داد بزنه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why animate transform instead of top or margin?", fa: "چرا به‌جای ‏top یا ‏margin، ویژگی ‏transform رو انیمیت می‌کنیم؟" },
                options: [
                  { en: "Transform skips layout — the work happens on the GPU", fa: "چون ‏transform از چیدمان رد می‌شه و کارش با ‏GPU انجام می‌شه" },
                  { en: "top is not a real CSS property", fa: "چون ‏top اصلاً ویژگی واقعی ‏CSS نیست" },
                  { en: "margin cannot be transitioned", fa: "چون ‏margin رو نمی‌شه انیمیت کرد" },
                  { en: "transform is only for images", fa: "چون ‏transform فقط برای عکس‌هاست" },
                ],
                answer: 0,
                explain: { en: "top/margin changes force the browser to re-layout the page every frame; transform is composited on the GPU — smooth 60fps for free.", fa: "تغییر ‏top یا ‏margin هر فریم مرورگر رو مجبور به چیدمان دوباره می‌کنه؛ ولی ‏transform روی ‏GPU ترکیب می‌شه — یعنی ‏۶۰ فریم روان، رایگان." },
              },
              {
                q: { en: "In `box-shadow: 0 12px 24px rgba(...)`, the 24 is…", fa: "در ‏`box-shadow: 0 12px 24px rgba(...)` عدد ‏۲۴ چیه؟" },
                options: [
                  { en: "The blur radius", fa: "شعاع نرمی (‏blur)" },
                  { en: "The horizontal offset", fa: "جابه‌جایی افقی" },
                  { en: "The shadow's transparency", fa: "شفافیت سایه" },
                  { en: "The border width", fa: "پهنای خط دور" },
                ],
                answer: 0,
                explain: { en: "Third number = blur: how soft the shadow's edge is. 0 would be razor sharp; 24 is dreamy soft.", fa: "عدد سوم یعنی ‏blur: میزان نرمی لبه‌ی سایه. صفرش کنی لبه‌ش مثل تیغ می‌شه؛ ‏۲۴ یعنی مه‌آلود و نرم." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Floating Plans", fa: "تعرفه‌های شناور" },
            brief: { en: "Two plan cards: give the .pro card inline: transform: translateY(-4px); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2); and give the .basic card inline: box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15). Keep both cards' padding: 20px and border-radius: 16px, and the texts \"Basic\" / \"Pro\".", fa: "دو کارت اشتراک داری: به کارت ‏.pro استایل درون‌خطی ‏transform: translateY(-4px); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2); بده و به کارت ‏.basic استایل درون‌خطی ‏box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15). ‏padding: 20px و ‏border-radius: 16px هر دو کارت بمونه و متن‌های «Basic» و «Pro» هم سر جاشون باشن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Plans</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px; display: flex; gap: 20px;">\n  <!-- TODO: .basic needs box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15) -->\n  <!-- TODO: .pro needs transform: translateY(-4px) + box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2) -->\n  <div class="plan basic" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #ffffff;"><h3 style="margin: 0 0 6px;">Basic</h3><p style="margin: 0; color: #64748b;">The essentials.</p></div>\n  <div class="plan pro" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #ffffff;"><h3 style="margin: 0 0 6px;">Pro</h3><p style="margin: 0; color: #64748b;">Everything, plus more.</p></div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Plans</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px; display: flex; gap: 20px;">\n  <div class="plan basic" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15);"><h3 style="margin: 0 0 6px;">Basic</h3><p style="margin: 0; color: #64748b;">The essentials.</p></div>\n  <div class="plan pro" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #ffffff; transform: translateY(-4px); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2);"><h3 style="margin: 0 0 6px;">Pro</h3><p style="margin: 0; color: #64748b;">Everything, plus more.</p></div>\n</body>\n</html>`,
            hints: [
              { en: "Basic gets the small resting shadow; Pro gets translateY(-4px) plus the big 0 12px 24px shadow.", fa: "‏Basic سایه‌ی کوچیک حالت عادی رو می‌گیره و ‏Pro علاوه بر سایه‌ی بزرگ ‏0 12px 24px، مقدار ‏translateY(-4px) رو هم می‌گیره." },
              { en: "Copy the rgba values exactly: 0.15 for Basic, 0.2 for Pro.", fa: "مقادیر ‏rgba رو دقیق کپی کن: ‏0.15 برای ‏Basic و ‏0.2 برای ‏Pro." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".plan", count: 2 },
                { selector: ".basic", styleIncludes: "box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15)" },
                { selector: ".pro", styleIncludes: "transform: translateY(-4px)" },
                { selector: ".pro", styleIncludes: "box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2)" },
                { selector: ".basic", text: "Basic" },
                { selector: ".pro", text: "Pro" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m18-l4",
        title: { en: "Press & Disabled States", fa: "حالت فشردن و غیرفعال" },
        goal: { en: "Complete the button's state machine: :active feedback and honest disabled styling.", fa: "ماشین حالت دکمه رو کامل کن: بازخورد ‏:active و استایل صادقانه‌ی حالت غیرفعال." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A button lives through states: **hover** (pointer resting), **active** (the exact moment of pressing), **focus** (the keyboard spotlight) and **disabled** (off duty). `:active` lasts a split second, so its feedback must be tiny — sink the button 1px and drop its shadow. That micro-sink is what makes a click feel like it *landed*.", fa: "یک دکمه در طول عمرش چند حالت رو تجربه می‌کنه: ‏**hover** (نشانگر روی دکمه)، ‏**active** (همون لحظه‌ی فشردن)، ‏**focus** (نورافکن کیبورد) و ‏**disabled** (تعطیل). ‏`:active` فقط کسری از ثانیه طول می‌کشه، پس بازخوردش هم باید کوچیک باشه — دکمه رو ‏۱ پیکسل فرو ببر و سایه‌اش رو بردار. همین فرورفتن کوچیکه که باعث می‌شه حس کنی کلیک واقعاً *نشست*." },
              { type: "code", lang: "css", runnable: false, code: `.btn:active {\n  transform: translateY(1px);\n  box-shadow: none;\n}\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}` },
              { type: "tip", en: "`cursor: not-allowed` is honest communication — but styling alone never blocks clicks. Pair the look with the real `disabled` attribute: the attribute stops the event, the style explains why.", fa: "‏`cursor: not-allowed` پیام صادقانه‌ایه — ولی استایل به‌تنهایی هیچ‌وقت جلوی کلیک رو نمی‌گیره. ظاهر رو با ویژگی واقعی ‏`disabled` جفت کن: ویژگی رویداد رو متوقف می‌کنه و استایل توضیح می‌ده که چرا." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; min-height: 100vh; display: flex; gap: 16px; justify-content: center; align-items: center; background-color: #f8fafc; font-family: system-ui, sans-serif; }\n    .btn { border: 0; padding: 12px 24px; border-radius: 12px; background-color: #6d28d9; color: #ffffff; cursor: pointer; box-shadow: 0 6px 14px rgba(109, 40, 217, 0.35); transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s; }\n    .btn:hover { box-shadow: 0 8px 18px rgba(109, 40, 217, 0.45); }\n    .btn:active { transform: translateY(1px); box-shadow: none; }\n    .btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }\n  </style>\n</head>\n<body>\n  <button class="btn">Press me</button>\n  <button class="btn" disabled>Off duty</button>\n</body>\n</html>` },
              { type: "text", en: "Tab through the demo: the live button joins the focus game, the disabled one is skipped entirely — disabled elements can't receive focus and leave the keyboard flow. One more reason to *show* why something is off duty with visible gray styling, not just in code.", fa: "با ‏Tab از دمو رد شو: دکمه‌ی سالم وارد بازی حلقه فوکوس می‌شه ولی دکمه‌ی غیرفعال کلاً رد می‌شه — عناصر disabled فوکوس نمی‌گیرن و از مسیر کیبورد حذف می‌شن. یه دلیل دیگه همینه که با استایل خاکستری و مرئی *نشون بدی* چرا یه چیزی تعطیله، نه فقط توی کد." },
              { type: "warn", en: "Disabled doesn't mean invisible: keep roughly 45% contrast with the background. A button that melts into the page makes users ask \"was this ever here?\"", fa: "غیرفعال به معنی نامرئی نیست: حدود ‏۴۵٪ تضاد با پس‌زمینه رو نگه دار. دکمه‌ای که توی صفحه حل بشه کاربر رو به این سؤال می‌ندازه: «مگه اینجا اصلاً دکمه‌ای بود؟»" },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "When does :active fire?", fa: "‏:active چه زمانی فعال می‌شه؟" },
                options: [
                  { en: "Only during the press itself", fa: "فقط در همان لحظه‌ی فشردن" },
                  { en: "The whole time the pointer hovers", fa: "تمام مدتی که نشانگر روی عنصره" },
                  { en: "After the click finishes", fa: "بعد از تمام‌شدن کلیک" },
                  { en: "Only on double-click", fa: "فقط روی دابل‌کلیک" },
                ],
                answer: 0,
                explain: { en: ":active spans the pressed moment: hover first, active while holding, back to hover on release.", fa: "‏:active از لحظه‌ی فرو رفتن کلیک تا رهاکردنش فعاله — اول ‏hover، موقع فشردن ‏active و بعد از رهاکردن دوباره ‏hover." },
              },
              {
                q: { en: "What actually blocks clicks on a disabled button?", fa: "چه چیزی واقعاً جلوی کلیک روی دکمه‌ی غیرفعال رو می‌گیره؟" },
                options: [
                  { en: "The disabled attribute", fa: "ویژگی ‏disabled" },
                  { en: "opacity: 0.5", fa: "‏opacity: 0.5" },
                  { en: "cursor: not-allowed", fa: "‏cursor: not-allowed" },
                  { en: "The gray background", fa: "پس‌زمینه‌ی خاکستری" },
                ],
                answer: 0,
                explain: { en: "Only the attribute makes the browser ignore the element's events. Styles just describe the state visually.", fa: "فقط ویژگی ‏disabled باعث می‌شه مرورگر رویدادهای عنصر رو نادیده بگیره؛ استایل‌ها فقط وضعیت رو بصری توصیف می‌کنن." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "State Machine", fa: "ماشین حالت" },
            brief: { en: "Two buttons on a paywall: give .pay inline: cursor: pointer; and give .locked the disabled attribute plus inline: opacity: 0.5; cursor: not-allowed;. Both keep background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px and texts \"Pay $9\" / \"Pay later\".", fa: "دو دکمه روی صفحه‌ی پرداخت داری: به ‏.pay استایل درون‌خطی ‏cursor: pointer; بده و به ‏.locked ویژگی ‏disabled رو اضافه کن به‌همراه استایل درون‌خطی ‏opacity: 0.5; cursor: not-allowed;. هر دو دکمه ‏background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px و متن‌های «Pay $9» و «Pay later» رو نگه دارن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Checkout</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px; display: flex; gap: 16px; align-items: center;">\n  <!-- TODO: .pay needs cursor: pointer -->\n  <!-- TODO: .locked needs the disabled attribute + opacity: 0.5 + cursor: not-allowed -->\n  <button class="pay" style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px;">Pay $9</button>\n  <button class="locked" style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px;">Pay later</button>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Checkout</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px; display: flex; gap: 16px; align-items: center;">\n  <button class="pay" style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; cursor: pointer;">Pay $9</button>\n  <button class="locked" disabled style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; opacity: 0.5; cursor: not-allowed;">Pay later</button>\n</body>\n</html>`,
            hints: [
              { en: "The disabled attribute goes on the tag itself: <button class=\"locked\" disabled>.", fa: "ویژگی ‏disabled مستقیم روی تگ می‌شینه: ‏<button class=\"locked\" disabled>." },
              { en: "The locked button also needs opacity: 0.5 and cursor: not-allowed in its inline style.", fa: "دکمه‌ی locked توی استایل درون‌خطی‌ش به ‏opacity: 0.5 و ‏cursor: not-allowed هم نیاز داره." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".pay", styleIncludes: "cursor: pointer" },
                { selector: ".pay", text: "Pay $9" },
                { selector: ".locked", attrName: "disabled", attrValue: "" },
                { selector: ".locked", styleIncludes: "opacity: 0.5" },
                { selector: ".locked", styleIncludes: "cursor: not-allowed" },
                { selector: ".locked", text: "Pay later" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "css-m19",
    title: { en: "Grand Finale", fa: "فینال بزرگ" },
    blurb: {
      en: "Build a complete landing page piece by piece, then assemble everything in a mega final project.",
      fa: "یک صفحه‌ی فرود کامل رو تکه‌تکه بساز، بعد همه رو توی مگا پروژه‌ی نهایی سر هم کن.",
    },
    lessons: [
      {
        id: "css-m19-l1",
        title: { en: "Capstone I: The Hero", fa: "پروژه نهایی ۱: بخش هیرو" },
        goal: { en: "Build a hero with a gradient background, oversized headline and a CTA button.", fa: "بخش هیرو با پس‌زمینه‌ی گرادیانی، تیتر درشت و دکمه اقدام بساز." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Every landing page opens with a **hero**: a full-width band holding an eyebrow (small label), a giant headline, one sentence of subtext and a call-to-action button. The layout formula is a flex column, centered, with generous padding — the background does the drama while the content stays narrow and readable.", fa: "هر صفحه‌ی فرود با **هیرو** شروع می‌شه: یک نوار تمام‌عرض که شامل یک لیبل کوچک، یک تیتر غول‌پیکر، یک جمله توضیح و یک دکمه‌ی اقدام هست. فرمول چیدمانش یک ستون فلکسِ وسط‌چین با پدینگ سخاوتمندانه‌ست — نمایش رو پس‌زمینه انجام می‌ده و محتوا باریک و خوانا می‌مونه." },
              { type: "code", lang: "css", runnable: false, code: `.hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 80px 24px;\n  background: linear-gradient(135deg, #0f172a, #312e81);\n}` },
              { type: "tip", en: "`linear-gradient(135deg, A, B)` flows diagonally from the top-left corner to the bottom-right one — that 135° angle is what gives so many landing pages their sunset feel.", fa: "‏`linear-gradient(135deg, A, B)` به‌صورت قطری از گوشه‌ی بالا-چپ به گوشه‌ی پایین-راست جریان داره — همین زاویه‌ی ‏۱۳۵ درجهه که به خیلی از صفحه‌های فرود حس غروب آفتاب می‌ده." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 80px 24px; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc; }\n    .eyebrow { margin: 0 0 12px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #a5b4fc; }\n    h1 { margin: 0 0 12px; font-size: 48px; }\n    p { margin: 0 0 24px; font-size: 18px; color: #cbd5e1; }\n    .primary { border: 0; padding: 12px 24px; border-radius: 12px; background-color: #6d28d9; color: #ffffff; cursor: pointer; }\n    .ghost { border: 1px solid #64748b; padding: 12px 24px; border-radius: 12px; background-color: transparent; color: #e2e8f0; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <section class="hero">\n    <div class="eyebrow">Now in beta</div>\n    <h1>Ship faster</h1>\n    <p>TEKA turns ideas into products.</p>\n    <div style="display: flex; gap: 12px;">\n      <button class="primary">Get started</button>\n      <button class="ghost">Watch demo</button>\n    </div>\n  </section>\n</body>\n</html>` },
              { type: "text", en: "The type scale makes the hero: eyebrow at 12–13px with letter-spacing, headline at 40–64px bold, subtext at 16–18px muted. The buttons follow the primary/secondary rule — one filled, one ghost. Never let two primary buttons shout at once.", fa: "مقیاس تایپ، هیرو رو می‌سازه: لیبل ‏۱۲ یا ‏۱۳ پیکسلی با فاصله‌ی حروف زیاد، تیتر ضخیم ‏۴۰ تا ‏۶۴ پیکسلی، متن توضیح ‏۱۶ تا ‏۱۸ پیکسلی و کم‌رنگ. دکمه‌ها هم قاعده‌ی اصلی/فرعی دارن — یکی توپُر و یکی شیشه‌ای. هیچ‌وقت دو دکمه‌ی اصلی با هم داد نزنن." },
              { type: "warn", en: "Contrast on gradients is a trap: text sitting on the light end needs the dark color, and vice versa. Test both corners of the gradient.", fa: "تضاد روی گرادیان یه تله‌ست: متنی که روی بخش روشن گرادیان می‌شینه باید تیره باشه و برعکس. هر دو گوشه‌ی گرادیان رو تست کن." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What's the classic content order inside a hero?", fa: "ترتیب کلاسیک محتوا داخل هیرو چیه؟" },
                options: [
                  { en: "Eyebrow → headline → subtext → CTA", fa: "لیبل کوچک → تیتر → متن توضیح → دکمه اقدام" },
                  { en: "CTA → headline → subtext", fa: "دکمه → تیتر → متن توضیح" },
                  { en: "Headline → footer → CTA", fa: "تیتر → فوتر → دکمه" },
                  { en: "Image → eyebrow → footer", fa: "عکس → لیبل → فوتر" },
                ],
                answer: 0,
                explain: { en: "The small label sets context, the big headline sells, one sentence explains, and the button closes the deal.", fa: "لیبل کوچک زمینه رو می‌سازه، تیتر بزرگ می‌فروشه، یک جمله توضیح می‌ده و دکمه معامله رو می‌بنده." },
              },
              {
                q: { en: "Why 135deg in a hero gradient?", fa: "چرا در گرادیان هیرو از ‏135deg استفاده می‌کنیم؟" },
                options: [
                  { en: "It draws the diagonal from top-left to bottom-right", fa: "چون خط قطری از بالا-چپ به پایین-راست می‌کشه" },
                  { en: "It rotates the whole page", fa: "چون کل صفحه رو می‌چرخونه" },
                  { en: "It makes the gradient render faster", fa: "چون گرادیان رو سریع‌تر رندر می‌کنه" },
                  { en: "It's the only valid angle", fa: "چون تنها زاویه‌ی مجازه" },
                ],
                answer: 0,
                explain: { en: "135° runs the gradient from the top-left corner to the bottom-right corner — the default diagonal of web design.", fa: "زاویه ‏۱۳۵ درجه گرادیان رو از گوشه‌ی بالا-چپ به گوشه‌ی پایین-راست می‌بره — همون قطری پیش‌فرض دنیای وب." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Build the Hero", fa: "هیرو رو بساز" },
            brief: { en: "Give .hero inline: display: flex; flex-direction: column; align-items: center; text-align: center; padding: 80px 24px; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc. Keep the h1 \"Ship faster\", the p \"TEKA turns ideas into products.\" and the button \"Get started\".", fa: "به ‏.hero استایل درون‌خطی ‏display: flex; flex-direction: column; align-items: center; text-align: center; padding: 80px 24px; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc بده. تیتر «Ship faster» و پاراگراف «TEKA turns ideas into products.» و دکمه‌ی «Get started» سر جاشون بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Hero</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif;">\n  <!-- TODO: display: flex + flex-direction: column + align-items: center + text-align: center + padding: 80px 24px + linear-gradient + color -->\n  <section class="hero">\n    <h1 style="margin: 0 0 8px; font-size: 48px;">Ship faster</h1>\n    <p style="margin: 0 0 24px; font-size: 18px; color: #cbd5e1;">TEKA turns ideas into products.</p>\n    <button style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; cursor: pointer;">Get started</button>\n  </section>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Hero</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif;">\n  <section class="hero" style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 80px 24px; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc;">\n    <h1 style="margin: 0 0 8px; font-size: 48px;">Ship faster</h1>\n    <p style="margin: 0 0 24px; font-size: 18px; color: #cbd5e1;">TEKA turns ideas into products.</p>\n    <button style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 12px 24px; border-radius: 12px; cursor: pointer;">Get started</button>\n  </section>\n</body>\n</html>`,
            hints: [
              { en: "Six declarations on .hero — the gradient is `linear-gradient(135deg, #0f172a, #312e81)`.", fa: "شش تعریف روی ‏.hero — گرادیان هم می‌شه ‏`linear-gradient(135deg, #0f172a, #312e81)`." },
              { en: "All of them go in the section's inline style, in any order.", fa: "همه‌شون توی استایل درون‌خطی section می‌شینن، با هر ترتیبی." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".hero", styleIncludes: "display: flex" },
                { selector: ".hero", styleIncludes: "flex-direction: column" },
                { selector: ".hero", styleIncludes: "align-items: center" },
                { selector: ".hero", styleIncludes: "text-align: center" },
                { selector: ".hero", styleIncludes: "padding: 80px 24px" },
                { selector: ".hero", styleIncludes: "background: linear-gradient(135deg, #0f172a, #312e81)" },
                { selector: ".hero", styleIncludes: "color: #f8fafc" },
                { selector: "h1", text: "Ship faster" },
                { selector: ".hero button", text: "Get started" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m19-l2",
        title: { en: "Capstone II: Feature Cards", fa: "پروژه نهایی ۲: کارت‌های ویژگی" },
        goal: { en: "Lay out an equal feature row with flexbox, gap and card styling.", fa: "ردیف ویژگی‌ها رو با فلکس‌باکس و ‏gap و استایل کارت، مساوی و مرتب بچین." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The **feature row** is the hero's sidekick: three (or four) cards, each with an icon, a title and two lines of promise. The layout is one line of flex: `display: flex; gap: 20px;` on the row, `flex: 1` on each card so they share the width equally — add or remove a card and the row rebalances itself.", fa: "**ردیف ویژگی‌ها** دستیار هیرو هست: سه یا چهار کارت که هر کدوم یه آیکون، یه عنوان و دو خط قول دارن. چیدمانش فقط یه خط فلکسه: روی ردیف ‏`display: flex; gap: 20px;` و روی هر کارت ‏`flex: 1` تا عرض رو مساوی تقسیم کنن — کارت اضافه یا کم کنی، ردیف خودش رو متعادل می‌کنه." },
              { type: "code", lang: "css", runnable: false, code: `.features {\n  display: flex;\n  gap: 20px;\n}\n.card {\n  flex: 1;\n  padding: 24px;\n  border-radius: 16px;\n  background-color: #f8fafc;\n}` },
              { type: "tip", en: "`gap` ended the margin-hack era: no more `.card + .card { margin-left: 20px }` arithmetic. Gap is space between items only — the outer edges stay clean.", fa: "‏`gap` دوران ترفندهای margin رو تموم کرد: دیگه لازم نیست حساب کنی کدوم کارت بعد از کدومه. ‏gap فقط فاصله‌ی بین آیتم‌هاست — لبه‌های بیرونی تمیز می‌مونن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; padding: 40px; }\n    .features { display: flex; gap: 20px; }\n    .card { flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1); }\n    .icon { font-size: 30px; }\n    h3 { margin: 8px 0 6px; font-size: 17px; }\n    p { margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; }\n  </style>\n</head>\n<body>\n  <div class="features">\n    <div class="card"><div class="icon">⚡</div><h3>Fast</h3><p>From idea to preview in minutes, not meetings.</p></div>\n    <div class="card"><div class="icon">🛡️</div><h3>Safe</h3><p>Guardrails catch mistakes before they ship.</p></div>\n    <div class="card"><div class="icon">🎉</div><h3>Fun</h3><p>Flow, not friction — building feels like play.</p></div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "Card anatomy that always works: an emoji or icon at 28–32px, a bold 16–18px title, 14px muted body, then radius of 12–16px and a whisper of shadow. Identical padding in every card — that rhythm is what makes a row look designed instead of thrown together.", fa: "آناتومی کارتی که همیشه جواب می‌ده: آیکون یا ایموجی در اندازه ‏۲۸ تا ‏۳۲ پیکسل، عنوان ضخیم ‏۱۶ تا ‏۱۸ پیکسلی، متن ‏۱۴ پیکسلی کم‌رنگ و بعد گوشه‌های گرد ‏۱۲ تا ‏۱۶ پیکسلی با یه سایه‌ی خیلی ملایم. پدینگ همه‌ی کارت‌ها یکی باشه — همین ریتمه که ردیف رو «طراحی‌شده» نشون می‌ده، نه «سر هم‌شده»." },
              { type: "warn", en: "`flex: 1` means grow equally from zero — but one long word inside a card can still force it wider. When titles differ wildly in length, `flex: 1 1 0` (basis zero) keeps the cards truly equal.", fa: "‏`flex: 1` یعنی از صفر به‌طور مساوی بزرگ شو — ولی یه کلمه‌ی طولانی توی یه کارت می‌تونه اون کارت رو پهن‌تر کنه. وقتی طول عنوان‌ها خیلی فرق می‌کنه، ‏`flex: 1 1 0` (با پایه‌ی صفر) تساوی واقعی رو نگه می‌داره." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does `flex: 1` on each card achieve?", fa: "‏`flex: 1` روی هر کارت چه کاری می‌کنه؟" },
                options: [
                  { en: "Cards grow equally to fill the row", fa: "کارت‌ها به‌طور مساوی بزرگ می‌شن و ردیف رو پر می‌کنن" },
                  { en: "Cards stack vertically", fa: "کارت‌ها زیر هم می‌شینن" },
                  { en: "Cards shrink to their content width", fa: "کارت‌ها به اندازه‌ی محتواشون جمع می‌شن" },
                  { en: "Cards get equal text size", fa: "اندازه‌ی متن کارت‌ها مساوی می‌شه" },
                ],
                answer: 0,
                explain: { en: "flex: 1 = grow 1, shrink 1, basis 0% — every card claims an equal slice of the free space.", fa: "‏flex: 1 یعنی رشد ۱، جمع‌شدن ۱ و پایه صفر — هر کارت سهم مساوی از فضای خالی رو برمی‌داره." },
              },
              {
                q: { en: "Why is `gap: 20px` better than margins between cards?", fa: "چرا ‏`gap: 20px` از margin بین کارت‌ها بهتره؟" },
                options: [
                  { en: "It only adds space between items, never at the edges", fa: "چون فقط بین آیتم‌ها فاصله می‌ذاره و لبه‌ها رو درگیر نمی‌کنه" },
                  { en: "It's the only way to make cards colorful", fa: "چون تنها راه رنگی‌کردن کارت‌هاست" },
                  { en: "It removes the border-radius", fa: "چون ‏border-radius رو حذف می‌کنه" },
                  { en: "Margins are deprecated in CSS", fa: "چون margin در ‏CSS منسوخ شده" },
                ],
                answer: 0,
                explain: { en: "Margin hacks misfire on wrapping and edges; gap is declared once and applies between children only.", fa: "ترفندهای margin موقع شکستن خط و روی لبه‌ها درست کار نمی‌کنن؛ ‏gap یه بار اعلام می‌شه و فقط بین فرزندها اعمال می‌شه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Feature Row", fa: "ردیف ویژگی‌ها" },
            brief: { en: "The .features row already has display: flex — add inline gap: 24px to it. Give each of the three .card children inline: flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc. Keep the titles \"Fast\" / \"Safe\" / \"Fun\".", fa: "ردیف ‏.features از قبل ‏display: flex داره — فقط بهش ‏gap: 24px اضافه کن. به هر سه فرزند ‏.card استایل درون‌خطی ‏flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc بده. عنوان‌های «Fast» و «Safe» و «Fun» سر جاشون بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Features</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px;">\n  <h2 style="margin: 0 0 20px;">Why TEKA</h2>\n  <div class="features" style="display: flex;">\n    <!-- TODO: gap: 24px on the row; on each card: flex: 1 + padding: 24px + border-radius: 16px + background-color: #f8fafc -->\n    <div class="card"><h3 style="margin: 0 0 6px;">Fast</h3><p style="margin: 0; color: #64748b;">Ship in minutes.</p></div>\n    <div class="card"><h3 style="margin: 0 0 6px;">Safe</h3><p style="margin: 0; color: #64748b;">Guardrails on.</p></div>\n    <div class="card"><h3 style="margin: 0 0 6px;">Fun</h3><p style="margin: 0; color: #64748b;">Flow, not friction.</p></div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Features</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px;">\n  <h2 style="margin: 0 0 20px;">Why TEKA</h2>\n  <div class="features" style="display: flex; gap: 24px;">\n    <div class="card" style="flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Fast</h3><p style="margin: 0; color: #64748b;">Ship in minutes.</p></div>\n    <div class="card" style="flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Safe</h3><p style="margin: 0; color: #64748b;">Guardrails on.</p></div>\n    <div class="card" style="flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Fun</h3><p style="margin: 0; color: #64748b;">Flow, not friction.</p></div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "One declaration on the row (gap: 24px), four on every card.", fa: "یه تعریف روی ردیف (‏gap: 24px) و چهار تعریف روی هر کارت." },
              { en: "All three cards get exactly the same four declarations.", fa: "هر سه کارت دقیقاً همین چهار تعریف یکسان رو می‌گیرن." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".features", styleIncludes: "display: flex" },
                { selector: ".features", styleIncludes: "gap: 24px" },
                { selector: ".card", count: 3 },
                { selector: ".card", styleIncludes: "flex: 1" },
                { selector: ".card", styleIncludes: "padding: 24px" },
                { selector: ".card", styleIncludes: "background-color: #f8fafc" },
                { selector: ".card", text: "Fast" },
                { selector: ".card", text: "Safe" },
                { selector: ".card", text: "Fun" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m19-l3",
        title: { en: "Capstone III: Pricing & CTA", fa: "پروژه نهایی ۳: تعرفه و دعوت به اقدام" },
        goal: { en: "Highlight one plan, then close with a full-width call-to-action band.", fa: "یه تعرفه رو برجسته کن و بعد با یه نوار تمام‌عرض دعوت به اقدام ببند." },
        minutes: 15,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "A **pricing row** uses the same flex row as features, with one twist: one card is **featured**. Tools of emphasis: scale it up slightly (`transform: scale(1.05)`), tint its border, add a badge. One loud card makes the others look reasonable — that's the whole trick.", fa: "ردیف **تعرفه‌ها** همون ردیف فلکس ویژگی‌هاست با یه تفاوت: یکی از کارت‌ها **برجسته** هست. ابزارهای برجسته‌سازی: کمی بزرگش کن (‏`transform: scale(1.05)`)، خط دورش رو رنگی کن و بهش یه نشان بده. یک کارت پر سر و صدا، بقیه رو معقول نشون می‌ده — کل ترفند همینه." },
              { type: "code", lang: "css", runnable: false, code: `.plans { display: flex; gap: 20px; align-items: stretch; }\n.plan.featured {\n  transform: scale(1.05);\n  border: 2px solid #6d28d9;\n}` },
              { type: "tip", en: "The closing **CTA band** is one flex row: the message on one side, the button on the other. `justify-content: space-between` plus `align-items: center` is the entire recipe.", fa: "نوار پایانی **دعوت به اقدام (CTA)** یه ردیف فلکسه: پیام یه طرف و دکمه طرف دیگه. کل دستور پختش ‏`justify-content: space-between` به‌همراه ‏`align-items: center` هست." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; padding: 40px; }\n    .plans { display: flex; gap: 20px; align-items: stretch; margin-bottom: 32px; }\n    .plan { flex: 1; padding: 20px; border-radius: 16px; background-color: #f8fafc; }\n    .plan.featured { transform: scale(1.05); border: 2px solid #6d28d9; background-color: #ffffff; }\n    .badge { font-size: 11px; color: #6d28d9; font-weight: 700; letter-spacing: 1px; }\n    h3 { margin: 4px 0 6px; }\n    .cta-band { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px; }\n    .cta-band button { border: 0; padding: 10px 18px; border-radius: 10px; background-color: #6d28d9; color: #ffffff; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class="plans">\n    <div class="plan"><h3>Basic</h3><p>$0 / month</p></div>\n    <div class="plan featured"><div class="badge">MOST POPULAR</div><h3>Pro</h3><p>$9 / month</p></div>\n    <div class="plan"><h3>Team</h3><p>$29 / month</p></div>\n  </div>\n  <div class="cta-band"><strong>Ready to ship?</strong><button>Start free</button></div>\n</body>\n</html>` },
              { type: "text", en: "Notice the hierarchy: three plans, one featured, one dark CTA band. Three levels of visual weight — that's a landing page breathing. If everything is emphasized, nothing is; spend your loud colors like money.", fa: "به سلسله‌مراتب دقت کن: سه تعرفه، یکی برجسته و یه نوار تیره‌ی CTA. سه سطح وزن بصری — این یعنی صفحه‌ی فرودی که نفس می‌کشه. اگر همه‌چیز برجسته باشه، هیچ‌چیز برجسته نیست؛ رنگ‌های بلندت رو مثل پول خرج کن." },
              { type: "warn", en: "A featured card that scales up can clip in tight rows — give the row some padding so the scaled card has room, or its shadow and border get shaved off.", fa: "کارت برجسته‌ای که بزرگ می‌شه، ممکنه توی ردیف‌های تنگ بریده بشه — به ردیف یه کم پدینگ بده تا کارت بزرگ‌شده جا داشته باشه، وگرنه سایه و خط دورش قیچی می‌شه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which combination puts items on opposite ends of a row and centers them vertically?", fa: "کدوم ترکیب آیتم‌ها رو دو سر ردیف می‌ذاره و از نظر عمودی وسط می‌چینه؟" },
                options: [
                  { en: "justify-content: space-between + align-items: center", fa: "‏justify-content: space-between به‌همراه ‏align-items: center" },
                  { en: "text-align: center alone", fa: "فقط ‏text-align: center" },
                  { en: "align-items: flex-end", fa: "‏align-items: flex-end" },
                  { en: "gap: auto", fa: "‏gap: auto" },
                ],
                answer: 0,
                explain: { en: "space-between pushes items to both ends along the main axis; align-items: center centers them on the cross axis.", fa: "‏space-between آیتم‌ها رو در محور اصلی به دو سر می‌فرسته و ‏align-items: center همون‌ها رو در محور عرضی وسط می‌چینه." },
              },
              {
                q: { en: "The classic emphasis tools for a featured plan are…", fa: "ابزارهای کلاسیک برجسته‌کردن یه تعرفه کدوما هستن؟" },
                options: [
                  { en: "Slight scale, colored border, badge", fa: "بزرگ‌نمایی خیلی کم، خط دور رنگی و یه نشان" },
                  { en: "Hiding the other plans", fa: "مخفی‌کردن بقیه‌ی تعرفه‌ها" },
                  { en: "Rotating the card 45 degrees", fa: "چرخوندن کارت ‏۴۵ درجه" },
                  { en: "Making its text the smallest", fa: "کوچک‌ترین متن برای همون کارت" },
                ],
                answer: 0,
                explain: { en: "Subtle scale + accent border + a small badge — emphasis without breaking the row's calm.", fa: "بزرگ‌نمایی خیلی کم + خط دور رنگی + یه نشان کوچک — برجستگی بدون این‌که آرامش ردیف به هم بریزه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Featured Plan + CTA Band", fa: "تعرفه برجسته و نوار CTA" },
            brief: { en: "Give .featured inline: transform: scale(1.05); border: 2px solid #6d28d9;. Give .cta-band inline: display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px. Keep the texts \"Pro\" and \"Ready to ship?\" plus the button \"Start free\".", fa: "به ‏.featured استایل درون‌خطی ‏transform: scale(1.05); border: 2px solid #6d28d9; بده. به ‏.cta-band استایل درون‌خطی ‏display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px بده. متن «Pro» و «Ready to ship?» و دکمه‌ی «Start free» سر جاشون بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Plans</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px;">\n  <div class="plans" style="display: flex; gap: 20px; margin-bottom: 32px;">\n    <div class="plan" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Basic</h3><p style="margin: 0; color: #64748b;">$0 / month</p></div>\n    <!-- TODO: .featured needs transform: scale(1.05) + border: 2px solid #6d28d9 -->\n    <div class="plan featured" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Pro</h3><p style="margin: 0; color: #64748b;">$9 / month</p></div>\n    <div class="plan" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Team</h3><p style="margin: 0; color: #64748b;">$29 / month</p></div>\n  </div>\n  <!-- TODO: .cta-band needs flex + space-between + align-items: center + padding + background + color + radius -->\n  <div class="cta-band" style="padding: 24px 32px;">\n    <strong>Ready to ship?</strong>\n    <button style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer;">Start free</button>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Plans</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; padding: 40px;">\n  <div class="plans" style="display: flex; gap: 20px; margin-bottom: 32px;">\n    <div class="plan" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Basic</h3><p style="margin: 0; color: #64748b;">$0 / month</p></div>\n    <div class="plan featured" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #f8fafc; transform: scale(1.05); border: 2px solid #6d28d9;"><h3 style="margin: 0 0 6px;">Pro</h3><p style="margin: 0; color: #64748b;">$9 / month</p></div>\n    <div class="plan" style="flex: 1; padding: 20px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Team</h3><p style="margin: 0; color: #64748b;">$29 / month</p></div>\n  </div>\n  <div class="cta-band" style="display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px;">\n    <strong>Ready to ship?</strong>\n    <button style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer;">Start free</button>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Two declarations on .featured, seven on .cta-band.", fa: "دو تعریف روی ‏.featured و هفت تعریف روی ‏.cta-band." },
              { en: "The band's skeleton is the same as the nav's: flex + space-between + align-items: center.", fa: "اسکلت نوار CTA همون اسکلت ناوباره: ‏flex به‌همراه ‏space-between و ‏align-items: center." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".featured", styleIncludes: "transform: scale(1.05)" },
                { selector: ".featured", styleIncludes: "border: 2px solid #6d28d9" },
                { selector: ".featured", text: "Pro" },
                { selector: ".cta-band", styleIncludes: "display: flex" },
                { selector: ".cta-band", styleIncludes: "justify-content: space-between" },
                { selector: ".cta-band", styleIncludes: "align-items: center" },
                { selector: ".cta-band", styleIncludes: "background-color: #0f172a" },
                { selector: ".cta-band button", text: "Start free" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m19-l4",
        title: { en: "Capstone IV: Navbar & Footer", fa: "پروژه نهایی ۴: ناوبار و فوتر" },
        goal: { en: "Build a sticky navigation bar with a translucent background.", fa: "یه نوار ناوبری چسبان با پس‌زمینه‌ی نیمه‌شفاف بساز." },
        minutes: 14,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The **navbar** is flex row number one of every site: logo on the left, links on the right. `position: sticky; top: 0;` pins it to the top of the viewport — it scrolls with the page but snaps into place when reached. Add a translucent background and a subtle bottom border, and the bar reads as glass floating over the content.", fa: "**ناوبار** اولین ردیف فلکس هر سایته: لوگو یه طرف و لینک‌ها طرف دیگه. ‏`position: sticky; top: 0;` اون رو به بالای viewport می‌چسبونه — همراه صفحه اسکرول می‌شه ولی وقتی به بالا می‌رسه سر جاش می‌ایسته. یه پس‌زمینه‌ی نیمه‌شفاف و یه خط دور ظریف هم اضافه کنی، نوار مثل یه شیشه‌ی شناور روی محتوا دیده می‌شه." },
              { type: "code", lang: "css", runnable: false, code: `.nav {\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 24px;\n  background-color: rgba(255, 255, 255, 0.8);\n  border-bottom: 1px solid #e2e8f0;\n}` },
              { type: "tip", en: "`rgba(255, 255, 255, 0.8)` is white at 80% opacity. The 0.8 lets content ghost through as you scroll — the cheap glass effect you met in the modern-effects module. Keep alpha between 0.7 and 0.9, or text becomes hard to read.", fa: "‏`rgba(255, 255, 255, 0.8)` یعنی سفید با شفافیت ‏۸۰٪. عدد ‏0.8 اجازه می‌ده محتوا موقع اسکرول از پشت نوار به‌طور محو رد بشه — همون افکت شیشه‌ای ارزونی که توی ماژول افکت‌های مدرن دیدی. آلفا رو بین ‏۰٫۷ و ‏۰٫۹ نگه دار وگرنه خوندن متن سخت می‌شه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; color: #0f172a; }\n    .nav { position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8); border-bottom: 1px solid #e2e8f0; }\n    main { padding: 40px 24px; min-height: 160vh; }\n    footer { display: flex; gap: 48px; padding: 32px 24px; background-color: #0f172a; color: #94a3b8; }\n    footer h4 { margin: 0 0 8px; color: #e2e8f0; font-size: 14px; }\n    footer a { display: block; color: #94a3b8; text-decoration: none; font-size: 14px; line-height: 2; }\n  </style>\n</head>\n<body>\n  <nav class="nav"><strong>TEKA</strong><span>Docs · Pricing · Blog</span></nav>\n  <main><h1>Scroll me</h1><p>The glass bar stays pinned to the top while everything else moves.</p></main>\n  <footer>\n    <div><h4>Product</h4><a href="#">Features</a><a href="#">Pricing</a></div>\n    <div><h4>Company</h4><a href="#">About</a><a href="#">Careers</a></div>\n    <div><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a></div>\n  </footer>\n</body>\n</html>` },
              { type: "text", en: "The **footer** mirrors the nav: a flex or grid of link columns (Product, Company, Legal) plus a bottom bar for copyright. Keep link fonts at 14px and let the copyright line sit alone in small muted text. Footers are where users look when the hero didn't answer everything.", fa: "**فوتر** تصویر آینه‌ای ناوباره: چند ستون لینک (محصول، شرکت، قوانین) به‌علاوه‌ی یه نوار پایانی برای کپی‌رایت. فونت لینک‌ها رو ‏۱۴ پیکسل نگه دار و بذار خط کپی‌رایت تنها و کوچک و کم‌رنگ بشینه. فوتر جاییه که کاربر وقتی هیرو به همه‌ی سؤال‌هاش جواب نداد بهش نگاه می‌کنه." },
              { type: "warn", en: "Sticky needs a clean parent: if an ancestor has `overflow: hidden`, sticky silently stops working. When your nav won't stick, hunt the overflow first.", fa: "‏sticky والد تمیز می‌خواد: اگر یکی از والدین بالادستی‌اش ‏`overflow: hidden` داشته باشه، ‏sticky بی‌سر و صدا از کار می‌افته. هر وقت ناوبارت نمی‌چسبید، اول دنبال overflow بگرد." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does `position: sticky; top: 0` do?", fa: "‏`position: sticky; top: 0` چه کاری می‌کنه؟" },
                options: [
                  { en: "Scrolls normally, then pins when it reaches the top", fa: "عادی اسکرول می‌شه و وقتی به بالا رسید می‌ایسته و می‌چسبه" },
                  { en: "Always stays fixed, even offscreen", fa: "همیشه ثابته، حتی وقتی بیرون از دیدنه" },
                  { en: "Makes the nav unscrollable", fa: "ناوبار رو غیرقابل اسکرول می‌کنه" },
                  { en: "Freezes the whole page", fa: "کل صفحه رو فریز می‌کنه" },
                ],
                answer: 0,
                explain: { en: "Sticky is relative until the element hits its top offset inside the scroll container — then it behaves like fixed.", fa: "‏sticky تا وقتی عنصر به آفست بالاش توی ظرف اسکرول نرسیده مثل relative رفتار می‌کنه — بعدش مثل fixed می‌چسبه." },
              },
              {
                q: { en: "What kills position: sticky silently?", fa: "چه چیزی ‏position: sticky رو بی‌سر و صدا از کار می‌ندازه؟" },
                options: [
                  { en: "An ancestor with overflow: hidden", fa: "یه والد بالادستی با ‏overflow: hidden" },
                  { en: "A nearby footer", fa: "بودن یه فوتر نزدیک" },
                  { en: "border-radius on the nav", fa: "‏border-radius روی ناوبار" },
                  { en: "Using flexbox inside the nav", fa: "استفاده از فلکس‌باکس داخل ناوبار" },
                ],
                answer: 0,
                explain: { en: "overflow: hidden on an ancestor creates a new scroll context, and sticky pins inside that instead of the viewport.", fa: "‏overflow: hidden روی والد بالادستی یه زمینه‌ی اسکرول جدید می‌سازه و ‏sticky به‌جای viewport داخل همون می‌چسبه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Glass Navbar", fa: "ناوبار شیشه‌ای" },
            brief: { en: "Give .nav inline: position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8); border-bottom: 1px solid #e2e8f0. Keep the brand \"TEKA\" and the three links Docs / Pricing / Blog.", fa: "به ‏.nav استایل درون‌خطی ‏position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8); border-bottom: 1px solid #e2e8f0 بده. برند «TEKA» و سه لینک Docs و Pricing و Blog سر جاشون بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Docs</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif;">\n  <!-- TODO: position: sticky + top: 0 + flex + space-between + align-items: center + padding + rgba background + border-bottom -->\n  <nav class="nav" style="padding: 14px 24px;">\n    <strong class="brand">TEKA</strong>\n    <span><a href="#">Docs</a> · <a href="#">Pricing</a> · <a href="#">Blog</a></span>\n  </nav>\n  <main style="padding: 40px 24px; min-height: 150vh;"><h1>Docs</h1></main>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Docs</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif;">\n  <nav class="nav" style="position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8); border-bottom: 1px solid #e2e8f0;">\n    <strong class="brand">TEKA</strong>\n    <span><a href="#">Docs</a> · <a href="#">Pricing</a> · <a href="#">Blog</a></span>\n  </nav>\n  <main style="padding: 40px 24px; min-height: 150vh;"><h1>Docs</h1></main>\n</body>\n</html>`,
            hints: [
              { en: "Seven declarations on .nav — start with position: sticky; top: 0.", fa: "هفت تعریف روی ‏.nav — از ‏position: sticky; top: 0 شروع کن." },
              { en: "The glass value is rgba(255, 255, 255, 0.8) — white at 80% opacity.", fa: "مقدار شیشه‌ای می‌شه ‏rgba(255, 255, 255, 0.8) — یعنی سفید با شفافیت ‏۸۰٪." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".nav", styleIncludes: "position: sticky" },
                { selector: ".nav", styleIncludes: "top: 0" },
                { selector: ".nav", styleIncludes: "display: flex" },
                { selector: ".nav", styleIncludes: "justify-content: space-between" },
                { selector: ".nav", styleIncludes: "align-items: center" },
                { selector: ".nav", styleIncludes: "background-color: rgba(255, 255, 255, 0.8)" },
                { selector: ".nav", styleIncludes: "border-bottom: 1px solid #e2e8f0" },
                { selector: ".brand", text: "TEKA" },
                { selector: ".nav a", count: 3 },
              ],
            },
          },
        ],
      },
      {
        id: "css-m19-l5",
        title: { en: "The Mega Final Project", fa: "مگا پروژه نهایی" },
        goal: { en: "Assemble nav + hero + features + CTA band + footer into one complete landing page.", fa: "ناوبار و هیرو و ویژگی‌ها و نوار CTA و فوتر رو در یک صفحه‌ی فرود کامل سر هم کن." },
        minutes: 18,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "This is it — the full **landing page** from scratch. You already own every part: a flex navbar, a gradient hero, a feature row with `flex: 1` cards, a CTA band with `space-between`, and a footer. Today you assemble them in order and let each piece hand its spacing to the next. One wrapper with `max-width: 960px; margin: 0 auto;` keeps everything aligned to a single column axis.", fa: "این لحظه‌شه — ساخت کامل **صفحه‌ی فرود** از صفر. همه‌ی قطعه‌ها رو بلدی: ناوبار فلکس، هیروی گرادیانی، ردیف ویژگی‌ها با کارت‌های ‏`flex: 1`، نوار CTA با ‏space-between و فوتر. امروز همه رو به‌ترتیب سر هم می‌کنی و طوری تنظیم می‌کنی که هر بخش فاصله‌هاش رو به بخش بعدی بسپاره. یه wrapper با ‏`max-width: 960px; margin: 0 auto;` همه‌چیز رو روی یه محور ستونی منظم نگه می‌داره." },
              { type: "code", lang: "css", runnable: false, code: `.page { max-width: 960px; margin: 0 auto; }\n.features { display: flex; gap: 24px; }\n.card { flex: 1; padding: 24px; border-radius: 16px; }\n.cta-band { display: flex; justify-content: space-between; align-items: center; }` },
              { type: "tip", en: "Order tells the story: nav → hero (who am I) → features (why care) → CTA (act now) → footer (fine print). Shuffle it and the story usually breaks — the sequence itself is the design.", fa: "ترتیب، قصه رو روایت می‌کنه: ناوبار → هیرو (من کی‌ام) → ویژگی‌ها (چرا مهمه) → نوار CTA (همین حالا اقدام کن) → فوتر (جزئیات ریز). اگه جابه‌جاش کنی معمولاً قصه می‌شکنه — همین توالی، خودِ طراحی هست." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    * { box-sizing: border-box; }\n    body { margin: 0; font-family: system-ui, sans-serif; color: #0f172a; }\n    .nav { display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8); border-bottom: 1px solid #e2e8f0; }\n    .hero { padding: 72px 24px; text-align: center; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc; }\n    .page { max-width: 960px; margin: 0 auto; padding: 32px 24px; }\n    .features { display: flex; gap: 24px; }\n    .card { flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc; }\n    .cta-band { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px; }\n    button { border: 0; background-color: #6d28d9; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <nav class="nav"><strong>TEKA</strong><span>Docs · Pricing · Blog</span></nav>\n  <header class="hero"><h1>Build with TEKA</h1><p>From idea to product, one tab away.</p></header>\n  <div class="page">\n    <div class="features">\n      <div class="card"><h3>⚡ Fast</h3><p>Ship in minutes.</p></div>\n      <div class="card"><h3>🛡️ Safe</h3><p>Guardrails on.</p></div>\n      <div class="card"><h3>🎉 Fun</h3><p>Flow, not friction.</p></div>\n    </div>\n    <div class="cta-band"><strong>Ready to launch?</strong><button>Start free</button></div>\n  </div>\n  <footer style="padding: 20px 24px; color: #64748b; font-size: 13px;">© 2025 TEKA</footer>\n</body>\n</html>` },
              { type: "text", en: "Five zones, one page, and every skill from the whole course: flexbox, gradients, cards, states, spacing rhythm. The starter gives you the skeleton and all the texts — your job is to breathe the styles into each zone, top to bottom.", fa: "پنج ناحیه، یک صفحه و همه‌ی مهارت‌های کل دوره: فلکس‌باکس، گرادیان، کارت، حالت‌ها و ریتم فاصله‌ها. استارتر اسکلت و همه‌ی متن‌ها رو بهت داده — کار تو اینه که از بالا به پایین، به هر ناحیه استایل بدهی و زنده‌ش کنی." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What's the standard landing-page section order?", fa: "ترتیب استاندارد بخش‌های یه صفحه‌ی فرود چیه؟" },
                options: [
                  { en: "Nav → hero → features → CTA → footer", fa: "ناوبار → هیرو → ویژگی‌ها → CTA → فوتر" },
                  { en: "Footer → hero → nav → CTA", fa: "فوتر → هیرو → ناوبار → CTA" },
                  { en: "Hero → footer → features → nav", fa: "هیرو → فوتر → ویژگی‌ها → ناوبار" },
                  { en: "CTA → nav → hero → footer", fa: "CTA → ناوبار → هیرو → فوتر" },
                ],
                answer: 0,
                explain: { en: "Context first (nav), then promise (hero), proof (features), action (CTA) and fine print (footer).", fa: "اول زمینه (ناوبار)، بعد وعده (هیرو)، بعد دلیل (ویژگی‌ها)، بعد اقدام (CTA) و آخرش جزئیات (فوتر)." },
              },
              {
                q: { en: "What does `max-width: 960px; margin: 0 auto` do to a wrapper?", fa: "‏`max-width: 960px; margin: 0 auto` با یه wrapper چه کاری می‌کنه؟" },
                options: [
                  { en: "Caps its width and centers it horizontally", fa: "عرضش رو محدود و افقی وسطش می‌چینه" },
                  { en: "Makes it full-screen", fa: "تمام‌صفحه‌ش می‌کنه" },
                  { en: "Centers only the text inside it", fa: "فقط متن داخلش رو وسط‌چین می‌کنه" },
                  { en: "Stacks it above other content", fa: "اون رو بالای بقیه‌ی محتوا می‌ذاره" },
                ],
                answer: 0,
                explain: { en: "max-width stops the growth; auto left/right margins split the leftover space equally — the classic centered column.", fa: "‏max-width جلوی بزرگ‌ترشدن رو می‌گیره و margin خودکار چپ و راست، فضای اضافی رو مساوی تقسیم می‌کنه — همون ستون وسط‌چین کلاسیک." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Whole Page", fa: "کل صفحه" },
            brief: { en: "Five zones, one page. Give .nav inline: display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8). Give .hero inline: padding: 72px 24px; text-align: center; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc. Give .features inline: display: flex; gap: 24px. Give each .card inline: flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc. Give .cta-band inline: display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px. Keep every text: brand TEKA, h1 \"Build with TEKA\", cards \"Fast\" / \"Safe\" / \"Fun\", band text \"Ready to launch?\" with button \"Start free\", footer \"© 2025 TEKA\".", fa: "پنج ناحیه، یک صفحه. به ‏.nav استایل درون‌خطی ‏display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8) بده. به ‏.hero استایل درون‌خطی ‏padding: 72px 24px; text-align: center; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc بده. به ‏.features استایل درون‌خطی ‏display: flex; gap: 24px بده. به هر ‏.card استایل درون‌خطی ‏flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc بده. به ‏.cta-band استایل درون‌خطی ‏display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px بده. همه‌ی متن‌ها بمونن: برند TEKA و تیتر «Build with TEKA» و کارت‌های «Fast» و «Safe» و «Fun» و متن نوار یعنی «Ready to launch?» با دکمه‌ی «Start free» و فوتر «© 2025 TEKA»." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>TEKA Landing</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; color: #0f172a;">\n  <!-- TODO 1: nav = flex + space-between + align-items: center + padding + rgba(255, 255, 255, 0.8) -->\n  <nav class="nav" style="padding: 14px 24px;">\n    <strong class="brand">TEKA</strong>\n    <span>Docs · Pricing · Blog</span>\n  </nav>\n  <!-- TODO 2: hero = padding: 72px 24px + text-align: center + linear-gradient(135deg, #0f172a, #312e81) + color: #f8fafc -->\n  <header class="hero" style="padding: 72px 24px;">\n    <h1 style="margin: 0 0 8px; font-size: 40px;">Build with TEKA</h1>\n    <p style="margin: 0; color: #cbd5e1;">From idea to product, one tab away.</p>\n  </header>\n  <!-- TODO 3: features = display: flex + gap: 24px; each card = flex: 1 + padding: 24px + border-radius: 16px + background-color: #f8fafc -->\n  <div class="features" style="padding: 32px 24px;">\n    <div class="card"><h3 style="margin: 0 0 6px;">Fast</h3><p style="margin: 0; color: #64748b;">Ship in minutes.</p></div>\n    <div class="card"><h3 style="margin: 0 0 6px;">Safe</h3><p style="margin: 0; color: #64748b;">Guardrails on.</p></div>\n    <div class="card"><h3 style="margin: 0 0 6px;">Fun</h3><p style="margin: 0; color: #64748b;">Flow, not friction.</p></div>\n  </div>\n  <!-- TODO 4: cta-band = flex + space-between + align-items: center + padding: 24px 32px + background-color: #0f172a + color: #ffffff + border-radius: 16px -->\n  <div class="cta-band" style="margin: 0 24px 32px; padding: 24px 32px;">\n    <strong>Ready to launch?</strong>\n    <button style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer;">Start free</button>\n  </div>\n  <footer style="padding: 20px 24px; color: #64748b; font-size: 13px;">© 2025 TEKA</footer>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>TEKA Landing</title>\n</head>\n<body style="margin: 0; font-family: system-ui, sans-serif; color: #0f172a;">\n  <nav class="nav" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background-color: rgba(255, 255, 255, 0.8);">\n    <strong class="brand">TEKA</strong>\n    <span>Docs · Pricing · Blog</span>\n  </nav>\n  <header class="hero" style="padding: 72px 24px; text-align: center; background: linear-gradient(135deg, #0f172a, #312e81); color: #f8fafc;">\n    <h1 style="margin: 0 0 8px; font-size: 40px;">Build with TEKA</h1>\n    <p style="margin: 0; color: #cbd5e1;">From idea to product, one tab away.</p>\n  </header>\n  <div class="features" style="display: flex; gap: 24px; padding: 32px 24px;">\n    <div class="card" style="flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Fast</h3><p style="margin: 0; color: #64748b;">Ship in minutes.</p></div>\n    <div class="card" style="flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Safe</h3><p style="margin: 0; color: #64748b;">Guardrails on.</p></div>\n    <div class="card" style="flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc;"><h3 style="margin: 0 0 6px;">Fun</h3><p style="margin: 0; color: #64748b;">Flow, not friction.</p></div>\n  </div>\n  <div class="cta-band" style="display: flex; justify-content: space-between; align-items: center; margin: 0 24px 32px; padding: 24px 32px; background-color: #0f172a; color: #ffffff; border-radius: 16px;">\n    <strong>Ready to launch?</strong>\n    <button style="border: 0; background-color: #6d28d9; color: #ffffff; padding: 10px 18px; border-radius: 10px; cursor: pointer;">Start free</button>\n  </div>\n  <footer style="padding: 20px 24px; color: #64748b; font-size: 13px;">© 2025 TEKA</footer>\n</body>\n</html>`,
            hints: [
              { en: "Work top to bottom: nav → hero → features → CTA band → footer. One zone at a time.", fa: "از بالا به پایین پیش برو: ناوبار → هیرو → ویژگی‌ها → نوار CTA → فوتر. هر بار یه ناحیه." },
              { en: "The nav and the CTA band share the same skeleton: display: flex + justify-content: space-between + align-items: center.", fa: "ناوبار و نوار CTA یه اسکلت مشترک دارن: ‏display: flex به‌همراه ‏justify-content: space-between و ‏align-items: center." },
              { en: "Every card needs the same four declarations: flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc.", fa: "هر کارت به همین چهار تعریف نیاز داره: ‏flex: 1; padding: 24px; border-radius: 16px; background-color: #f8fafc." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".nav", styleIncludes: "display: flex" },
                { selector: ".nav", styleIncludes: "justify-content: space-between" },
                { selector: ".brand", text: "TEKA" },
                { selector: ".hero", styleIncludes: "text-align: center" },
                { selector: ".hero", styleIncludes: "background: linear-gradient(135deg, #0f172a, #312e81)" },
                { selector: ".hero", styleIncludes: "color: #f8fafc" },
                { selector: ".hero h1", text: "Build with TEKA" },
                { selector: ".features", styleIncludes: "display: flex" },
                { selector: ".features", styleIncludes: "gap: 24px" },
                { selector: ".card", count: 3 },
                { selector: ".card", styleIncludes: "flex: 1" },
                { selector: ".cta-band", styleIncludes: "justify-content: space-between" },
                { selector: ".cta-band", styleIncludes: "background-color: #0f172a" },
                { selector: ".cta-band button", text: "Start free" },
                { selector: "footer", text: "© 2025 TEKA" },
              ],
            },
          },
        ],
      },
    ],
  },
];
