#!/usr/bin/env bash
# Shallow clone open-design for local deck skills (McKinsey / html-ppt) — not deployed.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$ROOT/tools/open-design"
REPO="https://github.com/nexu-io/open-design.git"

if [[ -f "$TARGET/skills/deck-swiss-international/SKILL.md" ]]; then
  echo "open-design already present at tools/open-design"
  exit 0
fi

echo "Cloning open-design (shallow, sparse deck skills) …"
mkdir -p "$(dirname "$TARGET")"
git clone --depth 1 --filter=blob:none --sparse "$REPO" "$TARGET"
cd "$TARGET"
git sparse-checkout set \
  skills/deck-swiss-international \
  design-templates/html-ppt/SKILL.md \
  design-templates/html-ppt-pitch-deck \
  design-templates/html-ppt/references \
  LICENSE \
  README.md

echo "Done. Deck skills: tools/open-design/skills/deck-swiss-international/"
echo "Master html-ppt: tools/open-design/design-templates/html-ppt/SKILL.md"
echo "Use in Cursor: .cursor/skills/adgm-open-design-deck/SKILL.md"
