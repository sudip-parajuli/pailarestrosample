'use client'
import TransitionLink from '@/components/ui/TransitionLink'
import { useEffect, useRef } from 'react'
import { urlFor } from '@/lib/sanity'
import { StaggerReveal, StaggerItem } from '@/components/ui/Reveal'
import Reveal from '@/components/ui/Reveal'

// ─── Unsplash fallbacks per dish name ────────────────────────────────────────
const FOOD_IMAGES: Record<string, string> = {
  default:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop',
  'Dal Bhat Tarkari':
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop',
  'Sekuwa Platter':
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop',
  'Jhol Momo':
    'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80&auto=format&fit=crop',
  'Thukpa Bowl':
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80&auto=format&fit=crop',
  'Sel Roti Dessert':
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80&auto=format&fit=crop',
  'Paila Old Fashioned':
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80&auto=format&fit=crop',
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Skip tilt on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotX = ((y - cy) / cy) * -8
      const rotY = ((x - cx) / cx) * 8
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
    }

    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    el.style.transition = 'transform 0.15s ease-out'
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default function MenuPreview({ items }: { items: any[] }) {
  // Fallback sample items shown when Sanity is not connected
  const FALLBACK_ITEMS = [
    {
      _id: 'f1',
      name: 'Dal Bhat Tarkari',
      description: 'Traditional Nepali set meal with steamed rice, lentil soup, seasonal vegetables, and house pickle.',
      price: 550,
      tags: ['Vegetarian', 'Signature'],
      image: null,
    },
    {
      _id: 'f2',
      name: 'Jhol Momo',
      description: 'Steamed dumplings served in a spiced, tangy tomato broth with sesame and timur pepper.',
      price: 380,
      tags: ['Popular', 'Spicy'],
      image: null,
    },
    {
      _id: 'f3',
      name: 'Sekuwa Platter',
      description: 'Charcoal-grilled marinated lamb and chicken skewers with chimichurri and house chutney.',
      price: 920,
      tags: ['Grill', 'Sharing'],
      image: null,
    },
    {
      _id: 'f4',
      name: 'Thukpa Bowl',
      description: 'Hand-pulled noodles in a rich bone broth with seasonal greens, soft egg, and chilli oil.',
      price: 450,
      tags: ['Soup', 'Noodles'],
      image: null,
    },
    {
      _id: 'f5',
      name: 'Sel Roti Dessert',
      description: 'Crispy rice-flour rings served warm with clotted cream, honey, and cardamom dust.',
      price: 280,
      tags: ['Dessert', 'Sweet'],
      image: null,
    },
    {
      _id: 'f6',
      name: 'Paila Old Fashioned',
      description: 'House cocktail with aged rum, timur-infused syrup, aromatic bitters, and orange peel.',
      price: 650,
      tags: ['Cocktail', 'Bar'],
      image: null,
    },
  ]

  const displayItems = items?.length > 0 ? items : FALLBACK_ITEMS

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F7F0E6' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <p
            className="text-base mb-3"
            style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: '#C4622D' }}
          >
            Our Specialties
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#1C0A00' }}
          >
            A Taste of Paila
          </h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item) => {
            const imgUrl =
              item.image?.asset?.url
                ? urlFor(item.image).width(600).height(450).quality(80).url()
                : FOOD_IMAGES[item.name] || FOOD_IMAGES.default

            return (
              <StaggerItem key={item._id}>
                <TiltCard>
                  {/* Full-bleed image */}
                  <div className="aspect-[4/3] overflow-hidden mb-5 relative group">
                    <img
                      src={imgUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Price badge on image */}
                    <span
                      className="absolute top-4 right-4 px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: '#C4622D',
                        color: '#F7F0E6',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      NPR {item.price}
                    </span>
                  </div>

                  {/* Text */}
                  <h3
                    className="font-display mb-2"
                    style={{ fontSize: '1.5rem', color: '#1C0A00' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ fontFamily: 'var(--font-sans)', color: '#9A8F84' }}
                  >
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags?.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 border"
                          style={{
                            fontFamily: 'var(--font-sans)',
                            color: '#9A8F84',
                            borderColor: 'rgba(154,143,132,0.3)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </TiltCard>
              </StaggerItem>
            )
          })}
        </StaggerReveal>

        {/* CTA */}
        <Reveal delay={0.3} className="text-center mt-16">
          <TransitionLink
            href="/menu"
            id="explore-menu-btn"
            className="explore-menu-btn inline-block px-10 py-4 text-sm tracking-widest uppercase"
            style={{
              fontFamily: 'var(--font-sans)',
              border: '1px solid #1C0A00',
              color: '#1C0A00',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#C4622D'
              el.style.color = '#F7F0E6'
              el.style.borderColor = '#C4622D'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'transparent'
              el.style.color = '#1C0A00'
              el.style.borderColor = '#1C0A00'
            }}
          >
            Explore Full Menu
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  )
}
