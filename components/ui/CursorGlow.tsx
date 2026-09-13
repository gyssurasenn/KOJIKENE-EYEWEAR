'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let frame = 0;
    let visible = false;
    let currentX = window.innerWidth / 3;
    let currentY = window.innerHeight / 3;
    let targetX = currentX;
    let targetY = currentY;

    const setVisible = (nextVisible: boolean) => {
      visible = nextVisible;
      glow.dataset.visible = nextVisible ? 'true' : 'false';
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) setVisible(true);
    };

    const handlePointerLeave = () => setVisible(false);

    frame = window.requestAnimationFrame(tick);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" data-visible="false" />;
}
