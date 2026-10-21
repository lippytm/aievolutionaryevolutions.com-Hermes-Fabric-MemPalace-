# AI Building and Evolving AI Best Practices

## Core rule

AI may propose, generate, test, and improve systems, but it must not silently change production, expose secrets, widen permissions, publish content, or make irreversible decisions.

## Design practices

- Start with a measurable user outcome.
- Define success, failure, safety, and quality criteria before implementation.
- Prefer small, composable, reversible changes.
- Separate planning, execution, verification, and approval.
- Use typed contracts for tools, APIs, workflows, and agent outputs.
- Keep provider-specific behavior behind stable interfaces.
- Design explicit fallback and degraded-service behavior.

## Agent and swarm practices

- Give every agent a narrow role and explicit authority.
- Use least-privilege tools and scoped credentials.
- Make stop conditions and escalation paths explicit.
- Require independent review for high-impact work.
- Detect disagreement instead of averaging conflicting answers blindly.
- Keep memory scoped, versioned, reviewable, and removable.
- Do not allow agents to grant themselves permissions.

## Learning and evolution practices

- Learn only from approved, traceable outcomes.
- Preserve the baseline before changing behavior.
- Evaluate candidate changes against fixed regression sets.
- Track quality, safety, cost, latency, reliability, and user outcomes separately.
- Keep experiments isolated from production.
- Record why a change was accepted, rejected, or reverted.
- Retire weak or duplicated capabilities instead of accumulating them indefinitely.

## Coding and API practices

- Use version control and pull requests.
- Never place secrets in source code, prompts, logs, or generated documentation.
- Validate all external inputs.
- Use authentication, authorization, rate limits, timeouts, retries, and idempotency.
- Pin dependencies and scan them for vulnerabilities.
- Generate contract tests for every connector.
- Use mocks or sandbox accounts before live integrations.

## QA practices

- Test normal, boundary, failure, abuse, and recovery cases.
- Test prompts and agent behavior, not only application code.
- Use deterministic fixtures where possible.
- Review generated code before execution.
- Verify outputs against acceptance criteria and policy constraints.
- Run accessibility and usability checks for educational interfaces.
- Require a release report before production promotion.

## Security and privacy practices

- Minimize data collection.
- Encrypt sensitive data in transit and at rest.
- Separate tenants, projects, environments, and secrets.
- Log security-relevant events without logging secret values.
- Defend against prompt injection, tool abuse, data exfiltration, and malicious attachments.
- Make retention, export, and deletion behavior explicit.
- Review third-party integrations before enabling them.

## Operational practices

- Monitor health, errors, cost, latency, queue depth, and quality signals.
- Set budgets and rate limits before enabling autonomous work.
- Back up data and verify restoration.
- Maintain rollback paths.
- Use staged releases and canary testing.
- Document known limitations and unresolved risks.
- Treat incidents as inputs to a tracked improvement process.

## Release decision

A change is ready only when it meets functional acceptance criteria, passes QA and security checks, has documented risks, has an approved deployment path, and has a tested recovery strategy.
