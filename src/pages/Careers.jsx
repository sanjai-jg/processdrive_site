import { Link } from 'react-router-dom'
import { MapPin, Briefcase, ArrowRight, Award, GraduationCap, Network, Flag, Heart, FileSearch, Users, Brain, ClipboardCheck, MessagesSquare, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import LeadForm from '../components/LeadForm'
import { SectionHeading, PageHero } from '../components/ui'
import { jobs, recruitment } from '../data/careers'
import { about } from '../data/site'

const wayIcons = [Award, GraduationCap, Network, Flag, Heart]
// stock photos (Unsplash), one per point, in the same order as about.way.points
const wayPhotos = Object.values(import.meta.glob('../assets/careers/way-*.jpg', { eager: true, import: 'default' }))

const stepIcons = [FileSearch, Users, Brain, ClipboardCheck, MessagesSquare, Rocket]

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
      <section className="section overflow-hidden bg-white">
        <div className="container-pd">
          <SectionHeading eyebrow="Why people stay" title="The ProcessDrive Way" />
          <div className="mt-14">
            <ul className="grid gap-5 md:grid-cols-2">
              {about.way.points.map(([t, d], i) => {
                const Icon = wayIcons[i % wayIcons.length]
                return (
                  <Reveal as="li" key={t} delay={(i % 2) * 0.07} className={i === about.way.points.length - 1 && about.way.points.length % 2 === 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-.625rem)]" : ""}>
                    <div className="card group flex items-center gap-4 p-3 pr-5 transition duration-300 hover:-translate-y-1 hover:border-pd-blue/40 sm:gap-5 sm:p-4 sm:pr-6">
                      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-36">
                        {wayPhotos[i] && <img src={wayPhotos[i]} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />}
                        <span className="absolute bottom-1.5 left-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-pd-gradient text-white shadow-glow"><Icon className="h-4 w-4" /></span>
                      </div>
                      <div><h3 className="font-semibold">{t}</h3><p className="mt-1.5 text-sm leading-relaxed text-pd-grey">{d}</p></div>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
      <section className="section relative overflow-hidden bg-pd-mist">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-pd-green/10 blur-3xl" />
        <div className="container-pd relative">
          <SectionHeading center eyebrow={recruitment.tagline} title={recruitment.title} body={recruitment.body} />
          {/* icons sit on a rail that draws itself across each row; the step cards hang below */}
          <ol className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
            {recruitment.steps.map((st, i) => {
              const Icon = stepIcons[i]
              const last = i === recruitment.steps.length - 1
              return (
                <Reveal as="li" key={st.title} delay={(i % 3) * 0.12} className="group relative flex flex-col items-center">
                  {i % 3 !== 2 && !last && (
                    <>
                      <span aria-hidden="true" className="absolute left-1/2 top-8 hidden h-0.5 w-[calc(100%+2rem)] border-t-2 border-dashed border-pd-line lg:block" />
                      <motion.span aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.3 + (i % 3) * 0.25, ease: 'easeOut' }} className="absolute left-1/2 top-[31px] hidden h-1 w-[calc(100%+2rem)] origin-left rounded-full bg-gradient-to-r from-pd-blue to-pd-green lg:block" />
                    </>
                  )}
                  <span className={'relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-white ring-8 ring-pd-mist transition duration-300 group-hover:scale-110 ' + (last ? 'bg-pd-green shadow-[0_0_0_6px_rgba(1,169,92,.18)]' : 'bg-pd-gradient shadow-glow')}>
                    <Icon className="h-7 w-7" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-pd-mist bg-pd-navy font-display text-[11px] font-bold">{i + 1}</span>
                  </span>
                  <div className="card relative mt-7 w-full flex-1 p-7 text-center transition duration-300 group-hover:-translate-y-1.5 group-hover:border-pd-blue/40 group-hover:shadow-glow">
                    <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-pd-line bg-white transition group-hover:border-pd-blue/40" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-pd-green">Step {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-lg font-semibold">{st.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-pd-grey">{st.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>
      <section id="openings" className="section scroll-mt-20 bg-white">
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
      <section id="apply" className="section scroll-mt-20 bg-pd-mist">
        <div className="container-pd grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Apply" title="Don’t see your role? Tell us about you." body="Send your details and a link to your resume. Our HR team reviews every application." />
          <Reveal><div className="card p-8"><LeadForm form="career" submit="Submit application" fields={careerFields()} success={{ title: 'Application received', text: 'Thank you. Our HR team will be in touch if there is a fit.' }} /></div></Reveal>
        </div>
      </section>
    </>
  )
}
