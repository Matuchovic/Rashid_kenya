export interface Safari {
  id: string
  slug: string
  tag: string
  badge: string
  badgeEmoji: string
  name: string
  description: string
  longDescription: string
  duration: string
  accommodation: string
  price: number
  priceLabel: string
  image: string
  imageAlt: string
  highlights: string[]
  included: string[]
  itinerary: { day: number; title: string; description: string }[]
  bestSeason: string
  difficulty: string
  groupSize: string
  featured: boolean
}

export interface Experience {
  icon: string
  title: string
  description: string
  link: string
}

export interface Testimonial {
  initials: string
  name: string
  location: string
  safari: string
  rating: number
  text: string
}

export interface Destination {
  id: string
  name: string
  subtitle: string
  cx: number
  cy: number
  color: string
}

export const SAFARIS: Safari[] = [
  {
    id: '1',
    slug: 'masai-mara-migration',
    tag: 'Great Migration',
    badge: 'Most Popular',
    badgeEmoji: '🏆',
    name: 'Masai Mara Migration Safari',
    description:
      'Witness 1.5 million wildebeest thunder across the Mara River in one of nature\'s most breathtaking spectacles. Stay in an exclusive riverside camp with unobstructed views.',
    longDescription:
      'The Masai Mara Migration Safari is the definitive Kenya experience. Each July through October, the Mara River becomes the stage for the world\'s greatest wildlife drama — the crossing of over 1.5 million wildebeest, 200,000 zebra, and 500,000 gazelle completing their annual loop through the Serengeti–Mara ecosystem.\n\nYour private camp is positioned precisely where the crossings happen most frequently, chosen by guides with decades of field experience on the Mara. Each morning begins before dawn with coffee and a game drive briefing. Days unfold according to the animals — patient, unhurried, guided by instinct and expertise rather than a rigid schedule.\n\nEvery evening, return to camp for sundowners on the private deck, a four-course dinner prepared by your chef, and the sound of lions calling across the plains.',
    duration: '7 nights',
    accommodation: 'Private River Camp',
    price: 8400,
    priceLabel: 'per person',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Wildebeest crossing the Mara River during the Great Migration',
    highlights: [
      'Front-row access to the wildebeest river crossings',
      'Private camp with panoramic Mara River views',
      'Veteran naturalist guides with 20+ years on the Mara',
      'Unlimited twice-daily game drives in a private vehicle',
      'Bush dinners under the stars',
    ],
    included: [
      'All meals and beverages including house wines',
      'Twice-daily game drives in 4x4 vehicle',
      'Airport transfers (Nairobi or Keekorok airstrip)',
      'Masai cultural village visit',
      'All park fees and conservancy levies',
    ],
    itinerary: [
      { day: 1, title: 'Arrival · Nairobi to Masai Mara', description: 'Fly by light aircraft from Wilson Airport to Keekorok airstrip. Met by your guide for an afternoon game drive en route to camp. Sundowners on the Mara river bank, then a welcome dinner under the stars.' },
      { day: 2, title: 'The River · Crossing Watch', description: 'Pre-dawn departure to the Mara River crossing points. Spend the morning with herds massing on the bank — the tension, the false starts, then the explosive crossing. Afternoon rest and a private sundowner at a secret kopje.' },
      { day: 3, title: 'Big Cat Country', description: 'The Mara holds Africa\'s highest density of big cats. Track lion prides, cheetah coalitions, and leopards in the riverine forest. Afternoon balloon safari option available.' },
      { day: 4, title: 'Balloon Safari at Dawn', description: 'Rise at 5:30am for your hot air balloon flight over the Mara at golden hour. Drift silently above herds, then land in the bush for a champagne breakfast.' },
      { day: 5, title: 'Maasai Cultural Immersion', description: 'Walk at dawn with Maasai warriors. Learn to read animal tracks, throw a spear, and hear oral histories passed down through generations. Afternoon photography drive.' },
      { day: 6, title: 'Full Day in the Reserve', description: 'A full day following the wildebeest herds, exploring the Mara Triangle and Governor\'s Camp area. Evening game drive as the golden light turns everything amber.' },
      { day: 7, title: 'Final Morning · Departure', description: 'Last sunrise game drive before a bush brunch. Afternoon flight back to Nairobi, arriving in time for onward connections or an overnight at a Nairobi lodge.' },
    ],
    bestSeason: 'July – October',
    difficulty: 'Easy',
    groupSize: 'Max 6 guests',
    featured: true,
  },
  {
    id: '2',
    slug: 'amboseli-kilimanjaro',
    tag: 'Iconic Landscapes',
    badge: 'Premium',
    badgeEmoji: '✨',
    name: 'Amboseli & Kilimanjaro',
    description:
      'Photograph elephant herds against the backdrop of Africa\'s highest peak — an image found in every great wildlife collection. Amboseli\'s big-tusked bulls are legendary.',
    longDescription:
      'Amboseli National Park sits at the foot of Mount Kilimanjaro, and on clear mornings the snow-capped summit rises dramatically above the swamp where elephants drink. The park is famous for its large elephant herds, many led by big-tusked matriarchs that have been studied for over 50 years.\n\nYou will stay at a lodge positioned with direct sightlines to the swamp and the mountain, and photograph the herds in the early morning light that photographers travel from around the world to capture. But Amboseli is more than its postcards — lion prides, cheetah families, and over 400 bird species reward those who look beyond the headline act.',
    duration: '5 nights',
    accommodation: 'Luxury Lodge',
    price: 5800,
    priceLabel: 'per person',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Elephant herd with Mount Kilimanjaro in background',
    highlights: [
      'Big-tusked elephant herds up close',
      'Kilimanjaro backdrop photography sessions',
      'Swamp-side lodge with mountain views',
      'Night game drives in conservancy',
      '400+ bird species',
    ],
    included: [
      'Full board accommodation',
      'Twice-daily game drives',
      'Return flights from Nairobi',
      'All park fees',
      'Guided bird walk',
    ],
    itinerary: [
      { day: 1, title: 'Arrival · Amboseli', description: 'Fly from Nairobi to Amboseli airstrip. Afternoon game drive — first sightings of Kilimanjaro and the famous elephant herds.' },
      { day: 2, title: 'Elephant Families · The Swamp', description: 'Early morning drive to the swamp as elephant herds emerge for their morning drink, the mountain glowing behind them in the first light.' },
      { day: 3, title: 'Lions & Cheetahs', description: 'Track the big cat families that patrol Amboseli\'s open plains. Afternoon photography drive with your guide to the best vantage points.' },
      { day: 4, title: 'Maasai Boma Visit', description: 'Morning visit to a traditional Maasai community. Learn about coexistence with wildlife, hear stories, and share a meal with the elders.' },
      { day: 5, title: 'Departure · Final Safari', description: 'Dawn game drive for final Kilimanjaro views before bush breakfast and afternoon flight back to Nairobi.' },
    ],
    bestSeason: 'Year-round',
    difficulty: 'Easy',
    groupSize: 'Max 8 guests',
    featured: true,
  },
  {
    id: '3',
    slug: 'sunrise-balloon-safari',
    tag: 'Aerial Experience',
    badge: 'New 2026',
    badgeEmoji: '🎈',
    name: 'Sunrise Balloon Safari',
    description:
      'Drift silently over the Mara at golden hour, watching the world below come alive — then land for a champagne breakfast prepared by your private chef in the bush.',
    longDescription:
      'At 5:30am, the Masai Mara is still. Your balloon crew inflates the envelope in the darkness and you climb into the basket as the first glow appears on the horizon. For the next 60 minutes, you float silently over one of the world\'s greatest wildlife habitats — watching herds from above, seeing the landscape unfold in every direction, experiencing Africa as no vehicle can show you.\n\nOn landing — wherever the wind takes you — your chef has prepared a full champagne breakfast in the bush. Silver service, white linen, a table set in the middle of nowhere. The contrast between wilderness and elegance is the whole point.',
    duration: '1 day',
    accommodation: 'Dawn flight',
    price: 1850,
    priceLabel: 'per person',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Hot air balloon over the Masai Mara savanna at sunrise',
    highlights: [
      'One-hour flight over the Masai Mara',
      'Champagne breakfast in the bush on landing',
      'Certificate of achievement signed by pilot',
      'Pre-dawn camp pickup',
      'Professional balloon crew with perfect safety record',
    ],
    included: [
      'Hot air balloon flight (approx 60 min)',
      'Bush champagne breakfast after landing',
      'All transfers from your Mara camp',
      'Flight certificate',
    ],
    itinerary: [
      { day: 1, title: 'Dawn · Take-off · Land · Celebrate', description: 'Pickup at 5:30am from your camp. Meet your pilot and crew at the launch site as the balloon is inflated by torchlight. Take off at first light, drifting over herds below. Land wherever the wind guides you for a full champagne bush breakfast. Return to camp by 10am.' },
    ],
    bestSeason: 'July – October',
    difficulty: 'Easy',
    groupSize: 'Max 16 guests',
    featured: true,
  },
  {
    id: '4',
    slug: 'tsavo-big-five',
    tag: 'Wildlife Classic',
    badge: 'Big Five',
    badgeEmoji: '🦁',
    name: 'Tsavo Big Five Expedition',
    description:
      'Track Kenya\'s legendary red elephants and iconic Tsavo lions through vast wilderness untouched by mass tourism. Tsavo is wilder, rawer, and more authentic.',
    longDescription:
      'Tsavo is Kenya\'s largest national park — bigger than Switzerland — and outside of the migration season, it sees a fraction of the visitors that crowd the Mara. Here, the elephants are stained red by the iron-rich soil, the lions are mane-less and famous for their power, and the landscape changes dramatically from lava flows to acacia savanna to green riverine forest.\n\nYour camp sits inside a private conservancy bordering the park, with water holes that attract wildlife through the night. Evening drives through the conservancy offer encounters that the park itself rarely provides.',
    duration: '6 nights',
    accommodation: 'Bush Camp',
    price: 4600,
    priceLabel: 'per person',
    image: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Lions resting on the savanna in Tsavo',
    highlights: [
      'Kenya\'s legendary red elephants',
      'Mane-less Tsavo lions',
      'Private conservancy bordering the park',
      'Night game drives (not allowed in national parks)',
      'Guided bush walks with armed ranger',
    ],
    included: [
      'Full board accommodation',
      'Day and night game drives',
      'Guided walking safari',
      'All park and conservancy fees',
      'Return flights from Nairobi',
    ],
    itinerary: [
      { day: 1, title: 'Arrival · Tsavo West', description: 'Fly to Tsavo airstrip. Evening game drive through the lava flows of Tsavo West — spot elephant, buffalo, and the famous Mzima Springs.' },
      { day: 2, title: 'Red Elephants · Mudanda Rock', description: 'Full-day drive in Tsavo East. Watch hundreds of red elephants gather at Mudanda Rock — one of Kenya\'s great wildlife spectacles.' },
      { day: 3, title: 'Walking Safari · Bush Skills', description: 'Dawn walking safari with armed Maasai guide. Learn to track, read the landscape, and move silently through the bush.' },
      { day: 4, title: 'Night Game Drive', description: 'The conservancy comes alive after dark. Spot nocturnal animals invisible during the day — genet, aardvark, porcupine, and often hunting lions.' },
      { day: 5, title: 'Chyulu Hills · Green Hills of Africa', description: 'Drive into the dramatic Chyulu Hills — volcanic landscape with sweeping views to Kilimanjaro. Afternoon walking in the hills.' },
      { day: 6, title: 'Final Drive · Departure', description: 'Early morning game drive at the camp water hole, then bush brunch and afternoon flight back to Nairobi.' },
    ],
    bestSeason: 'June – October, Jan – Feb',
    difficulty: 'Moderate',
    groupSize: 'Max 6 guests',
    featured: false,
  },
  {
    id: '5',
    slug: 'maasai-land-people',
    tag: 'Cultural Immersion',
    badge: 'Cultural',
    badgeEmoji: '🏹',
    name: 'Maasai Land & People',
    description:
      'Walk at dawn with Maasai warriors, learning ancient tracking secrets and experiencing a culture that has coexisted with Africa\'s wildlife for centuries.',
    longDescription:
      'This is not a cultural show. You stay inside a working Maasai community on a conservancy bordering the Masai Mara, sleep in a luxury boma built to traditional architecture, and spend your days learning from warriors, elders, and women who live this life.\n\nThe walks are real — you will be tracking animals, not following a tourist route. The conversations are real — your Maasai guide speaks English and is as curious about your life as you are about his. And the wildlife is ever-present: from your boma you can hear buffalo at night, and during the day you will walk with game all around you.',
    duration: '4 nights',
    accommodation: 'Maasai Luxury Boma',
    price: 3200,
    priceLabel: 'per person',
    image: 'https://images.unsplash.com/photo-1504173010664-32509107de59?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Maasai warriors in traditional red shukas on the savanna',
    highlights: [
      'Stay inside a working Maasai community',
      'Dawn tracking walks with Maasai warriors',
      'Beadwork and traditional craft workshops',
      'Elder storytelling evenings by fire',
      'Game drives in private conservancy',
    ],
    included: [
      'Full board in luxury boma',
      'All cultural activities and walks',
      'Game drives in conservancy',
      'Community contribution fee',
      'Return transfers from Nairobi',
    ],
    itinerary: [
      { day: 1, title: 'Arrival · Welcome Ceremony', description: 'Drive from Nairobi or fly to Mara. Welcomed with a traditional Maasai ceremony, introduction to your warrior guide, and evening around the community fire.' },
      { day: 2, title: 'Dawn Walk · Tracking Skills', description: 'First light walk with warriors. Learn to identify animals by track and dung, move silently, and understand how the Maasai read landscape that looks empty to outsiders.' },
      { day: 3, title: 'Elders · Beadwork · Market Day', description: 'Morning with the elders hearing oral history. Afternoon beadwork session with the women. Visit a local Maasai market if timing allows.' },
      { day: 4, title: 'Final Walk · Departure', description: 'Last sunrise walk with your warrior guide. Gifts exchanged. Drive or fly back to Nairobi with a perspective on Kenya no game drive alone can give.' },
    ],
    bestSeason: 'Year-round',
    difficulty: 'Easy–Moderate',
    groupSize: 'Max 8 guests',
    featured: false,
  },
  {
    id: '6',
    slug: 'samburu-wildlife-reserve',
    tag: 'Off the Beaten Path',
    badge: 'Exclusive',
    badgeEmoji: '🌿',
    name: 'Samburu Wildlife Reserve',
    description:
      'Samburu hosts species found nowhere else in Kenya — the Reticulated Giraffe, Grevy\'s Zebra, and the Beisa Oryx. A reserve for the discerning traveller.',
    longDescription:
      'While the Mara draws crowds, Samburu in Kenya\'s north sits in dramatic semi-arid landscape where the Ewaso Nyiro River attracts dense concentrations of wildlife. The reserve is famous for its "Special Five" — species unique to northern Kenya that you will not find in any other park.\n\nLodges here sit directly on the river bank. Each morning, you wake to the sound of elephants drinking outside your tent. The Samburu people are Kenya\'s second great pastoralist culture, and a cultural visit here rounds a trip that feels genuinely remote and exclusive.',
    duration: '5 nights',
    accommodation: 'River Lodge',
    price: 5200,
    priceLabel: 'per person',
    image: 'https://images.unsplash.com/photo-1583768793026-1e73f84e8d3c?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Giraffe in Samburu landscape at sunset',
    highlights: [
      'The "Special Five" species of northern Kenya',
      'River-bank lodge with elephant sightings daily',
      'Samburu cultural experience',
      'Dramatically different landscape to southern parks',
      'Combines perfectly with Masai Mara or Laikipia',
    ],
    included: [
      'Full board river lodge',
      'Twice-daily game drives',
      'Cultural visit to Samburu community',
      'All park fees',
      'Return flights from Nairobi',
    ],
    itinerary: [
      { day: 1, title: 'Arrival · Samburu', description: 'Fly from Nairobi to Samburu airstrip. Afternoon game drive along the river — first sightings of Reticulated Giraffe and Beisa Oryx.' },
      { day: 2, title: 'Special Five · Morning Drive', description: 'Full morning searching for all five unique northern species. Grevy\'s Zebra is the rarest equid in the world — see them here.' },
      { day: 3, title: 'Samburu People · Cultural Day', description: 'Visit a traditional Samburu manyatta. The Samburu are cousins to the Maasai but with distinct traditions, clothing, and songs.' },
      { day: 4, title: 'River Walk · Birding', description: 'Dawn walk along the Ewaso Nyiro River with an armed ranger. Over 350 bird species including the extraordinary Vulturine Guineafowl.' },
      { day: 5, title: 'Final Drive · Departure', description: 'Last morning game drive at the river, then bush brunch and flight back to Nairobi.' },
    ],
    bestSeason: 'June – October, Jan – Feb',
    difficulty: 'Easy',
    groupSize: 'Max 8 guests',
    featured: false,
  },
]

export const EXPERIENCES: Experience[] = [
  {
    icon: '🏕️',
    title: 'Luxury Tented Camps',
    description: 'Hand-picked five-star camps with private plunge pools, panoramic savanna views, and a ratio of one guide to every two guests. Your wilderness, undisturbed.',
    link: '/experiences/camps',
  },
  {
    icon: '🎈',
    title: 'Balloon Safaris',
    description: 'Drift silently over the Mara at golden hour, tracking herds below. Land for a chef-prepared champagne breakfast as the sun rises over the African plains.',
    link: '/experiences/balloon',
  },
  {
    icon: '🏹',
    title: 'Maasai Experience',
    description: 'Walk with Maasai warriors at dawn. Learn to read animal tracks, throw a spear, and hear oral histories passed down through twenty generations of plains people.',
    link: '/experiences/maasai',
  },
  {
    icon: '📷',
    title: 'Photography Tours',
    description: 'Join award-winning wildlife photographers on exclusive game drives — modified vehicles, optimal light timing, and coaching from professionals who know every hotspot.',
    link: '/experiences/photography',
  },
  {
    icon: '🦓',
    title: 'Migration Expeditions',
    description: 'Follow the wildebeest crossing with expert-guided river camp stays, positioned precisely where the herds cross, timed by decades of accumulated field knowledge.',
    link: '/experiences/migration',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'SL',
    name: 'Sofia Lindqvist',
    location: 'Stockholm, Sweden',
    safari: 'Migration Safari',
    rating: 5,
    text: 'Rashid Adventures didn\'t just show us Kenya — they gave us Kenya. Our guide Mohammed knew the name of every bird, every tree, every track in the mud. An intelligence and warmth I have never encountered on any other trip.',
  },
  {
    initials: 'JK',
    name: 'James Kurosawa',
    location: 'Tokyo, Japan',
    safari: 'Balloon & Mara Safari',
    rating: 5,
    text: 'The balloon over the Mara at sunrise was, without question, the most beautiful morning of my entire life. We watched a lion kill below us as the horizon turned gold. I wept. My wife wept. Our guide smiled and poured champagne.',
  },
  {
    initials: 'AM',
    name: 'Amara Mensah',
    location: 'New York, USA',
    safari: '14-Day Grand Kenya Tour',
    rating: 5,
    text: 'Every detail — from the private jet transfer to the last sundowner under acacia trees — was curated with extraordinary care. Not luxury that performs itself, but luxury that disappears and lets Africa be the star.',
  },
]

export const DESTINATIONS: Destination[] = [
  { id: 'mara',    name: 'Masai Mara',  subtitle: 'Migration Hub',    cx: 110, cy: 225, color: '#D9A441' },
  { id: 'ambos',   name: 'Amboseli',    subtitle: 'Elephant Country', cx: 188, cy: 272, color: '#F8B84E' },
  { id: 'tsavo',   name: 'Tsavo',       subtitle: 'Red Elephants',    cx: 222, cy: 240, color: '#D9A441' },
  { id: 'nakuru',  name: 'Lake Nakuru', subtitle: 'Flamingo Lake',    cx: 140, cy: 170, color: '#F8B84E' },
  { id: 'samburu', name: 'Samburu',     subtitle: 'Rare Species',     cx: 185, cy: 118, color: '#D9A441' },
  { id: 'kenya',   name: 'Mt. Kenya',   subtitle: '5,199 m',          cx: 192, cy: 158, color: '#B0C8FF' },
]

export const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80&auto=format&fit=crop', alt: 'Wildebeest migration crossing', caption: 'Great Migration · Masai Mara' },
  { src: 'https://images.unsplash.com/photo-1583768793026-1e73f84e8d3c?w=600&q=80&auto=format&fit=crop', alt: 'Giraffe at sunset', caption: 'Reticulated Giraffe · Samburu' },
  { src: 'https://images.unsplash.com/photo-1551009175-15bdf9dcdc58?w=600&q=80&auto=format&fit=crop', alt: 'Lion portrait', caption: 'Lion · Tsavo West' },
  { src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80&auto=format&fit=crop', alt: 'Elephant herd on plains', caption: 'Elephant herd · Amboseli' },
  { src: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=600&q=80&auto=format&fit=crop', alt: 'Flamingos on Lake Nakuru', caption: 'Flamingos · Lake Nakuru' },
  { src: 'https://images.unsplash.com/photo-1504173010664-32509107de59?w=600&q=80&auto=format&fit=crop', alt: 'Maasai warriors', caption: 'Maasai warriors · Southern Mara' },
  { src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80&auto=format&fit=crop', alt: 'Safari sunrise landscape', caption: 'Golden hour · Laikipia' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&auto=format&fit=crop', alt: 'Hot air balloons over savanna', caption: 'Balloon safari · Masai Mara' },
]
