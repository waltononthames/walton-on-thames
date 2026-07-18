import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { lastmodFor } from './scripts/sitemap-lastmod.mjs';

export default defineConfig({
  site: 'https://walton-on-thames.org',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contact/thank-you'),
      serialize(item) {
        item.lastmod = lastmodFor(item.url);
        return item;
      },
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
