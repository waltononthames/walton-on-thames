import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('news');
  const sorted = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'Walton-on-Thames.org — Local News & Stories',
    description: 'Community news, local history, and stories from Walton-on-Thames, Hersham and Whiteley Village.',
    site: context.site!,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/community/news/${post.data.slug}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}
