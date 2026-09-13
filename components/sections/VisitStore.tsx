import type { TFunction } from 'i18next';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { StoreMap } from '@/components/ui/StoreMap';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { address, contact, openingHours, socialLinks } from '@/lib/site';

/**
 * The "Visit Our Store" block. Used on the homepage and the Contact page.
 * All details come from lib/site.ts, all copy from /locales.
 */
export async function VisitStore({
  locale,
  headingLevel: Heading = 'h2',
  showImage = true,
}: {
  locale: Locale;
  headingLevel?: 'h1' | 'h2';
  showImage?: boolean;
}) {
  const t = await getT(locale);
  const isThai = locale === 'th';
  const addressLines = isThai ? address.lines : address.linesEn;
  const onlineLinks = socialLinks.filter((social) => social.label !== 'LINE');

  if (!showImage) {
    return (
      <ContactMapBlock
        t={t}
        Heading={Heading}
        isThai={isThai}
        addressLines={addressLines}
        onlineLinks={onlineLinks}
      />
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-20">
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
          {t('visit.eyebrow')}
        </p>
        <Heading className="font-display text-display-md font-light text-balance">
          {t('visit.title')}
        </Heading>
        <p className="mt-6 max-w-md text-lede font-light text-graphite text-pretty">
          {t('visit.body')}
        </p>

        <dl className="mt-12 space-y-8 border-t border-ink/10 pt-8">
          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.address')}</dt>
            <dd>
              <address
                lang={isThai ? 'th' : undefined}
                className={`not-italic leading-loose text-graphite ${isThai ? 'font-thai' : ''}`}
              >
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.phone')}</dt>
            <dd>
              <a
                href={`tel:${contact.phoneHref}`}
                className="link-underline text-lg text-ink transition-colors hover:text-graphite"
              >
                {contact.phone}
              </a>
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.line')}</dt>
            <dd>
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-lg text-ink transition-colors hover:text-graphite"
              >
                {contact.line}
              </a>
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.social')}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {onlineLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-lg text-ink transition-colors hover:text-graphite"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.hours')}</dt>
            <dd className="text-graphite">
              {openingHours.display.map((entry) => (
                <span key={entry.labelKey} className="flex flex-wrap gap-x-3">
                  <span className="min-w-[10rem]">{t(`common.hours.${entry.labelKey}`)}</span>
                  <span className="tabular-nums">{entry.hours}</span>
                </span>
              ))}
              {openingHours.isPlaceholder ? (
                <span className="mt-3 block text-[0.8125rem] text-mist">
                  {t('common.hours.note')}
                </span>
              ) : null}
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={address.mapsDirectionsUrl} external variant="solid" size="lg">
            {t('common.cta.getDirections')}
          </ButtonLink>
          <ButtonLink href={`tel:${contact.phoneHref}`} plain variant="outline" size="lg">
            {t('common.cta.callShop')}
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={80} className="w-full min-h-[28rem] lg:min-h-0">
        <MapPanel t={t} />
      </Reveal>
    </div>
  );
}

function ContactMapBlock({
  t,
  Heading,
  isThai,
  addressLines,
  onlineLinks,
}: {
  t: TFunction;
  Heading: 'h1' | 'h2';
  isThai: boolean;
  addressLines: readonly string[];
  onlineLinks: readonly { label: string; href: string; handle: string }[];
}) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 rounded-xl bg-gradient-to-br from-white to-paper p-2 shadow-lg md:p-5 lg:grid-cols-2">
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
          {t('visit.eyebrow')}
        </p>
        <Heading className="font-display text-display-md font-light text-balance">
          {t('visit.title')}
        </Heading>
        <p className="mt-6 max-w-md text-lede font-light text-graphite text-pretty">
          {t('visit.body')}
        </p>

        <dl className="mt-12 space-y-8 border-t border-ink/10 pt-8">
          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.address')}</dt>
            <dd>
              <address
                lang={isThai ? 'th' : undefined}
                className={`not-italic leading-loose text-graphite ${isThai ? 'font-thai' : ''}`}
              >
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.phone')}</dt>
            <dd>
              <a
                href={`tel:${contact.phoneHref}`}
                className="link-underline text-lg text-ink transition-colors hover:text-graphite"
              >
                {contact.phone}
              </a>
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.line')}</dt>
            <dd>
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-lg text-ink transition-colors hover:text-graphite"
              >
                {contact.line}
              </a>
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.hours')}</dt>
            <dd className="text-graphite">
              {openingHours.display.map((entry) => (
                <span key={entry.labelKey} className="flex flex-wrap gap-x-3">
                  <span className="min-w-[10rem]">{t(`common.hours.${entry.labelKey}`)}</span>
                  <span className="tabular-nums">{entry.hours}</span>
                </span>
              ))}
            </dd>
          </div>

          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{t('common.labels.social')}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {onlineLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-lg text-ink transition-colors hover:text-graphite"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex h-full flex-col gap-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[0.6875rem] font-medium uppercase tracking-widest2 text-stone transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <ContactMapPanel t={t} />
        </div>
      </Reveal>
    </div>
  );
}

function ContactMapPanel({ t }: { t: TFunction }) {
  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl shadow-sm ring-1 ring-ink/5">
      <StoreMap
        title={t('visit.mapTitle')}
        className="h-full min-h-[380px] w-full border-0"
      />
      <a
        href={address.mapsDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#1E88E5] shadow-lg ring-1 ring-ink/10 transition hover:bg-[#EAF4FF] [&>span]:sr-only"
      >
        <span aria-hidden="true">↗</span>
        {t('common.cta.getDirections')}
      </a>
    </div>
  );
}

/**
 * Google Maps embed. Until the real embed URL is pasted into
 * lib/site.ts → address.mapsEmbedUrl, a styled placeholder is shown
 * with the same dimensions, so no layout change is needed later.
 */
function MapPanel({ t }: { t: TFunction }) {
  if (address.mapsEmbedUrl) {
    return (
      <div className="h-full min-h-[28rem] w-full overflow-hidden border border-ink/10 bg-sand lg:min-h-full">
        <StoreMap
          title={t('visit.mapTitle')}
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <a
      href={address.mapsSearchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full min-h-[28rem] w-full flex-col items-center justify-center gap-4 border border-ink/10 bg-sand/60 text-center transition-colors duration-500 ease-editorial hover:bg-sand lg:min-h-full"
    >
      {/* Abstract street grid — replaced by the real embed later. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 267"
        className="absolute inset-0 h-full w-full text-ink/10"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0 90h400M0 178h400M120 0v267M256 0v267" stroke="currentColor" strokeWidth="1" />
        <path d="M0 30h400M330 0v267" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="188" cy="134" r="7" fill="currentColor" />
        <circle cx="188" cy="134" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      <span className="relative z-10 text-[0.6875rem] uppercase tracking-widest2 text-stone">
        {t('visit.mapLabel')}
      </span>
      <span className="link-underline relative z-10 text-sm font-medium text-ink">
        {t('common.cta.openShopLocation')}
      </span>
    </a>
  );
}
