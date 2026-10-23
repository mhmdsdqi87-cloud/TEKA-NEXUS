// TEKA NEXUS — TEKA OS internal bilingual string catalog.
// Chrome-level strings (app titles, buttons, status bar) live in the six
// i18n dictionaries under `os.*`. App-internal content strings live here as
// {fa, en} pairs and resolve with pickL() — same pattern as Academy content.

export type L2 = { fa: string; en: string };

/** Resolve like the Academy: Persian for fa locale, English otherwise. */
export function pickL(l: L2, locale: string): string {
  return locale === "fa" && l.fa ? l.fa : l.en;
}

export const OS_STRINGS = {
  // ── CODE PET ──────────────────────────────────────────────
  pet: {
    tagline: { fa: "یار دیجیتالی که با یادگیری‌ات بزرگ می‌شود", en: "A digital buddy that grows as you learn" },
    stage0: { fa: "تخم", en: "Egg" },
    stage1: { fa: "بچه", en: "Baby" },
    stage2: { fa: "نوجوان", en: "Teen" },
    stage3: { fa: "بالغ", en: "Adult" },
    stage4: { fa: "افسانه‌ای", en: "Legendary" },
    hatch: { fa: "باز کردن تخم", en: "Hatch the egg" },
    hatchHint: { fa: "برای باز کردن تخم، اول یک درس را تمام کن", en: "Finish one lesson to hatch the egg" },
    feed: { fa: "غذا دادن", en: "Feed" },
    play: { fa: "بازی کردن", en: "Play" },
    rename: { fa: "تغییر نام", en: "Rename" },
    namePlaceholder: { fa: "اسمش را بنویس…", en: "Type a name…" },
    hunger: { fa: "سیری", en: "Fullness" },
    evolution: { fa: "تکامل", en: "Evolution" },
    feedsCount: { fa: "وعده غذایی", en: "meals" },
    hungry: { fa: "گرسنه است! غذا بده 🍽️", en: "Hungry! Feed me 🍽️" },
    sad: { fa: "دلتنگ شده… سر بزن", en: "Feeling lonely… visit me" },
    happy: { fa: "حالش عالی است!", en: "Feeling great!" },
    full: { fa: "سیر است؛ بعداً غذا بده", en: "Full right now — check back later" },
    fedToast: { fa: "خورد و خوشحال شد! (+۸ XP)", en: "Yum! It's happy (+8 XP)" },
    playToast: { fa: "بازی کردید! (+۵ XP، یک‌بار در روز)", en: "Playtime! (+5 XP, once a day)" },
    evolvedToast: { fa: "همراهت تکامل پیدا کرد! 🎉", en: "Your buddy evolved! 🎉" },
    stageHint: {
      fa: "با غذا دادن و تمام کردن درس‌ها رشد می‌کند: تخم → بچه → نوجوان → بالغ → افسانه‌ای",
      en: "Feeding and finishing lessons makes it grow: egg → baby → teen → adult → legendary",
    },
  },

  // ── BOSS ARENA ────────────────────────────────────────────
  boss: {
    tagline: { fa: "باس‌های آکادمی را بشکاسن؛ عنوان قهرمانی بگیر", en: "Fight Academy bosses; earn champion titles" },
    allBosses: { fa: "همه باس‌ها", en: "All bosses" },
    lockedHint: { fa: "برای باز شدن باس، همه درس‌های این ماژول را کامل کن", en: "Finish every lesson of this module to unlock the boss" },
    start: { fa: "شروع مبارزه", en: "Start the fight" },
    attack: { fa: "حمله!", en: "Attack!" },
    hp: { fa: "جان", en: "HP" },
    yourHp: { fa: "جان تو", en: "Your HP" },
    question: { fa: "سؤال", en: "Question" },
    hit: { fa: "ضربه زدی!", en: "A solid hit!" },
    miss: { fa: "از دست داد! −۳۴ جان", en: "Missed! −34 HP" },
    won: { fa: "باس شکست خورد! 🎉", en: "Boss defeated! 🎉" },
    lost: { fa: "باس تو را شکست داد… دوباره تلاش کن", en: "The boss won… try again" },
    retry: { fa: "مبارزه دوباره", en: "Fight again" },
    titleEarned: { fa: "عنوان جدید: {title}", en: "New title: {title}" },
    finalBadge: { fa: "باس نهایی", en: "FINAL BOSS" },
    cardEarned: { fa: "کارت کلکسیونی گرفتی! 🃏", en: "You got a collectible card! 🃏" },
    xpEarned: { fa: "+{xp} XP (شامل ضریب ایونت)", en: "+{xp} XP (event multiplier applied)" },
    liveTaunt: { fa: "باس می‌گوید:", en: "The boss says:" },
  },

  // ── SKILL TREE ────────────────────────────────────────────
  tree: {
    tagline: { fa: "نقشه کهکشانی مهارت‌هایت — همان رزومه گیمیفای‌شده", en: "Your galaxy map of skills — a gamified résumé" },
    legendModule: { fa: "ماژول درس", en: "Module" },
    legendBoss: { fa: "باس", en: "Boss" },
    legendFinal: { fa: "باس نهایی", en: "Final boss" },
    legendSpecial: { fa: "مأموریت ویژه", en: "Special" },
    stateDone: { fa: "کامل", en: "Done" },
    stateOpen: { fa: "آماده", en: "Ready" },
    stateLocked: { fa: "قفل", en: "Locked" },
    progress: { fa: "{done} از {total} نود کامل شده", en: "{done} of {total} nodes complete" },
    openModule: { fa: "برو به درس‌ها", en: "Open lessons" },
    openBoss: { fa: "برو به باس", en: "Fight the boss" },
  },

  // ── RED vs BLUE WAR ───────────────────────────────────────
  war: {
    tagline: { fa: "جنگ هفتگی قرمز در برابر آبی — طرفت را انتخاب کن", en: "The weekly Red vs Blue war — pick your side" },
    red: { fa: "تیم قرمز", en: "Red Team" },
    blue: { fa: "تیم آبی", en: "Blue Team" },
    chooseRed: { fa: "می‌جنگم برای قرمز", en: "Fight for Red" },
    chooseBlue: { fa: "می‌جنگم برای آبی", en: "Fight for Blue" },
    week: { fa: "هفته {week}", en: "Week {week}" },
    score: { fa: "امتیاز تیم‌ها", en: "Team score" },
    yourContribution: { fa: "سهم تو این هفته", en: "Your contribution this week" },
    tasks: { fa: "مأموریت‌های هفته", en: "Weekly missions" },
    taskLesson: { fa: "۳ درس این هفته تمام کن", en: "Finish 3 lessons this week" },
    taskBoss: { fa: "یک باس را شکست بده", en: "Defeat one boss" },
    taskPet: { fa: "به همراهت غذا بده", en: "Feed your pet" },
    taskCrime: { fa: "یک پرونده جنایی را حل کن", en: "Solve one crime case" },
    taskSpeedrun: { fa: "یک اسپیدران ثبت کن", en: "Log one speedrun" },
    done: { fa: "انجام شد", en: "Done" },
    todo: { fa: "باقی‌مانده", en: "To do" },
    points: { fa: "{n} امتیاز", en: "{n} points" },
    enlisted: { fa: "به میدان آمدی! +۵ امتیاز", en: "You're enlisted! +5 points" },
    topWarriors: { fa: "قهرمانان هفته", en: "Warriors of the week" },
    switchTeamHint: { fa: "تیم فقط یک‌بار انتخاب می‌شود — مثل وفاداری!", en: "You pick your side once — like loyalty!" },
  },

  // ── CODER CARDS ───────────────────────────────────────────
  cards: {
    tagline: { fa: "کارت‌های کلکسیونی با شماره سریال یکتا", en: "Collectible cards with unique serial numbers" },
    collection: { fa: "کلکسیون تو", en: "Your collection" },
    trade: { fa: "ترید", en: "Trade" },
    tradeWith: { fa: "با کدام کاربر؟ (نام کاربری)", en: "Trade with whom? (username)" },
    tradeSend: { fa: "ارسال پیشنهاد", en: "Send offer" },
    incoming: { fa: "پیشنهادهای دریافتی", en: "Incoming offers" },
    accept: { fa: "بپذیر", en: "Accept" },
    decline: { fa: "رد کن", en: "Decline" },
    sent: { fa: "پیشنهاد فرستاده شد", en: "Offer sent" },
    traded: { fa: "ترید انجام شد!", en: "Trade complete!" },
    howToEarn: { fa: "چطور کارت بگیرم؟", en: "How to earn cards" },
    serial: { fa: "سریال", en: "Serial" },
    mintedAt: { fa: "ضرب در", en: "Minted" },
    empty: { fa: "هنوز کارتی نداری — با شروع مبارزه با باس‌ها اولین کارتت را بگیر!", en: "No cards yet — start a boss fight to earn your first one!" },
  },

  // ── COIN SHOP ─────────────────────────────────────────────
  shop: {
    tagline: { fa: "سکه‌هایت را خرج کن؛ استایلت را عوض کن", en: "Spend your coins; restyle your profile" },
    balance: { fa: "موجودی", en: "Balance" },
    buy: { fa: "خرید", en: "Buy" },
    equipped: { fa: "در حال استفاده", en: "Equipped" },
    equip: { fa: "استفاده", en: "Equip" },
    owned: { fa: "خریده‌شده", en: "Owned" },
    notEnough: { fa: "سکه کافی نداری!", en: "Not enough coins!" },
    bought: { fa: "خریدی! 🛍️", en: "Purchased! 🛍️" },
    frames: { fa: "قاب پروفایل", en: "Profile frames" },
    earnHint: { fa: "کسب سکه: باس +۱۰۰ · پرونده +۸۰ · اسپیدران +۶۰ · درس +۵ · مأموریت جنگ +۲۵", en: "Earn coins: boss +100 · crime +80 · speedrun +60 · lesson +5 · war mission +25" },
  },

  // ── CRIME LAB ─────────────────────────────────────────────
  crime: {
    tagline: { fa: "پرونده‌های جنایی سایبری را با تحلیل مدارک حل کن", en: "Solve cyber crime cases by analyzing evidence" },
    solvedBadge: { fa: "حل شد", en: "Solved" },
    caseOf: { fa: "سرنخ {i} از {n}", en: "Clue {i} of {n}" },
    evidence: { fa: "مدرک", en: "Evidence" },
    submit: { fa: "ثبت پاسخ", en: "Submit answer" },
    correct: { fa: "درست است! ✅", en: "Correct! ✅" },
    wrong: { fa: "اشتباه بود — دوباره فکر کن", en: "Not quite — think again" },
    closed: { fa: "پرونده بسته شد! 🏅", en: "Case closed! 🏅" },
    reward: { fa: "جایزه: +۱۲۰ XP، +۸۰ سکه، کارت کارآگاه", en: "Reward: +120 XP, +80 coins, a detective card" },
    restart: { fa: "بازخوانی پرونده", en: "Revisit case" },
  },

  // ── TIME MACHINE ──────────────────────────────────────────
  timemachine: {
    tagline: { fa: "سفر در زمان: کل مسیر یادگیری‌ات را دوباره ببین", en: "Time travel: replay your whole learning journey" },
    play: { fa: "پخش سفر", en: "Play journey" },
    stop: { fa: "توقف", en: "Stop" },
    dayX: { fa: "روز {n}", en: "Day {n}" },
    empty: { fa: "هنوز خط زمانی‌ات خالی است — از فید و آکادمی شروع کن!", en: "Your timeline is empty — start from the feed and the academy!" },
    journeyOf: { fa: "سفر {name}", en: "{name}'s journey" },
  },

  // ── HEATMAP ───────────────────────────────────────────────
  heatmap: {
    tagline: { fa: "گرید فعالیت تو — مثل گیت‌هاب، ولی خفن‌تر", en: "Your activity grid — like GitHub, but cooler" },
    lastYear: { fa: "یک سال گذشته", en: "Last 12 months" },
    total: { fa: "مجموع فعالیت‌ها: {n}", en: "Total activity: {n}" },
    legendLess: { fa: "کم", en: "Less" },
    legendMore: { fa: "زیاد", en: "More" },
    empty: { fa: "هنوز فعالیتی نیست — یک درس را تمام کن تا خانه‌ها سبز شوند!", en: "No activity yet — finish a lesson to make the squares green!" },
  },

  // ── SPEEDRUN ──────────────────────────────────────────────
  speedrun: {
    tagline: { fa: "کرونومتر جهانی: ماژول را با بهترین زمان تمام کن", en: "The global timer: clear a module with your best time" },
    pick: { fa: "دوره و ماژول را انتخاب کن", en: "Pick a course and module" },
    start: { fa: "شروع تایمر", en: "Start timer" },
    running: { fa: "در حال اجرا…", en: "Running…" },
    finish: { fa: "پایان", en: "Finish" },
    finishHint: { fa: "برای پایان معتبر، همه درس‌های ماژول باید کامل باشند", en: "All module lessons must be complete for a valid finish" },
    yourBest: { fa: "رکورد تو", en: "Your best" },
    leaderboard: { fa: "جدول رکوردها", en: "Leaderboard" },
    newRecord: { fa: "رکورد جدید ثبت شد! 🏎️", en: "New record set! 🏎️" },
    tooFast: { fa: "این زمان واقعی نیست — تایمر معتبر نیست", en: "That time is not humanly possible — timer voided" },
    requiresLessons: { fa: "اول همه درس‌های ماژول را کامل کن", en: "Complete all module lessons first" },
  },

  // ── VOICE ROOMS ───────────────────────────────────────────
  voice: {
    tagline: { fa: "اتاق‌های صوتی زنده — مثل کلاب‌هاوس برای کدرها", en: "Live voice rooms — like Clubhouse for coders" },
    join: { fa: "ورود", en: "Join" },
    leave: { fa: "خروج", en: "Leave" },
    create: { fa: "اتاق جدید", en: "New room" },
    roomName: { fa: "موضوع اتاق…", en: "Room topic…" },
    participants: { fa: "حاضران", en: "Participants" },
    holdToTalk: { fa: "برای حرف زدن نگه دار", en: "Hold to talk" },
    speaking: { fa: "در حال صحبت…", en: "Speaking…" },
    micDenied: { fa: "دسترسی میکروفون داده نشد", en: "Microphone access denied" },
    connected: { fa: "وصل شدی", en: "Connected" },
    offlineHint: { fa: "سرویس صوتی روشن نیست — بعداً سر بزن", en: "Voice service is offline — check back soon" },
    roomEmpty: { fa: "هیچ اتاق فعالی نیست — اولین اتاق را بساز!", en: "No live rooms — create the first one!" },
  },

  // ── TERMINAL ──────────────────────────────────────────────
  terminal: {
    banner1: { fa: "TEKA OS TERMINAL v1.0 — «هر دستوری، یه قدرت»", en: "TEKA OS TERMINAL v1.0 — every command, a power" },
    banner2: { fa: "برای دیدن دستورها بنویس: help", en: "Type help to list commands" },
    unknown: { fa: "دستور ناشناخته: {cmd} — با help لیست را ببین", en: "Unknown command: {cmd} — try help" },
    hintSecret: { fa: "پ.ن: یه دستور مخفی sudo هم هست…", en: "P.S. there is a secret sudo command…" },
  },
} as const;
