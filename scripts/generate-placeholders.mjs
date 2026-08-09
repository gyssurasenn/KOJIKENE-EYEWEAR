/**
 * Generates the temporary placeholder imagery in /public/images.
 *
 *   npm run placeholders
 *
 * The images are abstract, warm-neutral compositions in the brand palette —
 * good enough to judge layout and contrast, obviously not real photography.
 * Delete this script once the shop's own photographs are in place.
 *
 * Everything is drawn as SVG and encoded to WebP with sharp, at the exact
 * dimensions declared in lib/images.ts, so nothing in the layout shifts
 * when the real files replace them.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'images');

/* ── palette ─────────────────────────────────────────────── */

const PALETTES = {
  bone: { bg: '#EFEBE4', mid: '#DED5C7', deep: '#C8BCAA', line: '#7C766C' },
  sand: { bg: '#E4DBCD', mid: '#D2C6B3', deep: '#B9A992', line: '#6C6459' },
  stone: { bg: '#E8E6E1', mid: '#D6D3CB', deep: '#B7B3A8', line: '#6E6A62' },
  clay: { bg: '#DFD3C3', mid: '#CBBBA6', deep: '#AF9C83', line: '#655B4D' },
  ink: { bg: '#24211D', mid: '#332F29', deep: '#4A443B', line: '#C8BCAA' },
};

/* ── deterministic pseudo-random, so re-runs are identical ─ */

function rng(seed) {
  let state = seed * 9301 + 49297;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

/* ── motifs ──────────────────────────────────────────────── */

/** Line-art spectacles, centred in a box of width `w`. */
function glasses(cx, cy, w, stroke, opacity = 1) {
  const lens = w * 0.34;
  const gap = w * 0.1;
  const r = lens * 0.3;
  const left = cx - gap / 2 - lens;
  const right = cx + gap / 2;
  const top = cy - lens * 0.36;
  const h = lens * 0.72;
  const sw = Math.max(1.5, w * 0.006);

  return `
    <g fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}" stroke-linecap="round">
      <rect x="${left}" y="${top}" width="${lens}" height="${h}" rx="${r}" />
      <rect x="${right}" y="${top}" width="${lens}" height="${h}" rx="${r}" />
      <path d="M ${left + lens} ${cy - h * 0.12} q ${gap / 2} ${-h * 0.18} ${gap} 0" />
      <path d="M ${left} ${cy - h * 0.1} l ${-w * 0.13} ${-h * 0.14}" />
      <path d="M ${right + lens} ${cy - h * 0.1} l ${w * 0.13} ${-h * 0.14}" />
    </g>`;
}

/** A single lens disc with a highlight arc. */
function lensDisc(cx, cy, r, stroke) {
  const sw = Math.max(1.5, r * 0.02);
  return `
    <g fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round">
      <circle cx="${cx}" cy="${cy}" r="${r}" opacity="0.75" />
      <circle cx="${cx}" cy="${cy}" r="${r * 0.72}" opacity="0.35" />
      <path d="M ${cx - r * 0.5} ${cy - r * 0.45} a ${r * 0.7} ${r * 0.7} 0 0 1 ${r * 0.62} ${-r * 0.2}" opacity="0.9" />
    </g>`;
}

/** Loose architectural lines — reads as a shopfront or interior. */
function architecture(w, h, stroke) {
  const sw = Math.max(1, w * 0.0025);
  const floor = h * 0.74;
  return `
    <g fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="0.5">
      <path d="M0 ${floor} H${w}" />
      <path d="M${w * 0.08} ${floor} V${h * 0.22} H${w * 0.44} V${floor}" />
      <path d="M${w * 0.56} ${floor} V${h * 0.3} H${w * 0.92} V${floor}" />
      <path d="M${w * 0.08} ${h * 0.46} H${w * 0.44} M${w * 0.56} ${h * 0.5} H${w * 0.92}" />
      <path d="M${w * 0.08} ${h * 0.6} H${w * 0.44} M${w * 0.56} ${h * 0.62} H${w * 0.92}" />
    </g>`;
}

/** Three soft figures — a stand-in for the family portrait. */
function figures(w, h, fill) {
  const base = h * 0.86;
  const people = [
    { x: w * 0.34, s: 1 },
    { x: w * 0.5, s: 1.12 },
    { x: w * 0.66, s: 0.94 },
  ];
  return people
    .map(({ x, s }) => {
      const head = h * 0.075 * s;
      const bodyW = h * 0.26 * s;
      const bodyH = h * 0.42 * s;
      const headY = base - bodyH - head * 1.35;
      return `
        <g fill="${fill}" opacity="0.55">
          <circle cx="${x}" cy="${headY}" r="${head}" />
          <path d="M ${x - bodyW / 2} ${base} v ${-bodyH} a ${bodyW / 2} ${bodyW / 2} 0 0 1 ${bodyW} 0 v ${bodyH} z" />
        </g>`;
    })
    .join('');
}

/* ── composition ─────────────────────────────────────────── */

function compose({ width, height, palette, motif, seed }) {
  const p = PALETTES[palette];
  const rand = rng(seed);
  const min = Math.min(width, height);

  // Soft background shapes.
  const blobs = Array.from({ length: 3 }, (_, i) => {
    const r = min * (0.36 + rand() * 0.34);
    const cx = width * (0.15 + rand() * 0.7);
    const cy = height * (0.12 + rand() * 0.76);
    const fill = i === 0 ? p.mid : p.deep;
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" opacity="${(0.35 - i * 0.08).toFixed(2)}" />`;
  }).join('');

  const band = `<path d="M0 ${(height * (0.55 + rand() * 0.2)).toFixed(1)} L${width} ${(height * (0.3 + rand() * 0.25)).toFixed(1)} L${width} ${height} L0 ${height} Z" fill="${p.deep}" opacity="0.18" />`;

  let subject = '';
  switch (motif) {
    case 'glasses':
      subject = glasses(width / 2, height * 0.5, min * 0.78, p.line, 0.7);
      break;
    case 'glasses-low':
      subject = glasses(width / 2, height * 0.58, min * 0.62, p.line, 0.6);
      break;
    case 'lens':
      subject = lensDisc(width * 0.5, height * 0.5, min * 0.26, p.line);
      break;
    case 'pair':
      subject =
        lensDisc(width * 0.36, height * 0.52, min * 0.18, p.line) +
        lensDisc(width * 0.66, height * 0.46, min * 0.14, p.line);
      break;
    case 'architecture':
      subject = architecture(width, height, p.line) + glasses(width * 0.5, height * 0.42, width * 0.3, p.line, 0.55);
      break;
    case 'family':
      subject = figures(width, height, p.line) + glasses(width * 0.5, height * 0.2, width * 0.22, p.line, 0.45);
      break;
    case 'grid': {
      const cols = 4;
      subject = Array.from({ length: cols }, (_, i) =>
        glasses(width * ((i + 0.5) / cols), height * (0.42 + (i % 2) * 0.16), width * 0.2, p.line, 0.5),
      ).join('');
      break;
    }
    default:
      subject = glasses(width / 2, height / 2, min * 0.7, p.line, 0.65);
  }

  // A fine dot field keeps the flat colour from looking like an error state.
  const dots = `
    <pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.6" fill="${p.line}" opacity="0.07" />
    </pattern>`;

  // Corner rule marks — a quiet signal that this is a placeholder.
  const marks = `
    <g stroke="${p.line}" stroke-width="${Math.max(1, min * 0.003)}" opacity="0.35" fill="none">
      <path d="M${min * 0.05} ${min * 0.05} h${min * 0.07}" />
      <path d="M${width - min * 0.12} ${height - min * 0.05} h${min * 0.07}" />
    </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>${dots}</defs>
    <rect width="${width}" height="${height}" fill="${p.bg}" />
    ${blobs}
    ${band}
    ${subject}
    <rect width="${width}" height="${height}" fill="url(#grain)" />
    ${marks}
  </svg>`;
}

/* ── the manifest — keep in step with lib/images.ts ───────── */

const PORTRAIT = { width: 1200, height: 1500 };
const LANDSCAPE = { width: 1600, height: 1067 };
const SQUARE = { width: 1200, height: 1200 };

const FILES = [
  { file: 'placeholder-hero.webp', ...PORTRAIT, palette: 'sand', motif: 'glasses', seed: 11 },
  { file: 'placeholder-hero-detail.webp', ...SQUARE, palette: 'clay', motif: 'lens', seed: 12 },
  { file: 'placeholder-store.webp', ...LANDSCAPE, palette: 'bone', motif: 'architecture', seed: 21 },
  { file: 'placeholder-store-interior.webp', ...LANDSCAPE, palette: 'clay', motif: 'architecture', seed: 22 },
  { file: 'placeholder-family.webp', ...LANDSCAPE, palette: 'sand', motif: 'family', seed: 31 },
  { file: 'placeholder-fashion.webp', ...PORTRAIT, palette: 'clay', motif: 'glasses', seed: 41 },
  { file: 'placeholder-prescription.webp', ...PORTRAIT, palette: 'stone', motif: 'glasses-low', seed: 42 },
  { file: 'placeholder-fitting.webp', ...LANDSCAPE, palette: 'bone', motif: 'pair', seed: 51 },
  { file: 'placeholder-lens.webp', ...SQUARE, palette: 'stone', motif: 'lens', seed: 52 },
  { file: 'placeholder-frame-01.webp', ...PORTRAIT, palette: 'clay', motif: 'glasses', seed: 61 },
  { file: 'placeholder-frame-02.webp', ...SQUARE, palette: 'stone', motif: 'glasses-low', seed: 62 },
  { file: 'placeholder-frame-03.webp', ...PORTRAIT, palette: 'ink', motif: 'glasses', seed: 63 },
  { file: 'placeholder-frame-04.webp', ...SQUARE, palette: 'sand', motif: 'glasses', seed: 64 },
  { file: 'placeholder-frame-05.webp', ...PORTRAIT, palette: 'bone', motif: 'glasses-low', seed: 65 },
  { file: 'placeholder-frame-06.webp', ...SQUARE, palette: 'clay', motif: 'glasses', seed: 66 },
  { file: 'placeholder-journal-01.webp', ...LANDSCAPE, palette: 'bone', motif: 'grid', seed: 71 },
  { file: 'placeholder-journal-02.webp', ...LANDSCAPE, palette: 'sand', motif: 'pair', seed: 72 },
  { file: 'placeholder-journal-03.webp', ...LANDSCAPE, palette: 'stone', motif: 'glasses', seed: 73 },
  { file: 'placeholder-journal-04.webp', ...LANDSCAPE, palette: 'clay', motif: 'lens', seed: 74 },
  { file: 'placeholder-journal-05.webp', ...LANDSCAPE, palette: 'bone', motif: 'grid', seed: 75 },
  { file: 'placeholder-og.webp', width: 1200, height: 630, palette: 'ink', motif: 'glasses-low', seed: 81 },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const entry of FILES) {
    const svg = compose(entry);
    const buffer = await sharp(Buffer.from(svg))
      .webp({ quality: 82, effort: 5 })
      .toBuffer();
    await writeFile(join(OUT_DIR, entry.file), buffer);
    console.log(`  ✓ ${entry.file}  ${entry.width}×${entry.height}`);
  }

  console.log(`\n${FILES.length} placeholder images written to public/images`);
}

main().catch((error) => {
  console.error('Failed to generate placeholders:', error);
  process.exitCode = 1;
});
