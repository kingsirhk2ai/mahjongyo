'use client'

import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import TrackingProvider from './TrackingProvider'
import FirebaseAnalytics from './FirebaseAnalytics'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <TrackingProvider>
          <FirebaseAnalytics />
          {children}
        </TrackingProvider>
      </LanguageProvider>
    </SessionProvider>
  )
}
