import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface MenuItem {
  _id: string
  name: string
  description?: string
  price?: number
  tags?: string[]
  image?: object
  category?: { title: string }
}

const TAG_COLORS: Record<string, string> = {
  veg:         'border-green-600/40 text-green-700',
  vegan:       'border-green-500/40 text-green-600',
  spicy:       'border-red-500/40 text-red-600',
  bestseller:  'border-gold/60 text-gold',
  new:         'border-copper/50 text-copper',
  'gluten-free': 'border-mist/40 text-mist',
}

export default function MenuPreview({ items }: { items: MenuItem[] }) {
  // Fallback sample items if Sanity not connected
  const displayItems = items?.length > 0 ? items : SAMPLE_ITEMS

  return (
    <section id="menu-preview" className="py-24 px-6" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-copper)' }}>
            Our Specialties
          </p>
          <h2 className="text-display font-display"
            style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
            A Taste of Paila
          </h2>
          <div className="divider-gold mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayItems.map((item) => (
            <article key={item._id} className="group cursor-pointer">
              {/* Full-bleed image */}
              <div className="aspect-[4/3] overflow-hidden mb-5">
                {(item.image as { asset?: { url?: string } })?.asset?.url ? (
                  <img
                    src={urlFor(item.image as Parameters<typeof urlFor>[0]).width(600).height(450).quality(80).url()}
                    alt={item.name}
                    className="img-bleed group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-bone)' }}
                  >
                    <span className="text-4xl">🍽️</span>
                  </div>
                )}
              </div>

              {/* Meta */}
              {item.category && (
                <p className="font-sans text-xs tracking-widest uppercase mb-2"
                  style={{ color: 'var(--color-mist)' }}>
                  {item.category.title}
                </p>
              )}

              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-2xl"
                  style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
                  {item.name}
                </h3>
                {item.price && (
                  <span className="font-sans font-medium text-sm mt-1 ml-2 shrink-0"
                    style={{ color: 'var(--color-copper)' }}>
                    NPR {item.price.toLocaleString()}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="font-sans text-sm leading-relaxed"
                  style={{ color: 'var(--color-mist)' }}>
                  {item.description}
                </p>
              )}

              {(item.tags?.length ?? 0) > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {item.tags!.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-sans border px-2 py-0.5 ${TAG_COLORS[tag] ?? 'border-mist/30 text-mist'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            id="menu-preview-cta"
            href="/menu"
            className="inline-block px-10 py-4 font-sans text-sm tracking-widest uppercase border border-ember text-ember hover:bg-ember hover:text-cream transition-colors"
          >
            Explore Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Fallback sample data ─────────────────────────────────────
const SAMPLE_ITEMS: MenuItem[] = [
  {
    _id: '1',
    name: 'Dal Bhat Tarkari',
    description: 'Traditional Nepali set — lentil soup, seasonal vegetables, rice, pickles, and ghee. A taste of home.',
    price: 450,
    tags: ['veg', 'bestseller'],
    category: { title: 'Mains' },
  },
  {
    _id: '2',
    name: 'Sekuwa Platter',
    description: 'Charcoal-grilled marinated lamb and chicken skewers served with mint chutney and roasted potatoes.',
    price: 950,
    tags: ['spicy', 'bestseller'],
    category: { title: 'Grills' },
  },
  {
    _id: '3',
    name: 'Jhol Momo',
    description: 'Steamed dumplings in a tangy, spiced tomato broth. A Kathmandu street-food icon, elevated.',
    price: 380,
    tags: ['veg', 'spicy', 'new'],
    category: { title: 'Starters' },
  },
  {
    _id: '4',
    name: 'Thukpa Bowl',
    description: 'Hand-pulled noodles in a rich bone broth with egg, vegetables and crispy shallots.',
    price: 520,
    tags: ['spicy'],
    category: { title: 'Soups' },
  },
  {
    _id: '5',
    name: 'Sel Roti Dessert',
    description: 'Crispy rice-flour rings drizzled with local honey and served with churpi cream.',
    price: 280,
    tags: ['veg', 'new'],
    category: { title: 'Desserts' },
  },
  {
    _id: '6',
    name: 'Paila Old Fashioned',
    description: 'Nepali aged rum, muddled cardamom, jaggery syrup, and a single block of hand-carved ice.',
    price: 750,
    tags: ['bestseller'],
    category: { title: 'Bar' },
  },
]
