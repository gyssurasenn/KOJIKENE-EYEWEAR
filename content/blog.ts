import { articlesEn } from '@/content/articles/en';
import { articlesTh } from '@/content/articles/th';
import type { Locale } from '@/i18n/config';
import type { Article } from '@/types';

/**
 * Locale-aware access to the Journal.
 * Slugs are identical across languages, so /blog/<slug> and
 * /en/blog/<slug> are always translations of one another.
 */
const byLocale: Record<Locale, Article[]> = {
  th: articlesTh,
  en: articlesEn,
};

export function getArticles(locale: Locale): Article[] {
  return byLocale[locale] ?? articlesTh;
}

/** Newest first — used by the Journal index and the homepage. */
export function getSortedArticles(locale: Locale): Article[] {
  return [...getArticles(locale)].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}

export function getRelatedArticles(locale: Locale, article: Article, limit = 2): Article[] {
  const related = article.relatedSlugs
    .map((slug) => getArticle(locale, slug))
    .filter((a): a is Article => Boolean(a));

  if (related.length >= limit) return related.slice(0, limit);

  const filler = getSortedArticles(locale).filter(
    (a) => a.slug !== article.slug && !related.some((r) => r.slug === a.slug),
  );
  return [...related, ...filler].slice(0, limit);
}

/** Slugs are shared, so this is locale-independent — used for static params. */
export const articleSlugs: string[] = articlesEn.map((article) => article.slug);
