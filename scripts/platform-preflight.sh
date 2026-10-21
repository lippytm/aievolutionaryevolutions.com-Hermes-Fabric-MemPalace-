#!/usr/bin/env bash
set -euo pipefail

./scripts/validate_quick_actions.sh
./scripts/validate_ai_providers.sh
./scripts/action-release-preflight.sh

echo "Platform preflight passed. Runtime implementation, integration tests, security review, and staging validation remain required."
