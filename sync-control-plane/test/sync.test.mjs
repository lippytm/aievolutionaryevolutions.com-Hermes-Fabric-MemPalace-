import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const dir = await mkdtemp(path.join(tmpdir(), 'aiee-sync-'));
await mkdir(path.join(dir, 'approved-source'));
await writeFile(path.join(dir, 'approved-source', 'sample.md'), '# Approved sample\n');
const config = {
  schema_version: '0.1.0', project_id: 'TEST', project_name: 'Test',
  human_owner: 'Charles Earl Lipshay', operating_entity: 'Intergalactic Corporate Services LLC',
  canonical_domain: 'aievolutionaryevolutions.com', source_directory: 'approved-source', output_directory: 'out',
  classification: 'internal', live_delivery: false,
  destinations: { github: {}, hostinger: {}, gemini: {}, claude: {} },
  required_approval: 'Charles Earl Lipshay',
  prohibited_patterns: ['.env', 'secret', 'credential', 'password', 'private-key', 'seed-phrase', 'payment-card']
};
await writeFile(path.join(dir, 'sync.config.json'), JSON.stringify(config));
const script = path.resolve('src/sync.mjs');
const run = spawnSync(process.execPath, [script, '--config', path.join(dir, 'sync.config.json')], { encoding: 'utf8' });
if (run.status !== 0) throw new Error(run.stderr || run.stdout);
for (const destination of Object.keys(config.destinations)) {
  const packet = JSON.parse(await readFile(path.join(dir, 'out', destination, 'handoff-packet.json'), 'utf8'));
  if (packet.destination !== destination || packet.files.length !== 1 || packet.approval.status !== 'pending') throw new Error(`Invalid ${destination} packet`);
}
const ledger = JSON.parse(await readFile(path.join(dir, 'out', 'receipt-ledger.json'), 'utf8'));
if (ledger.destinations.length !== 4 || ledger.status !== 'awaiting_human_approval') throw new Error('Invalid receipt ledger');
console.log('sync test passed');
