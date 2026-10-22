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
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2">
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
      <Float className="absolute right-0 top-1/2 -translate-y-1/2" delay={1} dy={10} duration={6}>
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
      <div className="absolute left-1/2 top-[46%] h-72 w-72 -translate-x-1/2 -translate-y-1/2">
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
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }} className={`${glass} w-44 p-3.5 text-white`}>
          <div className="flex items-center gap-2 text-xs font-semibold"><Activity className="h-3.5 w-3.5 text-pd-green" />Improving automatically</div>
          <svg viewBox="0 0 120 40" className="mt-2 h-10 w-full" fill="none" aria-hidden="true">
            <motion.path d="M0 34 C 20 32, 30 30, 46 24 S 78 20, 92 12 S 112 6, 120 3" stroke="#01A95C" strokeWidth="2.2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.5, 0.9, 1], ease: 'easeInOut' }} />
          </svg>
        </motion.div>
      </Float>
    </Stage>
  )
}

// 5 — across borders: India and Norway joined by an arc with data packets running along it
function Borders() {
  // India (bottom right) -> Norway (top left)
  const path = 'M330 250 C 290 70, 150 40, 70 110'
  return (
    <Stage>
      <div aria-hidden="true" className="absolute inset-x-0 top-[8%] h-[70%] [background-image:radial-gradient(rgba(255,255,255,.22)_1.2px,transparent_1.2px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_62%_58%_at_50%_50%,#000_30%,transparent_100%)]" />
      <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <defs><linearGradient id="bd-arc" x1="0" x2="1"><stop offset="0%" stopColor="#3b9cff" /><stop offset="100%" stopColor="#01A95C" /></linearGradient></defs>
        <path id="bd-path" d={path} stroke="rgba(255,255,255,.12)" strokeWidth="6" strokeLinecap="round" />
        <motion.path d={path} stroke="url(#bd-arc)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: 'easeOut' }} />
        {[0, 1.2, 2.4].map((d) => (
          <circle key={d} r="4" fill="#fff"><animateMotion dur="3.6s" begin={`${d}s`} repeatCount="indefinite"><mpath href="#bd-path" /></animateMotion></circle>
        ))}
        <circle cx="330" cy="250" r="7" fill="#01A95C" /><circle cx="70" cy="110" r="7" fill="#3b9cff" />
        <circle cx="330" cy="250" r="7" fill="none" stroke="#01A95C" className="animate-pulseRing" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <circle cx="70" cy="110" r="7" fill="none" stroke="#3b9cff" className="animate-pulseRing" style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: '1.2s' }} />
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
