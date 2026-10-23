// TEKA NEXUS — Commit author display normalization (Task 15).
//
// Every commit in this repository was originally produced from the CI
// container with the placeholder identity "Z User" <z@container>. The git
// history has been rewritten to the real builder identity
// "mohammad" <mhmdsdqi87-cloud@users.noreply.github.com>, but GitHub (and any
// cache in front of it) may keep serving the old metadata for a while. This
// helper keeps every commit surface in the app displaying the correct name.

export const PLATFORM_AUTHOR_NAME = "mohammad";
export const PLATFORM_AUTHOR_AVATAR = "https://github.com/mhmdsdqi87-cloud.png?size=64";

const PLACEHOLDER_PATTERNS: RegExp[] = [
  /^z$/i,
  /^z[\s._-]*user$/i,
  /z\.?ai\b/i,
  /^container$/i,
  /^root$/i,
  /^unknown$/i,
  /^bot$/i,
];

/** Map placeholder commit identities to the real platform builder. */
export function displayCommitAuthor(name: string | null | undefined): string {
  const n = (name ?? "").trim();
  if (!n || PLACEHOLDER_PATTERNS.some((p) => p.test(n))) return PLATFORM_AUTHOR_NAME;
  return n;
}

/** Pick the right avatar: platform builder portrait for normalized names. */
export function avatarForAuthor(name: string | null | undefined, fallback: string): string {
  return displayCommitAuthor(name) === PLATFORM_AUTHOR_NAME ? PLATFORM_AUTHOR_AVATAR : fallback;
}
