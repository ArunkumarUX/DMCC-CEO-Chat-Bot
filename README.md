# Personal AI — Apparel Group

Local development clone of the Executive AI Command Centre for **[Apparel Group](https://www.apparelgroup.com/en/about-us/)** — a global fashion and lifestyle retail conglomerate headquartered in Dubai, UAE, operating 2,500+ stores and 85+ brands across 14 countries.

## Run locally

```bash
cd "Apparel Group"
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

## Brand guidelines

Central source of truth: `src/config/apparelGroupGuidelines.ts`

| Token | Value |
|-------|-------|
| Brand | Apparel Group |
| Tagline | Global fashion & lifestyle retail |
| CEO | Neeraj Teckchandani |
| Primary ink | `#1A1A1A` |
| Typography | Proxima Nova + Noto Naskh Arabic |
| Portfolio | R&B · 6thStreet · Club Apparel · Nysaa |
| Scale | 2,500+ stores · 85+ brands · 27,000+ staff · 14 countries |

Based on [apparelgroup.com/about-us](https://www.apparelgroup.com/en/about-us/).

- **CEO:** Neeraj Teckchandani
- **Founder & Chairwoman:** Sima Ganwani Ved
- **Chairman:** Nilesh Ved
- **Founded:** 1996
- **Scale:** 2,500+ stores · 85+ brands · 27,000+ employees · 14 countries
- **Portfolio:** R&B Fashion, 6thStreet, Club Apparel (10M+ loyalty members), Nysaa
- **Key brands:** Tommy Hilfiger, Charles & Keith, Skechers, ALDO, Crocs, Tim Hortons, Rituals, Barbour, Forever New
- **Markets:** GCC, India, South Africa, Singapore, Indonesia, Thailand, Malaysia, Egypt

## CEO Agent Team

Five specialist agents cloned from the Apparel Group CEO template and customised for retail:

| Agent | Role |
|-------|------|
| Chief of Staff AI | Orchestrator — briefings, board packs, actions |
| Strategy AI | GCC retail trends, omnichannel, brand portfolio |
| Policy AI | UAE retail licensing, VAT, labour law |
| Relationship AI | Brand partners, mall operators, franchisees |
| Communications AI | Speeches, press releases, bilingual drafts |
| Explorer AI | General web search for out-of-scope questions |

## Deployment (later)

- `netlify.toml` is included for a **separate** Netlify site
- Add environment variables in Netlify before going live (`ANTHROPIC_API_KEY`, etc.)

## Notes

- Replace placeholder logo SVGs in `public/arm-*.svg` with official Apparel Group brand assets when available
- Brand tokens: `src/config/brand.ts`
- Executive profile: `src/config/user.ts`
- Agent prompts: `server/csoPromptPack.mjs`
