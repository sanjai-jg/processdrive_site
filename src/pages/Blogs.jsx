import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import NetworkBg from '../components/NetworkBg'
import { PageHero } from '../components/ui'
import { posts, blogHeading } from '../data/site'

export const postTitle = (p) => p.refreshed || p.title

export default function Blogs() {
  const [q, setQ] = useState('')
  const list = useMemo(() => posts.filter((p) => postTitle(p).toLowerCase().includes(q.toLowerCase())), [q])
  return (
    <>
      <Seo path="/blogs" title="Blogs | Inside the AI-First Approach | ProcessDrive" description="Articles on AI-native software, Odoo, rentals, Laravel, Vue.js and digital growth from the ProcessDrive team." />
      <PageHero eyebrow="Resources" title={blogHeading} sub="Practical writing on AI-native software, ERP, rentals and the tools we build with." />
      <section className="section bg-white">
        <div className="container-pd">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pd-grey" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter articles" aria-label="Filter articles" className="input !pl-11" />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link to={`/blogs/posts/${p.slug}`} className="card group block h-full overflow-hidden transition duration-300 hover:-translate-y-1.5">
                  <div className="relative h-32 bg-pd-navy"><NetworkBg still className="opacity-60" /></div>
                  <div className="p-6">
                    {p.date && <p className="text-xs font-semibold uppercase tracking-wider text-pd-green">{p.date}</p>}
                    <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-pd-blue">{postTitle(p)}</h2>
                    {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-pd-grey">{p.excerpt}</p>}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          {!list.length && <p className="mt-10 text-pd-grey">No articles match &ldquo;{q}&rdquo;.</p>}
        </div>
      </section>
    </>
  )
}
