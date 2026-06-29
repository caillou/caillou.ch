import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Manual icon generator. Not in the build path: run `pnpm run icons` by hand
// after the portrait changes, then commit the two PNGs. The build only imports
// them (BaseLayout.astro), so a missing file fails the build, which is the
// guard that keeps these in sync.

// Resolve everything off the script location, not the cwd, so it works no
// matter where node is invoked from.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "src/assets/portrait.jpg");
const OUT = resolve(root, "src/icons");

// sharp's `attention` strategy crops toward the region of highest saliency
// (skin tones included), so on this portrait it lands on the face instead of
// the shirt or the backdrop.
const smartCrop = { fit: "cover", position: sharp.strategy.attention };

async function generate() {
  // One attention pass at the larger size so both icons share the exact same
  // face crop. Resizing this buffer keeps the framing identical; a second
  // attention pass would recompute the crop and drift off-center.
  const square = await sharp(SRC).resize(180, 180, smartCrop).png().toBuffer();

  // apple-touch: the square crop, opaque. iOS rounds the corners itself, and
  // any transparency would composite to black. The JPEG source has no alpha, so
  // a plain PNG is opaque.
  await sharp(square).png().toFile(resolve(OUT, "apple-touch.png"));

  // favicon: the same crop, downscaled and masked to a circle by compositing a
  // filled-circle SVG with `dest-in` (keep destination pixels only where the
  // source has alpha), so the corners drop out to transparent.
  const size = 48;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
  await sharp(square)
    .resize(size, size)
    .composite([{ input: mask, blend: "dest-in" }])
    .png() // alpha-preserving, so the masked corners stay transparent
    .toFile(resolve(OUT, "favicon.png"));
}

await mkdir(OUT, { recursive: true });
await generate();
console.log(`wrote favicon.png + apple-touch.png to ${OUT}`);
