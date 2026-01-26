import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LenisProvider } from '@/components/lenis-provider'
import './styles/globals.css'
import 'lenis/dist/lenis.css'
import { Footer } from "./components/footer"

const _inter = Inter({ subsets: ["latin", "cyrillic"] });
const _playfair = Playfair_Display({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: 'ЗАО «Большие Славени» — Сельскохозяйственное предприятие',
  description: 'ЗАО «Большие Славени» — сельскохозяйственное предприятие Могилевской области, специализирующееся на мясомолочном скотоводстве и зерновом хозяйстве.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <LenisProvider>
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
