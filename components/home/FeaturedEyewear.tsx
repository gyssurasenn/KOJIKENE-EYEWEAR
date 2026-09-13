import { ProductCarousel } from '@/components/eyewear/ProductCarousel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';

export async function FeaturedEyewear({ locale }: { locale: Locale }) {
  const t = await getT(locale);

  return (
    <section id="curated-eyewear" className="border-t border-ink/10 bg-white">
      <div className="shell py-section">
        <SectionHeading
          eyebrow={t('home.featured.eyebrow')}
          title={t('home.featured.title')}
          intro={t('home.featured.intro')}
          className="mb-12"
        />

        <ProductCarousel locale={locale} />

        {/* <Reveal className="mt-20 border-t border-ink/10 pt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-stone">{t('home.featured.note')}</p>
        </Reveal> */}
      </div>
    </section>
  );
}
