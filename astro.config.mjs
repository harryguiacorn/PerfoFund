import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.new/config
export default defineConfig({
  site: "https://perfofund.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  build: {
    format: "preserve",
  },
});
