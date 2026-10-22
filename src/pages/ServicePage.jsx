import { Navigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { SectionHeading, PageHero, CtaBand } from '../components/ui'
import { getService, services } from '../data/services'

export default function ServicePage() {
  const { slug } = useParams()
  const s = getService(slug)
  if (!s) return <Navigate to="/404" replace />
  const others = services.filter((x) => x.slug !== s.slug)
  return (
    <>
      <Seo path={`/services/${s.slug}`} title={s.seoTitle} description={s.seoDesc} />
      <PageHero eyebrow="Services" title={s.hero.title} sub={s.hero.sub} tagline={s.hero.tagline} cta={s.hero.cta} />

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
