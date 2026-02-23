import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/booking-success'],
    },
    sitemap: 'https://www.mahjongyo.com/sitemap.xml',
  }
}
