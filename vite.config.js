import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// assetsInlineLimit: the logo mark used by the halftone canvas is embedded as a data URI so it always loads
export default defineConfig({ plugins: [react()], server: { port: 5173 }, build: { assetsInlineLimit: 200000, rollupOptions: process.env.VITE_HASH ? { output: { inlineDynamicImports: true } } : {} } })
