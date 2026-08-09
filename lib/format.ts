import { localeConfig, type Locale } from '@/i18n/config';

/**
 * Date formatting. The time zone is pinned to UTC so the server and the
 * client always render the same string (no hydration mismatches).
 *
 * Thai dates use the Buddhist calendar, which is what Thai readers expect.
 */
const formatters: Record<Locale, Intl.DateTimeFormat> = {
  th: new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  en: new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }),
};

export function formatDate(iso: string, locale: Locale): string {
  const formatter = formatters[locale] ?? formatters.en;
  return formatter.format(new Date(`${iso}T00:00:00Z`));
}

/** Machine-readable value for <time dateTime="…">. */
export function isoDate(iso: string): string {
  return iso;
}

export { localeConfig };
