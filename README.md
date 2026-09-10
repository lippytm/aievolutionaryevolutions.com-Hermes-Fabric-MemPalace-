# AI Evolutionary Evolutions — Hermes Fabric + MemPalace

This repository contains the staged foundation for a cross-platform AI Agent Swarm system serving aievolutionaryevolutions.com.

## Current stages

- **Stage 1:** FastAPI foundation, Docker, provider-neutral routing, local/MemPalace memory interface, Quick Action registry, tests, and CI.
- **Stage 2:** Agent definitions, swarm planning, audit logging, and safe Quick Action execution.
- **Stage 3:** Prompt #11, expanded learning/content/simulation Quick Actions, innovation roadmap, and best-practice guardrails.

Supported provider routing is designed for OpenAI/ChatGPT, Gemini, and Claude. Claude is included in agent preference policies; its live adapter will be added after its API contract and deployment secret are configured.

Prompt #11 is available through the prompt registry as the Safe Build-and-Learn Orchestrator. It converts a goal into an explainable staged plan, safe actions, approval-gated actions, tests, and rollback criteria.

External side effects remain disabled by default. The service never stores provider keys in Git.
