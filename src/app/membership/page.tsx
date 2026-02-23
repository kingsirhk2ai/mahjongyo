'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast, { useToast } from '@/components/Toast'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { MEMBERSHIPS, formatPrice, MembershipTier, getNextTierInfo } from '@/lib/membership'

interface UserData {
  membership: MembershipTier
  totalSpent: number
}

interface Transaction {
  id: string
  type: string
  amount: number
  description: string
  createdAt: string
}

export default function MembershipPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const { t, language } = useLanguage()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/membership')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchUserData()
    }
  }, [session])

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/user')
      const data = await res.json()
      setUserData(data.user)
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error(t.common.somethingWrong)
    } finally {
      setLoading(false)
    }
  }

  const currentMembership = MEMBERSHIPS.find(m => m.id === userData?.membership) || MEMBERSHIPS[0]
  const nextTierInfo = userData ? getNextTierInfo(userData.totalSpent || 0) : { nextTier: null, amountNeeded: 0 }
  const progressPercent = nextTierInfo.nextTier
    ? Math.min(100, ((userData?.totalSpent || 0) / nextTierInfo.nextTier.spendingThreshold) * 100)
    : 100

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-hero text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">{t.membership.title}</h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="skeleton h-48 rounded-2xl" />
            <div className="skeleton h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-slide-up">
            <nav className="text-green-200 text-sm mb-2">
              <span>{t.membership.breadcrumb}</span>
              <span className="mx-2">/</span>
              <span className="text-white">{t.membership.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold">{t.membership.title}</h1>
            <p className="mt-2 text-green-100">{t.membership.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Current Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Membership Level */}
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">{t.membership.currentLevel}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-${currentMembership.color}-100 text-${currentMembership.color}-700`}>
                {language === 'zh-TW' ? currentMembership.nameZh : currentMembership.name}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {language === 'zh-TW' ? currentMembership.descriptionZh : currentMembership.description}
            </p>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-gray-500">{t.membership.peakHours}:</span>
                <span className="ml-2 font-semibold text-gray-800">{formatPrice(currentMembership.peakPrice)}</span>
              </div>
              <div>
                <span className="text-gray-500">{t.membership.offPeakHours}:</span>
                <span className="ml-2 font-semibold text-green-600">{formatPrice(currentMembership.offPeakPrice)}</span>
              </div>
            </div>
          </div>

          {/* Total Spending & Progress */}
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t.membership.totalSpent}</h3>
            <p className="text-3xl font-bold text-purple-600 mb-3">
              {formatPrice(userData?.totalSpent || 0)}
            </p>
            {nextTierInfo.nextTier ? (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">{t.membership.nextTier}: {language === 'zh-TW' ? nextTierInfo.nextTier.nameZh : nextTierInfo.nextTier.name}</span>
                  <span className="text-gray-700">{formatPrice(nextTierInfo.amountNeeded)} {t.membership.toGo}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  {t.membership.spendToUnlock}
                </p>
              </div>
            ) : (
              <p className="text-sm text-green-600 font-medium">{t.membership.maxLevel}</p>
            )}
            <Link href="/book" className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm mt-4">
              <CalendarIcon className="w-4 h-4" />
              {t.home.bookNow}
            </Link>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="card p-6 mb-8 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t.membership.pricingTable}</h3>
          <p className="text-gray-600 text-sm mb-6">
            {t.membership.autoUpgradeDesc}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">{t.membership.timeSlot}</th>
                  {MEMBERSHIPS.map(m => (
                    <th key={m.id} className="text-center py-4 px-4">
                      <div className="font-bold text-gray-800">
                        {language === 'zh-TW' ? m.nameZh : m.name}
                      </div>
                      {m.spendingThreshold > 0 && (
                        <div className="text-xs text-gray-500">
                          {t.membership.spend} {formatPrice(m.spendingThreshold)}
                        </div>
                      )}
                      {m.id === userData?.membership && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          {t.membership.current}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{t.membership.peakHours}</div>
                    <div className="text-xs text-gray-500">{t.membership.peakHoursDesc}</div>
                  </td>
                  {MEMBERSHIPS.map(m => (
                    <td key={m.id} className="text-center py-4 px-4 font-semibold text-gray-800">
                      {formatPrice(m.peakPrice)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{t.membership.offPeakHours}</div>
                    <div className="text-xs text-gray-500">{t.membership.offPeakHoursDesc}</div>
                  </td>
                  {MEMBERSHIPS.map(m => (
                    <td key={m.id} className="text-center py-4 px-4 font-semibold text-green-600">
                      {formatPrice(m.offPeakPrice)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div className="card p-6 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-6">{t.membership.transactions}</h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t.membership.noTransactions}</p>
          ) : (
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">{tx.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatPrice(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Toast toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
