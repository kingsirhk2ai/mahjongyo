import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '預約成功 | 麻雀Yo! 麻將房',
  description: '您的麻將房預約已成功確認。',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BookingSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
