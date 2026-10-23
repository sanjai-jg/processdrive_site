import { createRef, lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, Cpu, UserCheck, Layers, Building2, User, Bot, Smartphone, ClipboardCheck, Sparkles, Zap, RefreshCw, Eye, BarChart3, Users, Send, CheckCheck, ShieldCheck, Award, GraduationCap, BookOpen } from 'lucide-react'
import AnimatedBeam from '../components/ui/animated-beam'
import pdLogo from '../assets/PD_Logo.png'
import rentasstLogo from '../assets/products/nav/rentasst.png'
import aim2cLogo from '../assets/products/nav/aim2c.png'
import ragifiLogo from '../assets/products/nav/ragifi.png'
import careitLogo from '../assets/products/CareIT (2).png'
import avaliaLogo from '../assets/Partnes/avalia.png'
import axentivLogo from '../assets/Partnes/axentiv-logo.png'
import careitWhiteLogo from '../assets/Partnes/careit-white.png'
import cuelebreLogo from '../assets/Partnes/cuelebre.png'

const productLogos = { rentasst: rentasstLogo, aim2c: aim2cLogo, ragifi: ragifiLogo }
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import NetworkBg from '../components/NetworkBg'
import ProductCard from '../components/ProductCard'
const RobotMascot = lazy(() => import('../components/ui/robot-mascot'))
import { SectionHeading } from '../components/ui'
import { positioning, why, talksBack, dayOne, switching, howWeBuild, products, careit, trusted, blogHeading, posts, footerCta } from '../data/site'

function Positioning() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'center 40%'] })
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  return (
    <section ref={ref} className="section bg-white">
      <div className="container-pd grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Our position</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{positioning.title.split('. ')[0]}. <span className="gradient-text">{positioning.title.split('. ')[1]}</span></h2>
          <p className="mt-6 text-lg leading-relaxed text-pd-grey">{positioning.body}</p>
        </Reveal>
        <div className="relative mx-auto w-full max-w-md">
          {/* the robot stands on the AI foundation card and follows the cursor across the whole section */}
          <Suspense fallback={<div className="h-[320px]" />}>
            <RobotMascot eventSource={ref} className="relative z-10 -mb-11 h-[320px] w-full" />
          </Suspense>
          <motion.div style={{ opacity: glow }} className="relative rounded-2xl bg-pd-navy p-8 pt-10 text-center text-white shadow-glow" aria-hidden="true">
            <NetworkBg className="rounded-2xl opacity-60" />
            <p className="relative font-display text-xl font-bold">AI foundation</p>
            <p className="relative mt-1 text-sm text-white/70">Data pipelines · models · interface · automation</p>
            <div className="relative mt-5 grid grid-cols-3 gap-2 text-[11px] font-semibold uppercase tracking-wider">{['Data', 'Models', 'Product'].map((t) => <span key={t} className="rounded-lg border border-white/15 bg-white/10 py-2">{t}</span>)}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const pillarIcons = [BadgeCheck, Cpu, UserCheck]

// ---- "Why ProcessDrive": three selectable points on the left, an animated scene for the selected one on the right ----
const sceneCircle = 'absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full'

// 1. certified: a badge at the centre, certificates orbiting it
function SceneCertified() {
  const orbit = [[GraduationCap, '50%', '4%'], [Award, '96%', '50%'], [ShieldCheck, '50%', '96%'], [BookOpen, '4%', '50%']]
  return (
    <div className="relative h-full w-full">
      {[0, 1].map((i) => <motion.span key={i} aria-hidden="true" className="absolute inset-[26%] rounded-full border border-pd-green/50" animate={{ scale: [1, 1.9], opacity: [0.6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: i * 1.6 }} />)}
      <span aria-hidden="true" className="absolute inset-[4%] rounded-full border border-dashed border-white/15" />
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {orbit.map(([I, left, top], i) => (
          <span key={i} className={`${sceneCircle} h-12 w-12 bg-white/10 text-white ring-1 ring-white/25 backdrop-blur`} style={{ left, top }}>
            <motion.span animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}><I className="h-5 w-5" /></motion.span>
          </span>
        ))}
      </motion.div>
      <span className={`${sceneCircle} h-[34%] w-[34%] bg-pd-gradient shadow-glow`} style={{ left: '50%', top: '50%' }}><BadgeCheck className="h-1/2 w-1/2 text-white" /></span>
    </div>
  )
}

// 2. AI-native: a chip with data pulses flowing in from every direction
function SceneNative() {
  const spokes = Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return [50 + Math.cos(a) * 40, 50 + Math.sin(a) * 40] })
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        {spokes.map(([x, y], i) => (
          <g key={i}>
            <line x1="50" y1="50" x2={x} y2={y} stroke="rgba(255,255,255,.14)" strokeWidth="0.6" />
            <motion.line x1={x} y1={y} x2="50" y2="50" stroke={i % 2 ? '#01A95C' : '#3b9cff'} strokeWidth="1.2" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 0.35, 0], pathOffset: [0, 0.65, 1], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }} />
            <circle cx={x} cy={y} r="2.2" fill="#0A1020" stroke="rgba(255,255,255,.45)" strokeWidth="0.6" />
          </g>
        ))}
      </svg>
      <span className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-pd-gradient shadow-glow">
        <motion.span aria-hidden="true" className="absolute inset-0 rounded-3xl bg-pd-blue/50" animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
        <Cpu className="relative h-1/2 w-1/2 text-white" />
      </span>
    </div>
  )
}

// 3. human oversight: a person and a machine, checkpoints between them lighting up in turn
function SceneOversight() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(255,255,255,.18)" strokeWidth="0.8" strokeDasharray="1.5 2.5" />
        <motion.line x1="20" y1="50" x2="80" y2="50" stroke="url(#ov-grad)" strokeWidth="1.4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0], opacity: [1, 1, 0.2, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.55, 0.85, 1] }} />
        <defs><linearGradient id="ov-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b9cff" /><stop offset="100%" stopColor="#01A95C" /></linearGradient></defs>
      </svg>
      {[34, 50, 66].map((x, i) => (
        <motion.span key={x} className={`${sceneCircle} h-8 w-8 bg-pd-navy text-pd-green ring-1 ring-white/30`} style={{ left: `${x}%`, top: '50%' }}
          animate={{ scale: [1, 1.25, 1], boxShadow: ['0 0 0 0 rgba(1,169,92,0)', '0 0 22px 4px rgba(1,169,92,.55)', '0 0 0 0 rgba(1,169,92,0)'] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.8, delay: 0.5 + i * 0.7 }}>
          <ShieldCheck className="h-4 w-4" />
        </motion.span>
      ))}
      {[[UserCheck, '20%', 'Human judgment', 'bg-white/10'], [Bot, '80%', 'Machine speed', 'bg-pd-gradient shadow-glow']].map(([I, left, label, bg]) => (
        <div key={label} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style={{ left }}>
          <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white ring-1 ring-white/25 ${bg}`}><I className="h-7 w-7" /></span>
          <p className="mt-3 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-white/70">{label}</p>
        </div>
      ))}
    </div>
  )
}

const whyScenes = [SceneCertified, SceneNative, SceneOversight]
const WHY_SECONDS = 7

function Why() {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(false)
  const reduce = useReducedMotion()
  const next = () => { if (!reduce) setActive((a) => (a + 1) % why.pillars.length) }
  const Scene = whyScenes[active]
  return (
    <section className="section bg-pd-mist">
      <div className="container-pd">
        <SectionHeading wide eyebrow="Why ProcessDrive" title={why.title} body={why.body} />
        <Reveal className="mt-14">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
            <div className="flex flex-col gap-3">
              {why.pillars.map((p, i) => {
                const on = active === i
                const Icon = pillarIcons[i]
                return (
                  <button key={p.title} type="button" onClick={() => setActive(i)} aria-pressed={on}
                    className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition duration-300 ${on ? 'border-transparent bg-white shadow-glow' : 'border-pd-line bg-white/60 hover:border-pd-blue/40 hover:bg-white'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-500 ${on ? 'bg-pd-gradient text-white shadow-glow' : 'bg-pd-blue/10 text-pd-blue group-hover:scale-110'}`}><Icon className="h-6 w-6" /></span>
                      <div className="min-w-0 flex-1">
                        <span className={`font-display text-[11px] font-bold tracking-[0.2em] transition-colors ${on ? 'text-pd-green' : 'text-pd-blue/50'}`}>0{i + 1}</span>
                        <h3 className={`text-lg font-semibold leading-snug transition-colors lg:text-xl ${on ? 'text-pd-navy' : 'text-pd-ink/80'}`}>{p.title}</h3>
                      </div>
                    </div>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden"><p className="pb-1 pl-16 pt-4 leading-relaxed text-pd-grey">{p.text}</p></div>
                    </div>
                    {on && !reduce && (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-pd-line/70">
                        <span key={`${active}-bar`} onAnimationEnd={next} className="block h-full origin-left bg-pd-gradient" style={{ animation: `pd-fill ${WHY_SECONDS}s linear forwards`, animationPlayState: hover ? 'paused' : 'running' }} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="relative min-h-[20rem] overflow-hidden rounded-[2rem] bg-pd-navy shadow-glow sm:min-h-[26rem]" aria-hidden="true">
              <NetworkBg className="opacity-30" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-pd-blue/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-pd-green/20 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div key={active} className="absolute inset-0 flex items-center justify-center p-8" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.45 }}>
                  <div className="aspect-square h-full max-h-[22rem] w-auto max-w-full"><Scene /></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const CHAT = [
  { from: 'human', text: 'Our approvals take three days. Can that be fixed?' },
  { from: 'ai', text: 'Mapped your workflow. 70% of steps can be automated with review checkpoints.' },
  { from: 'human', text: 'Keep finance sign-off manual.' },
  { from: 'ai', text: 'Done. Prototype ready for your team to test.', done: true },
]
// stage -> what is on screen: 0 empty, 1 msg0, 2 typing, 3 msg1, 4 msg2, 5 typing, 6 msg3. Each entry is how long to wait before moving to the next stage.
const CHAT_WAIT = [700, 1100, 1500, 1800, 1500, 1200, 6500]
const chatTags = [[Users, 'Certified specialists with your team from day one'], [Zap, 'Faster than a traditional dev cycle'], [ShieldCheck, 'Humans keep the judgment calls']]

function TypingDots() {
  return (
    <span className="flex items-center gap-1.5 px-1 py-1.5" aria-hidden="true">
      {[0, 1, 2].map((i) => <motion.span key={i} className="h-2 w-2 rounded-full bg-white/80" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />)}
    </span>
  )
}

function ChatMessage({ m }) {
  const ai = m.from === 'ai'
  return (
    <motion.div layout initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className={`flex items-end gap-3 ${ai ? 'flex-row-reverse' : ''}`}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ai ? 'bg-pd-gradient shadow-glow' : 'bg-white/15'}`}>{ai ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}</span>
      <div className={`max-w-[80%] ${ai ? 'items-end' : ''} flex flex-col gap-2`}>
        <p className={`rounded-2xl px-5 py-3 text-sm leading-relaxed ${ai ? 'rounded-br-sm bg-gradient-to-br from-pd-blue/50 to-pd-blue/25 text-white ring-1 ring-pd-blue/40' : 'rounded-bl-sm bg-white/10 text-white/90 ring-1 ring-white/10'}`}>{m.text}</p>
        {m.done && (
          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, type: 'spring' }} className="inline-flex items-center gap-1.5 rounded-full bg-pd-green/15 px-3 py-1 text-xs font-semibold text-pd-green ring-1 ring-pd-green/30">
            <CheckCheck className="h-3.5 w-3.5" />Prototype ready to test
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

function ChatWindow() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-80px' })
  const [stage, setStage] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) { setStage(6); return }
    if (!inView) { setStage(0); return }
    const t = setTimeout(() => setStage((s) => (s >= 6 ? 0 : s + 1)), CHAT_WAIT[stage])
    return () => clearTimeout(t)
  }, [stage, inView, reduce])

  const shown = [stage >= 1 && CHAT[0], stage >= 3 && CHAT[1], stage >= 4 && CHAT[2], stage >= 6 && CHAT[3]].filter(Boolean)
  const typing = stage === 2 || stage === 5
  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-pd-blue/25 to-pd-green/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] shadow-2xl shadow-black/40 backdrop-blur-xl" role="img" aria-label="Example conversation: a customer asks to speed up approvals, the AI maps the workflow and has a prototype ready.">
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-4">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-pd-gradient shadow-glow">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-pd-green ring-2 ring-pd-navy"><motion.span className="absolute inset-0 rounded-full bg-pd-green" animate={{ scale: [1, 2.2], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} /></span>
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold">ProcessDrive AI</p>
            <p className="text-xs text-pd-green">Online · with your team</p>
          </div>
          <Sparkles className="ml-auto h-4 w-4 text-white/40" />
        </div>
        <div className="flex min-h-[21rem] flex-col justify-end gap-4 px-5 py-6 sm:min-h-[23rem]" aria-hidden="true">
          <AnimatePresence initial={false}>
            {shown.map((m) => <ChatMessage key={m.text} m={m} />)}
            {typing && (
              <motion.div key="typing" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-row-reverse items-end gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pd-gradient"><Bot className="h-4 w-4" /></span>
                <span className="rounded-2xl rounded-br-sm bg-pd-blue/30 px-4 ring-1 ring-pd-blue/40"><TypingDots /></span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 bg-white/5 px-5 py-3.5" aria-hidden="true">
          <span className="flex-1 truncate rounded-full bg-white/5 px-4 py-2.5 text-sm text-white/40 ring-1 ring-white/10">Describe your workflow…</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pd-gradient"><Send className="h-4 w-4" /></span>
        </div>
      </div>
    </div>
  )
}

function TalksBack() {
  return (
    <section className="relative overflow-hidden bg-pd-navy py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(50%_80%_at_20%_20%,rgba(0,120,232,.3),transparent)]" />
      <NetworkBg className="opacity-30" />
      <div className="container-pd relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading dark eyebrow="Human insight · machine capability" title={talksBack.title} body={talksBack.body} />
          <Reveal delay={0.2} className="mt-8">
            <ul className="space-y-3">
              {chatTags.map(([Icon, t]) => (
                <li key={t} className="flex items-center gap-3 text-sm font-medium text-white/85">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-pd-green ring-1 ring-white/10"><Icon className="h-4 w-4" /></span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <ChatWindow />
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="section bg-white">
      <div className="container-pd">
        <SectionHeading center eyebrow="Experience" title={dayOne.title} body={dayOne.body} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dayOne.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="card h-full p-8 text-center">
                <p className="font-display text-5xl font-extrabold gradient-text"><CountUp to={s.value} suffix={s.suffix} /></p>
                <p className="mt-3 font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-pd-grey">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const switchIcons = [BadgeCheck, Cpu, Zap, RefreshCw, Eye, UserCheck, BarChart3, Users]

// Eight reasons orbit one hub: four on each side, with a pulse of light running from each into the hub.
function Switching() {
  const container = useRef(null)
  const hub = useRef(null)
  const nodes = useMemo(() => switching.items.map(() => createRef()), [])
  const left = switching.items.slice(0, 4)
  const right = switching.items.slice(4)

  const item = (s, i, side) => {
    const I = switchIcons[i]
    const isLeft = side === 'left'
    return (
      <Reveal key={s.title} delay={(isLeft ? i : i - 4) * 0.08} y={18}>
        <div className={`group flex items-center gap-4 ${isLeft ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
          <span ref={nodes[i]} className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-pd-line bg-white text-pd-blue shadow-card ring-4 ring-pd-mist transition duration-300 group-hover:scale-110 group-hover:border-pd-blue/50 group-hover:text-white group-hover:shadow-glow">
            <span className="absolute inset-0 rounded-full bg-pd-gradient opacity-0 transition duration-300 group-hover:opacity-100" />
            <I className="relative h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[11px] font-bold tracking-[0.2em] text-pd-green">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-pd-grey">{s.text}</p>
          </div>
        </div>
      </Reveal>
    )
  }

  return (
    <section className="section bg-pd-mist">
      <div className="container-pd">
        <SectionHeading wide eyebrow="The difference" title={switching.title} />
        <div ref={container} className="relative mt-16 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-24">
          <div className="relative z-10 flex flex-col gap-8 lg:gap-9">{left.map((s, i) => item(s, i, 'left'))}</div>

          <div className="relative z-10 order-first mx-auto flex flex-col items-center lg:order-none">
            <div ref={hub} className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-glow ring-8 ring-pd-mist">
              <motion.span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-pd-blue/40"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }} />
              <img src={pdLogo} alt="ProcessDrive" className="h-16 w-16" />
            </div>
            <p className="mt-4 font-display text-sm font-semibold">AI-only partner</p>
          </div>

          <div className="relative z-10 flex flex-col gap-8 lg:gap-9">{right.map((s, i) => item(s, i + 4, 'right'))}</div>

          {switching.items.map((s, i) => (
            <AnimatedBeam key={s.title} className="hidden lg:block" containerRef={container} fromRef={nodes[i]} toRef={hub}
              curvature={i < 4 ? (i - 1.5) * -14 : (i - 5.5) * 14} duration={2.8} delay={(i % 4) * 0.45}
              beamColor={i % 2 ? '#01A95C' : '#0078E8'} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Vertical S-curve: six nodes (y = 75, 225 ... 825 of 900), x alternating 190 / 410 of 600
const CURVE = (() => {
  const pts = [0, 1, 2, 3, 4, 5].map((i) => [i % 2 === 0 ? 190 : 410, (i + 0.5) * 150])
  let d = `M${pts[0][0]} 0 L${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) d += ` C${pts[i - 1][0]} ${pts[i - 1][1] + 85} ${pts[i][0]} ${pts[i][1] - 85} ${pts[i][0]} ${pts[i][1]}`
  return d + ` L${pts[5][0]} 900`
})()

function HowWeBuild() {
  const ref = useRef(null)
  const curveRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  // the desktop line tracks the curve itself so it is fully drawn once the last step reaches mid-screen
  const { scrollYProgress: curveProgress } = useScroll({ target: curveRef, offset: ['start 65%', 'end 55%'] })
  const pathLength = useTransform(curveProgress, [0, 1], [0, 1])
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section ref={ref} className="section bg-white">
      <div className="container-pd">
        <SectionHeading eyebrow="Process" title={howWeBuild.title} />
        {/* desktop: vertical winding S-curve, nodes alternate left and right; the line draws as you scroll */}
        <div ref={curveRef} className="relative mx-auto mt-12 hidden h-[900px] max-w-5xl lg:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 900" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="howGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#0078E8" /><stop offset="1" stopColor="#01A95C" /></linearGradient></defs>
            <path d={CURVE} fill="none" stroke="#E3E9F2" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <motion.path d={CURVE} fill="none" stroke="url(#howGrad)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength }} />
          </svg>
          {howWeBuild.steps.map((s, i) => {
            const left = i % 2 === 0
            const x = left ? 190 / 6 : 410 / 6
            return (
              <div key={s.title}>
                <span className="absolute z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-pd-blue bg-white font-display text-lg font-bold text-pd-blue shadow-card" style={{ left: `${x}%`, top: (i + 0.5) * 150 }}>{i + 1}</span>
                <Reveal delay={0.05} className={`absolute w-[30%] -translate-y-1/2 ${left ? 'text-right' : 'text-left'}`} style={{ top: (i + 0.5) * 150, ...(left ? { right: `calc(${100 - x}% + 44px)` } : { left: `calc(${x}% + 44px)` }) }}>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-pd-grey">{s.text}</p>
                </Reveal>
              </div>
            )
          })}
        </div>
        <p className="mt-2 hidden items-center gap-2 text-sm font-medium text-pd-green lg:flex"><Layers className="h-4 w-4" />Deploy &amp; Evolve feeds back into Discover: the loop never closes.</p>
        {/* mobile: vertical */}
        <div className="relative mt-12 pl-10 lg:hidden">
          <div className="absolute bottom-0 left-[18px] top-0 w-0.5 bg-pd-line"><motion.div style={{ height: h }} className="w-full bg-pd-gradient" /></div>
          {howWeBuild.steps.map((s, i) => (
            <Reveal key={s.title} className="relative mb-8 last:mb-0">
              <span className="absolute -left-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-pd-blue bg-white text-sm font-bold text-pd-blue">{i + 1}</span>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-pd-grey">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const productIcons = { rentasst: Smartphone, aim2c: ClipboardCheck, ragifi: Sparkles }

function Products() {
  return (
    <section className="section overflow-hidden bg-pd-mist">
      <div className="container-pd">
        <SectionHeading eyebrow="Products" title="Our AI-Native Products" />
        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2 xl:gap-y-10">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1} className="pt-12 xl:pt-0">
              <ProductCard tone={i} name={p.name} tag={p.status === 'soon' ? null : p.tag} text={p.blurb} icon={productIcons[p.slug] || Cpu} logo={productLogos[p.slug] || p.logo} soon={p.status === 'soon'} to={`/products/${p.slug}`} cta={`Explore ${p.name}`} />
            </Reveal>
          ))}
          <Reveal delay={0.1} className="pt-12 xl:pt-0">
            <ProductCard tone={3} name={careit.name} tag="ProcessDrive-supported platform" text={careit.text} icon={Building2} logo={careitLogo} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Odoo customers: trimmed logos in src/assets/odoo-customers/web/. A file name maps to a display name here; unknown files get a tidy name from the file name.
const odooNames = {
  'apt-logo': 'Apt Tech Engineering', 'bluewave-computers': 'Bluewave Computers', costumewala: 'Costumewala', galaxyinternationaltours: 'Galaxy International Tours',
  'image-54': 'Harbest Agro', 'image-56': 'VSR Agro Products', nutans: 'Nutan’s', 'swamy-super-mart': 'Swamy Super Mart',
  'velan-pharma-surgicals': 'Velan Pharma Surgicals', 'vivasayi-fresh': 'Vivasayi Fresh',
}
const odooFiles = import.meta.glob('../assets/odoo-customers/web/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })
const odooCustomers = Object.entries(odooFiles)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, logo]) => {
    const key = path.split('/').pop().replace(/\.[^.]+$/, '')
    return { logo, name: odooNames[key] || key.replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()) }
  })

// client logos (src/assets/Partnes/), each on the card colour its logo was designed for; clients without a logo fall back to their name
const clientBrand = {
  'Avlia Digital': { logo: avaliaLogo, bg: 'bg-black border-black' },
  Careit: { logo: careitWhiteLogo, bg: 'bg-[#04808C] border-[#04808C]' },
  Axentiv: { logo: axentivLogo, bg: 'bg-white' },
  Cuelebre: { logo: cuelebreLogo, bg: 'bg-white' },
}

function Trusted() {
  const list = [...trusted.clients, ...trusted.clients, ...trusted.clients, ...trusted.clients]
  return (
    <section className="section overflow-hidden bg-pd-mist">
      <div className="container-pd">
        <SectionHeading center eyebrow="Clients" title={trusted.title} body={trusted.line} />
      </div>
      <div className="mt-12 overflow-hidden" aria-label="Our clients">
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {[...list, ...list].map((c, i) => {
            const brand = clientBrand[c]
            return (
              <span key={i} className={`card flex h-24 w-64 shrink-0 items-center justify-center px-8 font-display text-xl font-bold text-pd-grey transition duration-300 hover:-translate-y-1 hover:shadow-glow ${brand?.bg || ''}`}>
                {brand ? <img src={brand.logo} alt={c} loading="lazy" draggable="false" className="h-14 w-auto max-w-full object-contain" /> : c}
              </span>
            )
          })}
        </div>
      </div>
      <div className="container-pd mt-14">
        <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-pd-grey">
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-pd-line" />
          ProcessDrive × Odoo customers
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent to-pd-line" />
        </p>
      </div>
      {/* second row runs the other way, slower; edges fade out */}
      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]" aria-label="Our Odoo customers">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse', animationDuration: '55s' }}>
          {[...odooCustomers, ...odooCustomers].map((c, i) => (
            <span key={`${c.name}-${i}`} aria-hidden={i >= odooCustomers.length ? 'true' : undefined} className="card flex h-24 w-52 shrink-0 items-center justify-center bg-white px-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <img src={c.logo} alt={c.name} loading="lazy" draggable="false" className="max-h-16 max-w-[10rem] object-contain" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Blog() {
  return (
    <section className="section bg-white">
      <div className="container-pd">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Blog" title={blogHeading} />
          <Link to="/blogs" className="btn btn-outline">All articles<ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to={`/blogs/posts/${p.slug}`} className="card group block h-full overflow-hidden transition duration-300 hover:-translate-y-1.5">
                <div className="relative h-40 bg-pd-navy"><NetworkBg still className="opacity-70" /></div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-pd-green">{p.date}</p>
                  <h3 className="mt-2 text-lg font-semibold group-hover:text-pd-blue">{p.refreshed}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-pd-grey">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// home page closing call to action: a bold gradient panel with rotating rings around the ProcessDrive mark and three proof chips
const ctaProof = [[BadgeCheck, '100%', 'AI-certified team'], [ShieldCheck, 'ISMS', 'ISO/IEC 27001 certified'], [Smartphone, '1000+', 'RentAsst installs across India']]

function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-white px-3 py-12 sm:px-5 sm:py-16">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-pd-gradient text-white shadow-glow sm:rounded-[2.5rem]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_20%,rgba(255,255,255,.22),transparent),radial-gradient(50%_70%_at_0%_100%,rgba(10,16,32,.45),transparent)]" />
        <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(120deg,transparent_30%,#000)]" />
        <div className="relative grid items-center gap-8 px-6 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-12 lg:px-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider"><Sparkles className="h-3.5 w-3.5" />Start with AI, not add it later</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-5xl">{footerCta.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{footerCta.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/contact-us" className="btn bg-white text-pd-navy shadow-[0_14px_40px_-10px_rgba(0,0,0,.5)] hover:-translate-y-0.5 hover:bg-white/90">{footerCta.cta}<ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            {/* rotating rings around the mark, proof chips floating beside it (stacked under it on small screens) */}
            <div className="relative mx-auto aspect-square w-full max-w-[12rem] sm:max-w-[13rem]">
              {[100, 74, 48].map((size, i) => (
                <motion.span key={size} aria-hidden="true" className="absolute left-1/2 top-1/2 rounded-full border border-white/30 border-dashed" style={{ width: `${size}%`, height: `${size}%`, x: '-50%', y: '-50%' }} animate={{ rotate: i % 2 ? -360 : 360 }} transition={{ duration: 40 + i * 20, repeat: Infinity, ease: 'linear' }}>
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,.7)]" />
                </motion.span>
              ))}
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_0_60px_10px_rgba(255,255,255,.35)]">
                <img src={pdLogo} alt="" className="h-12 w-12" />
              </span>
            </div>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-3 lg:mt-5 lg:grid-cols-1">
              {ctaProof.map(([Icon, big, small], i) => (
                <Reveal as="li" key={big} delay={0.1 + i * 0.1} y={16}>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-2 backdrop-blur-md">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20"><Icon className="h-5 w-5" /></span>
                    <div className="leading-tight"><p className="font-display text-lg font-bold">{big}</p><p className="text-xs text-white/80">{small}</p></div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo path="/" title="ProcessDrive | AI-Native Software, Built by an AI-Certified Team" description="ProcessDrive is a 100% AI-certified team building AI-native software: workflow automation, AI-powered Odoo, intelligent mobile apps and websites. ISMS certified." />
      <Hero />
      <Positioning />
      <Why />
      <TalksBack />
      <Stats />
      <Switching />
      <HowWeBuild />
      <Products />
      <Trusted />
      <Blog />
      <HomeCta />
    </>
  )
}
