import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
