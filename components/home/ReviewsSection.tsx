import Image from 'next/image';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getT, tObjects } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { reviewPhotos } from '@/lib/images';

type ReviewItem = {
  title: string;
  quote: string;
  meta: string;
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

        <div className="grid gap-px bg-ink/10 md:grid-cols-3">
          {reviews.map((review, index) => {
            const photo = photos[index % photos.length];

            return (
              <Reveal
                as="article"
                key={review.title}
                delay={index * 80}
                className="flex min-h-[27rem] flex-col justify-between bg-white p-5 md:p-6"
              >
                <div>
                  <figure className="relative mb-7 aspect-[4/3] overflow-hidden bg-bone">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 90vw"
                      className="object-cover"
                    />
                  </figure>

                  <div className="mb-6 flex gap-1 text-brand" aria-label={t('home.reviews.rating')}>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={16} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
                    ))}
                  </div>
                  <h3 className="font-display text-2xl font-light leading-snug text-balance">{review.title}</h3>
                  <p className="mt-5 leading-relaxed text-graphite text-pretty">{review.quote}</p>
                </div>

                <p className="mt-10 border-t border-ink/10 pt-5 text-xs uppercase tracking-widest2 text-stone">
                  {review.meta}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 max-w-2xl text-sm leading-relaxed text-stone">
          {t('home.reviews.note')}
        </Reveal>
      </div>
    </section>
  );
}
