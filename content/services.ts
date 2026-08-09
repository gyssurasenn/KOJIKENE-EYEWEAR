/**
 * Service ids only. Titles, summaries, details and durations live in the
 * translation files under `services.items.<id>`; FAQs under `services.faqs`.
 */
export const serviceSlugs = [
  'prescription-eyewear',
  'frame-fitting',
  'lens-consultation',
  'frame-adjustment',
  'eyewear-styling',
  'after-sales-service',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Shown on the Prescription page. */
export const prescriptionServiceSlugs: ServiceSlug[] = [
  'prescription-eyewear',
  'frame-fitting',
  'lens-consultation',
];
