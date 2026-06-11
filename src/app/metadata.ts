import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rashid Kenya Adventures',
  description: 'Luxury private safari experiences in East Africa',
  manifest: '/manifest.json',
  themeColor: '#D4A75F',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Rashid Kenya',
  },
  icons: {
    apple: '/img-lion.jpg',
  },
}
