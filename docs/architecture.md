# Staged architecture

## Stage 1: foundation

The API exposes provider routing, memory, a Quick Action registry, and health checks. The default memory store is local for tests. MemPalace is accessed through an explicit adapter URL when configured.

## Stage 2: provider and memory adapters

Add streaming responses, retry/backoff, model capabilities, provider budgets, and a verified MemPalace contract. Do not place API keys in source files.

## Stage 3: Hermes Fabric

Add agent definitions, task routing, shared context, tool permissions, event tracing, and approval state. Each agent should declare its allowed tools and data scope.

## Stage 4: Quick Actions

Implement connectors one at a time. Read-only actions can be enabled after tests. Email, Slack, Zapier, GitHub writes, deployments, financial actions, credential changes, blockchain transactions, and destructive actions remain approval-gated.

## Stage 5: website and operations

Expose a narrow website API, authenticate users, add rate limits, audit logs, observability, backups, and deployment health checks before public launch.
