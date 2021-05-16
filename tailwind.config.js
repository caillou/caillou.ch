const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      normal: 200,
      bold: 400,
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

      // blue: {
      //   light: '#85d7ff',
      //   DEFAULT: '#1fb6ff',
      //   dark: '#009eeb',
      // },
      // pink: {
      //   light: '#ff7ce5',
      //   DEFAULT: '#ff49db',
      //   dark: '#ff16d1',
      // },
      // gray: {
      //   darkest: '#1f2d3d',
      //   dark: '#3c4858',
      //   DEFAULT: '#c0ccda',
      //   light: '#e0e6ed',
      //   lightest: '#f9fafc',
      // }
    },
    extend: {
      zIndex: {
        '-1': '-1',
      },
      screens: {
        print: { raw: 'print' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
