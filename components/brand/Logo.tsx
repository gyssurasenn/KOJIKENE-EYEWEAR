import Link from 'next/link';
import Image from 'next/image';
import { images } from '@/lib/images';
import { localePath, type Locale } from '@/i18n/config';
import { site } from '@/lib/site';

/**
 * Typographic wordmark with a minimal optical mark.
 * Drawn inline so it stays crisp at any size and inherits colour.
 * Replace with the client's logo file when it arrives — keep the
 * same outer dimensions so the header spacing does not shift.
 *
 * The wordmark itself is latin in both languages, by design.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 24" fill="none" aria-hidden="true" className={className} focusable="false">
      <circle cx="16" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="48" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M26.25 11.2c1.6-1.4 4-2.1 5.75-2.1s4.15.7 5.75 2.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M5.75 12H0.9M63.1 12h-4.85" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({
  className = '',
  descriptor,
}: {
  className?: string;
  /** Translated descriptor line — omit to hide it. */
  descriptor?: string;
}) {
  return (
    <span className={`flex flex-col ${className}`}>
      <span className={`brand-logo ${descriptor ? 'brand-logo-full' : ''}`}>
        <Image src={images.logo.src} alt={images.logo.alt} width={2000} height={2000} sizes="320px" className="brand-logo-image" />
      </span>
      {descriptor ? (
        <span className="mt-2 text-[0.6875rem] uppercase tracking-widest2 text-stone">
          {descriptor}
        </span>
      ) : null}
    </span>
  );
}

export function LogoLink({
  locale,
  className = '',
  onNavigate,
}: {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={localePath(locale, '/')}
      onClick={onNavigate}
      aria-label={`${site.name} — home`}
      className={`inline-flex items-baseline gap-3 ${className}`}
    >
      <Wordmark className="text-[0.95rem] sm:text-base" />
    </Link>
  );
}
