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
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://example.com/${locale}`} />
        <link rel="alternate" hrefLang="pt-BR" href="https://example.com/pt-br" />
        <link rel="alternate" hrefLang="en-US" href="https://example.com/en-us" />
        <link rel="alternate" hrefLang="fr-CA" href="https://example.com/fr-ca" />
        <link rel="alternate" hrefLang="es-MX" href="https://example.com/es-mx" />
        <link rel="alternate" hrefLang="x-default" href="https://example.com/en-us" />
      </head>
      <body>
        <Navigation locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}