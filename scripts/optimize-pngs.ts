// TEKA NEXUS — one-shot PNG diet for public/ artwork.
//
// The brand covers, store screenshots and OG image were full-colour PNGs
// (several hundred KB each). Most are flat illustration-style art, so
// palette quantisation with dithering keeps them visually identical while
// cutting 40-60% of the bytes Vercel serves. Idempotent: only rewrites a
// file when the compressed version is actually smaller.
//
// Run: bun scripts/optimize-pngs.ts

import sharp from "sharp";
import { readFileSync, readdirSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["public/covers", "public/myket", "public/screenshots"];
const SINGLES = ["public/og.png"];

async function diet(file: string, quality: number) {
  const before = statSync(file).size;
  const src = readFileSync(file);
  const out = await sharp(src)
    .png({ palette: true, quality, effort: 10, dither: 1.0, compressionLevel: 9 })
    .toBuffer();
  if (out.length < before) {
    writeFileSync(file, out);
    const saved = (((before - out.length) / before) * 100).toFixed(1);
    console.log(`${file}: ${(before / 1024).toFixed(0)}K -> ${(out.length / 1024).toFixed(0)}K (-${saved}%)`);
    return before - out.length;
  }
  console.log(`${file}: kept (${(before / 1024).toFixed(0)}K, recompress not smaller)`);
  return 0;
}

let savedTotal = 0;
let count = 0;

for (const dir of ROOTS) {
  for (const name of readdirSync(dir).filter((f) => f.endsWith(".png"))) {
    savedTotal += await diet(join(dir, name), 85);
    count++;
  }
}
for (const file of SINGLES) {
  savedTotal += await diet(file, 90);
  count++;
}

console.log(`\n${count} files checked — ${(savedTotal / 1024).toFixed(0)}KB saved total`);
