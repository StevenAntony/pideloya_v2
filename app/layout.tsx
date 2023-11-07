import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['cyrillic'], weight: ['100','300','400','500','700','900'] })

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
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
