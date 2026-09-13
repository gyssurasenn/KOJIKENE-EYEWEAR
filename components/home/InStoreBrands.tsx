'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { inStoreBrands } from '@/lib/images';
import 'swiper/css';

export function InStoreBrands({ labels }: { labels: { title: string; pause: string; play: string; previous: string; next: string } }) {
  const instance = useRef<SwiperInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const swiper = instance.current;
    if (!swiper || swiper.destroyed) return;
    if (reduced || paused || hovered || focused) swiper.autoplay.stop();
    else swiper.autoplay.start();
  }, [ready, reduced, paused, hovered, focused]);

  return (
    <section className="brand-strip mt-20 bg-white py-8" aria-label={labels.title}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="shell">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-lg font-medium md:text-xl">{labels.title}</h3>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" title={labels.previous} aria-label={labels.previous} disabled={!ready}
              onClick={() => instance.current?.slidePrev()}><ArrowLeft size={18} aria-hidden="true" /></button>
            {!reduced && <button type="button" title={paused ? labels.play : labels.pause} aria-label={paused ? labels.play : labels.pause}
              onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>}
            <button type="button" title={labels.next} aria-label={labels.next} disabled={!ready}
              onClick={() => instance.current?.slideNext()}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <Swiper modules={[Autoplay, A11y]} slidesPerView="auto" loop speed={reduced ? 0 : 1200}
          autoplay={{ enabled: false, delay: 1500, disableOnInteraction: false }}
          onSwiper={swiper => { instance.current = swiper; setReady(true); }}>
          {inStoreBrands.map(brand => (
            <SwiperSlide key={brand.name}>
              <Image src={brand.src} alt={brand.alt} width={brand.width} height={brand.height} loading="eager"
                sizes="(min-width: 1024px) 320px, 240px" className="h-full w-full object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
