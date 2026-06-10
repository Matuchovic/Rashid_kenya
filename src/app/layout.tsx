import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { CustomCursor } from '@/components/ui/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rashid Adventures Kenya — Luxury Safari & Wildlife Journeys',
  description:
    'Crafting intimate luxury safaris across Kenya\'s most extraordinary wilderness since 1997. Masai Mara, Amboseli, Tsavo, Samburu — witness Africa\'s greatest wildlife theatre.',
  keywords: 'Kenya safari, luxury safari, Masai Mara, Amboseli, wildlife, Africa travel, balloon safari',
  openGraph: {
    title: 'Rashid Adventures Kenya',
    description: 'Luxury Safari & Wildlife Journeys in Kenya',
    url: 'https://rashid-adventures.com',
    siteName: 'Rashid Adventures Kenya',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Elephant herd on the Kenyan savanna',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rashid Adventures Kenya',
    description: 'Luxury Safari & Wildlife Journeys',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-safari-bg text-white font-inter overflow-x-hidden cursor-none">
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
