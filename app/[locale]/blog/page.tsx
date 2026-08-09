import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { BlogGrid } from '@/components/journal/BlogGrid';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { blogSchema, breadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { getSortedArticles } from '@/content/blog';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.blog.title'),
    description: t('seo.blog.description'),
    path: '/blog',
    keywords: tList(t, 'seo.blog.keywords'),
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const articles = getSortedArticles(locale);
  const categories = Array.from(new Set(articles.map((article) => article.category)));

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.journal'), href: '/blog' },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, breadcrumbs),
          blogSchema(locale, articles, {
            name: t('home.journal.title'),
            description: t('home.journal.subtitle'),
          }),
        ]}
      />

      <PageHeader
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('home.journal.eyebrow')}
        title={t('home.journal.title')}
        intro={t('home.journal.subtitle')}
      >
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-6">
          {categories.map((category) => (
            <li
              key={category}
              className="text-[0.6875rem] uppercase tracking-widest2 text-stone after:ml-6 after:text-mist after:content-['·'] last:after:content-none"
            >
              {t(`blog.categories.${category}`)}
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="shell py-section">
        <BlogGrid articles={articles} locale={locale} featureFirst columns={3} />
      </section>

      <ContactCTA locale={locale} variant="blog" />
    </>
  );
}
