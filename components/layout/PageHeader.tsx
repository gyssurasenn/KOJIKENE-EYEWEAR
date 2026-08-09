import type { ReactNode } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import type { BreadcrumbItem, MetaPair } from '@/types';

type PageHeaderProps = {
  locale: Locale;
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs: BreadcrumbItem[];
  /** Small meta pairs shown along the bottom edge. */
  meta?: MetaPair[];
  children?: ReactNode;
};

/** Shared masthead for interior pages. Renders the single <h1>. */
export async function PageHeader({
  locale,
  eyebrow,
  title,
  intro,
  breadcrumbs,
  meta,
  children,
}: PageHeaderProps) {
  const t = await getT(locale);

  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="shell pb-16 pt-8 md:pb-20 md:pt-10">
        <Breadcrumb
          items={breadcrumbs}
          locale={locale}
          label={t('common.labels.breadcrumb')}
          className="mb-12 md:mb-16"
        />

        <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            {eyebrow ? (
              <p className="eyebrow mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-display-lg font-light text-balance">{title}</h1>
          </div>
          {intro ? (
            <p className="max-w-prose2 text-lede font-light text-graphite text-pretty">{intro}</p>
          ) : null}
        </Reveal>

        {meta && meta.length > 0 ? (
          <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-2 text-sm text-graphite">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children}
      </div>
    </header>
  );
}
