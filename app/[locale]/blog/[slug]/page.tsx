import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BlogCard } from '@/components/cards/BlogCard';
import { RichText, extractHeadings } from '@/components/journal/RichText';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT } from '@/i18n/server';
import { defaultLocale, isLocale, localePath, locales, type Locale } from '@/i18n/config';
import { articleSchema, breadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/format';
import { articleSlugs, getArticle, getRelatedArticles } from '@/content/blog';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/** Every article is pre-rendered in both languages at build time. */
export function generateStaticParams() {
  return locales.flatMap((locale) => articleSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const article = getArticle(locale, slug);

  if (!article) {
    const t = await getT(locale);
    return buildMetadata({
      locale,
      title: t('seo.notFound.title'),
      description: t('seo.notFound.description'),
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    locale,
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/blog/${article.slug}`,
    image: article.image,
    type: 'article',
    keywords: article.keywords,
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const article = getArticle(locale, slug);
  if (!article) notFound();

  const t = await getT(locale);
  const related = getRelatedArticles(locale, article, 2);
  const headings = extractHeadings(article.body);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.journal'), href: '/blog' },
    { label: article.title, href: `/blog/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, breadcrumbs), articleSchema(locale, article)]} />

      <article>
        <header className="border-b border-ink/10 bg-paper">
          <div className="shell pb-14 pt-8 md:pt-10">
            <Breadcrumb
              items={breadcrumbs}
              locale={locale}
              label={t('common.labels.breadcrumb')}
              className="mb-12 md:mb-16"
            />

            <Reveal className="max-w-4xl">
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{t(`blog.categories.${article.category}`)}</span>
                <span aria-hidden="true" className="text-mist">
                  ·
                </span>
                <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
                <span aria-hidden="true" className="text-mist">
                  ·
                </span>
                <span>{t('common.labels.minRead', { count: article.readingMinutes })}</span>
              </p>

              <h1 className="mt-7 font-display text-display-lg font-light text-balance">
                {article.title}
              </h1>

              <p className="mt-7 max-w-prose2 text-lede font-light text-graphite text-pretty">
                {article.excerpt}
              </p>

              {article.updated ? (
                <p className="mt-8 text-[0.6875rem] uppercase tracking-widest2 text-mist">
                  {t('common.labels.updated')}{' '}
                  <time dateTime={article.updated}>{formatDate(article.updated, locale)}</time>
                </p>
              ) : null}
            </Reveal>
          </div>
        </header>

        <Reveal>
          <figure className="relative aspect-[4/3] w-full overflow-hidden bg-sand sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </figure>
        </Reveal>

        <div className="shell py-16 md:py-24">
          <div className="grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-20">
            {/* Contents + visit rail */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              {headings.length > 1 ? (
                <nav aria-labelledby="contents-heading">
                  <h2 id="contents-heading" className="eyebrow mb-5">
                    {t('common.labels.inThisArticle')}
                  </h2>
                  <ol className="space-y-3 border-l border-ink/10 pl-5 text-sm">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="link-underline text-stone transition-colors hover:text-ink"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}

              <div className="mt-10 border-t border-ink/10 pt-6">
                <h2 className="eyebrow mb-4">{t('blog.article.asideTitle')}</h2>
                <p className="text-sm leading-relaxed text-graphite">
                  {t('blog.article.asideBody')}
                </p>
                <Link
                  href={localePath(locale, '/contact')}
                  className="link-underline mt-4 inline-block text-[0.6875rem] font-medium uppercase tracking-widest2 text-ink"
                >
                  {t('common.cta.planVisit')}
                </Link>
              </div>
            </aside>

            <div>
              <RichText blocks={article.body} locale={locale} />

              <footer className="mt-16 border-t border-ink/10 pt-8">
                <p className="eyebrow mb-4">{t('common.labels.filedUnder')}</p>
                <p className="text-sm text-graphite">
                  {t(`blog.categories.${article.category}`)}
                </p>
                <p className="mt-8 max-w-prose2 text-sm leading-relaxed text-stone">
                  {t('blog.article.authorNote')}
                </p>
              </footer>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-ink/10 bg-bone">
          <div className="shell py-section">
            <SectionHeading
              eyebrow={t('common.labels.keepReading')}
              title={t('common.labels.relatedArticles')}
              size="sm"
              className="mb-14"
            />
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80}>
                  <BlogCard article={item} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCTA locale={locale} />
    </>
  );
}
