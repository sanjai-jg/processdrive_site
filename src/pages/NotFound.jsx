import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero } from '../components/ui'

const SECONDS = 5
const R = 20
const CIRC = 2 * Math.PI * R

// counts down from SECONDS, then sends the visitor home; the ring drains in step with the number
function HomeCountdown() {
  const navigate = useNavigate()
  const [left, setLeft] = useState(SECONDS)
  const [armed, setArmed] = useState(false) // lets the ring paint full first, then start draining

  useEffect(() => {
    const raf = requestAnimationFrame(() => setArmed(true))
    const tick = setInterval(() => setLeft((n) => n - 1), 1000)
    return () => { cancelAnimationFrame(raf); clearInterval(tick) }
  }, [])
  useEffect(() => { if (left <= 0) navigate('/', { replace: true }) }, [left, navigate])

  const fill = armed ? Math.max(0, left - 1) / SECONDS : 1
  return (
    <div className="mt-8 flex flex-wrap items-center gap-5" role="status" aria-live="polite">
      <Link to="/" className="btn btn-primary">Back to home</Link>
      <div className="flex items-center gap-3 text-sm text-white/70">
        <span className="relative flex h-12 w-12 items-center justify-center">
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
            <circle cx="24" cy="24" r={R} fill="none" stroke="url(#nf-ring)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - fill)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
            <defs>
              <linearGradient id="nf-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0078E8" /><stop offset="100%" stopColor="#01A95C" /></linearGradient>
            </defs>
          </svg>
          <span className="font-display text-lg font-bold text-white">{Math.max(left, 0)}</span>
        </span>
        <span>Taking you home in {Math.max(left, 0)}s</span>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | ProcessDrive" path="/404" />
      <PageHero eyebrow="404" title="This page took a different route" sub="The page you are looking for does not exist or has moved.">
        <HomeCountdown />
      </PageHero>
    </>
  )
}
