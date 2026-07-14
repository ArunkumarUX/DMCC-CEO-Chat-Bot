# Personal AI — DMCC

Local development clone of the Executive AI Command Centre for **[DMCC](https://dmcc.ae)** (Dubai Multi Commodities Centre) — the world's premier commodities free zone headquartered in Jumeirah Lake Towers and Uptown Dubai, home to 26,000+ member companies from 180+ countries.

## Run locally

```bash
cd "DMCC"
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

Central source of truth: `src/config/dmccGuidelines.ts`

| Token | Value |
|-------|-------|
| Brand | DMCC (Dubai Multi Commodities Centre) |
| Tagline | Where the world does business |
| CEO | Ahmed Bin Sulayem |
| Primary ink | `#0B1F3A` |
| Accent | `#C9A84C` (gold) |
| Typography | Gotham + Noto Naskh Arabic |
| Ecosystems | Gold · Diamonds · Crypto · AI · Tea · Coffee · Energy |
| Scale | 26,000+ companies · 180+ countries · 900+ activities · 87 towers |

Based on [dmcc.ae](https://dmcc.ae/).

- **CEO:** Ahmed Bin Sulayem — Executive Chairman & CEO
- **Founded:** 2002
- **Headquarters:** Almas Tower, JLT, Dubai
- **Destinations:** Jumeirah Lake Towers (JLT) · Uptown Dubai
- **Tax:** 0% corporate tax on qualifying free zone income · 0% personal income tax · 100% business ownership
- **Flagship reports:** Future of Trade (annual flagship research)
- **Awards:** 9-time Global Free Zone of the Year (fDi) · #1 FT fDi Global Knowledge Zone

## CEO Agent Team

Five specialist agents customised for DMCC executive leadership:

| Agent | Role |
|-------|------|
| Chief of Staff AI | Orchestrator — briefings, board packs, actions |
| Strategy AI | Commodities trade, free zone competitiveness, ecosystem growth |
| Policy AI | UAE free zone licensing, corporate tax, regulatory frameworks |
| Relationship AI | Member companies, trade partners, strategic MoUs |
| Communications AI | Speeches, press releases, bilingual drafts |
| Explorer AI | General web search for out-of-scope questions |

## Deployment (later)

- `netlify.toml` is included for a **separate** Netlify site
- Add environment variables in Netlify before going live (`ANTHROPIC_API_KEY`, etc.)

## Notes

- Logo SVGs in `public/dmcc-*.svg` — official DMCC brand assets
- Brand tokens: `src/config/brand.ts` (maps to `dmccGuidelines.ts`)
- Executive profile: `src/config/user.ts`
- Agent prompts: `server/csoPromptPack.mjs`
- Legacy `apparelGroupGuidelines.ts` re-exports from `dmccGuidelines.ts` for backward compatibility
