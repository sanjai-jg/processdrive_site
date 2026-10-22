import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Boxes, ChevronDown, CodeXml, Globe, Megaphone, Menu, Smartphone, X } from 'lucide-react'
import { nav } from '../data/site'
import aim2cLogo from '../assets/products/nav/aim2c.png'
import ragifiLogo from '../assets/products/nav/ragifi.png'
import rentasstLogo from '../assets/products/nav/rentasst.png'

const navIcons = {
  '/services/full-stack-saas-development': CodeXml,
  '/services/odoo-implementation-services': Boxes,
  '/services/mobile-app-development': Smartphone,
  '/services/website-development': Globe,
  '/services/digital-marketing-services': Megaphone,
}

// products show their own wordmark instead of an icon + label
const navLogos = {
  '/products/rentasst': rentasstLogo,
  '/products/aim2c': aim2cLogo,
  '/products/ragifi': ragifiLogo,
}

function NavIcon({ to, className = '' }) {
  const I = navIcons[to]
  return I ? <span className={`flex shrink-0 items-center justify-center rounded-lg bg-pd-blue/10 text-pd-blue transition duration-200 group-hover/item:bg-pd-gradient group-hover/item:text-white ${className}`}><I className="h-4 w-4" /></span> : null
}

function NavItemContent({ item, logoClass = 'h-9' }) {
  const logo = navLogos[item.to]
  if (logo) return <img src={logo} alt={item.label} loading="lazy" className={`${logoClass} w-auto max-w-[10rem] object-contain object-left transition duration-200 group-hover/item:scale-[1.04]`} />
  return <><NavIcon to={item.to} className="h-8 w-8" />{item.label}</>
}

function Dropdown({ label, items, width = 'w-72' }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-pd-ink transition hover:text-pd-blue" aria-haspopup="true">{label}<ChevronDown className="h-4 w-4 transition group-hover:rotate-180" /></button>
      <div className={`invisible absolute left-0 top-full z-50 ${width} translate-y-2 pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}>
        <div className="card p-2">
          {items.map((it) => (
            <Link key={it.to} to={it.to} className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-pd-ink hover:bg-pd-mist hover:text-pd-blue">
              <NavItemContent item={it} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// mobile accordion group: the heading toggles its list open and closed
function MobileGroup({ label, items, isOpen, onToggle, logoClass }) {
  return (
    <div className="border-b border-pd-line/70 last:border-0">
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className={`flex w-full items-center justify-between py-3 text-left text-sm font-semibold transition ${isOpen ? 'text-pd-blue' : 'text-pd-ink'}`}>
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className={`pb-3 ${isOpen ? '' : 'invisible'}`}>
            {items.map((s) => <Link key={s.to} to={s.to} tabIndex={isOpen ? 0 : -1} className="group/item flex items-center gap-3 rounded-xl py-2 pl-1 text-sm font-medium"><NavItemContent item={s} logoClass={logoClass} /></Link>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState(null)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); setGroup(null) }, [pathname])
  const link = ({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition hover:text-pd-blue ${isActive ? 'text-pd-blue' : 'text-pd-ink'}`
  return (
    <>
      <header className="pointer-events-none sticky top-0 z-40 h-[88px] px-3 pt-3 sm:px-5">
       <div className="pointer-events-auto mx-auto max-w-[1320px] rounded-[2rem] border border-pd-line/70 bg-white shadow-[0_10px_40px_-12px_rgba(10,22,40,.25)]">
        <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" aria-label="ProcessDrive home"><img src="/logo.jpg" alt="ProcessDrive: transforming businesses to scale" className="h-11 w-auto sm:h-12" width="240" height="48" /></Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <Dropdown label="Services" items={nav.services} />
            <Dropdown label="Products" items={nav.products} width="w-56" />
            <NavLink to="/blogs" className={link}>Resources</NavLink>
            <NavLink to="/about-us" className={link}>About us</NavLink>
            <NavLink to="/careers" className={link}>Careers</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/contact-us" className="btn btn-primary hidden !px-5 !py-2.5 sm:inline-flex">Contact us</Link>
            <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="rounded-full border border-pd-line p-2.5 lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {open && (
          <div className="max-h-[70vh] overflow-y-auto rounded-b-[2rem] border-t border-pd-line bg-white lg:hidden">
            <div className="container-pd py-3">
              <MobileGroup label="Services" items={nav.services} isOpen={group === 'services'} onToggle={() => setGroup(group === 'services' ? null : 'services')} />
              <MobileGroup label="Products" items={nav.products} logoClass="h-7" isOpen={group === 'products'} onToggle={() => setGroup(group === 'products' ? null : 'products')} />
              <div className="flex flex-col border-b border-pd-line/70">{[['/blogs', 'Resources'], ['/about-us', 'About us'], ['/careers', 'Careers']].map(([to, t]) => <Link key={to} to={to} className="py-3 text-sm font-semibold">{t}</Link>)}</div>
              <Link to="/contact-us" className="btn btn-primary mt-5 w-full">Contact us</Link>
            </div>
          </div>
        )}
       </div>
      </header>
    </>
  )
}
