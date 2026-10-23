import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import NetworkBg from './NetworkBg'
import Reveal from './Reveal'
import { footerCta } from '../data/site'

export function SectionHeading({ eyebrow, title, body, center = false, dark = false, wide = false }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} ${wide ? 'max-w-none' : 'max-w-3xl'}`}>
      {eyebrow && <span className={`eyebrow ${dark ? '!border-white/20 !bg-white/10 !text-white/80' : ''}`}>{eyebrow}</span>}
      <h2 className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-white' : ''}`}>{title}</h2>
      {body && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-pd-grey'}`}>{body}</p>}
    </Reveal>
  )
}

export function PageHero({ eyebrow, title, sub, cta, to = '/contact-us', tagline, children, aside, external, titleLines, titleClass = 'lg:text-6xl' }) {
  return (
    <section className="relative -mt-[88px] overflow-hidden bg-pd-navy pt-[88px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_10%,rgba(0,120,232,.35),transparent),radial-gradient(40%_70%_at_5%_100%,rgba(1,169,92,.25),transparent)]" />
      <NetworkBg className="opacity-50" />
      <div className={"container-pd relative " + (aside ? "pb-14 pt-6 sm:pb-16 sm:pt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14" : "py-16 sm:py-24")}>
        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow !border-white/20 !bg-white/10 !text-white/80">{eyebrow}</span>}
          <h1 className={'mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl ' + titleClass}>{titleLines ? titleLines.map((l) => <span key={l} className="block sm:whitespace-nowrap">{l}</span>) : title}</h1>
          {sub && <p className="mt-6 text-lg leading-relaxed text-white/75">{sub}</p>}
          {tagline && <p className="mt-4 font-display text-sm font-semibold tracking-wide text-emerald-400">{tagline}</p>}
          {cta && <div className="mt-8">{external ? <a href={external} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{cta}<ArrowRight className="h-4 w-4" /></a> : <Link to={to} className="btn btn-primary">{cta}<ArrowRight className="h-4 w-4" /></Link>}</div>}
          {children}
        </Reveal>
        {aside && <Reveal delay={0.15}>{aside}</Reveal>}
      </div>
    </section>
  )
}

export function CtaBand({ title = footerCta.title, body = footerCta.body, cta = footerCta.cta, to = '/contact-us' }) {
  return (
    <section className="relative overflow-hidden bg-pd-mist py-20 text-pd-ink">
      <div className="absolute inset-0 bg-[radial-gradient(50%_120%_at_50%_0%,rgba(0,120,232,.14),transparent),radial-gradient(40%_80%_at_90%_100%,rgba(1,169,92,.12),transparent)]" />
      <NetworkBg light className="opacity-60" />
      <Reveal className="container-pd relative text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold text-pd-navy sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-pd-grey">{body}</p>
        <Link to={to} className="btn btn-primary mt-8">{cta}<ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
    </section>
  )
}

// brand glyphs (simple-icons paths, 24x24)
const SOCIAL = {
  YouTube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  Instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  Facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  LinkedIn: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  X: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.926ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  WhatsApp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
}

// closing call to action used on service and product pages: a dark panel, headline on the left, contact card on the right
export function DarkCta({ title, body, cta, to = '/contact-us', secondary, contact, social }) {
  return (
  <section className="bg-white py-16 sm:py-24">
    <div className="container-pd">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-pd-navy text-white shadow-glow">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_90%_at_0%_0%,rgba(0,120,232,.38),transparent),radial-gradient(45%_80%_at_100%_100%,rgba(1,169,92,.30),transparent)]" />
        <NetworkBg className="opacity-40" />
        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-14 lg:p-16">
          <div>
            <span className="eyebrow !border-white/20 !bg-white/10 !text-white/80">Let’s talk</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{body}</p>
            {contact && (
              <div className="mt-8 max-w-xl border-t border-white/15 pt-6">
                <p className="font-display text-lg font-bold">{contact.name} <span className="font-medium text-white/60">| {contact.tagline}</span></p>
                <p className="mt-1 text-sm text-white/50">A ProcessDrive Product</p>
                <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-sm text-white/85 sm:grid-cols-2">
                  {contact.email && <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-pd-green" /><a href={'mailto:' + contact.email} className="hover:text-white">{contact.email}</a></li>}
                  {contact.phone && <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-pd-green" /><a href={contact.phoneHref} className="hover:text-white">{contact.phone}</a></li>}
                  <li className="flex items-center gap-3 sm:col-span-2"><MapPin className="h-4 w-4 shrink-0 text-pd-green" />{contact.address}</li>
                </ul>
                <a href={contact.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pd-green hover:underline">{contact.site}<ArrowUpRight className="h-4 w-4" /></a>
                {social && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Follow</span>
                    {social.map((l) => (
                      <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={contact.name + ' on ' + l.name} title={l.name}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-pd-gradient hover:text-white hover:shadow-glow">
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true"><path d={SOCIAL[l.name]} /></svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md sm:p-8">
            <ul className="space-y-3.5">
              {['ISMS certified', 'AI-certified team', 'Built to scale'].map((t) => <li key={t} className="flex items-center gap-3 text-sm font-medium text-white/90"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pd-green/20 text-pd-green"><Check className="h-4 w-4" /></span>{t}</li>)}
            </ul>
            <Link to={to} className="btn btn-primary mt-7 w-full">{cta}<ArrowRight className="h-4 w-4" /></Link>
              {secondary && <Link to={secondary.to} className="btn btn-ghost mt-3 w-full">{secondary.label}</Link>}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
  )
}
