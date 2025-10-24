// src/app/[locale]/contact/page.tsx
'use client'

import { Locale, getTranslation } from '@/lib/translations'
import { useParams } from 'next/navigation'

const CONTACT_EMAIL = 'goosetech.contact@gmail.com'

export default function ContactPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en-us'
  const t = getTranslation(locale)

  const handleEmailClick = () => {
    const subject = encodeURIComponent(t.contact.emailSubject)
    const body = encodeURIComponent(t.contact.emailBody)
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">{t.contact.title}</h1>
        <p className="contact-description">{t.contact.description}</p>
        
        <button 
          onClick={handleEmailClick}
          className="contact-button"
          type="button"
        >
          {t.contact.emailButton}
        </button>
      </div>
    </div>
  )
}
