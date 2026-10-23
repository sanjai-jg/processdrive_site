import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import NetworkBg from './NetworkBg'
import { company, nav } from '../data/site'

const ICONS = {
  LinkedIn: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  X: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  Instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  Facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  YouTube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-pd-navy text-white/70">
      {/* backdrop: colour glows, a faded dot grid, a still node network and a gradient hairline along the top edge */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_8%_0%,rgba(0,120,232,.30),transparent),radial-gradient(55%_70%_at_95%_100%,rgba(1,169,92,.26),transparent)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <NetworkBg still className="-z-10 opacity-40" />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pd-blue to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-pd-blue/15 blur-3xl" />
      <div className="container-pd grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1.2fr_.8fr]">
        <div>
          <Link to="/" aria-label="ProcessDrive home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-block rounded-xl bg-white p-3 transition hover:shadow-glow"><img src="/logo.jpg" alt="ProcessDrive" className="h-10 w-auto" /></Link>
          <address className="mt-6 space-y-3 text-sm not-italic">
            <p className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pd-green" />{company.address}</p>
            <p className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-pd-green" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></p>
            <p className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-pd-green" /><a href={company.phoneHref} className="hover:text-white">{company.phone}</a></p>
          </address>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Useful Links</h3>
          <ul className="space-y-2 text-sm">{[['/about-us', 'About us'], ['/careers', 'Careers'], ['/contact-us', 'Contact us'], ['/blogs', 'Blogs']].map(([to, t]) => <li key={to}><Link to={to} className="hover:text-white">{t}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Our Services</h3>
          <ul className="space-y-2 text-sm">{nav.services.map((s) => <li key={s.to}><Link to={s.to} className="hover:text-white">{s.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Our Products</h3>
          <ul className="space-y-2 text-sm">{nav.products.map((s) => <li key={s.to}><Link to={s.to} className="hover:text-white">{s.label}</Link></li>)}</ul>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80"><ShieldCheck className="h-4 w-4 text-pd-green" />Verified Partner</p>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-pd-navy px-3 py-2 shadow-[0_0_40px_-8px_rgba(1,169,92,.55)]">
          {[['LinkedIn', 'LinkedIn'], ['X', 'Twitter'], ['Instagram', 'Instagram'], ['Facebook', 'Facebook'], ['YouTube', 'YouTube']].map(([name, label]) => (
            <a key={name} href={company.social[name]} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition duration-300 hover:-translate-y-1 hover:bg-pd-gradient hover:text-white hover:shadow-glow">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true"><path d={ICONS[name]} /></svg>
            </a>
          ))}
        </div>
        <div className="container-pd flex flex-col items-center justify-between gap-3 pb-6 pt-14 text-xs sm:flex-row sm:pt-8">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <div className="flex gap-5"><Link to="/privacy-policy" className="hover:text-white">Privacy policy</Link></div>
        </div>
      </div>
    </footer>
  )
}
