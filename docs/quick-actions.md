# Quick Actions

Quick Actions are divided into two classes.

## Safe by default

- `list_memory`
- `create_lesson`
- `summarize_repository`
- provider routing and agent planning

These actions produce local results and do not send, publish, deploy, spend, delete, or modify external systems.

## Approval-gated

- `send_email`
- `post_slack`
- `run_zapier`
- `write_github`
- `deploy`
- `financial_action`
- `credential_change`
- `blockchain_transaction`
- `destructive_action`

These remain disabled until their connector is implemented, credentials are configured, auditing is enabled, and the user explicitly approves the individual operation. The current approval token is only a development placeholder and must be replaced by authenticated approval before production.
