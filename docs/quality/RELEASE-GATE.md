# Quality and Quality Assurance Release Gate

Quality and Quality Assurance are mandatory for every feature, quick action, API, assistant, swarm, integration, and deployment.

## Required sequence

1. Define the user outcome and acceptance criteria.
2. Design the smallest safe implementation.
3. Build in an isolated branch or environment.
4. Run automated tests and security checks.
5. Perform an independent AI-assisted review.
6. Validate integrations with mocked credentials or sandbox accounts.
7. Verify logs, error handling, rate limits, retries, and rollback behavior.
8. Obtain approval before production changes, credential changes, destructive actions, or public publishing.
9. Deploy with a rollback point.
10. Monitor the result and record lessons learned.

## Release blockers

A release is blocked when any of these is true:

- Tests fail or acceptance criteria are incomplete.
- Secrets are exposed or stored in source code.
- Permissions exceed least privilege.
- Tenant or project isolation is unverified.
- A destructive action lacks approval and rollback.
- An integration has no timeout, retry, or failure path.
- Observability is missing for a production service.
- The change cannot be reproduced from version control.

## Required evidence

Every production release must include a change summary, test results, security review, integration status, deployment record, rollback plan, and known limitations.
