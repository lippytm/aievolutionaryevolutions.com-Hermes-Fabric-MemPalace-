# Platform Acceptance Checklist

## Product

- [ ] Every quick action has a clear user outcome.
- [ ] Every action has a schema, owner, risk level, and permission scope.
- [ ] The dashboard explains what an action will do before execution.
- [ ] Search, categories, filters, and deep links work.
- [ ] Educational content distinguishes facts, examples, simulations, and recommendations.

## Quality

- [ ] Unit tests pass.
- [ ] Integration and contract tests pass.
- [ ] Regression comparisons pass.
- [ ] Error, timeout, retry, and cancellation behavior is tested.
- [ ] Accessibility review is complete.
- [ ] Documentation and release evidence are complete.

## Security

- [ ] No secrets appear in source, prompts, logs, or artifacts.
- [ ] Permissions are least privilege.
- [ ] Tenant and environment isolation is tested.
- [ ] Input and output validation is active.
- [ ] Prompt-injection and tool-abuse protections are tested.
- [ ] Dependencies and attachments are scanned.
- [ ] Backups and restoration are verified.

## AI and swarm governance

- [ ] Agent roles and tools are scoped.
- [ ] Memory boundaries are defined.
- [ ] Independent review is enabled for high-impact tasks.
- [ ] Budgets, stop conditions, and escalation paths exist.
- [ ] Suggestions show evidence, confidence, risk, and approval requirements.
- [ ] Learning from feedback is versioned and reviewable.

## Operations

- [ ] Health checks and monitoring are active.
- [ ] Audit records are searchable.
- [ ] Rollback or recovery is tested.
- [ ] Cost and usage limits are configured.
- [ ] Staging validation is complete.
- [ ] Production approval is recorded.

## High-risk actions

- [ ] Financial, payment, wallet, trading, credential, deletion, and public-publishing actions remain approval-gated.
- [ ] No automated action guarantees financial outcomes.
- [ ] Human review is required where policy or law may apply.
