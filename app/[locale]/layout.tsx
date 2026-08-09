import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Thai, Zen_Kaku_Gothic_New } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { I18nProvider } from '@/i18n/client';
import { getDictionary, getT } from '@/i18n/server';
import {
  defaultLocale,
  isLocale,
  localeConfig,
  locales,
  type Locale,
} from '@/i18n/config';
import { localBusinessSchema, websiteSchema } from '@/lib/jsonld';
import { canonical, languageAlternates } from '@/lib/seo';
import { SITE_URL, site } from '@/lib/site';
import { absoluteImageUrl, images } from '@/lib/images';

/** Body / UI — latin. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

/** Editorial display face — a Japanese-designed gothic, used large and light. */
const display = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-display',
});

/**
 * Thai. Carries both body and display duties on the Thai site, since
 * the latin display face has no Thai glyphs.
 */
const thai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-thai',
});

/** Both languages are prerendered at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('seo.home.title'),
      template: `%s | ${site.name}`,
    },
    description: t('seo.siteDescription'),
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    category: 'Eyewear',
    formatDetection: { telephone: true, address: true, email: false },
    alternates: {
      canonical: canonical(locale, '/'),
      languages: languageAlternates('/'),
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: localeConfig[locale].ogLocale,
      url: canonical(locale, '/'),
      title: t('seo.home.title'),
      description: t('seo.siteDescription'),
      images: [
        {
          url: absoluteImageUrl(images.openGraph.src, SITE_URL),
          width: images.openGraph.width,
          height: images.openGraph.height,
          alt: images.openGraph.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.home.title'),
      description: t('seo.siteDescription'),
      images: [absoluteImageUrl(images.openGraph.src, SITE_URL)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/favicon.svg' }],
    },
    // Add the Google Search Console token here once the property is created:
    // verification: { google: 'xxxxxxxx' },
  };
}

export const viewport: Viewport = {
  themeColor: '#F6F4F0',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const t = await getT(locale);
  const businessCopy = { description: t('seo.siteDescription') };

  // Only the `common` slice is sent to the browser — page and article
  // copy never ships as client JavaScript.
  const dictionary = getDictionary(locale);
  const clientResources = {
    [locale]: { translation: { common: dictionary.common } },
  };

  return (
    <html
      lang={localeConfig[locale].htmlLang}
      className={`${inter.variable} ${display.variable} ${thai.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col" data-locale={locale}>
        <JsonLd
          data={[localBusinessSchema(locale, businessCopy), websiteSchema(locale, businessCopy)]}
          id="global"
        />
        <I18nProvider locale={locale} resources={clientResources}>
          <Header locale={locale} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </I18nProvider>
      </body>
    </html>
  );
}
