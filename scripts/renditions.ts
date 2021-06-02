import { join } from 'path';
import { writeFile } from 'fs-extra';
import sharp from 'sharp';
import { renditions } from '../public/renditions/renditions';

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
                  `${fileName}-${size}@${config.aspectRatio}.jpeg`
                ),
                buffer
              );
            })
          );
        })
      );
    })
  );
  // create a ts file that gives us base64 encoded images
  await Promise.all(
    Object.entries(renditions).map(async ([fileName, configs]) => {
      const dataUrls = await Promise.all(
        configs.map(async (config) => {
          const size = 10;
          return sharp(join(imagesDirectory, fileName))
            .resize(size, Math.round(size / config.aspectRatio), {
              withoutEnlargement: true,
            })
            .toFormat('jpeg')
            .toBuffer()
            .then((buffer) => ({
              aspectRatio: config.aspectRatio,
              dataUrl: `data:image/jpeg;base64,${buffer.toString('base64')}`,
            }));
        })
      );

      const fileContent = `export const dataUrls = ${JSON.stringify(
        dataUrls,
        null,
        2
      )};`;
      await writeFile(
        join(imagesDirectory, 'renditions', `${fileName}-data-urls.ts`),
        fileContent
      );
    })
  );
})();
