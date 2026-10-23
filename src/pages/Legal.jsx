import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { PageHero } from '../components/ui'
import { privacy, terms } from '../data/legal'

// turns email addresses and the site URL inside a string into links
function Rich({ text }) {
  return text.split(/([\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s,)]+)/g).map((part, i) => {
    if (i % 2 === 0) return part
    const href = part.includes('@') ? `mailto:${part}` : part
    return <a key={i} href={href} className="font-medium text-pd-blue underline-offset-2 hover:underline">{part}</a>
  })
}

function Block({ b }) {
  if (typeof b === 'string') return <p className="leading-relaxed text-pd-grey"><Rich text={b} /></p>
  if (b.h3) return <h3 className="pt-3 font-display text-base font-semibold text-pd-ink">{b.h3}</h3>
  if (b.ul) return <ul className="space-y-2.5">{b.ul.map((x) => <li key={x} className="flex gap-3 leading-relaxed text-pd-grey"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pd-green" /><span><Rich text={x} /></span></li>)}</ul>
  if (b.ol) return <ol className="space-y-2.5">{b.ol.map((x, i) => <li key={x} className="flex gap-3 leading-relaxed text-pd-grey"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pd-blue/10 text-xs font-bold text-pd-blue">{i + 1}</span><span>{x}</span></li>)}</ol>
  if (b.terms) return <div className="space-y-3">{b.terms.map((x) => <div key={x.t} className="rounded-xl border border-pd-line bg-pd-mist/60 p-4 sm:p-5"><p className="font-semibold text-pd-ink">{x.t}</p><p className="mt-1.5 leading-relaxed text-pd-grey"><Rich text={x.d} /></p></div>)}</div>
  return null
}

export default function Legal({ kind }) {
  const d = kind === 'privacy' ? privacy : terms
  const path = kind === 'privacy' ? '/privacy-policy' : '/terms-and-condition'
  return (
    <>
      <Seo path={path} title={`${d.title} | ProcessDrive`} description={`${d.title} for processdrive.com`} />
      <PageHero eyebrow="Legal" title={d.title} sub={d.updated ? `Last updated ${d.updated}` : undefined} />
      <section className="section bg-white">
        <div className="container-pd max-w-3xl">
          {d.sections.length ? (
            <>
              {d.intro.map((p, i) => <p key={i} className="mb-10 text-lg leading-relaxed text-pd-grey"><Rich text={p} /></p>)}
              <div className="space-y-12">
                {d.sections.map((s, i) => (
                  <Reveal key={s.h} y={16}>
                    <section aria-labelledby={`legal-${i}`}>
                      <h2 id={`legal-${i}`} className="flex items-center gap-3 border-b border-pd-line pb-3 text-xl font-bold sm:text-2xl"><span className="h-6 w-1.5 rounded-full bg-pd-gradient" />{s.h}</h2>
                      <div className="mt-5 space-y-4">{s.blocks.map((b, j) => <Block key={j} b={b} />)}</div>
                    </section>
                  </Reveal>
                ))}
              </div>
              {d.footnote && <p className="mt-14 rounded-xl border border-pd-line bg-pd-mist p-5 text-sm leading-relaxed text-pd-grey">{d.footnote}</p>}
            </>
          ) : (
            <p className="rounded-xl border border-dashed border-pd-line bg-pd-mist p-6 text-sm">Legal text goes here. Paste the approved copy into <code>src/data/legal.js</code>.</p>
          )}
        </div>
      </section>
    </>
  )
}
