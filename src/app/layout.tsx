'use client'
import { useState } from 'react'
import { LanguageProvider } from '@/context/LanguageContext'
import { LenisProvider } from '@/components/ui/LenisProvider'
import { FilmGrain } from '@/components/ui/FilmGrain'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { NextFont } from 'next/dist/compiled/@next/font'
import './globals.css'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Luxury private safari experiences in Kenya & East Africa. Big Five, Tsavo, Amboseli, Diani Beach. Personal service by Rashid." />
        <meta property="og:title" content="Rashid Kenya Adventures — Luxury Safari" />
        <meta property="og:description" content="Private luxury safaris in Kenya. See the Big Five with your personal guide Rashid. Tsavo, Amboseli, Salt Lick Lodge, Diani Beach." />
        <meta property="og:image" content="https://rashid-kenya.vercel.app/img-lion.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rashid-kenya.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rashid Kenya Adventures" />
        <meta name="twitter:description" content="Private luxury safaris in Kenya. Big Five, Tsavo, Amboseli." />
        <meta name="twitter:image" content="https://rashid-kenya.vercel.app/img-lion.jpg" />
        <meta name="keywords" content="Kenya safari, luxury safari, private safari, Big Five, Tsavo, Amboseli, Diani Beach, Mombasa, East Africa safari" />
        <link rel="canonical" href="https://rashid-kenya.vercel.app" />
      </head>
      <body>
        <LanguageProvider>
        <FilmGrain />
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
          {children}
        </div>
      </LanguageProvider>
      </body>
    </html>
  )
}
