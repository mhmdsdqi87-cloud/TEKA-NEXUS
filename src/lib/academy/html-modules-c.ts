// TEKA Academy — HTML course, part C: modules 17–18.
// Continues course-html.ts (html-m1..m16). Same contract: every code/starter/
// solution string is a COMPLETE standalone page that runs inside the sandboxed
// lesson iframe — no external resources, no <script> tags, placeholder media
// files only. Bilingual en + fa. Challenge solutions pass every check, starters
// fail at least one. Wiring into the course happens in the parent task.

import type { Module } from "./types";

export const htmlModulesC: Module[] = [
  // ─── Module 17 ───────────────────────────────────────────
  {
    id: "html-m17",
    title: { en: "Multimedia Studio", fa: "استودیوی چندرسانه‌ای" },
    blurb: {
      en: "The director's cut of media: preload and playsinline, captioned players, sandboxed iframes and a complete media page.",
      fa: "نسخه‌ی کارگردانِ رسانه: ‏preload و playsinline و پخش‌کننده‌های زیرنویس‌دار و iframeهای امن و یک صفحه‌ی رسانه‌ایِ کامل.",
    },
    lessons: [
      {
        id: "html-m17-l1",
        title: { en: "video: the director's toolkit", fa: "video؛ جعبه‌ابزارِ کارگردان" },
        goal: {
          en: "Steer the native video player like a pro: preload, playsinline and the three ready-made recipes.",
          fa: "پخش‌کننده‌ی بومیِ ویدیو را مثل حرفه‌ای‌ها کارگردانی کنی: ‏preload و playsinline و سه دستورِ آماده.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "Four attributes you haven't met", fa: "چهار ویژگی که هنوز ندیده‌ای" },
            blocks: [
              {
                type: "text",
                en: "Module 11 gave you the native player: `controls`, `poster`, the `<source>` children. Today we finish the toolkit. `preload` tells the browser how eager to be BEFORE anyone presses play: `preload='none'` — download nothing until asked (podcasts far down the page), `preload='metadata'` — fetch just the file's size and duration (the sweet default for demos), `preload='auto'` — download everything upfront (only when the video IS the page).",
                fa: "ماژول ۱۱ پخش‌کننده‌ی بومی را به تو داد: `controls` و `poster` و بچه‌های `<source>`. امروز جعبه‌ابزار را کامل می‌کنیم. `preload` به مرورگر می‌گوید قبل از فشردنِ play چقدر مشتاق باشد: ‏`preload='none'` — تا وقتی کسی نخواسته، هیچی دانلود نکن (برای پادکست‌های پایینِ صفحه)، ‏`preload='metadata'` — فقط اندازه و مدتِ فایل را بگیر (انتخابِ طلایی برای دموها)، ‏`preload='auto'` — همه‌چیز را از همان اول دانلود کن (فقط وقتی خودِ ویدیو «کلِ» صفحه است).",
              },
              {
                type: "text",
                en: "`playsinline` is a one-word promise for iPhones: play INSIDE your box, don't hijack the whole screen. Without it, iOS flips every video to fullscreen the moment it starts — rude for a small demo clip.",
                fa: "`playsinline` یک قولِ یک‌کلمه‌ای برای آیفون‌هاست: داخلِ جعبه‌ات پخش کن، تمامِ صفحه را نبُر. بدونِ آن، iOS همان لحظه‌ی شروع، هر ویدیویی را تمام‌صفحه می‌کند — برای یک کلیپِ دموی کوچک، بی‌ادبانه است.",
              },
              {
                type: "text",
                en: "And `width` (with `height`) reserves the player's box before the file arrives — the same no-jumping rule your images learned in Module 11.",
                fa: "و `width` (با `height`) جعبه‌ی پخش‌کننده را قبل از رسیدنِ فایل رزرو می‌کند — همان قانونِ ضدِ پرش که تصویرهایت در ماژول ۱۱ یاد گرفتند.",
              },
              {
                type: "tip",
                en: "`controls`, `muted`, `loop`, `autoplay`, `playsinline` are boolean attributes — a bare word, no `=`. `preload` and `poster` take values.",
                fa: "`controls` و `muted` و `loop` و `autoplay` و `playsinline` ویژگی‌های بولی‌اند — یک کلمه‌ی لخت، بدونِ `=`. ولی `preload` و `poster` مقدار می‌گیرند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Three recipes off the shelf", fa: "سه دستورِ آماده" },
            blocks: [
              {
                type: "text",
                en: "Most videos on real pages are one of three recipes. The AMBIENT LOOP: `muted autoplay loop playsinline` — a background scene with the sound off, the only autoplay combo browsers honor. The DEMO: `controls preload='metadata' poster playsinline` — patient, titled, ready. The TEASER: `controls preload='none'` — costs the visitor zero bytes until they ask.",
                fa: "بیشترِ ویدیوهای صفحه‌های واقعی یکی از این سه دستورند. لوپِ محیطی: `muted autoplay loop playsinline` — یک صحنه‌ی پس‌زمینه با صدای خاموش؛ تنها ترکیبِ autoplay که مرورگرها قبولش می‌کنند. دمو: `controls preload='metadata' poster playsinline` — صبور، با جلد، آماده. تیزر: `controls preload='none'` — تا وقتی بازدیدکننده نخواسته، حتی یک بایت هم نمی‌خورد.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Recipes</title>
  </head>
  <body>
    <h1>Launch week 🚀</h1>
    <!-- ambient loop: sound off, forever -->
    <video muted autoplay loop playsinline width="320" poster="confetti-cover.png">
      <source src="confetti.webm" type="video/webm">
    </video>
    <!-- demo: patient and polite -->
    <video controls preload="metadata" playsinline width="480" poster="demo-cover.png">
      <source src="demo.webm" type="video/webm">
      <source src="demo.mp4" type="video/mp4">
      Your browser does not support embedded video.
    </video>
  </body>
</html>`,
                caption: {
                  en: "Two recipes on one page — the loop sets the mood, the demo waits for its audience",
                  fa: "دو دستور در یک صفحه — لوپ، حال‌وهوا را می‌سازد؛ دمو منتظرِ بیننده می‌ماند",
                },
              },
              {
                type: "warn",
                en: "Don't reach for `preload='auto'` by default — it downloads the whole file for every visitor, on every visit. On a page of ten clips that is a data plan's funeral. `metadata` unless you have a reason.",
                fa: "به‌صورتِ پیش‌فرض سراغِ `preload='auto'` نرو — برای هر بازدیدکننده و در هر بازدید، تمامِ فایل را دانلود می‌کند. در صفحه‌ای با ده کلیپ، این یعنی مراسمِ خاکسپاریِ بسته‌ی اینترنت. مگر دلیلِ خوبی داشته باشی، `metadata`.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does preload='metadata' download?", fa: "‏preload='metadata' چه را دانلود می‌کند؟" },
                options: [
                  { en: "Everything — the full video file", fa: "همه‌چیز را — تمامِ فایلِ ویدیو را" },
                  { en: "Only the file's size and duration — a tiny header", fa: "فقط اندازه و مدتِ فایل را — یک هدرِ کوچک را" },
                  { en: "Just the poster image", fa: "فقط تصویرِ poster را" },
                ],
                answer: 1,
                explain: {
                  en: "It fetches the header: dimensions and duration. The heavy data stays untouched until play.",
                  fa: "فقط هدرِ فایل را می‌گیرد: ابعاد و مدت. داده‌ی سنگین تا لحظه‌ی play دست‌نخورده می‌ماند.",
                },
              },
              {
                q: { en: "Why add playsinline to a small demo video?", fa: "چرا به یک ویدیوی دموی کوچک playsinline بدهیم؟" },
                options: [
                  { en: "It compresses the video for mobile", fa: "ویدیو را برای موبایل فشرده می‌کند" },
                  { en: "On iPhones the video then plays inside its box instead of taking over the screen", fa: "روی آیفون‌ها ویدیو داخلِ جعبه‌اش پخش می‌شود، به‌جای تصاحبِ تمامِ صفحه" },
                  { en: "It makes the player load faster", fa: "پخش‌کننده را سریع‌تر بارگذاری می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Without playsinline, iOS forces fullscreen the moment the video starts — hijacking the page.",
                  fa: "بدونِ playsinline، ‏iOS همان لحظه‌ی شروع ویدیو را تمام‌صفحه می‌کند — و صفحه را می‌رباید.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The demo player 🎬", fa: "پخش‌کننده‌ی دمو 🎬" },
            brief: {
              en: "Build the demo recipe: one `<video>` carrying ALL of: `controls`, `preload='metadata'`, a `poster`, `playsinline`, and a `width` attribute. Keep the two `<source>` children and the fallback text.",
              fa: "دستورِ دمو را بساز: یک `<video>` که «همه‌ی» این‌ها را دارد: `controls`، ‏`preload='metadata'`، یک `poster`، ‏`playsinline` و یک ویژگیِ `width`. دو بچه‌ی `<source>` و متنِ جایگزین سرِ جایشان بمانند.",
            },
            starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Demo reel</title>
    </head>
    <body>
        <h1>Nimbus Notes — demo reel 🎬</h1>
        <!-- TODO: give the video ALL of: controls, preload="metadata", poster, playsinline, width="480" -->
        <video>
            <source src="demo.webm" type="video/webm">
            <source src="demo.mp4" type="video/mp4">
            Your browser does not support embedded video.
        </video>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Demo reel</title>
    </head>
    <body>
        <h1>Nimbus Notes — demo reel 🎬</h1>
        <video controls preload="metadata" playsinline width="480" poster="demo-cover.png">
            <source src="demo.webm" type="video/webm">
            <source src="demo.mp4" type="video/mp4">
            Your browser does not support embedded video.
        </video>
    </body>
</html>`,
            hints: [
              {
                en: "Boolean attributes are bare words: controls, playsinline. Value attributes: preload='metadata', poster='demo-cover.png', width='480'.",
                fa: "ویژگی‌های بولی کلمه‌ی لخت‌اند: controls و playsinline. ویژگی‌های مقدارِدار: preload='metadata' و poster='demo-cover.png' و width='480'.",
              },
              {
                en: "All five live on the SAME opening tag — order does not matter, presence does.",
                fa: "هر پنج‌تا روی «همان» تگِ آغازین می‌نشینند — ترتیب مهم نیست، بودنشان مهم است.",
              },
              {
                en: "Keep the two sources and the fallback sentence exactly where they are.",
                fa: "دو source و جمله‌ی جایگزین را سرِ جایشان نگه دار.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "video[controls]", count: 1 },
                { selector: "video[preload='metadata']", count: 1 },
                { selector: "video[poster]", count: 1 },
                { selector: "video[playsinline]", count: 1 },
                { selector: "video[width]", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "html-m17-l2",
        title: { en: "audio & the caption layer", fa: "صدا و لایه‌ی زیرنویس" },
        goal: {
          en: "Ship a podcast block with format fallbacks — and give a video real subtitles with <track>.",
          fa: "یک بلوکِ پادکست با فرمت‌های جایگزین منتشر کنی — و به یک ویدیو با <track> زیرنویسِ واقعی بدهی.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "audio: same anatomy, new tricks", fa: "صدا؛ همان کالبد، ترفندهای تازه" },
            blocks: [
              {
                type: "text",
                en: "You met `<audio controls>` in Module 11. The upgrade: like video, it can hold several `<source>` children — list the best-compressed format first (`audio/ogg`), the universal one second (`audio/mpeg`), and the browser plays the first it can. `preload` works exactly like on video, and `loop` suits ambient sound loops.",
                fa: "‏`<audio controls>` را در ماژول ۱۱ دیدی. ارتقایش: مثل ویدیو می‌تواند چند بچه‌ی `<source>` داشته باشد — فرمتِ فشرده‌تر را اول بنویس (`audio/ogg`) و فرمتِ جهانی را دوم (`audio/mpeg`)؛ مرورگر اولین فرمتی که بتواند پخش کند را برمی‌دارد. `preload` دقیقاً مثل ویدیو کار می‌کند و `loop` برای لوپ‌های صوتیِ محیطی مناسب است.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Podcast shelf</title>
  </head>
  <body>
    <h1>The Signal — episode 7 🎙️</h1>
    <audio controls preload="metadata">
      <source src="episode-07.ogg" type="audio/ogg">
      <source src="episode-07.mp3" type="audio/mpeg">
      Your browser does not support embedded audio.
    </audio>
  </body>
</html>`,
                caption: {
                  en: "Two formats, one player — ogg first, mp3 as the universal fallback",
                  fa: "دو فرمت، یک پخش‌کننده — اول ogg، بعد mp3 به‌عنوانِ جایگزینِ جهانی",
                },
              },
              {
                type: "tip",
                en: "Sound has no poster. The player is a thin bar — give it a heading above and a transcript below, so the episode makes sense even with the sound off.",
                fa: "صدا poster ندارد. پخش‌کننده‌اش یک نوارِ باریک است — بالای آن یک تیتر و زیرش یک متنِ گفتگو (transcript) بگذار تا قسمت، حتی با صدای خاموش هم معنا داشته باشد.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Subtitles: the <track> child", fa: "زیرنویس: بچه‌ی <track>" },
            blocks: [
              {
                type: "text",
                en: "Inside a `<video>`, a `<track>` child adds a subtitle layer: `<track src='subs.vtt' kind='subtitles' srclang='en' label='English'>`. `src` points at a WebVTT file — plain text with timecodes. `srclang` declares the language, `label` is the name shown in the CC menu, and `default` (a bare word) makes this the track that starts switched on.",
                fa: "داخلِ `<video>`، یک بچه‌ی `<track>` لایه‌ی زیرنویس اضافه می‌کند: `<track src='subs.vtt' kind='subtitles' srclang='en' label='English'>`. ‏`src` به یک فایلِ WebVTT اشاره می‌کند — متنی ساده با زمان‌بندی. ‏`srclang` زبان را اعلام می‌کند، `label` اسمی است که در منوی CC نشان داده می‌شود و `default` (یک کلمه‌ی لخت) یعنی این زیرنویس از همان اول روشن باشد.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Captions on</title>
  </head>
  <body>
    <h1>Studio tour — now with words 📝</h1>
    <video controls width="480" poster="tour-cover.png">
      <source src="tour.webm" type="video/webm">
      <track src="tour-subs.vtt" kind="subtitles" srclang="en" label="English" default>
      Your browser does not support embedded video.
    </video>
  </body>
</html>`,
                caption: {
                  en: "The track rides inside the video — the CC button lights up",
                  fa: "‏track داخلِ ویدیو سوار می‌شود — دکمه‌ی CC روشن می‌شود",
                },
              },
              {
                type: "warn",
                en: "Captions are not decoration — for millions of viewers they are the ONLY way to follow your video (loud cafés, hearing loss, muted autoplay). Public video without captions is a closed door.",
                fa: "زیرنویس تزئین نیست — برای میلیون‌ها بیننده تنها راهِ فهمیدنِ ویدیوی توست (کافه‌های شلوغ، کم‌شنوایی، autoplayِ بی‌صدا). ویدیوی عمومیِ بدونِ زیرنویس، درِ بسته است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why list audio/ogg before audio/mpeg?", fa: "چرا audio/ogg را قبل از audio/mpeg می‌نویسیم؟" },
                options: [
                  { en: "ogg is older, so it comes first out of respect", fa: "‏ogg قدیمی‌تر است، برای احترام اول می‌آید" },
                  { en: "The browser plays the FIRST format it can — better compression first, universal fallback second", fa: "مرورگر اولین فرمتی که بتواند پخش می‌کند — فشرده‌تر اول، جایگزینِ جهانی دوم" },
                  { en: "Order does not matter at all", fa: "اصلاً ترتیب مهم نیست" },
                ],
                answer: 1,
                explain: {
                  en: "Source lists are ranked: best format first, fallback second. The same rule video taught in Module 11.",
                  fa: "لیستِ sourceها رتبه‌بندی دارد: اول فرمتِ بهتر، بعد جایگزینِ جهانی. همان قانونی که ویدیو در ماژول ۱۱ یاد داد.",
                },
              },
              {
                q: { en: "What does the default attribute on <track> do?", fa: "ویژگیِ default روی <track> چه می‌کند؟" },
                options: [
                  { en: "It makes the browser download the video first", fa: "باعث می‌شود مرورگر اول ویدیو را دانلود کند" },
                  { en: "That subtitle track starts switched on", fa: "آن زیرنویس از همان اول روشن شروع می‌شود" },
                  { en: "It translates the video to English", fa: "ویدیو را به انگلیسی ترجمه می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "default = this captions track is enabled from the start (viewers can still switch it off).",
                  fa: "‏default یعنی این زیرنویس از همان اول روشن است (بیننده می‌تواند بعداً خاموشش کند).",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The captioned studio 🎙️", fa: "استودیوی زیرنویس‌دار 🎙️" },
            brief: {
              en: "Build the studio shelf: an `<audio controls>` with EXACTLY two `<source>` children (ogg first, mpeg second), plus a `<video controls>` that contains ONE `<track>` with `kind='subtitles'`, `srclang='en'`, `label='English'` and a `src` pointing at a `.vtt` file.",
              fa: "قفسه‌ی استودیو را بساز: یک `<audio controls>` که دقیقاً دو بچه‌ی `<source>` دارد (اول ogg، بعد mpeg)؛ به‌علاوه یک `<video controls>` که «یک» بچه‌ی `<track>` دارد با `kind='subtitles'` و `srclang='en'` و `label='English'` و یک `src` که به فایلی با پسوندِ `.vtt` اشاره می‌کند.",
            },
            starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>The Signal</title>
    </head>
    <body>
        <h1>The Signal — episode 7 🎙️</h1>
        <!-- TODO 1) audio with controls + two <source> children (ogg first, mpeg second) -->
        <audio>
            <source src="episode-07.mp3" type="audio/mpeg">
        </audio>
        <!-- TODO 2) video with controls + ONE <track> (kind="subtitles", srclang="en", label="English") -->
        <video controls width="480" poster="tour-cover.png">
            <source src="studio-tour.webm" type="video/webm">
        </video>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>The Signal</title>
    </head>
    <body>
        <h1>The Signal — episode 7 🎙️</h1>
        <audio controls preload="metadata">
            <source src="episode-07.ogg" type="audio/ogg">
            <source src="episode-07.mp3" type="audio/mpeg">
            Your browser does not support embedded audio.
        </audio>
        <video controls width="480" poster="tour-cover.png">
            <source src="studio-tour.webm" type="video/webm">
            <track src="studio-tour-subs.vtt" kind="subtitles" srclang="en" label="English" default>
            Your browser does not support embedded video.
        </video>
    </body>
</html>`,
            hints: [
              {
                en: "Audio skeleton: <audio controls> <source src='a.ogg' type='audio/ogg'> <source src='a.mp3' type='audio/mpeg'> </audio>.",
                fa: "اسکلتِ صدا: <audio controls> <source src='a.ogg' type='audio/ogg'> <source src='a.mp3' type='audio/mpeg'> </audio>.",
              },
              {
                en: "Track skeleton: <track src='subs.vtt' kind='subtitles' srclang='en' label='English'>.",
                fa: "اسکلتِ زیرنویس: <track src='subs.vtt' kind='subtitles' srclang='en' label='English'>.",
              },
              {
                en: "The track goes INSIDE the video, after the <source> children.",
                fa: "‏track «داخلِ» ویدیو می‌نشیند، بعد از بچه‌های <source>.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "audio[controls]", count: 1 },
                { selector: "audio source", count: 2 },
                { selector: "video[controls] track", count: 1 },
                { selector: "track", attrName: "kind", attrValue: "subtitles" },
                { selector: "track[srclang='en']", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "html-m17-l3",
        title: { en: "iframe: the second act", fa: "iframe؛ پرده‌ی دوم" },
        goal: {
          en: "Gate embeds with sandbox, grant powers with allow, and stretch a frame to any screen with aspect-ratio.",
          fa: "با sandbox جاسازی‌ها را قفل کنی، با allow به آن‌ها اجازه بدهی و با aspect-ratio فریم را برای هر صفحه‌ای کش بدهی.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "sandbox: the power switchboard", fa: "sandbox؛ تابلوی کلیدهای قدرت" },
            blocks: [
              {
                type: "text",
                en: "Module 11 showed the polite iframe (`src`, `title`, `loading='lazy'`). Today: the security panel. The `sandbox` attribute strips a framed page of EVERYTHING — scripts, forms, popups, downloads. `<iframe sandbox src='...'>`: one bare word, all doors locked.",
                fa: "ماژول ۱۱ iframe مؤدب را نشان داد (`src` و `title` و `loading='lazy'`). امروز سراغِ تابلوی امنیت می‌رویم. ویژگیِ `sandbox` از صفحه‌ی فریم‌شده «همه‌چیز» را می‌گیرد — اسکریپت، فرم، پاپ‌آپ، دانلود. `<iframe sandbox src='...'>`: یک کلمه‌ی لخت و همه‌ی درها قفل.",
              },
              {
                type: "text",
                en: "Then you grant powers back, one key at a time: `sandbox='allow-scripts'` lets it run JavaScript, `sandbox='allow-scripts allow-forms'` adds forms. And the `allow` attribute is the other switchboard: `allow='fullscreen'` lets a video embed go fullscreen, `allow='autoplay'` lets its player start by itself.",
                fa: "بعد قدرت‌ها را کلید‌به‌کلید پس می‌دهی: `sandbox='allow-scripts'` اجازه‌ی اجرای جاوااسکریپت می‌دهد، `sandbox='allow-scripts allow-forms'` فرم‌ها را هم اضافه می‌کند. و ویژگیِ `allow` تابلوی کلیدِ دیگر است: `allow='fullscreen'` به جاسازیِ ویدیو اجازه‌ی تمام‌صفحه شدن می‌دهد و `allow='autoplay'` اجازه‌ی شروعِ خودِ پخش‌کننده را.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Guarded embed</title>
  </head>
  <body>
    <h1>Episode player, on a leash 🐕</h1>
    <iframe
        src="https://example.com/player"
        title="Episode player — season 3"
        sandbox="allow-scripts allow-same-origin"
        allow="fullscreen"
        loading="lazy">
    </iframe>
  </body>
</html>`,
                caption: {
                  en: "Scripts run, forms don't; fullscreen is allowed, everything else stays behind the glass",
                  fa: "اسکریپت اجرا می‌شود، فرم نه؛ fullscreen آزاد است، باقی‌مانده پشتِ شیشه می‌ماند",
                },
              },
              {
                type: "tip",
                en: "Rule of thumb: bare `sandbox` for content you half-trust (a blog's demo page); a short allow-list for embeds you trust (your own videos). Blank frame? The target refused framing — X-Frame-Options, remember Module 11.",
                fa: "قانونِ سرانگشتی: `sandbox` لخت برای محتوایی که نصفه‌ونیم به آن اعتماد داری (مثلاً صفحه‌ی دموی یک وبلاگ)؛ فهرستِ کوتاهِ allow برای جاسازی‌های مطمئن (مثل ویدیوهای خودت). فریم سفید شد؟ مقصد اجازه‌ی جاسازی نداده — X-Frame-Options؛ ماژول ۱۱ را یادت هست.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The 16:9 frame that fits every screen", fa: "فریمِ ۱۶:۹ که در هر صفحه‌ای جا می‌شود" },
            blocks: [
              {
                type: "text",
                en: "Video embeds live in a 16:9 world. Old recipe: a wrapper div, padding hacks, prayer. Modern recipe — two CSS declarations on the iframe itself: `style='width: 100%; aspect-ratio: 16/9;'`. The frame always spans its container and KEEPS its widescreen proportions on any screen. No wrapper, no math.",
                fa: "جاسازیِ ویدیو در دنیای ۱۶:۹ زندگی می‌کند. دستورِ قدیمی: یک div پیچاننده، ترفندهای padding و دعا. دستورِ مدرن — دو تعریفِ CSS روی خودِ iframe: `style='width: 100%; aspect-ratio: 16/9;'`. حالا فریم همیشه تمام‌پهنای ظرفش را می‌گیرد و روی هر صفحه‌ای «نسبتِ عریضش» را حفظ می‌کند. نه پیچاننده می‌خواهد نه حساب.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Responsive embed</title>
  </head>
  <body>
    <h1>Season 3 — press play 📺</h1>
    <iframe
        src="https://example.com/player"
        title="Episode player — season 3"
        style="width: 100%; aspect-ratio: 16/9;"
        loading="lazy">
    </iframe>
  </body>
</html>`,
                caption: {
                  en: "One line of style — the frame fits a phone and a monitor equally well",
                  fa: "یک خط استایل — فریم همان‌قدر در گوشی جا می‌شود که در مانیتور",
                },
              },
              {
                type: "warn",
                en: "When you style `width: 100%` + `aspect-ratio`, drop the old `height` attribute — the ratio now decides the height. Two captains on one ship sink it.",
                fa: "وقتی `width: 100%` و `aspect-ratio` را با style می‌دهی، ویژگیِ قدیمیِ `height` را بردار — از این به بعد نسبت، ارتفاع را تصمیم می‌گیرد. دو ناخدا در یک کشتی، کشتی را غرق می‌کند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "A bare sandbox attribute (no value) does what?", fa: "ویژگیِ sandbox بدونِ مقدار چه می‌کند؟" },
                options: [
                  { en: "Nothing — it must have allow-* values to work", fa: "هیچ — برای کار کردن حتماً مقدارهای allow-* می‌خواهد" },
                  { en: "Strips everything: no scripts, no forms, no popups", fa: "همه‌چیز را می‌بُرد: نه اسکریپت، نه فرم، نه پاپ‌آپ" },
                  { en: "Speeds the frame up by blocking ads", fa: "با بستنِ تبلیغ‌ها فریم را سریع‌تر می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Bare sandbox = maximum paranoia. You then re-grant specific powers with allow-* values.",
                  fa: "‏sandbox لخت یعنی بدگمانیِ کامل. بعداً قدرت‌های خاص را با مقدارهای allow-* پس می‌دهی.",
                },
              },
              {
                q: { en: "style='width: 100%; aspect-ratio: 16/9;' makes the iframe…", fa: "‏style='width: 100%; aspect-ratio: 16/9;' یعنی iframe…" },
                options: [
                  { en: "always full-width with widescreen proportions, on any screen", fa: "همیشه تمام‌پهنا باشد با نسبتِ عریض — روی هر صفحه‌ای" },
                  { en: "exactly 16 pixels wide", fa: "دقیقاً ۱۶ پیکسل پهنا داشته باشد" },
                  { en: "load 16% faster", fa: "۱۶ درصد سریع‌تر بارگذاری شود" },
                ],
                answer: 0,
                explain: {
                  en: "Width fills the container; the ratio locks the shape. One line, responsive video box.",
                  fa: "پهنا، تمامِ ظرف را پر می‌کند و نسبت، شکل را قفل می‌کند. یک خط، و جعبه‌ی ویدیوی واکنش‌گرا.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The responsive embed 📺", fa: "جاسازیِ واکنش‌گرا 📺" },
            brief: {
              en: "One iframe, fully dressed: a `src`, a descriptive `title`, `loading='lazy'`, and inline `style` carrying `width: 100%` and `aspect-ratio: 16/9`. Any embed URL you like (e.g. https://example.com/player).",
              fa: "یک iframe کاملاً پوشیده: یک `src`، یک `title` توصیفی، ‏`loading='lazy'` و یک `style` درون‌خطی که `width: 100%` و `aspect-ratio: 16/9` را دارد. URL جاسازی هر چه خواستی (مثلاً https://example.com/player).",
            },
            starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Responsive embed</title>
    </head>
    <body>
        <h1>Season 3 — press play 📺</h1>
        <!-- TODO: give the iframe title, loading="lazy" and style="width: 100%; aspect-ratio: 16/9;" -->
        <iframe src="https://example.com/player">
        </iframe>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Responsive embed</title>
    </head>
    <body>
        <h1>Season 3 — press play 📺</h1>
        <iframe
            src="https://example.com/player"
            title="Episode player — season 3"
            style="width: 100%; aspect-ratio: 16/9;"
            loading="lazy">
        </iframe>
    </body>
</html>`,
            hints: [
              {
                en: "The style: style='width: 100%; aspect-ratio: 16/9;' — both declarations, one attribute.",
                fa: "استایل: style='width: 100%; aspect-ratio: 16/9;' — هر دو تعریف، یک ویژگی.",
              },
              {
                en: "title tells screen readers what the frame IS; loading='lazy' waits for the scroll.",
                fa: "‏title به صفحه‌خوان می‌گوید فریم چیست؛ ‏loading='lazy' منتظرِ اسکرول می‌ماند.",
              },
              {
                en: "No height attribute today — aspect-ratio decides the height.",
                fa: "امروز ویژگیِ height به کار نمی‌آید — ارتفاع را aspect-ratio تصمیم می‌گیرد.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "iframe[title]", count: 1 },
                { selector: "iframe[loading='lazy']", count: 1 },
                { selector: "iframe", styleIncludes: "width: 100%" },
                { selector: "iframe", styleIncludes: "aspect-ratio: 16/9" },
              ],
            },
          },
        ],
      },
      {
        id: "html-m17-l4",
        title: { en: "figure: the story wrapper", fa: "figure؛ قابِ روایت" },
        goal: {
          en: "Wrap audio episodes, image pairs and captions into self-explaining figures.",
          fa: "قسمت‌های پادکست و جفت‌تصاویر و کپشن‌ها را در figureهای خودتوضیح قاب کنی.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            title: { en: "Not just for photos", fa: "فقط مالِ عکس نیست" },
            blocks: [
              {
                type: "text",
                en: "Module 11's gallery hung images on `figure`. But the rule is bigger: `figure` wraps ANY self-contained piece of content the main text refers to — an audio episode, a video, a pair of before/after photos, even a table. And the `figcaption` narrates the WHOLE unit.",
                fa: "گالریِ ماژول ۱۱ عکس‌ها را روی `figure` آویزان کرد. ولی قانون بزرگ‌تر است: `figure` هر تکه‌ی محتوای «مستقل» را می‌پیچد که متنِ اصلی به آن اشاره می‌کند — یک قسمتِ پادکست، یک ویدیو، یک جفتِ عکسِ قبل/بعد، حتی یک جدول. و `figcaption` برای «کلِ» آن واحد روایت می‌کند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Figure stories</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      figure { margin: 0 0 20px; }
      img, audio { display: block; max-width: 100%; }
      img { border-radius: 12px; }
      figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
    </style>
  </head>
  <body>
    <h1>The Signal — season 3 🎙️</h1>
    <figure>
      <audio controls preload="metadata">
        <source src="episode-07.ogg" type="audio/ogg">
      </audio>
      <figcaption>Episode 7 — why we rebuilt the studio from scratch.</figcaption>
    </figure>
    <figure>
      <img src="studio-before.png" alt="The old studio: one desk, cables everywhere" width="400" height="250">
      <img src="studio-after.png" alt="The new studio: acoustic panels and two mic arms" width="400" height="250" loading="lazy">
      <figcaption>Before and after — three weekends of work.</figcaption>
    </figure>
  </body>
</html>`,
                caption: {
                  en: "One figure per story: audio + caption, image pair + one caption",
                  fa: "برای هر روایت یک figure: صدا + کپشن، جفتِ عکس + یک کپشن",
                },
              },
              {
                type: "tip",
                en: "Two images inside ONE figure is legal — their caption speaks about the pair. Need separate captions? Then you need two figures. One figure, one figcaption, always.",
                fa: "دو عکس داخلِ «یک» figure کاملاً مجاز است — و کپشنش درباره‌ی آن جفت حرف می‌زند. کپشنِ جدا می‌خواهی؟ پس دو figure می‌خواهی. یک figure، یک figcaption؛ همیشه.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Alt and figcaption: two mics, one stage", fa: "alt و figcaption؛ دو میکروفون، یک صحنه" },
            blocks: [
              {
                type: "text",
                en: "Remember the two announcements? The screen reader reads `alt` AT the image, and the `figcaption` AFTER the figure. Inside an audio figure there is no alt to write — the figcaption IS the description; let it carry the episode's promise, not just the word 'audio'.",
                fa: "دو اعلام را یادت هست؟ صفحه‌خوان `alt` را «سرِ جایِ» تصویر می‌خواند و `figcaption` را «بعد از» figure. در figureِ صوتی اصلاً alt نداریم که بنویسی — همان figcaption توصیف‌گر است؛ بگذار «قولِ قسمت» را بگوید، نه فقط کلمه‌ی audio.",
              },
              {
                type: "warn",
                en: "figcaption may sit as the FIRST or LAST child of figure — but only ONE per figure, and it belongs to everything inside: captioning just the image while an audio sits beside it leaves the episode unexplained.",
                fa: "‏figcaption می‌تواند اولین یا آخرین بچه‌ی figure باشد — ولی فقط «یک» بار در هر figure و متعلق به «همه‌ی» داخلش است: اگر فقط عکس را کپشن کنی و پادکست کنارش باشد، قسمتِ صوتی بی‌توضیح می‌ماند.",
              },
              {
                type: "text",
                en: "Small craft note: keep captions short and WHY-flavored ('Where episode 7 was recorded'), and let alt handle WHAT ('A desk with two monitors and a microphone'). Different jobs, no overlap.",
                fa: "یک نکته‌ی ظرافتی: کپشن کوتاه و «چرایی‌محور» باشد ('جایی که قسمت ۷ ضبط شد') و alt کارِ «چیستی» را کند ('میزِ کار با دو مانیتور و یک میکروفون'). دو شغلِ متفاوت، بدونِ هم‌پوشانی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How many <figcaption> tags may one <figure> hold?", fa: "یک <figure> حداکثر چند <figcaption> می‌تواند داشته باشد؟" },
                options: [
                  { en: "Exactly one — for the whole unit", fa: "دقیقاً یکی — برای کلِ واحد" },
                  { en: "One per media element inside", fa: "به ازای هر عنصرِ رسانه‌ای داخلش یکی" },
                  { en: "As many as you like", fa: "هر چقدر که دلت خواست" },
                ],
                answer: 0,
                explain: {
                  en: "One figure, one figcaption — it captions the entire unit. Want separate captions? Use two figures.",
                  fa: "یک figure، یک figcaption — کپشنِ کلِ واحد است. کپشنِ جدا می‌خواهی؟ دو figure بساز.",
                },
              },
              {
                q: { en: "A figure holds two before/after photos. The figcaption should…", fa: "یک figure دو عکسِ قبل/بعد دارد. figcaption باید…" },
                options: [
                  { en: "describe only the first photo", fa: "فقط عکسِ اول را توصیف کند" },
                  { en: "narrate the pair — the change between them", fa: "کلِ جفت را روایت کند — همان تغییر بین‌شان" },
                  { en: "stay empty, alt already works", fa: "خالی بماند — alt که کارش را می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "The figcaption belongs to the WHOLE figure — with a pair, the story is the change: 'Before and after — three weekends.'",
                  fa: "‏figcaption متعلق به کلِ figure است — با یک جفت، روایت همان تغییر است: «قبل و بعد — سه آخرِ هفته».",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The episode shelf 🎧", fa: "قفسه‌ی قسمت‌ها 🎧" },
            brief: {
              en: "Build TWO `<figure>`s: the first wraps an `img` with a real-words `alt` and `loading='lazy'`; the second wraps an `<audio controls>`. EACH figure ends with its own `figcaption`.",
              fa: "دو `<figure>` بساز: اولی یک `img` را می‌پیچد با `alt` واقعی و `loading='lazy'`؛ دومی یک `<audio controls>`. «هر» figure با figcaption خودش تمام می‌شود.",
            },
            starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Episode shelf</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            figure { margin: 0 0 20px; }
            img, audio { display: block; max-width: 100%; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>The Signal — episode shelf 🎧</h1>
        <!-- TODO 1) figure: img with alt + loading="lazy", then figcaption -->
        <!-- TODO 2) figure: audio with controls, then figcaption -->
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Episode shelf</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            figure { margin: 0 0 20px; }
            img, audio { display: block; max-width: 100%; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>The Signal — episode shelf 🎧</h1>
        <figure>
            <img src="studio-desk.png" alt="The Signal's desk: two microphones and a sound mixer" width="400" height="250" loading="lazy">
            <figcaption>Where episode 7 was recorded.</figcaption>
        </figure>
        <figure>
            <audio controls>
                <source src="episode-07.mp3" type="audio/mpeg">
                Your browser does not support embedded audio.
            </audio>
            <figcaption>Episode 7 — why we rebuilt the studio from scratch.</figcaption>
        </figure>
    </body>
</html>`,
            hints: [
              {
                en: "Photo figure: <figure><img src='…' alt='…' loading='lazy'><figcaption>…</figcaption></figure>.",
                fa: "figureِ عکس‌دار: <figure><img src='…' alt='…' loading='lazy'><figcaption>…</figcaption></figure>.",
              },
              {
                en: "Audio figure: <figure><audio controls><source src='…' type='audio/mpeg'></audio><figcaption>…</figcaption></figure>.",
                fa: "figureِ صوتی: <figure><audio controls><source src='…' type='audio/mpeg'></audio><figcaption>…</figcaption></figure>.",
              },
              {
                en: "Count: 2 figures, 2 figcaptions, 1 img[alt], 1 audio[controls].",
                fa: "بشمار: ۲ figure، ۲ figcaption، ۱ img[alt]، ۱ audio[controls].",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "figure", count: 2 },
                { selector: "figure img[alt]", count: 1 },
                { selector: "figure audio[controls]", count: 1 },
                { selector: "figure figcaption", count: 2 },
              ],
            },
          },
        ],
      },
      {
        id: "html-m17-l5",
        title: { en: "The media page", fa: "صفحه‌ی رسانه" },
        goal: {
          en: "Assemble a hero loop, a captioned episode and a lazy embed into one polished media page.",
          fa: "یک لوپِ هیرو، یک قسمتِ کپشن‌دار و یک جاسازیِ lazy را در یک صفحه‌ی رسانه‌ایِ صیقل‌خورده مونتاژ کنی.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "The blueprint", fa: "نقشه‌ی ساختمان" },
            blocks: [
              {
                type: "text",
                en: "A real media page has three rooms. The HERO: a muted autoplay loop setting the mood before a word is read. The EPISODES: figures — audio with captions, videos with tracks. The STAGE: a lazy iframe for the trailer or the map. The same skeleton your landing pages used in Module 12, with new tenants.",
                fa: "یک صفحه‌ی رسانه‌ایِ واقعی سه اتاق دارد. هیرو: یک لوپِ بی‌صدا که قبل از خواندنِ حتی یک کلمه، حال‌وهوا را می‌سازد. قسمت‌ها: figureها — صدا با کپشن، ویدیو با زیرنویس. صحنه: یک iframeِ lazy برای تریلر یا نقشه. همان اسکلتِ لندینگ‌پیج‌های ماژول ۱۲، با مستأجرهای تازه.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nimbus Studio — media</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
      video, img, audio { display: block; max-width: 100%; border-radius: 12px; }
      figure { margin: 0 0 20px; }
      figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
    </style>
  </head>
  <body>
    <h1>Nimbus Studio 🎬</h1>
    <!-- hero: the mood, before a word is read -->
    <video muted autoplay loop playsinline width="480" poster="studio-hero.png">
      <source src="hero-loop.webm" type="video/webm">
    </video>
    <h2>Episodes</h2>
    <figure>
      <audio controls preload="metadata">
        <source src="episode-07.mp3" type="audio/mpeg">
      </audio>
      <figcaption>Episode 7 — the studio rebuild, three weekends in 12 minutes.</figcaption>
    </figure>
    <h2>On stage</h2>
    <iframe src="https://example.com/player" title="Nimbus on the WebSum stage"
            style="width: 100%; aspect-ratio: 16/9;" loading="lazy"></iframe>
    <footer>Nimbus Studio — media kit 2025</footer>
  </body>
</html>`,
                caption: {
                  en: "Three rooms, one page — hero loop, captioned episode, lazy embed",
                  fa: "سه اتاق، یک صفحه — لوپِ هیرو، قسمتِ کپشن‌دار، جاسازیِ lazy",
                },
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The manners checklist", fa: "چک‌لیستِ ادب" },
            blocks: [
              {
                type: "tip",
                en: "Before you ship, sweep the page once: every video has `controls` (unless it is a muted loop), every `track` has `srclang` and `label`, every iframe has a `title`, everything below the fold is `loading='lazy'`, and every audio that matters has a transcript nearby.",
                fa: "قبل از انتشار، یک بار صفحه را جارو کن: هر ویدیو `controls` دارد (جز لوپ‌های بی‌صدا)، هر `track` هم `srclang` دارد هم `label`، هر iframe یک `title`، هرچه پایینِ صفحه است `loading='lazy'`، و هر صدایی که مهم است، متنِ گفتگویش نزدیکش است.",
              },
              {
                type: "warn",
                en: "The hero is the ONLY media allowed to skip laziness — it should NOT be `loading='lazy'` (it is the first thing seen) and its autoplay must stay muted. Everything lower down waits its turn.",
                fa: "هیرو تنها رسانه‌ای است که اجازه دارد از تنبلیِ lazy معاف باشد — یعنی `loading='lazy'` «نمی‌گیرد» (اولین چیزی است که دیده می‌شود) و autoplayاش هم باید muted بماند. هرچه پایین‌تر است، نوبتش را صبر می‌کند.",
              },
              {
                type: "text",
                en: "One last trick: `preload='none'` on episodes far down the page — a shelf of ten podcasts must not cost ten downloads. The bar appears; the data stays in the visitor's pocket until they press play.",
                fa: "یک ترفندِ آخر: برای قسمت‌های پایینِ صفحه `preload='none'` — قفسه‌ای با ده پادکست نباید هزینه‌ی ده دانلود داشته باشد. نوار نمایش داده می‌شود ولی داده در جیبِ بازدیدکننده می‌ماند تا play را بزند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "The hero video autoplays. What must it carry?", fa: "ویدیوی هیرو autoplay دارد. چه چیزی باید همراهش باشد؟" },
                options: [
                  { en: "muted — audible autoplay is blocked by browsers", fa: "‏muted — مرورگرها autoplayِ صدادار را قفل می‌کنند" },
                  { en: "preload='auto' to buffer the whole film", fa: "‏preload='auto' تا کلِ فیلم بافر شود" },
                  { en: "A soundtrack at 100% volume", fa: "یک موسیقیِ متن با صدای صد درصد" },
                ],
                answer: 0,
                explain: {
                  en: "muted autoplay loop playsinline — the only combo browsers honor. Sound without consent is the web's most-hated feature.",
                  fa: "‏muted autoplay loop playsinline — تنها ترکیبی که مرورگرها قبول می‌کنند. صدا بدونِ اجازه، منفورترین قابلیتِ وب است.",
                },
              },
              {
                q: { en: "Why loading='lazy' on the far-down embed but NOT on the hero?", fa: "چرا برای جاسازیِ پایینِ صفحه loading='lazy' ولی برای هیرو نه؟" },
                options: [
                  { en: "Lazy media is lower quality", fa: "رسانه‌ی lazy کیفیتش پایین‌تر است" },
                  { en: "The hero is seen first — it must load at once; lower media waits for the scroll", fa: "هیرو اول دیده می‌شود — باید فوراً بیاید؛ رسانه‌های پایین‌تر منتظرِ اسکرول می‌مانند" },
                  { en: "Iframes cannot be lazy, videos can", fa: "‏iframeها نمی‌توانند lazy باشند ولی ویدیوها می‌توانند" },
                ],
                answer: 1,
                explain: {
                  en: "Lazy = download when the reader comes near. Above the fold there is no 'near' — ship it eagerly.",
                  fa: "‏lazy یعنی وقتی خواننده نزدیک شد دانلود کن. بالای صفحه که «نزدیک» معنا ندارد — این را مشتاقانه بفرست.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Ship the media page 🚀", fa: "صفحه‌ی رسانه را بفرست 🚀" },
            brief: {
              en: "Assemble the page: an `<h1>` containing the word Studio; a hero `<video muted autoplay loop playsinline>` with a `poster`; one `<figure>` wrapping an `<audio controls>` plus its `figcaption`; and one `<iframe>` with a `title` and `loading='lazy'`.",
              fa: "صفحه را مونتاژ کن: یک `<h1>` که کلمه‌ی Studio را دارد؛ یک `<video muted autoplay loop playsinline>` هیرو با `poster`؛ یک `<figure>` که `<audio controls>` و `figcaption`اش را می‌پیچد؛ و یک `<iframe>` با `title` و `loading='lazy'`.",
            },
            starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Nimbus Studio — media</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            video, img, audio { display: block; max-width: 100%; border-radius: 12px; }
            figure { margin: 0 0 20px; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>Nimbus Studio</h1>
        <!-- TODO 1) hero: video muted + autoplay + loop + playsinline + poster -->
        <h2>Episodes</h2>
        <!-- TODO 2) figure: audio controls + figcaption -->
        <h2>On stage</h2>
        <!-- TODO 3) iframe: src + title + style="width: 100%; aspect-ratio: 16/9;" + loading="lazy" -->
        <footer>Nimbus Studio — media kit 2025</footer>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Nimbus Studio — media</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; }
            video, img, audio { display: block; max-width: 100%; border-radius: 12px; }
            figure { margin: 0 0 20px; }
            figcaption { color: #64748b; font-size: 14px; padding-top: 6px; }
        </style>
    </head>
    <body>
        <h1>Nimbus Studio</h1>
        <video muted autoplay loop playsinline width="480" poster="studio-hero.png">
            <source src="hero-loop.webm" type="video/webm">
        </video>
        <h2>Episodes</h2>
        <figure>
            <audio controls preload="metadata">
                <source src="episode-07.mp3" type="audio/mpeg">
                Your browser does not support embedded audio.
            </audio>
            <figcaption>Episode 7 — the studio rebuild, three weekends in 12 minutes.</figcaption>
        </figure>
        <h2>On stage</h2>
        <iframe src="https://example.com/player" title="Nimbus on the WebSum stage"
                style="width: 100%; aspect-ratio: 16/9;" loading="lazy"></iframe>
        <footer>Nimbus Studio — media kit 2025</footer>
    </body>
</html>`,
            hints: [
              {
                en: "Hero: <video muted autoplay loop playsinline width='480' poster='hero.png'> <source src='hero.webm' type='video/webm'> </video>.",
                fa: "هیرو: <video muted autoplay loop playsinline width='480' poster='hero.png'> <source src='hero.webm' type='video/webm'> </video>.",
              },
              {
                en: "Episode: <figure><audio controls>…</audio><figcaption>…</figcaption></figure>.",
                fa: "قسمت: <figure><audio controls>…</audio><figcaption>…</figcaption></figure>.",
              },
              {
                en: "Embed: <iframe src='…' title='…' style='width: 100%; aspect-ratio: 16/9;' loading='lazy'></iframe>.",
                fa: "جاسازی: <iframe src='…' title='…' style='width: 100%; aspect-ratio: 16/9;' loading='lazy'></iframe>.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "h1", text: "studio" },
                { selector: "video[autoplay][muted][loop]", count: 1 },
                { selector: "figure audio[controls]", count: 1 },
                { selector: "figure figcaption", count: 1 },
                { selector: "iframe[title][loading='lazy']", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── Module 18 ───────────────────────────────────────────
  {
    id: "html-m18",
    title: { en: "Pro Polish", fa: "صیقل‌کاریِ نهایی" },
    blurb: {
      en: "The ship-day audit: click-worthy meta, the complete Open Graph card, favicons and the accessibility sweep — then one final page that passes everything.",
      fa: "ممیزیِ روزِ انتشار: متای کلیک‌خور، کارتِ کاملِ اوپن‌گراف، فاوآیکون و گشتِ دسترس‌پذیری — و بعد، صفحه‌ای نهایی که همه‌چیز را پاس می‌شود.",
    },
    lessons: [
      {
        id: "html-m18-l1",
        title: { en: "Meta that earns the click", fa: "متایی که کلیک می‌گیرد" },
        goal: {
          en: "Write a unique title and a meta description that sell the page in Google's results.",
          fa: "یک title یکتا و یک meta description بنویسی که در نتایجِ گوگل صفحه‌ات را بفروشد.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            title: { en: "The search result is your ad", fa: "نتیجه‌ی جست‌وجو، آگهیِ توست" },
            blocks: [
              {
                type: "text",
                en: "Module 15's audit checked that `title` and `meta[name='description']` EXIST. Today: make them SELL. In the results page your title becomes the blue link and the description becomes the snippet under it — the only two lines convincing a stranger to click. Nobody sees your page in a vacuum; they see it in a list of ten blue links.",
                fa: "ممیزیِ ماژول ۱۵ فقط چک کرد که `title` و `meta[name='description']` «وجود» دارند. امروز کاری می‌کنیم «بفروشند». در صفحه‌ی نتایج، title تو می‌شود لینکِ آبی و description می‌شود توضیحِ زیرش — تنها دو خطی که یک غریبه را قانعِ کلیک می‌کند. هیچ‌کس صفحه‌ات را در خلأ نمی‌بیند؛ آن را در لیستی از ده لینکِ آبی می‌بیند.",
              },
              {
                type: "text",
                en: "The title formula pros use: main keyword FIRST, the page's job second, brand last — 'Espresso Machines, Reviewed Weekly — Teka Coffee'. Keep it under ~60 characters (Google cuts longer ones with …), make it unique per page, and never bait: the title must be true of the page.",
                fa: "فرمولِ title: کلمه‌ی کلیدیِ اصلی «اول»، کارِ صفحه دوم، برند آخر — 'Espresso Machines, Reviewed Weekly — Teka Coffee'. زیرِ حدودِ ۶۰ کاراکتر نگه‌اش دار (گوگل از آن طولانی‌ترش را با … می‌بُرد)، برای هر صفحه یکتایش کن و هیچ‌وقت طعمه‌گذاری نکن: title باید راست‌گویِ صفحه باشد.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cedar &amp; Ember Roastery — Small-Batch Coffee in Tehran</title>
    <meta name="description" content="Small-batch coffee roasted every Thursday. Single-origin beans, honest cupping notes, same-day delivery across Tehran.">
  </head>
  <body>
    <h1>Cedar &amp; Ember Roastery ☕</h1>
    <p>Every cup starts at 6 a.m. — and every batch is 12 kilos or less.</p>
  </body>
</html>`,
                caption: {
                  en: "Title = the blue link; description = the snippet under it. Two lines, one click.",
                  fa: "‏title همان لینکِ آبی است؛ description همان توضیحِ زیرش. دو خط، یک کلیک.",
                },
              },
              {
                type: "tip",
                en: "charset and viewport stay on every page — they are the frame, not the paint. The CRAFT lives in title and description.",
                fa: "‏charset و viewport در هر صفحه سرِ جایشان می‌مانند — این‌ها قاب‌اند، نه رنگ. هنرِ اصلی در title و description است.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The 155-character sales pitch", fa: "پیشنهادِ فروش در ۱۵۵ کاراکتر" },
            blocks: [
              {
                type: "text",
                en: "The meta description has one job: win the click. Around 155 characters, one active verb, one concrete benefit, one hook: 'Small-batch coffee roasted every Thursday… same-day delivery across Tehran.' It is an AD, not a keyword warehouse — Google already bolds the matched words for free.",
                fa: "‏meta description یک شغل دارد: گرفتنِ کلیک. حدودِ ۱۵۵ کاراکتر، یک فعلِ فعال، یک سودِ مشخص، یک قلاب: 'Small-batch coffee roasted every Thursday… same-day delivery across Tehran.' این یک آگهی است، نه انبارِ کلمه‌ی کلیدی — گوگل خودش کلماتِ منطبق را مجانی بولد می‌کند.",
              },
              {
                type: "warn",
                en: "Three description sins: copying it from another page (Google may write its own), stuffing it with keywords (reads like spam, earns no clicks), and describing what the page ISN'T (visitors bounce, rankings sink).",
                fa: "سه گناهِ description: کپی‌کردنش از صفحه‌ای دیگر (گوگل ممکن است خودش بنویسدش)، پُرکردنش از کلمه‌ی کلیدی (شبیهِ اسپم می‌شود و کلیک نمی‌گیرد) و توصیفِ چیزی که صفحه نیست (بازدیدکننده فرار می‌کند و رتبه پایین می‌آید).",
              },
              {
                type: "text",
                en: "One head, one page, one promise: if two pages share a title, Google treats them as twins and picks its favorite — often neither. Unique titles are the cheapest SEO you will ever do.",
                fa: "یک head، یک صفحه، یک قول: اگر دو صفحه title مشترک داشته باشند، گوگل آن‌ها را دوقلو می‌بیند و محبوب‌ترش را انتخاب می‌کند — که اغلب هیچ‌کدام نیستی. titleهای یکتا، ارزان‌ترین سئویی است که در عمرت انجام می‌دهی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "A strong title tag is…", fa: "یک title قوی … است." },
                options: [
                  { en: "the same on every page, for brand consistency", fa: "در همه‌ی صفحه‌ها یکی، برای هماهنگیِ برند" },
                  { en: "unique per page, ~60 characters, keyword near the start", fa: "برای هر صفحه یکتا، حدودِ ۶۰ کاراکتر، با کلمه‌ی کلیدی در ابتدای آن" },
                  { en: "a long list of keywords separated by commas", fa: "یک لیستِ بلند از کلماتِ کلیدی که با ویرگول جدا شده‌اند" },
                ],
                answer: 1,
                explain: {
                  en: "Unique, short, keyword-first, honest. Everything else is noise Google will trim.",
                  fa: "یکتا، کوتاه، کلیدی‌محور و صادق. بقیه‌اش سر‌وصداست و گوگل می‌بُردش.",
                },
              },
              {
                q: { en: "The meta description's real job is…", fa: "شغلِ واقعیِ meta description این است که…" },
                options: [
                  { en: "secretly boost the ranking with keywords", fa: "به‌طورِ مخفیانه با کلمه‌ی کلیدی رتبه را بالا ببرد" },
                  { en: "act as the ad copy under your link in the results", fa: "آگهیِ زیرِ لینکت در صفحه‌ی نتایج باشد" },
                  { en: "replace the page's h1", fa: "جای h1 صفحه را بگیرد" },
                ],
                answer: 1,
                explain: {
                  en: "It is the snippet — the lines that convince a human to click. Write it for people; Google bolds matched words for free.",
                  fa: "همان توضیحِ زیرِ لینک است — خط‌هایی که یک آدم را قانعِ کلیک می‌کنند. برای آدم‌ها بنویس؛ گوگل کلماتِ منطبق را مجانی بولد می‌کند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The roastery head ☕", fa: "headِ رستوری ☕" },
            brief: {
              en: "Complete the roastery's head: keep `meta charset`, add `meta name='viewport'`, write a `<title>` that CONTAINS the word Roastery (unique, honest, ~60 chars), and add `meta name='description'` with your own one-sentence pitch.",
              fa: "headِ رستوری را کامل کن: `meta charset` را نگه دار، ‏`meta name='viewport'` اضافه کن، یک `<title>` بنویس که کلمه‌ی Roastery را داشته باشد (یکتا و صادق و حدودِ ۶۰ کاراکتر) و یک `meta name='description'` با پیشنهادِ یک‌جمله‌ایِ خودت اضافه کن.",
            },
            starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>?</title>
        <!-- TODO 1) title: unique + honest + contains "Roastery" -->
        <!-- TODO 2) meta name="description" — one honest sentence -->
        <!-- TODO 3) meta name="viewport" -->
    </head>
    <body>
        <h1>Cedar &amp; Ember Roastery ☕</h1>
        <p>Small-batch coffee, roasted every Thursday in Tehran.</p>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cedar &amp; Ember Roastery — Small-Batch Coffee</title>
        <meta name="description" content="Small-batch coffee roasted every Thursday. Single-origin beans, honest cupping notes, same-day delivery across Tehran.">
    </head>
    <body>
        <h1>Cedar &amp; Ember Roastery ☕</h1>
        <p>Small-batch coffee, roasted every Thursday in Tehran.</p>
    </body>
</html>`,
            hints: [
              {
                en: "The viewport line: <meta name='viewport' content='width=device-width, initial-scale=1'>.",
                fa: "خطِ viewport: <meta name='viewport' content='width=device-width, initial-scale=1'>.",
              },
              {
                en: "Title shape: <title>Cedar &amp; Ember Roastery — Small-Batch Coffee</title>.",
                fa: "شکلِ title: <title>Cedar &amp; Ember Roastery — Small-Batch Coffee</title>.",
              },
              {
                en: "Description shape: <meta name='description' content='…one honest sentence…'>.",
                fa: "شکلِ description: <meta name='description' content='…یک جمله‌ی صادق…'>.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "meta[charset]", count: 1 },
                { selector: "meta[name='viewport']", count: 1 },
                { selector: "title", count: 1, text: "roastery" },
                { selector: "meta[name='description']", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "html-m18-l2",
        title: { en: "Open Graph: leave nothing out", fa: "اوپن‌گراف: هیچ‌چیز جا نمانَد" },
        goal: {
          en: "Complete the share card with the four tags most pages forget: og:url, og:site_name, og:description and og:image:alt.",
          fa: "کارتِ اشتراک را با چهار تگی که بیشترِ صفحه‌ها فراموش می‌کنند کامل کنی: ‏og:url و og:site_name و og:description و og:image:alt.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "The four forgotten tags", fa: "چهار تگِ فراموش‌شده" },
            blocks: [
              {
                type: "text",
                en: "Module 15 built your first card: `og:title`, `og:image`, `og:type`. Today, the finishing kit — the four tags most pages forget. `og:url`: the page's canonical address, so shares count for ONE address even if the page has several. `og:site_name`: your brand's name, printed above the card's title.",
                fa: "ماژول ۱۵ اولین کارتت را ساخت: `og:title` و `og:image` و `og:type`. امروز کیتِ آخر — چهار تگی که بیشترِ صفحه‌ها فراموششان می‌کنند. ‏`og:url`: نشانیِ اصلیِ صفحه، تا اشتراک‌ها برای «یک» آدرس ثبت شوند حتی اگر صفحه چند نشانی دارد. ‏`og:site_name`: نامِ برندت که بالای عنوانِ کارت چاپ می‌شود.",
              },
              {
                type: "text",
                en: "`og:description`: the card's own caption — it may differ from the meta description, because here you are selling a LINK, not a search result. And `og:image:alt`: what screen readers say when they meet the card's image — the share card gets accessibility too.",
                fa: "‏`og:description`: کپشنِ خودِ کارت — می‌تواند با meta description فرق داشته باشد؛ چون اینجا یک «لینک» را می‌فروشی، نه یک نتیجه‌ی جست‌وجو. و `og:image:alt`: چیزی که صفحه‌خوان‌ها وقتی به تصویرِ کارت می‌رسند می‌گویند — کارتِ اشتراک هم دسترس‌پذیری می‌خواهد.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>The day flexbox clicked — Teka Blog</title>
    <meta property="og:title" content="The day flexbox clicked">
    <meta property="og:description" content="Five years of float bugs, erased by four lines of CSS. A flexbox origin story.">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://teka.example/blog/flexbox-clicked">
    <meta property="og:site_name" content="Teka Blog">
    <meta property="og:image" content="https://teka.example/img/flex-hero.png">
    <meta property="og:image:alt" content="A bent row of boxes snapping into a perfect straight line">
  </head>
  <body>
    <h1>The day flexbox clicked</h1>
    <p>It took one broken navbar and four lines of CSS.</p>
  </body>
</html>`,
                caption: {
                  en: "A card with nothing missing — title, caption, address, brand, image, and the image's voice",
                  fa: "کارتی که هیچ‌چیزش کم نیست — عنوان و کپشن و نشانی و برند و تصویر و صدای تصویر",
                },
              },
              {
                type: "warn",
                en: "og:url and og:image want ABSOLUTE addresses — protocol, domain, path. Sharing bots do not resolve relative paths; 'img/flex-hero.png' becomes a broken card on every chat app.",
                fa: "‏og:url و og:image نشانیِ «مطلق» می‌خواهند — پروتکل و دامنه و مسیر. ربات‌های اشتراک مسیرِ نسبی را حل نمی‌کنند؛ 'img/flex-hero.png' در همه‌ی چت‌ها یک کارتِ خراب می‌شود.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "article, locale and the rest", fa: "article و locale و بقیه‌ی ماجرا" },
            blocks: [
              {
                type: "text",
                en: "og:type has a dialect beyond `website`: `article` marks blog posts and news — chat apps even show author and publish date alongside it when you add `article:published_time`. And `og:locale='fa_IR'` (or `en_US`) tells the card which language and date format to use.",
                fa: "‏og:type فراتر از `website` یک گویش دارد: `article` یعنی پستِ بلاگ و خبر — و چت‌ها وقتی `article:published_time` هم بگذاری، نویسنده و تاریخِ انتشار را کنار کارت نشان می‌دهند. و `og:locale='fa_IR'` (یا `en_US`) به کارت می‌گوید زبان و قالبِ تاریخش چه باشد.",
              },
              {
                type: "tip",
                en: "Test before you ship: paste the URL into the platform's sharing debugger (Facebook, LinkedIn, X all have one). The card renders there exactly as strangers will see it — broken images show up before your followers do.",
                fa: "قبل از انتشار تست کن: URL را در ابزارِ اشکال‌زداییِ اشتراکِ همان پلتفرم بچسبان (فیسبوک و لینکدین و X هرکدام یکی دارند). کارت همان‌جا دقیقاً مثل دیدِ غریبه‌ها رندر می‌شود — تصویرِ خراب، قبل از فالوورها خودش را نشان می‌دهد.",
              },
              {
                type: "text",
                en: "Order in the head does not matter — the bots read tags, not sequences. Presence, correctness and absolute addresses are the whole game.",
                fa: "ترتیب در head مهم نیست — ربات‌ها تگ می‌خوانند، نه ترتیب. بودن، درست‌بودن و مطلق‌بودنِ نشانی‌ها، کلِ بازی است.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why does og:image:alt exist?", fa: "‏og:image:alt چرا وجود دارد؟" },
                options: [
                  { en: "It ranks the image in Google Images", fa: "تصویر را در گوگل‌ایمج رتبه می‌دهد" },
                  { en: "Screen readers announce the card's image with it", fa: "صفحه‌خوان‌ها با آن تصویرِ کارت را اعلام می‌کنند" },
                  { en: "It compresses the image for slow networks", fa: "تصویر را برای شبکه‌های کند فشرده می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Share cards are pages too — their images speak through og:image:alt.",
                  fa: "کارتِ اشتراک هم یک صفحه است — تصویرش با og:image:alt حرف می‌زند.",
                },
              },
              {
                q: { en: "og:url should be…", fa: "‏og:url باید … باشد." },
                options: [
                  { en: "a short link like bit.ly/xyz", fa: "یک لینکِ کوتاه مثل bit.ly/xyz" },
                  { en: "the page's absolute, canonical address", fa: "نشانیِ مطلق و اصلیِ صفحه" },
                  { en: "the image's path", fa: "مسیرِ تصویر" },
                ],
                answer: 1,
                explain: {
                  en: "Absolute + canonical: all shares of all variants count for the one true address.",
                  fa: "مطلق و اصلی: همه‌ی اشتراکِ همه‌ی نسخه‌ها به حسابِ همان «یک» نشانیِ راستین ثبت می‌شود.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The complete blog card ✨", fa: "کارتِ کاملِ بلاگ ✨" },
            brief: {
              en: "Finish the post's head: keep the existing `og:title` + `og:image`, then add `og:type` with content `article`, `og:url` with content `https://teka.example/blog/flexbox-clicked`, plus `og:site_name`, `og:description` and `og:image:alt` (any honest values).",
              fa: "headِ پست را تمام کن: `og:title` و `og:image` موجود را نگه دار، بعد `og:type` با content برابرِ `article` و `og:url` با content برابرِ `https://teka.example/blog/flexbox-clicked` را اضافه کن؛ به‌علاوه ‏`og:site_name` و `og:description` و `og:image:alt` (مقادیر صادقانه، با تو).",
            },
            starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>The day flexbox clicked — Teka Blog</title>
        <meta property="og:title" content="The day flexbox clicked">
        <meta property="og:image" content="https://teka.example/img/flex-hero.png">
        <!-- TODO 1) og:type = article -->
        <!-- TODO 2) og:url = https://teka.example/blog/flexbox-clicked -->
        <!-- TODO 3) og:site_name + og:description + og:image:alt -->
    </head>
    <body>
        <h1>The day flexbox clicked</h1>
        <p>It took one broken navbar and four lines of CSS.</p>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>The day flexbox clicked — Teka Blog</title>
        <meta property="og:title" content="The day flexbox clicked">
        <meta property="og:description" content="Five years of float bugs, erased by four lines of CSS. A flexbox origin story.">
        <meta property="og:type" content="article">
        <meta property="og:url" content="https://teka.example/blog/flexbox-clicked">
        <meta property="og:site_name" content="Teka Blog">
        <meta property="og:image" content="https://teka.example/img/flex-hero.png">
        <meta property="og:image:alt" content="A bent row of boxes snapping into a perfect straight line">
    </head>
    <body>
        <h1>The day flexbox clicked</h1>
        <p>It took one broken navbar and four lines of CSS.</p>
    </body>
</html>`,
            hints: [
              {
                en: "Article: <meta property='og:type' content='article'>.",
                fa: "مقاله: <meta property='og:type' content='article'>.",
              },
              {
                en: "Address: <meta property='og:url' content='https://teka.example/blog/flexbox-clicked'> — copy it exactly.",
                fa: "نشانی: <meta property='og:url' content='https://teka.example/blog/flexbox-clicked'> — دقیقاً همین را کپی کن.",
              },
              {
                en: "Three more: site_name (brand), description (card caption), image:alt (words for the image).",
                fa: "سه‌تای دیگر: site_name (برند) و description (کپشنِ کارت) و image:alt (کلماتِ تصویر).",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "meta[property='og:type']", count: 1, attrName: "content", attrValue: "article" },
                { selector: "meta[property='og:url']", count: 1, attrName: "content", attrValue: "https://teka.example/blog/flexbox-clicked" },
                { selector: "meta[property='og:site_name']", count: 1 },
                { selector: "meta[property='og:description']", count: 1 },
                { selector: "meta[property='og:image:alt']", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "html-m18-l3",
        title: { en: "Favicon & the accessibility sweep", fa: "فاوآیکون و گشتِ دسترس‌پذیری" },
        goal: {
          en: "Add the full icon set and run the five-point accessibility sweep every page needs before launch.",
          fa: "مجموعه‌ی کاملِ آیکون‌ها را اضافه کنی و گشتِ پنج‌نقطه‌ایِ دسترس‌پذیری را قبل از انتشار اجرا کنی.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            title: { en: "The icon set, complete", fa: "مجموعه‌ی آیکون، کامل" },
            blocks: [
              {
                type: "text",
                en: "Module 15 dropped one line: `link rel='icon'`. The complete set has two rooms. For browser tabs and bookmarks: `<link rel='icon' href='favicon.svg' type='image/svg+xml'>` — SVG stays crisp at every size and weighs mere kilobytes. For the iOS home screen: `<link rel='apple-touch-icon' href='apple-touch-icon.png'>` — when someone saves your page there, that icon becomes the app tile.",
                fa: "ماژول ۱۵ فقط یک خط گذاشت: `link rel='icon'`. مجموعه‌ی کامل دو اتاق دارد. برای تبِ مرورگر و بوکمارک‌ها: `<link rel='icon' href='favicon.svg' type='image/svg+xml'>` — ‏SVG در هر اندازه‌ای تیز می‌ماند و فقط چند کیلوبایت است. برای صفحه‌ی اصلیِ iOS: `<link rel='apple-touch-icon' href='apple-touch-icon.png'>` — وقتی کسی صفحه‌ات را آنجا ذخیره کند، این آیکون می‌شود آیکونِ اپ.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tea Notes</title>
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
  </head>
  <body>
    <h1>Tea Notes 🍵</h1>
    <p>Steep times, water temperatures, honest opinions.</p>
  </body>
</html>`,
                caption: {
                  en: "Two links in the head — one for the tab, one for the home screen",
                  fa: "دو لینک در head — یکی برای تب، یکی برای صفحه‌ی اصلی",
                },
              },
              {
                type: "tip",
                en: "The type attribute is optional — browsers sniff the file. But writing type='image/svg+xml' documents your intent and skips the guess. PNG fallback? Add a second link rel='icon' — in most browsers the last one wins.",
                fa: "ویژگیِ type اختیاری است — مرورگر خودش فایل را بو می‌کشد. ولی نوشتنِ type='image/svg+xml' نیتت را مستند می‌کند و حدس‌زدن را حذف می‌کند. جایگزینِ PNG؟ یک لینکِ دومِ rel='icon' اضافه کن — در بیشترِ مرورگرها آخری می‌برد.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The five-point sweep", fa: "گشتِ پنج‌نقطه‌ای" },
            blocks: [
              {
                type: "text",
                en: "Module 16 taught the pieces; a launch day needs the SWEEP — five checks, five minutes. One: `<html lang='en'>` — screen readers pick the right voice. Two: every `img` carries an honest `alt` (empty is honest for decoration). Three: every input has a `<label for>`. Four: every `iframe` has a `title`. Five: headings climb without skipping floors.",
                fa: "ماژول ۱۶ قطعه‌ها را یاد داد؛ روزِ انتشار «گشت» می‌خواهد — پنج چک، پنج دقیقه. یک: `<html lang='en'>` — صفحه‌خوان صدای درست را انتخاب می‌کند. دو: هر `img` یک alt صادق دارد (برای تزئین، خالی‌اش صادق است). سه: هر input یک `<label for>` دارد. چهار: هر iframe یک `title`. پنج: تیترها بدونِ ردکردنِ پله‌ها بالا می‌روند.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Tea Notes — subscribe</title>
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
  </head>
  <body>
    <h1>Tea Notes 🍵</h1>
    <h2>This week's steep</h2>
    <img src="teapot.png" alt="A clay teapot steaming on a wooden tray">
    <form>
      <label for="email">Email</label>
      <input id="email" type="email">
      <button>Subscribe</button>
    </form>
    <iframe src="https://example.com/map" title="Map to the tea house" loading="lazy"></iframe>
  </body>
</html>`,
                caption: {
                  en: "Five for five: lang, alt, label, frame title, honest heading order",
                  fa: "پنج‌تا از پنج: ‏lang و alt و label و title فریم و ترتیبِ صادقانه‌ی تیترها",
                },
              },
              {
                type: "warn",
                en: "The sweep is a floor, not a ceiling: it catches the mechanical misses, not the confusing words or the impossible flows. But skip it and you fail the visitors who needed it most — before they ever read a word.",
                fa: "گشت، کف است نه سقف: خطاهای مکانیکی را می‌گیرد، نه جمله‌های گیج‌کننده و مسیرهای ناممکن را. ولی اگر انجامش ندهی، اول از همه آن بازدیدکننده‌هایی را از دست می‌دهی که بیشترین نیاز را داشتند — قبل از آنکه حتی یک کلمه بخوانند.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is rel='apple-touch-icon' for?", fa: "‏rel='apple-touch-icon' برای چیست؟" },
                options: [
                  { en: "It is Safari's private favicon", fa: "فاوآیکونِ خصوصیِ سافاری است" },
                  { en: "The icon used when your page is saved to an iOS home screen", fa: "آیکونی که وقتی صفحه‌ات روی صفحه‌ی اصلیِ iOS ذخیره شود استفاده می‌شود" },
                  { en: "It speeds up the favicon load", fa: "بارگذاریِ فاوآیکون را سریع می‌کند" },
                ],
                answer: 1,
                explain: {
                  en: "Save-to-home-screen turns your page into a tile — this link provides the tile's face.",
                  fa: "ذخیره روی صفحه‌ی اصلی، صفحه‌ات را به یک آیکون تبدیل می‌کند — این لینک چهره‌ی آن آیکون را می‌دهد.",
                },
              },
              {
                q: { en: "Why lang='en' on the <html> tag?", fa: "چرا lang='en' روی تگِ <html>؟" },
                options: [
                  { en: "It translates the page automatically", fa: "صفحه را خودکار ترجمه می‌کند" },
                  { en: "Screen readers choose the correct pronunciation and voice", fa: "صفحه‌خوان‌ها تلفظ و صدای درست را انتخاب می‌کنند" },
                  { en: "It is required for CSS to work", fa: "برای کار کردنِ CSS الزامی است" },
                ],
                answer: 1,
                explain: {
                  en: "The page's language is the first thing a screen reader asks for — declare it once, at the top.",
                  fa: "زبانِ صفحه اولین چیزی است که صفحه‌خوان می‌پرسد — یک بار، در بالاترین نقطه اعلامش کن.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The clean pass 🧼", fa: "پاسِ تمیز 🧼" },
            brief: {
              en: "One small page, fully swept: add `lang='en'` to the `<html>` tag; in the head add `link rel='icon'` AND `link rel='apple-touch-icon'`; in the body give the `img` an honest `alt` and wire the email input with `<label for='email'>` + `id='email'`.",
              fa: "یک صفحه‌ی کوچک، کاملاً جاروشده: به تگِ `<html>` مقدارِ `lang='en'` بده؛ در head هم `link rel='icon'` اضافه کن هم `link rel='apple-touch-icon'`؛ در body به `img` یک `alt` صادق بده و ورودیِ ایمیل را با `<label for='email'>` و `id='email'` سیم‌کشی کن.",
            },
            starter: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Tea Notes</title>
        <!-- TODO 1) the html tag needs lang="en" -->
        <!-- TODO 2) link rel="icon" + link rel="apple-touch-icon" -->
    </head>
    <body>
        <h1>Tea Notes 🍵</h1>
        <!-- TODO 3) img needs an honest alt -->
        <img src="teapot.png" width="320">
        <!-- TODO 4) label for="email" + input id="email" -->
        <input type="email" placeholder="you@example.com">
        <button>Subscribe</button>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Tea Notes</title>
        <link rel="icon" href="favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
    </head>
    <body>
        <h1>Tea Notes 🍵</h1>
        <img src="teapot.png" alt="A clay teapot steaming on a wooden tray" width="320">
        <form>
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com">
            <button>Subscribe</button>
        </form>
    </body>
</html>`,
            hints: [
              {
                en: "Icons: <link rel='icon' href='favicon.svg' type='image/svg+xml'> and <link rel='apple-touch-icon' href='apple-touch-icon.png'>.",
                fa: "آیکون‌ها: <link rel='icon' href='favicon.svg' type='image/svg+xml'> و <link rel='apple-touch-icon' href='apple-touch-icon.png'>.",
              },
              {
                en: "Language: <html lang='en'> — one word on the topmost tag.",
                fa: "زبان: <html lang='en'> — یک کلمه روی بالاترین تگ.",
              },
              {
                en: "Wiring: <label for='email'>Email</label> + <input id='email' type='email'>.",
                fa: "سیم‌کشی: <label for='email'>Email</label> + <input id='email' type='email'>.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "html", attrName: "lang", attrValue: "en" },
                { selector: "link[rel='icon']", count: 1 },
                { selector: "link[rel='apple-touch-icon']", count: 1 },
                { selector: "img[alt]", count: 1 },
                { selector: "label[for='email']", count: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "html-m18-l4",
        title: { en: "The final audit 🏁", fa: "ممیزیِ نهایی 🏁" },
        goal: {
          en: "Run the full ship-day audit on one page — head, share card, media, accessibility — and graduate HTML.",
          fa: "ممیزیِ کاملِ روزِ انتشار را روی یک صفحه اجرا کنی — head و کارتِ اشتراک و رسانه و دسترس‌پذیری — و HTML را تمام کنی.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            title: { en: "The whole course on one checklist", fa: "کلِ دوره در یک چک‌لیست" },
            blocks: [
              {
                type: "text",
                en: "Eighteen modules compressed to ten lines. HEAD: charset, viewport, unique title, honest description, favicon, og:title + og:image. BODY: one h1, landmarks (header/main/footer), media with controls and captions, images with alt, inputs with labels, links that say where they go.",
                fa: "هجده ماژول، جمع‌شده در ده خط. HEAD: ‏charset و viewport و title یکتا و description صادقانه و favicon و og:title + og:image. BODY: یک h1 و نشانه‌های جایگاه (header و main و footer) و رسانه با controls و کپشن و تصویر با alt و ورودی با label و لینکی که می‌گوید به کجا می‌رود.",
              },
              {
                type: "code",
                lang: "html",
                code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aria's Portfolio — Frontend Developer</title>
    <meta name="description" content="Selected web projects by Aria, 2024–2025. Fast, accessible, hand-built.">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <meta property="og:title" content="Aria's Portfolio">
    <meta property="og:image" content="https://teka.example/img/portfolio-card.png">
  </head>
  <body>
    <main>
      <h1>Aria's Portfolio</h1>
      <img src="aria-desk.png" alt="Aria's desk: laptop, sketchbook, two plants" width="480" loading="lazy">
      <video controls preload="metadata" width="480" poster="showreel-cover.png">
        <source src="showreel.webm" type="video/webm">
      </video>
      <p><a href="mailto:aria@teka.example">Email me about your project</a></p>
    </main>
  </body>
</html>`,
                caption: {
                  en: "The model answer — every line from the checklist, nothing else",
                  fa: "پاسخِ نمونه — هر خط از چک‌لیست، هیچ‌چیزِ اضافه",
                },
              },
              {
                type: "tip",
                en: "Auditing order matters: head first (machines read it before humans see anything), then the body sweep (Tab, alts, labels). Fix the head and half the errors die there — the sweeps get quieter.",
                fa: "ترتیبِ ممیزی مهم است: اول head (ربات‌ها زودتر از چشمِ آدم آن را می‌خوانند)، بعد گشتِ بدنه (Tab و altها و labelها). head را درست کنی، نیمی از خطاها همان‌جا می‌میرند و گشت‌ها آرام‌تر می‌شوند.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Keep shipping", fa: "به فرستادن ادامه بده" },
            blocks: [
              {
                type: "text",
                en: "You started with `<h1>Hello, world!</h1>` and ended able to build a page that machines can rank, readers can skim, and screen readers can navigate. That is not 'HTML basics' anymore — that is the front door of the web, built by you.",
                fa: "با `<h1>Hello, world!</h1>` شروع کردی و حالا می‌توانی صفحه‌ای بسازی که ماشین‌ها بتوانند رتبه‌اش بدهند، خواننده‌ها تندخوانی‌اش کنند و صفحه‌خوان‌ها در آن راه بروند. دیگر این «مبانیِ HTML» نیست — این درِ ورودیِ وب است که خودت ساختی‌اش.",
              },
              {
                type: "tip",
                en: "Next time you visit a site you admire, open View Source. You will now recognize the head, the landmarks, the alt texts, the OG tags — reading real code is the fastest course there is, and it never ends.",
                fa: "دفعه‌ی بعد که به سایتی رفت که دوستش داری، View Source را باز کن. حالا head و نشانه‌های جایگاه و altها و تگ‌های OG را می‌شناسی — خواندنِ کدِ واقعی سریع‌ترین دوره‌ی دنیاست و هیچ‌وقت تمام نمی‌شود.",
              },
              {
                type: "text",
                en: "Where to walk next: CSS courses for the beauty layer, JavaScript for the behavior layer. Your HTML now carries semantics machines and humans both understand — that foundation is the rare part. Keep it clean.",
                fa: "قدمِ بعدی: دوره‌های CSS برای لایه‌ی زیبایی و جاوااسکریپت برای لایه‌ی رفتار. ‏HTML تو حالا معنایی‌ای دارد که هم ماشین می‌فهمد هم آدم — همین پایه، همان چیزِ کمیاب است. تمیز نگه‌اش دار.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Which head items are non-negotiable on EVERY page?", fa: "کدام آیتم‌های head روی «هر» صفحه غیرقابل‌چشم‌پوشی‌اند؟" },
                options: [
                  { en: "og:image and theme-color", fa: "‏og:image و theme-color" },
                  { en: "charset, viewport and a unique title", fa: "‏charset و viewport و یک title یکتا" },
                  { en: "apple-touch-icon and canonical", fa: "‏apple-touch-icon و canonical" },
                ],
                answer: 1,
                explain: {
                  en: "charset + viewport + title = the frame of every page. OG, favicons and canonical add reach and polish.",
                  fa: "‏charset و viewport و title قابِ هر صفحه‌اند. ‏OG و favicon و canonical هم دسترسی و صیقل اضافه می‌کنند.",
                },
              },
              {
                q: { en: "The audit's first target is the head because…", fa: "نخستین هدفِ ممیزی head است چون…" },
                options: [
                  { en: "it is at the top of the file", fa: "در بالای فایل است" },
                  { en: "machines — bots and screen readers — read it before anything renders", fa: "ماشین‌ها — ربات‌ها و صفحه‌خوان‌ها — قبل از رندرِ هر چیزی آن را می‌خوانند" },
                  { en: "it holds all the CSS", fa: "همه‌ی CSS آنجاست" },
                ],
                answer: 1,
                explain: {
                  en: "Fix the head first: metadata errors poison rankings and announcements before a human sees a pixel.",
                  fa: "اول head را درست کن: خطاهای فراداده، پیش از آنکه آدمی یک پیکسل ببیند، رتبه و اعلام‌ها را مسموم می‌کنند.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Graduation page 🎓", fa: "صفحه‌ی فارغ‌التحصیلی 🎓" },
            brief: {
              en: "Build the page that passes everything: a `<title>` containing the word Portfolio; `meta name='description'`; `link rel='icon'`; `og:title` + `og:image`; and a `<main>` holding an `<h1>`, an `<img>` with an honest `alt`, and a `<video controls>`.",
              fa: "صفحه‌ای بساز که همه‌چیز را پاس شود: یک `<title>` که کلمه‌ی Portfolio را دارد؛ ‏`meta name='description'`؛ ‏`link rel='icon'`؛ ‏`og:title` + `og:image`؛ و یک `<main>` که `<h1>` و یک `<img>` با `alt` صادق و یک `<video controls>` دارد.",
            },
            starter: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>?</title>
        <!-- TODO 1) title contains "Portfolio" -->
        <!-- TODO 2) meta name="description" -->
        <!-- TODO 3) link rel="icon" -->
        <!-- TODO 4) og:title + og:image -->
    </head>
    <body>
        <!-- TODO 5) <main> with h1 + img (with alt) + video (with controls) -->
        <p>Selected work, 2024–2025.</p>
    </body>
</html>`,
            solution: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Aria's Portfolio — Frontend Developer</title>
        <meta name="description" content="Selected web projects by Aria, 2024–2025. Fast, accessible, hand-built.">
        <link rel="icon" href="favicon.svg" type="image/svg+xml">
        <meta property="og:title" content="Aria's Portfolio">
        <meta property="og:image" content="https://teka.example/img/portfolio-card.png">
    </head>
    <body>
        <main>
            <h1>Aria's Portfolio</h1>
            <img src="aria-desk.png" alt="Aria's desk: laptop, sketchbook, two plants" width="480" loading="lazy">
            <video controls preload="metadata" width="480" poster="showreel-cover.png">
                <source src="showreel.webm" type="video/webm">
                Your browser does not support embedded video.
            </video>
            <p>Selected work, 2024–2025.</p>
        </main>
    </body>
</html>`,
            hints: [
              {
                en: "Head line by line: description, then <link rel='icon' href='favicon.svg'>, then the two og metas.",
                fa: "head را خط‌به‌خط: اول description، بعد <link rel='icon' href='favicon.svg'>، بعد دو متای og.",
              },
              {
                en: "The body: <main> <h1>…</h1> <img src='…' alt='…'> <video controls>…</video> </main>.",
                fa: "بدنه: <main> <h1>…</h1> <img src='…' alt='…'> <video controls>…</video> </main>.",
              },
              {
                en: "Checklist: title Portfolio ✓, description ✓, icon ✓, og:image ✓, main img[alt] ✓ — five for five.",
                fa: "چک‌لیست: title با Portfolio ✓ و description ✓ و icon ✓ و og:image ✓ و main img[alt] ✓ — پنج‌تا از پنج.",
              },
            ],
            check: {
              kind: "html",
              checks: [
                { selector: "title", count: 1, text: "portfolio" },
                { selector: "meta[name='description']", count: 1 },
                { selector: "link[rel='icon']", count: 1 },
                { selector: "meta[property='og:image']", count: 1 },
                { selector: "main img[alt]", count: 1 },
              ],
            },
          },
        ],
      },
    ],
  },
];
