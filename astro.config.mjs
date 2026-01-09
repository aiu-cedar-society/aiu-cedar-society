// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aiu-cedar-society.com',
  integrations: [sitemap()],

  // Internationalization (i18n) configuration
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false, // /about for Japanese, /en/about for English
    },
  },

  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
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
          // Optimize chunk size for better caching
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entry-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    ssr: {
      noExternal: [],
    },
  },
});