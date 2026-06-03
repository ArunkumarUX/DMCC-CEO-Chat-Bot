#!/usr/bin/env bash
# Clone hugohe3/ppt-master for local deck generation (not deployed to Netlify).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$ROOT/tools/ppt-master"
REPO="https://github.com/hugohe3/ppt-master.git"

if [[ -d "$TARGET/skills/ppt-master" ]]; then
  echo "ppt-master already present at tools/ppt-master"
  exit 0
fi

echo "Cloning ppt-master (shallow) into tools/ppt-master …"
git clone --depth 1 "$REPO" "$TARGET"

echo "Installing Python dependencies …"
python3 -m pip install -r "$TARGET/requirements.txt"

echo "Done. Enable in app: VITE_ENABLE_PPT_MASTER=true in .env.local"
echo "ADGM project sources: tools/ppt-master-adgm/projects/adgm-command-centre/sources/"
