'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { inStoreBrands } from '@/lib/images';
import 'swiper/css';

export function InStoreBrands({ labels }: { labels: { title: string } }) {
  const instance = useRef<SwiperInstance | null>(null);
  const [reduced, setReduced] = useState(true);

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
    if (reduced) swiper.autoplay.stop();
    else swiper.autoplay.start();
  }, [reduced]);

  return (
    <section className="brand-strip bg-white py-8 md:py-10" aria-label={labels.title}>
      <div className="shell">
        <div className="mb-5">
          <h3 className="text-lg font-medium md:text-xl">{labels.title}</h3>
        </div>
        <Swiper
          modules={[Autoplay, A11y]}
          slidesPerView="auto"
          loop
          loopAdditionalSlides={inStoreBrands.length}
          allowTouchMove={false}
          speed={reduced ? 0 : 9000}
          autoplay={{ enabled: false, delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
          onSwiper={swiper => {
            instance.current = swiper;
          }}
        >
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
