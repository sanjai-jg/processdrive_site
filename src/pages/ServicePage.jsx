import { Navigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck, Sparkles } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import NetworkBg from '../components/NetworkBg'
import ScrollExpand from '../components/ui/scroll-expand'
import { SectionHeading, DarkCta } from '../components/ui'
import { getService, services, serviceHeroImages } from '../data/services'

export default function ServicePage() {
  const { slug } = useParams()
  const s = getService(slug)
  if (!s) return <Navigate to="/404" replace />
  const others = services.filter((x) => x.slug !== s.slug)
  return (
    <>
      <Seo path={`/services/${s.slug}`} title={s.seoTitle} description={s.seoDesc} />
      {/* hero: a framed photo that opens up to full screen as you scroll; title, intro and button appear once it is full */}
      <section className="relative -mt-[88px] bg-pd-navy text-white" aria-label={s.hero.title}>
        <h1 className="sr-only">{s.hero.title}</h1>
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,rgba(0,120,232,.35),transparent),radial-gradient(40%_40%_at_5%_90%,rgba(1,169,92,.25),transparent)]" />
        <NetworkBg className="opacity-50" />
        <ScrollExpand useWindowScroll src={serviceHeroImages[s.slug]} alt="" title={s.hero.title} scrollHint="Scroll to explore" mediaZoom={1.25} scrollDistance={0.9} holdDistance={0.15} startWidth={46} startHeight={56} overlayScrim={0.9} largeScreenHeight={0.65}>
          {/* dark glass panel: keeps the text readable whatever the photo looks like */}
          <div className="flex max-w-3xl flex-col items-center rounded-3xl bg-pd-navy/75 px-6 py-6 text-center ring-1 ring-white/15 backdrop-blur-md sm:px-10 sm:py-8">
            <span className="eyebrow !border-white/25 !bg-white/10 !text-white/90">Services</span>
            <p className="mt-4 text-base leading-relaxed text-white sm:text-lg">{s.hero.sub}</p>
            {s.hero.tagline && <p className="mt-3 font-display text-sm font-semibold tracking-wide text-emerald-400">{s.hero.tagline}</p>}
            {s.hero.cta && <Link to="/contact-us" className="btn btn-primary mt-6">{s.hero.cta}<ArrowRight className="h-4 w-4" /></Link>}
          </div>
        </ScrollExpand>
      </section>

      {s.intro.length > 0 && (
        <section className="section bg-white">
          <div className="container-pd grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow="Overview" title={s.placeholder ? 'Coming together' : 'What this means for you'} />
              <Reveal className="mt-8 flex flex-wrap gap-2">
                {['ISMS certified', 'AI-certified team', 'Built to scale'].map((t) => <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-pd-line bg-pd-mist px-3 py-1.5 text-xs font-semibold text-pd-ink"><Check className="h-3.5 w-3.5 text-pd-green" />{t}</span>)}
              </Reveal>
            </div>
            <Reveal className="space-y-6">
              {s.intro.map((p, i) => s.placeholder
                ? <p key={i} className="flex items-start gap-4 rounded-2xl border border-dashed border-pd-blue/30 bg-pd-mist p-6 text-base leading-relaxed text-pd-grey"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-pd-blue" />{p}</p>
                : <p key={i} className={i === 0 ? 'border-l-4 border-pd-green pl-5 text-xl font-medium leading-relaxed text-pd-ink' : 'text-lg leading-relaxed text-pd-grey'}>{p}</p>)}
            </Reveal>
          </div>
        </section>
      )}

      {s.blocks.length > 0 && (
        <section className="section relative overflow-hidden bg-pd-mist">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-pd-blue/10 blur-3xl" />
          <div className="container-pd relative">
            <SectionHeading eyebrow="Stack and capabilities" title={s.stackTitle} />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {s.blocks.map((b, i) => (
                <Reveal key={b.title} delay={(i % 2) * 0.1} className={i === s.blocks.length - 1 && s.blocks.length % 2 === 1 ? 'md:col-span-2 md:mx-auto md:w-[calc(50%-.75rem)]' : ''}>
                  <div className="card group relative h-full overflow-hidden p-8 transition duration-300 hover:-translate-y-1.5 hover:border-pd-blue/40 hover:shadow-glow">
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-pd-gradient transition duration-500 group-hover:scale-x-100" />
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pd-gradient font-display text-sm font-bold text-white shadow-glow">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-xl font-semibold">{b.title}</h3>
                    </div>
                    <ul className="mt-6 space-y-3.5 border-t border-pd-line pt-6">
                      {b.points.map((p) => <li key={p} className="flex gap-3 text-sm leading-relaxed text-pd-grey"><Check className="mt-0.5 h-4 w-4 shrink-0 text-pd-green" />{p}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {s.process.length > 0 && (
        <section className="section bg-white">
          <div className="container-pd">
            <SectionHeading eyebrow="Process" title={s.processTitle} />
            {/* up to 4 steps run left to right on desktop with a connecting line; longer processes stay a vertical timeline */}
            {s.process.length <= 4 ? (
              <ol className={'relative mt-14 grid gap-6 sm:grid-cols-2 ' + (s.process.length === 4 ? 'lg:grid-cols-4' : s.process.length === 3 ? 'lg:grid-cols-3' : '')}>
                <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-[22px] hidden h-0.5 bg-gradient-to-r from-pd-blue/40 to-pd-green/40 lg:block" />
                {s.process.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={i * 0.08} className="relative">
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-pd-gradient font-display text-sm font-bold text-white shadow-glow ring-4 ring-white lg:ml-6">{i + 1}</span>
                    <div className="card mt-4 h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-pd-blue/40"><h3 className="text-lg font-semibold">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-pd-grey">{p.text}</p></div>
                  </Reveal>
                ))}
              </ol>
            ) : (
              <ol className="relative mt-14 space-y-6 border-l-2 border-pd-line pl-8 sm:pl-12">
                {s.process.map((p, i) => (
                  <Reveal as="li" key={p.title} className="relative">
                    <span className="absolute -left-[50px] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-pd-gradient font-display text-sm font-bold text-white shadow-glow sm:-left-[66px]">{i + 1}</span>
                    <div className="card p-6 sm:p-7"><h3 className="text-lg font-semibold">{p.title}</h3><p className="mt-2 leading-relaxed text-pd-grey">{p.text}</p></div>
                  </Reveal>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      <section className="bg-pd-mist py-16">
        <div className="container-pd">
          <p className="flex items-center gap-3 font-display font-semibold"><ShieldCheck className="h-6 w-6 text-pd-green" />ISMS certified. AI-certified team. Built to scale.</p>
          <h2 className="mt-8 text-xl font-bold sm:text-2xl">Explore our other services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} to={`/services/${o.slug}`} className="card group flex items-center justify-between gap-3 p-5 text-sm font-semibold transition duration-300 hover:-translate-y-1 hover:border-pd-blue/40 hover:text-pd-blue">
                {o.short}<ArrowRight className="h-4 w-4 shrink-0 text-pd-blue transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DarkCta title={s.closing.title} body={s.closing.text} cta={s.closing.cta} />
    </>
  )
}
