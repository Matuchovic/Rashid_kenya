import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { BigFiveSection } from '@/components/sections/BigFiveSection'
import { EarthSection } from '@/components/sections/EarthSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <EarthSection />
      <BigFiveSection />
      <ExperienceSection />
      <Footer />
    </>
  )
}
