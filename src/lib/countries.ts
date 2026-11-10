// TEKA NEXUS — Country registry (ISO 3166-1 alpha-2).
//
// FACTUAL STATIC DATA ONLY: names and approximate geographic centroids of
// countries. This file contains NO platform activity data — activity counts
// always come from the database (/api/universe). Adding a country here does
// not place a user on the map; users place themselves by declaring their
// country in Settings (self-reported, stored on User.country).
//
// Centroids are approximate (country center, WGS84) and used purely to
// position markers on the Live Universe globe. Names are canonical English
// (ISO short name) for all locales — translation of country names is a
// future i18n task.

export type CountryInfo = {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  lat: number;
  lon: number;
};

export const COUNTRIES: Record<string, CountryInfo> = {
  AF: { code: "AF", name: "Afghanistan", lat: 33.94, lon: 67.71 },
  AL: { code: "AL", name: "Albania", lat: 41.15, lon: 20.17 },
  DZ: { code: "DZ", name: "Algeria", lat: 28.03, lon: 1.66 },
  AR: { code: "AR", name: "Argentina", lat: -38.42, lon: -63.62 },
  AM: { code: "AM", name: "Armenia", lat: 40.07, lon: 45.04 },
  AU: { code: "AU", name: "Australia", lat: -25.27, lon: 133.78 },
  AT: { code: "AT", name: "Austria", lat: 47.52, lon: 14.55 },
  AZ: { code: "AZ", name: "Azerbaijan", lat: 40.14, lon: 47.58 },
  BD: { code: "BD", name: "Bangladesh", lat: 23.68, lon: 90.36 },
  BY: { code: "BY", name: "Belarus", lat: 53.71, lon: 27.95 },
  BE: { code: "BE", name: "Belgium", lat: 50.5, lon: 4.47 },
  BO: { code: "BO", name: "Bolivia", lat: -16.29, lon: -63.59 },
  BA: { code: "BA", name: "Bosnia and Herzegovina", lat: 43.92, lon: 17.68 },
  BR: { code: "BR", name: "Brazil", lat: -14.24, lon: -51.93 },
  BG: { code: "BG", name: "Bulgaria", lat: 42.73, lon: 25.49 },
  KH: { code: "KH", name: "Cambodia", lat: 12.57, lon: 104.99 },
  CM: { code: "CM", name: "Cameroon", lat: 7.37, lon: 12.35 },
  CA: { code: "CA", name: "Canada", lat: 56.13, lon: -106.35 },
  CL: { code: "CL", name: "Chile", lat: -35.68, lon: -71.54 },
  CN: { code: "CN", name: "China", lat: 35.86, lon: 104.2 },
  CO: { code: "CO", name: "Colombia", lat: 4.57, lon: -74.3 },
  CR: { code: "CR", name: "Costa Rica", lat: 9.75, lon: -83.75 },
  HR: { code: "HR", name: "Croatia", lat: 45.1, lon: 15.2 },
  CU: { code: "CU", name: "Cuba", lat: 21.52, lon: -77.78 },
  CY: { code: "CY", name: "Cyprus", lat: 35.13, lon: 33.43 },
  CZ: { code: "CZ", name: "Czechia", lat: 49.82, lon: 15.47 },
  DK: { code: "DK", name: "Denmark", lat: 56.26, lon: 9.5 },
  DO: { code: "DO", name: "Dominican Republic", lat: 18.74, lon: -70.16 },
  EC: { code: "EC", name: "Ecuador", lat: -1.83, lon: -78.18 },
  EG: { code: "EG", name: "Egypt", lat: 26.82, lon: 30.8 },
  SV: { code: "SV", name: "El Salvador", lat: 13.79, lon: -88.9 },
  EE: { code: "EE", name: "Estonia", lat: 58.6, lon: 25.01 },
  ET: { code: "ET", name: "Ethiopia", lat: 9.15, lon: 40.49 },
  FI: { code: "FI", name: "Finland", lat: 61.92, lon: 25.75 },
  FR: { code: "FR", name: "France", lat: 46.23, lon: 2.21 },
  GE: { code: "GE", name: "Georgia", lat: 42.32, lon: 43.36 },
  DE: { code: "DE", name: "Germany", lat: 51.17, lon: 10.45 },
  GH: { code: "GH", name: "Ghana", lat: 7.95, lon: -1.02 },
  GR: { code: "GR", name: "Greece", lat: 39.07, lon: 21.82 },
  GT: { code: "GT", name: "Guatemala", lat: 15.78, lon: -90.23 },
  HN: { code: "HN", name: "Honduras", lat: 15.2, lon: -86.24 },
  HK: { code: "HK", name: "Hong Kong", lat: 22.32, lon: 114.17 },
  HU: { code: "HU", name: "Hungary", lat: 47.16, lon: 19.5 },
  IS: { code: "IS", name: "Iceland", lat: 64.96, lon: -19.02 },
  IN: { code: "IN", name: "India", lat: 20.59, lon: 78.96 },
  ID: { code: "ID", name: "Indonesia", lat: -0.79, lon: 113.92 },
  IR: { code: "IR", name: "Iran", lat: 32.43, lon: 53.69 },
  IQ: { code: "IQ", name: "Iraq", lat: 33.22, lon: 43.68 },
  IE: { code: "IE", name: "Ireland", lat: 53.41, lon: -8.24 },
  IL: { code: "IL", name: "Israel", lat: 31.05, lon: 34.85 },
  IT: { code: "IT", name: "Italy", lat: 41.87, lon: 12.57 },
  JM: { code: "JM", name: "Jamaica", lat: 18.11, lon: -77.3 },
  JP: { code: "JP", name: "Japan", lat: 36.2, lon: 138.25 },
  JO: { code: "JO", name: "Jordan", lat: 30.59, lon: 36.24 },
  KZ: { code: "KZ", name: "Kazakhstan", lat: 48.02, lon: 66.92 },
  KE: { code: "KE", name: "Kenya", lat: -0.02, lon: 37.91 },
  KR: { code: "KR", name: "South Korea", lat: 35.91, lon: 127.77 },
  KW: { code: "KW", name: "Kuwait", lat: 29.31, lon: 47.48 },
  KG: { code: "KG", name: "Kyrgyzstan", lat: 41.2, lon: 74.77 },
  LV: { code: "LV", name: "Latvia", lat: 56.88, lon: 24.6 },
  LB: { code: "LB", name: "Lebanon", lat: 33.85, lon: 35.86 },
  LY: { code: "LY", name: "Libya", lat: 26.34, lon: 17.23 },
  LT: { code: "LT", name: "Lithuania", lat: 55.17, lon: 23.88 },
  LU: { code: "LU", name: "Luxembourg", lat: 49.82, lon: 6.13 },
  MO: { code: "MO", name: "Macao", lat: 22.2, lon: 113.54 },
  MY: { code: "MY", name: "Malaysia", lat: 4.21, lon: 101.98 },
  MV: { code: "MV", name: "Maldives", lat: 3.2, lon: 73.22 },
  MT: { code: "MT", name: "Malta", lat: 35.94, lon: 14.38 },
  MX: { code: "MX", name: "Mexico", lat: 23.63, lon: -102.55 },
  MD: { code: "MD", name: "Moldova", lat: 47.41, lon: 28.37 },
  MN: { code: "MN", name: "Mongolia", lat: 46.86, lon: 103.85 },
  ME: { code: "ME", name: "Montenegro", lat: 42.71, lon: 19.37 },
  MA: { code: "MA", name: "Morocco", lat: 31.79, lon: -7.09 },
  MM: { code: "MM", name: "Myanmar", lat: 21.91, lon: 95.96 },
  NA: { code: "NA", name: "Namibia", lat: -22.96, lon: 18.49 },
  NP: { code: "NP", name: "Nepal", lat: 28.39, lon: 84.12 },
  NL: { code: "NL", name: "Netherlands", lat: 52.13, lon: 5.29 },
  NZ: { code: "NZ", name: "New Zealand", lat: -40.9, lon: 174.89 },
  NI: { code: "NI", name: "Nicaragua", lat: 12.87, lon: -85.21 },
  NG: { code: "NG", name: "Nigeria", lat: 9.08, lon: 8.68 },
  MK: { code: "MK", name: "North Macedonia", lat: 41.61, lon: 21.75 },
  NO: { code: "NO", name: "Norway", lat: 60.47, lon: 8.47 },
  OM: { code: "OM", name: "Oman", lat: 21.51, lon: 55.92 },
  PK: { code: "PK", name: "Pakistan", lat: 30.38, lon: 69.35 },
  PS: { code: "PS", name: "Palestine", lat: 31.95, lon: 35.23 },
  PA: { code: "PA", name: "Panama", lat: 8.54, lon: -80.78 },
  PY: { code: "PY", name: "Paraguay", lat: -23.44, lon: -58.44 },
  PE: { code: "PE", name: "Peru", lat: -9.19, lon: -75.02 },
  PH: { code: "PH", name: "Philippines", lat: 12.88, lon: 121.77 },
  PL: { code: "PL", name: "Poland", lat: 51.92, lon: 19.15 },
  PT: { code: "PT", name: "Portugal", lat: 39.4, lon: -8.22 },
  QA: { code: "QA", name: "Qatar", lat: 25.35, lon: 51.18 },
  RO: { code: "RO", name: "Romania", lat: 45.94, lon: 24.97 },
  RU: { code: "RU", name: "Russia", lat: 61.52, lon: 105.32 },
  SA: { code: "SA", name: "Saudi Arabia", lat: 23.89, lon: 45.08 },
  SN: { code: "SN", name: "Senegal", lat: 14.5, lon: -14.45 },
  RS: { code: "RS", name: "Serbia", lat: 44.02, lon: 21.01 },
  SG: { code: "SG", name: "Singapore", lat: 1.35, lon: 103.82 },
  SK: { code: "SK", name: "Slovakia", lat: 48.67, lon: 19.7 },
  SI: { code: "SI", name: "Slovenia", lat: 46.15, lon: 14.99 },
  ZA: { code: "ZA", name: "South Africa", lat: -30.56, lon: 22.94 },
  ES: { code: "ES", name: "Spain", lat: 40.46, lon: -3.75 },
  LK: { code: "LK", name: "Sri Lanka", lat: 7.87, lon: 80.77 },
  SD: { code: "SD", name: "Sudan", lat: 12.86, lon: 30.22 },
  SE: { code: "SE", name: "Sweden", lat: 60.13, lon: 18.64 },
  CH: { code: "CH", name: "Switzerland", lat: 46.82, lon: 6.84 },
  SY: { code: "SY", name: "Syria", lat: 34.8, lon: 38.99 },
  TW: { code: "TW", name: "Taiwan", lat: 23.7, lon: 120.96 },
  TJ: { code: "TJ", name: "Tajikistan", lat: 38.86, lon: 71.28 },
  TZ: { code: "TZ", name: "Tanzania", lat: -6.37, lon: 34.89 },
  TH: { code: "TH", name: "Thailand", lat: 15.87, lon: 100.99 },
  TN: { code: "TN", name: "Tunisia", lat: 33.89, lon: 9.54 },
  TR: { code: "TR", name: "Türkiye", lat: 38.96, lon: 35.24 },
  TM: { code: "TM", name: "Turkmenistan", lat: 38.97, lon: 59.56 },
  UG: { code: "UG", name: "Uganda", lat: 1.37, lon: 32.29 },
  UA: { code: "UA", name: "Ukraine", lat: 48.38, lon: 31.17 },
  AE: { code: "AE", name: "United Arab Emirates", lat: 23.42, lon: 53.85 },
  GB: { code: "GB", name: "United Kingdom", lat: 55.38, lon: -3.44 },
  US: { code: "US", name: "United States", lat: 37.09, lon: -95.71 },
  UY: { code: "UY", name: "Uruguay", lat: -32.52, lon: -55.77 },
  UZ: { code: "UZ", name: "Uzbekistan", lat: 41.38, lon: 64.59 },
  VE: { code: "VE", name: "Venezuela", lat: 6.42, lon: -66.59 },
  VN: { code: "VN", name: "Vietnam", lat: 14.06, lon: 108.28 },
  YE: { code: "YE", name: "Yemen", lat: 15.55, lon: 48.52 },
  ZM: { code: "ZM", name: "Zambia", lat: -13.13, lon: 27.85 },
  ZW: { code: "ZW", name: "Zimbabwe", lat: -19.02, lon: 29.15 },
};

const COUNTRY_LIST: CountryInfo[] = Object.values(COUNTRIES).sort((a, b) =>
  a.name.localeCompare(b.name),
);

/** Alphabetical list for selectors. */
export const COUNTRY_LIST_SORTED: readonly CountryInfo[] = COUNTRY_LIST;

/** Validate a self-reported country code ("" = undeclared is valid upstream). */
export function isValidCountryCode(code: string): boolean {
  return code in COUNTRIES;
}

/** Static tech taxonomy used ONLY to group declared tags into architecture
 * layers for the Project DNA map. Declared tags are never re-labeled — an
 * unknown tag lands in "other" untouched. */
const TECH_TAXONOMY: Record<string, string[]> = {
  frontend: [
    "react", "next.js", "nextjs", "vue", "nuxt", "angular", "svelte", "sveltekit",
    "tailwind", "tailwindcss", "css", "html", "frontend", "redux", "zustand",
    "vite", "webpack", "typescript", "javascript", "flutter", "react native",
    "android", "ios", "swift", "kotlin", "electron", "pwa", "three.js", "gsap",
  ],
  backend: [
    "node.js", "nodejs", "express", "nestjs", "django", "flask", "fastapi",
    "python", "go", "golang", "rust", "java", "spring", "laravel", "php",
    "ruby", "rails", "dotnet", ".net", "c#", "c++", "graphql", "rest", "api",
    "websocket", "socket.io", "backend", "deno", "bun",
  ],
  data: [
    "postgresql", "postgres", "mysql", "sqlite", "mongodb", "redis", "prisma",
    "database", "supabase", "firebase", "graphql", "elasticsearch", "clickhouse",
    "sqlite3", "sql", "nosql", "dynamodb", "cassandra", "s3", "blob",
  ],
  tools: [
    "docker", "kubernetes", "ci/cd", "github", "git", "gitlab", "aws", "gcp",
    "azure", "vercel", "linux", "devops", "figma", "ui/ux", "design", "ai",
    "machine learning", "ml", "tensorflow", "pytorch", "openai", "llm",
    "testing", "jest", "cypress", "playwright", "seo", "analytics",
  ],
};

/** Group declared tags into DNA architecture layers. Unknown tags pass
 * through to "other" verbatim (never renamed, never dropped). */
export function groupStackLayers(tags: string[]): {
  frontend: string[];
  backend: string[];
  data: string[];
  tools: string[];
  other: string[];
} {
  const layers = { frontend: [] as string[], backend: [] as string[], data: [] as string[], tools: [] as string[], other: [] as string[] };
  for (const raw of tags) {
    const key = raw.trim().toLowerCase();
    let placed = false;
    for (const [layer, names] of Object.entries(TECH_TAXONOMY)) {
      if (names.includes(key)) {
        layers[layer as keyof typeof layers].push(raw);
        placed = true;
        break;
      }
    }
    if (!placed) layers.other.push(raw);
  }
  return layers;
}
