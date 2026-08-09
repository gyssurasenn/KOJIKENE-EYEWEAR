'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Delay in ms, for gently staggering siblings. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * A single, restrained scroll animation: fade + 16px rise, once.
 * Content renders visible if JS never runs, and the transition is
 * disabled entirely under prefers-reduced-motion (see globals.css).
 */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
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

    // Already in view on first paint — animate in immediately.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState('pending');
      const raf = requestAnimationFrame(() => setState('shown'));
      // Frame callbacks are starved in background tabs. Content must never
      // be left invisible, so reveal regardless shortly afterwards.
      const failsafe = window.setTimeout(() => setState('shown'), 1200);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(failsafe);
      };
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
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
