// TEKA NEXUS — Workspace domain helpers (Task ws-1).
// Shared between the API routes and the client UI: path normalization,
// language detection, file meta colors and validation limits.

import { LIMITS } from "@/lib/constants";

// ─── Limits (mirrored into LIMITS) ───────────────────────────

export const WS_LIMITS = {
  /** File / folder name (single segment). */
  name: 80,
  /** Normalized folder path. */
  path: 240,
  /** Text content per file — keeps rows safe for pooled Postgres. */
  content: 100_000,
  /** Debug log line. */
  logMessage: 1000,
  /** Revisions kept per file (oldest trimmed on save). */
  revisionsPerFile: 20,
  /** Diagnostics max reported issues per file. */
  diagIssuesPerFile: 8,
} as const;

export const LOG_LEVELS = ["info", "success", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

// ─── Name / path validation ──────────────────────────────────

/** A file/folder segment: no slashes, not empty, no traversal tricks. */
export function validateWsName(raw: string): string | null {
  const name = raw.trim();
  if (!name) return "Name is required.";
  if (name.length > WS_LIMITS.name) return `Name must be at most ${WS_LIMITS.name} characters.`;
  if (/[\\/\u0000-\u001f]/.test(name)) return "Name cannot contain slashes or control characters.";
  if (name === "." || name === "..") return "That name is reserved.";
  if (/^\s|\s$/.test(name)) return "Name cannot start or end with a space.";
  return null;
}

/**
 * Normalize a client-supplied folder path to a canonical form:
 *   "" | "/" | "src" | "src/components" …
 * Rejects traversal (`..`), collapses duplicate slashes, trims edges.
 * Returns null when the path is invalid.
 */
export function normalizeFolder(raw: string | null | undefined): string | null {
  if (raw == null) return "/";
  let p = String(raw).trim();
  if (!p || p === "/") return "/";
  if (p.length > WS_LIMITS.path) return null;
  p = p.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
  if (p.startsWith("/")) p = p.slice(1);
  if (p.endsWith("/")) p = p.slice(0, -1);
  const segments = p.split("/");
  for (const seg of segments) {
    if (!seg || seg === "." || seg === "..") return null;
    if (seg.length > WS_LIMITS.name) return null;
  }
  return `/${segments.join("/")}`;
}

/** Parent path of a folder path: "/a/b" → "/a", "/a" → "/". */
export function parentFolder(folder: string): string {
  if (!folder || folder === "/") return "/";
  const idx = folder.lastIndexOf("/");
  return idx <= 0 ? "/" : folder.slice(0, idx);
}

/** Descendant check — is `child` inside `ancestor` (or equal)? */
export function isDescendantFolder(child: string, ancestor: string): boolean {
  if (ancestor === "/") return true;
  return child === ancestor || child.startsWith(`${ancestor}/`);
}

/** Full path of a node, e.g. folder="src", name="app.ts" → "src/app.ts". */
export function fullPath(folder: string, name: string): string {
  return folder === "/" ? name : `${folder}/${name}`;
}

// ─── Language detection ──────────────────────────────────────

type LangMeta = { id: string; label: string; color: string };

const EXT_MAP: Record<string, LangMeta> = {
  ts: { id: "typescript", label: "TypeScript", color: "#3178c6" },
  tsx: { id: "tsx", label: "TSX", color: "#38bdf8" },
  js: { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  jsx: { id: "jsx", label: "JSX", color: "#f7df1e" },
  mjs: { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  cjs: { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  json: { id: "json", label: "JSON", color: "#a3e635" },
  md: { id: "markdown", label: "Markdown", color: "#94a3b8" },
  mdx: { id: "markdown", label: "MDX", color: "#94a3b8" },
  css: { id: "css", label: "CSS", color: "#38bdf8" },
  scss: { id: "scss", label: "SCSS", color: "#f472b6" },
  html: { id: "html", label: "HTML", color: "#fb923c" },
  xml: { id: "xml", label: "XML", color: "#fb923c" },
  svg: { id: "xml", label: "SVG", color: "#f0abfc" },
  py: { id: "python", label: "Python", color: "#4ade80" },
  sh: { id: "shell", label: "Shell", color: "#22d3ee" },
  bash: { id: "shell", label: "Shell", color: "#22d3ee" },
  yml: { id: "yaml", label: "YAML", color: "#fbbf24" },
  yaml: { id: "yaml", label: "YAML", color: "#fbbf24" },
  toml: { id: "toml", label: "TOML", color: "#fbbf24" },
  sql: { id: "sql", label: "SQL", color: "#f59e0b" },
  prisma: { id: "prisma", label: "Prisma", color: "#c4b5fd" },
  go: { id: "go", label: "Go", color: "#22d3ee" },
  rs: { id: "rust", label: "Rust", color: "#fb923c" },
  java: { id: "java", label: "Java", color: "#f87171" },
  php: { id: "php", label: "PHP", color: "#a78bfa" },
  rb: { id: "ruby", label: "Ruby", color: "#f87171" },
  c: { id: "c", label: "C", color: "#94a3b8" },
  cpp: { id: "cpp", label: "C++", color: "#60a5fa" },
  cs: { id: "csharp", label: "C#", color: "#34d399" },
  kt: { id: "kotlin", label: "Kotlin", color: "#c084fc" },
  swift: { id: "swift", label: "Swift", color: "#fb923c" },
  dart: { id: "dart", label: "Dart", color: "#22d3ee" },
  vue: { id: "vue", label: "Vue", color: "#4ade80" },
  env: { id: "env", label: "ENV", color: "#fbbf24" },
  txt: { id: "plaintext", label: "Text", color: "#94a3b8" },
  csv: { id: "csv", label: "CSV", color: "#4ade80" },
};

const NAME_MAP: Record<string, LangMeta> = {
  dockerfile: { id: "docker", label: "Docker", color: "#38bdf8" },
  ".gitignore": { id: "gitignore", label: "Git", color: "#f87171" },
  ".env": { id: "env", label: "ENV", color: "#fbbf24" },
  license: { id: "plaintext", label: "License", color: "#94a3b8" },
};

export function detectLanguage(name: string): LangMeta {
  const base = name.toLowerCase();
  const named = NAME_MAP[base];
  if (named) return named;
  const dot = base.lastIndexOf(".");
  const ext = dot >= 0 ? base.slice(dot + 1) : "";
  return EXT_MAP[ext] ?? { id: "plaintext", label: ext ? ext.toUpperCase() : "Text", color: "#94a3b8" };
}

export function langMeta(language: string): LangMeta {
  const found = Object.values(EXT_MAP).find((m) => m.id === language);
  return found ?? { id: language, label: language, color: "#94a3b8" };
}

/** Quick extension check for binary-ish uploads we do not accept. */
const BLOCKED_EXT = new Set(["exe", "dll", "so", "bin", "zip", "tar", "gz", "rar", "7z", "apk", "jar", "wasm", "mp4", "mp3", "webm", "mov", "avi", "png", "jpg", "jpeg", "gif", "webp", "ico", "pdf", "woff", "woff2", "ttf"]);
export function isBlockedFileName(name: string): boolean {
  const dot = name.toLowerCase().lastIndexOf(".");
  const ext = dot >= 0 ? name.toLowerCase().slice(dot + 1) : "";
  return BLOCKED_EXT.has(ext);
}

// ─── Formatting helpers (shared with the UI) ─────────────────

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function countLines(content: string): number {
  if (!content) return 0;
  return content.split("\n").length;
}

export { LIMITS };
