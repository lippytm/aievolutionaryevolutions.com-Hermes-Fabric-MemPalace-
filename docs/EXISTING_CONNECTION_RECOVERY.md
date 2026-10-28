# Existing website and Jarvis deployment recovery

Owner: the existing VPS/runtime operator. Risk: high for deployment or credentials.

This repository's inspected default branch contains project documentation and
deployment templates, not a Node application: there is no root `package.json`,
lockfile, or `server.js`. The previous master installer assumed those files and
could not complete. Repeating it is not a connection repair.

`scripts/jarvis-master-install.sh` now runs a read-only source preflight against
an explicitly supplied complete Jarvis checkout and makes no service, proxy,
firewall, package, DNS, credential, or data changes.

```bash
bash scripts/jarvis-master-install.sh /absolute/path/to/full-jarvis-checkout
```

## Actual existing implementation

Use
`lippytm/AI-Jarvis-Assistant-ChatGPT-Gemini-AI-GitHub-Claude-and-all-of-my-Repositories-DOG-Dog-dog-`
for the established implementation. Keep its entire checkout: the Node service
under `runtime/` also needs `config/prompt-11-profile.json`.
Follow its `runtime/README.md`, run its checks/tests, and start only a private
loopback dry-run after confirming the existing service and port.
The documented default is port 8787, not an assumed `server.js` on port 3001.
Do not expose that advisory pilot as a public autonomous worker.

Use that project's existing Hostinger read-only adapter and verified bundle
handoff procedures rather than inventing another account client or hidden shared
memory connection. Live provider and Hostinger calls require separate owner opt-in.

## Deployment template boundary

The old `github-workflows/deploy.yml` was not active in GitHub Actions because it
was outside `.github/workflows/`. It nevertheless contained failed-test bypass,
force-reset, and app-path assumptions. It is now a disabled explanatory stub.
Do not activate it by moving it to `.github/workflows/`.
A real deployment requires the actual deployable source, passing checks, backup,
approved target, non-destructive update, health verification, and rollback.

## Recovery checks and fallback

- [ ] Identify the currently serving revision, runtime owner, port, and service.
- [ ] Preserve existing website, private environment, data, and proxy/DNS records.
- [ ] Check domain resolution and TLS independently of source or audit health.
- [ ] Verify documented authenticated dry-run and each approved provider separately.
- [ ] Validate an existing Jarvis bundle at the receiving station.
- [ ] Record only redacted result metadata; no tokens or account inventories in Git.

Past integrations are not invalidated by a source-template defect. These changes
stop unsafe repeated installation; they do not prove a live account reconnection.
Rollback: stop only a newly started pilot and restore reviewed source if required,
leaving prior services/data intact. Manual fallback is existing website agents and
verified handoffs. Escalate account/DNS/VPS failures to Hostinger support.
