#!/usr/bin/env bash
# Real Personal AI Agent screenshots for Dubai PPT — no app changes.
# Prerequisite: npm run dev (http://localhost:5173)
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
OUT="$ROOT/docs/deck-screenshots/dubai-version"
DL="$HOME/Downloads/cso-agent-deck-screenshots/dubai-version"
mkdir -p "$OUT" "$DL"

if ! curl -sf "http://localhost:5173" >/dev/null; then
  echo "ERROR: Dev server not running. Start with: npm run dev"
  exit 1
fi

echo "Capturing 11 screenshots → $OUT"
node scripts/capture-deck-screenshots.mjs

echo ""
echo "Done. Copy also in: $DL"
open "$DL"
