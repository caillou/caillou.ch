import sharp from 'sharp';
import { join } from 'path';

const imagesDirectory = join(__dirname, '../images');

(async function () {
  const image = await sharp(join(imagesDirectory, 'avatar.jpg'));

  const { width } = await image.metadata();
  const radius = (width as number) / 2;

  const circle = Buffer.from(
    `<svg><circle cx="${radius}" cy="${radius}" r="${radius}"/></svg>`,
  );

  const roundImage = await image
    .composite([{ input: circle, blend: 'dest-in' }])
    .toFormat('png')
    .toBuffer();
  await sharp(roundImage)
    .resize(48, 48)
    .toFile(join(imagesDirectory, 'favicon.ico'));
})();
