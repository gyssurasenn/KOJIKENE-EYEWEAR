import type { ImageAsset } from '@/types';
import { demoProductGalleries } from '@/lib/images';

export type ProductColor = {
  id: string;
  hex: string;
  /** Optional overrides for this colour. */
  images?: readonly ImageAsset[];
  model?: string;
  price?: number;
};

export type Product = {
  id: string;
  brand: string;
  name: string;
  model: string;
  /** THB. Omit until the real selling price is confirmed. */
  price?: number;
  images: readonly ImageAsset[];
  colors: readonly ProductColor[];
  freeShipping?: boolean;
  isDemo?: boolean;
  descriptionKey?: string;
};

// Layout examples only. Replace these records and their image references
// with confirmed products before removing isDemo.
export const products: Product[] = [
  { id: 'demo-aoi', brand: 'DEMO', name: 'Aoi', model: 'DEMO-01/A', price: 4490,
    images: demoProductGalleries.aoi, isDemo: true, freeShipping: true,
    colors: [{ id: 'honey', hex: '#c9aa73' }, { id: 'dark', hex: '#373435', model: 'DEMO-01/B', images: demoProductGalleries.kumo }],
    descriptionKey: 'eyewear.frames.aoi.note' },
  { id: 'demo-nagi', brand: 'DEMO', name: 'Nagi', model: 'DEMO-02/A', price: 2990,
    images: demoProductGalleries.nagi, isDemo: true, colors: [{ id: 'silver', hex: '#b7bcbd' }], descriptionKey: 'eyewear.frames.nagi.note' },
  { id: 'demo-kumo', brand: 'DEMO', name: 'Kumo', model: 'DEMO-03/A', price: 1990,
    images: demoProductGalleries.kumo, isDemo: true, colors: [{ id: 'charcoal', hex: '#373435' }], descriptionKey: 'eyewear.frames.kumo.note' },
  { id: 'demo-sumi', brand: 'DEMO', name: 'Sumi', model: 'DEMO-04/A', price: 2490,
    images: demoProductGalleries.sumi, isDemo: true, colors: [{ id: 'tortoise', hex: '#806044' }], descriptionKey: 'eyewear.frames.sumi.note' },
  { id: 'demo-hikari', brand: 'DEMO', name: 'Hikari', model: 'DEMO-05/A',
    images: demoProductGalleries.hikari, isDemo: true, colors: [{ id: 'clear', hex: '#eef5f5' }], descriptionKey: 'eyewear.frames.hikari.note' },
  { id: 'demo-mine', brand: 'DEMO', name: 'Mine', model: 'DEMO-06/A',
    images: demoProductGalleries.mine, isDemo: true, colors: [{ id: 'sand', hex: '#d4c3a7' }], descriptionKey: 'eyewear.frames.mine.note' },
];
