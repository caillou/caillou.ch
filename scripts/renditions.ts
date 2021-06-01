import { join } from 'path';
import { writeFile } from 'fs-extra';
import sharp from 'sharp';
import { renditions } from '../public/renditions/renditions';

const imagesDirectory = join(__dirname, '../public');

(async function () {
  await Promise.all(
    Object.entries(renditions).map(async ([fileName, configs]) => {
      for (let index = 0; index < configs.length; index++) {
        const config = configs[index];
        if (!config) return;
        for (let index = 0; index < config.sizes.length; index++) {
          const size = config.sizes[index];
          if (!size) return;
          console.log(size, config.aspectRatio);
          const buffer = await sharp(join(imagesDirectory, fileName))
            .resize(size, Math.round(size / config.aspectRatio))
            .toFormat('jpeg')
            .toBuffer();
          await writeFile(
            join(
              imagesDirectory,
              'renditions',
              `${fileName}-${size}@${config.aspectRatio}.jpeg`
            ),
            buffer
          );
        }
      }
    })
  );
})();
