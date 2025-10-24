// src/app/[locale]/contact/page.tsx
'use client'

import { Locale, getTranslation } from '@/lib/translations'
import { useParams } from 'next/navigation'
import '../../contact.css'

export default function Contact() {
  const params = useParams()
  const locale = params.locale as Locale
  const t = getTranslation(locale)

  const handleEmailClick = () => {
    const subject = encodeURIComponent(t.contact.emailSubject)
    const body = encodeURIComponent(t.contact.emailBody)
    window.location.href = `mailto:contact@goosetechnology.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact-page">
      <div className="contact-container">
        <div className="contact-title">{t.contact.title}</div>
        <div className="contact-description">{t.contact.description}</div>
        <button onClick={handleEmailClick} className="contact-button">
          {t.contact.emailButton}
        </button>
      </div>
    </section>
  )
}
