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

  if (!product || !product.terms) {
    return { title: 'Terms of Service' }
  }

  return {
    title: product.terms[locale]?.title || 'Terms of Service',
    description: 'Terms of Service',
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}) {
  const { locale, productId } = await params

  const t = getTranslation(locale)
  const product = products.find((p) => p.id === productId)

  if (!product || !product.terms) {
    notFound()
  }

  const termsContent = product.terms[locale]

  return (
    <section className="page-content">
      <Link href={`/${locale}/products/${productId}`} className="back-link">
        ← {product.names[locale]}
      </Link>

      <h1>{termsContent.title}</h1>

      <div className="glass-content-card">
        {termsContent.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
