import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchModal from './SearchModal'
import Assistant from './Assistant'

export default function Layout() {
  const { pathname, hash } = useLocation()
  const [search, setSearch] = useState(false)
  useEffect(() => {
    if (hash) { setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80) } else window.scrollTo(0, 0)
  }, [pathname, hash])
  useEffect(() => { const f = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearch(true) } }; window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <Header onSearch={() => setSearch(true)} />
      <main id="main"><Outlet /></main>
      <Footer />
      <Assistant />
      <SearchModal open={search} onClose={() => setSearch(false)} />
    </>
  )
}
