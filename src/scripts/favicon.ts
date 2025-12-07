import sharp from 'sharp';
import { join } from 'path';

const imagesDirectory = join(__dirname, '../images');
const destinationDirectory = join(__dirname, '../app');

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

  await Promise.all(
    Object.entries({
      'apple-icon.png': 180,
      'favicon.ico': 48,
      'icon1.png': 16,
      'icon2.png': 32,
    }).map(async ([fileName, size]) => {
      await sharp(roundImage)
        .resize(size, size)
        .toFile(join(destinationDirectory, fileName));
    }),
  );
})();
