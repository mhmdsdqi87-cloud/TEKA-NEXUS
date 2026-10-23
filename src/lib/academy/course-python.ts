// TEKA NEXUS — TEKA Academy · Python course (beginner → genuinely practical).
// Every runnable sample and every challenge test is guaranteed to run in the
// bundled pylite interpreter (see src/lib/academy/pylite.ts). All graded
// outputs are deterministic — no unseeded randomness in any test path.

import type { Course } from "./types";
import { pyModulesC } from "./py-modules-c";
import { pyModulesD } from "./py-modules-d";

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
                en: "Print your developer ID card: exactly three lines — the header, the name, and the mood. Copy the example text EXACTLY (Sara stays Sara for now — the checker compares your output word by word!).",
                fa: "کارت شناسایی برنامه‌نویسیت رو چاپ کن: دقیقاً سه خط — سربرگ، اسم، و حالِ تو. متن نمونه رو دقیقاً کپی کن (فعلاً Sara می‌مونه — تصحیح‌کننده خروجی‌ات رو کلمه به کلمه مقایسه می‌کنه!)",
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
                  en: "Copy the text EXACTLY — the === signs, Sara, and the spacing all count!",
                  fa: "متن رو دقیقاً کپی کن — علامت‌های === و Sara و فاصله‌ها همه مهم‌ان!",
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
    {
      id: "py-m6",
      title: { en: "Going Deeper with Data", fa: "عمیق‌تر توی داده‌ها" },
      blurb: {
        en: "Chop and glue text, nest lists inside lists, model real things — and build a Contact Book.",
        fa: "متن رو تکه‌تکه و بچسبون، لیست توی لیست بساز، چیزهای واقعی رو مدل کن — و یه دفترچهٔ مخاطب بساز.",
      },
      lessons: [
        {
          id: "py-m6-l1",
          title: { en: "String Methods: The Deep Dive", fa: "متدهای رشته: شیرجهٔ عمیق" },
          goal: {
            en: "Cut, glue, locate and count text with split, join, replace, find and count.",
            fa: "متن رو با split و join و replace و find و count برش بده، بچسبون، پیدا کن و بشمار.",
          },
          minutes: 11,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "You already know .upper() and .strip(). Today: the text surgeon's kit. **split()** cuts a string into a LIST of pieces, and **join()** glues a list back into one string. Cutting and pasting — but in code.",
                  fa: "‏upper و strip رو بلدی. امروز جعبه‌ابزار جراح متن رو باز می‌کنیم. **split()** یه رشته رو به یه LIST تکه‌تکه می‌کنه و **join()** لیست رو دوباره به یه رشته می‌چسبونه. برش و چسبوندن — ولی این بار با کد.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `sentence = "learn python every day"
words = sentence.split()
print(words)
print(f"First word: {words[0]}")
print(f"Count: {len(words)}")`,
                  caption: { en: "split() hands you a real list — index it, loop it, count it.", fa: "‏split() یه لیست واقعی تحویلت می‌ده — اندیس بگیر، حلقه بزن، بشمار." },
                },
                {
                  type: "tip",
                  en: "split() with NO argument splits on any whitespace and ignores doubles — perfect for messy user input.",
                  fa: "اگه split() رو بدون آرگومان صدا بزنی، روی هر فاصله‌ای برش می‌زنه و فاصله‌های تکراری رو نادیده می‌گیره — برای ورودی شلختهٔ کاربرا معرکه‌ست.",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "**join** is split's mirror twin: the separator is the string BEFORE the dot, and the list goes in the parentheses. Then meet the search team: **replace** swaps text, **find** reports the position of the first match, **count** tallies occurrences.",
                  fa: "‏**join** برادر دوقلوی split‌ه: جداکننده همون رشته‌ایه که قبل از نقطه‌ست و لیست می‌ره داخل پرانتز. بعد تیم گشتی‌ها: **replace** متن رو عوض می‌کنه، **find** جای اولین برخورد رو می‌گه و **count** تعداد تکرارها رو می‌شماره.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `words = ["ship", "it", "today"]
print("-".join(words))
print(" ".join(words))

motto = "code code code"
print(motto.replace("code", "ship"))
print(motto.find("code"))
print(motto.count("code"))`,
                  caption: { en: "join glues, replace swaps, find locates, count tallies.", fa: "‏join می‌چسبونه، replace عوض می‌کنه، find پیداش می‌کنه، count می‌شماره‌ش." },
                },
                {
                  type: "warn",
                  en: "find() returns -1 when the text is missing. 0 is a REAL position (the very start) — only -1 means \"not found\".",
                  fa: "اگه متن پیدا نشه، find() عدد ‎-1 رو برمی‌گردونه. صفر یه جایگاه واقعیه (اولِ اول!) — فقط ‎-1 یعنی «نبود».",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does \"a,b,c\".split(\",\") return?", fa: "خروجی \"a,b,c\".split(\",\") چیه؟" },
                  options: [
                    { en: "\"a b c\"", fa: "‏\"a b c\"" },
                    { en: "[\"a\", \"b\", \"c\"]", fa: "‏[\"a\", \"b\", \"c\"]" },
                    { en: "(\"a\", \"b\", \"c\")", fa: "‏(\"a\", \"b\", \"c\")" },
                    { en: "abc", fa: "‏abc" },
                  ],
                  answer: 1,
                  explain: { en: "split cuts at every comma and returns a list of three strings.", fa: "‏split سر هر کاما برش می‌زنه و یه لیست سه‌تایی از رشته‌ها برمی‌گردونه." },
                },
                {
                  q: { en: "What does \"-\".join([\"py\", \"js\"]) return?", fa: "خروجی \"-\".join([\"py\", \"js\"]) چیه؟" },
                  options: [
                    { en: "pyjs", fa: "‏pyjs" },
                    { en: "py-js", fa: "‏py-js" },
                    { en: "[\"py\", \"js\"]", fa: "‏[\"py\", \"js\"]" },
                    { en: "py, js", fa: "‏py, js" },
                  ],
                  answer: 1,
                  explain: { en: "join places the separator (a dash) BETWEEN the items.", fa: "‏join جداکننده (خط تیره) رو بین عضوها می‌ذاره." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The URL Slug Machine", fa: "ماشین اسلاگ" },
              brief: {
                en: "Bloggers turn titles into URLs: lowercase, spaces become dashes (that's a \"slug\"), plus a hashtag row. Read one title line and print exactly:\nSlug: {lowercase-dashes}\nTags: {#word #word ...}\nWords: {n}",
                fa: "وبلاگ‌نویس‌ها تیترها رو به لینک تبدیل می‌کنن: حروف کوچیک، فاصله‌ها خط تیره (بهش می‌گن «اسلاگ») و یه ردیف هشتگ. یه خط تیتر بخون و دقیقاً چاپ کن:\nSlug: {کوچک‌شده-با-خط‌تیره}\nTags: {#کلمه #کلمه ...}\nWords: {تعداد}",
              },
              starter: `title = input()

# 1. words = title.lower().split()
# 2. slug: join the words with "-"
# 3. tags: "#" + " #".join(words)  (build it in a variable first!)
# 4. print Slug: / Tags: / Words: lines
`,
              solution: `title = input()
words = title.lower().split()
slug = "-".join(words)
tags = "#" + " #".join(words)
print(f"Slug: {slug}")
print(f"Tags: {tags}")
print(f"Words: {len(words)}")`,
              hints: [
                {
                  en: "words = title.lower().split() gives lowercase pieces; \"-\".join(words) builds the slug.",
                  fa: "‏words = title.lower().split() تکه‌های کوچیک‌شده رو می‌ده؛ \"-\".join(words) اسلاگ رو می‌سازه.",
                },
                {
                  en: "For the tags, build the string in a variable first: tags = \"#\" + \" #\".join(words) — f-string holes can't contain quotes!",
                  fa: "برای هشتگ‌ها اول رشته رو بریز توی متغیر:‏ tags = \"#\" + \" #\".join(words) — جای خالی f-string نمی‌تونه گیومه داشته باشه!",
                },
                {
                  en: "The Words line is just len(words) inside an f-string.",
                  fa: "خط Words فقط len(words) داخل یه f-string ــه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "My First Post", expect: "Slug: my-first-post\nTags: #my #first #post\nWords: 3" },
                  { stdin: "code every day", expect: "Slug: code-every-day\nTags: #code #every #day\nWords: 3", hidden: true },
                  { stdin: "python", expect: "Slug: python\nTags: #python\nWords: 1", hidden: true },
                ],
              },
              sample: { stdin: "My First Post", expect: "Slug: my-first-post\nTags: #my #first #post\nWords: 3" },
            },
          ],
        },
        {
          id: "py-m6-l2",
          title: { en: "Lists Inside Lists: The Grid", fa: "لیست توی لیست: شبکه" },
          goal: {
            en: "Read two-dimensional data — game boards and score tables — with double indexing.",
            fa: "داده‌های دوبعدی — صفحهٔ بازی و جدول امتیاز — رو با اندیس دوگانه بخون.",
          },
          minutes: 11,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A list can hold ANY values — including other lists. One list per row, and a list of rows becomes a GRID: game boards, spreadsheets, seat maps. You reach a cell with two indexes: grid[row] picks a row (a list!), then [col] picks the item inside it.",
                  fa: "لیست می‌تونه هر مقداری رو نگه داره — حتی لیست‌های دیگه! هر سطر یه لیست، و لیستی از سطرها می‌شه یه شبکه (Grid): صفحهٔ بازی، اکسل، نقشهٔ صندلی. به هر خونه با دو تا اندیس می‌رسی: اول grid[row] یه سطر رو برمی‌داره (که خودش لیسته!)، بعد [col] عضو داخلش رو.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `board = [
    ["X", "O", "X"],
    ["O", "X", "."],
    [".", "O", "X"],
]
print(board[0][0])
print(board[1][2])
print(board[2])`,
                  caption: { en: "board[1] is a whole row — a list. board[1][2] steps inside it.", fa: "‏board[1] یه سطر کامل ــه — یعنی یه لیست.‏ board[1][2] قدم به داخلش می‌ذاره." },
                },
                {
                  type: "warn",
                  en: "Order matters: grid[row][col] — row FIRST, then column. Swapping them is the classic grid bug.",
                  fa: "ترتیب مهمه: اول سطر، بعد ستون — grid[row][col]. جابجاشون کردن باگ کلاسیک شبکه‌هاست.",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Loops love grids. A single for walks over rows; nest a second for INSIDE to touch every cell. That's how a scoreboard totals every match's goals.",
                  fa: "حلقه‌ها عاشق شبکه‌ان. یه for روی سطرها راه می‌ره و یه for دوم داخلش تک‌تک خونه‌ها رو لمس می‌کنه. تابلوی ورزش‌ها هم همین‌طوری جمع کل گل‌ها رو حساب می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `scores = [
    [2, 1],
    [0, 0],
    [3, 2],
]
total = 0
for row in scores:
    for goals in row:
        total += goals
print(f"Goals: {total}")`,
                  caption: { en: "Outer loop = rows, inner loop = cells.", fa: "حلقهٔ بیرونی = سطرها، حلقهٔ داخلی = خونه‌ها." },
                },
                {
                  type: "tip",
                  en: "Two indexes, two steps: think \"which ROW, then which SLOT in that row\". Numbers in brackets are always the count from 0.",
                  fa: "دو اندیس، دو قدم: فکر کن «کدوم سطر، بعد کدوم جایگاه توی اون سطر». عدد داخل کروشه همیشه از صفر می‌شماره.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "grid = [[1, 2], [3, 4]] — what is grid[1][0]?", fa: "‏grid = [[1, 2], [3, 4]] — مقدار grid[1][0] چیه؟" },
                  options: [
                    { en: "1", fa: "۱" },
                    { en: "2", fa: "۲" },
                    { en: "3", fa: "۳" },
                    { en: "4", fa: "۴" },
                  ],
                  answer: 2,
                  explain: { en: "grid[1] is [3, 4] — the second row. Then [0] grabs its first item: 3.", fa: "‏grid[1] می‌شه [3, 4] — سطر دوم. بعد [0] اولین عضوش رو برمی‌داره: ۳." },
                },
                {
                  q: { en: "What does board[0] return when board is a 3x3 grid?", fa: "اگه board یه شبکهٔ ۳×۳ باشه،‏ board[0] چی برمی‌گردونه؟" },
                  options: [
                    { en: "The first cell", fa: "اولین خونه" },
                    { en: "The whole first row (a list)", fa: "کل سطر اول (یه لیست)" },
                    { en: "The whole first column", fa: "کل ستون اول" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "One index selects a row — a full list. Add a second index for a single cell.", fa: "یه اندیس یه سطر کامل (لیست) برمی‌گردونه. برای یه خونهٔ تنها اندیس دوم لازمه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Match Scoreboard", fa: "تابلوی نتایج" },
              brief: {
                en: "Three football matches wait in the starter, each [home, away] goals. Read a match number (1, 2 or 3) and print exactly:\nMatch {n}: {home} - {away}\nthen the TOTAL goals of the whole day:\nTotal goals: {n}",
                fa: "سه تا بازی فوتبال توی استارتر منتظرن، هر کدوم [میزبان، مهمان]. یه شمارهٔ بازی بخون (۱، ۲ یا ۳) و دقیقاً چاپ کن:\nMatch {n}: {میزبان} - {مهمان}\nبعد جمع گل‌های کل روز:\nTotal goals: {n}",
              },
              starter: `scores = [
    [2, 1],
    [0, 0],
    [3, 2],
]

m = int(input())

# 1. match = scores[m - 1]  (humans count from 1, Python from 0)
# 2. print f"Match {m}: {home} - {away}" using match[0] and match[1]
# 3. total = 0, then a loop inside a loop adds every goal
# 4. print f"Total goals: {total}"
`,
              solution: `scores = [
    [2, 1],
    [0, 0],
    [3, 2],
]

m = int(input())
match = scores[m - 1]
print(f"Match {m}: {match[0]} - {match[1]}")

total = 0
for row in scores:
    for goals in row:
        total += goals
print(f"Total goals: {total}")`,
              hints: [
                {
                  en: "match = scores[m - 1] turns \"match 2\" into index 1 — the minus one is the human-to-Python converter.",
                  fa: "‏match = scores[m - 1] «بازی ۲» رو می‌کنه اندیس ۱ — همون منفی یک، مبدل آدمیزاد به پایتون.",
                },
                {
                  en: "match[0] is home, match[1] is away. Both go inside the f-string with the match number.",
                  fa: "‏match[0] میزبان و match[1] مهمان ــه. هر دو با شمارهٔ بازی می‌رن داخل f-string.",
                },
                {
                  en: "For the total: for row in scores: / for goals in row: / total += goals — a loop inside a loop.",
                  fa: "برای جمع کل:‏ for row in scores: و بعد for goals in row: و بعد total += goals — حلقه داخل حلقه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "2", expect: "Match 2: 0 - 0\nTotal goals: 8" },
                  { stdin: "1", expect: "Match 1: 2 - 1\nTotal goals: 8", hidden: true },
                  { stdin: "3", expect: "Match 3: 3 - 2\nTotal goals: 8", hidden: true },
                ],
              },
              sample: { stdin: "2", expect: "Match 2: 0 - 0\nTotal goals: 8" },
            },
          ],
        },
        {
          id: "py-m6-l3",
          title: { en: "Lists of Dicts: Real Objects", fa: "لیستِ دیکشنری: اشیای واقعی" },
          goal: {
            en: "Model a whole team of rich records — and find the star of the show.",
            fa: "یه تیم کامل از رکوردهای پرجزئیات رو مدل کن — و ستارهٔ صحنه رو پیدا کن.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A dict describes ONE thing with labels: {\"name\": \"Maya\", \"goals\": 12}. A LIST of dicts describes MANY things — a squad, a shopping cart, a chat inbox. It's the single most-used data shape in real apps (including this website's database!).",
                  fa: "دیکشنری یه چیز رو با برچسب توصیف می‌کنه:‏ {\"name\": \"Maya\", \"goals\": 12}. و لیستِ دیکشنری خیلی‌ها رو توصیف می‌کنه — یه تیم، یه سبد خرید، یه صندوق پیام. پرکاربردترین شکل داده توی اپ‌های واقعیه (حتی دیتابیس همین وب‌سایت!).",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `squad = [
    {"name": "Maya", "goals": 12},
    {"name": "Kenji", "goals": 7},
]
print(squad[0]["name"])
print(squad[1]["goals"])`,
                  caption: { en: "First pick the player (index), then their field (key).", fa: "اول بازیکن رو بردار (اندیس)، بعد فیلدش رو (کلید)." },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Looping over the list gives you one dict per round. Pull the fields into plain variables, then use them — clean and readable. Want the top scorer? Start with the first player and let anyone with MORE goals steal the crown.",
                  fa: "روی لیست حلقه بزنی، هر دور یه دیکشنری می‌گیری. فیلدها رو بریز توی متغیرهای ساده و بعد استفاده‌شون کن — تمیز و خوانا. ستارهٔ تیم رو هم می‌خوای؟ از بازیکن اول شروع کن و بذار هرکی گل بیشتری داره تاج رو بدزده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `squad = [
    {"name": "Maya", "goals": 12},
    {"name": "Kenji", "goals": 7},
]

for player in squad:
    name = player["name"]
    goals = player["goals"]
    print(f"{name} scored {goals}")`,
                },
                {
                  type: "tip",
                  en: "Pull c[\"field\"] into a variable BEFORE the f-string — f-string holes can't contain quotes. Two short lines beat one broken one.",
                  fa: "‏c[\"field\"] رو قبل از f-string بریز توی متغیر — جای خالی f-string نمی‌تونه گیومه داشته باشه. دو خط کوتاه از یه خط خراب بهتره.",
                },
                {
                  type: "warn",
                  en: "squad[5] on a 2-player squad crashes. len(squad) tells you how far you can reach.",
                  fa: "‏squad[5] روی تیمِ دوتایی خطا می‌ده.‏ len(squad) بهت می‌گه دستت کجا می‌رسه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "team = [{\"name\": \"Maya\", \"role\": \"dev\"}] — how do you read the role?", fa: "‏team = [{\"name\": \"Maya\", \"role\": \"dev\"}] — نقش رو چطوری می‌خونی؟" },
                  options: [
                    { en: "team[role]", fa: "‏team[role]" },
                    { en: "team[0][\"role\"]", fa: "‏team[0][\"role\"]" },
                    { en: "team.role", fa: "‏team.role" },
                    { en: "role[0]", fa: "‏role[0]" },
                  ],
                  answer: 1,
                  explain: { en: "First index picks the record, the second (a key in quotes) picks the field.", fa: "اندیس اول رکورد رو برمی‌داره، دومی (کلید با گیومه) فیلد رو." },
                },
                {
                  q: { en: "Why a list OF dicts instead of two parallel lists (names and goals)?", fa: "چرا لیستِ دیکشنری به‌جای دو تا لیست موازی (اسم‌ها و گل‌ها)؟" },
                  options: [
                    { en: "It uses less memory", fa: "حافظهٔ کمتری مصرف می‌کنه" },
                    { en: "Each record keeps its fields together — nothing can drift apart", fa: "هر رکورد فیلدهاش رو کنم نگه می‌داره — هیچی از هم جدا نمی‌شه" },
                    { en: "Dicts are faster to print", fa: "دیکشنری سریع‌تر چاپ می‌شه" },
                    { en: "Python doesn't allow parallel lists", fa: "پایتون لیست موازی اجازه نمی‌ده" },
                  ],
                  answer: 1,
                  explain: { en: "With parallel lists, adding one player means updating TWO lists — forget one and row 4's name belongs to row 3's goals. A dict keeps Maya's data inside Maya.", fa: "با لیست موازی، برای هر بازیکن جدید دو تا لیست باید آپدیت شن — یکی یادت بره و اسمِ سطر ۴ می‌افته کنار گل‌های سطر ۳! دیکشنری داده‌های مایا رو داخل خود مایا نگه می‌داره." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Squad Reporter", fa: "گزارشگر تیم" },
              brief: {
                en: "The starter holds a squad of three players. No input needed — print every player as exactly \"{name} has {goals} goals\", then crown the best:\nTop scorer: {name}",
                fa: "استارتر یه تیم سه‌نفره داره. ورودی لازم نیست — هر بازیکن رو دقیقاً به شکل \"{name} has {goals} goals\" چاپ کن، بعد تاج‌گذاری کن:\nTop scorer: {اسم}",
              },
              starter: `squad = [
    {"name": "Maya", "goals": 12},
    {"name": "Kenji", "goals": 7},
    {"name": "Zoe", "goals": 15},
]

# 1. loop over squad, print "{name} has {goals} goals" for each
#    (pull player["name"] and player["goals"] into variables first)
# 2. find the top scorer: start with squad[0], replace the champion
#    whenever someone has strictly more goals
# 3. print f"Top scorer: {name}"
`,
              solution: `squad = [
    {"name": "Maya", "goals": 12},
    {"name": "Kenji", "goals": 7},
    {"name": "Zoe", "goals": 15},
]

for player in squad:
    name = player["name"]
    goals = player["goals"]
    print(f"{name} has {goals} goals")

top_name = squad[0]["name"]
top_goals = squad[0]["goals"]
for player in squad:
    if player["goals"] > top_goals:
        top_goals = player["goals"]
        top_name = player["name"]
print(f"Top scorer: {top_name}")`,
              hints: [
                {
                  en: "for player in squad: then name = player[\"name\"] and goals = player[\"goals\"] — variables first, f-string second.",
                  fa: "‏for player in squad: بعد name = player[\"name\"] و goals = player[\"goals\"] — اول متغیر، بعد f-string.",
                },
                {
                  en: "Top scorer: copy squad[0]'s name and goals into top_name/top_goals, then any player with MORE goals replaces them.",
                  fa: "ستارهٔ تیم: اسم و گل squad[0] رو بریز توی top_name و top_goals، بعد هر بازیکنی که گل بیشتری داشت جاش رو می‌گیره.",
                },
                {
                  en: "The last line is exactly: Top scorer: Zoe",
                  fa: "خط آخر دقیقاً اینه: Top scorer: Zoe",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { expect: "Maya has 12 goals\nKenji has 7 goals\nZoe has 15 goals\nTop scorer: Zoe" },
                ],
              },
              sample: { expect: "Maya has 12 goals\nKenji has 7 goals\nZoe has 15 goals\nTop scorer: Zoe" },
            },
          ],
        },
        {
          id: "py-m6-l4",
          title: { en: "Mini-Project: Contact Book", fa: "پروژهٔ کوچک: دفترچهٔ مخاطب" },
          goal: {
            en: "Build add / show_all / find for a real contact list — functions and list-of-dicts working together.",
            fa: "‏add و show_all و find رو برای یه لیست مخاطب واقعی بساز — تابع و لیستِ دیکشنری با هم.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The plan: contacts is a LIST; every contact is a dict {\"name\": ..., \"phone\": ...}. Three functions run the shop: add(name, phone) appends a dict, show_all() prints everything, find(name) hunts for one person. This add → show → find cycle is the skeleton of almost every app.",
                  fa: "نقشه:‏ contacts یه LIST ــه و هر مخاطب یه دیکشنری {\"name\": ..., \"phone\": ...}. سه تا تابع مغازه رو می‌چرخونن:‏ add(name, phone) دیکشنری اضافه می‌کنه، show_all() همه رو نشون می‌ده و find(name) یه نفر رو شکار می‌کنه. همین چرخهٔ add → show → find، اسکلت تقریباً هر اپی ــه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `contacts = []

def add(name, phone):
    contacts.append({"name": name, "phone": phone})
    print(f"Added {name}")

add("sara", "0912 000 0000")
print(f"Contacts: {len(contacts)}")`,
                  caption: { en: "One function, one job. add() appends AND confirms.", fa: "هر تابع یه کار.‏ add() هم اضافه می‌کنه هم خبر می‌ده." },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "find(name) walks the list; the moment a contact matches, print and **return** — job done, stop looking. If the loop finishes WITHOUT returning, nobody matched, so the \"not found\" message comes AFTER the loop.",
                  fa: "‏find(name) روی لیست راه می‌افته؛ همون لحظه که مخاطبی برابر شد، چاپ کن و **return** — کار تمومه، دیگه نگرد. اگه حلقه بدون return تموم شد، یعنی هیچ‌کی نیست؛ پس پیام «پیدا نشد» میاد بعد از حلقه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def find(name):
    for c in contacts:
        cname = c["name"]
        cphone = c["phone"]
        if cname == name:
            print(f"{cname}: {cphone}")
            return
    print(f"{name} not found")`,
                },
                {
                  type: "tip",
                  en: "return inside a loop = \"found it, stop everything\". Forgetting it just means you keep scanning — wasteful but not broken.",
                  fa: "‏return داخل حلقه یعنی «پیدا شد، همه‌چی تعطیل». اگه یادت بره، فقط ادامه می‌دی به گشتن — اسراف‌کاریه ولی خرابکاری نه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "In find(), why return immediately after printing the match?", fa: "توی find چرا بعد از چاپ نتیجه فوراً return می‌کنیم؟" },
                  options: [
                    { en: "To make the code longer", fa: "که کد طولانی‌تر شه" },
                    { en: "The job is done — no need to keep scanning", fa: "کار تمومه — لازم نیست ادامه بدی" },
                    { en: "return deletes the contact", fa: "‏return مخاطب رو پاک می‌کنه" },
                    { en: "It fixes typos in names", fa: "غلط‌های تایپی اسم‌ها رو درست می‌کنه" },
                  ],
                  answer: 1,
                  explain: { en: "Once found, more scanning is wasted work — return exits the function at once.", fa: "وقتی پیداش کردی، ادامهٔ گشتن اتلاف وقته — return همون لحظه از تابع می‌زنه بیرون." },
                },
                {
                  q: { en: "After add(\"ali\", \"123\") and add(\"zoe\", \"456\"), what is contacts?", fa: "بعد از add(\"ali\", \"123\") و add(\"zoe\", \"456\")، مقدار contacts چیه؟" },
                  options: [
                    { en: "[\"ali\", \"zoe\"]", fa: "‏[\"ali\", \"zoe\"]" },
                    { en: "Two dicts, each with name and phone keys", fa: "دو تا دیکشنری که هر کدوم کلیدهای name و phone دارن" },
                    { en: "{\"ali\": \"123\", \"zoe\": \"456\"}", fa: "‏{\"ali\": \"123\", \"zoe\": \"456\"}" },
                    { en: "One dict with four keys", fa: "یه دیکشنری با چهار تا کلید" },
                  ],
                  answer: 1,
                  explain: { en: "contacts stays a LIST — each add() appends one whole dict.", fa: "‏contacts یه LIST می‌مونه — هر add() یه دیکشنری کامل بهش اضافه می‌کنه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Contact Book", fa: "دفترچهٔ مخاطب رو بساز" },
              brief: {
                en: "add() is done — you write show_all() and find(). The main code at the bottom adds two contacts, calls show_all(), then reads a name to search. Expected output shape:\nAdded sara\nAdded kenji\nContacts:\nsara: {phone}\nkenji: {phone}\n{result of the search}",
                fa: "‏add() آماده‌ست — تو show_all() و find() رو بنویس. کد اصلی پایین دو تا مخاطب اضافه می‌کنه، show_all() رو صدا می‌زنه و بعد یه اسم برای جستجو می‌خونه. شکل خروجی:\nAdded sara\nAdded kenji\nContacts:\nsara: {شماره}\nkenji: {شماره}\n{نتیجهٔ جستجو}",
              },
              starter: `contacts = []  # every contact is a dict: {"name": ..., "phone": ...}

def add(name, phone):
    contacts.append({"name": name, "phone": phone})
    print(f"Added {name}")

def show_all():
    # TODO 1: print "Contacts:" then every contact as: name: phone
    # (loop over contacts; pull c["name"] and c["phone"] into variables first)
    pass

def find(name):
    # TODO 2: loop over contacts; on a name match print "name: phone" and return
    # if the loop ends without a match, print f"{name} not found"
    pass

add("sara", "0912 111 2233")
add("kenji", "0901 555 6677")
show_all()
find(input())
`,
              solution: `contacts = []  # every contact is a dict: {"name": ..., "phone": ...}

def add(name, phone):
    contacts.append({"name": name, "phone": phone})
    print(f"Added {name}")

def show_all():
    print("Contacts:")
    for c in contacts:
        cname = c["name"]
        cphone = c["phone"]
        print(f"{cname}: {cphone}")

def find(name):
    for c in contacts:
        cname = c["name"]
        cphone = c["phone"]
        if cname == name:
            print(f"{cname}: {cphone}")
            return
    print(f"{name} not found")

add("sara", "0912 111 2233")
add("kenji", "0901 555 6677")
show_all()
find(input())`,
              hints: [
                {
                  en: "show_all prints the header ONCE (outside the loop), then loops over contacts printing f\"{cname}: {cphone}\".",
                  fa: "‏show_all سربرگ رو یه بار چاپ می‌کنه (بیرون حلقه)، بعد روی contacts حلقه می‌زنه و f\"{cname}: {cphone}\" چاپ می‌کنه.",
                },
                {
                  en: "In find, compare cname == name; print and return right inside the if.",
                  fa: "توی find، شرط cname == name رو بذار؛ چاپ و return همون‌جا داخل if.",
                },
                {
                  en: "The not-found line comes AFTER the for loop (no indent) — it only prints when nobody matched.",
                  fa: "خط «پیدا نشد» بعد از حلقهٔ for میاد (بدون تورفتگی) — فقط وقتی چاپ می‌شه که هیچ‌کی پیدا نشده باشه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "kenji", expect: "Added sara\nAdded kenji\nContacts:\nsara: 0912 111 2233\nkenji: 0901 555 6677\nkenji: 0901 555 6677" },
                  { stdin: "zoe", expect: "Added sara\nAdded kenji\nContacts:\nsara: 0912 111 2233\nkenji: 0901 555 6677\nzoe not found", hidden: true },
                ],
              },
              sample: { stdin: "kenji", expect: "Added sara\nAdded kenji\nContacts:\nsara: 0912 111 2233\nkenji: 0901 555 6677\nkenji: 0901 555 6677" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m7",
      title: { en: "Algorithms: Think Like a Machine", fa: "الگوریتم: مثل ماشین فکر کن" },
      blurb: {
        en: "Open the black box: search, sort and count exactly the way computers do it.",
        fa: "جعبهٔ سیاه رو باز کن: جستجو، مرتب‌سازی و شمردن رو دقیقاً همون‌طوری که کامپیوتر انجام می‌ده یاد بگیر.",
      },
      lessons: [
        {
          id: "py-m7-l1",
          title: { en: "Linear Search", fa: "جستجوی خطی" },
          goal: {
            en: "Find WHERE something lives in a list — the way a computer actually searches.",
            fa: "پیدا کن یه چیز کجای لیست‌ه — همون‌طوری که کامپیوتر واقعاً جستجو می‌کنه.",
          },
          minutes: 11,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Computers have no eyes. When you search a list, the machine checks ONE item at a time, left to right — every single time. That's **linear search**, and it's the honest truth behind every search bar you've ever used.",
                  fa: "کامپیوتر چشم نداره. وقتی توی لیست جستجو می‌کنی، ماشین یکی‌یکی و از چپ به راست چک می‌کنه — همیشه. این همون **جستجوی خطی (Linear Search)** ــه و حقیقتِ بی‌تعارف پشت هر سرچ‌باکیه که تا حالا استفاده کردی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `shelf = ["pen", "key", "coin", "map"]
target = "coin"
for i in range(len(shelf)):
    print(f"Checking {i}: {shelf[i]}")`,
                  caption: { en: "This is what searching REALLY looks like inside the machine.", fa: "این شکلیه که جستجو واقعاً داخل ماشین دیده می‌شه." },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Now catch the position: compare every item with the target; the moment they match, save the index and **break** — no point looking further. If nothing matched, the saved value stays -1, the programmers' code for \"not found\".",
                  fa: "حالا جایگاه رو شکار کن: هر عضو رو با هدف مقایسه کن؛ لحظه‌ای که برابر شد، اندیس رو ذخیره کن و **break** — دیگه گشتن بی‌فایده‌ست. اگه هیچ‌کی برابر نشد، مقدار ذخیره‌شده همون ‎-1 می‌مونه؛ کدِ برنامه‌نویس‌ها برای «پیدا نشد».",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `shelf = ["pen", "key", "coin", "map"]
target = "coin"

position = -1
for i in range(len(shelf)):
    if shelf[i] == target:
        position = i
        break

print(f"Position: {position}")`,
                },
                {
                  type: "tip",
                  en: "The in operator answers IF something exists; linear search answers WHERE. Two different questions, two different tools.",
                  fa: "عملگر in جوابِ «هست یا نه؟» رو می‌ده؛ جستجوی خطی جوابِ «کجاست؟» رو. دو تا سؤال متفاوت، دو تا ابزار متفاوت.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "How does linear search examine a list?", fa: "جستجوی خطی چطوری لیست رو بررسی می‌کنه؟" },
                  options: [
                    { en: "It jumps straight to a guessed position", fa: "مستقیم به یه جایگاه حدسی می‌پره" },
                    { en: "It compares the target with each item, one by one, in order", fa: "هدف رو تک‌تک و به‌ترتیب با عضوها مقایسه می‌کنه" },
                    { en: "It sorts the list first", fa: "اول لیست رو مرتب می‌کنه" },
                    { en: "It asks the user which item to pick", fa: "از کاربر می‌پرسه کدوم عضو" },
                  ],
                  answer: 1,
                  explain: { en: "Linear = a straight line through the list, comparing every item until a match.", fa: "«خطی» یعنی یه خط مستقیم روی لیست و مقایسهٔ تک‌تک عضوها تا برخورد." },
                },
                {
                  q: { en: "Why break as soon as the target is found?", fa: "چرا به محض پیدا شدن هدف break می‌زنیم؟" },
                  options: [
                    { en: "break deletes the list", fa: "‏break لیست رو پاک می‌کنه" },
                    { en: "So the loop stops early — the answer is already known", fa: "تا حلقه زود تموم شه — جواب رو که داریم" },
                    { en: "Because in requires it", fa: "چون in این‌طوری می‌خواد" },
                    { en: "You should never use break", fa: "هیچ‌وقت نباید break بزنی" },
                  ],
                  answer: 1,
                  explain: { en: "Once found, further rounds can't improve the answer — break saves the walk.", fa: "بعد از پیدا شدن، دورهای بعدی جواب رو بهتر نمی‌کنن — break اضافه‌کاری رو حذف می‌کنه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Playlist Detective", fa: "کارآگاه پلی‌لیست" },
              brief: {
                en: "Read a song name. Search the starter's playlist BY HAND (no in for this one — you need the position!) and print exactly:\nFound at position {n}   (humans count from 1)\nNot in playlist   (when it's not there)",
                fa: "یه اسم آهنگ بخون. پلی‌لیستِ استارتر رو دستی بگرد (این‌جا in ممنوع — به جایگاهش نیاز داریم!) و دقیقاً چاپ کن:\nFound at position {n}   (آدم‌ها از ۱ می‌شمرن)\nNot in playlist   (وقتی نبود)",
              },
              starter: `playlist = ["Midnight City", "Gole Yakh", "Levitating", "Summer"]
target = input()

# position = -1
# loop with range(len(playlist)):
#   if playlist[i] == target -> save i + 1 and break
# then print the result lines
`,
              solution: `playlist = ["Midnight City", "Gole Yakh", "Levitating", "Summer"]
target = input()

position = -1
for i in range(len(playlist)):
    if playlist[i] == target:
        position = i + 1
        break

if position != -1:
    print(f"Found at position {position}")
else:
    print("Not in playlist")`,
              hints: [
                {
                  en: "Start with position = -1, and only a match overwrites it with i + 1.",
                  fa: "با position = -1 شروع کن؛ فقط برخورد موفق با i + 1 جاش رو می‌گیره.",
                },
                {
                  en: "break right after saving the position — the first match is the answer.",
                  fa: "همون لحظه بعد از ذخیرهٔ جایگاه break بزن — اولین برخورد، جوابه.",
                },
                {
                  en: "After the loop: if position != -1 it was found, otherwise Not in playlist",
                  fa: "بعد از حلقه: اگه position != -1 بود یعنی پیدا شد، وگرنه Not in playlist",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "Levitating", expect: "Found at position 3" },
                  { stdin: "Gole Yakh", expect: "Found at position 2", hidden: true },
                  { stdin: "Take Five", expect: "Not in playlist", hidden: true },
                ],
              },
              sample: { stdin: "Levitating", expect: "Found at position 3" },
            },
          ],
        },
        {
          id: "py-m7-l2",
          title: { en: "Sorting by Hand", fa: "مرتب‌سازی دستی" },
          goal: {
            en: "Build selection sort yourself and watch order emerge from chaos.",
            fa: "مرتب‌سازی انتخابی رو خودت بساز و ببین نظم چطوری از دل آشوب درمیاد.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "sorted() feels like magic. Today you BECOME the magic. Selection sort's idea: find the smallest item, move it out to a result list, repeat until the pile is empty. Each round delivers one guaranteed-smallest piece — that's why the result comes out perfectly ordered.",
                  fa: "‏sorted() جادو به نظر می‌رسه. امروز خودت جادوگر می‌شی. ایدهٔ مرتب‌سازی انتخابی: کوچیک‌ترین عضو رو پیدا کن، ببرش توی لیست نتیجه، و این کار رو تکرار کن تا توده خالی بشه. هر دور یه تضمینِ «کوچیک‌ترینِ باقی‌مونده» تحویل می‌ده — برای همین نتیجه کاملاً مرتب درمیاد.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `pile = [40, 10, 30]

smallest = pile[0]
for n in pile:
    if n < smallest:
        smallest = n

print(f"Smallest: {smallest}")`,
                  caption: { en: "Round 1 of the machine: hunt the smallest.", fa: "دور اولِ ماشین: شکار کوچیک‌ترین." },
                },
                {
                  type: "warn",
                  en: "Don't name your result list sorted — that's a built-in function's name and you'd shadow it. result or ranking works great.",
                  fa: "لیست نتیجه‌ات رو sorted ننام — اسم یه تابع آماده‌ست و می‌ره زیر سایه. result یا ranking عالیه.",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Full machine: an outer **while** keeps running while the pile is not empty; inside, the inner **for** finds the smallest, then .append() moves it to the result and .remove() deletes it from the pile. While + for — the one-two punch of selection sort.",
                  fa: "ماشین کامل: یه **while** بیرونی تا وقتی توده خالی نشده می‌چرخه؛ داخلش **for** داخلی کوچیک‌ترین رو پیدا می‌کنه، بعد append() می‌بره‌ش توی نتیجه و remove() از توده پاکش می‌کنه. while + for — همان مشت ترکیبی مرتب‌سازی انتخابی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `pile = [40, 10, 30]
result = []

while len(pile) > 0:
    smallest = pile[0]
    for n in pile:
        if n < smallest:
            smallest = n
    result.append(smallest)
    pile.remove(smallest)

print(result)`,
                  caption: { en: "Every pass shrinks the pile by one and grows the answer by one.", fa: "هر دور توده رو یکی کوچیک و جواب رو یکی بزرگ می‌کنه." },
                },
                {
                  type: "tip",
                  en: "This is real selection sort — the same algorithm runs in hospital queue systems and leaderboard ranks. You just built one.",
                  fa: "این همون مرتب‌سازی انتخابی واقعیه — همون الگوریتمی که توی سیستم نوبت بیمارستان و رتبه‌بندی جدول قهرمانی می‌چرخه. تو همین الان یکی ساختی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What is the core idea of selection sort?", fa: "ایدهٔ اصلی مرتب‌سازی انتخابی چیه؟" },
                  options: [
                    { en: "Randomly shuffle until it looks sorted", fa: "تصادفی بُر بزن تا مرتب به نظر بیاد" },
                    { en: "Repeatedly pick the smallest remaining item into the result", fa: "همیشه کوچیک‌ترینِ باقی‌مونده رو بردار و ببر توی نتیجه" },
                    { en: "Split the list in half and swap halves", fa: "لیست رو نصف کن و دو نیمه رو جابجا کن" },
                    { en: "Ask sorted() nicely", fa: "با ادب از sorted() خواهش کن" },
                  ],
                  answer: 1,
                  explain: { en: "Each round extracts the minimum of what's left — after n rounds, everything's in order.", fa: "هر دور کمینهٔ باقی‌مانده رو بیرون می‌کشه — بعد از n دور، همه‌چی مرتبه." },
                },
                {
                  q: { en: "Why does the inner for loop exist?", fa: "حلقهٔ for داخلی به چه دردی می‌خوره؟" },
                  options: [
                    { en: "To print the pile", fa: "برای چاپ توده" },
                    { en: "To find the smallest item among the remaining candidates", fa: "برای پیدا کردن کوچیک‌ترین عضو بین نامزدهای باقی‌مانده" },
                    { en: "To delete the result list", fa: "برای پاک کردن لیست نتیجه" },
                    { en: "It's decorative", fa: "فقط تزئینه" },
                  ],
                  answer: 1,
                  explain: { en: "The inner loop scans every remaining item to elect the smallest — that's the \"selection\" in selection sort.", fa: "حلقهٔ داخلی همهٔ باقی‌مانده‌ها رو می‌گرده و کوچیک‌ترین رو انتخاب می‌کنه — این همون «انتخاب» توی مرتب‌سازی انتخابیه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Selection Machine", fa: "ماشین انتخاب" },
              brief: {
                en: "Read four scores, then sort them ascending BY HAND — sorted() is BANNED in this challenge! Print the sorted list, then hand out gold:\n[40, 50, 80, 90]\nGold medal: {the biggest}",
                fa: "چهار تا نمره بخون و بعدشون رو صعودی دستی مرتب کن — توی این چالش sorted ممنوعه! لیست مرتب‌شده رو چاپ کن، بعد مدال طلا بده:\n[40, 50, 80, 90]\nGold medal: {بزرگ‌ترین}",
              },
              starter: `scores = []
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))

result = []
# while len(scores) > 0:
#   inner for: hunt the smallest in scores
#   append it to result, remove it from scores
# print(result)
# print f"Gold medal: {result[-1]}"
`,
              solution: `scores = []
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))
scores.append(int(input()))

result = []
while len(scores) > 0:
    smallest = scores[0]
    for n in scores:
        if n < smallest:
            smallest = n
    result.append(smallest)
    scores.remove(smallest)
print(result)
print(f"Gold medal: {result[-1]}")`,
              hints: [
                {
                  en: "The while keeps going until the original list is empty — len(scores) > 0 is your fuel gauge.",
                  fa: "‏while تا وقتی لیست اصلی خالی نشده می‌چرخه — len(scores) > 0 عقربهٔ بنزینته.",
                },
                {
                  en: "Inside: smallest = scores[0], a for to compare, then result.append(smallest) and scores.remove(smallest).",
                  fa: "داخل حلقه:‏ smallest = scores[0]، یه for برای مقایسه، بعد result.append(smallest) و scores.remove(smallest).",
                },
                {
                  en: "After sorting, result[-1] is the biggest — your gold medalist.",
                  fa: "بعد از مرتب‌سازی، result[-1] بزرگ‌ترین ــه — مدال‌آور طلایت.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "80\n90\n40\n50", expect: "[40, 50, 80, 90]\nGold medal: 90" },
                  { stdin: "10\n30\n20\n25", expect: "[10, 20, 25, 30]\nGold medal: 30", hidden: true },
                  { stdin: "99\n1\n50\n7", expect: "[1, 7, 50, 99]\nGold medal: 99", hidden: true },
                ],
              },
              sample: { stdin: "80\n90\n40\n50", expect: "[40, 50, 80, 90]\nGold medal: 90" },
            },
          ],
        },
        {
          id: "py-m7-l3",
          title: { en: "The Counter Pattern", fa: "الگوی شمارنده" },
          goal: {
            en: "Count anything — votes, words, moods — with a dictionary tally.",
            fa: "هر چیزی رو بشمار — رأی، کلمه، حال و هوا — با شمارندهٔ دیکشنری.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Meet the most reused algorithm pattern on Earth: the **dict counter**. Keys are the things being counted, values are how many times each appeared. One line does the whole tally: counts[x] = counts.get(x, 0) + 1 — read it as \"x's score, starting from zero, plus one\".",
                  fa: "با پرکاربردترین الگوی الگوریتمی دنیا آشنا شو: **شمارندهٔ دیکشنری**. کلیدها همون چیزهاییه که می‌شمریم و مقدارها تعداد دفعاتشون. یه خط کل شمارش رو انجام می‌ده:‏ counts[x] = counts.get(x, 0) + 1 — بخونش: «امتیاز x، از صفر شروع، بعلاوهٔ یک».",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `moods = ["happy", "sad", "happy"]
counts = {}
for m in moods:
    counts[m] = counts.get(m, 0) + 1
print(counts)`,
                  caption: { en: "First visit creates the key at 0, then immediately bumps it to 1.", fa: "اولین دیدار کلید رو با صفر می‌سازه و همون لحظه می‌کنه‌ش یک." },
                },
                {
                  type: "warn",
                  en: "counts[x] + 1 crashes when x is new — the key doesn't exist yet. counts.get(x, 0) is the safe handshake: give me the count, or 0 if we've never met.",
                  fa: "اگه x تازه باشه،‏ counts[x] + 1 خطا می‌ده — کلید هنوز وجود نداره.‏ counts.get(x, 0) دست‌دادن امنه: «تعدادش رو بده، یا اگه همدیگه رو نمی‌شناسیم، صفر».",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A dict loops over its KEYS — each name once, in the order it was first seen. So printing the tally is a three-line loop. And finding the winner? The same champion pattern from the Squad Reporter: keep a best, replace it whenever someone strictly beats it.",
                  fa: "دیکشنری روی KEYهاش حلقه می‌زنه — هر اسم فقط یه بار، به ترتیبِ اولین دیدار. پس چاپ شمارش سه‌خطه. برنده رو هم می‌خوای؟ همون الگوی قهرمان از درس گزارشگر تیم: یه best نگه دار و هرکي بیشترش بود، جاش رو بگیر.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `moods = ["happy", "sad", "happy"]
counts = {}
for m in moods:
    counts[m] = counts.get(m, 0) + 1

for m in counts:
    print(f"{m}: {counts[m]}")

best = ""
top = 0
for m in counts:
    if counts[m] > top:
        top = counts[m]
        best = m
print(f"Winner: {best}")`,
                  caption: { en: "The counter feeds both the report AND the verdict.", fa: "همون شمارنده، هم گزارش رو می‌ده هم حکم نهایی رو." },
                },
                {
                  type: "tip",
                  en: "New keys keep the order you first met them — so your tally output is predictable, not shuffled. Great for grading!",
                  fa: "کلیدهای جدید به ترتیب اولین دیدار می‌شینن — پس خروجی شمارشت قابل پیش‌بینیه، نه بُر‌خورده. برای تصحیح کردن عالیه!",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does counts.get(x, 0) do when x is not in the dict?", fa: "اگه x توی دیکشنری نباشه،‏ counts.get(x, 0) چیکار می‌کنه؟" },
                  options: [
                    { en: "Crashes with an error", fa: "با خطا کرش می‌کنه" },
                    { en: "Returns 0 — the safe default", fa: "صفر برمی‌گردونه — پیش‌فرض امن" },
                    { en: "Adds x to the dict", fa: "‏x رو به دیکشنری اضافه می‌کنه" },
                    { en: "Returns the empty string", fa: "رشتهٔ خالی برمی‌گردونه" },
                  ],
                  answer: 1,
                  explain: { en: ".get(key, default) returns the count if it exists, otherwise your chosen default — here 0.", fa: "‏get(key, default) اگه تعداد موجود بود همون رو می‌ده، وگرنه پیش‌فرض انتخابی تو — این‌جا صفر." },
                },
                {
                  q: { en: "for name in counts: — what does name walk over?", fa: "‏for name in counts: — متغیر name روی چی حرکت می‌کنه؟" },
                  options: [
                    { en: "The values (the numbers)", fa: "مقدارها (عددها)" },
                    { en: "The keys (the names)", fa: "کلیدها (اسم‌ها)" },
                    { en: "Both key and value pairs", fa: "جفت‌های کلید و مقدار" },
                    { en: "The dict's length", fa: "طول دیکشنری" },
                  ],
                  answer: 1,
                  explain: { en: "Looping a dict yields its keys; reach the value with counts[name].", fa: "حلقه روی دیکشنری، کلیدهاش رو می‌ده؛ مقدار رو هم با counts[name] می‌گیری." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Vote Counter", fa: "شمارندهٔ آرا" },
              brief: {
                en: "Read n (the number of votes), then n names — one vote per line. Count them with a dict and print each candidate as exactly \"{name}: {votes}\", then crown:\nWinner: {name}",
                fa: "اول n رو بخون (تعداد رأی‌ها) و بعد n تا اسم — هر خط یه رأی. با دیکشنری بشمار و هر نامزد رو دقیقاً به شکل \"{name}: {تعداد}\" چاپ کن، بعد تاج‌گذاری:\nWinner: {اسم}",
              },
              starter: `n = int(input())
votes = []
for i in range(n):
    votes.append(input())

counts = {}
# TODO: the one-line counter pattern, then:
# 1. print each candidate: f"{name}: {counts[name]}"
# 2. champion loop: best = "", top = 0, replace on strictly more votes
# 3. print f"Winner: {winner}"
`,
              solution: `n = int(input())
votes = []
for i in range(n):
    votes.append(input())

counts = {}
for v in votes:
    counts[v] = counts.get(v, 0) + 1

for name in counts:
    print(f"{name}: {counts[name]}")

winner = ""
top = 0
for name in counts:
    if counts[name] > top:
        top = counts[name]
        winner = name
print(f"Winner: {winner}")`,
              hints: [
                {
                  en: "counts[v] = counts.get(v, 0) + 1 — one line, inside a for v in votes loop.",
                  fa: "‏counts[v] = counts.get(v, 0) + 1 — یه خط، داخل حلقهٔ for v in votes.",
                },
                {
                  en: "for name in counts: prints the report; reach each number with counts[name].",
                  fa: "‏for name in counts: گزارش رو چاپ می‌کنه؛ هر عدد رو هم با counts[name] بگیر.",
                },
                {
                  en: "Winner loop: start top at 0 and winner at \"\" — a candidate must have STRICTLY more votes to take the crown.",
                  fa: "حلقهٔ برنده:‏ top رو ۰ و winner رو \"\" شروع کن — نامزد باید رأیِ اکیداً بیشتری داشته باشه تا تاج رو بگیره.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "5\nali\nsara\nali\nzoe\nali", expect: "ali: 3\nsara: 1\nzoe: 1\nWinner: ali" },
                  { stdin: "4\nzoe\nzoe\nmaya\nzoe", expect: "zoe: 3\nmaya: 1\nWinner: zoe", hidden: true },
                  { stdin: "3\nrose\nrose\nrose", expect: "rose: 3\nWinner: rose", hidden: true },
                ],
              },
              sample: { stdin: "5\nali\nsara\nali\nzoe\nali", expect: "ali: 3\nsara: 1\nzoe: 1\nWinner: ali" },
            },
          ],
        },
        {
          id: "py-m7-l4",
          title: { en: "Mini-Project: Word Stats", fa: "پروژهٔ کوچک: آمارِ کلمه‌ها" },
          goal: {
            en: "Give a sentence a full analysis: word count, longest word, letter frequency.",
            fa: "یه جمله رو کامل تحلیل کن: تعداد کلمه‌ها، بلندترین کلمه و بسامد حرف‌ها.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Everything from this module joins forces: **split()** breaks the sentence into words, **len()** counts them, a hand-rolled max loop finds the longest. Three stats, one program — exactly how text analyzers and word counters work behind the scenes.",
                  fa: "همهٔ ابزارهای این ماژول یه‌جا جمع می‌شن:‏ **split()** جمله رو به کلمه‌ها می‌شکنه، **len()** می‌شمره‌شون و یه حلقهٔ max دست‌ساز بلندترین رو پیدا می‌کنه. سه تا آمار، یه برنامه — دقیقاً همون‌طور که تحلیل‌گرهای متن پشت صحنه کار می‌کنن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `sentence = "to be or not to be"
words = sentence.split()

print(f"Words: {len(words)}")

longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
print(f"Longest: {longest}")`,
                  caption: { en: "Longest-word logic: a candidate + a challenge for the crown.", fa: "منطق بلندترین کلمه: یه نامزد + چالش برای تاج." },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "For letter frequency, loop over the string itself — for ch in sentence gives one character at a time (yes, strings are loopable!). Skip spaces with an if, then run the counter pattern.",
                  fa: "برای بسامد حرف‌ها روی خود رشته حلقه بزن — ‏for ch in sentence هر بار یه کاراکتر می‌ده (بله، رشته هم قابل حلقه‌زدنه!). با یه if فاصله‌ها رو رد کن و بعد الگوی شمارنده رو اجرا کن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `sentence = "to be or not to be"

freq = {}
for ch in sentence:
    if ch != " ":
        freq[ch] = freq.get(ch, 0) + 1

for ch in freq:
    print(f"{ch}: {freq[ch]}")`,
                  caption: { en: "Letters appear in first-seen order — clean, readable stats.", fa: "حرف‌ها به ترتیب اولین دیدار میان — آمارِ تمیز و خوانا." },
                },
                {
                  type: "tip",
                  en: "The longest-word check uses > (strictly bigger) — so if two words tie, the FIRST one keeps the title. Remember that for the challenge!",
                  fa: "چکِ بلندترین کلمه با > ــه (اکیداً بزرگ‌تر) — پس اگه دو تا کلمه مساوی شدن، اولی لقب رو نگه می‌داره. برای چالش یادت باشه!",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "\"to be or not to be\".split() gives how many words?", fa: "خروجی \"to be or not to be\".split() چند تا کلمه‌ست؟" },
                  options: [
                    { en: "5", fa: "۵" },
                    { en: "6", fa: "۶" },
                    { en: "7", fa: "۷" },
                    { en: "18", fa: "۱۸" },
                  ],
                  answer: 1,
                  explain: { en: "to, be, or, not, to, be — six words; split() drops the spaces.", fa: "‏to و be و or و not و to و be — شش تا؛ split فاصله‌ها رو حذف می‌کنه." },
                },
                {
                  q: { en: "With the check if len(w) > len(longest), what happens when two words tie in length?", fa: "با شرط if len(w) > len(longest)، وقتی دو کلمه هم‌طول باشن چی می‌شه؟" },
                  options: [
                    { en: "The program crashes", fa: "برنامه کرش می‌کنه" },
                    { en: "The FIRST one keeps the title — equal length never replaces", fa: "اولی لقب رو نگه می‌داره — طول مساوی هیچ‌وقت جابجا نمی‌کنه" },
                    { en: "The LAST one always wins", fa: "همیشه آخری برنده می‌شه" },
                    { en: "Both get printed", fa: "هر دو چاپ می‌شن" },
                  ],
                  answer: 1,
                  explain: { en: "> is strict: equal is not bigger, so the champion only changes when beaten.", fa: "‏> سخت‌گیره: مساوی یعنی بزرگ‌تر نیست، پس قهرمان فقط وقتی عوض می‌شه که شکست بخوره." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build Word Stats", fa: "آمارِ کلمه‌ها رو بساز" },
              brief: {
                en: "The starter hands you a fixed sentence — no input needed. Print its full analysis:\nWords: {n}\nLongest: {word}\nLetters:\n{letter}: {count}   (one line per letter, first-seen order, spaces skipped)",
                fa: "استارتر یه جملهٔ ثابت بهت می‌ده — ورودی لازم نیست. تحلیل کاملش رو چاپ کن:\nWords: {تعداد}\nLongest: {کلمه}\nLetters:\n{حرف}: {تعداد}   (هر حرف یه خط، به ترتیب اولین دیدار، بدون فاصله‌ها)",
              },
              starter: `sentence = "to be or not to be"

# 1. words = sentence.split() -> print f"Words: {len(words)}"
# 2. longest = words[0]; challenge it with every word (strictly longer wins)
#    -> print f"Longest: {longest}"
# 3. freq = {} ; loop over sentence, skip " ", counter pattern
# 4. print "Letters:" then one f"{ch}: {freq[ch]}" line per letter
`,
              solution: `sentence = "to be or not to be"

words = sentence.split()
print(f"Words: {len(words)}")

longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
print(f"Longest: {longest}")

freq = {}
for ch in sentence:
    if ch != " ":
        freq[ch] = freq.get(ch, 0) + 1

print("Letters:")
for ch in freq:
    print(f"{ch}: {freq[ch]}")`,
              hints: [
                {
                  en: "Words and Longest first — you've written both patterns in the theory above.",
                  fa: "اول Words و Longest — هر دو الگو رو بالاتر توی تئوری نوشتی.",
                },
                {
                  en: "The frequency dict: for ch in sentence: then if ch != \" \": then freq[ch] = freq.get(ch, 0) + 1.",
                  fa: "دیکشنری بسامد:‏ for ch in sentence: بعد if ch != \" \": بعد freq[ch] = freq.get(ch, 0) + 1.",
                },
                {
                  en: "Print the header Letters: once, then loop for ch in freq for the per-letter lines.",
                  fa: "سربرگ Letters: رو یه بار چاپ کن، بعد با for ch in freq خط‌های تک‌تک حرف‌ها رو بده.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { expect: "Words: 6\nLongest: not\nLetters:\nt: 3\no: 4\nb: 2\ne: 2\nr: 1\nn: 1" },
                ],
              },
              sample: { expect: "Words: 6\nLongest: not\nLetters:\nt: 3\no: 4\nb: 2\ne: 2\nr: 1\nn: 1" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m8",
      title: { en: "Level Up: Real Programs", fa: "سطح بعدی: برنامه‌های واقعی" },
      blurb: {
        en: "Math superpowers, stubborn users, self-calling functions — and your second final project.",
        fa: "ابرقوای math، کاربرهای لجباز، توابعی که خودشون رو صدا می‌زنن — و دومین پروژهٔ پایانی‌ات.",
      },
      lessons: [
        {
          id: "py-m8-l1",
          title: { en: "The math Module", fa: "ماژول math" },
          goal: {
            en: "Import real math powers: sqrt, floor, ceil, pow and pi.",
            fa: "قدرت‌های واقعی ریاضی رو import کن: sqrt و floor و ceil و pow و pi.",
          },
          minutes: 11,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "You've already imported random — now meet its serious sibling: **import math**. It carries sqrt() (square roots), floor() (round DOWN), ceil() (round UP), pow() (powers) and pi (the circle constant, just a value — no parentheses).",
                  fa: "با random آشنا شدی — حالا برادر جدیش:‏ **import math**. این یکی sqrt (جذر)، floor (رند به پایین)، ceil (رند به بالا)، pow (توان) و pi (عدد پی، فقط یه مقداره — بدون پرانتز) رو با خودش میاره.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `import math

print(math.sqrt(25))
print(math.floor(3.9))
print(math.ceil(3.1))
print(round(math.pi, 2))`,
                  caption: { en: "5.0, 3, 4, 3.14 — four tools, one import.", fa: "‏۵٫۰ و ۳ و ۴ و ۳٫۱۴ — چهار تا ابزار، یه import." },
                },
                {
                  type: "warn",
                  en: "math.pi is a VALUE: write it without parentheses. math.pi() is an error — you can't call a number!",
                  fa: "‏math.pi یه مقداره: بدون پرانتز بنویسش.‏ math.pi() خطا می‌ده — عدد رو نمی‌شه صدا زد!",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The classic combo: Pythagoras. The hypotenuse of a right triangle is sqrt(a² + b²) — geometry homework, game distances and graphics all run on this one line.",
                  fa: "ترکیب کلاسیک: فیثاغورس. وتر مثلث قائم‌الزاویه می‌شه sqrt(a² + b²) — تکالیف هندسه، فاصلهٔ حرکت توی بازی و گرافیک همه روی همین یه خط می‌چرخن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `import math

a = 3
b = 4
c = math.sqrt(a ** 2 + b ** 2)
print(c)`,
                },
                {
                  type: "tip",
                  en: "math.pow(2, 3) and 2 ** 3 do the same job — but pow returns a float (8.0) while ** keeps it whole (8). For everyday math, ** is the people's choice.",
                  fa: "‏math.pow(2, 3) و 2 ** 3 همون کار رو می‌کنن — ولی pow اعشاری برمی‌گردونه (8.0) و ** عدد کامل نگه می‌داره (8). برای کارهای روزمره، ** انتخاب مردمه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does math.sqrt(16) return?", fa: "‏math.sqrt(16) چی برمی‌گردونه؟" },
                  options: [
                    { en: "4", fa: "‏۴" },
                    { en: "4.0", fa: "‏۴٫۰" },
                    { en: "16", fa: "‏۱۶" },
                    { en: "8", fa: "‏۸" },
                  ],
                  answer: 1,
                  explain: { en: "sqrt always returns a float — even for perfect squares like 16.", fa: "‏sqrt همیشه اعشاری برمی‌گردونه — حتی برای مربع‌های کامل مثل ۱۶." },
                },
                {
                  q: { en: "math.floor(7.9) and math.ceil(7.1) — which pair?", fa: "‏math.floor(7.9) و math.ceil(7.1) — کدوم جوره؟" },
                  options: [
                    { en: "8 and 7", fa: "۸ و ۷" },
                    { en: "7 and 7", fa: "۷ و ۷" },
                    { en: "7 and 8", fa: "۷ و ۸" },
                    { en: "8 and 8", fa: "۸ و ۸" },
                  ],
                  answer: 2,
                  explain: { en: "floor always goes DOWN (7.9 → 7), ceil always goes UP (7.1 → 8).", fa: "‏floor همیشه به پایین می‌ره (۷٫۹ → ۷) و ceil همیشه به بالا (۷٫۱ → ۸)." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Hypotenuse Machine", fa: "ماشین وتر" },
              brief: {
                en: "Read two triangle legs (floats, one per line) and print exactly:\nHypotenuse: {sqrt(a²+b²), rounded to 2 decimals}\nFloor: {rounded down}\nCeil: {rounded up}",
                fa: "دو تا ضلع مثلث رو بخون (اعشاری، هر خط یکی) و دقیقاً چاپ کن:\nHypotenuse: {جذرِ a²+b²، رند به ۲ رقم اعشار}\nFloor: {رند به پایین}\nCeil: {رند به بالا}",
              },
              starter: `import math

a = float(input())
b = float(input())

# 1. c = math.sqrt(a ** 2 + b ** 2), then round(c, 2)
# 2. print f"Hypotenuse: {c}"
# 3. print f"Floor: {math.floor(c)}"
# 4. print f"Ceil: {math.ceil(c)}"
`,
              solution: `import math

a = float(input())
b = float(input())

c = round(math.sqrt(a ** 2 + b ** 2), 2)
print(f"Hypotenuse: {c}")
print(f"Floor: {math.floor(c)}")
print(f"Ceil: {math.ceil(c)}")`,
              hints: [
                {
                  en: "c = round(math.sqrt(a ** 2 + b ** 2), 2) — sqrt first, round second.",
                  fa: "‏c = round(math.sqrt(a ** 2 + b ** 2), 2) — اول جذر، بعد رند.",
                },
                {
                  en: "math.floor(c) and math.ceil(c) both take c directly — no rounding tricks needed.",
                  fa: "‏math.floor(c) و math.ceil(c) هر دو مستقیم c رو می‌گیرن — لازم نیست هیل به رند بکشی.",
                },
                {
                  en: "For 3 and 4 the hypotenuse is 5.0 — your output should start Hypotenuse: 5.0",
                  fa: "برای ۳ و ۴، وتر می‌شه ۵٫۰ — خروجیت باید با Hypotenuse: 5.0 شروع شه",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "3\n4", expect: "Hypotenuse: 5.0\nFloor: 5\nCeil: 5" },
                  { stdin: "5\n7", expect: "Hypotenuse: 8.6\nFloor: 8\nCeil: 9", hidden: true },
                  { stdin: "6\n8", expect: "Hypotenuse: 10.0\nFloor: 10\nCeil: 10", hidden: true },
                ],
              },
              sample: { stdin: "3\n4", expect: "Hypotenuse: 5.0\nFloor: 5\nCeil: 5" },
            },
          ],
        },
        {
          id: "py-m8-l2",
          title: { en: "Input Validation: Trust No One", fa: "اعتبارسنجی ورودی: به هیچ‌کس اعتماد نکن" },
          goal: {
            en: "Keep re-asking until the user types something your program can actually use.",
            fa: "تا وقتی کاربر چیزی قابل‌استفاده نزده، دوباره بپرس — بدون خطا و کرش.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Real users type \"abc\" where a number should go — and int(\"abc\") crashes your program. The fix isn't hope, it's a **validation loop**: check the input FIRST, and while it's bad, print a friendly nudge and ask again. The string method .isdigit() is your bouncer: True only for pure digits.",
                  fa: "کاربر واقعی جایی که باید عدد بزنه می‌زنه «abc» — و int(\"abc\") برنامه‌ات رو می‌کشه. راه‌حل امید به آینده نیست، **حلقهٔ اعتبارسنجی** ــه: اول ورودی رو چک کن، و تا وقتی خرابه یه پیام مهربون چاپ کن و دوباره بپرس. متد .isdigit() هم نگهبان درته: فقط برای رقم‌های خالص True می‌ده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `print("123".isdigit())
print("12a".isdigit())
print("".isdigit())`,
                  caption: { en: "True, False, False — only clean digits get in.", fa: "‏True و False و False — فقط رقم‌های تمیز راه پیدا می‌کنن." },
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The pattern: read once, then while the value is invalid, complain and read AGAIN — the re-ask inside the loop is what unlocks the exit. Combine rules with or: not digits OR wrong length both mean \"not yet\".",
                  fa: "الگو: یه بار بخون، و تا وقتی مقدار نامعتبره گله کن و دوباره بخون — همون دوباره‌پرسیدنِ داخل حلقه‌ست که درِ خروج رو باز می‌کنه. قانون‌ها رو هم با or ترکیب کن: نه رقم باشه یا طولش خراب، هر دو یعنی «هنوز نه».",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `pin = input()
while not pin.isdigit() or len(pin) != 4:
    if not pin.isdigit():
        print("Digits only!")
    else:
        print("Need exactly 4 digits")
    pin = input()
print(f"Pin accepted: {pin}")`,
                  caption: { en: "Add lines to the Input box to walk through the re-asks.", fa: "برای دیدن مسیرِ دوباره‌پرسیدن‌ها، چند خط توی باکس Input بنویس." },
                },
                {
                  type: "warn",
                  en: "Forget the pin = input() INSIDE the loop and it spins forever on the same bad value — the re-ask is the engine, not decoration.",
                  fa: "اگه pin = input() داخل حلقه رو جا بندازی، حلقه تا ابد روی همون مقدار خراب می‌چرخه — دوباره‌پرسیدن موتورِ کاره، نه تزئین.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Why validate input in a loop instead of calling int() directly?", fa: "چرا ورودی رو توی حلقه اعتبارسنجی می‌کنیم به‌جای اینکه مستقیم int() بزنیم؟" },
                  options: [
                    { en: "Loops are trendy", fa: "حلقه‌ها مُدن" },
                    { en: "int() crashes on non-numbers — the loop asks again until the input is safe", fa: "‏int() روی غیرعدد کرش می‌کنه — حلقه تا امن شدن ورودی دوباره می‌پرسه" },
                    { en: "int() only works in loops", fa: "‏int() فقط توی حلقه کار می‌کنه" },
                    { en: "To make programs slower", fa: "که برنامه کند بشه" },
                  ],
                  answer: 1,
                  explain: { en: "Validation converts a crash into a conversation — the user gets another chance.", fa: "اعتبارسنجی کرش رو تبدیل به گفتگو می‌کنه — کاربر یه شانس دیگه می‌گیره." },
                },
                {
                  q: { en: "What does \"12a\".isdigit() return?", fa: "خروجی \"12a\".isdigit() چیه؟" },
                  options: [
                    { en: "True", fa: "‏True" },
                    { en: "False", fa: "‏False" },
                    { en: "The string without the a", fa: "همون رشته بدون a" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "isdigit() demands PURE digits — one stray letter and it's False.", fa: "‏isdigit فقط رقمِ خالص می‌خواد — یه حرف سرگردانی کافیه تا False بده." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The PIN Guard", fa: "نگهبان رمز" },
              brief: {
                en: "Guard the entrance: read lines until one is a valid PIN (exactly 4 digits). Wrong type → print Digits only! Wrong length → print Need exactly 4 digits. When valid, print:\nPin accepted: {pin}",
                fa: "نگهبانی بده: خط‌ها رو بخون تا یکی PIN معتبر بشه (دقیقاً ۴ رقم). نوع غلط → چاپ کن Digits only! طول غلط → چاپ کن Need exactly 4 digits. وقتی معتبر شد چاپ کن:\nPin accepted: {رمز}",
              },
              starter: `pin = input()

# while not pin.isdigit() or len(pin) != 4:
#   if not pin.isdigit() -> print "Digits only!"
#   else -> print "Need exactly 4 digits"
#   re-read pin INSIDE the loop
# then print f"Pin accepted: {pin}"
`,
              solution: `pin = input()

while not pin.isdigit() or len(pin) != 4:
    if not pin.isdigit():
        print("Digits only!")
    else:
        print("Need exactly 4 digits")
    pin = input()

print(f"Pin accepted: {pin}")`,
              hints: [
                {
                  en: "The while condition is one line: while not pin.isdigit() or len(pin) != 4: — both rules must pass.",
                  fa: "شرط while یه خطه:‏ while not pin.isdigit() or len(pin) != 4: — هر دو قانون باید رد شن.",
                },
                {
                  en: "Inside: the if/elif-style messages, then pin = input() — the re-read MUST be inside the loop.",
                  fa: "داخلش: پیام‌های if/else، بعد pin = input() — دوباره‌خوندن حتماً باید داخل حلقه باشه.",
                },
                {
                  en: "The accepted line prints after the loop — no indent, exactly: Pin accepted: {pin}",
                  fa: "خط قبولی بعد از حلقه چاپ می‌شه — بدون تورفتگی، دقیقاً: Pin accepted: {pin}",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "12a\n12\n3456", expect: "Digits only!\nNeed exactly 4 digits\nPin accepted: 3456" },
                  { stdin: "99\n12345\n7777", expect: "Need exactly 4 digits\nNeed exactly 4 digits\nPin accepted: 7777", hidden: true },
                  { stdin: "5555", expect: "Pin accepted: 5555", hidden: true },
                ],
              },
              sample: { stdin: "12a\n12\n3456", expect: "Digits only!\nNeed exactly 4 digits\nPin accepted: 3456" },
            },
          ],
        },
        {
          id: "py-m8-l3",
          title: { en: "Recursion: The Mirror Trick", fa: "بازگشت: ترفند آینه" },
          goal: {
            en: "Write functions that call themselves — countdown and factorial from scratch.",
            fa: "تابعی بنویس که خودش رو صدا بزنه — شمارش معکوس و فاکتوریل از صفر.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Plot twist: a function can call ITSELF. That's **recursion**. countdown(3) prints 3, then calls countdown(2), which prints 2, which calls countdown(1)... Each call is one mirror in a hallway of mirrors. The **base case** — \"if n == 0, print Go! and return\" — is the wall that stops the hall from being infinite.",
                  fa: "یه خبر داغ: تابع می‌تونه خودش رو صدا بزنه! بهش می‌گن **بازگشت (Recursion)**.‏ countdown(3) عدد ۳ رو چاپ می‌کنه و بعد countdown(2) رو صدا می‌زنه، اون ۲ رو چاپ می‌کنه و می‌رسه به countdown(1)... هر صدا زدن یه آینه توی راهروی آینه‌هاست. **حالت پایه** — «اگه n صفر شد، Go! رو چاپ کن و return» — همون دیواریه که نمی‌ذاره راهرو تا بی‌نهایت ادامه پیدا کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def countdown(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`,
                  caption: { en: "3, 2, 1, Go! — the loop hid inside a function all along.", fa: "‏۳ و ۲ و ۱ و Go! — حلقه همیشه همین‌جا توی یه تابع قایم بود." },
                },
                {
                  type: "warn",
                  en: "No base case = infinite mirrors. This playground stops you after ~60 nested calls with a friendly error — real Python would keep going until your memory begs for mercy.",
                  fa: "بدون حالت پایه = راهروی بی‌نهایت آینه. این زمین بازی بعد از حدود ۶۰ فراخوانی تودرتو با یه خطای مهربون نگهت می‌داره — پایتون واقعی ادامه می‌ده تا حافظه التماس کنه!",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Recursion can also RETURN values. Factorial (5! = 5×4×3×2×1) is the textbook case: factorial(n) = n × factorial(n-1), and the base case factorial(1) = 1 stops the cascade. Each layer multiplies on the way back UP.",
                  fa: "بازگشت می‌تونه مقدار هم RETURN کنه. فاکتوریل (‏۵! یعنی ۵×۴×۳×۲×۱) مثال کتاب درسیه:‏ factorial(n) = n × factorial(n-1) و حالت پایه factorial(1) = 1 آبشار رو می‌بنده. هر لایه توی راه برگشت به بالا، خودش رو ضرب می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
                  caption: { en: "120 — five layers of multiplication folding back up.", fa: "‏۱۲۰ — پنج لایه ضرب که یکی‌یکی برمی‌گردن بالا." },
                },
                {
                  type: "tip",
                  en: "Every recursion needs two things: a base case (when to stop) and a recursive case (how to shrink the problem). Write the base case FIRST, always.",
                  fa: "هر بازگشتی دو تا چیز می‌خواد: حالت پایه (کی بایسته) و حالت بازگشتی (مسئله رو چطوری کوچیک کنه). حالت پایه رو همیشه اول بنویس.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What stops a recursive function from calling itself forever?", fa: "چی جلوی فراخوانی بی‌پایان یه تابع بازگشتی رو می‌گیره؟" },
                  options: [
                    { en: "The return type", fa: "نوع خروجی" },
                    { en: "The base case — a condition where it answers without calling itself", fa: "حالت پایه — شرطی که بدون صدا زدن خودش جواب می‌ده" },
                    { en: "print()", fa: "‏print()" },
                    { en: "Nothing — it always loops forever", fa: "هیچی — همیشه تا ابد می‌چرخه" },
                  ],
                  answer: 1,
                  explain: { en: "The base case is the wall of the mirror hallway — countdown stops at n == 0.", fa: "حالت پایه دیوارِ راهروی آینه‌ست — countdown سر n == 0 می‌ایسته." },
                },
                {
                  q: { en: "With factorial(n) = n * factorial(n - 1) and factorial(1) = 1, what is factorial(4)?", fa: "با factorial(n) = n * factorial(n - 1) و factorial(1) = 1، مقدار factorial(4) چنده؟" },
                  options: [
                    { en: "10", fa: "۱۰" },
                    { en: "16", fa: "۱۶" },
                    { en: "24", fa: "۲۴" },
                    { en: "64", fa: "۶۴" },
                  ],
                  answer: 2,
                  explain: { en: "4 × factorial(3) = 4 × 3 × factorial(2) = 4 × 3 × 2 × 1 = 24.", fa: "‏۴ × factorial(3) = ۴ × ۳ × factorial(2) = ۴ × ۳ × ۲ × ۱ = ۲۴." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Recursive Rocket", fa: "موشک بازگشتی" },
              brief: {
                en: "Remember the while-loop countdown? Relaunch it with recursion — no while allowed! Write countdown(n) that prints n down to 1, ends with Go!, and factorial(n) that returns n!. Read n, then print exactly:\n{n}\n...\n1\nGo!\nFactorial: {n!}",
                fa: "شمارش معکوس با while رو یادته؟ این بار با بازگشت پرتابش کن — while ممنوع! تابع countdown(n) رو بنویس که از n تا ۱ چاپ کنه و آخرش Go!، و factorial(n) که n! رو برگردونه. n رو بخون و دقیقاً چاپ کن:\n{n}\n...\n1\nGo!\nFactorial: {n!}",
              },
              starter: `# 1. def countdown(n):
#      base case: if n == 0 -> print "Go!" and return
#      otherwise: print(n), then call countdown(n - 1)
# 2. def factorial(n):
#      base case: if n <= 1 -> return 1
#      otherwise: return n * factorial(n - 1)

n = int(input())
countdown(n)
print(f"Factorial: {factorial(n)}")
`,
              solution: `def countdown(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

n = int(input())
countdown(n)
print(f"Factorial: {factorial(n)}")`,
              hints: [
                {
                  en: "countdown: the base case prints Go! and returns BEFORE the recursive print/call — order matters.",
                  fa: "‏countdown: حالت پایه قبل از چاپ و فراخوانی بازگشتی، Go! رو چاپ و return می‌کنه — ترتیب مهمه.",
                },
                {
                  en: "factorial's base case is if n <= 1: return 1 — it must RETURN the 1, not print it.",
                  fa: "حالت پایهٔ factorial اینه:‏ if n <= 1: return 1 — اون ۱ باید RETURN شه، نه چاپ.",
                },
                {
                  en: "For n = 4 the output is 4, 3, 2, 1, Go! and Factorial: 24 — a great test case.",
                  fa: "برای n = 4 خروجی می‌شه ۴ و ۳ و ۲ و ۱ و Go! و بعد Factorial: 24 — یه تست عالی.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "4", expect: "4\n3\n2\n1\nGo!\nFactorial: 24" },
                  { stdin: "1", expect: "1\nGo!\nFactorial: 1", hidden: true },
                  { stdin: "6", expect: "6\n5\n4\n3\n2\n1\nGo!\nFactorial: 720", hidden: true },
                ],
              },
              sample: { stdin: "4", expect: "4\n3\n2\n1\nGo!\nFactorial: 24" },
            },
          ],
        },
        {
          id: "py-m8-l4",
          title: { en: "FINAL PROJECT 2.0: Number Hunt", fa: "پروژهٔ پایانی ۲٫۰: شکار عدد" },
          goal: {
            en: "Ship a seeded guessing game with hints and a try counter — your second graduation.",
            fa: "یه بازی حدس‌زدن با seed ثابت، راهنما و شمارندهٔ تلاش تحویل بده — دومین فارغ‌التحیلی‌ات.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The game plan: pick a secret from 1 to 20, then loop — read a guess, answer Too low! or Too high!, count every attempt, and celebrate on the hit. The pro twist: random.seed(42) freezes the dice, so the \"random\" secret is THE SAME every run. Real developers do exactly this to test games.",
                  fa: "نقشهٔ بازی: یه راز از ۱ تا ۲۰ انتخاب کن، بعد حلقه — حدس رو بخون، جواب بده Too low! یا Too high!، هر تلاش رو بشمار و سر ضربهٔ نهایی جشن بگیر. ترفند حرفه‌ای:‏ random.seed(42) تاس رو منجمد می‌کنه، پس رازِ «تصادفی» هر بار همونه. برنامه‌نویس‌های واقعی دقیقاً برای تست کردن بازی‌ها همین کار رو می‌کنن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `import random

random.seed(42)
secret = random.randint(1, 20)
print(f"Secret (for testing): {secret}")`,
                  caption: { en: "Run it twice — the same number every time. Chaos, tamed.", fa: "دو بار اجراش کن — هر بار همون عدد. بی‌نظمی، رام‌شده." },
                },
                {
                  type: "warn",
                  en: "In the real challenge the starter already seeds 42 — DON'T change it, or your tests will hunt a different number!",
                  fa: "توی چالش اصلی، استارتر از قبل seed رو ۴۲ گذاشته — دست نزن! وگرنه تست‌هات می‌رن دنبال یه عدد دیگه!",
                },
              ],
            },
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The loop shape: while True means \"ask forever\", and break is the only way out — it fires exactly when the guess is right. Count attempts BEFORE comparing, so the winning try is counted too.",
                  fa: "شکل حلقه:‏ while True یعنی «تا ابد بپرس» و break تنها راه خروج ــه — دقیقاً وقتی روشن می‌شه که حدس درست باشه. تعداد تلاش‌ها رو قبل از مقایسه زیاد کن تا تلاشِ برنده هم حساب شه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `secret = 13
attempts = 0

guess = 7
attempts += 1
if guess < secret:
    print("Too low!")
elif guess > secret:
    print("Too high!")
else:
    print("Got it! 🎯")
    print(f"Tries: {attempts}")`,
                  caption: { en: "One round of the hunt — the challenge wraps this in while True.", fa: "یه دور از شکار — چالش همین رو می‌پیچه توی while True." },
                },
                {
                  type: "tip",
                  en: "Stuck while building? Print the secret once to peek — that's what the seed is FOR. Then hunt it blind.",
                  fa: "وسط ساخت گیر کردی؟ یه بار راز رو چاپ کن و ننه‌مغزه‌لای‌باز کن — اصلاً seed برای همینِه. بعد کورکورانه شکارش کن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Why does the game use random.seed(42) before randint?", fa: "چرا بازی قبل از randint از random.seed(42) استفاده می‌کنه؟" },
                  options: [
                    { en: "To make the secret harder", fa: "که راز سخت‌تر شه" },
                    { en: "So the secret is identical every run — testable and fair", fa: "که راز هر بار یکی باشه — قابل تست و منصفانه" },
                    { en: "It makes randint faster", fa: "‏randint رو سریع‌تر می‌کنه" },
                    { en: "To get MORE randomness", fa: "که تصادفی‌تر بشه" },
                  ],
                  answer: 1,
                  explain: { en: "A fixed seed replays the same sequence — everyone hunts the same secret, so tests can grade you.", fa: "‏seed ثابت همون دنباله رو دوباره پخش می‌کنه — همه یه راز رو شکار می‌کنن و تست‌ها می‌تونن نمره بدن." },
                },
                {
                  q: { en: "In the while True game loop, when does break run?", fa: "توی حلقهٔ while True بازی، break کِی اجرا می‌شه؟" },
                  options: [
                    { en: "Every round", fa: "هر دور" },
                    { en: "Only when the guess equals the secret", fa: "فقط وقتی حدس با راز برابر شه" },
                    { en: "When the guess is too high", fa: "وقتی حدس خیلی بالاست" },
                    { en: "Never — you must crash the program", fa: "هرگز — باید برنامه رو کرش کنی" },
                  ],
                  answer: 1,
                  explain: { en: "The else branch celebrates and breaks — the only exit of an infinite loop.", fa: "شاخهٔ else جشن می‌گیره و break می‌زنه — تنها درِ خروج از حلقهٔ بی‌پایان." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build Number Hunt 🎯", fa: "شکار عدد رو بساز 🎯" },
              brief: {
                en: "The starter locks in a seeded secret (1–20 — same for everyone, shhh!). Read guesses, one number per line, and answer exactly:\nToo low!   /   Too high!\nOn the hit: Got it! 🎯 then Tries: {n} — then stop hunting (break).",
                fa: "استارتر یه رازِ seedشده قفل کرده (۱ تا ۲۰ — برای همه یکی، هیس!). حدس‌ها رو بخون، هر خط یه عدد، و دقیقاً جواب بده:\nToo low!   /   Too high!\nسر ضربهٔ نهایی: Got it! 🎯 بعد Tries: {n} — و بعد دیگه شکار نکن (break).",
              },
              starter: `import random

random.seed(42)          # freezes the dice — same secret every run
secret = random.randint(1, 20)

attempts = 0
# TODO: while True:
#   read a guess with int(input())
#   attempts += 1  (BEFORE comparing!)
#   guess < secret  -> print "Too low!"
#   guess > secret  -> print "Too high!"
#   otherwise       -> print "Got it! 🎯", print f"Tries: {attempts}", break
`,
              solution: `import random

random.seed(42)          # freezes the dice — same secret every run
secret = random.randint(1, 20)

attempts = 0
while True:
    guess = int(input())
    attempts += 1
    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
    else:
        print("Got it! 🎯")
        print(f"Tries: {attempts}")
        break`,
              hints: [
                {
                  en: "while True: read, attempts += 1, then the if / elif / else ladder — the else is where you break.",
                  fa: "‏while True: بخون، attempts += 1، بعد نردبان if / elif / else — break هم توی else ــه.",
                },
                {
                  en: "attempt counting goes BEFORE the comparisons, so a first-try hit prints Tries: 1.",
                  fa: "شمارش تلاش قبل از مقایسه‌ها انجام می‌شه — تا ضربهٔ اول، چاپ کنه Tries: 1.",
                },
                {
                  en: "Debugging cheat: add print(secret) once to see what you're hunting — it's 13 with this seed. Delete it before you submit!",
                  fa: "کلک دیباگ: یه بار print(secret) بذار تا ببینی دنبال چیدی — با این seed می‌شه ۱۳. قبل از تحویل پاکش کن!",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "7\n18\n13", expect: "Too low!\nToo high!\nGot it! 🎯\nTries: 3" },
                  { stdin: "13", expect: "Got it! 🎯\nTries: 1", hidden: true },
                  { stdin: "20\n19\n5\n13", expect: "Too high!\nToo high!\nToo low!\nGot it! 🎯\nTries: 4", hidden: true },
                ],
              },
              sample: { stdin: "7\n18\n13", expect: "Too low!\nToo high!\nGot it! 🎯\nTries: 3" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m9",
      title: { en: "Text Processing Lab", fa: "آزمایشگاه پردازش متن" },
      blurb: {
        en: "String tools become real pipelines: search, clean, split, count — and a full analyzer.",
        fa: "ابزارهای رشته تبدیل به خط تولید می‌شن: جست‌وجو، تمیزکاری، شکستن، شمردن — و یه تحلیلگر کامل.",
      },
      lessons: [
        {
          id: "py-m9-l1",
          title: { en: "String Method Chains", fa: "زنجیرهٔ متدهای رشته" },
          goal: {
            en: "Combine find, count, startswith, endswith and replace into multi-step text pipelines.",
            fa: "متدهای find و count و startswith و endswith و replace رو توی خط‌های تولیدِ چندمرحله‌ای ترکیب کن.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Time to turn your string toolbox into a **workshop**. The search crew: .find(\"x\") returns the POSITION of the first match (or -1 if missing), .count(\"x\") counts how many times it appears, and .startswith() / .endswith() answer True or False — perfect for checking filenames, log lines and hashtags.",
                  fa: "وقتشه جعبه‌ابزار رشته‌ات رو تبدیل به یه **کارگاه** واقعی کنی. تیم جست‌وجو:‏ find(\"x\") جای اولین تطبیق رو برمی‌گردونه (اگه پیدا نکنه ‎-1)،‏ count(\"x\") می‌شماره چند بار اومده، و startswith و endswith جواب True یا False می‌دن — عالی برای چک کردن اسم فایل، خط‌های گزارش و هشتگ.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `log = "INFO boot ok"
print(log.startswith("INFO"))
print(log.find("boot"))
print(log.count("o"))
print("report.pdf".endswith(".pdf"))`,
                  caption: { en: "True, 5, 4, True — four questions, four instant answers.", fa: "‏True و ۵ و ۴ و True — چهار تا سؤال، چهار تا جواب فوری." },
                },
                {
                  type: "tip",
                  en: "find() returns -1 when the text is missing — that's the standard signal for \"if pos == -1: it's not there\".",
                  fa: "‏find() وقتی متن پیدا نشه ‎-1 برمی‌گردونه — این همون علامت استانداردِ «اگه pos == ‎-1 بود، یعنی نیست» ــه.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "replace() and the art of chaining", fa: "‏replace و هنر زنجیر کردن" },
              blocks: [
                {
                  type: "text",
                  en: ".replace(old, new) returns a NEW string where every old became new — the original never changes. And since it hands you back a string, you can keep going: method chained after method, reading left to right like a pipeline.",
                  fa: "‏replace(old, new) یه رشتهٔ جدید برمی‌گردونه که توش هر old شده new — اصلِ رشته دست‌نخورده می‌مونه. و چون خروجی‌ش دوباره رشته‌ست، می‌تونی ادامه بدی: متد پشت متد، مثل یه خط تولید از چپ به راست.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `line = "ERROR: disk ERROR again"
fixed = line.replace("ERROR", "OK")
print(fixed)
print(line)

chain = "  hi  ".replace(" ", "*").replace("*", "_")
print(chain)`,
                  caption: { en: "OK: disk OK again — and the original line, untouched.", fa: "‏OK: disk OK again — و خط اصلی، دست‌نخورده." },
                },
                {
                  type: "warn",
                  en: "replace() swaps EVERY occurrence — replace(\"a\", \"\") deletes all of them. Make sure \"every\" is really what you want.",
                  fa: "‏replace همهٔ موارد رو عوض می‌کنه —‏ replace(\"a\", \"\") همهٔ aها رو پاک می‌کنه. مطمئن شو «همه» واقعاً همونیه که می‌خوای.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does \"banana\".count(\"an\") return?", fa: "خروجی \"banana\".count(\"an\") چیه؟" },
                  options: [
                    { en: "1", fa: "۱" },
                    { en: "2", fa: "۲" },
                    { en: "3", fa: "۳" },
                    { en: "0", fa: "۰" },
                  ],
                  answer: 1,
                  explain: { en: "\"an\" sits at positions 1 and 3 — two matches.", fa: "‏\"an\" توی جایگاه‌های ۱ و ۳ نشسته — دو تا تطبیق." },
                },
                {
                  q: { en: "\"hello\".find(\"z\") returns…", fa: "‏\"hello\".find(\"z\") چه برمی‌گردونه…" },
                  options: [
                    { en: "0", fa: "۰" },
                    { en: "-1", fa: "‎-1" },
                    { en: "\"z\"", fa: "‏\"z\"" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "Missing text means -1 — no crash, just a polite \"not found\".", fa: "متنِ نبود یعنی ‎-1 — نه کرش، فقط یه «پیدا نشد» مؤدبانه." },
                },
                {
                  q: { en: "What does \"a-b-c\".replace(\"-\", \"+\") return?", fa: "خروجی \"a-b-c\".replace(\"-\", \"+\") چیه؟" },
                  options: [
                    { en: "a+b+c", fa: "‏a+b+c" },
                    { en: "a-b-c", fa: "‏a-b-c" },
                    { en: "abc", fa: "‏abc" },
                    { en: "a+-b+-c", fa: "‏a+-b+-c" },
                  ],
                  answer: 0,
                  explain: { en: "Every dash became a plus — replace hits all occurrences.", fa: "هر خط تیره شده به‌علاوه — replace سراغ همهٔ موارد می‌ره." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Log Scanner", fa: "اسکنر گزارش" },
              brief: {
                en: "Read one log line and print exactly:\nStarts with ERROR: {True/False}\nPosition: {find(\"ERROR\")}\nINFO count: {count(\"INFO\")}\nCleaned: {replace(\"ERROR\" → \"OK\")}",
                fa: "یه خط گزارش رو بخون و دقیقاً چاپ کن:\nStarts with ERROR: {True/False}\nPosition: {find(\"ERROR\")}\nINFO count: {count(\"INFO\")}\nCleaned: {جایگزینی ERROR با OK}",
              },
              starter: `line = input()

# 1. starts = line.startswith("ERROR")
# 2. pos = line.find("ERROR")
# 3. n = line.count("INFO")
# 4. clean = line.replace("ERROR", "OK")
# 5. print each with an f-string (put the values in variables first!)
`,
              solution: `line = input()

starts = line.startswith("ERROR")
pos = line.find("ERROR")
info_count = line.count("INFO")
clean = line.replace("ERROR", "OK")

print(f"Starts with ERROR: {starts}")
print(f"Position: {pos}")
print(f"INFO count: {info_count}")
print(f"Cleaned: {clean}")`,
              hints: [
                {
                  en: "Each result goes into its own variable first — startswith, find, count, replace — then four prints.",
                  fa: "هر نتیجه اول میره توی یه متغیر جدا — startswith و find و count و replace — بعد چهار تا print.",
                },
                {
                  en: "find(\"ERROR\") on \"INFO user login\" gives -1 — that's the expected Position line, not an error.",
                  fa: "‏find(\"ERROR\") روی \"INFO user login\" عدد ‎-1 می‌ده — این همون خط Position ــه، خطا نیست.",
                },
                {
                  en: "For \"INFO x ERROR y INFO z\" the INFO count is 2 and the Cleaned line still keeps the INFOs — only ERROR becomes OK.",
                  fa: "برای \"INFO x ERROR y INFO z\" شمارش INFO می‌شه ۲ و خط Cleaned هنوز INFOها رو داره — فقط ERROR می‌شه OK.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "ERROR boot failed", expect: "Starts with ERROR: True\nPosition: 0\nINFO count: 0\nCleaned: OK boot failed" },
                  { stdin: "INFO user login", expect: "Starts with ERROR: False\nPosition: -1\nINFO count: 1\nCleaned: INFO user login", hidden: true },
                  { stdin: "INFO x ERROR y INFO z", expect: "Starts with ERROR: False\nPosition: 7\nINFO count: 2\nCleaned: INFO x OK y INFO z", hidden: true },
                ],
              },
              sample: { stdin: "ERROR boot failed", expect: "Starts with ERROR: True\nPosition: 0\nINFO count: 0\nCleaned: OK boot failed" },
            },
          ],
        },
        {
          id: "py-m9-l2",
          title: { en: "Clean That Text", fa: "متن رو تمیز کن" },
          goal: {
            en: "Build a cleaning pipeline with strip, lower, upper and title that tames any messy input.",
            fa: "یه خط تولیدِ تمیزکاری با strip و lower و upper و title بساز که هر ورودی شلوغی رو رام کنه.",
          },
          minutes: 11,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Real users type \"   YES   \" with hugs of whitespace and unpredictable CAPS. The cleaning kit: .strip() shaves whitespace off BOTH ends, .lower() standardizes everything for comparisons, and .title() / .capitalize() make text presentable.",
                  fa: "کاربرهای واقعی می‌زنن \"   YES   \" با کلی فاصله و حروف بزرگِ غیرقابل‌پیش‌بینی. جعبهٔ تمیزکاری:‏ strip() فاصله‌های دو طرف رو می‌تراشه،‏ lower() همه‌چیز رو برای مقایسه یکدست می‌کنه، و title و capitalize متن رو آمادهٔ نمایش می‌کنن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `messy = "   HeLLo TEKA   "
print(messy.strip())
print(messy.strip().lower())
print("sara mahmoudi".title())`,
                  caption: { en: "HeLLo TEKA → hello teka → Sara Mahmoudi. Chaos, domesticated.", fa: "‏HeLLo TEKA می‌شه hello teka و بعد Sara Mahmoudi. بی‌نظمی، اهلی‌شده." },
                },
                {
                  type: "tip",
                  en: "Compare lowercase COPIES, never the originals: if a.lower() == b.lower(): — now \"YES\" and \"yes\" finally agree.",
                  fa: "نسخه‌های کوچک‌شده رو مقایسه کن، نه اصل رو:‏ if a.lower() == b.lower(): — حالا \"YES\" و \"yes\" بالاخره با هم کنار میان.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The pipeline: one step per variable", fa: "خط تولید: هر مرحله یه متغیر" },
              blocks: [
                {
                  type: "text",
                  en: "Pros store each cleaning step in its own variable — raw → stripped → lowered — so every transformation is visible and debuggable. Strip FIRST, then measure: that way len() counts real content, not decoration.",
                  fa: "حرفه‌ای‌ها هر مرحلهٔ تمیزکاری رو توی یه متغیر جدا نگه می‌دارن — raw و بعد strip و بعد lower — تا هر تبدیل دیدنی و قابل‌دیباگ باشه. اول strip کن، بعد اندازه بگیر: این‌جوری len فقط محتوای واقعی رو می‌شماره، نه تزئینات رو.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `raw = "  PyThOn  "
step1 = raw.strip()
step2 = step1.lower()
print(f"Raw: {len(raw)} chars")
print(f"Clean: {step2} ({len(step2)} chars)")`,
                  caption: { en: "Raw: 9 chars, Clean: python (6 chars) — six characters of truth.", fa: "‏Raw: ۹ کاراکتر، ‏Clean: python با ۶ کاراکتر — شش کاراکتر حقیقت خالص." },
                },
                {
                  type: "warn",
                  en: "strip() only touches the ENDS. Spaces in the middle need replace: \"a b\".replace(\" \", \"\") → \"ab\".",
                  fa: "‏strip فقط دو طرف رو دست می‌زنه. فاصله‌های وسط با replace حل می‌شن:‏ \"a b\".replace(\" \", \"\") می‌شه \"ab\".",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does \"  Hi  \".strip() return?", fa: "خروجی \"  Hi  \".strip() چیه؟" },
                  options: [
                    { en: "\"Hi\"", fa: "‏\"Hi\"" },
                    { en: "\"  Hi  \"", fa: "‏\"  Hi  \"" },
                    { en: "\"hi\"", fa: "‏\"hi\"" },
                    { en: "\"Hi  \"", fa: "‏\"Hi  \"" },
                  ],
                  answer: 0,
                  explain: { en: "strip shaves whitespace from both ends and keeps the middle intact.", fa: "‏strip فاصله‌های دو طرف رو می‌تراشه و وسط رو دست نمی‌زنه." },
                },
                {
                  q: { en: "What is len(\"  go  \")?", fa: "‏len(\"  go  \") چند می‌شه؟" },
                  options: [
                    { en: "2", fa: "۲" },
                    { en: "4", fa: "۴" },
                    { en: "6", fa: "۶" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 2,
                  explain: { en: "len counts spaces too — 2 + 2 + 2 = 6. That's why you strip before measuring.", fa: "‏len فاصله‌ها رو هم می‌شماره — ۲ + ۲ + ۲ می‌شه ۶. برای همین قبل از اندازه‌گیری strip می‌کنیم." },
                },
                {
                  q: { en: "Why compare with a.lower() == b.lower()?", fa: "چرا با a.lower() == b.lower() مقایسه می‌کنیم؟" },
                  options: [
                    { en: "It runs faster", fa: "سریع‌تر اجرا می‌شه" },
                    { en: "So capitalization can't trick the comparison", fa: "که بزرگ‌ و کوچکی حروف نتونه مقایسه رو گول بزنه" },
                    { en: "lower() deletes the strings", fa: "‏lower رشته‌ها رو پاک می‌کنه" },
                    { en: "You shouldn't — always compare raw", fa: "نباید — همیشه خام مقایسه کن" },
                  ],
                  answer: 1,
                  explain: { en: "\"YES\" and \"yes\" are different strings but identical lowercase copies.", fa: "‏\"YES\" و \"yes\" دو رشتهٔ متفاوت‌ان ولی نسخهٔ lowercase‌شون یکی ــه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Comment Purifier", fa: "تصفیه‌کنندهٔ کامنت" },
              brief: {
                en: "Read one messy comment line and print exactly:\nClean: {strip + lower}\nTitle: {strip + title}\nShout: {strip + upper}\nTrimmed: {len(raw) - len(stripped)}\nTotal spaces: {raw.count(\" \")}",
                fa: "یه خط کامنتِ شلوغ رو بخون و دقیقاً چاپ کن:\nClean: ‏{strip + lower}\nTitle: ‏{strip + title}\nShout: ‏{strip + upper}\nTrimmed: ‏{تفاضل طول خام و تمیز}\nTotal spaces: ‏{شمارش فاصله‌ها در ورودی خام}",
              },
              starter: `raw = input()

# 1. text = raw.strip()
# 2. clean = text.lower()  /  fancy = text.title()  /  shout = text.upper()
# 3. trimmed = len(raw) - len(text)   (characters shaved off the ends)
# 4. spaces = raw.count(" ")
# 5. print the five report lines with f-strings
`,
              solution: `raw = input()

text = raw.strip()
clean = text.lower()
fancy = text.title()
shout = text.upper()
trimmed = len(raw) - len(text)
spaces = raw.count(" ")

print(f"Clean: {clean}")
print(f"Title: {fancy}")
print(f"Shout: {shout}")
print(f"Trimmed: {trimmed}")
print(f"Total spaces: {spaces}")`,
              hints: [
                {
                  en: "Five variables, five prints. strip() first — everything else builds on text, not raw.",
                  fa: "پنج تا متغیر، پنج تا print. اول strip — بقیه از text ساخته می‌شن، نه از raw.",
                },
                {
                  en: "Trimmed is just len(raw) - len(text) — for \"   HeLLo TEKA   \" that's 16 - 10 = 6.",
                  fa: "‏Trimmed همون len(raw) - len(text) ــه — برای \"   HeLLo TEKA   \" می‌شه ۱۶ − ۱۰ = ۶.",
                },
                {
                  en: "Total spaces counts ALL spaces — middle ones too. \"   HeLLo TEKA   \" has 3 + 1 + 3 = 7.",
                  fa: "‏Total spaces همهٔ فاصله‌ها رو می‌شماره — وسطی‌ها رو هم. \"   HeLLo TEKA   \" می‌شه ۳ + ۱ + ۳ = ۷.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "   HeLLo TEKA   ", expect: "Clean: hello teka\nTitle: Hello Teka\nShout: HELLO TEKA\nTrimmed: 6\nTotal spaces: 7" },
                  { stdin: "  PyThOn RoCkS ", expect: "Clean: python rocks\nTitle: Python Rocks\nShout: PYTHON ROCKS\nTrimmed: 3\nTotal spaces: 4", hidden: true },
                  { stdin: "NoSpaces", expect: "Clean: nospaces\nTitle: Nospaces\nShout: NOSPACES\nTrimmed: 0\nTotal spaces: 0", hidden: true },
                ],
              },
              sample: { stdin: "   HeLLo TEKA   ", expect: "Clean: hello teka\nTitle: Hello Teka\nShout: HELLO TEKA\nTrimmed: 6\nTotal spaces: 7" },
            },
          ],
        },
        {
          id: "py-m9-l3",
          title: { en: "Split It, Count It", fa: "بشکن، بشمار" },
          goal: {
            en: "Chop sentences with split() and count words with the dict-counter pattern.",
            fa: "جمله‌ها رو با split بشکن و کلمه‌ها رو با الگوی شمارندهٔ دیکشنری بشمار.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: ".split() is a woodchipper for text: with no argument it splits on runs of whitespace and hands you a LIST of words. With a separator like split(\",\") it cuts at every comma. len() on the result counts the pieces.",
                  fa: "‏split یه دستگاه چوب‌خردکن برای متنه: بدون آرگومان روی هر فاصله برش می‌زنه و یه لیست از کلمه‌ها تحویلت می‌ده. با جداکننده مثل split(\",\") سر هر کاما برش می‌زنه. ‏len روی نتیجه، تعداد تکه‌ها رو می‌ده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `sentence = "to be or not to be"
words = sentence.split()
print(words)
print(len(words))

tags = "code, tea, art".split(",")
print(tags)`,
                  caption: { en: "6 words — and look closely at the comma version: spaces survive.", fa: "۶ کلمه — و به نسخهٔ کامادار دقت کن: فاصله‌ها زنده می‌مونن." },
                },
                {
                  type: "tip",
                  en: "split(\",\") keeps the spaces after each comma: \" tea\". Either use split(\", \") with the space, or strip() each piece in a loop.",
                  fa: "‏split(\",\") فاصله‌های بعد از کاما رو نگه می‌داره:‏ \" tea\". یا از split(\", \") با فاصله استفاده کن، یا هر تکه رو توی حلقه strip کن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The dict counter pattern", fa: "الگوی شمارندهٔ دیکشنری" },
              blocks: [
                {
                  type: "text",
                  en: "The single most reused pattern in data work: counts[w] = counts.get(w, 0) + 1. get() reads the current score (0 if the word is new), you add one, store it back. After one loop, the dict IS your frequency table. Longest word? Compare len(w) against a champion string.",
                  fa: "پرکاربردترین الگوی دنیای داده:‏ counts[w] = counts.get(w, 0) + 1.‏ get امتیاز فعلی رو می‌خونه (برای کلمهٔ تازه صفر)، تو یکی اضافه می‌کنی و برمی‌گردونی. بعد از یه حلقه، دیکشنری خودِ جدول فراوانی‌ته. طولانی‌ترین کلمه؟‏ len هر کلمه رو با قهرمان فعلی مقایسه کن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `words = "go go stop go".split()
counts = {}
longest = ""
for w in words:
    counts[w] = counts.get(w, 0) + 1
    if len(w) > len(longest):
        longest = w
print(counts)
print(longest)`,
                  caption: { en: "{'go': 3, 'stop': 1} and stop — a full analysis in six lines.", fa: "{'go': 3, 'stop': 1} و stop — یه تحلیل کامل توی شش خط." },
                },
                {
                  type: "tip",
                  en: "Dicts keep insertion order, so counts lists words in first-seen order — handy for stable, readable reports.",
                  fa: "دیکشنری‌ها ترتیبِ درج رو نگه می‌دارن، پس counts کلمه‌ها رو به ترتیب اولین دیده‌شدن لیست می‌کنه — برای گزارش‌های خوانا و ثابت عالیه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What is len(\"a,b,c\".split(\",\"))?", fa: "‏len(\"a,b,c\".split(\",\")) چنده؟" },
                  options: [
                    { en: "3", fa: "۳" },
                    { en: "5", fa: "۵" },
                    { en: "1", fa: "۱" },
                    { en: "7", fa: "۷" },
                  ],
                  answer: 0,
                  explain: { en: "Splitting at commas gives [\"a\", \"b\", \"c\"] — three pieces.", fa: "بُرش سر کاماها می‌شه [\"a\", \"b\", \"c\"] — سه تا تکه." },
                },
                {
                  q: { en: "After counting [\"x\", \"y\", \"x\"], what is counts[\"x\"]?", fa: "بعد از شمردن [\"x\", \"y\", \"x\"] مقدار counts[\"x\"] چنده؟" },
                  options: [
                    { en: "0", fa: "۰" },
                    { en: "1", fa: "۱" },
                    { en: "2", fa: "۲" },
                    { en: "3", fa: "۳" },
                  ],
                  answer: 2,
                  explain: { en: "x was seen twice — get(w, 0) + 1 twice = 2.", fa: "‏x دو بار دیده شده — دوبار get(w, 0) + 1 می‌شه ۲." },
                },
                {
                  q: { en: "Why counts.get(w, 0) instead of counts[w]?", fa: "چرا counts.get(w, 0) و نه counts[w]؟" },
                  options: [
                    { en: "It's shorter", fa: "کوتاه‌تره" },
                    { en: "It returns 0 for a first-time word instead of crashing", fa: "برای کلمهٔ تازه ۰ برمی‌گردونه به‌جای کرش کردن" },
                    { en: "It sorts the dict", fa: "دیکشنری رو مرتب می‌کنه" },
                    { en: "It deletes missing keys", fa: "کلیدهای غایب رو پاک می‌کنه" },
                  ],
                  answer: 1,
                  explain: { en: "Reading a missing key crashes; get() with a default turns the first sighting into 0 + 1 = 1.", fa: "خوندن کلیدِ ناموجود کرش می‌کنه؛‏ get با مقدار پیش‌فرض اولین دیدار رو می‌کنه 0 + 1 = 1." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Word Frequency Probe", fa: "پروب فراوانی کلمات" },
              brief: {
                en: "Read one sentence and print exactly:\nWords: {count}\nLongest: {first longest word}\nUnique: {different words}\nFirst: {words[0]}",
                fa: "یه جمله بخون و دقیقاً چاپ کن:\nWords: ‏{تعداد کلمات}\nLongest: ‏{اولین کلمهٔ بلندترین}\nUnique: ‏{کلمه‌های متمایز}\nFirst: ‏{اولین کلمه}",
              },
              starter: `line = input()
words = line.split()

# counts = {}  — loop: counts[w] = counts.get(w, 0) + 1
# longest = "" — if len(w) > len(longest): longest = w
# then print Words / Longest / Unique / First
`,
              solution: `line = input()
words = line.split()

counts = {}
longest = ""
for w in words:
    counts[w] = counts.get(w, 0) + 1
    if len(w) > len(longest):
        longest = w

print(f"Words: {len(words)}")
print(f"Longest: {longest}")
print(f"Unique: {len(counts)}")
first = words[0]
print(f"First: {first}")`,
              hints: [
                {
                  en: "One loop can do both jobs: count into counts AND challenge longest. len(counts) is your Unique number.",
                  fa: "یه حلقه هر دو کار رو می‌کنه: هم شمردن توی counts و هم رقابت برای longest. عدد Unique همون len(counts) ــه.",
                },
                {
                  en: "The longest check uses strict > — on a tie the EARLIER word keeps the crown. \"kitten\" beats \"chased\" (both 6).",
                  fa: "شرط بلندترین با > سخت‌گیرانه‌ست — مساوی که شد، کلمهٔ قبلی تاج رو نگه می‌داره. \"kitten\" از \"chased\" جلو می‌زنه (هر دو ۶).",
                },
                {
                  en: "Pull words[0] into a variable before the First print — no fancy expressions needed.",
                  fa: "قبل از چاپ First، مقدار words[0] رو بریز توی یه متغیر — لازم نیست شلوغش کنی.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "the kitten chased the tiny mouse", expect: "Words: 6\nLongest: kitten\nUnique: 5\nFirst: the" },
                  { stdin: "cats love boxes and cats love naps", expect: "Words: 7\nLongest: boxes\nUnique: 5\nFirst: cats", hidden: true },
                  { stdin: "hello", expect: "Words: 1\nLongest: hello\nUnique: 1\nFirst: hello", hidden: true },
                ],
              },
              sample: { stdin: "the kitten chased the tiny mouse", expect: "Words: 6\nLongest: kitten\nUnique: 5\nFirst: the" },
            },
          ],
        },
        {
          id: "py-m9-l4",
          title: { en: "MINI-PROJECT: Text Analyzer", fa: "مینی‌پروژه: تحلیلگر متن" },
          goal: {
            en: "Ship a one-shot analyzer: word count, longest word, unique words and vowels for any sentence.",
            fa: "یه تحلیلگر تک‌ضرب تحویل بده: تعداد کلمه، بلندترین کلمه، کلمه‌های یکتا و صداها برای هر جمله‌ای.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Graduation time for the Lab: one program that reports on ANY sentence. The pipeline: split() → count with a dict → track the longest → report. Search engines, spam filters and chat analyzers all start exactly like this — words in, numbers out.",
                  fa: "وقتِ فارغ‌التحیلی از آزمایشگاهه: یه برنامه که دربارهٔ هر جمله‌ای گزارش می‌ده. خط تولید:‏ split و بعد شمردن با دیکشنری و بعد ردیابی بلندترین و در آخر گزارش. موتورهای جست‌وجو و فیلترهای اسپم و تحلیلگرهای چت همه دقیقاً از همین‌جا شروع می‌شن — کلمه داخل، عدد بیرون.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `sentence = "practice makes coding feel easy"
words = sentence.split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1

total = len(sentence)
pc = counts.get("practice", 0)
print(f"Words: {len(words)}")
print(f"Characters: {total}")
print(f"Unique: {len(counts)}")
print(f"practice count: {pc}")`,
                  caption: { en: "31 characters, 5 words, 5 unique — a report card for a sentence.", fa: "‏۳۱ کاراکتر، ۵ کلمه، ۵ یکتا — کارنامهٔ یه جمله." },
                },
                {
                  type: "tip",
                  en: "Plan the report lines FIRST, then build the code backwards from them. Every output line = one variable + one print.",
                  fa: "اول خط‌های گزارش رو طراحی کن، بعد کد رو از همون آخر به اول بساز. هر خط خروجی = یه متغیر + یه print.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Counting characters: vowels", fa: "شمارش کاراکترها: صداها" },
              blocks: [
                {
                  type: "text",
                  en: "Strings are loops of characters too: for ch in sentence: hands you one character at a time, and ch in \"aeiou\" is a membership check — True only for vowels. That's your Character-grade analysis, no list needed.",
                  fa: "رشته‌ها هم خودشون حلقه از کاراکترها هستن:‏ for ch in sentence هر بار یه کاراکتر دستت می‌ده، و ch in \"aeiou\" یه چک عضویته — فقط برای صداها True می‌شه. این تحلیلِ درجه‌کاراکترته، بدون لیست.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `vowels = 0
for ch in "rhythm":
    if ch in "aeiou":
        vowels += 1
print(vowels)`,
                  caption: { en: "0 — rhythm is all consonants. English is weird.", fa: "۰ — rhythm همه‌ش صامت ــه. انگلیسی عجیبه." },
                },
                {
                  type: "warn",
                  en: "In the challenge, pull every dict value and word into a variable BEFORE the f-string — no quotes allowed inside {holes}.",
                  fa: "توی چالش، هر مقدار دیکشنری و هر کلمه رو قبل از f-string بریز توی متغیر — توی {جای خالی‌ها} گیومه ممنوعه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "In `for ch in \"abc\":`, what is ch each round?", fa: "توی for ch in \"abc\" هر دور ch چیه؟" },
                  options: [
                    { en: "The whole string", fa: "کل رشته" },
                    { en: "One character at a time", fa: "هر بار یه کاراکتر" },
                    { en: "A number", fa: "یه عدد" },
                    { en: "A list", fa: "یه لیست" },
                  ],
                  answer: 1,
                  explain: { en: "Looping a string yields its characters one by one: \"a\", then \"b\", then \"c\".", fa: "حلقه روی رشته کاراکترها رو یکی‌یکی می‌ده: اول \"a\" بعد \"b\" بعد \"c\"." },
                },
                {
                  q: { en: "What does \"code\"[1] return?", fa: "خروجی \"code\"[1] چیه؟" },
                  options: [
                    { en: "\"c\"", fa: "‏\"c\"" },
                    { en: "\"o\"", fa: "‏\"o\"" },
                    { en: "\"code\"", fa: "‏\"code\"" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "Index 1 is the second character — \"o\". Strings index just like lists.", fa: "ایندکس ۱ کاراکتر دوم ــه —‏ \"o\". رشته‌ها مثل لیست ایندکس می‌خورن." },
                },
                {
                  q: { en: "Why does the vowel check use ch in \"aeiou\"?", fa: "چرا چک صداها از ch in \"aeiou\" استفاده می‌کنه؟" },
                  options: [
                    { en: "It's the fastest way to sort", fa: "سریع‌ترین راه مرتب‌کردنه" },
                    { en: "`in` checks membership — True only if ch is one of the five vowels", fa: "‏in عضویت رو چک می‌کنه — فقط وقتی ch یکی از پنج صدا باشه True می‌شه" },
                    { en: "It counts automatically", fa: "خودش می‌شماره" },
                    { en: "It converts ch to a number", fa: "‏ch رو به عدد تبدیل می‌کنه" },
                  ],
                  answer: 1,
                  explain: { en: "The in operator asks \"is ch inside this string?\" — a perfect per-character filter.", fa: "عملگر in می‌پرسه «ch داخل این رشته هست؟» — یه فیلتر عالی برای هر کاراکتر." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Text Analyzer 📊", fa: "تحلیلگر متن رو بساز 📊" },
              brief: {
                en: "Read one sentence and print exactly:\nSentence: {the sentence}\nWords: {count}\nLongest: {first longest word}\nUnique: {different words}\nVowels: {a/e/i/o/u count in the WHOLE sentence}",
                fa: "یه جمله بخون و دقیقاً چاپ کن:\nSentence: ‏{جمله}\nWords: ‏{تعداد کلمات}\nLongest: ‏{اولین کلمهٔ بلندترین}\nUnique: ‏{کلمه‌های متمایز}\nVowels: ‏{تعداد صداها در کل جمله}",
              },
              starter: `sentence = input()
words = sentence.split()

# 1. counts dict + longest word (one loop, like py-m9-l3)
# 2. vowels = 0 — loop over sentence, ch in "aeiou" -> vowels += 1
# 3. print the five report lines
`,
              solution: `sentence = input()
words = sentence.split()

counts = {}
longest = ""
for w in words:
    counts[w] = counts.get(w, 0) + 1
    if len(w) > len(longest):
        longest = w

vowels = 0
for ch in sentence:
    if ch in "aeiou":
        vowels += 1

print(f"Sentence: {sentence}")
print(f"Words: {len(words)}")
print(f"Longest: {longest}")
print(f"Unique: {len(counts)}")
print(f"Vowels: {vowels}")`,
              hints: [
                {
                  en: "Two independent loops: one over words (counts + longest), one over characters (vowels). Then five prints.",
                  fa: "دو تا حلقهٔ مستقل: یکی روی کلمه‌ها (counts و longest)، یکی روی کاراکترها (vowels). بعد پنج تا print.",
                },
                {
                  en: "Tie rule: strict > keeps the FIRST longest — \"python\" wins over \"really\" (both 6 letters).",
                  fa: "قانون مساوی:‏ > سخت‌گیرانه اولین بلندترین رو نگه می‌داره — \"python\" از \"really\" جلو می‌زنه (هر دو ۶ حرف).",
                },
                {
                  en: "Vowels count the WHOLE sentence including repeats: \"to be or not to be\" has 6.",
                  fa: "‏Vowels کل جمله رو با تکرارها می‌شماره: \"to be or not to be\" می‌شه ۶.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "python is really fun", expect: "Sentence: python is really fun\nWords: 4\nLongest: python\nUnique: 4\nVowels: 5" },
                  { stdin: "code every single day", expect: "Sentence: code every single day\nWords: 4\nLongest: single\nUnique: 4\nVowels: 7", hidden: true },
                  { stdin: "to be or not to be", expect: "Sentence: to be or not to be\nWords: 6\nLongest: not\nUnique: 4\nVowels: 6", hidden: true },
                ],
              },
              sample: { stdin: "python is really fun", expect: "Sentence: python is really fun\nWords: 4\nLongest: python\nUnique: 4\nVowels: 5" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m10",
      title: { en: "Dictionaries: The Label Machine", fa: "دیکشنری‌ها: ماشین برچسب‌ها" },
      blurb: {
        en: "One variable, many labels: store, find, update and loop over real-world records.",
        fa: "یه متغیر، چندین برچسب: رکوردهای دنیای واقعی رو ذخیره، پیدا، به‌روزرسانی و حلقه بزن.",
      },
      lessons: [
        {
          id: "py-m10-l1",
          title: { en: "Labeled Data", fa: "داده‌های برچسب‌دار" },
          goal: {
            en: "Create dictionaries, read any field by label, add new ones and update existing ones.",
            fa: "دیکشنری بساز، هر فیلد رو با برچسبش بخون، فیلد جدید اضافه کن و فیلد موجود رو به‌روز کن.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Lists know things by POSITION — player[0], player[1] — but that gets unreadable fast. A **dictionary** knows things by LABEL: profile[\"name\"], profile[\"score\"]. You build one with curly braces, label: value pairs, commas between.",
                  fa: "لیست‌ها چیزها رو با «جایگاه» می‌شناسن — player[0] و player[1] — ولی این روش سریع ناخوانا می‌شه. یه **دیکشنری** چیزها رو با «برچسب» می‌شناسه: profile[\"name\"] و profile[\"score\"]. با آکولاد می‌سازی: جفت‌های label: value که با کاما جدا می‌شن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `profile = {"name": "Sara", "score": 1250, "vip": True}
print(profile["name"])
print(profile["score"])
print(len(profile))`,
                  caption: { en: "len() on a dict counts the PAIRS — 3 labels, 3 values.", fa: "‏len روی دیکشنری تعداد جفت‌ها رو می‌شماره — ۳ برچسب، ۳ مقدار." },
                },
                {
                  type: "tip",
                  en: "Read it as a question: profile[\"score\"] asks \"what's the score?\" — the label goes in square brackets, and you get the value back.",
                  fa: "این‌جوری بخونش:‏ profile[\"score\"] می‌پرسه «امتیاز چنده؟» — برچسب داخل کروشه می‌ره و مقدار برمی‌گرده.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Add, update, crash?", fa: "اضافه کن، به‌روز کن، کرش؟" },
              blocks: [
                {
                  type: "text",
                  en: "One line does two jobs: profile[\"level\"] = 3 ADDS a new pair if the label is new, and profile[\"score\"] = 1400 UPDATES the value if the label already exists. Same syntax — the dict decides.",
                  fa: "یه خط، دو تا کار:‏ profile[\"level\"] = 3 اگه برچسب تازه باشه یه جفت جدید اضافه می‌کنه، و profile[\"score\"] = 1400 اگه برچسب از قبل باشه مقدار رو به‌روز می‌کنه. سینتکس یکی‌ست — خود دیکشنری تشخیص می‌ده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `profile = {"name": "Sara", "score": 1250}
profile["level"] = 3
profile["score"] = 1400
print(profile["level"])
print(profile["score"])
print(len(profile))`,
                  caption: { en: "Three pairs now — level joined, score grew, nothing else moved.", fa: "الان سه جفت داریم — level اضافه شد، score بزرگ شد، بقیه سر جاشون‌ان." },
                },
                {
                  type: "warn",
                  en: "Reading a MISSING label with [] crashes: KeyError. Adding and updating are safe — only [] reads of unknown labels explode. Next lesson: the safe way to read.",
                  fa: "خوندنِ برچسبِ ناموجود با [] کرش می‌کنه:‏ KeyError. اضافه‌کردن و به‌روزرسانی امن‌ان — فقط خوندن [] از برچسب ناشناخته منفجر می‌شه. درس بعد: راه امن خوندن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does profile[\"name\"] return?", fa: "‏profile[\"name\"] چی برمی‌گردونه؟" },
                  options: [
                    { en: "The position of \"name\"", fa: "جایگاه \"name\" رو" },
                    { en: "The value stored under the label \"name\"", fa: "مقداری که زیر برچسب \"name" + "\" ذخیره شده" },
                    { en: "A list of all labels", fa: "لیست همهٔ برچسب‌ها رو" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "Square brackets ask the dict for the value stored under that label.", fa: "کروشه از دیکشنری می‌پرسه زیر این برچسب چه مقداریه." },
                },
                {
                  q: { en: "profile[\"coins\"] = 5 — but \"coins\" doesn't exist yet. What happens?", fa: "‏profile[\"coins\"] = 5 — ولی \"coins" + "\" اصلاً وجود نداره. چی می‌شه؟" },
                  options: [
                    { en: "An error — you can't add to a dict", fa: "خطا — نمی‌شه به دیکشنری اضافه کرد" },
                    { en: "A new pair is added: coins → 5", fa: "یه جفت جدید اضافه می‌شه:‏ coins → 5" },
                    { en: "Nothing — the line is ignored", fa: "هیچی — خط نادیده گرفته می‌شه" },
                    { en: "The whole dict is deleted", fa: "کل دیکشنری پاک می‌شه" },
                  ],
                  answer: 1,
                  explain: { en: "Assigning to a brand-new label adds it. Assigning to an existing one updates it.", fa: "به برچسب تازه مقدار بدی، اضافه می‌شه. به برچسب موجود مقدار بدی، به‌روز می‌شه." },
                },
                {
                  q: { en: "What does len({\"a\": 1, \"b\": 2, \"c\": 3}) return?", fa: "‏len({\"a\": 1, \"b\": 2, \"c\": 3}) چنده؟" },
                  options: [
                    { en: "6", fa: "۶" },
                    { en: "3", fa: "۳" },
                    { en: "1", fa: "۱" },
                    { en: "0", fa: "۰" },
                  ],
                  answer: 1,
                  explain: { en: "len() counts pairs, not values — three labels means 3.", fa: "‏len جفت‌ها رو می‌شماره نه مقدارها — سه برچسب یعنی ۳." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Player Profile", fa: "پروفایل بازیکن" },
              brief: {
                en: "Build a player profile dict and print exactly:\nName: Sara\nScore: 1250\nLevel: 3   ← add this key\nScore now: 1400   ← update the score\nFields: 3   ← len() of the final dict",
                fa: "یه دیکشنری پروفایل بازیکن بساز و دقیقاً چاپ کن:\nName: Sara\nScore: 1250\nLevel: 3 ← این کلید اضافه بشه\nScore now: 1400 ← امتیاز به‌روز بشه\nFields: 3 ←‏ len دیکشنری نهایی",
              },
              starter: `# 1. profile = {"name": "Sara", "score": 1250}
# 2. print Name: and Score: (pull values into variables first)
# 3. add "level": 3 — then print Level:
# 4. update the score to 1400 — then print Score now:
# 5. print Fields: + len(profile)
`,
              solution: `profile = {"name": "Sara", "score": 1250}

name = profile["name"]
score = profile["score"]
print(f"Name: {name}")
print(f"Score: {score}")

profile["level"] = 3
level = profile["level"]
print(f"Level: {level}")

profile["score"] = 1400
score = profile["score"]
print(f"Score now: {score}")

print(f"Fields: {len(profile)}")`,
              hints: [
                {
                  en: "Start with the two-pair dict, print name and score from it — then grow the dict with profile[\"level\"] = 3.",
                  fa: "با دیکشنری دو جفتی شروع کن، اسم و امتیاز رو از خودش چاپ کن — بعد با profile[\"level\"] = 3 بزرگش کن.",
                },
                {
                  en: "Updating is the same syntax: profile[\"score\"] = 1400 overwrites the old 1250.",
                  fa: "به‌روزرسانی همون سینتکسه:‏ profile[\"score\"] = 1400 مقدار ۱۲۵۰ قبلی رو رونویسی می‌کنه.",
                },
                {
                  en: "Fields is just len(profile) — after adding level, it counts 3 pairs.",
                  fa: "‏Fields همون len(profile) ــه — بعد از اضافه‌شدن level، سه جفت می‌شماره.",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "Name: Sara\nScore: 1250\nLevel: 3\nScore now: 1400\nFields: 3" }],
              },
              sample: { expect: "Name: Sara\nScore: 1250\nLevel: 3\nScore now: 1400\nFields: 3" },
            },
          ],
        },
        {
          id: "py-m10-l2",
          title: { en: "Safe Reads: get() and in", fa: "خواندن امن:‏ get و in" },
          goal: {
            en: "Read missing keys without crashing using .get(), and branch on membership with `in`.",
            fa: "کلیدهای ناموجود رو بدون کرش با get بخون و با in روی «بود و نبود» تصمیم بگیر.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Crashing on a missing key is Python's way of saying \"you assumed too much\". The polite read is .get(label, fallback): it returns the value if the key exists — or your fallback if not. No crash, ever.",
                  fa: "کرش روی کلید ناموجود یعنی «زیاد فرض کردی». خوندن مؤدبانه‌ش get(label, fallback) ــه: اگه کلید باشه مقدار رو می‌ده، نباشه fallback تو رو می‌ده. بدون هیچ کرشی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `profile = {"name": "Sara", "score": 1250}
print(profile.get("name", "anon"))
print(profile.get("nickname", "anon"))
print(profile.get("hp", 0))`,
                  caption: { en: "Sara, then the fallbacks — missing keys now answer politely.", fa: "اول Sara بعد fallbackها — کلیدهای ناموجود حالا مؤدبانه جواب می‌دن." },
                },
                {
                  type: "tip",
                  en: "get() with 0 is the heartbeat of counters: scores[w] = scores.get(w, 0) + 1 — you already used it in m7 and m9!",
                  fa: "‏get با ۰ قلب شمارنده‌هاست:‏ scores[w] = scores.get(w, 0) + 1 — اینو تو ماژول ۷ و ۹ هم استفاده کردی!",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The membership check: `in`", fa: "چک عضویت:‏ in" },
              blocks: [
                {
                  type: "text",
                  en: "To DECIDE (not just read), ask membership: \"sara\" in sessions is True if the label exists. Combine with if/else: members take one path, strangers take the other. If you need the negative, wrap it: not (\"x\" in d).",
                  fa: "برای «تصمیم» (نه فقط خوندن) عضویت رو بپرس:‏ \"sara\" in sessions اگه برچسب وجود داشته باشه True می‌ده. با if و else ترکیبش کن: اعضا یه مسیر، غریبه‌ها مسیر دیگه. اگه منفی‌ش رو خواستی، پرانتز بذار:‏ not (\"x\" in d).",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `sessions = {"sara": 3, "kenji": 1}
user = "amir"
if user in sessions:
    sessions[user] = sessions[user] + 1
else:
    sessions[user] = 1
print(sessions[user])
print(sessions.get("amir", 0))`,
                  caption: { en: "amir was new → created with 1. The dict grew by one pair.", fa: "‏amir تازه بود → با ۱ ساخته شد. دیکشنری یه جفت بزرگ‌تر شد." },
                },
                {
                  type: "warn",
                  en: "in checks KEYS, not values: 3 in sessions is False even though some value equals 3. Keys are the address labels.",
                  fa: "‏in کلیدها رو چک می‌کنه نه مقدارها رو:‏ 3 in sessions ــه False، حتی اگه یکی از مقدارها ۳ باشه. کلیدها همون برچسب آدرس‌ان.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "sessions = {\"sara\": 3}. What does sessions.get(\"amir\", 0) return?", fa: "‏sessions = {\"sara\": 3}. خروجی sessions.get(\"amir\", 0) چیه؟" },
                  options: [
                    { en: "0 — the fallback, no crash", fa: "۰ — همون fallback، بدون کرش" },
                    { en: "An error", fa: "یه خطا" },
                    { en: "3", fa: "۳" },
                    { en: "\"amir\"", fa: "‏\"amir\"" },
                  ],
                  answer: 0,
                  explain: { en: "amir is missing, so get() hands back the fallback you provided: 0.", fa: "‏amir نیست، پس get همون fallback تو رو برمی‌گردونه: ۰." },
                },
                {
                  q: { en: "What is \"kenji\" in {\"sara\": 3, \"kenji\": 1}?", fa: "خروجی \"kenji\" in {\"sara\": 3, \"kenji\": 1} چیه؟" },
                  options: [
                    { en: "True — it's a key", fa: "True — کلیده دیگه" },
                    { en: "False", fa: "False" },
                    { en: "1", fa: "۱" },
                    { en: "\"kenji\"", fa: "‏\"kenji\"" },
                  ],
                  answer: 0,
                  explain: { en: "in answers one question: is this string one of the dict's KEYS? Yes → True.", fa: "‏in فقط یه سؤال جواب می‌ده: این رشته جزو کلیدهای دیکشنری هست؟ بله → True." },
                },
                {
                  q: { en: "Which line CRASHES when \"hp\" is missing?", fa: "کدوم خط وقتی \"hp" + "\" نباشه کرش می‌کنه؟" },
                  options: [
                    { en: "d.get(\"hp\", 0)", fa: "‏d.get(\"hp\", 0)" },
                    { en: "d[\"hp\"]", fa: "‏d[\"hp\"]" },
                    { en: "\"hp\" in d", fa: "‏\"hp\" in d" },
                    { en: "len(d)", fa: "‏len(d)" },
                  ],
                  answer: 1,
                  explain: { en: "[] on a missing key raises KeyError; get(), in and len() are all crash-proof.", fa: "کروشه روی کلید ناموجود ‌KeyError می‌ده؛‏ get و in و len همه بی‌خطرن." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Session Checker", fa: "چکرِ نشست‌ها" },
              brief: {
                en: "You manage a sessions dict {\"sara\": 3, \"kenji\": 1} (label → visit count). Read a username. Returning user → add 1 visit and print:\nWelcome back, {user}! Visits: {n}\nNew user → create them with 1 visit and print:\nNew account: {user} (visit 1)",
                fa: "مدیر یه دیکشنری نشستی:‏ {\"sara\": 3, \"kenji\": 1} (برچسب → تعداد بازدید). یه نام‌کاربری بخون. کاربر قدیمی → یه بازدید اضافه کن و چاپ کن:\nWelcome back, {user}! Visits: {n}\nکاربر جدید → با یه بازدید بسازش و چاپ کن:\nNew account: {user} (visit 1)",
              },
              starter: `sessions = {"sara": 3, "kenji": 1}
user = input()

# 1. if user in sessions: -> visits = sessions[user] + 1, store it back
# 2. else: -> create sessions[user] = 1
# 3. print the right line for each case (values into variables first!)
`,
              solution: `sessions = {"sara": 3, "kenji": 1}
user = input()

if user in sessions:
    visits = sessions[user] + 1
    sessions[user] = visits
    print(f"Welcome back, {user}! Visits: {visits}")
else:
    sessions[user] = 1
    print(f"New account: {user} (visit 1)")`,
              hints: [
                {
                  en: "Branch on membership first: if user in sessions: … else: … — two worlds, two prints.",
                  fa: "اول روی عضویت شاخه بزن:‏ if user in sessions و else — دو دنیا، دو تا print.",
                },
                {
                  en: "Returning user: visits = sessions[user] + 1, then sessions[user] = visits stores the new count.",
                  fa: "کاربر قدیمی:‏ visits = sessions[user] + 1، بعد sessions[user] = visits شمارندهٔ جدید رو ذخیره می‌کنه.",
                },
                {
                  en: "New user needs no math — sessions[user] = 1 then the New account line. Mind the (visit 1) wording!",
                  fa: "کاربر جدید حساب‌کتاب نمی‌خواد —‏ sessions[user] = 1 و بعد خط New account. به متن ‎(visit 1)‏ دقت کن!",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "sara", expect: "Welcome back, sara! Visits: 4" },
                  { stdin: "kenji", expect: "Welcome back, kenji! Visits: 2", hidden: true },
                  { stdin: "amir", expect: "New account: amir (visit 1)", hidden: true },
                ],
              },
              sample: { stdin: "sara", expect: "Welcome back, sara! Visits: 4" },
            },
          ],
        },
        {
          id: "py-m10-l3",
          title: { en: "Looping the Pairs", fa: "حلقه روی جفت‌ها" },
          goal: {
            en: "Walk a dict three ways — keys, values, items — and compute totals and champions from it.",
            fa: "دیکتش رو سه‌جور بگرد — کلیدها، مقدارها، جفت‌ها — و ازش جمعِ کل و قهرمان حساب کن.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A dict is a wall of labeled drawers, and loops open every one. Three doors: for k in d walks the LABELS, d.values() walks the numbers, and d.items() walks both at once — each step hands you a two-slot list p where p[0] is the key and p[1] is the value.",
                  fa: "دیکشنری یه دیوار از کشوهای برچسب‌داره و حلقه‌ها همه رو باز می‌کنن. سه تا در:‏ for k in d روی برچسب‌ها راه می‌ره،‏ d.values() روی اعداد، و d.items() هر دو رو باهم — هر قدم یه لیست دوتایی p دستت می‌ده که p[0] کلیده و p[1] مقدار.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `stock = {"pens": 42, "books": 7, "bags": 15}
for k in stock:
    print(k)
for p in stock.items():
    name = p[0]
    qty = p[1]
    print(f"{name} -> {qty}")`,
                  caption: { en: "The labels first, then the pairs — same dict, two tours.", fa: "اول برچسب‌ها بعد جفت‌ها — همون دیکشنری، دو تا گشت‌گذار." },
                },
                {
                  type: "tip",
                  en: "Why p[0] / p[1] instead of for k, v in …? Unpacking two names at once is beyond our little interpreter — pulling the pair into named variables is clearer anyway.",
                  fa: "چرا p[0] و p[1] و نه for k, v in…؟ باز کردن دو اسم باهم از توان interpreter کوچیک ما خارجه — جدا کردن توی متغیرهای اسم‌دار به‌هرحال خواناتره.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Totals and champions", fa: "جمع کل و قهرمان‌ها" },
              blocks: [
                {
                  type: "text",
                  en: "Two classic walks: an ACCUMULATOR adds every value (total = 0, then total += qty), and a CHAMPION keeps the best (if qty > best_qty: remember both key and value). Compare NUMBERS only — our interpreter can't order strings with <.",
                  fa: "دو تا گشت‌گذار کلاسیک:‏ «انباشتگر» همهٔ مقدارها رو جمع می‌کنه (total = 0 و بعد total += qty) و «قهرمان» بهترین رو نگه می‌داره (اگه qty > best_qty بود، هم کلید هم مقدار رو یادش می‌مونه). فقط عدد مقایسه کن — interpreter ما رشته‌ها رو با < مرتب نمی‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `stock = {"pens": 42, "books": 7, "bags": 15}
total = 0
top_name = ""
top_qty = 0
for p in stock.items():
    name = p[0]
    qty = p[1]
    total += qty
    if qty > top_qty:
        top_qty = qty
        top_name = name
print(total)
print(top_name)`,
                  caption: { en: "64 in total, pens on top — one loop, two results.", fa: "مجموعاً ۶۴ و pens صدرنشین — یه حلقه، دو تا نتیجه." },
                },
                {
                  type: "warn",
                  en: "Start top_qty at 0, never at a made-up number — and update BOTH top_name and top_qty inside the same if, or they'll disagree.",
                  fa: "‏top_qty رو از ۰ شروع کن، نه از یه عدد از خود درآورده — و top_name و top_qty رو داخل همون if باهم به‌روز کن، وگرنه از هم جدا می‌شن.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does `for k in stock:` walk through?", fa: "‏for k in stock روی چی راه می‌ره؟" },
                  options: [
                    { en: "The keys (labels)", fa: "کلیدها (برچسب‌ها)" },
                    { en: "The values", fa: "مقدارها" },
                    { en: "Key and value together", fa: "کلید و مقدار باهم" },
                    { en: "Nothing — dicts can't loop", fa: "هیچی — دیکشنری حلقه نمی‌خوره" },
                  ],
                  answer: 0,
                  explain: { en: "Looping a dict directly yields its keys — reach values with stock[k].", fa: "حلقهٔ مستقیم روی دیکشنری کلیدها رو می‌ده — برای مقدارها stock[k] رو صدا کن." },
                },
                {
                  q: { en: "In d.items(), what is p[1] on each step?", fa: "توی d.items() هر قدم p[1] چیه؟" },
                  options: [
                    { en: "The key", fa: "کلید" },
                    { en: "The value", fa: "مقدار" },
                    { en: "The whole dict", fa: "کل دیکشنری" },
                    { en: "An index number", fa: "یه شمارهٔ ایندکس" },
                  ],
                  answer: 1,
                  explain: { en: "Each item is a two-slot list: p[0] = key, p[1] = value.", fa: "هر آیتم یه لیست دوتایی‌ست:‏ p[0] کلید و p[1] مقدار." },
                },
                {
                  q: { en: 'Why compare with qty > top_qty (numbers) and never name > top_name (strings)?', fa: "چرا با qty > top_qty مقایسه می‌کنیم (عدد) و هیچ‌وقت name > top_name (رشته) نه؟" },
                  options: [
                    { en: "Strings are too short", fa: "رشته‌ها خیلی کوتاه‌ان" },
                    { en: "Our interpreter only orders numbers with < and >", fa: "interpreter ما فقط عدد‌ها رو با < و > مرتب می‌کنه" },
                    { en: "String comparison is illegal Python", fa: "مقایسهٔ رشته توی پایتون غیرقانونیه" },
                    { en: "Names never repeat", fa: "اسم‌ها تکرار نمی‌شن" },
                  ],
                  answer: 1,
                  explain: { en: "For text, compare len(w) > len(best) — numbers again. The champion pattern always races numbers.", fa: "برای متن از len(w) > len(best) استفاده کن — بازم عدد. الگوی قهرمان همیشه با عدد مسابقه می‌ده." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Inventory Report", fa: "گزارش انبار" },
              brief: {
                en: "stock = {\"pens\": 42, \"books\": 7, \"bags\": 15}. Print exactly:\npens: 42\nbooks: 7\nbags: 15\nTotal: 64\nTop: pens (42)\n(one loop for the three lines + total, then the champion line)",
                fa: "‏stock = {\"pens\": 42, \"books\": 7, \"bags\": 15}. دقیقاً چاپ کن:\npens: 42\nbooks: 7\nbags: 15\nTotal: 64\nTop: pens (42)\n(یه حلقه برای سه خط و جمع کل، بعد خط قهرمان)",
              },
              starter: `stock = {"pens": 42, "books": 7, "bags": 15}

# 1. one loop over stock.items(): print "name: qty" lines AND add to total
# 2. track the champion: if qty > top_qty -> remember name and qty
# 3. print Total: and Top: (values into variables first!)
`,
              solution: `stock = {"pens": 42, "books": 7, "bags": 15}

total = 0
top_name = ""
top_qty = 0
for p in stock.items():
    name = p[0]
    qty = p[1]
    print(f"{name}: {qty}")
    total += qty
    if qty > top_qty:
        top_qty = qty
        top_name = name

print(f"Total: {total}")
print(f"Top: {top_name} ({top_qty})")`,
              hints: [
                {
                  en: "All five lines share ONE loop over items: print each pair, grow total, race the champion. Only Total and Top print after the loop.",
                  fa: "هر پنج خط از یه حلقه روی items می‌آن: هر جفت رو چاپ کن، total رو بزرگ کن، قهرمان رو مسابقه بده. فقط Total و Top بعد از حلقه چاپ می‌شن.",
                },
                {
                  en: "The three item lines have no label in front — just f\"{name}: {qty}\". Total and Top add their own words.",
                  fa: "سه خط آیتم‌ها برچسب اولشون نداره — فقط f\"{name}: {qty}\".‏ Total و Top کلمات خودشون رو اضافه می‌کنن.",
                },
                {
                  en: "pens wins with 42 — strict > keeps it. Watch the Top format: Top: pens (42).",
                  fa: "‏pens با ۴۲ قهرمان می‌شه —‏ > سخت‌گیر نگهش می‌داره. به فرمت Top دقت کن: Top: pens (42).",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "pens: 42\nbooks: 7\nbags: 15\nTotal: 64\nTop: pens (42)" }],
              },
              sample: { expect: "pens: 42\nbooks: 7\nbags: 15\nTotal: 64\nTop: pens (42)" },
            },
          ],
        },
        {
          id: "py-m10-l4",
          title: { en: "MINI-PROJECT: The Scoreboard", fa: "مینی‌پروژه: تابلوی امتیازها" },
          goal: {
            en: "Merge two parallel lists into a dict, then report the best player and the average.",
            fa: "دو تا لیست موازی رو توی یه دیکشنری ادغام کن و بعد بهترین بازیکن و میانگین رو گزارش بده.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Real data often arrives as parallel lists: players[0] scored points[0], players[1] scored points[1]. The merge: for i in range(len(players)): — i visits 0, 1, 2… and scores[players[i]] = points[i] staples each name to its score.",
                  fa: "داده‌های واقعی معمولاً به شکل لیست‌های موازی می‌رسن:‏ players[0] امتیاز points[0] رو گرفته و players[1] امتیاز points[1] رو. ادغامش:‏ for i in range(len(players)) — ‏i می‌ره سراغ ۰ و ۱ و ۲ و… و scores[players[i]] = points[i] هر اسم رو به امتیازش منگنه می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `players = ["ana", "raj", "kim"]
points = [10, 20, 14]
scores = {}
for i in range(len(players)):
    name = players[i]
    pt = points[i]
    scores[name] = pt
print(scores)
print(len(scores))`,
                  caption: { en: "{'ana': 10, 'raj': 20, 'kim': 14} — two lists, one labeled table.", fa: "{'ana': 10, 'raj': 20, 'kim': 14} — دو تا لیست، یه جدول برچسب‌دار." },
                },
                {
                  type: "tip",
                  en: "range(len(players)) produces the INDEX numbers 0…2 — the glue between two lists that only agree by position.",
                  fa: "‏range(len(players)) شماره‌های ایندکس ۰ تا ۲ رو تولید می‌کنه — همین چسبیه بین دو لیستی که فقط از نظر جایگاه هم‌خوان‌ان.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The report plan", fa: "نقشهٔ گزارش" },
              blocks: [
                {
                  type: "text",
                  en: "Report like a pro: plan the output lines FIRST, then build backwards. Count = len(scores). Best = the champion walk from last lesson (strict > keeps the FIRST player on ties). Average = total / count — round(x, 1) keeps it tidy.",
                  fa: "مثل حرفه‌ای‌ها گزارش بده: اول خط‌های خروجی رو طراحی کن، بعد از آخر به اول بسازشون. تعداد = ‏len(scores). بهترین = همون گشت‌گذار قهرمان درس قبل (‏> سخت‌گیر روی مساوی اولین نفر رو نگه می‌داره). میانگین = total / count — و round(x, 1) مرتبش می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `scores = {"ana": 10, "raj": 20, "kim": 14}
total = 0
best = ""
best_pt = 0
for p in scores.items():
    name = p[0]
    pt = p[1]
    total += pt
    if pt > best_pt:
        best_pt = pt
        best = name
avg = round(total / len(scores), 1)
print(f"Best: {best} ({best_pt})")
print(f"Average: {avg}")`,
                  caption: { en: "Best: raj (20), Average: 14.7 — a real report in ten lines.", fa: "‏Best: raj (20) و Average: 14.7 — یه گزارش واقعی توی ده خط." },
                },
                {
                  type: "warn",
                  en: "Pull every dict value into a variable BEFORE an f-string — no brackets-in-holes gymnastics, just calm named variables.",
                  fa: "هر مقدار دیکشنری رو قبل از f-string بریز توی متغیر — شیرین‌کاریِ کروشه‌توی‌آکولاد ممنوع، فقط متغیرهای آروم و اسم‌دار.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does range(len([\"a\", \"b\", \"c\"])) produce?", fa: "‏range(len([\"a\", \"b\", \"c\"])) چی تولید می‌کنه؟" },
                  options: [
                    { en: "The letters a, b, c", fa: "حرف‌های a و b و c" },
                    { en: "The numbers 0, 1, 2", fa: "اعداد ۰ و ۱ و ۲" },
                    { en: "The number 3", fa: "عدد ۳" },
                    { en: "An empty list", fa: "یه لیست خالی" },
                  ],
                  answer: 1,
                  explain: { en: "len is 3, so range(3) yields 0, 1, 2 — the positions you need to pair two lists.", fa: "‏len می‌شه ۳، پس range(3) می‌ده ۰ و ۱ و ۲ — همون جایگاه‌هایی که دو لیست رو جفت می‌کنه." },
                },
                {
                  q: { en: "After the merge, what is scores[\"raj\"]?", fa: "بعد از ادغام،‏ scores[\"raj\"] چنده؟" },
                  options: [
                    { en: "1 — his position", fa: "۱ — جایگاهش" },
                    { en: "20 — his points", fa: "۲۰ — امتیازش" },
                    { en: "\"raj\"", fa: "‏\"raj\"" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "The merge staples points[i] onto players[i] — raj sat at index 1 with 20 points.", fa: "ادغام points[i] رو به players[i] منگنه می‌کنه — raj توی ایندکس ۱ با ۲۰ امتیاز نشسته بود." },
                },
                {
                  q: { en: "Why start best_pt at 0 before the loop?", fa: "چرا best_pt رو قبل از حلقه ۰ می‌گیریم؟" },
                  options: [
                    { en: "So any real score beats it on the first visit", fa: "که هر امتیاز واقعی از دفعهٔ اول ازش رد بشه" },
                    { en: "Because 0 is the average", fa: "چون ۰ میانگینه" },
                    { en: "So the dict stays empty", fa: "که دیکشنری خالی بمونه" },
                    { en: "You must start at 999", fa: "باید از ۹۹۹ شروع کنی" },
                  ],
                  answer: 0,
                  explain: { en: "A champion starts with no crown — 0 loses to every real score, so the first player takes the lead.", fa: "قهرمان بدون تاج شروع می‌کنه — ۰ به هر امتیاز واقعی می‌بازه، پس اولین بازیکن پیش‌تازه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Scoreboard 🏆", fa: "تابلوی امتیازها رو بساز 🏆" },
              brief: {
                en: "players = [\"sara\", \"kenji\", \"amir\"], points = [18, 21, 15]. Merge them into a dict and print exactly:\nPlayers: 3\nBest: kenji (21)\nAverage: 18.0",
                fa: "‏players = [\"sara\", \"kenji\", \"amir\"] و points = [18, 21, 15]. اینا رو توی یه دیکشنری ادغام کن و دقیقاً چاپ کن:\nPlayers: 3\nBest: kenji (21)\nAverage: 18.0",
              },
              starter: `players = ["sara", "kenji", "amir"]
points = [18, 21, 15]

# 1. scores = {} — merge with: for i in range(len(players)):
# 2. count = len(scores)
# 3. champion walk -> best / best_pt
# 4. average = round(total / count, 1)
# 5. print Players / Best / Average
`,
              solution: `players = ["sara", "kenji", "amir"]
points = [18, 21, 15]

scores = {}
for i in range(len(players)):
    name = players[i]
    pt = points[i]
    scores[name] = pt

count = len(scores)

total = 0
best = ""
best_pt = 0
for p in scores.items():
    name = p[0]
    pt = p[1]
    total += pt
    if pt > best_pt:
        best_pt = pt
        best = name

average = round(total / count, 1)

print(f"Players: {count}")
print(f"Best: {best} ({best_pt})")
print(f"Average: {average}")`,
              hints: [
                {
                  en: "Two loops, two jobs: the merge loop fills scores with players[i] / points[i]; the report loop walks scores.items().",
                  fa: "دو تا حلقه، دو تا کار: حلقهٔ ادغام scores رو با players[i] و points[i] پر می‌کنه؛ حلقهٔ گزارش روی scores.items() راه می‌ره.",
                },
                {
                  en: "kenji wins at 21 — strict > on the first visit. Average is 54 divided by 3 → round it to 18.0.",
                  fa: "‏kenji با ۲۱ می‌بره —‏ > سخت‌گیر از دفعهٔ اول. میانگین ۵۴ تقسیم بر ۳ ــه → گردش کن به 18.0.",
                },
                {
                  en: "Average prints as 18.0 (with the .0) — that's round(x, 1) doing its float thing. Keep it!",
                  fa: "میانگین به شکل 18.0 چاپ می‌شه (با همون .0) — این کار round(x, 1) ــه. دست نزن!",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "Players: 3\nBest: kenji (21)\nAverage: 18.0" }],
              },
              sample: { expect: "Players: 3\nBest: kenji (21)\nAverage: 18.0" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m11",
      title: { en: "Strings Deep Dive: The Text Forge", fa: "کاوش عمیق رشته‌ها: کارگاه متن" },
      blurb: {
        en: "join, split, find, replace and character-level loops — forge raw text into polished output.",
        fa: "‏join و split و find و replace و حلقه‌های کاراکتری — متن خام رو به خروجی صیقل‌خورده آهنگری کن.",
      },
      lessons: [
        {
          id: "py-m11-l1",
          title: { en: "join & repeat: Building Text", fa: "‏join و تکرار: متن‌سازی" },
          goal: {
            en: "Glue lists back into strings with join and draw bars with string repetition.",
            fa: "لیست‌ها رو با join به رشته بچسبون و با تکرار رشته خط‌کشی بکش.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "split() cuts a string into a list — and join() is the reverse gear: \" | \".join(parts) glues a list of strings back together, with the separator between every piece. The separator is the string you call join ON; the list goes in the brackets.",
                  fa: "‏split رشته رو به لیست تبدیل می‌کنه — و join دندهٔ عقبشه:‏ \" | \".join(parts) یه لیست از رشته‌ها رو دوباره به هم می‌چسبونه، با جداکننده بین هر تکه. جداکننده همون رشته‌ایه که join روش صدا زده می‌شه؛ لیست هم توی پرانتز می‌ره.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `items = ["apples", "bread", "tea"]
print(", ".join(items))
print(" | ".join(items))
print("".join(items))`,
                  caption: { en: "Same list, three glues: comma-space, pipe-spaces, and no glue at all.", fa: "یه لیست، سه تا چسب: کاما-فاصله، پایپ-فاصله و اصلاً بدون چسب." },
                },
                {
                  type: "tip",
                  en: "join needs a list of STRINGS — a number in the list crashes it. Convert first with str(n) if you ever mix.",
                  fa: "‏join لیستِ رشته می‌خواد — یه عدد توی لیست کرشش می‌کنه. اگه مخلوط شد اول با str(n) تبدیل کن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The repeat trick: \"=\" * 10", fa: "ترفند تکرار:‏ \"=\" * 10" },
              blocks: [
                {
                  type: "text",
                  en: "Multiplying a string by a number repeats it: \"-\" * 5 is \"-----\". It's the quickest way to draw dividers, bars and boxes — and because the number can be a VARIABLE, your bars can match any length you compute.",
                  fa: "ضرب رشته در عدد تکرارش می‌کنه:‏ \"-\" * 5 می‌شه \"-----\". سریع‌ترین راه برای کشیدن جداکننده و نوار و کادره — و چون اون عدد می‌تونه متغیر باشه، نوارها می‌تونن به هر طولی که حساب کردی برسن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `line = "=" * 12
print(line)
print("MENU")
print(line)

basket = "apples, bread, tea"
parts = basket.split(", ")
picked = " | ".join(parts)
print(picked)
print("-" * len(picked))`,
                  caption: { en: "A ruled menu, and a bar that measured its own text. Bars that adapt!", fa: "یه منوی خط‌کشی‌شده و نوردی که اندازهٔ متن خودش رو گرفته. نوارهای تطبیقی!" },
                },
                {
                  type: "warn",
                  en: "Order matters: \"abc\" * 3 works (string first), 3 * \"abc\" works too — but \"abc\" * \"3\" (string times string) is an error. One side must be a real number.",
                  fa: "ترتیب مهمه:‏ \"abc\" * 3 کار می‌کنه (رشته اول)،‏ 3 * \"abc\" هم کار می‌کنه — ولی \"abc\" * \"3\" (رشته ضربدر رشته) خطاست. یه طرف باید عدد واقعی باشه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does \" \".join([\"a\", \"b\"]) return?", fa: "خروجی \" \".join([\"a\", \"b\"]) چیه؟" },
                  options: [
                    { en: "\"ab\"", fa: "‏\"ab\"" },
                    { en: "\"a b\"", fa: "‏\"a b\"" },
                    { en: "[\"a\", \"b\"]", fa: "‏[\"a\", \"b\"]" },
                    { en: "\"a  b\"", fa: "‏\"a  b\"" },
                  ],
                  answer: 1,
                  explain: { en: "The separator (one space) sits BETWEEN the pieces — not around them.", fa: "جداکننده (یه فاصله) «بین» تکه‌ها می‌شینه — نه دور و برشون." },
                },
                {
                  q: { en: "What is len(\"=\" * 6)?", fa: "‏len(\"=\" * 6) چنده؟" },
                  options: [
                    { en: "1", fa: "۱" },
                    { en: "6", fa: "۶" },
                    { en: "7", fa: "۷" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "\"=\" * 6 builds a 6-character string — len counts them all.", fa: "‏\"=\" * 6 یه رشتهٔ ۶ کاراکتری می‌سازه — len همه رو می‌شماره." },
                },
                {
                  q: { en: "Which expression draws a bar matching the length of title?", fa: "کدوم عبارت نوردی به اندازهٔ title می‌کشه؟" },
                  options: [
                    { en: "\"-\" * len(title)", fa: "‏\"-\" * len(title)" },
                    { en: "\"-\" + len(title)", fa: "‏\"-\" + len(title)" },
                    { en: "len(title) * \"-\" * len(title)", fa: "‏len(title) * \"-\" * len(title)" },
                    { en: "\"-\" * \"len(title)\"", fa: "‏\"-\" * \"len(title)\"" },
                  ],
                  answer: 0,
                  explain: { en: "String × number = repetition. len(title) is the number, \"-\" is the repeated string.", fa: "رشته ضربدر عدد = تکرار.‏ len(title) عدده و \"-\" رشتهٔ تکرارشونده." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Basket Formatter", fa: "قالب‌بندِ سبد خرید" },
              brief: {
                en: "Read one comma-separated line like \"apples, bread, tea\" and print exactly:\nPicked: apples | bread | tea\nCount: 3\n--------------------\n(the bar is \"-\" repeated len(Picked) times — 20 dashes for the sample!)",
                fa: "یه خط جداشده با کاما مثل \"apples, bread, tea" + "\" بخون و دقیقاً چاپ کن:\nPicked: apples | bread | tea\nCount: 3\n--------------------\n(خط آخر، \"-\" تکرارشده به اندازهٔ len(Picked) ــه — برای نمونه ۲۰ تا خط تیره!)",
              },
              starter: `raw = input()

# 1. parts = raw.split(", ")   <- separator WITH the space
# 2. picked = " | ".join(parts)
# 3. print Picked: and Count: (len of parts)
# 4. bar = "-" * len(picked) — print it
`,
              solution: `raw = input()

parts = raw.split(", ")
picked = " | ".join(parts)
count = len(parts)
bar = "-" * len(picked)

print(f"Picked: {picked}")
print(f"Count: {count}")
print(bar)`,
              hints: [
                {
                  en: "split(\", \") — comma AND space — keeps items clean. Then join with \" | \" for the Picked line.",
                  fa: "‏split(\", \") یعنی کاما «و» فاصله — آیتم‌ها رو تمیز نگه می‌داره. بعد با \" | \" برای خط Picked جمعشون کن.",
                },
                {
                  en: "Count is len(parts) — the number of pieces, not characters.",
                  fa: "‏Count همون len(parts) ــه — تعداد تکه‌ها، نه تعداد کاراکترها.",
                },
                {
                  en: "The bar repeats \"-\" exactly len(picked) times — for \"apples | bread | tea\" that's 20 dashes.",
                  fa: "نوار، \"-\" رو دقیقاً به اندازهٔ len(picked) تکرار می‌کنه — برای \"apples | bread | tea" + "\" می‌شه ۲۰ تا.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "apples, bread, tea", expect: "Picked: apples | bread | tea\nCount: 3\n--------------------" },
                  { stdin: "rice, eggs, milk, honey", expect: "Picked: rice | eggs | milk | honey\nCount: 4\n--------------------------", hidden: true },
                  { stdin: "olive oil, salt", expect: "Picked: olive oil | salt\nCount: 2\n----------------", hidden: true },
                ],
              },
              sample: { stdin: "apples, bread, tea", expect: "Picked: apples | bread | tea\nCount: 3\n--------------------" },
            },
          ],
        },
        {
          id: "py-m11-l2",
          title: { en: "Character Forensics", fa: "جرم‌یابی کاراکتری" },
          goal: {
            en: "Inspect a string character by character with for-loops, isdigit() and membership checks.",
            fa: "رشته رو کاراکتر به کاراکتر با حلقهٔ for و isdigit و چک عضویت زیر ذره‌بین ببر.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A string is a chain of characters, and for walks the whole chain: for ch in word: — ch becomes \"s\", then \"u\", then every letter in turn. Indexing works too: word[0] is the FIRST character (position 0, like lists).",
                  fa: "رشته یه زنجیره از کاراکترهاست و for کل زنجیره رو راه می‌ره:‏ for ch in word — ‏ch می‌شه \"s\" بعد \"u\" و بعد تک‌تک حرف‌ها. ایندکس هم کار می‌کنه:‏ word[0] اولین کاراکتره (جایگاه ۰، مثل لیست).",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `word = "s42"
print(word[0])
for ch in word:
    print(ch)`,
                  caption: { en: "First the head of the chain, then every link, one per line.", fa: "اول سرِ زنجیره، بعد تک‌تک حلقه‌ها، هر کدوم یه خط." },
                },
                {
                  type: "tip",
                  en: "ch.isdigit() asks one character: \"are you a digit 0-9?\" — True for \"4\", False for \"s\" and for \".\" too.",
                  fa: "‏ch.isdigit() از یه کاراکتر می‌پرسه: «تو عدد ۰ تا ۹ هستی؟» — برای \"4" + "\" می‌شه True و برای \"s" + "\" و حتی \".\" می‌شه False.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "One loop, many questions", fa: "یه حلقه، چند تا سؤال" },
              blocks: [
                {
                  type: "text",
                  en: "Character checks COMBINE inside one loop: count digits with ch.isdigit(), count vowels with ch in \"aeiou\" (membership!), and bump separate counters as you go. Two counters, one pass — that's forensics.",
                  fa: "چک‌های کاراکتری داخل یه حلقه ترکیب می‌شن: با ch.isdigit() عدد بشمار، با ch in \"aeiou" + "\" صدا بشمار (عضویت!)، و همون‌جا شمارنده‌های جدا رو بالا ببر. دو شمارنده، یه پاس — این می‌شه جرم‌یابی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `secret = "sunny42"
digits = 0
vowels = 0
for ch in secret:
    if ch.isdigit():
        digits += 1
    if ch in "aeiou":
        vowels += 1
print(digits)
print(vowels)`,
                  caption: { en: "2 digits (4, 2), 2 vowels (u, u) — the password just told on itself.", fa: "۲ عدد (۴ و ۲) و ۲ صدا (u و u) — رمز عبور خودش لو داد." },
                },
                {
                  type: "warn",
                  en: "isdigit() on a WHOLE string is strict: \"42\".isdigit() is True but \"4.2\".isdigit() is False — the dot ruins it. On single characters you're always safe.",
                  fa: "‏isdigit روی «کل» رشته سخت‌گیره:‏ \"42\".isdigit() می‌شه True ولی \"4.2\".isdigit() می‌شه False — اون نقطه خرابش می‌کنه. روی تک‌کاراکتر همیشه امنی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "In `for ch in \"hi\":`, what is ch in the first round?", fa: "توی for ch in \"hi" + "\" در دور اول ch چیه؟" },
                  options: [
                    { en: "\"h\"", fa: "‏\"h\"" },
                    { en: "\"i\"", fa: "‏\"i\"" },
                    { en: "\"hi\"", fa: "‏\"hi\"" },
                    { en: "0", fa: "۰" },
                  ],
                  answer: 0,
                  explain: { en: "Strings loop character by character, starting from position 0.", fa: "حلقهٔ رشته کاراکتر به کاراکتر می‌چرخه و از جایگاه ۰ شروع می‌شه." },
                },
                {
                  q: { en: "What is \"7\".isdigit()?", fa: "خروجی \"7\".isdigit() چیه؟" },
                  options: [
                    { en: "True — it's a digit character", fa: "True — کاراکتر عددیه" },
                    { en: "False — it's in quotes", fa: "False — توی گیومه‌ست" },
                    { en: "7", fa: "۷" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 0,
                  explain: { en: "Quotes make it a string, and isdigit checks the CONTENT: a digit → True.", fa: "گیومه‌ها ازش رشته می‌سازن و isdigit محتوا رو چک می‌کنه: عدد ــه → True." },
                },
                {
                  q: { en: "How do you count vowels in one pass?", fa: "چطور توی یه پاس صداها رو بشماری؟" },
                  options: [
                    { en: "if ch in \"aeiou\": vowels += 1", fa: "‏if ch in \"aeiou\": و بعد vowels += 1" },
                    { en: "vowels = len(word)", fa: "‏vowels = len(word)" },
                    { en: "word.count(\"vowels\")", fa: "‏word.count(\"vowels\")" },
                    { en: "vowels += ch", fa: "‏vowels += ch" },
                  ],
                  answer: 0,
                  explain: { en: "in is a membership test for strings — ch is a vowel exactly when it's inside \"aeiou\".", fa: "‏in تست عضویت برای رشته‌هاست — ‏ch دقیقاً وقتی صدا بود که داخل \"aeiou" + "\" باشه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Password Inspector", fa: "بازرس رمز عبور" },
              brief: {
                en: "Read a password (one lowercase word, maybe with digits) and print exactly:\nLength: {len}\nDigits: {digit characters}\nVowels: {a/e/i/o/u characters}\nStrong: {True if length >= 8 AND digits >= 2, else False}",
                fa: "یه رمز عبور بخون (یه کلمهٔ کوچک، شاید با عدد) و دقیقاً چاپ کن:\nLength: ‏{طول}\nDigits: ‏{کاراکترهای عددی}\nVowels: ‏{کاراکترهای صدا}\nStrong: ‏{True اگه طول ≥ ۸ و اعداد ≥ ۲، وگرنه False}",
              },
              starter: `word = input()

# 1. length = len(word)
# 2. digits / vowels counters — one loop, two ifs
# 3. strong = length >= 8 and digits >= 2
# 4. print the four report lines
`,
              solution: `word = input()

length = len(word)
digits = 0
vowels = 0
for ch in word:
    if ch.isdigit():
        digits += 1
    if ch in "aeiou":
        vowels += 1

strong = length >= 8 and digits >= 2

print(f"Length: {length}")
print(f"Digits: {digits}")
print(f"Vowels: {vowels}")
print(f"Strong: {strong}")`,
              hints: [
                {
                  en: "One loop over the characters, two independent ifs: ch.isdigit() feeds digits, ch in \"aeiou\" feeds vowels.",
                  fa: "یه حلقه روی کاراکترها، دو تا if مستقل:‏ ch.isdigit() تغذیه‌کنندهٔ digits ــه و ch in \"aeiou" + "\" تغذیه‌کنندهٔ vowels.",
                },
                {
                  en: "Strong needs BOTH conditions — the `and` keyword glues them: strong = length >= 8 and digits >= 2.",
                  fa: "‏Strong هر دو شرط رو می‌خواد — کلمهٔ and می‌چسبونتشون:‏ strong = length >= 8 and digits >= 2.",
                },
                {
                  en: "Booleans print as True / False directly — put the variable in the f-string hole, no extra work.",
                  fa: "بولی‌ها مستقیم به شکل True و False چاپ می‌شن — متغیر رو بذار توی آکولاد f-string، کار اضافه لازم نیست.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "sunny42day", expect: "Length: 10\nDigits: 2\nVowels: 2\nStrong: True" },
                  { stdin: "hi5", expect: "Length: 3\nDigits: 1\nVowels: 1\nStrong: False", hidden: true },
                  { stdin: "a1b2c3", expect: "Length: 6\nDigits: 3\nVowels: 1\nStrong: False", hidden: true },
                ],
              },
              sample: { stdin: "sunny42day", expect: "Length: 10\nDigits: 2\nVowels: 2\nStrong: True" },
            },
          ],
        },
        {
          id: "py-m11-l3",
          title: { en: "The Rewrite Machine: replace chains", fa: "ماشین بازنویس: زنجیرهٔ replace" },
          goal: {
            en: "Reshape text with chained replace() and lower() — and build real URL slugs.",
            fa: "متن رو با زنجیرهٔ replace و lower از نو شکل بده — و اسلاگ واقعی URL بساز.",
          },
          minutes: 12,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "replace(old, new) swaps EVERY old for new — and since it returns a fresh string, you can chain: text.lower().replace(\" \", \"_\"). Each link hands its result to the next, left to right. This is how filenames, usernames and hashtags get cleaned.",
                  fa: "‏replace(old, new) هر old رو به new تبدیل می‌کنه — و چون یه رشتهٔ تازه برمی‌گردونه، می‌تونی زنجیر کنی:‏ text.lower().replace(\" \", \"_\"). هر حلقه نتیجه‌ش رو به حلقهٔ بعدی می‌ده، از چپ به راست. اسم فایل‌ها و نام‌کاربری‌ها و هشتگ‌ها همین‌جوری تمیز می‌شن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `report = "REPORT Final.PDF"
clean = report.lower().replace(" ", "_")
print(clean)

loud = "HEY!!!"
calm = loud.replace("!", "")
print(calm)`,
                  caption: { en: "report_final.pdf and HEY — two machines, two shapes.", fa: "report_final.pdf و HEY — دو تا ماشین، دو تا فرم." },
                },
                {
                  type: "tip",
                  en: "replace() never edits the original — it FORGES a copy. Store the result: fixed = text.replace(...) or you forged it for nothing.",
                  fa: "‏replace اصلِ متن رو دست نمی‌زنه — یه کپی می‌کوبه. نتیجه رو ذخیره کن:‏ fixed = text.replace(...) وگرنه بیهوده کوبیدی.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Slugs: the URL nickname", fa: "اسلاگ: لقبِ URL" },
              blocks: [
                {
                  type: "text",
                  en: "Every blog post gets a slug: \"My Cool Post\" becomes my-cool-post — lowercase, spaces replaced with dashes. The recipe is exactly two links: .lower() then .replace(\" \", \"-\"). Then .count(\"-\") and len() audit the result.",
                  fa: "هر پست وبلاگی یه اسلاگ می‌گیره:‏ \"My Cool Post" + "\" می‌شه my-cool-post — حروف کوچیک، فاصله‌ها خط تیره. دستور پخت دقیقاً دو حلقه‌ست: اول lower بعد replace(\" \", \"-\"). بعد count(\"-\") و len نتیجه رو ممیزی می‌کنن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `title = "My Cool Post"
slug = title.lower().replace(" ", "-")
print(slug)
print(slug.count("-"))
print(len(slug))`,
                  caption: { en: "my-cool-post — 2 dashes, 12 characters. Audit passed.", fa: "my-cool-post — ۲ خط تیره و ۱۲ کاراکتر. ممیزی قبول." },
                },
                {
                  type: "warn",
                  en: "replace hits EVERY match — \"a-b-c\".replace(\"-\", \"\") leaves \"abc\" with zero dashes. If you need to keep the first, replace is the wrong tool (find() + gluing is the right one — but that's advanced!).",
                  fa: "‏replace سراغ همهٔ موارد می‌ره —‏ \"a-b-c\".replace(\"-\", \"\") می‌ذاره \"abc" + "\" با صفر خط تیره. اگه اولی باید بمونه، replace ابزار اشتباهه (find و چسبوندن راه درسته — ولی اون بحث پیشرفته‌ست!).",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does \"a b c\".replace(\" \", \"-\") return?", fa: "خروجی \"a b c\".replace(\" \", \"-\") چیه؟" },
                  options: [
                    { en: "a-b-c", fa: "a-b-c" },
                    { en: "a b c", fa: "a b c" },
                    { en: "abc", fa: "abc" },
                    { en: "a--b--c", fa: "a--b--c" },
                  ],
                  answer: 0,
                  explain: { en: "Every space becomes exactly one dash — replacement is one-for-one.", fa: "هر فاصله دقیقاً می‌شه یه خط تیره — جایگزینی یک‌به‌یک ــه." },
                },
                {
                  q: { en: "What is \"TEKA\".lower()?", fa: "خروجی \"TEKA\".lower() چیه؟" },
                  options: [
                    { en: "teka", fa: "teka" },
                    { en: "TEKA", fa: "TEKA" },
                    { en: "Teka", fa: "Teka" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 0,
                  explain: { en: "lower() returns the all-small copy — the original TEKA stays untouched.", fa: "‏lower یه کپی تمام‌کوچیک برمی‌گردونه — اصلِ TEKA دست‌نخورده می‌مونه." },
                },
                {
                  q: { en: "For the slug of \"Python Is FUN\", which chain is right?", fa: "برای اسلاگ \"Python Is FUN" + "\" کدوم زنجیره درسته؟" },
                  options: [
                    { en: ".lower().replace(\" \", \"-\")", fa: "‏.lower().replace(\" \", \"-\")" },
                    { en: ".replace(\" \", \"-\").lower()", fa: "‏.replace(\" \", \"-\").lower()" },
                    { en: ".upper().replace(\" \", \"-\")", fa: "‏.upper().replace(\" \", \"-\")" },
                    { en: ".replace(\"-\", \" \")", fa: "‏.replace(\"-\", \" \")" },
                  ],
                  answer: 0,
                  explain: { en: "Both orders actually work here — but lower-then-replace is the readable habit. Upper would forge PYTHON-IS-FUN.", fa: "اینجا هر دو ترتیب جواب می‌ده — ولی اول lower بعد replace عادتِ خواناست. ‏upper می‌کوبید PYTHON-IS-FUN." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Slug Generator", fa: "سازندهٔ اسلاگ" },
              brief: {
                en: "Read a post title and forge its slug. Print exactly:\nTitle: {the original}\nSlug: {lower + spaces to dashes}\nDashes: {count of \"-\" in the slug}\nLength: {len of the slug}",
                fa: "یه عنوان پست بخون و اسلاگش رو بکوب. دقیقاً چاپ کن:\nTitle: ‏{عنوان اصلی}\nSlug: ‏{حروف کوچک + فاصله‌ها به خط تیره}\nDashes: ‏{تعداد \"-" + " در اسلاگ}\nLength: ‏{طول اسلاگ}",
              },
              starter: `title = input()

# 1. slug = title.lower().replace(" ", "-")
# 2. dashes = slug.count("-")
# 3. print Title / Slug / Dashes / Length (values into variables first!)
`,
              solution: `title = input()

slug = title.lower().replace(" ", "-")
dashes = slug.count("-")
length = len(slug)

print(f"Title: {title}")
print(f"Slug: {slug}")
print(f"Dashes: {dashes}")
print(f"Length: {length}")`,
              hints: [
                {
                  en: "One chain builds the slug: title.lower().replace(\" \", \"-\") — keep the ORIGINAL title for the first print.",
                  fa: "یه زنجیره اسلاگ رو می‌سازه:‏ title.lower().replace(\" \", \"-\") — عنوان اصلی رو برای چاپ اول نگه دار.",
                },
                {
                  en: "Dashes counts the DASHES IN THE SLUG (slug.count(\"-\")) — for \"My Cool Post\" that's 2.",
                  fa: "‏Dashes خط تیره‌های «اسلاگ» رو می‌شماره (‏slug.count(\"-\")) — برای \"My Cool Post" + "\" می‌شه ۲.",
                },
                {
                  en: "\"TEKA\" has no spaces → slug \"teka\", Dashes: 0. Zero is a perfectly fine answer.",
                  fa: "\"TEKA" + "\" فاصله نداره → اسلاگ \"teka\" و Dashes می‌شه ۰. صفر جواب کاملاً درستیه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "My Cool Post", expect: "Title: My Cool Post\nSlug: my-cool-post\nDashes: 2\nLength: 12" },
                  { stdin: "Python Is FUN", expect: "Title: Python Is FUN\nSlug: python-is-fun\nDashes: 2\nLength: 13", hidden: true },
                  { stdin: "TEKA", expect: "Title: TEKA\nSlug: teka\nDashes: 0\nLength: 4", hidden: true },
                ],
              },
              sample: { stdin: "My Cool Post", expect: "Title: My Cool Post\nSlug: my-cool-post\nDashes: 2\nLength: 12" },
            },
          ],
        },
        {
          id: "py-m11-l4",
          title: { en: "MINI-PROJECT: The Hashtag Engine", fa: "مینی‌پروژه: موتور هشتگ" },
          goal: {
            en: "Combine split, append, join and a champion loop into one hashtag factory.",
            fa: "‏split و append و join و حلقهٔ قهرمان رو توی یه کارخانهٔ هشتگ جمع کن.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The forge in action: split() chops the phrase into words, a loop forges each word into a tag with \"#\" + w (plain concatenation), the tags list grows with .append(), and join() welds everything into one line. Cut, forge, weld — three stages, one pipeline.",
                  fa: "کارگاه در عمل:‏ split جمله رو به کلمه‌ها می‌شکنه، یه حلقه هر کلمه رو با \"#\" + w به هشتگ می‌کوبه (چسبوندن ساده)، لیست tags با append بزرگ می‌شه و join همه رو به یه خط جوش می‌ده. برش، کوبش، جوش — سه مرحله، یه خط تولید.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `phrase = "sleep well tonight"
words = phrase.split()
tags = []
for w in words:
    tags.append("#" + w)
tagline = " ".join(tags)
print(tagline)`,
                  caption: { en: "#sleep #well #tonight — a trending line from a plain sentence.", fa: "#sleep #well #tonight — یه خط ترند از یه جملهٔ ساده." },
                },
                {
                  type: "tip",
                  en: "Start with tags = [] (empty list) BEFORE the loop — append() grows it one tag per lap. Forgetting the empty list is the classic crash.",
                  fa: "قبل از حلقه با tags = [] (لیست خالی) شروع کن — ‏append هر دور یه هشتگ اضافه می‌کنه. یادت بره لیست خالی بسازی، کرشِ کلاسیک می‌گیری.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Adding the stats", fa: "اضافه‌کردن آمار" },
              blocks: [
                {
                  type: "text",
                  en: "An engine reports, too. Word count: len(words). Champion: walk the words with if len(w) > len(longest): — strict > means the FIRST word wins ties (\"code\" and \"life\" both 4 → code keeps the crown).",
                  fa: "یه موتور گزارش هم می‌ده. تعداد کلمه:‏ len(words). قهرمان: روی کلمه‌ها راه برو با if len(w) > len(longest) — ‏> سخت‌گیر یعنی روی مساوی اولین کلمه می‌بره (\"code" + "\" و \"life" + "\" هر دو ۴ → کد همون code می‌مونه).",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `words = "code is life".split()
longest = ""
for w in words:
    if len(w) > len(longest):
        longest = w
print(len(words))
print(longest)`,
                  caption: { en: "3 words, longest code — the tie went to the early bird.", fa: "۳ کلمه و بلندترین code — مساوی رفت به زودرسید." },
                },
                {
                  type: "warn",
                  en: "Two loops are fine — one for tags, one for the champion. Don't cram both jobs into one lap if it bends your head; clear beats clever.",
                  fa: "دو تا حلقه کاملاً مجازه — یکی برای هشتگ‌ها یکی برای قهرمان. اگه فکرت خم می‌شه، هر دو کار رو توی یه دور نچپون؛ شفاف بهتر از باهوظه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does \"#\" + \"code\" build?", fa: "‏\"#\" + \"code" + "\" چی می‌سازه؟" },
                  options: [
                    { en: "\"#code\"", fa: "‏\"#code\"" },
                    { en: "\"code#\"", fa: "‏\"code#\"" },
                    { en: "\"# code\"", fa: "‏\"# code\"" },
                    { en: "An error — you can't add strings", fa: "خطا — رشته‌ها جمع نمی‌شن" },
                  ],
                  answer: 0,
                  explain: { en: "+ glues strings head to tail — no spaces unless you type them.", fa: "‏+ رشته‌ها رو سر به ته می‌چسبونه — فاصله فقط وقتیه که خودت تایپش کنی." },
                },
                {
                  q: { en: "Why tags.append(\"#\" + w) inside the loop?", fa: "چرا tags.append(\"#\" + w) داخل حلقه؟" },
                  options: [
                    { en: "To add each forged tag to the growing list", fa: "که هر هشتگِ تازه‌کوبیده‌شده به لیستِ درحال‌بزرگ‌شدن اضافه بشه" },
                    { en: "To delete the old tags", fa: "که هشتگ‌های قدیمی پاک بشن" },
                    { en: "To sort the tags", fa: "که هشتگ‌ها مرتب بشن" },
                    { en: "To print each tag", fa: "که هر هشتگ چاپ بشه" },
                  ],
                  answer: 0,
                  explain: { en: "append grows the list by one each lap — after the loop it holds every tag.", fa: "‏append هر دور لیست رو یکی بزرگ می‌کنه — بعد از حلقه همهٔ هشتگ‌ها توشه." },
                },
                {
                  q: { en: "\"learn python fast\" — which word is longest (strict >)?", fa: "\"learn python fast" + "\" — کدوم کلمه بلندترینه (‏> سخت‌گیر)؟" },
                  options: [
                    { en: "learn", fa: "learn" },
                    { en: "python", fa: "python" },
                    { en: "fast", fa: "fast" },
                    { en: "All tie — error", fa: "همه مساوی‌ان — خطا" },
                  ],
                  answer: 1,
                  explain: { en: "python has 6 letters, learn and fast have 5 — no tie here, python wins outright.", fa: "‏python شش حرفه،‏ learn و fast پنج تا — اینجا مساوی در کار نیست، پایتون قاطع می‌بره." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Hashtag Engine 🔥", fa: "موتور هشتگ رو بساز 🔥" },
              brief: {
                en: "Read a lowercase phrase and print exactly:\nPhrase: {the phrase}\nTags: {#word for every word, joined with single spaces}\nLongest: {first longest word}",
                fa: "یه جملهٔ کوچک بخون و دقیقاً چاپ کن:\nPhrase: ‏{جمله}\nTags: ‏{برای هر کلمه ‎#word، جمع‌شده با یه فاصله}\nLongest: ‏{اولین کلمهٔ بلندترین}",
              },
              starter: `phrase = input()
words = phrase.split()

# 1. tags = [] — loop: tags.append("#" + w)
# 2. tagline = " ".join(tags)
# 3. champion loop -> longest
# 4. print Phrase / Tags / Longest
`,
              solution: `phrase = input()
words = phrase.split()

tags = []
for w in words:
    tags.append("#" + w)
tagline = " ".join(tags)

longest = ""
for w in words:
    if len(w) > len(longest):
        longest = w

print(f"Phrase: {phrase}")
print(f"Tags: {tagline}")
print(f"Longest: {longest}")`,
              hints: [
                {
                  en: "Pipeline order: split → append loop → join. The Tags line is ONE print with tagline.",
                  fa: "ترتیب خط تولید:‏ split → حلقهٔ append → join. خط Tags فقط یه print با tagline ــه.",
                },
                {
                  en: "Longest is a fresh champion walk: if len(w) > len(longest): longest = w — first wins ties.",
                  fa: "قهرمان Longest یه گشت‌گذار تازه‌ست:‏ if len(w) > len(longest) و بعد longest = w — روی مساوی اولی می‌بره.",
                },
                {
                  en: "For \"code is life\": Tags is #code #is #life and the 4-4 tie keeps code. Print Phrase exactly as read.",
                  fa: "برای \"code is life" + ":‏ Tags می‌شه #code #is #life و مساویِ ۴-۴ هم code رو نگه می‌داره. ‏Phrase رو دقیقاً همون‌جوری که خوندی چاپ کن.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "code is life", expect: "Phrase: code is life\nTags: #code #is #life\nLongest: code" },
                  { stdin: "learn python fast", expect: "Phrase: learn python fast\nTags: #learn #python #fast\nLongest: python", hidden: true },
                  { stdin: "tea", expect: "Phrase: tea\nTags: #tea\nLongest: tea", hidden: true },
                ],
              },
              sample: { stdin: "code is life", expect: "Phrase: code is life\nTags: #code #is #life\nLongest: code" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m12",
      title: { en: "Final Boss: Bigger Programs", fa: "باس نهایی: برنامه‌های بزرگ‌تر" },
      blurb: {
        en: "Functions, dicts and loops fuse into one machine: a status board, a gradebook, a quiz — and the Mini Library finale.",
        fa: "تابع‌ها و دیکشنری‌ها و حلقه‌ها یه ماشین می‌شن: تابلوی وضعیت، دفتر نمره، کوییز — و فینال کتابخانهٔ کوچک.",
      },
      lessons: [
        {
          id: "py-m12-l1",
          title: { en: "Small Parts, Big Machine", fa: "قطعه‌های کوچک، ماشین بزرگ" },
          goal: {
            en: "Structure a program: data in a dict, decisions in a function, the loop as glue.",
            fa: "برنامه رو ساختار بده: داده توی دیکشنری، تصمیم توی تابع، و حلقه به‌عنوان چسب.",
          },
          minutes: 13,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Big programs aren't bigger lines — they're better ORGANIZED lines. The architecture you'll use forever: DATA lives in a dict, DECISIONS live in functions, and one loop walks the data calling the functions. One function = one job, with a name that says the job.",
                  fa: "برنامه‌های بزرگ خط‌های بیشتری نیستن — خط‌های بهتر «سازمان‌یافته»ان. معماری‌ای که همیشه استفاده می‌کنی: داده توی دیکشنری زندگی می‌کنه، تصمیم‌ها توی توابع، و یه حلقه روی داده راه می‌ره و توابع رو صدا می‌زنه. هر تابع = یه کار، با اسمی که کارش رو می‌گه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def badge(score):
    if score >= 20:
        return "STAR"
    elif score >= 16:
        return "READY"
    else:
        return "TRAINING"

print(badge(21))
print(badge(18))
print(badge(10))`,
                  caption: { en: "One job, three exits — every score gets exactly one verdict.", fa: "یه کار، سه تا خروجی — هر امتیاز دقیقاً یه حکم می‌گیره." },
                },
                {
                  type: "tip",
                  en: "return hands a value BACK to whoever called. print shows it on screen. A function that returns can be reused anywhere — that's why pros prefer return.",
                  fa: "‏return مقدار رو به صدازنده «برمی‌گردونه». ‏print نشونش می‌ده روی صفحه. تابعی که return می‌کنه همه‌جا قابل استفاده‌ست — برای همین حرفه‌ای‌ها return رو ترجیح می‌دن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The loop that runs the machine", fa: "حلقه‌ای که ماشین رو روشن می‌کنه" },
              blocks: [
                {
                  type: "text",
                  en: "Now wire it up: walk players.items(), pull p[0] and p[1] into named variables, call badge(score), and print one polished line per player. Data + function + loop = a status board that could serve a whole game.",
                  fa: "حالا سیم‌کشی کن: روی players.items() راه برو،‏ p[0] و p[1] رو بریز توی متغیرهای اسم‌دار،‏ badge(score) رو صدا بزن و برای هر بازیکن یه خط صیقلی چاپ کن. داده + تابع + حلقه = یه تابلوی وضعیت که می‌تونه یه بازی کامل رو سرویس کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def badge(score):
    if score >= 20:
        return "STAR"
    elif score >= 16:
        return "READY"
    else:
        return "TRAINING"

players = {"ana": 20, "raj": 16, "kim": 9}
for p in players.items():
    name = p[0]
    score = p[1]
    b = badge(score)
    print(f"{name}: {score} ({b})")`,
                  caption: { en: "Three players, three verdicts — one function did all the thinking.", fa: "سه بازیکن، سه حکم — یه تابع همهٔ فکرکردن رو کرد." },
                },
                {
                  type: "warn",
                  en: "Define functions BEFORE the loop that calls them — Python reads top to bottom, and calling an undefined name is an error.",
                  fa: "تابع‌ها رو «قبل از» حلقه‌ای که صداشون می‌زنه تعریف کن — پایتون از بالا به پایین می‌خونه و صدا زدن اسمِ تعریف‌نشده خطاست.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does a function with `return` give the caller?", fa: "تابعی که return داره به صدازنده چی می‌ده؟" },
                  options: [
                    { en: "A value it can store and use", fa: "یه مقدار که می‌تونه ذخیره و استفاده کنه" },
                    { en: "Nothing — it only prints", fa: "هیچی — فقط چاپ می‌کنه" },
                    { en: "A new dict", fa: "یه دیکشنری جدید" },
                    { en: "An infinite loop", fa: "یه حلقهٔ بی‌نهایت" },
                  ],
                  answer: 0,
                  explain: { en: "return ships the result back — b = badge(score) catches it in a variable.", fa: "‏return نتیجه رو برمی‌گردونه — ‏b = badge(score) توی متغیر می‌گیرتش." },
                },
                {
                  q: { en: "With the badge ladder above, what is badge(16)?", fa: "با همون نردبان badge بالا، خروجی badge(16) چیه؟" },
                  options: [
                    { en: "STAR", fa: "STAR" },
                    { en: "READY", fa: "READY" },
                    { en: "TRAINING", fa: "TRAINING" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "16 fails >= 20 but passes >= 16 — elif catches it: READY.", fa: "‏۱۶ از >= 20 رد می‌شه ولی از >= 16 رد نمی‌شه — elif می‌گیرتش: READY." },
                },
                {
                  q: { en: "In the loop, why b = badge(score) before printing?", fa: "توی حلقه چرا قبل از چاپ b = badge(score) می‌گیریم؟" },
                  options: [
                    { en: "To keep the f-string hole simple: {b}", fa: "که آکولاد f-string ساده بمونه:‏ {b}" },
                    { en: "Because badge only works once", fa: "چون badge فقط یه بار کار می‌کنه" },
                    { en: "To reset the score", fa: "که امتیاز ریست بشه" },
                    { en: "No reason — it's decoration", fa: "دلیلی نداره — تزئینه" },
                  ],
                  answer: 0,
                  explain: { en: "Compute once into a named variable, then print calmly — the clean pattern from m10.", fa: "یه بار حساب کن توی متغیر اسم‌دار، بعد آروم چاپ کن — همون الگوی تمیز ماژول ۱۰." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Status Board", fa: "تابلوی وضعیت" },
              brief: {
                en: "players = {\"sara\": 18, \"kenji\": 21, \"amir\": 15}. Write badge(score) returning STAR (>= 20), READY (>= 16), else TRAINING. Loop and print exactly:\nsara: 18 (READY)\nkenji: 21 (STAR)\namir: 15 (TRAINING)",
                fa: "‏players = {\"sara\": 18, \"kenji\": 21, \"amir\": 15}. تابع badge(score) رو بنویس که STAR (‏>= 20) و READY (‏>= 16) و در غیر این صورت TRAINING برگردونه. حلقه بزن و دقیقاً چاپ کن:\nsara: 18 (READY)\nkenji: 21 (STAR)\namir: 15 (TRAINING)",
              },
              starter: `players = {"sara": 18, "kenji": 21, "amir": 15}

# 1. def badge(score): -> return "STAR" / "READY" / "TRAINING" (if / elif / else)
# 2. loop over players.items() — name = p[0], score = p[1]
# 3. b = badge(score) — then print f"{name}: {score} ({b})"
`,
              solution: `players = {"sara": 18, "kenji": 21, "amir": 15}

def badge(score):
    if score >= 20:
        return "STAR"
    elif score >= 16:
        return "READY"
    else:
        return "TRAINING"

for p in players.items():
    name = p[0]
    score = p[1]
    b = badge(score)
    print(f"{name}: {score} ({b})")`,
              hints: [
                {
                  en: "The ladder order matters: check >= 20 FIRST, then >= 16, then else — highest rank first.",
                  fa: "ترتیب نردبان مهمه: اول >= 20 بعد >= 16 و آخرش else — رتبهٔ بالاتر اول.",
                },
                {
                  en: "Each elif needs its own return — three branches, three returns, no falling through.",
                  fa: "هر elif به return خودش نیاز داره — سه شاخه، سه return، بدون رد شدن.",
                },
                {
                  en: "The loop line is f\"{name}: {score} ({b})\" — parentheses around the badge, no spaces inside.",
                  fa: "خط حلقه می‌شه f\"{name}: {score} ({b})\" — پرانتز دور نشان، بدون فاصله داخلش.",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "sara: 18 (READY)\nkenji: 21 (STAR)\namir: 15 (TRAINING)" }],
              },
              sample: { expect: "sara: 18 (READY)\nkenji: 21 (STAR)\namir: 15 (TRAINING)" },
            },
          ],
        },
        {
          id: "py-m12-l2",
          title: { en: "The Gradebook", fa: "دفتر نمره‌ها" },
          goal: {
            en: "Parse structured input lines into a dict, then run a full report with a helper function.",
            fa: "خط‌های ورودیِ ساختارمند رو به دیکشنری تبدیل کن و بعد با یه تابع کمکی گزارش کامل بده.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Real programs eat structured input: every line is one record, like \"sara 18\" — a name and a score. The parser: line.split() cuts on spaces into [\"sara\", \"18\"], parts[0] is the name, and int(parts[1]) turns the TEXT \"18\" into the NUMBER 18.",
                  fa: "برنامه‌های واقعی ورودیِ ساختارمند می‌خورن: هر خط یه رکورده، مثل \"sara 18" + "\" — یه اسم و یه نمره. تجزیه‌گر:‏ line.split() روی فاصله‌ها می‌شکنه به [\"sara\", \"18\"]، بعد parts[0] اسمه و int(parts[1]) متنِ \"18" + "\" رو به عدد ۱۸ تبدیل می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `record = "sara 18"
parts = record.split()
name = parts[0]
score = int(parts[1])
print(name)
print(score + 1)`,
                  caption: { en: "sara, then 19 — the score is now a real number you can do math with.", fa: "‏sara و بعد ۱۹ — امتیاز الان یه عدد واقعیه و می‌شه باهاش حساب کرد." },
                },
                {
                  type: "warn",
                  en: "\"18\" + 1 crashes (text plus number). int(\"18\") + 1 is 19. Convert FIRST, compute SECOND.",
                  fa: "\"18" + "\" + 1 کرش می‌کنه (متن به‌علاوه عدد).‏ int(\"18\") + 1 می‌شه ۱۹. اول تبدیل کن، بعد حساب کن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The report, with a helper", fa: "گزارش، با یه تابع کمکی" },
              blocks: [
                {
                  type: "text",
                  en: "Collect every record into scores[name] = score while reading. Then the report walks the dict once: total grows, the champion race tracks best/best_pt, honors counts scores >= 18. A tiny helper function keeps the math tidy: def average(total, count): return round(total / count, 1).",
                  fa: "هر رکورد رو موقع خوندن بریز توی scores[name] = score. بعد گزارش یه بار روی دیکشنری راه می‌ره: ‏total بزرگ می‌شه، مسابقهٔ قهرمان best و best_pt رو دنبال می‌کنه و honors نمره‌های >= 18 رو می‌شماره. یه تابع کمکی کوچیک حساب‌ها رو مرتب نگه می‌داره:‏ def average(total, count): و بعد return round(total / count, 1).",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def average(total, count):
    return round(total / count, 1)

scores = {"ana": 19, "raj": 10, "kim": 14}
total = 0
for p in scores.items():
    total += p[1]
print(average(total, len(scores)))`,
                  caption: { en: "43 / 3 → 14.3 — one function, any class size.", fa: "۴۳ تقسیم بر ۳ → 14.3 — یه تابع، هر تعداد دانش‌آموز." },
                },
                {
                  type: "tip",
                  en: "Number of input() calls = number of stdin lines. Three students? A for i in range(3): loop with one input() inside reads them all.",
                  fa: "تعداد inputها = تعداد خط‌های ورودی. سه تا دانش‌آموز؟ یه حلقهٔ for i in range(3) با یه input داخلش همه رو می‌خونه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does \"amir 15\".split() return?", fa: "خروجی \"amir 15\".split() چیه؟" },
                  options: [
                    { en: "[\"amir\", \"15\"]", fa: "‏[\"amir\", \"15\"]" },
                    { en: "[\"amir 15\"]", fa: "‏[\"amir 15\"]" },
                    { en: "\"amir15\"", fa: "‏\"amir15\"" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 0,
                  explain: { en: "split() cuts on whitespace — two words become a two-slot list of strings.", fa: "‏split روی فاصله برش می‌زنه — دو کلمه می‌شن یه لیست دوتایی از رشته‌ها." },
                },
                {
                  q: { en: "What is int(\"15\") + 1?", fa: "خروجی int(\"15\") + 1 چیه؟" },
                  options: [
                    { en: "\"151\"", fa: "‏\"151\"" },
                    { en: "16", fa: "۱۶" },
                    { en: "\"16\"", fa: "‏\"16\"" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 1,
                  explain: { en: "int() converts the text \"15\" into the number 15 — then math works: 16.", fa: "‏int متنِ \"15" + "\" رو به عدد ۱۵ تبدیل می‌کنه — بعد ریاضی کار می‌کنه: ۱۶." },
                },
                {
                  q: { en: "Why round(total / count, 1) for the average?", fa: "چرا برای میانگین round(total / count, 1)؟" },
                  options: [
                    { en: "To keep one decimal — clean, predictable output", fa: "که یه رقم اعشار بمونه — خروجی تمیز و قابل‌پیش‌بینی" },
                    { en: "To make the number bigger", fa: "که عدد بزرگ‌تر بشه" },
                    { en: "To turn it into a string", fa: "که بشه رشته" },
                    { en: "Because / is illegal", fa: "چون / غیرقانونیه" },
                  ],
                  answer: 0,
                  explain: { en: "43/3 is 14.333… — round(x, 1) forges the tidy 14.3 your report promises.", fa: "‏۴۳/۳ می‌شه 14.333… — ‏round(x, 1) همون 14.3 مرتب رو می‌کوبه که گزارش قولش رو داده." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Gradebook 📚", fa: "دفتر نمره‌ها رو بساز 📚" },
              brief: {
                en: "Read 3 lines, each \"name score\" (e.g. \"sara 18\"). Build a scores dict, then print exactly:\nStudents: {count}\nBest: {name} ({score})\nAverage: {round to 1 decimal}\nHonors: {how many scored >= 18}",
                fa: "۳ خط بخون، هر خط \"name score" + "\" (مثل \"sara 18\"). یه دیکشنری نمره بساز و دقیقاً چاپ کن:\nStudents: ‏{تعداد}\nBest: ‏{اسم} ‏({نمره})\nAverage: ‏{گرد به یه رقم اعشار}\nHonors: ‏{چند نفر >= 18 گرفتن}",
              },
              starter: `scores = {}

# 1. for i in range(3): line = input() — split, int(), scores[name] = score
# 2. helper: def average(total, count): return round(total / count, 1)
# 3. one report loop: total, champion (best/best_pt), honors (score >= 18)
# 4. print Students / Best / Average / Honors
`,
              solution: `scores = {}

for i in range(3):
    line = input()
    parts = line.split()
    name = parts[0]
    score = int(parts[1])
    scores[name] = score

def average(total, count):
    return round(total / count, 1)

total = 0
best = ""
best_pt = 0
honors = 0
for p in scores.items():
    name = p[0]
    score = p[1]
    total += score
    if score > best_pt:
        best_pt = score
        best = name
    if score >= 18:
        honors += 1

avg = average(total, len(scores))

print(f"Students: {len(scores)}")
print(f"Best: {best} ({best_pt})")
print(f"Average: {avg}")
print(f"Honors: {honors}")`,
              hints: [
                {
                  en: "The reading loop runs exactly 3 times: input, split, int(parts[1]), store. Scores land in the dict in input order.",
                  fa: "حلقهٔ خوندن دقیقاً ۳ بار می‌چرخه:‏ input و split و int(parts[1]) و ذخیره. نمره‌ها به ترتیب ورودی توی دیکشنری می‌شینن.",
                },
                {
                  en: "Best uses strict > — on the all-18 tie the FIRST student keeps the crown. Honors counts every score >= 18.",
                  fa: "‏Best با > سخت‌گیر کار می‌کنه — روی مساویِ همه ۱۸، اولین دانش‌آموز تاج رو نگه می‌داره. ‏Honors هر نمرهٔ >= 18 رو می‌شماره.",
                },
                {
                  en: "Sample check: 18 + 21 + 15 = 54, / 3 = 18.0 exactly, honors = sara and kenji = 2.",
                  fa: "چک نمونه:‏ ۱۸ + ۲۱ + ۱۵ می‌شه ۵۴ و تقسیم بر ۳ دقیقاً 18.0 و honors هم sara و kenji یعنی ۲.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "sara 18\nkenji 21\namir 15", expect: "Students: 3\nBest: kenji (21)\nAverage: 18.0\nHonors: 2" },
                  { stdin: "mina 19\nali 10\nleo 14", expect: "Students: 3\nBest: mina (19)\nAverage: 14.3\nHonors: 1", hidden: true },
                  { stdin: "zoe 18\nraj 18\nkim 18", expect: "Students: 3\nBest: zoe (18)\nAverage: 18.0\nHonors: 3", hidden: true },
                ],
              },
              sample: { stdin: "sara 18\nkenji 21\namir 15", expect: "Students: 3\nBest: kenji (21)\nAverage: 18.0\nHonors: 2" },
            },
          ],
        },
        {
          id: "py-m12-l3",
          title: { en: "The Quiz Master", fa: "کوییز‌مستر" },
          goal: {
            en: "Drive an interactive quiz from a dict — case-proof answers, live feedback, and a final rank.",
            fa: "یه کوییز تعاملی رو با دیکشنری بران: جواب‌های مقاوم به بزرگی‌وحروفی، بازخورد زنده و رتبهٔ نهایی.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "A quiz is a dict in disguise: question → answer. The engine loops over quiz.items(), asks each question, reads the answer with input(), and compares. Case-proof trick: given.lower() == correct — so \"Tokyo\" and \"tokyo\" both pass.",
                  fa: "کوییز یه دیکشنریِ نقاب‌داره: سؤال → جواب. موتور روی quiz.items() راه می‌ره، هر سؤال رو می‌پرسه، جواب رو با input می‌خونه و مقایسه می‌کنه. ترفند مقاوم‌سازی:‏ given.lower() == correct — این‌جوری هم \"Tokyo" + "\" و هم \"tokyo" + "\" قبول می‌شن.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `given = "Tokyo"
correct = "tokyo"
if given.lower() == correct:
    print("Correct!")
else:
    print("Wrong!")

print("paris".lower() == "PARIS")`,
                  caption: { en: "Correct! — and True: lowercase copies always agree.", fa: "‏Correct! و بعد True: نسخه‌های کوچک همیشه با هم کنار میان." },
                },
                {
                  type: "tip",
                  en: "input() always hands you a STRING — even \"8\" is text. For text answers compare strings directly (with .lower()); for numbers convert with int() first.",
                  fa: "‏input همیشه رشته دستت می‌ده — حتی \"8" + "\" متن ــه. برای جواب‌های متنی مستقیم رشته مقایسه کن (با lower)؛ برای عددی اول با int تبدیل کن.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Score, feedback, rank", fa: "امتیاز، بازخورد، رتبه" },
              blocks: [
                {
                  type: "text",
                  en: "Each lap: read the answer, compare, then FEED BACK immediately — \"Correct!\" or \"Wrong! Answer: tokyo\" (leaking the right answer is a feature: players learn). Bump score only on wins. After the loop, a rank ladder turns the score into a title: 3 → Master, 2 → Apprentice, else Rookie.",
                  fa: "هر دور: جواب رو بخون، مقایسه کن، بعد فوری بازخورد بده — \"Correct!\" یا \"Wrong! Answer: tokyo" + "\" (لو دادن جواب درست یه فیچره: بازیکن یاد می‌گیره). امتیاز فقط روی برد بالا می‌ره. بعد از حلقه، یه نردبان رتبه امتیاز رو به لقب تبدیل می‌کنه: ۳ → Master و ۲ → Apprentice و غیر از این‌ها Rookie.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `score = 2
print(f"Score: {score}/3")
if score == 3:
    print("Rank: Master")
elif score == 2:
    print("Rank: Apprentice")
else:
    print("Rank: Rookie")`,
                  caption: { en: "Score: 2/3, Rank: Apprentice — the ladder never misses.", fa: "‏Score: 2/3 و Rank: Apprentice — نردبان هیچ‌وقت خطا نمی‌کنه." },
                },
                {
                  type: "warn",
                  en: "Print the feedback INSIDE the loop (per question) and the rank AFTER it — mixing the two orders scrambles the output.",
                  fa: "بازخورد رو «داخل» حلقه چاپ کن (برای هر سؤال) و رتبه رو «بعد» از حلقه — قاطیش کنی، ترتیب خروجی به هم می‌ریزه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Why compare given.lower() == correct?", fa: "چرا given.lower() == correct مقایسه می‌کنیم؟" },
                  options: [
                    { en: "So \"Tokyo\" and \"tokyo\" both count as correct", fa: "که هم \"Tokyo" + "\" و هم \"tokyo" + "\" درست حساب بشن" },
                    { en: "Because lower() is faster", fa: "چون lower سریع‌تره" },
                    { en: "To delete the answer", fa: "که جواب پاک بشه" },
                    { en: "You shouldn't — compare raw", fa: "نباید — خام مقایسه کن" },
                  ],
                  answer: 0,
                  explain: { en: "Lowercasing both sides removes capital-letter luck from the game.", fa: "کوچیک‌کردن هر دو طرف، شانسیِ حروف بزرگ رو از بازی حذف می‌کنه." },
                },
                {
                  q: { en: "What does input() return for the answer \"8\"?", fa: "‏input برای جواب \"8" + "\" چی برمی‌گردونه؟" },
                  options: [
                    { en: "The number 8", fa: "عدد ۸" },
                    { en: "The string \"8\"", fa: "رشتهٔ \"8\"" },
                    { en: "True", fa: "True" },
                    { en: "Nothing", fa: "هیچی" },
                  ],
                  answer: 1,
                  explain: { en: "Always a string — which is perfect here, since \"8\" == \"8\" compares text to text.", fa: "همیشه رشته — که اینجا عالیه، چون \"8" + "\" == \"8" + "\" متن رو به متن مقایسه می‌کنه." },
                },
                {
                  q: { en: "Where does the rank ladder belong?", fa: "نردبان رتبه کجا باید باشه؟" },
                  options: [
                    { en: "After the loop — once all answers are in", fa: "بعد از حلقه — وقتی همهٔ جواب‌ها اومد" },
                    { en: "Inside the loop, every lap", fa: "داخل حلقه، هر دور" },
                    { en: "Before reading any answers", fa: "قبل از خوندن هر جوابی" },
                    { en: "Nowhere — skip the rank", fa: "هیچ‌جا — رتبه رو بنداز" },
                  ],
                  answer: 0,
                  explain: { en: "The rank needs the FINAL score — it can only be computed after the last question.", fa: "رتبه به امتیاز «نهایی» نیاز داره — فقط بعد از آخرین سؤال قابل محاسبه‌ست." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Run the Quiz Show 🎬", fa: "کوییز‌شو رو اجرا کن 🎬" },
              brief: {
                en: "quiz = {\"Japan capital?\": \"tokyo\", \"5 + 3?\": \"8\", \"Sky color?\": \"blue\"}. Ask all 3 in order (lowercase compare), print Correct! or Wrong! Answer: {a} per question, then exactly:\nScore: {n}/3\nRank: {Master if 3, Apprentice if 2, else Rookie}",
                fa: "‏quiz = {\"Japan capital?\": \"tokyo\", \"5 + 3?\": \"8\", \"Sky color?\": \"blue\"}. هر ۳ سؤال رو به ترتیب بپرس (مقایسه با lower)، برای هر سؤال چاپ کن Correct! یا Wrong! Answer: {a} و در آخر دقیقاً:\nScore: ‏{n}/3\nRank: ‏{اگه ۳ Master، اگه ۲ Apprentice، وگرنه Rookie}",
              },
              starter: `quiz = {"Japan capital?": "tokyo", "5 + 3?": "8", "Sky color?": "blue"}
score = 0

# 1. for p in quiz.items(): q = p[0], correct = p[1]
# 2. given = input() — compare given.lower() == correct
# 3. print Correct! or Wrong! Answer: {correct} — bump score on wins
# 4. after the loop: print Score: {score}/3 and the rank ladder
`,
              solution: `quiz = {"Japan capital?": "tokyo", "5 + 3?": "8", "Sky color?": "blue"}
score = 0

for p in quiz.items():
    q = p[0]
    correct = p[1]
    given = input()
    if given.lower() == correct:
        score += 1
        print("Correct!")
    else:
        print(f"Wrong! Answer: {correct}")

print(f"Score: {score}/3")
if score == 3:
    print("Rank: Master")
elif score == 2:
    print("Rank: Apprentice")
else:
    print("Rank: Rookie")`,
              hints: [
                {
                  en: "Three input() calls — one per question, in dict order. The stdin box feeds them top to bottom.",
                  fa: "سه تا input — یکی برای هر سؤال، به ترتیب دیکشنری. باکس ورودی از بالا به پایین بهشون می‌ده.",
                },
                {
                  en: "Wrong line prints the correct answer: f\"Wrong! Answer: {correct}\" — no colon after Answer: except the one already there.",
                  fa: "خط Wrong جواب درست رو چاپ می‌کنه:‏ f\"Wrong! Answer: {correct}\" — بعد از Answer: همون دونقطه‌ای که هست کافیه.",
                },
                {
                  en: "The rank ladder is == 3 / == 2 / else — Rookie catches 0 and 1 alike.",
                  fa: "نردبان رتبه می‌شه == 3 و == 2 و else — ‏Rookie هر دو تا ۰ و ۱ رو باهم می‌گیره.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "tokyo\n8\nblue", expect: "Correct!\nCorrect!\nCorrect!\nScore: 3/3\nRank: Master" },
                  { stdin: "Tokyo\n8\nred", expect: "Correct!\nCorrect!\nWrong! Answer: blue\nScore: 2/3\nRank: Apprentice", hidden: true },
                  { stdin: "paris\n7\nred", expect: "Wrong! Answer: tokyo\nWrong! Answer: 8\nWrong! Answer: blue\nScore: 0/3\nRank: Rookie", hidden: true },
                ],
              },
              sample: { stdin: "tokyo\n8\nblue", expect: "Correct!\nCorrect!\nCorrect!\nScore: 3/3\nRank: Master" },
            },
          ],
        },
        {
          id: "py-m12-l4",
          title: { en: "FINAL BOSS: The Mini Library", fa: "باس نهایی: کتابخانهٔ کوچک" },
          goal: {
            en: "Ship a working library app: functions that mutate a dict, a command loop, and a full report — everything you've learned in one program.",
            fa: "یه اپ کتابخانهٔ واقعی تحویل بده: توابعی که دیکشنری رو تغییر می‌دن، حلقهٔ دستورات و یه گزارش کامل — همهٔ چیزهایی که یاد گرفتی توی یه برنامه.",
          },
          minutes: 14,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "The last boss combines everything: a library dict (book → copies), functions that DO things to it, and a command loop that runs until the user says done. Functions can mutate a dict you pass them — lend(library, book) really removes a copy from the real dict.",
                  fa: "باس آخر همه‌چیز رو جمع می‌کنه: یه دیکشنری کتابخانه (کتاب → تعداد)، توابعی که روش «کار» انجام می‌دن و یه حلقهٔ دستور که تا کاربر نگه done ادامه داره. توابع می‌تونن دیکشنری‌ای که بهشون می‌دی رو تغییر بدن — ‏lend(library, book) واقعاً یه نسخه از دیکشنری اصلی کم می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def lend(d, b):
    if b in d and d[b] > 0:
        d[b] = d[b] - 1

library = {"python": 2}
lend(library, "python")
print(library)
print(library["python"])`,
                  caption: { en: "{'python': 1} — the function reached inside the dict and changed it. Real mutation!", fa: "{'python': 1} — تابع رفت داخل دیکشنری و عوضش کرد. تغییر واقعی!" },
                },
                {
                  type: "tip",
                  en: "No copies of the dict are made — d inside the function IS library outside. Changes stick. That's why functions + dicts are such a powerful team.",
                  fa: "از دیکشنری کپی گرفته نمی‌شه — اون d داخل تابع همون library بیرونه. تغییرها می‌مونن. برای همین تابع + دیکشنری یه تیم این‌قدر قدرتمنده.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The command loop", fa: "حلقهٔ دستورات" },
              blocks: [
                {
                  type: "text",
                  en: "Commands arrive as text lines: \"lend dragons\" → split() gives action = parts[0], book = parts[1]. An elif ladder routes each action: lend → check stock and subtract, return → get(book, 0) + 1, report → walk items(). The sentinel \"done\" breaks the while True.",
                  fa: "دستورها به شکل خط‌های متنی می‌رسن:‏ \"lend dragons" + "\" بعد از split می‌ده action = parts[0] و book = parts[1]. یه نردبان elif هر دستور رو مسیریابی می‌کنه: lend → چک موجودی و کم‌کردن،‏ return → ‏get(book, 0) + 1،‏ report → گشت‌گذار روی items. نگهبانِ \"done" + "\" هم while True رو می‌شکنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `cmd = "lend dragons"
parts = cmd.split()
action = parts[0]
book = parts[1]
print(action, book)

shelf = {"dragons": 1}
if shelf.get(book, 0) > 0:
    shelf[book] = shelf[book] - 1
print(shelf)`,
                  caption: { en: "lend + dragons handled, stock down to 0 — the machine works.", fa: "دستور lend با dragons انجام شد و موجودی شد ۰ — ماشین کار می‌کنه." },
                },
                {
                  type: "warn",
                  en: "Count your input() calls: one per command line, and \"done\" is the LAST stdin line. One extra or one missing = the Input box complains.",
                  fa: "تعداد inputهات رو بشمار: برای هر خط دستور یکی، و \"done" + "\" آخرین خط ورودیه. یکی زیاد یا یکی کم، باکس Input شروع به غر زدن می‌کنه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Why end the command list with \"done\"?", fa: "چرا لیست دستورها با \"done" + "\" تموم می‌شه؟" },
                  options: [
                    { en: "It's the sentinel that breaks the while True", fa: "نگهبانیه که while True رو می‌شکنه" },
                    { en: "Python requires a last line", fa: "پایتون خط آخر رو الزامی می‌دونه" },
                    { en: "It prints the report", fa: "گزارش رو چاپ می‌کنه" },
                    { en: "To delete the library", fa: "که کتابخانه پاک بشه" },
                  ],
                  answer: 0,
                  explain: { en: "while True never stops alone — the if cmd == \"done\": break is the exit door.", fa: "‏while True به‌تنهایی نمی‌ایسته — ‏if cmd == \"done" + "\" و بعد break همون در خروجیه." },
                },
                {
                  q: { en: "What does \"return manga\".split() give you?", fa: "\"return manga\".split() بهت چی می‌ده؟" },
                  options: [
                    { en: "[\"return\", \"manga\"] — action + book", fa: "‏[\"return\", \"manga\"] — دستور + کتاب" },
                    { en: "[\"return manga\"]", fa: "‏[\"return manga\"]" },
                    { en: "\"returnmanga\"", fa: "‏\"returnmanga\"" },
                    { en: "An error — return is a keyword", fa: "خطا — ‏return کلمهٔ کلیدیه" },
                  ],
                  answer: 0,
                  explain: { en: "split() doesn't care about keywords — inside a string, \"return\" is just text.", fa: "‏split با کلمه‌های کلیدی کاری نداره — داخل رشته،‏ return فقط متنه." },
                },
                {
                  q: { en: "Why does give_back use d.get(b, 0) + 1?", fa: "چرا give_back از d.get(b, 0) + 1 استفاده می‌کنه؟" },
                  options: [
                    { en: "So returning a book NOT in the catalog still works — it gets created with 1", fa: "که برگردوندن کتابِ خارج از کاتالوگ هم کار کنه — با ۱ ساخته می‌شه" },
                    { en: "To delete the book", fa: "که کتاب پاک بشه" },
                    { en: "Because get() is faster than []", fa: "چون get سریع‌تر از [] ــه" },
                    { en: "To sort the shelf", fa: "که قفسه مرتب بشه" },
                  ],
                  answer: 0,
                  explain: { en: "get(b, 0) turns \"new title\" into 0, then +1 makes 1 — the dict grows politely.", fa: "‏get(b, 0) عنوان تازه رو ۰ می‌کنه و بعد ‎+1 می‌شه ۱ — دیکشنری مؤدبانه بزرگ می‌شه." },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Build the Mini Library 🏰", fa: "کتابخانهٔ کوچک رو بساز 🏰" },
              brief: {
                en: "library = {\"python\": 2, \"dragons\": 1, \"robots\": 3}. Commands (one per line, end with \"done\"):\nlend {book} → if stock > 0: subtract + print \"Lent: {book}\", else \"Not available: {book}\"\nreturn {book} → add 1 (create if needed) + print \"Returned: {book}\"\nreport → print every pair as \"{book}: {copies}\"\ndone → stop, then print \"Bye!\"",
                fa: "‏library = {\"python\": 2, \"dragons\": 1, \"robots\": 3}. دستورها (هر خط یکی، آخرش \"done\"):\nlend {book} → اگه موجودی > ۰ بود: کم کن و چاپ کن \"Lent: {book}\" وگرنه \"Not available: {book}\"\nreturn {book} → یکی اضافه کن (اگه نبود بساز) و چاپ کن \"Returned: {book}\"\nreport → هر جفت رو به شکل \"{book}: {copies}\" چاپ کن\ndone → بس، بعد چاپ کن \"Bye!\"",
              },
              starter: `library = {"python": 2, "dragons": 1, "robots": 3}

# 1. def lend(d, b): if b in d and d[b] > 0 -> subtract + print Lent:, else Not available:
# 2. def give_back(d, b): d[b] = d.get(b, 0) + 1 + print Returned:
# 3. def report(d): loop items -> print f"{p0}: {p1}"  (variables first!)
# 4. while True: cmd = input() — done breaks
#    split -> action = parts[0]; report is ONE word (no book!)
#    else book = parts[1] -> route lend / return
# 5. after the loop: print Bye!
`,
              solution: `library = {"python": 2, "dragons": 1, "robots": 3}

def lend(d, b):
    if b in d and d[b] > 0:
        d[b] = d[b] - 1
        print(f"Lent: {b}")
    else:
        print(f"Not available: {b}")

def give_back(d, b):
    d[b] = d.get(b, 0) + 1
    print(f"Returned: {b}")

def report(d):
    for p in d.items():
        name = p[0]
        copies = p[1]
        print(f"{name}: {copies}")

while True:
    cmd = input()
    if cmd == "done":
        break
    parts = cmd.split()
    action = parts[0]
    if action == "report":
        report(library)
    else:
        book = parts[1]
        if action == "lend":
            lend(library, book)
        elif action == "return":
            give_back(library, book)

print("Bye!")`,
              hints: [
                {
                  en: "The functions print their own lines — the loop only routes. lend checks b in d AND d[b] > 0 before subtracting.",
                  fa: "تابع‌ها خط‌های خودشون رو چاپ می‌کنن — حلقه فقط مسیریابی می‌کنه. ‏lend قبل از کم‌کردن، ‏b in d و d[b] > 0 رو باهم چک می‌کنه.",
                },
                {
                  en: "Drain a book with four lends (3 → 0) and the next lend hits the else: Not available: robots.",
                  fa: "با چهار تا lend یه کتاب رو تمام کن (۳ → ۰) و lend بعدی می‌خوره به else:‏ Not available: robots.",
                },
                {
                  en: "report and done are ONE-word commands — check action == \"report\" before reading parts[1], or the split crashes on missing pieces.",
                  fa: "‏report و done دستورهای «تک‌کلمه‌ای‌ان» — قبل از خوندن parts[1] چک کن action == \"report\" وگرنه split روی تکهٔ ناموجود کرش می‌کنه.",
                },
              ],
              check: {
                kind: "py",
                tests: [
                  { stdin: "lend python\nlend dragons\nreturn dragons\nreport\ndone", expect: "Lent: python\nLent: dragons\nReturned: dragons\npython: 1\ndragons: 1\nrobots: 3\nBye!" },
                  { stdin: "lend robots\nlend robots\nlend robots\nlend robots\nreport\ndone", expect: "Lent: robots\nLent: robots\nLent: robots\nNot available: robots\npython: 2\ndragons: 1\nrobots: 0\nBye!", hidden: true },
                  { stdin: "return manga\nreport\ndone", expect: "Returned: manga\npython: 2\ndragons: 1\nrobots: 3\nmanga: 1\nBye!", hidden: true },
                ],
              },
              sample: { stdin: "lend python\nlend dragons\nreturn dragons\nreport\ndone", expect: "Lent: python\nLent: dragons\nReturned: dragons\npython: 1\ndragons: 1\nrobots: 3\nBye!" },
            },
          ],
        },
      ],
    },
    {
      id: "py-m13",
      title: { en: "Nested Data: Boxes in Boxes", fa: "داده‌های تودرتو: جعبه توی جعبه" },
      blurb: {
        en: "Dicts inside dicts, dicts inside lists — model a whole game party in one variable and reach any value with a chain of doors.",
        fa: "دیکشنری توی دیکشنری، دیکشنری توی لیست — یه پارتی کامل بازی رو توی یه متغیر جا بده و با زنجیره‌ای از درها به هر مقداری برس.",
      },
      lessons: [
        {
          id: "py-m13-l1",
          title: { en: "A Dict Inside a Dict", fa: "دیکشنری توی دیکشنری" },
          goal: {
            en: "Read and change a value two levels deep with a chain of brackets.",
            fa: "با یه زنجیره براکت، یه مقدار دو طبقه پایین‌تر رو بخون و عوضش کن.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "One dict is one box of labeled values. But real things are DEEPER: a hero has stats, and each stat is its own little record. So we put a whole dict INSIDE a dict — a box inside a box. heroes[\"ana\"] is itself a dict, so you can keep opening doors: heroes[\"ana\"][\"hp\"].",
                  fa: "یه دیکشنری یه جعبهٔ برچسب‌دار از مقدارهاست. ولی چیزهای واقعی «عمیق‌تر»ن: یه قهرمان آمار داره و هر آمار خودش یه رکورد کوچیکه. پس یه دیکشنری کامل رو «داخل» دیکشنری می‌ذاریم — جعبه توی جعبه. ‏heroes[\"ana\"] خودش یه دیکشنریه، پس می‌تونی درها رو دنبال هم باز کنی:‏ heroes[\"ana\"][\"hp\"].",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `heroes = {"ana": {"hp": 30, "power": 7}}
print(heroes["ana"])
print(heroes["ana"]["hp"])
print(heroes["ana"]["power"])`,
                  caption: { en: "First door: the whole inner dict. Then one chain, two levels deep: 30 and 7.", fa: "در اول: کل دیکشنری داخلی. بعد یه زنجیره با دو طبقه عمق: ۳۰ و ۷." },
                },
                {
                  type: "tip",
                  en: "Read the chain left to right: heroes[\"ana\"] opens the outer box, [\"hp\"] opens the inner one. Every bracket is exactly one door.",
                  fa: "زنجیره رو از چپ به راست بخون:‏ heroes[\"ana\"] جعبهٔ بیرونی رو باز می‌کنه و [\"hp\"] جعبهٔ داخلی رو. هر براکت دقیقاً یه دره.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "One chain, two directions", fa: "یه زنجیره، دو جهت" },
              blocks: [
                {
                  type: "text",
                  en: "The same chain WRITES too: heroes[\"ana\"][\"hp\"] = 25 reaches two levels down and updates in place. You can even add a brand-new inner key the same way, or enroll a whole new hero with one assignment.",
                  fa: "همون زنجیره «نوشتن» هم می‌کنه:‏ heroes[\"ana\"][\"hp\"] = 25 دو طبقه پایین می‌ره و درجا به‌روزرسانی می‌کنه. حتی می‌تونی یه کلید داخلی کاملاً تازه رو هم به همین شکل بسازی یا با یه انتساب، یه قهرمان کامل جدید ثبت‌نام کنی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `heroes = {"ana": {"hp": 30, "power": 7}}
heroes["ana"]["hp"] = 25
heroes["ana"]["shield"] = 5
heroes["raj"] = {"hp": 24, "power": 9}
print(heroes["ana"]["hp"])
print(heroes["ana"]["shield"])
print(heroes["raj"]["power"])`,
                  caption: { en: "25, then 5, then 9 — updated, created, enrolled.", fa: "‏۲۵ و بعد ۵ و بعد ۹ — به‌روز شد، ساخته شد، ثبت‌نام شد." },
                },
                {
                  type: "warn",
                  en: "Door order matters: heroes[\"hp\"] crashes — hp lives INSIDE ana, not in the outer dict. Outer key first, inner key second.",
                  fa: "ترتیب درها مهمه:‏ heroes[\"hp\"] کرش می‌کنه — ‏hp «داخل» ana زندگی می‌کنه، نه توی دیکشنری بیرونی. اول کلید بیرونی، بعد کلید داخلی.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "heroes = {\"ana\": {\"hp\": 30}} — what is heroes[\"ana\"][\"hp\"]?", fa: "‏heroes = {\"ana\": {\"hp\": 30}} — خروجی heroes[\"ana\"][\"hp\"] چیه؟" },
                  options: [
                    { en: "30", fa: "۳۰" },
                    { en: "\"hp\"", fa: "‏\"hp\"" },
                    { en: "{\"hp\": 30}", fa: "‏{\"hp\": 30}" },
                    { en: "An error", fa: "یه خطا" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Two doors: [\"ana\"] opens the hero, [\"hp\"] reads the stat — 30.",
                    fa: "دو تا در: ‏[\"ana\"] قهرمان رو باز می‌کنه و [\"hp\"] آمار رو می‌خونه — ۳۰.",
                  },
                },
                {
                  q: { en: "Which line gives raj a shield of 5?", fa: "کدوم خط به raj سپرِ ۵ می‌ده؟" },
                  options: [
                    { en: "heroes[\"raj\"][\"shield\"] = 5", fa: "‏heroes[\"raj\"][\"shield\"] = 5" },
                    { en: "heroes[\"shield\"] = 5", fa: "‏heroes[\"shield\"] = 5" },
                    { en: "heroes[\"raj\"][\"shield\"] + 5", fa: "‏heroes[\"raj\"][\"shield\"] + 5" },
                    { en: "heroes[[\"raj\"]][\"shield\"] = 5", fa: "‏heroes[[\"raj\"]][\"shield\"] = 5" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The full chain, then = 5. Reading without the = does nothing — you must assign.",
                    fa: "اول زنجیرهٔ کامل، بعد = 5. خوندنِ بدون = هیچ کاری نمی‌کنه — باید انتساب بدی.",
                  },
                },
                {
                  q: { en: "Why does heroes[\"power\"] crash here?", fa: "چرا اینجا heroes[\"power\"] کرش می‌کنه؟" },
                  options: [
                    { en: "power belongs to the inner dicts, not the outer one", fa: "چون power مال دیکشنری‌های داخلیه، نه بیرونی" },
                    { en: "power is a reserved word", fa: "چون power کلمهٔ رزروشده‌ست" },
                    { en: "Dicts can only hold numbers", fa: "چون دیکشنری فقط عدد قبول می‌کنه" },
                    { en: "It doesn't crash at all", fa: "اصلاً کرش نمی‌کنه" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The outer dict maps names to heroes. Stats are one door deeper.",
                    fa: "دیکشنری بیرونی اسم‌ها رو به قهرمان‌ها نگاشت می‌کنه. آمارها یه طبقه پایین‌ترن.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Hero Registry 🛡", fa: "دفتر ثبت قهرمان‌ها 🛡" },
              brief: {
                en: "Start from heroes = {\"ana\": {\"hp\": 30, \"power\": 7}, \"raj\": {\"hp\": 24, \"power\": 9}}. Print exactly:\nana: 30 hp, power 7\nraj: 24 hp, power 9\nThen ana takes 8 damage (update her hp with the chain) and raj gets a shield: 5. Print the final two lines:\nAfter the hit: ana 22\nShield for raj: 5",
                fa: "با heroes = {\"ana\": {\"hp\": 30, \"power\": 7}, \"raj\": {\"hp\": 24, \"power\": 9}} شروع کن. دقیقاً چاپ کن:\nana: 30 hp, power 7\nraj: 24 hp, power 9\nبعد ana ‏۸ تا ضربه می‌خوره (‏hp رو با زنجیره به‌روز کن) و raj یه سپرِ ۵ می‌گیره. دو خط آخر رو چاپ کن:\nAfter the hit: ana 22\nShield for raj: 5",
              },
              starter: `heroes = {"ana": {"hp": 30, "power": 7}, "raj": {"hp": 24, "power": 9}}

# 1. pull hp and power out with the chain, then print both lines
# 2. hit: heroes["ana"]["hp"] = 30 - 8
# 3. shield: heroes["raj"]["shield"] = 5
# 4. print the last two lines — read the UPDATED values back
`,
              solution: `heroes = {"ana": {"hp": 30, "power": 7}, "raj": {"hp": 24, "power": 9}}

hp_a = heroes["ana"]["hp"]
pw_a = heroes["ana"]["power"]
hp_r = heroes["raj"]["hp"]
pw_r = heroes["raj"]["power"]
print(f"ana: {hp_a} hp, power {pw_a}")
print(f"raj: {hp_r} hp, power {pw_r}")

heroes["ana"]["hp"] = 22
heroes["raj"]["shield"] = 5

new_hp = heroes["ana"]["hp"]
new_sh = heroes["raj"]["shield"]
print(f"After the hit: ana {new_hp}")
print(f"Shield for raj: {new_sh}")`,
              hints: [
                {
                  en: "F-string holes can't hold brackets with quotes — put heroes[\"ana\"][\"hp\"] into a variable first, then print the variable.",
                  fa: "توی آکولادِ f-string نمی‌شه براکت با گیومه گذاشت — اول heroes[\"ana\"][\"hp\"] رو بریز توی یه متغیر، بعد متغیر رو چاپ کن.",
                },
                {
                  en: "The hit line is heroes[\"ana\"][\"hp\"] = 22 — one chain, one assignment.",
                  fa: "خط ضربه می‌شه heroes[\"ana\"][\"hp\"] = 22 — یه زنجیره، یه انتساب.",
                },
                {
                  en: "For the last two lines, read the values BACK from the dict — don't hardcode 22 and 5.",
                  fa: "برای دو خط آخر، مقدارها رو «دوباره از دیکشنری» بخون — ۲۲ و ۵ رو مستقیم توی متن ننویس.",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "ana: 30 hp, power 7\nraj: 24 hp, power 9\nAfter the hit: ana 22\nShield for raj: 5" }],
              },
              sample: { expect: "ana: 30 hp, power 7\nraj: 24 hp, power 9\nAfter the hit: ana 22\nShield for raj: 5" },
            },
          ],
        },
        {
          id: "py-m13-l2",
          title: { en: "A List of Records", fa: "لیستی از رکوردها" },
          goal: {
            en: "Loop a list of dicts and read each row's fields with record[\"key\"].",
            fa: "روی یه لیست از دیکشنری‌ها حلقه بزن و فیلدهای هر سطر رو با record[\"key\"] بخون.",
          },
          minutes: 15,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "When several things share the same fields, a LIST of dicts is the natural shape — like rows in a spreadsheet. Every element of the list is one record, and the loop hands you one record per pass.",
                  fa: "وقتی چند چیز فیلدهای یکسانی دارن، «لیست از دیکشنری» طبیعی‌ترین شکله — مثل سطرهای یه صفحهٔ گسترده. هر عضو لیست یه رکورده و حلقه توی هر دور، یه رکورد بهت می‌ده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `party = [{"name": "ana", "hp": 30}, {"name": "raj", "hp": 24}]
print(len(party))
first = party[0]
print(first["name"])
for r in party:
    print(r["name"], r["hp"])`,
                  caption: { en: "2, ana, then one line per hero — each pass, r IS one row.", fa: "‏۲ و بعد ana و بعد یه خط برای هر قهرمان — توی هر دور، همون r یه سطره." },
                },
                {
                  type: "tip",
                  en: "The loop variable r is a real dict — index it like any dict: r[\"hp\"]. Common names: r, row, record, item.",
                  fa: "متغیر حلقه r یه دیکشنری واقعیه — مثل هر دیکشنری دیگه روش اندیس بذار:‏ r[\"hp\"]. اسم‌های رایج: ‏r و row و record و item.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "Rows, not copy-paste", fa: "سطرها، نه کپی‌پیست" },
              blocks: [
                {
                  type: "text",
                  en: "Three heroes without this shape means hero1, hero2, hero3 and copy-pasted code. A list of dicts scales: len(party) counts rows, one loop serves them all, and an update inside the loop touches every row — r[\"hp\"] = r[\"hp\"] - 5 is a poison wave for the whole party.",
                  fa: "سه قهرمان بدون این شکل یعنی hero1 و hero2 و hero3 و کلی کپی‌پیست. لیستِ دیکشنری مقیاس می‌گیره:‏ len(party) سطرها رو می‌شماره، یه حلقه به همه سرویس می‌ده و یه به‌روزرسانی داخل حلقه به همه سطرها می‌رسه — ‏r[\"hp\"] = r[\"hp\"] - 5 یعنی یه موج سم برای کل پارتی.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `party = [{"name": "ana", "hp": 30}, {"name": "raj", "hp": 24}]
for r in party:
    r["hp"] = r["hp"] - 5
    print(r["name"], r["hp"])
print(party[1]["hp"])`,
                  caption: { en: "25 and 19 — the wave touched every row, and the changes stick.", fa: "‏۲۵ و ۱۹ — موج به همه سطرها رسید و تغییرها می‌مونن." },
                },
                {
                  type: "warn",
                  en: "party[\"hp\"] crashes — the LIST has no keys. First pick a row (party[0] or the loop variable), THEN a key.",
                  fa: "‏party[\"hp\"] کرش می‌کنه — ‏«لیست» کلید نداره. اول یه سطر بردار (‏party[0] یا متغیر حلقه) و بعد کلید.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "In for r in party: what does r hold on each pass?", fa: "توی for r in party: هر دور r چی رو نگه می‌داره؟" },
                  options: [
                    { en: "One dict — one record of the list", fa: "یه دیکشنری — یه رکورد از لیست" },
                    { en: "The whole list", fa: "کل لیست رو" },
                    { en: "A number", fa: "یه عدد رو" },
                    { en: "One key", fa: "یه کلید رو" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Walking a list gives its elements one by one — here, dicts.",
                    fa: "گشتن توی لیست یعنی عضوهای اون یکی‌یکی — اینجا، دیکشنری‌ها.",
                  },
                },
                {
                  q: { en: "How do you read the SECOND hero's hp?", fa: "‏hp قهرمان «دوم» رو چطوری می‌خونی؟" },
                  options: [
                    { en: "party[1][\"hp\"]", fa: "‏party[1][\"hp\"]" },
                    { en: "party[\"hp\"][1]", fa: "‏party[\"hp\"][1]" },
                    { en: "party.hp[1]", fa: "‏party.hp[1]" },
                    { en: "party[1](hp)", fa: "‏party[1](hp)" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Index first (which row), then key (which field) — party[1][\"hp\"].",
                    fa: "اول اندیس (کدوم سطر) بعد کلید (کدوم فیلد) — ‏party[1][\"hp\"].",
                  },
                },
                {
                  q: { en: "What does r[\"hp\"] = r[\"hp\"] - 5 do inside the loop?", fa: "‏r[\"hp\"] = r[\"hp\"] - 5 داخل حلقه چیکار می‌کنه؟" },
                  options: [
                    { en: "Lowers that row's hp by 5 — in the real list", fa: "‏hp همون سطر رو ۵ تا کم می‌کنه — توی لیست واقعی" },
                    { en: "Makes a backup copy", fa: "یه نسخهٔ پشتیبان می‌سازه" },
                    { en: "Renames the hp key", fa: "کلید hp رو تغییر اسم می‌ده" },
                    { en: "Deletes the row", fa: "سطر رو پاک می‌کنه" },
                  ],
                  answer: 0,
                  explain: {
                    en: "You're writing into the actual record — mutations stick after the loop.",
                    fa: "داری توی خود رکورد واقعی می‌نویسی — تغییرها بعد از حلقه هم می‌مونن.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Party Roster ⚔️", fa: "فهرست پارتی ⚔️" },
              brief: {
                en: "party = [{\"name\": \"ana\", \"hp\": 30, \"power\": 7}, {\"name\": \"raj\", \"hp\": 24, \"power\": 9}, {\"name\": \"kim\", \"hp\": 27, \"power\": 6}]. Print exactly:\nRoster:\nana: 30 hp (power 7)\nraj: 24 hp (power 9)\nkim: 27 hp (power 6)\nThen subtract 5 hp from EVERY hero and print:\nAfter the poison:\nana: 25 hp\nraj: 19 hp\nkim: 22 hp",
                fa: "‏party = [{\"name\": \"ana\", \"hp\": 30, \"power\": 7}, {\"name\": \"raj\", \"hp\": 24, \"power\": 9}, {\"name\": \"kim\", \"hp\": 27, \"power\": 6}]. دقیقاً چاپ کن:\nRoster:\nana: 30 hp (power 7)\nraj: 24 hp (power 9)\nkim: 27 hp (power 6)\nبعد از ‏hp همهٔ قهرمان‌ها ۵ تا کم کن و چاپ کن:\nAfter the poison:\nana: 25 hp\nraj: 19 hp\nkim: 22 hp",
              },
              starter: `party = [{"name": "ana", "hp": 30, "power": 7}, {"name": "raj", "hp": 24, "power": 9}, {"name": "kim", "hp": 27, "power": 6}]

# 1. print Roster: then one loop -> f"{name}: {hp} hp (power {pw})"
# 2. second loop: r["hp"] = r["hp"] - 5 for every row
# 3. print After the poison: then one loop -> f"{name}: {hp} hp"
#    (no power in the second block!)
`,
              solution: `party = [{"name": "ana", "hp": 30, "power": 7}, {"name": "raj", "hp": 24, "power": 9}, {"name": "kim", "hp": 27, "power": 6}]

print("Roster:")
for r in party:
    name = r["name"]
    hp = r["hp"]
    pw = r["power"]
    print(f"{name}: {hp} hp (power {pw})")

for r in party:
    r["hp"] = r["hp"] - 5

print("After the poison:")
for r in party:
    name = r["name"]
    hp = r["hp"]
    print(f"{name}: {hp} hp")`,
              hints: [
                {
                  en: "Two loops are perfectly fine — one shows the roster, one applies the poison. Clarity beats cleverness.",
                  fa: "دو تا حلقه کاملاً درسته — یکی فهرست رو نشون می‌ده، یکی سم رو می‌پاشه. شفافیت از زیرکی مهم‌تره.",
                },
                {
                  en: "The second block has NO power — just name and hp.",
                  fa: "بخش دوم «power نداره» — فقط اسم و hp.",
                },
                {
                  en: "Pull name/hp/pw into variables first, then print — the house pattern.",
                  fa: "اول name و hp و pw رو بریز توی متغیر، بعد چاپ کن — همون الگوی همیشگی.",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "Roster:\nana: 30 hp (power 7)\nraj: 24 hp (power 9)\nkim: 27 hp (power 6)\nAfter the poison:\nana: 25 hp\nraj: 19 hp\nkim: 22 hp" }],
              },
              sample: { expect: "Roster:\nana: 30 hp (power 7)\nraj: 24 hp (power 9)\nkim: 27 hp (power 6)\nAfter the poison:\nana: 25 hp\nraj: 19 hp\nkim: 22 hp" },
            },
          ],
        },
        {
          id: "py-m13-l3",
          title: { en: "Loops Inside Loops", fa: "حلقه توی حلقه" },
          goal: {
            en: "Walk three levels of nesting: list → dict → list, with one loop per level.",
            fa: "سه طبقه تودرتو رو بگرد: لیست → دیکشنری → لیست، برای هر طبقه یه حلقه.",
          },
          minutes: 16,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Give every hero a bag: a list INSIDE the dict INSIDE the list — three levels deep. The outer loop walks the party and hands you a record; the inner loop walks r[\"bag\"] and hands you one item at a time.",
                  fa: "به هر قهرمان یه کیسه بده: یه لیست «داخل» دیکشنری «داخل» لیست — سه طبقه عمق. حلقهٔ بیرونی پارتی رو می‌گرده و رکورد بهت می‌ده؛ حلقهٔ داخلی r[\"bag\"] رو می‌گرده و یکی‌یکی آیتم می‌ده.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `party = [{"name": "ana", "bag": ["sword", "potion"]}, {"name": "raj", "bag": ["bow", "rope"]}]
for r in party:
    print(r["name"] + " carries:")
    for item in r["bag"]:
        print(" - " + item)`,
                  caption: { en: "ana's two items, then raj's two — one header line per hero.", fa: "دو آیتم ana و بعد دو آیتم raj — برای هر قهرمان یه خط سربرگ." },
                },
                {
                  type: "tip",
                  en: "Indentation is the map: the inner for lives INSIDE the outer for, so everything it prints belongs to the current hero.",
                  fa: "تورفتگی نقشهٔ راهه: ‏for داخلی «داخل» for بیرونی زندگی می‌کنه، پس هر چی چاپ می‌کنه مال قهرمانِ همون لحظه‌ست.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The counter above the storm", fa: "شمارندهٔ بالای طوفان" },
              blocks: [
                {
                  type: "text",
                  en: "Want the TOTAL loot? Set total = 0 BEFORE the outer loop, add 1 inside the inner loop, and print after BOTH loops finish. The counter sits above the storm, calmly watching every bag go by.",
                  fa: "جمع «کل» غنیمت رو می‌خوای؟ ‏total = 0 رو «قبل از» حلقهٔ بیرونی بذار، داخل حلقهٔ داخلی یکی‌یکی اضافه کن و بعد از تموم شدن «هر دو» حلقه چاپش کن. شمارنده بالای طوفان می‌شینه و آروم همهٔ کیسه‌ها رو تماشا می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `party = [{"name": "ana", "bag": ["sword", "potion"]}, {"name": "raj", "bag": ["bow"]}]
total = 0
for r in party:
    for item in r["bag"]:
        total += 1
print(f"Loot: {total} items")`,
                  caption: { en: "3 items — one counter watched every single bag.", fa: "‏۳ آیتم — یه شمارنده همهٔ کیسه‌ها رو دید." },
                },
                {
                  type: "warn",
                  en: "total = 0 goes before the FIRST for. Put it inside the outer loop and every hero restarts from zero.",
                  fa: "‏total = 0 باید قبل از «اولین» for باشه. اگه بذاریش داخل حلقهٔ بیرونی، هر قهرمان از صفر شروع می‌کنه.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "Bags of 2 and 1 items: how many times does the inner print(\" - \" + item) run?", fa: "کیسه‌های ۲ و ۱ آیتمی: چاپ داخلی چند بار اجرا می‌شه؟" },
                  options: [
                    { en: "3 — once per item", fa: "۳ — برای هر آیتم یه بار" },
                    { en: "2 — once per hero", fa: "۲ — برای هر قهرمان یه بار" },
                    { en: "1 — only the first item", fa: "۱ — فقط آیتم اول" },
                    { en: "0 — inner loops don't run", fa: "۰ — حلقهٔ داخلی اجرا نمی‌شه" },
                  ],
                  answer: 0,
                  explain: {
                    en: "The inner loop runs once per ITEM — 2 bags' items total: 2 + 1 = 3.",
                    fa: "حلقهٔ داخلی برای هر «آیتم» یه بار می‌چرخه — جمع آیتم‌ها: ‏۲ + ۱ = ۳.",
                  },
                },
                {
                  q: { en: "Why does total = 0 sit BEFORE the outer loop?", fa: "چرا total = 0 قبل از حلقهٔ بیرونیه؟" },
                  options: [
                    { en: "So it counts ALL bags instead of restarting per hero", fa: "که «همهٔ» کیسه‌ها رو بشماره، نه اینکه هر بار از صفر شروع کنه" },
                    { en: "Because for requires a variable above it", fa: "چون for متغیر بالای سرش رو الزامی می‌دونه" },
                    { en: "To make the loop faster", fa: "که حلقه سریع‌تر بشه" },
                    { en: "It doesn't matter where it goes", fa: "جاش اصلاً مهم نیست" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Inside the loop it resets every pass — outside, it accumulates the whole trip.",
                    fa: "داخل حلقه هر دور ریست می‌شه — بیرون حلقه، کل سفر رو جمع می‌کنه.",
                  },
                },
                {
                  q: { en: "In the inner loop, what does item hold?", fa: "توی حلقهٔ داخلی، ‏item چی رو نگه می‌داره؟" },
                  options: [
                    { en: "One item string from that hero's bag", fa: "یه رشتهٔ آیتم از کیسهٔ همون قهرمان" },
                    { en: "The whole bag list", fa: "کل لیست کیسه رو" },
                    { en: "The hero's name", fa: "اسم قهرمان رو" },
                    { en: "A number", fa: "یه عدد رو" },
                  ],
                  answer: 0,
                  explain: {
                    en: "for item in r[\"bag\"] walks a LIST of strings — item is one string.",
                    fa: "‏for item in r[\"bag\"] روی یه لیست رشته راه می‌ره — ‏item یه رشته‌ست.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "The Loot Report 🎒", fa: "گزارش غنیمت 🎒" },
              brief: {
                en: "party = [{\"name\": \"ana\", \"bag\": [\"sword\", \"potion\"]}, {\"name\": \"raj\", \"bag\": [\"bow\", \"rope\"]}, {\"name\": \"kim\", \"bag\": [\"shield\", \"apple\", \"key\"]}]. For each hero print \"name: N items\", then each item on its own \" - item\" line. End with the grand total:\nana: 2 items\n - sword\n - potion\nraj: 2 items\n - bow\n - rope\nkim: 3 items\n - shield\n - apple\n - key\nLoot: 7 items",
                fa: "‏party = [{\"name\": \"ana\", \"bag\": [\"sword\", \"potion\"]}, {\"name\": \"raj\", \"bag\": [\"bow\", \"rope\"]}, {\"name\": \"kim\", \"bag\": [\"shield\", \"apple\", \"key\"]}]. برای هر قهرمان چاپ کن \"name: N items\" و بعد هر آیتم رو توی یه خط جدا به شکل \" - item\". آخرش جمع کل:\nana: 2 items\n - sword\n - potion\nraj: 2 items\n - bow\n - rope\nkim: 3 items\n - shield\n - apple\n - key\nLoot: 7 items",
              },
              starter: `party = [{"name": "ana", "bag": ["sword", "potion"]}, {"name": "raj", "bag": ["bow", "rope"]}, {"name": "kim", "bag": ["shield", "apple", "key"]}]

# 1. total = 0 BEFORE the outer loop
# 2. outer loop: name + count = len(r["bag"]) -> print f"{name}: {count} items"
# 3. inner loop: print " - " + item  AND total += 1
# 4. after both loops: print f"Loot: {total} items"
`,
              solution: `party = [{"name": "ana", "bag": ["sword", "potion"]}, {"name": "raj", "bag": ["bow", "rope"]}, {"name": "kim", "bag": ["shield", "apple", "key"]}]

total = 0
for r in party:
    name = r["name"]
    count = len(r["bag"])
    print(f"{name}: {count} items")
    for item in r["bag"]:
        print(" - " + item)
        total += 1

print(f"Loot: {total} items")`,
              hints: [
                {
                  en: "len(r[\"bag\"]) gives the item count for the header line — no manual counting.",
                  fa: "‏len(r[\"bag\"]) تعداد آیتم‌ها رو برای خط سربرگ می‌ده — لازم نیست دستی بشماری.",
                },
                {
                  en: "The \" - \" line and total += 1 share the SAME inner loop body — two lines, one pass.",
                  fa: "خط \" - \" و ‏total += 1 توی «یه» بدنهٔ حلقهٔ داخلی هستن — دو خط، یه دور.",
                },
                {
                  en: "The Loot line comes after BOTH loops — at the same indentation as the outer for.",
                  fa: "خط Loot بعد از «هر دو» حلقه میاد — هم‌سطح for بیرونی.",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "ana: 2 items\n - sword\n - potion\nraj: 2 items\n - bow\n - rope\nkim: 3 items\n - shield\n - apple\n - key\nLoot: 7 items" }],
              },
              sample: { expect: "ana: 2 items\n - sword\n - potion\nraj: 2 items\n - bow\n - rope\nkim: 3 items\n - shield\n - apple\n - key\nLoot: 7 items" },
            },
          ],
        },
        {
          id: "py-m13-l4",
          title: { en: "Level Up the Whole Party", fa: "پارتی کامل رو ارتقا بده" },
          goal: {
            en: "Mutate nested records through functions, then run a champion search over the results.",
            fa: "رکوردهای تودرتو رو با تابع تغییر بده و بعد روی نتیجه‌ها جستجوی قهرمان بنداز.",
          },
          minutes: 17,
          steps: [
            {
              kind: "theory",
              blocks: [
                {
                  type: "text",
                  en: "Functions + nested data: pass ONE record (a dict) into a function and let it mutate that record — heal(r, amount) bumps r[\"hp\"]. There's no copy: r inside the function IS the dict inside the list, exactly like the Mini Library in m12.",
                  fa: "تابع + دادهٔ تودرتو: یه «رکورد» (دیکشنری) رو بفرست توی تابع و بذار همون رکورد رو تغییر بده — ‏heal(r, amount) به r[\"hp\"] اضافه می‌کنه. کپی‌ای در کار نیست: اون r داخل تابع، همون دیکشنریِ داخل لیسته — دقیقاً مثل کتابخانهٔ کوچک ماژول ۱۲.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def heal(r, amount):
    r["hp"] = r["hp"] + amount

party = [{"name": "ana", "hp": 25}, {"name": "raj", "hp": 19}]
heal(party[0], 10)
print(party[0]["hp"])
print(party[1]["hp"])`,
                  caption: { en: "35, then 19 — only ana drank the potion.", fa: "‏۳۵ و بعد ۱۹ — فقط ana معجون رو خورد." },
                },
                {
                  type: "tip",
                  en: "A mutating function needs no return — its power IS the change it leaves behind. Call it, and the list is already different.",
                  fa: "تابعی که تغییر می‌ده به return نیازی نداره — قدرتش همون تغییری‌ست که جا می‌ذاره. صداش بزن و لیست از اون لحظه فرق کرده.",
                },
              ],
            },
            {
              kind: "theory",
              title: { en: "The full routine", fa: "روتین کامل" },
              blocks: [
                {
                  type: "text",
                  en: "Now combine: loop the party, call heal(r, 10), call buff(r) for +2 power, and print one status line per hero. Two tiny functions, one loop — the whole party upgraded in four clean moves. Then a champion race over r[\"power\"] finds the MVP.",
                  fa: "حالا ترکیب کن: روی پارتی حلقه بزن، ‏heal(r, 10) رو صدا بزن، بعد buff(r) رو برای ‏+2 قدرت و برای هر قهرمان یه خط وضعیت چاپ کن. دو تابع کوچیک، یه حلقه — کل پارتی با چهار حرکت تمیز ارتقا می‌گیره. بعدش یه مسابقهٔ قهرمانی روی r[\"power\"] ‏MVP رو پیدا می‌کنه.",
                },
                {
                  type: "code",
                  lang: "python",
                  code: `def heal(r, amount):
    r["hp"] = r["hp"] + amount

def buff(r):
    r["power"] = r["power"] + 2

party = [{"name": "ana", "hp": 25, "power": 7}, {"name": "raj", "hp": 19, "power": 9}]
for r in party:
    heal(r, 10)
    buff(r)
    name = r["name"]
    hp = r["hp"]
    pw = r["power"]
    print(f"{name}: {hp} hp, power {pw}")`,
                  caption: { en: "Both heroes upgraded, both lines printed — small functions, big machine.", fa: "هر دو قهرمان ارتقا گرفتن و هر دو خط چاپ شدن — تابع‌های کوچیک، ماشین بزرگ." },
                },
                {
                  type: "warn",
                  en: "Call the functions with the loop variable r — heal(party, 10) would heal... nothing. A list is not a record.",
                  fa: "توابع رو با متغیر حلقه یعنی r صدا بزن — ‏heal(party, 10) عملاً هیچی رو شفا نمی‌ده. لیست، رکورد نیست.",
                },
              ],
            },
            {
              kind: "quiz",
              questions: [
                {
                  q: { en: "What does heal(party[0], 10) actually change?", fa: "‏heal(party[0], 10) دقیقاً چی رو عوض می‌کنه؟" },
                  options: [
                    { en: "The first dict inside the list — for real", fa: "اولین دیکشنری داخل لیست رو — واقعاً" },
                    { en: "A copy inside the function", fa: "یه کپی رو داخل تابع" },
                    { en: "Nothing — without return nothing happens", fa: "هیچی — بدون return اتفاقی نمی‌افته" },
                    { en: "The list's length", fa: "طول لیست رو" },
                  ],
                  answer: 0,
                  explain: {
                    en: "party[0] hands the function the REAL record — mutations stick.",
                    fa: "‏party[0] رکورد «واقعی» رو به تابع می‌ده — تغییرها می‌مونن.",
                  },
                },
                {
                  q: { en: "Why call buff(r) inside the loop?", fa: "چرا buff(r) رو داخل حلقه صدا می‌زنیم؟" },
                  options: [
                    { en: "So it runs once per hero", fa: "که برای هر قهرمان یه بار اجرا بشه" },
                    { en: "So it runs only once in total", fa: "که فقط یه بار در کل اجرا بشه" },
                    { en: "So it only touches the last hero", fa: "که فقط آخرین قهرمان رو بگیره" },
                    { en: "To reset the power", fa: "که قدرت ریست بشه" },
                  ],
                  answer: 0,
                  explain: {
                    en: "Anything inside the loop body runs once per pass — every hero gets buffed.",
                    fa: "هر چی توی بدنهٔ حلقه باشه، هر دور یه بار اجرا می‌شه — به همه قهرمان‌ها باف می‌خوره.",
                  },
                },
                {
                  q: { en: "What does heal() return?", fa: "‏heal چی برمی‌گردونه؟" },
                  options: [
                    { en: "None — it mutates instead of returning", fa: "‏None — به‌جای برگردوندن، تغییر می‌ده" },
                    { en: "The new hp", fa: "‏hp جدید رو" },
                    { en: "The amount", fa: "مقدار amount رو" },
                    { en: "The whole party", fa: "کل پارتی رو" },
                  ],
                  answer: 0,
                  explain: {
                    en: "No return statement → the call gives None. Its effect lives in the record.",
                    fa: "بدون return → نتیجهٔ صدا زدن None می‌شه. اثرش توی رکورده.",
                  },
                },
              ],
            },
            {
              kind: "challenge",
              title: { en: "Battle Prep 🧪", fa: "آماده‌سازی نبرد 🧪" },
              brief: {
                en: "party = [{\"name\": \"ana\", \"hp\": 30, \"power\": 7}, {\"name\": \"raj\", \"hp\": 24, \"power\": 9}, {\"name\": \"kim\", \"hp\": 27, \"power\": 6}]. Write heal(r, amount) and buff(r) (power +2). Give EVERY hero heal 10 + buff, then print one line per hero, and finally the MVP (highest power):\nana: 40 hp, power 9\nraj: 34 hp, power 11\nkim: 37 hp, power 8\nMVP: raj (11)",
                fa: "‏party = [{\"name\": \"ana\", \"hp\": 30, \"power\": 7}, {\"name\": \"raj\", \"hp\": 24, \"power\": 9}, {\"name\": \"kim\", \"hp\": 27, \"power\": 6}]. تابع heal(r, amount) و buff(r) ‏(+2 قدرت) رو بنویس. به «همهٔ» قهرمان‌ها ‏heal با ۱۰ و buff بده، بعد برای هر قهرمان یه خط چاپ کن و آخرش MVP رو بیار (بیشترین قدرت):\nana: 40 hp, power 9\nraj: 34 hp, power 11\nkim: 37 hp, power 8\nMVP: raj (11)",
              },
              starter: `party = [{"name": "ana", "hp": 30, "power": 7}, {"name": "raj", "hp": 24, "power": 9}, {"name": "kim", "hp": 27, "power": 6}]

# 1. def heal(r, amount): r["hp"] = r["hp"] + amount
# 2. def buff(r): r["power"] = r["power"] + 2
# 3. one loop: heal(r, 10), buff(r), print f"{name}: {hp} hp, power {pw}"
# 4. champion race on power -> print f"MVP: {best_name} ({best_pw})"
`,
              solution: `party = [{"name": "ana", "hp": 30, "power": 7}, {"name": "raj", "hp": 24, "power": 9}, {"name": "kim", "hp": 27, "power": 6}]

def heal(r, amount):
    r["hp"] = r["hp"] + amount

def buff(r):
    r["power"] = r["power"] + 2

for r in party:
    heal(r, 10)
    buff(r)
    name = r["name"]
    hp = r["hp"]
    pw = r["power"]
    print(f"{name}: {hp} hp, power {pw}")

best_name = ""
best_pw = 0
for r in party:
    if r["power"] > best_pw:
        best_pw = r["power"]
        best_name = r["name"]

print(f"MVP: {best_name} ({best_pw})")`,
              hints: [
                {
                  en: "Both function calls go inside the loop, BEFORE the print — heal, buff, then show.",
                  fa: "هر دو صدا زدن تابع داخل حلقه و «قبل از» چاپه — اول heal و buff، بعد نشون بده.",
                },
                {
                  en: "MVP is the m15 champion race: best_pw = 0, then if r[\"power\"] > best_pw: remember it.",
                  fa: "‏MVP همون مسابقهٔ قهرمانیه: ‏best_pw = 0 و بعد ‏if r[\"power\"] > best_pw: یادش بگیر.",
                },
                {
                  en: "MVP uses the UPDATED power — raj is 9 + 2 = 11, not 9.",
                  fa: "‏MVP از قدرت «به‌روز شده» استفاده می‌کنه — ‏raj می‌شه ۹ + ۲ یعنی ۱۱، نه ۹.",
                },
              ],
              check: {
                kind: "py",
                tests: [{ expect: "ana: 40 hp, power 9\nraj: 34 hp, power 11\nkim: 37 hp, power 8\nMVP: raj (11)" }],
              },
              sample: { expect: "ana: 40 hp, power 9\nraj: 34 hp, power 11\nkim: 37 hp, power 8\nMVP: raj (11)" },
            },
          ],
        },
      ],
    },
    // ─── Modules 14–19 (Task 17) ──────────────────────────────
    ...pyModulesC,
    ...pyModulesD,
  ],
};
