# Multi-AI Synchronization Control Plane

Provider-independent, provenance-preserving handoffs for the AI Evolutionary Evolutions ecosystem.

## Purpose

One approved source packet becomes four synchronized handoffs:

- GitHub canonical technical record
- Hostinger AI Website Builder prompt pack
- Gemini review/build packet
- Claude review/build packet

The tool does **not** log into providers, publish websites, overwrite repositories, or spend API funds. It builds deterministic bundles, hashes every approved input, records intended recipients, and leaves all external writes behind explicit human approval gates.

## Run

```bash
npm test
npm run sync
```

Output is written to `out/` and is intentionally ignored by Git.

## Operating law

AI proposes → RiskGate evaluates → human owner approves → adapters deliver → recipients acknowledge → QA verifies → MemPalace records → systems improve.

See [SOP.md](SOP.md) before any live transfer.

