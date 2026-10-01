/**
 * Generates public/og-image.png (1200×630) for social media previews.
 * Run with: node scripts/generate-og.mjs
 */

import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/og-image.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#EEF1F4"/>
  <circle cx="92" cy="104" r="7" fill="#16B67A"/>
  <text x="110" y="111" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#14202B">Available for remote Flutter roles</text>
  <text x="80" y="230" font-family="Helvetica, Arial, sans-serif" font-size="66" font-weight="800" letter-spacing="-1.5" fill="#14202B">I build the mobile apps</text>
  <text x="80" y="318" font-family="Helvetica, Arial, sans-serif" font-size="66" font-weight="800" letter-spacing="-1.5" fill="#14202B">people pay their bills with.</text>
  <text x="80" y="400" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#4A5866">Rijwol Shakya · Flutter developer · Kathmandu</text>
  <rect x="80" y="456" width="300" height="64" rx="32" fill="#2F5BFF"/>
  <text x="230" y="497" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">rijwol.com.np</text>
  <rect x="930" y="70" width="200" height="420" rx="36" fill="#14202B"/>
  <rect x="942" y="82" width="176" height="396" rx="28" fill="#FFFFFF"/>
  <rect x="960" y="140" width="34" height="8" rx="4" fill="#16B67A"/>
  <rect x="998" y="140" width="34" height="8" rx="4" fill="#16B67A"/>
  <rect x="1036" y="140" width="34" height="8" rx="4" fill="#2F5BFF"/>
  <rect x="1074" y="140" width="28" height="8" rx="4" fill="#D5DBE3"/>
  <rect x="960" y="176" width="142" height="80" rx="14" fill="#EEF1F4"/>
  <rect x="960" y="270" width="142" height="40" rx="10" fill="#EEF1F4"/>
  <rect x="960" y="318" width="142" height="40" rx="10" fill="#EEF1F4"/>
  <rect x="960" y="410" width="142" height="44" rx="12" fill="#2F5BFF"/>
</svg>
`;

const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(OUT, pngBuffer);

console.log(`✅ OG image written → public/og-image.png (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
