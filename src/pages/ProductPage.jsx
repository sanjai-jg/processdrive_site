import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Bell, BellRing, BookOpen, Bot, Building2, CalendarDays, Check, ChevronDown, ClipboardCheck, Clock, Cloud, Code2, Database, FileText, Gauge, Headset,
  Heart, Mail, MapPin, MessageCircle, PackageCheck, Phone, QrCode, Receipt, RefreshCw, Server, ShieldAlert, ShieldCheck, ShoppingCart, Smartphone, Store, TrendingUp, Users, Wallet, X, Zap, BarChart3,
} from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import NetworkBg from '../components/NetworkBg'
import { SectionHeading, PageHero, DarkCta } from '../components/ui'
import HalftoneLogo from '../components/ui/halftone-logo'
import RentAsstInstagram from '../components/RentAsstInstagram'
import ProductMascot from '../components/RentAsstMascot'
import rentasstMascot from '../assets/products/Cheerful_Neon_Robot_Mascot-removebg-preview.png'
import ragifiMascot from '../assets/products/ragifi-mascot.png'
import aim2cMascot from '../assets/products/aim2c-mascot.png'
import { products } from '../data/site'
import { productPages } from '../data/productPages'
import rentasstLogo from '../assets/products/nav/rentasst.png'
import aim2cLogo from '../assets/products/nav/aim2c.png'
import ragifiLogo from '../assets/products/nav/ragifi.png'
import mobileApp from '../assets/products/mobileapp-eYRlhHFU.webp'
import careitLogo from '../assets/products/CareIT (2).png'

// the full logos are wide wordmarks; the hero dots use just the icon at the left, cropped as [x, y, w, h] fractions
const logos = { rentasst: [rentasstLogo, [0, 0, 0.33, 1]], aim2c: [aim2cLogo, [0, 0, 0.31, 1]], ragifi: [ragifiLogo, [0, 0, 0.29, 1]] }

const ICONS = {
  calendar: CalendarDays, receipt: Receipt, boxes: PackageCheck, alert: ShieldAlert, message: MessageCircle, bell: BellRing, gauge: Gauge, trend: TrendingUp, building: Building2, wallet: Wallet,
  file: FileText, chart: BarChart3, store: Store, cart: ShoppingCart, book: BookOpen, sync: RefreshCw, phone: Smartphone, checklist: ClipboardCheck, qr: QrCode, cloud: Cloud, server: Server,
  zap: Zap, clock: Clock, bot: Bot, database: Database, code: Code2, support: Headset, heart: Heart, users: Users, shield: ShieldCheck,
}

// one icon per "why" card, in order
const WHY_ICONS = [PackageCheck, Receipt, MessageCircle, ShieldAlert, TrendingUp, ShieldCheck]

const pad = (i) => String(i + 1).padStart(2, '0')

// numbered cards that wrap and centre, so an incomplete last row sits in the middle
function CardGrid({ items, cols = 3 }) {
  const width = cols === 4 ? 'lg:w-[calc(25%-1.125rem)]' : 'lg:w-[calc(33.333%-1rem)]'
  return (
    <div className="mt-14 flex flex-wrap justify-center gap-6">
      {items.map((f, i) => {
        const Icon = ICONS[f.icon]
        return (
          <Reveal key={f.title} delay={(i % 3) * 0.08} className={`w-full md:w-[calc(50%-.75rem)] ${width}`}>
            <div className="card group relative h-full overflow-hidden p-7 transition duration-300 hover:-translate-y-1.5 hover:border-pd-blue/40 hover:shadow-glow">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-pd-gradient transition duration-500 group-hover:scale-x-100" />
              <span aria-hidden="true" className="absolute -right-2 top-1 font-display text-7xl font-extrabold text-pd-ink/[0.04]">{pad(i)}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pd-gradient text-white shadow-glow transition duration-300 group-hover:scale-110">{Icon ? <Icon className="h-6 w-6" /> : pad(i)}</span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-pd-grey">{f.text}</p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

// four-step rail: icons sit on a line that draws itself, step cards hang below
function Steps({ steps }) {
  return (
    <ol className="relative mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((st, i) => (
        <Reveal as="li" key={st.title} delay={i * 0.1} className="group relative flex flex-col items-center">
          {i < steps.length - 1 && (
            <>
              <span aria-hidden="true" className="absolute left-1/2 top-8 hidden h-0.5 w-[calc(100%+2rem)] border-t-2 border-dashed border-pd-line lg:block" />
              <motion.span aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.3 + i * 0.25, ease: 'easeOut' }} className="absolute left-1/2 top-[31px] hidden h-1 w-[calc(100%+2rem)] origin-left rounded-full bg-gradient-to-r from-pd-blue to-pd-green lg:block" />
            </>
          )}
          <span className={'relative z-10 flex h-16 w-16 items-center justify-center rounded-full font-display text-xl font-bold text-white ring-8 ring-white transition duration-300 group-hover:scale-110 ' + (i === steps.length - 1 ? 'bg-pd-green shadow-[0_0_0_6px_rgba(1,169,92,.18)]' : 'bg-pd-gradient shadow-glow')}>{i + 1}</span>
          <div className="card relative mt-7 w-full flex-1 p-6 text-center transition duration-300 group-hover:-translate-y-1.5 group-hover:border-pd-blue/40 group-hover:shadow-glow">
            <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-pd-line bg-white transition group-hover:border-pd-blue/40" />
            <p className="text-xs font-semibold uppercase tracking-widest text-pd-green">Step {pad(i)}</p>
            <h3 className="mt-2 text-lg font-semibold">{st.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-pd-grey">{st.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

function Faq({ items }) {
  return (
    <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={(i % 2) * 0.05} y={14} className={i === items.length - 1 && items.length % 2 === 1 ? 'lg:col-span-2 lg:mx-auto lg:w-[calc(50%-.5rem)]' : ''}>
          <details className="card group overflow-hidden transition hover:border-pd-blue/40 open:border-pd-blue/40 open:shadow-glow">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-pd-blue transition duration-300 group-open:rotate-180" />
            </summary>
            <p className="border-t border-pd-line px-5 pb-5 pt-4 text-sm leading-relaxed text-pd-grey">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  )
}

function InlineCta({ text }) {
  return (
    <Reveal className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-pd-gradient p-6 text-white shadow-glow sm:flex-row sm:p-8">
      <p className="font-display text-lg font-bold sm:text-xl">{text}</p>
      <Link to="/contact-us" className="btn shrink-0 bg-white text-pd-navy hover:bg-white/90">Book a free demo<ArrowRight className="h-4 w-4" /></Link>
    </Reveal>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const base = products.find((x) => x.slug === slug)
  const p = productPages[slug]
  if (!base || !p) return <Navigate to="/404" replace />

  let n = 0
  const tone = () => (n++ % 2 ? 'bg-pd-mist' : 'bg-white')
  const c = p.contact

  return (
    <>
      <Seo path={`/products/${slug}`} title={`${base.name} | ${p.headline} | ProcessDrive`} description={p.sub} />
      {slug === 'rentasst' && <RentAsstInstagram />}
      {slug === 'rentasst' && <ProductMascot src={rentasstMascot} alt="RentAsst mascot" />}
      {slug === 'ragifi' && <ProductMascot src={ragifiMascot} alt="RAGifi mascot" />}
      {slug === 'aim2c' && <ProductMascot src={aim2cMascot} alt="AIM2C mascot" />}

      <PageHero eyebrow={p.label} title={p.headline} titleLines={p.titleLines} titleClass={p.titleLines ? 'lg:text-5xl' : undefined} sub={p.sub} aside={logos[slug] && (
        <HalftoneLogo src={logos[slug][0]} crop={logos[slug][1]} background="transparent" grain={0} lift={0.45} dotGap={5} radius={80} scale={0.9} height="clamp(260px, 30vw, 380px)" className="touch-pan-y" />
      )}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link to="/contact-us" className="btn btn-primary">Book a Free Demo<ArrowRight className="h-4 w-4" /></Link>
          <a href="#how-it-works" className="btn btn-ghost">See How It Works</a>
        </div>
        <ul className="mt-7 flex flex-wrap gap-2">
          {p.trust.map((t) => <li key={t} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm"><Check className="h-4 w-4 text-pd-green" />{t}</li>)}
        </ul>
      </PageHero>

      {p.trustBar && (
        <div className="border-b border-pd-line bg-white">
          <p className="container-pd py-5 text-center text-sm font-medium text-pd-grey">{p.trustBar}</p>
        </div>
      )}

      {/* problem -> solution */}
      <section className={`section ${tone()}`}>
        <div className="container-pd">
          <SectionHeading center eyebrow="The problem" title={p.problem.title} />
          <ul className={`mx-auto mt-12 grid max-w-5xl gap-4 ${p.problem.items.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
            {p.problem.items.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.08}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-red-200 bg-red-50/60 p-5 font-semibold text-pd-ink">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"><X className="h-4 w-4" /></span>{t}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mx-auto mt-10 max-w-3xl text-center">
            {p.problem.intro && <p className="text-lg leading-relaxed text-pd-grey">{p.problem.intro}</p>}
            <p className="mt-5 inline-flex items-start gap-3 rounded-2xl bg-pd-gradient px-6 py-4 text-left text-lg font-medium leading-relaxed text-white shadow-glow"><ShieldCheck className="mt-1 h-5 w-5 shrink-0" />{p.problem.solution}</p>
          </Reveal>
        </div>
      </section>

      {/* core features */}
      <section className={`section relative overflow-hidden ${tone()}`}>
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-pd-blue/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pd-green/10 blur-3xl" />
        <div className="container-pd relative">
          <SectionHeading center eyebrow="Core features" title={p.featuresTitle} />
          <CardGrid items={p.features} />
        </div>
      </section>

      {/* AIM2C checklist library */}
      {p.library && (
        <section className={`section ${tone()}`}>
          <div className="container-pd">
            <SectionHeading center eyebrow="Checklist library" title={p.library.title} />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {p.library.groups.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.1}>
                  <div className="card h-full p-7">
                    <h3 className="flex items-center gap-3 text-lg font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pd-gradient text-white"><ClipboardCheck className="h-5 w-5" /></span>{g.title}</h3>
                    <ul className="mt-5 space-y-2.5">
                      {g.items.map((t) => <li key={t} className="flex gap-3 text-sm text-pd-grey"><Check className="mt-0.5 h-4 w-4 shrink-0 text-pd-green" />{t}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* how it works */}
      <section id="how-it-works" className={`section scroll-mt-20 ${tone()}`}>
        <div className="container-pd">
          <SectionHeading center eyebrow="How it works" title={p.steps.title} />
          <Steps steps={p.steps.items} />
        </div>
      </section>

      {/* industries */}
      {p.industries && (
        <section className={`section ${tone()}`}>
          <div className="container-pd">
            <SectionHeading center eyebrow="Industries" title={p.industries.title} />
            <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
              {p.industries.items.map((t, i) => (
                <Reveal as="li" key={t} delay={(i % 8) * 0.03} y={12}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-pd-line bg-white px-4 py-2 text-sm font-medium shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-pd-blue/40 hover:text-pd-blue"><span className="h-1.5 w-1.5 rounded-full bg-pd-green" />{t}</span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-10 text-center font-display text-lg font-semibold text-pd-navy">{p.industries.line}</p>
          </div>
        </section>
      )}

      {/* RentAsst mobile app */}
      {p.mobile && (
        <section className="relative overflow-hidden bg-pd-navy py-20 text-white sm:py-28">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_80%_at_85%_30%,rgba(214,41,118,.28),transparent),radial-gradient(45%_70%_at_5%_90%,rgba(0,120,232,.32),transparent)]" />
          <NetworkBg still className="opacity-30" />
          <div className="container-pd relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
            <Reveal>
              <span className="eyebrow !border-white/20 !bg-white/10 !text-white/80">Mobile app</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{p.mobile.title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{p.mobile.text}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {[[Users, p.mobile.points[0]], [RefreshCw, p.mobile.points[1]], [CalendarDays, 'Check availability anywhere'], [Smartphone, 'Works on Android and iPhone']].map(([I, t]) => (
                  <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm font-medium backdrop-blur-md">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pd-gradient text-white"><I className="h-4 w-4" /></span>{t}
                  </li>
                ))}
              </ul>
              <p className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Get the app</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href={p.mobile.stores.play} target="_blank" rel="noopener noreferrer" aria-label="Get RentAsst on Google Play" className="group flex items-center gap-3 rounded-2xl border border-white/25 bg-black px-5 py-3 transition duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-glow">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true"><path fill="#00d7fe" d="M3.6 1.6c-.3.3-.5.8-.5 1.4v18c0 .6.2 1.1.5 1.4l.1.1 10.1-10.1v-.2L3.7 1.5z" /><path fill="#00f076" d="M17.2 15.7l-3.4-3.4v-.2l3.4-3.4.1.1 4 2.3c1.1.6 1.1 1.7 0 2.4l-4 2.3z" /><path fill="#ff3a44" d="M17.3 15.6l-3.5-3.5L3.6 22.4c.4.4 1 .4 1.7.1l12-6.9" /><path fill="#ffd400" d="M17.3 8.6L5.3 1.7c-.7-.4-1.3-.3-1.7.1l10.2 10.3z" /></svg>
                  <span className="text-left leading-tight"><span className="block text-[10px] font-medium uppercase tracking-wider text-white/70">Get it on</span><span className="block font-display text-lg font-bold">Google Play</span></span>
                </a>
                <a href={p.mobile.stores.apple} target="_blank" rel="noopener noreferrer" aria-label="Download RentAsst on the App Store" className="group flex items-center gap-3 rounded-2xl border border-white/25 bg-black px-5 py-3 transition duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-glow">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                  <span className="text-left leading-tight"><span className="block text-[10px] font-medium uppercase tracking-wider text-white/70">Download on the</span><span className="block font-display text-lg font-bold">App Store</span></span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem]">
              <div aria-hidden="true" className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(214,41,118,.4),rgba(0,120,232,.18)_60%,transparent)]" />
              <motion.img src={mobileApp} alt="The RentAsst app on Google Play" loading="lazy" width="540" height="960" className="w-full drop-shadow-[0_30px_50px_rgba(0,0,0,.5)]"
                animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
              {[[Check, 'Free to download', '-right-4 top-[46%]', 0.9], [ShieldCheck, 'By ProcessDrive', '-left-2 bottom-[14%]', 1.6]].map(([I, t, pos, d]) => (
                <motion.span key={t} className={`absolute ${pos} hidden items-center gap-2 rounded-full border border-white/20 bg-pd-navy/85 px-3.5 py-2 text-xs font-semibold shadow-glow backdrop-blur sm:flex`} animate={{ y: [0, -7, 0] }} transition={{ duration: 4 + d, repeat: Infinity, ease: 'easeInOut', delay: d }}>
                  <I className="h-4 w-4 text-pd-green" />{t}
                </motion.span>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* RAGifi security */}
      {p.security && (
        <section className={`section ${tone()}`}>
          <div className="container-pd">
            <SectionHeading center eyebrow="Security & compliance" title={p.security.title} />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {p.security.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div className="card h-full p-8 text-center transition duration-300 hover:-translate-y-1.5 hover:border-pd-blue/40 hover:shadow-glow">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pd-gradient text-white shadow-glow"><ShieldCheck className="h-7 w-7" /></span>
                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-pd-grey">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RAGifi use cases */}
      {p.useCases && (
        <section className={`section ${tone()}`}>
          <div className="container-pd">
            <SectionHeading center eyebrow="Use cases" title={p.useCases.title} />
            <CardGrid items={p.useCases.items} />
          </div>
        </section>
      )}

      {/* RAGifi proven */}
      {p.proven && (
        <section className="bg-white pb-4 pt-4 sm:pb-8">
          <div className="container-pd">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-pd-navy p-8 text-white shadow-glow sm:p-12">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_90%_at_0%_0%,rgba(0,120,232,.38),transparent),radial-gradient(45%_80%_at_100%_100%,rgba(1,169,92,.30),transparent)]" />
              <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
                <span className="mx-auto flex h-28 w-52 items-center justify-center rounded-2xl bg-white p-4 shadow-glow md:mx-0"><img src={careitLogo} alt="CareIT" className="max-h-full max-w-full object-contain" /></span>
                <div>
                  <span className="eyebrow !border-white/20 !bg-white/10 !text-white/80">Proven in the real world</span>
                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{p.proven.title}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-white/75">{p.proven.text}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* why this product */}
      <section className={`section relative overflow-hidden ${tone()}`}>
        <motion.div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-pd-blue/10 blur-3xl" animate={{ x: [0, 40, 0], y: [0, 24, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-pd-green/10 blur-3xl" animate={{ x: [0, -40, 0], y: [0, -24, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="container-pd relative">
          <SectionHeading center eyebrow={`Why ${p.label}`} title={p.why.title} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.why.items.map((w, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length]
              return (
                <motion.div key={w.title} initial={{ opacity: 0, y: 36, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ type: 'spring', stiffness: 90, damping: 16, delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.08 }}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-pd-line bg-white p-7 shadow-card transition duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_24px_50px_-18px_rgba(0,120,232,.35)]">
                    {/* gradient frame that fades in on hover */}
                    <span aria-hidden="true" className="absolute inset-0 -z-0 rounded-2xl bg-pd-gradient opacity-0 transition duration-500 group-hover:opacity-100" />
                    <span aria-hidden="true" className="absolute inset-[1.5px] rounded-[0.9rem] bg-white" />
                    {/* light sheen that sweeps across on hover */}
                    <span aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-pd-blue/10 to-transparent opacity-0 transition duration-700 group-hover:left-[130%] group-hover:opacity-100" />
                    <span aria-hidden="true" className="absolute -right-1 -top-3 font-display text-8xl font-extrabold text-pd-ink/[0.04] transition duration-500 group-hover:text-pd-blue/[0.09]">{pad(i)}</span>
                    <div className="relative">
                      <span className="relative inline-flex">
                        <motion.span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pd-gradient text-white shadow-glow transition duration-500 group-hover:rotate-6 group-hover:scale-110" animate={{ y: [0, -4, 0] }} transition={{ duration: 3.2 + (i % 3) * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}>
                          <Icon className="h-7 w-7" />
                        </motion.span>
                        <motion.span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-pd-green text-white ring-2 ring-white" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.5 + i * 0.08 }}>
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </motion.span>
                      </span>
                      <h3 className="mt-5 text-lg font-semibold transition-colors duration-300 group-hover:text-pd-blue">{w.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-pd-grey">{w.text}</p>
                    </div>
                    {/* bar that fills along the bottom on hover */}
                    <span aria-hidden="true" className="absolute inset-x-[1.5px] bottom-[1.5px] h-1 origin-left scale-x-0 rounded-b-2xl bg-pd-gradient transition duration-700 group-hover:scale-x-100" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="relative overflow-hidden bg-pd-navy py-16 text-white sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_100%_at_0%_0%,rgba(0,120,232,.3),transparent),radial-gradient(50%_90%_at_100%_100%,rgba(1,169,92,.25),transparent)]" />
        <NetworkBg still className="opacity-30" />
        <div className="container-pd relative">
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/60">{p.label} in numbers</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {p.numbers.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.08} className="w-1/2 text-center sm:w-[calc(33.333%-1rem)] lg:w-auto lg:min-w-[10rem] lg:flex-1">
                <p className="font-display text-4xl font-extrabold sm:text-5xl"><span className="bg-gradient-to-r from-[#3b9cff] to-pd-green bg-clip-text text-transparent"><CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} /></span></p>
                <p className="mt-2 text-sm text-white/70">{s.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* RentAsst sales module + store builder */}
      {[p.sales, p.store].filter(Boolean).map((blk) => (
        <section key={blk.title} className={`section ${tone()}`}>
          <div className="container-pd">
            <SectionHeading center eyebrow={blk.eyebrow} title={blk.title} body={blk.sub} />
            <CardGrid items={blk.items} cols={blk.items.length === 8 ? 4 : 3} />
            <InlineCta text={blk.cta} />
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className={`section ${tone()}`}>
        <div className="container-pd">
          <SectionHeading center eyebrow="FAQ" title="Frequently asked questions" />
          <Faq items={p.faq} />
        </div>
      </section>

      <DarkCta title={p.cta.title} body={p.cta.body} cta="Book a Free Demo" secondary={{ label: 'Talk to Our Team', to: '/contact-us' }} contact={c} social={p.social} />
    </>
  )
}
