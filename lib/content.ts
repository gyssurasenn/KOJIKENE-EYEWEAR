import type { TFunction } from 'i18next';
import { tObjects } from '@/i18n/server';
import { prescriptionServiceSlugs, serviceSlugs, type ServiceSlug } from '@/content/services';
import type { FaqItem, MetaPair, Service } from '@/types';

/**
 * Resolvers that turn translation keys into the typed shapes components
 * expect. Structure comes from /content, words come from /locales.
 */

export function getServices(t: TFunction, slugs: readonly ServiceSlug[] = serviceSlugs): Service[] {
  return slugs.map((slug) => ({
    slug,
    title: t(`services.items.${slug}.title`),
    summary: t(`services.items.${slug}.summary`),
    detail: t(`services.items.${slug}.detail`),
    duration: t(`services.items.${slug}.duration`),
  }));
}

export function getPrescriptionServices(t: TFunction): Service[] {
  return getServices(t, prescriptionServiceSlugs);
}

export function getFaqs(t: TFunction): FaqItem[] {
  return tObjects<FaqItem>(t, 'services.faqs');
}

/** Label/value pairs for a page-header meta row. */
export function getMeta(t: TFunction, key: string): MetaPair[] {
  return tObjects<MetaPair>(t, key);
}

/** Numbered principles used on the homepage and the About page. */
export function getPrinciples(t: TFunction): { number: string; title: string; text: string }[] {
  return tObjects<{ title: string; text: string }>(t, 'common.principles').map((item, index) => ({
    number: String(index + 1).padStart(2, '0'),
    ...item,
  }));
}

/** Title/text blocks used in the editorial note columns. */
export function getNotes(t: TFunction, key: string): { title: string; text: string }[] {
  return tObjects<{ title: string; text: string }>(t, key);
}

/** Paragraph arrays. */
export function getParagraphs(t: TFunction, key: string): string[] {
  const value = t(key, { returnObjects: true }) as unknown;
  return Array.isArray(value) ? (value as string[]) : [];
}
