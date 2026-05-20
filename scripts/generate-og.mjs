/**
 * Generates public/og-image.png (1200×630) for social media previews.
 * Run with: node scripts/generate-og.mjs
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/og-image.png");

// 1200×630 SVG card matching portfolio design
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#020617"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <!-- Primary gradient for text + accents -->
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#818cf8"/>
      <stop offset="100%" style="stop-color:#a78bfa"/>
    </linearGradient>
    <!-- Glow blob -->
    <radialGradient id="blob1" cx="25%" cy="40%" r="35%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.18"/>
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="blob2" cx="80%" cy="70%" r="30%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.14"/>
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0"/>
    </radialGradient>
    <!-- Grid pattern -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#818cf8" stroke-width="0.4" opacity="0.12"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Grid -->
  <rect width="1200" height="630" fill="url(#grid)"/>
  <!-- Glows -->
  <rect width="1200" height="630" fill="url(#blob1)"/>
  <rect width="1200" height="630" fill="url(#blob2)"/>

  <!-- Card border -->
  <rect x="40" y="40" width="1120" height="550" rx="24"
    fill="none" stroke="#818cf8" stroke-width="1" opacity="0.2"/>

  <!-- Status pill -->
  <rect x="80" y="80" width="200" height="36" rx="18"
    fill="#22c55e" fill-opacity="0.12" stroke="#22c55e" stroke-width="1" stroke-opacity="0.35"/>
  <circle cx="106" cy="98" r="5" fill="#22c55e"/>
  <text x="122" y="103" font-family="system-ui, -apple-system, sans-serif"
    font-size="13" font-weight="600" fill="#4ade80">Open to opportunities</text>

  <!-- Name -->
  <text x="80" y="200" font-family="system-ui, -apple-system, sans-serif"
    font-size="72" font-weight="800" fill="white">Rijwol </text>
  <text x="380" y="200" font-family="system-ui, -apple-system, sans-serif"
    font-size="72" font-weight="800" fill="url(#grad)">Shakya</text>

  <!-- Title -->
  <text x="80" y="255" font-family="system-ui, -apple-system, sans-serif"
    font-size="28" font-weight="600" fill="#94a3b8">Flutter &amp; Mobile Developer</text>

  <!-- Divider -->
  <line x1="80" y1="285" x2="420" y2="285" stroke="#818cf8" stroke-width="1" opacity="0.3"/>

  <!-- Description -->
  <text x="80" y="325" font-family="system-ui, -apple-system, sans-serif"
    font-size="18" fill="#64748b">2+ years · Android &amp; iOS · Clean Architecture</text>
  <text x="80" y="355" font-family="system-ui, -apple-system, sans-serif"
    font-size="18" fill="#64748b">Riverpod · GetX · Firebase · REST APIs</text>

  <!-- Tech pills row -->
  <!-- Flutter -->
  <rect x="80" y="400" width="100" height="36" rx="18"
    fill="#02569B" fill-opacity="0.15" stroke="#02569B" stroke-width="1" stroke-opacity="0.4"/>
  <text x="130" y="423" font-family="system-ui, -apple-system, sans-serif"
    font-size="13" font-weight="600" fill="#60a5fa" text-anchor="middle">Flutter</text>

  <!-- React Native -->
  <rect x="192" y="400" width="140" height="36" rx="18"
    fill="#61DAFB" fill-opacity="0.12" stroke="#61DAFB" stroke-width="1" stroke-opacity="0.35"/>
  <text x="262" y="423" font-family="system-ui, -apple-system, sans-serif"
    font-size="13" font-weight="600" fill="#7dd3fc" text-anchor="middle">React Native</text>

  <!-- Firebase -->
  <rect x="344" y="400" width="100" height="36" rx="18"
    fill="#FFCA28" fill-opacity="0.12" stroke="#FFCA28" stroke-width="1" stroke-opacity="0.3"/>
  <text x="394" y="423" font-family="system-ui, -apple-system, sans-serif"
    font-size="13" font-weight="600" fill="#fbbf24" text-anchor="middle">Firebase</text>

  <!-- GetX -->
  <rect x="456" y="400" width="80" height="36" rx="18"
    fill="#818cf8" fill-opacity="0.15" stroke="#818cf8" stroke-width="1" stroke-opacity="0.4"/>
  <text x="496" y="423" font-family="system-ui, -apple-system, sans-serif"
    font-size="13" font-weight="600" fill="#a5b4fc" text-anchor="middle">GetX</text>

  <!-- Riverpod -->
  <rect x="548" y="400" width="104" height="36" rx="18"
    fill="#a78bfa" fill-opacity="0.15" stroke="#a78bfa" stroke-width="1" stroke-opacity="0.4"/>
  <text x="600" y="423" font-family="system-ui, -apple-system, sans-serif"
    font-size="13" font-weight="600" fill="#c4b5fd" text-anchor="middle">Riverpod</text>

  <!-- Stats column (right side) -->
  <!-- Card 1: Commits -->
  <rect x="760" y="160" width="380" height="100" rx="16"
    fill="white" fill-opacity="0.04" stroke="white" stroke-width="1" stroke-opacity="0.08"/>
  <text x="800" y="210" font-family="system-ui, -apple-system, sans-serif"
    font-size="40" font-weight="800" fill="url(#grad)">1,065+</text>
  <text x="800" y="235" font-family="system-ui, -apple-system, sans-serif"
    font-size="14" fill="#64748b">Production commits · myDishHome</text>

  <!-- Card 2: Gateways -->
  <rect x="760" y="278" width="180" height="100" rx="16"
    fill="white" fill-opacity="0.04" stroke="white" stroke-width="1" stroke-opacity="0.08"/>
  <text x="800" y="330" font-family="system-ui, -apple-system, sans-serif"
    font-size="40" font-weight="800" fill="url(#grad)">4</text>
  <text x="800" y="355" font-family="system-ui, -apple-system, sans-serif"
    font-size="14" fill="#64748b">Payment gateways</text>

  <!-- Card 3: Apps -->
  <rect x="958" y="278" width="182" height="100" rx="16"
    fill="white" fill-opacity="0.04" stroke="white" stroke-width="1" stroke-opacity="0.08"/>
  <text x="998" y="330" font-family="system-ui, -apple-system, sans-serif"
    font-size="40" font-weight="800" fill="url(#grad)">6+</text>
  <text x="998" y="355" font-family="system-ui, -apple-system, sans-serif"
    font-size="14" fill="#64748b">Apps shipped</text>

  <!-- Card 4: Branches -->
  <rect x="760" y="396" width="380" height="80" rx="16"
    fill="white" fill-opacity="0.04" stroke="white" stroke-width="1" stroke-opacity="0.08"/>
  <text x="800" y="440" font-family="system-ui, -apple-system, sans-serif"
    font-size="32" font-weight="700" fill="url(#grad)">29 feature branches</text>
  <text x="800" y="460" font-family="system-ui, -apple-system, sans-serif"
    font-size="13" fill="#64748b">eSewa · Khalti · FonePay · GetPay</text>

  <!-- Bottom URL bar -->
  <rect x="80" y="530" width="1040" height="1" fill="#818cf8" opacity="0.2"/>
  <text x="80" y="558" font-family="system-ui, -apple-system, sans-serif"
    font-size="16" fill="#475569">rijwolshakya09.github.io/my-portfolio</text>
  <text x="1120" y="558" font-family="system-ui, -apple-system, sans-serif"
    font-size="16" fill="#475569" text-anchor="end">Kathmandu, Nepal</text>
</svg>
`;

// Write SVG as PNG via sharp
const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(OUT, pngBuffer);

console.log(`✅ OG image written → public/og-image.png (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
