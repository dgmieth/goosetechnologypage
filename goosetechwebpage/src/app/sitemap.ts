// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { Locale, translations } from '@/lib/translations'
import { products } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = Object.keys(translations) as Locale[]
  const baseUrl = 'https://example.com'
  const urls: MetadataRoute.Sitemap = []

  // Home pages
  locales.forEach((locale) => {
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    })
  })

  // About pages
  locales.forEach((locale) => {
    urls.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Products pages
  locales.forEach((locale) => {
    urls.push({
      url: `${baseUrl}/${locale}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // Product Privacy and Terms pages
  locales.forEach((locale) => {
    products.forEach((product) => {
      urls.push({
        url: `${baseUrl}/${locale}/products/${product.id}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      })
      urls.push({
        url: `${baseUrl}/${locale}/products/${product.id}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      })
    })
  })

  return urls
}