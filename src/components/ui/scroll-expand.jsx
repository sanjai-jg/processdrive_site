// ScrollExpand, from React Bits (reactbits.dev). Local changes: the overlay only takes clicks once it has faded in,
// the title is hidden from screen readers (pages put their own <h1> in), and a broken image falls back to the frame gradient.
import { useCallback, useEffect, useRef } from 'react'

import './scroll-expand.css'

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  largeScreenHeight = 1,
  useWindowScroll = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const scrimRef = useRef(null)
  const hintRef = useRef(null)

  const propsRef = useRef({})
  propsRef.current = { startWidth, startHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim, largeScreenHeight, useWindowScroll, enabled }
  // the resting frame is wider on small screens so the title fits inside it (set in measure())
  const frameW = useRef(startWidth)

  const applyProgress = useCallback(p => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return
    const c = propsRef.current

    const e = smoothstep(0, 1, p)

    const sw = frameW.current
    const w = sw + (100 - sw) * e
    const h = c.startHeight + (100 - c.startHeight) * e
    const ix = Math.max(0, (100 - w) / 2)
    const iy = Math.max(0, (100 - h) / 2)
    const r = c.startRadius + (c.endRadius - c.startRadius) * e
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p)
      titleRef.current.style.opacity = `${1 - out}`
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p)
      hintRef.current.style.opacity = `${1 - gone}`
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p)
      overlayRef.current.style.opacity = `${inn}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`
      overlayRef.current.style.pointerEvents = inn > 0.6 ? 'auto' : 'none'
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    if (!root || !track || !stage) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let current = 0
    let target = 0
    let stageH = 0
    let running = false
    // short mode (large screens with largeScreenHeight < 1): the hero is a normal block of that height, not pinned, so there is
    // no scroll runway (which would show as empty space below it). Instead of following the scrollbar, the frame opens on its own
    // timing once you start scrolling (and closes again when you return to the top), so the whole animation is always seen.
    let short = false
    let open = false
    const SHORT_SMOOTH = 0.45 // seconds; bigger = slower, softer opening

    const measure = () => {
      const c = propsRef.current
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight
      short = c.useWindowScroll && window.innerWidth >= 1024 && c.largeScreenHeight < 1
      // on large screens the stage can be a fraction of the viewport height (not shorter than 420px)
      if (short) stageH = Math.max(Math.min(420, stageH), Math.round(stageH * c.largeScreenHeight))
      if (stageH <= 0) return
      root.classList.toggle('scroll-expand--short', short)
      stage.style.position = short ? 'relative' : ''
      stage.style.height = `${stageH}px`
      track.style.height = short ? `${stageH}px` : `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`

      const w = root.clientWidth || stageH
      // narrower screens start with a wider frame; the title is sized from the frame so it stays inside the photo
      const sw = w < 640 ? Math.max(c.startWidth, 82) : w < 1024 ? Math.max(c.startWidth, 62) : c.startWidth
      frameW.current = sw
      stage.style.setProperty('--se-frame-w', `${sw}%`)
      stage.style.setProperty('--se-title-size', `${clamp(((w * sw) / 100) * 0.075, 18, 56)}px`)
    }

    const readProgress = () => {
      const c = propsRef.current
      if (!c.enabled) return 1
      if (short) {
        const y = window.scrollY
        open = y > (open ? 4 : 14) // small hysteresis so it doesn't flicker at the very top
        return open ? 1 : 0
      }
      const span = stageH * Math.max(0.01, c.scrollDistance)
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top
        return clamp(-top / span, 0, 1)
      }
      return clamp(root.scrollTop / span, 0, 1)
    }

    const tick = () => {
      const c = propsRef.current
      const sm = short ? SHORT_SMOOTH : c.smoothing
      const k = sm <= 0 ? 1 : 1 - Math.exp(-1 / (60 * sm))
      current += (target - current) * k
      if (Math.abs(target - current) < 0.0004) {
        current = target
        running = false
      }
      applyProgress(current)
      raf = running ? requestAnimationFrame(tick) : 0
    }

    const kick = () => {
      if (running) return
      running = true
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = readProgress()
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target
        applyProgress(current)
        return
      }
      kick()
    }

    const onResize = () => {
      measure()
      target = readProgress()
      current = target
      applyProgress(current)
    }

    measure()
    target = readProgress()
    current = target
    applyProgress(current)

    const scroller = useWindowScroll ? window : root
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(root)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [applyProgress, useWindowScroll])

  const hideBroken = e => { e.currentTarget.style.visibility = 'hidden' }

  const media =
    mediaType === 'video' ? (
      <video ref={mediaRef} className="scroll-expand__media" src={src} poster={poster} autoPlay muted loop playsInline />
    ) : (
      <img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable={false} onError={hideBroken} />
    )

  return (
    <div ref={rootRef} className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()} style={style} {...rest}>
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title" aria-hidden="true">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ScrollExpand
