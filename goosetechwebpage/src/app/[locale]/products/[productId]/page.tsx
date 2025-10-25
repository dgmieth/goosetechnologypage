import Link from 'next/link'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductCarousel from './ProductCarousel'
import '../../../products.css'

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

  const details = product.details[locale]

  return (
    <section className="page-content">
      <Link href={`/${locale}/products`} className="back-link">
        ← {t.products.title}
      </Link>

      <div className="product-detail">
        {/* Glass Card Wrapper */}
        <div className="glassCard">
          {/* Title and Description */}
          <div className="product-detail-header">
            <h1>{details.title}</h1>
            <p className="product-detail-description">{product.descriptions[locale]}</p>
          </div>

          {/* Carousel */}
          <ProductCarousel productId={product.id} title={details.title} totalImages={4} />

          {/* Content */}
          <div className="product-detail-content">
            {details.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="product-buttons-container">
          <a href={`/${locale}/products/${productId}/privacy`} className="product-btn">
            {t.footer.privacy}
          </a>
          <a href={`/${locale}/products/${productId}/terms`} className="product-btn">
            {t.footer.terms}
          </a>
        </div>
      </div>
    </section>
  )
}
