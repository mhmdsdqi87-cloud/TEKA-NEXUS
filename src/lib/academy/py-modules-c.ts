// TEKA NEXUS — TEKA Academy · Python course extension (modules 14–16).
// Every runnable sample and every challenge test is guaranteed to run in the
// bundled pylite interpreter (see src/lib/academy/pylite.ts). All graded
// outputs are deterministic — no randomness in any test path.

import type { Module } from "./types";

export const pyModulesC: Module[] = [
  {
    id: "py-m14",
    title: { en: "Programs that Decide", fa: "برنامه‌هایی که تصمیم می‌گیرن" },
    blurb: {
      en: "Ladders, lookup tables and real rules — teach your code to choose like a pro.",
      fa: "نردبان شرط‌ها، جدول‌های تصمیم و قانون‌های واقعی — به کدت یاد بده مثل حرفه‌ای‌ها انتخاب کنه.",
    },
    lessons: [
      {
        id: "py-m14-l1",
        title: { en: "The elif Ladder, Mastered", fa: "نردبان elif مثل حرفه‌ای‌ها" },
        goal: {
          en: "Order elif branches from narrow to wide so every case lands in the right bucket.",
          fa: "شاخه‌های elif رو از باریک به پهن مرتب کن تا هر حالت سر جای درستش بیفته.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Python reads an if/elif ladder from the TOP and runs the FIRST branch whose condition is true — everything after it is skipped. That's why order is everything: the narrowest check goes first, the widest last.",
                fa: "پایتون نردبان if و elif رو از «بالا» می‌خونه و اولین شاخه‌ای که شرطش درسته رو اجرا می‌کنه — بقیه رد می‌شن. برای همینه که ترتیب همه‌چیزه: باریک‌ترین و سخت‌گیرترین شرط اول، پهن‌ترین آخر.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `age = 8
if age < 18:
    print("Teen ticket")
elif age < 12:
    print("Half price")`,
                caption: { en: "Bug: 8 < 18 catches it first — the elif below never even runs.", fa: "باگ:‏ 8 < 18 زودتر می‌گیردش — elif پایینی اصلاً اجرا نمی‌شه." },
              },
              {
                type: "text",
                en: "The fix is simply to flip the order. Now the specific case gets its chance before the wide net. Whenever you read a ladder, ask: could an upper branch swallow this case?",
                fa: "درستش فقط اینه که ترتیب رو برعکس کنی. حالا حالت خاص، قبل از تور پهن، شانسه‌ش رو امتحان می‌کنه. هر وقت نردبانی دیدی بپرس: شاخهٔ بالاتری می‌تونه این حالت رو بلعیده باشه؟",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `age = 8
if age < 12:
    print("Half price")
elif age < 18:
    print("Teen ticket")
else:
    print("Full price")`,
                caption: { en: "Narrow first → Half price. Exactly what an 8-year-old deserves.", fa: "اول باریک → ‏Half price. دقیقاً چیزی که یه ۸ ساله لایقشه." },
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "else: the safety net", fa: "‏else: تور ایمنی" },
            blocks: [
              {
                type: "text",
                en: "A golden trick: inside a ladder you don't repeat what upper branches already ruled out. If the first branch caught ages under 12, the elif below already knows age is at least 12 — so elif age < 18 really means «12 to 17». Shorter and clearer.",
                fa: "یه ترفند طلایی: داخل نردبان لازم نیست چیزی رو که شاخه‌های بالایی رد کردن دوباره چک کنی. اگه شاخهٔ اول سن‌های زیر ۱۲ رو گرفت، ‏elif پایینی از قبل می‌دونه سن حداقل ۱۲ ــه — پس ‏elif age < 18 در واقع یعنی «۱۲ تا ۱۷». کوتاه‌تر و تمیزتر.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `km = 25
if km <= 5:
    fare = 20
elif km <= 15:
    fare = 40
else:
    fare = 60
print(f"Taxi fare: {fare}")`,
                caption: { en: "km = 25 falls through to else → 60. Each branch means the ranges above it failed.", fa: "‏km = 25 می‌افته توی else → ۶۰. هر شاخه یعنی بازه‌های بالاییش به خطا خوردن." },
              },
              {
                type: "tip",
                en: "else is the safety net — no condition, catches everything the ladder missed. Always put it last.",
                fa: "‏else تور ایمنیه — شرط نداره و هر چیزی رو که نردبان جا انداخته می‌گیره. همیشه آخرش بذار.",
              },
              {
                type: "warn",
                en: "Classic trap: putting the wide check (km <= 15) ABOVE the narrow one (km <= 5) — then even 3 km pays 40. Order first, conditions second.",
                fa: "تلهٔ کلاسیک: شرط پهن (‏km <= 15) رو «بالای» شرط باریک (‏km <= 5) بنویسی — اون‌وقت ۳ کیلومتر هم ۴۰ می‌ده. اول ترتیب، بعد شرط‌ها.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In an if/elif/else ladder, which branch runs?", fa: "توی نردبان if/elif/else کدوم شاخه اجرا می‌شه؟" },
                options: [
                  { en: "Every branch whose condition is true", fa: "هر شاخه‌ای که شرطش درسته" },
                  { en: "Only the FIRST true branch, from the top", fa: "فقط اولین شاخهٔ درست، از بالا" },
                  { en: "Always the else", fa: "همیشه ‏else" },
                  { en: "A random branch", fa: "یه شاخهٔ تصادفی" },
                ],
                answer: 1,
                explain: { en: "Top to bottom — first match wins, everything after it is skipped.", fa: "از بالا به پایین — اولین تطابق برنده‌ست و بقیه رد می‌شن." },
              },
              {
                q: { en: "age = 10 — ladder: if age < 12 → \"Half price\"; elif age < 18 → \"Teen\". What prints?", fa: "‏age = 10 — نردبان:‏ if age < 12 → «Half price»؛‏ elif age < 18 → «Teen». چی چاپ می‌شه؟" },
                options: [
                  { en: "Teen", fa: "‏Teen" },
                  { en: "Half price", fa: "‏Half price" },
                  { en: "Both lines", fa: "هر دو خط" },
                  { en: "Nothing", fa: "هیچی" },
                ],
                answer: 1,
                explain: { en: "10 < 12 is the first true branch — the elif is never even checked.", fa: "‏10 < 12 اولین شاخهٔ درسته — دیگه سراغ elif هم نمی‌ره." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Delivery Ladder 📦", fa: "نردبان ارسال 📦" },
            brief: {
              en: "Read the order total (a whole number). Shipping ladder: total < 200 → shipping 40; total < 500 → shipping 20; otherwise → shipping 0 (free!). Print exactly:\nTotal: {total}\nShipping: {shipping}",
              fa: "جمع سفارش رو بخون (عدد صحیح). نردبان هزینهٔ ارسال:‏ total < 200 → ارسال ۴۰؛‏ total < 500 → ارسال ۲۰؛ غیر از این → ارسال ۰ (رایگان!). دقیقاً چاپ کن:\nTotal: {total}\nShipping: {shipping}",
            },
            starter: `total = int(input())

# Ladder from NARROW to WIDE:
# total < 200 -> shipping = 40
# total < 500 -> shipping = 20
# else        -> shipping = 0  (free!)
# then print Total: ... and Shipping: ...
`,
            solution: `total = int(input())
if total < 200:
    shipping = 40
elif total < 500:
    shipping = 20
else:
    shipping = 0
print(f"Total: {total}")
print(f"Shipping: {shipping}")`,
            hints: [
              {
                en: "Three branches: if total < 200, elif total < 500, else. Store the cost in shipping and print AFTER the ladder.",
                fa: "سه شاخه:‏ if total < 200 و بعد ‏elif total < 500 و در آخر else. هزینه رو بریز توی shipping و بعد از نردبان چاپش کن.",
              },
              {
                en: "200 itself pays 20 (it's not < 200) and 500 ships free — boundaries belong to the next tier.",
                fa: "خود ۲۰۰ می‌شه ۲۰ (چون ‏< 200 نیست) و ۵۰۰ رایگانه — مرزها مال پلهٔ بعدین.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "150", expect: "Total: 150\nShipping: 40" },
                { stdin: "350", expect: "Total: 350\nShipping: 20", hidden: true },
                { stdin: "900", expect: "Total: 900\nShipping: 0", hidden: true },
              ],
            },
            sample: { stdin: "150", expect: "Total: 150\nShipping: 40" },
          },
        ],
      },
      {
        id: "py-m14-l2",
        title: { en: "Lookup Tables", fa: "جدول‌های تصمیم" },
        goal: {
          en: "Swap long if/elif chains for a dict that maps each key straight to its answer.",
          fa: "زنجیره‌های طولانی if و elif رو با یه دیکشنری عوض کن که هر کلید رو مستقیم به جوابش می‌رسونه.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "When every branch just attaches a DIFFERENT VALUE to a different case, you don't need if at all — you need a lookup table. A dict IS a decision: key → answer, no ladder required.",
                fa: "وقتی کار هر شاخه فقط اینه که به یه حالت یه «مقدار» متفاوت بچسبونه، اصلاً به if نیاز نداری — به جدول تصمیم نیاز داری. دیکشنری خودش یه تصمیمه: کلید → جواب، بدون نردبان.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `menu = {"burger": 90, "pizza": 120, "salad": 70}
order = "pizza"
price = menu[order]
print(f"{order}: {price}")`,
                caption: { en: "One line replaces three elifs — and adding a dish means adding one entry.", fa: "یه خط جای سه تا elif رو می‌گیره — و اضافه کردن یه غذا یعنی فقط یه ردیف جدید." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "One catch: menu[\"sushi\"] crashes — that key isn't in the table. The polite lookup is .get(key, default): the answer if present, your fallback if not. Now the unknown case becomes just another branch.",
                fa: "یه نکته:‏ menu[\"sushi\"] کرش می‌کنه — چون همچین کلیدی توی جدول نیست. خوندن مؤدبانه با ‏.get(key, default) ــه: اگه بود جواب، نبود مقدار پیش‌فرض. این‌جوری حالت «ناشناس» هم فقط یه شاخهٔ معمولی می‌شه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `menu = {"burger": 90, "pizza": 120, "salad": 70}
order = "sushi"
price = menu.get(order, 0)
if price > 0:
    print(f"{order}: {price}")
else:
    print(f"Sorry, no {order} today")`,
                caption: { en: ".get(order, 0) returns 0 for strangers — the if turns that into a friendly message.", fa: "‏.get(order, 0) برای غریبه‌ها ۰ برمی‌گردونه — ‏if هم همین رو تبدیل می‌کنه به یه پیام مؤدبانه." },
              },
              {
                type: "tip",
                en: "Count your elifs: when they only map cases to values, collapse them into a dict. Logic belongs in ifs; data belongs in dicts.",
                fa: "‏elifها رو بشمار: وقتی کارشون فقط وصل کردن حالت به مقداره، بریزشون توی یه دیکشنری. منطق مال if ــه؛ داده مال دیکشنری.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "When is a dict lookup better than an if/elif chain?", fa: "کِی جدول (دیکشنری) بهتر از زنجیرهٔ if و elif ــه؟" },
                options: [
                  { en: "When each branch maps a case to a different value", fa: "وقتی کار هر شاخه وصل کردن یه حالت به یه مقدار متفاوته" },
                  { en: "When branches run different multi-step logic", fa: "وقتی شاخه‌ها منطق چندمرحله‌ای متفاوت دارن" },
                  { en: "Never — ifs are always better", fa: "هیچ‌وقت — همیشه if بهتره" },
                  { en: "Only for numbers", fa: "فقط برای اعداد" },
                ],
                answer: 0,
                explain: { en: "Case → value is data, and data lives happily in dicts.", fa: "حالت → مقدار یعنی داده، و داده توی دیکشنری خونه‌ش خوشه." },
              },
              {
                q: { en: "menu.get(\"tacos\", 0) — tacos is NOT in the dict. What comes back?", fa: "‏menu.get(\"tacos\", 0) — ‏tacos توی دیکشنری نیست. چی برمی‌گرده؟" },
                options: [
                  { en: "A KeyError crash", fa: "خطای ‏KeyError" },
                  { en: "0 — the default", fa: "۰ — همون پیش‌فرض" },
                  { en: "\"tacos\"", fa: "‏\"tacos\"" },
                  { en: "None", fa: "‏None" },
                ],
                answer: 1,
                explain: { en: ".get returns the fallback instead of crashing.", fa: "‏get به‌جای کرش، مقدار پیش‌فرض رو برمی‌گردونه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Café Bot ☕", fa: "ربات کافه ☕" },
            brief: {
              en: "prices = {\"tea\": 30, \"coffee\": 45, \"cake\": 60}. Read one order (a single word). On the menu → print exactly \"{order}: {price} coins\". Unknown → print exactly \"Sorry, we don't have {order}\". Use .get(order, 0) for the lookup.",
              fa: "‏prices = {\"tea\": 30, \"coffee\": 45, \"cake\": 60}. یه سفارش بخون (یه کلمه). اگه توی منو بود → دقیقاً چاپ کن «{order}: {price} coins». اگه نبود → دقیقاً چاپ کن «Sorry, we don't have {order}». برای خوندن قیمت از ‏.get(order, 0) استفاده کن.",
            },
            starter: `prices = {"tea": 30, "coffee": 45, "cake": 60}
order = input()

# price = prices.get(order, ???)
# if ...  -> print f"{order}: {price} coins"
# else    -> print f"Sorry, we don't have {order}"
`,
            solution: `prices = {"tea": 30, "coffee": 45, "cake": 60}
order = input()
price = prices.get(order, 0)
if price > 0:
    print(f"{order}: {price} coins")
else:
    print(f"Sorry, we don't have {order}")`,
            hints: [
              {
                en: "A default of 0 makes strangers easy to spot: price > 0 means we have it.",
                fa: "پیش‌فرض ۰ غریبه‌ها رو راحت مشخص می‌کنه:‏ price > 0 یعنی داریمش.",
              },
              {
                en: "Both prints are f-strings with order and price — no brackets needed inside the holes.",
                fa: "هر دو چاپ f-string با order و price ــن — داخل آکولادها به کروشه نیازی نیست.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "tea", expect: "tea: 30 coins" },
                { stdin: "juice", expect: "Sorry, we don't have juice", hidden: true },
                { stdin: "cake", expect: "cake: 60 coins", hidden: true },
              ],
            },
            sample: { stdin: "tea", expect: "tea: 30 coins" },
          },
        ],
      },
      {
        id: "py-m14-l3",
        title: { en: "Many Rules at Once", fa: "چند قانون باهم" },
        goal: {
          en: "Combine checks with and / or / not and store the results in named flag variables.",
          fa: "چند چک رو با and و or و not ترکیب کن و نتیجه‌ها رو بریز توی پرچم‌های اسم‌دار.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Real decisions rarely rest on ONE check. The pro move: run each check, store its True/False result in a well-named flag, then combine the flags. The whole policy reads like a sentence.",
                fa: "تصمیم‌های واقعی به‌ندرت به «یه» چک تکیه می‌کنن. حرکت حرفه‌ای: هر چک رو اجرا کن، جواب True یا Falseش رو بریز توی یه پرچم با اسمِ خوب، بعد پرچم‌ها رو ترکیب کن. کل قانون می‌شه یه جملهٔ خوانا.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `age = 20
has_ticket = True

allowed = age >= 18 and has_ticket
print(f"Entry: {allowed}")`,
                caption: { en: "Entry: True — both flags agreed. Flip either one and the door closes.", fa: "‏Entry: True — هر دو پرچم موافقن. یکی رو برعکس کن، در بسته می‌شه." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Flags + a ladder = a policy engine. and demands BOTH sides, or is happy with at least one, not flips. And remember: write each side in full — x > 5 and x < 10, never x > 5 and < 10.",
                fa: "پرچم‌ها + نردبان = موتور قانون‌ها. ‏and «هر دو» طرف رو می‌خواد، ‏or با حداقل یکی راضیه، ‏not برعکس می‌کنه. و یادت باشه: هر دو طرف شرط رو کامل بنویس —‏ x > 5 and x < 10، نه ‏x > 5 and < 10.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `total = 600
is_member = True

big_order = total >= 500

if big_order and is_member:
    discount = 15
elif big_order or is_member:
    discount = 5
else:
    discount = 0
print(f"Discount: {discount}%")`,
                caption: { en: "600 + member → both true → 15%. Change total to 300 and it still earns 5%.", fa: "۶۰۰ + عضویت → هر دو درست → ۱۵٪. جمع رو کن ۳۰۰، بازم ۵٪ می‌گیره." },
              },
              {
                type: "warn",
                en: "Comparisons already produce booleans — don't compare a flag to True (if allowed == True:). The flag alone IS the condition: if allowed:.",
                fa: "مقایسه‌ها خودشون بولین می‌سازن — پرچم رو با True مقایسه نکن (‏if allowed == True:). خود پرچم شرطه:‏ if allowed:.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "age = 16, with_id = False — does age >= 18 or with_id open the door?", fa: "‏age = 16 و with_id = False — آیا ‏age >= 18 or with_id در رو باز می‌کنه؟" },
                options: [
                  { en: "Yes — or only needs one true side", fa: "آره — ‏or فقط یه طرف درست می‌خواد" },
                  { en: "No — both sides are False", fa: "نه — هر دو طرف غلطن" },
                  { en: "It causes an error", fa: "خطا می‌ده" },
                  { en: "Only if not is added", fa: "فقط اگه not اضافه بشه" },
                ],
                answer: 1,
                explain: { en: "or needs at least ONE true side — here both are False.", fa: "‏or حداقل یه طرف درست می‌خواد — اینجا هر دو غلطن." },
              },
              {
                q: { en: "What does not has_pass give when has_pass = False?", fa: "‏not has_pass وقتی has_pass = False چی برمی‌گردونه؟" },
                options: [
                  { en: "False", fa: "‏False" },
                  { en: "True", fa: "‏True" },
                  { en: "None", fa: "‏None" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 1,
                explain: { en: "not flips the flag: False becomes True.", fa: "‏not پرچم رو برعکس می‌کنه: False می‌شه True." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Club Door 🚪", fa: "در کلاب 🚪" },
            brief: {
              en: "Read three lines: age (whole number), has_id (\"yes\"/\"no\"), is_vip (\"yes\"/\"no\"). Rules:\n- under 18 → \"Sorry, adults only\"\n- 18 or older without ID → \"ID, please\"\n- 18 or older with ID → \"Welcome in!\" — and if they're ALSO VIP: \"Welcome in! VIP lounge is open.\"\nTip: flag = input() == \"yes\" turns the answer into a boolean.",
              fa: "سه خط بخون:‏ age (عدد صحیح)،‏ has_id («yes» یا «no»)،‏ is_vip («yes» یا «no»). قانون‌ها:\n- زیر ۱۸ → «Sorry, adults only»\n- ۱۸ به بالا بدون مدارک → «ID, please»\n- ۱۸ به بالا با مدارک → «Welcome in!» — و اگه VIP هم بود: «Welcome in! VIP lounge is open.»\nنکته:‏ flag = input() == \"yes\" جواب رو تبدیل می‌کنه به بولین.",
            },
            starter: `age = int(input())
has_id = input() == "yes"
is_vip = input() == "yes"

# under 18          -> Sorry, adults only
# 18+ and no id     -> ID, please
# 18+ with id       -> Welcome in!
#   ...and if is_vip -> Welcome in! VIP lounge is open.
`,
            solution: `age = int(input())
has_id = input() == "yes"
is_vip = input() == "yes"

if age >= 18 and has_id:
    if is_vip:
        print("Welcome in! VIP lounge is open.")
    else:
        print("Welcome in!")
elif age >= 18:
    print("ID, please")
else:
    print("Sorry, adults only")`,
            hints: [
              {
                en: "First split on age >= 18 and has_id; INSIDE the welcome branch, a second if checks is_vip.",
                fa: "اول روی ‏age >= 18 and has_id تفکیک کن؛ «داخل» شاخهٔ خوش‌آمد، یه if دوم ‏is_vip رو چک می‌کنه.",
              },
              {
                en: "elif age >= 18 alone means: adult but no ID. The final else catches the minors.",
                fa: "‏elif age >= 18 به‌تنهایی یعنی: بزرگه ولی مدارک نداره. ‏else آخر هم زیر ۱۸ سالیه‌ها رو می‌گیره.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "20\nyes\nno", expect: "Welcome in!" },
                { stdin: "22\nyes\nyes", expect: "Welcome in! VIP lounge is open.", hidden: true },
                { stdin: "16\nyes\nyes", expect: "Sorry, adults only", hidden: true },
              ],
            },
            sample: { stdin: "20\nyes\nno", expect: "Welcome in!" },
          },
        ],
      },
      {
        id: "py-m14-l4",
        title: { en: "Mini-Project: The Decision Desk", fa: "مینی‌پروژه: میز تصمیم‌ها" },
        goal: {
          en: "Stack a lookup table, a ladder and flag rules into one shipping-quote machine.",
          fa: "جدولِ کلید به مقدار، نردبان و قانون‌های پرچمی رو روی هم سوار کن و یه ماشین استعلام ارسال بساز.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Big decision programs are LAYERS, not one giant if. Layer 1: a lookup table picks the zone's base price. Layer 2: a ladder adds the weight surcharge. Each layer stays small enough to check at a glance.",
                fa: "برنامه‌های تصمیمِ بزرگ «لایه‌لایه»ان، نه یه if غول‌پیکر. لایهٔ ۱: جدول کلید به مقدار، قیمت پایهٔ منطقه رو برمی‌داره. لایهٔ ۲: نردبان هزینهٔ وزن رو اضافه می‌کنه. هر لایه اون‌قدر کوچیک می‌مونه که با یه نگاه چک بشه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `zones = {"north": 30, "south": 40, "islands": 90}
zone = "south"
weight = 3

base = zones[zone]
if weight <= 2:
    extra = 0
elif weight <= 5:
    extra = 15
else:
    extra = 30

print(f"Cost: {base + extra}")`,
                caption: { en: "Base 40 + extra 15 = Cost: 55. Two layers, zero confusion.", fa: "پایهٔ ۴۰ + اضافهٔ ۱۵ = ‏Cost: 55. دو لایه، صفر گیج‌شدگی." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Now the full machine: read the zone, the weight and an express answer. Unknown zones fall back to .get(zone, 50) — an average price instead of a crash. Express is a boolean flag that adds a flat fee at the very end.",
                fa: "حالا ماشین کامل: منطقه و وزن و جواب اکسپرس رو بخون. منطقه‌های ناشناس با ‏.get(zone, 50) به قیمت متوسط می‌رسن، نه کرش. اکسپرس هم یه پرچم بولینه که آخرِ کار یه هزینهٔ ثابت اضافه می‌کنه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `zones = {"north": 30, "south": 40, "islands": 90}
zone = input()
weight = int(input())
express = input() == "yes"

base = zones.get(zone, 50)
extra = 0
if weight > 5:
    extra = 30
elif weight > 2:
    extra = 15

cost = base + extra
if express:
    cost = cost + 25
print(f"Cost: {cost}")`,
                caption: { en: "south, 3 kg, no express → Cost: 55. Try mars → base 50.", fa: "‏south و ۳ کیلو بدون اکسپرس → ‏Cost: 55. امتحان کن ‏mars → پایهٔ ۵۰." },
              },
              {
                type: "tip",
                en: "Read the program as a pipeline: inputs → table → ladder → flag → total. When each stage fits in 3 lines, bugs have nowhere to hide.",
                fa: "برنامه رو مثل یه خط لوله بخون: ورودی‌ها → جدول → نردبان → پرچم → جمع. وقتی هر مرحله توی ۳ خط جا می‌شه، باگ جایی برای قایم شدن نداره.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why zones.get(zone, 50) instead of zones[zone]?", fa: "چرا ‏zones.get(zone, 50) و نه ‏zones[zone]؟" },
                options: [
                  { en: "It's faster", fa: "سریع‌تره" },
                  { en: "Unknown zones get a default price instead of a KeyError crash", fa: "منطقه‌های ناشناس به‌جای خطای KeyError قیمت پیش‌فرض می‌گیرن" },
                  { en: "It deletes missing zones", fa: "منطقه‌های غایب رو پاک می‌کنه" },
                  { en: "It sorts the zones", fa: "منطقه‌ها رو مرتب می‌کنه" },
                ],
                answer: 1,
                explain: { en: "Square brackets demand the key exists; .get offers a fallback.", fa: "کروشه اصرار داره کلید وجود داشته باشه؛ ‏get یه جایگزین پیشنهاد می‌ده." },
              },
              {
                q: { en: "express = input() == \"yes\" — what type is express?", fa: "‏express = input() == \"yes\" — نوع express چیه؟" },
                options: [
                  { en: "A string", fa: "یه رشته" },
                  { en: "A boolean", fa: "یه بولین" },
                  { en: "A number", fa: "یه عدد" },
                  { en: "A dict", fa: "یه دیکشنری" },
                ],
                answer: 1,
                explain: { en: "The == comparison produces True or False.", fa: "مقایسهٔ == یا True می‌سازه یا False." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Shipping Quote Machine 🚚", fa: "ماشین استعلام ارسال 🚚" },
            brief: {
              en: "zones = {\"local\": 10, \"country\": 25, \"remote\": 60}. Read three lines: zone, weight (whole number), express (\"yes\"/\"no\"). Rules:\n- unknown zone → base 40\n- weight over 10 kg → +30; over 5 kg → +15\n- express \"yes\" → +20\nPrint exactly one line: \"Quote: {cost} coins\"",
              fa: "‏zones = {\"local\": 10, \"country\": 25, \"remote\": 60}. سه خط بخون: منطقه، وزن (عدد صحیح)، اکسپرس («yes» یا «no»). قانون‌ها:\n- منطقهٔ ناشناس → پایهٔ ۴۰\n- وزن بیش از ۱۰ کیلو → ‎+۳۰؛ بیش از ۵ کیلو → ‎+۱۵\n- اکسپرس «yes» → ‎+۲۰\nفقط یه خط چاپ کن: «Quote: {cost} coins»",
            },
            starter: `zones = {"local": 10, "country": 25, "remote": 60}
zone = input()
weight = int(input())
express = input() == "yes"

# 1. base = zones.get(zone, ???)
# 2. ladder on weight: > 10 -> +30 , > 5 -> +15
# 3. if express -> +20
# 4. print f"Quote: {cost} coins"
`,
            solution: `zones = {"local": 10, "country": 25, "remote": 60}
zone = input()
weight = int(input())
express = input() == "yes"

base = zones.get(zone, 40)
extra = 0
if weight > 10:
    extra = 30
elif weight > 5:
    extra = 15

cost = base + extra
if express:
    cost = cost + 20
print(f"Quote: {cost} coins")`,
            hints: [
              {
                en: "Compute extra with the ladder first (if weight > 10 → 30, elif weight > 5 → 15), then cost = base + extra, then if express: cost = cost + 20.",
                fa: "اول extra رو با نردبان وزن حساب کن (‏if weight > 10 → ۳۰، ‏elif weight > 5 → ۱۵)، بعد ‏cost = base + extra و آخرش ‏if express: cost = cost + 20.",
              },
              {
                en: "Unknown zone? .get(zone, 40) quietly covers it — no if needed.",
                fa: "منطقهٔ ناشناس؟ ‏.get(zone, 40) بی‌سروصدا پوششش می‌ده — بدون if.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "country\n3\nno", expect: "Quote: 25 coins" },
                { stdin: "remote\n12\nyes", expect: "Quote: 110 coins", hidden: true },
                { stdin: "mars\n2\nno", expect: "Quote: 40 coins", hidden: true },
              ],
            },
            sample: { stdin: "country\n3\nno", expect: "Quote: 25 coins" },
          },
        ],
      },
    ],
  },
  {
    id: "py-m15",
    title: { en: "Bigger Programs", fa: "برنامه‌های بزرگ‌تر" },
    blurb: {
      en: "Split the work into small functions that call each other — then ship a real text tool.",
      fa: "کار رو بین توابع کوچیکی که همدیگه رو صدا می‌زنن تقسیم کن — بعد یه ابزار واقعیِ متن تحویل بده.",
    },
    lessons: [
      {
        id: "py-m15-l1",
        title: { en: "Functions Calling Functions", fa: "تابعی که تابع صدا می‌زنه" },
        goal: {
          en: "Chain small functions into pipelines where each return value feeds the next call.",
          fa: "توابع کوچیک رو توی خط لوله زنجیر کن که خروجی هرکدوم خوراک بعدی بشه.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "One function = one job. A bigger program is just small jobs CONNECTED: a function may call another function, use its return value, and pass the result onward. You've been doing this with print(len(name)) all along.",
                fa: "هر تابع = یه کار. برنامهٔ بزرگ‌تر فقط یه مشت کار کوچیکِ «به‌هم‌وصله»: یه تابع می‌تونه یه تابع دیگه رو صدا بزنه، از مقدار return شده استفاده کنه و نتیجه رو جلوتر بفرسته. تو از اول با ‏print(len(name)) همین کارو می‌کردی.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def clean(s):
    return s.strip()

def loud(s):
    return s.upper() + "!"

name = clean("   maya   ")
print(loud(name))`,
                caption: { en: "clean hands loud a tidy \"maya\" — loud shouts it back as MAYA!", fa: "‏clean یه maya مرتب به ‏loud می‌ده — ‏loud هم به شکل MAYA! داد می‌زنه." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "You can even nest the calls in one line: loud(clean(text)) — Python runs the INNER call first and feeds its result outwards, exactly like math parentheses. Read pipelines inside-out.",
                fa: "حتی می‌تونی صدا زدن‌ها رو توی یه خط تودرتو کنی:‏ loud(clean(text)) — پایتون اول صدا زدن «داخلی» رو اجرا می‌کنه و نتیجه‌ش رو بیرون می‌فرسته، دقیقاً مثل پرانتزهای ریاضی. خط لوله‌ها رو از داخل به بیرون بخون.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def clean(s):
    return s.strip()

def loud(s):
    return s.upper() + "!"

print(loud(clean("  kenji ")))
print(loud(clean(" ana")))`,
                caption: { en: "KENJI! then ANA! — two pipelines, no intermediate variables.", fa: "اول ‏KENJI! بعد ‏ANA! — دو تا خط لوله، بدون متغیر واسطه." },
              },
              {
                type: "warn",
                en: "Define BEFORE you call: the def lines must sit above the first line that uses them — Python reads top to bottom.",
                fa: "اول تعریف، بعد صدا زدن: خط‌های def باید بالای اولین خطی باشن که استفاده‌شون می‌کنه — پایتون از بالا به پایین می‌خونه.",
              },
              {
                type: "tip",
                en: "If a function's body does two jobs, split it. Small machines are easier to test, name and reuse.",
                fa: "اگه بدنهٔ یه تابع دوتا کار می‌کنه، بشکنش. ماشین‌های کوچیک راحت‌تر تست می‌شن، اسم می‌گیرن و دوباره استفاده می‌شن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "In loud(clean(text)), which function runs first?", fa: "توی ‏loud(clean(text)) کدوم تابع اول اجرا می‌شه؟" },
                options: [
                  { en: "loud", fa: "‏loud" },
                  { en: "clean", fa: "‏clean" },
                  { en: "Both at once", fa: "هردو باهم" },
                  { en: "Neither — it's an error", fa: "هیچ‌کدوم — خطاست" },
                ],
                answer: 1,
                explain: { en: "Inner call first: clean tidies the text, then loud shouts the result.", fa: "اول تابع داخلی: clean متن رو مرتب می‌کنه، بعد loud نتیجه رو داد می‌زنه." },
              },
              {
                q: { en: "def g(x): return x + 1 and def f(x): return x * 10 — what is f(g(2))?", fa: "‏def g(x): return x + 1 و ‏def f(x): return x * 10 — خروجی ‏f(g(2)) چیه؟" },
                options: [
                  { en: "21", fa: "۲۱" },
                  { en: "30", fa: "۳۰" },
                  { en: "31", fa: "۳۱" },
                  { en: "None", fa: "‏None" },
                ],
                answer: 1,
                explain: { en: "g(2) = 3, then f(3) = 30.", fa: "‏g(2) می‌شه ۳، بعد ‏f(3) می‌شه ۳۰." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Echo Polisher 📣", fa: "پولیشر پژواک 📣" },
            brief: {
              en: "Write two functions: clean(s) returns the text without stray spaces (strip), and shout(s) returns the text in CAPITALS plus \"!!!\". Read two lines; for each print exactly:\nEcho: {cleaned and shouted line}",
              fa: "دو تا تابع بنویس:‏ clean(s) متن رو بدون فاصله‌های اضافی برمی‌گردونه (‏strip) و ‏shout(s) متن رو با حروف بزرگ به‌علاوهٔ «!!!» برمی‌گردونه. دو خط بخون؛ برای هرکدوم دقیقاً چاپ کن:\nEcho: {خطِ تمیزشده و دادزده}",
            },
            starter: `# 1. def clean(s): return s.strip()
# 2. def shout(s): return upper + "!!!"
# 3. read two lines a and b
# 4. print f"Echo: {shout(clean(a))}" — same for b
`,
            solution: `def clean(s):
    return s.strip()

def shout(s):
    return s.upper() + "!!!"

a = input()
b = input()
print(f"Echo: {shout(clean(a))}")
print(f"Echo: {shout(clean(b))}")`,
            hints: [
              {
                en: "Nested calls inside an f-string hole are fine — as long as no quotes go inside the {holes}.",
                fa: "صدا زدن تودرتو داخل آکولاد f-string آزاده — فقط تا وقتی که گیومه‌ای داخل {آکولادها} نباشه.",
              },
              {
                en: "shout adds exactly three exclamation marks after .upper().",
                fa: "‏shout بعد از ‏.upper() دقیقاً سه تا علامت تعجب اضافه می‌کنه.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "  sara \nkenji", expect: "Echo: SARA!!!\nEcho: KENJI!!!" },
                { stdin: "Ana\n  bob ", expect: "Echo: ANA!!!\nEcho: BOB!!!", hidden: true },
              ],
            },
            sample: { stdin: "  sara \nkenji", expect: "Echo: SARA!!!\nEcho: KENJI!!!" },
          },
        ],
      },
      {
        id: "py-m15-l2",
        title: { en: "The Return Value Assembly Line", fa: "خط مونتاژِ return" },
        goal: {
          en: "Feed return values into math and into other functions — build price logic from tiny parts.",
          fa: "مقدارهای return رو توی محاسبه‌ها و تابع‌های بعدی به‌کار ببر — منطق قیمت رو از قطعه‌های کوچیک بساز.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "A returned value is a full citizen: store it in a variable, add it to another, compare it, print it. Money logic is built exactly like this — one small function per rule.",
                fa: "مقدار برگشتی یه شهروند تمام‌عواره: بریزش توی متغیر، با دیگری جمعش کن، مقایسه‌ش کن، چاپش کن. منطق پول دقیقاً همین‌جوری ساخته می‌شه — برای هر قانون یه تابع کوچیک.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def with_tax(price):
    return price + price * 9 / 100

p1 = with_tax(100)
p2 = with_tax(200)
print(f"Both: {p1 + p2}")`,
                caption: { en: "9% tax on each, then the two values add up to 327.0.", fa: "۹٪ مالیات برای هرکدوم، بعد جمعشون می‌شه ۳۲۷٫۰." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Now chain the machines: discounted() computes the sale price, and final() feeds that result straight into with_tax(). Small parts, assembled.",
                fa: "حالا ماشین‌ها رو به هم وصل کن: تابع discounted قیمت حراج رو حساب می‌کنه و ‏final همون نتیجه رو مستقیم می‌رسونه به with_tax. قطعه‌های کوچیک، مونتاژشده.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def with_tax(price):
    return price + price * 9 / 100

def discounted(price, pct):
    return price - price * pct / 100

def final(price, pct):
    return with_tax(discounted(price, pct))

print(final(100, 10))`,
                caption: { en: "100 − 10% = 90.0, then tax → 98.1. Three tiny machines, one pipeline.", fa: "‏۱۰۰ منهای ۱۰٪ می‌شه ۹۰٫۰ و با مالیات می‌شه ۹۸٫۱. سه تا ماشین کوچیک، یه خط لوله." },
              },
              {
                type: "warn",
                en: "Percent order matters: price * pct / 100 is safe, but price * (pct / 100) drifts into float dust. Multiply first, divide last.",
                fa: "ترتیب محاسبهٔ درصد مهمه:‏ price * pct / 100 امنه، ولی ‏price * (pct / 100) گرد و غبار اعشاری می‌سازه. اول ضرب، آخر تقسیم.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does with_tax(50) return (9% tax)?", fa: "‏with_tax(50) با ۹٪ مالیات چی برمی‌گردونه؟" },
                options: [
                  { en: "54.5", fa: "۵۴٫۵" },
                  { en: "59.0", fa: "۵۹٫۰" },
                  { en: "50.9", fa: "۵۰٫۹" },
                  { en: "45.5", fa: "۴۵٫۵" },
                ],
                answer: 0,
                explain: { en: "50 + 50 * 9 / 100 = 50 + 4.5 = 54.5.", fa: "‏۵۰ + ۵۰ × ۹ ÷ ۱۰۰ = ۵۰ + ۴٫۵ = ۵۴٫۵." },
              },
              {
                q: { en: "Why keep with_tax and discounted as separate functions?", fa: "چرا ‏with_tax و ‏discounted رو جدا نگه داریم؟" },
                options: [
                  { en: "To make the file longer", fa: "که فایل طولانی‌تر بشه" },
                  { en: "Because final() reuses them — one job per function", fa: "چون ‏final دوباره استفاده‌شون می‌کنه — برای هر تابع یه کار" },
                  { en: "Because Python requires it", fa: "چون پایتون الزامش کرده" },
                  { en: "To slow the program down", fa: "که برنامه کند بشه" },
                ],
                answer: 1,
                explain: { en: "Small reusable pieces can be tested alone and recombined freely.", fa: "قطعه‌های کوچیکِ قابل‌استفادهٔ دوباره می‌تونن تنها تست بشن و آزادانه دوباره سرهم بشن." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Price Machine 🏷️", fa: "ماشین قیمت 🏷️" },
            brief: {
              en: "Read a price (whole number) and a discount percent (whole number). Write discounted(price, pct) → price minus pct%, and with_tax(price) → price plus 9% tax. Print exactly:\nSale: {price after discount}\nFinal: {price after discount, plus tax}",
              fa: "قیمت (عدد صحیح) و درصد تخفیف (عدد صحیح) رو بخون. تابع ‏discounted(price, pct) رو بنویس → قیمت منهای pct درصد، و ‏with_tax(price) → قیمت به‌علاوهٔ ۹٪ مالیات. دقیقاً چاپ کن:\nSale: {قیمت بعد از تخفیف}\nFinal: {قیمت بعد از تخفیف، با مالیات}",
            },
            starter: `price = int(input())
pct = int(input())

# 1. def discounted(price, pct): return price - price * pct / 100
# 2. def with_tax(price): return price + price * 9 / 100
# 3. print Sale: discounted(...)
# 4. print Final: with_tax(discounted(...))
`,
            solution: `def discounted(price, pct):
    return price - price * pct / 100

def with_tax(price):
    return price + price * 9 / 100

price = int(input())
pct = int(input())
print(f"Sale: {discounted(price, pct)}")
print(f"Final: {with_tax(discounted(price, pct))}")`,
            hints: [
              {
                en: "Discount first, tax second: with_tax(discounted(price, pct)) — the inner machine runs first.",
                fa: "اول تخفیف، بعد مالیات:‏ with_tax(discounted(price, pct)) — ماشین داخلی اول کار می‌کنه.",
              },
              {
                en: "200 with 25% → Sale: 150.0. The .0 is normal: / always makes a float.",
                fa: "‏۲۰۰ با ۲۵٪ می‌شه ‏Sale: 150.0. اون ‎.0 عادیه: تقسیم همیشه float می‌ده.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "200\n25", expect: "Sale: 150.0\nFinal: 163.5" },
                { stdin: "100\n10", expect: "Sale: 90.0\nFinal: 98.1", hidden: true },
                { stdin: "400\n50", expect: "Sale: 200.0\nFinal: 218.0", hidden: true },
              ],
            },
            sample: { stdin: "200\n25", expect: "Sale: 150.0\nFinal: 163.5" },
          },
        ],
      },
      {
        id: "py-m15-l3",
        title: { en: "The Helper Shelf", fa: "قفسهٔ ابزارها" },
        goal: {
          en: "Build tiny text utilities — initials and usernames — with split() and indexing.",
          fa: "با split و اندیس‌گذاری ابزارهای کوچیک متنی بساز — سرواژه و نام‌کاربری.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Real apps keep a shelf of tiny helpers. initials(full) takes \"Sara Ahmadi\" and returns \"sa\": split the name into words, then grab the first CHARACTER of each with word[0].",
                fa: "اپ‌های واقعی یه قفسه از کمک‌کننده‌های کوچیک دارن. ‏initials(full) از «Sara Ahmadi» خروجی sa می‌سازه: اسم رو با split به کلمه‌ها بشکن، بعد اولین «حرف» هر کلمه رو با ‏word[0] بردار.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def initials(full):
    parts = full.split()
    first = parts[0]
    last = parts[1]
    return first[0] + last[0]

print(initials("Sara Ahmadi"))`,
                caption: { en: "parts[0][0] — first word, first character. Two doors, one letter.", fa: "‏parts[0][0] — کلمهٔ اول، حرف اول. دو تا در، یه حرف." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Second helper: usernames. lower() the whole name, split it, glue first and last together with a dot. Then compose: badge() calls BOTH helpers and returns one shiny line.",
                fa: "دومین ابزار: نام‌کاربری. کل اسم رو lower کن، بشکنش، و اسم کوچیک و فامیل رو با یه نقطه به هم بچسبون. بعد ترکیبش کن: تابع badge هر دو ابزار رو صدا می‌زنه و یه خط درخشان برمی‌گردونه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def initials(full):
    parts = full.split()
    return parts[0][0] + parts[1][0]

def username(full):
    parts = full.lower().split()
    return parts[0] + "." + parts[1]

def badge(full):
    return initials(full) + " (" + username(full) + ")"

print(badge("Sara Ahmadi"))`,
                caption: { en: "SA (sara.ahmadi) — three functions, three lines each, one tidy result.", fa: "‏SA (sara.ahmadi) — سه تابع، هرکدوم سه خط، یه نتیجهٔ مرتب." },
              },
              {
                type: "warn",
                en: "parts[1] assumes TWO words. \"Cher\" would crash with index out of range — real apps check len(parts) first.",
                fa: "‏parts[1] دو کلمه بودن رو فرض می‌کنه. «Cher» با خطای اندیس کرش می‌کنه — اپ‌های واقعی اول ‏len(parts) رو چک می‌کنن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is \"maya chen\".split()[0]?", fa: "خروجی ‏\"maya chen\".split()[0] چیه؟" },
                options: [
                  { en: "maya", fa: "‏maya" },
                  { en: "chen", fa: "‏chen" },
                  { en: "m", fa: "‏m" },
                  { en: "maya chen", fa: "‏maya chen" },
                ],
                answer: 0,
                explain: { en: "split() cuts on spaces; [0] takes the first word.", fa: "‏split روی فاصله‌ها می‌بُره؛ ‏[0] کلمهٔ اول رو برمی‌داره." },
              },
              {
                q: { en: "name = \"Ali Reza\" — what is name.split()[1][0]?", fa: "‏name = \"Ali Reza\" — خروجی ‏name.split()[1][0] چیه؟" },
                options: [
                  { en: "A", fa: "‏A" },
                  { en: "R", fa: "‏R" },
                  { en: "l", fa: "‏l" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 1,
                explain: { en: "[1] is the second word (Reza), [0] is its first character (R).", fa: "‏[1] کلمهٔ دوم ــه (Reza) و ‏[0] اولین حرفش (R)." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Badge Factory 🪪", fa: "کارخانهٔ نشان 🪪" },
            brief: {
              en: "Read a full name (exactly two words) on one line. Build three helpers and print exactly:\nName: {name in Title Case}\nInitials: {first letters, e.g. sa}\nLogin: {first.last in lowercase}",
              fa: "یه نام کامل (دقیقاً دو کلمه) توی یه خط بخون. سه تا ابزار بساز و دقیقاً چاپ کن:\nName: {اسم با حرف بزرگ اول هر کلمه}\nInitials: {حرف اول کلمه‌ها، مثل sa}\nLogin: {first.last با حروف کوچیک}",
            },
            starter: `# 1. def initials(full): parts[0][0] + parts[1][0]
# 2. def username(full): lower -> split -> "first.last"
# 3. name = input()
# 4. print Name: (title) / Initials: (initials) / Login: (username)
`,
            solution: `def initials(full):
    parts = full.split()
    return parts[0][0] + parts[1][0]

def username(full):
    parts = full.lower().split()
    return parts[0] + "." + parts[1]

name = input()
print(f"Name: {name.title()}")
print(f"Initials: {initials(name)}")
print(f"Login: {username(name)}")`,
            hints: [
              {
                en: "title() capitalizes every word — call it on name for the first line.",
                fa: "‏title اول هر کلمه رو بزرگ می‌کنه — برای خط اول روی name صداش بزن.",
              },
              {
                en: "Initials come from the ORIGINAL name (no lower needed) — \"sara ahmadi\" gives sa.",
                fa: "سرواژه‌ها از اسم «اصلی» میان (لازم به lower نیست) — «sara ahmadi» می‌شه sa.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "sara ahmadi", expect: "Name: Sara Ahmadi\nInitials: sa\nLogin: sara.ahmadi" },
                { stdin: "kenji tanaka", expect: "Name: Kenji Tanaka\nInitials: kt\nLogin: kenji.tanaka", hidden: true },
                { stdin: "ana lee", expect: "Name: Ana Lee\nInitials: al\nLogin: ana.lee", hidden: true },
              ],
            },
            sample: { stdin: "sara ahmadi", expect: "Name: Sara Ahmadi\nInitials: sa\nLogin: sara.ahmadi" },
          },
        ],
      },
      {
        id: "py-m15-l4",
        title: { en: "Mini-Project: The Message Fixer", fa: "مینی‌پروژه: تعمیرکار پیام" },
        goal: {
          en: "Ship a small text tool: censor a banned word, tidy the spaces and report the word count.",
          fa: "یه ابزار کوچیک متنی تحویل بده: کلمهٔ ممنوعه رو سانسور کن، فاصله‌ها رو مرتب کن و تعداد کلمه‌ها رو گزارش بده.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Text tools are pipelines of helpers. First helper: censor(text, bad) — replace() swaps EVERY occurrence of the banned word with \"***\". Mind you, it's case-sensitive: \"Spam\" hides from \"spam\".",
                fa: "ابزارهای متن خط لوله‌ای از کمک‌کننده‌هاان. اولین کمک‌کننده:‏ censor(text, bad) — تابع replace «هر» جا که کلمهٔ ممنوعه باشه رو با «***» عوض می‌کنه. حواست باشه به بزرگی و کوچیکی حروف حساسه: «Spam» از چشم «spam» قایم می‌شه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def censor(text, bad):
    return text.replace(bad, "***")

print(censor("no way dude", "way"))`,
                caption: { en: "no *** dude — the bad word never survives.", fa: "‏no *** dude — کلمهٔ بد زنده نمی‌مونه." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Second helper: clean(text) squeezes double spaces into single ones and trims the edges. The main program composes everything: censor → clean → report.",
                fa: "دومین کمک‌کننده:‏ clean(text) فاصله‌های دوتایی رو تبدیل به تکی می‌کنه و لبه‌ها رو تمیز می‌کنه. برنامهٔ اصلی همه رو سرهم می‌کنه: اول سانسور، بعد تمیزکاری، بعد گزارش.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def clean(text):
    fixed = text.replace("  ", " ")
    return fixed.strip()

def censor(text, bad):
    return text.replace(bad, "***")

msg = input()
bad = input()
safe = clean(censor(msg, bad))
print(safe)
print(f"Words: {len(safe.split())}")
print(safe.upper())`,
                caption: { en: "One pipeline: hide the bad word, squeeze the gaps, count, shout.", fa: "یه خط لوله: کلمهٔ بد رو قایم کن، فاصله‌ها رو بچسبون، بشمار، داد بزن." },
              },
              {
                type: "tip",
                en: "len() on a string counts CHARACTERS; len() on the split() list counts WORDS. Different teams, different stats.",
                fa: "‏len روی رشته «حرف» می‌شماره؛ ‏len روی لیستِ خروجی split «کلمه». دو تا تیم متفاوت با آمار متفاوت.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "censor(\"a b b c\", \"b\") returns…", fa: "خروجی ‏censor(\"a b b c\", \"b\") می‌شه…" },
                options: [
                  { en: "a *** *** c", fa: "‏a *** *** c" },
                  { en: "a b *** c", fa: "‏a b *** c" },
                  { en: "a b b c", fa: "‏a b b c" },
                  { en: "An error", fa: "خطا" },
                ],
                answer: 0,
                explain: { en: "replace() hits EVERY occurrence, not just the first.", fa: "‏replace همهٔ موارد رو می‌زنه، نه فقط اولی رو." },
              },
              {
                q: { en: "Why len(safe.split()) and not len(safe) for the word count?", fa: "برای شمارش کلمه‌ها چرا ‏len(safe.split()) و نه ‏len(safe)؟" },
                options: [
                  { en: "Because split() sorts the words", fa: "چون ‏split کلمه‌ها رو مرتب می‌کنه" },
                  { en: "Because len(safe) counts characters, not words", fa: "چون ‏len(safe) حرف می‌شماره، نه کلمه" },
                  { en: "They're identical", fa: "هردو یکین" },
                  { en: "Because len hates strings", fa: "چون len از رشته‌ها متنفره" },
                ],
                answer: 1,
                explain: { en: "A string gives its character count to len; the word LIST gives the word count.", fa: "رشته تعداد حرف‌هاش رو به len می‌ده؛ «لیستِ کلمه‌ها» تعداد کلمه‌ها رو." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Message Fixer 🔧", fa: "تعمیرکار پیام 🔧" },
            brief: {
              en: "Read a message (one line) and a banned word (one line). Helpers: censor(text, bad) replaces the banned word with \"***\"; clean(text) turns double spaces into single ones and strips the edges. Print exactly:\nFixed: {censored + cleaned message}\nWords: {word count}\nSafe: {everything in CAPITALS}",
              fa: "یه پیام (یه خط) و یه کلمهٔ ممنوعه (یه خط) بخون. ابزارها:‏ censor(text, bad) کلمهٔ ممنوعه رو با «***» عوض می‌کنه؛‏ clean(text) فاصله‌های دوتایی رو تکی می‌کنه و لبه‌ها رو تمیز. دقیقاً چاپ کن:\nFixed: {پیام سانسور و تمیزشده}\nWords: {تعداد کلمه‌ها}\nSafe: {همه‌چیز با حروف بزرگ}",
            },
            starter: `# 1. def censor(text, bad): return text.replace(bad, "***")
# 2. def clean(text): replace "  " with " ", then strip
# 3. msg = input(), bad = input()
# 4. fixed = clean(censor(msg, bad))
# 5. print Fixed: ... / Words: ... / Safe: (upper)
`,
            solution: `def clean(text):
    fixed = text.replace("  ", " ")
    return fixed.strip()

def censor(text, bad):
    return text.replace(bad, "***")

msg = input()
bad = input()
fixed = clean(censor(msg, bad))
print(f"Fixed: {fixed}")
print(f"Words: {len(fixed.split())}")
print(f"Safe: {fixed.upper()}")`,
            hints: [
              {
                en: "Censor FIRST, then clean — that order keeps the counting honest.",
                fa: "اول سانسور، بعد تمیزکاری — این ترتیب باعث می‌شه شمارش منصفانه باشه.",
              },
              {
                en: "All three prints come from the ONE variable fixed — censor and clean already did the work.",
                fa: "هر سه چاپ از «همون» یه متغیر fixed میان — censor و clean کارشون رو انجام دادن.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "this is  SO secret now\nsecret", expect: "Fixed: this is SO *** now\nWords: 5\nSafe: THIS IS SO *** NOW" },
                { stdin: "no  spam here\nspam", expect: "Fixed: no *** here\nWords: 3\nSafe: NO *** HERE", hidden: true },
                { stdin: "clean text\ndragon", expect: "Fixed: clean text\nWords: 2\nSafe: CLEAN TEXT", hidden: true },
              ],
            },
            sample: { stdin: "this is  SO secret now\nsecret", expect: "Fixed: this is SO *** now\nWords: 5\nSafe: THIS IS SO *** NOW" },
          },
        ],
      },
    ],
  },
  {
    id: "py-m16",
    title: { en: "Python Lab", fa: "آزمایشگاه پایتون" },
    blurb: {
      en: "Four compact capstone builds: a converter, a strength meter, a word game and a trip planner.",
      fa: "چهار تا ساخت جمع‌بندی و فشرده: یه تبدیل‌کننده، یه سنجهٔ قدرت رمز، یه بازی کلمه‌ای و یه برنامه‌ریز سفر.",
    },
    lessons: [
      {
        id: "py-m16-l1",
        title: { en: "The Unit Converter Lab", fa: "آزمایشگاه تبدیل یکاها" },
        goal: {
          en: "Build a menu-driven converter where every formula lives in its own function.",
          fa: "یه تبدیل‌کننده با منو بساز که فرمول هر تبدیل توی تابع خودش باشه.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Formulas belong in functions — one name, one job, reusable forever. Kilometers to miles is just divide by 1.6; Celsius to Fahrenheit is multiply by 9, divide by 5, add 32.",
                fa: "فرمول‌ها خونه‌شون تابعه — یه اسم، یه کار، برای همیشه قابل‌استفادهٔ دوباره. کیلومتر به مایل فقط تقسیم بر ۱٫۶ ــه؛ سلسیوس به فارنهایت هم ضربدر ۹، تقسیم بر ۵، به‌علاوهٔ ۳۲.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def km_to_miles(km):
    return km / 1.6

def c_to_f(c):
    return c * 9 / 5 + 32

print(km_to_miles(8))
print(c_to_f(25))`,
                caption: { en: "5.0 and 77.0 — two formulas, two machines, tested at a glance.", fa: "‏۵٫۰ و ۷۷٫۰ — دو تا فرمول، دو تا ماشین، با یه نگاه تست‌شدنی." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Now wire a menu: read the choice, read the value, and let an if ladder route the value into the right machine. Round the displayed result with round(x, 1) so something like 4.375 doesn't scare anyone.",
                fa: "حالا یه منو سیم‌کشی کن: انتخاب رو بخون، مقدار رو بخون، و با یه نردبان if مقدار رو بفرست توی ماشین درست. نتیجهٔ نمایشی رو با ‏round(x, 1) گرد کن که عددی مثل ۴٫۳۷۵ کسی رو نترسونه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def km_to_miles(km):
    return km / 1.6

choice = input()
value = float(input())
if choice == "1":
    print(f"Miles: {round(km_to_miles(value), 1)}")
else:
    print(f"Fahrenheit: {round(value * 9 / 5 + 32, 1)}")`,
                caption: { en: "Choice 1, value 8 → Miles: 5.0. Choice 2, value 25 → Fahrenheit: 77.0.", fa: "انتخاب ۱ با مقدار ۸ → ‏Miles: 5.0. انتخاب ۲ با مقدار ۲۵ → ‏Fahrenheit: 77.0." },
              },
              {
                type: "tip",
                en: "input() always hands you TEXT — float(input()) is the door into decimal math.",
                fa: "‏input همیشه «متن» دستت می‌ده — ‏float(input) همون در ورودیه به ریاضیِ اعشاری.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does km_to_miles(16) return (÷ 1.6)?", fa: "‏km_to_miles(16) چی برمی‌گردونه (تقسیم بر ۱٫۶)؟" },
                options: [
                  { en: "10.0", fa: "۱۰٫۰" },
                  { en: "16.0", fa: "۱۶٫۰" },
                  { en: "1.6", fa: "۱٫۶" },
                  { en: "26.5", fa: "۲۶٫۵" },
                ],
                answer: 0,
                explain: { en: "16 / 1.6 = 10.0.", fa: "‏۱۶ ÷ ۱٫۶ می‌شه ۱۰٫۰." },
              },
              {
                q: { en: "Why round the result to 1 decimal?", fa: "چرا نتیجه رو به یه رقم اعشار گرد کنیم؟" },
                options: [
                  { en: "Python forbids long decimals", fa: "پایتون اعشار طولانی رو ممنوع کرده" },
                  { en: "So 4.375 shows as a friendly 4.4", fa: "که ‏۴٫۳۷۵ به‌شکل خوش‌برخورد ۴٫۴ دیده بشه" },
                  { en: "It makes the program faster", fa: "برنامه رو سریع‌تر می‌کنه" },
                  { en: "No reason — it's decoration", fa: "دلیلی نداره — تزئینه" },
                ],
                answer: 1,
                explain: { en: "round(x, 1) keeps output short and readable — same number, fewer digits.", fa: "‏round(x, 1) خروجی رو کوتاه و خوانا نگه می‌داره — همون عدد، رقم‌های کمتر." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Converter Stand 🌡️", fa: "دکهٔ تبدیل 🌡️" },
            brief: {
              en: "Read a choice: \"1\" = km → miles, \"2\" = °C → °F. Then read the value (it may be a decimal). Write km_to_miles(km) (÷ 1.6) and round both results with round(x, 1). Print exactly:\nMiles: {result}      (choice 1)\nFahrenheit: {result} (choice 2)",
              fa: "انتخاب رو بخون: «۱» یعنی کیلومتر → مایل، «۲» یعنی سلسیوس → فارنهایت. بعد مقدار رو بخون (ممکنه اعشاری باشه). تابع ‏km_to_miles(km) رو بنویس (تقسیم بر ۱٫۶) و هر دو نتیجه رو با ‏round(x, 1) گرد کن. دقیقاً چاپ کن:\nMiles: {نتیجه}      (برای انتخاب ۱)\nFahrenheit: {نتیجه} (برای انتخاب ۲)",
            },
            starter: `# 1. def km_to_miles(km): return km / 1.6
# 2. choice = input(), value = float(input())
# 3. choice "1" -> print f"Miles: {round(..., 1)}"
#    else      -> print f"Fahrenheit: {round(value * 9 / 5 + 32, 1)}"
`,
            solution: `def km_to_miles(km):
    return km / 1.6

choice = input()
value = float(input())
if choice == "1":
    print(f"Miles: {round(km_to_miles(value), 1)}")
else:
    print(f"Fahrenheit: {round(value * 9 / 5 + 32, 1)}")`,
            hints: [
              {
                en: "The ladder has just two doors: choice == \"1\" and everything else.",
                fa: "نردبان فقط دو تا در داره:‏ choice == \"1\" و همه‌چیزِ غیر از اون.",
              },
              {
                en: "round(km_to_miles(value), 1) — round the RESULT of the call, not the input.",
                fa: "‏round(km_to_miles(value), 1) — «نتیجه» رو گرد کن، نه ورودی رو.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "1\n8", expect: "Miles: 5.0" },
                { stdin: "2\n25", expect: "Fahrenheit: 77.0", hidden: true },
                { stdin: "1\n40", expect: "Miles: 25.0", hidden: true },
              ],
            },
            sample: { stdin: "1\n8", expect: "Miles: 5.0" },
          },
        ],
      },
      {
        id: "py-m16-l2",
        title: { en: "The Password Strength Meter", fa: "سنجهٔ قدرت رمز" },
        goal: {
          en: "Turn password rules into boolean flags, count the passes, and rate the password.",
          fa: "قانون‌های رمز رو تبدیل کن به پرچم بولینی، پاس‌ها رو بشمار و به رمز نمره بده.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "A strength meter is a stack of QUESTIONS with yes/no answers: Is it long enough? Any uppercase? Any digit? Each answer becomes a flag — a variable holding True or False.",
                fa: "سنجهٔ قدرت یه پشته از «سؤال»هاست با جواب آره/نه: به‌قدر کافی بلنده؟ حرف بزرگ داره؟ رقم داره؟ هر جواب می‌شه یه پرچم — یه متغیر که True یا False نگه می‌داره.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `pw = "Sunny42"
long_enough = len(pw) >= 8
has_upper = pw != pw.lower()
print(f"Long: {long_enough}")
print(f"Upper: {has_upper}")`,
                caption: { en: "7 letters → Long: False. The != trick catches the capital S → True.", fa: "۷ حرف → ‏Long: False. ترفند ‏!= حرف S بزرگ رو می‌گیره → True." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Hunting for a digit? Walk the characters and flip a flag the moment you find one. Then every rule that passed adds 1 to the score — and the score IS the verdict.",
                fa: "دنبال رقم می‌گردی؟ روی حرف‌ها راه برو و لحظه‌ای که پیداش کردی یه پرچم رو بچرخون. بعد هر قانونی که پاس شد یه واحد به امتیاز اضافه می‌کنه — و همین امتیاز، حکم نهاییه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `pw = "Sunny42"
has_digit = False
for ch in pw:
    if ch.isdigit():
        has_digit = True

score = 0
if len(pw) >= 8:
    score = score + 1
if pw != pw.lower():
    score = score + 1
if has_digit:
    score = score + 1
print(f"Score: {score}/3")`,
                caption: { en: "Short but strong: 2/3. The meter never lies.", fa: "کوتاه ولی قوی: ۲ از ۳. سنجه هیچ‌وقت دروغ نمی‌گه." },
              },
              {
                type: "warn",
                en: "Flip the flag only when found — no else. One digit anywhere must count, and a second digit must not undo it.",
                fa: "پرچم رو فقط وقتی پیدا شد بچرخون — else نذار. یه رقم در هر جای رمز باید حساب بشه، و رقم دوم هم نباید اون رو خنثی کنه.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does pw != pw.lower() detect?", fa: "‏pw != pw.lower() چی رو تشخیص می‌ده؟" },
                options: [
                  { en: "At least one uppercase letter", fa: "حداقل یه حرف بزرگ" },
                  { en: "That the password is empty", fa: "این‌که رمز خالیه" },
                  { en: "A wrong password", fa: "یه رمز اشتباه رو" },
                  { en: "Numbers inside the password", fa: "عدد داخل رمز رو" },
                ],
                answer: 0,
                explain: { en: "lower() shrinks every letter — if ANYTHING changed, an uppercase existed.", fa: "‏lower همهٔ حرف‌ها رو کوچیک می‌کنه — اگه «چیزی» عوض شد، یعنی حرف بزرگی وجود داشته." },
              },
              {
                q: { en: "Why start has_digit = False before the loop?", fa: "چرا قبل از حلقه ‏has_digit = False می‌ذاریم؟" },
                options: [
                  { en: "To save memory", fa: "که حافظه کمتر مصرف بشه" },
                  { en: "So the flag stays False until a digit is actually found", fa: "که پرچم تا وقتی واقعاً رقمی پیدا نشه False بمونه" },
                  { en: "Because loops need False", fa: "چون حلقه‌ها False می‌خوان" },
                  { en: "To reset the password", fa: "که رمز ریست بشه" },
                ],
                answer: 1,
                explain: { en: "The flag starts as «no evidence yet» and flips to True the moment a digit appears.", fa: "پرچم از حالت «هنوز مدرکی نیست» شروع می‌شه و لحظه‌ای که رقم ظاهر شه True می‌شه." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Strength Meter 🔑", fa: "سنجهٔ قدرت 🔑" },
            brief: {
              en: "Read a password. Check three rules: at least 8 characters, at least one uppercase letter (pw != pw.lower()), at least one digit (loop + isdigit). Print exactly:\nLong: {True/False}\nUppercase: {True/False}\nDigits: {True/False}\nScore: {n}/3",
              fa: "یه رمز بخون. سه قانون رو چک کن: حداقل ۸ کاراکتر، حداقل یه حرف بزرگ (‏pw != pw.lower())، حداقل یه رقم (حلقه + ‏isdigit). دقیقاً چاپ کن:\nLong: {True/False}\nUppercase: {True/False}\nDigits: {True/False}\nScore: {n}/3",
            },
            starter: `pw = input()

# 1. long_ok = len(pw) >= 8
# 2. has_upper = pw != pw.lower()
# 3. has_digit: start False, loop ch in pw, flip when ch.isdigit()
# 4. score = number of True rules
# 5. print Long / Uppercase / Digits / Score lines
`,
            solution: `pw = input()
long_ok = len(pw) >= 8
has_upper = pw != pw.lower()
has_digit = False
for ch in pw:
    if ch.isdigit():
        has_digit = True

score = 0
if long_ok:
    score = score + 1
if has_upper:
    score = score + 1
if has_digit:
    score = score + 1

print(f"Long: {long_ok}")
print(f"Uppercase: {has_upper}")
print(f"Digits: {has_digit}")
print(f"Score: {score}/3")`,
            hints: [
              {
                en: "Print the three FLAGS with f-strings — a boolean hole shows True or False automatically.",
                fa: "سه تا «پرچم» رو با f-string چاپ کن — آکولاد بولینی خودکار True یا False نشون می‌ده.",
              },
              {
                en: "Score = just three ifs, each adding 1 — then f\"Score: {score}/3\".",
                fa: "امتیاز = فقط سه تا if که هرکدوم یکی اضافه می‌کنن — بعد ‏f\"Score: {score}/3\".",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "Sunny42", expect: "Long: False\nUppercase: True\nDigits: True\nScore: 2/3" },
                { stdin: "weakpass", expect: "Long: True\nUppercase: False\nDigits: False\nScore: 1/3", hidden: true },
                { stdin: "Str0ng2026", expect: "Long: True\nUppercase: True\nDigits: True\nScore: 3/3", hidden: true },
              ],
            },
            sample: { stdin: "Sunny42", expect: "Long: False\nUppercase: True\nDigits: True\nScore: 2/3" },
          },
        ],
      },
      {
        id: "py-m16-l3",
        title: { en: "The Secret Word Feedback Game", fa: "بازی کلمهٔ مخفی" },
        goal: {
          en: "Build letter-by-letter feedback with loops, indexing and a growing feedback string.",
          fa: "با حلقه و اندیس‌گذاری و یه رشتهٔ در حال رشد، بازخورد حرف‌به‌حرف بساز.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Guessing games live on POSITION-BY-POSITION comparison. Loop with range(len(secret)) so i walks 0, 1, 2, 3 — then compare guess[i] with secret[i]. A matching spot earns a \"+\".",
                fa: "بازی‌های حدس روی مقایسهٔ «موقعیت به موقعیت» زندگی می‌کنن. با ‏range(len(secret)) حلقه بزن تا i به‌ترتیب ۰ و ۱ و ۲ و ۳ رو بگرده — بعد ‏guess[i] رو با ‏secret[i] مقایسه کن. هر جای درست یه «+» می‌گیره.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `secret = "teka"
guess = "task"
feedback = ""
for i in range(len(secret)):
    if guess[i] == secret[i]:
        feedback = feedback + "+"
    else:
        feedback = feedback + "."
print(feedback)`,
                caption: { en: "t matches, the rest don't → +... — the string grows one symbol per round.", fa: "فقط t جوره → ‏+... — رشته هر دور یه نماد اضافه می‌شه." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Three outcomes per letter: right spot → \"+\", letter EXISTS but wrong spot → \"/\", absent → \".\". The elif ch in secret: membership test handles the middle case.",
                fa: "برای هر حرف سه حالت: جای درست → «+»، حرف «هست» ولی جای بد → «/»، اصلاً نیست → «.». تست عضویت با ‏elif ch in secret: حالت وسط رو حل می‌کنه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `secret = "teka"
guess = "tame"
feedback = ""
for i in range(len(secret)):
    ch = guess[i]
    if ch == secret[i]:
        feedback = feedback + "+"
    elif ch in secret:
        feedback = feedback + "/"
    else:
        feedback = feedback + "."
print(feedback)`,
                caption: { en: "+/./ — t is perfect, a and e wander, m is a stranger.", fa: "‏+/./ — t عالیه، ‏a و ‏e سرگردونن، ‏m غریبه‌ست." },
              },
              {
                type: "warn",
                en: "This trick needs guess and secret to be the SAME length — otherwise guess[i] runs past the end. Our tests always send 4-letter guesses.",
                fa: "این ترفند می‌خواد ‏guess و ‏secret «هم‌طول» باشن — وگرنه ‏guess[i] از آخر رشته رد می‌شه. تست‌های ما همیشه حدس ۴ حرفی می‌فرستن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "secret = \"task\", guess = \"soak\" — what's the feedback?", fa: "‏secret = \"task\" و guess = \"soak\" — بازخورد چیه؟" },
                options: [
                  { en: "/./+", fa: "‏/./+" },
                  { en: "++..", fa: "‏++.." },
                  { en: "...+", fa: "‏...+" },
                  { en: "+..+", fa: "‏+..+" },
                ],
                answer: 0,
                explain: { en: "s and a exist elsewhere (/), o is absent (.), k is exact (+).", fa: "‏s و ‏a جای دیگه‌ان (‏/)، ‏o نیست (‏.) و ‏k دقیقه (‏+)." },
              },
              {
                q: { en: "What does feedback = feedback + \"+\" do?", fa: "‏feedback = feedback + \"+\" چیکار می‌کنه؟" },
                options: [
                  { en: "Replaces the old feedback", fa: "بازخورد قبلی رو عوض می‌کنه" },
                  { en: "Glues + to the end and stores it back", fa: "«+» رو به آخرش می‌چسبونه و برمی‌گردونه توی متغیر" },
                  { en: "Creates a second variable", fa: "یه متغیر دوم می‌سازه" },
                  { en: "Counts the pluses", fa: "علامت‌های + رو می‌شماره" },
                ],
                answer: 1,
                explain: { en: "Old value + new symbol = the new value. Classic string building.", fa: "مقدار قبلی + نماد تازه = مقدار جدید. ساخت رشته به سبک کلاسیک." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Word Detective 🔎", fa: "کارآگاه کلمه‌ها 🔎" },
            brief: {
              en: "secret = \"code\" is already in the starter. Read one 4-letter guess. For each position: match → \"+\", letter exists elsewhere → \"/\", missing → \".\". Print exactly:\nFeedback: {the 4 symbols}\nExact: {number of \"+\"}\nWin! (if guess == secret) — otherwise Keep trying!",
              fa: "‏secret = \"code\" از قبل توی استارتره. یه حدس ۴ حرفی بخون. برای هر موقعیت: تطابق → «+»، حرف جای دیگه‌ست → «/»، نیست → «.». دقیقاً چاپ کن:\nFeedback: {چهار تا نماد}\nExact: {تعداد «+»}\nWin! (اگه ‏guess == secret) — وگرنه ‏Keep trying!",
            },
            starter: `secret = "code"
guess = input()

# feedback = ""
# exact = 0
# loop i in range(len(secret)):
#   ch == secret[i] -> "+" and exact + 1
#   elif ch in secret -> "/"
#   else -> "."
# print Feedback / Exact / Win! or Keep trying!
`,
            solution: `secret = "code"
guess = input()
feedback = ""
exact = 0
for i in range(len(secret)):
    ch = guess[i]
    if ch == secret[i]:
        feedback = feedback + "+"
        exact = exact + 1
    elif ch in secret:
        feedback = feedback + "/"
    else:
        feedback = feedback + "."
print(f"Feedback: {feedback}")
print(f"Exact: {exact}")
if guess == secret:
    print("Win!")
else:
    print("Keep trying!")`,
            hints: [
              {
                en: "exact grows ONLY in the match branch — / and . never touch it.",
                fa: "‏exact فقط توی شاخهٔ تطابق بزرگ می‌شه — ‏/ و ‏. کاری باهاش ندارن.",
              },
              {
                en: "cope → ++.+ and Exact: 3 — the p is a stranger, the rest sit exactly right.",
                fa: "‏cope می‌شه ‏++.+ با ‏Exact: 3 — ‏p غریبه‌ست و بقیه دقیقاً سر جاشونن.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "cope", expect: "Feedback: ++.+\nExact: 3\nKeep trying!" },
                { stdin: "doze", expect: "Feedback: /+.+\nExact: 2\nKeep trying!", hidden: true },
                { stdin: "code", expect: "Feedback: ++++\nExact: 4\nWin!", hidden: true },
              ],
            },
            sample: { stdin: "cope", expect: "Feedback: ++.+\nExact: 3\nKeep trying!" },
          },
        ],
      },
      {
        id: "py-m16-l4",
        title: { en: "The Trip Calculator", fa: "حساب‌گر سفر" },
        goal: {
          en: "Combine functions, float math, rounding and a budget decision into one trip report.",
          fa: "توابع و ریاضی اعشاری و گرد کردن و تصمیم بودجه رو توی یه گزارش سفر جمع کن.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Fuel math in three functions: liters = distance ÷ consumption, cost = liters × price, hours = distance ÷ speed. Each formula gets its own tiny machine — then the report assembles them.",
                fa: "ریاضی سوخت توی سه تا تابع: لیتر = مسافت ÷ مصرف، هزینه = لیتر × قیمت، ساعت = مسافت ÷ سرعت. برای هر فرمول یه ماشین کوچیک جدا — بعد گزارش، اون‌ها رو مونتاژ می‌کنه.",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def liters_needed(km, kml):
    return km / kml

print(liters_needed(300, 15))`,
                caption: { en: "20.0 liters for 300 km at 15 km/l — float division always shows the .0.", fa: "۳۰۰ کیلومتر با مصرف ۱۵ می‌شه ۲۰٫۰ لیتر — تقسیم اعشاری همیشه ‎.0 رو نشون می‌ده." },
              },
            ],
          },
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "The report: read distance, consumption and fuel price, compute with the helper, round every displayed value to 1 decimal — and finish with a budget verdict: enough, or short?",
                fa: "گزارش: مسافت و مصرف و قیمت سوخت رو بخون، با تابع کمکی حساب کن، هر مقداری که نمایش می‌دی رو با ‏round تا یه رقم اعشار گرد کن — و آخرش حکم بودجه: می‌رسه یا کم میاره؟",
              },
              {
                type: "code",
                lang: "python",
                runnable: true,
                code: `def liters_needed(km, kml):
    return km / kml

km = float(input())
kml = float(input())
price = float(input())

fuel = liters_needed(km, kml)
cost = round(fuel * price, 1)
print(f"Liters: {round(fuel, 1)}")
print(f"Cost: {cost}")`,
                caption: { en: "300 km, 15 km/l, fuel at 2 → Liters: 20.0, Cost: 40.0.", fa: "۳۰۰ کیلومتر، مصرف ۱۵، سوخت ۲ → ‏Liters: 20.0 و ‏Cost: 40.0." },
              },
              {
                type: "tip",
                en: "round(cost - budget, 1) turns 39.99999-style float dust into an honest 40.0. Always round money at the LAST moment — the display.",
                fa: "‏round(cost - budget, 1) گرد و خاک اعشاریِ مدل ۳۹٫۹۹۹۹۹ رو تبدیل می‌کنه به ۴۰٫۰ٔ صادقانه. پول رو همیشه «آخرِ کار» گرد کن — همون‌جا که نمایشش می‌دی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "liters_needed(200, 8) returns…", fa: "خروجی ‏liters_needed(200, 8) می‌شه…" },
                options: [
                  { en: "25.0", fa: "۲۵٫۰" },
                  { en: "16.0", fa: "۱۶٫۰" },
                  { en: "208.0", fa: "۲۰۸٫۰" },
                  { en: "0.04", fa: "۰٫۰۴" },
                ],
                answer: 0,
                explain: { en: "200 / 8 = 25.0 — divide by consumption, don't multiply.", fa: "‏۲۰۰ ÷ ۸ می‌شه ۲۵٫۰ — بر مصرف «تقسیم» کن، نه ضرب." },
              },
              {
                q: { en: "Why keep cost in its own variable before printing?", fa: "چرا هزینه رو قبل از چاپ توی یه متغیر جدا نگه داریم؟" },
                options: [
                  { en: "Because print can't show numbers", fa: "چون print عدد نشون نمی‌ده" },
                  { en: "So the budget check can reuse the exact same value", fa: "که چک بودجه بتونه از «همون» مقدار استفاده کنه" },
                  { en: "To make it a string", fa: "که رشته بشه" },
                  { en: "No reason", fa: "دلیلی نداره" },
                ],
                answer: 1,
                explain: { en: "Compute once, reuse twice — the verdict compares the SAME cost you printed.", fa: "یه بار حساب کن، دو بار استفاده کن — حکم نهایی با «همون» هزینه‌ای مقایسه می‌شه که چاپ کردی." },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Trip Budget Final ⛽", fa: "بودجهٔ سفر — فینال ⛽" },
            brief: {
              en: "Read four lines: distance (km), consumption (km per liter), fuel price, budget — all may be decimals. Write liters_needed(km, kml). Print exactly:\nLiters: {round to 1}\nCost: {round to 1}   (liters × price)\nHours: {round to 1}   (distance ÷ 80)\nBudget: OK   (if budget >= cost) — otherwise Budget: short by {round(cost - budget, 1)}",
              fa: "چهار خط بخون: مسافت (کیلومتر)، مصرف (کیلومتر بر لیتر)، قیمت سوخت و بودجه — ممکنه اعشاری باشن. تابع ‏liters_needed(km, kml) رو بنویس. دقیقاً چاپ کن:\nLiters: {گرد به ۱ رقم}\nCost: {گرد به ۱ رقم}   (لیتر × قیمت)\nHours: {گرد به ۱ رقم}   (مسافت ÷ ۸۰)\nBudget: OK   (اگه ‏budget >= cost) — وگرنه ‏Budget: short by {round(cost - budget, 1)}",
            },
            starter: `# 1. def liters_needed(km, kml): return km / kml
# 2. read km, kml, price, budget (all float(input()))
# 3. fuel = liters_needed(...), cost = fuel * price, hours = km / 80
# 4. print Liters / Cost / Hours (all round(..., 1))
# 5. budget >= cost -> "Budget: OK" else f"Budget: short by {round(cost - budget, 1)}"
`,
            solution: `def liters_needed(km, kml):
    return km / kml

km = float(input())
kml = float(input())
price = float(input())
budget = float(input())

fuel = liters_needed(km, kml)
cost = fuel * price
hours = km / 80
print(f"Liters: {round(fuel, 1)}")
print(f"Cost: {round(cost, 1)}")
print(f"Hours: {round(hours, 1)}")
if budget >= cost:
    print("Budget: OK")
else:
    print(f"Budget: short by {round(cost - budget, 1)}")`,
            hints: [
              {
                en: "240 km, 15 km/l, price 2, budget 50 → 16.0 liters, 32.0 cost, 3.0 hours, OK.",
                fa: "‏۲۴۰ کیلومتر، مصرف ۱۵، قیمت ۲، بودجه ۵۰ → ۱۶٫۰ لیتر، ۳۲٫۰ هزینه، ۳٫۰ ساعت و OK.",
              },
              {
                en: "The else branch only runs when money runs out — short by exactly cost − budget.",
                fa: "شاخهٔ else فقط وقتی اجرا می‌شه که پول کم بیاد — کسری دقیقاً برابره با cost − budget.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "240\n15\n2\n50", expect: "Liters: 16.0\nCost: 32.0\nHours: 3.0\nBudget: OK" },
                { stdin: "400\n10\n3\n80", expect: "Liters: 40.0\nCost: 120.0\nHours: 5.0\nBudget: short by 40.0", hidden: true },
                { stdin: "120\n20\n2\n5", expect: "Liters: 6.0\nCost: 12.0\nHours: 1.5\nBudget: short by 7.0", hidden: true },
              ],
            },
            sample: { stdin: "240\n15\n2\n50", expect: "Liters: 16.0\nCost: 32.0\nHours: 3.0\nBudget: OK" },
          },
        ],
      },
    ],
  },
];
