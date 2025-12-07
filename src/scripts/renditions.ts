import { join } from 'path';
import { writeFile } from 'fs-extra';
import sharp from 'sharp';
import { renditions } from '../images/renditions/renditions';

const imagesDirectory = join(__dirname, '../public');

(async function () {
  // render all images needed by the picture
  await Promise.all(
    Object.entries(renditions).map(async ([fileName, configs]) => {
      return Promise.all(
        configs.map(async (config) => {
          return Promise.all(
            config.sizes.map(async (size) => {
              const buffer = await sharp(join(imagesDirectory, fileName))
                .resize(size, Math.round(size / config.aspectRatio), {
                  withoutEnlargement: true,
                })
                .toFormat('jpeg', { optimiseScans: true })
                .toBuffer();
              await writeFile(
                join(
                  imagesDirectory,
                  'renditions',
                  `${fileName}-${size}@${config.aspectRatio}.jpeg`,
                ),
                buffer,
              );
            }),
          );
        }),
      );
    }),
  );
})();
