import { motion } from 'framer-motion'
import { ShieldCheck, BadgeCheck, GraduationCap, Hammer, UserCheck, Smartphone, TrendingUp, Database, Brain, RefreshCw, MapPin } from 'lucide-react'
import CountUp from './CountUp'

const glass = 'rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md'

function Certified() {
  const chips = [['100% AI-certified team', BadgeCheck, 'text-pd-green'], ['Active certifications, always current', GraduationCap, 'text-pd-blue'], ['ISMS certified company', ShieldCheck, 'text-pd-green']]
  return (
    <div className="relative mx-auto flex h-72 w-full max-w-sm flex-col justify-center gap-4">
      {chips.map(([t, I, c], i) => (
        <motion.div key={t} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: i % 2 ? 20 : 0 }} transition={{ delay: 0.15 * i + 0.2, duration: 0.6 }} className={`${glass} flex items-center gap-3 px-5 py-4 text-white`}>
          <I className={`h-6 w-6 ${c}`} /><span className="text-sm font-medium">{t}</span>
        </motion.div>
      ))}
    </div>
  )
}
function Before() {
  const steps = [['Certify', GraduationCap], ['Join', UserCheck], ['Build', Hammer]]
  return (
    <div className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-between">
      <svg className="absolute left-8 right-8 top-1/2 -mt-px h-1" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true"><motion.line x1="0" y1=".5" x2="100" y2=".5" stroke="url(#g)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: .3 }} /><defs><linearGradient id="g"><stop stopColor="#0078E8" /><stop offset="1" stopColor="#01A95C" /></linearGradient></defs></svg>
      {steps.map(([t, I], i) => (
        <motion.div key={t} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.35, type: 'spring' }} className="relative z-10 flex flex-col items-center gap-2 text-white">
          <span className={`${glass} flex h-16 w-16 items-center justify-center`}><I className="h-7 w-7" /></span>
          <span className="text-xs font-semibold uppercase tracking-wider">{t}</span>
        </motion.div>
      ))}
    </div>
  )
}
function Market() {
  return (
    <div className="relative mx-auto h-72 w-full max-w-sm">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className={`${glass} absolute inset-x-6 top-2 p-5 text-white animate-float`}>
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pd-gradient text-white"><Smartphone className="h-5 w-5" /></span><div><p className="font-display font-semibold">RentAsst</p><p className="text-xs text-white/60">Rental management, AI-powered</p></div></div>
        <div className="mt-5 flex items-end gap-1.5">{[40, 62, 48, 80, 66, 94, 76].map((h, i) => <motion.span key={i} className="w-full rounded-t bg-gradient-to-t from-pd-blue to-pd-green" initial={{ height: 0 }} animate={{ height: h * 0.8 }} transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }} />)}</div>
        <div className="mt-4 flex items-center justify-between text-sm"><span className="flex items-center gap-1 text-pd-green"><TrendingUp className="h-4 w-4" />Bookings up</span><span className="font-display text-2xl font-bold"><CountUp to={1000} suffix="+" /></span></div>
        <p className="text-right text-xs text-white/60">installs across India</p>
      </motion.div>
    </div>
  )
}
function Smarter() {
  const nodes = [['Data', Database, 0], ['Learn', Brain, 120], ['Improve', TrendingUp, 240]]
  return (
    <div className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-center">
      <motion.div className="absolute h-60 w-60 rounded-full border border-dashed border-pd-blue/30" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
      <RefreshCw className="h-8 w-8 text-pd-blue/60" />
      {nodes.map(([t, I, a]) => {
        const r = 120, x = Math.cos(((a - 90) * Math.PI) / 180) * r, y = Math.sin(((a - 90) * Math.PI) / 180) * r
        return <motion.span key={t} initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .3 + a / 600 }} style={{ transform: `translate(${x}px,${y}px)` }} className={`${glass} absolute flex h-16 w-16 flex-col items-center justify-center gap-0.5 text-white`}><I className="h-5 w-5" /><span className="text-[10px] font-semibold uppercase">{t}</span></motion.span>
      })}
    </div>
  )
}
function Borders() {
  return (
    <div className="relative mx-auto h-72 w-full max-w-sm text-white">
      <svg viewBox="0 0 300 220" className="h-full w-full" aria-hidden="true">
        <defs><linearGradient id="arc" x1="0" x2="1"><stop stopColor="#01A95C" /><stop offset="1" stopColor="#0078E8" /></linearGradient></defs>
        <motion.path d="M70 170 C 100 20, 200 20, 235 50" fill="none" stroke="url(#arc)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
        <circle cx="70" cy="170" r="7" fill="#01A95C" /><circle cx="70" cy="170" r="7" fill="none" stroke="#01A95C" className="origin-center animate-pulseRing" style={{ transformBox: 'fill-box' }} />
        <circle cx="235" cy="50" r="7" fill="#0078E8" /><circle cx="235" cy="50" r="7" fill="none" stroke="#0078E8" className="animate-pulseRing" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      </svg>
      <span className={`${glass} absolute bottom-3 left-2 flex items-center gap-1 px-3 py-1.5 text-xs font-semibold`}><MapPin className="h-3.5 w-3.5 text-pd-green" />India</span>
      <span className={`${glass} absolute right-2 top-2 flex items-center gap-1 px-3 py-1.5 text-xs font-semibold`}><MapPin className="h-3.5 w-3.5 text-pd-blue" />Norway · Careit</span>
    </div>
  )
}
export const visuals = { certified: Certified, before: Before, market: Market, smarter: Smarter, borders: Borders }
