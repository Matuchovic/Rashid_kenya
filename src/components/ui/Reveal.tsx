'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
  threshold?: number
}

const delayClass: Record<number, string> = {
  0: '',
  1: 'reveal-delay-1',
  2: 'reveal-delay-2',
  3: 'reveal-delay-3',
  4: 'reveal-delay-4',
}

export function Reveal({ children, className, delay = 0, threshold = 0.12 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={cn('reveal', delayClass[delay], className)}>
      {children}
    </div>
  )
}
