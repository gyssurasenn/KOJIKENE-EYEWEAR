import { EditorialSwiper } from '@/components/ui/EditorialSwiper';
import { ProductCard, type ProductLabels } from '@/components/eyewear/ProductCard';
import { getT } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { products } from '@/content/products';

export async function ProductCarousel({ locale }: { locale: Locale }) {
  const t = await getT(locale);
  const keys: (keyof ProductLabels)[] = ['previousImage', 'nextImage', 'image', 'color', 'gallery', 'demo', 'demoPrice', 'askPrice', 'freeShipping', 'demoShipping', 'details', 'noImage'];
  const labels = Object.fromEntries(keys.map(key => [key, t(`common.products.${key}`)])) as ProductLabels;
  return (
    <EditorialSwiper variant="products" label={t('home.featured.title')} labels={{
      previous: t('common.products.previousProducts'), next: t('common.products.nextProducts'),
      slide: t('common.products.product'), page: t('common.products.page'),
    }}>
      {products.map(product => <ProductCard key={product.id} product={product} locale={locale} labels={labels}
        description={product.descriptionKey ? t(product.descriptionKey) : undefined} />)}
    </EditorialSwiper>
  );
}
