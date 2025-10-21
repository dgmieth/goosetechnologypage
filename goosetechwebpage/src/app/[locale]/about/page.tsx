// src/app/[locale]/about/page.tsx
import { Metadata } from 'next'
import { Locale, getTranslation } from '@/lib/translations'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslation(locale)

  return {
    title: t.about.title,
    description: t.about.description,
    openGraph: {
      title: t.about.title,
      description: t.about.description,
    },
  }
}

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslation(locale)

  return (
    <section className="page-content">
      <h1>{t.about.title}</h1>
      <p>{t.about.content}</p>
    </section>
  )
}