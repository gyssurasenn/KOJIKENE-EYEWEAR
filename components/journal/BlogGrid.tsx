import { BlogCard } from '@/components/cards/BlogCard';
import { Reveal } from '@/components/ui/Reveal';
import type { Locale } from '@/i18n/config';
import type { Article } from '@/types';

type BlogGridProps = {
  articles: Article[];
  locale: Locale;
  /** Renders the first article as a large lead card. */
  featureFirst?: boolean;
  columns?: 2 | 3;
  className?: string;
};

export function BlogGrid({
  articles,
  locale,
  featureFirst = false,
  columns = 3,
  className = '',
}: BlogGridProps) {
  if (articles.length === 0) return null;

  const lead = featureFirst ? articles[0] : null;
  const rest = featureFirst ? articles.slice(1) : articles;
  const gridCols = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={className}>
      {lead ? (
        <Reveal className="mb-16 border-b border-ink/10 pb-16">
          <div className="lg:max-w-4xl">
            <BlogCard article={lead} locale={locale} variant="feature" priority />
          </div>
        </Reveal>
      ) : null}

      <div className={`grid gap-x-8 gap-y-14 ${gridCols}`}>
        {rest.map((article, index) => (
          <Reveal key={article.slug} delay={(index % 3) * 80} className="h-full">
            <BlogCard article={article} locale={locale} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
