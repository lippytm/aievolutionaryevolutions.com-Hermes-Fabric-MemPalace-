#!/usr/bin/env bash
set -euo pipefail

config="config/ai-providers.yaml"

if [[ ! -s "$config" ]]; then
  echo "AI provider configuration is missing or empty: $config" >&2
  exit 1
fi

for provider in openai chatgpt-business gemini claude claude-cowork perplexity; do
  if ! grep -Eq "^  ${provider}:" "$config"; then
    echo "Missing provider configuration: ${provider}" >&2
    exit 1
  fi
done

for contract in input_contract output_contract merge_contract; do
  if ! grep -Eq "^${contract}:" "$config"; then
    echo "Missing provider contract: ${contract}" >&2
    exit 1
  fi
done

for rule in preserve_provider_provenance prefer_verified_evidence separate_facts_assumptions_and_recommendations require_review_for_high_impact_outputs; do
  if ! grep -q "$rule" "$config"; then
    echo "Missing provider merge rule: ${rule}" >&2
    exit 1
  fi
done

echo "AI provider configuration preflight passed."
