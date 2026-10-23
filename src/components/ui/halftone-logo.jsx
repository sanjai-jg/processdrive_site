import { useEffect, useRef } from 'react'
import mark from '../../assets/mark.png'

// Halftone logo: the ProcessDrive mark printed as a field of dots. Each dot is sized by how much of
// the logo covers its cell and keeps the logo's own colour. Dots part around the pointer on springs and
// warm toward white as they leave home; click for a shock ring. Adapted from the 21st.dev halftone footer.

export function hwfRadius(cov, gap) { return Math.sqrt(Math.min(1, Math.max(0, cov))) * gap * 0.56 }
export function hwfStep(x, y, vx, vy, hx, hy, px, py, r) {
  const dx = x - px, dy = y - py, d2 = dx * dx + dy * dy
  if (r > 0 && d2 < r * r) { const d = Math.sqrt(d2) + 0.001, f = (1 - d / r) * 2.6; vx += (dx / d) * f; vy += (dy / d) * f }
  vx = (vx + (hx - x) * 0.05) * 0.84; vy = (vy + (hy - y) * 0.05) * 0.84
  return [x + vx, y + vy, vx, vy]
}

export default function HalftoneLogo({ src = mark, crop = null, background = '#0A1020', dotGap = 6, radius = 90, grain = 0.5, lift = 0, scale = 0.78, height = '520px', className = '', children }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const opts = useRef({})
  opts.current = { src, crop, background, dotGap, radius, grain, lift, scale }

  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, dpr = 1, px = -1e5, py = -1e5, raf = 0, visible = true, awake = true, alive = true
    let ring = { x: 0, y: 0, t: -1 }
    let dots = new Float32Array(0), count = 0, grainTile = null, img = null

    const layout = () => {
      if (!img) return
      const o = opts.current
      const rect = root.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width)); h = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      const mask = document.createElement('canvas'); mask.width = w; mask.height = h
      const m = mask.getContext('2d', { willReadFrequently: true })
      m.fillStyle = '#fff'; m.fillRect(0, 0, w, h)
      const [cx, cy, cw, ch] = o.crop || [0, 0, 1, 1]
      const sx = img.width * cx, sy = img.height * cy, sw = img.width * cw, sh = img.height * ch, ar = sw / sh
      const dw = Math.min(h * o.scale * ar, w * o.scale), dh = dw / ar
      m.drawImage(img, sx, sy, sw, sh, (w - dw) / 2, (h - dh) / 2, dw, dh)
      const data = m.getImageData(0, 0, w, h).data
      const gap = Math.max(3, o.dotGap), cols = Math.ceil(w / gap), rows = Math.ceil(h / gap)
      const tmp = []
      for (let gy = 0; gy < rows; gy++) for (let gx = 0; gx < cols; gx++) {
        let cov = 0, r = 0, g = 0, b = 0, n = 0
        for (let sy = 0; sy < 3; sy++) for (let sx = 0; sx < 3; sx++) {
          const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
          const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
          const i = (y * w + x) * 4
          const R = data[i], G = data[i + 1], B = data[i + 2]
          const c = Math.min(1, (255 - Math.min(R, G, B)) / 200)
          cov += c
          if (c > 0.35) { r += R; g += G; b += B; n++ }
        }
        cov /= 9
        if (cov < 0.08 || !n) continue
        const hx = gx * gap + gap / 2, hy = gy * gap + gap / 2
        tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap), r / n + (255 - r / n) * o.lift, g / n + (255 - g / n) * o.lift, b / n + (255 - b / n) * o.lift)
      }
      dots = new Float32Array(tmp); count = tmp.length / 10
      grainTile = document.createElement('canvas'); grainTile.width = grainTile.height = 256
      const gc = grainTile.getContext('2d'), id = gc.createImageData(256, 256)
      for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = Math.random() < 0.5 ? 0 : 255 }
      gc.putImageData(id, 0, 0)
      awake = true
    }

    const draw = (now) => {
      if (!img) return
      const o = opts.current
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (o.background === 'transparent') ctx.clearRect(0, 0, w, h)
      else { ctx.fillStyle = o.background; ctx.fillRect(0, 0, w, h) }
      const r = reduced ? 0 : o.radius
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t, ringR = ringAge * 0.9
      let moving = false
      for (let i = 0; i < count; i++) {
        const j = i * 10
        let x = dots[j], y = dots[j + 1], vx = dots[j + 2], vy = dots[j + 3]
        const hx = dots[j + 4], hy = dots[j + 5]
        if (!reduced) {
          if (ringAge < 900) {
            const dx = hx - ring.x, dy = hy - ring.y, d = Math.sqrt(dx * dx + dy * dy) + 0.001
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 26)
            if (band > 0) { const f = band * 3.2 * (1 - ringAge / 900); vx += (dx / d) * f; vy += (dy / d) * f }
          }
          const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r)
          x = s[0]; y = s[1]; vx = s[2]; vy = s[3]
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true
          else { x = hx; y = hy; vx = 0; vy = 0 }
          dots[j] = x; dots[j + 1] = y; dots[j + 2] = vx; dots[j + 3] = vy
        }
        const k = Math.min(1, Math.hypot(x - hx, y - hy) / 28) * 0.85
        ctx.fillStyle = `rgb(${Math.round(dots[j + 7] + (255 - dots[j + 7]) * k)},${Math.round(dots[j + 8] + (255 - dots[j + 8]) * k)},${Math.round(dots[j + 9] + (255 - dots[j + 9]) * k)})`
        ctx.beginPath(); ctx.arc(x, y, dots[j + 6], 0, 6.2832); ctx.fill()
      }
      if (grainTile && o.grain > 0) {
        ctx.globalAlpha = Math.min(1, o.grain) * 0.09; ctx.globalCompositeOperation = 'overlay'
        ctx.fillStyle = ctx.createPattern(grainTile, 'repeat'); ctx.fillRect(0, 0, w, h)
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      }
      awake = moving || ringAge < 900 || px > -1e4
    }
    const loop = (now) => { raf = 0; if (!visible) return; draw(now); if (awake) raf = requestAnimationFrame(loop) }
    const wake = () => { awake = true; if (!raf && visible) raf = requestAnimationFrame(loop) }
    const local = (e) => { const b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top] }
    const onMove = (e) => { const p = local(e); px = p[0]; py = p[1]; wake() }
    const onLeave = () => { px = -1e5; py = -1e5; wake() }
    const onDown = (e) => { if (reduced || e.target.closest('a,button')) return; const p = local(e); ring = { x: p[0], y: p[1], t: performance.now() }; wake() }

    const image = new Image()
    image.onload = () => { if (!alive) return; img = image; layout(); draw(performance.now()); wake() }
    image.src = src

    root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave); root.addEventListener('pointerdown', onDown)
    const ro = new ResizeObserver(() => { layout(); wake() }); ro.observe(root)
    const io = new IntersectionObserver((en) => { visible = en[0] ? en[0].isIntersecting : true; if (visible) wake() }); io.observe(root)
    return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.removeEventListener('pointerdown', onDown) }
  }, [src])

  return (
    <section ref={rootRef} className={`relative isolate w-full overflow-hidden ${className}`} style={{ height, background }}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full max-w-none" />
      <span className="sr-only">ProcessDrive logo</span>
      {children}
    </section>
  )
}
