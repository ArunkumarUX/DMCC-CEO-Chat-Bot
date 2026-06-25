# Personal AI — A.R.M. Holding

Local development clone of the Executive AI Command Centre for **[A.R.M. Holding](https://www.armholding.ae/)** — a UAE-based private investment and real estate company focused on scalable ventures across real estate (DREC, HUNA, HIVE), hospitality, banking, healthtech, fintech and cultural initiatives.

**GitHub:** [ArunkumarUX/A.R.M.-Holding-Personal-Chat-Not](https://github.com/ArunkumarUX/A.R.M.-Holding-Personal-Chat-Not.git)

## Run locally

```bash
cd "A.R.M. Holding"
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

`npm run dev` starts **both** the Vite UI and a small local API proxy (port `8787` by default).

### Live Claude answers (optional)

1. Copy `.env.example` → `.env.local`
2. Set your key (never commit `.env.local`):

   ```bash
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Restart `npm run dev`

## About A.R.M. Holding

Based on [armholding.ae](https://www.armholding.ae/):

- **CEO:** H.E. Mohammad Saeed Al Shehhi
- **Values:** Integrity, Cooperation, Agility, Creativity, Humility
- **Portfolio:** DREC (real estate), HUNA (design-led development), HIVE (coliving)
- **Sectors:** Real estate, hospitality, banking, healthtech, fintech, cultural initiatives
- **Tagline:** We Emerge Stronger

## Deployment (later)

- `netlify.toml` is included for a **separate** Netlify site
- Add environment variables in Netlify before going live (`ANTHROPIC_API_KEY`, etc.)
- Keep this repo isolated from the ADGM / personal-ai-chat deployment

## Notes

- Replace placeholder logo SVGs in `public/arm-*.svg` with official brand assets when available
- Brand tokens: `src/config/brand.ts`
