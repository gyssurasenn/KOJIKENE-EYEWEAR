'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

export type CarouselLabels = { previous: string; next: string; slide: string; page?: string };

export function EditorialSwiper({ children, label, labels, variant = 'frames' }: {
  children: ReactNode;
  label: string;
  labels: CarouselLabels;
  variant?: 'hero' | 'frames' | 'gallery' | 'journal' | 'detail' | 'products' | 'reviews' | 'discover';
}) {
  const slides = Children.toArray(children);
  const instance = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const [end, setEnd] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const single = variant === 'hero' || variant === 'detail';
  const products = variant === 'products';
  const grouped = variant === 'products' || variant === 'reviews';

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  function sync(swiper: SwiperInstance) {
    setActive(swiper.activeIndex);
    setEnd(swiper.isEnd);
    setPage(swiper.snapIndex);
    setPages(swiper.snapGrid.length);
  }

  return (
    <div className={`editorial-carousel carousel-${variant}`} data-ready={ready || undefined}
      role="region" aria-label={label} tabIndex={0}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key === 'ArrowRight') { event.preventDefault(); instance.current?.slideNext(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); instance.current?.slidePrev(); }
      }}>
      <Swiper modules={[EffectFade]} effect={single ? 'fade' : 'slide'} fadeEffect={{ crossFade: true }}
        speed={reduced ? 0 : 800} grabCursor watchSlidesProgress
        slidesPerView={single ? 1 : 'auto'} spaceBetween={single ? 0 : 24}
        noSwipingSelector={products ? '.product-gallery' : undefined}
        breakpoints={
          products ? { 640: { slidesPerGroup: 2 }, 1024: { slidesPerGroup: 4 } }
          : variant === 'reviews' ? { 0: { slidesPerGroup: 2 }, 768: { slidesPerGroup: 4 } }
          : undefined
        }
        onSwiper={(swiper) => { instance.current = swiper; setReady(true); sync(swiper); }}
        onSlideChange={sync} onResize={sync} onReachEnd={sync} onFromEdge={sync}>
        {slides.map((child, index) => (
          <SwiperSlide key={index} role="group" aria-label={`${labels.slide} ${index + 1} / ${slides.length}`}>
            <div className="slide-content" inert={single && ready && index !== active ? true : undefined}
              aria-hidden={single && ready && index !== active ? true : undefined}
              onFocusCapture={() => {
                if (single || !instance.current) return;
                const slide = instance.current.slides[index]?.getBoundingClientRect();
                const viewport = instance.current.el.getBoundingClientRect();
                if (slide && (slide.left < viewport.left - 1 || slide.right > viewport.right + 1)) instance.current.slideTo(index);
              }}>{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="carousel-controls">
        <button type="button" title={labels.previous} aria-label={labels.previous}
          disabled={!ready || active === 0} onClick={() => instance.current?.slidePrev()}>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <span className="carousel-count" aria-live="polite" aria-atomic="true">
          <span className="sr-only">{labels.page || labels.slide} </span>{String((grouped ? page : active) + 1).padStart(2, '0')}
          <span> / {String(grouped ? pages : slides.length).padStart(2, '0')}</span>
        </span>
        <span className="carousel-progress" aria-hidden="true"><span style={{ transform: `scaleX(${((grouped ? page : active) + 1) / (grouped ? pages : slides.length)})` }} /></span>
        <button type="button" title={labels.next} aria-label={labels.next}
          disabled={!ready || end} onClick={() => instance.current?.slideNext()}>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
