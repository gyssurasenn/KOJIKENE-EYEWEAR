import Link from 'next/link';
import { localePath, type Locale } from '@/i18n/config';
import type { BreadcrumbItem } from '@/types';

/**
 * Visible breadcrumb trail. Pair with breadcrumbSchema() from lib/jsonld
 * so the markup and the structured data always agree.
 */
export function Breadcrumb({
  items,
  locale,
  label,
  className = '',
}: {
  items: BreadcrumbItem[];
  locale: Locale;
  /** Translated accessible name for the nav landmark. */
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.6875rem] uppercase tracking-widest2 text-stone">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2.5">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={localePath(locale, item.href)}
                  className="link-underline transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-mist">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
