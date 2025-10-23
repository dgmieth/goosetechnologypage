// src/app/[locale]/contact/page.tsxexport {}
'use client'

import { Locale, getTranslation } from '@/lib/translations'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import '../../contact.css'

export default function Contact() {
  const params = useParams()
  const locale = params.locale as Locale
  const t = getTranslation(locale)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1>{t.contact.title}</h1>
          <p className="contact-subtitle">{t.contact.description}</p>
        </div>

        <div className="contact-content">
          {/* Form */}
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form glass-card">
              <div className="form-group">
                <label htmlFor="name">{t.contact.form.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t.contact.form.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t.contact.form.subject}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Message subject"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t.contact.form.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
              </button>

              {submitStatus === 'success' && (
                <div className="status-message success">
                  {t.contact.form.success}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message error">
                  {t.contact.form.error}
                </div>
              )}
            </form>
          </div>

          {/* Info Cards */}
          <div className="contact-info-section">
            <div className="info-card glass-card">
              <div className="info-icon">📧</div>
              <h3>{t.contact.info.email}</h3>
              <p>contact@goosetechnology.com</p>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon">📱</div>
              <h3>{t.contact.info.phone}</h3>
              <p>+1 (514) 555-0123</p>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon">📍</div>
              <h3>{t.contact.info.location}</h3>
              <p>Montreal, Quebec, Canada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
