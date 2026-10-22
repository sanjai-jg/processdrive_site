import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import LeadForm from '../components/LeadForm'
import { PageHero } from '../components/ui'
import { company } from '../data/site'

export default function Contact() {
  return (
    <>
      <Seo path="/contact-us" title="Contact ProcessDrive | Talk to an AI Specialist" description="Contact ProcessDrive in Hosur, Tamil Nadu. Talk to an AI specialist about AI-native software, Odoo, mobile apps and websites." />
      <PageHero eyebrow="Contact us" title="Get in touch with us" sub="Tell us what you want to build or fix. An AI specialist will get back to you." />
      <section className="section bg-white">
        <div className="container-pd grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <div className="card p-8 sm:p-10">
              <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
              <LeadForm form="contact" submit="Send message" success={{ title: 'Message sent', text: 'Thank you. Our team will contact you shortly.' }}
                fields={[
                  { name: 'name', label: 'Name', required: true, auto: 'name' },
                  { name: 'phone', label: 'Phone', type: 'tel', required: true, auto: 'tel' },
                  { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' },
                  { name: 'interest', label: 'I am interested in', type: 'select', options: ['AI-Native Software Development', 'AI-Powered Odoo Implementation', 'Intelligent Mobile App Development', 'AI-Driven Website Development', 'AI Marketing & Growth', 'RentAsst', 'AIM2C', 'Something else'] },
                  { name: 'message', label: 'Message / address', type: 'textarea', required: true, placeholder: 'How can we help?' },
                ]} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5">
              <div className="card p-7">
                <ul className="space-y-5 text-sm">
                  <li className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pd-green" /><span>{company.address}</span></li>
                  <li className="flex gap-4"><Mail className="h-5 w-5 shrink-0 text-pd-green" /><a href={`mailto:${company.email}`} className="hover:text-pd-blue">{company.email}</a></li>
                  <li className="flex gap-4"><Phone className="h-5 w-5 shrink-0 text-pd-green" /><a href={company.phoneHref} className="hover:text-pd-blue">{company.phone}</a></li>
                  <li className="flex gap-4"><Clock className="h-5 w-5 shrink-0 text-pd-green" /><span>24/7 support for customers</span></li>
                </ul>
              </div>
              <div className="card overflow-hidden">
                <iframe title="ProcessDrive office map" loading="lazy" className="h-64 w-full border-0" src="https://www.google.com/maps?q=ELCOT+IT+Park+Hosur+Tamil+Nadu&output=embed" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
