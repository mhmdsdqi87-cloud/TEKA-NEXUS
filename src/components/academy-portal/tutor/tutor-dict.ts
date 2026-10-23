// TEKA NEXUS — AI Tutor panel dictionary (self-contained).
// Seven locales; Persian uses the app's informal tone. English is the source of
// truth — every other locale implements TutorDict exactly.

import type { Locale } from "@/lib/i18n/locales";

export type TutorDict = {
  /** Panel / button title, e.g. "AI Tutor" */
  title: string;
  /** One-line persona promise: teaches, doesn't just answer */
  tagline: string;
  /** Context chip prefix: "Discussing" */
  discussing: string;
  clearChat: string;
  placeholder: string;
  /** a11y label for the send button */
  send: string;
  /** a11y label for the typing indicator */
  typing: string;
  /** First tutor bubble shown when the chat is empty */
  greeting: string;
  /** Exactly four quick-prompt chips, in display order */
  quickPrompts: [string, string, string, string];
  /** Inline retry chip label after a failed request */
  retry: string;
  /** Fallback error when the server gives no readable message */
  errGeneric: string;
  /** Fallback for HTTP 429 when the server message is missing */
  errRate: string;
  /** Badge shown on replies produced by the offline lesson-notes fallback */
  offlineBadge: string;
  /** Honest-AI footer line */
  disclaimer: string;
};

export const TUTOR_DICT: Record<Locale, TutorDict> = {
  en: {
    title: "AI Tutor",
    tagline: "I teach — I don't just hand out answers.",
    discussing: "Discussing",
    clearChat: "Clear chat",
    placeholder: "Ask anything about this lesson…",
    send: "Send",
    typing: "Tutor is typing…",
    greeting:
      "Hi! I'm your tutor. I won't just hand you answers — I'll help you figure them out yourself. Where do we start?",
    quickPrompts: [
      "Explain this lesson simply",
      "Give me a hint, don't spoil it",
      "Quiz me on this",
      "Show a real-world example",
    ],
    retry: "Retry",
    errGeneric: "The tutor is unreachable right now. Please try again.",
    errRate: "You've hit the chat limit — take a short break and come back.",
    offlineBadge: "Offline mode — answered from lesson notes",
    disclaimer: "AI can make mistakes — verify anything important.",
  },

  fa: {
    title: "معلم هوش مصنوعی",
    tagline: "یاد می‌دم — فقط جواب لُخت نمی‌دم.",
    discussing: "در حال گفت‌وگو دربارهٔ",
    clearChat: "پاک کردن گفت‌وگو",
    placeholder: "هر چی دربارهٔ این درس می‌خوای بپرس…",
    send: "بفرست",
    typing: "معلم داره می‌نویسه…",
    greeting:
      "سلام! من معلم توام. جواب رو لُخت نمی‌دم — کمکت می‌کنم خودت پیداش کنی. از کجا شروع کنیم؟",
    quickPrompts: [
      "این درس رو ساده توضیح بده",
      "یه راهنما بده، جواب رو لو نده",
      "از من تست بگیر",
      "یه مثال واقعی بزن",
    ],
    retry: "دوباره تلاش کن",
    errGeneric: "الان معلم در دسترس نیست. لطفاً دوباره امتحان کن.",
    errRate: "به سقف گفت‌وگو رسیدی — یه استراحت کوتاه بده و برگرد.",
    offlineBadge: "حالت آفلاین — از جزوهٔ درس جواب دادم",
    disclaimer: "هوش مصنوعی ممکنه اشتباه کنه — چیزهای مهم رو خودت هم چک کن.",
  },

  es: {
    title: "Tutor IA",
    tagline: "Enseño — no solo doy respuestas.",
    discussing: "Discutiendo",
    clearChat: "Borrar chat",
    placeholder: "Pregunta lo que quieras sobre esta lección…",
    send: "Enviar",
    typing: "El tutor está escribiendo…",
    greeting:
      "¡Hola! Soy tu tutor. No te doy las respuestas sin más: te ayudo a descubrirlas tú mismo. ¿Por dónde empezamos?",
    quickPrompts: [
      "Explícame esta lección de forma simple",
      "Dame una pista, sin spoilers",
      "Hazme preguntas sobre esto",
      "Muéstrame un ejemplo real",
    ],
    retry: "Reintentar",
    errGeneric: "El tutor no está disponible ahora mismo. Inténtalo de nuevo.",
    errRate: "Alcanzaste el límite del chat — toma un respiro y vuelve.",
    offlineBadge: "Modo sin conexión — respondido con apuntes de la lección",
    disclaimer: "La IA puede equivocarse — verifica lo importante.",
  },

  zh: {
    title: "AI 导师",
    tagline: "我教你思考，不只给答案。",
    discussing: "正在讨论",
    clearChat: "清空对话",
    placeholder: "关于这节课，想问什么都可以…",
    send: "发送",
    typing: "导师正在输入…",
    greeting:
      "你好！我是你的导师。我不会直接把答案丢给你，而是引导你自己把它想明白。从哪里开始？",
    quickPrompts: [
      "用简单的话讲解这节课",
      "给我个提示，别剧透答案",
      "用这个考考我",
      "给我看一个真实例子",
    ],
    retry: "重试",
    errGeneric: "导师暂时联系不上，请重试。",
    errRate: "你已达到聊天上限——休息几分钟再回来吧。",
    offlineBadge: "离线模式 — 已用课程笔记回答",
    disclaimer: "AI 可能出错——重要内容请自行核实。",
  },

  ar: {
    title: "المعلّم الذكي",
    tagline: "أعلّمك التفكير — لا أمنحك الجواب جاهزًا.",
    discussing: "نتحدث عن",
    clearChat: "مسح المحادثة",
    placeholder: "اسأل أي شيء عن هذا الدرس…",
    send: "إرسال",
    typing: "المعلّم يكتب…",
    greeting:
      "مرحبًا! أنا معلّمك. لن أعطيك الجواب جاهزًا — سأساعدك على اكتشافه بنفسك. من أين نبدأ؟",
    quickPrompts: [
      "اشرح لي هذا الدرس ببساطة",
      "أعطني تلميحًا دون أن تحرق الجواب",
      "اختبرني في هذا",
      "أرني مثالًا من الواقع",
    ],
    retry: "إعادة المحاولة",
    errGeneric: "المعلّم غير متاح حاليًا. حاول مرة أخرى.",
    errRate: "وصلتَ إلى حد المحادثة — خذ استراحة قصيرة وعُد لاحقًا.",
    offlineBadge: "وضع عدم الاتصال — أُجيب من ملاحظات الدرس",
    disclaimer: "قد يخطئ الذكاء الاصطناعي — تحقّق مما هو مهم.",
  },

  fr: {
    title: "Tuteur IA",
    tagline: "J'enseigne — je ne déballe pas les réponses.",
    discussing: "En discussion sur",
    clearChat: "Effacer la conversation",
    placeholder: "Pose ta question sur cette leçon…",
    send: "Envoyer",
    typing: "Le tuteur écrit…",
    greeting:
      "Salut ! Je suis ton tuteur. Je ne te donne pas les réponses toutes faites — on va les construire ensemble. On commence par quoi ?",
    quickPrompts: [
      "Explique-moi cette leçon simplement",
      "Donne-moi un indice, sans spoiler",
      "Interroge-moi là-dessus",
      "Montre-moi un exemple concret",
    ],
    retry: "Réessayer",
    errGeneric: "Le tuteur est injoignable pour le moment. Réessaie.",
    errRate: "Tu as atteint la limite de chat — fais une pause et reviens.",
    offlineBadge: "Mode hors ligne — répondu depuis les notes du cours",
    disclaimer: "L'IA peut se tromper — vérifie ce qui est important.",
  },

  ru: {
    title: "ИИ-репетитор",
    tagline: "Я учу — а не просто раздаю ответы.",
    discussing: "Обсуждаем",
    clearChat: "Очистить чат",
    placeholder: "Спроси о чём угодно по этому уроку…",
    send: "Отправить",
    typing: "Репетитор печатает…",
    greeting:
      "Привет! Я твой репетитор. Я не раздаю готовые ответы — я помогу тебе разобраться самому. С чего начнём?",
    quickPrompts: [
      "Объясни этот урок простыми словами",
      "Дай подсказку, не раскрывай ответ",
      "Проверь меня по этой теме",
      "Покажи пример из реальной жизни",
    ],
    retry: "Ещё раз",
    errGeneric: "Репетитор сейчас недоступен. Попробуй ещё раз.",
    errRate: "Ты достиг лимита сообщений — сделай короткий перерыв и возвращайся.",
    offlineBadge: "Автономный режим — ответ из конспекта урока",
    disclaimer: "ИИ может ошибаться — проверяй важное.",
  },
};
