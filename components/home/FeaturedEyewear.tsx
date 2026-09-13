import { ProductCarousel } from '@/components/eyewear/ProductCarousel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { frameStyles } from '@/content/eyewear';

export async function FeaturedEyewear({ locale }: { locale: Locale }) {
  const t = await getT(locale);

  return (
    <section id="curated-eyewear" className="border-t border-ink/10 bg-white">
      <div className="shell py-section">
        <SectionHeading
          eyebrow={t('home.featured.eyebrow')}
          title={t('home.featured.title')}
          intro={t('home.featured.intro')}
          action={
            <TextLink href="/eyewear" locale={locale}>
              {t('common.cta.seeFullRange')}
            </TextLink>
          }
          className="mb-12"
        />

        <Reveal className="mb-16 flex flex-wrap gap-x-6 gap-y-2 border-y border-ink/10 py-4">
          {frameStyles.map((style) => (
            <span
              key={style}
              className="text-[0.6875rem] uppercase tracking-widest2 text-stone after:ml-6 after:text-mist after:content-['·'] last:after:content-none"
            >
              {t(`eyewear.styles.${style}`)}
            </span>
          ))}
        </Reveal>

        <ProductCarousel locale={locale} />

        <Reveal className="mt-20 border-t border-ink/10 pt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-stone">{t('home.featured.note')}</p>
        </Reveal>
      </div>
    </section>
  );
}
