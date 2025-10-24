// src/app/[locale]/about/page.tsx
'use client'

import { Locale, getTranslation } from '@/lib/translations'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import '../../about.css'

export default function About() {
  const params = useParams()
  const locale = params.locale as Locale
  const t = getTranslation(locale)

  return (
    <section className="about-page">
      <div className="about-container">
        {/* Hero Card with Background Image */}
        <div className="about-hero-card">
          <Image
            src="/aboutUs.png"
            alt="About Us"
            fill
            className="hero-bg-image"
            priority
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>{t.aboutUs.pageTitle}</h1>
          </div>
        </div>

        {/* Our Story */}
        <div className="glass-card">
          <h2>{t.aboutUs.ourStory.title}</h2>
          <div className="card-content">
            {t.aboutUs.ourStory.content.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Our Mission */}
        <div className="glass-card">
          <h2>{t.aboutUs.ourMission.title}</h2>
          <div className="card-content">
            {t.aboutUs.ourMission.content.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Our Vision */}
        <div className="glass-card">
          <h2>{t.aboutUs.ourVision.title}</h2>
          <div className="card-content">
            {t.aboutUs.ourVision.content.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="glass-card values-card">
          <h2>Our Values</h2>
          <div className="values-grid">
            {t.aboutUs.ourValues.map((value: any, index: number) => (
              <div key={index} className="value-item">
                <h3>{value.valueName}</h3>
                <p>{value.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}