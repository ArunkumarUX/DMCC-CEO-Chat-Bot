# ADGM Command Centre — PPT Master project

Use this folder with [PPT Master](https://github.com/hugohe3/ppt-master) (installed via `npm run ppt-master:setup`).

## Workflow

1. Export source markdown from the app: **Deck builder** → *Download briefing source*.
2. Save the file into `sources/` (e.g. `sources/board-pack-source.md`).
3. In Cursor (or Claude Code), ask:

   ```
   Read skills/ppt-master/SKILL.md from tools/ppt-master.
   Create a PPT from tools/ppt-master-adgm/projects/adgm-command-centre/sources/board-pack-source.md
   Use ADGM brand: navy #00092a, Clearsky #0087ff, Gilroy-style executive layout, 16:9.
   Audience: Rajiv Sehgal, CSO, Abu Dhabi Global Market.
   ```

4. Open the exported `.pptx` from `tools/ppt-master/projects/.../exports/`.

## Brand hints

- Primary: `#0087ff` (Clearsky)
- Navy: `#00092a`
- Tone: board-ready, D33-aligned, minimal jargon
- Prefer **native editable** shapes (PPT Master default)
