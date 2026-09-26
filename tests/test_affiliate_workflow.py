import copy
import json
import tempfile
import unittest
from pathlib import Path
from affiliate.workflow import DISCLOSURE, build, render_page, validate

CATALOG = Path(__file__).resolve().parents[1] / "affiliate/catalog.json"

class AffiliateWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.catalog = json.loads(CATALOG.read_text(encoding="utf-8"))

    def test_draft_catalog_builds_no_live_affiliate_links(self):
        with tempfile.TemporaryDirectory() as root:
            packet = build(CATALOG, Path(root))
            page = (Path(root) / "affiliate-hub.html").read_text()
            self.assertEqual(packet["state"], "draft_only")
            self.assertEqual(packet["approved_offer_ids"], [])
            self.assertNotIn('rel="sponsored', page)

    def test_approved_link_has_adjacent_disclosure_and_escapes_content(self):
        offer = self.catalog["offers"][0]
        offer.update(status="approved", title="Code <script>", affiliate_url="https://partner.example/course?ref=public-code")
        page = render_page(self.catalog)
        self.assertIn("Code &lt;script&gt;", page)
        self.assertNotIn("<script>", page)
        self.assertIn(DISCLOSURE, page)
        self.assertLess(page.index(DISCLOSURE), page.index('href="https://partner.example'))
        self.assertIn('rel="sponsored nofollow noopener noreferrer"', page)

    def test_rejects_unapproved_link_and_unsafe_url(self):
        invalid = copy.deepcopy(self.catalog)
        invalid["offers"][0]["affiliate_url"] = "https://partner.example/?ref=code"
        with self.assertRaises(ValueError): validate(invalid)
        invalid["offers"][0]["status"] = "approved"
        invalid["offers"][0]["affiliate_url"] = "javascript:alert(1)"
        with self.assertRaises(ValueError): validate(invalid)

if __name__ == "__main__": unittest.main()
