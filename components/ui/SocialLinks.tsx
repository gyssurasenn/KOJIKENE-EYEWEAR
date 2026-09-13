import Image from 'next/image';
import { socialLinks } from '@/lib/site';
import { socialIcons } from '@/lib/images';

type SocialLinksProps = {
  className?: string;
  /** "stacked" shows the handle beneath the label — used in the footer. */
  variant?: 'inline' | 'stacked' | 'icons';
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

  if (variant === 'icons') {
    return (
      <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
        {socialLinks
          .filter((social) => social.href)
          .map((social) => {
            const icon = socialIcons[social.label as keyof typeof socialIcons];

            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-ink/10 transition-transform duration-300 ease-editorial hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
                >
                  {icon ? (
                    <Image
                      src={icon.src}
                      alt=""
                      width={icon.width}
                      height={icon.height}
                      sizes="44px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[0.6875rem] font-bold uppercase">{social.label.slice(0, 2)}</span>
                  )}
                </a>
              </li>
            );
          })}
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
