import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { getMeta, getParagraphs, getPrinciples } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { images } from '@/lib/images';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    path: '/about',
    image: images.family,
    keywords: tList(t, 'seo.about.keywords'),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.about'), href: '/about' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, breadcrumbs)} />

      <PageHeader
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('home.family.eyebrow')}
        title={t('home.family.title')}
        intro={t('about.intro')}
        meta={getMeta(t, 'home.storyPoints')}
      />

      <Reveal>
        <figure className="relative aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={images.family.src}
            alt={images.family.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <figcaption className="sr-only">{t('about.figcaptionFamily')}</figcaption>
        </figure>
      </Reveal>

      <section className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
              {t('about.storyEyebrow')}
            </p>
            <h2 className="font-display text-display-md font-light text-balance">
              {t('about.storyTitle')}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-6 text-lede font-light text-graphite text-pretty">
              {getParagraphs(t, 'home.family.body').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{t('about.storyExtra')}</p>
            </div>

            <blockquote className="mt-12 border-t border-ink/15 pt-8">
              <p className="font-display text-2xl font-light leading-snug text-balance md:text-3xl">
                “{t('home.family.pullQuote')}”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-bone">
        <div className="shell py-section">
          <SectionHeading
            eyebrow={t('home.philosophy.eyebrow')}
            title={t('home.philosophy.title')}
            intro={getParagraphs(t, 'home.philosophy.body')[0]}
            className="mb-16"
          />
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {getPrinciples(t).map((principle, index) => (
              <Reveal as="li" key={principle.number} delay={(index % 3) * 80}>
                <div className="flex h-full flex-col border-t border-ink/15 pt-5">
                  <span className="text-[0.6875rem] uppercase tracking-widest2 text-mist">
                    {principle.number}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-normal">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{principle.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell py-section">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <figure className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
              <Image
                src={images.storeExterior.src}
                alt={images.storeExterior.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
              <figcaption className="sr-only">{t('about.figcaptionExterior')}</figcaption>
            </figure>
            <p className="mt-4 text-[0.8125rem] text-stone">{t('about.captionExterior')}</p>
          </Reveal>
          <Reveal delay={80}>
            <figure className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
              <Image
                src={images.storeInterior.src}
                alt={images.storeInterior.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
              <figcaption className="sr-only">{t('about.figcaptionInterior')}</figcaption>
            </figure>
            <p className="mt-4 text-[0.8125rem] text-stone">{t('about.captionInterior')}</p>
          </Reveal>
        </div>
      </section>

      <ContactCTA locale={locale} variant="about" />
    </>
  );
}
