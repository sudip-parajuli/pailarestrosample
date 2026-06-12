'use client'
/**
 * Navbar.tsx — uses TransitionLink so all nav clicks trigger the burn effect
 */
import { useState, useEffect } from 'react'
import TransitionLink from '@/components/ui/TransitionLink'

const links = [
  { href: '/',             label: 'Home'         },
  { href: '/menu',         label: 'Menu'         },
  { href: '/about',        label: 'About'        },
  { href: '/gallery',      label: 'Gallery'      },
  { href: '/contact',      label: 'Contact'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(28,10,0,0.96)' : 'transparent',
        backdropFilter:   scrolled ? 'blur(12px)' : 'none',
        boxShadow:        scrolled ? '0 1px 0 rgba(247,240,230,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo — also uses TransitionLink */}
        <TransitionLink
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: '#F7F0E6',
            letterSpacing: '0.03em',
            fontWeight: 300,
          }}
        >
          Paila
        </TransitionLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <TransitionLink
              key={l.href}
              href={l.href}
              className="transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(247,240,230,0.72)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F7F0E6')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(247,240,230,0.72)')}
            >
              {l.label}
            </TransitionLink>
          ))}

          <TransitionLink
            href="/reservations"
            className="transition-opacity duration-200 hover:opacity-85"
            style={{
              backgroundColor: '#C4622D',
              color: '#F7F0E6',
              padding: '0.55rem 1.4rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Book a Table
          </TransitionLink>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ cursor: 'none' }} // respect custom cursor
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block transition-all duration-300"
              style={{
                width: '22px',
                height: '1.5px',
                backgroundColor: '#F7F0E6',
                opacity: 0.8,
                transform:
                  open
                    ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'scaleX(0)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open ? '400px' : '0',
          backgroundColor: 'rgba(28,10,0,0.97)',
        }}
      >
        <div className="px-6 pb-8 pt-2 flex flex-col gap-6">
          {links.map((l) => (
            <TransitionLink
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(247,240,230,0.72)',
              }}
            >
              {l.label}
            </TransitionLink>
          ))}
          <TransitionLink
            href="/reservations"
            onClick={() => setOpen(false)}
            className="text-center"
            style={{
              backgroundColor: '#C4622D',
              color: '#F7F0E6',
              padding: '0.85rem 1.5rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Book a Table
          </TransitionLink>
        </div>
      </div>
    </nav>
  )
}
