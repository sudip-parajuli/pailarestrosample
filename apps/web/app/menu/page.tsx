import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { MENU_QUERY } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Menu | Paila Restaurant & Bar',
  description: 'Explore our full menu of Nepali and modern dishes, grills, and craft cocktails.',
}

export const revalidate = 60

const TAG_COLORS: Record<string, string> = {
  veg:          'bg-green-100 text-green-800',
  vegan:        'bg-green-50 text-green-700',
  spicy:        'bg-red-100 text-red-700',
  bestseller:   'bg-amber-100 text-amber-800',
  new:          'bg-orange-100 text-orange-700',
  'gluten-free':'bg-gray-100 text-gray-600',
}

export default async function MenuPage() {
  let categories: {
    _id: string; title: string; description?: string; type?: string;
    items: { _id: string; name: string; description?: string; price?: number; tags?: string[]; image?: object }[]
  }[] = []

  try {
    categories = await client.fetch(MENU_QUERY)
  } catch {
    console.log('Sanity not connected — showing sample menu')
    categories = SAMPLE_MENU
  }

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Page hero */}
      <div
        className="pt-36 pb-20 px-6 text-center"
        style={{ backgroundColor: 'var(--color-ember)' }}
      >
        <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}>
          Paila Restaurant &amp; Bar
        </p>
        <h1 className="text-display font-display text-cream"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
          Our Menu
        </h1>
        <div className="divider-gold mt-6" />
        <p className="font-sans text-sm mt-6 max-w-md mx-auto"
          style={{ color: 'rgba(237,228,216,0.65)' }}>
          Seasonal ingredients, traditional techniques, modern presentation.
          Prices in Nepali Rupees (NPR).
        </p>
      </div>

      {/* Menu sections */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        {categories.map((cat) => (
          <section key={cat._id} id={`menu-${cat._id}`} className="mb-20">
            {/* Category header */}
            <div className="mb-10 pb-4" style={{ borderBottom: '1px solid var(--color-bone)' }}>
              <p className="font-sans text-xs tracking-widest uppercase mb-1"
                style={{ color: 'var(--color-mist)' }}>
                {cat.type ?? 'food'}
              </p>
              <h2 className="font-display text-heading"
                style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
                {cat.title}
              </h2>
              {cat.description && (
                <p className="font-sans text-sm mt-2" style={{ color: 'var(--color-mist)' }}>
                  {cat.description}
                </p>
              )}
            </div>

            {/* Items */}
            <div className="space-y-8">
              {cat.items?.map((item) => (
                <div key={item._id} className="grid md:grid-cols-[1fr_auto] gap-6 items-start group">
                  <div className="flex gap-5 items-start">
                    {(item.image as { asset?: { url?: string } })?.asset?.url && (
                      <div className="w-20 h-20 shrink-0 overflow-hidden">
                        <img
                          src={urlFor(item.image as Parameters<typeof urlFor>[0]).width(160).height(160).quality(80).url()}
                          alt={item.name}
                          className="img-bleed group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-xl mb-1"
                        style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ink)' }}>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="font-sans text-sm leading-relaxed"
                          style={{ color: 'var(--color-mist)' }}>
                          {item.description}
                        </p>
                      )}
                      {(item.tags?.length ?? 0) > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags!.map(tag => (
                            <span key={tag}
                              className={`text-xs px-2 py-0.5 rounded-sm font-sans ${TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {item.price && (
                    <p className="font-sans font-semibold text-sm shrink-0 mt-1"
                      style={{ color: 'var(--color-copper)' }}>
                      NPR {item.price.toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Reservation CTA */}
        <div
          className="text-center mt-12 py-12 px-6"
          style={{ backgroundColor: 'var(--color-bone)' }}
        >
          <p className="font-display text-2xl mb-4"
            style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
            Ready to dine?
          </p>
          <Link
            id="menu-book-table"
            href="/reservations"
            className="inline-block px-10 py-4 font-sans text-sm tracking-widest uppercase"
            style={{ backgroundColor: 'var(--color-copper)', color: 'var(--color-cream)' }}
          >
            Book a Table
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Fallback sample menu ─────────────────────────────────────
const SAMPLE_MENU = [
  {
    _id: 'starters', title: 'Starters', type: 'food',
    description: 'Small plates to awaken the palate.',
    items: [
      { _id: 's1', name: 'Jhol Momo', description: 'Steamed dumplings in spiced tomato broth', price: 380, tags: ['veg', 'spicy'] },
      { _id: 's2', name: 'Choyla', description: 'Newari-spiced grilled buffalo with ginger, garlic and mustard oil', price: 450, tags: ['spicy', 'bestseller'] },
      { _id: 's3', name: 'Chatamari', description: 'Rice flour crepe with minced meat, egg and herbs — the Newari pizza', price: 320, tags: ['new'] },
    ],
  },
  {
    _id: 'mains', title: 'Mains', type: 'food',
    description: 'Hearty dishes from the heart of Nepal.',
    items: [
      { _id: 'm1', name: 'Dal Bhat Tarkari', description: 'Complete Nepali set — lentil soup, seasonal vegetables, rice, pickles, ghee', price: 450, tags: ['veg', 'bestseller'] },
      { _id: 'm2', name: 'Sekuwa Platter', description: 'Charcoal-grilled lamb and chicken with mint chutney, roasted potatoes', price: 950, tags: ['spicy'] },
      { _id: 'm3', name: 'Thakali Khana', description: 'Thakali-style platter with buckwheat bread, gundruk, and seasonal accompaniments', price: 620, tags: ['veg'] },
      { _id: 'm4', name: 'Thukpa Bowl', description: 'Hand-pulled noodles in rich bone broth, egg, vegetables, crispy shallots', price: 520, tags: ['spicy'] },
    ],
  },
  {
    _id: 'desserts', title: 'Desserts', type: 'food',
    description: 'Sweet endings, Nepali style.',
    items: [
      { _id: 'd1', name: 'Sel Roti', description: 'Crispy rice-flour rings, local honey, churpi cream', price: 280, tags: ['veg', 'new'] },
      { _id: 'd2', name: 'Kheer', description: 'Cardamom rice pudding slow-cooked with saffron and pistachios', price: 250, tags: ['veg', 'gluten-free'] },
    ],
  },
  {
    _id: 'bar', title: 'Bar', type: 'drinks',
    description: 'Craft cocktails inspired by the Himalayas.',
    items: [
      { _id: 'b1', name: 'Paila Old Fashioned', description: 'Aged Nepali rum, muddled cardamom, jaggery syrup, hand-carved ice', price: 750, tags: ['bestseller'] },
      { _id: 'b2', name: 'Yarsa Sour', description: 'Yarsagumba-infused spirit, fresh lemon, egg white, cardamom bitters', price: 820, tags: ['new'] },
      { _id: 'b3', name: 'Timur Mule', description: 'Vodka, Timur pepper syrup, ginger beer, kaffir lime', price: 680, tags: ['spicy'] },
    ],
  },
]
