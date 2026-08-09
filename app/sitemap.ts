import type { MetadataRoute } from 'next';
import { articleSlugs, getArticles } from '@/content/blog';
import { defaultLocale, localeConfig, locales } from '@/i18n/config';
import { canonical } from '@/lib/seo';

/**
 * Served at /sitemap.xml. Submit this URL in Google Search Console.
 *
 * Every page is listed once per language, each entry carrying the
 * hreflang alternates for the other language, so Google pairs the Thai
 * and English versions instead of treating them as duplicates.
 */

/** Unprefixed paths, with the change frequency and priority they deserve. */
const staticRoutes = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/eyewear', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/eyewear/fashion', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/eyewear/prescription', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.9 },
] as const;

function alternatesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeConfig[locale].hreflang] = canonical(locale, path);
  }
  languages['x-default'] = canonical(defaultLocale, path);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: canonical(locale, route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternatesFor(route.path),
    })),
  );

  const articles: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      url: canonical(locale, `/blog/${article.slug}`),
      lastModified: new Date(article.updated ?? article.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: alternatesFor(`/blog/${article.slug}`),
    })),
  );

  return [...pages, ...articles];
}

/** Exported for tests / sanity checks. */
export const sitemapPaths = [...staticRoutes.map((r) => r.path), ...articleSlugs.map((s) => `/blog/${s}`)];
