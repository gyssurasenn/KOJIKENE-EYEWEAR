import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { getT } from '@/i18n/server';
import { defaultLocale, localePath } from '@/i18n/config';
import { mainNav } from '@/lib/site';

/**
 * Rendered for unknown paths. Middleware rewrites unprefixed URLs into
 * the Thai segment, so this is reached in the reader's language.
 * next/navigation does not expose params here, so it falls back to Thai.
 */
export default async function NotFound() {
  const locale = defaultLocale;
  const t = await getT(locale);

  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-section">
      <p className="eyebrow mb-6">{t('notFound.eyebrow')}</p>
      <h1 className="max-w-3xl font-display text-display-lg font-light text-balance">
        {t('notFound.title')}
      </h1>
      <p className="mt-6 max-w-md text-lede font-light text-graphite text-pretty">
        {t('notFound.body')}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" locale={locale} size="lg">
          {t('common.cta.backHome')}
        </ButtonLink>
        <ButtonLink href="/contact" locale={locale} variant="outline" size="lg">
          {t('common.cta.visitStore')}
        </ButtonLink>
      </div>

      <nav aria-label={t('common.labels.siteSections')} className="mt-16 border-t border-ink/10 pt-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={localePath(locale, item.href)}
                className="link-underline text-[0.6875rem] font-medium uppercase tracking-widest2 text-stone transition-colors hover:text-ink"
              >
                {t(`common.nav.${item.key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
