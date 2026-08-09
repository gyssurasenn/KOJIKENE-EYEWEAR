import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import type { FrameDef } from '@/content/eyewear';

/**
 * Featured eyewear, laid out as an editorial spread rather than a
 * product grid: varying column spans, deliberate offsets, generous
 * white space, no prices and no buy buttons.
 *
 * Layout classes are written out in full so Tailwind can see them.
 */
const composition = [
  'lg:col-span-6 lg:col-start-1',
  'lg:col-span-4 lg:col-start-9 lg:mt-28',
  'lg:col-span-5 lg:col-start-2',
  'lg:col-span-5 lg:col-start-8 lg:mt-20',
  'lg:col-span-6 lg:col-start-1',
  'lg:col-span-4 lg:col-start-9 lg:mt-24',
];

export function EyewearEditorial({ frames, locale }: { frames: FrameDef[]; locale: Locale }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
      {frames.map((frame, index) => (
        <Reveal
          key={frame.id}
          delay={(index % 2) * 90}
          className={composition[index % composition.length]}
        >
          <FrameFigure frame={frame} locale={locale} />
        </Reveal>
      ))}
    </div>
  );
}

export async function FrameFigure({ frame, locale }: { frame: FrameDef; locale: Locale }) {
  const t = await getT(locale);
  const isPortrait = frame.image.height > frame.image.width;

  return (
    <figure className="group">
      <div
        className={`media-zoom relative w-full overflow-hidden bg-sand ${
          isPortrait ? 'aspect-[4/5]' : 'aspect-square'
        }`}
      >
        <Image
          src={frame.image.src}
          alt={frame.image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 48vw, 100vw"
          className="object-cover"
        />
      </div>

      <figcaption className="mt-6">
        <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3">
          <h3 className="font-display text-lg font-normal tracking-tight">{frame.name}</h3>
          <span className="text-[0.6875rem] uppercase tracking-widest2 text-stone">
            {t(`eyewear.styles.${frame.style}`)}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-graphite text-pretty">
          {t(`eyewear.frames.${frame.id}.note`)}
        </p>
        <p className="mt-3 text-[0.6875rem] uppercase tracking-widest2 text-mist">
          {t(`eyewear.frames.${frame.id}.material`)}
        </p>
      </figcaption>
    </figure>
  );
}
