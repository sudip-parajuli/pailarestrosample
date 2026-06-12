'use client'
/**
 * TransitionProvider.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps the app in layout.tsx. Provides:
 *  - TransitionContext: { triggerTransition, isTransitioning }
 *  - Renders <BurnTransition progress={...} /> globally
 *
 * Add to layout.tsx:
 *   <TransitionProvider>
 *     <Navbar />
 *     <main>{children}</main>
 *     <Footer />
 *   </TransitionProvider>
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { createContext, ReactNode } from 'react'
import { usePageTransition } from '@/hooks/usePageTransition'
import BurnTransition from './BurnTransition'

interface TransitionContextType {
  triggerTransition: (href: string) => void
  isTransitioning: boolean
}

export const TransitionContext = createContext<TransitionContextType | null>(null)

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const { progress, isTransitioning, triggerTransition } = usePageTransition()

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
      {/* WebGL burn overlay — renders over everything during transitions */}
      <BurnTransition
        progress={progress}
        color={[0.11, 0.039, 0.0]}      // #1C0A00 ember
        edgeColor={[0.769, 0.384, 0.176]} // #C4622D copper
        noiseScale={2.8}
        edgeWidth={0.18}
        bloom={1.6}
      />
      {children}
    </TransitionContext.Provider>
  )
}
