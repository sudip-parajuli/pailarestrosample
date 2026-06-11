import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | Paila Restaurant & Bar',
  description: 'Find Paila Restaurant & Bar in Thamel, Kathmandu. Phone, email, map and directions.',
}

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="pt-36 pb-20 px-6 text-center"
        style={{ backgroundColor: 'var(--color-ember)' }}
      >
        <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}>
          Get in Touch
        </p>
        <h1 className="text-display font-display"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
          Contact Us
        </h1>
        <div className="divider-gold mt-6" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <h2 className="font-display text-3xl mb-8"
            style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
            Visit Paila
          </h2>

          <div className="space-y-8">
            {CONTACT_BLOCKS.map((block) => (
              <div key={block.label} className="flex gap-5">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0 text-lg"
                  style={{ backgroundColor: 'var(--color-bone)' }}
                >
                  {block.icon}
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'var(--color-mist)' }}>
                    {block.label}
                  </p>
                  {block.href ? (
                    <a href={block.href} className="font-sans text-sm hover:underline"
                      style={{ color: 'var(--color-ink)' }}>
                      {block.value}
                    </a>
                  ) : (
                    <p className="font-sans text-sm" style={{ color: 'var(--color-ink)' }}>
                      {block.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Opening Hours */}
          <div className="mt-12">
            <p className="font-sans text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--color-mist)' }}>
              Opening Hours
            </p>
            <div className="space-y-2">
              {[
                ['Monday – Friday', '11:00 AM – 10:00 PM'],
                ['Saturday – Sunday', '10:00 AM – 11:00 PM'],
                ['Public Holidays', '10:00 AM – 11:00 PM'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between gap-4 py-2"
                  style={{ borderBottom: '1px solid var(--color-bone)' }}>
                  <span className="font-sans text-sm" style={{ color: 'var(--color-mist)' }}>{day}</span>
                  <span className="font-sans text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            id="contact-book-table"
            href="/reservations"
            className="inline-block mt-10 px-8 py-4 font-sans text-sm tracking-widest uppercase"
            style={{ backgroundColor: 'var(--color-copper)', color: 'var(--color-cream)' }}
          >
            Book a Table
          </Link>
        </div>

        {/* Map placeholder */}
        <div>
          <div
            className="w-full aspect-square flex flex-col items-center justify-center gap-4"
            style={{ backgroundColor: 'var(--color-charcoal)' }}
          >
            <span className="text-5xl">📍</span>
            <p className="font-sans text-sm text-center" style={{ color: 'rgba(237,228,216,0.6)' }}>
              Thamel, Kathmandu, Nepal
            </p>
            <a
              id="contact-google-maps"
              href="https://maps.google.com/?q=Thamel,Kathmandu,Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs tracking-widest uppercase px-6 py-3 transition-colors"
              style={{ border: '1px solid rgba(247,240,230,0.3)', color: 'var(--color-cream)' }}
            >
              Open in Google Maps
            </a>
            <p className="font-sans text-xs text-center px-8"
              style={{ color: 'rgba(154,143,132,0.7)' }}>
              Add your Google Maps embed URL in Sanity → Site Settings → Google Maps Embed URL
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CONTACT_BLOCKS = [
  { icon: '📍', label: 'Address',   value: 'Thamel, Kathmandu 44600, Nepal',  href: null },
  { icon: '📞', label: 'Phone',     value: '+977 XX XXXX XXXX',                href: 'tel:+977XXXXXXXXXX' },
  { icon: '✉️', label: 'Email',     value: 'hello@pailarestaurant.com',         href: 'mailto:hello@pailarestaurant.com' },
  { icon: '📸', label: 'Instagram', value: '@pailarestaurant',                  href: 'https://instagram.com' },
]
