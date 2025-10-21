// src/components/Navigation.tsx
import Link from 'next/link'
import { Locale, getTranslation } from '@/lib/translations'

export default function Navigation({ locale }: { locale: Locale }) {
  const t = getTranslation(locale)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href={`/${locale}`} className="logo">
          YourCo
        </Link>
        <ul className="nav-menu">
          <li>
            <Link href={`/${locale}`}>{t.nav.home}</Link>
          </li>
          <li>
            <Link href={`/${locale}/about`}>{t.nav.about}</Link>
          </li>
          <li>
            <Link href={`/${locale}/products`}>{t.nav.products}</Link>
          </li>
        </ul>
        <LanguageSwitcher locale={locale} />
      </div>
    </nav>
  )
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const languages: { code: Locale; name: string }[] = [
    { code: 'pt-br', name: 'PT' },
    { code: 'en-us', name: 'EN' },
    { code: 'fr-ca', name: 'FR' },
    { code: 'es-mx', name: 'ES' },
  ]

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}`}
          className={`lang-btn ${locale === lang.code ? 'active' : ''}`}
        >
          {lang.name}
        </Link>
      ))}
    </div>
  )
}