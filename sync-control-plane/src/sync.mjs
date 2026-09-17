import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const argv = process.argv.slice(2);
const configFlag = argv.indexOf('--config');
const configPath = path.resolve(configFlag >= 0 ? argv[configFlag + 1] : 'sync.config.json');
const root = path.dirname(configPath);
const config = JSON.parse(await readFile(configPath, 'utf8'));

if (config.live_delivery !== false || process.env.SYNC_LIVE_MODE === 'true') {
  throw new Error('Live delivery is disabled in v0.1. Generate and review handoff bundles instead.');
}

const sourceRoot = path.resolve(root, config.source_directory);
const outputRoot = path.resolve(root, config.output_directory);
const prohibited = config.prohibited_patterns.map((value) => value.toLowerCase());

async function walk(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = path.posix.join(prefix, entry.name);
    const lowered = relative.toLowerCase();
    if (prohibited.some((needle) => lowered.includes(needle))) {
      throw new Error(`Blocked prohibited path: ${relative}`);
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute, relative));
    if (entry.isFile()) {
      const bytes = await readFile(absolute);
      files.push({
        path: relative,
        bytes: bytes.length,
        sha256: createHash('sha256').update(bytes).digest('hex')
      });
    }
  }
  return files;
}

const sourceStats = await stat(sourceRoot);
if (!sourceStats.isDirectory()) throw new Error('Approved source directory is missing.');
const files = await walk(sourceRoot);
if (files.length === 0) throw new Error('Approved source directory contains no files.');

const createdAt = new Date().toISOString();
const bundleId = `${config.project_id}-${createdAt.replace(/[-:.TZ]/g, '').slice(0, 14)}-${randomUUID().slice(0, 8)}`;
await mkdir(outputRoot, { recursive: true });

const destinationInstructions = {
  github: 'Review on a branch. Require tests and human approval before merge. GitHub is the canonical technical evidence record.',
  hostinger: 'Use manual mode on a duplicated Hostinger AI Builder site. Add one page or section at a time. Review mobile layout and disclosures before publishing.',
  gemini: 'Import this packet as independent context. Preserve project IDs, cite source paths, record disagreements, and return an acknowledgement plus proposed changes.',
  claude: 'Import this packet as independent context. Audit clarity, risks, contradictions, and implementation choices. Return an acknowledgement plus evidence-linked recommendations.'
};

for (const destination of Object.keys(config.destinations)) {
  const dir = path.join(outputRoot, destination);
  await mkdir(dir, { recursive: true });
  const packet = {
    schema_version: '0.1.0', bundle_id: bundleId, created_at: createdAt,
    project: config.project_name, sender: config.human_owner, destination,
    classification: config.classification, files,
    approval: { required: true, approver: config.required_approval, status: 'pending' },
    receipt_status: 'not_sent'
  };
  await writeFile(path.join(dir, 'handoff-packet.json'), JSON.stringify(packet, null, 2) + '\n');
  const lines = [
    `# ${config.project_name} — ${destination.toUpperCase()} Handoff`, '',
    `Bundle: \`${bundleId}\``, '',
    destinationInstructions[destination], '',
    '## Required response', '',
    '1. Acknowledge the bundle ID and every file hash.',
    '2. Separate verified facts, assumptions, proposals, simulations and fiction.',
    '3. Identify conflicts, missing evidence, security/privacy concerns and estimated costs.',
    '4. Do not publish, spend, deploy or modify production without Charles Earl Lipshay’s approval.',
    '5. Return changed artifacts with new hashes and links to superseded versions.', '',
    '## Included evidence', '',
    ...files.map((file) => `- \`${file.path}\` — ${file.bytes} bytes — \`${file.sha256}\``), ''
  ];
  await writeFile(path.join(dir, 'HANDOFF.md'), lines.join('\n'));
}

const receiptLedger = {
  schema_version: '0.1.0', bundle_id: bundleId, created_at: createdAt,
  status: 'awaiting_human_approval',
  destinations: Object.keys(config.destinations).map((destination) => ({ destination, status: 'not_sent', acknowledgement: null }))
};
await writeFile(path.join(outputRoot, 'receipt-ledger.json'), JSON.stringify(receiptLedger, null, 2) + '\n');
console.log(JSON.stringify({ ok: true, bundle_id: bundleId, files: files.length, destinations: Object.keys(config.destinations) }));
