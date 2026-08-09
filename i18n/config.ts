/**
 * ─────────────────────────────────────────────────────────────
 *  LOCALE CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Thai is the default and is served without a prefix:
 *
 *      /                →  Thai
 *      /eyewear         →  Thai
 *      /en              →  English
 *      /en/eyewear      →  English
 *
 *  middleware.ts rewrites unprefixed paths to /th internally, so both
 *  languages are statically generated and separately indexable.
 * ─────────────────────────────────────────────────────────────
 */

export const locales = ['th', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'th';

/** Cookie written by the language switcher; read by middleware. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const localeConfig: Record<
  Locale,
  {
    /** Name in its own language, for the switcher. */
    native: string;
    /** Short label used in the header toggle. */
    short: string;
    /** <html lang> value. */
    htmlLang: string;
    /** hreflang value. */
    hreflang: string;
    /** Open Graph locale. */
    ogLocale: string;
    /** Intl locale for date formatting. */
    dateLocale: string;
  }
> = {
  th: {
    native: 'ไทย',
    short: 'TH',
    htmlLang: 'th',
    hreflang: 'th-TH',
    ogLocale: 'th_TH',
    dateLocale: 'th-TH',
  },
  en: {
    native: 'English',
    short: 'EN',
    htmlLang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    dateLocale: 'en-GB',
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/**
 * Turns an internal path into the public path for a locale.
 *   localePath('th', '/eyewear') → '/eyewear'
 *   localePath('en', '/eyewear') → '/en/eyewear'
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return locale === defaultLocale ? clean || '/' : `/${locale}${clean}`;
}

/** Strips a locale prefix from a public path. '/en/eyewear' → '/eyewear' */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first)) {
    const remainder = rest.join('/');
    return remainder ? `/${remainder}` : '/';
  }
  return pathname || '/';
}

/** The locale a public path resolves to. */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/')[1];
  return isLocale(first) ? first : defaultLocale;
}
