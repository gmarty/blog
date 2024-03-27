import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { excludeDrafts, sortBlogPosts } from '@/functions'
import { useTranslations } from '@/i18n'

const t = useTranslations()

export async function GET(context) {
  const posts = await getCollection('blog', excludeDrafts).then(sortBlogPosts)
  return rss({
    title: t('siteMetadata.title'),
    description: t('siteMetadata.description'),
    site: context.site,
    items: posts.map(({ slug, data: { title, description, tags, date } }) => ({
      title,
      categories: tags.map(({ slug }) => slug), // TODO: add tags name in the future
      pubDate: date,
      description: description,
      link: `/posts/${slug}/`,
    })),
  })
}
