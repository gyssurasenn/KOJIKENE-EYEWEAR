import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { getT } from '@/i18n/server';
import { InStoreBrands } from '@/components/home/InStoreBrands';
import { getParagraphs } from '@/lib/content';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';

/**
 * Eye exam consultation, plus the in-store brand strip below it.
 */
export async function FamilyStory({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const paragraphs = getParagraphs(t, 'home.eyeExam.body');

  return (
    <section className="wallpaper2-section pt-section">
      <div className="shell grid items-center gap-12 pb-20 lg:grid-cols-2 lg:gap-20 lg:pb-28">
        <ImageReveal className="relative order-2 lg:order-1">
          <figure className="relative aspect-[4/3] w-full overflow-hidden bg-sand lg:aspect-[5/6]">
            <Image
              src={images.lensConsultation.src}
              alt={images.lensConsultation.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
        </ImageReveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
              {t('home.eyeExam.eyebrow')}
            </p>
            <h2 className="font-display text-display-md font-light text-balance">
              {t('home.eyeExam.title')}
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-graphite text-pretty">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <InStoreBrands labels={{ title: t('common.inStoreBrands.title') }} />
    </section>
  );
}
