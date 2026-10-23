// TEKA NEXUS — Python course extension · modules m17–m19 (Task 17-b2).
// Nested loops & accumulator patterns, clean-code habits, final capstones.
// Every runnable sample and every challenge test is guaranteed to run in the
// bundled pylite interpreter (see src/lib/academy/pylite.ts). All graded
// outputs are deterministic — fixed constants only, no randomness anywhere.

import type { Module } from "./types";

export const pyModulesD: Module[] = [
  {
    id: "py-m17",
    title: { en: "Nested Loops & Mini Tools", fa: "حلقه‌های تودرتو و ابزارهای کوچک" },
    blurb: {
      en: "Loops inside loops for shapes and grids, plus the accumulator patterns behind every report tool.",
      fa: "حلقه توی حلقه برای شکل‌ها و جدول‌ها، به‌علاوهٔ الگوهایی که پشت هر ابزار گزارش‌گیری قرار داره.",
    },
    lessons: [
      {
        id: "py-m17-l1",
        title: { en: "Patterns from Loops", fa: "الگوهایی از جنس حلقه" },
        goal: {
          en: "Print shapes and staircases by looping over rows with string repetition.",
          fa: "با حلقه روی سطرها راه بری و با تکرار رشته، شکل و پله چاپ کنی.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Until now loops printed numbers — today they draw! You have two simple tools: string repetition (\"*\" * 5 is \"*****\", from m11) and a loop that prints one line per round. Combine them and every round of the loop draws one row of a shape.",
                fa: "تا حالا حلقه‌ها عدد چاپ می‌کردن — امروز نقاشی می‌کنن! دو تا ابزار ساده داری: تکرار رشته (یعنی \"*\" * 5 می‌شه \"*****\" — ماژول ۱۱) و حلقه‌ای که هر دور یه خط چاپ می‌کنه. این دو تا رو که کنار هم بذاری، هر دورِ حلقه یه سطر از شکل رو می‌کشه.",
              },
              {
                type: "code",
                lang: "python",
                code: `for row in range(3):
    print("*" * 5)`,
                caption: { en: "Three rounds, three rows — a 3×5 star rectangle.", fa: "سه دور، سه سطر — یه مستطیل ستاره‌ای ۳×۵." },
              },
              {
                type: "tip",
                en: "The loop variable row decides HOW MANY rows appear — it never touches the stars. Width comes from the repetition.",
                fa: "متغیر row فقط تعیین می‌کنه «چند» سطر باشه — به ستاره‌ها کاری نداره. پهنای هر سطر رو تکرار رشته تعیین می‌کنه.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Make each row different", fa: "هر سطر فرق کنه" },
            blocks: [
              {
                type: "text",
                en: "A rectangle has equal rows. For a staircase, the width must DEPEND on the row number: row 1 → 1 star, row 2 → 2 stars... The key is range(1, n + 1), which counts 1 up to n — and i is right there to size each row.",
                fa: "مستطیل سطرهای برابر داشت. برای پله، پهنای هر سطر باید به «شمارهٔ خودش» بستگی داشته باشه: سطر ۱ یه ستاره، سطر ۲ دو ستاره و... کلید کار range(1, n + 1) ــه که از ۱ تا n می‌شماره — و i هم همین‌جاست تا اندازهٔ هر سطر رو بده.",
              },
              {
                type: "code",
                lang: "python",
                code: `n = 4
for i in range(1, n + 1):
    print("*" * i)`,
                caption: { en: "Four rows: 1, 2, 3, 4 stars — one full staircase.", fa: "چهار سطر با ۱ و ۲ و ۳ و ۴ ستاره — یه پلهٔ کامل." },
              },
              {
                type: "warn",
                en: "range(1, n + 1) — the +1 is not decoration! range(1, n) stops at n - 1 and your last stair goes missing.",
                fa: "‏range(1, n + 1) — اون ‎+1 تزئینی نیست! ‏range(1, n) تا n - 1 می‌ره و آخرین پله‌ات گم می‌شه.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does range(1, 4) count?", fa: "‏range(1, 4) چی رو می‌شماره؟" },
                options: [
                  { en: "1, 2, 3", fa: "‏۱ و ۲ و ۳" },
                  { en: "1, 2, 3, 4", fa: "‏۱ و ۲ و ۳ و ۴" },
                  { en: "0, 1, 2, 3", fa: "‏۰ و ۱ و ۲ و ۳" },
                  { en: "Only 4", fa: "فقط ۴" },
                ],
                answer: 0,
                explain: {
                  en: "The stop number is excluded: it counts 1, 2, 3 and stops before 4.",
                  fa: "عدد پایانی حساب نمی‌شه: ۱ و ۲ و ۳ رو می‌شماره و قبل از ۴ می‌ایسته.",
                },
              },
              {
                q: { en: "In the staircase loop, how many stars does row i print?", fa: "توی حلقهٔ پله، سطر i چند ستاره چاپ می‌کنه؟" },
                options: [
                  { en: "i stars", fa: "i تا ستاره" },
                  { en: "n stars", fa: "n تا ستاره" },
                  { en: "Always 1", fa: "همیشه ۱" },
                  { en: "i × n", fa: "i ضربدر n" },
                ],
                answer: 0,
                explain: {
                  en: "The row number IS the width: print(\"*\" * i).",
                  fa: "شمارهٔ سطر همون پهناست:‏ print(\"*\" * i).",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Star Staircase ⭐", fa: "پله‌های ستاره‌ای ⭐" },
            brief: {
              en: "Read n, then print the staircase: row 1 has 1 star, row 2 has 2 stars... row n has n stars.",
              fa: "‏n رو از ورودی بخون و بعد پلهٔ ستاره‌ای چاپ کن: سطر ۱ با ۱ ستاره، سطر ۲ با ۲ ستاره... تا سطر n با n ستاره.",
            },
            starter: `n = int(input())

# TODO: loop i from 1 to n  ->  range(1, n + 1)
# each round: print("*" * i)
`,
            solution: `n = int(input())

for i in range(1, n + 1):
    print("*" * i)`,
            hints: [
              {
                en: "The loop head is for i in range(1, n + 1): — i walks 1, 2, 3 ... n.",
                fa: "سرِ حلقه می‌شه for i in range(1, n + 1): — یعنی i روی ۱ و ۲ و ۳ تا n راه می‌ره.",
              },
              {
                en: "The body is a single line: print(\"*\" * i) — repetition does the drawing.",
                fa: "بدنه یه خط بیشتر نیست:‏ print(\"*\" * i) — تکرار رشته نقاشی می‌کنه.",
              },
              {
                en: "Test with n = 3 first: expect three rows — *, **, ***.",
                fa: "اول با n = 3 تست کن: باید سه سطر ببینی — * و ** و ***.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "3", expect: "*\n**\n***" },
                { stdin: "1", expect: "*", hidden: true },
                { stdin: "6", expect: "*\n**\n***\n****\n*****\n******", hidden: true },
              ],
            },
            sample: { stdin: "3", expect: "*\n**\n***" },
          },
        ],
      },
      {
        id: "py-m17-l2",
        title: { en: "Grids & Tables", fa: "شبکه و جدول‌ها" },
        goal: {
          en: "Nest two loops to walk a grid and build one clean output line per row.",
          fa: "دو حلقه تودرتو بچینی، شبکه رو بگردی و برای هر سطر یه خط خروجی تمیز بسازی.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Put one for INSIDE another and the inner loop finishes a FULL walk for every single step of the outer loop. Think rows and columns: the outer loop picks a row, the inner loop visits every cell in it.",
                fa: "یه for رو «داخل» for دیگه بذار؛ حلقهٔ داخلی برای «هر یک» قدمِ حلقهٔ بیرونی، یه دور کامل می‌زنه. مثل سطر و ستون: حلقهٔ بیرونی یه سطر انتخاب می‌کنه و حلقهٔ داخلی تک‌تک خانه‌های همون سطر رو می‌گرده.",
              },
              {
                type: "code",
                lang: "python",
                code: `for r in range(1, 3):
    for c in range(1, 3):
        print(f"({r},{c})")`,
                caption: { en: "(1,1), (1,2), (2,1), (2,2) — 2×2 = 4 lines, row by row.", fa: "‏(1,1) و (1,2) و (2,1) و (2,2) — دو در دو می‌شه ۴ خط، سطر به سطر." },
              },
              {
                type: "tip",
                en: "Count the runs: outer range(1, 3) gives 2 steps, inner gives 2 — the innermost line runs 2 × 2 = 4 times.",
                fa: "دورها رو بشمار:‏ range(1, 3) بیرونی ۲ قدم می‌ده و داخلی هم ۲ تا — پس آخرین خط ۲ × ۲ = ۴ بار اجرا می‌شه.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Collect the row, then join it", fa: "سطر رو جمع کن، بعد بچسبون" },
            blocks: [
              {
                type: "text",
                en: "Printing per cell makes one messy line each. The pro move: COLLECT the row's cells in a list inside the inner loop, then after it finishes, join them with spaces (join, from m6) and print ONE tidy line per row.",
                fa: "چاپ برای تک‌تک خانه‌ها یعنی برای هر خانه یه خط جدا — شلوغ! حرکت حرفه‌ای: خانه‌های هر سطر رو «داخل» حلقهٔ داخلی توی یه لیست جمع کن، بعد وقتی حلقه تموم شد با join (ماژول ۶) با فاصله بچسبونش و برای هر سطر «یه» خط مرتب چاپ کن.",
              },
              {
                type: "code",
                lang: "python",
                code: `for a in range(1, 4):
    cells = []
    for b in range(1, 4):
        cells.append(f"{a * b}")
    print(" ".join(cells))`,
                caption: { en: "Rows 1 2 3 / 2 4 6 / 3 6 9 — the 3×3 times table.", fa: "سطرهای 1 2 3 و 2 4 6 و 3 6 9 — جدول ضرب ۳×۳." },
              },
              {
                type: "warn",
                en: "cells = [] lives INSIDE the outer loop, right before the inner one. Put it outside and row 2 will be glued onto row 1's list!",
                fa: "‏cells = [] باید «داخل» حلقهٔ بیرونی و درست قبل از حلقهٔ داخلی باشه. اگه ببریش بیرون، سطر ۲ می‌چسبه به لیست سطر ۱!",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Outer loop runs 3 times, inner loop runs 4 times. How many times does the innermost line run?", fa: "حلقهٔ بیرونی ۳ بار و حلقهٔ داخلی ۴ بار می‌چرخه. آخرین خط چند بار اجرا می‌شه؟" },
                options: [
                  { en: "12", fa: "‏۱۲" },
                  { en: "7", fa: "‏۷" },
                  { en: "4", fa: "‏۴" },
                  { en: "3", fa: "‏۳" },
                ],
                answer: 0,
                explain: {
                  en: "Nested loops multiply: 3 × 4 = 12 full passes of the innermost code.",
                  fa: "حلقه‌های تودرتو در هم ضرب می‌شن: ۳ × ۴ = ۱۲ بار اجرای کاملِ آخرین خط.",
                },
              },
              {
                q: { en: "Why does cells = [] sit inside the outer loop?", fa: "چرا cells = [] داخل حلقهٔ بیرونیه؟" },
                options: [
                  { en: "So every row starts with a fresh, empty list", fa: "که هر سطر با یه لیست خالی و تازه شروع بشه" },
                  { en: "Because lists must be written twice", fa: "چون لیست‌ها باید دوبار نوشته بشن" },
                  { en: "To make the loop faster", fa: "که حلقه سریع‌تر بشه" },
                  { en: "It makes no difference", fa: "هیچ فرقی نداره" },
                ],
                answer: 0,
                explain: {
                  en: "Outside, the list keeps growing across rows. Inside, each row gets its own clean slate.",
                  fa: "بیرونِ حلقه، لیست مدام بزرگ‌تر می‌شه. داخلِ حلقه، هر سطر یه برگهٔ تمیز مال خودش می‌گیره.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Times Table Grid ✖️", fa: "جدول ضرب شبکه‌ای ✖️" },
            brief: {
              en: "Read n, then print the n×n times table: row a holds the products a×1 ... a×n, separated by single spaces.",
              fa: "‏n رو بخون و بعد جدول ضرب n×n رو چاپ کن: سطر a شامل حاصل‌های a×1 تا a×n ــه که با یه فاصله از هم جدا شدن.",
            },
            starter: `n = int(input())

# TODO: outer loop a from 1 to n
#   cells = []  (INSIDE the outer loop!)
#   inner loop b from 1 to n: append f"{a * b}" to cells
#   after the inner loop: print(" ".join(cells))
`,
            solution: `n = int(input())

for a in range(1, n + 1):
    cells = []
    for b in range(1, n + 1):
        cells.append(f"{a * b}")
    print(" ".join(cells))`,
            hints: [
              {
                en: "Two loops, same head shape: for a in range(1, n + 1): outside, for b in range(1, n + 1): inside.",
                fa: "دو تا حلقه با شکل یکسان:‏ for a in range(1, n + 1): بیرونی و for b in range(1, n + 1): داخلی.",
              },
              {
                en: "cells = [] goes right after the outer loop's colon — each row resets.",
                fa: "‏cells = [] درست بعد از دونقطهٔ حلقهٔ بیرونی میاد — هر سطر ریست می‌شه.",
              },
              {
                en: "Check n = 2 by hand: expect \"1 2\" then \"2 4\".",
                fa: "با n = 2 دستی چک کن: باید «1 2» و بعدش «2 4» چاپ بشه.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "3", expect: "1 2 3\n2 4 6\n3 6 9" },
                { stdin: "1", expect: "1", hidden: true },
                { stdin: "5", expect: "1 2 3 4 5\n2 4 6 8 10\n3 6 9 12 15\n4 8 12 16 20\n5 10 15 20 25", hidden: true },
              ],
            },
            sample: { stdin: "3", expect: "1 2 3\n2 4 6\n3 6 9" },
          },
        ],
      },
      {
        id: "py-m17-l3",
        title: { en: "Accumulator Patterns", fa: "الگوهای جمع‌کننده" },
        goal: {
          en: "Build sum, max and the max's position by hand — one loop, a few variables.",
          fa: "جمع و بیشترین و جایگاهش رو دستی بسازی — با یه حلقه و چند متغیر.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "sum(), max() and min() are shortcuts (m4) — but pros still know the HAND-ROLLED patterns, because some tools have no builtin at all. Pattern one, the running total: start total at 0 BEFORE the loop, add each item inside.",
                fa: "‏sum و max و min میان‌بر هستن (ماژول ۴) — ولی حرفه‌ای‌ها الگوهای «دستی» رو هم بلدن، چون بعضی ابزارها اصلاً تابع آماده ندارن. الگوی اول، جمع متحرک: ‏total رو قبل از حلقه روی ۰ بذار و داخل حلقه هر آیتم رو بهش اضافه کن.",
              },
              {
                type: "code",
                lang: "python",
                code: `nums = [7, 3, 9, 4]
total = 0
for x in nums:
    total += x
print(f"Sum: {total}")   # 23 — same as sum(nums)`,
                caption: { en: "One variable, one loop — the total grows round by round.", fa: "یه متغیر، یه حلقه — جمع، دور به دور بزرگ‌تر می‌شه." },
              },
              {
                type: "warn",
                en: "total = 0 goes BEFORE the loop. Inside the loop it resets every round and you'll sum only the last item.",
                fa: "‏total = 0 باید «قبل از» حلقه باشه. داخل حلقه هر دور ریست می‌شه و فقط آخرین آیتم جمع می‌شه!",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Best so far — and WHERE it lives", fa: "بهترین تا الان — و این‌که «کجاست»" },
            blocks: [
              {
                type: "text",
                en: "Pattern two, best-so-far: start best at the FIRST item (not 0!) and walk the list; whenever an item beats best, crown it. The superpower: when you update best, you can also remember WHERE it happened — the index.",
                fa: "الگوی دوم، بهترین-تا-الان: ‏best رو با «اولین» آیتم شروع کن (نه صفر!) و روی لیست راه برو؛ هر وقت آیتمی از best جلو زد، تاج رو به اون بده. قدرت اصلیش اینه: موقع به‌روز کردن best می‌تونی «کجا» بودنش رو هم یادت بمونه — یعنی اندیسش.",
              },
              {
                type: "code",
                lang: "python",
                code: `nums = [7, 3, 9, 4]
best = nums[0]
where = 0
for i in range(len(nums)):
    if nums[i] > best:
        best = nums[i]
        where = i
print(f"Best: {best} at index {where}")   # Best: 9 at index 2`,
                caption: { en: "One loop finds the value AND its address.", fa: "یه حلقه هم مقدار رو پیدا می‌کنه هم آدرسش رو." },
              },
              {
                type: "tip",
                en: "Why nums[0] and not 0? Imagine every score is negative — a starting best of 0 would win unfairly. The first item is always a fair start.",
                fa: "چرا nums[0] و نه 0؟ تصور کن همهٔ نمره‌ها منفی باشن — اون‌وقت best اولیهٔ ۰ به‌طرز ناعادلانه‌ای برنده می‌شه. اولین آیتم همیشه شروع منصفانه‌ایه.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why start best at nums[0] instead of 0?", fa: "چرا best رو با nums[0] شروع می‌کنیم نه با 0؟" },
                options: [
                  { en: "So it works even when every number is negative", fa: "که حتی وقتی همهٔ اعداد منفی‌ان هم درست کار کنه" },
                  { en: "Because it runs faster", fa: "چون سریع‌تر اجرا می‌شه" },
                  { en: "Because 0 is not a number", fa: "چون ۰ عدد نیست" },
                  { en: "No reason — it's a habit", fa: "دلیلی نداره — فقط عادته" },
                ],
                answer: 0,
                explain: {
                  en: "With best = 0 and nums = [-5, -2, -9], the answer would be a wrong 0.",
                  fa: "با best = 0 و لیست ‎[-5, -2, -9]‎ جواب اشتباه ۰ می‌شد.",
                },
              },
              {
                q: { en: "nums = [5, 5, 5] — how many times does best get updated (the check is strictly >)?", fa: "‏nums = [5, 5, 5] — ‏best چند بار به‌روز می‌شه (شرط اکیداً > ــه)؟" },
                options: [
                  { en: "0 — nothing beats the first 5", fa: "۰ — هیچی از پنجِ اول جلو نمی‌زنه" },
                  { en: "3 — once per item", fa: "۳ — برای هر آیتم یه بار" },
                  { en: "1 — only the last one", fa: "۱ — فقط آخری" },
                  { en: "2", fa: "‏۲" },
                ],
                answer: 0,
                explain: {
                  en: "5 > 5 is False every time — best stays the very first item.",
                  fa: "‏5 > 5 همیشه نادرسته — ‏best روی همون آیتم اول می‌مونه.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Peak Finder 🏔", fa: "یابندهٔ قله 🏔" },
            brief: {
              en: "Read n, then n numbers (one per line). NO sum() or max() — build them by hand. Print:\nMax: {best}\nSpot: {position, starting at 1}\nSum: {total}",
              fa: "اول n رو بخون، بعد n تا عدد (هر خط یکی). از sum و max «استفاده نکن» — دستی بسازشون. چاپ کن:\nMax: {بیشترین}\nSpot: {جایگاه، از ۱}\nSum: {جمع}",
            },
            starter: `n = int(input())
nums = []
for i in range(n):
    nums.append(int(input()))

total = 0
best = nums[0]
spot = 1
# TODO: one loop with range(n):
#   total += nums[i]
#   if nums[i] > best: best = nums[i] AND spot = i + 1
# then print Max, Spot, Sum
`,
            solution: `n = int(input())
nums = []
for i in range(n):
    nums.append(int(input()))

total = 0
best = nums[0]
spot = 1
for i in range(n):
    x = nums[i]
    total += x
    if x > best:
        best = x
        spot = i + 1
print(f"Max: {best}")
print(f"Spot: {spot}")
print(f"Sum: {total}")`,
            hints: [
              {
                en: "best = nums[0] and spot = 1 start BEFORE the loop — the first item is the champion until beaten.",
                fa: "‏best = nums[0] و ‏spot = 1 قبل از حلقه شروع می‌شن — اولین آیتم تا وقتی کسی ازش جلو نزنه، قهرمانه.",
              },
              {
                en: "Index i starts at 0, but Spot counts humans-style from 1 — that's why it's i + 1.",
                fa: "اندیس i از ۰ شروع می‌شه ولی Spot مثل آدم‌ها از ۱ می‌شماره — برای همینه که i + 1 ــه.",
              },
              {
                en: "Total and best-check share the SAME loop — no second sweep needed.",
                fa: "جمع و چکِ بیشترین توی «همون یه» حلقه هستن — دور دوم لازم نیست.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "4\n7\n3\n9\n4", expect: "Max: 9\nSpot: 3\nSum: 23" },
                { stdin: "3\n-5\n-2\n-9", expect: "Max: -2\nSpot: 2\nSum: -16", hidden: true },
                { stdin: "1\n42", expect: "Max: 42\nSpot: 1\nSum: 42", hidden: true },
              ],
            },
            sample: { stdin: "4\n7\n3\n9\n4", expect: "Max: 9\nSpot: 3\nSum: 23" },
          },
        ],
      },
      {
        id: "py-m17-l4",
        title: { en: "Mini-Project: The Bar Chart Reporter", fa: "پروژهٔ کوچک: دستیار نمودار میله‌ای" },
        goal: {
          en: "Ship a mini tool that reads items, draws text bars, and reports the total and the top item.",
          fa: "یه ابزار کوچیک بسازی که آیتم‌ها رو می‌خونه، نمودار متنی می‌کشه و جمع کل و پرفروش‌ترین رو گزارش می‌ده.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Real tools run on PAIRED lists: names[i] is the item, sales[i] is its number — two lists, one heartbeat. To walk both together you need the index, so the loop is for i in range(len(names)).",
                fa: "ابزارهای واقعی روی لیست‌های «جفت» کار می‌کنن: ‏names[i] اسم آیتمه و ‏sales[i] عددش — دو لیست، یه ضربان قلب. برای این‌که با هم جلو برن به اندیس نیاز داری؛ پس حلقه می‌شه for i in range(len(names)).",
              },
              {
                type: "code",
                lang: "python",
                code: `names = ["pen", "bag"]
sales = [3, 5]
for i in range(len(names)):
    print(f"{names[i]} sold {sales[i]}")`,
                caption: { en: "pen sold 3 / bag sold 5 — index i feeds BOTH lists.", fa: "‏pen فروخت ۳ و ‏bag فروخت ۵ — اندیس i هر دو لیست رو سیر می‌کنه." },
              },
              {
                type: "tip",
                en: "for name in names would only hand you the name — you'd have no way to reach the matching sales number.",
                fa: "اگه for name in names می‌نوشتی فقط اسم به دستت می‌رسید — دیگه راهی برای رسیدن به عدد فروشِ همون آیتم نداشتی.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "One loop, three jobs", fa: "یه حلقه، سه تا کار" },
            blocks: [
              {
                type: "text",
                en: "Now stack your m17 skills into one tool. Inside a single loop: draw the bar with \"#\" * count, feed the running total, and run the champion hunt for the best seller. After the loop: report Total and Top.",
                fa: "حالا مهارت‌های این ماژول رو توی یه ابزار روی هم سوار کن. داخل «یه» حلقه: نمودار رو با \"#\" * count بکش، جمع متحرک رو سیر کن و مسابقهٔ قهرمانی برای پرفروش‌ترین رو اجرا کن. بعد از حلقه هم Total و Top رو گزارش بده.",
              },
              {
                type: "code",
                lang: "python",
                code: `names = ["pen", "bag", "cup"]
sales = [3, 5, 2]
total = 0
top_name = ""
top_sales = 0
for i in range(len(names)):
    bar = "#" * sales[i]
    print(f"{names[i]}: {bar} ({sales[i]})")
    total += sales[i]
    if sales[i] > top_sales:
        top_sales = sales[i]
        top_name = names[i]
print(f"Total: {total}")
print(f"Top: {top_name}")`,
                caption: { en: "Bars, total and champion — one loop did all three jobs.", fa: "نمودار و جمع و قهرمان — یه حلقه هر سه کار رو کرد." },
              },
              {
                type: "warn",
                en: "top_sales starts at 0 and top_name at \"\" — the champion hunt needs BOTH memories, exactly like m17-l3.",
                fa: "‏top_sales با ۰ و ‏top_name با \"\" شروع می‌شن — مسابقهٔ قهرمانی به «هر دو» حافظه نیاز داره، دقیقاً مثل درس قبل.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does \"#\" * 3 produce?", fa: "خروجی \"#\" * 3 چیه؟" },
                options: [
                  { en: "###", fa: "‏###" },
                  { en: "An error", fa: "یه خطا" },
                  { en: "3", fa: "‏۳" },
                  { en: "#1#2#3", fa: "‏#1#2#3" },
                ],
                answer: 0,
                explain: {
                  en: "String × int repeats the string — three hashes, one bar.",
                  fa: "رشته ضربدر عدد یعنی تکرار رشته — سه تا مربع، یه نمودار.",
                },
              },
              {
                q: { en: "Why loop with range(len(names)) instead of for name in names?", fa: "چرا با range(len(names)) حلقه می‌زنیم نه با for name in names؟" },
                options: [
                  { en: "Because i is needed to grab the matching sales[i]", fa: "چون به i نیاز داریم تا sales[i] متناظر رو بگیریم" },
                  { en: "Because it's shorter to type", fa: "چون تایپش کوتاه‌تره" },
                  { en: "Because for name in names is broken", fa: "چون for name in names خرابه" },
                  { en: "No reason — both are identical here", fa: "دلیلی نیست — اینجا هر دو یکین" },
                ],
                answer: 0,
                explain: {
                  en: "The index is the bridge between the two lists — without it, sales is unreachable.",
                  fa: "اندیس پل بین دو لیستـه — بدون اون، ‏sales دست‌نیافتنی می‌شه.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Sales Bar Chart 📊", fa: "نمودار میله‌ای فروش 📊" },
            brief: {
              en: "Read n, then n lines like \"pen 3\" (name, space, count). For each item print exactly:\n{item}: {bar} ({count})\nwhere bar is \"#\" × count. Then:\nTotal: {sum of counts}\nTop: {item with the highest count}",
              fa: "اول n رو بخون، بعد n تا خط به شکل \"pen 3\" (اسم، فاصله، تعداد). برای هر آیتم دقیقاً چاپ کن:\n{آیتم}: {نمودار} ({تعداد})\nکه نمودار یعنی \"#\" به تعدادشون. بعدش:\nTotal: {جمع تعدادها}\nTop: {آیتمی که بیشترین تعداد رو داره}",
            },
            starter: `n = int(input())
names = []
sales = []
for i in range(n):
    parts = input().split()
    names.append(parts[0])
    sales.append(int(parts[1]))

total = 0
top_name = ""
top_sales = 0
# TODO: loop i over range(len(names)):
#   bar = "#" * sales[i]
#   print f"{names[i]}: {bar} ({sales[i]})"
#   total += sales[i]
#   if sales[i] > top_sales: remember top_name + top_sales
# after the loop: print Total and Top
`,
            solution: `n = int(input())
names = []
sales = []
for i in range(n):
    parts = input().split()
    names.append(parts[0])
    sales.append(int(parts[1]))

total = 0
top_name = ""
top_sales = 0
for i in range(len(names)):
    bar = "#" * sales[i]
    print(f"{names[i]}: {bar} ({sales[i]})")
    total += sales[i]
    if sales[i] > top_sales:
        top_sales = sales[i]
        top_name = names[i]
print(f"Total: {total}")
print(f"Top: {top_name}")`,
            hints: [
              {
                en: "The bar is built BEFORE the print: bar = \"#\" * sales[i].",
                fa: "نمودار «قبل از» چاپ ساخته می‌شه:‏ bar = \"#\" * sales[i].",
              },
              {
                en: "Three jobs in one loop body: draw, add to total, compare for the top.",
                fa: "سه تا کار توی یه بدنهٔ حلقه: بکش، به جمع اضافه کن، برای برترین مقایسه کن.",
              },
              {
                en: "The pen 3 / bag 5 / cup 2 case ends with Total: 10 and Top: bag.",
                fa: "حالت pen 3 و bag 5 و cup 2 آخرش می‌شه Total: 10 و ‏Top: bag.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "3\npen 3\nbag 5\ncup 2", expect: "pen: ### (3)\nbag: ##### (5)\ncup: ## (2)\nTotal: 10\nTop: bag" },
                { stdin: "2\ntea 4\njuice 1", expect: "tea: #### (4)\njuice: # (1)\nTotal: 5\nTop: tea", hidden: true },
                { stdin: "1\nkey 9", expect: "key: ######### (9)\nTotal: 9\nTop: key", hidden: true },
              ],
            },
            sample: { stdin: "3\npen 3\nbag 5\ncup 2", expect: "pen: ### (3)\nbag: ##### (5)\ncup: ## (2)\nTotal: 10\nTop: bag" },
          },
        ],
      },
    ],
  },
  {
    id: "py-m18",
    title: { en: "Clean Code Habits", fa: "عادت‌های کد تمیز" },
    blurb: {
      en: "Names that talk, small functions, plans on paper — the habits that make code a joy to reopen.",
      fa: "اسم‌هایی که حرف می‌زنن، تابع‌های کوچک و نقشه روی کاغذ — عادت‌هایی که دوباره باز کردنِ کد رو لذت‌بخش می‌کنن.",
    },
    lessons: [
      {
        id: "py-m18-l1",
        title: { en: "Names That Talk", fa: "اسم‌هایی که حرف می‌زنن" },
        goal: {
          en: "Rename variables with meaning and turn mystery numbers into named constants.",
          fa: "متغیرها رو معنادار اسم‌گذاری کنی و اعداد مرموز رو به ثابت‌های اسم‌دار تبدیل کنی.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Code is read far more often than it is written — by future-you, teammates, and graders! tp = 3 * 8 forces the reader to guess. total_price = ticket_count * price_per_ticket reads like a sentence. Rule one of clean code: the name says WHAT the value is.",
                fa: "کد خیلی بیشتر «خونده» می‌شه تا نوشته — توسط توِ آینده، هم‌تیمی‌ها و حتی تصحیح‌کننده! ‏tp = 3 * 8 یعنی خواننده باید حدس بزنه. ولی ‏total_price = ticket_count * price_per_ticket مثل یه جملهٔ خوانا می‌شه. قانون اول کد تمیز: اسم بگه «این مقدار چیه».",
              },
              {
                type: "code",
                lang: "python",
                code: `# hard to read
tp = 3 * 8

# reads like a sentence
ticket_count = 3
price_per_ticket = 8
total_price = ticket_count * price_per_ticket
print(total_price)`,
                caption: { en: "Same math, different futures — one version you'll understand in a month.", fa: "یه ریاضی، دو تا آینده — یه نسخه رو یه ماه دیگه هم می‌فهمی." },
              },
              {
                type: "tip",
                en: "The one classic exception: i, j for loop indexes — every coder on Earth reads them instantly.",
                fa: "یه استثنای کلاسیک هم هست: ‏i و j برای اندیس حلقه — هر برنامه‌نویسی روی زمین فوری می‌فهمتشون.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Magic numbers → named constants", fa: "اعداد مرموز → ثابت‌های اسم‌دار" },
            blocks: [
              {
                type: "text",
                en: "A bare 8 sitting in the middle of code is a MAGIC NUMBER — 8 what? 8 legs? 8 toman? Pull every fixed value to the TOP of the file and give it a LOUD name in ALL_CAPS. That's a constant: set once, never changed.",
                fa: "یه ۸ تنها و وسط کد یه «عدد مرموز» ــه — هشت چی؟ هشت تا پا؟ هشت تومن؟ هر مقدار ثابت رو بیار «بالای» فایل و بهش یه اسم بلند و با حروف بزرگ بده (ALL_CAPS). به این می‌گن ثابت: یه بار تعیین می‌شه، هیچ‌وقت عوض نمی‌شه.",
              },
              {
                type: "code",
                lang: "python",
                code: `PRICE_PER_TICKET = 8

tickets = 3
total = tickets * PRICE_PER_TICKET
print(f"Total: {total}$")`,
                caption: { en: "Next price change? Edit ONE obvious line at the top.", fa: "دفعهٔ بعد که قیمت عوض شد؟ فقط یه خطِ واضح رو بالای فایل ویرایش می‌کنی." },
              },
              {
                type: "warn",
                en: "Magic numbers hide meaning and multiply bugs: the same 8 pasted in five places means five places to forget.",
                fa: "اعداد مرموز معنی رو قایم می‌کنن و باگ تکثیر می‌کنن: همون ۸ که پنج جا کپی شده، یعنی پنج جا برای فراموش‌کردن.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "A variable holds how many lives a player has left. Best name?", fa: "یه متغیر نگه می‌داره که بازیکن چند جون داره. بهترین اسم؟" },
                options: [
                  { en: "lives_left", fa: "‏lives_left" },
                  { en: "x", fa: "‏x" },
                  { en: "data1", fa: "‏data1" },
                  { en: "thing", fa: "‏thing" },
                ],
                answer: 0,
                explain: {
                  en: "The name should say what the value IS — lives_left needs zero guessing.",
                  fa: "اسم باید بگه مقدار «چیه» — ‏lives_left هیچ حدسی نمی‌خواد.",
                },
              },
              {
                q: { en: "What is a magic number?", fa: "عدد مرموز چیه؟" },
                options: [
                  { en: "A bare number in code with no name explaining it", fa: "یه عدد تنها توی کد که هیچ اسمی معنیش رو نمی‌گه" },
                  { en: "A number that crashes the program", fa: "عددی که برنامه رو کرش می‌کنه" },
                  { en: "A random number", fa: "یه عدد تصادفی" },
                  { en: "The number 8 specifically", fa: "مخصوصاً عدد ۸" },
                ],
                answer: 0,
                explain: {
                  en: "If the meaning lives only in your head, promote it to a named constant.",
                  fa: "اگه معناش فقط توی سرِ توئه، ارتقاش بده به یه ثابت اسم‌دار.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Cinema Ticket Desk 🎬", fa: "گیشهٔ سینما 🎬" },
            brief: {
              en: "Write it like a pro: constants PRICE_STUDENT = 8 and PRICE_ADULT = 15 at the top. Read the number of student tickets, then adult tickets. Print exactly:\nStudents: {n}\nAdults: {n}\nTotal: {students×8 + adults×15}",
              fa: "مثل یه حرفه‌ای بنویس: ثابت‌های PRICE_STUDENT = 8 و PRICE_ADULT = 15 رو بالای فایل بذار. تعداد بلیت دانش‌آموزی رو بخون، بعد بلیت بزرگسال. بعد دقیقاً چاپ کن:\nStudents: {تعداد}\nAdults: {تعداد}\nTotal: {دانش‌آموز×۸ + بزرگسال×۱۵}",
            },
            starter: `PRICE_STUDENT = 8
PRICE_ADULT = 15

# TODO: read students = int(input()) and adults = int(input())
# compute the two subtotals, then the total — with CLEAR names
# print the three lines exactly
`,
            solution: `PRICE_STUDENT = 8
PRICE_ADULT = 15

students = int(input())
adults = int(input())

student_total = students * PRICE_STUDENT
adult_total = adults * PRICE_ADULT
total = student_total + adult_total

print(f"Students: {students}")
print(f"Adults: {adults}")
print(f"Total: {total}")`,
            hints: [
              {
                en: "Two subtotals with clear names, then total = student_total + adult_total.",
                fa: "دو تا جمع جزئی با اسم‌های واضح، بعدش ‏total = student_total + adult_total.",
              },
              {
                en: "No magic numbers in the math — only PRICE_STUDENT and PRICE_ADULT.",
                fa: "توی محاسبات هیچ عدد مرموزی نباشه — فقط PRICE_STUDENT و PRICE_ADULT.",
              },
              {
                en: "Check 3 + 2 by hand: 24 + 30 → Total: 54.",
                fa: "حالت ۳ و ۲ رو دستی چک کن: ‏۲۴ + ۳۰ یعنی Total: 54.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "3\n2", expect: "Students: 3\nAdults: 2\nTotal: 54" },
                { stdin: "0\n4", expect: "Students: 0\nAdults: 4\nTotal: 60", hidden: true },
                { stdin: "5\n5", expect: "Students: 5\nAdults: 5\nTotal: 115", hidden: true },
              ],
            },
            sample: { stdin: "3\n2", expect: "Students: 3\nAdults: 2\nTotal: 54" },
          },
        ],
      },
      {
        id: "py-m18-l2",
        title: { en: "One Function, One Job", fa: "یه تابع، یه کار" },
        goal: {
          en: "Spot repeated code, promote it into a small named function, and reuse it everywhere.",
          fa: "کد تکراری رو پیدا کنی، ارتقاش بدی به یه تابع کوچکِ اسم‌دار و همه‌جا ازش استفاده کنی.",
        },
        minutes: 9,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Three copy-pasted greeting blocks means three places to fix a typo — and sooner or later one of them WILL be forgotten. Clean code promotes repetition: write def greet(name) once, call it three times. One copy, zero drift.",
                fa: "سه تا بلوک خوش‌آمدگوییِ کپی‌پیست‌شده یعنی سه جا برای درست کردن یه غلط املایی — و دیر یا زود یه‌جاش «حتماً» فراموش می‌شه. کد تمیز تکرار رو ارتقا می‌ده: یه بار def greet(name) رو بنویس، سه بار صداش بزن. یه نسخه، بدون واگرایی.",
              },
              {
                type: "code",
                lang: "python",
                code: `def greet(name):
    print(f"Welcome {name}!")

greet("ana")
greet("raj")
greet("kim")`,
                caption: { en: "Fix the welcome in ONE place — all three calls benefit.", fa: "خوش‌آمدگویی رو توی «یه» جا درست کن — هر سه صدا زدن بهره‌مند می‌شن." },
              },
              {
                type: "tip",
                en: "Copied code drifts apart over time: someone edits block 2, forgets block 3. A function can't drift — there's only one copy.",
                fa: "کد کپی‌شده به‌مرور از هم می‌پاشه: یکی بلوک ۲ رو درست می‌کنه و بلوک ۳ رو یادش می‌ره. تابع نمی‌تونه بپاشه — فقط یه نسخه ازش هست.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Decisions live in functions too", fa: "تصمیم‌ها هم توی تابع زندگی می‌کنن" },
            blocks: [
              {
                type: "text",
                en: "The most reusable functions RETURN their answer (m5-l2): the decision ladder goes inside, the caller stays clean. shipping(weight) below answers one question — what does this parcel cost? — and nothing else.",
                fa: "کاربردی‌ترین توابع، جوابشون رو «برمی‌گردونن» (درس ۲ از ماژول ۵): نردبان تصمیم می‌ره داخل تابع و صدازنده تمیز می‌مونه. تابع shipping(weight) پایین فقط به یه سؤال جواب می‌ده — این مرسوله چقدر هزینه داره؟ — و هیچ کار دیگه‌ای هم نمی‌کنه.",
              },
              {
                type: "code",
                lang: "python",
                code: `def shipping(weight):
    if weight < 2:
        return 5
    elif weight < 10:
        return 9
    else:
        return 15

print(shipping(1))
print(shipping(3))
print(shipping(12))`,
                caption: { en: "5, 9, 15 — three parcels, one ladder.", fa: "‏۵ و ۹ و ۱۵ — سه تا مرسوله، یه نردبان." },
              },
              {
                type: "warn",
                en: "Define the function ABOVE the code that calls it — Python reads top to bottom (m12's rule).",
                fa: "تابع رو «بالای» کدی که صداش می‌زنه تعریف کن — پایتون از بالا به پایین می‌خونه (قانون ماژول ۱۲).",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "How many jobs should one function have?", fa: "یه تابع باید چند تا کار انجام بده؟" },
                options: [
                  { en: "Exactly one", fa: "دقیقاً یه کار" },
                  { en: "As many as fit on screen", fa: "هر چقدر که توی صفحه جا شه" },
                  { en: "At least two", fa: "حداقل دو تا" },
                  { en: "None — functions only print", fa: "هیچی — تابع‌ها فقط چاپ می‌کنن" },
                ],
                answer: 0,
                explain: {
                  en: "One job = a name that says it, a body that does it, and easy testing.",
                  fa: "یه کار یعنی اسمی که همون رو بگه، بدنه‌ای که همون رو بکنه و تستش هم راحت باشه.",
                },
              },
              {
                q: { en: "The real win of replacing 3 copied blocks with one function?", fa: "سود واقعی جایگزین‌کردن ۳ بلوک کپی‌شده با یه تابع چیه؟" },
                options: [
                  { en: "Fix once — every call gets the fix", fa: "یه بار درست می‌کنی — همهٔ صدا زدن‌ها درست می‌شن" },
                  { en: "The program runs faster", fa: "برنامه سریع‌تر اجرا می‌شه" },
                  { en: "It uses less memory", fa: "حافظهٔ کمتری مصرف می‌شه" },
                  { en: "The file gets longer", fa: "فایل بلندتر می‌شه" },
                ],
                answer: 0,
                explain: {
                  en: "Speed is irrelevant here — the win is one source of truth.",
                  fa: "اینجا سرعت مهم نیست — سود اصلی اینه که یه منبع حقیقت داری.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Shipping Desk 📦", fa: "بخش ارسال مرسوله 📦" },
            brief: {
              en: "Write shipping(weight) that RETURNS: 5 for weights under 2, 9 for weights under 10, else 15. Read n, then n weights; print \"{w} kg -> {cost}$\" per parcel, then \"Total: {sum}$\".",
              fa: "تابع shipping(weight) رو بنویس که این‌ها رو «برگردونه»: وزن کمتر از ۲ یعنی ۵، کمتر از ۱۰ یعنی ۹، وگرنه ۱۵. اول n رو بخون و بعد n تا وزن؛ برای هر مرسوله چاپ کن \"{w} kg -> {هزینه}$\" و آخرش \"Total: {جمع}$\".",
            },
            starter: `# TODO: def shipping(weight): -> 5 / 9 / 15  (return, not print!)

n = int(input())
total = 0
# loop n times:
#   w = int(input())
#   cost = shipping(w)
#   print f"{w} kg -> {cost}$"
#   total += cost
# after the loop: print f"Total: {total}$"
`,
            solution: `def shipping(weight):
    if weight < 2:
        return 5
    elif weight < 10:
        return 9
    else:
        return 15

n = int(input())
total = 0
for i in range(n):
    w = int(input())
    cost = shipping(w)
    print(f"{w} kg -> {cost}$")
    total += cost
print(f"Total: {total}$")`,
            hints: [
              {
                en: "The ladder: weight < 2 first, then weight < 10, then else — lowest tier first.",
                fa: "نردبان: اول weight < 2 بعد weight < 10 و آخرش else — پلهٔ پایین اول.",
              },
              {
                en: "Inside the function: return 5 — NOT print(5). Printing belongs to the loop.",
                fa: "داخل تابع:‏ return 5 — نه print(5). چاپ کردن کارِ حلقه‌ست.",
              },
              {
                en: "Boundary check: weight 2 is NOT under 2, so it pays 9. Weight 10 pays 15.",
                fa: "چک مرزی: وزن ۲ «کمتر از» ۲ نیست، پس ۹ می‌پردازه. وزن ۱۰ می‌شه ۱۵.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "3\n1\n3\n12", expect: "1 kg -> 5$\n3 kg -> 9$\n12 kg -> 15$\nTotal: 29$" },
                { stdin: "2\n2\n10", expect: "2 kg -> 9$\n10 kg -> 15$\nTotal: 24$", hidden: true },
                { stdin: "1\n0", expect: "0 kg -> 5$\nTotal: 5$", hidden: true },
              ],
            },
            sample: { stdin: "3\n1\n3\n12", expect: "1 kg -> 5$\n3 kg -> 9$\n12 kg -> 15$\nTotal: 29$" },
          },
        ],
      },
      {
        id: "py-m18-l3",
        title: { en: "Plan First, Code Second", fa: "اول نقشه، بعد کد" },
        goal: {
          en: "Turn a plain-language plan into # comments, then fill each step with real code.",
          fa: "نقشهٔ ساده و فارسی رو به کامنت‌های # تبدیل کنی و بعد زیر هر قدم، کد واقعی بذاری.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Pros don't stare at a blank file. They write the STEPS as # comments first — plain words, no code — then solve one step at a time, right under its comment. Each comment becomes a little TODO box that can't hide.",
                fa: "حرفه‌ای‌ها به فایل خالی زل نمی‌زنن. اول «قدم‌ها» رو به شکل کامنت‌های # می‌نویسن — با کلمات ساده، بدون کد — و بعد مرحله به مرحله درست زیر همون کامنت‌ها حلشون می‌کنن. هر کامنت می‌شه یه جعبهٔ TODO کوچیک که نمی‌تونه قایم شه.",
              },
              {
                type: "code",
                lang: "python",
                code: `# Plan: doubles every number in the list
# 1. make a list nums
# 2. make an empty list doubled
# 3. loop: append x * 2
# 4. print doubled

nums = [3, 7, 2]
doubled = []
for x in nums:
    doubled.append(x * 2)
print(doubled)`,
                caption: { en: "The plan IS the structure — code just fills the boxes.", fa: "نقشه همون ساختاره — کد فقط جعبه‌ها رو پر می‌کنه." },
              },
              {
                type: "tip",
                en: "Stuck later? The plan tells you exactly WHICH step is stuck — step 3, not \"everything\".",
                fa: "بعداً گیر کردی؟ نقشه دقیقاً می‌گه کدوم قدم گیر کرده — قدم ۳، نه «همه‌چیز».",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Plan the output on paper", fa: "خروجی رو روی کاغذ نقشه بکش" },
            blocks: [
              {
                type: "text",
                en: "Second habit: before any code, write the EXACT lines you want to see on paper. Want a scoreboard? Sketch \"sara: 18 points\" first. From the target output you work BACKWARDS: which data? which loop? which f-string? Then test with the tiniest case — one player — before the big run.",
                fa: "عادت دوم: قبل از هر کدی، خط‌هایی که «دقیقاً» می‌خوای ببینی رو روی کاغذ بنویس. تابلوی امتیاز می‌خوای؟ اول \"sara: 18 points\" رو بکش. از خروجیِ هدف به عقب برمی‌گردی: چه داده‌ای؟ کدوم حلقه؟ کدوم f-string؟ بعدش با کوچیک‌ترین حالت تست کن — یه بازیکن — قبل از اجرای بزرگ.",
              },
              {
                type: "warn",
                en: "Coding without a plan isn't faster — you just pay the time back with interest during debugging.",
                fa: "کدزدن بدون نقشه سریع‌تر نیست — فقط وقتش رو با بهرهٔ سنگین موقع دیباگ پس می‌دی.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What goes inside plan comments?", fa: "داخل کامنت‌های نقشه چی نوشته می‌شه؟" },
                options: [
                  { en: "Steps in plain words — no code yet", fa: "قدم‌ها با کلمات ساده — هنوز کدی در کار نیست" },
                  { en: "The final answer", fa: "جواب نهایی" },
                  { en: "Only variable names", fa: "فقط اسم متغیرها" },
                  { en: "Nothing — they stay empty", fa: "هیچی — خالی می‌مونن" },
                ],
                answer: 0,
                explain: {
                  en: "Plain words first, code second — the comment is the promise, the code keeps it.",
                  fa: "اول کلمات ساده، بعد کد — کامنت قولـه و کد همون قول رو عملی می‌کنه.",
                },
              },
              {
                q: { en: "The right order of work?", fa: "ترتیب درست کار چیه؟" },
                options: [
                  { en: "Plan → code → test", fa: "نقشه → کد → تست" },
                  { en: "Code → plan → test", fa: "کد → نقشه → تست" },
                  { en: "Test → code → plan", fa: "تست → کد → نقشه" },
                  { en: "Code → test → plan", fa: "کد → تست → نقشه" },
                ],
                answer: 0,
                explain: {
                  en: "Plan first, fill it with code, then check against your paper output.",
                  fa: "اول نقشه، بعد پر کردنش با کد، و آخرش چک با خروجیِ کاغذی.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Follow the Plan 📋", fa: "نقشه رو اجرا کن 📋" },
            brief: {
              en: "The starter IS the plan — keep the comments, fill the code under each. Read n, then n lines \"name score\" into a dict. Print \"{name}: {score} points\" per player, then:\nTotal: {sum}\nTop: {highest scorer}",
              fa: "استارتر «خودِ نقشه»ست — کامنت‌ها رو نگه دار و زیر هر کدوم کدش رو بذار. اول n رو بخون و بعد n تا خط \"name score\" رو بریز توی یه دیکشنری. برای هر بازیکن چاپ کن \"{name}: {نمره} points\" و آخرش:\nTotal: {جمع}\nTop: {اسمِ صاحب بالاترین نمره}",
            },
            starter: `# Plan: the mini scoreboard
# 1. read n, then n lines "name score" -> dict scores
# 2. loop: print "{name}: {score} points"
# 3. champion hunt: total + top
# 4. print "Total: ..." and "Top: ..."

n = int(input())
scores = {}
# TODO: step 1 — fill the dict

# TODO: step 2 — the report loop

# TODO: step 3 — total = 0, top = "", top_points = 0, one loop

# TODO: step 4 — the two final lines
`,
            solution: `# Plan: the mini scoreboard
# 1. read n, then n lines "name score" -> dict scores
# 2. loop: print "{name}: {score} points"
# 3. champion hunt: total + top
# 4. print "Total: ..." and "Top: ..."

n = int(input())
scores = {}
for i in range(n):
    parts = input().split()
    name = parts[0]
    points = int(parts[1])
    scores[name] = points

for name in scores:
    print(f"{name}: {scores[name]} points")

total = 0
top = ""
top_points = 0
for name in scores:
    total += scores[name]
    if scores[name] > top_points:
        top_points = scores[name]
        top = name

print(f"Total: {total}")
print(f"Top: {top}")`,
            hints: [
              {
                en: "Step 1 is the parse pattern: parts = input().split(), then scores[parts[0]] = int(parts[1]).",
                fa: "قدم ۱ الگوی پردازشه:‏ parts = input().split() و بعدش ‏scores[parts[0]] = int(parts[1]).",
              },
              {
                en: "for name in scores: walks the keys — scores[name] reaches each number.",
                fa: "‏for name in scores: روی کلیدها راه می‌ره — ‏scores[name] به هر عدد می‌رسه.",
              },
              {
                en: "Steps 3 and 4: the champion hunt is the m17 pattern — top_points starts at 0, top at \"\".",
                fa: "قدم ۳ و ۴: مسابقهٔ قهرمانی همون الگوی ماژول ۱۷ ــه — ‏top_points با ۰ و ‏top با \"\" شروع می‌شه.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "3\nsara 18\namir 15\nmaya 21", expect: "sara: 18 points\namir: 15 points\nmaya: 21 points\nTotal: 54\nTop: maya" },
                { stdin: "2\nzoe 9\nali 12", expect: "zoe: 9 points\nali: 12 points\nTotal: 21\nTop: ali", hidden: true },
                { stdin: "1\nkim 7", expect: "kim: 7 points\nTotal: 7\nTop: kim", hidden: true },
              ],
            },
            sample: { stdin: "3\nsara 18\namir 15\nmaya 21", expect: "sara: 18 points\namir: 15 points\nmaya: 21 points\nTotal: 54\nTop: maya" },
          },
        ],
      },
      {
        id: "py-m18-l4",
        title: { en: "Rescue the Messy Script", fa: "نجات اسکریپت شلوغ" },
        goal: {
          en: "Refactor a working-but-messy script with renames, constants and a helper — output untouched.",
          fa: "یه اسکریپتِ کارا ولی شلوغ رو بازسازی کنی — با تغییر اسم، ثابت و تابع کمکی؛ بدون اینکه خروجی ذره‌ای عوض شه.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "REFACTORING = same behavior, better shape. Meet the suspect: it runs, it's correct... and it's a maze of a, b and mystery numbers. The four cleanup moves: ① rename everything honestly, ② pull constants to the top, ③ promote repeated patterns into a helper, ④ comment the WHY.",
                fa: "‏REFACTORING یعنی همون رفتار، شکلِ بهتر. با متهم آشنا شو: اجرا می‌شه، درسته... ولی یه هزارتوی متغیرهای a و b و اعداد مرموزه. چهار حرکت پاک‌سازی: ۱) همه‌چیز رو صادقانه اسم‌گذاری کن، ۲) ثابت‌ها رو بیار بالا، ۳) الگوهای تکراری رو ببر توی تابع کمکی، ۴) کامنت بذار برای «چرا».",
              },
              {
                type: "code",
                lang: "python",
                code: `# the suspect: works, but who can maintain it?
a = 7
b = 5
print("RECEIPT")
print(f"Burger: {a} x 12 = {a * 12}")
print(f"Fries: {b} x 5 = {b * 5}")
print(f"Total: {a * 12 + b * 5}")`,
                caption: { en: "It runs (a = 7 burgers, b = 5 fries) — but 12 and 5 are mysteries, and a tells you nothing.", fa: "اجرا می‌شه (‏a یعنی ۷ تا برگر و ‏b یعنی ۵ تا سیب‌زمینی) — ولی ۱۲ و ۵ مرموزن و a هم هیچی نمی‌گه." },
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Same output, new shape", fa: "همون خروجی، شکل نو" },
            blocks: [
              {
                type: "text",
                en: "The clean version below prints EXACTLY the same lines — refactor never changes behavior, only shape. Burger math lives in one helper, prices live in constants, names tell the truth. Pro move: note the output before refactoring, run after, compare.",
                fa: "نسخهٔ تمیز پایین «دقیقاً» همون خط‌ها رو چاپ می‌کنه — بازسازی هیچ‌وقت رفتار رو عوض نمی‌کنه، فقط شکل رو. ریاضیِ برگر توی یه تابع کمکیه، قیمت‌ها توی ثابت‌ها ان و اسم‌ها راست‌گون. حرکت حرفه‌ای: قبل از بازسازی خروجی رو یادداشت کن، بعد اجرا کن، مقایسه کن.",
              },
              {
                type: "code",
                lang: "python",
                code: `PRICE_BURGER = 12
PRICE_FRIES = 5

def line(item, count, price):
    return f"{item}: {count} x {price} = {count * price}"

burgers = 7
fries = 5
print("RECEIPT")
print(line("Burger", burgers, PRICE_BURGER))
print(line("Fries", fries, PRICE_FRIES))
print(f"Total: {burgers * PRICE_BURGER + fries * PRICE_FRIES}")`,
                caption: { en: "Three prices change? Still one obvious place each.", fa: "سه تا قیمت هم عوض شه؟ باز هم هر کدوم یه جای واضح و مشخص." },
              },
              {
                type: "tip",
                en: "The helper line() doesn't print — it RETURNS the string. The caller decides what happens to it.",
                fa: "تابع کمکی line چاپ نمی‌کنه — «برمی‌گردونه». تصمیم دربارهٔ رشته با صدازنده‌ست.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What must stay identical after refactoring?", fa: "بعد از بازسازی چی باید دست‌نخورده بمونه؟" },
                options: [
                  { en: "The output — the behavior", fa: "خروجی — یعنی رفتار برنامه" },
                  { en: "The variable names", fa: "اسم متغیرها" },
                  { en: "The number of lines", fa: "تعداد خط‌ها" },
                  { en: "The comments", fa: "کامنت‌ها" },
                ],
                answer: 0,
                explain: {
                  en: "Refactoring reshapes code, not results — same in, same out.",
                  fa: "بازسازی شکل کد رو عوض می‌کنه نه نتیجه‌ش رو — ورودی و خروجی همونه.",
                },
              },
              {
                q: { en: "The messy script uses the bare number 12 in three places. First move?", fa: "اسکریپت شلوغ عدد ۱۲ رو توی سه جا به کار برده. اولین حرکت؟" },
                options: [
                  { en: "One constant PRICE_BURGER = 12 at the top", fa: "یه ثابت PRICE_BURGER = 12 بالای فایل" },
                  { en: "Delete the number", fa: "عدد رو پاک کنی" },
                  { en: "Replace it with a random value", fa: "با یه عدد تصادفی جایگزینش کنی" },
                  { en: "Copy it to five more places", fa: "به پنج جای دیگه کپیش کنی" },
                ],
                answer: 0,
                explain: {
                  en: "Named constant at the top — meaning restored, one place to change.",
                  fa: "ثابت اسم‌دار بالای فایل — هم معنی برمی‌گرده هم فقط یه جا برای تغییر.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "The Clean-Up Crew 🧹", fa: "گروه پاک‌سازی 🧹" },
            brief: {
              en: "The starter WORKS — the checker only sees its output, but your future self sees the code. Rewrite it clean (constants, clear names, a line() helper) keeping the output EXACTLY:\nRECEIPT\nBurger: {b} x 12 = {b×12}\nFries: {f} x 5 = {f×5}\nTotal: {b×12 + f×5}",
              fa: "استارتر «کار می‌کنه» — تصحیح‌کننده فقط خروجی رو می‌بینه، ولی توِ آینده کد رو می‌بینه. تمیزش کن (ثابت، اسم واضح، تابع کمکی line) و خروجی رو «مو‌به‌مو» حفظ کن:\nRECEIPT\nBurger: {b} x 12 = {b×۱۲}\nFries: {f} x 5 = {f×۵}\nTotal: {b×۱۲ + f×۵}",
            },
            starter: `# the suspect — it works, but it's a maze:
a = int(input())
b = int(input())
print("RECEIPT")
print(f"Burger: {a} x 12 = {a * 12}")
print(f"Fries: {b} x 5 = {b * 5}")
print(f"Total: {a * 12 + b * 5}")

# TODO: rewrite it clean — SAME output:
# 1. PRICE_BURGER = 12 and PRICE_FRIES = 5 at the top
# 2. def line(item, count, price): return the formatted string
# 3. burgers / fries with real names
# 4. same RECEIPT, same three lines — nothing else
`,
            solution: `PRICE_BURGER = 12
PRICE_FRIES = 5

def line(item, count, price):
    return f"{item}: {count} x {price} = {count * price}"

burgers = int(input())
fries = int(input())
print("RECEIPT")
print(line("Burger", burgers, PRICE_BURGER))
print(line("Fries", fries, PRICE_FRIES))
print(f"Total: {burgers * PRICE_BURGER + fries * PRICE_FRIES}")`,
            hints: [
              {
                en: "line(\"Burger\", burgers, PRICE_BURGER) must produce \"Burger: 7 x 12 = 84\" — spaces and all.",
                fa: "‏line(\"Burger\", burgers, PRICE_BURGER) باید \"Burger: 7 x 12 = 84\" رو بسازه — با همهٔ فاصله‌هاش.",
              },
              {
                en: "The total line still needs the multiplication — with the constants now, not bare numbers.",
                fa: "خط Total همچنان ضرب لازم داره — ولی این‌بار با ثابت‌ها، نه عدد لخت.",
              },
              {
                en: "Compare with the messy output for 7 and 5: Total must be 109 either way.",
                fa: "با خروجی نسخهٔ شلوغ برای ۷ و ۵ مقایسه کن: Total باید تو هر دو حالت ۱۰۹ بشه.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "7\n5", expect: "RECEIPT\nBurger: 7 x 12 = 84\nFries: 5 x 5 = 25\nTotal: 109" },
                { stdin: "2\n4", expect: "RECEIPT\nBurger: 2 x 12 = 24\nFries: 4 x 5 = 20\nTotal: 44", hidden: true },
                { stdin: "0\n3", expect: "RECEIPT\nBurger: 0 x 12 = 0\nFries: 3 x 5 = 15\nTotal: 15", hidden: true },
              ],
            },
            sample: { stdin: "7\n5", expect: "RECEIPT\nBurger: 7 x 12 = 84\nFries: 5 x 5 = 25\nTotal: 109" },
          },
        ],
      },
    ],
  },
  {
    id: "py-m19",
    title: { en: "Final Projects", fa: "پروژه‌های پایانی" },
    blurb: {
      en: "Four capstones that stack everything: crack a vault, print receipts, run a dungeon, file a grade report.",
      fa: "چهار پروژهٔ پایانی که همه‌چیز رو روی هم سوار می‌کنن: شکستن گاوصندوق، فاکتور فروش، گردش توی دِنج و کارنامهٔ کلاس.",
    },
    lessons: [
      {
        id: "py-m19-l1",
        title: { en: "Capstone 1: The Vault Code", fa: "پروژهٔ پایانی ۱: رمز گاوصندوق" },
        goal: {
          en: "Ship a guess-the-code game with a fixed secret, three tries and a real lose state.",
          fa: "یه بازی حدسِ رمز بسازی با راز ثابت، سه تلاش و یه باختِ واقعی.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "m8's hunt froze random with a seed. This capstone goes one step further: a fixed constant. SECRET = 17 at the top — the same game for every player, every run, forever. Easy to test, easy to grade, easy to tune. MAX_TRIES = 3 joins it — both ALL_CAPS constants.",
                fa: "شکارِ ماژول ۸ تصادف رو با seed منجمد می‌کرد. این پروژه یه قدم جلوتر می‌ره: ثابتِ ثابت. ‏SECRET = 17 بالای فایل — یه بازی یکسان برای هر بازیکن، هر بار، تا ابد. راحت برای تست، راحت برای نمره‌دادن، راحت برای تغییر. ‏MAX_TRIES = 3 هم کنارش می‌شینه — هر دو ثابت با حروف بزرگ.",
              },
              {
                type: "code",
                lang: "python",
                code: `SECRET = 17
MAX_TRIES = 3

print(f"Peek (for testing): {SECRET}")`,
                caption: { en: "Two constants, zero surprises — determinism on purpose.", fa: "دو تا ثابت، صفر غافلگیری — تصادفی‌نبودن، عمداً." },
              },
              {
                type: "tip",
                en: "Want a harder game? Change ONE line at the top. That's constants doing their job.",
                fa: "بازی سخت‌تر می‌خوای؟ فقط یه خط بالای فایل رو عوض کن. این یعنی کارِ ثابت‌ها.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The win/lose flag", fa: "پرچم برد و باخت" },
            blocks: [
              {
                type: "text",
                en: "A game with limited tries needs a MEMORY: cracked = False before the loop, True the moment it opens. After the loop, if not cracked → the vault stays shut. This tiny flag pattern powers every win/lose game you'll ever build.",
                fa: "بازی با تعداد تلاش محدود یه «حافظه» می‌خواد: ‏cracked = False قبل از حلقه و True لحظه‌ای که باز می‌شه. بعد از حلقه هم ‏if not cracked یعنی گاوصندوق بسته مونده. این الگوی پرچم کوچیک، پشتِ هر بازی برد و باختیه که از این به بعد می‌سازی.",
              },
              {
                type: "code",
                lang: "python",
                code: `SECRET = 17
MAX_TRIES = 3

guesses = [10, 20, 17]
cracked = False
for attempt in range(MAX_TRIES):
    guess = guesses[attempt]
    if guess == SECRET:
        cracked = True
        break
print(f"cracked: {cracked}")`,
                caption: { en: "In the real game guesses come from input() — here they're fixed so you can watch the flag flip to True on the third try.", fa: "توی بازی واقعی حدس‌ها از input میان — اینجا ثابتن تا ببینی پرچم سر تلاش سوم True می‌شه." },
              },
              {
                type: "warn",
                en: "A for-loop that finishes WITHOUT break spent all its tries — that's exactly when the lose message fires.",
                fa: "حلقهٔ for که «بدون» break تموم بشه یعنی همهٔ تلاش‌ها مصرف شدن — دقیقاً همون لحظه‌ایه که پیام باخت چاپ می‌شه.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "Why a fixed SECRET constant instead of a random number?", fa: "چرا SECRET ثابته و نه یه عدد تصادفی؟" },
                options: [
                  { en: "Deterministic — the same game every run, easy to test", fa: "تصادفی نیست — هر بار همون بازیه و راحت تست می‌شه" },
                  { en: "Because random is always broken", fa: "چون random همیشه خرابه" },
                  { en: "Constants run faster", fa: "ثابت‌ها سریع‌تر اجرا می‌شن" },
                  { en: "Secrets must be even numbers", fa: "رمزها باید عدد زوج باشن" },
                ],
                answer: 0,
                explain: {
                  en: "Same secret for everyone = fair tests and fair grading.",
                  fa: "یه راز برای همه = تستِ عادلانه و نمرهٔ عادلانه.",
                },
              },
              {
                q: { en: "What does cracked = False before the loop do?", fa: "‏cracked = False قبل از حلقه چه کارکردی داره؟" },
                options: [
                  { en: "Remembers the win/lose state across all rounds", fa: "وضعیت برد و باخت رو توی همهٔ دورها به یاد داره" },
                  { en: "Resets the secret", fa: "رمز رو ریست می‌کنه" },
                  { en: "Counts the tries", fa: "تلاش‌ها رو می‌شماره" },
                  { en: "Nothing — it's decoration", fa: "هیچی — تزئینه" },
                ],
                answer: 0,
                explain: {
                  en: "Without the flag, the lose message would fire even on a winning run.",
                  fa: "بدون این پرچم، پیام باخت حتی توی اجرای برنده هم چاپ می‌شد.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Crack the Vault 🗝", fa: "گاوصندوق رو باز کن 🗝" },
            brief: {
              en: "Build the full game. SECRET = 17, MAX_TRIES = 3. Read up to 3 guesses (int per line):\nbelow secret → Too low!  ·  above → Too high!\nOn the hit → Cracked! 🗝 then Tries: {n} — and stop.\nIf all 3 tries fail → Locked out! The code was 17",
              fa: "بازی کامل رو بساز. ‏SECRET = 17 و ‏MAX_TRIES = 3. تا ۳ حدس بخون (هر خط یه عدد):\nکمتر از رمز → ‏Too low! و بیشتر → ‏Too high!\nسر ضربهٔ درست → ‏Cracked! 🗝 و بعد ‏Tries: {تعداد} — و تموم.\nاگه هر ۳ تلاش خورد → ‏Locked out! The code was 17",
            },
            starter: `SECRET = 17
MAX_TRIES = 3

attempts = 0
cracked = False

# TODO: loop MAX_TRIES times:
#   read guess = int(input())
#   attempts += 1  (BEFORE comparing!)
#   guess < SECRET -> print "Too low!"
#   guess > SECRET -> print "Too high!"
#   otherwise -> print "Cracked! 🗝", print f"Tries: {attempts}",
#                cracked = True, break
# after the loop: if not cracked -> print f"Locked out! The code was {SECRET}"
`,
            solution: `SECRET = 17
MAX_TRIES = 3

attempts = 0
cracked = False

for attempt in range(MAX_TRIES):
    guess = int(input())
    attempts += 1
    if guess < SECRET:
        print("Too low!")
    elif guess > SECRET:
        print("Too high!")
    else:
        print("Cracked! 🗝")
        print(f"Tries: {attempts}")
        cracked = True
        break

if not cracked:
    print(f"Locked out! The code was {SECRET}")`,
            hints: [
              {
                en: "Shape: for attempt in range(MAX_TRIES): → read, count, if/elif/else — break lives in the else.",
                fa: "شکل کار:‏ for attempt in range(MAX_TRIES): → بخون، بشمار، ‏if/elif/else — ‏break هم توی else زندگی می‌کنه.",
              },
              {
                en: "attempts += 1 goes BEFORE the comparisons so a first-try hit prints Tries: 1.",
                fa: "‏attempts += 1 «قبل از» مقایسه‌ها میاد تا ضربهٔ اول، چاپ کنه Tries: 1.",
              },
              {
                en: "The lose line comes AFTER the loop, guarded by if not cracked — never inside it.",
                fa: "پیام باخت «بعد از» حلقه و پشت دروازهٔ ‏if not cracked میاد — هیچ‌وقت داخل حلقه نیست.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "10\n20\n17", expect: "Too low!\nToo high!\nCracked! 🗝\nTries: 3" },
                { stdin: "17", expect: "Cracked! 🗝\nTries: 1", hidden: true },
                { stdin: "30\n29\n28", expect: "Too high!\nToo high!\nToo high!\nLocked out! The code was 17", hidden: true },
              ],
            },
            sample: { stdin: "10\n20\n17", expect: "Too low!\nToo high!\nCracked! 🗝\nTries: 3" },
          },
        ],
      },
      {
        id: "py-m19-l2",
        title: { en: "Capstone 2: The Receipt Maker", fa: "پروژهٔ پایانی ۲: فاکتورساز" },
        goal: {
          en: "Print a tidy aligned text receipt with a row helper, dot padding and a running total.",
          fa: "یه فاکتور متنیِ مرتب و هم‌تراز چاپ کنی با تابع کمکی سطرها، نقطه‌چینِ پرکننده و جمع متحرک.",
        },
        minutes: 10,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "A receipt is name on the left, price on the right — and the middle must LINE UP. The trick: pad the gap with dots, computed from the name's length: dots = \".\" * (12 - len(name)). Long name → few dots, short name → many dots. Every row ends up the same width.",
                fa: "فاکتور یعنی اسم سمت چپ و قیمت سمت راست — و وسطشون باید «هم‌تراز» باشه. ترفند: فاصلهٔ وسط رو با نقطه پر کن که تعدادش از طول اسم حساب می‌شه:‏ dots = \".\" * (12 - len(name)). اسم بلند → نقطهٔ کم، اسم کوتاه → نقطهٔ زیاد. همهٔ سطرها یه عرض می‌شن.",
              },
              {
                type: "code",
                lang: "python",
                code: `def row(name, price):
    dots = "." * (12 - len(name))
    return f"{name}{dots}{price}$"

print(row("Coffee", 45))
print(row("Cake", 60))`,
                caption: { en: "Coffee......45$ / Cake........60$ — same width, very satisfying.", fa: "‏Coffee......45$ و ‏Cake........60$ — یه عرض، لذت‌بخش." },
              },
              {
                type: "tip",
                en: "12 - 6 = 6 dots for Coffee, 12 - 4 = 8 for Cake. The subtraction is the whole layout engine.",
                fa: "‏۱۲ منهای ۶ می‌شه ۶ نقطه برای Coffee و ۱۲ منهای ۴ می‌شه ۸ تا برای Cake. کلِ موتورِ صفحه‌آرایی همون یه تفریقه.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "The full receipt flow", fa: "جریان کامل فاکتور" },
            blocks: [
              {
                type: "text",
                en: "Full flow: per item print row(name, price) and feed total += price; afterwards row(\"TOTAL\", total) reuses the SAME helper — one function, consistent layout, start to finish. Here the items are fixed so you can run it; the challenge reads \"name price\" lines from input().",
                fa: "جریان کامل: برای هر آیتم ‏row(name, price) رو چاپ کن و ‏total += price رو اجرا کن؛ بعدش ‏row(\"TOTAL\", total) از «همون» تابع کمکی استفاده می‌کنه — یه تابع، صفحه‌آرایی یکدست، از اول تا آخر. اینجا آیتم‌ها ثابتن که راحت اجراش کنی؛ چالش خط‌های \"name price\" رو از ورودی می‌خونه.",
              },
              {
                type: "code",
                lang: "python",
                code: `def row(name, price):
    dots = "." * (12 - len(name))
    return f"{name}{dots}{price}$"

items = [["Coffee", 45], ["Cake", 60]]
total = 0
for entry in items:
    name = entry[0]
    price = entry[1]
    print(row(name, price))
    total += price
print(row("TOTAL", total))`,
                caption: { en: "Every money line goes through row() — even the grand total.", fa: "همهٔ خط‌های پولی از row رد می‌شن — حتی جمع کل." },
              },
              {
                type: "warn",
                en: "In the challenge the price arrives as TEXT — int(parts[1]) before any math, or total will be a mess.",
                fa: "توی چالش، قیمت به شکل «متن» میاد — قبل از هر ریاضی ‏int(parts[1]) کن، وگرنه total کامل خراب می‌شه.",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What is \".\" * (12 - 4)?", fa: "خروجی \".\" * (12 - 4) چیه؟" },
                options: [
                  { en: "8 dots: ........", fa: "۸ تا نقطه: ........" },
                  { en: "An error", fa: "یه خطا" },
                  { en: "The number 8", fa: "عدد ۸" },
                  { en: ".8.", fa: "‏.8." },
                ],
                answer: 0,
                explain: {
                  en: "12 - 4 = 8, then string repetition draws exactly 8 dots.",
                  fa: "‏۱۲ منهای ۴ می‌شه ۸ و بعد تکرار رشته دقیقاً ۸ نقطه می‌کشه.",
                },
              },
              {
                q: { en: "Why print the total with row(\"TOTAL\", total) instead of plain print?", fa: "چرا جمع کل رو با row(\"TOTAL\", total) چاپ می‌کنیم و نه با print ساده؟" },
                options: [
                  { en: "One helper keeps every line the same width", fa: "یه تابع کمکی همهٔ خط‌ها رو هم‌عرض نگه می‌داره" },
                  { en: "Python requires helpers for totals", fa: "پایتون برای جمع‌ها تابع کمکی الزامی می‌دونه" },
                  { en: "Because TOTAL needs no dots", fa: "چون TOTAL نقطه نمی‌خواد" },
                  { en: "No reason — it's longer", fa: "دلیلی نداره — فقط طولانی‌تره" },
                ],
                answer: 0,
                explain: {
                  en: "Consistency is the point of helpers — the total row lines up with every item row.",
                  fa: "یکدستی فلسفهٔ تابع کمکیه — سطر جمع کل با سطر همهٔ آیتم‌ها تراز می‌شه.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Build the Receipt 🧾", fa: "فاکتور رو بساز 🧾" },
            brief: {
              en: "Build it: header == TEKA CAFE ==, then read n and n lines \"name price\". Each item prints name + dots up to width 12 + price + $ (row helper). Then the TOTAL row, then Thanks! ♥ — like:\n== TEKA CAFE ==\nCoffee......45$\nCake........60$\nTOTAL.......105$\nThanks! ♥",
              fa: "بسازش: اول سربرگ == TEKA CAFE == و بعد n و n تا خط \"name price\". هر آیتم چاپ می‌شه: اسم + نقطه تا عرض ۱۲ + قیمت + علامت $ (با تابع کمکی row). بعد سطر TOTAL و در آخر Thanks! ♥ — مثل:\n== TEKA CAFE ==\nCoffee......45$\nCake........60$\nTOTAL.......105$\nThanks! ♥",
            },
            starter: `def row(name, price):
    dots = "." * (12 - len(name))
    return f"{name}{dots}{price}$"

print("== TEKA CAFE ==")
n = int(input())
total = 0
# TODO: loop n times:
#   parts = input().split()  ->  name = parts[0], price = int(parts[1])
#   print(row(name, price))
#   total += price
# after the loop: print(row("TOTAL", total)) and print("Thanks! ♥")
`,
            solution: `def row(name, price):
    dots = "." * (12 - len(name))
    return f"{name}{dots}{price}$"

print("== TEKA CAFE ==")
n = int(input())
total = 0
for i in range(n):
    parts = input().split()
    name = parts[0]
    price = int(parts[1])
    print(row(name, price))
    total += price
print(row("TOTAL", total))
print("Thanks! ♥")`,
            hints: [
              {
                en: "Coffee is 6 letters → 6 dots. Cake is 4 → 8 dots. TOTAL is 5 → 7 dots.",
                fa: "‏Coffee شش حرف داره → ۶ نقطه. ‏Cake چهار حرف → ۸ نقطه. ‏TOTAL پنج حرف → ۷ نقطه.",
              },
              {
                en: "total += price goes INSIDE the loop, right after each row prints.",
                fa: "‏total += price داخل حلقه و درست بعد از چاپ هر سطر میاد.",
              },
              {
                en: "45 + 60 = 105 — the TOTAL row shows the running sum, through the same helper.",
                fa: "‏۴۵ + ۶۰ می‌شه ۱۰۵ — سطر TOTAL همون جمع متحرک رو نشون می‌ده، از طریق همون تابع کمکی.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "2\nCoffee 45\nCake 60", expect: "== TEKA CAFE ==\nCoffee......45$\nCake........60$\nTOTAL.......105$\nThanks! ♥" },
                { stdin: "3\nTea 30\nBaklava 90\nWater 10", expect: "== TEKA CAFE ==\nTea.........30$\nBaklava.....90$\nWater.......10$\nTOTAL.......130$\nThanks! ♥", hidden: true },
                { stdin: "1\nKebab 120", expect: "== TEKA CAFE ==\nKebab.......120$\nTOTAL.......120$\nThanks! ♥", hidden: true },
              ],
            },
            sample: { stdin: "2\nCoffee 45\nCake 60", expect: "== TEKA CAFE ==\nCoffee......45$\nCake........60$\nTOTAL.......105$\nThanks! ♥" },
          },
        ],
      },
      {
        id: "py-m19-l3",
        title: { en: "Capstone 3: The Dungeon Steps", fa: "پروژهٔ پایانی ۳: پله‌های دِنج" },
        goal: {
          en: "Build a tiny text-adventure state machine: one room variable, a map dict, guarded moves.",
          fa: "یه ماشین وضعیتِ ماجراجویی متنی بسازی: یه متغیر اتاق، یه نقشهٔ دیکشنری و حرکت‌های شرطی.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Every text adventure is a STATE MACHINE in disguise: one variable (room) remembers where you are, the map lives in a dict (room name → description), and every command is just an if that MAY change the state. Move → state changes → new description prints.",
                fa: "هر ماجراجویی متنی یه «ماشین وضعیت» تخفیف‌خورده: یه متغیر (room) یادش می‌مونه کجایی، نقشه توی یه دیکشنری زندگی می‌کنه (اسم اتاق → توضیحش) و هر دستور فقط یه if ــه که «شاید» وضعیت رو عوض کنه. حرکت کنی → وضعیت عوض می‌شه → توضیحِ تازه چاپ می‌شه.",
              },
              {
                type: "code",
                lang: "python",
                code: `rooms = {"hall": "Dusty hall.", "library": "Glowing library."}
room = "hall"
cmd = "north"
if room == "hall" and cmd == "north":
    room = "library"
print(rooms[room])`,
                caption: { en: "One command, one state change, one new description.", fa: "یه دستور، یه تغییر وضعیت، یه توضیح تازه." },
              },
              {
                type: "tip",
                en: "The dict IS the map; the variable IS you. The ifs are just the doors between them.",
                fa: "دیکشنری همون نقشه‌ست و متغیر هم خودِ تو. اگرها هم فقط درهای بین این دو تا ان.",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "Guard every door", fa: "هر دری رو نگهبانی کن" },
            blocks: [
              {
                type: "text",
                en: "Real rooms don't connect to everything — every move must fire ONLY from the right room: room == \"hall\" and cmd == \"north\". A command that matches no door prints the refusal (\"You can't go that way.\") and continue skips the print, because the room never changed.",
                fa: "اتاق‌های واقعی به همه‌جا راه ندارن — هر حرکت فقط باید «از اتاق درست» فعال بشه:‏ room == \"hall\" and cmd == \"north\". دستوری که به هیچ دری نخوره، پیام رد شدن رو چاپ می‌کنه (\"You can't go that way.\") و continue چاپِ توضیح رو رد می‌کنه، چون اتاق اصلاً عوض نشده.",
              },
              {
                type: "code",
                lang: "python",
                code: `rooms = {"hall": "Dusty hall.", "library": "Glowing library.", "cave": "Dark cave."}
room = "hall"
commands = ["left", "north", "south"]
for cmd in commands:
    if room == "hall" and cmd == "north":
        room = "library"
    elif room == "hall" and cmd == "down":
        room = "cave"
    elif room == "library" and cmd == "south":
        room = "hall"
    else:
        print("You can't go that way.")
        continue
    print(rooms[room])`,
                caption: { en: "Refused and unmoved, then two clean hops — the ladder checks room + command TOGETHER.", fa: "حرکت رد شد ولی اتاق سر جاش موند، بعد دو تا پرش تمیز — نردبان، اتاق و دستور رو «با هم» چک می‌کنه." },
              },
              {
                type: "warn",
                en: "Forget the room check (just if cmd == \"north\") and you teleport north from ANYWHERE — even from the cave!",
                fa: "چک اتاق رو یادت بره (یعنی فقط if cmd == \"north\" بنویسی) و از «هر جا» به شمال تلپورت می‌شی — حتی از ته غار!",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "What does the variable room hold in the game?", fa: "متغیر room توی بازی چی رو نگه می‌داره؟" },
                options: [
                  { en: "The current state — which room you're in", fa: "وضعیت فعلی — اینکه کدوم اتاقی" },
                  { en: "The whole map", fa: "کل نقشه رو" },
                  { en: "The last command", fa: "آخرین دستور رو" },
                  { en: "The player's score", fa: "امتیاز بازیکن رو" },
                ],
                answer: 0,
                explain: {
                  en: "One variable, one state — updating it IS moving.",
                  fa: "یه متغیر، یه وضعیت — به‌روز کردنش یعنی «حرکت».",
                },
              },
              {
                q: { en: "Why check room == \"hall\" AND cmd == \"north\" together?", fa: "چرا room == \"hall\" و cmd == \"north\" رو «با هم» چک می‌کنیم؟" },
                options: [
                  { en: "So the move only fires from the hall", fa: "که حرکت فقط از تالار فعال بشه" },
                  { en: "Because and is shorter than or", fa: "چون and کوتاه‌تر از or ــه" },
                  { en: "Because Python requires two conditions", fa: "چون پایتون دو شرط رو الزامی می‌دونه" },
                  { en: "So the map loads faster", fa: "که نقشه سریع‌تر لود بشه" },
                ],
                answer: 0,
                explain: {
                  en: "Command alone = teleportation. Room + command = a real door.",
                  fa: "فقط دستور = تلپورت. اتاق + دستور = یه درِ واقعی.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Walk the Dungeon 🕯", fa: "تو دِنج بگرد 🕯" },
            brief: {
              en: "Three rooms: hall (north → library, down → cave), library (south → hall), cave (up → hall). Read n, then n commands. After each VALID move print the new room's description; on a bad move print exactly \"You can't go that way.\" — the room stays put. Descriptions:\nHall: You are in the dusty hall.\nLibrary: You are in the glowing library.\nCave: You are in the dark cave.",
              fa: "سه اتاق: تالار (‏north → کتابخانه، ‏down → غار)، کتابخانه (‏south → تالار) و غار (‏up → تالار). اول n رو بخون و بعد n تا دستور. بعد از هر حرکت «درست» توضیح اتاق تازه رو چاپ کن؛ حرکت اشتباه هم دقیقاً یعنی چاپ \"You can't go that way.\" — و اتاق سر جاش می‌مونه. توضیح‌ها:\nتالار: You are in the dusty hall.\nکتابخانه: You are in the glowing library.\nغار: You are in the dark cave.",
            },
            starter: `rooms = {"hall": "You are in the dusty hall.", "library": "You are in the glowing library.", "cave": "You are in the dark cave."}
room = "hall"

n = int(input())
# TODO: loop n times:
#   cmd = input()
#   hall + north -> library  |  hall + down -> cave
#   library + south -> hall  |  cave + up -> hall
#   no door matched -> print "You can't go that way." then continue
#   after a valid move: print(rooms[room])
`,
            solution: `rooms = {"hall": "You are in the dusty hall.", "library": "You are in the glowing library.", "cave": "You are in the dark cave."}
room = "hall"

n = int(input())
for i in range(n):
    cmd = input()
    if room == "hall" and cmd == "north":
        room = "library"
    elif room == "hall" and cmd == "down":
        room = "cave"
    elif room == "library" and cmd == "south":
        room = "hall"
    elif room == "cave" and cmd == "up":
        room = "hall"
    else:
        print("You can't go that way.")
        continue
    print(rooms[room])`,
            hints: [
              {
                en: "Four guarded moves = four elif branches; the refusal lives in the final else.",
                fa: "چهار حرکتِ نگهبانی‌شده = چهار تا elif و پیام رد شدن هم توی else آخر زندگی می‌کنه.",
              },
              {
                en: "continue skips print(rooms[room]) — a refused move prints nothing else.",
                fa: "‏continue چاپ print(rooms[room]) رو رد می‌کنه — حرکتِ ردشده هیچ چیز دیگه‌ای هم چاپ نمی‌کنه.",
              },
              {
                en: "Walk it on paper first: north, south, down, up from the hall ends back at the hall.",
                fa: "اول روی کاغذ قدم بزن: از تالار با north و بعد south و بعد down و بعد up دوباره می‌رسی به تالار.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "4\nnorth\nsouth\ndown\nup", expect: "You are in the glowing library.\nYou are in the dusty hall.\nYou are in the dark cave.\nYou are in the dusty hall." },
                { stdin: "2\nleft\nnorth", expect: "You can't go that way.\nYou are in the glowing library.", hidden: true },
                { stdin: "3\ndown\ndown\nup", expect: "You are in the dark cave.\nYou can't go that way.\nYou are in the dusty hall.", hidden: true },
              ],
            },
            sample: { stdin: "4\nnorth\nsouth\ndown\nup", expect: "You are in the glowing library.\nYou are in the dusty hall.\nYou are in the dark cave.\nYou are in the dusty hall." },
          },
        ],
      },
      {
        id: "py-m19-l4",
        title: { en: "Capstone 4: The Grade Reporter", fa: "پروژهٔ پایانی ۴: کارنامه‌ساز" },
        goal: {
          en: "Combine functions, loops and accumulators into a full class report — your Python graduation.",
          fa: "تابع و حلقه و جمع‌کننده رو توی یه گزارش کامل کلاس ترکیب کنی — همون فارغ‌التحصیلیِ پایتونت.",
        },
        minutes: 11,
        steps: [
          {
            kind: "theory",
            blocks: [
              {
                type: "text",
                en: "Last lesson — the full architecture. Decisions live in a function: letter(score) answers one question (which grade?) with a ladder: 90+ → A, 80+ → B, 70+ → C, else F. The function doesn't know about loops or input — one job, remember m18?",
                fa: "آخرین درس — معماریِ کامل. تصمیم‌ها توی تابع زندگی می‌کنن:‏ letter(score) به یه سؤال جواب می‌ده (کدوم نمره؟) با یه نردبان: بالای ۹۰ → A و بالای ۸۰ → B و بالای ۷۰ → C و وگرنه F. این تابع نه از حلقه خبر داره نه از ورودی — یادته؟ یه تابع، یه کار (ماژول ۱۸).",
              },
              {
                type: "code",
                lang: "python",
                code: `def letter(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

print(letter(92))
print(letter(85))
print(letter(64))`,
                caption: { en: "A, B, F — the ladder checks from the top down.", fa: "‏A و B و F — نردبان از بالا به پایین چک می‌کنه." },
              },
              {
                type: "tip",
                en: "Ladder order matters: check >= 90 FIRST. Reversed, an 85 would hit >= 70 and get a C. Highest rung first!",
                fa: "ترتیب نردبان مهمه: اول >= 90. برعکس بنویسی، ‏۸۵ به >= 70 می‌خوره و C می‌گیره. پلهٔ بالا همیشه اول!",
              },
            ],
          },
          {
            kind: "theory",
            title: { en: "One loop, the whole report", fa: "یه حلقه، کلِ گزارش" },
            blocks: [
              {
                type: "text",
                en: "The loop body below is m17 and m18 fused: take a student record, call letter(score), print the report row, bank the total, and race the champion — four jobs, one pass over the data. In the challenge the records arrive as \"name score\" input lines.",
                fa: "بدنهٔ حلقه‌ای که می‌بینی ماژول ۱۷ و ۱۸ رو با هم ذوب کرده: یه رکورد دانش‌آموز بگیر، ‏letter(score) رو صدا بزن، سطر گزارش رو چاپ کن، جمع رو بانک کن و مسابقهٔ قهرمانی رو اجرا کن — چهار کار، یه دوره روی داده‌ها. توی چالش، رکوردها به شکل خط‌های \"name score\" از ورودی میان.",
              },
              {
                type: "code",
                lang: "python",
                code: `def letter(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

roster = [["amir", 85], ["kim", 64]]
total = 0
top_name = ""
top_score = -1
for row in roster:
    name = row[0]
    score = row[1]
    grade = letter(score)
    print(f"{name}: {score} ({grade})")
    total += score
    if score > top_score:
        top_score = score
        top_name = name
print(f"Class total: {total}")
print(f"Top: {top_name} ({top_score})")`,
                caption: { en: "Draw the row, bank the total, race the champion — then move on.", fa: "سطر رو بکش، جمع رو ذخیره کن، قهرمان رو بسنج — و بعد برو سراغ بعدی." },
              },
              {
                type: "warn",
                en: "top_score starts at -1, not 0 — a class where everyone scored 0 still deserves a top student!",
                fa: "‏top_score با ‎-1 شروع می‌شه نه ۰ — کلاسی که همه‌شون صفر گرفتن هم حق داره شاگرد اول داشته باشه!",
              },
            ],
          },
          {
            kind: "quiz",
            questions: [
              {
                q: { en: "With the letter() ladder above, what is letter(70)?", fa: "با همون نردبان letter، خروجی letter(70) چیه؟" },
                options: [
                  { en: "C", fa: "‏C" },
                  { en: "B", fa: "‏B" },
                  { en: "F", fa: "‏F" },
                  { en: "A", fa: "‏A" },
                ],
                answer: 0,
                explain: {
                  en: "70 fails >= 90 and >= 80, passes >= 70 → C. Boundaries belong to the rung they touch.",
                  fa: "‏۷۰ از >= 90 و >= 80 رد می‌شه، ولی >= 70 رو پاس می‌کنه → C. مرزها مال پله‌ای‌ان که بهشون می‌رسن.",
                },
              },
              {
                q: { en: "Why run the champion hunt inside the same loop as the report?", fa: "چرا مسابقهٔ قهرمانی توی همون حلقهٔ گزارش اجرا می‌شه؟" },
                options: [
                  { en: "One pass over the data does every job", fa: "یه دوره روی داده‌ها همهٔ کارها رو می‌کنه" },
                  { en: "Loops are not allowed to run twice", fa: "حلقه حق نداره دو بار بچرخه" },
                  { en: "Because letter() would break otherwise", fa: "چون وگرنه letter خراب می‌شه" },
                  { en: "No reason — it just looks nice", fa: "دلیلی نداره — فقط خوشگله" },
                ],
                answer: 0,
                explain: {
                  en: "Each student passes once: report them, bank them, compare them — done.",
                  fa: "هر دانش‌آموز یه بار رد می‌شه: گزارشش، جمعش، مقایسه‌ش — تمام.",
                },
              },
            ],
          },
          {
            kind: "challenge",
            title: { en: "Build the Grade Reporter 🎓", fa: "کارنامه‌ساز رو بساز 🎓" },
            brief: {
              en: "The grand finale. letter(score): 90+ → A, 80+ → B, 70+ → C, else F. Read n, then n lines \"name score\". Per student print \"{name}: {score} ({letter})\". After the loop:\nClass total: {sum}\nTop: {top_name} ({top_score})",
              fa: "فینال بزرگ. تابع letter با نمره: بالای ۹۰ → A و بالای ۸۰ → B و بالای ۷۰ → C و وگرنه F. اول n رو بخون و بعد n تا خط \"name score\". برای هر دانش‌آموز چاپ کن \"{name}: {نمره} ({حرف})\". بعد از حلقه:\nClass total: {جمع}\nTop: {اسم} ({نمره})",
            },
            starter: `def letter(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

n = int(input())
total = 0
top_name = ""
top_score = -1
# TODO: loop n times:
#   parts = input().split()  ->  name = parts[0], score = int(parts[1])
#   grade = letter(score)
#   print f"{name}: {score} ({grade})"
#   total += score
#   if score > top_score: remember top_name + top_score
# after the loop:
#   print f"Class total: {total}"
#   print f"Top: {top_name} ({top_score})"
`,
            solution: `def letter(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

n = int(input())
total = 0
top_name = ""
top_score = -1

for i in range(n):
    parts = input().split()
    name = parts[0]
    score = int(parts[1])
    grade = letter(score)
    print(f"{name}: {score} ({grade})")
    total += score
    if score > top_score:
        top_score = score
        top_name = name

print(f"Class total: {total}")
print(f"Top: {top_name} ({top_score})")`,
            hints: [
              {
                en: "grade = letter(score) once per student, then the f-string hole stays simple: ({grade}).",
                fa: "برای هر دانش‌آموز یه بار ‏grade = letter(score) و بعد جای خالی f-string ساده می‌مونه: ({grade}).",
              },
              {
                en: "The champion hunt is the m17 pattern: top_score = -1, top_name = \"\" — update on strictly greater.",
                fa: "مسابقهٔ قهرمانی همون الگوی ماژول ۱۷ ــه: ‏top_score = -1 و ‏top_name = \"\" — به‌روزرسانی فقط با اکیداً بیشتر.",
              },
              {
                en: "Boundary check: 90 → A, 70 → C, 69 → F. Test 92 / 85 / 64 → totals 241, top sara.",
                fa: "چک مرزی: ‏۹۰ → A و ‏۷۰ → C و ‏۶۹ → F. حالت ۹۲ و ۸۵ و ۶۴ → جمع ۲۴۱ و شاگرد اول sara.",
              },
            ],
            check: {
              kind: "py",
              tests: [
                { stdin: "3\nsara 92\namir 85\nkim 64", expect: "sara: 92 (A)\namir: 85 (B)\nkim: 64 (F)\nClass total: 241\nTop: sara (92)" },
                { stdin: "2\nzoe 70\nali 69", expect: "zoe: 70 (C)\nali: 69 (F)\nClass total: 139\nTop: zoe (70)", hidden: true },
                { stdin: "1\nmaya 90", expect: "maya: 90 (A)\nClass total: 90\nTop: maya (90)", hidden: true },
              ],
            },
            sample: { stdin: "3\nsara 92\namir 85\nkim 64", expect: "sara: 92 (A)\namir: 85 (B)\nkim: 64 (F)\nClass total: 241\nTop: sara (92)" },
          },
        ],
      },
    ],
  },
];
