import { Metadata } from 'next'
import { Locale } from '@/lib/translations'
import { products } from '@/lib/products'

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

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
