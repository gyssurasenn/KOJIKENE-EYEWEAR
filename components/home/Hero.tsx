import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { getT } from '@/i18n/server';
import { getMeta } from '@/lib/content';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';
import { contact, site } from '@/lib/site';

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const slides = [
    { key: 'visit', image: images.hero, href: '/contact', cta: 'common.cta.visitStore' },
    { key: 'fashion', image: images.fashionEyewear, href: '/eyewear/fashion', cta: 'common.nav.fashion' },
    { key: 'prescription', image: images.prescriptionEyewear, href: '/eyewear/prescription', cta: 'common.nav.prescription' },
  ];

  return (
    <section className="border-b border-ink/10 bg-white">
      <EditorialSwiper variant="hero" label={site.name} labels={{
        previous: t('common.carousel.previous'), next: t('common.carousel.next'), slide: t('common.carousel.slide'),
      }}>
        {slides.map((slide, index) => {
          const Heading = index === 0 ? 'h1' : 'h2';
          return (
            <div className="hero-scene" key={slide.key}>
              <Image src={slide.image.src} alt={slide.image.alt} fill priority={index === 0}
                sizes="100vw" className="hero-image" />
              <div className="hero-copy shell">
                <p className="hero-label">{t(`home.slides.${slide.key}.label`)}</p>
                <Heading className="font-display hero-heading">
                  <span className="hero-brand">{site.name}</span>
                  <span className="hero-title">{t(`home.slides.${slide.key}.title`)}</span>
                </Heading>
                <p className="hero-body">{t(`home.slides.${slide.key}.body`)}</p>
                <div className="hero-actions">
                  <ButtonLink href={slide.href} locale={locale}>{t(slide.cta)}</ButtonLink>
                  <ButtonLink href={contact.lineUrl} external variant="outline">{t('common.cta.line')}</ButtonLink>
                </div>
              </div>
            </div>
          );
        })}
      </EditorialSwiper>
      <div className="shell hero-intro">
        <div><h2 className="font-display text-xl">{t('home.hero.title')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite">{t('home.hero.body')}</p></div>
        <dl className="grid grid-cols-3 gap-3 sm:gap-5">
          {getMeta(t, 'home.storyPoints').slice(0, 3).map((point) => (
            <div key={point.label}>
              <dt className="text-[0.6875rem] text-graphite sm:text-xs">{point.label}</dt>
              <dd className="mt-2 text-xs leading-snug sm:text-sm">{point.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
