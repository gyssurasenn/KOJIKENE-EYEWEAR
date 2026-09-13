'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import type { Product } from '@/content/products';
import type { Locale } from '@/i18n/config';
import 'swiper/css';

export type ProductLabels = {
  previousImage: string; nextImage: string; image: string; color: string;
  gallery: string; demo: string; demoPrice: string; askPrice: string;
  freeShipping: string; demoShipping: string; details: string; noImage: string;
};

export function ProductCard({ product, locale, labels, description }: {
  product: Product;
  locale: Locale;
  labels: ProductLabels;
  description?: string;
}) {
  const gallery = useRef<SwiperInstance | null>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const color = product.colors[colorIndex];
  const photos = color?.images ?? product.images;
  const model = color?.model ?? product.model;
  const price = color?.price ?? product.price;
  const name = `${product.brand} - ${product.name}`;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    gallery.current?.update();
    gallery.current?.slideTo(0, 0);
    setImageIndex(0);
  }, [colorIndex]);

  return (
    <article className="product-card" data-product-id={product.id}>
      <div className="product-gallery" data-ready={ready || undefined} role="group" aria-label={`${labels.gallery}: ${name}`} tabIndex={0}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.stopPropagation(); event.preventDefault();
          if (event.key === 'ArrowLeft') gallery.current?.slidePrev();
          else gallery.current?.slideNext();
        }}>
        {photos.length ? <Swiper nested touchMoveStopPropagation grabCursor speed={reduced ? 0 : 350}
          slidesPerView={1} onSwiper={instance => { gallery.current = instance; setReady(true); }}
          onSlideChange={instance => setImageIndex(instance.activeIndex)} className="product-image-swiper">
          {photos.map((photo, index) => (
            <SwiperSlide key={`${color?.id ?? 'default'}-${index}`}>
              <div className="product-image">
                <Image src={photo.src} alt={product.isDemo ? `${labels.demo}: ${name}, ${labels.image} ${index + 1}` : photo.alt}
                  fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 43vw, 80vw" className="object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper> : <div className="product-image product-image-empty">{labels.noImage}</div>}
        {photos.length > 1 && <>
          <button type="button" className="product-image-arrow previous" aria-label={`${labels.previousImage}: ${name}`}
            title={labels.previousImage} disabled={!ready || imageIndex === 0} onClick={() => gallery.current?.slidePrev()}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" className="product-image-arrow next" aria-label={`${labels.nextImage}: ${name}`}
            title={labels.nextImage} disabled={!ready || imageIndex === photos.length - 1} onClick={() => gallery.current?.slideNext()}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <div className="product-image-dots" role="group" aria-label={labels.gallery}>
            {photos.map((_, index) => <button key={index} type="button" aria-label={`${name}: ${labels.image} ${index + 1}`}
              title={`${labels.image} ${index + 1}`} aria-current={imageIndex === index ? 'true' : undefined}
              disabled={!ready} onClick={() => gallery.current?.slideTo(index)}><span /></button>)}
          </div>
        </>}
        <span className="sr-only" aria-live="polite" aria-atomic="true">{labels.image} {photos.length ? imageIndex + 1 : 0} / {photos.length}</span>
      </div>
      <div className="product-info">
        {product.isDemo && <p className="product-demo">{labels.demo}</p>}
        <h3 className="font-display product-name">{name}</h3>
        <p className="product-model">{model}</p>
        <p className="product-price">
          {price !== undefined ? <>{product.isDemo && <span className="sr-only">{labels.demoPrice} </span>}
            {new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', { maximumFractionDigits: 0 }).format(price)} {'\u0e3f'}</> : labels.askPrice}
        </p>
        {product.colors.length > 0 && <div className="product-colors" role="group" aria-label={`${labels.color}: ${name}`}>
          {product.colors.map((variant, index) => <button key={variant.id} type="button" aria-label={`${labels.color} ${index + 1}: ${name}`}
            title={`${labels.color} ${index + 1}`} aria-pressed={colorIndex === index} onClick={() => setColorIndex(index)}>
            <span style={{ backgroundColor: variant.hex }} />
          </button>)}
        </div>}
        <div className="product-badge-row">{product.freeShipping && <p className="product-shipping"><Truck size={14} aria-hidden="true" />{product.isDemo ? labels.demoShipping : labels.freeShipping}</p>}</div>
        {description && <details className="product-description"><summary>{labels.details}</summary><p>{description}</p></details>}
      </div>
    </article>
  );
}
