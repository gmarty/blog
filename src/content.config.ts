import { defineCollection, reference } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'
import { POST_METADATA } from '@/consts.ts'

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/authors' }),
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    shortBio: z.string(),
    company: z.string().optional(),
    layout: z.url().optional(),
    email: z.email().optional(),
    mastodon: z.url().optional(),
    linkedin: z.url().optional(),
    gitlab: z.url().optional(),
    github: z.url().optional(),
    pixelfed: z.url().optional(),
    facebook: z.url().optional(),
    youtube: z.url().optional(),
    twitter: z.url().optional(),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      tags: z.array(reference('tags')).default([]),
      cover: image().optional(),
      lastmod: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      // images: z.string().optional(),
      authors: z
        .array(reference('authors'))
        .default([{ collection: 'authors', id: 'default' }]),
      postLayout: z
        .enum(['simple', 'column'])
        .default(POST_METADATA.defaultLayout as 'simple' | 'column'),
      related: z.array(reference('blog')).default([]),
    }),
})

const tags = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/tags' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    // TODO: Add support for images and layout
    // image: z.string().optional(),
    // layout: z.string().optional(),
  }),
})

// Slash pages will be rendered as top pages:
// e.g. `src/content/slash/Films.md` => `https://gu.illau.me/films`
const slash = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/slash' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

export const collections = { blog, authors, tags, slash }
