// Post-build: writes sitemap.xml, robots.txt and prerenders every route to static HTML
// so search engines and AI crawlers can read the content without running JavaScript.
// Prerender needs a Chromium browser; if none is found it is skipped (the site still works as a SPA).
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { services } from '../src/data/services.js'
import { posts, products } from '../src/data/site.js'
import { jobs } from '../src/data/careers.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const SITE = process.env.VITE_SITE_URL || 'https://www.processdrive.com'

const routes = [
  '/', '/about-us', '/contact-us', '/careers', '/blogs', '/privacy-policy', '/terms-and-condition',
  ...services.map((s) => `/services/${s.slug}`),
  ...products.map((p) => `/products/${p.slug}`),
  ...posts.map((p) => `/blogs/posts/${p.slug}`),
  ...jobs.map((j) => `/careers/job-opening/${j.slug}`),
]

const today = new Date().toISOString().slice(0, 10)
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${SITE}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`)
await copyFile(join(dist, 'index.html'), join(dist, '404.html'))
console.log(`sitemap.xml written (${routes.length} URLs)`)

if (process.env.PRERENDER === '0') process.exit(0)

let chromium
try { ({ chromium } = await import('playwright')) } catch { try { ({ chromium } = await import('playwright-core')) } catch {} }
if (!chromium) { console.warn('Prerender skipped: install "playwright" to enable it.'); process.exit(0) }

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'text/xml', '.txt': 'text/plain' }
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0])
  let file = join(dist, p)
  if (!existsSync(file) || !extname(file)) file = join(dist, 'index.html')
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
  res.end(await readFile(file))
}).listen(4173)

const exe = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium'].find((x) => x && existsSync(x))
let browser
try { browser = await chromium.launch(exe ? { executablePath: exe } : {}) } catch (e) { console.warn('Prerender skipped: no Chromium found (' + e.message.split('\n')[0] + ')'); server.close(); process.exit(0) }
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })
let n = 0
for (const r of routes) {
  const page = await ctx.newPage()
  await page.goto(`http://localhost:4173${r}`, { waitUntil: 'networkidle' })
  await page.waitForSelector('h1')
  await page.waitForTimeout(250)
  const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
  const out = r === '/' ? join(dist, 'index.html') : join(dist, r, 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html)
  await page.close(); n++
}
await browser.close(); server.close()
console.log(`Prerendered ${n} pages`)
