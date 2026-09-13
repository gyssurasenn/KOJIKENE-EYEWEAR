import Image from 'next/image';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { getT } from '@/i18n/server';
import { getServices } from '@/lib/content';
import type { Locale } from '@/i18n/config';
import { images } from '@/lib/images';

export async function ServicesSection({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const services = getServices(t);

  return (
    <section className="border-y border-ink/10 bg-bone">
      <div className="shell py-section">
        <SectionHeading
          eyebrow={t('home.services.eyebrow')}
          title={t('home.services.title')}
          intro={t('home.services.intro')}
          action={
            <TextLink href="/services" locale={locale}>
              {t('common.cta.allServices')}
            </TextLink>
          }
          className="mb-16"
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 80} className="h-full">
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <ImageReveal className="mt-20">
          <figure className="relative aspect-[16/9] w-full overflow-hidden bg-sand md:aspect-[21/9]">
            <Image
              src={images.fitting.src}
              alt={images.fitting.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </figure>
          <figcaption className="mt-4 text-[0.8125rem] text-stone">
            {t('home.services.caption')}
          </figcaption>
        </ImageReveal>
      </div>
    </section>
  );
}
