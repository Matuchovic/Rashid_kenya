'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <html lang="en">
      <body>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
