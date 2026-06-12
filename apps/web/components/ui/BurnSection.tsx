'use client'
/**
 * BurnSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Container wrapper that implements the Shopify Winter '26 scroll-driven burn transition.
 * As this section enters the viewport, a WebGL fire edge burns from top to bottom,
 * revealing this section over the previous section.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import ScrollBurnEdge from './ScrollBurnEdge'

interface BurnSectionProps {
  children: React.ReactNode
  overlayColor?: [number, number, number]
  edgeColor?: [number, number, number]
  direction?: 0 | 1
}

export default function BurnSection({
  children,
  overlayColor = [0.11, 0.039, 0.0], // Default Paila ember
  edgeColor = [0.769, 0.384, 0.176],   // Default copper glow
  direction = 0,
}: BurnSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track the entering scroll window:
  // - start end: top of target enters bottom of viewport (scrollYProgress = 0)
  // - start start: top of target reaches top of viewport (scrollYProgress = 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 
        ScrollBurnEdge canvas covers the visible viewport portion of the entering section.
        We set its height to h-screen and position it absolute at the top so it matches
        the screen height exactly as the top of the section enters the screen.
      */}
      <ScrollBurnEdge
        progress={scrollYProgress}
        direction={direction}
        color={overlayColor}
        edgeColor={edgeColor}
        className="absolute top-0 left-0 right-0 z-30 h-screen w-full"
      />
      {children}
    </div>
  )
}
