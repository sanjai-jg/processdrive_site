import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Decal } from '@react-three/drei'
import logoUrl from '../../assets/PD_Logo.png'
import * as THREE from 'three'

// Interactive 3D robot (adapted from the 21st.dev "robot-hero" component, JSX, no navbar/background text).
// The robot glides left/right and looks toward the pointer anywhere over `eventSource`; click it and it shows hearts.
// Offline-safe: no HDR environment is fetched, everything is lit by in-scene lights.

class HeartCurve extends THREE.Curve {
  getPoint(t, target = new THREE.Vector3()) {
    t = t * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    return target.set(x * 0.002, (y + 6) * 0.002, 0)
  }
}
const heartCurve = new HeartCurve()

function ResponsiveGroup({ children, scale = 1 }) {
  const { viewport } = useThree()
  return <group scale={Math.min(1.1, viewport.width / 3.5) * scale}>{children}</group>
}

function GlassCapsule({ color, power, intensity }) {
  const ref = useRef(null)
  const uniforms = useMemo(() => ({ color: { value: new THREE.Color('#fff') }, power: { value: 2.5 }, intensity: { value: 0.6 } }), [])
  useFrame(() => {
    if (!ref.current) return
    ref.current.uniforms.color.value.set(color); ref.current.uniforms.power.value = power; ref.current.uniforms.intensity.value = intensity
  })
  return (
    <mesh>
      <sphereGeometry args={[0.3, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial ref={ref} uniforms={uniforms} transparent blending={THREE.AdditiveBlending} depthWrite={false}
        vertexShader={`varying vec3 vNormal; varying vec3 vViewPosition;
          void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vViewPosition = -mv.xyz; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * mv; }`}
        fragmentShader={`uniform vec3 color; uniform float power; uniform float intensity; varying vec3 vNormal; varying vec3 vViewPosition;
          void main(){ vec3 n = normalize(vNormal); vec3 v = normalize(vViewPosition); float f = pow(1.0 - max(dot(v,n),0.0), power); gl_FragColor = vec4(color, f * intensity); }`} />
    </mesh>
  )
}

const earBase = new THREE.MeshStandardMaterial({ color: '#f0f0f0', roughness: 0.5 })
const earRing = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 })
const earCenter = new THREE.MeshStandardMaterial({ color: '#cccccc', roughness: 0.8 })
const antBase = new THREE.MeshStandardMaterial({ color: '#999999', roughness: 0.4, metalness: 0.5 })
const antStick = new THREE.MeshStandardMaterial({ color: '#d0d0d0', roughness: 0.4, metalness: 0.2 })
const antTip = new THREE.MeshStandardMaterial({ color: '#01A95C', roughness: 0.2, toneMapped: false })

function RobotEar({ position, scale = 1, isLeft = false }) {
  const dir = isLeft ? -1 : 1
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={earBase}><cylinderGeometry args={[0.04, 0.04, 0.025, 32]} /></mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={earRing}><torusGeometry args={[0.032, 0.008, 16, 32]} /></mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={earCenter}><cylinderGeometry args={[0.03, 0.03, 0.005, 32]} /></mesh>
      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]} material={antBase}><cylinderGeometry args={[0.006, 0.008, 0.02, 16]} /></mesh>
        <mesh position={[0, 0.06, 0]} material={antStick}><cylinderGeometry args={[0.003, 0.003, 0.1, 8]} /></mesh>
        <mesh position={[0, 0.11, 0]} material={antTip}><sphereGeometry args={[0.006, 16, 16]} /></mesh>
      </group>
    </group>
  )
}

const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 2, 2), toneMapped: false, transparent: true })
const heartMat = new THREE.MeshBasicMaterial({ color: '#ff3366', toneMapped: false })

function eyePaths() {
  const w = 0.025, h = 0.035, r = 0.02, g = 0.005
  const V = (x, y) => new THREE.Vector3(x, y, 0)
  const build = (s) => {
    const p = new THREE.CurvePath()
    p.add(new THREE.LineCurve3(V(-w, s * g), V(-w, s * (h - r))))
    p.add(new THREE.QuadraticBezierCurve3(V(-w, s * (h - r)), V(-w, s * h), V(-w + r, s * h)))
    p.add(new THREE.LineCurve3(V(-w + r, s * h), V(w - r, s * h)))
    p.add(new THREE.QuadraticBezierCurve3(V(w - r, s * h), V(w, s * h), V(w, s * (h - r))))
    p.add(new THREE.LineCurve3(V(w, s * (h - r)), V(w, s * g)))
    return p
  }
  return { top: build(1), bottom: build(-1) }
}

function RobotEye({ position, rotation, scale = 1, blinkDuration = 0.15, blinkCycle = 3, isLovedRef }) {
  const group = useRef(null), normal = useRef(null), heart = useRef(null)
  const { top, bottom } = useMemo(eyePaths, [])
  useFrame(({ clock }) => {
    if (!group.current || !normal.current || !heart.current) return
    const loved = isLovedRef.current
    normal.current.visible = !loved; heart.current.visible = loved
    const c = clock.getElapsedTime() % blinkCycle
    let sy = 1
    if (c < blinkDuration && !loved) sy = Math.max(0.05, 1 - Math.sin((c / blinkDuration) * Math.PI))
    group.current.scale.set(scale, scale * sy, scale)
  })
  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heart} visible={false} material={heartMat}><tubeGeometry args={[heartCurve, 64, 0.0035, 8, true]} /></mesh>
      <group ref={normal}>
        <mesh material={eyeMat}><tubeGeometry args={[top, 20, 0.0075, 10, false]} /></mesh>
        <mesh material={eyeMat}><tubeGeometry args={[bottom, 20, 0.0075, 10, false]} /></mesh>
      </group>
    </group>
  )
}

// transparent-background logo, downscaled from the 3420px source to a GPU-friendly size
function useLogoTexture() {
  const [tex, setTex] = useState(null)
  useEffect(() => {
    let t
    const img = new Image()
    img.onload = () => {
      const s = 1024, c = document.createElement('canvas')
      c.width = c.height = s
      c.getContext('2d').drawImage(img, 0, 0, s, s)
      t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
      setTex(t)
    }
    img.src = logoUrl
    return () => t?.dispose()
  }, [])
  return tex
}

// soft radial blob: dark core, long feathered edge
function makeShadowTexture() {
  const s = 256, c = document.createElement('canvas')
  c.width = c.height = s
  const x = c.getContext('2d')
  const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(10,16,32,0.75)')
  g.addColorStop(0.35, 'rgba(10,16,32,0.45)')
  g.addColorStop(0.7, 'rgba(10,16,32,0.12)')
  g.addColorStop(1, 'rgba(10,16,32,0)')
  x.fillStyle = g; x.fillRect(0, 0, s, s)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function makeTextures() {
  const size = 512
  const cC = document.createElement('canvas'), cB = document.createElement('canvas')
  cC.width = cB.width = cC.height = cB.height = size
  const xC = cC.getContext('2d'), xB = cB.getContext('2d')
  xC.fillStyle = '#ffffff'; xC.fillRect(0, 0, size, size)
  xB.fillStyle = '#808080'; xB.fillRect(0, 0, size, size)
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * size, y = Math.random() * size, r = 0.5 + Math.random() * 1.5, dark = Math.random() > 0.15
    xC.beginPath(); xC.arc(x, y, r, 0, Math.PI * 2); xC.fillStyle = dark ? '#b4bac4' : '#ffffff'; xC.fill()
    xB.beginPath(); xB.arc(x, y, r, 0, Math.PI * 2); xB.fillStyle = dark ? '#000' : '#fff'; xB.fill()
  }
  const a = new THREE.CanvasTexture(cC), b = new THREE.CanvasTexture(cB)
  for (const t of [a, b]) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 3); t.needsUpdate = true }
  return { colorMap: a, bumpMap: b }
}

const NECK = { baseR: 0.215, baseH: -0.05, midR: 0.28, midH: 0.02, lipBottomR: 0.295, lipBottomH: 0.045, lipTopR: 0.27, lipTopH: 0.055, innerR: 0.1, innerDropH: 0 }
const BODY = { bodyBevelR: 0.235, bodyBevelY: 0.34, bodyBevelT: 0.025 }

function Robot({ color, screenColor, glow, blinkCycle, groupScale, wrap }) {
  const ptr = useRef({ x: null, y: null })
  useEffect(() => {
    const mv = (e) => { ptr.current.x = e.clientX; ptr.current.y = e.clientY }
    window.addEventListener('pointermove', mv, { passive: true })
    return () => window.removeEventListener('pointermove', mv)
  }, [])
  const loved = useRef(false)
  const timer = useRef(null)
  const body = useRef(null), head = useRef(null)
  const textures = useMemo(makeTextures, [])
  const logo = useLogoTexture()
  const shadowTex = useMemo(makeShadowTexture, [])
  useEffect(() => () => shadowTex.dispose(), [shadowTex])
  useEffect(() => () => { clearTimeout(timer.current); textures.colorMap.dispose(); textures.bumpMap.dispose() }, [textures])

  useFrame((state, delta) => {
    if (!body.current || !head.current) return
    const dt = Math.min(delta, 0.1)
    const L = THREE.MathUtils.lerp
    const C = THREE.MathUtils.clamp
    // pointer anywhere in the window -> position relative to this canvas (works on any screen size)
    const r = wrap.current ? wrap.current.getBoundingClientRect() : { left: 0, top: 0, width: 1, height: 1 }
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.4
    const px = ptr.current.x ?? cx, py = ptr.current.y ?? cy
    const reach = Math.max(r.width * 0.5, Math.min(window.innerWidth * 0.5, 700))
    const tx = C((px - cx) / reach, -1, 1)
    const ty = C(-(py - cy) / Math.max(window.innerHeight * 0.5, 300), -1, 1)
    const gs = Math.min(1.1, state.viewport.width / 3.5) * groupScale
    const maxX = Math.max(0, state.viewport.width / 2 / gs - 0.62) // keep the whole robot inside the canvas
    body.current.position.x = L(body.current.position.x, tx * maxX, 2.2 * dt)
    const rel = C(tx - body.current.position.x / (maxX + 0.001), -1, 1) * 0.8 + tx * 0.2
    // hard limits so the face always stays turned toward the viewer
    body.current.rotation.y = L(body.current.rotation.y, C(-rel * 0.25, -0.22, 0.22), 8 * dt)
    body.current.rotation.x = L(body.current.rotation.x, C(-ty * 0.1, -0.08, 0.08), 8 * dt)
    body.current.rotation.z = L(body.current.rotation.z, C(-rel * 0.06, -0.06, 0.06), 8 * dt)
    head.current.rotation.y = L(head.current.rotation.y, C(rel * 0.7, -0.45, 0.45), 10 * dt)
    head.current.rotation.x = L(head.current.rotation.x, C(-ty * 0.25, -0.18, 0.18), 10 * dt)
  })

  const neck = useMemo(() => {
    const n = NECK
    return [[n.innerR, n.baseH], [n.baseR, n.baseH], [n.midR, n.midH], [n.lipBottomR, n.lipBottomH], [n.lipTopR, n.lipTopH], [n.innerR, n.lipTopH], [n.innerR, n.lipTopH - n.innerDropH]].map(([x, y]) => new THREE.Vector2(x, y))
  }, [])
  const headMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111', roughness: 1, metalness: 0 }), [])
  const chassis = <meshStandardMaterial color={color} map={textures.colorMap} bumpMap={textures.bumpMap} bumpScale={0.005} roughness={1} metalness={0} />

  const onDown = (e) => {
    e.stopPropagation(); loved.current = true
    clearTimeout(timer.current); timer.current = setTimeout(() => { loved.current = false }, 2000)
  }
  return (
    <group ref={body} position={[0, -0.3, 0]} onPointerDown={onDown} onPointerOver={() => (document.body.style.cursor = 'pointer')} onPointerOut={() => (document.body.style.cursor = 'auto')}>
      {/* ground shadow: follows the robot, sits just under the sphere */}
      <mesh position={[0, -0.5, 0.02]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[1.5, 0.85]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />{chassis}
        {logo && (
          <Decal position={[0, 0.09, 0.41]} rotation={[0, 0, 0]} scale={0.3}>
            <meshStandardMaterial map={logo} transparent roughness={0.6} polygonOffset polygonOffsetFactor={-4} />
          </Decal>
        )}
      </mesh>
      <mesh position={[0, BODY.bodyBevelY, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[BODY.bodyBevelR, BODY.bodyBevelT, 32, 64]} />{chassis}</mesh>
      <mesh position={[0, 0.38, 0]}><latheGeometry args={[neck, 64]} />{chassis}</mesh>
      <group ref={head} position={[0, 0.6, 0]}>
        <mesh material={headMat}><sphereGeometry args={[0.28, 64, 64]} /></mesh>
        <GlassCapsule color={screenColor} power={3.8} intensity={glow} />
        <group position={[0, -0.02, 0.29]}>
          <RobotEye position={[-0.07, 0, 0]} rotation={[0, -0.2, 0]} scale={1.45} blinkDuration={0.45} blinkCycle={blinkCycle} isLovedRef={loved} />
          <RobotEye position={[0.07, 0, 0]} rotation={[0, 0.2, 0]} scale={1.45} blinkDuration={0.45} blinkCycle={blinkCycle} isLovedRef={loved} />
        </group>
        <RobotEar position={[-0.29, 0, 0]} isLeft scale={1.3} />
        <RobotEar position={[0.29, 0, 0]} scale={1.3} />
      </group>
    </group>
  )
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function RobotMascot({ eventSource, className = '', color = '#f4f6fa', screenColor = '#2f9bff', glow = 1.3, blinkCycle = 3, scale = 1.9 }) {
  const wrap = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '120px' })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={wrap} className={className} role="img" aria-label="Friendly ProcessDrive robot that follows your cursor">
      <Boundary>
        <Canvas frameloop={on ? 'always' : 'never'} dpr={[1, 2]} camera={{ position: [0, 0.2, 6], fov: 40 }} gl={{ alpha: true, antialias: true }}
          style={{ touchAction: 'pan-y', background: 'transparent' }}>
          <ambientLight intensity={1.15} />
          <directionalLight position={[2, 5, 4]} intensity={1.4} />
          <directionalLight position={[-4, 2, 3]} intensity={0.6} color="#cfe6ff" />
          <ResponsiveGroup scale={scale}>
            <Robot wrap={wrap} color={color} screenColor={screenColor} glow={glow} blinkCycle={blinkCycle} groupScale={scale} />
          </ResponsiveGroup>
        </Canvas>
      </Boundary>
    </div>
  )
}
