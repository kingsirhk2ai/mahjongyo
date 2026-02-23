'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Language } from '@/lib/i18n/translations'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ]

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
        <span>{languages.find(l => l.code === language)?.flag}</span>
        <span className="hidden sm:inline">{languages.find(l => l.code === language)?.label}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 mt-1 py-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
              language === lang.code
                ? 'bg-green-50 text-green-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
            {language === lang.code && (
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
