// src/app/[locale]/page.tsx
import { Metadata } from 'next'
import { Locale, getTranslation } from '@/lib/translations'
import Link from 'next/link'
import '../home.css'

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
    <div className="home-hero">
      <div className="hero-inner">
        <div className="home-content">
          <div className="home-text">
            <h1 className="hero-title">{t.home.headline}</h1>
            <p className="hero-lead">{t.home.lead}</p>

            <div className="about-section">
              <p>{t.home.story}</p>
              <p>{t.home.features}</p>
            </div>

            <p className="hero-mission">{t.home.mission}</p>

            <div className="hero-cta">
              <Link href={`/${locale}/products`} className="btn">
                {t.home.cta}
              </Link>
            </div>
          </div>
        </div>

        <div className="home-visual">
          <div className="home-image-container"></div>
        </div>
      </div>
    </div>
  )
}