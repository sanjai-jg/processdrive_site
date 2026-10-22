import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// VITE_HASH=1 builds an in-memory-routed single file (used for the shareable preview only).
const Router = import.meta.env.VITE_HASH ? MemoryRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Router>
      <App />
    </Router>
  </HelmetProvider>
)
