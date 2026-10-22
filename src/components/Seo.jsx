import { Helmet } from 'react-helmet-async'
const SITE = import.meta.env.VITE_SITE_URL || 'https://www.processdrive.com'
export default function Seo({ title, description, path = '' }) {
  const full = title ? `${title}` : 'ProcessDrive | AI-Native Software, Built by an AI-Certified Team'
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={SITE + path} />
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE + path} />
    </Helmet>
  )
}
