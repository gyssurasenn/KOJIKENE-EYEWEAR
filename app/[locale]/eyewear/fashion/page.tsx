import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { FrameCarousel } from '@/components/eyewear/FrameCarousel';
import { FrameDetailCarousel } from '@/components/eyewear/FrameDetailCarousel';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { BlogCard } from '@/components/cards/BlogCard';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, localePath, type Locale } from '@/i18n/config';
import { getMeta, getNotes } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { images } from '@/lib/images';
import { featuredFrames } from '@/content/eyewear';
import { getArticle } from '@/content/blog';
import type { Article } from '@/types';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.fashion.title'),
    description: t('seo.fashion.description'),
    path: '/eyewear/fashion',
    image: images.fashionEyewear,
    keywords: tList(t, 'seo.fashion.keywords'),
  });
}

export default async function FashionEyewearPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.eyewear'), href: '/eyewear' },
    { label: t('common.nav.fashion'), href: '/eyewear/fashion' },
  ];

  const frames = featuredFrames.filter((frame) =>
    ['Fashion', 'Statement', 'Classic'].includes(frame.style),
  );

  const relatedArticles = ['how-to-choose-glasses-for-your-face', 'everyday-glasses-trends']
    .map((slug) => getArticle(locale, slug))
    .filter((article): article is Article => Boolean(article));

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, breadcrumbs)} />

      <PageHeader
        editorial
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('eyewear.categories.fashion.title')}
        title={t('eyewear.categories.fashion.tagline')}
        intro={t('eyewear.categories.fashion.description')}
        meta={getMeta(t, 'eyewear.fashionPage.meta')}
      />

      {/* Full-width editorial image */}
      <ImageReveal>
        <figure className="relative aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={images.fashionEyewear.src}
            alt={images.fashionEyewear.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </figure>
      </ImageReveal>

      <section className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
              {t('eyewear.fashionPage.howEyebrow')}
            </p>
            <h2 className="font-display text-display-md font-light text-balance">
              {t('eyewear.fashionPage.howTitle')}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-5 text-lede font-light text-graphite text-pretty">
              <p>{t('eyewear.fashionPage.body1')}</p>
              <p>
                {t('eyewear.fashionPage.body2Start')}
                <Link
                  href={localePath(locale, '/eyewear/prescription')}
                  className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  {t('eyewear.fashionPage.body2Link')}
                </Link>
              </p>
            </div>

            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {getNotes(t, 'eyewear.fashionPage.edits').map((edit) => (
                <li key={edit.title} className="border-t border-ink/15 pt-5">
                  <h3 className="font-display text-lg font-normal">{edit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{edit.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-bone">
        <div className="shell py-section">
          <SectionHeading
            eyebrow={t('eyewear.fashionPage.inStoreEyebrow')}
            title={t('eyewear.fashionPage.inStoreTitle')}
            intro={t('eyewear.fashionPage.inStoreIntro')}
            action={
              <TextLink href="/eyewear/prescription" locale={locale}>
                {t('common.nav.prescription')}
              </TextLink>
            }
            className="mb-16"
          />
          <FrameCarousel frames={frames} locale={locale} label={t('eyewear.fashionPage.inStoreTitle')} />
        </div>
      </section>

      <section className="shell py-section">
        <SectionHeading
          eyebrow={t('eyewear.fashionPage.journalEyebrow')}
          title={t('eyewear.fashionPage.journalTitle')}
          action={
            <TextLink href="/blog" locale={locale}>
              {t('common.cta.allArticles')}
            </TextLink>
          }
          className="mb-14"
          size="sm"
        />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {relatedArticles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 80}>
              <BlogCard article={article} locale={locale} />
            </Reveal>
          ))}
        </div>
      </section>

      <FrameDetailCarousel locale={locale} category="fashion" />
      <ContactCTA locale={locale} variant="fashion" />
    </>
  );
}
