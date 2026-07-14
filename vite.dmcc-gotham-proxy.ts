/**
 * Vite plugin — proxy Hoefler Cloud.typography Gotham kit for local/dev hosts.
 * Browser requests same-origin CSS/fonts; server fetches upstream with Referer: https://dmcc.ae/
 * so the domain-locked kit works on 127.0.0.1.
 */
import type { Plugin } from 'vite'

const KIT_PATH = '/6391560/6329832/css/fonts.css'
const UPSTREAM = 'https://cloud.typography.com'
const REFERER = 'https://dmcc.ae/'
const LOCAL_CSS = '/fonts/dmcc-gotham/fonts.css'
const LOCAL_FILE_PREFIX = '/fonts/dmcc-gotham/file'

async function fetchUpstream(url: string): Promise<Response> {
  return fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Referer: REFERER,
      Origin: 'https://dmcc.ae',
      Accept: '*/*',
    },
  })
}

function rewriteFontUrls(css: string): string {
  // Absolute cloud.typography URLs → local proxy
  let out = css.replace(
    /https?:\/\/cloud\.typography\.com(\/[^)'"\s]+)/g,
    (_m, path: string) => `${LOCAL_FILE_PREFIX}?u=${encodeURIComponent(path)}`,
  )
  // Protocol-relative
  out = out.replace(
    /\/\/cloud\.typography\.com(\/[^)'"\s]+)/g,
    (_m, path: string) => `${LOCAL_FILE_PREFIX}?u=${encodeURIComponent(path)}`,
  )
  // Root-relative on typography host (rare)
  out = out.replace(
    /url\(\s*['"]?(\/(?:[^)'"]+))['"]?\s*\)/g,
    (full, path: string) => {
      if (path.startsWith('/fonts/dmcc-gotham')) return full
      if (!/\.(woff2?|ttf|otf|eot)(\?|#|$)/i.test(path) && !path.includes('/css/')) {
        return full
      }
      return `url(${LOCAL_FILE_PREFIX}?u=${encodeURIComponent(path)})`
    },
  )
  return out
}

export function dmccGothamProxy(): Plugin {
  return {
    name: 'dmcc-gotham-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const raw = req.url || ''
          const url = new URL(raw, 'http://127.0.0.1')

          if (url.pathname === LOCAL_CSS || url.pathname === '/fonts/dmcc-gotham/fonts.css') {
            const upstream = await fetchUpstream(`${UPSTREAM}${KIT_PATH}`)
            if (!upstream.ok) {
              // Fail closed — local @font-face in arm-fonts.css still applies Gotham A
              res.statusCode = 200
              res.setHeader('Content-Type', 'text/css; charset=utf-8')
              res.end('/* Cloud.typography kit unavailable — using local Gotham A faces */\n')
              return
            }
            const css = rewriteFontUrls(await upstream.text())
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/css; charset=utf-8')
            res.setHeader('Cache-Control', 'public, max-age=3600')
            res.end(css)
            return
          }

          if (url.pathname === LOCAL_FILE_PREFIX || url.pathname.startsWith(`${LOCAL_FILE_PREFIX}`)) {
            const path = url.searchParams.get('u')
            if (!path || !path.startsWith('/')) {
              res.statusCode = 400
              res.end('Missing font path')
              return
            }
            const upstream = await fetchUpstream(`${UPSTREAM}${path}`)
            if (!upstream.ok) {
              res.statusCode = upstream.status
              res.end(`Upstream ${upstream.status}`)
              return
            }
            const buf = Buffer.from(await upstream.arrayBuffer())
            const ct =
              upstream.headers.get('content-type') ||
              (path.endsWith('.woff2')
                ? 'font/woff2'
                : path.endsWith('.woff')
                  ? 'font/woff'
                  : path.endsWith('.css')
                    ? 'text/css'
                    : 'application/octet-stream')
            res.statusCode = 200
            res.setHeader('Content-Type', ct)
            res.setHeader('Cache-Control', 'public, max-age=86400')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(buf)
            return
          }

          next()
        } catch (err) {
          console.warn('[dmcc-gotham-proxy] kit skipped:', err instanceof Error ? err.message : err)
          if (req.url?.includes('/fonts/dmcc-gotham/fonts.css')) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/css; charset=utf-8')
            res.end('/* Cloud.typography kit unavailable — using local Gotham A faces */\n')
            return
          }
          next()
        }
      })
    },
  }
}
