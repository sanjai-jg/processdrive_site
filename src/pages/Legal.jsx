import Seo from '../components/Seo'
import { PageHero } from '../components/ui'
import { privacy, terms } from '../data/legal'

export default function Legal({ kind }) {
  const d = kind === 'privacy' ? privacy : terms
  const path = kind === 'privacy' ? '/privacy-policy' : '/terms-and-condition'
  return (
    <>
      <Seo path={path} title={`${d.title} | ProcessDrive`} description={`${d.title} for processdrive.com`} />
      <PageHero eyebrow="Legal" title={d.title} />
      <section className="section bg-white">
        <div className="container-pd max-w-3xl prose-pd">
          {d.paragraphs.length ? d.paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p className="rounded-xl border border-dashed border-pd-line bg-pd-mist p-6 text-sm">Legal text goes here. Paste the approved copy into <code>src/data/legal.js</code>.</p>}
        </div>
      </section>
    </>
  )
}
