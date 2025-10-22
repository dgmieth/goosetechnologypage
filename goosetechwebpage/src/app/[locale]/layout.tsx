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
  // Accept the runtime shape (strings) and narrow to Locale after awaiting.
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const descriptions: Record<Locale, string> = {
    'pt-br': 'Site multilíngue otimizado para SEO',
    'en-us': 'Multilingual SEO-optimized website',
    'fr-ca': 'Site multilingue optimisé pour le référencement',
    'es-mx': 'Sitio multilingüe optimizado para SEO',
  }

  return {
    title: 'Your Company',
    description: descriptions[loc],
    openGraph: {
      locale: loc.replace('-', '_'),
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
  params: { locale: string } | Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = locale as Locale

  if (!Object.keys(translations).includes(loc)) {
    notFound()
  }
  return (
    <>
      <Navigation locale={loc} />
      <main>{children}</main>
      <Footer locale={loc} />
    </>
  )
}