import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Manual waveform generator for Waveform.astro. Not in the build path: run
// `pnpm run peaks public/files/<sound>.m4a` by hand when a sound is added,
// then commit the JSON under src/assets/audio. The post imports it, so a
// missing file fails the build, which is the guard that keeps these in sync.
//
// Needs ffmpeg on PATH. It decodes anything ffmpeg can read, so the same
// command works for an m4a, an mp3 or a flac.

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "src/assets/audio");

// The peaks only need the loudness envelope, so decode mono at a low rate:
// 30 s comes out at about 480 KB of pcm instead of 5 MB.
const RATE = 8000;
// One peak per bar. The bars share a strip with the play button and the
// readout, so on a phone they get about 220 px: 150 bars keep each one a
// pixel or two wide instead of a smear, and the json stays under 1 KB.
const DEFAULT_BARS = 150;

const [input, barsArg] = process.argv.slice(2);
if (!input) {
  console.error("usage: node scripts/generate-peaks.mjs <audio file> [bars]");
  process.exit(2);
}
const bars = barsArg === undefined ? DEFAULT_BARS : Number(barsArg);
if (!Number.isInteger(bars) || bars < 1) {
  console.error(`bars must be a positive integer, got ${barsArg}`);
  process.exit(2);
}

const ffmpeg = spawnSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-i",
    resolve(input),
    "-f",
    "s16le",
    "-ac",
    "1",
    "-ar",
    String(RATE),
    "-",
  ],
  { maxBuffer: 256 * 1024 * 1024 },
);
if (ffmpeg.error) {
  console.error(`could not run ffmpeg: ${ffmpeg.error.message}`);
  process.exit(1);
}
if (ffmpeg.status !== 0) {
  process.stderr.write(ffmpeg.stderr);
  process.exit(1);
}

// Copy into a fresh buffer: a Buffer may sit at an odd offset inside node's
// pool, and Int16Array needs a 2-byte aligned view.
const pcm = new Int16Array(new Uint8Array(ffmpeg.stdout).buffer);
// Length of the decoded audio, not the container's duration: ffprobe adds
// the aac priming samples and reports 29.56 s for a clip that plays 29.5.
// The player only shows this until the browser reports the real duration.
const duration = pcm.length / RATE;

// Peak absolute sample per bucket, then normalized so the loudest bucket
// is 1 (a silent file stays all zeros). Three decimals are plenty for a
// bar a few pixels tall.
const bucket = pcm.length / bars;
const raw = [];
let loudest = 0;
for (let i = 0; i < bars; i++) {
  const start = Math.floor(i * bucket);
  const end = Math.floor((i + 1) * bucket);
  let peak = 0;
  for (let j = start; j < end; j++) {
    const v = Math.abs(pcm[j]);
    if (v > peak) peak = v;
  }
  raw.push(peak);
  if (peak > loudest) loudest = peak;
}
const peaks = raw.map((p) => Math.round((p / (loudest || 1)) * 1000) / 1000);

await mkdir(OUT, { recursive: true });
const out = resolve(OUT, `${basename(input, extname(input))}.peaks.json`);
await writeFile(
  out,
  `${JSON.stringify({ duration: Math.round(duration * 100) / 100, peaks })}\n`,
);
console.log(`wrote ${out} (${bars} bars, ${duration.toFixed(2)} s)`);
