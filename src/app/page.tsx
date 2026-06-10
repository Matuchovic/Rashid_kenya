import { AboutSection } from '@/components/sections/AboutSection'
import { HeroSection }        from '@/components/sections/HeroSection'
import { TickerStrip }         from '@/components/sections/TickerStrip'
import { SafarisSection }      from '@/components/sections/SafarisSection'
import { WhyKenyaSection }     from '@/components/sections/WhyKenyaSection'
import {
  ExperiencesSection,
  GallerySection,
  TestimonialsSection,
  CtaSection,
  BookingBar,
} from '@/components/sections/HomeSections'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TickerStrip />
      <SafarisSection />
      <div className="gold-divider mx-[72px]" />
      <WhyKenyaSection />
      <div className="gold-divider mx-[72px]" />
      <ExperiencesSection />
      <div className="gold-divider mx-[72px]" />
      <GallerySection />
      <div className="gold-divider mx-[72px]" />
      <TestimonialsSection />
      <CtaSection />
      <BookingBar />
      <Footer />
    </>
  )
}
