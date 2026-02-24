'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast, { useToast } from '@/components/Toast'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface UserData {
  name: string
  email: string
  phone: string | null
  membership: string
  createdAt: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const { t, language } = useLanguage()

  // Profile fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profile')
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
      setName(data.user.name || '')
      setPhone(data.user.phone || '')
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error(t.common.somethingWrong)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error(t.profile.name + ' is required')
      return
    }

    setSavingProfile(true)
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      })

      if (!res.ok) {
        throw new Error('Failed to update')
      }

      const data = await res.json()
      setUserData(data.user)
      toast.success(t.profile.saved)
    } catch {
      toast.error(t.common.somethingWrong)
    } finally {
      setSavingProfile(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error(t.profile.passwordTooShort)
      return
    }

    if (newPassword !== confirmNewPassword) {
      toast.error(t.profile.passwordMismatch)
      return
    }

    setSavingPassword(true)
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.error === 'WRONG_PASSWORD') {
          toast.error(t.profile.wrongPassword)
        } else if (data.error === 'PASSWORD_TOO_SHORT') {
          toast.error(t.profile.passwordTooShort)
        } else {
          toast.error(t.common.somethingWrong)
        }
        return
      }

      toast.success(t.profile.passwordChanged)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch {
      toast.error(t.common.somethingWrong)
    } finally {
      setSavingPassword(false)
    }
  }

  const profileChanged = userData
    ? name.trim() !== userData.name || (phone.trim() || '') !== (userData.phone || '')
    : false

  const passwordReady = currentPassword && newPassword && confirmNewPassword

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-hero text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">{t.profile.title}</h1>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="skeleton h-48 rounded-2xl" />
            <div className="skeleton h-32 rounded-2xl" />
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
              <Link href="/" className="hover:text-white transition-colors">{t.profile.breadcrumb}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{t.profile.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold">{t.profile.title}</h1>
            <p className="mt-2 text-green-100">{t.profile.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Personal Info */}
        <div className="card p-6 animate-slide-up">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-green-600" />
            {t.profile.personalInfo}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.profile.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.profile.phone}
                <span className="text-gray-400 ml-1 font-normal">{t.profile.phoneOptional}</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9XXX XXXX"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile || !profileChanged}
              className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingProfile ? t.profile.saving : t.profile.save}
            </button>
          </div>
        </div>

        {/* Email (Read-only) */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <EmailIcon className="w-5 h-5 text-green-600" />
            {t.profile.email}
          </h3>
          <div>
            <input
              type="email"
              value={userData?.email || ''}
              disabled
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">{t.profile.emailReadonly}</p>
          </div>
        </div>

        {/* Change Password */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-green-600" />
            {t.profile.changePassword}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.profile.currentPassword}</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.profile.newPassword}</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.profile.confirmNewPassword}</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleChangePassword}
              disabled={savingPassword || !passwordReady}
              className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingPassword ? t.profile.saving : t.profile.changePassword}
            </button>
          </div>
        </div>

        {/* Membership Info */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-green-600" />
            {t.profile.membershipLevel}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t.profile.membershipLevel}</p>
              <p className="font-semibold text-gray-800 capitalize">{userData?.membership}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.profile.memberSince}</p>
              <p className="font-semibold text-gray-800">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString(
                      language === 'zh-TW' ? 'zh-TW' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )
                  : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toast toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}
