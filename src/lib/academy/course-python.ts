// TEKA NEXUS — TEKA Academy · Python course (beginner → genuinely practical).
// Every runnable sample and every challenge test is guaranteed to run in the
// bundled pylite interpreter (see src/lib/academy/pylite.ts). All graded
// outputs are deterministic — no unseeded randomness in any test path.

import type { Course } from "./types";

export const pythonCourse: Course = {
  id: "python-basics",
  language: "python",
  title: { en: "Python: From Zero to Builder", fa: "پایتون: از صفر تا ساختن" },
  tagline: {
    en: "The friendly language behind Instagram, YouTube and modern AI. By the last lesson you will have built a real, working game — right in your browser, 100% free.",
    fa: "زبانِ دوست‌داشتنیِ پشت اینستاگرام، یوتیوب و هوش مصنوعی. تا درس آخر یک بازی واقعی و کارکردنی می‌سازی — همین‌جا تو مرورگر، صددرصد رایگان.",
  },
  accent: "ember",
  emoji: "🐍",
  modules: [
    {
      id: "py-m1",
      title: { en: "Hello, Python", fa: "سلام پایتون" },
      blurb: {
        en: "Write your very first programs and make text dance.",
        fa: "اولین برنامه‌هات رو بنویس و متن رو برقصون.",
      },
      lessons: [
        {
          id: "py-m1-l1",
          title: { en: "Your First Line of Code", fa: "اولین خط کدِ زندگی‌ات" },
          goal: {
            en: "Run a real Python program and print anything you want.",
            fa: "یک برنامه واقعی پایتون رو اجرا کن و هر چیزی بخوای چاپ کن.",
          },
          minutes: 8,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Python is the world's most beginner-friendly programming language — and it runs Instagram, YouTube and a huge part of AI. You write instructions in almost-plain English, and the computer obeys.",
                  fa: "پایتون برنامه‌نویسیِ دوست‌داشتنیِ دنیاست — اینستاگرام و یوتیوب و بخش بزرگی از هوش مصنوعی باهاش کار می‌کنن. تو تقریباً به زبان آدمیزاد دستور می‌نویسی و کامپیوتر اجرا می‌کنه.",
                },
                {
                  type: "text",
                  en: "The first spell every coder learns is print() — it shows things on the screen. Whatever you wrap in quotes is a **string** (text), and Python prints it exactly as you wrote it.",
                  fa: "اولین وردی که هر برنامه‌نویسی یاد می‌گیره print() ــه — چیزها رو روی صفحه نشون می‌ده. هر چیزی که توی گیومه بذاری یه **رشته (String)** ــه، یعنی متن؛ و پایتون همون رو دقیق چاپ می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `print("Salam, world!")
print("I am learning Python ⚡")`,
                  caption: { en: "Two instructions, two lines of output.", fa: "دو دستور، دو خط خروجی." },
                },
                {
                  type: "tip",
                  en: "Hit the ▶ Run button — the output appears right below the code. Change the text and run it again. This is YOUR playground.",
                  fa: "دکمهٔ ▶ اجرا رو بزن — خروجی همون‌جای زیر کد ظاهر می‌شه. متن رو عوض کن و دوباره اجرا کن. این زمین بازی توئه.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Quotes matter", fa: "گیومه مهمه" },
              blocks: [
                {
                  type: "text",
                  en: "Text must live inside quotes: \"like this\" or 'like this'. Both work — just don't mix opening and closing styles. Without quotes, Python thinks you're naming something it doesn't know.",
                  fa: "متن باید داخل گیومه باشه: \"مثل این\" یا 'مثل این'. هر دو کار می‌کنن — فقط اول و آخرش رو یکی نگیر. اگه گیومه نذاری، پایتون فکر می‌کنه داری یه چیز ناشناس رو صدا می‌زنی.",
                },
                {
                  type: "warn",
                  en: "print(Salam) without quotes → error. print(\"Salam\") → works. Quotes turn words into text.",
                  fa: "‏print(Salam) بدون گیومه → خطا.‏ print(\"Salam\") → کار می‌کنه. گیومه کلمه رو تبدیل به متن می‌کنه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does print(\"Hi\") do?", fa: "‏print(\"Hi\") چیکار می‌کنه؟" },
                  options: [
                    { en: "Shows Hi on the screen", fa: "کلمهٔ Hi رو روی صفحه نشون می‌ده" },
                    { en: "Saves Hi into a file", fa: "‏Hi رو توی یه فایل ذخیره می‌کنه" },
                    { en: "Sends Hi to a friend", fa: "‏Hi رو برای یه دوست می‌فرسته" },
                    { en: "Nothing — it's a comment", fa: "هیچی — این یه کامنته" },
                  ],
                  answer: 0,
                  explain: {
                    en: "print() displays values on the screen — it's your voice in the program.",
                    fa: "‏print() مقدارها رو روی صفحه نشون می‌ده — صدای تو توی برنامه همینه.",
                  },
                },
                {
                  q: { en: "Which line correctly prints TEKA?", fa: "کدوم خط TEKA رو درست چاپ می‌کنه؟" },
                  options: [
                    { en: "print(TEKA)", fa: "‏print(TEKA)" },
                    { en: "print(\"TEKA\")", fa: "‏print(\"TEKA\")" },
                    { en: "print(TEKA\")", fa: "‏print(TEKA\")" },
                    { en: "PRINT(\"TEKA\")", fa: "‏PRINT(\"TEKA\")" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Quotes around the text, lowercase print. Python is picky about both.",
                    fa: "متن داخل گیومه، و print با حروف کوچیک. پایتون توی هر دو سخت‌گیره.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build Your ID Card", fa: "کارت شناسایی خودت رو بساز" },
              brief: {
                en: "Print your developer ID card: exactly three lines — the header, your name, and your mood. Feel free to change Sara to YOUR name before submitting.",
                fa: "کارت شناسایی برنامه‌نویسیت رو چاپ کن: دقیقاً سه خط — سربرگ، اسم تو، و حالِ تو. قبل از ثبت، می‌تونی Sara رو به اسم خودت تغییر بدی.",
              },
              starter: `# Print the three lines of your ID card
# Line 1: === TEKA ID ===
# Line 2: Name: Sara
# Line 3: Mood: Curious ⚡
`,
              solution: `print("=== TEKA ID ===")
print("Name: Sara")
print("Mood: Curious ⚡")`,
              hints: [
                {
                  en: "Each line is its own print(\"...\") statement — three prints, three lines.",
                  fa: "هر خط یه دستور print(\"...\") جدا ــه — سه تا print، سه تا خط.",
                },
                {
                  en: "Copy the text EXACTLY — the === signs and spacing count!",
                  fa: "متن رو دقیقاً کپی کن — علامت‌های === و فاصله‌ها مهم‌ان!",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "=== TEKA ID ===\nName: Sara\nMood: Curious ⚡" }],
              },
              sample: { expect: "=== TEKA ID ===\nName: Sara\nMood: Curious ⚡" },
            },
          ],
        },
        {
          id: "py-m1-l2",
          title: { en: "Strings with Superpowers", fa: "رشته‌های ابرقهرمان" },
          goal: {
            en: "Transform text with .upper(), .lower(), .strip() and count it with len().",
            fa: "متن رو با upper و lower و strip تغییر بده و با len بشمارش.",
          },
          minutes: 9,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Strings come with built-in superpowers called **methods**. You summon them with a dot: text.upper() SHOUTS the text, text.lower() whispers it, text.title() Capitalizes Every Word.",
                  fa: "رشته‌ها قدرت‌های ذاتی‌ای دارن به اسم **متد (Method)**. با یه نقطه صدا Zakhar می‌شن: متن.upper() داد می‌زنه، متن.lower() آروم حرف می‌زنه، متن.title() هر کلمه رو با حرف بزرگ شروع می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `name = "maya chen"
print(name.upper())
print(name.lower())
print(name.title())`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Two more essentials: .strip() trims stray spaces from both ends (users type messy input!), and len() counts the characters inside.",
                  fa: "دو تا ابزار مهم دیگه: strip() فاصله‌های اضافی دو طرف متن رو پاک می‌کنه (کاربرا ورودی شلخته می‌زنن!) و len() تعداد کاراکترها رو می‌شمره.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `messy = "   hi there   "
print(messy.strip())
print(len("TEKA"))`,
                },
                {
                  type: "tip",
                  en: "len(\"TEKA\") is 4 — it counts letters, not vibes. Spaces count too!",
                  fa: "‏len(\"TEKA\") می‌شه ۴ — حرف‌ها رو می‌شماره، نه حس و حال رو! فاصله‌ها هم حساب می‌شن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What is \"teka\".upper() ?", fa: "خروجی \"teka\".upper() چیه؟" },
                  options: [
                    { en: "teka", fa: "‏teka" },
                    { en: "TEKA", fa: "‏TEKA" },
                    { en: "Teka", fa: "‏Teka" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: ".upper() returns the all-caps version.", fa: "‏upper() نسخهٔ تمام‌بزرگ متن رو برمی‌گردونه." },
                },
                {
                  q: { en: "What does len(\"code\") return?", fa: "‏len(\"code\") چی برمی‌گردونه؟" },
                  options: [
                    { en: "4", fa: "‏۴" },
                    { en: "\"code\"", fa: "‏\"code\"" },
                    { en: "CODE", fa: "‏CODE" },
                    { en: "5", fa: "‏۵" },
                  ],
                  answer: 0,
                  explain: { en: "len() returns the number of characters — c, o, d, e = 4.", fa: "‏len() تعداد کاراکترها رو می‌ده — c و o و d و e یعنی ۴." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Shout Box", fa: "جعبهٔ داد و فریاد" },
              brief: {
                en: "Read a name from the user, then SHOUT it back with three exclamation marks, and tell them how many letters it has.",
                fa: "یه اسم از کاربر بگیر، بعد با سه تا علامت تعجب داد بزنش و بگو چند تا حرف داره.",
              },
              starter: `name = input()

# 1. print SHOUT: + the name in CAPITALS + !!!
# 2. print Letters: + the number of letters
`,
              solution: `name = input()
print(f"SHOUT: {name.upper()}!!!")
print(f"Letters: {len(name)}")`,
              hints: [
                {
                  en: "name.upper() makes it loud; f-strings glue it to your text.",
                  fa: "‏name.upper() صداش رو بلند می‌کنه؛ f-string هم می‌چسبونتش به متن تو.",
                },
                {
                  en: "Letters line: f\"Letters: {len(name)}\" — len counts the original name.",
                  fa: "خط حرف‌ها:‏ f\"Letters: {len(name)}\" — len اسم اصلی رو می‌شماره.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "sara", expect: "SHOUT: SARA!!!\nLetters: 4" },
                  { stdin: "kenji", expect: "SHOUT: KENJI!!!\nLetters: 5", hidden: true },
                  { stdin: "Ana", expect: "SHOUT: ANA!!!\nLetters: 3", hidden: true },
                ],
              },
              sample: { stdin: "sara", expect: "SHOUT: SARA!!!\nLetters: 4" },
            },
          ],
        },
        {
          id: "py-m1-l3",
          title: { en: "Comments: Notes for Humans", fa: "کامنت: یادداشت برای آدم‌ها" },
          goal: {
            en: "Leave notes in your code that Python politely ignores.",
            fa: "توی کدت یادداشت بذار که پایتون محترمانه نادیده‌شون بگیره.",
          },
          minutes: 7,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Anything after a # on a line is a **comment** — a note for humans. Python skips it completely. Comments explain WHY code exists, which future-you will deeply appreciate.",
                  fa: "هر چیزی بعد از # توی یه خط ــه **کامنت (Comment)** ــه، یعنی یادداشت برای آدم‌ها. پایتون کلاً رد می‌شه. کامنت‌ها می‌گن کد چرا اونجاست — و «توِ آینده» شدید ازت ممنون می‌شه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `# This program greets the user
print("Salam!")  # greetings come first

# print("this line never runs")`,
                },
                {
                  type: "tip",
                  en: "Programmers often comment out a line to disable it temporarily. Try it above!",
                  fa: "برنامه‌نویس‌ها معمولاً یه خط رو با کامنت غیرفعال می‌کنن. امتحانش کن!",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What happens to lines starting with #?", fa: "به خط‌هایی که با # شروع می‌شن چی می‌شه؟" },
                  options: [
                    { en: "Python runs them twice", fa: "پایتون دوبار اجراشون می‌کنه" },
                    { en: "Python ignores them", fa: "پایتون نادیده‌شون می‌گیره" },
                    { en: "They print in bold", fa: "با خط ضخیم چاپ می‌شن" },
                    { en: "They slow the program", fa: "برنامه رو کند می‌کنن" },
                  ],
                  answer: 1,
                  explain: { en: "Comments are for humans; the interpreter skips them.", fa: "کامنت‌ها برای آدم‌ان؛ مفسر ردشون می‌کنه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Quote Wall", fa: "دیوارِ نقل‌قول" },
              brief: {
                en: "Print this two-line quote, and leave at least one # comment above it explaining why you chose it (comments don't affect the output):",
                fa: "این نقل‌قول دوخطی رو چاپ کن و حداقل یه کامنت # بالاش بذار که بگه چرا انتخابش کردی (کامنت‌ها توی خروجی تأثیری ندارن):",
              },
              starter: `# Why did you pick this quote? Write it here.
# Line 1: Stay curious.
# Line 2: - A wise developer
`,
              solution: `# Because curiosity builds everything
print("Stay curious.")
print("- A wise developer")`,
              hints: [
                {
                  en: "The output is only the two print lines — comments never show up.",
                  fa: "خروجی فقط همون دو خط print ــه — کامنت‌ها هیچ‌وقت ظاهر نمی‌شن.",
                },
                {
                  en: "Watch the dash: the second line starts with \"- A wise developer\".",
                  fa: "به خط تیره دقت کن: خط دوم با \"- A wise developer\" شروع می‌شه.",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "Stay curious.\n- A wise developer" }],
              },
              sample: { expect: "Stay curious.\n- A wise developer" },
            },
          ],
        },
        {
          id: "py-m1-l4",
          title: { en: "f-strings: Text That Thinks", fa: "f-string: متنی که فکر می‌کنه" },
          goal: {
            en: "Inject values and math straight into your sentences with f\"...\".",
            fa: "مقدارها و محاسبه‌ها رو مستقیم داخل جمله‌هات بذار با f\"...\".",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Put an f before a string and it becomes an **f-string** — a template with holes. Anything inside {curly braces} gets evaluated and inserted. This is how programs talk to users personally.",
                  fa: "یه f قبل از رشته بذار تا بشه **f-string** — یه قالب با جای خالی. هر چی داخل {آکولاد} باشه محاسبه و جاگذاری می‌شه. برنامه‌ها همین‌جوری با کاربرا شخصی حرف می‌زنن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `name = "Arash"
age = 19
print(f"Hi {name}, you are {age}.")`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The holes aren't just for variables — Python evaluates ANY expression inside the braces, including math.",
                  fa: "جای خالی‌ها فقط برای متغیر نیستن — پایتون هر عبارتی داخل آکولاد رو حساب می‌کنه، حتی ریاضی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `age = 19
print(f"Next year: {age + 1}")
print(f"Double: {age * 2}")`,
                },
                {
                  type: "warn",
                  en: "Forgot the f? Then {name} prints literally. The f is small but mighty.",
                  fa: "‏f رو جا انداختی؟ اون‌وقت {name} همون‌طوری چاپ می‌شه. یه حرف کوچیک با قدرت زیاد.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "x = 5 — what does f\"I have {x * 2}\" print?", fa: "‏x = 5 — خروجی f\"I have {x * 2}\" چیه؟" },
                  options: [
                    { en: "I have {x * 2}", fa: "‏I have {x * 2}" },
                    { en: "I have 10", fa: "‏I have 10" },
                    { en: "I have 52", fa: "‏I have 52" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "f-strings evaluate the expression: 5 * 2 = 10.", fa: "‏f-string عبارت رو حساب می‌کنه: ۵ × ۲ = ۱۰." },
                },
                {
                  q: { en: "Which one is a correct f-string?", fa: "کدوم یه f-string درسته؟" },
                  options: [
                    { en: "f\"Hi {name}\"", fa: "‏f\"Hi {name}\"" },
                    { en: "\"Hi {name}\"", fa: "‏\"Hi {name}\"" },
                    { en: "f\"Hi name\"", fa: "‏f\"Hi name\"" },
                    { en: "F\"Hi {name}\"", fa: "‏F\"Hi {name}\"" },
                  ],
                  answer: 0,
                  explain: { en: "Lowercase f + quotes + {variable}.", fa: "‏f کوچیک + گیومه + {متغیر}." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "ID Card Pro", fa: "کارت شناسایی حرفه‌ای" },
              brief: {
                en: "Read a name, a city and a year (three inputs), then print a stylish class card:",
                fa: "اسم، شهر و سال رو بخون (سه ورودی) و بعد یه کارت خوشگل چاپ کن:",
              },
              starter: `name = input()
city = input()
year = input()

# Print:
# *** NAME ***      (in CAPITALS)
# City: the city
# Class of the year
`,
              solution: `name = input()
city = input()
year = input()
print(f"*** {name.upper()} ***")
print(f"City: {city}")
print(f"Class of {year}")`,
              hints: [
                {
                  en: "First line: f\"*** {name.upper()} ***\" — asterisks, spaces and all.",
                  fa: "خط اول:‏ f\"*** {name.upper()} ***\" — با ستاره‌ها و فاصله‌هاش.",
                },
                {
                  en: "Year comes as text — no conversion needed for printing.",
                  fa: "سال به شکل متن میاد — برای چاپ نیازی به تبدیل نیست.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "sara\ntehran\n2026", expect: "*** SARA ***\nCity: tehran\nClass of 2026" },
                  { stdin: "kenji\nosaka\n2027", expect: "*** KENJI ***\nCity: osaka\nClass of 2027", hidden: true },
                ],
              },
              sample: { stdin: "sara\ntehran\n2026", expect: "*** SARA ***\nCity: tehran\nClass of 2026" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m2",
      title: { en: "Variables & Numbers", fa: "متغیرها و اعداد" },
      blurb: {
        en: "Give names to data, do the math, and ask users for input.",
        fa: "به داده‌ها اسم بده، حساب کن و از کاربر ورودی بگیر.",
      },
      lessons: [
        {
          id: "py-m2-l1",
          title: { en: "Boxes with Names", fa: "جعبه‌هایی با اسم" },
          goal: {
            en: "Store values in variables and reuse them anywhere.",
            fa: "مقدارها رو توی متغیر ذخیره کن و هر جا خواستی استفاده‌شون کن.",
          },
          minutes: 9,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A **variable** is a labeled box for a value. You create one with = (read it as \"gets\"): age = 19 puts 19 into a box called age. From then on, the name IS the value.",
                  fa: "**متغیر (Variable)** یه جعبهٔ برچسب‌دار برای یه مقداره. با = می‌سازی (بخونش «می‌شه»):‏ age = 19 یعنی عدد ۱۹ می‌ره توی جعبهٔ age. از این به بعد، اسم همون مقداره.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `project = "Nexus"
stars = 42
print(project)
print(stars)
print(f"{project} has {stars} stars")`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Boxes can be refilled — the old value is gone. And names should be lowercase_with_underscores so other coders instantly understand.",
                  fa: "جعبه‌ها رو می‌شه دوباره پر کرد — مقدار قبلی می‌ره. اسم متغیرها هم بهتره lowercase_with_underscores باشه که بقیه برنامه‌نویس‌ها سریع بفهمن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `mood = "sleepy"
print(mood)
mood = "unstoppable"
print(mood)`,
                },
                {
                  type: "tip",
                  en: "Variables make code readable: price * 2 beats 199 * 2 every single time.",
                  fa: "متغیرها کد رو خوانا می‌کنن: price * 2 از 199 * 2 قشنگ‌تره، همیشه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "x = 3 then x = 8 — what is x now?", fa: "‏x = 3 بعد x = 8 — حالا x چنده؟" },
                  options: [
                    { en: "3", fa: "‏۳" },
                    { en: "8", fa: "‏۸" },
                    { en: "11", fa: "‏۱۱" },
                    { en: "An error", fa: "خطا" },
                  ],
                  answer: 1,
                  explain: { en: "The last assignment wins — the box was refilled.", fa: "آخرین انتساب برنده ــه — جعبه دوباره پر شده." },
                },
                {
                  q: { en: "Which is the best variable name?", fa: "کدوم بهترین اسم متغیره؟" },
                  options: [
                    { en: "x9q", fa: "‏x9q" },
                    { en: "user_score", fa: "‏user_score" },
                    { en: "User Score", fa: "‏User Score" },
                    { en: "2score", fa: "‏2score" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Lowercase + underscores + meaningful = pythonic.",
                    fa: "حروف کوچیک + زیرخط + بامعنی = پایتونیک.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Snack Budget", fa: "بودجهٔ خوراکی" },
              brief: {
                en: "Each snack costs 120 coins and you buy 4. Using the given variables, compute the total and print exactly: You need 480 coins",
                fa: "هر خوراکی ۱۲۰ سکه‌ست و تو ۴ تا می‌خری. با متغیرهای آماده، جمع رو حساب کن و دقیقاً چاپ کن: You need 480 coins",
              },
              starter: `price = 120
candies = 4

# compute total, then print: You need {total} coins
`,
              solution: `price = 120
candies = 4
total = price * candies
print(f"You need {total} coins")`,
              hints: [
                {
                  en: "total = price * candies — multiplication is *.",
                  fa: "‏total = price * candies — ضرب با ستاره‌ست.",
                },
                {
                  en: "Then f\"You need {total} coins\" — no manual math in the text!",
                  fa: "بعد f\"You need {total} coins\" — بدون محاسبهٔ دستی توی متن!",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "You need 480 coins" }],
              },
              sample: { expect: "You need 480 coins" },
            },
          ],
        },
        {
          id: "py-m2-l2",
          title: { en: "Numbers Do Math", fa: "اعداد ریاضی می‌کنن" },
          goal: {
            en: "Use + - * / // % ** — and know which one for which job.",
            fa: "‏+ - * / // % ** رو استفاده کن و بدون کدوم برای کدوم کاره.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Python is a calculator that never sleeps: + - * do the obvious. / divides and ALWAYS gives a float (even 10 / 2 → 5.0). If you want a whole number, use // floor division.",
                  fa: "پایتون یه ماشین‌حسابِ بی‌خوابه: + و - و * همون کارای همیشگی رو می‌کنن. / تقسیم می‌کنه و همیشه اعشاری می‌ده (حتی 10 / 2 → 5.0). اگه عدد کامل می‌خوای از // استفاده کن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `print(10 / 2)
print(10 // 3)
print(2 ** 10)`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The % operator gives the REMAINDER — perfect for \"is it even?\" (n % 2 == 0) and for splitting things into groups. ** is power: 2 ** 10 = 1024.",
                  fa: "عملگر % باقیماندهٔ تقسیم رو می‌ده — عالیه برای «فرد است یا زوج؟» (n % 2 == 0) و تقسیم چیزها بین گروه‌ها. ** هم توانه: 2 ** 10 یعنی ۱۰۲۴.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `minutes = 135
print(minutes // 60)
print(minutes % 60)`,
                },
                {
                  type: "tip",
                  en: "135 // 60 → 2 hours, 135 % 60 → 15 minutes. You just built a clock splitter.",
                  fa: "‏135 // 60 → ۲ ساعت،‏ 135 % 60 → ۱۵ دقیقه. همین الان یه ساعت‌ساز نوشتی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What is 7 // 2 ?", fa: "‏7 // 2 چند می‌شه؟" },
                  options: [
                    { en: "3.5", fa: "‏۳٫۵" },
                    { en: "3", fa: "‏۳" },
                    { en: "4", fa: "‏۴" },
                    { en: "1", fa: "‏۱" },
                  ],
                  answer: 1,
                  explain: { en: "// chops off the decimal — 7 // 2 = 3.", fa: "‏// اعشار رو می‌بره — 7 // 2 می‌شه ۳." },
                },
                {
                  q: { en: "What is 10 % 3 ?", fa: "‏10 % 3 چند می‌شه؟" },
                  options: [
                    { en: "3", fa: "‏۳" },
                    { en: "3.33", fa: "‏۳٫۳۳" },
                    { en: "1", fa: "‏۱" },
                    { en: "0", fa: "‏۰" },
                  ],
                  answer: 2,
                  explain: { en: "10 = 3×3 + 1 → the remainder is 1.", fa: "‏۱۰ = ۳×۳ + ۱ → باقیمانده ۱ ــه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Time Splitter", fa: "جداکنندهٔ زمان" },
              brief: {
                en: "Read a number of minutes and convert it: print it as hours and minutes like 2h 15m.",
                fa: "یه تعداد دقیقه بخون و تبدیلش کن: به شکل ساعت و دقیقه چاپش کن، مثل 2h 15m.",
              },
              starter: `total = int(input())

# hours = total // 60
# minutes = total % 60
# print f"{hours}h {minutes}m"
`,
              solution: `total = int(input())
hours = total // 60
minutes = total % 60
print(f"{hours}h {minutes}m")`,
              hints: [
                {
                  en: "// gives whole hours, % gives the leftover minutes.",
                  fa: "‏// ساعت‌های کامل رو می‌ده و % دقیقه‌های باقی‌مانده رو.",
                },
                {
                  en: "One print with an f-string: f\"{hours}h {minutes}m\".",
                  fa: "یه print با f-string:‏ f\"{hours}h {minutes}m\".",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "135", expect: "2h 15m" },
                  { stdin: "60", expect: "1h 0m", hidden: true },
                  { stdin: "45", expect: "0h 45m", hidden: true },
                ],
              },
              sample: { stdin: "135", expect: "2h 15m" },
            },
          ],
        },
        {
          id: "py-m2-l3",
          title: { en: "Asking the User", fa: "حرف زدن با کاربر" },
          goal: {
            en: "Capture keyboard input() and convert it with int() and float().",
            fa: "ورودی کیبورد رو با input بگیر و با int و float تبدیلش کن.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "input() pauses and waits for the user to type. In this playground, the Input box feeds it lines — each input() call takes the next line. Here's a two-question conversation:",
                  fa: "‏input() برنامه رو نگه می‌داره تا کاربر تایپ کنه. توی زمین بازی این‌جا، باکسِ Input خط‌ها رو بهش می‌ده — هر بار input یه خط برمی‌داره. یه گفتگوی دو سؤالی:",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `name = input()
city = input()
print(f"{name} from {city}!")`,
                  caption: { en: "Type two lines in the Input box before running.", fa: "قبل از اجرا دو خط توی باکس Input بنویس." },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Plot twist: input() ALWAYS returns text — even \"19\" is a string. Before doing math, convert it: int(\"19\") → 19, float(\"1.5\") → 1.5.",
                  fa: "یه نکته:‏ input() همیشه متن برمی‌گردونه — حتی \"19\" یه رشته‌ست. قبل از ریاضی تبدیلش کن:‏ int(\"19\") → 19 و float(\"1.5\") → 1.5.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `age = int(input())
print(f"In 5 years: {age + 5}")`,
                },
                {
                  type: "warn",
                  en: "\"19\" + 5 crashes — you can't add text and a number. Convert first, math second.",
                  fa: "‏\"19\" + 5 خطا می‌ده — متن و عدد جمع نمی‌شن. اول تبدیل، بعد ریاضی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What type does input() always return?", fa: "‏input() همیشه چه نوعی برمی‌گردونه؟" },
                  options: [
                    { en: "A number", fa: "عدد" },
                    { en: "A string", fa: "رشته (متن)" },
                    { en: "A boolean", fa: "درست/غلط" },
                    { en: "It depends", fa: "بستگی داره" },
                  ],
                  answer: 1,
                  explain: { en: "Always a string — convert with int() or float() for math.", fa: "همیشه رشته — برای ریاضی با int یا float تبدیلش کن." },
                },
                {
                  q: { en: "User types 4. What is int(input()) * 3 ?", fa: "کاربر ۴ می‌زنه.‏ int(input()) * 3 چنده؟" },
                  options: [
                    { en: "12", fa: "‏۱۲" },
                    { en: "\"444\"", fa: "‏\"444\"" },
                    { en: "\"4\" * 3", fa: "‏\"4\" * 3" },
                    { en: "An error", fa: "خطا" },
                  ],
                  answer: 0,
                  explain: { en: "int() converts, then 4 × 3 = 12.", fa: "‏int تبدیل می‌کنه، بعد ۴ × ۳ = ۱۲." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Echo Greeter", fa: "سلام‌کنندهٔ آینه‌ای" },
              brief: {
                en: "Read a name, then an age (as a number). Greet them and reveal their age next year:",
                fa: "یه اسم و یه سن (به صورت عدد) بخون. سلام کن و سنش رو سال بعد لو بده:",
              },
              starter: `name = input()
age = int(input())

# print: Hi NAME!
# print: Next year you will be AGE+1.
`,
              solution: `name = input()
age = int(input())
print(f"Hi {name}!")
print(f"Next year you will be {age + 1}.")`,
              hints: [
                {
                  en: "Line 1 is a plain f-string; line 2 does the math inside the braces.",
                  fa: "خط اول یه f-string ساده‌ست؛ خط دوم ریاضی رو داخل آکولاد انجام می‌ده.",
                },
                {
                  en: "Don't forget the final period in each sentence!",
                  fa: "نقطهٔ آخر جمله‌ها رو جا ننداز!",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "sara\n19", expect: "Hi sara!\nNext year you will be 20." },
                  { stdin: "kenji\n99", expect: "Hi kenji!\nNext year you will be 100.", hidden: true },
                ],
              },
              sample: { stdin: "sara\n19", expect: "Hi sara!\nNext year you will be 20." },
            },
          ],
        },
        {
          id: "py-m2-l4",
          title: { en: "Mini-Project: Tip Calculator", fa: "پروژهٔ کوچک: محاسبه‌گر انعام" },
          goal: {
            en: "Combine input, float math and rounding into a tool you'll actually use.",
            fa: "ورودی، محاسبهٔ اعشاری و رند کردن رو ترکیب کن و یه ابزار واقعی بساز.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Time to build something REAL. A tip calculator: read the bill as a float, compute a 15% tip, and show the total. Real programs = input → process → output.",
                  fa: "وقتشه یه چیز واقعی بسازی. یه محاسبه‌گر انعام: صورتحساب رو اعشاری بگیر، ۱۵٪ انعام حساب کن و جمع رو نشون بده. برنامهٔ واقعی یعنی: ورودی → پردازش → خروجی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `bill = float(input())
tip = bill * 0.15
print(f"Bill: {bill}")
print(f"Tip: {tip}")`,
                  caption: { en: "Run it with 100 in the Input box.", fa: "با عدد ۱۰۰ توی Input اجراش کن." },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Floats can be ugly: 150 * 0.15 → 22.499999999999996. The fix is round(value, 2) which keeps two decimal places. Always round money before showing it.",
                  fa: "اعداد اعشاری گاهی زشت می‌شن:‏ 150 * 0.15 → 22.499999999999996. راه‌حلش round(value, 2) ــه که دو رقم اعشار نگه می‌داره. پول رو همیشه قبل از نشون دادن رند کن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `bill = float(input())
tip = round(bill * 0.15, 2)
total = bill + tip
print(f"Tip: {tip}")
print(f"Total: {total}")`,
                },
                {
                  type: "tip",
                  en: "Try bill = 150 in the Input box: Tip 22.5, Total 172.5. Clean. 💸",
                  fa: "با ۱۵۰ امتحان کن: انعام ۲۲٫۵ و جمع ۱۷۲٫۵. تمیز. 💸",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Why round() money calculations?", fa: "چرا پول رو round می‌کنیم؟" },
                  options: [
                    { en: "Float math leaves long decimals", fa: "ریاضی اعشاری رقم‌های طولانی می‌ذاره" },
                    { en: "round() makes code faster", fa: "‏round کد رو سریع‌تر می‌کنه" },
                    { en: "It's required by Python", fa: "پایتون اجبارش کرده" },
                    { en: "round() deletes the bill", fa: "‏round صورتحساب رو پاک می‌کنه" },
                  ],
                  answer: 0,
                  explain: { en: "0.15 isn't exact in binary — round(value, 2) keeps it clean.", fa: "‏۰٫۱۵ توی سیستم دودویی دقیق نیست — round(value, 2) تمیزش می‌کنه." },
                },
                {
                  q: { en: "Which converts \"99.5\" correctly?", fa: "کدوم \"99.5\" رو درست تبدیل می‌کنه؟" },
                  options: [
                    { en: "int(\"99.5\")", fa: "‏int(\"99.5\")" },
                    { en: "float(\"99.5\")", fa: "‏float(\"99.5\")" },
                    { en: "str(\"99.5\")", fa: "‏str(\"99.5\")" },
                    { en: "input(\"99.5\")", fa: "‏input(\"99.5\")" },
                  ],
                  answer: 1,
                  explain: { en: "float() handles decimals; int() would reject the string.", fa: "‏float اعشار رو هندل می‌کنه؛ int اون رشته رو قبول نمی‌کنه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Real Tip Calculator", fa: "محاسبه‌گر واقعی انعام رو بساز" },
              brief: {
                en: "Read the bill (float). Print the 15% tip and the total, both rounded to 2 decimals:",
                fa: "صورتحساب رو بخون (اعشاری). انعام ۱۵٪ و جمع کل رو با دو رقم اعشار چاپ کن:",
              },
              starter: `bill = float(input())

# tip = 15% of bill, rounded to 2 decimals
# total = bill + tip
# print Tip: {tip}
# print Total: {total}
`,
              solution: `bill = float(input())
tip = round(bill * 0.15, 2)
total = bill + tip
print(f"Tip: {tip}")
print(f"Total: {total}")`,
              hints: [
                {
                  en: "tip = round(bill * 0.15, 2) — round FIRST, then add.",
                  fa: "‏tip = round(bill * 0.15, 2) — اول رند، بعد جمع.",
                },
                {
                  en: "Total = bill + tip (using the ROUNDED tip).",
                  fa: "‏Total = bill + tip (با همون انعامِ رندشده).",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "150", expect: "Tip: 22.5\nTotal: 172.5" },
                  { stdin: "80", expect: "Tip: 12.0\nTotal: 92.0", hidden: true },
                  { stdin: "200", expect: "Tip: 30.0\nTotal: 230.0", hidden: true },
                ],
              },
              sample: { stdin: "150", expect: "Tip: 22.5\nTotal: 172.5" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m3",
      title: { en: "Decisions & Loops", fa: "تصمیم‌ها و حلقه‌ها" },
      blurb: {
        en: "Teach your programs to choose, repeat, and never get bored.",
        fa: "به برنامه‌هات یاد بده انتخاب کنن، تکرار کنن و هیچ‌وقت خسته نشن.",
      },
      lessons: [
        {
          id: "py-m3-l1",
          title: { en: "if / elif / else", fa: "اگر / وگرنه اگر / وگرنه" },
          goal: {
            en: "Make your program take different paths based on conditions.",
            fa: "بگذار برنامه‌ات بسته به شرط‌ها مسیرهای مختلف بره.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Programs get smart with **if**: run this block ONLY when a condition is true. The condition ends with a colon, and the block below it is indented by exactly 4 spaces — that indentation IS the block.",
                  fa: "برنامه‌ها با **if** باهوش می‌شن: این بلاک رو فقط وقتی شرط درست بود اجرا کن. شرط با دونقطه تموم می‌شه و بلاک زیرش دقیقاً ۴ فاصله تورفتگی داره — همین تورفتگی یعنی بلاک.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `mood = "happy"
if mood == "happy":
    print("Keep shipping! 🚀")`,
                },
                {
                  type: "warn",
                  en: "== compares (\"is equal?\"), = assigns. Mixing them up is the classic beginner bug.",
                  fa: "‏== مقایسه‌ست («برابر هست؟»)، = مقدار می‌ده. قاطی‌کردنشون باگ کلاسیک تازه‌کارهاست.",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Chain paths with elif (else if) and catch everything else with else. Python checks top to bottom and runs the FIRST matching branch only.",
                  fa: "با elif (اگر نه، اگر...) مسیرها رو زنجیر کن و با else بقیهٔ حالت‌ها رو بگیر. پایتون از بالا به پایین چک می‌کنه و فقط اولین شاخهٔ درست رو اجرا می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `battery = 18
if battery > 50:
    print("All good")
elif battery > 20:
    print("Find a charger soon")
else:
    print("EMERGENCY ⚠")`,
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "score = 85 — which branch runs in if score > 90 / elif score > 80 / else?", fa: "‏score = 85 — کدوم شاخه اجرا می‌شه: if score > 90 / elif score > 80 / else؟" },
                  options: [
                    { en: "The if branch", fa: "شاخهٔ if" },
                    { en: "The elif branch", fa: "شاخهٔ elif" },
                    { en: "The else branch", fa: "شاخهٔ else" },
                    { en: "All of them", fa: "همه‌شون" },
                  ],
                  answer: 1,
                  explain: { en: "85 > 90 is false, 85 > 80 is true → elif runs, else is skipped.", fa: "‏۸۵ > ۹۰ غلطه، ۸۵ > ۸۰ درسته → elif اجرا می‌شه و else رد می‌شه." },
                },
                {
                  q: { en: "How many spaces indent an if-block by convention?", fa: "بلاک if به قاعده چند فاصله تورفتگی داره؟" },
                  options: [
                    { en: "1", fa: "۱" },
                    { en: "2", fa: "۲" },
                    { en: "4", fa: "۴" },
                    { en: "8", fa: "۸" },
                  ],
                  answer: 2,
                  explain: { en: "4 spaces — PEP 8, the official Python style guide.", fa: "۴ فاصله — طبق PEP 8، راهنمای رسمی سبک پایتون." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Grade Machine", fa: "ماشین نمره" },
              brief: {
                en: "Read a score (0-100) and print its letter: 90+ → A, 70+ → B, 50+ → C, below 50 → F. Format: Grade: B",
                fa: "یه نمره (۰ تا ۱۰۰) بخون و حرفش رو چاپ کن: ۹۰ به بالا → A،‏ ۷۰ به بالا → B،‏ ۵۰ به بالا → C، کمتر از ۵۰ → F. قالب: Grade: B",
              },
              starter: `score = int(input())

# if score >= 90 -> Grade: A
# elif score >= 70 -> Grade: B
# elif score >= 50 -> Grade: C
# else -> Grade: F
`,
              solution: `score = int(input())
if score >= 90:
    print("Grade: A")
elif score >= 70:
    print("Grade: B")
elif score >= 50:
    print("Grade: C")
else:
    print("Grade: F")`,
              hints: [
                {
                  en: "Order matters: check 90 first, then 70, then 50.",
                  fa: "ترتیب مهمه: اول ۹۰، بعد ۷۰، بعد ۵۰.",
                },
                {
                  en: "Every branch prints its own f\"Grade: ...\" line.",
                  fa: "هر شاخه خط f\"Grade: ...\" خودش رو چاپ می‌کنه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "85", expect: "Grade: B" },
                  { stdin: "95", expect: "Grade: A", hidden: true },
                  { stdin: "42", expect: "Grade: F", hidden: true },
                  { stdin: "50", expect: "Grade: C", hidden: true },
                ],
              },
              sample: { stdin: "85", expect: "Grade: B" },
            },
          ],
        },
        {
          id: "py-m3-l2",
          title: { en: "Combining Conditions", fa: "ترکیب شرط‌ها" },
          goal: {
            en: "Chain checks with and, or, not — real-world rules in one line.",
            fa: "شرط‌ها رو با and و or و not زنجیر کن — قانون‌های دنیای واقعی توی یه خط.",
          },
          minutes: 9,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Real rules need multiple checks: **and** means BOTH must be true, **or** means at least one, **not** flips it. Precedence: not → and → or.",
                  fa: "قانون‌های واقعی چند شرط لازم دارن: **and** یعنی هر دو باید درست باشن، **or** یعنی حداقل یکی، و **not** برعکس می‌کنه. اولویت: not بعد and بعد or.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `age = 15
has_pass = True
if age >= 12 and has_pass:
    print("Enter the arena 🎟")
if age < 12 or not has_pass:
    print("Come back later")`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Booleans are values too: True and False (capital first letter!). Comparisons produce them: 5 > 3 is True. You can even store them in variables.",
                  fa: "بولین‌ها خودشون هم مقدارن: True و False (با حروف بزرگ شروع می‌شن!). مقایسه‌ها بولین می‌سازن:‏ 5 > 3 می‌شه True. حتی می‌تونی بریزی‌شون توی متغیر.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `is_weekend = True
tasks_done = 3
ready = is_weekend and tasks_done >= 3
print(ready)`,
                },
                {
                  type: "tip",
                  en: "Read conditions out loud: \"if age is at least 10 AND height at least 120\" — the code should sound like the rule.",
                  fa: "شرط‌ها رو بلند بخون: «اگه سن حداقل ۱۰ و قد حداقل ۱۲۰» — کد باید مثل خود قانون صدا بده.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "True and False = ?", fa: "‏True and False = ؟" },
                  options: [
                    { en: "True", fa: "‏True" },
                    { en: "False", fa: "‏False" },
                    { en: "An error", fa: "خطا" },
                    { en: "None", fa: "‏None" },
                  ],
                  answer: 1,
                  explain: { en: "and needs BOTH to be True.", fa: "‏and به هر دوتا True نیاز داره." },
                },
                {
                  q: { en: "age = 15, height = 130 — what prints: if age >= 10 and height >= 120?", fa: "‏age = 15 و height = 130 — این چاپ می‌شه: if age >= 10 and height >= 120؟" },
                  options: [
                    { en: "The block runs", fa: "بلاک اجرا می‌شه" },
                    { en: "The block is skipped", fa: "بلاک رد می‌شه" },
                    { en: "An error", fa: "خطا" },
                    { en: "Depends on else", fa: "به else بستگی داره" },
                  ],
                  answer: 0,
                  explain: { en: "15 ≥ 10 True, 130 ≥ 120 True → and → True.", fa: "‏۱۵ ≥ ۱۰ درست، ۱۳۰ ≥ ۱۲۰ درست → and → درست." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Roller Coaster Checker", fa: "کنترل‌گر شهاب‌سنگ" },
              brief: {
                en: "The coaster needs BOTH: age 10+ AND height 120+. Read age then height; print Ride on! or Sorry, no ride.",
                fa: "شهاب‌سنگ هر دوتا رو می‌خواد: سن ۱۰ به بالا و قد ۱۲۰ به بالا. سن و بعد قد رو بخون؛ چاپ کن Ride on! یا Sorry, no ride.",
              },
              starter: `age = int(input())
height = int(input())

# if age >= 10 AND height >= 120 -> Ride on!
# otherwise -> Sorry, no ride.
`,
              solution: `age = int(input())
height = int(input())
if age >= 10 and height >= 120:
    print("Ride on!")
else:
    print("Sorry, no ride.")`,
              hints: [
                {
                  en: "One if, one else, joined by and.",
                  fa: "یه if، یه else، با and به هم وصل.",
                },
                {
                  en: "Exactly: Ride on! and Sorry, no ride. — punctuation included.",
                  fa: "دقیقاً: Ride on! و Sorry, no ride. — با علامت‌هاش.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "12\n130", expect: "Ride on!" },
                  { stdin: "8\n130", expect: "Sorry, no ride.", hidden: true },
                  { stdin: "12\n100", expect: "Sorry, no ride.", hidden: true },
                ],
              },
              sample: { stdin: "12\n130", expect: "Ride on!" },
            },
          ],
        },
        {
          id: "py-m3-l3",
          title: { en: "while Loops", fa: "حلقهٔ while" },
          goal: {
            en: "Repeat work as long as a condition holds — countdowns, timers, games.",
            fa: "تا وقتی شرط برقراره کار رو تکرار کن — شمارش معکوس، تایمر، بازی.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A **while loop** repeats its block while the condition stays true. You control it from inside: change a variable each round, or it repeats FOREVER (the infamous infinite loop).",
                  fa: "**حلقهٔ while** بلاکش رو تا وقتی شرط درسته تکرار می‌کنه. کنترلش دست خودته: هر دور یه متغیر رو تغییر بده، وگرنه تا ابد تکرار می‌شه (حلقهٔ بی‌نهایت معروف!).",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `energy = 3
while energy > 0:
    print(f"Energy: {energy}")
    energy -= 1
print("Out of battery!")`,
                },
                {
                  type: "warn",
                  en: "Forgot energy -= 1? energy stays 3 and the loop never ends. pylite will stop it — real Python wouldn't!",
                  fa: "‏energy -= 1 رو جا انداختی؟ انرژی همون ۳ می‌مونه و حلقه تموم نمی‌شه. pylite می‌ایستادش — پایتون واقعی نه!",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Two escape hatches: break exits the loop immediately, continue skips to the next round. Use them for early exits and shortcuts.",
                  fa: "دو تا خروج اضطراری: break فوراً از حلقه می‌زنه بیرون، continue می‌پره دور بعدی. برای خروج زودهنگام و میان‌برها.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `n = 5
while True:
    if n == 3:
        break
    print(n)
    n -= 1`,
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does break do inside a loop?", fa: "‏break داخل حلقه چیکار می‌کنه؟" },
                  options: [
                    { en: "Restarts the loop", fa: "حلقه رو ری‌استارت می‌کنه" },
                    { en: "Skips one round", fa: "یه دور رو رد می‌کنه" },
                    { en: "Exits the loop now", fa: "همین الان از حلقه خارج می‌شه" },
                    { en: "Deletes the condition", fa: "شرط رو پاک می‌کنه" },
                  ],
                  answer: 2,
                  explain: { en: "break = leave immediately; continue = skip one round.", fa: "‏break یعنی فوری خارج شو؛ continue یعنی یه دور رو رد کن." },
                },
                {
                  q: { en: "n = 1 — how many times does `while n < 4:` print n if you do print(n) then n += 1?", fa: "‏n = 1 — حلقهٔ while n < 4 چند بار n رو چاپ می‌کنه اگه اول print(n) بعد n += 1 کنی؟" },
                  options: [
                    { en: "2", fa: "۲" },
                    { en: "3", fa: "۳" },
                    { en: "4", fa: "۴" },
                    { en: "Forever", fa: "تا ابد" },
                  ],
                  answer: 1,
                  explain: { en: "n becomes 1, 2, 3 — printed each time; at 4 the condition fails.", fa: "‏n می‌شه ۱ و ۲ و ۳ — هر بار چاپ می‌شه؛ به ۴ که برسه شرط غلط می‌شه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Rocket Countdown", fa: "شمارش معکوس موشک" },
              brief: {
                en: "Read a number and count down to 1, one per line, then print Liftoff! 🚀",
                fa: "یه عدد بخون و تا ۱ یکی‌یکی بشمار، هر عدد یه خط، بعد چاپ کن Liftoff! 🚀",
              },
              starter: `n = int(input())

# while n > 0:
#   print n
#   decrease n by 1
# then print Liftoff! 🚀
`,
              solution: `n = int(input())
while n > 0:
    print(n)
    n -= 1
print("Liftoff! 🚀")`,
              hints: [
                {
                  en: "print(n) then n -= 1 INSIDE the while block.",
                  fa: "‏print(n) بعد n -= 1، هر دو داخل بلاک while.",
                },
                {
                  en: "Liftoff! 🚀 prints AFTER the loop — no indent.",
                  fa: "‏Liftoff! 🚀 بعد از حلقه چاپ می‌شه — بدون تورفتگی.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "3", expect: "3\n2\n1\nLiftoff! 🚀" },
                  { stdin: "1", expect: "1\nLiftoff! 🚀", hidden: true },
                ],
              },
              sample: { stdin: "3", expect: "3\n2\n1\nLiftoff! 🚀" },
            },
          ],
        },
        {
          id: "py-m3-l4",
          title: { en: "for Loops & range()", fa: "حلقهٔ for و range" },
          goal: {
            en: "Repeat a fixed number of times with for + range — the workhorse of automation.",
            fa: "تعداد مشخصی رو با for و range تکرار کن — اسب‌بارکُشِ اتوماسیون.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "While loops repeat UNTIL something happens. **for** loops repeat a KNOWN number of times. range(5) counts 0, 1, 2, 3, 4 — five rounds, starting at zero.",
                  fa: "حلقهٔ while تا وقتی چیزی اتفاق بیفته تکرار می‌کنه. حلقهٔ **for** تعداد مشخصی تکرار داره.‏ range(5) می‌شماره ۰ تا ۴ — پنج دور، از صفر شروع.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `for i in range(3):
    print(f"Push-up {i + 1} done")`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "range() is flexible: range(1, 6) counts 1..5, range(0, 10, 2) jumps by 2. It can even walk through a string, letter by letter.",
                  fa: "‏range() انعطاف داره:‏ range(1, 6) از ۱ تا ۵،‏ range(0, 10, 2) دوتا دوتا می‌پره. حتی می‌تونه حرف‌به‌حرف توی یه رشته راه بره.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `for n in range(1, 4):
    print(n)
for ch in "py":
    print(ch)`,
                },
                {
                  type: "tip",
                  en: "range(1, 11) gives 1 to 10 — the classic \"tables\" range. Memorize it.",
                  fa: "‏range(1, 11) از ۱ تا ۱۰ ــه — رنجِ کلاسیک جدول ضرب. حفظش کن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "How many numbers does range(4) produce?", fa: "‏range(4) چند عدد تولید می‌کنه؟" },
                  options: [
                    { en: "3", fa: "۳" },
                    { en: "4", fa: "۴" },
                    { en: "5", fa: "۵" },
                    { en: "0", fa: "۰" },
                  ],
                  answer: 1,
                  explain: { en: "0, 1, 2, 3 — four numbers, ending BEFORE 4.", fa: "‏۰ و ۱ و ۲ و ۳ — چهار تا، قبل از ۴ تموم می‌شه." },
                },
                {
                  q: { en: "What is the FIRST number of range(2, 7)?", fa: "اولین عدد range(2, 7) چیه؟" },
                  options: [
                    { en: "0", fa: "۰" },
                    { en: "1", fa: "۱" },
                    { en: "2", fa: "۲" },
                    { en: "7", fa: "۷" },
                  ],
                  answer: 2,
                  explain: { en: "It starts at 2 and stops before 7.", fa: "از ۲ شروع و قبل از ۷ تموم می‌شه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Times Table", fa: "جدول ضرب" },
              brief: {
                en: "Read a number n and print its full table from n x 1 to n x 10:",
                fa: "عدد n رو بخون و جدول ضرب کاملش رو از n x 1 تا n x 10 چاپ کن:",
              },
              starter: `n = int(input())

# for i in range(1, 11):
#   print f"{n} x {i} = {the result}"
`,
              solution: `n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")`,
              hints: [
                {
                  en: "range(1, 11) — remember, the stop number is excluded.",
                  fa: "‏range(1, 11) — یادته، عدد پایانی حساب نمی‌شه.",
                },
                {
                  en: "The math goes inside the braces: {n * i}.",
                  fa: "محاسبه می‌ره داخل آکولاد:‏ {n * i}.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "7", expect: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70" },
                  { stdin: "3", expect: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30", hidden: true },
                ],
              },
              sample: { stdin: "7", expect: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m4",
      title: { en: "Collections", fa: "مجموعه‌ها" },
      blurb: {
        en: "Lists and dictionaries — carry a whole team of values in one variable.",
        fa: "لیست و دیکشنری — یه تیم کامل از مقدارها توی یه متغیر.",
      },
      lessons: [
        {
          id: "py-m4-l1",
          title: { en: "Lists: The Value Team", fa: "لیست: تیم مقدارها" },
          goal: {
            en: "Store many values in order, reach any of them by index, and grow the list.",
            fa: "چند مقدار رو به‌ترتیب نگه دار، با اندیس به هرکدوم برس و لیست رو بزرگ کن.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A **list** holds many values in one variable, in order, inside [square brackets]. Positions start at 0: team[0] is the first member. Negative indexes count from the end: team[-1] is the last.",
                  fa: "**لیست (List)** چند مقدار رو توی یه متغیر و به‌ترتیب نگه می‌داره، داخل [کروشه]. جایگاه‌ها از ۰ شروع می‌شن: team[0] عضو اول ــه. اندیس منفی هم از آخر می‌شماره: team[-1] عضو آخر.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `team = ["Maya", "Kenji", "Zoe"]
print(team[0])
print(team[-1])
print(len(team))`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Lists grow and shrink: .append(x) adds to the end, .remove(x) deletes the first match. You can also loop straight through a list — no indexes needed.",
                  fa: "لیست بزرگ و کوچیک می‌شه: append(x) ته لیست اضافه می‌کنه، remove(x) اولین برابر رو پاک می‌کنه. می‌تونی مستقیم روی لیست حلقه بزنی — بدون اندیس.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `crew = ["Maya", "Kenji"]
crew.append("Zoe")
print(crew)
for name in crew:
    print(f"Hi {name}")`,
                },
                {
                  type: "warn",
                  en: "team[3] on a 3-item list crashes — the last VALID index is len(team) - 1.",
                  fa: "‏team[3] روی لیست ۳تایی خطا می‌ده — آخرین اندیس معتبر len(team) - 1 ــه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "nums = [10, 20, 30] — what is nums[1]?", fa: "‏nums = [10, 20, 30] —‏ nums[1] چیه؟" },
                  options: [
                    { en: "10", fa: "۱۰" },
                    { en: "20", fa: "۲۰" },
                    { en: "30", fa: "۳۰" },
                    { en: "An error", fa: "خطا" },
                  ],
                  answer: 1,
                  explain: { en: "Index 1 is the SECOND item — indexes start at 0.", fa: "اندیس ۱ دومین عضو ــه — اندیس‌ها از ۰ شروع می‌شن." },
                },
                {
                  q: { en: "What does crew.append(\"Zoe\") do?", fa: "‏crew.append(\"Zoe\") چیکار می‌کنه؟" },
                  options: [
                    { en: "Adds Zoe to the end", fa: "‏Zoe رو ته لیست اضافه می‌کنه" },
                    { en: "Adds Zoe to the start", fa: "‏Zoe رو اول لیست می‌ذاره" },
                    { en: "Replaces the first member", fa: "عضو اول رو عوض می‌کنه" },
                    { en: "Deletes Zoe", fa: "‏Zoe رو پاک می‌کنه" },
                  ],
                  answer: 0,
                  explain: { en: "append always adds at the END of the list.", fa: "‏append همیشه ته لیست اضافه می‌کنه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Color Shelf", fa: "قفسهٔ رنگ‌ها" },
              brief: {
                en: "Read three colors (one per line) into a list, then print the whole list, the first, the last, and the count:",
                fa: "سه رنگ بخون (هر خط یکی) و بریزشون توی لیست، بعد کل لیست، اولی، آخری و تعدادشون رو چاپ کن:",
              },
              starter: `colors = []
colors.append(input())
colors.append(input())
colors.append(input())

# print the list itself
# print First: colors[0]
# print Last: the last color
# print Count: len
`,
              solution: `colors = []
colors.append(input())
colors.append(input())
colors.append(input())
print(colors)
print(f"First: {colors[0]}")
print(f"Last: {colors[-1]}")
print(f"Count: {len(colors)}")`,
              hints: [
                {
                  en: "Printing the list variable prints it with brackets: ['red', ...].",
                  fa: "چاپ خود متغیر لیست، با کروشه چاپ می‌شه: ['red', ...].",
                },
                {
                  en: "Last color: colors[-1] or colors[len(colors) - 1] — both work.",
                  fa: "رنگ آخر:‏ colors[-1] یا colors[len(colors) - 1] — هر دو کار می‌کنن.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "red\nblue\ngreen", expect: "['red', 'blue', 'green']\nFirst: red\nLast: green\nCount: 3" },
                  { stdin: "gold\ntea\nink", expect: "['gold', 'tea', 'ink']\nFirst: gold\nLast: ink\nCount: 3", hidden: true },
                ],
              },
              sample: { stdin: "red\nblue\ngreen", expect: "['red', 'blue', 'green']\nFirst: red\nLast: green\nCount: 3" },
            },
          ],
        },
        {
          id: "py-m4-l2",
          title: { en: "List Superpowers", fa: "ابرقوای لیست" },
          goal: {
            en: "Instantly sum, rank, sort and search lists with built-in tools.",
            fa: "با ابزارهای آماده لیست‌ها رو جمع، رتبه‌بندی، مرتب و جستجو کن.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Python ships with a toolbox for numbers in lists: sum() totals them, max() finds the champion, min() finds the smallest, sorted() hands you a sorted copy.",
                  fa: "پایتون یه جعبه‌ابزار برای اعداد توی لیست داره:‏ sum() جمع می‌زنه، max() قهرمان رو پیدا می‌کنه، min() کوچیک‌ترین رو و sorted() یه نسخهٔ مرتب‌شده می‌ده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `scores = [80, 95, 62]
print(sum(scores))
print(max(scores))
print(sorted(scores))`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Need to know if something is in the list? The **in** operator answers with True/False. Combined with if, it's a one-line search engine.",
                  fa: "می‌خوای بدونی چیزی توی لیست هست یا نه؟ عملگر **in** با True یا False جواب می‌ده. ترکیبش با if می‌شه یه موتور جستجوی تک‌خطی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `menu = ["pizza", "salad", "soup"]
if "pizza" in menu:
    print("Best choice detected")`,
                },
                {
                  type: "tip",
                  en: "sorted() does NOT change the original list — it returns a fresh sorted copy. Want in-place? mylist.sort().",
                  fa: "‏sorted() لیست اصلی رو عوض نمی‌کنه — یه نسخهٔ مرتب تازه می‌ده. می‌خوای درجا مرتب شه؟ mylist.sort().",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "nums = [5, 9, 2] — what is sum(nums)?", fa: "‏nums = [5, 9, 2] —‏ sum(nums) چیه؟" },
                  options: [
                    { en: "9", fa: "۹" },
                    { en: "16", fa: "۱۶" },
                    { en: "[16]", fa: "‏[16]" },
                    { en: "5", fa: "۵" },
                  ],
                  answer: 1,
                  explain: { en: "5 + 9 + 2 = 16.", fa: "‏۵ + ۹ + ۲ = ۱۶." },
                },
                {
                  q: { en: "What does \"py\" in [\"py\", \"js\"] return?", fa: "‏\"py\" in [\"py\", \"js\"] چی برمی‌گردونه؟" },
                  options: [
                    { en: "\"py\"", fa: "‏\"py\"" },
                    { en: "0", fa: "۰" },
                    { en: "True", fa: "‏True" },
                    { en: "An error", fa: "خطا" },
                  ],
                  answer: 2,
                  explain: { en: "in checks membership and returns a boolean.", fa: "‏in عضویت رو چک می‌کنه و بولین برمی‌گردونه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Score Analyzer", fa: "تحلیل‌گر نمره‌ها" },
              brief: {
                en: "Read four scores (one per line). Print the sum, the best, the lowest, and the sorted list:",
                fa: "چهار نمره بخون (هر خط یکی). جمع، بهترین، کم‌ترین و لیست مرتب‌شده رو چاپ کن:",
              },
              starter: `scores = []
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))

# print Sum: ...
# print Best: ...
# print Lowest: ...
# print Sorted: [...]
`,
              solution: `scores = []
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))
print(f"Sum: {sum(scores)}")
print(f"Best: {max(scores)}")
print(f"Lowest: {min(scores)}")
print(f"Sorted: {sorted(scores)}")`,
              hints: [
                {
                  en: "sum(), max(), min() take the whole list as one argument.",
                  fa: "‏sum و max و min کل لیست رو یه‌جا می‌گیرن.",
                },
                {
                  en: "Printing a list shows brackets and commas exactly like Python formats it.",
                  fa: "چاپ لیست دقیقاً با کروشه و کاما به سبک پایتون انجام می‌شه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "80\n90\n40\n50", expect: "Sum: 260\nBest: 90\nLowest: 40\nSorted: [40, 50, 80, 90]" },
                  { stdin: "10\n30\n20\n25", expect: "Sum: 85\nBest: 30\nLowest: 10\nSorted: [10, 20, 25, 30]", hidden: true },
                ],
              },
              sample: { stdin: "80\n90\n40\n50", expect: "Sum: 260\nBest: 90\nLowest: 40\nSorted: [40, 50, 80, 90]" },
            },
          ],
        },
        {
          id: "py-m4-l3",
          title: { en: "Dictionaries: Labeled Data", fa: "دیکشنری: دادهٔ برچسب‌دار" },
          goal: {
            en: "Map keys to values — the data structure behind settings, profiles and scores.",
            fa: "کلید رو به مقدار وصل کن — ساختاری که پشت تنظیمات، پروفایل‌ها و امتیازهاست.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A **dictionary** stores key → value pairs inside {curly braces}. Instead of positions (0, 1, 2…), you look things up by a meaningful key — like a real dictionary: word → meaning.",
                  fa: "**دیکشنری (Dictionary)** جفت‌های کلید → مقدار رو داخل {آکولاد} نگه می‌داره. به‌جای جایگاه عددی (۰، ۱، ۲...) با یه کلیدِ بامعنی پیداشون می‌کنی — مثل دیکشنری واقعی: کلمه → معنی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `rep = {"maya": 120, "kenji": 95}
print(rep["maya"])
rep["zoe"] = 200
print(rep)`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Check for a key with in, list them with .keys(), and read values safely with .get(key) — it gives None instead of crashing when the key is missing.",
                  fa: "کلید رو با in چک کن، لیست‌شون کن با keys()، و مقدار رو امن بخون با get(key) — اگه کلید نباشه به‌جای خطا None می‌ده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `profile = {"name": "Maya", "role": "Builder"}
if "role" in profile:
    print(profile["role"])
print(profile.get("email"))`,
                },
                {
                  type: "tip",
                  en: "Dictionaries are EVERYWHERE: game scores, user settings, product prices. Master them early.",
                  fa: "دیکشنری همه‌جاست: امتیاز بازی، تنظیمات کاربر، قیمت محصولات. زود بندازش به پشت.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "How do you read Maya's score from rep = {\"maya\": 120}?", fa: "امتیاز مایا رو از rep = {\"maya\": 120} چطوری می‌خونی؟" },
                  options: [
                    { en: "rep[0]", fa: "‏rep[0]" },
                    { en: "rep[\"maya\"]", fa: "‏rep[\"maya\"]" },
                    { en: "rep(maya)", fa: "‏rep(maya)" },
                    { en: "rep->maya", fa: "‏rep->maya" },
                  ],
                  answer: 1,
                  explain: { en: "Dictionaries are indexed by KEY, not position.", fa: "دیکشنری با کلید اندیس می‌شه، نه با جایگاه." },
                },
                {
                  q: { en: "What does .get(\"missing\") return when the key doesn't exist?", fa: "اگه کلید وجود نداشته باشه،‏ get(\"missing\") چی برمی‌گردونه؟" },
                  options: [
                    { en: "An error", fa: "خطا" },
                    { en: "0", fa: "۰" },
                    { en: "None", fa: "‏None" },
                    { en: "The empty string", fa: "رشتهٔ خالی" },
                  ],
                  answer: 2,
                  explain: { en: ".get() returns None safely — no crash.", fa: "‏get() امن None برمی‌گردونه — بدون خطا." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Codebook", fa: "دفترِ رمز" },
              brief: {
                en: "The starter holds a codebook dictionary. Read a word; if it's in the book print word -> meaning, otherwise print Not in the codebook.",
                fa: "استارتر یه دیکشنری به اسم codebook داره. یه کلمه بخون؛ اگه توی دفتر بود چاپ کن word -> meaning، وگرنه چاپ کن Not in the codebook",
              },
              starter: `codebook = {
    "py": "A snake and a language",
    "html": "The skeleton of the web",
    "css": "The style of the web",
}

word = input()

# if word in codebook -> print(word, "->", codebook[word])
# else -> print("Not in the codebook")
`,
              solution: `codebook = {
    "py": "A snake and a language",
    "html": "The skeleton of the web",
    "css": "The style of the web",
}
word = input()
if word in codebook:
    print(word, "->", codebook[word])
else:
    print("Not in the codebook")`,
              hints: [
                {
                  en: "print(word, \"->\", codebook[word]) — commas in print add spaces.",
                  fa: "‏print(word, \"->\", codebook[word]) — کاما توی print فاصله اضافه می‌کنه.",
                },
                {
                  en: "The else branch prints the exact string: Not in the codebook",
                  fa: "شاخهٔ else دقیقاً چاپ می‌کنه: Not in the codebook",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "css", expect: "css -> The style of the web" },
                  { stdin: "py", expect: "py -> A snake and a language", hidden: true },
                  { stdin: "java", expect: "Not in the codebook", hidden: true },
                ],
              },
              sample: { stdin: "css", expect: "css -> The style of the web" },
            },
          ],
        },
        {
          id: "py-m4-l4",
          title: { en: "Mini-Project: Mission Manager", fa: "پروژهٔ کوچک: مدیر مأموریت" },
          goal: {
            en: "Build a working to-do tool: number tasks, remove one, show the updated list.",
            fa: "یه ابزار کارکردنی بساز: شماره‌گذاری مأموریت‌ها، حذف یکی، و نشون دادن لیست به‌روز.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Numbered lists are a classic pattern: loop with range(len(tasks)) and print i + 1 as the human-friendly number. Users count from 1; Python counts from 0.",
                  fa: "لیست شماره‌دار یه الگوی کلاسیکه: با range(len(tasks)) حلقه بزن و i + 1 رو به‌عنوان شمارهٔ آدمیزادی چاپ کن. آدم‌ها از ۱ می‌شمرن، پایتون از ۰.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `tasks = ["Learn Python", "Build a page"]
for i in range(len(tasks)):
    print(f"{i + 1}. {tasks[i]}")`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Removing by name: if the mission is in the list, tasks.remove(name) deletes it; then reprint the list to show the new reality. If it's not there — say so politely.",
                  fa: "حذف با اسم: اگه مأموریت توی لیست بود، tasks.remove(name) پاکش می‌کنه؛ بعد لیست رو دوباره چاپ کن تا وضعیت جدید معلوم شه. اگه نبود — محترمانه خبر بده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `task = input()
if task in tasks:
    tasks.remove(task)
    print("Removed", task)
else:
    print("Not on the list")`,
                },
                {
                  type: "tip",
                  en: "This input → check → change → show cycle is the heartbeat of almost every app you use.",
                  fa: "همین چرخهٔ ورودی → چک → تغییر → نمایش، ضربان قلب تقریباً هر اپی ــه که استفاده می‌کنی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "tasks has 3 items — what does i + 1 print in the last round?", fa: "‏tasks سه عضو داره — دور آخر i + 1 چی چاپ می‌کنه؟" },
                  options: [
                    { en: "2", fa: "۲" },
                    { en: "3", fa: "۳" },
                    { en: "4", fa: "۴" },
                    { en: "0", fa: "۰" },
                  ],
                  answer: 1,
                  explain: { en: "i ends at 2 (last index), so i + 1 = 3.", fa: "‏i آخرش ۲ ــه (آخرین اندیس)، پس i + 1 = ۳." },
                },
                {
                  q: { en: "What should you check BEFORE tasks.remove(name)?", fa: "قبل از tasks.remove(name) چی رو باید چک کنی؟" },
                  options: [
                    { en: "That the list is sorted", fa: "این‌که لیست مرتبه" },
                    { en: "That name is in the list", fa: "این‌که name توی لیست هست" },
                    { en: "The time", fa: "ساعت رو" },
                    { en: "Nothing, ever", fa: "هیچی، هیچ‌وقت" },
                  ],
                  answer: 1,
                  explain: { en: "Removing something that's not there raises an error — check with in first.", fa: "حذف چیزی که نیست خطا می‌ده — اول با in چک کن." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Mission Manager", fa: "مدیر مأموریت رو بساز" },
              brief: {
                en: "The starter has your missions. Print them numbered (1. 2. 3.), read a mission name, remove it if it exists, then print the updated numbered list under Updated:. If it wasn't there, print Already gone!",
                fa: "استارتر مأموریت‌هات رو داره. اول با شماره چاپ‌شون کن (1. 2. 3.)، بعد اسم یه مأموریت رو بخون؛ اگه بود حذفش کن و لیست به‌روز رو زیر Updated: چاپ کن. اگه نبود، چاپ کن Already gone!",
              },
              starter: `missions = ["Learn Python", "Build a page", "Touch grass"]

# 1. print "Your missions:" then the numbered list
# 2. target = input()
# 3. if target in missions: remove + print "Updated:" + numbered list
#    else: print "Already gone!"
`,
              solution: `missions = ["Learn Python", "Build a page", "Touch grass"]
print("Your missions:")
for i in range(len(missions)):
    print(f"{i + 1}. {missions[i]}")
target = input()
if target in missions:
    missions.remove(target)
    print("Updated:")
    for i in range(len(missions)):
        print(f"{i + 1}. {missions[i]}")
else:
    print("Already gone!")`,
              hints: [
                {
                  en: "You'll write the same numbered-loop twice — before and after the removal.",
                  fa: "همون حلقهٔ شماره‌دار رو دو بار می‌نویسی — قبل و بعد از حذف.",
                },
                {
                  en: "The header Your missions: prints once, Updated: only after a real removal.",
                  fa: "سربرگ Your missions: یه بار چاپ می‌شه، Updated: فقط بعد از حذف واقعی.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  {
                    stdin: "Build a page",
                    expect: "Your missions:\n1. Learn Python\n2. Build a page\n3. Touch grass\nUpdated:\n1. Learn Python\n2. Touch grass",
                  },
                  { stdin: "Sleep 8h", expect: "Your missions:\n1. Learn Python\n2. Build a page\n3. Touch grass\nAlready gone!", hidden: true },
                ],
              },
              sample: {
                stdin: "Build a page",
                expect: "Your missions:\n1. Learn Python\n2. Build a page\n3. Touch grass\nUpdated:\n1. Learn Python\n2. Touch grass",
              },
            },
          ],
        },
      ],
    },
    {
      id: "py-m5",
      title: { en: "Functions & The Big Build", fa: "توابع و پروژهٔ بزرگ" },
      blurb: {
        en: "Package your logic into reusable machines, meet random, and ship a real game.",
        fa: "منطقت رو به ماشین‌های قابل‌استفادهٔ دوباره بسته‌بندی کن، random رو بشناس و یه بازی واقعی تحویل بده.",
      },
      lessons: [
        {
          id: "py-m5-l1",
          title: { en: "Functions: Your Own Verbs", fa: "توابع: فعل‌های خودت" },
          goal: {
            en: "Wrap steps into named, reusable blocks with def.",
            fa: "قدم‌ها رو با def توی بلاک‌های اسم‌دار و قابل‌استفاده بپیچ.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A **function** is a machine you build once and use forever: def greet(name): creates it, greet(\"Maya\") runs it. The stuff in parentheses are **parameters** — the machine's ingredients.",
                  fa: "**تابع (Function)** یه ماشینه که یه بار می‌سازی و همیشه استفاده می‌کنی:‏ def greet(name): می‌سازدش و greet(\"Maya\") اجراش می‌کنه. چیزهای داخل پرانتز **پارامتر (Parameter)** ــن — مواد اولیهٔ ماشین.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def greet(name):
    print(f"Hello, {name}!")

greet("Maya")
greet("Kenji")`,
                },
                {
                  type: "warn",
                  en: "def only DEFINES the machine — nothing runs until you CALL it by name.",
                  fa: "‏def فقط ماشین رو تعریف می‌کنه — تا اسمش رو صدا نزنی هیچی اجرا نمی‌شه.",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Functions take any number of parameters (or none at all), and their code is indented 4 spaces like every other block. Write once, call a thousand times — that's how professionals avoid copy-paste.",
                  fa: "توابع هر تعداد پارامتر می‌گیرن (یا اصلاً هیچی) و کدشون مثل بقیهٔ بلاک‌ها ۴ فاصله تورفتگی داره. یه بار بنویس، هزار بار صدا بزن — حرفه‌ای‌ها همین‌جوری از کپی‌پیست فرار می‌کنن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def cheer(team, emoji):
    print(f"Go {team}! {emoji}")

cheer("TEKA", "⚡")
cheer("Python", "🐍")`,
                },
                {
                  type: "tip",
                  en: "Rule of thumb: if you paste the same lines twice, it wants to be a function.",
                  fa: "قانون سرانگشتی: اگه یه خط‌ها رو دوبار کپی‌پیست کردی، داره می‌گه من تابام!",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What runs first in this code: def hi(): print(\"x\") then hi()?", fa: "توی این کد اول چی اجرا می‌شه: def hi(): print(\"x\") بعد hi()؟" },
                  options: [
                    { en: "Nothing runs", fa: "هیچی اجرا نمی‌شه" },
                    { en: "def runs the print", fa: "‏def خودش print رو اجرا می‌کنه" },
                    { en: "hi() triggers the print", fa: "‏hi() باعث اجرای print می‌شه" },
                    { en: "An error", fa: "خطا" },
                  ],
                  answer: 2,
                  explain: { en: "def only prepares; the call hi() actually runs it.", fa: "‏def فقط آماده می‌کنه؛ فراخوانی hi() اجراش می‌کنه." },
                },
                {
                  q: { en: "In cheer(team, emoji), what is \"TEKA\" when calling cheer(\"TEKA\", \"⚡\")?", fa: "توی cheer(team, emoji)، موقع صدا زدن cheer(\"TEKA\", \"⚡\")، مقدار \"TEKA\" چیه؟" },
                  options: [
                    { en: "A parameter", fa: "پارامتر" },
                    { en: "An argument", fa: "آرگومان" },
                    { en: "A comment", fa: "کامنت" },
                    { en: "A list", fa: "لیست" },
                  ],
                  answer: 1,
                  explain: {
                    en: "Definition side = parameters; call side = arguments.",
                    fa: "سمت تعریف = پارامتر؛ سمت فراخوانی = آرگومان.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Greeter Bot", fa: "ربات خوش‌آمدگو" },
              brief: {
                en: "Write a function greet(name) that prints Hello, {name}! Welcome aboard. Then read two names and greet each:",
                fa: "تابع greet(name) رو بنویس که چاپ کنه Hello, {name}! Welcome aboard. بعد دو تا اسم بخون و به هرکدوم سلام کن:",
              },
              starter: `# 1. define greet(name) that prints the welcome line
# 2. a = input()
# 3. b = input()
# 4. call greet for both
`,
              solution: `def greet(name):
    print(f"Hello, {name}! Welcome aboard.")

a = input()
b = input()
greet(a)
greet(b)`,
              hints: [
                {
                  en: "def greet(name): with the print indented 4 spaces under it.",
                  fa: "‏def greet(name): و print با ۴ فاصله تورفتگی زیرش.",
                },
                {
                  en: "Call it twice: greet(a) and greet(b).",
                  fa: "دوبار صداش بزن:‏ greet(a) و greet(b).",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "Maya\nKenji", expect: "Hello, Maya! Welcome aboard.\nHello, Kenji! Welcome aboard." },
                  { stdin: "Zoe\nArash", expect: "Hello, Zoe! Welcome aboard.\nHello, Arash! Welcome aboard.", hidden: true },
                ],
              },
              sample: { stdin: "Maya\nKenji", expect: "Hello, Maya! Welcome aboard.\nHello, Kenji! Welcome aboard." },
            },
          ],
        },
        {
          id: "py-m5-l2",
          title: { en: "return: Machines That Answer", fa: "return: ماشینی که جواب می‌ده" },
          goal: {
            en: "Get results OUT of functions with return — and feed them into more code.",
            fa: "با return نتیجه رو از تابع بیرون بکش — و بریزش توی بقیهٔ کد.",
          },
          minutes: 9,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "print shows a value to humans; **return** hands a value back to the PROGRAM. result = cube(3) stores 27 for later use. return also instantly ends the function.",
                  fa: "‏print مقدار رو به آدم نشون می‌ده؛ **return** مقدار رو به خود برنامه برمی‌گردونه.‏ result = cube(3) عدد ۲۷ رو برای بعد ذخیره می‌کنه. return هم فوراً تابع رو تموم می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def cube(n):
    return n ** 3

result = cube(3)
print(result)
print(cube(2) + cube(3))`,
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "This is the pro workflow: small functions that RETURN values, then one place that prints. Test it, combine it, reuse it — that's real engineering.",
                  fa: "این روش حرفه‌ای‌هاست: توابع کوچیکی که return می‌کنن، و یه جا که چاپ می‌کنه. تستش کن، ترکیبش کن، دوباره استفاده‌ش کن — این مهندسی واقعیه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def area(w, h):
    return w * h

a1 = area(3, 4)
a2 = area(2, 5)
print(f"Total: {a1 + a2}")`,
                },
                {
                  type: "tip",
                  en: "A function without return gives back None — the \"nothing here\" value.",
                  fa: "تابعی که return نداره None برمی‌گردونه — یعنی «اینجا هیچی نیست».",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does return do?", fa: "‏return چیکار می‌کنه؟" },
                  options: [
                    { en: "Prints to the screen", fa: "روی صفحه چاپ می‌کنه" },
                    { en: "Hands a value back to the caller", fa: "مقدار رو به فراخوان برمی‌گردونه" },
                    { en: "Deletes the function", fa: "تابع رو پاک می‌کنه" },
                    { en: "Loops forever", fa: "تا ابد حلقه می‌زنه" },
                  ],
                  answer: 1,
                  explain: { en: "return gives the result to whoever called the function.", fa: "‏return نتیجه رو به کسی که تابع رو صدا زده می‌ده." },
                },
                {
                  q: { en: "def f(x): return x * 2 — what is f(3) + f(4)?", fa: "‏def f(x): return x * 2 —‏ f(3) + f(4) چند می‌شه؟" },
                  options: [
                    { en: "14", fa: "۱۴" },
                    { en: "12", fa: "۱۲" },
                    { en: "24", fa: "۲۴" },
                    { en: "None", fa: "‏None" },
                  ],
                  answer: 0,
                  explain: { en: "f(3)=6 and f(4)=8 → 6 + 8 = 14.", fa: "‏f(3)=۶ و f(4)=۸ → ۶ + ۸ = ۱۴." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Cube Machine", fa: "ماشین مکعب" },
              brief: {
                en: "Write cube(n) that RETURNS n to the power of 3. Read two numbers, print each cube, then the sum of both cubes:",
                fa: "تابع cube(n) رو بنویس که n رو به توان ۳ RETURN کنه. دو تا عدد بخون، مکعب هرکدوم و بعد جمع مکعب‌ها رو چاپ کن:",
              },
              starter: `# 1. def cube(n): return n ** 3
# 2. a = int(input())
# 3. b = int(input())
# 4. print both cubes, then print Sum: a+b cubes
`,
              solution: `def cube(n):
    return n ** 3

a = int(input())
b = int(input())
print(cube(a))
print(cube(b))
print(f"Sum: {cube(a) + cube(b)}")`,
              hints: [
                {
                  en: "Power is **: cube returns n ** 3.",
                  fa: "توان با ** ــه: مکعب یعنی n ** 3.",
                },
                {
                  en: "Last line: f\"Sum: {cube(a) + cube(b)}\" — call it twice in one f-string, totally legal.",
                  fa: "خط آخر:‏ f\"Sum: {cube(a) + cube(b)}\" — دو بار صدا زدن توی یه f-string کاملاً قانونیه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "3\n4", expect: "27\n64\nSum: 91" },
                  { stdin: "2\n5", expect: "8\n125\nSum: 133", hidden: true },
                ],
              },
              sample: { stdin: "3\n4", expect: "27\n64\nSum: 91" },
            },
          ],
        },
        {
          id: "py-m5-l3",
          title: { en: "random: The Chaos Module", fa: "random: ماژول بی‌نظمی" },
          goal: {
            en: "Import modules, roll dice with random — and make randomness repeatable with seed.",
            fa: "ماژول import کن، با random تاس بریز — و اتفاق رو با seed تکرارپذیر کن.",
          },
          minutes: 10,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Some superpowers live in **modules** — grab them with import. The random module makes dice rolls, shuffles and lucky picks. That's the backbone of games.",
                  fa: "بعضی از ابرقوا توی **ماژول (Module)** ــان — با import بگیرشون. ماژول random تاس می‌ریزه، بُر می‌زنه و شانس میاره. پایهٔ هر بازیه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `import random

roll = random.randint(1, 6)
print(f"You rolled {roll}")`,
                  caption: { en: "Run it a few times — the dice are alive!", fa: "چند بار اجراش کن — تاس زنده‌ست!" },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "random.choice(list) picks a random item; random.shuffle(list) mixes a list in place. And random.seed(42) freezes the chaos: with the same seed, the \"random\" results repeat exactly — great for testing games.",
                  fa: "‏random.choice(list) یه عضو تصادفی برمی‌داره؛ random.shuffle(list) لیست رو درجا بُر می‌زنه. و random.seed(42) بی‌نظمی رو منجمد می‌کنه: با seed یکسان، نتایج «تصادفی» دقیقاً تکرار می‌شن — برای تست بازی‌ها عالیه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `import random

random.seed(42)
foods = ["pizza", "kabab", "sushi"]
print(random.choice(foods))
print(random.randint(1, 100))`,
                  caption: { en: "Same seed = same result, every run.", fa: "همون seed = همون نتیجه، توی هر اجرا." },
                },
                {
                  type: "tip",
                  en: "Every lesson code you've met lives in the Playground — the Playground tab is your free sandbox, no grading, just vibes.",
                  fa: "هر کدی که تا حالا دیدی توی زمین بازی جا داره — تب Playground زمین خنثایی توئه؛ بدون نمره، فقط ویبه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does import random make available?", fa: "‏import random چی رو در دسترس می‌ذاره؟" },
                  options: [
                    { en: "The random module's tools", fa: "ابزارهای ماژول random" },
                    { en: "Random internet facts", fa: "فکت‌های تصادفی اینترنتی" },
                    { en: "New variables", fa: "متغیرهای جدید" },
                    { en: "A faster CPU", fa: "یه CPU سریع‌تر" },
                  ],
                  answer: 0,
                  explain: { en: "import loads a module so you can call its functions.", fa: "‏import ماژول رو لود می‌کنه تا توابعش رو صدا بزنی." },
                },
                {
                  q: { en: "Why use random.seed()?", fa: "چرا random.seed() استفاده می‌کنیم؟" },
                  options: [
                    { en: "To make results repeatable", fa: "تا نتایج تکرارپذیر بشن" },
                    { en: "To speed up the program", fa: "تا برنامه سریع‌تر شه" },
                    { en: "To delete old results", fa: "تا نتایج قدیمی پاک بشن" },
                    { en: "To make MORE randomness", fa: "تا تصادفی‌تر بشه" },
                  ],
                  answer: 0,
                  explain: { en: "A fixed seed produces the same sequence every run — perfect for tests.", fa: "‏seed ثابت در هر اجرا همون دنباله رو می‌سازه — برای تست عالیه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Password Builder", fa: "سازندهٔ رمز عبور" },
              brief: {
                en: "Read a word and a number. Build a password: the word capitalized, then the number times 7, then an exclamation mark. Print: Password: ...",
                fa: "یه کلمه و یه عدد بخون. رمز بساز: کلمه با حرف اول بزرگ، بعد عدد ضرب‌در ۷، بعد یه علامت تعجب. چاپ کن: Password: ...",
              },
              starter: `word = input()
n = int(input())

# password = word.capitalize() + str(n * 7) + "!"
# print it
`,
              solution: `word = input()
n = int(input())
password = word.capitalize() + str(n * 7) + "!"
print(f"Password: {password}")`,
              hints: [
                {
                  en: "capitalize() uppercases the first letter and lowercases the rest.",
                  fa: "‏capitalize() حرف اول رو بزرگ و بقیه رو کوچیک می‌کنه.",
                },
                {
                  en: "str(n * 7) turns the number into text so + glues strings together.",
                  fa: "‏str(n * 7) عدد رو متن می‌کنه تا + رشته‌ها رو بچسبونه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "sara\n3", expect: "Password: Sara21!" },
                  { stdin: "teka\n12", expect: "Password: Teka84!", hidden: true },
                ],
              },
              sample: { stdin: "sara\n3", expect: "Password: Sara21!" },
            },
          ],
        },
        {
          id: "py-m5-l4",
          title: { en: "FINAL PROJECT: Quiz Master", fa: "پروژهٔ پایانی: استادِ آزمون" },
          goal: {
            en: "Ship a complete, working quiz game — your graduation from TEKA Academy.",
            fa: "یه بازی آزمون کامل و کارکردنی تحویل بده — فارغ‌التحیلی تو از آکادمی TEKA.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Everything you learned joins forces here: lists hold the questions, a function asks and checks, a loop runs all rounds, ifs score the answers, and an f-string crowns the winner. Read the plan, then build it:",
                  fa: "همه چیزی که یاد گرفتی این‌جا با هم متحد می‌شن: لیست سؤال‌ها رو نگه می‌داره، یه تابع سؤال می‌پرسه و چک می‌کنه، یه حلقه همهٔ دورها رو می‌چرخه، if ها نمره می‌دن و یه f-string قهرمان رو تاج‌گذاری می‌کنه. نقشه رو بخون، بعد بسازش:",
                },
                {
                  type: "text",
                  en: "The plan: 1) two parallel lists — questions and answers. 2) a function ask(i) that prints Q{i+1}: the question, reads a guess, and RETURNS whether guess matches (case-insensitive). 3) a for loop over all questions. 4) Count correct answers. 5) Print the score and a final verdict.",
                  fa: "نقشه: ۱) دو لیست موازی — سؤال‌ها و جواب‌ها. ۲) یه تابع ask(i) که Q{i+1}: رو با سؤال چاپ می‌کنه، حدس رو می‌خونه و RETURN می‌کنه که آیا حدس درسته (بدون حساسیت به بزرگ‌کوچکی). ۳) یه حلقهٔ for روی همهٔ سؤال‌ها. ۴) شمردن جواب‌های درست. ۵) چاپ امتیاز و حکم نهایی.",
                },
                {
                  type: "tip",
                  en: "Build it piece by piece and hit Run after each piece. Real developers never write it all at once.",
                  fa: "تکه‌تکه بساز و بعد از هر تکه Run بزن. برنامه‌نویس واقعی هیچ‌وقت همه‌چی رو یه‌جا نمی‌نویسه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Why is ask() a function instead of copy-pasted code?", fa: "چرا ask تابعه به‌جای کپی‌پیست کد؟" },
                  options: [
                    { en: "It's prettier", fa: "قشنگ‌تره" },
                    { en: "One definition, reused every round", fa: "یه‌بار تعریف، هر دور استفاده" },
                    { en: "Functions run faster", fa: "توابع سریع‌ترن" },
                    { en: "Python forces it", fa: "پایتون اجبارش کرده" },
                  ],
                  answer: 1,
                  explain: { en: "The loop calls the same machine every round — that's reuse.", fa: "حلقه هر دور همون ماشین رو صدا می‌زنه — این یعنی استفادهٔ دوباره." },
                },
                {
                  q: { en: "What makes the answer check beginner-proof?", fa: "چی چک جواب رو در برابر تایپ اشتباه مقاوم می‌کنه؟" },
                  options: [
                    { en: "guess.strip().lower() == answer", fa: "‏guess.strip().lower() == answer" },
                    { en: "guess == answer", fa: "‏guess == answer" },
                    { en: "Shouting at the user", fa: "داد زدن سر کاربر" },
                    { en: "Asking twice", fa: "دوبار پرسیدن" },
                  ],
                  answer: 0,
                  explain: {
                    en: "strip kills stray spaces, lower kills case issues — fair checking.",
                    fa: "‏strip فاصله‌های اضافی رو می‌کشه و lower مشکل بزرگ‌کوچکی رو — چکِ منصفانه.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build Quiz Master 🏆", fa: "استاد آزمون رو بساز 🏆" },
              brief: {
                en: "Three questions wait in the starter. Complete the game: ask each question as Q1:/Q2:/Q3:, print Correct! ⭐ or Nope: {answer}, then Score: {n}/3 and a verdict: all 3 → Python Master! 🏆, 2 → Almost there!, otherwise → Keep practicing!",
                fa: "سه سؤال توی استارتر منتظرن. بازی رو کامل کن: هر سؤال رو به شکل Q1:/Q2:/Q3: بپرس، چاپ کن Correct! ⭐ یا Nope: {answer}، بعد Score: {n}/3 و حکم نهایی: هر سه درست → Python Master! 🏆، دو تا → Almost there!، وگرنه → Keep practicing!",
              },
              starter: `questions = [
    "Which language prints with print()?",
    "What tag makes a big title?",
    "What tool styles a page?",
]
answers = ["python", "h1", "css"]

def ask(i):
    print(f"Q{i + 1}: {questions[i]}")
    guess = input()
    # TODO: return True/False — compare lowercase guess to answers[i]

score = 0
# TODO: loop over the questions, add 1 to score when correct,
# print Correct! ⭐ or Nope: {the right answer}
# then print Score: {score}/3 and the final verdict
`,
              solution: `questions = [
    "Which language prints with print()?",
    "What tag makes a big title?",
    "What tool styles a page?",
]
answers = ["python", "h1", "css"]

def ask(i):
    print(f"Q{i + 1}: {questions[i]}")
    guess = input()
    return guess.strip().lower() == answers[i]

score = 0
for i in range(len(questions)):
    if ask(i):
        print("Correct! ⭐")
        score += 1
    else:
        print(f"Nope: {answers[i]}")
print(f"Score: {score}/3")
if score == 3:
    print("Python Master! 🏆")
elif score == 2:
    print("Almost there!")
else:
    print("Keep practicing!")`,
              hints: [
                {
                  en: "ask returns the comparison itself: return guess.strip().lower() == answers[i].",
                  fa: "‏ask خودِ مقایسه رو return می‌کنه: return guess.strip().lower() == answers[i].",
                },
                {
                  en: "Verdict ladder: score == 3 → 🏆, score == 2 → Almost there!, else → Keep practicing!",
                  fa: "نردبان حکم:‏ score == 3 → 🏆 و score == 2 → Almost there! وگرنه → Keep practicing!",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  {
                    stdin: "python\nh1\njavascript",
                    expect: "Q1: Which language prints with print()?\nCorrect! ⭐\nQ2: What tag makes a big title?\nCorrect! ⭐\nQ3: What tool styles a page?\nNope: css\nScore: 2/3\nAlmost there!",
                  },
                  {
                    stdin: "PYTHON\n  h1  \ncss",
                    expect: "Q1: Which language prints with print()?\nCorrect! ⭐\nQ2: What tag makes a big title?\nCorrect! ⭐\nQ3: What tool styles a page?\nCorrect! ⭐\nScore: 3/3\nPython Master! 🏆",
                    hidden: true,
                  },
                  {
                    stdin: "java\np\ncs",
                    expect: "Q1: Which language prints with print()?\nNope: python\nQ2: What tag makes a big title?\nNope: h1\nQ3: What tool styles a page?\nNope: css\nScore: 0/3\nKeep practicing!",
                    hidden: true,
                  },
                ],
              },
              sample: {
                stdin: "python\nh1\njavascript",
                expect: "Q1: Which language prints with print()?\nCorrect! ⭐\nQ2: What tag makes a big title?\nCorrect! ⭐\nQ3: What tool styles a page?\nNope: css\nScore: 2/3\nAlmost there!",
              },
            },
          ],
        },
      ],
    },
  ],
};
