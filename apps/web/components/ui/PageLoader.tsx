'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate load progress
    const steps = [20, 45, 70, 90, 100]
    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setLoading(false), 300)
      }
    }, 180)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#1C0A00' }}
          exit={{
            clipPath: ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'],
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Restaurant name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: '#D4A853', fontFamily: 'var(--font-accent)' }}
            >
              Kathmandu
            </p>
            <h1
              className="text-6xl md:text-8xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#F7F0E6',
                fontWeight: 300,
                letterSpacing: '-0.02em',
              }}
            >
              Paila
            </h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48"
          >
            <div className="w-full h-px" style={{ backgroundColor: 'rgba(247,240,230,0.15)' }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: '#C4622D' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <p
              className="text-center mt-3 text-xs tracking-widest"
              style={{ color: 'rgba(247,240,230,0.3)', fontFamily: 'var(--font-sans)' }}
            >
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
