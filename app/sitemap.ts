import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bmanipuri.org';

  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/articles`, priority: 0.9 },
    { url: `${baseUrl}/resources`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
  ];

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .not('published_at', 'is', null);

  const articlePages = (articles || []).map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: article.updated_at || new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
