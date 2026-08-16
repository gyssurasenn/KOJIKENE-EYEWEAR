import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { VisitStore } from '@/components/sections/VisitStore';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { JsonLd } from '@/components/seo/JsonLd';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { getMeta, getNotes } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { images } from '@/lib/images';
import { contact } from '@/lib/site';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.contact.title'),
    description: t('seo.contact.description'),
    path: '/contact',
    image: images.storeExterior,
    keywords: tList(t, 'seo.contact.keywords'),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.visit'), href: '/contact' },
  ];

  // Phone and LINE are facts from lib/site.ts, so they are merged in here
  // rather than duplicated inside the translation files.
  const meta = [
    { label: t('common.labels.phone'), value: contact.phone },
    { label: t('common.labels.line'), value: contact.line },
    ...getMeta(t, 'contact.meta'),
  ];

  return (
    <>
      {/* LocalBusiness is emitted site-wide from the layout — only the trail is added here. */}
      <JsonLd data={breadcrumbSchema(locale, breadcrumbs)} />

      <PageHeader
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        intro={t('contact.intro')}
        meta={meta}
      />

      <section className="shell py-section">
        <VisitStore locale={locale} headingLevel="h2" showImage={false} />
      </section>

      <section className="border-y border-ink/10 bg-bone">
        <div className="shell py-section">
          <SectionHeading
            eyebrow={t('contact.gettingHereEyebrow')}
            title={t('contact.gettingHereTitle')}
            className="mb-14"
            size="sm"
          />
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
            {getNotes(t, 'contact.arrival').map((note, index) => (
              <Reveal key={note.title} delay={index * 80}>
                <div className="border-t border-ink/15 pt-5">
                  <h3 className="font-display text-lg font-normal">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{note.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <section className="shell py-section">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-6">{t('contact.messageEyebrow')}</p>
            <h2 className="font-display text-display-md font-light text-balance">
              {t('contact.messageTitle')}
            </h2>
            <p className="mt-6 text-lede font-light text-graphite text-pretty">
              {t('contact.messageBody')}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center bg-ink px-8 text-[0.6875rem] font-medium uppercase tracking-widest2 text-paper transition-colors duration-500 ease-editorial hover:bg-graphite"
              >
                LINE · {contact.line}
              </a>
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex min-h-[3.25rem] items-center justify-center border border-ink/25 px-8 text-[0.6875rem] font-medium uppercase tracking-widest2 text-ink transition-colors duration-500 ease-editorial hover:border-ink hover:bg-ink hover:text-paper"
              >
                {t('common.cta.call')} {contact.phone}
              </a>
            </div>
            <SocialLinks className="mt-8 justify-center" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
