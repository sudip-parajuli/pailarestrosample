// apps/web/app/layout.tsx
// ─── REPLACE your existing layout.tsx with this file ─────────────────────────
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageLoader from '@/components/ui/PageLoader'
import CustomCursor from '@/components/ui/CustomCursor'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import TransitionProvider from '@/components/ui/TransitionProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pailarestrosample-web.vercel.app'
  ),
  title: {
    default: 'Paila Restaurant & Bar | Kathmandu',
    template: '%s | Paila Restaurant & Bar',
  },
  description:
    'A family restaurant and bar in the heart of Kathmandu. Authentic Nepali cuisine, craft cocktails, and warm hospitality.',
  openGraph: {
    title: 'Paila Restaurant & Bar',
    description: 'Authentic Nepali cuisine, craft cocktails, and warm hospitality in Kathmandu.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paila Restaurant & Bar',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${baskerville.variable}`}
    >
      <body className="antialiased" style={{ backgroundColor: '#F7F0E6', color: '#1A1208' }}>

        {/*
          TransitionProvider:
          - holds the WebGL BurnTransition canvas (renders on top of everything)
          - provides triggerTransition() via context to all TransitionLinks
          - wraps Navbar, children, Footer so they all share the same transition state
        */}
        <TransitionProvider>

          {/* First-load cinematic page loader */}
          <PageLoader />

          {/* Spring cursor — desktop only */}
          <CustomCursor />

          <Navbar />
          <main>{children}</main>
          <Footer />

          {/* Floating WhatsApp — updated to client's actual or mock number */}
          <WhatsAppButton phone="9779801234567" />

        </TransitionProvider>

      </body>
    </html>
  )
}
