import type { Metadata } from 'next';
import { SITE_URL, site } from '@/lib/site';
import { absoluteImageUrl, images } from '@/lib/images';
import { defaultLocale, localeConfig, localePath, locales, type Locale } from '@/i18n/config';
import type { ImageAsset } from '@/types';

type PageMetaInput = {
  locale: Locale;
  /** Page-specific title. The brand suffix is appended by the layout template. */
  title: string;
  description: string;
  /** Unprefixed route path beginning with "/". */
  path: string;
  image?: ImageAsset;
  type?: 'website' | 'article';
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  /** Set true for utility pages that shouldn't rank. */
  noIndex?: boolean;
};

/** Absolute URL for a page in a given language. */
export function canonical(locale: Locale, path: string): string {
  const localised = localePath(locale, path);
  return `${SITE_URL}${localised === '/' ? '/' : localised}`;
}

/**
 * hreflang map for a page. Every page exists in both languages at the
 * same unprefixed path, so the pairing is exact. x-default points at Thai.
 */
export function languageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[localeConfig[locale].hreflang] = canonical(locale, path);
  }
  alternates['x-default'] = canonical(defaultLocale, path);
  return alternates;
}

/**
 * Builds a complete, unique metadata object for a page:
 * title, description, canonical, hreflang, Open Graph and Twitter cards.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  image = images.openGraph,
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = canonical(locale, path);
  const ogImage = {
    url: absoluteImageUrl(image.src, SITE_URL),
    width: image.width,
    height: image.height,
    alt: image.alt,
  };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: localeConfig[locale].ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeConfig[l].ogLocale),
      images: [ogImage],
      ...(type === 'article' && publishedTime ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}
