import { readFileSync, existsSync } from 'node:fs'
import { defineConfig, type Plugin, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { dmccGothamProxy } from './vite.dmcc-gotham-proxy'

const API_PORT_CANDIDATES = [8787, 8788, 8789, 8790, 8800, 8810]

function portFromFile(): number {
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
  return 0
}

/** Prefer .dev-api-port, then known candidates — re-read every request so API restarts stick. */
function resolveDevApiPort(): number {
  return portFromFile() || 8787
}

function apiTarget(): string {
  return `http://127.0.0.1:${resolveDevApiPort()}`
}

/**
 * Vite's http-proxy can stick to the initial `target`. This middleware rewrites
 * `/api` to the live port from `.dev-api-port` (and falls back across candidates).
 */
function liveApiProxy(): Plugin {
  return {
    name: 'dmcc-live-api-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api')) return next()

        const ports = [
          portFromFile(),
          ...API_PORT_CANDIDATES,
        ].filter((p, i, arr) => p > 0 && arr.indexOf(p) === i)

        const method = req.method || 'GET'
        const headers: Record<string, string> = {}
        for (const [k, v] of Object.entries(req.headers)) {
          if (v == null || k === 'host' || k === 'connection') continue
          headers[k] = Array.isArray(v) ? v.join(',') : String(v)
        }

        const chunks: Buffer[] = []
        for await (const chunk of req) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        }
        const body = Buffer.concat(chunks)

        let lastStatus = 502
        let lastBody = Buffer.from(JSON.stringify({ error: 'API unreachable — run npm run dev' }))
        let lastHeaders: Headers | null = null

        for (const port of ports) {
          try {
            const upstream = await fetch(`http://127.0.0.1:${port}${req.url}`, {
              method,
              headers,
              body: method === 'GET' || method === 'HEAD' ? undefined : body,
            })
            const buf = Buffer.from(await upstream.arrayBuffer())
            lastStatus = upstream.status
            lastBody = buf
            lastHeaders = upstream.headers

            // Stale API without /api/docai returns 404 JSON — try next port.
            if (
              upstream.status === 404 &&
              req.url.startsWith('/api/docai') &&
              buf.toString('utf8').includes('Not found')
            ) {
              continue
            }

            res.statusCode = upstream.status
            upstream.headers.forEach((value, key) => {
              if (key === 'transfer-encoding') return
              res.setHeader(key, value)
            })
            res.end(buf)
            return
          } catch {
            /* try next */
          }
        }

        res.statusCode = lastStatus
        if (lastHeaders) {
          lastHeaders.forEach((value, key) => {
            if (key === 'transfer-encoding') return
            res.setHeader(key, value)
          })
        } else {
          res.setHeader('Content-Type', 'application/json')
        }
        res.end(lastBody)
      })
    },
  }
}

const apiProxy: Record<string, ProxyOptions> = {
  '/api': {
    target: apiTarget(),
    changeOrigin: true,
    // Fallback for `vite preview`; `liveApiProxy` handles `vite` itself.
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), dmccGothamProxy(), liveApiProxy()],
  server: {
    host: '127.0.0.1',
    strictPort: true,
    port: Number(process.env.VITE_PORT) || 5173,
    proxy: apiProxy,
  },
  preview: {
    host: true,
    port: Number(process.env.VITE_PREVIEW_PORT) || 4173,
    proxy: apiProxy,
  },
})
