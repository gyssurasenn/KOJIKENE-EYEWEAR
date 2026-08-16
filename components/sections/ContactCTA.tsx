import type { Locale } from '@/i18n/config';

/** Which copy variant to use — keys under `contactCta.*`. */
export type ContactCtaVariant =
  | 'default'
  | 'fashion'
  | 'prescription'
  | 'services'
  | 'about'
  | 'blog';

/**
 * Closing band shown at the foot of most pages.
 * One job: move the reader from screen to shop.
 */
export async function ContactCTA({
  locale: _locale,
  variant: _variant = 'default',
  className: _className = '',
}: {
  locale: Locale;
  variant?: ContactCtaVariant;
  className?: string;
}) {
  return null;
}
