// One-off: render the TEKA brand favicon.svg into PWA icons (run: bun scripts/make-icons.ts)
import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve } from "path";

const svg = readFileSync(resolve(import.meta.dir, "../public/favicon.svg"), "utf8");

const targets: Array<[string, number, boolean]> = [
  // [file, size, addPaddingForMaskable]
  ["icon-192.png", 192, false],
  ["icon-512.png", 512, false],
  ["icon-maskable-512.png", 512, true],
  ["apple-touch-icon.png", 180, false],
];

for (const [file, size, pad] of targets) {
  // maskable icons need ~10% safe-zone padding so the logo survives circular masks
  const inner = pad ? Math.round(size * 0.8) : size;
  const canvas = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#08080d"/>${svg
    .replace(/<svg[^>]*>/, "")
    .replace("</svg>", "")
    // scale inner content into the centered safe zone
    .replace(/(viewBox="[^"]*")/, "")}</svg>`;
  // Simpler & precise: rasterize the original svg at target inner size, then composite centered.
  const innerPng = await sharp(Buffer.from(svg), { density: 96 * (inner / 48) })
    .resize(inner, inner)
    .png()
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 8, g: 8, b: 13, alpha: 1 } },
  })
    .composite([{ input: innerPng, gravity: "center" }])
    .png()
    .toFile(resolve(import.meta.dir, "../public/icons", file));
  console.log("wrote", file, `${size}x${size}`);
}
