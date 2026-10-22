import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bot, Send, X, Sparkles } from 'lucide-react'
import { faq } from '../data/site'

// Guided assistant: answers only from approved site content (no server, no LLM).
function answer(q) {
  const w = q.toLowerCase().split(/\W+/).filter((x) => x.length > 2)
  let best = null, score = 0
  for (const f of faq) {
    const hay = (f.k + ' ' + f.q).toLowerCase()
    const s = w.filter((x) => hay.includes(x)).length
    if (s > score) { score = s; best = f }
  }
  return score ? best : null
}

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hi, I’m the ProcessDrive guide. Ask me about our services, products or certifications.' }])
  const [text, setText] = useState('')
  const end = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, open])
  const ask = (q) => {
    if (!q.trim()) return
    const a = answer(q)
    setMsgs((m) => [...m, { from: 'me', text: q }, a ? { from: 'bot', text: a.a, to: a.to } : { from: 'bot', text: 'I don’t have an answer for that. A person on our team will, so please reach out.', to: '/contact-us' }])
    setText('')
  }
  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[460px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-pd-line bg-white shadow-card sm:right-6" role="dialog" aria-label="ProcessDrive guide">
          <div className="flex items-center justify-between bg-pd-navy px-4 py-3 text-white"><span className="flex items-center gap-2 font-display text-sm font-semibold"><Sparkles className="h-4 w-4 text-pd-green" />Ask ProcessDrive</span><button onClick={() => setOpen(false)} aria-label="Close"><X className="h-4 w-4" /></button></div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'me' ? 'text-right' : ''}>
                <span className={`inline-block max-w-[85%] rounded-2xl px-4 py-2.5 text-left ${m.from === 'me' ? 'bg-pd-blue text-white' : 'bg-pd-mist text-pd-ink'}`}>{m.text}</span>
                {m.to && <div className="mt-1"><Link to={m.to} onClick={() => setOpen(false)} className="text-xs font-semibold text-pd-blue hover:underline">Learn more</Link></div>}
              </div>
            ))}
            {msgs.length < 3 && <div className="flex flex-wrap gap-2 pt-1">{faq.slice(0, 4).map((f) => <button key={f.q} onClick={() => ask(f.q)} className="rounded-full border border-pd-line px-3 py-1.5 text-xs hover:border-pd-blue hover:text-pd-blue">{f.q}</button>)}</div>}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(text) }} className="flex gap-2 border-t border-pd-line p-3">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a question" className="input !py-2.5" aria-label="Your question" />
            <button className="btn btn-primary !px-4 !py-2.5" aria-label="Send"><Send className="h-4 w-4" /></button>
          </form>
          <p className="border-t border-pd-line px-4 py-2 text-[11px] text-pd-grey">Guided answers from our own site content. For quotes or contracts, talk to our team.</p>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-label="Open the ProcessDrive guide" className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pd-gradient text-white shadow-glow transition hover:scale-105 sm:right-6">
        {!open && <span className="absolute inset-0 rounded-full bg-pd-blue/40 animate-pulseRing" />}
        <Bot className="relative h-6 w-6" />
      </button>
    </>
  )
}
