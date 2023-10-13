import './globals.css'
import type { Metadata } from 'next'
import { Gabarito } from 'next/font/google'

const inter = Gabarito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pickem Tracker',
  description: 'Acompanhe os dados do bolão do mundial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gray-950'}>{children}</body>
    </html>
  )
}
