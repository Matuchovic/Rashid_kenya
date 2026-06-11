import { Navigation } from '@/components/layout/Navigation'
import { WhatsAppFAB } from '@/components/ui/MobileUX'
import { HeroSection } from '@/components/sections/HeroSection'
import { BigFiveSection } from '@/components/sections/BigFiveSection'
import { EarthSection } from '@/components/sections/EarthSection'
import { SafarisSection } from '@/components/sections/SafarisSection'
import { PackagesSection } from '@/components/sections/PackagesSection'
import { TransferSection } from '@/components/sections/TransferSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SocialSection } from '@/components/sections/SocialSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <EarthSection />
      <BigFiveSection />
      <SafarisSection />
      <PackagesSection />
      <TransferSection />
      <ExperienceSection />
      <SocialSection />
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
