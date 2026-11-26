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

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
