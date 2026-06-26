import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://walton-on-thames.org',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contact/thank-you'),
    }),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
  image: {
    remotePatterns: [],
  },
});
