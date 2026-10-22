import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Eye, Rocket, Quote, BadgeCheck, ArrowRight, Compass, Workflow, LayoutDashboard, BarChart3, BookOpen, Network, Flag, Heart } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import NetworkBg from '../components/NetworkBg'
import pdLogo from '../assets/PD_Logo.png'
import ceoPhoto from '../assets/ceo/saran-sir.jpg'
import isoBadge from '../assets/Certifications/ISO-Badge-CFdx17Qo.png'
import claudeBadge from '../assets/Certifications/Partner Badge - Certified SVG (Chip).jpg'
import dnbBadge from '../assets/Certifications/DUN & Breadstreet.png'
import { SectionHeading } from '../components/ui'
import { about, lifeGallery, wayImages } from '../data/site'
import OrbitCarousel from '../components/ui/orbit-carousel'
import TimelineSnake from '../components/ui/timeline-snake'
import HalftoneWordmark from '../components/ui/halftone-wordmark-footer'
import HalftoneLogo from '../components/ui/halftone-logo'
import PerspectiveTunnelHero from '../components/ui/perspective-tunnel-hero'

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section className="section bg-white">
      <div className="container-pd">
        <SectionHeading center eyebrow="Pathway of progress" title="From humble beginnings to a company built entirely around AI" body="Here’s how we got here." />
        <TimelineSnake items={about.timeline} className="mx-auto mt-16 hidden max-w-6xl lg:block" />
        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl lg:hidden">
          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-pd-line md:left-1/2 md:-translate-x-1/2"><motion.div style={{ height: h }} className="w-full bg-pd-gradient" /></div>
          {about.timeline.map((t, i) => {
            const last = t.year === '2026'
            return (
              <Reveal key={t.year} className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <span className={`absolute left-[7px] top-2 rounded-full border-4 border-white shadow ${last ? 'bg-pd-green ring-4 ring-pd-green/20' : 'bg-pd-blue'} ${i % 2 ? 'md:-left-[9px]' : 'md:left-auto md:-right-[9px]'}`} style={{ height: 18, width: 18 }} />
                <p className={`font-display text-3xl font-extrabold ${last ? 'gradient-text' : 'text-pd-blue'}`}>{t.year}</p>
                <p className="mt-2 leading-relaxed text-pd-grey">{t.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="section bg-pd-navy text-white">
      <div className="container-pd">
        <SectionHeading dark center eyebrow="By the numbers" title="ProcessDrive by the Numbers" body={about.numbersIntro} />
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {about.numbers.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
                <p className="font-display text-5xl font-extrabold gradient-text"><CountUp to={n.value} suffix={n.suffix} /></p>
                <p className="mt-3 text-white/70">{n.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// "Simplify, Strengthen, and Transform: through AI-led technology, ..." -> three steps + the rest of the sentence
function missionParts(lead) {
  const [head, ...rest] = lead.split(': ')
  const tail = rest.join(': ')
  return { steps: head.replace(/^and |, and /, ', ').split(/,\s*/).map((s) => s.trim()).filter(Boolean), tail: tail.charAt(0).toUpperCase() + tail.slice(1) }
}

function VisionMission() {
  const { steps, tail } = missionParts(about.mission.lead)
  const [lit, setLit] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setLit((n) => (n + 1) % steps.length), 1700)
    return () => clearInterval(t)
  }, [steps.length])

  return (
    <section className="section bg-white">
      <div className="container-pd grid gap-6 lg:grid-cols-[5fr_7fr]">
        {/* Vision: a dark panel, rings pulsing out from the eye like a horizon scan */}
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-3xl bg-pd-navy p-9 text-white shadow-glow sm:p-10">
            <NetworkBg className="opacity-40" />
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pd-blue/30 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                {[0, 1].map((i) => (
                  <motion.span key={i} aria-hidden="true" className="absolute inset-0 rounded-full border border-pd-green/60"
                    animate={{ scale: [1, 2.3], opacity: [0.7, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: i * 1.5 }} />
                ))}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-pd-gradient shadow-glow"><Eye className="h-6 w-6" /></span>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pd-green">Where we’re headed</p>
                <h3 className="font-display text-3xl font-bold">Vision</h3>
              </div>
            </div>
            <p className="relative mt-8 border-l-2 border-pd-blue/60 pl-5 text-lg leading-relaxed text-white/80 sm:text-xl">{about.vision}</p>
          </div>
        </Reveal>

        {/* Mission: the three verbs light up in turn, then the two commitments */}
        <Reveal delay={0.1}>
          <div className="card relative h-full overflow-hidden p-9 sm:p-10">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-pd-gradient" />
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pd-gradient text-white shadow-glow"><Rocket className="h-6 w-6" /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pd-blue">What we do about it</p>
                <h3 className="font-display text-3xl font-bold">Mission</h3>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 sm:gap-3">
                  <span className={`rounded-full border px-4 py-2 font-display text-sm font-bold transition duration-500 sm:text-base ${lit === i ? 'border-transparent bg-pd-gradient text-white shadow-glow' : 'border-pd-line bg-pd-mist text-pd-ink'}`}>{s}</span>
                  {i < steps.length - 1 && <ArrowRight className={`h-4 w-4 transition duration-500 ${lit === i ? 'translate-x-1 text-pd-green' : 'text-pd-grey/50'}`} />}
                </div>
              ))}
            </div>
            <p className="mt-4 leading-relaxed text-pd-grey sm:text-lg">{tail}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {about.mission.points.map((p, i) => (
                <div key={p.title} className="group rounded-2xl border border-pd-line bg-pd-mist/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-pd-blue/40 hover:bg-white hover:shadow-card">
                  <span className="font-display text-sm font-extrabold gradient-text">0{i + 1}</span>
                  <p className="mt-1 font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-pd-grey">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Four values as interlocking circles around the mark. Circles sit on a plus-shaped layout (centres in %), overlap in the middle,
// drift gently, and the hovered one comes forward while the others dim.
const VALUE_CIRCLES = [
  { label: 'People', c: [50, 31], tag: [50, 13], fill: 'rgba(0,120,232,.30)', edge: 'rgba(0,120,232,.55)', drift: [0, -8] },
  { label: 'AI-certified', c: [69, 50], tag: [87, 50], fill: 'rgba(0,170,200,.30)', edge: 'rgba(0,150,185,.55)', drift: [8, 0] },
  { label: 'Collaboration', c: [50, 69], tag: [50, 87], fill: 'rgba(1,169,92,.30)', edge: 'rgba(1,169,92,.55)', drift: [0, 8] },
  { label: 'Ownership', c: [31, 50], tag: [13, 50], fill: 'rgba(10,16,32,.20)', edge: 'rgba(10,16,32,.45)', drift: [-8, 0] },
]

function ValuesVenn() {
  const [hot, setHot] = useState(null)
  const box = useRef(null)
  const seen = useInView(box, { once: true, margin: '-60px' })
  const R = 29 // circle radius, % of the box
  return (
    <div ref={box} className="relative mx-auto aspect-square w-full max-w-[460px]" onPointerLeave={() => setHot(null)}>
      <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-pd-blue/5 blur-3xl" />
      {VALUE_CIRCLES.map((v, i) => (
        <motion.div key={v.label}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={seen ? { opacity: hot === null || hot === i ? 1 : 0.45, scale: hot === i ? 1.07 : 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18, delay: hot === null ? i * 0.12 : 0 }}
          onPointerEnter={() => setHot(i)}
          className="absolute cursor-default rounded-full"
          style={{ width: `${R * 2}%`, height: `${R * 2}%`, left: `${v.c[0] - R}%`, top: `${v.c[1] - R}%`, background: v.fill, border: `1.5px solid ${v.edge}`, mixBlendMode: 'multiply', zIndex: hot === i ? 5 : 1 }}>
          <motion.span aria-hidden="true" className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 40px ${v.fill}` }}
            animate={{ x: [0, v.drift[0], 0], y: [0, v.drift[1], 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      ))}
      {VALUE_CIRCLES.map((v, i) => (
        <span key={v.label} onPointerEnter={() => setHot(i)}
          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-default whitespace-nowrap font-display text-sm font-bold transition duration-300 sm:text-lg ${hot === i ? 'scale-110 text-pd-navy' : 'text-pd-ink'}`}
          style={{ left: `${v.tag[0]}%`, top: `${v.tag[1]}%` }}>{v.label}</span>
      ))}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-glow ring-4 ring-white/70">
        <motion.span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-pd-blue/40" animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }} />
        <img src={pdLogo} alt="ProcessDrive" className="h-[62%] w-[62%]" loading="lazy" />
      </div>
    </div>
  )
}

function Values() {
  return (
    <section className="section overflow-hidden bg-pd-mist">
      <div className="container-pd grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <SectionHeading eyebrow="Our core values" title={about.values.title} body={about.values.body} />
        <div className="w-full lg:w-[460px]"><ValuesVenn /></div>
      </div>
    </section>
  )
}

const doIcons = [Compass, Workflow, LayoutDashboard, BarChart3]

// card with a soft spotlight that follows the cursor, a ghost numeral and a gradient line that draws on hover
function DoCard({ text, Icon, index }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Reveal delay={(index % 2) * 0.1} className="h-full">
      <div onPointerMove={move} className="card group relative h-full overflow-hidden p-7 transition duration-300 hover:-translate-y-1.5 hover:border-pd-blue/30 hover:shadow-glow sm:p-8">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(0,120,232,.10), transparent 70%)' }} />
        <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-8xl font-extrabold leading-none text-pd-blue/[0.06] transition duration-500 group-hover:-translate-y-1 group-hover:text-pd-blue/[0.12]">0{index + 1}</span>
        <div className="relative flex gap-5">
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pd-gradient text-white shadow-glow transition duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
            <motion.span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-pd-blue/40" animate={{ scale: [1, 1.5], opacity: [0.4, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: index * 0.6 }} />
            <Icon className="relative h-6 w-6" />
          </span>
          <p className="pr-6 text-[1.02rem] leading-relaxed text-pd-ink">{text}</p>
        </div>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-pd-gradient transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </Reveal>
  )
}

function WhatWeDo() {
  const also = about.whatWeDo.also
  return (
    <section className="section bg-white">
      <div className="container-pd">
        <SectionHeading eyebrow="What we do" title={about.whatWeDo.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {about.whatWeDo.points.map((p, i) => <DoCard key={p} text={p} Icon={doIcons[i]} index={i} />)}
        </div>
        <Reveal className="mt-12">
          {/* endless ticker, pauses on hover; edges fade out */}
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
            <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
              {[...also, ...also, ...also, ...also].map((a, i) => (
                <span key={`${a}-${i}`} aria-hidden={i >= also.length ? 'true' : undefined} className="cursor-default whitespace-nowrap rounded-full border border-pd-line bg-pd-mist px-5 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-pd-gradient hover:text-white hover:shadow-glow">{a}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Leadership() {
  return (
    <section id="leadership" className="section scroll-mt-24 bg-pd-mist">
      <div className="container-pd">
        <div className="flex flex-col items-center gap-10 lg:gap-14">
          <SectionHeading center eyebrow="Leadership" title={about.leadership.title} body={about.leadership.body} />
          <Reveal className="mx-auto w-full max-w-full overflow-hidden lg:overflow-visible">
            <OrbitCarousel people={about.leadership.people.map(([name, role, linkedin]) => ({ name, role, linkedin }))} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const CEO_HIGHLIGHT = 'rebuilding it from the ground up with intelligence at the core'

function Ceo() {
  const [name, ...roleParts] = about.ceo.by.split(', ')
  const role = roleParts.join(', ')
  const sentences = about.ceo.quote.split(/(?<=\.)\s+/)
  return (
    <section className="section bg-white">
      <div className="container-pd">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-pd-navy text-white shadow-glow">
          <NetworkBg className="opacity-30" />
          <div aria-hidden="true" className="absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-pd-blue/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-pd-green/15 blur-3xl" />
          <Quote aria-hidden="true" className="absolute right-8 top-8 h-24 w-24 text-white/[0.05] sm:h-32 sm:w-32" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[300px_1fr] lg:gap-14 lg:p-14">
            {/* portrait inside a slowly rotating gradient ring */}
            <div className="relative mx-auto w-full max-w-[280px] lg:max-w-none">
              <div className="relative rounded-[1.75rem] p-[3px]">
                <motion.span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.75rem]">
                  <motion.span className="absolute left-1/2 top-1/2 block aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2" style={{ background: 'conic-gradient(from 0deg, #0078E8, #01A95C, transparent 40%, #0078E8)' }}
                    animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }} />
                </motion.span>
                <div className="relative overflow-hidden rounded-[1.6rem] bg-pd-navy">
                  <img src={ceoPhoto} alt="Saravanan Sivalingam, CEO of ProcessDrive" loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-pd-navy/80 to-transparent" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 w-[86%] -translate-x-1/2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center shadow-glow backdrop-blur-md">
                <p className="font-display text-base font-bold leading-tight">{name}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-pd-green">{role}</p>
              </div>
            </div>

            <div className="mt-4 lg:mt-0">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                <Quote className="h-5 w-5 text-pd-green" />{about.ceo.title}
                <span aria-hidden="true" className="h-px w-16 bg-gradient-to-r from-pd-green/70 to-transparent" />
              </p>
              <blockquote className="mt-6 font-display text-lg font-medium leading-relaxed sm:text-xl lg:text-[1.4rem] lg:leading-[1.65]">
                {sentences.map((s, i) => {
                  const [pre, post] = s.split(CEO_HIGHLIGHT)
                  return (
                    <motion.span key={i} className="inline" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.18 }}>
                      {post === undefined ? s : <>{pre}<span className="bg-pd-gradient bg-clip-text font-bold text-transparent">{CEO_HIGHLIGHT}</span>{post}</>}{' '}
                    </motion.span>
                  )
                })}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <motion.span aria-hidden="true" className="h-0.5 w-14 origin-left rounded-full bg-pd-gradient" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: sentences.length * 0.18 }} />
                <p className="font-semibold text-pd-green">{about.ceo.by}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const wayIcons = [BadgeCheck, BookOpen, Network, Flag, Heart]

// Five culture points as a strip of panels: the active one opens wide, the rest fold down to slim strips.
// Hover/focus/tap activates a panel, and it advances by itself until you interact.
function Way() {
  const points = about.way.points
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((a) => (a + 1) % points.length), 4500)
    return () => clearInterval(t)
  }, [paused, points.length])

  return (
    <section className="section bg-pd-mist">
      <div className="container-pd">
        <SectionHeading eyebrow="Culture" title={about.way.title} body={about.way.body} />
        <Reveal className="mt-12">
          <div className="flex flex-col gap-3 lg:h-[380px] lg:flex-row" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
            {points.map(([t, d], i) => {
              const on = active === i
              const Icon = wayIcons[i]
              return (
                <div key={t} role="button" tabIndex={0} aria-expanded={on}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  className={`group relative min-h-[88px] cursor-pointer overflow-hidden rounded-3xl border bg-pd-navy p-6 text-left text-white transition-all duration-500 ease-out lg:min-h-0 lg:basis-0 lg:p-7 ${on ? 'border-transparent shadow-glow lg:grow-[4]' : 'border-pd-line hover:border-pd-blue/50 lg:grow'}`}>
                  {/* photo: dimmed and desaturated while folded, bright and slowly zooming when open */}
                  <img src={wayImages[i]} alt="" loading="lazy" draggable="false" className={`absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out ${on ? 'scale-[1.03] grayscale-0' : 'scale-100 grayscale'}`} />
                  {/* scrim: open panel only darkens the bottom third (where the text sits) and a little at the top for the icon; folded strips are dimmed evenly */}
                  <span aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ${on ? 'bg-gradient-to-t from-pd-navy/95 from-0% via-pd-navy/45 via-35% to-transparent to-60%' : 'bg-pd-navy/65'}`} />
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-pd-navy/45 to-transparent transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} />
                  <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 bg-pd-gradient transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between lg:items-start">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition duration-500 ${on ? 'bg-pd-gradient text-white shadow-glow' : 'bg-white/15 text-white ring-1 ring-white/25 backdrop-blur group-hover:scale-110'}`}><Icon className="h-5 w-5" /></span>
                      <span className={`font-display text-sm font-extrabold tracking-widest drop-shadow transition-colors duration-500 ${on ? 'text-pd-green' : 'text-white/80'}`}>0{i + 1}</span>
                    </div>
                    {/* slim-strip title, vertical (desktop only, when folded) */}
                    <span aria-hidden="true" className={`absolute bottom-0 left-1 hidden whitespace-nowrap font-display text-lg font-bold text-white drop-shadow-md transition-opacity duration-300 [writing-mode:vertical-rl] lg:block lg:rotate-180 ${on ? 'opacity-0' : 'opacity-100 delay-200'}`}>{t}</span>
                    {/* open content: always shown on mobile heading, full on desktop when active */}
                    <div className={`mt-5 lg:mt-auto lg:min-w-[19rem] lg:transition-opacity lg:duration-500 ${on ? 'lg:opacity-100 lg:delay-200' : 'lg:pointer-events-none lg:opacity-0'}`}>
                      <h3 className="font-display text-xl font-bold drop-shadow-md lg:text-2xl">{t}</h3>
                      <div className={`grid transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[1fr] ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <p className="pt-3 leading-relaxed text-white/90 drop-shadow">{d}</p>
                          <span aria-hidden="true" className={`mt-5 block h-0.5 origin-left rounded-full bg-pd-gradient transition-transform duration-700 ${on ? 'scale-x-100 delay-300' : 'scale-x-0'} w-16`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
        <Reveal className="mt-10"><Link to="/careers" className="btn btn-primary">See open roles<ArrowRight className="h-4 w-4" /></Link></Reveal>
      </div>
    </section>
  )
}

function AboutHero() {
  return (
    <section className="bg-white">
      <div className="container-pd grid items-center gap-10 pb-12 pt-6 sm:pb-14 sm:pt-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <Reveal>
          <span className="eyebrow">About us</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-pd-navy sm:text-5xl lg:text-6xl">{about.intro.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-pd-grey">{about.intro.body}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <HalftoneLogo background="#FFFFFF" scale={0.92} height="clamp(300px, 36vw, 440px)" className="touch-pan-y">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
              transition={{ opacity: { duration: 0.6, delay: 0.5 }, scale: { duration: 0.6, delay: 0.5 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
              className="pointer-events-none absolute bottom-9 right-0 z-10 max-w-[9.5rem] rounded-xl bg-pd-navy px-3.5 py-2.5 shadow-glow ring-1 ring-white/10 sm:right-1 sm:max-w-[11rem]"
            >
              <span className="mb-1.5 block h-0.5 w-6 rounded-full bg-pd-gradient" />
              <p className="font-display text-sm font-bold leading-tight text-white sm:text-[0.95rem]">Every dot is a process we drive.</p>
            </motion.div>
            <p className="pointer-events-none absolute inset-x-0 bottom-2 z-10 text-center text-xs text-pd-grey/70">Move your cursor through the logo. Click to send a ripple.</p>
          </HalftoneLogo>
        </Reveal>
      </div>
    </section>
  )
}

function Wordmark() {
  return (
    <section className="bg-white">
      <HalftoneWordmark
        as="div" hideTop backToTop={false} wordmark="ProcessDrive" className="mt-6"
        palette={{ background: '#FFFFFF', ink: '#0A1020', warm: '#0078E8' }} splitAt={7} warmAfter="#01A95C"
        fontFamily={'Sora, Inter, "Helvetica Neue", Arial, system-ui, sans-serif'} fontWeight={800}
        dotGap={5} radius={90} crop={-0.12} fill={0.94} grain={0.3} height="300px"
      />
    </section>
  )
}

// Photos for "Life Between Deployments": drop any images into src/assets/Office/ (jpg, jpeg, png, webp, avif, gif) and they appear here,
// in filename order. A caption is taken from the file name ("team-lunch.jpg" -> "Team Lunch"); camera-style names (IMG_2043, DSC...) get no caption.
// Until the folder has images, the stand-in photos from lifeGallery are used.
const officeFiles = import.meta.glob('../assets/Office/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}', { eager: true, import: 'default' })
const officeCaption = (path) => {
  const name = path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^\d+[\s._-]+/, '')
  if (/^(img|dsc|dscn|image|photo|pxl|screenshot|whatsapp|mvimg|pic)[\s._-]*\d*/i.test(name) || /^[\d\s._-]*$/.test(name)) return ''
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
const officeImages = Object.entries(officeFiles)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, title: officeCaption(path) }))

function Life() {
  return <PerspectiveTunnelHero id="life" images={officeImages.length ? officeImages : lifeGallery} eyebrow="Life at ProcessDrive" title={about.life.title} subtitle="From celebrations to milestones, a glimpse into life between one deployment and the next." hint="Scroll to walk through our moments" />
}

const CREDENTIALS = [
  { badge: isoBadge, alt: 'ISO 27001:2022 certified, Information Security Management Systems', status: 'Certified', title: 'ISMS certified', text: 'ISO/IEC 27001:2022 information security management, documented, audited and repeatable.' },
  { badge: claudeBadge, alt: 'Claude Certified Services Partner', status: 'Certified partner', title: 'Claude certified partner', text: 'A Claude Certified Services Partner, backed by active AI certifications across leading platforms.' },
  { badge: dnbBadge, alt: 'Dun & Bradstreet D-U-N-S registered', status: 'Registered', title: 'D-U-N-S registered', text: 'Dun & Bradstreet registered, for business verification and partnerships you can trust.' },
]

// one trust panel: three columns split by hairlines, each badge on a soft plate that floats gently, then tilts, grows and catches a sheen on hover
function Certs() {
  return (
    <section className="section overflow-hidden bg-white">
      <div className="container-pd">
        <SectionHeading center eyebrow="Credentials" title={about.certs.title} body={about.certs.body} />
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-pd-line bg-white shadow-card">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-pd-gradient" />
            <span aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pd-blue/10 blur-3xl" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pd-green/10 blur-3xl" />
            <div className="relative grid divide-y divide-pd-line md:grid-cols-3 md:divide-x md:divide-y-0">
              {CREDENTIALS.map((c, i) => (
                <div key={c.title} className="group flex flex-col items-center px-8 py-10 text-center sm:px-10 sm:py-12">
                  <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}>
                    <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-card ring-1 ring-pd-line transition duration-500 group-hover:-rotate-2 group-hover:scale-105 group-hover:shadow-glow">
                      <img src={c.badge} alt={c.alt} loading="lazy" className="h-28 w-28 object-contain" />
                      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition duration-700 group-hover:left-[130%] group-hover:opacity-100" />
                    </div>
                  </motion.div>
                  <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-pd-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pd-green">
                    <BadgeCheck className="h-3.5 w-3.5" />{c.status}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-pd-grey">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <Seo path="/about-us" title="About ProcessDrive | Our Journey to Becoming an AI-Only Company" description="From a solopreneur optimizing processes in 2012 to a fully AI-certified technology company: the ProcessDrive story, leadership, vision and values." />
      <AboutHero />
      <Timeline />
      <Numbers />
      <VisionMission />
      <Values />
      <WhatWeDo />
      {/* Leadership hidden for now. To show it again, uncomment the next line. */}
      {/* <Leadership /> */}
      <Ceo />
      <Way />
      <Life />
      {/* Halftone wordmark hidden for now. To show it again, uncomment the next line. */}
      {/* <Wordmark /> */}
      <Certs />
    </>
  )
}
