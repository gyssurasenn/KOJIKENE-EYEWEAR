import Image from 'next/image';
import Link from 'next/link';
import { getT, tList } from '@/i18n/server';
import { localePath, type Locale } from '@/i18n/config';
import type { EyewearCategoryDef } from '@/content/eyewear';

type EyewearCategoryCardProps = {
  category: EyewearCategoryDef;
  locale: Locale;
  /** "01", "02" — editorial numbering. */
  index?: string;
  priority?: boolean;
  /** Taller crop for the lead card in a two-up layout. */
  emphasis?: boolean;
};

/**
 * A fashion-editorial card: image first, type below, no price,
 * no "add to basket". The whole card is one link.
 */
export async function EyewearCategoryCard({
  category,
  locale,
  index,
  priority = false,
  emphasis = false,
}: EyewearCategoryCardProps) {
  const t = await getT(locale);
  const base = `eyewear.categories.${category.slug}`;
  const highlights = tList(t, `${base}.highlights`);

  return (
    <article className="group">
      <Link href={localePath(locale, category.href)} className="block focus-visible:outline-none">
        <div
          className={`media-zoom relative w-full overflow-hidden bg-sand ${
            emphasis ? 'aspect-[4/5]' : 'aspect-[4/5] lg:aspect-[3/4]'
          }`}
        >
          <Image
            src={category.image.src}
            alt={category.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw"
            className="object-cover"
            style={category.image.position ? { objectPosition: category.image.position } : undefined}
          />
          {index ? (
            <span className="absolute left-5 top-5 text-[0.6875rem] uppercase tracking-widest2 text-paper mix-blend-difference">
              {index}
            </span>
          ) : null}
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-lg">
            <h3 className="font-display text-display-sm font-light">
              <span className="link-underline">{t(`${base}.title`)}</span>
            </h3>
            <p className="mt-3 text-lg font-light text-graphite text-pretty">
              {t(`${base}.tagline`)}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
              {t(`${base}.description`)}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 shrink-0 text-[0.6875rem] uppercase tracking-widest2 text-stone transition-transform duration-500 ease-editorial group-hover:translate-x-1"
          >
            {t('common.cta.view')} →
          </span>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 border-t border-ink/10 pt-5">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="text-[0.6875rem] uppercase tracking-widest2 text-stone after:ml-3 after:text-mist after:content-['·'] last:after:content-none"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
