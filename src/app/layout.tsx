'use client'
import { useState } from 'react'
import { DustParticles } from '@/components/ui/DustParticles'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { NextFont } from 'next/dist/compiled/@next/font'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <html lang="en">
      <body>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
        <DustParticles />
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
