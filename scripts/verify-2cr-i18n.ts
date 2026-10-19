// Verification script: check all t() paths used in the 3 wired views resolve
// in the en dictionaries, that placeholders exist, and that key shapes are
// identical across all 6 locales for projectNew / teams / notifications.
import { readFileSync } from "node:fs";

import { en } from "../src/lib/i18n/dictionaries/en/index";
import { es } from "../src/lib/i18n/dictionaries/es/index";
import { zh } from "../src/lib/i18n/dictionaries/zh/index";
import { ar } from "../src/lib/i18n/dictionaries/ar/index";
import { fa } from "../src/lib/i18n/dictionaries/fa/index";
import { fr } from "../src/lib/i18n/dictionaries/fr/index";

const DICTS: Record<string, any> = { en, es, zh, ar, fa, fr };

function lookup(dict: any, path: string): string | undefined {
  let cur: unknown = dict;
  for (const part of path.split(".")) {
    if (cur && typeof cur === "object" && part in (cur as any)) cur = (cur as any)[part];
    else return undefined;
  }
  return typeof cur === "string" ? cur : undefined;
}

function leafPaths(obj: any, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "string" ? [prefix + k] : leafPaths(v, `${prefix}${k}.`)
  );
}

const files = [
  "src/views/project-new-view.tsx",
  "src/views/teams-view.tsx",
  "src/views/notifications-view.tsx",
];

let missing = 0;
let placeholderIssues = 0;

for (const f of files) {
  const src = readFileSync(f, "utf8");
  // Static string paths: t("a.b.c")
  for (const m of src.matchAll(/\bt\("([a-zA-Z0-9_.]+)"/g)) {
    const path = m[1];
    if (lookup(en, path) === undefined) {
      console.log(`MISSING (static) ${f}: ${path}`);
      missing++;
    }
  }
  // Dynamic template paths: t(`prefix.${expr}`) — verify prefix group has leaves
  for (const m of src.matchAll(/\bt\(`([a-zA-Z0-9_.]+)\.\$\{[^}]+\}`\)/g)) {
    const prefix = m[1];
    const group = prefix.split(".").reduce<any>((acc, k) => (acc == null ? acc : acc[k]), en);
    const leaves = group && typeof group === "object" ? Object.keys(group) : [];
    if (leaves.length === 0) {
      console.log(`MISSING (dynamic prefix) ${f}: ${prefix}.*`);
      missing++;
    } else {
      console.log(`dynamic prefix OK: ${prefix}.* -> [${leaves.join(", ")}]`);
    }
  }
  // Placeholder params: t("path", { x }) must have {x} in the en value
  for (const m of src.matchAll(/\bt\("([a-zA-Z0-9_.]+)",\s*\{([^}]*)\}\)/g)) {
    const path = m[1];
    const params = [...m[2].matchAll(/([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g)].map((x) => x[1]);
    const value = lookup(en, path);
    if (value === undefined) continue; // already reported
    for (const p of params) {
      if (!value.includes(`{${p}}`)) {
        console.log(`PLACEHOLDER MISSING in en "${path}": {${p}} (value: "${value}")`);
        placeholderIssues++;
      }
    }
  }
}

// Key-shape parity across locales for the 3 namespaces
const NAMESPACES = ["projectNew", "teams", "notifications"];
for (const ns of NAMESPACES) {
  const enKeys = leafPaths((en as any)[ns]).sort();
  console.log(`${ns}: ${enKeys.length} leaf keys in en`);
  for (const locale of ["es", "zh", "ar", "fa", "fr"]) {
    const locKeys = leafPaths((DICTS[locale] as any)[ns]).sort();
    const onlyEn = enKeys.filter((k) => !locKeys.includes(k));
    const onlyLoc = locKeys.filter((k) => !enKeys.includes(k));
    if (onlyEn.length || onlyLoc.length) {
      console.log(`  PARITY FAIL ${locale}: only-en=[${onlyEn}] only-${locale}=[${onlyLoc}]`);
      missing++;
    } else {
      console.log(`  parity OK: ${locale} (${locKeys.length} keys)`);
    }
    // every locale value must have the same {params} as en
    for (const k of enKeys) {
      const enV = lookup((en as any)[ns], k) ?? "";
      const loV = lookup((DICTS[locale] as any)[ns], k) ?? "";
      const paramsOf = (s: string) => (s.match(/\{[a-zA-Z]+\}/g) ?? []).sort().join(",");
      if (paramsOf(enV) !== paramsOf(loV)) {
        console.log(`  PARAM MISMATCH ${locale} ${ns}.${k}: en=[${paramsOf(enV)}] loc=[${paramsOf(loV)}]`);
        placeholderIssues++;
      }
    }
  }
}

console.log(`\nRESULT: missing=${missing} placeholderIssues=${placeholderIssues}`);
process.exit(missing + placeholderIssues > 0 ? 1 : 0);
