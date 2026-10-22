import { Navigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import NetworkBg from '../components/NetworkBg'
import ScrollExpand from '../components/ui/scroll-expand'
import { SectionHeading, CtaBand } from '../components/ui'
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
          <div className="container-pd grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <SectionHeading eyebrow="Overview" title={s.placeholder ? 'Coming together' : 'What this means for you'} />
            <Reveal className="prose-pd text-lg">{s.intro.map((p, i) => <p key={i} className={s.placeholder ? 'rounded-xl border border-dashed border-pd-line p-5 text-base' : ''}>{p}</p>)}</Reveal>
          </div>
        </section>
      )}

      {s.blocks.length > 0 && (
        <section className="section bg-pd-mist">
          <div className="container-pd">
            <SectionHeading eyebrow="Stack and capabilities" title={s.stackTitle} />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {s.blocks.map((b, i) => (
                <Reveal key={b.title} delay={(i % 2) * 0.1}>
                  <div className="card group h-full p-8 transition duration-300 hover:-translate-y-1.5 hover:border-pd-blue/40">
                    <span className="font-display text-sm font-bold text-pd-green">{b.num}</span>
                    <h3 className="mt-2 text-xl font-semibold">{b.title}</h3>
                    <ul className="mt-5 space-y-3">
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
            <ol className="relative mt-14 space-y-6 border-l-2 border-pd-line pl-8 sm:pl-12">
              {s.process.map((p, i) => (
                <Reveal as="li" key={p.title} className="relative">
                  <span className="absolute -left-[50px] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-pd-gradient font-display text-sm font-bold text-white shadow-glow sm:-left-[66px]">{i + 1}</span>
                  <div className="card p-6 sm:p-7"><h3 className="text-lg font-semibold">{p.title}</h3><p className="mt-2 leading-relaxed text-pd-grey">{p.text}</p></div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="bg-pd-mist py-14">
        <div className="container-pd flex flex-wrap items-center justify-between gap-6">
          <p className="flex items-center gap-3 font-display font-semibold"><ShieldCheck className="h-6 w-6 text-pd-green" />ISMS certified. AI-certified team. Built to scale.</p>
          <div className="flex flex-wrap gap-2">{others.map((o) => <Link key={o.slug} to={`/services/${o.slug}`} className="rounded-full border border-pd-line bg-white px-4 py-2 text-sm font-medium hover:border-pd-blue hover:text-pd-blue">{o.short}</Link>)}</div>
        </div>
      </section>

      <CtaBand title={s.closing.title} body={s.closing.text} cta={s.closing.cta} />
    </>
  )
}
