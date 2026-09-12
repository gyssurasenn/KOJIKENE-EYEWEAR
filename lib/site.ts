import type { NavLink } from '@/types';

/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION
 *  Update this file when the shop details change.
 *  Nothing here should be duplicated inside components.
 *
 *  Visible *copy* is not here — it lives in locales/{th,en}/translation.json.
 *  This file holds facts: address, phone, links, hours, route structure.
 * ─────────────────────────────────────────────────────────────
 */

/** Production domain. Update before launch, then re-submit the sitemap. */
export const SITE_URL = 'https://www.kojikane-eyewear.com';

export const site = {
  name: 'KOJIKANE EYEWEAR',
  /** Thai name used on Facebook and shopfront signage. */
  nameThai: 'แว่นตา โคจิ คานะ',
  shortName: 'KOJIKANE',
  url: SITE_URL,
} as const;

export const contact = {
  phone: '080-519-6633',
  /** E.164, for tel: links and structured data. */
  phoneHref: '+66805196633',
  line: 'Fisho.naka199',
  lineUrl: 'https://line.me/ti/p/~Fisho.naka199',
  facebookName: 'แว่นตา โคจิ คานะ : KojiKane',
  facebookUrl: 'https://www.facebook.com/fisho.naka199',
  instagram: '@kojikane_eyewear',
  instagramUrl: 'https://www.instagram.com/kojikane_eyewear',
  tiktok: '@.kojikane',
  tiktokUrl: 'https://www.tiktok.com/@.kojikane',
  email: '',
} as const;

export const address = {
  streetAddress: '544 ถนนสามัคคี ตำบลท่าทราย',
  district: 'อำเภอเมืองนนทบุรี',
  province: 'จังหวัดนนทบุรี',
  postalCode: '11000',
  country: 'Thailand',
  countryCode: 'TH',
  /** Romanised, for the English pages and structured data. */
  romanised: {
    streetAddress: '544 Samakkhi Road, Tha Sai',
    locality: 'Mueang Nonthaburi',
    region: 'Nonthaburi',
  },
  /** Rendered as a block on the Contact page and in the footer. */
  lines: [
    '544 ถนนสามัคคี ตำบลท่าทราย',
    'อำเภอเมืองนนทบุรี',
    'จังหวัดนนทบุรี 11000',
    'Thailand',
  ],
  linesEn: [
    '544 Samakkhi Road, Tha Sai',
    'Mueang Nonthaburi',
    'Nonthaburi 11000',
    'Thailand',
  ],
  /** Placeholder coordinates are intentionally omitted until verified. */
  geo: null as { latitude: number; longitude: number } | null,
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('KOJIKANE EYEWEAR 544 ถนนสามัคคี ตำบลท่าทราย อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000'),
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('544 ถนนสามัคคี ตำบลท่าทราย อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000'),
  /** Google Maps embed generated from the canonical shop search query. */
  mapsEmbedUrl:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('KOJIKANE EYEWEAR 544 ถนนสามัคคี ตำบลท่าทราย อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000') +
    '&output=embed',
} as const;

/**
 * PLACEHOLDER opening hours — confirm with the shop before launch.
 * `labelKey` resolves against `common.hours.*` in the translation files.
 */
export const openingHours = {
  isPlaceholder: true,
  display: [
    { labelKey: 'weekdays', hours: '10:30 — 19:00' },
    { labelKey: 'weekend', hours: '10:30 — 18:30' },
  ],
  schema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:30', closes: '19:00' },
    { days: ['Saturday', 'Sunday'], opens: '10:30', closes: '18:30' },
  ],
} as const;

/**
 * Header / footer navigation.
 * `key` resolves against `common.nav.*`; `href` is unprefixed.
 */
export const mainNav: NavLink[] = [
  {
    key: 'eyewear',
    href: '/eyewear',
    children: [
      { key: 'fashion', href: '/eyewear/fashion' },
      { key: 'prescription', href: '/eyewear/prescription' },
    ],
  },
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'journal', href: '/blog' },
  { key: 'visit', href: '/contact' },
];

export const legalNav: NavLink[] = [
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
];

export const socialLinks = [
  { label: 'Facebook', href: contact.facebookUrl, handle: contact.facebookName },
  { label: 'LINE', href: contact.lineUrl, handle: contact.line },
  { label: 'Instagram', href: contact.instagramUrl, handle: contact.instagram },
  { label: 'TikTok', href: contact.tiktokUrl, handle: contact.tiktok },
] as const;
