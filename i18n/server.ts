import { cache } from 'react';
import { createInstance, type i18n as I18nInstance, type TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

import en from '@/locales/en/translation.json';
import th from '@/locales/th/translation.json';
import { defaultLocale, type Locale } from '@/i18n/config';

/**
 * Server-side i18next. Translations are imported statically, so no
 * loader or backend is needed and every page stays statically generated.
 *
 * Client Components use i18n/client.tsx instead.
 */
export const resources = {
  en: { translation: en },
  th: { translation: th },
} as const;

/** One instance per locale per request, memoised by React. */
const initI18n = cache(async (locale: Locale): Promise<I18nInstance> => {
  const instance = createInstance();
  await instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: defaultLocale,
    supportedLngs: ['th', 'en'],
    resources,
    interpolation: { escapeValue: false },
    // Copy is authored per language; no plural/context machinery needed.
    returnNull: false,
  });
  return instance;
});

/** `const t = await getT(locale)` inside any Server Component. */
export async function getT(locale: Locale): Promise<TFunction> {
  const instance = await initI18n(locale);
  return instance.getFixedT(locale);
}

/**
 * Reads a translation key that holds an array of strings.
 * i18next types `t()` loosely for arrays, so this keeps call sites clean.
 */
export function tList(t: TFunction, key: string): string[] {
  const value = t(key, { returnObjects: true }) as unknown;
  return Array.isArray(value) ? (value as string[]) : [];
}

/** Reads a translation key that holds an array of objects. */
export function tObjects<T>(t: TFunction, key: string): T[] {
  const value = t(key, { returnObjects: true }) as unknown;
  return Array.isArray(value) ? (value as T[]) : [];
}

/** The raw dictionary for a locale — used to seed the client provider. */
export function getDictionary(locale: Locale) {
  return resources[locale].translation;
}
