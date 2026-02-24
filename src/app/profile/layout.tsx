import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '個人資料 | 麻雀Party Room',
  description: '管理您的帳戶資料。Profile - manage your account details.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
