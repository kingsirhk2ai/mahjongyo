import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '登入 | 麻雀Yo! 麻將房',
  description: '登入麻雀Yo帳戶，管理您的麻將房預約。Sign in to your MahjongYo account.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
