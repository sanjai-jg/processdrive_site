import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ServicePage from './pages/ServicePage'
import ProductPage from './pages/ProductPage'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import Careers from './pages/Careers'
import JobPage from './pages/JobPage'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

// URLs match the current processdrive.com so search rankings and inbound links carry over.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/posts/:slug" element={<BlogPost />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/job-opening/:slug" element={<JobPage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/privacy-policy" element={<Legal kind="privacy" />} />
        <Route path="/terms-and-condition" element={<Legal kind="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
