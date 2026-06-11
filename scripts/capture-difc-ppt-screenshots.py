#!/usr/bin/env python3
"""Capture all DIFC Executive Intelligence screens (except Settings) for PPT export."""
from __future__ import annotations

import os
import shutil
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "deck-screenshots" / "difc-executive-intelligence"
DOWNLOADS = Path.home() / "Downloads" / "difc-executive-intelligence-ppt"
BASE = os.environ.get(
    "DIFC_SCREENSHOT_BASE",
    "http://127.0.0.1:8765/DIFC%20Executive%20Intelligence%20%28standalone%29.html",
)

SHOTS = [
    ("01-executive-home", "home", "Executive Home", 2500),
    ("02-ask-personal-ai-agent", "agent", "Ask Personal AI Agent", 2000),
    ("03-performance", "performance", "Performance", 2000),
    ("04-market-intelligence", "market", "Market Intelligence", 2500),
    ("05-regulatory", "regulatory", "Regulatory", 2000),
    ("06-knowledge-base", "knowledge", "Knowledge Base", 2000),
    ("07-briefings", "briefings", "Briefings", 2000),
]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    DOWNLOADS.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = None
        last_err = None
        for launcher in (
            lambda: p.chromium.launch(headless=True),
            lambda: p.chromium.launch(headless=True, channel="chrome"),
            lambda: p.chromium.launch(headless=False, channel="chrome"),
        ):
            try:
                browser = launcher()
                break
            except Exception as exc:
                last_err = exc
        if browser is None:
            print(f"ERROR: Could not launch a browser for screenshots: {last_err}", file=sys.stderr)
            return 1

        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2,
            color_scheme="light",
        )
        page = context.new_page()

        for name, screen, label, wait_ms in SHOTS:
            print(f"→ {label}")
            page.goto(BASE, wait_until="networkidle", timeout=90000)
            page.evaluate("(id) => localStorage.setItem('difc.screen', id)", screen)
            page.reload(wait_until="networkidle", timeout=90000)
            page.wait_for_selector(".app", timeout=30000)
            time.sleep(wait_ms / 1000)
            out_file = OUT / f"{name}.png"
            page.screenshot(path=str(out_file), full_page=False, type="png")
            shutil.copy2(out_file, DOWNLOADS / f"{name}.png")
            print(f"  {out_file}")

        browser.close()

    print(f"\n{len(SHOTS)} screenshots →\n  {OUT}\n  {DOWNLOADS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
