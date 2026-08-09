import Image from 'next/image';
import Link from 'next/link';
import { getT } from '@/i18n/server';
import { localePath, type Locale } from '@/i18n/config';
import { formatDate } from '@/lib/format';
import type { Article } from '@/types';

type BlogCardProps = {
  article: Article;
  locale: Locale;
  /** "feature" is the large lead card at the top of the Journal. */
  variant?: 'feature' | 'default' | 'list';
  priority?: boolean;
};

export async function BlogCard({
  article,
  locale,
  variant = 'default',
  priority = false,
}: BlogCardProps) {
  const t = await getT(locale);
  const href = localePath(locale, `/blog/${article.slug}`);
  const category = t(`blog.categories.${article.category}`);
  const readingTime = t('common.labels.minRead', { count: article.readingMinutes });

  if (variant === 'list') {
    return (
      <article className="group border-t border-ink/10 py-7">
        <Link href={href} className="grid gap-4 sm:grid-cols-[7rem_1fr] sm:gap-8">
          <p className="text-[0.6875rem] uppercase tracking-widest2 text-stone">{category}</p>
          <div>
            <h3 className="font-display text-xl font-light text-balance md:text-2xl">
              <span className="link-underline">{article.title}</span>
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-graphite">{article.excerpt}</p>
            <p className="mt-4 text-[0.6875rem] uppercase tracking-widest2 text-mist">
              <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
              <span className="mx-2">·</span>
              {readingTime}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  const isFeature = variant === 'feature';

  return (
    <article className="group h-full">
      <Link href={href} className="flex h-full flex-col">
        <div
          className={`media-zoom relative w-full overflow-hidden bg-sand ${
            isFeature ? 'aspect-[16/10]' : 'aspect-[3/2]'
          }`}
        >
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            priority={priority}
            sizes={
              isFeature
                ? '(min-width: 1024px) 66vw, 100vw'
                : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
            }
            className="object-cover"
          />
        </div>

        <div className={`flex flex-1 flex-col ${isFeature ? 'mt-8' : 'mt-6'}`}>
          <p className="text-[0.6875rem] uppercase tracking-widest2 text-stone">
            {category}
            <span className="mx-2 text-mist">·</span>
            <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
          </p>

          <h3
            className={`mt-4 font-display font-light text-balance ${
              isFeature ? 'text-display-sm' : 'text-xl md:text-[1.375rem]'
            }`}
          >
            <span className="link-underline">{article.title}</span>
          </h3>

          <p
            className={`mt-3 leading-relaxed text-graphite text-pretty ${
              isFeature ? 'max-w-xl text-base' : 'text-sm'
            }`}
          >
            {article.excerpt}
          </p>

          <p className="mt-5 text-[0.6875rem] uppercase tracking-widest2 text-mist">{readingTime}</p>
        </div>
      </Link>
    </article>
  );
}
