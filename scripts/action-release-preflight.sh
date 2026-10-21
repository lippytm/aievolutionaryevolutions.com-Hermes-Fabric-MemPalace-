#!/usr/bin/env bash
set -euo pipefail

./scripts/validate_quick_actions.sh

test -s docs/quality/RELEASE-GATE.md
test -s docs/quick-actions/MASTER-CATALOG.md
test -s docs/quick-actions/SUGGESTION-AND-BEST-PRACTICE-POLICY.md
test -s docs/implementation/NEXT-STEPS.md
test -s docs/implementation/ACCEPTANCE-CHECKLIST.md

echo "Action release preflight passed. Full tests and security checks are still required before deployment."
