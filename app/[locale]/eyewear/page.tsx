import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { EyewearCategoryCard } from '@/components/cards/EyewearCategoryCard';
import { EyewearEditorial } from '@/components/eyewear/EyewearEditorial';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { getMeta } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { eyewearCategories, featuredFrames, frameStyles } from '@/content/eyewear';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.eyewear.title'),
    description: t('seo.eyewear.description'),
    path: '/eyewear',
    keywords: tList(t, 'seo.eyewear.keywords'),
  });
}

export default async function EyewearPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.eyewear'), href: '/eyewear' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, breadcrumbs)} />

      <PageHeader
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('eyewear.index.eyebrow')}
        title={t('eyewear.index.title')}
        intro={t('eyewear.index.intro')}
        meta={getMeta(t, 'eyewear.index.meta')}
      />

      <section className="shell py-section">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          {eyewearCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 90}>
              <EyewearCategoryCard
                category={category}
                locale={locale}
                index={String(index + 1).padStart(2, '0')}
                priority={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-bone">
        <div className="shell py-section">
          <SectionHeading
            eyebrow={t('eyewear.index.featuredEyebrow')}
            title={t('eyewear.index.featuredTitle')}
            intro={t('eyewear.index.featuredIntro')}
            className="mb-12"
          />

          <Reveal className="mb-16 flex flex-wrap gap-x-6 gap-y-2 border-y border-ink/10 py-4">
            {frameStyles.map((style) => (
              <span
                key={style}
                className="text-[0.6875rem] uppercase tracking-widest2 text-stone after:ml-6 after:text-mist after:content-['·'] last:after:content-none"
              >
                {t(`eyewear.styles.${style}`)}
              </span>
            ))}
          </Reveal>

          <EyewearEditorial frames={featuredFrames} locale={locale} />
        </div>
      </section>

      <ContactCTA locale={locale} />
    </>
  );
}
