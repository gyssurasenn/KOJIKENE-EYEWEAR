import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { getT, tObjects } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { contact } from '@/lib/site';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.privacy.title'),
    description: t('seo.privacy.description'),
    path: '/privacy',
    noIndex: true,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.privacy'), href: '/privacy' },
  ];

  const sections = tObjects<{ heading: string; body: string }>(t, 'legal.privacy.sections');

  return (
    <>
      <PageHeader
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('legal.eyebrow')}
        title={t('legal.privacy.title')}
        intro={t('legal.privacy.intro')}
      />

      <section className="shell py-section">
        <div className="max-w-prose2">
          {sections.map((section) => (
            <div key={section.heading} className="mt-12 first:mt-0">
              <h2 className="font-display text-display-sm font-light text-balance">
                {section.heading}
              </h2>
              <p className="mt-5 leading-[1.8] text-charcoal text-pretty">{section.body}</p>
            </div>
          ))}

          <div className="mt-16 border-t border-ink/10 pt-8">
            <h2 className="eyebrow mb-4">{t('legal.questionsHeading')}</h2>
            <p className="leading-relaxed text-graphite">
              {t('legal.questionsBody', { phone: contact.phone, line: contact.line })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
