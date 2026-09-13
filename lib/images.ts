import type { ImageAsset } from '@/types';

/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRALISED IMAGE CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Every image on the site is referenced from this file.
 *  No component hardcodes an image path.
 *
 *  TO SWAP IN REAL PHOTOGRAPHY
 *  1. Drop the file into /public/images (e.g. hero.jpg, store-front.jpg,
 *     family.jpg, fashion/…, prescription/…).
 *  2. Change `src`, `width` and `height` on the entry below.
 *  3. Rewrite `alt` to describe the actual photograph.
 *  4. Delete `placeholder: true`.
 *
 *  Nothing else needs to change — the layouts already reserve the
 *  correct aspect ratios, and next/image handles responsive sizes,
 *  WebP/AVIF conversion and lazy loading.
 *
 *  Aspect ratios the layout expects (keep these when replacing):
 *    hero, category, frame portraits ....... 4 : 5   (portrait)
 *    store, family, journal ................ 3 : 2   (landscape)
 *    frame details ......................... 1 : 1   (square)
 *    openGraph ............................. 1200 × 630
 * ─────────────────────────────────────────────────────────────
 */

const DIR = '/images';

/** Portrait 4:5 */
const PORTRAIT = { width: 1200, height: 1500 } as const;
/** Landscape 3:2 */
const LANDSCAPE = { width: 1600, height: 1067 } as const;
/** Square */
const SQUARE = { width: 1200, height: 1200 } as const;

export const images = {
  wallTexture: {
    src: `${DIR}/BgHome.jpg`,
    alt: 'Travel-stamp wallpaper with illustrated European landmarks',
    width: 1536,
    height: 2048,
  } as ImageAsset,
  /** Original logo; whitespace is framed in CSS without changing the source. */
  logo: {
    src: `${DIR}/LOGO/KOJIKANE_Logo.png`,
    alt: 'KOJIKANE EYEWEAR',
    width: 2000,
    height: 2000,
  } as ImageAsset,

  hero: {
    src: `${DIR}/placeholder-hero.webp`,
    alt: 'A pair of acetate eyeglasses resting on a warm neutral surface at KOJIKANE EYEWEAR',
    ...PORTRAIT,
    placeholder: true,
  } as ImageAsset,

  heroDetail: {
    src: `${DIR}/placeholder-hero-detail.webp`,
    alt: 'Close detail of a thin metal eyeglass temple and hinge',
    ...SQUARE,
    placeholder: true,
  } as ImageAsset,

  storeExterior: {
    src: `${DIR}/placeholder-store.webp`,
    alt: 'Shopfront of KOJIKANE EYEWEAR on Samakkhi Road, Nonthaburi',
    ...LANDSCAPE,
    placeholder: true,
  } as ImageAsset,

  storeInterior: {
    src: `${DIR}/placeholder-store-interior.webp`,
    alt: 'Inside the KOJIKANE EYEWEAR shop, with frames displayed along a wooden counter',
    ...LANDSCAPE,
    placeholder: true,
  } as ImageAsset,

  family: {
    src: `${DIR}/placeholder-family.webp`,
    alt: 'In-store eyewear consultation at the KOJIKANE EYEWEAR counter',
    ...LANDSCAPE,
    placeholder: true,
  } as ImageAsset,

  fashionEyewear: {
    src: `${DIR}/placeholder-fashion.webp`,
    alt: 'Fashion eyewear — a sculptural acetate frame photographed against a warm backdrop',
    ...PORTRAIT,
    placeholder: true,
  } as ImageAsset,

  prescriptionEyewear: {
    src: `${DIR}/placeholder-prescription.webp`,
    alt: 'Prescription eyewear — a lightweight optical frame with clear lenses',
    ...PORTRAIT,
    placeholder: true,
  } as ImageAsset,

  fitting: {
    src: `${DIR}/placeholder-fitting.webp`,
    alt: 'An optician adjusting the temple of a frame during a fitting',
    ...LANDSCAPE,
    placeholder: true,
  } as ImageAsset,

  lensConsultation: {
    src: `${DIR}/placeholder-lens.webp`,
    alt: 'Lens options laid out on a counter during a consultation',
    ...SQUARE,
    placeholder: true,
  } as ImageAsset,

  /** Featured frames — editorial stills, not product shots. */
  frames: {
    aoi: {
      src: `${DIR}/placeholder-frame-01.webp`,
      alt: 'A rounded acetate frame in translucent honey, shown from three-quarter angle',
      ...PORTRAIT,
      placeholder: true,
    } as ImageAsset,
    nagi: {
      src: `${DIR}/placeholder-frame-02.webp`,
      alt: 'A slim titanium frame with a straight brow bar, laid flat',
      ...SQUARE,
      placeholder: true,
    } as ImageAsset,
    kumo: {
      src: `${DIR}/placeholder-frame-03.webp`,
      alt: 'An oversized square frame in matte charcoal acetate',
      ...PORTRAIT,
      placeholder: true,
    } as ImageAsset,
    sumi: {
      src: `${DIR}/placeholder-frame-04.webp`,
      alt: 'A classic keyhole-bridge frame in dark tortoiseshell',
      ...SQUARE,
      placeholder: true,
    } as ImageAsset,
    hikari: {
      src: `${DIR}/placeholder-frame-05.webp`,
      alt: 'A rimless optical frame with a polished bridge',
      ...PORTRAIT,
      placeholder: true,
    } as ImageAsset,
    mine: {
      src: `${DIR}/placeholder-frame-06.webp`,
      alt: 'An angular cat-eye frame in warm sand acetate',
      ...SQUARE,
      placeholder: true,
    } as ImageAsset,
  },

  /** Journal artwork, keyed by article slug. */
  journal: {
    'how-to-choose-glasses-for-your-face': {
      src: `${DIR}/placeholder-journal-01.webp`,
      alt: 'Several frame shapes arranged in a row to compare their proportions',
      ...LANDSCAPE,
      placeholder: true,
    } as ImageAsset,
    'fashion-glasses-vs-prescription-glasses': {
      src: `${DIR}/placeholder-journal-02.webp`,
      alt: 'Two frames side by side — one styled without correction, one with prescription lenses',
      ...LANDSCAPE,
      placeholder: true,
    } as ImageAsset,
    'how-to-choose-the-right-eyeglass-frame': {
      src: `${DIR}/placeholder-journal-03.webp`,
      alt: 'A frame being measured against a face during a fitting',
      ...LANDSCAPE,
      placeholder: true,
    } as ImageAsset,
    'how-to-take-care-of-your-eyeglasses': {
      src: `${DIR}/placeholder-journal-04.webp`,
      alt: 'A microfibre cloth, lens spray and a hard case beside a pair of glasses',
      ...LANDSCAPE,
      placeholder: true,
    } as ImageAsset,
    'everyday-glasses-trends': {
      src: `${DIR}/placeholder-journal-05.webp`,
      alt: 'A selection of this season’s frame shapes displayed on a neutral shelf',
      ...LANDSCAPE,
      placeholder: true,
    } as ImageAsset,
  },

  /** Shared social preview. Replace with a real branded 1200×630 image. */
  openGraph: {
    src: `${DIR}/placeholder-og.webp`,
    alt: 'KOJIKANE EYEWEAR — fashion and prescription eyewear in Nonthaburi',
    width: 1200,
    height: 630,
    placeholder: true,
  } as ImageAsset,
} as const;

export type JournalImageKey = keyof typeof images.journal;

/** Temporary gallery illustrations, not photographs of actual products. */
export const demoProductGalleries = {
  aoi: [images.frames.aoi, images.heroDetail, images.fashionEyewear, images.frames.sumi],
  nagi: [images.frames.nagi, images.heroDetail, images.prescriptionEyewear],
  kumo: [images.frames.kumo, images.heroDetail, images.frames.nagi, images.frames.sumi],
  sumi: [images.frames.sumi, images.heroDetail, images.frames.aoi],
  hikari: [images.frames.hikari, images.heroDetail, images.prescriptionEyewear],
  mine: [images.frames.mine, images.heroDetail, images.fashionEyewear],
} as const;

/** Absolute URL for metadata (Open Graph / Twitter / JSON-LD). */
export function absoluteImageUrl(src: string, siteUrl: string): string {
  if (src.startsWith('http')) return src;
  return `${siteUrl.replace(/\/$/, '')}${src}`;
}
