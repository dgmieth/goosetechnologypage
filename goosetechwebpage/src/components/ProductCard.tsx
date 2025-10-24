// src/components/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/lib/translations'
import { products } from '@/lib/products'

interface ProductCardProps {
  product: (typeof products)[0]
  locale: Locale
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const imageUrl = `/${product.id}_AppCover.png`

  return (
    <Link href={`/${locale}/products/${product.id}`} className="product-card-link">
      <div className="product-card">
        <Image
          src={imageUrl}
          alt={product.names[locale]}
          width={300}
          height={300}
          className="product-card-image"
        />
      </div>
    </Link>
  )
}