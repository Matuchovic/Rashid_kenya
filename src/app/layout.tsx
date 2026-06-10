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
