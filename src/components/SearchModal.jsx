import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { posts, products } from '../data/site'

const pages = [
  { t: 'Home', to: '/', k: 'home ai native software' },
  { t: 'About us', to: '/about-us', k: 'about company journey timeline leadership vision mission values ceo' },
  { t: 'Careers', to: '/careers', k: 'jobs careers hiring apply work' },
  { t: 'Contact us', to: '/contact-us', k: 'contact phone email address hosur talk project quote' },
  { t: 'Blogs', to: '/blogs', k: 'blog articles resources insights' },
  ...services.map((s) => ({ t: s.short, to: `/services/${s.slug}`, k: `service ${s.seoDesc}` })),
  ...products.map((p) => ({ t: p.name, to: `/products/${p.slug}`, k: `product ${p.tag} ${p.blurb}` })),
  ...posts.map((p) => ({ t: p.title, to: `/blogs/posts/${p.slug}`, k: 'blog post article' })),
]

export function searchSite(q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  return pages.map((p) => {
    const title = p.t.toLowerCase(), hay = (p.t + ' ' + p.k).toLowerCase()
    let s = 0
    for (const w of words) { if (title.includes(w)) s += 3; else if (hay.includes(w)) s += 1; else return { ...p, s: 0 } }
    return { ...p, s }
  }).filter((p) => p.s > 0).sort((a, b) => b.s - a.s).slice(0, 8)
}

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState('')
  const input = useRef(null)
  const results = useMemo(() => searchSite(q), [q])
  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 50); else setQ('') }, [open])
  useEffect(() => { const f = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-pd-navy/60 p-4 pt-24 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="card w-full max-w-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-pd-line px-4">
          <Search className="h-5 w-5 text-pd-grey" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, products, articles" className="h-14 flex-1 bg-transparent text-base outline-none" />
          <button onClick={onClose} aria-label="Close search" className="rounded-full p-2 hover:bg-pd-mist"><X className="h-4 w-4" /></button>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {q && !results.length && <li className="p-4 text-sm text-pd-grey">No match. Try &ldquo;odoo&rdquo;, &ldquo;rental&rdquo; or &ldquo;mobile&rdquo;.</li>}
          {!q && <li className="p-4 text-sm text-pd-grey">Type to search the whole site. Press Esc to close.</li>}
          {results.map((r) => (
            <li key={r.to}><Link to={r.to} onClick={onClose} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium hover:bg-pd-mist">{r.t}<ArrowUpRight className="h-4 w-4 text-pd-grey" /></Link></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
