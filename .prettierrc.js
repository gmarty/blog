/** @type {import('prettier').Config} */

export default {
  astroAllowShorthand: true,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',

  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
}
