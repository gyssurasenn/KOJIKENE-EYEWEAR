import { images } from '@/lib/images';
import type { EyewearCategorySlug, FrameStyle, ImageAsset } from '@/types';

/**
 * Structure only — every piece of visible text lives in the translation
 * files under `eyewear.*` and is looked up by the ids below.
 */

export type EyewearCategoryDef = {
  slug: EyewearCategorySlug;
  /** Unprefixed path; components add the locale prefix. */
  href: string;
  image: ImageAsset;
};

export const eyewearCategories: EyewearCategoryDef[] = [
  { slug: 'fashion', href: '/eyewear/fashion', image: images.fashionEyewear },
  { slug: 'prescription', href: '/eyewear/prescription', image: images.prescriptionEyewear },
];

export function getCategory(slug: EyewearCategorySlug): EyewearCategoryDef {
  const category = eyewearCategories.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown eyewear category: ${slug}`);
  return category;
}

export type FrameDef = {
  id: string;
  /** Frame names are proper nouns and stay the same in both languages. */
  name: string;
  style: FrameStyle;
  image: ImageAsset;
};

/**
 * Featured frames — an editorial selection, not a catalogue.
 * No prices, no stock, no cart: the point is to bring people in.
 */
export const featuredFrames: FrameDef[] = [
  { id: 'aoi', name: 'Aoi', style: 'Fashion', image: images.frames.aoi },
  { id: 'nagi', name: 'Nagi', style: 'Minimal', image: images.frames.nagi },
  { id: 'kumo', name: 'Kumo', style: 'Statement', image: images.frames.kumo },
  { id: 'sumi', name: 'Sumi', style: 'Classic', image: images.frames.sumi },
  { id: 'hikari', name: 'Hikari', style: 'Prescription', image: images.frames.hikari },
  { id: 'mine', name: 'Mine', style: 'Fashion', image: images.frames.mine },
];

export const frameStyles: FrameStyle[] = [
  'Fashion',
  'Prescription',
  'Classic',
  'Minimal',
  'Statement',
];
