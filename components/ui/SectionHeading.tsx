import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Standfirst / supporting paragraph. */
  intro?: ReactNode;
  /** Heading level — pages have exactly one h1, sections use h2. */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  size?: 'lg' | 'md' | 'sm';
  action?: ReactNode;
  className?: string;
};

const sizeMap = {
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
} as const;

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = 'h2',
  align = 'left',
  size = 'md',
  action,
  className = '',
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-8 ${
        action ? 'md:flex-row md:items-end md:justify-between' : ''
      } ${isCentered ? 'items-center text-center' : ''} ${className}`}
    >
      <Reveal className={`max-w-3xl ${isCentered ? 'mx-auto' : ''}`}>
        {eyebrow ? (
          <p className="eyebrow mb-5 flex items-center gap-3">
            {!isCentered && <span aria-hidden="true" className="h-px w-8 bg-ink/25" />}
            {eyebrow}
          </p>
        ) : null}
        <Tag className={`font-display font-light text-balance ${sizeMap[size]}`}>{title}</Tag>
        {intro ? (
          <div className="mt-6 max-w-prose2 text-lede font-light text-graphite text-pretty">{intro}</div>
        ) : null}
      </Reveal>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
