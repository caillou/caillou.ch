const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      normal: 200,
      bold: 400,
      extrabold: 700,
    },
    fontFamily: {
      mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    colors: {
      background: {
        DEFAULT: '#000000',
      },
      foreground: {
        DEFAULT: '#eaeaea',
      },
      comment: {
        DEFAULT: '#969896',
      },
      red: {
        DEFAULT: '#d54e53',
      },
      orange: {
        DEFAULT: '#e78c45',
      },
      yellow: {
        DEFAULT: '#e7c547',
      },
      green: {
        DEFAULT: '#b9ca4a',
      },
      aqua: {
        DEFAULT: '#70c0b1',
      },
      blue: {
        DEFAULT: '#7aa6da',
      },
      purple: {
        DEFAULT: '#c397d8',
      },
    },
    extend: {
      zIndex: {
        '-1': '-1',
      },
      screens: {
        print: { raw: 'print' },
        hdpi: {
          raw: '(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
