import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

export function ImageReveal({ children, className, delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <Reveal variant="image" delay={delay} className={className}>{children}</Reveal>;
}
