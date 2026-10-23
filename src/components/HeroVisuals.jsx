import { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, BadgeCheck, GraduationCap, Hammer, UserCheck, Smartphone, TrendingUp, Database, Brain, Sparkles, MapPin, Check, CalendarCheck, Receipt, Package, Activity } from 'lucide-react'
import CountUp from './CountUp'

const glass = 'rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md shadow-[0_14px_44px_-14px_rgba(0,0,0,.55)]'
const gradText = 'bg-gradient-to-r from-[#3b9cff] to-pd-green bg-clip-text text-transparent'

// a chip that drifts up and down on its own loop
const Float = ({ children, className = '', delay = 0, dy = 8, duration = 5 }) => (
  <motion.div className={className} animate={{ y: [0, -dy, 0] }} transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}>{children}</motion.div>
)

const particles = [[8, 18, 1.2], [88, 12, 1.8], [94, 62, 1], [14, 78, 1.6], [70, 92, 1.1], [46, 4, 1.4], [30, 50, 0.9]]

// shared backdrop for every slide: glow, slow rings, drifting particles
function Stage({ children }) {
  return (
    <div className="relative mx-auto h-[27rem] w-full max-w-md">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pd-blue/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-6 right-0 h-52 w-52 rounded-full bg-pd-green/20 blur-3xl" />
      <motion.span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} />
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-pd-blue/15" />
      {particles.map(([x, y, s], i) => (
        <motion.span key={i} aria-hidden="true" className="absolute rounded-full bg-white/60" style={{ left: `${x}%`, top: `${y}%`, width: s * 3, height: s * 3 }} animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -10, 0] }} transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.4 }} />
      ))}
      {children}
    </div>
  )
}

// 1 — certified: a progress ring filling to 100% with credential chips floating around it
function Certified() {
  const id = useId()
  const R = 78, C = 2 * Math.PI * R
  return (
    <Stage>
      <div className="absolute left-[36%] top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" fill="none" aria-hidden="true">
          <defs><linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3b9cff" /><stop offset="100%" stopColor="#01A95C" /></linearGradient></defs>
          <circle cx="100" cy="100" r={R} stroke="rgba(255,255,255,.1)" strokeWidth="10" />
          <motion.circle cx="100" cy="100" r={R} stroke={`url(#ring-${id})`} strokeWidth="10" strokeLinecap="round" strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }} />
        </svg>
        <div className="absolute inset-[14%] flex flex-col items-center justify-center rounded-full border border-white/10 bg-pd-navy/70 text-center shadow-[inset_0_0_40px_rgba(0,120,232,.25)]">
          <span className={`font-display text-5xl font-extrabold ${gradText}`}><CountUp to={100} suffix="%" /></span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">AI-certified</span>
        </div>
        <motion.span aria-hidden="true" className="absolute inset-0 rounded-full border border-pd-green/40" animate={{ scale: [1, 1.18], opacity: [0.5, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: 2 }} />
      </div>
      <Float className="absolute left-0 top-6" delay={0.2}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className={`${glass} flex items-center gap-3 px-4 py-3 text-white`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pd-gradient"><BadgeCheck className="h-5 w-5" /></span><span className="text-sm font-semibold">AI-certified team</span>
        </motion.div>
      </Float>
      <Float className="absolute -right-7 top-[calc(50%-1.75rem)]" delay={1} dy={10} duration={6}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.85, duration: 0.6 }} className={`${glass} flex items-center gap-3 px-4 py-3 text-white`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-pd-blue"><GraduationCap className="h-5 w-5" /></span><span className="text-sm font-semibold leading-tight">Active certifications,<br />always current</span>
        </motion.div>
      </Float>
      <Float className="absolute bottom-5 left-4" delay={0.6} dy={7} duration={5.5}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }} className={`${glass} flex items-center gap-3 px-4 py-3 text-white`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-pd-green"><ShieldCheck className="h-5 w-5" /></span><span className="text-sm font-semibold leading-tight">ISMS certified<br /><span className="text-xs font-normal text-white/60">ISO/IEC 27001</span></span>
        </motion.div>
      </Float>
    </Stage>
  )
}

// 2 — certify first, then join, then build: a highlight walks down the steps
function Before() {
  const steps = [[GraduationCap, 'Certify', 'Earn AI certification first'], [UserCheck, 'Join', 'Then join your team'], [Hammer, 'Build', 'Ship with AI at the core']]
  const [on, setOn] = useState(0)
  useEffect(() => { const t = setInterval(() => setOn((n) => (n + 1) % 3), 1600); return () => clearInterval(t) }, [])
  return (
    <Stage>
      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2">
        <div aria-hidden="true" className="absolute bottom-10 left-[2.15rem] top-10 w-px bg-gradient-to-b from-pd-blue/60 via-white/20 to-pd-green/60" />
        <div className="space-y-5">
          {steps.map(([I, t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
              className={`${glass} relative flex items-center gap-4 p-4 text-white transition duration-500 ${on === i ? 'scale-[1.04] border-pd-green/60 bg-white/[0.12] shadow-[0_0_34px_-6px_rgba(1,169,92,.5)]' : ''}`} style={{ marginLeft: `${i * 1.25}rem` }}>
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition duration-500 ${on === i ? 'bg-pd-gradient shadow-glow' : 'bg-white/10'}`}><I className="h-6 w-6" /></span>
              <div className="min-w-0 flex-1"><p className="font-display text-base font-bold">{t}</p><p className="text-xs text-white/60">{d}</p></div>
              <span className={`flex h-7 w-7 items-center justify-center rounded-full transition duration-500 ${on >= i ? 'bg-pd-green text-white' : 'bg-white/10 text-white/30'}`}><Check className="h-4 w-4" /></span>
            </motion.div>
          ))}
        </div>
      </div>
    </Stage>
  )
}

// 3 — RentAsst in market: a dashboard window with a drawing chart, plus a phone notification
function Market() {
  const line = 'M0 86 C 28 80, 46 84, 74 60 S 124 52, 156 34 S 206 28, 240 8'
  const feats = [[CalendarCheck, 'Booking'], [Package, 'Tracking'], [Receipt, 'Billing']]
  return (
    <Stage>
      <Float className="absolute inset-x-0 top-5" dy={6} duration={6}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={`${glass} overflow-hidden text-white`}>
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-display text-sm font-semibold">RentAsst</span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-pd-green/15 px-2.5 py-0.5 text-[11px] font-semibold text-pd-green"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pd-green" />Live</span>
          </div>
          <div className="p-5">
            <div className="flex items-end justify-between">
              <div><p className="font-display text-4xl font-extrabold leading-none"><CountUp to={1000} suffix="+" /></p><p className="mt-1 text-xs text-white/60">installs across India</p></div>
              <span className="flex items-center gap-1 rounded-full bg-pd-green/15 px-2.5 py-1 text-xs font-semibold text-pd-green"><TrendingUp className="h-3.5 w-3.5" />Growing</span>
            </div>
            <svg viewBox="0 0 240 100" className="mt-4 h-24 w-full" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="mk-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0078E8" stopOpacity=".35" /><stop offset="100%" stopColor="#0078E8" stopOpacity="0" /></linearGradient>
                <linearGradient id="mk-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b9cff" /><stop offset="100%" stopColor="#01A95C" /></linearGradient>
              </defs>
              <motion.path d={`${line} L240 100 L0 100 Z`} fill="url(#mk-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} />
              <motion.path d={line} stroke="url(#mk-line)" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }} />
              <motion.circle cx="240" cy="8" r="4" fill="#01A95C" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ delay: 2, duration: 0.5 }} />
            </svg>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {feats.map(([I, t], i) => (
                <motion.span key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.12 }} className="flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] py-2 text-xs font-medium text-white/80 ring-1 ring-white/10"><I className="h-3.5 w-3.5 text-pd-blue" />{t}</motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </Float>
      <Float className="absolute -right-1 bottom-2" delay={0.8} dy={9} duration={5}>
        <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 1.6, type: 'spring' }} className={`${glass} flex items-center gap-3 px-4 py-3 text-white`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pd-gradient"><Smartphone className="h-5 w-5" /></span>
          <div><p className="text-sm font-semibold leading-tight">Invoice sent</p><p className="text-[11px] text-pd-green">Automatically</p></div>
        </motion.div>
      </Float>
    </Stage>
  )
}

// 4 — gets smarter: Data → Learn → Improve on a loop, a light travelling round it, a rising trend card
function Smarter() {
  const nodes = [['Data', Database, 0], ['Learn', Brain, 120], ['Improve', TrendingUp, 240]]
  const R = 38
  return (
    <Stage>
      <div className="absolute left-1/2 top-[38%] h-72 w-72 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r={R} stroke="rgba(255,255,255,.14)" strokeWidth="0.5" strokeDasharray="1.5 2" />
        </svg>
        <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}>
          <span className="absolute left-1/2 top-[12%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pd-green shadow-[0_0_18px_5px_rgba(1,169,92,.65)]" />
        </motion.div>
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-pd-gradient shadow-glow">
          <motion.span aria-hidden="true" className="absolute inset-0 rounded-full bg-pd-blue/50" animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
          <Sparkles className="relative h-8 w-8 text-white" />
        </div>
        {nodes.map(([t, I, a]) => {
          const rad = ((a - 90) * Math.PI) / 180
          return (
            <motion.span key={t} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + a / 500, type: 'spring' }}
              className={`${glass} absolute flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 text-white`} style={{ left: `${50 + Math.cos(rad) * R}%`, top: `${50 + Math.sin(rad) * R}%` }}>
              <I className="h-5 w-5 text-pd-blue" /><span className="text-[10px] font-bold uppercase tracking-wider">{t}</span>
            </motion.span>
          )
        })}
      </div>
      <Float className="absolute bottom-0 right-0" delay={0.5} dy={7}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }} className={`${glass} w-44 p-3 text-white`}>
          <div className="flex items-center gap-2 text-xs font-semibold"><Activity className="h-3.5 w-3.5 text-pd-green" />Improving automatically</div>
          <svg viewBox="0 0 120 40" className="mt-1.5 h-8 w-full" fill="none" aria-hidden="true">
            <motion.path d="M0 34 C 20 32, 30 30, 46 24 S 78 20, 92 12 S 112 6, 120 3" stroke="#01A95C" strokeWidth="2.2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.5, 0.9, 1], ease: 'easeInOut' }} />
          </svg>
        </motion.div>
      </Float>
    </Stage>
  )
}

// Natural Earth land outline (Europe → India), in degrees: x = lon, y = -lat; positioned via the <g> matrix so Norway/India land on their dots
const WORLD = 'M44.4,20L44.5,19.4L44.2,19L44,18.3L44,17.4L44.3,16.9L44.4,16.2L44.9,16.2L45.5,16L45.9,15.8L46.3,15.8L46.9,15.2L47.7,14.6L48,14.1L47.9,13.7L48.3,13.8L48.8,13.1L48.9,12.5L49.2,12L49.5,12.5L49.8,12.9L50.1,13.6L50.1,13.6L50.2,14.8L50.5,15.2L50.4,15.7L50.2,16L49.9,15.4L49.7,15.7L49.9,16.5L49.8,16.9L49.5,17.1L49.4,18L49,19.1L48.7,20L44.4,20ZM110,7.9L109.4,7.7L108.7,7.6L108.3,7.8L106.5,7.4L106.3,6.9L105.4,6.9L106.1,5.9L107.3,6L108.1,6.3L108.5,6.4L108.6,6.8L108.6,6.8L110,6.8L110,7.9ZM105.8,5.9L104.7,5.9L103.9,5L102.6,4.2L102.2,3.6L101.4,2.8L100.9,2.1L100.1,0.7L99.3,-0.2L99,-1L98.6,-1.8L97.7,-2.5L97.2,-3.3L96.4,-3.9L95.4,-5L95.3,-5.5L95.9,-5.4L97.5,-5.2L98.4,-4.3L99.1,-3.6L99.7,-3.2L100.6,-2.1L101.7,-2.1L102.5,-1.4L103.1,-0.6L103.8,-0.1L103.4,0.7L104,1.1L104.4,1.1L104.5,1.8L104.9,2.3L105.6,2.4L106.1,3.1L105.9,4.3ZM110,1.6L109.6,1.3L109.1,0.5L109,-0.4L109.1,-1.3L109.7,-2L110,-1.8L110,1.6ZM81.2,-6.2L80.3,-6L79.9,-6.8L79.7,-8.2L80.1,-9.8L80.8,-9.3L81.3,-8.6L81.8,-7.5L81.6,-6.5ZM110,-18.5L109.5,-18.2L108.7,-18.5L108.6,-19.4L109.1,-19.8L110,-20L110,-18.5ZM34.6,-35.7L33.9,-35.2L34,-35.1L34,-35L33,-34.6L32.5,-34.7L32.3,-35.1L32.7,-35.1L32.8,-35.1L32.9,-35.4L33.7,-35.4ZM23.7,-35.7L24.2,-35.4L25,-35.4L25.8,-35.4L25.7,-35.2L26.3,-35.3L26.2,-35L24.7,-34.9L24.7,-35.1L23.5,-35.3ZM15.5,-38.2L15.2,-37.4L15.3,-37.1L15.1,-36.6L14.3,-37L13.8,-37.1L12.4,-37.6L12.6,-38.1L13.7,-38L14.8,-38.1ZM9.2,-41.2L9.8,-40.5L9.7,-39.2L9.2,-39.2L8.8,-38.9L8.4,-39.2L8.4,-40.4L8.2,-41L8.7,-40.9ZM9.6,-42.2L9.2,-41.4L8.8,-41.6L8.5,-42.3L8.7,-42.6L9.4,-43ZM-6.8,-52.3L-8.6,-51.7L-10,-51.8L-9.2,-52.9L-9.7,-53.9L-8.3,-54.7L-7.6,-55.1L-6.7,-55.2L-5.7,-54.6L-6.2,-53.9L-6,-53.2ZM12.7,-55.6L12.1,-54.8L11,-55.4L10.9,-55.8L12.4,-56.1ZM-3,-58.6L-4.1,-57.6L-3.1,-57.7L-2,-57.7L-2.2,-56.9L-3.1,-56L-2.1,-55.9L-1.1,-54.6L-0.4,-54.5L0.2,-53.3L0.5,-52.9L1.7,-52.7L1.6,-52.1L1,-51.8L1.4,-51.3L0.5,-50.8L-0.8,-50.8L-2.5,-50.5L-3,-50.7L-3.6,-50.2L-4.5,-50.3L-5.2,-50L-5.8,-50.2L-4.3,-51.2L-3.4,-51.4L-5,-51.6L-5.3,-52L-4.2,-52.3L-4.8,-52.8L-4.6,-53.5L-3.1,-53.4L-2.9,-54L-3.6,-54.6L-4.8,-54.8L-5.1,-55.1L-4.7,-55.5L-5,-55.8L-5.6,-55.3L-5.6,-56.3L-6.2,-56.8L-5.8,-57.8L-5,-58.6L-4.2,-58.6ZM-14.5,-66.5L-14.7,-65.8L-13.6,-65.1L-14.9,-64.4L-17.8,-63.7L-18.7,-63.5L-20,-63.6L-22.8,-64L-21.8,-64.4L-24,-64.9L-22.2,-65.1L-22.2,-65.4L-24.3,-65.6L-23.7,-66.3L-22.1,-66.4L-20.6,-65.7L-19.1,-66.3L-17.8,-66L-16.2,-66.5ZM49.1,-41.3L49.6,-40.6L50.1,-40.5L50.4,-40.3L49.6,-40.2L49.4,-39.4L49.2,-39L48.9,-38.8L48.9,-38.3L49.2,-37.6L50.1,-37.4L50.8,-36.9L52.3,-36.7L53.8,-37L53.9,-37.2L53.7,-37.9L53.9,-39L53.1,-39.3L53.4,-40L52.7,-40L52.9,-40.9L53.9,-40.6L54.7,-41L54,-41.6L53.7,-42.1L52.9,-41.9L52.8,-41.1L52.5,-41.8L52.4,-42L52.7,-42.4L52.5,-42.8L51.3,-43.1L50.9,-44L50.3,-44.3L50.3,-44.6L51.3,-44.5L51.3,-45.2L52.2,-45.4L53,-45.3L53.2,-46.2L53,-46.9L52,-46.8L51.2,-47L50,-46.6L49.1,-46.4L48.6,-45.8L47.7,-45.6L46.7,-44.6L47.6,-43.7L47.5,-43L48.6,-41.8ZM110,-20.3L109.9,-20.3L109.6,-21L109.9,-21.4L108.5,-21.7L108,-21.6L106.7,-20.7L105.9,-19.8L105.7,-19.1L106.4,-18L107.4,-16.7L108.3,-16.1L108.9,-15.3L109.3,-13.4L109.2,-11.7L108.4,-11L107.2,-10.4L106.4,-9.5L105.2,-8.6L104.8,-9.2L105.1,-9.9L104.3,-10.5L103.5,-10.6L103.1,-11.2L102.6,-12.2L101.7,-12.6L100.8,-12.6L101,-13.4L100.1,-13.4L100,-12.3L99.5,-10.8L99.2,-10L99.2,-9.2L99.9,-9.2L100.3,-8.3L100.5,-7.4L101,-6.9L101.6,-6.7L102.1,-6.2L102.4,-6.1L103,-5.5L103.4,-4.9L103.4,-4.2L103.3,-3.7L103.4,-3.4L103.5,-2.8L103.9,-2.5L104.2,-1.6L104.2,-1.3L103.5,-1.2L102.6,-2L101.4,-2.8L101.3,-3.3L100.7,-3.9L100.6,-4.8L100.2,-5.3L100.3,-6L100.1,-6.5L99.7,-6.8L99.5,-7.3L99,-7.9L98.5,-8.4L98.3,-7.8L98.1,-8.3L98.3,-9L98.6,-9.9L98.5,-10.7L98.8,-11.4L98.4,-12L98.5,-13.1L98.1,-13.6L97.8,-14.8L97.6,-16.1L97.2,-16.9L96.5,-16.4L95.4,-15.7L94.8,-15.8L94.2,-16L94.5,-17.3L94.3,-18.2L93.5,-19.4L93.7,-19.7L93.1,-19.9L92.4,-20.7L92.1,-21.2L92,-21.7L91.8,-22.2L91.4,-22.8L90.5,-22.8L90.6,-22.4L90.3,-21.8L89.8,-22L89.7,-21.9L89.4,-22L89,-22.1L88.9,-21.7L88.2,-21.7L87,-21.5L87,-20.7L86.5,-20.2L85.1,-19.5L83.9,-18.3L83.2,-17.7L82.2,-17L82.2,-16.6L81.7,-16.3L80.8,-16L80.3,-15.9L80,-15.1L80.2,-13.8L80.3,-13L79.9,-12.1L79.9,-10.4L79.3,-10.3L78.9,-9.5L79.2,-9.2L78.3,-8.9L77.9,-8.3L77.5,-8L76.6,-8.9L76.1,-10.3L75.7,-11.3L75.4,-11.8L74.9,-12.7L74.6,-14L74.4,-14.6L73.5,-16L73.1,-17.9L72.8,-19.2L72.8,-20.4L72.6,-21.4L71.2,-20.8L70.5,-20.9L69.2,-22.1L69.6,-22.5L69.3,-22.8L68.2,-23.7L67.4,-23.9L67.1,-24.7L66.4,-25.4L64.5,-25.2L62.9,-25.2L61.5,-25.1L59.6,-25.4L58.5,-25.6L57.4,-25.7L57,-27L56.5,-27.1L55.7,-27L54.7,-26.5L53.5,-26.8L52.5,-27.6L51.5,-27.9L50.9,-28.8L50.1,-30.1L49.6,-30L48.9,-30.3L48.6,-29.9L48,-30L48.2,-29.5L48.1,-29.3L48.4,-28.6L48.8,-27.7L49.3,-27.5L49.5,-27.1L50.2,-26.7L50.2,-26.3L50.1,-25.9L50.2,-25.6L50.5,-25.3L50.7,-25L50.8,-24.8L50.7,-25.5L51,-26L51.3,-26.1L51.6,-25.8L51.6,-25.2L51.4,-24.6L51.6,-24.2L51.8,-24.3L51.8,-24L52.6,-24.2L53.4,-24.2L54,-24.1L54.7,-24.8L55.4,-25.4L56.1,-26.1L56.4,-26.4L56.5,-26.3L56.4,-25.9L56.3,-25.7L56.4,-24.9L56.8,-24.2L57.4,-23.9L58.1,-23.7L58.7,-23.6L59.2,-23L59.4,-22.7L59.8,-22.5L59.8,-22.3L59.4,-21.7L59.3,-21.4L58.9,-21.1L58.5,-20.4L58,-20.5L57.8,-20.2L57.7,-19.7L57.8,-19.1L57.7,-18.9L57.2,-18.9L56.6,-18.6L56.5,-18.1L56.3,-17.9L55.7,-17.9L55.3,-17.6L55.3,-17.2L54.8,-16.9L54.2,-17L53.6,-16.7L53.1,-16.7L52.4,-16.4L52.2,-15.9L52.2,-15.6L51.2,-15.2L49.6,-14.7L48.7,-14L48.2,-13.9L47.9,-14L47.4,-13.6L46.7,-13.4L45.9,-13.3L45.6,-13.3L45.4,-13L45.1,-13L45,-12.7L44.5,-12.7L44.2,-12.6L43.5,-12.6L43.2,-13.2L43.3,-13.8L43.1,-14.1L42.9,-14.8L42.6,-15.2L42.8,-15.3L42.7,-15.7L42.8,-15.9L42.8,-16.3L42.7,-16.8L42.3,-17.1L42.3,-17.5L41.8,-17.8L41.2,-18.7L40.9,-19.5L40.2,-20.2L39.8,-20.3L39.1,-21.3L39,-22L39.1,-22.6L38.5,-23.7L38,-24.1L37.5,-24.3L37.2,-24.9L37.2,-25.1L36.9,-25.6L36.6,-25.8L36.3,-26.6L35.6,-27.4L35.1,-28.1L34.6,-28.1L34.8,-28.6L34.8,-29L35,-29.4L34.9,-29.5L34.6,-29.1L34.4,-28.3L34.2,-27.8L33.9,-27.6L33.6,-28L33.1,-28.4L32.4,-29.9L32.3,-29.8L32.7,-28.7L33.3,-27.7L34.1,-26.1L34.5,-25.6L34.8,-25L35.7,-23.9L35.5,-23.8L35.5,-23.1L36.7,-22.2L36.9,-22L37.2,-21L37,-20.8L37.1,-19.8L37.5,-18.6L37.9,-18.4L38.4,-18L39,-16.8L39.3,-15.9L39.8,-15.4L41.2,-14.5L41.7,-13.9L42.3,-13.3L42.6,-13L43.1,-12.7L43.3,-12.4L43.3,-12L42.7,-11.7L43.1,-11.5L43.5,-11.3L43.7,-10.9L44.1,-10.4L44.6,-10.4L45.6,-10.7L46.6,-10.8L47.5,-11.1L48,-11.2L48.4,-11.4L48.9,-11.4L49.3,-11.4L49.7,-11.6L50.3,-11.7L50.7,-12L51.1,-12L51.1,-11.7L51,-11.2L51,-10.6L50.8,-10.3L50.6,-9.2L50.1,-8.1L49.5,-6.8L48.6,-5.3L47.7,-4.2L46.6,-2.9L45.6,-2L44.1,-1.1L43.1,-0.3L42,0.9L41.8,1.4L41.6,1.7L40.9,2.1L40.6,2.5L40.3,2.6L40.1,3.3L39.8,3.7L39.6,4.3L39.2,4.7L38.7,5.9L38.8,6.5L39.4,6.8L39.5,7.1L39.2,7.7L39.3,8L39.2,8.5L39.5,9.1L40,10.1L40.3,10.3L40.5,10.8L40.4,11.8L40.6,12.6L40.6,14.2L40.8,14.7L40.5,15.4L40.1,16.1L39.5,16.7L38.5,17.1L37.4,17.6L36.3,18.7L35.9,18.8L35.2,19.6L34.8,19.8L34.8,20L13,20L13,20L12.8,19.7L12.6,19L11.8,18.1L11.7,17.3L11.6,16.7L11.8,15.8L12.1,14.9L12.2,14.4L12.5,13.5L12.7,13.1L13.3,12.5L13.6,12L13.7,11.3L13.7,10.7L13.4,10.4L13.1,9.8L12.9,9.2L12.9,9L13.2,8.6L12.9,7.6L12.7,6.9L12.2,6.3L12.3,6.1L12.2,5.8L11.9,5L11.1,4L10.1,3L9.4,2.1L8.8,1.1L8.8,0.8L9,0.5L9.3,-0.3L9.5,-1L9.3,-1.2L9.6,-2.3L9.8,-3.1L9.4,-3.7L8.9,-3.9L8.7,-4.4L8.5,-4.5L8.5,-4.8L7.5,-4.4L7.1,-4.5L6.7,-4.2L5.9,-4.3L5.4,-4.9L5,-5.6L4.3,-6.3L3.6,-6.3L2.7,-6.3L1.9,-6.1L1.1,-5.9L-0.5,-5.3L-1.1,-5L-2,-4.7L-2.9,-5L-3.3,-5L-4,-5.2L-4.6,-5.2L-5.8,-5L-6.5,-4.7L-7.5,-4.3L-7.7,-4.4L-8,-4.4L-9,-4.8L-9.9,-5.6L-10.8,-6.1L-11.4,-6.8L-11.7,-6.9L-12.4,-7.3L-12.9,-7.8L-13.1,-8.2L-13.2,-8.9L-13.7,-9.5L-14.1,-9.9L-14.3,-10L-14.6,-10.2L-14.7,-10.7L-14.8,-10.9L-15.1,-11L-15.7,-11.5L-16.1,-11.5L-16.3,-11.8L-16.3,-12L-16.6,-12.2L-16.7,-12.4L-16.8,-13.2L-16.7,-13.6L-17.1,-14.4L-17.6,-14.7L-17.2,-14.9L-16.7,-15.6L-16.5,-16.1L-16.6,-16.7L-16.3,-17.2L-16.1,-18.1L-16.3,-19.1L-16.4,-19.6L-16.3,-20.1L-16.5,-20.6L-17.1,-21L-17,-21.4L-17,-21.9L-16.6,-22.2L-16.3,-22.7L-16.3,-23L-16,-23.7L-15.4,-24.4L-15.1,-24.5L-14.8,-25.1L-14.8,-25.6L-14.4,-26.3L-13.8,-26.6L-13.1,-27.6L-12.6,-28L-11.7,-28.1L-10.9,-28.8L-10.4,-29.1L-9.6,-29.9L-9.8,-31.2L-9.4,-32L-9.3,-32.6L-8.7,-33.2L-7.7,-33.7L-6.9,-34.1L-6.2,-35.1L-5.9,-35.8L-5.2,-35.8L-4.6,-35.3L-3.6,-35.4L-2.6,-35.2L-2.2,-35.2L-1.2,-35.7L-0.1,-35.9L0.5,-36.3L1.5,-36.6L3.2,-36.8L4.8,-36.9L5.3,-36.7L6.3,-37.1L7.3,-37.1L7.7,-36.9L8.4,-36.9L9.5,-37.4L10.2,-37.2L10.2,-36.7L11,-37.1L11.1,-36.9L10.6,-36.4L10.6,-35.9L10.9,-35.7L10.8,-34.8L10.2,-34.3L10.3,-33.8L10.9,-33.8L11.1,-33.3L11.5,-33.1L12.7,-32.8L13.1,-32.9L13.9,-32.7L15.2,-32.3L15.7,-31.4L16.6,-31.2L18,-30.8L19.1,-30.3L19.6,-30.5L20.1,-31L19.8,-31.8L20.1,-32.2L20.9,-32.7L21.5,-32.8L22.9,-32.6L23.2,-32.2L23.6,-32.2L23.9,-32L24.9,-31.9L25.2,-31.6L26.5,-31.6L27.5,-31.3L28.4,-31L28.9,-30.9L29.7,-31.2L30.1,-31.5L31,-31.6L31.7,-31.4L32,-30.9L32.2,-31.3L33,-31L33.8,-31L34.3,-31.2L34.6,-31.5L34.5,-31.6L34.8,-32.1L35,-32.8L35.1,-33.1L35.1,-33.1L35.5,-33.9L36,-34.6L36,-34.6L35.9,-35.4L36.1,-35.8L35.8,-36.3L36.2,-36.7L35.6,-36.6L34.7,-36.8L34,-36.2L32.5,-36.1L31.7,-36.6L30.6,-36.7L30.4,-36.3L29.7,-36.1L28.7,-36.7L27.6,-36.7L27,-37.7L26.3,-38.2L26.8,-39L26.2,-39.5L27.3,-40.4L28.8,-40.5L29.2,-41.2L31.1,-41.1L32.3,-41.7L33.5,-42L35.2,-42L36.9,-41.3L38.3,-40.9L39.5,-41.1L40.4,-41L41.6,-41.5L41.7,-42L41.5,-42.6L40.9,-43L40.3,-43.1L40,-43.4L38.7,-44.3L37.5,-44.7L36.7,-45.2L37.4,-45.4L38.2,-46.2L37.7,-46.6L39.1,-47L39.1,-47.3L38.2,-47.1L37.4,-47L36.8,-46.7L35.8,-46.6L35,-46.3L35,-45.7L35.5,-45.4L36.5,-45.5L36.3,-45.1L35.2,-44.9L33.9,-44.4L33.3,-44.6L33.5,-45L32.5,-45.3L32.6,-45.5L33.6,-45.9L33.3,-46.1L31.7,-46.3L31.7,-46.7L30.7,-46.6L30.4,-46L29.6,-45.3L29.6,-45L29.1,-44.8L28.8,-44.9L28.6,-43.7L28,-43.3L27.7,-42.6L28,-42L28.1,-41.6L29,-41.3L28.8,-41.1L27.6,-41L27.2,-40.7L26.4,-40.2L26,-40.6L26.1,-40.8L25.4,-40.9L24.9,-40.9L23.7,-40.7L24.4,-40.1L23.9,-40L23.3,-40L22.8,-40.5L22.6,-40.3L22.9,-39.7L23.4,-39.2L23,-39L23.5,-38.5L24,-38.2L24,-37.7L23.1,-37.9L23.4,-37.4L22.8,-37.3L23.2,-36.4L22.5,-36.4L21.7,-36.8L21.3,-37.6L21.1,-38.3L20.7,-38.8L20.2,-39.3L20.2,-39.6L20,-39.7L20,-39.9L19.4,-40.3L19.3,-40.7L19.4,-41.4L19.5,-41.7L19.4,-41.9L19.2,-42L18.9,-42.3L18.4,-42.5L17.5,-42.8L16.9,-43.2L16,-43.5L15.2,-44.2L15.4,-44.3L14.9,-44.7L14.9,-45.1L14.3,-45.2L14,-44.8L13.7,-45.1L13.7,-45.5L13.7,-45.5L13.9,-45.6L13.1,-45.7L12.3,-45.4L12.4,-44.9L12.3,-44.6L12.6,-44.1L13.5,-43.6L14,-42.8L15.1,-42L15.9,-42L16.2,-41.7L15.9,-41.5L16.8,-41.2L17.5,-40.9L18.4,-40.4L18.5,-40.2L18.3,-39.8L17.7,-40.3L16.9,-40.4L16.5,-39.8L17.2,-39.4L17.1,-38.9L16.6,-38.8L16.1,-38L15.7,-37.9L15.7,-38.2L15.9,-38.8L16.1,-39L15.7,-39.5L15.4,-40L15,-40.2L14.7,-40.6L14.1,-40.8L13.6,-41.2L12.9,-41.3L12.1,-41.7L11.2,-42.4L10.5,-42.9L10.2,-43.9L9.7,-44L8.9,-44.4L8.4,-44.2L7.8,-43.8L7.4,-43.7L6.5,-43.1L4.6,-43.4L3.1,-43.1L3,-42.5L3,-41.9L2.1,-41.2L0.8,-41L0.7,-40.7L0.1,-40.1L-0.3,-39.3L0.1,-38.7L-0.5,-38.3L-0.7,-37.6L-1.4,-37.4L-2.1,-36.7L-3.4,-36.7L-4.4,-36.7L-5,-36.3L-5.4,-35.9L-5.9,-36L-6.2,-36.4L-6.5,-36.9L-7.5,-37.1L-7.9,-36.8L-8.4,-37L-8.9,-36.9L-8.7,-37.7L-8.8,-38.3L-9.3,-38.4L-9.5,-38.7L-9.4,-39.4L-9,-39.8L-9,-40.2L-8.8,-40.8L-8.8,-41.2L-9,-41.5L-9,-41.9L-9,-42.6L-9.4,-43L-8,-43.7L-6.8,-43.6L-5.4,-43.6L-4.3,-43.4L-3.5,-43.5L-1.9,-43.4L-1.4,-44L-1.2,-46L-2.2,-47.1L-3,-47.6L-4.5,-48L-4.6,-48.7L-3.3,-48.9L-1.6,-48.6L-1.9,-49.8L-1,-49.3L1.3,-50.1L1.6,-50.9L2.5,-51.1L3.3,-51.3L3.8,-51.6L4.7,-53.1L6.1,-53.5L6.9,-53.5L7.1,-53.7L7.9,-53.7L8.1,-53.5L8.8,-54L8.6,-54.4L8.5,-55L8.1,-55.5L8.1,-56.5L8.3,-56.8L8.5,-57.1L9.4,-57.2L9.8,-57.4L10.6,-57.7L10.5,-57.2L10.3,-56.9L10.4,-56.6L10.9,-56.5L10.7,-56.1L10.4,-56.2L9.6,-55.5L9.9,-55L9.9,-54.6L10.9,-54.4L10.9,-54L12,-54.2L12.5,-54.5L13.6,-54.1L14.1,-53.8L14.8,-54.1L16.4,-54.5L17.6,-54.9L18.6,-54.7L18.7,-54.4L19.7,-54.4L19.9,-54.9L21.3,-55.2L21.1,-56L21.1,-56.8L21.6,-57.4L22.5,-57.8L23.3,-57L24.1,-57L24.3,-57.8L24.4,-58.4L24.1,-58.3L23.4,-58.6L23.3,-59.2L24.6,-59.5L25.9,-59.6L26.9,-59.4L28,-59.5L29.1,-60L28.1,-60.5L26.3,-60.4L24.5,-60.1L22.9,-59.8L22.3,-60.4L21.3,-60.7L21.5,-61.7L21.1,-62.6L21.5,-63.2L22.4,-63.8L24.7,-64.9L25.4,-65.1L25.3,-65.5L23.9,-66L22.2,-65.7L21.2,-65L21.4,-64.4L19.8,-63.6L17.8,-62.7L17.1,-61.3L17.8,-60.6L18.8,-60.1L17.9,-59L16.8,-58.7L16.4,-57L15.9,-56.1L14.7,-56.2L14.1,-55.4L12.9,-55.4L12.6,-56.3L11.8,-57.4L11,-58.9L10.4,-59.5L8.4,-58.3L7.1,-58.1L5.7,-58.6L5.3,-59.7L5,-62L5.9,-62.6L8.6,-63.5L10.5,-64.5L12.4,-65.9L14.8,-67.8L16.4,-68.6L19.2,-69.8L21.4,-70.3L23,-70.2L24.5,-71L26.4,-71L28.2,-71.2L31.3,-70.5L30,-70.2L31.1,-69.6L32.1,-69.9L33.8,-69.3L36.5,-69.1L40.3,-67.9L41.1,-67.5L41.1,-66.8L40,-66.3L38.4,-66L33.9,-66.8L33.2,-66.6L34.8,-65.9L34.9,-64.4L36.2,-64.1L37,-63.9L37.1,-64.3L36.5,-64.8L37.2,-65.1L39.6,-64.5L40.4,-64.8L39.8,-65.5L42.1,-66.5L43,-66.4L44,-66.1L44.5,-66.8L43.7,-67.4L44.2,-68L43.5,-68.6L46.3,-68.2L46.8,-67.7L45.6,-67.6L45.6,-67L46.3,-66.7L47.9,-66.9L48.1,-67.5L50.2,-68L53.7,-68.9L54.5,-68.8L53.5,-68.2L54.7,-68.1L55.4,-68.4L57.3,-68.5L58.8,-68.9L59.9,-68.3L61.1,-68.9L60,-69.5L60.6,-69.9L63.5,-69.5L64.9,-69.2L68.5,-68.1L69.2,-68.6L68.2,-69.1L68.1,-69.4L66.9,-69.5L67.3,-69.9L66.7,-70.7L66.7,-71L68.5,-71.9L69.2,-72.8L69.9,-73L72.6,-72.8L72.8,-72.2L71.8,-71.4L72.5,-71.1L72.8,-70.4L72.6,-69L73.7,-68.4L73.2,-67.7L71.3,-66.3L72.4,-66.2L72.8,-66.5L73.9,-66.8L74.2,-67.3L75.1,-67.8L74.5,-68.3L74.9,-69L73.8,-69.1L73.6,-69.6L74.4,-70.6L73.1,-71.4L74.9,-72.1L74.7,-72.8L75.2,-72.9L75.7,-72.3L75.3,-71.3L76.4,-71.2L75.9,-71.9L77.6,-72.3L79.7,-72.3L81.5,-71.7L80.6,-72.6L80.5,-73.6L82.3,-73.9L84.7,-73.8L86.8,-73.9L86,-74.5L87.2,-75.1L88.3,-75.1L90.3,-75.6L92.9,-75.8L93.2,-76L95.9,-76.1L96.7,-75.9L98.9,-76.4L100.8,-76.4L101,-76.9L102,-77.3L104.4,-77.7L106.1,-77.4L104.7,-77.1L107,-77L107.2,-76.5L108.2,-76.7L110,-76.7L110,-74.4L110,-74.4L109.4,-74.2L110,-74.1L110,-20.3ZM57.5,-70.7L56.9,-70.6L53.7,-70.8L53.4,-71.2L51.6,-71.5L51.5,-72L52.5,-72.2L52.4,-72.8L54.4,-73.6L53.5,-73.8L55.9,-74.6L55.6,-75.1L57.9,-75.6L61.2,-76.3L64.5,-76.4L66.2,-76.8L68.2,-76.9L68.9,-76.5L68.2,-76.2L64.6,-75.7L61.6,-75.3L58.5,-74.3L57,-73.3L55.4,-72.4L55.6,-71.5ZM24.7,-77.9L22.5,-77.4L20.7,-77.7L21.4,-77.9L20.8,-78.3L22.9,-78.5L23.3,-78.1ZM105.1,-78.3L99.4,-77.9L101.3,-79.2L102.1,-79.3L102.8,-79.3L105.4,-78.7ZM18.3,-79.7L21.5,-79L19,-78.6L18.5,-77.8L17.6,-77.6L17.1,-76.8L15.9,-76.8L13.8,-77.4L14.7,-77.7L13.2,-78L11.2,-78.9L10.4,-79.7L13.2,-80L13.7,-79.7L15.1,-79.7L15.5,-80L17,-80.1ZM25.4,-80.4L27.4,-80.1L25.9,-79.5L23,-79.4L20.1,-79.6L19.9,-79.8L18.5,-79.9L17.4,-80.3L20.5,-80.6L21.9,-80.4L22.9,-80.7ZM51.1,-80.5L49.8,-80.4L48.9,-80.3L48.8,-80.2L47.6,-80L46.5,-80.2L47.1,-80.6L44.8,-80.6L46.8,-80.8L48.3,-80.8L48.5,-80.5L49.1,-80.8L50,-80.9L51.5,-80.7ZM99.9,-78.9L97.8,-78.8L95,-79L93.3,-79.4L92.5,-80.1L91.2,-80.3L93.8,-81L95.9,-81.3L97.9,-80.7L100.2,-79.8ZM-25,-83.3L-20.8,-82.7L-22.7,-82.3L-25,-82.3L-25,-83.3ZM-25,-81.8L-24.8,-81.8L-22.9,-82.1L-22.1,-81.7L-23.2,-81.2L-20.6,-81.5L-15.8,-81.9L-12.8,-81.7L-12.2,-81.3L-16.3,-80.6L-16.8,-80.3L-20,-80.2L-17.7,-80.1L-18.9,-79.4L-19.7,-78.8L-19.7,-77.6L-18.5,-77L-20,-76.9L-21.7,-76.6L-19.8,-76.1L-19.6,-75.2L-20.7,-75.2L-19.4,-74.3L-21.6,-74.2L-20.4,-73.8L-20.8,-73.5L-22.2,-73.3L-23.6,-73.3L-22.3,-72.6L-22.3,-72.2L-24.3,-72.6L-24.8,-72.3L-23.4,-72.1L-22.1,-71.5L-21.8,-70.7L-23.5,-70.5L-24.3,-70.9L-25,-71.2L-25,-81.8ZM-25,-70.2L-23.7,-70.2L-22.3,-70.1L-25,-69.3L-25,-70.2Z'

// 5 — across borders: India and Norway joined by an arc with data packets running along it
function Borders() {
  // India (bottom right) -> Norway (top left)
  const path = 'M330 250 C 290 60, 160 20, 85 92'
  return (
    <Stage>
      <div aria-hidden="true" className="absolute inset-x-0 top-[8%] h-[70%] [background-image:radial-gradient(rgba(255,255,255,.22)_1.2px,transparent_1.2px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_62%_58%_at_50%_50%,#000_30%,transparent_100%)]" />
      <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <g transform="matrix(3.61 0 0 3.34 48.9 292.4)" opacity=".16"><path d={WORLD} stroke="#fff" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,.04)" /></g>
        <defs><linearGradient id="bd-arc" x1="0" x2="1"><stop offset="0%" stopColor="#3b9cff" /><stop offset="100%" stopColor="#01A95C" /></linearGradient></defs>
        <path id="bd-path" d={path} stroke="rgba(255,255,255,.12)" strokeWidth="6" strokeLinecap="round" />
        <motion.path d={path} stroke="url(#bd-arc)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: 'easeOut' }} />
        {[0, 1.2, 2.4].map((d) => (
          <circle key={d} r="4" fill="#fff"><animateMotion dur="3.6s" begin={`${d}s`} repeatCount="indefinite"><mpath href="#bd-path" /></animateMotion></circle>
        ))}
        <circle cx="330" cy="250" r="7" fill="#01A95C" /><circle cx="85" cy="92" r="7" fill="#3b9cff" />
        <circle cx="330" cy="250" r="7" fill="none" stroke="#01A95C" className="animate-pulseRing" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="85" cy="92" r="7" fill="none" stroke="#3b9cff" className="animate-pulseRing" style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: '1.2s' }} />
      </svg>
      <Float className="absolute bottom-6 right-0" dy={6} delay={0.3}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className={`${glass} flex items-center gap-3 px-4 py-3 text-white`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pd-green/20 text-pd-green"><MapPin className="h-5 w-5" /></span>
          <div className="leading-tight"><p className="text-sm font-semibold">India</p><p className="text-[11px] text-white/60">Hosur · AI-certified team</p></div>
        </motion.div>
      </Float>
      <Float className="absolute left-0 top-4" dy={8} delay={1}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className={`${glass} flex items-center gap-3 px-4 py-3 text-white`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pd-blue/20 text-pd-blue"><MapPin className="h-5 w-5" /></span>
          <div className="leading-tight"><p className="text-sm font-semibold">Norway</p><p className="text-[11px] text-white/60">Careit · care & nursing</p></div>
        </motion.div>
      </Float>
    </Stage>
  )
}

export const visuals = { certified: Certified, before: Before, market: Market, smarter: Smarter, borders: Borders }
