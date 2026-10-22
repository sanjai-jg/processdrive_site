import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo'
import { CtaBand } from '../components/ui'
import { posts } from '../data/site'
import { postTitle } from './Blogs'

export default function BlogPost() {
  const { slug } = useParams()
  const i = posts.findIndex((p) => p.slug === slug)
  if (i < 0) return <Navigate to="/404" replace />
  const p = posts[i]
  const related = posts.filter((x) => x.slug !== slug).slice(0, 3)
  return (
    <>
      <Seo path={`/blogs/posts/${p.slug}`} title={`${postTitle(p)} | ProcessDrive`} description={p.excerpt || postTitle(p)} />
      <article className="bg-white">
        <header className="-mt-[88px] bg-pd-navy pb-20 pt-[168px] text-white">
          <div className="container-pd max-w-3xl">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" />All articles</Link>
            {p.date && <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-pd-green">{p.date}</p>}
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">{postTitle(p)}</h1>
          </div>
        </header>
        <div className="container-pd max-w-3xl py-14">
          {p.excerpt && <p className="text-xl leading-relaxed text-pd-grey">{p.excerpt}</p>}
          <div className="mt-8 rounded-2xl border border-dashed border-pd-line bg-pd-mist p-6 text-sm text-pd-grey">The full article text migrates here from the current ProcessDrive site. Add it to <code>src/data/site.js</code> (or connect a headless CMS later).</div>
        </div>
      </article>
      <section className="bg-pd-mist py-16">
        <div className="container-pd">
          <h2 className="text-2xl font-bold">More from the blog</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{related.map((r) => <Link key={r.slug} to={`/blogs/posts/${r.slug}`} className="card p-6 font-semibold transition hover:-translate-y-1 hover:text-pd-blue">{postTitle(r)}</Link>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
