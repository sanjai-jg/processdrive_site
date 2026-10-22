import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Product showcase card: a gradient "hero tile" that overlaps the white card.
// Desktop (xl+): tile sits on the left, text on the right. Smaller screens: tile on top, text centred below.
// Logo: pass `logo` (e.g. "/products/rentasst.png", file in /public/products). Without it the `icon` is shown.
const tones = [
  'from-[#d4e8fd] to-[#d0f2e1]',
  'from-[#dbe4f6] to-[#d2e6fd]',
  'from-[#d0f2e1] to-[#cdeff2]',
  'from-[#d6e7fd] to-[#e0defb]',
]
const icons = ['text-pd-blue', 'text-[#0b3b8f]', 'text-pd-green', 'text-[#4a5af0]']
const glows = ['rgba(0,120,232,.22)', 'rgba(11,59,143,.2)', 'rgba(1,169,92,.2)', 'rgba(70,90,240,.2)']

export default function ProductCard({ tone = 0, name, tag, text, icon: Icon, logo, soon, to, cta, footnote }) {
  const body = (
    <>
      {/* tile */}
      <div className={`relative z-10 -mt-12 mx-6 h-44 overflow-hidden rounded-3xl bg-gradient-to-br ${tones[tone % 4]} transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg] xl:absolute xl:-left-12 xl:top-1/2 xl:mx-0 xl:mt-0 xl:h-48 xl:w-48 xl:-translate-y-1/2 xl:group-hover:-translate-y-[54%]`}
        style={{ boxShadow: `0 24px 44px -16px ${glows[tone % 4]}` }}>
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(0,120,232,.28)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(135deg,#000,transparent_75%)]" />
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/60 blur-2xl" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          {logo
            ? <img src={logo} alt={`${name} logo`} className="max-h-full max-w-[70%] object-contain" loading="lazy" />
            : Icon && <span className={`flex h-20 w-20 items-center justify-center rounded-2xl border border-white bg-white/80 shadow-card backdrop-blur ${icons[tone % 4]}`}><Icon className="h-10 w-10" /></span>}
        </div>
        {soon && <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pd-green">Coming soon</span>}
      </div>
      {/* text */}
      <div className="px-6 pb-8 pt-6 text-center xl:py-9 xl:pl-[11rem] xl:pr-9 xl:text-left">
        {tag && <p className="text-xs font-semibold uppercase tracking-wider text-pd-grey">{tag}</p>}
        <h3 className="mt-2 text-2xl font-extrabold text-pd-navy">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-pd-grey">{text}</p>
        {cta
          ? <span className="btn btn-primary mt-6 !px-6 !py-2.5">{cta}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          : footnote && <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-pd-grey">{footnote}</p>}
      </div>
    </>
  )
  const cls = 'group relative flex h-full flex-col rounded-3xl border border-pd-line bg-white shadow-card transition duration-300 hover:shadow-[0_30px_70px_-30px_rgba(10,16,32,.35)] xl:ml-12 xl:min-h-[280px] xl:justify-center'
  return to ? <Link to={to} className={cls}>{body}</Link> : <div className={cls}>{body}</div>
}
