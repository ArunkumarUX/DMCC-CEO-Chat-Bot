import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const apiPort = Number(process.env.API_PORT) || 8787

const apiProxy = {
  '/api': {
    target: `http://localhost:${apiPort}`,
    changeOrigin: true,
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: Number(process.env.VITE_PORT) || 5173,
    proxy: apiProxy,
  },
  preview: {
    host: true,
    port: Number(process.env.VITE_PREVIEW_PORT) || 4173,
    proxy: apiProxy,
  },
})
