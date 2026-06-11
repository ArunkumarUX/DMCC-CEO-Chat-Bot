/**
 * Real Personal AI Agent screenshots for Dubai PPT (no app changes).
 * Run in Terminal.app: npm run deck:screenshots
 * Requires: npm run dev on http://localhost:5173
 */
import { createRequire } from 'node:module';
import { mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(
  '/Users/arunkumarg/Desktop/AI Projects/AI Catalog App - Naar/naar-web-app/node_modules/playwright',
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'deck-screenshots', 'dubai-version');
const DOWNLOADS = path.join(process.env.HOME || '', 'Downloads', 'cso-agent-deck-screenshots', 'dubai-version');
const BASE = process.env.SCREENSHOT_BASE || 'http://localhost:5173';

const AUTH = {
  token: 'deck-capture-demo',
  welcomeComplete: true,
  tourComplete: true,
  onboardingComplete: true,
  verifiedAt: Date.now(),
};

const SHOTS = [
  { name: '01-executive-home', path: '/dashboard', wait: 2000 },
  { name: '02-personal-ai-chat', path: '/chat', wait: 1800 },
  { name: '03-performance', path: '/performance', wait: 1500 },
  { name: '04-market-intelligence', path: '/market', wait: 1500 },
  { name: '05-regulatory', path: '/regulatory', wait: 1500 },
  { name: '06-knowledge-base', path: '/knowledge', wait: 1500 },
  { name: '07-briefings', path: '/briefings', wait: 1500 },
  { name: '08-create-ppt', path: '/create-ppt', wait: 2000 },
  { name: '09-deck-builder', path: '/presentation-builder', wait: 2000 },
  { name: '10-settings', path: '/settings', wait: 1500 },
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
      const browser = await tryLaunch();
      return browser;
    } catch {
      /* next */
    }
  }
  throw new Error('Could not launch a browser for screenshots');
}

async function main() {
  const ping = await fetch(BASE).catch(() => null);
  if (!ping?.ok) {
    throw new Error(`Dev server not reachable at ${BASE}. Run: npm run dev`);
  }

  await rm(OUT, { recursive: true, force: true });
  await rm(DOWNLOADS, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await mkdir(DOWNLOADS, { recursive: true });

  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  await context.addInitScript((authKey, auth) => {
    localStorage.setItem(authKey, JSON.stringify(auth));
    localStorage.setItem('cc-sidebar-collapsed', '0');
    localStorage.setItem('adgm-tour-dismissed', '1');
  }, 'adgm_auth_v1', AUTH);

  const page = await context.newPage();

  for (const shot of SHOTS) {
    const url = `${BASE}${shot.path}`;
    console.log(`→ ${shot.name}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(shot.wait);
    const file = path.join(OUT, `${shot.name}.png`);
    await page.screenshot({ path: file });
    await cp(file, path.join(DOWNLOADS, `${shot.name}.png`));
    console.log(`  ${file}`);
  }

  await page.goto(`${BASE}/chat`, { waitUntil: 'networkidle' });
  const input = page.locator('textarea, input[type="text"]').last();
  await input.fill('Compare DIFC fintech positioning vs ADGM for Dubai board deck');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(4500);
  const chatFile = path.join(OUT, '11-chat-difc-dubai-context.png');
  await page.screenshot({ path: chatFile });
  await cp(chatFile, path.join(DOWNLOADS, '11-chat-difc-dubai-context.png'));
  console.log(`  ${chatFile}`);

  await browser.close();
  console.log(`\n${SHOTS.length + 1} screenshots →\n  ${OUT}\n  ${DOWNLOADS}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
