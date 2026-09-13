import Image from 'next/image';
import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/Button';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';

export async function StoreGallery({ locale, context = 'home' }: { locale: Locale; context?: 'home' | 'about' }) {
  const t = await getT(locale);
  const moments = [
    { image: images.storeExterior, key: 'exterior' },
    { image: images.storeInterior, key: 'interior' },
    { image: images.wallTexture, key: 'wall' },
    { image: images.fitting, key: 'fitting' },
  ];
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="shell py-section">
        <SectionHeading eyebrow={t('home.gallery.eyebrow')} title={t('home.gallery.title')}
          action={<TextLink href="/contact" locale={locale}>{t('common.cta.visitStore')}</TextLink>}
          className="mb-12" />
        <EditorialSwiper variant="gallery" label={t('home.gallery.title')} labels={{
          previous: t('common.carousel.previous'), next: t('common.carousel.next'), slide: t('common.carousel.slide'),
        }}>
          {moments.map(({ image, key }) => (
            <figure className={`gallery-moment gallery-${key} group`} key={key}>
              <div className="relative media-zoom overflow-hidden bg-bone">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 80vw" className="object-cover" />
              </div>
              <figcaption className="mt-5 text-sm text-graphite">
                {context === 'about' && (key === 'exterior' || key === 'interior') ? (
                  <><span className="sr-only">{t(key === 'exterior' ? 'about.figcaptionExterior' : 'about.figcaptionInterior')} </span>
                    {t(key === 'exterior' ? 'about.captionExterior' : 'about.captionInterior')}</>
                ) : t(`home.gallery.${key}`)}
              </figcaption>
            </figure>
          ))}
        </EditorialSwiper>
      </div>
    </section>
  );
}
