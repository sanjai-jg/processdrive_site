import { Link } from 'react-router-dom'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import LeadForm from '../components/LeadForm'
import { SectionHeading, PageHero } from '../components/ui'
import { jobs } from '../data/careers'
import { about } from '../data/site'

export const careerFields = (jobTitle) => [
  { name: 'name', label: 'Full name', required: true, auto: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, auto: 'tel' },
  { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' },
  { name: 'experience', label: 'Years of experience', type: 'select', options: ['Fresher', '0-2 years', '2-5 years', '5-10 years', '10+ years'], required: true },
  ...(jobTitle ? [] : [{ name: 'role', label: 'Role you are interested in', required: true, placeholder: 'e.g. Pre Sales Analyst, Developer' }]),
  { name: 'resume_link', label: 'Resume link (Google Drive, Dropbox or LinkedIn)', type: 'url', full: true, placeholder: 'https://', required: true },
  { name: 'message', label: 'Anything else we should know?', type: 'textarea' },
]

export default function Careers() {
  return (
    <>
      <Seo path="/careers" title="Careers at ProcessDrive | Join Our AI-Certified Team" description="Grow with an AI-certified team in Hosur. Certification-backed careers, continuous learning and real ownership. See open roles at ProcessDrive." />
      <PageHero eyebrow="Careers" title="Join Our Team" sub={about.way.body} cta="Apply now" to="/careers#apply" />
      <section className="section bg-white">
        <div className="container-pd">
          <SectionHeading eyebrow="Why people stay" title="The ProcessDrive Way" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.way.points.map(([t, d], i) => <Reveal key={t} delay={(i % 3) * 0.08}><div className="card h-full p-7"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-pd-grey">{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section bg-pd-mist">
        <div className="container-pd">
          <SectionHeading eyebrow="Open roles" title="Current openings" />
          <div className="mt-10 space-y-4">
            {jobs.map((j) => (
              <Reveal key={j.slug}>
                <Link to={`/careers/job-opening/${j.slug}`} className="card group flex flex-wrap items-center justify-between gap-4 p-6 transition hover:-translate-y-1 hover:border-pd-blue/40">
                  <div><h3 className="text-lg font-semibold group-hover:text-pd-blue">{j.title}</h3><p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-pd-grey"><span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{j.location}</span><span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{j.experience}</span></p></div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-pd-blue">View role<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section id="apply" className="section scroll-mt-20 bg-white">
        <div className="container-pd grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Apply" title="Don’t see your role? Tell us about you." body="Send your details and a link to your resume. Our HR team reviews every application." />
          <Reveal><div className="card p-8"><LeadForm form="career" submit="Submit application" fields={careerFields()} success={{ title: 'Application received', text: 'Thank you. Our HR team will be in touch if there is a fit.' }} /></div></Reveal>
        </div>
      </section>
    </>
  )
}
