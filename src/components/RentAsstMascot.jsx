import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// a product mascot (RentAsst, AIM2C): fixed at the bottom right of the RentAsst page, drops in from the top of the screen and bounces into place, then floats and tilts gently
export default function ProductMascot({ src, alt = 'Product mascot' }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShown(true), 1200); return () => clearTimeout(t) }, [])
  if (!shown) return null
  return (
    <div className="pointer-events-none fixed bottom-2 right-2 z-30 sm:bottom-3 sm:right-4">
      <motion.div initial={{ y: '-100vh', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ y: { type: 'spring', stiffness: 70, damping: 11, mass: 1.1 }, opacity: { duration: 0.3 } }}>
        <motion.img
          src={src} alt={alt} draggable="false" width="110" height="165"
          className="h-[7.5rem] w-auto select-none drop-shadow-[0_10px_16px_rgba(0,0,0,.35)] sm:h-[11rem]"
          style={{ transformOrigin: '50% 100%' }}
          animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, 2.5, 0, -2.5, 0] }}
          transition={{ y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
        />
      </motion.div>
    </div>
  )
}
