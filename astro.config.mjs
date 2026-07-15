// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const githubPages = process.env.GITHUB_PAGES === 'true';
const site = process.env.SITE_URL ?? (githubPages ? 'https://schr-0dinger.github.io' : 'https://akamarchitects.com');
const base = process.env.BASE_PATH ?? (githubPages ? '/AkamArchitects' : '/');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [react(), mdx(), sitemap()],

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Sharp's default AVIF encoder effort (4) is tuned for speed, not size,
        // and can produce larger files than WebP at the same `quality`. Raising
        // it makes AVIF actually deliver on its compression advantage — this
        // only costs extra time at build, never at runtime.
        avif: { effort: 9 },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
