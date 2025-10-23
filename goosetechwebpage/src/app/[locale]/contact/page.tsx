// src/app/[locale]/contact/page.tsx
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
    title: t.contact.title,
    description: t.contact.description,
  }
}

export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslation(locale)

  return (
    <section className="page-content contact-page">
      <h1>{t.contact.title}</h1>
      <p>{t.contact.description}</p>
      {/* Contact form and information will be added here */}
    </section>
  )
}