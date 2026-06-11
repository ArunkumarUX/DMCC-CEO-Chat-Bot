import { readFileSync, existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function resolveDevApiPort(): number {
  const fromEnv = Number(process.env.API_PORT)
  if (fromEnv > 0) return fromEnv
  try {
    const portFile = new URL('.dev-api-port', import.meta.url)
    if (existsSync(portFile)) {
      const fromFile = Number(readFileSync(portFile, 'utf8').trim())
      if (fromFile > 0) return fromFile
    }
  } catch {
    /* ignore */
  }
  return 8787
}

const apiProxy = {
  '/api': {
    target: `http://localhost:${resolveDevApiPort()}`,
    changeOrigin: true,
    router: () => `http://localhost:${resolveDevApiPort()}`,
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
