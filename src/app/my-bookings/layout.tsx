import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的預約 | 麻雀Yo! 麻將房',
  description: '查看及管理您的麻將房預約。View and manage your mahjong room bookings.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function MyBookingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
