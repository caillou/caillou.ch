// @ts-check

import mdx from "@astrojs/mdx";
import {
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerRemoveLineBreak,
} from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://caillou.ch",
  devToolbar: { enabled: false },

  markdown: {
    shikiConfig: {
      theme: "css-variables",
      transformers: [
        transformerNotationFocus(),
        transformerNotationHighlight(),
        transformerRemoveLineBreak(),
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});
