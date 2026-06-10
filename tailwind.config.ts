import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D9A441',
          light: '#F8B84E',
          pale: '#F5E6C8',
          dark: '#8B5E1E',
        },
        safari: {
          bg: '#050505',
          bg2: '#0a0600',
          bg3: '#0f0800',
          bg4: '#150900',
        },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(56px, 7vw, 96px)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(40px, 5vw, 64px)', { lineHeight: '1.0', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(32px, 4vw, 52px)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'sun-pulse': 'sunPulse 6s ease-in-out infinite',
        'particle': 'particleDrift linear infinite',
        'scroll-bounce': 'scrollBounce 2.2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.25,1,0.5,1) forwards',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sunPulse: {
          '0%, 100%': { opacity: '0.85', transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translateX(-50%) scale(1.04)' },
        },
        particleDrift: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-140px) translateX(40px)', opacity: '0' },
        },
        scrollBounce: {
          '0%, 100%': { opacity: '0.25', transform: 'scaleY(0.5)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        '40': '40px',
      },
      backgroundImage: {
        'hero-gradient': `
          radial-gradient(ellipse 60% 40% at 52% 18%, rgba(255,170,30,0.55) 0%, rgba(220,100,10,0.30) 35%, transparent 65%),
          linear-gradient(180deg, #0c0500 0%, #1e0c00 8%, #3d1e05 22%, #5c2e08 35%, #3d1800 52%, #1a0900 68%, #050505 100%)
        `,
        'gold-glow': 'radial-gradient(circle, rgba(217,164,65,0.15) 0%, transparent 70%)',
        'section-glow': 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,10,0,0.8) 0%, #050505 100%)',
      },
    },
  },
  plugins: [],
}

export default config
