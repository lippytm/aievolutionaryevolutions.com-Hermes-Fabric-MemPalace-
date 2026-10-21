# Multi-Provider AI Inputs and Merged Outputs

The platform accepts one normalized request and routes it to approved AI providers or workspace connectors. It then verifies, compares, and merges results without hiding provenance or uncertainty.

## Normalized input flow

1. Capture the user's intent and desired outcome.
2. Classify the task and data sensitivity.
3. Validate files, attachments, tools, permissions, and budget.
4. Remove unnecessary sensitive information.
5. Select one provider, parallel providers, or a Jarvis review swarm.
6. Execute through the provider adapter.
7. Verify the response against the requested output and safety policy.
8. Compare independent results when selected.
9. Synthesize a labeled answer with provenance.
10. Record audit evidence and follow-up suggestions.

## Provider roles

- **OpenAI API:** application and agent API workloads through the approved developer API contract.
- **ChatGPT Business:** authorized workspace-level workflows where the approved connector exposes them.
- **Gemini AI:** multimodal, tool, structured-output, and live-interaction workflows through its approved API contract.
- **Claude:** reasoning, long-context, vision, and tool workflows through the approved Anthropic API contract.
- **Claude Cowork:** account or workspace agent workflows, files, connectors, and scheduled tasks where authorized.
- **Perplexity:** research and retrieval workflows with source and freshness metadata.

The platform must not treat every product name as interchangeable. API providers, workspace connectors, and agent products have different authentication, data, capability, and permission models.

## Merged response rules

A merged response must identify provider contributions, distinguish verified facts from assumptions, label disagreement, preserve citations or source metadata where available, and disclose when a result is incomplete or not independently verified.

The system must not average incompatible answers into a false consensus. High-impact outputs require independent review and explicit approval.

## AI teaching actions

- Explain provider strengths and limitations.
- Show why a provider or connector was selected.
- Compare outputs using a fixed evaluation set.
- Teach prompt, context, tool, memory, and safety differences.
- Generate a provider-routing lesson.
- Create a failure-analysis report.
- Recommend a safer or lower-cost route without changing production policy automatically.
