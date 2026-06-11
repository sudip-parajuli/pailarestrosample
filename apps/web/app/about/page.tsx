import type { Metadata } from 'next'
import About from '@/components/sections/About'
import ReservationCTA from '@/components/sections/ReservationCTA'

export const metadata: Metadata = {
  title: 'About | Paila Restaurant & Bar',
  description: 'Learn the story behind Paila — a family restaurant celebrating Nepali food culture in Kathmandu.',
}

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Page hero */}
      <div
        className="pt-36 pb-20 px-6 text-center"
        style={{ backgroundColor: 'var(--color-ember)' }}
      >
        <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}>
          Who We Are
        </p>
        <h1 className="text-display font-display"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
          Our Story
        </h1>
        <div className="divider-gold mt-6" />
      </div>

      {/* About section (reusing homepage component) */}
      <About data={null} />

      {/* Team section */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-bone)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-copper)' }}>
            The People
          </p>
          <h2 className="text-heading font-display mb-16"
            style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
            Behind Every Plate
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                  style={{ backgroundColor: 'var(--color-charcoal)' }}
                >
                  {member.emoji}
                </div>
                <h3 className="font-display text-xl mb-1"
                  style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
                  {member.name}
                </h3>
                <p className="font-sans text-xs tracking-widest uppercase mb-3"
                  style={{ color: 'var(--color-copper)' }}>
                  {member.role}
                </p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-mist)' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReservationCTA />
    </div>
  )
}

const TEAM = [
  {
    name: 'Ama Lhamo',
    role: 'Head Chef & Co-founder',
    emoji: '👩‍🍳',
    bio: 'Trained in Pokhara and refined in Kathmandu\'s finest kitchens. Ama brings thirty years of family recipes to every dish.',
  },
  {
    name: 'Suraj Maharjan',
    role: 'Bar Director',
    emoji: '🍸',
    bio: 'A Newari botanist-turned-bartender whose cocktails read like love letters to the Himalayas.',
  },
  {
    name: 'Priya Shrestha',
    role: 'General Manager',
    emoji: '🌟',
    bio: 'Priya ensures every guest leaves feeling like a member of the Paila family.',
  },
]
