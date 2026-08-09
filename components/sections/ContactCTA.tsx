import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';
import { address, contact } from '@/lib/site';

/** Which copy variant to use — keys under `contactCta.*`. */
export type ContactCtaVariant =
  | 'default'
  | 'fashion'
  | 'prescription'
  | 'services'
  | 'about'
  | 'blog';

/**
 * Closing band shown at the foot of most pages.
 * One job: move the reader from screen to shop.
 */
export async function ContactCTA({
  locale,
  variant = 'default',
  className = '',
}: {
  locale: Locale;
  variant?: ContactCtaVariant;
  className?: string;
}) {
  const t = await getT(locale);
  const isThai = locale === 'th';
  const addressLines = (isThai ? address.lines : address.linesEn).slice(0, 3);

  return (
    <section className={`relative isolate overflow-hidden bg-ink text-paper ${className}`}>
      <div className="absolute inset-0 -z-10 opacity-[0.22]">
        <Image
          src={images.storeInterior.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-eyebrow font-medium uppercase tracking-widest2 text-paper/60">
              <span aria-hidden="true" className="h-px w-8 bg-paper/30" />
              {t('contactCta.eyebrow')}
            </p>
            <h2 className="font-display text-display-lg font-light text-balance">
              {t(`contactCta.${variant}.title`)}
            </h2>
            <p className="mt-7 max-w-xl text-lede font-light text-paper/70 text-pretty">
              {t(`contactCta.${variant}.body`)}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={address.mapsDirectionsUrl}
                external
                size="lg"
                className="bg-paper text-ink hover:bg-sand"
              >
                {t('common.cta.getDirections')}
              </ButtonLink>
              <ButtonLink
                href="/contact"
                locale={locale}
                variant="outline"
                size="lg"
                className="border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
              >
                {t('common.cta.visitStore')}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <dl className="space-y-6 border-t border-paper/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <dt className="text-eyebrow uppercase tracking-widest2 text-paper/50">
                  {t('common.labels.address')}
                </dt>
                <dd
                  lang={isThai ? 'th' : undefined}
                  className={`mt-2 leading-loose text-paper/85 ${isThai ? 'font-thai' : ''}`}
                >
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase tracking-widest2 text-paper/50">
                  {t('common.labels.phone')}
                </dt>
                <dd className="mt-2">
                  <a href={`tel:${contact.phoneHref}`} className="link-underline text-paper/85">
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase tracking-widest2 text-paper/50">
                  {t('common.labels.line')}
                </dt>
                <dd className="mt-2">
                  <a
                    href={contact.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-paper/85"
                  >
                    {contact.line}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
