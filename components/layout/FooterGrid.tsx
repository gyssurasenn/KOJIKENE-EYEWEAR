'use client';

import type { ReactNode } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

export function FooterGrid({ children, map }: { children: ReactNode; map: ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const showMap = segment !== 'contact';

  return (
    <div className={`grid gap-10 md:grid-cols-2 lg:gap-12 ${showMap ? 'lg:grid-cols-[0.9fr_1fr_1.2fr]' : ''}`}>
      {children}
      {showMap && <div className="min-w-0 md:col-span-2 lg:col-span-1" data-footer-map>{map}</div>}
    </div>
  );
}
