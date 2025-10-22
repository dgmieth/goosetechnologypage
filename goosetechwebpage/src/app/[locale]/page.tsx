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
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">{t.home.headline}</h1>
          <p className="hero-lead">{t.home.lead}</p>

          <div className="hero-story">
            <p>{t.home.story}</p>
            <p className="muted">{t.home.features}</p>
            <p className="hero-mission">{t.home.mission}</p>
          </div>

          <div className="hero-cta">
            <Link href={`/${locale}/products`} className="btn">
              {t.home.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}