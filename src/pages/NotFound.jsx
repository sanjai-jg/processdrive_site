import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero } from '../components/ui'
export default function NotFound() {
  return (<><Seo title="Page not found | ProcessDrive" path="/404" /><PageHero eyebrow="404" title="This page took a different route" sub="The page you are looking for does not exist or has moved."><Link to="/" className="btn btn-primary mt-8">Back to home</Link></PageHero></>)
}
