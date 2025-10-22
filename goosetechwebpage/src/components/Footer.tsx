// src/components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'

// Import package.json to show app version in the footer (server component)
import pkg from '../../package.json'

export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslation(locale)
  const year = new Date().getFullYear()

  // Replace {year} token in the translation (simple templating)
  const copyright = t.footer.copyright.replace('{year}', String(year))

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          {/* white logo: file provided as /whiteLogo.png */}
          <Image src="/whiteLogo.png" alt="Goose Technology" className="footer-logo" width={220} height={140} priority />
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h3>{t.footer.privacy}</h3>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <Link href={`/${locale}/products/${product.id}/privacy`}>
                    {product.name} - {t.footer.privacy}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>{t.footer.terms}</h3>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <Link href={`/${locale}/products/${product.id}/terms`}>
                    {product.name} - {t.footer.terms}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">{copyright.replace(/Your Site|Seu Site|Votre Site|Su Sitio/gi, 'goosetechnology.com')}</p>
  <p className="footer-proud"><span className="footer-flag">🇨🇦</span> {t.footer.proudlyCanadian}</p>
  <p className="footer-version">{t.footer.versionLabel} {pkg.version}</p>
      </div>
    </footer>
  )
}