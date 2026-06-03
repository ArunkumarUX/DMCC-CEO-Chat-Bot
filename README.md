# ADGM CSO Personal AI Assistant — Prototype

Interactive prototype aligned with **ADGM CSO Personal AI Assistant.pdf**, [ADGM brand direction](https://www.adgm.com/) (*Path to Forward*), and the Executive AI Command Centre delivery specs.

## Run locally

```bash
cd personal-ai-chat
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

`npm run dev` starts **both** the Vite UI and a small local API proxy on port `8787`.

### Live Claude answers (optional)

1. Copy `.env.example` → `.env.local`
2. Set your key (never commit `.env.local`):

   ```bash
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Restart `npm run dev`
4. Open **Ask Personal AI Agent** (`/chat`) — footer should say *Powered by Claude*

The API key is read only by `server/dev-api.mjs` on your machine, not bundled into the browser. If the key is missing or the API is down, chat falls back to the built-in demo responses.

UI only (no API): `npm run dev:ui` · API only: `npm run dev:api`

## Screens & routes

| Route | Screen |
|-------|--------|
| `/` | Landing / Welcome |
| `/dashboard` | Home overview |
| `/chat` | Main chat interface |
| `/documents` | Document upload & analysis |
| `/workflows` | Guided workflow assistant |
| `/prompts` | Prompt library |
| `/settings` | User settings (light default) |

## CSO PDF alignment (`ADGM CSO Personal AI Assistant.pdf`)

- **Product naming** and tagline from the proposal deck
- **CSO daily intelligence** — five numbered pillars on home: Overnight · Market · Competitor · Regulatory · Performance & risk
- **What you can do** — four capabilities strip on the command deck
- **Top features** — covered via chat, documents, workflows, performance, and six focus areas

## Engineering spec (`ADGM_AI_Technical_Spec_v1`)

- **Five agents**: Policy, Strategy, Chief of Staff, Relationship, Communications — shown as badges on responses
- **SSE-style chat**: Simulated streaming with thinking state, stop, regenerate
- **Confidence gate**: Scores on messages; low-confidence UX via warnings
- **Sources / RAG**: Side panel with citations, copy, open source
- **Document ingestion**: Upload, processing, summary, clauses, Q&A
- **RBAC-ready settings**: Profile, language (en/ar/bilingual), response style
- **Feedback loop**: Thumbs up/down per message
- **Dashboard**: Usage metrics, recent chats, documents, workflows

All interactions use **dummy data** — no backend required.

## Design system (ADGM Brand Book 2025)

- **Source**: `ADGM Brand Book_2025.pdf` — see `docs/brand-2025/TOKENS.md`
- **Primary blue (Clearsky)**: `#0087FF` — CTAs, links, active states
- **Primary cyan / slate / black**: `#AFFAFF`, `#A3ADC2`, `#000000`
- **Secondary**: royal `#002ED1`, mint `#E5F0F0`, sand `#F0E8D8`
- **Navy (digital UI)**: `#00092A` — headers, body text on light
- **Typography**: Gilroy (`adgm-gilroy`) Regular/Medium/SemiBold; Aptos fallback; Madani Arabic + Noto Naskh (RTL)
- **Body tracking**: `0.4px`
- **Tagline**: Path to Forward
- Tokens: `src/config/brand.ts`, `src/styles/command-centre.css`, `src/styles/adgm-fonts.css`
- **Mobile**: Bottom nav, drawer for conversations, sticky chat input

## Handoff notes for developers

- Replace `AppContext` mock handlers with `POST /api/v1/chat` SSE per spec §07
- Wire `useChat` hook to stream `intent`, `context`, `token`, `done` events
- Connect document upload to `POST /api/v1/documents`
- Implement Azure AD Bearer auth on all API calls
- Use logical CSS properties (`ms-`/`me-`) for RTL when `language === 'ar'`

Spec source: `Desktop/AI Projects/Personal AI chat bot/ADGM_AI_Technical_Spec_v1.docx`
