# Quick Action Specification

Every quick action must be registered with a stable identifier, description, version, input schema, output schema, permission scope, risk level, preview behavior, approval policy, timeout, retry policy, audit event, and rollback strategy.

## Action lifecycle

`discover -> validate -> preview -> approve -> execute -> verify -> record`

## Action classes

- Build: applications, APIs, dashboards, databases, workflows, and documentation.
- Connect: AI providers, GitHub, Slack, Zapier, email, databases, and storage.
- Operate: schedules, webhooks, queues, retries, deployments, and service recovery.
- Improve: refactoring, dependency updates, performance, prompts, documentation, and tests.
- Secure: secret scans, permission reviews, dependency scans, audit reviews, and incident response.
- Assure: unit tests, integration tests, regression tests, independent review, and release checks.
- Business: memberships, affiliate campaigns, education products, analytics, and customer onboarding.

## Safety defaults

- Read-only and dry-run by default.
- Least-privilege credentials.
- No secrets in prompts, logs, commits, or generated documentation.
- Production, public, destructive, financial, and credential actions require approval.
- Every action emits an audit event.
- Every action has a clear failure path and operator-readable result.
