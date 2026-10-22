import { Navigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import Seo from '../components/Seo'
import LeadForm from '../components/LeadForm'
import { PageHero } from '../components/ui'
import { jobs } from '../data/careers'
import { careerFields } from './Careers'

export default function JobPage() {
  const { slug } = useParams()
  const j = jobs.find((x) => x.slug === slug)
  if (!j) return <Navigate to="/404" replace />
  return (
    <>
      <Seo path={`/careers/job-opening/${j.slug}`} title={`${j.title} | Careers | ProcessDrive`} description={`${j.title} at ProcessDrive, ${j.location}. ${j.experience}.`} />
      <PageHero eyebrow="Open role" title={j.title}>
        <dl className="mt-6 grid max-w-xl grid-cols-3 gap-4 text-sm"><div><dt className="text-white/50">Location</dt><dd className="font-semibold">{j.location}</dd></div><div><dt className="text-white/50">Experience</dt><dd className="font-semibold">{j.experience}</dd></div><div><dt className="text-white/50">Salary</dt><dd className="font-semibold">{j.salary}</dd></div></dl>
      </PageHero>
      <section className="section bg-white">
        <div className="container-pd grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Link to="/careers" className="mb-8 inline-flex items-center gap-2 text-sm text-pd-grey hover:text-pd-blue"><ArrowLeft className="h-4 w-4" />All openings</Link>
            <h2 className="text-2xl font-bold">Job responsibilities</h2>
            <ul className="mt-5 space-y-3">{j.responsibilities.map((r) => <li key={r} className="flex gap-3 text-pd-grey"><Check className="mt-1 h-4 w-4 shrink-0 text-pd-green" />{r}</li>)}</ul>
            <h2 className="mt-10 text-2xl font-bold">Desired skills</h2>
            <ul className="mt-5 space-y-3">{j.skills.map((r) => <li key={r} className="flex gap-3 text-pd-grey"><Check className="mt-1 h-4 w-4 shrink-0 text-pd-green" />{r}</li>)}</ul>
          </div>
          <aside id="apply" className="scroll-mt-24 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-8">
              <h2 className="mb-5 text-xl font-bold">Apply for this role</h2>
              <LeadForm form="career" extra={{ job: j.title, job_slug: j.slug }} submit="Submit application" fields={careerFields(j.title)} success={{ title: 'Application received', text: 'Thank you. Our HR team will be in touch if there is a fit.' }} />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
