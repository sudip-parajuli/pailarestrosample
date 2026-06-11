'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',            label: 'Home' },
  { href: '/menu',        label: 'Menu' },
  { href: '/about',       label: 'About' },
  { href: '/gallery',     label: 'Gallery' },
  { href: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-ember/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl text-cream tracking-wide" style={{ fontFamily: 'var(--font-family-display)' }}>
          Paila
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-sans text-sm tracking-widest uppercase transition-colors
                ${pathname === l.href ? 'text-cream' : 'text-cream/70 hover:text-cream'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reservations"
            className="bg-copper text-cream px-6 py-2.5 font-sans text-sm tracking-widest
                       uppercase hover:bg-copper/90 transition-colors"
          >
            Book a Table
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden text-cream flex flex-col gap-1.5 p-1"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out
          ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-ember/98 backdrop-blur-sm px-6 pb-8 pt-2 flex flex-col gap-5 border-t border-cream/10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-cream/80 text-sm tracking-widest uppercase hover:text-cream transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reservations"
            className="bg-copper text-cream px-6 py-3 text-center font-sans text-sm tracking-widest uppercase hover:bg-copper/90 transition-colors"
          >
            Book a Table
          </Link>
        </div>
      </div>
    </nav>
  )
}
