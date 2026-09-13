import { EyewearCategoryCard } from '@/components/cards/EyewearCategoryCard';
import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { eyewearCategories } from '@/content/eyewear';

export async function DiscoverFrame({ locale }: { locale: Locale }) {
  const t = await getT(locale);

  return (
    <section className="wallpaper-section">
      <div className="shell py-section">
        <SectionHeading
          eyebrow={t('home.discover.eyebrow')}
          title={t('home.discover.title')}
          intro={t('home.discover.intro')}
          action={
            <TextLink href="/eyewear" locale={locale}>
              {t('common.cta.allEyewear')}
            </TextLink>
          }
          className="mb-10 md:mb-16"
        />

        <Reveal>
          <EditorialSwiper
            variant="discover"
            label={t('home.discover.title')}
            labels={{
              previous: t('common.carousel.previous'),
              next: t('common.carousel.next'),
              slide: t('common.carousel.slide'),
            }}
          >
            {eyewearCategories.map((category, index) => (
              <EyewearCategoryCard
                key={category.slug}
                category={category}
                locale={locale}
                index={String(index + 1).padStart(2, '0')}
                compact
              />
            ))}
          </EditorialSwiper>
        </Reveal>
      </div>
    </section>
  );
}
