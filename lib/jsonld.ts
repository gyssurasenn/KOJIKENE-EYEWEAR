import { SITE_URL, address, contact, openingHours, site, socialLinks } from '@/lib/site';
import { absoluteImageUrl, images } from '@/lib/images';
import { canonical } from '@/lib/seo';
import { localeConfig, type Locale } from '@/i18n/config';
import type { Article, BreadcrumbItem, FaqItem } from '@/types';

/** Stable @id values so the graph nodes can reference each other. */
export const ID = {
  localBusiness: `${SITE_URL}/#localbusiness`,
  website: `${SITE_URL}/#website`,
} as const;

const socialProfiles = socialLinks.map((s) => s.href).filter(Boolean);

type BusinessCopy = { description: string };

export function localBusinessSchema(locale: Locale, copy: BusinessCopy) {
  const isThai = locale === 'th';
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Optician', 'Store'],
    '@id': ID.localBusiness,
    name: site.name,
    alternateName: site.nameThai,
    description: copy.description,
    url: canonical(locale, '/'),
    image: absoluteImageUrl(images.storeExterior.src, SITE_URL),
    logo: absoluteImageUrl(images.openGraph.src, SITE_URL),
    telephone: contact.phoneHref,
    priceRange: '$$',
    currenciesAccepted: 'THB',
    address: {
      '@type': 'PostalAddress',
      streetAddress: isThai ? address.streetAddress : address.romanised.streetAddress,
      addressLocality: isThai ? address.district : address.romanised.locality,
      addressRegion: isThai ? address.province : address.romanised.region,
      postalCode: address.postalCode,
      addressCountry: address.countryCode,
    },
    ...(address.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: address.geo.latitude,
            longitude: address.geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: openingHours.schema.map((block) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: block.days,
      opens: block.opens,
      closes: block.closes,
    })),
    areaServed: [
      { '@type': 'City', name: 'Nonthaburi' },
      { '@type': 'City', name: 'Bangkok' },
    ],
    sameAs: socialProfiles,
    knowsLanguage: ['th', 'en'],
  };
}

export function websiteSchema(locale: Locale, copy: BusinessCopy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ID.website,
    url: canonical(locale, '/'),
    name: site.name,
    description: copy.description,
    inLanguage: localeConfig[locale].hreflang,
    publisher: { '@id': ID.localBusiness },
  };
}

export function breadcrumbSchema(locale: Locale, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: canonical(locale, item.href),
    })),
  };
}

export function articleSchema(locale: Locale, article: Article) {
  const url = canonical(locale, `/blog/${article.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: article.title,
    description: article.metaDescription,
    image: [absoluteImageUrl(article.image.src, SITE_URL)],
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    articleSection: article.category,
    keywords: article.keywords.join(', '),
    inLanguage: localeConfig[locale].hreflang,
    author: { '@type': 'Organization', name: site.name, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteImageUrl(images.openGraph.src, SITE_URL),
      },
    },
  };
}

export function blogSchema(
  locale: Locale,
  articles: Article[],
  copy: { name: string; description: string },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${canonical(locale, '/blog')}#blog`,
    name: copy.name,
    description: copy.description,
    url: canonical(locale, '/blog'),
    inLanguage: localeConfig[locale].hreflang,
    publisher: { '@id': ID.localBusiness },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      url: canonical(locale, `/blog/${article.slug}`),
      datePublished: article.date,
      image: absoluteImageUrl(article.image.src, SITE_URL),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function serviceListSchema(
  locale: Locale,
  services: { title: string; summary: string }[],
  name: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        provider: { '@id': ID.localBusiness },
        areaServed: { '@type': 'City', name: 'Nonthaburi' },
      },
    })),
  };
}
