import Link from 'next/link'
import { headers } from 'next/headers'
import { getTranslation, Locale, translations } from '@/lib/translations'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default async function NotFound() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'
  
  // Extract locale from pathname (e.g., /pt-br/... -> pt-br)
  const pathSegments = pathname.split('/').filter(Boolean)
  const potentialLocale = pathSegments[0]
  const locale = (Object.keys(translations).includes(potentialLocale) ? potentialLocale : 'en-us') as Locale
  
  const t = getTranslation(locale)

  return (
    <>
      <Navigation locale={locale} />
      <main className="notfound-main">
        <div className="notfound-inner">
          <picture>
            <source srcSet="/404.png" type="image/png" />
            <img src="/404.svg" alt="404 logo" className="notfound-illustration" />
          </picture>

          <h1 className="notfound-title">{t.notFound.title}</h1>
          <p className="notfound-message">{t.notFound.message}</p>
          <Link href={`/${locale}`} className="btn">{t.notFound.cta}</Link>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
