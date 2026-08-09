/**
 * Shared types for KOJIKANE EYEWEAR.
 * Visible copy lives in /locales; these types describe structure only.
 */

/** A single image asset. Swap `src` when real photography arrives. */
export type ImageAsset = {
  /** Path under /public, or a remote URL once a CDN is used. */
  src: string;
  /** Descriptive alt text. Never leave empty for content images. */
  alt: string;
  width: number;
  height: number;
  /** Optional focal point for art-directed crops, e.g. "50% 35%". */
  position?: string;
  /** True while this is a temporary placeholder. Handy for audits. */
  placeholder?: boolean;
};

/**
 * A navigation entry. `key` resolves against `common.nav.*` in the
 * translation files; `href` is unprefixed and gets the locale added.
 */
export type NavLink = {
  key: string;
  href: string;
  children?: NavLink[];
};

export type BreadcrumbItem = {
  label: string;
  /** Unprefixed path — components add the locale prefix. */
  href: string;
};

export type EyewearCategorySlug = 'fashion' | 'prescription';

export type FrameStyle = 'Fashion' | 'Prescription' | 'Classic' | 'Minimal' | 'Statement';

/** Resolved service copy, read out of the translation files. */
export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  duration?: string;
};

export type BlogCategory =
  | 'Style Guide'
  | 'Frame Guide'
  | 'Eyewear Care'
  | 'Trends'
  | 'Prescription';

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; image: ImageAsset; caption?: string };

export type Article = {
  /** Shared across languages, so translations pair up for hreflang. */
  slug: string;
  /** <h1> on the page. */
  title: string;
  /** <title> tag — may differ from the H1. The brand suffix is appended. */
  seoTitle: string;
  metaDescription: string;
  /** Standfirst shown under the H1. */
  excerpt: string;
  /** Key into `blog.categories.*` — stays in English in every language. */
  category: BlogCategory;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  updated?: string;
  readingMinutes: number;
  image: ImageAsset;
  keywords: string[];
  body: ArticleBlock[];
  relatedSlugs: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** A label/value pair, used in page-header meta rows. */
export type MetaPair = {
  label: string;
  value: string;
};
