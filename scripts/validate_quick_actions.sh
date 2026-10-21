#!/usr/bin/env bash
set -euo pipefail

registry="config/quick-actions.yaml"

if [[ ! -s "$registry" ]]; then
  echo "Quick-action registry is missing or empty: $registry" >&2
  exit 1
fi

required=(version name mode approval_defaults categories execution_contract)
for key in "${required[@]}"; do
  if ! grep -Eq "^${key}:" "$registry"; then
    echo "Missing required registry key: ${key}" >&2
    exit 1
  fi
done

for category in build teach connect automate improve assure secure operate govern business data finance crypto attachments evolution swarm robotics linux blockchain; do
  if ! grep -Eq "^  ${category}:" "$registry"; then
    echo "Missing quick-action category: ${category}" >&2
    exit 1
  fi
done

for contract in validation permissions audit verification; do
  if ! grep -q "$contract" "$registry"; then
    echo "Missing execution contract requirement: ${contract}" >&2
    exit 1
  fi
done

echo "Quick-action registry preflight passed."
