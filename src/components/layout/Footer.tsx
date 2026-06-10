import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

const FOOTER_LINKS = {
  Safaris: [
    { label: 'Masai Mara Migration',       href: '/safaris/masai-mara-migration' },
    { label: 'Amboseli & Kilimanjaro',     href: '/safaris/amboseli-kilimanjaro' },
    { label: 'Tsavo Big Five',             href: '/safaris/tsavo-big-five' },
    { label: 'Balloon Safari',             href: '/safaris/sunrise-balloon-safari' },
    { label: 'Samburu Reserve',            href: '/safaris/samburu-wildlife-reserve' },
    { label: 'Maasai Land & People',       href: '/safaris/maasai-land-people' },
  ],
  Experiences: [
    { label: 'Luxury Camps & Lodges',      href: '/#experiences' },
    { label: 'Maasai Cultural Walks',      href: '/#experiences' },
    { label: 'Photography Tours',          href: '/#experiences' },
    { label: 'Night Game Drives',          href: '/#experiences' },
    { label: 'Honeymoon Packages',         href: '/booking' },
    { label: 'Private Conservancies',      href: '/#experiences' },
  ],
  Company: [
    { label: 'Our Story',                  href: '/about' },
    { label: 'Meet the Guides',            href: '/about#guides' },
    { label: 'Conservation Fund',          href: '/about#conservation' },
    { label: 'Press & Awards',             href: '/about#press' },
    { label: 'Contact Us',                 href: '/contact' },
    { label: '+254 722 456 789',           href: 'tel:+254722456789' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-safari-bg2 border-t border-white/[0.06] pt-20 pb-10 px-[72px]">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-16 border-b border-white/[0.06]">

          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 text-sm text-muted leading-[1.75] max-w-[260px]">
              Crafting intimate luxury safaris across Kenya's most extraordinary wilderness
              since 1997. 27 years of guiding, conservation, and connection.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-[11px] font-medium tracking-[0.14em] text-dim uppercase mb-5">
                {section}
              </p>
              <ul className="flex flex-col gap-[10px] list-none">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted hover:text-white transition-colors duration-200 cursor-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-dim tracking-[0.06em]">
            © {new Date().getFullYear()} Rashid Adventures Kenya Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-dim">
            <span className="w-1 h-1 rounded-full bg-gold inline-block" />
            Trusted by 10,000+ Travelers
            <span className="w-1 h-1 rounded-full bg-gold inline-block" />
            KATO Member
            <span className="w-1 h-1 rounded-full bg-gold inline-block" />
            Eco-Certified
          </div>
        </div>
      </div>
    </footer>
  )
}
