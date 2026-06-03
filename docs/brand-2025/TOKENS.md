# ADGM Brand Book 2025 — design tokens

Source: `ADGM Brand Book_2025.pdf` (© ADGM 2025, May 2025)

## Positioning

- **Tagline:** Path to Forward
- **Short name:** ADGM only (not “Abu Dhabi Global Market” in press/marketing)

## Typography

| Role | Typeface | Weights in UI |
|------|----------|----------------|
| Primary | **Gilroy** (`adgm-gilroy`) | 400 Regular, 500 Medium, 600 SemiBold |
| Secondary / fallback | **Aptos** | System (Microsoft 365) |
| Arabic | **Madani Arabic** | Medium — use brand files when available; Noto Naskh Arabic as web fallback |

- Body letter-spacing: **0.4px**

## Primary colours (page 10)

| Name | Hex | Usage |
|------|-----|--------|
| Clearsky blue | `#0087FF` | Primary actions, links, active nav |
| Slate grey | `#A3ADC2` | Borders, muted labels |
| Pale cyan | `#AFFAFF` | Light panels, highlights |
| Black | `#000000` | Logo lockups |

## Secondary colours

| Name | Hex | Usage |
|------|-----|--------|
| Royal blue | `#002ED1` | Gradients, depth |
| Mint | `#E5F0F0` | Soft surfaces |
| Sand | `#F0E8D8` | Warm accent surfaces |

## Digital UI (adgm.com alignment)

- Midnight navy text: `#00092A`
- Navy mid / deep: `#001C7D`, `#002ED1`

Tokens are implemented in `src/config/brand.ts` and `src/styles/command-centre.css`.
