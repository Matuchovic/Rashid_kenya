'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Safaris',      href: '/safaris' },
  { label: 'Experiences',  href: '/#experiences' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Gallery',      href: '/#gallery' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
]

export function Navigation() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-48px)] max-w-[1180px]',
          'flex items-center justify-between rounded-full px-7 py-3.5',
          'glass-nav transition-all duration-300',
          scrolled && 'scrolled',
        )}
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-8 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs font-normal text-muted hover:text-white transition-colors duration-200 tracking-[0.06em] cursor-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/booking"
          className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-6"
        >
          Book Safari →
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white cursor-none p-1"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] flex flex-col pt-28 px-8 pb-12"
          style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(40px)' }}
        >
          <ul className="flex flex-col gap-6 list-none">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-3xl font-cormorant font-light text-white hover:text-gold transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/booking"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-auto text-center justify-center"
          >
            Book Safari →
          </Link>
        </div>
      )}
    </>
  )
}
