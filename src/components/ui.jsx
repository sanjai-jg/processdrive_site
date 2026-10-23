import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import NetworkBg from './NetworkBg'
import Reveal from './Reveal'
import { footerCta } from '../data/site'

export function SectionHeading({ eyebrow, title, body, center = false, dark = false, wide = false }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} ${wide ? 'max-w-none' : 'max-w-3xl'}`}>
      {eyebrow && <span className={`eyebrow ${dark ? '!border-white/20 !bg-white/10 !text-white/80' : ''}`}>{eyebrow}</span>}
      <h2 className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-white' : ''}`}>{title}</h2>
      {body && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-pd-grey'}`}>{body}</p>}
    </Reveal>
  )
}

export function PageHero({ eyebrow, title, sub, cta, to = '/contact-us', tagline, children, aside, external }) {
  return (
    <section className="relative -mt-[88px] overflow-hidden bg-pd-navy pt-[88px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_10%,rgba(0,120,232,.35),transparent),radial-gradient(40%_70%_at_5%_100%,rgba(1,169,92,.25),transparent)]" />
      <NetworkBg className="opacity-50" />
      <div className={"container-pd relative " + (aside ? "pb-14 pt-6 sm:pb-16 sm:pt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14" : "py-16 sm:py-24")}>
        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow !border-white/20 !bg-white/10 !text-white/80">{eyebrow}</span>}
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">{title}</h1>
          {sub && <p className="mt-6 text-lg leading-relaxed text-white/75">{sub}</p>}
          {tagline && <p className="mt-4 font-display text-sm font-semibold tracking-wide text-emerald-400">{tagline}</p>}
          {cta && <div className="mt-8">{external ? <a href={external} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{cta}<ArrowRight className="h-4 w-4" /></a> : <Link to={to} className="btn btn-primary">{cta}<ArrowRight className="h-4 w-4" /></Link>}</div>}
          {children}
        </Reveal>
        {aside && <Reveal delay={0.15}>{aside}</Reveal>}
      </div>
    </section>
  )
}

export function CtaBand({ title = footerCta.title, body = footerCta.body, cta = footerCta.cta, to = '/contact-us' }) {
  return (
    <section className="relative overflow-hidden bg-pd-mist py-20 text-pd-ink">
      <div className="absolute inset-0 bg-[radial-gradient(50%_120%_at_50%_0%,rgba(0,120,232,.14),transparent),radial-gradient(40%_80%_at_90%_100%,rgba(1,169,92,.12),transparent)]" />
      <NetworkBg light className="opacity-60" />
      <Reveal className="container-pd relative text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold text-pd-navy sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-pd-grey">{body}</p>
        <Link to={to} className="btn btn-primary mt-8">{cta}<ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
    </section>
  )
}

// closing call to action used on service and product pages: a dark panel, headline on the left, contact card on the right
export function DarkCta({ title, body, cta, to = '/contact-us' }) {
  return (
  <section className="bg-white py-16 sm:py-24">
    <div className="container-pd">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-pd-navy text-white shadow-glow">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_90%_at_0%_0%,rgba(0,120,232,.38),transparent),radial-gradient(45%_80%_at_100%_100%,rgba(1,169,92,.30),transparent)]" />
        <NetworkBg className="opacity-40" />
        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-14 lg:p-16">
          <div>
            <span className="eyebrow !border-white/20 !bg-white/10 !text-white/80">Let’s talk</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{body}</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md sm:p-8">
            <ul className="space-y-3.5">
              {['ISMS certified', 'AI-certified team', 'Built to scale'].map((t) => <li key={t} className="flex items-center gap-3 text-sm font-medium text-white/90"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pd-green/20 text-pd-green"><Check className="h-4 w-4" /></span>{t}</li>)}
            </ul>
            <Link to={to} className="btn btn-primary mt-7 w-full">{cta}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
  )
}
