import { Reveal } from '@/components/ui/Reveal';
import { getT } from '@/i18n/server';
import { getParagraphs, getPrinciples } from '@/lib/content';
import type { Locale } from '@/i18n/config';

/**
 * The philosophy block. Typographic rather than icon-led — the numbers
 * carry the rhythm, so nothing here looks like a stock icon set.
 */
export async function WhyKojikane({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const paragraphs = getParagraphs(t, 'home.philosophy.body');
  const principles = getPrinciples(t);

  return (
    <section className="border-y border-ink/10 bg-bone">
      <div className="shell py-section">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
              {t('home.philosophy.eyebrow')}
            </p>
            <h2 className="font-display text-display-lg font-light text-balance">
              {t('home.philosophy.title')}
            </h2>
            <div className="mt-8 space-y-5 text-lede font-light text-graphite text-pretty">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.number} delay={(index % 2) * 80}>
                <div className="flex h-full flex-col border-t border-ink/15 pt-5">
                  <span className="text-[0.6875rem] uppercase tracking-widest2 text-mist">
                    {principle.number}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-normal">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{principle.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
