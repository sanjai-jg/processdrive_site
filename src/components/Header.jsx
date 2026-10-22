import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { nav } from '../data/site'

function Dropdown({ label, items }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-pd-ink transition hover:text-pd-blue" aria-haspopup="true">{label}<ChevronDown className="h-4 w-4 transition group-hover:rotate-180" /></button>
      <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="card p-2">
          {items.map((it) => <Link key={it.to} to={it.to} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-pd-ink hover:bg-pd-mist hover:text-pd-blue">{it.label}</Link>)}
        </div>
      </div>
    </div>
  )
}

export default function Header({ onSearch }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  const link = ({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition hover:text-pd-blue ${isActive ? 'text-pd-blue' : 'text-pd-ink'}`
  return (
    <>
      <header className="pointer-events-none sticky top-0 z-40 h-[88px] px-3 pt-3 sm:px-5">
       <div className="pointer-events-auto mx-auto max-w-[1320px] rounded-[2rem] border border-pd-line/70 bg-white shadow-[0_10px_40px_-12px_rgba(10,22,40,.25)]">
        <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" aria-label="ProcessDrive home"><img src="/logo.jpg" alt="ProcessDrive: transforming businesses to scale" className="h-11 w-auto sm:h-12" width="240" height="48" /></Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <Dropdown label="Services" items={nav.services} />
            <Dropdown label="Products" items={nav.products} />
            <NavLink to="/blogs" className={link}>Resources</NavLink>
            <NavLink to="/about-us" className={link}>About us</NavLink>
            <NavLink to="/careers" className={link}>Careers</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={onSearch} aria-label="Search the site" className="rounded-full border border-pd-line p-2.5 text-pd-ink hover:border-pd-blue hover:text-pd-blue"><Search className="h-4 w-4" /></button>
            <Link to="/contact-us" className="btn btn-primary hidden !px-5 !py-2.5 sm:inline-flex">Contact us</Link>
            <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="rounded-full border border-pd-line p-2.5 lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {open && (
          <div className="max-h-[70vh] overflow-y-auto rounded-b-[2rem] border-t border-pd-line bg-white lg:hidden">
            <div className="container-pd space-y-5 py-5">
              <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-pd-grey">Services</p>{nav.services.map((s) => <Link key={s.to} to={s.to} className="block py-2 text-sm font-medium">{s.label}</Link>)}</div>
              <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-pd-grey">Products</p>{nav.products.map((s) => <Link key={s.to} to={s.to} className="block py-2 text-sm font-medium">{s.label}</Link>)}</div>
              <div className="flex flex-col">{[['/blogs', 'Resources'], ['/about-us', 'About us'], ['/careers', 'Careers']].map(([to, t]) => <Link key={to} to={to} className="py-2 text-sm font-medium">{t}</Link>)}</div>
              <Link to="/contact-us" className="btn btn-primary w-full">Contact us</Link>
            </div>
          </div>
        )}
       </div>
      </header>
    </>
  )
}
