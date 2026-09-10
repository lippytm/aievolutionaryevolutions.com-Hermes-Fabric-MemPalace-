# AI Evolutionary Evolutions — Hermes Fabric + MemPalace

This repository contains the staged foundation for a cross-platform AI Agent Swarm system serving aievolutionaryevolutions.com.

## Current stages

- **Stage 1:** FastAPI foundation, Docker, provider-neutral routing, local/MemPalace memory interface, Quick Action registry, tests, and CI.
- **Stage 2:** Architect, programming teacher, blockchain teacher, Linux/DevOps, researcher, and release manager agent definitions; swarm planning; audit logging; and safe Quick Action execution.

Supported provider routing is designed for OpenAI/ChatGPT, Gemini, and Claude. Claude is represented in agent preference policies now; its adapter will be added after its API contract and deployment secret are configured.

## Safety model

Read-only actions can run without approval. External side effects — sending messages, changing GitHub, deploying, financial operations, credentials, blockchain transactions, and destructive actions — require an approval token and an enabled integration. The service never stores provider keys in Git.

## Run locally

```bash
cp .env.example .env
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
uvicorn app.main:app --reload
```

With Docker:

```bash
docker compose up --build
```

The next stage is to add authenticated Claude routing, verified MemPalace endpoints, Hermes task execution, and real external connectors one at a time.
