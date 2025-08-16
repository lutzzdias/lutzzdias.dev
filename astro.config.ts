import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./src/plugins/reading-time";

export default defineConfig({
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
