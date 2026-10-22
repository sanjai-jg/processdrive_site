import { useRef, useState } from 'react'
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import { submitLead, isDemo } from '../lib/telecrm'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[+()\-\s\d]{8,18}$/

export default function LeadForm({ form, fields, submit = 'Send message', success, extra = {}, dark = false }) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle')
  const [errMsg, setErrMsg] = useState('')
  const mounted = useRef(Date.now())

  const set = (k, v) => { setValues((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })) }

  const validate = () => {
    const e = {}
    for (const f of fields) {
      const v = (values[f.name] || '').toString().trim()
      if (f.required && !v) e[f.name] = 'Required'
      else if (v && f.type === 'email' && !emailRe.test(v)) e[f.name] = 'Enter a valid email'
      else if (v && f.type === 'tel' && !phoneRe.test(v)) e[f.name] = 'Enter a valid phone number'
      else if (v && f.type === 'url' && !/^https?:\/\//i.test(v)) e[f.name] = 'Start with https://'
    }
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    // Spam guards: hidden honeypot and a minimum fill time.
    if (values.website || Date.now() - mounted.current < 2500) { setState('done'); return }
    setState('sending'); setErrMsg('')
    try {
      await submitLead(form, { ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])), ...extra })
      setState('done')
    } catch (err) {
      setState('error'); setErrMsg('We could not send your message. Please try again or call us.')
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className={`flex flex-col items-center gap-3 rounded-2xl p-10 text-center ${dark ? 'bg-white/5 text-white' : 'bg-pd-mist'}`}>
        <CheckCircle2 className="h-12 w-12 text-pd-green" />
        <h3 className="text-xl font-semibold">{success?.title || 'Thank you!'}</h3>
        <p className={dark ? 'text-white/70' : 'text-pd-grey'}>{success?.text || 'Our team will get back to you shortly.'}</p>
        {isDemo && <p className="text-xs text-pd-grey">Demo mode: TeleCRM webhook is not configured yet, nothing was sent.</p>}
      </div>
    )
  }

  const label = dark ? 'text-white/80' : 'text-pd-ink'
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={f.full || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
          <label htmlFor={`${form}-${f.name}`} className={`mb-1.5 block text-sm font-medium ${label}`}>{f.label}{f.required && <span className="text-pd-green"> *</span>}</label>
          {f.type === 'textarea' ? (
            <textarea id={`${form}-${f.name}`} rows={4} className="input" placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} aria-invalid={!!errors[f.name]} />
          ) : f.type === 'select' ? (
            <select id={`${form}-${f.name}`} className="input" defaultValue="" onChange={(e) => set(f.name, e.target.value)}>
              <option value="" disabled>Select</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input id={`${form}-${f.name}`} type={f.type || 'text'} className="input" placeholder={f.placeholder} autoComplete={f.auto} onChange={(e) => set(f.name, e.target.value)} aria-invalid={!!errors[f.name]} />
          )}
          {errors[f.name] && <p className="mt-1 text-xs text-red-500" role="alert">{errors[f.name]}</p>}
        </div>
      ))}
      {/* honeypot: hidden from people, bots fill it */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" onChange={(e) => set('website', e.target.value)} /></label>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === 'sending'} className="btn btn-primary w-full sm:w-auto disabled:opacity-70">
          {state === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : submit}
        </button>
        {state === 'error' && <p className="mt-3 flex items-center gap-2 text-sm text-red-500" role="alert"><AlertTriangle className="h-4 w-4" />{errMsg}</p>}
        <p className={`mt-3 text-xs ${dark ? 'text-white/50' : 'text-pd-grey'}`}>We use your details only to respond to this request.</p>
      </div>
    </form>
  )
}
