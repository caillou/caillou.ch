import sharp from "sharp";

// How much of the image to sample for the tint. The top band is meant to land
// behind the iOS status bar and the bottom band behind the toolbar; both are
// averaged into one color. Tweak these to sample more/less of each edge.
const BAND = 0.1; // fraction of the height taken from the top and the bottom
const CENTER = 0.5; // fraction of the width, centered (what object-cover shows)

// sRGB <-> linear-light transfer (the exact piecewise curve, not a 2.2 power
// law). Averaging has to happen in linear light, otherwise mixed pixels skew
// dark and muddy. This matters most in the shadows, which is exactly our case.
const srgbToLinear = (v: number): number => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const linearToSrgb = (v: number): number => {
  const c = v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;
  return Math.round(Math.min(255, Math.max(0, c * 255)));
};
const toHex = (n: number): string => n.toString(16).padStart(2, "0");

/**
 * Derive a single background color from an image's top and bottom edges.
 *
 * iOS Safari paints its status bar / toolbar in a solid color sampled from the
 * page's `background-color`. Setting that to the photo's edge color makes the
 * bars blend into the photo instead of going white. Run at build time.
 *
 * @param imagePath filesystem path to the source image (not an emitted asset URL)
 * @returns a `#rrggbb` string
 */
export async function edgeTint(
  imagePath: string,
  { band = BAND, center = CENTER }: { band?: number; center?: number } = {},
): Promise<string> {
  const { width = 0, height = 0 } = await sharp(imagePath).metadata();

  const sampleW = Math.max(1, Math.round(width * center));
  const left = Math.round((width - sampleW) / 2);
  const bandH = Math.max(1, Math.round(height * band));
  const regions = [
    { left, top: 0, width: sampleW, height: bandH }, // top edge
    { left, top: height - bandH, width: sampleW, height: bandH }, // bottom edge
  ];

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (const region of regions) {
    const { data, info } = await sharp(imagePath)
      .extract(region)
      .removeAlpha() // drop alpha so the loop's 3-channel stride holds
      .toColourspace("srgb") // normalize grayscale / CMYK / wide-gamut to sRGB
      .raw()
      .toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += info.channels) {
      r += srgbToLinear(data[i]);
      g += srgbToLinear(data[i + 1]);
      b += srgbToLinear(data[i + 2]);
      count += 1;
    }
  }

  const hex =
    toHex(linearToSrgb(r / count)) +
    toHex(linearToSrgb(g / count)) +
    toHex(linearToSrgb(b / count));
  return `#${hex}`;
}
