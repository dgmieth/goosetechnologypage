// src/app/[locale]/products/[productId]/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}): Promise<Metadata> {
  const { locale, productId } = await params
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return {
      title: 'App not found',
    }
  }

  return {
    title: product.names[locale],
    description: product.descriptions[locale],
    openGraph: {
      title: product.names[locale],
      description: product.descriptions[locale],
    },
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}) {
  const { locale, productId } = await params
  const t = getTranslation(locale)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return (
    <section className="page-content">
      <Link href={`/${locale}/products`} className="back-link">
        ← {t.products.title}
      </Link>
      
      <div className="product-detail">
        <div className="product-detail-icon">{product.icon}</div>
        <h1>{product.names[locale]}</h1>
        <p className="product-detail-description">{product.descriptions[locale]}</p>
        
        <div className="product-detail-content">
          <p>
            Bem-vindo ao {product.names[locale]}! Esta página será preenchida com mais detalhes sobre o aplicativo em breve.
          </p>
        </div>
      </div>
    </section>
  )
}
