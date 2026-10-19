// TEKA NEXUS ACADEMY — self-contained portal dictionary (all 6 locales).
// This portal owns its strings (not part of the shared i18n dictionaries);
// the active locale still comes from useI18n (@/lib/i18n/store).
// en is the source of truth; every other locale is typed against PortalDict
// so tsc enforces exact key parity. fa = informal Persian ("تو" tone),
// es = tú, fr = vous, ar = MSA, zh = concise product register.

export type PortalDict = {
  meta: {
    portalAria: string;
    backToNexus: string;
    backAria: string;
  };
  nav: {
    navAria: string;
    dashboard: string;
    paths: string;
    tools: string;
    tutor: string;
    certificates: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    free: string;
    desc: string;
  };
  stats: {
    heading: string;
    xp: string;
    lessonsDone: string; // {done} of {total} lessons
    overall: string;
    certificates: string;
    licenses: string;
    coursesHeading: string;
    guestNote: string;
  };
  continue: {
    title: string;
    body: string; // {course} · {lesson}
    cta: string;
    noneTitle: string;
    noneBody: string;
    exploreCta: string;
  };
  guest: {
    title: string;
    body: string;
    cta: string;
    signIn: string;
    f1: string;
    f2: string;
    f3: string;
  };
  community: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  quick: {
    heading: string;
    pathsTitle: string;
    pathsDesc: string;
    toolsTitle: string;
    toolsDesc: string;
    tutorTitle: string;
    tutorDesc: string;
    certsTitle: string;
    certsDesc: string;
  };
  paths: {
    title: string;
    subtitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    stepModule: string; // Module {n}
    jPython: string;
    jHtml: string;
    jExam: string;
    jBuild: string;
    stepDone: string;
    stepCurrent: string;
    stepUpcoming: string;
    resume: string;
    start: string;
    jExamDesc: string;
    jBuildDesc: string;
    licensed: string;
  };
  tools: {
    title: string;
    subtitle: string;
    tabsAria: string;
    detective: string;
    encyclopedia: string;
    predict: string;
    glossary: string;
  };
  tutor: {
    title: string;
    subtitle: string;
    b1: string;
    b2: string;
    b3: string;
  };
  certs: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
    s1: string;
    s2: string;
    s3: string;
    view: string;
    licenseBadge: string;
    completionBadge: string;
    cta: string;
  };
  states: {
    errorTitle: string;
    errorBody: string;
    retry: string;
  };
};

const en: PortalDict = {
  meta: {
    portalAria: "TEKA Academy learning portal",
    backToNexus: "TEKA NEXUS",
    backAria: "Back to TEKA NEXUS",
  },
  nav: {
    navAria: "Portal sections",
    dashboard: "Dashboard",
    paths: "Paths",
    tools: "Toolbox",
    tutor: "AI Tutor",
    certificates: "Certificates",
  },
  hero: {
    eyebrow: "THE LEARNING PORTAL",
    title: "From your first line of code to building software that really works.",
    sub: "A university-quality curriculum taught like an engineering workshop.",
    free: "100% free, forever",
    desc: "Two hands-on courses, a secure final exam, real certificates and an AI tutor — all inside TEKA NEXUS.",
  },
  stats: {
    heading: "Your live progress",
    xp: "XP",
    lessonsDone: "{done} of {total} lessons",
    overall: "Overall progress",
    certificates: "Certificates",
    licenses: "TEKA licenses",
    coursesHeading: "Course progress",
    guestNote: "Progress, XP and certificates unlock with a free account.",
  },
  continue: {
    title: "Continue learning",
    body: "Pick up exactly where you left off — {course} · {lesson}.",
    cta: "Resume lesson",
    noneTitle: "Coursework complete!",
    noneBody: "You finished every lesson we have. Take your skills to the community and build something real.",
    exploreCta: "Enter the community",
  },
  guest: {
    title: "Start learning free",
    body: "No fees, no paywall, no tricks. Create a free account to save progress, earn XP and collect certificates.",
    cta: "Start learning free",
    signIn: "I already have an account",
    f1: "Interactive lessons with real code you run in your browser",
    f2: "Secure final exams with official TEKA licenses",
    f3: "A real community to build with when you're ready",
  },
  community: {
    eyebrow: "THE PORTAL'S OTHER SIDE",
    title: "Enter TEKA NEXUS",
    body: "Built something? Take your skills to the real community — real projects, real teams, real people.",
    cta: "Enter TEKA NEXUS",
  },
  quick: {
    heading: "Inside the portal",
    pathsTitle: "Learning paths",
    pathsDesc: "Three guided routes from zero to builder.",
    toolsTitle: "Practice toolbox",
    toolsDesc: "Bug Detective, Error Encyclopedia, Predict Output and a glossary.",
    tutorTitle: "AI tutor",
    tutorDesc: "Ask anything — it teaches, it doesn't just answer.",
    certsTitle: "Certificates",
    certsDesc: "Your completions and official licenses, ready to share.",
  },
  paths: {
    title: "Learning paths",
    subtitle: "Recommendations, not walls — every step jumps straight into the right lesson.",
    p1Title: "Programming Foundations",
    p1Desc: "Think in variables, loops and functions — mapped to the Python course.",
    p2Title: "Web Creation",
    p2Desc: "Structure and style real pages — mapped to the HTML & CSS course.",
    p3Title: "The full journey",
    p3Desc: "Zero → builder: Python, then web, then your official license, then build in the community.",
    stepModule: "Module {n}",
    jPython: "Python course",
    jHtml: "HTML & CSS course",
    jExam: "Secure exam & license",
    jBuild: "Build a real project",
    stepDone: "Done",
    stepCurrent: "In progress",
    stepUpcoming: "Up next",
    resume: "Resume",
    start: "Start",
    jExamDesc: "Pass the secure final exam to earn an official TEKA license.",
    jBuildDesc: "Open the community door and ship your first real project.",
    licensed: "Licensed",
  },
  tools: {
    title: "Practice toolbox",
    subtitle: "Sharpen what courses can't grade — debugging, reading errors, predicting code and vocabulary.",
    tabsAria: "Practice tools",
    detective: "Bug Detective",
    encyclopedia: "Error Encyclopedia",
    predict: "Predict Output",
    glossary: "Glossary",
  },
  tutor: {
    title: "Your AI tutor",
    subtitle: "Optional, always available, and honest about its limits — it teaches Socratically, asking before telling.",
    b1: "Teaches Socratically — guides you to the answer instead of dumping it",
    b2: "Completely optional — the courses work fully without it",
    b3: "Honest limits — it can be wrong; the graded challenges are always the source of truth",
  },
  certs: {
    title: "Certificates & licenses",
    subtitle: "Finish every lesson of a course to earn a certificate; pass the secure exam to upgrade it to an official TEKA license.",
    emptyTitle: "Nothing here yet — and that's fine",
    emptyBody: "Your wall of fame starts with lesson one.",
    s1: "Finish all lessons of a course",
    s2: "Pass the secure final exam",
    s3: "Get your official license & share it",
    view: "View",
    licenseBadge: "OFFICIAL LICENSE",
    completionBadge: "COMPLETION",
    cta: "Go to your courses",
  },
  states: {
    errorTitle: "Couldn't load your progress",
    errorBody: "Check your connection and try again.",
    retry: "Retry",
  },
};

const fa: PortalDict = {
  meta: {
    portalAria: "پورتال یادگیری آکادمی TEKA",
    backToNexus: "TEKA NEXUS",
    backAria: "بازگشت به TEKA NEXUS",
  },
  nav: {
    navAria: "بخش‌های پورتال",
    dashboard: "میز پیشرفت",
    paths: "مسیرها",
    tools: "جعبه‌ابزار",
    tutor: "معلم هوش مصنوعی",
    certificates: "گواهی‌ها",
  },
  hero: {
    eyebrow: "پورتال یادگیری",
    title: "از اولین خط کدت تا ساختنِ نرم‌افزاری که واقعاً کار می‌کنه.",
    sub: "درسی با کیفیت دانشگاه، آموزشی مثل کارگاه مهندسی.",
    free: "صددرصد رایگان، برای همیشه",
    desc: "دو دوره‌ی کاملاً عملی، یک آزمون پایانی امن، گواهی واقعی و یه معلم هوش مصنوعی — همه‌ش داخل TEKA NEXUS.",
  },
  stats: {
    heading: "پیشرفت زنده‌ی تو",
    xp: "امتیاز (XP)",
    lessonsDone: "{done} از {total} درس",
    overall: "پیشرفت کلی",
    certificates: "گواهی‌ها",
    licenses: "لایسنس‌های TEKA",
    coursesHeading: "پیشرفت دوره‌ها",
    guestNote: "پیشرفت، امتیاز و گواهی‌ها با یه حساب رایگان فعال می‌شن.",
  },
  continue: {
    title: "ادامه‌ی یادگیری",
    body: "از همون‌جا که موندیدی بردار — {course} · {lesson}.",
    cta: "بریم سراغ درس",
    noneTitle: "همه‌ی دوره‌ها تموم شد!",
    noneBody: "تمام درس‌هایی که داشتیم رو تموم کردی. حالا مهارت‌هات رو ببر تو جامعه و یه چیز واقعی بساز.",
    exploreCta: "رفتن به جامعه",
  },
  guest: {
    title: "رایگان شروع کن",
    body: "نه هزینه، نه دیوار پرداخت، نه کلک. یه حساب رایگان بساز تا پیشرفتت ذخیره بشه، امتیاز بگیری و گواهی جمع کنی.",
    cta: "شروع یادگیری رایگان",
    signIn: "حساب دارم",
    f1: "درس‌های تعاملی با کد واقعی که تو مرورگر خودت اجراش می‌کنی",
    f2: "آزمون پایانی امن با لایسنس رسمی TEKA",
    f3: "یه جامعه‌ی واقعی برای وقتی که آماده‌ی ساختن شدی",
  },
  community: {
    eyebrow: "اون‌طرف پورتال",
    title: "وارد TEKA NEXUS شو",
    body: "چیزی ساختی؟ مهارت‌هات رو ببر تو جامعه‌ی واقعی — پروژه‌های واقعی، تیم‌های واقعی، آدم‌های واقعی.",
    cta: "وارد TEKA NEXUS شو",
  },
  quick: {
    heading: "داخل پورتال",
    pathsTitle: "مسیرهای یادگیری",
    pathsDesc: "سه مسیر راهنما از صفر تا ساختن.",
    toolsTitle: "جعبه‌ابزار تمرین",
    toolsDesc: "کارآگاه باگ، دانشنامه‌ی خطاها، حدس خروجی و واژه‌نامه.",
    tutorTitle: "معلم هوش مصنوعی",
    tutorDesc: "هر چی می‌خوای بپرس — یاد می‌ده، فقط جواب نمی‌ده.",
    certsTitle: "گواهی‌ها",
    certsDesc: "تکمیل‌ها و لایسنس‌های رسمیت — آماده‌ی اشتراک‌گذاری.",
  },
  paths: {
    title: "مسیرهای یادگیری",
    subtitle: "پیشنهاد هستن، نه دیوار — هر مرحله مستقیم می‌بره‌ت سراغ درسِ درست.",
    p1Title: "مبانی برنامه‌نویسی",
    p1Desc: "با متغیر، حلقه و تابع فکر کن — همون دوره‌ی پایتون.",
    p2Title: "ساخت وب",
    p2Desc: "صفحه‌های واقعی رو بساز و استایل بده — همون دوره‌ی HTML و CSS.",
    p3Title: "سفر کامل",
    p3Desc: "از صفر تا بساز: پایتون، بعد وب، بعد لایسنس رسمی، بعد ساختن تو جامعه.",
    stepModule: "ماژول {n}",
    jPython: "دوره‌ی پایتون",
    jHtml: "دوره‌ی HTML و CSS",
    jExam: "آزمون امن و لایسنس",
    jBuild: "ساخت یه پروژه‌ی واقعی",
    stepDone: "تموم شده",
    stepCurrent: "در حال انجام",
    stepUpcoming: "بعدی",
    resume: "ادامه",
    start: "شروع",
    jExamDesc: "آزمون امنِ پایانی رو پاس کن تا لایسنس رسمی TEKA بگیری.",
    jBuildDesc: "درِ جامعه رو باز کن و اولین پروژه‌ی واقعیت رو عرضه کن.",
    licensed: "لایسنس‌دار",
  },
  tools: {
    title: "جعبه‌ابزار تمرین",
    subtitle: "مهارت‌هایی رو تیز کن که دوره‌ها نمره‌شون نمی‌دن — دیباگ، خوندن خطاها، حدس زدن کد و واژگان.",
    tabsAria: "ابزارهای تمرین",
    detective: "کارآگاه باگ",
    encyclopedia: "دانشنامه‌ی خطاها",
    predict: "حدس خروجی",
    glossary: "واژه‌نامه",
  },
  tutor: {
    title: "معلم هوش مصنوعی‌ت",
    subtitle: "اختیاریه، همیشه در دسترسه و درباره‌ی محدودیت‌هاش صادقه — سقراطی درس می‌ده؛ اول سؤال می‌پرسه، بعد جواب می‌ده.",
    b1: "سقراطی درس می‌ده — به جای اینکه جواب رو لو بده، خودت رو تا جواب هدایت می‌کنه",
    b2: "کاملاً اختیاریه — دوره‌ها بدون اون هم کامل کار می‌کنن",
    b3: "محدودیت‌هاش رو صادقانه می‌گه — ممکنه اشتباه کنه؛ چالش‌های نمره‌دار همیشه مرجعن",
  },
  certs: {
    title: "گواهی‌ها و لایسنس‌ها",
    subtitle: "همه‌ی درس‌های یه دوره رو تموم کن تا گواهی بگیری؛ آزمون امن رو پاس کن تا بشه لایسنس رسمی TEKA.",
    emptyTitle: "هنوز چیزی اینجا نیست — اشکالی نداره",
    emptyBody: "دیوار افتخارت از درس اول شروع می‌شه.",
    s1: "همه‌ی درس‌های یه دوره رو تموم کن",
    s2: "آزمون امنِ پایانی رو پاس کن",
    s3: "لایسنس رسمیت رو بگیر و به اشتراک بذار",
    view: "مشاهده",
    licenseBadge: "لایسنس رسمی",
    completionBadge: "تکمیل دوره",
    cta: "بریم سراغ دوره‌ها",
  },
  states: {
    errorTitle: "پیشرفتت لود نشد",
    errorBody: "اتصالت رو چک کن و دوباره امتحان کن.",
    retry: "تلاش دوباره",
  },
};

const es: PortalDict = {
  meta: {
    portalAria: "Portal de aprendizaje de TEKA Academy",
    backToNexus: "TEKA NEXUS",
    backAria: "Volver a TEKA NEXUS",
  },
  nav: {
    navAria: "Secciones del portal",
    dashboard: "Panel",
    paths: "Rutas",
    tools: "Herramientas",
    tutor: "Tutor IA",
    certificates: "Certificados",
  },
  hero: {
    eyebrow: "EL PORTAL DE APRENDIZAJE",
    title: "Desde tu primera línea de código hasta construir software que de verdad funciona.",
    sub: "Plan de estudios con calidad universitaria, enseñado como un taller de ingeniería.",
    free: "100% gratis, para siempre",
    desc: "Dos cursos prácticos, un examen final seguro, certificados reales y un tutor con IA — todo dentro de TEKA NEXUS.",
  },
  stats: {
    heading: "Tu progreso en vivo",
    xp: "XP",
    lessonsDone: "{done} de {total} lecciones",
    overall: "Progreso general",
    certificates: "Certificados",
    licenses: "Licencias TEKA",
    coursesHeading: "Progreso por curso",
    guestNote: "El progreso, el XP y los certificados se activan con una cuenta gratuita.",
  },
  continue: {
    title: "Continúa aprendiendo",
    body: "Retoma justo donde lo dejaste — {course} · {lesson}.",
    cta: "Retomar lección",
    noneTitle: "¡Curso completado!",
    noneBody: "Terminaste todas las lecciones que tenemos. Lleva tus habilidades a la comunidad y construye algo real.",
    exploreCta: "Entrar a la comunidad",
  },
  guest: {
    title: "Empieza a aprender gratis",
    body: "Sin cuotas, sin muros de pago, sin trampas. Crea una cuenta gratuita para guardar tu progreso, ganar XP y conseguir certificados.",
    cta: "Aprender gratis",
    signIn: "Ya tengo una cuenta",
    f1: "Lecciones interactivas con código real que ejecutas en tu navegador",
    f2: "Examen final seguro con licencias oficiales de TEKA",
    f3: "Una comunidad real para construir cuando estés listo",
  },
  community: {
    eyebrow: "EL OTRO LADO DEL PORTAL",
    title: "Entra a TEKA NEXUS",
    body: "¿Ya construiste algo? Lleva tus habilidades a la comunidad real — proyectos reales, equipos reales, personas reales.",
    cta: "Entrar a TEKA NEXUS",
  },
  quick: {
    heading: "Dentro del portal",
    pathsTitle: "Rutas de aprendizaje",
    pathsDesc: "Tres rutas guiadas de cero a constructor.",
    toolsTitle: "Caja de herramientas",
    toolsDesc: "Detective de bugs, Enciclopedia de errores, Predice la salida y un glosario.",
    tutorTitle: "Tutor IA",
    tutorDesc: "Pregunta lo que quieras — enseña, no solo responde.",
    certsTitle: "Certificados",
    certsDesc: "Tus completaciones y licencias oficiales, listas para compartir.",
  },
  paths: {
    title: "Rutas de aprendizaje",
    subtitle: "Son recomendaciones, no muros — cada paso salta directo a la lección correcta.",
    p1Title: "Fundamentos de programación",
    p1Desc: "Piensa en variables, bucles y funciones — el curso de Python.",
    p2Title: "Creación web",
    p2Desc: "Estructura y estiliza páginas reales — el curso de HTML y CSS.",
    p3Title: "El viaje completo",
    p3Desc: "De cero a constructor: Python, luego web, luego tu licencia oficial y a construir en la comunidad.",
    stepModule: "Módulo {n}",
    jPython: "Curso de Python",
    jHtml: "Curso de HTML y CSS",
    jExam: "Examen seguro y licencia",
    jBuild: "Construir un proyecto real",
    stepDone: "Completado",
    stepCurrent: "En progreso",
    stepUpcoming: "Siguiente",
    resume: "Continuar",
    start: "Empezar",
    jExamDesc: "Aprueba el examen final seguro para ganar una licencia oficial de TEKA.",
    jBuildDesc: "Abre la puerta de la comunidad y lanza tu primer proyecto real.",
    licensed: "Con licencia",
  },
  tools: {
    title: "Caja de herramientas de práctica",
    subtitle: "Afina lo que los cursos no califican — depurar, leer errores, predecir código y vocabulario.",
    tabsAria: "Herramientas de práctica",
    detective: "Detective de bugs",
    encyclopedia: "Enciclopedia de errores",
    predict: "Predice la salida",
    glossary: "Glosario",
  },
  tutor: {
    title: "Tu tutor con IA",
    subtitle: "Opcional, siempre disponible y honesto con sus límites — enseña socráticamente: pregunta antes de decir.",
    b1: "Enseña socráticamente — te guía hacia la respuesta en vez de soltarla",
    b2: "Totalmente opcional — los cursos funcionan por sí solos",
    b3: "Límites honestos — puede equivocarse; los retos calificados son siempre la fuente de la verdad",
  },
  certs: {
    title: "Certificados y licencias",
    subtitle: "Termina todas las lecciones de un curso para ganar un certificado; aprueba el examen seguro para convertirlo en una licencia oficial de TEKA.",
    emptyTitle: "Aún no hay nada aquí — y está bien",
    emptyBody: "Tu muro de la fama empieza con la lección uno.",
    s1: "Termina todas las lecciones de un curso",
    s2: "Aprueba el examen final seguro",
    s3: "Consigue tu licencia oficial y compártela",
    view: "Ver",
    licenseBadge: "LICENCIA OFICIAL",
    completionBadge: "COMPLETADO",
    cta: "Ir a tus cursos",
  },
  states: {
    errorTitle: "No pudimos cargar tu progreso",
    errorBody: "Revisa tu conexión e inténtalo de nuevo.",
    retry: "Reintentar",
  },
};

const zh: PortalDict = {
  meta: {
    portalAria: "TEKA Academy 学习门户",
    backToNexus: "TEKA NEXUS",
    backAria: "返回 TEKA NEXUS",
  },
  nav: {
    navAria: "门户栏目",
    dashboard: "学习面板",
    paths: "学习路径",
    tools: "工具箱",
    tutor: "AI 导师",
    certificates: "证书",
  },
  hero: {
    eyebrow: "学习门户",
    title: "从你的第一行代码，到写出真正能用的软件。",
    sub: "大学级课程体系 × 工程工作坊式教学。",
    free: "永久免费",
    desc: "两门动手课程、一场安全期末考试、真实证书和一位 AI 导师 —— 全部都在 TEKA NEXUS 里。",
  },
  stats: {
    heading: "你的实时进度",
    xp: "XP 经验",
    lessonsDone: "{done} / {total} 课时",
    overall: "总进度",
    certificates: "证书",
    licenses: "TEKA 执照",
    coursesHeading: "课程进度",
    guestNote: "注册免费账号即可解锁进度、XP 与证书。",
  },
  continue: {
    title: "继续学习",
    body: "从上次停下的地方接着来 —— {course} · {lesson}。",
    cta: "继续本课",
    noneTitle: "课程全部完成！",
    noneBody: "我们现有的课时你都学完了。带着技能去社区，做点真东西吧。",
    exploreCta: "进入社区",
  },
  guest: {
    title: "免费开始学习",
    body: "不收费、不设墙、不玩套路。注册免费账号，保存进度、赚取 XP、收集证书。",
    cta: "免费开始学习",
    signIn: "我已经有账号",
    f1: "交互式课时，代码直接在浏览器里运行",
    f2: "安全的期末考试，颁发官方 TEKA 执照",
    f3: "等你准备好时，一个真实的社区等你来构建",
  },
  community: {
    eyebrow: "门户的另一端",
    title: "进入 TEKA NEXUS",
    body: "已经做出东西了？把技能带到真实社区 —— 真项目、真团队、真伙伴。",
    cta: "进入 TEKA NEXUS",
  },
  quick: {
    heading: "门户里有什么",
    pathsTitle: "学习路径",
    pathsDesc: "三条从零到构建者的引导路线。",
    toolsTitle: "练习工具箱",
    toolsDesc: "Bug 侦探、错误百科、预测输出和术语表。",
    tutorTitle: "AI 导师",
    tutorDesc: "随便问 —— 它教你思考，而不是只给答案。",
    certsTitle: "证书",
    certsDesc: "你的结业证书与官方执照，随时可以展示。",
  },
  paths: {
    title: "学习路径",
    subtitle: "是推荐，不是围墙 —— 每一步都会直接跳到对应的课时。",
    p1Title: "编程基础",
    p1Desc: "用变量、循环和函数思考 —— 对应 Python 课程。",
    p2Title: "网页创造",
    p2Desc: "搭建并美化真实页面 —— 对应 HTML 与 CSS 课程。",
    p3Title: "完整旅程",
    p3Desc: "从零到构建者：Python → Web → 官方执照 → 到社区里做项目。",
    stepModule: "模块 {n}",
    jPython: "Python 课程",
    jHtml: "HTML 与 CSS 课程",
    jExam: "安全考试与执照",
    jBuild: "做一个真实项目",
    stepDone: "已完成",
    stepCurrent: "进行中",
    stepUpcoming: "接下来",
    resume: "继续",
    start: "开始",
    jExamDesc: "通过安全期末考试，赢取官方 TEKA 执照。",
    jBuildDesc: "打开社区之门，发布你的第一个真实项目。",
    licensed: "已获执照",
  },
  tools: {
    title: "练习工具箱",
    subtitle: "打磨课程不评分的能力 —— 调试、读报错、预测代码和词汇。",
    tabsAria: "练习工具",
    detective: "Bug 侦探",
    encyclopedia: "错误百科",
    predict: "预测输出",
    glossary: "术语表",
  },
  tutor: {
    title: "你的 AI 导师",
    subtitle: "可选、随时可用，并坦诚自己的局限 —— 用苏格拉底式提问来教学：先问，再讲。",
    b1: "苏格拉底式教学 —— 引导你自己走向答案，而不是直接给",
    b2: "完全可选 —— 没有它课程照样完整",
    b3: "诚实的局限 —— 它可能出错；评分挑战永远是唯一标准",
  },
  certs: {
    title: "证书与执照",
    subtitle: "学完一门课的全部课时获得证书；通过安全考试即可升级为官方 TEKA 执照。",
    emptyTitle: "这里还空着 —— 没关系",
    emptyBody: "你的荣誉墙从第一课时开始。",
    s1: "学完一门课的全部课时",
    s2: "通过安全的期末考试",
    s3: "拿到官方执照并展示它",
    view: "查看",
    licenseBadge: "官方执照",
    completionBadge: "结业证书",
    cta: "去上课",
  },
  states: {
    errorTitle: "进度加载失败",
    errorBody: "请检查网络后重试。",
    retry: "重试",
  },
};

const ar: PortalDict = {
  meta: {
    portalAria: "بوابة التعلّم في TEKA Academy",
    backToNexus: "TEKA NEXUS",
    backAria: "العودة إلى TEKA NEXUS",
  },
  nav: {
    navAria: "أقسام البوابة",
    dashboard: "لوحة التقدم",
    paths: "المسارات",
    tools: "الأدوات",
    tutor: "المعلّم الذكي",
    certificates: "الشهادات",
  },
  hero: {
    eyebrow: "بوابة التعلّم",
    title: "من سطر الكود الأول إلى بناء برمجيات تعمل فعلًا.",
    sub: "منهج بجودة جامعية يُدرَّس على طريقة ورشة هندسية.",
    free: "مجاني 100%، إلى الأبد",
    desc: "دوران عمليان، وامتحان نهائي آمن، وشهادات حقيقية ومعلّم ذكي — كل ذلك داخل TEKA NEXUS.",
  },
  stats: {
    heading: "تقدمك المباشر",
    xp: "نقاط الخبرة",
    lessonsDone: "{done} من {total} دروس",
    overall: "التقدم الكلي",
    certificates: "الشهادات",
    licenses: "تراخيص TEKA",
    coursesHeading: "تقدم الدورات",
    guestNote: "يُفتح التقدم والنقاط والشهادات بحساب مجاني.",
  },
  continue: {
    title: "واصل التعلّم",
    body: "أكمل من حيث توقفت تمامًا — {course} · {lesson}.",
    cta: "متابعة الدرس",
    noneTitle: "أكملت المنهج!",
    noneBody: "أنهيت كل الدروس المتاحة. خذ مهاراتك إلى المجتمع وابنِ شيئًا حقيقيًا.",
    exploreCta: "الدخول إلى المجتمع",
  },
  guest: {
    title: "ابدأ التعلّم مجانًا",
    body: "بلا رسوم، بلا حوائج دفع، بلا حيل. أنشئ حسابًا مجانيًا لحفظ تقدمك وكسب النقاط وجمع الشهادات.",
    cta: "ابدأ التعلّم مجانًا",
    signIn: "لديّ حساب بالفعل",
    f1: "دروس تفاعلية بكود حقيقي تشغّله في متصفحك",
    f2: "امتحان نهائي آمن مع تراخيص TEKA رسمية",
    f3: "مجتمع حقيقي تبني فيه عندما تكون جاهزًا",
  },
  community: {
    eyebrow: "الجهة الأخرى من البوابة",
    title: "ادخل إلى TEKA NEXUS",
    body: "بنيت شيئًا؟ خذ مهاراتك إلى المجتمع الحقيقي — مشاريع حقيقية، فرق حقيقية، أشخاص حقيقيون.",
    cta: "ادخل إلى TEKA NEXUS",
  },
  quick: {
    heading: "داخل البوابة",
    pathsTitle: "مسارات التعلّم",
    pathsDesc: "ثلاثة مسارات موجهة من الصفر إلى الباني.",
    toolsTitle: "صندوق أدوات التدريب",
    toolsDesc: "محقق الأخطاء، موسوعة الأخطاء، توقّع المخرجات ومعجم المصطلحات.",
    tutorTitle: "المعلّم الذكي",
    tutorDesc: "اسأل ما شئت — يعلّمك ولا يكتفي بالإجابة.",
    certsTitle: "الشهادات",
    certsDesc: "شهاداتك وتراخيصك الرسمية جاهزة للمشاركة.",
  },
  paths: {
    title: "مسارات التعلّم",
    subtitle: "توصيات لا جدران — كل خطوة تنقلك مباشرة إلى الدرس الصحيح.",
    p1Title: "أساسيات البرمجة",
    p1Desc: "فكّر بالمتغيرات والحلقات والدوال — دورة Python.",
    p2Title: "صناعة الويب",
    p2Desc: "ابنِ صفحات حقيقية وتنسيقها — دورة HTML وCSS.",
    p3Title: "الرحلة الكاملة",
    p3Desc: "من الصفر إلى الباني: بايثون، ثم الويب، ثم رخصتك الرسمية، ثم ابنِ في المجتمع.",
    stepModule: "الوحدة {n}",
    jPython: "دورة Python",
    jHtml: "دورة HTML وCSS",
    jExam: "الامتحان الآمن والرخصة",
    jBuild: "ابنِ مشروعًا حقيقيًا",
    stepDone: "مكتمل",
    stepCurrent: "قيد التقدم",
    stepUpcoming: "التالي",
    resume: "متابعة",
    start: "ابدأ",
    jExamDesc: "اجتز الامتحان النهائي الآمن لتحصل على رخصة TEKA رسمية.",
    jBuildDesc: "افتح باب المجتمع وأطلق أول مشروع حقيقي لك.",
    licensed: "مرخّص",
  },
  tools: {
    title: "صندوق أدوات التدريب",
    subtitle: "اشحذ ما لا تقيّمه الدورات — التنقيح وقراءة الأخطاء والتنبؤ بالكود والمصطلحات.",
    tabsAria: "أدوات التدريب",
    detective: "محقق الأخطاء",
    encyclopedia: "موسوعة الأخطاء",
    predict: "توقّع المخرجات",
    glossary: "المعجم",
  },
  tutor: {
    title: "معلّمك الذكي",
    subtitle: "اختياري ومتاح دائمًا وصادق حول حدوده — يعلّم بالطريقة السقراطية: يسأل قبل أن يخبر.",
    b1: "يعلّم بالطريقة السقراطية — يرشدك إلى الإجابة بدل أن يلقنها",
    b2: "اختياري تمامًا — الدورات تعمل كاملة بدونه",
    b3: "حدود صادقة — قد يخطئ؛ التحديات المُقيَّمة هي المرجع دائمًا",
  },
  certs: {
    title: "الشهادات والتراخيص",
    subtitle: "أنهِ كل دروس دورة لتحصل على شهادة؛ واجتز الامتحان الآمن لترتقي إلى رخصة TEKA رسمية.",
    emptyTitle: "لا شيء هنا بعد — ولا بأس",
    emptyBody: "جدار مجدك يبدأ من الدرس الأول.",
    s1: "أنهِ كل دروس دورة واحدة",
    s2: "اجتز الامتحان النهائي الآمن",
    s3: "احصل على رخصتك الرسمية وشاركها",
    view: "عرض",
    licenseBadge: "رخصة رسمية",
    completionBadge: "إتمام دورة",
    cta: "انتقل إلى دوراتك",
  },
  states: {
    errorTitle: "تعذّر تحميل تقدمك",
    errorBody: "تحقق من اتصالك وحاول مرة أخرى.",
    retry: "إعادة المحاولة",
  },
};

const fr: PortalDict = {
  meta: {
    portalAria: "Portail d'apprentissage TEKA Academy",
    backToNexus: "TEKA NEXUS",
    backAria: "Retour à TEKA NEXUS",
  },
  nav: {
    navAria: "Sections du portail",
    dashboard: "Tableau de bord",
    paths: "Parcours",
    tools: "Outils",
    tutor: "Tuteur IA",
    certificates: "Certificats",
  },
  hero: {
    eyebrow: "LE PORTAIL D'APPRENTISSAGE",
    title: "De votre première ligne de code à la création de logiciels qui fonctionnent vraiment.",
    sub: "Un programme de qualité universitaire, enseigné comme un atelier d'ingénierie.",
    free: "100 % gratuit, pour toujours",
    desc: "Deux cours pratiques, un examen final sécurisé, de vrais certificats et un tuteur IA — tout est dans TEKA NEXUS.",
  },
  stats: {
    heading: "Votre progression en direct",
    xp: "XP",
    lessonsDone: "{done} leçons sur {total}",
    overall: "Progression globale",
    certificates: "Certificats",
    licenses: "Licences TEKA",
    coursesHeading: "Progression par cours",
    guestNote: "La progression, l'XP et les certificats se débloquent avec un compte gratuit.",
  },
  continue: {
    title: "Reprendre l'apprentissage",
    body: "Reprenez exactement où vous en étiez — {course} · {lesson}.",
    cta: "Reprendre la leçon",
    noneTitle: "Programme terminé !",
    noneBody: "Vous avez terminé toutes les leçons disponibles. Emportez vos compétences dans la communauté et construisez quelque chose de réel.",
    exploreCta: "Entrer dans la communauté",
  },
  guest: {
    title: "Commencez à apprendre gratuitement",
    body: "Ni frais, ni paywall, ni artifice. Créez un compte gratuit pour sauvegarder votre progression, gagner de l'XP et récolter des certificats.",
    cta: "Apprendre gratuitement",
    signIn: "J'ai déjà un compte",
    f1: "Des leçons interactives avec du vrai code exécuté dans votre navigateur",
    f2: "Un examen final sécurisé avec licences officielles TEKA",
    f3: "Une vraie communauté où construire quand vous serez prêt",
  },
  community: {
    eyebrow: "L'AUTRE CÔTÉ DU PORTAIL",
    title: "Entrez dans TEKA NEXUS",
    body: "Vous avez construit quelque chose ? Portez vos compétences dans la vraie communauté — de vrais projets, de vraies équipes, de vraies personnes.",
    cta: "Entrer dans TEKA NEXUS",
  },
  quick: {
    heading: "Dans le portail",
    pathsTitle: "Parcours d'apprentissage",
    pathsDesc: "Trois routes guidées de zéro à bâtisseur.",
    toolsTitle: "Boîte à outils d'entraînement",
    toolsDesc: "Détective de bugs, Encyclopédie des erreurs, Prédire la sortie et un glossaire.",
    tutorTitle: "Tuteur IA",
    tutorDesc: "Posez toutes vos questions — il enseigne, il ne se contente pas de répondre.",
    certsTitle: "Certificats",
    certsDesc: "Vos diplômes et licences officielles, prêts à partager.",
  },
  paths: {
    title: "Parcours d'apprentissage",
    subtitle: "Des recommandations, pas des murs — chaque étape saute directement à la bonne leçon.",
    p1Title: "Fondamentaux de la programmation",
    p1Desc: "Penser en variables, boucles et fonctions — le cours Python.",
    p2Title: "Création web",
    p2Desc: "Structurer et styliser de vraies pages — le cours HTML & CSS.",
    p3Title: "Le parcours complet",
    p3Desc: "De zéro à bâtisseur : Python, puis le web, puis votre licence officielle, puis construisez dans la communauté.",
    stepModule: "Module {n}",
    jPython: "Cours de Python",
    jHtml: "Cours HTML & CSS",
    jExam: "Examen sécurisé & licence",
    jBuild: "Construire un vrai projet",
    stepDone: "Terminé",
    stepCurrent: "En cours",
    stepUpcoming: "À venir",
    resume: "Reprendre",
    start: "Commencer",
    jExamDesc: "Réussissez l'examen final sécurisé pour obtenir une licence officielle TEKA.",
    jBuildDesc: "Ouvrez la porte de la communauté et lancez votre premier vrai projet.",
    licensed: "Licence obtenue",
  },
  tools: {
    title: "Boîte à outils d'entraînement",
    subtitle: "Aiguisez ce que les cours ne notent pas — déboguer, lire les erreurs, prédire le code et le vocabulaire.",
    tabsAria: "Outils d'entraînement",
    detective: "Détective de bugs",
    encyclopedia: "Encyclopédie des erreurs",
    predict: "Prédire la sortie",
    glossary: "Glossaire",
  },
  tutor: {
    title: "Votre tuteur IA",
    subtitle: "Optionnel, toujours disponible et honnête sur ses limites — il enseigne en socratique : il demande avant de dire.",
    b1: "Enseignement socratique — il vous guide vers la réponse au lieu de la donner",
    b2: "Totalement optionnel — les cours fonctionnent parfaitement sans lui",
    b3: "Des limites assumées — il peut se tromper ; les défis notés restent la source de vérité",
  },
  certs: {
    title: "Certificats & licences",
    subtitle: "Terminez toutes les leçons d'un cours pour obtenir un certificat ; réussissez l'examen sécurisé pour le transformer en licence officielle TEKA.",
    emptyTitle: "Rien ici pour l'instant — et c'est très bien",
    emptyBody: "Votre mur de gloire commence à la leçon un.",
    s1: "Terminez toutes les leçons d'un cours",
    s2: "Réussissez l'examen final sécurisé",
    s3: "Obtenez votre licence officielle et partagez-la",
    view: "Voir",
    licenseBadge: "LICENCE OFFICIELLE",
    completionBadge: "DIPLÔME",
    cta: "Aller à vos cours",
  },
  states: {
    errorTitle: "Impossible de charger votre progression",
    errorBody: "Vérifiez votre connexion puis réessayez.",
    retry: "Réessayer",
  },
};

export const PORTAL_DICT: Record<"en" | "fa" | "es" | "zh" | "ar" | "fr", PortalDict> = { en, fa, es, zh, ar, fr };
