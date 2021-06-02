const sizes = [300, 600, 800, 1200, 1600, 2000, 2400, 3000, 4000, 5000];

export const renditions = {
  'pierre-hq.jpg': [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2, 2.5].map(
    (aspectRatio) => ({ aspectRatio, sizes })
  ),
};
