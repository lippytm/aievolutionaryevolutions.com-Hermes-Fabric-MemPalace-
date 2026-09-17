import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
function required(flag) {
  const index = args.indexOf(flag);
  if (index < 0 || !args[index + 1]) throw new Error(`Missing ${flag}`);
  return path.resolve(args[index + 1]);
}

const ledgerPath = required('--ledger');
const packetPath = required('--packet');
const receiptPath = required('--receipt');
const [ledger, packet, receipt] = await Promise.all(
  [ledgerPath, packetPath, receiptPath].map(async (file) => JSON.parse(await readFile(file, 'utf8')))
);

if (receipt.bundle_id !== packet.bundle_id || ledger.bundle_id !== packet.bundle_id) {
  throw new Error('Bundle ID mismatch; receipt rejected.');
}
const provider = String(receipt.recipient?.provider || '').toLowerCase();
if (provider !== packet.destination) throw new Error('Receipt provider does not match packet destination.');
if (receipt.status !== 'acknowledged') throw new Error('Receipt is not acknowledged.');
if (receipt.human_approval_required !== true) throw new Error('Receipt must preserve human approval.');

const expected = new Map(packet.files.map((file) => [file.path, file.sha256]));
const received = new Map((receipt.received_file_hashes || []).map((file) => [file.path, file.sha256]));
const missing = [...expected].filter(([file, hash]) => received.get(file) !== hash).map(([file]) => file);
const unexpected = [...received].filter(([file, hash]) => expected.get(file) !== hash).map(([file]) => file);
if (missing.length || unexpected.length) {
  throw new Error(`Hash verification failed; missing_or_changed=${missing.join(',')}; unexpected_or_changed=${unexpected.join(',')}`);
}

const destination = ledger.destinations.find((item) => item.destination === packet.destination);
if (!destination) throw new Error('Destination is absent from ledger.');
destination.status = 'verified_receipt_pending_human_approval';
destination.acknowledgement = {
  verified_at: new Date().toISOString(), provider: receipt.recipient, file_count: expected.size,
  findings: receipt.findings || {}, estimated_cost: receipt.estimated_cost ?? null
};
ledger.status = ledger.destinations.every((item) => item.status === 'verified_receipt_pending_human_approval')
  ? 'all_receipts_verified_pending_human_approval'
  : 'partially_reconciled_pending_human_approval';
await writeFile(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
console.log(JSON.stringify({ ok: true, destination: packet.destination, status: destination.status, files_verified: expected.size }));
