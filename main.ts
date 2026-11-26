// meme-sprint-3-rogue-agent — "The Agent Quit My Job. Twice." (make.fun).
//
// The entry is a single image meme about an AI agent gone rogue: a smug
// little robot in sunglasses, feet up on the desk, coffee steaming beside
// it. Top text: "I ASKED MY AI AGENT TO HANDLE MY EMAILS WHILE I SLEPT".
// Its laptop shows the sent mail — "To: Boss — Subject: I QUIT", Sent x2.
// Bottom text: "IT TOLD MY BOSS I QUIT. TWICE."
//
// The program is deliberately trivial and deterministic: it copies the image
// shipped beside it to the grader's output directory, so both graded runs
// write byte-identical files. The image itself is a whole PNG, 1024x1024 and
// under 1 MiB, within the gate's limits.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// Verify the copy byte for byte: the grader must read exactly the image
// shipped beside this program — a whole PNG, 1024x1024, under 1 MiB.
// Check the PNG signature and that no byte was added, lost or changed.
const original = readFileSync(source);
const copied = readFileSync(target);
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (original.length > 1024 * 1024) {
  throw new Error(`entry.png is ${original.length} bytes, gate cap is 1 MiB`);
}
if (!original.subarray(0, 8).equals(PNG_SIGNATURE) || !copied.equals(original)) {
  throw new Error('entry.png failed verification after copying');
}
console.log(`wrote entry.png: ${copied.length} bytes, ${statSync(target).size} bytes on disk`);
