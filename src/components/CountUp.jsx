import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
export default function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return }
    let raf, t0
    const tick = (t) => {
      t0 ??= t
      const p = Math.min((t - t0) / duration, 1)
      const v = to * (1 - Math.pow(1 - p, 3)); setN(decimals ? +v.toFixed(decimals) : Math.round(v))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return <span ref={ref}>{prefix}{n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
}
