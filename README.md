# 🦁 Rashid Adventures Kenya

**Luxury Safari & Wildlife Journeys** — Full-stack Next.js 14 web application.

![Rashid Adventures Kenya](https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80&auto=format&fit=crop)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS design system
- **Fonts:** Cormorant Garamond (display) + Inter (UI)
- **Images:** Next.js Image optimization + Unsplash
- **Animations:** CSS custom keyframes + IntersectionObserver
- **Deployment:** Vercel

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Safaris, Kenya map, Experiences, Gallery, Testimonials |
| `/safaris` | Safari listing — all 6 curated journeys |
| `/safaris/[slug]` | Safari detail — full itinerary, highlights, booking widget |
| `/booking` | 6-step booking wizard — destination → dates → guests → accommodation → summary → checkout |
| `/about` | About page — story, team, conservation, timeline, press |
| `/contact` | Contact page — enquiry form, office details |
| `/api/contact` | POST endpoint for contact form submissions |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# Open http://localhost:3000
```

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** ✓

---

## Deploy to GitHub

```bash
# Initialize repository
git init
git add .
git commit -m "feat: initial Rashid Adventures Kenya — luxury safari platform"

# Create GitHub repo at github.com/new, then:
git remote add origin https://github.com/YOUR_USERNAME/rashid-adventures.git
git branch -M main
git push -u origin main
```

---

## Project Structure

```
rashid-adventures/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Design system CSS
│   │   ├── safaris/
│   │   │   ├── page.tsx        # Safari listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Safari detail
│   │   ├── booking/
│   │   │   └── page.tsx        # Booking wizard
│   │   ├── about/
│   │   │   └── page.tsx        # About us
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact form
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    # API: contact form
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx  # Sticky glass nav
│   │   │   └── Footer.tsx      # Footer
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Fullscreen hero + SVG terrain
│   │   │   ├── TickerStrip.tsx     # Gold ticker band
│   │   │   ├── SafarisSection.tsx  # Safari grid
│   │   │   ├── WhyKenyaSection.tsx # Kenya map + features
│   │   │   └── HomeSections.tsx    # Experiences, Gallery, Testimonials, CTA, BookingBar
│   │   └── ui/
│   │       ├── CustomCursor.tsx    # Animated gold cursor
│   │       ├── Logo.tsx            # SVG logo mark
│   │       ├── Reveal.tsx          # Scroll reveal wrapper
│   │       └── SafariCard.tsx      # Reusable safari card
│   └── lib/
│       ├── data.ts             # All safari, experience, testimonial data
│       └── utils.ts            # cn() utility
├── public/
│   └── favicon.svg
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── vercel.json
└── README.md
```

---

## Design System

**Colors:**
```
Gold:       #D9A441
Gold Light: #F8B84E
Gold Pale:  #F5E6C8
Background: #050505
BG Layer 2: #0a0600
```

**Typography:**
- Display: `Cormorant Garamond 300` — cinematic serif for headlines
- UI: `Inter 300/400/500` — clean system font for body + nav

**Key components:**
- `.eyebrow` — gold uppercase label with decorative line
- `.glass` — glassmorphism effect (blur + transparent border)
- `.btn-primary` — gold filled pill button
- `.btn-ghost` — transparent pill button with border
- `.safari-card` — dark card with hover lift + gold border glow
- `.reveal` — scroll-triggered fade-up animation

---

## Adding Email (Production)

Install Resend for transactional email:

```bash
npm install resend
```

Then update `src/app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'Rashid Adventures <noreply@rashidadventures.com>',
  to: 'hello@rashidadventures.com',
  subject: `New safari enquiry from ${name}`,
  html: `<p>${message}</p>`,
})
```

Add to Vercel env vars: `RESEND_API_KEY`

---

## License

© 2026 Rashid Adventures Kenya Ltd.
