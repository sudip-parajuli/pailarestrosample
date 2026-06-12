'use client'
/**
 * TransitionLink.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in replacement for next/link that fires the burn transition instead of
 * an instant navigation. Uses the shared TransitionContext.
 *
 * Replace:
 *   import Link from 'next/link'
 *   <Link href="/menu">View Menu</Link>
 *
 * With:
 *   import TransitionLink from '@/components/ui/TransitionLink'
 *   <TransitionLink href="/menu">View Menu</TransitionLink>
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useContext, MouseEvent, ReactNode, AnchorHTMLAttributes } from 'react'
import { TransitionContext } from './TransitionProvider'

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  className?: string
}

export default function TransitionLink({
  href,
  children,
  className = '',
  onClick,
  ...rest
}: TransitionLinkProps) {
  const ctx = useContext(TransitionContext)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let external links, cmd+click, and anchor links pass through normally
    if (
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      href.startsWith('#') ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      onClick?.(e)
      return
    }

    e.preventDefault()
    onClick?.(e)

    // Use context trigger if available (inside TransitionProvider)
    if (ctx?.triggerTransition) {
      ctx.triggerTransition(href)
    } else {
      // Fallback: navigate directly
      window.location.href = href
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
