import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { getT } from '@/i18n/server';
import { getMeta } from '@/lib/content';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';
import { site } from '@/lib/site';

/**
 * Editorial hero: type on one side, a large portrait image on the other,
 * with a small detail still overlapping. Mobile keeps the same order —
 * headline, image, actions — so the promise is read before the picture.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const storyPoints = getMeta(t, 'home.storyPoints').slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
      <div className="shell">
        <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24 xl:gap-24">
          {/* Type */}
          <div className="order-1 max-w-2xl">
            <p className="eyebrow flex items-center gap-3 animate-fade-in">
              <span aria-hidden="true" className="h-px w-10 bg-ink/30" />
              {t('common.brand.descriptor')}
            </p>

            <h1 className="mt-8 font-display font-light text-balance">
              <span className="block text-eyebrow font-medium uppercase tracking-widest3 text-stone">
                {site.name}
              </span>
              <span className="mt-6 block text-display-xl">{t('home.hero.title')}</span>
            </h1>

            <p className="mt-8 max-w-lg text-lede font-light text-graphite text-pretty">
              {t('home.hero.body')}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/eyewear" locale={locale} size="lg">
                {t('common.cta.exploreEyewear')}
              </ButtonLink>
              <ButtonLink href="/contact" locale={locale} variant="outline" size="lg">
                {t('common.cta.visitStore')}
              </ButtonLink>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {storyPoints.map((point) => (
                <div key={point.label}>
                  <dt className="eyebrow">{point.label}</dt>
                  <dd className="mt-2 text-sm text-graphite">{point.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Image */}
          <div className="relative order-2 lg:order-2">
            <figure className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 80vw, 100vw"
                className="object-cover"
                style={images.hero.position ? { objectPosition: images.hero.position } : undefined}
              />
            </figure>

            {/* Detail still — hidden on the smallest screens to keep the hero light. */}
            <figure className="absolute -bottom-8 -left-6 hidden aspect-square w-40 overflow-hidden border-8 border-paper bg-sand sm:block lg:w-48">
              <Image
                src={images.heroDetail.src}
                alt={images.heroDetail.alt}
                fill
                sizes="12rem"
                className="object-cover"
              />
            </figure>

            <p
              aria-hidden="true"
              className="absolute -right-14 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.6875rem] uppercase tracking-widest3 text-mist xl:block"
            >
              {t('home.hero.location')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
