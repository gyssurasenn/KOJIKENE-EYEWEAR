import Link from 'next/link';
import { Wordmark } from '@/components/brand/Logo';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { StoreMap } from '@/components/ui/StoreMap';
import { ButtonLink } from '@/components/ui/Button';
import { FooterGrid } from '@/components/layout/FooterGrid';
import { getT } from '@/i18n/server';
import { localePath, type Locale } from '@/i18n/config';
import { address, contact, legalNav, openingHours, site } from '@/lib/site';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const year = new Date().getFullYear();
  const addressLines = locale === 'th' ? address.lines : address.linesEn;

  return (
    <footer id="footer" className="border-t border-ink/10 bg-bone">
      <div className="shell py-16 md:py-20">
        <FooterGrid map={<StoreMap title={t('visit.mapTitle')} className="h-[300px] w-full border-0 bg-white md:h-[320px]" />}>
          {/* Brand */}
          <div className="min-w-0">
            <Wordmark className="footer-wordmark text-lg" descriptor={t('common.brand.descriptor')} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-graphite">
              {t('common.footer.blurb')}
            </p>
            <SocialLinks variant="icons" className="mt-8" />
          </div>

          {/* Visit */}
          <div className="min-w-0">
            <h2 className="eyebrow mb-6">{t('common.footer.visitShop')}</h2>
            <address className="not-italic">
              <p
                lang={locale === 'th' ? 'th' : undefined}
                className={`text-sm leading-loose text-graphite ${locale === 'th' ? 'font-thai' : ''}`}
              >
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-[0.6875rem] uppercase tracking-widest2 text-stone">
                    {t('common.labels.phone')}
                  </dt>
                  <dd>
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="link-underline text-graphite transition-colors hover:text-ink"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-[0.6875rem] uppercase tracking-widest2 text-stone">
                    {t('common.labels.line')}
                  </dt>
                  <dd>
                    <a
                      href={contact.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-graphite transition-colors hover:text-ink"
                    >
                      {contact.line}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-[0.6875rem] uppercase tracking-widest2 text-stone">
                    {t('common.labels.hoursShort')}
                  </dt>
                  <dd className="text-graphite">
                    {openingHours.display.map((entry) => (
                      <span key={entry.labelKey} className="block">
                        {t(`common.hours.${entry.labelKey}`)} · {entry.hours}
                      </span>
                    ))}
                    {openingHours.isPlaceholder && <p className="mt-2 text-xs leading-relaxed">{t('common.hours.note')}</p>}
                  </dd>
                </div>
              </dl>
            </address>
            {/* <ButtonLink
              href={address.mapsDirectionsUrl}
              external
              className="mt-6"
            >
              {t('common.cta.getDirections')}
            </ButtonLink> */}
          </div>
        </FooterGrid>

        <div className="mt-10 flex flex-col gap-5 border-t border-ink/10 pt-8 text-[0.6875rem] uppercase tracking-widest2 text-stone md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
            <span className="mx-2 text-mist">·</span>
            <span lang="th" className="font-thai normal-case tracking-normal">
              {site.nameThai}
            </span>
          </p>
          <ul className="flex flex-wrap items-center gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(locale, item.href)}
                  className="link-underline transition-colors hover:text-ink"
                >
                  {t(`common.nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
