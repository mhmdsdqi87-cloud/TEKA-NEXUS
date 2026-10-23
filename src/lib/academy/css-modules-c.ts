// TEKA NEXUS — CSS course, part C (module m20, 4 lessons).
// Authored in Task 17-b4. "Effects & Glass Lab" — a compact practical extension
// after the components/effects modules (m9, m12, m15, m18).
// Graded via inline-style HtmlCheck.styleIncludes + DOM structure
// (<style> tag contents are not gradeable in the iframe runner).

import type { Module } from "./types";

export const cssModulesC: Module[] = [
  {
    id: "css-m20",
    title: { en: "Effects & Glass Lab", fa: "کارگاه جلوه‌ها و شیشه" },
    blurb: {
      en: "A compact hands-on lab: tilt and scale cards, layer shadows with colored glows, build rounded glass cards — then fuse everything into one glass profile card.",
      fa: "یه کارگاه کوچیک و عملی: کارت‌ها رو کج کن و بزرگ‌شون کن، سایه‌های لایه‌ای با هاله‌ی رنگی بساز و کارت‌های شیشه‌ای گرد بساز — آخرش هم همه رو توی یه کارت پروفایل شیشه‌ای جمع کن.",
    },
    lessons: [
      {
        id: "css-m20-l1",
        title: { en: "Transform Play: Scale & Rotate", fa: "بازی با ترنسفورم: مقیاس و چرخش" },
        goal: { en: "Combine scale and rotate in one transform and make it feel smooth with transition.", fa: "‏scale و rotate رو در یک transform ترکیب کن و با transition نرمش کن." },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "You met **transform** in module 9; here's the next level: **combining**. Stack functions in one declaration and they run together: `transform: scale(1.05) rotate(-2deg);` means grow 5% AND tilt 2 degrees, at once. The layout never moves — it's all visual.", fa: "‏transform رو تو ماژول ۹ دیدی؛ اینجا پله‌ی بعدیشه: **ترکیب**. چند تابع رو کنار هم بذار تا همزمان اجرا بشن: ‏`transform: scale(1.05) rotate(-2deg);` یعنی هم ۵٪ بزرگ شو هم ۲ درجه بچرخ. چیدمان ذره‌ای به‌هم نمی‌ریزه — همه‌چیز فقط بصریه." },
              { type: "code", lang: "css", runnable: false, code: `.card {\n  transition: transform 0.25s ease-out;  /* on the BASE state */\n}\n.card:hover {\n  transform: scale(1.05) rotate(-2deg);  /* both, one declaration */\n}`, caption: { en: "The hover formula: transition on the base, transform combo on hover.", fa: "فرمول هاور: ‏transition روی حالت پایه و ترکیب transform روی هاور." } },
              { type: "tip", en: "Keep combos subtle: scale between 1.02 and 1.08, rotate under 5 degrees. Playful, not dizzy.", fa: "ترکیب‌ها رو ملایم نگه دار: ‏scale بین ۱٫۰۲ تا ۱٫۰۸ و چرخش زیر ۵ درجه. بازیگوش، نه گیج‌کننده." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { font-family: sans-serif; }\n    .row { display: flex; gap: 28px; justify-content: center; margin-top: 50px; }\n    .card {\n      padding: 26px 30px; border-radius: 14px;\n      background-color: #ede9fe; border: 1px solid #c4b5fd;\n      transition: transform 0.25s ease-out;\n    }\n    .card.pop:hover { transform: scale(1.08) rotate(-3deg); }\n    .card.tilt { transform: scale(1.05) rotate(-2deg); }\n  </style>\n</head>\n<body>\n  <div class="row">\n    <div class="card pop">Hover me ✦</div>\n    <div class="card tilt">Always tilted</div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The static tilt card is the trick behind \"sticker\" UI: the resting state already carries a transform, and hover just adds more on top. Functions apply right-to-left — rotate first, then scale — but visually you read them together.", fa: "کارت کج ثابت راز استیکرهای رابط کاربریه: حالت عادی خودش transform داره و هاور فقط بهش اضافه می‌کنه. تابع‌ها از راست به چپ اعمال می‌شن — اول چرخش، بعد مقیاس — ولی چشم هر دوتا رو با هم می‌بینه." },
              { type: "warn", en: "One transform per declaration: writing `transform: scale(1.05); transform: rotate(-2deg);` makes the second silently delete the first. Combine in ONE line.", fa: "تو هر تعریف فقط یک transform: اگه بنویسی ‏`transform: scale(1.05); transform: rotate(-2deg);` دومی اولی رو بی‌سروصدا پاک می‌کنه. تو یک خط ترکیب‌شون کن." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How do you apply scale AND rotate together?", fa: "‏scale و rotate رو چطور با هم اعمال کنیم؟" },
                options: [
                  { en: "Two separate transform declarations", fa: "دو تا تعریف transform جدا" },
                  { en: "One transform declaration with both functions: scale(1.05) rotate(-2deg)", fa: "یک تعریف transform با هر دو تابع: ‏scale(1.05) rotate(-2deg)" },
                  { en: "transform: combo(scale, rotate)", fa: "‏transform: combo(scale, rotate)" },
                  { en: "It's impossible without JavaScript", fa: "بدون جاوااسکریپت غیرممکنه" },
                ],
                answer: 1,
                explain: { en: "Multiple transform functions chain inside ONE declaration; separate declarations override each other.", fa: "چند تا تابع transform داخل یک تعریف زنجیر می‌شن؛ تعریف‌های جدا همدیگه رو override می‌کنن." },
              },
              {
                q: { en: "Where does transition live so hover feels smooth?", fa: "‏transition کجا زندگی کنه تا هاور نرم حس بشه؟" },
                options: [
                  { en: "On :hover only", fa: "فقط روی :hover" },
                  { en: "On the element's base state", fa: "روی حالت پایه‌ی عنصر" },
                  { en: "On the body", fa: "روی body" },
                  { en: "Nowhere — hover is always smooth", fa: "هیچ‌جا — هاور همیشه نرمه" },
                ],
                answer: 1,
                explain: { en: "Transition on the base state means both entering AND leaving hover animate.", fa: "‏transition روی حالت پایه یعنی هم ورود به هاور انیمیت می‌شه هم خروج ازش." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Tilted Promo Card", fa: "کارت تخفیف کج" },
            brief: { en: "Give .promo-card inline style: transform: scale(1.05) rotate(-2deg); transition: transform 0.25s ease-out; background-color: #ede9fe; border: 1px solid #c4b5fd; border-radius: 14px; padding: 24px 32px; font-size: 22px; font-weight: 700. Keep the text \"50% OFF ✦\".", fa: "به .promo-card استایل درون‌خطی ‏transform: scale(1.05) rotate(-2deg); transition: transform 0.25s ease-out; background-color: #ede9fe; border: 1px solid #c4b5fd; border-radius: 14px; padding: 24px 32px; font-size: 22px; font-weight: 700 بده. متن «50% OFF ✦» بمونه." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Promo card</title>\n</head>\n<body style="display: flex; justify-content: center; margin-top: 60px; font-family: sans-serif;">\n  <!-- TODO: the full tilt recipe — transform combo + transition + skin -->\n  <div class="promo-card">50% OFF ✦</div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Promo card</title>\n</head>\n<body style="display: flex; justify-content: center; margin-top: 60px; font-family: sans-serif;">\n  <div class="promo-card" style="transform: scale(1.05) rotate(-2deg); transition: transform 0.25s ease-out; background-color: #ede9fe; border: 1px solid #c4b5fd; border-radius: 14px; padding: 24px 32px; font-size: 22px; font-weight: 700;">50% OFF ✦</div>\n</body>\n</html>`,
            hints: [
              { en: "Start with the combo: transform: scale(1.05) rotate(-2deg); — both functions, one declaration.", fa: "با ترکیب شروع کن: ‏transform: scale(1.05) rotate(-2deg);‏ — هر دو تابع، یک تعریف." },
              { en: "Skin: #ede9fe background, 1px solid #c4b5fd border, 14px radius, padding 24px 32px.", fa: "پوسته: بک‌گراند ‏#ede9fe و بوردر ‏1px solid #c4b5fd و رادیوس ‏۱۴ و پدینگ ‏24px 32px." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".promo-card", text: "50% OFF" },
                { selector: ".promo-card", styleIncludes: "transform: scale(1.05) rotate(-2deg)" },
                { selector: ".promo-card", styleIncludes: "transition: transform 0.25s ease-out" },
                { selector: ".promo-card", styleIncludes: "border-radius: 14px" },
                { selector: ".promo-card", styleIncludes: "border: 1px solid #c4b5fd" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m20-l2",
        title: { en: "Box-Shadow & Glow", fa: "سایه و درخشش" },
        goal: { en: "Layer two shadows in one box-shadow — a grounding shadow plus a colored glow.", fa: "دو تا سایه رو در یک box-shadow لایه کن — یه سایه‌ی ثبات‌دهنده به‌علاوه یه هاله‌ی رنگی." },
        minutes: 8,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "**box-shadow** draws a shadow behind the element: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);` reads as offsetX, offsetY, blur, color — 0 sideways, 4px down, 12px of softness, 20% black. Blur is the shadow's personality: bigger means softer and further away.", fa: "‏**box-shadow** پشت عنصر سایه می‌کشه: ‏`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);` یعنی جابه‌جایی افقی و عمودی و بلر و رنگ — صفر به کنار، ‏۴ پیکسل به پایین، ‏۱۲ پیکسل نرمی و ‏۲۰٪ مشکی. بلر شخصیت سایه‌ست: هرچی بیشتر، نرم‌تر و دورتر." },
              { type: "code", lang: "css", runnable: false, code: `.grounded { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }\n.lifted   { box-shadow: 0 12px 28px rgba(2, 8, 23, 0.25); }`, caption: { en: "More down-offset + more blur = the element floats higher.", fa: "جابه‌جایی بیشتر به پایین + بلر بیشتر = عنصر بالاتر شناوره." } },
              { type: "tip", en: "Never pure-black shadows — soft black like rgba(0, 0, 0, 0.2) or a dark navy reads far more natural.", fa: "هیچ‌وقت سایه‌ی مشکی خالص نذار — مشکی نرم مثل ‏rgba(0, 0, 0, 0.2) یا سرمه‌ای تیره خیلی طبیعی‌تر به چشم میاد." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "One element, many shadows — separate them with commas. The pro pairing: layer 1 is a soft dark shadow that **grounds** the card; layer 2 is a colored **glow** — zero offset, big blur, bright rgba color. The glow says \"interactive\", the shadow says \"floating\".", fa: "یک عنصر، چند سایه — با کاما از هم جدا شون. جفت حرفه‌ای اینه: لایه ۱ یه سایه تیره نرم که کارت رو روی صفحه می‌شونه و لایه ۲ یه **هاله‌ی** رنگی — جابه‌جایی صفر، بلر بزرگ، رنگ rgba روشن. هاله می‌گه «من تعاملی‌ام» و سایه می‌گه «من شناورم»." },
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; padding: 60px 20px; background-color: #0f172a;\n           font-family: sans-serif; display: flex; justify-content: center; }\n    .neon {\n      width: 240px; padding: 22px; border-radius: 12px;\n      background-color: #0f172a; color: #e2e8f0;\n      border: 1px solid #22d3ee;\n      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 24px rgba(34, 211, 238, 0.45);\n    }\n  </style>\n</head>\n<body>\n  <div class="neon">\n    <h3 style="margin: 0 0 6px;">Neon card</h3>\n    <p style="margin: 0; color: #94a3b8;">One shadow grounds me, one makes me glow.</p>\n  </div>\n</body>\n</html>` },
              { type: "warn", en: "Two layers is the sweet spot. Stack three or four glows and the card starts looking like a carnival sign.", fa: "دو لایه نقطه‌ی تعادله. سه‌چهار تا هاله روی هم بچینی، کارت شبیه تابلوی شهربازی می‌شه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), what is the 12px?", fa: "در ‏box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) عدد ۱۲ چیست؟" },
                options: [
                  { en: "The horizontal offset", fa: "جابه‌جایی افقی" },
                  { en: "The vertical offset", fa: "جابه‌جایی عمودی" },
                  { en: "The spread radius", fa: "شعاع پخش" },
                  { en: "The shadow's opacity", fa: "شفافیت سایه" },
                ],
                answer: 1,
                explain: { en: "Order: offsetX, offsetY, blur, (spread), color. The 12px pushes the shadow down.", fa: "ترتیب: جابه‌جایی افقی و عمودی و بلر و (پخش) و رنگ. ‏۱۲ پیکسل سایه رو به پایین می‌فرسته." },
              },
              {
                q: { en: "Which value creates a colored glow around a card?", fa: "کدوم مقدار یه هاله‌ی رنگی دور کارت می‌سازه؟" },
                options: [
                  { en: "0 0 24px rgba(34, 211, 238, 0.45) — zero offset, big blur, bright color", fa: "‏0 0 24px rgba(34, 211, 238, 0.45) — جابه‌جایی صفر، بلر بزرگ، رنگ روشن" },
                  { en: "24px 24px 0 rgba(34, 211, 238, 1)", fa: "‏24px 24px 0 rgba(34, 211, 238, 1)" },
                  { en: "border: 24px solid #22d3ee", fa: "‏border: 24px solid #22d3ee" },
                  { en: "filter: glow(cyan)", fa: "‏filter: glow(cyan)" },
                ],
                answer: 0,
                explain: { en: "Zero offsets keep the glow centered; the big blur spreads it into a halo.", fa: "جابه‌جایی صفر هاله رو وسط عنصر نگه می‌داره و بلر بزرگش رو پخش می‌کنه تا یه حلقه‌ی نور بشه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Neon Glow Card", fa: "کارت نئونی" },
            brief: { en: "Give .neon-card inline: box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 24px rgba(34, 211, 238, 0.45); border: 1px solid #22d3ee; border-radius: 12px; background-color: #0f172a; color: #e2e8f0. The dark body background stays as it is. Keep the texts.", fa: "به .neon-card استایل درون‌خطی ‏box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 24px rgba(34, 211, 238, 0.45); border: 1px solid #22d3ee; border-radius: 12px; background-color: #0f172a; color: #e2e8f0 بده. بک‌گراند تیره‌ی body سر جاش بمونه. متن‌ها هم بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Neon card</title>\n</head>\n<body style="margin: 0; padding: 60px 20px; background-color: #0f172a; font-family: sans-serif; display: flex; justify-content: center;">\n  <!-- TODO: neon recipe — layered shadow (dark + cyan glow) + cyan border + radius -->\n  <div class="neon-card" style="width: 240px; padding: 22px;">\n    <h3 style="margin: 0 0 6px;">Neon card</h3>\n    <p style="margin: 0; color: #94a3b8;">One shadow grounds me, one makes me glow.</p>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Neon card</title>\n</head>\n<body style="margin: 0; padding: 60px 20px; background-color: #0f172a; font-family: sans-serif; display: flex; justify-content: center;">\n  <div class="neon-card" style="width: 240px; padding: 22px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 24px rgba(34, 211, 238, 0.45); border: 1px solid #22d3ee; border-radius: 12px; background-color: #0f172a; color: #e2e8f0;">\n    <h3 style="margin: 0 0 6px;">Neon card</h3>\n    <p style="margin: 0; color: #94a3b8;">One shadow grounds me, one makes me glow.</p>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Layer order is for reading, not looks: dark shadow first, glow second — one comma between them.", fa: "ترتیب لایه‌ها برای خواندنه نه ظاهر: اول سایه تیره، بعد هاله — فقط یه کاما بین‌شون." },
              { en: "The glow layer is 0 0 24px rgba(34, 211, 238, 0.45) — zero, zero, big blur.", fa: "لایه‌ی هاله اینه: ‏0 0 24px rgba(34, 211, 238, 0.45)‏ — صفر، صفر و بلر بزرگ." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".neon-card", styleIncludes: "box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 24px rgba(34, 211, 238, 0.45)" },
                { selector: ".neon-card", styleIncludes: "border: 1px solid #22d3ee" },
                { selector: ".neon-card", styleIncludes: "border-radius: 12px" },
                { selector: ".neon-card", styleIncludes: "background-color: #0f172a" },
                { selector: ".neon-card h3", text: "Neon card" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m20-l3",
        title: { en: "Rounded Glass Cards", fa: "کارت‌های شیشه‌ای گرد" },
        goal: { en: "Build the glass look with translucent fills, a lit border and a big radius — no backdrop-filter needed.", fa: "حس شیشه رو با پرده‌ی نیمه‌شفاف و بوردر روشن و رادیوس بزرگ بساز — بدون backdrop-filter." },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "Glass has a recipe, and backdrop-filter is optional: (1) a colorful scene behind, (2) a translucent fill like rgba(15, 23, 42, 0.55) — the \"smoked glass\" film, (3) a thin light border like rgba(255, 255, 255, 0.3), as if light caught the edge, (4) a generous radius (16–20px) plus real padding. Even without blur, translucency alone sells the glass.", fa: "شیشه دستور پخت داره و ‏backdrop-filter اختیاریه: (۱) یه صحنه‌ی رنگی پشت کارت، (۲) یه پرده‌ی نیمه‌شفاف مثل ‏rgba(15, 23, 42, 0.55) — همون «شیشه دودی»، (۳) یه بوردر نازک روشن مثل ‏rgba(255, 255, 255, 0.3) که انگار نور به لبه‌ش خورده، (۴) یه رادیوس دست‌ودل‌باز (‏۱۶ تا ۲۰ پیکسل) به‌علاوه پدینگ واقعی. حتی بدون بلر هم همین نیمه‌شفاف‌بودن حس شیشه می‌ده." },
              { type: "code", lang: "css", runnable: false, code: `.glass-card {\n  background-color: rgba(15, 23, 42, 0.55);   /* smoked film */\n  border: 1px solid rgba(255, 255, 255, 0.3); /* lit edge */\n  border-radius: 18px;\n  padding: 24px;\n}`, caption: { en: "The four-signature glass recipe.", fa: "دستور چهار امضایی شیشه." } },
              { type: "tip", en: "The alpha dial: 0.4–0.6 for dark smoked glass, 0.05–0.15 for white frosted glass. Above 0.7 it's just a solid card again.", fa: "پیچ آلفا: برای شیشه دودی تیره ‏۰٫۴ تا ۰٫۶ و برای شیشه مات سفید ‏۰٫۰۵ تا ۰٫۱۵. بالای ‏۰٫۷ دیگه کارت جامده، نه شیشه." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: sans-serif; }\n    .scene {\n      min-height: 300px; display: grid; place-items: center;\n      background: linear-gradient(135deg, #fbbf24, #ec4899, #8b5cf6);\n    }\n    .glass-card {\n      background-color: rgba(15, 23, 42, 0.55);\n      border: 1px solid rgba(255, 255, 255, 0.3);\n      border-radius: 18px; padding: 24px;\n      color: #f8fafc; max-width: 300px;\n    }\n  </style>\n</head>\n<body>\n  <div class="scene">\n    <div class="glass-card">\n      <h2 style="margin: 0 0 8px;">Sunset glass</h2>\n      <p style="margin: 0; line-height: 1.7;">No blur here — the translucent dark film over the bright gradient already reads as glass.</p>\n    </div>\n  </div>\n</body>\n</html>` },
              { type: "text", en: "The scene does half the work. Swap the sunset for a plain white page and the same card turns into a dull gray box — glass is a relationship between the film and what glows behind it. (You met real backdrop blur in module 15; stack it on top whenever you want the frost.)", fa: "صحنه نصف کار رو انجام می‌ده. به‌جای غروب، یه صفحه سفید ساده بذار — همین کارت تبدیل می‌شه به یه باکس خاکستری کسل‌کننده. شیشه یعنی رابطه‌ی پرده با چیزی که پشتش می‌درخشه. بلر واقعی رو هم تو ماژول ۱۵ دیدی؛ هر وقت یخ‌زدگی خواستی، روش سوارش کن." },
              { type: "warn", en: "Radius without padding looks broken — content hugs the rounded corner and looks clipped. Pair every big radius with real padding (20–28px).", fa: "رادیوس بدون پدینگ شکسته به نظر می‌رسه — محتوا به گوشه‌ی گرد می‌چسبه و حالت بریده‌بریده می‌گیره. هر رادیوس بزرگ رو با پدینگ واقعی جفت کن (‏۲۰ تا ۲۸ پیکسل)." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why does a glass card vanish on a plain white page?", fa: "چرا کارت شیشه‌ای روی صفحه سفید ساده ناپدید می‌شه؟" },
                options: [
                  { en: "rgba colors don't work on white", fa: "رنگ‌های rgba روی سفید کار نمی‌کنن" },
                  { en: "Nothing colorful sits behind the translucent film", fa: "هیچ چیز رنگی پشت پرده‌ی نیمه‌شفاف نیست" },
                  { en: "The border cancels the background", fa: "بوردر بک‌گراند رو خنثی می‌کنه" },
                  { en: "Glass needs JavaScript", fa: "شیشه به جاوااسکریپت نیاز داره" },
                ],
                answer: 1,
                explain: { en: "Glass = film + colorful scene behind. Remove the scene and there's nothing left to show through.", fa: "شیشه یعنی پرده + صحنه‌ی رنگی پشتش. صحنه رو برداری، چیزی نمی‌مونه که از پشت رد شه." },
              },
              {
                q: { en: "Which fill makes a believable dark smoked glass?", fa: "کدوم پرکننده یه شیشه دودی تیره باورپذیر می‌سازه؟" },
                options: [
                  { en: "background-color: #0f172a", fa: "‏background-color: #0f172a" },
                  { en: "background-color: rgba(15, 23, 42, 0.55)", fa: "‏background-color: rgba(15, 23, 42, 0.55)" },
                  { en: "background-color: transparent", fa: "‏background-color: transparent" },
                  { en: "background-color: rgba(15, 23, 42, 1)", fa: "‏background-color: rgba(15, 23, 42, 1)" },
                ],
                answer: 1,
                explain: { en: "0.55 alpha = half see-through: the scene glows through but the card still reads as a pane.", fa: "آلفای ‏۰٫۵۵ یعنی نصفه‌شفاف: صحنه از پشت پیداست ولی کارت هنوز حس یه پنل جامد رو می‌ده." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Sunset Glass Card", fa: "کارت شیشه‌ای غروب" },
            brief: { en: "The .scene gradient stays exactly as it is. Give .glass-card inline: background-color: rgba(15, 23, 42, 0.55); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 18px; padding: 24px. The gray placeholder fill must go. Keep the texts.", fa: "گرادیانت .scene دقیقاً سر جاش بمونه. به .glass-card استایل درون‌خطی ‏background-color: rgba(15, 23, 42, 0.55); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 18px; padding: 24px بده. اون بک‌گراند خاکستری جایگزین باید بره. متن‌ها هم بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Sunset glass</title>\n</head>\n<body style="margin: 0; font-family: sans-serif;">\n  <div class="scene" style="min-height: 300px; display: grid; place-items: center; background: linear-gradient(135deg, #fbbf24, #ec4899, #8b5cf6);">\n    <!-- TODO: glass recipe — smoked fill + lit border + radius 18 + padding 24 -->\n    <div class="glass-card" style="color: #f8fafc; max-width: 300px; background-color: #94a3b8;">\n      <h2 style="margin: 0 0 8px;">Sunset glass</h2>\n      <p style="margin: 0; line-height: 1.7;">No blur here — the translucent dark film over the bright gradient already reads as glass.</p>\n    </div>\n  </div>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Sunset glass</title>\n</head>\n<body style="margin: 0; font-family: sans-serif;">\n  <div class="scene" style="min-height: 300px; display: grid; place-items: center; background: linear-gradient(135deg, #fbbf24, #ec4899, #8b5cf6);">\n    <div class="glass-card" style="color: #f8fafc; max-width: 300px; background-color: rgba(15, 23, 42, 0.55); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 18px; padding: 24px;">\n      <h2 style="margin: 0 0 8px;">Sunset glass</h2>\n      <p style="margin: 0; line-height: 1.7;">No blur here — the translucent dark film over the bright gradient already reads as glass.</p>\n    </div>\n  </div>\n</body>\n</html>`,
            hints: [
              { en: "Swap #94a3b8 for rgba(15, 23, 42, 0.55) — same hue family, but see-through.", fa: "‏#94a3b8 رو با ‏rgba(15, 23, 42, 0.55) عوض کن — همون خانواده‌ی رنگی، ولی نیمه‌شفاف." },
              { en: "The lit edge is 1px — not 3px — and translucent white: rgba(255, 255, 255, 0.3).", fa: "لبه‌ی روشن ‏۱ پیکسله — نه ‏۳ — و سفید نیمه‌شفاف: ‏rgba(255, 255, 255, 0.3)." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".glass-card", styleIncludes: "background-color: rgba(15, 23, 42, 0.55)" },
                { selector: ".glass-card", styleIncludes: "border: 1px solid rgba(255, 255, 255, 0.3)" },
                { selector: ".glass-card", styleIncludes: "border-radius: 18px" },
                { selector: ".glass-card", styleIncludes: "padding: 24px" },
                { selector: ".glass-card h2", text: "Sunset glass" },
              ],
            },
          },
        ],
      },
      {
        id: "css-m20-l4",
        title: { en: "MINI-PROJECT: Glass Profile Card", fa: "پروژه کوچک: کارت پروفایل شیشه‌ای" },
        goal: { en: "Fuse glass, a layered shadow, rounded corners and a tilted avatar into one finished card.", fa: "شیشه و سایه‌ی لایه‌ای و گوشه‌های گرد و آواتار کج رو توی یک کارت تمام‌شده ترکیب کن." },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              { type: "text", en: "The capstone blueprint: a dark gradient scene, one glass card (translucent white fill + lit border + 20px radius + padding), a layered shadow for depth, and a playful avatar tilted with `transform: rotate(-6deg)`. Four lessons, four ingredients — one component.", fa: "نقشه‌ی پروژه: یه صحنه‌ی گرادیانی تیره، یه کارت شیشه‌ای (پرده‌ی سفید نیمه‌شفاف + بوردر روشن + رادیوس ۲۰ + پدینگ)، یه سایه‌ی لایه‌ای برای عمق و یه آواتار بازیگوش که با ‏`transform: rotate(-6deg)` کج شده. چهار درس، چهار ماده‌ی اولیه — یک کامپوننت." },
              { type: "code", lang: "css", runnable: false, code: `.glass-card {\n  background-color: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 20px; padding: 24px;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);\n}\n.avatar { transform: rotate(-6deg); }  /* the playful tilt */`, caption: { en: "Glass + depth + tilt — the whole lab in two rules.", fa: "شیشه + عمق + کجی — کل کارگاه در دو قانون." } },
              { type: "tip", en: "On dark scenes glass glows soft white (alpha 0.05–0.12); on bright scenes switch to a dark smoked film. Match the film to the light.", fa: "روی صحنه‌ی تیره شیشه با سفیدِ کم‌رنگ می‌درخشه (آلفای ‏۰٫۰۵ تا ۰٫۱۲) و روی صحنه‌ی روشن پرده‌ی دودی تیره می‌ذارن — پرده رو با نور صحنه هماهنگ کن." },
            ],
          },
          {
            kind: "theory",
            blocks: [
              { type: "code", lang: "html", runnable: true, code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; min-height: 100vh; display: grid; place-items: center;\n           font-family: sans-serif; background: linear-gradient(150deg, #0f172a, #4c1d95); }\n    .glass-card { width: 320px; padding: 24px; color: #e2e8f0;\n      background-color: rgba(255, 255, 255, 0.08);\n      border: 1px solid rgba(255, 255, 255, 0.2);\n      border-radius: 20px;\n      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35); }\n    .head { display: flex; align-items: center; gap: 14px; }\n    .avatar { width: 56px; height: 56px; border-radius: 50%; transform: rotate(-6deg);\n      background-color: #22d3ee; color: #0f172a; font-weight: 700;\n      display: flex; align-items: center; justify-content: center; }\n    .role { color: #94a3b8; font-size: 13px; }\n    .stats { display: flex; gap: 18px; margin-top: 16px; color: #94a3b8; font-size: 13px; }\n  </style>\n</head>\n<body>\n  <section class="glass-card">\n    <div class="head">\n      <div class="avatar">SA</div>\n      <div>\n        <h2 style="margin: 0 0 2px; font-size: 18px; color: #f8fafc;">Sara Ahmadi</h2>\n        <span class="role">Bug Hunter · TEKA</span>\n      </div>\n    </div>\n    <p style="margin: 14px 0 0; line-height: 1.7;">Turns coffee into clean CSS. Fan of soft shadows and rounder corners.</p>\n    <div class="stats"><span>128 posts</span><span>4.2k followers</span></div>\n  </section>\n</body>\n</html>` },
              { type: "text", en: "Spacing rhythm check: 14px between avatar and name, 16px before the stats, one generous padding holding it all. Notice how the tilted avatar breaks the grid just enough — a 6-degree tilt is personality; 20 degrees is an accident.", fa: "ریتم فاصله‌ها رو چک کن: ‏۱۴ پیکسل بین آواتار و اسم، ‏۱۶ پیکسل قبل از آمار و یه پدینگ دست‌ودل‌باز که همه رو نگه می‌داره. ببین آواتار کج چقدر به‌جا شبکه رو می‌شکنه — چرخش ۶ درجه شخصیته؛ ‏۲۰ درجه تصادفه." },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What tilts the avatar playfully without touching the layout?", fa: "چی آواتار رو بدون به‌هم‌ریختن چیدمان بازیگوش کج می‌کنه؟" },
                options: [
                  { en: "margin-left: -6px", fa: "‏margin-left: -6px" },
                  { en: "transform: rotate(-6deg)", fa: "‏transform: rotate(-6deg)" },
                  { en: "position: relative; top: -6px", fa: "‏position: relative; top: -6px" },
                  { en: "border-radius: -6deg", fa: "‏border-radius: -6deg" },
                ],
                answer: 1,
                explain: { en: "transform rotates visually only — the space the avatar occupies never changes.", fa: "‏transform فقط بصری می‌چرخونه — فضایی که آواتار اشغال کرده هیچ تغییری نمی‌کنه." },
              },
              {
                q: { en: "On a dark indigo scene, which card reads as glass?", fa: "روی صحنه‌ی سرمه‌ای-بنفش، کدوم کارت حس شیشه می‌ده؟" },
                options: [
                  { en: "background-color: rgba(255, 255, 255, 0.08) + border: 1px solid rgba(255, 255, 255, 0.2)", fa: "‏background-color: rgba(255, 255, 255, 0.08) به‌علاوه ‏border: 1px solid rgba(255, 255, 255, 0.2)" },
                  { en: "background-color: #ffffff + border: 3px solid #000000", fa: "‏background-color: #ffffff به‌علاوه ‏border: 3px solid #000000" },
                  { en: "A fully transparent background with no border", fa: "بک‌گراند کاملاً شفاف و بدون بوردر" },
                  { en: "background-color: rgba(0, 0, 0, 1)", fa: "‏background-color: rgba(0, 0, 0, 1)" },
                ],
                answer: 0,
                explain: { en: "A whisper of white (8%) plus a translucent edge lets the scene glow through — that's dark-scene glass.", fa: "یه زمزمه سفید (۸٪) به‌علاوه یه لبه‌ی نیمه‌شفاف می‌ذاره صحنه از پشت بدرخشه — این همون شیشه روی صحنه‌ی تیره‌ست." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Glass Profile Card", fa: "کارت پروفایل شیشه‌ای" },
            brief: { en: "Give .glass-card inline: background-color: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35). Give .avatar inline: transform: rotate(-6deg) plus its circle skin — width: 56px; height: 56px; border-radius: 50%; background-color: #22d3ee; color: #0f172a; display: flex; align-items: center; justify-content: center; font-weight: 700. The body scene gradient stays as it is. Keep every text.", fa: "به .glass-card استایل درون‌خطی ‏background-color: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35) بده. به .avatar هم ‏transform: rotate(-6deg) بده به‌علاوه پوسته‌ی دایره‌ای — ‏width: 56px; height: 56px; border-radius: 50%; background-color: #22d3ee; color: #0f172a; display: flex; align-items: center; justify-content: center; font-weight: 700. گرادیانت صحنه‌ی body سر جاش بمونه. همه‌ی متن‌ها بمونن." },
            starter: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Glass profile card</title>\n</head>\n<body style="margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: linear-gradient(150deg, #0f172a, #4c1d95);">\n  <!-- TODO 1: glass recipe + layered shadow + radius 20 + padding 24 -->\n  <section class="glass-card" style="width: 320px; color: #e2e8f0;">\n    <div class="head" style="display: flex; align-items: center; gap: 14px;">\n      <!-- TODO 2: tilted circle avatar recipe -->\n      <div class="avatar">SA</div>\n      <div>\n        <h2 style="margin: 0 0 2px; font-size: 18px; color: #f8fafc;">Sara Ahmadi</h2>\n        <span style="color: #94a3b8; font-size: 13px;">Bug Hunter · TEKA</span>\n      </div>\n    </div>\n    <p style="margin: 14px 0 0; line-height: 1.7;">Turns coffee into clean CSS. Fan of soft shadows and rounder corners.</p>\n    <div style="display: flex; gap: 18px; margin-top: 16px; color: #94a3b8; font-size: 13px;"><span>128 posts</span><span>4.2k followers</span></div>\n  </section>\n</body>\n</html>`,
            solution: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Glass profile card</title>\n</head>\n<body style="margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: linear-gradient(150deg, #0f172a, #4c1d95);">\n  <section class="glass-card" style="width: 320px; color: #e2e8f0; background-color: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);">\n    <div class="head" style="display: flex; align-items: center; gap: 14px;">\n      <div class="avatar" style="width: 56px; height: 56px; border-radius: 50%; background-color: #22d3ee; color: #0f172a; display: flex; align-items: center; justify-content: center; font-weight: 700; transform: rotate(-6deg);">SA</div>\n      <div>\n        <h2 style="margin: 0 0 2px; font-size: 18px; color: #f8fafc;">Sara Ahmadi</h2>\n        <span style="color: #94a3b8; font-size: 13px;">Bug Hunter · TEKA</span>\n      </div>\n    </div>\n    <p style="margin: 14px 0 0; line-height: 1.7;">Turns coffee into clean CSS. Fan of soft shadows and rounder corners.</p>\n    <div style="display: flex; gap: 18px; margin-top: 16px; color: #94a3b8; font-size: 13px;"><span>128 posts</span><span>4.2k followers</span></div>\n  </section>\n</body>\n</html>`,
            hints: [
              { en: "Card first: translucent white fill, translucent border, radius 20, padding 24 — then the big soft shadow.", fa: "اول کارت: پرده‌ی سفید نیمه‌شفاف و بوردر نیمه‌شفاف و رادیوس ۲۰ و پدینگ ۲۴ — بعد سایه‌ی بزرگ و نرم." },
              { en: "Avatar: circle skin first, then transform: rotate(-6deg) as the final declaration.", fa: "آواتار: اول پوسته‌ی دایره، بعد ‏transform: rotate(-6deg) به‌عنوان آخرین تعریف." },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: ".glass-card", styleIncludes: "background-color: rgba(255, 255, 255, 0.08)" },
                { selector: ".glass-card", styleIncludes: "border-radius: 20px" },
                { selector: ".glass-card", styleIncludes: "box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35)" },
                { selector: ".avatar", styleIncludes: "transform: rotate(-6deg)" },
                { selector: ".glass-card h2", text: "Sara Ahmadi" },
              ],
            },
          },
        ],
      },
    ],
  },
];
