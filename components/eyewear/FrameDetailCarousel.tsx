import Image from 'next/image';
import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';

export async function FrameDetailCarousel({ locale, category }: { locale: Locale; category: 'fashion' | 'prescription' }) {
  const t = await getT(locale);
  const details = [
    { key: 'frame', image: category === 'fashion' ? images.fashionEyewear : images.prescriptionEyewear },
    { key: 'hinge', image: images.heroDetail },
    { key: 'lens', image: images.lensConsultation },
  ];
  return (
    <section className="shell py-section">
      <SectionHeading eyebrow={t('eyewear.details.eyebrow')} title={t('eyewear.details.title')} className="mb-12" />
      <EditorialSwiper variant="detail" label={t('eyewear.details.title')} labels={{
        previous: t('common.carousel.previous'), next: t('common.carousel.next'), slide: t('common.carousel.slide'),
      }}>
        {details.map(({ key, image }) => (
          <figure key={key} className="detail-figure">
            <div className="relative aspect-[16/10] overflow-hidden bg-bone sm:aspect-[2/1]">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1440px) 1328px, 100vw" className="object-contain" />
            </div>
            <figcaption className="pt-6">
              <h3 className="font-display text-2xl font-light">{t(`eyewear.details.${key}.title`)}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-graphite">{t(`eyewear.details.${key}.body`)}</p>
            </figcaption>
          </figure>
        ))}
      </EditorialSwiper>
    </section>
  );
}
