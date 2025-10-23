'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Locale, getTranslation } from '@/lib/translations'
import { useEffect, useState } from 'react'

export default function Navigation({ locale }: { locale: Locale }) {
  const t = getTranslation(locale)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [canScroll, setCanScroll] = useState(true)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLang = () => setIsLangOpen(!isLangOpen)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const THRESHOLD = 10

    function update() {
      const doc = document.documentElement
      const hasScroll = doc.scrollHeight > window.innerHeight
      setCanScroll(hasScroll)

      if (!hasScroll) {
        setScrolled(false)
        return
      }

      setScrolled(window.scrollY > THRESHOLD)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${!canScroll ? 'no-scroll' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link href={`/${locale}`} className="logo">
          <Image src="/logo.png" alt="Goose Technology" className="logo-image" width={160} height={40} priority />
          <span className="logo-text">Goose Technology</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu desktop-only">
          <li>
            <Link href={`/${locale}`} className={pathname === `/${locale}` ? 'active' : ''}>{t.nav.home}</Link>
          </li>
          <li>
            <Link href={`/${locale}/about`} className={pathname === `/${locale}/about` ? 'active' : ''}>{t.nav.about}</Link>
          </li>
          <li>
            <Link href={`/${locale}/products`} className={pathname?.startsWith(`/${locale}/products`) ? 'active' : ''}>{t.nav.products}</Link>
          </li>
        </ul>

        {/* Desktop Language Dropdown */}
        <div className="language-dropdown desktop-only">
          <button 
            className="lang-dropdown-btn" 
            onClick={toggleLang}
            onBlur={() => setTimeout(() => setIsLangOpen(false), 200)}
          >
            <span className="flag">{getFlag(locale)}</span>
            <span className="lang-code">{locale.split('-')[0].toUpperCase()}</span>
            <span className={`arrow ${isLangOpen ? 'open' : ''}`}>▼</span>
          </button>
          
          {isLangOpen && (
            <div className="lang-dropdown-menu">
              <LanguageOption locale="pt-br" currentLocale={locale} />
              <LanguageOption locale="en-us" currentLocale={locale} />
              <LanguageOption locale="fr-ca" currentLocale={locale} />
              <LanguageOption locale="es-mx" currentLocale={locale} />
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="hamburger mobile-only" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            <li>
              <Link href={`/${locale}`} onClick={toggleMenu} className={pathname === `/${locale}` ? 'active' : ''}>{t.nav.home}</Link>
            </li>
            <li>
              <Link href={`/${locale}/about`} onClick={toggleMenu} className={pathname === `/${locale}/about` ? 'active' : ''}>{t.nav.about}</Link>
            </li>
            <li>
              <Link href={`/${locale}/products`} onClick={toggleMenu} className={pathname?.startsWith(`/${locale}/products`) ? 'active' : ''}>{t.nav.products}</Link>
            </li>
          </ul>
          
          <div className="mobile-lang-section">
            <div className="mobile-lang-title">{t.nav.language}</div>
            <LanguageOption locale="pt-br" currentLocale={locale} onClick={toggleMenu} />
            <LanguageOption locale="en-us" currentLocale={locale} onClick={toggleMenu} />
            <LanguageOption locale="fr-ca" currentLocale={locale} onClick={toggleMenu} />
            <LanguageOption locale="es-mx" currentLocale={locale} onClick={toggleMenu} />
          </div>
        </div>
      )}
    </nav>
  )
}

function LanguageOption({ 
  locale, 
  currentLocale,
  onClick 
}: { 
  locale: Locale
  currentLocale: Locale
  onClick?: () => void
}) {
  const languages: Record<Locale, string> = {
    'pt-br': 'Português',
    'en-us': 'English',
    'fr-ca': 'Français',
    'es-mx': 'Español',
  }

  return (
    <Link 
      href={`/${locale}`} 
      className={`lang-option ${currentLocale === locale ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="flag">{getFlag(locale)}</span>
      <span className="lang-name">{languages[locale]}</span>
    </Link>
  )
}

function getFlag(locale: Locale): string {
  const flags = {
    'pt-br': '🇧🇷',
    'en-us': '🇺🇸',
    'fr-ca': '🇫🇷',
    'es-mx': '🇪🇸',
  }
  return flags[locale]
}