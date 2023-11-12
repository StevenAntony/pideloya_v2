import type { Metadata } from 'next'
import { Inter, Roboto, Nunito_Sans } from 'next/font/google'
import './globals.css'
import AuthContextProvider from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['cyrillic'], weight: ['100','300','400','500','700','900'] })
const nunito = Nunito_Sans({subsets: ['latin'], weight:['200','1000','300','400','500','600','700','800','900']})

export const metadata: Metadata = {
  title: "Pideloya",
  description: "PWA application with Next 13",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
    { rel: "icon", url: "/icon-192x192.png" },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}><AuthContextProvider>{children}</AuthContextProvider></body>
    </html>
  )
}
