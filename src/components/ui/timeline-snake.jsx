import { createRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from '../Reveal'

const PER_ROW = 3
const AMP = 70 // how far each hop between milestones bows up or down (the curve peaks at half of this)

/**
 * Serpentine timeline: PER_ROW milestones per row, one continuous curved path that waves along a row,
 * U-turns at the edge and comes back along the next row. The path is measured from the real nodes, so it
 * follows them as the layout reflows, and the coloured stroke draws itself as the section scrolls into view.
 * items: [{ year, text }]
 */
export default function TimelineSnake({ items, className = '' }) {
  const id = useId()
  const box = useRef(null)
  const nodes = useMemo(() => items.map(() => createRef()), [items])
  const [geo, setGeo] = useState(null)

  const rows = useMemo(() => {
    const out = []
    for (let i = 0; i < items.length; i += PER_ROW) out.push(items.slice(i, i + PER_ROW).map((it, k) => ({ ...it, i: i + k, k })))
    return out
  }, [items])

  useEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => {
      const b = el.getBoundingClientRect()
      const pts = nodes.map((r) => {
        const n = r.current?.getBoundingClientRect()
        return n ? { x: n.left - b.left + n.width / 2, y: n.top - b.top + n.height / 2 } : null
      })
      if (pts.some((p) => !p) || b.width < 2) return
      let d = `M${pts[0].x},${pts[0].y}`
      let hop = 0
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], c = pts[i]
        if (Math.floor((i - 1) / PER_ROW) === Math.floor(i / PER_ROW)) {
          // same row: alternate bowing up and down so the tangent stays smooth through each node
          const s = hop++ % 2 ? 1 : -1
          d += ` Q${(a.x + c.x) / 2},${a.y + s * AMP} ${c.x},${c.y}`
        } else {
          // row change: loop out to the edge and back (a cubic's bulge reaches 75% of its control distance)
          const right = Math.floor((i - 1) / PER_ROW) % 2 === 0
          const reach = right ? b.width - 10 : 10
          const cx = a.x + (reach - a.x) / 0.75
          d += ` C${cx},${a.y} ${cx},${c.y} ${c.x},${c.y}`
        }
      }
      setGeo({ w: b.width, h: b.height, d })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    nodes.forEach((r) => r.current && ro.observe(r.current))
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [nodes, rows])

  const { scrollYProgress } = useScroll({ target: box, offset: ['start 70%', 'end 55%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 })

  return (
    <div ref={box} className={`relative px-14 pb-6 pt-14 ${className}`}>
      {geo && (
        <svg aria-hidden="true" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} fill="none" className="pointer-events-none absolute left-0 top-0 overflow-visible">
          <defs>
            <linearGradient id={`tl-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={geo.w} y2="0">
              <stop offset="0%" stopColor="#0078E8" />
              <stop offset="100%" stopColor="#01A95C" />
            </linearGradient>
          </defs>
          <path d={geo.d} stroke="#D5DEEB" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" />
          <motion.path d={geo.d} stroke={`url(#tl-${id})`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: draw }} />
        </svg>
      )}
      <div className="relative flex flex-col gap-24">
        {rows.map((row, r) => (
          <div key={r} className="grid grid-cols-3 items-start gap-x-6">
            {row.map((it) => {
              const last = it.i === items.length - 1
              // odd rows run right to left, like a snake
              const col = r % 2 ? PER_ROW - it.k : it.k + 1
              return (
                <Reveal key={it.year} y={0} delay={it.k * 0.1} style={{ gridColumnStart: col, gridRowStart: 1 }} className="flex flex-col items-center text-center">
                  <div ref={nodes[it.i]} className={`group relative z-10 inline-flex items-center rounded-full border-2 bg-white px-5 py-2 font-display text-xl font-extrabold shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-glow ${last ? 'border-pd-green text-pd-green shadow-[0_0_0_6px_rgba(1,169,92,.12)]' : 'border-pd-blue text-pd-blue'}`}>
                    {last && <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-pd-green/20" />}
                    {it.year}
                  </div>
                  <p className="mt-5 max-w-[17rem] text-sm leading-relaxed text-pd-grey">{it.text}</p>
                </Reveal>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
