// Task 23 i18n migration:
// 1) trim os.ts to apps+common (chrome keys are dead with the OS desktop)
// 2) create arena.ts (hub + blurbs) per locale
// 3) wire arena into each locale's index.ts
import { readFileSync, writeFileSync } from "node:fs";

const OS_TRIMMED: Record<string, string> = {
  en: `// TEKA NEXUS — os dictionary (en): game titles + shared app strings (Task 23).
export const os = {
  apps: { academy: "Academy", terminal: "Terminal", pet: "Code Pet", boss: "Boss Arena", tree: "Skill Tree", war: "Red vs Blue", cards: "Coder Cards", shop: "Coin Shop", crime: "Crime Lab", timemachine: "Time Machine", heatmap: "Heatmap", speedrun: "Speedrun", voice: "Voice Rooms" },
  common: { close: "Close", start: "Start", cancel: "Cancel", confirm: "Confirm", loading: "Loading…", refresh: "Refresh", locked: "Locked", done: "Done", completed: "Completed", inProgress: "In progress", lockedHint: "Complete the previous step first", reward: "Reward", error: "Something broke — try again." },
}
`,
  fa: `// TEKA NEXUS — os dictionary (fa): game titles + shared app strings (Task 23).
export const os = {
  apps: { academy: "آکادمی", terminal: "ترمینال", pet: "همراه کدنویس", boss: "میدان باس", tree: "درخت مهارت", war: "قرمز در برابر آبی", cards: "کارت‌های کدنویس", shop: "فروشگاه سکه", crime: "آزمایشگاه جرم", timemachine: "ماشین زمان", heatmap: "نقشه فعالیت", speedrun: "اسپیدران", voice: "اتاق‌های صوتی" },
  common: { close: "بستن", start: "شروع", cancel: "انصراف", confirm: "تأیید", loading: "در حال بارگذاری…", refresh: "به‌روزرسانی", locked: "قفل", done: "تمام شد", completed: "کامل شد", inProgress: "در جریان", lockedHint: "اول مرحله قبلی را کامل کن", reward: "جایزه", error: "یه چیزی شکست — دوباره امتحان کن." },
}
`,
  es: `// TEKA NEXUS — os dictionary (es): game titles + shared app strings (Task 23).
export const os = {
  apps: { academy: "Academia", terminal: "Terminal", pet: "Mascota de código", boss: "Arena de Jefes", tree: "Árbol de habilidades", war: "Rojos contra Azules", cards: "Cartas de coder", shop: "Tienda", crime: "Laboratorio de crímenes", timemachine: "Máquina del tiempo", heatmap: "Mapa de actividad", speedrun: "Speedrun", voice: "Salas de voz" },
  common: { close: "Cerrar", start: "Iniciar", cancel: "Cancelar", confirm: "Confirmar", loading: "Cargando…", refresh: "Actualizar", locked: "Bloqueado", done: "Listo", completed: "Completado", inProgress: "En progreso", lockedHint: "Completa primero el paso anterior", reward: "Recompensa", error: "Algo se rompió — inténtalo de nuevo." },
}
`,
  zh: `// TEKA NEXUS — os dictionary (zh): game titles + shared app strings (Task 23).
export const os = {
  apps: { academy: "学院", terminal: "终端", pet: "代码宠物", boss: "Boss 竞技场", tree: "技能树", war: "红蓝大战", cards: "程序员卡牌", shop: "金币商店", crime: "罪案实验室", timemachine: "时光机", heatmap: "活动热力图", speedrun: "速通", voice: "语音房间" },
  common: { close: "关闭", start: "开始", cancel: "取消", confirm: "确认", loading: "加载中……", refresh: "刷新", locked: "未解锁", done: "完成", completed: "已完成", inProgress: "进行中", lockedHint: "请先完成上一步", reward: "奖励", error: "出错了 — 请重试。" },
}
`,
  ar: `// TEKA NEXUS — os dictionary (ar): game titles + shared app strings (Task 23).
export const os = {
  apps: { academy: "الأكاديمية", terminal: "الطرفية", pet: "الرفيق البرمجي", boss: "ساحة الزعماء", tree: "شجرة المهارات", war: "الأحمر ضد الأزرق", cards: "بطاقات المبرمج", shop: "متجر العملات", crime: "مختبر الجريمة", timemachine: "آلة الزمن", heatmap: "خريطة النشاط", speedrun: "السباق السريع", voice: "غرف الصوت" },
  common: { close: "إغلاق", start: "ابدأ", cancel: "إلغاء", confirm: "تأكيد", loading: "جار التحميل…", refresh: "تحديث", locked: "مقفل", done: "تم", completed: "مكتمل", inProgress: "قيد التنفيذ", lockedHint: "أكمل الخطوة السابقة أولاً", reward: "مكافأة", error: "حدث خطأ — حاول مجدداً." },
}
`,
  fr: `// TEKA NEXUS — os dictionary (fr): game titles + shared app strings (Task 23).
export const os = {
  apps: { academy: "Académie", terminal: "Terminal", pet: "Compagnon de code", boss: "Arène des Boss", tree: "Arbre de compétences", war: "Rouges contre Bleus", cards: "Cartes de codeur", shop: "Boutique", crime: "Labo criminel", timemachine: "Machine à voyager dans le temps", heatmap: "Carte d’activité", speedrun: "Speedrun", voice: "Salons vocaux" },
  common: { close: "Fermer", start: "Démarrer", cancel: "Annuler", confirm: "Confirmer", loading: "Chargement…", refresh: "Actualiser", locked: "Verrouillé", done: "Terminé", completed: "Complété", inProgress: "En cours", lockedHint: "Terminez d’abord l’étape précédente", reward: "Récompense", error: "Un pépin est survenu — réessayez." },
}
`,
};

const ARENA: Record<string, string> = {
  en: `// TEKA NEXUS — arena dictionary (en): Arena hub + game blurbs (Task 23).
export const arena = {
  hub: {
    section: "ARENA",
    navLabel: "Arena Hub",
    eyebrow: "TEKA ARENA",
    title: "Twelve game worlds. One arena.",
    subtitle:
      "Fight bosses, grow your Skill Tree, raise a Code Pet, join the team war and collect cards — every game now lives right in the main navigation.",
    nightsLive: "TEKA NIGHTS is LIVE — 2× XP",
    nightsIn: "TEKA NIGHTS in",
    statCoins: "TEKA Coins",
    statTeam: "Team",
    statNoTeam: "No team",
    statTitle: "Champion title",
    statNoTitle: "No title yet — fight a boss!",
    statCards: "Coder Cards",
    statPet: "Code Pet",
    statPetNone: "Not hatched",
    gamesTitle: "Choose your battleground",
    academyCta: "Every boss is unlocked by lessons — the Academy is where it all starts.",
    terminalHint: "The terminal still hides secrets…",
  },
  blurb: {
    boss: "Course final bosses with HP bars, champion titles and glory.",
    tree: "A galaxy-style RPG map of everything you can learn.",
    pet: "A buddy that hatches, evolves and never lets you study alone.",
    cards: "Collect ranked coder cards with unique serial numbers.",
    war: "Red vs Blue — weekly team war with live scoring.",
    shop: "Spend TEKA Coins on boosts, themes and perks.",
    crime: "Digital forensics: read logs, trace IPs, crack cases.",
    speedrun: "Race the clock on modules — set a global record.",
    timemachine: "Replay your whole learning journey, day by day.",
    heatmap: "GitHub-style grid of every lesson you've touched.",
    voice: "Live audio rooms with AI narration.",
    terminal: "A real shell for the whole platform. Try sudo hack.",
  },
};
`,
  fa: `// TEKA NEXUS — arena dictionary (fa): Arena hub + game blurbs (Task 23).
export const arena = {
  hub: {
    section: "آرنا",
    navLabel: "مرکز آرنا",
    eyebrow: "تکا آرنا",
    title: "دوازده دنیای بازی. یک آرنا.",
    subtitle:
      "با باس‌ها بجنگ، درخت مهارتت رو پیش ببر، همراه کدنویست رو بزرگ کن، تو جنگ تیمی شروع کن و کارت جمع کن — حالا هر بازی همین‌جا توی نوار اصلی سایت است.",
    nightsLive: "شب‌های تکا شروع شده — امتیاز ۲ برابر",
    nightsIn: "شب‌های تکا تا",
    statCoins: "سکه تکا",
    statTeam: "تیم",
    statNoTeam: "بی‌تیم",
    statTitle: "عنوان قهرمانی",
    statNoTitle: "هنوز نداری — با یه باس بجنگ!",
    statCards: "کارت‌های کدنویس",
    statPet: "همراه کدنویس",
    statPetNone: "هنوز باز نشده",
    gamesTitle: "میدان جنگت رو انتخاب کن",
    academyCta: "هر باس با درس‌ها باز می‌شه — آکادمی نقطه شروع همه‌چیزه.",
    terminalHint: "ترمینال هنوز رازهای مخفی دارد…",
  },
  blurb: {
    boss: "باس‌های پایانی هر دوره با نوار جان، عنوان قهرمانی و افتخار.",
    tree: "نقشه کهکشانی RPG از هر چیزی که می‌تونی یاد بگیری.",
    pet: "یاری که باز می‌شه، تکامل پیدا می‌کنه و هرگز تنهایت نمی‌ذاره.",
    cards: "کارت‌های رتبه‌دار کدنویس با شماره سریال یکتا جمع کن.",
    war: "قرمز در برابر آبی — جنگ هفتگی تیمی با امتیاز زنده.",
    shop: "سکه‌های تکا رو خرج بوست‌ها، تم‌ها و امتیازها کن.",
    crime: "کارآگاهی دیجیتال: لاگ‌ها را بخوان، IP ها را دنبال کن، پرونده‌ها را باز کن.",
    speedrun: "با زمان مسابقه بده و رکورد جهانی بگذار.",
    timemachine: "کل سفر یادگیری‌ات را روز به روز دوباره ببین.",
    heatmap: "گرید فعالیت به سبک گیت‌هاب از هر درسی که کار کردی.",
    voice: "اتاق‌های گفتگوی زنده با روخوانی هوش مصنوعی.",
    terminal: "یک شل واقعی برای کل پلتفرم. sudo hack رو امتحان کن.",
  },
};
`,
  es: `// TEKA NEXUS — arena dictionary (es): Arena hub + game blurbs (Task 23).
export const arena = {
  hub: {
    section: "ARENA",
    navLabel: "Centro de la Arena",
    eyebrow: "TEKA ARENA",
    title: "Doce mundos de juego. Una sola arena.",
    subtitle:
      "Pelea contra jefes, avanza en el árbol de habilidades, cría tu mascota de código, únete a la guerra de equipos y colecciona cartas — todo vive ahora en la navegación principal.",
    nightsLive: "TEKA NIGHTS en vivo — XP ×2",
    nightsIn: "TEKA NIGHTS en",
    statCoins: "Monedas TEKA",
    statTeam: "Equipo",
    statNoTeam: "Sin equipo",
    statTitle: "Título de campeón",
    statNoTitle: "Aún sin título — ¡pelea contra un jefe!",
    statCards: "Cartas de coder",
    statPet: "Mascota de código",
    statPetNone: "Sin eclosionar",
    gamesTitle: "Elige tu campo de batalla",
    academyCta: "Cada jefe se desbloquea con lecciones — la Academia es donde empieza todo.",
    terminalHint: "La terminal todavía esconde secretos…",
  },
  blurb: {
    boss: "Jefes finales de cada curso con barras de vida, títulos y gloria.",
    tree: "Un mapa RPG galáctico de todo lo que puedes aprender.",
    pet: "Un compañero que eclosiona, evoluciona y nunca te deja estudiar solo.",
    cards: "Colecciona cartas de coder con números de serie únicos.",
    war: "Rojos contra Azules — guerra semanal de equipos con puntuación en vivo.",
    shop: "Gasta tus monedas TEKA en mejoras, temas y ventajas.",
    crime: "Criminalística digital: lee registros, rastrea IPs, resuelve casos.",
    speedrun: "Carrera contra el reloj por módulos — marca un récord global.",
    timemachine: "Revive todo tu viaje de aprendizaje, día a día.",
    heatmap: "Cuadrícula estilo GitHub de cada lección que has tocado.",
    voice: "Salas de audio en vivo con narración por IA.",
    terminal: "Un shell real para toda la plataforma. Prueba sudo hack.",
  },
};
`,
  zh: `// TEKA NEXUS — arena dictionary (zh): Arena hub + game blurbs (Task 23).
export const arena = {
  hub: {
    section: "竞技场",
    navLabel: "竞技场中心",
    eyebrow: "TEKA 竞技场",
    title: "十二个游戏世界，一座竞技场。",
    subtitle:
      "挑战 Boss、点亮技能树、养大你的代码宠物、加入团队大战、收集卡牌 — 一切都在主导航里。",
    nightsLive: "TEKA NIGHTS 进行中 — 经验双倍",
    nightsIn: "TEKA NIGHTS 还有",
    statCoins: "TEKA 金币",
    statTeam: "战队",
    statNoTeam: "未加入战队",
    statTitle: "冠军头衔",
    statNoTitle: "还没有头衔 — 去挑战一个 Boss！",
    statCards: "程序员卡牌",
    statPet: "代码宠物",
    statPetNone: "尚未孵化",
    gamesTitle: "选择你的战场",
    academyCta: "每个 Boss 都由课程解锁 — 学院是一切的起点。",
    terminalHint: "终端里依然藏着秘密……",
  },
  blurb: {
    boss: "各课程最终 Boss：血条、冠军头衔与荣耀。",
    tree: "银河 RPG 风格的学习进度全景地图。",
    pet: "会孵化、会进化的伙伴，让你学习永不孤单。",
    cards: "收集带唯一序列号的程序员排位卡牌。",
    war: "红蓝大战 — 每周团队战，实时计分。",
    shop: "用 TEKA 金币购买增益、主题与特权。",
    crime: "数字取证：读日志、追 IP、破奇案。",
    speedrun: "模块限时挑战 — 冲击全球纪录。",
    timemachine: "逐日回放你的整个学习旅程。",
    heatmap: "GitHub 风格的活动网格，记录你碰过的每节课。",
    voice: "AI 朗读的实时语音房间。",
    terminal: "整个平台的真正 Shell。试试 sudo hack。",
  },
};
`,
  ar: `// TEKA NEXUS — arena dictionary (ar): Arena hub + game blurbs (Task 23).
export const arena = {
  hub: {
    section: "الأرينا",
    navLabel: "مركز الأرينا",
    eyebrow: "تكا أرينا",
    title: "اثنا عشر عالماً للألعاب. أرينا واحدة.",
    subtitle:
      "قاتل الزعماء، وتقدّم في شجرة المهارات، وربِّ رفيقك البرمجي، وانضم إلى حرب الفرق، واجمع البطاقات — كل ذلك الآن في شريط التنقّل الرئيسي.",
    nightsLive: "ليالي تشا جارية — نقاط مضاعفة",
    nightsIn: "ليالي تشا بعد",
    statCoins: "عملات تشا",
    statTeam: "الفريق",
    statNoTeam: "بلا فريق",
    statTitle: "لقب البطل",
    statNoTitle: "لا لقب بعد — قاتل زعيماً!",
    statCards: "بطاقات المبرمج",
    statPet: "الرفيق البرمجي",
    statPetNone: "لم يفقس بعد",
    gamesTitle: "اختر ساحة معركتك",
    academyCta: "كل زعيم يُفتح بالدروس — الأكاديمية هي نقطة البداية.",
    terminalHint: "الطرفية لا تزال تخفي أسراراً…",
  },
  blurb: {
    boss: "زعماء نهائيون لكل دورة مع أشرطة حياة وألقاب ومجد.",
    tree: "خريطة RPG مجرّية لكل ما يمكنك تعلّمه.",
    pet: "رفيق يفقس ويتطور ولا يتركك وحدك أبداً.",
    cards: "اجمع بطاقات مبرمج مرتّبة بأرقام تسلسلية فريدة.",
    war: "الأحمر ضد الأزرق — حرب أسبوعية للفرق بنقاط حية.",
    shop: "أنفق عملات تشا على التعزيزات والسمات والمزايا.",
    crime: "أدلة رقمية: اقرأ السجلات، وتعقّب عناوين IP، وحلّ القضايا.",
    speedrun: "سباق ضد الوقت عبر الوحدات — سجّل رقماً عالمياً.",
    timemachine: "أعد عيش رحلة تعلّمك كلها يوماً بيوم.",
    heatmap: "شبكة نشاط بأسلوب GitHub لكل درس لمسته.",
    voice: "غرف صوت حية بتعليق صوتي من الذكاء الاصطناعي.",
    terminal: "صدفة حقيقية للمنصة كلها. جرّب sudo hack.",
  },
};
`,
  fr: `// TEKA NEXUS — arena dictionary (fr): Arena hub + game blurbs (Task 23).
export const arena = {
  hub: {
    section: "ARÈNE",
    navLabel: "Hub de l'Arène",
    eyebrow: "TEKA ARENA",
    title: "Douze mondes de jeu. Une seule arène.",
    subtitle:
      "Affrontez des boss, progressez dans l'arbre de compétences, élevez votre compagnon de code, rejoignez la guerre d'équipes et collectionnez des cartes — tout vit désormais dans la navigation principale.",
    nightsLive: "TEKA NIGHTS en cours — XP ×2",
    nightsIn: "TEKA NIGHTS dans",
    statCoins: "Pièces TEKA",
    statTeam: "Équipe",
    statNoTeam: "Sans équipe",
    statTitle: "Titre de champion",
    statNoTitle: "Pas encore de titre — affrontez un boss !",
    statCards: "Cartes de codeur",
    statPet: "Compagnon de code",
    statPetNone: "Pas encore éclos",
    gamesTitle: "Choisissez votre champ de bataille",
    academyCta: "Chaque boss se débloque avec des leçons — l'Académie est le point de départ.",
    terminalHint: "Le terminal cache toujours des secrets…",
  },
  blurb: {
    boss: "Boss finaux de chaque cours avec barres de vie, titres et gloire.",
    tree: "Une carte RPG galactique de tout ce que vous pouvez apprendre.",
    pet: "Un compagnon qui éclot, évolue et ne vous laisse jamais seul.",
    cards: "Collectionnez des cartes de codeur classées aux numéros de série uniques.",
    war: "Rouges contre Bleus — guerre d'équipes hebdomadaire avec score en direct.",
    shop: "Dépensez vos pièces TEKA en boosts, thèmes et avantages.",
    crime: "Criminalistique numérique : lisez les logs, tracez les IP, résolvez des affaires.",
    speedrun: "Course contre la montre par module — battez un record mondial.",
    timemachine: "Rejouez tout votre parcours d'apprentissage, jour après jour.",
    heatmap: "Grille d'activité façon GitHub de chaque leçon touchée.",
    voice: "Salons audio en direct avec narration par IA.",
    terminal: "Un vrai shell pour toute la plateforme. Essayez sudo hack.",
  },
};
`,
};

for (const loc of Object.keys(OS_TRIMMED)) {
  writeFileSync(`src/lib/i18n/dictionaries/${loc}/os.ts`, OS_TRIMMED[loc]);
  writeFileSync(`src/lib/i18n/dictionaries/${loc}/arena.ts`, ARENA[loc]);

  const idxPath = `src/lib/i18n/dictionaries/${loc}/index.ts`;
  let idx = readFileSync(idxPath, "utf8");
  if (!idx.includes('from "./arena"')) {
    idx = idx.replace('import { os } from "./os";', 'import { os } from "./os";\nimport { arena } from "./arena";');
    idx = idx.replace(/\n  os,\n/, "\n  os,\n  arena,\n");
    writeFileSync(idxPath, idx);
  }
  console.log(`${loc}: os trimmed + arena added + index wired`);
}
