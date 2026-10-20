// Global Bun type definitions.
// The standalone mini-services are excluded from the Next.js type check
// (they ship their own package.json + deps), but root utility scripts use
// Bun APIs (import.meta.dir, bun:sqlite). This file restores bun-types
// program-wide without re-including mini-services.
/// <reference types="bun-types" />
