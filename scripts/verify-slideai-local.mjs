#!/usr/bin/env node
/**
 * Local smoke test for Create PPT / SlideAI.
 * Usage:
 *   npm run verify:slideai
 *   npm run verify:slideai -- --live   # one Claude call (uses tokens)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const API = process.env.API_URL || 'http://localhost:8787';
const live = process.argv.includes('--live');

function loadEnv() {
  for (const name of ['.env', '.env.local']) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq < 0) continue;
      const k = t.slice(0, eq).trim();
      let v = t.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[k] || process.env[k] === '') process.env[k] = v;
    }
  }
}

loadEnv();

let failed = 0;

function pass(msg) {
  console.log(`✓ ${msg}`);
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  failed += 1;
}

async function main() {
  console.log(`SlideAI verify → ${API}\n`);

  // Build flag
  const pptFlag = process.env.VITE_ENABLE_PPT_MASTER;
  if (pptFlag === 'true') {
    pass('VITE_ENABLE_PPT_MASTER=true in env');
  } else {
    fail('VITE_ENABLE_PPT_MASTER is not true — add to .env.local for Create PPT nav');
  }

  // Health
  let health;
  try {
    const res = await fetch(`${API}/api/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    health = await res.json();
  } catch (err) {
    fail(`API not reachable (${err.message}). Run: npm run dev`);
    process.exit(1);
  }

  pass(`API health ok (model: ${health.model || 'unknown'})`);

  if (health.claude) {
    pass('Claude configured (ANTHROPIC_API_KEY loaded)');
  } else {
    fail('Claude off — set ANTHROPIC_API_KEY in .env.local and restart npm run dev');
  }

  // SlideAI route exists
  try {
    const res = await fetch(`${API}/api/slideai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const body = await res.json().catch(() => ({}));
    if (res.status === 400 && body.error?.includes('required')) {
      pass('/api/slideai route registered');
    } else if (res.status === 503) {
      pass('/api/slideai route registered (503 without key)');
    } else {
      pass(`/api/slideai responded (${res.status})`);
    }
  } catch (err) {
    fail(`/api/slideai unreachable: ${err.message}`);
  }

  if (live) {
    if (!health.claude) {
      fail('--live skipped: no API key');
    } else {
      console.log('\nLive Claude call (may take ~10–30s)…');
      try {
        const res = await fetch(`${API}/api/slideai`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system:
              'Reply JSON only: {"action":"create","deck":{"title":"Test","theme":{"bg":"FFFFFF","text":"00092A","accent":"0087FF","font":"Gilroy","fontBody":"Aptos","tagline":"Path to Forward"},"slides":[{"id":"1","layout":"title","title":"Test"}]},"updatedSlides":null,"message":"ok"}',
            messages: [{ role: 'user', content: 'Create a 3-slide test deck' }],
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || res.statusText);
        if (!data.text?.includes('"action"')) throw new Error('Response missing JSON action');
        pass('Live SlideAI call returned JSON');
      } catch (err) {
        fail(`Live SlideAI call failed: ${err.message}`);
      }
    }
  } else {
    console.log('\nTip: npm run verify:slideai -- --live  (one Claude call)');
  }

  console.log('');
  if (failed) {
    console.error(`${failed} check(s) failed. See docs/CREATE-PPT-PRODUCTION-CHECKLIST.md`);
    process.exit(1);
  }
  console.log('All checks passed.');
}

main();
