import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
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
    tailwind(),
    solidJs(),
    metaTags(),
    robotsTxt(),
    compress({
      HTML: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        // minifyURLs: '/', // @todo Make it work
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
      },
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
})
