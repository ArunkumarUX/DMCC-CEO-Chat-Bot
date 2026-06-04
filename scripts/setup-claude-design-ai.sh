#!/usr/bin/env bash
# Clone Claude-Code-Design-AI for local reference (MIT) — deck skill lives in-repo.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$ROOT/tools/claude-design-ai/upstream"
REPO="https://github.com/mikesheehan54/Claude-Code-Design-AI.git"

if [[ -f "$TARGET/README.md" ]]; then
  echo "claude-design-ai upstream already at tools/claude-design-ai/upstream"
  exit 0
fi

echo "Cloning Claude-Code-Design-AI (shallow) …"
mkdir -p "$(dirname "$TARGET")"
git clone --depth 1 "$REPO" "$TARGET"

echo "Done."
echo "  Upstream:  tools/claude-design-ai/upstream/"
echo "  Deck craft: tools/claude-design-ai/DESIGN-FOR-DECKS.md (committed)"
echo "  Cursor:     .cursor/skills/adgm-claude-design-ppt/SKILL.md"
echo "  Optional:   download ClaudeDesign.zip from upstream GitHub Releases for full React/Tailwind UI kit"
