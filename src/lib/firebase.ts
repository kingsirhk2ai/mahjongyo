import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDR2Z87kh4XrH8w9HY_ekUFzw7AN5pJ8Zw",
  authDomain: "mjparty-f78ff.firebaseapp.com",
  projectId: "mjparty-f78ff",
  storageBucket: "mjparty-f78ff.firebasestorage.app",
  messagingSenderId: "901670008574",
  appId: "1:901670008574:web:900ccdf09f9067437f97af",
  measurementId: "G-QMMFQW0996"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Analytics (client-side only)
let analytics: Analytics | null = null

export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== 'undefined' && !analytics) {
    const supported = await isSupported()
    if (supported) {
      analytics = getAnalytics(app)
    }
  }
  return analytics
}

export { app, analytics }
