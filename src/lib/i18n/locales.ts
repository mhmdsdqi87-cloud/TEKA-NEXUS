// TEKA NEXUS — i18n locale configuration.
// 7 locales: English (base), Spanish, Chinese, Arabic, Persian, French, Russian.
// Arabic + Persian are RTL.

import { ar, enUS, es, faIR, fr, ru as ruDate, zhCN, type Locale as DateLocale } from "date-fns/locale";

export type Locale = "en" | "es" | "zh" | "ar" | "fa" | "fr" | "ru";

export const RTL_LOCALES: ReadonlySet<Locale> = new Set(["ar", "fa"]);

export type LocaleMeta = {
  code: Locale;
  /** Native endonym shown in the switcher */
  native: string;
  /** English name (for a11y labels) */
  english: string;
  flag: string;
  dir: "ltr" | "rtl";
  dateLocale: DateLocale;
};

export const LOCALES: readonly LocaleMeta[] = [
  { code: "en", native: "English", english: "English", flag: "🇬🇧", dir: "ltr", dateLocale: enUS },
  { code: "es", native: "Español", english: "Spanish", flag: "🇪🇸", dir: "ltr", dateLocale: es },
  { code: "zh", native: "中文（简体）", english: "Chinese (Simplified)", flag: "🇨🇳", dir: "ltr", dateLocale: zhCN },
  { code: "ar", native: "العربية", english: "Arabic", flag: "🇸🇦", dir: "rtl", dateLocale: ar },
  { code: "fa", native: "فارسی", english: "Persian", flag: "🇮🇷", dir: "rtl", dateLocale: faIR },
  { code: "fr", native: "Français", english: "French", flag: "🇫🇷", dir: "ltr", dateLocale: fr },
  { code: "ru", native: "Русский", english: "Russian", flag: "🇷🇺", dir: "ltr", dateLocale: ruDate },
];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.some((l) => l.code === value);
}

export function localeMeta(code: Locale): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/** Best-effort match from a BCP-47 tag (e.g. "fa-IR") to a supported locale. */
export function matchLocale(tag: string): Locale | null {
  const lower = tag.toLowerCase();
  const exact = LOCALES.find((l) => lower === l.code || lower.startsWith(`${l.code}-`));
  if (exact) return exact.code;
  // zh-Hant etc. still maps to simplified as our only Chinese variant
  if (lower.startsWith("zh")) return "zh";
  return null;
}
