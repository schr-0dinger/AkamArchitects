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
        // and can produce larger files than WebP at the same `quality`. Effort 6
        // gets nearly all of the size benefit of 9 (within ~1.5% on test images)
        // at roughly a third of the encode time — effort 9 pushed a 347-image
        // build past Netlify's time limit.
        avif: { effort: 6 },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
