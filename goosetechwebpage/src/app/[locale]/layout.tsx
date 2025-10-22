// src/app/[locale]/layout.tsx
import { notFound } from 'next/navigation'
import { Locale, translations } from '@/lib/translations'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import '../globals.css'

export const generateStaticParams = () => {
  return Object.keys(translations).map((locale) => ({
    locale,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const descriptions: Record<Locale, string> = {
    'pt-br': 'Site multilíngue otimizado para SEO',
    'en-us': 'Multilingual SEO-optimized website',
    'fr-ca': 'Site multilingue optimisé pour le référencement',
    'es-mx': 'Sitio multilingüe optimizado para SEO',
  }

  return {
    title: 'Your Company',
    description: descriptions[locale],
    openGraph: {
      locale: locale.replace('-', '_'),
    },
    // Provide per-locale alternates and icons via the Metadata API so we don't
    // need to render <head> inside this layout (root layout owns the html/head/body).
    alternates: {
      canonical: `https://example.com/${locale}`,
      languages: {
        'pt-BR': 'https://example.com/pt-br',
        'en-US': 'https://example.com/en-us',
        'fr-CA': 'https://example.com/fr-ca',
        'es-MX': 'https://example.com/es-mx',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  if (!Object.keys(translations).includes(locale)) {
    notFound()
  }
  return (
    <>
      <Navigation locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  )
}