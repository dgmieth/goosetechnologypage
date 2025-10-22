// src/components/ProductCard.tsx
import Link from 'next/link'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'

type Translation = ReturnType<typeof getTranslation>

interface ProductCardProps {
  product: (typeof products)[0]
  locale: Locale
  t: Translation
}

export default function ProductCard({ product, locale, t }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-icon">{product.icon}</div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-links">
        <Link
          href={`/${locale}/products/${product.id}/privacy`}
          className="product-link"
        >
          {t.products.privacy}
        </Link>
        <Link
          href={`/${locale}/products/${product.id}/terms`}
          className="product-link"
        >
          {t.products.terms}
        </Link>
      </div>
    </div>
  )
}