import { FrameFigure } from '@/components/eyewear/EyewearEditorial';
import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import type { FrameDef } from '@/content/eyewear';

export async function FrameCarousel({ frames, locale, label }: { frames: FrameDef[]; locale: Locale; label?: string }) {
  const t = await getT(locale);
  return (
    <EditorialSwiper label={label || t('home.featured.title')} labels={{
      previous: t('common.carousel.previous'), next: t('common.carousel.next'), slide: t('common.carousel.slide'),
    }}>
      {frames.map(frame => <FrameFigure key={frame.id} frame={frame} locale={locale} />)}
    </EditorialSwiper>
  );
}
