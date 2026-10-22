import { useEffect, useId, useState } from 'react'

/** Centre of `node` in `container` coordinates. */
function centreIn(container, node) {
  return { x: node.left - container.left + node.width / 2, y: node.top - container.top + node.height / 2 }
}

/**
 * A curved connector between two real, reflowing elements with a light pulse travelling along it.
 * It takes refs (not coordinates) and re-measures on resize and on any size change of the container
 * or either endpoint. The pulse is one stroke-dashoffset animation (see `beam-dash` in index.css),
 * so there is no JS in the frame loop.
 */
export default function AnimatedBeam({
  containerRef, fromRef, toRef,
  curvature = 60, reverse = false, duration = 3, delay = 0,
  pathColor = '#E3E9F2', pathWidth = 1.75, pathOpacity = 1,
  beamColor = '#0078E8', beamLength = 46, paused = false, className = '',
}) {
  const id = useId()
  const [geo, setGeo] = useState(null)

  useEffect(() => {
    const container = containerRef.current, from = fromRef.current, to = toRef.current
    if (!container || !from || !to) return
    const measure = () => {
      const box = container.getBoundingClientRect()
      const start = centreIn(box, from.getBoundingClientRect())
      const end = centreIn(box, to.getBoundingClientRect())
      const dx = end.x - start.x, dy = end.y - start.y
      const span = Math.hypot(dx, dy) || 1
      // bow perpendicular to the line so the curve looks right at any angle
      const cx = (start.x + end.x) / 2 + (-dy / span) * curvature
      const cy = (start.y + end.y) / 2 + (dx / span) * curvature
      const legs = Math.hypot(cx - start.x, cy - start.y) + Math.hypot(end.x - cx, end.y - cy)
      setGeo({ width: box.width, height: box.height, d: `M ${start.x},${start.y} Q ${cx},${cy} ${end.x},${end.y}`, length: (span + legs) / 2 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container); ro.observe(from); ro.observe(to)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [containerRef, fromRef, toRef, curvature])

  if (!geo) return null
  const total = Math.round(geo.length)
  const lap = total + beamLength
  return (
    <svg aria-hidden="true" width={geo.width} height={geo.height} viewBox={`0 0 ${geo.width} ${geo.height}`} fill="none"
      className={`pointer-events-none absolute left-0 top-0 ${className}`}>
      <path d={geo.d} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <defs>
        <linearGradient id={`beam-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={beamColor} stopOpacity="0" />
          <stop offset="50%" stopColor={beamColor} stopOpacity="1" />
          <stop offset="100%" stopColor={beamColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="beam-pulse" d={geo.d} stroke={`url(#beam-${id})`} strokeWidth={pathWidth + 1.25} strokeLinecap="round"
        strokeDasharray={`${beamLength} ${total}`} strokeDashoffset={0}
        style={{ '--beam-travel': reverse ? lap : -lap, animation: `beam-dash ${duration}s linear infinite`, animationDelay: `${delay}s`, animationPlayState: paused ? 'paused' : 'running' }} />
    </svg>
  )
}
