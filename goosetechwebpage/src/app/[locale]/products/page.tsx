// src/app/[locale]/products/page.tsx
import { Metadata } from 'next'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { translations } from '@/lib/translations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslation(locale)

  return {
    title: t.products.title,
    description: t.products.description,
    openGraph: {
      title: t.products.title,
      description: t.products.description,
    },
  }
}

export default async function Products({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslation(locale)

  return (
    <section className="page-content">
      <h1>{t.products.title}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </section>
  )
}