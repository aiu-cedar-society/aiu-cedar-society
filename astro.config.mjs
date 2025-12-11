// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://momo1105.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    // Use tap-based prefetching - starts on touch/mousedown for fastest response
    prefetchAll: false,
    defaultStrategy: 'tap',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: ['images.microcms-assets.io'],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.microcms-assets.io',
    }],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Allow CSS code splitting for smaller initial bundles
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    ssr: {
      noExternal: [],
    },
  },
});