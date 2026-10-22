import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eye, Rocket, Quote, ShieldCheck, BadgeCheck, Handshake, ArrowRight, Check } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { SectionHeading, PageHero, CtaBand } from '../components/ui'
import { about, lifeGallery } from '../data/site'
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
        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
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

function VisionMission() {
  return (
    <section className="section bg-white">
      <div className="container-pd grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card h-full p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pd-gradient text-white"><Eye className="h-6 w-6" /></span>
            <h3 className="mt-6 text-2xl font-bold">Vision</h3>
            <p className="mt-3 text-lg leading-relaxed text-pd-grey">{about.vision}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card h-full p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pd-gradient text-white"><Rocket className="h-6 w-6" /></span>
            <h3 className="mt-6 text-2xl font-bold">Mission</h3>
            <p className="mt-3 text-lg leading-relaxed text-pd-grey">{about.mission.lead}</p>
            <ul className="mt-5 space-y-3">{about.mission.points.map((p) => <li key={p.title} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-pd-green" /><span><strong>{p.title}.</strong> <span className="text-pd-grey">{p.text}</span></span></li>)}</ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="section bg-pd-mist">
      <div className="container-pd grid items-center gap-10 lg:grid-cols-2">
        <SectionHeading eyebrow="Our core values" title={about.values.title} body={about.values.body} />
        <Reveal className="grid grid-cols-2 gap-4">
          {['People', 'AI-certified', 'Collaboration', 'Ownership'].map((v, i) => (
            <div key={v} className={`card flex h-28 items-center justify-center font-display text-lg font-bold ${i % 3 === 0 ? 'gradient-text' : ''}`}>{v}</div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function WhatWeDo() {
  return (
    <section className="section bg-white">
      <div className="container-pd">
        <SectionHeading eyebrow="What we do" title={about.whatWeDo.title} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {about.whatWeDo.points.map((p, i) => (
            <Reveal key={p} delay={(i % 2) * 0.08}><div className="card flex h-full gap-4 p-6"><Check className="mt-1 h-5 w-5 shrink-0 text-pd-green" /><p className="leading-relaxed">{p}</p></div></Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pd-grey">Also under this umbrella</p>
          <div className="flex flex-wrap gap-2">{about.whatWeDo.also.map((a) => <span key={a} className="rounded-full border border-pd-line bg-pd-mist px-4 py-2 text-sm font-medium">{a}</span>)}</div>
        </Reveal>
      </div>
    </section>
  )
}

const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((x) => x[0]).join('')

function Leadership() {
  return (
    <section id="leadership" className="section scroll-mt-24 bg-pd-mist">
      <div className="container-pd">
        <SectionHeading eyebrow="Leadership" title={about.leadership.title} body={about.leadership.body} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.leadership.people.map(([name, role], i) => (
            <Reveal key={name} delay={(i % 3) * 0.08}>
              <div className="card group flex items-center gap-5 p-6 transition duration-300 hover:-translate-y-1">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pd-gradient font-display text-xl font-bold text-white">{initials(name)}</span>
                <div><p className="font-display font-semibold">{name}</p><p className="mt-0.5 text-sm text-pd-grey">{role}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ceo() {
  return (
    <section className="section bg-white">
      <div className="container-pd">
        <Reveal className="relative mx-auto max-w-4xl rounded-3xl bg-pd-navy p-10 text-white shadow-glow sm:p-14">
          <Quote className="h-10 w-10 text-pd-green" />
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/60">{about.ceo.title}</p>
          <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed sm:text-2xl">{about.ceo.quote}</blockquote>
          <p className="mt-6 font-semibold text-pd-green">{about.ceo.by}</p>
          {about.ceo.placeholder && <p className="mt-4 text-xs text-white/40">Placeholder quote: replace with Saravanan’s own words before launch.</p>}
        </Reveal>
      </div>
    </section>
  )
}

function Way() {
  return (
    <section className="section bg-pd-mist">
      <div className="container-pd">
        <SectionHeading eyebrow="Culture" title={about.way.title} body={about.way.body} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.way.points.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.08}><div className="card h-full p-7"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-pd-grey">{d}</p></div></Reveal>
          ))}
        </div>
        <Reveal className="mt-10"><Link to="/careers" className="btn btn-primary">See open roles<ArrowRight className="h-4 w-4" /></Link></Reveal>
      </div>
    </section>
  )
}

function AboutHero() {
  return (
    <section className="bg-white">
      <div className="container-pd pt-20 sm:pt-28">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">About us</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-pd-navy sm:text-5xl lg:text-6xl">{about.intro.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-pd-grey">{about.intro.body}</p>
        </Reveal>
      </div>
      <HalftoneWordmark
        as="div" hideTop backToTop={false} wordmark="ProcessDrive" className="mt-6"
        palette={{ background: '#FFFFFF', ink: '#0A1020', warm: '#0078E8' }} splitAt={7} warmAfter="#01A95C"
        fontFamily={'Sora, Inter, "Helvetica Neue", Arial, system-ui, sans-serif'} fontWeight={800}
        dotGap={5} radius={90} crop={-0.12} fill={0.94} grain={0.3} height="300px"
      />
    </section>
  )
}

function LogoPlay() {
  return (
    <HalftoneLogo height="560px" className="touch-pan-y">
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-5 py-10 text-white sm:px-8">
        <div>
          <p className="eyebrow !text-pd-green">The mark</p>
          <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight sm:text-4xl">Every dot is a process we drive.</h2>
        </div>
        <p className="text-sm text-white/50">Move your cursor through the logo. Click to send a ripple.</p>
      </div>
    </HalftoneLogo>
  )
}

function Life() {
  return <PerspectiveTunnelHero id="life" images={lifeGallery} eyebrow="Life at ProcessDrive" title={about.life.title} subtitle="From celebrations to milestones, a glimpse into life between one deployment and the next." hint="Scroll to walk through our moments" />
}

function Certs() {
  return (
    <section className="section bg-pd-navy text-white">
      <div className="container-pd">
        <SectionHeading dark center eyebrow="Credentials" title={about.certs.title} body={about.certs.body} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[[ShieldCheck, 'ISMS certified', 'ISO/IEC 27001 information security'], [BadgeCheck, 'AI-certified team', 'Active certifications across leading AI platforms'], [Handshake, 'Verified partner', 'Business verification and partnerships']].map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 0.1}><div className="rounded-2xl border border-white/10 bg-white/5 p-8"><I className="h-8 w-8 text-pd-green" /><h3 className="mt-4 text-lg font-semibold">{t}</h3><p className="mt-2 text-sm text-white/60">{d}</p></div></Reveal>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/certifications" className="btn btn-ghost">View all certifications<ArrowRight className="h-4 w-4" /></Link></div>
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
      <Leadership />
      <Ceo />
      <LogoPlay />
      <Way />
      <Life />
      <Certs />
      <CtaBand />
    </>
  )
}
