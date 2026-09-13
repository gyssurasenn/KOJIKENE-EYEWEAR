import { Reveal } from '@/components/ui/Reveal';
import { getT } from '@/i18n/server';
import { getParagraphs } from '@/lib/content';
import type { Locale } from '@/i18n/config';

/**
 * Pricing packages block — frame + lens bundles at a few flat price points.
 */
export async function PricingPackages({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const packages = getParagraphs(t, 'home.pricing.packages');

  return (
    <section className="border-y border-ink/10 bg-white">
      <div className="shell py-section">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-display-md font-light text-balance">
            {t('home.pricing.title')}
          </h2>
          <p className="mt-5 text-lede font-light text-graphite text-pretty">
            {t('home.pricing.intro')}
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {packages.map((price, index) => (
            <Reveal as="li" key={price} delay={index * 80}>
              <div className="flex h-full items-center justify-center border border-ink/15 bg-paper px-4 py-6 text-center font-display text-lg">
                {price}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
