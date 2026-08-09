import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { EyewearEditorial } from '@/components/eyewear/EyewearEditorial';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { BlogCard } from '@/components/cards/BlogCard';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, localePath, type Locale } from '@/i18n/config';
import { getMeta, getNotes, getPrescriptionServices } from '@/lib/content';
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
    title: t('seo.prescription.title'),
    description: t('seo.prescription.description'),
    path: '/eyewear/prescription',
    image: images.prescriptionEyewear,
    keywords: tList(t, 'seo.prescription.keywords'),
  });
}

export default async function PrescriptionEyewearPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.eyewear'), href: '/eyewear' },
    { label: t('common.nav.prescription'), href: '/eyewear/prescription' },
  ];

  const frames = featuredFrames.filter((frame) =>
    ['Prescription', 'Minimal', 'Classic'].includes(frame.style),
  );

  const relevantServices = getPrescriptionServices(t);

  const relatedArticles = [
    'fashion-glasses-vs-prescription-glasses',
    'how-to-choose-the-right-eyeglass-frame',
  ]
    .map((slug) => getArticle(locale, slug))
    .filter((article): article is Article => Boolean(article));

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, breadcrumbs)} />

      <PageHeader
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('eyewear.categories.prescription.title')}
        title={t('eyewear.categories.prescription.tagline')}
        intro={t('eyewear.categories.prescription.description')}
        meta={getMeta(t, 'eyewear.prescriptionPage.meta')}
      />

      <Reveal>
        <figure className="relative aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={images.prescriptionEyewear.src}
            alt={images.prescriptionEyewear.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </figure>
      </Reveal>

      <section className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
              {t('eyewear.prescriptionPage.howEyebrow')}
            </p>
            <h2 className="font-display text-display-md font-light text-balance">
              {t('eyewear.prescriptionPage.howTitle')}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-5 text-lede font-light text-graphite text-pretty">
              <p>{t('eyewear.prescriptionPage.body1')}</p>
              <p>
                {t('eyewear.prescriptionPage.body2Start')}
                <Link
                  href={localePath(locale, '/eyewear/fashion')}
                  className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  {t('eyewear.prescriptionPage.body2Link')}
                </Link>
              </p>
            </div>

            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {getNotes(t, 'eyewear.prescriptionPage.notes').map((note) => (
                <li key={note.title} className="border-t border-ink/15 pt-5">
                  <h3 className="font-display text-lg font-normal">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{note.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-bone">
        <div className="shell py-section">
          <SectionHeading
            eyebrow={t('eyewear.prescriptionPage.inStoreEyebrow')}
            title={t('eyewear.prescriptionPage.inStoreTitle')}
            intro={t('eyewear.prescriptionPage.inStoreIntro')}
            action={
              <TextLink href="/eyewear/fashion" locale={locale}>
                {t('common.nav.fashion')}
              </TextLink>
            }
            className="mb-16"
          />
          <EyewearEditorial frames={frames} locale={locale} />
        </div>
      </section>

      <section className="shell py-section">
        <SectionHeading
          eyebrow={t('eyewear.prescriptionPage.includedEyebrow')}
          title={t('eyewear.prescriptionPage.includedTitle')}
          action={
            <TextLink href="/services" locale={locale}>
              {t('common.cta.allServices')}
            </TextLink>
          }
          className="mb-14"
          size="sm"
        />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {relevantServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80} className="h-full">
              <ServiceCard service={service} index={index} variant="full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-bone">
        <div className="shell py-section">
          <SectionHeading
            eyebrow={t('eyewear.prescriptionPage.journalEyebrow')}
            title={t('eyewear.prescriptionPage.journalTitle')}
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
        </div>
      </section>

      <ContactCTA locale={locale} variant="prescription" />
    </>
  );
}
