// One-shot migration: landing.os.* → landing.arena.* in the 6 existing locales.
import { readFileSync, writeFileSync } from "node:fs";

const BLOCKS: Record<string, string> = {
  en: `  arena: {
    eyebrow: "TEKA ARENA",
    title: "Twelve game worlds. One main navigation.",
    subtitle:
      "TEKA Arena is the game layer of TEKA NEXUS — Boss Fights, a galaxy Skill Tree, Code Pet, Red-vs-Blue wars, collectible cards, a real terminal and more. Every game is now a first-class page in the sidebar, not a hidden desktop.",
    appsBadge: "12 games inside",
    cardTitle: "Pick your battleground",
    cardBody:
      "Fight course bosses for champion titles, raise a Code Pet that evolves as you learn, collect serial-numbered Coder Cards, join the weekly Red vs Blue war and spend TEKA Coins in the shop. Every game lives right in the main navigation.",
    f1: "12 full-page games — Boss Arena, Skill Tree, Code Pet, Coder Cards…",
    f2: "A terminal that actually works: open boss, teka learn python-basics",
    f3: "TEKA Nights — monthly event with 2× XP & live countdown",
    f4: "Game layer everywhere: bosses, pet, cards, coins & wars",
    f5: "One click from any page — the whole arena lives in the sidebar",
    cta: "Create account & enter the arena",
    note: "Free forever — no credit card, no catch.",
  },`,
  fa: `  arena: {
    eyebrow: "تکا آرنا",
    title: "دوازده دنیای بازی. یک نوار اصلی.",
    subtitle:
      "تکا آرنا لایه‌ی بازیِ تکا نکسوسه — باس‌فایت، درخت مهارت کهکشانی، کد پت، جنگ قرمز در برابر آبی، کارت‌های کلکسیونی، ترمینال واقعی و بیشتر. حالا هر بازی یه صفحه‌ی مستقل توی نوار اصلیه، نه یه دسکتاپ مخفی.",
    appsBadge: "۱۲ بازی داخله",
    cardTitle: "میدان جنگت رو انتخاب کن",
    cardBody:
      "با باس‌های دوره‌ها بجنگ و عنوان قهرمانی بگیر، کد پتی بزرگ کن که با یادگیری‌ات تکامل پیدا می‌کنه، کارت‌های کدنویس شماره‌دار جمع کن، تو جنگ هفتگی قرمز و آبی شروع کن و سکه‌هات رو تو فروشگاه خرج کن. همه‌چیز همین‌جا تو نوار اصلیه.",
    f1: "۱۲ بازی تمام‌صفحه — باس آرنا، درخت مهارت، کد پت، کارت‌ها…",
    f2: "ترمینالی که واقعاً کار می‌کنه: open boss، teka learn python-basics",
    f3: "شب‌های تکا — ایونت ماهانه با XP دوبرابر و شمارش معکوس زنده",
    f4: "لایه بازی همه‌جا: باس‌ها، پت، کارت‌ها، سکه و جنگ‌ها",
    f5: "از هر صفحه یه کلیک — کل آرنا توی نوار کناره",
    cta: "ساخت اکانت و وارد آرنا شو",
    note: "برای همیشه رایگان — بدون کارت بانکی، بدون اما.",
  },`,
  es: `  arena: {
    eyebrow: "TEKA ARENA",
    title: "Doce mundos de juego. Una sola navegación principal.",
    subtitle:
      "TEKA Arena es la capa de juego de TEKA NEXUS — jefes finales, un árbol de habilidades galáctico, Code Pet, guerras de Rojos contra Azules, cartas coleccionables, una terminal real y más. Cada juego es ahora una página de primera clase en la barra lateral, no un escritorio oculto.",
    appsBadge: "12 juegos dentro",
    cardTitle: "Elige tu campo de batalla",
    cardBody:
      "Pelea contra los jefes de cada curso para ganar títulos de campeón, cría una Code Pet que evoluciona contigo, colecciona Coder Cards con número de serie, únete a la guerra semanal de Rojos contra Azules y gasta tus monedas TEKA en la tienda. Todo vive en la navegación principal.",
    f1: "12 juegos a pantalla completa — Boss Arena, Árbol de Habilidades, Code Pet, Coder Cards…",
    f2: "Una terminal que funciona de verdad: open boss, teka learn python-basics",
    f3: "TEKA Nights — evento mensual con XP×2 y cuenta regresiva en vivo",
    f4: "Capa de juego en todas partes: jefes, mascota, cartas, monedas y guerras",
    f5: "A un clic desde cualquier página — toda la arena vive en la barra lateral",
    cta: "Crea tu cuenta y entra a la arena",
    note: "Gratis para siempre — sin tarjeta, sin trampas.",
  },`,
  zh: `  arena: {
    eyebrow: "TEKA 竞技场",
    title: "十二个游戏世界，一条主导航。",
    subtitle:
      "TEKA 竞技场是 TEKA NEXUS 的游戏层 — Boss 战、银河技能树、代码宠物、红蓝大战、收藏卡牌、真正可用的终端等等。每个游戏现在都是侧边栏里的一等页面，而不是隐藏的桌面。",
    appsBadge: "内置 12 个游戏",
    cardTitle: "选择你的战场",
    cardBody:
      "挑战各课程的 Boss 赢得冠军头衔，养一只随你学习而进化的代码宠物，收集带唯一序列号的编程卡牌，参加每周红蓝大战，再用 TEKA 金币在商店购物。一切就在主导航里。",
    f1: "12 个整页游戏 — Boss 竞技场、技能树、代码宠物、编程卡牌…",
    f2: "真正能用的终端：open boss、teka learn python-basics",
    f3: "TEKA Nights — 每月活动，双倍 XP 与实时倒计时",
    f4: "游戏层无处不在：Boss、宠物、卡牌、金币与战争",
    f5: "任何页面一键直达 — 整个竞技场就在侧边栏",
    cta: "注册账号，进入竞技场",
    note: "永久免费 — 无需信用卡，没有套路。",
  },`,
  ar: `  arena: {
    eyebrow: "تكا أرينا",
    title: "اثنا عشر عالماً للألعاب. شريط تنقّل واحد.",
    subtitle:
      "تكا أرينا هي طبقة الألعاب في تكا نيكسوس — معارك الزعماء، شجرة مهارات مجرّية، الكود الأليف، حرب الأحمر ضد الأزرق، بطاقات قابلة للجمع، طرفية حقيقية وأكثر. كل لعبة الآن صفحة مستقلة في الشريط الجانبي، وليست سطح مكتب مخفياً.",
    appsBadge: "١٢ لعبة بالداخل",
    cardTitle: "اختر ساحة معركتك",
    cardBody:
      "قاتل زعماء كل دورة لتحصد ألقاب البطولة، وربِّ الكود الأليف الذي يتطور مع تعلّمك، واجمع بطاقات المبرمج المرقّمة تسلسلياً، وانضم إلى حرب الأحمر ضد الأزرق الأسبوعية وأنفق عملات TEKA في المتجر. كل شيء في شريط التنقّل الرئيسي.",
    f1: "١٢ لعبة كاملة الصفحة — ساحة الزعماء، شجرة المهارات، الكود الأليف، بطاقات المبرمج…",
    f2: "طرفية تعمل فعلاً: open boss، teka learn python-basics",
    f3: "ليالي TEKA — حدث شهري بنقاط خبرة مضاعفة وعدّاد تنازلي حي",
    f4: "طبقة الألعاب في كل مكان: زعماء، أليف، بطاقات، عملات وحروب",
    f5: "على بُعد نقرة من أي صفحة — الأرينا كلها في الشريط الجانبي",
    cta: "أنشئ حسابك وادخل الأرينا",
    note: "مجاني للأبد — بدون بطاقة، بدون شروط.",
  },`,
  fr: `  arena: {
    eyebrow: "TEKA ARENA",
    title: "Douze mondes de jeu. Une seule navigation principale.",
    subtitle:
      "TEKA Arena est la couche jeu de TEKA NEXUS — combats de boss, arbre de compétences galactique, Code Pet, guerres des Rouges contre les Bleus, cartes à collectionner, un vrai terminal et plus encore. Chaque jeu est désormais une page à part entière dans la barre latérale, pas un bureau caché.",
    appsBadge: "12 jeux à l'intérieur",
    cardTitle: "Choisissez votre champ de bataille",
    cardBody:
      "Affrontez les boss de chaque cours pour décrocher des titres de champion, élevez un Code Pet qui évolue avec vous, collectionnez les Coder Cards numérotées, rejoignez la guerre hebdomadaire des Rouges contre les Bleus et dépensez vos pièces TEKA à la boutique. Tout vit dans la navigation principale.",
    f1: "12 jeux pleine page — Boss Arena, Arbre de compétences, Code Pet, Coder Cards…",
    f2: "Un terminal qui marche vraiment : open boss, teka learn python-basics",
    f3: "TEKA Nights — événement mensuel avec XP×2 et compte à rebours en direct",
    f4: "Couche jeu partout : boss, animal, cartes, pièces et guerres",
    f5: "À un clic de n'importe quelle page — toute l'arena est dans la barre latérale",
    cta: "Créez un compte et entrez dans l'arena",
    note: "Gratuit pour toujours — sans carte bancaire, sans piège.",
  },`,
};

for (const [loc, block] of Object.entries(BLOCKS)) {
  const p = `src/lib/i18n/dictionaries/${loc}/landing.ts`;
  let src = readFileSync(p, "utf8");
  const start = src.indexOf("  os: {");
  if (start < 0) { console.error(`${loc}: os block NOT FOUND`); continue; }
  const end = src.indexOf("\n  academy: {", start);
  if (end < 0) { console.error(`${loc}: academy block NOT FOUND`); continue; }
  src = src.slice(0, start) + block + src.slice(end);
  writeFileSync(p, src);
  console.log(`${loc}: landing.os → landing.arena OK`);
}
