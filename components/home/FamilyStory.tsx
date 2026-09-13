import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { TextLink } from '@/components/ui/Button';
import { getT } from '@/i18n/server';
import { InStoreBrands } from '@/components/home/InStoreBrands';
import { getParagraphs } from '@/lib/content';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';

/**
 * In-store consultation and fitting, using the existing translation keys.
 */
export async function FamilyStory({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const paragraphs = getParagraphs(t, 'home.family.body');

  return (
    <section className="wallpaper2-section pt-section">
      <div className="shell grid items-center gap-12 pb-20 lg:grid-cols-2 lg:gap-20 lg:pb-28">
        <ImageReveal className="relative order-2 lg:order-1">
          <figure className="relative aspect-[4/3] w-full overflow-hidden bg-sand lg:aspect-[5/6]">
            <Image
              src={images.family.src}
              alt={images.family.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
          <figure className="absolute -bottom-10 -right-4 hidden aspect-[3/2] w-52 overflow-hidden border-8 border-paper bg-sand lg:block">
            <Image
              src={images.storeInterior.src}
              alt={images.storeInterior.alt}
              fill
              sizes="13rem"
              className="object-cover"
            />
          </figure>
        </ImageReveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
              {t('home.family.eyebrow')}
            </p>
            <h2 className="font-display text-display-md font-light text-balance">
              {t('home.family.title')}
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-graphite text-pretty">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-ink/25 pl-6">
              <p className="font-display text-xl font-light leading-snug text-balance md:text-2xl">
                “{t('home.family.pullQuote')}”
              </p>
            </blockquote>

            <div className="mt-10">
              <TextLink href="/about" locale={locale}>
                {t('common.cta.readStory')}
              </TextLink>
            </div>
          </Reveal>
        </div>
      </div>
      <InStoreBrands labels={{ title: t('common.inStoreBrands.title') }} />
    </section>
  );
}
