import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { DiscoverFrame } from '@/components/home/DiscoverFrame';
import { WhyKojikane } from '@/components/home/WhyKojikane';
import { FamilyStory } from '@/components/home/FamilyStory';
import { FeaturedEyewear } from '@/components/home/FeaturedEyewear';
import { ServicesSection } from '@/components/home/ServicesSection';
import { JournalSection } from '@/components/home/JournalSection';
import { StoreGallery } from '@/components/sections/StoreGallery';
import { getT, tList } from '@/i18n/server';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getT(locale);

  return buildMetadata({
    locale,
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    path: '/',
    keywords: tList(t, 'seo.home.keywords'),
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <>
      <Hero locale={locale} />
      <DiscoverFrame locale={locale} />
      <WhyKojikane locale={locale} />
      <FamilyStory locale={locale} />
      <FeaturedEyewear locale={locale} />
      <ServicesSection locale={locale} />
      <StoreGallery locale={locale} />
      <JournalSection locale={locale} />
    </>
  );
}
