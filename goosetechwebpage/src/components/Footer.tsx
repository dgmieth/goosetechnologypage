// src/components/Footer.tsx
import Link from 'next/link'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'

export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslation(locale)

  return (
    <footer className="footer">
      <div className="footer-container">
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
      <div className="footer-bottom">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  )
}