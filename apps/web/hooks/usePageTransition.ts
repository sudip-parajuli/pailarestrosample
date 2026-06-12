'use client'
/**
 * usePageTransition.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Drives the BurnTransition progress (0→1) on Next.js App Router navigation.
 *
 * How it works:
 *  1. On link click → intercept, start burn-IN animation (0→0.5, covering page)
 *  2. Mid-transition → trigger the actual Next.js navigation
 *  3. On new page mount → finish burn-OUT animation (0.5→1, revealing new page)
 *
 * The hook returns { progress, triggerTransition } where:
 *  - progress: number 0–1 passed directly to <BurnTransition progress={progress} />
 *  - isTransitioning: boolean — true while animation is running
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const BURN_IN_DURATION  = 550   // ms: cover the page (fire burns in)
const HOLD_DURATION     = 80    // ms: brief pause at full cover before navigating
const BURN_OUT_DURATION = 650   // ms: reveal new page (fire burns away)
const TOTAL = BURN_IN_DURATION + HOLD_DURATION + BURN_OUT_DURATION

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function usePageTransition() {
  const router   = useRouter()
  const pathname = usePathname()
  const [progress, setProgress]       = useState(1)       // start revealed
  const [isTransitioning, setIsTransitioning] = useState(false)
  const rafRef   = useRef<number>(0)
  const prevPath = useRef(pathname)

  // Cleanup on unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  /**
   * Call this instead of router.push() or use the TransitionLink component.
   * href: the destination route
   */
  const triggerTransition = useCallback((href: string) => {
    if (isTransitioning) return
    setIsTransitioning(true)

    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime

      if (elapsed < BURN_IN_DURATION) {
        // Phase 1: burn IN (1 → 0 — covering the screen)
        const t = easeInOut(elapsed / BURN_IN_DURATION)
        setProgress(lerp(1, 0, t))
        rafRef.current = requestAnimationFrame(animate)

      } else if (elapsed < BURN_IN_DURATION + HOLD_DURATION) {
        // Phase 2: hold at 0 (fully covered), then navigate
        setProgress(0)
        if (prevPath.current !== href) {
          prevPath.current = href
          router.push(href)
        }
        rafRef.current = requestAnimationFrame(animate)

      } else if (elapsed < TOTAL) {
        // Phase 3: burn OUT (0 → 1 — revealing new page)
        const t = easeInOut((elapsed - BURN_IN_DURATION - HOLD_DURATION) / BURN_OUT_DURATION)
        setProgress(lerp(0, 1, t))
        rafRef.current = requestAnimationFrame(animate)

      } else {
        // Done
        setProgress(1)
        setIsTransitioning(false)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [isTransitioning, router])

  return { progress, isTransitioning, triggerTransition }
}
