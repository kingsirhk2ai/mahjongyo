import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '註冊 | 麻雀Yo! 麻將房',
  description: '免費註冊麻雀Yo帳戶，立即享受「高手」會員優惠價格。繁忙時段 $380、非繁忙時段 $290。Create your MahjongYo account today.',
  openGraph: {
    title: '免費註冊 | 麻雀Yo!',
    description: '立即註冊享受高手會員優惠價格',
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
