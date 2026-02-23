'use client'

import { createContext, useContext, useEffect, useCallback, ReactNode } from 'react'
import { getVisitorId, initSession, trackEvent, EventTypes } from '@/lib/tracking'

interface TrackingContextType {
  visitorId: string | null
  trackEvent: (eventType: string, data?: { eventData?: Record<string, unknown>; element?: string }) => Promise<void>
  trackClick: (element: string, data?: Record<string, unknown>) => Promise<void>
  EventTypes: typeof EventTypes
}

const TrackingContext = createContext<TrackingContextType | null>(null)

export function useTracking() {
  const context = useContext(TrackingContext)
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider')
  }
  return context
}

export default function TrackingProvider({ children }: { children: ReactNode }) {
  // Initialize session on mount
  useEffect(() => {
    initSession().then(() => {
      // Track initial page view
      trackEvent(EventTypes.PAGE_VIEW)
    })
  }, [])

  // Track page views on route change
  useEffect(() => {
    const handleRouteChange = () => {
      trackEvent(EventTypes.PAGE_VIEW)
    }

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const trackClick = useCallback(async (element: string, data?: Record<string, unknown>) => {
    await trackEvent(EventTypes.CLICK, { element, eventData: data })
  }, [])

  const value: TrackingContextType = {
    visitorId: typeof window !== 'undefined' ? getVisitorId() : null,
    trackEvent,
    trackClick,
    EventTypes,
  }

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  )
}
