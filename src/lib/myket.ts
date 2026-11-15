// TEKA NEXUS — Myket store intents (official URI schemes, myket.ir/docs/technical/intents).
//
// The Android app is a WebView wrapper around this site. The wrapper's
// shouldOverrideUrlLoading forwards these custom-scheme links to the Myket
// client (see docs/MYKET-RELEASE.md). In a plain browser the links are inert.
//
// One-time setup: put the real application id in NEXT_PUBLIC_MYKET_PACKAGE_NAME
// (Vercel env var or .env.local). Until it is set, every Myket affordance on
// the site stays hidden — no fake or broken entry points are ever rendered.
export const MYKET_PACKAGE_NAME: string = process.env.NEXT_PUBLIC_MYKET_PACKAGE_NAME ?? "";

export const myketEnabled = MYKET_PACKAGE_NAME.length > 0;

/** Rate & review page — the store's official comment intent. */
export function myketCommentUrl(packageName: string = MYKET_PACKAGE_NAME): string {
  return `myket://comment?id=${packageName}`;
}

/** App page in the store. */
export function myketDetailsUrl(packageName: string = MYKET_PACKAGE_NAME): string {
  return `myket://details?id=${packageName}`;
}

/** All published apps by this developer. */
export function myketDeveloperUrl(packageName: string = MYKET_PACKAGE_NAME): string {
  return `myket://developer/${packageName}`;
}

/** Ask the Myket client (>= 9.8.9) to check for a newer build. */
export function myketCheckUpdateUrl(packageName: string = MYKET_PACKAGE_NAME): string {
  return `myket://check-update?id=${packageName}`;
}

/**
 * Hand a myket:// URI to the OS. Inside the WebView wrapper this is captured
 * by shouldOverrideUrlLoading and routed to the Myket app.
 */
export function openMyketIntent(url: string): void {
  if (typeof window === "undefined") return;
  window.location.href = url;
}
