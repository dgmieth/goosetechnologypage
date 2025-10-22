import Link from 'next/link'
import { getTranslation } from '@/lib/translations'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function NotFound() {
  const t = getTranslation('en-us')

  return (
    <>
      <Navigation locale={'en-us'} />
      <main className="notfound-main">
        <div className="notfound-inner">
          <picture>
            <source srcSet="/404.png" type="image/png" />
            <img src="/404.svg" alt="404 logo" className="notfound-illustration" />
          </picture>

          <h1 className="notfound-title">{t.notFound.title}</h1>
          <p className="notfound-message">{t.notFound.message}</p>
          <Link href={`/${'en-us'}`} className="btn">{t.notFound.cta}</Link>
        </div>
      </main>
      <Footer locale={'en-us'} />
    </>
  )
}
