# Jarvis API Connections

A private, local API key manager connected to the existing Hermes/Fabric/MemPalace registry. Requires Node.js 22 or newer; no package installation is needed.

## Open

On Windows, double-click **Start Jarvis.cmd**. It starts a hidden local server and opens an authorized browser window. To reopen, double-click it again. The service listens only on `127.0.0.1` at an automatically chosen port. A restart generates a new browser access token.

The approved `OPENAI_API_KEY` is read from `../../.env.local` when present, or from the exact file specified by `JARVIS_ENV_FILE`. Its value is never sent to the browser or copied into the vault. It is transmitted only to `https://api.openai.com/v1/models` when you press **Check connection**. This checks authenticated read access, not paid generation, model availability for a particular task, billing, or quota.

## Manage keys

1. Open **Add or replace a key**.
2. Choose a vault passphrase of at least 14 characters. The first unlock sets it. There is no password recovery: keep it in your password manager.
3. Add a provider, descriptive connection name, scope and optional expiry; enter the key directly in this local manager.
4. Use **Check connection** for OpenAI or GitHub. Other providers can be stored but have no automatic check yet.
5. **Replace key** stores an updated credential locally. **Disable locally** blocks this manager's use of that entry. Neither action revokes a key at its provider. Revoke old keys in the provider dashboard.

Additional keys use AES-256-GCM encryption with a random 96-bit nonce, authenticated context and a passphrase-derived 256-bit key (scrypt N=32768, r=8, p=1, random 256-bit salt). The passphrase is never persisted. The derived key stays in the server process only while unlocked; it is cleared on lock and after 15 idle minutes. JavaScript memory cannot guarantee forensic erasure of every transient string. Connection names, fingerprints, scopes and local audit metadata are not encrypted. The approved external env-file key remains governed by that file's protections and is not covered by the vault lock.

The vault and local session file are in `../../work/jarvis-private/`, unless `JARVIS_DATA_DIR` specifies another directory. Keep this runtime folder outside the source repository and exclude it from every Git commit and deployment archive. Keep this directory private; possession of `session.json` permits local manager access. Back up `vault.json` securely along with your separately stored passphrase; a vault backup does not include the approved env-file key. Do not upload `.private/` or `.env.local` to Hostinger or GitHub.

## Agent and workspace synchronization

The existing GitHub registry is preserved: 22 platform profiles and 7 personal profiles, all marked **profile only**. They are not hosted agents, running swarms or a queue worker. No inference, deployment, GitHub write, or ChatGPT history read occurs in this manager.

**Download synchronization bundle** creates:

- Platform connection metadata without ciphertext, fingerprints, filesystem paths, passphrases or keys.
- The 22 platform profiles; personal profiles and personal-vault connections are excluded.
- Three v0.1.0 handoff packets for `github`, `chatgpt_business` and `codex`, with one bundle ID and exact SHA-256 hashes of the included artifacts. All remain `not_sent` and approval `pending`.

Import only into the intended workspace/project, return exact file hashes using the existing provider receipt template, and reconcile with `src/reconcile-receipt.mjs`. The JSON download contains embedded artifact text; extract the `artifacts` entries to their listed filenames before giving a destination the files. It is an evidence handoff, not an automatic workspace connection. Existing sync generation also now includes ChatGPT Business and Codex destinations.

Source registry: `lippytm/aievolutionaryevolutions.com-Hermes-Fabric-MemPalace-` at `30b5c645e7610616bd4679f3f562a5709c707621`. Related Jarvis code remains in `lippytm/jarvis-nexus-core`.

## Validation and limits

Run `npm test` here, and `npm test` from the parent sync-control-plane directory. Tests use synthetic keys and mocked provider reads. A successful live connection check is recorded separately with its timestamp and HTTP status.

This local service does not provide multi-user authentication, cloud secret distribution, provider-side key issuance/revocation, budget enforcement, usage billing, unattended synchronization or live agent execution. There is no arbitrary API URL field; connection checks are pinned to OpenAI and GitHub and refuse redirects. Do not expose the service through a public proxy. KVM 8 migration and website repair remain separate deployment work.

API reference: https://developers.openai.com/api/reference/resources/models/methods/list
