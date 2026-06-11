import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ember text-cream/70">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-display text-3xl text-cream mb-4" style={{ fontFamily: 'var(--font-family-display)' }}>
            Paila
          </h3>
          <p className="font-sans text-sm leading-relaxed mb-6">
            A family restaurant &amp; bar in the heart of Kathmandu.
            Warm food, warm people.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 border border-cream/20 flex items-center justify-center hover:border-copper hover:text-copper transition-colors text-xs"
            >
              f
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 border border-cream/20 flex items-center justify-center hover:border-copper hover:text-copper transition-colors text-xs"
            >
              ig
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-gold mb-5">Hours</p>
          <div className="space-y-2 font-sans text-sm">
            <div className="flex justify-between gap-6">
              <span className="text-cream/50">Mon – Fri</span>
              <span>11:00 AM – 10:00 PM</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-cream/50">Sat – Sun</span>
              <span>10:00 AM – 11:00 PM</span>
            </div>
          </div>
          <div className="mt-8">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-5">Navigate</p>
            <div className="grid grid-cols-2 gap-2 font-sans text-sm">
              {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About'], ['/gallery', 'Gallery'], ['/contact', 'Contact'], ['/reservations', 'Reservations']].map(([href, label]) => (
                <Link key={href} href={href} className="hover:text-cream transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-gold mb-5">Find Us</p>
          <address className="font-sans text-sm not-italic leading-relaxed space-y-2">
            <p>Thamel, Kathmandu, Nepal</p>
            <a href="tel:+977XXXXXXXXXX" className="block hover:text-cream transition-colors">
              +977 XX XXXX XXXX
            </a>
            <a href="mailto:hello@pailarestaurant.com" className="block hover:text-cream transition-colors">
              hello@pailarestaurant.com
            </a>
          </address>

          <div className="mt-8">
            <Link
              href="/reservations"
              className="inline-block bg-copper text-cream px-6 py-3 font-sans text-xs tracking-widest uppercase hover:bg-copper/90 transition-colors"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-cream/40">
            © {year} Paila Restaurant &amp; Bar. All rights reserved.
          </p>
          <p className="font-sans text-xs text-cream/40">
            Built by{' '}
            <a href="https://digi-loop.vercel.app" className="hover:text-cream/70 transition-colors">
              DigiLoop
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
