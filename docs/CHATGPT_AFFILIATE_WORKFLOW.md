# ChatGPT + AI Jarvis affiliate workflow for AI Evolutionary Evolutions

Status: reviewable GitHub draft. The Hostinger live site, affiliate partners, and ChatGPT Business automation are not connected by this repository alone.

## Content and release loop

1. Enter a learning topic and proposed partner in an AI Jarvis work envelope. Keep private customer data and credentials out of the public catalog.
2. ChatGPT assists with educational copy and source checking. ChatGPT Business receives a reviewable handoff with the page digest, offer IDs, evidence, uncertainties, and approval state.
3. Hermes routes a bounded draft for independent QA. MemPalace records hashes and decision metadata, not raw private prompts or affiliate-account credentials.
4. Verify the partner's terms, referral URL, product claims, destination, compensation, and suitability. Change the catalog offer from `draft` to `approved` only after review.
5. Generate `site/affiliate-hub.html` and `site/handoff.json` with `python -m affiliate.workflow affiliate/catalog.json site`. Automated tests reject draft links and unsafe URLs. The page places a plain-language commission disclosure next to each approved offer.
6. Preview the generated page and links, then obtain owner approval before publishing through the actual Hostinger builder mode. Confirm the live site after publishing. No step here automatically deploys to Hostinger.
7. Compare aggregate site analytics with partner-reported referrals and commissions. Do not infer sales from clicks alone or promise earnings.

## ChatGPT Business connection choices

**Manual workspace handoff:** Import the `site/handoff.json` information into a ChatGPT Business review and record the decision in the project. This is available without a custom API, but the transfer is manual.

**Published Workspace Agent trigger (conditional):** If the workspace has Workspace Agents enabled, an admin allows access tokens, and an affiliate-review agent is published with an API trigger ID, an approved server-side service may submit a bounded brief to `POST https://api.chatgpt.com/v1/workspace_agents/{id}/trigger` with a Workspace Agent scoped access token. The API returns a conversation link and optional run status, **not the agent's response text**. It therefore cannot feed content directly into the site without a separate reviewed export or approved integration. No token or trigger ID is configured in this repository.

**Interactive site assistant (separate project):** If an on-site ChatGPT-powered tutor is desired, build a server-side application with a separately provisioned OpenAI Platform API key, usage limits, content safeguards, and a privacy notice. ChatGPT Business membership alone is not the key for a general model endpoint. Do not expose the API key in browser JavaScript or the Hostinger page source. This is not activated here.

## Current partner ledger

The catalog contains only three draft learning categories and **zero approved affiliate links**. It does not assert participation in Hostinger, funding, or other partner programs. Add each real partner only after reviewing its terms and the actual referral URL. The generated HTML is source for review or import; the Hostinger AI Builder may require manual assembly in its editor.

Official references: https://learn.chatgpt.com/workspace-agents/trigger-runs ; https://learn.chatgpt.com/workspace-agents/authentication ; https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking
