import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/layout/PageHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { getFaqs, getMeta, getParagraphs, getServices } from '@/lib/content';
import { breadcrumbSchema, faqSchema, serviceListSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { images } from '@/lib/images';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.services.title'),
    description: t('seo.services.description'),
    path: '/services',
    image: images.fitting,
    keywords: tList(t, 'seo.services.keywords'),
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.services'), href: '/services' },
  ];

  const services = getServices(t);
  const faqs = getFaqs(t);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, breadcrumbs),
          serviceListSchema(locale, services, t('services.page.title')),
          faqSchema(faqs),
        ]}
      />

      <PageHeader
        editorial
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('services.page.eyebrow')}
        title={t('services.page.title')}
        intro={t('services.page.intro')}
        meta={getMeta(t, 'services.page.meta')}
      />

      <section className="shell py-section">
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 2) * 80} className="h-full">
              <ServiceCard service={service} index={index} variant="full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-bone">
        <div className="shell py-section">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <ImageReveal>
              <figure className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                <Image
                  src={images.lensConsultation.src}
                  alt={images.lensConsultation.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </ImageReveal>
            <Reveal delay={80}>
              <p className="eyebrow mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
                {t('services.page.honestEyebrow')}
              </p>
              <h2 className="font-display text-display-md font-light text-balance">
                {t('services.page.honestTitle')}
              </h2>
              <div className="mt-8 space-y-5 leading-relaxed text-graphite text-pretty">
                {getParagraphs(t, 'services.page.honestBody').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-section">
        <SectionHeading
          eyebrow={t('services.page.faqEyebrow')}
          title={t('services.page.faqTitle')}
          className="mb-14"
          size="sm"
        />
        <dl className="max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={(index % 3) * 60} className="py-7">
              <dt className="font-display text-lg font-normal text-balance md:text-xl">
                {faq.question}
              </dt>
              <dd className="mt-3 max-w-prose2 leading-relaxed text-graphite text-pretty">
                {faq.answer}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <ContactCTA locale={locale} variant="services" />
    </>
  );
}
