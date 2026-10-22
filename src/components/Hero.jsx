import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import NetworkBg from './NetworkBg'
import { visuals } from './HeroVisuals'
import { slides, strip } from '../data/site'

const DURATION = 7000

export default function Hero() {
  const [i, setI] = useState(0)
  const paused = false
  const touch = useRef(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const go = useCallback((n) => setI((p) => (p + n + slides.length) % slides.length), [])
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  progressRef.current = progress
  useEffect(() => { progressRef.current = 0; setProgress(0) }, [i])
  useEffect(() => {
    if (paused || reduce) return
    let raf, last = performance.now(), acc = 0
    const tick = (now) => {
      acc += now - last; last = now
      setProgress(Math.min(acc / DURATION, 1))
      if (acc >= DURATION) { go(1); return }
      raf = requestAnimationFrame(tick)
    }
    // continue from the current progress so pausing does not restart the bar
    acc = progressRef.current * DURATION
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [i, paused, reduce, go])
  const s = slides[i]
  const Visual = visuals[s.id]
  return (
    <section className="relative -mt-[88px] overflow-hidden bg-pd-navy pt-[88px] text-white" aria-roledescription="carousel" aria-label="ProcessDrive highlights"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)} onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1) }}>
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(0,120,232,.35),transparent),radial-gradient(50%_70%_at_10%_90%,rgba(1,169,92,.25),transparent)]" />
      <NetworkBg className="opacity-80" />
      <div className="hero-main container-pd relative grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
        <div aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
                {s.title.split(' ').map((w, k) => (
                  <motion.span key={k} className="mr-[.25em] inline-block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * k, duration: 0.5 }}>{w}</motion.span>
                ))}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{s.sub}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to={s.to} className="btn btn-primary">{s.cta}<ArrowRight className="h-4 w-4" /></Link>              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hero-visual hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div key={s.id} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}><Visual /></motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="container-pd relative pb-6 pr-20 sm:pr-8">
        <div className="flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous slide" className="rounded-full border border-white/25 bg-white/5 p-2 text-white hover:border-pd-blue hover:text-pd-blue"><ChevronLeft className="h-4 w-4" /></button>
          <div className="flex flex-1 gap-2" role="tablist" aria-label="Slides">
            {slides.map((x, k) => (
              <button key={x.id} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}: ${x.title}`} onClick={() => setI(k)} className="group relative h-6 flex-1">
                <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded bg-white/15">
                  {k === i && <span className="block h-full origin-left bg-pd-gradient" style={{ transform: `scaleX(${reduce ? 1 : progress})` }} />}
                  {k < i && <span className="block h-full bg-pd-blue/40" />}
                </span>
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next slide" className="rounded-full border border-white/25 bg-white/5 p-2 text-white hover:border-pd-blue hover:text-pd-blue"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="container-pd flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-4 text-sm font-medium text-white/80">
          {strip.map((t, k) => (<span key={t} className="flex items-center gap-3">{k > 0 && <span className="h-1 w-1 rounded-full bg-pd-green" />}{t}</span>))}
        </div>
      </div>
    </section>
  )
}
