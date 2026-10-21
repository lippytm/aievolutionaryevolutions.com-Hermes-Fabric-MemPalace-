# Portal, Attachment, Extension, and Quick-Link Rules

The ecosystem may contain many websites, webpages, applications, extensions, attachments, and quick links. These must remain discoverable and maintainable.

## Routing rules

- Use stable canonical IDs for pages, portals, resources, and actions.
- Keep presentation names separate from canonical IDs.
- Validate every quick link before publishing it.
- Record the destination type, required permission, owner, version, and review date.
- Provide a safe fallback when a destination is unavailable.
- Never expose private resources through public links.

## Attachment rules

Attachments require type, size, owner, version, accessibility description, malware checks, retention policy, and related content metadata. They must never be treated as executable instructions without explicit review.

## Extension rules

Extensions and integrations must declare permissions, external services, data collected, storage location, failure behavior, and uninstall or revocation steps. Production extensions require security and privacy review.

## Quick-link categories

- Learn
- Build
- Practice
- Explore
- Connect
- Automate
- Review
- Secure
- Publish
- Manage

Every quick link must lead to a clear user outcome and be covered by the release gate.
