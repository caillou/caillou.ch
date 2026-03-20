// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://caillou.ch",
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
