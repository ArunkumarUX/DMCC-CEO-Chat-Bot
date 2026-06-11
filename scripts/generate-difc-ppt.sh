#!/usr/bin/env bash
# Capture all DIFC Executive Intelligence screens (except Settings) and build PPTX.
set -euo pipefail
cd "$(dirname "$0")/.."

HTML="$HOME/Downloads/DIFC Executive Intelligence (standalone).html"
PORT="${DIFC_HTTP_PORT:-8765}"
BASE="http://127.0.0.1:${PORT}/DIFC%20Executive%20Intelligence%20%28standalone%29.html"
PID=""

cleanup() {
  if [[ -n "${PID}" ]] && kill -0 "${PID}" 2>/dev/null; then
    kill "${PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT

if [[ ! -f "$HTML" ]]; then
  echo "ERROR: Missing $HTML"
  exit 1
fi

if ! curl -sf "$BASE" >/dev/null 2>&1; then
  echo "Starting HTTP server on port ${PORT}..."
  (cd "$HOME/Downloads" && python3 -m http.server "${PORT}" --bind 127.0.0.1) &
  PID=$!
  for _ in $(seq 1 20); do
    if curl -sf "$BASE" >/dev/null 2>&1; then break; fi
    sleep 0.5
  done
  if ! curl -sf "$BASE" >/dev/null 2>&1; then
    echo "ERROR: Could not serve DIFC HTML at $BASE"
    exit 1
  fi
fi

export DIFC_SCREENSHOT_BASE="$BASE"
echo "Capturing screenshots from $BASE"
if python3 scripts/capture-difc-ppt-screenshots.py; then
  :
elif node scripts/capture-difc-ppt-screenshots.mjs; then
  :
else
  echo "ERROR: Screenshot capture failed (tried Python Playwright and Node Playwright)"
  exit 1
fi
echo "Building PPTX..."
node scripts/build-difc-ppt.mjs
echo "Done."
