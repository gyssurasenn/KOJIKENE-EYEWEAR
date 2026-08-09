import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { getT, tObjects } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { contact, site } from '@/lib/site';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.terms.title'),
    description: t('seo.terms.description'),
    path: '/terms',
    noIndex: true,
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  const breadcrumbs = [
    { label: t('common.nav.home'), href: '/' },
    { label: t('common.nav.terms'), href: '/terms' },
  ];

  const sections = tObjects<{ heading: string; body: string }>(t, 'legal.terms.sections');

  return (
    <>
      <PageHeader
        locale={locale}
        breadcrumbs={breadcrumbs}
        eyebrow={t('legal.eyebrow')}
        title={t('legal.terms.title')}
        intro={t('legal.terms.intro')}
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
            <h2 className="eyebrow mb-4">{t('legal.contactHeading')}</h2>
            <p className="leading-relaxed text-graphite">
              {site.name} · {contact.phone} · LINE {contact.line}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
