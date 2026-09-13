'use client';

import { useMemo, type ReactNode } from 'react';
import { createInstance, type Resource } from 'i18next';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export function I18nProvider({
  locale,
  resources,
  children,
}: {
  locale: Locale;
  resources: Resource;
  children: ReactNode;
}) {
  // Client Components also render on the server. A module singleton leaks
  // its language across requests; scope the instance to this provider.
  const instance = useMemo(() => {
    const scoped = createInstance();
    void scoped.init({
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: [...locales],
      resources,
      initAsync: false,
      interpolation: { escapeValue: false },
      returnNull: false,
      react: { useSuspense: false },
    });
    return scoped;
  }, [locale, resources]);

  return (
    <I18nextProvider i18n={instance} defaultNS="translation">
      {children}
    </I18nextProvider>
  );
}

export function useT() {
  const { t } = useTranslation();
  return t;
}
