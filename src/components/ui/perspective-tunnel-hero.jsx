import { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useReducedMotion, useMotionValue, useSpring, useScroll } from 'framer-motion'

/**
 * Perspective tunnel gallery (adapted from the 21st.dev "perspective-tunnel-hero").
 * - `images` is a dynamic list: add as many as you like, the tunnel and the scroll length adapt.
 * - Driven by page scroll (sticky stage), so it never traps the mouse wheel.
 * - Falls back to a plain grid when the visitor prefers reduced motion.
 */
const SPRING = { stiffness: 60, damping: 25, mass: 0.5 }

const buildCards = (images) =>
  images.map((item, i) => {
    const a = i * 137.5 * (Math.PI / 180) // golden angle keeps any number of photos evenly spread
    return {
      item, index: i,
      cos: Math.cos(a), sin: Math.sin(a),
      rx: 0.28 + (i % 3) * 0.08, ry: 0.26 + (i % 2) * 0.09,
      rot: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
    }
  })

// Photos are shown whole: the card takes the picture's own shape (never cropped). Very tall pictures are capped at `maxHeight`
// and centred (object-contain), so they still show in full.
function Photo({ item, className = '', maxHeight }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-pd-navy shadow-2xl shadow-black/60 ring-1 ring-white/15 transition duration-500 hover:ring-pd-green/80 ${className}`}>
      {failed ? (
        <div className="aspect-[4/5] w-full bg-[radial-gradient(circle_at_30%_20%,#0078E8,transparent_60%),radial-gradient(circle_at_80%_90%,#01A95C,transparent_55%)] bg-pd-navy" />
      ) : (
        <img src={item.src} alt={item.title || 'ProcessDrive office'} draggable={false} loading="eager" decoding="async" onError={() => setFailed(true)} style={{ maxHeight }} className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105" />
      )}
      {item.title && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-8">
          <span className="font-display text-xs font-semibold uppercase tracking-widest text-white/95 sm:text-sm">{item.title}</span>
        </div>
      )}
    </div>
  )
}

function TunnelCard({ card, progress, pointer, total, stage }) {
  // keep roughly 5 photos in flight at once, however many there are
  const span = Math.min(0.55, Math.max(0.18, 5 / total))
  const start = (card.index / total) * (1 - span)
  const local = useTransform(progress, [start, start + span], [0, 1])
  const z = useTransform(local, [0, 1], [stage.isMobile ? -1200 : -1700, stage.isMobile ? 350 : 500])
  const opacity = useTransform(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0])
  const w = stage.isMobile ? Math.max(130, Math.min(180, stage.width * 0.38)) : Math.max(180, Math.min(270, stage.width * 0.18))
  const bx = card.cos * stage.width * card.rx
  const by = card.sin * stage.height * card.ry
  const pan = stage.isMobile ? 20 : 45
  const transform = useTransform([z, pointer.x, pointer.y], ([cz, px, py]) => `translate3d(calc(-50% + ${bx - px * pan}px), calc(-50% + ${by - py * pan}px), ${cz}px) rotateZ(${card.rot}deg)`)
  return (
    <motion.div style={{ width: w, transform, opacity, zIndex: card.index + 1 }} className="pointer-events-auto absolute left-1/2 top-1/2 select-none will-change-transform">
      <Photo item={card.item} maxHeight={Math.round(stage.height * (stage.isMobile ? 0.5 : 0.62))} />
    </motion.div>
  )
}

export default function PerspectiveTunnelHero({
  images = [],
  eyebrow = 'Life at ProcessDrive',
  title = 'Life Between Deployments',
  subtitle = '',
  hint = 'Scroll to fly through',
  id,
}) {
  const outer = useRef(null)
  const stageRef = useRef(null)
  const reduce = useReducedMotion()
  const [stage, setStage] = useState({ width: 1200, height: 700, isMobile: false })

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => { const r = el.getBoundingClientRect(); setStage({ width: r.width, height: r.height, isMobile: r.width < 768 }) }
    measure()
    const ro = new ResizeObserver(measure); ro.observe(el)
    return () => ro.disconnect()
  }, [reduce])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 })

  const rawX = useMotionValue(0), rawY = useMotionValue(0)
  const pointer = { x: useSpring(rawX, SPRING), y: useSpring(rawY, SPRING) }
  useEffect(() => {
    if (reduce) return
    const move = (e) => { rawX.set((e.clientX / window.innerWidth - 0.5) * 2); rawY.set((e.clientY / window.innerHeight - 0.5) * 2) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, rawX, rawY])

  const titleScale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1.25])
  const titleOpacity = useTransform(progress, [0, 0.08, 0.85, 1], [0.6, 1, 1, 0])
  const hintOpacity = useTransform(progress, [0, 0.1], [1, 0])

  if (!images.length) return null

  // Accessible fallback: a simple grid (also useful for printing / very low-power devices)
  if (reduce) {
    return (
      <section id={id} className="bg-pd-navy py-20 text-white">
        <div className="container-pd">
          <p className="eyebrow !border-white/20 !bg-white/10 !text-white/80">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h2>
          {subtitle && <p className="mt-4 max-w-2xl text-white/70">{subtitle}</p>}
          <div className="mt-10 grid grid-cols-2 items-start gap-4 md:grid-cols-4">
            {images.map((it) => <Photo key={it.src} item={it} />)}
          </div>
        </div>
      </section>
    )
  }

  const cards = buildCards(images)
  // more photos = more scroll distance to travel through them
  const lengthSvh = Math.min(900, Math.max(260, 140 + images.length * 40))

  return (
    <section id={id} ref={outer} style={{ height: `${lengthSvh}svh` }} className="relative bg-pd-navy" aria-label={title}>
      <div ref={stageRef} className="sticky top-[88px] flex h-[calc(100svh-88px)] w-full items-center justify-center overflow-hidden text-white" style={{ perspective: stage.isMobile ? '900px' : '1200px', transformStyle: 'preserve-3d' }}>
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,120,232,.22),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(1,169,92,.18),transparent_60%)]" />
        <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-pd-blue/25" />
        <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-white/10" />

        <motion.div style={{ scale: titleScale, opacity: titleOpacity }} className="pointer-events-none z-0 flex max-w-xl flex-col items-center px-6 text-center">
          <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.35em] text-pd-green">{eyebrow}</p>
          <h2 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">{title}</h2>
          {subtitle && <p className="mt-5 max-w-[42ch] text-sm font-light text-white/65 sm:text-base">{subtitle}</p>}
        </motion.div>

        <motion.div style={{ opacity: hintOpacity }} className="pointer-events-none absolute bottom-6 z-20 flex flex-col items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
          <span>{hint}</span>
          <div className="h-6 w-px bg-gradient-to-b from-pd-green to-transparent" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {cards.map((c) => <TunnelCard key={c.index} card={c} progress={progress} pointer={pointer} total={cards.length} stage={stage} />)}
        </div>
      </div>
    </section>
  )
}
