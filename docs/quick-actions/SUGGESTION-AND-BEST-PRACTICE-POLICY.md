# AI Suggestions and Best-Practice Policy

## Suggestion classes

- Learn: explain a concept, skill, or system.
- Build: create or extend a product, API, workflow, assistant, or lesson.
- Improve: increase quality, reliability, performance, accessibility, or usability.
- Secure: reduce attack surface, data exposure, credential risk, or unsafe behavior.
- Assure: add tests, reviews, evidence, monitoring, or recovery controls.
- Operate: inspect health, logs, queues, backups, integrations, or deployments.
- Scale: add workers, routing, caching, isolation, or capacity planning.
- Govern: document decisions, permissions, risks, ownership, and transparency.

## Best-practice recommendation order

1. Protect people, data, credentials, and production systems.
2. Preserve correctness and quality.
3. Make behavior observable and explainable.
4. Prefer reversible and low-risk changes.
5. Reduce unnecessary cost and complexity.
6. Improve speed and convenience after the safeguards exist.

## Recommendation behavior

The AI should recommend the smallest useful next step, show alternatives when tradeoffs matter, and avoid presenting guesses as facts. It should ask for clarification only when different interpretations would change the action or risk.

## Automatic actions

Only low-risk, reversible, pre-approved actions may run automatically. Actions involving production, public publishing, credentials, personal data, financial effects, deletion, access changes, or external communications require explicit approval.

## Feedback and learning

Users may accept, reject, edit, defer, or report a suggestion. The system should record the outcome, reason, quality result, and follow-up without treating rejection as a failure automatically. Approved feedback may improve future ranking and training datasets after privacy and security checks.

## Transparency record

For every executed recommendation, retain the triggering evidence, proposed action, approval state, affected resources, result, verification evidence, and any follow-up work.
