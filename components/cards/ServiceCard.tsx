import type { Service } from '@/types';

type ServiceCardProps = {
  service: Service;
  index: number;
  /** "full" shows the longer copy — used on the Services page. */
  variant?: 'compact' | 'full';
};

export function ServiceCard({ service, index, variant = 'compact' }: ServiceCardProps) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="group relative flex h-full flex-col border-t border-ink/15 pt-6 transition-colors duration-500 ease-editorial hover:border-ink/40">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[0.6875rem] uppercase tracking-widest2 text-mist">{number}</span>
        {service.duration ? (
          <span className="text-[0.6875rem] uppercase tracking-widest2 text-mist">
            {service.duration}
          </span>
        ) : null}
      </div>

      <h3 className="mt-6 font-display text-xl font-light md:text-2xl">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-graphite">{service.summary}</p>

      {variant === 'full' ? (
        <p className="mt-5 border-t border-ink/10 pt-5 text-sm leading-relaxed text-stone">
          {service.detail}
        </p>
      ) : null}
    </article>
  );
}
