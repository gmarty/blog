import { fontFamily } from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Onest', ...fontFamily.sans],
      },
      colors: {
        primary: colors.orange,
        gray: colors.slate,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.900'),
            '--tw-prose-links': theme('colors.primary.600'),
            a: {
              '&:hover': {
                color: theme('colors.primary.800'),
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.gray.900'),
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.100'),
            '--tw-prose-links': theme('colors.primary.500'),
            a: {
              '&:hover': {
                color: theme('colors.primary.300'),
                code: { color: theme('colors.primary.300') },
              },
              code: { color: theme('colors.primary.500') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
}
