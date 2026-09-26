"""Offline affiliate catalog to reviewable site draft and ChatGPT handoff."""
from __future__ import annotations

import hashlib
import html
import json
import re
from pathlib import Path
from urllib.parse import urlsplit


DISCLOSURE = "I may earn a commission if you buy through this link, at no extra cost to you."
VALID_CATEGORIES = {"programming", "blockchain", "linux", "business"}


def validate(catalog: dict) -> None:
    if catalog.get("schema_version") != "1.0.0" or catalog.get("site") != "aievolutionaryevolutions.com":
        raise ValueError("Unexpected catalog identity")
    offers = catalog.get("offers")
    if not isinstance(offers, list) or len(offers) > 100:
        raise ValueError("Invalid catalog size")
    ids = set()
    for offer in offers:
        if not isinstance(offer, dict) or set(offer) != {"id", "title", "description", "category", "status", "affiliate_url"}:
            raise ValueError("Invalid offer fields")
        if not re.fullmatch(r"[a-z0-9-]{3,64}", offer["id"]) or offer["id"] in ids:
            raise ValueError("Invalid or duplicate offer ID")
        ids.add(offer["id"])
        if offer["category"] not in VALID_CATEGORIES or offer["status"] not in {"draft", "approved"}:
            raise ValueError("Invalid offer state")
        if not offer["title"].strip() or not offer["description"].strip():
            raise ValueError("Offer needs a title and honest description")
        url = offer["affiliate_url"]
        if offer["status"] == "approved":
            if not isinstance(url, str):
                raise ValueError("Approved offer needs verified HTTPS referral URL")
            parts = urlsplit(url)
            if (parts.scheme != "https" or not parts.hostname or parts.username or parts.password
                    or parts.hostname in {"localhost", "127.0.0.1"} or parts.fragment):
                raise ValueError("Referral URL must be a public HTTPS URL without embedded credentials or fragment")
        elif url is not None:
            raise ValueError("Draft offer cannot expose an affiliate URL")


def render_page(catalog: dict) -> str:
    validate(catalog)
    cards = []
    for offer in catalog["offers"]:
        if offer["status"] != "approved":
            continue
        cards.append(
            '<article class="offer">'
            f'<p class="category">{html.escape(offer["category"])}</p>'
            f'<h2>{html.escape(offer["title"])}</h2>'
            f'<p>{html.escape(offer["description"])}</p>'
            f'<p class="disclosure">{DISCLOSURE}</p>'
            f'<a rel="sponsored nofollow noopener noreferrer" href="{html.escape(offer["affiliate_url"], quote=True)}">Explore the partner offer</a>'
            '</article>')
    content = "\n".join(cards) if cards else '<p>No partner offers have been approved for this page yet. Explore our programming, blockchain, and Linux learning resources as they are added.</p>'
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Learning resources | AI Evolutionary Evolutions</title>
<style>body{{font:1rem/1.6 system-ui,sans-serif;max-width:64rem;margin:auto;padding:2rem;color:#17253b;background:#f8fbff}}a{{color:#174ba0}}.offer{{background:#fff;border:1px solid #d5deed;border-radius:12px;padding:1.2rem;margin:1rem 0}}.disclosure{{font-weight:600}}.category{{text-transform:capitalize}}</style></head>
<body><main><h1>Learning resources</h1><p>Explore tools for programming, blockchain development, and Linux learning. We review each partner link before including it.</p>
{content}</main></body></html>
'''


def draft_packet(catalog: dict) -> dict:
    page = render_page(catalog)
    approved = [offer["id"] for offer in catalog["offers"] if offer["status"] == "approved"]
    return {"site": catalog["site"], "state": "draft_only", "approved_offer_ids": approved,
            "page_sha256": hashlib.sha256(page.encode()).hexdigest(),
            "next_action": "Review claims, affiliate terms, disclosure placement, and site preview before owner-approved publication"}


def build(catalog_path: Path, output_dir: Path) -> dict:
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    page = render_page(catalog)
    packet = draft_packet(catalog)
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "affiliate-hub.html").write_text(page, encoding="utf-8")
    (output_dir / "handoff.json").write_text(json.dumps(packet, indent=2) + "\n", encoding="utf-8")
    return packet


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("catalog", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    print(json.dumps(build(args.catalog, args.output), indent=2))
