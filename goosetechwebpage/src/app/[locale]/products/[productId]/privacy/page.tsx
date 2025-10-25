import Link from 'next/link'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'
import { notFound } from 'next/navigation'
import '../../../../terms.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}) {
  const { locale, productId } = await params
  const product = products.find((p) => p.id === productId)

  if (!product || !product.privacy) {
    return { title: 'Privacy Policy' }
  }

  return {
    title: product.privacy[locale]?.title || 'Privacy Policy',
    description: 'Privacy Policy',
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}) {
  const { locale, productId } = await params

  const t = getTranslation(locale)
  const product = products.find((p) => p.id === productId)

  if (!product || !product.privacy) {
    notFound()
  }

  const privacyContent = product.privacy[locale]

  return (
    <section className="page-content">
      <Link href={`/${locale}/products/${productId}`} className="back-link">
        ← {product.names[locale]}
      </Link>

      <h1>{privacyContent.title}</h1>

      <div className="glass-content-card">
        {privacyContent.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
