'use client';

import { useEffect, useMemo, type ReactNode } from 'react';
import i18next, { type Resource } from 'i18next';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { LOCALE_COOKIE, defaultLocale, locales, type Locale } from '@/i18n/config';

/**
 * Client-side i18next, for the few interactive components (the header).
 *
 * The URL is always the source of truth for which language is shown —
 * LanguageDetector supplies the *remembered* preference, which the
 * language switcher writes to a cookie and middleware honours on the
 * next visit. It never overrides the language of the page you are on.
 *
 * Only the `common` slice of the dictionary is sent to the browser, so
 * page and article copy never ships as client JavaScript.
 */

let initialised = false;

/**
 * Sets up (or reuses) the singleton instance and merges in this locale's
 * resource bundle. Deliberately does NOT call changeLanguage — that emits
 * 'languageChanged', which re-renders every component subscribed via
 * useTranslation(). Doing that from inside useMemo (i.e. during
 * I18nProvider's own render) trips React's "setState while rendering a
 * different component" check, because DesktopNavItem etc. would be told
 * to update before I18nProvider has finished. The actual language switch
 * happens in the effect below, after render commits.
 */
function ensureInstance(locale: Locale, resources: Resource) {
  if (!initialised) {
    void i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        supportedLngs: [...locales],
        resources,
        interpolation: { escapeValue: false },
        returnNull: false,
        detection: {
          // 'path' would misread Thai URLs, which carry no prefix.
          order: ['cookie', 'navigator'],
          lookupCookie: LOCALE_COOKIE,
          // Deliberately no cookie caching. Middleware redirects on this
          // cookie, so only an explicit click in the language switcher may
          // write it — otherwise a browser set to English would silently
          // pull every visitor off the Thai URLs, which are the ones that
          // should rank locally.
          caches: [],
        },
        react: { useSuspense: false },
      });
    initialised = true;
  } else if (!i18next.hasResourceBundle(locale, 'translation')) {
    // Merging data doesn't emit 'languageChanged', so it's safe during render.
    i18next.addResourceBundle(locale, 'translation', resources[locale]?.translation, true, true);
  }

  return i18next;
}

export function I18nProvider({
  locale,
  resources,
  children,
}: {
  locale: Locale;
  /** Trimmed dictionary — the `common` subtree only. */
  resources: Resource;
  children: ReactNode;
}) {
  const instance = useMemo(() => ensureInstance(locale, resources), [locale, resources]);

  // Runs after render commits, so the language switch can safely notify
  // other subscribed components without racing I18nProvider's own render.
  useEffect(() => {
    if (i18next.language !== locale) {
      void i18next.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <I18nextProvider i18n={instance} defaultNS="translation">
      {children}
    </I18nextProvider>
  );
}

/** Typed convenience wrapper used by Client Components. */
export function useT() {
  const { t } = useTranslation();
  return t;
}
