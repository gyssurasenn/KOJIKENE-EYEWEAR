import { BlogCard } from '@/components/cards/BlogCard';
import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextLink } from '@/components/ui/Button';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { getSortedArticles } from '@/content/blog';

export async function JournalSection({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const latest = getSortedArticles(locale).slice(0, 4);

  return (
    <section className="shell py-section">
      <SectionHeading
        eyebrow={t('home.journal.eyebrow')}
        title={t('home.journal.title')}
        intro={t('home.journal.subtitle')}
        action={
          <TextLink href="/blog" locale={locale}>
            {t('common.cta.readJournal')}
          </TextLink>
        }
        className="mb-16"
      />
      <EditorialSwiper variant="journal" label={t('home.journal.title')} labels={{
        previous: t('common.carousel.previous'), next: t('common.carousel.next'), slide: t('common.carousel.slide'),
      }}>
        {latest.map(article => <BlogCard key={article.slug} article={article} locale={locale} />)}
      </EditorialSwiper>
    </section>
  );
}
