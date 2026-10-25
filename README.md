# aievolutionaryevolutions.com-Hermes-Fabric-MemPalace-
Teaching People and AI Systems to become better programmers &amp; blockchain developers &amp; Linux Developers 

## AI Building AI — AI Jarvis Assistants Swarms Systems

The vision is a human-directed network of AI assistants that researches, designs,
builds, reviews, and improves AI-powered workflows for aievolutionaryevolutions.com.
Hermes Fabric MemPalace is the intended shared knowledge layer for approved
instructions, decisions, and reusable workflow knowledge.

**Current status:** This repository contains a VPS installer and a deployment
workflow template, not a working swarm application or connected platform
integrations. The installer references application files such as `server.js` and
a Node.js package manifest that are not present. The workflows below describe
the intended system; they are not activated by cloning or running this repository.

### Assistant swarm roles

- **Jarvis coordinator:** turns a human request into scoped tasks and tracks handoffs.
- **Research assistants:** gather sources, compare options, and flag uncertainty.
- **Builder assistants:** propose code, automations, and supporting documentation.
- **Reviewer assistants:** check correctness, security, source quality, and permissions.
- **Communications assistants:** prepare status updates and channel-specific drafts.
- **Human owner:** approves access, spending, deployments, and public publication.

### Platforms and workflow connections

These are proposed connection paths, subject to each provider's current APIs,
account permissions, connector availability, and terms.

| Platform | Intended role | Connection or handoff |
| --- | --- | --- |
| Hostinger.com | Host the website and Jarvis services on a suitable VPS | Approved GitHub releases deployed to the VPS; monitor service health |
| GitHub | Track tasks, version code, review changes, and run delivery checks | Issues → branches → pull requests → required checks → approved deployment |
| ChatGPT | Interactive planning, drafting, and coding assistance | Human-operated sessions; use a separately configured OpenAI API integration for automation |
| ChatGPT Business | Team collaboration with workspace controls | Approved team workflows; workspace access does not itself supply API access or billing |
| Gemini AI | Research, multimodal analysis, and alternative reviews | Authorized Gemini API integration or manual sessions |
| Claude | Architecture, coding, and independent review | Authorized Anthropic API integration or manual sessions |
| Claude coworker | Human-supervised collaborative task work | Manual handoffs through available Claude collaboration features; no assumed standalone API |
| Perplexity | Source discovery and research synthesis | Manual research or an authorized API integration; retain source links |
| Slack | Operational communication and approval requests | Permission-scoped app or webhook for task updates; authenticated approval actions |
| Zapier | Route events between supported services | Authorized connectors and authenticated webhooks; manual fallback where unsupported |
| Facebook | Share approved community and project updates | Supported publishing tools with required account permissions, or manual publishing |
| Instagram | Share approved visual content | Supported publishing tools with required account permissions, or manual publishing |
| Substack | Publish newsletters and long-form updates | Human-reviewed drafts and manual publishing unless a supported integration is verified |
| YouTube | Publish educational videos and project demonstrations | Approved uploads through supported tools or the YouTube API with channel authorization |

### Communications network

Use a single task record in GitHub as the source of truth. Jarvis coordinates
specialists, Zapier routes supported events, Slack surfaces progress and approval
requests, and MemPalace retains only approved reusable knowledge.

Every handoff should carry a task ID, requesting identity, assigned role, objective,
input references, data classification, status, output references, and approval
state. Link to restricted artifacts rather than copying sensitive content into
chat messages. Treat external content and assistant outputs as untrusted input,
not authority to grant permissions or execute commands.

Suggested task lifecycle:
**Requested → Planned → In progress → In review → Awaiting human approval → Completed**.
Failed tasks stop for investigation; rejected tasks return for revision or are cancelled.

### Example end-to-end workflows

1. **AI building AI:** A GitHub issue defines an assistant capability. Jarvis
   assigns research to Perplexity or Gemini AI, design and implementation to
   ChatGPT or Claude, and review to another assistant. A human reviews the pull
   request, required checks pass, and an authorized deployment updates Hostinger.
   Slack receives status links; approved lessons become shared knowledge.
2. **Research to publication:** A human supplies a topic. Research assistants
   collect cited sources, writing assistants prepare a Substack draft, and
   communications assistants adapt it for Facebook, Instagram, and YouTube.
   The owner approves each destination and final artifact before publication.
   Zapier routes only supported, explicitly authorized publishing steps.
3. **Team collaboration:** A request starts in Slack or a ChatGPT Business
   workspace and becomes a GitHub task. Jarvis delegates bounded work to
   ChatGPT, Gemini AI, Claude, or a human using Claude coworker features.
   Results return as linked artifacts for review rather than unchecked
   assistant-to-assistant execution.

### Requirements before enabling automation

- Implement and test the missing application, task orchestration, storage, and
  provider adapters before using the installer for deployment. The template in
  `github-workflows/deploy.yml` is not an active GitHub Actions workflow.
- Verify API availability, subscription entitlements, quotas, costs, and connector
  support independently for every platform. Consumer or business chat access
  must not be assumed to include API access.
- Use least-privilege service identities, OAuth where supported, and a secret
  manager or protected deployment secrets. Never commit credentials, store them
  in shared memory, or include them in assistant prompts or logs.
- Authenticate incoming events and approvals, verify webhook signatures where
  supported, prevent replay, and deduplicate deliveries using stable event IDs.
- Enforce human approval in the execution layer for production changes, public
  posts, purchases, and permission changes; a chat message alone is not approval.
- Apply bounded retries, rate limits, spending caps, timeouts, and an emergency
  stop. Record auditable task outcomes and approvals without logging secrets.
- Define data retention and deletion rules; share private workspace or customer
  data across providers only with explicit authorization.
