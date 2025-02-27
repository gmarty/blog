import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import solidJs from '@astrojs/solid-js'
import { SITE_METADATA } from './src/consts.ts'
import metaTags from 'astro-meta-tags'
import robotsTxt from 'astro-robots-txt'
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: SITE_METADATA.siteUrl,
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    metaTags(),
    robotsTxt(),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: {
        terser: {
          compress: {
            drop_console: true,
          },
        },
      },
      SVG: {
        svgo: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  inlineStyles: false, // Preserve the class attributes.
                },
              },
            },
          ],
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
