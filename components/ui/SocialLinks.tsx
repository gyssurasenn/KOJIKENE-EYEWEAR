import { socialLinks } from '@/lib/site';

type SocialLinksProps = {
  className?: string;
  /** "stacked" shows the handle beneath the label — used in the footer. */
  variant?: 'inline' | 'stacked';
  /** Translated fallback for accounts that do not exist yet. */
  comingSoonLabel?: string;
};

export function SocialLinks({
  className = '',
  variant = 'inline',
  comingSoonLabel = '',
}: SocialLinksProps) {
  if (variant === 'stacked') {
    return (
      <ul className={`space-y-4 ${className}`}>
        {socialLinks.map((social) => (
          <li key={social.label}>
            <p className="eyebrow mb-1">{social.label}</p>
            {social.href ? (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm text-graphite transition-colors hover:text-ink"
              >
                {social.handle}
              </a>
            ) : (
              <span className="text-sm text-mist">{comingSoonLabel}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {socialLinks
        .filter((social) => social.href)
        .map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.6875rem] font-medium uppercase tracking-widest2 text-stone transition-colors hover:text-ink"
            >
              {social.label}
            </a>
          </li>
        ))}
    </ul>
  );
}
