/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  printWidth: 100,
  semi: true,
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};
