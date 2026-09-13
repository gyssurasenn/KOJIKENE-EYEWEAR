import { EyewearCategoryCard } from '@/components/cards/EyewearCategoryCard';
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
          className="mb-16 md:mb-20 "
        />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          {eyewearCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 90}>
              <EyewearCategoryCard
                category={category}
                locale={locale}
                index={String(index + 1).padStart(2, '0')}
                emphasis={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
