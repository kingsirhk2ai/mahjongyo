import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '預約麻將房 | 麻雀Yo! 麻將房',
  description: '立即預約麻將房。選擇日期和時間，輕鬆完成預約。會員享受優惠價格。Book your mahjong room.',
  openGraph: {
    title: '預約麻將房 | 麻雀Yo!',
    description: '立即預約麻將房，會員享受優惠價格',
  },
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
