# ProcessDrive website (React + Tailwind, no backend)

Vite + React 18 + Tailwind CSS 3 + Framer Motion. All forms post straight to TeleCRM from the browser.
Routes match the current processdrive.com URLs so SEO carries over.

## Run

```bash
npm install
cp .env.example .env     # then paste your TeleCRM webhook URL
npm run dev              # http://localhost:5173
npm run build            # builds, writes sitemap.xml + robots.txt, prerenders every page to static HTML
```

`npm run build` prerenders with Playwright/Chromium. If Chromium is not installed it skips prerendering
(the site still works). To enable it once: `npm i -D playwright && npx playwright install chromium`.
Use `npm run build:spa` to skip prerender. Upload `dist/` to any static host (Netlify, Cloudflare Pages,
S3 + CloudFront, Nginx). `public/_redirects` already contains the SPA fallback for Netlify/Cloudflare;
on Nginx use `try_files $uri $uri/ /index.html;`.

## TeleCRM forms

Three forms use `src/lib/telecrm.js`: Contact (`form: "contact"`), Careers (`form: "career"`, plus `job`)
and the AI readiness quiz (`form: "ai-readiness"`, with the answers and recommendation). RAGifi has a
waitlist form (`form: "ragifi-waitlist"`).

1. In TeleCRM create a webhook / lead-capture endpoint and paste its URL into `VITE_TELECRM_WEBHOOK_URL`.
2. Map these JSON keys to your TeleCRM lead fields: `name`, `phone`, `email`, `message`, `interest`,
   `experience`, `role`, `job`, `resume_link`, `form`, `page`, `source`, `submitted_at`
   (quiz also sends `industry`, `systems`, `goal`, `size`, `recommendation`).
3. Until the URL is set, forms run in demo mode (console log + success message, nothing is sent).

Notes: the webhook URL is visible in the browser, so use a lead-create-only endpoint, never an admin API key.
If TeleCRM does not send CORS headers the browser logs a CORS warning, then `submitLead` retries as a simple
request and the lead is still delivered. There is no file upload without a backend, so Careers asks for a resume link.
Spam protection: hidden honeypot field, minimum fill time and client-side validation.
Add reCAPTCHA or Cloudflare Turnstile later if bots become a problem.

## Where to edit content

| What | File |
| --- | --- |
| Home, About, products, blog posts, nav, FAQ, contact details | `src/data/site.js` |
| Service pages (5) | `src/data/services.js` |
| Careers / job pages | `src/data/careers.js` |
| Privacy and Terms text | `src/data/legal.js` |
| Colours and fonts | `tailwind.config.js` (blue #0078E8, green #01A95C, grey #6F6F6F from the logo) |

## Open items before launch

- Replace the ISMS wording once the certificate is issued (`company.trust` in `site.js`) and add badge images to `public/badges/`, then list them in `src/pages/Certifications.jsx`.
- Proof for "100% AI-certified", and confirm the 40+ talents, 30+ industries and 1000+ figures.
- Copy still needed: Digital Marketing page, RAGifi description, AIM2C AI description, CEO quote, event photos (About gallery), client and Odoo-customer logos, full text of the 26 blog posts, Privacy and Terms.
- Confirm the Avalia / Avlia spelling and RentAsst (not RentAss) everywhere.
- Add Google Analytics / Tag Manager IDs in `index.html` if you want to keep tracking.

## Life at ProcessDrive gallery (About page)

`src/components/ui/perspective-tunnel-hero.jsx` is a scroll-driven 3D photo tunnel. Photos come from the
`lifeGallery` array at the bottom of `src/data/site.js`: add or remove `{ src, title }` entries and the tunnel
and its scroll length adjust automatically. Put real photos in `public/life/` and use `src: '/life/name.jpg'`.
The Unsplash images there are stand-ins. Visitors who prefer reduced motion get a plain photo grid instead.
