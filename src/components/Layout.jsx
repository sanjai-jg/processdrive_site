import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchModal from './SearchModal'
import ClickSpark from './ui/click-spark'

// what counts as a "button": real buttons, role=button, submit/button inputs, and our .btn-styled links
const SPARK_TARGETS = 'button, [role="button"], input[type="button"], input[type="submit"], .btn'
const SPARK_COLORS = ['#3b9cff', '#0078E8', '#01A95C']

export default function Layout() {
  const { pathname, hash } = useLocation()
  const [search, setSearch] = useState(false)
  useEffect(() => {
    if (hash) { setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80) } else window.scrollTo(0, 0)
  }, [pathname, hash])
  useEffect(() => { const f = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearch(true) } }; window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [])
  // One ClickSpark around the whole app: it bursts only for clicks on buttons (selector below), and because the
  // check happens at click time, any button added to any page later gets the effect with no extra work.
  return (
    <ClickSpark selector={SPARK_TARGETS} sparkColor={SPARK_COLORS} shape="line" sparkCount={10} sparkSize={14} sparkWidth={2.5} sparkRadius={36} duration={650} glow={0.35} style={{ height: 'auto' }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <SearchModal open={search} onClose={() => setSearch(false)} />
    </ClickSpark>
  )
}
