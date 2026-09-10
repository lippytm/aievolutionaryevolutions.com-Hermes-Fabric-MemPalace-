# AI Evolutionary Evolutions — Hermes Fabric + MemPalace

This repository contains the staged foundation for a cross-platform AI Agent Swarm system serving aievolutionaryevolutions.com.

## Stage 1 included

- Provider-neutral routing for OpenAI/ChatGPT and Gemini.
- A memory protocol with a local development store and an optional MemPalace HTTP adapter.
- A Quick Action registry with explicit approval gates.
- FastAPI health, routing, memory, and Quick Action endpoints.
- Docker and Compose configuration with no secrets committed.
- Automated tests and CI.

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

The first milestone is intentionally provider- and platform-neutral. Add real credentials only through deployment secrets, then test one provider at a time before enabling additional agents or Quick Actions.
