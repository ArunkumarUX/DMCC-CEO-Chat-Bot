/**
 * Capture all DIFC Executive Intelligence screens (except Settings) for PPT export.
 * Requires the standalone HTML served over HTTP (see generate-difc-ppt.mjs).
 */
import { createRequire } from 'node:module';
import { mkdir, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(
  '/Users/arunkumarg/Desktop/AI Projects/AI Catalog App - Naar/naar-web-app/node_modules/playwright',
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'deck-screenshots', 'difc-executive-intelligence');
const DOWNLOADS = path.join(
  process.env.HOME || '',
  'Downloads',
  'difc-executive-intelligence-ppt',
);
const BASE =
  process.env.DIFC_SCREENSHOT_BASE ||
  'http://127.0.0.1:8765/DIFC%20Executive%20Intelligence%20%28standalone%29.html';

const SHOTS = [
  { name: '01-executive-home', screen: 'home', label: 'Executive Home', wait: 2500 },
  { name: '02-ask-personal-ai-agent', screen: 'agent', label: 'Ask Personal AI Agent', wait: 2000 },
  { name: '03-performance', screen: 'performance', label: 'Performance', wait: 2000 },
  { name: '04-market-intelligence', screen: 'market', label: 'Market Intelligence', wait: 2500 },
  { name: '05-regulatory', screen: 'regulatory', label: 'Regulatory', wait: 2000 },
  { name: '06-knowledge-base', screen: 'knowledge', label: 'Knowledge Base', wait: 2000 },
  { name: '07-briefings', screen: 'briefings', label: 'Briefings', wait: 2000 },
];

const LAUNCHERS = [
  () =>
    chromium.launch({
      headless: true,
      executablePath:
        '/Users/arunkumarg/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell',
    }),
  () =>
    chromium.launch({
      headless: true,
      executablePath:
        '/Users/arunkumarg/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    }),
  () => chromium.launch({ headless: false, channel: 'chrome' }),
  () => chromium.launch({ headless: true, channel: 'chrome' }),
];

async function launchBrowser() {
  for (const tryLaunch of LAUNCHERS) {
    try {
      return await tryLaunch();
    } catch {
      /* next */
    }
  }
  throw new Error('Could not launch a browser for screenshots');
}

async function main() {
  const ping = await fetch(BASE).catch(() => null);
  if (!ping?.ok) {
    throw new Error(
      `DIFC app not reachable at ${BASE}. Start: python3 -m http.server 8765 --bind 127.0.0.1 (from Downloads)`,
    );
  }

  await mkdir(OUT, { recursive: true });
  await mkdir(DOWNLOADS, { recursive: true });

  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  for (const shot of SHOTS) {
    console.log(`→ ${shot.label}`);
    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 90000 });
    await page.evaluate((screenId) => {
      localStorage.setItem('difc.screen', screenId);
    }, shot.screen);
    await page.reload({ waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(shot.wait);
    await page.waitForSelector('.app', { timeout: 30000 });

    const file = path.join(OUT, `${shot.name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    await cp(file, path.join(DOWNLOADS, `${shot.name}.png`));
    console.log(`  ${file}`);
  }

  await browser.close();
  console.log(`\n${SHOTS.length} screenshots →\n  ${OUT}\n  ${DOWNLOADS}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
