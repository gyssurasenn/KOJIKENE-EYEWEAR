'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Delay in ms, for gently staggering siblings. */
  delay?: number;
  className?: string;
  as?: ElementType;
  variant?: 'text' | 'image';
};

/**
 * Shared one-time text/image reveal with a visible server-rendered fallback.
 * Content renders visible if JS never runs, and the transition is
 * disabled entirely under prefers-reduced-motion (see globals.css).
 */
export function Reveal({ children, delay = 0, className, as: Tag = 'div', variant = 'text' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'idle' | 'pending' | 'shown'>('idle');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setState('shown');
      return;
    }

    // Do not hide content that was already visible in the server render.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState('shown');
      return;
    }

    setState('pending');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState('shown');
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={state === 'idle' ? undefined : state}
      data-reveal-kind={variant}
      onFocusCapture={() => setState('shown')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
