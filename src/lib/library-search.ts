// TEKA NEXUS — semantic-lite search for the NEXUS Knowledge Library.
//
// Design (honest by contract):
// - NO embeddings, NO external model calls, NO fabricated relevance. This is
//   a curated, multilingual CONCEPT EXPANSION layer on top of deterministic
//   keyword scoring: a natural-language query ("اگر سرویس پرداخت قطع شد نباید
//   کل برنامه از کار بیفتد") triggers engineering concepts (fault-tolerance,
//   circuit-breaker…), whose terms are then scored against each entry.
// - The concept table is versioned, checked into the repo, and every hit is
//   reported back (meta.search.concepts) so users can see WHY an entry matched.
// - Zero matches are reported as zero — never padded with weak hits.
//
// Vocabulary is grounded in the actual catalog (scripts/library-entries.ts):
// rate limiting, SSRF, HMAC/API keys, error envelope, pagination, LLM JSON,
// retry/backoff, i18n, circuit breaker, debounce, password hashing, route
// guards, env config, verification sandbox, seeding, DB client.

export type SearchFields = {
  title: string;
  tags: string | string[];
  summary: string;
  code?: string | null;
};

export type QueryExpansion = {
  /** The literal terms found in the query (after normalization). */
  terms: string[];
  /** Curated concepts the query triggered, e.g. ["fault-tolerance"]. */
  concepts: string[];
};

/** Semantic-lite map version — bump when the concept table changes. */
export const SEMANTIC_MAP_VERSION = "1";

type Concept = {
  name: string;
  /** English technical terms + natural-language aliases (fa always, plus ar/es/fr/ru/zh for high-value concepts). */
  terms: string[];
};

const CONCEPTS: Concept[] = [
  {
    name: "circuit-breaker",
    terms: [
      "circuit breaker", "circuit-breaker", "half-open", "fail fast", "fail-fast",
      "مدارشکن", "مدار شکن", "قطع مدار", "قطع سرویس", "سرویس قطع", "قطع شد", "قطع میشود", "قطع می‌شود",
      "درگاه پرداخت", "پرداخت قطع", "قطع پرداخت",
      "disyuntor", "disjoncteur", "автоматический предохранитель", "熔断", "熔断器", "قاطع الدائرة",
    ],
  },
  {
    name: "fault-tolerance",
    terms: [
      "fault tolerance", "fault-tolerant", "resilience", "resilient", "graceful degradation",
      "degradation", "fallback", "fall back", "outage", "downtime", "crash", "goes down",
      "should not fail", "keep running", "stay up",
      "تحمل خطا", "تاب‌آوری", "از کار افتادن", "از کار نیفتد", "از کار نیفتاده", "از کار بیفتد", "بیفتد", "قطع شدن", "قطع نشود", "خرابی", "مقاوم", "پایدار بماند", "کرش",
      "tolerancia a fallos", "resiliencia", "degradación",
      "tolérance aux pannes", "résilience", "indisponibilité",
      "отказоустойчивость", "устойчивость", "сбой",
      "容错", "降级", "高可用", "故障",
      "تحمل الأخطاء", "التعطل", "لا يتوقف",
    ],
  },
  {
    name: "retry-backoff",
    terms: [
      "retry", "retries", "retrying", "backoff", "back-off", "jitter", "exponential backoff",
      "تلاش مجدد", "تکرار درخواست", "دوباره امتحان",
      "reintento", "reintentar", "nouvelle tentative", "повтор", "повторная попытка", "重试", "إعادة المحاولة",
    ],
  },
  {
    name: "rate-limiting",
    terms: [
      "rate limit", "rate limiter", "rate-limiting", "rate limiting", "throttle", "throttling",
      "too many requests", "429", "token bucket", "burst", "quota",
      "محدودیت نرخ", "نرخ درخواست", "محدود کردن درخواست", "تعداد درخواست",
      "limitador de tasa", "limitation de débit", "ограничение частоты", "限流", "速率限制", "تحديد المعدل",
    ],
  },
  {
    name: "password-hashing",
    terms: [
      "password", "passwords", "password hashing", "hash password", "hashed password",
      "scrypt", "bcrypt", "argon2", "pbkdf2", "salt", "credential",
      "رمز عبور", "هش رمز", "هش پسورد", "گذرواژه", "رمزنگاری گذرواژه",
      "hash de contraseñas", "hachage de mot de passe", "хеширование паролей", "密码哈希", "تجزئة كلمة المرور",
    ],
  },
  {
    name: "ssrf-protection",
    terms: [
      "ssrf", "server-side request forgery", "url guard", "dns rebinding", "internal ip",
      "private network", "metadata endpoint", "webhook validation", "outbound url",
      "امنیت درخواست", "حمله ssrf", "اعتبارسنجی آدرس",
    ],
  },
  {
    name: "api-key-security",
    terms: [
      "hmac", "api key", "api keys", "api-key", "signature", "request signing", "signing",
      "rotation", "rotate", "secret rotation", "webhook signature",
      "کلید api", "امنیت کلید", "امضای درخواست", "چرخش کلید",
      "firma de solicitudes", "signature de requête", "подпись запроса", "请求签名", "توقيع الطلب",
    ],
  },
  {
    name: "caching",
    terms: [
      "cache", "caching", "memoize", "memoization", "ttl", "singleton", "connection pool",
      "globalthis", "cold start",
      "کش", "حافظه نهان", "کش کردن", "استخر اتصال",
      "caché", "memoria caché", "mise en cache", "кэш", "кэширование", "缓存", "ذاكرة التخزين المؤقت",
    ],
  },
  {
    name: "pagination",
    terms: [
      "pagination", "paginate", "cursor pagination", "cursor", "keyset", "offset",
      "infinite scroll", "feed", "next page",
      "صفحه‌بندی", "صفحه بندی", "صفحه بعد",
      "paginación", "pagination", "пагинация", "分页", "ترقيم الصفحات",
    ],
  },
  {
    name: "llm-json-parsing",
    terms: [
      "llm", "large language model", "structured output", "json extraction", "extract json",
      "json parsing", "ai pipeline", "model output", "prompt",
      "مدل زبانی", "خروجی llm", "استخراج json", "هوش مصنوعی",
      "salida estructurada", "sortie structurée", "структурированный вывод", "结构化输出", "مخرجات منظمة",
    ],
  },
  {
    name: "i18n",
    terms: [
      "i18n", "internationalization", "localization", "l10n", "translation", "translations",
      "locale", "rtl", "right-to-left", "dictionary fallback", "multilingual",
      "بومی‌سازی", "ترجمه", "چند زبانه", "راست‌به‌چپ",
      "localización", "traducción", "localisation", "локализация", "перевод", "国际化", "التعريب",
    ],
  },
  {
    name: "api-contract",
    terms: [
      "error envelope", "response envelope", "error handling", "error format", "api design",
      "consistent errors", "error response", "status codes",
      "قالب خطا", "مدیریت خطا", "طراحی api", "خطای یکدست",
      "manejo de errores", "gestion des erreurs", "обработка ошибок", "错误处理", "معالجة الأخطاء",
    ],
  },
  {
    name: "debounce",
    terms: [
      "debounce", "debouncing", "cancel timer", "typing delay", "search input delay",
      "تأخیر ورودی", "دیبانس",
      "antirrebote", "anti-rebond", "дебаунс", "防抖", "إلغاء التكرار",
    ],
  },
  {
    name: "auth-guard",
    terms: [
      "route guard", "auth guard", "protected route", "protected routes", "auth hook",
      "middleware auth", "client-side auth", "redirect unauthenticated",
      "احراز هویت مسیر", "محافظت از مسیر", "صفحه محافظت‌شده",
      "protección de rutas", "protection des routes", "защита маршрутов", "路由守卫", "حماية المسارات",
    ],
  },
  {
    name: "env-config",
    terms: [
      "environment variable", "environment variables", "env", "dotenv", "boot", "bootstrap",
      "deployment", "config", "configuration", "stale env",
      "متغیر محیطی", "پیکربندی", "راه‌اندازی", "محیط",
      "variables de entorno", "variables d'environnement", "переменные окружения", "环境变量", "متغيرات البيئة",
    ],
  },
  {
    name: "testing-verification",
    terms: [
      "verification", "verifier", "sandbox", "sandboxed", "exact output", "unit test", "testing",
      "تست", "تست کردن", "تأیید کد", "ابزار تست",
      "pruebas", "tests", "vérification", "тест", "тестирование", "测试", "اختبار",
    ],
  },
  {
    name: "idempotent-seeding",
    terms: [
      "seed", "seeding", "seeder", "idempotent", "upsert", "migration", "provision",
      "دیتابیس اولیه", "داده اولیه", "تکرارپذیر",
      "semilla", "idempotente", "идемпотентный", "幂等", "بذور البيانات",
    ],
  },
  {
    name: "database-client",
    terms: [
      "database client", "db client", "prisma", "connection", "pool", "serverless database",
      "singleton client", "too many connections",
      "پایگاه داده", "دیتابیس", "اتصال دیتابیس",
      "cliente de base de datos", "client de base de données", "клиент базы данных", "数据库客户端", "عميل قاعدة البيانات",
    ],
  },
];

// ── Normalization ────────────────────────────────────────────────────────────

/** Normalize text for matching: lowercase + unify Arabic/Persian variants. */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u200c\u200f\u200e\uFEFF]/g, " ") // ZWNJ + directional marks
    .replace(/\u0640/g, "") // tatweel
    .replace(/[يى]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ۀة]/g, "ه")
    .replace(/\s+/g, " ");
}

const NORMALIZED_CONCEPTS: Array<{ name: string; terms: string[] }> = CONCEPTS.map((c) => ({
  name: c.name,
  terms: c.terms.map(normalize),
}));

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Expand a raw query: literal terms + curated concepts triggered by
 * natural-language phrases (any language in the map).
 */
export function expandQuery(rawQuery: string): QueryExpansion {
  const q = normalize(rawQuery).trim();
  const terms = q.split(/[^a-z0-9\u0600-\u06FF]+/i).filter(Boolean).slice(0, 24);
  const concepts: string[] = [];
  if (q.length >= 2) {
    for (const c of NORMALIZED_CONCEPTS) {
      if (c.terms.some((t) => q.includes(t))) concepts.push(c.name);
    }
  }
  return { terms, concepts };
}

function fieldsText(e: SearchFields): { title: string; tags: string; summary: string; code: string } {
  const tags = Array.isArray(e.tags) ? e.tags.join(" ") : e.tags;
  return {
    title: normalize(e.title),
    tags: normalize(tags),
    summary: normalize(e.summary),
    code: e.code ? normalize(e.code) : "",
  };
}

/**
 * Deterministic keyword score + curated concept score for one entry.
 * Literal tiers (identical to the pre-semantic behavior):
 *   title contains query +10, title word-start +6, tags +5, summary +3, code +1.
 * Concept tiers (per activated concept, best tier wins):
 *   title/tags +7, summary +4, code +1.
 * Returns 0 when nothing matches — callers must report zero hits honestly.
 */
export function scoreLibraryEntry(e: SearchFields, rawQuery: string): number {
  const q = normalize(rawQuery).trim();
  if (!q) return 0;

  const f = fieldsText(e);
  let s = 0;
  if (f.title.includes(q)) s += 10;
  if (f.title.split(" ").some((w) => w.startsWith(q))) s += 6;
  if (f.tags.includes(q)) s += 5;
  if (f.summary.includes(q)) s += 3;
  if (f.code && f.code.includes(q)) s += 1;

  const { concepts } = expandQuery(rawQuery);
  for (const conceptName of concepts) {
    const c = NORMALIZED_CONCEPTS.find((x) => x.name === conceptName);
    if (!c) continue;
    let cs = 0;
    for (const t of c.terms) {
      if (f.title.includes(t) || f.tags.includes(t)) { cs = Math.max(cs, 7); continue; }
      if (f.summary.includes(t)) cs = Math.max(cs, 4);
      else if (f.code && f.code.includes(t)) cs = Math.max(cs, 1);
    }
    s += cs;
  }
  return s;
}

/** Score every entry; only entries with score > 0 are returned, ranked. */
export function rankByQuery<T extends SearchFields>(items: T[], q: string): Array<{ item: T; score: number }> {
  return items
    .map((item) => ({ item, score: scoreLibraryEntry(item, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));
}
