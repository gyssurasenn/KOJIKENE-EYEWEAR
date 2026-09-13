import Image from 'next/image';
import { Star } from 'lucide-react';
import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getT, tObjects } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { reviewPhotos } from '@/lib/images';

type ReviewItem = {
  title: string;
  quote: string;
  name: string;
};

export async function ReviewsSection({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const reviews = tObjects<ReviewItem>(t, 'home.reviews.items');
  const photos = [reviewPhotos.tryFrames, reviewPhotos.lensAdvice, reviewPhotos.frameFitting];

  return (
    <section className="bg-white border-b border-ink/10">
      <div className="shell py-section">
        <SectionHeading
          eyebrow={t('home.reviews.eyebrow')}
          title={t('home.reviews.title')}
          intro={t('home.reviews.intro')}
          className="mb-14"
        />

        <Reveal>
          <EditorialSwiper
            variant="reviews"
            label={t('home.reviews.title')}
            labels={{
              previous: t('common.carousel.previous'),
              next: t('common.carousel.next'),
              slide: t('common.carousel.slide'),
            }}
          >
            {reviews.map((review, index) => {
              const photo = photos[index % photos.length];

              return (
                <article
                  key={review.title}
                  className="flex h-full flex-col overflow-hidden border border-ink/10 bg-white"
                >
                  <figure className="relative aspect-[4/3] bg-bone">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 45vw"
                      className="object-cover"
                    />
                  </figure>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="mb-4 flex gap-1 text-brand" aria-label={t('home.reviews.rating')}>
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} size={14} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
                        ))}
                      </div>
                      <h3 className="font-display text-lg font-light leading-snug text-balance">
                        {review.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-graphite text-pretty">
                        {review.quote}
                      </p>
                    </div>

                    <p className="mt-6 text-sm font-bold text-ink">{review.name}</p>
                  </div>
                </article>
              );
            })}
          </EditorialSwiper>
        </Reveal>

        <Reveal className="mt-8 max-w-2xl text-sm leading-relaxed text-stone">
          {t('home.reviews.note')}
        </Reveal>
      </div>
    </section>
  );
}
