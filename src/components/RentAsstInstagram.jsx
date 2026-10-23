import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import instagram from '../assets/products/instagram.png'

const URL = 'https://www.instagram.com/rentasst/'
const MAX_POPUPS = 3
const rand = (a, b) => a + Math.random() * (b - a)

// RentAsst page only: an Instagram icon fixed at the bottom left. A "Follow RentAsst" badge pops up at a random moment,
// then hides as soon as the visitor scrolls or clicks. It may come back a couple of times after a random pause, and stops once the icon is used.
export default function RentAsstInstagram() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)
  const shown = useRef(0)
  const done = useRef(false)

  useEffect(() => {
    let timer
    const schedule = (min, max) => {
      if (done.current || shown.current >= MAX_POPUPS) return
      timer = setTimeout(() => { shown.current += 1; setShow(true) }, rand(min, max) * 1000)
    }
    const hide = () => {
      setShow((open) => {
        if (open) schedule(14, 28)
        return false
      })
    }
    schedule(4, 9)
    const onAct = () => hide()
    window.addEventListener('scroll', onAct, { passive: true })
    window.addEventListener('pointerdown', onAct)
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onAct); window.removeEventListener('pointerdown', onAct) }
  }, [])

  return (
    <div className="fixed bottom-3 left-3 z-30 flex items-end gap-3 sm:bottom-4 sm:left-5">
      <motion.a
        href={URL} target="_blank" rel="noopener noreferrer" aria-label="Follow RentAsst on Instagram" title="RentAsst on Instagram"
        onClick={() => { done.current = true }}
        initial={{ scale: 0, rotate: -90, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 1.5 }}
        whileHover={{ scale: 1.12, rotate: -6 }} whileTap={{ scale: 0.92 }}
        className="relative block h-12 w-12 shrink-0 sm:h-14 sm:w-14"
      >
        {/* soft ripple behind the icon */}
        {!reduce && [0, 1].map((i) => (
          <motion.span key={i} aria-hidden="true" className="absolute inset-0 rounded-2xl bg-pink-500/40" animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }} />
        ))}
        <motion.img
          src={instagram} alt="" draggable="false" width="56" height="56"
          className="relative h-full w-full select-none drop-shadow-[0_8px_14px_rgba(0,0,0,.35)]"
          animate={reduce ? undefined : { y: [0, -4, 0], rotate: [0, -6, 6, -4, 0] }}
          transition={{ y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 } }}
        />
      </motion.a>

      <AnimatePresence>
        {show && (
          <motion.a
            href={URL} target="_blank" rel="noopener noreferrer" onClick={() => { done.current = true }}
            initial={{ opacity: 0, x: -16, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -10, scale: 0.9 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="relative mb-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 via-purple-700 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_-8px_rgba(80,40,160,.7)] hover:brightness-110"
          >
            {/* arrow pointing at the icon */}
            <span aria-hidden="true" className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-pink-600" />
            Follow RentAsst
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
