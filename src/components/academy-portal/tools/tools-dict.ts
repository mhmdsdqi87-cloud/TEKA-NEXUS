// TEKA NEXUS — Academy portal tools: UI chrome dictionary.
// Self-contained (does not touch the global dictionaries): every label the
// four tools render around their bilingual content, for all 6 locales.
// fa/es/ar use a friendly informal tone; en is the source-of-truth shape.

import type { Locale } from "@/lib/i18n/locales";

// ─── Enums shared with tools-data.ts ─────────────────────────

export type BugCategoryKey =
  | "off-by-one"
  | "wrong-operator"
  | "mutation"
  | "type-confusion"
  | "missing-tag"
  | "bad-selector"
  | "infinite-loop"
  | "string-format";

export type ErrorCategoryKey =
  | "syntax"
  | "runtime"
  | "logic"
  | "type"
  | "css"
  | "html"
  | "browser"
  | "javascript"
  | "network"
  | "accessibility";

export type SeverityKey = "low" | "medium" | "high";

export type ErrorLangKey = "python" | "html" | "javascript" | "general";

// ─── Shape ───────────────────────────────────────────────────

export type ToolsDict = {
  bug: {
    title: string;
    subtitle: string;
    solvedCounter: string; // {solved} of {total} cases closed
    pickCase: string;
    langPy: string;
    langHtml: string;
    symptomLabel: string;
    evidenceLabel: string;
    inputLabel: string;
    run: string;
    running: string;
    resetCode: string;
    checkFix: string; // HTML cases
    checking: string;
    showTarget: string;
    hideTarget: string;
    targetLabel: string;
    yourOutput: string;
    notYetHint: string;
    hintReveal: string; // {n} of {total}
    whyTitle: string;
    caseClosed: string;
    caseClosedBody: string; // {hints} = number of hints used
    showFix: string;
    hideFix: string;
    fixedCodeLabel: string;
    previewLabel: string;
    checklist: string;
    checksPass: string;
    checksFail: string; // {ok} of {total}
    resetProgress: string;
    resetConfirm: string;
    detailCount: string; // found {n}, need {n2}
    detailAttr: string; // attribute {a} missing or wrong
    detailStyle: string; // computed {prop} is {got}
    detailText: string;
    detailTextGone: string; // forbidden text still present
    categories: Record<BugCategoryKey, string>;
  };
  encyclopedia: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    entriesCount: string; // {n} entries
    langAll: string;
    catAll: string;
    noResults: string;
    noResultsHint: string;
    plainMeaning: string;
    causes: string;
    fixes: string;
    prevention: string;
    related: string;
    reproLabel: string;
    fixedLabel: string;
    severities: Record<SeverityKey, string>;
    categories: Record<ErrorCategoryKey, string>;
    languages: Record<ErrorLangKey, string>;
  };
  predict: {
    title: string;
    subtitle: string;
    qOf: string; // Question {current} of {total}
    scoreLabel: string;
    streakLabel: string;
    bestLabel: string;
    pickPrompt: string;
    typePrompt: string;
    typedPlaceholder: string;
    check: string;
    checking: string;
    next: string;
    correct: string;
    incorrect: string;
    realOutput: string;
    realDom: string;
    why: string;
    yourAnswer: string;
    doneTitle: string;
    doneBody: string; // {correct} of {total}
    donePerfect: string;
    restart: string;
  };
  glossary: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    termsCount: string; // {n} terms
    noResults: string;
    noResultsHint: string;
    exampleLabel: string;
    related: string;
    jumpLabel: string;
    allLetters: string;
  };
};

// ─── en (source of truth) ────────────────────────────────────

const en: ToolsDict = {
  bug: {
    title: "Bug Detective",
    subtitle: "Real symptoms, real code, real fixes. Read the evidence, form a hypothesis, close the case.",
    solvedCounter: "{solved} of {total} cases closed",
    pickCase: "Pick a case file",
    langPy: "Python",
    langHtml: "HTML",
    symptomLabel: "The symptom",
    evidenceLabel: "The evidence — the code",
    inputLabel: "Program input (one line per input())",
    run: "Run the evidence",
    running: "Running…",
    resetCode: "Reset code",
    checkFix: "Check my fixes",
    checking: "Checking…",
    showTarget: "Show the target output",
    hideTarget: "Hide the target output",
    targetLabel: "What it should print",
    yourOutput: "Your output",
    notYetHint: "Your output doesn't match the target yet. Run it, read it, change one thing.",
    hintReveal: "Reveal hint {n} of {total}",
    whyTitle: "Why this bug happens",
    caseClosed: "Case closed!",
    caseClosedBody: "The output matches the target — solved with {hints} hint(s).",
    showFix: "Show the corrected code",
    hideFix: "Hide the corrected code",
    fixedCodeLabel: "How the detective would write it",
    previewLabel: "Live preview",
    checklist: "Fix checklist",
    checksPass: "Every check passes — case closed!",
    checksFail: "{ok} of {total} checks pass",
    resetProgress: "Reopen all cases",
    resetConfirm: "Mark every case as unsolved again?",
    detailCount: "found {n}, need {n2}",
    detailAttr: "attribute {a} missing or wrong",
    detailStyle: "computed {prop} is {got}",
    detailText: "that text is not there",
    detailTextGone: "this text should be gone by now",
    categories: {
      "off-by-one": "Off-by-one",
      "wrong-operator": "Wrong operator",
      mutation: "Unwanted mutation",
      "type-confusion": "Type confusion",
      "missing-tag": "Missing tag",
      "bad-selector": "Bad selector",
      "infinite-loop": "Infinite loop",
      "string-format": "Broken format",
    },
  },
  encyclopedia: {
    title: "Error Encyclopedia",
    subtitle: "Every error speaks a language. Look it up, understand it, and know how to answer.",
    searchPlaceholder: "Search an error message, a symptom, a keyword…",
    entriesCount: "{n} entries",
    langAll: "All languages",
    catAll: "All topics",
    noResults: "No error matches that search.",
    noResultsHint: "Try a shorter keyword — like “index”, “margin” or “404”.",
    plainMeaning: "In plain words",
    causes: "Common causes",
    fixes: "How to fix it",
    prevention: "Prevention",
    related: "Related lessons",
    reproLabel: "Minimal repro",
    fixedLabel: "Corrected",
    severities: { low: "Gentle", medium: "Common", high: "Sneaky" },
    categories: {
      syntax: "Syntax",
      runtime: "Runtime",
      logic: "Logic",
      type: "Types",
      css: "CSS",
      html: "HTML",
      browser: "Browser",
      javascript: "JavaScript",
      network: "Network",
      accessibility: "Accessibility",
    },
    languages: { python: "Python", html: "HTML & CSS", javascript: "JavaScript", general: "General web" },
  },
  predict: {
    title: "Predict the Output",
    subtitle: "No running allowed — read the code, commit to a guess, and the real execution judges you.",
    qOf: "Question {current} of {total}",
    scoreLabel: "Score",
    streakLabel: "Streak",
    bestLabel: "Best",
    pickPrompt: "Which output is real?",
    typePrompt: "Type the exact output — one line per output line",
    typedPlaceholder: "one output line per line…",
    check: "Check my prediction",
    checking: "Running it for real…",
    next: "Next question",
    correct: "Correct!",
    incorrect: "Not this time",
    realOutput: "What it really printed",
    realDom: "What the browser really rendered",
    why: "Why",
    yourAnswer: "Your answer",
    doneTitle: "Round complete!",
    doneBody: "You predicted {correct} of {total} right.",
    donePerfect: "Flawless — a perfect {total}/{total}!",
    restart: "Play again",
  },
  glossary: {
    title: "Glossary",
    subtitle: "Plain-English (and plain-Persian) definitions for every term this academy throws at you.",
    searchPlaceholder: "Search a term or an explanation…",
    termsCount: "{n} terms",
    noResults: "No term matches that search.",
    noResultsHint: "Try fewer letters — “fun” finds “function”.",
    exampleLabel: "Example",
    related: "Related lessons",
    jumpLabel: "Jump to",
    allLetters: "All",
  },
};

// ─── fa (informal, matches academy tone) ─────────────────────

const fa: ToolsDict = {
  bug: {
    title: "کارآگاه باگ‌ها",
    subtitle: "علامت واقعی، کد واقعی، تعمیر واقعی. مدرک رو بخون، حدس بزن، پرونده رو ببند.",
    solvedCounter: "{solved} از {total} پرونده بسته شد",
    pickCase: "یه پرونده انتخاب کن",
    langPy: "پایتون",
    langHtml: "HTML",
    symptomLabel: "علامتِ ماجرا",
    evidenceLabel: "مدرک — خودِ کد",
    inputLabel: "ورودی برنامه (برای هر input() یه خط)",
    run: "اجرای مدرک",
    running: "در حال اجرا…",
    resetCode: "برگردوندن کد",
    checkFix: "چک کردن تعمیرهام",
    checking: "در حال بررسی…",
    showTarget: "نمایش خروجی هدف",
    hideTarget: "پنهان کردن خروجی هدف",
    targetLabel: "چیزی که باید چاپ بشه",
    yourOutput: "خروجی تو",
    notYetHint: "خروجی‌ت هنوز با هدف یکی نیست. اجرا کن، بخونش، یه چیز رو عوض کن.",
    hintReveal: "نمایش راهنمای {n} از {total}",
    whyTitle: "چرا این باگ اتفاق می‌افته",
    caseClosed: "پرونده بسته شد!",
    caseClosedBody: "خروجی با هدف می‌خونه — با {hints} تا راهنما حلش کردی.",
    showFix: "نمایش کدِ درست",
    hideFix: "پنهان کردن کدِ درست",
    fixedCodeLabel: "کارآگاه این‌جوری می‌نویسه",
    previewLabel: "پیش‌نمایش زنده",
    checklist: "چک‌لیست تعمیر",
    checksPass: "همهٔ چک‌ها پاس شد — پرونده بسته شد!",
    checksFail: "{ok} از {total} چک پاس شد",
    resetProgress: "بازکردن دوبارهٔ همهٔ پرونده‌ها",
    resetConfirm: "همهٔ پرونده‌ها دوباره بازِ حل‌نشده بشن؟",
    detailCount: "{n} تا پیدا شد، {n2} تا لازمه",
    detailAttr: "ویژگی {a} یا نیست یا اشتباهه",
    detailStyle: "استایل محاسبه‌شدهٔ {prop} می‌شه {got}",
    detailText: "این متن اون‌جا نیست",
    detailTextGone: "این متن باید الان حذف شده باشه",
    categories: {
      "off-by-one": "آف‌بای‌وان",
      "wrong-operator": "عملگر اشتباه",
      mutation: "دست‌کاری ناخواسته",
      "type-confusion": "قاطی‌شدن نوع‌ها",
      "missing-tag": "تگِ بسته‌نشده",
      "bad-selector": "سلکتور اشتباه",
      "infinite-loop": "حلقهٔ بی‌نهایت",
      "string-format": "قالب‌بندیِ خراب",
    },
  },
  encyclopedia: {
    title: "دانشنامهٔ خطاها",
    subtitle: "هر خطا یه زبون داره. پیداش کن، بفهمش، و بلد باش جوابش رو بدی.",
    searchPlaceholder: "متنی از خطا، علامتش یا یه کلیدواژه رو جست‌وجو کن…",
    entriesCount: "{n} تا خطا",
    langAll: "همهٔ زبون‌ها",
    catAll: "همهٔ موضوع‌ها",
    noResults: "هیچ خطایی با این جست‌وجو پیدا نشد.",
    noResultsHint: "کوتاه‌ترش کن — مثلاً «index»، «margin» یا «404».",
    plainMeaning: "به زبون ساده",
    causes: "علت‌های رایج",
    fixes: "چطوری درستش کنی",
    prevention: "جلوگیری",
    related: "درس‌های مرتبط",
    reproLabel: "کمترین نمونهٔ تکرار",
    fixedLabel: "نسخهٔ درست",
    severities: { low: "ملایم", medium: "رایج", high: "مخفی‌کار" },
    categories: {
      syntax: "سینتکس",
      runtime: "زمان اجرا",
      logic: "منطق",
      type: "نوع‌ها",
      css: "CSS",
      html: "HTML",
      browser: "رفتار مرورگر",
      javascript: "جاوااسکریپت",
      network: "شبکه",
      accessibility: "دسترس‌پذیری",
    },
    languages: { python: "پایتون", html: "HTML و CSS", javascript: "جاوااسکریپت", general: "وب به‌طور کلی" },
  },
  predict: {
    title: "خروجی رو پیش‌بینی کن",
    subtitle: "اجازهٔ اجرا نداری — کد رو بخون، حدست رو بچسبون، و اجرای واقعی قضاوتت کنه.",
    qOf: "سؤال {current} از {total}",
    scoreLabel: "امتیاز",
    streakLabel: "زنجیره",
    bestLabel: "رکورد",
    pickPrompt: "کدوم خروجی واقعیه؟",
    typePrompt: "خروجی دقیق رو تایپ کن — هر خط خروجی، یه خط",
    typedPlaceholder: "هر خط خروجی رو یه خط بنویس…",
    check: "چک کردن پیش‌بینیم",
    checking: "داریم واقعاً اجراش می‌کنیم…",
    next: "سؤال بعدی",
    correct: "درسته!",
    incorrect: "این‌بار نه",
    realOutput: "چیزی که واقعاً چاپ شد",
    realDom: "چیزی که مرورگر واقعاً رندر کرد",
    why: "چرا",
    yourAnswer: "جواب تو",
    doneTitle: "دور تموم شد!",
    doneBody: "{correct} از {total} تا رو درست پیش‌بینی کردی.",
    donePerfect: "بی‌نقص — {total} از {total}!",
    restart: "دوباره بازی کن",
  },
  glossary: {
    title: "واژه‌نامه",
    subtitle: "معنی سادهٔ هر اصطلاحی که این آکادمی به روت می‌کنه — به انگلیسی و فارسی.",
    searchPlaceholder: "یه واژه یا قسمتی از توضیح رو جست‌وجو کن…",
    termsCount: "{n} تا واژه",
    noResults: "واژه‌ای با این جست‌وجو پیدا نشد.",
    noResultsHint: "کمتر تایپ کن — «تابع» پیدا می‌شه.",
    exampleLabel: "مثال",
    related: "درس‌های مرتبط",
    jumpLabel: "پرش به",
    allLetters: "همه",
  },
};

// ─── es ──────────────────────────────────────────────────────

const es: ToolsDict = {
  bug: {
    title: "Detective de Bugs",
    subtitle: "Síntomas reales, código real, arreglos reales. Lee la evidencia, forma una hipótesis, cierra el caso.",
    solvedCounter: "{solved} de {total} casos cerrados",
    pickCase: "Elige un expediente",
    langPy: "Python",
    langHtml: "HTML",
    symptomLabel: "El síntoma",
    evidenceLabel: "La evidencia — el código",
    inputLabel: "Entrada del programa (una línea por input())",
    run: "Ejecutar la evidencia",
    running: "Ejecutando…",
    resetCode: "Restablecer código",
    checkFix: "Comprobar mis arreglos",
    checking: "Comprobando…",
    showTarget: "Mostrar la salida esperada",
    hideTarget: "Ocultar la salida esperada",
    targetLabel: "Lo que debería imprimir",
    yourOutput: "Tu salida",
    notYetHint: "Tu salida aún no coincide. Ejecútala, léela, cambia una sola cosa.",
    hintReveal: "Mostrar pista {n} de {total}",
    whyTitle: "Por qué pasa este bug",
    caseClosed: "¡Caso cerrado!",
    caseClosedBody: "La salida coincide — resuelto con {hints} pista(s).",
    showFix: "Mostrar el código corregido",
    hideFix: "Ocultar el código corregido",
    fixedCodeLabel: "Así lo escribiría el detective",
    previewLabel: "Vista previa en vivo",
    checklist: "Lista de comprobación",
    checksPass: "Todas las comprobaciones pasan — ¡caso cerrado!",
    checksFail: "{ok} de {total} comprobaciones pasan",
    resetProgress: "Reabrir todos los casos",
    resetConfirm: "¿Marcar todos los casos como sin resolver otra vez?",
    detailCount: "encontrados {n}, se necesitan {n2}",
    detailAttr: "el atributo {a} falta o está mal",
    detailStyle: "el estilo calculado {prop} es {got}",
    detailText: "ese texto no está ahí",
    detailTextGone: "este texto ya debería haber desaparecido",
    categories: {
      "off-by-one": "Fuera por uno",
      "wrong-operator": "Operador equivocado",
      mutation: "Mutación no deseada",
      "type-confusion": "Confusión de tipos",
      "missing-tag": "Etiqueta sin cerrar",
      "bad-selector": "Selector incorrecto",
      "infinite-loop": "Bucle infinito",
      "string-format": "Formato roto",
    },
  },
  encyclopedia: {
    title: "Enciclopedia de Errores",
    subtitle: "Cada error habla un idioma. Búscalo, entiéndelo y aprende a responderle.",
    searchPlaceholder: "Busca un mensaje de error, un síntoma, una palabra clave…",
    entriesCount: "{n} entradas",
    langAll: "Todos los lenguajes",
    catAll: "Todos los temas",
    noResults: "Ningún error coincide con esa búsqueda.",
    noResultsHint: "Prueba con algo más corto: «index», «margin» o «404».",
    plainMeaning: "En palabras sencillas",
    causes: "Causas comunes",
    fixes: "Cómo arreglarlo",
    prevention: "Prevención",
    related: "Lecciones relacionadas",
    reproLabel: "Repro mínimo",
    fixedLabel: "Corregido",
    severities: { low: "Suave", medium: "Común", high: "Traicionero" },
    categories: {
      syntax: "Sintaxis",
      runtime: "Ejecución",
      logic: "Lógica",
      type: "Tipos",
      css: "CSS",
      html: "HTML",
      browser: "Navegador",
      javascript: "JavaScript",
      network: "Red",
      accessibility: "Accesibilidad",
    },
    languages: { python: "Python", html: "HTML y CSS", javascript: "JavaScript", general: "Web general" },
  },
  predict: {
    title: "Predice la Salida",
    subtitle: "No puedes ejecutar nada: lee el código, arrístrate con tu respuesta y la ejecución real te juzga.",
    qOf: "Pregunta {current} de {total}",
    scoreLabel: "Puntos",
    streakLabel: "Racha",
    bestLabel: "Récord",
    pickPrompt: "¿Qué salida es la real?",
    typePrompt: "Escribe la salida exacta — una línea por línea de salida",
    typedPlaceholder: "una línea de salida por renglón…",
    check: "Comprobar mi predicción",
    checking: "Ejecutándolo de verdad…",
    next: "Siguiente pregunta",
    correct: "¡Correcto!",
    incorrect: "Esta vez no",
    realOutput: "Lo que realmente imprimió",
    realDom: "Lo que el navegador realmente mostró",
    why: "Por qué",
    yourAnswer: "Tu respuesta",
    doneTitle: "¡Ronda completa!",
    doneBody: "Acertaste {correct} de {total}.",
    donePerfect: "¡Perfecto — {total} de {total}!",
    restart: "Jugar otra vez",
  },
  glossary: {
    title: "Glosario",
    subtitle: "Definiciones claras (en inglés y español) de cada término que suelta esta academia.",
    searchPlaceholder: "Busca un término o parte de una explicación…",
    termsCount: "{n} términos",
    noResults: "Ningún término coincide con esa búsqueda.",
    noResultsHint: "Escribe menos letras: «fun» encuentra «function».",
    exampleLabel: "Ejemplo",
    related: "Lecciones relacionadas",
    jumpLabel: "Ir a",
    allLetters: "Todas",
  },
};

// ─── zh ──────────────────────────────────────────────────────

const zh: ToolsDict = {
  bug: {
    title: "Bug 侦探",
    subtitle: "真实的症状、真实的代码、真实的修复。阅读证据、建立假设、结案。",
    solvedCounter: "已结案 {solved} / {total}",
    pickCase: "选择一个案卷",
    langPy: "Python",
    langHtml: "HTML",
    symptomLabel: "症状",
    evidenceLabel: "证据——代码本身",
    inputLabel: "程序输入（每个 input() 一行）",
    run: "运行证据",
    running: "运行中…",
    resetCode: "重置代码",
    checkFix: "检查我的修复",
    checking: "检查中…",
    showTarget: "显示目标输出",
    hideTarget: "隐藏目标输出",
    targetLabel: "它应该打印的内容",
    yourOutput: "你的输出",
    notYetHint: "输出还没对上目标。运行一次、读一读，只改一处再试。",
    hintReveal: "显示提示 {n}/{total}",
    whyTitle: "这个 bug 为什么会发生",
    caseClosed: "结案！",
    caseClosedBody: "输出与目标一致——用了 {hints} 条提示搞定。",
    showFix: "显示修复后的代码",
    hideFix: "隐藏修复后的代码",
    fixedCodeLabel: "侦探会这样写",
    previewLabel: "实时预览",
    checklist: "修复清单",
    checksPass: "所有检查通过——结案！",
    checksFail: "{ok} / {total} 项检查通过",
    resetProgress: "重新打开所有案卷",
    resetConfirm: "要把所有案卷重新标为未破吗？",
    detailCount: "找到 {n} 个，需要 {n2} 个",
    detailAttr: "属性 {a} 缺失或不对",
    detailStyle: "计算后的 {prop} 是 {got}",
    detailText: "找不到那段文字",
    detailTextGone: "这段文字现在应该已经消失了",
    categories: {
      "off-by-one": "差一错误",
      "wrong-operator": "用错运算符",
      mutation: "意外修改",
      "type-confusion": "类型混淆",
      "missing-tag": "标签未闭合",
      "bad-selector": "选择器写错",
      "infinite-loop": "死循环",
      "string-format": "格式损坏",
    },
  },
  encyclopedia: {
    title: "错误百科",
    subtitle: "每种错误都说一门语言。查一查、弄懂它、学会回应它。",
    searchPlaceholder: "搜索报错信息、症状或关键词…",
    entriesCount: "{n} 条错误",
    langAll: "全部语言",
    catAll: "全部主题",
    noResults: "没有匹配的错误。",
    noResultsHint: "换个更短的关键词，比如“index”“margin”或“404”。",
    plainMeaning: "大白话解释",
    causes: "常见原因",
    fixes: "怎么修",
    prevention: "如何预防",
    related: "相关课程",
    reproLabel: "最小复现",
    fixedLabel: "修正版",
    severities: { low: "温和", medium: "常见", high: "隐蔽" },
    categories: {
      syntax: "语法",
      runtime: "运行时",
      logic: "逻辑",
      type: "类型",
      css: "CSS",
      html: "HTML",
      browser: "浏览器",
      javascript: "JavaScript",
      network: "网络",
      accessibility: "可访问性",
    },
    languages: { python: "Python", html: "HTML 与 CSS", javascript: "JavaScript", general: "通用 Web" },
  },
  predict: {
    title: "预测输出",
    subtitle: "不许运行——读代码、提交你的猜测，让真正的执行来判卷。",
    qOf: "第 {current} 题，共 {total} 题",
    scoreLabel: "得分",
    streakLabel: "连对",
    bestLabel: "纪录",
    pickPrompt: "哪个输出是真的？",
    typePrompt: "输入精确的输出——每行输出占一行",
    typedPlaceholder: "一行一行写出输出…",
    check: "检查我的预测",
    checking: "正在真实运行…",
    next: "下一题",
    correct: "答对了！",
    incorrect: "这次不对",
    realOutput: "它实际打印的内容",
    realDom: "浏览器实际渲染的内容",
    why: "为什么",
    yourAnswer: "你的答案",
    doneTitle: "本轮完成！",
    doneBody: "你答对了 {correct} / {total}。",
    donePerfect: "全对——完美的 {total}/{total}！",
    restart: "再玩一次",
  },
  glossary: {
    title: "术语表",
    subtitle: "学院里出现的每个术语，都有平实的英文和中文解释。",
    searchPlaceholder: "搜索术语或解释…",
    termsCount: "{n} 个术语",
    noResults: "没有匹配的术语。",
    noResultsHint: "少打几个字——输入“fun”能找到“function”。",
    exampleLabel: "示例",
    related: "相关课程",
    jumpLabel: "跳转到",
    allLetters: "全部",
  },
};

// ─── ar ──────────────────────────────────────────────────────

const ar: ToolsDict = {
  bug: {
    title: "محقّق الأخطاء",
    subtitle: "أعراض حقيقية، كود حقيقي، إصلاحات حقيقية. اقرأ الدليل، كوّن فرضية، وأغلق القضية.",
    solvedCounter: "أُغلقت {solved} من {total} قضايا",
    pickCase: "اختر ملف قضية",
    langPy: "بايثون",
    langHtml: "HTML",
    symptomLabel: "العرض",
    evidenceLabel: "الدليل — الكود نفسه",
    inputLabel: "مدخلات البرنامج (سطر لكل input())",
    run: "شغّل الدليل",
    running: "قيد التشغيل…",
    resetCode: "استعادة الكود",
    checkFix: "تحقّق من إصلاحاتي",
    checking: "جارٍ التحقق…",
    showTarget: "أظهر المخرجات المستهدفة",
    hideTarget: "أخفِ المخرجات المستهدفة",
    targetLabel: "ما ينبغي أن يُطبع",
    yourOutput: "مخرجاتك",
    notYetHint: "مخرجاتك لا تطابق الهدف بعد. شغّلها، اقرأها، غيّر شيئًا واحدًا.",
    hintReveal: "أظهر التلميح {n} من {total}",
    whyTitle: "لماذا يحدث هذا الخطأ",
    caseClosed: "أُغلقت القضية!",
    caseClosedBody: "المخرجات تطابق الهدف — حللتها بـ {hints} تلميح(ات).",
    showFix: "أظهر الكود المصحَّح",
    hideFix: "أخفِ الكود المصحَّح",
    fixedCodeLabel: "هكذا يكتبها المحقّق",
    previewLabel: "معاينة حيّة",
    checklist: "قائمة الإصلاح",
    checksPass: "كل الفحوصات ناجحة — أُغلقت القضية!",
    checksFail: "{ok} من {total} فحوصات ناجحة",
    resetProgress: "إعادة فتح كل القضايا",
    resetConfirm: "هل نُعيد تعليم كل القضايا كغير محلولة؟",
    detailCount: "وُجد {n}، والمطلوب {n2}",
    detailAttr: "الخاصية {a} مفقودة أو خاطئة",
    detailStyle: "النمط المحسوب {prop} هو {got}",
    detailText: "هذا النص غير موجود هناك",
    detailTextGone: "كان يجب أن يختفي هذا النص الآن",
    categories: {
      "off-by-one": "خطأ الواحد",
      "wrong-operator": "مُعامل خاطئ",
      mutation: "تعديل غير مقصود",
      "type-confusion": "خلط الأنواع",
      "missing-tag": "وسم غير مغلق",
      "bad-selector": "مُحدِّد خاطئ",
      "infinite-loop": "حلقة لا نهائية",
      "string-format": "تنسيق مكسور",
    },
  },
  encyclopedia: {
    title: "موسوعة الأخطاء",
    subtitle: "كل خطأ يتحدث لغة. ابحث عنه، افهمه، وتعلّم كيف تردّ عليه.",
    searchPlaceholder: "ابحث عن رسالة خطأ أو عرض أو كلمة مفتاحية…",
    entriesCount: "{n} مُدخلًا",
    langAll: "كل اللغات",
    catAll: "كل المواضيع",
    noResults: "لا خطأ يطابق هذا البحث.",
    noResultsHint: "جرّب كلمة أقصر — مثل «index» أو «margin» أو «404».",
    plainMeaning: "بكلمات بسيطة",
    causes: "الأسباب الشائعة",
    fixes: "كيف تُصلحه",
    prevention: "الوقاية",
    related: "دروس ذات صلة",
    reproLabel: "أصغر مثال مُعيد",
    fixedLabel: "النسخة الصحيحة",
    severities: { low: "لطيف", medium: "شائع", high: "خادع" },
    categories: {
      syntax: "تركيب",
      runtime: "زمن التشغيل",
      logic: "منطق",
      type: "أنواع",
      css: "CSS",
      html: "HTML",
      browser: "سلوك المتصفح",
      javascript: "جافاسكربت",
      network: "شبكة",
      accessibility: "إمكانية الوصول",
    },
    languages: { python: "بايثون", html: "HTML و CSS", javascript: "جافاسكربت", general: "الويب عمومًا" },
  },
  predict: {
    title: "توقّع المخرجات",
    subtitle: "لا تشغيل مسموح — اقرأ الكود، والتزم بتوقّعك، ودع التنفيذ الحقيقي يحكم.",
    qOf: "السؤال {current} من {total}",
    scoreLabel: "النقاط",
    streakLabel: "التتابع",
    bestLabel: "الأفضل",
    pickPrompt: "أي مخرجات هي الحقيقية؟",
    typePrompt: "اكتب المخرجات بدقة — سطر لكل سطر مخرجات",
    typedPlaceholder: "سطر مخرجات في كل سطر…",
    check: "تحقّق من توقّعي",
    checking: "نشغّله حقًا الآن…",
    next: "السؤال التالي",
    correct: "صحيح!",
    incorrect: "ليس هذه المرة",
    realOutput: "ما طُبع فعلًا",
    realDom: "ما عرضه المتصفح فعلًا",
    why: "لماذا",
    yourAnswer: "إجابتك",
    doneTitle: "اكتملت الجولة!",
    doneBody: "توقّعت {correct} من {total} بشكل صحيح.",
    donePerfect: "بلا أخطاء — {total} من {total}!",
    restart: "العب مرة أخرى",
  },
  glossary: {
    title: "قاموس المصطلحات",
    subtitle: "شرح مبسّط لكل مصطلح تلتقيه في الأكاديمية — بالإنجليزية والعربية.",
    searchPlaceholder: "ابحث عن مصطلح أو جزء من شرح…",
    termsCount: "{n} مصطلحًا",
    noResults: "لا مصطلح يطابق هذا البحث.",
    noResultsHint: "اكتب أحرفًا أقل — «دالة» ستجدها.",
    exampleLabel: "مثال",
    related: "دروس ذات صلة",
    jumpLabel: "الانتقال إلى",
    allLetters: "الكل",
  },
};

// ─── fr ──────────────────────────────────────────────────────

const fr: ToolsDict = {
  bug: {
    title: "Détective de Bugs",
    subtitle: "Symptômes réels, code réel, corrections réelles. Lis les preuves, forme une hypothèse, clos l'affaire.",
    solvedCounter: "{solved} affaires sur {total} résolues",
    pickCase: "Choisis un dossier",
    langPy: "Python",
    langHtml: "HTML",
    symptomLabel: "Le symptôme",
    evidenceLabel: "La preuve — le code",
    inputLabel: "Entrée du programme (une ligne par input())",
    run: "Exécuter la preuve",
    running: "Exécution…",
    resetCode: "Réinitialiser le code",
    checkFix: "Vérifier mes corrections",
    checking: "Vérification…",
    showTarget: "Afficher la sortie attendue",
    hideTarget: "Masquer la sortie attendue",
    targetLabel: "Ce qui devrait s'afficher",
    yourOutput: "Ta sortie",
    notYetHint: "Ta sortie ne correspond pas encore. Exécute, lis, change une seule chose.",
    hintReveal: "Révéler l'indice {n} sur {total}",
    whyTitle: "Pourquoi ce bug arrive",
    caseClosed: "Affaire classée !",
    caseClosedBody: "La sortie correspond — résolu avec {hints} indice(s).",
    showFix: "Afficher le code corrigé",
    hideFix: "Masquer le code corrigé",
    fixedCodeLabel: "Comme l'écrirait le détective",
    previewLabel: "Aperçu en direct",
    checklist: "Liste de vérification",
    checksPass: "Tous les contrôles passent — affaire classée !",
    checksFail: "{ok} contrôles sur {total} passent",
    resetProgress: "Rouvrir toutes les affaires",
    resetConfirm: "Remarquer toutes les affaires comme non résolues ?",
    detailCount: "trouvé {n}, il en faut {n2}",
    detailAttr: "l'attribut {a} manque ou est faux",
    detailStyle: "le style calculé {prop} vaut {got}",
    detailText: "ce texte n'est pas là",
    detailTextGone: "ce texte devrait avoir disparu",
    categories: {
      "off-by-one": "Décalage de un",
      "wrong-operator": "Mauvais opérateur",
      mutation: "Mutation involontaire",
      "type-confusion": "Confusion de types",
      "missing-tag": "Balise non fermée",
      "bad-selector": "Sélecteur erroné",
      "infinite-loop": "Boucle infinie",
      "string-format": "Format cassé",
    },
  },
  encyclopedia: {
    title: "Encyclopédie des Erreurs",
    subtitle: "Chaque erreur parle une langue. Cherche-la, comprends-la, apprends à lui répondre.",
    searchPlaceholder: "Cherche un message d'erreur, un symptôme, un mot-clé…",
    entriesCount: "{n} entrées",
    langAll: "Tous les langages",
    catAll: "Tous les sujets",
    noResults: "Aucune erreur ne correspond à cette recherche.",
    noResultsHint: "Essaie plus court — « index », « margin » ou « 404 ».",
    plainMeaning: "En clair",
    causes: "Causes fréquentes",
    fixes: "Comment corriger",
    prevention: "Prévention",
    related: "Leçons liées",
    reproLabel: "Repro minimal",
    fixedLabel: "Corrigé",
    severities: { low: "Doux", medium: "Courant", high: "Sournois" },
    categories: {
      syntax: "Syntaxe",
      runtime: "Exécution",
      logic: "Logique",
      type: "Types",
      css: "CSS",
      html: "HTML",
      browser: "Navigateur",
      javascript: "JavaScript",
      network: "Réseau",
      accessibility: "Accessibilité",
    },
    languages: { python: "Python", html: "HTML et CSS", javascript: "JavaScript", general: "Web général" },
  },
  predict: {
    title: "Prédire la Sortie",
    subtitle: "Interdiction d'exécuter — lis le code, engage ta réponse, et la vraie exécution te juge.",
    qOf: "Question {current} sur {total}",
    scoreLabel: "Score",
    streakLabel: "Série",
    bestLabel: "Record",
    pickPrompt: "Quelle sortie est la vraie ?",
    typePrompt: "Tape la sortie exacte — une ligne par ligne de sortie",
    typedPlaceholder: "une ligne de sortie par ligne…",
    check: "Vérifier ma prédiction",
    checking: "On l'exécute pour de vrai…",
    next: "Question suivante",
    correct: "Correct !",
    incorrect: "Pas cette fois",
    realOutput: "Ce qu'il a vraiment affiché",
    realDom: "Ce que le navigateur a vraiment rendu",
    why: "Pourquoi",
    yourAnswer: "Ta réponse",
    doneTitle: "Manche terminée !",
    doneBody: "Tu as prédit {correct} sorties sur {total}.",
    donePerfect: "Sans faute — un {total}/{total} parfait !",
    restart: "Rejouer",
  },
  glossary: {
    title: "Glossaire",
    subtitle: "Des définitions claires (en anglais et en français) pour chaque terme de l'académie.",
    searchPlaceholder: "Cherche un terme ou un bout d'explication…",
    termsCount: "{n} termes",
    noResults: "Aucun terme ne correspond à cette recherche.",
    noResultsHint: "Tape moins de lettres — « fonc » trouve « fonction ».",
    exampleLabel: "Exemple",
    related: "Leçons liées",
    jumpLabel: "Aller à",
    allLetters: "Tous",
  },
};

export const TOOLS_DICT: Record<Locale, ToolsDict> = { en, fa, es, zh, ar, fr };
