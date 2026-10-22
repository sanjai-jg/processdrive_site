import { useEffect, useRef } from 'react'
// Animated node network (canvas). Static when the visitor prefers reduced motion.
export default function NetworkBg({ className = '', still = false, light = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const reduce = still || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visible = true
    let w, h, nodes, raf, mouse = { x: -999, y: -999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const init = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.max(24, Math.min(70, Math.floor(w / 22)))
      nodes = Array.from({ length: n }, (_, i) => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, g: i % 3 === 0 }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const a of nodes) {
        if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1 }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < 120 && !reduce) { a.x += (a.x - mouse.x) * 0.004; a.y += (a.y - mouse.y) * 0.004 }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) { ctx.strokeStyle = `rgba(${a.g ? '1,169,92' : '0,120,232'},${(1 - d / 130) * (light ? .28 : .35)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
        }
        ctx.fillStyle = a.g ? 'rgba(1,169,92,.9)' : (light ? 'rgba(0,120,232,.75)' : 'rgba(80,160,255,.9)'); ctx.beginPath(); ctx.arc(a.x, a.y, 2.2, 0, 7); ctx.fill()
      }
      if (!reduce) raf = visible ? requestAnimationFrame(draw) : 0
    }
    const move = (e) => { const r = c.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top } }
    init(); draw()
    // pause the animation while the canvas is off screen
    const io = new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting; if (visible && !was && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) } }); io.observe(c)
    const ro = new ResizeObserver(() => { init(); if (reduce) draw() }); ro.observe(c)
    window.addEventListener('mousemove', move)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('mousemove', move) }
  }, [])
  return <canvas ref={ref} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
