import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '麻雀Yo! 麻將房 | Mahjong Room Booking',
  description: '麻將房預約 - 麻雀Yo! 提供全自動麻將枱、私人專屬空間、舒適環境。Mahjong Room Booking.',
  keywords: [
    '麻將房',
    '麻雀房',
    '麻將房預約',
    'mahjong room',
    'mahjong room booking',
    '香港麻將房',
    '麻雀Yo',
    'MahjongYo',
  ],
  authors: [{ name: '麻雀Yo' }],
  creator: '麻雀Yo',
  publisher: '麻雀Yo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.mahjongyo.com'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-TW': '/zh-TW',
      'en': '/en',
    },
  },
  openGraph: {
    title: '麻雀Yo! 麻將房 | Mahjong Room',
    description: '麻將房預約 - 全自動麻將枱、私人專屬空間、舒適環境。立即預約！',
    url: 'https://www.mahjongyo.com',
    siteName: '麻雀Yo!',
    images: [
      {
        url: '/images/mahjongyo_logo.png',
        width: 512,
        height: 512,
        alt: '麻雀Yo 麻將房',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '麻雀Yo! 麻將房',
    description: '麻將房預約 - 全自動麻將枱、私人專屬空間',
    images: ['/images/mahjongyo_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: '麻雀Yo! 麻將房',
                description: '麻將房預約 - 全自動麻將枱、私人專屬空間、舒適環境',
                url: 'https://www.mahjongyo.com',
                logo: 'https://www.mahjongyo.com/images/mahjongyo_logo.png',
                image: 'https://www.mahjongyo.com/images/mahjongyo_logo.png',
                telephone: '',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: '',
                  addressRegion: '',
                  addressCountry: 'HK',
                },
                openingHoursSpecification: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '08:00',
                  closes: '23:00',
                },
                sameAs: [],
                priceRange: '$250-$500',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: '麻雀Yo!',
                url: 'https://www.mahjongyo.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.mahjongyo.com/images/mahjongyo_logo.png',
                  width: 512,
                  height: 512,
                },
                image: 'https://www.mahjongyo.com/images/mahjongyo_logo.png',
                description: '麻將房預約服務',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: '',
                  addressRegion: '',
                  addressCountry: 'HK',
                },
              },
            ]),
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
