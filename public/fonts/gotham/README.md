# Header fonts (Gotham A / B)

Cloud.typography (dmcc.ae kit) is **domain-locked** and returns **403 on localhost**, so headers fell back to Montserrat and looked broken.

**Local fix:** `GothamA-latin.woff2` + `GothamA-latin-ext.woff2` are self-hosted and registered as `font-family: 'Gotham A'` / `'Gotham B'` in `src/styles/arm-fonts.css`.

When licensed Gotham webfonts are available from brand, replace these files with the real Gotham files and keep the same family names.
