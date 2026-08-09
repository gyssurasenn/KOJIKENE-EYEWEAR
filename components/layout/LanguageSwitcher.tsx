'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LOCALE_COOKIE,
  localeConfig,
  localePath,
  locales,
  stripLocale,
  type Locale,
} from '@/i18n/config';

/**
 * TH / EN toggle. Each option is a real link to the same page in the
 * other language, so it works without JavaScript and crawlers can follow
 * it. The click additionally remembers the choice for the next visit.
 */
export function LanguageSwitcher({
  current,
  className = '',
  label,
}: {
  current: Locale;
  className?: string;
  /** Translated accessible name, e.g. "Language". */
  label: string;
}) {
  const pathname = usePathname();
  const basePath = stripLocale(pathname ?? '/');

  const remember = (locale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div
      className={`flex items-center gap-1 text-[0.6875rem] uppercase tracking-widest2 ${className}`}
      role="group"
      aria-label={label}
    >
      {locales.map((locale, index) => {
        const isCurrent = locale === current;
        return (
          <span key={locale} className="flex items-center gap-1">
            {index > 0 ? (
              <span aria-hidden="true" className="text-mist">
                /
              </span>
            ) : null}
            <Link
              href={localePath(locale, basePath)}
              hrefLang={localeConfig[locale].hreflang}
              onClick={() => remember(locale)}
              aria-current={isCurrent ? 'true' : undefined}
              className={`transition-colors duration-300 ${
                isCurrent ? 'text-ink' : 'text-stone hover:text-ink'
              }`}
            >
              <span className="sr-only">{localeConfig[locale].native}</span>
              <span aria-hidden="true">{localeConfig[locale].short}</span>
            </Link>
          </span>
        );
      })}
    </div>
  );
}
