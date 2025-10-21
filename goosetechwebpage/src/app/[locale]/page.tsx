// src/app/[locale]/page.tsx
import { Metadata } from 'next'
import { Locale, getTranslation } from '@/lib/translations'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslation(locale)

  return {
    title: t.home.title,
    description: t.home.description,
    openGraph: {
      title: t.home.title,
      description: t.home.description,
      type: 'website',
    },
  }
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslation(locale)

  return (
    <section className="hero">
      <h1>{t.home.title}</h1>
      <p>{t.home.description}</p>
      <Link href={`/${locale}/products`} className="btn">
        {t.home.cta}
      </Link>
    </section>
  )
}