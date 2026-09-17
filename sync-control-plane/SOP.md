# SOP — Multi-AI and Hostinger Synchronization

## 1. Purpose

Keep ChatGPT, Gemini, Claude, GitHub and Hostinger aligned without silently mixing identities, overwriting work, leaking secrets or publishing unapproved content.

## 2. Authority and sources of truth

1. Charles Earl Lipshay is the human owner and final approver.
2. Official human, government, banking, tax and contract records control legal and financial facts.
3. GitHub is the canonical technical evidence and version record.
4. MemPalace stores approved context, provenance, corrections and decisions.
5. Hermes Fabric routes signed handoffs and matching acknowledgements.
6. Fable 5 creates labeled alternatives; it does not decide factual truth.
7. Hostinger is the public website assembly and publication surface.
8. Gemini and Claude are independent build/review stations, not invisible extensions of ChatGPT.

## 3. Standard synchronization cycle

### A. Capture

- Assign a stable project, mission and bundle ID.
- Place only approved, non-secret inputs in `approved-source/`.
- Label each artifact as real business, educational, documentary/commentary, creative persona, fiction/satire, experimental R&D, advertisement/offer, affiliate/partner mention or behind the scenes.

### B. Validate

- Spell-check names, domains, prices and legal terms.
- Scan for secrets, private keys, credentials, payment details, wallet seeds and unnecessary personal data.
- Confirm ownership, licenses, attribution and third-party restrictions.
- Run deterministic tests and record unresolved risks.

### C. Generate

- Run `npm test`.
- Run `npm run sync`.
- Verify one bundle ID, complete file list and SHA-256 hash for every destination.
- Do not change generated packets by hand; correct the approved source and regenerate.

### D. Human approval

- Charles reviews the change summary, sources, risks, estimated costs and intended destinations.
- Mark approval explicitly. Silence is not approval.
- Red RiskGate findings stop delivery.

### E. Deliver

- **GitHub:** use a branch and pull request; never write directly to the protected default branch.
- **Hostinger:** duplicate the site; use manual mode; add one generated page or section at a time; review mobile layout, navigation, spelling, links and disclosures before Update Website.
- **Gemini:** provide the Gemini handoff packet and approved files; request bundle/hash acknowledgement and independent findings.
- **Claude:** provide the Claude handoff packet and approved files; request bundle/hash acknowledgement and independent critique.

### F. Reconcile

- Record each acknowledgement, provider/model identity, changed files, new hashes, disagreements, costs and failures.
- Never use majority vote as proof.
- Resolve conflicts using official records, sources, tests, QA and human decisions.
- Link corrections to superseded records rather than deleting history.

### G. Release and recover

- QA verifies the final candidate.
- Charles approves or rejects release.
- Publish the smallest reversible change.
- Confirm monitoring, backup and rollback.
- Record the result and lessons in MemPalace.

## 4. Hostinger builder checklist

- Work on a duplicate first.
- Do not import the static ZIP directly into AI Website Builder.
- Generate the five initial pages: Home, Start Here, AI Big Brain Network, Funding Readiness and Transparency.
- Preserve the current header, footer, colors and useful content.
- Keep `lippytmai.getbizfunds.com` as a disclosed external funding-readiness pathway.
- Never claim guaranteed approval, financing, income, safety, security or investment return.
- Avoid custom code until a page works with native Builder sections.
- Cover private information in screenshots before sharing them with an AI.

## 5. Incident procedure

If a wrong page, leak, broken link, false claim, duplicate analytics ID or unauthorized change appears:

1. Stop publishing and automation.
2. Capture the URL, time, screenshot and bundle ID without copying secrets.
3. Revert to the last approved version or duplicate.
4. Notify P07 Truth, QA & Whistleblower and Charles.
5. Identify cause, affected systems and required corrections.
6. Test the repair in a non-production copy.
7. Release only after QA and human approval.

## 6. Definition of synchronized

A destination is synchronized only when it acknowledges the exact bundle ID and file hashes, reports its provider/model identity, returns changes with provenance, and those changes are reconciled into GitHub and MemPalace. Uploading or pasting alone is not synchronization.
