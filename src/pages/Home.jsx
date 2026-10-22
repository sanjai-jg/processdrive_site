import { createRef, lazy, Suspense, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, Cpu, UserCheck, Layers, Building2, User, Bot, Smartphone, ClipboardCheck, Sparkles, Zap, RefreshCw, Eye, BarChart3, Users } from 'lucide-react'
import AnimatedBeam from '../components/ui/animated-beam'
import pdLogo from '../assets/PD_Logo.png'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import NetworkBg from '../components/NetworkBg'
import ProductCard from '../components/ProductCard'
const RobotMascot = lazy(() => import('../components/ui/robot-mascot'))
import { SectionHeading, CtaBand } from '../components/ui'
import { positioning, why, talksBack, dayOne, switching, howWeBuild, products, careit, trusted, blogHeading, posts } from '../data/site'

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

// icon badge straddles the card's top border; pops in on scroll, pulses softly, tilts on hover
function PillarCard({ pillar, Icon, index }) {
  return (
    <Reveal delay={index * 0.12} className="h-full">
      <div className="card group relative h-full px-7 pb-9 pt-14 text-center transition duration-300 hover:-translate-y-1.5 hover:border-pd-blue/40 hover:shadow-glow">
        <motion.span
          initial={{ scale: 0, rotate: -40 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: index * 0.12 + 0.25 }}
          className="absolute left-1/2 top-0 -ml-7 -mt-7 block h-14 w-14"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-pd-blue/40"
            animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: index * 0.5 }}
          />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-pd-gradient text-white shadow-glow ring-[6px] ring-pd-mist transition duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </span>
        </motion.span>
        <span className="font-display text-xs font-semibold tracking-[0.2em] text-pd-blue/60">0{index + 1}</span>
        <h3 className="mt-3 text-xl font-semibold">{pillar.title}</h3>
        <p className="mt-3 leading-relaxed text-pd-grey">{pillar.text}</p>
        <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-0.5 origin-center scale-x-0 rounded-full bg-pd-gradient transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </Reveal>
  )
}

function Why() {
  return (
    <section className="section bg-pd-mist">
      <div className="container-pd">
        <SectionHeading wide eyebrow="Why ProcessDrive" title={why.title} body={why.body} />
        <div className="mt-20 grid gap-x-6 gap-y-14 md:grid-cols-3">
          {why.pillars.map((p, i) => <PillarCard key={p.title} pillar={p} Icon={pillarIcons[i]} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function TalksBack() {
  const bubbles = [
    { from: 'human', text: 'Our approvals take three days. Can that be fixed?', icon: User },
    { from: 'ai', text: 'Mapped your workflow. 70% of steps can be automated with review checkpoints.', icon: Bot },
    { from: 'human', text: 'Keep finance sign-off manual.', icon: User },
    { from: 'ai', text: 'Done. Prototype ready for your team to test.', icon: Bot },
  ]
  return (
    <section className="relative overflow-hidden bg-pd-navy py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(50%_80%_at_20%_20%,rgba(0,120,232,.3),transparent)]" />
      <div className="container-pd relative grid items-center gap-14 lg:grid-cols-2">
        <SectionHeading dark eyebrow="Human insight · machine capability" title={talksBack.title} body={talksBack.body} />
        <div className="space-y-4" aria-hidden="true">
          {bubbles.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20, x: b.from === 'human' ? -20 : 20 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.25, duration: 0.5 }} className={`flex items-start gap-3 ${b.from === 'ai' ? 'flex-row-reverse' : ''}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${b.from === 'ai' ? 'bg-pd-gradient' : 'bg-white/15'}`}><b.icon className="h-4 w-4" /></span>
              <p className={`max-w-sm rounded-2xl px-5 py-3 text-sm leading-relaxed ${b.from === 'ai' ? 'rounded-tr-sm bg-pd-blue/30 text-white' : 'rounded-tl-sm bg-white/10 text-white/85'}`}>{b.text}</p>
            </motion.div>
          ))}
        </div>
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
              <ProductCard tone={i} name={p.name} tag={p.status === 'soon' ? null : p.tag} text={p.blurb} icon={productIcons[p.slug] || Cpu} logo={p.logo} soon={p.status === 'soon'} to={`/products/${p.slug}`} cta={`Explore ${p.name}`} />
            </Reveal>
          ))}
          <Reveal delay={0.1} className="pt-12 xl:pt-0">
            <ProductCard tone={3} name={careit.name} tag="ProcessDrive-supported platform" text={careit.text} icon={Building2} logo={careit.logo} />
          </Reveal>
        </div>
      </div>
    </section>
  )
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
          {[...list, ...list].map((c, i) => (
            <span key={i} className="card flex h-24 w-64 shrink-0 items-center justify-center font-display text-xl font-bold text-pd-grey">{c}</span>
          ))}
        </div>
      </div>
      <p className="container-pd mt-8 text-center text-sm text-pd-grey">ProcessDrive × Odoo customers: logos to be added here from the current site.</p>
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
      <CtaBand />
    </>
  )
}
