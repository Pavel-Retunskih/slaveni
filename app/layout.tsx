import React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import { LenisProvider } from '@/shared/components/lenis-provider'
import '..//styles/globals.css'
import 'lenis/dist/lenis.css'

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
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${process.env.NEXT_PUBLIC_YA_METRIKA_ID}', 'ym');

    ym(106462502, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `.replace(/\s{2,}/g, " ")
          }}
        />
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YA_METRIKA_ID ?? ""}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
        <LenisProvider>
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
