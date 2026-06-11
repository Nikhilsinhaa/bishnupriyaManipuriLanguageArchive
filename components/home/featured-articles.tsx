import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export async function FeaturedArticles() {
  let articles;
  try {
    const result = await supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('is_featured', true)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(3);
    articles = result.data;
  } catch {
    return null;
  }

  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-6 bg-[#C9A66B]/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A66B]">Research</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#2F5D50]">Featured Articles</h2>
            <p className="mt-2 text-gray-600">Scholarship and writing about our language and culture</p>
          </div>
          <Link href="/articles" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-[#2F5D50] hover:text-[#2F5D50] hover:bg-[#2F5D50]/5">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group">
              <Card className="h-full border border-[#C9A66B]/30 bg-white transition-all hover:border-[#2F5D50]/40 hover:shadow-md rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4 border-b border-[#F5F1E8] pb-3">
                    {article.categories?.name && (
                      <Badge variant="secondary" className="text-xs bg-[#2F5D50] text-[#F5F1E8] hover:bg-[#2F5D50]/90 rounded-none px-2 py-0.5">
                        {article.categories.name}
                      </Badge>
                    )}
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <Calendar className="h-3 w-3" />
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : ''}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-tight text-gray-900 group-hover:text-[#2F5D50] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {article.excerpt || 'Read more about this fascinating topic...'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-6 text-center sm:hidden">
          <Link href="/articles">
            <Button variant="ghost" className="gap-2 text-[#2F5D50]">
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
