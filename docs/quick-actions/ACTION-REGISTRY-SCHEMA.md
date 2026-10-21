# Quick-Action Registry Schema

The registry is the source of truth for all quick actions, AI suggestions, automations, autonomous automations, assistants, swarms, and integrations.

## Required fields

- `id`: stable unique identifier
- `name`: user-facing action name
- `version`: semantic action version
- `category`: build, teach, connect, operate, improve, secure, assure, scale, govern, or business
- `description`: clear user outcome
- `inputs`: typed input definitions and validation rules
- `outputs`: typed result definition
- `permissions`: minimum required scopes
- `risk_level`: informational, low, moderate, high, or critical
- `execution_mode`: explain, recommend, guided, supervised, or governed-autonomous
- `preview_supported`: whether dry-run is available
- `approval_policy`: when approval is required
- `timeout`: maximum execution duration
- `retry_policy`: retry count and backoff behavior
- `budget_limits`: resource, time, and cost boundaries
- `data_classification`: sensitivity of data handled
- `audit_events`: events recorded during execution
- `verification`: post-execution checks
- `rollback`: rollback or recovery procedure
- `owner`: accountable product or engineering owner
- `documentation`: training and reference material
- `review_date`: next quality and security review

## Registry behavior

The platform must reject incomplete registrations, incompatible versions, missing owners, missing rollback plans for state-changing actions, and autonomous execution without defined stop conditions.

The registry supports discovery, search, recommendation ranking, permission checks, training generation, usage analytics, deprecation, and safe retirement.

## Action result contract

Each execution returns a structured result containing status, summary, affected resources, evidence, warnings, logs reference, verification result, follow-up recommendations, and recovery guidance.
