import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'

const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((x) => x[0]).join('')

// Photos: drop files into src/assets/team/ named after the person, e.g. saravanan-sivalingam.jpg (jpg/jpeg/png/webp).
// Anyone without a matching file keeps the initials avatar.
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const photoFiles = import.meta.glob('../../assets/team/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' })
const photos = Object.fromEntries(Object.entries(photoFiles).map(([path, url]) => [slug(path.split('/').pop().replace(/\.[^.]+$/, '')), url]))
const photoOf = (n) => photos[slug(n)]

function Face({ name, className = '' }) {
  const src = photoOf(name)
  return src ? <img src={src} alt={name} loading="lazy" draggable="false" className={`h-full w-full rounded-full object-cover ${className}`} /> : initials(name)
}

// orbit radius / avatar size per breakpoint
const SIZES = {
  xs: { radius: 100, node: 40, card: 'w-40', avatar: 'h-16 w-16 -mt-11 text-lg', name: 'text-sm' },
  sm: { radius: 120, node: 46, card: 'w-44', avatar: 'h-[4.5rem] w-[4.5rem] -mt-12 text-xl', name: 'text-base' },
  md: { radius: 150, node: 54, card: 'w-48', avatar: 'h-20 w-20 -mt-14 text-2xl', name: 'text-base' },
  lg: { radius: 225, node: 80, card: 'w-72', avatar: 'h-32 w-32 -mt-20 text-4xl', name: 'text-xl' },
}

function useScreen() {
  const [s, setS] = useState('lg')
  useEffect(() => {
    const check = () => { const w = window.innerWidth; setS(w < 480 ? 'xs' : w < 640 ? 'sm' : w < 768 ? 'md' : 'lg') }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return s
}

/** people: [{ name, role }]. People sit on a ring; the active one is shown in the centre card. */
export default function OrbitCarousel({ people }) {
  const n = people.length
  const [step, setStep] = useState(0) // unbounded, so wrapping around keeps spinning the same way
  const [paused, setPaused] = useState(false)
  const { radius, node, card, avatar, name } = SIZES[useScreen()]
  const active = ((step % n) + n) % n
  const size = radius * 2 + node + 40
  const rotationOf = (i) => (i - step) * (360 / n)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setStep((s) => s + 1), 4500)
    return () => clearInterval(t)
  }, [paused])

  const go = (i) => setStep((s) => s + (((i - (((s % n) + n) % n)) + n + Math.floor(n / 2)) % n) - Math.floor(n / 2)) // shortest way round
  const p = people[active]

  return (
    <div className="flex flex-col items-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size, maxWidth: '100%' }}>
        <div aria-hidden="true" className="absolute rounded-full border border-dashed border-pd-blue/25" style={{ width: radius * 2, height: radius * 2 }} />
        <div aria-hidden="true" className="absolute rounded-full bg-pd-gradient opacity-[0.07] blur-2xl" style={{ width: radius * 1.5, height: radius * 1.5 }} />

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`card z-10 ${card} p-3 text-center sm:p-4`} aria-live="polite">
            <span className={`mx-auto flex items-center justify-center rounded-full border-4 border-white bg-pd-gradient font-display font-bold text-white shadow-glow ${avatar}`}><Face name={p.name} /></span>
            <h3 className={`mt-2 font-bold text-pd-ink ${name}`}>{p.name}</h3>
            <p className="mt-1 flex items-center justify-center gap-1 text-xs text-pd-grey sm:text-sm"><Briefcase size={12} className="shrink-0" /><span className="line-clamp-2">{p.role}</span></p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <button type="button" aria-label="Previous person" onClick={() => setStep((s) => s - 1)} className="rounded-full bg-pd-mist p-1.5 text-pd-ink transition hover:bg-pd-blue/10 hover:text-pd-blue"><ChevronLeft size={14} /></button>
              {p.linkedin ? (
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${p.name} on LinkedIn`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#004182] hover:shadow-md sm:text-sm">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
                  Connect
                </a>
              ) : (
                <span className="font-display text-[11px] font-semibold tracking-widest text-pd-grey">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
              )}
              <button type="button" aria-label="Next person" onClick={() => setStep((s) => s + 1)} className="rounded-full bg-pd-mist p-1.5 text-pd-ink transition hover:bg-pd-blue/10 hover:text-pd-blue"><ChevronRight size={14} /></button>
            </div>
          </motion.div>
        </AnimatePresence>

        {people.map((person, i) => {
          const rot = rotationOf(i)
          const on = i === active
          return (
            <motion.div key={person.name} animate={{ transform: `rotate(${rot}deg) translateY(-${radius}px)` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              style={{ width: node, height: node, position: 'absolute', top: `calc(50% - ${node / 2}px)`, left: `calc(50% - ${node / 2}px)`, zIndex: on ? 20 : 10 }}>
              <motion.button type="button" aria-label={`Show ${person.name}`} onClick={() => go(i)}
                animate={{ rotate: -rot }} transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
                className={`flex h-full w-full items-center justify-center overflow-hidden rounded-full font-display text-xs font-bold transition-colors duration-300 sm:text-sm ${on ? 'border-4 border-white bg-pd-gradient text-white shadow-glow' : 'border border-pd-line bg-white text-pd-blue shadow-card hover:border-pd-blue/50'}`}>
                <Face name={person.name} />
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
