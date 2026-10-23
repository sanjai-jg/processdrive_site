import { Navigate, useParams } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import LeadForm from '../components/LeadForm'
import { SectionHeading, PageHero, CtaBand } from '../components/ui'
import HalftoneLogo from '../components/ui/halftone-logo'
import { products } from '../data/site'
import rentasstLogo from '../assets/products/nav/rentasst.png'
import aim2cLogo from '../assets/products/nav/aim2c.png'
import ragifiLogo from '../assets/products/nav/ragifi.png'

// the full logos are wide wordmarks; the hero dots use just the icon at the left, cropped as [x, y, w, h] fractions
const logos = { rentasst: [rentasstLogo, [0, 0, 0.33, 1]], aim2c: [aim2cLogo, [0, 0, 0.31, 1]], ragifi: [ragifiLogo, [0, 0, 0.29, 1]] }

export default function ProductPage() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  if (!p) return <Navigate to="/404" replace />
  return (
    <>
      <Seo path={`/products/${p.slug}`} title={`${p.name} | ${p.tag} | ProcessDrive`} description={p.blurb} />
      <PageHero eyebrow="Product" title={p.name} sub={p.status === 'soon' ? 'Coming soon.' : p.hero} cta={p.status === 'soon' ? undefined : 'Try now'} to="/contact-us" external={p.url} aside={logos[p.slug] && (
        <HalftoneLogo src={logos[p.slug][0]} crop={logos[p.slug][1]} background="transparent" grain={0} lift={0.45} dotGap={5} radius={80} scale={0.9} height="clamp(260px, 30vw, 380px)" className="touch-pan-y" />
      )}>
        {p.status !== 'soon' && <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm"><Sparkles className="h-4 w-4 text-pd-green" />{p.stat}</p>}
      </PageHero>
      {p.features.length > 0 ? (
        <section className="section bg-white">
          <div className="container-pd">
            <SectionHeading eyebrow="What it does" title={p.tag} body={p.blurb} />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.08}>
                  <div className="card h-full p-8 transition duration-300 hover:-translate-y-1.5 hover:border-pd-blue/40">
                    <span className="font-display text-sm font-bold text-pd-green">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
                    <p className="mt-3 leading-relaxed text-pd-grey">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section bg-white">
          <div className="container-pd grid items-start gap-12 lg:grid-cols-2">
            <SectionHeading eyebrow="Coming soon" title="RAGifi is on its way" body="Leave your details and we will tell you when it launches." />
            <Reveal><div className="card p-8"><LeadForm form="ragifi-waitlist" submit="Notify me" success={{ title: 'You are on the list', text: 'We will tell you as soon as RAGifi launches.' }} fields={[{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }]} /></div></Reveal>
          </div>
        </section>
      )}
      <CtaBand title={`Want to see ${p.name} in action?`} body="Talk to our team and we will show you how it fits your business." cta="Talk to us" />
    </>
  )
}
