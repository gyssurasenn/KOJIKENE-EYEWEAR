import Link from 'next/link';
import type { ReactNode } from 'react';
import { localePath, type Locale } from '@/i18n/config';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

type ButtonLinkProps = {
  /** Unprefixed internal path, or a full URL when `external`. */
  href: string;
  /** Required for internal links so the locale prefix can be applied. */
  locale?: Locale;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders a plain <a> with the right rel/target. */
  external?: boolean;
  /** For tel: and mailto: — a plain <a>, but same tab. */
  plain?: boolean;
  'aria-label'?: string;
};

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 font-medium uppercase tracking-widest2 text-[0.6875rem] transition-colors duration-500 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

const variants: Record<Variant, string> = {
  solid: 'bg-brand text-ink hover:bg-brand-hover',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:text-stone',
};

const sizes: Record<Size, string> = {
  // Comfortable tap targets on mobile — never below 44px tall.
  md: 'min-h-[2.875rem] px-6 py-3',
  lg: 'min-h-[3.25rem] px-8 py-4',
};

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block translate-x-0 transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1"
    >
      →
    </span>
  );
}

export function ButtonLink({
  href,
  locale,
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  external = false,
  plain = false,
  ...rest
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${variant === 'ghost' ? '' : sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        <Arrow />
      </a>
    );
  }

  if (plain) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
        <Arrow />
      </a>
    );
  }

  return (
    <Link href={locale ? localePath(locale, href) : href} className={classes} {...rest}>
      {children}
      <Arrow />
    </Link>
  );
}

/** Quiet text link with an underline that draws in on hover. */
export function TextLink({
  href,
  locale,
  children,
  className = '',
  external = false,
}: {
  href: string;
  locale?: Locale;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = `link-underline text-eyebrow font-medium uppercase tracking-widest2 ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={locale ? localePath(locale, href) : href} className={classes}>
      {children}
    </Link>
  );
}
