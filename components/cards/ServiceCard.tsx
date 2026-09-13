import type { Service } from '@/types';

type ServiceCardProps = {
  service: Service;
  index: number;
  /** "full" shows the longer copy — used on the Services page. */
  variant?: 'compact' | 'full';
};

export function ServiceCard({ service, index, variant = 'compact' }: ServiceCardProps) {
  const number = String(index + 1).padStart(2, '0');
  const compact = variant === 'compact';

  return (
    <article
      className={`group relative flex h-full flex-col border-t border-ink/15 transition-colors duration-500 ease-editorial hover:border-ink/40 ${
        compact ? 'pt-4 sm:pt-6' : 'pt-6'
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[0.6875rem] uppercase tracking-widest2 text-mist">{number}</span>
        {service.duration ? (
          <span className="text-[0.6875rem] uppercase tracking-widest2 text-mist">
            {service.duration}
          </span>
        ) : null}
      </div>

      <h3
        className={
          compact
            ? 'mt-4 font-display text-base font-light leading-snug sm:mt-6 sm:text-xl md:text-2xl'
            : 'mt-6 font-display text-xl font-light md:text-2xl'
        }
      >
        {service.title}
      </h3>
      <p
        className={
          compact
            ? 'mt-2 text-xs leading-relaxed text-graphite sm:mt-3 sm:text-sm'
            : 'mt-3 text-sm leading-relaxed text-graphite'
        }
      >
        {service.summary}
      </p>

      {variant === 'full' ? (
        <p className="mt-5 border-t border-ink/10 pt-5 text-sm leading-relaxed text-stone">
          {service.detail}
        </p>
      ) : null}
    </article>
  );
}
