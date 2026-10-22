import { ShieldCheck, BadgeCheck, Handshake, ImageIcon } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { PageHero, SectionHeading, CtaBand } from '../components/ui'
import { about, company } from '../data/site'

// Add badge image files to /public/badges and list them here, e.g. { name: 'ISO/IEC 27001', img: '/badges/iso27001.png', issuer: '...' }
const groups = [
  { icon: ShieldCheck, title: 'Information security (ISMS)', text: `${company.trust}. Our documented, audited and repeatable quality process applies to every delivery.`, badges: [] },
  { icon: BadgeCheck, title: 'AI certifications', text: 'Every employee and strategist holds active AI certification across leading AI platforms.', badges: [] },
  { icon: Handshake, title: 'Partnerships and verification', text: 'Business verification and technology partnerships.', badges: [] },
]

export default function Certifications() {
  return (
    <>
      <Seo path="/certifications" title="Certifications & Partnerships | ProcessDrive" description="ISMS certified and 100% AI-certified. See the credentials and partnerships behind ProcessDrive." />
      <PageHero eyebrow="Credentials" title={about.certs.title} sub={about.certs.body} />
      <section className="section bg-white">
        <div className="container-pd space-y-14">
          {groups.map((g) => (
            <Reveal key={g.title}>
              <div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pd-gradient text-white"><g.icon className="h-6 w-6" /></span><div><h2 className="text-2xl font-bold">{g.title}</h2><p className="mt-2 max-w-2xl text-pd-grey">{g.text}</p></div></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {g.badges.length ? g.badges.map((b) => <div key={b.name} className="card p-5 text-center"><img src={b.img} alt={b.name} className="mx-auto h-24 w-auto" /><p className="mt-3 text-sm font-semibold">{b.name}</p></div>) :
                  Array.from({ length: 4 }).map((_, i) => <div key={i} className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-pd-line bg-pd-mist text-pd-grey"><ImageIcon className="h-7 w-7 opacity-50" /><span className="text-xs">Badge placeholder</span></div>)}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  )
}
