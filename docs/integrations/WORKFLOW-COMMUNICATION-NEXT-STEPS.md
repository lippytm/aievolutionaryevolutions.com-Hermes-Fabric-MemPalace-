# Workflow Communication Next Steps

## Immediate implementation

1. Load the provider and workflow-communication registries.
2. Implement the normalized message contract.
3. Add provider identification and request correlation IDs.
4. Add authorization checks before forwarding context or files.
5. Implement provider adapters and sandbox connectors.
6. Add message classification for facts, assumptions, actions, and conflicts.
7. Implement single-provider and parallel-provider routing.
8. Implement provenance-preserving merge and synthesis.
9. Add verification against acceptance criteria and evaluation sets.
10. Add structured audit records.

## QA and security validation

1. Test duplicate, delayed, malformed, incomplete, and conflicting responses.
2. Test provider outages and approved fallback behavior.
3. Test prompt injection, malicious attachments, data leakage, and unauthorized forwarding.
4. Test workspace, project, tenant, and permission isolation.
5. Test citation and source preservation.
6. Test cost, timeout, retry, and rate-limit controls.
7. Test external-send approval gates.
8. Test recovery when a merge or provider call fails.

## Dashboard implementation

- Provider connection status
- Conversation and project selector
- Incoming-message queue
- Provider contribution view
- Conflict and uncertainty panel
- Merge preview
- Approval controls
- Generated quick-action list
- QA and security evidence
- Audit history
- Retry and recovery controls

## Production readiness

Production communication workflows require verified provider authorization, secure credential storage, tested adapters, audit logging, output verification, failure handling, privacy review, and explicit approval for external messages or state-changing actions.
