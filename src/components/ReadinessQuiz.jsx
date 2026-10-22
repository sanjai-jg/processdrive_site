import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import LeadForm from './LeadForm'

const questions = [
  { id: 'industry', q: 'Which best describes your business?', o: ['Manufacturing', 'Rental / equipment', 'Retail / distribution', 'Services', 'Healthcare / care', 'Other'] },
  { id: 'systems', q: 'How do you run operations today?', o: ['Spreadsheets and paper', 'Odoo or another ERP', 'Custom software', 'A mix of disconnected tools'] },
  { id: 'goal', q: 'What matters most right now?', o: ['Automate repetitive workflows', 'Forecast demand and spend', 'Launch a new AI product or app', 'Improve our website and growth'] },
  { id: 'size', q: 'How big is your team?', o: ['1 to 10', '11 to 50', '51 to 250', '250+'] },
]

function recommend(a) {
  if (a.goal === 'Launch a new AI product or app') return { name: 'AI-Native Software Development', to: '/services/full-stack-saas-development', text: 'A full stack SaaS or mobile build with LLM, retrieval and prediction designed in.' }
  if (a.goal === 'Improve our website and growth') return { name: 'AI-Driven Website Development', to: '/services/website-development', text: 'A fast site with AI-assisted personalisation, search and content tooling.' }
  if (a.systems === 'Odoo or another ERP' || a.goal === 'Forecast demand and spend') return { name: 'AI-Powered Odoo Implementation', to: '/services/odoo-implementation-services', text: 'Odoo with an intelligence layer: forecasting, anomaly detection and document processing.' }
  if (a.industry === 'Rental / equipment') return { name: 'RentAsst', to: '/products/rentasst', text: 'Our AI-powered rental management platform, ready to run today.' }
  return { name: 'AI-Powered Odoo Implementation', to: '/services/odoo-implementation-services', text: 'One platform for operations, with AI where it earns its place.' }
}

export default function ReadinessQuiz() {
  const [step, setStep] = useState(0)
  const [a, setA] = useState({})
  const done = step >= questions.length
  const rec = done ? recommend(a) : null
  const q = questions[step]
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-pd-line bg-pd-mist px-6 py-4"><Sparkles className="h-5 w-5 text-pd-green" /><p className="font-display font-semibold">AI readiness check</p><span className="ml-auto text-xs text-pd-grey">{done ? 'Done' : `${step + 1} of ${questions.length}`}</span></div>
      <div className="h-1 bg-pd-line"><motion.div className="h-full bg-pd-gradient" animate={{ width: `${(Math.min(step, questions.length) / questions.length) * 100}%` }} /></div>
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={q.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <h3 className="text-xl font-semibold">{q.q}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {q.o.map((o) => <button key={o} onClick={() => { setA({ ...a, [q.id]: o }); setStep(step + 1) }} className="rounded-xl border border-pd-line px-4 py-3 text-left text-sm font-medium transition hover:border-pd-blue hover:bg-pd-blue/5">{o}</button>)}
              </div>
              {step > 0 && <button onClick={() => setStep(step - 1)} className="mt-5 inline-flex items-center gap-1 text-sm text-pd-grey hover:text-pd-blue"><ArrowLeft className="h-4 w-4" />Back</button>}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-sm font-semibold uppercase tracking-wider text-pd-green">Suggested starting point</p>
              <h3 className="mt-1 text-2xl font-bold">{rec.name}</h3>
              <p className="mt-2 text-pd-grey">{rec.text} <Link to={rec.to} className="font-semibold text-pd-blue hover:underline">Learn more</Link></p>
              <p className="mb-4 mt-6 text-sm font-medium">Want a specialist to review this with you? Leave your details.</p>
              <LeadForm form="ai-readiness" submit="Get my review" extra={{ ...a, recommendation: rec.name }} success={{ title: 'Thanks, we have your answers', text: 'An AI specialist will contact you with next steps.' }}
                fields={[{ name: 'name', label: 'Name', required: true, auto: 'name' }, { name: 'phone', label: 'Phone', type: 'tel', required: true, auto: 'tel' }, { name: 'email', label: 'Email', type: 'email', required: true, full: true, auto: 'email' }]} />
              <button onClick={() => { setA({}); setStep(0) }} className="mt-4 text-sm text-pd-grey hover:text-pd-blue">Start again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
