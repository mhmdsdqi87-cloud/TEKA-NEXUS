import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normalizes a user-entered URL: trims and auto-prepends https:// when the
// protocol is missing ("github.com/x" -> "https://github.com/x"), so people
// can paste bare domains without tripping validation. Returns "" for empty
// input and null when the value still can't be a URL (e.g. has spaces).
export function normalizeUrlInput(input: string): string | null {
  let v = input.trim();
  if (!v) return "";
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  return /^https?:\/\/\S+$/i.test(v) ? v : null;
}
