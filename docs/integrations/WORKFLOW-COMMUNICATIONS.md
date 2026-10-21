# Multi-Provider Workflow Communications

This specification defines how the platform receives, routes, merges, verifies, and communicates work across ChatGPT, ChatGPT Business, Claude, Claude Cowork, Gemini AI, and Perplexity.

## Communication lifecycle

`receive -> identify -> normalize -> classify -> authorize -> route -> execute -> compare -> synthesize -> verify -> communicate -> audit`

## Incoming-message actions

- Receive a provider response or workspace message.
- Assign a request ID and conversation context.
- Identify provider, workspace, project, task, and message type.
- Normalize messages, files, tool results, citations, and structured data.
- Classify facts, assumptions, recommendations, questions, conflicts, and actions.
- Detect missing context, duplicated work, unsafe instructions, and prompt-injection indicators.
- Apply project permissions, data-classification rules, and provider policies.
- Route the message to a single provider, parallel providers, or a Jarvis review swarm.

## Provider communication roles

- **ChatGPT:** general reasoning, application planning, code, structured tasks, and approved tool workflows.
- **ChatGPT Business:** authorized workspace and business-context workflows with workspace boundaries preserved.
- **Claude:** long-context review, reasoning, writing, code review, and tool workflows.
- **Claude Cowork:** authorized workspace-agent tasks, files, connectors, and multi-step work where available.
- **Gemini AI:** multimodal, structured, tool, and interactive workflows through the approved connector.
- **Perplexity:** research and retrieval workflows with source, date, and freshness metadata.

These roles are routing preferences, not guarantees. The system must select providers based on the task, authorization, evidence, quality, safety, latency, and cost policy.

## Merge actions

- Merge compatible findings.
- Preserve provider provenance.
- Label agreement and disagreement.
- Separate verified facts from assumptions.
- Rank recommendations by evidence and risk.
- Request an independent review when providers disagree on a high-impact issue.
- Ask a provider for clarification when an output is incomplete.
- Create a consensus summary without hiding minority findings.
- Convert verified conclusions into implementation tasks.
- Create quick actions, tests, documentation, and follow-up questions from the merged result.

## Communication-output actions

- Send a concise answer with provider contributions summarized.
- Produce a detailed technical report.
- Produce an educational explanation.
- Produce an implementation plan.
- Produce a QA and security checklist.
- Produce a decision record.
- Produce a conflict report.
- Produce an action queue.
- Produce a transparency record.
- Produce a follow-up request for missing inputs.

## Safety and privacy

- Never include secrets, private keys, seed phrases, passwords, or unnecessary personal data.
- Keep workspace, project, and tenant context separate.
- Do not silently forward one provider's private context to another.
- Require authorization before sending files, prompts, or tool results between providers.
- Preserve citations, source metadata, and uncertainty.
- Require approval for external messages, production changes, financial activity, credentials, and public publishing.

## Failure handling

If a provider is unavailable, the system records the failure, applies the approved fallback policy, and labels the result as incomplete or provider-substituted. It must not claim that a provider confirmed something when that provider did not respond.
